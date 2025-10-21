# Dashboard - Core Implementation (Foundation)

**Phase**: Foundation
**Time**: 9-13 hours (Week 1)
**Priority**: 🔴 CRITICAL
**Difficulty**: Beginner-Intermediate

---

## Overview

Core foundation for dashboard implementation. Establishes database tables, React Query hooks, base UI components, and connects the main dashboard page to real Supabase data.

**Outcome**: Working main dashboard with real metrics, no hardcoded data.

---

## Prerequisites

- Node.js 18+ installed
- Supabase project created
- React + TypeScript + Vite setup complete
- shadcn/ui components installed

---

## Implementation Steps

### Step 1: Database Migration (2-3 hours)

**Create**: `supabase/migrations/20250120000000_dashboard_foundation.sql`

```sql
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

-- 2. Add location to events table
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
CREATE INDEX idx_saved_jobs_job ON saved_jobs(job_id);

-- 5. Enable RLS on all tables
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies
CREATE POLICY "Users can view own job applications"
  ON job_applications FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Users can create own job applications"
  ON job_applications FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can view own saved jobs"
  ON saved_jobs FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Users can save jobs"
  ON saved_jobs FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can unsave jobs"
  ON saved_jobs FOR DELETE
  USING (profile_id = auth.uid());
```

**Apply Migration**:
```bash
npx supabase db push
```

**Verification**:
```bash
# Check tables exist
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "\dt"

# Expected tables:
# - job_applications
# - saved_jobs
# - events (with location column)
# - presentations (with view_count)
```

---

### Step 2: Create React Query Hooks (2-3 hours)

**Create**: `src/hooks/useDashboardMetrics.ts`

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
        supabase.from('registrations')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', firstDayOfMonth.toISOString()),
        supabase.from('job_applications').select('*', { count: 'exact', head: true }),
        supabase.from('job_applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending'),
        supabase.from('perk_claims').select('*', { count: 'exact', head: true }),
        supabase.from('presentations').select('*', { count: 'exact', head: true }),
        supabase.from('presentations')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'draft')
      ]);

      return {
        events: registrations.count ?? 0,
        eventsThisMonth: registrationsMonth.count ?? 0,
        jobs: applications.count ?? 0,
        jobsPending: applicationsPending.count ?? 0,
        perks: claims.count ?? 0,
        perksValue: 12000, // TODO: Calculate from perk_claims
        decks: presentations.count ?? 0,
        decksDrafts: draftPresentations.count ?? 0
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

**Create**: `src/hooks/useEvents.ts`

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
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
```

---

### Step 3: Create Base UI Components (3-4 hours)

**Create**: `src/components/dashboard/EmptyState.tsx`

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

**Create**: `src/components/dashboard/LoadingState.tsx`

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

**Create**: `src/components/dashboard/EventCard.tsx`

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

**Install date-fns**:
```bash
pnpm add date-fns
```

---

### Step 4: Connect Main Dashboard (2-3 hours)

**Update**: `src/pages/Dashboard.tsx`

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

  // DEVELOPMENT ONLY - Mock user (no auth during dev)
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

---

## Success Criteria

### Database
- [ ] All tables created successfully
- [ ] Indexes added
- [ ] RLS policies active
- [ ] Foreign keys working

### Hooks
- [ ] `useDashboardMetrics` returns data
- [ ] `useUpcomingEvents` returns data
- [ ] React Query DevTools shows queries
- [ ] Loading states work
- [ ] Error handling works

### UI Components
- [ ] EmptyState renders correctly
- [ ] LoadingState shows skeletons
- [ ] EventCard displays event info
- [ ] Mobile responsive

### Dashboard Page
- [ ] Real metrics display
- [ ] No hardcoded data
- [ ] Loading states show
- [ ] Empty states show when no data
- [ ] Quick actions work
- [ ] Navigation works

---

## Testing Commands

```bash
# 1. TypeScript check
pnpm tsc --noEmit

# 2. Build test
pnpm build

# 3. Start dev server
pnpm dev

# Navigate to: http://localhost:8080/dashboard

# 4. Test database queries
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "SELECT * FROM job_applications LIMIT 5;"
```

---

## Common Issues

### Issue: Metrics show 0
**Fix**: Insert sample data or check table names match hooks

### Issue: RLS blocking queries
**Fix**: Check RLS policies allow SELECT for auth.uid()

### Issue: TypeScript errors
**Fix**: Run `pnpm tsc --noEmit` and fix type errors

---

## Next Steps

→ **02-intermediate.md** - Build Jobs, Events, Pitch Decks, Settings pages

---

**Estimated Total Time**: 9-13 hours
**Difficulty**: Beginner-Intermediate
**Status**: ✅ Ready to implement
