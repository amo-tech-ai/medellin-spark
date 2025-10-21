# Medellin AI Hub - MVP Focused Lovable Prompt

## Project Overview

**What We're Building:** Medellin AI Hub - An AI-powered startup accelerator platform that helps entrepreneurs in Medellin, Colombia get matched with resources, perks, and opportunities through an intelligent onboarding wizard.

**Primary Goal:** Create a clean, modern platform where startup founders can:
1. Complete a 10-stage onboarding wizard
2. Get AI-powered startup analysis
3. Receive matched perks and resources
4. Generate professional pitch decks
5. Access a dashboard to manage their startup journey

**Design Style:** Minimal, clean, modern with orange/grey/white color palette

---

## Complete Site Structure (Sitemap)

### Core Pages (What to Build First)

#### 1. Public Website
```
Home (/)
├── Hero: Welcome to Medellin AI Hub
├── Features: What we offer
├── CTA: Start Your Journey
└── Footer: Links, social, contact

About (/about)
├── Mission & Vision
├── Our Team
└── Why Medellin

Events (/events)
├── Event Grid with Filters
└── Event Detail (/events/:slug)

Blog (/blog)
├── Article Listing
└── Blog Post (/blog/:slug)

Jobs (/jobs)
├── Job Marketplace
└── Job Detail (/jobs/:id)

Perks (/perks)
├── Perk Directory
└── Perk Detail (/perks/:id)

Contact (/contact)
└── Contact Form
```

#### 2. Authentication
```
Auth (/auth)
├── Login
├── Sign Up
├── Google OAuth
└── GitHub OAuth

Onboarding (/onboarding)
└── Welcome & Initial Setup
```

#### 3. User Dashboard (Authenticated)
```
Dashboard (/dashboard)
├── Overview Cards (metrics)
├── Upcoming Events
├── Job Matches
├── Claimed Perks
└── Activity Feed

Dashboard Sections:
├── /dashboard/events (My Events)
├── /dashboard/jobs (Posted Jobs)
├── /dashboard/jobs/:jobId/applicants
└── /dashboard/perks (Claimed Perks)

Settings:
├── /settings (Account Settings)
└── /settings/profile (Edit Profile)
```

#### 4. Startup Wizard (10 Stages)
```
/wizard (Entry Screen - Welcome)

10-Stage Flow:
├── /wizard/stage-1 (Founder Info)
├── /wizard/stage-2 (Product Overview)
├── /wizard/stage-3 (Tech Stack)
├── /wizard/stage-4 (Evidence & Metrics)
├── /wizard/stage-5 (Team & Traction)
├── /wizard/stage-6 (Growth Goals)
├── /wizard/stage-7 (AI Analysis) ⭐ AI Processing
├── /wizard/stage-8 (Perk Matching) ⭐ AI Matching
├── /wizard/stage-9 (Pitch Deck) ⭐ AI Generation
└── /wizard/stage-10 (Completion)
```

#### 5. Pitch Deck Creator (Standalone)
```
/pitch-deck-creator
├── Deck Input Form
├── Slide Editor (with rich text)
├── Theme Selector
├── Slide Preview
├── Export to PowerPoint
└── Presentation Mode
```

#### 6. Admin Panel (Admin Only)
```
/admin (Admin Dashboard)
├── /admin/users
├── /admin/posts
├── /admin/events
├── /admin/jobs
├── /admin/contacts
├── /admin/newsletter
├── /admin/audit-logs
└── /admin/settings
```

---

## Design System

### Colors (HSL Values)
```css
/* Light Mode */
Primary Orange: hsl(14, 82%, 60%)
Background White: hsl(0, 0%, 100%)
Text Dark: hsl(0, 0%, 9%)
Light Grey: hsl(0, 0%, 91%)
Very Light Grey: hsl(0, 0%, 96%)

/* Dark Mode */
Background Dark: hsl(0, 0%, 9%)
Card Dark: hsl(0, 0%, 12%)
Same Orange Accent: hsl(14, 82%, 60%)
```

### Typography
- **Font Family:** Inter (clean sans-serif)
- **Base Size:** 16px (never smaller)
- **Line Height:** 1.6 for body text
- **Headings:** Bold weight, responsive sizing

### Layout
- **Border Radius:** 0.75rem (12px)
- **Spacing:** 8px base unit
- **Max Width:** 1200px for content
- **Shadows:**
  - Soft: `0 2px 8px rgba(0,0,0,0.05)`
  - Card: `0 4px 16px rgba(0,0,0,0.08)`
  - Hover: `0 12px 40px rgba(242,96,60,0.15)` (orange glow)

### Responsive Breakpoints
- Mobile: < 768px (stack vertically)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

---

## Core Features & Use Cases

### Feature 1: Startup Onboarding Wizard

**Real-World Example:** Sarah, a founder with an AI event management SaaS, wants to join the accelerator.

**User Journey:**
1. Clicks "Start Your Journey" on homepage
2. Signs up with Google (OAuth)
3. Lands on `/wizard` entry screen
4. Sees progress bar: 10 stages
5. **Stage 1:** Enters founder info (name, LinkedIn, role, experience)
6. **Stage 2:** Describes product (startup name, problem, solution, market)
7. **Stage 3:** Selects tech stack (checkboxes: React, Node.js, PostgreSQL, AWS)
8. **Stage 4:** Shares metrics (MVP stage, 500 users, $5K MRR)
9. **Stage 5:** Lists team (3 co-founders, 2 advisors)
10. **Stage 6:** Sets goals (reach 10K users in 6 months, raise $500K seed)
11. **Stage 7:** 🤖 **AI Analysis** - System analyzes all data, shows:
    - Strengths: "Strong technical team, clear market need"
    - Opportunities: "Event tech market growing 25% YoY"
    - Risks: "Competitive landscape, monetization strategy needs clarity"
    - Recommendations: "Focus on user acquisition, refine pricing model"
12. **Stage 8:** 🎁 **Perk Matching** - AI shows matched perks:
    - AWS Activate Credits ($5K)
    - GitHub Pro ($15/mo)
    - Stripe Atlas (incorporation)
    - Each perk card shows "Why recommended: Based on your tech stack and stage"
13. **Stage 9:** 📊 **Pitch Deck** - Auto-generated 10-slide deck:
    - Uses data from all previous stages
    - Shows preview with theme options
    - Can edit each slide
    - Download as PowerPoint
14. **Stage 10:** 🎉 **Completion** - Confetti animation, next steps checklist

**UI/UX Flow:**
```
┌────────────────────────────────────────┐
│ [Exit]              Stage 2/10  [Save] │
│                                        │
│ ━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                        │
│ Product Overview                       │
│ ────────────────                       │
│                                        │
│ Startup Name*                          │
│ [________________________]             │
│                                        │
│ One-liner (max 120 chars)*            │
│ [________________________]             │
│                                        │
│ Industry*                              │
│ [SaaS ▼]                              │
│                                        │
│ Target Market*                         │
│ [________________________]             │
│                                        │
│ Problem Being Solved*                  │
│ [Text area...............]             │
│                                        │
│ Your Solution*                         │
│ [Text area...............]             │
│                                        │
│                [← Previous]  [Next →]  │
│                                        │
│ Auto-saved 2 seconds ago ✓            │
└────────────────────────────────────────┘
```

**Key Components:**
- Progress bar (10 dots, current highlighted in orange)
- Form validation (inline errors, orange outlines)
- Auto-save indicator (subtle text, 30-second intervals)
- Navigation (Previous/Next buttons, orange primary CTA)
- Exit confirmation modal (if user tries to leave)

---

### Feature 2: AI-Powered Pitch Deck Creator

**Real-World Example:** Sarah needs a pitch deck for investor meetings.

**User Journey:**
1. Goes to `/pitch-deck-creator`
2. Enters prompt: "Create a pitch deck for an AI-powered event management platform targeting enterprise clients"
3. Selects options:
   - Number of slides: 10
   - Language: English
   - Include web search: No (MVP)
4. Clicks "Generate Presentation"
5. **AI generates deck in 20 seconds:**
   - 10 slides with titles + content
   - Cover, Problem, Solution, Market, Product, Team, Traction, Business Model, Ask, Contact
6. **Slide list appears on left:**
   - Numbered thumbnails
   - Click to select/edit
7. **Center panel shows active slide:**
   - Live preview with theme applied
   - Rich text editor for content
   - Markdown support
8. **Theme selector at top:**
   - 5 themes: Professional, Modern, Bold, Gradient, Classic
   - Click to apply, preview updates instantly
9. **Actions:**
   - Save Draft → persists to database
   - Export PowerPoint → downloads .pptx file
   - Present → fullscreen mode with navigation
   - Share → generate link (future)

**UI/UX Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Pitch Deck Creator    [Theme ▼] [Save] [Export] │
├──────────┬──────────────────────────────────────────────┤
│ Slides   │ Slide Preview                                │
│          │                                              │
│ 1. Cover │  ┌────────────────────────────────────────┐ │
│ 2. Problem│  │                                        │ │
│ 3. Solution│ │    [Company Logo]                     │ │
│ 4. Market ● │ │                                        │ │
│ 5. Product│  │    EventAI                            │ │
│ 6. Team  │  │    AI-Powered Event Management         │ │
│ 7. Traction│ │                                        │ │
│ 8. Business│ │    [Background Image]                 │ │
│ 9. Ask   │  │                                        │ │
│10. Contact│  └────────────────────────────────────────┘ │
│          │                                              │
│ [+ Add]  │  Editor Toolbar:                            │
│          │  [B I U] [•] [1.] [Link] [Image]           │
│          │                                              │
│          │  # Problem                                   │
│          │  - Event planning is time-consuming          │
│          │  - Manual coordination leads to errors       │
│          │  - No real-time visibility                   │
│          │                                              │
│          │                      [Present] [Export PPTX] │
└──────────┴──────────────────────────────────────────────┘
```

**Key Components:**
- Slide navigator (left sidebar, scrollable, drag-to-reorder future)
- Live preview (center, themed, responsive)
- Rich text editor (Plate.js, formatting toolbar)
- Theme selector (dropdown with preview thumbnails)
- Action buttons (Save: auto every 30s, Export: downloads file, Present: fullscreen)

**Presentation Mode:**
```
┌─────────────────────────────────────────────────────────┐
│                                                   [X] Esc│
│                                                          │
│                                                          │
│              ┌──────────────────────────┐               │
│              │                          │               │
│              │      Full Slide          │               │
│              │      Content Here        │               │
│              │                          │               │
│              │      • Bullet 1          │               │
│              │      • Bullet 2          │               │
│              │      • Bullet 3          │               │
│              │                          │               │
│              └──────────────────────────┘               │
│                                                          │
│  [←]                   4 / 10                      [→]  │
│                                                          │
│  Speaker Notes:                                         │
│  Talk about the market opportunity...                   │
└─────────────────────────────────────────────────────────┘
```

---

### Feature 3: User Dashboard

**Real-World Example:** Sarah logs in daily to check progress, new jobs, and perk updates.

**User Journey:**
1. Logs in → redirected to `/dashboard`
2. Sees personalized greeting: "Welcome back, Sarah! 👋"
3. Overview cards show:
   - Events Registered: 3
   - Job Applications: 2
   - Perks Claimed: 5
4. **Upcoming Events section:**
   - Card grid: 3 event cards
   - Each card: Image, title, date, location
   - "View All →" link to `/dashboard/events`
5. **Job Matches section:**
   - 5 new jobs matching her profile
   - "Frontend Engineer - Remote" ($80K-$120K)
   - Click to view details
6. **New Perks Available:**
   - 2 new perks she qualifies for
   - "Claim Now" button
7. **Community Activity Feed:**
   - Recent posts from other founders
   - Like, comment, share

**UI/UX Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] [Search...]     [🔔 3] [Profile Sarah ▼]        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Welcome back, Sarah! 👋                                │
│                                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                  │
│  │ Events  │ │  Jobs   │ │ Perks   │                  │
│  │   12    │ │    5    │ │    8    │                  │
│  └─────────┘ └─────────┘ └─────────┘                  │
│                                                          │
│  📅 Upcoming Events (3)              [View All →]       │
│  ──────────────────────────────────────────────         │
│  ┌────────┐ ┌────────┐ ┌────────┐                     │
│  │[Image] │ │[Image] │ │[Image] │                     │
│  │ Title  │ │ Title  │ │ Title  │                     │
│  │ May 15 │ │ May 20 │ │ Jun 1  │                     │
│  └────────┘ └────────┘ └────────┘                     │
│                                                          │
│  💼 Job Matches (5)                  [View All →]       │
│  ──────────────────────────────────────────────         │
│  ┌─────────────────────────────────────────┐           │
│  │ Frontend Engineer - Remote              │           │
│  │ TechCorp • $80K-$120K • Full-time      │           │
│  │ React, TypeScript, Node.js    [Apply]  │           │
│  └─────────────────────────────────────────┘           │
│  [+ 4 more jobs]                                        │
│                                                          │
│  🎁 New Perks Available              [Browse All →]    │
│  ──────────────────────────────────────────────         │
│  ┌──────────┐ ┌──────────┐                            │
│  │ AWS      │ │ GitHub   │                            │
│  │ $5K      │ │ Pro Free │                            │
│  │[Claim]   │ │[Claim]   │                            │
│  └──────────┘ └──────────┘                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Key Components:**
- Top navigation (persistent, logo left, search center, notifications/profile right)
- Metric cards (white, shadow, centered numbers, orange accents)
- Section headers (with "View All" links)
- Card grids (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- Empty states ("No events yet" with CTA to create)

---

### Feature 4: AI Chat Assistant

**Real-World Example:** Sarah has a question about claiming a perk while on Stage 8 of the wizard.

**User Journey:**
1. Floating chat button visible bottom-right (orange gradient, pulse animation)
2. Clicks button → chat window opens (400px × 600px)
3. AI greets: "Hi Sarah! I see you're viewing AWS credits. How can I help?"
4. Sarah types: "How do I claim this perk?"
5. AI responds:
   - "To claim AWS Activate credits, follow these steps:"
   - "1. Click 'Claim Perk' button"
   - "2. Fill out AWS application form"
   - "3. Our team reviews within 24 hours"
   - "4. You'll receive activation code via email"
6. AI suggests: "Would you like me to start the claim process now?"
7. Sarah clicks "Yes" → AI opens claim modal

**UI/UX Layout:**
```
Floating Button (bottom-right):
┌─────┐
│ 💬  │ ← Orange gradient, 60px circle
│  3  │ ← Badge for unread messages
└─────┘

Chat Window (opened):
┌───────────────────────────────────────┐
│ 💬 AI Assistant        [_] [X]        │
├───────────────────────────────────────┤
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ Hi Sarah! I see you're viewing  │ │
│  │ AWS credits. How can I help?    │ │
│  └─────────────────────────────────┘ │
│                                       │
│              👤                       │
│              ┌───────────────────────┤
│              │ How do I claim this? │
│              └───────────────────────┤
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ To claim AWS Activate:          │ │
│  │ 1. Click 'Claim Perk'           │ │
│  │ 2. Fill application form        │ │
│  │ 3. Review in 24 hours           │ │
│  │ 4. Receive activation code      │ │
│  │                                 │ │
│  │ Start claim now? [Yes] [No]    │ │
│  └─────────────────────────────────┘ │
│                                       │
│  Suggested: [AWS Setup] [More Perks] │
│                                       │
├───────────────────────────────────────┤
│ Type your message... [📎] [Send →]   │
└───────────────────────────────────────┘
```

**Key Features:**
- Context-aware (knows current page, user data, wizard stage)
- Floating widget (accessible from all authenticated pages)
- Conversational AI (natural language, helpful tone)
- Quick actions (buttons for common tasks)
- Suggested topics (based on context)

---

## Interaction Patterns

### Micro-Interactions
1. **Button Hover:**
   - Scale up slightly (1.02)
   - Add orange glow shadow
   - Smooth transition (300ms)

2. **Card Hover:**
   - Lift effect (shadow increase)
   - Border color change to orange
   - Smooth transition (200ms)

3. **Form Focus:**
   - Orange ring around input
   - Placeholder fades
   - Label moves up (floating label pattern)

4. **Loading States:**
   - Skeleton loaders (grey pulse) for cards/tables
   - Spinner for buttons (replaces text)
   - Progress bar for AI operations (with percentage)

5. **Success Actions:**
   - Green checkmark bounce animation
   - Toast notification (top-right, auto-dismiss 3s)
   - Confetti for major milestones (wizard completion)

6. **Error States:**
   - Red outline on input
   - Error message below field (red text, icon)
   - Toast notification for API errors

### Navigation Flows
- **Breadcrumbs:** Show path for deep pages (Admin → Users → Edit User)
- **Back Button:** Always available on detail pages
- **Sticky Header:** Shrinks on scroll, stays visible
- **Bottom Navigation (Mobile):** Home, Dashboard, Wizard, Profile

### Notifications
- **Toast Types:**
  - Success: Green, checkmark icon
  - Error: Red, X icon
  - Info: Blue, i icon
  - Warning: Yellow, ! icon
- **Position:** Top-right corner
- **Duration:** 3-5 seconds, dismissible

---

## Responsive Design

### Mobile (< 768px)
- Single column layouts
- Bottom navigation bar (fixed)
- Hamburger menu for secondary pages
- Touch targets minimum 44px
- Swipe gestures for carousels
- Stacked wizard progress (vertical)

### Tablet (768px - 1024px)
- Two-column grids
- Drawer navigation (slide-in sidebar)
- Compact cards
- Touch-optimized

### Desktop (> 1024px)
- Three-four column grids
- Persistent sidebar navigation (admin)
- Hover states active
- Keyboard shortcuts enabled

---

## Accessibility

### Keyboard Navigation
- Tab order follows visual flow
- Skip to content link (first tab)
- Focus visible (orange ring)
- Escape closes modals/dropdowns
- Arrow keys for slide navigation

### Screen Readers
- Semantic HTML (`<nav>`, `<main>`, `<article>`)
- ARIA labels for icon buttons
- Alt text for all images
- Form labels linked to inputs
- Live regions for dynamic content

### Color Contrast
- Text: 4.5:1 minimum (WCAG AA)
- Focus indicators clearly visible
- Error states use icons + text (not color alone)
- Dark mode maintains contrast

---

## Performance

### Optimization Strategies
- Lazy load images (with placeholders)
- Code split by route
- Infinite scroll for long lists
- Debounce search (300ms)
- Cache API responses (5 min)
- Optimize images (WebP)
- Preload critical fonts

### Loading Indicators
- Skeleton screens for initial loads
- Spinner for quick actions (< 3s)
- Progress bar for long operations (> 3s)
- AI processing: animated icons + percentage

---

## Error Handling

### Error States
- **Form validation:** Inline errors, red outline + message
- **API errors:** Toast with retry option
- **404 pages:** Friendly message + navigation links
- **Network offline:** Banner at top with auto-retry
- **Session expired:** Redirect to login with return URL

### Empty States
- **No events:** Illustration + "Create your first event" CTA
- **No jobs:** "No jobs match your search" + reset filters button
- **No applications:** "You haven't applied yet" + browse jobs CTA
- **No perks:** "Claim your first perk" + browse perks CTA

---

## Implementation Priority

### Phase 1: Foundation (Week 1)
1. Design system setup (colors, fonts, spacing)
2. Navigation (navbar, footer, routing)
3. Authentication (login, signup, OAuth)
4. Public pages (home, about, contact)

### Phase 2: Dashboard (Week 2)
1. Dashboard layout and navigation
2. Overview cards and metrics
3. Event/job/perk cards
4. Settings pages

### Phase 3: Wizard (Week 3-4)
1. Wizard layout with progress bar
2. Stages 1-6 (forms with validation)
3. Stage 7 (AI analysis UI)
4. Stages 8-10 (perk matching, pitch deck, completion)

### Phase 4: Pitch Deck (Week 5)
1. Deck creator UI
2. Slide editor integration
3. Theme system
4. Export and presentation mode

### Phase 5: Admin & Polish (Week 6)
1. Admin panel
2. Chat interface
3. Mobile optimization
4. Testing and bug fixes

---

## Success Metrics

### User Experience
- Wizard completion rate > 80%
- Dashboard return rate > 60% weekly
- Pitch deck generation success > 95%
- Mobile usability score > 90

### Performance
- Page load < 800ms
- AI processing < 30s
- Dashboard load < 2s
- Export deck < 5s

### Accessibility
- WCAG AA compliance (> 95%)
- Keyboard navigation functional
- Screen reader compatible
- Color contrast meets standards

---

## Technical Stack (Already Configured)

### Frontend
- React 18.3.1 + TypeScript 5.8.3
- Vite 5.4.19 (build tool)
- Tailwind CSS 3.4.17 (styling)
- shadcn/ui (component library)
- TanStack Query (server state)
- React Hook Form + Zod (forms)

### Backend
- Supabase PostgreSQL (database)
- Supabase Auth (authentication)
- Supabase Edge Functions (API)
- Supabase Storage (files)

### AI Integration
- Lovable AI Gateway (multiple providers)
- Rate limiting enabled (20 req/10 min)

---

## Next Steps for Lovable

1. **Review this prompt** - Understand the complete vision
2. **Set up design system** - Implement colors, fonts, components
3. **Build navigation** - Create navbar, footer, routing structure
4. **Implement authentication** - Login, signup, OAuth flows
5. **Create public pages** - Home, about, events, jobs, perks
6. **Build dashboard** - User dashboard with cards and sections
7. **Develop wizard** - 10-stage flow with AI integration points
8. **Create pitch deck tool** - Editor, themes, export, presentation
9. **Add admin panel** - Management interface for staff
10. **Integrate chat** - AI assistant widget
11. **Optimize & test** - Mobile, accessibility, performance

---

**Key Philosophy:**
Keep it simple, clean, and user-focused. Every feature should solve a real problem. Orange guides action, white provides space, grey adds structure. Trust users, provide clear paths, celebrate their success.

**Document Version:** 1.0
**Created:** October 11, 2025
**Project:** Medellin AI Hub
**Purpose:** MVP Development with Lovable
