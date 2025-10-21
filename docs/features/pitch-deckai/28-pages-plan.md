# 🎨 LOVABLE DESIGN PLAN: Pitch Deck Pages

**Project:** Medellin Spark - Presentation AI  
**Date:** October 15, 2025  
**Purpose:** Guide for Lovable to design all pitch deck pages  
**Current Live:** https://medellin-spark.lovable.app/

---

## 🔍 CURRENT STATE ANALYSIS

### Live Pages Inspected
1. ✅ https://medellin-spark.lovable.app/profile - Basic page
2. ✅ https://medellin-spark.lovable.app/startup-profile - Basic page
3. ✅ https://medellin-spark.lovable.app/pitch-deck - Basic page
4. ✅ https://medellin-spark.lovable.app/dashboard - Basic page

**Status:** All show "Built with ×" - Basic placeholders ready for full design

---

## 🎯 PAGES NEEDED FOR PITCH DECK FEATURE

### Priority 1: Core Pages (MUST HAVE - Week 1-2)

#### 1. My Presentations Dashboard (`/presentations`)
**Purpose:** Central hub for all user presentations  
**Status:** 🟡 Basic structure exists, needs full design  
**Reference:** `my-presentations-implementation-plan.md`, `my-presentations-page-plan.md`

#### 2. Presentation Editor (`/presentations/:id/edit`)
**Purpose:** Rich text editor for creating/editing slides  
**Status:** 🔴 Placeholder only, needs complete design  
**Reference:** `pitch-deck-dashboard-plan.md`, `22-UI-IMPLEMENTATION-PLAN.md`

#### 3. Presentation Viewer (`/presentations/:id`)
**Purpose:** View/present slides in full-screen mode  
**Status:** 🟡 Basic structure, needs slide renderer design

#### 4. AI Generation Wizard (`/presentations/generate`)
**Purpose:** AI-powered presentation creation  
**Status:** 🔴 Stub only, needs complete wizard design

---

## 📄 PAGE 1: MY PRESENTATIONS DASHBOARD

### Route: `/presentations`
### Status: 🟡 Basic CRUD exists, needs UI design

---

### 🎨 LOVABLE DESIGN REQUIREMENTS

#### Section 1: Page Header (Personalized Greeting)
```
┌─────────────────────────────────────────────────────┐
│ Good morning, Sarah! 👋                            │
│ You have 3 presentations. Last edited 2 hours ago. │
│                                                     │
│ [Select] [•••]                     [+ New] [Search]│
└─────────────────────────────────────────────────────┘
```

**Components Needed:**
- **Greeting Text** (dynamic: morning/afternoon/evening)
- **User Stats** (presentation count, last edited time)
- **Action Buttons:**
  - "New Presentation" (primary CTA)
  - "Select" toggle (multi-select mode)
  - Menu (•••) - Bulk actions
  - Search icon

**Data to Display:**
- `user.full_name` (from profiles table)
- `presentations.count` (total presentations)
- `presentations.last_edited_at` (most recent edit)

**Styling:**
- Background: White (#FFFFFF)
- Text: Charcoal (#1F1F1F)
- Muted: Ash Gray (#6A737D)
- Padding: 32px
- Font: Inter, 32px/700 (title), 16px/400 (subtitle)

---

#### Section 2: Create New Section (4 Creation Cards)
```
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ 🤖         │ │ 📋         │ │ ⬜         │ │ 📊         │
│ AI Generate│ │ Template   │ │ Blank      │ │ Budgeting  │
│ Pitch Deck │ │ Library    │ │ Start Fresh│ │ Forecast   │
│            │ │            │ │            │ │            │
│ [Beta]     │ │ 50+ ready  │ │ Your way   │ │ Financials │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

**Card 1: AI Generate (PRIMARY CTA)**
- Icon: 🤖 Magic wand (48px)
- Title: "AI Generate Pitch Deck"
- Subtitle: "Answer 5 questions, get complete deck"
- Badge: "Beta" (orange)
- Background: Warm Amber tint (#FFF7ED)
- Border: 2px solid #F5A623 (on hover)
- Action: Opens AI wizard modal

**Card 2: Use Template**
- Icon: 📋 Grid (48px)
- Title: "Use a Template"
- Subtitle: "Browse 50+ proven pitch deck templates"
- Background: Cloud White (#FAFBFC)
- Border: 2px solid #E1E8EB
- Action: Opens template library modal

**Card 3: Blank Presentation**
- Icon: ⬜ Empty canvas (48px)
- Title: "Start from Scratch"
- Subtitle: "Create your own slides"
- Background: Cloud White
- Action: Creates blank deck → editor

**Card 4: Startup Budgeting**
- Icon: 📊 Chart (48px)
- Title: "Financial Forecast"
- Subtitle: "Budget planner & revenue projections"
- Background: Cloud White
- Action: Opens budgeting tool

**Card Specs:**
- Width: 260px (desktop), 100% (mobile)
- Height: 200px
- Padding: 24px
- Border-radius: 12px
- Hover: Lift with shadow (0 8px 16px rgba(0,0,0,0.08))
- Transition: 200ms ease-out

---

#### Section 3: My Presentations Grid
```
MY PRESENTATIONS (3)              [Sort: Recent ▼] [Filter: All ▼]

┌────────────┐ ┌────────────┐ ┌────────────┐
│┌──────────┐│ │┌──────────┐│ │┌──────────┐│
││  Cover   ││ ││  Cover   ││ ││  Cover   ││
││  Image   ││ ││  Image   ││ ││  Image   ││
│└──────────┘│ │└──────────┘│ │└──────────┘│
│            │ │            │ │            │
│ Q1 Investor│ │ Seed Deck  │ │ Product    │
│ Pitch      │ │            │ │ Launch     │
│            │ │            │ │            │
│ 12 slides  │ │ 10 slides  │ │ 8 slides   │
│ Draft 🟡   │ │ Complete ✅│ │ Draft 🟡   │
│ Edited 2h  │ │ Edited 3d  │ │ Created 1w │
│            │ │            │ │            │
│[Edit] [•••]│ │[Edit] [•••]│ │[Edit] [•••]│
└────────────┘ └────────────┘ └────────────┘
```

**Presentation Card Design:**

**Cover Image Section:**
- Aspect ratio: 16:9
- Height: 180px
- Background: Gradient placeholder if no image
- Object-fit: cover

**Title Section:**
- Title: 18px/600 (semi-bold)
- Truncate: Max 2 lines with ellipsis
- Color: Charcoal (#1F1F1F)

**Metadata Section:**
- Slide count: "12 slides"
- Status badge: Draft (yellow) or Complete (green)
- Last edited: Relative time ("2 hours ago")
- Font: 14px/400
- Color: Ash Gray (#6A737D)

**Actions:**
- "Edit" button (visible always)
- "•••" menu (hover to show):
  - Duplicate
  - Rename
  - Share Link
  - Download PDF
  - Download PPTX
  - Delete

**Grid Layout:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 24px
- Card border: 1px solid #E1E8EB
- Card border-radius: 10px
- Hover: Shadow (0 8px 16px rgba(0,0,0,0.12))

**Empty State (No Presentations):**
```
┌─────────────────────────────────────┐
│                                     │
│        📊 No Presentations Yet      │
│                                     │
│   Create your first pitch deck      │
│   using AI, templates, or start     │
│   from scratch above.               │
│                                     │
│   [Generate with AI]                │
└─────────────────────────────────────┘
```

---

#### Section 4: Recommended Templates
```
RECOMMENDED TEMPLATES                    [Browse All →]

┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│┌──────────┐│ │┌──────────┐│ │┌──────────┐│ │┌──────────┐│
││ Airbnb   ││ ││ Uber     ││ ││ Sequoia  ││ ││ 500      ││
││ Pitch    ││ ││ Pitch    ││ ││ Capital  ││ ││ Startups ││
││ Deck     ││ ││ Deck     ││ ││ Template ││ ││ Template ││
││   🔒     ││ ││          ││ ││          ││ ││   🔒     ││
│└──────────┘│ │└──────────┘│ │└──────────┘│ │└──────────┘│
│            │ │            │ │            │ │            │
│ Airbnb     │ │ Uber       │ │ Sequoia    │ │ 500 Start. │
│ Pitch Deck │ │ Pitch Deck │ │ Capital    │ │ Investor   │
│            │ │            │ │ Template   │ │ Deck       │
│ 👁 1m uses │ │ 👁 848k    │ │ 👁 1.2m    │ │ 👁 960k    │
│ ❤️ 42k     │ │ ❤️ 38k     │ │ ❤️ 51k     │ │ ❤️ 45k     │
│            │ │            │ │            │ │            │
│[Use This]  │ │[Use This]  │ │[Use This]  │ │[Use This]  │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

**Template Card Design:**
- Same dimensions as Presentation Cards
- Premium badge: Top-right corner, #9ABAC6 with 🔒
- Stats: Eye icon + usage count, Heart icon + likes
- "Use This" button appears on hover
- Attribution: "By [Company]" in muted text

**Data Source:**
- `presentation_templates` table
- Fields: name, cover_image_url, attribution, usage_count, like_count, is_premium

---

### 🎨 COMPONENT BREAKDOWN

#### Components to Design:

1. **PageHeader Component**
   - Greeting text with user name
   - Stats display
   - Action buttons (New, Select, Search)

2. **CreateNewSection Component**
   - 4 creation cards in grid
   - Each card: Icon, title, subtitle, badge (optional)
   - Hover effects

3. **PresentationCard Component**
   - Cover image (16:9)
   - Title (truncated)
   - Metadata (slides, status, last edited)
   - Actions (Edit button + dropdown menu)
   - Status badges (Draft/Complete)

4. **PresentationsGrid Component**
   - Responsive grid container
   - Sort dropdown
   - Filter dropdown
   - Empty state

5. **TemplateCard Component**
   - Cover image
   - Title + attribution
   - Stats (uses, likes)
   - Premium badge
   - "Use This" CTA

6. **RecommendedTemplatesSection Component**
   - Section header
   - Grid of 8 template cards
   - "Browse All" link

7. **EmptyState Component**
   - Icon
   - Message
   - CTA button

---

## 📄 PAGE 2: PRESENTATION EDITOR

### Route: `/presentations/:id/edit`
### Status: 🔴 Needs complete design

---

### 🎨 LOVABLE DESIGN REQUIREMENTS

#### Layout Structure (Venturekit-style)
```
┌───────┬─────────────────────────────────────────────┐
│ [1]   │ Toolbar: [B] [I] [U] [Link] [Image] [Chart]│
│ Cover │ ┌─────────────────────────────────────────┐ │
│       │ │                                         │ │
│ [2]   │ │         # Cover Slide                   │ │
│ Probl │ │                                         │ │
│       │ │         Your Company Name               │ │
│ [3]   │ │         Your tagline here               │ │
│ Solut │ │                                         │ │
│       │ │         [Company Logo Placeholder]      │ │
│ [4]   │ │                                         │ │
│ Market│ └─────────────────────────────────────────┘ │
│       │                                            │
│ [5]   │ Footer: ✅ Saved 2 sec ago  [🎨] [Export] │
│ Team  │                                            │
│       │                                            │
│ [+]   │ Slide 1 of 12                [← Prev] [Next →]│
│ Add   │                                            │
└───────┴─────────────────────────────────────────────┘
```

#### Left Sidebar: Slide Navigation (Width: 220px)
**Purpose:** Quick navigation between slides

**Design:**
- Slide thumbnails in vertical list
- Current slide highlighted (blue border)
- Slide numbers visible
- Drag handles for reordering
- "+" button at bottom to add slides

**Slide Thumbnail Card:**
```
┌─────────────┐
│ [1]         │ ← Number badge
│ ┌─────────┐ │
│ │ Thumb   │ │ ← Mini preview
│ │         │ │
│ └─────────┘ │
│ Cover Slide │ ← Title
└─────────────┘
```

**Specs:**
- Width: 180px
- Height: 120px (thumbnail area)
- Border: 1px solid #E1E8EB
- Active: 2px solid #9ABAC6
- Gap: 12px between cards

---

#### Main Editor Area: Rich Text Editor
**Purpose:** Edit slide content with Plate.js

**Toolbar (Top):**
```
[B] [I] [U] [S] | [Link] | [•] [1.] | [Table] | [Image] | [Chart] | [AI✨]
```

**Toolbar Buttons:**
- **Text Formatting:** Bold, Italic, Underline, Strikethrough
- **Links:** Insert hyperlink
- **Lists:** Bullet list, Numbered list
- **Table:** Insert table
- **Media:** Upload image, Unsplash search, AI generate
- **Custom Elements:** Charts, diagrams, timelines
- **AI Tools:** Generate content, improve writing, suggest images

**Editor Canvas:**
- Background: White or slide background color
- Max width: 1200px (16:9 slide aspect ratio)
- Min height: 675px (maintains 16:9)
- Padding: 40px
- Editable areas highlighted on hover

**Custom Elements Available:**
1. **Charts:** Bar, Line, Pie, Area, Radar, Scatter
2. **Diagrams:** Timeline, Pyramid, Cycle, Staircase, Sequence
3. **Lists:** Arrow list, Icon list, Pros/Cons, Bullet points
4. **Comparisons:** Before/After, Side-by-side, Feature boxes
5. **Media:** Images, Videos (embed), Logo placeholders
6. **Text:** Title, Subtitle, Body, Caption, Quote

**Footer (Bottom):**
```
✅ Auto-saved 2 seconds ago          [🎨 Theme] [📤 Export] [👁️ Preview]
```

- Auto-save indicator (green checkmark)
- Theme button (customize colors, fonts, logo)
- Export menu (PDF, PPTX, PNG)
- Preview button (see as viewer)

---

#### Right Sidebar (Optional): Theme & Assets
**Width:** 280px  
**Collapsible:** Yes

**Sections:**
1. **Theme Selector**
   - Color picker (primary, secondary, accent)
   - Font picker (Google Fonts)
   - Logo uploader

2. **Assets Library**
   - Recent uploads
   - Stock images (Unsplash)
   - AI-generated images
   - Icons library

3. **AI Assistant**
   - "Generate content for this slide"
   - "Improve writing"
   - "Suggest next slide"

---

### 🎨 COMPONENT BREAKDOWN

#### Components for Presentation Editor:

1. **SlideNavigationSidebar**
   - Vertical slide thumbnails
   - Current slide highlight
   - Drag-to-reorder
   - Add slide button

2. **EditorToolbar**
   - Formatting buttons
   - Insert menu
   - AI tools menu

3. **PlateEditor** (Rich Text)
   - Main editing canvas
   - Custom element plugins
   - Auto-save hook
   - Keyboard shortcuts

4. **ThemePanel** (Right sidebar)
   - Color pickers
   - Font selector
   - Logo uploader
   - Apply theme button

5. **AutoSaveIndicator**
   - Status icon (✅ saved, ⏳ saving, ❌ error)
   - Timestamp

6. **ExportMenu**
   - Format selection (PDF, PPTX, PNG)
   - Download button
   - Share link option

---

### 📊 DATA FLOW

#### On Page Load:
```javascript
1. Get presentation by ID from Supabase
2. Parse content (JSONB) into Plate.js format
3. Load slides array
4. Set current slide index (default: 0)
5. Initialize editor with content
```

#### On Edit:
```javascript
1. User types/edits content
2. Debounce 2 seconds
3. Save to Supabase (presentations.content)
4. Update presentations.last_edited_at
5. Show "Saved" indicator
```

#### On Slide Change:
```javascript
1. Save current slide
2. Load new slide content
3. Update editor
4. Scroll to slide in sidebar
```

---

## 📄 PAGE 3: PRESENTATION VIEWER

### Route: `/presentations/:id`
### Status: 🟡 Basic page exists, needs slide renderer

---

### 🎨 LOVABLE DESIGN REQUIREMENTS

#### Layout: Full-Width Viewer
```
┌─────────────────────────────────────────────────────┐
│ Header: "Q1 Investor Pitch"        [Edit] [Share]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│                                                     │
│              Slide 1: Cover Slide                   │
│                                                     │
│              Your Company Name                      │
│              Your tagline here                      │
│                                                     │
│              [Company Logo]                         │
│                                                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│ [← Previous]        Slide 1 of 12        [Next →]  │
│                                                     │
│ [⬜ Thumbnail] [▶️ Present] [📤 Export] [🔗 Share]│
└─────────────────────────────────────────────────────┘
```

#### Header Section
**Components:**
- Presentation title (editable on click)
- Action buttons:
  - "Edit" (opens editor)
  - "Share" (generates link)
  - "Export" (PDF/PPTX menu)
  - "Present" (full-screen mode)

#### Slide Display Area
**Design:**
- Centered slide (max-width: 1200px)
- 16:9 aspect ratio maintained
- Shadow: 0 4px 12px rgba(0,0,0,0.1)
- Background: White or slide background
- Padding: 48px

**Slide Content Rendering:**
- Render Plate.js content as HTML
- Custom elements display (charts, diagrams)
- Images loaded and displayed
- Text formatting preserved

#### Navigation Controls
**Bottom Bar:**
- Previous/Next buttons
- Slide counter: "Slide 1 of 12"
- Thumbnail toggle (shows all slides)
- Present button (full-screen)
- Export dropdown
- Share button

**Keyboard Shortcuts:**
- Arrow Left/Right: Previous/Next slide
- Esc: Exit full-screen
- F: Toggle full-screen

---

### 🎨 COMPONENT BREAKDOWN

1. **PresentationHeader**
   - Title display
   - Action buttons
   - Share status indicator

2. **SlideRenderer**
   - Plate.js content → HTML
   - Custom element renderers
   - Responsive container

3. **NavigationControls**
   - Prev/Next buttons
   - Slide counter
   - Keyboard handler

4. **ThumbnailStrip** (Optional)
   - Horizontal strip of thumbnails
   - Click to jump to slide
   - Current slide highlighted

5. **PresentMode** (Full-screen)
   - Black background
   - Centered slide
   - Minimal controls
   - Speaker notes panel (optional)

---

## 📄 PAGE 4: AI GENERATION WIZARD

### Route: `/presentations/generate`
### Status: 🔴 Needs complete design

---

### 🎨 LOVABLE DESIGN REQUIREMENTS

#### Step 1: Model Selection
```
┌─────────────────────────────────────────────────┐
│  Generate Presentation with AI                  │
│                                                 │
│  Choose AI Model:                               │
│  ┌───────────────┐ ┌───────────────┐           │
│  │ GPT-4 Turbo   │ │ Claude 3.5    │           │
│  │ ● Selected    │ │ ○ Select      │           │
│  │ Best quality  │ │ Fast & smart  │           │
│  └───────────────┘ └───────────────┘           │
│                                                 │
│  [Continue →]                                   │
└─────────────────────────────────────────────────┘
```

#### Step 2: Prompt Input
```
┌─────────────────────────────────────────────────┐
│  Tell us about your startup                     │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ Describe your business idea, product,  │   │
│  │ or company in detail...                │   │
│  │                                         │   │
│  │                                         │   │
│  │                                         │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Number of slides: [10 ▼]                      │
│  Language: [English ▼]                         │
│  ☑ Enable web search (recommended)             │
│                                                 │
│  [← Back]                 [Generate →]          │
└─────────────────────────────────────────────────┘
```

#### Step 3: AI Thinking Display (Streaming)
```
┌─────────────────────────────────────────────────┐
│  Generating your presentation...               │
│  ━━━━━━━━━━━━━━━━━━━━━━ 45%                   │
│                                                 │
│  💭 AI is thinking...                          │
│  ┌─────────────────────────────────────────┐   │
│  │ Analyzing your business model...        │   │
│  │ Researching market trends...            │   │
│  │ Creating outline...                     │   │
│  │ Generating slide titles...              │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ✨ Generated Outline (10 slides)              │
│  1. Cover - Company Name & Tagline             │
│  2. Problem - Market Pain Points               │
│  3. Solution - Your Product                    │
│  4. Market Opportunity - TAM/SAM/SOM           │
│  5. Business Model - Revenue Streams           │
│  6. Traction - Key Metrics                     │
│  7. Competition - Competitive Landscape        │
│  8. Team - Founders & Advisors                 │
│  9. Financials - 3-Year Projections            │
│  10. Ask - Funding Amount & Use of Funds       │
│                                                 │
│  [Cancel]              [Continue to Editor →]   │
└─────────────────────────────────────────────────┘
```

#### Step 4: Review & Edit Outline
```
┌─────────────────────────────────────────────────┐
│  Review Generated Outline                       │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ 1. Cover Slide                  [Edit]  │   │
│  │    Company Name & Tagline       [✓]     │   │
│  ├─────────────────────────────────────────┤   │
│  │ 2. Problem Statement            [Edit]  │   │
│  │    Market pain points           [✓]     │   │
│  ├─────────────────────────────────────────┤   │
│  │ 3. Solution                     [Edit]  │   │
│  │    Your product overview        [✓]     │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  [Regenerate Outline]  [Generate Full Deck →]  │
└─────────────────────────────────────────────────┘
```

---

### 🎨 COMPONENT BREAKDOWN

1. **ModelPicker Component**
   - Radio cards for model selection
   - Model info (speed, quality, cost)
   - Provider logos

2. **PromptInput Component**
   - Large textarea (500 char min)
   - Character counter
   - Slide count selector
   - Language dropdown
   - Web search toggle

3. **ThinkingDisplay Component**
   - Progress bar
   - Streaming thinking text
   - Real-time updates
   - Animated dots

4. **OutlineList Component**
   - Generated slide titles
   - Edit inline
   - Reorder slides
   - Add/remove slides
   - Checkmarks for confirmed

5. **GenerationProgress Component**
   - Step indicator (1/4, 2/4, etc.)
   - Back/Next buttons
   - Cancel option

---

### 📊 DATA FLOW

#### Generation Flow:
```javascript
1. User enters prompt
2. Call Edge Function: generate-outline
3. Stream thinking display
4. Parse outline from response
5. Show outline for review
6. User clicks "Generate Full Deck"
7. Call Edge Function: generate-presentation
8. Stream slide content
9. Save to Supabase (presentations.content)
10. Redirect to editor
```

---

## 📄 PAGE 5: PITCH DECK SLIDES DASHBOARD

### Route: `/pitch-deck/:deckId/slides`
### Status: 📋 Planned, needs design

---

### 🎨 LOVABLE DESIGN REQUIREMENTS

#### Layout: 3-Column Grid (Venturekit-style)
```
┌─────────────────────────────────────────────────────┐
│ Header: "Company Presentation"    [Start Editing]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  [1]     │  │  [2]     │  │  [3]     │        │
│  │┌────────┐│  │┌────────┐│  │┌────────┐│        │
│  ││Skeleton││  ││Skeleton││  ││Skeleton││        │
│  ││Preview ││  ││Preview ││  ││Preview ││        │
│  │└────────┘│  │└────────┘│  │└────────┘│        │
│  │ Cover    │  │ Problem  │  │ Solution │        │
│  │ Slide    │  │ Statemen │  │ Overview │        │
│  │          │  │          │  │          │        │
│  │ [Edit]   │  │ [Edit]   │  │ [Edit]   │        │
│  └──────────┘  └──────────┘  └──────────┘        │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  [4]     │  │  [5]     │  │  [6]     │        │
│  │┌────────┐│  │┌────────┐│  │┌────────┐│        │
│  ││Skeleton││  ││Skeleton││  ││Skeleton││        │
│  │└────────┘│  │└────────┘│  │└────────┘│        │
│  │ Market   │  │ Business │  │ Traction │        │
│  │ Size     │  │ Model    │  │ & Growth │        │
│  │          │  │          │  │          │        │
│  │ [Edit]   │  │ [Edit]   │  │ [Edit]   │        │
│  └──────────┘  └──────────┘  └──────────┘        │
│                                                     │
│  [+ Add Custom Slide]                              │
└─────────────────────────────────────────────────────┘
```

**Similar to Presentation Editor but:**
- Grid view (not single slide edit)
- Click card → opens editor modal
- Reorder via drag-and-drop on grid
- See all slides at once

---

## 🎨 SHARED COMPONENTS ACROSS ALL PAGES

### 1. StatusBadge Component
```
Draft: 🟡 Yellow dot + "Draft" text
Complete: ✅ Green checkmark + "Complete"
Shared: 🔗 Blue link icon + "Shared"
```

### 2. ActionMenu Component (••• dropdown)
```
┌──────────────────┐
│ Edit             │
│ Duplicate        │
│ Rename           │
│ ─────────────    │
│ Share Link       │
│ Download PDF     │
│ Download PPTX    │
│ ─────────────    │
│ Delete (red)     │
└──────────────────┘
```

### 3. ConfirmDialog Component
```
┌─────────────────────────────────┐
│  Delete Presentation?           │
│                                 │
│  Are you sure you want to       │
│  delete "Q1 Investor Pitch"?    │
│  This cannot be undone.         │
│                                 │
│  [Cancel]        [Delete (red)] │
└─────────────────────────────────┘
```

### 4. LoadingSkeleton Component
```
┌────────────┐
│ ▓▓▓▓▓▓▓▓   │ ← Animated shimmer
│ ▓▓▓▓▓▓     │
│            │
│ ▓▓▓▓▓▓▓    │
│ ▓▓▓        │
└────────────┘
```

### 5. EmptyState Component
```
┌─────────────────────────────────┐
│         📊                      │
│                                 │
│    No Presentations Yet         │
│                                 │
│  Create your first pitch deck   │
│  using AI or templates.         │
│                                 │
│  [Generate with AI]             │
└─────────────────────────────────┘
```

---

## 📱 RESPONSIVE DESIGN SPECS

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1439px
- Desktop: ≥ 1440px

### My Presentations Grid
- Desktop: 3 columns (960px+)
- Tablet: 2 columns (768-959px)
- Mobile: 1 column (<768px)

### Editor Layout
- Desktop: Sidebar (220px) + Editor + Theme Panel (280px)
- Tablet: Sidebar (180px) + Editor (full), hide theme panel
- Mobile: No sidebar, bottom nav for slides

### Template Grid
- Desktop: 4 columns
- Tablet: 3 columns
- Mobile: 2 columns

---

## 🎨 DESIGN SYSTEM REFERENCE

### Colors (Soft Intelligence)
```css
--primary: #9ABAC6;      /* Soft Steel Blue */
--primary-hover: #85AAB8; /* Cool Ocean Blue */
--accent: #F5A623;       /* Warm Amber - CTAs */
--bg: #FFFFFF;           /* Pure White */
--surface: #FAFBFC;      /* Cloud White - cards */
--border: #E1E8EB;       /* Silver Mist */
--text: #1F1F1F;         /* Charcoal Black */
--text-muted: #6A737D;   /* Ash Gray */
--success: #34C759;      /* Green */
--warning: #FFCC00;      /* Yellow */
--danger: #FF3B30;       /* Red */
```

### Typography
```css
font-family: 'Inter', sans-serif;

/* Headings */
h1: 32px / 700
h2: 24px / 600
h3: 18px / 600

/* Body */
body: 16px / 400
small: 14px / 400
caption: 13px / 400

/* Buttons */
button: 16px / 500
```

### Spacing (8px grid)
```css
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Border Radius
```css
sm: 6px   /* Buttons */
md: 8px   /* Cards */
lg: 12px  /* Modals */
xl: 16px  /* Page sections */
```

### Shadows (4 levels)
```css
shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
shadow-md: 0 4px 12px rgba(0,0,0,0.08);
shadow-lg: 0 8px 16px rgba(0,0,0,0.12);
shadow-xl: 0 12px 32px rgba(0,0,0,0.16);
```

---

## 📊 DATA REQUIREMENTS FOR LOVABLE

### Database Tables Needed

#### 1. presentations
```sql
id, profile_id, title, description, cover_image_url,
thumbnail_url, status, slide_count, theme (JSONB),
is_public, share_link, view_count, content (JSONB),
created_at, updated_at, last_edited_at, deleted_at
```

#### 2. custom_themes
```sql
id, profile_id, name, description, theme_data (JSONB),
logo_url, is_public, created_at
```

#### 3. presentation_templates
```sql
id, name, description, cover_image_url, attribution,
category, usage_count, like_count, is_premium,
price_cents, tags, slides (JSONB), created_at
```

#### 4. generated_images
```sql
id, profile_id, url, prompt, provider, created_at
```

### API Endpoints Needed

**Supabase Client Queries:**
- `supabase.from('presentations').select()` - Fetch all
- `supabase.from('presentations').insert()` - Create
- `supabase.from('presentations').update()` - Update
- `supabase.rpc('soft_delete_presentation')` - Delete
- `supabase.rpc('duplicate_presentation')` - Duplicate

**Edge Functions:**
- `supabase.functions.invoke('generate-outline')` - AI outline
- `supabase.functions.invoke('generate-presentation')` - AI slides
- `supabase.functions.invoke('generate-image')` - AI images

---

## 🚀 LOVABLE IMPLEMENTATION GUIDE

### What Lovable Needs to Create

#### 4 Main Pages:
1. ✅ **My Presentations Dashboard** (`/presentations`)
   - PageHeader with greeting
   - CreateNewSection (4 cards)
   - PresentationsGrid (responsive)
   - RecommendedTemplatesSection
   - EmptyState

2. ✅ **Presentation Editor** (`/presentations/:id/edit`)
   - SlideNavigationSidebar (left)
   - PlateEditor (center)
   - EditorToolbar (top)
   - ThemePanel (right, optional)
   - AutoSaveIndicator
   - NavigationControls

3. ✅ **Presentation Viewer** (`/presentations/:id`)
   - PresentationHeader
   - SlideRenderer
   - NavigationControls
   - PresentMode toggle

4. ✅ **AI Generation Wizard** (`/presentations/generate`)
   - ModelPicker
   - PromptInput
   - ThinkingDisplay
   - OutlineList
   - GenerationProgress

#### 20+ Components:
- PageHeader
- CreateNewSection (4 creation cards)
- PresentationCard
- TemplateCard
- SlideNavigationSidebar
- EditorToolbar
- PlateEditor (integrate Plate.js)
- ThemePanel
- ModelPicker
- ThinkingDisplay
- OutlineList
- StatusBadge
- ActionMenu
- ConfirmDialog
- LoadingSkeleton
- EmptyState
- AutoSaveIndicator
- NavigationControls
- ExportMenu
- ShareDialog

---

## 📋 LOVABLE DESIGN CHECKLIST

### Page 1: My Presentations (/presentations)
- [ ] Design PageHeader (greeting + stats + actions)
- [ ] Design 4 creation cards (AI, Template, Blank, Budgeting)
- [ ] Design PresentationCard (cover, title, metadata, actions)
- [ ] Design responsive grid (3→2→1 columns)
- [ ] Design sort/filter dropdowns
- [ ] Design empty state
- [ ] Design template cards section
- [ ] Design loading skeletons
- [ ] Design mobile layout

### Page 2: Presentation Editor (/presentations/:id/edit)
- [ ] Design 3-column layout (sidebar + editor + theme panel)
- [ ] Design slide navigation sidebar with thumbnails
- [ ] Design editor toolbar with all buttons
- [ ] Design editor canvas (editable area)
- [ ] Design theme customization panel
- [ ] Design auto-save indicator
- [ ] Design export menu
- [ ] Design mobile editor (collapsed sidebar)

### Page 3: Presentation Viewer (/presentations/:id)
- [ ] Design header with action buttons
- [ ] Design slide display area (centered, shadowed)
- [ ] Design navigation controls (prev/next)
- [ ] Design thumbnail strip (optional)
- [ ] Design present mode (full-screen)
- [ ] Design share dialog
- [ ] Design export menu

### Page 4: AI Generation Wizard (/presentations/generate)
- [ ] Design model selection cards
- [ ] Design prompt textarea (large, multi-line)
- [ ] Design options (slide count, language, web search)
- [ ] Design thinking display with streaming
- [ ] Design outline list (editable)
- [ ] Design progress indicator
- [ ] Design success state

### Shared Components
- [ ] Design status badges (Draft, Complete, Shared)
- [ ] Design action menu dropdown
- [ ] Design confirmation dialogs
- [ ] Design loading skeletons
- [ ] Design empty states
- [ ] Design error states
- [ ] Design toast notifications

---

## ✅ FINAL DELIVERABLES FOR LOVABLE

### Design Files Needed:
1. **Figma/Design File** with:
   - All 4 pages (desktop, tablet, mobile)
   - All 20+ components
   - All states (default, hover, active, disabled, loading, error)
   - Spacing/sizing specs
   - Color palette
   - Typography scale

2. **Component Specifications:**
   - Dimensions (width, height, padding, margins)
   - Colors (background, border, text)
   - Typography (font, size, weight, line-height)
   - States (hover, active, focus, disabled)
   - Animations (transitions, timing functions)

3. **User Flow Diagrams:**
   - Create first presentation flow
   - Edit existing presentation flow
   - AI generation flow
   - Export flow
   - Share flow

4. **Data Schema:**
   - Database table structures
   - API endpoint definitions
   - Supabase RPC functions

---

## 🚀 NEXT STEPS FOR LOVABLE

### Step 1: Review This Document
- Understand all 4 pages
- Review component breakdown
- Study data requirements

### Step 2: Create Designs
- Design Page 1 (My Presentations) first
- Then Page 4 (AI Wizard) - differentiating feature
- Then Page 2 (Editor) - complex, needs most time
- Finally Page 3 (Viewer) - simplest

### Step 3: Component Library
- Build reusable components
- Create design system tokens
- Document component API

### Step 4: Handoff
- Export Figma file
- Provide design specs
- Developer handoff meeting

---

**Status:** ✅ COMPLETE DESIGN BRIEF  
**Pages:** 4 main pages  
**Components:** 20+ components  
**Timeline:** 2-3 weeks design + 6 weeks development  
**Ready for:** Lovable design team 🚀

