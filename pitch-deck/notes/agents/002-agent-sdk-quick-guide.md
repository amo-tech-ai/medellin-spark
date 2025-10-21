# 🎯 Claude Agent SDK: The Practical Guide

**Purpose**: Build intelligent pitch decks that research, validate, and design themselves
**Reading time**: 10 minutes
**Date**: October 16, 2025

---

## THE BIG IDEA

Regular AI writes text. **Agent SDK makes AI that thinks and acts.**

**Before** (Regular API):
```
You: "Create pitch deck"
AI: [Writes 10 generic slides with made-up facts]
You: "Fix slide 3"
AI: [Forgets context, gives inconsistent answer]
```

**After** (Agent SDK):
```
You: "Create investor deck for AI event platform"
Agent: "Researching Latin American event tech market..."
Agent: [Finds real data: $2.5B TAM, 18% growth]
Agent: "Analyzing Hopin, Brella, Eventbrite..."
Agent: [Creates comparison table with real features]
Agent: "Calculating projections from your $15/user pricing..."
Agent: [Generates realistic 3-year forecast]
Agent: "Deck ready. 10 slides with verified facts. Review?"
```

**Key difference**: Agent can use tools to **research, calculate, and validate** — not just guess.

---

## HOW IT WORKS: THE AGENT LOOP

Think of it like a smart intern:

**1. Understand** → "What does this startup need?"
**2. Research** → "Let me find market data..."
**3. Create** → "Here's slide 1 based on real facts"
**4. Verify** → "Let me double-check these numbers"
**5. Improve** → "This slide is too wordy, let me simplify"
**6. Repeat** → "On to slide 2..."

**Why it matters**: Agent doesn't just complete tasks — it **iterates until the work is good**.

---

## CORE CONCEPTS (SIMPLIFIED)

### 1. Tools = Superpowers

Tools are functions the agent calls when it needs capabilities:

**Example**: Generating "Market Opportunity" slide

```
Agent thinking: "I need real market size data"
Agent action: Calls market_research_tool("event tech", "latin america")
Tool returns: { tam: "$2.5B", growth: "18% YoY", source: "Statista 2025" }
Agent: [Writes slide with verified facts + citation]
```

**Without tools**: Agent invents "$5B market" (wrong, no source)
**With tools**: Agent uses "$2.5B from Statista" (correct, cited)

### 2. Sessions = Memory

Sessions remember **everything** in a conversation.

**Real example**:
- **Monday**: User starts session, provides company info (30 minutes)
- **Monday night**: User leaves, session paused
- **Tuesday**: User resumes session, agent remembers all company details
- **Result**: No need to repeat yourself

**Why it matters**: Build decks over multiple sessions, agent never forgets context.

### 3. Subagents = Specialists

Main agent delegates to expert subagents working in parallel.

**Example workflow**:

```
Main Agent: "I need to create a pitch deck"
├─ Research Subagent: "Gathering market data..." [2 min]
├─ Financial Subagent: "Calculating projections..." [2 min]
├─ Design Subagent: "Selecting theme & images..." [2 min]
└─ Content Subagent: "Writing compelling copy..." [2 min]

All complete in 2 minutes (parallel) vs. 8 minutes (sequential)
```

**Why it matters**: 4x faster + each agent specializes without overwhelming main context.

### 4. Streaming = Live Progress

Results appear in real-time, not all at once.

**User sees**:
```
⏳ Researching market data...
✅ Found: $2.5B TAM, 18% CAGR
⏳ Writing Problem slide...
✅ Problem: "Event organizers waste 40 hours/month on manual tasks"
⏳ Generating solution visual...
✅ Solution diagram ready
```

**Why it matters**: User can stop/correct immediately if direction is wrong.

---

## THE 10 ESSENTIAL TOOLS

Build these first. Everything else is enhancement.

| # | Tool | What It Does | Example Output |
|---|------|--------------|----------------|
| **1** | `market_research` | Finds real TAM/SAM/SOM | "$2.5B event tech market, 18% growth" |
| **2** | `competitor_analysis` | Identifies competitors | "Hopin (global), Brella (networking), Eventbrite (ticketing)" |
| **3** | `financial_projection` | Calculates revenue/growth | "$10k MRR → $240k ARR Year 1 at 8% MoM" |
| **4** | `slide_writer` | Creates slide content | "Problem: Event organizers waste 40 hours..." |
| **5** | `theme_selector` | Recommends design | "Soft Ember: Dark bg, orange accent, Inter font" |
| **6** | `image_tool` | Finds/generates visuals | "AI event dashboard mockup, dark mode" |
| **7** | `fact_checker` | Validates claims | "✅ $2.5B verified via Statista" |
| **8** | `save_draft` | Saves to database | "Draft saved: AI Event Pitch v3" |
| **9** | `export_pdf` | Exports to PDF | "PDF ready: 2.3 MB, 10 pages" |
| **10** | `pitch_score` | Rates deck quality | "7/10: Strong problem/solution, weak financials" |

**Start with tools 1-5**: Research + writing + design (core value)
**Add tools 6-8**: Quality + persistence (retention)
**Add tools 9-10**: Export + validation (conversion)

---

## REAL-WORLD IMPACT

### Story 1: First-Time Founder

**María** (AgTech startup, zero pitch experience)

**Traditional approach**:
- 8 hours writing slides
- Googles market size (finds conflicting numbers)
- Invents competitor comparison
- Designs in Canva (6 hours)
- Investor feedback: "Numbers don't match"
- **Total**: 20+ hours, poor quality

**With Agent SDK**:
- Provides basic info: "AgTech platform for Colombian farmers" (5 min)
- Agent researches Colombian AgTech market: $450M, 12% growth
- Agent analyzes 3 competitors automatically
- Agent projects revenue from $50/farm/month pricing
- Agent selects professional theme + agricultural images
- **Total**: 30 minutes, professional quality
- **Result**: Raised $300k seed round

**ROI**: Saved 19.5 hours, raised $300k with better deck

---

### Story 2: Corporate Sales Team

**TechCorp** (needs custom decks per prospect)

**Traditional approach**:
- Copy master deck
- Manually update prospect name (10 places)
- Search for relevant case studies (30 min)
- Guess at ROI numbers
- **Total**: 1 hour per deck, generic

**With Agent SDK**:
- Sales rep: "Create enterprise deck for Hotel Chain Inc"
- Agent customizes everything with prospect's name
- Agent finds hospitality case studies from database
- Agent calculates ROI: "Save 120 hours/year = $15k" (using hospitality labor rates)
- Agent adds hospitality-themed images
- **Total**: 3 minutes, highly personalized
- **Result**: 3x more deals closed

**ROI**: Saved 57 minutes per deck, 3x conversion rate

---

## TOOL DESIGN: THE RIGHT WAY

### ❌ Bad Tool Design

**Tool**: `list_all_contacts`
**Problem**: Returns 10,000 contacts, overwhelms agent with data
**Result**: Agent times out, can't process

### ✅ Good Tool Design

**Tool**: `search_contacts`
**Input**: `query: "event organizers in colombia"`
**Output**: Top 5 matches with names + context
**Result**: Agent gets exactly what it needs

---

### ❌ Bad Tool: Too Many Separate Calls

```
get_customer(id)         → Returns: {name, email}
get_transactions(id)     → Returns: [10 transactions]
get_notes(id)            → Returns: [15 notes]
```
**Problem**: 3 separate tool calls, context bloat

### ✅ Good Tool: Consolidated Context

```
get_customer_context(id)
→ Returns: {
    name, email,
    recent_transactions: [top 3],
    key_notes: [top 3 important ones]
  }
```
**Benefit**: 1 call, focused information

---

### ❌ Bad Tool: Cryptic IDs

**Returns**: `competitors: ["a1b2c3", "d4e5f6", "g7h8i9"]`
**Problem**: Agent has no idea who these are

### ✅ Good Tool: Meaningful Names

**Returns**: `competitors: ["Hopin (global)", "Brella (networking)", "Eventbrite (ticketing)"]`
**Benefit**: Agent understands immediately

---

### ❌ Bad Error: Opaque

**Error**: `Error 404: Resource not found`
**Problem**: Agent doesn't know what to do

### ✅ Good Error: Actionable

**Error**: `Market data not found for "xyz industry". Try: "event tech", "SaaS", "fintech"`
**Benefit**: Agent can retry with valid options

---

## IMPLEMENTATION: 3-PHASE PLAN

### Phase 1: MVP (Week 1-2)

**Build 3 tools**:
1. `deck_outline_tool` - Creates 10-slide structure
2. `slide_writer_tool` - Writes slide content
3. `save_draft_tool` - Saves to Supabase

**Result**: Basic working agent that generates complete decks

**Test**: "Create pitch deck for AI event platform"
**Success**: Deck generated in <2 minutes

---

### Phase 2: Intelligence (Week 3-4)

**Add 3 research tools**:
4. `market_research_tool` - Real market data
5. `competitor_analysis_tool` - Real competitor info
6. `financial_projection_tool` - Accurate calculations

**Result**: Agent uses real data, not hallucinations

**Test**: User verifies all facts are accurate
**Success**: >90% fact accuracy

---

### Phase 3: Quality (Week 5-6)

**Add validation + export**:
7. `fact_checker_tool` - Validates all claims
8. `export_pdf_tool` - Perfect PDF export
9. `pitch_score_tool` - Rates deck quality

**Result**: Professional-grade output

**Test**: Export to PDF, share with investor
**Success**: Zero formatting issues

---

## BEST PRACTICES

### 1. Design Tools Around Outcomes, Not Actions

**❌ Wrong**: "Create 50 tools for every small action"
- `get_market_size`, `get_growth_rate`, `get_competitors`, `get_trends`...
- Result: Agent confused, makes 20 tool calls

**✅ Right**: "Create tools for complete workflows"
- `research_market` → Returns size + growth + competitors + trends in one call
- Result: Agent efficient, 1 tool call

---

### 2. Return Only What Matters

**❌ Wrong**: Return 100-page competitor report
- Agent context overflows
- Can't process all information

**✅ Right**: Return top 3 competitors with key differences
- Agent gets actionable insights
- Makes better decisions

---

### 3. Use Subagents for Specialized Work

**❌ Wrong**: Main agent does everything
- Context bloated with research details
- Slow sequential processing
- Loses focus on main task

**✅ Right**: Delegate to subagents
- Research subagent: Handles 50+ sources, returns summary
- Financial subagent: Runs complex calculations, returns key metrics
- Main agent: Assembles deck with clean inputs
- Result: 3x faster, better quality

---

### 4. Stream for Instant Feedback

**❌ Wrong**: Wait 2 minutes for complete deck
- User doesn't know what's happening
- Can't stop if direction is wrong
- Feels slow even if it's fast

**✅ Right**: Stream each slide as it's ready
- User sees progress in real-time
- Can interrupt and redirect
- Feels instant

---

### 5. Test Tools Independently

**❌ Wrong**: Build all tools, test together
- One broken tool breaks everything
- Can't identify which tool failed
- Debugging nightmare

**✅ Right**: Test each tool alone first
- Verify `market_research_tool` returns valid data
- Verify `financial_projection_tool` calculates correctly
- Then combine into workflows
- Result: Reliable system

---

## SUCCESS METRICS

### What to Measure

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| **Generation Time** | <2 min | User patience threshold |
| **Fact Accuracy** | >90% | Trust and credibility |
| **User Satisfaction** | >85% | Product-market fit |
| **Tool Success Rate** | >95% | System reliability |
| **Conversion Rate** | +50% | Agent quality drives paid |

---

### How to Track

**During development**:
- Count tool calls per deck (should decrease over time as tools improve)
- Measure which tools are used most (invest in those)
- Track errors (fix common failure modes)

**After launch**:
- Survey users: "Were the facts accurate?"
- Monitor tool success/failure rates
- Track time saved vs. manual creation
- Measure free → paid conversion

---

## WHY THIS MATTERS FOR MEDELLIN SPARK

### Current State
You're a **text generator** that creates slides.
Good: Fast, AI-powered
Bad: Generic, invented facts, no verification

### Agent SDK State
You become an **intelligent co-founder** that:
- Researches your market (real data)
- Validates all facts (cites sources)
- Designs professionally (picks themes intelligently)
- Remembers context (builds over multiple sessions)
- Improves iteratively (self-corrects)

### Competitive Position

**vs. PowerPoint**:
- PowerPoint: Manual, takes 20 hours
- You: Automated with intelligence, takes 2 minutes
- **Winner**: You (100x faster)

**vs. Gamma.app**:
- Gamma: Good AI generation, but generic data
- You: AI + real research tools = verified facts
- **Winner**: You (more accurate)

**vs. ALLWEONE (open-source)**:
- ALLWEONE: Self-hosted, basic generation
- You: Cloud + Agent SDK = enterprise intelligence
- **Winner**: You (smarter + secure)

### Business Impact

**Higher conversion**: Quality → Users upgrade to Pro
**Lower churn**: Intelligence → Users stay engaged
**Enterprise sales**: Security + Validation → B2B deals
**Network effects**: Each deck improves all future decks

**Revenue model**:
- Free: 3 decks/month (basic agent)
- Pro ($15/mo): Unlimited + advanced tools (research, validation)
- Team ($12/user/mo): Shared intelligence + custom tools
- Enterprise ($50/user/mo): Dedicated subagents + white-label

---

## THE 80/20 RULE

**80% of value comes from 20% of features.**

### Focus on These 5 Tools First

1. **`market_research_tool`** - Real data = trust
2. **`slide_writer_tool`** - Good content = retention
3. **`theme_selector_tool`** - Professional design = credibility
4. **`save_draft_tool`** - Persistence = workflow
5. **`export_pdf_tool`** - Sharing = conversion

**Everything else is enhancement**, not core value.

---

## COMMON MISTAKES TO AVOID

### ❌ Mistake 1: Too Many Tools Too Soon

Building 30 tools before testing 3.
**Fix**: Start with MVP (3 tools), validate, then expand.

### ❌ Mistake 2: Treating Agent Like API

Expecting deterministic responses, getting frustrated with variation.
**Fix**: Agents are intelligent but non-deterministic. Test with real scenarios, not unit tests.

### ❌ Mistake 3: No Context Management

Loading everything into main agent, hitting token limits.
**Fix**: Use subagents for specialized tasks, save key context to database.

### ❌ Mistake 4: Ignoring Security

Giving agent full database access, users can access others' decks.
**Fix**: Implement permissions, require approval for sensitive actions.

### ❌ Mistake 5: Not Streaming

Generating complete deck, user waits 2 minutes with no feedback.
**Fix**: Stream each slide as it's ready, user sees progress.

---

## NEXT STEPS

### Week 1: Research
- Read Claude Agent SDK docs
- Understand tools, sessions, subagents
- Plan 3 MVP tools

### Week 2: Prototype
- Build MVP: outline + writer + save
- Test with 5 users
- Measure: generation time, satisfaction

### Week 3: Iterate
- Add research tools based on user feedback
- Test fact accuracy
- Refine tool descriptions

### Week 4: Launch
- Roll out to all users
- Monitor metrics
- Plan Phase 2 tools

### Month 2-3: Expand
- Add subagents for parallelization
- Build validation tools
- Implement export tools

### Month 6: Mature
- Full tool suite (15+ tools)
- Advanced subagents
- Enterprise features

---

## THE BOTTOM LINE

**Regular AI**: "Type prompt → get text"
**Agent SDK**: "Describe goal → agent researches, creates, validates, iterates"

**For pitch decks**:
- Founders save 20 hours per deck
- Facts are verified (not invented)
- Design is professional (not generic)
- Quality drives conversion (free → paid)

**Investment**: 6-8 weeks development
**Return**: 3x higher conversion, 50% lower churn, enterprise sales enabled

**The future**: Every startup uses an intelligent agent to create pitch decks. Be first.

---

## RESOURCES

**Essential reading**:
- Agent SDK Intro: https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk
- Tool Design: https://www.anthropic.com/engineering/writing-tools-for-agents
- TypeScript Docs: https://docs.claude.com/en/api/agent-sdk/typescript

**Start here**:
- Custom Tools: https://docs.claude.com/en/api/agent-sdk/custom-tools
- Sessions: https://docs.claude.com/en/api/agent-sdk/sessions
- Subagents: https://docs.claude.com/en/api/agent-sdk/subagents

**Community**:
- GitHub (Python): https://github.com/anthropics/claude-agent-sdk-python
- Tutorial: https://blog.getbind.co/2025/10/03/how-to-create-agents-with-claude-agents-sdk/

---

**🚀 Build agents, not just apps.**

*The difference between a tool and an intelligent co-founder.*
