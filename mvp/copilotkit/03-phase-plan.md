---
version: 1.1
created: 2025-10-21
lastUpdated: 2025-10-21
owner: Development Team
status: Production Ready
---

# CopilotKit LangGraph Implementation - 3-Phase Plan

**Date**: October 21, 2025  
**Purpose**: Detailed implementation roadmap for AI Pitch Deck Generator  
**Timeline**: 12-16 weeks total (MVP in 6-8 weeks)

---

## Phase Overview

| Phase | Duration | Goal | Features | Outcome |
|-------|----------|------|----------|---------|
| **Phase 1 - Core MVP** | 6-8 weeks | Working conversational deck builder | 11 core features | Founders can create basic decks via chat |
| **Phase 2 - UX Enhancement** | 4-6 weeks | Professional user experience | 6 advanced features | Live previews, smooth editing, progress tracking |
| **Phase 3 - Scale & Automation** | 4-6 weeks | Enterprise-grade features | 4 advanced features | Multi-agent, cost optimization, analytics |

**Total**: 14-20 weeks (3.5-5 months)

**[Source: Implementation patterns from CopilotKit documentation](https://github.com/CopilotKit/with-langgraph-python)**

---

## Phase 1: Core MVP (Weeks 1-8)

### Goal
**Build functional AI pitch deck generator** where founders can:
- Chat with AI to provide company information
- Have AI generate a 10-slide outline
- Approve/reject outline before generation
- Generate complete pitch deck
- Save progress and resume later

---

### Week 1-2: Foundation Setup

**Tasks**:
1. **Project Setup** (3 days)
   - Clone CopilotKit starter: `git clone https://github.com/CopilotKit/with-langgraph-python`
   - Install dependencies: React, LangGraph, Supabase client
   - Configure environment variables
   - Set up Supabase project (PostgreSQL)

2. **CopilotKit Integration** (3 days)
   - Add CopilotKit provider to React app
   - Configure agent endpoint
   - Test basic chat UI
   - Verify OpenAI API connectivity

3. **Database Schema** (2 days)
   - Create tables: `pitch_conversations`, `pitch_decks`, `slides`
   - Enable RLS policies (user isolation)
   - Add indexes for performance
   - Set up checkpointer table

4. **Authentication** (2 days)
   - Integrate Supabase Auth
   - Add JWT validation to agent
   - Test user isolation

**Deliverables**:
- ✅ Running dev environment
- ✅ CopilotKit chat interface
- ✅ Database schema deployed
- ✅ Auth working

**[Source: Quick start setup from CopilotKit template](https://github.com/CopilotKit/with-langgraph-python)**

---

### Week 3-4: Core Agent Logic

**Tasks**:
1. **Define Agent State** (2 days)
```python
from copilotkit import CopilotKitState

class PitchDeckState(CopilotKitState):
    company_name: str = ""
    problem: str = ""
    solution: str = ""
    market_size: str = ""
    business_model: str = ""
    traction: str = ""
    team: str = ""
    ask: str = ""
    completeness: int = 0
    outline: list = []
    status: str = "collecting"
```

2. **Information Collection Node** (3 days)
   - Implement GPT-4 prompts for data extraction
   - Track completeness (0-100%)
   - Validate required fields
   - Handle follow-up questions

3. **Outline Generation Node** (3 days)
   - Generate 10-slide structure
   - Create slide titles and bullet points
   - Format as JSON
   - Return to frontend

4. **LangGraph Workflow** (2 days)
```python
graph = StateGraph(PitchDeckState)
graph.add_node("collect_info", collect_info_node)
graph.add_node("generate_outline", generate_outline_node)
graph.add_edge("collect_info", "generate_outline")
graph.set_entry_point("collect_info")
```

**Deliverables**:
- ✅ AI collects company information
- ✅ Completeness tracking works
- ✅ Outline generation functional

**[Source: LangGraph agent patterns](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt)**

---

### Week 5-6: Shared State & HITL

**Tasks**:
1. **Frontend State Management** (2 days)
```typescript
const { state, setState } = useCoAgent<PitchDeckState>({
  name: "pitch_deck_agent",
  initialState: {
    completeness: 0,
    status: "collecting"
  }
});
```

2. **Progress Tracking UI** (2 days)
   - Add progress bar (0-100%)
   - Show completeness indicator
   - Display current stage

3. **Human-in-the-Loop Approval** (4 days)
```typescript
useCopilotAction({
  name: "presentOutline",
  renderAndWaitForResponse: ({ args, respond, status }) => {
    return (
      <OutlineApproval
        outline={args.slides}
        onApprove={() => respond({ approved: true })}
        onReject={() => respond({ approved: false })}
      />
    );
  }
});
```

4. **Approval Logic in Agent** (2 days)
   - Pause at outline step
   - Wait for user response
   - Continue or regenerate based on response

**Deliverables**:
- ✅ Progress bar updates in real-time
- ✅ Founder can approve/reject outline
- ✅ Agent responds to approval/rejection

**[Source: HITL patterns with renderAndWaitForResponse](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt)**

---

### Week 7-8: Persistence & Slide Generation

**Tasks**:
1. **Checkpoint Configuration** (2 days)
```python
from langgraph.checkpoint.postgres import PostgresSaver

checkpointer = PostgresSaver.from_conn_string(
    "postgresql://user:pass@host:port/db"
)
graph = graph.compile(checkpointer=checkpointer)
```

2. **Message Persistence** (2 days)
   - Save chat history to Supabase
   - Load previous messages on resume
   - Handle thread IDs correctly

3. **Slide Generation Node** (4 days)
   - Generate content for each slide
   - Use GPT-4 for high-quality copy
   - Format as structured JSON
   - Save to `pitch_decks` table

4. **Exit & Completion** (2 days)
   - Show "Deck Complete" message
   - Provide download link
   - End agent conversation gracefully

**Deliverables**:
- ✅ Conversations persist across refreshes
- ✅ Resume from last checkpoint
- ✅ Complete 10-slide deck generated
- ✅ Deck saved to database

**[Source: Persistence patterns](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit)**

---

### Phase 1 Success Criteria (Measurable KPIs)

**Functional** (All must pass):
- [ ] Founder completes deck creation in <5 minutes end-to-end
- [ ] AI asks 8-12 intelligent questions (no more, no less)
- [ ] Progress tracked accurately (0% → 100%, updates every message)
- [ ] Outline generated in <10 seconds
- [ ] HITL approval UI renders in <1 second
- [ ] 10 slides generated with content (no missing/duplicate slides)
- [ ] Deck saved to database (100% success rate, 0 data loss)
- [ ] Session persists across 100 browser refreshes (>99% success rate)
- [ ] Multiple founders isolated (0 auth bypass attempts succeed, RLS 100% effective)

**Technical** (All must pass):
- [ ] TypeScript compiles with 0 errors, 0 warnings
- [ ] Agent runs 100 conversations without crashes (99.9% uptime)
- [ ] PostgreSQL checkpoints save in <2s, recover in <3s
- [ ] Auth tokens validated (0 unauthorized requests succeed)
- [ ] API response times < 3s (p95), < 5s (p99)
- [ ] State sync latency < 500ms (real-time feel)
- [ ] Token usage < 10K per deck ($0.50 cost limit)

**Business** (Metrics to track):
- [ ] Demo-ready: 5/5 investor demos successful
- [ ] Beta users: 10-20 onboarded, 80%+ complete first deck
- [ ] Feedback: 7/10 users rate experience as "good" or "excellent"
- [ ] Completion rate: >70% of users who start finish deck
- [ ] Error rate: <5% of sessions encounter blocking errors

---

## Phase 2: UX Enhancement (Weeks 9-14)

### Goal
**Professional user experience** with:
- Live slide previews
- Smooth editing interactions
- Rich formatting (markdown)
- Intuitive navigation
- Real-time progress feedback

---

### Week 9-10: Generative UI & Previews

**Tasks**:
1. **Slide Preview Component** (3 days)
   - Build React component for slide display
   - Support all slide types (title, bullet, chart)
   - Responsive design (mobile + desktop)

2. **Generative UI Integration** (3 days)
```typescript
useCoAgentStateRender({
  name: "pitch_deck_agent",
  render: ({ state }) => {
    if (state.current_slide) {
      return <SlidePreview slide={state.current_slide} />;
    }
  }
});
```

3. **Real-Time Updates** (2 days)
   - Stream state changes from agent
   - Update preview without full reload
   - Handle partial slide data

4. **Loading States** (2 days)
   - Skeleton loaders
   - Progress spinners
   - Smooth transitions

**Deliverables**:
- ✅ Live slide preview renders
- ✅ Updates in real-time as AI generates
- ✅ Professional loading experience

**[Source: Generative UI patterns](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt)**

---

### Week 11-12: Frontend Actions & Editing

**Tasks**:
1. **Slide Edit Actions** (4 days)
```typescript
useCopilotAction({
  name: "updateSlide",
  parameters: [
    { name: "slideNumber", type: "number" },
    { name: "content", type: "object" }
  ],
  handler: async ({ slideNumber, content }) => {
    await supabase
      .from('slides')
      .update({ content })
      .match({ deck_id: currentDeck.id, slide_number: slideNumber });
  }
});
```

2. **Export Actions** (3 days)
   - PDF export (using jsPDF or Puppeteer)
   - PPTX export (using PptxGenJS)
   - Trigger from chat or button

3. **Theme Selection** (3 days)
   - Define 5 default themes
   - Allow custom color selection
   - Apply theme to all slides

**Deliverables**:
- ✅ Founders can edit individual slides
- ✅ PDF/PPTX export working
- ✅ Theme customization functional

**[Source: Frontend actions](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt)**

---

### Week 13-14: Polish & Refinement

**Tasks**:
1. **Markdown Rendering** (2 days)
   - Add markdown support to AI responses
   - Format slide content (bold, italics, lists)

2. **Message History UI** (2 days)
   - Show previous conversations
   - "Resume deck" button
   - Delete conversation option

3. **Error Handling** (2 days)
   - Graceful API failure handling
   - Retry logic
   - User-friendly error messages

4. **Performance Optimization** (2 days)
   - Reduce API call latency
   - Optimize React re-renders
   - Cache slide previews

5. **User Testing** (2 days)
   - 10 beta user sessions
   - Collect feedback
   - Identify pain points

**Deliverables**:
- ✅ Rich text formatting
- ✅ Conversation history management
- ✅ Robust error handling
- ✅ Fast, smooth UX
- ✅ Beta feedback collected

---

### Phase 2 Success Criteria

**UX**:
- [ ] Slide previews look professional
- [ ] Editing feels intuitive
- [ ] Export generates usable PDFs
- [ ] Theme changes apply instantly
- [ ] No confusing error states

**Performance**:
- [ ] Page load < 2s
- [ ] Slide preview renders < 500ms
- [ ] Export completes < 5s

**User Feedback**:
- [ ] 8/10 users complete deck creation
- [ ] 7/10 users rate UX as "good" or "excellent"
- [ ] < 5 critical bugs reported

---

## Phase 3: Scale & Automation (Weeks 15-20)

### Goal
**Enterprise-grade features** including:
- Multi-agent content + design optimization
- Cost optimization (model selection)
- Advanced analytics
- Team collaboration (future)

---

### Week 15-16: Multi-Agent Architecture

**Tasks**:
1. **Content Writing Agent** (3 days)
```python
def content_agent_node(state):
    # Specialized GPT-4 for compelling copy
    model = ChatOpenAI(model="gpt-4")
    content = generate_slide_content(state, model)
    return {"content_draft": content}
```

2. **Design Optimization Agent** (3 days)
```python
def design_agent_node(state):
    # Optimize layout, spacing, hierarchy
    design = optimize_visual_design(state.content_draft)
    return {"final_slides": design}
```

3. **Agent Coordination** (4 days)
   - Define handoff logic
   - Manage shared state between agents
   - Handle agent failures

**Deliverables**:
- ✅ Content and design split into separate agents
- ✅ Coordinated workflow produces better output
- ✅ Fallback to single-agent if needed

**[Source: Multi-agent patterns](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit)**

---

### Week 17-18: Cost Optimization & Runtime Config

**Tasks**:
1. **Dynamic Model Selection** (3 days)
```python
config = copilotkit_customize_config(
    config,
    model="gpt-4" if user.is_pro else "gpt-3.5-turbo"
)
```

2. **Token Tracking** (2 days)
   - Log API usage per user
   - Display token consumption
   - Alert on excessive usage

3. **Caching Strategy** (2 days)
   - Cache slide templates
   - Cache AI responses for common questions
   - Reduce redundant API calls

4. **Analytics Dashboard** (3 days)
   - Track conversion funnel
   - Measure completion rates
   - Monitor API costs

**Deliverables**:
- ✅ Free users use GPT-3.5, Pro users use GPT-4
- ✅ Token usage tracked and displayed
- ✅ Cost per deck calculated
- ✅ Analytics dashboard functional

**[Source: Runtime configuration](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt)**

---

### Week 19-20: Custom UI & Enterprise Features

**Tasks**:
1. **Custom Theme Builder** (4 days)
   - Visual theme editor
   - Upload custom logo
   - Define brand colors, fonts
   - Save as reusable template

2. **Team Collaboration (Basic)** (3 days)
   - Share deck link
   - View-only mode for team members
   - Comment system (basic)

3. **Advanced Export Options** (3 days)
   - Google Slides format
   - Keynote format
   - Branded cover pages

**Deliverables**:
- ✅ Custom theme builder functional
- ✅ Basic team sharing works
- ✅ Multiple export formats supported

---

### Phase 3 Success Criteria

**Advanced Features**:
- [ ] Multi-agent produces noticeably better decks
- [ ] Cost per deck < $0.50 (with optimization)
- [ ] Pro users can customize themes fully
- [ ] Team members can view shared decks

**Business Metrics**:
- [ ] Free → Pro conversion rate > 5%
- [ ] Pro users create 3+ decks/month
- [ ] Churn rate < 10%

---

## Resource Requirements

### Team Composition

**Phase 1 (MVP)**:
- 1 Full-Stack Developer (React + Python)
- 1 Backend Engineer (LangGraph + Supabase)
- 0.5 Designer (part-time, UI components)

**Phase 2 (Enhancement)**:
- Same team + 0.5 QA Engineer (testing)

**Phase 3 (Advanced)**:
- Add 1 ML Engineer (multi-agent optimization)
- Add 1 DevOps Engineer (production deployment)

---

### Technology Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend** | React + TypeScript + Vite | UI framework |
| **AI Framework** | CopilotKit + LangGraph | Agent orchestration |
| **Backend** | Python + FastAPI | Agent server |
| **Database** | Supabase PostgreSQL | Data + auth + checkpoints |
| **AI Models** | OpenAI GPT-4 / GPT-3.5 | Content generation |
| **Export** | jsPDF + PptxGenJS | PDF/PPTX creation |
| **Deployment** | Vercel (frontend) + Railway (agent) | Hosting |

---

## Risk Mitigation

### Technical Risks

| Risk | Mitigation | Phase |
|------|-----------|-------|
| **State sync issues** | Thorough testing of useCoAgent, TypeScript types | Phase 1 |
| **Checkpoint failures** | Implement retry logic, fallback to stateless mode | Phase 1 |
| **HITL UI complexity** | Start with simple approve/reject, iterate | Phase 1 |
| **Multi-agent coordination** | Build single-agent first, add multi-agent later | Phase 3 |
| **API rate limits** | Implement caching, batch requests | Phase 2 |

---

### Business Risks

| Risk | Mitigation | Phase |
|------|-----------|-------|
| **Low completion rates** | User testing, UX improvements | Phase 2 |
| **High API costs** | Model optimization, caching | Phase 3 |
| **Slow user adoption** | Beta program, referral incentives | Phase 1-2 |

---

## Timeline Summary

### Optimistic (Best Case)
- Phase 1: 6 weeks
- Phase 2: 4 weeks
- Phase 3: 4 weeks
- **Total**: 14 weeks (3.5 months)

### Realistic (Expected)
- Phase 1: 7 weeks
- Phase 2: 5 weeks
- Phase 3: 5 weeks
- **Total**: 17 weeks (4.25 months)

### Conservative (Worst Case)
- Phase 1: 8 weeks
- Phase 2: 6 weeks
- Phase 3: 6 weeks
- **Total**: 20 weeks (5 months)

---

## Checkpoint Milestones

### Milestone 1 (End of Week 8)
**Demo**: Founders can create basic pitch decks via chat  
**Decision**: Proceed to Phase 2 or iterate on core features?

### Milestone 2 (End of Week 14)
**Demo**: Professional UX with live previews and editing  
**Decision**: Proceed to Phase 3 or launch MVP?

### Milestone 3 (End of Week 20)
**Demo**: Enterprise features, multi-agent, cost optimization  
**Decision**: Launch full product or add more features?

---

## Next Steps After Each Phase

### After Phase 1
1. Beta test with 10-20 founders
2. Collect feedback on core workflow
3. Measure completion rate
4. Identify top 3 pain points
5. Decide: iterate or proceed?

### After Phase 2
1. Expand beta to 50-100 users
2. Monitor conversion funnel
3. Calculate cost per deck
4. Gather UX feedback
5. Decide: launch or add Phase 3 features?

### After Phase 3
1. Public launch
2. Implement pricing tiers
3. Monitor retention and churn
4. Scale infrastructure
5. Plan roadmap for next quarter

---

**Created**: October 21, 2025  
**Status**: ✅ Complete implementation roadmap  
**Next**: See `04-stakeholder-packs.md` for stakeholder benefits  
**Estimated Build Time**: 14-20 weeks (3.5-5 months)

---

## Navigation

**Previous**: [02-features-table.md](./02-features-table.md) - Feature Analysis  
**Next**: [04-stakeholder-packs.md](./04-stakeholder-packs.md) - Stakeholder Benefits  
**Index**: [00-INDEX.md](./00-INDEX.md)

---

*This phase plan breaks down CopilotKit + LangGraph implementation into 3 actionable phases with weekly tasks, deliverables, and measurable success criteria.*


