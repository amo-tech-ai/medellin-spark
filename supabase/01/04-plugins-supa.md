# Supabase Plugin Integration Guide - Medellín Spark

**Project**: Medellín AI Hub - Database + Backend Architecture
**Plugins**: database-architect + backend-architect
**Stack**: Supabase (PostgreSQL) + Edge Functions
**Last Updated**: 2025-10-12

---

## Overview

This guide shows how to use Claude Code plugins to design and build a production-ready Supabase backend for Medellín Spark. We'll use **two specialized agents** that work together:

1. **database-architect** - Designs schema, RLS policies, indexes
2. **backend-architect** - Designs APIs, Edge Functions, auth flows

**Key principle**: Database first, then APIs. Let the data model inform the service design.

---

## Why Use These Plugins?

### Without Plugins (Manual Approach)
```
L You: Write SQL for events table
L You: Design RLS policies
L You: Create indexes
L You: Build API endpoints
L You: Write Edge Functions
L You: Test everything manually

Time: 2-3 days per feature
Risk: Missing indexes, security holes, poor API design
```

### With Plugins (AI-Assisted)
```
 database-architect: "Design event registration schema"
   ’ Complete schema + RLS + indexes + migrations

 backend-architect: "Design event registration API"
   ’ REST endpoints + validation + error handling + docs

Time: 2-3 hours per feature
Benefits: Best practices, security built-in, production-ready
```

---

## Core Setup Workflow

### Phase 1: Database Design (database-architect)

**Use when:** Starting a new feature, designing data model, security review

```bash
# Step 1: Design schema
"Use database-architect to design the event registration system.

Requirements:
- Events table (title, date, capacity, status)
- Registrations table (user ’ event link, payment status)
- Waitlist table (for sold-out events)
- Tickets table (pricing tiers)

Include:
- RLS policies (users see only their registrations)
- Indexes for common queries
- Triggers for registered_count updates
- Migration files"
```

**What you get:**
- Complete SQL schema
- RLS policies for security
- Indexes for performance
- Triggers for automation
- Migration order
- Sample queries

---

### Phase 2: API Design (backend-architect)

**Use when:** Building APIs on top of schema, designing Edge Functions

```bash
# Step 2: Design REST API
"Use backend-architect to design REST API for event registration.

Based on schema:
- events table (see previous output)
- registrations table
- tickets table

API endpoints needed:
- GET /events (list published events)
- GET /events/:id (event details)
- POST /registrations (register for event)
- GET /my-registrations (user's tickets)
- POST /events (create event - organizers only)

Include:
- OpenAPI spec
- Authentication (Supabase Auth JWT)
- Rate limiting strategy
- Error responses
- Edge Function examples"
```

**What you get:**
- REST API design (OpenAPI spec)
- Edge Function code
- Authentication flows
- Error handling patterns
- API documentation

---

## Feature Matrix: Core vs Advanced

### Core Features (Start Here)

| Feature | Plugin | Command | Output |
|---------|--------|---------|--------|
| **Schema Design** | database-architect | "Design schema for [feature]" | SQL tables, constraints, indexes |
| **RLS Policies** | database-architect | "Add RLS policies for [table]" | Security policies with examples |
| **API Endpoints** | backend-architect | "Design REST API for [feature]" | OpenAPI spec, route handlers |
| **Edge Functions** | backend-architect | "Create Edge Function for [task]" | Deno TypeScript code |
| **Auth Flow** | backend-architect | "Design auth flow for [feature]" | Auth strategy, middleware |

### Advanced Features

| Feature | Plugin | Command | Output |
|---------|--------|---------|--------|
| **Real-time Subscriptions** | backend-architect | "Design real-time API for [feature]" | WebSocket/SSE patterns |
| **Webhook System** | backend-architect | "Design webhook delivery for [events]" | Retry logic, signatures |
| **Query Optimization** | database-architect | "Optimize queries for [feature]" | Index recommendations |
| **Multi-tenant Schema** | database-architect | "Add multi-tenancy to [tables]" | RLS + isolation patterns |
| **Event-Driven** | backend-architect | "Design event-driven flow for [process]" | Pub/sub, queues, triggers |

---

## Real-World Examples

### Example 1: Event Registration System

**Step 1: Database (database-architect)**

```bash
"Use database-architect to design event registration with capacity management.

Tables needed:
- events (title, date, capacity, registered_count)
- registrations (event_id, user_id, status, payment_status)
- tickets (event_id, tier, price, quantity)
- waitlist (event_id, user_id, position)

Features:
- Prevent overbooking (capacity constraint)
- Auto-update registered_count (trigger)
- RLS: users see only their registrations
- RLS: organizers see all for their events
- Indexes for event listings and user queries"
```

**Output:**

```sql
-- Events table with capacity enforcement
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('draft', 'published', 'cancelled')),
  event_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT capacity_check CHECK (registered_count <= capacity OR capacity IS NULL)
);

-- RLS Policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published events"
ON events FOR SELECT
USING (status = 'published');

CREATE POLICY "Organizers manage own events"
ON events FOR ALL
USING (organizer_id IN (
  SELECT id FROM profiles WHERE user_id = auth.uid()
));

-- Trigger to update count
CREATE TRIGGER update_registered_count
AFTER INSERT OR UPDATE OR DELETE ON registrations
FOR EACH ROW EXECUTE FUNCTION update_event_count();

-- Indexes
CREATE INDEX idx_events_status_date ON events(status, event_date);
CREATE INDEX idx_events_organizer ON events(organizer_id);
```

**Step 2: API (backend-architect)**

```bash
"Use backend-architect to design REST API for event registration.

Endpoints:
1. GET /events - List published events
2. GET /events/:id - Event details with remaining capacity
3. POST /registrations - Register for event
4. GET /my-registrations - User's tickets
5. POST /events - Create event (organizers only)

Use Supabase:
- Auth: JWT from Supabase Auth
- Database: Postgres with RLS
- Edge Functions: Deno runtime
- Rate limit: 100 req/min per user

Include validation, error handling, and OpenAPI spec."
```

**Output:**

```typescript
// supabase/functions/register-for-event/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    // 1. Authenticate
    const authHeader = req.headers.get('Authorization')!
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    // 2. Parse request
    const { event_id, ticket_id } = await req.json()

    // 3. Check capacity
    const { data: event } = await supabase
      .from('events')
      .select('capacity, registered_count')
      .eq('id', event_id)
      .single()

    if (event.registered_count >= event.capacity) {
      return new Response(
        JSON.stringify({ error: 'Event is full', waitlist: true }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 4. Create registration
    const { data, error } = await supabase
      .from('registrations')
      .insert({
        event_id,
        ticket_id,
        profile_id: user.id,
        status: 'confirmed',
        payment_status: 'pending'
      })
      .select()
      .single()

    if (error) throw error

    // 5. Return success
    return new Response(
      JSON.stringify({ data }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: error.message === 'Unauthorized' ? 401 : 400 }
    )
  }
})
```

---

### Example 2: Job Application System

**Database + API in one prompt:**

```bash
"Use database-architect and backend-architect together to design job application system.

Database (database-architect):
- jobs table (company_id, title, status)
- applications table (job_id, candidate_id, stage)
- Prevent duplicate applications
- RLS: candidates see only their applications

API (backend-architect):
- POST /apply endpoint
- Resume upload to Storage
- Email on application received
- Idempotent (no duplicate applications)"
```

**Output includes both schema and API code**

---

## Command Reference

### Database Commands (database-architect)

```bash
# Schema design
"Design schema for [feature/domain]"
"Add table for [entity] with [fields]"

# Security
"Add RLS policies for [table]"
"Design multi-tenant schema for [domain]"

# Performance
"Add indexes for query: [SQL]"
"Optimize schema for [use case]"

# Migrations
"Generate migration to add [feature]"
"Design zero-downtime migration for [change]"
```

### API Commands (backend-architect)

```bash
# API design
"Design REST API for [feature]"
"Create GraphQL schema for [domain]"

# Edge Functions
"Create Edge Function for [task]"
"Design webhook handler for [event]"

# Auth & Security
"Design auth flow for [user type]"
"Add rate limiting to [endpoint]"

# Integration
"Design integration with [external service]"
"Build event-driven flow for [process]"
```

---

## Workflow Examples

### Workflow 1: New Feature (End-to-End)

```bash
# 1. Database + API together
"Use database-architect and backend-architect to design event sponsors.

Database:
- sponsors table (event_id, company, tier, amount)
- RLS and indexes

API:
- POST /events/:id/sponsors
- GET /events/:id/sponsors
- Edge Function code"

# 2. Review and deploy
"Generate migration files in order"
```

### Workflow 2: Security Audit

```bash
# Check database + API security
"Use database-architect to audit RLS on events table.
Use backend-architect to review auth in event API.

Check for data leaks and vulnerabilities."
```

---

## Best Practices

###  DO

1. **Start with database**
   ```bash
   database-architect ’ schema
   backend-architect ’ API using that schema
   ```

2. **Use both in one prompt**
   ```bash
   "Use database-architect and backend-architect together"
   ```

3. **Be specific**
   ```bash
   "Design events schema with capacity=100, soft deletes, RLS"
   ```

### L DON'T

1. **Don't skip database step**
   - Always design schema first
   - APIs need data models

2. **Don't forget RLS**
   - Request RLS in database step
   - Verify in API step

---

## Success Criteria

### Database Success
- [x] Tables have PKs, timestamps, indexes
- [x] RLS enabled on user data
- [x] Foreign keys with constraints
- [x] Migration files ready

### API Success
- [x] OpenAPI spec validated
- [x] Edge Functions use Supabase Auth
- [x] Rate limiting implemented
- [x] Error responses documented

---

## Next Steps

1. **Install plugins**
   ```bash
   /plugin install database-operations
   /plugin install full-stack-development
   ```

2. **Design first feature**
   ```bash
   "Use database-architect and backend-architect to design [feature]"
   ```

3. **Deploy**
   ```bash
   "Generate migrations and deployment checklist"
   ```

---

## Related Guides

- Schema Plan: `docs/supabase /02-plan-supa.md`
- MCP Guide: `docs/supabase /03-mcp-supa.md`

---

**Last Updated:** 2025-10-12
**Status:**  Production-Ready Workflow
