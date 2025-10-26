# Presenton Implementation Guide - Complete Architecture Analysis

**Analysis Date**: January 26, 2025
**Repository**: `/home/sk/mde/repos/200-presenton`
**Purpose**: Document complete slide generation system for Medellin AI implementation

---

## Executive Summary

Presenton uses a **3-phase generation pipeline**:
1. **Outline Generation** - AI creates structured outline from user input
2. **Layout Selection** - AI matches layouts to slide content
3. **Content Population** - AI fills layouts with detailed content + images

**Key Technologies**:
- Backend: FastAPI + Python-PPTX + OpenAI/Anthropic
- Frontend: Next.js + React + Zod schemas
- Templates: TSX components with Tailwind CSS
- Export: Python-PPTX library

---

## Directory Structure

```
/repos/200-presenton/
├── servers/
│   ├── fastapi/                    # Backend API
│   │   ├── api/v1/ppt/
│   │   │   └── endpoints/
│   │   │       ├── presentation.py  # Main presentation API
│   │   │       ├── slide.py         # Slide management
│   │   │       ├── pptx_slides.py   # PPTX export
│   │   │       └── pdf_slides.py    # PDF export
│   │   ├── services/
│   │   │   ├── pptx_presentation_creator.py  # PPTX builder
│   │   │   ├── image_generation_service.py   # Image generation
│   │   │   └── llm_client.py                 # LLM wrapper
│   │   ├── utils/llm_calls/
│   │   │   ├── generate_presentation_outlines.py  # Step 1: Outline
│   │   │   ├── generate_presentation_structure.py # Step 2: Layout
│   │   │   └── generate_slide_content.py          # Step 3: Content
│   │   └── models/
│   │       ├── presentation_outline_model.py
│   │       ├── presentation_structure_model.py
│   │       └── pptx_models.py
│   │
│   └── nextjs/                     # Frontend
│       ├── presentation-templates/  # Template components
│       │   ├── general/             # Default templates
│       │   │   ├── IntroSlideLayout.tsx
│       │   │   ├── TeamSlideLayout.tsx
│       │   │   ├── MetricsSlideLayout.tsx
│       │   │   └── settings.json
│       │   ├── modern/              # Modern pitch deck
│       │   ├── standard/            # Standard business
│       │   └── swift/               # Swift theme
│       └── app/
│           ├── (presentation-generator)/
│           │   ├── outline/         # Outline editor
│           │   ├── template-preview/# Template preview
│           │   └── custom-template/ # Custom editor
│           └── api/
│               └── presentation_to_pptx_model/
```

---

## 3-Phase Generation Pipeline

### Phase 1: Outline Generation

**Endpoint**: `POST /api/v1/ppt/presentation/create`

**Input**:
```json
{
  "content": "Create a pitch deck for TechStartup, an AI assistant for developers",
  "n_slides": 10,
  "language": "English",
  "tone": "professional",
  "verbosity": "standard",
  "instructions": "Focus on technical audience, emphasize ROI",
  "include_title_slide": true,
  "include_table_of_contents": false,
  "web_search": false,
  "file_paths": []
}
```

**Process**:
```python
# /servers/fastapi/utils/llm_calls/generate_presentation_outlines.py

async def generate_ppt_outline(
    content: str,
    n_slides: int,
    language: str,
    tone: Optional[str] = None,
    verbosity: Optional[str] = None,
    instructions: Optional[str] = None,
    include_title_slide: bool = True,
    include_table_of_contents: bool = False,
    web_search: bool = False,
    file_paths: Optional[List[str]] = None
) -> PresentationOutlineModel:
    """
    Generate presentation outline with AI

    Returns:
    {
      "slides": [
        {
          "index": 0,
          "title": "TechStartup - AI Developer Assistant",
          "content": "Presentation about AI-powered coding assistant..."
        },
        {
          "index": 1,
          "title": "The Problem",
          "content": "Developers waste 30% of time on repetitive tasks..."
        },
        ...
      ]
    }
    """
```

**System Prompt** (simplified):
```
You are an expert presentation designer.

Create an outline for {n_slides} slides about: {content}

Tone: {tone}
Verbosity: {verbosity}
Instructions: {instructions}

Structure:
- Slide 0: Title slide (if include_title_slide)
- Slide 1: Table of contents (if include_table_of_contents && n_slides >= 3)
- Slides 2-N: Content slides

Output Format:
{
  "slides": [
    {"index": 0, "title": "...", "content": "..."},
    ...
  ]
}
```

**Output**:
```json
{
  "slides": [
    {
      "index": 0,
      "title": "TechStartup",
      "content": "AI Developer Assistant\nBoosting productivity through intelligent code completion"
    },
    {
      "index": 1,
      "title": "The Problem",
      "content": "Developers waste 30% of time on:\n- Boilerplate code\n- Documentation\n- Debugging\n- Context switching"
    },
    {
      "index": 2,
      "title": "Our Solution",
      "content": "TechStartup AI Assistant:\n- Real-time code completion\n- Automated documentation\n- Smart debugging\n- Context-aware suggestions"
    }
  ]
}
```

---

### Phase 2: Layout Selection

**Endpoint**: `POST /api/v1/ppt/presentation/prepare`

**Input**:
```json
{
  "presentation_id": "uuid",
  "outlines": [...],  // From Phase 1
  "layout": {
    "name": "general",
    "ordered": false,  // false = AI selects, true = use in order
    "slides": [
      {
        "layoutId": "general-intro-slide",
        "layoutName": "Intro Slide",
        "json_schema": {...}
      },
      {
        "layoutId": "team-slide",
        "layoutName": "Team Slide",
        "json_schema": {...}
      }
    ]
  },
  "title": "TechStartup Pitch Deck"
}
```

**Process**:
```python
# /servers/fastapi/utils/llm_calls/generate_presentation_structure.py

async def generate_presentation_structure(
    presentation_outline: PresentationOutlineModel,
    presentation_layout: PresentationLayoutModel,
    instructions: Optional[str] = None
) -> PresentationStructureModel:
    """
    AI selects best layout for each slide

    Returns:
    {
      "slides": [
        {"layoutIndex": 0},  // Use layout 0 (intro)
        {"layoutIndex": 5},  // Use layout 5 (image-text)
        {"layoutIndex": 2},  // Use layout 2 (metrics)
        ...
      ]
    }
    """
```

**System Prompt**:
```
You're a professional presentation designer with creative freedom.

Available Layouts:
0. Intro Slide - Clean slide with title, description, image
1. Team Slide - Showcase team members with photos
2. Metrics Slide - Key business metrics with large numbers
3. Bullet Points - Text-heavy information slide
4. Image + Text - 50/50 split layout
...

DESIGN PHILOSOPHY:
- Match layout to content purpose
- Create visual variety
- Balance information density

For each slide in the outline, select the best layoutIndex (0-N).

Slide 0: "TechStartup" → Use layoutIndex 0 (Intro)
Slide 1: "The Problem" → Use layoutIndex 4 (Image + Text)
Slide 2: "Our Solution" → Use layoutIndex 4 (Image + Text)
Slide 3: "Team" → Use layoutIndex 1 (Team)
Slide 4: "Traction" → Use layoutIndex 2 (Metrics)
```

**Output**:
```json
{
  "slides": [
    {"layoutIndex": 0},  // Intro layout for title
    {"layoutIndex": 4},  // Image-text for problem
    {"layoutIndex": 4},  // Image-text for solution
    {"layoutIndex": 2},  // Metrics for traction
    {"layoutIndex": 1},  // Team layout
    ...
  ]
}
```

---

### Phase 3: Content Population

**For each slide**:

**Input**:
- Slide outline (from Phase 1)
- Selected layout (from Phase 2)
- Layout schema (Zod schema from template)

**Process**:
```python
# /servers/fastapi/utils/llm_calls/generate_slide_content.py

async def get_slide_content_from_type_and_outline(
    slide_layout: SlideLayoutModel,
    outline: SlideOutlineModel,
    language: str,
    tone: Optional[str] = None,
    verbosity: Optional[str] = None,
    instructions: Optional[str] = None
):
    """
    Generate structured slide content matching layout schema

    Example for Team Slide:
    Input Schema:
    {
      "title": "string (3-40 chars)",
      "companyDescription": "string (10-150 chars)",
      "teamMembers": [
        {
          "name": "string (2-50 chars)",
          "position": "string (2-50 chars)",
          "description": "string (max 150 chars)",
          "image": {
            "__image_prompt__": "string"
          }
        }
      ]
    }

    Returns populated data matching schema exactly
    """
```

**System Prompt**:
```
Generate structured slide based on outline.

Tone: {tone}
Verbosity: {verbosity}
Instructions: {instructions}

CRITICAL RULES:
- Strictly follow max/min character limits
- Never exceed max characters
- For verbosity:
  * concise: Use 1/3 of max limit
  * standard: Use 2/3 of max limit
  * text-heavy: Use 3/4 of max limit
- No emojis
- Metrics in abbreviated form (e.g., "$2M", "95%", "10K")
- Generate speaker note (100-250 chars)

Image/Icon Output Format:
image: {
  __image_prompt__: "Professional business team in meeting room"
}
icon: {
  __icon_query__: "calendar icon"
}

Current Date: {datetime.now()}
Slide Outline: {outline.content}
Output Language: {language}
```

**Example Output** (Team Slide):
```json
{
  "title": "Our Leadership Team",
  "companyDescription": "TechStartup is pioneering AI-powered development tools, backed by ex-Google engineers and top-tier VCs.",
  "teamMembers": [
    {
      "name": "Sarah Chen",
      "position": "CEO & Co-Founder",
      "description": "Ex-Google AI lead, 15+ years ML experience. Stanford CS PhD.",
      "image": {
        "__image_prompt__": "Professional Asian businesswoman CEO headshot, modern office background"
      }
    },
    {
      "name": "Michael Torres",
      "position": "CTO & Co-Founder",
      "description": "Former Meta engineer, built systems serving 1B+ users. MIT graduate.",
      "image": {
        "__image_prompt__": "Professional Hispanic businessman CTO headshot, tech background"
      }
    }
  ],
  "__speaker_note__": "Our founding team brings deep expertise from top tech companies. Sarah led Google's AI assistant team, while Michael architected Meta's developer tools platform."
}
```

---

## Template System Architecture

### Template Structure

Each template is a React component with:
1. **Layout Component** (TSX)
2. **Zod Schema** (validation + AI prompt generation)
3. **Settings** (metadata)

**Example: Team Slide Template**

**File**: `presentation-templates/general/TeamSlideLayout.tsx`

```tsx
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

// 1. LAYOUT METADATA
export const layoutId = 'team-slide';
export const layoutName = 'Team Slide';
export const layoutDescription = 'Showcase team members with photos, names, positions';

// 2. ZOD SCHEMA (defines structure + validation + AI constraints)
const teamMemberSchema = z.object({
    name: z.string().min(2).max(50).meta({
        description: "Team member's full name"
    }),
    position: z.string().min(2).max(50).meta({
        description: "Job title or position"
    }),
    description: z.string().max(150).meta({
        description: "Brief description (around 100 characters)"
    }),
    image: ImageSchema  // { __image_url__, __image_prompt__ }
});

const teamSlideSchema = z.object({
    title: z.string().min(3).max(40).default('Our Team Members').meta({
        description: "Main title of the slide",
    }),
    companyDescription: z.string().min(10).max(150).meta({
        description: "Company description or team introduction text",
    }),
    teamMembers: z.array(teamMemberSchema).min(2).max(4).meta({
        description: "List of team members with their information",
    })
});

export const Schema = teamSlideSchema;
export type TeamSlideData = z.infer<typeof teamSlideSchema>;

// 3. REACT COMPONENT (renders the slide)
const TeamSlideLayout: React.FC<{ data?: Partial<TeamSlideData> }> = ({
  data: slideData
}) => {
    const teamMembers = slideData?.teamMembers || [];

    // Responsive grid based on team size
    const getGridClasses = (count: number) => {
        if (count <= 2) return 'grid-cols-1 gap-6';
        if (count <= 4) return 'grid-cols-2 gap-6';
        return 'grid-cols-2 lg:grid-cols-3 gap-4';
    };

    return (
        <div
            className="w-full max-w-[1280px] aspect-video bg-white"
            style={{
                fontFamily: "var(--heading-font-family, Inter)",
                background: "var(--card-background-color, #ffffff)"
            }}
        >
            {/* Company Name Header */}
            {(slideData as any)?.__companyName__ && (
                <div className="px-20 pt-4">
                    <span className="text-base font-semibold">
                        {(slideData as any)?.__companyName__}
                    </span>
                </div>
            )}

            {/* Main Content */}
            <div className="px-20 py-12">
                {/* Title */}
                <h1 className="text-5xl font-bold mb-4">
                    {slideData?.title || 'Our Team Members'}
                </h1>

                {/* Company Description */}
                <p className="text-lg text-gray-700 mb-8">
                    {slideData?.companyDescription}
                </p>

                {/* Team Grid */}
                <div className={`grid ${getGridClasses(teamMembers.length)}`}>
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                            {/* Photo */}
                            <img
                                src={member.image?.__image_url__}
                                alt={member.name}
                                className="w-24 h-24 rounded-full object-cover mb-4"
                            />

                            {/* Name & Position */}
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-purple-600 font-medium mb-2">
                                {member.position}
                            </p>

                            {/* Description */}
                            <p className="text-sm text-gray-600">
                                {member.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamSlideLayout;
```

---

### Available Template Sets

**1. General Templates** (Default)
```json
// presentation-templates/general/settings.json
{
  "description": "General purpose layouts for common presentation elements",
  "ordered": false,
  "default": true
}
```

**Layouts**:
- `IntroSlideLayout.tsx` - Title slide with image
- `BasicInfoSlideLayout.tsx` - Simple text + bullets
- `BulletWithIconsSlideLayout.tsx` - Bullets with icons
- `TeamSlideLayout.tsx` - Team member grid
- `MetricsSlideLayout.tsx` - 2-3 large metrics
- `MetricsWithImageSlideLayout.tsx` - Metrics + supporting image
- `QuoteSlideLayout.tsx` - Large quote display
- `TableInfoSlideLayout.tsx` - Data table
- `ChartWithBulletsSlideLayout.tsx` - Chart + explanation
- `TableOfContentsSlideLayout.tsx` - Auto-generated TOC
- `NumberedBulletsSlideLayout.tsx` - Numbered list

---

**2. Modern Templates** (Pitch Deck)
```json
// presentation-templates/modern/settings.json
{
  "description": "Modern white and blue business pitch deck layouts",
  "ordered": false,
  "default": false
}
```

**Ordered Sequence** (for pitch decks):
1. `1IntroSlideLayout.tsx` - Pitch deck title
2. `2AboutCompanySlideLayout.tsx` - Company overview
3. `3ProblemSlideLayout.tsx` - Problem statement
4. `4SolutionSlideLayout.tsx` - Solution overview
5. `5ProductOverviewSlideLayout.tsx` - Product details
6. `6MarketSizeSlideLayout.tsx` - TAM/SAM/SOM
7. `7MarketValidationSlideLayout.tsx` - Traction/proof
8. `8CompanyTractionSlideLayout.tsx` - Metrics/growth
9. `9BusinessModelSlideLayout.tsx` - Revenue model
10. `z10TeamSlideLayout.tsx` - Team
11. `z11ThankYouSlideLayout.tsx` - Contact/CTA

**Usage**:
```json
{
  "layout": {
    "name": "modern",
    "ordered": true,  // Use layouts in sequence
    "slides": [...]
  }
}
```

---

**3. Standard Templates** (Business)

Professional business layouts:
- `IntroSlideLayout.tsx`
- `HeadingBulletImageDescriptionLayout.tsx`
- `IconBulletDescriptionLayout.tsx`
- `IconImageDescriptionLayout.tsx`
- `ImageListWithDescriptionLayout.tsx`
- `MetricsDescriptionLayout.tsx`
- `NumberedBulletSingleImageLayout.tsx`
- `VisualMetricsSlideLayout.tsx`
- `ChartLeftTextRightLayout.tsx`
- `TableOfContentsLayout.tsx`
- `ContactLayout.tsx`

---

**4. Swift Templates**

Minimalist, fast-loading layouts:
- `IntroSlideLayout.tsx`
- `SimpleBulletPointsLayout.tsx`
- `BulletsWithIconsTitleDescription.tsx`
- `IconBulletListDescription.tsx`
- `ImageListDescription.tsx`
- `MetricsNumbers.tsx`
- `Timeline.tsx`
- `TableorChart.tsx`
- `TableOfContents.tsx`

---

## Image Schema System

**Default Image Schema**:
```typescript
// presentation-templates/defaultSchemes.ts

export const ImageSchema = z.object({
    __image_url__: z.string().url().meta({
        description: "URL of the image (generated after AI prompt or from stock)"
    }),
    __image_prompt__: z.string().meta({
        description: "AI prompt to generate or search for the image. Be descriptive and specific."
    })
});
```

**AI Generates**:
```json
{
  "__image_prompt__": "Professional business team in modern office, diverse group collaborating"
}
```

**Image Service Fills**:
```json
{
  "__image_url__": "https://images.unsplash.com/photo-...",
  "__image_prompt__": "Professional business team in modern office, diverse group collaborating"
}
```

**Image Generation Flow**:
```python
# services/image_generation_service.py

class ImageGenerationService:
    def __init__(self, output_directory: str):
        self.image_gen_func = self.get_image_gen_func()

    def get_image_gen_func(self):
        if is_pixabay_selected():
            return self.get_image_from_pixabay
        elif is_pixels_selected():
            return self.get_image_from_pexels
        elif is_gemini_flash_selected():
            return self.generate_image_google
        elif is_dalle3_selected():
            return self.generate_image_openai
        return None  # Placeholder

    async def generate_image(self, prompt: ImagePrompt) -> str | ImageAsset:
        if not self.image_gen_func:
            return "/static/images/placeholder.jpg"

        image_prompt = prompt.get_image_prompt(
            with_theme=not self.is_stock_provider_selected()
        )

        try:
            if self.is_stock_provider_selected():
                return await self.image_gen_func(image_prompt)  # Direct URL
            else:
                return await self.image_gen_func(
                    image_prompt,
                    self.output_directory
                )  # Downloaded file
        except Exception as e:
            return "/static/images/placeholder.jpg"
```

---

## CSS Theming System

**CSS Variables** (injected at runtime):
```css
:root {
  /* Background */
  --card-background-color: #ffffff;
  --primary-accent-color: #9333ea;  /* Purple */

  /* Typography */
  --heading-font-family: 'Inter', sans-serif;
  --text-heading-color: #111827;
  --text-body-color: #4b5563;
}
```

**Usage in Templates**:
```tsx
<div
    style={{
        background: "var(--card-background-color, #ffffff)",
        fontFamily: "var(--heading-font-family, Inter)"
    }}
>
    <h1 style={{ color: "var(--text-heading-color, #111827)" }}>
        {slideData?.title}
    </h1>

    <p style={{ color: "var(--text-body-color, #4b5563)" }}>
        {slideData?.description}
    </p>

    <div style={{ background: "var(--primary-accent-color, #9333ea)" }}>
        Accent element
    </div>
</div>
```

**Allows runtime theming without recompiling templates!**

---

## PPTX Export System

**Core Library**: `python-pptx`

**Process**:
```python
# services/pptx_presentation_creator.py

class PptxPresentationCreator:
    def __init__(self, ppt_model: PptxPresentationModel, temp_dir: str):
        self._ppt = Presentation()
        self._ppt.slide_width = Pt(1280)   # 16:9 aspect ratio
        self._ppt.slide_height = Pt(720)

    async def create(self) -> str:
        """
        Convert presentation model to PPTX file

        Steps:
        1. Fetch network assets (download images)
        2. Create blank slides
        3. Add shapes (text boxes, images, etc.)
        4. Apply styling (fonts, colors, positioning)
        5. Save to file
        """
        await self.fetch_network_assets()

        for slide_model in self._slide_models:
            slide = self._ppt.slides.add_slide(
                self._ppt.slide_layouts[BLANK_SLIDE_LAYOUT]
            )
            await self.add_slide_shapes(slide, slide_model)

        output_path = os.path.join(self._temp_dir, f"{uuid.uuid4()}.pptx")
        self._ppt.save(output_path)
        return output_path
```

**Shape Types**:
```python
# models/pptx_models.py

class PptxTextBoxModel:
    text: str
    position: PptxPositionModel  # x, y, width, height
    font: PptxFontModel         # family, size, color, bold, italic
    paragraph: PptxParagraphModel  # alignment, spacing
    fill: PptxFillModel         # background color

class PptxPictureBoxModel:
    picture: PictureModel       # path, is_network
    position: PptxPositionModel
    clip: Optional[ClipModel]   # cropping
    opacity: Optional[float]
    round_corners: Optional[int]

class PptxAutoShapeBoxModel:
    shape_type: PptxBoxShapeEnum  # RECTANGLE, CIRCLE, TRIANGLE
    position: PptxPositionModel
    fill: PptxFillModel
    stroke: PptxStrokeModel     # border
    shadow: Optional[PptxShadowModel]
```

**Example Usage**:
```python
# Create title slide
slide_model = PptxSlideModel(
    shapes=[
        # Background image
        PptxPictureBoxModel(
            picture=PictureModel(
                path="https://images.unsplash.com/...",
                is_network=True
            ),
            position=PptxPositionModel(
                x=0, y=0,
                width=1280, height=720
            ),
            opacity=0.3
        ),

        # Title text
        PptxTextBoxModel(
            text="TechStartup",
            position=PptxPositionModel(
                x=100, y=250,
                width=1080, height=100
            ),
            font=PptxFontModel(
                family="Montserrat",
                size=72,
                color=RGBColor(30, 76, 217),
                bold=True
            )
        ),

        # Subtitle
        PptxTextBoxModel(
            text="AI Developer Assistant",
            position=PptxPositionModel(
                x=100, y=370,
                width=1080, height=50
            ),
            font=PptxFontModel(
                family="Montserrat",
                size=24,
                color=RGBColor(30, 76, 217)
            )
        )
    ]
)
```

---

## Database Schema

```sql
-- Presentations
CREATE TABLE presentations (
    id UUID PRIMARY KEY,
    content TEXT NOT NULL,
    n_slides INTEGER NOT NULL,
    language VARCHAR(50) NOT NULL DEFAULT 'English',
    tone VARCHAR(50),
    verbosity VARCHAR(50),
    instructions TEXT,
    include_title_slide BOOLEAN DEFAULT TRUE,
    include_table_of_contents BOOLEAN DEFAULT FALSE,
    web_search BOOLEAN DEFAULT FALSE,
    file_paths TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Slides (one-to-many with presentations)
CREATE TABLE slides (
    id UUID PRIMARY KEY,
    presentation UUID REFERENCES presentations(id) ON DELETE CASCADE,
    index INTEGER NOT NULL,
    title TEXT,
    layout_id VARCHAR(100),
    content JSONB,  -- Structured slide data
    speaker_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(presentation, index)
);

CREATE INDEX idx_slides_presentation ON slides(presentation);
CREATE INDEX idx_slides_order ON slides(presentation, index);

-- Templates (saved presentations)
CREATE TABLE templates (
    id UUID PRIMARY KEY,  -- Same as presentation_id
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Async generation status
CREATE TABLE async_presentation_generation_tasks (
    id UUID PRIMARY KEY,
    presentation_id UUID REFERENCES presentations(id) ON DELETE CASCADE,
    status VARCHAR(50),  -- 'pending', 'processing', 'completed', 'failed'
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## API Endpoints

### 1. Create Presentation (Outline Only)

**POST** `/api/v1/ppt/presentation/create`

```bash
curl -X POST http://localhost:8000/api/v1/ppt/presentation/create \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Create a pitch deck for TechStartup, an AI assistant",
    "n_slides": 10,
    "language": "English",
    "tone": "professional",
    "verbosity": "standard",
    "instructions": "Focus on technical audience",
    "include_title_slide": true,
    "include_table_of_contents": false,
    "web_search": false
  }'
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "content": "Create a pitch deck...",
  "n_slides": 10,
  "created_at": "2025-01-26T10:00:00Z"
}
```

---

### 2. Prepare Presentation (Generate Slides)

**POST** `/api/v1/ppt/presentation/prepare`

```bash
curl -X POST http://localhost:8000/api/v1/ppt/presentation/prepare \
  -H "Content-Type: application/json" \
  -d '{
    "presentation_id": "550e8400-e29b-41d4-a716-446655440000",
    "outlines": [
      {
        "index": 0,
        "title": "TechStartup",
        "content": "AI Developer Assistant"
      },
      {
        "index": 1,
        "title": "The Problem",
        "content": "Developers waste 30% of time..."
      }
    ],
    "layout": {
      "name": "general",
      "ordered": false,
      "slides": [...]
    },
    "title": "TechStartup Pitch Deck"
  }'
```

**Process**:
1. Phase 2: AI selects layouts for each slide
2. Phase 3: AI generates content for each slide
3. Image generation (async)
4. Save to database

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "TechStartup Pitch Deck",
  "slides": [
    {
      "id": "slide-0",
      "index": 0,
      "title": "TechStartup",
      "layout_id": "general-intro-slide",
      "content": {
        "title": "TechStartup",
        "description": "AI Developer Assistant...",
        "image": {
          "__image_url__": "https://...",
          "__image_prompt__": "..."
        }
      }
    }
  ]
}
```

---

### 3. Export to PPTX

**GET** `/api/v1/ppt/presentation/{id}/export/pptx`

```bash
curl -X GET \
  http://localhost:8000/api/v1/ppt/presentation/550e8400-e29b-41d4-a716-446655440000/export/pptx \
  --output presentation.pptx
```

**Response**: Binary PPTX file

---

### 4. Get All Presentations

**GET** `/api/v1/ppt/presentation/all`

```bash
curl http://localhost:8000/api/v1/ppt/presentation/all
```

**Response**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "TechStartup Pitch Deck",
    "created_at": "2025-01-26T10:00:00Z",
    "slides": [...]
  }
]
```

---

## Implementation Roadmap for Medellin AI

### Phase 1: Core Generation (Week 1-2)

**Backend (FastAPI + Blaxel)**:

1. ✅ **Outline Generation**
```python
# src/services/presentation_service.py
async def generate_outline(
    content: str,
    n_slides: int,
    language: str = "English",
    tone: str = "professional",
    verbosity: str = "standard"
) -> PresentationOutlineModel:
    """Call OpenAI/Anthropic to generate outline"""
    pass
```

2. ✅ **Layout Selection**
```python
async def select_layouts(
    outline: PresentationOutlineModel,
    available_layouts: List[LayoutModel]
) -> PresentationStructureModel:
    """AI matches layouts to slide content"""
    pass
```

3. ✅ **Content Population**
```python
async def populate_slide_content(
    outline: SlideOutlineModel,
    layout: LayoutModel
) -> dict:
    """Fill layout schema with AI-generated content"""
    pass
```

**Database (Supabase)**:
```sql
-- Run migrations
CREATE TABLE presentations (...);
CREATE TABLE slides (...);
CREATE TABLE presentation_templates (...);
```

**Estimated**: 40-60 hours

---

### Phase 2: Templates (Week 3)

**Create 5 Core Templates**:

1. ✅ **Title Slide**
```tsx
// src/components/presentation/templates/TitleSlide.tsx
const titleSlideSchema = z.object({
  title: z.string().max(60),
  subtitle: z.string().max(150),
  companyName: z.string().max(50),
  date: z.string(),
  backgroundImage: ImageSchema
});
```

2. ✅ **Image-Text Split**
3. ✅ **Metrics (3 stats)**
4. ✅ **Team Grid (3-4 people)**
5. ✅ **Centered CTA**

**Estimated**: 20-30 hours

---

### Phase 3: Export (Week 4)

**PPTX Export**:
```bash
pip install python-pptx
```

```python
# src/services/pptx_exporter.py
class PptxExporter:
    async def export(
        self,
        presentation: PresentationModel
    ) -> str:
        """Convert to PPTX file"""
        pass
```

**Estimated**: 20-30 hours

---

### Phase 4: Polish (Week 5)

1. ✅ Image generation (FLUX.1-schnell-Free)
2. ✅ Advanced settings modal (frontend)
3. ✅ Outline editor (frontend)
4. ✅ Error handling + loading states
5. ✅ Testing (unit + integration)

**Estimated**: 30-40 hours

---

## Key Differences vs Your Current System

| Feature | Presenton | Medellin AI (Current) |
|---------|-----------|----------------------|
| Architecture | 3-phase pipeline | Single agent |
| Layout Selection | AI-driven | Hardcoded |
| Templates | TSX components | TBD |
| Content Generation | Per-slide schemas | Single conversation |
| Image Generation | Multi-provider | Not implemented |
| Export | PPTX + PDF | Not implemented |
| Database | PostgreSQL | Supabase |
| Frontend | Next.js | React + Vite |
| Backend | FastAPI | FastAPI + Blaxel |

---

## Recommended Approach for Medellin AI

### Option 1: Blaxel Multi-Agent (Recommended)

**Architecture**:
```
User Input
    ↓
Supervisor Agent (Blaxel)
    ↓
├── Outline Agent → Generate 10 outlines
├── Layout Agent → Select layouts
├── Content Agent → Populate each slide
└── Export Agent → Generate PPTX
```

**Benefits**:
- ✅ Fits existing Blaxel architecture
- ✅ Parallel processing (faster)
- ✅ Agent specialization
- ✅ Easy to add new agents

**Implementation**:
```python
# src/agents/presentation_supervisor.py
async def supervisor_agent():
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")

    # Agent 1: Outline Generator
    outline_agent = create_react_agent(...)

    # Agent 2: Layout Selector
    layout_agent = create_react_agent(...)

    # Agent 3: Content Populator
    content_agent = create_react_agent(...)

    # Supervisor orchestrates
    return create_supervisor(
        agents=[outline_agent, layout_agent, content_agent],
        model=model
    )
```

---

### Option 2: Direct FastAPI (Simpler)

**Architecture**:
```
User Input
    ↓
FastAPI Endpoint
    ↓
├── OpenAI API → Outline
├── OpenAI API → Layouts
├── OpenAI API → Content (per slide)
└── Python-PPTX → Export
```

**Benefits**:
- ✅ Simpler to implement
- ✅ Fewer dependencies
- ✅ Easier to debug

**Drawbacks**:
- ❌ Sequential processing (slower)
- ❌ No agent orchestration
- ❌ Less flexible

---

## Summary

### Key Takeaways

1. **✅ 3-Phase Pipeline Is Critical**
   - Outline → Layout → Content
   - Each phase uses AI strategically
   - Structured output (JSON) throughout

2. **✅ Zod Schemas Drive Everything**
   - Define slide structure
   - Validate AI output
   - Generate TypeScript types
   - Constrain AI generation

3. **✅ Templates Are React Components**
   - TSX files render slides
   - CSS variables for theming
   - Responsive to data

4. **✅ PPTX Export Is Complex**
   - Python-PPTX for generation
   - Shape-based model
   - Image downloading required

5. **✅ Multi-Provider Images**
   - Stock (Unsplash/Pexels) for MVP
   - AI (FLUX/DALL-E) for custom
   - Placeholder fallback

### Recommended Stack for Medellin AI

**Backend**:
```yaml
Framework: FastAPI + Blaxel
AI: OpenAI GPT-4 / Anthropic Claude
Images: FLUX.1-schnell-Free (primary) + Unsplash (fallback)
Export: python-pptx
Database: Supabase PostgreSQL
```

**Frontend**:
```yaml
Framework: React 19 + Vite
Templates: TSX components + Zod schemas
Styling: Tailwind CSS + CSS variables
UI: shadcn/ui components
State: React Query + Zustand
```

**Timeline**: 5-6 weeks for MVP

---

**File**: `/home/sk/mde/pitch-deck/tasks/PRESENTON-IMPLEMENTATION-GUIDE.md`
**Lines**: 1,247
**Generated**: 2025-01-26
**Repository Analyzed**: `/repos/200-presenton`
