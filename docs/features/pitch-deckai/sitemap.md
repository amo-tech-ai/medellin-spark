# Medellin AI - Sitemap

**Date Created**: January 13, 2025
**Status**: Complete Architecture Map
**Version**: 1.0

---

## 📊 Sitemap Overview

This document provides a comprehensive map of all pages in the Medellin AI platform, including current implementation status and planned features.

**Last Updated:** October 15, 2025 (Corrected based on actual implementation)

**Legend**:
- ✅ **Implemented** - Page exists and is fully functional
- 🚧 **In Progress** - Routes work but features incomplete
- 📋 **Planned** - Designed but not yet in routing configuration
- 🔒 **Protected** - Requires authentication

**⚠️ CRITICAL UPDATE:**
- 4 presentation routes were marked "📋 Planned" but are actually implemented
- Status corrected to "🚧 In Progress" with detailed gap analysis
- See `21-COMPLETE-ANALYSIS-REPORT.md` for full breakdown

---

## 🌐 Site Structure

```
Medellin AI Platform
│
├── Public Pages (No Auth Required)
│   ├── Home (/)
│   ├── About (/about)
│   ├── Events (/events)
│   ├── Perks (/perks)
│   ├── Programs (/programs)
│   ├── Blog (/blog)
│   ├── Startups (/startups)
│   ├── Founders (/founders)
│   ├── Startup Profile (/startup-profile)
│   ├── Skills & Experience (/skills-experience)
│   ├── Profile View (/profile/:id?)
│   ├── Jobs (/jobs)
│   ├── Contact (/contact)
│   ├── Pitch Deck Info (/pitch-deck)
│   └── Authentication (/auth)
│
├── Authenticated Pages (🔒 Auth Required)
│   ├── Dashboard (/dashboard)
│   ├── Dashboard Events (/dashboard/events)
│   ├── Dashboard Settings (/dashboard/settings)
│   │
│   ├── Presentations
│   │   ├── My Presentations (/presentations)
│   │   ├── Presentation View (/presentations/:id)
│   │   ├── Presentation Editor (/presentations/:id/edit)
│   │   ├── AI Generation (/presentations/generate)
│   │   ├── Pitch Deck Wizard (/pitch-deck-wizard)
│   │   ├── Pitch Deck View (/pitch-deck/:deckId)
│   │   └── Pitch Deck Edit (/pitch-deck/:deckId/edit)
│   │
│   └── Jobs Marketplace
│       ├── Browse Jobs (/jobs/browse)
│       ├── Job Details (/jobs/:jobId)
│       ├── My Applications (/jobs/applications)
│       └── Post a Job (/jobs/post)
│
└── Error Pages
    ├── 404 Not Found (/*)
    └── 403 Unauthorized (auto-redirect to /auth)
```

---

## 📄 Detailed Page Index

### Public Pages (18 total) ✅ ALL IMPLEMENTED

#### 1. Home Page
- **Route**: `/`
- **Status**: ✅ Implemented
- **File**: `src/pages/Home.tsx`
- **Purpose**: Landing page, hero section, value proposition
- **Features**:
  - Hero section with CTA
  - Feature highlights
  - Social proof (testimonials, stats)
  - Call-to-action sections
- **Auth**: Public

---

#### 2. About Page
- **Route**: `/about`
- **Status**: ✅ Implemented
- **File**: `src/pages/About.tsx`
- **Purpose**: Company mission, team, story
- **Features**:
  - Mission statement
  - Team profiles
  - Company values
  - History timeline
- **Auth**: Public

---

#### 3. Events Page
- **Route**: `/events`
- **Status**: ✅ Implemented
- **File**: `src/pages/Events.tsx`
- **Purpose**: Public events listing
- **Features**:
  - Upcoming events calendar
  - Event cards with details
  - Filter by category, date
  - Registration CTAs
- **Auth**: Public

---

#### 4. Perks Page
- **Route**: `/perks`
- **Status**: ✅ Implemented
- **File**: `src/pages/Perks.tsx`
- **Purpose**: Member benefits showcase
- **Features**:
  - Perks catalog
  - Partner logos
  - Discount details
  - Membership tiers
- **Auth**: Public

---

#### 5. Programs Page
- **Route**: `/programs`
- **Status**: ✅ Implemented
- **File**: `src/pages/Programs.tsx`
- **Purpose**: Accelerator/incubator programs
- **Features**:
  - Program descriptions
  - Application process
  - Success stories
  - Apply CTAs
- **Auth**: Public

---

#### 6. Blog Page
- **Route**: `/blog`
- **Status**: ✅ Implemented
- **File**: `src/pages/Blog.tsx`
- **Purpose**: Content hub, articles, resources
- **Features**:
  - Article grid
  - Categories/tags
  - Search functionality
  - Featured posts
- **Auth**: Public

---

#### 7. Startups Directory
- **Route**: `/startups`
- **Status**: ✅ Implemented
- **File**: `src/pages/Startups.tsx`
- **Purpose**: Showcase member startups
- **Features**:
  - Startup cards with logos
  - Filter by industry, stage
  - Search functionality
  - Startup profiles (links)
- **Auth**: Public

---

#### 8. Founders Directory
- **Route**: `/founders`
- **Status**: ✅ Implemented
- **File**: `src/pages/Founders.tsx`
- **Purpose**: Directory of founders and entrepreneurs
- **Features**:
  - Founder profiles
  - Search and filtering
  - Connect with founders
  - View founder portfolios
- **Auth**: Public

---

#### 9. Startup Profile Page
- **Route**: `/startup-profile`
- **Status**: ✅ Implemented
- **File**: `src/pages/StartupProfile.tsx`
- **Purpose**: Public startup profile creation/viewing
- **Features**:
  - Startup information display
  - Team members
  - Product details
  - Funding information
- **Auth**: Public

---

#### 10. Skills & Experience Page
- **Route**: `/skills-experience`
- **Status**: ✅ Implemented
- **File**: `src/pages/SkillsExperience.tsx`
- **Purpose**: Skills and experience showcase
- **Features**:
  - Skills listing
  - Experience timeline
  - Portfolio items
  - Endorsements
- **Auth**: Public

---

#### 11. Profile View Page
- **Route**: `/profile/:id?`
- **Status**: ✅ Implemented
- **File**: `src/pages/Profile.tsx`
- **Purpose**: View user profiles (public or own)
- **Features**:
  - Profile information
  - User presentations
  - Contact details
  - Professional background
- **Auth**: Public (with optional ID parameter for any profile)

---

#### 12. Jobs Board (Public View)
- **Route**: `/jobs`
- **Status**: ✅ Implemented
- **File**: `src/pages/Jobs.tsx`
- **Purpose**: Public job listings
- **Features**:
  - Job cards
  - Basic search
  - Filter by location, role
  - "Sign in to apply" CTA
- **Auth**: Public
- **Note**: Full marketplace features require authentication

---

#### 13. Contact Page
- **Route**: `/contact`
- **Status**: ✅ Implemented
- **File**: `src/pages/Contact.tsx`
- **Purpose**: Contact form, inquiries
- **Features**:
  - Contact form
  - Office locations
  - Social media links
  - Email/phone info
- **Auth**: Public

---

#### 14. Pitch Deck Info Page
- **Route**: `/pitch-deck`
- **Status**: ✅ Implemented
- **File**: `src/pages/PitchDeck.tsx`
- **Purpose**: Marketing page for pitch deck tool
- **Features**:
  - Product overview
  - Feature highlights
  - Demo video/screenshots
  - "Get Started" CTA → redirects to `/pitch-deck-wizard`
- **Auth**: Public

---

#### 15. Authentication Page
- **Route**: `/auth`
- **Status**: ✅ Implemented
- **File**: `src/pages/Auth.tsx`
- **Purpose**: Sign in/sign up
- **Features**:
  - Email/password login
  - OAuth providers (GitHub, Google, etc.)
  - Sign up form
  - Password reset link
- **Auth**: Public
- **Redirects**: After login → `/dashboard` or previous page

---

### Protected Pages (🔒 Authentication Required)

#### 16. Dashboard (Main)
- **Route**: `/dashboard`
- **Status**: ✅ Implemented
- **File**: `src/pages/Dashboard.tsx`
- **Purpose**: User's main dashboard home
- **Features**:
  - Welcome message
  - Quick stats (presentations, events, applications)
  - Recent activity feed
  - Quick actions (Create Deck, Browse Jobs, Register Event)
  - Notifications
- **Auth**: 🔒 Protected
- **UI Plan**: Not yet created (recommended)

---

#### 17. Dashboard Events
- **Route**: `/dashboard/events`
- **Status**: ✅ Implemented
- **File**: `src/pages/DashboardEvents.tsx`
- **Purpose**: User's registered events
- **Features**:
  - My registered events
  - Upcoming events
  - Past events
  - Event details
  - Cancel registration
- **Auth**: 🔒 Protected

---

#### 18. Dashboard Settings
- **Route**: `/dashboard/settings`
- **Status**: ✅ Implemented
- **File**: `src/pages/DashboardSettings.tsx`
- **Purpose**: Account settings, preferences
- **Features**:
  - Profile settings
  - Account security
  - Email preferences
  - Notification settings
  - Delete account
- **Auth**: 🔒 Protected

---

### Presentations Section (🔒 Protected)

#### 19. My Presentations Page
- **Route**: `/presentations`
- **Status**: 🚧 In Progress (Routes ✅ | CRUD ✅ | Multi-Select 🔴 | Infinite Scroll 🔴)
- **File**: `src/pages/presentations/MyPresentations.tsx`
- **UI Plan**: `/home/sk/medellin-spark/main/UI/01-my-presentations-ui-plan.md`
- **Purpose**: User's presentation library and dashboard

**✅ Implemented:**
  - ✅ Route working at `/presentations`
  - ✅ Personalized greeting (Good morning, Name!)
  - ✅ 4 creation options (AI, Template, Blank, Budgeting)
  - ✅ Grid of presentations
  - ✅ Basic CRUD (create, read, delete, duplicate)
  - ✅ Stats display (total, draft, complete counts)

**🔴 Missing (from reference):**
  - 🔴 Multi-select mode (needs Zustand state)
  - 🔴 SelectionControls component (bulk delete)
  - 🔴 Infinite scroll (needs TanStack Query useInfiniteQuery)
  - 🔴 Sort/Filter UI (recent, name, status filters)
  - 🔴 Search bar
  - 🔴 Advanced PresentationsSidebar component

**Components:**
  - ✅ PageHeader.tsx (greeting + stats)
  - ✅ CreateNewSection.tsx (4 creation cards)
  - ⚠️ PresentationCard.tsx (basic, needs multi-select state)
  - 🔴 Missing: PresentationsSidebar.tsx (from reference)
  - 🔴 Missing: SelectionControls.tsx (from reference)

- **Auth**: 🔒 Protected
- **Priority**: HIGH - Add multi-select + infinite scroll
- **Reference**: See `reference-presentation-ai/src/components/presentation/dashboard/`

---

#### 20. Presentation View
- **Route**: `/presentations/:id`
- **Status**: 🚧 In Progress (Routes ✅ | Rendering 🔴 | Export 🔴)
- **File**: `src/pages/presentations/PresentationView.tsx`
- **Purpose**: View presentation in read-only mode

**✅ Implemented:**
  - ✅ Route working at `/presentations/:id`
  - ✅ Fetches presentation by ID from Supabase
  - ✅ Basic page structure

**🔴 Current Issue:**
  - 🔴 Shows JSON dump instead of rendered slides
  - 🔴 No slide navigation
  - 🔴 No present mode

**🔴 Missing (from reference):**
  - 🔴 SlidePreview.tsx - Render Plate.js content
  - 🔴 SlideContainer.tsx - Layout wrapper
  - 🔴 PresentButton.tsx - Full-screen mode
  - 🔴 ExportButton.tsx - PDF/PPTX export
  - 🔴 ShareButton.tsx - Share link generation

- **Auth**: 🔒 Protected (owner or public link)
- **Priority**: HIGH - Add slide renderer
- **Reference**: See `reference-presentation-ai/src/components/presentation/presentation-page/`

---

#### 21. Presentation Editor
- **Route**: `/presentations/:id/edit`
- **Status**: 🚧 In Progress (Routes ✅ | Editor 🔴 PLACEHOLDER)
- **File**: `src/pages/presentations/PresentationEditor.tsx`
- **Purpose**: Edit presentation content

**✅ Implemented:**
  - ✅ Route working at `/presentations/:id/edit`
  - ✅ Basic page structure
  - ✅ Placeholder text

**🔴 Current Issue:**
  - 🔴 Shows "⚠️ Plate.js Editor Integration Needed"
  - 🔴 No actual editor functionality

**🔴 Missing (from reference) - CRITICAL:**
  - 🔴 /components/plate/ (180+ files) - Entire Plate.js editor
  - 🔴 presentation-editor.tsx - Main editor component
  - 🔴 custom-elements/ (102 files) - Charts, diagrams, etc.
  - 🔴 dnd/ (14 files) - Drag & drop system
  - 🔴 plugins/ (25 files) - Editor plugins
  - 🔴 Auto-save with debounce
  - 🔴 Slide sidebar
  - 🔴 Theme panel
  - 🔴 Undo/Redo

**Components Needed:**
  - 🔴 `src/components/plate/` (180+ files) - Core editor
  - 🔴 `src/components/presentation/editor/` (140+ files)

- **Auth**: 🔒 Protected (owner only)
- **Priority**: 🔴 CRITICAL BLOCKER - Core product feature
- **Timeline**: Week 1-2 of conversion plan
- **Reference**: See `reference-presentation-ai/src/components/plate/`

---

#### 22. AI Presentation Generation
- **Route**: `/presentations/generate`
- **Status**: 🚧 In Progress (Routes ✅ | AI 🔴 STUB)
- **File**: `src/pages/presentations/PresentationGenerate.tsx`
- **Purpose**: AI-powered presentation generation

**✅ Implemented:**
  - ✅ Route working at `/presentations/generate`
  - ✅ Basic form structure
  - ✅ Prompt input field

**🔴 Current Issue:**
  - 🔴 Shows "TODO: Implement Edge Function"
  - 🔴 No actual AI generation

**🔴 Missing (from reference) - CRITICAL:**
  - 🔴 Edge Function (supabase/functions/generate-presentation)
  - 🔴 OpenAI/Anthropic integration
  - 🔴 Streaming response handling
  - 🔴 ModelPicker.tsx - AI model selection
  - 🔴 ThinkingDisplay.tsx - Show AI thinking process
  - 🔴 WebSearchToggle.tsx - Enable/disable web search
  - 🔴 outline/ components (6 files) - Outline generation UI
  - 🔴 PresentationGenerationManager.tsx - Orchestrates flow

**Backend Needed:**
  - 🔴 `supabase/functions/generate-presentation/index.ts`
  - 🔴 OpenAI streaming integration
  - 🔴 Tavily web search integration (optional)

**Components Needed:**
  - 🔴 `src/components/presentations/ModelPicker.tsx`
  - 🔴 `src/components/presentations/ThinkingDisplay.tsx`
  - 🔴 `src/components/presentations/outline/` (6 files)

- **Auth**: 🔒 Protected
- **Priority**: 🔴 CRITICAL - Differentiating feature
- **Timeline**: Week 4 of conversion plan
- **Reference**: See `reference-presentation-ai/src/app/api/presentation/`

---

#### 23. Pitch Deck Wizard
- **Route**: `/pitch-deck-wizard`
- **Status**: 🚧 Implemented (AI generation in progress)
- **File**: `src/pages/PitchDeckWizard.tsx`
- **Purpose**: AI-powered pitch deck generation wizard
- **Features**:
  - Multi-step form (5 questions)
  - Company name, description, industry, stage, audience
  - AI generation (OpenAI GPT-4)
  - Progress indicator
  - Preview generated deck
  - Save and redirect to editor
- **Auth**: 🔒 Protected
- **Flow**: Wizard → AI generates slides → Redirects to `/pitch-deck/:deckId/slides`

---

#### 24. Pitch Deck View
- **Route**: `/pitch-deck/:deckId`
- **Status**: ✅ Implemented
- **File**: `src/components/PitchDeckPreview.tsx`
- **Purpose**: View complete pitch deck (read-only)
- **Features**:
  - Full deck preview
  - Slide navigation
  - Export options (PDF, PPTX)
  - Share link generation
  - "Edit" button → redirects to `/pitch-deck/:deckId/edit`
- **Auth**: 🔒 Protected (owner or public link)

---

#### 25. Pitch Deck Edit
- **Route**: `/pitch-deck/:deckId/edit`
- **Status**: ✅ Implemented (uses same component as view)
- **File**: `src/components/PitchDeckPreview.tsx`
- **Purpose**: Edit pitch deck
- **Auth**: 🔒 Protected (owner only)

---

### Profile Section (Future Enhancement)

**Note**: Profile routes exist for viewing (`/profile/:id?`) but editing routes are not yet implemented.

#### Future: My Profile Edit
- **Route**: `/profile/edit`
- **Status**: 📋 Planned (Not in current routes)
- **File**: Not yet created
- **UI Plan**: `/home/sk/medellin-spark/main/UI/03-professional-profile-ui-plan.md`
- **Purpose**: Dedicated profile editing page
- **Features**:
  - Form fields for all profile data
  - Avatar upload
  - Skills management
  - Experience CRUD
  - Save/Cancel buttons
- **Auth**: 🔒 Protected (own profile)
- **Note**: May be implemented as modal instead of separate page

---

### Jobs Marketplace Section (Future Enhancement)

**Note**: Only base `/jobs` route currently exists. All sub-routes are planned but not yet implemented.

#### Future: Jobs Marketplace (Browse)
- **Route**: `/jobs/browse`
- **Status**: 📋 Planned (Not in current routes)
- **File**: Not yet created
- **UI Plan**: `/home/sk/medellin-spark/main/UI/04-jobs-marketplace-ui-plan.md`
- **Purpose**: Full jobs marketplace with advanced features
- **Features**:
  - Search bar with auto-complete
  - Advanced filters (location, remote, stage, salary, equity)
  - Job cards with featured badge
  - "View Pitch Deck" link (review company)
  - "Apply Now" button
  - Save jobs for later
  - Sort options (Recent, Salary, Equity)
- **Auth**: 🔒 Protected (for applying, saving)
- **Component**: `JobsMarketplacePage`
- **Design Status**: ✅ Complete UI specification

#### Future: Job Details Page
- **Route**: `/jobs/:jobId`
- **Status**: 📋 Planned (Not in current routes)
- **File**: Not yet created
- **Purpose**: Full job listing details

#### Future: My Applications Page
- **Route**: `/jobs/applications`
- **Status**: 📋 Planned (Not in current routes)
- **File**: Not yet created
- **Purpose**: Track user's job applications

#### Future: Post a Job Page
- **Route**: `/jobs/post`
- **Status**: 📋 Planned (Not in current routes)
- **File**: Not yet created
- **Purpose**: Employers post job listings

---

### Error Pages

#### 26. 404 Not Found
- **Route**: `/*` (catch-all)
- **Status**: ✅ Implemented
- **File**: `src/pages/NotFound.tsx`
- **Purpose**: Handle invalid routes
- **Features**:
  - 404 error message
  - Search bar
  - Navigation links
  - "Go Home" button
- **Auth**: Public

---

#### 27. 403 Unauthorized (Auto-redirect)
- **Route**: N/A (handled by `ProtectedRoute` component)
- **Status**: ✅ Implemented
- **File**: `src/components/ProtectedRoute.tsx`
- **Purpose**: Redirect unauthenticated users
- **Behavior**: Redirects to `/auth`
- **Auth**: Automatic
- **Note**: Return URL preservation recommended for improved UX

---

## 🗺️ Navigation Structure

### Primary Navigation (Navbar)
```
Logo | Home | About | Events | Programs | Perks | Blog | Startups | Jobs | Contact
                                                                    [Sign In] [Get Started]
```

**Authenticated Navigation**:
```
Logo | Dashboard | My Presentations | Jobs | Profile
                                              [Avatar Dropdown]
                                                ├─ Dashboard
                                                ├─ My Presentations
                                                ├─ Profile
                                                ├─ Settings
                                                └─ Sign Out
```

---

### Footer Navigation
```
Company          Product             Resources          Connect
├─ About         ├─ Pitch Deck      ├─ Blog            ├─ Twitter
├─ Events        ├─ Templates       ├─ Help Center     ├─ LinkedIn
├─ Programs      ├─ Pricing         ├─ API Docs        ├─ GitHub
├─ Contact       └─ Enterprise      └─ Status          └─ Instagram
└─ Careers
```

---

## 📊 Route Hierarchy Map

```
/ (Home)
│
├─ /about
├─ /events
├─ /perks
├─ /programs
├─ /blog
│   └─ /blog/:slug (future)
├─ /startups
│   └─ /startups/:startupId (future)
├─ /jobs
│   ├─ /jobs/browse (🔒)
│   ├─ /jobs/:jobId
│   ├─ /jobs/applications (🔒)
│   └─ /jobs/post (🔒)
├─ /contact
├─ /pitch-deck (info page)
└─ /auth
    ├─ ?mode=login
    ├─ ?mode=signup
    └─ ?mode=reset-password

/dashboard (🔒)
├─ /dashboard/events (🔒)
└─ /dashboard/settings (🔒)

/presentations (🔒)

/pitch-deck-wizard (🔒)

/pitch-deck/:deckId (🔒)
├─ /pitch-deck/:deckId/edit (🔒)
└─ /pitch-deck/:deckId/slides (🔒)

/profile (🔒)
├─ /profile/edit (🔒)
└─ /profile/:userId (public/🔒)

/* (404 Not Found)
```

---

## 📈 Implementation Status Summary

### ✅ Fully Implemented (21 pages)
1. Home
2. About
3. Events
4. Perks
5. Programs
6. Blog
7. Startups
8. Founders
9. Startup Profile
10. Skills & Experience
11. Profile View
12. Jobs (public view)
13. Contact
14. Pitch Deck (info page)
15. Auth
16. Dashboard (main)
17. Dashboard Events
18. Dashboard Settings
19. Pitch Deck Wizard
20. Pitch Deck View & Edit
21. 404 Not Found

### 🚧 In Progress - Routes Work, Features Incomplete (4 pages)
1. My Presentations (needs UI polish)
2. Presentation View (needs rendering, currently shows JSON)
3. Presentation Editor (needs Plate.js integration)
4. AI Presentation Generation (needs Edge Function)

### 📋 Planned - UI Designed But Not in Routes (6 pages)
1. Pitch Deck Slides Dashboard ✅ UI designed (route not implemented)
2. Profile Edit ✅ UI designed (route not implemented)
3. Jobs Marketplace (Browse) ✅ UI designed (route not implemented)
4. Job Details (route not implemented)
5. My Applications (route not implemented)
6. Post a Job (route not implemented)

### 📋 Future Enhancements (4 pages)
1. Blog Post Detail (`/blog/:slug`)
2. Startup Detail (`/startups/:startupId`)
3. Advanced Dashboard Home (current is basic)
4. Public Profile (may use same component as Profile View)

---

## 🎯 Recommended Implementation Order

### Phase 1: Core Presentation Features (Weeks 1-4)
1. **My Presentations Page** (`/presentations`)
   - Priority: HIGH
   - UI Design: ✅ Complete
   - Dependency: None
   - Impact: Central hub for users

2. **Pitch Deck Slides Dashboard** (`/pitch-deck/:deckId/slides`)
   - Priority: HIGH
   - UI Design: ✅ Complete
   - Dependency: My Presentations
   - Impact: Core editing experience

### Phase 2: Profile & Identity (Weeks 5-6)
3. **My Profile Page** (`/profile`)
   - Priority: MEDIUM
   - UI Design: ✅ Complete
   - Dependency: None
   - Impact: Professional identity

4. **Public Profile Page** (`/profile/:userId`)
   - Priority: MEDIUM
   - UI Design: ✅ Complete (shared with My Profile)
   - Dependency: My Profile
   - Impact: Social features

### Phase 3: Jobs Marketplace (Weeks 7-10)
5. **Jobs Marketplace Browse** (`/jobs/browse`)
   - Priority: HIGH
   - UI Design: ✅ Complete
   - Dependency: Profile
   - Impact: Revenue/engagement driver

6. **Job Details Page** (`/jobs/:jobId`)
   - Priority: MEDIUM
   - Dependency: Jobs Browse
   - Impact: Job discovery

7. **My Applications Page** (`/jobs/applications`)
   - Priority: MEDIUM
   - Dependency: Jobs Browse
   - Impact: User tracking

8. **Post a Job Page** (`/jobs/post`)
   - Priority: LOW (employer-focused)
   - Dependency: Jobs Browse
   - Impact: Employer engagement

### Phase 4: Polish & Secondary Features (Weeks 11-12)
9. **Enhanced Dashboard Home**
   - Priority: LOW
   - Improve current basic dashboard
   - Add widgets, analytics

10. **Blog Post Detail** (`/blog/:slug`)
    - Priority: LOW
    - Individual blog post pages

11. **Startup Detail** (`/startups/:startupId`)
    - Priority: LOW
    - Individual startup profile pages

---

## 🔗 Route Parameters & Query Strings

### Dynamic Routes
```typescript
// Pitch Deck
/pitch-deck/:deckId
  - deckId: UUID (deck identifier)
  - Example: /pitch-deck/a1b2c3d4-e5f6-7890-abcd-ef1234567890

/pitch-deck/:deckId/edit
  - deckId: UUID
  - Example: /pitch-deck/a1b2c3d4-e5f6-7890-abcd-ef1234567890/edit

/pitch-deck/:deckId/slides
  - deckId: UUID
  - Example: /pitch-deck/a1b2c3d4-e5f6-7890-abcd-ef1234567890/slides

// Profile
/profile/:userId
  - userId: UUID (user identifier)
  - Example: /profile/b2c3d4e5-f6a7-8901-bcde-f12345678901

// Jobs
/jobs/:jobId
  - jobId: UUID (job identifier)
  - Example: /jobs/c3d4e5f6-a7b8-9012-cdef-123456789012

// Blog (future)
/blog/:slug
  - slug: string (URL-friendly title)
  - Example: /blog/how-to-pitch-to-investors

// Startups (future)
/startups/:startupId
  - startupId: UUID or slug
  - Example: /startups/acme-fintech
```

### Query Parameters
```typescript
// Auth
/auth?mode=login
/auth?mode=signup
/auth?mode=reset-password
/auth?redirect=/dashboard  // Return URL after login

// Jobs Browse
/jobs/browse?search=designer
/jobs/browse?location=remote
/jobs/browse?salary_min=100000
/jobs/browse?equity_min=0.5

// Blog
/blog?category=pitch-deck
/blog?tag=ai

// Startups
/startups?industry=fintech
/startups?stage=seed
```

---

## 🔐 Authentication & Authorization Matrix

| Route | Public Access | Auth Required | Owner Only | Admin Only |
|-------|---------------|---------------|------------|------------|
| `/` | ✅ | ❌ | ❌ | ❌ |
| `/about` | ✅ | ❌ | ❌ | ❌ |
| `/events` | ✅ | ❌ | ❌ | ❌ |
| `/perks` | ✅ | ❌ | ❌ | ❌ |
| `/programs` | ✅ | ❌ | ❌ | ❌ |
| `/blog` | ✅ | ❌ | ❌ | ❌ |
| `/startups` | ✅ | ❌ | ❌ | ❌ |
| `/jobs` | ✅ (limited) | ❌ | ❌ | ❌ |
| `/contact` | ✅ | ❌ | ❌ | ❌ |
| `/pitch-deck` | ✅ | ❌ | ❌ | ❌ |
| `/auth` | ✅ | ❌ | ❌ | ❌ |
| `/dashboard` | ❌ | ✅ | ✅ | ❌ |
| `/dashboard/events` | ❌ | ✅ | ✅ | ❌ |
| `/dashboard/settings` | ❌ | ✅ | ✅ | ❌ |
| `/presentations` | ❌ | ✅ | ✅ | ❌ |
| `/pitch-deck-wizard` | ❌ | ✅ | ✅ | ❌ |
| `/pitch-deck/:deckId` | Public link | ✅ | ✅ | ❌ |
| `/pitch-deck/:deckId/edit` | ❌ | ✅ | ✅ | ❌ |
| `/pitch-deck/:deckId/slides` | ❌ | ✅ | ✅ | ❌ |
| `/profile` | ❌ | ✅ | ✅ | ❌ |
| `/profile/:userId` | ✅ (public) | ✅ (full) | N/A | ❌ |
| `/profile/edit` | ❌ | ✅ | ✅ | ❌ |
| `/jobs/browse` | ✅ (limited) | ✅ (full) | ❌ | ❌ |
| `/jobs/:jobId` | ✅ | ✅ | ❌ | ❌ |
| `/jobs/applications` | ❌ | ✅ | ✅ | ❌ |
| `/jobs/post` | ❌ | ✅ | N/A | ❌ |

---

## 📱 Mobile-Specific Routes (Future)

### Potential Mobile App Routes
```
/mobile/onboarding
/mobile/camera-scan (business card scan)
/mobile/qr-code (event check-in)
/mobile/notifications
```

**Note**: Not currently planned, but architecture supports mobile apps.

---

## 🧭 Breadcrumb Patterns

### Example Breadcrumbs
```
Home > My Presentations
Home > My Presentations > Q1 Investor Pitch > Slides
Home > Profile
Home > Profile > Edit
Home > Jobs > Browse
Home > Jobs > Senior Designer > Apply
Home > Dashboard > Events
```

---

## 🔍 SEO & Meta Tags

### Key SEO Pages (with unique meta tags)
1. Home (`/`) - Primary landing page
2. About (`/about`) - Company info
3. Pitch Deck (`/pitch-deck`) - Product marketing
4. Blog (`/blog`) - Content hub
5. Jobs (`/jobs`) - Job board SEO
6. Startups (`/startups`) - Startup directory

### Dynamic SEO (per page)
- `/blog/:slug` - Blog post title + description
- `/jobs/:jobId` - Job title + company + location
- `/profile/:userId` - User name + title
- `/pitch-deck/:deckId` (public) - Deck title + company

---

## 🎨 Design System Consistency

All pages follow the **Soft Intelligence** design system:
- Color palette: Warm Amber, Deep Indigo, Soft Slate, Muted Teal
- Typography: Inter font family
- Spacing: 4px grid system
- Components: shadcn/ui base
- Responsive: Mobile-first, 4 breakpoints

**Reference**: `/home/sk/medellin-spark/main/UI/00-design-prompt-template.md`

---

## 📊 Analytics & Tracking

### Key User Journeys to Track
1. **Sign-up → First Deck Created** (onboarding funnel)
2. **Landing Page → Pitch Deck Info → Sign Up** (marketing funnel)
3. **Job Browse → Job Detail → Apply** (job marketplace funnel)
4. **Profile View → Contact** (networking funnel)

### Pages with High Analytics Priority
- `/` (home) - Entry point
- `/pitch-deck` - Product marketing
- `/auth` - Conversion point
- `/presentations` - Core feature
- `/jobs/browse` - Marketplace

---

## 🚀 Future Expansion Routes

### Potential Future Pages (not in current scope)
```
/templates (template library)
/templates/:templateId
/pricing (paid plans)
/enterprise (B2B sales)
/api-docs (developer docs)
/help (help center)
/help/:articleId
/changelog (product updates)
/status (system status)
/investors (investor portal)
/investors/dashboard
/admin (admin panel)
/admin/users
/admin/jobs
/admin/analytics
```

---

## ✅ Implementation Checklist

### Current Implementation
- [x] 17 pages implemented and functional
- [x] Authentication flow working
- [x] Protected routes enforced
- [x] Basic dashboard features
- [x] Pitch deck wizard (AI generation)

### Next Steps
- [ ] Implement My Presentations page
- [ ] Implement Pitch Deck Slides Dashboard
- [ ] Implement Profile pages (My + Public)
- [ ] Implement Jobs Marketplace (Browse)
- [ ] Implement Job Details page
- [ ] Implement My Applications page
- [ ] Implement Post a Job page
- [ ] Add breadcrumbs to all pages
- [ ] Add SEO meta tags to all pages
- [ ] Set up analytics tracking

---

**Document Status**: ✅ Updated and Validated
**Version**: 1.1
**Created**: January 13, 2025
**Last Updated**: October 14, 2025
**Maintained By**: Medellin AI Product Team

---

**Total Pages**: 35+ (21 fully implemented, 4 in progress, 6 designed but not routed, 4+ future)
**Total Routes**: 28 active routes in App.tsx
**Validation Report**: See `/home/sk/medellin-spark/main/pages/sitemap-validation-report.md` for detailed analysis

---

## 🔍 Validation Notes

This sitemap has been validated against actual implementation on October 14, 2025.

**Key Findings**:
- ✅ 21 routes fully functional and production-ready
- 🚧 4 presentation routes exist but need Plate.js/Edge Function integration
- 🔴 6 planned routes (jobs marketplace, profile edit) not yet in routing configuration
- ✅ Auth implementation follows best practices
- 🟡 Return URL preservation recommended for auth flow

**For complete validation findings, see**: `sitemap-validation-report.md`

---

**Ready for production deployment with documented limitations!** 🚀
