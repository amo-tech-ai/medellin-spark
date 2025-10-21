# What Needs Design - Complete List

**Comprehensive inventory of pages/components that need Lovable implementation**
**Updated:** October 21, 2025

---

## ✅ COMPLETED (Have Prompts Ready)

1. ✅ Event Detail Page (`01-event-detail-page.md`)
2. ✅ Job Detail Page (`02-job-detail-page.md`)
3. ✅ Perk Detail Page (`03-perk-detail-page.md`)
4. ✅ Jobs Dashboard (`04-jobs-dashboard.md`)
5. ✅ Jobs Listing Page (`05-jobs-listing-page.md`)
6. ✅ Post Job Form (`06-post-job-form.md`)

---

## 🔴 TIER 1 - CRITICAL (Need Prompts)

### List Pages (Match Jobs Listing Pattern)

**7. Events Listing Page** (`/events`)
- Route: `/events`
- File: `src/pages/Events.tsx` (probably exists with mock data)
- Needs: Database connection, search, filters, clickable cards
- Time: 2-3 hours
- **Same pattern as Jobs Listing**

**8. Perks Listing Page** (`/perks`)
- Route: `/perks`
- File: `src/pages/Perks.tsx` (probably exists with mock data)
- Needs: Database connection, search, category filters, redeem buttons
- Time: 2-3 hours
- **Same pattern as Jobs Listing**

### Forms (User Submissions)

**9. Post Event Form** (`/post-event`)
- Create new route
- Form to submit events
- Fields: title, date, time, location, description, organizer
- Time: 2-3 hours
- **Same pattern as Post Job Form**

**10. Post Perk Form** (`/post-perk` or `/submit-perk`)
- Create new route
- Form to submit perks/offers
- Fields: title, value, promo code, provider, redemption instructions
- Time: 2-3 hours
- **Same pattern as Post Job Form**

---

## 🟡 TIER 2 - HIGH PRIORITY (Dashboard & Profile)

### Dashboard Pages

**11. Settings Dashboard** (`/dashboard/settings`)
- Route: `/dashboard/settings`
- File: Needs creation
- Features:
  - Profile settings (name, email, avatar)
  - Password change
  - Notification preferences
  - Account management
- Time: 2-3 hours

**12. Perks Dashboard** (`/dashboard/perks`)
- Route: `/dashboard/perks`
- File: Needs creation
- Features:
  - Metrics: Available, Redeemed, Favorites, Savings
  - Perks grid with redeem/save buttons
  - Filter by category
- Time: 3-4 hours
- **Similar to Jobs Dashboard**

### Profile Pages

**13. User Profile Page** (`/profile/:id`)
- Route: `/profile/:id` (view other users)
- File: `src/pages/Profile.tsx` (exists but might be basic)
- Features:
  - User avatar, name, bio
  - Skills and expertise
  - Social links
  - Past activity (events attended, jobs applied)
- Time: 2-3 hours

**14. Edit Profile Page** (`/profile/edit` or `/dashboard/profile`)
- Edit current user's profile
- Form: name, bio, skills, social links
- Avatar upload
- Time: 2-3 hours

---

## 🟢 TIER 3 - NICE TO HAVE (Startup Focus)

### Startup Pages

**15. Startups Listing** (`/startups`)
- Route: `/startups`
- File: `src/pages/Startups.tsx` (probably placeholder)
- Features:
  - Browse all startups
  - Search and filter
  - Startup cards (logo, name, tagline, stage)
- Time: 2-3 hours

**16. Startup Detail Page** (`/startups/:id`)
- Route: `/startups/:id`
- File: Needs creation
- Features:
  - Startup info (logo, name, description)
  - Team members
  - Metrics (founded, stage, funding)
  - Products/services
  - Contact information
- Time: 3-4 hours

**17. Submit Startup Form** (`/startup-profile`)
- Route: `/startup-profile` (already exists as route)
- File: `src/pages/StartupProfile.tsx` (might be basic)
- Features:
  - Submit startup for listing
  - Company info, team, metrics
  - Pitch deck upload (optional)
- Time: 3-4 hours

### Founder Pages

**18. Founders Listing** (`/founders`)
- Route: `/founders`
- File: `src/pages/Founders.tsx` (probably placeholder)
- Features:
  - Browse all founders
  - Search by name, expertise
  - Founder cards (avatar, name, current startup)
- Time: 2-3 hours

**19. Founder Detail Page** (`/founders/:id`)
- Route: `/founders/:id`
- File: Needs creation
- Features:
  - Founder profile (photo, bio)
  - Current and past startups
  - Skills and expertise
  - Contact button
- Time: 2-3 hours

---

## 🔵 TIER 4 - ADDITIONAL FEATURES

### Admin/Management

**20. Admin Dashboard** (`/admin`)
- Approve/reject job postings
- Moderate events
- Manage users
- Analytics
- Time: 4-6 hours

**21. Job Applications Management** (`/dashboard/applications`)
- For recruiters/companies
- View all applications to their jobs
- Change application status
- Time: 3-4 hours

### Community Features

**22. Blog Listing** (`/blog`)
- Route: `/blog`
- File: `src/pages/Blog.tsx` (probably placeholder)
- Features:
  - Blog posts list
  - Search and categories
  - Author info
- Time: 2-3 hours

**23. Blog Post Detail** (`/blog/:slug`)
- Individual blog post page
- Rich content rendering
- Author bio
- Related posts
- Time: 2-3 hours

**24. Community/Members Page** (`/community`)
- List all members
- Search by skills
- Filter by interests
- Time: 2-3 hours

### Notifications & Messaging

**25. Notifications Page** (`/notifications`)
- List all user notifications
- Mark as read
- Filter by type
- Time: 2-3 hours

**26. Messages/Inbox** (`/messages`)
- Direct messages between users
- Inbox/sent views
- Real-time updates
- Time: 4-6 hours (complex)

---

## 🟣 TIER 5 - POLISH & ENHANCEMENTS

### Error & System Pages

**27. 404 Not Found Page**
- Custom 404 page
- Search bar
- Popular links
- Time: 1 hour

**28. 500 Error Page**
- Server error page
- "Try again" button
- Support contact
- Time: 1 hour

**29. Maintenance Page**
- Scheduled maintenance message
- Countdown timer
- Social links
- Time: 1 hour

### Landing & Marketing

**30. About Page Redesign** (`/about`)
- Route: `/about`
- File: `src/pages/About.tsx` (exists but basic?)
- Features:
  - Mission and vision
  - Team members
  - Statistics
  - Timeline/milestones
- Time: 2-3 hours

**31. Contact Page Enhancement** (`/contact`)
- Route: `/contact`
- File: `src/pages/Contact.tsx` (exists but basic?)
- Features:
  - Contact form
  - Office location
  - Social links
  - FAQ
- Time: 2 hours

---

## 📊 PRIORITY SUMMARY

| Priority | Count | Total Time |
|----------|-------|------------|
| ✅ Completed | 6 prompts | - |
| 🔴 TIER 1 (Critical) | 4 pages | 10-12 hours |
| 🟡 TIER 2 (High) | 4 pages | 10-13 hours |
| 🟢 TIER 3 (Nice to have) | 5 pages | 12-16 hours |
| 🔵 TIER 4 (Additional) | 7 pages | 18-28 hours |
| 🟣 TIER 5 (Polish) | 5 pages | 8-11 hours |
| **TOTAL** | **31 pages** | **58-80 hours** |

---

## 🎯 RECOMMENDED IMPLEMENTATION ORDER

### Week 1: Critical Detail & List Pages
1. Events Listing Page (07) - 2-3 hours
2. Perks Listing Page (08) - 2-3 hours
3. Post Event Form (09) - 2-3 hours
4. Post Perk Form (10) - 2-3 hours

**Total: 8-12 hours**

### Week 2: Dashboard & Profile
5. Settings Dashboard (11) - 2-3 hours
6. Perks Dashboard (12) - 3-4 hours
7. User Profile Page (13) - 2-3 hours
8. Edit Profile Page (14) - 2-3 hours

**Total: 9-13 hours**

### Week 3: Startup Features
9. Startups Listing (15) - 2-3 hours
10. Startup Detail Page (16) - 3-4 hours
11. Submit Startup Form (17) - 3-4 hours

**Total: 8-11 hours**

---

## 🚀 IMMEDIATE NEXT STEPS

**Create these prompts first** (highest impact):

1. **07-events-listing-page.md**
   - Pattern: Copy from `05-jobs-listing-page.md`
   - Changes: events table, date/time display, register button

2. **08-perks-listing-page.md**
   - Pattern: Copy from `05-jobs-listing-page.md`
   - Changes: perks table, value display, redeem button

3. **09-post-event-form.md**
   - Pattern: Copy from `06-post-job-form.md`
   - Changes: event fields (date, time, venue, capacity)

4. **10-post-perk-form.md**
   - Pattern: Copy from `06-post-job-form.md`
   - Changes: perk fields (value, promo code, terms)

---

## 📝 NOTES

**Existing Pages That Might Need Updates:**
- Home page (`/`) - might need polish but functional
- Dashboard home (`/dashboard`) - exists, might need enhancements
- Pitch Deck pages - already working, documented separately

**Authentication Pages:**
- Login/Register - probably handled by Supabase Auth UI
- Forgot Password - probably handled by Supabase
- Email Verification - probably handled by Supabase

**Pages That Might Already Be Done:**
- Programs listing
- Some dashboard pages

---

**Last Updated:** October 21, 2025
**Next Action:** Create prompts 07-10 (events and perks pages)
