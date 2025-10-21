# User Journeys - AI Pitch Deck Generation

**Date**: October 17, 2025
**Project**: Medellin Spark Enhancement Strategy
**Focus**: 4 detailed user personas and their end-to-end workflows

---

## Table of Contents

- [Journey 1: First-Time Founder (Sarah)](#journey-1-first-time-founder-sarah)
- [Journey 2: Accelerator Program Manager (Marcus)](#journey-2-accelerator-program-manager-marcus)
- [Journey 3: Product Designer (Elena)](#journey-3-product-designer-elena)
- [Journey 4: Venture Capital Analyst (David)](#journey-4-venture-capital-analyst-david)
- [Emotional Journey Maps](#emotional-journey-maps)
- [Agent Invocation Points](#agent-invocation-points)
- [Cross-Journey Insights](#cross-journey-insights)

---

## Journey 1: First-Time Founder (Sarah)

### Persona Profile

**Name**: Sarah Chen
**Age**: 29
**Role**: Solo Founder, EduTech Startup
**Background**: Former teacher, non-technical, first-time entrepreneur
**Technical Skill**: Beginner (knows Google Slides, no design experience)
**Goal**: Create professional seed pitch deck to raise $500K from angel investors
**Timeline**: Pitching in 10 days
**Pain Points**: No design skills, unclear how to structure a deck, overwhelmed by advice

---

### The Journey

#### **Stage 1: Discovery (Day 1 - Morning)**

**Trigger**: Sarah Googles "how to create a pitch deck for investors"

**Steps**:
1. Finds Medellin Spark via search result
2. Reads homepage: "AI that talks you through creating your deck"
3. Clicks "Try Free" (no credit card required)
4. Creates account with Google sign-in
5. Lands on dashboard with 3 options:
   - "Start Conversational Deck" ⭐ (recommended for beginners)
   - "Upload PDF Brief"
   - "Choose Template"

**Agent/Tool Invocation**: None yet (browsing UI)

**Emotional State**: 😰 Anxious → 😊 Hopeful (sees "conversational" option)

**Outcome**: Clicks "Start Conversational Deck"

---

#### **Stage 2: Conversational Data Collection (Day 1 - 10:30 AM)**

**Trigger**: Chat interface opens with AI greeting

**Steps**:
1. **AI**: "Hi Sarah! I'm here to help you create your pitch deck. Let's start with the basics. What's your company name?"
2. **Sarah**: "EduTech AI"
3. **AI**: "Great! EduTech AI. Now, in one sentence, what problem are you solving?" [Progress: 17%]
4. **Sarah**: "Students in K-12 schools don't get personalized learning"
5. **AI** (Function Calling): *Extracts "problem" → Saves to database*
6. **AI**: "I understand. How does EduTech AI solve this problem?" [Progress: 33%]
7. **Sarah**: "We built AI tutors that adapt to each student's learning style"
8. Conversation continues for 6 more exchanges
9. **AI**: "Perfect! I've collected everything. Here's what I have... [Shows summary]" [Progress: 100%]
10. **Generate Deck** button appears (glowing, animated)

**Agent/Tool Invocation**:
- **pitch-deck-assistant Edge Function** (GPT-5 mini)
  - Conversational agent with function calling
  - `save_startup_data` tool invoked 6 times
  - Real-time progress tracking (0% → 100%)
- **Supabase** (pitch_conversations table)
  - Stores each message and extracted data
  - RLS ensures Sarah only sees her own data

**Emotional State**: 😊 Engaged → 😃 Excited (sees progress bar filling)

**Outcome**: Clicks "Generate Deck" button

---

#### **Stage 3: Deck Generation (Day 1 - 10:45 AM)**

**Trigger**: "Generate Deck" button clicked

**Steps**:
1. Loading screen: "Creating your 10-slide deck..."
2. AI generates deck in background (15 seconds)
3. Redirect to Outline Editor with 10 generated slides
4. Sarah sees preview:
   - Slide 1: Cover - "EduTech AI: Personalized Learning at Scale"
   - Slide 2: Problem - "One-size-fits-all education fails 60% of students"
   - Slide 3: Solution - "AI tutors that adapt to each learner"
   - ... (all 10 slides)
5. Sarah clicks "Looks great!" → Proceeds to Slide Editor

**Agent/Tool Invocation**:
- **generate-pitch-deck Edge Function** (GPT-5 mini)
  - Deck structure generation with JSON mode
  - 10 slides with headlines, bullets, speaker notes
  - Auto-save to presentations table
- **Supabase** (presentations, presentation_slides tables)
  - Stores generated deck
  - Links slides to presentation

**Emotional State**: 😃 Excited → 🤩 Amazed ("This actually worked!")

**Outcome**: Opens Slide Editor to review each slide

---

#### **Stage 4: Slide Editing & Refinement (Day 1 - 11:00 AM - 12:00 PM)**

**Trigger**: Slide Editor opens with first slide

**Steps**:
1. Sarah reviews Slide 2 (Problem)
2. Notices: "One-size-fits-all education" - wants to add a stat
3. Clicks "AI Suggestions" panel
4. **Sarah**: "Add a statistic about education outcomes"
5. **AI** (Web Search): Searches for recent education data
6. **AI**: "Suggestion: '40% of students are chronically disengaged (Gallup, 2024)'"
7. Sarah accepts → Slide updated
8. Moves to Slide 5 (Market Size)
9. Current text: "The education market is large"
10. **AI** proactively suggests: "Make this more specific with data"
11. Sarah clicks "Research market size"
12. **AI**: "$7.3 trillion global education market by 2025 (HolonIQ)"
13. Sarah accepts → Slide updated
14. Continues editing all 10 slides with AI assistance
15. Downloads as PPTX after 1 hour of editing

**Agent/Tool Invocation**:
- **GPT-5 mini** (inline editing suggestions)
  - Content rewriting
  - Data recommendations
- **Firecrawl/Web Search API** (when "Research" clicked)
  - Real-time market data
  - Source citations
- **Supabase Real-time** (auto-save)
  - Every edit saves immediately
  - No fear of losing work

**Emotional State**: 🤩 Confident → 😌 Relieved (deck is actually professional)

**Outcome**: Exports "EduTech_Pitch_Deck_v1.pptx" to desktop

---

#### **Stage 5: Customization & Polish (Day 2-3)**

**Trigger**: Sarah opens PPTX in PowerPoint

**Steps**:
1. Adds team photos to Slide 9 (Team)
2. Replaces stock image on Slide 1 with company logo
3. Adjusts colors to match brand (keeps AI-generated content)
4. Shows deck to co-founder → Gets feedback: "Slide 7 needs stronger traction"
5. Returns to Medellin Spark Slide Editor
6. Edits Slide 7 with updated metrics
7. Re-exports PPTX
8. Final deck ready!

**Agent/Tool Invocation**: None (manual PowerPoint editing)

**Emotional State**: 😌 Satisfied → 😎 Ready to pitch

**Outcome**: Deck finalized and ready for investor meetings

---

#### **Stage 6: Pitching & Iteration (Day 4-10)**

**Trigger**: Sarah pitches 5 angel investors

**Steps**:
1. Day 4: Pitches first angel → Feedback: "Market size needs more detail"
2. Day 5: Updates Slide 5 using AI suggestions (adds 3 data points)
3. Day 6: Pitches second angel → Positive feedback: "Clear and professional"
4. Day 8: Creates personalized version for investor focused on B2B SaaS
   - Uses "Personalize for Investor" feature
   - AI adjusts messaging to emphasize school subscriptions
5. Day 10: Final pitch → Gets $500K commitment!

**Agent/Tool Invocation**:
- **Deck Analysis Tool** (UC-8)
  - Scores deck: 82/100
  - Suggests improvements
- **Multi-Deck Personalization** (UC-5)
  - Creates investor-specific version
  - Tailors content to investor thesis

**Emotional State**: 😎 Confident → 🎉 Ecstatic (funding secured!)

**Outcome**: $500K seed round closed, 5% equity

---

### Journey Summary

| Stage | Duration | Primary Tool | AI Invocation | Satisfaction |
|-------|----------|--------------|---------------|--------------|
| Discovery | 10 min | Website | None | 😊 Hopeful |
| Data Collection | 15 min | Conversational AI | pitch-deck-assistant | 😃 Engaged |
| Generation | 15 sec | Deck Generator | generate-pitch-deck | 🤩 Amazed |
| Editing | 60 min | Slide Editor + AI Suggestions | GPT-5 mini + Web Search | 😌 Confident |
| Customization | 2 hours | PowerPoint (external) | None | 😎 Ready |
| Iteration | 6 days | Personalization + Analysis | Multi-agent tools | 🎉 Success |

**Total Time Investment**: 4.5 hours (vs 20-40 hours manual creation)
**Success Rate**: 100% (deck led to funding)
**User Quote**: *"I never thought I could make something this professional. The AI understood exactly what I needed."*

---

## Journey 2: Accelerator Program Manager (Marcus)

### Persona Profile

**Name**: Marcus Johnson
**Age**: 42
**Role**: Program Manager at TechAccelerator
**Background**: Former startup founder, now mentors 20 companies per cohort
**Technical Skill**: Advanced (knows design, PM tools, investor expectations)
**Goal**: Help 20 startups create investor-ready decks for Demo Day
**Timeline**: 3 months (cohort duration)
**Pain Points**: Time-constrained, repetitive feedback, quality variance across startups

---

### The Journey

#### **Stage 1: Cohort Onboarding (Week 1)**

**Trigger**: 20 new startups join accelerator

**Steps**:
1. Marcus holds "Pitch Deck Workshop" for all startups
2. Shares Medellin Spark as recommended tool
3. Creates "TechAccelerator Cohort 2025" team workspace
4. Invites all 20 startups with "Starter" template pre-loaded
5. Sets up "Accelerator Template" with:
   - Standard 10-slide structure
   - Placeholder guidance for each slide
   - TechAccelerator branding

**Agent/Tool Invocation**:
- **Team Workspace** (Supabase multi-tenancy)
  - 20 separate company workspaces
  - Marcus has "Admin" view across all
- **Custom Template Builder**
  - Creates "TechAccelerator Template"
  - Sets default for all cohort members

**Emotional State**: 😐 Neutral (routine onboarding)

**Outcome**: 20 startups have access, 18 start creating decks

---

#### **Stage 2: Batch Monitoring & Feedback (Week 2-8)**

**Trigger**: Startups create first drafts

**Steps**:
1. Marcus opens "Cohort Dashboard" → Sees 18 decks in progress
2. Filters by status: 5 completed, 10 in progress, 3 not started
3. Opens "HealthTech Startup" deck
4. AI summarizes: "Deck quality: 68/100. Issue: Weak market analysis"
5. Marcus leaves comment on Slide 5: "Need Gartner/IDC data for healthcare market"
6. **AI** sees comment → Suggests data sources to founder
7. Repeats for all 18 startups (2 hours of feedback vs 8 hours manually)
8. Week 4: Reviews all decks again → Average quality: 68 → 79
9. Week 8: Final review → Average quality: 85

**Agent/Tool Invocation**:
- **Deck Analysis Agent** (PPTEval framework)
  - Scores all 18 decks automatically
  - Flags issues: market analysis, traction, team
- **Collaborative Commenting** (Supabase real-time)
  - Marcus leaves feedback
  - AI interprets comments and assists founders
- **Batch Dashboard**
  - Shows quality scores across cohort
  - Identifies outliers (top/bottom performers)

**Emotional State**: 😌 Efficient → 😊 Pleased (seeing progress)

**Outcome**: 18/20 startups have 80+ quality decks

---

#### **Stage 3: Demo Day Prep (Week 10-12)**

**Trigger**: Demo Day in 2 weeks

**Steps**:
1. Marcus runs "Final Polish" workshop
2. Identifies 3 startups with weak decks (quality <75)
3. Schedules 1-on-1 sessions with each
4. Uses **Deep Research Mode** (Multi-Agent) for one struggling startup:
   - Research Agent finds competitor landscape
   - Analysis Agent identifies differentiation
   - Writer Agent rewrites deck
   - Quality: 68 → 88 in 30 minutes
5. All 18 startups finalize decks
6. Marcus exports all decks as standardized PDFs for investor distribution

**Agent/Tool Invocation**:
- **Multi-Agent Research** (UC-7)
  - Deployed for 3 struggling startups
  - Institutional-quality output in <30 min each
- **Batch Export**
  - All 18 decks exported as PDFs
  - Watermarked with "TechAccelerator Demo Day 2025"

**Emotional State**: 😊 Satisfied → 😎 Proud (cohort ready)

**Outcome**: Demo Day success - 18/18 startups pitch, 12 receive follow-up meetings

---

### Journey Summary

**Total Time Saved**: 40 hours (feedback) + 15 hours (deck creation assistance) = **55 hours**
**Cohort Success**: 18/20 startups created 80+ quality decks (vs historical 12/20)
**Demo Day Outcome**: 67% meeting rate (vs historical 45%)
**User Quote**: *"This tool scaled me. I mentored 20 companies in the time it used to take me to help 8."*

---

## Journey 3: Product Designer (Elena)

### Persona Profile

**Name**: Elena Rodriguez
**Age**: 34
**Role**: Product Designer at Agency
**Background**: 10 years design experience, creates decks for clients
**Technical Skill**: Expert (Figma, Illustrator, After Effects)
**Goal**: Create visually stunning pitch decks for 5 startup clients/month
**Timeline**: 1 week per client
**Pain Points**: Repetitive slide design, content creation bottleneck, tight deadlines

---

### The Journey

#### **Stage 1: Client Kickoff (Day 1)**

**Trigger**: New client (FinTech startup) needs Series A deck

**Steps**:
1. Client sends 30-page business plan PDF
2. Elena uploads PDF to Medellin Spark: "Extract key content"
3. **PDF Upload Agent** analyzes document
4. AI generates 15-slide outline with extracted content
5. Elena reviews: "Good structure, but needs design overhaul"
6. Selects "Bold Modern" template (dark backgrounds, large headlines)
7. AI applies template → Content reformatted to match design style
8. Elena exports outline as JSON for custom design in Figma

**Agent/Tool Invocation**:
- **PDF Upload & Extraction** (UC-2)
  - pdfjs-dist extracts text
  - GPT-5 mini maps content to slides
- **Template System**
  - "Bold Modern" template applied
  - Content adapted to template structure

**Emotional State**: 😐 Focused → 😊 Efficient (content done in 10 min)

**Outcome**: Outline ready, Elena can focus on design (not copywriting)

---

#### **Stage 2: Visual Design (Day 2-3)**

**Trigger**: Elena opens Figma with exported outline

**Steps**:
1. Designs custom slides in Figma (high-fidelity)
2. Adds client branding, custom illustrations
3. Creates animations for key slides
4. Returns to Medellin Spark to update slide content with final copy
5. Uses AI to refine headlines: "Make this more impactful"
6. AI suggests: "From 'Our Platform' to 'The Future of Payments'"
7. Elena accepts AI suggestion, continues polishing
8. Finalizes 15 slides with perfect design + AI-assisted copy

**Agent/Tool Invocation**:
- **AI Copywriting Assistant** (GPT-5 mini)
  - Headline optimization
  - Bullet point refinement
  - Tone adjustments (formal, casual, bold)

**Emotional State**: 😊 Creative flow → 🎨 Designer satisfied

**Outcome**: Visually stunning deck with AI-optimized copy

---

#### **Stage 3: Client Review & Iteration (Day 4-5)**

**Trigger**: Client reviews deck and requests changes

**Steps**:
1. Client: "Slide 7 (Market Size) needs more data"
2. Elena: "AI, research fintech market size 2025"
3. **AI** (Web Search): Finds McKinsey report on payments market
4. AI suggests: "$10T digital payments market by 2027 (McKinsey)"
5. Elena adds data to slide, re-exports
6. Client approves all slides
7. Elena delivers final PPTX + PDF

**Agent/Tool Invocation**:
- **Web Search Agent** (Firecrawl)
  - Real-time market research
  - Source citations
- **Multi-Format Export**
  - PPTX (editable)
  - PDF (presentation)

**Emotional State**: 😎 Confident → 🎉 Delivered on time

**Outcome**: Client thrilled, refers 2 more startups to Elena's agency

---

### Journey Summary

**Time Saved**: 12 hours (content creation) + 6 hours (copywriting) = **18 hours per deck**
**Quality**: Design 10/10 (custom), Content 9/10 (AI-assisted)
**Client Satisfaction**: 100% approval rate
**User Quote**: *"The AI handles the boring parts—content extraction, copy refinement. I focus on what I do best: design."*

---

## Journey 4: Venture Capital Analyst (David)

### Persona Profile

**Name**: David Park
**Age**: 28
**Role**: Analyst at Tier-1 VC Fund
**Background**: MBA, evaluates 500+ decks/year, recommends 10 for partner meetings
**Technical Skill**: Intermediate (good with Excel, data analysis)
**Goal**: Quickly assess deck quality, identify red flags, surface promising startups
**Timeline**: 15 minutes per deck (max)
**Pain Points**: Deck quality varies wildly, missing key info, time-constrained

---

### The Journey

#### **Stage 1: Deck Triage (Monday Morning)**

**Trigger**: 25 new inbound pitch decks in inbox

**Steps**:
1. David opens Medellin Spark "Deck Analysis Tool"
2. Batch uploads 25 decks (drag-and-drop)
3. **AI** analyzes all 25 decks in parallel (3 minutes)
4. Dashboard shows:
   - 5 decks: 85+ quality (⭐ Priority)
   - 12 decks: 70-84 quality (🟡 Review)
   - 8 decks: <70 quality (❌ Pass)
5. David sorts by quality score, opens top deck: "AI HealthCare - Score: 92"
6. Sees AI summary:
   - **Strengths**: Clear problem, validated market, strong team
   - **Weaknesses**: Traction weak (only 100 users)
   - **Red Flags**: None
   - **Investor Fit**: 88% match to fund thesis (healthcare IT)
7. David reads deck + AI insights (10 minutes)
8. Recommends to partner: "High potential, worth a meeting"

**Agent/Tool Invocation**:
- **Batch Deck Analysis** (UC-8)
  - PPTEval framework scores all 25 decks
  - Multi-dimensional analysis (problem, solution, market, team, etc.)
  - Investor thesis matching
- **AI Summarization** (GPT-5 mini)
  - Executive summary per deck
  - Red flag detection
  - Competitive positioning

**Emotional State**: 😐 Overwhelmed → 😊 Efficient (triaged 25 decks in 30 min)

**Outcome**: 5 high-quality decks identified, 3 meetings scheduled

---

#### **Stage 2: Deep Due Diligence (Tuesday)**

**Trigger**: David investigates top 3 decks further

**Steps**:
1. Opens "AI HealthCare" deck in detail view
2. **AI** provides:
   - Competitive analysis: "3 direct competitors, 2 funded by Sequoia"
   - Market validation: "3 recent reports confirm $50B TAM"
   - Team assessment: "Founder: 2x exits, CTO: Google AI alum"
   - Traction trajectory: "10% MoM growth (low but early)"
3. David clicks "Research Founder" → AI searches LinkedIn, Crunchbase
4. AI finds: "Founder sold prev company to Salesforce for $120M (2022)"
5. David adds note: "Strong founder, worth betting on"
6. Sends deck to partner with AI insights attached

**Agent/Tool Invocation**:
- **Deep Research Agent** (UC-7)
  - Founder background check
  - Competitive landscape mapping
  - Market validation research
- **CRM Integration** (future)
  - Logs deck review in deal flow system
  - Tracks communication with founder

**Emotional State**: 😊 Confident → 😎 Data-backed decision

**Outcome**: Partner approves meeting, David schedules call with founder

---

#### **Stage 3: Partner Presentation (Thursday)**

**Trigger**: David presents top 2 startups to partners

**Steps**:
1. David opens "AI HealthCare" deck in presentation mode
2. Partners ask: "What's the competitive moat?"
3. David shows AI-generated competitive matrix (built during analysis)
4. Partners ask: "Is the market growing?"
5. David shows AI-researched market growth chart (3 data sources)
6. Partners approve: "Let's do a term sheet"
7. David uses Medellin Spark to generate "Investment Memo" from deck
8. **AI** converts deck → 5-page investment memo with:
   - Executive summary
   - Market analysis
   - Competitive positioning
   - Investment thesis
   - Risks & mitigations

**Agent/Tool Invocation**:
- **Deck → Memo Converter** (new feature idea)
  - GPT-5 mini transforms deck into investment memo format
  - Adds VC-specific analysis (valuation, terms, dilution)
- **Presentation Mode** (reveal.js)
  - Interactive slides during partner meeting
  - AI-generated charts embedded

**Emotional State**: 😎 Prepared → 🎉 Deal approved

**Outcome**: Term sheet issued, startup enters portfolio

---

### Journey Summary

**Time Saved**: 20 hours/week (deck triage) + 8 hours (research) = **28 hours/week**
**Decision Quality**: 90% of AI-recommended decks pass partner review (vs 60% historically)
**Deal Flow**: 2x increase in high-quality startups identified
**User Quote**: *"The AI is like having a junior analyst who never sleeps. It surfaces the gems I would have missed."*

---

## Emotional Journey Maps

### Founder Journey (Sarah)
```
Emotion Level (1-10)
10 |                                              🎉
 9 |                                    🤩     /
 8 |                                 /      /
 7 |                         😃  /
 6 |                      /
 5 |              😊  /
 4 |           /
 3 |       😰
 2 |    /
 1 |_______________________________________________
    Discovery  Chat  Generate  Edit  Pitch  Funded
```

### VC Analyst Journey (David)
```
Emotion Level (1-10)
10 |                                      🎉
 9 |                              😎  /
 8 |                           /
 7 |                  😊   /
 6 |               /
 5 |            /
 4 |        /
 3 |  😐 (overwhelmed with decks)
 2 |
 1 |________________________________________
    Inbox   Triage  Research  Present  Deal
```

---

## Agent Invocation Points

### Summary Across All Journeys

| Journey Stage | Agent/Tool Used | Frequency | Impact |
|---------------|-----------------|-----------|--------|
| **Data Collection** | pitch-deck-assistant (GPT-5 mini) | Every new deck | 🟢 High (UX differentiator) |
| **Deck Generation** | generate-pitch-deck (GPT-5 mini) | Every deck | 🟢 High (core feature) |
| **Content Refinement** | GPT-5 mini (inline editing) | 60% of edits | 🟡 Medium (quality boost) |
| **Research** | Web Search + Firecrawl | 40% of decks | 🟡 Medium (data credibility) |
| **Analysis** | PPTEval framework | VC/Accelerator users | 🟢 High (decision support) |
| **Multi-Agent** | Research + Analysis + Writer + Reviewer | 5% premium users | 🔴 Low (niche, future) |
| **Collaboration** | Supabase Real-time | Team decks (30%) | 🟡 Medium (team efficiency) |

---

## Cross-Journey Insights

### Common Pain Points (Solved by AI)
1. **Time Constraints** - All personas save 60-85% time
2. **Content Quality** - AI elevates writing (founders) and data (VCs)
3. **Decision Fatigue** - Marcus and David use AI scoring to prioritize
4. **Design Bottleneck** - Elena uses AI for copywriting, focuses on design

### Unique Needs by Persona
- **Founders**: Hand-holding, encouragement, guidance
- **Accelerators**: Batch operations, cohort-wide quality monitoring
- **Designers**: Content extraction, copy refinement, export flexibility
- **VCs**: Rapid triage, competitive analysis, investor thesis matching

### Future Enhancement Opportunities
1. **Voice-to-Deck** (Sarah would love this - speaks better than writes)
2. **Batch Personalization** (Marcus needs 20 customized templates at once)
3. **Design API** (Elena wants to export AI content to Figma programmatically)
4. **Deal Flow Integration** (David needs CRM sync with Affinity/Salesforce)

---

**Next Steps**: See companion documents:
- **DIAGRAMS.md** - Mermaid visualizations of these journeys
- **PLAYBOOK.md** - Technical implementation for each journey stage

---

**Prepared by**: Claude AI (Sonnet 4.5)
**Last Updated**: October 17, 2025
