# Medellin AI - UI Design Plans

**Created**: January 13, 2025
**Status**: Complete
**Design System**: Soft Intelligence

---

## 📋 Overview

This directory contains comprehensive UI/UX design specifications for Medellin AI's core pages. Each document follows a standardized template ensuring consistency across all designs.

---

## 📚 Design Documents

### 00. Design Prompt Template
**File**: `00-design-prompt-template.md`
**Purpose**: Reusable template for creating new UI design plans

**Includes**:
- 15-section comprehensive structure
- Page overview, layout, component specs
- Design system guidelines (colors, typography, spacing)
- Responsive design breakpoints
- Accessibility checklist
- Data integration patterns
- Implementation notes

---

### 01. My Presentations Page
**File**: `01-my-presentations-ui-plan.md`
**Route**: `/presentations`
**Purpose**: User's presentation dashboard and library

**Key Features**:
- Personalized greeting with time-based salutation
- 4 creation options (AI Generate, Template, Blank, Budgeting)
- Grid of user's existing presentations
- Recommended templates section
- Sort/filter capabilities
- Card actions (edit, duplicate, share, export)

**Components**:
- `PageHeader` - Greeting + stats
- `CreateNewSection` - 4 creation cards
- `MyPresentationsGrid` - User's decks
- `PresentationCard` - Individual deck preview
- `RecommendedTemplatesSection` - Template library
- `TemplateCard` - Template preview with stats

**Design Highlights**:
- Warm Amber (#F5A623) primary CTA for AI Generate
- 4-column responsive grid (desktop) → 1 column (mobile)
- Card hover effects with lift animation
- Empty state for first-time users

---

### 02. Pitch Deck Dashboard
**File**: `02-pitch-deck-dashboard-ui-plan.md`
**Route**: `/pitch-deck/:deckId/slides`
**Purpose**: Edit and manage individual pitch deck slides

**Key Features**:
- Visual slide grid (3 columns desktop)
- Drag-and-drop reordering (react-beautiful-dnd)
- Slide thumbnails (16:9 aspect ratio)
- Status badges (Draft, Complete, AI Generated)
- AI content generation per slide
- Export options (PDF, PPTX, Google Slides)
- Present mode (full-screen slideshow)

**Components**:
- `DeckHeader` - Title editor + actions
- `SlideGrid` - Responsive grid container
- `SlideCard` - Individual slide preview (280x157px thumbnail)
- `AddSlideButton` - Add custom slide
- `SlideEditor` - Full-screen editor modal (future)

**Design Highlights**:
- 16:9 thumbnail aspect ratio
- Drag-and-drop with smooth animations
- AI badge for generated content
- Editable deck title (inline editing)

---

### 03. Professional Profile Page
**File**: `03-professional-profile-ui-plan.md`
**Route**: `/profile` (own), `/profile/:userId` (public)
**Purpose**: Professional profile with presentation portfolio

**Key Features**:
- Profile header (avatar, name, title, location)
- Availability badge ("Available for opportunities")
- About section (bio, skills tags)
- Featured presentations showcase
- Experience timeline
- Contact section with social links
- Edit mode (own profile) vs. view mode (public)

**Components**:
- `ProfileHeader` - Avatar + basic info + actions
- `AboutSection` - Bio + skills
- `PresentationsShowcase` - Grid of 3-4 featured decks
- `ExperienceTimeline` - Work history
- `ContactSection` - Email + social links
- `AvailabilityBadge` - "Available" indicator

**Design Highlights**:
- 2-column layout (desktop): profile left, content right
- Muted Teal availability badge
- Presentation cards same style as My Presentations
- Contact modal for messaging

---

### 04. Jobs Marketplace
**File**: `04-jobs-marketplace-ui-plan.md`
**Route**: `/jobs`
**Purpose**: Connect professionals with startup opportunities

**Key Features**:
- Search bar with auto-complete
- Advanced filters (location, remote, stage, salary, equity)
- Job cards with featured badge
- Salary + equity ranges
- "View Pitch Deck" link (review company)
- "Apply Now" button with modal
- Save jobs for later
- Employer job posting

**Components**:
- `JobsMarketplacePage` - Main container
- `SearchBar` - Search + advanced filters
- `JobsGrid` - Grid of job cards
- `JobCard` - Individual job listing
- `ApplyModal` - Application form
- `FeaturedBadge` - Premium job indicator

**Design Highlights**:
- Featured jobs with Warm Amber badge
- 3-column grid (sidebar + 2 cols jobs)
- Pitch deck integration (view company deck before applying)
- Application includes profile + presentations

---

## 🎨 Design System: Soft Intelligence

### Color Palette
```
Primary:
- Warm Amber      #F5A623  Primary CTAs, AI features
- Deep Indigo     #4A5568  Headings, primary text
- Soft Slate      #718096  Body text, secondary info

Secondary:
- Muted Teal      #38B2AC  Success, active states, links
- Gentle Coral    #FC8181  Warnings, delete actions
- Powder Blue     #90CDF4  Hover states, interactive elements

Neutrals:
- Pure White      #FFFFFF  Backgrounds, cards
- Cloud Gray      #F7FAFC  Subtle backgrounds
- Soft Gray       #EDF2F7  Borders, dividers
- Charcoal        #2D3748  Dark text
```

### Typography
```
Font Family: Inter, -apple-system, system-ui

Headings:
h1: 2-2.5rem / 700 / Deep Indigo
h2: 1.5rem / 600 / Deep Indigo
h3: 1.125-1.25rem / 600 / Deep Indigo

Body:
Large: 1.125rem / 400
Normal: 1rem / 400
Small: 0.875rem / 400
Caption: 0.75-0.8125rem / 400
```

### Spacing
```
xs:  4px    Tight spacing, icon margins
sm:  8px    Button padding vertical
md:  16px   Card padding, button horizontal
lg:  24px   Grid gaps, section margins
xl:  32px   Section spacing
2xl: 48px   Major section spacing
3xl: 64px   Page padding
```

### Responsive Breakpoints
```
mobile:  0-639px     (1 column)
tablet:  640-1023px  (2 columns)
desktop: 1024-1439px (3-4 columns)
wide:    1440px+     (max-width 1440px, centered)
```

---

## ♿ Accessibility Standards

All designs meet WCAG 2.1 AA standards:

- [x] Color contrast ratios ≥ 4.5:1 for text
- [x] Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- [x] Focus indicators (2px Warm Amber outline, 4px offset)
- [x] ARIA labels on icon-only buttons
- [x] Alt text on all images
- [x] Screen reader support (semantic HTML, ARIA landmarks)
- [x] Form labels and validation messages
- [x] Skip navigation links

---

## 🛠️ Technical Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State**: Zustand (global) + React Query (server)
- **Forms**: React Hook Form + Zod validation
- **Drag-and-Drop**: react-beautiful-dnd (Pitch Deck Dashboard)

### Backend
- **Database**: Supabase (PostgreSQL)
- **API**: Supabase Edge Functions
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **AI**: OpenAI GPT-4 (content generation)
- **Export**: Puppeteer (PDF), pptxgenjs (PPTX)

---

## 📊 Success Metrics

### UX Metrics (Across All Pages)
- **Task Completion Rate**: >85%
- **Time to First Action**: <30 seconds
- **Error Rate**: <5%
- **User Satisfaction (CSAT)**: >4.2/5

### Performance Targets
- **First Contentful Paint (FCP)**: <1.5s
- **Largest Contentful Paint (LCP)**: <2.0s
- **Time to Interactive (TTI)**: <2.5s
- **Cumulative Layout Shift (CLS)**: <0.1

### Business Metrics
- **Presentation Creation Rate**: >80% create ≥1 deck
- **AI Usage Rate**: >60% use AI generation
- **Profile Completion**: >70% complete profile
- **Job Application Rate**: >15% apply to ≥1 job

---

## 🚀 Implementation Phases

### Phase 1: Core Pages (Weeks 1-4)
- [x] Design specs complete (all 4 pages)
- [ ] My Presentations page implementation
- [ ] Pitch Deck Dashboard implementation
- [ ] Professional Profile page implementation
- [ ] Jobs Marketplace page implementation

### Phase 2: Advanced Features (Weeks 5-8)
- [ ] AI content generation integration
- [ ] Export functionality (PDF, PPTX, Google Slides)
- [ ] Search and filtering across all pages
- [ ] Drag-and-drop slide reordering
- [ ] Application tracking system

### Phase 3: Collaboration & Analytics (Weeks 9-12)
- [ ] Real-time co-editing (pitch decks)
- [ ] Comments on slides
- [ ] Version history
- [ ] Presentation analytics (views, engagement)
- [ ] Job application analytics (for employers)

---

## 📁 File Organization

```
main/UI/
├── README.md                              ← You are here
├── 00-design-prompt-template.md           ← Reusable template
├── 01-my-presentations-ui-plan.md         ← Presentation library
├── 02-pitch-deck-dashboard-ui-plan.md     ← Slide editor
├── 03-professional-profile-ui-plan.md     ← User profile
└── 04-jobs-marketplace-ui-plan.md         ← Job board
```

---

## 🔗 Related Documentation

- **Implementation Plans**: `/home/sk/medellin-spark/main/pages/`
  - `my-presentations-page-plan.md`
  - `pitch-deck-dashboard-plan.md`
- **Auth Documentation**: `/home/sk/medellin-spark/supabase/docs/auth/`
- **Database Schema**: Defined in each UI plan (Section 11)
- **API Endpoints**: Defined in each UI plan (Section 11.2)

---

## 💡 Usage Instructions

### For Designers
1. Use `00-design-prompt-template.md` for new pages
2. Reference existing UI plans for consistency
3. Follow Soft Intelligence design system
4. Ensure WCAG AA compliance

### For Developers
1. Read UI plan for the page you're implementing
2. Reference component specifications (Section 5)
3. Use data models from Section 11
4. Implement API endpoints from Section 11.2
5. Follow accessibility checklist (Section 9)

### For Product Managers
1. Review user goals (Section 1.2)
2. Check use cases (Section 13)
3. Validate success metrics (Section 14)
4. Plan implementation phases

---

## ✅ Completion Checklist

- [x] Design prompt template created
- [x] My Presentations UI plan complete
- [x] Pitch Deck Dashboard UI plan complete
- [x] Professional Profile UI plan complete
- [x] Jobs Marketplace UI plan complete
- [x] All plans follow standardized template
- [x] Design system documented
- [x] Accessibility standards defined
- [x] Success metrics established
- [ ] Figma mockups created (optional, recommended)
- [ ] Design review with stakeholders
- [ ] Handoff to development team

---

**Status**: ✅ All UI Design Plans Complete
**Next Step**: Begin Phase 1 implementation
**Last Updated**: January 13, 2025
**Maintained By**: Medellin AI Design Team

---

**Ready to build an exceptional user experience!** 🚀
