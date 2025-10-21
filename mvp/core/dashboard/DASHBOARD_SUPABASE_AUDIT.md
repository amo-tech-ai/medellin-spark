# Dashboard Supabase Connection Audit Report

**Date**: January 2025
**Page**: `/src/pages/Dashboard.tsx`
**URL**: `http://localhost:8082/dashboard`
**Status**: ⚠️ **NO SUPABASE CONNECTIONS** - All data is hardcoded

---

## Executive Summary

The Dashboard page currently displays **100% mock data** with **zero database connections**. All user information, metrics, events, and job listings are hardcoded placeholder values.

**Critical Issues**:
- ❌ No user authentication check
- ❌ No profile data fetching
- ❌ No real-time metrics
- ❌ Hardcoded user name ("Sarah!")
- ❌ Static progress tracking (75%)
- ❌ Mock events and jobs data

---

## Current State Analysis

### 1. Welcome Section
**Current Implementation**:
```typescript
<h1>Welcome back, Sarah! 👋</h1>
<p>Your startup journey is 75% complete</p>
```

**Issues**:
- ✗ Hardcoded user name: "Sarah!"
- ✗ Hardcoded progress: 75%
- ✗ No authentication check
- ✗ No profile data fetch

**Required Connections**:
- `profiles` table → `full_name` or `first_name`
- Progress tracking system (needs definition)

---

### 2. Metrics Cards
**Current Implementation**:
```typescript
<MetricCard title="Events Registered" value={12} />
<MetricCard title="Job Applications" value={5} />
<MetricCard title="Perks Claimed" value={8} />
<MetricCard title="Profile Views" value={47} />
```

**Issues**:
- ✗ All values are hardcoded integers
- ✗ No database queries
- ✗ Trends are static strings

**Required Connections**:

| Metric | Database Table | Query |
|--------|---------------|-------|
| Events Registered | `registrations` | `COUNT(*) WHERE profile_id = user.id AND status = 'confirmed'` |
| Job Applications | (missing table) | Need `job_applications` table |
| Perks Claimed | `perk_claims` | `COUNT(*) WHERE startup_profile_id = user.startup_profile_id` |
| Profile Views | `profiles` | `view_count` column (needs to be added) |

---

### 3. Upcoming Events
**Current Implementation**:
```typescript
{[1, 2, 3].map((i) => (
  <div key={i}>
    <h4>AI Pitch Workshop</h4>
    <p>May 15, 2025 • 6:00 PM • Ruta N</p>
  </div>
))}
```

**Issues**:
- ✗ Mock data: Shows same event 3 times
- ✗ No database query
- ✗ Hardcoded event details

**Required Connection**:
```sql
SELECT
  e.id, e.title, e.event_date, e.location, e.is_virtual, e.virtual_url
FROM events e
JOIN registrations r ON r.event_id = e.id
WHERE r.profile_id = :user_id
  AND r.status = 'confirmed'
  AND e.event_date > NOW()
ORDER BY e.event_date ASC
LIMIT 3
```

**Available Schema** (from `events` table):
- `id` (uuid)
- `title` (text)
- `event_date` (timestamptz)
- `location` (text) - missing in current schema, need to add
- `is_virtual` (boolean)
- `virtual_url` (text)
- `organizer_id` (uuid)

---

### 4. Recommended Jobs
**Current Implementation**:
```typescript
{[
  {
    title: "Frontend Engineer - Remote",
    company: "TechCorp Medellin",
    salary: "$80K-$120K USD",
    match: 95,
  },
  {
    title: "Product Manager - Hybrid",
    company: "StartupXYZ",
    salary: "$60K-$90K USD",
    match: 88,
  },
].map((job, i) => (...))}
```

**Issues**:
- ✗ Hardcoded job data (2 static jobs)
- ✗ No database query
- ✗ Fake "match percentage"

**Required Connection**:
```sql
SELECT
  j.id, j.title, j.location, j.remote_allowed,
  j.salary_min, j.salary_max, j.salary_currency,
  c.name as company_name
FROM jobs j
JOIN companies c ON c.id = j.company_id
WHERE j.status = 'published'
  AND j.deleted_at IS NULL
ORDER BY j.created_at DESC
LIMIT 2
```

**Available Schema** (from `jobs` table):
- `id` (uuid)
- `company_id` (uuid)
- `title` (text)
- `description` (text)
- `type` (job_type enum)
- `location` (text)
- `remote_allowed` (boolean)
- `salary_min`, `salary_max` (numeric)
- `salary_currency` (text, default 'USD')

**Note**: "Match percentage" requires user skills matching algorithm (not implemented)

---

## Database Schema Availability

### ✅ Available Tables (from migrations)

**User & Profile**:
- `profiles` - User profile data
- `startup_profiles` - Startup-specific profiles

**Events System**:
- `events` - Event listings
- `registrations` - User event registrations
- `tickets` - Event tickets
- `sponsors` - Event sponsors

**Jobs System**:
- `jobs` - Job postings
- `companies` - Company profiles

**Perks System**:
- `perks` - Available perks
- `perk_claims` - User perk claims

**Presentations**:
- `presentations` - Pitch decks
- `custom_themes` - Custom themes
- `generated_images` - AI-generated images

### ❌ Missing Tables

**Required for Dashboard**:
- `job_applications` - Track user's job applications
- `profile_analytics` - Track profile views

---

## Recommendations

### Priority 1: Critical Connections (Must Have)

1. **User Authentication & Profile**
   ```typescript
   // Add to Dashboard.tsx
   import { useAuth } from "@/hooks/useAuth";

   const { user, loading } = useAuth();
   const { data: profile } = useQuery({
     queryKey: ['profile', user?.id],
     queryFn: () => supabase
       .from('profiles')
       .select('full_name, avatar_url')
       .eq('id', user?.id)
       .single()
   });
   ```

2. **Event Registrations**
   ```typescript
   const { data: upcomingEvents } = useQuery({
     queryKey: ['upcoming-events', user?.id],
     queryFn: async () => {
       const { data } = await supabase
         .from('registrations')
         .select(`
           event_id,
           events (
             id, title, event_date, is_virtual, virtual_url
           )
         `)
         .eq('profile_id', user?.id)
         .eq('status', 'confirmed')
         .gte('events.event_date', new Date().toISOString())
         .order('events.event_date', { ascending: true })
         .limit(3);
       return data;
     }
   });
   ```

3. **Perk Claims Count**
   ```typescript
   const { data: perkStats } = useQuery({
     queryKey: ['perk-claims-count', user?.id],
     queryFn: async () => {
       const { data: startupProfile } = await supabase
         .from('startup_profiles')
         .select('id')
         .eq('profile_id', user?.id)
         .single();

       const { count } = await supabase
         .from('perk_claims')
         .select('*', { count: 'exact', head: true })
         .eq('startup_profile_id', startupProfile?.id);

       return count;
     }
   });
   ```

### Priority 2: Enhanced Metrics (Should Have)

1. **Create `job_applications` table**
   ```sql
   CREATE TABLE job_applications (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     profile_id UUID NOT NULL REFERENCES profiles(id),
     job_id UUID NOT NULL REFERENCES jobs(id),
     status TEXT DEFAULT 'pending',
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

2. **Add profile analytics**
   - Add `view_count` column to `profiles` table
   - Track profile views via RPC function

### Priority 3: Smart Recommendations (Nice to Have)

1. **Job Matching Algorithm**
   - Match user skills with job requirements
   - Calculate compatibility score
   - Filter by location preferences

2. **Progress Tracking System**
   - Define milestone criteria
   - Track completion percentage
   - Update in real-time

---

## Migration Path

### Phase 1: Quick Wins (1-2 hours)
- Connect user profile name
- Fetch upcoming events from registrations
- Display perk claims count

### Phase 2: Full Metrics (3-4 hours)
- Create job_applications table
- Add profile view tracking
- Connect all metric cards

### Phase 3: Smart Features (1-2 days)
- Implement job matching
- Build progress tracking
- Add real-time updates

---

## Code Examples

### Complete Dashboard with Supabase (Skeleton)

```typescript
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user!.id)
        .single();
      return data;
    }
  });

  // Fetch event registrations count
  const { data: eventCount } = useQuery({
    queryKey: ['event-registrations-count', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { count } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', user!.id)
        .eq('status', 'confirmed');
      return count ?? 0;
    }
  });

  // Fetch upcoming events
  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ['upcoming-events', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from('registrations')
        .select(`
          event_id,
          events!inner (
            id, title, event_date, is_virtual
          )
        `)
        .eq('profile_id', user!.id)
        .eq('status', 'confirmed')
        .gte('events.event_date', new Date().toISOString())
        .order('events.event_date', { ascending: true })
        .limit(3);
      return data?.map(r => r.events) ?? [];
    }
  });

  // Fetch recent jobs
  const { data: recentJobs = [] } = useQuery({
    queryKey: ['recent-jobs'],
    queryFn: async () => {
      const { data } = await supabase
        .from('jobs')
        .select(`
          id, title, location, remote_allowed,
          salary_min, salary_max, salary_currency,
          companies (name)
        `)
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(2);
      return data ?? [];
    }
  });

  if (authLoading) return <div>Loading...</div>;
  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section - Now with real data */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile?.full_name || 'there'}! 👋
          </h1>
        </div>

        {/* Metrics - Now with real data */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Events Registered"
            value={eventCount}
            icon={Calendar}
          />
          {/* Other metrics... */}
        </div>

        {/* Upcoming Events - Real data */}
        <Card>
          <CardHeader>
            <CardTitle>📅 Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <p>No upcoming events</p>
            ) : (
              upcomingEvents.map(event => (
                <div key={event.id}>
                  <h4>{event.title}</h4>
                  <p>{new Date(event.event_date).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
```

---

## Security Considerations

**RLS Policies Required**:
- `profiles`: Users can read their own profile
- `registrations`: Users can read their own registrations
- `events`: Public read for published events
- `jobs`: Public read for published jobs
- `perk_claims`: Users can read their own claims

**Example RLS Policy**:
```sql
-- Allow users to read their own registrations
CREATE POLICY "Users can read own registrations"
ON registrations FOR SELECT
USING (auth.uid() = profile_id);
```

---

## Testing Checklist

- [ ] User sees their actual name (not "Sarah!")
- [ ] Event count matches database records
- [ ] Upcoming events show real data (not "AI Pitch Workshop" x3)
- [ ] Jobs display real listings from database
- [ ] Perk claims count is accurate
- [ ] Loading states show during data fetch
- [ ] Error states handle failed queries
- [ ] Unauthenticated users redirect to /auth

---

## Conclusion

**Current Status**: 0/10 - Dashboard is a static mockup

**After Implementation**: Expected 10/10
- ✅ Real user data
- ✅ Live metrics
- ✅ Actual event listings
- ✅ Current job postings
- ✅ Accurate perk tracking

**Estimated Implementation Time**: 4-6 hours for full integration

**Blocked By**:
- Need to add `location` field to `events` table
- Need to create `job_applications` table
- Need to add `view_count` to `profiles` table

---

**Report Generated**: January 2025
**Next Steps**: Review with team, prioritize implementation phases
