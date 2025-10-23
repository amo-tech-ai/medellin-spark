# Dashboard Structure & Navigation Recommendations
**Medellín AI Hub - Dashboard Design Guidelines**  
**Last Updated:** October 23, 2025

---

## 🎯 Executive Summary

The dashboard serves as the **central command center** for founders, providing quick access to opportunities, resources, and progress tracking. This document outlines the recommended structure, navigation patterns, and best practices for creating an intuitive, scalable dashboard experience.

---

## 📐 Layout Architecture

### Option A: Sidebar Navigation (RECOMMENDED)

**Why Recommended:**
- Industry standard for dashboards
- Scales well with multiple sections
- Persistent navigation reduces cognitive load
- Professional appearance
- Easy to add new sections

**Layout Structure:**
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Medellín AI          [Search] [Notif] [Profile] │ ← Header (64px)
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  [Sidebar]   │         Main Content Area                │
│              │                                          │
│  240px       │         Fluid width                      │
│  fixed       │                                          │
│              │                                          │
│              │                                          │
│              │                                          │
│              │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

**Sidebar Specifications:**
- Width: 240px (expanded), 64px (collapsed)
- Position: Fixed left
- Collapsible: Icon button at top
- Mini mode: Show only icons when collapsed
- Mobile: Slide-out drawer (hidden by default)

---

## 🗂️ Sidebar Navigation Structure

### Recommended Menu Items

```typescript
// Sidebar navigation structure
const sidebarNavigation = [
  {
    section: "Main",
    items: [
      { icon: "Home", label: "Dashboard", href: "/dashboard", badge: null },
      { icon: "Calendar", label: "Events", href: "/dashboard/events", badge: "3" },
      { icon: "Briefcase", label: "Jobs", href: "/dashboard/jobs", badge: "5" },
      { icon: "Gift", label: "Perks", href: "/dashboard/perks", badge: "12" },
      { icon: "Presentation", label: "Pitch Decks", href: "/dashboard/pitch-decks", badge: null },
    ]
  },
  {
    section: "Resources",
    items: [
      { icon: "Lightbulb", label: "AI Assistant", href: "/dashboard/ai-assistant", badge: "New" },
      { icon: "BookOpen", label: "Resources", href: "/dashboard/resources", badge: null },
      { icon: "Users", label: "Community", href: "/community", badge: null },
    ]
  },
  {
    section: "Account",
    items: [
      { icon: "Settings", label: "Settings", href: "/dashboard/settings", badge: null },
      { icon: "User", label: "Profile", href: "/profile", badge: null },
      { icon: "HelpCircle", label: "Support", href: "/contact", badge: null },
    ]
  }
];
```

### Visual Representation

```
┌──────────────────────┐
│ [M] Medellín AI      │ ← Logo + Collapse button
│                      │
│ Main                 │ ← Section label
│ 🏠 Dashboard         │
│ 📅 Events         ③  │ ← Badge (unread count)
│ 💼 Jobs           ⑤  │
│ 🎁 Perks         ⑫  │
│ 🚀 Pitch Decks       │
│                      │
│ Resources            │
│ 💡 AI Assistant [New]│ ← New feature badge
│ 📖 Resources         │
│ 👥 Community         │
│                      │
│ Account              │
│ ⚙️ Settings          │
│ 👤 Profile           │
│ ❓ Support           │
│                      │
├──────────────────────┤
│ [Avatar] John Doe    │ ← User info at bottom
│ john@startup.com     │
└──────────────────────┘
```

### Collapsed Sidebar (Mini Mode)

```
┌────┐
│ M  │ ← Logo icon only
│    │
│ 🏠 │
│ 📅③│ ← Icon + badge
│ 💼⑤│
│ 🎁⑫│
│ 🚀 │
│    │
│ 💡 │
│ 📖 │
│ 👥 │
│    │
│ ⚙️ │
│ 👤 │
│ ❓ │
│    │
│ [J]│ ← Avatar only
└────┘
```

---

## 🎨 Dashboard Home Layout (/dashboard)

### Page Structure

```
┌───────────────────────────────────────────────────────────────┐
│ Welcome back, John! 👋                    [Create Pitch Deck]  │ ← Welcome banner
├───────────────────────────────────────────────────────────────┤
│                                                               │
│ Quick Actions (4 cards in row)                               │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │ 🚀      │ │ 📅      │ │ 💼      │ │ 🎁      │             │
│ │ Create  │ │ Browse  │ │ Find    │ │ Claim   │             │
│ │ Deck    │ │ Events  │ │ Jobs    │ │ Perks   │             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
│                                                               │
│ Key Metrics (4 cards in row)                                 │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │   12    │ │    5    │ │   18    │ │   85%   │             │
│ │ Events  │ │ Jobs    │ │ Perks   │ │ Profile │             │
│ │ Reg.    │ │ Applied │ │ Claimed │ │ Complete│             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
│                                                               │
│ ┌────────────────────────┐ ┌──────────────────────────────┐  │
│ │ Upcoming Events        │ │ Recent Activity              │  │
│ │                        │ │                              │  │
│ │ [Event Card 1]         │ │ [Activity Item 1]            │  │
│ │ [Event Card 2]         │ │ [Activity Item 2]            │  │
│ │ [Event Card 3]         │ │ [Activity Item 3]            │  │
│ │                        │ │ [Activity Item 4]            │  │
│ │ [View All Events]      │ │ [View All Activity]          │  │
│ └────────────────────────┘ └──────────────────────────────┘  │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐  │
│ │ Application Status                                      │  │
│ │                                                         │  │
│ │ [Job 1] ━━━━━━━━━━━━━━━━━━ Applied ✓                   │  │
│ │ [Job 2] ━━━━━━━━━━━━━━━━━━ Interview 🎯                │  │
│ │ [Job 3] ━━━━━━━━━━━━━━━━━━ Under Review ⏳              │  │
│ │                                                         │  │
│ │ [Manage Applications]                                   │  │
│ └─────────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### 1. Welcome Banner
- **Purpose:** Personalized greeting + Primary CTA
- **Layout:** Full-width, subtle gradient background
- **Content:**
  - Left: "Welcome back, [Name]! 👋"
  - Right: Primary action button (e.g., "Create Pitch Deck")
- **Responsive:** Stack on mobile

#### 2. Quick Actions (4 cards)
- **Purpose:** One-click access to key features
- **Layout:** 4 equal-width cards in row (stack to 2x2 on tablet, 1 column on mobile)
- **Card Design:**
  - Large icon at top
  - Action label
  - Subtle hover effect (lift + shadow)
  - Click navigates to feature
- **Actions:**
  1. Create Pitch Deck → `/pitch-deck-wizard`
  2. Browse Events → `/events`
  3. Find Jobs → `/jobs`
  4. Claim Perks → `/perks`

#### 3. Key Metrics (4 cards)
- **Purpose:** At-a-glance user progress
- **Layout:** 4 equal-width cards (same as Quick Actions)
- **Card Design:**
  - Large number at top (primary color)
  - Label below
  - Icon or small chart
  - Optional "View Details" link on hover
- **Metrics:**
  1. Events Registered: 12 (link to /dashboard/events)
  2. Jobs Applied: 5 (link to /dashboard/jobs)
  3. Perks Claimed: 18 (link to /dashboard/perks)
  4. Profile Completion: 85% (link to /profile/edit)

#### 4. Upcoming Events Widget
- **Purpose:** Show next 3 events
- **Layout:** Card with list of event items
- **Event Item:**
  - Event name
  - Date & time
  - Location
  - "View" link
- **Footer:** "View All Events" button

#### 5. Recent Activity Feed
- **Purpose:** Show last 5 user actions
- **Layout:** Card with timeline/list
- **Activity Item:**
  - Icon (event, job, perk)
  - Action text ("Applied to [Job]", "Registered for [Event]")
  - Timestamp (relative, e.g., "2 hours ago")
- **Footer:** "View All Activity" button

#### 6. Application Status
- **Purpose:** Track job applications
- **Layout:** Card with progress bars
- **Application Item:**
  - Company logo
  - Job title
  - Status badge (Applied, Interview, Rejected)
  - Progress bar (visual representation)
- **Footer:** "Manage Applications" button → /dashboard/jobs

---

## 📊 Dashboard Events Page (/dashboard/events)

### Layout

```
┌───────────────────────────────────────────────────────────────┐
│ Events Dashboard                                              │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│ Metrics (4 cards)                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │   12    │ │    8    │ │    4    │ │    5    │             │
│ │ Regist. │ │ Attended│ │ Upcoming│ │ Completed│             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐  │
│ │ [Tab: Upcoming] [Tab: Past] [Tab: Saved]               │  │
│ ├─────────────────────────────────────────────────────────┤  │
│ │ Filters: [Date Range ▼] [Category ▼] [Location ▼]     │  │
│ ├─────────────────────────────────────────────────────────┤  │
│ │                                                         │  │
│ │ ┌─────────────────────────────────────────────────┐    │  │
│ │ │ [Image] AI Hackathon 2025                       │    │  │
│ │ │ 📅 Jan 15, 2025 • 9:00 AM                       │    │  │
│ │ │ 📍 Centro de Innovación, Medellín               │    │  │
│ │ │ [View Details] [Add to Calendar] [Cancel]       │    │  │
│ │ └─────────────────────────────────────────────────┘    │  │
│ │                                                         │  │
│ │ [More event cards...]                                   │  │
│ │                                                         │  │
│ └─────────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Features

#### Metrics Cards
- Registered: Total events registered
- Attended: Events marked as attended
- Upcoming: Future events
- Completed: Past events attended

#### Tabs
- **Upcoming:** Events happening in the future
- **Past:** Events that already happened
- **Saved:** Events user bookmarked but hasn't registered

#### Filters
- Date Range: This Week, This Month, Next Month, Custom
- Category: Workshop, Hackathon, Networking, Conference
- Location: In-person, Virtual, Hybrid

#### Event Card Actions
- View Details → `/events/:id`
- Add to Calendar → Download .ics file
- Cancel Registration → Confirmation modal
- Mark as Attended (for past events)

---

## 💼 Dashboard Jobs Page (/dashboard/jobs)

### Layout

```
┌───────────────────────────────────────────────────────────────┐
│ Jobs Dashboard                                                │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│ Metrics (4 cards)                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │   15    │ │    10   │ │    3    │ │   25    │             │
│ │ Total   │ │ Active  │ │ Inter-  │ │ Saved   │             │
│ │ Apps    │ │         │ │ views   │ │ Jobs    │             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐  │
│ │ [Tab: Applied] [Tab: Saved] [Tab: Interviews] [Tab: ✕] │  │
│ ├─────────────────────────────────────────────────────────┤  │
│ │ Filters: [Status ▼] [Company ▼] [Date ▼]               │  │
│ ├─────────────────────────────────────────────────────────┤  │
│ │                                                         │  │
│ │ ┌─────────────────────────────────────────────────┐    │  │
│ │ │ [Logo] Senior AI Engineer - TechCorp           │    │  │
│ │ │ Applied: Jan 10, 2025                          │    │  │
│ │ │ Status: [🟡 Under Review]                      │    │  │
│ │ │ Salary: $80k-$120k • Remote • Full-time        │    │  │
│ │ │ [View Job] [Withdraw Application]              │    │  │
│ │ └─────────────────────────────────────────────────┘    │  │
│ │                                                         │  │
│ │ [More job cards...]                                     │  │
│ │                                                         │  │
│ └─────────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Features

#### Metrics Cards
- Total Applications: All job applications
- Active: Applications still under consideration
- Interviews: Moved to interview stage
- Saved Jobs: Bookmarked but not applied

#### Tabs
- **Applied:** Jobs user has applied to
- **Saved:** Jobs user bookmarked
- **Interviews:** Jobs with scheduled interviews
- **Closed:** Rejected or closed positions

#### Status Badges
- 🟢 **Interview:** Invited to interview
- 🟡 **Under Review:** Application being reviewed
- 🔵 **Applied:** Application submitted
- 🔴 **Rejected:** Application declined
- ⚪ **Closed:** Position filled

#### Job Card Actions
- View Job → `/jobs/:id`
- Withdraw Application → Confirmation modal
- Update Status → Dropdown (User marks as interview, rejected, etc.)
- Message Recruiter → (future feature)

---

## 🚀 Dashboard Pitch Decks Page (/dashboard/pitch-decks)

### Layout

```
┌───────────────────────────────────────────────────────────────┐
│ Pitch Decks Dashboard                    [+ Create New Deck]  │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│ Metrics (4 cards)                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │    8    │ │    3    │ │    5    │ │  1.2K   │             │
│ │ Total   │ │ In      │ │ Publish-│ │ Total   │             │
│ │ Decks   │ │ Progress│ │ ed      │ │ Views   │             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐  │
│ │ [Tab: My Decks] [Tab: Templates]                       │  │
│ ├─────────────────────────────────────────────────────────┤  │
│ │ Sort: [Recent ▼] [Name ▼] [Status ▼]    [Grid] [List]  │  │
│ ├─────────────────────────────────────────────────────────┤  │
│ │                                                         │  │
│ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │  │
│ │ │[Thumb 1] │ │[Thumb 2] │ │[Thumb 3] │ │[Thumb 4] │   │  │
│ │ │ Deck 1   │ │ Deck 2   │ │ Deck 3   │ │ Deck 4   │   │  │
│ │ │ Draft 🟡 │ │ Publish✅│ │ Progress │ │ Draft    │   │  │
│ │ │ 10 slides│ │ 12 slides│ │ 8 slides │ │ 15 slides│   │  │
│ │ │ 2d ago   │ │ 5d ago   │ │ 1w ago   │ │ 2w ago   │   │  │
│ │ │          │ │          │ │          │ │          │   │  │
│ │ │ [Edit]▼  │ │ [View]▼  │ │ [Edit]▼  │ │ [Edit]▼  │   │  │
│ │ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │  │
│ │                                                         │  │
│ └─────────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Features

#### Metrics Cards
- Total Decks: All pitch decks created
- In Progress: Drafts being edited
- Published: Public decks with share links
- Total Views: Aggregate views across all decks

#### Tabs
- **My Decks:** User's created presentations
- **Templates:** Pre-made templates to start from

#### View Modes
- Grid View: Thumbnail preview cards
- List View: Detailed list with metadata

#### Deck Card
- Thumbnail preview (first slide)
- Title
- Status badge (Draft, Published, In Progress)
- Slide count
- Last edited timestamp
- Dropdown menu:
  - Edit Outline → `/presentations/:id/outline`
  - Edit Slides → `/presentations/:id/edit`
  - View/Present → `/presentations/:id/view`
  - Share Link → Copy to clipboard
  - Duplicate → Create copy
  - Delete → Confirmation modal

#### Create New Deck
- Prominent button (top-right)
- Opens modal with options:
  - Start from Scratch → `/pitch-deck-wizard`
  - Use Template → Select template, then `/presentations/:id/edit`
  - Import PPTX → Upload file

---

## ⚙️ Dashboard Settings Page (/dashboard/settings)

### Layout

```
┌───────────────────────────────────────────────────────────────┐
│ Settings                                   [Save Changes]     │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│ ┌────────┐ ┌─────────────────────────────────────────────┐   │
│ │ Menu   │ │ Profile Settings                            │   │
│ ├────────┤ │                                             │   │
│ │Profile │ │ [Avatar Upload]                             │   │
│ │Account │ │                                             │   │
│ │Notif.  │ │ Full Name: [________________________]       │   │
│ │Privacy │ │ Email: [_____________________________]      │   │
│ │Billing │ │ Bio: [________________________________]     │   │
│ │Integr. │ │      [________________________________]     │   │
│ │        │ │                                             │   │
│ │        │ │ Social Links:                               │   │
│ │        │ │ LinkedIn: [_________________________]       │   │
│ │        │ │ Twitter: [__________________________]       │   │
│ │        │ │ GitHub: [___________________________]       │   │
│ │        │ │                                             │   │
│ └────────┘ └─────────────────────────────────────────────┘   │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Sections

#### 1. Profile Settings
- Avatar upload (drag-drop or click)
- Full Name
- Email (read-only or with verification)
- Bio (textarea)
- Social Links (LinkedIn, Twitter, GitHub, Website)

#### 2. Account Settings
- Change Password (old password, new password, confirm)
- Two-Factor Authentication (enable/disable)
- Delete Account (with confirmation)
- Export Data (download all user data as JSON)

#### 3. Notification Preferences
- Email Notifications (toggle on/off)
  - Event Reminders (24h before, 1h before)
  - Job Alerts (new jobs matching criteria)
  - Application Updates (status changes)
  - Newsletter (weekly digest)
- Push Notifications (if implemented)
- SMS Notifications (optional)

#### 4. Privacy Settings
- Profile Visibility (Public, Community Only, Private)
- Activity Visibility (Show my activity to others)
- Search Visibility (Allow indexing by search engines)
- Data Sharing (Share anonymous usage data)

#### 5. Billing (Future)
- Current Plan
- Payment Method
- Billing History
- Upgrade/Downgrade

#### 6. Integrations (Future)
- Connect Calendar (Google, Outlook)
- Connect Slack
- Connect GitHub
- Connect LinkedIn

### Save Behavior
- Sticky "Save Changes" button (top-right)
- Auto-save indicator for certain fields
- Toast notification on successful save
- Validation errors inline

---

## 📱 Mobile Dashboard Experience

### Bottom Navigation (Mobile)
```
┌──────────────────────────────────────────┐
│         [Content Area]                   │
│                                          │
│                                          │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│ [🏠] [📅] [💼] [🚀] [👤]                  │ ← Fixed bottom bar
│ Home Events Jobs Decks Profile           │
└──────────────────────────────────────────┘
```

### Mobile Sidebar
- Hamburger menu (top-left)
- Slides in from left
- Overlay with backdrop
- Same menu items as desktop
- Closes on navigation or backdrop click

### Mobile Dashboard Home
- Stack all cards vertically
- Quick Actions: 2x2 grid
- Metrics: 2x2 grid
- Widgets: Full-width stacked
- Reduce card padding/margins

### Mobile Responsive Breakpoints
- **< 640px:** Mobile layout
- **640px - 768px:** Tablet (compact)
- **> 768px:** Desktop sidebar

---

## 🎨 Design Tokens & Styling

### Sidebar Colors
```css
/* Sidebar background */
--sidebar-bg: hsl(var(--background));
--sidebar-border: hsl(var(--border));

/* Active item */
--sidebar-item-active-bg: hsl(var(--primary) / 0.1);
--sidebar-item-active-text: hsl(var(--primary));
--sidebar-item-active-border: hsl(var(--primary));

/* Hover */
--sidebar-item-hover-bg: hsl(var(--muted) / 0.5);

/* Text */
--sidebar-text: hsl(var(--foreground));
--sidebar-text-muted: hsl(var(--muted-foreground));
```

### Card Styling
```css
/* Dashboard cards */
--card-bg: hsl(var(--card));
--card-border: hsl(var(--border));
--card-shadow: 0 1px 3px hsl(var(--foreground) / 0.1);
--card-radius: 12px;
--card-padding: 1.5rem;

/* Hover effect */
--card-hover-shadow: 0 4px 12px hsl(var(--foreground) / 0.15);
--card-hover-translate: translateY(-2px);
```

### Typography
```css
/* Dashboard headings */
--dashboard-h1: 2rem; /* Page title */
--dashboard-h2: 1.5rem; /* Section title */
--dashboard-h3: 1.25rem; /* Card title */

/* Metrics */
--metric-value: 2.5rem; /* Large number */
--metric-label: 0.875rem; /* Label text */
```

---

## ♿ Accessibility Guidelines

### Keyboard Navigation
- **Tab:** Navigate through sidebar items
- **Enter/Space:** Activate link/button
- **Arrow Keys:** Navigate within menus
- **Escape:** Close modals/dropdowns
- **Cmd/Ctrl + K:** Global search (future)

### Screen Reader Support
- ARIA labels on all icons
- ARIA landmarks (`<nav>`, `<main>`, `<aside>`)
- ARIA live regions for notifications
- Descriptive button text (not just icons)

### Focus Indicators
- Visible focus ring (2px solid primary color)
- High contrast focus state
- Never remove focus outline

### Color Contrast
- Text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

---

## 🚀 Performance Best Practices

### Loading Strategy
1. Sidebar: Load immediately (skeleton)
2. Metrics: Load first (most important)
3. Widgets: Load progressively
4. Charts: Lazy load when visible

### Data Fetching
- React Query for caching
- Stale-while-revalidate pattern
- Prefetch on hover (job/event cards)
- Paginate long lists (events, jobs)

### Code Splitting
- Lazy load dashboard pages
- Dynamic imports for charts
- Separate bundles for editor

### Image Optimization
- Lazy load images
- Use thumbnails in cards
- WebP format with fallback
- Responsive images

---

## 🔧 Implementation Checklist

### Phase 1: Core Structure ✅
- [x] DashboardLayout component
- [x] Sidebar navigation
- [x] Header with search/notifications
- [x] Mobile bottom nav
- [x] Responsive breakpoints

### Phase 2: Dashboard Pages
- [x] Dashboard Home
- [x] Events Dashboard
- [x] Jobs Dashboard
- [x] Pitch Decks Dashboard (partial)
- [x] Settings

### Phase 3: Features
- [ ] Real-time notifications
- [ ] Global search
- [ ] Activity feed
- [ ] AI Assistant widget
- [ ] Dark mode toggle

### Phase 4: Polish
- [ ] Loading states
- [ ] Empty states
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Keyboard shortcuts

---

## 📈 Success Metrics

### User Engagement
- Dashboard Daily Active Users (DAU)
- Average Session Duration (target: > 5 min)
- Feature Usage Rate (Events, Jobs, Pitch Decks)
- Return Rate (7-day, 30-day)

### Performance
- Initial Load: < 2s
- Time to Interactive: < 3s
- First Contentful Paint: < 1s
- Metric Card Load: < 800ms

### UX Metrics
- Navigation Efficiency (clicks to complete task)
- Task Completion Rate (apply to job, register for event)
- User Satisfaction Score (CSAT)
- Net Promoter Score (NPS)

---

**Next Document:** See `WIZARD-FLOW-RECOMMENDATIONS.md` for pitch deck wizard structure.

**Next Document:** See `BEST-PRACTICES-CHECKLIST.md` for implementation guidelines.
