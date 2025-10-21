# Supabase MCP Server Guide - Medellín Spark

**Project**: Medellín AI Hub - Remote MCP Integration
**MCP Version**: Remote HTTP (2025)
**Authentication**: OAuth2 Browser-based
**Last Updated**: 2025-10-12

---

## Overview

Supabase MCP (Model Context Protocol) allows AI agents like Claude Code, ChatGPT, Cursor, and Builder.io to interact directly with your Supabase database, Edge Functions, Storage, and more - all through natural language.

**Key Benefits:**
- **Zero setup friction** - Single URL connection
- **Secure OAuth2** - Browser-based authentication (no manual tokens)
- **AI-native development** - LLMs can read docs, execute SQL, deploy functions
- **Feature scoping** - Granular control over what AI can access

---

## Quick Start

### Remote MCP Server URL

```bash
# Production Supabase
https://mcp.supabase.com/mcp

# Local Supabase (via CLI)
http://localhost:54321/mcp
```

### One-Line Setup (Claude Code)

Add to `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}
```

**That's it!** Claude Code will prompt OAuth login on first use.

---

## Feature Matrix: Core vs Advanced

### Core Features (Default Enabled)

| Feature Group | Tools | Use Case | Access Level |
|---------------|-------|----------|--------------|
| **account** | `list_projects` | List all your Supabase projects | Read |
| **database** | `execute_sql` | Run SELECT/INSERT/UPDATE queries | Read/Write |
| **docs** | `search_docs` | Search latest Supabase documentation | Read |
| **debugging** | `get_logs` | Fetch logs (API, Postgres, Auth, etc.) | Read |
| **development** | `generate_typescript_types` | Generate TS types from schema | Read |
| **functions** | `deploy_edge_function` | Deploy/update Edge Functions | Write |
| **branching** | Branch management tools | Manage database branches | Write |

### Advanced Features (Opt-in)

| Feature Group | Tools | Use Case | Access Level |
|---------------|-------|----------|--------------|
| **storage** | `list_storage_buckets`<br>`get_storage_config`<br>`update_storage_config` | Manage file storage buckets | Read/Write |
| **advisors** | `get_advisors` | Security & performance lints | Read |
| **migrations** | Schema migration tools | Track schema changes | Read/Write |

---

## Configuration Options

### Project-Scoped Mode

Restrict MCP to a single project:

```json
{
  "mcpServers": {
    "supabase-medellin": {
      "url": "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF"
    }
  }
}
```

**Find your project_ref:** Dashboard ’ Settings ’ General ’ Reference ID

### Read-Only Mode

Prevent all write operations (uses Postgres read-only role):

```json
{
  "mcpServers": {
    "supabase-readonly": {
      "url": "https://mcp.supabase.com/mcp?read_only=true"
    }
  }
}
```

**Use case:** Safe exploration, data analysis, report generation

### Feature Group Filtering

Enable only specific feature groups:

```json
{
  "mcpServers": {
    "supabase-limited": {
      "url": "https://mcp.supabase.com/mcp?features=database,docs,debugging"
    }
  }
}
```

**Available groups:** `account`, `database`, `docs`, `debugging`, `development`, `functions`, `storage`, `branching`

### Combined Configuration

```json
{
  "mcpServers": {
    "supabase-production": {
      "url": "https://mcp.supabase.com/mcp?project_ref=abcdefgh&read_only=true&features=database,docs"
    }
  }
}
```

---

## Real-World Examples for Medellín Spark

### Example 1: Event Registration Data Analysis

**Scenario:** Analyze event registration patterns without manual SQL queries.

```
User: "Show me the top 5 most popular events by registration count"

AI (via MCP):
1. Uses execute_sql to query:
   SELECT title, registered_count, capacity
   FROM events
   WHERE status = 'published'
   ORDER BY registered_count DESC
   LIMIT 5

2. Returns formatted results with insights
```

**What happened behind the scenes:**
- AI translated natural language ’ SQL
- MCP executed query via `execute_sql` tool
- Results returned securely (RLS policies enforced)

**Benefits:**
- No SQL knowledge needed
- Instant insights
- Always respects RLS security

---

### Example 2: Deploy Event Reminder Edge Function

**Scenario:** Create an Edge Function that sends reminder emails 24h before events.

```
User: "Create an Edge Function that sends reminder emails to all registered users 24 hours before their event starts"

AI (via MCP):
1. Uses search_docs to find Edge Function examples
2. Generates function code:
   - Queries registrations table
   - Filters events happening tomorrow
   - Sends emails via Resend/SendGrid
3. Uses deploy_edge_function to deploy

Result: Function deployed to /functions/event-reminders
```

**Code generated:**

```typescript
// supabase/functions/event-reminders/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { data: upcomingEvents } = await supabase
    .from('registrations')
    .select('*, events(*), profiles(*)')
    .gte('events.event_date', 'now() + interval \'24 hours\'')
    .lte('events.event_date', 'now() + interval \'25 hours\'')

  // Send emails
  for (const reg of upcomingEvents) {
    await sendEmail({
      to: reg.profiles.email,
      subject: `Reminder: ${reg.events.title} tomorrow!`,
      body: `See you at ${reg.events.title} tomorrow at ${reg.events.event_date}`
    })
  }

  return new Response(JSON.stringify({ sent: upcomingEvents.length }))
})
```

---

### Example 3: Debug Production Issues

**Scenario:** Users report they can't register for events. Find the issue fast.

```
User: "Users are getting errors when registering for events. Check the logs"

AI (via MCP):
1. Uses get_logs with service_type='api'
2. Filters for recent errors
3. Identifies: "constraint violation: registered_count > capacity"
4. Uses execute_sql to check events table
5. Finds: Trigger updating registered_count is broken

AI Response:
"Found the issue - the registration count trigger is failing.
Event ID abc123 has registered_count=101 but capacity=100.
Would you like me to fix the trigger?"
```

**What AI discovered:**
- API logs showed constraint violations
- Database trigger has a race condition
- Proposed fix: Add pessimistic locking

**Time saved:** 30 min debugging ’ 2 min with MCP

---

### Example 4: Generate TypeScript Types

**Scenario:** After schema changes, update frontend types.

```
User: "Generate updated TypeScript types for the events and registrations tables"

AI (via MCP):
1. Uses generate_typescript_types
2. Outputs types file
3. Optionally writes to src/types/database.ts

Result:
```

```typescript
// src/types/database.ts (auto-generated)
export interface Event {
  id: string
  organizer_id: string
  title: string
  slug: string | null
  description: string | null
  event_date: string
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  capacity: number | null
  registered_count: number
  created_at: string
  updated_at: string
}

export interface Registration {
  id: string
  event_id: string
  profile_id: string
  status: 'pending' | 'confirmed' | 'waitlist' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed'
  registered_at: string
}
```

---

### Example 5: Security Audit with Advisors

**Scenario:** Before launch, check for security and performance issues.

```
User: "Run a security audit on the database and show any issues"

AI (via MCP):
1. Uses get_advisors
2. Returns security and performance recommendations

Results:
```

**Security Issues Found:**
```
   RLS not enabled on 'wizard_sessions' table
    Impact: High - User data may leak
    Fix: ALTER TABLE wizard_sessions ENABLE ROW LEVEL SECURITY;

   No unique index on 'events.slug'
    Impact: Medium - Duplicate slugs possible
    Fix: CREATE UNIQUE INDEX ON events(slug) WHERE deleted_at IS NULL;
```

**Performance Issues Found:**
```
   Missing index on 'registrations(event_id, status)'
    Impact: High - Slow queries on event registrations
    Fix: CREATE INDEX idx_reg_event_status ON registrations(event_id, status);

   Table 'events' has no primary key index
    Impact: Medium - Sequential scans on lookups
    Fix: Already has PK, but missing composite index
```

**AI offers:** "Would you like me to apply these fixes?"

---

### Example 6: Data Migration Assistance

**Scenario:** Add a new column and backfill data.

```
User: "Add a 'featured' boolean column to events table and mark the top 5 most popular events as featured"

AI (via MCP):
1. Uses execute_sql to add column:
   ALTER TABLE events ADD COLUMN featured BOOLEAN DEFAULT false;

2. Backfills data:
   UPDATE events SET featured = true
   WHERE id IN (
     SELECT id FROM events
     ORDER BY registered_count DESC
     LIMIT 5
   );

3. Verifies:
   SELECT title, registered_count, featured FROM events WHERE featured = true;
```

**Safe migration pattern AI follows:**
1. Add column with safe default
2. Backfill in transaction
3. Verify results
4. (Optional) Add NOT NULL constraint later

---

### Example 7: Storage Bucket Management

**Scenario:** Set up storage for event images and resumes.

```
User: "Create storage buckets for event images (public) and candidate resumes (private)"

AI (via MCP):
1. Uses list_storage_buckets to check existing
2. Uses update_storage_config to create buckets
3. Sets RLS policies

Configuration:
```

```sql
-- Event images bucket (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true);

CREATE POLICY "Public read event images"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-images');

CREATE POLICY "Organizers upload event images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'event-images'
  AND (storage.foldername(name))[1] IN (
    SELECT id::text FROM events WHERE organizer_id IN (
      SELECT id FROM organizers WHERE profile_id = current_profile_id()
    )
  )
);

-- Candidate resumes bucket (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false);

CREATE POLICY "Candidates upload own resume"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = current_profile_id()::text
);
```

---

## Command Reference

### Database Commands

```bash
# Execute SQL queries
"Run this SQL query: SELECT * FROM events WHERE status = 'published'"

# Analyze query performance
"Explain this query's performance: [SQL query]"

# Check table statistics
"Show row counts and sizes for all tables"

# Generate types
"Generate TypeScript types for the database schema"
```

### Edge Functions Commands

```bash
# Deploy new function
"Deploy an Edge Function called 'send-welcome-email' that sends emails to new users"

# Update existing function
"Update the event-reminders function to include location in the email"

# List functions
"Show me all deployed Edge Functions"

# Get function logs
"Show me logs for the event-reminders function from the last hour"
```

### Debugging Commands

```bash
# Get API logs
"Show me API errors from the last 2 hours"

# Get Postgres logs
"Show me database query logs with slow queries"

# Get Auth logs
"Show me authentication failures from today"

# Get Edge Function logs
"Show me errors from the send-welcome-email function"
```

### Documentation Commands

```bash
# Search docs
"How do I implement Row Level Security in Supabase?"

# Find examples
"Show me examples of real-time subscriptions"

# Check best practices
"What are the best practices for Supabase Storage?"
```

### Security Commands

```bash
# Run security audit
"Run a security audit and show any RLS issues"

# Check performance
"Check for missing indexes and slow queries"

# Verify RLS
"Verify that RLS is enabled on all user data tables"
```

### Storage Commands

```bash
# List buckets
"Show me all storage buckets"

# Get bucket config
"Show me the configuration for the 'event-images' bucket"

# Update bucket settings
"Make the 'event-images' bucket public"
```

---

## Workflow Examples

### Workflow 1: New Feature Development

```bash
# Step 1: Check current schema
"Show me the current schema for the events table"

# Step 2: Add new fields
"Add columns for 'virtual_link' and 'is_virtual' to events table"

# Step 3: Generate updated types
"Generate updated TypeScript types"

# Step 4: Deploy Edge Function
"Create an Edge Function to send virtual event links when registration is confirmed"

# Step 5: Test
"Show me logs for the new function"
```

### Workflow 2: Production Debugging

```bash
# Step 1: Check for errors
"Show me all API errors from the last hour"

# Step 2: Identify pattern
"Group these errors by endpoint and show counts"

# Step 3: Check database
"Show me slow queries from the last hour"

# Step 4: Get recommendations
"Run performance advisors and show optimization suggestions"

# Step 5: Apply fix
"Create an index on registrations(event_id, status)"
```

### Workflow 3: Data Analysis

```bash
# Step 1: Overview
"Show me total counts for events, registrations, and users"

# Step 2: Trends
"Show me event registrations by month for the last 6 months"

# Step 3: Insights
"Which events have the highest conversion rate (views to registrations)?"

# Step 4: Export
"Generate a CSV of all events with their registration stats"
```

---

## Security Best Practices

###  DO

1. **Use project-scoped mode for production**
   ```json
   "url": "https://mcp.supabase.com/mcp?project_ref=prod-project"
   ```

2. **Enable read-only mode for data analysis**
   ```json
   "url": "https://mcp.supabase.com/mcp?read_only=true"
   ```

3. **Limit feature groups to what you need**
   ```json
   "url": "https://mcp.supabase.com/mcp?features=database,docs"
   ```

4. **Review AI-generated SQL before execution**
   - Always check the SQL the AI plans to run
   - Especially for DELETE/UPDATE/DROP operations

5. **Use RLS policies** - MCP respects RLS, so your data stays secure

### L DON'T

1. **Don't connect production database without read-only mode**
   - Use separate dev/staging projects
   - Or enable read_only=true

2. **Don't commit .mcp.json with production project_ref to public repos**
   - Add to .gitignore if it contains sensitive project IDs
   - OAuth tokens are stored securely by the client

3. **Don't give AI full access if you only need read**
   - Principle of least privilege applies to AI too

4. **Don't skip reviewing generated migrations**
   - Always review schema changes before applying

---

## Troubleshooting

### Issue: OAuth login not working

**Solution:**
- Ensure you're using Remote MCP URL (not stdio)
- Check that browser popup isn't blocked
- Try logging out and in again in Supabase Dashboard

### Issue: "Permission denied" errors

**Cause:** RLS policies blocking the query

**Solution:**
```bash
# Check RLS status
"Show me RLS policies for the events table"

# Verify your user role
"What is my current user role in the database?"

# If needed, adjust policies
"Update RLS policy to allow organizers to view draft events"
```

### Issue: MCP tools not showing up

**Cause:** Feature groups disabled or tool count limits

**Solution:**
```json
{
  "url": "https://mcp.supabase.com/mcp?features=account,database,docs,functions"
}
```

### Issue: Slow query performance

**Solution:**
```bash
# Get recommendations
"Run performance advisors for slow queries"

# Check explain plan
"Explain this query: [SQL]"

# Add suggested indexes
"Create the recommended indexes"
```

---

## Advanced Use Cases

### Use Case 1: Self-Healing Database

Set up MCP to automatically fix common issues:

```bash
# Daily audit
"Run security and performance advisors daily and create GitHub issues for any new findings"

# Auto-index creation
"Analyze query logs and create indexes for queries slower than 1 second"

# Schema validation
"Check that all tables have RLS enabled and created_at/updated_at columns"
```

### Use Case 2: Documentation as Code

Keep your schema documented:

```bash
# Generate schema docs
"Create markdown documentation for all database tables with column descriptions"

# Update on changes
"Detect schema changes since last commit and update the docs"

# Generate ERD
"Create a Mermaid ERD diagram of the events and registrations tables"
```

### Use Case 3: Multi-Environment Management

Sync schema across dev/staging/prod:

```bash
# Compare schemas
"Compare the events table schema between dev and prod projects"

# Generate migration
"Generate a migration to sync dev schema to prod"

# Verify before deploy
"Show me what would change if I apply this migration to prod"
```

---

## Integration with Other Tools

### Claude Code

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT"
    }
  }
}
```

### Cursor IDE

Add to Cursor settings ’ MCP Servers:

```json
{
  "supabase": {
    "url": "https://mcp.supabase.com/mcp"
  }
}
```

### ChatGPT (via MCP)

Use the MCP connector plugin and add Supabase URL.

### Builder.io

Connect in Builder settings ’ Integrations ’ MCP Servers.

---

## Success Criteria

### Setup Success
- [x] OAuth login completes successfully
- [x] MCP tools visible in AI agent
- [x] Can execute basic SQL queries
- [x] Can search documentation

### Development Success
- [x] AI can generate and deploy Edge Functions
- [x] TypeScript types auto-generated on schema changes
- [x] Can debug production issues via logs
- [x] Security advisors catch RLS issues

### Production Readiness
- [x] Read-only mode enabled for prod access
- [x] Project-scoped to correct environment
- [x] Feature groups limited to necessary tools
- [x] RLS policies tested and verified

---

## Cost Considerations

**MCP Server Costs:** Free (included with Supabase)

**Usage Costs:**
- Edge Functions: Free tier (500K invocations/month)
- Database: Free tier (500MB storage, 2GB bandwidth)
- Storage: Free tier (1GB)

**AI Agent Costs:**
- Claude Code: Included in Claude subscription
- ChatGPT: Requires Plus/Pro subscription
- Cursor: Included in Cursor subscription

**Estimated Monthly Cost for Medellín Spark:**
- Supabase Free Tier: $0
- Claude Pro: $20
- **Total: $20/month** for unlimited AI-assisted development

---

## Next Steps

1. **Add MCP to your project**
   ```bash
   # Create .mcp.json in project root
   {
     "mcpServers": {
       "supabase": {
         "url": "https://mcp.supabase.com/mcp"
       }
     }
   }
   ```

2. **Test with a simple query**
   ```
   "Show me all events happening this week"
   ```

3. **Deploy your first Edge Function**
   ```
   "Create an Edge Function that returns hello world"
   ```

4. **Run security audit**
   ```
   "Run advisors and show any security issues"
   ```

5. **Explore the docs**
   ```
   "How do I implement real-time subscriptions?"
   ```

---

## Related Guides

- Schema Plan: `docs/supabase /02-plan-supa.md`
- Database Operations: `docs/supabase /01-plugin-data.md`
- Supabase Official Docs: https://supabase.com/docs/guides/getting-started/mcp

---

**Last Updated:** 2025-10-12
**MCP Version:** Remote HTTP with OAuth2
**Project:** Medellín Spark (React + TypeScript + Vite + Supabase)
**Status:**  Production-Ready Integration Guide
