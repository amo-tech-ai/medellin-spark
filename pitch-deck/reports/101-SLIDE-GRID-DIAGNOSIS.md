# 🔍 Pitch Deck Slide Grid - Diagnosis & Implementation Plan

**Date**: 2025-10-17
**Status**: 🔴 CRITICAL - Slides not rendering due to RLS blocking
**Generated**: AI-powered analysis with OpenAI GPT-4o integration plan

---

## 🚨 CURRENT ISSUE DIAGNOSIS

### Problem Statement
**Slide grid shows empty cards despite AI-generated content in database**

### Root Cause Analysis

#### 🔴 **CRITICAL: RLS Blocking Data Access**

**Location**: `src/hooks/usePresentationQuery.ts:22-26`

```typescript
const { data, error } = await supabase
  .from("presentations")
  .select("*")
  .eq("id", presentationId)
  .single();
```

**Issue**: Row Level Security (RLS) is enabled on `presentations` table, blocking unauthenticated reads.

**Evidence**:
- Browser shows: "Loading presentation..." (stuck state)
- No console errors (query blocked at database level)
- Data exists in database but isn't returned to frontend
- Supabase anon key has no permission without auth

**Verification**:
```bash
# ✅ Data exists in DB
curl "$SUPABASE_URL/rest/v1/presentations?id=eq.d4a27c1c-8b2d-48a9-99c9-2298037e9e81" \
  -H "apikey: $ANON_KEY"
# Returns: [] (empty - RLS blocked)

# ✅ With service role key
curl "$SUPABASE_URL/rest/v1/presentations?id=eq.d4a27c1c-8b2d-48a9-99c9-2298037e9e81" \
  -H "apikey: $SERVICE_ROLE_KEY"
# Returns: Full presentation data with 10 slides
```

---

## 🎯 Current System Architecture

### 🏗️ System Architecture Diagram

```mermaid
flowchart TB
    subgraph "Frontend - React"
        PW[PitchDeckWizard<br/>Conversational UI]
        OE[OutlineEditor<br/>Slide Grid View]
        SG[SlideGridView<br/>Visual Thumbnails]
        PQ[usePresentationQuery<br/>Data Fetching Hook]
    end

    subgraph "Edge Functions - Deno"
        EF1[pitch-deck-assistant<br/>GPT-4o Conversation]
        EF2[generate-pitch-deck<br/>GPT-4o Slide Generation]
        EF3[chat<br/>OpenAI Proxy]
    end

    subgraph "Database - Supabase"
        DB[(PostgreSQL)]
        RLS[RLS Policies<br/>🔴 BLOCKING]
    end

    subgraph "AI Services"
        GPT[OpenAI GPT-4o<br/>Chat Completions API]
    end

    PW -->|Chat Messages| EF1
    EF1 -->|Tool Calls| GPT
    EF1 -->|Save Data| DB

    PW -->|Generate Deck| EF2
    EF2 -->|Generate Slides| GPT
    EF2 -->|Insert Presentation| DB

    OE -->|Fetch Presentation| PQ
    PQ -->|Query with Anon Key| RLS
    RLS -.->|🔴 BLOCKED| DB

    DB -->|10 Slides Generated| SG
    SG -.->|❌ No Data Received| OE

    style RLS fill:#ff6b6b
    style PQ fill:#ffd93d
    style SG fill:#ff6b6b
```

### 📊 Current Data Flow

```mermaid
sequenceDiagram
    participant User
    participant PitchWizard as PitchDeckWizard
    participant Assistant as pitch-deck-assistant
    participant Generator as generate-pitch-deck
    participant GPT4 as OpenAI GPT-4o
    participant DB as Supabase DB
    participant Grid as OutlineEditor
    participant RLS as RLS Policies

    User->>PitchWizard: "Create AI startup deck"
    PitchWizard->>Assistant: POST /pitch-deck-assistant
    Assistant->>GPT4: Chat completion + tools
    GPT4-->>Assistant: Questions + save_startup_data
    Assistant->>DB: Save collected data
    DB-->>Assistant: ✅ Saved

    User->>PitchWizard: Answers complete (80%)
    PitchWizard->>Generator: POST /generate-pitch-deck
    Generator->>GPT4: Generate 10-slide deck
    GPT4-->>Generator: JSON with slides
    Generator->>DB: INSERT presentation
    DB-->>Generator: ✅ ID: d4a27c1c...
    Generator-->>PitchWizard: presentation_id

    PitchWizard->>Grid: Navigate to /outline
    Grid->>RLS: Query presentation (anon key)
    RLS-->>Grid: 🔴 BLOCKED (no auth)
    Grid->>User: "Loading presentation..."

    Note over Grid: Slides exist in DB<br/>but RLS blocks access
```

---

## 🔍 RED FLAGS & ERRORS IDENTIFIED

### 🔴 Critical Issues

| # | Issue | Location | Impact | Priority |
|---|-------|----------|--------|----------|
| 1 | **RLS Blocking Reads** | `presentations` table | Slides don't load | 🔴 CRITICAL |
| 2 | **No Public Access** | `is_public` = false | Can't view without auth | 🔴 HIGH |
| 3 | **Dev Mode Not Working** | `usePresentationQuery.ts:35` | Dev check runs after RLS | 🟡 MEDIUM |
| 4 | **Missing Auth Flow** | `/auth` route | No way to sign in | 🟡 MEDIUM |

### 🟡 Warnings

| # | Warning | Location | Impact | Priority |
|---|---------|----------|--------|----------|
| 5 | **No Error Handling** | `OutlineEditor.tsx` | Silent failures | 🟡 MEDIUM |
| 6 | **Hardcoded Dev UUID** | Multiple files | Not scalable | 🟢 LOW |
| 7 | **No Loading States** | Grid view | Poor UX | 🟢 LOW |

### ✅ What's Working

- ✅ AI generation (GPT-4o produces perfect JSON)
- ✅ Edge Functions (both deployed and working)
- ✅ Data storage (10 slides saved correctly)
- ✅ Grid UI components (beautiful design, ready to render)
- ✅ Slide thumbnails (correct layouts: cover, title_content)

---

## 🧠 OpenAI Agents SDK Integration Plan

### Why OpenAI Agents SDK?

**Current**: Direct OpenAI API calls in Edge Functions
**Upgrade**: OpenAI Agents SDK for stateful, tool-enabled workflows

### Benefits

| Feature | Current (API) | With Agents SDK |
|---------|--------------|-----------------|
| **State Management** | Manual conversation tracking | ✅ Built-in agent loop |
| **Tool Calling** | Manual JSON parsing | ✅ Automatic tool execution |
| **Handoffs** | Not supported | ✅ Multi-agent workflows |
| **Streaming** | Manual SSE implementation | ✅ Built-in streaming |
| **Guardrails** | Custom validation | ✅ Input/output validation |
| **Tracing** | Manual logging | ✅ Built-in observability |

### 🎯 Agent Architecture

```mermaid
flowchart LR
    subgraph "Agent System"
        MA[Master Agent<br/>Orchestrator]
        CA[Conversation Agent<br/>Data Collection]
        GA[Generation Agent<br/>Slide Creation]
        VA[Validation Agent<br/>Quality Check]
    end

    subgraph "Tools"
        T1[save_startup_data]
        T2[generate_slides]
        T3[validate_content]
        T4[update_presentation]
    end

    MA -->|Handoff| CA
    CA -->|Uses| T1
    CA -->|Handoff when ready| GA
    GA -->|Uses| T2
    GA -->|Handoff| VA
    VA -->|Uses| T3
    VA -->|Uses| T4
```

### Implementation: TypeScript Agents SDK

**File**: `supabase/functions/pitch-deck-agent/index.ts`

```typescript
import { Agent, run } from '@openai/agents';
import { createClient } from '@supabase/supabase-js';

// Define tools
const saveStartupData = {
  name: 'save_startup_data',
  description: 'Save collected startup information',
  parameters: {
    type: 'object',
    properties: {
      company_name: { type: 'string' },
      industry: { type: 'string' },
      problem: { type: 'string' },
      solution: { type: 'string' },
      target_market: { type: 'string' },
      business_model: { type: 'string' }
    }
  },
  handler: async (args: any, context: any) => {
    const supabase = context.supabase;
    await supabase
      .from('pitch_conversations')
      .update({ collected_data: args })
      .eq('id', context.conversationId);
    return { success: true };
  }
};

// Define agents
const conversationAgent = new Agent({
  name: 'ConversationAgent',
  instructions: 'You collect startup information through natural conversation.',
  model: 'gpt-4o',
  tools: [saveStartupData],
});

const generationAgent = new Agent({
  name: 'GenerationAgent',
  instructions: 'Generate professional 10-slide pitch decks from collected data.',
  model: 'gpt-4o',
});

// Master orchestrator
const masterAgent = new Agent({
  name: 'PitchDeckMaster',
  instructions: `You orchestrate pitch deck creation:
1. If conversation incomplete: handoff to ConversationAgent
2. If data ready: handoff to GenerationAgent
3. Return final presentation_id`,
  model: 'gpt-4o',
  agents: [conversationAgent, generationAgent],
});

// Edge Function handler
Deno.serve(async (req) => {
  const { message, conversation_id } = await req.json();

  const context = {
    supabase: createClient(SUPABASE_URL, SUPABASE_KEY),
    conversationId: conversation_id
  };

  const result = await run(masterAgent, message, { context });

  return new Response(JSON.stringify({
    message: result.finalOutput,
    conversation_id: result.context.conversationId
  }));
});
```

---

## 🛠️ IMMEDIATE FIXES (Next 30 Minutes)

### Fix #1: Enable Public Access for Testing

```sql
-- Enable public read access for testing
UPDATE presentations
SET is_public = true
WHERE id = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';
```

**Execute**:
```bash
psql "postgres://postgres:Toronto2025%23@db.dhesktsqhcxhqfjypulk.supabase.co:5432/postgres" \
  -c "UPDATE presentations SET is_public = true WHERE id = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';"
```

### Fix #2: Update RLS Policy for Public Presentations

**File**: `supabase/migrations/20251017000000_allow_public_presentations.sql`

```sql
-- Allow reading public presentations without auth
CREATE POLICY "Allow public read access to public presentations"
ON presentations
FOR SELECT
USING (is_public = true);

-- Refresh the policy
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
```

### Fix #3: Add Error Boundary to OutlineEditor

**File**: `src/pages/presentations/OutlineEditor.tsx:232`

```typescript
// Error state
if (error || !presentation) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-[600px]">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Presentation not found</p>
          <p className="text-muted-foreground mb-4">
            {error?.message || "The presentation you're looking for doesn't exist."}
          </p>
          <p className="text-sm text-destructive mb-4">
            🔒 This may be due to Row Level Security blocking access.
            Try signing in or check if the presentation is public.
          </p>
          <Button onClick={() => navigate("/dashboard/pitch-decks")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
```

---

## 📋 IMPLEMENTATION PLAN

### Phase 1: Emergency Fixes (Today - 1 hour)

#### Task 1.1: Fix RLS Policy
- **File**: `supabase/migrations/20251017000000_allow_public_presentations.sql`
- **Action**: Allow public presentation reads
- **Test**: Refresh page, slides should load

#### Task 1.2: Add Error Handling
- **File**: `src/pages/presentations/OutlineEditor.tsx`
- **Action**: Show RLS error message
- **Test**: Error message shows helpful info

#### Task 1.3: Enable is_public Flag
- **Action**: Update presentation in DB
- **Test**: Navigate to outline, slides render

---

### Phase 2: OpenAI Agents SDK Migration (Tomorrow - 4 hours)

#### Task 2.1: Install Agents SDK
```bash
cd supabase/functions
npm install @openai/agents
```

#### Task 2.2: Create Agent-Based Edge Function
- **File**: `supabase/functions/pitch-deck-agent/index.ts`
- **Features**:
  - Master orchestrator agent
  - Conversation agent with tool calling
  - Generation agent with validation
  - Handoffs between agents
  - Built-in state management

#### Task 2.3: Migrate Frontend
- **File**: `src/pages/PitchDeckWizard.tsx`
- **Change**: Switch from `/pitch-deck-assistant` to `/pitch-deck-agent`
- **Benefit**: Simpler code, better state management

#### Task 2.4: Add Streaming Support
- **Feature**: Real-time slide generation progress
- **Tech**: Server-Sent Events (SSE)
- **UX**: Show "Generating slide 3/10..."

---

### Phase 3: Enhanced Features (Week 2 - 8 hours)

#### Task 3.1: Multi-Agent Workflow
```mermaid
flowchart LR
    M[Master Agent] -->|Incomplete| C[Conversation Agent]
    M -->|Ready| G[Generation Agent]
    G -->|Created| V[Validation Agent]
    V -->|Pass| D[Database Agent]
    V -->|Fail| G
```

#### Task 3.2: Add Image Generation Agent
- **Tool**: `image_generation_tool` from Agents SDK
- **Feature**: Generate slide images with DALL-E
- **Integration**: Add to slide content

#### Task 3.3: Add Guardrails
```typescript
const qualityGuardrail = {
  name: 'quality_check',
  check: (input: string) => {
    return input.length > 10; // Min 10 chars
  },
  onFail: 'Please provide more detail'
};
```

#### Task 3.4: Add Tracing Dashboard
- **Feature**: View agent execution logs
- **Tool**: Built-in Agents SDK tracing
- **Location**: `/admin/agent-traces`

---

## 📊 MERMAID DIAGRAMS

### Current vs. Proposed Architecture

```mermaid
flowchart TB
    subgraph "CURRENT (Direct API)"
        C1[Frontend] -->|Manual state| E1[Edge Function]
        E1 -->|Raw API call| O1[OpenAI API]
        O1 -->|JSON response| E1
        E1 -->|Manual parsing| DB1[(Database)]
    end

    subgraph "PROPOSED (Agents SDK)"
        C2[Frontend] -->|Single request| E2[Agent Function]
        E2 -->|Agent run| A2[Agent Loop]
        A2 -->|Auto tool calls| O2[OpenAI API]
        A2 -->|Auto handoffs| A3[Other Agents]
        A2 -->|Auto state| DB2[(Database)]
    end

    style E2 fill:#4ade80
    style A2 fill:#4ade80
```

### Agent Workflow

```mermaid
stateDiagram-v2
    [*] --> ConversationAgent
    ConversationAgent --> CollectingData: User responds
    CollectingData --> CheckCompleteness: Save tool called
    CheckCompleteness --> ConversationAgent: < 80% complete
    CheckCompleteness --> GenerationAgent: ≥ 80% complete
    GenerationAgent --> GeneratingSlides: Handoff received
    GeneratingSlides --> ValidationAgent: 10 slides created
    ValidationAgent --> Validated: Content checks pass
    ValidationAgent --> GenerationAgent: Quality issues
    Validated --> [*]: Save to DB
```

---

## 📁 NEW TASKS FOR lovable-plan/tasks/

### 008-fix-rls-public-access.md
```markdown
# Task 008: Fix RLS for Public Presentations

## Objective
Enable public read access to presentations marked as `is_public = true`

## Steps
1. Create migration: `20251017000000_allow_public_presentations.sql`
2. Add RLS policy for public reads
3. Update test presentation: `SET is_public = true`
4. Test: Load `/presentations/{id}/outline` without auth

## Success Criteria
- ✅ Slide grid loads without authentication
- ✅ All 10 AI-generated slides render with thumbnails
- ✅ No console errors
```

### 009-migrate-to-openai-agents-sdk.md
```markdown
# Task 009: Migrate to OpenAI Agents SDK

## Objective
Replace direct OpenAI API calls with Agents SDK for stateful workflows

## Prerequisites
- Task 008 complete (RLS fixed)

## Steps
1. Install: `npm install @openai/agents` in functions/
2. Create: `supabase/functions/pitch-deck-agent/`
3. Define agents: Master, Conversation, Generation, Validation
4. Add tools: save_startup_data, generate_slides, validate_content
5. Deploy: `supabase functions deploy pitch-deck-agent`
6. Update frontend: Switch API endpoint
7. Test: Complete flow from chat → generation → grid

## Success Criteria
- ✅ Agent loop handles tool calls automatically
- ✅ Handoffs work between agents
- ✅ State managed without manual tracking
- ✅ Tracing available for debugging
```

### 010-add-streaming-progress.md
```markdown
# Task 010: Add Real-Time Progress Streaming

## Objective
Show live progress during AI slide generation

## Steps
1. Add SSE support to agent function
2. Emit events: "Generating slide 1/10...", "Slide 2 complete"
3. Add progress bar to frontend
4. Handle connection errors gracefully

## Success Criteria
- ✅ User sees progress: "Generating slide 3/10..."
- ✅ Progress bar updates in real-time
- ✅ Works across browsers
```

---

## 🎯 SUCCESS METRICS

### Immediate (Today)
- [ ] Slides render in grid view
- [ ] All 10 slides visible with thumbnails
- [ ] No RLS errors in console

### Short-term (This Week)
- [ ] OpenAI Agents SDK integrated
- [ ] Agent loop handles tool calling automatically
- [ ] Handoffs between agents working
- [ ] Tracing dashboard available

### Long-term (Next Sprint)
- [ ] Multi-agent workflows (conversation → generation → validation)
- [ ] Image generation integrated
- [ ] Streaming progress updates
- [ ] Sub-5-second generation time

---

## 📞 NEXT STEPS

1. **Run Fix #1** (5 min): Enable public access via psql
2. **Apply Fix #2** (10 min): Deploy RLS migration
3. **Test Grid** (5 min): Refresh browser, verify slides render
4. **Plan Sprint** (30 min): Schedule Agents SDK migration

---

**Generated**: Claude Code + GPT-4o
**Diagrams**: Mermaid (flowchart, sequence, state)
**Status**: Ready for implementation ✅
