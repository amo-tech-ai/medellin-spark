# Medellin AI Hub - UI Dashboard Layouts & Stakeholder Content

## 📋 PROJECT CONTEXT

**Platform:** Medellin AI Hub - AI-powered startup accelerator
**Audience:** Startup founders, investors, mentors, admins, and platform staff
**Purpose:** Create intuitive, data-rich dashboards that showcase platform value and user progress
**Design Language:** Clean, minimal, orange/grey/white, card-based layouts

---

## 🎯 STAKEHOLDER PERSONAS

### 1. Startup Founder (Primary User)
**Goals:** Track progress, access resources, grow startup
**Pain Points:** Overwhelming information, unclear next steps
**Success Metrics:** Wizard completion, perk claims, pitch deck generation

### 2. Platform Admin
**Goals:** Monitor platform health, moderate content, support users
**Pain Points:** Too many manual tasks, poor visibility into issues
**Success Metrics:** User growth, engagement rates, support ticket resolution

### 3. Investor/Mentor
**Goals:** Discover promising startups, track portfolio, provide guidance
**Pain Points:** Hard to find quality startups, limited data on progress
**Success Metrics:** Investment deals closed, mentor sessions completed

### 4. Event Organizer
**Goals:** Promote events, manage registrations, engage community
**Pain Points:** Low event visibility, manual registration management
**Success Metrics:** Event attendance, repeat attendees, satisfaction scores

---

## 📊 DASHBOARD LAYOUTS

### Dashboard 1: Startup Founder Dashboard

#### Header Section
```
┌─────────────────────────────────────────────────────────────────────┐
│ [Logo] Medellin AI Hub          [🔍 Search]    [🔔 3] [Profile ▼]  │
└─────────────────────────────────────────────────────────────────────┘
```

#### Hero Greeting Card
```
┌─────────────────────────────────────────────────────────────────────┐
│  Welcome back, Sarah! 👋                                            │
│  Your startup journey is 75% complete                               │
│                                                                      │
│  ███████████████████████░░░ 75%                                     │
│                                                                      │
│  Next Step: Complete AI Analysis → [Continue Wizard]               │
└─────────────────────────────────────────────────────────────────────┘
```

#### Metrics Overview Cards (3-column grid)
```
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ 📅 Events        │ │ 💼 Applications  │ │ 🎁 Perks Claimed │
│                  │ │                  │ │                  │
│      12          │ │       5          │ │       8          │
│                  │ │                  │ │                  │
│ ↑ 3 this month   │ │ 2 pending review │ │ $12K value       │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

#### Quick Actions Card
```
┌─────────────────────────────────────────────────────────────────────┐
│  ⚡ Quick Actions                                                    │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  [📊 Generate Pitch Deck]  [📝 Update Profile]  [🎯 Find Mentors]  │
│  [💬 Join Community Chat]  [📅 Book Office Hours] [🔗 Share Story] │
└─────────────────────────────────────────────────────────────────────┘
```

#### Upcoming Events Section
```
┌─────────────────────────────────────────────────────────────────────┐
│  📅 Upcoming Events (3)                          [View All →]       │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐               │
│  │ [Event Img]  │ │ [Event Img]  │ │ [Event Img]  │               │
│  │              │ │              │ │              │               │
│  │ AI Pitch     │ │ Networking   │ │ Investor     │               │
│  │ Workshop     │ │ Mixer        │ │ Meetup       │               │
│  │              │ │              │ │              │               │
│  │ May 15, 2025 │ │ May 20, 2025 │ │ Jun 1, 2025  │               │
│  │ 6:00 PM      │ │ 7:00 PM      │ │ 5:00 PM      │               │
│  │ Ruta N       │ │ Hub BoGo     │ │ Virtual      │               │
│  │              │ │              │ │              │               │
│  │ [Register]   │ │ [Registered] │ │ [Details]    │               │
│  └──────────────┘ └──────────────┘ └──────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
```

#### Job Matches Section
```
┌─────────────────────────────────────────────────────────────────────┐
│  💼 Recommended Jobs (5)                         [View All →]       │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ Frontend Engineer - Remote                           [Save ♡] │ │
│  │ TechCorp Medellin • Full-time • $80K-$120K USD              │ │
│  │                                                                │ │
│  │ React, TypeScript, Node.js, PostgreSQL                        │ │
│  │                                                                │ │
│  │ 95% Match • Posted 2 days ago                    [Apply Now] │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ Product Manager - Hybrid                             [Save ♡] │ │
│  │ StartupXYZ • Full-time • $60K-$90K USD                       │ │
│  │                                                                │ │
│  │ SaaS, Product Strategy, Agile, User Research                 │ │
│  │                                                                │ │
│  │ 88% Match • Posted 5 days ago                    [Apply Now] │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  [+ 3 more jobs]                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

#### Perks Available Section
```
┌─────────────────────────────────────────────────────────────────────┐
│  🎁 Recommended Perks (4)                        [Browse All →]     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────┐ │
│  │ [AWS Logo]   │ │ [GitHub]     │ │ [Stripe]     │ │ [Notion]  │ │
│  │              │ │              │ │              │ │           │ │
│  │ AWS Activate │ │ GitHub Team  │ │ Stripe Atlas │ │ Notion +  │ │
│  │ Credits      │ │ Pro (Free)   │ │              │ │ (6 months)│ │
│  │              │ │              │ │              │ │           │ │
│  │ Value: $5,000│ │ Value: $180  │ │ Value: $500  │ │ Value: $96│ │
│  │              │ │              │ │              │ │           │ │
│  │ ⭐ Highly    │ │ ⚡ Must-have  │ │ 🚀 Recommended│ │ 📝 Popular│ │
│  │ Recommended  │ │ for startups │ │ for founders │ │ choice    │ │
│  │              │ │              │ │              │ │           │ │
│  │ [Claim Now]  │ │ [Claim Now]  │ │ [Learn More] │ │[Claim Now]│ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

#### Community Activity Feed
```
┌─────────────────────────────────────────────────────────────────────┐
│  💬 Community Activity                           [Join Discussion]  │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ [Avatar] Carlos M. • 2 hours ago                              │ │
│  │                                                                │ │
│  │ Just closed our seed round! 🎉 Thanks to everyone at Medellin │ │
│  │ AI Hub for the support and connections.                       │ │
│  │                                                                │ │
│  │ 👍 24  💬 8  🔄 3                                              │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ [Avatar] Maria R. • 5 hours ago                               │ │
│  │                                                                │ │
│  │ Looking for a technical co-founder with React experience.     │ │
│  │ Anyone interested? DM me!                                      │ │
│  │                                                                │ │
│  │ 👍 12  💬 15  🔄 2                                             │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  [Load More Posts]                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

#### Startup Progress Chart
```
┌─────────────────────────────────────────────────────────────────────┐
│  📈 Your Startup Journey                                            │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Progress Timeline:                                                 │
│                                                                      │
│  ● Jan 2025    Joined platform                                      │
│  ● Feb 2025    Completed wizard                                     │
│  ● Mar 2025    Generated pitch deck                                 │
│  ● Apr 2025    Claimed 5 perks                                      │
│  ○ May 2025    Present at Demo Day (upcoming)                       │
│                                                                      │
│  Engagement Score: ████████░░ 82/100                                │
│  Profile Completeness: ██████████ 100%                              │
│  Network Connections: ███████░░░ 73/100                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Dashboard 2: Admin Platform Dashboard

#### Admin Header
```
┌─────────────────────────────────────────────────────────────────────┐
│  ≡ Admin Panel                        Last Updated: 2 minutes ago   │
└─────────────────────────────────────────────────────────────────────┘
```

#### Platform Health Metrics (4-column grid)
```
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ 👥 Users   │ │ 🚀 Startups│ │ 📅 Events  │ │ 💼 Jobs    │
│            │ │            │ │            │ │            │
│   1,247    │ │    328     │ │    45      │ │    89      │
│            │ │            │ │            │ │            │
│ ↑ +52 this │ │ ↑ +18 this │ │ ↑ +5 this  │ │ ↑ +12 this │
│   week     │ │   week     │ │   week     │ │   week     │
│            │ │            │ │            │ │            │
│ Target:    │ │ Target:    │ │ Target:    │ │ Target:    │
│ 1,500      │ │ 400        │ │ 50         │ │ 100        │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

#### Real-Time Activity Chart
```
┌─────────────────────────────────────────────────────────────────────┐
│  📊 Platform Activity (Last 7 Days)                                 │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  150│                                                    ●           │
│     │                                          ●                     │
│  100│                               ●                                │
│     │                    ●                                           │
│   50│          ●                                                     │
│     │ ●                                                              │
│    0└──────────────────────────────────────────────────────────────│
│      Mon   Tue   Wed   Thu   Fri   Sat   Sun                       │
│                                                                      │
│  ● Active Users   ○ New Signups   △ Events Created                 │
└─────────────────────────────────────────────────────────────────────┘
```

#### Pending Approvals Queue
```
┌─────────────────────────────────────────────────────────────────────┐
│  ⏱️ Pending Approvals (8)                        [View All →]       │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ 📅 Event: "AI Startup Summit 2025"                            │ │
│  │ Submitted by: Carlos Martinez • 2 hours ago                   │ │
│  │ Category: Workshop • Expected: 100 attendees                  │ │
│  │                                                                │ │
│  │ [✓ Approve]  [✗ Reject]  [👁️ Preview]                        │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ 💼 Job: "Senior Full-Stack Developer"                         │ │
│  │ Posted by: TechCorp Medellin • 5 hours ago                    │ │
│  │ Salary: $80K-$120K • Type: Full-time Remote                   │ │
│  │                                                                │ │
│  │ [✓ Approve]  [✗ Reject]  [👁️ Preview]                        │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  [+ 6 more pending]                                                 │
└─────────────────────────────────────────────────────────────────────┘
```

#### User Growth Chart
```
┌─────────────────────────────────────────────────────────────────────┐
│  📈 User Growth Trend (6 Months)                                    │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  1500│                                                          ██   │
│      │                                                      ████     │
│  1000│                                              ████████         │
│      │                                      ████████                 │
│   500│                              ████████                         │
│      │                      ████████                                 │
│      │              ████████                                         │
│     0└──────────────────────────────────────────────────────────────│
│       Nov   Dec   Jan   Feb   Mar   Apr   May                       │
│                                                                      │
│  Total Users: 1,247 • Growth Rate: +42% • Churn: 3.2%              │
└─────────────────────────────────────────────────────────────────────┘
```

#### Recent Admin Actions
```
┌─────────────────────────────────────────────────────────────────────┐
│  🔐 Recent Admin Actions                         [View Audit Log]   │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  • Admin Maria R. approved event "Pitch Night"         2 min ago    │
│  • Admin Carlos L. updated user role to "moderator"    15 min ago   │
│  • Admin Sarah K. deleted spam job posting             1 hour ago   │
│  • System sent newsletter to 1,200 subscribers         2 hours ago  │
│  • Admin Juan P. exported user analytics report        3 hours ago  │
└─────────────────────────────────────────────────────────────────────┘
```

#### System Health Indicators
```
┌─────────────────────────────────────────────────────────────────────┐
│  ⚙️ System Health                                                    │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Database:           ● Healthy     Response Time: 45ms              │
│  API Gateway:        ● Healthy     Uptime: 99.98%                   │
│  Edge Functions:     ● Healthy     Success Rate: 97.3%              │
│  AI Services:        ● Healthy     Avg Processing: 18s              │
│  Email Service:      ● Healthy     Queue: 12 pending                │
│  Storage:            ⚠️ Warning     82% full (cleanup recommended)   │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Dashboard 3: Investor/Mentor Dashboard

#### Investor Header
```
┌─────────────────────────────────────────────────────────────────────┐
│  Portfolio Overview                         [🔍 Discover Startups]  │
└─────────────────────────────────────────────────────────────────────┘
```

#### Portfolio Metrics (3-column)
```
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ 💼 Portfolio     │ │ 📊 Active Deals  │ │ 🎯 Success Rate  │
│                  │ │                  │ │                  │
│      12          │ │       3          │ │      67%         │
│    startups      │ │    in pipeline   │ │   (8 of 12)      │
│                  │ │                  │ │                  │
│ Total Value:     │ │ Next Close:      │ │ Avg Return:      │
│ $2.4M            │ │ 15 days          │ │ 3.2x             │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

#### Trending Startups
```
┌─────────────────────────────────────────────────────────────────────┐
│  🚀 Trending Startups This Week              [View All →]           │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ [Logo] EventAI                                    ⭐ Top Pick  │ │
│  │                                                                │ │
│  │ AI-powered event management platform                          │ │
│  │ SaaS • Enterprise • Series A Ready                            │ │
│  │                                                                │ │
│  │ 📈 Metrics:                                                    │ │
│  │ • 500 active users (+125% MoM)                                │ │
│  │ • $5K MRR (+85% QoQ)                                          │ │
│  │ • Team: 3 founders, 2 advisors                                │ │
│  │                                                                │ │
│  │ Match Score: 94% • Investment Readiness: High                 │ │
│  │                                                                │ │
│  │ [📧 Contact Founder]  [💰 Express Interest]  [📊 Full Report] │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ [Logo] FashionOS                                  🔥 Hot Deal  │ │
│  │                                                                │ │
│  │ AI fashion assistant for personal styling                     │ │
│  │ Mobile App • Consumer • Seed Stage                            │ │
│  │                                                                │ │
│  │ 📈 Metrics:                                                    │ │
│  │ • 2,500 downloads (last 30 days)                              │ │
│  │ • 18% DAU/MAU ratio                                           │ │
│  │ • Team: 2 co-founders                                         │ │
│  │                                                                │ │
│  │ Match Score: 87% • Investment Readiness: Medium               │ │
│  │                                                                │ │
│  │ [📧 Contact Founder]  [💰 Express Interest]  [📊 Full Report] │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

#### Deal Pipeline
```
┌─────────────────────────────────────────────────────────────────────┐
│  💰 Investment Pipeline                                             │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Interested (8)  →  Due Diligence (3)  →  Term Sheet (1)  →  Closed│
│                                                                      │
│  ┌─────────┐      ┌─────────┐         ┌─────────┐      ┌─────────┐│
│  │ Startup │      │ EventAI │         │ HealthAI│      │         ││
│  │ Startup │      │ FoodTech│         │         │      │         ││
│  │ Startup │      │ EdTech  │         │         │      │         ││
│  │ + 5 more│      │         │         │         │      │         ││
│  └─────────┘      └─────────┘         └─────────┘      └─────────┘│
│                                                                      │
│  Conversion Rate: 12.5% • Avg Time to Close: 45 days               │
└─────────────────────────────────────────────────────────────────────┘
```

#### Mentor Activity
```
┌─────────────────────────────────────────────────────────────────────┐
│  🎓 Mentor Sessions                          [Schedule Session]     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  This Month: 8 sessions completed • 4 hours total                   │
│                                                                      │
│  Upcoming:                                                          │
│  • May 15, 3:00 PM - Product Strategy with EventAI                 │
│  • May 18, 10:00 AM - Fundraising Prep with FashionOS              │
│  • May 22, 2:00 PM - Go-to-Market with TechCorp                    │
│                                                                      │
│  Impact Score: ████████░░ 85/100                                    │
│  Mentee Satisfaction: 4.8/5.0 ⭐⭐⭐⭐⭐                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 UI COMPONENT LIBRARY

### Card Types

#### 1. Metric Card
```
┌──────────────────┐
│ [Icon] Label     │
│                  │
│     1,247        │ ← Large number
│                  │
│ ↑ +52 this week  │ ← Trend indicator
│ Target: 1,500    │ ← Context/goal
└──────────────────┘
```
**Usage:** KPIs, counters, statistics
**Colors:** White background, orange accent for icons
**Elevation:** Soft shadow (0 2px 8px rgba(0,0,0,0.05))

#### 2. Event Card
```
┌──────────────┐
│ [Image]      │ ← Event photo/banner
│              │
│ Event Title  │ ← Bold, 18px
│              │
│ May 15, 2025 │ ← Date, grey text
│ 6:00 PM      │ ← Time
│ Ruta N       │ ← Location
│              │
│ [Button]     │ ← Primary CTA
└──────────────┘
```
**Usage:** Event listings, registrations
**Hover:** Scale 1.02, orange glow shadow
**Image:** 16:9 aspect ratio, lazy loaded

#### 3. Job Card
```
┌───────────────────────────────────────┐
│ Job Title                    [Save ♡] │ ← Headline + action
│ Company • Type • Salary               │ ← Meta info
│                                       │
│ Tech Stack: React, Node, PostgreSQL  │ ← Tags
│                                       │
│ 95% Match • 2 days ago   [Apply Now] │ ← Score + CTA
└───────────────────────────────────────┘
```
**Usage:** Job marketplace, recommendations
**Match Score:** Color-coded (90%+ green, 70-89% orange, <70% grey)

#### 4. Perk Card
```
┌──────────────┐
│ [Logo]       │ ← Provider logo
│              │
│ Perk Title   │ ← Bold text
│              │
│ Value: $5,000│ ← Monetary value
│              │
│ ⭐ Highly    │ ← Badge
│ Recommended  │
│              │
│ [Claim Now]  │ ← CTA button
└──────────────┘
```
**Usage:** Perk marketplace, recommendations
**Badge Colors:** Gold star (highly recommended), lightning (must-have), rocket (popular)

#### 5. Activity Card
```
┌───────────────────────────────────────┐
│ [Avatar] Name • Timestamp             │
│                                       │
│ Post content goes here with text...  │
│ Can be multiple lines long.           │
│                                       │
│ 👍 24  💬 8  🔄 3                      │ ← Engagement
└───────────────────────────────────────┘
```
**Usage:** Community feed, notifications
**Avatar:** 40px circle, user photo or initials
**Timestamp:** Relative time (2 hours ago)

#### 6. Progress Card
```
┌─────────────────────────────────────────┐
│ Your Progress                           │
│                                         │
│ ███████████████████████░░░ 75%          │
│                                         │
│ 3 of 4 milestones completed             │
│ Next: Complete AI Analysis              │
│                                         │
│ [Continue →]                            │
└─────────────────────────────────────────┘
```
**Usage:** Onboarding, wizard, goals
**Progress Bar:** Orange fill, grey background
**Animation:** Smooth fill on load (1s ease-in-out)

---

## 📈 CHARTS & DATA VISUALIZATIONS

### Chart 1: Line Chart (Activity Over Time)
```
Purpose: Show trends (users, events, engagement)
Type: Line chart with multiple series
Data Points: Daily/weekly/monthly aggregates
Colors: Orange (primary metric), grey (secondary), green (target)
Interactions: Hover tooltip, zoom, date range filter
```

**Example Data:**
```javascript
{
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Active Users',
      data: [120, 145, 132, 158, 175, 162, 180],
      color: 'hsl(14, 82%, 60%)' // Orange
    },
    {
      label: 'New Signups',
      data: [15, 22, 18, 25, 30, 28, 35],
      color: 'hsl(0, 0%, 45%)' // Grey
    }
  ]
}
```

### Chart 2: Bar Chart (Comparative Data)
```
Purpose: Compare categories (startups by industry, events by type)
Type: Vertical or horizontal bars
Colors: Orange gradient for bars
Interactions: Click to filter, hover for details
```

**Example Data:**
```javascript
{
  labels: ['SaaS', 'FinTech', 'HealthTech', 'EdTech', 'E-commerce'],
  data: [45, 32, 28, 18, 12],
  backgroundColor: 'hsl(14, 82%, 60%)'
}
```

### Chart 3: Donut Chart (Distribution)
```
Purpose: Show composition (wizard stage completion, user roles)
Type: Donut chart with center metric
Colors: Orange shades (light to dark)
Interactions: Click segment to drill down
```

**Example Data:**
```javascript
{
  labels: ['Completed', 'Stage 7-9', 'Stage 4-6', 'Stage 1-3', 'Not Started'],
  data: [328, 145, 89, 52, 18],
  colors: [
    'hsl(14, 82%, 60%)',  // Primary orange
    'hsl(14, 82%, 70%)',  // Light orange
    'hsl(0, 0%, 91%)',    // Light grey
    'hsl(0, 0%, 96%)',    // Very light grey
    'hsl(0, 0%, 45%)'     // Medium grey
  ]
}
```

### Chart 4: Funnel Chart (Conversion Flow)
```
Purpose: Visualize user journey dropoff
Type: Funnel with percentages
Colors: Orange (completed), grey (dropped)
Stages: Landing → Signup → Wizard → Completion
```

**Example Data:**
```javascript
{
  stages: [
    { name: 'Landed on Site', count: 5000, percentage: 100 },
    { name: 'Signed Up', count: 1500, percentage: 30 },
    { name: 'Started Wizard', count: 1200, percentage: 24 },
    { name: 'Completed Wizard', count: 900, percentage: 18 },
    { name: 'Active User', count: 750, percentage: 15 }
  ]
}
```

### Chart 5: Heatmap (Engagement Calendar)
```
Purpose: Show activity patterns (best days/times for events)
Type: Calendar heatmap
Colors: White (no activity) → Orange (high activity)
Interactions: Hover for count, click for details
```

---

## 🚀 USER JOURNEY FLOWS

### Flow 1: New Founder Onboarding

**Step 1: Discovery (Homepage)**
```
Hero Section:
- Headline: "Launch Your Startup in Medellin"
- Subheadline: "Join 300+ startups accelerating growth with AI-powered resources"
- CTA: [Start Your Journey] (orange button)
- Visual: Photo of founders collaborating
```

**Step 2: Signup**
```
Auth Page:
- Options: [Continue with Google] [Continue with GitHub] [Email Signup]
- Social proof: "Join 1,247 founders"
- Trust indicators: "Trusted by Ruta N, backed by Y Combinator"
```

**Step 3: Initial Profile**
```
Onboarding Modal:
- Welcome message: "Welcome to Medellin AI Hub! 🎉"
- Quick form: Name, role, startup name (optional)
- Progress: Step 1 of 3
- CTA: [Continue]
```

**Step 4: Wizard Entry**
```
Wizard Entry Screen:
- Headline: "Tell Us About Your Startup"
- Description: "Complete our 10-stage wizard to unlock:"
  ✓ AI-powered startup analysis
  ✓ Personalized perk recommendations
  ✓ Auto-generated pitch deck
  ✓ Access to mentors and investors
- Time estimate: "Takes 10-15 minutes"
- CTA: [Start Wizard]
```

**Step 5: Wizard Stages (1-6)**
```
Progress Bar: ━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stage Title: "Stage 2: Product Overview"

Form Fields:
- Startup Name*
- One-liner*
- Industry dropdown
- Target market
- Problem (textarea)
- Solution (textarea)

Footer: [← Previous] [Next →] [Save Draft]
Auto-save indicator: "Saved 5 seconds ago ✓"
```

**Step 6: AI Analysis (Stage 7)**
```
Loading State:
- Animation: Pulsing AI icon
- Message: "Analyzing your startup data..."
- Progress: 45%
- Tip: "Did you know? 85% of startups that complete this wizard secure funding within 6 months"

Results Display:
┌───────────────────────────────────┐
│ 💪 Strengths                      │
│ • Strong technical team           │
│ • Clear market need              │
│ • Unique value proposition       │
└───────────────────────────────────┘

┌───────────────────────────────────┐
│ ⚠️ Risks                          │
│ • Competitive market             │
│ • Monetization unclear           │
└───────────────────────────────────┘

Success Score: ████████░░ 82/100
```

**Step 7: Perk Matching (Stage 8)**
```
Header: "We matched 8 perks for you!"
Subheader: "Based on your tech stack and stage"

Grid of Perk Cards:
[AWS] [GitHub] [Stripe] [Notion]
Each with "Why recommended" reasoning
```

**Step 8: Pitch Deck (Stage 9)**
```
Options:
○ Generate AI pitch deck (recommended)
○ Upload existing deck
○ Skip for now

If Generate:
- Click [Generate Deck]
- AI creates 10 slides
- Show preview with edit option
- CTA: [Download PPTX] [Present]
```

**Step 9: Completion (Stage 10)**
```
Celebration:
- Confetti animation 🎉
- Message: "Congratulations! You're all set!"
- Checklist:
  ✓ Profile created
  ✓ AI analysis completed
  ✓ Perks claimed
  ✓ Pitch deck generated

Next Steps:
[Go to Dashboard] [Browse Events] [Find Mentors]
```

---

### Flow 2: Investor Discovering Startups

**Step 1: Login**
```
- Investor logs in with credentials
- System recognizes role: "investor"
- Redirects to Investor Dashboard
```

**Step 2: Dashboard Overview**
```
Sees:
- Portfolio metrics (12 startups)
- Trending startups this week (5 recommendations)
- Deal pipeline status
- Upcoming mentor sessions
```

**Step 3: Browse Trending Startups**
```
Clicks "View All Trending"
Filters:
- Industry: [SaaS] [FinTech] [HealthTech]
- Stage: [Seed] [Series A] [Growth]
- Investment Readiness: [High] [Medium] [Low]
- Match Score: 80%+

Results: 15 startups sorted by match score
```

**Step 4: View Startup Profile**
```
Clicks on "EventAI" card
Sees detailed profile:
- Company overview
- Founder bios
- Product demo video
- Traction metrics (charts)
- Team composition
- Pitch deck (embedded)
- AI analysis insights
- Contact information
```

**Step 5: Express Interest**
```
Clicks [Express Interest]
Modal appears:
- Message to founder (textarea)
- Preferred meeting format: [Virtual] [In-person] [Email]
- Availability calendar
- CTA: [Send Introduction Request]

System:
- Notifies founder via email
- Adds to deal pipeline: "Interested" stage
- Schedules follow-up reminder for investor
```

---

### Flow 3: Event Organizer Creating Event

**Step 1: Navigate to Dashboard**
```
User clicks [Create Event] from dashboard quick actions
Redirects to /dashboard/events/new
```

**Step 2: Event Creation Form**
```
Form Fields:
- Event Title*
- Description* (rich text editor)
- Event Type: [Workshop] [Networking] [Pitch Night] [Conference]
- Date & Time* (datetime picker)
- Location*: [Physical] [Virtual] [Hybrid]
  If Physical: Address field, map selector
  If Virtual: Zoom/Meet link field
- Capacity* (number)
- Registration Deadline
- Banner Image (upload, max 2MB)
- Ticket Pricing:
  ○ Free
  ○ Paid (enter amount in COP or USD)
- Tags: (multiselect: #AI #Startups #Funding #Networking)

Footer: [Save Draft] [Preview] [Submit for Approval]
```

**Step 3: Preview**
```
Shows how event will appear to users:
- Banner image
- Title & description
- Date, time, location
- Registration button
- Share buttons (Twitter, LinkedIn, WhatsApp)
```

**Step 4: Submit for Approval**
```
Confirmation modal:
"Submit event for admin review?"
- Expected review time: 24-48 hours
- You'll be notified via email
- Event status: Pending

CTA: [Submit] [Cancel]
```

**Step 5: Approval Notification**
```
Email received:
"Your event 'AI Pitch Night' has been approved! 🎉"

Dashboard shows:
- Event status: Published
- Registrations: 12
- Views: 145
- Actions: [Edit] [Cancel Event] [Send Update]
```

**Step 6: Manage Registrations**
```
Event dashboard shows:
- Attendee list (names, emails)
- Export to CSV
- Send bulk email to attendees
- Check-in functionality (QR code)
- Post-event feedback form
```

---

## 💡 STAKEHOLDER-SPECIFIC CONTENT

### For Startup Founders

**Dashboard Headline:** "Your Startup Command Center"

**Key Metrics to Highlight:**
- Wizard completion progress
- Perks claimed (total value)
- Network connections made
- Profile views
- Pitch deck downloads
- Event registrations

**Action-Oriented Content:**
- "3 new job opportunities match your profile"
- "AWS credits expire in 15 days - claim now"
- "Your pitch deck has been viewed 47 times"
- "5 investors viewed your profile this week"

**Motivational Elements:**
- Success stories from other founders
- Milestone celebrations (first perk claimed, wizard completed)
- Progress gamification (badges, levels)

---

### For Admins

**Dashboard Headline:** "Platform Control Center"

**Key Metrics to Highlight:**
- Daily active users (DAU)
- User growth rate
- Content moderation queue length
- System health status
- Revenue (if applicable)
- Support ticket resolution time

**Alert-Based Content:**
- "8 items pending approval - review now"
- "Storage usage at 82% - cleanup recommended"
- "User reported inappropriate content - action required"
- "Scheduled maintenance in 2 days"

**Efficiency Tools:**
- Bulk approve/reject
- Quick filters (by status, date, type)
- One-click actions (ban user, feature event)
- Export reports (CSV, PDF)

---

### For Investors/Mentors

**Dashboard Headline:** "Discover & Support Startups"

**Key Metrics to Highlight:**
- Portfolio performance
- New startup matches
- Meeting hours logged
- Impact score
- Deals in pipeline
- Mentee satisfaction rating

**Discovery-Focused Content:**
- "5 startups match your investment thesis"
- "EventAI just reached product-market fit - view profile"
- "3 startups ready for Series A funding"
- "New startups in HealthTech sector this week"

**Relationship Tools:**
- Message founder directly
- Schedule mentor session
- Request pitch deck
- Track startup progress over time
- Notes and reminders

---

## 🎯 DATA TO SHOWCASE

### Platform-Wide Statistics (Public Homepage)

```
┌─────────────────────────────────────────────────────────────┐
│  Medellin AI Hub by the Numbers                             │
│  ───────────────────────────────────────────────────────────│
│                                                              │
│  1,247 Active Founders  •  328 Startups  •  45 Events       │
│  $2.4M in Funding Raised  •  89 Jobs Posted                 │
│                                                              │
│  "85% of startups secure funding within 6 months"           │
└─────────────────────────────────────────────────────────────┘
```

### Startup Profile Data

**Overview Tab:**
- Company name, logo, tagline
- Industry, stage, founded date
- Team size, headquarters
- Website, social links

**Metrics Tab:**
- Users/customers
- Revenue (if public)
- Growth rate (MoM, YoY)
- Funding raised
- Burn rate

**Traction Tab:**
- Chart: User growth over time
- Chart: Revenue growth (if applicable)
- Press mentions
- Awards & recognition
- Customer testimonials

**Team Tab:**
- Founder photos & bios
- Team members (roles)
- Advisors & mentors
- Investors & partners

---

## 📱 MOBILE DASHBOARD LAYOUTS

### Mobile: Founder Dashboard
```
┌────────────────────┐
│ ☰  [Logo]      🔔3 │ ← Hamburger menu + notifications
├────────────────────┤
│ Welcome, Sarah! 👋 │
│ 75% Complete       │
│ █████████░         │
│ [Continue Wizard]  │
├────────────────────┤
│ Quick Stats        │
│ ┌────┐ ┌────┐     │
│ │ 12 │ │ 5  │     │ ← 2-column grid
│ │📅 │ │💼 │     │
│ └────┘ └────┘     │
│ ┌────┐ ┌────┐     │
│ │ 8  │ │$12K│     │
│ │🎁 │ │💰 │     │
│ └────┘ └────┘     │
├────────────────────┤
│ Upcoming Events    │
│ ┌──────────────┐   │
│ │ [Event Img]  │   │ ← Swipeable carousel
│ │ AI Workshop  │   │
│ │ May 15       │   │
│ │ [Register]   │   │
│ └──────────────┘   │
│ ○ ● ○              │ ← Pagination dots
├────────────────────┤
│ Job Matches (5)    │
│ ┌──────────────┐   │
│ │ Frontend Dev │   │ ← Vertical list
│ │ TechCorp     │   │
│ │ $80K-$120K   │   │
│ │ 95% Match    │   │
│ │ [Apply]      │   │
│ └──────────────┘   │
│ [View All Jobs]    │
└────────────────────┘
│                    │
│ ≡ Home Dashboard   │ ← Bottom navigation
│ 📅 Events          │
│ 💼 Jobs            │
│ 👤 Profile         │
└────────────────────┘
```

---

## 🎨 COLOR CODING SYSTEM

### Status Indicators
```
● Green (hsl(120, 60%, 50%))   - Success, active, healthy
● Orange (hsl(14, 82%, 60%))   - Warning, pending, in-progress
● Red (hsl(0, 84%, 60%))       - Error, critical, failed
● Blue (hsl(210, 80%, 60%))    - Info, neutral
● Grey (hsl(0, 0%, 45%))       - Inactive, disabled
```

### Match Scores
```
90-100%: Green badge "Excellent Match"
70-89%:  Orange badge "Good Match"
50-69%:  Grey badge "Moderate Match"
< 50%:   Not shown
```

### Priority Levels
```
🔴 High Priority:    Red dot
🟠 Medium Priority:  Orange dot
🟢 Low Priority:     Green dot
```

---

## 📊 SAMPLE DASHBOARD DATA (For Prototyping)

### Founder Dashboard Data
```json
{
  "user": {
    "name": "Sarah Martinez",
    "avatar": "/avatars/sarah.jpg",
    "startupName": "EventAI",
    "wizardProgress": 75,
    "joinedDate": "2025-01-15"
  },
  "metrics": {
    "eventsRegistered": 12,
    "jobApplications": 5,
    "perksClaimed": 8,
    "perksValue": 12000
  },
  "upcomingEvents": [
    {
      "id": 1,
      "title": "AI Pitch Workshop",
      "date": "2025-05-15",
      "time": "18:00",
      "location": "Ruta N",
      "image": "/events/pitch-workshop.jpg",
      "registered": false
    }
  ],
  "jobMatches": [
    {
      "id": 1,
      "title": "Frontend Engineer - Remote",
      "company": "TechCorp Medellin",
      "salary": "$80K-$120K USD",
      "type": "Full-time",
      "matchScore": 95,
      "posted": "2 days ago",
      "skills": ["React", "TypeScript", "Node.js"]
    }
  ],
  "recommendedPerks": [
    {
      "id": 1,
      "provider": "AWS",
      "title": "AWS Activate Credits",
      "value": 5000,
      "badge": "Highly Recommended",
      "logo": "/perks/aws-logo.png"
    }
  ]
}
```

### Admin Dashboard Data
```json
{
  "platformMetrics": {
    "totalUsers": 1247,
    "usersThisWeek": 52,
    "totalStartups": 328,
    "startupsThisWeek": 18,
    "totalEvents": 45,
    "eventsThisWeek": 5,
    "totalJobs": 89,
    "jobsThisWeek": 12
  },
  "pendingApprovals": [
    {
      "type": "event",
      "title": "AI Startup Summit 2025",
      "submittedBy": "Carlos Martinez",
      "submittedAt": "2 hours ago",
      "category": "Workshop",
      "expectedAttendees": 100
    }
  ],
  "recentActions": [
    {
      "admin": "Maria R.",
      "action": "approved event",
      "target": "Pitch Night",
      "timestamp": "2 min ago"
    }
  ],
  "systemHealth": {
    "database": "healthy",
    "apiGateway": "healthy",
    "edgeFunctions": "healthy",
    "aiServices": "healthy",
    "emailService": "healthy",
    "storage": "warning"
  }
}
```

---

## ✅ IMPLEMENTATION CHECKLIST

### Phase 1: Core Dashboards
- [ ] Founder dashboard layout
- [ ] Metric cards component
- [ ] Event cards component
- [ ] Job cards component
- [ ] Perk cards component
- [ ] Activity feed component

### Phase 2: Admin Panel
- [ ] Admin dashboard layout
- [ ] Platform metrics display
- [ ] Approval queue interface
- [ ] User management table
- [ ] Audit log viewer

### Phase 3: Charts & Data Viz
- [ ] Line chart component
- [ ] Bar chart component
- [ ] Donut chart component
- [ ] Funnel chart component
- [ ] Heatmap component

### Phase 4: Mobile Optimization
- [ ] Responsive dashboard layouts
- [ ] Bottom navigation
- [ ] Swipeable carousels
- [ ] Touch-optimized cards

### Phase 5: Polish & Testing
- [ ] Loading states for all components
- [ ] Empty states with helpful CTAs
- [ ] Error handling and retry logic
- [ ] Accessibility audit (WCAG AA)

---

**Document Version:** 1.0
**Created:** October 11, 2025
**Project:** Medellin AI Hub
**Purpose:** UI/UX design specifications for stakeholder dashboards
