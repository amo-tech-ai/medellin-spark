# Pitch Deck Generator - System Architecture

🏷️ **Diagram Type:** Flowchart (Architecture)

💬 **Description:** This flowchart shows the complete system architecture including frontend, backend (Edge Functions), AI services, and database layers with their relationships.

---

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[React UI<br/>PitchDeckWizard.tsx]
        API[API Client<br/>apiClient.ts]
        COMP[Components<br/>SlideGridView, OutlineEditor]
    end

    subgraph "Backend Layer - Supabase Edge Functions"
        PA[pitch-deck-assistant<br/>Deno/TypeScript]
        GEN[generate-pitch-deck<br/>Deno/TypeScript]
        CHAT[chat<br/>OpenAI Proxy]
    end

    subgraph "AI Processing"
        OPENAI[OpenAI API<br/>GPT-4o]
        TOOLS[Function Calling<br/>save_startup_data]
        JSON[JSON Schema<br/>10-slide structure]
    end

    subgraph "Database - Supabase PostgreSQL"
        CONV[pitch_conversations<br/>conversation_id, messages]
        PRES[presentations<br/>id, content, outline]
        PROF[profiles<br/>profile_id, user data]
    end

    subgraph "Security"
        RLS[Row Level Security<br/>RLS Policies]
        AUTH[Supabase Auth<br/>JWT Tokens]
        ENV[Environment Secrets<br/>OPENAI_API_KEY]
    end

    %% Frontend to Backend
    UI -->|POST /pitch-deck-assistant| API
    API -->|HTTP Request| PA
    UI -->|POST /generate-pitch-deck| API
    API -->|HTTP Request| GEN

    %% Backend to AI
    PA -->|Chat Completion| OPENAI
    GEN -->|Chat Completion + JSON| OPENAI
    OPENAI -->|Tool Calls| TOOLS
    OPENAI -->|Structured Output| JSON

    %% Backend to Database
    PA -->|Save messages| CONV
    PA -->|Link to user| PROF
    GEN -->|INSERT presentation| PRES
    GEN -->|Link to profile| PROF

    %% Security Layer
    AUTH -.->|Validates| API
    RLS -.->|Protects| PRES
    RLS -.->|Protects| CONV
    ENV -.->|Provides keys| PA
    ENV -.->|Provides keys| GEN

    %% Database to Frontend
    PRES -->|Load slides| COMP
    COMP -->|Render| UI

    classDef frontend fill:#e1f5ff,stroke:#0066cc,stroke-width:2px
    classDef backend fill:#fff4e6,stroke:#ff9800,stroke-width:2px
    classDef ai fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
    classDef database fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    classDef security fill:#ffebee,stroke:#f44336,stroke-width:2px

    class UI,API,COMP frontend
    class PA,GEN,CHAT backend
    class OPENAI,TOOLS,JSON ai
    class CONV,PRES,PROF database
    class RLS,AUTH,ENV security
```

---

## Component Responsibilities

### Frontend Layer
- **PitchDeckWizard.tsx** - Chat interface, progress tracking, user input
- **apiClient.ts** - Centralized HTTP client with error handling
- **SlideGridView** - Visual thumbnail grid showing slide content
- **OutlineEditor** - Slide management, reordering, theme selection

### Backend Layer (Edge Functions)
- **pitch-deck-assistant** - Conversational AI handler, tool calling orchestration
- **generate-pitch-deck** - Final deck generation with OpenAI JSON mode
- **chat** - Generic OpenAI proxy for secure API key handling

### AI Processing
- **OpenAI GPT-4o** - Language model for conversation and content generation
- **Function Calling** - Structured data extraction (save_startup_data tool)
- **JSON Schema** - Enforced 10-slide pitch deck structure

### Database (Supabase PostgreSQL)
- **pitch_conversations** - Multi-turn conversation history with progress tracking
- **presentations** - Final generated decks with content and metadata
- **profiles** - User profiles linked to auth.users

### Security
- **RLS Policies** - Row-level security for data isolation
- **Supabase Auth** - JWT token validation
- **Environment Secrets** - API keys stored server-side only

---

## Data Flow
1. User input → Frontend
2. Frontend → API Client → Edge Functions
3. Edge Functions → OpenAI API (with API key from env)
4. OpenAI → Structured responses (tool calls or JSON)
5. Edge Functions → Database (save data)
6. Database → Frontend (load presentations)
7. Frontend → User (render slides)
