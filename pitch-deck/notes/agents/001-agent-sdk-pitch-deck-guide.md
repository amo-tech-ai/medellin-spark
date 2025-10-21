# 🤖 Claude Agent SDK for Pitch Deck Generation

**Document**: Comprehensive Guide to Building Intelligent Pitch Deck Agents
**Date**: October 16, 2025
**Version**: 1.0
**Purpose**: Transform Medellin Spark from simple AI generator to intelligent startup assistant

---

## 📖 TABLE OF CONTENTS

1. [What is Claude Agent SDK](#what-is-claude-agent-sdk)
2. [Core Concepts](#core-concepts)
3. [Why Use It for Pitch Decks](#why-use-it-for-pitch-decks)
4. [Tool Architecture](#tool-architecture)
5. [Real-World Use Cases](#real-world-use-cases)
6. [Implementation Strategy](#implementation-strategy)
7. [Best Practices](#best-practices)
8. [Success Metrics](#success-metrics)

---

## 🎯 WHAT IS CLAUDE AGENT SDK

### The Fundamental Difference

**Regular Claude API**:
- Simple request → response
- No memory between calls
- No access to external tools
- Static: one prompt, one answer

**Claude Agent SDK**:
- Continuous conversation loop
- Maintains context across interactions
- Can call external tools and functions
- Dynamic: gathers context → takes action → verifies work → repeats

### The Agent Loop

Think of it like a smart intern working on your pitch deck:

1. **Gather Context**: "What information do I need?" (researches market data, competitor info)
2. **Take Action**: "Let me create this slide" (writes content, fetches images)
3. **Verify Work**: "Does this make sense?" (checks facts, validates structure)
4. **Repeat**: "What's next?" (moves to next slide, refines previous work)

### Key Innovation

Instead of treating Claude as a text generator, the SDK treats it as an **autonomous agent with access to a toolbox**. It can:

- Search the web for market data
- Query databases for company information
- Fetch financial projections
- Generate and validate images
- Save work incrementally
- Self-correct mistakes

---

## 🧩 CORE CONCEPTS

### 1. Sessions

**What it is**: A continuous conversation that remembers everything.

**How it works**:
- User starts: "Create pitch deck for AI event platform"
- Claude asks clarifying questions
- User provides company details
- Claude remembers all context for next steps
- Can pause and resume later
- Can fork (create branches) to explore alternatives

**Real-world example**:
> Founder starts session Monday: "I need a pitch deck for investors."
> Claude asks about company, market, competitors.
> Founder provides info but has to leave.
> Tuesday: Founder resumes session, Claude remembers everything.
> Generates deck with full context from Monday.

### 2. Tools

**What it is**: Functions that Claude can call when it needs external capabilities.

**Types of tools**:
- **Research tools**: Fetch market size, competitor data, industry trends
- **Data tools**: Calculate financial projections, growth rates
- **Creative tools**: Generate images, suggest color palettes
- **Storage tools**: Save drafts to database, load previous decks
- **Export tools**: Convert to PDF, PPTX, or shareable link

**Philosophy** (from Anthropic's guide):
> Tools are NOT just API wrappers. They're carefully designed actions that give Claude superpowers while keeping things safe and predictable.

**Example tool flow**:
1. User: "Include market size for event tech in Latin America"
2. Claude thinks: "I need market data"
3. Calls `market_research_tool` with parameters: `{industry: "event tech", region: "latam"}`
4. Tool returns: `{tam: "$2.5B", sam: "$450M", growth: "18% YoY"}`
5. Claude incorporates into slide 4 (Market Opportunity)

### 3. Subagents

**What it is**: Specialized mini-agents that handle specific tasks in parallel.

**Why it matters**:
- **Prevents context overload**: Main agent delegates work to specialists
- **Enables parallelization**: Research agent + design agent + financial agent work simultaneously
- **Maintains focus**: Each agent has its own expertise and tools

**Real-world example for pitch decks**:

**Main Agent** (orchestrator):
- Understands user's startup vision
- Decides what information is needed
- Coordinates subagents
- Assembles final deck

**Research Subagent**:
- Has access to web search, databases
- Gathers market data, competitor info
- Returns structured insights

**Financial Subagent**:
- Has access to calculation tools
- Projects revenue, burn rate, runway
- Returns validated numbers

**Design Subagent**:
- Has access to image generation, templates
- Creates visual assets, color schemes
- Returns design assets

**Content Subagent**:
- Has access to writing guidelines
- Crafts compelling narratives
- Returns slide copy optimized for investors

### 4. Streaming

**What it is**: Results arrive in real-time as Claude works, not all at once.

**Why it's powerful**:
- User sees progress (slide 1 complete... slide 2 in progress...)
- Can interrupt if direction is wrong
- Feels fast (instant feedback vs. waiting 2 minutes)
- Can approve/reject slides as they're generated

**User experience**:
```
[⏳] Researching market data...
[✅] Market research complete: $2.5B TAM, 18% growth
[⏳] Writing Problem slide...
[✅] Problem slide ready: "Event organizers waste 40 hours on manual tasks"
[⏳] Generating solution diagram...
[✅] Solution slide ready with AI workflow visual
[⏳] Calculating financial projections...
```

### 5. Permissions

**What it is**: Fine-grained control over what Claude can and cannot do.

**Permission levels**:
- **Read only**: Can view data but not modify
- **Write with approval**: Must ask permission before saving
- **Auto-approve safe actions**: Can create slides freely
- **Restricted zones**: Cannot access financial data without explicit permission

**Security example**:
- ✅ Allowed: Generate slide content, fetch market data
- ⚠️ Requires approval: Save to database, send emails
- ❌ Blocked: Delete existing decks, modify user profiles

---

## 🚀 WHY USE IT FOR PITCH DECKS

### Problem with Traditional AI

**Current approach** (simple API call):
- User: "Create pitch deck for AI event platform"
- AI: Generates generic 10 slides with invented facts
- User: "Add market data"
- AI: Makes up numbers (no real research)
- User: "Fix slide 3"
- AI: Doesn't remember context from previous slides

### Agent SDK Solution

**Intelligent approach**:
- User: "Create pitch deck for AI event platform in Medellín"
- Agent: "Let me research the event tech market in Latin America..."
  - Calls `market_research_tool`
  - Finds real TAM/SAM/SOM data
- Agent: "Found 3 main competitors. Let me analyze them..."
  - Calls `competitor_analysis_tool`
  - Returns Hopin vs. Brella vs. Eventbrite comparison
- Agent: "Based on your $15/user pricing, here are projections..."
  - Calls `financial_projection_tool`
  - Calculates realistic 3-year growth
- Agent: "I'll use the 'Soft Ember' theme for investor credibility..."
  - Calls `theme_selector_tool`
  - Applies professional design
- Agent: "Deck complete. Would you like to adjust anything?"
  - Remembers all context
  - Can refine individual slides without starting over

### Key Benefits

**1. Accuracy**
- Uses real data from tools (not hallucinations)
- Validates facts before including them
- Cites sources for credibility

**2. Intelligence**
- Understands startup context (stage, industry, market)
- Asks clarifying questions when needed
- Suggests improvements based on best practices

**3. Efficiency**
- Works autonomously once given context
- Handles research, writing, design in parallel
- Iterates until deck is perfect

**4. Personalization**
- Remembers your startup's unique story
- Adapts tone for target audience (investors vs. demo day)
- Learns from feedback on previous decks

---

## 🛠️ TOOL ARCHITECTURE

### Core Tools for Pitch Deck Generation

#### 1. Research & Data Tools

**`market_research_tool`**
- **Purpose**: Finds real market data (TAM/SAM/SOM, growth rates, trends)
- **Inputs**: Industry, region, company stage
- **Outputs**: Market size numbers, growth projections, trends
- **When used**: Slide 4 (Market Opportunity)
- **Real example**: "Event tech in LATAM: $2.5B TAM, 18% CAGR, dominated by 3 players"

**`competitor_analysis_tool`**
- **Purpose**: Identifies and compares top competitors
- **Inputs**: Industry, target market, key features
- **Outputs**: Competitor table with strengths/weaknesses
- **When used**: Slide 6 (Competition)
- **Real example**: "Hopin (global), Brella (networking-focused), Eventbrite (ticketing-only)"

**`trend_analysis_tool`**
- **Purpose**: Finds emerging industry trends and opportunities
- **Inputs**: Industry keywords, time period
- **Outputs**: Top 5 trends with supporting data
- **When used**: Slide 2 (Problem), Slide 4 (Market)
- **Real example**: "AI automation in events: 45% of organizers want automated scheduling"

#### 2. Financial & Calculation Tools

**`financial_projection_tool`**
- **Purpose**: Calculates realistic revenue, growth, and metrics
- **Inputs**: Pricing model, user growth assumptions, costs
- **Outputs**: 3-year P&L, unit economics, burn rate
- **When used**: Slide 7 (Business Model), Slide 9 (Financials)
- **Real example**: "Starting at $10k MRR, 8% MoM growth → $240k ARR Year 1, $1.2M Year 2"

**`unit_economics_tool`**
- **Purpose**: Calculates CAC, LTV, payback period
- **Inputs**: Acquisition cost, ARPU, churn rate
- **Outputs**: CAC/LTV ratio, months to payback
- **When used**: Slide 9 (Financials)
- **Real example**: "CAC $50, LTV $500, 10:1 ratio, 6-month payback"

**`valuation_tool`**
- **Purpose**: Estimates company valuation using comparables
- **Inputs**: Revenue, growth rate, industry
- **Outputs**: Valuation range with reasoning
- **When used**: Slide 10 (The Ask)
- **Real example**: "5-10x revenue multiple → $5-10M valuation at $1M ARR"

#### 3. Content & Writing Tools

**`slide_writer_tool`**
- **Purpose**: Generates compelling slide copy
- **Inputs**: Slide type (problem, solution, etc.), company data
- **Outputs**: Title, 3-5 bullets, supporting text
- **When used**: All content slides
- **Real example**: Problem slide → "Event organizers waste 40 hours/month on manual tasks"

**`storytelling_tool`**
- **Purpose**: Crafts narrative arc across deck
- **Inputs**: Company story, target audience
- **Outputs**: Slide order, transition phrases, emotional hooks
- **When used**: Deck assembly phase
- **Real example**: Starts with pain point → builds to solution → ends with vision

**`tone_optimizer_tool`**
- **Purpose**: Adjusts language for audience
- **Inputs**: Target audience (VCs, corporates, demo day)
- **Outputs**: Rewritten copy in appropriate style
- **When used**: After draft completion
- **Real example**: "Streamline" (VC pitch) vs. "Get stuff done faster" (demo day)

#### 4. Design & Visual Tools

**`image_generation_tool`**
- **Purpose**: Creates custom visuals for slides
- **Inputs**: Slide concept, style preferences
- **Outputs**: AI-generated image URL
- **When used**: Hero slides (cover, solution demo)
- **Real example**: "AI event assistant dashboard mockup with dark mode"

**`stock_image_tool`**
- **Purpose**: Finds high-quality stock photos
- **Inputs**: Keyword, color palette, orientation
- **Outputs**: Curated image URLs from Unsplash
- **When used**: Background images, team photos
- **Real example**: "Professional event venue photo, warm tones, landscape"

**`theme_selector_tool`**
- **Purpose**: Recommends design theme based on context
- **Inputs**: Industry, audience, brand guidelines
- **Outputs**: Theme name, color palette, font pairing
- **When used**: Before content generation
- **Real example**: "Soft Ember for investor pitch: Dark backgrounds, orange accents, Inter font"

**`icon_tool`**
- **Purpose**: Suggests relevant icons for concepts
- **Inputs**: Concept keywords
- **Outputs**: Icon recommendations from library
- **When used**: Feature lists, process diagrams
- **Real example**: "AI → brain icon, Event → calendar icon, Growth → upward arrow"

#### 5. Validation & Quality Tools

**`fact_checker_tool`**
- **Purpose**: Verifies claims and statistics
- **Inputs**: Statement to verify
- **Outputs**: Verification result + source
- **When used**: After content generation, before finalization
- **Real example**: "Claim: 'Event tech is $5B market' → Verified: Actually $2.5B per Statista 2025"

**`pitch_score_tool`**
- **Purpose**: Evaluates deck quality using VC criteria
- **Inputs**: Complete deck JSON
- **Outputs**: Score (1-10) with improvement suggestions
- **When used**: Final review phase
- **Real example**: "Score 7/10: Strong problem/solution, weak financials. Add unit economics."

**`readability_tool`**
- **Purpose**: Ensures slides are clear and concise
- **Inputs**: Slide text
- **Outputs**: Readability score, simplification suggestions
- **When used**: After content generation
- **Real example**: "Slide 3 has 8 bullets, 12+ words each. Recommend 5 bullets, 7 words max."

#### 6. Database & Persistence Tools

**`save_draft_tool`**
- **Purpose**: Saves work-in-progress to Supabase
- **Inputs**: Deck JSON, user ID, metadata
- **Outputs**: Save confirmation + draft ID
- **When used**: After every major change
- **Real example**: "Draft saved: 'AI Event Platform Pitch v3' - 8/10 slides complete"

**`load_template_tool`**
- **Purpose**: Retrieves deck templates or previous decks
- **Inputs**: Template category or deck ID
- **Outputs**: Deck structure JSON
- **When used**: Initialization phase
- **Real example**: "Loading 'SaaS Seed Round' template with 10 slides..."

**`version_history_tool`**
- **Purpose**: Manages deck versions for rollback
- **Inputs**: Deck ID
- **Outputs**: List of versions with timestamps
- **When used**: User requests "show previous versions"
- **Real example**: "v1 (Oct 14): Draft, v2 (Oct 15): Added financials, v3 (Oct 16): Final"

#### 7. Export & Sharing Tools

**`export_pdf_tool`**
- **Purpose**: Converts deck to high-quality PDF
- **Inputs**: Deck JSON, quality settings
- **Outputs**: PDF file URL
- **When used**: User clicks "Export to PDF"
- **Real example**: "Generating PDF with 300 DPI images... Done! Download ready."

**`export_pptx_tool`**
- **Purpose**: Converts deck to PowerPoint format
- **Inputs**: Deck JSON, template
- **Outputs**: PPTX file URL
- **When used**: User needs editable slides
- **Real example**: "Exporting to PowerPoint with 16:9 layout..."

**`share_link_tool`**
- **Purpose**: Creates public shareable link
- **Inputs**: Deck ID, privacy settings
- **Outputs**: Unique URL with access controls
- **When used**: User wants to share with investors
- **Real example**: "Share link: medellinspark.com/deck/abc123xyz (public, view-only)"

---

## 🎬 REAL-WORLD USE CASES

### Use Case 1: First-Time Founder (Zero Experience)

**Scenario**: María is building an AgTech startup but has never created a pitch deck.

**Without Agent SDK** (traditional approach):
1. María searches "how to make pitch deck"
2. Finds generic template (10 slides)
3. Spends 8 hours writing slides
4. Googles market size (finds conflicting numbers)
5. Invents competitor comparison (missing key players)
6. Designs slides in Canva (takes 6 hours)
7. Gets feedback: "Numbers don't add up"
8. Restarts from scratch
**Total time**: 20+ hours, mediocre result

**With Agent SDK** (intelligent agent):
1. María: "Create investor pitch deck for AgTech platform in Colombia"
2. Agent: "Tell me about your solution and target farmers"
3. María provides basic info (5 minutes)
4. Agent workflow:
   - Research subagent: Finds Colombian AgTech market ($450M), 12% growth
   - Competitor subagent: Identifies 3 main players, creates comparison
   - Financial subagent: Projects revenue from María's $50/farm/mo pricing
   - Content subagent: Writes compelling problem/solution narrative
   - Design subagent: Selects professional theme, finds agricultural images
5. Agent: "Draft ready for review. Highlights: $450M market, 3x cheaper than competitors"
6. María reviews, asks to add team bios
7. Agent adds bios with proper formatting
**Total time**: 30 minutes, professional result

**Outcome**: María raises $300k seed round with deck that took 30 minutes vs. 20 hours.

---

### Use Case 2: Experienced Founder (Needs Speed)

**Scenario**: Carlos is a repeat entrepreneur pitching his third startup. Knows what investors want but has no time.

**Without Agent SDK**:
1. Carlos uses his old deck as template
2. Updates numbers manually
3. Researches new market (takes 2 hours)
4. Designs new visuals (takes 3 hours)
5. Reviews and edits (takes 2 hours)
**Total time**: 7 hours

**With Agent SDK**:
1. Carlos: "Create Series A deck for fintech platform, similar to my last deck but for payments"
2. Agent: Loads Carlos's previous deck as template
3. Agent: "Detected fintech/payments. Researching Latin American payment market..."
4. Workflow executes in parallel:
   - Loads old deck structure (proven to work)
   - Updates market data (fintech vs. previous industry)
   - Adjusts financial projections (Series A vs. seed metrics)
   - Selects fintech-appropriate theme
   - Generates payment flow diagrams
5. Agent: "Complete. Key changes: $8B fintech market (was $2B), 35% YoY growth"
**Total time**: 10 minutes

**Outcome**: Carlos closes $5M Series A with deck that leveraged his experience but saved 7 hours.

---

### Use Case 3: Corporate Team (Sales Deck)

**Scenario**: TechCorp sales team needs custom pitch decks for each prospect.

**Without Agent SDK**:
1. Sales rep copies master deck
2. Manually updates customer name
3. Tries to find relevant case studies (takes 30 minutes)
4. Guesses at ROI numbers
5. Designs custom visuals (can't, not a designer)
**Total time**: 1 hour per deck, generic result

**With Agent SDK**:
1. Sales rep: "Create enterprise sales deck for Hotel Chain Inc, focus on event management ROI"
2. Agent: "Analyzing Hotel Chain Inc's profile and industry..."
3. Workflow:
   - Loads enterprise sales template
   - Customizes all text with prospect's name
   - Finds hospitality industry case studies from database
   - Calculates ROI: "Save 120 hours/year = $15k" (using hospitality labor rates)
   - Adds hospitality-relevant images
   - Adjusts tone to enterprise style
4. Agent: "Ready. Personalized for hotels: emphasizes staff time savings, integrations with PMS systems"
**Total time**: 3 minutes

**Outcome**: Sales team closes 3x more deals with personalized, data-driven decks.

---

### Use Case 4: Accelerator (Batch Deck Reviews)

**Scenario**: Startup accelerator reviews 50 pitch decks per batch, provides feedback.

**Without Agent SDK**:
1. Mentor reviews deck manually (20 minutes each)
2. Writes feedback in email (10 minutes)
3. Founders iterate, resubmit
4. Mentor reviews again
**Total time**: 25 hours for 50 decks

**With Agent SDK**:
1. Accelerator: "Review all batch decks using YC scoring criteria"
2. Agent workflow (for each deck):
   - Loads deck
   - Applies scoring rubric:
     - Problem clarity (0-10)
     - Solution uniqueness (0-10)
     - Market size credibility (0-10)
     - Team strength (0-10)
     - Financial realism (0-10)
   - Flags specific issues: "Slide 4: Market size cited without source"
   - Suggests improvements: "Competitor comparison weak - add feature table"
   - Generates 5-minute feedback summary
3. Agent: "50 decks scored. Average: 7.2/10. Top 10 decks flagged for fast-track"
**Total time**: 2 hours (50 decks × 2 minutes + mentor review of summaries)

**Outcome**: Accelerator provides consistent, actionable feedback 12x faster.

---

### Use Case 5: Pitch Deck Consultant (Scaling Services)

**Scenario**: Freelance consultant charges $2,000 per pitch deck but can only handle 2-3 clients/month.

**Without Agent SDK**:
1. Calls with client (2 hours)
2. Research (4 hours)
3. Writing (6 hours)
4. Design (8 hours)
5. Revisions (4 hours)
**Total time**: 24 hours per deck
**Revenue**: $2,000 × 2 decks = $4,000/mo

**With Agent SDK**:
1. Consultant: "Create investor deck for [Client X] using my premium template"
2. Agent handles 80% of work:
   - Research: Automated
   - First draft: Automated
   - Design: Automated with consultant's style guidelines
3. Consultant reviews and adds expert touches (4 hours)
**Total time**: 4 hours per deck (6x faster)
**Revenue**: $2,000 × 12 decks = $24,000/mo (6x income)

**Outcome**: Consultant scales business without hiring, 6x revenue increase.

---

## 📋 IMPLEMENTATION STRATEGY

### Phase 1: Foundation (Week 1-2)

**Goal**: Get basic agent working with 3 core tools.

**Tools to build**:
1. `deck_outline_tool` - Creates 10-slide structure
2. `slide_writer_tool` - Generates slide content
3. `save_draft_tool` - Saves to Supabase

**User experience**:
- User: "Create pitch deck for AI event platform"
- Agent creates outline
- Agent writes each slide
- Agent saves draft
- User can edit and regenerate

**Success metric**: Generate complete 10-slide deck in under 2 minutes.

---

### Phase 2: Intelligence (Week 3-4)

**Goal**: Add research capabilities for accuracy.

**Tools to add**:
4. `market_research_tool` - Real market data
5. `competitor_analysis_tool` - Real competitor info
6. `financial_projection_tool` - Accurate calculations

**User experience**:
- Agent now uses real data (not hallucinations)
- Cites sources
- Provides realistic financial projections

**Success metric**: 90%+ fact accuracy verified by users.

---

### Phase 3: Design (Week 5-6)

**Goal**: Make decks visually professional.

**Tools to add**:
7. `theme_selector_tool` - Smart theme recommendation
8. `image_tool` - Fetch/generate images
9. `icon_tool` - Suggest relevant icons

**User experience**:
- Decks look professionally designed
- Images match content
- Colors and fonts appropriate for audience

**Success metric**: 80%+ users don't change design.

---

### Phase 4: Specialization (Week 7-8)

**Goal**: Add subagents for complex tasks.

**Subagents to create**:
- `research_agent` - Handles all research tasks
- `financial_agent` - Handles projections
- `design_agent` - Handles visual assets
- `content_agent` - Handles writing

**User experience**:
- Multiple tasks happen in parallel (faster)
- Agents don't overwhelm each other's context
- More focused expertise per domain

**Success metric**: Deck generation time reduced to under 1 minute.

---

### Phase 5: Polish (Week 9-10)

**Goal**: Add quality control and export.

**Tools to add**:
10. `fact_checker_tool` - Validate claims
11. `pitch_score_tool` - Score deck quality
12. `export_pdf_tool` - Generate PDF
13. `export_pptx_tool` - Generate PowerPoint

**User experience**:
- Agent validates all facts before finalizing
- Provides quality score with suggestions
- Export works perfectly on first try

**Success metric**: 95%+ users satisfied with exports.

---

## ✅ BEST PRACTICES

### 1. Tool Design

**Do**: Design tools around high-impact workflows
- ✅ `search_contacts` (finds relevant contacts)
- ❌ `list_all_contacts` (overwhelms with data)

**Do**: Consolidate related operations
- ✅ `get_customer_context` (customer + transactions + notes in one call)
- ❌ Separate `get_customer`, `get_transactions`, `get_notes` (too many calls)

**Do**: Use meaningful names and IDs
- ✅ Return company names: "Hopin, Brella, Eventbrite"
- ❌ Return UUIDs: "a1b2c3, d4e5f6, g7h8i9"

**Do**: Provide helpful error messages
- ✅ "Market data not found for 'xyz'. Try 'event tech' or 'SaaS'?"
- ❌ "Error 404: Resource not found"

---

### 2. Context Management

**Do**: Use subagents to prevent context overload
- Research agent explores many documents
- Main agent only sees summary

**Do**: Save important context to CLAUDE.md
- Startup name, industry, target market
- Persist across sessions

**Don't**: Load entire databases into context
- Use tools to query specific data
- Return only what's relevant

---

### 3. Security

**Do**: Use least-privilege permissions
- Research agent: Read-only access
- Design agent: Can generate images but not modify database
- Main agent: Full access with user approval

**Do**: Require approval for sensitive actions
- Sending emails
- Deleting decks
- Publishing publicly

**Don't**: Give agents unrestricted access
- Always define allowed/disallowed tools
- Use permission modes wisely

---

### 4. User Experience

**Do**: Stream results for instant feedback
- User sees each slide as it's created
- Can interrupt if direction is wrong

**Do**: Provide clear progress indicators
- "Researching market data... ✅ Complete"
- "Generating slide 3 of 10... ⏳"

**Do**: Enable easy iteration
- "Change slide 4" → Agent remembers full context
- "Make it more casual" → Agent adjusts tone

**Don't**: Make users start over
- Sessions maintain full context
- Small changes don't require regeneration

---

### 5. Testing

**Do**: Test each tool independently
- Does market_research_tool return valid data?
- Does financial_projection_tool calculate correctly?

**Do**: Create realistic test scenarios
- First-time founder (needs lots of help)
- Experienced founder (knows what they want)
- Corporate team (needs customization)

**Do**: Monitor drift over time
- Are decks getting better or worse?
- Which tools are most/least used?

---

## 📊 SUCCESS METRICS

### Product Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Deck Generation Time** | <2 minutes | Average time from start to first draft |
| **Fact Accuracy** | >90% | User feedback: "Were facts correct?" |
| **Design Satisfaction** | >80% | Users who don't change design |
| **Tool Success Rate** | >95% | % of tool calls that succeed |
| **User Retention** | >70% | Users who create 2nd deck within 7 days |

---

### Business Metrics

| Metric | Target | Impact |
|--------|--------|--------|
| **Free → Pro Conversion** | 10% | Agent quality drives upgrades |
| **Time Saved per Deck** | 18 hours | Quantifiable user value |
| **Decks Created per User** | 3.5 | Agent makes creation effortless |
| **Enterprise Adoption** | 20% | Quality enables B2B sales |

---

### Agent Performance Metrics

| Metric | Target | Purpose |
|--------|--------|---------|
| **Context Efficiency** | <50k tokens/deck | Keep conversations focused |
| **Tool Call Accuracy** | >95% | Agent picks right tools |
| **Iteration Count** | <3 per slide | Minimize back-and-forth |
| **Subagent Parallelization** | 3x speedup | Measure parallel efficiency |

---

## 🎯 CONCLUSION

### Why This Matters for Medellin Spark

**Current state**: Simple AI that generates text slides
**Agent SDK state**: Intelligent assistant that:
- Researches your market
- Validates all facts
- Designs professionally
- Remembers your context
- Improves with each deck

**Competitive advantage**:
- **vs. PowerPoint**: 20x faster, no design skills needed
- **vs. Gamma.app**: More intelligent (uses real data)
- **vs. ALLWEONE**: Enterprise-grade (secure, multi-tenant)

**Business impact**:
- **Higher conversion**: Quality drives free → paid
- **Lower churn**: Users love intelligent assistants
- **Enterprise ready**: Security + quality = B2B sales
- **Network effects**: Each user's feedback improves all decks

---

### Next Steps

**Week 1**: Read full Claude Agent SDK documentation
**Week 2**: Build proof-of-concept with 3 tools
**Week 3**: Test with 10 beta users
**Week 4**: Iterate based on feedback
**Month 2**: Roll out to all users
**Month 3**: Add subagents for parallelization
**Month 6**: Full tool suite (15+ tools)

---

## 📚 ADDITIONAL RESOURCES

**Official Documentation**:
- Claude Agent SDK TypeScript: https://docs.claude.com/en/api/agent-sdk/typescript
- Writing Tools for Agents: https://www.anthropic.com/engineering/writing-tools-for-agents
- Building Agents with Claude SDK: https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk

**Key Concepts**:
- Custom Tools: https://docs.claude.com/en/api/agent-sdk/custom-tools
- Subagents: https://docs.claude.com/en/api/agent-sdk/subagents
- Sessions: https://docs.claude.com/en/api/agent-sdk/sessions
- Streaming: https://docs.claude.com/en/api/agent-sdk/streaming-vs-single-mode

**Community Resources**:
- GitHub (Python): https://github.com/anthropics/claude-agent-sdk-python
- Promptfoo Integration: https://www.promptfoo.dev/docs/providers/claude-agent-sdk/

---

**🚀 Transform your pitch deck generator from tool to intelligent co-founder.**

*Built with Claude Agent SDK. Powered by intelligence, not just automation.*
