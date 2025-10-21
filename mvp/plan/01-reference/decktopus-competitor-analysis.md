# 🚀 DECKTOPUS-INSPIRED MVP - STARTUP PITCH DECK CREATOR

**Date:** October 15, 2025
**Purpose:** Simplified MVP using Decktopus UI/UX patterns, focused exclusively on startup pitch decks
**Target:** Medellin AI Hub founders creating investor presentations
**Inspiration:** Decktopus clean interface + AI-first approach

---

## 📊 TABLE OF CONTENTS

1. [MVP Scope - What We're Building](#mvp-scope)
2. [Decktopus UI/UX Patterns to Adopt](#decktopus-uiux-patterns)
3. [Startup Pitch Deck Structure](#startup-pitch-deck-structure)
4. [3-Page MVP Implementation](#3-page-mvp-implementation)
5. [Implementation Checklist](#implementation-checklist)

---

## 🎯 MVP SCOPE

### What We're Building (MVP Only)
**ONE USE CASE:** Help startup founders create 10-slide investor pitch decks in under 5 minutes

**Core Features:**
- ✅ AI-generated outline (10 slides for startup pitch)
- ✅ Edit outline with drag & drop (Decktopus-style)
- ✅ 3 theme options (purple, blue, dark)
- ✅ Simple slide editor (title + content textarea)
- ✅ Full-screen presentation viewer

**NOT in MVP (Add Later):**
- ❌ Document upload (complex, skip for now)
- ❌ Template library (focus on one pitch structure)
- ❌ Collaboration features (single user only)
- ❌ Advanced layouts (just title + content)
- ❌ Image generation (text-only MVP)
- ❌ Export to PDF/PPTX (view online only)
- ❌ Analytics tracking (skip for MVP)

### Target User
**Who:** Startup founders in Medellin AI Hub accelerator
**Goal:** Create investor-ready pitch deck quickly
**Pain Point:** Spending 40+ hours on pitch deck when they should be building product

### Success Criteria
- ✅ User creates 10-slide pitch in under 5 minutes
- ✅ Outline generation takes < 30 seconds
- ✅ Full content generation takes < 2 minutes
- ✅ UI is intuitive (no tutorial needed)
- ✅ Pitch deck looks professional (clean, modern)
- ✅ Works on mobile (founders pitch from phones)

---

## 🎨 DECKTOPUS UI/UX PATTERNS TO ADOPT

### Pattern 1: Clean, Minimal Input Screen
**What Decktopus Does:**
- Large textarea with placeholder text
- Clear call-to-action button (purple/blue)
- Smart topic suggestions (quick start buttons)
- Helpful subtitle text explaining what to do

**Our MVP Adaptation:**
```
┌───────────────────────────────────────────────────┐
│                                                     │
│     What's your startup pitch about?               │
│     ────────────────────────────────────────       │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │ AI-powered event management platform        │  │
│  │ for organizers to automate ticketing,       │  │
│  │ scheduling, and attendee engagement...      │  │
│  │                                              │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  Or try these quick starts:                        │
│  [SaaS Startup] [Marketplace] [AI/ML Product]     │
│                                                     │
│  ┌─────────────────────────────────────┐          │
│  │   Generate Pitch Deck →             │          │
│  └─────────────────────────────────────┘          │
│                                                     │
└───────────────────────────────────────────────────┘
```

**Key Elements:**
- **Large textarea** (not small input) - feels less restrictive
- **Placeholder text** - guides user on what to write
- **Quick start buttons** - 3-4 common startup types
- **Single clear CTA** - one purple button, prominent
- **No clutter** - minimal UI, focus on input

### Pattern 2: Outline Editor with Inline Actions
**What Decktopus Does:**
- Each outline item has inline edit/delete buttons
- Drag handles (⠿) for reordering
- Add slide button at bottom of list
- Slide count indicator
- Clean, card-based design per slide

**Our MVP Adaptation:**
```
┌─────────────────────────────────────────────────────┐
│ Review Your Outline                        💾 Saved  │
│ Edit titles, reorder, or remove slides              │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ⠿  1. EventOS - Investor Pitch        ✏️  🗑️       │
│  ⠿  2. The Problem We Solve            ✏️  🗑️       │
│  ⠿  3. Our Solution                    ✏️  🗑️       │
│  ⠿  4. How It Works                    ✏️  🗑️       │
│  ⠿  5. Market Opportunity              ✏️  🗑️       │
│  ⠿  6. Business Model                  ✏️  🗑️       │
│  ⠿  7. Traction & Growth               ✏️  🗑️       │
│  ⠿  8. The Team                        ✏️  🗑️       │
│  ⠿  9. Financials & Ask                ✏️  🗑️       │
│  ⠿ 10. Next Steps                      ✏️  🗑️       │
│                                                       │
│  [+ Add Slide]                                       │
│                                                       │
│  10 slides · ~5 min presentation                     │
│                                                       │
└─────────────────────────────────────────────────────┘
```

**Key Elements:**
- **Drag handle left** (⠿) - visual affordance for reordering
- **Inline buttons** (✏️ 🗑️) - actions per row, not dropdown menu
- **Numbered** (1., 2., 3.) - clear slide order
- **Full-width rows** - easy to scan
- **Add button at bottom** - natural flow
- **Slide count visible** - shows progress

### Pattern 3: Theme Selector with Color Previews
**What Decktopus Does:**
- Large theme cards in a row
- Color dots showing palette (●●●)
- Click anywhere on card to select
- Selected state with bold border
- Preview before committing

**Our MVP Adaptation:**
```
┌─────────────────────────────────────────────────────┐
│ Choose a Theme                                       │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Purple    │  │    Blue     │  │    Dark     │ │
│  │             │  │             │  │             │ │
│  │   ● ● ●     │  │   ● ● ●     │  │   ● ● ●     │ │
│  │             │  │             │  │             │ │
│  │      ●      │  │      ○      │  │      ○      │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│    (selected)                                        │
└─────────────────────────────────────────────────────┘
```

**Key Elements:**
- **3 cards in row** - desktop, stack on mobile
- **Color dots** (3 per theme) - visual preview
- **Radio button bottom** - clear selection indicator
- **Bold border when selected** - 2px purple border
- **Card hover** - subtle shadow
- **Click anywhere** - entire card is clickable

### Pattern 4: Slide Thumbnails Panel (Decktopus Style)
**What Decktopus Does:**
- Vertical list on left side
- Small preview of each slide
- Selected slide has accent color border
- Click to switch, drag to reorder
- Scroll for many slides

**Our MVP Adaptation:**
```
┌──────────┬───────────────────────────────────────┐
│          │                                         │
│  SLIDES  │  SLIDE 3 OF 10                         │
│          │                                         │
│ ┌──────┐ │  Title:                                │
│ │Slide1│ │  [Our Solution                  ]      │
│ │Title │ │                                         │
│ └──────┘ │  Content:                              │
│          │  ┌─────────────────────────────────┐   │
│ ┌──────┐ │  │ EventOS automates ticketing,   │   │
│ │Slide2│ │  │ scheduling, and engagement.    │   │
│ │Probl.│ │  │ Our AI saves organizers 10+    │   │
│ └──────┘ │  │ hours per event.               │   │
│          │  └─────────────────────────────────┘   │
│ ┌──────┐ │                                         │
│ │▶Slide3│◄─ Selected (purple border)              │
│ │Solut.│ │                                         │
│ └──────┘ │                                         │
│          │  [◀ Previous]  3/10  [Next ▶]          │
│          │                                         │
└──────────┴───────────────────────────────────────┘
```

**Key Elements:**
- **Fixed left panel** (200px width)
- **Thumbnail cards** - slide number + truncated title
- **Purple border** on selected slide
- **Click to select** - instant switch
- **Drag to reorder** - smooth animation
- **Scroll if needed** - for 10+ slides

### Pattern 5: Full-Screen Viewer (Presentation Mode)
**What Decktopus Does:**
- Clean full-screen layout
- Large readable text
- Auto-hide controls
- Keyboard navigation
- Exit button visible

**Our MVP Adaptation:**
```
┌───────────────────────────────────────────────────┐
│                                                     │
│                                                     │
│              Our Solution                           │
│                                                     │
│       EventOS is an AI-powered event management    │
│       platform that automates ticketing,           │
│       scheduling, and attendee engagement.         │
│       Our AI assistant helps organizers save       │
│       10+ hours per event.                         │
│                                                     │
│                                                     │
│                                                     │
│       [◀ Prev]      3 / 10      [Next ▶]  [✕]      │
│                                                     │
└───────────────────────────────────────────────────┘
```

**Key Elements:**
- **Full viewport** - 100vh height
- **Centered content** - max-width 900px
- **Large fonts** - h1 title, readable paragraph
- **Theme colors** - background and text match theme
- **Bottom controls** - auto-hide after 3 sec
- **Exit button** - top right, always visible

---

## 📋 STARTUP PITCH DECK STRUCTURE

### Standard 10-Slide Startup Pitch Deck
Based on Y Combinator, 500 Startups, and top VCs

**Slide 1: Title / Intro**
- Company name + tagline
- Founder name(s)
- Logo (optional for MVP)
- Contact info

**Slide 2: Problem**
- What pain point are you solving?
- Who has this problem? (target customer)
- How big is the problem? (market validation)

**Slide 3: Solution**
- What is your product/service?
- How does it solve the problem?
- Key features/benefits (3-5 points)

**Slide 4: How It Works (Demo)**
- Product screenshots (text description for MVP)
- User flow (step 1, 2, 3)
- Key differentiators

**Slide 5: Market Opportunity**
- TAM (Total Addressable Market)
- SAM (Serviceable Available Market)
- SOM (Serviceable Obtainable Market)
- Market trends (growing/shrinking?)

**Slide 6: Business Model**
- How do you make money?
- Pricing strategy
- Unit economics (CAC, LTV)
- Revenue projections (Year 1-3)

**Slide 7: Traction & Milestones**
- Key metrics (users, revenue, growth rate)
- Customer testimonials
- Press coverage
- Partnerships

**Slide 8: The Team**
- Founder backgrounds
- Key team members
- Advisors/investors
- Why this team can win

**Slide 9: Financials & Ask**
- Current funding status
- Amount raising
- Use of funds (breakdown)
- Projected runway

**Slide 10: Vision / Call to Action**
- Long-term vision
- Next milestones
- Contact information
- Thank you + Q&A

### AI Prompt Template for Startup Pitch
When user types a topic, AI should generate outline with this structure:

```
Topic: {user input}
Style: Professional (investor-focused)
Tone: Confident but not arrogant
Length: 10 slides
Format: Startup investor pitch deck

Required slides:
1. Title slide with company name and tagline
2. Problem statement with market validation
3. Solution with key features
4. Product demo/how it works
5. Market opportunity with TAM/SAM/SOM
6. Business model with revenue streams
7. Traction with key metrics
8. Team with founder backgrounds
9. Financials and investment ask
10. Vision and next steps

Content guidelines:
- Each slide: 2-4 bullet points or 2-3 sentences
- Focus on data and metrics where possible
- Highlight unique value proposition
- Show clear path to profitability
- Emphasize team's ability to execute
```

---

## 🛠️ 3-PAGE MVP IMPLEMENTATION

### Page 1: Input (Already Built ✅)
**Status:** Exists at `/pitch-deck`

**Enhancements Needed (Decktopus-inspired):**

**Current:**
```
Topic: [input box]
Slides: [dropdown]
Style: [radio]
Language: [dropdown]
[Generate] button
```

**Decktopus MVP:**
```
┌────────────────────────────────────────────────┐
│  What's your startup pitch about?              │
│                                                 │
│  ┌──────────────────────────────────────────┐ │
│  │ Tell us about your startup...            │ │
│  │                                           │ │
│  │ (e.g., "AI-powered event management      │ │
│  │  platform helping organizers automate    │ │
│  │  ticketing and attendee engagement")     │ │
│  └──────────────────────────────────────────┘ │
│                                                 │
│  ⚡ Quick starts:                              │
│  [SaaS Platform] [Marketplace] [AI/ML Tool]   │
│  [Fintech] [E-commerce] [Developer Tools]     │
│                                                 │
│  Number of slides: ● 10 slides ○ 12 slides    │
│  Presentation style: ● Professional ○ Casual   │
│                                                 │
│  ┌──────────────────────────────────────────┐ │
│  │     Generate Pitch Deck  →               │ │
│  └──────────────────────────────────────────┘ │
│                                                 │
└────────────────────────────────────────────────┘
```

**Changes:**
1. **Larger textarea** - 4 lines instead of 1 line input
2. **Placeholder text** - example startup description
3. **Quick start buttons** - 6 common startup types
4. **Inline radio buttons** - no separate sections
5. **Single CTA** - one large purple button
6. **Remove language selector** - English only for MVP

**Quick Start Button Behavior:**
- Click "SaaS Platform" → auto-fills: "B2B SaaS platform that helps companies [solve problem]"
- Click "Marketplace" → auto-fills: "Two-sided marketplace connecting [buyers] and [sellers]"
- Click "AI/ML Tool" → auto-fills: "AI-powered tool that automates [process] using machine learning"
- Click "Fintech" → auto-fills: "Financial technology platform for [target market]"
- Click "E-commerce" → auto-fills: "E-commerce platform selling [products] to [customers]"
- Click "Developer Tools" → auto-fills: "Developer tool that helps engineers [solve problem]"

---

### Page 2: Outline Editor `/presentations/:id/outline` ❌ BUILD THIS
**Status:** Does not exist - CRITICAL TO BUILD

**Full Decktopus-Style Layout:**

```
┌──────────────────────────────────────────────────────────┐
│ ← Back              Review Your Outline          💾 Saved  │
├──────────────────────────────────────────────────────────┤
│ Edit slide titles, reorder, or remove slides            │
├──────────────────────────────────────────────────────────┤
│                                                            │
│ OUTLINE (10 slides)                                       │
│                                                            │
│  ⠿  1.  EventOS - Investor Pitch            ✏️  🗑️       │
│      Change this title slide text                         │
│                                                            │
│  ⠿  2.  The Problem We Solve                ✏️  🗑️       │
│      Event organizers lose 10+ hours...                   │
│                                                            │
│  ⠿  3.  Our Solution: EventOS               ✏️  🗑️       │
│      AI-powered automation platform                       │
│                                                            │
│  ⠿  4.  How EventOS Works                   ✏️  🗑️       │
│      3-step process: Connect, Automate, Grow              │
│                                                            │
│  ⠿  5.  Market Opportunity                  ✏️  🗑️       │
│      $50B TAM, 30% YoY growth                            │
│                                                            │
│  ⠿  6.  Business Model & Pricing            ✏️  🗑️       │
│      Tiered SaaS: Starter ($99), Pro ($299), Enterprise  │
│                                                            │
│  ⠿  7.  Traction & Key Metrics              ✏️  🗑️       │
│      2,000 organizers, $500K ARR, 3x MoM growth          │
│                                                            │
│  ⠿  8.  Meet the Team                       ✏️  🗑️       │
│      Founders: AI researcher + event industry expert      │
│                                                            │
│  ⠿  9.  Financials & Investment Ask         ✏️  🗑️       │
│      Raising $2M seed round                               │
│                                                            │
│  ⠿ 10.  Vision & Next Steps                 ✏️  🗑️       │
│      Become the #1 AI event management platform           │
│                                                            │
│  [+ Add Slide]                                            │
│                                                            │
│  ────────────────────────────────────────────────────    │
│  10 slides · ~5 min presentation                          │
│                                                            │
├──────────────────────────────────────────────────────────┤
│ CHOOSE A THEME                                            │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Purple     │  │     Blue     │  │     Dark     │   │
│  │              │  │              │  │              │   │
│  │   ● ● ●      │  │   ● ● ●      │  │   ● ● ●      │   │
│  │  (#8B5CF6)   │  │  (#3B82F6)   │  │  (#1F2937)   │   │
│  │              │  │              │  │              │   │
│  │      ●       │  │      ○       │  │      ○       │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│    Professional      Trustworthy       Executive         │
│                                                            │
├──────────────────────────────────────────────────────────┤
│ [← Edit Info]                [Generate Presentation →]    │
└──────────────────────────────────────────────────────────┘
```

**Key Features:**

1. **Enhanced Slide Rows:**
   - Title (large, editable inline)
   - Subtitle/preview (smaller, gray text) - shows first line of content
   - Drag handle (⠿) for reordering
   - Edit button (✏️) - focuses title input
   - Delete button (🗑️) - confirms before removing

2. **Improved Theme Cards:**
   - Theme name (heading)
   - 3 color dots with hex codes
   - Description under card ("Professional", "Trustworthy", "Executive")
   - Radio button at bottom
   - Bold purple border when selected
   - Hover shadow effect

3. **Auto-Save Indicator:**
   - Top right corner
   - "💾 Saving..." (gray, during save)
   - "💾 Saved now" (green, 2 sec after save)
   - "⚠️ Failed to save" (red, on error)

4. **Bottom Actions:**
   - [← Edit Info] - returns to input page
   - [Generate Presentation →] - purple button, generates full deck

**Implementation Notes:**

```typescript
// Slide row structure
interface OutlineSlide {
  id: string
  title: string
  subtitle: string // First line of generated content
  order: number
}

// Theme options
const themes = [
  {
    id: 'purple',
    name: 'Purple',
    colors: ['#8B5CF6', '#A78BFA', '#DDD6FE'],
    description: 'Professional',
    isPrimary: true
  },
  {
    id: 'blue',
    name: 'Blue',
    colors: ['#3B82F6', '#60A5FA', '#DBEAFE'],
    description: 'Trustworthy',
    isPrimary: false
  },
  {
    id: 'dark',
    name: 'Dark',
    colors: ['#1F2937', '#374151', '#6B7280'],
    description: 'Executive',
    isPrimary: false
  }
]

// Auto-save hook
function useAutoSave(data, saveFunction) {
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      saveFunction(data)
    }, 2000) // 2 second debounce

    return () => clearTimeout(timeoutRef.current)
  }, [data])
}
```

---

### Page 3: Slide Editor `/presentations/:id/edit` ❌ BUILD THIS
**Status:** Does not exist - BUILD SECOND

**Decktopus-Style Split Layout:**

```
┌──────────────────────────────────────────────────────────┐
│ [Logo] EventOS Investor Pitch      💾 Saved  [Preview] [✕]│
├──────────┬───────────────────────────────────────────────┤
│          │                                                 │
│ SLIDES   │  SLIDE 3 OF 10                                 │
│          │                                                 │
│ ┌──────┐ │  Title:                                        │
│ │  1   │ │  ┌─────────────────────────────────────────┐  │
│ │Title │ │  │ Our Solution: EventOS                   │  │
│ └──────┘ │  └─────────────────────────────────────────┘  │
│          │                                                 │
│ ┌──────┐ │  Content:                                      │
│ │  2   │ │  ┌─────────────────────────────────────────┐  │
│ │Probl.│ │  │ EventOS is an AI-powered event          │  │
│ └──────┘ │  │ management platform that automates      │  │
│          │  │ ticketing, scheduling, and attendee     │  │
│ ┌──────┐ │  │ engagement.                             │  │
│ │▶ 3   │◄┼─ Selected                                    │  │
│ │Solut.│ │  │ • Smart ticketing with AI               │  │
│ └──────┘ │  │ • Automated scheduling                  │  │
│          │  │ • Real-time engagement tracking         │  │
│ ┌──────┐ │  │                                          │  │
│ │  4   │ │  │ Our AI assistant saves organizers       │  │
│ │Works │ │  │ 10+ hours per event.                    │  │
│ └──────┘ │  └─────────────────────────────────────────┘  │
│          │                                                 │
│ ┌──────┐ │  Layout: Content (standard slide)             │
│ │  5   │ │                                                 │
│ │Market│ │                                                 │
│ └──────┘ │  [◀ Previous Slide]  3 / 10  [Next Slide ▶]   │
│          │                                                 │
│   ...    │                                                 │
│          │                                                 │
└──────────┴───────────────────────────────────────────────┘
```

**Key Features:**

1. **Top Bar (Decktopus-style):**
   - Logo (optional) + Presentation title (editable)
   - Save status (💾 Saved, Saving..., Failed)
   - [Preview] button (gray outline) - opens viewer
   - [✕] Exit button (returns to dashboard)

2. **Left Panel - Thumbnails:**
   - Fixed 200px width
   - Vertical scroll
   - Card per slide:
     * Slide number (large)
     * Truncated title (max 20 chars)
     * Selected = purple border (2px)
     * Hover = subtle shadow
     * Click to switch slide
     * Drag handle (⠿) for reordering

3. **Right Panel - Editor:**
   - Slide counter: "SLIDE 3 OF 10"
   - Title input (large font, editable)
   - Content textarea (8 rows, editable)
   - Layout display (read-only for MVP)
   - Navigation buttons (prev/next)
   - Slide counter in center (3 / 10)

4. **Auto-Save:**
   - Debounced 2 seconds after last edit
   - Updates title or content in database
   - Shows visual feedback in top bar

**Simplified Implementation:**

```typescript
// Slide structure
interface Slide {
  id: string
  title: string
  content: string
  layout: 'title' | 'content' // MVP: only 2 layouts
  order: number
}

// Editor state
const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
const [slides, setSlides] = useState<Slide[]>([])
const [isSaving, setIsSaving] = useState(false)

// Switch slide
const handleSlideSelect = (index: number) => {
  setCurrentSlideIndex(index)
}

// Edit slide
const handleTitleEdit = (newTitle: string) => {
  const updatedSlides = [...slides]
  updatedSlides[currentSlideIndex].title = newTitle
  setSlides(updatedSlides)
  // Auto-save triggered by useAutoSave hook
}

// Navigation
const nextSlide = () => {
  if (currentSlideIndex < slides.length - 1) {
    setCurrentSlideIndex(currentSlideIndex + 1)
  }
}

const prevSlide = () => {
  if (currentSlideIndex > 0) {
    setCurrentSlideIndex(currentSlideIndex - 1)
  }
}
```

---

### Page 4: Presentation Viewer `/presentations/:id/view` ❌ BUILD THIS
**Status:** Does not exist - BUILD THIRD

**Full-Screen Decktopus-Style Viewer:**

```
┌───────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│                                                         │
│                                                         │
│                Our Solution: EventOS                    │
│                                                         │
│                                                         │
│      EventOS is an AI-powered event management         │
│      platform that automates ticketing, scheduling,    │
│      and attendee engagement.                          │
│                                                         │
│      • Smart ticketing with AI recommendations         │
│      • Automated scheduling optimization               │
│      • Real-time engagement tracking                   │
│                                                         │
│      Our AI assistant saves organizers 10+ hours       │
│      per event.                                        │
│                                                         │
│                                                         │
│                                                         │
│      [◀ Prev]        3 / 10        [Next ▶]    [✕]     │
│                                                         │
└───────────────────────────────────────────────────────┘
```

**Key Features:**

1. **Full-Screen Layout:**
   - 100vh height, 100vw width
   - Theme-based background color
   - Content centered (max-width 900px)
   - Large readable fonts

2. **Content Display:**
   - Title: h1, bold, theme color
   - Content: p, readable size
   - Bullet points: • icon, indented
   - Line height: 1.6 (readable)

3. **Auto-Hide Controls:**
   - Show on page load
   - Hide after 3 seconds of no movement
   - Show on mouse move
   - Always show during hover

4. **Keyboard Navigation:**
   - `→` Right arrow: Next slide
   - `←` Left arrow: Previous slide
   - `Space`: Next slide
   - `Escape`: Exit viewer

5. **Theme Styling:**
   - Purple theme: Purple bg (#F3E8FF), purple text (#8B5CF6)
   - Blue theme: Blue bg (#EFF6FF), blue text (#3B82F6)
   - Dark theme: Dark bg (#1F2937), white text (#FFFFFF)

**Simple Implementation:**

```typescript
// Viewer state
const [currentSlide, setCurrentSlide] = useState(0)
const [controlsVisible, setControlsVisible] = useState(true)
const [presentation, setPresentation] = useState(null)

// Auto-hide controls
useEffect(() => {
  const hideTimeout = setTimeout(() => {
    setControlsVisible(false)
  }, 3000)

  const handleMouseMove = () => {
    setControlsVisible(true)
    clearTimeout(hideTimeout)
  }

  window.addEventListener('mousemove', handleMouseMove)

  return () => {
    clearTimeout(hideTimeout)
    window.removeEventListener('mousemove', handleMouseMove)
  }
}, [controlsVisible])

// Keyboard navigation
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      nextSlide()
    } else if (e.key === 'ArrowLeft') {
      prevSlide()
    } else if (e.key === 'Escape') {
      exitViewer()
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [currentSlide])

// Theme styling
const getThemeStyles = (theme: string) => {
  const themes = {
    purple: {
      bg: '#F3E8FF',
      text: '#8B5CF6',
      content: '#1F2937'
    },
    blue: {
      bg: '#EFF6FF',
      text: '#3B82F6',
      content: '#1F2937'
    },
    dark: {
      bg: '#1F2937',
      text: '#FFFFFF',
      content: '#E5E7EB'
    }
  }
  return themes[theme] || themes.purple
}
```

---

## ✅ IMPLEMENTATION CHECKLIST

### 🎯 Phase 1: Enhance Input Page (Day 1)
- [ ] Replace small input with large textarea (4 lines)
- [ ] Add helpful placeholder text with example
- [ ] Create 6 "quick start" buttons (SaaS, Marketplace, AI/ML, Fintech, E-commerce, Dev Tools)
- [ ] Implement quick start button behavior (auto-fills textarea)
- [ ] Simplify form: Remove language selector (English only MVP)
- [ ] Style with Decktopus clean aesthetic
- [ ] Test on mobile (textarea resizes properly)

### 🎯 Phase 2: Build Outline Editor (Days 2-3)
**Page Structure:**
- [ ] Create `/presentations/:id/outline` route
- [ ] Add top bar (back link, title, save indicator)
- [ ] Add subtitle text

**Outline List:**
- [ ] Build draggable slide row component
- [ ] Add drag handle (⠿) with @dnd-kit
- [ ] Add slide number (1., 2., 3...)
- [ ] Add title input (inline editable)
- [ ] Add subtitle text (first line preview, gray)
- [ ] Add edit button (✏️) - focuses input
- [ ] Add delete button (🗑️) - confirms first
- [ ] Add "Add Slide" button at bottom
- [ ] Show slide count: "10 slides · ~5 min"

**Theme Selector:**
- [ ] Create 3 theme cards (purple, blue, dark)
- [ ] Add theme name heading
- [ ] Add 3 color dots per theme
- [ ] Add description under card
- [ ] Add radio button at bottom
- [ ] Style selected state (purple border)
- [ ] Make entire card clickable

**Functionality:**
- [ ] Fetch presentation from Supabase
- [ ] Implement drag & drop reordering
- [ ] Implement inline editing with debounce
- [ ] Implement delete with confirmation
- [ ] Implement add slide
- [ ] Implement theme selection
- [ ] Implement auto-save (2 sec debounce)
- [ ] Show save indicator (Saving.../Saved/Failed)
- [ ] Connect "Generate Presentation" button

**Test:**
- [ ] Load with real presentation data
- [ ] Edit slide titles, verify auto-save
- [ ] Reorder slides, verify saves
- [ ] Delete slide, verify confirmation
- [ ] Add slide, verify it appears
- [ ] Select theme, verify saves
- [ ] Mobile responsive (cards stack)

### 🎯 Phase 3: Build Slide Editor (Days 4-5)
**Page Structure:**
- [ ] Create `/presentations/:id/edit` route
- [ ] Add top bar (logo, title, save status, preview, exit)
- [ ] Create split layout (left panel + right panel)

**Left Panel (Thumbnails):**
- [ ] Fixed 200px width
- [ ] Build thumbnail card component
- [ ] Show slide number (large)
- [ ] Show truncated title (20 chars max)
- [ ] Style selected slide (purple border)
- [ ] Add click handler (switch slide)
- [ ] Add drag handles for reordering
- [ ] Add scroll for 10+ slides

**Right Panel (Editor):**
- [ ] Show slide counter (SLIDE 3 OF 10)
- [ ] Add title input (large, editable)
- [ ] Add content textarea (8 rows, editable)
- [ ] Show layout display (read-only)
- [ ] Add prev/next buttons
- [ ] Show slide counter (3 / 10)

**Functionality:**
- [ ] Fetch presentation content from Supabase
- [ ] Track current slide index
- [ ] Implement slide switching
- [ ] Implement title editing with debounce
- [ ] Implement content editing with debounce
- [ ] Implement auto-save (2 sec)
- [ ] Implement slide reordering (drag thumbnails)
- [ ] Connect preview button (opens viewer)
- [ ] Connect exit button (returns to dashboard)

**Test:**
- [ ] Load with full presentation data
- [ ] Click thumbnails to switch slides
- [ ] Edit title and content, verify auto-save
- [ ] Use prev/next buttons
- [ ] Drag thumbnails to reorder
- [ ] Click preview (opens viewer)
- [ ] Mobile responsive (stack layout)

### 🎯 Phase 4: Build Viewer (Day 6)
**Page Structure:**
- [ ] Create `/presentations/:id/view` route
- [ ] Set full-screen layout (100vh, 100vw)
- [ ] Center content (max-width 900px)

**Content Display:**
- [ ] Show slide title (h1, large, bold)
- [ ] Show slide content (p, readable)
- [ ] Style bullet points (• icon)
- [ ] Apply theme colors (bg, text)

**Controls:**
- [ ] Add bottom control bar
- [ ] Add prev button (left)
- [ ] Add slide counter (center)
- [ ] Add next button (right)
- [ ] Add exit button (far right)

**Functionality:**
- [ ] Fetch presentation and theme from Supabase
- [ ] Implement slide navigation (prev/next)
- [ ] Implement keyboard navigation (arrows, space, escape)
- [ ] Implement auto-hide controls (3 sec timeout)
- [ ] Show controls on mouse move
- [ ] Apply theme styling dynamically
- [ ] Connect exit button (returns to editor)

**Test:**
- [ ] Load presentation
- [ ] Navigate with buttons
- [ ] Navigate with keyboard
- [ ] Verify auto-hide works
- [ ] Test with all 3 themes
- [ ] Mobile responsive (readable fonts)

### 🎯 Phase 5: Polish & Test (Day 7)
**End-to-End Testing:**
- [ ] Complete user journey: Dashboard → Input → Outline → Editor → Viewer → Dashboard
- [ ] Test with different startup types (quick starts)
- [ ] Test with different themes (purple, blue, dark)
- [ ] Test all editing features (title, content, reorder, delete, add)
- [ ] Verify auto-save works everywhere
- [ ] Check all navigation (links, buttons, keyboard)

**Bug Fixes:**
- [ ] Fix any console errors
- [ ] Fix React warnings
- [ ] Fix broken links
- [ ] Fix layout issues
- [ ] Fix mobile responsive issues

**Polish:**
- [ ] Smooth animations (drag & drop, transitions)
- [ ] Loading states (spinners)
- [ ] Error messages (toasts)
- [ ] Empty states (no slides)
- [ ] Confirmation dialogs (delete)

**Performance:**
- [ ] Check load times
- [ ] Optimize Supabase queries
- [ ] Add loading indicators
- [ ] Test with slow network

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast meets standards
- [ ] Screen reader friendly (optional)

### 🎯 Phase 6: Deploy (Day 8)
- [ ] Final code review
- [ ] All tests passing
- [ ] No console errors
- [ ] Mobile responsive verified
- [ ] Push to repository
- [ ] Deploy via Lovable
- [ ] Test on production
- [ ] Monitor for errors
- [ ] Gather user feedback

---

## 🎉 SUCCESS!

**When complete, users can:**
1. ✅ Enter startup description (or use quick start)
2. ✅ Review AI-generated 10-slide outline
3. ✅ Edit slide titles with drag & drop
4. ✅ Select theme (purple/blue/dark)
5. ✅ Generate full presentation content
6. ✅ Edit slide content (title + text)
7. ✅ View full-screen presentation
8. ✅ Navigate with keyboard
9. ✅ Everything auto-saves
10. ✅ Create pitch deck in under 5 minutes

**Decktopus UI/UX Patterns Adopted:**
- ✅ Clean, minimal input screen with large textarea
- ✅ Quick start buttons for common use cases
- ✅ Inline editing with drag handles (⠿)
- ✅ Theme selector with color preview dots
- ✅ Slide thumbnails panel (Decktopus-style)
- ✅ Full-screen viewer with auto-hide controls
- ✅ Auto-save with visual feedback
- ✅ Mobile responsive design

**Next Steps (Post-MVP):**
- Add document upload (parse business plans)
- Add more themes (10+ options)
- Add more layouts (bullets, charts, tables)
- Add image generation (AI images)
- Add export (PDF/PPTX)
- Add collaboration (comments, real-time)
- Add analytics (view tracking)

---

**Document Created:** October 15, 2025
**Focus:** MVP only - Startup pitch decks with Decktopus UI/UX
**Timeline:** 8 days for complete MVP
**Success:** Founders create professional pitch decks in under 5 minutes

**Let's build this! 🚀**
