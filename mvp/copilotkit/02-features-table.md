---
version: 1.1
created: 2025-10-21
lastUpdated: 2025-10-21
owner: Development Team
status: Production Ready
---

# CopilotKit LangGraph Features - Pitch Deck Generator Mapping

**Date**: October 21, 2025  
**Purpose**: Comprehensive feature analysis mapped to pitch deck workflows  
**Format**: Detailed table with 10 columns per feature (added Dependencies)

---

## Feature Matrix

**Complexity Scale**: 1=Low, 2=Medium, 3=High, 4=Very High, 5=Extreme  
**Priority Scale**: P0=Critical (MVP blocker), P1=High (Launch), P2=Medium (Enhancement), P3=Low (Future)

| Feature | Core/Advanced | Use Case in Deck Builder | Real Example | Stakeholder | Tools Needed | Complexity (1-5) | Priority | Depends On | Source |
|---------|---------------|--------------------------|---------------|-------------|--------------|------------|----------|--------|
| **Shared State (useCoAgent)** | Core | Preserve founder data across entire conversation | Founder enters "Company: TechCorp" → AI remembers for all slides | Founder, Developer | LangGraph, React, Supabase | 2 | P0 - Critical | CopilotKit Config, Auth | [docs/shared-state](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Readable Context (useCopilotReadable)** | Core | Make current deck data available to AI | AI can read existing slides to avoid duplication | Founder, AI Agent | React hooks | 1 | P0 - Critical | Shared State | [docs/useCopilotReadable](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Human-in-the-Loop (useCopilotAction)** | Core | Founder approves outline before generation | AI presents 10-slide outline → Founder clicks "Approve" or "Revise" | Founder | LangGraph interrupts, React | 3 | P0 - Critical | Shared State, Node Flow | [docs/human-in-the-loop](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Generative UI (useCoAgentStateRender)** | Advanced | Live slide preview as AI generates content | AI writes "Problem slide" → Preview renders in real-time | Founder, Designer | React components, LangGraph state | High | P1 - High | [docs/generative-ui](https://github.com/copilotkit/copilotkit/blob/main/CopilotKit/packages/react-core/README.md) |
| **Message Persistence** | Core | Resume deck creation after closing browser | Founder returns next day → Conversation continues from 80% complete | Founder | PostgreSQL, Supabase | Medium | P0 - Critical | [docs/persistence/message-persistence](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit) |
| **Checkpoint Saving** | Core | Save agent state at each workflow step | After outline approved, checkpoint saved → Can resume from "Generate Slides" | System | LangGraph PostgresSaver, Supabase | Medium | P0 - Critical | [docs/persistence/loading-agent-state](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit) |
| **Frontend Actions** | Core | AI triggers slide updates, exports, theme changes | AI says "updating slide 3" → useCopilotAction handler updates Supabase | Founder, Developer | Supabase client, React | Medium | P1 - High | [docs/frontend-actions](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Multi-Agent Flows** | Advanced | Separate content writing from design optimization | Content Bot writes copy → Design Bot optimizes layout/colors | System | LangGraph multi-agent, CrewAI (optional) | Very High | P2 - Medium | [docs/multi-agent-flows](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit) |
| **Custom UI Components** | Advanced | Brand pitch deck interface to match startup identity | Replace default chat with custom wizard UI | Designer, Founder | React components, Tailwind | Medium | P2 - Medium | [docs/custom-look-and-feel/bring-your-own-components](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Headless UI** | Advanced | Build completely custom chat interface | No default UI, full control over conversation display | Developer, Designer | React, custom components | High | P3 - Low | [docs/custom-look-and-feel/headless-ui](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Markdown Rendering** | Core | Display AI responses with formatting | AI returns "**Market Size**: $5B" → Renders as bold | Founder | Markdown component | Low | P1 - High | [docs/custom-look-and-feel/markdown-rendering](https://github.com/copilotkit/copilotkit/blob/main/CopilotKit/packages/react-ui/README.md) |
| **Agentic Chat UI** | Core | Conversational interface for deck creation | Chat sidebar guides founder through questions | Founder | CopilotChat component | Low | P0 - Critical | [docs/agentic-chat-ui](https://github.com/copilotkit/copilotkit/blob/main/CopilotKit/packages/react-ui/README.md) |
| **State Streaming** | Core | Real-time progress updates (0% → 100%) | Completeness bar updates as AI collects info | Founder | LangGraph streaming, WebSockets | Medium | P1 - High | [docs/concepts/coagent-state](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Interrupt Flow (HITL)** | Advanced | Pause generation for approval | Stop before expensive operation (image generation) | Founder, Cost Control | LangGraph interrupts | High | P1 - High | [docs/human-in-the-loop/interrupt-flow](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Node Flow (Step-by-Step)** | Core | Execute deck creation as discrete steps | Step 1: Collect → Step 2: Outline → Step 3: Generate | System | LangGraph graph definition | Medium | P0 - Critical | [docs/human-in-the-loop/node-flow](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Agent-App Context** | Core | AI reads current UI state (selected slide, theme) | Founder views Slide 5 → AI knows context for edits | Founder, AI Agent | useCopilotReadable | Low | P1 - High | [docs/agent-app-context](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Authentication** | Core | Isolate decks by user, secure API calls | Each founder sees only their decks (Supabase RLS) | Founder, Security | Supabase Auth, JWT | Medium | P0 - Critical | [docs/auth](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit) |
| **Loading Agent State** | Core | Restore deck session from database | Founder returns → "Continue where you left off?" | Founder | PostgreSQL, thread_id | Medium | P0 - Critical | [docs/persistence/loading-agent-state](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit) |
| **Loading Message History** | Core | Show previous conversation when resuming | Founder sees all chat messages from yesterday | Founder | PostgreSQL messages table | Low | P1 - High | [docs/persistence/loading-message-history](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit) |
| **Runtime Configuration** | Advanced | Dynamic AI model selection (GPT-4 vs GPT-3.5) | Free users: GPT-3.5, Pro users: GPT-4 | System, Cost Control | LangGraph config | Medium | P2 - Medium | [docs/advanced/adding-runtime-configuration](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Disabling State Streaming** | Advanced | Reduce bandwidth for simple actions | Export PDF doesn't need streaming updates | System, Performance | LangGraph config | Low | P3 - Low | [docs/advanced/disabling-state-streaming](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Emit Messages (Manual)** | Advanced | Send custom progress updates | "Generating slide 3 of 10..." status | Founder, UX | copilotkit_emit_state | Medium | P2 - Medium | [docs/advanced/emit-messages](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Exit Agent (Graceful)** | Core | End conversation after deck exported | "Your deck is ready!" → Agent stops | Founder | LangGraph END node | Low | P1 - High | [docs/advanced/exit-agent](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **Subgraphs** | Advanced | Nested workflows (e.g., theme selection sub-flow) | Main flow pauses → Theme picker sub-agent → Returns to main | System | LangGraph subgraph API | Very High | P3 - Low | [docs/subgraphs](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit) |
| **Message Management** | Core | Handle chat history, context windows | Summarize old messages when context limit reached | System | LangGraph message handling | Medium | P1 - High | [docs/concepts/message-management](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |
| **CopilotKit Config** | Core | Configure agent name, models, endpoints | Set agent name, OpenAI model, API endpoints | Developer | CopilotKit provider | Low | P0 - Critical | [docs/concepts/copilotkit-config](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt) |

---

## Feature Categories

### Conversational Flow (6 features)
- Shared State (useCoAgent)
- Readable Context (useCopilotReadable)
- Agentic Chat UI
- Message Management
- State Streaming
- CopilotKit Config

**Purpose**: Enable natural conversation that builds deck progressively  
**Priority**: P0 - Must have for MVP

---

### Human Approval (3 features)
- Human-in-the-Loop (useCopilotAction)
- Interrupt Flow
- Node Flow

**Purpose**: Founder reviews/approves before expensive operations  
**Priority**: P0 - Critical for quality control

---

### Persistence & Recovery (4 features)
- Message Persistence
- Checkpoint Saving
- Loading Agent State
- Loading Message History

**Purpose**: Never lose user work, resume sessions  
**Priority**: P0 - Critical for user trust

---

### UI Customization (4 features)
- Generative UI (useCoAgentStateRender)
- Custom UI Components
- Headless UI
- Markdown Rendering

**Purpose**: Brand the experience, show live previews  
**Priority**: P1-P2 - Nice to have, differentiation

---

### Advanced Automation (6 features)
- Frontend Actions
- Multi-Agent Flows
- Runtime Configuration
- Emit Messages
- Exit Agent
- Subgraphs

**Purpose**: Complex orchestration, cost optimization  
**Priority**: P2-P3 - Post-MVP enhancements

---

### Security & Auth (2 features)
- Authentication
- Agent-App Context

**Purpose**: User isolation, secure data access  
**Priority**: P0 - Legal/security requirement

---

## Implementation Complexity Breakdown

| Complexity | Features | Time Estimate | Dependencies |
|------------|----------|---------------|--------------|
| **Low** (5) | Readable Context, Markdown, Config, Exit, Message History | 1-2 days | React, basic hooks |
| **Medium** (10) | Shared State, Persistence, Checkpoints, Node Flow, Actions, Auth, Message Mgmt, Emit, Runtime Config | 2-4 weeks | LangGraph, Supabase, PostgreSQL |
| **High** (4) | HITL, Generative UI, Interrupt Flow, Custom UI | 3-5 weeks | Advanced React patterns, state machines |
| **Very High** (2) | Multi-Agent, Subgraphs | 4-6 weeks | Multi-agent orchestration, CrewAI |

**Total MVP (Core only)**: 6-8 weeks  
**Total Production (Core + Advanced)**: 12-16 weeks

---

## Priority Distribution

### P0 - Critical (Must Have for MVP)
**Count**: 11 features  
**Features**: Shared State, Readable Context, HITL, Chat UI, Persistence (all 3), Auth, Node Flow, Config, Exit  
**Timeline**: Weeks 1-6  
**Goal**: Working conversational deck builder with save/resume

### P1 - High (Should Have for Launch)
**Count**: 6 features  
**Features**: Generative UI, Frontend Actions, Interrupt Flow, Streaming, Agent Context, Message History  
**Timeline**: Weeks 7-10  
**Goal**: Professional UX with live previews and rich interactions

### P2 - Medium (Nice to Have)
**Count**: 4 features  
**Features**: Multi-Agent, Custom UI, Runtime Config, Emit Messages  
**Timeline**: Weeks 11-14  
**Goal**: Advanced automation and customization

### P3 - Low (Future Enhancement)
**Count**: 4 features  
**Features**: Headless UI, Subgraphs, Disable Streaming  
**Timeline**: Post-launch  
**Goal**: Enterprise features, white-label options

---

## Real-World Examples by Workflow Stage

### Stage 1: Information Collection

**Active Features**:
1. **Shared State** - Store company name, industry, problem, solution
2. **Readable Context** - AI reads previously entered data
3. **State Streaming** - Progress bar updates 0% → 80%
4. **Message Management** - Trim old messages if context limit reached

**User Experience**:
```
Founder: "My company is TechCorp, we're building AI dev tools"
AI: "Great! I'll remember TechCorp. What problem do you solve?"
[State updates: companyName = "TechCorp", completeness = 20%]

Founder: "Developers waste time on repetitive code"
AI: "Got it. How does TechCorp solve this?"
[State updates: problem = "repetitive code", completeness = 40%]
```

**[Source: Conversation Flow Patterns](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt)**

---

### Stage 2: Outline Generation & Approval

**Active Features**:
1. **Human-in-the-Loop** - Pause for founder approval
2. **Interrupt Flow** - Wait for response before continuing
3. **Generative UI** - Show outline preview
4. **Frontend Actions** - Save outline to database

**User Experience**:
```typescript
// AI generates outline
useCopilotAction({
  name: "presentOutline",
  renderAndWaitForResponse: ({ args, respond }) => {
    return (
      <OutlineCard>
        <h3>Proposed Deck Structure</h3>
        {args.slides.map(slide => <li>{slide.title}</li>)}
        <button onClick={() => respond({ approved: true })}>
          Generate Deck
        </button>
        <button onClick={() => respond({ approved: false })}>
          Revise Outline
        </button>
      </OutlineCard>
    );
  }
});
```

**Flow**:
1. AI analyzes collected data
2. Generates 10-slide outline
3. **Pauses** (interrupt)
4. Founder reviews (HITL UI)
5. Founder clicks button (respond)
6. Agent continues or revises

**[Source: HITL with renderAndWaitForResponse](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt)**

---

### Stage 3: Slide Generation

**Active Features**:
1. **Node Flow** - Generate slide-by-slide
2. **Emit Messages** - Progress: "Generating slide 3 of 10..."
3. **Generative UI** - Live slide preview
4. **Frontend Actions** - Update slides in database

**User Experience**:
```python
# Python agent emits progress
async def generate_slides_node(state: PitchDeckState):
    for i in range(10):
        slide = generate_slide(state, i)
        state["current_slide"] = slide
        await copilotkit_emit_state(config, state)  # Streams to frontend
        await asyncio.sleep(0.5)
    
    return {"slides": all_slides, "status": "complete"}
```

**Frontend receives updates**:
```typescript
useCoAgentStateRender({
  name: "pitch_deck_agent",
  render: ({ state }) => {
    return (
      <div>
        <p>Generating slide {state.current_slide_number} of 10...</p>
        <SlidePreview slide={state.current_slide} />
      </div>
    );
  }
});
```

**[Source: Emit State + Generative UI](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt)**

---

### Stage 4: Theme & Design

**Active Features**:
1. **Custom UI** - Apply brand colors, fonts, logo
2. **Frontend Actions** - Update theme in Supabase
3. **Readable Context** - AI knows current theme selection

**User Experience**:
```
Founder: "Make it use our brand colors - blue and white"
AI: [Calls updateTheme action]

useCopilotAction({
  name: "updateTheme",
  parameters: [
    { name: "primaryColor", type: "string" },
    { name: "secondaryColor", type: "string" }
  ],
  handler: async ({ primaryColor, secondaryColor }) => {
    await supabase
      .from('custom_themes')
      .insert({ 
        profile_id: user.id,
        colors: { primary: primaryColor, secondary: secondaryColor }
      });
    
    return `Theme updated to ${primaryColor} and ${secondaryColor}`;
  }
});
```

**[Source: Frontend Actions Handler Pattern](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt)**

---

### Stage 5: Export & Share

**Active Features**:
1. **Exit Agent** - Graceful conversation end
2. **Frontend Actions** - Trigger PDF/PPTX export
3. **Message Persistence** - Save final conversation

**User Experience**:
```
Founder: "Export as PDF"
AI: [Calls exportDeck action, shows download link, ends conversation]

Agent reaches END node → Conversation concludes
```

**[Source: Agent Exit Patterns](https://github.com/copilotkit/copilotkit/blob/main/docs/public/llms-full.txt)**

---

## Advanced Features - Multi-Agent Collaboration

### Content Writer Bot + Design Bot

**Scenario**: Optimize both copy and visuals

**Implementation**:
```python
# Main graph delegates to specialist agents
class DeckState(CopilotKitState):
    content_draft: dict
    design_draft: dict

def content_agent_node(state):
    # Specialized agent for copywriting
    return {"content_draft": write_compelling_copy(state)}

def design_agent_node(state):
    # Specialized agent for visual design
    return {"design_draft": optimize_layout(state.content_draft)}

graph.add_node("content_bot", content_agent_node)
graph.add_node("design_bot", design_agent_node)
graph.add_edge("content_bot", "design_bot")
```

**Benefits**:
- Better copy (specialist model for writing)
- Better design (specialist model for layout)
- Parallel execution (if needed)

**Complexity**: Very High  
**Priority**: P2 (post-MVP)

**[Source: Multi-Agent Patterns via CopilotKit](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit)**

---

## Tool Integration Requirements

### By Feature

| Feature | Required Tools | Installation | Config Complexity |
|---------|---------------|--------------|-------------------|
| **Shared State** | @copilotkit/react-core, LangGraph Python | `pnpm add @copilotkit/react-core` | Low |
| **Persistence** | PostgreSQL (Supabase), LangGraph checkpointer | Supabase project + connection string | Medium |
| **HITL** | React components, LangGraph interrupts | No install (built-in) | High (state logic) |
| **Generative UI** | @copilotkit/react-core, custom React components | `pnpm add @copilotkit/react-core` | High |
| **Custom UI** | Custom React components, Tailwind | Build components | Medium |
| **Multi-Agent** | LangGraph multi-agent API, CrewAI (optional) | `pip install crewai` (optional) | Very High |
| **Auth** | Supabase Auth, JWT validation | Supabase project | Medium |
| **Frontend Actions** | @copilotkit/react-core, Supabase client | Already installed | Low |

---

## Feature Dependencies

### Dependency Graph

```
Level 1 (Foundation):
├─ CopilotKit Config (required for everything)
├─ Authentication (isolates user data)
└─ Shared State (core data structure)

Level 2 (Core Workflow):
├─ Readable Context (depends on: Shared State)
├─ Agentic Chat UI (depends on: Config)
├─ Node Flow (depends on: Shared State)
└─ Message Management (depends on: Chat UI)

Level 3 (User Interaction):
├─ HITL (depends on: Shared State, Node Flow)
├─ Generative UI (depends on: Shared State, Streaming)
├─ Frontend Actions (depends on: Shared State, Auth)
└─ Markdown Rendering (depends on: Chat UI)

Level 4 (Persistence):
├─ Checkpoints (depends on: Shared State, PostgreSQL)
├─ Message Persistence (depends on: Message Mgmt, PostgreSQL)
└─ Loading State (depends on: Checkpoints)

Level 5 (Advanced):
├─ Multi-Agent (depends on: Node Flow, Shared State)
├─ Runtime Config (depends on: Node Flow)
└─ Subgraphs (depends on: Multi-Agent)
```

**Implementation Order**: Build from Level 1 → Level 5

---

## Stakeholder Value by Feature

### Founders (Primary Users)

**High Value Features**:
1. Shared State - Don't repeat information ✅
2. HITL - Control over AI output ✅
3. Persistence - Never lose work ✅
4. Chat UI - Easy to use interface ✅
5. Exit Agent - Clear completion ✅

**Medium Value**:
6. Generative UI - See preview before generation
7. Frontend Actions - Edit individual slides
8. Custom UI - Branded experience

---

### Developers (Build Team)

**High Value Features**:
1. useCoAgent Hook - Simple state management ✅
2. TypeScript Types - Type-safe development ✅
3. Message Management - Handles complexity ✅
4. Config - Easy setup ✅

**Medium Value**:
5. Runtime Config - Dynamic model selection
6. Emit Messages - Custom progress updates
7. Troubleshooting Docs - Faster debugging

---

### Designers (UX Team)

**High Value Features**:
1. Custom UI Components - Full design control ✅
2. Generative UI - Dynamic component rendering ✅
3. Markdown Rendering - Rich text formatting ✅

**Medium Value**:
4. Headless UI - Complete freedom (complex)
5. Theme Customization - Brand alignment

---

### Investors (Business Stakeholders)

**High Value Features**:
1. Multi-Agent - Competitive differentiator ✅
2. Persistence - Enterprise reliability ✅
3. Auth - Secure, scalable ✅
4. Runtime Config - Cost optimization ✅

**Low Concern**:
5. UI customization - Nice but not core value

---

## Cost-Benefit Analysis

### Build vs Buy Assessment

**Building with CopilotKit + LangGraph**:
- Development Time: 6-8 weeks (MVP)
- Cost: $40-60K (2 developers)
- Flexibility: 100% (full control)
- Maintenance: Ongoing (framework updates)

**Building Custom (No Framework)**:
- Development Time: 16-24 weeks
- Cost: $120-180K
- Flexibility: 100%
- Maintenance: High (maintain all infrastructure)

**Savings**: **$80-120K** and **12-16 weeks** by using CopilotKit

**[Source: Time/Cost Analysis Based on Framework Capabilities]**

---

## Technical Risks & Mitigations

| Risk | Probability | Impact | Mitigation | Feature |
|------|------------|--------|------------|---------|
| **State sync bugs** | Medium | High | Use TypeScript types, thorough testing | Shared State |
| **HITL UI complexity** | High | Medium | Start simple (approve/reject buttons only) | HITL |
| **Checkpoint failures** | Low | High | Implement retry logic, error boundaries | Persistence |
| **Multi-agent coordination** | High | Medium | Defer to Phase 3, start single-agent | Multi-Agent |
| **Context window limits** | Medium | Medium | Implement message summarization | Message Mgmt |
| **API rate limits** | Low | Medium | Cache responses, batch requests | All |

---

## Feature Maturity Assessment

### Production-Ready (Use Now) ✅
- Shared State (useCoAgent)
- Readable Context (useCopilotReadable)
- HITL (useCopilotAction with renderAndWaitForResponse)
- Chat UI (CopilotChat component)
- Message Persistence
- Auth integration

**Source**: Widely used in production apps, documented examples

---

### Stable (Use with Testing) ⚠️
- Generative UI (useCoAgentStateRender)
- Checkpoints (PostgresSaver)
- Frontend Actions
- Interrupt Flow
- Runtime Configuration

**Source**: Documented but fewer production examples

---

### Experimental (Defer or Prototype) 🧪
- Multi-Agent Flows (complex orchestration)
- Subgraphs (nested workflows)
- Headless UI (requires extensive custom work)

**Source**: Advanced features, requires deep expertise

---

## Recommended Feature Set by Phase

### Phase 1 - MVP (Weeks 1-6)

**Must Have** (11 features):
1. CopilotKit Config
2. Shared State (useCoAgent)
3. Readable Context (useCopilotReadable)
4. Agentic Chat UI
5. Node Flow
6. HITL (useCopilotAction)
7. Message Persistence
8. Checkpoint Saving
9. Loading Agent State
10. Authentication
11. Exit Agent

**Outcome**: Working AI chat that creates decks, saves state, requires approval

---

### Phase 2 - Enhancement (Weeks 7-10)

**Should Have** (6 features):
1. Generative UI (slide previews)
2. Frontend Actions (edit slides)
3. Interrupt Flow (pause for approvals)
4. State Streaming (progress bars)
5. Loading Message History (resume conversations)
6. Markdown Rendering (rich formatting)

**Outcome**: Professional UX with previews, smooth editing

---

### Phase 3 - Advanced (Weeks 11-16)

**Nice to Have** (4 features):
1. Multi-Agent Flows (content + design bots)
2. Runtime Configuration (model selection)
3. Custom UI Components (brand themes)
4. Emit Messages (custom progress)

**Outcome**: Advanced automation, enterprise features

---

## Success Criteria by Feature

### Shared State

- ✅ Data persists across messages
- ✅ No duplicate data entry
- ✅ State updates trigger re-renders
- ✅ TypeScript types match Python state

### HITL

- ✅ Agent pauses at approval points
- ✅ Founder can approve/reject
- ✅ Rejection returns to previous step
- ✅ Approval saves decision to database

### Persistence

- ✅ Conversation survives browser refresh
- ✅ Multiple sessions saved per user
- ✅ Resume shows "Continue where you left off?"
- ✅ Message history displays correctly

### Generative UI

- ✅ Slide preview updates in real-time
- ✅ No layout shift during rendering
- ✅ Components are interactive (clickable)
- ✅ Graceful fallback if render fails

---

## Feature Interaction Matrix

| Feature A | Feature B | Interaction | Example |
|-----------|-----------|-------------|---------|
| Shared State | HITL | State determines approval UI | If completeness < 80%, don't show "Generate" |
| Persistence | Shared State | Checkpoints save state snapshots | Resume loads last checkpoint → restores state |
| Generative UI | Shared State | Renders based on state changes | When state.currentSlide updates → UI updates |
| Frontend Actions | Shared State | Actions modify state | updateSlide action → setState({ slides: [...] }) |
| Multi-Agent | Node Flow | Agents are nodes in graph | content_bot node → design_bot node |
| Auth | Persistence | User-specific checkpoints | thread_id = `${user_id}_${deck_id}` |

---

## Total Feature Count

**All Features**: 25 total  
**Core Features**: 15 (P0-P1)  
**Advanced Features**: 10 (P2-P3)

**MVP Build**: 15 core features (6-8 weeks)  
**Production Build**: 21 features (core + P2) (12-14 weeks)  
**Enterprise Build**: All 25 features (16-20 weeks)

---

---

## Feature Dependency Graph

```
Foundation Layer (No Dependencies):
├─ CopilotKit Config
├─ Authentication
└─ Agentic Chat UI

Level 1 (Foundation Dependencies):
├─ Shared State → depends on: Config, Auth
├─ Node Flow → depends on: Shared State
└─ Message Management → depends on: Chat UI

Level 2 (Core Workflow):
├─ Readable Context → depends on: Shared State
├─ HITL → depends on: Shared State, Node Flow
├─ State Streaming → depends on: Shared State
└─ Exit Agent → depends on: Node Flow

Level 3 (Persistence):
├─ Checkpoint Saving → depends on: Shared State, PostgreSQL
├─ Message Persistence → depends on: Message Management, PostgreSQL
└─ Loading Agent State → depends on: Checkpoints

Level 4 (Advanced):
├─ Generative UI → depends on: Shared State, State Streaming
├─ Frontend Actions → depends on: Shared State, Auth
├─ Multi-Agent → depends on: Node Flow, Shared State
└─ Runtime Config → depends on: Node Flow
```

**Implementation Order**: Build Foundation → Level 1 → Level 2 → Level 3 → Level 4

---

**Created**: October 21, 2025  
**Status**: ✅ Complete feature analysis  
**Next**: See `03-phase-plan.md` for implementation timeline  
**Sources**: 36 CopilotKit LangGraph documentation pages

---

## Navigation

**Previous**: [01-summary.md](./01-summary.md) - Executive Overview  
**Next**: [03-phase-plan.md](./03-phase-plan.md) - Implementation Roadmap  
**Index**: [00-INDEX.md](./00-INDEX.md)

---

*This feature table maps every major CopilotKit + LangGraph capability to real pitch deck generator workflows with complexity, priority, dependencies, and tooling requirements.*


