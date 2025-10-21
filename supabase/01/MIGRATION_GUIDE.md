# Medellín Spark - Migration Guide

## Overview

Complete Supabase migration package for the Medellín Spark platform, including Events, Jobs Marketplace, Startup Perks, and Pitch Deck Wizard features.

## Migration Files

### Apply Order

Execute migrations in this exact sequence:

```bash
1. 20251012000001_extensions.sql      # Extensions and base functions
2. 20251012000002_schema.sql          # Tables and enums
3. 20251012000003_indexes.sql         # Performance indexes
4. 20251012000004_functions_triggers.sql  # Helper functions and triggers
5. 20251012000005_rls.sql             # Row Level Security policies
6. 20251012000006_seeds_dev.sql       # Sample data (DEV ONLY)
7. 20251012000007_down.sql            # Rollback script (use with caution)
```

### File Descriptions

- **01_extensions.sql**: Enables `pgcrypto`, `uuid-ossp`, `plpgsql` and creates the `update_updated_at()` trigger function
- **02_schema.sql**: Complete schema with 21 tables and 8 enum types
- **03_indexes.sql**: 60+ indexes for foreign keys and query optimization
- **04_functions_triggers.sql**: Security helpers (`has_role`, `current_profile_id`, `is_owner`), profile management, counter triggers
- **05_rls.sql**: Comprehensive RLS policies for all tables (public read, authenticated write, owner/admin manage)
- **06_seeds_dev.sql**: Sample data (Ruta N event, perks, job posting, startup profile)
- **07_down.sql**: Complete rollback in reverse dependency order

## Local Development Setup

### Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- Node.js 18+ (for CLI)
- Docker Desktop running (for local Supabase)

### Initial Setup

```bash
# 1. Start local Supabase (first time)
supabase init
supabase start

# 2. Link to remote project (optional)
supabase link --project-ref <YOUR_PROJECT_REF>

# 3. Apply migrations locally
supabase db reset

# 4. Verify migrations applied
supabase db diff --check
```

### Apply Migrations Manually

If you need to apply migrations one by one:

```bash
# Execute in order
supabase db execute -f supabase/migrations/20251012000001_extensions.sql
supabase db execute -f supabase/migrations/20251012000002_schema.sql
supabase db execute -f supabase/migrations/20251012000003_indexes.sql
supabase db execute -f supabase/migrations/20251012000004_functions_triggers.sql
supabase db execute -f supabase/migrations/20251012000005_rls.sql

# DEV ONLY - Sample data
supabase db execute -f supabase/migrations/20251012000006_seeds_dev.sql
```

### Environment Variables

Create `.env.local`:

```env
# Get these from Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Remote Deployment

### Deploy to Supabase Cloud

```bash
# 1. Link to your project (if not already linked)
supabase link --project-ref <YOUR_PROJECT_REF>

# 2. Push migrations to remote
supabase db push

# 3. Verify deployment
supabase db diff --check
```

### Deploy Specific Migrations

```bash
# Push only specific migration files
supabase db execute -f supabase/migrations/20251012000001_extensions.sql --remote
```

## Verification Checklist

### SQL Verification Queries

Connect to your database and run these checks:

```sql
-- 1. Check PostgreSQL version and extensions
SELECT version();
SELECT * FROM pg_extension WHERE extname IN ('pgcrypto', 'uuid-ossp', 'plpgsql');

-- 2. List all tables
SELECT schemaname, tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Expected: 21 tables
-- candidates, candidate_skills, companies, events, event_venues,
-- jobs, job_skills, matches, applications, organizers, perk_claims,
-- perks, profiles, registrations, saved_perks, sponsors,
-- startup_profiles, tickets, venues, waitlist, wizard_sessions

-- 3. Verify table structure (example: events)
\d+ events

-- Expected columns: id, organizer_id, title, slug, description,
-- event_date, end_date, status, image_url, capacity, registered_count,
-- is_virtual, virtual_url, tags, created_at, updated_at, deleted_at

-- 4. Check enum types
SELECT typname, enumlabel
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE typname = 'event_status';

-- Expected: draft, published, cancelled, completed

-- 5. Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND rowsecurity = true;

-- Expected: All 21 tables

-- 6. Check RLS policies (example: events)
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'events';

-- Expected policies: events_select_published, events_select_own_organizer,
-- events_select_admin, events_insert_organizer, etc.

-- 7. Verify indexes
SELECT schemaname, tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = 'events'
ORDER BY indexname;

-- Expected: idx_events_organizer_id, idx_events_status_date,
-- idx_events_slug, idx_events_active, idx_events_date_range

-- 8. Test functions
SELECT has_role('admin');  -- Should return false for non-admin
SELECT current_profile_id();  -- Should return UUID or NULL

-- 9. Verify sample data (if seeds applied)
SELECT COUNT(*) FROM events WHERE status = 'published';
-- Expected: 1 (Startup Pitch Night)

SELECT COUNT(*) FROM perks WHERE active = true;
-- Expected: 2 (AWS Activate, HubSpot)

-- 10. Test a query with RLS
SET request.jwt.claims.sub = '00000000-0000-0000-0000-000000000001';
SELECT * FROM events WHERE status = 'published';
-- Should return published events only
```

### Quick Verification Script

Save as `verify_migrations.sql`:

```sql
-- Migration Verification Report
-- Run this after applying migrations

\echo '\n=== EXTENSION CHECK ==='
SELECT extname, extversion FROM pg_extension WHERE extname IN ('pgcrypto', 'uuid-ossp');

\echo '\n=== TABLE COUNT ==='
SELECT COUNT(*) as table_count FROM pg_tables WHERE schemaname = 'public';

\echo '\n=== ENUM TYPES ==='
SELECT DISTINCT typname FROM pg_type WHERE typname IN (
  'event_status', 'registration_status', 'payment_status',
  'sponsor_tier', 'job_type', 'job_status', 'application_stage', 'claim_status'
);

\echo '\n=== RLS ENABLED TABLES ==='
SELECT COUNT(*) as rls_enabled_count FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = true;

\echo '\n=== INDEX COUNT ==='
SELECT COUNT(*) as index_count FROM pg_indexes WHERE schemaname = 'public';

\echo '\n=== FUNCTION COUNT ==='
SELECT COUNT(*) as function_count FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public';

\echo '\n=== SAMPLE DATA (if seeds applied) ==='
SELECT
  (SELECT COUNT(*) FROM events) as events,
  (SELECT COUNT(*) FROM perks) as perks,
  (SELECT COUNT(*) FROM jobs) as jobs,
  (SELECT COUNT(*) FROM profiles) as profiles;
```

Run with:

```bash
psql $DATABASE_URL -f verify_migrations.sql
```

### Performance Test Queries

Test index usage with `EXPLAIN ANALYZE`:

```sql
-- 1. Test event listing query (should use idx_events_status_date)
EXPLAIN ANALYZE
SELECT * FROM events
WHERE status = 'published'
  AND deleted_at IS NULL
  AND event_date > NOW()
ORDER BY event_date ASC
LIMIT 20;

-- Look for: "Index Scan" on idx_events_status_date

-- 2. Test job search query (should use idx_jobs_active)
EXPLAIN ANALYZE
SELECT * FROM jobs
WHERE status = 'published'
  AND deleted_at IS NULL
ORDER BY created_at DESC
LIMIT 20;

-- Look for: "Index Scan" on idx_jobs_active

-- 3. Test registration count (should use idx_registrations_event_id)
EXPLAIN ANALYZE
SELECT COUNT(*) FROM registrations
WHERE event_id = '00000000-0000-0000-0000-000000000301'
  AND status = 'confirmed';

-- Look for: "Index Scan" on idx_registrations_status
```

## Rollback Instructions

### Complete Rollback

**⚠️ WARNING: This will delete ALL data!**

```bash
# Execute rollback script
supabase db execute -f supabase/migrations/20251012000007_down.sql

# Or reset to clean state
supabase db reset
```

### Partial Rollback

To rollback specific migrations:

```sql
-- Example: Remove only seed data
DELETE FROM wizard_sessions;
DELETE FROM perk_claims;
DELETE FROM saved_perks;
DELETE FROM perks;
DELETE FROM startup_profiles;
DELETE FROM matches;
DELETE FROM applications;
DELETE FROM candidate_skills;
DELETE FROM candidates;
DELETE FROM job_skills;
DELETE FROM jobs;
DELETE FROM companies;
DELETE FROM sponsors;
DELETE FROM waitlist;
DELETE FROM registrations;
DELETE FROM tickets;
DELETE FROM event_venues;
DELETE FROM events;
DELETE FROM venues;
DELETE FROM organizers;
DELETE FROM profiles;
```

## Common Issues & Troubleshooting

### Issue: "Extension pgcrypto already exists"

**Solution**: This is safe to ignore. The migration uses `CREATE EXTENSION IF NOT EXISTS`.

### Issue: "Trigger on auth.users failed"

**Cause**: Supabase auth schema permissions

**Solution**: The `on_auth_user_created` trigger requires superuser or specific grants. This is handled automatically by Supabase in production. For local dev, you may need to manually sync profiles.

### Issue: RLS blocking queries

**Cause**: Missing or incorrect RLS policies

**Solution**: Verify authentication context:

```sql
-- Check current auth context
SELECT auth.uid();

-- Temporarily disable RLS for testing (DEV ONLY)
ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- Re-enable after testing
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
```

### Issue: Counter not updating (registered_count, sold_count)

**Cause**: Trigger not firing

**Solution**: Check triggers are attached:

```sql
-- Verify triggers exist
SELECT tgname, tgenabled FROM pg_trigger WHERE tgrelid = 'registrations'::regclass;

-- Manually trigger update
UPDATE events SET registered_count = (
  SELECT COUNT(*) FROM registrations
  WHERE event_id = events.id AND status IN ('confirmed', 'attended')
) WHERE id = 'YOUR_EVENT_ID';
```

## CI/CD Integration

### GitHub Actions Workflow

Create `.github/workflows/supabase-migrations.yml`:

```yaml
name: Supabase Migrations

on:
  pull_request:
    paths:
      - 'supabase/migrations/**'
  push:
    branches:
      - main

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
        with:
          version: latest

      - name: Lint migrations
        run: supabase db lint

      - name: Dry run migrations
        run: supabase db push --dry-run
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_DB_PASSWORD: ${{ secrets.SUPABASE_DB_PASSWORD }}

  deploy:
    runs-on: ubuntu-latest
    needs: lint
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
        with:
          version: latest

      - name: Link to Supabase project
        run: supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}

      - name: Push migrations
        run: supabase db push
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_DB_PASSWORD: ${{ secrets.SUPABASE_DB_PASSWORD }}
```

## Schema Summary

### Tables (21)

**Events Module:**
- profiles, organizers, venues, events, event_venues, tickets, registrations, waitlist, sponsors

**Jobs Module:**
- companies, jobs, job_skills, candidates, candidate_skills, applications, matches

**Perks Module:**
- startup_profiles, perks, saved_perks, perk_claims

**Wizard Module:**
- wizard_sessions

### Enums (8)

- event_status, registration_status, payment_status, sponsor_tier
- job_type, job_status, application_stage, claim_status

### Functions (6)

- `update_updated_at()` - Auto-update timestamps
- `has_role(text)` - Check user roles
- `current_profile_id()` - Get current user's profile ID
- `is_owner(text, uuid, text)` - Generic ownership check
- `upsert_profile()` - Sync auth.users to profiles
- `update_event_registered_count()` - Maintain event counters
- `update_ticket_sold_count()` - Maintain ticket counters

### Indexes (60+)

All foreign keys indexed plus composite/partial indexes for:
- Event listings by status and date
- Job searches by type, location, status
- Application filtering by stage and score
- Match ranking by score
- Perk browsing by category and active status

## Next Steps

1. ✅ Apply migrations to local environment
2. ✅ Run verification checklist
3. ✅ Test RLS policies with different user contexts
4. ✅ Review performance with EXPLAIN ANALYZE
5. ✅ Deploy to staging/production
6. Configure auth roles in Supabase Dashboard
7. Set up Edge Functions for event registration/job applications
8. Implement real-time subscriptions for events/matches

## Support

For issues or questions:
- Review Supabase docs: https://supabase.com/docs
- Check migration files for inline comments
- Verify RLS policies match your security requirements

---

**Generated**: 2025-10-12
**Schema Version**: 1.0.0
**Compatible**: PostgreSQL 15+, Supabase
