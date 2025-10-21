# Supabase Production Readiness Audit
**Project:** Medellín Spark Platform
**Database:** dhesktsqhcxhqfjypulk.supabase.co
**Audit Date:** 2025-10-12
**PostgreSQL Version:** 17.6

---

## Executive Summary

### Overall Status: ⚠️ **PRODUCTION-READY WITH CRITICAL ISSUES**

The Supabase database schema has been successfully deployed with comprehensive functionality, but contains **critical security and operational issues** that must be addressed before production launch.

**Critical Issues Found:** 3
**High Priority Issues:** 4
**Medium Priority Issues:** 2
**Low Priority Issues:** 3

---

## 🔴 CRITICAL ISSUES (Must Fix Before Production)

### 1. Migration Naming Mismatch - Data Loss Risk
**Severity:** 🔴 CRITICAL
**Impact:** Database state inconsistency, potential data loss on re-migration

**Problem:**
- Local migration files use timestamp `20251012000001` - `20251012000007`
- Supabase tracking shows different versions: `20251013013527`, `20251013013913`
- Migration names don't match: local files vs tracked migrations

**Evidence:**
```
Local files:
- 20251012000001_extensions.sql
- 20251012000002_schema.sql
- 20251012000003_indexes.sql
- 20251012000004_functions_triggers.sql
- 20251012000005_rls.sql

Supabase tracking:
- 20251013013527 "extensions"
- 20251013013913 "rls_policies"
```

**Risk:**
- Running `supabase db push` again will attempt to reapply migrations
- May cause constraint violations, duplicate objects, or data corruption
- Migration history is unreliable for rollbacks

**Fix Required:**
1. Rename local migration files to match Supabase versions OR
2. Reset migration tracking and reapply with correct timestamps OR
3. Manually update supabase_migrations.schema_migrations table

**Recommendation:**
```bash
# Option 1: Reset and reapply (DESTRUCTIVE - DEV ONLY)
supabase db reset

# Option 2: Manually fix tracking (SAFER)
# Update migration tracking to match local files
```

---

### 2. Dangerous Rollback Script in Production Path
**Severity:** 🔴 CRITICAL
**Impact:** Accidental data deletion, complete schema destruction

**Problem:**
- File `20251012000007_down.sql` exists in `supabase/migrations/` directory
- Contains complete DROP TABLE cascade commands
- Will execute if migration files are pushed to production
- 15KB of destructive SQL ready to delete everything

**Evidence:**
```bash
$ ls -lh supabase/migrations/20251012000007_down.sql
-rw-rw-r-- 1 sk sk 15K Oct 12 19:47 supabase/migrations/20251012000007_down.sql
```

**File Contents:**
```sql
-- ⚠️  DANGER: COMPLETE DATABASE TEARDOWN
-- This script removes ALL tables, functions, policies, and data.
drop policy if exists "wizard_sessions_select_own" on wizard_sessions;
[... 500+ lines of DROP statements ...]
```

**Risk:**
- Accidental execution via `supabase db push` deletes all data
- CI/CD pipeline could automatically execute this
- No confirmation prompt in automated environments

**Fix Required:**
```bash
# IMMEDIATELY move out of migrations directory
mv supabase/migrations/20251012000007_down.sql supabase/rollback_scripts/
# OR rename to prevent automatic execution
mv supabase/migrations/20251012000007_down.sql supabase/migrations/_MANUAL_ONLY_down.sql.disabled
```

**Recommendation:**
- Remove from migrations directory NOW
- Add to `.gitignore` if regenerated
- Store in separate `rollback_scripts/` folder with README warning
- Require manual execution with explicit confirmation

---

### 3. Overly Permissive RLS Policies on Venues Table
**Severity:** 🔴 CRITICAL
**Impact:** Data integrity violation, unauthorized data modification

**Problem:**
- `venues` table allows ANY authenticated user to INSERT and UPDATE
- No ownership validation on modifications
- Potential for spam, vandalism, or malicious venue creation

**Evidence:**
```sql
-- POLICY ANALYSIS
venues_insert_authenticated: POTENTIALLY_BROAD
  - Allows: ANY authenticated user
  - Restriction: None (just requires login)

venues_update_authenticated: POTENTIALLY_BROAD
  - Allows: ANY authenticated user to modify ANY venue
  - Restriction: None
```

**Scenario:**
1. Malicious user registers account
2. Creates fake venues for spam/phishing
3. Modifies legitimate venue addresses to redirect users
4. No audit trail or ownership control

**Fix Required:**
```sql
-- Replace overly permissive policies
DROP POLICY "venues_insert_authenticated" ON venues;
DROP POLICY "venues_update_authenticated" ON venues;

-- Restrict to admins or venue owners
CREATE POLICY "venues_insert_admin"
  ON venues FOR INSERT TO authenticated
  USING (has_role('admin'));

CREATE POLICY "venues_update_own_or_admin"
  ON venues FOR UPDATE TO authenticated
  USING (
    has_role('admin') OR
    -- Add venue ownership tracking first
    created_by = current_profile_id()
  );
```

**Recommendation:**
- Add `created_by` column to venues table
- Restrict INSERT to admin role only
- Restrict UPDATE to admin or venue creator
- Implement venue approval workflow

---

## 🟠 HIGH PRIORITY ISSUES

### 4. auth.users Trigger May Fail Silently
**Severity:** 🟠 HIGH
**Impact:** User profiles not created on signup, authentication failures

**Problem:**
- Trigger `on_auth_user_created` attached to `auth.users` table
- Supabase may restrict triggers on auth schema
- Trigger exists but may not execute due to permissions

**Evidence:**
```sql
-- Trigger exists and is enabled
SELECT tgname, tgenabled FROM pg_trigger
WHERE tgrelid = 'auth.users'::regclass;
-- Result: on_auth_user_created | O (enabled)

-- But auth.users is managed by Supabase, not user-controlled
```

**Current State:**
- ✅ Trigger is created
- ✅ Trigger is enabled
- ⚠️ Unknown if Supabase allows execution
- ⚠️ No test verification yet

**Risk:**
- New user signs up
- Profile record NOT created in `profiles` table
- User gets auth.uid() but no profile
- Application features fail (organizers, companies, etc.)

**Fix Required:**
```typescript
// Implement application-level profile creation
// src/lib/auth/profile-sync.ts

export async function ensureProfile(user: User) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!profile) {
    // Profile doesn't exist - create it
    await supabase.from('profiles').insert({
      user_id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || user.email,
      avatar_url: user.user_metadata?.avatar_url
    });
  }
}

// Call after every auth state change
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    ensureProfile(session.user);
  }
});
```

**Testing:**
1. Create test user via Supabase Auth
2. Check if profile record exists
3. If missing, implement application-level sync

**Recommendation:**
- Test trigger functionality immediately
- Implement defensive profile creation in application code
- Monitor profile creation on new signups
- Consider Edge Function alternative for profile sync

---

### 5. Missing SECURITY DEFINER on Counter Triggers
**Severity:** 🟠 HIGH
**Impact:** Counter updates may fail with RLS enabled

**Problem:**
- `update_event_registered_count()` lacks SECURITY DEFINER
- `update_ticket_sold_count()` lacks SECURITY DEFINER
- Triggers execute as current user, not elevated privileges
- May fail when RLS prevents counting rows

**Evidence:**
```sql
-- Function security check
SELECT
  function_name,
  is_security_definer
FROM [function query]
WHERE function_name IN ('update_event_registered_count', 'update_ticket_sold_count');

-- Results:
update_event_registered_count | false  ❌
update_ticket_sold_count      | false  ❌
```

**Scenario:**
1. Anonymous user views event listing
2. Authenticated user registers for event
3. Trigger fires to update registered_count
4. Trigger runs as authenticated user context
5. RLS prevents reading all registrations (only own)
6. COUNT(*) returns incomplete data
7. `registered_count` becomes incorrect

**Fix Required:**
```sql
-- Add SECURITY DEFINER to counter functions
CREATE OR REPLACE FUNCTION update_event_registered_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER  -- ← ADD THIS
SET search_path = public
AS $$
DECLARE
  event_id_to_update uuid;
BEGIN
  IF tg_op = 'DELETE' THEN
    event_id_to_update := old.event_id;
  ELSE
    event_id_to_update := new.event_id;
  END IF;

  UPDATE events
  SET registered_count = (
    SELECT count(*)
    FROM registrations
    WHERE event_id = event_id_to_update
      AND status IN ('confirmed', 'attended')
  )
  WHERE id = event_id_to_update;

  RETURN COALESCE(new, old);
END;
$$;

-- Same fix for update_ticket_sold_count()
```

**Recommendation:**
- Apply SECURITY DEFINER immediately
- Add `SET search_path = public` for security
- Test counter accuracy after registration/cancellation
- Monitor for drift between actual and counted values

---

### 6. SQL Injection Risk in is_owner() Function
**Severity:** 🟠 HIGH
**Impact:** Potential SQL injection, privilege escalation

**Problem:**
- `is_owner()` uses dynamic SQL with `format()`
- Parameters `table_name` and `owner_column` not validated
- Called from RLS policies (trusted context)
- Uses `%I` identifier quoting (good) but still risky

**Evidence:**
```sql
CREATE OR REPLACE FUNCTION is_owner(
  table_name text,      -- ⚠️ User input in dynamic query
  record_id uuid,
  owner_column text     -- ⚠️ User input in dynamic query
) RETURNS boolean
SECURITY DEFINER  -- Runs with elevated privileges!
AS $$
BEGIN
  -- Dynamic SQL construction
  EXECUTE format(
    'SELECT %I FROM %I WHERE id = $1',  -- %I prevents basic injection
    owner_column,                       -- But what if column doesn't exist?
    table_name
  ) INTO owner_id USING record_id;
  ...
END;
$$;
```

**Attack Vectors:**
1. **Non-existent table:** Passing invalid `table_name` causes exception, may leak schema info
2. **Column enumeration:** Try different `owner_column` values to discover schema
3. **Denial of service:** Intentionally cause repeated exceptions

**Current Mitigation:**
- ✅ Uses `%I` format identifier (prevents basic injection)
- ✅ SECURITY DEFINER (runs as owner, not caller)
- ⚠️ No input validation
- ⚠️ No whitelist of allowed tables/columns

**Risk Level:**
- **Low** if only called from RLS policies (hardcoded params)
- **High** if ever exposed via application API
- **Medium** due to lack of defensive programming

**Fix Required:**
```sql
CREATE OR REPLACE FUNCTION is_owner(
  table_name text,
  record_id uuid,
  owner_column text DEFAULT 'profile_id'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public  -- Prevent search_path attacks
AS $$
DECLARE
  owner_id uuid;
  current_prof_id uuid;
BEGIN
  -- Input validation
  IF table_name IS NULL OR record_id IS NULL THEN
    RETURN false;
  END IF;

  -- Whitelist allowed tables
  IF table_name NOT IN (
    'events', 'organizers', 'companies', 'jobs',
    'candidates', 'applications', 'startup_profiles',
    'wizard_sessions', 'perk_claims', 'registrations'
  ) THEN
    RAISE EXCEPTION 'Invalid table_name: %', table_name;
  END IF;

  -- Whitelist allowed columns
  IF owner_column NOT IN ('profile_id', 'organizer_id', 'company_id', 'candidate_id') THEN
    RAISE EXCEPTION 'Invalid owner_column: %', owner_column;
  END IF;

  current_prof_id := current_profile_id();

  IF current_prof_id IS NULL THEN
    RETURN false;
  END IF;

  -- Safe to execute now
  EXECUTE format(
    'SELECT %I FROM %I WHERE id = $1',
    owner_column,
    table_name
  ) INTO owner_id USING record_id;

  RETURN owner_id = current_prof_id;
EXCEPTION
  WHEN OTHERS THEN
    -- Log and return false on any error
    RAISE WARNING 'is_owner error for table %: %', table_name, SQLERRM;
    RETURN false;
END;
$$;
```

**Recommendation:**
- Add input validation whitelist immediately
- Add `SET search_path = public` for security
- Consider replacing with table-specific functions
- Never call this function from application code with user input

---

### 7. Broad SELECT Policies on Sensitive Data
**Severity:** 🟠 HIGH
**Impact:** Data privacy violation, unauthorized access to candidate/company info

**Problem:**
- Multiple tables allow unrestricted SELECT for authenticated users
- No business logic validation on data visibility
- Competitor access to candidate profiles and company data

**Affected Tables:**
- `candidates` - All authenticated users can view all candidate profiles
- `candidate_skills` - All skills visible to competitors
- `companies` - All company details visible (including private data)
- `profiles` - All user profiles publicly readable

**Evidence:**
```sql
-- OVERLY BROAD POLICIES
candidates_select_authenticated:
  - Allows: ALL authenticated users
  - Restriction: WHERE active = true (only excludes inactive)
  - Risk: Recruiters can scrape all candidate data

candidate_skills_select_authenticated:
  - Allows: ALL authenticated users
  - No restrictions
  - Risk: Skills database harvesting

companies_select_all:
  - Allows: anon AND authenticated
  - No restrictions
  - Risk: Competitor intelligence gathering
```

**Business Impact:**
- Recruiters create free accounts to scrape candidate database
- Competitors access all company listings and details
- Privacy expectations violated (users expect limited visibility)
- GDPR/privacy compliance risk

**Fix Required:**
```sql
-- Candidates: Only visible to job posters and admins
DROP POLICY "candidates_select_authenticated" ON candidates;

CREATE POLICY "candidates_select_own"
  ON candidates FOR SELECT TO authenticated
  USING (profile_id = current_profile_id());

CREATE POLICY "candidates_select_matched_jobs"
  ON candidates FOR SELECT TO authenticated
  USING (
    -- Only visible to companies with matched jobs
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.candidate_id = candidates.id
        AND applications.job_id IN (
          SELECT id FROM jobs WHERE company_id IN (
            SELECT id FROM companies WHERE profile_id = current_profile_id()
          )
        )
    )
  );

-- Companies: Only show published companies
CREATE POLICY "companies_select_published"
  ON companies FOR SELECT TO anon, authenticated
  USING (published = true);  -- Add published boolean column first
```

**Recommendation:**
- Restrict candidate visibility to matched jobs only
- Add `published` flag to companies table
- Implement tiered access (free vs premium recruiter accounts)
- Add rate limiting on candidate queries

---

## 🟡 MEDIUM PRIORITY ISSUES

### 8. Seed Data File in Production Migrations
**Severity:** 🟡 MEDIUM
**Impact:** Development data in production, foreign key violations

**Problem:**
- `20251012000006_seeds_dev.sql` exists in migrations directory
- Clearly marked as DEV ONLY but still present
- Will fail in production due to missing auth.users records
- Could accidentally expose test data

**Evidence:**
```bash
$ ls supabase/migrations/20251012000006_seeds_dev.sql
supabase/migrations/20251012000006_seeds_dev.sql  ← Present in migrations

-- File header:
-- WARNING: DEV ONLY - DO NOT RUN IN PRODUCTION
-- This file contains sample data for local development and testing.
```

**Risk:**
- CI/CD pipeline tries to apply seeds to production
- Fails with foreign key constraint error (auth.users missing)
- Pipeline fails, delays deployment
- If auth.users exist, creates test data in production

**Fix Required:**
```bash
# Move to separate directory
mkdir -p supabase/seeds/
mv supabase/migrations/20251012000006_seeds_dev.sql supabase/seeds/dev_data.sql

# Update .gitignore
echo "supabase/migrations/*_seeds*.sql" >> .gitignore
echo "supabase/migrations/*_dev.sql" >> .gitignore
```

**Recommendation:**
- Remove from migrations directory immediately
- Use `supabase/seed.sql` for local development seeds
- Never version control seed data for production
- Document seed data application in README

---

### 9. uuid-ossp Extension Redundancy
**Severity:** 🟡 MEDIUM
**Impact:** Minor - unnecessary extension, no functional impact

**Problem:**
- Both `pgcrypto` and `uuid-ossp` extensions enabled
- Both provide UUID generation functions
- `uuid-ossp` is legacy, `pgcrypto` is modern standard
- Wastes extension slots (Supabase has limits)

**Evidence:**
```sql
-- migration 01_extensions.sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;      -- Modern, recommended
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   -- Legacy, redundant
```

**Current Usage:**
- All tables use `gen_random_uuid()` from pgcrypto
- No code uses `uuid_generate_v4()` from uuid-ossp

**Fix Required:**
```sql
-- Create migration: 20251013000001_remove_uuid_ossp.sql
DROP EXTENSION IF EXISTS "uuid-ossp";
```

**Recommendation:**
- Remove uuid-ossp in next migration
- Verify no dependencies first
- Cleanup for consistency, not urgency

---

## ℹ️ LOW PRIORITY ISSUES

### 10. Missing Function Execution Grants
**Severity:** ℹ️ LOW
**Impact:** Minor - functions already work due to SECURITY DEFINER

**Problem:**
- Some helper functions have explicit grants
- Counter trigger functions lack explicit grants
- Inconsistent permission model

**Evidence:**
```sql
-- migration 04_functions_triggers.sql
-- Line 339-341: Explicit grants for security helpers
GRANT EXECUTE ON FUNCTION has_role(text) TO authenticated;
GRANT EXECUTE ON FUNCTION current_profile_id() TO authenticated;
GRANT EXECUTE ON FUNCTION is_owner(text, uuid, text) TO authenticated;

-- Missing grants for trigger functions (but they work anyway):
-- update_event_registered_count() - no grant
-- update_ticket_sold_count() - no grant
-- update_updated_at() - no grant
```

**Why It Works:**
- Trigger functions execute automatically (no direct user call)
- SECURITY DEFINER elevates privileges for security helpers
- No actual functional issue

**Fix (Optional):**
```sql
-- For consistency and documentation
GRANT EXECUTE ON FUNCTION update_event_registered_count() TO authenticated;
GRANT EXECUTE ON FUNCTION update_ticket_sold_count() TO authenticated;
GRANT EXECUTE ON FUNCTION update_updated_at() TO authenticated;
```

**Recommendation:**
- Add for consistency in next migration
- Document which functions are public vs internal
- Not urgent

---

### 11. Missing Indexes on JSONB Columns
**Severity:** ℹ️ LOW
**Impact:** Minor performance hit on wizard_sessions and perk_claims

**Problem:**
- `wizard_sessions.session_data` (JSONB) has no index
- `perk_claims.claim_data` (JSONB) has no index
- Queries on nested JSON fields will be slow

**Analysis:**
```sql
-- No indexes found for:
wizard_sessions.session_data
perk_claims.claim_data
```

**Current Impact:**
- Low query volume expected (few wizard sessions, few claims)
- JSONB queries will use sequential scan
- Noticeable only at scale (1000+ records)

**Fix (When Needed):**
```sql
-- GIN index for general JSONB queries
CREATE INDEX idx_wizard_sessions_session_data_gin
  ON wizard_sessions USING gin (session_data);

-- Specific path index for common queries
CREATE INDEX idx_wizard_sessions_step
  ON wizard_sessions ((session_data->>'step'));
```

**Recommendation:**
- Monitor query performance
- Add indexes when slow queries detected
- Not needed for MVP launch

---

### 12. No Backup/Recovery Documentation
**Severity:** ℹ️ LOW
**Impact:** Operational - no impact until disaster occurs

**Problem:**
- No documented backup strategy
- No recovery procedures
- No PITR (Point-in-Time Recovery) configuration docs

**Fix Required:**
Create `supabase/BACKUP_RECOVERY.md`:
```markdown
# Backup & Recovery Plan

## Supabase Automatic Backups
- Daily automated backups (Pro plan)
- 7-day retention
- PITR available for last 7 days

## Manual Backup
bash
# Export entire database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Export specific tables
pg_dump $DATABASE_URL -t events -t registrations > events_backup.sql


## Recovery Procedures
1. Navigate to Supabase Dashboard > Database > Backups
2. Select backup date
3. Click "Restore" (creates new project)
4. Update DNS/app config to point to restored instance

## Disaster Recovery SLA
- RPO (Recovery Point Objective): 24 hours
- RTO (Recovery Time Objective): 4 hours
```

**Recommendation:**
- Document before production launch
- Test restore procedure quarterly
- Set up monitoring for backup success

---

## ✅ PRODUCTION READINESS CHECKLIST

### Database Schema
- ✅ 21 tables created successfully
- ✅ 8 enum types defined
- ✅ 87 indexes created (exceeds 60+ target)
- ✅ Foreign key constraints enforced
- ✅ Soft delete pattern implemented (deleted_at)
- ✅ Timestamp management with triggers

### Security (RLS)
- ✅ RLS enabled on all 21 tables
- ✅ 100+ RLS policies active
- ⚠️ Some policies overly permissive (venues, candidates)
- ⚠️ Missing SECURITY DEFINER on counter functions
- ⚠️ SQL injection risk in is_owner() needs validation

### Functions & Triggers
- ✅ 4 helper functions operational
- ✅ 16 updated_at triggers attached
- ✅ 2 counter triggers functional
- ⚠️ auth.users trigger untested
- ⚠️ Counter functions need SECURITY DEFINER

### Performance
- ✅ Query optimizer using correct indexes
- ✅ Index scans confirmed for event listings
- ⚠️ JSONB columns lack GIN indexes (low priority)

### Migrations
- ✅ Migrations applied successfully
- ❌ Migration naming mismatch (CRITICAL)
- ❌ Dangerous rollback script in migrations/ (CRITICAL)
- ⚠️ Seed data file present in production path

### Best Practices
- ✅ SECURITY DEFINER on security helper functions
- ✅ Idempotent migrations (IF NOT EXISTS)
- ✅ Comments on functions for documentation
- ⚠️ Missing input validation on is_owner()
- ⚠️ Redundant uuid-ossp extension

---

## 📋 IMMEDIATE ACTION ITEMS (Before Production)

### Must Fix (Blocking Production Launch)
1. **Fix migration naming mismatch** - Prevents re-deployment failures
2. **Move rollback script out of migrations/** - Prevents accidental data loss
3. **Restrict venues table policies** - Prevents spam/vandalism
4. **Test auth.users trigger** - Ensures profile creation works

### Should Fix (Launch Week Priority)
5. **Add SECURITY DEFINER to counter functions** - Ensures accurate counts
6. **Add input validation to is_owner()** - Prevents potential exploits
7. **Restrict candidate/company visibility** - Privacy compliance

### Can Defer (Post-Launch)
8. Move seed data to seeds/ directory
9. Remove uuid-ossp extension
10. Document backup/recovery procedures
11. Add JSONB indexes when query volume increases

---

## 🔧 RECOMMENDED FIXES (SQL Scripts)

### Fix #1: Add SECURITY DEFINER to Counter Functions
```sql
-- File: supabase/migrations/20251013000001_fix_counter_security.sql

-- Fix update_event_registered_count
CREATE OR REPLACE FUNCTION update_event_registered_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  event_id_to_update uuid;
BEGIN
  IF tg_op = 'DELETE' THEN
    event_id_to_update := old.event_id;
  ELSE
    event_id_to_update := new.event_id;
  END IF;

  UPDATE events
  SET registered_count = (
    SELECT count(*)
    FROM registrations
    WHERE event_id = event_id_to_update
      AND status IN ('confirmed', 'attended')
  )
  WHERE id = event_id_to_update;

  RETURN COALESCE(new, old);
END;
$$;

-- Fix update_ticket_sold_count
CREATE OR REPLACE FUNCTION update_ticket_sold_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ticket_id_to_update uuid;
BEGIN
  IF tg_op = 'DELETE' THEN
    ticket_id_to_update := old.ticket_id;
  ELSE
    ticket_id_to_update := new.ticket_id;
  END IF;

  IF ticket_id_to_update IS NULL THEN
    RETURN COALESCE(new, old);
  END IF;

  UPDATE tickets
  SET sold_count = (
    SELECT count(*)
    FROM registrations
    WHERE ticket_id = ticket_id_to_update
      AND payment_status = 'completed'
  )
  WHERE id = ticket_id_to_update;

  RETURN COALESCE(new, old);
END;
$$;
```

### Fix #2: Secure is_owner Function
```sql
-- File: supabase/migrations/20251013000002_secure_is_owner.sql

CREATE OR REPLACE FUNCTION is_owner(
  table_name text,
  record_id uuid,
  owner_column text DEFAULT 'profile_id'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
DECLARE
  owner_id uuid;
  current_prof_id uuid;
BEGIN
  -- Input validation
  IF table_name IS NULL OR record_id IS NULL THEN
    RETURN false;
  END IF;

  -- Whitelist allowed tables
  IF table_name NOT IN (
    'events', 'organizers', 'companies', 'jobs',
    'candidates', 'applications', 'startup_profiles',
    'wizard_sessions', 'perk_claims', 'registrations',
    'waitlist', 'saved_perks', 'sponsors', 'tickets'
  ) THEN
    RAISE WARNING 'is_owner called with invalid table: %', table_name;
    RETURN false;
  END IF;

  -- Whitelist allowed columns
  IF owner_column NOT IN ('profile_id', 'organizer_id', 'company_id', 'candidate_id') THEN
    RAISE WARNING 'is_owner called with invalid column: %', owner_column;
    RETURN false;
  END IF;

  current_prof_id := current_profile_id();

  IF current_prof_id IS NULL THEN
    RETURN false;
  END IF;

  EXECUTE format(
    'SELECT %I FROM %I WHERE id = $1',
    owner_column,
    table_name
  ) INTO owner_id USING record_id;

  RETURN owner_id = current_prof_id;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'is_owner error for table %.%: %', table_name, owner_column, SQLERRM;
    RETURN false;
END;
$$;
```

### Fix #3: Restrict Venues Policies
```sql
-- File: supabase/migrations/20251013000003_restrict_venues.sql

-- Add created_by column to track ownership
ALTER TABLE venues ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES profiles(id);

-- Backfill existing venues (set to first admin or null)
UPDATE venues
SET created_by = (
  SELECT id FROM profiles
  WHERE (raw_app_meta_data->>'role')::text = 'admin'
  LIMIT 1
)
WHERE created_by IS NULL;

-- Drop overly permissive policies
DROP POLICY IF EXISTS "venues_insert_authenticated" ON venues;
DROP POLICY IF EXISTS "venues_update_authenticated" ON venues;

-- Restrict insert to admin only
CREATE POLICY "venues_insert_admin"
  ON venues FOR INSERT TO authenticated
  WITH CHECK (has_role('admin'));

-- Restrict update to owner or admin
CREATE POLICY "venues_update_own_or_admin"
  ON venues FOR UPDATE TO authenticated
  USING (
    has_role('admin') OR
    created_by = current_profile_id()
  )
  WITH CHECK (
    has_role('admin') OR
    created_by = current_profile_id()
  );

-- Admin can delete
CREATE POLICY "venues_delete_admin"
  ON venues FOR DELETE TO authenticated
  USING (has_role('admin'));
```

---

## 📊 SECURITY SCORE

**Overall Security Grade: C+**

| Category | Score | Notes |
|----------|-------|-------|
| RLS Coverage | A | 21/21 tables protected |
| Policy Strictness | C | Several overly permissive policies |
| Function Security | B- | SECURITY DEFINER used, but missing validation |
| Input Validation | D | is_owner lacks whitelisting |
| Data Privacy | C | Broad SELECT policies on sensitive data |
| Audit Logging | F | No audit trail implemented |
| Encryption | N/A | Managed by Supabase (TDE enabled) |

---

## 🎯 PRODUCTION DEPLOYMENT PLAN

### Phase 1: Critical Fixes (Day 1)
- [ ] Move `20251012000007_down.sql` out of migrations/
- [ ] Fix migration naming discrepancy
- [ ] Add SECURITY DEFINER to counter functions
- [ ] Validate is_owner function inputs
- [ ] Test auth.users trigger with real signup

### Phase 2: Security Hardening (Day 2-3)
- [ ] Restrict venues policies to admin-only
- [ ] Implement candidate visibility restrictions
- [ ] Add company published flag and policy
- [ ] Review and tighten all SELECT policies

### Phase 3: Operational Readiness (Day 4-5)
- [ ] Document backup/recovery procedures
- [ ] Set up monitoring for profile creation
- [ ] Create runbook for common operations
- [ ] Test disaster recovery procedure

### Phase 4: Post-Launch (Week 2)
- [ ] Monitor query performance
- [ ] Add JSONB indexes if needed
- [ ] Remove uuid-ossp extension
- [ ] Implement audit logging for sensitive tables

---

## 📞 SUPPORT & ESCALATION

**Database Issues:**
- Supabase Dashboard: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk
- Supabase Support: support@supabase.com
- Migration Guide: `/home/sk/medellin-spark/supabase/MIGRATION_GUIDE.md`

**Critical Incident Response:**
1. Check Supabase status: https://status.supabase.com
2. Review logs: Supabase Dashboard → Database → Logs
3. Check migration history: `SELECT * FROM supabase_migrations.schema_migrations`
4. Rollback if needed: Use backup restore (DO NOT use down.sql)

---

**Generated:** 2025-10-12
**Next Review:** Before production deployment
**Audit Version:** 1.0
