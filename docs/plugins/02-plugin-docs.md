# Documentation Plugin Guide - Medellin Spark

## Overview

This guide covers two powerful documentation agents that help you create professional documentation and visual diagrams for your codebase:

1. **docs-architect** - Creates comprehensive technical documentation
2. **mermaid-expert** - Generates visual diagrams (flowcharts, sequences, ERDs)

Both agents are included when you install the `documentation-generation` plugin.

---

## Quick Start

### Install the Documentation Plugin

```bash
/plugin install documentation-generation
```

**What you get:**
- `docs-architect` agent - Technical documentation specialist
- `mermaid-expert` agent - Visual diagram creator
- `api-documenter` agent - API documentation generator
- `tutorial-engineer` agent - Tutorial and guide creator
- `reference-builder` agent - Technical reference builder
- `/doc-generate` command - Quick documentation generation

---

## docs-architect: Technical Documentation

### What It Does

Creates comprehensive, long-form documentation that captures both the **what** and **why** of your codebase. Think of it as having a technical writer who:

- Analyzes your code structure and architecture
- Documents design decisions and rationale
- Creates progressive documentation (overview → details)
- Writes for multiple audiences (developers, architects, operations)

### When to Use docs-architect

✅ **Perfect for:**
- System architecture documentation
- Onboarding new developers
- Technical deep-dives on features
- Legacy code that needs documentation
- Architecture decision records (ADRs)
- Pre-audit documentation

❌ **Not ideal for:**
- Quick code comments (use `/code-explain` instead)
- Single function documentation (too heavyweight)
- API endpoint docs (use `api-documenter` instead)

### Real-World Examples

#### Example 1: Document the PitchDeckWizard System

**Scenario:** Create comprehensive docs for the pitch deck wizard feature for new developers.

```bash
"Use docs-architect to create comprehensive documentation for the PitchDeckWizard feature.

Include:
- Architecture overview
- Component relationships
- State management flow
- User journey walkthrough
- Design decisions (why step-by-step wizard?)
- Integration points with dashboard
- Future enhancement opportunities"
```

**What you get:**
- 15-30 pages of comprehensive documentation
- Executive summary for quick understanding
- Detailed architecture breakdown
- Code references to specific files
- Design rationale and tradeoffs
- Troubleshooting guides

#### Example 2: Document Authentication Flow

**Scenario:** Document the authentication system before a security audit.

```bash
"Use docs-architect to document the authentication system.

Cover:
- Authentication architecture (JWT? sessions?)
- Login/logout flows with sequence diagrams
- Token management and refresh strategy
- Security considerations and implementations
- Integration with dashboard routes
- Password reset process
- Known limitations and future improvements"
```

**Result:**
- Complete security model documentation
- Step-by-step authentication flows
- Code references to key files
- Security rationale and decisions
- Troubleshooting guide for common issues

### How to Use docs-architect

#### Method 1: Natural Language (Recommended)

```bash
"Use docs-architect to document [feature/system/module]"
```

**Tips for best results:**
1. **Be specific about scope:** "Document the event registration flow" not "document events"
2. **Mention audience:** "For new developers" or "For security audit"
3. **List key sections:** Tell it what to include
4. **Provide context:** Explain why documentation is needed

---

## mermaid-expert: Visual Diagrams

### What It Does

Creates professional diagrams using Mermaid syntax. Mermaid diagrams are:
- **Code-based:** Written in text, rendered as visuals
- **Version controllable:** Track changes in git
- **Renderable:** GitHub, VS Code, and many tools display them
- **No designer needed:** Generate complex diagrams from descriptions

### Diagram Types Available

| Type | Use Case | Example |
|------|----------|---------|
| **Flowchart** | Process flows, decision trees | User registration flow |
| **Sequence** | API interactions, user flows | Login sequence with auth API |
| **Entity Relationship** | Database schemas | Event and User tables |
| **State Diagram** | UI states, workflows | Dashboard tab navigation |
| **Gantt** | Project timelines | Feature rollout schedule |
| **Class Diagram** | Component relationships | React component hierarchy |

### Real-World Examples

#### Example 1: Event Registration Flow

```bash
"Use mermaid-expert to create a flowchart showing the event registration process:

1. User browses events page
2. Clicks on event
3. If logged in: Show registration form
4. If not logged in: Redirect to login
5. User fills form and submits
6. System validates capacity
7. If available: Process payment via Stripe
8. If full: Show waitlist option
9. Send confirmation email
10. Redirect to dashboard

Include decision points and error states."
```

#### Example 2: API Authentication Sequence

```bash
"Use mermaid-expert to create a sequence diagram showing:

Actors: User, Frontend, Backend API, Database

Flow:
1. User submits login form
2. Frontend sends POST to /api/auth/login
3. Backend validates credentials against database
4. If valid: Generate JWT token
5. Return token to frontend
6. Frontend stores in localStorage
7. Frontend includes token in subsequent API calls
8. Backend validates token on each request

Include success and error paths."
```

#### Example 3: Database Schema

```bash
"Use mermaid-expert to create an ERD showing:

Tables:
- Users (id, email, name, created_at)
- Events (id, title, description, date, capacity, created_by)
- Registrations (id, user_id, event_id, status, registered_at)
- Waitlist (id, user_id, event_id, position, joined_at)

Relationships:
- Events.created_by references Users.id
- Registrations.user_id references Users.id
- Registrations.event_id references Events.id
- Waitlist.user_id references Users.id
- Waitlist.event_id references Events.id"
```

### How to Use mermaid-expert

#### Method 1: Natural Language (Recommended)

```bash
"Use mermaid-expert to create a [diagram-type] showing [what-to-visualize]"
```

**Be specific about:**
1. **Diagram type:** flowchart, sequence, ERD, state, etc.
2. **Elements:** List the components, actors, states
3. **Relationships:** Describe connections and flows
4. **Special cases:** Error states, edge cases

---

## Combined Usage: Complete Documentation

For the most comprehensive documentation, use both agents together.

### Example: Complete Feature Documentation

```bash
"Create complete documentation for the Event Registration feature:

1. Use docs-architect to create technical documentation covering:
   - Architecture overview
   - Component structure
   - API integration
   - State management
   - Security implementation
   - Error handling

2. Use mermaid-expert to create:
   - Flowchart of the registration process
   - Sequence diagram of API calls
   - State diagram of form states
   - ERD of related database tables

Make the documentation suitable for:
- New developers onboarding
- Security audit review
- Future maintenance"
```

**Result:**
- 20-30 pages of comprehensive technical docs
- 4-5 professional diagrams
- Complete system understanding
- Production-ready documentation

---

## Documentation Workflow Examples

### Workflow 1: Feature Launch Documentation

```bash
# Step 1: Technical Documentation
"Use docs-architect to document the new Event Waitlist feature"

# Step 2: Visual Diagrams
"Use mermaid-expert to create:
1. Flowchart of waitlist enrollment
2. Sequence diagram of notification system
3. State diagram of waitlist positions"

# Step 3: API Documentation
"Use api-documenter to generate OpenAPI specs for waitlist endpoints"

# Step 4: User Guide
"Use tutorial-engineer to create a user guide for the waitlist feature"
```

### Workflow 2: Pre-Audit Documentation

```bash
# Document authentication
"Use docs-architect to create security documentation for:
- Authentication system
- Authorization model
- Data encryption
- Session management
- API security"

# Visualize security flows
"Use mermaid-expert to create:
1. Sequence diagram of OAuth flow
2. Flowchart of authorization checks
3. Diagram of data encryption layers"
```

### Workflow 3: Onboarding New Developers

```bash
# System overview
"Use docs-architect to create onboarding documentation covering:
- Project structure
- Architecture patterns
- Development workflow
- Testing strategy
- Deployment process"

# Visual architecture
"Use mermaid-expert to create:
1. Component hierarchy diagram
2. Data flow diagrams
3. Deployment architecture"
```

---

## Quick Command Reference

### Documentation Commands

```bash
/doc-generate <path>         # Quick documentation generation

# Natural language (better for comprehensive docs)
"Use docs-architect to document [feature]"
"Use mermaid-expert to create [diagram-type] for [component]"
```

### Common Requests

```bash
# Architecture docs
"Document the architecture of the dashboard system"

# Process flows
"Create a flowchart of the payment process"

# API sequences
"Show sequence diagram of event registration API calls"

# Database schemas
"Generate ERD for the events and users tables"

# State machines
"Create state diagram for the form wizard"
```

---

## Examples for Medellin Spark

### Events System Documentation

```bash
"Use docs-architect and mermaid-expert to create complete documentation for the Events system:

docs-architect should create:
- Events feature overview
- Database schema explanation
- API endpoints documentation
- Frontend component structure
- State management approach
- Security considerations

mermaid-expert should create:
- ERD for Events, Registrations, Waitlist tables
- Flowchart of event registration process
- Sequence diagram of API interactions
- State diagram of event lifecycle"
```

### Dashboard Documentation

```bash
"Create comprehensive dashboard documentation:

docs-architect:
- Dashboard architecture
- Route structure
- Authentication flow
- Component organization
- Data fetching patterns

mermaid-expert:
- Component hierarchy diagram
- State machine for tab navigation
- Sequence of data loading
- User journey through dashboard"
```

---

## Next Steps

1. **Install the documentation plugin**
   ```bash
   /plugin install documentation-generation
   ```

2. **Try generating a simple diagram**
   ```bash
   "Use mermaid-expert to create a flowchart of user login"
   ```

3. **Create feature documentation**
   ```bash
   "Use docs-architect to document the Events feature"
   ```

---

**Related Guides:**
- Plugin Setup: `docs/plugins/01-plugin-setup.md`
- Plugin Adoption Plan: `docs/plugins/plugin-plan.md`

**Last Updated:** 2025-10-12
**Project:** Medellin Spark (React + TypeScript + Vite)
