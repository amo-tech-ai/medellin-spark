# <� MY PRESENTATIONS DASHBOARD - LOVABLE DESIGN PROMPT

**Project:** Medellin Spark - Presentation AI
**Page Name:** My Presentations Dashboard
**Route:** `/presentations`
**Priority:** P0 - MVP Launch (Week 1-2)
**Date:** October 14, 2025

---

## >� 1. OVERVIEW

### Brief Summary
The My Presentations Dashboard is the **central hub** for all user presentation management. It's the first page users see after login, combining creation tools, presentation library, and template discovery in one unified interface.

### Purpose & Audience
**Purpose**: Enable users to quickly create new pitch decks (via AI, templates, or blank canvas) and manage existing presentations in a visual grid layout.

**Primary Audience**:
- **Solo Founders** (Alex): Creating first investor pitch deck, needs fast professional results
- **Startup Teams** (Sarah): Collaborative presentation management for demo days
- **Corporate Professionals** (David): Managing multiple board/investor decks, needs organization

**Core User Goals**:
1. **PRIMARY**: Create new presentation in <5 minutes (80% via AI generation)
2. Find and edit existing presentations quickly
3. Discover professional templates for inspiration
4. Export and share presentations externally

### Key Design Principles
1. **Clarity First**: No cognitive overload - clear visual hierarchy, obvious CTAs
2. **AI-Forward**: Primary CTA is AI generation (Warm Amber accent), 60% conversion target
3. **Trust Through Design**: Professional aesthetics inspire confidence in output quality
4. **Speed**: <2s page load, <3 clicks to start creating
5. **Consistency**: Matches Soft Intelligence design system across all pages

---

## 🧩 2. UI/UX LAYOUT

### Recommended Layout Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ GLOBAL HEADER (All Pages)                                          │
│ [Logo] Medellin AI    [Dashboard] [Templates] [Profile ▼]         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ PAGE HEADER (Personalized Greeting)                                │
│ ┌─────────────────────────────────────────────────────────────┐   │
│ │ Good morning, Sarah! 👋                                      │   │
│ │ You have 3 presentations. Last edited 2 hours ago.          │   │
│ └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│ CREATE NEW SECTION (4 Creation Cards)                              │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐     │
│ │ 🤖 AI      │ │ 📋 Templat │ │ ⬜ Blank   │ │ 📊 Budget  │     │
│ │ Generate   │ │ Library    │ │ Canvas     │ │ Tool       │     │
│ │ [Beta]     │ │ 50+ ready  │ │ Your way   │ │ Financials │     │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘     │
│                                                                     │
│ MY PRESENTATIONS (3)              [Sort: Recent ▼] [Filter ▼]     │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐                     │
│ │┌──────────┐│ │┌──────────┐│ │┌──────────┐│                     │
│ ││  Cover   ││ ││  Cover   ││ ││  Cover   ││                     │
│ │└──────────┘│ │└──────────┘│ │└──────────┘│                     │
│ │ Q1 Pitch   │ │ Seed Deck  │ │ Product    │                     │
│ │ 12 slides  │ │ 10 slides  │ │ 8 slides   │                     │
│ │ Draft 🟡   │ │ Complete ✅│ │ Draft 🟡   │                     │
│ │ [Edit][•••]│ │ [Edit][•••]│ │ [Edit][•••]│                     │
│ └────────────┘ └────────────┘ └────────────┘                     │
│                                                                     │
│ RECOMMENDED TEMPLATES                          [Browse All →]     │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐     │
│ │ Airbnb     │ │ Uber       │ │ Sequoia    │ │ 500        │     │
│ │ Pitch 🔒   │ │ Pitch      │ │ Template   │ │ Startups 🔒│     │
│ │ 1m uses    │ │ 848k uses  │ │ 1.2m uses  │ │ 960k uses  │     │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
```

### Page Flow (Section by Section)
**Header (Global)**:
- Position: Fixed top, spans full width
- Content: Logo (left), navigation (center), user menu (right)
- Height: 64px, background Pure White, border-bottom 1px Soft Gray

**Page Header (Greeting)**:
- Position: Below global header
- Content: Time-based greeting + user stats
- Layout: Left-aligned, max-width 1440px centered
- Spacing: 32px top/bottom padding

**Create New Section**:
- Position: Top of main content
- Content: 4 large creation option cards
- Layout: Horizontal row (desktop) → 2×2 grid (tablet) → 1 column (mobile)
- Spacing: 24px gap between cards, 48px margin bottom

**My Presentations Grid**:
- Position: Main content area
- Content: Section header + sort/filter + presentation cards grid
- Layout: CSS Grid, 4 columns (desktop) → 3 → 2 → 1 (responsive)
- Spacing: 24px gap, 48px margin bottom

**Recommended Templates**:
- Position: Bottom of page
- Content: Section header + template cards + "Browse All" link
- Layout: CSS Grid, 4 columns (same responsive rules)
- Spacing: 24px gap

---

## 🎨 3. STYLE GUIDE

### Color Palette (Soft Intelligence)

#### Primary Colors
- **Warm Amber** `#F5A623` - Primary CTA (AI Generate card), active states, badges
- **Deep Indigo** `#4A5568` - Headings (H1, H2), primary text, strong contrast
- **Soft Slate** `#718096` - Body text, metadata, secondary information

#### Secondary Colors
- **Muted Teal** `#38B2AC` - Success states (Complete badge), active indicators
- **Gentle Coral** `#FC8181` - Destructive actions (Delete), error states
- **Powder Blue** `#90CDF4` - Links, hover states, interactive elements

#### Neutral Palette
- **Pure White** `#FFFFFF` - Card backgrounds, page background
- **Cloud Gray** `#F7FAFC` - Subtle backgrounds, hover states
- **Soft Gray** `#EDF2F7` - Borders, dividers, skeleton loading
- **Charcoal** `#2D3748` - Dark text, maximum contrast

#### Functional Colors
- **Success Green** `#34C759` - Auto-save indicator, complete status
- **Warning Yellow** `#FFCC00` - Draft status, caution states
- **Error Red** `#FF3B30` - Validation errors, critical alerts

### Typography System

**Font Family**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui

**Type Scale**:
```css
/* H1 - Page Greeting */
font-size: 2rem (32px)
font-weight: 700
line-height: 1.25
color: Deep Indigo (#4A5568)
letter-spacing: -0.02em

/* H2 - Section Headings */
font-size: 1.5rem (24px)
font-weight: 600
line-height: 1.3
color: Deep Indigo (#4A5568)
text-transform: uppercase
letter-spacing: 0.05em

/* H3 - Card Titles */
font-size: 1.125rem (18px)
font-weight: 600
line-height: 1.4
color: Deep Indigo (#4A5568)

/* Body - Primary Text */
font-size: 1rem (16px)
font-weight: 400
line-height: 1.5
color: Charcoal (#2D3748)

/* Body Small - Metadata */
font-size: 0.875rem (14px)
font-weight: 400
line-height: 1.5
color: Soft Slate (#718096)

/* Caption - Timestamps */
font-size: 0.8125rem (13px)
font-weight: 400
line-height: 1.4
color: Soft Slate (#718096)

/* Button Text */
font-size: 1rem (16px)
font-weight: 500
line-height: 1
color: Charcoal (#2D3748) or Pure White (#FFFFFF)
```

### Spacing System (8px Grid)
```
xs: 0.25rem (4px)   - Icon margins, tight spacing
sm: 0.5rem (8px)    - Button padding vertical, small gaps
md: 1rem (16px)     - Card padding, button padding horizontal
lg: 1.5rem (24px)   - Grid gap, section margins
xl: 2rem (32px)     - Page header padding
2xl: 3rem (48px)    - Major section spacing
3xl: 4rem (64px)    - Top/bottom page padding
```

### Component Radius
```
sm: 0.375rem (6px)  - Small badges, pills
md: 0.5rem (8px)    - Buttons, inputs, small cards
lg: 0.75rem (12px)  - Main cards (presentation, creation options)
xl: 1rem (16px)     - Large feature cards, modals
```

### Shadow System (4 Levels)
```css
/* Level 1 - Subtle Elevation (Default Cards) */
shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
           0 1px 2px 0 rgba(0, 0, 0, 0.06)

/* Level 2 - Medium Elevation (Hover Cards) */
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
           0 2px 4px -1px rgba(0, 0, 0, 0.06)

/* Level 3 - High Elevation (Active/Focused) */
shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
           0 4px 6px -2px rgba(0, 0, 0, 0.05)

/* Level 4 - Maximum Elevation (Modals, Dropdowns) */
shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
           0 10px 10px -5px rgba(0, 0, 0, 0.04)

/* Special - AI Generate Card Glow */
ai-glow: 0 10px 25px -5px rgba(245, 166, 35, 0.3),
         0 4px 6px -2px rgba(245, 166, 35, 0.15)
```

### Motion Timing
```css
/* Standard Transition */
transition: all 0.2s ease-in-out

/* Fast Transition (Buttons) */
transition: all 0.15s ease-in-out

/* Slow Transition (Page Loads) */
transition: all 0.3s ease-in-out

/* Specific Properties (Performance) */
transition: transform 0.2s ease-in-out,
            box-shadow 0.2s ease-in-out,
            opacity 0.15s ease-in-out
```

## 📱 4. RESPONSIVE DESIGN BEST PRACTICES

### Breakpoints
```css
mobile: 0px - 639px      /* Single column, stacked layout */
tablet: 640px - 1023px   /* 2-3 columns, hybrid layout */
desktop: 1024px - 1279px /* 3-4 columns, full features */
wide: 1280px+            /* 4 columns, max-width container 1440px */
```

### Desktop Layout (≥1024px)
**Create New Section**: 4 columns horizontal row
- Card dimensions: 260px × 200px each
- Gap: 24px between cards

**My Presentations Grid**: 4 columns
- Columns: repeat(auto-fill, minmax(260px, 1fr))
- Gap: 24px

**Recommended Templates**: 4 columns

### Tablet Layout (640-1023px)
**Create New Section**: 2×2 grid
**My Presentations Grid**: 2-3 columns
**Recommended Templates**: 2-3 columns

### Mobile Layout (<640px)
**Create New Section**: 1 column stack
**My Presentations Grid**: 1 column
**Recommended Templates**: 1 column

---

##🖼️ 5. IMAGE & ICON USAGE

### Icon Library: Lucide React

**Icon Sizes**:
- xs: 12px, sm: 16px, md: 20px, lg: 24px, xl: 48px, 2xl: 80px, 3xl: 120px

**Key Icons**:
- AI Generate: `<Wand2 />`
- Template: `<LayoutTemplate />`
- Edit: `<Edit2 />`
- More: `<MoreVertical />`

### Image Formats
- **Thumbnails**: 280×157.5px (16:9), WebP + JPEG fallback
- **Retina**: 560×315px (2x)
- **Max Size**: 100KB per image

---

## ⚙️ 6. CORE FEATURES

### Must-Have Components

#### 1. PageHeader
- Greeting + user stats
- "Good morning, Sarah! 👋"

#### 2. AIGenerateCard (Primary CTA)
- Warm Amber hover effect
- Opens AI wizard

#### 3. PresentationCard
- 16:9 cover image
- Edit/View/Actions menu

#### 4. MyPresentationsGrid
- Responsive grid (4→3→2→1 columns)
- Sort & filter controls

#### 5. TemplateCard
- Usage stats (1m uses, 42k likes)
- Premium badge

#### 6. EmptyState
- "No presentations yet"
- Generate CTA

---

## 🤖 7. ADVANCED FEATURES

### AI Enhancements
- Smart recommendations
- Auto-tagging
- Usage analytics

### Personalization
- Time-based greetings
- Activity tracking
- Completion prompts

---

## 🧱 8. SUGGESTED SECTIONS & COMPONENTS

### Complete Component List

1. **PageHeader** - Greeting + stats
2. **AIGenerateCard** - Primary CTA (60% conversions)
3. **PresentationCard** - Library item with actions
4. **TemplateCard** - Template discovery
5. **MyPresentationsGrid** - Responsive grid container
6. **EmptyState** - Zero-state encouragement
7. **LoadingSkeleton** - Shimmer loading states
8. **StatusBadge** - Draft/Complete/Shared indicators
9. **ActionMenu** - Three-dot dropdown (Edit/Duplicate/Delete)
10. **SortDropdown** - Recent/Name/Created sort options
11. **FilterDropdown** - All/Drafts/Complete/Shared filters

---

## 📐 9. WIREFRAME SKETCH

### Desktop (1440px)
```
[Header: Logo | Dashboard | Templates | Profile]
─────────────────────────────────────────────────
Good morning, Sarah! 👋
3 presentations. Last edited 2h ago.

[🤖 AI]  [📋 Template]  [⬜ Blank]  [📊 Budget]

MY PRESENTATIONS (3)        [Sort ▼] [Filter ▼]
[Card] [Card] [Card] [Card]
[Card] [Card] [Card] [Card]

RECOMMENDED TEMPLATES       [Browse All →]
[Template] [Template] [Template] [Template]
```

### Mobile (375px)
```
☰ [Logo] Profile
──────────────────
Good morning, Sarah!
3 presentations

[🤖 AI Generate]
[📋 Templates]

MY PRESENTATIONS
[Sort] [Filter]

[Presentation Card]
[Presentation Card]

TEMPLATES
[Template Card]
```

---

## 📈 10. ACCESSIBILITY & PERFORMANCE

### WCAG 2.1 AA Compliance
- ✅ Contrast ratios meet AA standards
- ✅ Keyboard navigation supported
- ✅ Screen reader compatible
- ✅ Focus indicators visible
- ✅ Alternative text provided

### Performance Targets
- **FCP**: < 1.5s
- **LCP**: < 2.0s
- **TTI**: < 2.5s
- **CLS**: < 0.1
- **Bundle**: < 200KB (gzipped)

### Optimization
- Lazy load modals
- Image lazy loading + WebP
- Code splitting per route
- Memo expensive computations
- Debounce search (300ms)

---

## 💡 11. DESIGN PRINCIPLES SUMMARY

1. **Clarity First**: Obvious CTAs, clear hierarchy
2. **Consistency**: Same patterns everywhere
3. **Human + Data**: Warm + professional
4. **Subtle Motion**: Feedback, not distraction
5. **Speed**: <5min to create, <2s to load

---

## ✅ 12. DELIVERABLES FOR LOVABLE

### Components to Design (29 total)
- Global: AppHeader, Breadcrumbs
- Dashboard: PageHeader, AIGenerateCard, PresentationCard, TemplateCard
- Grids: MyPresentationsGrid, RecommendedTemplatesSection
- States: EmptyState, LoadingSkeleton
- UI: Buttons, Dropdowns, Modals, Badges, Icons

### Style Guide (CSS Variables)
```css
--color-primary: #F5A623
--color-text: #4A5568
--space-lg: 1.5rem
--radius-lg: 0.75rem
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)
--transition-base: 0.2s ease-in-out
```

### Wireframes
- [x] Desktop (1440px)
- [x] Mobile (375px)
- [x] Tablet (768px)

### Data Integration (Supabase)
```typescript
// Presentations query
supabase.from('presentations')
  .select('*')
  .eq('profile_id', userId)

// Templates query
supabase.from('presentation_templates')
  .select('*')
  .order('usage_count', { ascending: false })
  .limit(8)
```

---

**Status**: ✅ Complete
**Components**: 29 specified
**Timeline**: 2 weeks design + 3 weeks dev
**Ready**: Lovable team 🚀

**This is the entry point for 100% of users - the most important page in the app!**
