# My Presentations Page - UI Design Plan

**Page Number**: 01
**Date Created**: January 13, 2025
**Design System**: Medellin AI (Soft Intelligence)
**Status**: Ready for Implementation
**Reference**: Slidebean "My Presentations" interface

---

## 1. Page Overview

### 1.1 Page Name
- **Name**: My Presentations Dashboard
- **Route**: `/presentations`
- **User Role**: Authenticated users only (requires active session)

### 1.2 Purpose & User Goals
**Primary Purpose**: Central hub for users to manage their presentation library, create new presentations, and discover templates.

**User Goals**:
- Primary goal: Quickly create a new pitch deck (via AI, template, or blank canvas)
- Secondary goals:
  - View and organize all existing presentations
  - Find and duplicate past presentations
  - Access recommended templates for inspiration
  - Export presentations for external use

### 1.3 User Personas
**Target Users**:
1. **Solo Founder (Alex)**: First-time entrepreneur creating investor pitch deck, needs professional results fast
2. **Startup Team Member (Sarah)**: Part of 3-person founding team, collaborating on demo day presentation
3. **Corporate Professional (David)**: Innovation lead pitching new AI initiative to C-suite, needs board-ready deck

---

## 2. UI Layout Structure

### 2.1 Page Hierarchy
```
MyPresentationsPage
├── AppHeader (global)
│   ├── Logo
│   ├── MainNav
│   └── UserMenu
├── PageHeader
│   ├── Greeting (Good morning, Name!)
│   └── QuickStats (3 presentations, last edited 2h ago)
├── CreateNewSection
│   ├── AIGenerateCard (primary CTA)
│   ├── TemplateCard
│   ├── BlankCard
│   └── BudgetingCard
├── MyPresentationsGrid
│   ├── SectionHeader (MY PRESENTATIONS)
│   ├── SortFilterBar
│   └── PresentationCards[] (responsive grid)
├── RecommendedTemplatesSection
│   ├── SectionHeader (RECOMMENDED TEMPLATES)
│   ├── TemplateCards[] (grid of 8)
│   └── BrowseMoreButton
└── Footer (optional)
```

### 2.2 Key Sections

#### Section 1: PageHeader (Greeting & Stats)
- **Position**: Top of page, below global app header
- **Purpose**: Welcome user and provide quick context about their account
- **Content**: Time-based greeting + user first name + presentation count + last edited timestamp
- **Layout**: Horizontal flex, left-aligned text

**Visual Structure**:
```
┌─────────────────────────────────────────────────────┐
│ Good morning, Sarah! 👋                             │
│ You have 3 presentations. Last edited 2 hours ago.  │
└─────────────────────────────────────────────────────┘
```

#### Section 2: CreateNewSection (4 Creation Options)
- **Position**: Below PageHeader, top of main content area
- **Purpose**: Primary CTAs for creating new presentations
- **Content**: 4 large cards - AI Generate (primary), Use Template, Blank, Budgeting
- **Layout**: Horizontal row of 4 cards (desktop), 2×2 grid (tablet), 1 column stack (mobile)

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────┐
│ CREATE NEW                                                       │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ 🤖 AI    │ │ 📋 Templ │ │ ⬜ Blank │ │ 📊 Budget│           │
│ │ Generate │ │ Library  │ │ Start    │ │ Forecast │           │
│ │ Beta     │ │          │ │ Fresh    │ │          │           │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

#### Section 3: MyPresentationsGrid
- **Position**: Middle of page, main content area
- **Purpose**: Display all user's existing presentations
- **Content**: Header with sort/filter + grid of presentation cards
- **Layout**: CSS Grid, 4 columns (desktop) → 3 (laptop) → 2 (tablet) → 1 (mobile)

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────┐
│ MY PRESENTATIONS (3)              [Sort: Recent ▼] [Filter ▼]   │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│ │ Cover    │ │ Cover    │ │ Cover    │                         │
│ │ Image    │ │ Image    │ │ Image    │                         │
│ │          │ │          │ │          │                         │
│ ├──────────┤ ├──────────┤ ├──────────┤                         │
│ │ Q1 Inv...│ │ Seed Deck│ │ Product  │                         │
│ │ 12 slides│ │ 10 slides│ │ 8 slides │                         │
│ │ Edited 2h│ │ Edited 3d│ │ Created 1w│                        │
│ │ [Edit]   │ │ [Edit]   │ │ [Edit]   │                         │
│ └──────────┘ └──────────┘ └──────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

#### Section 4: RecommendedTemplatesSection
- **Position**: Bottom of page
- **Purpose**: Showcase popular templates to inspire users
- **Content**: Section header + grid of 8 template cards + Browse More button
- **Layout**: CSS Grid, 4 columns (same responsive rules as presentations)

---

## 3. Design System - Soft Intelligence

### 3.1 Color Palette

#### Primary Colors
- **Warm Amber** `#F5A623` - Primary CTA (AI Generate card), active states
- **Deep Indigo** `#4A5568` - Headings (H1, H2), primary text
- **Soft Slate** `#718096` - Body text, secondary information

#### Secondary Colors
- **Muted Teal** `#38B2AC` - Success badges (Complete status), active indicators
- **Gentle Coral** `#FC8181` - Delete action, destructive buttons
- **Powder Blue** `#90CDF4` - Links, interactive hover states

#### Neutral Palette
- **Pure White** `#FFFFFF` - Card backgrounds, main page background
- **Cloud Gray** `#F7FAFC` - Subtle card backgrounds, hover states
- **Soft Gray** `#EDF2F7` - Borders, dividers
- **Charcoal** `#2D3748` - Dark text, strong contrast

### 3.2 Typography

#### Font Families
- **All Text**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui

#### Type Scale
```css
/* Page Title (Greeting) */
h1: 2rem (32px) / font-weight: 700 / line-height: 1.25 / color: Deep Indigo

/* Section Headings (MY PRESENTATIONS) */
h2: 1.5rem (24px) / font-weight: 600 / line-height: 1.3 / color: Deep Indigo / text-transform: uppercase / letter-spacing: 0.05em

/* Card Titles */
h3: 1.125rem (18px) / font-weight: 600 / line-height: 1.4 / color: Deep Indigo

/* Card Subtitle (creation option description) */
body: 0.875rem (14px) / font-weight: 400 / line-height: 1.5 / color: Soft Slate

/* Card Metadata (12 slides, Edited 2h) */
caption: 0.8125rem (13px) / font-weight: 400 / line-height: 1.4 / color: Soft Slate

/* Button Text */
button: 1rem (16px) / font-weight: 500 / line-height: 1
```

### 3.3 Spacing System
```
xs: 0.25rem (4px) - tight spacing, icon margins
sm: 0.5rem (8px) - button padding vertical
md: 1rem (16px) - card padding, button padding horizontal
lg: 1.5rem (24px) - grid gap, section margins
xl: 2rem (32px) - section spacing
2xl: 3rem (48px) - major section spacing
3xl: 4rem (64px) - top/bottom page padding
```

### 3.4 Border Radius
```
sm: 0.375rem (6px) - Small badges
md: 0.5rem (8px) - Buttons, small cards
lg: 0.75rem (12px) - Main cards (presentation cards, creation cards)
xl: 1rem (16px) - Large feature cards
```

### 3.5 Shadows
```css
/* Card elevations */
card-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
card-hover: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)

/* AI Generate card special hover */
ai-card-hover: 0 10px 25px -5px rgba(245, 166, 35, 0.2), 0 4px 6px -2px rgba(245, 166, 35, 0.1)
```

---

## 4. Responsive Design

### 4.1 Breakpoints
```css
mobile: 0px - 639px (default, single column)
tablet: 640px - 1023px (2-3 columns)
desktop: 1024px - 1279px (4 columns)
wide: 1280px+ (4 columns, max-width container)
```

### 4.2 Layout Behavior

#### Mobile (0-639px)
- **CreateNewSection**: Stack vertically (1 column), each card full width
- **MyPresentationsGrid**: Single column, cards stack
- **RecommendedTemplates**: Single column
- **Navigation**: Hamburger menu
- **PageHeader**: Greeting + stats stack vertically

#### Tablet (640-1023px)
- **CreateNewSection**: 2×2 grid (AI Generate top-left, Template top-right)
- **MyPresentationsGrid**: 2 columns
- **RecommendedTemplates**: 2 columns
- **Sort/Filter**: Inline horizontal row

#### Desktop (1024px+)
- **CreateNewSection**: 4 columns horizontal row
- **MyPresentationsGrid**: 4 columns (3 cols on laptop 1024-1279px)
- **RecommendedTemplates**: 4 columns
- **Max Content Width**: 1440px, centered with auto margins

---

## 5. Component Specifications

### 5.1 Component List

#### Component 1: PageHeader
**Purpose**: Welcome user with personalized greeting and account stats

**Props**:
```typescript
interface PageHeaderProps {
  userName: string;
  presentationCount: number;
  lastEditedAt?: Date;
  weeklyActivity?: {
    created: number;
    edited: number;
  };
}
```

**States**:
- Default: Full greeting with stats
- Loading: Skeleton text placeholders
- Error: Generic greeting without stats

**Visual Design**:
- **Dimensions**: Full width, height auto (min 80px)
- **Background**: Pure White `#FFFFFF`
- **Border**: None
- **Typography**:
  - Greeting: H1 (32px, 700, Deep Indigo)
  - Stats: Body (14px, 400, Soft Slate)
- **Spacing**: Padding 24px top/bottom, 16px left/right

#### Component 2: AIGenerateCard (Primary CTA)
**Purpose**: Primary action for creating AI-powered pitch deck

**Props**:
```typescript
interface AIGenerateCardProps {
  onClick: () => void;
  isLoading?: boolean;
}
```

**States**:
- Default: Warm Amber border, white background
- Hover: Warm Amber background, white text, lift effect (translateY -4px), AI glow shadow
- Active: Pressed state (translateY 0, darker amber)
- Disabled: Grayed out (Cloud Gray background)
- Loading: Spinner overlay with "Generating..."

**Visual Design**:
- **Dimensions**: 260px × 200px (desktop), 100% width (mobile)
- **Background**: Pure White `#FFFFFF` (default), Warm Amber `#F5A623` (hover)
- **Border**: 2px solid Warm Amber `#F5A623`
- **Border-radius**: 12px (lg)
- **Shadow**: card-default → ai-card-hover on hover
- **Typography**:
  - Icon: 48px magic wand/sparkle, Warm Amber
  - Title: 18px / 600 / Deep Indigo
  - Subtitle: 14px / 400 / Soft Slate
  - Badge: 12px / 500 / uppercase / Pure White bg, Muted Teal text
- **Spacing**: Padding 24px, center-aligned content, 16px gap between elements

#### Component 3: PresentationCard
**Purpose**: Display thumbnail and metadata for user's existing presentation

**Props**:
```typescript
interface PresentationCardProps {
  id: string;
  title: string;
  coverImageUrl?: string;
  slideCount: number;
  status: 'draft' | 'complete' | 'shared';
  lastEditedAt: Date;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
}
```

**States**:
- Default: White card with subtle shadow
- Hover: Lift effect, increased shadow, actions appear
- Active: Pressed state (no lift)
- Selected: Blue border (future feature for multi-select)

**Visual Design**:
- **Dimensions**:
  - Card width: 280px (desktop), flexible in grid
  - Cover image: 16:9 aspect ratio (280px × 157.5px)
- **Background**: Pure White `#FFFFFF`
- **Border**: 1px solid Soft Gray `#EDF2F7`
- **Border-radius**: 12px (lg)
- **Shadow**: card-default → card-hover on hover
- **Cover Image**:
  - object-fit: cover
  - background: Cloud Gray `#F7FAFC` (placeholder)
  - Icon overlay if no image (presentation icon, Soft Slate)
- **Typography**:
  - Title: 18px / 600 / Deep Indigo / truncate after 2 lines
  - Metadata: 13px / 400 / Soft Slate
  - Status badge: 12px / 500 / uppercase
- **Spacing**:
  - Image: no padding (full width)
  - Content area: padding 16px
  - Gap between elements: 8px
  - Actions row: margin-top 12px

#### Component 4: TemplateCard
**Purpose**: Showcase recommended templates with usage stats

**Props**:
```typescript
interface TemplateCardProps {
  id: string;
  name: string;
  coverImageUrl: string;
  attribution: string; // "By Airbnb"
  usageCount: number;
  likeCount: number;
  isPremium: boolean;
  onSelect: (id: string) => void;
}
```

**States**:
- Default: Same as PresentationCard
- Hover: Lift effect + "Use Template" button fades in
- Premium: Lock icon badge in top-right corner

**Visual Design**:
- **Dimensions**: Same as PresentationCard (280px × auto)
- **Background**: Pure White
- **Border**: 1px solid Soft Gray
- **Shadow**: card-default → card-hover
- **Premium Badge**:
  - Position: absolute, top 12px, right 12px
  - Size: 32px × 32px
  - Background: rgba(154, 186, 198, 0.9) with backdrop-blur
  - Icon: lock, white, 16px
  - Border-radius: 8px
- **Usage Stats**:
  - Icon + number horizontal layout
  - Eye icon + "1m uses" | Heart icon + "42k likes"
  - 13px / 400 / Soft Slate
  - Icons: 14px, Soft Slate
- **CTA Button** (hover only):
  - "Use Template"
  - Warm Amber background
  - White text
  - Full width at bottom
  - Fade in on hover (opacity 0 → 1)

#### Component 5: EmptyState
**Purpose**: Show when user has no presentations yet

**Props**:
```typescript
interface EmptyStateProps {
  userName: string;
  onCreateFirst: () => void;
}
```

**Visual Design**:
- **Layout**: Center-aligned, max-width 400px, centered on page
- **Icon**: Empty folder or presentation icon, 120px, Soft Slate `#718096`
- **Heading**: "Welcome, {userName}! Let's create your first presentation"
- **Description**: "Choose one of the options above to get started in seconds."
- **CTA**: "Generate with AI" button (Warm Amber)
- **Spacing**:
  - Vertical padding: 64px
  - Gap between elements: 24px

---

## 6. Interactive Elements

### 6.1 Primary CTA Button (AI Generate Card)
**Style**: Warm Amber accent with hover state

**States**:
```css
/* Default */
border: 2px solid #F5A623
background: #FFFFFF
color: #2D3748
padding: 24px
border-radius: 12px
box-shadow: 0 1px 3px rgba(0,0,0,0.1)

/* Hover */
background: #F5A623
color: #FFFFFF
transform: translateY(-4px)
box-shadow: 0 10px 25px rgba(245,166,35,0.2), 0 4px 6px rgba(245,166,35,0.1)

/* Active */
transform: translateY(-2px)
box-shadow: 0 4px 10px rgba(245,166,35,0.15)

/* Disabled */
border-color: #CBD5E0
background: #F7FAFC
color: #A0AEC0
cursor: not-allowed
```

### 6.2 Secondary Button (Other Creation Options)
**Style**: Soft border with subtle hover

```css
/* Default */
border: 2px solid #E1E8EB
background: #FAFBFC
color: #2D3748
padding: 24px
border-radius: 12px

/* Hover */
border-color: #9ABAC6
box-shadow: 0 8px 16px rgba(0,0,0,0.08)
transform: translateY(-2px)
```

### 6.3 Text Link (Browse More Templates)
**Style**: Powder Blue with underline on hover

```css
color: #90CDF4
font-weight: 500
text-decoration: none

/* Hover */
text-decoration: underline
color: #63B3ED (darker blue)
```

### 6.4 Card Actions Menu (Three Dots)
**Style**: Dropdown menu on click

```css
/* Trigger Button */
width: 32px
height: 32px
border-radius: 6px
background: transparent
color: #718096

/* Hover */
background: #F7FAFC
color: #4A5568

/* Menu */
position: absolute
top: 100%
right: 0
background: #FFFFFF
border: 1px solid #E1E8EB
border-radius: 8px
box-shadow: 0 10px 25px rgba(0,0,0,0.15)
min-width: 180px
padding: 8px 0

/* Menu Items */
padding: 10px 16px
font-size: 14px
color: #2D3748
hover-background: #F7FAFC

/* Delete Item */
color: #FC8181
hover-background: rgba(252,129,129,0.1)
```

---

## 7. Content Guidelines

### 7.1 Empty States

**When Shown**: User has 0 presentations

**Content**:
- **Icon**: Presentation icon (slides stack), 120px, Soft Slate
- **Heading**: "Welcome, {userName}! Let's create your first presentation"
- **Description**: "Choose one of the options above to get started in seconds. Our AI can generate a complete pitch deck by answering just 5 questions."
- **CTA**: "Generate with AI" (Warm Amber button)

**Visual Design**:
- Center-aligned content
- Icon: 120px size, Soft Slate color
- Max-width: 400px
- Vertical spacing: 24px between elements
- Container padding: 64px top/bottom

### 7.2 Loading States

**Skeleton Screens**:
```
PageHeader:
  - Greeting: Gray bar (200px × 32px)
  - Stats: Gray bar (300px × 14px)

PresentationCard:
  - Cover: Animated gray rectangle (16:9)
  - Title: Gray bar (180px × 18px)
  - Metadata: 2 gray bars (120px × 13px each)
```

**Inline Loaders**:
- AI Generation: Spinner + "Generating your pitch deck... 10 seconds remaining"
- Card action: Small spinner (16px) replacing icon

### 7.3 Error States

**Empty Search Results**:
- Icon: Magnifying glass with X, 80px
- Heading: "No presentations found"
- Description: "Try adjusting your search or filters"
- Action: "Clear Filters" button

**API Error** (failed to load presentations):
- Icon: Alert triangle, 80px, Gentle Coral
- Heading: "Couldn't load your presentations"
- Description: "Please refresh the page or try again later."
- Action: "Retry" button

---

## 8. Interactions & Animations

### 8.1 Hover Effects

**Cards** (Presentation, Template, Creation Options):
```css
transition: all 0.2s ease-in-out;

/* Hover */
transform: translateY(-4px);
box-shadow: 0 10px 25px rgba(0,0,0,0.12);
```

**Buttons**:
```css
transition: all 0.15s ease-in-out;

/* Hover */
transform: translateY(-2px);
```

**Links**:
```css
transition: color 0.15s ease-in-out;
/* Hover: color change to Powder Blue */
```

### 8.2 Transitions

**Standard Transition** (all interactive elements):
```css
transition: all 0.2s ease-in-out;
```

**Specific Properties** (optimized performance):
```css
transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, opacity 0.15s ease-in-out;
```

### 8.3 Micro-interactions

**Button Click Feedback**:
- Scale down to 0.98 on click
- Return to original size in 0.1s

**Card Click**:
- Subtle scale effect (0.98) for 100ms
- Then navigate/open

**Loading Indicator**:
- Rotating spinner (360deg, infinite, 1s duration)
- Pulse effect on AI Generate card during generation

**Success Confirmation**:
- Toast notification slides in from top-right
- Green checkmark icon + "Presentation created!"
- Auto-dismiss after 3 seconds

**Error Shake**:
- Form validation errors trigger horizontal shake
- 4 shakes over 0.4s

---

## 9. Accessibility (A11y)

### 9.1 Checklist
- [x] All cards keyboard accessible (Tab to navigate, Enter to activate)
- [x] Focus indicators visible (2px Warm Amber outline, 4px offset)
- [x] ARIA labels on icon-only buttons ("More actions", "Sort presentations")
- [x] Alt text on all images (cover thumbnails: "Cover image for {presentation title}")
- [x] Color contrast ratios meet WCAG AA:
  - Deep Indigo on White: 8.6:1 ✓
  - Soft Slate on White: 4.9:1 ✓
  - Warm Amber on White: 2.9:1 ✗ (use only for borders/accents, not text)
- [x] Form inputs have associated labels
- [x] Error messages announced to screen readers (aria-live="polite")
- [x] Skip to main content link
- [x] Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`

### 9.2 Keyboard Navigation

**Tab Order**:
1. Skip to main content
2. Logo (link to home)
3. Main navigation links
4. User menu button
5. Create New cards (left to right)
6. Sort dropdown
7. Filter dropdown
8. Presentation cards (row by row, left to right)
9. Template cards
10. Browse More button

**Keyboard Shortcuts**:
- **Tab**: Navigate between interactive elements
- **Shift + Tab**: Navigate backwards
- **Enter/Space**: Activate buttons, open cards
- **Escape**: Close modals, menus
- **Arrow Keys**: Navigate within dropdowns (sort, filter, actions menu)
- **Cmd/Ctrl + K**: Open search (future feature)

### 9.3 Screen Reader Support
- [x] Page title: "My Presentations | Medellin AI"
- [x] ARIA landmarks:
  - `<header role="banner">`
  - `<nav role="navigation">`
  - `<main role="main">`
  - `<section aria-labelledby="my-presentations-heading">`
- [x] Live regions for dynamic content:
  - `<div role="status" aria-live="polite">` for success messages
  - `<div role="alert" aria-live="assertive">` for errors
- [x] Heading hierarchy:
  - H1: Good morning, {Name}!
  - H2: CREATE NEW, MY PRESENTATIONS, RECOMMENDED TEMPLATES
  - H3: Card titles

**Screen Reader Announcements**:
- "3 presentations found"
- "Presentation created successfully"
- "Sorting by recent, descending"
- "Loading more templates..."

---

## 10. Images & Media

### 10.1 Image Usage

#### Placeholder Images (Presentation Cover Thumbnails)
- **Service**: First slide thumbnail (generated from presentation data)
- **Dimensions**: 280px × 157.5px (16:9 aspect ratio)
- **Format**: WebP (primary), JPEG (fallback)
- **Quality**: 80% compression
- **Fallback**: Gradient background (Cloud Gray to Soft Gray) + presentation icon

#### Template Cover Images
- **Service**: Pre-rendered thumbnails stored in Supabase Storage
- **Dimensions**: 560px × 315px (2x for retina), displayed at 280px × 157.5px
- **Format**: WebP + JPEG fallback
- **Style**: Professional screenshots of slide 1
- **Fallback**: Template icon on Cloud Gray background

#### User-Generated Images (Future: Custom Covers)
- **Format**: JPEG, PNG, WebP
- **Max Size**: 2MB per image
- **Optimization**: Automatic compression via Supabase Storage Transform API
- **Storage**: Supabase Storage bucket `presentation-covers/`

### 10.2 Icons
- **Library**: Lucide React icons (https://lucide.dev/)
- **Sizes**:
  - Small: 16px (metadata icons: slides, status)
  - Medium: 20px (action buttons: edit, share)
  - Large: 48px (creation option cards: AI wand, template)
  - Extra Large: 120px (empty state icon)
- **Color**: Inherit from parent, default Deep Indigo `#4A5568`
- **Style**: Outlined (stroke-width: 2px)

**Icon Mapping**:
- AI Generate: `Wand2` or `Sparkles`
- Template Library: `LayoutTemplate`
- Blank Presentation: `FileText` or `PlusSquare`
- Budgeting: `TrendingUp` or `DollarSign`
- Edit: `Edit2` or `Pencil`
- Duplicate: `Copy`
- Share: `Share2`
- Delete: `Trash2`
- Download: `Download`
- More Actions: `MoreVertical`
- Sort: `ArrowUpDown`
- Filter: `Filter`
- Search: `Search`
- Empty State: `Presentation` or `FolderOpen`

---

## 11. Data Integration

### 11.1 Data Model
```typescript
interface Presentation {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  thumbnail_url?: string;
  status: 'draft' | 'complete' | 'shared';
  slide_count: number;
  theme: {
    primary_color: string;
    secondary_color: string;
    font_family: string;
  };
  is_public: boolean;
  share_link?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  last_edited_at: string;
  last_presented_at?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  cover_image_url: string;
  attribution: string; // "By Airbnb"
  category: 'pitch-deck' | 'investor-deck' | 'product-launch' | 'sales-deck';
  usage_count: number;
  like_count: number;
  is_premium: boolean;
  price_cents?: number;
  tags: string[];
  slides: any[]; // Slide data
  created_at: string;
}
```

### 11.2 API Endpoints (Supabase)

**Fetch User Presentations**:
```typescript
GET /rest/v1/presentations
?user_id=eq.{userId}
&order=last_edited_at.desc
&select=id,title,cover_image_url,slide_count,status,last_edited_at,created_at
```

**Fetch Recommended Templates**:
```typescript
GET /rest/v1/presentation_templates
?order=usage_count.desc
&limit=8
&select=id,name,cover_image_url,attribution,usage_count,like_count,is_premium
```

**Create New Presentation**:
```typescript
POST /rest/v1/presentations
Body: {
  user_id: string,
  title: string,
  status: 'draft',
  slide_count: 0,
  theme: {}
}
```

**Duplicate Presentation**:
```typescript
POST /rest/v1/rpc/duplicate_presentation
Body: { presentation_id: string }
```

**Delete Presentation** (Soft Delete):
```typescript
PATCH /rest/v1/presentations?id=eq.{id}
Body: { deleted_at: now(), status: 'deleted' }
```

### 11.3 State Management

**Global State** (Zustand):
```typescript
interface PresentationsStore {
  presentations: Presentation[];
  templates: Template[];
  sortBy: 'recent' | 'name' | 'created';
  filterBy: 'all' | 'drafts' | 'complete' | 'shared';
  isLoading: boolean;
  error: string | null;

  fetchPresentations: () => Promise<void>;
  fetchTemplates: () => Promise<void>;
  setSortBy: (sort: string) => void;
  setFilterBy: (filter: string) => void;
  createPresentation: (data: Partial<Presentation>) => Promise<Presentation>;
  duplicatePresentation: (id: string) => Promise<Presentation>;
  deletePresentation: (id: string) => Promise<void>;
}
```

**Local State** (React useState):
- Card hover states
- Action menu open/close
- Modal visibility (AI wizard, template preview)
- Form input values

**Server State** (React Query):
- Presentations list (cached, auto-refetch on window focus)
- Templates list (cached, stale time: 1 hour)
- Mutations: create, duplicate, delete (optimistic updates)

---

## 12. Implementation Notes

### 12.1 Technical Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui (Card, Button, DropdownMenu, Dialog)
- **State Management**: Zustand (global) + React Query (server state)
- **Icons**: Lucide React
- **Animation**: CSS transitions (primary), Framer Motion (optional, for complex)
- **Date Formatting**: date-fns
- **Image Optimization**: Cloudinary or Supabase Storage Transforms

### 12.2 File Structure
```
src/
├── pages/
│   └── MyPresentationsPage.tsx (main page component)
├── components/
│   └── presentations/
│       ├── PageHeader.tsx
│       ├── PageHeader.types.ts
│       ├── CreateNewSection.tsx
│       ├── CreateNewSection.types.ts
│       ├── AIGenerateCard.tsx
│       ├── PresentationCard.tsx
│       ├── PresentationCard.types.ts
│       ├── MyPresentationsGrid.tsx
│       ├── MyPresentationsGrid.types.ts
│       ├── RecommendedTemplatesSection.tsx
│       ├── TemplateCard.tsx
│       ├── EmptyState.tsx
│       └── index.ts
├── hooks/
│   └── usePresentations.ts
├── stores/
│   └── presentations.store.ts
├── lib/
│   ├── supabase.ts
│   └── utils.ts
└── types/
    └── presentations.types.ts
```

### 12.3 Performance Optimization
- [x] Lazy load components with React.lazy()
  - `AIWizardModal`, `TemplatePreviewModal` (only load when opened)
- [x] Memoize expensive calculations with useMemo
  - Filtered/sorted presentations list
  - Usage stats formatting (1000000 → "1m uses")
- [x] Virtualize long lists (if >50 presentations)
  - Use `react-window` for presentation grid
- [x] Optimize images
  - WebP format with JPEG fallback
  - Responsive srcset (280w, 560w)
  - Lazy loading with `loading="lazy"`
  - Placeholder blur effect
- [x] Code splitting per route
  - My Presentations page separate bundle
  - Template library page separate bundle
- [x] Debounce search input (300ms)
- [x] Prefetch template data on page mount

**Performance Targets**:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.0s
- Time to Interactive (TTI): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

---

## 13. Real-World Use Cases

### Use Case 1: Solo Founder Creating First Deck
**Actor**: Alex, first-time entrepreneur
**Goal**: Create professional investor pitch deck in under 30 minutes
**Steps**:
1. Signs up for Medellin AI account
2. Lands on My Presentations page (empty state)
3. Sees "Welcome, Alex! Let's create your first presentation"
4. Clicks "Generate with AI" (Warm Amber card)
5. AI wizard opens, fills in:
   - Company: "Fintech app for freelancers"
   - Stage: "Marketplace/growth"
   - Target: "Seed investors"
6. AI generates 10-slide deck in 12 seconds
7. Reviews slides, edits 3 slides (team, traction, ask)
8. Returns to My Presentations → sees 1 presentation card
9. Clicks "Download PDF" from actions menu
10. Sends PDF to 10 VCs
**Outcome**: Professional deck created in 20 minutes
**Time**: 20 minutes

### Use Case 2: Returning User Creating Second Deck
**Actor**: Sarah, startup founder with 1 existing deck
**Goal**: Create sales deck for enterprise customers
**Steps**:
1. Logs in, lands on My Presentations
2. Sees "Good morning, Sarah! You have 1 presentation. Last edited 3 days ago."
3. Sees existing "Q1 Investor Pitch" card
4. Clicks "Use a Template" card
5. Template library opens, filters by "Sales Deck"
6. Finds "Enterprise Sales Deck by Salesforce"
7. Clicks template card → preview modal opens
8. Reviews 15 slides, clicks "Use This Template"
9. New deck created: "Enterprise Sales Deck (Copy)"
10. Redirects to editor, customizes slides 1-5
11. Returns to My Presentations → now sees 2 cards
12. Sorts by "Recent" → new deck appears first
**Outcome**: Sales deck created from template in 30 minutes
**Time**: 30 minutes

### Use Case 3: Power User Managing 12 Decks
**Actor**: David, corporate innovation lead with 12 existing presentations
**Goal**: Find Q4 board deck, duplicate it for Q1, update data
**Steps**:
1. Lands on My Presentations → sees grid of 12 cards
2. Wants to find "Q4 Board Update" deck
3. Uses search (future feature): types "Q4 board"
4. Results filter to 2 matches
5. Clicks three-dot menu on "Q4 Board Update"
6. Selects "Duplicate" from actions menu
7. New card appears: "Q4 Board Update (Copy)"
8. Clicks three-dot menu → "Rename" → "Q1 Board Update"
9. Clicks "Edit" → opens slide editor
10. Updates Q4 data to Q1 projections, saves
11. Clicks "Share" → generates share link
12. Copies link, sends to board members via email
**Outcome**: Updated Q1 deck ready for board meeting
**Time**: 45 minutes

---

## 14. Success Metrics

### 14.1 UX Metrics
- **Task Completion Rate**: >90% (user successfully creates first presentation)
- **Time to First Presentation**: <5 minutes (from sign-up to first deck created)
- **Return Rate**: >50% of users return within 7 days
- **Avg Presentations per User**: Target 3-5 presentations

### 14.2 Performance Metrics
- **Page Load Time**: <2s (median on desktop, fast 3G)
- **Time to Interactive**: <2.5s
- **First Contentful Paint (FCP)**: <1.5s
- **Largest Contentful Paint (LCP)**: <2.0s (cover images)
- **Cumulative Layout Shift (CLS)**: <0.1 (prevent layout jumps during image load)

### 14.3 Business Metrics
- **Creation Method Distribution**:
  - AI Generate: 60% (primary conversion driver)
  - Template: 30%
  - Blank: 10%
- **Presentation Creation Rate**: >80% of new users create ≥1 presentation within 24 hours
- **Template Conversion**: >40% of users who browse templates create deck from template
- **Feature Adoption**:
  - Export (PDF/PPTX): >70%
  - Share link: >40%
  - Duplicate: >25%

---

## 15. Deliverables

### For Lovable/Development Team
- [x] Complete design specification (this document)
- [ ] Figma mockups (optional but recommended):
  - Desktop layout (1440px)
  - Tablet layout (768px)
  - Mobile layout (375px)
  - Component variants (hover, active, disabled)
- [x] Component prop interfaces (TypeScript) - see Section 11.1
- [x] API endpoint specifications - see Section 11.2
- [x] Database schema - see Section 11.1
- [x] User flow diagrams - see Section 13
- [x] Accessibility checklist - see Section 9.1
- [x] Success metrics dashboard - see Section 14

### For Stakeholders
- [ ] Executive summary (1-page):
  - "My Presentations: Central hub for creating and managing pitch decks"
  - Key features: AI generation, template library, presentation management
  - Target: 90% task completion rate, <5 min to first deck
- [x] User journey maps - see Section 13 (3 detailed use cases)
- [ ] Feature prioritization matrix:
  - P0 (MVP): Create New section, My Presentations grid, basic actions
  - P1 (Launch): Template library, AI generation, export
  - P2 (Post-launch): Search, advanced filters, collaboration
- [ ] Timeline:
  - Week 1-2: Page structure + grid
  - Week 3-4: Templates + AI integration
  - Week 5: Polish + launch

---

**Document Status**: ✅ Complete
**Version**: 1.0
**Created**: January 13, 2025
**Last Updated**: January 13, 2025
**Next Review**: February 1, 2025
**Approved By**: [Pending Review]

---

**Ready for development!** 🚀 This spec provides everything needed to build the My Presentations page from design to implementation.
