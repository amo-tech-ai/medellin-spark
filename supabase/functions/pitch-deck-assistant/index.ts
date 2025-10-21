// supabase/functions/pitch-deck-assistant/index.ts
// PRODUCTION-READY VERSION with OpenAI GPT-5 mini
// See: lovable-plan/agent-plan/007-AUDIT-RESPONSE-AND-FIXES.md
// Updated: 2025-10-17 - Upgraded to GPT-5 mini (better reasoning, 400k context)

import OpenAI from 'npm:openai@4.75.0';
import { createClient } from 'npm:@supabase/supabase-js@2.47.10';

// Environment variables
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// ✅ FIX #3: Require ALLOWED_ORIGIN (no default to '*')
const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN');

if (!ALLOWED_ORIGIN || ALLOWED_ORIGIN === '*') {
  console.error('[SECURITY] ALLOWED_ORIGIN must be set to your domain, not *');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ✅ FIX #4: Retry with exponential backoff
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 250
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Don't retry on client errors (4xx except 429)
      if (error?.status && error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }

      // Don't retry on last attempt
      if (attempt === maxRetries - 1) throw error;

      // Exponential backoff: 250ms, 750ms, 2.25s
      const delay = baseDelay * Math.pow(3, attempt);
      console.log(`[retry] Attempt ${attempt + 1} failed, retrying in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

console.info('[pitch-deck-assistant] Function started');

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { conversation_id, message, profile_id } = await req.json();

    // Input validation
    if (!message || typeof message !== 'string') {
      return errorResponse('Invalid message', 400);
    }

    // 🔧 DEVELOPMENT MODE: Check for dev UUID or missing profile_id
    const isDevelopmentMode = !profile_id || profile_id === '00000000-0000-0000-0000-000000000000';

    // Use dev UUID if not provided
    const effectiveProfileId = profile_id || '00000000-0000-0000-0000-000000000000';

    console.log(`[mode] ${isDevelopmentMode ? 'DEVELOPMENT' : 'PRODUCTION'} mode, profile_id: ${effectiveProfileId}`);

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (!isDevelopmentMode) {
      // ✅ FIX #2: VERIFY JWT MATCHES PROFILE_ID (Production only)
      const authHeader = req.headers.get('authorization') ?? '';
      const jwt = authHeader.replace(/^Bearer\s+/i, '');

      if (!jwt) {
        return errorResponse('Missing authorization header', 401);
      }

      const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);

      if (authError || !user) {
        console.error('[auth] Token validation failed:', authError);
        return errorResponse('Invalid or expired token', 401);
      }

      if (user.id !== effectiveProfileId) {
        console.warn(`[auth] User ${user.id} attempted to access conversation for ${profile_id}`);
        return errorResponse('Unauthorized: profile_id mismatch', 403);
      }

      console.log(`[auth] Verified user ${user.id}`);
    } else {
      console.log('[dev] Development mode: Skipping JWT validation');
    }

    // Initialize OpenAI
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    // Load or create conversation
    let conv;
    if (conversation_id) {
      const { data } = await supabase
        .from('pitch_conversations')
        .select('*')
        .eq('id', conversation_id)
        .eq('profile_id', effectiveProfileId)  // ✅ Additional RLS check
        .single();
      conv = data;
    }

    if (!conv) {
      const { data: newConv, error: createError } = await supabase
        .from('pitch_conversations')
        .insert({
          profile_id: effectiveProfileId,
          messages: [],
          collected_data: {},
          status: 'active'
        })
        .select()
        .single();

      if (createError) {
        console.error('[db] Failed to create conversation:', createError);
        return errorResponse('Failed to create conversation', 500);
      }

      conv = newConv;
    }

    // Add user message
    const messages = conv.messages || [];
    messages.push({ role: 'user', content: message });

    // Define tools (OpenAI format)
    const tools = [{
      type: 'function',
      function: {
        name: 'save_startup_data',
        description: 'Save extracted startup information to database',
        parameters: {
          type: 'object',
          properties: {
            company_name: { type: 'string', description: 'Company or product name' },
            industry: { type: 'string', description: 'Industry or sector' },
            problem: { type: 'string', description: 'Problem being solved' },
            solution: { type: 'string', description: 'Your solution' },
            target_market: { type: 'string', description: 'Target customers/market' },
            business_model: { type: 'string', description: 'How you make money' }
          }
        }
      }
    }];

    const systemPrompt = `You are a pitch deck consultant helping entrepreneurs create investor presentations.

Your job:
1. Ask focused questions to extract key startup information
2. Use the save_startup_data tool to save information as you learn it
3. When you have 80%+ of required data, tell the user they're ready to generate
4. After each question, provide 3 short example suggestions in this exact format at the end:

SUGGESTIONS: ["Example 1", "Example 2", "Example 3"]

Example:
"What's your company name?

SUGGESTIONS: ["TechStartup", "AICompany", "My Business"]"

Keep responses short and conversational. Ask one question at a time.`;

    // ✅ FIX #4: Wrap OpenAI call in retry logic
    let pending = await withRetry(() =>
      openai.chat.completions.create({
        model: 'gpt-5-mini',  // GPT-5 mini: faster, better reasoning, 400k context
        max_completion_tokens: 1024,  // GPT-5 uses max_completion_tokens
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        tools: tools,
      })
    );

    let assistantMessage = '';
    let loopCount = 0;
    const maxLoops = 5;

    // Tool-use loop (OpenAI format)
    while (loopCount < maxLoops) {
      loopCount++;

      const choice = pending.choices[0];
      const responseMessage = choice.message;

      // Extract text content
      if (responseMessage.content) {
        assistantMessage = responseMessage.content;
      }

      // Check for tool calls
      const toolCalls = responseMessage.tool_calls;
      if (!toolCalls || toolCalls.length === 0) break;

      // Add assistant message with tool calls FIRST
      messages.push({
        role: 'assistant',
        content: responseMessage.content,
        tool_calls: toolCalls
      });

      // Process ALL tool calls and collect data
      let allUpdatedData = { ...conv.collected_data };

      for (const toolCall of toolCalls) {
        if (toolCall.function.name === 'save_startup_data') {
          const toolInput = JSON.parse(toolCall.function.arguments);
          console.info('[tool] Saving startup data:', toolInput);

          // Merge data from this tool call
          allUpdatedData = { ...allUpdatedData, ...toolInput };

          // Add tool response for THIS tool call
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify({
              success: true,
              message: 'Data saved successfully'
            })
          });
        }
      }

      // Save all collected data to database ONCE
      await supabase
        .from('pitch_conversations')
        .update({ collected_data: allUpdatedData })
        .eq('id', conv.id)
        .eq('profile_id', profile_id);

      conv.collected_data = allUpdatedData;

      // Continue conversation with all tool results
      pending = await withRetry(() =>
        openai.chat.completions.create({
          model: 'gpt-5-mini',
          max_completion_tokens: 1024,  // GPT-5 uses max_completion_tokens
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          tools: tools,
        })
      );
    }

    // Save final conversation
    messages.push({ role: 'assistant', content: assistantMessage });

    const completeness = calculateCompleteness(conv.collected_data);
    const ready = completeness >= 80;

    if (ready && conv.status === 'active') {
      conv.status = 'ready_to_generate';
    }

    // Extract suggestions from message
    let suggestions: string[] = [];
    let cleanMessage = assistantMessage;

    const suggestionsMatch = assistantMessage.match(/SUGGESTIONS:\s*\[(.*?)\]/);
    if (suggestionsMatch) {
      try {
        // Parse suggestions array
        const suggestionsStr = '[' + suggestionsMatch[1] + ']';
        suggestions = JSON.parse(suggestionsStr);
        // Remove SUGGESTIONS line from message
        cleanMessage = assistantMessage.replace(/\n*SUGGESTIONS:\s*\[.*?\]\s*/g, '').trim();
      } catch (e) {
        console.warn('[suggestions] Failed to parse:', e);
      }
    }

    await supabase
      .from('pitch_conversations')
      .update({
        messages,
        status: conv.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', conv.id)
      .eq('profile_id', profile_id);  // ✅ Security check

    return new Response(
      JSON.stringify({
        conversation_id: conv.id,
        message: cleanMessage,
        suggestions,
        completeness,
        ready_to_generate: ready,
        collected_data: conv.collected_data
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[pitch-deck-assistant] Error:', error);
    return errorResponse(error.message, 500);
  }
});

function calculateCompleteness(data: any): number {
  const required = [
    'company_name',
    'industry',
    'problem',
    'solution',
    'target_market',
    'business_model'
  ];

  const filled = required.filter(field => {
    const value = data?.[field];
    return value && typeof value === 'string' && value.trim().length > 0;
  });

  return Math.round((filled.length / required.length) * 100);
}

function errorResponse(message: string, status: number): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}
