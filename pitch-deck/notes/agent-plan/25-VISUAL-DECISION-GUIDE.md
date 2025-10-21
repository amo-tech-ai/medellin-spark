# Visual Decision Guide - Which Claude Approach to Use

**For people who think in pictures**

---

## The 3 Types of "Claude" Explained

```
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE API (The Service)                 │
│                  Anthropic's AI in the cloud                │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ↓                              ↓
    ┌──────────────────────┐      ┌──────────────────────┐
    │   Standard SDK       │      │   Agent SDK          │
    │   @anthropic-ai/sdk  │      │   @claude-agent-sdk  │
    │                      │      │                      │
    │   Simple API calls   │      │   Full framework     │
    │   ✅ Edge Functions  │      │   ❌ Needs containers│
    │   ✅ Your use case   │      │   ❌ Overkill here  │
    └──────────────────────┘      └──────────────────────┘
```

---

## Your Pitch Deck Flow (With Standard SDK)

```
┌─────────────┐
│    USER     │  "I need a pitch deck"
└──────┬──────┘
       │
       ↓
┌─────────────────────────────────────────┐
│  FRONTEND (PitchDeckWizard.tsx)         │
│  - Shows chat UI                        │
│  - Displays messages                    │
│  - Sends user input to backend          │
└──────┬──────────────────────────────────┘
       │
       │ POST /functions/v1/pitch-deck-assistant
       ↓
┌─────────────────────────────────────────┐
│  EDGE FUNCTION (Supabase + Deno)        │
│                                         │
│  1. Load conversation from database     │
│  2. Call Claude API ──────────────┐     │
│  3. Extract startup data          │     │
│  4. Save to database              │     │
│  5. Return response               │     │
└──────┬──────────────────────────────────┘
       │                            │
       │                            ↓
       │                    ┌───────────────┐
       │                    │  CLAUDE API   │
       │                    │  (Anthropic)  │
       │                    └───────┬───────┘
       │                            │
       │                            ↓
       │                    "Great! Tell me
       │                     about the problem
       │                     you're solving"
       ↓
┌─────────────────────────────────────────┐
│  DATABASE (Supabase)                    │
│  pitch_conversations:                   │
│  {                                      │
│    messages: [...],                     │
│    collected_data: {                    │
│      company_name: "EventAI",           │
│      industry: "Event Tech",            │
│      problem: "Manual planning"         │
│    }                                    │
│  }                                      │
└─────────────────────────────────────────┘
```

---

## Agent SDK Architecture (What You DON'T Need)

```
┌─────────────────────────────────────────┐
│  CONTAINER (Docker/Modal/E2B)           │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │   Claude Agent SDK                │  │
│  │                                   │  │
│  │   - Persistent file system        │  │
│  │   - Long-running shell            │  │
│  │   - Code editor capabilities      │  │
│  │   - Multi-step workflows          │  │
│  │                                   │  │
│  │   Perfect for:                    │  │
│  │   - Building VS Code extensions   │  │
│  │   - Desktop coding assistants     │  │
│  │   - Complex automation tasks      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ❌ TOO COMPLEX for your needs          │
│  ❌ Doesn't run in Edge Functions       │
│  ❌ Requires infrastructure management  │
└─────────────────────────────────────────┘
```

---

## MCP Architecture (For Local Development)

```
┌─────────────────────────────────────────┐
│  YOUR COMPUTER                          │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Claude Desktop / Claude Code     │  │
│  │  (Agent SDK runs here)            │  │
│  └──────────────┬────────────────────┘  │
│                 │                       │
│                 │ MCP Protocol          │
│                 ↓                       │
│  ┌───────────────────────────────────┐  │
│  │  Supabase MCP Server              │  │
│  │  (Gateway/Translator)             │  │
│  └──────────────┬────────────────────┘  │
└─────────────────┼────────────────────────┘
                  │
                  │ HTTP/API
                  ↓
┌─────────────────────────────────────────┐
│  SUPABASE (Cloud)                       │
│  - Database                             │
│  - Edge Functions                       │
│  - Storage                              │
└─────────────────────────────────────────┘

✅ Great for: Local development, testing
❌ Not for: Production APIs, user-facing apps
```

---

## Decision Tree

```
START: I want to add Claude to my app
  │
  ├─ Is this for users in production?
  │  │
  │  YES ──► Use Standard SDK
  │         (What this guide teaches)
  │
  └─ Is this for local development only?
     │
     YES ──► Consider MCP approach
            (Connect Claude Desktop to Supabase)


MORE DETAILED:

Need file system access?
  │
  ├─ NO ──► Standard SDK ✅
  │
  └─ YES ──► Is it long-running (30+ min)?
             │
             ├─ NO ──► Standard SDK ✅
             │
             └─ YES ──► Agent SDK in container
                       (Complex, but needed)


Stateless or Stateful?
  │
  ├─ Stateless (< 2 min per request) ──► Standard SDK ✅
  │
  └─ Stateful (persistent shell) ──► Agent SDK


Where will it run?
  │
  ├─ Supabase Edge Functions ──► Standard SDK ✅
  ├─ AWS Lambda ──► Standard SDK ✅
  ├─ Cloudflare Workers ──► Standard SDK ✅
  ├─ Vercel Edge ──► Standard SDK ✅
  └─ Container (Docker/Modal) ──► Agent SDK possible
```

---

## Side-by-Side Comparison

```
┌─────────────────────┬──────────────────┬─────────────────┐
│    FEATURE          │   STANDARD SDK   │   AGENT SDK     │
├─────────────────────┼──────────────────┼─────────────────┤
│ Setup Time          │   30 minutes     │   2-4 hours     │
│ Code Complexity     │   Simple         │   Complex       │
│ Works in Edge Fns   │   ✅ Yes         │   ❌ No         │
│ Scales Automatically│   ✅ Yes         │   ❌ Manual     │
│ Persistent Shell    │   ❌ No          │   ✅ Yes        │
│ File Operations     │   ❌ Limited     │   ✅ Full       │
│ Function Calling    │   ✅ Yes         │   ✅ Yes        │
│ Streaming           │   ✅ Yes         │   ✅ Yes        │
│ Session Management  │   Manual (DB)    │   Built-in      │
│ Cost per Request    │   ~$0.02         │   ~$0.02 + infra│
│ Infrastructure      │   None needed    │   Containers req│
│ For Your Use Case   │   ✅ Perfect     │   ❌ Overkill   │
└─────────────────────┴──────────────────┴─────────────────┘
```

---

## Data Flow Example (Your Pitch Deck App)

```
Message 1: User starts conversation
────────────────────────────────────────────────────
User: "I need a pitch deck"
  ↓
Frontend sends to: /pitch-deck-assistant
  ↓
Edge Function:
  - conversation_id: null (new)
  - Creates new conversation in DB
  ↓
Calls Claude: "User wants a pitch deck"
  ↓
Claude: "Great! What's your company name?"
  ↓
Saves to DB: { messages: [user msg, claude msg] }
  ↓
Returns to user: "Great! What's your company name?"


Message 2: User provides info
────────────────────────────────────────────────────
User: "EventAI - we help event planners"
  ↓
Frontend sends to: /pitch-deck-assistant
  - conversation_id: "abc-123" (existing)
  ↓
Edge Function:
  - Loads conversation from DB
  - Full history: [msg1, msg2, msg3, NEW]
  ↓
Calls Claude with FULL history + tools
  ↓
Claude detects: Company name = "EventAI"
  - Calls save_startup_data tool
  - Returns: "Got it! What problem do you solve?"
  ↓
Edge Function:
  - Executes tool: Updates collected_data
  - Saves new messages to DB
  ↓
DB now has:
  {
    messages: [all 4 messages],
    collected_data: {
      company_name: "EventAI",
      industry: "Event Planning"
    }
  }
  ↓
Returns to user: "Got it! What problem..."


[Continue for 8-10 messages]


Message 10: Ready to generate
────────────────────────────────────────────────────
collected_data: {
  company_name: ✅
  industry: ✅
  problem: ✅
  solution: ✅
  market: ✅
  model: ✅
}

Completeness: 100%
  ↓
Claude: "I have everything! Ready to generate?"
  ↓
Frontend shows: [Generate Deck] button
  ↓
User clicks: Generate
  ↓
Calls: /generate-pitch-deck (existing function)
  - Input: collected_data formatted as prompt
  - Output: 10-slide pitch deck
  ↓
Success! Redirect to preview
```

---

## What You're Building (Visual)

```
BEFORE (Broken):
┌─────────┐
│  User   │
└────┬────┘
     │ "Create pitch deck"
     ↓
┌──────────────┐
│  Chat UI     │  Shows chat ✅
└────┬─────────┘
     │ Sends to /chat
     ↓
┌──────────────┐
│  Edge Fn     │  Returns chat ✅
└────┬─────────┘
     │
     ↓
┌──────────────┐
│  User waits  │  No deck ❌
└──────────────┘


AFTER (Working):
┌─────────┐
│  User   │
└────┬────┘
     │ "Create pitch deck"
     ↓
┌──────────────┐
│  Chat UI     │  Shows chat ✅
└────┬─────────┘
     │ Sends to /pitch-deck-assistant
     ↓
┌──────────────┐
│  Edge Fn     │  Extracts data ✅
│  + Claude    │  Saves progress ✅
└────┬─────────┘  Validates readiness ✅
     │
     ↓
┌──────────────┐
│ Generate Btn │  When ready ✅
└────┬─────────┘
     │ Click
     ↓
┌──────────────┐
│ Edge Fn      │  Creates deck ✅
│ (existing)   │
└────┬─────────┘
     │
     ↓
┌──────────────┐
│  Preview     │  Success! ✅
└──────────────┘
```

---

## Cost Visualization

```
PER CONVERSATION (~10 messages):

┌─────────────────────────────────────┐
│  Input tokens:  2,000 tokens        │
│  Cost: $0.006                       │
└─────────────────────────────────────┘
              +
┌─────────────────────────────────────┐
│  Output tokens: 1,000 tokens        │
│  Cost: $0.015                       │
└─────────────────────────────────────┘
              =
┌─────────────────────────────────────┐
│  TOTAL: $0.021 per user             │
│                                     │
│  Less than a candy bar 🍫           │
└─────────────────────────────────────┘


MONTHLY SCALE:

100 users    ████░░░░░░  $2
1,000 users  ████████░░  $21
10,000 users ██████████  $210

Compare to:
- Starbucks: $5/day = $150/month
- Netflix: $15/month
- Your AI feature: $21/month for 1000 users ✅
```

---

## Implementation Timeline

```
DAY 1: BACKEND (2 hours)
├─ 00:00 - Set API key (2 min) ████████████████████ DONE
├─ 00:02 - Create migration (10 min) ████████████ DONE
├─ 00:12 - Create Edge Function (1 hr) ████░░░░ 25%
├─ 01:12 - Test locally (30 min)
└─ 01:42 - Deploy (3 min)

DAY 1: FRONTEND (2 hours)
├─ 02:00 - Update endpoint (15 min)
├─ 02:15 - Add conversation state (30 min)
├─ 02:45 - UI updates (30 min)
└─ 03:15 - Test end-to-end (45 min)

TOTAL: 4 hours to working prototype
```

---

## The One-Page Cheat Sheet

```
┌────────────────────────────────────────────────────┐
│  CLAUDE FOR PITCH DECK GENERATOR                  │
├────────────────────────────────────────────────────┤
│                                                    │
│  PACKAGE:    npm:@anthropic-ai/sdk                │
│  MODEL:      claude-sonnet-4-5-20250929           │
│  COST:       ~$0.02 per conversation              │
│  TIME:       2-4 hours to build                   │
│                                                    │
│  WHERE:      Supabase Edge Functions ✅           │
│  RUNTIME:    Deno ✅                               │
│  STATELESS:  Yes ✅                                │
│                                                    │
│  SETUP:                                           │
│  1. supabase secrets set ANTHROPIC_API_KEY        │
│  2. Create pitch_conversations table              │
│  3. Create pitch-deck-assistant function          │
│  4. Update frontend endpoint                      │
│  5. Test & deploy                                 │
│                                                    │
│  KEY PATTERN:                                     │
│  - User sends message                             │
│  - Load conversation from DB                      │
│  - Call Claude with full history                  │
│  - Extract data using function calling            │
│  - Save to DB                                     │
│  - Return response                                │
│                                                    │
│  DON'T USE:                                       │
│  ❌ Agent SDK (@anthropic-ai/claude-agent-sdk)   │
│  ❌ MCP for production                            │
│  ❌ Complex container setups                      │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## Quick Reference: Which Doc to Read

```
CONFUSED ABOUT BASICS?
  ↓
  Read: 015-SIMPLE-GUIDE-claude-for-pitch-decks.md
  Time: 15 minutes
  Result: You'll understand everything


NEED DETAILED CODE?
  ↓
  Read: 011-OFFICIAL-claude-sdk-setup-corrected.md
  Time: 30 minutes
  Result: Ready to implement


WANT IMPLEMENTATION PLAN?
  ↓
  Read: 013-FINAL-SUMMARY.md
  Time: 20 minutes
  Result: Step-by-step checklist


STILL CONFUSED ABOUT AGENT SDK?
  ↓
  Read: 014-CLARIFICATION-agent-sdk-vs-mcp.md
  Time: 10 minutes
  Result: Crystal clear on differences
```

---

**Remember**: The simplest solution is usually the right one. Standard SDK works perfectly for your needs. Don't overcomplicate it! 🚀
