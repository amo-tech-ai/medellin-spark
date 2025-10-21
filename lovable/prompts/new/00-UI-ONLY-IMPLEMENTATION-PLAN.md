# UI-Only Implementation Plan - Lovable Design Prompts

**Created:** January 21, 2025
**Status:** Ready for Lovable Implementation
**Total Estimated Time:** 12-18 hours (UI design only)

---

## 🎯 IMPORTANT: UI DESIGN ONLY

**Lovable's Job:**
- Create beautiful, responsive UI layouts
- Design visual components and styling
- Build page structure with mock/placeholder data
- Focus on user experience and visual design

**Claude's Job (LATER):**
- Connect pages to Supabase database
- Implement data fetching and state management
- Add form validation and submission logic
- Handle authentication and permissions

---

## 📋 Overview

This plan covers UI-only implementation of 6 critical features:

1. **Jobs Dashboard** - Browse jobs with metrics display
2. **Jobs Listing Page** - Search and filter job openings
3. **Job Detail Page** - View single job with company info
4. **Event Detail Page** - View event details and register
5. **Perk Detail Page** - View perk/discount offer
6. **Post Job Form** - Submit new job posting (UI structure only)

---

## 🚀 Implementation Order

### TIER 1: Detail Pages (Start Here)
**Priority: Highest visual impact, standalone pages**

#### 1. Job Detail Page (`01-UI-job-detail-page.md`)
- **Route:** `/jobs/:id`
- **Time:** 2-3 hours
- **Focus:** Professional job posting layout
- **Mock Data:** 1-2 sample jobs with full details
- **Key Features:**
  - Company header with logo
  - Job title and employment badges
  - Salary highlight section
  - Description, requirements, responsibilities
  - Company info sidebar
  - Apply and save buttons (visual only)
  - Similar jobs section (3 cards)

#### 2. Event Detail Page (`02-UI-event-detail-page.md`)
- **Route:** `/events/:id`
- **Time:** 2-3 hours
- **Focus:** Engaging event page layout
- **Mock Data:** 1-2 sample events
- **Key Features:**
  - Event banner image
  - Date, time, location details
  - Event description
  - Organizer information
  - Register and save buttons (visual only)
  - Similar events section

#### 3. Perk Detail Page (`03-UI-perk-detail-page.md`)
- **Route:** `/perks/:id`
- **Time:** 2-3 hours
- **Focus:** Attractive benefits showcase
- **Mock Data:** 1-2 sample perks
- **Key Features:**
  - Provider logo and title
  - Value/savings highlight
  - Benefits list
  - Promo code display (visual only)
  - Redemption instructions
  - Terms accordion
  - Related perks section

**TIER 1 Total:** 6-9 hours

---

### TIER 2: List & Dashboard Pages
**Priority: After detail pages, browsing experience**

#### 4. Jobs Listing Page (`04-UI-jobs-listing-page.md`)
- **Route:** `/jobs`
- **Time:** 2-3 hours
- **Focus:** Clean job board layout
- **Mock Data:** 3-5 sample jobs
- **Key Features:**
  - Hero section with title
  - Search bar (visual only)
  - Category filter pills (visual only)
  - Job cards grid (responsive)
  - Apply buttons (visual only)

#### 5. Jobs Dashboard (`05-UI-jobs-dashboard.md`)
- **Route:** `/dashboard/jobs`
- **Time:** 2-3 hours
- **Focus:** Dashboard with metrics
- **Mock Data:** 3-5 sample jobs, placeholder numbers
- **Key Features:**
  - 4 metric cards (Total, Active, Interviews, Saved)
  - Job cards grid
  - Bookmark toggle (visual only)
  - Apply buttons (visual only)

**TIER 2 Total:** 4-6 hours

---

### TIER 3: Forms
**Priority: Last, more complex layouts**

#### 6. Post Job Form (`06-UI-post-job-form.md`)
- **Route:** `/post-job`
- **Time:** 2-3 hours
- **Focus:** Multi-section form layout
- **Mock Data:** Placeholder form fields
- **Key Features:**
  - Company information section
  - Job details section
  - Compensation section
  - Description textarea
  - Requirements list
  - Preview button (visual only)
  - Submit button (visual only)

**TIER 3 Total:** 2-3 hours

---

## 🎨 Design Standards

### Visual Consistency
- Match existing Dashboard, Events, Pitch Decks pages
- Use shadcn/ui components (Card, Button, Badge, Input)
- Use lucide-react icons throughout
- Consistent spacing and typography

### Color Palette
- Primary color for CTAs and highlights
- Muted colors for secondary text
- Accent colors for badges and highlights
- Background colors from existing theme

### Typography
- Headings: Bold, clear hierarchy
- Body text: Comfortable line height (1.6-1.8)
- Muted text for secondary info
- Consistent font sizes across pages

### Spacing
- Generous whitespace between sections
- Consistent card padding (p-6)
- Grid gaps (gap-4 or gap-6)
- Section spacing (space-y-8)

### Responsive Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl, 2xl)

---

## 📦 Components to Reuse

**From shadcn/ui:**
- Card, CardHeader, CardTitle, CardContent, CardFooter
- Button (variants: default, outline, ghost)
- Badge (variants: default, secondary, success)
- Input, Textarea
- Select, Checkbox, RadioGroup
- Separator
- Accordion
- ScrollArea

**From Project:**
- DashboardLayout (for dashboard pages)
- MetricCard (for metrics display)
- LoadingState (skeleton loaders)
- EmptyState (no data states)

**Icons from lucide-react:**
- Briefcase, FileText, Calendar, Bookmark
- MapPin, DollarSign, Building2, Users
- Search, Filter, ChevronDown
- Gift, Sparkles, Tag, Copy
- Check, ArrowRight, ExternalLink

---

## ❌ What NOT to Include

**NO Database Code:**
- ❌ No Supabase queries
- ❌ No .from('table') calls
- ❌ No database connections
- ❌ No SQL or data fetching

**NO State Management:**
- ❌ No React Query/TanStack Query
- ❌ No complex useState for data
- ❌ No useEffect for fetching
- ❌ No data mutations

**NO Advanced Logic:**
- ❌ No form submission handlers
- ❌ No authentication checks
- ❌ No real search/filter logic
- ❌ No data validation (except visual)

---

## ✅ What TO Include

**YES - Visual Design:**
- ✅ Page layout and structure
- ✅ Component composition
- ✅ Styling and colors
- ✅ Responsive design
- ✅ Typography and spacing

**YES - Mock Data:**
- ✅ Hardcoded sample jobs (3-5)
- ✅ Placeholder metrics (12, 5, 2, 7)
- ✅ Sample event/perk details
- ✅ Mock company information

**YES - Visual States:**
- ✅ Hover effects on cards
- ✅ Button active states
- ✅ Loading skeletons (visual only)
- ✅ Empty states (visual only)
- ✅ Visual feedback (button changes)

**YES - UI Interactions:**
- ✅ Button onClick for visual changes
- ✅ Toggle states (bookmark filled/outline)
- ✅ Accordion expand/collapse
- ✅ Tab navigation (visual)
- ✅ Modal open/close (if needed)

---

## 📝 Mock Data Examples

### Sample Job
```typescript
const mockJob = {
  id: "1",
  title: "Senior AI Engineer",
  company: "TechCorp AI",
  location: "Medellín, Colombia",
  type: "Full-time",
  remote: true,
  salary: "$80K - $120K",
  description: "Join our AI team to build cutting-edge solutions...",
  requirements: ["5+ years Python", "ML experience", "AWS knowledge"],
  skills: ["Python", "TensorFlow", "AWS"]
}
```

### Sample Metrics
```typescript
const mockMetrics = {
  totalApplications: 12,
  activeApplications: 5,
  interviews: 2,
  savedJobs: 7
}
```

### Sample Event
```typescript
const mockEvent = {
  id: "1",
  title: "AI Startup Networking Night",
  date: "Feb 15, 2025",
  time: "6:00 PM - 9:00 PM",
  location: "Poblado, Medellín",
  organizer: "Medellín Tech",
  capacity: 50,
  registered: 32
}
```

---

## 🧪 Testing Checklist

For each page before marking complete:

**Visual Design:**
- [ ] Matches existing page styles
- [ ] Consistent spacing and colors
- [ ] Typography hierarchy is clear
- [ ] Icons display correctly

**Responsiveness:**
- [ ] Mobile layout works (< 640px)
- [ ] Tablet layout works (640-1024px)
- [ ] Desktop layout works (> 1024px)
- [ ] No horizontal scroll at any size
- [ ] Touch targets are large enough on mobile

**Components:**
- [ ] All shadcn/ui components render
- [ ] Cards have proper shadows and borders
- [ ] Buttons have hover states
- [ ] Badges display with correct colors
- [ ] Icons are sized correctly

**Mock Data:**
- [ ] Sample data displays correctly
- [ ] No "undefined" or missing data errors
- [ ] Placeholder numbers show in metrics
- [ ] All text is readable

**Code Quality:**
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Page loads without issues
- [ ] Components are clean and readable

---

## 📅 Recommended Schedule

**Day 1: Detail Pages**
- Morning: Job Detail Page (3 hours)
- Afternoon: Event Detail Page (3 hours)

**Day 2: More Details + List**
- Morning: Perk Detail Page (2 hours)
- Afternoon: Jobs Listing Page (3 hours)

**Day 3: Dashboard + Form**
- Morning: Jobs Dashboard (3 hours)
- Afternoon: Post Job Form (3 hours)

**Total:** 3 days, 12-18 hours

---

## 🔗 Next Steps After UI Complete

Once Lovable completes all UI:

1. **Review all pages visually**
   - Check consistency across pages
   - Test responsive design
   - Verify all components work

2. **Claude connects to database:**
   - Replace mock data with real queries
   - Add authentication checks
   - Implement form submissions
   - Add real search/filter logic
   - Handle loading and error states

3. **Testing and polish:**
   - Test complete user journeys
   - Fix any data issues
   - Optimize performance
   - Deploy to production

---

## 📖 Related Files

- **Prompts:** `new/01-UI-*.md` (this folder)
- **Database Schema:** `../../supabase/migrations/`
- **Components:** `../../src/components/`
- **Design System:** shadcn/ui documentation

---

**Status:** Ready for Lovable implementation
**Next Action:** Start with Job Detail Page (01-UI-job-detail-page.md)
**Remember:** UI/UX design only - no database code!
