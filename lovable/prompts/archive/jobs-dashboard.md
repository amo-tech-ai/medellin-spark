# Jobs Board Dashboard Implementation

**Route:** `/dashboard/jobs`
**Priority:** TIER 1 - Critical Launch Blocker
**User Story:** "As a founder, I want to browse startup jobs, track applications, and manage my job search."

---

## Implementation Requirements

Create a Jobs Board Dashboard following the exact architecture pattern used in `src/pages/Dashboard.tsx`.

### Database Tables

**✅ Tables already exist** (no migration needed):

1. **`jobs`** table - Job postings (from `completed/20251013061030_add_marketplace_tables.sql`)
   - Fields: id, company_id, title, slug, description, requirements, responsibilities, type (enum), status (enum: draft/published/closed), location, remote_allowed, salary_min, salary_max, salary_currency, created_at, updated_at, deleted_at
   - Foreign key: company_id → companies(id)
   - Indexes: company_id, status, type, location, slug, active jobs

2. **`job_applications`** table - User job applications (from `20251019120000_create_dashboard_tables.sql`)
   - Fields: id, profile_id, job_id, status (enum: pending/reviewing/interview/rejected/accepted), cover_letter, resume_url, applied_at, updated_at, notes
   - Foreign keys: profile_id → profiles(id), job_id → jobs(id)
   - RLS: ✅ Users can only view/create/update their own applications
   - Indexes: profile_id, (profile_id, status)

3. **`saved_jobs`** table - Bookmarked jobs (from `20251019120000_create_dashboard_tables.sql`)
   - Fields: id, profile_id, job_id, saved_at, notes
   - Foreign keys: profile_id → profiles(id), job_id → jobs(id)
   - RLS: ✅ Users can only view/create/delete their own saved jobs
   - Indexes: profile_id

**Helper functions available:**
- `get_application_count_by_status(user_id UUID)` - Returns count grouped by status
- `get_saved_jobs_count(user_id UUID)` - Returns total saved jobs count

---

### TypeScript Types

Create file: `src/types/jobs.ts`

**Define types matching the database schema:**

- **JobType**: Database uses enum `job_type` (values TBD - check database)
- **JobStatus**: 'draft' | 'published' | 'closed'
- **ApplicationStatus**: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted'
- **JobListing** interface:
  - id, company_id, title, slug, description, requirements (text), responsibilities (text)
  - type (JobType enum), status (JobStatus), location, remote_allowed (boolean)
  - salary_min, salary_max (numeric), salary_currency (text)
  - created_at, updated_at, deleted_at
  - Optional: company (joined from companies table)

- **JobApplication** interface:
  - id, profile_id, job_id, status (ApplicationStatus)
  - cover_letter, resume_url, applied_at, updated_at, notes
  - Optional: job (joined JobListing)

- **SavedJob** interface:
  - id, profile_id, job_id, saved_at, notes
  - Optional: job (joined JobListing)

- **JobFilters** interface (for future filtering):
  - search (string), jobType, status, location, remoteAllowed

- **JobsMetrics** interface:
  - totalApplications, pendingApplications, interviews, savedJobs

---

### Custom Hooks

**File 1:** `src/hooks/useJobApplications.ts`

Pattern to follow: Similar to `useDashboardMetrics` from Dashboard.tsx

Must include:
- useQuery to fetch applications with `jobs` table joined (and companies joined to jobs)
- Query key: ['job-applications', profileId]
- Select query: `job_applications.*, jobs.*, companies.name as company_name`
- Order by applied_at descending
- useMutation for applying to jobs:
  - Insert into job_applications with status = 'pending'
  - Required fields: profile_id, job_id, status, applied_at
  - Optional: cover_letter, resume_url, notes
- useMutation for updating application status
- Return: applications array, isLoading, error, applyToJob function, updateStatus function
- Toast notifications on success/error

**File 2:** `src/hooks/useSavedJobs.ts`

Pattern to follow: Similar to `useMyEvents`

Must include:
- useQuery to fetch saved jobs with `jobs` table joined (and companies joined to jobs)
- Query key: ['saved-jobs', profileId]
- Select query: `saved_jobs.*, jobs.*, companies.name as company_name`
- Order by saved_at descending
- useMutation for saving a job:
  - Insert into saved_jobs
  - Required fields: profile_id, job_id, saved_at
  - Optional: notes
- useMutation for unsaving a job:
  - Delete from saved_jobs WHERE profile_id = X AND job_id = Y
- Helper function: isSaved(jobId) returns boolean (checks if jobId exists in savedJobs array)
- Return: savedJobs array, isLoading, saveJob function, unsaveJob function, isSaved function
- Toast notifications on save/unsave

---

### UI Components

**Component 1:** `src/components/dashboard/jobs/ApplicationStatusBadge.tsx`

Requirements:
- Use Badge component from `@/components/ui/badge`
- Accept status prop of type ApplicationStatus
- Map status to badge variant and label (match database schema):
  - pending → 'Pending' (secondary variant)
  - reviewing → 'Under Review' (default variant)
  - interview → 'Interview' (default variant)
  - accepted → 'Accepted' (default variant with success styling)
  - rejected → 'Rejected' (destructive variant)

**Component 2:** `src/components/dashboard/jobs/JobCard.tsx`

Requirements:
- Use Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter from `@/components/ui/card`
- Use Button from `@/components/ui/button`
- Use Badge from `@/components/ui/badge`
- Accept props: job (JobListing), isSaved (boolean), onSave (function), onApply (function), hasApplied (boolean)
- Display:
  - Job title, company name with Building2 icon (fetch from companies table via company_id)
  - Description (2-line clamp)
  - Job type badge, job status badge
  - Location with MapPin icon, "Remote" badge if remote_allowed = true
  - Salary range with DollarSign icon (format: $min - $max currency)
  - Requirements as text (parse if needed) - show first 4 items as Badge chips
- Bookmark button in top-right corner (filled when saved)
- Apply button in footer (disabled if already applied)
- Add hover-lift class for card hover effect

**Component 3:** `src/components/dashboard/jobs/JobFilters.tsx` (Optional - Future Enhancement)

Basic filter bar with search input and dropdowns for job type, company stage, location.

**Component 4:** `src/components/dashboard/jobs/ApplicationTracker.tsx` (Optional - Future Enhancement)

Kanban board showing applications grouped by status (Applied, Interview, Offer, Rejected).

---

### Main Dashboard Page

**File:** `src/pages/DashboardJobs.tsx`

**Required imports from existing codebase:**
- DashboardLayout from `@/components/dashboard/DashboardLayout`
- MetricCard from `@/components/dashboard/MetricCard`
- LoadingState from `@/components/dashboard/LoadingState`
- EmptyState from `@/components/dashboard/EmptyState`
- JobCard from `@/components/dashboard/jobs/JobCard`
- useJobApplications from `@/hooks/useJobApplications`
- useSavedJobs from `@/hooks/useSavedJobs`
- useAuth from `@/hooks/useAuth`
- useQuery from '@tanstack/react-query'
- supabase from `@/lib/supabase`
- Icons: Briefcase, FileText, Calendar, Bookmark from 'lucide-react'

**Page structure:**

1. **Header Section:**
   - H1: "Jobs Board"
   - Description: "Browse startup opportunities and track your applications"

2. **Metrics Row (4 MetricCards):**
   - Total Applications (Briefcase icon, count of all applications)
   - Pending/Active Applications (FileText icon, count where status is 'pending' or 'reviewing', show change %)
   - Interviews (Calendar icon, count where status is 'interview', show change +number)
   - Saved Jobs (Bookmark icon, count of saved jobs)

3. **Job Listings Section:**
   - H2: "Available Positions"
   - Grid layout: 1 column mobile, 2 columns tablet (md:), 3 columns desktop (lg:)
   - Map over job listings and render JobCard for each
   - Pass correct props: job, isSaved, onSave, onApply, hasApplied
   - Show EmptyState if no jobs available

**Data fetching:**
- Fetch job listings using useQuery with key ['jobs']
- Query: Select from `jobs` table with company joined
  - Filter: WHERE status = 'published' AND deleted_at IS NULL
  - Order by: created_at DESC
  - Limit: 12
  - Join: Include company data (companies.name, companies.logo_url)
- Fetch applications using useJobApplications hook (with jobs joined)
- Fetch saved jobs using useSavedJobs hook (with jobs joined)
- Show LoadingState (type="cards", count=4) while all queries are loading

**Helper functions:**
- hasApplied(jobId): Check if applications array includes job with matching job_id
- Calculate metrics from applications and savedJobs data:
  - totalApplications = applications.length
  - activeApplications = count where status is 'pending' or 'reviewing'
  - interviews = count where status is 'interview'
  - savedJobs = savedJobs.length

---

### Router Update

**File:** `src/App.tsx`

Add route inside Routes component:
- Import: DashboardJobs from '@/pages/DashboardJobs'
- Route: path="/dashboard/jobs" element={<DashboardJobs />}

---

## Testing Checklist

After implementation verify:

**TypeScript:**
- [ ] Run `pnpm tsc --noEmit` - should pass with 0 errors

**Database (already exists):**
- [ ] Verify `jobs` table has published jobs (status = 'published')
- [ ] Verify `job_applications` table exists with RLS enabled
- [ ] Verify `saved_jobs` table exists with RLS enabled
- [ ] Optional: Insert sample job data if needed for testing

**Functionality:**
- [ ] Navigate to http://localhost:8080/dashboard/jobs
- [ ] Page loads without console errors
- [ ] 4 MetricCards display correct counts
- [ ] Job listings grid renders (3 columns on desktop)
- [ ] JobCard hover effect works (lift animation)
- [ ] Click "Apply Now" - creates job_application record, shows toast, button becomes disabled
- [ ] Click bookmark icon - saves job, icon fills, shows toast
- [ ] Click filled bookmark - unsaves job, icon empties, shows toast
- [ ] Metrics update after applying/saving
- [ ] Loading state shows during initial fetch
- [ ] EmptyState shows when no jobs exist

**Accessibility:**
- [ ] All text meets WCAG AA contrast (≥4.5:1)
- [ ] Buttons have hover states
- [ ] Focus states visible on keyboard navigation

**Responsive:**
- [ ] Test at 320px width (1 column layout)
- [ ] Test at 768px width (2 column layout)
- [ ] Test at 1024px+ width (3 column layout)
- [ ] No horizontal scroll on mobile

---

## Success Criteria

**Must have:**
- ✅ Follows exact pattern from src/pages/Dashboard.tsx
- ✅ Uses correct component names from existing codebase
- ✅ Database migration is idempotent
- ✅ RLS policies enforce security
- ✅ TypeScript strict mode passes
- ✅ Apply and save functionality works
- ✅ Toast notifications on all actions
- ✅ Loading and empty states handled

**Nice to have (future):**
- JobFilters component for search and filtering
- ApplicationTracker kanban board
- Resume upload functionality
- Job alerts/notifications

---

## Architecture Notes

**Pattern Source:** All patterns taken from existing `src/pages/Dashboard.tsx`

**Component Reuse:**
- DashboardLayout - Standard wrapper for all dashboard pages
- MetricCard - Displays KPI with icon, label, value, optional change indicator
- LoadingState - Skeleton loader (pass type="cards" and count=4)
- EmptyState - Shows when no data available (pass title and description)

**Hook Pattern:**
- useQuery for data fetching
- useMutation for create/update operations
- queryClient.invalidateQueries to refresh data after mutations
- useToast for success/error messages
- Return destructured object with data, loading state, and action functions

**Styling:**
- All colors use HSL from src/index.css
- Use Tailwind utility classes
- hover-lift class for card animations
- Responsive grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

---

**Status:** Ready for implementation
**Estimated Time:** 4-6 hours
**Next Dashboards:** Perks (`/dashboard/perks`), Profile (`/dashboard/profile`)
