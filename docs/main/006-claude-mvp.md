# Claude Code MVP Guide - Medellín Spark

> **Production-ready guide for building and launching the Medellín Spark AI Hub MVP using Claude Code**

**Version:** 1.0 MVP  
**Last Updated:** 2025-10-12  
**Target:** Launch-ready platform in 3-5 weeks

---

## Table of Contents

1. [What We're Building](#what-were-building)
2. [Tech Stack & Why](#tech-stack--why)
3. [MVP Core Features](#mvp-core-features)
4. [Quick Start Setup](#quick-start-setup)
5. [User Journey Workflows](#user-journey-workflows)
6. [Prompting Best Practices](#prompting-best-practices)
7. [The 10 Golden Rules](#the-10-golden-rules)
8. [Real Development Workflows](#real-development-workflows)
9. [Essential Commands](#essential-commands)
10. [Launch Checklist](#launch-checklist)

---

## What We're Building

**Medellín Spark** is an AI-powered startup hub platform connecting Colombia's innovation ecosystem.

### MVP Scope (3-5 Weeks)

**Must Have:**
- ✅ User authentication (email + social login)
- ✅ Event listing and registration
- ✅ Basic job board (post jobs, apply)
- ✅ Startup profiles with verification
- ✅ Pitch deck wizard (conversational UI)

**Excluded from MVP:**
- ❌ Payment processing (manual initially)
- ❌ Advanced analytics dashboard
- ❌ AI-powered job matching
- ❌ Mobile apps
- ❌ Multi-language support

### Success Metrics

- 50+ startup profiles created
- 5+ events posted and registered
- 20+ job applications submitted
- 10+ pitch decks generated
- <2s page load time
- Zero critical security issues

---

## Tech Stack & Why

### Core Stack

```
Frontend:   React 18 + TypeScript + Vite
UI:         shadcn/ui + Tailwind CSS
Backend:    Supabase (PostgreSQL + Auth + Storage)
AI:         Claude Code + Task Master AI
Deploy:     Vercel (frontend) + Supabase Cloud
```

### Why Each Technology?

**React + TypeScript + Vite**
- **Speed:** Vite dev server starts in <1 second
- **Type Safety:** Catch bugs before runtime
- **Modern:** Latest React patterns (hooks, suspense)

**shadcn/ui + Tailwind**
- **Consistency:** Pre-built accessible components
- **Fast:** Copy-paste components, no npm bloat
- **Customizable:** Full design system control

**Supabase**
- **All-in-one:** Database + Auth + Storage + Edge Functions
- **Free tier:** 500MB database, 50K monthly active users
- **Real-time:** Built-in subscriptions and webhooks
- **Fast:** <100ms queries with proper indexes

**Claude Code + Task Master**
- **AI Pair Programming:** Context-aware code generation
- **Task Management:** Break MVP into trackable subtasks
- **Quality:** Automated testing and security reviews

---

## MVP Core Features

### 1. Authentication
```typescript
Features:
- Email/password signup and login
- Google OAuth
- Profile creation on first login
- Session management (7-day expiry)
```

**Database Tables:** `profiles`  
**Supabase Features:** Auth, RLS policies  
**Estimated Time:** 1 week

### 2. Event Management
```typescript
Features:
- Create event (organizers only)
- List upcoming events
- Event detail page
- Registration (name + email)
- Capacity tracking
```

**Database Tables:** `events`, `registrations`, `organizers`, `venues`  
**Key Components:** `EventCard`, `EventList`, `EventDetail`, `RegistrationForm`  
**Estimated Time:** 1.5 weeks

### 3. Job Board
```typescript
Features:
- Post job (companies only)
- List active jobs
- Job detail page
- Simple application form
- Company profiles
```

**Database Tables:** `jobs`, `companies`, `applications`, `candidates`  
**Key Components:** `JobCard`, `JobList`, `JobDetail`, `ApplicationForm`  
**Estimated Time:** 1 week

### 4. Startup Profiles
```typescript
Features:
- Create startup profile
- Display startup directory
- Verification badge (manual admin approval)
- Basic stats (team size, stage, industry)
```

**Database Tables:** `startup_profiles`  
**Key Components:** `StartupCard`, `StartupDirectory`, `StartupProfile`  
**Estimated Time:** 3 days

### 5. Pitch Deck Wizard
```typescript
Features:
- ChatGPT-style conversational UI
- 10-step guided flow
- Save progress
- Generate PDF deck
- History of past sessions
```

**Database Tables:** `wizard_sessions`  
**Key Components:** `ChatLayout`, `WizardSteps`, `DeckGenerator`  
**Estimated Time:** 1 week

---

## Quick Start Setup

### Prerequisites

```bash
# Required
- Node.js 18+
- Git
- Anthropic API key
- Supabase account

# Recommended
- VS Code with Claude extension
- Task Master CLI
```

### 5-Minute Setup

```bash
# 1. Clone and install
git clone https://github.com/medellinai/medellin-spark.git
cd medellin-spark
npm install

# 2. Environment setup
cp .env.example .env
# Edit .env with your keys:
# - ANTHROPIC_API_KEY
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY

# 3. Database setup
npx supabase start               # Local development
npx supabase db reset           # Apply migrations

# 4. Start development
npm run dev                     # Frontend on :5173

# 5. Launch Claude Code
claude
```

### Verify Setup

```bash
# In Claude session:
"List all database tables"
# Should show: profiles, events, jobs, etc.

"Show me the EventCard component structure"
# Should read: src/components/EventCard.tsx

task-master list
# Should show MVP task breakdown
```

---

## User Journey Workflows

### Journey 1: Startup Founder Profile Creation

**Goal:** New founder creates profile to access platform

#### Step-by-Step

```bash
# Task Master Task: 1.1 - Implement profile creation
task-master show 1.1

# Prompt to Claude:
"Implement profile creation flow using Task Master task 1.1:

CONTEXT:
- New user just authenticated via Supabase Auth
- Profile table exists (see supabase/migrations/002_schema.sql)
- Must create profile on first login

REQUIREMENTS:
1. ProfileForm component with fields:
   - full_name (required)
   - bio (optional, max 500 chars)
   - company (optional)
   - job_title (optional)
   - avatar_url (optional, file upload to Supabase Storage)

2. Form validation with Zod schema

3. Auto-create profile on auth.users insert via trigger
   (see migration 004_functions_triggers.sql)

4. Handle errors (duplicate email, upload failures)

5. Tests for happy path + error cases

DELIVERABLES:
- ProfileForm.tsx component
- useProfile hook for mutations
- Zod schema
- Unit tests
- Integration test with Supabase

SUCCESS CRITERIA:
- Form validates before submit
- Profile created in database
- User redirected to dashboard
- Avatar uploads to 'avatars' bucket"
```

#### Expected Claude Response

```markdown
I'll implement the profile creation flow. Let me break this into steps:

1. First, I'll check the existing schema:
[Reads migration files]

2. Create the Zod schema:
[Generates schema file]

3. Build ProfileForm component:
[Generates component with file upload]

4. Create useProfile hook:
[Generates React Query mutation hook]

5. Write tests:
[Generates test suite]

Would you like me to proceed with implementation?
```

### Journey 2: Event Organizer Creates Event

**Goal:** Organizer posts networking event for next month

#### Prompt

```bash
"Use backend-architect and frontend-developer agents to implement event creation:

SCENARIO:
Ruta N innovation center wants to post 'Startup Pitch Night' event for next month.

REQUIREMENTS:
1. Only verified organizers can create events
2. Form fields:
   - title, description, event_date, end_date
   - venue (select from existing or create new)
   - capacity (optional, null = unlimited)
   - image upload
   - ticket tiers (early bird + general)

3. Validation:
   - event_date must be future
   - end_date must be after event_date
   - capacity must be > 0 if set
   - At least 1 ticket tier required

4. Backend:
   - RLS policy: only organizers can insert
   - Trigger: auto-set slug from title
   - Return created event with ID

5. Frontend:
   - Multi-step form (event details → venue → tickets)
   - Image preview before upload
   - Save draft functionality

SUCCESS:
- Event appears in upcoming events list
- Registration page is live
- Email confirmation sent to organizer

FILES TO MODIFY:
- src/components/forms/EventForm.tsx
- src/hooks/useEvents.ts
- src/pages/organizer/CreateEvent.tsx"
```

### Journey 3: Developer Deploys MVP

**Goal:** First production deployment with zero downtime

#### Workflow

```bash
# Use deployment-engineer agent
"Guide me through MVP deployment to production:

CURRENT STATE:
- All features built and tested locally
- Supabase staging environment ready
- Vercel account connected

REQUIREMENTS:
1. Deploy database migrations to production
2. Deploy frontend to Vercel
3. Set up environment variables
4. Verify deployment
5. Rollback plan if issues

CONSTRAINTS:
- Zero downtime (staging data can be lost)
- All secrets in environment variables
- Enable Vercel Analytics

STEPS:
1. Pre-deployment checklist
2. Supabase production deployment
3. Vercel deployment
4. Smoke tests
5. Monitoring setup

Provide exact commands and verification steps."
```

---

## Prompting Best Practices

### The Claude Pyramid (from Anthropic)

Every effective prompt follows this structure:

```
    ┌──────────────┐
    │  1. GOAL     │  ← What you want (1 sentence)
    ├──────────────┤
    │ 2. CONTEXT   │  ← Background info (2-3 sentences)
    ├──────────────┤
    │  3. DATA     │  ← Specific files, errors, examples
    ├──────────────┤
    │ 4. ACTION    │  ← Steps to take (numbered list)
    ├──────────────┤
    │ 5. FORMAT    │  ← Expected output
    └──────────────┘
```

### Examples: Weak → Strong

#### ❌ Weak Prompt

```
"Fix the event form bug"
```

**Problems:**
- No context about which form
- No information about the bug
- No success criteria

#### ✅ Strong Prompt

```markdown
**GOAL:** Fix event date validation bug in CreateEvent form

**CONTEXT:**
Users can submit events with past dates. The form shows green checkmark
but API returns 400 error "event_date must be future". Error not displayed to user.

**DATA:**
- File: src/components/forms/EventForm.tsx (line 45-67)
- Validation: src/schemas/eventSchema.ts
- Error: API returns {"code":"PGRST116","message":"..."}

**ACTION:**
1. Add client-side validation: event_date > now()
2. Display API errors in toast notification
3. Disable submit button if validation fails
4. Add test case for past date rejection

**FORMAT:**
- Show exact code changes with line numbers
- Include updated validation schema
- Provide test command to verify fix
```

### Template Library

#### Feature Implementation Template

```markdown
**Feature:** [Name]

**User Story:** As [role], I want [goal] so that [benefit]

**Context:**
- Related to [existing feature/component]
- Must integrate with [system]
- Design follows [pattern/guideline]

**Requirements:**
1. [Functional requirement]
2. [Non-functional: performance, security]
3. [Edge case handling]

**Deliverables:**
- [ ] Component/module code
- [ ] Unit tests (>80% coverage)
- [ ] Integration test
- [ ] Documentation

**Success Criteria:**
- [Measurable outcome 1]
- [Measurable outcome 2]

**Files Involved:**
- src/components/...
- src/hooks/...
```

#### Debugging Template

```markdown
**Problem:** [Brief description]

**Expected:** [What should happen]

**Actual:** [What actually happens]

**Evidence:**
```bash
[Error message or logs]
```

**Environment:**
- Browser: Chrome 120
- OS: macOS 14
- User: Authenticated
- Recent changes: [what was modified]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Error occurs]

**Question:** [Specific question about root cause]
```

#### Code Review Template

```markdown
**Review:** [Feature/PR name]

**Focus:**
- [ ] Security (OWASP Top 10)
- [ ] Performance (Core Web Vitals)
- [ ] Tests (>80% coverage)
- [ ] Accessibility (WCAG 2.1 AA)

**Specific Concerns:**
- [Concern 1]
- [Concern 2]

**Context:**
- Critical for: [business impact]
- Performance target: [metric]
- User impact: [scope]
```

---

## The 10 Golden Rules

### 1. Think in Conversations, Not Commands

❌ **Don't:** Treat Claude like a compiler
```
"Create component EventCard"
```

✅ **Do:** Provide context like explaining to a teammate
```
"I need an EventCard component for our event listing page. It should display
event title, date, venue, and a registration button. Match our design system
(shadcn/ui). Here's a similar component for reference: src/components/JobCard.tsx"
```

**Why:** Claude understands intent better than instructions ([Anthropic Best Practices](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices))

### 2. Show, Don't Tell

❌ **Don't:** Describe what you want in abstract terms
```
"Make the form validation better"
```

✅ **Do:** Show examples of current behavior and desired outcome
```
"Current: Form allows empty email field and shows generic error 'Invalid input'

Desired: 
- Email field required (red border if empty)
- Specific error: 'Email is required'
- Email format validation: 'Please enter a valid email'

Example from our design system: src/components/forms/LoginForm.tsx"
```

**Why:** Examples eliminate ambiguity ([Builder.io Guide](https://www.builder.io/blog/claude-code))

### 3. Use Task Master for Complex Work

❌ **Don't:** Try to build entire features in one prompt
```
"Build the complete event registration system with payments, emails, and analytics"
```

✅ **Do:** Break down with Task Master
```bash
# Create task with AI breakdown
task-master add-task --prompt="Event registration with Stripe payments" --research

# Task Master generates:
# 5.1: Design registration database schema
# 5.2: Create Stripe webhook handler
# 5.3: Build registration form UI
# 5.4: Implement email notifications
# 5.5: Add analytics tracking
# 5.6: Write integration tests

# Work incrementally
task-master next
```

**Why:** Complex tasks need structured breakdown ([Task Master Docs](https://docs.taskmaster.ai))

### 4. Leverage Agent Expertise

❌ **Don't:** Use generic Claude for everything
```
"Review my code for issues"
```

✅ **Do:** Invoke specialized agents
```
"Use security-auditor to check authentication flow for OWASP Top 10 vulnerabilities,
especially SQL injection in the login endpoint and XSS in profile rendering"

"Use performance-engineer to analyze why EventList renders 50ms slower with 100+ events"

"Use database-optimizer to explain this slow query and suggest indexes:
SELECT * FROM events WHERE status = 'published' AND event_date > NOW()"
```

**Why:** Specialists provide deeper expertise ([Dinanjana Medium](https://dinanjana.medium.com/mastering-the-vibe-claude-code-best-practices-that-actually-work-823371daf64c))

### 5. Verify AI Outputs

❌ **Don't:** Trust generated code blindly
```
[Claude generates code]
[Copy-paste to production]
```

✅ **Do:** Test and validate
```bash
# After Claude generates EventCard component

# 1. Understand the code
"Explain the key parts of this EventCard implementation"

# 2. Run tests
npm test src/components/EventCard.test.tsx

# 3. Security review
"Use security-auditor to check for XSS in event title/description rendering"

# 4. Manual verification
npm run dev
# Test: Create event with <script>alert('xss')</script> in title
```

**Why:** AI makes mistakes; humans verify ([Nikiforov Blog](https://nikiforovall.blog/productivity/2025/06/13/claude-code-rules.html))

### 6. Maintain Session Focus

❌ **Don't:** Jump between unrelated tasks
```
Session 1:
- Build EventCard
- Fix authentication bug
- Update database schema
- Refactor navigation
[Context overload]
```

✅ **Do:** One focused goal per session
```
Session 1: EventCard component
- Design component structure
- Implement with tests
- Review and refine

Session 2: Navigation refactor
[Fresh context, clear scope]
```

**Why:** Claude maintains better context with focused sessions ([ClaudeLog Tips](https://claudelog.com/))

### 7. Document Decisions in CLAUDE.md

❌ **Don't:** Repeat instructions every session
```
Every session:
"Remember, we use shadcn/ui for components"
"Validate all forms with Zod"
"Store dates in UTC, display in America/Bogota"
```

✅ **Do:** Write once in CLAUDE.md
```markdown
# CLAUDE.md

## UI Components
- Use shadcn/ui components exclusively
- No custom CSS modules (Tailwind only)

## Form Validation
- All forms use Zod schemas
- Schemas in src/schemas/

## Dates & Times
- Store: UTC in database
- Display: America/Bogota timezone
- Format: "MMM DD, YYYY h:mm A" (Jan 15, 2025 2:30 PM)
```

Claude reads this automatically on session start.

**Why:** Reduces repetition, ensures consistency ([Siddharth Complete Guide](https://www.siddharthbharath.com/claude-code-the-complete-guide/))

### 8. Commit Incrementally

❌ **Don't:** Accumulate 50 changed files
```
[Work for 3 days]
[300 lines changed across 50 files]
git commit -m "Lots of changes"
```

✅ **Do:** Commit after each logical unit
```bash
# After completing EventCard component
git add src/components/EventCard.tsx src/components/EventCard.test.tsx
git commit -m "feat: add EventCard component with responsive design"

# Use Claude's git integration
"Review my changes and create a semantic commit message"
# Claude analyzes git diff and suggests:
# "feat(events): add EventCard with registration button
# 
# - Implements responsive card layout
# - Adds registration CTA
# - Includes loading and error states
# - Test coverage: 85%"
```

**Why:** Small commits = easier review, better history ([Git Best Practices](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository))

### 9. Use MCP for External Services

❌ **Don't:** Copy-paste data between tools
```
# Manual workflow:
1. Open Supabase dashboard
2. Copy table structure
3. Paste into Claude chat
4. Get response
5. Copy SQL back to Supabase
```

✅ **Do:** Let Claude access services directly
```bash
# Claude uses MCP automatically:
"Show me all tables in the database"
# Uses: mcp__supabase__list_tables

"Add an index on events(event_date, status)"
# Uses: mcp__supabase__apply_migration

"What's the next task I should work on?"
# Uses: mcp__task-master-ai__next_task
```

**Why:** Direct integration = faster, fewer errors ([MCP Protocol](https://modelcontextprotocol.io))

### 10. Test in Context

❌ **Don't:** Test in isolation only
```bash
# Component works alone
npm test EventCard.test.tsx  # ✅ Pass

# But breaks in real page
[Production: EventCard crashes in EventList]
```

✅ **Do:** Test integration points
```bash
# Unit test
npm test EventCard.test.tsx

# Integration test
npm test EventList.integration.test.tsx
# Tests: EventCard within list, with real API data

# E2E test
npm run test:e2e events
# Tests: User clicks EventCard → sees event detail → registers

# Manual verification
npm run dev
# Test real user flow
```

**Why:** Integration failures are more common than unit failures ([Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library))

---

## Real Development Workflows

### Workflow 1: Feature Implementation (Event Registration)

**Goal:** Allow users to register for events

#### Task Breakdown with Task Master

```bash
# Step 1: Create feature task
task-master add-task \
  --prompt="Implement event registration with capacity tracking and email confirmation" \
  --research

# Task Master generates:
# 3.1: Design registration schema (events, registrations, tickets)
# 3.2: Create registration API endpoints
# 3.3: Build registration form component
# 3.4: Add capacity validation
# 3.5: Implement email notifications
# 3.6: Write integration tests
```

#### Implementing Each Subtask

**Subtask 3.1: Database Schema**

```bash
task-master show 3.1

# Prompt:
"Implement task 3.1 - Design registration schema:

CONTEXT:
- Users register for events by filling out a form
- Events have capacity limits (null = unlimited)
- Track registration status (pending, confirmed, cancelled)
- Support multiple ticket tiers per event

REQUIREMENTS:
1. Tables: registrations, tickets
2. Foreign keys: event_id, profile_id, ticket_id
3. Constraints:
   - One registration per user per event
   - Sold count <= ticket capacity
   - Registered count <= event capacity

4. RLS policies:
   - Users see own registrations
   - Organizers see registrations for their events

FILES:
- Create: supabase/migrations/[timestamp]_registration_schema.sql
- Reference: supabase/migrations/20251012000002_schema.sql

DELIVERABLE:
- Migration file with tables, constraints, indexes, RLS policies"
```

**Subtask 3.3: Registration Form**

```bash
task-master show 3.3

# Prompt:
"Build registration form component for task 3.3:

CONTEXT:
- Event detail page shows 'Register' button
- Click opens modal with registration form
- Form submits to POST /api/registrations

REQUIREMENTS:
Component: src/components/forms/RegistrationForm.tsx

Props:
- eventId: string
- availableTickets: Ticket[]
- capacity: number | null
- registeredCount: number

Form Fields:
- ticket: Select (required, dropdown of ticket tiers)
- agree_terms: Checkbox (required)

Validation:
- Check capacity before submit
- Show 'Event Full' if no space
- Disable submit if terms not agreed

States:
- Loading: Show spinner
- Success: Show confirmation, close modal
- Error: Show toast with error message

Integration:
- Use useRegistration() hook (create this)
- Call Supabase RPC: register_for_event(event_id, ticket_id)
- Optimistic UI update

DELIVERABLES:
- RegistrationForm.tsx
- useRegistration.ts hook
- RegistrationForm.test.tsx"
```

#### Completing the Feature

```bash
# After each subtask:
task-master set-status --id=3.1 --status=done
task-master set-status --id=3.2 --status=done
# ... etc

# Final verification:
task-master show 3

# Should see all subtasks marked 'done'
# Test end-to-end flow
# Deploy to staging
```

### Workflow 2: Debugging Production Issue

**Scenario:** Registration form submits but creates duplicate entries

#### Step 1: Gather Evidence

```bash
"Analyze registration duplication issue:

PROBLEM:
Users click 'Register' button once, but 2 registrations appear in database.

SYMPTOMS:
- Button shows loading spinner for ~2 seconds
- Success toast appears once
- Database has 2 identical registrations (different IDs, same timestamp)
- Only happens on slow network (3G throttling)

ENVIRONMENT:
- Production (Vercel + Supabase)
- Browser: Safari iOS 17
- User: Authenticated

FILES:
- src/components/forms/RegistrationForm.tsx
- src/hooks/useRegistration.ts
- supabase/functions/register-event/index.ts

LOGS:
[Paste Supabase logs showing 2 INSERT statements]

QUESTION:
What's causing duplicate inserts and how do I prevent it?"
```

#### Step 2: Claude's Diagnosis

```markdown
I found the issue in src/hooks/useRegistration.ts:42-48

**Root Cause:** Double submission due to React Query retry + slow network

```typescript
// Current code (PROBLEMATIC):
const mutation = useMutation({
  mutationFn: registerForEvent,
  retry: 3,  // ❌ Retries even on success (race condition)
});
```

**What's happening:**
1. User clicks submit
2. API call starts (slow network)
3. React Query waits for response
4. Network is slow, query times out
5. React Query retries automatically
6. Original request completes → insert 1
7. Retry request completes → insert 2

**Fix:**
```typescript
// Updated code:
const mutation = useMutation({
  mutationFn: registerForEvent,
  retry: false,  // ✅ No retries for mutations
  onMutate: () => {
    // Disable button immediately
    setIsSubmitting(true);
  },
});

// Add idempotency key to API:
const idempotencyKey = `${userId}-${eventId}-${Date.now()}`;
```

**Files to modify:**
1. src/hooks/useRegistration.ts - Remove retry
2. src/components/forms/RegistrationForm.tsx - Add button disabled state
3. supabase/functions/register-event/index.ts - Add idempotency check

**Test:**
1. Enable 3G throttling in DevTools
2. Click register button once
3. Verify only 1 database entry created
```

### Workflow 3: Code Review Before Launch

**Scenario:** Final security and performance review before MVP launch

#### Pre-Launch Review Prompt

```bash
"Comprehensive pre-launch review for MVP:

SCOPE: Entire codebase, focus on security and performance

AGENTS:
- security-auditor: OWASP Top 10 compliance
- performance-engineer: Core Web Vitals optimization
- architect-review: Design pattern validation
- test-automator: Coverage analysis

CRITICAL FLOWS:
1. Authentication (login, signup, password reset)
2. Event registration (form submit, capacity check)
3. Job application (file upload, email notification)
4. Payment processing (if implemented)

REQUIREMENTS:
✅ Security:
- No SQL injection vulnerabilities
- XSS prevention in user-generated content
- CSRF tokens on state-changing operations
- Secure session management
- Input validation on all forms

✅ Performance:
- LCP < 2.5s (Largest Contentful Paint)
- FID < 100ms (First Input Delay)
- CLS < 0.1 (Cumulative Layout Shift)
- Database queries < 200ms

✅ Quality:
- Test coverage > 80%
- No TypeScript 'any' types
- Proper error boundaries
- Accessibility (WCAG 2.1 AA)

DELIVERABLE:
Prioritized issues list:
- CRITICAL: Must fix before launch
- HIGH: Fix this week
- MEDIUM: Next sprint
- LOW: Future improvement"
```

#### Review Report Format

```markdown
# MVP Launch Review Report

## CRITICAL Issues (Block Launch)

### 🔴 SEC-001: SQL Injection in Search
**Location:** src/api/events/search.ts:23
**Risk:** High - User input directly in SQL query
**Impact:** Database compromise, data breach
**Fix:**
```typescript
// BEFORE (vulnerable):
const query = `SELECT * FROM events WHERE title LIKE '%${searchTerm}%'`;

// AFTER (safe):
const { data } = await supabase
  .from('events')
  .select('*')
  .ilike('title', `%${searchTerm}%`);
```
**Test:** Try search term: `'; DROP TABLE events;--`

---

### 🔴 PERF-001: N+1 Query in Event List
**Location:** src/pages/Events.tsx:45
**Impact:** 200+ database queries for 20 events
**Metric:** Page load 8.5s (target: <2s)
**Fix:**
```typescript
// BEFORE:
events.map(event => {
  const registrations = await getRegistrations(event.id);  // ❌ N+1
});

// AFTER:
const { data: events } = await supabase
  .from('events')
  .select(`
    *,
    registrations(count)  // ✅ Single query
  `);
```

---

## HIGH Priority (Fix This Week)

### 🟡 SEC-002: Missing CSRF Protection
**Location:** All POST/PUT/DELETE endpoints
**Risk:** Medium - Cross-site request forgery
**Fix:** Add CSRF token middleware

### 🟡 TEST-001: Low Coverage in Auth Module
**Coverage:** 52% (target: 80%)
**Missing:** Password reset flow, OAuth error handling

## MEDIUM Priority (Next Sprint)

### 🟢 PERF-002: Large Bundle Size
**Current:** 850KB (target: <500KB)
**Cause:** Unused dependencies
**Fix:** Tree-shaking optimization

## Summary

**Launch Readiness:** ❌ NOT READY
**Blockers:** 2 critical security issues
**ETA to Launch:** 2-3 days after fixes
**Recommended:** Fix CRITICAL issues, deploy to staging, retest
```

---

## Essential Commands

### Claude Code CLI

```bash
# Start Claude
claude                              # Interactive session
claude -p "your prompt here"        # Headless mode

# MCP debugging
claude --mcp-debug                  # Show MCP connection logs

# Clear context
/clear                              # Reset conversation

# Plugin management
/plugin                             # List installed plugins
/plugin install <name>              # Install plugin
/help                               # Show all commands
```

### Task Master

```bash
# Project setup
task-master init                    # Initialize in project
task-master models --setup          # Configure AI models

# Task management
task-master list                    # Show all tasks
task-master next                    # Get next available task
task-master show <id>               # View task details
task-master add-task --prompt="..." # Create task

# Status updates
task-master set-status --id=<id> --status=done
task-master set-status --id=<id> --status=in-progress

# Advanced
task-master expand --id=<id> --research    # Break into subtasks
task-master analyze-complexity              # Identify complex tasks
```

### Supabase (via MCP)

```bash
# Database operations (Claude does this automatically)
"Show all tables"                   # Uses: mcp__supabase__list_tables
"Run SELECT * FROM events"          # Uses: mcp__supabase__execute_sql
"Apply migration 003_indexes.sql"   # Uses: mcp__supabase__apply_migration

# Edge Functions
"List all Edge Functions"           # Uses: mcp__supabase__list_edge_functions
"Deploy register-event function"    # Uses: mcp__supabase__deploy_edge_function

# Documentation
"Search Supabase docs for RLS"      # Uses: mcp__supabase__search_docs
```

### Development Shortcuts

```bash
# Start everything
npm run dev                         # Vite dev server (:5173)
supabase start                      # Local Supabase
claude                              # Claude Code session

# Testing
npm test                            # Run all tests
npm test -- --coverage              # With coverage
npm run test:e2e                    # End-to-end tests

# Building
npm run build                       # Production build
npm run preview                     # Preview production build

# Database
supabase db reset                   # Reset local DB
supabase db diff                    # Generate migration from changes
supabase db push                    # Push to remote
```

---

## Launch Checklist

### Week Before Launch

- [ ] **Security Audit**
  ```bash
  "Use security-auditor to perform OWASP Top 10 scan on entire codebase"
  ```
- [ ] **Performance Optimization**
  ```bash
  "Use performance-engineer to analyze Core Web Vitals and optimize"
  ```
- [ ] **Test Coverage**
  ```bash
  npm test -- --coverage
  # Target: >80% coverage
  ```
- [ ] **Accessibility Review**
  ```bash
  "Check WCAG 2.1 AA compliance for all public pages"
  ```
- [ ] **Database Backups**
  ```bash
  # Supabase automatic daily backups enabled
  ```

### Day Before Launch

- [ ] **Deploy to Staging**
  ```bash
  # Frontend
  vercel deploy --prod

  # Database migrations
  supabase link --project-ref staging-xyz
  supabase db push
  ```
- [ ] **Smoke Tests**
  ```bash
  # Test critical flows:
  # - Signup → Login
  # - Create Event → Register
  # - Post Job → Apply
  # - Generate Pitch Deck
  ```
- [ ] **Load Testing**
  ```bash
  # Simulate 100 concurrent users
  # Verify < 2s response time
  ```
- [ ] **Monitoring Setup**
  ```bash
  # Enable Vercel Analytics
  # Set up Supabase alerts
  # Configure error tracking (Sentry)
  ```

### Launch Day

- [ ] **Final Deployment**
  ```bash
  # Production deployment
  vercel deploy --prod

  # Database (zero-downtime)
  supabase link --project-ref prod-xyz
  supabase db push
  ```
- [ ] **Verify Production**
  ```bash
  # Health check
  curl https://medellin-spark.com/api/health

  # Test critical flows manually
  # Check error logs (should be empty)
  ```
- [ ] **Announce**
  ```bash
  # Social media posts
  # Email to waitlist
  # Update status page
  ```

### Week After Launch

- [ ] **Monitor Metrics**
  ```bash
  # Track:
  # - User signups
  # - Event registrations
  # - Job applications
  # - Error rate
  # - Performance (Core Web Vitals)
  ```
- [ ] **Gather Feedback**
  ```bash
  # User interviews
  # Support tickets
  # Analytics review
  ```
- [ ] **Hot Fixes**
  ```bash
  # Address critical bugs immediately
  # Plan next sprint priorities
  ```

---

## Next Steps

### Immediate Actions (Today)

1. **Setup Development Environment**
   ```bash
   # Follow Quick Start Setup above
   # Verify: Can run dev server, Claude Code, Task Master
   ```

2. **Review MVP Task List**
   ```bash
   task-master list
   # Understand task breakdown
   # Identify dependencies
   ```

3. **Start First Feature**
   ```bash
   task-master next
   # Begin with authentication or event listing
   ```

### This Week

1. **Complete Core Features**
   - Authentication (signup, login, profile)
   - Event listing and detail pages
   - Basic registration flow

2. **Setup CI/CD**
   - Vercel auto-deploy on push to `main`
   - Supabase staging environment

3. **Write Tests**
   - Unit tests for hooks
   - Integration tests for API
   - E2E test for happy path

### Next 2-3 Weeks

1. **Remaining Features**
   - Job board
   - Startup profiles
   - Pitch deck wizard

2. **Polish & Optimization**
   - Performance tuning
   - Security hardening
   - Accessibility improvements

3. **Pre-Launch Checklist**
   - Security audit
   - Load testing
   - Documentation

### Resources

- **Task Master Guide:** `.taskmaster/CLAUDE.md`
- **Supabase MCP:** `docs/supabase/03-mcp-supa.md`
- **Plugin Documentation:** `docs/plugins/`
- **Database Migrations:** `supabase/MIGRATION_GUIDE.md`

---

**🚀 Ready to build? Start here:**

```bash
claude

# First prompt:
"I'm starting the Medellín Spark MVP. Show me the next task from Task Master 
and help me implement it following the Claude Pyramid structure."
```

---

**Last Updated:** 2025-10-12  
**Team:** Medellín Spark AI Hub  
**License:** MIT  
**Questions?** Check `CLAUDE.md` for detailed guide or create an issue in the repository.
