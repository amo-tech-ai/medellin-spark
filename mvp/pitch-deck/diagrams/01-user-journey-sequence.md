# Pitch Deck Generator - User Journey Sequence Diagram

🏷️ **Diagram Type:** Sequence Diagram

💬 **Description:** This sequence diagram shows the complete end-to-end user journey from opening the chat interface to viewing the generated pitch deck with AI-powered content.

---

```mermaid
sequenceDiagram
    participant U as User
    participant UI as React UI<br/>(PitchDeckWizard)
    participant PA as pitch-deck-assistant<br/>(Edge Function)
    participant OpenAI as OpenAI GPT-4o
    participant GEN as generate-pitch-deck<br/>(Edge Function)
    participant DB as Supabase DB

    Note over U,DB: Phase 1: Conversational Data Collection

    U->>UI: Opens /pitch-deck-wizard
    UI->>U: Shows welcome message

    U->>UI: "I want to create a pitch for HealthTech AI..."
    UI->>PA: POST /pitch-deck-assistant<br/>{message, conversation_id, profile_id}
    PA->>OpenAI: Chat completion with tools<br/>save_startup_data()
    OpenAI->>PA: Response + tool call<br/>(company_name extracted)
    PA->>DB: Save to pitch_conversations
    PA->>UI: {message, completeness: 20%, suggestions}
    UI->>U: "Great! What problem does it solve?"

    Note over U,UI: ... Multi-turn conversation continues ...

    U->>UI: Final answer (industry)
    UI->>PA: POST /pitch-deck-assistant
    PA->>OpenAI: Process message
    OpenAI->>PA: All data collected (6/6 fields)
    PA->>DB: Update conversation (100% complete)
    PA->>UI: {completeness: 100%, ready_to_generate: true}
    UI->>U: Shows "Generate Deck" button

    Note over U,DB: Phase 2: AI Pitch Deck Generation

    U->>UI: Clicks "Generate Deck"
    UI->>GEN: POST /generate-pitch-deck<br/>{startup_data, profile_id}
    GEN->>OpenAI: Chat completion (JSON mode)<br/>PITCH_DECK_SYSTEM_PROMPT
    OpenAI->>GEN: JSON with 10 slides<br/>{title, slides[{content, bullets}]}
    GEN->>DB: INSERT presentations<br/>(content, outline, theme)
    DB->>GEN: presentation_id
    GEN->>UI: {success: true, presentation_id}

    Note over U,DB: Phase 3: View Generated Deck

    UI->>U: Redirect to /presentations/{id}/view
    U->>UI: Opens presentation
    UI->>DB: SELECT presentation WHERE id=...
    DB->>UI: Full presentation with 10 slides
    UI->>U: Renders all slides with content
```

---

## Key Interactions

1. **Multi-turn Conversation:** User and AI exchange 5-8 messages to collect startup data
2. **Tool Calling:** OpenAI extracts structured data via `save_startup_data` tool
3. **Progress Tracking:** UI shows 0-100% completeness as fields are collected
4. **Two OpenAI Calls:**
   - Conversation: GPT-4o with function calling
   - Generation: GPT-4o with JSON mode for structured output
5. **Database Operations:**
   - Conversations saved in real-time
   - Final presentation stored with all 10 slides

---

**Performance:**
- Conversation turn: ~2 seconds per message
- Deck generation: ~15 seconds (OpenAI API call)
- Total end-to-end: ~3-5 minutes for complete flow
