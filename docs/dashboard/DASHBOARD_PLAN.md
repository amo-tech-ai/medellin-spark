# Medellin AI Hub - Dashboard Implementation Plan

## Overview
This document outlines the implementation strategy for all dashboard layouts including Founder, Admin, Investor/Mentor, and Event Organizer dashboards.

## Design Principles
- **Sidebar Navigation**: Persistent left sidebar with collapsible menu
- **Card-Based Layout**: Information organized in clean, scannable cards
- **Responsive**: Mobile-first approach with bottom nav on mobile
- **Data-Driven**: Real-time metrics and progress indicators
- **Action-Oriented**: Clear CTAs and quick actions

## Dashboard Types

### 1. Founder Dashboard (`/dashboard`)
**Primary User**: Startup founders
**Key Features**:
- Wizard progress tracker
- Quick metrics (events, jobs, perks)
- Upcoming events carousel
- Job matches with AI scoring
- Recommended perks
- Community activity feed
- Progress timeline

**Routes**:
- `/dashboard` - Main overview
- `/dashboard/events` - My registered events
- `/dashboard/jobs` - Job applications
- `/dashboard/perks` - Claimed perks
- `/dashboard/settings` - Account settings
- `/dashboard/profile` - Edit profile

### 2. Admin Dashboard (`/admin`)
**Primary User**: Platform administrators
**Key Features**:
- Platform health metrics
- User growth analytics
- Pending approvals queue
- Content moderation
- System health indicators
- Audit logs
- Real-time activity chart

**Routes**:
- `/admin` - Overview dashboard
- `/admin/users` - User management
- `/admin/startups` - Startup management
- `/admin/events` - Event approvals
- `/admin/jobs` - Job approvals
- `/admin/perks` - Perk management
- `/admin/analytics` - Platform analytics
- `/admin/audit` - Audit logs

### 3. Event Organizer Dashboard (`/dashboard/my-events`)
**Primary User**: Event creators
**Key Features**:
- Event management list
- Registration analytics
- Attendee management
- AI event assistant
- Event creation wizard
- Check-in tools

### 4. Member/Investor Dashboard (`/dashboard/portfolio`)
**Primary User**: Investors, mentors
**Key Features**:
- Portfolio overview
- Startup discovery feed
- Deal pipeline tracker
- Mentor session scheduler
- Impact metrics

## Component Architecture

### Core Components
1. **DashboardLayout** - Main layout wrapper with sidebar
2. **DashboardSidebar** - Navigation sidebar with menu items
3. **DashboardHeader** - Top bar with search, notifications, profile
4. **MetricCard** - Reusable card for displaying KPIs
5. **EventCard** - Event display with registration CTA
6. **JobCard** - Job listing with match score
7. **PerkCard** - Perk display with claim button
8. **ActivityCard** - Community post/activity item
9. **ProgressCard** - Progress tracker with visual bar
10. **ChartCard** - Wrapper for data visualizations

### Layout Components
1. **DashboardGrid** - Responsive grid system (1/2/3/4 columns)
2. **SectionHeader** - Section title with "View All" link
3. **EmptyState** - Friendly empty state with CTA
4. **LoadingState** - Skeleton loaders for async data

## Responsive Breakpoints

### Mobile (< 768px)
- Bottom navigation (Home, Events, Jobs, Profile)
- Hamburger menu for sidebar
- Single column layout
- Swipeable carousels for cards
- Stacked metric cards (2 columns)

### Tablet (768px - 1024px)
- Collapsible sidebar drawer
- 2-column grid for cards
- Compact header
- Touch-optimized

### Desktop (> 1024px)
- Persistent sidebar (240px width)
- 3-4 column grids
- Full-width charts
- Hover interactions

## Data Flow

### State Management
- React Query for server state
- Local storage for UI preferences
- Context for sidebar state
- URL params for filters

### API Endpoints (Mock for MVP)
```typescript
// Founder Dashboard
GET /api/dashboard/metrics
GET /api/dashboard/events
GET /api/dashboard/jobs
GET /api/dashboard/perks
GET /api/dashboard/activity

// Admin Dashboard
GET /api/admin/metrics
GET /api/admin/approvals
GET /api/admin/users
GET /api/admin/analytics
GET /api/admin/audit-logs

// Event Dashboard
GET /api/events/my-events
GET /api/events/:id/attendees
POST /api/events/:id/checkin
```

## Implementation Phases

### Phase 1: Foundation (Current Sprint)
✓ Design system setup
✓ Core page structure
- [ ] Dashboard layout with sidebar
- [ ] Basic routing structure
- [ ] Mobile navigation
- [ ] Header component

### Phase 2: Founder Dashboard (Sprint 2)
- [ ] Metric cards component
- [ ] Event cards integration
- [ ] Job cards integration
- [ ] Perk cards integration
- [ ] Activity feed
- [ ] Progress tracker

### Phase 3: Admin Dashboard (Sprint 3)
- [ ] Admin layout
- [ ] Platform metrics
- [ ] Approval queue UI
- [ ] User management table
- [ ] Analytics charts
- [ ] Audit log viewer

### Phase 4: Additional Dashboards (Sprint 4)
- [ ] Event organizer dashboard
- [ ] Investor/mentor dashboard
- [ ] Profile settings pages
- [ ] Advanced filtering

### Phase 5: Polish & Optimization (Sprint 5)
- [ ] Loading states
- [ ] Empty states
- [ ] Error boundaries
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Mobile testing

## Sidebar Navigation Structure

### Founder Sidebar
```
┌──────────────────┐
│ [Logo]           │
│ Medellin AI      │
├──────────────────┤
│ 🏠 Dashboard     │ /dashboard
│ 📅 Events        │ /dashboard/events
│ 💼 Jobs          │ /dashboard/jobs
│ 🎁 Perks         │ /dashboard/perks
│ 🚀 Wizard        │ /wizard
│ 📊 Pitch Deck    │ /pitch-deck
├──────────────────┤
│ ⚙️ Settings      │ /dashboard/settings
│ 👤 Profile       │ /dashboard/profile
│ 💬 Support       │ /contact
└──────────────────┘
```

### Admin Sidebar
```
┌──────────────────┐
│ [Logo] Admin     │
├──────────────────┤
│ 📊 Overview      │ /admin
│ 👥 Users         │ /admin/users
│ 🚀 Startups      │ /admin/startups
│ 📅 Events        │ /admin/events
│ 💼 Jobs          │ /admin/jobs
│ 🎁 Perks         │ /admin/perks
│ 📝 Posts         │ /admin/posts
│ ⏱️ Approvals     │ /admin/approvals
│ 📈 Analytics     │ /admin/analytics
│ 🔐 Audit Logs    │ /admin/audit
├──────────────────┤
│ ⚙️ Settings      │ /admin/settings
└──────────────────┘
```

## Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation (Tab, Arrow keys, Escape)
- Screen reader support (ARIA labels)
- Focus indicators (orange ring)
- Color contrast 4.5:1 minimum
- Skip to content link
- Semantic HTML structure

## Performance Targets
- Initial load: < 2s
- Dashboard data fetch: < 800ms
- Card interactions: < 100ms
- Chart rendering: < 500ms
- Mobile FCP: < 1.5s

## Testing Strategy
- Unit tests for components
- Integration tests for data flow
- E2E tests for critical paths
- Mobile device testing
- Accessibility audit
- Performance profiling

## Success Metrics
- Dashboard load time < 2s
- User engagement > 60% weekly return
- Mobile usability score > 90
- Zero critical accessibility issues
- 95%+ uptime

## Next Steps
1. ✅ Create this plan document
2. Implement DashboardLayout with Sidebar
3. Create core dashboard components
4. Add routes and navigation
5. Build Founder Dashboard
6. Implement mock data
7. Test responsive behavior
8. Add loading/empty states

---

**Document Version**: 1.0  
**Last Updated**: October 11, 2025  
**Status**: In Progress
