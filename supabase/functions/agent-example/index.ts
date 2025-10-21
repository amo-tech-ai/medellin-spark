// ================================================================
// Supabase Edge Function: Agent SDK Example
// ================================================================
// Demonstrates how to use Claude Agent SDK in Edge Functions
// This example shows slide content generation with tool usage
// ================================================================

import { query } from 'npm:@anthropic-ai/claude-agent-sdk'

const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!ANTHROPIC_KEY) {
      throw new Error('ANTHROPIC_API_KEY not set. Run: supabase secrets set ANTHROPIC_API_KEY=your_key')
    }

    const { prompt, useTools = false } = await req.json()

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Start Agent SDK query
    const result = query({
      prompt,
      options: {
        model: 'claude-sonnet-4-5-20250929',
        apiKey: ANTHROPIC_KEY,
        // Enable tools if requested
        ...(useTools && { tools: ['web-search'] }),
      }
    })

    // Collect messages
    const messages = []
    let finalContent = ''
    let usage = null

    for await (const message of result) {
      console.log('[Agent] Message type:', message.type)

      // Track all messages
      messages.push({
        type: message.type,
        timestamp: new Date().toISOString(),
      })

      // Extract content
      if (message.type === 'assistant') {
        finalContent += message.content
      } else if (message.type === 'result') {
        usage = message.usage
      }
    }

    // Return response
    return new Response(
      JSON.stringify({
        content: finalContent,
        usage,
        messageCount: messages.length,
        messages,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[Agent] Error:', error)
    return new Response(
      JSON.stringify({
        error: 'Agent SDK error',
        message: error.message,
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
