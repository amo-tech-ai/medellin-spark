# Mermaid Diagrams - AI Pitch Deck System

**Date**: October 17, 2025
**Project**: Medellin Spark Architecture Visualization
**Focus**: 6 comprehensive Mermaid diagrams for system understanding

---

## Table of Contents

- [Diagram 1: System Architecture Flow](#diagram-1-system-architecture-flow)
- [Diagram 2: Multi-Agent Collaboration Sequence](#diagram-2-multi-agent-collaboration-sequence)
- [Diagram 3: User Journey Map](#diagram-3-user-journey-map)
- [Diagram 4: Database Entity Relationship](#diagram-4-database-entity-relationship)
- [Diagram 5: Conversation State Machine](#diagram-5-conversation-state-machine)
- [Diagram 6: Feature Integration Map](#diagram-6-feature-integration-map)

---

## Diagram 1: System Architecture Flow

**Purpose**: End-to-end flow from user prompt to exported deck

```mermaid
flowchart TB
    Start([User Visits Platform]) --> Auth{Authenticated?}
    Auth -->|No| Login[Sign In / Sign Up]
    Auth -->|Yes| Dashboard[Dashboard]
    Login --> Dashboard

    Dashboard --> Choice{Choose Mode}
    Choice -->|Conversational| Conv[Start Conversation]
    Choice -->|Upload PDF| Upload[Upload Document]
    Choice -->|Template| Template[Select Template]

    Conv --> Chat[Chat Interface]
    Chat --> Message[User Message]
    Message --> EdgeFunc1[pitch-deck-assistant<br/>Edge Function]
    EdgeFunc1 --> GPT5[GPT-5 mini<br/>Function Calling]
    GPT5 --> Extract[Extract Data]
    Extract --> DB1[(Supabase<br/>pitch_conversations)]
    DB1 --> Progress{Completeness<br/>= 100%?}
    Progress -->|No| Chat
    Progress -->|Yes| GenButton[Generate Button<br/>Appears]

    Upload --> PDFParse[PDF Text Extraction]
    PDFParse --> AIAnalyze[AI Content Analysis]
    AIAnalyze --> GenButton

    Template --> TemplateSelect[Choose Template]
    TemplateSelect --> BriefInput[Enter Company Brief]
    BriefInput --> GenButton

    GenButton --> Generate[User Clicks Generate]
    Generate --> EdgeFunc2[generate-pitch-deck<br/>Edge Function]
    EdgeFunc2 --> GPT5Gen[GPT-5 mini<br/>JSON Mode]
    GPT5Gen --> Deck[10-Slide Deck<br/>Generated]
    Deck --> DB2[(Supabase<br/>presentations)]
    DB2 --> Outline[Outline Editor]

    Outline --> Review{User<br/>Approves?}
    Review -->|No| Edit[Slide Editor]
    Review -->|Yes| Export{Export<br/>Format?}

    Edit --> AISuggestions[AI Suggestions<br/>Panel]
    AISuggestions --> WebSearch[Web Search<br/>for Data]
    WebSearch --> EditLoop[Edit Slides]
    EditLoop --> Autosave[(Auto-save<br/>to Supabase)]
    Autosave --> Export

    Export -->|PPTX| ExportPPTX[pptxgenjs<br/>Export]
    Export -->|PDF| ExportPDF[jsPDF +<br/>html2canvas]
    Export -->|Interactive| ExportHTML[reveal.js<br/>HTML]

    ExportPPTX --> Download([Download File])
    ExportPDF --> Download
    ExportHTML --> Share([Share Link])

    Download --> End([User Pitches<br/>Investors])
    Share --> End

    style Start fill:#e1f5e1
    style End fill:#ffe1e1
    style GPT5 fill:#fff4e1
    style GPT5Gen fill:#fff4e1
    style DB1 fill:#e1e5ff
    style DB2 fill:#e1e5ff
    style Autosave fill:#e1e5ff
```

---

## Diagram 2: Multi-Agent Collaboration Sequence

**Purpose**: Shows how multiple AI agents collaborate in Deep Research Mode (UC-7)

```mermaid
sequenceDiagram
    participant U as User
    participant O as Orchestrator
    participant R as Research Agent
    participant A as Analysis Agent
    participant W as Writer Agent
    participant V as Reviewer Agent
    participant DB as Database

    U->>O: Request "Deep Research Deck"<br/>(Company: EduTech AI)
    activate O

    Note over O: Initialize Multi-Agent Workflow
    O->>R: Activate Research Phase
    activate R

    R->>R: Search Web<br/>(Firecrawl API)
    R-->>O: Market size: $7.3T<br/>Competitors: 8 found<br/>Trends: AI tutoring +40% YoY
    deactivate R

    O->>A: Activate Analysis Phase<br/>(Pass research data)
    activate A

    A->>A: Synthesize Insights<br/>(GPT-5 mini)
    A->>A: Identify Market Gaps
    A->>A: Create Competitive Matrix
    A-->>O: Gap: Personalized K-12<br/>Differentiation: AI adaptation<br/>Matrix: 3x3 comparison
    deactivate A

    O->>W: Activate Writer Phase<br/>(Pass analysis + research)
    activate W

    W->>W: Generate Slide Outline<br/>(10 slides)
    W->>W: Create Content<br/>(Headlines + Bullets)
    W->>W: Add Citations<br/>(18 sources)
    W->>DB: Save Draft Deck
    W-->>O: Deck v1 Generated
    deactivate W

    O->>V: Activate Reviewer Phase<br/>(Pass deck v1)
    activate V

    V->>V: Score Deck<br/>(PPTEval Framework)
    V->>V: Check Criteria<br/>(Problem: 9, Solution: 8,<br/>Market: 7, Team: 6...)
    V-->>O: Overall Score: 78/100<br/>Issues: Market data weak,<br/>Team slide missing advisors
    deactivate V

    O->>W: Re-activate Writer<br/>(Apply feedback)
    activate W

    W->>W: Strengthen Market Slide<br/>(Add Gartner data)
    W->>W: Update Team Slide<br/>(Add 2 advisors)
    W->>DB: Save Deck v2
    W-->>O: Deck v2 Generated
    deactivate W

    O->>V: Re-activate Reviewer<br/>(Score v2)
    activate V

    V->>V: Re-score Deck
    V-->>O: New Score: 92/100<br/>✅ Approved
    deactivate V

    O->>U: Deck Ready<br/>Score: 92/100<br/>Citations: 18 sources
    deactivate O

    U->>DB: Export as PPTX
    DB-->>U: Download deck_v2.pptx

    Note over U,DB: Total Time: 18 minutes<br/>(vs 2 weeks manual research)
```

---

## Diagram 3: User Journey Map

**Purpose**: Visual representation of founder journey with emotional states (based on Sarah's journey from JOURNEYS.md)

```mermaid
journey
    title First-Time Founder Creates Pitch Deck (Sarah's Journey)
    section Discovery
      Google search "pitch deck": 3: Anxious
      Find Medellin Spark: 5: Hopeful
      Create account: 6: Interested
    section Data Collection
      Start conversation: 7: Engaged
      Answer 6 questions: 8: Excited
      See 100% progress: 9: Amazed
    section Generation
      Click "Generate Deck": 9: Anticipating
      See 10 slides created: 10: Thrilled
      Review outline: 9: Impressed
    section Editing
      Open slide editor: 8: Focused
      Use AI suggestions: 9: Confident
      Add team photos: 8: Polishing
    section Export
      Export as PPTX: 9: Ready
      Practice pitch: 8: Nervous
      First investor meeting: 7: Anxious
    section Success
      Second meeting feedback: 8: Encouraged
      Personalize for investor: 9: Strategic
      Get funding commitment: 10: Ecstatic
```

---

## Diagram 4: Database Entity Relationship

**Purpose**: Shows Supabase database schema for pitch deck system

```mermaid
erDiagram
    profiles ||--o{ presentations : creates
    profiles ||--o{ pitch_conversations : has
    profiles ||--o{ custom_themes : owns
    profiles ||--o{ favorite_presentations : favorites

    presentations ||--|{ presentation_slides : contains
    presentations }o--|| presentation_templates : "based on"
    presentations }o--o| custom_themes : "uses theme"

    pitch_conversations ||--|{ conversation_messages : contains

    profiles {
        uuid id PK
        uuid user_id FK "references auth.users"
        string email
        string full_name
        string avatar_url
        jsonb preferences
        timestamp created_at
        timestamp updated_at
    }

    presentations {
        uuid id PK
        uuid profile_id FK
        string title
        string category "pitch-deck, business-plan, etc"
        string status "draft, completed, archived"
        jsonb metadata
        uuid template_id FK
        uuid theme_id FK
        int slide_count
        timestamp created_at
        timestamp updated_at
    }

    presentation_slides {
        uuid id PK
        uuid presentation_id FK
        int slide_order
        string layout "title_content, two_column, etc"
        jsonb content "headline, bullets, notes, images"
        timestamp created_at
        timestamp updated_at
    }

    pitch_conversations {
        uuid id PK
        uuid profile_id FK
        int completeness "0-100%"
        jsonb collected_data
        string status "active, completed"
        timestamp created_at
        timestamp updated_at
    }

    conversation_messages {
        uuid id PK
        uuid conversation_id FK
        string role "user, assistant"
        text message
        jsonb metadata "function calls, suggestions"
        timestamp created_at
    }

    presentation_templates {
        uuid id PK
        string name "YC Seed, Bold Modern, etc"
        string description
        jsonb structure "slide layouts"
        jsonb styling "colors, fonts"
        boolean is_public
        timestamp created_at
    }

    custom_themes {
        uuid id PK
        uuid profile_id FK
        string name
        jsonb colors "primary, secondary, accent"
        jsonb fonts "heading, body"
        jsonb branding "logo, watermark"
        timestamp created_at
    }

    favorite_presentations {
        uuid id PK
        uuid profile_id FK
        uuid presentation_id FK
        timestamp created_at
    }
```

---

## Diagram 5: Conversation State Machine

**Purpose**: State transitions during conversational deck creation

```mermaid
stateDiagram-v2
    [*] --> Initial: User starts conversation

    Initial --> AskingQuestion: AI asks first question
    AskingQuestion --> WaitingResponse: Waiting for user input

    WaitingResponse --> Processing: User responds
    Processing --> ExtractingData: GPT-5 mini processes
    ExtractingData --> SavingData: Function call to save_startup_data

    SavingData --> CheckCompleteness: Check progress %

    CheckCompleteness --> AskingQuestion: < 100%<br/>(Continue conversation)
    CheckCompleteness --> DataComplete: 100%<br/>(All fields collected)

    DataComplete --> ShowSummary: Display collected data
    ShowSummary --> WaitingApproval: Generate button appears

    WaitingApproval --> EditData: User edits data
    EditData --> DataComplete

    WaitingApproval --> Generating: User clicks Generate
    Generating --> DeckCreated: GPT-5 mini creates 10 slides

    DeckCreated --> [*]: Redirect to Outline Editor

    note right of AskingQuestion
        Progress: 0% → 17% → 33%<br/>
        → 50% → 67% → 83% → 100%
    end note

    note right of ExtractingData
        Function Calling:<br/>
        {<br/>
          company_name: "EduTech AI",<br/>
          problem: "...",<br/>
          solution: "..."<br/>
        }
    end note
```

---

## Diagram 6: Feature Integration Map

**Purpose**: Shows how different features and services integrate

```mermaid
graph TB
    subgraph Frontend ["Frontend (React + TypeScript)"]
        Dashboard[Dashboard]
        ChatUI[Chat Interface]
        SlideEditor[Slide Editor]
        OutlineEditor[Outline Editor]
        Viewer[Presentation Viewer]
    end

    subgraph Backend ["Supabase Backend"]
        Auth[Authentication]
        DB[(PostgreSQL<br/>with RLS)]
        Realtime[Real-time<br/>Subscriptions]
        Storage[File Storage]
        Functions[Edge Functions]
    end

    subgraph EdgeFunctions ["Edge Functions (Deno)"]
        PitchAssistant["pitch-deck-assistant<br/>(Conversation)"]
        GenDeck["generate-pitch-deck<br/>(Deck Gen)"]
    end

    subgraph ExternalAPIs ["External APIs"]
        OpenAI["OpenAI API<br/>(GPT-5 mini)"]
        Unsplash["Unsplash<br/>(Images)"]
        WebSearch["Firecrawl<br/>(Web Search)"]
        ElevenLabs["ElevenLabs<br/>(Voice)"]
    end

    subgraph Export ["Export Tools"]
        PPTX["pptxgenjs<br/>(PowerPoint)"]
        PDF["jsPDF<br/>(PDF)"]
        RevealJS["reveal.js<br/>(Interactive)"]
    end

    %% Frontend to Backend
    Dashboard --> Auth
    ChatUI --> Auth
    ChatUI --> Realtime
    SlideEditor --> Realtime
    OutlineEditor --> DB
    Viewer --> DB

    %% Backend to Edge Functions
    ChatUI --> PitchAssistant
    Dashboard --> GenDeck

    %% Edge Functions to External APIs
    PitchAssistant --> OpenAI
    GenDeck --> OpenAI
    SlideEditor --> WebSearch
    SlideEditor --> Unsplash

    %% Database Storage
    PitchAssistant --> DB
    GenDeck --> DB
    SlideEditor --> Storage

    %% Export Paths
    Viewer --> PPTX
    Viewer --> PDF
    Viewer --> RevealJS

    %% Future Features (dotted lines)
    GenDeck -.-> ElevenLabs

    style Frontend fill:#e1f5e1
    style Backend fill:#e1e5ff
    style EdgeFunctions fill:#fff4e1
    style ExternalAPIs fill:#ffe1f0
    style Export fill:#f0e1ff
```

---

## Additional Diagrams (Optional Reference)

### Diagram 7: Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant S as Supabase Auth
    participant DB as Database

    U->>F: Click "Sign In with Google"
    F->>S: OAuth request
    S->>U: Redirect to Google
    U->>S: Approve (Google login)
    S->>F: Return JWT token
    F->>DB: Query profile (user_id)

    alt Profile Exists
        DB-->>F: Return profile data
        F->>U: Show Dashboard
    else Profile Missing
        F->>DB: Create profile (auto-trigger)
        DB-->>F: Profile created
        F->>U: Show Onboarding
    end
```

### Diagram 8: Real-Time Collaboration

```mermaid
sequenceDiagram
    participant U1 as User 1 (Founder)
    participant U2 as User 2 (Co-founder)
    participant RT as Supabase Real-time
    participant DB as Database

    U1->>RT: Subscribe to presentation_id
    U2->>RT: Subscribe to same presentation_id

    Note over U1,U2: Both users see same deck

    U1->>DB: Edit Slide 3 (change headline)
    DB->>RT: Broadcast update
    RT->>U2: Push change to User 2

    Note over U2: Slide 3 updates in real-time

    U2->>DB: Edit Slide 7 (add bullet)
    DB->>RT: Broadcast update
    RT->>U1: Push change to User 1

    Note over U1: Slide 7 updates in real-time

    Note over U1,U2: No conflicts (different slides)
```

### Diagram 9: Multi-Deck Personalization Workflow

```mermaid
flowchart LR
    Master[Master Deck<br/>10 slides] --> Select{Select<br/>Investor}

    Select -->|Sequoia| Research1[Research Sequoia<br/>Portfolio + Thesis]
    Select -->|a16z| Research2[Research a16z<br/>Portfolio + Thesis]
    Select -->|Benchmark| Research3[Research Benchmark<br/>Portfolio + Thesis]

    Research1 --> AI1[AI Personalization:<br/>Focus on SaaS metrics,<br/>ARR, B2B]
    Research2 --> AI2[AI Personalization:<br/>Focus on consumer growth,<br/>DAU, viral loops]
    Research3 --> AI3[AI Personalization:<br/>Focus on product-led,<br/>self-serve funnel]

    AI1 --> Deck1[Sequoia Version<br/>Slide 7: ARR Growth]
    AI2 --> Deck2[a16z Version<br/>Slide 7: User Growth]
    AI3 --> Deck3[Benchmark Version<br/>Slide 7: Conversion Funnel]

    Deck1 --> Export1[Export PPTX]
    Deck2 --> Export2[Export PPTX]
    Deck3 --> Export3[Export PPTX]

    style Master fill:#e1f5e1
    style Deck1 fill:#fff4e1
    style Deck2 fill:#fff4e1
    style Deck3 fill:#fff4e1
```

---

## Diagram Usage Guide

### For Developers
- **Diagram 1** (Architecture Flow): Understand overall system flow
- **Diagram 4** (ER Diagram): Database schema reference
- **Diagram 5** (State Machine): Implement conversation logic
- **Diagram 6** (Integration Map): Service dependencies

### For Product Managers
- **Diagram 3** (User Journey): User experience optimization
- **Diagram 2** (Multi-Agent): Advanced feature understanding
- **Diagram 9** (Personalization): Feature specification

### For Stakeholders
- **Diagram 1** (Architecture): High-level overview
- **Diagram 3** (User Journey): User satisfaction metrics
- **Diagram 6** (Integration): Technology stack

---

## Mermaid Rendering

These diagrams can be rendered in:
- **GitHub** (automatic Mermaid support)
- **Notion** (import as code blocks)
- **Obsidian** (with Mermaid plugin)
- **VS Code** (with Markdown Preview Mermaid Support extension)
- **Online**: [Mermaid Live Editor](https://mermaid.live)

---

**Prepared by**: Claude AI (Sonnet 4.5)
**Last Updated**: October 17, 2025
