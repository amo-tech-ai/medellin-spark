# Dashboard Pages Plan

**Project**: Medellin Spark - Startup Ecosystem Platform
**Location**: `/src/pages/Dashboard*.tsx` and `/src/pages/dashboard/`
**Date**: January 2025

**CRITICAL RULE**: ❌ **NO AUTH DURING DEVELOPMENT** - All pages accessible without authentication

---

## Executive Summary

Complete dashboard structure for Medellin Spark startup ecosystem platform with 8 main pages covering all user workflows.

**Goal**: Centralized hub for startups to manage their journey, access resources, track progress, and engage with the ecosystem.

---

## Current State

### ✅ Existing Pages (4)

| Route | File | Status | Data Connection |
|-------|------|--------|----------------|
| `/dashboard` | `Dashboard.tsx` | ✅ Exists | ❌ Mock data only |
| `/dashboard/events` | `DashboardEvents.tsx` | ✅ Exists | ❌ Mock data only |
| `/dashboard/pitch-decks` | `DashboardPitchDecks.tsx` | ✅ Exists | ❌ Mock data only |
| `/dashboard/settings` | `DashboardSettings.tsx` | ✅ Exists | ❌ Mock data only |

---

## Proposed Dashboard Structure

### 🏠 Main Dashboard Hub

**Route**: `/dashboard`
**File**: `src/pages/Dashboard.tsx`
**Purpose**: Central overview with key metrics, quick actions, and activity feed

**Layout Sections**:
1. **Welcome Section**
   - User name (from profiles)
   - Journey progress indicator
   - Next recommended action

2. **Key Metrics Grid** (4 cards)
   - Events Registered → `registrations` count
   - Job Applications → `job_applications` count
   - Perks Claimed → `perk_claims` count
   - Pitch Decks Created → `presentations` count

3. **Quick Actions** (6 buttons)
   - Generate Pitch Deck → `/pitch-deck-wizard`
   - My Pitch Decks → `/dashboard/pitch-decks`
   - Update Profile → `/startup-profile`
   - Browse Events → `/dashboard/events`
   - View Jobs → `/dashboard/jobs`
   - Claim Perks → `/dashboard/perks`

4. **Upcoming Events** (3 items)
   - Next 3 registered events
   - Date, time, location
   - Quick action buttons

5. **Recent Activity Feed** (5 items)
   - Latest actions (pitch deck created, event registered, perk claimed)
   - Timestamps
   - Quick links

**Priority**: 🔴 **HIGH** - Already exists, needs Supabase connection

---

### 📅 Events Dashboard

**Route**: `/dashboard/events`
**File**: `src/pages/DashboardEvents.tsx`
**Purpose**: Manage event registrations and discover new events

**Layout Sections**:
1. **Header**
   - Page title: "My Events"
   - Stats: Total registered, Upcoming count, Past count
   - Search bar

2. **Tabs**
   - Upcoming (default)
   - Past
   - Saved/Interested

3. **Event Cards** (Grid view)
   - Event title, date, location
   - Registration status badge
   - Attendee count
   - Quick actions: View Details, Cancel Registration

4. **Discover Events Sidebar**
   - Recommended events based on interests
   - Browse all events button

**Database Connections**:
```sql
-- User's registered events
SELECT e.*, r.status
FROM events e
JOIN registrations r ON r.event_id = e.id
WHERE r.profile_id = :user_id
ORDER BY e.event_date DESC

-- Recommended events
SELECT * FROM events
WHERE status = 'published'
  AND event_date > NOW()
  AND id NOT IN (
    SELECT event_id FROM registrations WHERE profile_id = :user_id
  )
LIMIT 5
```

**Priority**: 🟡 **MEDIUM** - Exists, needs connection

---

### 📊 Pitch Decks Dashboard

**Route**: `/dashboard/pitch-decks`
**File**: `src/pages/DashboardPitchDecks.tsx`
**Purpose**: Manage all pitch deck presentations

**Layout Sections**:
1. **Header**
   - Page title: "My Pitch Decks"
   - Stats: Total count, Drafts, Completed
   - Create New button

2. **Filter & Sort**
   - Filter: All, Drafts, Completed, Shared
   - Sort: Recent, Name, Date Created

3. **Presentation Grid**
   - Thumbnail preview
   - Title, slide count
   - Status badge
   - Last edited date
   - Action menu: Edit, Duplicate, Share, Delete

4. **Templates Section**
   - Featured templates
   - Browse all templates

**Database Connections**:
```sql
-- User's presentations
SELECT id, title, status, slide_count, thumbnail_url, updated_at
FROM presentations
WHERE profile_id = :user_id
  AND deleted_at IS NULL
ORDER BY updated_at DESC
```

**Priority**: 🟡 **MEDIUM** - Exists, needs connection

---

### 💼 Jobs Dashboard

**Route**: `/dashboard/jobs`
**File**: `src/pages/dashboard/DashboardJobs.tsx` ⚠️ **NEW PAGE**
**Purpose**: Track job applications and discover opportunities

**Layout Sections**:
1. **Header**
   - Page title: "Job Opportunities"
   - Stats: Applications submitted, Interview invites, Saved jobs
   - Job alerts toggle

2. **Tabs**
   - Recommended (AI-matched)
   - All Jobs
   - My Applications
   - Saved

3. **Job Cards**
   - Job title, company name
   - Location, remote status
   - Salary range
   - Match percentage (if applicable)
   - Action buttons: Apply, Save, View Details

4. **Filters Sidebar**
   - Job type (Full-time, Part-time, Contract)
   - Location
   - Salary range
   - Remote/Hybrid/On-site
   - Industry

**Database Connections**:
```sql
-- All published jobs
SELECT j.*, c.name as company_name, c.logo_url
FROM jobs j
JOIN companies c ON c.id = j.company_id
WHERE j.status = 'published'
  AND j.deleted_at IS NULL
ORDER BY j.created_at DESC

-- User applications
SELECT ja.*, j.title, c.name as company_name
FROM job_applications ja
JOIN jobs j ON j.id = ja.job_id
JOIN companies c ON c.id = j.company_id
WHERE ja.profile_id = :user_id
ORDER BY ja.created_at DESC
```

**Priority**: 🔴 **HIGH** - Critical feature, needs creation

---

### 🎁 Perks Dashboard

**Route**: `/dashboard/perks`
**File**: `src/pages/dashboard/DashboardPerks.tsx` ⚠️ **NEW PAGE**
**Purpose**: Browse and claim startup perks and benefits

**Layout Sections**:
1. **Header**
   - Page title: "Startup Perks"
   - Total value claimed
   - Active perks count
   - Browse all button

2. **Tabs**
   - All Perks
   - Claimed
   - Redeemed
   - Expired

3. **Perk Cards** (Grid)
   - Provider logo
   - Perk title, description
   - Value/savings estimate
   - Category badge
   - Status: Available, Claimed, Redeemed
   - Action: Claim, View Details, Redeem

4. **Categories Filter**
   - Cloud Services
   - Marketing Tools
   - Development Tools
   - Financial Services
   - Legal Services
   - All

**Database Connections**:
```sql
-- Available perks
SELECT * FROM perks
WHERE active = true
ORDER BY featured DESC, created_at DESC

-- User's claimed perks
SELECT pc.*, p.title, p.provider_name
FROM perk_claims pc
JOIN perks p ON p.id = pc.perk_id
WHERE pc.startup_profile_id = (
  SELECT id FROM startup_profiles WHERE profile_id = :user_id
)
ORDER BY pc.claimed_at DESC
```

**Priority**: 🟡 **MEDIUM** - Nice to have

---

### 👥 Network Dashboard

**Route**: `/dashboard/network`
**File**: `src/pages/dashboard/DashboardNetwork.tsx` ⚠️ **NEW PAGE**
**Purpose**: Manage connections, mentors, and community relationships

**Layout Sections**:
1. **Header**
   - Page title: "My Network"
   - Stats: Connections, Mentors, Messages
   - Find connections button

2. **Tabs**
   - Connections
   - Mentors
   - Companies Following
   - Recommended

3. **Connection Cards**
   - Profile photo
   - Name, role, company
   - Connection status
   - Message button

4. **Activity Feed**
   - Recent network activity
   - New connections
   - Mentor sessions scheduled

**Database Needs**:
- New table: `connections` (user-to-user relationships)
- New table: `mentor_sessions` (mentor bookings)
- New table: `following` (companies/users following)

**Priority**: 🟢 **LOW** - Future enhancement

---

### 📈 Analytics Dashboard

**Route**: `/dashboard/analytics`
**File**: `src/pages/dashboard/DashboardAnalytics.tsx` ⚠️ **NEW PAGE**
**Purpose**: View startup journey metrics and insights

**Layout Sections**:
1. **Header**
   - Page title: "Analytics & Insights"
   - Date range selector
   - Export report button

2. **Key Metrics** (Cards)
   - Profile views trend
   - Pitch deck views
   - Application success rate
   - Engagement score

3. **Charts**
   - Activity timeline (line chart)
   - Event participation (bar chart)
   - Top performing content (list)
   - Journey milestones (progress tracker)

4. **AI Insights**
   - Personalized recommendations
   - Improvement suggestions
   - Benchmark comparisons

**Database Needs**:
- Add `view_count` to `profiles`
- Add `views` to `presentations`
- Create analytics events table

**Priority**: 🟢 **LOW** - Advanced feature

---

### ⚙️ Settings Dashboard

**Route**: `/dashboard/settings`
**File**: `src/pages/DashboardSettings.tsx`
**Purpose**: Manage account, preferences, and notifications

**Layout Sections**:
1. **Header**
   - Page title: "Settings"

2. **Tabs**
   - Profile Settings
   - Startup Profile
   - Notifications
   - Privacy
   - Billing (future)
   - Account

3. **Profile Settings**
   - Full name, email
   - Avatar upload
   - Bio
   - Social links

4. **Startup Profile Settings**
   - Company name, description
   - Industry, stage
   - Team size
   - Website, pitch deck

5. **Notification Preferences**
   - Email notifications toggles
   - Event reminders
   - Job alerts
   - Community updates

6. **Privacy Settings**
   - Profile visibility
   - Data sharing preferences

**Database Connections**:
```sql
-- User profile
SELECT * FROM profiles WHERE id = :user_id

-- Startup profile
SELECT * FROM startup_profiles WHERE profile_id = :user_id
```

**Priority**: 🟡 **MEDIUM** - Exists, needs connection

---

## Page Priority Matrix

### Phase 1: Core Pages (Week 1-2)
1. ✅ Dashboard (main overview) - Connect to Supabase
2. 🆕 Jobs Dashboard - Create new page
3. ✅ Pitch Decks Dashboard - Connect to Supabase
4. ✅ Events Dashboard - Connect to Supabase

### Phase 2: Enhanced Features (Week 3-4)
5. 🆕 Perks Dashboard - Create new page
6. ✅ Settings Dashboard - Connect to Supabase

### Phase 3: Advanced Features (Future)
7. 🆕 Network Dashboard - Create new page
8. 🆕 Analytics Dashboard - Create new page

---

## Shared Components Needed

### Layout Components
```
src/components/dashboard/
├── DashboardLayout.tsx ✅ (exists)
├── DashboardHeader.tsx (new)
├── DashboardSidebar.tsx (new)
├── DashboardCard.tsx (new)
└── DashboardEmptyState.tsx (new)
```

### Feature Components
```
src/components/dashboard/
├── MetricCard.tsx ✅ (exists)
├── EventCard.tsx (new)
├── JobCard.tsx (new)
├── PerkCard.tsx (new)
├── PresentationCard.tsx (new)
├── ActivityFeedItem.tsx (new)
└── QuickActionButton.tsx (new)
```

---

## Navigation Structure

### Dashboard Sidebar Menu

```
Dashboard
├── 🏠 Overview (/dashboard)
├── 📊 My Pitch Decks (/dashboard/pitch-decks)
├── 📅 Events (/dashboard/events)
├── 💼 Jobs (/dashboard/jobs) [NEW]
├── 🎁 Perks (/dashboard/perks) [NEW]
├── 👥 Network (/dashboard/network) [FUTURE]
├── 📈 Analytics (/dashboard/analytics) [FUTURE]
└── ⚙️ Settings (/dashboard/settings)
```

---

## Database Requirements Summary

### ✅ Existing Tables (Ready to Use)
- `profiles` - User profiles
- `startup_profiles` - Startup information
- `presentations` - Pitch decks
- `events` - Event listings
- `registrations` - Event registrations
- `jobs` - Job postings
- `companies` - Company profiles
- `perks` - Available perks
- `perk_claims` - User perk claims

### ❌ Missing Tables (Need Creation)

**Priority 1 - Critical**:
```sql
-- Job applications tracking
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id),
  job_id UUID NOT NULL REFERENCES jobs(id),
  status TEXT DEFAULT 'pending',
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event location field
ALTER TABLE events ADD COLUMN IF NOT EXISTS location TEXT;
```

**Priority 2 - Enhanced Features**:
```sql
-- Profile view tracking
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE presentations ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Saved jobs
CREATE TABLE saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id),
  job_id UUID NOT NULL REFERENCES jobs(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, job_id)
);
```

**Priority 3 - Future**:
```sql
-- Network connections
CREATE TABLE connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_profile_id UUID NOT NULL REFERENCES profiles(id),
  to_profile_id UUID NOT NULL REFERENCES profiles(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Development Workflow (NO AUTH)

### Mock Data Pattern (Development Only)

**CRITICAL**: All pages work WITHOUT authentication during development

```typescript
// Example: Dashboard.tsx (dev mode)
export default function Dashboard() {
  const navigate = useNavigate();

  // DEVELOPMENT ONLY - Mock user data
  const mockUser = {
    id: '00000000-0000-0000-0000-000000000000',
    full_name: 'Alex Developer',
    email: 'dev@example.com'
  };

  // Fetch real data from Supabase (no auth check)
  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .limit(10);
      return data;
    }
  });

  // Use mock user for display
  return (
    <DashboardLayout>
      <h1>Welcome back, {mockUser.full_name}! 👋</h1>
      {/* Show real events from database */}
      {events?.map(event => <EventCard key={event.id} event={event} />)}
    </DashboardLayout>
  );
}
```

### Data Fetching Pattern

```typescript
// NO AUTH - Direct Supabase query
const { data } = useQuery({
  queryKey: ['resource'],
  queryFn: async () => {
    const { data } = await supabase
      .from('table_name')
      .select('*');
    return data;
  }
});

// DO NOT USE (auth required):
// ❌ .eq('profile_id', user?.id)
// ❌ useAuth() hook
// ❌ ProtectedRoute wrapper
```

---

## Success Metrics

### Page Completion Criteria

Each dashboard page is "complete" when:
- ✅ Page renders without errors
- ✅ Mock user data displays correctly
- ✅ Real data fetched from Supabase
- ✅ No authentication required
- ✅ TypeScript compiles (0 errors)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states implemented
- ✅ Empty states implemented
- ✅ Error states handled

---

## File Structure

```
src/pages/
├── Dashboard.tsx ✅ (main overview)
├── DashboardEvents.tsx ✅ (events)
├── DashboardPitchDecks.tsx ✅ (pitch decks)
├── DashboardSettings.tsx ✅ (settings)
└── dashboard/
    ├── DashboardJobs.tsx [NEW]
    ├── DashboardPerks.tsx [NEW]
    ├── DashboardNetwork.tsx [FUTURE]
    └── DashboardAnalytics.tsx [FUTURE]
```

---

## Routes Summary

| Route | Page | Status | Priority |
|-------|------|--------|----------|
| `/dashboard` | Main Overview | ✅ Exists | 🔴 HIGH |
| `/dashboard/pitch-decks` | Pitch Decks | ✅ Exists | 🔴 HIGH |
| `/dashboard/events` | Events | ✅ Exists | 🔴 HIGH |
| `/dashboard/jobs` | Jobs | 🆕 New | 🔴 HIGH |
| `/dashboard/perks` | Perks | 🆕 New | 🟡 MEDIUM |
| `/dashboard/settings` | Settings | ✅ Exists | 🟡 MEDIUM |
| `/dashboard/network` | Network | 🆕 New | 🟢 LOW |
| `/dashboard/analytics` | Analytics | 🆕 New | 🟢 LOW |

---

## Next Steps

### Immediate Actions (This Week)
1. Create `/dashboard/jobs` page with Supabase connection
2. Create `job_applications` database table
3. Connect existing Dashboard.tsx to real data
4. Add `location` field to `events` table

### Next Week
5. Create `/dashboard/perks` page
6. Connect DashboardEvents.tsx to real data
7. Connect DashboardPitchDecks.tsx to real data

### Future
8. Network and Analytics pages
9. Add auth (production deployment)

---

**Plan Version**: 1.0
**Last Updated**: January 2025
**Ready for Implementation**: ✅ YES
