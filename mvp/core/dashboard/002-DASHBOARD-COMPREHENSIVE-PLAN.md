# 🎯 Dashboard Comprehensive Planning Document

**Project**: Medellin Spark - Startup Ecosystem Platform
**Tech Stack**: React + TypeScript + Vite + Supabase
**Date**: January 2025

**CRITICAL RULE**: ❌ **NO AUTH DURING DEVELOPMENT** - All functionality works without authentication

---

## 🧩 Dashboard Overview

### Purpose
Centralized hub for startups to manage their journey, access resources, track progress, and engage with the Medellin ecosystem.

### Target Users
1. **Startup Founders** - Primary users managing their startup journey
2. **Organizers** - Event and program administrators (future)
3. **Sponsors** - Companies supporting the ecosystem (future)
4. **Admins** - Platform administrators (future)

### Key Objectives
- **Single Source of Truth**: All startup data and activity in one place
- **Progress Tracking**: Visual journey through ecosystem milestones
- **Resource Discovery**: Easy access to events, jobs, perks
- **Community Engagement**: Connect with mentors, peers, sponsors
- **Data-Driven Insights**: Analytics on startup progress and ecosystem health

---

## 📄 Pages & Components

### Current State Assessment

#### ✅ Existing Pages (4/8)

| Page | Route | File | Status | Data Connection |
|------|-------|------|--------|----------------|
| **Main Dashboard** | `/dashboard` | `Dashboard.tsx` | ✅ Exists | ❌ Mock data |
| **Events** | `/dashboard/events` | `DashboardEvents.tsx` | ✅ Exists | ❌ Mock data |
| **Pitch Decks** | `/dashboard/pitch-decks` | `DashboardPitchDecks.tsx` | ✅ Exists | ❌ Mock data |
| **Settings** | `/dashboard/settings` | `DashboardSettings.tsx` | ✅ Exists | ❌ Mock data |

#### ✅ Existing Components (4/12)

| Component | Location | Purpose | Status |
|-----------|----------|---------|--------|
| **DashboardLayout** | `dashboard/DashboardLayout.tsx` | Main layout wrapper | ✅ Working |
| **DashboardSidebar** | `dashboard/DashboardSidebar.tsx` | Navigation sidebar | ✅ Working |
| **DashboardHeader** | `dashboard/DashboardHeader.tsx` | Top header bar | ✅ Working |
| **MetricCard** | `dashboard/MetricCard.tsx` | Stat card component | ✅ Working |

#### 🆕 Required New Pages (4)

| Page | Route | Priority | Description |
|------|-------|----------|-------------|
| **Jobs** | `/dashboard/jobs` | 🔴 HIGH | Job board + applications tracking |
| **Perks** | `/dashboard/perks` | 🟡 MEDIUM | Startup perks + benefits claims |
| **Network** | `/dashboard/network` | 🟢 LOW | Connections + mentors |
| **Analytics** | `/dashboard/analytics` | 🟢 LOW | Insights + metrics |

#### 🆕 Required New Components (8)

| Component | Purpose | Priority |
|-----------|---------|----------|
| **EventCard** | Event listing card | 🔴 HIGH |
| **JobCard** | Job posting card | 🔴 HIGH |
| **PerkCard** | Perk benefit card | 🟡 MEDIUM |
| **PresentationCard** | Pitch deck card | 🔴 HIGH |
| **ActivityFeedItem** | Recent activity item | 🟡 MEDIUM |
| **StatChart** | Chart visualization | 🟡 MEDIUM |
| **EmptyState** | No data placeholder | 🔴 HIGH |
| **LoadingState** | Loading skeleton | 🔴 HIGH |

---

## 🗂️ Database Fields & Connections

### Current Database Schema

#### ✅ Available Tables

**User Management**:
```sql
-- profiles: User account data
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- startup_profiles: Startup information
CREATE TABLE startup_profiles (
  id UUID PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  company_name TEXT,
  description TEXT,
  industry TEXT,
  stage TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ
);
```

**Events System**:
```sql
-- events: Event listings
CREATE TABLE events (
  id UUID PRIMARY KEY,
  organizer_id UUID,
  title TEXT,
  description TEXT,
  event_date TIMESTAMPTZ,
  status TEXT,
  is_virtual BOOLEAN,
  capacity INTEGER,
  registered_count INTEGER,
  created_at TIMESTAMPTZ
);

-- registrations: User event registrations
CREATE TABLE registrations (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  profile_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ
);
```

**Jobs System**:
```sql
-- jobs: Job postings
CREATE TABLE jobs (
  id UUID PRIMARY KEY,
  company_id UUID,
  title TEXT,
  description TEXT,
  type TEXT,
  location TEXT,
  remote_allowed BOOLEAN,
  salary_min NUMERIC,
  salary_max NUMERIC,
  salary_currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ
);

-- companies: Company profiles
CREATE TABLE companies (
  id UUID PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  name TEXT,
  logo_url TEXT,
  website_url TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ
);
```

**Perks System**:
```sql
-- perks: Available benefits
CREATE TABLE perks (
  id UUID PRIMARY KEY,
  title TEXT,
  description TEXT,
  provider_name TEXT,
  category TEXT,
  value_description TEXT,
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ
);

-- perk_claims: User perk claims
CREATE TABLE perk_claims (
  id UUID PRIMARY KEY,
  startup_profile_id UUID REFERENCES startup_profiles(id),
  perk_id UUID REFERENCES perks(id),
  status TEXT DEFAULT 'pending',
  claimed_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ
);
```

**Presentations**:
```sql
-- presentations: Pitch decks
CREATE TABLE presentations (
  id UUID PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  title TEXT,
  content JSONB,
  theme TEXT,
  status TEXT DEFAULT 'draft',
  slide_count INTEGER,
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

#### ❌ Missing Tables (Required)

**Priority 1 - Critical**:
```sql
-- job_applications: Track user job applications
CREATE TABLE job_applications (
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
```

**Priority 2 - Enhanced**:
```sql
-- saved_jobs: Bookmarked jobs
CREATE TABLE saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, job_id)
);

-- Add missing fields to existing tables
ALTER TABLE events ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE presentations ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
```

**Priority 3 - Future**:
```sql
-- connections: Network relationships
CREATE TABLE connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_profile_id UUID REFERENCES profiles(id),
  to_profile_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_profile_id, to_profile_id)
);

-- analytics_events: Track user actions
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_profile_type ON analytics_events(profile_id, event_type);
```

### Data Connection Strategy

#### Pattern 1: Direct Supabase Query (No Auth)

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Fetch all events (no user filtering)
const { data: events, isLoading } = useQuery({
  queryKey: ['events'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
  }
});
```

#### Pattern 2: Joined Data Queries

```typescript
// Fetch user's event registrations with event details
const { data: registrations } = useQuery({
  queryKey: ['user-registrations'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('registrations')
      .select(`
        id,
        status,
        created_at,
        events (
          id,
          title,
          event_date,
          location,
          is_virtual
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
});
```

#### Pattern 3: Aggregate Queries

```typescript
// Get metric counts
const { data: metrics } = useQuery({
  queryKey: ['dashboard-metrics'],
  queryFn: async () => {
    const [eventsCount, jobsCount, perksCount, decksCount] = await Promise.all([
      supabase.from('registrations').select('*', { count: 'exact', head: true }),
      supabase.from('job_applications').select('*', { count: 'exact', head: true }),
      supabase.from('perk_claims').select('*', { count: 'exact', head: true }),
      supabase.from('presentations').select('*', { count: 'exact', head: true })
    ]);

    return {
      events: eventsCount.count ?? 0,
      jobs: jobsCount.count ?? 0,
      perks: perksCount.count ?? 0,
      decks: decksCount.count ?? 0
    };
  }
});
```

---

## 📊 Charts & KPIs

### Main Dashboard Metrics

#### 1. Overview KPIs (Top Cards)

| Metric | Source | Calculation | Target |
|--------|--------|-------------|--------|
| **Events Registered** | `registrations` | `COUNT(*)` | Track engagement |
| **Job Applications** | `job_applications` | `COUNT(*)` | Career progress |
| **Perks Claimed** | `perk_claims` | `COUNT(*)` | Value received |
| **Pitch Decks** | `presentations` | `COUNT(*)` | Content created |

```typescript
interface DashboardMetrics {
  eventsRegistered: number;
  eventsRegisteredTrend: string; // "+3 this month"
  jobApplications: number;
  jobApplicationsPending: number;
  perksClaimed: number;
  perksValue: string; // "$12K total value"
  pitchDecks: number;
  pitchDecksDrafts: number;
}
```

#### 2. Activity Timeline Chart

**Type**: Line chart
**Data**: User actions over time (last 30 days)
**Y-Axis**: Action count
**X-Axis**: Date
**Series**: Events, Jobs, Perks, Decks

```typescript
interface ActivityDataPoint {
  date: string; // "2025-01-15"
  events: number;
  jobs: number;
  perks: number;
  decks: number;
}

// Query
SELECT
  DATE(created_at) as date,
  COUNT(*) as count,
  'event' as type
FROM registrations
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
UNION ALL
SELECT
  DATE(applied_at) as date,
  COUNT(*) as count,
  'job' as type
FROM job_applications
WHERE applied_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(applied_at)
-- ... (similar for perks, decks)
ORDER BY date DESC;
```

#### 3. Event Participation Breakdown

**Type**: Donut chart
**Data**: Event registrations by category
**Values**: Workshop, Networking, Pitch Competition, etc.

```typescript
interface EventBreakdown {
  category: string;
  count: number;
  percentage: number;
}
```

#### 4. Job Application Funnel

**Type**: Horizontal bar chart
**Data**: Application status breakdown
**Categories**: Applied, Reviewing, Interview, Rejected, Accepted

```typescript
interface JobFunnel {
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  count: number;
}
```

### Events Dashboard Charts

| Chart | Type | Purpose |
|-------|------|---------|
| **Upcoming Events Calendar** | Calendar view | Visual event timeline |
| **Registration Trends** | Area chart | Registration growth over time |
| **Event Types Distribution** | Pie chart | Breakdown by category |

### Jobs Dashboard Charts

| Chart | Type | Purpose |
|-------|------|---------|
| **Application Status** | Funnel chart | Application pipeline |
| **Salary Ranges** | Box plot | Market insights |
| **Jobs by Industry** | Bar chart | Industry distribution |

### Analytics Dashboard (Future)

| Chart | Type | Purpose |
|-------|------|---------|
| **Profile Views** | Line chart | Profile engagement |
| **Deck Views** | Line chart | Presentation reach |
| **Engagement Score** | Gauge chart | Overall activity score |
| **Journey Progress** | Progress bar | Milestone completion |

---

## 🔄 User Journeys / Flows

### Journey 1: New Startup Founder Onboarding

**Goal**: Complete profile and access first resources

```
1. Land on Dashboard
   ↓
2. See Welcome Message + Setup Checklist
   ├─ Complete Startup Profile (20%)
   ├─ Create First Pitch Deck (40%)
   ├─ Register for Event (60%)
   ├─ Apply to Job (80%)
   └─ Claim First Perk (100%)
   ↓
3. Progress Bar Updates Dynamically
   ↓
4. Quick Actions Guide to Next Step
```

**Success Criteria**:
- [ ] Profile created within 5 minutes
- [ ] First action taken within 10 minutes
- [ ] 80% completion within first week

### Journey 2: Event Discovery & Registration

**Goal**: Find and register for relevant events

```
1. Dashboard → See "Upcoming Events" Widget
   ↓
2. Click "View All Events"
   ↓
3. Browse Events (/dashboard/events)
   ├─ Filter by category
   ├─ Search by keyword
   └─ Sort by date
   ↓
4. Click Event Card
   ↓
5. View Event Details Modal
   ├─ Description
   ├─ Date/time/location
   ├─ Attendee count
   └─ Similar events
   ↓
6. Click "Register" Button
   ↓
7. Confirmation Toast
   ↓
8. Event Appears in "My Events" Tab
```

**Success Criteria**:
- [ ] Event discovery < 2 minutes
- [ ] Registration complete < 30 seconds
- [ ] Confirmation received immediately

### Journey 3: Job Application Workflow

**Goal**: Apply to relevant job opportunities

```
1. Dashboard → "Recommended Jobs" Section
   ↓
2. Click "View All Jobs" → /dashboard/jobs
   ↓
3. Browse Jobs (Filtered by Match %)
   ↓
4. Save Job (Bookmark Icon)
   ↓
5. Click "Apply Now"
   ↓
6. Application Modal Opens
   ├─ Cover Letter (Optional)
   ├─ Resume Upload
   └─ Confirm Details
   ↓
7. Submit Application
   ↓
8. Application Tracked in "My Applications" Tab
   ↓
9. Receive Status Updates (Email + Dashboard)
```

**Success Criteria**:
- [ ] Job found < 3 minutes
- [ ] Application submitted < 5 minutes
- [ ] Status visible in real-time

### Journey 4: Pitch Deck Creation & Sharing

**Goal**: Create professional pitch deck using AI

```
1. Dashboard → "Generate Pitch Deck" Button
   ↓
2. Redirect to /pitch-deck-wizard
   ↓
3. AI Chat Interface
   ├─ Answer 5-7 questions
   ├─ Progress bar shows completeness
   └─ Data collected about startup
   ↓
4. "Generate Deck" Button Appears
   ↓
5. Click Generate → Loading State
   ↓
6. Redirect to /presentations/{id}/outline
   ↓
7. View 10-Slide Grid
   ├─ Edit slides
   ├─ Change theme
   └─ Add images
   ↓
8. Click "Share" → Get Public Link
   ↓
9. Deck Visible in /dashboard/pitch-decks
```

**Success Criteria**:
- [ ] Deck generated < 2 minutes
- [ ] All 10 slides render correctly
- [ ] Shareable link works immediately

### Journey 5: Perk Discovery & Claiming

**Goal**: Maximize value from ecosystem perks

```
1. Dashboard → "Perks Claimed" Metric
   ↓
2. Click "View Perks" → /dashboard/perks
   ↓
3. Browse Perks Grid
   ├─ Filter by category
   ├─ Sort by value
   └─ Featured perks highlighted
   ↓
4. Click Perk Card → View Details
   ├─ Savings amount
   ├─ How to claim
   ├─ Eligibility criteria
   └─ Provider info
   ↓
5. Click "Claim Perk"
   ↓
6. Claim Form (if needed)
   ↓
7. Status: "Pending Approval"
   ↓
8. Email Notification on Approval
   ↓
9. Status: "Approved" → Redeem Instructions
```

**Success Criteria**:
- [ ] Perk claimed < 2 minutes
- [ ] Approval within 24 hours
- [ ] Redemption instructions clear

---

## ⚙️ Tech Integration Plan (Supabase + Vite + React)

### Environment Variables Setup

**File**: `.env`
```bash
# Supabase Connection
VITE_SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Development Mode (NO AUTH)
VITE_DEV_MODE=true
VITE_MOCK_USER_ID=00000000-0000-0000-0000-000000000000
```

**File**: `.env.example`
```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Development
VITE_DEV_MODE=true
VITE_MOCK_USER_ID=test_user_id
```

### Supabase Client Setup

**File**: `src/integrations/supabase/client.ts`
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### React Query Setup

**File**: `src/App.tsx`
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* App content */}
    </QueryClientProvider>
  );
}
```

### Custom Hooks Pattern

**File**: `src/hooks/useDashboardMetrics.ts`
```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardMetrics {
  events: number;
  jobs: number;
  perks: number;
  decks: number;
}

export function useDashboardMetrics() {
  return useQuery<DashboardMetrics>({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const [eventsCount, jobsCount, perksCount, decksCount] = await Promise.all([
        supabase.from('registrations').select('*', { count: 'exact', head: true }),
        supabase.from('job_applications').select('*', { count: 'exact', head: true }),
        supabase.from('perk_claims').select('*', { count: 'exact', head: true }),
        supabase.from('presentations').select('*', { count: 'exact', head: true })
      ]);

      return {
        events: eventsCount.count ?? 0,
        jobs: jobsCount.count ?? 0,
        perks: perksCount.count ?? 0,
        decks: decksCount.count ?? 0
      };
    }
  });
}
```

### Real-Time Data Subscriptions (Future)

```typescript
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useRealtimeEvents() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscription = supabase
      .channel('events_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'events'
      }, () => {
        // Invalidate events query on any change
        queryClient.invalidateQueries(['events']);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);
}
```

### Folder Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx ✅
│   │   ├── DashboardSidebar.tsx ✅
│   │   ├── DashboardHeader.tsx ✅
│   │   ├── MetricCard.tsx ✅
│   │   ├── EventCard.tsx [NEW]
│   │   ├── JobCard.tsx [NEW]
│   │   ├── PerkCard.tsx [NEW]
│   │   ├── PresentationCard.tsx [NEW]
│   │   ├── ActivityFeedItem.tsx [NEW]
│   │   ├── EmptyState.tsx [NEW]
│   │   └── LoadingState.tsx [NEW]
│   └── ui/ (shadcn components)
├── hooks/
│   ├── useDashboardMetrics.ts [NEW]
│   ├── useEvents.ts [NEW]
│   ├── useJobs.ts [NEW]
│   ├── usePerks.ts [NEW]
│   └── usePresentations.ts [NEW]
├── pages/
│   ├── Dashboard.tsx ✅
│   ├── DashboardEvents.tsx ✅
│   ├── DashboardPitchDecks.tsx ✅
│   ├── DashboardSettings.tsx ✅
│   └── dashboard/
│       ├── DashboardJobs.tsx [NEW]
│       ├── DashboardPerks.tsx [NEW]
│       ├── DashboardNetwork.tsx [FUTURE]
│       └── DashboardAnalytics.tsx [FUTURE]
├── types/
│   ├── dashboard.types.ts [NEW]
│   ├── events.types.ts [NEW]
│   └── jobs.types.ts [NEW]
└── integrations/
    └── supabase/
        └── client.ts ✅
```

---

## ✅ Best Practices Summary

### 1. Design Principles

**Responsive Layout**:
- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly tap targets (min 44px)
- Collapsible sidebar on mobile

**Accessibility**:
- Semantic HTML (`<main>`, `<nav>`, `<article>`)
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratio ≥ 4.5:1
- Focus indicators visible

**Visual Design**:
- Consistent spacing (Tailwind scale: 4px units)
- Color palette from design system
- Typography scale: xs, sm, base, lg, xl, 2xl, 3xl
- Icons from Lucide React
- Loading skeletons for better UX

### 2. State Management

**Data Fetching**: React Query
```typescript
// ✅ Good: Use React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['events'],
  queryFn: fetchEvents
});

// ❌ Bad: Manual useState + useEffect
const [data, setData] = useState([]);
useEffect(() => { fetchData().then(setData); }, []);
```

**Local State**: useState
```typescript
// ✅ Good: Component-level state
const [isOpen, setIsOpen] = useState(false);

// ❌ Bad: Global state for local UI
const { isModalOpen } = useGlobalStore();
```

**Form State**: React Hook Form (future)
```typescript
import { useForm } from 'react-hook-form';

const { register, handleSubmit } = useForm();
```

### 3. Loading States

**Skeleton Pattern**:
```typescript
{isLoading ? (
  <div className="space-y-4">
    {[1, 2, 3].map(i => (
      <Skeleton key={i} className="h-24 w-full" />
    ))}
  </div>
) : (
  data?.map(item => <ItemCard key={item.id} item={item} />)
)}
```

**Optimistic Updates** (future):
```typescript
const mutation = useMutation({
  mutationFn: updateItem,
  onMutate: async (newItem) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['items']);

    // Snapshot previous value
    const previous = queryClient.getQueryData(['items']);

    // Optimistically update
    queryClient.setQueryData(['items'], old => [...old, newItem]);

    return { previous };
  },
  onError: (err, newItem, context) => {
    // Rollback on error
    queryClient.setQueryData(['items'], context.previous);
  }
});
```

### 4. Error Handling

**Query Error Boundaries**:
```typescript
const { data, error } = useQuery({
  queryKey: ['events'],
  queryFn: fetchEvents
});

if (error) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error loading events</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
}
```

**Toast Notifications**:
```typescript
import { toast } from 'sonner';

const mutation = useMutation({
  mutationFn: createEvent,
  onSuccess: () => {
    toast.success('Event created successfully!');
  },
  onError: (error) => {
    toast.error(`Failed to create event: ${error.message}`);
  }
});
```

### 5. Performance Optimization

**Code Splitting**:
```typescript
import { lazy, Suspense } from 'react';

const DashboardAnalytics = lazy(() => import('./pages/dashboard/DashboardAnalytics'));

<Suspense fallback={<LoadingState />}>
  <DashboardAnalytics />
</Suspense>
```

**Virtualization** (for long lists):
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 100,
  overscan: 5
});
```

**Memoization**:
```typescript
import { useMemo } from 'react';

const sortedData = useMemo(() => {
  return data?.sort((a, b) => a.date - b.date);
}, [data]);
```

### 6. Testing Strategy

**Unit Tests**: Vitest
```typescript
import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';

test('renders metric value', () => {
  render(<MetricCard title="Events" value={12} icon={Calendar} />);
  expect(screen.getByText('12')).toBeInTheDocument();
});
```

**Integration Tests**: Testing Library
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useDashboardMetrics } from './useDashboardMetrics';

test('fetches dashboard metrics', async () => {
  const { result } = renderHook(() => useDashboardMetrics());

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toHaveProperty('events');
});
```

**E2E Tests**: Playwright (see testing strategy doc)

### 7. Security Checklist

- [ ] No API keys in frontend code
- [ ] Environment variables use `VITE_` prefix
- [ ] Input validation on all forms
- [ ] SQL injection prevention (Supabase handles this)
- [ ] XSS prevention (React escapes by default)
- [ ] HTTPS only in production
- [ ] RLS policies enabled (future, when auth added)

### 8. Code Quality

**TypeScript Strict Mode**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**ESLint Rules**:
```json
{
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

**Naming Conventions**:
- Components: `PascalCase.tsx`
- Hooks: `use*.ts`
- Types: `*.types.ts`
- Utils: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE`

---

## 📐 Component Design Patterns

### Card Component Pattern

```typescript
// EventCard.tsx
interface EventCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
    attendees: number;
  };
  onRegister?: (id: string) => void;
}

export function EventCard({ event, onRegister }: EventCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>
          {format(new Date(event.date), 'MMM dd, yyyy • h:mm a')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <Users className="h-4 w-4" />
          <span>{event.attendees} attendees</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onRegister?.(event.id)} className="w-full">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Empty State Pattern

```typescript
// EmptyState.tsx
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

---

## 🎯 Success Metrics

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Page Load Time** | < 2s | Lighthouse |
| **Time to Interactive** | < 3s | Lighthouse |
| **Largest Contentful Paint** | < 2.5s | Core Web Vitals |
| **Cumulative Layout Shift** | < 0.1 | Core Web Vitals |
| **TypeScript Coverage** | 100% | tsc --noEmit |
| **Build Time** | < 10s | Vite build |

### User Experience Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Data Fetch Latency** | < 500ms | React Query DevTools |
| **Error Rate** | < 1% | Error tracking |
| **Dashboard Render** | < 100ms | React DevTools Profiler |
| **Mobile Responsive** | 100% pages | Manual testing |

### Feature Completion

- [ ] All 8 dashboard pages created
- [ ] All components responsive
- [ ] All database connections working
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Empty states implemented
- [ ] Charts rendering correctly
- [ ] Real-time data (future)

---

**Document Version**: 1.0
**Last Updated**: January 2025
**Status**: Ready for Implementation ✅
