# 🎯 Jobs Board Dashboard - Implementation Prompt

**Project:** Medellin Spark AI Accelerator
**Route:** `/dashboard/jobs`
**Priority:** TIER 1 - Critical (Launch Blocker)
**Estimated Time:** 4-6 hours

---

## 📋 Implementation Checklist

This prompt will guide you through creating a production-ready Jobs Board Dashboard that matches the existing codebase architecture.

**Use this prompt with Claude Code:**
```
Create the Jobs Board Dashboard at /dashboard/jobs following the exact pattern from src/pages/Dashboard.tsx. Use these components from the existing codebase:

1. DashboardLayout (wrapper)
2. MetricCard (KPIs)
3. LoadingState (skeleton loader)
4. EmptyState (no data placeholder)
5. Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
6. Button, Badge (shadcn/ui)

Follow the code structure below EXACTLY. Implement database schema, custom hooks, and UI components as specified.
```

---

## 🗂️ File Structure

Create these files in order:

```
1. supabase/migrations/20251020000000_create_jobs_tables.sql
2. src/types/jobs.ts
3. src/hooks/useJobApplications.ts
4. src/hooks/useSavedJobs.ts
5. src/components/dashboard/jobs/JobCard.tsx
6. src/components/dashboard/jobs/ApplicationStatusBadge.tsx
7. src/components/dashboard/jobs/JobFilters.tsx
8. src/components/dashboard/jobs/ApplicationTracker.tsx
9. src/pages/DashboardJobs.tsx
10. Update: src/App.tsx (add route)
```

---

## 📊 STEP 1: Database Schema

**File:** `supabase/migrations/20251020000000_create_jobs_tables.sql`

```sql
-- Jobs Board Database Schema
-- Idempotent migration for job listings, applications, and saved jobs

-- Job Listings Table
CREATE TABLE IF NOT EXISTS job_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  requirements TEXT[],
  location TEXT,
  salary_range TEXT,
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship')),
  company_stage TEXT CHECK (company_stage IN ('pre-seed', 'seed', 'series-a', 'series-b', 'growth')),
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job Applications Table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES job_listings(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('applied', 'interview', 'offer', 'rejected')) DEFAULT 'applied',
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, job_id)
);

-- Saved Jobs Table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES job_listings(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, job_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_job_listings_active ON job_listings(is_active, posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_profile ON job_applications(profile_id, status);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_profile ON saved_jobs(profile_id);

-- Enable Row Level Security
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Job Listings (public read)
DROP POLICY IF EXISTS "Job listings are viewable by everyone" ON job_listings;
CREATE POLICY "Job listings are viewable by everyone"
  ON job_listings FOR SELECT
  USING (is_active = TRUE);

-- RLS Policies: Job Applications (user-specific)
DROP POLICY IF EXISTS "Users can view own job applications" ON job_applications;
CREATE POLICY "Users can view own job applications"
  ON job_applications FOR SELECT
  USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Users can insert own job applications" ON job_applications;
CREATE POLICY "Users can insert own job applications"
  ON job_applications FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Users can update own job applications" ON job_applications;
CREATE POLICY "Users can update own job applications"
  ON job_applications FOR UPDATE
  USING (auth.uid() = profile_id);

-- RLS Policies: Saved Jobs (user-specific)
DROP POLICY IF EXISTS "Users can view own saved jobs" ON saved_jobs;
CREATE POLICY "Users can view own saved jobs"
  ON saved_jobs FOR SELECT
  USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Users can insert own saved jobs" ON saved_jobs;
CREATE POLICY "Users can insert own saved jobs"
  ON saved_jobs FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Users can delete own saved jobs" ON saved_jobs;
CREATE POLICY "Users can delete own saved jobs"
  ON saved_jobs FOR DELETE
  USING (auth.uid() = profile_id);

-- Sample Data (optional - for testing)
INSERT INTO job_listings (title, company, description, requirements, location, salary_range, job_type, company_stage)
VALUES
  ('Senior Frontend Developer', 'TechCorp AI', 'Build amazing UIs with React and TypeScript', ARRAY['React', 'TypeScript', '3+ years experience'], 'Remote', '$120k - $160k', 'full-time', 'series-a'),
  ('Product Designer', 'StartupXYZ', 'Design user experiences for SaaS platform', ARRAY['Figma', 'UI/UX', 'Design systems'], 'San Francisco', '$100k - $140k', 'full-time', 'seed'),
  ('Full Stack Engineer', 'AI Ventures', 'Work on cutting-edge AI products', ARRAY['Node.js', 'Python', 'PostgreSQL'], 'New York', '$130k - $180k', 'full-time', 'series-b')
ON CONFLICT DO NOTHING;
```

---

## 🔧 STEP 2: TypeScript Types

**File:** `src/types/jobs.ts`

```typescript
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type CompanyStage = 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'growth';
export type ApplicationStatus = 'applied' | 'interview' | 'offer' | 'rejected';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  description: string | null;
  requirements: string[];
  location: string | null;
  salary_range: string | null;
  job_type: JobType;
  company_stage: CompanyStage;
  posted_at: string;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

export interface JobApplication {
  id: string;
  profile_id: string;
  job_id: string;
  status: ApplicationStatus;
  applied_at: string;
  notes: string | null;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
  job?: JobListing; // Optional joined data
}

export interface SavedJob {
  id: string;
  profile_id: string;
  job_id: string;
  saved_at: string;
  job?: JobListing; // Optional joined data
}

export interface JobFilters {
  search: string;
  jobType: JobType | 'all';
  companyStage: CompanyStage | 'all';
  location: string;
}

export interface JobsMetrics {
  totalApplications: number;
  activeApplications: number;
  interviews: number;
  savedJobs: number;
}
```

---

## 🪝 STEP 3: Custom Hooks

**File:** `src/hooks/useJobApplications.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { JobApplication, ApplicationStatus } from '@/types/jobs';
import { useToast } from '@/hooks/use-toast';

export function useJobApplications(profileId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['job-applications', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job:job_listings(*)
        `)
        .eq('profile_id', profileId)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      return data as JobApplication[];
    },
  });

  const applyToJobMutation = useMutation({
    mutationFn: async ({ jobId, notes }: { jobId: string; notes?: string }) => {
      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          profile_id: profileId,
          job_id: jobId,
          status: 'applied',
          notes,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications', profileId] });
      toast({
        title: 'Application submitted',
        description: 'Your application has been sent successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Application failed',
        description: error.message,
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ApplicationStatus }) => {
      const { data, error } = await supabase
        .from('job_applications')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications', profileId] });
      toast({
        title: 'Status updated',
        description: 'Application status has been updated.',
      });
    },
  });

  return {
    applications: data || [],
    isLoading,
    error,
    applyToJob: applyToJobMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
  };
}
```

**File:** `src/hooks/useSavedJobs.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { SavedJob } from '@/types/jobs';
import { useToast } from '@/hooks/use-toast';

export function useSavedJobs(profileId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['saved-jobs', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select(`
          *,
          job:job_listings(*)
        `)
        .eq('profile_id', profileId)
        .order('saved_at', { ascending: false });

      if (error) throw error;
      return data as SavedJob[];
    },
  });

  const saveJobMutation = useMutation({
    mutationFn: async (jobId: string) => {
      const { data, error } = await supabase
        .from('saved_jobs')
        .insert({ profile_id: profileId, job_id: jobId })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs', profileId] });
      toast({ title: 'Job saved', description: 'Added to your saved jobs.' });
    },
  });

  const unsaveJobMutation = useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('profile_id', profileId)
        .eq('job_id', jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs', profileId] });
      toast({ title: 'Job removed', description: 'Removed from saved jobs.' });
    },
  });

  return {
    savedJobs: data || [],
    isLoading,
    saveJob: saveJobMutation.mutate,
    unsaveJob: unsaveJobMutation.mutate,
    isSaved: (jobId: string) => data?.some((s) => s.job_id === jobId) || false,
  };
}
```

---

## 🎨 STEP 4: UI Components

**File:** `src/components/dashboard/jobs/ApplicationStatusBadge.tsx`

```typescript
import { Badge } from '@/components/ui/badge';
import { ApplicationStatus } from '@/types/jobs';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

const statusConfig: Record<ApplicationStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  applied: { label: 'Applied', variant: 'secondary' },
  interview: { label: 'Interview', variant: 'default' },
  offer: { label: 'Offer', variant: 'default' },
  rejected: { label: 'Rejected', variant: 'destructive' },
};

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
```

**File:** `src/components/dashboard/jobs/JobCard.tsx`

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { JobListing } from '@/types/jobs';
import { MapPin, Building2, DollarSign, Bookmark } from 'lucide-react';

interface JobCardProps {
  job: JobListing;
  isSaved: boolean;
  onSave: () => void;
  onApply: () => void;
  hasApplied: boolean;
}

export function JobCard({ job, isSaved, onSave, onApply, hasApplied }: JobCardProps) {
  return (
    <Card className="hover-lift">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Building2 className="w-4 h-4" />
              {job.company}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            className={isSaved ? 'text-primary' : 'text-muted-foreground'}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{job.job_type}</Badge>
          <Badge variant="outline">{job.company_stage}</Badge>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {job.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
          )}
          {job.salary_range && (
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {job.salary_range}
            </span>
          )}
        </div>

        {job.requirements && job.requirements.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Requirements:</p>
            <div className="flex flex-wrap gap-1">
              {job.requirements.slice(0, 4).map((req, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          onClick={onApply}
          disabled={hasApplied}
          className="w-full"
        >
          {hasApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 📄 STEP 5: Main Dashboard Page

**File:** `src/pages/DashboardJobs.tsx`

```typescript
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { JobCard } from '@/components/dashboard/jobs/JobCard';
import { useJobApplications } from '@/hooks/useJobApplications';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { JobListing } from '@/types/jobs';
import { Briefcase, FileText, Calendar, Bookmark } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function DashboardJobs() {
  const { user } = useAuth();
  const profileId = user?.id || '';

  // Fetch job listings
  const { data: jobListings, isLoading: jobsLoading } = useQuery({
    queryKey: ['job-listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('is_active', true)
        .order('posted_at', { ascending: false })
        .limit(12);

      if (error) throw error;
      return data as JobListing[];
    },
  });

  const { applications, isLoading: appsLoading, applyToJob } = useJobApplications(profileId);
  const { savedJobs, isLoading: savedLoading, saveJob, unsaveJob, isSaved } = useSavedJobs(profileId);

  const isLoading = jobsLoading || appsLoading || savedLoading;

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingState type="cards" count={4} />
      </DashboardLayout>
    );
  }

  // Calculate metrics
  const metrics = {
    totalApplications: applications.length,
    activeApplications: applications.filter(a => a.status === 'applied' || a.status === 'interview').length,
    interviews: applications.filter(a => a.status === 'interview').length,
    savedJobs: savedJobs.length,
  };

  const hasApplied = (jobId: string) => applications.some(app => app.job_id === jobId);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Jobs Board</h1>
        <p className="text-muted-foreground">
          Browse startup opportunities and track your applications
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={Briefcase}
          label="Total Applications"
          value={metrics.totalApplications}
        />
        <MetricCard
          icon={FileText}
          label="Active Applications"
          value={metrics.activeApplications}
          change="+12%"
        />
        <MetricCard
          icon={Calendar}
          label="Interviews"
          value={metrics.interviews}
          change="+2"
        />
        <MetricCard
          icon={Bookmark}
          label="Saved Jobs"
          value={metrics.savedJobs}
        />
      </div>

      {/* Job Listings Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Positions</h2>

        {!jobListings || jobListings.length === 0 ? (
          <EmptyState
            title="No jobs available"
            description="Check back soon for new opportunities"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobListings.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={isSaved(job.id)}
                onSave={() => isSaved(job.id) ? unsaveJob(job.id) : saveJob(job.id)}
                onApply={() => applyToJob({ jobId: job.id })}
                hasApplied={hasApplied(job.id)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
```

---

## 🔗 STEP 6: Update App Router

**File:** `src/App.tsx` (Add this route)

```typescript
import DashboardJobs from '@/pages/DashboardJobs';

// Inside <Routes>:
<Route path="/dashboard/jobs" element={<DashboardJobs />} />
```

---

## ✅ Testing Checklist

After implementation, verify:

```bash
# 1. TypeScript compiles
pnpm tsc --noEmit

# 2. Apply migration
npx supabase db push

# 3. Verify tables created
# Check Supabase dashboard or use MCP: list_tables

# 4. Start dev server
pnpm dev

# 5. Navigate to /dashboard/jobs
# Verify:
- [ ] Page loads without errors
- [ ] 4 MetricCards display (Total Apps, Active, Interviews, Saved)
- [ ] Job listings grid renders
- [ ] JobCard hover effect works
- [ ] "Apply Now" button works
- [ ] Bookmark (save) button works
- [ ] Toast notifications appear on actions
- [ ] Loading states show during data fetch
- [ ] EmptyState shows when no jobs exist
```

---

## 🎯 Success Criteria

**UI:**
- ✅ Follows DashboardLayout pattern from Dashboard.tsx
- ✅ Uses exact component names from codebase
- ✅ Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- ✅ Hover effects on job cards
- ✅ WCAG AA compliant (contrast ratios ≥4.5:1)

**Functionality:**
- ✅ Apply to job creates job_application record
- ✅ Save job creates saved_jobs record
- ✅ Status updates work (applied → interview → offer)
- ✅ RLS policies enforce user-specific data
- ✅ Metrics calculate correctly

**Code Quality:**
- ✅ TypeScript strict mode passes
- ✅ No console errors or warnings
- ✅ Custom hooks follow React Query patterns
- ✅ Idempotent database migration

---

## 🚀 Next Steps

After Jobs Dashboard is complete:

1. **Perks Dashboard** (`/dashboard/perks`) - Similar pattern
2. **Profile Dashboard** (`/dashboard/profile`) - User settings
3. **Add filters** - JobFilters component for search/filter
4. **Application tracker** - Kanban board for managing applications

---

**Generated:** October 20, 2025
**Component Pattern Source:** `src/pages/Dashboard.tsx`
**Status:** Ready for Implementation ✅
