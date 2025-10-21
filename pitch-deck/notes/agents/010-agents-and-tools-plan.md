# 🎯 Agents & Tools Plan - Pitch Deck Wizard

**Date**: October 16, 2025
**Status**: Implementation Ready
**Approach**: Claude Agent SDK with Natural Language Flow

---

## 🤖 THE SIMPLE TRUTH

We need **ONE intelligent agent** with the **RIGHT TOOLS**, not multiple agents.

Think of it like hiring one smart assistant who has access to:
- A research library (market data, competitor info)
- A notepad (to save conversation progress)
- A presentation toolkit (to create slides)
- Quality checkers (to validate completeness)

---

## 🎭 THE SINGLE AGENT: "Pitch Deck Assistant"

### What It Does
Guides founders through conversation → Collects structured data → Generates professional deck

### Personality
- **Conversational**: Natural chat, not a rigid form
- **Smart**: Extracts key info from free-text answers
- **Helpful**: Suggests improvements, fills gaps with research
- **Efficient**: Gets to the point, doesn't waste time

### Core Capabilities
```typescript
const agent = {
  name: 'pitch-deck-assistant',
  model: 'claude-sonnet-4-5-20250929',
  systemPrompt: `You are an expert pitch deck consultant helping startup
                  founders create investor presentations. Guide them through
                  10 key questions, extract structured data, and create a
                  professional 10-slide deck.`,
  tools: [
    'conversation_memory',      // Remember what user said
    'data_extraction',          // Pull company name, industry from text
    'market_research',          // Fetch TAM/SAM if user doesn't know
    'validation',               // Check if enough info collected
    'deck_generation',          // Call Edge Function to create slides
    'save_progress'             // Save to database
  ]
}
```

---

## 🛠️ REQUIRED TOOLS (6 Total)

### 1. **conversation_memory** - Maintains Context
**Purpose**: Remember everything user has said
**Type**: Built-in (SDK handles this automatically)

**What it does**:
```
User (Message 1): "My company is EventAI"
User (Message 5): "We target event planners"
↓
Agent remembers: company_name = "EventAI", target_market = "event planners"
```

**No code needed** - Agent SDK provides this out of the box.

---

### 2. **data_extraction** - Parse Unstructured Input
**Purpose**: Extract structured data from natural language
**Type**: Custom function

**Example**:
```typescript
// Input
user_message = "We're EventAI, an AI platform for event planners in LatAm"

// Tool extracts
{
  company_name: "EventAI",
  industry: "Event Technology",
  target_market: "Event planners",
  geography: "Latin America"
}
```

**Implementation**: Use Claude's function calling
```typescript
const extract_data = {
  name: 'extract_startup_data',
  description: 'Extract company info from user message',
  input_schema: {
    type: 'object',
    properties: {
      message: { type: 'string' }
    }
  },
  // Agent calls this, returns structured JSON
}
```

---

### 3. **market_research** - Fill Knowledge Gaps
**Purpose**: Fetch data when user doesn't know
**Type**: Custom API call (optional but valuable)

**Use case**:
```
User: "I'm not sure about market size..."
Agent: "Let me research that for you"
↓ Calls market_research tool ↓
Returns: TAM = $2.5B, Growth = 18%
Agent: "Based on research, event tech in LatAm is $2.5B..."
```

**Quick implementation**:
```typescript
// Option 1: Use web search
tools: ['web-search']  // Built into SDK

// Option 2: Custom API
async function market_research(industry, region) {
  const data = await fetch(`https://api.statista.com/...`)
  return { tam: data.market_size, growth: data.cagr }
}
```

---

### 4. **validation** - Quality Check
**Purpose**: Ensure we have minimum viable data before generating
**Type**: Simple function

**Logic**:
```typescript
function validate_pitch_data(collected_data) {
  const required = [
    'company_name',
    'problem',
    'solution',
    'target_market',
    'business_model'
  ]

  const missing = required.filter(field => !collected_data[field])

  if (missing.length > 0) {
    return { ready: false, missing }
  }

  return { ready: true }
}
```

**Agent uses this** to decide when to show "Generate Deck" button.

---

### 5. **deck_generation** - Create the Slides
**Purpose**: Call existing Edge Function to generate deck
**Type**: Supabase function invoke

**Implementation**:
```typescript
async function generate_pitch_deck(collected_data, profile_id) {
  // Format as prompt for Edge Function
  const prompt = `
    Company: ${collected_data.company_name}
    Industry: ${collected_data.industry}
    Problem: ${collected_data.problem}
    Solution: ${collected_data.solution}
    Market: ${collected_data.target_market}
    Business Model: ${collected_data.business_model}
    Traction: ${collected_data.traction}
    Team: ${collected_data.team}
    Ask: ${collected_data.fundraising_amount}
  `

  const { data, error } = await supabase.functions.invoke('generate-pitch-deck', {
    body: { prompt, profile_id }
  })

  return data.deck_id
}
```

**Note**: This tool just CALLS the existing Edge Function, doesn't recreate it.

---

### 6. **save_progress** - Persistence
**Purpose**: Save conversation state to database
**Type**: Supabase INSERT/UPDATE

**What it saves**:
```typescript
{
  conversation_id: uuid,
  profile_id: user.id,
  current_stage: 'COLLECTING_MARKET_INFO',
  collected_data: {
    company_name: 'EventAI',
    industry: 'Event Tech',
    problem: '...',
    // etc
  },
  messages: [
    { role: 'assistant', content: 'Welcome!' },
    { role: 'user', content: 'My company is...' }
  ],
  created_at: timestamp,
  updated_at: timestamp
}
```

**Benefit**: User can close browser, come back later, resume where they left off.

---

## 🔄 THE WORKFLOW (How It All Works Together)

### Phase 1: Greeting & Setup
```
[User lands on /pitch-deck-wizard]

Agent (using conversation_memory):
"Hi! Let's create your pitch deck. This takes about 10 questions.
 Ready to start?"

User: "Yes"

Agent (using save_progress):
→ Creates conversation_id
→ Saves to pitch_conversations table
→ Status: 'STARTED'
```

---

### Phase 2: Data Collection (Questions 1-8)
```
Agent: "First, what's your company name?"
User: "EventAI - we use AI to help event planners"

Agent (using data_extraction):
→ Extracts: company_name = "EventAI"
→ Extracts: industry = "Event Technology"
→ Notes: "AI-powered" = tech differentiation

Agent (using save_progress):
→ Updates collected_data in database
→ Status: 'COLLECTING_BASICS'

Agent: "Got it! EventAI in event tech. What problem do you solve?"
[continues through 10 questions...]
```

---

### Phase 3: Validation
```
[After question 8]

Agent (using validation):
→ Checks: All required fields filled? ✅
→ Checks: Quality sufficient? ✅

Agent: "Perfect! I have everything I need.
       Here's what I collected:

       • Company: EventAI
       • Industry: Event Technology
       • Problem: Manual planning takes 20+ hours
       • Solution: AI automation saves 80% time
       • Market: Enterprise event planners
       • Model: SaaS, $99/mo

       Ready to generate your deck?"

[Shows button: Generate My Pitch Deck]
```

---

### Phase 4: Generation
```
User: *clicks "Generate My Pitch Deck"*

Agent (using deck_generation):
→ Calls Edge Function with collected_data
→ Edge Function creates 10 slides
→ Returns deck_id

Agent (using save_progress):
→ Updates conversation: deck_id, status='COMPLETED'

Agent: "✅ Your pitch deck is ready!
       [Preview] [Edit Slides] [Export]"

→ Redirects to /pitch-deck/{deck_id}/preview
```

---

## 📊 COMPARISON: Old vs New Approach

| Feature | Current (Broken) | With Agent SDK |
|---------|-----------------|----------------|
| **Chat Interface** | ✅ Works | ✅ Works |
| **Data Collection** | ❌ Unstructured | ✅ Structured extraction |
| **Memory** | ❌ None | ✅ Full conversation context |
| **Progress Tracking** | ❌ No state | ✅ Saved to DB, resumable |
| **Validation** | ❌ No checks | ✅ Quality gates |
| **Deck Generation** | ❌ Never happens | ✅ Automatic when ready |
| **User Experience** | 😡 Frustrating | 😊 Smooth |
| **Success Rate** | 0% | 90%+ |

---

## 💡 WHY THIS IS BETTER THAN ALTERNATIVES

### vs. Traditional Form
**Form**: Fill 20 fields → Submit → Hope for best
**Agent**: Natural chat → Smart extraction → Guided experience

### vs. CopilotKit State Machine
**CopilotKit**: Rigid states → Must answer in order → Brittle
**Agent**: Flexible → Understands context → Robust

### vs. Pure OpenAI
**OpenAI**: Chat only → No tools → Can't save or generate
**Agent**: Chat + Tools → Can research, save, generate

---

## 🚀 IMPLEMENTATION STEPS

### Step 1: Setup (15 minutes)
```bash
# Already done! Agent SDK docs exist in:
# - lovable-plan/agents/009-agent-sdk-setup.md
# - lovable-plan/agents/008-agent-sdk-quick-ref.md

# Add to Edge Function:
import { query } from 'npm:@anthropic-ai/claude-agent-sdk'
```

### Step 2: Create Agent (30 minutes)
```typescript
// supabase/functions/pitch-deck-agent/index.ts

const agent = query({
  prompt: systemPrompt + userMessage,
  options: {
    model: 'claude-sonnet-4-5-20250929',
    apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
    tools: [
      extract_data_tool,
      validate_tool,
      market_research_tool,
      generate_deck_tool,
      save_progress_tool
    ]
  }
})

// Stream responses back to frontend
for await (const message of agent) {
  if (message.type === 'assistant') {
    // Send to frontend via SSE or WebSocket
  }
}
```

### Step 3: Define Tools (1 hour)
```typescript
// tools/extract-data.ts
// tools/validation.ts
// tools/market-research.ts
// tools/deck-generation.ts
// tools/save-progress.ts

// Each tool = 20-30 lines of code
```

### Step 4: Update Frontend (30 minutes)
```typescript
// src/pages/PitchDeckWizard.tsx

// Connect to Agent Edge Function instead of /chat
const response = await fetch(`${SUPABASE_URL}/functions/v1/pitch-deck-agent`, {
  method: 'POST',
  body: JSON.stringify({
    message: userMessage,
    conversation_id: conversationId,
    profile_id: user.id
  })
})

// Stream responses
const reader = response.body.getReader()
// ... handle streaming
```

### Step 5: Test (30 minutes)
- [ ] Agent responds to initial greeting
- [ ] Extracts company name correctly
- [ ] Validates when data is complete
- [ ] Calls generation when ready
- [ ] Saves progress to database
- [ ] User can resume conversation

**Total time**: ~3 hours for working prototype

---

## ✅ SUCCESS CRITERIA

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Completion Rate** | 90%+ | Users who start → get deck |
| **Time to Deck** | <5 min | Conversation start → preview |
| **Data Quality** | 95%+ | Decks have all 10 slides |
| **User Satisfaction** | 4.5/5 | Post-generation rating |
| **Error Rate** | <5% | Failed generations |

---

## 🎯 NEXT ACTIONS

1. **Read setup guide**: `lovable-plan/agents/009-agent-sdk-setup.md`
2. **Create Edge Function**: `supabase/functions/pitch-deck-agent/index.ts`
3. **Define 6 tools**: Start with validation (simplest), end with market_research (optional)
4. **Test locally**: Use `supabase functions serve` to test
5. **Update frontend**: Switch from `/chat` to `/pitch-deck-agent`
6. **Deploy**: `supabase functions deploy pitch-deck-agent`

---

## 📚 RELATED DOCS

- **Setup Instructions**: `lovable-plan/agents/009-agent-sdk-setup.md`
- **Quick Reference**: `lovable-plan/agents/008-agent-sdk-quick-ref.md`
- **Gap Analysis**: `lovable-plan/agents/004-pitch-deck-wizard-gap-analysis.md`
- **Original Plan**: `lovable-plan/pitch-deck/12-PITCH_DECK_WIZARD_PLAN.md`

---

**The Bottom Line**: One smart agent + Six focused tools = Working pitch deck wizard

**Estimated Implementation**: 3-4 hours for MVP
**Expected Impact**: 0% → 90% success rate
**Status**: Ready to build 🚀
