// supabase/functions/generate-pitch-deck/index.ts
// PRODUCTION-READY VERSION with OpenAI GPT-5 mini
// Updated: 2025-10-17 - Upgraded to GPT-5 mini (better reasoning, 400k context)

import { createClient } from 'npm:@supabase/supabase-js@2.75.0';

const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') || 'http://localhost:8080';

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PITCH_DECK_SYSTEM_PROMPT = `You are an expert startup pitch deck consultant. Generate a professional 10-slide investor presentation.

OUTPUT FORMAT (JSON):
{
  "title": "Company Name Pitch Deck",
  "company_name": "Company Name",
  "industry": "Industry",
  "outline": ["Problem", "Solution", "Product", "Market Size", "Business Model", "Traction", "Competition", "Team", "Financials", "Ask"],
  "slides": [
    {
      "slide_number": 1,
      "title": "Problem",
      "layout": "title_content",
      "content": {
        "headline": "3-5 word headline",
        "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"],
        "notes": "Speaker notes"
      }
    }
  ]
}

SLIDES (in order):
1. Cover (company name, tagline, logo placeholder)
2. Problem (3-4 pain points, market need)
3. Solution (how product solves problem, unique value prop)
4. Product (key features, screenshots/mockups)
5. Market Size (TAM/SAM/SOM, growth trends)
6. Business Model (revenue streams, pricing)
7. Traction (metrics, milestones, social proof)
8. Competition (landscape, differentiation)
9. Team (founders, advisors, key hires)
10. Ask (funding amount, use of funds, contact)

IMPORTANT: Return ONLY valid JSON. Use professional language. Focus on clarity and impact.`;

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get request body
    const { startup_data, profile_id } = await req.json();

    if (!startup_data) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: startup_data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 🔧 DEVELOPMENT MODE: Check for dev UUID or missing profile_id
    const isDevelopmentMode = !profile_id || profile_id === '00000000-0000-0000-0000-000000000000';

    // Use dev UUID if not provided
    const effectiveProfileId = profile_id || '00000000-0000-0000-0000-000000000000';

    console.log(`[mode] ${isDevelopmentMode ? 'DEVELOPMENT' : 'PRODUCTION'} mode, profile_id: ${effectiveProfileId}`);

    // ✅ AUTH VALIDATION (skip in development mode)
    if (!isDevelopmentMode) {
      // Production: Verify JWT
      const authHeader = req.headers.get('authorization');
      if (!authHeader) {
        return new Response(
          JSON.stringify({ error: 'Missing authorization header' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const jwt = authHeader.replace(/^Bearer\s+/i, '');
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

      const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);

      if (authError || !user) {
        console.error('[auth] Token validation failed:', authError);
        return new Response(
          JSON.stringify({ error: 'Invalid or expired token' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (user.id !== effectiveProfileId) {
        console.warn(`[auth] User ${user.id} attempted to access profile ${effectiveProfileId}`);
        return new Response(
          JSON.stringify({ error: 'Unauthorized: profile_id mismatch' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`[auth] Verified user ${user.id}`);
    } else {
      console.log('[dev] Development mode: Skipping JWT validation');
    }

    // Build prompt from startup data
    const prompt = `Create a professional 10-slide pitch deck for:

Company: ${startup_data.company_name || 'Startup'}
Industry: ${startup_data.industry || 'Technology'}
Problem: ${startup_data.problem || 'Not specified'}
Solution: ${startup_data.solution || 'Not specified'}
Target Market: ${startup_data.target_market || 'Not specified'}
Business Model: ${startup_data.business_model || 'Not specified'}`;

    // Get OpenAI API key from environment
    const openAIKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',  // GPT-5 mini: faster, better reasoning, 400k context
        messages: [
          { role: 'system', content: PITCH_DECK_SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        // Note: GPT-5 mini only supports default temperature (1)
        max_completion_tokens: 4000  // GPT-5 uses max_completion_tokens
      })
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.text();
      console.error('OpenAI API error:', error);
      return new Response(
        JSON.stringify({
          error: 'Failed to generate pitch deck content',
          details: isDevelopmentMode ? error : undefined,  // Show details in dev mode
          status: openAIResponse.status
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await openAIResponse.json();
    const slides = JSON.parse(data.choices[0].message.content);

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Supabase credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 🔧 DEVELOPMENT MODE: Get a real profile_id for dev testing
    let finalProfileId = effectiveProfileId;
    if (isDevelopmentMode && effectiveProfileId === '00000000-0000-0000-0000-000000000000') {
      const { data: existingProfiles } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);

      if (existingProfiles && existingProfiles.length > 0) {
        finalProfileId = existingProfiles[0].id;
        console.log('[dev] Using existing profile for dev mode:', finalProfileId);
      }
    }

    // Use profile_id directly (no lookup needed)
    // Insert presentation record using the presentations table
    const { data: presentation, error: presentationError} = await supabase
      .from('presentations')
      .insert({
        title: slides.title || startup_data.company_name || 'Pitch Deck',
        profile_id: finalProfileId,
        content: slides,
        outline: slides.outline || [],
        slide_count: slides.slides?.length || 0,
        status: 'completed',
        category: 'pitch-deck',
        theme: 'mystique',
        is_public: isDevelopmentMode  // Public in dev mode for easy testing
      })
      .select()
      .single();

    if (presentationError) {
      console.error('Database error (presentations):', presentationError);
      return new Response(
        JSON.stringify({ error: 'Failed to save presentation', details: presentationError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        presentation_id: presentation.id,
        title: slides.title,
        slide_count: slides.slides?.length || 0
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
