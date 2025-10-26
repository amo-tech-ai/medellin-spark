# 🗺️ USER JOURNEY & SYSTEM FLOWS

**Project**: Medellin Spark AI Pitch Deck Generator
**Created**: October 26, 2025
**Purpose**: Complete user journey mapping with mermaid diagrams

---

## 📊 COMPLETE USER JOURNEY

### Overview Flow

```mermaid
flowchart TD
    Start([User Visits Site]) --> Landing[/pitch-deck or /pitch-deck-wizard]

    Landing --> Input[Enter Startup Description]
    Input --> AI[AI Processes Input]

    AI --> Extract[Content Agent Extracts Data]
    Extract --> Progress{Progress >= 60%?}

    Progress -->|No| MoreQuestions[AI Asks Follow-up Questions]
    MoreQuestions --> Input

    Progress -->|Yes| Generate[Generate Deck Button Appears]
    Generate --> Slides[Slides Agent Creates 10 Slides]

    Slides --> SaveDB[(Save to Database)]
    SaveDB --> Redirect[Redirect to Outline Editor]

    Redirect --> Outline[/presentations/:id/outline]
    Outline --> EditOutline{User Action}

    EditOutline -->|Reorder Slides| DragDrop[Drag & Drop Slides]
    EditOutline -->|Edit Titles| InlineEdit[Inline Title Editing]
    EditOutline -->|Change Theme| ThemeSelector[Select Theme]
    EditOutline -->|Continue| ToSlideEditor[Click Edit Slides]

    DragDrop --> AutoSave1[(Auto-save to DB)]
    InlineEdit --> AutoSave1
    ThemeSelector --> AutoSave1
    AutoSave1 --> Outline

    ToSlideEditor --> SlideEditor[/presentations/:id/edit]

    SlideEditor --> EditSlides{User Action}
    EditSlides -->|Edit Content| EditContent[Edit Headlines/Bullets/Notes]
    EditSlides -->|Change Layout| LayoutSelector[Choose Layout from 12 Options]
    EditSlides -->|Navigate| Thumbnails[Click Thumbnail Panel]
    EditSlides -->|Present| ToViewer[Click Present Button]

    EditContent --> AutoSave2[(Auto-save to DB)]
    LayoutSelector --> AutoSave2
    AutoSave2 --> SlideEditor
    Thumbnails --> SlideEditor

    ToViewer --> Viewer[/presentations/:id/view]
    Viewer --> Present{Presentation Mode}

    Present -->|Arrow Keys| Navigate[Navigate Slides]
    Present -->|ESC| Exit[Exit Presentation]

    Navigate --> Present
    Exit --> Dashboard[Return to Dashboard]

    Dashboard --> End([Journey Complete])

    style Start fill:#90EE90
    style End fill:#90EE90
    style AI fill:#FFD700
    style Extract fill:#FFD700
    style Slides fill:#FFD700
    style SaveDB fill:#87CEEB
    style AutoSave1 fill:#87CEEB
    style AutoSave2 fill:#87CEEB
```

---

## 🎯 PHASE 1: CONTENT GATHERING

### Landing Page Flow

```mermaid
flowchart LR
    A[User Visits] --> B{Which Page?}

    B -->|/pitch-deck| C[Landing Page]
    B -->|/pitch-deck-wizard| D[Wizard Page]

    C --> E[Large Textarea]
    D --> F[Progress Sidebar + Textarea]

    E --> G[Enter Description]
    F --> G

    G --> H[Click Generate]
    H --> I[Call Backend API]

    style A fill:#90EE90
    style I fill:#FFD700
```

### Backend Processing Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Supervisor
    participant ContentAgent
    participant SlidesAgent
    participant Database

    User->>Frontend: Enter startup description
    Frontend->>API: POST /pitch-deck-assistant
    API->>Supervisor: Route to agents

    Supervisor->>ContentAgent: Extract startup data
    ContentAgent->>ContentAgent: Parse description
    ContentAgent->>Database: Save to pitch_conversations
    ContentAgent-->>Supervisor: Return extracted data + completeness

    Supervisor-->>API: {data, completeness: 45%}
    API-->>Frontend: Response with progress
    Frontend->>User: Show progress + ask follow-up

    Note over User,Frontend: User provides more info (3-4 exchanges)

    User->>Frontend: More details
    Frontend->>API: POST /pitch-deck-assistant
    API->>Supervisor: Continue conversation
    Supervisor->>ContentAgent: Update data
    ContentAgent->>Database: Update pitch_conversations
    ContentAgent-->>Supervisor: {data, completeness: 75%}

    Supervisor-->>API: {ready_to_generate: true}
    API-->>Frontend: Show Generate button

    User->>Frontend: Click Generate
    Frontend->>API: POST /generate-pitch-deck
    API->>Supervisor: Create presentation
    Supervisor->>SlidesAgent: Structure 10 slides

    SlidesAgent->>SlidesAgent: Apply pitch deck template
    SlidesAgent->>Database: INSERT presentations
    SlidesAgent-->>Supervisor: presentation_id

    Supervisor-->>API: {presentation_id}
    API-->>Frontend: Redirect URL
    Frontend->>User: Navigate to /outline
```

---

## 🎨 PHASE 2: OUTLINE EDITING

### Outline Editor Flow

```mermaid
flowchart TD
    Start[Load /presentations/:id/outline] --> Fetch[(Fetch from Database)]
    Fetch --> Parse[Parse presentation.content.slides]

    Parse --> Display[Display Slide List]
    Display --> UI{User Action}

    UI -->|Drag Slide| Reorder[Update Slide Order]
    UI -->|Edit Title| EditTitle[Inline Edit Title]
    UI -->|Add Slide| AddSlide[Insert New Slide]
    UI -->|Delete Slide| DeleteSlide[Remove Slide]
    UI -->|Change Theme| SelectTheme[Theme Selector]
    UI -->|Done| Continue[Click Edit Slides]

    Reorder --> Save1[(Auto-save to DB)]
    EditTitle --> Save1
    AddSlide --> Save1
    DeleteSlide --> Save1
    SelectTheme --> Save1

    Save1 --> Display
    Continue --> Navigate[Navigate to /edit]

    style Start fill:#90EE90
    style Save1 fill:#87CEEB
    style Navigate fill:#90EE90
```

### Drag & Drop Implementation

```mermaid
flowchart LR
    A[User Grabs Slide] --> B[@dnd-kit/sortable]
    B --> C[Calculate New Position]
    C --> D[Reorder Array]
    D --> E[Update State]
    E --> F[Debounce 500ms]
    F --> G[(Save to Database)]
    G --> H[Show Success Indicator]

    style A fill:#FFD700
    style G fill:#87CEEB
```

---

## 📝 PHASE 3: SLIDE EDITING

### Slide Editor Flow

```mermaid
flowchart TD
    Start[Load /presentations/:id/edit] --> Fetch[(Fetch Presentation)]
    Fetch --> LoadSlides[Load Slides Array]

    LoadSlides --> Display[Display Editor]
    Display --> Layout{Layout Components}

    Layout --> Thumb[Thumbnail Panel Left]
    Layout --> Main[Main Content Area]
    Layout --> Auto[Auto-save Indicator]

    Main --> Edit{Edit Action}

    Edit -->|Title| EditTitle[Change Slide Title]
    Edit -->|Headline| EditHeadline[Edit 3-5 Word Headline]
    Edit -->|Bullets| EditBullets[Add/Edit/Remove Bullets]
    Edit -->|Notes| EditNotes[Speaker Notes]
    Edit -->|Layout| ChangeLayout[Select from 12 Layouts]

    EditTitle --> Debounce[Debounce 1 second]
    EditHeadline --> Debounce
    EditBullets --> Debounce
    EditNotes --> Debounce
    ChangeLayout --> Immediate[Immediate Save]

    Debounce --> Save[(Update Database)]
    Immediate --> Save

    Save --> Indicator[Show Saved ✓]
    Indicator --> Display

    Thumb -->|Click| Navigate[Switch to Slide]
    Navigate --> Main

    Display -->|Present Button| Viewer[Navigate to /view]

    style Start fill:#90EE90
    style Save fill:#87CEEB
    style Viewer fill:#90EE90
```

### Content Structure

```mermaid
flowchart TD
    Slide[Slide Object] --> Title[Title: string]
    Slide --> Layout[Layout: LayoutType]
    Slide --> Content[Content: SlideContent]

    Content --> Headline[headline?: string]
    Content --> Bullets[bullets?: string array]
    Content --> Notes[notes?: string]

    Layout --> Types{12 Layout Types}

    Types --> Basic[Basic Category]
    Types --> ContentL[Content Category]
    Types --> Visual[Visual Category]
    Types --> Special[Special Category]

    Basic --> TitleSlide[title-slide]
    Basic --> TitleContent[title-content]
    Basic --> Blank[blank]

    ContentL --> TwoCol[two-columns]
    ContentL --> ThreeCol[three-columns]
    ContentL --> BulletList[bullet-list]
    ContentL --> Comparison[comparison]

    Visual --> ImageLeft[image-left]
    Visual --> ImageRight[image-right]
    Visual --> ImageFull[image-full]
    Visual --> ImageGrid[image-grid]

    Special --> Quote[quote]

    style Slide fill:#FFD700
    style Content fill:#87CEEB
    style Layout fill:#90EE90
```

---

## 🎬 PHASE 4: PRESENTATION MODE

### Viewer Flow

```mermaid
stateDiagram-v2
    [*] --> Loading: Navigate to /view
    Loading --> DisplaySlide: Slides loaded

    DisplaySlide --> DisplaySlide: Arrow Right (next)
    DisplaySlide --> DisplaySlide: Arrow Left (previous)
    DisplaySlide --> ExitPrompt: Press ESC
    DisplaySlide --> AutoHide: No activity 3s

    AutoHide --> ShowControls: Mouse move
    ShowControls --> AutoHide: No activity 3s

    ExitPrompt --> Dashboard: Confirm exit
    ExitPrompt --> DisplaySlide: Cancel

    Dashboard --> [*]
```

### Keyboard Navigation

```mermaid
flowchart LR
    A[Presentation Active] --> B{Key Press}

    B -->|Arrow Right| C[Next Slide]
    B -->|Arrow Left| D[Previous Slide]
    B -->|Home| E[First Slide]
    B -->|End| F[Last Slide]
    B -->|ESC| G[Exit]
    B -->|F| H[Toggle Fullscreen]

    C --> Update[Update State]
    D --> Update
    E --> Update
    F --> Update

    Update --> Render[Re-render Slide]
    Render --> A

    G --> Exit[Return to Dashboard]
    H --> FS{Is Fullscreen?}

    FS -->|Yes| ExitFS[Exit Fullscreen]
    FS -->|No| EnterFS[Enter Fullscreen]

    ExitFS --> A
    EnterFS --> A

    style A fill:#90EE90
    style Exit fill:#FF6B6B
```

---

## 💾 DATABASE INTERACTION FLOWS

### Data Persistence Pattern

```mermaid
flowchart TD
    A[User Action] --> B{Action Type}

    B -->|Input Change| Debounce[Debounce 1s]
    B -->|Selection| Immediate[Immediate]
    B -->|Navigation| NoSave[No Save]

    Debounce --> Validate[Validate Data]
    Immediate --> Validate

    Validate --> Check{Data Valid?}
    Check -->|No| Error[Show Error]
    Check -->|Yes| Optimistic[Update UI Optimistically]

    Optimistic --> API[Call Supabase API]
    API --> RLS{RLS Check}

    RLS -->|Fail| Revert[Revert UI + Show Error]
    RLS -->|Pass| Update[(Update Database)]

    Update --> Confirm[Show Success Indicator]
    Confirm --> Done[UI Updated]

    Error --> A
    Revert --> A
    NoSave --> Done

    style A fill:#90EE90
    style Update fill:#87CEEB
    style Revert fill:#FF6B6B
```

### Database Schema Relationships

```mermaid
erDiagram
    profiles ||--o{ presentations : creates
    profiles ||--o{ pitch_conversations : has
    profiles ||--o{ wizard_sessions : owns

    pitch_conversations ||--|| wizard_sessions : tracks
    pitch_conversations ||--o| presentations : generates

    presentations ||--o{ presentation_templates : "based on"

    profiles {
        uuid id PK
        string email
        string full_name
        timestamp created_at
    }

    presentations {
        uuid id PK
        uuid profile_id FK
        string title
        jsonb content
        int slide_count
        string status
        timestamp created_at
    }

    pitch_conversations {
        uuid id PK
        uuid profile_id FK
        jsonb messages
        jsonb collected_data
        decimal completeness
        timestamp created_at
    }

    wizard_sessions {
        uuid id PK
        uuid profile_id FK
        uuid conversation_id FK
        string current_step
        decimal completeness
        boolean is_complete
    }

    presentation_templates {
        uuid id PK
        string name
        jsonb slides
        jsonb theme
        boolean is_public
    }
```

---

## 🤖 AI AGENT ORCHESTRATION

### Multi-Agent System Flow

```mermaid
flowchart TD
    User[User Input] --> API[FastAPI Endpoint]
    API --> SDK[CopilotKit SDK]
    SDK --> Super[Supervisor Agent]

    Super --> Decision{Route Decision}

    Decision -->|Gather Info| Content[Content Agent]
    Decision -->|Structure Slides| Slides[Slides Agent]
    Decision -->|Both| Parallel[Parallel Execution]

    Content --> Extract[Extract Startup Data]
    Extract --> Fields{12 Data Fields}

    Fields --> F1[company_name]
    Fields --> F2[industry]
    Fields --> F3[problem]
    Fields --> F4[solution]
    Fields --> F5[target_market]
    Fields --> F6[business_model]
    Fields --> F7[unique_value_proposition]
    Fields --> F8[competitive_advantage]
    Fields --> F9[team]
    Fields --> F10[traction]
    Fields --> F11[financials]
    Fields --> F12[ask]

    F1 --> Complete{Calculate Completeness}
    F2 --> Complete
    F3 --> Complete
    F4 --> Complete
    F5 --> Complete
    F6 --> Complete
    F7 --> Complete
    F8 --> Complete
    F9 --> Complete
    F10 --> Complete
    F11 --> Complete
    F12 --> Complete

    Complete --> Percent[Completeness %]
    Percent --> Content

    Slides --> Template[Apply 10-Slide Template]
    Template --> S1[1. Title Slide]
    Template --> S2[2. Problem]
    Template --> S3[3. Solution]
    Template --> S4[4. Market Opportunity]
    Template --> S5[5. Product]
    Template --> S6[6. Traction]
    Template --> S7[7. Business Model]
    Template --> S8[8. Competition]
    Template --> S9[9. Team]
    Template --> S10[10. Ask]

    S1 --> Slides
    S2 --> Slides
    S3 --> Slides
    S4 --> Slides
    S5 --> Slides
    S6 --> Slides
    S7 --> Slides
    S8 --> Slides
    S9 --> Slides
    S10 --> Slides

    Content --> Super
    Slides --> Super
    Parallel --> Content
    Parallel --> Slides

    Super --> Response[Format Response]
    Response --> API
    API --> User

    style Super fill:#FFD700
    style Content fill:#87CEEB
    style Slides fill:#87CEEB
```

### Agent Communication Pattern

```mermaid
sequenceDiagram
    participant S as Supervisor
    participant C as Content Agent
    participant SL as Slides Agent
    participant M as Memory/State

    S->>C: "Extract startup information"
    C->>M: Read conversation history
    M-->>C: Previous messages
    C->>C: Parse & extract data
    C->>M: Save collected_data
    C-->>S: {data, completeness: 45%}

    Note over S: Completeness < 60%
    S-->>S: Request more info

    Note over S: After 3-4 exchanges
    S->>C: "Final extraction"
    C->>M: Read all messages
    C->>C: Complete extraction
    C->>M: Save final data
    C-->>S: {data, completeness: 80%}

    Note over S: Completeness >= 60%
    S->>SL: "Create 10-slide deck"
    SL->>M: Read collected_data
    M-->>SL: Startup information
    SL->>SL: Apply template
    SL->>SL: Generate content
    SL->>M: Save slides array
    SL-->>S: {slides: [...10 slides]}

    S-->>S: Combine results
```

---

## 🎯 BEST PRACTICES

### 1. Performance Optimization

```mermaid
flowchart LR
    A[User Action] --> B{Optimization}

    B --> C[Debounce Input]
    C --> C1[1 second delay]

    B --> D[Optimistic Updates]
    D --> D1[Update UI first]
    D1 --> D2[Save in background]

    B --> E[Lazy Loading]
    E --> E1[Load slides on demand]

    B --> F[Memoization]
    F --> F1[React.memo components]
    F1 --> F2[useMemo for calculations]

    B --> G[Virtual Scrolling]
    G --> G1[Large slide lists]

    C1 --> Result[Fast UX]
    D2 --> Result
    E1 --> Result
    F2 --> Result
    G1 --> Result

    style Result fill:#90EE90
```

### 2. Error Handling Strategy

```mermaid
flowchart TD
    A[User Action] --> B[Try Operation]
    B --> C{Success?}

    C -->|Yes| D[Show Success]
    C -->|No| E{Error Type}

    E -->|Network| F[Retry Logic]
    E -->|Validation| G[Show Inline Error]
    E -->|Auth| H[Redirect to Login]
    E -->|RLS| I[Permission Error]
    E -->|Server| J[Generic Error]

    F --> K{Retry Count}
    K -->|< 3| B
    K -->|>= 3| J

    G --> L[User Fixes Input]
    L --> A

    H --> M[Login Flow]
    M --> A

    I --> N[Contact Support Toast]
    J --> N

    D --> End[Continue]
    N --> End

    style D fill:#90EE90
    style N fill:#FF6B6B
```

### 3. State Management Pattern

```mermaid
flowchart TD
    A[Component] --> B{State Type}

    B -->|Local UI| C[useState]
    B -->|Form Data| D[useState + Validation]
    B -->|Server Data| E[React Query]
    B -->|Global| F[Context API]

    C --> G[Component Re-renders]
    D --> H[Controlled Inputs]
    E --> I[Automatic Caching]
    E --> J[Background Refetch]
    E --> K[Optimistic Updates]

    F --> L[Shared Across Tree]

    H --> Validate{Valid?}
    Validate -->|Yes| Save[(Save to DB)]
    Validate -->|No| Error[Show Error]

    I --> Fast[Fast Subsequent Loads]
    J --> Fresh[Always Fresh Data]
    K --> Instant[Instant UI Updates]

    style Save fill:#87CEEB
    style Fast fill:#90EE90
```

### 4. Security Best Practices

```mermaid
flowchart LR
    A[Security Layers] --> B[Authentication]
    A --> C[Authorization]
    A --> D[Data Validation]
    A --> E[API Security]

    B --> B1[Supabase Auth]
    B1 --> B2[JWT Tokens]
    B2 --> B3[Session Management]

    C --> C1[Row Level Security]
    C1 --> C2[Profile-based Access]
    C2 --> C3[Policy Enforcement]

    D --> D1[Frontend Validation]
    D1 --> D2[Backend Validation]
    D2 --> D3[Database Constraints]

    E --> E1[API Keys Server-side]
    E1 --> E2[Rate Limiting]
    E2 --> E3[CORS Configuration]

    B3 --> Secure[Secure System]
    C3 --> Secure
    D3 --> Secure
    E3 --> Secure

    style Secure fill:#90EE90
```

### 5. Testing Strategy

```mermaid
flowchart TD
    Tests[Testing Pyramid] --> E2E[E2E Tests - 10%]
    Tests --> Integration[Integration Tests - 30%]
    Tests --> Unit[Unit Tests - 60%]

    E2E --> E2E1[Complete User Journeys]
    E2E1 --> E2E2[Playwright Tests]
    E2E2 --> E2E3[Critical Paths Only]

    Integration --> I1[API Endpoints]
    Integration --> I2[Database Operations]
    Integration --> I3[Agent Coordination]

    Unit --> U1[Component Tests]
    Unit --> U2[Utility Functions]
    Unit --> U3[Hooks Tests]

    E2E3 --> Run[CI/CD Pipeline]
    I1 --> Run
    I2 --> Run
    I3 --> Run
    U1 --> Run
    U2 --> Run
    U3 --> Run

    Run --> Deploy{All Pass?}
    Deploy -->|Yes| Prod[Deploy to Production]
    Deploy -->|No| Fix[Fix Issues]

    Fix --> Tests

    style Prod fill:#90EE90
    style Fix fill:#FF6B6B
```

---

## 📱 RESPONSIVE DESIGN FLOW

```mermaid
flowchart TD
    Device[User Device] --> Detect{Screen Size}

    Detect -->|Mobile < 768px| Mobile[Mobile Layout]
    Detect -->|Tablet 768-1024px| Tablet[Tablet Layout]
    Detect -->|Desktop > 1024px| Desktop[Desktop Layout]

    Mobile --> M1[Stack Vertically]
    Mobile --> M2[Hide Sidebar]
    Mobile --> M3[Touch Gestures]

    Tablet --> T1[Collapsible Sidebar]
    Tablet --> T2[Hybrid Navigation]

    Desktop --> D1[Full Sidebar]
    Desktop --> D2[Keyboard Shortcuts]
    Desktop --> D3[Multi-column Layouts]

    M1 --> Render[Render UI]
    M2 --> Render
    M3 --> Render
    T1 --> Render
    T2 --> Render
    D1 --> Render
    D2 --> Render
    D3 --> Render

    style Render fill:#90EE90
```

---

## 🚀 DEPLOYMENT FLOW

```mermaid
flowchart TD
    Dev[Development] --> Commit[Git Commit]
    Commit --> Push[Git Push]
    Push --> CI[GitHub Actions CI]

    CI --> Build[Build Frontend]
    CI --> Lint[Lint & Type Check]
    CI --> Test[Run Tests]

    Build --> Check{All Pass?}
    Lint --> Check
    Test --> Check

    Check -->|No| Fail[Build Failed]
    Check -->|Yes| Preview[Deploy Preview]

    Preview --> Review[Code Review]
    Review --> Approve{Approved?}

    Approve -->|No| Revise[Request Changes]
    Approve -->|Yes| Merge[Merge to Main]

    Merge --> ProdBuild[Production Build]
    ProdBuild --> Deploy[Deploy to Vercel]
    Deploy --> Health[Health Check]

    Health --> Live{Healthy?}
    Live -->|No| Rollback[Automatic Rollback]
    Live -->|Yes| Production[Live in Production]

    Fail --> Fix[Fix Issues]
    Revise --> Fix
    Rollback --> Fix
    Fix --> Dev

    style Production fill:#90EE90
    style Fail fill:#FF6B6B
    style Rollback fill:#FF6B6B
```

---

## 📊 MONITORING & ANALYTICS

```mermaid
flowchart LR
    User[User Actions] --> Track[Analytics Events]

    Track --> Events{Event Types}

    Events --> E1[Page Views]
    Events --> E2[Conversions]
    Events --> E3[Errors]
    Events --> E4[Performance]

    E1 --> GA[Google Analytics]
    E2 --> GA
    E3 --> Sentry[Error Tracking]
    E4 --> Perf[Performance Monitoring]

    GA --> Dashboard[Analytics Dashboard]
    Sentry --> Alerts[Error Alerts]
    Perf --> Metrics[Performance Metrics]

    Dashboard --> Insights[Business Insights]
    Alerts --> Fix[Bug Fixes]
    Metrics --> Optimize[Performance Optimization]

    style Insights fill:#90EE90
    style Fix fill:#FFD700
    style Optimize fill:#87CEEB
```

---

**Created**: October 26, 2025
**Last Updated**: October 26, 2025
**Status**: ✅ Complete Reference Documentation
