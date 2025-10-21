# 📋 Dashboard Implementation Tasks

**Project**: Medellin Spark Dashboard
**Date**: January 2025
**Priority Order**: Critical → High → Medium → Low

**RULE**: ❌ **NO AUTH DURING DEVELOPMENT**

---

## Task Organization

### Phase 1: Foundation (Week 1)
- Database setup
- Core components
- Main dashboard page connection

### Phase 2: Core Pages (Week 2)
- Jobs dashboard
- Events dashboard
- Pitch decks dashboard

### Phase 3: Enhanced Features (Week 3)
- Perks dashboard
- Settings dashboard
- Advanced components

### Phase 4: Polish & Optimization (Week 4)
- Performance tuning
- Testing coverage
- Documentation

---

## 🔴 Phase 1: Foundation

### Task 1.1: Database Setup

**Priority**: 🔴 CRITICAL
**Estimated Time**: 2-3 hours
**Dependencies**: None

**Subtasks**:
1. Create `job_applications` table migration
2. Add `location` field to `events` table
3. Add `view_count` to `profiles` and `presentations`
4. Test migrations locally
5. Verify table relationships

**SQL Script**:
```sql
-- File: supabase/migrations/20250120000000_dashboard_requirements.sql

-- 1. Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interview', 'rejected', 'accepted')),
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_applications_profile ON job_applications(profile_id);
CREATE INDEX idx_job_applications_job ON job_applications(job_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);

-- 2. Add location to events
ALTER TABLE events ADD COLUMN IF NOT EXISTS location TEXT;

-- 3. Add view counts
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE presentations ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- 4. Create saved_jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, job_id)
);

CREATE INDEX idx_saved_jobs_profile ON saved_jobs(profile_id);
```

**Success Criteria**:
- [ ] All tables created without errors
- [ ] Indexes added successfully
- [ ] Foreign key constraints working
- [ ] Test data inserted successfully

**Testing Command**:
```bash
# Apply migration
npx supabase db push

# Verify tables
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "\dt"

# Check job_applications table
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "SELECT * FROM job_applications LIMIT 1;"
```

---

### Task 1.2: Create Custom Hooks

**Priority**: 🔴 CRITICAL
**Estimated Time**: 2-3 hours
**Dependencies**: None

**Files to Create**:

**1. `src/hooks/useDashboardMetrics.ts`**
```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardMetrics {
  events: number;
  eventsThisMonth: number;
  jobs: number;
  jobsPending: number;
  perks: number;
  perksValue: number;
  decks: number;
  decksDrafts: number;
}

export function useDashboardMetrics() {
  return useQuery<DashboardMetrics>({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const [
        registrations,
        registrationsMonth,
        applications,
        applicationsPending,
        claims,
        presentations,
        draftPresentations
      ] = await Promise.all([
        supabase.from('registrations').select('*', { count: 'exact', head: true }),
        supabase.from('registrations').select('*', { count: 'exact', head: true }).gte('created_at', firstDayOfMonth.toISOString()),
        supabase.from('job_applications').select('*', { count: 'exact', head: true }),
        supabase.from('job_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('perk_claims').select('*', { count: 'exact', head: true }),
        supabase.from('presentations').select('*', { count: 'exact', head: true }),
        supabase.from('presentations').select('*', { count: 'exact', head: true }).eq('status', 'draft')
      ]);

      return {
        events: registrations.count ?? 0,
        eventsThisMonth: registrationsMonth.count ?? 0,
        jobs: applications.count ?? 0,
        jobsPending: applicationsPending.count ?? 0,
        perks: claims.count ?? 0,
        perksValue: 12000, // TODO: Calculate actual value
        decks: presentations.count ?? 0,
        decksDrafts: draftPresentations.count ?? 0
      };
    }
  });
}
```

**2. `src/hooks/useEvents.ts`**
```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  is_virtual: boolean;
  capacity: number | null;
  registered_count: number;
  status: string;
}

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data;
    }
  });
}

export function useUpcomingEvents(limit = 3) {
  return useQuery<Event[]>({
    queryKey: ['upcoming-events', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data;
    }
  });
}
```

**3. `src/hooks/useJobs.ts`**
```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Job {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  remote_allowed: boolean;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  company: {
    id: string;
    name: string;
    logo_url: string | null;
  };
}

export function useJobs() {
  return useQuery<Job[]>({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          companies (
            id,
            name,
            logo_url
          )
        `)
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as Job[];
    }
  });
}
```

**Success Criteria**:
- [ ] All hooks created
- [ ] TypeScript compiles with 0 errors
- [ ] Hooks tested with React Query DevTools
- [ ] Data fetching works correctly

---

### Task 1.3: Create Base Components

**Priority**: 🔴 CRITICAL
**Estimated Time**: 3-4 hours
**Dependencies**: None

**Components to Create**:

**1. `src/components/dashboard/EmptyState.tsx`**
```typescript
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}
```

**2. `src/components/dashboard/LoadingState.tsx`**
```typescript
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  type?: 'cards' | 'list' | 'grid';
  count?: number;
}

export function LoadingState({ type = 'cards', count = 3 }: LoadingStateProps) {
  if (type === 'cards') {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  );
}
```

**3. `src/components/dashboard/EventCard.tsx`**
```typescript
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    event_date: string;
    location: string | null;
    is_virtual: boolean;
    registered_count: number;
  };
  registered?: boolean;
  onRegister?: (id: string) => void;
}

export function EventCard({ event, registered = false, onRegister }: EventCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          {registered && <Badge variant="secondary">Registered</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(event.event_date), 'MMM dd, yyyy • h:mm a')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{event.is_virtual ? 'Virtual Event' : event.location || 'TBD'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{event.registered_count} attending</span>
        </div>
      </CardContent>
      <CardFooter>
        {registered ? (
          <Button variant="outline" className="w-full" disabled>
            Already Registered
          </Button>
        ) : (
          <Button onClick={() => onRegister?.(event.id)} className="w-full">
            Register
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
```

**Success Criteria**:
- [ ] All components render without errors
- [ ] Components responsive on mobile/tablet/desktop
- [ ] TypeScript props properly typed
- [ ] Visual design matches Figma/design system

---

### Task 1.4: Connect Main Dashboard Page

**Priority**: 🔴 CRITICAL
**Estimated Time**: 2-3 hours
**Dependencies**: Task 1.2 (hooks), Task 1.3 (components)

**File to Modify**: `src/pages/Dashboard.tsx`

**Changes**:
1. Import `useDashboardMetrics` hook
2. Import `useUpcomingEvents` hook
3. Replace hardcoded data with real Supabase data
4. Add loading and error states
5. Keep "NO AUTH" pattern (mock user)

**Implementation**:
```typescript
import { useNavigate } from "react-router-dom";
import { Calendar, Briefcase, Gift, PresentationIcon } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EventCard } from "@/components/dashboard/EventCard";
import { LoadingState } from "@/components/dashboard/LoadingState";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { useUpcomingEvents } from "@/hooks/useEvents";

export default function Dashboard() {
  const navigate = useNavigate();

  // DEVELOPMENT ONLY - Mock user
  const mockUser = {
    full_name: "Alex Developer",
    progress: 75
  };

  // Fetch real metrics
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { data: upcomingEvents, isLoading: eventsLoading } = useUpcomingEvents(3);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {mockUser.full_name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Your startup journey is {mockUser.progress}% complete
          </p>
        </div>

        {/* Progress Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Your startup journey
                </p>
                <Progress value={mockUser.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Next Step: Complete AI Analysis
                </p>
                <Button size="sm" onClick={() => navigate('/pitch-deck-wizard')}>
                  Continue Wizard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        {metricsLoading ? (
          <LoadingState type="cards" count={4} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Events Registered"
              value={metrics?.events ?? 0}
              icon={Calendar}
              trend={{ value: `+${metrics?.eventsThisMonth ?? 0} this month`, positive: true }}
            />
            <MetricCard
              title="Job Applications"
              value={metrics?.jobs ?? 0}
              icon={Briefcase}
              trend={{ value: `${metrics?.jobsPending ?? 0} pending review` }}
            />
            <MetricCard
              title="Perks Claimed"
              value={metrics?.perks ?? 0}
              icon={Gift}
              description={`$${(metrics?.perksValue ?? 0).toLocaleString()} total value`}
            />
            <MetricCard
              title="Pitch Decks"
              value={metrics?.decks ?? 0}
              icon={PresentationIcon}
              trend={{ value: `${metrics?.decksDrafts ?? 0} drafts` }}
            />
          </div>
        )}

        {/* Quick Actions - Already Connected */}
        {/* ... existing Quick Actions code ... */}

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>📅 Upcoming Events</CardTitle>
              <CardDescription>Events you're registered for</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/events')}>
              View All →
            </Button>
          </CardHeader>
          <CardContent>
            {eventsLoading ? (
              <LoadingState type="list" count={3} />
            ) : upcomingEvents && upcomingEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    registered={true}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Calendar}
                title="No upcoming events"
                description="Register for events to see them here"
                action={{
                  label: "Browse Events",
                  onClick: () => navigate('/events')
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
```

**Success Criteria**:
- [ ] Real metrics display correctly
- [ ] Upcoming events fetch and render
- [ ] Loading states show during data fetch
- [ ] Empty states show when no data
- [ ] No console errors
- [ ] TypeScript compiles

---

## 🟡 Phase 2: Core Pages

### Task 2.1: Create Jobs Dashboard

**Priority**: 🔴 HIGH
**Estimated Time**: 4-5 hours
**Dependencies**: Task 1.1 (database), Task 1.2 (hooks)

**File to Create**: `src/pages/dashboard/DashboardJobs.tsx`

**Features**:
- Browse all jobs
- Filter by type, location, remote
- Apply to jobs (opens modal)
- Save/bookmark jobs
- View application status

**Component Structure**:
```typescript
// src/pages/dashboard/DashboardJobs.tsx
import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useJobs } from '@/hooks/useJobs';
import { JobCard } from '@/components/dashboard/JobCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function DashboardJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('all');

  const { data: jobs, isLoading } = useJobs();

  // Filter logic
  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobType === 'all' || job.type === jobType;
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          <p className="text-muted-foreground">
            Discover and apply to jobs in the Medellin ecosystem
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={jobType} onValueChange={setJobType}>
            <option value="all">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <LoadingState type="list" count={5} />
            ) : (
              <div className="grid gap-4">
                {filteredJobs?.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Other tabs... */}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
```

**JobCard Component**:
```typescript
// src/components/dashboard/JobCard.tsx
import { Briefcase, MapPin, DollarSign, Bookmark } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: { name: string; logo_url: string | null };
    location: string;
    remote_allowed: boolean;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string;
    type: string;
  };
  saved?: boolean;
}

export function JobCard({ job, saved = false }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            {job.company.logo_url && (
              <img
                src={job.company.logo_url}
                alt={job.company.name}
                className="h-12 w-12 rounded object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark className={saved ? 'fill-primary' : ''} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{job.type}</Badge>
          {job.remote_allowed && <Badge variant="outline">Remote</Badge>}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        {job.salary_min && job.salary_max && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>
              {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()} {job.salary_currency}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1">Apply Now</Button>
        <Button variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  );
}
```

**Success Criteria**:
- [ ] Jobs page renders all jobs from database
- [ ] Search filters jobs correctly
- [ ] Type filter works
- [ ] Tabs switch correctly
- [ ] Apply button opens modal (future)
- [ ] Save/bookmark works (future)

---

### Task 2.2-2.4: Connect Other Pages

Similar task structure for:
- **Task 2.2**: Connect Events Dashboard
- **Task 2.3**: Connect Pitch Decks Dashboard
- **Task 2.4**: Connect Settings Dashboard

(Detailed implementation similar to above)

---

## 🟢 Phase 3 & 4 Tasks

(Continued in next sections with Perks, Network, Analytics, Polish, Testing)

---

## Summary of All Tasks

| ID | Task | Phase | Priority | Time | Dependencies |
|----|------|-------|----------|------|--------------|
| 1.1 | Database Setup | 1 | 🔴 CRITICAL | 2-3h | None |
| 1.2 | Custom Hooks | 1 | 🔴 CRITICAL | 2-3h | None |
| 1.3 | Base Components | 1 | 🔴 CRITICAL | 3-4h | None |
| 1.4 | Main Dashboard Connection | 1 | 🔴 CRITICAL | 2-3h | 1.2, 1.3 |
| 2.1 | Jobs Dashboard | 2 | 🔴 HIGH | 4-5h | 1.1, 1.2 |
| 2.2 | Events Dashboard | 2 | 🔴 HIGH | 3-4h | 1.1, 1.2 |
| 2.3 | Pitch Decks Dashboard | 2 | 🔴 HIGH | 3-4h | 1.1, 1.2 |
| 2.4 | Settings Dashboard | 2 | 🟡 MEDIUM | 2-3h | 1.1, 1.2 |
| 3.1 | Perks Dashboard | 3 | 🟡 MEDIUM | 4-5h | 1.1, 1.2 |
| 3.2 | Charts & Analytics | 3 | 🟡 MEDIUM | 5-6h | All above |
| 4.1 | Performance Optimization | 4 | 🟢 LOW | 3-4h | All above |
| 4.2 | Testing Coverage | 4 | 🟢 LOW | 4-5h | All above |

**Total Estimated Time**: 40-50 hours (1-2 weeks with 1 developer)

---

**Document Version**: 1.0
**Last Updated**: January 2025
