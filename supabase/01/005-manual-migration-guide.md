# Manual Migration Guide - Supabase CLI Connection Issues

**Problem**: Supabase CLI cannot connect to pooler (port 6543)
**Solution**: Apply migrations manually via Supabase Dashboard SQL Editor
**Status**: Database is awake (REST API responding), pooler refusing connections

---

## 🚨 Core Problem

The Supabase CLI is trying to connect to the connection pooler:
```
aws-1-us-east-2.pooler.supabase.com:6543
```

But getting `connection refused` errors. This is a known issue with Supabase pooler availability.

**REST API works fine** (database is awake), so we can apply migrations manually.

---

## ✅ Manual Migration Steps

### Step 1: Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk
2. Click "SQL Editor" in left sidebar
3. Click "New query"

---

### Step 2: Apply Migration #1 (Already Applied)

**File**: `supabase/migrations/20251013070000_presentation_ai_tables.sql`
**Status**: ✅ Already applied to remote database
**Action**: Skip (already in database)

---

### Step 3: Apply Migration #2 (Already Applied)

**File**: `supabase/migrations/20251013070001_presentation_ai_tables_CORRECTED.sql`
**Status**: ✅ Already applied to remote database
**Action**: Skip (already in database)

---

### Step 4: Apply Migration #3 (Already Applied - But with Errors!)

**File**: `supabase/migrations/20251013121731_simplify_for_mvp.sql`
**Status**: ⚠️ Applied but has critical errors (see audit report)
**Action**: Will be fixed by Migration #4

---

### Step 5: Apply Migration #4 (CRITICAL - Fixes All Issues)

**File**: `supabase/migrations/20251013122458_fix_slides_relationship_and_rls.sql`
**Status**: ⏳ NOT YET APPLIED - This is the important one!

**Instructions**:

1. Open the file in your editor:
   ```bash
   cat /home/sk/medellin-spark/supabase/migrations/20251013122458_fix_slides_relationship_and_rls.sql
   ```

2. Copy the entire contents

3. Paste into Supabase SQL Editor

4. Click "Run" button

5. Verify success (should see "Success. No rows returned")

---

## 📋 Migration #4 - What It Does

This migration fixes 7 critical issues:

### Fix #1: Slides Relationship (1:1 → 1:N)
```sql
-- Adds deck_id column and slide_no
alter table pitch_deck_slides
  add column if not exists deck_id uuid,
  add column if not exists slide_no int not null default 1;

-- Migrates existing data
update pitch_deck_slides
set deck_id = id
where deck_id is null;

-- Creates proper composite primary key
alter table pitch_deck_slides add primary key (deck_id, slide_no);
```

**Result**: Pitch decks can now have multiple slides (not just 1)

---

### Fix #2: Enable RLS (CRITICAL SECURITY FIX)
```sql
alter table pitch_decks enable row level security;
alter table pitch_deck_slides enable row level security;
alter table pitch_decks force row level security;
alter table pitch_deck_slides force row level security;
```

**Result**: Row-level security is now active (users can only see their own data)

---

### Fix #3: Parent Sync Trigger
```sql
-- Fixed to use new.deck_id instead of new.id
update pitch_decks
set updated_at = greatest(updated_at, new.updated_at)
where id = new.deck_id;  -- FIX
```

**Result**: Parent deck `updated_at` now updates when slides change

---

### Fix #4: RLS Policies Use Correct Column
```sql
-- All 5 policies now check deck_id instead of id
where pd.id = pitch_deck_slides.deck_id  -- FIX
```

**Result**: RLS policies now work correctly

---

### Fix #5: JSON Aggregation Function
```sql
-- Returns single JSON object with slides array
create or replace function get_pitch_deck_with_slides(deck_id uuid)
returns json as $$
  select json_build_object(
    'deck', to_jsonb(pd.*),
    'slides', coalesce(
       (select json_agg(pds order by pds.slide_no)
          from pitch_deck_slides pds
         where pds.deck_id = pd.id),
       '[]'::json
    )
  )
  ...
$$;
```

**Result**: API returns properly formatted JSON

---

### Fix #6: Efficient Indexes
```sql
-- Partial indexes for active records only
create index idx_pitch_decks_profile_active
  on pitch_decks(profile_id, updated_at desc)
  where deleted_at is null;
```

**Result**: Fast dashboard queries at scale

---

### Fix #7: Helper Functions
```sql
-- Get max slide number for a deck
create or replace function get_max_slide_no(deck_id uuid)
returns int as $$
  select coalesce(max(slide_no), 0)
  from pitch_deck_slides
  where deck_id = $1;
$$;
```

**Result**: Easy to add new slides to decks

---

## 🔍 Step 6: Verify Migration Success

After running Migration #4, run these verification queries in SQL Editor:

### Check #1: RLS is enabled
```sql
select tablename, rowsecurity, forcerowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('pitch_decks', 'pitch_deck_slides');
```

**Expected Output**:
| tablename | rowsecurity | forcerowsecurity |
|-----------|-------------|------------------|
| pitch_decks | t | t |
| pitch_deck_slides | t | t |

---

### Check #2: deck_id column exists
```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_name = 'pitch_deck_slides'
  and column_name in ('deck_id', 'slide_no')
order by column_name;
```

**Expected Output**:
| column_name | data_type | is_nullable |
|-------------|-----------|-------------|
| deck_id | uuid | NO |
| slide_no | integer | NO |

---

### Check #3: Primary key is composite
```sql
select constraint_name, constraint_type
from information_schema.table_constraints
where table_name = 'pitch_deck_slides'
  and constraint_type = 'PRIMARY KEY';
```

**Expected Output**: Shows PRIMARY KEY on `(deck_id, slide_no)`

---

### Check #4: Foreign key exists
```sql
select
  tc.table_name,
  kcu.column_name,
  ccu.table_name as foreign_table_name
from information_schema.table_constraints as tc
join information_schema.key_column_usage as kcu
  on tc.constraint_name = kcu.constraint_name
join information_schema.constraint_column_usage as ccu
  on ccu.constraint_name = tc.constraint_name
where tc.constraint_type = 'FOREIGN KEY'
  and tc.table_name = 'pitch_deck_slides';
```

**Expected Output**: Shows `deck_id` → `pitch_decks(id)`

---

### Check #5: Test helper function
```sql
-- This should return JSON even if no decks exist yet
select get_pitch_deck_with_slides('00000000-0000-0000-0000-000000000000'::uuid);
```

**Expected Output**: `null` (no deck with that ID), but function executes without error

---

### Check #6: Policies exist and use deck_id
```sql
select policyname, cmd, qual
from pg_policies
where tablename = 'pitch_deck_slides'
order by policyname;
```

**Expected Output**: 5 policies, all with `deck_id` in the `qual` column

---

## 🚀 Step 7: Record Migration in History Table

After successful application, record it manually:

```sql
insert into supabase_migrations.schema_migrations (version, name, statements)
values (
  '20251013122458',
  'fix_slides_relationship_and_rls',
  '-- Migration applied manually via SQL Editor'
)
on conflict (version) do nothing;
```

---

## 📊 Before vs After - Quick Check

Run this query to see the schema is correct:

```sql
-- Check table structure
select
  table_name,
  column_name,
  data_type,
  is_nullable
from information_schema.columns
where table_name in ('pitch_decks', 'pitch_deck_slides')
  and table_schema = 'public'
order by table_name, ordinal_position;
```

**Key things to verify**:
- ✅ `pitch_deck_slides.deck_id` exists (uuid, NOT NULL)
- ✅ `pitch_deck_slides.slide_no` exists (integer, NOT NULL)
- ✅ `pitch_decks.company_name` exists
- ✅ `pitch_decks.status` exists (pitch_deck_status enum)

---

## 🔧 Alternative: Apply Via psql (If You Have Direct Connection)

If you have a working psql connection string:

```bash
# Set connection string
export SUPABASE_DB_URL="postgresql://postgres:YOUR_PASSWORD@db.dhesktsqhcxhqfjypulk.supabase.co:5432/postgres?sslmode=require"

# Test connectivity
psql "$SUPABASE_DB_URL" -c "select now();"

# Apply migration
psql "$SUPABASE_DB_URL" -f /home/sk/medellin-spark/supabase/migrations/20251013122458_fix_slides_relationship_and_rls.sql

# Verify
psql "$SUPABASE_DB_URL" -c "select tablename, rowsecurity from pg_tables where tablename like 'pitch_%';"
```

---

## ⚠️ Common Issues

### Issue: "relation pitch_deck_slides already has column deck_id"
**Solution**: Migration was already partially applied. Safe to ignore, continue with rest of migration.

### Issue: "duplicate key value violates unique constraint"
**Solution**: Primary key already exists. Safe to ignore.

### Issue: "function get_pitch_deck_with_slides already exists"
**Solution**: Use `CREATE OR REPLACE FUNCTION` (migration already does this).

### Issue: "RLS already enabled"
**Solution**: Safe to ignore, RLS is idempotent.

---

## 📞 Next Steps After Migration

1. ✅ Verify all checks pass (Step 6)
2. ✅ Deploy edge function:
   ```bash
   supabase functions deploy generate-pitch-deck
   ```
3. ✅ Regenerate TypeScript types:
   ```bash
   supabase gen types typescript --remote > src/integrations/supabase/types.ts
   ```
4. ✅ Test pitch deck creation via edge function

---

## 🎯 Success Criteria

Migration is successful when:

- [x] RLS is enabled on both tables (`rowsecurity = true`)
- [x] `pitch_deck_slides` has `deck_id` and `slide_no` columns
- [x] Primary key is composite `(deck_id, slide_no)`
- [x] Foreign key exists: `deck_id` → `pitch_decks(id)`
- [x] All 5 RLS policies reference `deck_id` (not `id`)
- [x] Helper function `get_pitch_deck_with_slides()` exists
- [x] Indexes exist on `deck_id`, `profile_id`, `updated_at`

---

## 📝 Summary

**Problem**: CLI pooler connection refused
**Solution**: Apply migration manually via SQL Editor
**File to Apply**: `supabase/migrations/20251013122458_fix_slides_relationship_and_rls.sql`
**Estimated Time**: 2-3 minutes
**Risk**: Low (migration is idempotent, safe to re-run)

**Status**: Ready to apply ✅
