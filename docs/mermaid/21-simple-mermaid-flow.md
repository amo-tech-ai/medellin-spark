# 🎨 Simple Mermaid Diagrams - Pitch Deck AI Flow

---

## 1️⃣ COMPLETE SYSTEM ARCHITECTURE

```mermaid
graph TB
    subgraph Frontend["🎨 FRONTEND - Lovable/React"]
        Dashboard[Dashboard]
        Input[Input Form]
        Outline[Outline Editor]
        Editor[Slide Editor]
        Viewer[Presentation Viewer]
    end

    subgraph Backend["⚡ BACKEND - Supabase"]
        Auth[Supabase Auth]
        DB[(PostgreSQL Database)]
        Edge1[Edge Function:<br/>generate-outline]
        Edge2[Edge Function:<br/>generate-presentation]
    end

    subgraph AI["🤖 AI - Anthropic"]
        Claude[Claude API]
    end

    Dashboard -->|Click Generate| Input
    Input -->|Submit topic| Edge1
    Edge1 -->|Call AI| Claude
    Claude -->|Return 10 titles| Edge1
    Edge1 -->|Save outline| DB
    DB -->|Load outline| Outline

    Outline -->|Edit & save| DB
    Outline -->|Generate full| Edge2
    Edge2 -->|Call AI| Claude
    Claude -->|Return content| Edge2
    Edge2 -->|Save content| DB
    DB -->|Load slides| Editor

    Editor -->|Auto-save| DB
    Editor -->|Click View| Viewer
    Viewer -->|Load slides| DB

    Auth -.->|Protect all| Outline
    Auth -.->|Protect all| Editor
    Auth -.->|Protect all| Viewer

    style Dashboard fill:#51cf66,stroke:#2f9e44
    style Input fill:#51cf66,stroke:#2f9e44
    style Outline fill:#8B5CF6,stroke:#7C3AED
    style Editor fill:#8B5CF6,stroke:#7C3AED
    style Viewer fill:#8B5CF6,stroke:#7C3AED
    style Claude fill:#3B82F6,stroke:#2563EB
```

---

## 2️⃣ USER JOURNEY - STAGE BY STAGE

```mermaid
journey
    title Creating a Pitch Deck with AI
    section Input Stage
      Open dashboard: 5: User
      Click "Generate Pitch Deck": 5: User
      Fill topic and settings: 4: User
      Click "Generate Outline": 5: User
    section AI Generation - Phase 1
      AI generates 10 slide titles: 3: Claude
      Saves outline to database: 5: System
      Redirects to outline editor: 5: System
    section Outline Stage
      Reviews generated outline: 4: User
      Reorders slides (drag & drop): 4: User
      Edits slide titles: 4: User
      Selects theme (Purple/Blue/Dark): 5: User
      Click "Generate Presentation": 5: User
    section AI Generation - Phase 2
      AI generates slide 1 content: 3: Claude
      AI generates slide 2 content: 3: Claude
      AI generates remaining slides: 3: Claude
      Saves all content to database: 5: System
      Redirects to slide editor: 5: System
    section Editing Stage
      Reviews generated slides: 4: User
      Edits slide titles: 4: User
      Edits slide content: 4: User
      Changes auto-save: 5: System
      Click "View Presentation": 5: User
    section Presentation Stage
      Full-screen viewer opens: 5: System
      Navigate slides with keyboard: 5: User
      Present to audience: 5: User
      Exit back to editor: 5: User
```

---

## 3️⃣ DATA FLOW - FRONTEND TO BACKEND

```mermaid
sequenceDiagram
    actor User
    participant Frontend as Frontend<br/>(React)
    participant Supabase as Supabase<br/>(Backend)
    participant Edge as Edge Function
    participant AI as Claude API
    participant DB as Database

    User->>Frontend: 1. Enter topic & click Generate
    Frontend->>Edge: 2. POST /generate-outline
    Note over Edge: Processing...
    Edge->>AI: 3. Call Claude API with topic
    AI-->>Edge: 4. Return 10 slide titles
    Edge->>DB: 5. Save outline JSONB
    DB-->>Frontend: 6. Return presentation ID
    Frontend->>Frontend: 7. Navigate to /outline

    User->>Frontend: 8. Edit & select theme
    Frontend->>DB: 9. Auto-save outline changes

    User->>Frontend: 10. Click "Generate Presentation"
    Frontend->>Edge: 11. POST /generate-presentation
    Note over Edge: Generating slides...

    loop For each slide
        Edge->>AI: 12. Generate slide content
        AI-->>Edge: 13. Return content
        Edge->>DB: 14. Save to content JSONB
        Edge-->>Frontend: 15. Progress update
    end

    DB-->>Frontend: 16. Return complete content
    Frontend->>Frontend: 17. Navigate to /edit

    User->>Frontend: 18. Edit slide content
    Frontend->>DB: 19. Auto-save changes (debounced)

    User->>Frontend: 20. Click "View Presentation"
    Frontend->>DB: 21. Load slides + theme
    DB-->>Frontend: 22. Return presentation data
    Frontend->>Frontend: 23. Render full-screen viewer
```

---

## 4️⃣ PAGE FLOW - NAVIGATION

```mermaid
flowchart TD
    Start([User Opens App]) --> Auth{Logged In?}
    Auth -->|No| Login[Login Page]
    Auth -->|Yes| Dashboard[Dashboard]
    Login --> Dashboard

    Dashboard --> Input[Input Form<br/>/pitch-deck]

    Input --> AI1{AI Generate<br/>Outline}
    AI1 -->|30 sec| Outline[Outline Editor<br/>/presentations/:id/outline]

    Outline --> Edit1{User Edits<br/>Outline?}
    Edit1 -->|Yes| Outline
    Edit1 -->|No| AI2{AI Generate<br/>Full Deck}

    AI2 -->|60-90 sec| Editor[Slide Editor<br/>/presentations/:id/edit]

    Editor --> Edit2{User Edits<br/>Slides?}
    Edit2 -->|Yes| Editor
    Edit2 -->|No| Viewer[Presentation Viewer<br/>/presentations/:id/view]

    Viewer --> ViewOpt{User Action?}
    ViewOpt -->|Edit| Editor
    ViewOpt -->|Exit| MyDecks[My Presentations<br/>/presentations]

    MyDecks -->|Edit Deck| Editor
    MyDecks -->|View| Viewer
    MyDecks -->|New Deck| Input

    style Dashboard fill:#51cf66,stroke:#2f9e44
    style Input fill:#51cf66,stroke:#2f9e44
    style Outline fill:#8B5CF6,stroke:#7C3AED
    style Editor fill:#8B5CF6,stroke:#7C3AED
    style Viewer fill:#8B5CF6,stroke:#7C3AED
    style AI1 fill:#3B82F6,stroke:#2563EB
    style AI2 fill:#3B82F6,stroke:#2563EB
```

---

## 5️⃣ AI GENERATION FLOW

```mermaid
flowchart LR
    subgraph Phase1["PHASE 1: Outline Generation"]
        A1[User Input:<br/>Topic + Settings] --> B1[Claude API]
        B1 --> C1[Generate 10<br/>Slide Titles]
        C1 --> D1[Save to DB:<br/>outline JSONB]
    end

    subgraph Phase2["PHASE 2: Content Generation"]
        A2[Outline + Theme] --> B2[Claude API]
        B2 --> C2[Generate Slide 1]
        C2 --> D2[Generate Slide 2]
        D2 --> E2[Generate Slide 3-10]
        E2 --> F2[Save to DB:<br/>content JSONB]
    end

    D1 --> A2

    style A1 fill:#ffd43b,stroke:#fab005
    style B1 fill:#3B82F6,stroke:#2563EB
    style B2 fill:#3B82F6,stroke:#2563EB
    style D1 fill:#10B981,stroke:#059669
    style F2 fill:#10B981,stroke:#059669
```

---

## 6️⃣ DATABASE STRUCTURE

```mermaid
erDiagram
    PROFILES ||--o{ PRESENTATIONS : creates

    PROFILES {
        uuid id PK
        string email
        string full_name
        timestamp created_at
    }

    PRESENTATIONS {
        uuid id PK
        uuid profile_id FK
        string title
        text topic
        integer slide_count
        string presentation_style
        string status
        string theme
        jsonb outline
        jsonb content
        timestamp created_at
        timestamp updated_at
    }
```

**JSONB Structures:**

```
outline: [
  {id: "slide-1", title: "EventOS Pitch"},
  {id: "slide-2", title: "The Problem"},
  ...
]

content: {
  slides: [
    {
      id: "slide-1",
      title: "EventOS Pitch",
      content: "EventOS is...",
      layout: "title"
    },
    ...
  ],
  slideCount: 10
}
```

---

## 7️⃣ COMPONENT HIERARCHY

```mermaid
graph TD
    App[App Root] --> Router[Router]

    Router --> Dashboard[Dashboard Page]
    Router --> Input[Input Form Page]
    Router --> Outline[Outline Editor Page]
    Router --> Editor[Slide Editor Page]
    Router --> Viewer[Viewer Page]

    Outline --> OutlineHeader[Header + Auto-save]
    Outline --> SlideList[Slide List]
    Outline --> ThemeSelector[Theme Selector]
    Outline --> GenerateBtn[Generate Button]

    SlideList --> SlideRow1[Slide Row Component]
    SlideList --> SlideRow2[Slide Row Component]
    SlideList --> SlideRowN[...]

    SlideRow1 --> DragHandle[Drag Handle ⠿]
    SlideRow1 --> TitleInput[Editable Title]
    SlideRow1 --> Actions[Edit/Delete Buttons]

    ThemeSelector --> ThemeCard1[Purple Theme Card]
    ThemeSelector --> ThemeCard2[Blue Theme Card]
    ThemeSelector --> ThemeCard3[Dark Theme Card]

    Editor --> EditorHeader[Header + Auto-save]
    Editor --> Thumbnails[Thumbnail Panel]
    Editor --> EditorArea[Content Editor]

    Thumbnails --> Thumb1[Thumbnail 1]
    Thumbnails --> Thumb2[Thumbnail 2 ▶]
    Thumbnails --> ThumbN[...]

    EditorArea --> TitleField[Title Input]
    EditorArea --> ContentField[Content Textarea]
    EditorArea --> Navigation[Prev/Next Buttons]

    Viewer --> ViewerSlide[Slide Display]
    Viewer --> ViewerControls[Controls ← 1/10 →]

    style Outline fill:#8B5CF6,stroke:#7C3AED,color:#fff
    style Editor fill:#8B5CF6,stroke:#7C3AED,color:#fff
    style Viewer fill:#8B5CF6,stroke:#7C3AED,color:#fff
```

---

## 8️⃣ AUTO-SAVE FLOW

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Typing : User types
    Typing --> Debouncing : Wait 2 seconds
    Typing --> Typing : User continues typing<br/>(reset timer)
    Debouncing --> Saving : Timer expires
    Saving --> Success : Save successful
    Saving --> Error : Save failed
    Success --> Idle : Show "Saved"
    Error --> Idle : Show "Error"

    note right of Debouncing
        Wait 2 seconds after
        last keystroke before
        saving to database
    end note
```

---

## 9️⃣ THEME APPLICATION FLOW

```mermaid
flowchart TD
    A[User Selects Theme] --> B{Which Theme?}

    B -->|Purple| C1[Purple Colors]
    B -->|Blue| C2[Blue Colors]
    B -->|Dark| C3[Dark Colors]

    C1 --> D[Save to Database:<br/>theme = 'purple']
    C2 --> D[Save to Database:<br/>theme = 'blue']
    C3 --> D[Save to Database:<br/>theme = 'dark']

    D --> E[Database Updated]

    E --> F{Where Applied?}
    F -->|Viewer| G[Apply Background<br/>& Text Colors]
    F -->|Editor| H[Update Preview]
    F -->|Cards| I[Update Border]

    G --> J[Purple: #1F2937 bg<br/>Blue: #1E3A8A bg<br/>Dark: #000 bg]

    style C1 fill:#8B5CF6,stroke:#7C3AED,color:#fff
    style C2 fill:#3B82F6,stroke:#2563EB,color:#fff
    style C3 fill:#1F2937,stroke:#000,color:#fff
```

---

## 🔟 ERROR HANDLING FLOW

```mermaid
flowchart TD
    Start[User Action] --> Try{Try Operation}

    Try -->|Success| Success[Show Success State]
    Try -->|Network Error| E1[Show: Connection Error<br/>Retry Available]
    Try -->|AI Error| E2[Show: AI Generation Failed<br/>Try Again]
    Try -->|Database Error| E3[Show: Save Failed<br/>Please Retry]
    Try -->|Auth Error| E4[Redirect to Login]

    E1 --> Retry{User Retries?}
    E2 --> Retry
    E3 --> Retry

    Retry -->|Yes| Try
    Retry -->|No| Cancel[Stay on Page<br/>Show Error]

    Success --> Next[Continue to Next Step]
    E4 --> Login[Login Page]

    style E1 fill:#ef4444,stroke:#dc2626,color:#fff
    style E2 fill:#ef4444,stroke:#dc2626,color:#fff
    style E3 fill:#ef4444,stroke:#dc2626,color:#fff
    style E4 fill:#ef4444,stroke:#dc2626,color:#fff
    style Success fill:#10B981,stroke:#059669,color:#fff
```

---

## 📊 SUMMARY: THE COMPLETE FLOW

```mermaid
graph LR
    A[👤 User] -->|1. Topic| B[📝 Input]
    B -->|2. Generate| C[🤖 Claude AI]
    C -->|3. Outline| D[💾 Database]
    D -->|4. Load| E[📋 Outline Editor]
    E -->|5. Edit| D
    E -->|6. Generate| C
    C -->|7. Content| D
    D -->|8. Load| F[✏️ Slide Editor]
    F -->|9. Edit| D
    D -->|10. Load| G[👁️ Viewer]
    G -->|11. Present| H[🎤 Audience]

    style A fill:#ffd43b,stroke:#fab005
    style C fill:#3B82F6,stroke:#2563EB,color:#fff
    style D fill:#10B981,stroke:#059669,color:#fff
    style E fill:#8B5CF6,stroke:#7C3AED,color:#fff
    style F fill:#8B5CF6,stroke:#7C3AED,color:#fff
    style G fill:#8B5CF6,stroke:#7C3AED,color:#fff
    style H fill:#f59e0b,stroke:#d97706,color:#fff
```

---

## 🎯 KEY TAKEAWAYS

**Three Main Stages:**
1. **Input & Outline** (30 seconds AI) → User reviews and edits outline
2. **Generation & Editing** (60-90 seconds AI) → User edits full slides
3. **Presentation** (Instant) → User presents with full-screen viewer

**Two AI Calls:**
- First: Generate outline (10 slide titles)
- Second: Generate content (full text for each slide)

**Three Database Operations:**
- Save outline after first AI call
- Save content after second AI call
- Auto-save on every user edit (debounced)

**Five Pages:**
1. Input Form (enhance existing)
2. Outline Editor (build new)
3. Slide Editor (build new)
4. Viewer (build new)
5. My Presentations (fix existing)

---

**Use these diagrams to visualize the complete system! 🚀**
