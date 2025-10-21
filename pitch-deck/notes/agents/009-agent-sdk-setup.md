# Agent SDK Setup Guide

## Which SDK? → TypeScript

**Your stack**: React + TypeScript + Supabase Edge Functions (Deno)
**Recommendation**: **TypeScript Agent SDK**

Why? Your entire project uses TypeScript. Edge Functions are the perfect place for Agent SDK integration.

---

## Quick Setup (5 minutes)

### 1. Install

```bash
# For Edge Functions (Deno)
# No installation needed! Import directly from npm:
```

```typescript
import { query, type SDKMessage } from 'npm:@anthropic-ai/claude-agent-sdk'
```

### 2. Set API Key

```bash
# Store in Supabase secrets (server-side only)
supabase secrets set ANTHROPIC_API_KEY=your_key_here
```

### 3. Basic Usage

```typescript
// supabase/functions/your-function/index.ts
import { query } from 'npm:@anthropic-ai/claude-agent-sdk'

const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY')

Deno.serve(async (req) => {
  const { prompt } = await req.json()

  // Simple query
  const result = query({
    prompt,
    options: {
      model: 'claude-sonnet-4-5-20250929',
      apiKey: ANTHROPIC_KEY,
    }
  })

  // Stream messages
  for await (const message of result) {
    if (message.type === 'assistant') {
      console.log(message.content)
    }
  }

  return new Response('Done', { status: 200 })
})
```

---

## Real Example: Pitch Deck Generator

**Problem**: You need AI to generate slide content based on user input.

**Current approach** (supabase/functions/chat/index.ts):
- Manual OpenAI API calls
- Basic request/response
- Limited context

**With Agent SDK**:
- Multi-turn conversations
- Tool calling (read files, access DB)
- Better context management

### Before (Current)

```typescript
// supabase/functions/chat/index.ts
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` },
  body: JSON.stringify({ model, messages })
})
```

### After (Agent SDK)

```typescript
// supabase/functions/generate-slides/index.ts
import { query } from 'npm:@anthropic-ai/claude-agent-sdk'

Deno.serve(async (req) => {
  const { topic, slideCount } = await req.json()

  const result = query({
    prompt: `Generate ${slideCount} slides for: ${topic}`,
    options: {
      model: 'claude-sonnet-4-5-20250929',
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
      tools: ['web-search', 'read-file'], // Built-in tools!
    }
  })

  const slides = []

  for await (const message of result) {
    if (message.type === 'result') {
      slides.push(message.content)
    }
  }

  return new Response(JSON.stringify({ slides }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

---

## Key Types You'll Use

```typescript
import {
  query,           // Main function
  SDKMessage,      // Message type (assistant, user, result)
  Options,         // Configuration object
  PermissionMode,  // 'default' | 'acceptEdits' | 'bypassPermissions'
} from 'npm:@anthropic-ai/claude-agent-sdk'

// Main pattern
const result = query({ prompt, options })
// result is AsyncIterator<SDKMessage>

for await (const msg of result) {
  if (msg.type === 'assistant') {
    // AI response
  } else if (msg.type === 'result') {
    // Final output
  } else if (msg.type === 'tool_use') {
    // AI called a tool
  }
}
```

---

## Best Practices

### ✅ DO

```typescript
// 1. Store API keys server-side
const key = Deno.env.get('ANTHROPIC_API_KEY')

// 2. Handle streaming properly
for await (const msg of result) {
  if (msg.type === 'assistant') {
    // Stream to frontend
    encoder.encode(JSON.stringify(msg))
  }
}

// 3. Set appropriate permissions
options: {
  permissionMode: 'default', // Ask before file operations
  cwd: '/tmp/safe-directory',
}

// 4. Specify tools you need
options: {
  tools: ['read', 'write'], // Only what you need
}
```

### ❌ DON'T

```typescript
// 1. Never expose API key to frontend
// BAD: const key = import.meta.env.VITE_ANTHROPIC_KEY

// 2. Don't ignore error handling
// BAD: for await (const msg of result) { ... } // No try/catch

// 3. Don't give unrestricted access
// BAD: permissionMode: 'bypassPermissions' // Security risk!

// 4. Don't load all tools if you don't need them
// BAD: tools: ['*'] // Unnecessary overhead
```

---

## Common Gotchas

### 1. Deno Import Syntax

```typescript
// ✅ Deno Edge Functions
import { query } from 'npm:@anthropic-ai/claude-agent-sdk'

// ❌ Node.js (not for Edge Functions)
import { query } from '@anthropic-ai/claude-agent-sdk'
```

### 2. Streaming vs Single Message

**Streaming** (recommended):
```typescript
for await (const msg of result) {
  // Process each message as it arrives
}
```

**Single message** (simple):
```typescript
const messages = []
for await (const msg of result) {
  messages.push(msg)
}
// Process all at once
```

### 3. Type Narrowing

```typescript
for await (const msg of result) {
  switch (msg.type) {
    case 'assistant':
      // msg is SDKAssistantMessage
      console.log(msg.content)
      break
    case 'result':
      // msg is SDKResultMessage
      console.log(msg.usage) // Token usage
      break
  }
}
```

---

## Practical Use Cases for Your Project

### 1. Intelligent Slide Generation
```typescript
// Auto-generate slides with research
options: {
  tools: ['web-search', 'read-file'],
  prompt: 'Create a pitch deck about sustainable energy. Research latest stats.'
}
```

### 2. Presentation Q&A
```typescript
// Chat about existing presentations
options: {
  tools: ['read'],
  cwd: '/presentations',
  prompt: 'Explain slide 3 of quarterly-review.json'
}
```

### 3. Template Customization
```typescript
// Modify templates based on feedback
options: {
  tools: ['read', 'edit'],
  permissionMode: 'acceptEdits',
  prompt: 'Update template to use corporate colors from brand-guide.json'
}
```

---

## Performance Tips

### 1. Cache Responses
```typescript
const cache = new Map()

if (cache.has(prompt)) {
  return cache.get(prompt)
}

const result = await query({ prompt, options })
cache.set(prompt, result)
```

### 2. Use Appropriate Models
```typescript
// Fast, cheap for simple tasks
model: 'claude-3-5-haiku-20241022'

// Powerful for complex tasks
model: 'claude-sonnet-4-5-20250929'
```

### 3. Limit Tool Scope
```typescript
// Specific > Broad
tools: ['read-file'], // Only read
// Not: tools: ['*']
```

---

## Migration Path (Your Current Setup)

**Phase 1**: Add Agent SDK alongside current OpenAI proxy
- Keep `/functions/chat` as-is
- Create `/functions/agent-chat` with Agent SDK
- Test in parallel

**Phase 2**: Migrate features incrementally
- Start with new features (e.g., slide generation)
- Move existing features one-by-one
- Compare results

**Phase 3**: Full migration
- Deprecate OpenAI proxy
- Use Agent SDK everywhere
- Remove OpenAI dependency

---

## Next Steps

1. **Try it now**: Create `supabase/functions/test-agent/index.ts`
2. **Deploy**: `supabase functions deploy test-agent`
3. **Set secret**: `supabase secrets set ANTHROPIC_API_KEY=your_key`
4. **Test**: Call the function and iterate

---

## Resources

- [Agent SDK Docs](https://docs.claude.com/en/api/agent-sdk/typescript)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- Your example: `supabase/functions/chat/index.ts`

---

**TL;DR**: Use TypeScript SDK in Supabase Edge Functions. Import from npm, store API key in secrets, iterate messages. Same pattern as your OpenAI proxy, but with more power.
