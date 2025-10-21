# Pitch Deck Generator - Data Flow Diagram

🏷️ **Diagram Type:** Flowchart (Data Flow)

💬 **Description:** This flowchart illustrates how data flows through the system from user input to final rendered presentation, including all transformations and storage points.

---

```mermaid
graph LR
    subgraph "Input Layer"
        USER[User Input<br/>Natural language]
        MSG[Chat Message<br/>"I want to create..."]
    end

    subgraph "Conversation Processing"
        CHAT_REQ[POST Request<br/>{message, conversation_id}]
        AI_CONV[OpenAI Chat<br/>GPT-4o + Tools]
        TOOL_CALL[Tool: save_startup_data<br/>Extract structured data]
        EXTRACT[Extracted Fields<br/>{company_name, industry, ...}]
    end

    subgraph "State Management"
        CONV_STATE[Conversation State<br/>pitch_conversations table]
        PROGRESS[Progress Tracking<br/>0% → 100%]
        READY[Ready Flag<br/>ready_to_generate: true]
    end

    subgraph "Generation Processing"
        GEN_REQ[POST Request<br/>{startup_data}]
        AI_GEN[OpenAI JSON Mode<br/>GPT-4o structured output]
        SCHEMA[JSON Schema<br/>10-slide pitch deck]
        SLIDES[Generated Slides<br/>{title, content, bullets}]
    end

    subgraph "Storage Layer"
        PRES_DB[presentations table<br/>PostgreSQL JSON]
        OUTLINE[Outline Array<br/>["Cover", "Problem", ...]]
        CONTENT[Content Object<br/>{slides: [{...}]}]
    end

    subgraph "Rendering Layer"
        QUERY[React Query<br/>usePresentationQuery]
        SLIDES_DATA[Slides State<br/>Array of slide objects]
        COMP[SlideGridView<br/>Render thumbnails]
        VIEW[User Sees Deck<br/>10 slides with content]
    end

    %% Input to Conversation
    USER -->|Types message| MSG
    MSG -->|Frontend sends| CHAT_REQ
    CHAT_REQ -->|Edge Function calls| AI_CONV

    %% Conversation Processing
    AI_CONV -->|Returns tool call| TOOL_CALL
    TOOL_CALL -->|Extracts| EXTRACT
    EXTRACT -->|Saves to DB| CONV_STATE

    %% State Management
    CONV_STATE -->|Updates| PROGRESS
    PROGRESS -->|When 100%| READY
    READY -->|Enables button| USER

    %% Generation Flow
    USER -->|Clicks "Generate"| GEN_REQ
    GEN_REQ -->|Edge Function calls| AI_GEN
    AI_GEN -->|Follows| SCHEMA
    SCHEMA -->|Produces| SLIDES

    %% Storage
    SLIDES -->|Saved as JSON| PRES_DB
    PRES_DB -->|Stores| OUTLINE
    PRES_DB -->|Stores| CONTENT

    %% Rendering
    PRES_DB -->|React Query fetches| QUERY
    QUERY -->|Maps to| SLIDES_DATA
    SLIDES_DATA -->|Props to| COMP
    COMP -->|Displays| VIEW

    classDef input fill:#e3f2fd,stroke:#1976d2
    classDef process fill:#fff3e0,stroke:#f57c00
    classDef state fill:#f3e5f5,stroke:#7b1fa2
    classDef storage fill:#e8f5e9,stroke:#388e3c
    classDef render fill:#fce4ec,stroke:#c2185b

    class USER,MSG input
    class CHAT_REQ,AI_CONV,TOOL_CALL,EXTRACT,GEN_REQ,AI_GEN,SCHEMA,SLIDES process
    class CONV_STATE,PROGRESS,READY state
    class PRES_DB,OUTLINE,CONTENT storage
    class QUERY,SLIDES_DATA,COMP,VIEW render
```

---

## Data Transformation Pipeline

### 1. **Natural Language → Structured Data**

**Input (User):**
```
"I want to create a pitch deck for HealthTech AI,
an AI-powered telemedicine platform for busy professionals"
```

**Processing (OpenAI Tool Calling):**
```json
{
  "name": "save_startup_data",
  "arguments": {
    "company_name": "HealthTech AI",
    "solution": "AI-powered telemedicine platform",
    "target_market": "busy professionals"
  }
}
```

**Storage (pitch_conversations):**
```json
{
  "conversation_id": "uuid",
  "collected_data": {
    "company_name": "HealthTech AI",
    "solution": "AI-powered telemedicine platform",
    "target_market": "busy professionals"
  },
  "completeness": 50
}
```

---

### 2. **Structured Data → AI-Generated Slides**

**Input (startup_data):**
```json
{
  "company_name": "HealthTech AI",
  "industry": "Healthcare Technology",
  "problem": "Patients waste hours in waiting rooms",
  "solution": "AI-powered telemedicine platform",
  "target_market": "Busy professionals aged 25-45",
  "business_model": "Subscription-based: $29/month"
}
```

**Processing (OpenAI JSON Mode):**
```
System: PITCH_DECK_SYSTEM_PROMPT (10-slide structure)
User: "Create a professional 10-slide pitch deck for: ..."
Model: GPT-4o
Response Format: JSON Object
```

**Output (Generated Slides):**
```json
{
  "title": "HealthTech AI Pitch Deck",
  "company_name": "HealthTech AI",
  "industry": "Healthcare Technology",
  "outline": ["Cover", "Problem", "Solution", ...],
  "slides": [
    {
      "slide_number": 1,
      "title": "Cover",
      "layout": "cover",
      "content": {
        "headline": "HealthTech AI",
        "bullets": ["AI-Powered Telemedicine Platform"],
        "notes": "Revolutionizing healthcare access"
      }
    },
    {
      "slide_number": 2,
      "title": "Problem",
      "layout": "title_content",
      "content": {
        "headline": "Waiting Room Woes",
        "bullets": [
          "Hours wasted in waiting rooms",
          "Limited access to specialists",
          "High demand for efficient healthcare"
        ],
        "notes": "Current healthcare system is inefficient"
      }
    }
    // ... 8 more slides
  ]
}
```

---

### 3. **Database Storage → React Components**

**Database (presentations table):**
```json
{
  "id": "uuid",
  "title": "HealthTech AI Pitch Deck",
  "profile_id": "user-uuid",
  "content": {
    "slides": [...]
  },
  "outline": ["Cover", "Problem", ...],
  "slide_count": 10,
  "status": "completed",
  "theme": "mystique",
  "is_public": true
}
```

**React Query (usePresentationQuery):**
```typescript
const { data: presentation } = usePresentationQuery(id);
// presentation.content.slides → Array of slide objects
```

**Component State (OutlineEditor):**
```typescript
const [slides, setSlides] = useState<Slide[]>([]);

useEffect(() => {
  if (presentation?.content?.slides) {
    const loadedSlides = presentation.content.slides.map((slide, index) => ({
      id: `slide-${index}`,
      title: slide.title,
      order: index,
      layout: slide.layout,
      content: slide.content
    }));
    setSlides(loadedSlides);
  }
}, [presentation]);
```

**Rendering (SlideGridView):**
```tsx
<SlideGridView
  slides={slides}
  onSlideClick={handleClick}
  onDeleteSlide={handleDelete}
/>

// Inside SlideGridView:
{content.headline && (
  <p className="text-xs font-semibold">{content.headline}</p>
)}
{content.bullets?.map((bullet) => (
  <p className="text-xs">• {bullet}</p>
))}
```

---

## Data Schema Overview

### pitch_conversations Table
```sql
CREATE TABLE pitch_conversations (
  conversation_id UUID PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  collected_data JSONB,
  completeness INTEGER,
  messages JSONB[],
  created_at TIMESTAMP
);
```

### presentations Table
```sql
CREATE TABLE presentations (
  id UUID PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  title TEXT,
  content JSONB,           -- Full slide data
  outline TEXT[],          -- Slide titles only
  slide_count INTEGER,
  status TEXT,
  category TEXT,
  theme TEXT,
  is_public BOOLEAN,
  created_at TIMESTAMP
);
```

---

## Performance Metrics

| Stage | Data Size | Processing Time |
|-------|-----------|----------------|
| Chat message → Tool call | 100-500 bytes | 2-3 seconds |
| Extracted data → DB | 200-800 bytes | < 100ms |
| Startup data → OpenAI | 500-1000 bytes | 15 seconds |
| Generated slides → DB | 5-15 KB (JSON) | < 500ms |
| DB query → React state | 5-15 KB | < 100ms |
| React render → DOM | N/A | < 50ms |

**Total End-to-End:** ~20-30 seconds from "Generate Deck" click to viewing slides
