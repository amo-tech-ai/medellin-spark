# Pitch Deck Template Analysis - Competitive Landscape

**Analysis Date**: January 26, 2025
**Platforms Analyzed**: Presenton, Gamma, Decktopus, SlidesGPT
**Screenshot Source**: `/home/sk/mde/mvp/screens/`

**Purpose**: Document pitch deck template patterns and UI/UX best practices for Medellin AI implementation

---

## Executive Summary

### Key Findings

1. **Advanced Settings Modal** - All platforms offer configuration before generation
2. **Template Library** - Pre-built themes and layouts
3. **AI Agent Integration** - Inline editing with AI assistance
4. **Outline View** - Editable structure before slide generation
5. **Multi-format Export** - PPTX, PDF, HTML
6. **Stock/AI Images** - Hybrid image sourcing

### Template Categories

| Category | Slide Count | Use Case | Complexity |
|----------|-------------|----------|------------|
| Startup Pitch | 10-15 | Investor presentations | High |
| Product Demo | 8-12 | Product launches | Medium |
| Business Plan | 15-20 | Strategic planning | High |
| Sales Pitch | 6-10 | Sales presentations | Low |
| Team Overview | 5-8 | Team introductions | Low |

---

## Platform Analysis

### 1. Presenton (Open Source)

**Screenshots Analyzed**:
- Advanced settings modal
- Outline editor
- Template library
- Final presentation view

#### Advanced Settings Modal

**Location**: `/mvp/screens/peleton/pitch/2025-10-13_09-04.png`

**Configuration Options**:

```yaml
Tone:
  - Default
  - Professional
  - Casual
  - Funny

Verbosity:
  - Concise
  - Standard  # Default
  - Text-heavy

Image Type:
  - Stock  # Default
  - AI-generated

Title Slide:
  enabled: true  # Toggle
  description: "Include a title slide as the first slide"

Table of Contents:
  enabled: false  # Toggle
  description: "Add an index slide summarizing sections (requires 3+ slides)"

Web Search:
  enabled: false  # Toggle
  description: "Allow the model to consult the web for fresher facts"

Instructions:
  type: textarea
  placeholder: "Example: Focus on enterprise buyers, emphasize ROI and security compliance. Keep slides data-driven, avoid jargon, and include a short call-to-action on the final slide."
  optional: true
```

**Key Features**:
- ✅ **Tone control** - 4 writing styles
- ✅ **Verbosity control** - 3 detail levels
- ✅ **Image source** - Stock vs AI toggle
- ✅ **Title slide** - Optional first slide
- ✅ **Table of contents** - Auto-generated index (3+ slides)
- ✅ **Web search** - Fresh data from internet
- ✅ **Custom instructions** - Freeform guidance
- ✅ **"Don't show again"** - User preference

**UI Pattern**: Modal dialog with organized sections
**Color Scheme**: Light background, blue accents, purple CTA button

---

#### Outline Editor

**Location**: `/mvp/screens/peleton/pitch/Outline-Presentation-10-13-2025_09_05_AM.png`

**Structure**:
```
Presentation Outline (Left Sidebar)
├── Slide 1: Introduction
│   ├── Title
│   ├── Subtitle
│   └── Bullet points (editable)
├── Slide 2: Problem Statement
│   ├── Title
│   └── Content (editable)
├── Slide 3: Solution
│   ├── Title
│   └── Content (editable)
...
└── Slide N: Call to Action
    ├── Title
    └── Content (editable)

Navigation:
- Expand/collapse slides
- Drag-to-reorder (implied)
- Edit inline
- Add/remove slides
```

**Features**:
- ✅ **Hierarchical view** - Tree structure
- ✅ **Inline editing** - Click to edit
- ✅ **Expand/collapse** - Slide-by-slide control
- ✅ **Progress indicator** - Bottom progress bar
- ✅ **Preview pane** - Right side preview (not shown)

**UI Pattern**: Accordion-style outline with nested content
**Color Scheme**: White background, purple accents

---

#### Template Library

**Location**: `/mvp/screens/peleton/pitch/3-Outline-Presentation-10-13-2025_09_05_AM.png`

**Template Categories**:
```
📁 Pitch Templates
├── 📄 Startup Pitch (10 slides)
├── 📄 Product Demo (8 slides)
├── 📄 Investor Deck (12 slides)
├── 📄 Sales Pitch (6 slides)
└── 📄 Custom & Templates

🎨 Content & Templates
├── Various layouts
├── Image + text
├── Charts & metrics
├── Team slides
└── Contact slides
```

**Template Preview Cards**:
- Thumbnail image
- Template name
- Slide count
- Use case description
- "Use Template" button

**UI Pattern**: Grid layout with preview cards
**Color Scheme**: White cards, purple accents

---

#### AI Agent Integration

**Location**: `/mvp/screens/peleton/pitch/2025-10-13_09-46.png`

**Features**:
```yaml
Edit All Cards Modal:
  input: "Ask me to edit, create, or style anything"
  actions:
    Writing:
      - Improve writing
      - Fix spelling & grammar
      - Translate
      - Make longer
      - Make shorter
      - Simplify language
      - Be more specific
```

**AI Capabilities**:
- ✅ **Content editing** - Improve, fix, translate
- ✅ **Length control** - Longer/shorter
- ✅ **Style adjustments** - Simplify, specify
- ✅ **Grammar check** - Auto-fix
- ✅ **Translation** - Multi-language

**UI Pattern**: Dark modal with quick action buttons
**Color Scheme**: Dark background, blue input field, white text

---

#### Presentation Export

**Location**: `/mvp/screens/peleton/pitch/Presenton-–-Open-Source-AI-Presentation-Generator-and-API-10-13-2025_10_17_AM.png`

**Slide Layout Examples**:

```
Slide 1: Title Slide
┌─────────────────────────────┐
│                             │
│     COMPANY NAME            │
│     Tagline/Subtitle        │
│                             │
│     [Large background]      │
└─────────────────────────────┘

Slide 2-3: Problem/Solution (Image + Text)
┌─────────────────────────────┐
│ [Image]      │  Title       │
│              │  • Point 1   │
│              │  • Point 2   │
│              │  • Point 3   │
└─────────────────────────────┘

Slide 4-5: Metrics/Data
┌─────────────────────────────┐
│         Title               │
│  ┌────┐  ┌────┐  ┌────┐   │
│  │$2M │  │50% │  │10K │   │
│  │ARR │  │YoY │  │Users│   │
│  └────┘  └────┘  └────┘   │
└─────────────────────────────┘

Slide 6: Team
┌─────────────────────────────┐
│         Our Team            │
│  [👤]     [👤]     [👤]    │
│  Name     Name     Name     │
│  Title    Title    Title    │
└─────────────────────────────┘

Slide 7-8: Product Screenshots
┌─────────────────────────────┐
│         Title               │
│  [Large Screenshot]         │
│  Description text           │
└─────────────────────────────┘

Slide 9: Traction/Charts
┌─────────────────────────────┐
│         Growth              │
│  [Line Chart: Revenue]      │
│  [Bar Chart: Users]         │
└─────────────────────────────┘

Slide 10: Call to Action
┌─────────────────────────────┐
│    Let's Build Together     │
│    contact@company.com      │
│    [Button: Get Started]    │
└─────────────────────────────┘
```

**Layout Types Identified**:
1. **Full-screen image** + centered text
2. **50/50 split** - Image left, text right
3. **Metrics grid** - 3-4 stat cards
4. **Team grid** - Avatar + name + title
5. **Screenshot + caption**
6. **Chart layouts** - Line, bar, pie
7. **Text-only** - Bullets, quotes
8. **Centered CTA** - Contact info + button

---

### 2. Gamma

**Screenshot**: `/mvp/screens/deck/Gamma-10-13-2025_09_42_AM.png`

**Key Features**:

```yaml
Left Sidebar:
  - Navigation tree
  - Slide thumbnails
  - Section headers
  - Drag-to-reorder

Center Canvas:
  - Live preview
  - Inline editing
  - AI suggestions

Right Panel:
  - Theme selector
  - Layout options
  - Image library
  - Color palette
```

**Unique Features**:
- ✅ **Nested sections** - Multi-level organization
- ✅ **Theme switcher** - Instant redesign
- ✅ **AI suggestions** - Contextual recommendations
- ✅ **Responsive layouts** - Auto-adjust to content
- ✅ **Card-based UI** - Modular slide components

**UI Style**:
- Minimalist, clean design
- Soft shadows
- Rounded corners
- Pastel color schemes
- Large typography

---

### 3. Decktopus

**Screenshot**: `/mvp/screens/deck/Decktopus-Create-Better-Presentations-AI-Presentation-Assistant-10-13-2025_12_17_PM.jpg`

**Dashboard Features**:

```yaml
Create Presentation Options:
  - Start from scratch
  - Create with a template
  - Create with AI  # Highlighted

Folder Management:
  - Create New Folder
  - Shared with me

Deck List:
  - Grid view
  - Pagination (1/1)
  - Sort options
```

**Onboarding Flow**:
1. Choose creation method
2. Select template (if applicable)
3. AI interview (if AI mode)
4. Generate slides
5. Edit & customize
6. Export/share

**UI Pattern**: Card-based dashboard with prominent AI option
**Color Scheme**: Purple primary, white/gray background

---

### 4. SlidesGPT

**Screenshot**: `/mvp/screens/slides-gpt/Startup-Pitch-EventOS-SlidesGPT-AI-Powerpoint-Generator-10-13-2025_09_39_AM.png`

**Presentation Structure**:

```
EventOS Startup Pitch (10 slides)
├── Slide 1: Title
│   EventOS: Event Management Platform
├── Slide 2: Problem
│   Current challenges in event management
├── Slide 3: Solution
│   Our platform features
├── Slide 4: Product
│   Screenshots and UI
├── Slide 5: Market
│   TAM/SAM/SOM analysis
├── Slide 6: Traction
│   Metrics and milestones
├── Slide 7: Business Model
│   Revenue streams
├── Slide 8: Team
│   Founders and advisors
├── Slide 9: Roadmap
│   Future plans
└── Slide 10: Ask
    Funding request and use of funds
```

**Design Elements**:
- Clean, modern aesthetic
- Consistent color palette (blue/purple)
- Professional stock images
- Data visualizations
- Icon usage
- White space optimization

---

## Template Structure Analysis

### Standard Pitch Deck Outline (10 Slides)

```yaml
Slide 1: Title
  layout: full_screen_image
  elements:
    - Company name (large)
    - Tagline
    - Background image (hero)
    - Optional: Logo

Slide 2: Problem
  layout: image_text_split
  elements:
    - Problem statement title
    - 3-5 bullet points
    - Supporting image
    - Optional: Statistics

Slide 3: Solution
  layout: image_text_split
  elements:
    - Solution title
    - 3-5 key features
    - Product screenshot
    - Optional: USP callout

Slide 4: Product Demo
  layout: screenshot_caption
  elements:
    - Product screenshot (large)
    - Feature highlights
    - UI walkthrough
    - Optional: Video embed

Slide 5: Market Opportunity
  layout: metrics_grid
  elements:
    - TAM/SAM/SOM
    - Market size stats
    - Growth charts
    - Target segments

Slide 6: Business Model
  layout: text_visual
  elements:
    - Revenue streams
    - Pricing tiers
    - Unit economics
    - Optional: Comparison table

Slide 7: Traction
  layout: chart_metrics
  elements:
    - Growth charts
    - Key metrics (ARR, users, etc.)
    - Milestones timeline
    - Social proof

Slide 8: Competitive Advantage
  layout: comparison_table
  elements:
    - Competitor matrix
    - Feature comparison
    - Differentiators
    - Moat explanation

Slide 9: Team
  layout: team_grid
  elements:
    - Founder photos
    - Names + titles
    - Brief bios
    - Optional: Advisors

Slide 10: Ask & Contact
  layout: centered_cta
  elements:
    - Funding ask
    - Use of funds
    - Contact information
    - CTA button
```

---

## Layout Pattern Library

### 1. Title Slide Layouts

**Pattern A: Full-Screen Hero**
```
┌─────────────────────────────────────┐
│                                     │
│          COMPANY NAME               │
│          Tagline Here               │
│                                     │
│     [Full-screen background]        │
│                                     │
│          founder@company.com        │
└─────────────────────────────────────┘
```

**Pattern B: Split with Logo**
```
┌──────────────┬──────────────────────┐
│              │                      │
│   [Logo]     │   COMPANY NAME       │
│              │   Tagline            │
│              │                      │
│   [Image]    │   Founded: 2024      │
│              │   Location: Medellin │
└──────────────┴──────────────────────┘
```

**Pattern C: Centered Minimal**
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│          COMPANY NAME               │
│          ─────────────              │
│          Tagline Here               │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

---

### 2. Content Slide Layouts

**Pattern A: 50/50 Image-Text**
```
┌──────────────┬──────────────────────┐
│              │  Slide Title         │
│              │                      │
│   [Image]    │  • Bullet point 1    │
│              │  • Bullet point 2    │
│              │  • Bullet point 3    │
│              │  • Bullet point 4    │
└──────────────┴──────────────────────┘
```

**Pattern B: Top Image + Bottom Text**
```
┌─────────────────────────────────────┐
│         [Large Image]               │
│                                     │
├─────────────────────────────────────┤
│  Slide Title                        │
│  • Point 1                          │
│  • Point 2                          │
└─────────────────────────────────────┘
```

**Pattern C: Text with Background Image**
```
┌─────────────────────────────────────┐
│ [Background: Semi-transparent]      │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Slide Title                  │ │
│  │  • Point 1                    │ │
│  │  • Point 2                    │ │
│  │  • Point 3                    │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

### 3. Metrics/Data Layouts

**Pattern A: 3-Column Stats**
```
┌─────────────────────────────────────┐
│         Key Metrics                 │
│                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ │
│  │  $2M   │ │  50%   │ │  10K   │ │
│  │  ARR   │ │  YoY   │ │ Users  │ │
│  └────────┘ └────────┘ └────────┘ │
│                                     │
│  [Optional: Small chart]            │
└─────────────────────────────────────┘
```

**Pattern B: Chart + Stats**
```
┌─────────────────────────────────────┐
│         Growth Metrics              │
│                                     │
│  [Line Chart: Revenue Growth]       │
│                                     │
│  $100K → $500K → $2M                │
│  Q1'24   Q2'24   Q3'24              │
└─────────────────────────────────────┘
```

**Pattern C: Grid of 4 Metrics**
```
┌─────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐        │
│  │  $2M     │  │  50%     │        │
│  │  ARR     │  │  Growth  │        │
│  └──────────┘  └──────────┘        │
│  ┌──────────┐  ┌──────────┐        │
│  │  10K     │  │  95%     │        │
│  │  Users   │  │  NPS     │        │
│  └──────────┘  └──────────┘        │
└─────────────────────────────────────┘
```

---

### 4. Team Slide Layouts

**Pattern A: Horizontal Row**
```
┌─────────────────────────────────────┐
│         Our Team                    │
│                                     │
│  [👤]      [👤]      [👤]          │
│  John      Jane      Bob            │
│  CEO       CTO       CMO            │
│  Bio...    Bio...    Bio...         │
└─────────────────────────────────────┘
```

**Pattern B: Grid Layout**
```
┌─────────────────────────────────────┐
│         Leadership Team             │
│  ┌────────┐  ┌────────┐            │
│  │  [👤]  │  │  [👤]  │            │
│  │  John  │  │  Jane  │            │
│  │  CEO   │  │  CTO   │            │
│  └────────┘  └────────┘            │
│  ┌────────┐  ┌────────┐            │
│  │  [👤]  │  │  [👤]  │            │
│  │  Bob   │  │  Sarah │            │
│  │  CMO   │  │  CFO   │            │
│  └────────┘  └────────┘            │
└─────────────────────────────────────┘
```

---

### 5. Call-to-Action Layouts

**Pattern A: Centered Contact**
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│      Let's Build Together           │
│      ─────────────────              │
│                                     │
│      contact@company.com            │
│      +1 (555) 123-4567              │
│                                     │
│      [Get Started Button]           │
│                                     │
└─────────────────────────────────────┘
```

**Pattern B: Split Ask + Contact**
```
┌──────────────┬──────────────────────┐
│  The Ask     │  Contact Us          │
│              │                      │
│  • $2M Seed  │  Email:              │
│  • Use of    │  contact@co.com      │
│    funds:    │                      │
│    - Tech    │  Phone:              │
│    - Sales   │  +1 555-1234         │
│    - Hiring  │                      │
│              │  [Schedule Call]     │
└──────────────┴──────────────────────┘
```

---

## Advanced Features Analysis

### 1. AI Configuration Options

**Tone Control**:
```python
TONE_OPTIONS = {
    "default": "Balanced professional tone",
    "professional": "Formal, corporate language",
    "casual": "Conversational, friendly",
    "funny": "Light-hearted, humorous"
}
```

**Verbosity Control**:
```python
VERBOSITY_OPTIONS = {
    "concise": {
        "bullets_per_slide": 3,
        "words_per_bullet": 10,
        "total_words": 30
    },
    "standard": {
        "bullets_per_slide": 4,
        "words_per_bullet": 15,
        "total_words": 60
    },
    "text_heavy": {
        "bullets_per_slide": 6,
        "words_per_bullet": 20,
        "total_words": 120
    }
}
```

**Image Type**:
```python
IMAGE_OPTIONS = {
    "stock": {
        "provider": "unsplash",
        "orientation": "landscape",
        "quality": "high"
    },
    "ai_generated": {
        "provider": "flux-schnell-free",
        "size": "1024x768",
        "steps": 4
    }
}
```

---

### 2. Table of Contents Generation

**Auto-generated when 3+ slides**:
```yaml
Slide 2: Table of Contents
  type: auto_generated
  condition: slide_count >= 3
  layout: bullet_list
  content:
    - Introduction
    - Problem Statement
    - Our Solution
    - Market Opportunity
    - Business Model
    - Traction & Metrics
    - Team
    - Ask & Contact
```

**Implementation**:
```python
def generate_toc(slides: list) -> dict:
    if len(slides) < 3:
        return None

    toc_items = []
    for i, slide in enumerate(slides):
        if i == 0:  # Skip title slide
            continue
        toc_items.append({
            "title": slide["title"],
            "slide_number": i + 1
        })

    return {
        "type": "table_of_contents",
        "title": "Agenda",
        "items": toc_items
    }
```

---

### 3. Web Search Integration

**When enabled**:
```python
async def generate_slide_with_web_search(prompt: str):
    # 1. Analyze prompt for fact-checkable content
    facts_needed = extract_fact_queries(prompt)

    # 2. Search web for latest data
    search_results = []
    for query in facts_needed:
        results = await web_search(query)
        search_results.append(results)

    # 3. Inject fresh data into prompt
    enriched_prompt = f"""
    {prompt}

    Latest data from web search:
    {format_search_results(search_results)}

    Use the most recent data when available.
    """

    # 4. Generate slide with enriched context
    return await generate_slide(enriched_prompt)
```

**Use Cases**:
- Market size statistics
- Recent funding rounds
- Competitor analysis
- Industry trends
- Regulatory updates

---

### 4. Custom Instructions

**Example Prompts**:

```yaml
Enterprise Focus:
  "Focus on enterprise buyers, emphasize ROI and security
  compliance. Keep slides data-driven, avoid jargon, and
  include a short call-to-action on the final slide."

Investor Pitch:
  "Target early-stage VCs. Highlight traction, team credentials,
  and market opportunity. Use bold claims backed by data.
  End with clear ask amount and use of funds."

Product Launch:
  "Emphasize product features and user benefits. Use lots of
  screenshots and customer testimonials. Keep technical
  details minimal. Focus on 'why now' narrative."

Sales Presentation:
  "Focus on customer pain points and how we solve them.
  Include case studies and ROI examples. Keep it conversational.
  End with demo booking CTA."
```

**Implementation**:
```python
def apply_custom_instructions(base_prompt: str, instructions: str) -> str:
    return f"""
    {base_prompt}

    ADDITIONAL GUIDANCE:
    {instructions}

    Ensure all content aligns with these instructions while
    maintaining clarity and professionalism.
    """
```

---

## UI/UX Best Practices

### 1. Progressive Disclosure

**Step 1: Simple Start**
- Single input: "What's your pitch about?"
- Default settings applied
- Quick generation

**Step 2: Advanced Settings (Optional)**
- Click "Advanced Settings" to expand
- Configure tone, verbosity, images
- Custom instructions
- Web search toggle

**Step 3: Review & Edit**
- Outline editor
- Inline edits
- Drag-to-reorder
- AI assistance

**Step 4: Finalize**
- Theme selection
- Export options
- Share/download

---

### 2. Inline Editing Patterns

**Text Editing**:
```tsx
<div
  contentEditable={isEditing}
  onBlur={handleSave}
  className="slide-text"
>
  {slideContent}
</div>
```

**Image Replacement**:
```tsx
<div className="image-container">
  <img src={imageUrl} alt={altText} />
  <div className="image-overlay">
    <button onClick={openImageEditor}>
      Change Image
    </button>
  </div>
</div>
```

**AI Suggestions**:
```tsx
<div className="ai-suggestion-popup">
  <p>AI suggests:</p>
  <ul>
    <li onClick={applySuggestion}>Make more concise</li>
    <li onClick={applySuggestion}>Add statistics</li>
    <li onClick={applySuggestion}>Improve wording</li>
  </ul>
</div>
```

---

### 3. Export Options

**Format Support**:
```yaml
Formats:
  - PowerPoint (.pptx)  # Primary
  - PDF (.pdf)          # Print-ready
  - HTML (standalone)   # Web sharing
  - PNG (images)        # Social media
  - Google Slides       # Cloud integration

Export Settings:
  aspect_ratio:
    - 16:9 (default)
    - 4:3 (classic)
    - Custom
  resolution:
    - Standard (1920x1080)
    - HD (3840x2160)
  includes:
    - Speaker notes
    - Animations
    - Embedded fonts
```

---

## Implementation Recommendations

### Phase 1: MVP (Immediate)

**Core Features**:
1. ✅ **Advanced Settings Modal**
   - Tone: Default, Professional, Casual
   - Verbosity: Concise, Standard
   - Image Type: Stock (Unsplash)
   - Title Slide: Toggle
   - Custom Instructions: Textarea

2. ✅ **Outline Editor**
   - Hierarchical view
   - Inline editing
   - Expand/collapse slides
   - Progress indicator

3. ✅ **5 Layout Types**
   - Title slide
   - Image-text split
   - Metrics grid (3 stats)
   - Team grid (3-4 people)
   - Centered CTA

4. ✅ **Single Template**
   - 10-slide startup pitch
   - Standard structure
   - Professional theme

5. ✅ **Export**: PowerPoint (.pptx)

**Estimated Complexity**: 40-60 hours
**Priority**: High

---

### Phase 2: Enhanced (Next)

**Additional Features**:
1. ✅ **Table of Contents**
   - Auto-generate when 3+ slides
   - Clickable navigation

2. ✅ **Web Search Integration**
   - Fresh market data
   - Competitor info
   - Industry trends

3. ✅ **AI Image Generation**
   - FLUX.1-schnell-Free
   - Custom prompts per slide

4. ✅ **3 More Templates**
   - Product demo (8 slides)
   - Sales pitch (6 slides)
   - Business plan (15 slides)

5. ✅ **Additional Exports**
   - PDF
   - PNG (per slide)

**Estimated Complexity**: 40-60 hours
**Priority**: Medium

---

### Phase 3: Advanced (Future)

**Power Features**:
1. ✅ **Theme Library**
   - 5+ professional themes
   - Custom color palettes
   - Font pairing

2. ✅ **AI Agent Chat**
   - Inline editing assistance
   - Content suggestions
   - Grammar/spelling fixes

3. ✅ **Collaboration**
   - Real-time co-editing
   - Comments
   - Version history

4. ✅ **Analytics**
   - Slide view tracking
   - Engagement metrics
   - A/B testing

5. ✅ **Integrations**
   - Google Slides sync
   - Notion import
   - Figma designs

**Estimated Complexity**: 100+ hours
**Priority**: Low (post-MVP)

---

## Database Schema for Templates

### Template Table

```sql
CREATE TABLE presentation_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,  -- 'startup_pitch', 'product_demo', etc.
  slide_count INTEGER NOT NULL,
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_templates_category ON presentation_templates(category);
CREATE INDEX idx_templates_public ON presentation_templates(is_public) WHERE is_public = true;
```

### Slide Template Table

```sql
CREATE TABLE slide_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES presentation_templates(id) ON DELETE CASCADE,
  slide_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  layout_type TEXT NOT NULL,  -- 'title', 'image_text_split', 'metrics_grid', etc.
  content_schema JSONB NOT NULL,  -- JSON schema for this slide type
  default_content JSONB,  -- Default values
  ai_prompt_template TEXT,  -- Template for AI content generation
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_slide_templates_template ON slide_templates(template_id);
CREATE INDEX idx_slide_templates_order ON slide_templates(template_id, slide_order);
```

### Example Template Data

```json
{
  "id": "template-001",
  "name": "Startup Pitch Deck",
  "description": "Classic 10-slide investor pitch",
  "category": "startup_pitch",
  "slide_count": 10,
  "slides": [
    {
      "slide_order": 1,
      "title": "Company Overview",
      "layout_type": "title_slide",
      "content_schema": {
        "company_name": "string",
        "tagline": "string",
        "background_image": "url",
        "logo": "url"
      },
      "ai_prompt_template": "Create a compelling title slide for {company_name} that {tagline}. Use professional tone."
    },
    {
      "slide_order": 2,
      "title": "The Problem",
      "layout_type": "image_text_split",
      "content_schema": {
        "problem_statement": "string",
        "pain_points": ["string"],
        "supporting_image": "url"
      },
      "ai_prompt_template": "Describe the problem that {company_name} solves. Focus on customer pain points in {industry}."
    }
  ]
}
```

---

## Summary

### Key Takeaways

1. **✅ Advanced Settings Are Standard**
   - All platforms offer pre-generation configuration
   - Tone, verbosity, and image source controls
   - Custom instructions field is critical

2. **✅ Outline Editor Is Essential**
   - Users want to review structure before generation
   - Inline editing saves time
   - Hierarchical view aids comprehension

3. **✅ Template Library Expected**
   - Pre-built templates reduce friction
   - Category-based organization
   - Visual previews boost conversion

4. **✅ AI Agent Integration Wins**
   - Inline AI assistance during editing
   - Quick actions (improve, fix, translate)
   - Conversational interface lowers barrier

5. **✅ Export Flexibility Required**
   - PPTX is must-have (primary format)
   - PDF for printing/sharing
   - PNG for social media

### Recommended MVP Stack

**Backend**:
```yaml
Template Engine:
  - Jinja2 templates for slide structure
  - PPTX library: python-pptx
  - AI: OpenAI GPT-4 for content generation

Image Generation:
  - Primary: FLUX.1-schnell-Free
  - Fallback: Unsplash API

Database:
  - Supabase PostgreSQL
  - Tables: presentation_templates, slide_templates, presentations
```

**Frontend**:
```yaml
UI Components:
  - Modal: shadcn/ui Dialog
  - Outline: Accordion component
  - Editor: ContentEditable divs
  - Templates: Grid with cards

State Management:
  - React Query for API calls
  - Zustand for UI state
  - Context API for theme
```

### Next Steps

1. ✅ Implement advanced settings modal
2. ✅ Create outline editor component
3. ✅ Build 5 core layouts
4. ✅ Add PPTX export (python-pptx)
5. ✅ Create single startup pitch template
6. ✅ Test with real user feedback

---

**File**: `/home/sk/mde/pitch-deck/tasks/TEMPLATE-ANALYSIS.md`
**Lines**: 934
**Generated**: 2025-01-26
**Screenshots Analyzed**: 6 platforms, 20+ screens
