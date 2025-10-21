# Medellin AI - Complete Application Sitemap & Analysis

**Last Updated:** October 20, 2025
**Version:** 1.0
**Platform:** AI-Powered Startup Accelerator

---

## 📊 Executive Summary

Medellin AI is a comprehensive startup acceleration platform connecting founders, investors, and resources in Medellin's AI ecosystem. The platform features:

- **27+ Pages** across public and authenticated areas
- **5 Core Modules**: Community, Resources, Tools, Dashboards, Presentations
- **AI-Powered Features**: Pitch deck generation, startup analysis, conversational wizards
- **Database**: 15+ tables with RLS security
- **User Roles**: Founders, Investors, Community Members

---

## 🗺️ Complete Site Structure

### 🌐 PUBLIC WEBSITE (Unauthenticated)

#### **1. Marketing & Information**
```
/                           Home Page
├── Hero section with CTA
├── Stats (500+ founders, 80+ events, $1M+ credits)
├── Feature highlights
└── Call-to-action sections

/about                      About Page
├── Mission & vision
├── Team information
└── Community impact

/contact                    Contact Page
├── Contact form
├── Office locations
└── Social links
```

#### **2. Discovery & Browse**
```
/founders                   Founders Directory
├── Browse founder profiles
├── Filter by expertise
├── Search functionality
└── → [MISSING] /founders/:id (Founder Profile Detail)

/startups                   Startups Directory
├── Browse all startups
├── Filter by industry/stage
├── Featured startups
└── → [MISSING] /startups/:id (Startup Detail Page)

/events                     Events Listing
├── Upcoming events
├── Past events
├── Event categories
└── → [MISSING] /events/:id (Event Detail Page)

/jobs                       Jobs Board
├── Browse job listings
├── Filter by type/location
├── Company information
└── → [MISSING] /jobs/:id (Job Detail Page)

/perks                      Perks & Deals
├── Available perks ($500K+ value)
├── Partner companies
├── Eligibility requirements
└── → [MISSING] /perks/:id (Perk Detail Page)

/programs                   Programs & Accelerators
├── Accelerator program info
├── Application process
└── Success stories

/blog                       Blog & Resources
├── Articles & insights
├── Success stories
└── Technical content
```

#### **3. Onboarding & Profiles**
```
/auth                       Authentication
├── Login
├── Sign up
├── Password reset
└── OAuth (Google, GitHub)

/startup-profile            Submit Your Startup
├── Startup information form
├── Team details
├── Business model
└── Funding stage

/skills-experience          Skills & Experience
├── Professional background
├── Technical skills
├── Areas of expertise
└── Portfolio links

/profile/:id                Public User Profile
├── User bio
├── Skills & experience
├── Startups & projects
└── Activity feed
```

---

### 🔐 AUTHENTICATED DASHBOARDS

#### **4. Main Dashboard**
```
/dashboard                  Dashboard Home
├── Overview cards
│   ├── Events registered: 3
│   ├── Job applications: 2
│   ├── Saved opportunities: 2
│   └── Pitch decks: 10
├── Quick actions
│   ├── Generate pitch deck
│   ├── Update profile
│   ├── Find mentors
│   └── Join community chat
├── Upcoming events (next 3)
└── Recommended jobs
```

#### **5. Events Dashboard**
```
/dashboard/events           My Events
├── Registered events
├── Attendance history
├── Event calendar
├── Registration status
└── Event reminders
```

#### **6. Jobs Dashboard**
```
/dashboard/jobs             My Jobs & Applications
├── Job applications
│   ├── Status tracking (pending, interview, accepted, rejected)
│   ├── Application timeline
│   └── Cover letter & resume
├── Saved jobs
│   ├── Job bookmarks
│   └── Notes
└── Application analytics
```

#### **7. Perks Dashboard**
```
/dashboard/perks            My Perks & Benefits
├── Claimed perks
├── Available perks
├── Savings tracker ($XXX saved)
├── Perk eligibility
└── Partner offers
```

#### **8. Pitch Decks Dashboard**
```
/dashboard/pitch-decks      My Pitch Decks
├── All presentations
├── Recent presentations
├── Shared presentations
├── Draft presentations
└── Quick actions (new, duplicate, delete)
```

#### **9. Settings & Profile**
```
/dashboard/settings         Account Settings
├── Profile settings
├── Notification preferences
├── Privacy settings
└── Account management

/dashboard/profile          Edit Profile
├── Personal information
├── Professional details
├── Social links
└── Avatar/photo upload
```

---

### 🎯 AI TOOLS & WIZARDS

#### **10. Pitch Deck Generator**
```
/pitch-deck                 Pitch Deck Landing
├── Feature overview
├── Templates showcase
├── Success stories
└── CTA: Start wizard

/pitch-deck-wizard          AI Pitch Deck Wizard
├── Conversational interface
│   ├── AI assistant (Claude)
│   ├── Progress tracker (0-100%)
│   ├── Data collected sidebar
│   └── Message history
├── Information gathering
│   ├── Company name
│   ├── Industry
│   ├── Problem statement
│   ├── Solution
│   ├── Target market
│   └── Business model
└── → Generates presentation → /presentations/:id/outline
```

#### **11. Presentation Editor Suite**
```
/presentations/:id/outline  Outline Editor
├── 10-slide grid view
│   ├── Slide 1: Title/Company
│   ├── Slide 2: Problem
│   ├── Slide 3: Solution
│   ├── Slide 4: Market Size
│   ├── Slide 5: Business Model
│   ├── Slide 6: Traction
│   ├── Slide 7: Team
│   ├── Slide 8: Competition
│   ├── Slide 9: Financials
│   └── Slide 10: Ask/Contact
├── Slide thumbnails
├── Reorder slides (drag & drop)
└── Edit individual slides

/presentations/:id/edit     Slide Editor (Detail)
├── Slide canvas
├── Content editing
├── Layout options
├── Image upload
└── Navigation (prev/next)

/presentations/:id/view     Presentation Viewer
├── Full-screen presentation mode
├── Slide navigation
├── Speaker notes
└── Export options (PDF, PPT)
```

---

## 🗄️ Database Architecture

### **Core Tables (15+)**

```
profiles                    User profiles
├── id (UUID, references auth.users)
├── full_name
├── email
├── avatar_url
├── bio
├── skills
└── created_at

presentations               AI-generated pitch decks
├── id (UUID)
├── profile_id (FK → profiles)
├── title
├── status (draft, published, archived)
├── is_public (boolean)
├── slides (JSONB, 10 slides)
├── metadata (JSONB)
└── created_at

pitch_conversations         Wizard chat history
├── id (UUID)
├── profile_id (FK → profiles)
├── messages (JSONB array)
├── collected_data (JSONB)
├── completeness (0-100)
└── created_at

events                      Community events
├── id (UUID)
├── title
├── description
├── event_date
├── location
├── image_url
└── capacity

registrations               Event sign-ups
├── id (UUID)
├── profile_id (FK → profiles)
├── event_id (FK → events)
├── status (confirmed, attended, cancelled)
└── registered_at

jobs                        Job listings
├── id (UUID)
├── title
├── company
├── description
├── location
├── type (full-time, part-time, contract)
└── posted_at

job_applications            User job applications
├── id (UUID)
├── profile_id (FK → profiles)
├── job_id (FK → jobs)
├── status (pending, interview, accepted, rejected)
├── cover_letter
├── resume_url
└── applied_at

saved_jobs                  Bookmarked jobs
├── id (UUID)
├── profile_id (FK → profiles)
├── job_id (FK → jobs)
└── saved_at

perks                       Partner benefits
├── id (UUID)
├── title
├── description
├── value
├── partner_company
└── eligibility_criteria

startups                    Startup directory
├── id (UUID)
├── profile_id (FK → profiles)
├── name
├── description
├── industry
├── stage
└── website

custom_themes               Presentation themes
├── id (UUID)
├── profile_id (FK → profiles)
├── theme_data (JSONB)
└── created_at

generated_images            AI-generated assets
├── id (UUID)
├── profile_id (FK → profiles)
├── image_url
└── created_at

favorite_presentations      Saved pitch decks
├── id (UUID)
├── profile_id (FK → profiles)
├── presentation_id (FK → presentations)
└── favorited_at
```

---

## 🔄 Key User Journeys

### **Journey 1: New Founder Onboarding**
```
1. Land on homepage → /
2. Click "Join Community" → /auth (sign up)
3. Complete authentication
4. Fill startup profile → /startup-profile
5. Add skills/experience → /skills-experience
6. Dashboard redirect → /dashboard
7. Browse events → /dashboard/events
8. Register for event
9. Explore perks → /dashboard/perks
```

### **Journey 2: Create Pitch Deck**
```
1. Dashboard → /dashboard
2. Click "Generate Pitch Deck" → /pitch-deck-wizard
3. Chat with AI assistant
   ├── Answer: Company name
   ├── Answer: Industry/Problem
   ├── Answer: Solution
   ├── Answer: Target market
   └── Answer: Business model
4. Progress reaches 80%+
5. Click "Generate Deck"
6. AI creates 10-slide presentation
7. Redirect → /presentations/:id/outline
8. Review slide grid
9. Edit individual slides → /presentations/:id/edit
10. Present or export → /presentations/:id/view
```

### **Journey 3: Find & Apply for Jobs**
```
1. Browse jobs → /jobs
2. [MISSING] View job detail → /jobs/:id
3. Click "Apply"
4. Dashboard → /dashboard/jobs
5. Track application status
6. Save interesting jobs
7. View saved jobs in dashboard
```

### **Journey 4: Discover Events**
```
1. Browse events → /events
2. [MISSING] View event detail → /events/:id
3. Register for event
4. Dashboard → /dashboard/events
5. View upcoming events
6. Attend event
7. Status updated to "attended"
```

---

## 🎨 Navigation Structure

### **Main Navbar** (Public)
```
Logo: Medellin AI
├── Home → /
├── Opportunities → /programs
├── Network → /events
├── Resources → /perks
├── Founders → /founders
├── About → /about
└── [CTA] Join Community → /startup-profile
```

### **Dashboard Sidebar** (Authenticated)
```
Main Menu:
├── 🏠 Dashboard → /dashboard
├── 📅 Events → /dashboard/events
├── 💼 Jobs → /dashboard/jobs
├── 🎁 Perks → /dashboard/perks
├── 🚀 Submit Startup → /startup-profile
└── 📊 Pitch Deck → /pitch-deck

Account:
├── ⚙️ Settings → /dashboard/settings
├── 👤 Profile → /dashboard/profile
└── 💬 Support → /contact
```

### **Footer Links** (Site-wide)
```
Quick Links:
├── Founders → /founders
├── Startups → /startups
├── Member Profiles → /profile
├── Events → /events
├── Perks & Deals → /perks
├── Blog → /blog
├── About Us → /about
├── Contact → /contact
├── Submit Startup → /startup-profile
├── Skills & Experience → /skills-experience
└── Quick Pitch Deck → /pitch-deck

Dashboards:
├── My Dashboard → /dashboard
├── My Events → /dashboard/events
├── My Pitch Decks → /dashboard/pitch-decks
├── Jobs Board → /dashboard/jobs
├── Perks → /dashboard/perks
└── Settings → /dashboard/settings

Community:
├── Join WhatsApp
├── Join Slack
├── LinkedIn Group
└── Newsletter
```

---

## 📝 Missing Pages (Gaps Analysis)

### **High Priority - Detail Pages**
1. **Event Detail** (`/events/:id`)
   - Event description, agenda, speakers
   - Registration form
   - Similar events

2. **Job Detail** (`/jobs/:id`)
   - Full job description
   - Requirements & qualifications
   - Company profile
   - Apply button

3. **Dashboard Jobs** (`/dashboard/jobs`)
   - Application tracker
   - Saved jobs list
   - Application status

### **Medium Priority**
4. **Perk Detail** (`/perks/:id`)
   - Detailed benefit info
   - How to claim
   - Eligibility checker

5. **Dashboard Perks** (`/dashboard/perks`)
   - Claimed perks
   - Available perks
   - Savings summary

### **Low Priority**
6. **Startup Detail** (`/startups/:id`)
   - Company profile page
   - Team & traction
   - Pitch deck viewer

7. **Founder Profile** (`/founders/:id`)
   - Detailed bio
   - Portfolio
   - Contact form

---

## 🔐 Security & Permissions

### **Row Level Security (RLS)**
- ✅ **Enabled on ALL tables**
- ✅ Users can only view/edit their own data
- ✅ Public presentations available to all
- ✅ Profile data protected

### **Authentication**
- **Methods:** Email/password, OAuth (Google, GitHub)
- **Session:** Supabase Auth with JWT
- **Protected Routes:** All `/dashboard/*` routes

### **API Security**
- ✅ API keys server-side only (Edge Functions)
- ✅ No secrets in frontend code
- ✅ CORS configured
- ✅ Rate limiting on AI endpoints

---

## 🚀 Features & Capabilities

### **AI-Powered Features**
1. **Pitch Deck Wizard**
   - Conversational AI (Claude)
   - Progressive information gathering
   - Real-time completeness tracking
   - Auto-generates 10-slide deck

2. **Smart Analysis**
   - Startup evaluation
   - Market analysis
   - Competitive positioning

3. **Content Generation**
   - Slide content creation
   - Business model suggestions
   - Market size estimates

### **Community Features**
1. **Events Management**
   - Event discovery
   - Registration tracking
   - Attendance history

2. **Networking**
   - Founder directory
   - Startup profiles
   - Member connections

3. **Resource Access**
   - $500K+ in perks
   - Partner deals
   - Exclusive benefits

### **Job Matching**
1. **Job Board**
   - Curated listings
   - Application tracking
   - Saved jobs

2. **Application Management**
   - Status tracking
   - Document uploads
   - Application history

---

## 📊 Platform Statistics

**Current Scale:**
- 500+ Founders
- 80+ Events
- 50+ Perks
- $1M+ in Credits
- 10 Slides per AI-generated deck

**Pages by Category:**
- Public: 15 pages
- Dashboard: 6 pages
- Presentation Tools: 3 pages
- Auth/Profile: 3 pages
- **Total:** 27+ pages

**Database:**
- 15+ Tables
- 100% RLS Coverage
- JSONB for flexible data
- Optimized indexes

---

## 🎯 Recommended Next Steps

### **Phase 1: Complete Core Detail Pages** (2-3 days)
1. Event Detail (`/events/:id`)
2. Job Detail (`/jobs/:id`)
3. Dashboard Jobs (`/dashboard/jobs`)

### **Phase 2: Enhanced Dashboards** (2-3 days)
4. Perk Detail (`/perks/:id`)
5. Dashboard Perks (`/dashboard/perks`)

### **Phase 3: Extended Profiles** (Optional)
6. Startup Detail (`/startups/:id`)
7. Founder Profile (`/founders/:id`)

### **Phase 4: Advanced Features** (Future)
8. Admin dashboard
9. Analytics & reporting
10. Email notifications
11. Search functionality
12. Filtering & sorting

---

## 📐 Technical Architecture

```
Frontend:
├── React 18 + TypeScript
├── Vite (build tool)
├── React Router v6
├── Tailwind CSS
├── shadcn/ui components
└── React Query (data fetching)

Backend:
├── Supabase (PostgreSQL)
├── Row Level Security (RLS)
├── Edge Functions (Deno)
└── Real-time subscriptions

AI Integration:
├── OpenAI API (GPT-4o-mini)
├── Claude API (Anthropic)
└── Secure proxy via Edge Functions

Authentication:
├── Supabase Auth
├── JWT tokens
├── OAuth providers
└── Session management
```

---

## 📱 Responsive Design

All pages support:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1920px+)

---

## 🔗 External Integrations

- WhatsApp Community
- Slack Workspace
- LinkedIn Group
- Twitter/X
- GitHub
- Newsletter (planned)

---

**Document Version:** 1.0
**Last Updated:** October 20, 2025
**Maintained By:** Medellin AI Development Team
**Next Review:** November 20, 2025

---

## 📎 Quick Reference Links

- **Live Site:** (deployment URL)
- **GitHub:** (repository URL)
- **Design System:** shadcn/ui + Tailwind CSS
- **Database:** Supabase (dhesktsqhcxhqfjypulk)
- **Documentation:** /docs/

---

*This sitemap is a living document and will be updated as the platform evolves.* the sitemap is confusing is it correct does it use best practices identify any errrors or red flags keep it simple