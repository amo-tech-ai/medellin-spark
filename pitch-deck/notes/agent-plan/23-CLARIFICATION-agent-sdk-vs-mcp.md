# 🔍 CLARIFICATION - Agent SDK, MCP, and Edge Functions

**Date**: October 16, 2025
**Status**: Important Distinction

---

## ⚠️ I Need to Clarify Two Different Approaches

After your feedback and additional research, I need to distinguish between:

### 1. **MCP Server Approach** (What I Found Evidence For)
**Claude Desktop/Code → MCP Server → Supabase**

### 2. **Agent SDK in Edge Functions** (What You're Describing)
**Edge Function contains Agent SDK → Runs Claude logic**

These are VERY different architectures.

---

## 🔎 What I Found in Official Documentation

### From Claude Docs (docs.claude.com/en/api/agent-sdk/hosting)

> "The SDK requires a long-running process that executes commands in a persistent shell environment"

**Deployment options listed**:
- AWS Sandboxes
- Cloudflare Sandboxes (containers, not Workers)
- Modal Sandboxes
- E2B
- Fly Machines
- Vercel Sandbox (not Vercel Edge Functions)

**No mention of**:
- Deno runtime
- Supabase Edge Functions
- AWS Lambda
- Cloudflare Workers
- Any serverless/stateless environment

---

## 🤔 What You're Describing (MCP Approach)

Based on your information, here's what I understand:

```
┌─────────────────────────────────┐
│  Claude Desktop / Claude Code   │  ← Agent SDK runs HERE
│  (Your computer or container)   │
└────────────┬────────────────────┘
             │
             │ MCP Protocol
             ↓
┌─────────────────────────────────┐
│  Supabase MCP Server            │  ← Gateway/translator
│  (Connects Claude to Supabase)  │
└────────────┬────────────────────┘
             │
             │ HTTP/API calls
             ↓
┌─────────────────────────────────┐
│  Supabase Services              │
│  - Database                     │
│  - Edge Functions               │
│  - Auth                         │
└─────────────────────────────────┘
```

**In this architecture**:
- Agent SDK runs in Claude Desktop/Code (container/local)
- MCP server acts as bridge to Supabase
- Supabase Edge Functions are ACCESSED by Claude, not running Claude

---

## 🆚 vs What I Was Suggesting

```
Frontend
    ↓
Supabase Edge Function  ← Standard Anthropic SDK runs HERE
    ↓
Claude API (Anthropic's servers)
    ↓
Response
```

**In this architecture**:
- Standard SDK runs IN the Edge Function
- No MCP server needed
- Stateless, serverless

---

## ❓ THE KEY QUESTION

**Can you actually run the Agent SDK INSIDE a Supabase Edge Function?**

Based on my research:

### ❌ Official Documentation Says NO
- Agent SDK requires persistent processes
- Edge Functions are stateless (max 150 seconds)
- No file system persistence
- No shell environment

### ❓ Your Sources Say YES
- MCP enables deployment to Edge Functions
- Deno runtime compatibility
- Can run agents serverless

---

## 🔍 POSSIBLE SCENARIOS

### Scenario A: I'm Wrong (Possible!)
- There's been a very recent update
- Agent SDK now supports stateless environments
- Community has found workarounds
- **If true**: I apologize and will update all docs

### Scenario B: Terminology Confusion (Likely)
- "Deploying to Supabase" means Claude ACCESSES Supabase (MCP)
- Not that Agent SDK runs INSIDE Edge Functions
- Agent SDK still runs in containers
- MCP connects it to Supabase services

### Scenario C: Hybrid Approach (Interesting)
- Some lightweight version of Agent SDK works in Edge Functions
- Limited functionality vs full Agent SDK
- Specific workarounds for stateless limitations

---

## 🙏 WHAT I NEED FROM YOU

Could you clarify:

**1. Where does the Agent SDK physically run?**
- [ ] Inside the Supabase Edge Function (stateless Deno function)
- [ ] In a container that ACCESSES Supabase via MCP
- [ ] On your local machine using Claude Desktop with MCP

**2. What are you trying to build?**
- [ ] Local development tool (Claude Desktop + Supabase)
- [ ] Production API (users call Edge Function → Claude responds)
- [ ] Autonomous agent that runs 24/7

**3. Do you have example code?**
- [ ] Yes (please share)
- [ ] No, but saw it documented
- [ ] No, but want to explore this approach

---

## 💡 MY CURRENT UNDERSTANDING (May Be Wrong!)

### For Your Pitch Deck Generator:

**If you want users to chat with Claude in production**:
- ✅ Use standard Anthropic SDK in Edge Functions
- ✅ Stateless, serverless, scales automatically
- ✅ Works today with code I provided

**If you want to develop locally with full Agent capabilities**:
- ✅ Use Agent SDK + MCP server
- ✅ Rich tools, file access, persistent sessions
- ❌ Can't deploy to production Edge Functions (requires containers)

**If Agent SDK CAN run in Edge Functions**:
- 🤔 I haven't found official documentation for this
- 🤔 Would love to see working examples
- 🤔 Would change my recommendations completely

---

## 🔄 NEXT STEPS

### Option 1: You Confirm MCP Approach
**Clarification**: Agent SDK runs locally/container, accesses Supabase via MCP

**Then**:
- This is for local development, not production
- For production, still use standard SDK in Edge Functions
- MCP is great for building, but not for serving users

### Option 2: You Have Evidence of Edge Function Deployment
**Clarification**: Agent SDK actually runs INSIDE Edge Functions

**Then**:
- I will completely rewrite all documentation
- Update implementation plan
- Issue corrections to my previous guidance

### Option 3: We Test Both Approaches
**Practical**: Try deploying a simple Agent SDK script to Edge Function

**Test**:
```typescript
// Can this run in an Edge Function?
import { query } from 'npm:@anthropic-ai/claude-agent-sdk'

Deno.serve(async (req) => {
  const result = query({
    prompt: "Hello",
    options: { model: 'claude-sonnet-4-5-20250929' }
  })

  // Will this work or error?
  for await (const msg of result) {
    console.log(msg)
  }
})
```

---

## 🎯 WHAT I RECOMMEND RIGHT NOW

**Until we clarify**:

1. **For production pitch deck generator**: Use standard Anthropic SDK
   - Proven to work in Edge Functions
   - Code examples I provided are tested
   - Scales well, low latency

2. **For local development/testing**: Consider MCP approach
   - Better tooling
   - Can access Supabase easily
   - Iterate faster

3. **Test the Agent SDK in Edge Functions**:
   - Create minimal test function
   - Deploy to Supabase
   - See if it actually works
   - Report back findings

---

## 📚 SOURCES I TRUST (In Order)

1. **Official Anthropic Docs**: docs.claude.com
2. **Supabase Official Docs**: supabase.com/docs
3. **GitHub Repos**: anthropics/claude-agent-sdk-typescript
4. **Community Articles**: Medium, blogs (helpful but verify)

**What I haven't found**:
- Official example of Agent SDK in Edge Functions
- Anthropic documentation saying it works in stateless environments
- Working code repository demonstrating this

---

## 🤝 MY COMMITMENT

If I'm wrong about Agent SDK not working in Edge Functions:
- I will immediately correct all documentation
- Create new implementation guides
- Apologize for the confusion
- Update recommendations

**But I need evidence to update my understanding**:
- Official documentation
- Working code example
- Confirmation from Anthropic
- Or your successful deployment

---

## ❓ YOUR TURN

Please help me understand:

1. **Where did you read** that Agent SDK works in Edge Functions?
2. **Have you tested** it personally?
3. **What's your goal**: Local dev or production API?
4. **Would you try** the standard SDK approach I suggested while we clarify?

I'm here to help you build the best solution, whether that's:
- Agent SDK (if it works in Edge Functions)
- Standard SDK (what I currently recommend)
- MCP approach (for local development)
- Hybrid solution

Let's figure this out together! 🚀
