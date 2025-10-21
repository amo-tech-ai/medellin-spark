# Pitch Deck Dashboard - UI Design Plan

**Page Number**: 02
**Date Created**: January 13, 2025
**Design System**: Medellin AI (Soft Intelligence)
**Status**: Ready for Implementation
**Reference**: Venturekit slide grid layout

---

## 1. Page Overview

### 1.1 Page Name
- **Name**: Pitch Deck Slides Dashboard
- **Route**: `/pitch-deck/:deckId/slides`
- **User Role**: Authenticated users (deck owner or collaborators)

### 1.2 Purpose & User Goals
**Primary Purpose**: Visual workspace for managing individual pitch deck slides - view, edit, reorder, and generate AI content.

**User Goals**:
- Primary goal: Edit and organize slides for a specific pitch deck
- Secondary goals:
  - Generate AI-powered slide content
  - Preview slide thumbnails before editing
  - Export deck to PDF/PPTX
  - Reorder slides via drag-and-drop
  - Present deck in full-screen mode

### 1.3 User Personas
**Target Users**:
1. **Founder (Alex)**: Creating first investor deck, needs to edit AI-generated slides
2. **Team Member (Sarah)**: Editing specific slides (Problem, Solution, Team) for demo day
3. **Corporate Lead (David)**: Refining board presentation, adding financial charts

---

## 2. UI Layout Structure

### 2.1 Page Hierarchy
```
PitchDeckDashboard
├── DeckHeader
│   ├── TitleEditor (editable h1)
│   ├── LastSavedIndicator
│   └── ActionButtons
│       ├── GenerateAIButton (primary CTA)
│       ├── ExportDropdown (PDF, PPTX, Google Slides)
│       └── PresentButton
├── SlideGrid
│   └── SlideCard[] (16:9 cards in responsive grid)
└── AddSlideButton (+ Add Custom Slide)
```

### 2.2 Key Sections

#### Section 1: DeckHeader
- **Position**: Top of page, sticky on scroll
- **Purpose**: Deck title, last saved status, primary actions
- **Content**: Editable title + "Saved 2 min ago" + 3 action buttons
- **Layout**: Horizontal flex, space-between alignment

#### Section 2: SlideGrid
- **Position**: Main content area, below header
- **Purpose**: Display all slides as preview cards in responsive grid
- **Content**: Grid of SlideCard components (drag-and-drop enabled)
- **Layout**: CSS Grid, 3 cols (desktop) → 2 cols (tablet) → 1 col (mobile)

#### Section 3: AddSlideButton
- **Position**: Last item in grid
- **Purpose**: Add new custom slide from templates
- **Content**: Dashed border card with "+" icon + "Add Custom Slide"
- **Layout**: Same dimensions as SlideCard

---

## 3. Design System - Soft Intelligence

### 3.1 Color Palette
- **Warm Amber** `#F5A623` - Primary CTA (Generate AI), AI badge
- **Deep Indigo** `#4A5568` - Headings, slide titles
- **Soft Slate** `#718096` - Metadata, slide numbers
- **Muted Teal** `#38B2AC` - Complete status badge
- **Warning Yellow** `#FFCC00` - Draft status badge
- **Pure White** `#FFFFFF` - Card backgrounds, page background
- **Cloud Gray** `#F7FAFC` - Thumbnail placeholder
- **Soft Gray** `#EDF2F7` - Card borders
- **Charcoal** `#2D3748` - Primary text

### 3.2 Typography
```css
/* Deck Title (editable) */
h1: 2rem (32px) / font-weight: 700 / color: Deep Indigo

/* Slide Card Title */
h3: 1.125rem (18px) / font-weight: 600 / color: Deep Indigo

/* Slide Number Badge */
badge: 0.875rem (14px) / font-weight: 500 / color: Soft Slate

/* Metadata (Last edited) */
caption: 0.8125rem (13px) / font-weight: 400 / color: Soft Slate

/* Button Text */
button: 1rem (16px) / font-weight: 500
```

### 3.3 Spacing & Layout
```
Grid gap: 24px (desktop), 16px (mobile)
Card padding: 16px
Header padding: 24px top/bottom, 32px left/right
Section padding: 32px (desktop), 16px (mobile)
Border-radius (cards): 12px
Border-radius (buttons): 8px
```

### 3.4 Shadows
```css
card-default: 0 1px 3px 0 rgba(0,0,0,0.1)
card-hover: 0 8px 16px 0 rgba(0,0,0,0.12)
card-dragging: 0 12px 24px 0 rgba(0,0,0,0.18)
```

---

## 4. Responsive Design

### 4.1 Breakpoints
```
mobile: 0-639px (1 column grid)
tablet: 640-1023px (2 columns)
desktop: 1024-1439px (3 columns)
wide: 1440px+ (3 columns, max-width 1440px)
```

### 4.2 Layout Behavior

**Mobile (0-639px)**:
- DeckHeader: Title stacks above action buttons
- SlideGrid: Single column, cards full width
- Action buttons: Stack vertically, full width
- Thumbnail: 16:9 aspect ratio maintained

**Tablet (640-1023px)**:
- SlideGrid: 2 columns
- Header actions: Horizontal row, wrap if needed

**Desktop (1024px+)**:
- SlideGrid: 3 columns
- Header actions: All inline horizontal
- Max content width: 1440px, centered

---

## 5. Component Specifications

### 5.1 Component: DeckHeader

**Props**:
```typescript
interface DeckHeaderProps {
  deckTitle: string;
  lastSaved: Date;
  slideCount: number;
  onTitleChange: (newTitle: string) => void;
  onGenerateAI: () => void;
  onExport: (format: 'pdf' | 'pptx' | 'google-slides') => void;
  onPresent: () => void;
}
```

**States**:
- Default: Title read-only, actions enabled
- Editing: Title becomes input field with save/cancel
- Saving: "Saving..." indicator replaces timestamp
- Error: Red error message below title

**Visual Design**:
- **Dimensions**: Full width, height 80px
- **Background**: Pure White with bottom border (Soft Gray)
- **Layout**: Flex row, space-between
- **Left side**: Title + timestamp (vertical stack)
- **Right side**: 3 buttons (horizontal row, 12px gap)

### 5.2 Component: SlideCard

**Props**:
```typescript
interface SlideCardProps {
  slide: {
    id: string;
    number: number;
    title: string;
    type: SlideType;
    status: 'draft' | 'complete' | 'ai-generated';
    thumbnailUrl?: string;
    lastEdited: Date;
  };
  onEdit: (slideId: string) => void;
  onDuplicate: (slideId: string) => void;
  onDelete: (slideId: string) => void;
  isDragging?: boolean;
}
```

**States**:
- Default: White card, subtle shadow
- Hover: Lift effect (-4px), action buttons fade in
- Dragging: Increased shadow, 0.8 opacity
- Selected: Warm Amber border (2px)

**Visual Design**:
```
┌─────────────────────────────────┐
│ [1] Cover Slide        [✓]      │ ← Number + title + status badge
│ ┌───────────────────────────┐   │
│ │                           │   │
│ │   16:9 Thumbnail          │   │ ← Slide preview (280x157px)
│ │   (generated from slide)  │   │
│ │                           │   │
│ └───────────────────────────┘   │
│ Last edited: 2 hours ago        │ ← Metadata
│                                 │
│ [Edit] [Duplicate] [Delete]     │ ← Actions (visible on hover)
└─────────────────────────────────┘
```

**Dimensions**:
- Card width: 320px (desktop), flexible in grid
- Thumbnail: 16:9 aspect ratio (280px × 157.5px)
- Total height: ~300px

**Thumbnail States**:
- Has image: Display thumbnail with object-fit cover
- No image: Cloud Gray background + slide type icon (120px, Soft Slate)
- Loading: Skeleton animation (gray shimmer)

### 5.3 Component: AddSlideButton

**Visual Design**:
```
┌─────────────────────────────────┐
│                                 │
│            +                    │ ← 48px icon, Warm Amber
│                                 │
│      Add Custom Slide           │ ← 18px text, Deep Indigo
│                                 │
│           or                    │
│      [🤖 AI Suggest]            │ ← Button
│                                 │
└─────────────────────────────────┘
```

**States**:
- Default: Dashed border (2px, Soft Gray), white background
- Hover: Dashed border becomes Warm Amber, lift effect
- Active: Background Cloud Gray

**Dimensions**: Same as SlideCard (320px × ~300px)

---

## 6. Interactive Elements

### 6.1 Primary CTA: Generate AI Slides Button
```css
background: #F5A623 (Warm Amber)
color: #FFFFFF
padding: 12px 24px
border-radius: 8px
font-weight: 500
box-shadow: 0 2px 4px rgba(245,166,35,0.3)

/* Hover */
background: #E89714 (darker)
transform: translateY(-2px)
box-shadow: 0 4px 12px rgba(245,166,35,0.4)

/* Active */
transform: translateY(0)
```

### 6.2 Secondary Buttons: Export, Present
```css
border: 1px solid #E1E8EB
background: #FFFFFF
color: #2D3748
padding: 12px 20px
border-radius: 8px

/* Hover */
background: #F7FAFC
border-color: #9ABAC6
```

### 6.3 Drag-and-Drop
- **Library**: react-beautiful-dnd
- **Visual feedback**:
  - Dragging: Card opacity 0.8, increased shadow
  - Drop target: Blue dashed outline appears
  - Reordering: Smooth spring animation (300ms)

### 6.4 Keyboard Navigation
- **Tab**: Navigate between cards
- **Enter**: Open card editor
- **Arrow keys**: Move focus between cards (grid-aware)
- **Space**: Activate drag (accessibility)
- **Escape**: Cancel drag

---

## 7. Content Guidelines

### 7.1 Empty State
**When Shown**: Deck has 0 slides

**Content**:
- Icon: Presentation icon (slides stack), 120px, Soft Slate
- Heading: "Let's build your pitch deck"
- Description: "Generate a complete deck with AI or add slides manually."
- CTA: "Generate AI Deck" button (Warm Amber)

### 7.2 Loading States
**AI Generation**:
- Modal overlay with progress bar
- "Generating your slides... 8 of 12 complete"
- Individual slide cards fade in as they're generated

**Thumbnail Generation**:
- Gray skeleton with pulse animation
- Fades to actual thumbnail when ready

### 7.3 Error States
**Failed to Load Deck**:
- Icon: Alert triangle, Gentle Coral
- Heading: "Couldn't load this pitch deck"
- Action: "Retry" button

**AI Generation Failed**:
- Toast notification: "AI generation failed. Please try again."
- Retry button in notification

---

## 8. Interactions & Animations

### 8.1 Hover Effects
**SlideCard**:
```css
transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;

/* Hover */
transform: translateY(-4px);
box-shadow: 0 8px 16px rgba(0,0,0,0.12);
```

**Action Buttons** (Edit, Duplicate, Delete):
```css
opacity: 0;
transition: opacity 0.15s ease-in-out;

/* Parent card hover */
opacity: 1;
```

### 8.2 Drag-and-Drop Animation
```css
/* Dragging card */
opacity: 0.8;
transform: scale(1.05);
box-shadow: 0 12px 24px rgba(0,0,0,0.18);
cursor: grabbing;

/* Reordering animation */
transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### 8.3 Micro-interactions
- **Card click**: Subtle scale down (0.98) for 100ms
- **Status badge change**: Color fade transition (200ms)
- **Save indicator**: Checkmark icon with fade-in effect
- **Delete confirmation**: Shake animation on card (400ms)

---

## 9. Accessibility (A11y)

### 9.1 Checklist
- [x] All cards keyboard accessible (Tab, Enter, Space)
- [x] Focus indicators visible (2px Warm Amber outline)
- [x] ARIA labels on icon-only buttons
- [x] Alt text on slide thumbnails: "Preview of {slide title}"
- [x] Drag-and-drop keyboard accessible (Space to grab, Arrow keys to move)
- [x] Screen reader announces reordering: "Slide 3 moved to position 5"
- [x] Color contrast: All text meets WCAG AA (4.5:1)
- [x] Status badges have aria-label: "Status: Complete"

### 9.2 Keyboard Shortcuts
- **Tab**: Navigate cards
- **Enter**: Open slide editor
- **Space**: Grab card for drag (accessibility mode)
- **Arrow keys**: Move grabbed card
- **Escape**: Cancel drag
- **Cmd/Ctrl + S**: Save deck
- **Cmd/Ctrl + E**: Export PDF

### 9.3 Screen Reader Support
- Page title: "{Deck Title} - Slides | Medellin AI"
- ARIA live regions: `<div role="status" aria-live="polite">` for save confirmations
- Heading hierarchy: H1 (Deck title), H2 (section headers), H3 (card titles)

---

## 10. Images & Media

### 10.1 Slide Thumbnails
- **Generation**: Server-side rendering of slide content to PNG
- **Dimensions**: 560px × 315px (2x for retina), displayed at 280px × 157.5px
- **Format**: WebP (primary), PNG (fallback)
- **Optimization**: 80% quality, lazy loading
- **Fallback**: Slide type icon on Cloud Gray background

### 10.2 Icons
- **Library**: Lucide React
- **Sizes**: 16px (status badges), 20px (action buttons), 48px (add slide icon)
- **Color**: Inherit from parent

**Icon Mapping**:
- Edit: `Edit2`
- Duplicate: `Copy`
- Delete: `Trash2`
- Drag handle: `GripVertical`
- AI Generate: `Wand2`
- Export: `Download`
- Present: `Play`
- Add slide: `PlusSquare`
- Status Complete: `CheckCircle2`
- Status Draft: `AlertCircle`

---

## 11. Data Integration

### 11.1 Data Model
```typescript
interface Slide {
  id: string;
  deck_id: string;
  number: number;
  title: string;
  type: 'cover' | 'problem' | 'solution' | 'market' | 'product' | 'team' | 'financials' | 'ask' | 'custom';
  status: 'draft' | 'complete' | 'ai-generated';
  content: JSONB; // Slide content blocks
  thumbnail_url?: string;
  speaker_notes?: string;
  last_edited: string;
  created_at: string;
  ai_generated: boolean;
}
```

### 11.2 API Endpoints
```typescript
// Fetch all slides for deck
GET /rest/v1/slides?deck_id=eq.{deckId}&order=number.asc

// Update slide order
PATCH /rest/v1/rpc/reorder_slides
Body: { deck_id: string, slide_order: string[] }

// Generate AI slide
POST /rest/v1/rpc/generate_ai_slide
Body: { deck_id: string, slide_type: string, context: string }

// Export deck
POST /rest/v1/rpc/export_deck
Body: { deck_id: string, format: 'pdf' | 'pptx' | 'google-slides' }
```

### 11.3 State Management
**Zustand Store**:
```typescript
interface SlidesStore {
  slides: Slide[];
  deckTitle: string;
  isLoading: boolean;
  isSaving: boolean;

  fetchSlides: (deckId: string) => Promise<void>;
  reorderSlides: (oldIndex: number, newIndex: number) => Promise<void>;
  updateSlide: (slideId: string, updates: Partial<Slide>) => Promise<void>;
  deleteSlide: (slideId: string) => Promise<void>;
}
```

---

## 12. Implementation Notes

### 12.1 Technical Stack
- **Framework**: React 18+ with TypeScript
- **Drag-and-Drop**: react-beautiful-dnd
- **Image Optimization**: Cloudinary or Supabase Storage Transforms
- **Export**: Server-side rendering (Puppeteer for PDF, pptxgenjs for PPTX)

### 12.2 Performance Optimization
- [x] Virtualize grid if >50 slides (react-window)
- [x] Lazy load thumbnails (intersection observer)
- [x] Debounce reorder API calls (500ms)
- [x] Optimistic UI updates (instant reordering, sync in background)
- [x] WebP images with PNG fallback

---

## 13. Real-World Use Cases

### Use Case 1: First-Time User Generating AI Deck
**Steps**:
1. Clicks "Generate AI Slides" button
2. Fills in company details (name, description, industry, stage, audience)
3. AI generates 12 slides in 15 seconds
4. Grid populates with thumbnails
5. Clicks "Slide 1: Cover" to edit company name
6. Reviews all slides, exports PDF
**Time**: 20 minutes

### Use Case 2: Editing Traction Slide
**Steps**:
1. Opens deck with 15 existing slides
2. Clicks "Slide 8: Traction" (status: Draft)
3. Editor opens, clicks "Generate AI Content"
4. AI suggests 3 key metrics + growth chart
5. User accepts, adds custom screenshot
6. Status changes to Complete
7. Returns to grid, reorders slide to position 6
**Time**: 10 minutes

### Use Case 3: Presenting to Investors
**Steps**:
1. Reviews all slides in grid
2. Clicks "Present Mode" button
3. Full-screen slideshow starts
4. Uses arrow keys to navigate
5. References speaker notes on second screen
6. Q&A section uses Escape to exit present mode
**Time**: 30 minutes (presentation)

---

## 14. Success Metrics

### 14.1 UX Metrics
- **Slide Edit Rate**: >70% of users edit ≥1 slide
- **Reorder Rate**: >40% of users reorder ≥1 slide
- **AI Generation Success**: >90% complete without errors
- **Export Rate**: >80% of users export deck

### 14.2 Performance Metrics
- **Page Load**: <2s for 12 slides
- **Thumbnail Load**: <1s per slide
- **Reorder Animation**: 60fps, <300ms duration
- **Export Time**: <10s for PDF, <15s for PPTX

---

**Document Status**: ✅ Complete
**Version**: 1.0
**Created**: January 13, 2025
**Ready for Implementation** 🚀
