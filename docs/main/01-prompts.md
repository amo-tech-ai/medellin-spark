# Medellin AI Hub - Lovable Design & Architecture Prompts

## Prompt 1: Core Dashboard & Website Structure (Detailed)

### Project Overview
Create the core design system, dashboard architecture, and user journey flows for Medellin AI Hub - an AI-powered startup accelerator platform connecting entrepreneurs with resources, perks, and opportunities in Medellin, Colombia.

### Design System Requirements

**Visual Identity:**
- **Primary Colors:** Vibrant coral orange (HSL: 14, 82%, 60%) as the main accent, pure white backgrounds, light grey accents
- **Secondary Colors:** Light grey (HSL: 0, 0%, 91%) for cards and borders, near-black text (HSL: 0, 0%, 9%)
- **Typography:** Inter font family throughout, clean sans-serif aesthetic
- **Layout Style:** Minimal, clean, modern with generous whitespace
- **Component Style:** Rounded corners (0.75rem), soft shadows, smooth transitions
- **Orange Gradients:** Use gradient overlays for hero sections and CTAs (135deg gradient from primary orange to slightly warmer tones)
- **Shadow System:**
  - Soft shadows for subtle elevation (0 2px 8px rgba(0,0,0,0.05))
  - Card shadows for content containers (0 4px 16px rgba(0,0,0,0.08))
  - Elevated shadows for modals/dropdowns (0 8px 32px rgba(0,0,0,0.12))
  - Hover shadows with orange glow (0 12px 40px rgba(242,96,60,0.15))

**Dark Mode:**
- Dark grey backgrounds (HSL: 0, 0%, 9%) with same vibrant orange accents
- Slightly lighter grey cards (HSL: 0, 0%, 12%)
- Maintain orange accent throughout for brand consistency

**Spacing System (8px base unit):**
- Section padding: 48-80px vertical (responsive)
- Container padding: 16-32px horizontal (responsive)
- Card padding: 24-32px (responsive)
- Gap utilities: 16-24px for standard spacing, 24-32px for large spacing

### Website Structure

**Public Pages (with Navbar & Footer):**
1. **Home** (`/`) - Hero section with gradient, feature highlights, CTA to join/login
2. **About** (`/about`) - Mission, vision, team information
3. **Events** (`/events`) - Event listing with filters, search
4. **Event Detail** (`/events/:slug`) - Individual event page with registration
5. **Blog** (`/blog`) - Article listing with categories
6. **Blog Post** (`/blog/:slug`) - Individual blog post with rich content
7. **Contact** (`/contact`) - Contact form, office location, social links
8. **Community** (`/community`) - Member directory, discussion forums
9. **Jobs** (`/jobs`) - Job marketplace with search and filters
10. **Job Detail** (`/jobs/:id`) - Full job posting with application flow
11. **Perks** (`/perks`) - Startup perks and benefits directory
12. **Perk Detail** (`/perks/:id`) - Individual perk details with claim process
13. **Programs** (`/programs`) - Accelerator programs overview
14. **Startups** (`/startups`) - Startup directory/showcase
15. **Membership** (`/membership`) - Membership tiers and pricing
16. **Profile** (`/u/:handle`) - Public user profiles

**Authentication Pages:**
- **Auth** (`/auth`) - Login/signup with email, Google, GitHub OAuth
- **Onboarding** (`/onboarding`) - New user onboarding flow

**Dashboard Area (Authenticated Users):**
- **Main Dashboard** (`/dashboard`) - Overview with metrics, quick actions, notifications
- **Dashboard Events** (`/dashboard/events`) - User's created/registered events
- **Dashboard Jobs** (`/dashboard/jobs`) - Posted jobs management
- **Job Applicants** (`/dashboard/jobs/:jobId/applicants`) - View applications
- **Dashboard Perks** (`/dashboard/perks`) - Claimed perks tracking
- **Settings** (`/settings`) - General account settings
- **Profile Settings** (`/settings/profile`) - Edit user profile

**Admin Panel (Admin Users Only, no Navbar/Footer):**
- **Admin Layout** (`/admin`) - Sidebar navigation with sections:
  - Users management
  - Posts management
  - Events management
  - Jobs management
  - Contacts management
  - Newsletter management
  - Audit logs
  - System settings

**CRM Section (for organizations):**
- **CRM Inbox** (`/crm/inbox`) - Message center
- **CRM Contacts** (`/crm/contacts`) - Contact management
- **CRM Deals** (`/crm/deals`) - Pipeline management
- **CRM Tasks** (`/crm/tasks`) - Task tracking

### Startup Wizard Flow (Multi-Stage Form)

**Purpose:** Guided startup onboarding with AI analysis, perk matching, and pitch deck generation

**Wizard Entry:**
- **Entry Screen** (`/wizard`) - Welcome page explaining the process (no wizard layout)

**10-Stage Progressive Flow (with wizard layout: progress bar, navigation, auto-save):**

1. **Stage 1 - Founder Info** (`/wizard/stage-1`)
   - Full name, email, phone
   - LinkedIn profile URL
   - Role at startup
   - Previous startup experience
   - Why joining the accelerator
   - Clean form layout with validation feedback

2. **Stage 2 - Product Overview** (`/wizard/stage-2`)
   - Startup name
   - One-liner description
   - Industry/sector selection
   - Target market
   - Problem being solved
   - Solution description
   - Unique value proposition

3. **Stage 3 - Tech Stack** (`/wizard/stage-3`)
   - Frontend technologies (multi-select checkboxes)
   - Backend technologies
   - Database choices
   - Cloud platforms
   - Development tools
   - Technical maturity indicators

4. **Stage 4 - Evidence & Metrics** (`/wizard/stage-4`)
   - Current stage (idea, MVP, beta, launched)
   - User/customer count
   - Revenue (if applicable)
   - Key metrics
   - Product screenshots/demo upload
   - GitHub/demo links

5. **Stage 5 - Team & Traction** (`/wizard/stage-5`)
   - Team size
   - Team member roles
   - Advisors/mentors
   - Previous achievements
   - Press/media mentions
   - Social proof elements

6. **Stage 6 - Growth Goals** (`/wizard/stage-6`)
   - 6-month goals
   - 12-month goals
   - Funding stage
   - Funding needs
   - Key challenges
   - Desired support areas

7. **Stage 7 - AI Analysis** (`/wizard/stage-7`)
   - **AI Processing Screen:** Show animated loader while analyzing all previous data
   - **Results Display:**
     - Startup strengths analysis
     - Market opportunity assessment
     - Risk factors identification
     - Recommended next steps
     - Success probability indicators
   - Use cards with visual indicators (icons, progress bars)
   - Allow user to review, request re-analysis

8. **Stage 8 - Perk Matching** (`/wizard/stage-8`)
   - **AI-Matched Perks Display:** Grid/list of recommended perks based on Stage 7 analysis
   - **Perk Cards:**
     - Provider logo
     - Perk title and value
     - Why it's recommended (AI reasoning)
     - "Claim" button
   - Allow search/filter by category
   - Save selected perks to user profile

9. **Stage 9 - Pitch Deck Generation** (`/wizard/stage-9`)
   - **Auto-generated Pitch Deck Preview:**
     - Uses data from all previous stages
     - 10-12 standard slides (problem, solution, market, team, etc.)
     - Multiple themes to choose from
   - **Editing Interface:**
     - Slide navigator sidebar
     - Live preview of current slide
     - Rich text editor for content
     - Image upload for slides
     - Theme/color customization
   - **Export Options:**
     - Download as PPTX
     - Download as PDF
     - Share link
     - Present mode (fullscreen)

10. **Stage 10 - Completion** (`/wizard/stage-10`)
    - Congratulations message with confetti animation
    - Summary of completed steps
    - Next actions checklist:
      - Schedule onboarding call
      - Join Slack community
      - Access dashboard
      - Explore matched perks
    - CTA buttons to dashboard, pitch deck, profile

**Wizard Layout Components:**
- **Progress Bar:** Visual indicator showing 10 stages, current position
- **Stage Navigation:** Previous/Next buttons, save as draft button
- **Auto-Save Indicator:** Show "Saving..." and "Saved" status
- **Exit Confirmation:** Modal when user tries to leave mid-flow
- **Mobile-Optimized:** Vertical progress indicator, stacked forms

### Pitch Deck Creator (Standalone Tool)

**Location:** `/pitch-deck-creator`

**Purpose:** Standalone pitch deck creation tool (can be used outside wizard flow)

**Features:**
- **Deck Management:**
  - Create new deck from scratch
  - Import wizard-generated deck
  - Duplicate existing decks
  - Deck versioning/history

- **Slide Editor:**
  - Drag-and-drop slide reordering
  - Rich text editing with formatting toolbar
  - Image/logo upload and positioning
  - Chart/graph insertion (bar, line, pie)
  - Shape and icon library
  - Alignment and distribution tools

- **Theme System:**
  - Multiple professional themes (minimal, bold, corporate, creative)
  - Custom color palette selector
  - Font pairing options
  - Save custom themes

- **Collaboration:**
  - Share deck with collaborators
  - Comment on slides
  - Version comparison
  - Export history

- **Presentation Mode:**
  - Fullscreen presentation view
  - Slide notes (visible to presenter only)
  - Timer and slide counter
  - Remote control support (keyboard shortcuts)
  - Screen sharing optimization

- **Export & Sharing:**
  - Export to PPTX (Microsoft PowerPoint)
  - Export to PDF with notes
  - Export to images (PNG/JPG per slide)
  - Generate shareable link
  - Embed in website

### User Journeys

**Journey 1: New Startup Founder**
1. Lands on homepage � Sees hero CTA "Join the Hub"
2. Clicks signup � Creates account (email or OAuth)
3. Redirected to onboarding � Quick profile setup
4. Directed to Startup Wizard � Completes 10 stages progressively
5. Reviews AI analysis � Claims matched perks
6. Generates pitch deck � Downloads or presents
7. Arrives at completion page � Directed to dashboard
8. Explores dashboard � Browses jobs, events, community

**Journey 2: Job Seeker**
1. Visits Jobs page � Filters by skills, location, remote
2. Clicks job posting � Reviews details, company info
3. Decides to apply � Creates account if needed
4. Submits application with resume
5. Receives confirmation � Can track status in dashboard
6. Gets interview invite � Schedules through platform
7. Hired � Updates profile, joins startup

**Journey 3: Event Organizer**
1. Logs into dashboard � Navigates to "Create Event"
2. Fills event form � Title, description, date, venue, capacity
3. Uploads event banner � Sets ticket pricing (free/paid)
4. Publishes event � Appears on Events page
5. Monitors registrations � Sends updates to attendees
6. Event day � Checks in attendees, collects feedback
7. Post-event � Reviews analytics, sends thank you messages

**Journey 4: Admin/Staff Member**
1. Logs in with admin credentials � Redirected to /admin
2. Reviews pending approvals � Approves/rejects events, jobs
3. Moderates content � Edits blog posts, removes spam
4. Manages users � Views profiles, adjusts permissions, handles reports
5. Reviews analytics � Dashboard metrics, user growth, engagement
6. Sends newsletter � Creates campaign, selects segments, schedules
7. Views audit logs � Tracks all admin actions for compliance

**Journey 5: Returning User (Dashboard Focus)**
1. Logs in � Sees personalized dashboard with:
   - Upcoming events registered for
   - New job matches based on profile
   - Perk expiration reminders
   - Unread messages/notifications
   - Community activity feed
2. Clicks notification � Opens relevant section
3. Updates profile � Changes avatar, adds skills
4. Browses perks � Claims new discount code
5. Checks analytics (if startup) � Views pitch deck views, profile visits
6. Logs out or continues exploring

### Wireframe Structure Guidelines

**Layout Patterns:**
- **Hero Sections:** Full-width gradient background, centered content, large heading, subheading, dual CTAs (primary + secondary)
- **Content Sections:** Alternating white/light-grey backgrounds, max-width container (1200px), responsive grid layouts
- **Cards:** White background, soft shadow, rounded corners, padding, hover effect with orange glow
- **Navigation:**
  - Public navbar: Logo left, nav links center, auth buttons right
  - Dashboard navbar: Logo left, search bar center, notifications + profile right
  - Admin sidebar: Icon + label navigation, collapsible on mobile
- **Forms:**
  - Single column on mobile, two columns on desktop
  - Clear labels above inputs
  - Inline validation with icons
  - Submit button at bottom right (primary orange)
- **Modals:** Centered overlay, close button top-right, max-width 600px
- **Tables:** Responsive, sortable headers, row hover states, action buttons right column

**Component Hierarchy (Visual Priority):**
1. Primary CTAs � Orange gradient buttons, largest size
2. Headings � Large, bold, near-black
3. Subheadings � Medium weight, grey
4. Body text � Regular weight, comfortable line height (1.6)
5. Secondary CTAs � Outlined orange buttons
6. Tertiary actions � Text links with orange color

**Responsive Breakpoints:**
- Mobile: < 768px (stack vertically, collapsible menus, bottom navigation)
- Tablet: 768px - 1024px (2-column grids, drawer navigation)
- Desktop: > 1024px (3-4 column grids, persistent navigation)

### Interaction Patterns

**Micro-interactions:**
- Button hover � Lift effect with shadow increase
- Card hover � Slight scale (1.02) + orange glow shadow
- Form focus � Orange ring around input
- Loading states � Skeleton loaders (grey pulse animation)
- Success actions � Green checkmark animation + toast notification
- Error states � Red outline + error message below field
- Empty states � Illustration + helpful message + CTA

**Navigation Flows:**
- Breadcrumbs for deep pages (wizard, admin sections)
- Back button for detail pages
- Sticky header on scroll (shrinks slightly)
- Footer always visible on scroll-to-bottom
- Mobile: Bottom navigation bar for main sections

**Notifications & Feedback:**
- Toast notifications (top-right): Success (green), Error (red), Info (blue), Warning (yellow)
- Badge indicators on icons (red dot for unread)
- Progress indicators during AI processing (animated bar + percentage)
- Confirmation modals for destructive actions (delete, cancel)
- Auto-save indicators (subtle text feedback)

### Content Wireframes

**Dashboard Layout:**
```
                                                             
 [Logo]  [Search Bar]        [Notifications =] [Profile =d] 
                                                             $
                                                               
  Welcome back, [Name]! =K                                    
                                                               
                                                      
   Total Events   Applications   Perks Claimed        
       12              5              8               
                                                      
                                                               
                                                           
   =� Upcoming Events (3)                                   
                                                           
   [Event Card] [Event Card] [Event Card]  [View All �]   
                                                           
                                                               
                                                           
   =� Job Matches (5)                                       
                                                           
   [Job Card] [Job Card] [Job Card]  [View All �]         
                                                           
                                                               
                                                           
   <� New Perks Available                                   
                                                           
   [Perk Card] [Perk Card]  [Browse All �]                
                                                           
                                                               
                                                           
   =� Community Activity                                    
                                                           
   [Activity Feed with avatars, timestamps, interactions]  
                                                           
                                                               
                                                             
```

**Wizard Progress Layout:**
```
                                                             
  [Exit]                                          [Save Draft]
                                                               
  �             
  1   2   3   4   5   6   7   8   9   10                     
                                                               
  Stage 2: Product Overview                                   
                                                              
                                                               
  [Form Fields]                                               
  Startup Name: [________________]                            
  One-liner:    [________________]                            
  Industry:     [Dropdown �]                                  
  Target Market:[________________]                            
  Problem:      [Text Area.........]                          
  Solution:     [Text Area.........]                          
                                                               
                                      [� Previous] [Next �]   
                                                               
  Auto-saving...                                             
                                                             
```

**Pitch Deck Editor Layout:**
```
                                                             
 [Logo] Pitch Deck Creator    [Theme �] [Export �] [Present]
             ,                                               $
 Slides       Slide Preview                                 
                                                            
 1. Cover                                                
 2. Problem �                                            
 3. Solution            [Company Logo]                   
 4. Market                                               
 5. Product          Company Name                        
 6. Team             Tagline Here                        
 7. Traction                                             
 8. Business         [Background Image]                  
 9. Ask                                                  
 10. Contact                                             
                                                            
 [+ Add Slide  Rich Text Toolbar:                          
                                                               
               [B I U] [Color] [Align] [List] [Image]      
                                                            
               [Content editing area with cursor]          
                                                            
             4                                               $
 Notes: [Speaker notes area for current slide...]            
                                                             
```

**Admin Panel Sidebar:**
```
                                                             
                                                         $
  <� Home    Admin Dashboard                              
  =e Users                                                
  =� Posts                                           
  =� Events    Total Users    Pending Posts          
  =� Jobs         1,234            15                
  =� Contact                                          
  =� Letter                                               
  =� Logs     Recent Activity:                           
  � Settings   [Activity Table with actions...]         
                                                         
                                                           
```

### Chat Interface (AI Assistant)

**Location:** Floating widget accessible from all authenticated pages

**Features:**
- **Chat Button:** Fixed bottom-right, orange gradient, pulse animation when unread
- **Chat Window:**
  - Expands on click (400px wide, 600px tall)
  - Header: "Ask our AI Assistant" + minimize/close buttons
  - Chat area: White background, bubbles (user: grey, AI: orange gradient)
  - Input: Text area + send button + file upload
- **AI Capabilities:**
  - Answer questions about platform features
  - Guide through wizard stages
  - Suggest relevant perks based on conversation
  - Help with pitch deck content
  - Connect to support team if needed
- **Context Awareness:**
  - Knows current page user is on
  - References user's profile data
  - Accesses wizard progress
  - Suggests next actions

**Chat Wireframe:**
```
                                       
 =� Ask our AI Assistant    [_] [X]    
                                       $
                                       
                                    
   Hi! How can I help you today?    
   I noticed you're on Stage 3...   
                                    
              =d                       
                                     $
               What tech stack should
               I choose for my SaaS? 
                                     $
                                       
                                    
   Great question! For SaaS, I'd    
   recommend: React for frontend,   
   Node.js for backend, PostgreSQL  
   for database. Would you like...  
                                    
                                       
  [Suggested Perks: AWS Credits,     
   Vercel Pro, Supabase Discount]    
                                       
                                       $
 Type your message... [=�] [Send �]   
                                       
```

### Animation & Transitions

**Page Transitions:**
- Fade in content on route change (300ms)
- Slide up cards on scroll into view
- Stagger animations for lists (50ms delay per item)

**Loading States:**
- Skeleton screens for initial loads
- Spinner for short operations (< 3 seconds)
- Progress bar for long operations (> 3 seconds)
- AI analysis: Animated icons + progress percentage

**Success States:**
- Confetti animation for wizard completion
- Checkmark bounce for form submission
- Toast slide-in from top-right

**Micro-animations:**
- Button press � Scale down (0.98) � Scale up (1)
- Hover � Smooth transition (300ms cubic-bezier)
- Drag and drop � Shadow increase + opacity change
- Modal open � Scale from center (0.95 � 1) + fade in

### Accessibility Requirements

**Keyboard Navigation:**
- Tab order follows visual flow
- Skip to content link
- Focus visible indicators (orange ring)
- Escape to close modals
- Arrow keys for slide navigation

**Screen Reader Support:**
- Semantic HTML (nav, main, article, section)
- ARIA labels for icon buttons
- Alt text for all images
- Announce dynamic content changes
- Form error messages linked to inputs

**Color Contrast:**
- Text meets WCAG AA standards (4.5:1 minimum)
- Focus indicators clearly visible
- Error states use more than color (icons + text)
- Dark mode maintains contrast ratios

**Responsive Text:**
- Base font size 16px (no smaller)
- Line height 1.6 for readability
- Headings use responsive sizing (clamp)
- Text wraps properly on small screens

### Performance Considerations

**Optimization Strategies:**
- Lazy load images with skeleton placeholders
- Code split by route (separate bundles per page)
- Infinite scroll for long lists (jobs, events)
- Debounce search inputs (300ms)
- Cache API responses (5 minutes)
- Optimize images (WebP with fallbacks)
- Preload critical fonts

**Loading Indicators:**
- Show skeleton for cards/tables on initial load
- Show spinner for button actions
- Show progress bar for file uploads
- Show percentage for AI processing

### Error Handling

**Error States:**
- Form validation errors: Inline with red outline + message
- API errors: Toast notification with retry option
- 404 pages: Friendly message + navigation options
- Network offline: Banner at top with auto-retry
- Session expired: Redirect to login with return URL

**Empty States:**
- No events: Illustration + "Create your first event" CTA
- No jobs: "No jobs match your search" + reset filters
- No applications: "You haven't applied yet" + browse jobs
- No perks claimed: "Claim your first perk" + browse perks

### Mobile-Specific Considerations

**Touch Optimizations:**
- Minimum touch target: 44x44px
- Swipe gestures for carousels
- Pull-to-refresh on lists
- Bottom sheet modals (instead of center modals)
- Sticky bottom CTAs on forms

**Mobile Navigation:**
- Bottom navigation bar (Home, Dashboard, Wizard, Profile)
- Hamburger menu for secondary pages
- Collapsible sections (accordions)
- Fixed search bar at top

**Mobile Layouts:**
- Single column forms
- Stacked cards instead of grids
- Vertical wizard progress (left side)
- Compact dashboard cards
- Simplified tables (show key columns only)

### Implementation Notes for Lovable

**Priority Order:**
1. Design system setup (colors, typography, spacing)
2. Core layouts (navbar, footer, dashboard shell)
3. Authentication flows (login, signup, OAuth)
4. Public pages (home, about, events, jobs)
5. Dashboard implementation
6. Wizard flow (stages 1-10)
7. Pitch deck creator
8. Admin panel
9. Chat interface
10. CRM sections

**Component Library:**
- Use shadcn/ui as base (already in project)
- Customize theme to match orange/grey/white palette
- Build on top of Radix UI primitives
- Ensure all components are accessible and responsive

**State Management:**
- Use TanStack Query for server state
- Use React Context for auth state
- Use local state for UI interactions
- Use form libraries (React Hook Form) for complex forms

**Routing Strategy:**
- React Router DOM for client-side routing
- Protected routes for authenticated pages
- Admin route guards for admin panel
- Wizard route guards (redirect to last completed stage)

**Data Fetching:**
- Supabase for backend (PostgreSQL database)
- Supabase Auth for authentication
- Supabase Storage for file uploads
- Real-time subscriptions for chat/notifications

**Next Steps After Design:**
Once the design system, user journeys, and wireframes are implemented, the next phase will focus on:
- Backend integration (database schema, API endpoints)
- AI integration (analysis, matching, generation)
- Testing (unit, integration, E2E)
- Performance optimization
- Production deployment

---

**Key Success Metrics:**
- User completes wizard in < 15 minutes
- Pitch deck generation success rate > 95%
- Dashboard load time < 800ms
- Mobile usability score > 90
- Accessibility audit score > 95 (WCAG AA)

**Design Philosophy:**
Keep it clean, minimal, and user-focused. Every interaction should feel smooth and intuitive. The orange accent should guide users to important actions without being overwhelming. White space is your friend. Trust the user's intelligence - provide clear paths without hand-holding.
