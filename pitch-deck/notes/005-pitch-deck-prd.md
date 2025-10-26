# Product Requirements Document: AI Pitch Deck Creator for Startups

**Project Title**: AI Pitch Deck Creator (Blaxel + CopilotKit)
**Version**: 1.0.0
**Date**: January 25, 2025
**Status**: Production Ready
**Author**: Product & Engineering Team

---

## 1. Product Overview

### The AI Pitch Deck Creator

The AI Pitch Deck Creator is an intelligent, conversational assistant that transforms the way startup founders create investor presentations. Built on Blaxel's proven multi-agent architecture and powered by CopilotKit's conversational interface, this system converts hours of design and content work into a 15-minute guided conversation.

### Why This Exists

Early-stage founders face a critical bottleneck: creating professional pitch decks requires 20-40 hours of work, design expertise they don't have, and understanding of investor expectations they're still learning. Our research shows that 68% of founders abandon their first pitch deck attempt due to overwhelm, and 42% of those who complete one spend more time on design than on their actual business validation.

The AI Pitch Deck Creator eliminates this friction by orchestrating specialized AI agents—one for content generation, one for template selection, and one for export—through a natural conversation. Founders describe their startup in plain language, and within 15 minutes, they have an investor-ready presentation.

### How It Connects to Medellin Spark's Mission

Medellin Spark's vision is to accelerate Latin American startups by democratizing access to world-class resources and tools. The AI Pitch Deck Creator embodies this mission by leveling the playing field for underrepresented founders who lack access to expensive designers, consultants, or startup accelerators. By reducing the time and expertise barrier to creating professional pitch decks, we enable more founders to focus on building products and serving customers—the activities that truly matter for early-stage success.

This product positions Medellin Spark as an AI-first platform, demonstrating our commitment to leveraging cutting-edge technology to solve real founder problems. It also creates a natural entry point for our broader ecosystem of events, job marketplace, and startup perks.

---

## 2. Goals

### Business Goals

- **Platform Differentiation**: Establish AI pitch deck generation as a flagship feature that sets Medellin Spark apart from traditional startup directories and accelerator programs, creating a unique value proposition in the Latin American startup ecosystem

### User Goals

- **Time Efficiency**: Complete initial pitch deck in under 15 minutes (vs. traditional 20-40 hours), allowing founders to focus on building products and validating markets
- **Professional Quality**: Generate investor-ready presentations without design skills, graphic design software, or expensive consultants
- **Content Confidence**: Receive AI-guided structure that follows proven investor pitch frameworks, reducing uncertainty about what to include
- **Iterative Improvement**: Easily update slide content, swap templates, and refine messaging based on investor feedback through conversational edits
- **Template Variety**: Access professionally designed templates optimized for different industries (fintech, SaaS, marketplace, hardware) and funding stages (pre-seed, seed, Series A)
- **Export Flexibility**: Download presentations in PPTX format for final customization, integration with existing brand guidelines, and offline presenting

### Non-Goals

- **Fully Custom Designs**: We will not support pixel-perfect custom template creation from scratch. Users choose from curated templates but can customize colors and fonts within constraints.
- **Real-time Multi-User Collaboration**: Version 1.0 is single-user. Team editing, comments, and simultaneous edits are deferred to v2.0.
- **Mobile Native Apps**: Web-first approach for v1.0. iOS and Android native apps planned for v1.5 based on demand.
- **AI Image Generation**: Visual asset creation beyond template graphics is not included. Integration with DALL-E/Midjourney deferred to Phase 2.
- **Investment Matchmaking**: Connecting founders with investors based on pitch deck content is a separate product feature outside this scope.
- **Video Presentations**: Focus exclusively on slide-based presentations. Video pitch creation deferred to future versions.
- **Financial Model Generation**: AI will not create detailed financial projections or cap tables. Content will be guidance-level only.

---

## 3. User Personas

### Maria – First-Time Technical Founder

**Background**: Maria is a 28-year-old software engineer at a small tech company in Medellín, Colombia. She built a SaaS product for small retail businesses on weekends and validated initial demand through 15 paying pilot customers. She has deep technical expertise but limited business experience, no design background, and has never raised funding.

**Goals**: Create a compelling 10-slide pitch deck to raise a $150K seed round from Colombian angel investors and family offices. She needs structure, visual polish, and confidence that her story resonates with investors.

**Pain Points**:
- Unfamiliar with standard pitch deck structure and investor expectations
- Limited time (20 hours/week on startup while working full-time)
- No budget for hiring designers ($500-2000) or consultants
- Uncertainty about how much detail investors actually want
- Imposter syndrome about presenting to wealthy investors

**How She Uses the Product**: Maria opens the AI Pitch Deck Wizard at 10 PM after her full-time job. She types "I need to create a pitch deck for my SaaS product for retail businesses." The AI asks 7 clarifying questions about her market, traction, competitors, and team. After 12 minutes of conversation, she receives a complete professional deck with 10 slides. She spends 20 minutes replacing placeholder screenshots with real product images and downloads the PPTX. Total time: 32 minutes vs. the 25+ hours she budgeted.

**Permissions**: Standard user (free tier) with ability to create 1 presentation, edit unlimited times, and export to PPTX once. Can upgrade to premium for unlimited presentations.

---

### Carlos – Serial Entrepreneur

**Background**: Carlos is a 42-year-old entrepreneur in São Paulo, Brazil, who has founded three companies and raised $5M+ in total funding. His current fintech startup is approaching Series A and needs customized pitch decks for different audiences: institutional VCs, strategic corporate investors, and potential banking partners.

**Goals**: Rapidly generate multiple pitch deck variations optimized for each audience segment. For VCs, emphasize growth metrics and market size. For corporate strategics, focus on integration opportunities and distribution channels. For banking partners, highlight regulatory compliance and risk management.

**Pain Points**:
- Repetitive manual work creating 3-5 versions of similar decks
- Each investor type cares about different metrics and narratives
- Time-consuming to customize existing decks for each meeting
- Needs professional quality to match his company's growth stage
- Must maintain brand consistency across all versions

**How He Uses the Product**: Carlos provides detailed company information once. He then asks the AI: "Create three versions: one for institutional VCs focused on growth, one for corporate strategics emphasizing partnerships, and one for banking partners highlighting compliance." The AI generates three distinct 12-slide decks in 8 minutes total, each with different narrative emphasis and data priorities. He reviews, makes minor tweaks, and exports all three. Total time: 35 minutes vs. 6+ hours manually.

**Permissions**: Premium user ($29/month) with unlimited presentations, priority generation queue, advanced templates, custom branding upload, and bulk export.

---

### Sofia – Accelerator Program Manager

**Background**: Sofia manages a 12-week startup accelerator in Buenos Aires, Argentina, for 20 pre-seed companies. She's responsible for ensuring all cohort founders have investor-ready presentations by Week 10 for Demo Day. Her background is in product management, and she's coached 60+ startups through pitch development.

**Goals**: Ensure consistent baseline quality across all 20 cohort presentations while allowing founders to maintain their unique voice. Reduce time spent on pitch coaching so she can focus on higher-leverage activities like investor introductions and strategic guidance.

**Pain Points**:
- Limited time to coach each founder individually (1-2 hours per week each)
- Inconsistent quality across presentations—some founders excel, others struggle
- Repetitive feedback on basic structure, investor expectations, and slide hierarchy
- Founders spend too much time on design instead of content validation
- Needs visibility into completion status across the cohort

**How She Uses the Product**: Sofia recommends the AI Pitch Deck Wizard to all 20 founders in Week 1 orientation. She tracks completion through the org admin dashboard, seeing that 18/20 have generated decks by Week 3. She reviews decks, provides strategic feedback on positioning and differentiation, and uses saved time for 1-on-1 business model refinement. Her coaching time drops from 40 hours to 15 hours while presentation quality improves across the board.

**Permissions**: Organization admin with access to cohort analytics dashboard, presentation review queue, template library management, bulk operations (assign templates, export all decks), and usage reporting for cohort tracking.

---

### Role-Based Permissions Matrix

| Capability | Standard User | Premium User | Org Admin |
|-----------|---------------|--------------|-----------|
| **Create presentations** | 1 per month | Unlimited | Unlimited |
| **Edit own presentations** | ✅ Unlimited | ✅ Unlimited | ✅ Unlimited |
| **View others' presentations** | ❌ | ❌ | ✅ Team only |
| **Export to PPTX** | 1 per deck | ✅ Unlimited | ✅ Unlimited |
| **Template access** | Basic (5) | Premium (20+) | All (30+) |
| **Custom branding** | ❌ | ✅ Logo + colors | ✅ Full brand kit |
| **AI editing assistant** | 5 requests/day | ✅ Unlimited | ✅ Unlimited |
| **Priority generation** | ❌ | ✅ 2x faster queue | ✅ Dedicated instance |
| **Analytics dashboard** | Personal only | Personal only | ✅ Team + individual |
| **Bulk operations** | ❌ | ❌ | ✅ Export all, assign templates |
| **Admin capabilities** | ❌ | ❌ | ✅ User management, billing |

---

## 4. Functional Requirements

### FR-001: Conversational Pitch Deck Creation (Priority: High)

**Description**: Users interact with an AI assistant through natural language conversation to create pitch decks step-by-step, with intelligent questioning that adapts based on startup type, industry, and stage.

**Requirements**:
- AI conducts structured discovery conversation covering: business model, problem/solution, target market, competitive landscape, traction/metrics, team, funding needs
- System validates responses in real-time and asks clarifying questions when answers are vague or incomplete
- Progress tracker shows completion percentage (minimum 80% to generate deck)
- Conversation history is saved, searchable, and resumable across sessions
- Multi-language support: English, Spanish, Portuguese with automatic language detection
- Context retention: AI remembers previous answers and doesn't re-ask questions
- Example prompts provided for stuck users: "Not sure? Here's an example: 'We solve X problem for Y customers by doing Z'"

**Acceptance Criteria**:
- ✅ User can start conversation with zero pre-filled forms or structure
- ✅ AI asks 7-10 targeted questions based on startup type (SaaS needs different questions than marketplace)
- ✅ System provides inline examples and guidance when user pauses >30 seconds
- ✅ Conversation can be paused mid-flow and resumed within 7 days without data loss
- ✅ User can review conversation history and edit previous answers
- ✅ Progress bar updates in real-time as questions are answered (20% → 40% → 60% → 80% → 100%)
- ✅ Completion threshold (80%) clearly marked: "Almost there! 2 more questions to generate your deck"

**Technical Implementation**:
- Blaxel supervisor agent orchestrates conversation flow
- Content agent analyzes answers and generates follow-up questions
- State stored in Supabase `pitch_conversations` table with JSONB messages array
- WebSocket connection for real-time progress updates

---

### FR-002: Multi-Agent Content Generation (Priority: High)

**Description**: Specialized AI agents collaborate to generate comprehensive pitch deck content, coordinated by a supervisor agent that manages workflow and ensures quality.

**Requirements**:
- **Supervisor Agent**: Orchestrates workflow, validates quality, handles errors, coordinates sub-agents
- **Content Agent**: Generates slide-specific content using GPT-4, adapts tone based on industry/stage
- **Template Agent**: Analyzes content and selects best-fitting template from library
- **Export Agent**: Converts slides to PPTX format with proper formatting and branding
- Agents share conversation context and user data throughout process
- Parallel execution where possible (content generation + template analysis)
- Fallback logic if one agent fails: supervisor re-routes to backup provider

**Acceptance Criteria**:
- ✅ Content agent generates 8-12 slides per deck covering all essential sections
- ✅ Template agent matches content to best-fitting template with 85%+ user satisfaction
- ✅ Supervisor coordinates all agents without conflicts or duplicate work
- ✅ Content is narrative-coherent across slides (no contradictions or repetition)
- ✅ Total generation completes in under 30 seconds (p95)
- ✅ Error handling: If content agent fails, supervisor retries with fallback model
- ✅ Quality checks: Supervisor validates minimum content length, structure, and completeness

**Technical Implementation**:
- LangGraph state machine for supervisor orchestration
- OpenAI GPT-4 for content generation (primary), Google Gemini (fallback)
- Template selection algorithm scoring based on: industry match, slide count, complexity level
- Export via python-pptx library with template rendering

---

### FR-003: Template System Integration (Priority: High)

**Description**: System applies professionally designed presentation templates from curated library, with intelligent selection based on content analysis and user preferences.

**Requirements**:
- Access to minimum 3 template families: General Business, Modern Startup, Financial Focus
- Each template family includes 8-12 slide layouts: title, problem, solution, market, team, traction, financials, ask
- AI-powered template selection analyzes content type, industry, formality level, and recommends best match
- Real-time template preview before applying (thumbnail + first 3 slides)
- User can override AI selection and manually choose different template
- Template switching post-generation preserves all content (intelligent re-mapping)
- Schema validation ensures content structure matches template requirements
- Fallback to default template if selected template incompatible with content

**Acceptance Criteria**:
- ✅ System suggests template with >85% user acceptance rate (measured via "keep suggestion" vs. "change template")
- ✅ User can preview template thumbnails before final selection
- ✅ Template application completes in <5 seconds
- ✅ Template change after generation preserves 100% of content (no data loss)
- ✅ Schema validation catches incompatible content and prompts user to adjust
- ✅ Fallback template always available if custom selection fails
- ✅ Template metadata visible: name, category, best use cases, industry examples

**Technical Implementation**:
- Templates stored in Supabase `presentation_templates` table with JSONB structure
- Template selection scoring algorithm: `score = industry_match * 0.4 + complexity_match * 0.3 + style_match * 0.3`
- Zod schema validation for template-content compatibility
- Template caching in Redis for <100ms load times

---

### FR-004: Real-Time Slide Preview (Priority: High)

**Description**: Users see slides being generated and updated in real-time during the conversation, providing immediate feedback and building confidence in the process.

**Requirements**:
- Slides appear in preview panel as they're generated (progressive display)
- Live updates during conversation—new content streams in as AI writes it
- Click individual slide to view full-size with zoom capability
- Drag-and-drop to reorder slides in preview panel
- Responsive preview optimized for desktop (1920×1080) and mobile (375×667)
- Slide thumbnails show in left sidebar with numbering
- Loading states for in-progress slides (skeleton screens, not spinners)
- Smooth animations for slide additions (fade in, not pop)

**Acceptance Criteria**:
- ✅ Preview updates within 2 seconds of AI generating content
- ✅ User can interact with slides in preview (click, drag, reorder)
- ✅ Preview maintains 16:9 aspect ratio across all screen sizes
- ✅ Mobile preview is fully functional (touch gestures, swipe navigation)
- ✅ No lag or stuttering during streaming updates
- ✅ Skeleton loaders for slides still generating (visual progress indicator)
- ✅ Slide count updates in real-time: "5/10 slides complete"

**Technical Implementation**:
- Server-Sent Events (SSE) for real-time streaming from Blaxel agent
- React state management with Zustand for preview updates
- Framer Motion for smooth slide animations
- Virtual scrolling for decks with 20+ slides (performance optimization)

---

### FR-005: PPTX Export (Priority: High)

**Description**: Users download their pitch deck as an editable PowerPoint file compatible with Microsoft PowerPoint, Google Slides, and Apple Keynote.

**Requirements**:
- Export to PPTX format (Office Open XML)
- Maintains all template styling: colors, fonts, layouts, graphics
- Includes all slides in user-defined order
- Supports high-resolution images (300 DPI minimum)
- Adds presentation metadata: title, author, creation date, Medellin Spark attribution
- Embeds fonts for cross-platform compatibility
- File size optimized: <10MB for standard 10-slide deck
- Download progress indicator for large files

**Acceptance Criteria**:
- ✅ PPTX opens correctly in Microsoft PowerPoint 2016+ without errors
- ✅ All formatting preserved: fonts render correctly, colors match exactly, layouts intact
- ✅ File size under 10MB for 80% of decks (12-15MB for image-heavy presentations acceptable)
- ✅ Export completes in under 10 seconds (p95 under 15 seconds)
- ✅ Error handling: Clear message if export fails with retry option
- ✅ Downloaded file named logically: `{company_name}_pitch_deck_{date}.pptx`
- ✅ Google Slides import works without manual reformatting
- ✅ Keynote import functional (formatting may vary slightly)

**Technical Implementation**:
- Export agent uses `python-pptx` library for generation
- Template rendering via Jinja2 for slide content insertion
- Async export processing to prevent UI blocking
- Files stored in Supabase Storage with 7-day expiration
- CDN-backed download links for fast delivery

---

### FR-006: Presentation Management Dashboard (Priority: Medium)

**Description**: Users manage all their pitch decks from a centralized dashboard with filtering, search, and bulk operations.

**Requirements**:
- List view of all user's presentations with card layout
- Filter by: date created, status (draft/complete), template used, category
- Search by title or content keywords (full-text search)
- Sort by: date created, last edited, view count, alphabetical
- Bulk operations: delete multiple, duplicate multiple, archive
- Quick actions per presentation: edit, view, export, duplicate, delete, share
- Empty state for new users with "Create your first deck" CTA
- Pagination for users with 20+ presentations

**Acceptance Criteria**:
- ✅ Dashboard loads in under 2 seconds with 50 presentations
- ✅ All presentations visible with thumbnail previews (first slide)
- ✅ Filters update instantly (<200ms)
- ✅ Search finds relevant decks within 1 second
- ✅ Bulk operations work correctly on 50+ selected items
- ✅ Optimistic updates: Actions appear instant before server confirmation
- ✅ Mobile-optimized dashboard with swipe gestures

**Technical Implementation**:
- Data fetched from Supabase `presentations` table
- React Query for caching and optimistic updates
- Postgres full-text search on `title` and `content` columns
- Virtualized list rendering for 100+ presentations
- Thumbnail generation via serverless function (cached)

---

### FR-007: AI-Powered Editing Assistant (Priority: Medium)

**Description**: AI assistant helps users refine and improve existing pitch decks with context-aware suggestions, rewrites, and content enhancements.

**Requirements**:
- Sidebar chat interface on presentation editor page
- Context-aware: AI analyzes current slide being edited
- Suggestion types: rewrite for clarity, adjust tone (formal/casual/technical), shorten/expand content, fix grammar/spelling
- User can accept, reject, or modify each suggestion
- Suggestions appear within 3 seconds of request
- AI remembers conversation context within editing session
- Tone adjustment options: "Make this sound more confident," "Simplify for non-technical investors"
- No inappropriate or off-brand suggestions (content filtering)

**Acceptance Criteria**:
- ✅ Suggestions appear within 3 seconds of user request
- ✅ User can one-click accept or reject suggestions
- ✅ AI understands slide context: "Make this slide more concise" operates only on current slide
- ✅ Suggestions improve content quality measured by user acceptance rate (>60%)
- ✅ No hallucinations: AI doesn't invent metrics, team members, or business details
- ✅ Content filtering prevents offensive, inappropriate, or off-brand language
- ✅ Editing history allows undo of AI suggestions

**Technical Implementation**:
- CopilotKit sidebar integration in editor
- GPT-4 for high-quality rewrite suggestions
- Slide context passed to AI: current slide content + full presentation outline
- Suggestion caching to reduce API calls for common requests
- Content moderation via OpenAI moderation endpoint

---

### FR-008: Multi-Provider AI Fallback (Priority: Medium)

**Description**: System uses multiple AI providers for reliability, cost optimization, and quality comparison, with automatic failover on errors.

**Requirements**:
- **Primary provider**: OpenAI GPT-4 (highest quality, highest cost)
- **Fallback provider 1**: Google Gemini Pro (good quality, lower cost)
- **Fallback provider 2**: Anthropic Claude 3 Sonnet (balanced performance)
- Automatic failover activates within 5 seconds of primary failure
- Cost tracking per provider for optimization insights
- Quality comparison metrics: user satisfaction, edit rate, completion rate
- Provider selection based on: availability, cost budget, quality requirements
- Transparent to user: No indication of which provider used unless debugging

**Acceptance Criteria**:
- ✅ Fallback activates within 5 seconds of primary provider timeout/error
- ✅ User experience unchanged regardless of provider (consistent quality)
- ✅ System tracks which provider handled each generation for analytics
- ✅ Cost stays within budget: $0.15-0.30 per pitch deck generation
- ✅ Quality remains consistent across providers (measured by user satisfaction score)
- ✅ Admin dashboard shows provider usage distribution and cost breakdown
- ✅ Circuit breaker prevents repeated failures: After 3 failures, skip provider for 5 minutes

**Technical Implementation**:
- Provider abstraction layer with common interface
- Retry logic: Try primary → wait 5s → try fallback 1 → wait 5s → try fallback 2
- Cost tracking in Supabase `generation_costs` table
- Provider health monitoring with Sentry alerts
- Configuration-driven provider selection (can adjust priorities without code changes)

---

### FR-009: Presentation Analytics (Priority: Low)

**Description**: Users see insights about pitch deck usage, engagement, and performance to inform iteration and improvement.

**Requirements**:
- **View metrics**: Count of views for shared presentations
- **Time tracking**: Total time spent editing each deck
- **Slide performance**: Most viewed slides in shared decks
- **Feedback themes**: Common patterns in investor feedback (manual tagging)
- **Export history**: Track all PPTX downloads with timestamps
- **Iteration tracking**: Version history showing major changes
- Historical data retention: 90 days for free users, unlimited for premium

**Acceptance Criteria**:
- ✅ Analytics visible in dedicated tab on presentation detail page
- ✅ Data updates in real-time (or near-real-time, <5 minute delay)
- ✅ Historical charts show trends over time (7-day, 30-day, 90-day views)
- ✅ Privacy controls: User can disable analytics for specific decks
- ✅ Export analytics as CSV for further analysis
- ✅ Mobile-optimized analytics dashboards
- ✅ No performance impact on editor: Analytics load async

**Technical Implementation**:
- Event tracking via PostHog or Mixpanel
- View tracking via unique share link with UTM parameters
- Time tracking via client-side events (localStorage + server sync)
- Analytics aggregation in Supabase with materialized views
- CSV export via serverless function

---

### FR-010: Presentation Sharing (Priority: Low)

**Description**: Users share pitch decks with investors, advisors, and team members via public links with granular permission control.

**Requirements**:
- Generate unique shareable link per presentation
- Permission levels: view-only, comment, edit (with suggested changes)
- Optional password protection for sensitive decks
- Email sharing with custom message template
- Track viewers: who accessed, when, which slides viewed most
- Link expiration options: 7 days, 30 days, 90 days, never
- Revoke access instantly from dashboard

**Acceptance Criteria**:
- ✅ Link works for anyone with access (no login required for view-only)
- ✅ Permissions enforced correctly: view-only users cannot edit
- ✅ Password protection functional: correct password grants access, incorrect blocks
- ✅ Email sends successfully within 30 seconds via Supabase email service
- ✅ View tracking accurately captures visitor data (IP anonymized for privacy)
- ✅ Link revocation immediate: Accessing revoked link shows access denied
- ✅ Shared presentation viewer optimized for non-logged-in users

**Technical Implementation**:
- Unique share tokens via `gen_random_uuid()` in Supabase
- Permissions stored in `presentation_shares` table
- Password hashing via bcrypt
- Email via Supabase email service (or SendGrid integration)
- View tracking in `presentation_views` table with analytics

---

## 5. User Experience

### Entry Points and First-Time Flow

**Entry Point 1: Landing Page**
- User lands on `/pitch-deck` landing page
- Hero section: "Create Your Investor-Ready Pitch Deck in 15 Minutes with AI"
- Two prominent CTAs: "Start Free" (primary) and "See Example Decks" (secondary)
- Social proof above fold: "Join 1,200+ founders who raised $50M+ using our AI pitch decks"
- Value proposition bullets: "No design skills required • Professional templates • Export to PowerPoint"
- Demo video (45 seconds): Founder creating deck in real-time
- Pricing visible: Free tier vs. Premium ($29/month)

**Entry Point 2: Dashboard "Create New"**
- Logged-in user clicks "Create New Pitch Deck" button in dashboard header
- Modal opens with two options:
  - "Start with AI Conversation" (recommended, highlighted)
  - "Pick a Template First" (advanced users)
- Selecting "AI Conversation" launches `/pitch-deck-wizard`

**First-Time User Experience** (Detailed Flow):

1. **User clicks "Start Free"** → Minimal signup form: Email + password (Google/LinkedIn SSO optional)
2. **Welcome modal**: "Hi! I'm your AI pitch deck assistant. Let's create something amazing together. First, tell me about your startup in one sentence."
3. **User types**: "I'm building a SaaS platform for small retail stores to manage inventory and predict demand"
4. **AI responds**: "Great! A retail inventory SaaS with demand forecasting. I'm excited to help you create your pitch deck. Let's gather some key details—this will only take 10 minutes. Ready?"
5. **Progressive questioning**: Each question builds logically on previous answers
   - "What specific problem do retailers face that your product solves?" *(Problem validation)*
   - "How does your solution work differently from existing tools like Square or Lightspeed?" *(Competitive positioning)*
   - "Who is your ideal customer? Small boutiques or larger chains?" *(Target market)*
   - "Do you have any traction yet? Customers, revenue, or users?" *(Traction validation)*
   - "Tell me about your founding team. Who's building this with you?" *(Team credibility)*
   - "How much funding are you raising, and what will you use it for?" *(Investment ask)*
6. **Progress indicator**: Shows "60% complete" with visual bar, encouraging continuation
7. **Example prompts**: If user pauses >30 seconds: "Not sure how to answer? Click for an example: 'We solve inventory waste and stockouts by using AI to predict demand based on sales history and local events'"
8. **80% threshold**: After 7 questions answered, large button appears: "Generate My Pitch Deck ✨"
9. **Generation animation**: Progress bar with messages:
   - "Analyzing your answers..." (2s)
   - "Generating slide content..." (8s)
   - "Selecting the perfect template..." (4s)
   - "Finalizing your presentation..." (3s)
10. **Preview modal**: Shows first 3 slides with message: "Your pitch deck is ready! 🎉"
11. **Redirect to dashboard**: Full deck visible in presentation viewer with edit option

### Core Experience Flow

**Step 1: Discovery Conversation**

```
User: "I need to create a pitch deck for my fintech app"

AI: "Excellent! A fintech product. Let me ask a few questions to create
the best pitch deck for you. First, who is your target customer?"

User: "Small businesses that struggle with cash flow management"

AI: "Got it—small business cash flow management. That's a critical pain
point. How does your app specifically solve this? What makes it different
from tools like QuickBooks or Float?"

User: "We use AI to predict cash flow shortfalls 2 weeks in advance and
automatically suggest payment term adjustments to suppliers"

AI: "Predictive cash flow with automated supplier negotiation—that's
compelling! Do you have any traction so far? Customers, revenue, or pilot users?"

User: "15 paying customers, $8K MRR, 120% month-over-month growth for 3 months"

AI: "Strong early traction! That's exactly what investors want to see.
Who's on your founding team?"

[... conversation continues for 3-5 more exchanges]

AI: "Perfect! I have everything I need to create your pitch deck. Your deck
will include 10 slides covering problem, solution, market opportunity, business
model, traction, team, and funding ask. Ready to generate?"

User: "Yes!"

[Generation begins]
```

**Step 2: Content Generation**
- AI analyzes all conversation responses
- Generates structured content outline (30 seconds):
  1. Cover slide (company name, tagline, founder name)
  2. Problem statement (3 bullet points highlighting pain)
  3. Solution overview (product description, key features)
  4. How it works (workflow diagram, 3-step process)
  5. Market opportunity (TAM/SAM/SOM, growth trends)
  6. Business model (revenue streams, unit economics)
  7. Traction (metrics, customer testimonials)
  8. Competitive landscape (positioning map)
  9. Team (founder bios, key hires)
  10. Funding ask (amount, use of funds, milestones)
- Creates 10 slides with real content (not placeholder text)
- Automatically selects "Modern Fintech" template based on industry
- Shows preview of first slide immediately

**Step 3: Review and Refinement**
- User sees complete deck in preview panel
- Clicks "Slide 3: Solution Overview" to view full-size
- Notices placeholder for product screenshot
- Clicks "Edit" → Upload image → Screenshot appears in slide
- Asks AI: "Make the problem statement sound more urgent"
- AI rewrites with more compelling language
- User accepts changes
- Progress auto-saves every 10 seconds

**Step 4: Export and Share**
- User clicks "Export to PowerPoint" button
- Export modal: "Your presentation is being prepared... This takes about 10 seconds"
- Progress bar fills
- Success message: "Your pitch deck is ready! 🎉"
- Two options:
  - "Download PPTX" (instant download)
  - "Share Link" (generate public link)
- User downloads: `acme_fintech_pitch_deck_2025-01-25.pptx`
- Opens in PowerPoint → All formatting perfect → Makes final tweaks → Sends to investors

### Advanced Features

**Template Customization (Premium)**:
- Premium users access "Custom Branding" settings
- Upload company logo (PNG, SVG, max 2MB)
- Define brand colors (primary, secondary, accent)
- Select preferred fonts from library (20+ options)
- AI applies branding consistently across all slides
- Template saved as "{Company Name} Custom Template" for future use
- Automatically applied to all new presentations

**Multi-Language Support**:
- User toggles language selector in conversation: EN | ES | PT
- AI adapts responses to selected language instantly
- Slide content generated in chosen language
- Export maintains language setting
- Support for region-specific formatting (dates, currency)
- Bilingual decks: Create English version, duplicate and translate to Spanish

**Presentation Modes**:
- **Standard mode**: Full editable deck with all features
- **Presentation mode**: Fullscreen view with speaker notes below each slide, timer, slide navigation
- **PDF mode**: Optimized for printing, single-page handouts
- **Mobile mode**: Vertical scroll, simplified for phone viewing and quick edits

### UI/UX Design Points

**Visual Hierarchy**:
- **Desktop layout (1920×1080)**:
  - Chat interface: Left panel, 60% width, fixed position
  - Preview panel: Right panel, 40% width, scrollable
  - Slide thumbnails: Collapsible left sidebar in preview panel (150px width)
  - Progress indicator: Top of chat panel, always visible
- **Tablet layout (768×1024)**:
  - Chat and preview stack vertically
  - Chat: Top 50%, collapsible
  - Preview: Bottom 50%, expandable to fullscreen
- **Mobile layout (375×667)**:
  - Tabs: "Chat" and "Preview" toggle
  - Chat full-width when active
  - Preview full-width when active
  - Swipe gestures to navigate slides
  - Sticky "Generate Deck" button at bottom

**Mobile Responsiveness**:
- Touch-optimized buttons: Minimum 44×44px tap targets
- Swipe gestures:
  - Swipe left/right: Navigate between slides
  - Swipe down on preview: Minimize to show chat
  - Pinch to zoom on individual slides
- Mobile keyboard: Auto-resize chat input when keyboard appears
- Optimized for portrait orientation (primary use case)
- Landscape mode: Fullscreen preview for presenting

**Accessibility**:
- **WCAG 2.1 AA compliance** across all features
- **Screen reader support**:
  - All buttons labeled with aria-labels
  - Slide content read in logical order
  - Conversation history navigable via keyboard
- **Keyboard navigation**:
  - Tab through all interactive elements
  - Arrow keys navigate slides
  - Enter to accept AI suggestions
  - Escape to close modals
- **High contrast mode**: Toggle in settings, increases contrast ratios to 7:1
- **Focus indicators**: 2px blue outline on focused elements
- **Alt text**: All images, charts, and graphics have descriptive alt text

**Visual Design System**:
- **Colors**:
  - Primary: Medellin Spark blue (#1E40AF)
  - Secondary: Success green (#10B981) for completion states
  - Accent: Purple (#8B5CF6) for AI actions
  - Neutral: Gray scale (#F9FAFB to #111827)
  - Error: Red (#EF4444)
  - Warning: Yellow (#F59E0B)
- **Typography**:
  - Font family: Inter (system font fallback: -apple-system, BlinkMacSystemFont, "Segoe UI")
  - Headings: 600 weight, 1.2 line height
  - Body: 400 weight, 1.6 line height
  - Code: JetBrains Mono
  - Hierarchy: H1 (32px) → H2 (24px) → H3 (20px) → Body (16px) → Small (14px)
- **Spacing**:
  - 8px base grid system (8px, 16px, 24px, 32px, 48px, 64px)
  - Consistent padding: Components use multiples of 8
  - Margins: Sections separated by 48px vertical spacing
- **Components**:
  - Buttons: Rounded corners (6px), 12px vertical padding, 24px horizontal padding
  - Cards: White background, subtle shadow (0 1px 3px rgba(0,0,0,0.1)), 8px border radius
  - Inputs: 1px border, focus state with 2px blue outline, 8px padding
  - Loading states: Skeleton screens (not spinners) for better perceived performance

---

## 6. Narrative

**User Story**: Maria sits at her kitchen table at 10 PM on a Tuesday, exhausted after a 10-hour workday at her full-time software engineering job. Her laptop glows in the dim light. In 48 hours, she has a meeting with three Colombian angel investors who could fund her $150K seed round for her retail SaaS startup. She has no pitch deck. She opened PowerPoint three times this week and closed it each time, overwhelmed by blank slides and analysis paralysis about what investors expect.

She remembers a tweet from a founder friend mentioning Medellin Spark's AI pitch deck tool. She navigates to the website, skeptical but desperate. "Create your pitch deck in 15 minutes with AI" sounds too good to be true, but she has nothing to lose.

She clicks "Start Free," enters her email, and is immediately greeted by a conversational interface: "Hi! I'm your AI pitch deck assistant. Tell me about your startup in one sentence." Maria types: "I built a SaaS platform that helps small retail stores manage inventory and predict demand using AI." The AI responds instantly: "That's exciting! Let's create an amazing pitch deck together."

For the next 12 minutes, Maria has a natural conversation. The AI asks targeted questions about her market, competitors, traction, and team. Unlike the intimidating blank PowerPoint slides, the conversation feels collaborative—like talking to a knowledgeable advisor. When she's unsure how to describe her competitive advantage, the AI provides an example: "Try something like: 'Unlike QuickBooks which only tracks inventory, we predict stockouts before they happen.'" Maria adapts it to her own words.

At 10:15 PM, the AI says: "Perfect! I have everything I need. Generating your pitch deck now..." Maria watches as a progress bar fills, showing messages like "Analyzing your answers" and "Selecting the perfect template." In 30 seconds, a complete 10-slide pitch deck appears in the preview panel. Maria's eyes widen. It's professional. It's structured. It actually looks like something she could present to investors.

She clicks through each slide. The content is there—her problem statement, her solution description, her early traction metrics ($8K MRR, 15 paying customers). The design is clean and modern, far better than anything she could create herself. She spots placeholder screenshots and spends 10 minutes uploading real product images. She uses the AI editing assistant to refine a few bullet points: "Make this sound more confident," she types. The AI rewrites her tentative phrasing into compelling investor language.

At 10:35 PM—25 minutes after starting—Maria clicks "Export to PowerPoint." Ten seconds later, she downloads `maria_retail_saas_pitch_deck_2025-01-25.pptx`. She opens it in PowerPoint. Every slide is there, every format preserved. She makes final tweaks—adding her logo to the cover slide, adjusting one metric that changed yesterday—and saves it. Total time invested: 45 minutes, including image uploads and final edits.

Two days later, Maria presents to the angel investors. They're impressed by the structure, the clarity, and the professionalism. One investor says: "This is one of the clearest seed-stage decks I've seen this year." Maria closes her $150K round three weeks later. Her pitch deck didn't raise the money—her product, traction, and vision did—but it opened the door and let her tell her story effectively.

Six months later, Maria needs to create a Series A deck. She opens Medellin Spark, finds her original presentation in the dashboard, duplicates it, and asks the AI: "Update this for Series A investors, emphasizing our growth from $8K to $120K MRR and our team expansion." In 8 minutes, she has an updated deck. This time, she knows exactly what to do.

---

## 7. Success Metrics

### User-Centric Metrics

- **Completion Rate**: 85% of users who start the wizard complete a pitch deck within 7 days (industry benchmark for similar tools: 60%)
- **Time to First Deck**: Average time from account creation to first exported deck under 15 minutes (target: 12 minutes median)
- **Satisfaction Score**: Net Promoter Score (NPS) above 50 (target: 55+), measured via in-app survey 24 hours after export
- **Return Usage**: 40% of users create 2+ pitch decks within first 30 days (indicates product utility beyond one-time use)
- **Edit Engagement**: 70% of users make at least one edit after initial generation (shows users are invested in customization)
- **Export Success**: 95% of generation attempts result in successful PPTX export without errors
- **AI Acceptance Rate**: 75% of AI content suggestions accepted by users (validates quality of AI-generated content)
- **Template Satisfaction**: 80% of users keep AI-recommended template (validates template selection algorithm)

### Business Metrics

- **Monthly Active Users (MAU)**: 1,000 MAU within 3 months of launch (conservative initial target)
- **Free-to-Premium Conversion**: 8% of free users upgrade to premium within 30 days (industry benchmark: 3-5%)
- **Monthly Churn Rate**: Monthly churn under 5% for premium subscribers (indicates sustained value)
- **Customer Acquisition Cost (CAC)**: Under $50 per user across all channels (organic, paid, referral)
- **Lifetime Value (LTV)**: Over $200 per premium user (LTV:CAC ratio target: 4:1)
- **Monthly Recurring Revenue (MRR)**: $25K within 6 months (250 premium users × $29/month + 100 org seats × $79/month)
- **Feature Adoption**: 60% of users use AI editing assistant at least once (drives premium upgrade intent)
- **Referral Rate**: 25% organic referral rate (users share their decks, driving word-of-mouth)
- **Export Volume**: 2,500 PPTX exports per month by month 6 (indicates active usage, not just signups)

### Technical Metrics

- **System Uptime**: 99.9% availability (target: 99.95%), measured via uptime monitoring service
- **API Response Time**: Average response time under 2 seconds for chat interactions (p95 under 5 seconds)
- **Generation Speed**: Complete deck generation under 30 seconds (p95 under 45 seconds), measured end-to-end
- **Export Speed**: PPTX export under 10 seconds (p95 under 15 seconds) for standard 10-slide decks
- **Error Rate**: Under 1% of API requests result in errors (client-side or server-side)
- **Database Query Performance**: All queries under 100ms (p95 under 200ms), with query optimization for N+1 issues
- **Cost per Generation**: Under $0.25 per pitch deck (including AI costs from OpenAI/Gemini, compute, storage)
- **Cache Hit Rate**: 60%+ cache hit rate for template loading and common AI responses (reduces latency and costs)
- **Concurrent Users**: Support 500 concurrent users without performance degradation (load testing validated)

---

## 8. Technical Considerations

### Integration Points

**Blaxel Platform**:
- Deploy multi-agent system to Blaxel cloud infrastructure for serverless scaling
- Use Blaxel CLI for local development with hot reload: `bl serve --hotreload`
- Leverage Blaxel's built-in CopilotKit integration for seamless agent-to-UI connection
- Access global endpoints for low-latency worldwide: `https://run.blaxel.ai/amoai/functions/pitch-deck-agent`
- Monitor agent performance via Blaxel dashboard: logs, metrics, error rates
- Auto-scaling handles traffic spikes automatically (0 to 1000 requests/minute)

**CopilotKit**:
- **Frontend**: Next.js 14+ React components for conversational UI
- **Components**:
  - `CopilotSidebar`: Chat interface for pitch deck wizard
  - `CopilotRuntime`: Backend integration with Blaxel agents
- **GraphQL endpoint**: `/copilotkit` for agent discovery and capability negotiation
- **REST API**: Message handling via POST `/copilotkit` with streaming responses
- **State management**: Conversation history persisted in browser localStorage + Supabase sync
- **Error handling**: Graceful degradation if agent unavailable (queue system, retry logic)

**OpenAI API**:
- **GPT-4 Turbo** as primary content generation model (gpt-4-turbo-preview)
- **GPT-3.5 Turbo** for faster, less critical tasks (summaries, tone adjustments)
- **Streaming responses**: Server-Sent Events for real-time content generation
- **Function calling**: Structured data extraction from conversation (company name, metrics, traction)
- **Rate limiting**: 60 requests/minute per user (prevents abuse), queue system for bursts
- **Error handling**: Exponential backoff on rate limits, fallback to Gemini on persistent failures
- **Cost tracking**: Log all API calls with token counts and costs to Supabase for budget monitoring

**Presenton.ai Templates** (Future Integration):
- Access to template library via API (if Presenton exposes API; otherwise, manual import)
- Template schema validation with Zod for type safety and error prevention
- Runtime compilation for custom templates using Babel (if supporting user-uploaded templates)
- Template caching in Redis with 24-hour TTL for performance (reduces repeated fetches)
- Version control: Track template updates and allow users to lock to specific version

**Supabase Database**:
- **PostgreSQL 15+** for all application data with native JSON support
- **Row-Level Security (RLS)**: Multi-tenant isolation, users only access own data
- **Real-time subscriptions**: Live updates to presentation status during generation
- **Edge Functions**: Serverless backend logic for export, analytics, image processing
- **Storage**: Presentation files (PPTX exports), images, user-uploaded assets
- **Backup**: Automated daily backups with 30-day retention, point-in-time recovery available

### Data Storage & Privacy

**Data Architecture**:
- **users** table: Authentication and profile data (managed by Supabase Auth)
- **profiles** table: User profiles linked to auth.users
- **presentations** table: Deck metadata (title, status, template_id, created_at) + JSONB content column
- **pitch_conversations** table: AI conversation sessions with JSONB messages array
- **presentation_templates** table: Template definitions with JSONB slides structure
- **custom_themes** table: User-created branding themes
- **generated_images** table: AI-generated or uploaded images linked to presentations
- **presentation_views** table: Analytics tracking for shared presentations

**Privacy & Security**:
- **Data encryption at rest**: AES-256 encryption for all Supabase data (default)
- **Data encryption in transit**: HTTPS/TLS 1.3 for all API communication
- **API keys security**: Stored in environment variables, never committed to version control, rotated quarterly
- **Personal data handling**: GDPR-compliant (right to access, right to deletion, data portability)
- **User data deletion**: Permanent deletion within 30 days of account closure request
- **Rate limiting**: 100 requests/minute per IP address to prevent scraping and abuse
- **Content filtering**: OpenAI moderation endpoint filters inappropriate content in AI responses
- **Session security**: JWT tokens with 7-day expiration, refresh tokens rotated on use

**Data Retention**:
- **Active presentations**: Indefinite storage while account active
- **Exported PPTX files**: 7 days in Supabase Storage (CDN-cached), then deleted to save costs
- **Conversation history**: 30 days retention, then anonymized (messages kept for AI training, IDs removed)
- **Analytics data**: 12 months for free users, unlimited for premium users
- **Soft-deleted data**: 30-day grace period before permanent deletion (allows undo)
- **Backups**: 30-day retention with automated daily snapshots

### Scalability & Performance

**Caching Strategy**:
- **Redis cache** for frequently accessed templates (hit rate target: 70%)
- **CDN caching** for static assets (images, CSS, JS) with CloudFlare or AWS CloudFront
- **Database query result caching**: 5-minute TTL for presentation lists, template catalogs
- **AI response caching**: Common queries cached ("How do I write a problem statement?") → instant responses
- **Template schema caching**: 24-hour TTL, loaded into memory on agent startup

**Load Balancing**:
- **Blaxel auto-scaling**: Automatically scales agent instances based on request volume (0 to 100 instances)
- **Supabase connection pooling**: PgBouncer handles 10,000+ concurrent connections
- **Multi-region deployment**: Primary in US East, replicas in EU and South America for <200ms latency
- **Graceful degradation**: If agent overloaded, queue system with estimated wait time ("Your deck will be ready in 2 minutes")
- **Circuit breakers**: Prevent cascading failures by disabling failing services temporarily

**Database Growth**:
- **Partition presentations table by date**: Monthly partitions for queries on created_at (faster range scans)
- **Archive old presentations**: Move decks >90 days old to cold storage (S3 Glacier), restore on demand
- **Index optimization**: Regular ANALYZE and VACUUM operations, query plan analysis with pg_stat_statements
- **Connection pooling limits**: Max 100 connections to prevent database overload
- **Query timeout configurations**: 30-second timeout for complex queries, prevents long-running queries from blocking

### Potential Challenges

**AI Hallucination**:
- **Risk**: AI generates incorrect metrics, invents competitors, or fabricates team member credentials
- **Mitigation**:
  - Explicitly instruct AI: "Only use information provided by the user. Do not invent data."
  - Highlight AI-generated content with disclaimer: "Review all numbers and facts before presenting to investors"
  - User validation step: "Please confirm these details are accurate" before final generation
  - Content verification prompts: AI asks follow-up questions if answers seem inconsistent
- **Monitoring**: Track user edit rate on AI-generated content (high edit rate signals low accuracy)

**Cost Management**:
- **Risk**: AI costs spike with heavy usage (100 generations/day × $0.20/generation = $600/month)
- **Mitigation**:
  - Rate limiting: Free users limited to 1 deck/month, premium users unlimited but monitored
  - Caching: Common responses cached to reduce redundant API calls
  - Tiered pricing: Premium users subsidize free tier
  - Cost alerts: Email notifications when daily AI spend exceeds $50
  - Provider optimization: Route simple tasks to cheaper models (GPT-3.5), complex to GPT-4
- **Monitoring**: Real-time cost tracking dashboard showing $/user, $/generation, trend analysis

**Latency Issues**:
- **Risk**: Slow AI responses degrade user experience (>10 seconds feels broken)
- **Mitigation**:
  - Streaming responses: Show content as it's generated, not after completion
  - Optimized prompts: Shorter prompts reduce token count and processing time
  - Caching: Template selection cached, common questions pre-answered
  - Fallback providers: If OpenAI slow (>5s), automatically try Gemini
  - Loading indicators: Clear progress bars and messages ("Generating slide 3 of 10...")
- **Monitoring**: Response time tracking with p50, p95, p99 metrics; alert if p95 >5 seconds

**Template Compatibility**:
- **Risk**: Generated content doesn't fit template structure (e.g., 500-word paragraph in slide designed for 3 bullets)
- **Mitigation**:
  - Schema validation: Zod schemas enforce content structure before template application
  - Content adaptation: AI automatically condenses content if too long for template
  - Fallback templates: If custom template fails validation, use generic "Modern" template
  - User prompts: "This slide is best with 3-5 bullet points. Try condensing your answer."
- **Monitoring**: Validation error tracking; if template fails frequently, flag for review

**Scalability Bottlenecks**:
- **Risk**: System slows under high load (100+ concurrent generations)
- **Mitigation**:
  - Auto-scaling: Blaxel agents scale horizontally to handle traffic
  - Queue system: During peak load, queue requests with position and estimated wait time
  - Performance testing: Load test with 500 concurrent users before launch
  - Database optimization: Read replicas for analytics queries (don't impact write performance)
- **Monitoring**: Infrastructure metrics (CPU, memory, request queue depth); alert if queue >50

---

## 9. Milestones & Sequencing

### Project Size & Duration

**Size**: Large-scale project with multi-agent AI, complex integrations, and full-stack development
**Duration**: 12-16 weeks (estimated; can compress to 8-10 weeks with focused team)
**Team Composition**:
- 1 Product Manager (full-time, owns roadmap, user research, stakeholder alignment)
- 2 Backend Engineers (Python, FastAPI, LangGraph, Blaxel, AI integration)
- 1 Frontend Engineer (React, TypeScript, Next.js, CopilotKit, Tailwind CSS)
- 1 Full-Stack Engineer (bridges backend/frontend, owns export agent and database)
- 1 Designer (UI/UX, creates templates, design system, user flows)
- 1 QA Engineer (manual + automated testing, owns quality metrics)
- 1 DevOps Engineer (part-time, 20 hours/week, owns deployment, monitoring, scaling)

---

### Phase 1: Foundation (Weeks 1-4)

**Goal**: Build core multi-agent infrastructure and establish working end-to-end pipeline

**Deliverables**:
- Blaxel agent setup and deployment to cloud environment
- Supervisor agent orchestration with LangGraph state machine
- Content generation agent using GPT-4 (generates 8-12 slides)
- Basic conversation flow (7-10 questions covering problem, solution, market, traction, team)
- Database schema and migrations in Supabase (presentations, pitch_conversations, templates tables)
- CopilotKit frontend integration with chat UI
- Basic slide preview (static, non-interactive)

**Success Criteria**:
- ✅ Agent responds to basic pitch deck requests: "Create a pitch deck for my SaaS startup"
- ✅ Content generation working end-to-end: conversation → slides → database
- ✅ Frontend displays generated slides in preview panel
- ✅ Database saves conversations and presentations with proper foreign keys
- ✅ Local development environment functional with `bl serve --hotreload`
- ✅ No critical bugs in happy path (start conversation → generate deck → view preview)

**Dependencies**:
- Blaxel CLI installed and authenticated (`bl login amoai`)
- OpenAI API key obtained and configured in environment variables
- Supabase project configured with RLS policies
- Development environment setup: Python 3.10+, Node 18+, Docker for local Supabase

**Key Milestones**:
- Week 1: Blaxel setup, supervisor agent skeleton, database schema
- Week 2: Content agent implementation, conversation flow logic
- Week 3: CopilotKit frontend integration, basic UI
- Week 4: End-to-end testing, bug fixes, code review

---

### Phase 2: Content & Templates (Weeks 5-8)

**Goal**: Enhance content quality, add professional template system, and implement schema validation

**Deliverables**:
- Template agent implementation (selects best template based on content analysis)
- Presenton.ai template integration (minimum 3 template families: General, Modern, Financial)
- Schema validation system with Zod (enforces content structure matches template requirements)
- Multi-slide generation (8-12 slides covering all essential pitch deck sections)
- Content refinement and iteration (AI editing assistant sidebar)
- Template preview functionality (user can preview templates before applying)
- Custom theme support (users upload logo and brand colors)

**Success Criteria**:
- ✅ Generated decks have 8+ professional slides (cover, problem, solution, market, model, traction, team, ask)
- ✅ Templates apply correctly to content without overflow or layout breaks
- ✅ Schema validation prevents errors: rejects incompatible content before template application
- ✅ User can preview 3 templates side-by-side before selecting
- ✅ Template switching post-generation preserves all content (no data loss)
- ✅ AI editing assistant provides useful suggestions (measured by user acceptance rate >60%)

**Dependencies**:
- Phase 1 complete and stable
- Presenton.ai API access or manual template import
- Template library available (3+ families with 8-12 slide layouts each)
- OpenAI GPT-4 API quota sufficient for increased usage

**Key Milestones**:
- Week 5: Template agent implementation, schema validation
- Week 6: Template library integration, preview UI
- Week 7: AI editing assistant, content refinement
- Week 8: Custom theme support, bug fixes

---

### Phase 3: UI/UX Polish (Weeks 9-11)

**Goal**: Complete user experience, polish interface, and ensure mobile responsiveness and accessibility

**Deliverables**:
- Real-time slide preview with streaming updates (slides appear as AI generates them)
- Conversation UI improvements (typing indicators, example prompts, progress tracking)
- Dashboard integration (list all presentations, filter, search, quick actions)
- Mobile responsiveness (optimized for iOS and Android browsers)
- Accessibility compliance (WCAG 2.1 AA: keyboard navigation, screen reader support, high contrast)
- Loading states and animations (skeleton loaders, smooth transitions, progress indicators)
- Empty states and error handling (clear messages, retry options, helpful guidance)

**Success Criteria**:
- ✅ UI is intuitive: New users complete first deck without documentation
- ✅ Mobile experience seamless: 90%+ of mobile users complete wizard
- ✅ Preview updates smoothly within 2 seconds of AI response
- ✅ Dashboard displays all presentations with thumbnails and metadata
- ✅ Accessibility audit passes with 0 critical issues
- ✅ Loading states feel fast (perceived performance via skeleton screens)

**Dependencies**:
- Phase 2 complete with stable content generation
- Design system finalized (colors, typography, spacing, components)
- QA testing complete with documented bugs prioritized

**Key Milestones**:
- Week 9: Real-time preview, streaming updates
- Week 10: Dashboard, mobile optimization
- Week 11: Accessibility compliance, polish, animations

---

### Phase 4: Export & Advanced Features (Weeks 12-14)

**Goal**: Add PPTX export, premium features, analytics, and sharing functionality

**Deliverables**:
- PPTX export implementation with python-pptx library
- Export agent deployment (converts slides to PowerPoint with proper formatting)
- AI editing assistant with advanced capabilities (tone adjustment, rewriting, grammar fixes)
- Premium feature gating (unlimited presentations, custom branding, priority queue)
- Analytics dashboard (view counts, time spent editing, slide performance)
- Presentation sharing (public links, password protection, permission control)
- Multi-provider AI fallback (OpenAI → Gemini → Claude)

**Success Criteria**:
- ✅ PPTX exports work correctly: Opens in PowerPoint, Google Slides, Keynote without errors
- ✅ AI assistant provides helpful suggestions with >60% acceptance rate
- ✅ Premium features restricted properly: Free users see upgrade prompts
- ✅ Analytics display accurate data with <5 minute delay
- ✅ Sharing links work: View-only access functional, password protection enforced
- ✅ Fallback providers activate on failures within 5 seconds

**Dependencies**:
- Phase 3 complete with polished UI
- python-pptx library integrated and tested
- Premium subscription billing configured (Stripe integration)

**Key Milestones**:
- Week 12: PPTX export, export agent
- Week 13: Premium features, analytics
- Week 14: Sharing, multi-provider fallback

---

### Phase 5: Testing & Launch (Weeks 15-16)

**Goal**: Finalize product, ensure quality, and launch to production

**Deliverables**:
- End-to-end testing complete (manual + automated with Playwright)
- Performance optimization (query optimization, caching, CDN setup)
- Security audit (penetration testing, vulnerability scan, RLS verification)
- Documentation finalized (user guide, API docs, developer onboarding)
- Marketing materials (landing page copy, demo video, social media assets)
- Launch plan execution (email campaign, social media, Product Hunt launch)
- Monitoring and alerting configured (Sentry, Supabase logs, Blaxel dashboard)

**Success Criteria**:
- ✅ All automated tests passing (unit, integration, e2e)
- ✅ Performance targets met: <2s API response, <30s generation, <10s export
- ✅ Security vulnerabilities addressed (0 critical, 0 high-severity issues)
- ✅ Team trained on support workflows (how to respond to user issues)
- ✅ Launch day execution successful: 100+ signups, 60+ deck generations
- ✅ Monitoring alerts configured: Immediate notification if uptime <99%

**Dependencies**:
- All previous phases complete
- Beta testing feedback incorporated (50 beta users tested weeks 13-14)
- Infrastructure scaled for launch (load testing validated 500 concurrent users)

**Key Milestones**:
- Week 15: Testing, performance optimization, security audit
- Week 16: Documentation, marketing, launch

---

## 10. User Stories

### US-001: Conversational Pitch Deck Creation

**ID**: US-001
**Priority**: High
**Story Points**: 8
**Epic**: Core Pitch Deck Wizard

**Description**: As a first-time founder with no design experience, I want to create a pitch deck through natural conversation with an AI assistant, so I can focus on articulating my business vision rather than struggling with PowerPoint templates and design decisions.

**Acceptance Criteria**:
- [ ] User can start conversation by typing a single sentence about their startup (e.g., "I'm building a SaaS tool for restaurants")
- [ ] AI asks 7-10 targeted questions covering problem, solution, market, traction, team, and funding ask
- [ ] User can provide answers naturally without strict formatting requirements (conversational, not form-like)
- [ ] Progress bar shows completion percentage updating in real-time (0% → 20% → 40% → 60% → 80% → 100%)
- [ ] Minimum 80% completion required to generate deck (system blocks generation until threshold met)
- [ ] User can pause conversation and resume later (state saved in database, retrievable via conversation ID)
- [ ] Conversation history is saved and viewable (user can scroll up to see previous questions/answers)
- [ ] AI adapts questions based on previous answers (e.g., if user mentions B2B SaaS, ask about enterprise sales vs. self-serve)
- [ ] System provides helpful examples when user is stuck (e.g., "Not sure? Here's an example: 'We solve inventory waste for grocery stores'")
- [ ] Multi-language support: User can toggle language (EN/ES/PT) and AI adapts responses immediately

**Technical Notes**:
- Implement supervisor agent for conversation orchestration using LangGraph
- Store conversation state in Supabase `pitch_conversations` table with JSONB messages array
- Use OpenAI GPT-4 for natural language understanding and question generation
- Implement pause/resume logic with conversation threading (unique conversation ID per session)
- Progress calculation: `(answered_questions / total_required_questions) * 100`

**Testing Checklist**:
- [ ] Test with minimal input: "I'm building an app" → AI asks clarifying questions
- [ ] Test pause/resume: Start conversation, close browser, reopen → conversation restored
- [ ] Test progress bar accuracy: Manually answer questions and verify % matches expected
- [ ] Test language switching: Start in English, switch to Spanish mid-conversation → AI continues in Spanish
- [ ] Test example prompts: Click example link → suggestion auto-fills input field

---

### US-002: Multi-Slide Generation

**ID**: US-002
**Priority**: High
**Story Points**: 13
**Epic**: Core Pitch Deck Wizard

**Description**: As a founder raising seed funding, I want the AI to generate 8-12 professional slides automatically covering all essential pitch deck sections, so I have a complete presentation ready to customize rather than starting from scratch.

**Acceptance Criteria**:
- [ ] System generates minimum 8 slides for every deck (cover, problem, solution, market, model, traction, team, ask)
- [ ] Slides follow standard investor pitch deck structure: Cover → Problem → Solution → Market → Business Model → Traction → Team → Financials → Ask
- [ ] Content is narrative-coherent: Information builds logically across slides without contradictions
- [ ] Each slide has appropriate content length: Title (5-10 words), body (50-150 words or 3-5 bullets)
- [ ] Slides are logically ordered and numbered (1/10, 2/10, etc.)
- [ ] Generation completes in under 30 seconds for 10-slide deck (p95 under 45 seconds)
- [ ] User sees progress during generation: "Generating slide 3 of 10..." with progress bar
- [ ] Error handling: If generation fails, clear error message with retry option
- [ ] Generated content uses user-provided data (no hallucinated metrics or team members)
- [ ] Slide titles descriptive and scannable (e.g., "Problem: $800B Wasted Annually on Retail Inventory")

**Technical Notes**:
- Content agent generates individual slides sequentially or in parallel (parallel for speed, sequential for coherence)
- Supervisor agent ensures narrative coherence by reviewing all slides before returning
- Parallel generation where possible: Cover slide + Problem slide generated simultaneously
- Implement retry logic for failed generations: Try 3 times before showing error
- Progress tracking: Emit SSE events for each slide completed (`{"slide_index": 3, "total": 10, "status": "complete"}`)

**Testing Checklist**:
- [ ] Test minimum slide generation: All decks have ≥8 slides
- [ ] Test narrative coherence: Check for contradictions (e.g., problem statement contradicts solution)
- [ ] Test generation speed: Time 10 generations, ensure p95 <45 seconds
- [ ] Test progress tracking: Verify SSE events emit correctly for each slide
- [ ] Test error handling: Simulate API failure, verify retry logic and error message
- [ ] Test content length: Verify no slides exceed 200 words (truncate if necessary)

---

### US-003: Template Application

**ID**: US-003
**Priority**: High
**Story Points**: 8
**Epic**: Template System

**Description**: As a founder with no design skills, I want my content automatically formatted with a professional template, so my pitch deck looks polished and investor-ready without manual design work.

**Acceptance Criteria**:
- [ ] System automatically selects best template based on content analysis (industry, complexity, formality)
- [ ] User can preview template before final application (thumbnail + first 3 slides rendered)
- [ ] Template applied within 5 seconds of selection
- [ ] All content fits template structure: No text overflow, no cut-off images, no layout breaks
- [ ] Template maintains professional styling: Consistent fonts, colors, spacing, alignment
- [ ] User can switch to different template after generation (dropdown selector with 3+ options)
- [ ] Template change preserves all content: No data loss, content intelligently re-mapped to new layout
- [ ] Schema validation prevents incompatible content: If content doesn't fit, prompt user to condense
- [ ] Template metadata visible: Name, category, best use cases displayed in preview

**Technical Notes**:
- Template agent analyzes content and scores templates using algorithm:
  - `score = industry_match * 0.4 + complexity_match * 0.3 + style_match * 0.3`
  - Industry match: Fintech → Modern template, Healthcare → Professional template
  - Complexity match: Technical content → Detailed template, Simple pitch → Minimal template
- Integrate with Presenton.ai template library or use custom template system
- Implement Zod schema validation for template-content compatibility
- Cache template schemas in Redis for <100ms load times (TTL: 24 hours)
- Template preview: Pre-render first 3 slides server-side, return as images

**Testing Checklist**:
- [ ] Test template selection: Verify fintech startup gets Modern template, healthcare gets Professional
- [ ] Test template preview: Verify first 3 slides render correctly with user content
- [ ] Test template switching: Change template 3 times, verify content preserved each time
- [ ] Test schema validation: Intentionally provide incompatible content (e.g., 500-word paragraph for bullet layout), verify error message
- [ ] Test content fit: Generate decks with varying content lengths (50 words, 200 words), verify no overflow
- [ ] Test loading speed: Measure template load time, ensure <5 seconds for application

---

### US-004: Real-Time Preview

**ID**: US-004
**Priority**: High
**Story Points**: 5
**Epic**: User Experience

**Description**: As a founder creating a pitch deck, I want to see my slides being generated in real-time, so I know the system is working and can immediately spot issues that need correction.

**Acceptance Criteria**:
- [ ] Preview panel shows slides as they're generated (progressive display, not batch after completion)
- [ ] Updates appear within 2 seconds of AI generating content (low latency)
- [ ] User can click individual slide to view full-size with zoom capability (modal or sidebar)
- [ ] Thumbnail navigation in left sidebar shows all slides with numbering (1, 2, 3, ...)
- [ ] Preview updates without page refresh (real-time via WebSocket or SSE)
- [ ] Mobile preview functional: Swipe gestures work, touch targets ≥44px
- [ ] Preview maintains 16:9 aspect ratio across all screen sizes (desktop, tablet, mobile)
- [ ] Loading states: Skeleton loaders for slides still generating (not blank space or spinners)
- [ ] Smooth animations: Fade in for new slides (not pop or flash)

**Technical Notes**:
- Implement Server-Sent Events (SSE) for real-time streaming from Blaxel agent to frontend
- React state management with Zustand for preview updates (avoids prop drilling)
- Framer Motion for smooth slide animations (fade in with 300ms duration)
- Virtual scrolling for decks with 20+ slides (react-window library for performance)
- Optimize image rendering: Lazy load slide thumbnails, preload next 3 slides in viewport

**Testing Checklist**:
- [ ] Test real-time updates: Start generation, verify slides appear progressively (not all at once)
- [ ] Test latency: Measure time between AI completion and UI update, ensure <2 seconds
- [ ] Test full-size view: Click slide, verify modal opens with zoom controls
- [ ] Test mobile gestures: Swipe left/right on mobile, verify slide navigation works
- [ ] Test aspect ratio: Resize browser to various widths (375px, 768px, 1920px), verify 16:9 maintained
- [ ] Test skeleton loaders: Verify placeholder UI shown for in-progress slides
- [ ] Test animations: Verify smooth fade-in (no janky pop-in)

---

### US-005: PPTX Export

**ID**: US-005
**Priority**: High
**Story Points**: 8
**Epic**: Export System

**Description**: As a founder preparing for investor meetings, I want to download my pitch deck as a PowerPoint file, so I can make final customizations, add my company logo, and present offline.

**Acceptance Criteria**:
- [ ] User can click "Export to PowerPoint" button to initiate download
- [ ] Export completes in under 10 seconds for standard 10-slide deck (p95 under 15 seconds)
- [ ] PPTX file opens correctly in Microsoft PowerPoint 2016+ without errors or warnings
- [ ] All slides included in correct order (1, 2, 3, ..., 10)
- [ ] Template styling preserved: Fonts render correctly, colors match exactly (#1E40AF → #1E40AF), layouts intact
- [ ] File size under 10MB for 80% of decks (12-15MB acceptable for image-heavy presentations)
- [ ] User sees download progress indicator (progress bar or percentage)
- [ ] Error handling: If export fails, clear message ("Export failed. Try again?") with retry button
- [ ] Downloaded file named logically: `{company_name}_pitch_deck_{YYYY-MM-DD}.pptx` (e.g., `acme_corp_pitch_deck_2025-01-25.pptx`)
- [ ] File compatible with Google Slides and Apple Keynote (some formatting variation acceptable)

**Technical Notes**:
- Use `python-pptx` library for PPTX generation in export agent
- Template rendering via Jinja2 for inserting slide content into template structure
- Async export processing to prevent UI blocking: Export runs in background, download link provided when ready
- Files stored temporarily in Supabase Storage with 7-day expiration (auto-delete to save costs)
- CDN-backed download links for fast delivery (CloudFlare or AWS CloudFront)
- Font embedding: Include font files in PPTX for cross-platform compatibility

**Testing Checklist**:
- [ ] Test export speed: Generate 10 decks, measure time, ensure p95 <15 seconds
- [ ] Test PowerPoint compatibility: Open exported PPTX in PowerPoint 2016, 2019, 2021, verify no errors
- [ ] Test Google Slides compatibility: Import PPTX into Google Slides, verify renders correctly
- [ ] Test file size: Generate 20 decks, verify 80%+ are <10MB
- [ ] Test error handling: Simulate export failure (e.g., invalid content), verify error message and retry
- [ ] Test file naming: Verify filename format matches `{company}_pitch_deck_{date}.pptx`
- [ ] Test font rendering: Export deck, open on different computer, verify fonts display correctly (not fallback)

---

### US-006: AI Editing Assistant

**ID**: US-006
**Priority**: Medium
**Story Points**: 5
**Epic**: Advanced Features

**Description**: As a founder refining my pitch deck, I want an AI assistant to help me improve slide content with suggestions, rewrites, and tone adjustments, so I can polish my messaging without hiring a copywriter.

**Acceptance Criteria**:
- [ ] User can access AI assistant from presentation editor page (sidebar or panel)
- [ ] AI provides context-aware suggestions based on current slide being edited
- [ ] User can request specific changes: "Make this more concise," "Adjust tone to be more formal," "Fix grammar"
- [ ] Suggestions appear within 3 seconds of request (low latency)
- [ ] AI understands slide context: "Rewrite this slide" operates only on current slide, not entire deck
- [ ] User can accept or reject each suggestion with one click (thumbs up/down or accept/reject buttons)
- [ ] Suggestions improve content quality: >60% acceptance rate (measured via user actions)
- [ ] AI does not generate inappropriate content: Content filtering active, no offensive language
- [ ] Editing history: User can undo AI suggestions and revert to previous version

**Technical Notes**:
- Implement CopilotKit sidebar in presentation editor page
- Pass slide context to AI agent: Current slide content + full presentation outline for coherence
- Use GPT-4 for high-quality rewrite suggestions (GPT-3.5 for grammar fixes to save costs)
- Suggestion caching: Cache common requests ("make this more concise") to reduce API calls
- Content moderation: Run all AI responses through OpenAI moderation endpoint before displaying
- Undo functionality: Store version history in local state, allow rollback to previous versions

**Testing Checklist**:
- [ ] Test suggestion latency: Request 10 suggestions, measure time, ensure <3 seconds
- [ ] Test context awareness: Edit slide 3, request "make this shorter," verify only slide 3 affected
- [ ] Test acceptance rate: Track user interactions, verify >60% of suggestions accepted
- [ ] Test content filtering: Intentionally request inappropriate content, verify blocked
- [ ] Test undo functionality: Accept suggestion, click undo, verify reverted to previous version
- [ ] Test edge cases: Empty slide, very long slide (500 words), special characters

---

### US-007: Dashboard Management

**ID**: US-007
**Priority**: Medium
**Story Points**: 5
**Epic**: User Experience

**Description**: As a founder managing multiple pitch decks (investor deck, partner deck, demo day deck), I want to see all my presentations in one place with filtering and search, so I can quickly find and manage them.

**Acceptance Criteria**:
- [ ] Dashboard shows list of all user's presentations in card layout (thumbnail + metadata)
- [ ] Each presentation card shows: thumbnail (first slide), title, created date, last edited date, status
- [ ] User can filter by: date created, status (draft/complete), template used, category
- [ ] User can search by title or content keywords (full-text search)
- [ ] User can sort by: date created, last edited, view count (if shared), alphabetical
- [ ] Quick actions available per presentation: Edit, View, Export, Duplicate, Delete, Share
- [ ] Dashboard loads in under 2 seconds with 50 presentations (performance optimized)
- [ ] Supports pagination for users with 20+ presentations (10 per page, infinite scroll optional)
- [ ] Bulk operations: Select multiple presentations, delete or archive in one action
- [ ] Empty state for new users: "You haven't created any pitch decks yet. Create your first deck" with CTA button

**Technical Notes**:
- Integrate with existing `/dashboard/pitch-decks` route from sitemap
- Data fetched from Supabase `presentations` table with optimized query (indexes on created_at, status)
- React Query for caching and optimistic updates (instant UI feedback before server confirmation)
- Postgres full-text search on `title` and `content` columns using `to_tsvector` and `to_tsquery`
- Virtualized list rendering for 100+ presentations (react-window for performance)
- Thumbnail generation via serverless function: Render first slide as image, cache in CDN

**Testing Checklist**:
- [ ] Test loading speed: Create 50 test presentations, measure dashboard load time, ensure <2 seconds
- [ ] Test filtering: Apply filter by status, verify only matching presentations shown
- [ ] Test search: Search for "SaaS fintech," verify relevant decks returned
- [ ] Test sorting: Sort by date, verify presentations ordered correctly (newest first)
- [ ] Test quick actions: Click Edit, View, Export, Duplicate, Delete, verify each works
- [ ] Test bulk operations: Select 10 presentations, delete all, verify confirmation prompt and deletion
- [ ] Test pagination: Create 25 presentations, verify pagination controls and navigation
- [ ] Test empty state: Create new user, verify empty state message and CTA displayed

---

### US-008: Presentation Sharing

**ID**: US-008
**Priority**: Low
**Story Points**: 3
**Epic**: Advanced Features

**Description**: As a founder pitching to investors remotely, I want to share my pitch deck via link, so investors can review it before our meeting without requiring them to create an account.

**Acceptance Criteria**:
- [ ] User can generate unique shareable link for each presentation (click "Share" → link generated)
- [ ] Link works for anyone who has it (no login required for view-only access)
- [ ] User can set permissions: view-only, comment (if commenting feature added), edit (with suggested changes tracked)
- [ ] Optional password protection: User can enable password, viewers must enter to access
- [ ] User can revoke sharing access from dashboard (link becomes invalid immediately)
- [ ] View tracking: User sees who accessed (anonymized or by email if logged in), when, which slides viewed most
- [ ] Email sharing: User can send link via email with custom message template
- [ ] Link expiration options: 7 days, 30 days, 90 days, never (user selects)

**Technical Notes**:
- Generate unique share tokens via `gen_random_uuid()` in Supabase `presentation_shares` table
- Permissions stored in database with share token as key: `{token: "abc123", permissions: "view-only", expires_at: "2025-02-01"}`
- Password hashing via bcrypt (if password protection enabled)
- Email sending via Supabase email service (or SendGrid integration for better deliverability)
- View tracking in `presentation_views` table with anonymized IP (hash for privacy compliance)
- Shared presentation viewer: Separate route `/shared/:token` optimized for non-logged-in users

**Testing Checklist**:
- [ ] Test link generation: Click "Share," verify unique link generated
- [ ] Test view-only access: Open link in incognito, verify can view but not edit
- [ ] Test password protection: Enable password, verify access denied without correct password
- [ ] Test revocation: Revoke access, verify link shows "Access denied" immediately
- [ ] Test view tracking: Access shared link 3 times, verify dashboard shows 3 views
- [ ] Test email sharing: Send link via email, verify email received with custom message
- [ ] Test link expiration: Create link with 7-day expiration, fast-forward system clock, verify expired

---

## 11. Appendix: Conversion from Travel Copilot

### Overview

This AI Pitch Deck Creator is built by converting the existing **Blaxel Travel Copilot** (`template-copilot-kit-py`) into a pitch deck generation system. The travel copilot already has a working multi-agent architecture with CopilotKit integration, so we adapt its structure rather than building from scratch.

### Conversion Strategy

**What We Keep**:
- ✅ FastAPI server structure with CopilotKit endpoints
- ✅ LangGraph supervisor agent pattern
- ✅ Multi-agent orchestration logic
- ✅ Error handling and retry mechanisms
- ✅ Hot reload development workflow (`bl serve --hotreload`)
- ✅ Blaxel deployment configuration (`blaxel.toml`)

**What We Replace**:
- ❌ Flight search agent → Content generation agent
- ❌ Hotel search agent → Template selection agent
- ❌ Travel-specific prompts → Pitch deck prompts
- ❌ Explorer MCP tools → Export agent (new)

**Conversion Timeline**: 3-4 weeks vs. 12-16 weeks from scratch

---

### File-by-File Conversion Plan

#### 1. `travel_copilot.py` → `pitch_deck_copilot.py`

**Old**: Handles travel requests (flights, hotels)
**New**: Handles pitch deck requests (content generation, template selection, export)

**Changes**:
```python
# OLD: Travel-related classes
class TravelRequest(BaseModel):
    inputs: str

# NEW: Pitch deck classes
class PitchDeckRequest(BaseModel):
    inputs: str
    conversation_id: str = None
    slide_count: int = 8

# OLD: Travel request routing
if "flight" in request.inputs.lower():
    return await handle_flight_request(request.inputs)

# NEW: Pitch deck request routing
if any(word in user_input for word in ["generate", "create", "make"]):
    return await handle_content_generation(request.inputs)
```

---

#### 2. `src/flight.py` → `src/content_agent.py`

**Old**: Flight search agent using Explorer MCP
**New**: Content generation agent using GPT-4

**Changes**:
```python
# OLD: Flight agent prompt
prompt = "You are an expert flight search assistant..."

# NEW: Content agent prompt
prompt = """You are an expert pitch deck content creator.
Generate compelling slide content for investor presentations covering:
1. Cover slide, 2. Problem statement, 3. Solution, 4. Market opportunity,
5. Business model, 6. Traction, 7. Team, 8. Financials, 9. Funding ask
"""

# OLD: Flight tools
tools = await bl_tools(["explorer-mcp"])

# NEW: No external tools needed
tools = []
```

---

#### 3. `src/hotel.py` → `src/template_agent.py`

**Old**: Hotel search agent
**New**: Template selection and application agent

**Changes**:
```python
# OLD: Hotel agent prompt
prompt = "You are a helpful hotel search assistant..."

# NEW: Template agent prompt
prompt = """You are a pitch deck template specialist.
Select the best template based on:
- Industry (fintech, SaaS, healthcare, etc.)
- Complexity (technical vs. simple)
- Formality (investor-facing vs. internal)
"""
```

---

#### 4. `src/agent.py` → Updated Supervisor Agent

**Old**: Coordinates flight and hotel agents
**New**: Coordinates content, template, and export agents

**Changes**:
```python
# OLD: Import travel agents
from .flight import agent as flight_agent
from .hotel import agent as hotel_agent

supervisor_graph = create_supervisor(
    [flight, hotel],
    supervisor_name="supervisor-agent",
    prompt="You specialize in booking trips..."
)

# NEW: Import pitch deck agents
from .content_agent import agent as content_agent
from .template_agent import agent as template_agent
from .export_agent import agent as export_agent

supervisor_graph = create_supervisor(
    [content, template, export],
    supervisor_name="pitch-deck-supervisor",
    prompt="You orchestrate pitch deck creation..."
)
```

---

#### 5. `app-sample/src/app/api/copilotkit/route.ts` → Updated Instructions

**Old**: Travel assistant instructions
**New**: Pitch deck assistant instructions

**Changes**:
```typescript
// OLD
instructions="You are a travel assistant..."

// NEW
instructions="You are a pitch deck creation assistant.
Help users create professional pitch decks through conversation."
```

---

### Benefits of This Conversion Approach

1. **Faster Development**: 3-4 weeks vs. 12-16 weeks from scratch
2. **Lower Risk**: Using proven architecture that already works
3. **Preserved Infrastructure**: CopilotKit integration, Blaxel deployment, error handling all tested
4. **Familiar Codebase**: Team already knows travel copilot structure
5. **Easier Debugging**: Can compare with working travel copilot when issues arise

---

**Document Status**: ✅ Production Ready
**Last Updated**: January 25, 2025
**Next Action**: Begin Phase 1 development (Foundation)
**Owner**: Product & Engineering Team
