# Edge Function Setup - pitch-deck-assistant

**Time**: 2-3 hours
**Difficulty**: Medium
**File**: `supabase/functions/pitch-deck-assistant/index.ts`

---

## What This Does

Creates a secure backend function that:
1. Receives user messages from frontend
2. Calls Claude AI with conversation history
3. Extracts startup data using function calling
4. Saves everything to database
5. Returns Claude's response + completeness %

---

## Supabase Best Practices Applied

✅ Use `npm:` prefix for dependencies (not bare imports)
✅ Use version pinning: `npm:@anthropic-ai/sdk@0.32.1`
✅ Use `Deno.serve()` (not old `serve` import)
✅ Pre-populated env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
✅ CORS properly configured
✅ No cross-function dependencies
✅ Minimal external dependencies

---

## Step 1: Create Function (2 min)

```bash
cd /home/sk/medellin-spark
supabase functions new pitch-deck-assistant
```

**Expected output**:
```
Created new Function at supabase/functions/pitch-deck-assistant
```

---

## Step 2: Write Function Code (2 hours)

Create: `supabase/functions/pitch-deck-assistant/index.ts`

```typescript
// ================================================================
// Supabase Edge Function: Claude AI Pitch Deck Assistant
// ================================================================
// Implements correct tool-use loop with tool_result continuation
// Best practices: npm: imports, Deno.serve, minimal dependencies
// ================================================================

import Anthropic from 'npm:@anthropic-ai/sdk@0.32.1';
import { createClient } from 'npm:@supabase/supabase-js@2.47.10';

// Environment variables (pre-populated by Supabase)
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') || '*';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ================================================================
// Main handler
// ================================================================

console.info('[pitch-deck-assistant] Function started');

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse request
    const { conversation_id, message, profile_id } = await req.json();

    // Validate input
    if (!message || typeof message !== 'string') {
      return errorResponse('Invalid message', 400);
    }

    if (!profile_id) {
      return errorResponse('Missing profile_id', 401);
    }

    // Initialize clients
    const claude = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Load or create conversation
    let conv;
    if (conversation_id) {
      const { data } = await supabase
        .from('pitch_conversations')
        .select('*')
        .eq('id', conversation_id)
        .single();
      conv = data;
    }

    if (!conv) {
      // Create new conversation
      const { data: newConv } = await supabase
        .from('pitch_conversations')
        .insert({
          profile_id,
          messages: [],
          collected_data: {},
          status: 'active'
        })
        .select()
        .single();
      conv = newConv;
    }

    // Add user message to history
    const messages = conv.messages || [];
    messages.push({ role: 'user', content: message });

    // ================================================================
    // CORRECT TOOL-USE LOOP (fixes audit issue #1)
    // ================================================================
    // Pattern: Call Claude → Execute tool → Send tool_result → Repeat
    // ================================================================

    const tools = [{
      name: 'save_startup_data',
      description: 'Save extracted startup information to database',
      input_schema: {
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
    }];

    const systemPrompt = `You are a pitch deck consultant helping entrepreneurs create investor presentations.

Your job:
1. Ask focused questions to extract key startup information
2. Use the save_startup_data tool to save information as you learn it
3. When you have 80%+ of required data (company, problem, solution, market, model), tell the user they're ready to generate

Keep responses short and conversational. Ask one question at a time.`;

    let pending = await claude.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 1024,
      system: systemPrompt,
      tools: tools,
      messages: messages,
    });

    let assistantMessage = '';
    let loopCount = 0;
    const maxLoops = 5; // Prevent infinite loops

    // Loop until Claude stops calling tools
    while (loopCount < maxLoops) {
      loopCount++;

      // Extract text and tool calls from response
      const textBlock = pending.content.find((b: any) => b.type === 'text');
      const toolUse = pending.content.find((b: any) => b.type === 'tool_use');

      if (textBlock) {
        assistantMessage = textBlock.text;
      }

      if (!toolUse) {
        // No more tools to execute - we're done
        break;
      }

      // Execute the tool
      if (toolUse.name === 'save_startup_data') {
        console.info('[tool] Saving startup data:', toolUse.input);

        // ✅ MERGE FIRST, THEN CALCULATE (fixes audit issue #4)
        const updatedData = { ...conv.collected_data, ...toolUse.input };

        // Save to database
        await supabase
          .from('pitch_conversations')
          .update({ collected_data: updatedData })
          .eq('id', conv.id);

        // Update local reference
        conv.collected_data = updatedData;

        // Add assistant message with tool call to history
        messages.push({
          role: 'assistant',
          content: pending.content
        });

        // ✅ SEND TOOL_RESULT BACK TO CLAUDE (fixes audit issue #1)
        messages.push({
          role: 'user',
          content: [{
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: JSON.stringify({
              success: true,
              message: 'Data saved successfully'
            })
          }]
        });

        // Continue conversation with tool result
        pending = await claude.messages.create({
          model: 'claude-3-5-sonnet-latest',
          max_tokens: 1024,
          system: systemPrompt,
          tools: tools,
          messages: messages,
        });
      }
    }

    // Save final conversation state
    messages.push({ role: 'assistant', content: assistantMessage });

    // ✅ Calculate completeness AFTER all merges (fixes audit issue #4)
    const completeness = calculateCompleteness(conv.collected_data);
    const ready = completeness >= 80;

    if (ready && conv.status === 'active') {
      conv.status = 'ready_to_generate';
    }

    await supabase
      .from('pitch_conversations')
      .update({
        messages,
        status: conv.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', conv.id);

    // Return response
    return new Response(
      JSON.stringify({
        conversation_id: conv.id,
        message: assistantMessage,
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

// ================================================================
// Helper functions
// ================================================================

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
```

**Key Features**:
- ✅ Correct tool-use loop with `tool_result` continuation
- ✅ Completeness calculated AFTER data merge
- ✅ Supabase best practices (npm: imports, Deno.serve)
- ✅ Proper CORS handling
- ✅ Error handling
- ✅ Loop protection (max 5 iterations)

---

## Step 3: Set API Key (2 min)

```bash
# Set Anthropic API key
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE

# Set allowed origin (optional, for production)
supabase secrets set ALLOWED_ORIGIN=https://your-domain.com

# Verify secrets
supabase secrets list
```

**Expected**:
```
ANTHROPIC_API_KEY (set)
ALLOWED_ORIGIN (set)
```

---

## Step 4: Test Locally (10 min)

### Start function:
```bash
supabase functions serve pitch-deck-assistant
```

### Test with curl:
```bash
curl -X POST http://localhost:54321/functions/v1/pitch-deck-assistant \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "conversation_id": null,
    "message": "I need a pitch deck for my AI startup",
    "profile_id": "test-user-id"
  }'
```

**Expected response**:
```json
{
  "conversation_id": "uuid-here",
  "message": "Great! I'd love to help. What's your company name?",
  "completeness": 0,
  "ready_to_generate": false,
  "collected_data": {}
}
```

### Test data extraction:
```bash
# Continue conversation with extracted data
curl -X POST http://localhost:54321/functions/v1/pitch-deck-assistant \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": "uuid-from-above",
    "message": "My company is EventAI, we're in event technology",
    "profile_id": "test-user-id"
  }'
```

**Expected**: `completeness` should increase, `collected_data` should have company info

---

## Step 5: Deploy (5 min)

```bash
# Deploy to production
supabase functions deploy pitch-deck-assistant

# Test production endpoint
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/pitch-deck-assistant \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"message": "test", "profile_id": "test"}'
```

---

## Troubleshooting

### Error: "ANTHROPIC_API_KEY not configured"
**Fix**: Run `supabase secrets set ANTHROPIC_API_KEY=sk-ant...`

### Error: "permission denied for table pitch_conversations"
**Fix**: Make sure migration is applied and RLS policies exist

### Error: "tool_use_id is required"
**Fix**: Check tool_result format - must include `tool_use_id`

### Function times out
**Fix**: Check loop count, ensure it exits after tool execution

### "Invalid message" error
**Fix**: Ensure message is a non-empty string

---

## Testing Checklist

- [ ] Function starts without errors
- [ ] Creates new conversation on first message
- [ ] Resumes existing conversation with `conversation_id`
- [ ] Extracts data using `save_startup_data` tool
- [ ] Completeness increases as data collected
- [ ] `ready_to_generate` becomes true at 80%+
- [ ] Messages save to database
- [ ] Error handling works (invalid input, missing API key)

---

## Next Step

✅ Edge Function working → Go to `004-frontend-integration.md`

---

**Note**: This is MVP - no streaming, rate limiting, or retry logic yet. Add those in production hardening phase.
