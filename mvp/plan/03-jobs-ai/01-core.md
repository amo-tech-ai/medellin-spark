# Jobs AI - Core (Job Listings Foundation)

**Phase**: Foundation
**Time**: 8-12 hours
**Priority**: 🟡 HIGH
**Difficulty**: Intermediate
**Prerequisites**: 00-setup complete, 01-dashboard/01-core.md complete

---

## Overview

Build job listings database, basic job board UI, search, and filtering. Users can browse jobs and track applications.

**Outcome**: Working job board with search, filters, and application tracking

---

## Implementation Steps

### Step 1: Database Setup (2 hours)

**Create Migration**: `supabase/migrations/20250121000000_jobs_foundation.sql`

```sql
-- 1. Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo TEXT,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  location_type TEXT DEFAULT 'onsite' CHECK (location_type IN ('onsite', 'remote', 'hybrid')),
  job_type TEXT DEFAULT 'full-time' CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship')),
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'USD',
  experience_level TEXT DEFAULT 'mid' CHECK (experience_level IN ('entry', 'mid', 'senior', 'lead')),
  skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  posted_date TIMESTAMPTZ DEFAULT NOW(),
  expires_date TIMESTAMPTZ,
  apply_url TEXT,
  is_active BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_jobs_company ON jobs(company_name);
CREATE INDEX idx_jobs_location_type ON jobs(location_type);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_posted_date ON jobs(posted_date DESC);
CREATE INDEX idx_jobs_active ON jobs(is_active);

-- 2. Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn')),
  resume_url TEXT,
  cover_letter TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, profile_id)
);

CREATE INDEX idx_applications_profile ON job_applications(profile_id);
CREATE INDEX idx_applications_job ON job_applications(job_id);
CREATE INDEX idx_applications_status ON job_applications(status);

-- 3. Saved jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, profile_id)
);

CREATE INDEX idx_saved_jobs_profile ON saved_jobs(profile_id);

-- 4. RLS Policies
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- Jobs are public (everyone can view)
CREATE POLICY "Jobs are viewable by everyone"
  ON jobs FOR SELECT
  USING (is_active = true);

-- Users can view their own applications
CREATE POLICY "Users can view own applications"
  ON job_applications FOR SELECT
  USING (auth.uid() = profile_id);

-- Users can create applications
CREATE POLICY "Users can create applications"
  ON job_applications FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

-- Users can update their own applications
CREATE POLICY "Users can update own applications"
  ON job_applications FOR UPDATE
  USING (auth.uid() = profile_id);

-- Users can view their saved jobs
CREATE POLICY "Users can view saved jobs"
  ON saved_jobs FOR SELECT
  USING (auth.uid() = profile_id);

-- Users can save jobs
CREATE POLICY "Users can save jobs"
  ON saved_jobs FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

-- Users can delete saved jobs
CREATE POLICY "Users can delete saved jobs"
  ON saved_jobs FOR DELETE
  USING (auth.uid() = profile_id);
```

**Apply migration**:
```bash
npx supabase db push
```

---

### Step 2: Seed Sample Jobs (30 minutes)

**Create**: `supabase/seeds/jobs_seed.sql`

```sql
-- Insert sample jobs
INSERT INTO jobs (title, company_name, description, location, location_type, job_type, salary_min, salary_max, skills) VALUES
('Senior Frontend Developer', 'Tech Startup Co', 'Build amazing user interfaces with React and TypeScript', 'Medellin, Colombia', 'hybrid', 'full-time', 80000, 120000, ARRAY['React', 'TypeScript', 'CSS']),
('Backend Engineer', 'AI Solutions Inc', 'Design scalable APIs and microservices', 'Remote', 'remote', 'full-time', 90000, 130000, ARRAY['Node.js', 'PostgreSQL', 'Docker']),
('Full Stack Developer', 'Innovation Labs', 'Work on both frontend and backend systems', 'Bogota, Colombia', 'onsite', 'full-time', 70000, 100000, ARRAY['React', 'Node.js', 'MongoDB']),
('DevOps Engineer', 'Cloud Masters', 'Manage CI/CD pipelines and cloud infrastructure', 'Remote', 'remote', 'contract', 85000, 115000, ARRAY['AWS', 'Kubernetes', 'Terraform']),
('UX Designer', 'Design Studio', 'Create beautiful and intuitive user experiences', 'Medellin, Colombia', 'hybrid', 'full-time', 60000, 90000, ARRAY['Figma', 'UI Design', 'Prototyping']);
```

**Run seed**:
```bash
npx supabase db reset --seed-only
```

---

### Step 3: React Query Hooks (2 hours)

**Create**: `src/hooks/useJobs.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Job {
  id: string;
  title: string;
  company_name: string;
  company_logo?: string;
  description: string;
  location: string;
  location_type: 'onsite' | 'remote' | 'hybrid';
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary_min?: number;
  salary_max?: number;
  currency: string;
  experience_level: 'entry' | 'mid' | 'senior' | 'lead';
  skills: string[];
  posted_date: string;
  apply_url?: string;
  is_active: boolean;
}

export function useJobs(filters?: {
  location_type?: string;
  job_type?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      let query = supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('posted_date', { ascending: false });

      if (filters?.location_type) {
        query = query.eq('location_type', filters.location_type);
      }

      if (filters?.job_type) {
        query = query.eq('job_type', filters.job_type);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Job[];
    },
  });
}

export function useJobApplications() {
  return useQuery({
    queryKey: ['job-applications'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('job_applications')
        .select('*, jobs(*)')
        .eq('profile_id', user.id)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useApplyToJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, coverLetter }: { jobId: string; coverLetter?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          profile_id: user.id,
          cover_letter: coverLetter,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
    },
  });
}
```

---

### Step 4: Job Board UI (4 hours)

**Create**: `src/pages/Jobs.tsx`

```typescript
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJobs, useApplyToJob } from '@/hooks/useJobs';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

export default function Jobs() {
  const [search, setSearch] = useState('');
  const [locationType, setLocationType] = useState<string>('');
  const [jobType, setJobType] = useState<string>('');
  const { toast } = useToast();

  const { data: jobs, isLoading } = useJobs({
    search,
    location_type: locationType,
    job_type: jobType,
  });

  const applyMutation = useApplyToJob();

  const handleApply = (jobId: string) => {
    applyMutation.mutate({ jobId }, {
      onSuccess: () => {
        toast({
          title: 'Application submitted!',
          description: 'You have successfully applied to this job.',
        });
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to submit application',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Job Opportunities</h1>

      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={locationType} onValueChange={setLocationType}>
          <SelectTrigger>
            <SelectValue placeholder="Location Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="onsite">On-site</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Listings */}
      {isLoading ? (
        <div>Loading jobs...</div>
      ) : (
        <div className="space-y-4">
          {jobs?.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="text-lg">{job.company_name}</CardDescription>
                  </div>
                  <Button onClick={() => handleApply(job.id)}>
                    Apply Now
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {job.location} • {job.location_type}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      {job.job_type}
                    </div>
                    {job.salary_min && job.salary_max && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {new Date(job.posted_date).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-sm">{job.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### Step 5: Add Route (5 minutes)

**Update**: `src/App.tsx`

```typescript
import Jobs from '@/pages/Jobs';

// Add route
<Route path="/jobs" element={<Jobs />} />
```

---

## Success Criteria

### Database
- [ ] Jobs table created with indexes
- [ ] Job applications table created
- [ ] Saved jobs table created
- [ ] RLS enabled on all tables
- [ ] Sample jobs seeded

### Functionality
- [ ] Job listings display correctly
- [ ] Search works (title, company)
- [ ] Filters work (location type, job type)
- [ ] Can apply to jobs
- [ ] Applications save to database
- [ ] No duplicate applications allowed

### UI
- [ ] Job cards display all info
- [ ] Filters are intuitive
- [ ] Apply button works
- [ ] Loading states show
- [ ] Mobile responsive

---

## Testing Commands

```bash
# 1. Check database
npx supabase db push

# 2. Verify tables
PGPASSWORD='your-password' psql -h your-project.supabase.co -U postgres -d postgres -c "\dt"
# Expected: jobs, job_applications, saved_jobs

# 3. Check sample data
PGPASSWORD='your-password' psql -h your-project.supabase.co -U postgres -d postgres -c "SELECT COUNT(*) FROM jobs;"
# Expected: 5 jobs

# 4. Test in browser
# Open: http://localhost:8080/jobs
# Try: Search, filters, apply

# 5. Verify application saved
PGPASSWORD='your-password' psql -h your-project.supabase.co -U postgres -d postgres -c "SELECT * FROM job_applications;"
```

---

## Common Issues & Fixes

### Issue: "Jobs not showing"
**Fix**: Check RLS policies
```sql
SELECT * FROM jobs WHERE is_active = true;
```

### Issue: "Can't apply twice"
**Fix**: Working as intended (UNIQUE constraint prevents duplicates)

### Issue: "Search not working"
**Fix**: Check search query syntax
```typescript
// Correct
query.or(`title.ilike.%${search}%,company_name.ilike.%${search}%`)
```

---

## Next Steps

After Core complete:
→ **03-jobs-ai/02-intermediate.md** - AI matching, recommendations, saved jobs

---

**Estimated Time**: 8-12 hours
**Difficulty**: Intermediate
**Status**: ✅ Ready to implement
