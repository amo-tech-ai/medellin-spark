# Agent SDK Quick Reference

## 30-Second Setup

```typescript
// 1. Import (Deno/Edge Functions)
import { query } from 'npm:@anthropic-ai/claude-agent-sdk'

// 2. Use
const result = query({
  prompt: 'Your question here',
  options: {
    model: 'claude-sonnet-4-5-20250929',
    apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
  }
})

// 3. Stream
for await (const msg of result) {
  if (msg.type === 'assistant') {
    console.log(msg.content)
  }
}
```

## Essential Types

```typescript
SDKMessage        // Main message type
Options           // Configuration
PermissionMode    // 'default' | 'acceptEdits' | 'bypassPermissions'
```

## Message Types

```typescript
msg.type === 'assistant'  // AI response
msg.type === 'user'       // Your input
msg.type === 'result'     // Final output + usage stats
msg.type === 'tool_use'   // AI called a tool
```

## Common Options

```typescript
{
  model: 'claude-sonnet-4-5-20250929',  // Best balance
  apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
  tools: ['read', 'write'],              // Only what you need
  permissionMode: 'default',             // Ask before actions
  cwd: '/safe/directory',                // Limit file access
}
```

## Pattern Match Your Use Case

**Simple Q&A**:
```typescript
query({ prompt: 'Explain RLS policies' })
```

**With Context** (Read files):
```typescript
query({
  prompt: 'Summarize this presentation',
  options: { tools: ['read'], cwd: '/presentations' }
})
```

**Interactive** (Multi-turn):
```typescript
const session = query({ prompt: 'Help me design slides' })
// Later: session.sendMessage('Make it blue')
```

**Generate Content**:
```typescript
query({
  prompt: 'Create 5 slides about AI',
  options: { tools: ['web-search'] }
})
```

## Decision Tree

```
Need AI for your app?
├─ Simple completion? → Use OpenAI directly (cheaper)
├─ Need tools (read/write/search)? → Agent SDK
├─ Multi-turn conversation? → Agent SDK
├─ Need to analyze codebase? → Agent SDK
└─ Need streaming responses? → Agent SDK
```

## One-Liner Examples

```typescript
// Research and generate
query({ prompt: 'Research EVs and create summary', options: { tools: ['web-search'] }})

// Analyze file
query({ prompt: 'Find bugs in auth.ts', options: { tools: ['read'], cwd: '/src' }})

// Edit code
query({ prompt: 'Add error handling', options: { tools: ['edit'], permissionMode: 'acceptEdits' }})
```

## Security Checklist

- [ ] API key in `Deno.env.get()`, not hardcoded
- [ ] Set `cwd` to limit file access
- [ ] Use `permissionMode: 'default'` (ask before actions)
- [ ] Specify exact tools needed, not `['*']`
- [ ] Never expose in frontend (Edge Functions only)

---

**Full guide**: `docs/AGENT_SDK_SETUP.md`
