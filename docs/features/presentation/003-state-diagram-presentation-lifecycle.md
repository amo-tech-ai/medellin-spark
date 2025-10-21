# 003 - State Diagram: Presentation Lifecycle

## Mermaid Diagram

```mermaid
stateDiagram-v2
    [*] --> NotCreated: User opens app

    NotCreated --> Configuring: Click "New Presentation"

    state Configuring {
        [*] --> InputTopic
        InputTopic --> SelectSettings: Topic entered
        SelectSettings --> ReadyToGenerate: Settings configured

        note right of SelectSettings
            Settings:
            • Slides count (5-20)
            • Language (12 options)
            • Style (professional/casual)
            • AI Model (OpenAI/Ollama/LM Studio)
            • Theme (9 built-in + custom)
            • Web Search (ON/OFF)
        end note
    }

    Configuring --> Generating: Click "Generate" / Ctrl+Enter

    state Generating {
        [*] --> CreatingDocument
        CreatingDocument --> GeneratingOutline: BaseDocument created

        state GeneratingOutline {
            [*] --> CheckingSearch
            CheckingSearch --> WebSearchOutline: Search enabled
            CheckingSearch --> SimpleOutline: Search disabled

            WebSearchOutline --> StreamingOutline: Tavily + GPT-4
            SimpleOutline --> StreamingOutline: GPT-4 only

            note right of WebSearchOutline
                Tavily runs 2-3 searches
                GPT-4 uses results
                Takes 5-8 seconds
            end note
        }

        GeneratingOutline --> GeneratingSlides: Outline complete

        state GeneratingSlides {
            [*] --> StreamingXML
            StreamingXML --> ParsingJSON: XML chunks received
            ParsingJSON --> CreatingSlideObjects: All slides parsed
        }

        GeneratingSlides --> SavingToDatabase: Slides created
        SavingToDatabase --> RenderingSlides: Database updated
    }

    Generating --> Draft: Initial render complete

    state Draft {
        [*] --> LoadingImages
        LoadingImages --> ImagesReady: All images generated
        LoadingImages --> DisplayingPlaceholders: Images pending

        DisplayingPlaceholders --> ImagesReady: Images loaded async

        state ImagesReady {
            [*] --> Idle
            Idle --> Editing: User edits text
            Idle --> Reordering: User drags slides
            Idle --> AddingContent: User adds element

            Editing --> AutoSaving: Debounced (2s)
            Reordering --> AutoSaving: Immediate
            AddingContent --> AutoSaving: Debounced (2s)

            AutoSaving --> Idle: Saved to DB
        }

        note right of AutoSaving
            Auto-save triggers:
            • Text edits (2s debounce)
            • Slide reorder (immediate)
            • Add/remove elements (2s)
            • Theme changes (immediate)
        end note
    }

    Draft --> Presenting: User clicks "Present"
    Draft --> Exporting: User clicks "Export"
    Draft --> Published: User clicks "Publish"

    state Presenting {
        [*] --> Fullscreen
        Fullscreen --> NavigatingSlides: Arrow keys / Click
        NavigatingSlides --> Fullscreen: Continue presenting
        NavigatingSlides --> ExitPresent: Press ESC
        ExitPresent --> [*]
    }

    Presenting --> Draft: Exit presentation mode

    state Exporting {
        [*] --> SelectFormat
        SelectFormat --> GeneratingPDF: PDF selected
        SelectFormat --> GeneratingPPTX: PPTX selected

        GeneratingPDF --> RenderingCanvas: html2canvas
        RenderingCanvas --> CreatingPDF: pdf-lib
        CreatingPDF --> DownloadingPDF: PDF ready

        GeneratingPPTX --> ConvertingToSlides: pptxgenjs
        ConvertingToSlides --> DownloadingPPTX: PPTX ready

        DownloadingPDF --> [*]
        DownloadingPPTX --> [*]
    }

    Exporting --> Draft: Export complete

    Published --> Draft: User clicks "Edit"
    Published --> Archived: User clicks "Archive"

    state Published {
        [*] --> PublicURL
        PublicURL --> SharedViewing: Anyone with link
        SharedViewing --> PublicURL: Refresh
    }

    Draft --> Archived: User archives
    Published --> Archived: User archives

    state Archived {
        [*] --> Hidden
        Hidden --> Restored: User restores
        Hidden --> PermanentlyDeleted: User deletes (30 days)
    }

    Archived --> Draft: Restore from archive
    Archived --> [*]: Permanently deleted

    note left of NotCreated
        Entry point:
        User authenticates
        via Google OAuth
    end note

    note right of Draft
        Primary state:
        Most time spent here
        Auto-save keeps data safe
    end note

    note left of Archived
        Soft delete:
        30-day recovery window
        Then permanent deletion
    end note
```

## Explanation

This state diagram maps the complete lifecycle of a presentation from creation to deletion. A presentation begins in the **NotCreated** state when a user opens the app. Clicking "New Presentation" transitions to **Configuring**, where users input a topic and configure settings (slide count, language, style, AI model, theme, web search toggle).

Upon clicking "Generate," the presentation enters the **Generating** composite state, which orchestrates three sequential sub-states: **GeneratingOutline** (with or without Tavily web search), **GeneratingSlides** (streaming XML parsed to JSON), and **SavingToDatabase**. Once database persistence completes, the presentation transitions to **Draft** state.

**Draft** is the primary working state where users spend most of their time. It includes two sub-states: **LoadingImages** (async image generation with placeholders) and **ImagesReady** (the editing-ready state). Within **ImagesReady**, users can **Edit**, **Reorder**, or **AddContent**, all of which trigger **AutoSaving** with debounced or immediate saves depending on the action type.

From **Draft**, presentations can transition to **Presenting** (fullscreen mode with keyboard navigation), **Exporting** (PDF or PPTX generation), or **Published** (public sharing with URL). **Published** presentations can be viewed by anyone with the link. Finally, both **Draft** and **Published** presentations can be **Archived** (soft delete with 30-day recovery) or permanently deleted.

## State Transition Rules

### Entry Conditions
| From State | To State | Trigger | Validation |
|------------|----------|---------|------------|
| **NotCreated** | Configuring | User clicks "New" | User authenticated |
| **Configuring** | Generating | User clicks "Generate" | Topic not empty, settings valid |
| **Generating** | Draft | Slides saved to DB | Database write successful |
| **Draft** | Presenting | User clicks "Present" | At least 1 slide exists |
| **Draft** | Exporting | User clicks "Export" | At least 1 slide exists |
| **Draft** | Published | User clicks "Publish" | User has permission |
| **Draft** | Archived | User clicks "Archive" | Confirmation received |

### Auto-transitions (No User Action Required)
- **GeneratingOutline** → **GeneratingSlides** (when outline stream completes)
- **GeneratingSlides** → **SavingToDatabase** (when all slides parsed)
- **LoadingImages** → **ImagesReady** (when images generated or timeout)
- **AutoSaving** → **Idle** (when database confirms save)

## Composite State Details

### Generating (Composite)
```
CreatingDocument (50-100ms)
  ↓
GeneratingOutline (5-8s with search, 3-5s without)
  ↓
GeneratingSlides (12-18s streaming)
  ↓
SavingToDatabase (100-200ms)
  ↓
RenderingSlides (500ms-1s)
```

**Total Time**: 17-27 seconds (with search), 15-24 seconds (without search)

### Draft (Composite)
```
LoadingImages (async, 3-5s per image, parallel)
  ↓
ImagesReady
  ├─ Idle (waiting for user action)
  ├─ Editing (user typing/formatting)
  ├─ Reordering (user dragging slides)
  ├─ AddingContent (user adding elements)
  └─ AutoSaving (2s debounce or immediate)
```

**Auto-save Strategy**:
- Text edits: 2-second debounce (prevents save spam while typing)
- Slide reorder: Immediate save (structural change)
- Add/remove elements: 2-second debounce
- Theme changes: Immediate save (visual change)

### Exporting (Composite)
```
SelectFormat
  ├─ PDF: html2canvas → pdf-lib → Download (2-4s)
  └─ PPTX: pptxgenjs → Download (1-3s, limited layouts)
```

## Persistence Strategy

### Zustand State (In-Memory)
- **Optimistic updates** - UI changes immediately
- **Fast reads** - No database latency
- **Lost on refresh** - Not persistent (except auto-save)

### Database State (PostgreSQL)
- **Auto-save triggers** - Debounced or immediate
- **Manual save** - Ctrl+S or menu action
- **Recovery** - Restored on page load
- **History** - No version control (last write wins)

### Image State (Async)
- **Generated on-demand** - After slides render
- **Cached in database** - `GeneratedImage` table
- **Reused** - Same prompt returns cached image
- **Fallback** - Placeholder if generation fails

## Error States & Recovery

### Generation Failures
```
Generating → GenerationFailed (if AI API errors)
  ↓
User action required:
  - Retry with same settings
  - Modify prompt and retry
  - Reduce slide count and retry
  - Switch AI model
```

### Auto-save Failures
```
AutoSaving → SaveFailed (if DB connection lost)
  ↓
Retry strategy:
  - Retry 3 times with exponential backoff
  - Show "Unsaved changes" warning
  - Keep changes in Zustand state
  - Attempt save on next user action
```

### Image Generation Failures
```
LoadingImages → ImageFailed (for specific slide)
  ↓
Fallback strategy:
  - Show placeholder with retry button
  - Continue with other images
  - Don't block slide rendering
  - Allow manual prompt edit
```

## Best Practices Demonstrated

✅ **Composite states** - Group related states (Generating, Draft, Exporting)
✅ **Auto-transitions** - Reduce user friction (outline → slides)
✅ **Debounced saves** - Prevent database spam (2s debounce for edits)
✅ **Async operations** - Non-blocking (image generation)
✅ **Soft delete** - Recovery window (30 days in Archived)
✅ **Optimistic UI** - Immediate state updates (Zustand first, DB second)
✅ **Error recovery** - Graceful degradation (retries, fallbacks)
✅ **User feedback** - Clear state indicators (saving, loading, ready)

## State Persistence Across Sessions

| State | Persisted? | Restore Method |
|-------|-----------|----------------|
| **Configuring** | ❌ No | Start fresh |
| **Generating** | ❌ No | Restart generation |
| **Draft** | ✅ Yes | Load from DB via Prisma |
| **Presenting** | ❌ No | Re-enter present mode |
| **Exporting** | ❌ No | Re-export |
| **Published** | ✅ Yes | Public URL remains active |
| **Archived** | ✅ Yes | Restore from archive |

**Implementation**: On page load, if `presentationId` exists in URL, query database for presentation record. If found and not archived, transition to **Draft** state with loaded content. If archived, redirect to archive view with restore option.

---

**Updated**: 2025-10-13
**Repository**: https://github.com/allweonedev/presentation-ai
**Documentation Series**: Part 3 of 6
