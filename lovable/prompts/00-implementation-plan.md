# Implementation Plan - Jobs, Events, Perks Features

**Created:** January 21, 2025  
**Status:** Ready for Implementation  
**Total Estimated Time:** 16-22 hours

---

## 🎯 Overview

This plan covers the implementation of 6 critical features for the Medellín Spark platform:
1. Jobs Dashboard (dashboard page)
2. Jobs Listing Page (browse all jobs)
3. Job Detail Page (single job view)
4. Event Detail Page (single event view)
5. Perk Detail Page (single perk view)
6. Post Job Form (submit new jobs)

---

## 📊 Current State Analysis

### ✅ What Already Exists

**Routes in App.tsx:**
- `/dashboard/jobs` → `DashboardJobs` component (lines 85)
- `/jobs` → `Jobs` component (line 74)
- `/jobs/:id` → `JobDetail` component (line 75)
- `/events/:id` → `EventDetail` component (line 65)
- `/perks/:id` → `PerkDetail` component (line 67)

**Components Created:**
- `src/pages/DashboardJobs.tsx` - Basic structure with mock data
- `src/components/dashboard/jobs/JobCard.tsx` - Job card component
- `src/pages/Jobs.tsx` - Jobs listing with mock data
- `src/pages/JobDetail.tsx` - Stub component (needs implementation)
- `src/pages/EventDetail.tsx` - Stub component (needs implementation)
- `src/pages/PerkDetail.tsx` - Stub component (needs implementation)

**Dashboard Infrastructure:**
- `src/components/dashboard/DashboardLayout.tsx` - Layout wrapper
- `src/components/dashboard/DashboardSidebar.tsx` - Sidebar navigation
- `src/components/dashboard/MetricCard.tsx` - Metric display component
- `src/components/dashboard/LoadingState.tsx` - Loading skeleton
- `src/components/dashboard/EmptyState.tsx` - Empty state component

**Database Tables Available:**
- `jobs` - Job postings
- `job_applications` - User applications
- `saved_jobs` - Bookmarked jobs
- `companies` - Company information
- `events` - Event listings
- `registrations` - Event registrations
- `perks` - Perks/benefits
- `perk_claims` - Perk redemptions

### ❌ What Needs to Be Created/Fixed

**Pages Needing Full Implementation:**
1. ❌ **Job Detail Page** - Currently stub, needs full implementation
2. ❌ **Event Detail Page** - Currently stub, needs full implementation
3. ❌ **Perk Detail Page** - Currently stub, needs full implementation
4. ❌ **Post Job Form** - Doesn't exist, needs creation

**Pages Needing Database Connection:**
1. ⚠️ **Jobs Dashboard** - Has UI with mock data, needs DB connection
2. ⚠️ **Jobs Listing** - Has UI with mock data, needs DB connection

**Routes Needed:**
1. ❌ `/post-job` - Not in App.tsx, needs to be added

---

## 🚀 Implementation Order (Prioritized)

### Phase 1: Detail Pages (TIER 1 - Critical) 
**Priority: Start Here - Highest User Impact**

#### 1.1 Job Detail Page (`02-job-detail-page.md`)
- **Route:** `/jobs/:id` ✅ (already exists)
- **Component:** `src/pages/JobDetail.tsx` (needs full implementation)
- **Time:** 2-3 hours
- **Status:** 🔴 STUB EXISTS - NEEDS FULL IMPLEMENTATION
- **Dependencies:** 
  - Queries: `jobs` table, join with `companies`
  - State: Check if user applied, check if job saved
  - Actions: Apply to job, save/unsave job
- **Deliverables:**
  - [ ] Company header with logo and name
  - [ ] Job title and details (type, remote, location, salary)
  - [ ] Job description with proper formatting
  - [ ] Requirements and responsibilities sections
  - [ ] Company information sidebar
  - [ ] Apply and save buttons with functionality
  - [ ] Similar jobs section
  - [ ] Breadcrumb navigation
  - [ ] Loading and empty states
  - [ ] Mobile responsive design

#### 1.2 Event Detail Page (`04-event-detail-page.md`)
- **Route:** `/events/:id` ✅ (already exists)
- **Component:** `src/pages/EventDetail.tsx` (needs full implementation)
- **Time:** 2-3 hours
- **Status:** 🔴 STUB EXISTS - NEEDS FULL IMPLEMENTATION
- **Dependencies:**
  - Queries: `events` table, join with `organizers`
  - State: Check if user registered
  - Actions: Register for event, save event
- **Deliverables:**
  - [ ] Event banner image with title overlay
  - [ ] Date, time, location details
  - [ ] Event description
  - [ ] Organizer information
  - [ ] Register and save buttons
  - [ ] Similar events section
  - [ ] Loading and empty states
  - [ ] Mobile responsive with sticky CTA

#### 1.3 Perk Detail Page (`03-perk-detail-page.md`)
- **Route:** `/perks/:id` ✅ (already exists)
- **Component:** `src/pages/PerkDetail.tsx` (needs full implementation)
- **Time:** 2-3 hours
- **Status:** 🔴 STUB EXISTS - NEEDS FULL IMPLEMENTATION
- **Dependencies:**
  - Queries: `perks` table
  - State: Check if user claimed/saved perk
  - Actions: Claim perk, save perk, copy promo code
- **Deliverables:**
  - [ ] Provider logo and perk title
  - [ ] Value/savings highlight
  - [ ] Perk description and benefits
  - [ ] Promo code display with copy button
  - [ ] How to redeem instructions
  - [ ] Provider information
  - [ ] Related perks section
  - [ ] Loading and empty states

**Phase 1 Total:** 6-9 hours

---

### Phase 2: Database Integration (TIER 1 - Critical)
**Priority: After Detail Pages - Core Functionality**

#### 2.1 Jobs Listing - Database Connection (`02-jobs-listing-page.md`)
- **Route:** `/jobs` ✅ (already exists)
- **Component:** `src/pages/Jobs.tsx` (needs DB connection)
- **Time:** 2-3 hours
- **Status:** 🟡 UI EXISTS WITH MOCK DATA - NEEDS DB CONNECTION
- **Current State:** 
  - Has beautiful UI with search and filters
  - Shows 3-5 mock job cards
  - Has proper responsive design
- **Needs:**
  - [ ] Connect to `jobs` table via Supabase
  - [ ] Implement real-time search functionality
  - [ ] Implement category filters
  - [ ] Join with `companies` for company data
  - [ ] Add pagination or infinite scroll
  - [ ] Link cards to `/jobs/:id`
  - [ ] Add loading states
  - [ ] Add empty states
- **Query Requirements:**
  ```sql
  SELECT jobs.*, companies.name, companies.logo_url
  FROM jobs
  JOIN companies ON jobs.company_id = companies.id
  WHERE jobs.status = 'published'
  AND jobs.deleted_at IS NULL
  ORDER BY jobs.created_at DESC
  ```

#### 2.2 Jobs Dashboard - Database Connection (`01-jobs-dashboard.md`)
- **Route:** `/dashboard/jobs` ✅ (already exists)
- **Component:** `src/pages/DashboardJobs.tsx` (needs DB connection)
- **Time:** 2-3 hours
- **Status:** 🟡 UI EXISTS WITH MOCK DATA - NEEDS DB CONNECTION
- **Current State:**
  - Has 4 metric cards with mock numbers
  - Shows job cards in responsive grid
  - Has bookmark and apply functionality (front-end only)
- **Needs:**
  - [ ] Calculate metrics from database:
    - Total applications (count from `job_applications`)
    - Active applications (status = 'pending' OR 'under_review')
    - Interviews (status = 'interview')
    - Saved jobs (count from `saved_jobs`)
  - [ ] Fetch published jobs from DB
  - [ ] Connect bookmark toggle to `saved_jobs` table
  - [ ] Connect apply button to `job_applications` table
  - [ ] Update metrics after user actions
  - [ ] Add proper error handling
- **Query Requirements:**
  ```sql
  -- Metrics queries
  SELECT COUNT(*) FROM job_applications WHERE profile_id = current_user_id
  SELECT COUNT(*) FROM saved_jobs WHERE profile_id = current_user_id
  
  -- Jobs query
  SELECT jobs.*, companies.name, companies.logo_url,
    EXISTS(SELECT 1 FROM job_applications WHERE job_id = jobs.id AND profile_id = current_user_id) as has_applied,
    EXISTS(SELECT 1 FROM saved_jobs WHERE job_id = jobs.id AND profile_id = current_user_id) as is_saved
  FROM jobs
  JOIN companies ON jobs.company_id = companies.id
  WHERE jobs.status = 'published'
  ```

**Phase 2 Total:** 4-6 hours

---

### Phase 3: Form Creation (TIER 2 - High Priority)
**Priority: After Core Features - User Submissions**

#### 3.1 Post Job Form (`03-post-job-form.md`)
- **Route:** `/post-job` ❌ (needs to be added)
- **Component:** `src/pages/PostJob.tsx` (needs to be created)
- **Time:** 3-4 hours
- **Status:** 🔴 DOES NOT EXIST - NEEDS FULL CREATION
- **Dependencies:**
  - Must add route to `src/App.tsx`
  - Form validation with react-hook-form
  - Insert to `jobs` and potentially `companies` tables
- **Deliverables:**
  - [ ] Add `/post-job` route to App.tsx
  - [ ] Create PostJob.tsx page component
  - [ ] Form sections:
    - Company information (name, website, logo, description)
    - Job details (title, category, type, remote)
    - Location & compensation
    - Job description (rich textarea)
    - Requirements and responsibilities
    - Application details (email, URL)
  - [ ] Form validation
  - [ ] Submit to `jobs` table (status = 'pending')
  - [ ] Create/link company in `companies` table
  - [ ] Success state with redirect
  - [ ] Preview feature
  - [ ] Loading and error states
  - [ ] Mobile responsive form

**Phase 3 Total:** 3-4 hours

---

## 📋 Detailed Task Breakdown

### Job Detail Page Implementation
**File:** `src/pages/JobDetail.tsx`

**1. Data Fetching (30 min)**
- [ ] Create custom hook `useJob(id)` or use Tanstack Query
- [ ] Query job with company join
- [ ] Calculate applicants count
- [ ] Check user's applied/saved status

**2. Layout Structure (45 min)**
- [ ] Hero section with company logo and job title
- [ ] Job details row (type, remote, location, posted date)
- [ ] Salary section with highlight
- [ ] Main content sections (description, requirements, responsibilities)
- [ ] Company information sidebar
- [ ] Action buttons (apply, save)

**3. Functionality (45 min)**
- [ ] Apply button → Insert to `job_applications`
- [ ] Save button → Insert/delete from `saved_jobs`
- [ ] Share buttons
- [ ] Similar jobs query

**4. States & Responsiveness (30 min)**
- [ ] Loading skeleton
- [ ] Error/404 state
- [ ] Mobile layout adjustments
- [ ] Sticky apply button on mobile

---

### Event Detail Page Implementation
**File:** `src/pages/EventDetail.tsx`

**1. Data Fetching (30 min)**
- [ ] Create custom hook `useEvent(id)`
- [ ] Query event with organizer join
- [ ] Query venue information
- [ ] Check user's registration status

**2. Layout Structure (45 min)**
- [ ] Banner image with title
- [ ] Event details card (date, time, location, capacity)
- [ ] Description section
- [ ] Organizer section
- [ ] Action buttons (register, save)

**3. Functionality (45 min)**
- [ ] Register button → Insert to `registrations`
- [ ] Save button functionality
- [ ] Share buttons
- [ ] Similar events query

**4. States & Responsiveness (30 min)**
- [ ] Loading skeleton
- [ ] Error/404 state
- [ ] Mobile layout
- [ ] Sticky register button

---

### Perk Detail Page Implementation
**File:** `src/pages/PerkDetail.tsx`

**1. Data Fetching (30 min)**
- [ ] Create custom hook `usePerk(id)`
- [ ] Query perk data
- [ ] Check user's claimed/saved status

**2. Layout Structure (45 min)**
- [ ] Provider logo and perk title
- [ ] Value highlight section
- [ ] Benefits list
- [ ] Promo code display
- [ ] Redemption instructions
- [ ] Provider info
- [ ] Terms accordion

**3. Functionality (45 min)**
- [ ] Copy promo code to clipboard
- [ ] Claim perk → Insert to `perk_claims`
- [ ] Save perk functionality
- [ ] Related perks query

**4. States & Responsiveness (30 min)**
- [ ] Loading skeleton
- [ ] Error/404 state
- [ ] Mobile layout

---

### Jobs Listing Database Connection
**File:** `src/pages/Jobs.tsx`

**1. Data Fetching (45 min)**
- [ ] Create `useJobs()` hook with Tanstack Query
- [ ] Query jobs with companies join
- [ ] Filter by status = 'published'
- [ ] Order by created_at DESC

**2. Search & Filter (60 min)**
- [ ] Implement search across title, company, skills
- [ ] Category filter functionality
- [ ] Real-time query updates
- [ ] Debounce search input

**3. States & Performance (45 min)**
- [ ] Loading state (skeleton cards)
- [ ] Empty state (no jobs found)
- [ ] Pagination or infinite scroll
- [ ] Optimize queries

---

### Jobs Dashboard Database Connection
**File:** `src/pages/DashboardJobs.tsx`

**1. Metrics Queries (45 min)**
- [ ] Total applications count
- [ ] Active applications count
- [ ] Interviews count
- [ ] Saved jobs count
- [ ] Real-time updates on actions

**2. Jobs Query (30 min)**
- [ ] Fetch published jobs with companies
- [ ] Include user's applied/saved status
- [ ] Proper error handling

**3. Actions (45 min)**
- [ ] Bookmark toggle → `saved_jobs` CRUD
- [ ] Apply button → `job_applications` insert
- [ ] Update metrics after actions
- [ ] Toast notifications
- [ ] Optimistic updates

---

### Post Job Form Creation
**File:** `src/pages/PostJob.tsx` (new)

**1. Form Setup (45 min)**
- [ ] Install/setup react-hook-form
- [ ] Define form schema with zod validation
- [ ] Create form sections layout
- [ ] Add all input fields

**2. Validation (45 min)**
- [ ] Required field validation
- [ ] Email and URL validation
- [ ] Character length validation
- [ ] Salary range validation
- [ ] Real-time error display

**3. Submission (60 min)**
- [ ] Check if company exists or create new
- [ ] Insert job with status = 'pending'
- [ ] Link job to company
- [ ] Error handling
- [ ] Success message and redirect

**4. Preview & Polish (45 min)**
- [ ] Preview modal/page
- [ ] Loading states
- [ ] Mobile responsiveness
- [ ] Auto-save to localStorage (optional)

---

## 🗂️ File Structure Plan

```
src/
├── pages/
│   ├── Jobs.tsx                    ⚠️ EXISTS - needs DB connection
│   ├── JobDetail.tsx               🔴 STUB - needs implementation
│   ├── EventDetail.tsx             🔴 STUB - needs implementation
│   ├── PerkDetail.tsx              🔴 STUB - needs implementation
│   ├── DashboardJobs.tsx           ⚠️ EXISTS - needs DB connection
│   └── PostJob.tsx                 ❌ NEW FILE - needs creation
│
├── components/
│   ├── dashboard/
│   │   ├── jobs/
│   │   │   └── JobCard.tsx         ✅ EXISTS - working
│   │   ├── DashboardLayout.tsx     ✅ EXISTS - working
│   │   ├── MetricCard.tsx          ✅ EXISTS - working
│   │   ├── LoadingState.tsx        ✅ EXISTS - working
│   │   └── EmptyState.tsx          ✅ EXISTS - working
│   │
│   └── jobs/                       ❌ NEW FOLDER - if needed
│       ├── JobHeader.tsx           (optional - for job detail)
│       ├── JobActions.tsx          (optional - apply/save buttons)
│       └── SimilarJobs.tsx         (optional - related jobs)
│
├── hooks/
│   ├── useJob.ts                   ❌ NEW - for job detail
│   ├── useJobs.ts                  ❌ NEW - for jobs listing
│   ├── useEvent.ts                 ❌ NEW - for event detail
│   ├── usePerk.ts                  ❌ NEW - for perk detail
│   ├── useJobApplication.ts        ❌ NEW - for apply action
│   └── useSavedJob.ts              ❌ NEW - for save action
│
└── App.tsx                         ⚠️ NEEDS UPDATE - add /post-job route
```

---

## 🔧 Technical Requirements

### Database Queries Needed

**Jobs Listing:**
```typescript
// Get all published jobs with company info
const { data: jobs } = await supabase
  .from('jobs')
  .select(`
    *,
    companies:company_id (
      id,
      name,
      logo_url,
      description
    )
  `)
  .eq('status', 'published')
  .is('deleted_at', null)
  .order('created_at', { ascending: false });
```

**Job Detail:**
```typescript
// Get single job with company and application status
const { data: job } = await supabase
  .from('jobs')
  .select(`
    *,
    companies:company_id (*),
    job_applications!inner(profile_id),
    saved_jobs!inner(profile_id)
  `)
  .eq('id', jobId)
  .single();

// Count applicants
const { count } = await supabase
  .from('job_applications')
  .select('*', { count: 'exact', head: true })
  .eq('job_id', jobId);
```

**Dashboard Metrics:**
```typescript
// Total applications
const { count: totalApps } = await supabase
  .from('job_applications')
  .select('*', { count: 'exact', head: true })
  .eq('profile_id', userId);

// Active applications
const { count: activeApps } = await supabase
  .from('job_applications')
  .select('*', { count: 'exact', head: true })
  .eq('profile_id', userId)
  .in('status', ['pending', 'under_review']);

// Saved jobs
const { count: savedCount } = await supabase
  .from('saved_jobs')
  .select('*', { count: 'exact', head: true })
  .eq('profile_id', userId);
```

**Apply to Job:**
```typescript
const { error } = await supabase
  .from('job_applications')
  .insert({
    job_id: jobId,
    profile_id: userId,
    status: 'pending',
    applied_at: new Date().toISOString()
  });
```

**Save Job:**
```typescript
// Save
const { error } = await supabase
  .from('saved_jobs')
  .insert({
    job_id: jobId,
    profile_id: userId
  });

// Unsave
const { error } = await supabase
  .from('saved_jobs')
  .delete()
  .eq('job_id', jobId)
  .eq('profile_id', userId);
```

---

## ✅ Testing Checklist

### Per Feature Testing

**Job Detail Page:**
- [ ] Navigate from jobs list to job detail
- [ ] All job information displays correctly
- [ ] Company sidebar shows complete info
- [ ] Apply button creates application
- [ ] Applied state persists on reload
- [ ] Save button toggles correctly
- [ ] Similar jobs section displays
- [ ] Mobile layout works correctly
- [ ] 404 state for invalid job ID

**Event Detail Page:**
- [ ] Navigate from events list to event detail
- [ ] Event banner and details display
- [ ] Register button works
- [ ] Registered state persists
- [ ] Save button toggles
- [ ] Mobile layout works
- [ ] 404 state works

**Perk Detail Page:**
- [ ] Navigate from perks list to perk detail
- [ ] Perk information displays
- [ ] Promo code copies to clipboard
- [ ] Claim button works
- [ ] Save functionality works
- [ ] Mobile layout works
- [ ] 404 state works

**Jobs Listing:**
- [ ] All published jobs display
- [ ] Search functionality works
- [ ] Category filters work
- [ ] Job cards link to detail pages
- [ ] Loading state shows
- [ ] Empty state shows when no results

**Jobs Dashboard:**
- [ ] All metrics display correctly
- [ ] Metrics update after actions
- [ ] Job cards display correctly
- [ ] Apply button disables after application
- [ ] Bookmark toggle works
- [ ] Loading state shows

**Post Job Form:**
- [ ] All form fields render
- [ ] Validation works correctly
- [ ] Form submits to database
- [ ] Success message shows
- [ ] Redirects after submission
- [ ] Preview feature works
- [ ] Mobile layout works

---

## 🚨 Known Issues to Address

### Build Errors
There are current TypeScript errors in:
- `src/components/PitchDeckPreview.tsx` - Type mismatches
- `src/hooks/useEvents.ts` - Type mismatches
- `src/pages/DashboardEvents.tsx` - Missing properties
- `src/pages/PitchDeckWizard.tsx` - Unknown types

**Action:** These should be fixed before proceeding with new implementations to avoid compounding errors.

### Authentication
- Auth protection is currently disabled for development
- Need to verify auth flow works for:
  - Applying to jobs (requires login)
  - Registering for events (requires login)
  - Claiming perks (requires login)
  - Posting jobs (requires login)

---

## 📦 Dependencies & Libraries

**Already Installed:**
- `@tanstack/react-query` - Data fetching
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation
- `zod` - Schema validation
- `@supabase/supabase-js` - Database client
- `lucide-react` - Icons
- `sonner` - Toast notifications

**May Need:**
- Rich text editor for job descriptions (optional)
- Date picker for job expiration (optional)

---

## 🎯 Success Metrics

**Phase 1 Complete When:**
- All 3 detail pages load real data
- Users can view complete job/event/perk information
- Navigation between list and detail pages works
- Loading and error states function correctly

**Phase 2 Complete When:**
- Jobs listing shows real database jobs
- Search and filters work in real-time
- Jobs dashboard shows accurate metrics
- Apply and save actions persist to database
- Metrics update after user actions

**Phase 3 Complete When:**
- Users can submit new job postings
- Form validation prevents invalid submissions
- Jobs appear in admin approval queue
- Success flow works end-to-end

---

## 📅 Recommended Schedule

**Week 1 (Focus: Detail Pages)**
- Monday: Job Detail Page (2-3 hours)
- Tuesday: Event Detail Page (2-3 hours)
- Wednesday: Perk Detail Page (2-3 hours)
- Thursday: Testing and bug fixes

**Week 2 (Focus: Database Integration)**
- Monday: Jobs Listing DB connection (2-3 hours)
- Tuesday: Jobs Dashboard DB connection (2-3 hours)
- Wednesday: Testing and optimization
- Thursday: Bug fixes and polish

**Week 3 (Focus: Form Creation)**
- Monday-Tuesday: Post Job Form (3-4 hours)
- Wednesday: Testing entire flow
- Thursday: Documentation and cleanup

---

## 🔗 Related Documentation

- Master Build Plan: `../LOVABLE-BUILD-PLAN.md`
- Database Schema: `../../supabase/migrations/`
- TypeScript Types: `../../src/integrations/supabase/types.ts`
- Component Library: shadcn/ui docs

---

## 🚀 Quick Start

**To begin implementation:**

1. **Fix build errors first** (if blocking)
2. **Start with Job Detail Page** (`02-job-detail-page.md`)
3. **Copy prompt into Lovable chat**
4. **Review generated code**
5. **Test thoroughly**
6. **Move to next feature**

---

**Total Time Estimate:** 16-22 hours across 3 weeks
**Status:** Ready to begin Phase 1
**Next Action:** Implement Job Detail Page
