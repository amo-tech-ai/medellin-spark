// ================================================================
// Supabase Edge Function: OpenAI Chat Proxy
// ================================================================
// This function acts as a secure backend proxy for OpenAI API calls.
// API keys are never exposed to the browser.
//
// Security Features:
// - API key stored server-side in Supabase secrets
// - Request validation
// - Error handling
// - CORS enabled for your frontend
// ================================================================

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') || '*'

// CORS headers for frontend access
const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate API key is configured
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured. Run: supabase secrets set OPENAI_API_KEY=your_key')
    }

    // Parse request body
    const { messages, model = "gpt-4o-mini", temperature = 0.7, max_tokens = 500 } = await req.json()

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages array required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Call OpenAI API (server-side, secure)
    console.log(`[Chat] Making OpenAI request with ${messages.length} messages`)
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
      }),
    })

    // Handle OpenAI API errors
    if (!response.ok) {
      const error = await response.json()
      console.error('[Chat] OpenAI API error:', error)
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API error', 
          details: error.error?.message || 'Unknown error'
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Return successful response
    const data = await response.json()
    console.log('[Chat] OpenAI response received successfully')

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[Chat] Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
