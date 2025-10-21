# 01 - Project Overview: Pitch Deck AI Generator

**Created:** 2025-01-15  
**Status:** Planning Phase  
**Version:** 1.0

---

## 🎯 Project Goal

Build an AI-powered pitch deck generator that integrates seamlessly with the existing Medellin AI Hub platform, allowing founders to create professional investor presentations through a conversational AI interface and structured wizard.

---

## 📊 Current State Analysis

### Existing Pages & Routes

**Public Pages:**
- `/` - Home page with hero, features, community stats
- `/about` - About Medellin AI
- `/events` - Events directory
- `/perks` - Perks marketplace
- `/programs` - Programs listing
- `/founders` - Founders directory (recently created)
- `/startups` - Startups directory
- `/startup-profile` - Individual startup profile
- `/jobs` - Jobs board
- `/contact` - Contact form
- `/pitch-deck` - **Basic pitch deck input form (exists, needs enhancement)**
- `/pitch-deck-wizard` - **Conversational AI wizard (exists)**
- `/profile/:id?` - **Public member profile (recently created)**

**Dashboard Pages (Authenticated):**
- `/dashboard` - Main dashboard with quick actions
- `/dashboard/events` - Events management
- `/dashboard/pitch-decks` - **Pitch deck dashboard (recently created)**
- `/dashboard/settings` - User settings

### Design System Audit

**Color Palette (from index.css & tailwind.config.ts):**

**Platform Colors (Main Site):**
- Primary: `#9ABAC6` (Soft Steel Blue) - Main brand color for navbar, platform features
- Primary Hover: `#85AAB8` (Cool Ocean Blue)
- Primary Dark: `#7A9AA8` (Deep Slate Blue)
- CTA Accent: `#F5A623` (Warm Amber) - Use for general platform CTAs (events, perks, etc.)

**Presentation Feature Colors (Pitch Deck Tools):**
- Primary: `#8B5CF6` (Purple 600) - ALL presentation buttons, links, accents
- Hover: `#7C3AED` (Purple 700)
- Light: `#A78BFA` (Purple 400) - For backgrounds and highlights
- **Note:** Purple is used to visually differentiate pitch deck features from main platform

**Neutral Colors:**
- Background: `#FFFFFF` (Pure White)
- Background Alt: `#F5F8F9` (Frost Gray)
- Surface: `#FAFBFC` (Cloud White)
- Text Primary: `#1F1F1F` (Charcoal Black)
- Text Muted: `#6A737D` (Ash Gray)
- Divider: `#E1E8EB` (Silver Mist)

**System Colors:**
- Success: `hsl(145, 40%, 60%)`
- Warning: `hsl(35, 80%, 65%)`
- Error: `hsl(0, 70%, 60%)`

**Typography:**
- Font Family: Inter
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- H1: 36-48px / bold
- H2: 24px / semibold
- H3: 18px / medium
- Body: 16px / regular
- Caption: 14px / muted

**Component Library (Reusable):**
✅ **Available:**
- `Button` - Multiple variants (default, outline, ghost, cta)
- `Card` - With header, content, footer, description
- `Input` - Text input with focus states
- `Textarea` - Multi-line text input
- `Select` - Dropdown selector
- `Badge` - Status indicators
- `Dropdown Menu` - Action menus
- `Dialog` - Modals
- `Toast` - Notifications (Sonner)
- `Progress` - Progress bars
- `Tabs` - Tab navigation
- `Avatar` - User avatars
- `Separator` - Dividers
- `Search Bar` - Custom search component (recently created)
- `Empty State` - Empty data states (recently created)
- `Stats Card` - Metric display (recently created)
- `Profile Card` - User profile cards (recently created)

**Layout Patterns:**
- Dashboard uses `DashboardLayout` with `DashboardSidebar` + `DashboardHeader`
- Public pages use Navbar + Footer wrapper
- Grid layouts: 1 col mobile, 2-3 cols tablet, 4 cols desktop
- Cards use hover lift effect (translateY + shadow)
- Forms use single-column layout with labels above inputs

---

## 🗄️ Database Structure

### Presentations Table (Existing in Supabase)

**Columns:**
```
id                  uuid            PRIMARY KEY DEFAULT gen_random_uuid()
profile_id          uuid            NOT NULL (FK to profiles)
title               text            NOT NULL
content             jsonb           NOT NULL DEFAULT '{}'
theme               text            DEFAULT 'mystique'
image_source        text            DEFAULT 'ai'
prompt              text            NULL (original user input)
presentation_style  text            NULL (professional/casual/technical)
language            text            DEFAULT 'en-US'
outline             text[]          NULL (array of slide titles)
search_results      jsonb           NULL
thumbnail_url       text            NULL
custom_theme_id     uuid            NULL (FK to custom_themes)
is_public           boolean         DEFAULT false
status              text            DEFAULT 'draft' (draft/outline/complete)
created_at          timestamptz     DEFAULT now()
updated_at          timestamptz     DEFAULT now()
description         text            NULL
cover_image_url     text            NULL
slide_count         integer         DEFAULT 0
share_link          text            NULL
view_count          integer         DEFAULT 0
last_edited_at      timestamptz     DEFAULT now()
last_presented_at   timestamptz     NULL
deleted_at          timestamptz     NULL (soft delete)
template_id         uuid            NULL (FK to templates)
category            text            DEFAULT 'general'
```

**RLS Policies:**
- Users can create own presentations
- Users can view own presentations or public ones
- Users can update own presentations
- Users can delete own presentations

**JSONB Structures:**

**outline (text array):**
```json
[
  "Problem Statement",
  "Solution Overview", 
  "Market Opportunity",
  "Business Model",
  "Traction",
  "Team",
  "Competition",
  "Financial Projections",
  "Use of Funds",
  "Contact Information"
]
```

**content (jsonb):**
```json
{
  "slides": [
    {
      "id": "slide-1",
      "title": "Problem Statement",
      "content": "Event organizers spend 40+ hours per event on manual tasks...",
      "layout": "content",
      "notes": "Speaker notes here"
    }
  ],
  "slideCount": 10,
  "metadata": {
    "generatedAt": "2025-01-15T10:30:00Z",
    "aiModel": "claude-sonnet-4-5"
  }
}
```

---

## 🚧 What Needs to Be Built

### Phase 1: Core Presentation Flow (MVP)
1. **Enhanced Input Form** - Improve `/pitch-deck` page
2. **Outline Editor** - Build `/presentations/:id/outline`
3. **Slide Editor** - Build `/presentations/:id/edit`
4. **Presentation Viewer** - Build `/presentations/:id/view`
5. **Edge Functions** - AI generation backend
6. **Dashboard Integration** - Update `/dashboard/pitch-decks`

### Phase 2: Advanced Features (Post-MVP)
- Rich text editing for slides
- Custom themes and branding
- Export to PDF/PPTX
- Collaborative editing
- Analytics and tracking
- Template marketplace

---

## 🎯 Success Criteria

**MVP is complete when:**
1. ✅ User can describe their startup and generate outline (10 slides)
2. ✅ User can edit, reorder, add/delete slides in outline
3. ✅ User can select a visual theme (Purple, Blue, Dark)
4. ✅ User can generate full slide content via AI
5. ✅ User can edit title and content for each slide
6. ✅ User can view presentation in full-screen mode
7. ✅ User can navigate with keyboard (arrows, space, escape)
8. ✅ All changes auto-save to Supabase
9. ✅ Dashboard shows all presentations with status
10. ✅ Integration with existing Medellin AI navigation

**Quality Gates:**
- Mobile responsive (< 768px single column)
- Auto-save within 2 seconds of edit
- Loading states for all AI generation
- Error handling with user-friendly messages
- Accessibility (keyboard nav, focus states, screen reader support)
- Performance (< 3s page load, < 1s slide switching)

---

## 🔗 Reference Implementation

**Source:** `/home/sk/medellin-spark/presentation-ai`

**Key patterns to adopt:**
- Component naming: `PresentationDashboard`, `OutlineEditor`, `SlideEditor`, `PresentationViewer`
- File organization: `/components/presentation/` for feature components
- State management: React state + Supabase real-time updates
- Auto-save pattern: Debounced updates every 2 seconds
- Drag-and-drop: Use `@dnd-kit/core` or similar
- Keyboard navigation: Arrow keys, space, escape

**Simplifications for MVP:**
- Skip rich text editor (use plain textarea)
- Skip image generation (focus on text content)
- Skip PDF/PPTX export
- Skip collaboration features
- Use simple theme system (3 predefined themes)

---

## 📅 Timeline Estimate

**Phase 1 (MVP): 5-7 days**
- Day 1: Enhanced input form + Edge Functions setup
- Day 2: Outline editor UI + drag-and-drop
- Day 3: AI outline generation + theme selection
- Day 4: Slide editor UI + navigation
- Day 5: AI content generation + auto-save
- Day 6: Presentation viewer + keyboard nav
- Day 7: Dashboard integration + testing

**Phase 2 (Advanced): 10-14 days**
- Rich text editing
- Custom themes
- Export functionality
- Analytics integration

---

## 🎯 Next Steps

1. ✅ Review this overview
2. → Read `02-database-architecture.md` for detailed data structures
3. → Read `03-user-journey.md` for complete flow
4. → Read `04-component-architecture.md` for component breakdown
5. → Read `05-implementation-plan.md` for build order
6. → Start building Phase 1
