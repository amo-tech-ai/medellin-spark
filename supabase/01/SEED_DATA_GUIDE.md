# 📊 Seed Data Guide - Supabase Best Practices

## Overview

This guide explains how to properly manage seed data in Supabase projects for local development and testing.

---

## 🏗️ File Structure

```
supabase/
├── migrations/           # Schema migrations (applied everywhere)
│   ├── 20251013020000_fix_organizers_email_constraint.sql
│   └── ...other migrations
├── seed.sql             # Local development seed data (LOCAL ONLY)
└── SEED_DATA_GUIDE.md   # This file
```

---

## 🎯 Key Concepts

### 1. Migrations vs Seeds

| Aspect | Migrations | Seeds |
|--------|-----------|-------|
| **Purpose** | Schema changes (DDL) | Sample data (DML) |
| **Applied To** | All environments | LOCAL ONLY |
| **When** | On `db push`, `db reset` | On `db reset` only |
| **Location** | `supabase/migrations/` | `supabase/seed.sql` |
| **Format** | Timestamped files | Single seed.sql file |
| **In Production** | ✅ Applied automatically | ❌ Never applied |

### 2. Cloud vs Local Seeds

**❌ Cloud Supabase:**
- Cannot insert into `auth.users` directly
- Seed data via Dashboard → Authentication → Add User
- Or use Supabase Auth API for programmatic user creation
- `seed.sql` file is **ignored** in cloud projects

**✅ Local Supabase:**
- Can insert into `auth.users` for testing
- `seed.sql` runs automatically on `supabase db reset`
- Full database access via local PostgreSQL

---

## 📝 Best Practices

### ✅ DO

1. **Use seed.sql for Local Development Only**
   ```sql
   -- ✅ GOOD: seed.sql
   -- Purpose: Local development seed data
   -- ⚠️  LOCAL ONLY - Not applied to cloud

   INSERT INTO profiles (id, email, full_name) VALUES
     ('test-user-1', 'test@local.dev', 'Test User');
   ```

2. **Use Idempotent Inserts**
   ```sql
   -- ✅ GOOD: Safe to run multiple times
   INSERT INTO profiles (id, email, full_name)
   VALUES ('...', '...', '...')
   ON CONFLICT (id) DO NOTHING;

   -- Or use upserts
   INSERT INTO profiles (id, email, full_name)
   VALUES ('...', '...', '...')
   ON CONFLICT (id) DO UPDATE SET
     full_name = EXCLUDED.full_name;
   ```

3. **Use Deterministic UUIDs for Testing**
   ```sql
   -- ✅ GOOD: Predictable IDs for tests
   INSERT INTO profiles (id, ...) VALUES
     ('00000000-0000-0000-0000-000000000001'::uuid, ...);

   -- ❌ BAD: Random UUIDs make tests flaky
   INSERT INTO profiles (id, ...) VALUES
     (gen_random_uuid(), ...);
   ```

4. **Document Test Credentials**
   ```sql
   -- ==============================================================================
   -- 🔑 TEST CREDENTIALS (LOCAL ONLY)
   -- ==============================================================================
   -- Email: test@medellin-spark.local
   -- Password: password123
   -- ==============================================================================
   ```

5. **Use .local TLD for Test Emails**
   ```sql
   -- ✅ GOOD: Clearly test data
   email: 'sofia.martinez@medellin-spark.local'

   -- ❌ BAD: Looks like real email
   email: 'sofia.martinez@gmail.com'
   ```

6. **Wrap in Transactions**
   ```sql
   BEGIN;
     INSERT INTO profiles ...;
     INSERT INTO startup_profiles ...;
   COMMIT;
   ```

### ❌ DON'T

1. **Don't Put Seed Data in Migrations**
   ```sql
   -- ❌ BAD: migration file 20251013000001_users.sql
   CREATE TABLE profiles (...);

   INSERT INTO profiles VALUES (...); -- ❌ Don't do this!
   ```

   **Why?** Migrations run in production. Seeds belong in seed.sql.

2. **Don't Use Real User Data**
   ```sql
   -- ❌ BAD: Real email addresses
   INSERT INTO profiles (email) VALUES ('john.doe@gmail.com');

   -- ✅ GOOD: Fake test data
   INSERT INTO profiles (email) VALUES ('john.doe@medellin-spark.local');
   ```

3. **Don't Hardcode Production Values**
   ```sql
   -- ❌ BAD: Production API keys
   INSERT INTO config (key, value) VALUES
     ('stripe_key', 'sk_live_...');

   -- ✅ GOOD: Test keys or placeholders
   INSERT INTO config (key, value) VALUES
     ('stripe_key', 'sk_test_...');
   ```

4. **Don't Create Non-Idempotent Seeds**
   ```sql
   -- ❌ BAD: Fails on second run
   INSERT INTO profiles VALUES (...);

   -- ✅ GOOD: Safe to run multiple times
   INSERT INTO profiles VALUES (...)
   ON CONFLICT DO NOTHING;
   ```

---

## 🚀 Usage

### Local Development

```bash
# Reset database and apply seeds
supabase db reset

# This runs:
# 1. Drops all tables
# 2. Re-runs all migrations
# 3. Runs seed.sql
```

### Testing Specific Seeds

```bash
# Apply seeds to existing DB (without reset)
psql postgresql://postgres:postgres@localhost:54322/postgres -f supabase/seed.sql
```

### Cloud Deployment

```bash
# Push migrations to cloud (seeds NOT included)
supabase db push

# Seeds must be added manually via:
# 1. Supabase Dashboard → Authentication → Add User
# 2. Supabase Dashboard → Table Editor → Insert Row
# 3. Supabase Auth API (programmatic user creation)
```

---

## 📋 Seed Data Structure

### Recommended Order

Insert data in dependency order (parent tables first):

```sql
BEGIN;

-- 1. Auth users (if local)
INSERT INTO auth.users ...;

-- 2. Profiles (references auth.users)
INSERT INTO profiles ...;

-- 3. Role tables (reference profiles)
INSERT INTO startup_profiles ...;
INSERT INTO organizers ...;
INSERT INTO candidates ...;

-- 4. Content tables (reference roles)
INSERT INTO events ...;
INSERT INTO jobs ...;

COMMIT;
```

### Example Structure

```sql
-- ==============================================================================
-- 1. AUTH USERS (LOCAL ONLY)
-- ==============================================================================
INSERT INTO auth.users (id, email, ...) VALUES
  ('00000000-0000-0000-0000-000000000001', 'user1@local.dev', ...)
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- 2. PROFILES
-- ==============================================================================
INSERT INTO profiles (id, user_id, email, full_name) VALUES
  ('10000000-...', '00000000-...', 'user1@local.dev', 'User One')
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- 3. STARTUP PROFILES
-- ==============================================================================
INSERT INTO startup_profiles (id, profile_id, company_name, verified) VALUES
  ('20000000-...', '10000000-...', 'StartupCo', true)
ON CONFLICT DO NOTHING;
```

---

## 🔧 Troubleshooting

### Error: Foreign Key Violation

**Problem:**
```
ERROR: insert or update on table "profiles" violates foreign key constraint
DETAIL: Key (user_id)=(00000000-...) is not present in table "users"
```

**Solution:**
You're trying to seed profiles in cloud Supabase. This requires auth.users records which can only be created via Auth API in cloud.

**Fix for Local:**
```sql
-- Add auth.users insert BEFORE profiles
INSERT INTO auth.users (...) VALUES (...);
INSERT INTO profiles (...) VALUES (...);
```

**Fix for Cloud:**
Use Supabase Dashboard or Auth API to create users first.

---

### Error: Unique Constraint Violation

**Problem:**
```
ERROR: duplicate key value violates unique constraint "profiles_email_unique"
DETAIL: Key (email)=(test@local.dev) already exists.
```

**Solution:**
Use `ON CONFLICT` to make seeds idempotent.

**Fix:**
```sql
INSERT INTO profiles (email, full_name) VALUES
  ('test@local.dev', 'Test User')
ON CONFLICT (email) DO NOTHING;
-- Or: ON CONFLICT (email) DO UPDATE SET ...
```

---

### Password Hashing for Test Users

**Local Development:**
```sql
-- Use bcrypt hashing for auth.users passwords
INSERT INTO auth.users (encrypted_password, ...) VALUES
  (crypt('password123', gen_salt('bf')), ...);
```

**Cloud Deployment:**
Users created via Dashboard or Auth API have passwords automatically hashed.

---

## 📚 References

**Supabase Docs:**
- [Local Development](https://supabase.com/docs/guides/cli/local-development)
- [Seeding Your Database](https://supabase.com/docs/guides/cli/seeding-your-database)
- [Managing User Data](https://supabase.com/docs/guides/auth/managing-user-data)

**PostgreSQL:**
- [INSERT Conflicts (ON CONFLICT)](https://www.postgresql.org/docs/current/sql-insert.html)
- [Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)

---

## ✅ Checklist

Before committing seed.sql:

- [ ] Uses `ON CONFLICT` for idempotency
- [ ] Uses `.local` TLD for test emails
- [ ] Wrapped in `BEGIN/COMMIT` transaction
- [ ] Includes clear comments explaining purpose
- [ ] Uses deterministic UUIDs for predictability
- [ ] Documents test credentials
- [ ] Follows dependency order (auth → profiles → roles)
- [ ] Contains realistic, diverse test data
- [ ] No production secrets or real user data
- [ ] Tested with `supabase db reset`

---

**Last Updated:** 2025-10-13
**Author:** Database Architect Agent

