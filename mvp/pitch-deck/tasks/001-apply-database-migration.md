# Task 003: Apply Database Migration

**Status**: Pending
**Priority**: Critical
**Time**: 5 minutes
**Dependencies**: 002-configure-secrets

---

## Objective

Create the `pitch_conversations` table with Row Level Security (RLS) policies to store conversation state.

---

## Migration Details

**File**: `supabase/migrations/20251016210000_create_pitch_conversations.sql`

**Creates**:
- `pitch_conversations` table
- 4 RLS policies (SELECT, INSERT, UPDATE, DELETE)
- Indexes for performance
- Updated_at trigger

---

## Steps

### 1. Check Migration File Exists

```bash
ls -la supabase/migrations/20251016210000_create_pitch_conversations.sql
```

**Expected**: File exists (created in previous audit fixes)

### 2. Apply Migration

```bash
# Reset database to apply all migrations
supabase db reset

# This will:
# 1. Drop local database
# 2. Re-create schema
# 3. Apply all migrations in order
# 4. Seed data (if any)
```

**Expected output**:
```
Applying migration 20251016210000_create_pitch_conversations.sql...
Finished supabase db reset.
```

### 3. Verify Table Created

```bash
# Check table exists
supabase db execute "SELECT tablename FROM pg_tables WHERE tablename = 'pitch_conversations'"
```

**Expected output**:
```
     tablename
--------------------
 pitch_conversations
(1 row)
```

### 4. Verify RLS Enabled

```bash
# Check RLS is enabled
supabase db execute "SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'pitch_conversations'"
```

**Expected output**:
```
      relname        | relrowsecurity
---------------------+----------------
 pitch_conversations | t
(1 row)
```

`t` = true (RLS enabled) ✅

### 5. Verify Policies Created

```bash
# List RLS policies
supabase db execute "
  SELECT policyname
  FROM pg_policies
  WHERE tablename = 'pitch_conversations'
"
```

**Expected output** (4 policies):
```
                   policyname
-----------------------------------------------
 Users can view own conversations
 Users can create own conversations
 Users can update own conversations
 Users can delete own conversations
(4 rows)
```

---

## Table Schema

```sql
CREATE TABLE pitch_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  messages JSONB DEFAULT '[]'::JSONB NOT NULL,
  collected_data JSONB DEFAULT '{}'::JSONB NOT NULL,
  status TEXT DEFAULT 'active',
  deck_id UUID REFERENCES pitch_decks(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

**Key fields**:
- `messages`: Array of conversation messages (JSONB)
- `collected_data`: Extracted startup information (JSONB)
- `status`: 'active', 'ready_to_generate', 'completed'
- `profile_id`: Links to authenticated user

---

## Troubleshooting

### Migration fails with "relation already exists"
```bash
# Drop table manually and re-run
supabase db execute "DROP TABLE IF EXISTS pitch_conversations CASCADE"
supabase db reset
```

### RLS not enabled
```bash
# Enable manually if needed
supabase db execute "ALTER TABLE pitch_conversations ENABLE ROW LEVEL SECURITY"
```

### No policies found
```bash
# Re-apply migration
supabase db reset
```

---

## Success Criteria

- [ ] Migration applied without errors
- [ ] Table `pitch_conversations` exists
- [ ] RLS enabled (relrowsecurity = true)
- [ ] 4 RLS policies created
- [ ] Indexes created
- [ ] Trigger for updated_at exists

---

## Next Task

✅ Once complete → Proceed to **004-deploy-edge-function.md**
