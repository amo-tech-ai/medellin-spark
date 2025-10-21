---
version: 1.1
created: 2025-10-21
lastUpdated: 2025-10-21
owner: Technical Team, Architecture
status: Production Ready
---

# CopilotKit LangGraph - Architecture Diagrams

**Date**: October 21, 2025  
**Purpose**: Visual representations of pitch deck generator workflows  
**Format**: Mermaid diagrams (production-quality)

---

## 🎨 Diagram Legend

**Standard Color Coding**:
- 🟢 **Green** (#10B981): User-facing steps, success states
- 🔵 **Blue** (#3B82F6): AI processing nodes, system operations
- 🟠 **Orange** (#F59E0B): Human approval gates (HITL), decisions
- 🟣 **Purple** (#8B5CF6): Coordination, orchestration agents
- 🔴 **Pink** (#EC4899): Design/specialist agents
- ⚪ **White/Gray**: External services, databases

**Standard Shapes**:
- **Rectangle**: Process/node/component
- **Diamond**: Decision point/conditional
- **Cylinder**: Database/storage
- **Cloud**: External API/service
- **Rounded Box**: Start/end states
- **Subgraph**: Logical groupings

**Symbols**:
- 💾 **Checkpoint**: State saved to database
- 🟠 **HITL**: Human-in-the-loop approval required
- ⏸️ **Pause**: Workflow interrupts, waits for user

**Cross-References**:
- Diagram 1 → Feature: Node Flow ([02-features-table.md](./02-features-table.md#node-flow))
- Diagram 2 → Feature: Multi-Agent ([02-features-table.md](./02-features-table.md#multi-agent))
- Diagram 3 → Feature: Shared State ([02-features-table.md](./02-features-table.md#shared-state))
- Diagram 4 → Feature: HITL ([02-features-table.md](./02-features-table.md#hitl))
- Diagram 5 → Phase 3 Deployment ([03-phase-plan.md](./03-phase-plan.md#deployment))
- Diagram 6 → Guardrails ([05-guardrails.md](./05-guardrails.md#message-persistence))
- Diagram 7 → Phase 3 ([03-phase-plan.md](./03-phase-plan.md#phase-3))

---

## Diagram 1: Single-Agent Workflow (Phase 1 MVP)

### Purpose
Show how a founder creates a pitch deck through conversational AI workflow with checkpoints and human approval.

### Mermaid Diagram

```mermaid
graph TB
    Start([Founder Opens App]) --> Auth{Authenticated?}
    Auth -->|No| Login[Sign In/Sign Up]
    Auth -->|Yes| CheckSession{Existing Session?}
    Login --> CheckSession
    
    CheckSession -->|No| StartNew[Start New Deck]
    CheckSession -->|Yes| Resume{Resume or Start Fresh?}
    Resume -->|Resume| LoadCheckpoint[Load Last Checkpoint]
    Resume -->|Start Fresh| StartNew
    
    StartNew --> CollectInfo[Collect Information Node]
    LoadCheckpoint --> CollectInfo
    
    CollectInfo --> ExtractData[AI Extracts Company Data]
    ExtractData --> UpdateState[Update Shared State]
    UpdateState --> CheckComplete{Completeness >= 80%?}
    
    CheckComplete -->|No| AskMore[AI Asks Follow-Up Questions]
    AskMore --> CollectInfo
    
    CheckComplete -->|Yes| SaveCheckpoint1[💾 Checkpoint 1: Data Collected]
    SaveCheckpoint1 --> GenerateOutline[Generate 10-Slide Outline]
    
    GenerateOutline --> PresentOutline[Present Outline to Founder]
    PresentOutline --> HITL1{Founder Approves?}
    
    HITL1 -->|No| Revise[Ask What to Change]
    Revise --> GenerateOutline
    
    HITL1 -->|Yes| SaveCheckpoint2[💾 Checkpoint 2: Outline Approved]
    SaveCheckpoint2 --> GenerateSlides[Generate All 10 Slides]
    
    GenerateSlides --> StreamProgress[Stream Progress Updates]
    StreamProgress --> Preview[Live Slide Preview]
    Preview --> Complete[All Slides Complete]
    
    Complete --> SaveCheckpoint3[💾 Checkpoint 3: Deck Complete]
    SaveCheckpoint3 --> PresentDeck[Show Complete Deck]
    
    PresentDeck --> HITL2{Founder Approves?}
    HITL2 -->|No| EditSlides[Edit Specific Slides]
    EditSlides --> GenerateSlides
    
    HITL2 -->|Yes| ExportOptions[Export Options]
    ExportOptions --> PDF[Export PDF]
    ExportOptions --> PPTX[Export PPTX]
    ExportOptions --> GSlides[Export Google Slides]
    
    PDF --> End([Done: Deck Ready!])
    PPTX --> End
    GSlides --> End
    
    style Start fill:#10B981,stroke:#059669,stroke-width:3px,color:#fff
    style End fill:#10B981,stroke:#059669,stroke-width:3px,color:#fff
    style HITL1 fill:#F59E0B,stroke:#D97706,stroke-width:2px
    style HITL2 fill:#F59E0B,stroke:#D97706,stroke-width:2px
    style SaveCheckpoint1 fill:#3B82F6,stroke:#2563EB,stroke-width:2px,color:#fff
    style SaveCheckpoint2 fill:#3B82F6,stroke:#2563EB,stroke-width:2px,color:#fff
    style SaveCheckpoint3 fill:#3B82F6,stroke:#2563EB,stroke-width:2px,color:#fff
```

---

### Key Elements Explained

**Start → Authentication**:
- Supabase Auth validates user
- JWT token issued for agent communication

**Session Check**:
- Query `pitch_conversations` table for `status = 'in_progress'`
- If found → Offer to resume from last checkpoint
- If not → Start fresh

**Collect Information (Node)**:
- AI asks intelligent questions
- Extracts: company name, problem, solution, market, traction, team, ask
- Tracks completeness: 0% → 100%
- Uses `useCoAgent` for shared state

**Checkpoints (💾)**:
1. **After 80% data collection**: Can resume if browser closes
2. **After outline approval**: Most expensive part not re-done
3. **After deck generation**: Complete deck persisted

**Human-in-the-Loop (HITL) Gates** 🟠:
1. **Outline Approval**: Founder reviews 10-slide structure before generation
2. **Deck Approval**: Founder reviews final deck before marking complete

**State Persistence**:
- All state saved to PostgreSQL via LangGraph checkpointer
- Thread ID: `${user_id}_${deck_id}`
- Enables multi-session work

---

## Diagram 2: Multi-Agent Architecture (Phase 3 Advanced)

### Purpose
Show how specialized AI agents collaborate for superior deck quality.

### Mermaid Diagram

```mermaid
graph TB
    Start([Founder Request]) --> Coordinator[Coordinator Agent]
    
    Coordinator --> Analyze{Analyze Task}
    Analyze -->|Content Needs| ContentBot[Content Writer Bot]
    Analyze -->|Design Needs| DesignBot[Design Optimizer Bot]
    Analyze -->|Both| Parallel[Parallel Execution]
    
    ContentBot --> ExtractInfo[Extract Key Information]
    ExtractInfo --> GenerateCopy[Generate Compelling Copy]
    GenerateCopy --> OptimizeStory[Optimize Storytelling]
    OptimizeStory --> ContentDraft[Content Draft Ready]
    
    DesignBot --> AnalyzeTheme[Analyze Brand Theme]
    AnalyzeTheme --> OptimizeLayout[Optimize Layout & Hierarchy]
    OptimizeLayout --> ApplyDesign[Apply Visual Principles]
    ApplyDesign --> DesignDraft[Design Draft Ready]
    
    Parallel --> ContentBot
    Parallel --> DesignBot
    
    ContentDraft --> Merge[Merge Agent Outputs]
    DesignDraft --> Merge
    
    Merge --> QualityCheck{Quality Check}
    QualityCheck -->|Fail| Retry[Retry with Feedback]
    Retry --> Coordinator
    
    QualityCheck -->|Pass| FinalDeck[Final Deck Assembly]
    FinalDeck --> HumanReview[Present to Founder]
    
    HumanReview --> Approve{Founder Approves?}
    Approve -->|No| Feedback[Collect Feedback]
    Feedback --> Coordinator
    
    Approve -->|Yes| Export[Export & Complete]
    Export --> End([Done])
    
    style Start fill:#10B981,stroke:#059669,stroke-width:3px,color:#fff
    style End fill:#10B981,stroke:#059669,stroke-width:3px,color:#fff
    style Coordinator fill:#8B5CF6,stroke:#7C3AED,stroke-width:2px,color:#fff
    style ContentBot fill:#3B82F6,stroke:#2563EB,stroke-width:2px,color:#fff
    style DesignBot fill:#EC4899,stroke:#DB2777,stroke-width:2px,color:#fff
    style Approve fill:#F59E0B,stroke:#D97706,stroke-width:2px
```

---

### Agent Specialization

**Coordinator Agent** 🟣:
- Routes tasks to specialist agents
- Manages agent state and handoffs
- Handles errors and retries

**Content Writer Bot** 🔵:
- **Specialized Model**: GPT-4 fine-tuned on successful pitch decks
- **Responsibilities**:
  - Extract key information from founder input
  - Generate compelling, investor-friendly copy
  - Optimize storytelling (problem → solution → traction)
  - Ensure clarity (no jargon)
- **Output**: Text content for all 10 slides

**Design Optimizer Bot** 🔴:
- **Specialized Model**: GPT-4 Vision + design principles
- **Responsibilities**:
  - Analyze brand theme (colors, fonts, logo)
  - Optimize layout and visual hierarchy
  - Ensure consistency across slides
  - Apply design best practices (white space, contrast, alignment)
- **Output**: Styled slides with visual design applied

**Quality Check**:
- Validate all slides have required fields
- Check content length (not too long/short)
- Verify design consistency
- Run through moderation API

---

## Diagram 3: Shared State Architecture

### Purpose
Show how state flows between frontend (React) and backend (LangGraph agent).

### Mermaid Diagram

```mermaid
sequenceDiagram
    participant F as Frontend (React)
    participant CK as CopilotKit Provider
    participant API as Agent API
    participant LG as LangGraph Agent
    participant DB as Supabase PostgreSQL
    
    F->>F: Founder types message
    F->>CK: Send via useCoAgent
    CK->>API: POST /agent {messages, state}
    
    API->>API: Validate JWT token
    API->>LG: Invoke agent with state
    
    LG->>DB: Load checkpoint (thread_id)
    DB-->>LG: Return last state
    
    LG->>LG: Process message in node
    LG->>LG: Update state (completeness++)
    
    LG->>DB: Save checkpoint
    DB-->>LG: Checkpoint saved
    
    LG-->>API: Return {messages, state}
    API-->>CK: Stream response
    
    CK->>F: Update useCoAgent state
    F->>F: Re-render with new state
    
    F->>F: Display AI response
    F->>F: Update progress bar (completeness)
    
    Note over F,DB: State is synchronized bi-directionally
    
    F->>CK: Founder clicks "Approve"
    CK->>API: POST /agent {action: "approve"}
    API->>LG: Continue from interrupt
    LG->>LG: Move to next node
    LG-->>API: Return next response
    API-->>CK: Stream response
    CK->>F: Update UI
```

---

### State Synchronization Details

**Frontend State (React)**:
```typescript
const { state, setState } = useCoAgent<PitchDeckState>({
  name: "pitch_deck_agent",
  initialState: {
    companyName: "",
    problem: "",
    solution: "",
    completeness: 0,
    status: "collecting"
  }
});

// State updates automatically when agent responds
console.log(state.completeness);  // 0 → 20 → 40 → 80 → 100
```

**Backend State (Python)**:
```python
class PitchDeckState(CopilotKitState):
    company_name: str = ""
    problem: str = ""
    solution: str = ""
    completeness: int = 0
    status: Literal["collecting", "outlining", "generating", "complete"]
```

**Checkpoint Storage (PostgreSQL)**:
```sql
CREATE TABLE langgraph_checkpoints (
    thread_id TEXT PRIMARY KEY,
    checkpoint_ns TEXT,
    checkpoint_id TEXT,
    parent_checkpoint_id TEXT,
    type TEXT,
    checkpoint JSONB,  -- Entire state stored here
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Diagram 4: HITL (Human-in-the-Loop) Flow

### Purpose
Show how agent pauses for human approval using LangGraph interrupts.

### Mermaid Diagram

```mermaid
stateDiagram-v2
    [*] --> Collecting: Start
    Collecting --> OutlineGen: 80% Complete
    OutlineGen --> WaitApproval: Present Outline
    
    state WaitApproval {
        [*] --> Paused: Agent Interrupts
        Paused --> ShowUI: Render React Component
        ShowUI --> WaitingForUser: Display Approve/Reject
        WaitingForUser --> UserDecision: Founder Clicks Button
        UserDecision --> [*]: Response Sent
    }
    
    WaitApproval --> Approved: respond({approved: true})
    WaitApproval --> Rejected: respond({approved: false})
    
    Rejected --> AskChanges: What to change?
    AskChanges --> OutlineGen: Regenerate
    
    Approved --> GenerateSlides: Continue Workflow
    GenerateSlides --> WaitFinalApproval: Present Complete Deck
    
    state WaitFinalApproval {
        [*] --> Paused2: Agent Interrupts
        Paused2 --> ShowDeck: Display Full Deck
        ShowDeck --> WaitingForReview: User Reviews
        WaitingForReview --> FinalDecision: Approve or Edit
        FinalDecision --> [*]: Response Sent
    }
    
    WaitFinalApproval --> FinalApproved: respond({approved: true})
    WaitFinalApproval --> EditRequired: respond({slideNumber: 3, changes: "..."})
    
    EditRequired --> UpdateSlide: Modify Specific Slide
    UpdateSlide --> WaitFinalApproval: Show Updated Deck
    
    FinalApproved --> Export: Mark Complete
    Export --> [*]: Done
```

---

### HITL Implementation Details

**Frontend (React)**:
```typescript
useCopilotAction({
  name: "presentOutline",
  renderAndWaitForResponse: ({ args, respond, status }) => {
    if (status !== "executing") return null;
    
    return (
      <div className="approval-modal">
        <h3>Review Your Deck Outline</h3>
        <ol>
          {args.slides.map((slide, i) => (
            <li key={i}>{slide.title}</li>
          ))}
        </ol>
        
        <div className="actions">
          <button onClick={() => respond({ approved: false })}>
            Make Changes
          </button>
          <button onClick={() => respond({ approved: true })}>
            Generate Deck
          </button>
        </div>
      </div>
    );
  }
});
```

**Backend (Python)**:
```python
from langgraph.types import Command, interrupt

async def present_outline_node(state: PitchDeckState):
    outline = generate_outline(state)
    
    # Interrupt workflow and wait for human response
    approval = interrupt({
        "slides": outline,
        "question": "Do you approve this outline?"
    })
    
    if approval.get("approved"):
        return Command(goto="generate_slides_node")
    else:
        return Command(goto="regenerate_outline_node")
```

---

## Diagram 5: Deployment Architecture

### Purpose
Show production infrastructure and data flow.

### Mermaid Diagram

```mermaid
graph TB
    subgraph "User's Browser"
        UI[React App<br/>Vite + TypeScript]
        CK[CopilotKit Hooks<br/>useCoAgent, useCopilotAction]
    end
    
    subgraph "CDN (Vercel)"
        Static[Static Assets<br/>HTML, CSS, JS]
    end
    
    subgraph "Backend (Railway/Fly.io)"
        API[FastAPI Server<br/>Port 8000]
        Agent[LangGraph Agent<br/>State Machine]
    end
    
    subgraph "AI Services"
        OpenAI[OpenAI API<br/>GPT-4 / GPT-3.5]
        Anthropic[Anthropic API<br/>Claude (optional)]
    end
    
    subgraph "Supabase"
        Auth[Supabase Auth<br/>JWT Tokens]
        DB[(PostgreSQL<br/>User Data + Checkpoints)]
        Storage[Storage<br/>Logos, Exports]
    end
    
    subgraph "Monitoring"
        Sentry[Sentry<br/>Error Tracking]
        Grafana[Grafana<br/>Metrics Dashboard]
    end
    
    UI --> CK
    CK --> Static
    CK --> API
    
    API --> Auth
    Auth --> DB
    
    API --> Agent
    Agent --> OpenAI
    Agent --> Anthropic
    Agent --> DB
    Agent --> Storage
    
    API --> Sentry
    Agent --> Grafana
    
    style UI fill:#3B82F6,stroke:#2563EB,stroke-width:2px,color:#fff
    style Agent fill:#8B5CF6,stroke:#7C3AED,stroke-width:2px,color:#fff
    style DB fill:#10B981,stroke:#059669,stroke-width:2px,color:#fff
    style OpenAI fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#fff
```

---

### Infrastructure Components

**Frontend (Vercel)**:
- React app built with Vite
- Deployed to Vercel Edge Network
- Auto-SSL, CDN, instant deploys
- Cost: $20/month (Pro plan)

**Backend (Railway/Fly.io)**:
- Python FastAPI server
- LangGraph agent
- WebSocket support for streaming
- Cost: $30-50/month (depending on usage)

**Supabase**:
- PostgreSQL database (user data, checkpoints)
- Authentication (JWT tokens)
- Storage (logos, exported PDFs)
- Cost: $25/month (Pro plan)

**AI APIs**:
- OpenAI: $0.03/1K tokens (GPT-4)
- Anthropic: $0.015/1K tokens (Claude, optional)
- Average cost: $1.50 per deck

**Monitoring**:
- Sentry: Error tracking, $26/month
- Grafana Cloud: Metrics, $49/month
- Total: $75/month

**Total Monthly Cost**: ~$200-250/month

---

## Diagram 6: Data Flow (Message Lifecycle)

### Purpose
Show complete lifecycle of a founder's message.

### Mermaid Diagram

```mermaid
sequenceDiagram
    autonumber
    
    actor Founder
    participant UI as React UI
    participant Hook as useCoAgent
    participant API as Agent API
    participant Auth as Supabase Auth
    participant LG as LangGraph
    participant DB as PostgreSQL
    participant AI as OpenAI
    
    Founder->>UI: Types "My company is TechCorp"
    UI->>Hook: Send message
    Hook->>API: POST /agent<br/>{messages: [...], state: {...}}
    
    API->>Auth: Validate JWT token
    Auth-->>API: User ID validated
    
    API->>DB: Load checkpoint (thread_id)
    DB-->>API: Return last state
    
    API->>LG: Invoke agent with state + message
    LG->>LG: Run collect_info_node
    
    LG->>AI: Send messages to GPT-4
    AI-->>LG: AI response + extracted data
    
    LG->>LG: Update state (companyName = "TechCorp")
    LG->>LG: Increment completeness (0 → 20%)
    
    LG->>DB: Save new checkpoint
    DB-->>LG: Checkpoint saved
    
    LG->>DB: Insert message to history
    DB-->>LG: Message saved
    
    LG-->>API: Return {messages: [AIMessage(...)], state: {...}}
    API-->>Hook: Stream response
    
    Hook->>UI: Update state (completeness = 20%)
    UI->>Founder: Display AI response<br/>"Great! What problem does TechCorp solve?"
    
    Note over Founder,AI: State persisted, can resume anytime
```

---

### Message Processing Steps

1. **User Input**: Founder types message in React UI
2. **Hook Capture**: `useCoAgent` captures and sends to backend
3. **API Gateway**: FastAPI receives request
4. **Authentication**: Supabase validates JWT token
5. **Load State**: Retrieve last checkpoint from PostgreSQL
6. **Agent Processing**: LangGraph node processes message
7. **AI Invocation**: Send to OpenAI GPT-4
8. **State Update**: Extract data, update completeness
9. **Checkpoint Save**: Persist state to PostgreSQL
10. **Message History**: Save message for audit
11. **Response Streaming**: Stream back to frontend
12. **UI Update**: React re-renders with new state
13. **Display**: Founder sees AI response

**Time**: ~2-3 seconds end-to-end

---

## Diagram 7: Feature Flag & A/B Testing Flow

### Purpose
Show how to gradually roll out new features (e.g., multi-agent).

### Mermaid Diagram

```mermaid
graph TB
    User[User Visits App] --> Check{Feature Flag Check}
    
    Check -->|Control Group 50%| SingleAgent[Single Agent Workflow]
    Check -->|Test Group 50%| MultiAgent[Multi-Agent Workflow]
    
    SingleAgent --> Generate1[Generate Deck]
    MultiAgent --> Generate2[Generate Deck<br/>Content + Design Bots]
    
    Generate1 --> Save1[Save Deck + Metadata]
    Generate2 --> Save2[Save Deck + Metadata]
    
    Save1 --> Track1[Track: variant=control]
    Save2 --> Track2[Track: variant=test]
    
    Track1 --> Analytics[PostHog Analytics]
    Track2 --> Analytics
    
    Analytics --> Measure{Measure Metrics}
    Measure --> Quality[Deck Quality Score]
    Measure --> Time[Generation Time]
    Measure --> Cost[API Cost]
    Measure --> Satisfaction[User Satisfaction]
    
    Quality --> Decision{Better Results?}
    Time --> Decision
    Cost --> Decision
    Satisfaction --> Decision
    
    Decision -->|Yes| Rollout[Roll Out to 100%]
    Decision -->|No| Rollback[Rollback to Single Agent]
    
    style Check fill:#F59E0B,stroke:#D97706,stroke-width:2px
    style Decision fill:#F59E0B,stroke:#D97706,stroke-width:2px
    style Rollout fill:#10B981,stroke:#059669,stroke-width:2px,color:#fff
    style Rollback fill:#EF4444,stroke:#DC2626,stroke-width:2px,color:#fff
```

---

### Feature Flag Implementation

**Frontend (PostHog)**:
```typescript
import { useFeatureFlagEnabled } from 'posthog-js/react';

function PitchDeckWizard() {
  const multiAgentEnabled = useFeatureFlagEnabled('multi-agent-beta');
  
  const agentName = multiAgentEnabled 
    ? 'multi_agent_coordinator' 
    : 'single_agent';
  
  const { state } = useCoAgent({
    name: agentName,
    initialState: { completeness: 0 }
  });
  
  // Track which variant user sees
  useEffect(() => {
    posthog.capture('deck_generation_started', {
      variant: multiAgentEnabled ? 'multi_agent' : 'single_agent'
    });
  }, []);
  
  return <CopilotChat />;
}
```

**Backend (Agent Selection)**:
```python
def get_agent_for_user(user_id: str):
    # Check feature flag
    is_multi_agent = posthog_client.is_feature_enabled(
        "multi-agent-beta",
        user_id
    )
    
    if is_multi_agent:
        return multi_agent_graph
    else:
        return single_agent_graph
```

**Metrics to Track**:
- **Quality**: Founder rating (1-5 stars)
- **Time**: Seconds to generate deck
- **Cost**: Total API spend
- **Satisfaction**: NPS score
- **Conversion**: Pro upgrade rate

---

## Summary: Diagram Usage Guide

| Diagram | Use Case | Audience |
|---------|----------|----------|
| **1. Single-Agent Workflow** | Explain MVP flow to developers | Developers, PMs |
| **2. Multi-Agent Architecture** | Show advanced capabilities to investors | Investors, Technical Users |
| **3. Shared State Architecture** | Debug state sync issues | Developers |
| **4. HITL Flow** | Design approval UX | Designers, Developers |
| **5. Deployment Architecture** | Plan infrastructure | DevOps, CTOs |
| **6. Message Lifecycle** | Optimize performance | Backend Engineers |
| **7. Feature Flag Flow** | Plan gradual rollout | Product Managers, Engineers |

---

**Created**: October 21, 2025  
**Status**: ✅ Complete visual documentation  
**Format**: Mermaid diagrams (render in GitHub, Markdown viewers)  
**Next**: Use diagrams in presentations, documentation, and onboarding

---

## Navigation

**Previous**: [06-pitch-deck-outline.md](./06-pitch-deck-outline.md) - Investor Pitch  
**Next**: [00-INDEX.md](./00-INDEX.md) - Back to Index  
**Index**: [00-INDEX.md](./00-INDEX.md)

---

*These diagrams provide production-quality visual documentation for the AI pitch deck generator architecture, workflows, and data flows powered by CopilotKit + LangGraph with standardized color coding and cross-references.*


