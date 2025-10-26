# Product Requirements Document: AI Pitch Deck Wizard

**Version**: 1.0.0  
**Date**: October 24, 2025  
**Status**: Draft  
**Author**: Product Team

---

## 1. Product Overview

### Conversion Strategy: Travel Copilot → Pitch Deck Wizard

**Starting Point**: Blaxel's `template-copilot-kit-py` with working travel copilot functionality

**Conversion Approach**: We will convert the existing travel copilot multi-agent system to a pitch deck generation system by:

1. **Replacing Travel Agents with Pitch Deck Agents**
   - `flight-agent` → `content-agent` (generates slide content)
   - `hotel-agent` → `template-agent` (manages template selection)
   - Add new `export-agent` (handles PPTX generation)

2. **Adapting Endpoints and Responses**
   - Convert `/copilotkit` endpoint to handle pitch deck requests
   - Update GraphQL schemas for agent discovery
   - Modify response formats to return slide data instead of travel options

3. **Preserving Working Infrastructure**
   - Keep FastAPI server structure
   - Maintain CopilotKit integration pattern
   - Retain error handling and validation logic
   - Preserve hot reload development workflow

**Benefits of This Approach**:
- ✅ Proven architecture already working
- ✅ CopilotKit integration tested and functional
- ✅ Multi-agent orchestration pattern established
- ✅ Faster development time (3-4 weeks vs 12-16 weeks from scratch)
- ✅ Lower risk using proven template

---

### AI-Powered Pitch Deck Generation for Startups

The AI Pitch Deck Wizard is a conversational AI-powered application that helps entrepreneurs and startup founders create professional pitch decks through natural language interaction. Built on Blaxel's multi-agent architecture and integrated with CopilotKit, the system transforms the traditionally manual, time-consuming process of creating investor presentations into an intelligent, guided conversation.

The problem this solves is significant: founders spend 20-40 hours creating their first pitch deck, often without design expertise or clear structure. Our solution uses specialized AI agents to generate content, apply professional templates, and produce publication-ready presentations in under 15 minutes. By combining content generation, template management, and presentation export into a unified conversational interface, we reduce the barrier to fundraising and help founders tell their story more effectively.

This project connects to Medellin Spark's larger mission of accelerating Latin American startups by democratizing access to professional tools and resources. The pitch deck wizard serves as a flagship AI feature, demonstrating the platform's commitment to leveraging technology to level the playing field for underrepresented founders.

---

## 2. Goals

### Business Goals

- **Increase User Engagement**: Target 60% weekly active user rate on the pitch deck wizard within 3 months of launch
- **Reduce Churn**: Decrease user abandonment rate from 45% to under 15% during pitch deck creation
- **Platform Differentiation**: Establish AI pitch deck generation as a unique value proposition setting Medellin Spark apart from competitors
- **Revenue Growth**: Achieve $25K monthly recurring revenue from premium pitch deck features within 6 months
- **Market Expansion**: Capture 40% of Latin American startup pitch deck creation market share

### User Goals

- **Time Savings**: Complete pitch deck creation in under 15 minutes (vs. traditional 20-40 hours)
- **Professional Quality**: Generate investor-ready presentations without design skills
- **Iterative Refinement**: Easily update and modify slide content through conversational feedback
- **Template Variety**: Access to multiple professionally designed templates tailored to different industries
- **Export Flexibility**: Download presentations in PPTX format for further customization

### Non-Goals

- **Fully Custom Designs**: We will not support complete custom template creation (users can choose from predefined templates)
- **Real-time Collaboration**: Multi-user editing is out of scope for v1.0
- **Mobile App**: Web application only; native mobile apps deferred to future versions
- **AI Image Generation**: Visual asset creation beyond templates is not included
- **Investment Matchmaking**: Connecting founders with investors is separate functionality
- **Video Presentations**: Focus on slide-based presentations only

---

## 3. User Personas

### Maria – First-Time Founder

**Background**: Maria is a 32-year-old software engineer who developed a SaaS solution for small retail businesses. She has technical expertise but limited business experience and no design background.

**Goals**: Create a compelling pitch deck to raise seed funding from local angel investors. She needs help structuring her story and making it visually appealing.

**Pain Points**: 
- Unfamiliar with pitch deck best practices
- Limited time to learn presentation design
- Uncertainty about what investors want to see
- Budget constraints prevent hiring designers

**How She Uses the Product**: Maria starts with a basic description of her product. The AI asks clarifying questions about her market, competitors, and traction. After 10 minutes of conversation, she receives a complete, professional pitch deck she can present immediately.

**Permissions**: Standard user access with ability to create, edit, and export presentations.

---

### Carlos – Serial Entrepreneur

**Background**: Carlos has started three companies and raised $5M+ in total funding. He understands what makes a good pitch deck but wants to accelerate his process.

**Goals**: Quickly generate multiple pitch deck variations for different investor audiences (angels vs. VCs vs. strategic partners).

**Pain Points**:
- Repetitive work creating similar decks for different purposes
- Customizing existing decks is time-consuming
- Needs to test different narratives and messaging

**How He Uses the Product**: Carlos provides detailed company information upfront. The AI generates a comprehensive deck in 5 minutes. He uses the conversational interface to create alternative versions focusing on different value propositions or target markets.

**Permissions**: Premium user with access to advanced templates, priority generation, and unlimited exports.

---

### Sofia – Startup Accelerator Program Manager

**Background**: Sofia manages a 12-week accelerator program for 20+ startups. She needs to help all founders create professional pitch decks before Demo Day.

**Goals**: Ensure all cohort companies have investor-ready presentations by Week 10 of the program.

**Pain Points**:
- Limited time to coach each founder individually
- Inconsistent quality across presentations
- Multiple founders struggling with the same basics

**How She Uses the Product**: Sofia recommends the AI Pitch Deck Wizard to all cohort founders. She tracks completion rates and presentation quality through dashboard analytics. The tool reduces her coaching load while improving overall program outcomes.

**Permissions**: Organization admin with access to cohort analytics, presentation review, and batch operations.

---

### Role-Based Permissions

| Role | Create | Edit Own | View Others | Export | Analytics | Admin |
|------|--------|----------|-------------|--------|-----------|-------|
| **Standard User** | ✅ | ✅ | ❌ | ✅ (Limited) | ❌ | ❌ |
| **Premium User** | ✅ | ✅ | ❌ | ✅ (Unlimited) | Personal | ❌ |
| **Organization Admin** | ✅ | ✅ | ✅ (Team) | ✅ (Unlimited) | Team + Individual | ✅ |

---

## 4. Functional Requirements

### FR-001: Conversational Pitch Deck Creation (Priority: High)

**Description**: Users interact with an AI assistant through natural language to create pitch decks step-by-step.

**Requirements**:
- AI asks targeted questions about business model, market, competition, traction, and funding needs
- Responses are validated and clarified before proceeding
- Progress tracker shows completion percentage (80% minimum to generate)
- Conversation history is saved and retrievable
- Multi-language support (English, Spanish, Portuguese)

**Acceptance Criteria**:
- User can start conversation without pre-filling forms
- AI adapts questions based on previous answers
- System provides helpful examples when user is stuck
- Conversation can be paused and resumed later
- User can view and edit conversation history

---

### FR-002: Multi-Agent Content Generation (Priority: High)

**Description**: Specialized AI agents work collaboratively to generate pitch deck content.

**Requirements**:
- Supervisor agent orchestrates the workflow
- Content agent generates slide-specific content
- Template agent selects and applies appropriate templates
- Export agent handles PPTX generation
- Agents share context and state throughout the process

**Acceptance Criteria**:
- Content agent generates 8-12 slides per deck
- Template agent matches content to best-fitting template
- Supervisor coordinates all agents without conflicts
- Content is coherent across all slides
- Generation completes in under 30 seconds

---

### FR-003: Template System Integration (Priority: High)

**Description**: System applies professional templates from Presenton.ai template library.

**Requirements**:
- Access to 3+ template families (General, Modern, Standard)
- Template selection based on content analysis
- Real-time template preview
- User can switch templates post-generation
- Schema validation ensures content fits template structure

**Acceptance Criteria**:
- System suggests template based on business type
- User can preview template before applying
- Template change preserves all content
- Schema validation catches incompatible content
- Fallback template available if selection fails

---

### FR-004: Real-Time Slide Preview (Priority: High)

**Description**: Users see slides being generated in real-time during the conversation.

**Requirements**:
- Slides appear in preview panel as they're generated
- Live updates during conversation
- Click to edit individual slides
- Drag to reorder slides
- Responsive preview for mobile and desktop

**Acceptance Criteria**:
- Preview updates within 2 seconds of AI response
- User can interact with slides in preview
- Preview maintains aspect ratio
- Mobile preview is fully functional
- No lag or stuttering during updates

---

### FR-005: PPTX Export (Priority: High)

**Description**: Users can download their pitch deck as an editable PowerPoint file.

**Requirements**:
- Export to PPTX format compatible with PowerPoint, Google Slides, Keynote
- Maintains template styling and formatting
- Includes all slides in order
- Supports high-resolution images
- Adds metadata (title, author, creation date)

**Acceptance Criteria**:
- PPTX opens correctly in Microsoft PowerPoint
- All formatting preserved
- File size under 10MB
- Export completes in under 10 seconds
- Error handling for failed exports

---

### FR-006: Presentation Management Dashboard (Priority: Medium)

**Description**: Users manage all their pitch decks from a centralized dashboard.

**Requirements**:
- List all user's presentations
- Filter by date, status, template
- Search by title or content
- Bulk operations (delete, duplicate, archive)
- Quick actions (edit, view, export, share)

**Acceptance Criteria**:
- Dashboard loads in under 2 seconds
- All presentations visible with thumbnails
- Filters update instantly
- Search finds relevant decks
- Bulk operations work on 50+ items

---

### FR-007: AI-Powered Editing Assistant (Priority: Medium)

**Description**: AI assistant helps users refine and improve existing pitch decks.

**Requirements**:
- Sidebar AI chat on editor page
- Context-aware suggestions based on current slide
- Rewrite suggestions for better clarity
- Grammar and spelling correction
- Tone adjustment (professional, casual, technical)

**Acceptance Criteria**:
- Suggestions appear within 3 seconds
- User can accept or reject each suggestion
- AI understands slide context
- Suggestions improve content quality
- No inappropriate suggestions

---

### FR-008: Multi-Provider AI Fallback (Priority: Medium)

**Description**: System uses multiple AI providers for reliability and cost optimization.

**Requirements**:
- Primary: OpenAI GPT-4
- Fallback: Google Gemini, Anthropic Claude
- Automatic failover on errors
- Cost tracking per provider
- Quality comparison metrics

**Acceptance Criteria**:
- Fallback activates within 5 seconds of primary failure
- User doesn't notice provider change
- System tracks which provider was used
- Cost stays within budget limits
- Quality remains consistent across providers

---

### FR-009: Presentation Analytics (Priority: Low)

**Description**: Users see analytics about their pitch deck usage and performance.

**Requirements**:
- View count for shared presentations
- Time spent editing
- Most viewed slides
- Common feedback themes
- Export history

**Acceptance Criteria**:
- Analytics visible in dashboard
- Data updates in real-time
- Historical data available (30 days)
- Privacy controls for sharing analytics
- Export analytics as CSV

---

### FR-010: Presentation Sharing (Priority: Low)

**Description**: Users can share pitch decks with others via link or email.

**Requirements**:
- Generate shareable link
- Set viewing permissions (view-only, edit, comment)
- Password protection option
- Email sharing with custom message
- Track who viewed shared deck

**Acceptance Criteria**:
- Link works for anyone who has it
- Permissions enforced correctly
- Password protection functional
- Email sends successfully
- View tracking accurate

---

## 5. User Experience

### Entry Points and First-Time Flow

**Entry Point 1: Landing Page**
- User lands on `/pitch-deck` page
- Sees hero section: "Create Your Pitch Deck in 15 Minutes"
- Two CTAs: "Start Free" and "See Examples"
- Social proof: "Join 1,000+ founders who raised $50M+"

**Entry Point 2: Dashboard "Create New"**
- Logged-in user clicks "Create New Pitch Deck" in dashboard
- Modal opens with template selection
- Option to start from scratch or use template

**First-Time User Experience**:
1. User clicks "Start Free" on landing page
2. Modal prompts: "Tell us about your startup in one sentence"
3. AI responds: "Great! I'm excited to help you create your pitch deck. Let's start with your company name..."
4. Progressive disclosure: Each question builds on previous answers
5. Progress bar shows "20% complete" encouraging continuation
6. Example prompts visible: "Not sure what to say? Click for an example"
7. After 80% completion, "Generate Pitch Deck" button appears
8. Generation animation (2-3 seconds)
9. Preview modal shows first 3 slides
10. Redirect to dashboard with full deck

### Core Experience Flow

**Step 1: Discovery Conversation**
```
User: "I'm building a fintech app for small businesses"
AI: "That sounds interesting! What specific problem does your app solve?"
User: "Small businesses struggle with cash flow management"
AI: "Got it. How does your solution work differently from existing tools?"
[... continues with 5-7 more questions]
```

**Step 2: Content Generation**
- AI analyzes responses
- Generates structured content outline
- Creates 8-12 slides with placeholder images
- Applies appropriate template automatically
- Shows preview of first slide

**Step 3: Review and Refinement**
- User sees complete deck in preview
- Can click any slide to edit content
- AI available for rewrite suggestions
- Can switch templates with "Try Different Style" button
- Progress saved automatically

**Step 4: Export and Share**
- User clicks "Export" button
- Selects format (PPTX only in v1.0)
- Downloads file automatically
- Success message: "Your pitch deck is ready!"
- Option to share or create another

### Advanced Features

**Template Customization**:
- Premium users can request custom templates
- Upload company branding (logo, colors)
- AI applies branding consistently across slides
- Template saved for future use

**Multi-Language Support**:
- User can toggle language during conversation
- AI adapts responses to selected language
- Export maintains language setting
- Support for English, Spanish, Portuguese

**Presentation Modes**:
- Standard mode: Full editable deck
- Presentation mode: Speaker notes added
- PDF mode: Optimized for printing
- Mobile mode: Simplified for phone viewing

### UI/UX Design Points

**Visual Hierarchy**:
- Chat interface takes 60% of screen width (desktop)
- Preview panel on right side (40%)
- Slide thumbnails in collapsible sidebar
- Progress indicator always visible

**Mobile Responsiveness**:
- Chat and preview stack vertically on mobile
- Touch-optimized buttons and inputs
- Swipe gestures for slide navigation
- Optimized for portrait orientation

**Accessibility**:
- WCAG 2.1 AA compliance
- Screen reader support for all interactions
- Keyboard navigation throughout
- High contrast mode available
- Focus indicators visible

**Visual Design System**:
- Primary color: Medellin Spark blue (#1E40AF)
- Secondary color: Success green (#10B981)
- Neutral grays for backgrounds
- Clear typography hierarchy (Inter font family)
- Consistent spacing (8px grid system)

---

## 6. Narrative

**User Story**: Maria sits at her kitchen table at 9 PM, exhausted after a full day of coding. Her angel investor meeting is in 48 hours, and she hasn't started her pitch deck. She remembers seeing an ad for Medellin Spark's AI Pitch Deck Wizard. She clicks through, describes her SaaS product in one sentence, and begins chatting with the AI assistant. The conversation feels natural—like talking to a colleague who knows fundraising. Within 12 minutes, she has a complete, professional pitch deck with 10 slides covering her problem, solution, market, traction, and funding ask. She downloads the PPTX, spends 30 minutes adding real screenshots, and goes to bed confident. The next morning, she sends the deck to her investor and gets a positive response—they want to see more detailed financials. Maria opens the wizard again, uses the AI editing assistant to add a financial projection slide, and within 5 minutes has an updated deck ready to send. She closes her $150K seed round two weeks later, and her pitch deck played a crucial role in convincing investors.

---

## 7. Success Metrics

### User-Centric Metrics

- **Completion Rate**: 85% of users who start the wizard complete a pitch deck (industry benchmark: 60%)
- **Time to Deck**: Average time from start to export under 15 minutes (target: 12 minutes)
- **Satisfaction Score**: Net Promoter Score (NPS) above 50 (target: 55)
- **Return Usage**: 40% of users create 2+ pitch decks within 30 days
- **Edit Rate**: 70% of users make at least one edit after initial generation
- **Export Success**: 95% of generation attempts result in successful export

### Business Metrics

- **Monthly Active Users**: 1,000 MAU within 3 months of launch
- **Conversion Rate**: 8% of free users upgrade to premium within 30 days
- **Churn Rate**: Monthly churn under 5% for premium users
- **Customer Acquisition Cost (CAC)**: Under $50 per user
- **Lifetime Value (LTV)**: Over $200 per premium user
- **Monthly Recurring Revenue (MRR)**: $25K within 6 months
- **Feature Adoption**: 60% of users use AI editing assistant

### Technical Metrics

- **System Uptime**: 99.9% availability (target: 99.95%)
- **API Response Time**: Average response under 2 seconds (p95 under 5 seconds)
- **Generation Speed**: Complete deck generation under 30 seconds (p95 under 45 seconds)
- **Export Speed**: PPTX export under 10 seconds (p95 under 15 seconds)
- **Error Rate**: Under 1% of requests result in errors
- **Database Query Performance**: All queries under 100ms (p95 under 200ms)
- **Cost per Generation**: Under $0.25 per pitch deck (including AI costs)

---

## 8. Technical Considerations

### Integration Points

**Blaxel Platform**:
- Deploy multi-agent system to Blaxel cloud infrastructure
- Use Blaxel CLI for local development and hot reload
- Leverage Blaxel's built-in CopilotKit integration
- Access global endpoints for low-latency worldwide

**CopilotKit**:
- Next.js React components for conversational UI
- CopilotSidebar for chat interface
- CopilotRuntime for backend integration
- GraphQL endpoint for agent discovery
- REST API for message handling

**OpenAI API**:
- GPT-4 as primary content generation model
- GPT-3.5-turbo for faster, less critical tasks
- Streaming responses for real-time updates
- Function calling for structured data extraction
- Rate limiting and error handling

**Presenton.ai Templates**:
- Access to template library via API
- Template schema validation with Zod
- Runtime compilation for custom templates
- Template caching for performance
- Version control for template updates

**Supabase Database**:
- PostgreSQL for all application data
- Row-Level Security (RLS) for multi-tenant isolation
- Real-time subscriptions for live updates
- Edge Functions for serverless backend logic
- Storage for presentation files and assets

### Data Storage & Privacy

**Data Architecture**:
- Users table: Authentication and profile data
- Presentations table: Deck metadata and content
- Slides table: Individual slide data (JSON)
- Conversations table: Chat history with AI
- Templates table: Available templates and schemas
- Exports table: Export history and file links

**Privacy & Security**:
- User data encrypted at rest (AES-256)
- API communication via HTTPS/TLS 1.3
- API keys stored in environment variables (never in code)
- Personal data subject to GDPR compliance
- User can request data deletion
- Rate limiting prevents abuse

**Data Retention**:
- Active presentations: Indefinite
- Exported files: 90 days in storage
- Conversation history: 30 days (anonymized after)
- Analytics data: 12 months
- Deleted data: Immediate permanent deletion

### Scalability & Performance

**Caching Strategy**:
- Redis cache for frequently accessed templates
- CDN caching for static assets
- Database query result caching
- AI response caching for common queries
- Template schema caching

**Load Balancing**:
- Blaxel auto-scaling for agent workloads
- Supabase connection pooling
- Multiple regions for global users
- Graceful degradation on high load

**Database Growth**:
- Partition presentations table by date
- Archive old presentations to cold storage
- Index optimization for common queries
- Connection pooling limits
- Query timeout configurations

### Potential Challenges

**AI Hallucination**:
- Risk: AI generates incorrect or misleading information
- Mitigation: Human review prompts, fact-checking integration, user warnings
- Monitoring: Track accuracy via user feedback

**Cost Management**:
- Risk: AI costs spike with heavy usage
- Mitigation: Rate limiting, caching, tiered pricing, cost alerts
- Monitoring: Real-time cost tracking dashboard

**Latency Issues**:
- Risk: Slow AI responses degrade user experience
- Mitigation: Streaming responses, optimized prompts, caching, fallback providers
- Monitoring: Response time tracking and alerts

**Template Compatibility**:
- Risk: Generated content doesn't fit template structure
- Mitigation: Schema validation, content adaptation, fallback templates
- Monitoring: Validation error tracking

**Scalability Bottlenecks**:
- Risk: System slows under high load
- Mitigation: Auto-scaling, queue system, performance testing
- Monitoring: Infrastructure metrics and alerts

---

## 9. Milestones & Sequencing

### Project Size & Duration

**Size**: Large (multi-agent system with complex integrations)  
**Duration**: 12-16 weeks  
**Team Composition**: 
- 1 Product Manager
- 2 Backend Engineers (Python, FastAPI, LangGraph)
- 1 Frontend Engineer (React, TypeScript, Next.js)
- 1 Designer (UI/UX)
- 1 QA Engineer
- 1 DevOps Engineer (part-time)

### Phase 1: Foundation (Weeks 1-4)

**Goal**: Build core multi-agent infrastructure

**Deliverables**:
- Blaxel agent setup and deployment
- Supervisor agent orchestration
- Content generation agent
- Basic conversation flow
- Database schema and migrations
- CopilotKit frontend integration

**Success Criteria**:
- Agent responds to basic pitch deck requests
- Content generation working end-to-end
- Frontend displays generated slides
- Database saves conversations and presentations

**Dependencies**:
- Blaxel CLI installed
- OpenAI API key obtained
- Supabase project configured

---

### Phase 2: Content & Templates (Weeks 5-8)

**Goal**: Enhance content quality and add template system

**Deliverables**:
- Template agent implementation
- Presenton.ai template integration
- Schema validation system
- Multi-slide generation (8-12 slides)
- Content refinement and iteration
- Template preview functionality

**Success Criteria**:
- Generated decks have 8+ professional slides
- Templates apply correctly to content
- Schema validation prevents errors
- User can preview templates before applying

**Dependencies**:
- Phase 1 complete
- Presenton.ai API access
- Template library available

---

### Phase 3: UI/UX Polish (Weeks 9-11)

**Goal**: Complete user experience and interface

**Deliverables**:
- Real-time slide preview
- Conversation UI improvements
- Dashboard integration
- Mobile responsiveness
- Accessibility compliance
- Loading states and animations

**Success Criteria**:
- UI is intuitive and accessible
- Mobile experience is seamless
- Preview updates smoothly
- Dashboard displays all presentations

**Dependencies**:
- Phase 2 complete
- Design system finalized
- QA testing complete

---

### Phase 4: Export & Advanced Features (Weeks 12-14)

**Goal**: Add export functionality and premium features

**Deliverables**:
- PPTX export implementation
- Export agent deployment
- AI editing assistant
- Premium feature gating
- Analytics dashboard
- Presentation sharing

**Success Criteria**:
- PPTX exports work correctly
- AI assistant provides helpful suggestions
- Premium features restricted properly
- Analytics display accurate data

**Dependencies**:
- Phase 3 complete
- PPTX library integrated
- Premium features defined

---

### Phase 5: Testing & Launch (Weeks 15-16)

**Goal**: Finalize product and launch to production

**Deliverables**:
- End-to-end testing complete
- Performance optimization
- Security audit
- Documentation finalized
- Marketing materials
- Launch plan execution

**Success Criteria**:
- All tests passing
- Performance targets met
- Security vulnerabilities addressed
- Team trained on support
- Launch day execution successful

**Dependencies**:
- All previous phases complete
- Beta testing feedback incorporated
- Infrastructure scaled for launch

---

## 10. User Stories

### US-001: Conversational Pitch Deck Creation

**ID**: US-001  
**Priority**: High  
**Story Points**: 8

**Description**: As a first-time founder, I want to create a pitch deck through natural conversation with an AI assistant, so I can focus on my story rather than technical skills.

**Acceptance Criteria**:
- [ ] User can start conversation by describing their startup in one sentence
- [ ] AI asks 5-7 targeted questions about business, market, and traction
- [ ] User can provide answers naturally without strict format requirements
- [ ] Progress bar shows completion percentage (80% minimum to generate)
- [ ] User can pause and resume conversation later
- [ ] Conversation history is saved and retrievable
- [ ] AI adapts questions based on previous answers
- [ ] System provides helpful examples when user is stuck

**Technical Notes**:
- Implement supervisor agent for conversation flow
- Store conversation state in Supabase
- Use OpenAI GPT-4 for natural language understanding
- Implement pause/resume logic with conversation threading

---

### US-002: Multi-Slide Generation

**ID**: US-002  
**Priority**: High  
**Story Points**: 13

**Description**: As a founder, I want the AI to generate 8-12 professional slides automatically, so I have a complete pitch deck ready to use.

**Acceptance Criteria**:
- [ ] System generates minimum 8 slides covering all essential sections
- [ ] Slides include: Cover, Problem, Solution, Market, Business Model, Traction, Team, Ask
- [ ] Content is coherent and builds a narrative across slides
- [ ] Each slide has appropriate content length (not too long, not too short)
- [ ] Slides are logically ordered
- [ ] Generation completes in under 30 seconds
- [ ] User can see progress during generation
- [ ] Error handling if generation fails

**Technical Notes**:
- Content agent generates individual slides
- Supervisor agent ensures narrative coherence
- Parallel generation where possible for speed
- Implement retry logic for failed generations

---

### US-003: Template Application

**ID**: US-003  
**Priority**: High  
**Story Points**: 8

**Description**: As a founder, I want my content automatically formatted with a professional template, so my pitch deck looks polished and investor-ready.

**Acceptance Criteria**:
- [ ] System automatically selects best template based on content analysis
- [ ] User can preview template before applying
- [ ] Template applied within 5 seconds
- [ ] All content fits template structure (no overflow)
- [ ] Template maintains professional styling
- [ ] User can switch to different template after generation
- [ ] Template change preserves all content
- [ ] Schema validation prevents incompatible content

**Technical Notes**:
- Template agent analyzes content and matches template
- Integrate with Presenton.ai template library
- Implement Zod schema validation
- Cache template schemas for performance

---

### US-004: Real-Time Preview

**ID**: US-004  
**Priority**: High  
**Story Points**: 5

**Description**: As a founder, I want to see my slides being generated in real-time, so I know my pitch deck is coming together.

**Acceptance Criteria**:
- [ ] Preview panel shows slides as they're generated
- [ ] Updates appear within 2 seconds of generation
- [ ] User can click slide to view full size
- [ ] Thumbnail navigation works smoothly
- [ ] Preview updates without page refresh
- [ ] Mobile preview is functional
- [ ] Preview maintains aspect ratio
- [ ] Loading states shown during generation

**Technical Notes**:
- Implement WebSocket or Server-Sent Events for real-time updates
- Optimize image rendering for performance
- Use React state management for live updates
- Implement virtual scrolling for large decks

---

### US-005: PPTX Export

**ID**: US-005  
**Priority**: High  
**Story Points**: 8

**Description**: As a founder, I want to download my pitch deck as a PowerPoint file, so I can edit it further and present to investors.

**Acceptance Criteria**:
- [ ] User can click "Export" button to download PPTX
- [ ] Export completes in under 10 seconds
- [ ] PPTX file opens correctly in Microsoft PowerPoint
- [ ] All slides included in correct order
- [ ] Template styling preserved
- [ ] File size under 10MB
- [ ] User sees download progress indicator
- [ ] Error handling if export fails

**Technical Notes**:
- Use python-pptx library for PPTX generation
- Export agent handles file creation
- Implement async export for performance
- Store exported files in Supabase Storage
- Provide download link for 7 days

---

### US-006: AI Editing Assistant

**ID**: US-006  
**Priority**: Medium  
**Story Points**: 5

**Description**: As a founder, I want an AI assistant to help me improve my pitch deck content, so I can refine my messaging without starting over.

**Acceptance Criteria**:
- [ ] User can access AI assistant from editor page
- [ ] AI provides suggestions based on current slide
- [ ] User can accept or reject suggestions
- [ ] Suggestions appear within 3 seconds
- [ ] AI understands slide context
- [ ] Suggestions improve content quality
- [ ] User can request specific changes ("make it more technical")
- [ ] AI does not generate inappropriate content

**Technical Notes**:
- Implement CopilotKit sidebar in editor
- Pass slide context to AI agent
- Use GPT-4 for high-quality suggestions
- Implement suggestion caching to reduce API calls

---

### US-007: Dashboard Management

**ID**: US-007  
**Priority**: Medium  
**Story Points**: 5

**Description**: As a founder, I want to see all my pitch decks in one place, so I can easily manage multiple presentations.

**Acceptance Criteria**:
- [ ] Dashboard shows list of all user's presentations
- [ ] Each presentation shows thumbnail and metadata
- [ ] User can filter by date, status, template
- [ ] User can search by title or content
- [ ] Quick actions available (edit, view, export, delete)
- [ ] Dashboard loads in under 2 seconds
- [ ] Supports pagination for large lists
- [ ] Bulk operations work correctly

**Technical Notes**:
- Integrate with existing dashboard route
- Implement efficient database queries
- Use React Query for caching
- Implement optimistic updates

---

### US-008: Presentation Sharing

**ID**: US-008  
**Priority**: Low  
**Story Points**: 3

**Description**: As a founder, I want to share my pitch deck with investors via link, so they can view it without creating an account.

**Acceptance Criteria**:
- [ ] User can generate shareable link
- [ ] Link works for anyone who has it
- [ ] User can set permissions (view-only, edit, comment)
- [ ] Password protection option available
- [ ] User can revoke sharing access
- [ ] Track who viewed shared deck
- [ ] Email sharing with custom message
- [ ] Link expires after set duration

**Technical Notes**:
- Use Supabase Storage for shared files
- Implement access control logic
- Generate unique shareable tokens
- Track views in analytics table

---

## 11. Conversion Plan: Travel Copilot → Pitch Deck Wizard

### Overview

This section provides detailed steps to convert the working `template-copilot-kit-py` travel copilot into a pitch deck generation system.

### Current Travel Copilot Structure

```
template-copilot-kit-py/
├── travel_copilot.py          # Main FastAPI app with CopilotKit endpoints
├── src/
│   ├── flight.py              # Flight search agent
│   ├── hotel.py               # Hotel search agent
│   └── agent.py               # Supervisor agent
└── app-sample/                # CopilotKit frontend
    └── src/app/api/copilotkit/route.ts
```

### Conversion Steps

#### Step 1: Rename and Restructure Files

**Backup Travel Version**:
```bash
cd template-copilot-kit-py
cp travel_copilot.py travel_copilot_backup.py
cp -r src src_travel_backup
```

**Create Pitch Deck Structure**:
```bash
# Rename main file
mv travel_copilot.py pitch_deck_copilot.py

# Create new agent files
touch src/content_agent.py
touch src/template_agent.py
touch src/export_agent.py
```

---

#### Step 2: Update Pitch Deck Copilot (`pitch_deck_copilot.py`)

**Replace Travel-Specific Code**:

```python
# OLD: Travel-related classes
class TravelRequest(BaseModel):
    inputs: str

class TravelResponse(BaseModel):
    outputs: str
    status: str
    agent_type: str

# NEW: Pitch deck classes
class PitchDeckRequest(BaseModel):
    inputs: str
    conversation_id: str = None
    slide_count: int = 8

class PitchDeckResponse(BaseModel):
    outputs: str
    slides: list[dict] = []
    status: str
    agent_type: str
    completeness: int = 0
```

**Update Endpoint Logic**:

```python
# OLD: Travel request handling
async def handle_travel_request(request: TravelRequest):
    if "flight" in request.inputs.lower():
        return await handle_flight_request(request.inputs)
    elif "hotel" in request.inputs.lower():
        return await handle_hotel_request(request.inputs)

# NEW: Pitch deck request handling
async def handle_pitch_deck_request(request: PitchDeckRequest):
    user_input = request.inputs.lower()
    
    # Content generation
    if any(word in user_input for word in ["generate", "create", "make", "build"]):
        return await handle_content_generation(request.inputs)
    
    # Template selection
    elif any(word in user_input for word in ["template", "style", "design", "format"]):
        return await handle_template_selection(request.inputs)
    
    # Export functionality
    elif any(word in user_input for word in ["export", "download", "save", "ppt"]):
        return await handle_export_request(request.inputs)
    
    # General pitch deck assistance
    else:
        return PitchDeckResponse(
            outputs="I'm your pitch deck assistant! I can help you:\n• Generate compelling slide content\n• Apply professional templates\n• Export your presentation\n\nWhat would you like to do?",
            status="success",
            agent_type="pitch-deck-assistant"
        )
```

**Update CopilotKit Info Endpoint**:

```python
@app.post("/copilotkit/info")
async def copilotkit_info():
    return {
        "name": "Pitch Deck Generator Agent",
        "description": "AI-powered assistant for creating professional pitch decks",
        "version": "1.0.0",
        "capabilities": [
            "Content generation for pitch decks",
            "Template selection and application",
            "PPTX export functionality"
        ],
        "status": "active"
    }
```

---

#### Step 3: Create Content Agent (`src/content_agent.py`)

**Replace Flight Agent Logic**:

```python
# OLD: flight.py
async def agent():
    prompt = "You are an expert flight search assistant..."
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")
    return create_react_agent(
        name="flight-agent",
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=MemorySaver(),
    )

# NEW: content_agent.py
async def agent():
    prompt = """You are an expert pitch deck content creator specializing in creating 
compelling investor presentations.

Your primary responsibilities:
1. Generate structured content for pitch deck slides
2. Ask clarifying questions about the business, market, and traction
3. Create content for 8-12 essential slides:
   - Cover slide (company name, tagline)
   - Problem statement
   - Solution overview
   - Market opportunity
   - Business model
   - Traction & milestones
   - Team
   - Financial projections
   - Funding ask

When generating content:
- Make it concise and investor-focused
- Use data and specifics where available
- Create compelling narratives
- Maintain consistency across slides

Output format:
Provide structured slide content as JSON with title, content, and key points."""

    model = await bl_model("sandbox-openai")
    return create_react_agent(
        name="content-agent",
        model=model,
        tools=[],  # No external tools needed initially
        prompt=prompt,
        checkpointer=MemorySaver(),
    )
```

---

#### Step 4: Create Template Agent (`src/template_agent.py`)

**Replace Hotel Agent Logic**:

```python
# OLD: hotel.py
async def agent():
    prompt = "You are a helpful assistant..."
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")
    return create_react_agent(
        name="hotel-agent",
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=MemorySaver(),
    )

# NEW: template_agent.py
async def agent():
    prompt = """You are a pitch deck template specialist.

Your responsibilities:
1. Select the best template based on content analysis
2. Apply template to generated slides
3. Validate content fits template schema
4. Suggest template changes when needed

Available templates:
- General Business: Standard presentation format
- Modern Startup: Contemporary design for tech startups
- Financial Focus: Template optimized for financial data

When selecting templates:
- Match template style to business type
- Ensure content fits schema requirements
- Optimize for visual impact"""

    model = await bl_model("sandbox-openai")
    return create_react_agent(
        name="template-agent",
        model=model,
        tools=[],
        prompt=prompt,
        checkpointer=MemorySaver(),
    )
```

---

#### Step 5: Create Export Agent (`src/export_agent.py`)

**New File - PPTX Generation**:

```python
async def agent():
    prompt = """You are a presentation export specialist.

Your responsibilities:
1. Convert slides to PPTX format
2. Apply template styling consistently
3. Ensure formatting is preserved
4. Generate downloadable files

Requirements:
- Maintain all text formatting
- Preserve images and charts
- Keep template branding
- Optimize file size under 10MB"""

    model = await bl_model("sandbox-openai")
    return create_react_agent(
        name="export-agent",
        model=model,
        tools=[],
        prompt=prompt,
        checkpointer=MemorySaver(),
    )
```

---

#### Step 6: Update Supervisor Agent (`src/agent.py`)

**Replace Agent Imports**:

```python
# OLD: Travel agents
from .flight import agent as flight_agent
from .hotel import agent as hotel_agent

supervisor_graph = create_supervisor(
    [flight, hotel],
    model=model,
    supervisor_name="supervisor-agent",
    prompt="""You are a supervisor agent that can delegate tasks to other agents.
    You specialize in booking trips. You have access to these agents:
    - flight-agent: Search and book flights
    - hotel-agent: Search and book hotels"""
)

# NEW: Pitch deck agents
from .content_agent import agent as content_agent
from .template_agent import agent as template_agent
from .export_agent import agent as export_agent

supervisor_graph = create_supervisor(
    [content, template, export],
    model=model,
    supervisor_name="pitch-deck-supervisor",
    prompt="""You are a pitch deck generation supervisor. You orchestrate multiple 
    agents to create professional pitch decks:
    
    - content-agent: Generates compelling slide content using AI
    - template-agent: Selects and applies appropriate presentation templates
    - export-agent: Converts slides to PPTX/PDF format
    
    Workflow:
    1. Understand user's pitch deck requirements
    2. Generate content with content-agent
    3. Apply template with template-agent
    4. Export presentation with export-agent
    
    Guide the user through each step and ask clarifying questions when needed."""
)
```

---

#### Step 7: Update Frontend Route (`app-sample/src/app/api/copilotkit/route.ts`)

**Update Endpoint URL**:

```typescript
// OLD: Travel endpoint
const runtime = new CopilotRuntime({
  remoteEndpoints: [
    {
      url: "http://localhost:1338/copilotkit",
      onBeforeRequest: () => ({
        headers: { "Content-Type": "application/json" }
      })
    }
  ]
});

// NEW: Pitch deck endpoint (same URL, different backend)
const runtime = new CopilotRuntime({
  remoteEndpoints: [
    {
      url: "http://localhost:1338/copilotkit",  // Same port, different agent
      onBeforeRequest: () => ({
        headers: { "Content-Type": "application/json" }
      })
    }
  ]
});
```

**Update AI Instructions**:

```typescript
// OLD: Travel instructions
instructions="You are a travel assistant..."

// NEW: Pitch deck instructions
instructions="You are a pitch deck creation assistant. Help users create 
professional pitch decks through conversation. Guide them through:
1. Understanding their business/startup
2. Selecting the right template
3. Generating compelling content
4. Exporting the final presentation

Always ask clarifying questions before generating content."
```

---

#### Step 8: Testing Checklist

**Functional Testing**:
- [ ] Start pitch deck agent: `python pitch_deck_copilot.py`
- [ ] Agent responds on port 1338
- [ ] CopilotKit frontend connects successfully
- [ ] User can start conversation
- [ ] Content agent generates slides
- [ ] Template agent applies template
- [ ] Export agent creates PPTX
- [ ] All agents coordinate via supervisor

**Integration Testing**:
- [ ] CopilotKit endpoint returns correct format
- [ ] GraphQL queries work for agent discovery
- [ ] REST messages handled correctly
- [ ] Error handling works
- [ ] Hot reload functions properly

**End-to-End Testing**:
- [ ] User creates pitch deck through conversation
- [ ] Slides generate correctly
- [ ] Template applies successfully
- [ ] PPTX exports without errors
- [ ] File downloads and opens correctly

---

### Conversion Timeline

**Week 1: Setup and Core Agents**
- Day 1-2: Backup travel version, create new file structure
- Day 3-4: Create content agent (replace flight agent)
- Day 5: Create template agent (replace hotel agent)

**Week 2: Export and Integration**
- Day 1-2: Create export agent
- Day 3-4: Update supervisor agent
- Day 5: Update CopilotKit endpoints

**Week 3: Frontend and Testing**
- Day 1-2: Update frontend instructions and UI
- Day 3-4: End-to-end testing
- Day 5: Bug fixes and polish

**Week 4: Deployment**
- Day 1-2: Deploy to Blaxel platform
- Day 3-4: Production testing
- Day 5: Launch

---

### Risk Mitigation

**Risk**: Travel functionality lost during conversion
- **Mitigation**: Complete backup before starting
- **Rollback**: Restore from `travel_copilot_backup.py`

**Risk**: CopilotKit integration breaks
- **Mitigation**: Test after each step, keep endpoint structure identical
- **Rollback**: Revert to travel_copilot.py endpoints

**Risk**: Agent coordination fails
- **Mitigation**: Use existing supervisor pattern, test incrementally
- **Rollback**: Return to working supervisor configuration

---

**Document Status**: ✅ Complete  
**Next Steps**: Begin conversion implementation (Week 1, Day 1)  
**Version**: 1.0.0  
**Last Updated**: October 24, 2025

