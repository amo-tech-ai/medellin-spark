# Product Requirements Document: AI Pitch Deck Wizard

**Project**: Convert Blaxel Travel Copilot → AI Pitch Deck Creator
**Version**: 1.0.0
**Date**: January 25, 2025
**Type**: Feature Development (Conversion Project)

---

## 1. Project Scope

### What We're Building

Convert the existing Blaxel travel copilot multi-agent system into an AI-powered pitch deck creator that:
- Guides users through conversational Q&A to gather startup information
- Generates 8-12 professional presentation slides automatically
- Applies professionally designed templates
- Exports to editable PowerPoint (.pptx) files

### What Already Exists

**Database** (Supabase - Already Configured):
- ✅ `presentations` table with JSONB content storage
- ✅ `pitch_conversations` table with JSONB messages array
- ✅ `presentation_templates` table with template definitions
- ✅ `profiles` table linked to auth.users
- ✅ All foreign keys and indexes already in place

**Frontend Routes** (Already Created):
- ✅ `/pitch-deck` - Landing page
- ✅ `/pitch-deck-wizard` - AI conversation interface (needs CopilotKit integration)
- ✅ `/dashboard/pitch-decks` - List all presentations
- ✅ `/presentations/:id/edit` - Slide editor
- ✅ `/presentations/:id/view` - Presentation viewer

**Backend Infrastructure**:
- ✅ Blaxel agent template with working multi-agent orchestration
- ✅ CopilotKit endpoint structure (`/copilotkit`)
- ✅ FastAPI server with error handling
- ✅ LangGraph supervisor pattern

### What We Need to Build

1. **Content Generation Agent** (replace flight agent)
2. **Template Selection Agent** (replace hotel agent)
3. **Export Agent** (new - PPTX generation)
4. **Supervisor Agent Updates** (orchestrate new agents)
5. **Frontend Integration** (CopilotKit in `/pitch-deck-wizard`)
6. **Real-time Preview** (show slides as they generate)

---

## 2. Core Features

### Feature 1: Conversational Data Gathering

**What It Does**: AI asks 7-10 questions to understand the startup

**Questions Flow**:
1. "What does your startup do? (one sentence)"
2. "What problem are you solving?"
3. "How does your solution work?"
4. "Who is your target customer?"
5. "What's your business model? (How do you make money?)"
6. "Do you have traction? (customers, revenue, users)"
7. "Who's on your founding team?"
8. "How much funding are you raising and why?"

**Technical Implementation**:
```python
# src/content_agent.py
PITCH_DECK_QUESTIONS = [
    {
        "id": "company_description",
        "question": "What does your startup do? Describe it in one sentence.",
        "example": "We help small retailers predict inventory demand using AI"
    },
    {
        "id": "problem",
        "question": "What specific problem does this solve?",
        "example": "Retailers waste 30% of inventory due to poor demand forecasting"
    },
    # ... 6 more questions
]
```

**Data Storage**:
```sql
-- Stored in pitch_conversations.collected_data
{
  "company_name": "Acme Retail AI",
  "company_description": "AI-powered inventory forecasting for small retailers",
  "problem": "Retailers waste 30% of inventory...",
  "solution": "Machine learning predicts demand...",
  "target_market": "Independent grocery stores, 500-5000 sq ft",
  "business_model": "SaaS subscription, $199/month per store",
  "traction": "15 paying customers, $3K MRR, 3 months old",
  "team": "Jane (CEO, ex-Walmart supply chain), Bob (CTO, ML engineer)",
  "funding_ask": "$150K seed for product development and first sales hire"
}
```

**User Journey**:
```
User opens /pitch-deck-wizard
  ↓
AI: "Hi! Tell me about your startup in one sentence"
  ↓
User: "We help retailers forecast inventory demand"
  ↓
AI: "Great! What problem does this solve?"
  ↓
User: "Retailers waste inventory due to poor forecasting"
  ↓
[... 6 more Q&A exchanges ...]
  ↓
AI: "Perfect! I have everything. Generating your deck now..."
  ↓
[30 seconds - slides appear in preview]
  ↓
User sees 10-slide deck
```

---

### Feature 2: Multi-Slide Content Generation

**What It Does**: Generates 8-12 slides from conversation data

**Slide Structure**:
```javascript
// Standard 10-slide pitch deck
const SLIDE_TEMPLATES = [
  {
    slide_number: 1,
    type: "cover",
    title: "{company_name}",
    subtitle: "{company_description}",
    content: ["Founder: {team_founders}", "Seeking: {funding_ask}"]
  },
  {
    slide_number: 2,
    type: "problem",
    title: "The Problem",
    content: [
      "Extract 3 bullet points from {problem}",
      "Add market size context if available",
      "Include pain point statistics"
    ]
  },
  {
    slide_number: 3,
    type: "solution",
    title: "Our Solution",
    content: [
      "Extract 3-4 bullets from {solution}",
      "How it works diagram placeholder",
      "Key differentiators"
    ]
  },
  // ... slides 4-10
]
```

**Agent Logic**:
```python
# src/content_agent.py
async def generate_slides(collected_data: dict) -> list[dict]:
    """Generate all slides from collected conversation data"""

    slides = []

    for template in SLIDE_TEMPLATES:
        # Use GPT-4 to generate slide content
        prompt = f"""
        Generate content for slide {template['slide_number']}: {template['title']}

        User data:
        {json.dumps(collected_data, indent=2)}

        Template requirements:
        {json.dumps(template, indent=2)}

        Return JSON with: title, bullets (3-5), notes (speaker notes)
        """

        slide_content = await llm.ainvoke(prompt)
        slides.append(slide_content)

    return slides
```

**Real-World Example**:
```json
// Generated slide 2: Problem
{
  "slide_number": 2,
  "type": "problem",
  "title": "Retailers Lose $800B Annually to Poor Inventory Management",
  "bullets": [
    "30% of inventory becomes waste due to inaccurate demand forecasting",
    "Small retailers lack data science teams to predict seasonal trends",
    "Manual ordering leads to stockouts during peak demand"
  ],
  "speaker_notes": "Emphasize the $800B figure - this is industry data from NRF. Focus on small retailers (our target) who can't afford enterprise solutions.",
  "layout": "title-and-content"
}
```

---

### Feature 3: Template Selection & Application

**What It Does**: Matches generated content to visual templates

**Template Categories**:
```javascript
// Available in presentation_templates table
const TEMPLATES = [
  {
    id: "modern-startup",
    name: "Modern Startup",
    best_for: ["saas", "tech", "consumer-app"],
    slide_layouts: {
      cover: "centered-logo-and-tagline",
      problem: "three-column-icons",
      solution: "image-left-text-right",
      // ... all 10 slide types
    },
    theme: {
      primary_color: "#1E40AF",
      secondary_color: "#10B981",
      font_heading: "Inter Bold",
      font_body: "Inter Regular"
    }
  },
  {
    id: "professional-business",
    name: "Professional Business",
    best_for: ["b2b", "enterprise", "finance"],
    // ... different layouts, more formal styling
  }
]
```

**Selection Algorithm**:
```python
# src/template_agent.py
def score_template(template: dict, collected_data: dict) -> float:
    """Score how well template matches the startup"""

    score = 0.0

    # Industry match (40% weight)
    user_industry = extract_industry(collected_data["company_description"])
    if user_industry in template["best_for"]:
        score += 0.4

    # Complexity match (30% weight)
    content_complexity = calculate_complexity(collected_data)
    template_complexity = template.get("complexity_level", "medium")
    if content_complexity == template_complexity:
        score += 0.3

    # Style preference (30% weight)
    user_style = collected_data.get("preferred_style", "modern")
    if user_style in template["name"].lower():
        score += 0.3

    return score

async def select_best_template(collected_data: dict) -> dict:
    """Return highest scoring template"""
    templates = await load_templates()

    scored = [
        (score_template(t, collected_data), t)
        for t in templates
    ]

    best_score, best_template = max(scored, key=lambda x: x[0])
    return best_template
```

**Application Process**:
```python
async def apply_template(slides: list[dict], template: dict) -> dict:
    """Map slide content to template layouts"""

    presentation = {
        "id": uuid4(),
        "template_id": template["id"],
        "theme": template["theme"],
        "slides": []
    }

    for slide in slides:
        layout = template["slide_layouts"][slide["type"]]

        formatted_slide = {
            "slide_number": slide["slide_number"],
            "layout": layout,
            "title": slide["title"],
            "content": slide["bullets"],
            "speaker_notes": slide["speaker_notes"],
            "styling": template["theme"]
        }

        presentation["slides"].append(formatted_slide)

    return presentation
```

---

### Feature 4: PPTX Export

**What It Does**: Converts JSON slides to downloadable PowerPoint file

**Technology Stack**:
- **Library**: `python-pptx` (Python library for creating/editing PPTX)
- **Processing**: Export agent runs async to prevent UI blocking
- **Storage**: Supabase Storage for 7-day file hosting

**Implementation**:
```python
# src/export_agent.py
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN

async def export_to_pptx(presentation_data: dict) -> str:
    """Generate PPTX file from presentation data"""

    # Create new presentation
    prs = Presentation()
    prs.slide_width = Inches(10)  # 16:9 aspect ratio
    prs.slide_height = Inches(5.625)

    # Apply theme
    theme = presentation_data["theme"]

    # Generate each slide
    for slide_data in presentation_data["slides"]:
        layout = get_layout(slide_data["layout"])
        slide = prs.slides.add_slide(layout)

        # Add title
        title = slide.shapes.title
        title.text = slide_data["title"]
        title.text_frame.paragraphs[0].font.size = Pt(32)
        title.text_frame.paragraphs[0].font.color.rgb = RGBColor.from_string(theme["primary_color"])

        # Add content bullets
        content_box = slide.placeholders[1]
        text_frame = content_box.text_frame

        for bullet in slide_data["content"]:
            p = text_frame.add_paragraph()
            p.text = bullet
            p.level = 0
            p.font.size = Pt(18)

        # Add speaker notes
        notes_slide = slide.notes_slide
        notes_slide.notes_text_frame.text = slide_data["speaker_notes"]

    # Save to temporary file
    file_path = f"/tmp/{presentation_data['id']}.pptx"
    prs.save(file_path)

    # Upload to Supabase Storage
    with open(file_path, 'rb') as f:
        storage_path = await supabase.storage.from_('presentations').upload(
            f"{presentation_data['id']}.pptx",
            f,
            file_options={"content-type": "application/vnd.openxmlformats-officedocument.presentationml.presentation"}
        )

    # Return public URL (expires in 7 days)
    public_url = supabase.storage.from_('presentations').get_public_url(
        f"{presentation_data['id']}.pptx"
    )

    return public_url
```

**Real-World Usage**:
```
User clicks "Export to PowerPoint"
  ↓
Frontend POST /api/presentations/{id}/export
  ↓
Export agent generates PPTX (10 seconds)
  ↓
File uploaded to Supabase Storage
  ↓
Frontend receives download URL
  ↓
Browser auto-downloads: acme_pitch_deck_2025-01-25.pptx
  ↓
User opens in PowerPoint → All slides formatted correctly
```

---

### Feature 5: Real-Time Preview

**What It Does**: Show slides as they're generated (not after completion)

**Technical Approach**: Server-Sent Events (SSE)

**Backend**:
```python
# src/main.py
from fastapi.responses import StreamingResponse

@app.post("/copilotkit/stream")
async def stream_generation(conversation_id: str):
    """Stream slide generation progress to frontend"""

    async def generate():
        # Get conversation data
        conversation = await db.get_conversation(conversation_id)
        collected_data = conversation["collected_data"]

        # Generate slides one by one
        for i, slide_template in enumerate(SLIDE_TEMPLATES):
            # Generate slide content
            slide = await generate_slide(slide_template, collected_data)

            # Stream to frontend
            yield f"data: {json.dumps({
                'type': 'slide_generated',
                'slide_number': i + 1,
                'total_slides': len(SLIDE_TEMPLATES),
                'slide_data': slide
            })}\n\n"

        # Stream completion
        yield f"data: {json.dumps({
            'type': 'generation_complete',
            'presentation_id': conversation['deck_id']
        })}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
```

**Frontend**:
```typescript
// app-sample/src/app/pitch-deck-wizard/page.tsx
const [slides, setSlides] = useState<Slide[]>([]);
const [progress, setProgress] = useState(0);

useEffect(() => {
  const eventSource = new EventSource(
    `/api/copilotkit/stream?conversation_id=${conversationId}`
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'slide_generated') {
      // Add new slide to preview
      setSlides(prev => [...prev, data.slide_data]);
      setProgress((data.slide_number / data.total_slides) * 100);
    }

    if (data.type === 'generation_complete') {
      eventSource.close();
      router.push(`/presentations/${data.presentation_id}/view`);
    }
  };

  return () => eventSource.close();
}, [conversationId]);
```

**UI Flow**:
```
User completes conversation (80%+)
  ↓
Click "Generate My Pitch Deck"
  ↓
Progress bar appears: "Generating slide 1 of 10..."
  ↓
[3 seconds] Slide 1 appears in preview
  ↓
Progress: "Generating slide 2 of 10..."
  ↓
[3 seconds] Slide 2 appears
  ↓
[... repeat for slides 3-10 ...]
  ↓
Progress: "Complete! 🎉"
  ↓
Redirect to full presentation view
```

---

## 3. User Journeys

### Journey 1: First-Time Founder (Happy Path)

**Actor**: Maria - Building a SaaS product, never created a pitch deck

**Steps**:
1. Maria navigates to `/pitch-deck` landing page
2. Clicks "Create Free Pitch Deck" → Signs up with email
3. Redirected to `/pitch-deck-wizard`
4. Sees chat interface: "Hi! Tell me about your startup in one sentence"
5. Types: "I help small retailers predict inventory demand with AI"
6. AI responds: "Great! What problem does this solve for retailers?"
7. Maria answers 8 more questions (10 minutes total)
8. Progress bar reaches 100%: "Generate My Pitch Deck" button appears
9. Clicks button → Generation animation starts
10. Watches as 10 slides appear one by one in preview panel
11. After 30 seconds, sees "Your pitch deck is ready! 🎉"
12. Reviews slides, clicks "Edit" on slide 3 to add product screenshot
13. Uploads image via drag-and-drop
14. Clicks "Export to PowerPoint"
15. Downloads `maria_retail_saas_pitch_deck_2025-01-25.pptx`
16. Opens in PowerPoint → Perfect formatting
17. Adds final touches (logo on cover slide)
18. Emails to investors

**Time**: 25 minutes from start to download (vs. 20+ hours traditional)

---

### Journey 2: Serial Entrepreneur (Power User)

**Actor**: Carlos - Needs 3 different pitch deck versions for different investors

**Steps**:
1. Carlos opens `/pitch-deck-wizard`
2. Completes conversation in 8 minutes (experienced founder, clear answers)
3. Generates first deck: "VC-focused" version
4. Reviews, exports
5. Clicks "Dashboard" → "Create New"
6. Repeats conversation but emphasizes different metrics for corporate investors
7. Generates second deck: "Corporate strategic" version
8. Exports
9. Creates third variation: "Banking partner" version
10. In 30 minutes, has 3 customized decks

**Time**: 30 minutes for 3 versions (vs. 6+ hours manually)

---

### Journey 3: Accelerator Program Manager

**Actor**: Sofia - Managing 20 startups, needs all to have decks by Demo Day

**Steps**:
1. Sofia creates organization account
2. Invites 20 founders via email
3. Sends message: "Use this AI tool to create your pitch deck by Week 8"
4. Checks dashboard weekly: Sees 18/20 have created decks
5. Reviews presentations in batch: Clicks each → Quick feedback comments
6. Week 10: All 20 decks completed, consistent quality
7. Exports all 20 decks as ZIP for Demo Day packet

**Time**: 2 hours of coaching (vs. 40+ hours traditional)

---

## 4. Development Phases

### Phase 1: Core Agent Conversion (Week 1-2)

**Goal**: Working conversation → slide generation pipeline

**Tasks**:
- [ ] Clone `template-copilot-kit-py` to new directory
- [ ] Rename `travel_copilot.py` → `pitch_deck_copilot.py`
- [ ] Delete `src/flight.py` and `src/hotel.py`
- [ ] Create `src/content_agent.py` with question flow
- [ ] Update `src/agent.py` supervisor to coordinate content agent
- [ ] Test: Start conversation, answer questions, verify data saved to `pitch_conversations` table

**Acceptance Criteria**:
```bash
# Run agent locally
bl serve --hotreload

# Test conversation
curl -X POST http://localhost:1338/copilotkit \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Create a pitch deck for my SaaS startup"}]}'

# Expected: Agent asks first question about company description
```

**Deliverables**:
- ✅ Content agent asks 8-10 questions
- ✅ Responses stored in `pitch_conversations.collected_data`
- ✅ Conversation resumable (can pause/continue)

---

### Phase 2: Slide Generation (Week 3)

**Goal**: Convert conversation data → 10 slides

**Tasks**:
- [ ] Implement `generate_slides()` function in content agent
- [ ] Create prompt templates for each slide type
- [ ] Test GPT-4 content generation with real data
- [ ] Store generated slides in `presentations.content` (JSONB)
- [ ] Verify slide structure matches template requirements

**Test Case**:
```python
# Input: Conversation data
collected_data = {
    "company_name": "Acme Retail AI",
    "company_description": "AI inventory forecasting for retailers",
    "problem": "Retailers waste 30% of inventory...",
    # ... rest of data
}

# Run generation
slides = await generate_slides(collected_data)

# Expected output: 10 slides
assert len(slides) == 10
assert slides[0]["type"] == "cover"
assert slides[1]["type"] == "problem"
assert slides[2]["type"] == "solution"
# ... validate all 10
```

**Deliverables**:
- ✅ 10 slides generated from conversation
- ✅ Content quality validated (no hallucinations)
- ✅ Slides saved to database

---

### Phase 3: Template System (Week 4)

**Goal**: Apply visual templates to slides

**Tasks**:
- [ ] Create `src/template_agent.py`
- [ ] Load templates from `presentation_templates` table
- [ ] Implement template scoring algorithm
- [ ] Map slide content to template layouts
- [ ] Test template application with 3 different templates

**Database Setup**:
```sql
-- Insert 3 starter templates
INSERT INTO presentation_templates (name, category, slides, theme) VALUES
('Modern Startup', 'pitch-deck',
  '{"cover": "centered-logo", "problem": "three-columns", ...}'::jsonb,
  '{"primary": "#1E40AF", "secondary": "#10B981", ...}'::jsonb
),
('Professional Business', 'pitch-deck',
  '{"cover": "formal-title", "problem": "bullet-list", ...}'::jsonb,
  '{"primary": "#1F2937", "secondary": "#059669", ...}'::jsonb
),
('Tech Minimalist', 'pitch-deck',
  '{"cover": "large-text", "problem": "icon-grid", ...}'::jsonb,
  '{"primary": "#6366F1", "secondary": "#8B5CF6", ...}'::jsonb
);
```

**Deliverables**:
- ✅ Template agent selects correct template (80%+ accuracy)
- ✅ Slides mapped to template layouts
- ✅ Template data stored in `presentations.template_id`

---

### Phase 4: Frontend Integration (Week 5-6)

**Goal**: Working UI in `/pitch-deck-wizard`

**Tasks**:
- [ ] Update `/pitch-deck-wizard` page with CopilotKit
- [ ] Implement chat interface for conversation
- [ ] Add progress bar for completion tracking
- [ ] Create slide preview component
- [ ] Implement SSE for real-time slide streaming
- [ ] Add export button and download flow

**Frontend Code**:
```typescript
// app-sample/src/app/pitch-deck-wizard/page.tsx
"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { SlidePreview } from "./components/SlidePreview";

export default function PitchDeckWizard() {
  return (
    <CopilotKit url="/api/copilotkit/">
      <div className="flex h-screen">
        <CopilotSidebar
          instructions="You are a pitch deck creation assistant.
          Ask 8-10 questions to gather startup information.
          When 80% complete, offer to generate the deck."
          defaultOpen={true}
          className="w-1/2"
        />

        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <SlidePreview />
        </div>
      </div>
    </CopilotKit>
  );
}
```

**Deliverables**:
- ✅ Chat interface functional
- ✅ Slides appear in preview as generated
- ✅ Export downloads PPTX file
- ✅ Mobile responsive

---

### Phase 5: Export Agent (Week 7)

**Goal**: Generate PowerPoint files

**Tasks**:
- [ ] Create `src/export_agent.py`
- [ ] Implement PPTX generation with `python-pptx`
- [ ] Upload files to Supabase Storage
- [ ] Create download endpoint
- [ ] Test exports in PowerPoint, Google Slides, Keynote

**Dependencies**:
```toml
# pyproject.toml
dependencies = [
    "python-pptx>=0.6.23",
    "Pillow>=10.0.0",  # Image processing
]
```

**Test**:
```bash
# Generate presentation
curl -X POST http://localhost:1338/api/presentations/123/export

# Expected response:
{
  "download_url": "https://xyz.supabase.co/storage/v1/object/public/presentations/123.pptx",
  "expires_at": "2025-02-01T00:00:00Z"
}

# Download and open in PowerPoint → Verify formatting
```

**Deliverables**:
- ✅ PPTX generation working
- ✅ Files downloadable
- ✅ Formatting preserved in PowerPoint

---

### Phase 6: Testing & Polish (Week 8)

**Goal**: Production-ready quality

**Tasks**:
- [ ] End-to-end testing (conversation → export)
- [ ] Performance optimization (<30s generation)
- [ ] Error handling (what if AI fails?)
- [ ] Deploy to Blaxel production
- [ ] Load testing (100 concurrent users)

**Test Scenarios**:
1. **Happy path**: Complete flow works
2. **Incomplete data**: User abandons at 50% → Resume later
3. **AI failure**: OpenAI timeout → Retry with fallback
4. **Export failure**: Storage error → Clear error message
5. **Concurrent load**: 100 users generating simultaneously

**Deliverables**:
- ✅ All tests passing
- ✅ Deployed to production
- ✅ Monitoring configured

---

## 5. Database Integration

### Tables We're Using

#### `pitch_conversations`
```sql
CREATE TABLE pitch_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  collected_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'active',
  deck_id UUID REFERENCES presentations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pitch_conversations_profile_id ON pitch_conversations(profile_id);
CREATE INDEX idx_pitch_conversations_status ON pitch_conversations(status);
```

**Usage**:
```python
# Save conversation message
await db.execute("""
  UPDATE pitch_conversations
  SET
    messages = messages || $1::jsonb,
    updated_at = NOW()
  WHERE id = $2
""", json.dumps([{"role": "user", "content": message}]), conversation_id)

# Save collected data
await db.execute("""
  UPDATE pitch_conversations
  SET collected_data = collected_data || $1::jsonb
  WHERE id = $2
""", json.dumps({"company_name": "Acme Corp"}), conversation_id)
```

---

#### `presentations`
```sql
-- Already exists, just need to use these columns:
-- id, profile_id, template_id, title, content (JSONB), status, created_at
```

**Usage**:
```python
# Create presentation
presentation_id = await db.fetchval("""
  INSERT INTO presentations (
    profile_id,
    template_id,
    title,
    content,
    status,
    slide_count
  ) VALUES ($1, $2, $3, $4, 'completed', $5)
  RETURNING id
""", user_id, template_id, title, json.dumps(slides), len(slides))

# Link to conversation
await db.execute("""
  UPDATE pitch_conversations
  SET deck_id = $1
  WHERE id = $2
""", presentation_id, conversation_id)
```

---

#### `presentation_templates`
```sql
-- Already exists, use for template library
```

**Usage**:
```python
# Load all templates
templates = await db.fetch("""
  SELECT id, name, category, slides, theme
  FROM presentation_templates
  WHERE category = 'pitch-deck'
  ORDER BY usage_count DESC
""")

# Increment usage counter
await db.execute("""
  UPDATE presentation_templates
  SET usage_count = usage_count + 1
  WHERE id = $1
""", template_id)
```

---

## 6. Real-World Examples

### Example 1: Fintech Startup

**Input Data**:
```json
{
  "company_name": "PayFlow",
  "company_description": "AI-powered cash flow forecasting for small businesses",
  "problem": "Small businesses run out of cash unexpectedly due to poor forecasting",
  "solution": "Machine learning predicts cash shortfalls 2 weeks in advance",
  "target_market": "Independent retailers and service businesses, 5-50 employees",
  "business_model": "SaaS subscription, $99/month, 14-day free trial",
  "traction": "30 paying customers, $3K MRR, 4 months old",
  "team": "Sarah (CEO, ex-Square product), Mike (CTO, ML at Stripe)",
  "funding_ask": "$500K seed for product development and sales team"
}
```

**Generated Slide 2 (Problem)**:
```json
{
  "slide_number": 2,
  "type": "problem",
  "title": "82% of Small Businesses Fail Due to Cash Flow Problems",
  "bullets": [
    "Unexpected cash shortfalls force business closures",
    "Manual forecasting with Excel is error-prone and time-consuming",
    "Small businesses can't afford CFOs or financial analysts"
  ],
  "speaker_notes": "Lead with the 82% statistic from U.S. Bank study. Emphasize that this isn't a profitability problem—profitable businesses still fail due to poor cash management.",
  "layout": "title-and-bullets",
  "image_suggestion": "Graph showing cash flow dips leading to bankruptcy"
}
```

---

### Example 2: Healthcare SaaS

**Input Data**:
```json
{
  "company_name": "MedSchedule Pro",
  "company_description": "AI scheduling for medical practices",
  "problem": "Medical practices lose 20% revenue to no-shows and inefficient scheduling",
  "solution": "Predictive AI optimizes appointment slots and reduces no-shows",
  "target_market": "Primary care clinics, 3-10 doctors",
  "business_model": "Per-provider subscription, $149/month per doctor",
  "traction": "8 clinics, $10K MRR, 6 months",
  "team": "Dr. Lisa (CEO, practicing physician), Tom (CTO, healthcare IT)",
  "funding_ask": "$1M seed for HIPAA compliance and enterprise features"
}
```

**Generated Slide 4 (Market)**:
```json
{
  "slide_number": 4,
  "type": "market",
  "title": "$12B Market Opportunity in Medical Practice Management",
  "bullets": [
    "200,000 primary care practices in the US",
    "Average 5 providers per practice = 1M potential users",
    "$149/provider/month × 1M = $1.8B TAM"
  ],
  "speaker_notes": "Focus on primary care as beachhead market. Expansion opportunity into specialists (dermatology, orthopedics) adds another $8B. Conservative 1% market share = $12M ARR.",
  "layout": "title-bullets-and-chart",
  "chart_data": {
    "type": "bar",
    "labels": ["Total Market", "Primary Care", "Year 1 Target"],
    "values": [12000, 1800, 10]
  }
}
```

---

### Example 3: E-commerce Tool

**Input Data**:
```json
{
  "company_name": "ShopBoost",
  "company_description": "One-click upsells for Shopify stores",
  "problem": "Shopify stores lose 60% of potential revenue by not offering upsells",
  "solution": "AI-powered product recommendations at checkout increase AOV by 30%",
  "target_market": "Shopify stores with $50K-$500K annual revenue",
  "business_model": "Revenue share, 2% of upsell revenue generated",
  "traction": "50 stores, $15K MRR, 8 months old",
  "team": "Jack (CEO, ex-Shopify), Emma (CTO, ML engineer)",
  "funding_ask": "$750K seed for Shopify app marketplace listing and marketing"
}
```

**Generated Slide 6 (Traction)**:
```json
{
  "slide_number": 6,
  "type": "traction",
  "title": "Strong Early Traction: $15K MRR in 8 Months",
  "bullets": [
    "50 active Shopify stores using ShopBoost",
    "30% average increase in order value",
    "120% month-over-month growth for 3 months",
    "$500K total upsell revenue generated for customers"
  ],
  "speaker_notes": "Highlight the 120% MoM growth rate—shows product-market fit. The $500K generated for customers demonstrates clear ROI, making our 2% take very defensible.",
  "layout": "title-bullets-and-metrics",
  "metrics": [
    {"label": "MRR", "value": "$15K", "change": "+120%"},
    {"label": "Stores", "value": "50", "change": "+35"},
    {"label": "Avg AOV Increase", "value": "30%", "change": "—"}
  ]
}
```

---

## 7. Migration from Travel Copilot

### File Mapping

```
OLD (Travel Copilot)          →  NEW (Pitch Deck Wizard)
─────────────────────────────────────────────────────────
travel_copilot.py             →  pitch_deck_copilot.py
src/flight.py                 →  src/content_agent.py
src/hotel.py                  →  src/template_agent.py
src/agent.py (supervisor)     →  src/agent.py (updated prompts)
[none]                        →  src/export_agent.py (new)
app-sample/                   →  app-sample/ (update instructions)
```

### Quick Start Commands

```bash
# 1. Clone and rename
cd template-copilot-kit-py
cp -r . ../pitch-deck-wizard
cd ../pitch-deck-wizard

# 2. Clean up travel-specific files
rm src/flight.py src/hotel.py
mv travel_copilot.py pitch_deck_copilot.py

# 3. Create new agent files
touch src/content_agent.py
touch src/template_agent.py
touch src/export_agent.py

# 4. Install dependencies
uv add python-pptx

# 5. Test locally
bl serve --hotreload

# 6. Verify endpoint
curl http://localhost:1338/copilotkit
```

---

## 8. Success Criteria

**Phase 1 Complete When**:
- [ ] User can start conversation and receive 8 questions
- [ ] Responses save to `pitch_conversations` table
- [ ] No errors in conversation flow

**Phase 2 Complete When**:
- [ ] 10 slides generated from conversation data
- [ ] Slides saved to `presentations.content`
- [ ] Content quality validated (no hallucinations)

**Phase 3 Complete When**:
- [ ] Template selected automatically
- [ ] Template applied to slides
- [ ] Template data saved to database

**Phase 4 Complete When**:
- [ ] Frontend shows chat interface
- [ ] Slides appear in real-time preview
- [ ] User can navigate through slides

**Phase 5 Complete When**:
- [ ] PPTX file downloads correctly
- [ ] File opens in PowerPoint without errors
- [ ] All slides formatted properly

**Phase 6 Complete When**:
- [ ] All automated tests passing
- [ ] Load test: 100 concurrent users
- [ ] Deployed to production
- [ ] Monitoring configured

---

**Document Status**: Developer-Ready
**Last Updated**: January 25, 2025
**Next Action**: Begin Phase 1 implementation
