# OAuth Schema Consistency - Implementation Summary

**Date**: January 13, 2025
**Issue**: Implementation plans referenced database schema that didn't exist in current Supabase setup
**Resolution**: Created migration and updated all documentation

---

## Problem Identified

The OAuth implementation plans (GitHub, Google, Facebook, Apple, LinkedIn) all assumed database fields and tables that didn't exist in the current Supabase schema:

### Missing from Current Schema:
1. **`profiles.provider`** - TEXT field to track OAuth provider ('google', 'github', 'facebook', 'apple', 'linkedin_oidc')
2. **`profiles.provider_id`** - TEXT field for external OAuth provider user ID
3. **`profiles.metadata`** - JSONB field for OAuth-specific metadata
4. **`user_sessions`** table - For tracking login sessions
5. **`oauth_connections`** table - For storing OAuth tokens

### Current Schema (Before Fix):
The `profiles` table only had:
- `id`, `user_id`, `email`, `full_name`, `avatar_url`
- `bio`, `company`, `job_title`, `linkedin_url`, `twitter_url`, `website_url`
- `created_at`, `updated_at`

### Impact:
All SQL queries in implementation plans would have failed:
```sql
-- This query would fail before the fix:
SELECT * FROM profiles WHERE provider = 'github'
-- Error: column "provider" does not exist
```

---

## Solution Implemented

### 1. Created Database Migration
**File**: `/home/sk/medellin-spark/supabase/migrations/20250113000000_add_oauth_fields.sql`

**What It Does**:
- ✅ Adds `provider`, `provider_id`, `metadata` columns to `profiles` table
- ✅ Creates `user_sessions` table for tracking login sessions
- ✅ Creates `oauth_connections` table for storing OAuth tokens
- ✅ Adds indexes for optimal query performance
- ✅ Creates/updates trigger function `handle_new_user()` to auto-populate OAuth fields from `auth.users` metadata
- ✅ Sets up Row Level Security (RLS) policies on all tables
- ✅ Creates helper functions for auto-updating timestamps

### 2. Updated Master Plan
**File**: `supabase/docs/auth/00-auth-plan.md`

Added **Phase 0: Run Database Migration (REQUIRED FIRST)** section with:
- Clear instructions on how to apply the migration
- Verification queries to confirm migration success
- Commands for regenerating TypeScript types
- Troubleshooting guidance

### 3. Updated All Provider Implementation Plans
Updated 5 files with **Phase 0: Database Schema Setup** sections:
- ✅ `03-github.md` - GitHub OAuth implementation
- ✅ `05-google-implementation.md` - Google OAuth implementation
- ✅ `06-facebook-implementation.md` - Facebook OAuth implementation
- ✅ `07-apple-implementation.md` - Apple Sign-In implementation
- ✅ `08-linkedin-implementation.md` - LinkedIn OIDC implementation

Each file now includes:
- Warning that Phase 0 is REQUIRED before proceeding
- Full migration instructions
- Success criteria checklist
- Verification SQL queries
- TypeScript type regeneration steps
- Troubleshooting guide

---

## How to Apply the Fix

### Step 1: Apply Migration to Local Database
```bash
cd /home/sk/medellin-spark
npx supabase db push
```

### Step 2: Verify Migration Success
```sql
-- Check profiles table has new columns
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('provider', 'provider_id', 'metadata');
-- Expected: 3 rows

-- Check new tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('user_sessions', 'oauth_connections');
-- Expected: 2 rows
```

### Step 3: Regenerate TypeScript Types
```bash
npx supabase gen types typescript --local > src/integrations/supabase/types.ts
```

### Step 4: Proceed with OAuth Implementation
After migration is applied, follow any provider implementation plan:
- `03-github.md` for GitHub OAuth
- `05-google-implementation.md` for Google OAuth
- `06-facebook-implementation.md` for Facebook OAuth
- `07-apple-implementation.md` for Apple Sign-In
- `08-linkedin-implementation.md` for LinkedIn OIDC

---

## Verification Checklist

After applying the migration, verify:

- [ ] Migration applied without errors
- [ ] `profiles` table has 3 new columns: `provider`, `provider_id`, `metadata`
- [ ] `user_sessions` table created
- [ ] `oauth_connections` table created
- [ ] RLS policies enabled on all tables
- [ ] Trigger `on_auth_user_created` exists and uses updated `handle_new_user()` function
- [ ] TypeScript types regenerated with new schema
- [ ] All SQL queries in implementation plans will now work

---

## Schema Changes Summary

### `profiles` Table - New Columns
```sql
provider TEXT              -- OAuth provider: 'google', 'github', 'facebook', 'apple', 'linkedin_oidc'
provider_id TEXT           -- External OAuth provider user ID
metadata JSONB DEFAULT '{}' -- OAuth-specific data (profile picture URL, etc.)
```

### `user_sessions` Table - New
```sql
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider TEXT,
  session_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_ended_at TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### `oauth_connections` Table - New
```sql
CREATE TABLE public.oauth_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  provider_user_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  scope TEXT,
  token_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, provider)
);
```

---

## Files Modified

### Migration File (NEW)
- `supabase/migrations/20250113000000_add_oauth_fields.sql` ✨

### Documentation Updated
- `supabase/docs/auth/00-auth-plan.md` - Added Phase 0 section
- `supabase/docs/auth/03-github.md` - Added Phase 0 section + prerequisite
- `supabase/docs/auth/05-google-implementation.md` - Added Phase 0 section + prerequisite
- `supabase/docs/auth/06-facebook-implementation.md` - Added Phase 0 section + prerequisite
- `supabase/docs/auth/07-apple-implementation.md` - Added Phase 0 section + prerequisite
- `supabase/docs/auth/08-linkedin-implementation.md` - Added Phase 0 section + prerequisite

---

## Next Steps

1. **Apply Migration** - Run `npx supabase db push` to apply the migration locally
2. **Test Migration** - Verify all checks pass using verification queries
3. **Regenerate Types** - Update TypeScript types with new schema
4. **Choose Provider** - Pick a provider implementation plan to follow (recommend starting with GitHub - easiest)
5. **Production Deployment** - After testing locally, apply migration to production: `npx supabase db push --linked`

---

## Troubleshooting

### Migration Already Applied
If you see errors like "relation profiles already exists", the migration is idempotent - it's safe to ignore these messages. The migration uses `IF NOT EXISTS` clauses.

### Permission Denied
Check that Supabase local instance is running:
```bash
npx supabase status
```

If not running, start it:
```bash
npx supabase start
```

### Need to Reset Database
⚠️ **WARNING**: This deletes ALL local data:
```bash
npx supabase db reset
```

---

## Summary

**Problem**: Implementation plans assumed schema that didn't exist
**Solution**: Created comprehensive migration + updated all docs with Phase 0
**Result**: All OAuth implementation plans now consistent with database schema

✅ **Ready to implement OAuth social login!**

All provider SQL queries will now work correctly after applying the migration.
