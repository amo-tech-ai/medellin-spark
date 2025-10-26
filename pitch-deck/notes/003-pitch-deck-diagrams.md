# 003 - Pitch Deck Generator Diagrams

> **Visual Reference Document**  
> **Purpose**: Comprehensive diagrams showing architecture, flows, and system design  
> **Status**: 📊 Complete Visual Documentation

---

## 📋 Table of Contents

1. [Architecture Diagrams](#architecture-diagrams)
2. [Process Flows](#process-flows)
3. [User Journeys](#user-journeys)
4. [Data Flow Diagrams](#data-flow-diagrams)
5. [Database Schema](#database-schema)
6. [Sequence Diagrams](#sequence-diagrams)
7. [Integration Diagrams](#integration-diagrams)

---

## Architecture Diagrams

### Target System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[CopilotKit UI<br/>Next.js]
        B[Presentation Editor<br/>Slide Management]
        C[Template Selector<br/>UI Components]
    end
    
    subgraph "Backend Agents (Blaxel)"
        D[Supervisor Agent<br/>Orchestration]
        E[Content Generation Agent<br/>AI Content]
        F[Template Agent<br/>Template Management]
        G[Export Agent<br/>PPTX Generation]
    end
    
    subgraph "External Services"
        H[OpenAI API<br/>Content Generation]
        I[Google Gemini<br/>Multi-Provider AI]
        J[DALL-E<br/>Image Generation]
    end
    
    subgraph "Template System"
        K[Template Storage<br/>React Components]
        L[Schema Validation<br/>Zod Schemas]
        M[Custom Templates<br/>Runtime Compilation]
    end
    
    A --> D
    B --> D
    C --> F
    D --> E
    D --> F
    D --> G
    E --> H
    E --> I
    E --> J
    F --> K
    F --> L
    F --> M
    G --> K
```

### Routes Architecture

```mermaid
graph TD
    A[Home Page] --> B[/pitch-deck<br/>Landing Page]
    B --> C[/pitch-deck-wizard<br/>AI Wizard]
    C --> D[Dashboard<br/>Pitch Decks]
    D --> E[/presentations/:id/outline<br/>Outline Editor]
    D --> F[/presentations/:id/edit<br/>Slide Editor]
    D --> G[/presentations/:id/view<br/>Viewer]
    
    style B fill:#e1f5e1
    style C fill:#fff4e1
    style D fill:#e1f5ff
    style E fill:#ffe1f5
    style F fill:#ffe1f5
    style G fill:#f5e1ff
```

---

## Process Flows

### Complete System Data Flow

```mermaid
flowchart TD
    Start([User Starts Chat]) --> Input[User Provides Requirements]
    Input --> Supervisor[Supervisor Agent]
    
    Supervisor --> Analyze{Analyze Request}
    Analyze --> ContentNeeded[Content Agent]
    Analyze --> TemplateNeeded[Template Agent]
    Analyze --> ExportNeeded[Export Agent]
    
    ContentNeeded --> AI1[Call OpenAI API]
    ContentNeeded --> AI2[Call Google Gemini]
    AI1 --> ContentResult[Generated Slides]
    AI2 --> ContentResult
    
    TemplateNeeded --> LoadTemplate[Load Template Schema]
    LoadTemplate --> Validate[Validate with Zod]
    Validate --> ApplyTemplate[Apply to Slides]
    
    ContentResult --> ApplyTemplate
    ApplyTemplate --> TemplateResult[Templated Slides]
    
    ExportNeeded --> GeneratePPTX[Create PPTX File]
    TemplateResult --> GeneratePPTX
    GeneratePPTX --> ExportResult[Final Presentation]
    
    ExportResult --> Return[Return to User]
    Return --> End([User Downloads Presentation])
    
    style Start fill:#e1f5e1
    style End fill:#e1f5e1
    style Supervisor fill:#fff4e1
    style ContentResult fill:#e1f5ff
    style TemplateResult fill:#ffe1f5
    style ExportResult fill:#f5e1ff
```

### End-to-End Process Flow

```mermaid
flowchart LR
    subgraph "User Interaction"
        A[Start Chat] --> B[Describe Business]
        B --> C[Review Slides]
        C --> D[Request Changes]
        D --> E[Approve & Export]
    end
    
    subgraph "AI Agent Processing"
        F[Supervisor] --> G[Content Agent]
        G --> H[Template Agent]
        H --> I[Export Agent]
    end
    
    subgraph "Data Processing"
        J[Raw Content] --> K[Structured Slides]
        K --> L[Templated Slides]
        L --> M[PPTX File]
    end
    
    A -.->|triggers| F
    F -.->|generates| J
    J -.->|returns| B
    C -.->|updates| F
    F -.->|processes| K
    K -.->|returns| C
    E -.->|triggers| I
    I -.->|generates| M
    M -.->|downloads| E
    
    style A fill:#e1f5e1
    style E fill:#e1f5e1
    style F fill:#fff4e1
    style J fill:#e1f5ff
    style M fill:#f5e1ff
```

### API Request Flow

```mermaid
graph TB
    subgraph "Frontend"
        A[User Types Message] --> B[CopilotKit Component]
        B --> C[API Client]
    end
    
    subgraph "Next.js API Route"
        C --> D[POST /api/copilotkit]
        D --> E{Extract Message}
        E --> F[Add User Context]
        F --> G[Prepare Request]
    end
    
    subgraph "Blaxel Agent"
        G --> H[POST /copilotkit]
        H --> I{Message Type?}
        I -->|GraphQL Query| J[Agent Discovery]
        I -->|Chat Message| K[Supervisor Agent]
        K --> L[Delegate to Sub-Agents]
    end
    
    subgraph "Response Processing"
        L --> M[Collect Results]
        M --> N[Format Response]
        N --> O[Return to API]
        O --> P[Update UI]
    end
    
    P --> Q[User Sees Response]
    
    style A fill:#e1f5e1
    style Q fill:#e1f5e1
    style K fill:#fff4e1
    style L fill:#ffe1f5
```

### Data Flow with Existing Routes

```mermaid
flowchart TD
    Start([User arrives at /pitch-deck]) --> Landing[Landing Page]
    Landing --> Wizard[Click Create → /pitch-deck-wizard]
    
    Wizard --> Chat[Start Chat with AI]
    Chat --> Agent[Blaxel Agent Generates]
    Agent --> Save[Save to Database]
    Save --> Redirect[Redirect to /dashboard/pitch-decks]
    
    Redirect --> List[See Presentation in List]
    List --> View[Click View → /presentations/:id/view]
    List --> Edit[Click Edit → /presentations/:id/edit]
    
    Edit --> AIAssistant[Use AI Assistant]
    AIAssistant --> Update[Update Slides]
    Update --> Save2[Save Changes]
    
    View --> Export[Export PPTX]
    Export --> Download[Download File]
    
    style Start fill:#e1f5e1
    style Download fill:#e1f5e1
    style Agent fill:#fff4e1
    style AIAssistant fill:#ffe1f5
```

---

## User Journeys

### Complete Pitch Deck Creation Journey

```mermaid
journey
    title Complete Pitch Deck Creation Journey
    section Initial Setup
      User opens app: 5: User
      User starts chat: 5: User
      AI greets user: 4: AI
    section Discovery Phase
      AI asks about business: 3: AI
      User describes startup: 4: User
      AI asks clarifying questions: 3: AI
      User provides details: 4: User
    section Generation Phase
      AI generates content: 5: AI
      AI shows slide preview: 4: AI
      User reviews slides: 3: User
      User requests changes: 3: User
      AI updates slides: 4: AI
    section Export Phase
      User approves slides: 5: User
      AI generates PPTX: 4: AI
      AI provides download link: 5: AI
      User downloads presentation: 5: User
    section Success
      User uses pitch deck: 5: User
```

---

## Data Flow Diagrams

### Component Communication Flow

```mermaid
graph LR
    subgraph "Frontend Components"
        A[CopilotKit UI]
        B[Slide Preview]
        C[Chat Interface]
    end
    
    subgraph "Backend Services"
        D[API Gateway]
        E[Blaxel Agent]
        F[Database]
    end
    
    subgraph "External APIs"
        G[OpenAI]
        H[Templates]
    end
    
    A --> C
    C --> D
    D --> E
    E --> G
    E --> H
    E --> F
    F --> B
    B --> A
    
    style A fill:#e1f5e1
    style E fill:#fff4e1
    style G fill:#ffe1f5
```

---

## Database Schema

### Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ PRESENTATION : creates
    USER ||--o{ CONVERSATION : has
    PRESENTATION ||--o{ SLIDE : contains
    PRESENTATION }o--|| TEMPLATE : uses
    SLIDE ||--o{ CONTENT_BLOCK : has
    TEMPLATE ||--o{ TEMPLATE_SCHEMA : has
    CONVERSATION ||--o{ MESSAGE : contains
    PRESENTATION ||--o{ EXPORT : generates
    
    USER {
        string id PK
        string email
        string name
        datetime created_at
    }
    
    PRESENTATION {
        string id PK
        string user_id FK
        string template_id FK
        string title
        string status
        json metadata
        datetime created_at
        datetime updated_at
    }
    
    SLIDE {
        string id PK
        string presentation_id FK
        int order
        string type
        json content
        string layout
    }
    
    TEMPLATE {
        string id PK
        string name
        string description
        string category
        json schema
        bool is_custom
    }
    
    TEMPLATE_SCHEMA {
        string id PK
        string template_id FK
        string field_name
        string field_type
        bool required
        json validation_rules
    }
    
    CONVERSATION {
        string id PK
        string user_id FK
        string presentation_id FK
        json messages
        string current_step
        datetime started_at
    }
    
    MESSAGE {
        string id PK
        string conversation_id FK
        string role
        string content
        datetime timestamp
    }
    
    CONTENT_BLOCK {
        string id PK
        string slide_id FK
        string type
        json data
        int order
    }
    
    EXPORT {
        string id PK
        string presentation_id FK
        string format
        string file_url
        datetime created_at
    }
```

---

## Sequence Diagrams

### Multi-Agent System Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as CopilotKit UI
    participant S as Supervisor Agent
    participant C as Content Agent
    participant T as Template Agent
    participant E as Export Agent
    participant AI as AI Services
    
    U->>UI: "Create pitch deck for fintech startup"
    UI->>S: Start Conversation
    S->>S: Analyze Request
    S->>C: Generate Content
    C->>AI: Request Content Generation
    AI-->>C: Return Content
    C-->>S: Content Ready
    S->>T: Apply Template
    T->>T: Load Template Schema
    T->>T: Validate Content
    T-->>S: Template Applied
    S->>E: Generate PPTX
    E->>E: Create Presentation
    E-->>S: PPTX Ready
    S-->>UI: Return Result
    UI-->>U: Display Presentation
```

### Agent Communication Flow

```mermaid
sequenceDiagram
    autonumber
    participant UI as CopilotKit UI
    participant API as Next.js API
    participant Supervisor as Supervisor Agent
    participant Content as Content Agent
    participant Template as Template Agent
    participant Export as Export Agent
    participant OpenAI as OpenAI API
    participant TemplateSys as Template System
    
    UI->>API: User message
    API->>Supervisor: Forward message
    
    Note over Supervisor: Analyzes request and<br/>determines workflow
    
    Supervisor->>Content: Request content generation
    Content->>OpenAI: Generate slide content
    OpenAI-->>Content: Return content
    Content-->>Supervisor: Slides generated
    
    Supervisor->>Template: Request template application
    Template->>TemplateSys: Load template schema
    TemplateSys-->>Template: Return schema
    Template->>Template: Validate slides
    Template-->>Supervisor: Template applied
    
    Supervisor->>Export: Request PPTX generation
    Export->>Export: Create PPTX file
    Export-->>Supervisor: File ready
    
    Supervisor-->>API: Return presentation data
    API-->>UI: Update UI with slides
    
    Note over UI: User sees slides in real-time
```

### Route Integration Flow

```mermaid
sequenceDiagram
    participant User
    participant Landing as /pitch-deck
    participant Wizard as /pitch-deck-wizard
    participant Dashboard as /dashboard/pitch-decks
    participant Editor as /presentations/:id/edit
    participant Agent as Blaxel Agent
    
    User->>Landing: Visit pitch deck page
    Landing->>Wizard: Click "Create with AI"
    Wizard->>Agent: Start conversation
    Agent->>Agent: Generate slides
    Agent-->>Wizard: Return presentation
    Wizard->>Dashboard: Save & redirect
    Dashboard->>Editor: Click "Edit"
    Editor->>Agent: Request updates
    Agent-->>Editor: Return updated slides
```

---

## Integration Diagrams

### CopilotKit ↔ Blaxel Agent Integration

```mermaid
sequenceDiagram
    participant UI as CopilotKit UI
    participant API as Next.js API Route
    participant Agent as Blaxel Agent
    participant S as Supervisor
    participant C as Content Agent
    
    UI->>API: POST /api/copilotkit
    API->>Agent: Forward to /copilotkit
    Agent->>S: Route message
    S->>C: Delegate content generation
    C->>C: Generate slides
    C-->>S: Return slides
    S-->>Agent: Return result
    Agent-->>API: Return response
    API-->>UI: Update UI
```

### Blaxel Agent ↔ Presenton Templates Integration

```mermaid
sequenceDiagram
    participant Agent as Blaxel Agent
    participant Template as Template Agent
    participant Presenton as Presenton System
    participant Schema as Zod Validator
    participant Export as Export Agent
    
    Agent->>Template: Request template
    Template->>Presenton: Load template
    Presenton-->>Template: Return template
    Template->>Schema: Validate content
    Schema-->>Template: Validation result
    Template->>Export: Apply template
    Export-->>Agent: Return results
```

---

## System Context Diagrams

### C4 Model: System Context

```mermaid
graph TB
    subgraph "External Actors"
        U[Users]
        ADM[Administrators]
    end
    
    subgraph "Medellin Spark Platform"
        SYS[Main Application]
    end
    
    subgraph "External Systems"
        SUP[Supabase<br/>Auth + Database]
        OAI[OpenAI API]
        VER[Vercel CDN]
        BLA[Blaxel Platform]
    end
    
    U --> SYS
    ADM --> SYS
    SYS --> SUP
    SYS --> OAI
    SYS --> BLA
    VER --> SYS
```

### C4 Model: Container Diagram

```mermaid
graph TB
    subgraph "Frontend Container"
        UI[React SPA<br/>TypeScript + Vite]
        RQ[React Query<br/>State Management]
    end
    
    subgraph "Backend Containers"
        EF1[Edge Function<br/>pitch-deck-assistant]
        EF2[Edge Function<br/>generate-pitch-deck]
        EF3[Blaxel Agent<br/>Multi-Agent System]
    end
    
    subgraph "Data Store"
        PG[(PostgreSQL<br/>Supabase)]
        ST[Storage<br/>S3-compatible]
    end
    
    UI --> RQ
    RQ --> EF1
    RQ --> EF2
    RQ --> EF3
    EF1 --> PG
    EF2 --> PG
    EF2 --> ST
    EF3 --> PG
```

---

## Agent State Machine

### Pitch Deck Generation State Flow

```mermaid
stateDiagram-v2
    [*] --> Initiated
    Initiated --> Gathering: User provides info
    Gathering --> Analyzing: Enough information
    Analyzing --> Generating: Content ready
    Generating --> Templating: Slides created
    Templating --> Reviewing: Template applied
    Reviewing --> Editing: User requests changes
    Reviewing --> Exporting: User approves
    Editing --> Generating: Updates needed
    Exporting --> Completed: PPTX ready
    Completed --> [*]
    
    Gathering --> Failed: Error
    Analyzing --> Failed: Error
    Generating --> Failed: Error
    Templating --> Failed: Error
    Failed --> [*]
```

---

## Network Architecture

### Request Flow Through Stack

```mermaid
graph TB
    subgraph "User Browser"
        B[Browser]
    end
    
    subgraph "CDN Layer"
        CDN[Vercel Edge Network]
    end
    
    subgraph "Application Layer"
        NEXT[Next.js Server]
        API[API Routes]
    end
    
    subgraph "Agent Layer"
        BLAXEL[Blaxel Platform]
        AGENT[Pitch Deck Agent]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL)]
        STORAGE[File Storage]
    end
    
    subgraph "External APIs"
        OPENAI[OpenAI API]
        GEMINI[Google Gemini]
    end
    
    B --> CDN
    CDN --> NEXT
    NEXT --> API
    API --> BLAXEL
    BLAXEL --> AGENT
    AGENT --> OPENAI
    AGENT --> GEMINI
    AGENT --> DB
    AGENT --> STORAGE
    
    style B fill:#e1f5e1
    style AGENT fill:#fff4e1
    style DB fill:#e1f5ff
```

---

## Template Processing Flow

### Template Selection and Application

```mermaid
flowchart TD
    Start([User Requests Template]) --> Load[Load Available Templates]
    Load --> Analyze[Analyze Content Type]
    Analyze --> Match[Match Content to Template]
    Match --> Select[Select Best Template]
    Select --> LoadSchema[Load Template Schema]
    LoadSchema --> Validate[Validate Content]
    Validate --> Apply[Apply Template to Slides]
    Apply --> Style[Apply Styling]
    Style --> Finalize[Finalize Presentation]
    Finalize --> End([Return Templated Slides])
    
    Validate -->|Invalid| Suggest[Suggest Changes]
    Suggest --> Validate
    
    style Start fill:#e1f5e1
    style End fill:#e1f5e1
    style Select fill:#fff4e1
    style Apply fill:#ffe1f5
```

---

## Error Handling Flow

### Error Recovery Process

```mermaid
flowchart TD
    Request[User Request] --> Process[Process Request]
    Process --> Success{Success?}
    Success -->|Yes| Return[Return Results]
    Success -->|No| Check{Error Type?}
    
    Check -->|AI Error| RetryAI[Retry with Fallback Provider]
    Check -->|Template Error| RetryTemplate[Try Alternative Template]
    Check -->|Validation Error| FixValidation[Request User Clarification]
    Check -->|Export Error| RetryExport[Retry Export]
    
    RetryAI --> Success
    RetryTemplate --> Success
    FixValidation --> Wait[Wait for User Input]
    Wait --> Process
    RetryExport --> Success
    
    Return --> End([Success])
    
    style Request fill:#e1f5e1
    style End fill:#e1f5e1
    style Check fill:#fff4e1
```

---

**Document Status**: 📊 Visual Reference Complete  
**Last Updated**: 2025-10-24  
**Version**: 1.0.0

