# Plugin Adoption Plan for Medellin Spark

## Project Overview

**Tech Stack:** React + TypeScript + Vite + shadcn/ui + TailwindCSS
**Project Type:** Startup ecosystem platform with events, pitch decks, jobs, and dashboard features

---

## Phase 1: Core Development Essentials (Start Here)

### Why These First?
You're actively building features. These plugins handle daily tasks: fixing bugs, writing clean code, understanding the codebase, and shipping features faster.

### Install Now

```bash
/plugin install claude-code-essentials
/plugin install full-stack-development
/plugin install testing-quality-suite
```

### Real-World Usage

#### 1. **claude-code-essentials** - Your Daily Driver

**What it does:** Code explanation, debugging, docs, PR reviews

**Use when:**
- "Explain how the PitchDeckWizard state management works"
- "Debug why dashboard events aren't loading"
- "Generate JSDoc comments for all utility functions"
- "Review my PR before I push"

**Example scenario:**
```
You: "The contact form submission isn't working. Debug it."
→ Uses debugger agent to trace the issue
→ Finds missing form validation
→ Shows exact line numbers with fixes
```

#### 2. **full-stack-development** - Feature Implementation

**What it does:** Coordinates backend API → frontend UI → testing → deployment

**Use when:**
- "Build user authentication system"
- "Add payment processing for event tickets"
- "Create admin panel for managing startups"
- "Implement real-time notifications"

**Example scenario:**
```
You: "Add user profiles with avatar upload"
→ backend-architect: Designs API endpoints
→ frontend-developer: Creates React components
→ test-automator: Writes unit + integration tests
→ security-auditor: Checks for vulnerabilities
Result: Complete, tested feature in one workflow
```

#### 3. **testing-quality-suite** - Prevent Bugs

**What it does:** TDD workflows, automated test generation, quality gates

**Use when:**
- "Write tests for the event registration flow"
- "Set up integration tests for the dashboard"
- "Add E2E tests for pitch deck wizard"

**Example scenario:**
```
You: "Write comprehensive tests for Jobs page"
→ Generates unit tests for components
→ Creates integration tests for data fetching
→ Adds E2E tests for user workflows
→ Sets up test coverage reporting
```

---

## Phase 2: Quality & Security (Before Launch)

### Why These Next?
You're approaching launch. Need to ensure code quality, security, and performance before users arrive.

### Install Before Production

```bash
/plugin install code-quality-review
/plugin install security-scanning
/plugin install performance-optimization
```

### Real-World Usage

#### 4. **code-quality-review** - Polish Your Code

**What it does:** Multi-agent code review (architecture + security + performance)

**Use when:**
- "Review the entire dashboard module"
- "Check pitch deck wizard for best practices"
- "Audit codebase before launch"

**Example scenario:**
```
You: "Full review of authentication system"
→ architect-review: Checks design patterns
→ security-auditor: Finds auth vulnerabilities
→ performance-engineer: Identifies bottlenecks
→ test-automator: Checks test coverage
Result: Comprehensive quality report with fixes
```

#### 5. **security-scanning** - Lock It Down

**What it does:** SAST analysis, dependency scanning, OWASP compliance

**Use when:**
- "Scan for security vulnerabilities"
- "Check dependencies for CVEs"
- "Validate OWASP Top 10 compliance"

**Example scenario:**
```
You: "Security audit before production"
→ Scans all dependencies (finds 3 vulnerable packages)
→ Analyzes code for XSS/CSRF vulnerabilities
→ Checks API endpoints for injection flaws
→ Provides priority-ranked fixes
```

#### 6. **performance-optimization** - Make It Fast

**What it does:** Profiling, database optimization, caching, Core Web Vitals

**Use when:**
- "Dashboard is loading slowly"
- "Optimize event list performance"
- "Improve Lighthouse scores"

**Example scenario:**
```
You: "Events page is slow with 1000+ events"
→ performance-engineer: Profiles the page
→ Identifies: Large JSON payloads, no pagination
→ Implements: Virtual scrolling + pagination
→ Result: 3.2s → 0.8s load time
```

---

## Phase 3: Scaling & Operations (Post-Launch)

### Why These Later?
Your app is live. Now focus on monitoring, incidents, and scaling infrastructure.

### Install When Scaling

```bash
/plugin install incident-diagnostics
/plugin install observability-monitoring
/plugin install deployment-orchestration
```

### Real-World Usage

#### 7. **incident-diagnostics** - Fix Production Issues Fast

**What it does:** Production triage, root cause analysis, distributed tracing

**Use when:**
- "Users can't register for events - fix now!"
- "Database queries timing out in production"
- "Trace why payment processing fails randomly"

**Example scenario:**
```
Production down! "500 errors on event registration"
→ incident-responder: Analyzes logs immediately
→ error-detective: Finds race condition in booking
→ Identifies: Double-booking bug in concurrent requests
→ Provides: Immediate fix + permanent solution
Result: Back online in 15 minutes
```

#### 8. **observability-monitoring** - See Everything

**What it does:** Metrics, logging, tracing, SLO implementation

**Use when:**
- "Set up production monitoring"
- "Create Grafana dashboards"
- "Track API response times"

**Example scenario:**
```
You: "Monitor critical user flows"
→ Sets up metrics for: registrations, payments, events
→ Creates dashboards showing: uptime, latency, errors
→ Configures alerts for: API errors > 5%, p95 > 2s
Result: Proactive monitoring before users complain
```

#### 9. **deployment-orchestration** - Ship Safely

**What it does:** Pre-flight checks, rollout strategies, automated rollback

**Use when:**
- "Deploy v2.0 with zero downtime"
- "Set up canary deployments"
- "Automate rollback if errors spike"

**Example scenario:**
```
You: "Deploy payment system update safely"
→ Pre-flight: Runs tests, checks dependencies
→ Strategy: Canary to 5% → 25% → 100% users
→ Monitoring: Watches error rates during rollout
→ Auto-rollback: Triggers if errors > threshold
Result: Safe deployment with instant rollback option
```

---

## Phase 4: Advanced Capabilities (Optional)

### When You Need Them

#### Content & Marketing
```bash
/plugin install seo-content-suite      # SEO optimization for blog/events
/plugin install documentation-generation # Auto-generate API docs
```

**Use for:**
- "Optimize blog posts for SEO"
- "Generate OpenAPI specs for API"
- "Create Mermaid diagrams of architecture"

#### Database Management
```bash
/plugin install database-operations    # Query optimization, migrations
```

**Use for:**
- "Optimize slow event search queries"
- "Design schema for user analytics"
- "Create zero-downtime migration for user profiles"

#### Specialized Features
```bash
/plugin install payment-processing     # Stripe/PayPal integration
/plugin install ai-agent-development   # AI features (chatbots, recommendations)
```

**Use for:**
- "Integrate Stripe for event ticket sales"
- "Build AI event recommendation system"
- "Add chatbot for startup support"

---

## Quick Reference: When to Use Which Plugin

| Situation | Plugin | Command Example |
|-----------|--------|-----------------|
| **Building new feature** | full-stack-development | "Add event registration with payments" |
| **Bug in production** | incident-diagnostics | "Users can't login - debug now" |
| **Code not making sense** | claude-code-essentials | "Explain the dashboard state management" |
| **Before deploying** | code-quality-review | "Review authentication module" |
| **Site is slow** | performance-optimization | "Optimize dashboard load time" |
| **Security audit** | security-scanning | "Scan for vulnerabilities" |
| **Setting up monitoring** | observability-monitoring | "Add production metrics" |
| **Safe deployment** | deployment-orchestration | "Deploy with canary rollout" |
| **Writing tests** | testing-quality-suite | "Test pitch deck wizard flow" |

---

## Installation Priority Summary

### ⚡ Install Immediately (Core Development)
1. **claude-code-essentials** - Daily development tasks
2. **full-stack-development** - Feature implementation
3. **testing-quality-suite** - Test automation

### 🛡️ Install Before Launch (Quality & Security)
4. **code-quality-review** - Code polish
5. **security-scanning** - Vulnerability detection
6. **performance-optimization** - Speed improvements

### 📊 Install After Launch (Operations)
7. **incident-diagnostics** - Production troubleshooting
8. **observability-monitoring** - System monitoring
9. **deployment-orchestration** - Safe deployments

### 🚀 Install When Needed (Advanced)
10. Additional plugins based on specific requirements

---

## Workflow Examples for Your Project

### Example 1: Building Event Registration Feature

```bash
# Step 1: Plan the feature
"Use full-stack-development to build event registration with:
- User selects event and number of tickets
- Payment processing via Stripe
- Email confirmation
- Admin view of registrations"

# Step 2: Test it
"Use testing-quality-suite to write:
- Unit tests for registration logic
- Integration tests for payment flow
- E2E test for complete user journey"

# Step 3: Review before merge
"Use code-quality-review to audit the registration feature"

# Step 4: Deploy safely
"Use deployment-orchestration to deploy with canary strategy"
```

### Example 2: Fixing Production Bug

```bash
# Immediate triage
"Use incident-diagnostics: Users getting 500 errors on /events"

# Root cause analysis
→ incident-responder finds database timeout
→ Suggests query optimization

# Implement fix
"Use database-operations to optimize the slow query"

# Verify fix
"Use observability-monitoring to confirm response times improved"

# Prevent recurrence
"Use testing-quality-suite to add regression tests"
```

### Example 3: Preparing for Launch

```bash
# Security check
"Use security-scanning to audit entire codebase"

# Performance check
"Use performance-optimization to analyze Core Web Vitals"

# Code quality check
"Use code-quality-review for final audit"

# Set up monitoring
"Use observability-monitoring to add production metrics"

# Safe deployment
"Use deployment-orchestration for blue-green deployment"
```

---

## Getting Started Checklist

- [ ] Install **claude-code-essentials** first thing today
- [ ] Try: "Explain how the PitchDeckWizard component works"
- [ ] Install **full-stack-development** when building next feature
- [ ] Install **testing-quality-suite** and generate tests
- [ ] Before launch: Install security + performance + quality plugins
- [ ] After launch: Install observability + incident response plugins
- [ ] Bookmark this file for quick plugin reference

---

## Tips for Success

1. **Start small**: Install 1-2 plugins, learn them well
2. **Be specific**: "Add user auth" vs "Create authentication system with JWT tokens, password hashing, session management"
3. **Iterate**: Let agents complete work, review, then refine
4. **Check results**: Always verify agent work before committing
5. **Build habits**: Use plugins for daily tasks to build muscle memory

---

## Need Help?

**Plugin not working as expected?**
- Be more specific in your request
- Break complex tasks into smaller steps
- Review the plugin's agent list to understand capabilities

**Don't know which plugin to use?**
- Describe your problem in natural language
- Claude will suggest the right plugin
- Refer to "Quick Reference" table above

**Want to see available agents?**
```bash
# Check what each plugin includes
ls ~/.claude/plugins/marketplaces/claude-code-workflows/agents/
```

---

**Last Updated:** 2025-10-12
**Project:** Medellin Spark (React + TypeScript + Vite)
**Marketplace:** claude-code-workflows (36 plugins, 84 agents)
