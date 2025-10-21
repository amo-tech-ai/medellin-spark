# Pitch Deck Generator - Conversation State Machine

🏷️ **Diagram Type:** State Diagram

💬 **Description:** This state diagram shows how the conversational AI progresses through different states while collecting startup data, tracking completeness from 0% to 100%.

---

```mermaid
stateDiagram-v2
    [*] --> Welcome: User opens wizard

    Welcome --> AskingCompanyName: Initial greeting

    AskingCompanyName --> CollectingData: company_name extracted

    state CollectingData {
        [*] --> Industry: 1/6 fields (17%)
        Industry --> Problem: 2/6 fields (33%)
        Problem --> Solution: 3/6 fields (50%)
        Solution --> TargetMarket: 4/6 fields (67%)
        TargetMarket --> BusinessModel: 5/6 fields (83%)
        BusinessModel --> Complete: 6/6 fields (100%)
    }

    CollectingData --> ReadyToGenerate: All 6 fields collected

    ReadyToGenerate --> Generating: User clicks "Generate Deck"

    state Generating {
        [*] --> CallingOpenAI: POST /generate-pitch-deck
        CallingOpenAI --> ProcessingJSON: GPT-4o returns slides
        ProcessingJSON --> SavingToDB: Validate & structure
        SavingToDB --> [*]: presentation_id created
    }

    Generating --> ViewingDeck: Redirect to /view

    ViewingDeck --> [*]: User views slides

    note right of Welcome
        Progress: 0%
        Message: "Tell me about your startup"
    end note

    note right of CollectingData
        Progress: 17% → 100%
        Fields: company_name, industry,
        problem, solution, target_market,
        business_model
    end note

    note right of ReadyToGenerate
        Progress: 100%
        "Generate Deck" button appears
        AI confirms: "Ready to create your deck!"
    end note

    note right of Generating
        ~15 seconds
        OpenAI creates 10 slides
        Saves to presentations table
    end note
```

---

## State Transitions

### 1. **Welcome** → **AskingCompanyName**
- **Trigger:** User opens `/pitch-deck-wizard`
- **Action:** Display welcome message
- **Next:** Wait for first user input

### 2. **AskingCompanyName** → **CollectingData**
- **Trigger:** User describes their startup
- **Action:** OpenAI extracts `company_name` via tool calling
- **Next:** Ask for next missing field (industry, problem, etc.)

### 3. **CollectingData** (Progressive Loop)
- **Sub-states:** Industry → Problem → Solution → TargetMarket → BusinessModel
- **Progress:** 17% → 33% → 50% → 67% → 83% → 100%
- **Action:** Each message extracts 1+ fields
- **Next:** Continue until all 6 fields collected

### 4. **CollectingData** → **ReadyToGenerate**
- **Trigger:** `completeness === 100%`
- **Action:** Set `ready_to_generate: true`
- **UI Change:** "Generate Deck" button appears in sidebar

### 5. **ReadyToGenerate** → **Generating**
- **Trigger:** User clicks "Generate Deck"
- **Action:** Call `/generate-pitch-deck` Edge Function
- **Duration:** ~15 seconds (OpenAI API call)

### 6. **Generating** → **ViewingDeck**
- **Trigger:** Presentation saved to database
- **Action:** Redirect to `/presentations/{id}/view`
- **Result:** All 10 slides rendered with AI content

---

## Error Handling States

```mermaid
stateDiagram-v2
    CollectingData --> Error: API failure
    Error --> CollectingData: Retry message

    Generating --> GenerationError: OpenAI timeout
    GenerationError --> ReadyToGenerate: Return to wizard

    note right of Error
        Toast: "Sorry, I'm having trouble.
        Please try again."
    end note

    note right of GenerationError
        Toast: "Failed to generate deck.
        Please try again."
    end note
```

---

## Field Validation

Each field has specific validation:

| Field | Type | Example | Validation |
|-------|------|---------|------------|
| company_name | string | "HealthTech AI" | Min 1 char |
| industry | string | "Healthcare Technology" | Min 1 char |
| problem | string | "Patients waste hours..." | Min 10 chars |
| solution | string | "AI-powered telemedicine..." | Min 10 chars |
| target_market | string | "Busy professionals 25-45" | Min 5 chars |
| business_model | string | "Subscription $29/month" | Min 5 chars |

**Completeness Formula:**
```javascript
completeness = (fields_collected / 6) * 100
```

---

## AI Behavior by State

### Welcome State
- **Personality:** Friendly, encouraging
- **Message:** "Hi! I'm Claude, your AI pitch deck assistant..."
- **Suggestions:** None (wait for user to start)

### Collecting Data (0-99%)
- **Personality:** Focused, asking targeted questions
- **Message:** "Great! Now, what problem does {company_name} solve?"
- **Suggestions:** 2-3 example answers
- **Progress Bar:** Visible, updating in real-time

### Ready to Generate (100%)
- **Personality:** Excited, confirming readiness
- **Message:** "Perfect! We have everything. Ready to create your pitch deck?"
- **Button:** "Generate Deck" (primary action)
- **Data Review:** Sidebar shows all 6 collected fields with green checkmarks

### Generating
- **UI:** Loading spinner, toast notification
- **Message:** "Generating your pitch deck... This will take 30-60 seconds"
- **No Interaction:** User cannot send messages during generation
