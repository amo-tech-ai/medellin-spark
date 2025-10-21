# 005 - User Journey: Medellin-Spark End-to-End Experience

## Mermaid Diagram

```mermaid
journey
    title Medellin-Spark: Startup Founder Journey from Discovery to Success

    section Discovery & Signup
      Visit landing page: 3: Founder
      Browse events and jobs: 4: Founder
      See "Join Community" CTA: 5: Founder
      Click "Sign in with Google": 5: Founder, System
      Grant OAuth permissions: 4: Founder
      Auto-create profile: 5: System
      Redirect to dashboard: 5: System

    section First Event Registration
      Browse upcoming events: 5: Founder
      Find "AI Startup Meetup": 5: Founder
      View event details: 5: Founder
      See 50 spots remaining: 4: Founder
      Select "Early Bird" ticket ($50): 5: Founder
      Complete registration: 5: Founder
      Receive confirmation toast: 5: System
      Simulated payment: 4: Founder
      Registration confirmed: 5: System

    section Event Attendance
      Receive email reminder (24h before): 4: System
      Check dashboard for event details: 5: Founder
      Navigate to venue (in-person): 4: Founder
      Organizer scans QR code: 5: Organizer
      Check-in recorded: 5: System
      Attend event (networking): 5: Founder
      Meet potential co-founders: 5: Founder
      Exchange contact info: 5: Founder

    section Job Search (Hiring)
      Need to hire developer: 3: Founder
      Navigate to Jobs page: 5: Founder
      Click "Post a Job": 5: Founder
      Create company profile: 4: Founder
      Fill job details (title, description, skills): 4: Founder
      Set salary range ($80k-$120k): 4: Founder
      Publish job posting: 5: Founder
      Job visible to candidates: 5: System

    section Reviewing Applications
      Receive 12 applications: 5: System
      View applicants sorted by fit_score: 5: System
      See AI-generated match scores (65-92%): 5: Founder, System
      Filter by top 3 candidates (score > 85%): 5: Founder
      Review candidate profiles: 5: Founder
      Schedule interviews with 2 candidates: 5: Founder
      Update application stage to "interview": 5: Founder
      Send interview invites: 4: Founder

    section Startup Perks Discovery
      Hear about perks program: 4: Founder
      Navigate to Perks page: 5: Founder
      Browse 20+ active perks: 5: Founder
      Find "$10k AWS credits" perk: 5: Founder
      Save perk to favorites: 5: Founder
      See "Verification Required" banner: 3: Founder
      Submit startup profile for verification: 4: Founder
      Wait 2-3 days for approval: 3: Founder, Admin
      Receive verification email: 5: System

    section Claiming Perks
      Return to Perks page: 5: Founder
      See "Verified" badge on profile: 5: Founder
      Click "Claim Perk" on AWS credits: 5: Founder
      Fill claim form (company details): 4: Founder
      Submit claim request: 5: Founder
      Admin reviews claim (1-2 days): 3: Admin
      Claim approved: 5: Admin
      Receive redemption instructions: 5: System
      Redeem $10k AWS credits: 5: Founder
      Save $10k in infrastructure costs: 5: Founder

    section Pitch Deck Wizard
      Need pitch deck for investors: 3: Founder
      Navigate to Pitch Deck Wizard: 5: Founder
      Start wizard session: 5: System
      Answer 10 questions (problem, solution, market): 4: Founder
      Upload logo and brand colors: 4: Founder
      See real-time deck preview: 5: System
      Click "Generate Pitch Deck": 5: Founder
      AI generates 12-slide deck (15 seconds): 5: System
      Download PDF (2.4 MB): 5: Founder
      Review deck quality: 4: Founder
      Edit 3 slides manually: 4: Founder
      Re-download updated deck: 5: Founder

    section Pitch to Investors
      Email deck to 8 investors: 5: Founder
      Receive 3 meeting requests: 5: Investor
      Present deck in meetings: 5: Founder
      Answer investor questions: 4: Founder
      Receive 1 term sheet offer: 5: Investor
      Negotiate terms: 4: Founder
      Close $500k seed round: 5: Founder
      Celebrate success: 5: Founder

    section Return Visit (Month 2)
      Return to dashboard: 5: Founder
      See upcoming events: 5: System
      Register for "Demo Day" event: 5: Founder
      Check job applications status: 5: Founder
      Hire 1 developer from platform: 5: Founder
      Claim 2 more perks (Stripe, Notion): 5: Founder
      Update company profile: 4: Founder
      Refer 3 friends to platform: 5: Founder

    section Power User (Month 6)
      Attended 5 events: 5: Founder
      Hired 3 employees via Jobs: 5: Founder
      Claimed 6 perks (saved $50k): 5: Founder
      Created 2 pitch decks: 5: Founder
      Become event sponsor ($2k): 4: Founder
      Share success story on LinkedIn: 5: Founder
      Recommend platform to accelerator: 5: Founder
```

## Explanation

This user journey maps the **complete startup founder experience** on Medellin-Spark from initial discovery to becoming a power user. The journey spans 9 sections over 6 months, demonstrating how the platform's four core features (Events, Jobs, Perks, Pitch Deck Wizard) create a comprehensive ecosystem for startup founders.

**Discovery & Signup (Satisfaction: 3-5/5)**: The founder discovers Medellin-Spark through word-of-mouth or search. The landing page showcases upcoming events and job listings without requiring login (public read via RLS). Clicking "Sign in with Google" initiates OAuth flow, and the system automatically creates a `profiles` record via the `on_auth_user_created` trigger. The friction point is the OAuth consent screen (satisfaction drops to 4/5), but the auto-profile creation improves UX (no manual profile form).

**First Event Registration (Satisfaction: 4-5/5)**: The founder browses events, filtered by `status = 'published'` and `deleted_at IS NULL` via RLS. Event details show available capacity (50 spots via `events.capacity - events.registered_count`). Selecting a ticket and registering triggers the `trg_update_event_registered_count` trigger, ensuring accurate counter updates. The simulated payment flow is a friction point (satisfaction 4/5), but confirmation is instant.

**Event Attendance (Satisfaction: 4-5/5)**: The founder receives an email reminder (future feature, not implemented). On event day, the organizer checks the founder in via QR code scan (or manual lookup), setting `registration.attended = true`, `check_in_time = now()`, and `status = 'attended'`. The founder networks, meeting potential co-founders—this is a **peak moment** (satisfaction 5/5).

**Job Search & Hiring (Satisfaction: 3-5/5)**: The founder transitions from attendee to hiring manager. Creating a company profile and posting a job requires multiple form fields (satisfaction drops to 4/5). Once published, the job appears in public listings. The platform's **AI-powered fit scoring** (0-100 scale) ranks applicants, allowing the founder to filter top candidates (score > 85%). This is an **aha moment** (satisfaction 5/5) as it saves hours of manual resume screening.

**Reviewing Applications (Satisfaction: 5/5)**: The founder reviews 12 applications, sorted by `applications.fit_score DESC`. The AI-generated scores (65-92%) provide instant insights into candidate-job fit based on skill matching (`job_skills` ↔ `candidate_skills` junction tables). The founder schedules interviews with the top 2 candidates and updates their `application.stage` to `interview`. This demonstrates the **Jobs Marketplace** value proposition: connecting startups with qualified candidates faster than traditional job boards.

**Perks Discovery & Verification (Satisfaction: 3-5/5)**: The founder discovers the Perks program, browsing 20+ active perks (filtered by `perks.active = true` via RLS). However, claiming perks requires **startup verification** (`startup_profiles.verified = true`), creating a friction point (satisfaction drops to 3/5). The founder submits a startup profile and waits 2-3 days for admin approval. This manual verification step ensures perk providers receive legitimate claims but adds delay.

**Claiming Perks (Satisfaction: 4-5/5)**: Once verified, the founder claims the "$10k AWS credits" perk. The claim enters the `perk_claims` table with `status = 'pending'`. After admin approval (`status = 'approved'`, `approved_at = now()`), the founder receives redemption instructions and redeems the credits (`status = 'redeemed'`, `redeemed_at = now()`). This represents **$10k in cost savings**, a significant value metric (satisfaction 5/5).

**Pitch Deck Wizard (Satisfaction: 4-5/5)**: The founder needs a pitch deck for investor meetings. The Pitch Deck Wizard stores session state in `wizard_sessions.session_data` (JSONB), allowing the founder to answer questions incrementally and resume later. Upon completion, the AI generates a 12-slide deck in 15 seconds, storing the PDF URL in `wizard_sessions.deck_url`. The founder downloads the deck, reviews it, edits 3 slides manually, and re-downloads. This **self-serve pitch deck creation** eliminates the $2k-$5k cost of hiring a designer (satisfaction 5/5).

**Pitch to Investors (Satisfaction: 4-5/5)**: The founder emails the deck to 8 investors, receives 3 meeting requests, presents the deck, and secures a $500k seed round. This is the **ultimate outcome** enabled by Medellin-Spark's Pitch Deck Wizard. The platform's ROI is clear: $500k raised >> $0 platform cost (freemium model).

**Return Visit & Power User (Satisfaction: 5/5)**: Over 6 months, the founder becomes a power user, attending 5 events, hiring 3 employees, claiming 6 perks ($50k saved), and creating 2 pitch decks. The founder transitions from user to advocate, sponsoring an event ($2k) and referring friends. This demonstrates **platform stickiness** and **word-of-mouth growth**.

## Emotional Journey Map

### Peak Moments 🎉
1. **Meet co-founders at first event** - "I found my team here!"
2. **AI fit scores save hours of resume screening** - "This is brilliant!"
3. **Claim $10k AWS credits** - "I just saved $10k!"
4. **Generate professional pitch deck in 15 seconds** - "This looks investor-ready!"
5. **Close $500k seed round** - "Medellin-Spark helped us get funded!"

### Pain Points 😓
1. **OAuth consent screen friction** - "Do I trust this platform with my Google account?"
2. **Simulated payment flow** - "Why isn't real payment integrated yet?"
3. **2-3 day verification wait** - "Why can't I claim perks immediately?"
4. **Manual profile forms** - "Too many fields to fill out!"
5. **No email notifications** - "I missed an event update!"

### Aha Moments 💡
1. **Public events browsing without login** - "I can explore before signing up!"
2. **Auto-profile creation on OAuth** - "No signup form? Nice!"
3. **AI fit scores on applications** - "I found my top candidate in 2 minutes!"
4. **Verified badge unlocks perks** - "Now I understand the value of verification!"
5. **Pitch deck saves $2k designer cost** - "This is free? Incredible!"

## Satisfaction Metrics by Phase

| Phase | Avg Satisfaction | Key Drivers |
|-------|-----------------|-------------|
| **Discovery & Signup** | 4.0/5 | Public browsing (+1), OAuth friction (-0.5) |
| **Event Registration** | 4.5/5 | Easy registration (+1), simulated payment (-0.5) |
| **Event Attendance** | 5.0/5 | Networking success (+1), check-in ease (+0.5) |
| **Job Posting** | 4.0/5 | AI fit scoring (+1), manual forms (-0.5) |
| **Application Review** | 5.0/5 | AI-powered ranking (+1), time savings (+1) |
| **Perks Discovery** | 3.5/5 | Variety (+1), verification wait (-1) |
| **Claiming Perks** | 4.5/5 | Cost savings (+1), admin approval delay (-0.5) |
| **Pitch Deck Wizard** | 4.5/5 | Speed (+1), quality (+0.5), manual edits (-0.5) |
| **Investor Pitch** | 5.0/5 | Funding success (+1), ROI (+1) |
| **Power User** | 5.0/5 | Platform stickiness (+1), advocacy (+1) |

**Overall Journey Satisfaction**: 4.5/5

## User Personas & Journey Variants

### Persona 1: Startup Founder (Speed-focused)
**Goal**: Hire developers and raise funding quickly

**Journey Highlights**:
- Uses Jobs Marketplace to hire 3 developers in 2 months
- AI fit scoring reduces time-to-hire by 70% (2 weeks → 3 days per role)
- Claims 6 perks, saving $50k in infrastructure costs
- Generates pitch deck in 15 seconds, raises $500k seed round
- **Time to value**: 2 months (first hire + funding)

**Pain Point**: 2-3 day verification wait for perks (wants instant access)

### Persona 2: Event Organizer (Community-focused)
**Goal**: Host successful events and grow Medellín's startup community

**Journey Highlights**:
- Creates organizer profile and publishes 5 events
- Uses event management dashboard to track registrations
- Checks in 200+ attendees across events (QR code scan)
- Secures 3 sponsors ($10k total) for flagship event
- **Time to value**: 1 month (first successful event with 50+ attendees)

**Pain Point**: No automated email reminders for attendees (manual workaround via email client)

### Persona 3: Job Seeker (Career-focused)
**Goal**: Find job at early-stage startup in Medellín

**Journey Highlights**:
- Creates candidate profile with resume and portfolio
- Browses 50+ published jobs filtered by "remote_allowed = true"
- Applies to 8 jobs with tailored cover letters
- Receives 3 interview invites (AI fit score > 80%)
- Accepts offer at startup met via Medellin-Spark event
- **Time to value**: 6 weeks (application → offer → acceptance)

**Pain Point**: No application status notifications (must manually check dashboard)

### Persona 4: Service Provider (Perk Partner)
**Goal**: Offer perks to verified startups and generate leads

**Journey Highlights**:
- Contacts Medellin-Spark admin to add perk ($10k credits)
- Admin creates perk listing with eligibility criteria
- Receives 20 claims from verified startups in 3 months
- Converts 5 claims to paying customers (25% conversion rate)
- **Time to value**: 1 month (first claim approved)

**Pain Point**: No self-serve perk creation (must contact admin)

## User Flow Optimizations

### Current Flow Strengths ✅
1. **Public browsing** - Users explore events/jobs without signup
2. **OAuth auto-profile** - No manual signup form
3. **AI fit scoring** - Instant candidate ranking
4. **RLS policies** - Secure, database-enforced permissions
5. **Soft deletes** - Event/job recovery window
6. **Real-time counters** - Accurate capacity tracking via triggers
7. **JSONB flexibility** - Wizard state adapts to new questions

### Suggested Improvements 🚀

#### Short-term (Quick Wins)
1. **Email notifications**
   - Event reminders (24h before)
   - Application status updates (interview scheduled, offer extended)
   - Perk claim approvals
   - Implementation: Supabase Edge Function + SendGrid API

2. **Instant perk verification**
   - Replace 2-3 day manual approval with automated checks
   - Verify via LinkedIn company page or domain ownership
   - Implementation: Edge Function + Clearbit API

3. **Real payment integration**
   - Replace simulated payment with Stripe
   - Support multiple payment methods (card, bank transfer)
   - Implementation: Stripe Checkout + webhook listeners

4. **Application status notifications**
   - Real-time updates via Supabase Realtime
   - Push notifications to candidates when stage changes
   - Implementation: Supabase Realtime subscriptions + browser push API

#### Medium-term (Feature Additions)
1. **Advanced search & filters**
   - Full-text search on event/job descriptions
   - Filter by date range, location, price, skills
   - Implementation: PostgreSQL GIN indexes + advanced RLS policies

2. **Event analytics dashboard**
   - Attendance rate, revenue, ticket tier breakdown
   - Attendee demographics (job titles, companies)
   - Implementation: SQL views + Recharts visualization library

3. **Collaborative pitch deck editing**
   - Multiple founders edit deck simultaneously
   - Real-time sync via Supabase Realtime
   - Implementation: Liveblocks or Yjs + WebSocket

4. **Referral program**
   - Users earn credits for referring friends
   - Credits unlock premium features (priority job listings, featured events)
   - Implementation: Referral tracking table + promo code system

#### Long-term (Strategic)
1. **Mobile app**
   - React Native or Flutter for iOS/Android
   - QR code scanning for event check-ins
   - Push notifications for event reminders
   - Implementation: React Native + Supabase mobile SDK

2. **Investor matching platform**
   - Pitch decks automatically shared with interested investors
   - Investors browse startups and request meetings
   - Implementation: New tables (investors, investor_interests) + matching algorithm

3. **Startup directory**
   - Public profiles for verified startups
   - Showcase products, team, funding stage
   - Implementation: Public startup profile pages + SEO optimization

4. **API for third-party integrations**
   - Allow external platforms to query events/jobs
   - Webhook listeners for real-time updates
   - Implementation: Supabase auto-generated REST API + webhook management

## Success Metrics

### Activation (First Value)
- **Time to first registration**: < 10 minutes
- **OAuth success rate**: > 90%
- **Profile completion rate**: > 80%

### Engagement (Ongoing Use)
- **Events attended per user**: > 2 (30 days)
- **Job applications per candidate**: > 3 (30 days)
- **Perks claimed per verified startup**: > 2 (90 days)
- **Pitch decks created per founder**: > 1 (60 days)

### Retention (Stickiness)
- **Return rate (Day 7)**: > 50%
- **Return rate (Day 30)**: > 30%
- **Power user conversion** (5+ events or 3+ hires): > 10%

### Monetization (Premium Features)
- **Sponsor conversion**: > 20% of event organizers become sponsors
- **Premium job posting upgrades**: > 15% of companies upgrade to featured listings
- **Perk provider partnerships**: > 50 active perks

### Viral Growth (Word-of-Mouth)
- **Referral rate**: > 25% of users refer at least 1 friend
- **Social shares**: > 10% of users share events/jobs on LinkedIn
- **Investor platform adoption**: > 5 investors actively sourcing deals

## Recommendations for Medellin-Spark

Based on this user journey analysis, here are key recommendations:

### 1. Prioritize Email Notifications
**Why**: Every pain point mentions "no notifications" (event reminders, application updates, perk approvals)
**Impact**: Reduce no-show rate by 30%, increase application response rate by 50%
**Implementation**: Supabase Edge Function triggered by database events

### 2. Automate Perk Verification
**Why**: 2-3 day manual approval is the #1 friction point for perks
**Impact**: Increase perk claim rate by 40%, reduce admin workload by 80%
**Implementation**: Automated checks via LinkedIn/domain verification

### 3. Integrate Real Payments
**Why**: Simulated payment undermines trust and limits revenue opportunities
**Impact**: Enable paid events ($20-$100 tickets), generate 10% platform fee revenue
**Implementation**: Stripe Checkout + webhook handling

---

**Journey**: 9 phases over 6 months
**Satisfaction**: 4.5/5 overall
**Key Insight**: Multi-product ecosystem creates lock-in (Events → Jobs → Perks → Pitch Deck)
**Documentation**: Medellin-Spark MVP - User Journey
