# Lovable Build Plan - Medellin Spark

**Current Status:** 30 routes exist, need content and design
**Goal:** Design and build the missing page content in Lovable
**Priority:** Focus on user-facing pages first, then dashboard

---

## Pages That Need Building

### TIER 1: Critical User-Facing Pages (Start Here)

#### 1. Event Detail Page
**Route:** `/events/:id`
**File:** `src/pages/EventDetail.tsx` (placeholder exists)
**What to Build:**
- Hero section with event image/banner
- Event title, date, time, location
- Description (rich text formatting)
- Organizer information with avatar
- Registration button (primary CTA)
- Social sharing buttons
- "Similar Events" section at bottom
- Breadcrumb: Home > Events > Event Title

**Design Reference:** Look at event detail pages on Eventbrite, Meetup

---

#### 2. Job Detail Page
**Route:** `/jobs/:id`
**File:** `src/pages/JobDetail.tsx` (placeholder exists)
**What to Build:**
- Company header with logo and name
- Job title and type badge (Full-time, Remote, etc.)
- Salary range and location
- Job description (rich text)
- Requirements list (bullet points)
- Responsibilities list (bullet points)
- Apply button (primary CTA)
- Save/Bookmark button (outline)
- Company info sidebar (about, size, industry)
- "Similar Jobs" section

**Design Reference:** Look at job pages on LinkedIn, AngelList

---

#### 3. Perk Detail Page
**Route:** `/perks/:id`
**File:** `src/pages/PerkDetail.tsx` (placeholder exists)
**What to Build:**
- Perk image/logo banner
- Title and category badge
- Value/savings amount (highlight)
- Description (what you get)
- How to redeem section
- Terms and conditions
- Redeem button or promo code display
- Provider information
- "More Perks" section

**Design Reference:** Look at perks pages on Perkville, corporate benefits portals

---

### TIER 2: Dashboard Pages (After Tier 1)

#### 4. Jobs Board Dashboard
**Route:** `/dashboard/jobs`
**File:** `src/pages/DashboardJobs.tsx` (needs creation)
**What to Build:**
- Use the prompt: `lovable/prompts/jobs-dashboard-lovable.md`
- 4 metric cards (Total Apps, Active, Interviews, Saved)
- Job listings grid (3 columns desktop)
- Job cards with bookmark and apply buttons
- Filters section (optional Phase 2)

**Priority:** High - Key MVP feature

---

#### 5. Perks Dashboard
**Route:** `/dashboard/perks`
**File:** Needs creation
**What to Build:**
- Similar structure to Jobs Dashboard
- 4 metrics: Available Perks, Redeemed, Favorites, Savings
- Perks grid with redeem/save buttons
- Filter by category (SaaS, Discounts, Services, etc.)

**Priority:** Medium - Nice to have for MVP

---

#### 6. Settings Dashboard
**Route:** `/dashboard/settings`
**File:** Needs creation
**What to Build:**
- Profile settings section (name, email, avatar)
- Password change section
- Notification preferences
- Privacy settings
- Account deletion option
- Save changes button

**Priority:** Medium - Users need basic settings

---

### TIER 3: Optional Public Pages (Future)

#### 7. Startup Profile Page
**Route:** `/startups/:id`
**File:** Needs creation
**What to Build:**
- Startup logo and name header
- Tagline/one-liner
- Description and story
- Team members section
- Metrics (founded date, stage, funding)
- Products/services
- Contact information
- Social links

**Priority:** Low - Defer to post-MVP

---

#### 8. Founder Profile Page
**Route:** `/founders/:id`
**File:** Needs creation
**What to Build:**
- Profile photo and name
- Bio/background
- Current startup/role
- Past experience
- Skills and expertise
- Social links (LinkedIn, Twitter)
- Contact button

**Priority:** Low - Defer to post-MVP

---

## Pages That Just Need Polish

### TIER 4: Existing Pages - Minor Updates

#### 9. Dashboard Home
**Route:** `/dashboard`
**File:** `src/pages/Dashboard.tsx` (exists)
**Current:** Shows 4 metrics
**Needs:**
- Add quick actions section
- Recent activity feed
- Upcoming events widget
- Application status summary

**Priority:** Low - Working but could be better

---

#### 10. Events List Page
**Route:** `/events`
**File:** Exists
**Needs:**
- Click event card → navigate to `/events/:id`
- Ensure "View Details" buttons work
- Add filters (date, category, location)

**Priority:** Medium - Navigation needs to work

---

#### 11. Jobs List Page
**Route:** `/jobs`
**File:** Exists
**Needs:**
- Click job card → navigate to `/jobs/:id`
- Ensure "View Job" buttons work
- Add filters (type, location, salary)

**Priority:** Medium - Navigation needs to work

---

#### 12. Perks List Page
**Route:** `/perks`
**File:** Exists
**Needs:**
- Click perk card → navigate to `/perks/:id`
- Ensure "View Details" buttons work
- Add category filters

**Priority:** Medium - Navigation needs to work

---

## Missing Pages

### TIER 5: Error Pages

#### 13. 404 Not Found
**Route:** `*` (catch-all)
**File:** `src/pages/NotFound.tsx` (might exist)
**Needs:**
- Friendly 404 message
- Illustration or animation
- Search bar
- "Go Home" button
- Link to popular pages

**Priority:** Medium - Better UX

---

#### 14. Error Boundary Page
**Component:** `src/components/ErrorBoundary.tsx`
**Needs:**
- Catch React errors
- Show friendly error message
- "Reload Page" button
- "Report Issue" button
- Log errors to console

**Priority:** Medium - Production safety

---

## Implementation Priority Order

### Week 1: Detail Pages (Critical)
1. Event Detail Page (`/events/:id`)
2. Job Detail Page (`/jobs/:id`)
3. Perk Detail Page (`/perks/:id`)
4. Update list pages to link to detail pages

### Week 2: Dashboard Expansion
5. Jobs Board Dashboard (`/dashboard/jobs`)
6. Settings Dashboard (`/dashboard/settings`)
7. Dashboard Home improvements

### Week 3: Polish & Optional
8. Perks Dashboard (`/dashboard/perks`)
9. 404 and Error pages
10. List page filters and search

### Future (Post-MVP)
11. Startup Profile (`/startups/:id`)
12. Founder Profile (`/founders/:id`)

---

## Design Guidelines for All Pages

### Consistent Elements
- Use DashboardLayout for all `/dashboard/*` pages
- Use same Card, Button, Badge components throughout
- Maintain color scheme from existing pages
- Use same spacing and typography
- Include loading states (LoadingState component)
- Include empty states (EmptyState component)

### Navigation
- All list pages link to detail pages
- Detail pages have breadcrumbs
- Back buttons where appropriate
- Consistent header structure

### Responsive
- Mobile-first design
- Grid layouts collapse on mobile
- Touch-friendly buttons (44px min)
- No horizontal scroll

### Performance
- Lazy load images
- Optimize large lists (pagination or infinite scroll)
- Show loading skeletons
- Cache data with React Query

---

## Database Tables Reference

**Available for use:**
- `events` - Event listings
- `jobs` - Job postings
- `companies` - Company information
- `perks` - Perk/benefit offerings
- `profiles` - User profiles
- `job_applications` - User job applications
- `saved_jobs` - Bookmarked jobs
- `event_registrations` - Event RSVPs (if exists)

---

## Success Criteria

### Each Page Must Have:
- ✅ Matches existing design system
- ✅ Responsive on all screen sizes
- ✅ Loading state while data fetches
- ✅ Empty state when no data
- ✅ Error handling
- ✅ TypeScript types defined
- ✅ No console errors
- ✅ Accessible (WCAG AA)

### Navigation Must Work:
- ✅ List page → Detail page navigation
- ✅ Breadcrumbs on detail pages
- ✅ Back buttons work
- ✅ Dashboard sidebar navigation

---

## Testing Checklist

Before marking each page complete:
- [ ] Page loads without errors
- [ ] Data displays correctly
- [ ] Buttons/links work
- [ ] Responsive on mobile/tablet/desktop
- [ ] Loading state shows
- [ ] Empty state shows when appropriate
- [ ] TypeScript compiles
- [ ] No console warnings

---

## Notes

**Auth Protection:**
- Currently disabled for development (intentional)
- Will be added before production launch
- Don't worry about auth during Lovable design phase

**Database:**
- All tables exist and have data
- RLS policies enabled
- Use React Query for data fetching
- Show real data, not hardcoded

**Performance:**
- Keep pages fast (<2 second load)
- Use pagination for large lists
- Optimize images
- Lazy load below-fold content

---

**Last Updated:** January 21, 2025
**Status:** Ready for Lovable implementation
**Next Step:** Start with Event Detail Page (Tier 1, #1)
