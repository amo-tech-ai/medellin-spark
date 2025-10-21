# 🚀 Natural Language Prompt - Pitch Deck AI Generator

**Purpose:** Build an AI-powered pitch deck generator for Medellin AI Hub
**Inspiration:** ALLWEONE Presentation AI + Decktopus UI patterns
**Approach:** Examine → Plan → Build step by step following the user journey

---

## 📋 STEP 1: EXAMINE EXISTING SETUP

Hey Lovable! Before we build anything, please examine what already exists:

### 1.1 Scan Existing Medellin AI Pages

Look through the current site and identify:
- What pages are already built and working?
- What design patterns are being used (colors, buttons, cards, forms)?
- What components can we reuse (buttons, inputs, cards, modals)?
- What navigation patterns exist (sidebar, top nav, breadcrumbs)?
- What's the color scheme (primary, secondary, accent colors)?

### 1.2 Connect to Supabase Database

Connect to the Supabase project and examine:
- List all tables in the database
- For the `presentations` table, show me all columns and their types
- For the `profiles` table, show me all columns and their types
- Are there any foreign key relationships?
- What JSONB columns exist and what structure do they use?
- What Row Level Security (RLS) policies are in place?

### 1.3 Review Reference Implementation

Study the structure of `/home/sk/medellin-spark/presentation-ai` to understand:

**Key directories and their purpose:**
```
presentation-ai/
├── src/
│   ├── app/                        Routes and pages
│   │   └── presentation/          Presentation-related routes
│   ├── components/
│   │   ├── presentation/
│   │   │   ├── dashboard/        Dashboard components
│   │   │   ├── outline/          Outline editor components
│   │   │   ├── editor/           Slide editor components
│   │   │   └── theme/            Theme selection components
│   │   ├── plate/                Rich text editor (skip for MVP)
│   │   └── ui/                   Shared UI components
│   ├── states/                   State management
│   └── lib/                      Utilities and helpers
└── prisma/
    └── schema.prisma             Database schema
```

**Component naming patterns to follow:**
- Use `PresentationDashboard` not `PitchDeckList`
- Use `OutlineEditor` not `SlideListEditor`
- Use `ThemeSelector` not `ColorPicker`
- Use `SlideEditor` not `ContentEditor`
- Use `PresentationViewer` not `Slideshow`

### 1.4 Create Implementation Plan

Based on your examination, create a plan that answers:
- What pages need to be built?
- What components can be reused from existing Medellin AI?
- What new components need to be created?
- How do the pages connect (navigation flow)?
- What data flows between pages?
- Where does AI generation happen (frontend, backend, Edge Functions)?

---

## 📐 STEP 2: UNDERSTAND THE USER JOURNEY

The complete user journey follows this exact flow (from presentation-ai README):

### Complete User Flow (16 Steps)

**Step 1: Login** → User authenticates via Supabase Auth

**Step 2: Navigate to Dashboard** → Shows recent presentations, quick actions

**Step 3: Enter Presentation Topic** → Large textarea where user describes their startup

**Step 4: Choose Number of Slides** → Dropdown selector (recommended 10 slides for investor pitch)

**Step 5: Select Language** → English, Spanish, Portuguese, etc.

**Step 6: Choose Page Style** → Professional, Casual, Technical

**Step 7: Toggle Web Search** → Optional: Include web research in content generation

**Step 8: Click "Generate Outline"** → AI creates 10 slide titles based on topic

**Step 9: Review and Edit Outline** → User sees generated outline, can:
- Reorder slides with drag and drop
- Edit slide titles inline
- Delete unwanted slides
- Add new slides

**Step 10: Select Theme** → User chooses visual theme (Purple, Blue, Dark)

**Step 11: Choose Image Source** → AI-generated or stock photos (skip for MVP)

**Step 12: Select Presentation Style** → Professional vs Casual tone

**Step 13: Click "Generate Presentation"** → AI generates full content for all slides

**Step 14: Wait for Real-Time Generation** → Shows progress: "Generating slide 5 of 10..."

**Step 15: Preview, Edit, Refine** → User can:
- Switch between slides (thumbnail navigation)
- Edit title and content for each slide
- Auto-saves changes every 2 seconds

**Step 16: Present or Export** → User can:
- View full-screen presentation
- Navigate with keyboard (arrows, space, escape)
- Export to PDF/PPTX (future feature)

---

## 🎨 STEP 3: PAGE-BY-PAGE REQUIREMENTS

Build these pages in order:

### Page 1: Enhanced Input Form (ENHANCE EXISTING)

**Route:** `/pitch-deck`

**What exists:** Small textarea, basic form

**What to enhance:**
- Make textarea much larger (10 lines tall minimum)
- Add quick start buttons above textarea with templates:
  - SaaS Platform
  - Marketplace
  - AI/ML Product
  - Fintech
  - E-commerce
  - Dev Tools
- When user clicks quick start, fill textarea with template text
- Change button color from teal to purple to match presentation features
- Change button text to "Generate Pitch Deck"
- Set default slide count to 10 (investor pitch standard)
- Keep: Language selector, Page style dropdown
- Remove: Web search toggle (simplify for MVP)

**Screen flow:**
- User lands here from Dashboard "Generate Pitch Deck" button
- User fills out form (types or uses quick start)
- User clicks "Generate Pitch Deck"
- Show loading: "Generating outline..."
- On success: Navigate to `/presentations/:id/outline`
- On error: Show error message, stay on form

### Page 2: Outline Editor (BUILD NEW)

**Route:** `/presentations/:id/outline`

**Purpose:** Let user review and edit AI-generated outline before creating full slides

**Layout components:**
- Header with back button, page title, auto-save indicator
- Instruction text: "Edit your slide titles, reorder, or remove slides"
- Stat line: "10 slides • ~5 min presentation"
- Draggable slide list (each row shows):
  - Drag handle icon on left (⠿ or ≡)
  - Slide number
  - Editable title (click to edit, auto-save on blur)
  - Edit button (pencil icon)
  - Delete button (trash icon)
  - More options dropdown
- "Add Slide" button below list
- Theme selector section showing:
  - Section header "Choose a Theme"
  - 3 theme cards in a row:
    - Purple (Professional) - selected by default
    - Blue (Trustworthy)
    - Dark (Executive)
  - Each card shows:
    - Theme name
    - Color dots preview (3 circles showing palette)
    - Radio button
    - Description text
- Action buttons at bottom:
  - "Back" button (gray)
  - "Generate Presentation" button (purple, full-width)

**Interactions:**
- User can drag slides to reorder them
- User can click title to edit inline
- Changes auto-save 2 seconds after editing stops
- User can delete slides (shows confirmation, can't delete last slide)
- User can click theme card anywhere to select it
- When user clicks "Generate Presentation":
  - Show loading with progress: "Generating slide 1 of 10..."
  - Call AI to generate full content for each slide
  - On success: Navigate to `/presentations/:id/edit`
  - On error: Show error message, stay on page

**Data operations:**
- Load: Fetch presentation from Supabase `presentations` table
- Display: Show `outline` JSONB array (slide titles)
- Save: Update `outline` JSONB on each change
- Theme: Update `theme` column when user selects

**Decktopus UI patterns to adopt:**
- Drag handles are visible and prominent
- Action buttons appear on hover for each row
- Theme cards are large with color preview
- Selected theme has thick colored border
- Clean, minimal design with lots of whitespace

### Page 3: Slide Editor (BUILD NEW)

**Route:** `/presentations/:id/edit`

**Purpose:** Let user edit title and content for each slide

**Layout components:**
- Split screen design:
  - Left panel (narrow, 200px): Thumbnail navigation
    - Shows mini preview of each slide
    - Click to switch to that slide
    - Selected slide has colored border and arrow indicator
  - Right panel (wide): Content editor
    - Header: Back button, "SLIDE X OF Y", auto-save indicator
    - Title input field (single line)
    - Content textarea (multi-line, plain text, no rich formatting for MVP)
    - Previous/Next navigation buttons
    - "View Presentation" button (purple, prominent)

**Interactions:**
- User clicks thumbnail to switch slides
- User edits title or content
- Changes auto-save 2 seconds after editing stops
- Previous button disabled on first slide
- Next button disabled on last slide
- "View Presentation" opens full-screen viewer

**Data operations:**
- Load: Fetch presentation from Supabase `presentations` table
- Display: Show `content` JSONB object (array of slides with title, content, layout)
- Save: Update specific slide in `content` JSONB when edited
- Navigate: Keep track of current slide index in component state

**Decktopus UI patterns to adopt:**
- Thumbnails show visual preview (or just title for MVP)
- Selected thumbnail is clearly highlighted
- Editor area is clean and focused
- Auto-save indicator always visible
- Simple textarea (no complex rich text editor for MVP)

### Page 4: Presentation Viewer (BUILD NEW)

**Route:** `/presentations/:id/view`

**Purpose:** Display slides in full-screen presentation mode

**Layout components:**
- Full viewport (edge to edge, no chrome)
- Current slide content (centered):
  - First slide uses "title" layout: Large centered title + subtitle
  - Other slides use "content" layout: Left-aligned title + content
- Controls at bottom (auto-hide after 3 seconds):
  - Left/Right arrow buttons
  - Slide counter (e.g., "3 / 10")
  - Exit button

**Interactions:**
- Arrow keys navigate slides (left = previous, right/space = next)
- Escape key exits to editor
- Mouse movement shows controls temporarily
- Controls fade out after 3 seconds of no movement
- Exit button returns to editor

**Data operations:**
- Load: Fetch presentation from Supabase (content + theme)
- Display: Show current slide from `content` JSONB
- Theme: Apply colors from `theme` column (purple/blue/dark)

**Decktopus UI patterns to adopt:**
- Clean full-screen with no distractions
- Keyboard navigation is primary method
- Controls auto-hide for clean presentation
- Theme colors apply to background and text

### Page 5: My Presentations Dashboard (FIX EXISTING)

**Route:** `/presentations`

**What exists:** Grid of presentation cards

**What to fix:**
- Update "Edit Deck" button to link to `/presentations/:id/edit` (not `:id`)
- Add "View" button next to "Edit Deck" button
- "View" button should link to `/presentations/:id/view`
- Both buttons should be same height, Edit has outline style, View has solid purple
- Add status badge to each card (Draft, Complete)
- Ensure "AI Generate" card links to `/pitch-deck`

**Screen flow:**
- User lands here from top navigation or after completing a presentation
- User clicks "Edit Deck" → goes to editor
- User clicks "View" → goes to full-screen viewer
- User clicks "AI Generate" → goes to input form

---

## 🎯 STEP 4: COMPONENT NAMING CONVENTIONS

Follow these naming patterns (consistent with presentation-ai):

### Page Components (in src/pages/ or src/app/)
- `PresentationInput` or `CreatePresentation` - The input form page
- `OutlineEditor` - The outline editing page
- `SlideEditor` or `PresentationEditor` - The slide content editor
- `PresentationViewer` - The full-screen viewer

### Feature Components (in src/components/presentation/)
- `PresentationDashboard` - Dashboard grid of presentations
- `OutlineSlideRow` - Individual slide row in outline editor
- `ThemeSelector` - Theme selection component
- `ThemeCard` - Individual theme card
- `ThumbnailPanel` - Slide thumbnails navigation
- `SlideEditorContent` - Main editing area
- `AutoSaveIndicator` - Shows save status

### Shared UI Components (reuse from existing or create)
- `Button` - Reuse existing button component
- `Input` - Reuse existing input component
- `Textarea` - Reuse existing textarea component
- `Card` - Reuse existing card component
- `Select` - Reuse existing select/dropdown component

---

## 💾 STEP 5: SUPABASE DATABASE INTEGRATION

### Table: presentations

**Columns you'll work with:**
- `id` (uuid) - Primary key
- `profile_id` (uuid) - Foreign key to profiles table
- `title` (text) - Presentation title from user's topic
- `topic` (text) - Original user input
- `slide_count` (integer) - Number of slides (default 10)
- `presentation_style` (text) - "professional", "casual", "technical"
- `status` (text) - "draft", "outline", "complete"
- `theme` (text) - "purple", "blue", "dark"
- `outline` (jsonb) - Array of slide objects with id and title
- `content` (jsonb) - Full presentation content with all slides
- `created_at` (timestamp)
- `updated_at` (timestamp)

**JSONB Structure for outline:**
```
[
  { id: "slide-1", title: "EventOS - Investor Pitch" },
  { id: "slide-2", title: "The Problem We Solve" },
  { id: "slide-3", title: "Our Solution" },
  ...
]
```

**JSONB Structure for content:**
```
{
  slides: [
    {
      id: "slide-1",
      title: "EventOS - Investor Pitch",
      content: "EventOS is an AI-powered...",
      layout: "title"
    },
    {
      id: "slide-2",
      title: "The Problem We Solve",
      content: "Event organizers spend 40+ hours...",
      layout: "content"
    },
    ...
  ],
  slideCount: 10
}
```

### Data Flow Operations

**On Input Form Submit:**
- Call Supabase Edge Function: `generate-outline`
- Edge Function calls Claude API to generate 10 slide titles
- Edge Function saves to database:
  - `title`: First 50 chars of user topic
  - `topic`: Full user input
  - `slide_count`: Selected number
  - `presentation_style`: Selected style
  - `status`: "outline"
  - `outline`: Array of 10 slide objects
- Return presentation ID
- Navigate to outline editor

**On Outline Editor Save:**
- Every edit triggers debounced update
- Update `outline` JSONB with new array
- Update `updated_at` timestamp
- Show "Saving..." then "Saved" indicator

**On Generate Presentation:**
- Call Supabase Edge Function: `generate-presentation`
- Edge Function calls Claude API for each slide
- Edge Function updates database:
  - `content`: Full JSONB with all slide content
  - `status`: "complete"
- Show progress: "Generating slide X of Y..."
- Navigate to slide editor

**On Slide Editor Save:**
- Every edit triggers debounced update
- Update specific slide in `content` JSONB
- Keep array structure intact, only modify one slide
- Update `updated_at` timestamp

---

## 🎨 STEP 6: UI/UX DESIGN PATTERNS

### From Existing Medellin AI (Reuse These)

**Colors:**
- Primary buttons: Use purple `#8B5CF6` for presentation features
- Keep teal `#5EAEA8` for general Medellin AI features
- Backgrounds: White `#FFFFFF` and light gray `#F9FAFB`
- Text: Dark gray `#1F2937`
- Borders: Light gray `#E5E7EB`

**Cards:**
- White background
- Rounded corners (8px radius)
- Shadow on hover
- Border on default state

**Forms:**
- Large padding in inputs (16px)
- Focus state shows purple ring
- Labels above inputs
- Placeholder text in gray

**Buttons:**
- Large click targets (44px min height)
- Clear hover states
- Loading states show spinner
- Disabled state reduces opacity

### From Decktopus (Adopt These Patterns)

**Drag and Drop:**
- Visible drag handle (⠿ or ≡ icon)
- Cursor changes to "grab" on hover
- Row opacity reduces while dragging
- Drop position shows visual indicator

**Inline Editing:**
- Click text to edit directly
- Auto-save after 2 seconds of no typing
- Show "Saving..." indicator
- No separate edit mode modal

**Theme Selection:**
- Large cards with visual previews
- Color dots (3-4 circles) showing palette
- Click anywhere on card to select
- Selected card has thick colored border

**Auto-Save:**
- Always visible indicator in top right
- States: "Saved", "Saving...", "Error"
- Green for saved, gray for saving, red for error
- Icon changes based on state

**Keyboard Navigation:**
- Arrow keys for slide navigation
- Space bar advances slides
- Escape exits viewer
- Hint text shows keyboard shortcuts

### Visual Spacing and Layout

**Consistent spacing:**
- Page padding: 32px on desktop, 16px on mobile
- Section gaps: 32px between major sections
- Card padding: 24px internal padding
- Button padding: 16px vertical, 24px horizontal
- Input padding: 12px vertical, 16px horizontal

**Responsive breakpoints:**
- Mobile: < 640px (stack vertically, hide thumbnails)
- Tablet: 640px - 1024px (smaller thumbnails)
- Desktop: > 1024px (full layout with thumbnails)

---

## 🔄 STEP 7: WORKFLOWS AND DATA FLOWS

### Workflow 1: Create New Presentation

```
User Action                    → System Response
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dashboard: Click "Generate"   → Navigate to /pitch-deck
Input: Fill topic + settings   → Enable generate button
Input: Click "Generate"        → Call Edge Function (generate-outline)
[Loading 30 sec]               → Claude API creates 10 slide titles
Edge Function saves            → Outline saved to Supabase
Navigate to outline editor     → Show /presentations/:id/outline
Outline: Review 10 titles      → Display outline from database
Outline: Edit/reorder slides   → Auto-save changes to Supabase
Outline: Select theme          → Save theme to database
Outline: Click "Generate"      → Call Edge Function (generate-presentation)
[Loading 60-90 sec]            → Claude API creates content for each slide
                               → Show progress: "Generating slide X/Y"
Edge Function saves            → Content saved to Supabase
Navigate to editor             → Show /presentations/:id/edit
```

### Workflow 2: Edit Existing Presentation

```
User Action                    → System Response
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dashboard: Click "Edit Deck"   → Navigate to /presentations/:id/edit
Editor: Load presentation      → Fetch content from Supabase
Editor: Click thumbnail        → Switch to that slide (state change only)
Editor: Edit title             → Start 2-second debounce timer
[Wait 2 seconds]               → Save to Supabase (update content JSONB)
Editor: Edit content           → Restart debounce timer
[Wait 2 seconds]               → Save to Supabase
Editor: Click "View"           → Navigate to /presentations/:id/view
```

### Workflow 3: Present and Export

```
User Action                    → System Response
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dashboard: Click "View"        → Navigate to /presentations/:id/view
Viewer: Load presentation      → Fetch content + theme from Supabase
Viewer: Press right arrow      → Show next slide (state change only)
Viewer: Press left arrow       → Show previous slide
Viewer: Press escape           → Navigate back to editor
```

---

## 📝 STEP 8: BUILD CHECKLIST

Use this checklist to track progress:

### Phase 1: Enhanced Input Form
- [ ] Examine existing `/pitch-deck` page
- [ ] Enlarge textarea to 10 lines minimum
- [ ] Add 6 quick start buttons above textarea
- [ ] Implement quick start button click handlers
- [ ] Change button color from teal to purple
- [ ] Change button text to "Generate Pitch Deck"
- [ ] Set default slide count to 10
- [ ] Test: Quick start fills textarea correctly
- [ ] Test: Form submission calls Edge Function
- [ ] Test: Navigation to outline editor works

### Phase 2: Outline Editor
- [ ] Create new route `/presentations/:id/outline`
- [ ] Install drag-and-drop library (@dnd-kit)
- [ ] Create OutlineEditor page component
- [ ] Create OutlineSlideRow component with drag handle
- [ ] Implement drag-and-drop reordering
- [ ] Implement inline title editing
- [ ] Implement delete slide with confirmation
- [ ] Create ThemeSelector component
- [ ] Create ThemeCard components (3 themes)
- [ ] Implement auto-save with 2-second debounce
- [ ] Create AutoSaveIndicator component
- [ ] Connect to Supabase: Load outline
- [ ] Connect to Supabase: Save outline changes
- [ ] Connect to Supabase: Save theme selection
- [ ] Implement "Generate Presentation" button
- [ ] Show loading progress during generation
- [ ] Test: Drag and drop works smoothly
- [ ] Test: Inline editing auto-saves
- [ ] Test: Theme selection updates database
- [ ] Test: Generate button triggers Edge Function
- [ ] Test: Navigation to editor works

### Phase 3: Slide Editor
- [ ] Create new route `/presentations/:id/edit`
- [ ] Create SlideEditor page component
- [ ] Create ThumbnailPanel component
- [ ] Implement thumbnail click navigation
- [ ] Create slide content editor area
- [ ] Add title input field
- [ ] Add content textarea
- [ ] Implement auto-save with 2-second debounce
- [ ] Add Previous/Next navigation buttons
- [ ] Connect to Supabase: Load presentation
- [ ] Connect to Supabase: Save slide edits
- [ ] Add "View Presentation" button
- [ ] Test: Thumbnail navigation switches slides
- [ ] Test: Title edits auto-save
- [ ] Test: Content edits auto-save
- [ ] Test: Previous/Next buttons work
- [ ] Test: "View" button opens viewer

### Phase 4: Presentation Viewer
- [ ] Create new route `/presentations/:id/view`
- [ ] Create PresentationViewer page component
- [ ] Implement full-screen layout
- [ ] Implement title slide layout
- [ ] Implement content slide layout
- [ ] Apply theme colors to slides
- [ ] Implement keyboard navigation (arrows, space, escape)
- [ ] Create auto-hiding controls
- [ ] Add slide counter display
- [ ] Connect to Supabase: Load presentation
- [ ] Test: Keyboard navigation works
- [ ] Test: Controls auto-hide after 3 seconds
- [ ] Test: Theme colors apply correctly
- [ ] Test: Escape returns to editor

### Phase 5: Fix Dashboard
- [ ] Examine existing `/presentations` page
- [ ] Update "Edit Deck" button link
- [ ] Add "View" button next to Edit
- [ ] Update "AI Generate" card link
- [ ] Add status badges to cards
- [ ] Test: All navigation links work
- [ ] Test: No 404 errors

### Phase 6: End-to-End Testing
- [ ] Test complete flow: Dashboard → Input → Outline → Editor → Viewer
- [ ] Test: Auto-save works on all pages
- [ ] Test: Loading states show correctly
- [ ] Test: Error states show user-friendly messages
- [ ] Test: Mobile responsive on all pages
- [ ] Test: No console errors
- [ ] Test: Database updates correctly
- [ ] Test: Navigation works in all directions

---

## ✅ SUCCESS CRITERIA

The MVP is complete when:

1. **User can create a pitch deck** from start to finish without getting stuck
2. **All 16 steps work** from the user journey
3. **Auto-save functions** on outline and editor pages
4. **Drag and drop works** smoothly for reordering slides
5. **Theme selection** updates and applies correctly
6. **Keyboard navigation** works in viewer
7. **No broken links** or 404 errors
8. **Mobile responsive** on all pages
9. **Consistent design** with existing Medellin AI
10. **Database operations** all succeed

---

## 🎯 REMEMBER

**Key Principles:**
- Examine existing setup before building
- Follow naming conventions from presentation-ai
- Reuse existing Medellin AI components where possible
- Adopt Decktopus UI patterns for drag/drop and inline editing
- Keep it simple (no rich text editor, no images for MVP)
- Focus on the complete user journey working end-to-end
- Auto-save everything (don't make users click "save")
- Show loading states (users know AI is working)
- Use natural language in all copy (no technical jargon)

**What to Skip for MVP:**
- Rich text editor (use simple textarea)
- Image generation (text-only slides)
- PDF/PPTX export (view online only)
- Collaboration features (single user)
- Animation and transitions (static slides)
- Multiple layouts (just title and content)

**What to Prioritize:**
- Complete user journey from topic to presentation
- Auto-save everywhere
- Clean, intuitive UI
- Fast loading with progress indicators
- Keyboard shortcuts in viewer
- Mobile responsive design

---

**Build this step by step, test each phase, and the MVP will work beautifully! 🚀**
