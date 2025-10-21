# Agent SDK Example Function

Simple demonstration of Claude Agent SDK in Supabase Edge Functions.

## Setup

```bash
# 1. Set API key
supabase secrets set ANTHROPIC_API_KEY=your_key_here

# 2. Deploy function
supabase functions deploy agent-example

# 3. Test locally (optional)
supabase functions serve agent-example
```

## Usage

### Basic Query

```typescript
const response = await fetch('https://your-project.supabase.co/functions/v1/agent-example', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ANON_KEY}`,
  },
  body: JSON.stringify({
    prompt: 'Create 3 slide titles for a pitch deck about renewable energy',
  })
})

const data = await response.json()
console.log(data.content) // AI response
console.log(data.usage)   // Token usage
```

### With Tools (Web Search)

```typescript
body: JSON.stringify({
  prompt: 'Research latest AI trends and suggest 5 slide topics',
  useTools: true,  // Enables web search
})
```

## Response Format

```json
{
  "content": "1. The Rise of Renewable Energy\n2. Solar Power: Past, Present, Future\n3. Economic Impact of Green Technology",
  "usage": {
    "input_tokens": 45,
    "output_tokens": 123
  },
  "messageCount": 3,
  "messages": [
    { "type": "user", "timestamp": "..." },
    { "type": "assistant", "timestamp": "..." },
    { "type": "result", "timestamp": "..." }
  ]
}
```

## Integration Example

```typescript
// src/hooks/useAgentGenerate.ts
export function useAgentGenerate() {
  const supabase = useSupabaseClient()

  return async (prompt: string) => {
    const { data: { session } } = await supabase.auth.getSession()

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agent-example`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    )

    return response.json()
  }
}
```

## Next Steps

1. Review `docs/05-agent-sdk-setup.md` for full guide
2. Check `docs/06-agent-sdk-quick-ref.md` for patterns
3. Modify this function for your use case
4. Deploy and test

## Production Tips

- Add rate limiting
- Implement caching for common queries
- Stream responses for better UX
- Add logging/monitoring
- Handle errors gracefully
