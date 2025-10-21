# Medellin AI Hub - System Diagrams

## 📦 PROJECT DESCRIPTION

**Project Name:** Medellin AI Hub
**Goal:** AI-powered startup accelerator platform that connects entrepreneurs with resources, perks, and opportunities through intelligent onboarding and matching.
**Main Actors:** Startup Founder, Admin, AI System, Database, Edge Functions, External APIs (OAuth, Payment)
**Core Workflows:** User signup, 10-stage wizard onboarding, AI analysis, perk matching, pitch deck generation, dashboard management
**Primary Entity for State Diagram:** Startup Profile
**User Journey Stages:** Discovery → Signup → Wizard Onboarding → AI Analysis → Resource Matching → Dashboard Engagement → Community Growth

---

## 1️⃣ FLOWCHART - Overall System Flow

```mermaid
flowchart TD
    Start([User Visits Platform]) --> Auth{Authenticated?}
    Auth -->|No| Login[Login/Signup Page]
    Auth -->|Yes| Dashboard[User Dashboard]

    Login --> OAuth{OAuth or Email?}
    OAuth -->|Google/GitHub| OAuthFlow[External OAuth]
    OAuth -->|Email| EmailAuth[Email/Password]
    OAuthFlow --> CreateProfile[Create Profile]
    EmailAuth --> CreateProfile

    CreateProfile --> Onboarding[Initial Onboarding]
    Onboarding --> WizardEntry[Wizard Entry Screen]

    WizardEntry --> Stage1[Stage 1: Founder Info]
    Stage1 --> Stage2[Stage 2: Product Overview]
    Stage2 --> Stage3[Stage 3: Tech Stack]
    Stage3 --> Stage4[Stage 4: Evidence]
    Stage4 --> Stage5[Stage 5: Team]
    Stage5 --> Stage6[Stage 6: Goals]

    Stage6 --> AIAnalysis[Stage 7: AI Analysis]
    AIAnalysis --> ProcessData[AI Processes All Data]
    ProcessData --> GenerateInsights[Generate Insights]
    GenerateInsights --> Stage8[Stage 8: Perk Matching]

    Stage8 --> MatchPerks[AI Matches Perks]
    MatchPerks --> Stage9[Stage 9: Pitch Deck]

    Stage9 --> DeckGen{Generate or Skip?}
    DeckGen -->|Generate| CreateDeck[AI Creates Deck]
    DeckGen -->|Skip| Stage10
    CreateDeck --> EditDeck[User Edits Deck]
    EditDeck --> Stage10[Stage 10: Completion]

    Stage10 --> Celebrate[Confetti Animation]
    Celebrate --> Dashboard

    Dashboard --> Actions{User Action}
    Actions -->|Browse| Events[Events/Jobs/Perks]
    Actions -->|Create| PitchDeck[Pitch Deck Creator]
    Actions -->|Manage| Settings[Settings]
    Actions -->|Chat| AIChatBot[AI Assistant]

    Events --> Dashboard
    PitchDeck --> ExportDeck[Export PPTX/PDF]
    ExportDeck --> Dashboard
    Settings --> Dashboard
    AIChatBot --> Dashboard
```

---

## 2️⃣ SEQUENCE DIAGRAM - Startup Wizard Onboarding

```mermaid
sequenceDiagram
    participant Founder as Startup Founder
    participant UI as Frontend UI
    participant Auth as Supabase Auth
    participant Edge as Edge Functions
    participant AI as AI Service
    participant DB as Database

    Note over Founder,DB: Authentication Flow
    Founder->>UI: Click "Start Your Journey"
    UI->>Auth: Initiate OAuth (Google)
    Auth-->>UI: Return JWT token
    UI->>DB: Create user profile
    DB-->>UI: Profile created
    UI->>Founder: Redirect to /wizard

    Note over Founder,DB: Wizard Stages 1-6
    Founder->>UI: Fill Stage 1 (Founder Info)
    UI->>Edge: Auto-save data (30s interval)
    Edge->>DB: UPDATE startup_profiles
    DB-->>Edge: Success
    Edge-->>UI: Saved ✓

    Founder->>UI: Complete Stages 2-6
    UI->>Edge: Save each stage
    Edge->>DB: Store wizard data

    Note over Founder,DB: AI Analysis (Stage 7)
    Founder->>UI: Submit for AI Analysis
    UI->>Edge: POST /analyze-startup
    Edge->>DB: Fetch all wizard data
    DB-->>Edge: Return startup data
    Edge->>AI: Send data for analysis
    AI-->>Edge: Return insights (strengths, risks, recommendations)
    Edge->>DB: Save analysis results
    DB-->>Edge: Analysis saved
    Edge-->>UI: Return analysis
    UI->>Founder: Display AI insights

    Note over Founder,DB: Perk Matching (Stage 8)
    Founder->>UI: Request perk matches
    UI->>Edge: POST /match-perks
    Edge->>DB: Get startup profile + available perks
    DB-->>Edge: Return data
    Edge->>AI: Match perks to startup needs
    AI-->>Edge: Return ranked perk list
    Edge-->>UI: Matched perks
    UI->>Founder: Display recommendations

    Note over Founder,DB: Pitch Deck Generation (Stage 9)
    Founder->>UI: Generate pitch deck
    UI->>Edge: POST /generate-deck-outline
    Edge->>AI: Create 10-slide deck
    AI-->>Edge: Return slides with content
    Edge->>DB: Save pitch_decks + deck_slides
    DB-->>Edge: Deck saved
    Edge-->>UI: Return deck ID + slides
    UI->>Founder: Show editable deck

    Note over Founder,DB: Completion
    Founder->>UI: Complete wizard
    UI->>DB: Update profile status = 'completed'
    DB-->>UI: Success
    UI->>Founder: Confetti 🎉 + Dashboard redirect
```

---

## 3️⃣ STATE DIAGRAM - Startup Profile Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Created : User signs up

    Created --> WizardInProgress : Start wizard

    WizardInProgress --> Stage1Complete : Complete Stage 1
    Stage1Complete --> Stage2Complete : Complete Stage 2
    Stage2Complete --> Stage3Complete : Complete Stage 3
    Stage3Complete --> Stage4Complete : Complete Stage 4
    Stage4Complete --> Stage5Complete : Complete Stage 5
    Stage5Complete --> Stage6Complete : Complete Stage 6

    Stage6Complete --> AnalysisPending : Submit for AI analysis
    AnalysisPending --> AnalysisComplete : AI completes analysis

    AnalysisComplete --> PerksMatched : Perks matched
    PerksMatched --> DeckGenerated : Pitch deck created

    DeckGenerated --> WizardComplete : Stage 10 completed

    WizardComplete --> Active : Profile active in platform

    Active --> Updated : User updates profile
    Updated --> Active : Changes saved

    Active --> Graduated : Completes accelerator program
    Active --> Inactive : Account suspended
    Inactive --> Active : Account reactivated

    Graduated --> Alumni : Joins alumni network

    note right of AnalysisPending
        AI analyzes:
        - Market opportunity
        - Team strength
        - Product-market fit
        - Risk factors
    end note

    note right of PerksMatched
        AI matches based on:
        - Tech stack
        - Industry
        - Stage
        - Goals
    end note
```

---

## 4️⃣ CLASS DIAGRAM - Database Schema

```mermaid
classDiagram
    class User {
        +uuid id
        +string email
        +string full_name
        +string avatar_url
        +datetime created_at
        +string role
        +boolean is_admin
    }

    class StartupProfile {
        +uuid id
        +uuid user_id
        +string startup_name
        +string one_liner
        +string industry
        +string stage
        +jsonb wizard_data
        +string status
        +datetime wizard_completed_at
        +datetime created_at
    }

    class WizardProgress {
        +uuid id
        +uuid startup_profile_id
        +int current_stage
        +jsonb stage_data
        +datetime last_saved_at
        +boolean auto_save_enabled
    }

    class AIAnalysis {
        +uuid id
        +uuid startup_profile_id
        +jsonb strengths
        +jsonb opportunities
        +jsonb risks
        +jsonb recommendations
        +decimal success_score
        +datetime analyzed_at
    }

    class Perk {
        +uuid id
        +string provider_name
        +string title
        +string description
        +string category
        +decimal value
        +string eligibility_criteria
        +boolean is_active
    }

    class PerkMatch {
        +uuid id
        +uuid startup_profile_id
        +uuid perk_id
        +decimal match_score
        +string reasoning
        +string status
        +datetime matched_at
        +datetime claimed_at
    }

    class PitchDeck {
        +uuid id
        +uuid startup_profile_id
        +string title
        +string theme
        +int slide_count
        +string language
        +string status
        +datetime created_at
        +datetime updated_at
    }

    class DeckSlide {
        +uuid id
        +uuid pitch_deck_id
        +int slide_index
        +string slide_type
        +string title
        +text body_md
        +text speaker_notes
        +jsonb layout_data
    }

    class Event {
        +uuid id
        +uuid organizer_id
        +string title
        +text description
        +datetime event_date
        +string location
        +int capacity
        +string status
    }

    class Job {
        +uuid id
        +uuid startup_profile_id
        +string title
        +text description
        +string employment_type
        +decimal salary_min
        +decimal salary_max
        +string status
    }

    class JobApplication {
        +uuid id
        +uuid job_id
        +uuid user_id
        +text cover_letter
        +string resume_url
        +string status
        +datetime applied_at
    }

    User "1" --> "1" StartupProfile : has
    StartupProfile "1" --> "1" WizardProgress : tracks
    StartupProfile "1" --> "0..1" AIAnalysis : receives
    StartupProfile "1" --> "many" PerkMatch : gets
    Perk "1" --> "many" PerkMatch : matched_to
    StartupProfile "1" --> "many" PitchDeck : creates
    PitchDeck "1" --> "many" DeckSlide : contains
    User "1" --> "many" Event : organizes
    StartupProfile "1" --> "many" Job : posts
    Job "1" --> "many" JobApplication : receives
    User "1" --> "many" JobApplication : submits
```

---

## 5️⃣ USER JOURNEY DIAGRAM - Founder Experience

```mermaid
journey
    title Startup Founder Journey - Medellin AI Hub

    section Discovery
      Visit Homepage: 5: Founder
      Read About Program: 4: Founder
      Check Success Stories: 5: Founder
      Click "Start Your Journey": 5: Founder

    section Authentication
      Choose Signup Method: 4: Founder
      Complete OAuth Flow: 5: System
      Create Initial Profile: 4: Founder
      Receive Welcome Email: 3: System

    section Wizard Onboarding
      Enter Founder Info (Stage 1): 4: Founder
      Describe Product (Stage 2): 5: Founder
      Select Tech Stack (Stage 3): 5: Founder
      Share Metrics (Stage 4): 4: Founder
      List Team Members (Stage 5): 4: Founder
      Define Growth Goals (Stage 6): 5: Founder
      Auto-Save Progress: 5: System

    section AI Analysis
      Submit for Analysis (Stage 7): 5: Founder
      Wait for AI Processing: 3: System
      Review Strengths: 5: Founder
      Understand Risks: 4: Founder
      Read Recommendations: 5: Founder

    section Resource Matching
      View Matched Perks (Stage 8): 5: Founder
      Read Perk Details: 5: Founder
      Claim AWS Credits: 5: Founder
      Claim GitHub Pro: 5: Founder
      Save Perks to Dashboard: 4: System

    section Pitch Deck Creation
      Request Deck Generation (Stage 9): 5: Founder
      AI Creates 10 Slides: 4: System
      Review Generated Content: 4: Founder
      Edit Slide Text: 5: Founder
      Select Theme: 5: Founder
      Export to PowerPoint: 5: Founder
      Download File: 5: System

    section Completion
      See Confetti Celebration (Stage 10): 5: Founder
      Review Next Steps Checklist: 4: Founder
      Navigate to Dashboard: 5: Founder

    section Dashboard Engagement
      View Overview Metrics: 4: Founder
      Browse Upcoming Events: 5: Founder
      Check Job Matches: 4: Founder
      Explore Community Posts: 3: Founder
      Ask AI Assistant Question: 5: Founder, System
      Receive Helpful Response: 5: System

    section Ongoing Usage
      Register for Event: 5: Founder
      Apply to Job Posting: 4: Founder
      Update Startup Profile: 4: Founder
      Generate New Pitch Deck: 5: Founder
      Share Success Story: 5: Founder
      Refer Another Startup: 5: Founder
```

---

## 6️⃣ SEQUENCE DIAGRAM - Pitch Deck Creator Flow

```mermaid
sequenceDiagram
    participant User as Startup Founder
    participant UI as Pitch Deck UI
    participant Hook as usePitchDeckGenerator
    participant Edge as Edge Functions
    participant AI as AI Service (Lovable)
    participant DB as Supabase Database
    participant Export as pptxgenjs Library

    Note over User,Export: Deck Generation
    User->>UI: Navigate to /pitch-deck-creator
    UI->>DB: Check for existing decks
    DB-->>UI: Return user's deck list

    User->>UI: Enter prompt + options (10 slides, EN)
    UI->>Hook: generateDeck(prompt, options)
    Hook->>Edge: POST /generate-deck-outline

    Edge->>AI: Send prompt to Lovable AI
    AI-->>Edge: Return 10 slides with titles + content
    Edge->>DB: INSERT pitch_decks + deck_slides
    DB-->>Edge: Return deck_id
    Edge-->>Hook: Return deck data
    Hook-->>UI: Update slides state
    UI->>User: Display slide list + first slide preview

    Note over User,Export: Editing & Theming
    User->>UI: Click slide 3
    UI->>Hook: setActiveSlide(3)
    Hook-->>UI: Update active slide
    UI->>User: Show slide 3 in editor

    User->>UI: Edit slide content
    UI->>Hook: updateSlideContent(3, newContent)
    Hook->>Edge: POST /save-pitch-deck (debounced 30s)
    Edge->>DB: UPDATE deck_slides
    DB-->>Edge: Success
    Edge-->>Hook: Saved
    Hook-->>UI: Show "Saved ✓" indicator

    User->>UI: Select theme "Modern"
    UI->>Hook: setTheme("Modern")
    Hook-->>UI: Update theme state
    UI->>User: Re-render all slides with new theme

    Note over User,Export: PowerPoint Export
    User->>UI: Click "Export PowerPoint"
    UI->>Hook: exportToPowerPoint()
    Hook->>Edge: POST /export-deck-pptx

    Edge->>DB: Fetch deck + all slides
    DB-->>Edge: Return complete deck data
    Edge->>Export: Create pptx object
    Export->>Export: Apply theme styles
    Export->>Export: Add slides with content
    Export->>Export: Generate binary file
    Export-->>Edge: Return base64 pptx
    Edge-->>Hook: Return file blob
    Hook-->>UI: Trigger browser download
    UI->>User: Download "pitch-deck.pptx"

    Note over User,Export: Presentation Mode
    User->>UI: Click "Present"
    UI->>Hook: enterPresentationMode()
    Hook-->>UI: Set fullscreen state
    UI->>User: Display fullscreen slide 1

    User->>UI: Press Arrow Right key
    UI->>Hook: nextSlide()
    Hook-->>UI: Increment slide index
    UI->>User: Display slide 2

    User->>UI: Press Escape key
    UI->>Hook: exitPresentationMode()
    Hook-->>UI: Exit fullscreen
    UI->>User: Return to editor view
```

---

## 7️⃣ FLOWCHART - AI Chat Assistant

```mermaid
flowchart TD
    Start([User Opens Chat Widget]) --> CheckAuth{Authenticated?}
    CheckAuth -->|No| ShowLogin[Show Login Prompt]
    CheckAuth -->|Yes| LoadChat[Load Chat Interface]

    ShowLogin --> Login[User Logs In]
    Login --> LoadChat

    LoadChat --> GetContext[Get Current Page Context]
    GetContext --> CheckHistory{Previous Conversation?}

    CheckHistory -->|Yes| LoadHistory[Load Chat History from DB]
    CheckHistory -->|No| ShowGreeting[Show AI Greeting]

    LoadHistory --> DisplayChat[Display Chat UI]
    ShowGreeting --> DisplayChat

    DisplayChat --> WaitInput[Wait for User Input]

    WaitInput --> UserTypes[User Types Message]
    UserTypes --> SendMessage[User Clicks Send]

    SendMessage --> ProcessInput[Process User Input]
    ProcessInput --> CheckIntent{Classify Intent}

    CheckIntent -->|Question| AnswerQuestion[Generate Answer]
    CheckIntent -->|Action Request| PerformAction[Execute Action]
    CheckIntent -->|Navigation| GuideUser[Provide Navigation Help]
    CheckIntent -->|Unclear| Clarify[Ask Clarifying Question]

    AnswerQuestion --> CallAI[Call AI Service]
    CallAI --> EnrichContext[Add User Profile + Page Context]
    EnrichContext --> GenerateResponse[Generate AI Response]
    GenerateResponse --> SaveMessage[Save to Chat History]
    SaveMessage --> DisplayResponse[Display AI Message]

    PerformAction --> CheckPermission{User Has Permission?}
    CheckPermission -->|Yes| ExecuteAction[Execute Requested Action]
    CheckPermission -->|No| DenyAction[Explain Permission Issue]

    ExecuteAction --> ConfirmAction[Confirm Action Completed]
    ConfirmAction --> DisplayResponse
    DenyAction --> DisplayResponse

    GuideUser --> CreateNavLink[Create Navigation Link]
    CreateNavLink --> DisplayResponse

    Clarify --> DisplayResponse

    DisplayResponse --> SuggestActions[Show Quick Action Buttons]
    SuggestActions --> WaitInput

    WaitInput --> UserCloses{User Closes Chat?}
    UserCloses -->|Yes| SaveState[Save Chat State]
    UserCloses -->|No| WaitInput

    SaveState --> End([Chat Session Ended])

    style CallAI fill:#f96,stroke:#333,stroke-width:2px
    style ExecuteAction fill:#9f6,stroke:#333,stroke-width:2px
    style CheckAuth fill:#ff9,stroke:#333,stroke-width:2px
```

---

## 8️⃣ STATE DIAGRAM - Pitch Deck Lifecycle

```mermaid
stateDiagram-v2
    [*] --> NotCreated : User on /pitch-deck-creator

    NotCreated --> Generating : Click "Generate Presentation"

    Generating --> GenerationFailed : AI error
    Generating --> Generated : Success (10 slides created)

    GenerationFailed --> NotCreated : User clicks "Retry"

    Generated --> Draft : Initial save to DB

    Draft --> Editing : User modifies slide
    Editing --> Saving : Auto-save triggered (30s)
    Saving --> Draft : Saved successfully
    Saving --> SaveFailed : Network error
    SaveFailed --> Editing : User retries

    Draft --> ThemeChanging : User selects new theme
    ThemeChanging --> Draft : Theme applied

    Draft --> Exporting : User clicks "Export PowerPoint"
    Exporting --> ExportFailed : Export error
    Exporting --> Exported : .pptx file created

    ExportFailed --> Draft : User retries
    Exported --> Draft : User continues editing

    Draft --> Presenting : User clicks "Present"
    Presenting --> Draft : User exits presentation

    Draft --> Published : User clicks "Publish"
    Published --> Draft : User unpublishes

    Draft --> Archived : User archives deck
    Archived --> Draft : User restores deck

    Draft --> Deleted : User deletes deck
    Deleted --> [*]

    note right of Generating
        AI creates:
        - Slide titles
        - Body content
        - Speaker notes
    end note

    note right of Saving
        Auto-save prevents
        data loss on:
        - Page refresh
        - Browser close
        - Network issues
    end note
```

---

## 9️⃣ FLOWCHART - Perk Matching Algorithm

```mermaid
flowchart TD
    Start([AI Perk Matching Triggered]) --> FetchProfile[Fetch Startup Profile]
    FetchProfile --> FetchPerks[Fetch All Active Perks]
    FetchPerks --> ExtractFeatures[Extract Startup Features]

    ExtractFeatures --> TechStack[Tech Stack Tags]
    ExtractFeatures --> Industry[Industry Category]
    ExtractFeatures --> Stage[Startup Stage]
    ExtractFeatures --> Goals[Growth Goals]
    ExtractFeatures --> Budget[Budget Constraints]

    TechStack --> MatchLoop{For Each Perk}
    Industry --> MatchLoop
    Stage --> MatchLoop
    Goals --> MatchLoop
    Budget --> MatchLoop

    MatchLoop --> CheckEligibility{Meets Eligibility?}

    CheckEligibility -->|No| NextPerk[Skip Perk]
    CheckEligibility -->|Yes| ScorePerk[Calculate Match Score]

    ScorePerk --> TechMatch{Tech Stack Match?}
    TechMatch -->|Yes| AddPoints1[+30 points]
    TechMatch -->|No| NoPoints1[+0 points]

    AddPoints1 --> IndustryMatch{Industry Match?}
    NoPoints1 --> IndustryMatch

    IndustryMatch -->|Yes| AddPoints2[+25 points]
    IndustryMatch -->|No| NoPoints2[+0 points]

    AddPoints2 --> StageMatch{Stage Match?}
    NoPoints2 --> StageMatch

    StageMatch -->|Yes| AddPoints3[+20 points]
    StageMatch -->|No| NoPoints3[+0 points]

    AddPoints3 --> GoalMatch{Goal Alignment?}
    NoPoints3 --> GoalMatch

    GoalMatch -->|Yes| AddPoints4[+15 points]
    GoalMatch -->|No| NoPoints4[+0 points]

    AddPoints4 --> ValueMatch{High Value for Stage?}
    NoPoints4 --> ValueMatch

    ValueMatch -->|Yes| AddPoints5[+10 points]
    ValueMatch -->|No| NoPoints5[+0 points]

    AddPoints5 --> StorePerkMatch[Store Perk Match Score]
    NoPoints5 --> StorePerkMatch

    StorePerkMatch --> GenerateReasoning[AI Generate Reasoning]
    GenerateReasoning --> NextPerk

    NextPerk --> MorePerks{More Perks?}
    MorePerks -->|Yes| MatchLoop
    MorePerks -->|No| SortResults[Sort by Match Score]

    SortResults --> FilterTop[Take Top 10 Matches]
    FilterTop --> SaveToDB[Save Matches to Database]
    SaveToDB --> ReturnResults[Return Ranked Perk List]

    ReturnResults --> End([Display to User in Stage 8])

    style CheckEligibility fill:#ff9,stroke:#333,stroke-width:2px
    style ScorePerk fill:#f96,stroke:#333,stroke-width:2px
    style ReturnResults fill:#9f6,stroke:#333,stroke-width:2px
```

---

## 🔟 SEQUENCE DIAGRAM - Admin Panel Operations

```mermaid
sequenceDiagram
    participant Admin as Admin User
    participant UI as Admin UI
    participant Auth as Auth Middleware
    participant API as Admin API
    participant DB as Database
    participant Email as Email Service
    participant Audit as Audit Log

    Note over Admin,Audit: Admin Login
    Admin->>UI: Navigate to /admin
    UI->>Auth: Verify JWT token
    Auth->>DB: Check user role
    DB-->>Auth: role = 'admin'
    Auth-->>UI: Access granted
    UI->>Admin: Display admin dashboard

    Note over Admin,Audit: User Management
    Admin->>UI: Navigate to /admin/users
    UI->>API: GET /admin/users
    API->>DB: SELECT * FROM users
    DB-->>API: Return user list
    API-->>UI: User data
    UI->>Admin: Display user table

    Admin->>UI: Click "Edit User"
    UI->>API: GET /admin/users/:id
    API->>DB: SELECT user details
    DB-->>API: User data
    API-->>UI: Full user profile
    UI->>Admin: Show edit form

    Admin->>UI: Update user role to "moderator"
    UI->>API: PUT /admin/users/:id
    API->>Auth: Verify admin permission
    Auth-->>API: Authorized
    API->>DB: UPDATE users SET role = 'moderator'
    DB-->>API: Success
    API->>Audit: Log action: "Role changed by Admin"
    Audit-->>API: Logged
    API-->>UI: Update successful
    UI->>Admin: Show success message

    Note over Admin,Audit: Event Moderation
    Admin->>UI: Navigate to /admin/events
    UI->>API: GET /admin/events?status=pending
    API->>DB: SELECT pending events
    DB-->>API: Return 5 pending events
    API-->>UI: Event list
    UI->>Admin: Display pending approvals

    Admin->>UI: Review event details
    Admin->>UI: Click "Approve"
    UI->>API: POST /admin/events/:id/approve
    API->>Auth: Verify admin permission
    Auth-->>API: Authorized
    API->>DB: UPDATE events SET status = 'approved'
    DB-->>API: Success
    API->>Email: Send approval notification to organizer
    Email-->>API: Email queued
    API->>Audit: Log action: "Event approved by Admin"
    Audit-->>API: Logged
    API-->>UI: Approval successful
    UI->>Admin: Show "Event published"

    Note over Admin,Audit: Audit Log Review
    Admin->>UI: Navigate to /admin/audit-logs
    UI->>API: GET /admin/audit-logs
    API->>DB: SELECT * FROM audit_logs ORDER BY created_at DESC
    DB-->>API: Return audit entries
    API-->>UI: Audit log data
    UI->>Admin: Display activity table

    Admin->>UI: Filter by action type "user_deleted"
    UI->>API: GET /admin/audit-logs?action=user_deleted
    API->>DB: SELECT filtered logs
    DB-->>API: Filtered results
    API-->>UI: Filtered audit data
    UI->>Admin: Show filtered entries
```

---

## Documentation Notes

### Diagram Usage

**Flowcharts** - Use for:
- Overall system architecture
- Decision trees
- Process flows with branching logic

**Sequence Diagrams** - Use for:
- API interactions
- Multi-step workflows
- Actor-to-actor communication

**State Diagrams** - Use for:
- Entity lifecycle management
- Status transitions
- Workflow states

**Class Diagrams** - Use for:
- Database schema documentation
- Entity relationships
- Data modeling

**Journey Diagrams** - Use for:
- User experience mapping
- Customer journey documentation
- UX research presentations

### Rendering

These diagrams can be rendered in:
- GitHub Markdown (native support)
- Mermaid Live Editor (https://mermaid.live)
- Documentation platforms (GitBook, Docusaurus)
- VS Code (with Mermaid extensions)

### Updating

When updating diagrams:
1. Edit the Mermaid code directly
2. Verify syntax in Mermaid Live Editor
3. Update related documentation
4. Commit with descriptive message

---

**Document Version:** 1.0
**Created:** October 11, 2025
**Project:** Medellin AI Hub
**Purpose:** Visual system architecture documentation
