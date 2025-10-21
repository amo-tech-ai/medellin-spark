# 📊 Additional Dashboard UI Requirements

**Project:** Medellin Spark - AI Startup Accelerator
**Date:** October 19, 2025
**Purpose:** Complete dashboard ecosystem for founders, investors, and mentors

---

## 📋 Current State Analysis

### ✅ Existing Dashboards (Implemented)
1. **Main Dashboard** (`/dashboard`) - Overview, metrics, quick actions
2. **Events Dashboard** (`/dashboard/events`) - Event registration, attendance
3. **Pitch Decks Dashboard** (`/dashboard/pitch-decks`) - AI-generated presentations
4. **Settings Dashboard** (`/dashboard/settings`) - User preferences

### ⚠️ Partially Implemented (Routes exist in sidebar but missing pages)
5. **Jobs Board** (`/dashboard/jobs`) - Not in App.tsx routes
6. **Perks Dashboard** (`/dashboard/perks`) - Not in App.tsx routes
7. **Profile Dashboard** (`/dashboard/profile`) - Not in App.tsx routes

---

## 🎯 Required Dashboards (Priority Order)

### **TIER 1: Critical - Complete Core Experience** (3-5 days)

#### 1. **Jobs Board Dashboard** 🔴 HIGH PRIORITY
**Route:** `/dashboard/jobs`
**User Story:** "As a founder, I want to browse startup jobs, track applications, and manage my job search."

**Features:**
- Job listings grid with filters (role, location, company stage)
- Application tracker (Applied, Interview, Offer, Rejected)
- Saved jobs list
- Application status timeline
- Resume/CV upload
- Job alerts preferences

**Components Needed:**
- `<JobCard>` - Job listing preview
- `<ApplicationStatusBadge>` - Status indicators
- `<JobFilters>` - Search and filter controls
- `<ApplicationTracker>` - Kanban board for applications

**Database Tables:**
- `job_applications` (id, profile_id, job_id, status, applied_at)
- `saved_jobs` (id, profile_id, job_id)
- `job_listings` (id, title, company, description, requirements)

---

#### 2. **Perks & Deals Dashboard** 🔴 HIGH PRIORITY
**Route:** `/dashboard/perks`
**User Story:** "As a founder, I want to browse $500K+ in partner credits and activate perks for my startup."

**Features:**
- Perk catalog grid (AWS, Google Cloud, OpenAI, etc.)
- Categories: Infrastructure, Tools, Marketing, Legal
- Activation status tracking
- Value calculator ("You've saved $45,000")
- Redemption instructions
- Partner contact info

**Components Needed:**
- `<PerkCard>` - Perk preview with value badge
- `<ActivatedPerksSection>` - My active perks
- `<PerkCategoryFilter>` - Browse by category
- `<RedemptionInstructions>` - Step-by-step activation guide

**Database Tables:**
- `activated_perks` (id, profile_id, perk_id, activated_at, value)
- `perks` (id, name, category, value, description, provider)

---

#### 3. **Profile Dashboard** 🟡 MEDIUM PRIORITY
**Route:** `/dashboard/profile`
**User Story:** "As a founder, I want to manage my professional profile, startup info, and visibility settings."

**Features:**
- Profile editor (name, bio, skills, experience)
- Startup information (name, stage, industry, team size)
- Social links (LinkedIn, Twitter, GitHub)
- Privacy settings
- Verification badges
- Portfolio/achievements

**Components Needed:**
- `<ProfileEditor>` - Form with real-time preview
- `<StartupInfoCard>` - Company details
- `<SkillTagInput>` - Add/remove skills
- `<VerificationBadge>` - Trust indicators

**Database Tables:**
- Already exists: `profiles` table

---

### **TIER 2: High Value - Accelerator Features** (5-7 days)

#### 4. **Mentorship Dashboard** 🟡 MEDIUM PRIORITY
**Route:** `/dashboard/mentorship`
**User Story:** "As a founder, I want to connect with mentors, schedule sessions, and track advice received."

**Features:**
- Mentor directory (filter by expertise, industry, availability)
- Session scheduler with calendar integration
- Past sessions log with notes
- Mentor matching algorithm (AI-powered)
- Session feedback/ratings
- Upcoming sessions widget

**Components Needed:**
- `<MentorCard>` - Mentor profile preview
- `<SessionScheduler>` - Calendar booking UI
- `<SessionNotes>` - Meeting notes editor
- `<MentorMatchWidget>` - AI recommendations

**Database Tables:**
- `mentors` (id, profile_id, expertise[], hourly_rate, bio)
- `mentorship_sessions` (id, mentor_id, mentee_id, scheduled_at, notes)
- `mentor_ratings` (id, session_id, rating, feedback)

---

#### 5. **Funding Dashboard** 🟡 MEDIUM PRIORITY
**Route:** `/dashboard/funding`
**User Story:** "As a founder, I want to track funding applications, investor pipeline, and fundraising progress."

**Features:**
- Funding stage tracker (Pre-seed, Seed, Series A, etc.)
- Investor pipeline (Kanban: Prospect → Outreach → Meeting → Term Sheet → Closed)
- Application status for accelerator programs
- Fundraising goal progress bar
- Term sheet storage
- Investor contact database

**Components Needed:**
- `<FundingStageCard>` - Current fundraising stage
- `<InvestorPipeline>` - Kanban board for investors
- `<FundraisingGoal>` - Progress visualization
- `<ApplicationTracker>` - Accelerator applications

**Database Tables:**
- `funding_rounds` (id, startup_id, stage, target_amount, raised_amount)
- `investor_pipeline` (id, profile_id, investor_name, stage, last_contact)
- `program_applications` (id, profile_id, program_id, status)

---

#### 6. **Analytics Dashboard** 🟡 MEDIUM PRIORITY
**Route:** `/dashboard/analytics`
**User Story:** "As a founder, I want to track my startup's key metrics, KPIs, and growth over time."

**Features:**
- KPI cards (MRR, ARR, Users, Growth Rate)
- Time-series charts (Revenue, Users, Engagement)
- Cohort analysis
- Metric targets vs. actuals
- Custom metric builder
- Export reports (PDF, CSV)

**Components Needed:**
- `<MetricCard>` - KPI summary with trend
- `<TimeSeriesChart>` - Line/bar charts (Recharts)
- `<GoalProgress>` - Target vs. actual
- `<CustomMetricBuilder>` - Define custom KPIs

**Database Tables:**
- `startup_metrics` (id, startup_id, metric_name, value, date)
- `metric_goals` (id, startup_id, metric_name, target, deadline)

---

### **TIER 3: Community & Engagement** (3-5 days)

#### 7. **Community Dashboard** 🟢 NICE TO HAVE
**Route:** `/dashboard/community`
**User Story:** "As a founder, I want to connect with other founders, join discussions, and collaborate."

**Features:**
- Founder directory (search, filter by industry/stage)
- Discussion forums/threads
- Direct messaging
- Collaboration requests
- Community events feed
- Founder matching (AI-powered)

**Components Needed:**
- `<FounderCard>` - Founder profile preview
- `<DiscussionThread>` - Forum UI
- `<DirectMessage>` - Chat interface
- `<CollaborationRequest>` - Cofounder finder

**Database Tables:**
- `forum_threads` (id, author_id, title, content, category)
- `direct_messages` (id, sender_id, recipient_id, message, sent_at)
- `collaboration_requests` (id, requester_id, role, description)

---

#### 8. **Learning & Resources Dashboard** 🟢 NICE TO HAVE
**Route:** `/dashboard/learning`
**User Story:** "As a founder, I want to access courses, guides, and resources to grow my startup knowledge."

**Features:**
- Course catalog (Startup 101, Fundraising, Product-Market Fit)
- Progress tracking (% complete)
- Bookmarked articles/guides
- Resource library (templates, playbooks)
- Recommended content (AI-powered)
- Certifications/badges

**Components Needed:**
- `<CourseCard>` - Course preview with progress
- `<ResourceLibrary>` - Searchable document grid
- `<LearningPath>` - Recommended course sequence
- `<CertificationBadge>` - Achievement display

**Database Tables:**
- `courses` (id, title, description, modules[], difficulty)
- `course_progress` (id, profile_id, course_id, progress_percent)
- `bookmarked_resources` (id, profile_id, resource_id)

---

#### 9. **Milestones & Goals Dashboard** 🟢 NICE TO HAVE
**Route:** `/dashboard/milestones`
**User Story:** "As a founder, I want to set goals, track milestones, and celebrate achievements."

**Features:**
- Goal-setting wizard (SMART goals)
- Milestone timeline (Product Launch, First Customer, Funding)
- Progress tracking with % complete
- Celebration animations (confetti on completion)
- Team goal sharing
- OKR framework support

**Components Needed:**
- `<MilestoneTimeline>` - Visual roadmap
- `<GoalCard>` - Goal with progress bar
- `<AchievementCelebration>` - Success animations
- `<OKRTracker>` - Objectives & Key Results

**Database Tables:**
- `startup_milestones` (id, startup_id, title, target_date, completed)
- `goals` (id, profile_id, title, description, target, progress)

---

## 🎨 UI/UX Design Patterns

### **Consistent Layout Structure**
All dashboards should follow this pattern:

```tsx
<DashboardLayout>
  <DashboardHeader
    title="Dashboard Name"
    subtitle="Brief description"
    actions={<Button>Primary Action</Button>}
  />

  <StatsRow>
    <MetricCard icon={Icon} label="Metric" value="123" change="+12%" />
    <MetricCard icon={Icon} label="Metric" value="456" change="-5%" />
    <MetricCard icon={Icon} label="Metric" value="789" change="+20%" />
  </StatsRow>

  <MainContent>
    {/* Dashboard-specific content */}
  </MainContent>
</DashboardLayout>
```

### **Component Library Needs**

#### **Shared Components** (Create once, reuse everywhere)
1. `<MetricCard>` - KPI display with trend indicators
2. `<EmptyState>` - "No data yet" placeholder (already exists)
3. `<LoadingState>` - Skeleton loaders (already exists)
4. `<FilterBar>` - Search + filters for lists
5. `<DataTable>` - Sortable, paginated tables
6. `<KanbanBoard>` - Drag-and-drop columns
7. `<Timeline>` - Event timeline visualization
8. `<ProgressRing>` - Circular progress indicators
9. `<StatusBadge>` - Colored status chips
10. `<ActionMenu>` - Dropdown with actions (Edit, Delete, etc.)

---

## 📊 Database Schema Additions

### **New Tables Required**

```sql
-- Jobs Dashboard
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES job_listings(id),
  status TEXT CHECK (status IN ('applied', 'interview', 'offer', 'rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

CREATE TABLE saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES job_listings(id),
  saved_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE job_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  requirements TEXT[],
  location TEXT,
  salary_range TEXT,
  posted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Perks Dashboard
CREATE TABLE activated_perks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  perk_id UUID REFERENCES perks(id),
  activated_at TIMESTAMPTZ DEFAULT NOW(),
  value NUMERIC
);

CREATE TABLE perks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  value NUMERIC,
  description TEXT,
  provider TEXT,
  redemption_link TEXT
);

-- Mentorship Dashboard
CREATE TABLE mentors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  expertise TEXT[],
  hourly_rate NUMERIC,
  bio TEXT,
  available BOOLEAN DEFAULT TRUE
);

CREATE TABLE mentorship_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id UUID REFERENCES mentors(id),
  mentee_id UUID REFERENCES profiles(id),
  scheduled_at TIMESTAMPTZ,
  duration_minutes INTEGER,
  notes TEXT,
  status TEXT DEFAULT 'scheduled'
);

-- Funding Dashboard
CREATE TABLE funding_rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  startup_id UUID,
  stage TEXT,
  target_amount NUMERIC,
  raised_amount NUMERIC DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE investor_pipeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  investor_name TEXT,
  stage TEXT,
  last_contact TIMESTAMPTZ,
  notes TEXT
);
```

---

## 🗓️ Implementation Timeline

### **Week 1: Critical Dashboards**
- Day 1-2: Jobs Board Dashboard
- Day 3-4: Perks & Deals Dashboard
- Day 5: Profile Dashboard

### **Week 2: Accelerator Features**
- Day 1-2: Mentorship Dashboard
- Day 3-4: Funding Dashboard
- Day 5: Analytics Dashboard

### **Week 3: Community & Polish**
- Day 1-2: Community Dashboard
- Day 3: Learning & Resources Dashboard
- Day 4: Milestones & Goals Dashboard
- Day 5: Testing, polish, responsive design

---

## 🎯 Priority Recommendations

### **Must Have (Launch Blockers)**
1. ✅ Jobs Board Dashboard - Core value prop
2. ✅ Perks & Deals Dashboard - Unique differentiator ($500K+ value)
3. ✅ Profile Dashboard - User account management

### **Should Have (High Impact)**
4. ✅ Mentorship Dashboard - Community engagement driver
5. ✅ Funding Dashboard - Critical founder need
6. ✅ Analytics Dashboard - Retention & stickiness

### **Could Have (Future Iterations)**
7. Community Dashboard - V2 feature
8. Learning & Resources Dashboard - V2 feature
9. Milestones & Goals Dashboard - V2 feature

---

## 💡 Quick Wins (Low Effort, High Impact)

1. **Update App.tsx** - Add missing routes for jobs, perks, profile (5 min)
2. **Create placeholder pages** - Use EmptyState component (30 min)
3. **Duplicate Dashboard.tsx structure** - Copy/paste pattern (1 hour)
4. **Add navigation links** - Update sidebar (15 min)

---

## 🚀 Next Steps

**Immediate Actions:**
1. Create missing route files for jobs, perks, profile dashboards
2. Update `App.tsx` with new routes
3. Build shared component library (`<MetricCard>`, `<DataTable>`, etc.)
4. Create database migrations for new tables
5. Implement Jobs Board Dashboard (highest priority)

**Long-term Roadmap:**
- **Q1 2025:** Core dashboards (Jobs, Perks, Profile, Mentorship)
- **Q2 2025:** Advanced features (Funding, Analytics, Community)
- **Q3 2025:** Learning platform, AI recommendations, automation
- **Q4 2025:** Mobile app, investor portal, API integrations

---

**Generated:** October 19, 2025
**Status:** Ready for Implementation
**Estimated Total Effort:** 15-20 days of development
