# Medellin Spark - User Journey Diagrams

**Date**: October 20, 2025
**Purpose**: Complete user journey visualizations using Mermaid
**Platform**: Medellin AI - Startup ecosystem platform with AI-powered pitch deck generation

---

## Journey 1: AI-Powered Pitch Deck Creation

**Primary Feature**: The flagship AI wizard that guides users through creating investor-ready presentations

```mermaid
journey
    title User Journey — AI Pitch Deck Creation
    section Discovery & Interest
      Visit homepage: 5: Visitor
      Read about AI pitch deck tool: 4: Visitor
      Click "Create Pitch Deck": 5: Visitor
    section AI Conversation
      Start chat with AI wizard: 5: User
      Answer questions about startup: 4: User
      Provide business model details: 4: User
      Review AI-extracted information: 5: User
      Watch progress bar increase: 5: User
    section Generation
      Reach 80% completeness: 5: User
      Click "Generate Deck" button: 5: User
      Wait for AI to create 10 slides: 4: User
      Redirected to outline editor: 5: User
    section Editing & Refinement
      View all 10 slides in grid: 5: User
      Drag-drop to reorder slides: 5: User
      Click slide to edit content: 4: User
      Save changes to presentation: 5: User
    section Presentation
      Click "View Presentation": 5: User
      Navigate slides with keyboard: 5: User
      Present to investors: 5: User
      Download or share deck: 5: User
```

**Summary**:
- **Discovery**: User learns about AI-powered pitch deck creation (emotional score: 4-5/5)
- **AI Conversation**: Interactive chat builds deck foundation with progress tracking (4-5/5)
- **Generation**: AI creates complete 10-slide presentation in seconds (4-5/5)
- **Editing**: Intuitive drag-drop interface for refinement (4-5/5)
- **Presentation**: Professional viewing and sharing capabilities (5/5)

**Friction Points**:
- Waiting for AI response (mitigated by streaming)
- Learning curve for first-time users (mitigated by guided wizard)

**Success Metrics**:
- 80%+ completeness before generation allowed
- 10 slides created automatically
- Instant redirect to outline editor

---

## Journey 2: Event Discovery & Registration

**Feature**: Browse and register for startup ecosystem events

```mermaid
journey
    title User Journey — Event Discovery & Registration
    section Awareness
      See event mentioned on social media: 3: Public
      Click link to Medellin Spark: 4: Public
      Navigate to Events page: 4: Visitor
    section Discovery
      Browse event listings: 4: Visitor
      Filter by category/date: 5: Visitor
      Click event card for details: 5: Visitor
    section Evaluation
      View event detail page: 5: Visitor
      Read agenda and speakers: 4: Visitor
      Check ticket pricing: 4: Visitor
      Decide to register: 5: Visitor
    section Registration
      Click "Register" button: 5: User
      Sign in with Google OAuth: 5: User
      Complete registration form: 4: User
      Receive confirmation email: 5: User
    section Pre-Event
      Receive event reminders: 4: User
      Check event details on dashboard: 5: User
      Add to calendar: 5: User
    section Post-Event
      View event in history: 4: User
      Leave feedback/rating: 4: User
      Browse related events: 5: User
```

**Summary**:
- **Awareness**: Social sharing drives traffic (emotional score: 3-4/5)
- **Discovery**: Clean browsing with filtering (4-5/5)
- **Evaluation**: Detailed event pages with all information (4-5/5)
- **Registration**: Smooth OAuth flow with instant confirmation (4-5/5)
- **Pre-Event**: Proactive reminders and dashboard access (4-5/5)
- **Post-Event**: Engagement tracking and recommendations (4-5/5)

**Friction Points**:
- Authentication required for registration
- Payment flow (if paid events)

**Success Metrics**:
- List → Detail page conversion: >40%
- Detail → Registration conversion: >25%
- Email open rates: >60%

---

## Journey 3: Job Search & Application

**Feature**: Find and apply to startup opportunities

```mermaid
journey
    title User Journey — Job Search & Application
    section Discovery
      Visit Jobs page from navbar: 4: Visitor
      See featured job listings: 4: Visitor
      Use search/filter tools: 5: Visitor
    section Evaluation
      Click job card to view details: 5: Visitor
      Read full job description: 4: Visitor
      Check company information: 4: Visitor
      View salary and benefits: 5: Visitor
    section Application Decision
      Click "Apply" button: 5: User
      Sign in if not authenticated: 4: User
      Review application requirements: 4: User
      Decide to apply: 5: User
    section Application
      Fill out application form: 3: User
      Upload resume and portfolio: 3: User
      Submit application: 4: User
      Receive confirmation: 5: User
    section Tracking
      View application in dashboard: 5: User
      Receive status updates: 4: User
      Track multiple applications: 5: User
      Get interview invitations: 5: User
```

**Summary**:
- **Discovery**: Easy access from navigation with clear listings (4-5/5)
- **Evaluation**: Comprehensive job detail pages (4-5/5)
- **Application Decision**: Clear call-to-action with auth flow (4-5/5)
- **Application**: Standard form process (emotional dip 3-4/5 - necessary friction)
- **Tracking**: Dashboard provides visibility and updates (5/5)

**Friction Points**:
- Form filling is tedious but necessary
- Resume upload required
- Competition visibility may discourage some users

**Success Metrics**:
- Job views → Applications: >15%
- Application completion rate: >80%
- Time to apply: <10 minutes

---

## Journey 4: Startup Onboarding

**Feature**: Founders submit their startup for visibility

```mermaid
journey
    title User Journey — Startup Profile Creation
    section Awareness
      Learn about Medellin Spark platform: 4: Founder
      Decide to create profile: 5: Founder
      Click "Submit Startup": 5: Founder
    section Profile Creation
      Sign in with OAuth: 5: Founder
      Navigate to startup profile form: 4: Founder
      Enter company details: 3: Founder
      Add team members: 4: Founder
      Upload logo and photos: 4: Founder
    section Skills & Experience
      Fill skills experience form: 3: Founder
      Add previous ventures: 4: Founder
      Link social profiles: 5: Founder
      Save and review: 4: Founder
    section Publication
      Submit for review: 4: Founder
      Wait for approval: 3: Founder
      Receive approval notification: 5: Founder
      Profile goes live: 5: Founder
    section Engagement
      View profile analytics: 5: Founder
      Receive investor inquiries: 5: Founder
      Update profile regularly: 4: Founder
      Connect with community: 5: Founder
```

**Summary**:
- **Awareness**: Clear value proposition attracts founders (4-5/5)
- **Profile Creation**: Comprehensive form (dips to 3/5 - necessary data collection)
- **Skills & Experience**: Additional context builds credibility (3-4/5)
- **Publication**: Approval process ensures quality (3-5/5 - waiting is friction)
- **Engagement**: Dashboard analytics drive continued use (5/5)

**Friction Points**:
- Long form completion time
- Approval wait time
- Keeping profile updated

**Success Metrics**:
- Form start → completion: >60%
- Average completion time: <20 minutes
- Profile update frequency: Monthly

---

## Journey 5: Dashboard Power User

**Feature**: Comprehensive dashboard for managing all activities

```mermaid
journey
    title User Journey — Dashboard Power User
    section Daily Routine
      Login to Medellin Spark: 5: User
      Land on dashboard home: 5: User
      Check metrics overview: 5: User
      Review recent notifications: 4: User
    section Event Management
      Navigate to Events dashboard: 5: User
      View upcoming events: 5: User
      Check past event history: 4: User
      Register for new event: 5: User
    section Pitch Deck Workflow
      Open Pitch Decks section: 5: User
      View all presentations: 5: User
      Edit active pitch deck: 5: User
      Create new presentation: 5: User
    section Job Applications
      Check Jobs dashboard: 5: User
      Review application statuses: 4: User
      Browse new opportunities: 5: User
      Submit new application: 4: User
    section Settings & Profile
      Update profile information: 4: User
      Adjust notification preferences: 5: User
      Review privacy settings: 4: User
      Save changes: 5: User
```

**Summary**:
- **Daily Routine**: Quick overview of all activities (4-5/5)
- **Event Management**: Centralized event tracking (4-5/5)
- **Pitch Deck Workflow**: Easy access to presentations (5/5)
- **Job Applications**: Application tracking and discovery (4-5/5)
- **Settings & Profile**: Full control over account (4-5/5)

**Friction Points**:
- None major - dashboard is optimized for frequent use
- Information overload if user has many activities

**Success Metrics**:
- Daily active users: >30%
- Pages per session: >4
- Session duration: >5 minutes
- Return rate: >70%

---

## Journey 6: Perks Discovery & Redemption

**Feature**: Access exclusive startup perks and benefits

```mermaid
journey
    title User Journey — Perks Discovery & Redemption
    section Discovery
      Discover Perks section in navbar: 4: User
      Browse perk categories: 5: User
      Filter by value/category: 5: User
    section Evaluation
      Click perk card for details: 5: User
      Read full perk description: 4: User
      Check redemption requirements: 4: User
      View partner information: 4: User
    section Redemption
      Click "Redeem" button: 5: User
      Copy discount code: 5: User
      Visit partner website: 4: User
      Apply discount code: 5: User
    section Usage
      Complete purchase with discount: 5: User
      Return to mark as used: 4: User
      Save favorite perks: 5: User
      Share with team members: 5: User
    section Follow-Up
      Receive new perk notifications: 5: User
      Track redeemed perks in dashboard: 5: User
      Rate perk experience: 4: User
      Recommend to other startups: 5: User
```

**Summary**:
- **Discovery**: Easy navigation with clear categories (4-5/5)
- **Evaluation**: Detailed perk pages with partner info (4/5)
- **Redemption**: Simple code-based redemption (4-5/5)
- **Usage**: External partner experience (4-5/5)
- **Follow-Up**: Tracking and sharing capabilities (4-5/5)

**Friction Points**:
- Leaving platform to redeem (necessary)
- Tracking usage manually
- Limited availability of some perks

**Success Metrics**:
- Perk views → Redemptions: >20%
- User returns for more perks: >50%
- Average perks per user: >3

---

## Journey 7: Complete Platform Lifecycle

**Feature**: Full user lifecycle from discovery to advocacy

```mermaid
journey
    title User Journey — Complete Platform Lifecycle
    section Acquisition
      Discover Medellin Spark online: 3: Public
      Visit homepage: 4: Visitor
      Explore features: 4: Visitor
      Sign up with Google OAuth: 5: User
    section Activation
      Complete profile: 4: User
      Create first pitch deck: 5: User
      Register for first event: 5: User
      Browse jobs and perks: 4: User
    section Engagement
      Use dashboard daily: 5: User
      Attend events regularly: 5: User
      Update pitch decks: 5: User
      Apply to job opportunities: 4: User
    section Retention
      Receive personalized recommendations: 5: User
      Get value from perks: 5: User
      Network with community: 5: User
      Track progress on dashboard: 5: User
    section Revenue
      Subscribe to premium features: 4: User
      Pay for advanced pitch deck tools: 5: User
      Purchase event tickets: 5: User
      Upgrade storage/features: 4: User
    section Advocacy
      Refer other founders: 5: User
      Share success stories: 5: User
      Leave positive reviews: 5: User
      Become platform ambassador: 5: User
```

**Summary**:
- **Acquisition**: SEO, social, word-of-mouth drive traffic (3-4/5)
- **Activation**: Quick wins with pitch deck creation (4-5/5)
- **Engagement**: Daily habit formation through dashboard (4-5/5)
- **Retention**: Personalization and community keep users active (5/5)
- **Revenue**: Value-based monetization (4-5/5)
- **Advocacy**: Delighted users become promoters (5/5)

**Friction Points**:
- Initial discovery (cold traffic)
- Premium pricing may limit some users
- Competition from other platforms

**Success Metrics**:
- Sign-up → Activation: >60%
- Weekly active users: >40%
- Monthly retention: >70%
- NPS (Net Promoter Score): >50

---

## Cross-Journey Insights

### Emotional Patterns Across All Journeys

**Common Highs** (5/5 satisfaction):
1. **AI Pitch Deck Generation** - "Wow" moment when AI creates presentation
2. **OAuth Sign-In** - Frictionless authentication
3. **Dashboard Overview** - Central hub for all activities
4. **Real-Time Updates** - Progress tracking and notifications
5. **Detail Pages** - Comprehensive information at fingertips

**Common Lows** (3/5 satisfaction):
1. **Form Filling** - Necessary but tedious data entry
2. **Waiting States** - Approval processes, AI generation delays
3. **Initial Discovery** - Cold traffic finding the platform
4. **External Redirects** - Leaving platform for partner services
5. **Learning Curve** - First-time feature usage

### Platform Strengths

| Feature | Average Score | Key Benefit |
|---------|--------------|-------------|
| AI Pitch Deck Wizard | 4.8/5 | Revolutionary time-savings |
| Dashboard Navigation | 4.9/5 | Everything in one place |
| OAuth Authentication | 5.0/5 | Zero-friction login |
| Event Discovery | 4.6/5 | Clear, filterable listings |
| Detail Pages | 4.7/5 | Comprehensive information |

### Improvement Opportunities

| Friction Point | Impact | Solution Priority |
|----------------|--------|------------------|
| Form completion fatigue | Medium | P2 - Add autosave, progress indicators |
| Waiting for approvals | Low | P3 - Auto-approve with post-review |
| Premium feature discovery | Medium | P2 - Better onboarding tours |
| Mobile responsiveness | High | P1 - Optimize for mobile screens |
| Search functionality | Medium | P2 - Add global search |

---

## Technical Implementation Notes

### Routes Mapped to Journeys

**Journey 1 - Pitch Deck**:
- `/pitch-deck-wizard` (Chat interface)
- `/presentations/:id/outline` (Grid editor)
- `/presentations/:id/edit` (Slide editor)
- `/presentations/:id/view` (Presentation mode)

**Journey 2 - Events**:
- `/events` (List page)
- `/events/:id` (Detail page) ✅ NEW
- `/dashboard/events` (User's events)

**Journey 3 - Jobs**:
- `/jobs` (List page)
- `/jobs/:id` (Detail page) ✅ NEW
- `/dashboard/jobs` (Applications - to be implemented)

**Journey 4 - Startup**:
- `/startup-profile` (Submission form)
- `/skills-experience` (Additional info)
- `/startups` (Directory)

**Journey 5 - Dashboard**:
- `/dashboard` (Overview)
- `/dashboard/events` (Events management)
- `/dashboard/pitch-decks` (Presentations)
- `/dashboard/settings` (User settings)

**Journey 6 - Perks**:
- `/perks` (List page)
- `/perks/:id` (Detail page) ✅ NEW
- `/dashboard/perks` (Saved perks - to be implemented)

---

## Recommendations to Reduce Friction

### High Priority (Implement First)

1. **Add Progress Indicators**
   - Form completion: "Step 2 of 5"
   - Upload status: "Processing..."
   - AI generation: Streaming responses

2. **Implement Auto-Save**
   - Pitch deck conversations
   - Form data (drafts)
   - User preferences

3. **Improve Mobile Experience**
   - Responsive dashboard
   - Touch-optimized controls
   - Faster load times

### Medium Priority

4. **Add Onboarding Tours**
   - First-time user walkthrough
   - Feature discovery prompts
   - Tooltips for complex features

5. **Enhance Search & Discovery**
   - Global search bar
   - AI-powered recommendations
   - "Similar to this" suggestions

6. **Expand Dashboard Analytics**
   - Pitch deck view counts
   - Event attendance history
   - Application success rates

### Low Priority (Future Enhancements)

7. **Add Social Features**
   - User-to-user messaging
   - Community forums
   - Startup showcases

8. **Implement Gamification**
   - Profile completion badges
   - Activity streaks
   - Leaderboards

9. **Add Collaboration Tools**
   - Team pitch deck editing
   - Shared event registration
   - Group applications

---

## Success Metrics Summary

### Platform-Wide KPIs

| Metric | Target | Current Status |
|--------|--------|----------------|
| **Sign-up Conversion** | >5% of visitors | To measure |
| **Activation Rate** | >60% (create pitch deck) | To measure |
| **Weekly Active Users** | >40% of total | To measure |
| **Monthly Retention** | >70% | To measure |
| **NPS Score** | >50 | To measure |
| **Feature Adoption** | >80% try 2+ features | To measure |

### Feature-Specific KPIs

| Feature | Metric | Target |
|---------|--------|--------|
| Pitch Deck | Deck creation rate | >60% of users |
| Events | Registration conversion | >25% |
| Jobs | Application submission | >15% |
| Perks | Redemption rate | >20% |
| Dashboard | Daily active usage | >30% |

---

**Created**: October 20, 2025
**Last Updated**: October 20, 2025
**Status**: ✅ Complete - All 7 journeys documented with Mermaid diagrams
**Next**: Use these diagrams for user testing, feature prioritization, and product roadmap planning
