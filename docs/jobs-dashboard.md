# Jobs Dashboard - Real Data Implementation

## Overview
The Jobs Dashboard has been updated to use real Supabase data with TanStack Query for state management, optimistic updates, and proper loading/error states.

## Database Tables

### `jobs`
- Stores all job listings with company details, location, salary, etc.
- RLS: Published jobs are publicly readable

### `saved_jobs`
- Junction table linking users to their saved jobs
- Unique constraint: `(profile_id, job_id)`
- RLS: Users can only read/write their own saved jobs

### `job_applications`
- Tracks user applications to jobs with status
- Unique constraint: `(profile_id, job_id)`
- Status values: `submitted`, `interviewing`, `rejected`, `offer`
- RLS: Users can only read/write their own applications

## Hooks

### `useSavedJobs()`
- Query Key: `['saved-jobs', user.id]`
- Returns: Array of saved jobs with full job details
- Auto-refetches on window focus

### `useApplications()`
- Query Key: `['applications', user.id]`
- Returns: Array of applications with job details and status
- Sorted by `updated_at` descending

### `useJobFeed()`
- Query Key: `['job-feed', user.id]`
- Returns: All published jobs with `isSaved` and `hasApplied` flags
- Performs efficient left joins to minimize queries

### `useToggleSaveJob()`
- Mutation for saving/unsaving jobs
- Implements optimistic updates with rollback on error
- Shows toast notifications

### `useApplyToJob()`
- Mutation for applying to jobs
- Uses upsert to handle duplicate applications
- Sets status to `submitted` by default
- Shows toast notifications

## Features

### Tabs
1. **All Jobs**: Browse all available positions with save/apply actions
2. **Saved Jobs**: View all bookmarked positions
3. **Applications**: Track application status with color-coded badges

### States
- **Loading**: Skeleton placeholders during data fetch
- **Error**: Alert with retry option
- **Empty**: Helpful CTAs to browse jobs
- **Success**: Grid layout with cards

### Metrics
- Total Applications: All applications count
- Active Applications: `submitted` + `interviewing` count
- Interviews: `interviewing` status count
- Saved Jobs: Total saved count

## Status Badges
Applications display color-coded status badges:
- `submitted`: Blue
- `interviewing`: Purple
- `rejected`: Red
- `offer`: Green

## Performance Optimizations
- Minimal column selects in queries
- Query results cached by TanStack Query
- Optimistic UI updates for instant feedback
- Indexed queries on `profile_id` and `job_id`
- Limited to 50 jobs in feed (pagination-ready)

## Security
- All queries filtered by `profile_id = auth.uid()`
- RLS policies enforce user-only access
- No service role keys exposed to client
- Optimistic updates rollback on auth failures
