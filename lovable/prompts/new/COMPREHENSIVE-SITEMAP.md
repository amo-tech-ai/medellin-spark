# Comprehensive Site Map - Medellín AI Hub
**Last Updated:** October 23, 2025  
**Site:** https://medellin-spark.lovable.app/

---

## 📊 Visual Sitemap

```
Medellín AI Hub (/)
│
├── 🏠 PUBLIC PAGES
│   ├── Home (/)
│   ├── About (/about)
│   ├── Contact (/contact)
│   └── Auth (/auth)
│
├── 🎯 OPPORTUNITIES
│   ├── Events (/events)
│   │   └── Event Detail (/events/:id)
│   ├── Jobs (/jobs)
│   │   └── Job Detail (/jobs/:id)
│   ├── Perks (/perks)
│   │   └── Perk Detail (/perks/:id)
│   └── Programs (/programs)
│
├── 👥 COMMUNITY
│   ├── Startups (/startups)
│   ├── Founders (/founders)
│   ├── Blog (/blog)
│   └── Profile (/profile/:id?)
│
├── 🚀 ONBOARDING
│   ├── Startup Profile (/startup-profile)
│   └── Skills & Experience (/skills-experience)
│
├── 📊 DASHBOARD (Authenticated)
│   ├── Dashboard Home (/dashboard)
│   ├── Events Dashboard (/dashboard/events)
│   ├── Jobs Dashboard (/dashboard/jobs)
│   ├── Pitch Decks (/dashboard/pitch-decks)
│   └── Settings (/dashboard/settings)
│
├── 🎨 PITCH DECK WIZARD
│   ├── Pitch Deck Home (/pitch-deck)
│   ├── Wizard Flow (/pitch-deck-wizard)
│   └── Presentation Editor
│       ├── Outline Editor (/presentations/:id/outline)
│       ├── Slide Editor (/presentations/:id/edit)
│       └── Viewer (/presentations/:id/view)
│
└── ❌ ERROR PAGES
    └── 404 Not Found (/*)
```

---

## 🎯 Detailed Page Hierarchy

### 1. PUBLIC PAGES (Marketing & Information)

#### 1.1 Home (/)
- **Purpose:** Primary landing page, conversion funnel
- **Key Sections:**
  - Hero: "Build. Connect. Grow."
  - Stats: 500+ Founders, 80+ Events, 50+ Perks, $1M+ Credits
  - Choose Your Path: Submit Startup, Join Community, AI Events, AI Projects
  - Features: Accelerator, Community, Perks, Growth Support
  - CTA: Join 500+ founders
- **Navigation:** Top navbar + Mobile bottom nav
- **Primary CTAs:** 
  - "Join the Community" → `/startup-profile`
  - "Explore Opportunities" → `/perks`

#### 1.2 About (/about)
- **Purpose:** Mission, vision, team, history
- **Recommended Sections:**
  - Our Story
  - Mission & Vision
  - Team Members
  - Timeline/Milestones
  - Statistics & Impact
  - Partner Organizations

#### 1.3 Contact (/contact)
- **Purpose:** Support, inquiries, feedback
- **Recommended Sections:**
  - Contact Form
  - Office Location (Medellín)
  - Email/Phone
  - Social Media Links
  - FAQ Section

#### 1.4 Auth (/auth)
- **Purpose:** Login/signup
- **Features:**
  - Email/Password
  - Social Auth (Google, LinkedIn)
  - Password Recovery
  - Email Verification

---

### 2. OPPORTUNITIES (Discovery & Exploration)

#### 2.1 Events (/events)
- **Purpose:** Browse upcoming AI events
- **Layout:** Grid of event cards
- **Filters:** Date, Category, Location, Type
- **Search:** Full-text search
- **Sort:** Date, Popularity, Registration Status
- **Card Info:** Title, Date, Location, Organizer, Registration Status

#### 2.2 Event Detail (/events/:id)
- **Purpose:** Complete event information
- **Sections:**
  - Hero Banner with Image
  - Title, Date, Time, Location
  - Event Description (Rich Text)
  - Organizer Information
  - Agenda/Schedule
  - Speakers/Facilitators
  - Registration CTA
  - Social Sharing
  - Similar Events
- **Actions:** Register, Save, Share, Add to Calendar

#### 2.3 Jobs (/jobs)
- **Purpose:** Browse AI/tech job opportunities
- **Layout:** List/Grid view toggle
- **Filters:** 
  - Job Type (Full-time, Part-time, Remote, Contract)
  - Location
  - Salary Range
  - Experience Level
  - Company
- **Search:** Full-text search
- **Card Info:** Title, Company, Location, Salary, Type, Posted Date

#### 2.4 Job Detail (/jobs/:id)
- **Purpose:** Complete job posting
- **Sections:**
  - Company Header (Logo, Name)
  - Job Title & Type Badges
  - Salary Range & Location
  - Job Description
  - Requirements (Bullets)
  - Responsibilities (Bullets)
  - Company Info Sidebar
  - Apply CTA
  - Similar Jobs
- **Actions:** Apply, Save/Bookmark, Share

#### 2.5 Perks (/perks)
- **Purpose:** Browse exclusive startup perks
- **Layout:** Grid of perk cards
- **Filters:** Category (SaaS, Cloud, Marketing, Legal, etc.)
- **Search:** Full-text search
- **Sort:** Value, Popularity, Recently Added
- **Card Info:** Title, Provider, Value, Category

#### 2.6 Perk Detail (/perks/:id)
- **Purpose:** Complete perk information
- **Sections:**
  - Perk Banner/Logo
  - Title & Category Badge
  - Value/Savings Amount (Highlighted)
  - Description (What You Get)
  - How to Redeem
  - Terms & Conditions
  - Provider Information
  - Redeem CTA/Promo Code
  - More Perks
- **Actions:** Redeem, Save, Share

#### 2.7 Programs (/programs)
- **Purpose:** Accelerator programs, courses, cohorts
- **Recommended Sections:**
  - Program Listings
  - Eligibility Criteria
  - Application Deadlines
  - Success Stories
  - Apply CTA

---

### 3. COMMUNITY (Connect & Network)

#### 3.1 Startups (/startups)
- **Purpose:** Browse all startups in ecosystem
- **Layout:** Grid of startup cards
- **Filters:** Stage, Industry, Founded Date, Location
- **Search:** Name, Description
- **Card Info:** Logo, Name, Tagline, Stage, Team Size

#### 3.2 Founders (/founders)
- **Purpose:** Browse founder profiles
- **Layout:** Grid of founder cards
- **Filters:** Expertise, Industry, Location
- **Search:** Name, Skills
- **Card Info:** Photo, Name, Current Startup, Expertise

#### 3.3 Blog (/blog)
- **Purpose:** Articles, news, insights
- **Layout:** Blog post grid
- **Filters:** Category, Author, Date
- **Search:** Full-text search
- **Card Info:** Featured Image, Title, Excerpt, Author, Date, Read Time

#### 3.4 Profile (/profile/:id?)
- **Purpose:** View user/founder profile
- **Sections:**
  - Profile Photo & Name
  - Bio/Background
  - Current Role/Startup
  - Past Experience
  - Skills & Expertise
  - Social Links
  - Activity Feed
  - Contact CTA

---

### 4. ONBOARDING (User/Startup Registration)

#### 4.1 Startup Profile (/startup-profile)
- **Purpose:** Submit startup for listing
- **Form Sections:**
  - Basic Info (Name, Logo, Tagline)
  - Description
  - Stage (Idea, MVP, Growth, etc.)
  - Industry/Category
  - Team Size
  - Founded Date
  - Website & Social Links
  - Pitch Deck Upload (Optional)
  - Funding Status
- **Flow:** Multi-step form → Dashboard
- **CTA:** Submit for Review

#### 4.2 Skills & Experience (/skills-experience)
- **Purpose:** Complete founder profile
- **Form Sections:**
  - Professional Background
  - Technical Skills
  - Industry Expertise
  - Past Companies/Projects
  - Education
  - Languages
  - Interests
- **Flow:** Profile completion → Dashboard
- **CTA:** Save & Continue

---

### 5. DASHBOARD (Authenticated User Hub)

**Layout:** Sidebar navigation (collapsible) + Main content area  
**Access:** Protected routes (requires authentication)  
**Mobile:** Bottom navigation bar

#### 5.1 Dashboard Home (/dashboard)
- **Purpose:** Central hub for user activity
- **Sections:**
  - Welcome Banner (Personalized)
  - Quick Actions (4 cards):
    - Create Pitch Deck
    - Browse Events
    - Apply to Jobs
    - Claim Perks
  - Key Metrics (4 cards):
    - Events Registered: X
    - Jobs Applied: X
    - Perks Claimed: X
    - Profile Completion: X%
  - Recent Activity Feed
  - Upcoming Events Widget
  - Application Status Summary
  - Recommended Resources
- **Sidebar Items:**
  - 🏠 Dashboard
  - 📅 Events
  - 💼 Jobs
  - 🎁 Perks
  - 🚀 Pitch Decks
  - ⚙️ Settings
  - 👤 Profile
  - 💬 Support

#### 5.2 Events Dashboard (/dashboard/events)
- **Purpose:** Manage event registrations
- **Sections:**
  - Metrics (4 cards):
    - Registered: X
    - Attended: X
    - Upcoming: X
    - Completed: X
  - Events List (Tabs):
    - Upcoming
    - Past
    - Saved
  - Event Cards with Actions:
    - View Details
    - Add to Calendar
    - Cancel Registration
    - Mark as Attended
  - Filters: Date Range, Category, Location
- **Empty State:** No events registered → Browse Events CTA

#### 5.3 Jobs Dashboard (/dashboard/jobs)
- **Purpose:** Track job applications
- **Sections:**
  - Metrics (4 cards):
    - Total Applications: X
    - Active: X
    - Interviews: X
    - Saved Jobs: X
  - Jobs List (Tabs):
    - Applied
    - Saved
    - Interviews
    - Rejected/Closed
  - Job Cards with Status:
    - Application Date
    - Status Badge
    - Company Info
    - Actions (View, Withdraw, Update)
  - Filters: Status, Date, Company, Job Type
- **Empty State:** No applications → Browse Jobs CTA

#### 5.4 Pitch Decks Dashboard (/dashboard/pitch-decks)
- **Purpose:** Manage pitch deck presentations
- **Sections:**
  - Metrics (4 cards):
    - Total Decks: X
    - In Progress: X
    - Published: X
    - Views: X
  - Presentation List (Grid/List):
    - Thumbnail Preview
    - Title
    - Status (Draft, Published)
    - Last Edited
    - Slide Count
    - Actions (Edit, View, Share, Delete)
  - Create New Deck CTA (Prominent)
  - Templates Section
- **Actions:**
  - Create New → `/pitch-deck-wizard`
  - Edit → `/presentations/:id/outline` or `/presentations/:id/edit`
  - View → `/presentations/:id/view`
  - Share → Generate link
  - Delete → Confirmation modal

#### 5.5 Settings Dashboard (/dashboard/settings)
- **Purpose:** Account management
- **Sections:**
  - Profile Settings:
    - Name, Email, Avatar
    - Bio
    - Social Links
  - Password Change
  - Notification Preferences:
    - Email Notifications
    - Event Reminders
    - Job Alerts
    - Newsletter
  - Privacy Settings:
    - Profile Visibility
    - Activity Visibility
  - Account Management:
    - Delete Account
    - Export Data
- **Save Changes CTA:** Top-right sticky button

---

### 6. PITCH DECK WIZARD (AI-Powered Presentation Builder)

**Purpose:** Step-by-step AI-assisted pitch deck creation  
**Technology:** AI-powered content generation, drag-drop editor

#### 6.1 Pitch Deck Home (/pitch-deck)
- **Purpose:** Overview and entry point
- **Sections:**
  - Hero: "Create Your Perfect Pitch Deck with AI"
  - Features Overview:
    - AI Content Generation
    - Professional Templates
    - Drag & Drop Editor
    - Export Options
  - How It Works (3 Steps):
    1. Answer Questions
    2. AI Generates Content
    3. Edit & Customize
  - Templates Gallery
  - Success Stories/Examples
  - Start Wizard CTA → `/pitch-deck-wizard`
- **Alternative Entry:** Dashboard → Create New Deck

#### 6.2 Wizard Flow (/pitch-deck-wizard)
- **Purpose:** AI conversation to gather information
- **Layout:** Chat interface (conversational UI)
- **Progress:** Step indicator at top (1/10)
- **Flow:**
  1. Company Name
  2. Problem Statement
  3. Solution
  4. Market Size
  5. Business Model
  6. Traction/Metrics
  7. Competition
  8. Team
  9. Funding Ask
  10. Timeline/Use of Funds
- **Features:**
  - AI Suggestions (Smart prompts)
  - Save Draft (Auto-save every 30s)
  - Previous/Next Navigation
  - Skip Step Option
  - Exit to Dashboard (with save prompt)
- **Completion:** → `/presentations/:id/outline`

#### 6.3 Outline Editor (/presentations/:id/outline)
- **Purpose:** Review and edit presentation structure
- **Layout:** Split view (Outline left, Preview right)
- **Sections:**
  - **Left Sidebar (30%):**
    - Slide List (Draggable, Reorderable)
    - Slide Thumbnails
    - Add/Remove Slides
    - Duplicate Slide
  - **Main Area (70%):**
    - Slide Title (Editable)
    - Slide Content (Editable)
    - AI Regenerate Button
    - Notes Section
- **Top Actions:**
  - Save Draft
  - Go to Editor → `/presentations/:id/edit`
  - Back to Dashboard
- **Progress:** "Outline Complete" indicator
- **Mobile:** Single column, tab between outline/preview

#### 6.4 Slide Editor (/presentations/:id/edit)
- **Purpose:** Full presentation editor
- **Layout:** Thumbnail panel left, Canvas center, Properties right
- **Sections:**
  - **Left Thumbnail Panel (15%):**
    - All Slides (Vertical)
    - Drag to Reorder
    - Duplicate/Delete
    - Add New Slide
  - **Center Canvas (60%):**
    - Live Slide Preview
    - Editable Text Boxes
    - Image Upload
    - Drag & Drop Elements
    - Zoom Controls
  - **Right Properties Panel (25%):**
    - Text Formatting
    - Color Picker
    - Alignment Tools
    - Background Options
    - Animation Settings
- **Top Toolbar:**
  - Undo/Redo
  - Save (Auto-save indicator)
  - Theme Selector
  - Preview → `/presentations/:id/view`
  - Export (PDF, PPTX)
  - Share Link
  - Back to Outline
- **Bottom Status Bar:**
  - Slide X of Y
  - Last Saved: timestamp
  - Collaborators (if any)
- **Keyboard Shortcuts:** Display on hover or Help icon
- **Mobile:** Limited editing, View-only recommended

#### 6.5 Presentation Viewer (/presentations/:id/view)
- **Purpose:** Present/share pitch deck
- **Layout:** Fullscreen slide viewer
- **Features:**
  - Full-screen Mode (F11)
  - Slide Navigation (Arrow keys, Click)
  - Slide Counter (Bottom-right)
  - Exit/Close (Top-right)
  - Notes View (Presenter mode)
  - Timer (Optional)
  - Share Link (Public/Private)
- **Controls:**
  - Previous/Next Arrows
  - Slide Thumbnails (Optional sidebar)
  - Zoom In/Out
  - Print
  - Download PDF
- **Public Access:** Shareable link (if is_public=true)
- **Mobile:** Swipe navigation, Pinch to zoom

---

### 7. ERROR PAGES

#### 7.1 404 Not Found (/*)
- **Purpose:** Handle invalid URLs
- **Sections:**
  - 404 Illustration/Animation
  - "Page Not Found" Message
  - Search Bar
  - Popular Links:
    - Home
    - Dashboard
    - Events
    - Jobs
    - Perks
  - "Go Home" Button

---

## 🔗 Navigation Structure

### Primary Navigation (Desktop Header)
```
[Logo] Medellín AI

Home | Opportunities ▼ | Network ▼ | Resources ▼ | Jobs | Founders | About | [Join Community]
```

**Dropdown Menus:**

**Opportunities ▼**
- Events
- Jobs
- Perks
- Programs

**Network ▼**
- Startups
- Founders
- Blog
- Community

**Resources ▼**
- Pitch Deck Wizard
- Dashboard (if authenticated)
- About
- Contact

### Mobile Navigation (Bottom Bar)
```
[Home] [Events] [Jobs] [Dashboard] [Profile]
```

### Dashboard Sidebar (Authenticated)
```
┌────────────────────┐
│ [Logo] Medellín AI │
├────────────────────┤
│ 🏠 Dashboard       │ /dashboard
│ 📅 Events          │ /dashboard/events
│ 💼 Jobs            │ /dashboard/jobs
│ 🎁 Perks           │ (future)
│ 🚀 Pitch Decks     │ /dashboard/pitch-decks
├────────────────────┤
│ ⚙️ Settings        │ /dashboard/settings
│ 👤 Profile         │ /profile
│ 💬 Support         │ /contact
└────────────────────┘
```

---

## 🎨 URL Patterns & Naming Conventions

### Best Practices ✅

1. **Consistent Kebab-Case:**
   - ✅ `/pitch-deck-wizard`
   - ✅ `/startup-profile`
   - ✅ `/skills-experience`

2. **Logical Nesting:**
   - ✅ `/dashboard/events`
   - ✅ `/dashboard/jobs`
   - ✅ `/presentations/:id/edit`

3. **RESTful Resource IDs:**
   - ✅ `/events/:id`
   - ✅ `/jobs/:id`
   - ✅ `/perks/:id`

4. **Action Verbs for Forms:**
   - ✅ `/post-job` (future)
   - ✅ `/post-event` (future)
   - ✅ `/submit-perk` (future)

5. **Plural Nouns for Collections:**
   - ✅ `/events` (list)
   - ✅ `/jobs` (list)
   - ✅ `/startups` (list)

### Recommended Additions

**Future Routes to Add:**
- `/dashboard/perks` - Perks dashboard
- `/post-job` - Post new job form
- `/post-event` - Post new event form
- `/post-perk` - Submit new perk form
- `/startups/:id` - Startup detail page
- `/founders/:id` - Founder profile detail
- `/blog/:slug` - Blog post detail

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Bottom navigation (Home, Events, Jobs, Dashboard, Profile)
- Hamburger menu for secondary pages
- Single column layouts
- Swipeable carousels
- Touch-optimized buttons (44px min)

### Tablet (768px - 1024px)
- Collapsible sidebar drawer
- 2-column grids
- Compact header
- Touch-optimized

### Desktop (> 1024px)
- Persistent sidebar (240px width)
- 3-4 column grids
- Full-width charts
- Hover interactions
- Keyboard shortcuts

---

## 🔐 Access Control

### Public Pages (No Auth Required)
- Home, About, Contact
- Events, Jobs, Perks (listings)
- Event Detail, Job Detail, Perk Detail
- Blog, Startups, Founders (listings)
- Auth (login/signup)

### Protected Pages (Auth Required)
- `/dashboard/*` - All dashboard pages
- `/profile/edit` - Edit own profile
- `/pitch-deck-wizard` - Create pitch deck
- `/presentations/:id/*` - Edit presentations (owner only)

### Public but Enhanced with Auth
- `/presentations/:id/view` - Public viewing, enhanced features if authenticated

---

## 🚀 Scalability Considerations

### Future Page Categories

**Phase 2 - Community Features:**
- `/community` - Member directory
- `/messages` - Direct messaging
- `/notifications` - Notification center
- `/blog/:slug` - Individual blog posts

**Phase 3 - Admin/Management:**
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/approvals` - Content moderation
- `/admin/analytics` - Platform analytics

**Phase 4 - Enhanced Features:**
- `/mentorship` - Mentor matching
- `/funding` - Funding opportunities
- `/resources/library` - Resource library
- `/courses` - Learning platform

---

## 📈 User Flows

### New Founder Journey
1. Land on Home (/)
2. Click "Join the Community"
3. → Auth (/auth) - Signup
4. → Startup Profile (/startup-profile) - Onboarding
5. → Skills & Experience (/skills-experience) - Complete profile
6. → Dashboard (/dashboard) - Welcome screen
7. → Explore opportunities (Events, Jobs, Perks)
8. → Create Pitch Deck (/pitch-deck-wizard)
9. → Edit & Present (/presentations/:id/edit)

### Returning User Journey
1. Land on Home (/) or Dashboard (/dashboard)
2. Browse recent updates in Dashboard
3. Quick actions:
   - Register for Event → /events → /events/:id
   - Apply to Job → /jobs → /jobs/:id
   - Claim Perk → /perks → /perks/:id
   - Edit Pitch Deck → /dashboard/pitch-decks → /presentations/:id/edit

### Job Seeker Flow
1. Land on Home (/)
2. Navigate to Jobs (/jobs)
3. Search/Filter
4. View Job Detail (/jobs/:id)
5. Click Apply → Auth (if not logged in)
6. → Dashboard (/dashboard/jobs) - Track application

### Event Attendee Flow
1. Browse Events (/events)
2. View Event Detail (/events/:id)
3. Register → Auth (if not logged in)
4. → Dashboard (/dashboard/events) - Manage registrations
5. Add to Calendar
6. Attend Event
7. Post-event: Mark as Attended

### Pitch Deck Creator Flow
1. Dashboard → "Create Pitch Deck"
2. → Pitch Deck Wizard (/pitch-deck-wizard)
3. AI Conversation (10 steps)
4. → Outline Editor (/presentations/:id/outline)
5. Review structure, edit content
6. → Slide Editor (/presentations/:id/edit)
7. Customize design, add visuals
8. → Viewer (/presentations/:id/view)
9. Present or Share link
10. Export PDF/PPTX

---

## 📊 Page Priority Matrix

### Tier 1 - Critical (Launch Blockers)
- ✅ Home
- ✅ Auth
- ✅ Dashboard
- ✅ Events (List & Detail)
- ✅ Jobs (List & Detail)
- ✅ Perks (List & Detail)
- ✅ Pitch Deck Wizard
- ✅ Presentation Editor

### Tier 2 - High Priority (Post-Launch Week 1)
- Dashboard/Events
- Dashboard/Jobs
- Dashboard/Pitch Decks
- Settings
- Profile (View & Edit)

### Tier 3 - Medium Priority (Month 1)
- Startups (List & Detail)
- Founders (List & Detail)
- Blog (List & Detail)
- Post Job Form
- Post Event Form

### Tier 4 - Nice to Have (Month 2-3)
- Admin Dashboard
- Messaging
- Notifications
- Community Directory
- Advanced Analytics

---

## 🎯 Success Metrics by Page

### Home Page
- Conversion Rate: 15%+ to signup/explore
- Bounce Rate: < 40%
- Time on Page: > 2 minutes

### Dashboard
- Daily Active Users: Track
- Feature Usage: Events, Jobs, Pitch Decks
- Session Duration: > 5 minutes

### Pitch Deck Wizard
- Completion Rate: > 70%
- Average Completion Time: 15-20 minutes
- Deck Creation Rate: 2+ per user

### Events/Jobs/Perks
- Click-Through Rate: > 10%
- Application/Registration Rate: > 5%
- Search Usage: > 50% of visits

---

**Next Document:** See `DASHBOARD-STRUCTURE-RECOMMENDATIONS.md` for detailed dashboard layout and navigation plan.

**Next Document:** See `WIZARD-FLOW-RECOMMENDATIONS.md` for detailed pitch deck wizard structure and UX patterns.
