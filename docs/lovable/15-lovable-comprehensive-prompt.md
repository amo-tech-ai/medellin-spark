# 🚀 COMPREHENSIVE LOVABLE PROMPT - PITCH DECK PRESENTATION WIZARD

**Date:** October 15, 2025
**Purpose:** Complete implementation guide for Lovable AI to build the Pitch Deck Presentation Wizard
**Target Platform:** Medellin AI Hub (https://medellin-spark.lovable.app/)
**Reference Implementation:** presentation-ai (Next.js) at `/home/sk/medellin-spark/presentation-ai`

---

## 📋 TABLE OF CONTENTS

1. [Project Context & Purpose](#project-context--purpose)
2. [Goals & Success Criteria](#goals--success-criteria)
3. [Current Site Analysis](#current-site-analysis)
4. [What We're Building](#what-were-building)
5. [Pages to Create](#pages-to-create)
6. [Design System & Styling](#design-system--styling)
7. [Data Architecture](#data-architecture)
8. [User Journey Flow](#user-journey-flow)
9. [Implementation Tasks](#implementation-tasks)
10. [Supabase Integration](#supabase-integration)

---

## 📌 PROJECT CONTEXT & PURPOSE

### What is Medellin AI Hub?
Medellin AI Hub is an **AI-powered startup accelerator** in Medellín, Colombia that helps founders:
- Build AI-powered startups
- Connect with investors and co-founders
- Access $500K+ in credits and perks
- Attend events, workshops, and pitch nights
- **Generate investor pitch decks** using AI (NEW FEATURE)

### Current State
You've already built a **beautiful, functional site** with:
- ✅ **7 public pages** - Landing, Programs, Events, Perks, Startups, Blog, About, Contact
- ✅ **User profiles** - Startup profile wizard, skills & experience editor, public profiles
- ✅ **Dashboard** - Main dashboard with quick actions, stats, upcoming events
- ✅ **Pitch Deck Input** - Form to start generating presentations (`/pitch-deck`)
- ✅ **Design system** - Purple (#8B5CF6) primary, consistent cards, buttons, responsive
- ✅ **Supabase backend** - Auth, database with `profiles` and `presentations` tables

### What's Blocking Users
After filling out the `/pitch-deck` form and clicking "Generate", the AI creates an outline but **users have nowhere to go**. The user journey is **100% blocked** because these 3 critical pages don't exist:

1. ❌ **Outline Editor** (`/presentations/:id/outline`) - Review AI-generated outline
2. ❌ **Slide Editor** (`/presentations/:id/edit`) - Edit slide content
3. ❌ **Presentation Viewer** (`/presentations/:id/view`) - View/present full-screen

**Your mission:** Build these 3 pages to **unblock the entire pitch deck creation flow**.

---

## 🎯 GOALS & SUCCESS CRITERIA

### Primary Goal
Enable users to **create a 10-slide investor pitch deck in under 5 minutes** using AI, from start to finish without getting stuck.

### Success Criteria
MVP is complete when:
- ✅ User can click "Generate Pitch Deck" from dashboard
- ✅ User fills input form and gets AI-generated outline
- ✅ User lands on **Outline Editor** to review/edit outline
- ✅ User selects theme (purple/blue/dark)
- ✅ User generates full presentation (10 slides with AI content)
- ✅ User lands on **Slide Editor** to edit slide titles & content
- ✅ Auto-save works (shows "Saving..." indicator, saves to Supabase every 2 sec)
- ✅ User clicks "Preview" and lands on **Presentation Viewer**
- ✅ User can navigate slides with keyboard (arrows, ESC to exit)
- ✅ Theme colors apply correctly (purple/blue/dark)
- ✅ Mobile responsive (stacks properly on small screens)
- ✅ No console errors, no crashes
- ✅ Complete user journey works end-to-end

### Target Timeline
- **Phase 1 (Outline Editor):** 2-3 days
- **Phase 2 (Slide Editor):** 2-3 days
- **Phase 3 (Viewer):** 1-2 days
- **Total MVP:** 5-8 days

---

## 🔍 CURRENT SITE ANALYSIS

### ✅ Existing Pages (Already Built)

#### Public Pages (7)
1. **Landing** `/` - Hero, stats, CTAs, benefits
2. **Programs** `/programs` - Accelerator programs, filters
3. **Events** `/events` - Events calendar, filters
4. **Perks** `/perks` - $500K+ partner credits library
5. **Startups** `/startups` - Directory (empty)
6. **Blog** `/blog` - 3 blog posts
7. **About** `/about` - Mission, team, partners
8. **Contact** `/contact` - Contact form

#### User Pages (3)
1. **Public Profile** `/profile` - User profile view
2. **Startup Wizard** `/startup-profile` - 5-step form (20% complete)
3. **Skills Editor** `/skills-experience` - Skills & experience

#### Dashboard (1)
1. **Main Dashboard** `/dashboard` - Stats, quick actions, events, jobs
   - Sidebar: Dashboard, Events, Jobs, Perks, Wizard, **Pitch Deck**, Settings, Profile
   - Quick Actions: **"Generate Pitch Deck"** button (purple) → goes to `/pitch-deck`

#### Pitch Deck (1 partial)
1. **Input Form** `/pitch-deck` - ✅ Built
   - Textarea for topic (auto-filled from startup profile)
   - Dropdown for slide count (8-15 slides)
   - Language selector (EN, ES)
   - Style radio (Professional, Casual)
   - **[Generate Presentation]** button (purple)

### 🔴 Critical Missing Pages (Must Build)

1. **Outline Editor** `/presentations/:id/outline` ❌
   - Review AI-generated slide titles
   - Edit titles inline
   - Reorder with drag & drop
   - Delete/add slides
   - Select theme (purple/blue/dark)
   - Generate full presentation

2. **Slide Editor** `/presentations/:id/edit` ❌
   - Thumbnail panel (left sidebar)
   - Slide editor (right panel)
   - Edit title & content per slide
   - Reorder slides (drag thumbnails)
   - Auto-save (debounced 2 sec)
   - Preview button

3. **Presentation Viewer** `/presentations/:id/view` ❌
   - Full-screen mode
   - Display slides with theme colors
   - Navigate with keyboard (arrows)
   - Slide counter (3 / 10)
   - Exit button (or ESC key)

### 🎨 Existing Design System (Use These!)

**Colors:**
- Primary Purple: `#8B5CF6` do not use purple use existing medellin ai color scheme
- Secondary Purple: `#A78BFA`
- Light Purple: `#DDD6FE`
- Background: White `#FFFFFF`
- Text: Dark Gray `#1F2937`
- Borders: Gray `#E5E7EB`

**Components Already Built:**
- Purple buttons (primary actions)
- White/gray cards with hover shadows
- Filter tabs (Events, Perks pages)
- Stats cards (Dashboard)
- Form inputs (Startup wizard)
- Sidebar navigation (Dashboard)
- Loading spinners (Various pages)

**Typography:**
- Font family: Inter (same as dashboard)
- H1: Bold, large
- H2: Semi-bold, medium
- Body: Regular, readable

**Spacing:**
- Card padding: `p-6` (1.5rem)
- Section gaps: `gap-6` (1.5rem)
- Button padding: `px-6 py-3`

**Responsive:**
- Mobile: Stack vertically
- Tablet: 2 columns
- Desktop: Full layout

---

## 🏗️ WHAT WE'RE BUILDING

### Overview
A **3-page presentation wizard** that lets users:
1. Review AI-generated outline → pick theme → generate full deck
2. Edit slide content → reorder slides → auto-save
3. View full-screen presentation → navigate with keyboard → present

### Reference Architecture (presentation-ai)
We're **adapting** the structure from `/home/sk/medellin-spark/presentation-ai` (a Next.js app) to work in our **React/Lovable environment** with **Supabase** instead of Prisma.

#### Presentation-AI Structure (Reference)
```
presentation-ai/
├── src/app/presentation/
│   ├── page.tsx               → Dashboard/List (we already have this)
│   ├── generate/[id]/page.tsx → Outline + Theme (we need this)
│   └── [id]/page.tsx          → Editor + Viewer (we need these)
├── src/components/presentation/
│   ├── dashboard/             → Presentation list components
│   ├── outline/               → Outline editor components
│   ├── theme/                 → Theme selector components
│   ├── editor/                → Slide editor components
│   └── presentation-page/     → Viewer components
```

#### Our Lovable Structure (To Build)
```
medellin-spark-lovable/
├── src/pages/
│   ├── Dashboard.tsx          ✅ Already exists
│   ├── PitchDeck.tsx          ✅ Already exists (/pitch-deck input form)
│   ├── PresentationOutline.tsx ❌ Build this (/presentations/:id/outline)
│   ├── PresentationEditor.tsx  ❌ Build this (/presentations/:id/edit)
│   └── PresentationViewer.tsx  ❌ Build this (/presentations/:id/view)
├── src/components/presentations/
│   ├── OutlineEditor.tsx      ❌ Build this (drag & drop list)
│   ├── ThemeSelector.tsx      ❌ Build this (3 theme cards)
│   ├── SlideEditor.tsx        ❌ Build this (title + content)
│   ├── ThumbnailPanel.tsx     ❌ Build this (left sidebar)
│   └── PresentationViewer.tsx ❌ Build this (full-screen)
```

### Key Differences from presentation-ai
| Feature | presentation-ai (Next.js) | Our Lovable Version (React) |
|---------|---------------------------|------------------------------|
| **Database** | Prisma + PostgreSQL | Supabase (PostgreSQL) |
| **Auth** | NextAuth (Google OAuth) | Supabase Auth |
| **Routing** | Next.js App Router | React Router |
| **Editor** | Plate.js (rich text, 40+ plugins) | **Simple textarea** (MVP) |
| **Layouts** | 15+ layout types (BULLETS, CHART, etc.) | **2 layouts** (title, content) |
| **Images** | AI-generated (Together AI) | **None** (text-only MVP) |
| **Themes** | 9 built-in + custom | **3 themes** (purple, blue, dark) |
| **Export** | PDF, PPTX | **None** (MVP, add later) |
| **State** | Zustand | **React useState** (simpler) |
| **Drag & Drop** | @dnd-kit | **@dnd-kit** (same library) |

**MVP Philosophy:** Build the **simplest version that works** end-to-end. Advanced features come later.

---

## 📄 PAGES TO CREATE

### Page 1: Outline Editor `/presentations/:id/outline` 🔴 CRITICAL

#### Purpose
Allow users to **review and customize** the AI-generated outline before generating full slide content.

#### When User Lands Here
- User filled `/pitch-deck` form
- AI generated outline (array of 10 slide titles)
- Backend created `presentations` record in Supabase
- User redirected here with presentation ID in URL

#### Page Layout

```
┌─────────────────────────────────────────────────────┐
│ ← Back to Dashboard     Review Your Outline   💾 Saved │
├─────────────────────────────────────────────────────┤
│ Edit slide titles, reorder, or remove slides       │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ⠿ 1. EventOS Startup Pitch          ✏️ 🗑️         │
│  ⠿ 2. The Problem We Solve           ✏️ 🗑️         │
│  ⠿ 3. Our Solution                   ✏️ 🗑️         │
│  ⠿ 4. How It Works                   ✏️ 🗑️         │
│  ⠿ 5. Market Opportunity             ✏️ 🗑️         │
│  ⠿ 6. Business Model                 ✏️ 🗑️         │
│  ⠿ 7. Traction & Metrics             ✏️ 🗑️         │
│  ⠿ 8. The Team                       ✏️ 🗑️         │
│  ⠿ 9. Investment Ask                 ✏️ 🗑️         │
│  ⠿ 10. Thank You                     ✏️ 🗑️         │
│                                                       │
│  [+ Add Slide]                                       │
│                                                       │
│  10 slides · ~5 min presentation                     │
│                                                       │
├─────────────────────────────────────────────────────┤
│ Choose a Theme                                       │
│                                                       │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │  Purple   │  │   Blue    │  │   Dark    │       │
│  │ ●●● (sel) │  │   ●●●     │  │   ●●●     │       │
│  │    ○      │  │    ○      │  │    ○      │       │
│  └───────────┘  └───────────┘  └───────────┘       │
│                                                       │
├─────────────────────────────────────────────────────┤
│ [← Edit Info]      [Generate Presentation →]        │
└─────────────────────────────────────────────────────┘
```

#### Sections & Features

**1. Top Bar**
- **Left:** `[← Back to Dashboard]` link
- **Center:** Page title "Review Your Outline"
- **Right:** Save indicator `💾 Saved now` (green) / `💾 Saving...` (gray) / `⚠️ Failed to save` (red)

**2. Subtitle**
- Text: "Edit slide titles, reorder, or remove slides"
- Font: Gray text, smaller

**3. Outline List (Editable)**
Each slide row has:
- **Drag handle:** `⠿` (three horizontal lines)
- **Slide number:** `1.`, `2.`, `3.`, etc.
- **Title input:** Editable text input, full width, white background
- **Edit button:** `✏️` icon (click to focus input)
- **Delete button:** `🗑️` icon (click to remove slide, confirm first)

**Features:**
- **Drag & drop:** Grab `⠿` handle and drag to reorder slides (use @dnd-kit)
- **Inline editing:** Click title to edit, auto-save after 2 seconds
- **Delete:** Click `🗑️`, show confirm dialog: "Delete slide 3?" [Cancel] [Delete]
- **Add slide:** `[+ Add Slide]` button at bottom, inserts blank slide

**4. Stats Bar**
- Text: "10 slides · ~5 min presentation"
- Font: Gray text, smaller
- Dynamic: Updates when slides added/deleted

**5. Theme Selector**
Header: "Choose a Theme"

Three theme cards in a row:
- **Purple Theme** (selected by default)
  - Card title: "Purple"
  - Color dots: ●●● (3 purple shades: #8B5CF6, #A78BFA, #DDD6FE)
  - Radio button: ○ selected (filled dot)
- **Blue Theme**
  - Card title: "Blue"
  - Color dots: ●●● (3 blue shades: #3B82F6, #60A5FA, #DBEAFE)
  - Radio button: ○ unselected
- **Dark Theme**
  - Card title: "Dark"
  - Color dots: ●●● (3 gray shades: #1F2937, #374151, #6B7280)
  - Radio button: ○ unselected

**Card styling:**
- White background
- Border: 2px solid gray (default), 2px solid purple (when selected)
- Padding: 1rem
- Hover: shadow
- Click anywhere on card to select

**6. Bottom Buttons**
- **Left:** `[← Edit Info]` button (gray) → goes back to `/pitch-deck`
- **Right:** `[Generate Presentation →]` button (purple) → generates full deck

#### Data Elements
**Load from Supabase on page mount:**
```typescript
const { data: presentation } = await supabase
  .from('presentations')
  .select('*')
  .eq('id', presentationId)
  .single()

// presentation object contains:
{
  id: "uuid-123",
  profile_id: "user-uuid",
  title: "EventOS Startup Pitch",
  outline: [
    "EventOS Startup Pitch",
    "The Problem We Solve",
    "Our Solution",
    ...
  ],
  theme: "purple", // or "blue" or "dark"
  presentation_style: "professional", // or "casual"
  status: "draft",
  content: null, // will be populated after full generation
  created_at: "2025-10-15T...",
  updated_at: "2025-10-15T..."
}
```

**Auto-save on edit (debounced 2 seconds):**
```typescript
await supabase
  .from('presentations')
  .update({
    outline: newOutline, // updated array
    updated_at: new Date().toISOString()
  })
  .eq('id', presentationId)
```

**Save theme immediately:**
```typescript
await supabase
  .from('presentations')
  .update({
    theme: selectedTheme, // "purple" | "blue" | "dark"
    updated_at: new Date().toISOString()
  })
  .eq('id', presentationId)
```

#### User Journey from This Page
1. **User edits titles** → Auto-saves after 2 sec → Shows "💾 Saved now"
2. **User drags slides** → Reorders outline array → Auto-saves immediately
3. **User picks theme** → Updates theme field → Saves immediately
4. **User clicks "Generate Presentation"** → Shows loading "Generating slide 5/10..." → Calls Supabase Edge Function → Redirects to `/presentations/:id/edit`

---

### Page 2: Slide Editor `/presentations/:id/edit` 🔴 CRITICAL

#### Purpose
Allow users to **edit slide content** (title & body text) with auto-save and preview.

#### When User Lands Here
- User clicked "Generate Presentation" on Outline Editor
- AI generated full slide content (10 slides with titles + paragraphs)
- Backend updated `presentations.content` JSONB field
- User redirected here with presentation ID in URL

#### Page Layout

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] EventOS Startup Pitch  💾 Saved 2 min ago  [Preview] [Done] │
├──────────────┬─────────────────────────────────────────────────┤
│              │                                                   │
│  SLIDES      │  SLIDE 3 OF 10                                  │
│              │                                                   │
│  ┌─────────┐ │  Title:                                         │
│  │ Slide 1 │ │  [Our Solution                          ]       │
│  │ Title   │ │                                                  │
│  └─────────┘ │  Content:                                       │
│              │  ┌──────────────────────────────────────┐       │
│  ┌─────────┐ │  │ EventOS is an AI-powered event      │       │
│  │ Slide 2 │ │  │ management platform that automates  │       │
│  │ Problem │ │  │ ticketing, scheduling, and attendee │       │
│  └─────────┘ │  │ engagement. Our AI assistant helps  │       │
│              │  │ organizers save 10+ hours per event.│       │
│  ┌─────────┐ │  │                                      │       │
│  │ ▶Slide 3│ │  └──────────────────────────────────────┘       │
│  │ Solution│◄─── SELECTED                                     │
│  └─────────┘ │                                                  │
│              │  Layout: Content (read-only for MVP)            │
│  ┌─────────┐ │                                                  │
│  │ Slide 4 │ │                                                  │
│  │ How It  │ │                                                  │
│  └─────────┘ │  [◀ Previous Slide]  3 / 10  [Next Slide ▶]    │
│              │                                                   │
│  ...         │                                                   │
│              │                                                   │
└──────────────┴─────────────────────────────────────────────────┘
```

#### Sections & Features

**1. Top Bar**
- **Left:** Logo (optional) + Presentation title (editable inline)
- **Center:** Save status `💾 Saved 2 min ago` (gray) or `💾 Saving...` (gray) or `💾 Saved now` (green)
- **Right:**
  - `[Preview]` button (gray outline) → Opens `/presentations/:id/view` in current tab
  - `[Done]` button (purple) → Goes back to `/dashboard`

**2. Split View Layout**

**Left Panel: Slide Thumbnails (200px width, fixed)**
- **Vertical list** of slide preview cards
- Each card shows:
  - Slide number: "Slide 1", "Slide 2", etc.
  - Slide title: First 30 chars (truncated with "...")
  - Selected state: Purple border (2px), white background
  - Hover state: Gray shadow
- **Click** thumbnail to switch to that slide
- **Drag** thumbnail to reorder slides (use @dnd-kit)
- **Scroll** if more than 10 slides

**Right Panel: Slide Editor (rest of width)**
- **Slide counter:** "SLIDE 3 OF 10" (gray text, top)
- **Title input:** Large text input, editable, placeholder "Slide title"
- **Content textarea:** Multi-line textarea (8 rows), editable, placeholder "Slide content..."
- **Layout display:** "Layout: Content" (read-only, gray text) - MVP only supports 2 layouts (title, content)
- **Navigation controls:** (bottom)
  - `[◀ Previous Slide]` button (gray)
  - Slide counter: "3 / 10" (centered)
  - `[Next Slide ▶]` button (gray)

**3. Auto-Save Mechanism**
- **Text edits:** Debounced 2 seconds
- **Slide reorder:** Immediate save
- **Visual feedback:** Show indicator in top bar

**4. Keyboard Shortcuts (Optional for MVP)**
- `Ctrl+S` / `Cmd+S`: Manual save
- `Ctrl+P` / `Cmd+P`: Open preview
- Arrow keys: Navigate slides (optional)

#### Data Elements

**Load from Supabase:**
```typescript
const { data: presentation } = await supabase
  .from('presentations')
  .select('*')
  .eq('id', presentationId)
  .single()

// presentation.content structure:
{
  slides: [
    {
      id: "slide-1",
      title: "EventOS Startup Pitch",
      content: "Welcome to our pitch...",
      layout: "title" // or "content"
    },
    {
      id: "slide-2",
      title: "The Problem",
      content: "Event organizers face 3 major challenges...",
      layout: "content"
    },
    // ... 8 more slides
  ],
  slideCount: 10
}
```

**Auto-save (debounced 2 sec):**
```typescript
await supabase
  .from('presentations')
  .update({
    content: updatedContent, // full JSON object
    updated_at: new Date().toISOString()
  })
  .eq('id', presentationId)
```

#### User Journey from This Page
1. **User edits title** → Local state updates → Debounced save after 2 sec → Shows "💾 Saved now"
2. **User edits content** → Local state updates → Debounced save after 2 sec
3. **User clicks thumbnail** → Switches to that slide → Content loads
4. **User drags thumbnail** → Reorders slides array → Saves immediately
5. **User clicks "Preview"** → Opens `/presentations/:id/view`
6. **User clicks "Done"** → Returns to `/dashboard`

---

### Page 3: Presentation Viewer `/presentations/:id/view` 🔴 CRITICAL

#### Purpose
Display presentation in **full-screen mode** for presenting or reviewing.

#### When User Lands Here
- User clicked "Preview" from Slide Editor
- Or user opened direct link to view presentation

#### Page Layout (Full-Screen)

```
┌────────────────────────────────────────────────────────┐
│                                                          │
│                                                          │
│                    Our Solution                          │
│                                                          │
│       EventOS is an AI-powered event management         │
│       platform that automates ticketing, scheduling,    │
│       and attendee engagement. Our AI assistant         │
│       helps organizers save 10+ hours per event.        │
│                                                          │
│                                                          │
│                                                          │
│       [◀ Prev]         3 / 10         [Next ▶]  [✕]     │
│                                                          │
└────────────────────────────────────────────────────────┘
```

#### Sections & Features

**1. Full-Screen Layout**
- **Background:** Theme-colored or dark (based on selected theme)
  - Purple theme: Light purple gradient background
  - Blue theme: Light blue gradient background
  - Dark theme: Dark gray (#1F2937) background
- **Content:** Centered vertically and horizontally
- **Max width:** 900px (responsive)
- **Padding:** 2rem on all sides

**2. Slide Content Display**
- **Title:** Large text (h1), bold, theme-colored
  - Purple theme: Purple text (#8B5CF6)
  - Blue theme: Blue text (#3B82F6)
  - Dark theme: White text
- **Content:** Paragraph text (p), readable size, dark gray or white
  - Light themes: Dark gray (#1F2937)
  - Dark theme: White (#FFFFFF)
- **Line height:** 1.6 (readable)

**3. Bottom Controls (Auto-hide after 3 seconds)**
- **Left:** `[◀ Prev]` button (theme-colored or white)
- **Center:** Slide counter "3 / 10"
- **Right:** `[Next ▶]` button (theme-colored or white)
- **Far right:** `[✕]` Exit button (closes viewer, returns to editor)

**Auto-hide behavior:**
- Show controls on page load
- Hide after 3 seconds of no mouse movement
- Show again when mouse moves

**4. Keyboard Navigation**
- `→` Right arrow: Next slide
- `←` Left arrow: Previous slide
- `Space`: Next slide
- `Escape`: Exit viewer (go back to `/presentations/:id/edit`)
- `Home`: First slide
- `End`: Last slide

**5. Responsive Design**
- Desktop: Full layout
- Tablet: Smaller font sizes
- Mobile: Stack content, smaller buttons

#### Data Elements

**Load from Supabase:**
```typescript
const { data: presentation } = await supabase
  .from('presentations')
  .select('content, theme')
  .eq('id', presentationId)
  .single()

// Use presentation.content.slides array
// Use presentation.theme for styling
```

**State management:**
```typescript
const [currentSlide, setCurrentSlide] = useState(0)
const [controlsVisible, setControlsVisible] = useState(true)
```

**Navigation logic:**
```typescript
const nextSlide = () => setCurrentSlide(Math.min(currentSlide + 1, slides.length - 1))
const prevSlide = () => setCurrentSlide(Math.max(currentSlide - 1, 0))
```

#### User Journey from This Page
1. **User sees slide 1** → Content displayed with theme colors
2. **User clicks "Next"** → Slide 2 displays
3. **User presses right arrow** → Slide 3 displays
4. **User waits 3 seconds** → Controls auto-hide
5. **User moves mouse** → Controls show again
6. **User presses ESC** → Returns to `/presentations/:id/edit`
7. **User clicks ✕** → Returns to `/presentations/:id/edit`

---

## 🎨 DESIGN SYSTEM & STYLING

### Use Existing Lovable Components

**Don't create new components for these - reuse existing:**

1. **Buttons**
   - Primary: Purple background `#8B5CF6`, white text, hover darker
   - Secondary: Gray outline, dark text, hover shadow
   - Already used on: Dashboard, Events, Perks pages

2. **Cards**
   - White background, gray border `#E5E7EB`
   - Padding: `p-6` (1.5rem)
   - Shadow on hover
   - Already used on: Events cards, Perks cards, Profile cards

3. **Inputs**
   - White background, gray border
   - Focus: Purple border
   - Padding: `px-4 py-2`
   - Already used on: Startup wizard, Contact form

4. **Loading Spinners**
   - Purple spinner
   - Already used on: Various pages during loading

5. **Toast Notifications**
   - Success: Green
   - Error: Red
   - Info: Blue
   - Already implemented for forms

### Color Scheme

**Primary Colors:**
```css
--purple-primary: #8B5CF6;
--purple-secondary: #A78BFA;
--purple-light: #DDD6FE;

--blue-primary: #3B82F6;
--blue-secondary: #60A5FA;
--blue-light: #DBEAFE;

--gray-dark: #1F2937;
--gray-medium: #374151;
--gray-light: #6B7280;
```

**Theme Applications:**
```typescript
const themes = {
  purple: {
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#DDD6FE',
    background: '#FFFFFF',
    text: '#1F2937'
  },
  blue: {
    primary: '#3B82F6',
    secondary: '#60A5FA',
    accent: '#DBEAFE',
    background: '#FFFFFF',
    text: '#1F2937'
  },
  dark: {
    primary: '#8B5CF6',
    secondary: '#374151',
    accent: '#6B7280',
    background: '#1F2937',
    text: '#FFFFFF'
  }
}
```

### Typography

```css
/* Use Inter font (same as dashboard) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Sizes */
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem;  /* 36px */
```

### Spacing

```css
/* Use Tailwind spacing (already in use) */
gap-2: 0.5rem
gap-4: 1rem
gap-6: 1.5rem
p-4: 1rem padding
p-6: 1.5rem padding
px-4 py-2: horizontal 1rem, vertical 0.5rem
```

### Responsive Breakpoints

```css
/* Mobile first (already implemented) */
sm: 640px   /* Tablet */
md: 768px   /* Small laptop */
lg: 1024px  /* Laptop */
xl: 1280px  /* Desktop */
```

### Component Styling Examples

**Outline Editor Slide Row:**
```tsx
<div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
  <div className="cursor-grab text-gray-400 hover:text-gray-600">⠿</div>
  <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
  <input
    className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:border-purple-500 focus:outline-none"
    value={slide.title}
    onChange={handleEdit}
  />
  <button className="p-2 hover:bg-gray-100 rounded-md">✏️</button>
  <button className="p-2 hover:bg-red-100 rounded-md">🗑️</button>
</div>
```

**Theme Card:**
```tsx
<div className={`
  p-4 border-2 rounded-lg cursor-pointer transition-all
  ${isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:shadow-md'}
`}>
  <h3 className="font-semibold mb-2">{themeName}</h3>
  <div className="flex gap-1 mb-3">
    {colors.map(color => (
      <div
        key={color}
        className="w-8 h-8 rounded-full"
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
  <input
    type="radio"
    checked={isSelected}
    className="accent-purple-500"
  />
</div>
```

**Slide Thumbnail:**
```tsx
<div
  className={`
    p-3 mb-2 bg-white border-2 rounded-lg cursor-pointer transition-all
    ${isSelected ? 'border-purple-500 shadow-lg' : 'border-gray-200 hover:shadow-md'}
  `}
  onClick={() => selectSlide(index)}
>
  <div className="text-xs text-gray-500 mb-1">Slide {index + 1}</div>
  <div className="font-medium text-sm truncate">{slide.title}</div>
</div>
```

---

## 💾 DATA ARCHITECTURE

### Supabase Tables (Already Exist)

#### 1. `profiles` Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  startup_profile JSONB, -- Data from startup wizard
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. `presentations` Table
```sql
CREATE TABLE presentations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  outline TEXT[], -- Array of slide titles
  content JSONB, -- Full slide structure (see below)
  theme TEXT DEFAULT 'purple', -- 'purple' | 'blue' | 'dark'
  presentation_style TEXT, -- 'professional' | 'casual'
  status TEXT DEFAULT 'draft', -- 'draft' | 'completed' | 'archived'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) already configured
-- Users can only see their own presentations
```

### Content JSONB Structure

**After outline generation (Outline Editor):**
```json
{
  "slides": [],
  "slideCount": 10
}
```

**After full generation (Slide Editor):**
```json
{
  "slides": [
    {
      "id": "slide-1",
      "title": "EventOS Startup Pitch",
      "content": "Welcome to EventOS, the AI-powered event management platform revolutionizing how organizers manage their events.",
      "layout": "title"
    },
    {
      "id": "slide-2",
      "title": "The Problem",
      "content": "Event organizers face three major challenges: manual ticketing processes, complex scheduling, and low attendee engagement. These issues cost organizers 10+ hours per event.",
      "layout": "content"
    },
    {
      "id": "slide-3",
      "title": "Our Solution",
      "content": "EventOS automates ticketing, AI-powered scheduling, and attendee engagement tools, saving 10+ hours per event.",
      "layout": "content"
    }
    // ... 7 more slides
  ],
  "slideCount": 10
}
```

### Supabase Queries You'll Use

**1. Fetch presentation (all pages):**
```typescript
const { data: presentation, error } = await supabase
  .from('presentations')
  .select('*')
  .eq('id', presentationId)
  .single()

if (error) console.error('Error loading presentation:', error)
```

**2. Update outline (Outline Editor):**
```typescript
const { error } = await supabase
  .from('presentations')
  .update({
    outline: newOutline,
    updated_at: new Date().toISOString()
  })
  .eq('id', presentationId)

if (error) console.error('Error saving outline:', error)
```

**3. Update theme (Outline Editor):**
```typescript
const { error } = await supabase
  .from('presentations')
  .update({
    theme: selectedTheme, // 'purple' | 'blue' | 'dark'
    updated_at: new Date().toISOString()
  })
  .eq('id', presentationId)

if (error) console.error('Error saving theme:', error)
```

**4. Update content (Slide Editor):**
```typescript
const { error } = await supabase
  .from('presentations')
  .update({
    content: updatedContent, // full JSONB object
    updated_at: new Date().toISOString()
  })
  .eq('id', presentationId)

if (error) console.error('Error saving content:', error)
```

**5. Call Edge Function (generate full presentation):**
```typescript
const { data, error } = await supabase.functions.invoke('generate-presentation', {
  body: {
    presentationId,
    outline: presentation.outline,
    style: presentation.presentation_style,
    topic: presentation.title
  }
})

if (error) console.error('Error generating presentation:', error)
```

### Row Level Security (RLS)

**Already configured - users can only see their own presentations:**

```sql
-- Policy 1: View own presentations
CREATE POLICY "Users can view own presentations"
ON presentations FOR SELECT
USING (auth.uid() = profile_id);

-- Policy 2: Create own presentations
CREATE POLICY "Users can create presentations"
ON presentations FOR INSERT
WITH CHECK (auth.uid() = profile_id);

-- Policy 3: Update own presentations
CREATE POLICY "Users can update own presentations"
ON presentations FOR UPDATE
USING (auth.uid() = profile_id);

-- Policy 4: Delete own presentations
CREATE POLICY "Users can delete own presentations"
ON presentations FOR DELETE
USING (auth.uid() = profile_id);
```

**This means:** Your components automatically respect user permissions. No extra code needed!

---

## 🔄 USER JOURNEY FLOW

### Complete End-to-End Flow

```
1. Dashboard ✅
   ↓ User clicks "Generate Pitch Deck"

2. Input Form (/pitch-deck) ✅
   ↓ User fills:
   - Topic: "EventOS - AI Event Management"
   - Slides: 10
   - Style: Professional
   - Language: English
   ↓ User clicks [Generate Presentation]

3. AI Generation (Backend)
   ↓ Supabase Edge Function called
   ↓ Claude API generates outline
   ↓ Database: INSERT INTO presentations
   ↓ Returns presentation ID
   ↓ Shows loading: "Generating outline..."

4. Outline Editor (/presentations/:id/outline) ❌ BUILD THIS
   ↓ User sees 10 slide titles
   ↓ User edits titles (auto-save)
   ↓ User reorders slides (drag & drop)
   ↓ User selects theme (purple/blue/dark)
   ↓ User clicks [Generate Presentation →]

5. Full Generation (Backend)
   ↓ Supabase Edge Function called
   ↓ Claude API generates content for each slide
   ↓ Shows progress: "Generating slide 5/10..."
   ↓ Database: UPDATE presentations SET content = {...}
   ↓ Takes 1-2 minutes

6. Slide Editor (/presentations/:id/edit) ❌ BUILD THIS
   ↓ User sees 10 slides with content
   ↓ User clicks slide 3 thumbnail
   ↓ User edits title: "Our Solution"
   ↓ User edits content: "EventOS is..."
   ↓ Auto-saves after 2 seconds
   ↓ User clicks [Preview]

7. Presentation Viewer (/presentations/:id/view) ❌ BUILD THIS
   ↓ Full-screen mode
   ↓ User sees slide 1 with purple theme
   ↓ User presses → arrow key
   ↓ Slide 2 displays
   ↓ User continues navigating
   ↓ User presses ESC key

8. Back to Slide Editor
   ↓ User clicks [Done]

9. Back to Dashboard ✅
   ↓ User sees "EventOS Pitch" in recent presentations
```

### Data Flow Diagram

```
User Input
   ↓
Edge Function (generate-outline)
   ↓
Claude API (outline generation)
   ↓
Database (INSERT presentations with outline)
   ↓
Outline Editor (load, edit, save)
   ↓
Edge Function (generate-presentation)
   ↓
Claude API (content generation per slide)
   ↓
Database (UPDATE presentations with content)
   ↓
Slide Editor (load, edit, auto-save)
   ↓
Database (UPDATE content on every edit)
   ↓
Viewer (load, display, navigate)
```

### Error Handling

**If AI generation fails:**
- Show error toast: "Failed to generate outline. Please try again."
- Log error to console
- Keep user on input form
- Allow retry

**If database save fails:**
- Show error indicator: "⚠️ Failed to save"
- Retry 3 times with exponential backoff
- Keep changes in local state (don't lose work)
- Show persistent warning until saved

**If page load fails (no presentation found):**
- Show error message: "Presentation not found"
- Provide button: [← Back to Dashboard]
- Log error for debugging

---

## ✅ IMPLEMENTATION TASKS

### Phase 1: Outline Editor (Days 1-2) 🔴 PRIORITY 1

**Task 1.1: Create Route**
- [ ] Create new file: `src/pages/PresentationOutline.tsx`
- [ ] Add route to React Router: `/presentations/:id/outline`
- [ ] Add route protection (require auth)

**Task 1.2: Build Page Layout**
- [ ] Top bar with back link, title, save indicator
- [ ] Subtitle text
- [ ] Empty container for outline list
- [ ] Empty container for theme selector
- [ ] Bottom button bar

**Task 1.3: Fetch Data from Supabase**
- [ ] Get presentation ID from URL params
- [ ] Query `presentations` table
- [ ] Handle loading state (show spinner)
- [ ] Handle error state (show error message)
- [ ] Store in React state

**Task 1.4: Build Outline List Component**
- [ ] Create `src/components/presentations/OutlineEditor.tsx`
- [ ] Map outline array to slide rows
- [ ] Add drag handle, number, title input, buttons per row
- [ ] Style with existing card styles

**Task 1.5: Add Drag & Drop**
- [ ] Install `@dnd-kit/core` and `@dnd-kit/sortable`
- [ ] Wrap list in `<DndContext>`
- [ ] Make each row a `<SortableItem>`
- [ ] Handle `onDragEnd` event
- [ ] Update outline order in state

**Task 1.6: Add Inline Editing**
- [ ] Make title input editable (controlled component)
- [ ] Update local state on change
- [ ] Trigger auto-save after 2 seconds (use debounce)
- [ ] Show save indicator during save

**Task 1.7: Add Delete Slide**
- [ ] Add onClick handler to 🗑️ button
- [ ] Show confirm dialog
- [ ] Remove slide from outline array
- [ ] Save immediately to database
- [ ] Update slide count

**Task 1.8: Add Add Slide**
- [ ] Add [+ Add Slide] button
- [ ] Generate new slide ID
- [ ] Insert blank title at end of outline
- [ ] Save immediately to database
- [ ] Update slide count

**Task 1.9: Build Theme Selector Component**
- [ ] Create `src/components/presentations/ThemeSelector.tsx`
- [ ] Create 3 theme cards (purple, blue, dark)
- [ ] Show color dots (3 shades per theme)
- [ ] Add radio button per card
- [ ] Handle theme selection (update state)
- [ ] Save theme immediately to database

**Task 1.10: Add Auto-Save Logic**
- [ ] Create debounced save function (2 sec delay)
- [ ] Update `updated_at` timestamp
- [ ] Show "💾 Saving..." indicator
- [ ] Show "💾 Saved now" on success (2 sec timeout)
- [ ] Show "⚠️ Failed to save" on error
- [ ] Retry failed saves (3 attempts)

**Task 1.11: Add Generate Button**
- [ ] Style [Generate Presentation →] button (purple)
- [ ] Add onClick handler
- [ ] Show loading: "Generating slide 5/10..."
- [ ] Call Supabase Edge Function
- [ ] Handle success: redirect to `/presentations/:id/edit`
- [ ] Handle error: show toast, stay on page

**Task 1.12: Test Phase 1**
- [ ] Load page with presentation ID
- [ ] Edit slide titles
- [ ] Reorder slides with drag & drop
- [ ] Delete a slide
- [ ] Add a slide
- [ ] Select different theme
- [ ] Verify auto-save works
- [ ] Generate presentation
- [ ] Check mobile responsive

---

### Phase 2: Slide Editor (Days 3-4) 🔴 PRIORITY 2

**Task 2.1: Create Route**
- [ ] Create new file: `src/pages/PresentationEditor.tsx`
- [ ] Add route to React Router: `/presentations/:id/edit`
- [ ] Add route protection (require auth)

**Task 2.2: Build Page Layout**
- [ ] Top bar with logo, title, save status, buttons
- [ ] Split layout: left panel (thumbnails) + right panel (editor)
- [ ] Make left panel fixed width (200px)
- [ ] Make right panel flexible width

**Task 2.3: Fetch Data from Supabase**
- [ ] Get presentation ID from URL params
- [ ] Query `presentations` table
- [ ] Parse `content` JSONB field
- [ ] Store slides array in state
- [ ] Track current slide index

**Task 2.4: Build Thumbnail Panel Component**
- [ ] Create `src/components/presentations/ThumbnailPanel.tsx`
- [ ] Map slides to thumbnail cards
- [ ] Show slide number and title (truncated)
- [ ] Highlight selected slide (purple border)
- [ ] Add onClick to select slide
- [ ] Add drag handles for reordering
- [ ] Scroll if more than 10 slides

**Task 2.5: Build Slide Editor Component**
- [ ] Create `src/components/presentations/SlideEditor.tsx`
- [ ] Display slide counter: "SLIDE 3 OF 10"
- [ ] Add title input (large, editable)
- [ ] Add content textarea (8 rows, editable)
- [ ] Show layout display (read-only, gray)
- [ ] Add navigation controls (prev/next buttons, counter)

**Task 2.6: Add Slide Switching**
- [ ] Track `currentSlideIndex` in state
- [ ] Load current slide data
- [ ] Update editor when thumbnail clicked
- [ ] Update editor when nav buttons clicked
- [ ] Prevent switching if on first/last slide

**Task 2.7: Add Editing Logic**
- [ ] Controlled title input
- [ ] Controlled content textarea
- [ ] Update slides array in state on change
- [ ] Trigger auto-save after 2 seconds
- [ ] Show save indicator

**Task 2.8: Add Auto-Save Logic**
- [ ] Debounced save function (2 sec delay)
- [ ] Update `presentations.content` JSONB
- [ ] Update `updated_at` timestamp
- [ ] Show save status in top bar

**Task 2.9: Add Slide Reordering**
- [ ] Install @dnd-kit (if not already)
- [ ] Make thumbnails draggable
- [ ] Handle `onDragEnd` event
- [ ] Reorder slides array
- [ ] Save immediately to database

**Task 2.10: Add Preview Button**
- [ ] Style [Preview] button (gray outline)
- [ ] Add onClick handler
- [ ] Navigate to `/presentations/:id/view`

**Task 2.11: Add Done Button**
- [ ] Style [Done] button (purple)
- [ ] Add onClick handler
- [ ] Navigate to `/dashboard`

**Task 2.12: Test Phase 2**
- [ ] Load page with presentation ID
- [ ] Click thumbnail to switch slide
- [ ] Edit slide title and content
- [ ] Verify auto-save works
- [ ] Drag thumbnail to reorder
- [ ] Click prev/next buttons
- [ ] Click Preview (opens viewer)
- [ ] Click Done (returns to dashboard)
- [ ] Check mobile responsive

---

### Phase 3: Presentation Viewer (Day 5) 🔴 PRIORITY 3

**Task 3.1: Create Route**
- [ ] Create new file: `src/pages/PresentationViewer.tsx`
- [ ] Add route to React Router: `/presentations/:id/view`
- [ ] Add route protection (require auth)

**Task 3.2: Build Full-Screen Layout**
- [ ] Set full viewport height and width
- [ ] Add theme-based background color
- [ ] Center content horizontally and vertically
- [ ] Add max-width constraint (900px)

**Task 3.3: Fetch Data from Supabase**
- [ ] Get presentation ID from URL params
- [ ] Query `presentations` table
- [ ] Get `content` and `theme` fields
- [ ] Store slides and theme in state
- [ ] Track current slide index

**Task 3.4: Build Slide Display Component**
- [ ] Create `src/components/presentations/PresentationViewer.tsx`
- [ ] Display current slide title (h1, large, bold)
- [ ] Display current slide content (p, readable)
- [ ] Apply theme colors (text, background)
- [ ] Handle empty content gracefully

**Task 3.5: Build Navigation Controls**
- [ ] Add bottom control bar
- [ ] Add [◀ Prev] button (left)
- [ ] Add slide counter (center): "3 / 10"
- [ ] Add [Next ▶] button (right)
- [ ] Add [✕] Exit button (far right)
- [ ] Style based on theme

**Task 3.6: Add Auto-Hide Controls**
- [ ] Show controls on page load
- [ ] Set 3-second timeout
- [ ] Hide controls after timeout
- [ ] Show controls on mouse move
- [ ] Reset timeout on mouse move

**Task 3.7: Add Keyboard Navigation**
- [ ] Listen to keyboard events (`useEffect`)
- [ ] Right arrow: next slide
- [ ] Left arrow: previous slide
- [ ] Space: next slide
- [ ] Escape: exit viewer
- [ ] Home: first slide
- [ ] End: last slide

**Task 3.8: Add Navigation Logic**
- [ ] `nextSlide()` function (increment index, max check)
- [ ] `prevSlide()` function (decrement index, min check)
- [ ] Update slide display on index change
- [ ] Disable prev on first slide
- [ ] Disable next on last slide

**Task 3.9: Add Exit Logic**
- [ ] Exit button onClick
- [ ] Escape key listener
- [ ] Navigate to `/presentations/:id/edit`

**Task 3.10: Apply Theme Styling**
- [ ] Load theme from database
- [ ] Apply colors based on theme:
  - **Purple:** Purple bg, purple text
  - **Blue:** Blue bg, blue text
  - **Dark:** Dark bg, white text
- [ ] Test all 3 themes

**Task 3.11: Test Phase 3**
- [ ] Load page with presentation ID
- [ ] Verify slide 1 displays correctly
- [ ] Click "Next" button (slide 2 displays)
- [ ] Press right arrow key (slide 3 displays)
- [ ] Wait 3 seconds (controls auto-hide)
- [ ] Move mouse (controls show again)
- [ ] Press left arrow (previous slide)
- [ ] Press ESC (returns to editor)
- [ ] Test with purple theme
- [ ] Test with blue theme
- [ ] Test with dark theme
- [ ] Check mobile responsive

---

### Phase 4: Polish & Testing (Days 6-7)

**Task 4.1: End-to-End Testing**
- [ ] Start from dashboard
- [ ] Complete full user journey (dashboard → input → outline → editor → viewer → dashboard)
- [ ] Test with different topics
- [ ] Test with different slide counts (8, 10, 12)
- [ ] Test with different themes
- [ ] Test with professional vs casual style

**Task 4.2: Bug Fixes**
- [ ] Fix any console errors
- [ ] Fix any React warnings
- [ ] Fix any layout issues
- [ ] Fix any broken links
- [ ] Fix any data loading issues

**Task 4.3: Mobile Responsive**
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Ensure all pages stack properly
- [ ] Ensure buttons are tappable
- [ ] Ensure text is readable

**Task 4.4: Performance Optimization**
- [ ] Check for unnecessary re-renders
- [ ] Optimize Supabase queries
- [ ] Add loading states
- [ ] Add error boundaries

**Task 4.5: Accessibility**
- [ ] Add ARIA labels
- [ ] Ensure keyboard navigation works
- [ ] Test with screen reader (optional)
- [ ] Check color contrast

**Task 4.6: Documentation**
- [ ] Add comments to complex code
- [ ] Document component props
- [ ] Document Supabase queries
- [ ] Create user guide (optional)

---

### Phase 5: Deployment (Day 8)

**Task 5.1: Pre-Deployment Checks**
- [ ] All tests passing
- [ ] No console errors
- [ ] Mobile responsive verified
- [ ] All links work
- [ ] All data persists correctly

**Task 5.2: Deploy to Production**
- [ ] Push code to repository
- [ ] Deploy via Lovable platform
- [ ] Verify deployed site works
- [ ] Test complete flow on production

**Task 5.3: Monitor & Gather Feedback**
- [ ] Monitor for errors
- [ ] Gather user feedback
- [ ] Create list of post-MVP features
- [ ] Plan next iteration

---

## 🔌 SUPABASE INTEGRATION

### Supabase Client Setup

**Already configured in your Lovable project:**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Authentication

**Already handled by Supabase Auth:**
```typescript
// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Check if authenticated
if (!user) {
  // Redirect to login
  navigate('/auth/signin')
}
```

### Common Query Patterns

**1. Fetch single presentation:**
```typescript
const { data, error } = await supabase
  .from('presentations')
  .select('*')
  .eq('id', presentationId)
  .single()
```

**2. Update outline:**
```typescript
const { error } = await supabase
  .from('presentations')
  .update({ outline: newOutline })
  .eq('id', presentationId)
```

**3. Update theme:**
```typescript
const { error } = await supabase
  .from('presentations')
  .update({ theme: 'blue' })
  .eq('id', presentationId)
```

**4. Update content:**
```typescript
const { error } = await supabase
  .from('presentations')
  .update({ content: newContent })
  .eq('id', presentationId)
```

**5. Call Edge Function:**
```typescript
const { data, error } = await supabase.functions.invoke('generate-presentation', {
  body: { presentationId, outline, style, topic }
})
```

### Error Handling Pattern

```typescript
const { data, error } = await supabase
  .from('presentations')
  .select('*')
  .eq('id', presentationId)
  .single()

if (error) {
  console.error('Database error:', error)
  toast.error('Failed to load presentation')
  return
}

// Use data...
```

### Auto-Save Pattern (Debounced)

```typescript
import { useEffect, useRef } from 'react'

function useAutoSave(data, saveFunction, delay = 2000) {
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      saveFunction(data)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data])
}

// Usage:
useAutoSave(outline, async (newOutline) => {
  const { error } = await supabase
    .from('presentations')
    .update({ outline: newOutline })
    .eq('id', presentationId)

  if (!error) {
    setSaveStatus('saved')
  }
})
```

---

## 🎓 REFERENCE IMPLEMENTATION (presentation-ai)

### File Structure to Reference

**From `/home/sk/medellin-spark/presentation-ai`:**

```
presentation-ai/
├── src/
│   ├── app/presentation/
│   │   ├── page.tsx                     → Presentation list (we have dashboard)
│   │   ├── generate/[id]/page.tsx       → Outline + theme page
│   │   └── [id]/page.tsx                → Editor/viewer page
│   └── components/presentation/
│       ├── dashboard/
│       │   ├── PresentationCard.tsx     → Card component
│       │   └── PresentationList.tsx     → List component
│       ├── outline/
│       │   ├── OutlineEditor.tsx        → Editable outline list
│       │   └── OutlineItem.tsx          → Single slide row
│       ├── theme/
│       │   ├── ThemeSelector.tsx        → Theme picker
│       │   └── ThemeCard.tsx            → Single theme card
│       ├── editor/
│       │   ├── presentation-editor.tsx  → Main editor (Plate.js)
│       │   └── SlidePreview.tsx         → Thumbnail component
│       └── presentation-page/
│           ├── PresentationLayout.tsx   → Viewer layout
│           ├── SlideContainer.tsx       → Slide display
│           └── PresentationHeader.tsx   → Controls bar
```

### What to Adapt

**Adapt these concepts:**
- ✅ Component structure (outline, theme, editor, viewer)
- ✅ Drag & drop implementation (@dnd-kit)
- ✅ Auto-save pattern (debounced)
- ✅ Theme selector UI (3 cards with color dots)
- ✅ Slide navigation logic
- ✅ Keyboard shortcuts

**Don't adapt these (too complex for MVP):**
- ❌ Plate.js editor (use simple textarea)
- ❌ 15+ layout types (use 2: title, content)
- ❌ Image generation (skip for MVP)
- ❌ PDF/PPTX export (skip for MVP)
- ❌ Zustand state management (use React useState)
- ❌ Complex animations

### Key Files to Reference

1. **Outline Editor:**
   - `/presentation-ai/src/components/presentation/outline/OutlineEditor.tsx`
   - Look for: Drag & drop logic, inline editing, add/delete slides

2. **Theme Selector:**
   - `/presentation-ai/src/components/presentation/theme/ThemeSelector.tsx`
   - Look for: Theme card layout, color dots display, radio selection

3. **Slide Editor:**
   - `/presentation-ai/src/components/presentation/editor/presentation-editor.tsx`
   - Look for: Thumbnail panel, slide switching, auto-save

4. **Viewer:**
   - `/presentation-ai/src/components/presentation/presentation-page/PresentationLayout.tsx`
   - Look for: Full-screen layout, keyboard navigation, theme application

---

## 🎯 SUCCESS CHECKLIST

### When is the MVP Complete?

Check all boxes:

**Phase 1: Outline Editor**
- [ ] Page loads with presentation ID from URL
- [ ] Displays AI-generated outline (array of slide titles)
- [ ] User can edit slide titles inline
- [ ] User can reorder slides with drag & drop
- [ ] User can delete slides (with confirmation)
- [ ] User can add new slides
- [ ] User can select theme (purple/blue/dark)
- [ ] Slide count updates dynamically
- [ ] Auto-save works (debounced 2 sec)
- [ ] Save indicator shows status (Saving.../Saved now/Failed)
- [ ] "Generate Presentation" button works
- [ ] Shows loading during generation
- [ ] Redirects to editor after generation
- [ ] Mobile responsive (stacks properly)

**Phase 2: Slide Editor**
- [ ] Page loads with presentation ID from URL
- [ ] Displays all slides with content
- [ ] Thumbnail panel shows all slides (left sidebar)
- [ ] Selected slide has purple border
- [ ] User can click thumbnail to switch slide
- [ ] User can edit slide title
- [ ] User can edit slide content
- [ ] Auto-save works (debounced 2 sec)
- [ ] Save status displays in top bar
- [ ] User can drag thumbnails to reorder
- [ ] Prev/next buttons work
- [ ] Slide counter displays correctly (3 / 10)
- [ ] "Preview" button opens viewer
- [ ] "Done" button returns to dashboard
- [ ] Mobile responsive (stacks properly)

**Phase 3: Viewer**
- [ ] Page loads with presentation ID from URL
- [ ] Displays slide in full-screen mode
- [ ] Theme colors apply correctly
- [ ] User can click "Next" button
- [ ] User can click "Prev" button
- [ ] User can press right arrow key (next slide)
- [ ] User can press left arrow key (prev slide)
- [ ] User can press space key (next slide)
- [ ] User can press ESC key (exit viewer)
- [ ] Controls auto-hide after 3 seconds
- [ ] Controls show on mouse move
- [ ] Slide counter displays correctly (3 / 10)
- [ ] Exit button works (returns to editor)
- [ ] Purple theme displays correctly
- [ ] Blue theme displays correctly
- [ ] Dark theme displays correctly
- [ ] Mobile responsive (readable on small screens)

**End-to-End Flow**
- [ ] User starts from dashboard
- [ ] User fills input form
- [ ] AI generates outline (backend works)
- [ ] User lands on outline editor
- [ ] User edits outline and picks theme
- [ ] User generates full presentation (backend works)
- [ ] User lands on slide editor
- [ ] User edits slide content
- [ ] User previews presentation
- [ ] User navigates with keyboard
- [ ] User exits viewer
- [ ] User returns to dashboard
- [ ] No console errors
- [ ] No crashes or infinite loops
- [ ] All data persists to Supabase correctly

**Quality & Polish**
- [ ] No console errors
- [ ] No React warnings
- [ ] Mobile responsive on all pages
- [ ] All buttons work
- [ ] All links work
- [ ] Loading states display
- [ ] Error messages display
- [ ] Save indicators work
- [ ] Keyboard shortcuts work
- [ ] Design matches existing Lovable style
- [ ] Code is readable and documented

---

## 🚀 LET'S BUILD!

**Ready to start?** Here's your action plan:

1. **Start with Phase 1** (Outline Editor) - This unblocks everything
2. **Follow the tasks** in Implementation Tasks section
3. **Test each feature** as you build it
4. **Use existing components** from dashboard, events, perks pages
5. **Copy styling patterns** from existing pages
6. **Reference presentation-ai** for complex logic (drag & drop, auto-save)
7. **Keep it simple** - MVP first, advanced features later

**Questions to ask yourself:**
- Does this page match the existing design style?
- Is the component reusing existing UI patterns?
- Does auto-save work correctly?
- Does mobile responsive work?
- Are there console errors?

**When stuck:**
- Check the reference files in presentation-ai
- Review the existing Lovable pages for patterns
- Test in mobile view early
- Ask for help if needed

**Remember:**
- ✅ **Simple textarea** not rich text editor
- ✅ **3 themes** not 10+
- ✅ **2 layouts** not 15+
- ✅ **No images** for MVP
- ✅ **Auto-save** with debounce
- ✅ **Existing design** components

**Let's make this happen! 🎉**

---

**Document Created:** October 15, 2025
**Target Platform:** Medellin AI Hub (Lovable)
**Reference:** presentation-ai (Next.js)
**Timeline:** 5-8 days for complete MVP
**Success:** Users can create 10-slide pitch decks in under 5 minutes

**Next Steps:**
1. Read this document completely
2. Start with Phase 1 (Outline Editor)
3. Build incrementally, test frequently
4. Ship MVP, gather feedback, iterate

**Good luck! You've got this! 💪**
