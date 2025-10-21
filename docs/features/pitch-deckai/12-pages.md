# Medellin Spark - Comprehensive Pages Plan
**Last Updated:** January 14, 2025
**Total Pages:** 28
**Status:** 17 Complete | 1 In Progress | 10 Planned

---

## Executive Summary

This document provides a complete inventory of all pages in the Medellin Spark platform, their implementation status, data flows, user journeys, and implementation roadmap. The platform currently has 17 fully implemented pages with 11 additional pages planned across 4 implementation phases.

### Quick Stats
- 🟢 **Completed:** 17 pages (60.7%)
- 🟡 **In Progress:** 1 page (3.6%)
- 🔴 **Planned:** 10 pages (35.7%)

### Technology Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Supabase (PostgreSQL + Auth + Storage + RPC)
- **Routing:** React Router v6
- **State:** Zustand v5.0.8
- **UI:** shadcn/ui + Tailwind CSS
- **Design System:** Soft Intelligence

---

## Status Checklist

### 🟢 Public Pages (Complete)
- 🟢 **/** - Home (Landing Page)
- 🟢 **/about** - About Medellin Spark
- 🟢 **/events** - Event Listings
- 🟢 **/perks** - Member Perks
- 🟢 **/programs** - Programs & Resources
- 🟢 **/blog** - Blog Listings
- 🟢 **/startups** - Startup Directory
- 🟢 **/founders** - Founder Profiles
- 🟢 **/jobs** - Jobs Listings
- 🟢 **/contact** - Contact Form
- 🟢 **/pitch-deck** - Pitch Deck Info (Marketing)
- 🟢 **/auth** - Authentication (Sign In/Sign Up)

### 🟢 Protected Pages (Complete)
- 🟢 **/dashboard** - Main Dashboard
- 🟢 **/dashboard/events** - Event Management
- 🟢 **/dashboard/settings** - User Settings
- 🟢 **/pitch-deck-wizard** - Pitch Deck Creation Wizard
- 🟢 **/pitch-deck/:deckId** - Pitch Deck Preview

### 🟡 Protected Pages (In Progress)
- 🟡 **/presentations** - My Presentations (Basic implementation exists, needs UI enhancement)

### 🔴 Protected Pages (Planned - Phase 1)
- 🔴 **/presentations/:id** - Presentation View
- 🔴 **/presentations/:id/edit** - Presentation Editor (Plate.js integration needed)
- 🔴 **/presentations/generate** - AI Generation Interface

### 🔴 Protected Pages (Planned - Phase 2)
- 🔴 **/profile** - My Profile (Edit)
- 🔴 **/profile/:id** - Public Profile View

### 🔴 Protected Pages (Planned - Phase 3)
- 🔴 **/jobs/browse** - Jobs Marketplace Browse
- 🔴 **/jobs/:id** - Job Detail Page
- 🔴 **/jobs/applications** - My Applications
- 🔴 **/jobs/post** - Post a Job (Employer)

### 🟢 Utility Pages (Complete)
- 🟢 **/404** - Not Found

---

## Complete Sitemap Structure

### Authentication Flow
```
/
├── /auth (public)
│   ├── Sign In
│   └── Sign Up
│
└── Protected Area (requires auth)
    ├── /dashboard
    ├── /presentations
    └── /profile
```

### Public Routes (No Auth Required)
```
Public Marketing & Info
├── / (Home)
├── /about
├── /pitch-deck (Marketing page)
├── /contact
│
Community & Discovery
├── /events
├── /perks
├── /programs
├── /blog
├── /blog/:slug (planned)
│
Directory
├── /startups
├── /startups/:id (planned)
├── /founders
└── /jobs
```

### Protected Routes (Auth Required)
```
Dashboard
├── /dashboard
├── /dashboard/events
└── /dashboard/settings

Presentations (Core Product)
├── /presentations (My Presentations - List)
├── /presentations/generate (AI Generation)
├── /presentations/new/edit (Create New)
├── /presentations/:id (View/Present)
└── /presentations/:id/edit (Edit)

Pitch Deck (Legacy - Will merge with Presentations)
├── /pitch-deck-wizard
├── /pitch-deck/:deckId
└── /pitch-deck/:deckId/edit

Profile
├── /profile (My Profile - Edit)
└── /profile/:id (Public View)

Jobs Marketplace
├── /jobs/browse
├── /jobs/:id
├── /jobs/applications
└── /jobs/post
```

---

## Data Flow Architecture

### Database Schema Overview

#### Core Tables
```sql
-- Profiles (1:1 with auth.users)
profiles
├── id (UUID, PK, FK to auth.users)
├── email
├── full_name
├── avatar_url
├── bio
├── company
├── role
├── location
├── linkedin_url, twitter_url, website_url
├── created_at, updated_at

-- Presentations (Core Product)
presentations
├── id (UUID, PK)
├── profile_id (FK to profiles)
├── title, description
├── cover_image_url, thumbnail_url
├── status ('draft' | 'complete' | 'shared')
├── slide_count
├── theme (JSONB - colors, fonts)
├── is_public, share_link
├── view_count
├── content (JSONB - Plate.js data)
├── prompt (AI generation prompt)
├── created_at, updated_at, last_edited_at
└── deleted_at (soft delete)

-- Events
events
├── id, title, description
├── event_date, location, capacity
├── image_url, status

-- Jobs (Future)
jobs
├── id, company_id (FK to profiles)
├── title, description
├── type ('full-time' | 'part-time' | 'contract')
├── location, remote, salary_range
├── skills_required (array)
└── status ('active' | 'closed')
```

#### RPC Functions
```sql
get_my_presentations_stats(user_profile_id UUID)
  → Returns: total_count, draft_count, complete_count

soft_delete_presentation(presentation_id UUID)
  → Sets deleted_at timestamp

duplicate_presentation(source_id UUID)
  → Returns: new_presentation_id
```

### Key Data Flow Patterns

#### 1. Presentation Creation Flow
```
User Action (UI) → React Component → Supabase Client
  ↓
.from('presentations').insert({ title, profile_id, ... })
  ↓
PostgreSQL + RLS Policy Check → Row Inserted
  ↓
TanStack Query Cache Invalidation → UI Re-render
```

#### 2. Auto-Save Flow (Editor)
```
User Edits → onChange (debounced 2s)
  ↓
.update({ content, last_edited_at })
  ↓
Optimistic UI Update → Success/Error Toast
```

#### 3. AI Generation Flow (Planned)
```
User Enters Prompt → Create presentation (status: 'generating')
  ↓
Call Edge Function: supabase.functions.invoke('generate-presentation')
  ↓
Edge Function → OpenAI/Anthropic API → Stream chunks
  ↓
Update content JSONB incrementally → Set status: 'complete'
```

#### 4. Authentication Flow
```
User Visits Protected Route → ProtectedRoute Component
  ↓
Check: supabase.auth.getSession()
  ↓
No Session → Redirect to /auth
Session Valid → Allow Access + Provide user via AuthContext
```

---

## User Journeys

### Journey 1: New User Onboarding → First Deck Created
```
1. Landing Page (/)
   Hero: "Build Investor-Ready Pitch Decks in Minutes"
   CTA: "Get Started Free"
   ↓
2. Sign Up (/auth)
   Email + Password OR Google OAuth
   ↓
3. Dashboard Welcome (/dashboard)
   "Welcome, [Name]! 👋"
   Quick action: "Create Your First Pitch Deck"
   ↓
4. Presentation Creation (/presentations)
   Option A: "Start from Scratch" → /presentations/new/edit
   Option B: "Generate with AI" → /presentations/generate
   ↓
5a. Manual Path: Opens Plate.js editor, add slides, auto-save
5b. AI Path: Enter prompt → AI generates → Edit in editor
   ↓
6. Edit & Refine (/presentations/:id/edit)
   Modify content, add images/charts, apply theme
   ↓
7. Present (/presentations/:id)
   Full-screen mode, share link, export PDF/PPTX
```

### Journey 2: Marketing Funnel (Landing → Info → Sign Up)
```
1. Google Search / Social Media
   ↓
2. Landing Page (/) - Hero, features, testimonials
   CTA: "Learn More About Pitch Decks"
   ↓
3. Pitch Deck Info (/pitch-deck)
   Educational content, sample decks
   CTA: "Create Your Pitch Deck"
   ↓
4. Auth (/auth) - Sign up with value proposition
   ↓
5. Dashboard - Onboarding checklist, first presentation
```

### Journey 3: Jobs Marketplace (Browse → Apply)
```
1. Jobs Landing (/jobs) - Featured jobs
   "Browse All Jobs" CTA
   ↓
2. Jobs Browse (/jobs/browse)
   Filters: Type, Location, Skills | Search | Infinite scroll
   ↓
3. Job Detail (/jobs/:id)
   Full description, company info, skills, salary
   "Apply Now" CTA
   ↓
4. Application Flow
   Not logged in → /auth
   Logged in → Modal: upload resume, cover letter
   ↓
5. My Applications (/jobs/applications)
   Track status, filter, withdraw option
```

### Journey 4: Presentation Management
```
1. My Presentations (/presentations)
   Grid view, stats, multi-select toggle
   Sort: Recent, Name, Status
   ↓
2. Create New - Choose: Blank or AI Generate
   ↓
3. Edit (/presentations/:id/edit)
   Plate.js editor, slides sidebar, auto-save
   ↓
4. Share (/presentations/:id)
   Generate link, public/private, embed code, analytics
   ↓
5. Bulk Operations
   Select multiple → Delete, Update status, Export
```

---

## Implementation Roadmap

### Phase 1: Presentations Core (Weeks 1-4) - HIGH PRIORITY

**Goal:** Complete core presentations product with AI generation

**Week 1-2: My Presentations Enhancement**
- [ ] Create Zustand store for multi-select
- [ ] Implement infinite scroll with TanStack Query
- [ ] Add filters and search UI
- [ ] Enhance card design (Soft Intelligence system)
- [ ] Add bulk operations (delete, status update)
- [ ] Skeleton loaders and empty states
- **Milestone:** My Presentations fully functional

**Week 3: Presentation View & Sharing**
- [ ] Create PresentationView component
- [ ] Implement slide navigation
- [ ] Add full-screen presentation mode
- [ ] Build share link generation
- [ ] Add view count tracking
- [ ] Implement public/private toggle
- **Milestone:** Users can view and share presentations

**Week 4: Presentation Editor (Basic)**
- [ ] Install and configure Plate.js
- [ ] Create editor layout with sidebar
- [ ] Implement auto-save with debounce
- [ ] Add slide thumbnail sidebar
- [ ] Drag-to-reorder slides
- [ ] Image upload to Supabase Storage
- **Milestone:** Basic editor functional

**Week 5: AI Generation**
- [ ] Create Edge Function for AI generation
- [ ] Integrate OpenAI/Anthropic API
- [ ] Implement streaming response
- [ ] Build thinking display UI
- [ ] Add prompt templates
- [ ] Error handling and retry
- **Milestone:** AI generation working end-to-end

---

### Phase 2: Profile & Identity (Weeks 6-7) - MEDIUM PRIORITY

**Goal:** Enable professional profiles

**Week 6: Profile Management**
- [ ] Create profile edit form
- [ ] Avatar upload to Supabase Storage
- [ ] Validation and error handling
- [ ] Save updates to Supabase
- [ ] Skills and experience tags
- **Milestone:** Profile editing complete

**Week 7: Public Profiles**
- [ ] Create public profile view
- [ ] Filter presentations (public only)
- [ ] Add contact form/button
- [ ] Implement share URLs
- [ ] Social meta tags for sharing
- **Milestone:** Public profiles shareable

---

### Phase 3: Jobs Marketplace (Weeks 8-11) - MEDIUM PRIORITY

**Goal:** Launch jobs marketplace

**Week 8: Jobs Database & Browse**
- [ ] Create jobs table schema
- [ ] Set up RLS policies
- [ ] Build jobs browse page
- [ ] Implement search and filters
- [ ] Add infinite scroll
- [ ] Create job card component
- **Milestone:** Job browsing functional

**Week 9: Job Details & Apply**
- [ ] Create job detail page
- [ ] Rich text description rendering
- [ ] Build application flow
- [ ] Create applications table
- [ ] Save job functionality
- **Milestone:** Users can apply

**Week 10: Applications Tracking**
- [ ] Create My Applications page
- [ ] Add status tracking
- [ ] Implement withdraw functionality
- [ ] Add email notifications
- [ ] Build status update workflow
- **Milestone:** Application tracking complete

**Week 11: Job Posting (Employer)**
- [ ] Create job posting form
- [ ] Rich text editor for description
- [ ] Implement preview mode
- [ ] Add employer dashboard
- [ ] Job management (edit/close)
- **Milestone:** Employers can post jobs

---

### Phase 4: Enhanced Features (Weeks 12+) - LOW PRIORITY

**Goal:** Polish and advanced features

**Week 12: Dashboard Enhancements**
- [ ] Analytics dashboard
- [ ] Presentation performance metrics
- [ ] Activity timeline
- [ ] Recommended actions AI
- [ ] Upcoming events widget
- **Milestone:** Enhanced dashboard

**Week 13: Editor Advanced**
- [ ] Custom Plate.js elements (charts, diagrams)
- [ ] Theme customization panel
- [ ] Keyboard shortcuts
- [ ] Export to PDF/PPTX
- [ ] Version history
- **Milestone:** Advanced editor features

**Week 14+: Future Enhancements**
- [ ] Real-time collaborative editing
- [ ] Presentation templates marketplace
- [ ] Advanced AI features (voice-to-presentation)
- [ ] Mobile app (React Native)
- [ ] Presentation analytics (views, engagement)
- [ ] White-label for enterprises

---

## Page Implementation Details

### Priority Pages (Phase 1 - Detailed Specs)

#### My Presentations (/presentations)
**Current Status:** 🟡 Basic implementation exists  
**Component File:** `src/pages/presentations/MyPresentations.tsx`

**Existing Features:**
- ✅ Fetch presentations from Supabase
- ✅ Display in grid layout
- ✅ Stats calculation (total, draft, complete)
- ✅ Delete functionality
- ✅ Duplicate functionality

**Needed Enhancements:**
- ❌ Multi-select mode (reference: `/reference-presentation-ai/src/components/presentation/dashboard/PresentationsSidebar.tsx`)
- ❌ Infinite scroll with TanStack Query
- ❌ Filters (status, search)
- ❌ Enhanced UI per Soft Intelligence design
- ❌ Bulk operations (delete, status update)

**Component Architecture:**
```
MyPresentations.tsx
├── PageHeader (stats, new button, multi-select toggle)
├── PresentationFilters (search, status, sort)
├── PresentationGrid (infinite scroll)
│   └── PresentationCard[] (cover, title, meta, actions)
└── SelectionControls (bulk actions - conditional)
```

**UI Reference:** `/main/pages/my-presentations-implementation-plan.md`

---

#### Presentation Editor (/presentations/:id/edit)
**Current Status:** 🔴 Placeholder exists  
**Component File:** `src/pages/presentations/PresentationEditor.tsx`

**Existing Features:**
- ✅ Basic toolbar structure
- ✅ Save functionality (placeholder)

**Needed Implementation:**
- ❌ Plate.js editor integration (reference: `/reference-presentation-ai/src/components/presentation/editor/`)
- ❌ Auto-save with 2s debounce
- ❌ Slide thumbnail sidebar
- ❌ Drag-to-reorder slides
- ❌ Image upload to Supabase Storage
- ❌ Theme panel

---

#### AI Generation (/presentations/generate)
**Current Status:** 🔴 Placeholder exists  
**Component File:** `src/pages/presentations/PresentationGenerate.tsx`

**Needed Implementation:**
- ❌ Edge Function: `supabase/functions/generate-presentation`
- ❌ OpenAI/Anthropic API integration
- ❌ Streaming response display
- ❌ Thinking display component
- ❌ Prompt templates

---

## Technical Specifications

### Design System (Soft Intelligence)
**Colors:**
- Primary: #F5A623 (Warm Amber)
- Secondary: #4A5568 (Deep Indigo)
- Muted: #718096 (Soft Slate)
- Accent: #38B2AC (Muted Teal)

**Typography:**
- Font: Inter
- H1: 32px bold
- H2: 28px semibold
- Body: 16px regular
- Small: 14px regular

**Spacing:** 8px grid (4px, 8px, 16px, 24px, 32px, 48px, 64px)  
**Border Radius:** 6px, 8px, 12px, 16px  
**Shadows:** 4 elevation levels

### Performance Targets
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total Bundle Size: < 500KB (gzipped)

### Key Dependencies
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "@tanstack/react-query": "^5.17.0",
  "zustand": "^5.0.8",
  "@udecode/plate": "^31.0.0",
  "@supabase/supabase-js": "^2.39.0"
}
```

---

## Migration Notes

### Pitch Deck → Presentations Merge

**Current State:**
- Two separate systems exist:
  1. `/pitch-deck-wizard`, `/pitch-deck/:deckId` (older system)
  2. `/presentations/*` (new system)

**Migration Plan:**
1. **Phase 1:** Build out Presentations system completely
2. **Phase 2:** Create data migration script
3. **Phase 3:** Update routes to redirect old → new
4. **Phase 4:** Deprecate old pages
5. **Phase 5:** Remove old code after verification

**Data Migration Script:**
```sql
-- Example migration
INSERT INTO presentations (
  id, profile_id, title, description, content, status, created_at
)
SELECT
  id, user_id, title, description,
  data::jsonb, 'complete', created_at
FROM pitch_decks
WHERE deleted_at IS NULL;
```

---

## Summary & Next Steps

### Immediate Priorities (Next 2 Weeks)
- [ ] Complete My Presentations UI enhancement
- [ ] Implement multi-select mode
- [ ] Add infinite scroll with TanStack Query
- [ ] Create presentation view page
- [ ] Set up Plate.js editor foundation

### Short-term Goals (1 Month)
- [ ] Launch AI generation functionality
- [ ] Complete presentations workflow (create → edit → share)
- [ ] User testing and feedback collection
- [ ] Performance optimization
- [ ] Bug fixes from beta testing

### Medium-term Goals (2-3 Months)
- [ ] Profile management system
- [ ] Jobs marketplace launch
- [ ] Advanced editor features
- [ ] Analytics dashboard
- [ ] Mobile responsive optimization

### Long-term Vision (6+ Months)
- [ ] Real-time collaborative editing
- [ ] Template marketplace
- [ ] Mobile native app
- [ ] Enterprise white-label features
- [ ] Third-party API integrations

---

## Reference Documentation

### Key Files Referenced
- `/main/pages/sitemap.md` - Complete sitemap with 28 pages
- `/main/pages/my-presentations-implementation-plan.md` - Detailed UI specs
- `/main/pages/pitch-deck-dashboard-plan.md` - Venturekit-style layout
- `/main/UI/` - UI design specifications
- `/reference-presentation-ai/src/components/presentation/` - Reference implementation
- `/src/App.tsx` - Current routing configuration

### Implementation Guides
- **Database Schema:** See RPC functions and table definitions above
- **Multi-Select Pattern:** Reference implementation in `/reference-presentation-ai/`
- **Infinite Scroll:** Use TanStack Query with `useInfiniteQuery`
- **Auto-Save:** Debounce pattern with 2s delay
- **AI Integration:** Edge Functions with OpenAI/Anthropic

### Component Library
- **shadcn/ui:** 40+ pre-built components available
- **Custom Components:** PresentationCard, PageHeader, MetricCard
- **Layouts:** DashboardLayout with sidebar navigation

---

## Conclusion

This comprehensive plan provides:
- ✅ Complete page inventory with status indicators (🟢🟡🔴)
- ✅ Updated sitemap structure with authentication flows
- ✅ Data flow architecture and database schemas
- ✅ User journey maps for key workflows
- ✅ 4-phase implementation roadmap with weekly milestones
- ✅ Technical specifications and design system
- ✅ Migration strategy for legacy systems

**Total Scope:** 28 pages across 4 phases (12+ weeks)  
**Current Progress:** 17 pages complete (60.7%)  
**Next Focus:** Phase 1 - Presentations Core (Weeks 1-5)

---

**Document Version:** 1.0  
**Last Updated:** January 14, 2025  
**Maintained by:** Development Team  
**Next Review:** February 1, 2025
