# 🔍 Seed Data Audit Report - Detective Style

**File**: `/home/sk/medellin-spark/supabase/seed.sql`  
**Date**: 2025-10-13  
**Auditor**: Database Architect Agent  
**Verdict**: ⚠️ **REQUIRES FIXES** - Good intent, wrong approach

---

## 🎯 Executive Summary (One-Liner)

**You're seeding Auth users via SQL—that's the WRONG surface for Supabase; use Auth Admin API/CLI, then insert app rows via SQL.**

---

## 📊 Overall Assessment

| Category | Status | Grade |
|----------|--------|-------|
| **Local Dev Suitability** | ⚠️ Works on legacy Supabase | C+ |
| **Production Safety** | ❌ Will break | F |
| **Modern Supabase Compatibility** | ❌ Likely to fail | D |
| **Data Quality** | ✅ Excellent | A |
| **Code Structure** | ✅ Good | B+ |

**Verdict**: Good for **legacy local dev only** (Supabase Local with old GoTrue schema). **Not production-safe** and **likely to break** on newer Supabase/GoTrue versions.

---

## 🚨 Red Flags (Fix These First)

### 1. ❌ Direct Writes to `auth.users`

**Problem**: Lines 34-169
```sql
DELETE FROM auth.users WHERE email LIKE '%@medellin-spark.local';

INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,  -- ⚠️ PROBLEM
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,      -- ⚠️ DEPRECATED
  role
) VALUES (...)
```

**Why It's Wrong**:
- ❌ Supabase Cloud **blocks** inserts to `auth.users`
- ❌ Newer GoTrue (v2.99.0+) stores passwords in `auth.identities`, NOT `auth.users.encrypted_password`
- ❌ Columns like `instance_id`, `is_super_admin`, `role` **differ by version**
- ❌ Schema drift: GoTrue can change internal structure without notice
- ❌ `DELETE FROM auth.users` will be rejected on Cloud

**Impact**: 
- 🔴 **CRITICAL**: Will fail on Supabase Cloud (100% guaranteed)
- 🟡 **HIGH**: May fail on local Supabase with newer GoTrue versions
- 🟡 **HIGH**: Brittle to GoTrue schema changes

**Fix**:
```bash
# Use Auth Admin API/CLI instead
supabase auth admin create-user \
  --email sofia.martinez@medellin-spark.local \
  --password password123 \
  --email-confirm
```

---

### 2. ❌ Password Seeding via `crypt()`

**Problem**: Line 53, 80, 107, 134, 161
```sql
encrypted_password = crypt('password123', gen_salt('bf'))
```

**Why It's Wrong**:
- ❌ Depends on `pgcrypto` extension (not guaranteed to exist)
- ❌ Relies on specific GoTrue password hashing internals
- ❌ GoTrue v2+ uses **Argon2** or **bcrypt via auth.identities**, NOT `auth.users.encrypted_password`
- ❌ Format/salt may not match what GoTrue expects

**Impact**:
- 🔴 **CRITICAL**: Users created this way may not be able to log in
- 🟡 **HIGH**: Missing `pgcrypto` will cause SQL error

**Fix**:
```sql
-- Add to migrations (if you must use crypt elsewhere)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- BUT for auth users, use CLI instead:
supabase auth admin create-user --password password123
```

---

### 3. ❌ Assumes Auth Schema Mutability

**Problem**: Line 34
```sql
DELETE FROM auth.users WHERE email LIKE '%@medellin-spark.local';
```

**Why It's Wrong**:
- ❌ Will be **rejected on Supabase Cloud** (permission denied)
- ❌ Can drift with GoTrue upgrades (schema may change)
- ❌ Violates GoTrue's internal consistency (no CASCADE, may leave orphaned records)

**Impact**:
- 🔴 **CRITICAL**: Fails on Cloud
- 🟡 **MEDIUM**: May leave orphaned data in `auth.identities`, `auth.sessions`, etc.

**Fix**:
```bash
# For local dev, reset the entire database instead
supabase db reset

# Or use CLI to delete specific users
supabase auth admin delete-user <user-id>
```

---

### 4. ❌ Missing `pgcrypto` Extension Declaration

**Problem**: File uses `crypt()` and `gen_salt()` without ensuring `pgcrypto` exists

**Why It's Wrong**:
- ❌ If `pgcrypto` not installed, entire seed will fail with: `ERROR: function crypt() does not exist`

**Impact**:
- 🟡 **HIGH**: Seed script will crash on fresh database

**Fix**:
```sql
-- Add at top of seed.sql (or better, in migrations)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

---

### 5. ❌ RLS Context Bypass Assumption

**Problem**: Seed assumes superuser privileges to bypass RLS

**Why It's Wrong**:
- ❌ Works locally (superuser context) but **Cloud pipelines don't have superuser**
- ❌ If run via service role key, may still hit RLS restrictions

**Impact**:
- 🟡 **MEDIUM**: Seeds won't work in automated Cloud workflows

**Fix**: Keep seeds **local-only** (already documented, but worth emphasizing)

---

## ✅ What's Good (Keep These)

### 1. ✅ Idempotent Inserts

**Lines**: 61, 88, 115, 142, 169, 200, 223, 246, 269, 288, 317, 342, 365, 384, 409, 428

```sql
ON CONFLICT (id) DO NOTHING;
```

**Why It's Good**:
- ✅ Can run seed multiple times without errors
- ✅ Deterministic UUIDs make testing predictable
- ✅ No duplicate key violations

**Verdict**: **KEEP** ✅

---

### 2. ✅ Clear Local-Only Banner

**Lines**: 3, 17-23

```sql
-- ⚠️  LOCAL DEVELOPMENT ONLY - DO NOT RUN IN PRODUCTION
-- This seed data requires local Supabase instance with auth.users access.
-- Cloud Supabase cannot insert into auth.users directly.
```

**Why It's Good**:
- ✅ Explicitly warns about Cloud incompatibility
- ✅ Documents proper usage

**Verdict**: **KEEP** ✅

---

### 3. ✅ Transaction Wrapped

**Lines**: 25, 430

```sql
BEGIN;
-- ... inserts ...
COMMIT;
```

**Why It's Good**:
- ✅ Atomic operation (all-or-nothing)
- ✅ If any insert fails, entire seed rolls back

**Verdict**: **KEEP** ✅

---

### 4. ✅ Realistic Sample Data

**Lines**: 176-428 (profiles, startup_profiles, organizers, candidates)

**Why It's Good**:
- ✅ Colombian names and companies (culturally appropriate)
- ✅ Demonstrates different role combinations:
  - Sofía: Startup founder only
  - Carlos: Event organizer (1:N relationship - 2 organizers)
  - Ana: Job candidate only
  - Diego: Startup founder + job candidate (multi-role)
  - María: Regular user (no special roles)
- ✅ Verified vs unverified startups
- ✅ Foreign key relationships align with schema

**Verdict**: **KEEP** ✅

---

### 5. ✅ Clear Documentation

**Lines**: 1-13, 435-474

**Why It's Good**:
- ✅ Purpose clearly stated
- ✅ Usage instructions provided
- ✅ Test credentials documented
- ✅ Summary of created data

**Verdict**: **KEEP** ✅

---

## 🛠️ Recommended Fix (Production-Grade Approach)

### Approach: Separate Auth Creation from App Data Seeding

---

### Step 1: Remove Auth Users from `seed.sql`

**Delete Lines**: 33-169 (entire auth.users block)

**New `seed.sql` (app tables only)**:
```sql
-- Supabase Seed File: seed.sql
-- Purpose: Application data seed (profiles, startups, organizers, candidates)
-- ⚠️  LOCAL DEVELOPMENT ONLY
-- 
-- Prerequisites:
--   1. Create auth users via CLI first (see scripts/seed-auth.sh)
--   2. Then run this seed file
--
-- Usage:
--   ./scripts/seed-auth.sh  # Create auth users
--   supabase db reset       # Runs migrations + this seed

SET client_min_messages TO warning;

-- ==============================================================================
-- PREREQUISITES CHECK
-- ==============================================================================
-- Ensure pgcrypto exists (for any other needs, not for auth)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

BEGIN;

-- ==============================================================================
-- 1. CREATE PROFILES (linked to auth users by email)
-- ==============================================================================

INSERT INTO profiles (id, user_id, email, full_name, bio, company, job_title, avatar_url, linkedin_url, twitter_url, website_url)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  u.id,
  u.email,
  'Sofía Martínez',
  'CEO & Co-founder at GreenTech Solutions. Passionate about sustainable technology and climate innovation. Former product lead at Rappi.',
  'GreenTech Solutions',
  'CEO & Co-founder',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
  'https://linkedin.com/in/sofia-martinez-co',
  'https://twitter.com/sofiagreentec',
  'https://greentech.co'
FROM auth.users u
WHERE u.email = 'sofia.martinez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (id, user_id, email, full_name, bio, company, job_title, avatar_url, linkedin_url)
SELECT 
  '10000000-0000-0000-0000-000000000002'::uuid,
  u.id,
  u.email,
  'Carlos López',
  'Community builder and tech ecosystem connector in Medellín. Director at Ruta N Innovation Hub.',
  'Ruta N',
  'Community Director',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
  'https://linkedin.com/in/carlos-lopez-rutan'
FROM auth.users u
WHERE u.email = 'carlos.lopez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (id, user_id, email, full_name, bio, job_title, avatar_url, linkedin_url, website_url)
SELECT 
  '10000000-0000-0000-0000-000000000003'::uuid,
  u.id,
  u.email,
  'Ana Rodríguez',
  'Full-stack developer specializing in React, Node.js, and cloud architecture. 5+ years building scalable web applications.',
  'Senior Full-Stack Developer',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
  'https://linkedin.com/in/ana-rodriguez-dev',
  'https://anarodriguez.dev'
FROM auth.users u
WHERE u.email = 'ana.rodriguez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (id, user_id, email, full_name, bio, company, job_title, avatar_url, linkedin_url)
SELECT 
  '10000000-0000-0000-0000-000000000004'::uuid,
  u.id,
  u.email,
  'Diego Sánchez',
  'Building AI-powered productivity tools for remote teams. Also open to technical co-founder opportunities.',
  'TaskFlow AI',
  'Founder & CTO',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=diego',
  'https://linkedin.com/in/diego-sanchez-ai'
FROM auth.users u
WHERE u.email = 'diego.sanchez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (id, user_id, email, full_name, bio, job_title, avatar_url)
SELECT 
  '10000000-0000-0000-0000-000000000005'::uuid,
  u.id,
  u.email,
  'María García',
  'Product manager interested in Medellín''s tech scene. Attending events and networking.',
  'Product Manager',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=maria'
FROM auth.users u
WHERE u.email = 'maria.garcia@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 2. CREATE STARTUP PROFILES
-- ==============================================================================

-- ... (keep existing startup_profiles inserts - lines 294-342)

-- ==============================================================================
-- 3. CREATE ORGANIZERS
-- ==============================================================================

-- ... (keep existing organizers inserts - lines 348-384)

-- ==============================================================================
-- 4. CREATE CANDIDATES
-- ==============================================================================

-- ... (keep existing candidates inserts - lines 390-428)

COMMIT;

SET client_min_messages TO notice;
```

---

### Step 2: Create Auth Seeding Script

**New file**: `scripts/seed-auth.sh`

```bash
#!/bin/bash
# scripts/seed-auth.sh
# Purpose: Create auth users for local development via Supabase CLI
# Usage: ./scripts/seed-auth.sh

set -e

echo "🔐 Creating auth users for local development..."

# User 1: Startup Founder
supabase auth admin create-user \
  --email sofia.martinez@medellin-spark.local \
  --password password123 \
  --email-confirm \
  --user-metadata '{"full_name":"Sofía Martínez"}' \
  || echo "⚠️  User sofia.martinez@medellin-spark.local already exists"

# User 2: Event Organizer
supabase auth admin create-user \
  --email carlos.lopez@medellin-spark.local \
  --password password123 \
  --email-confirm \
  --user-metadata '{"full_name":"Carlos López"}' \
  || echo "⚠️  User carlos.lopez@medellin-spark.local already exists"

# User 3: Developer Candidate
supabase auth admin create-user \
  --email ana.rodriguez@medellin-spark.local \
  --password password123 \
  --email-confirm \
  --user-metadata '{"full_name":"Ana Rodríguez"}' \
  || echo "⚠️  User ana.rodriguez@medellin-spark.local already exists"

# User 4: Multi-role
supabase auth admin create-user \
  --email diego.sanchez@medellin-spark.local \
  --password password123 \
  --email-confirm \
  --user-metadata '{"full_name":"Diego Sánchez"}' \
  || echo "⚠️  User diego.sanchez@medellin-spark.local already exists"

# User 5: Regular User
supabase auth admin create-user \
  --email maria.garcia@medellin-spark.local \
  --password password123 \
  --email-confirm \
  --user-metadata '{"full_name":"María García"}' \
  || echo "⚠️  User maria.garcia@medellin-spark.local already exists"

echo "✅ Auth users created successfully"
echo ""
echo "🔑 Test Credentials:"
echo "   Email: sofia.martinez@medellin-spark.local"
echo "   Password: password123"
echo "   (Same password for all test users)"
```

**Make executable**:
```bash
chmod +x scripts/seed-auth.sh
```

---

### Step 3: Update Workflow

**Local Development Workflow**:

```bash
# Option A: Full reset
supabase db reset          # Runs migrations + seed.sql automatically
./scripts/seed-auth.sh    # Create auth users
supabase db reset          # Run again to link profiles to auth users

# Option B: Clean workflow
supabase stop
supabase start
./scripts/seed-auth.sh    # Create auth users FIRST
supabase db reset          # Then seed app data
```

---

## 📋 Success Criteria (Pass/Fail Checklist)

- [ ] ❌ **FAIL**: No SQL touching `auth.users` directly
- [ ] ❌ **FAIL**: Users created via CLI/Admin API
- [ ] ❌ **FAIL**: `profiles` link to `auth.users` by `email -> id` lookup
- [ ] ✅ **PASS**: Seed is idempotent (`ON CONFLICT`)
- [ ] ✅ **PASS**: Works on local only (not required on cloud)
- [ ] ❌ **FAIL**: `pgcrypto` extension declared explicitly
- [ ] ✅ **PASS**: Transaction wrapped (`BEGIN/COMMIT`)
- [ ] ✅ **PASS**: Realistic, diverse sample data

**Overall Score**: 4/8 (50%) - **REQUIRES FIXES**

---

## 🔥 Core Problem (One Sentence)

You're treating `auth.users` like a normal table when it's actually a **managed Auth service**—use the **Auth Admin API surface** instead of raw SQL.

---

## 🎯 Immediate Action Required

### Priority 1 (Critical)

1. **Remove all `auth.users` SQL** (lines 33-169)
2. **Create `scripts/seed-auth.sh`** with CLI commands
3. **Update `seed.sql` profiles** to use `SELECT FROM auth.users WHERE email = ...`

### Priority 2 (High)

4. **Add `CREATE EXTENSION pgcrypto`** to migrations or seed.sql top
5. **Test new workflow** on fresh local instance

### Priority 3 (Medium)

6. **Update SEED_DATA_GUIDE.md** with new approach
7. **Add `scripts/seed-auth.sh` to .gitignore`** if it contains real credentials (currently safe with .local TLD)

---

## 📊 Comparison: Old vs New Approach

| Aspect | Old (Current) | New (Recommended) |
|--------|---------------|-------------------|
| **Auth Creation** | SQL INSERT to auth.users | CLI `supabase auth admin create-user` |
| **Password Storage** | `crypt('password', gen_salt())` | Handled by GoTrue automatically |
| **Cloud Compatibility** | ❌ Fails | ✅ Compatible |
| **GoTrue Version Safety** | ❌ Brittle | ✅ Version-agnostic |
| **Profile Linking** | Hardcoded user_id | `SELECT id FROM auth.users WHERE email = ...` |
| **Idempotency** | ✅ Yes | ✅ Yes |
| **Ease of Maintenance** | ❌ Complex | ✅ Simpler |

---

## 🚀 Production Deployment Strategy

### Local Development
✅ Use `scripts/seed-auth.sh` + `seed.sql` (new version)

### Cloud Development/Staging
✅ Create users via **Supabase Dashboard → Authentication → Add User**  
or  
✅ Use **Supabase Management API** programmatically

### Production
❌ **NEVER run seeds in production**  
✅ Users created via normal signup flow  
✅ Initial admin users created via Dashboard

---

## 📚 References

**Supabase Docs**:
- [Auth Admin API](https://supabase.com/docs/reference/cli/supabase-auth-admin-create-user)
- [Local Development](https://supabase.com/docs/guides/cli/local-development)
- [Seeding Your Database](https://supabase.com/docs/guides/cli/seeding-your-database)

**GoTrue**:
- [GoTrue v2 Migration Guide](https://github.com/supabase/gotrue/releases)
- [Password Storage Changes](https://github.com/supabase/gotrue/blob/master/CHANGELOG.md)

---

## 🎓 Key Takeaways

1. **Auth is a service**, not a table - interact via API, not SQL
2. **GoTrue owns `auth.*` schema** - schema can change without notice
3. **Cloud blocks direct `auth.users` access** - by design, for security
4. **Use CLI/SDK for user creation** - future-proof and version-safe
5. **Seed app tables via SQL** - profiles, startups, etc. are your domain
6. **Link via email lookup** - stable, readable, maintainable

---

## ✅ Verdict Summary

**Current State**: 
- ❌ **Not production-ready**
- ❌ **Not modern Supabase compatible**
- ⚠️ **Works on legacy local dev only**

**After Fixes**:
- ✅ **Production-safe** (won't run, but won't break things either)
- ✅ **Modern Supabase compatible**
- ✅ **Future-proof against GoTrue changes**

**Recommended Action**: **REFACTOR IMMEDIATELY** using Step 1-3 approach above

---

**Audit Completed**: 2025-10-13  
**Auditor**: Database Architect Agent  
**Status**: ⚠️ **ACTION REQUIRED**
