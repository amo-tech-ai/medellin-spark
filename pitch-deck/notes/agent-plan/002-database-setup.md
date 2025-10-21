# Database Setup - pitch_conversations Table

**Time**: 15 minutes
**Difficulty**: Easy

---

## What This Does

Creates a table to store:
- Full conversation history (messages)
- Extracted startup data (company, problem, solution, etc.)
- Conversation state (active, ready, completed)

---

## Step 1: Create Migration (5 min)

**File Already Created**: `supabase/migrations/20251016210000_create_pitch_conversations.sql`

**What it creates**:
```sql
pitch_conversations (
  id              UUID (primary key)
  profile_id      UUID (references auth.users)
  messages        JSONB (full chat history)
  collected_data  JSONB (extracted data)
  status          TEXT (active/ready_to_generate/completed)
  deck_id         UUID (link to generated deck)
  created_at      TIMESTAMP
  updated_at      TIMESTAMP
)
```

**Security**: RLS enabled with user-scoped policies

---

## Step 2: Apply Migration (5 min)

```bash
# Option 1: Reset database (local only)
supabase db reset

# Option 2: Apply specific migration
supabase migration up
```

**Expected output**:
```
Applying migration 20251016210000_create_pitch_conversations.sql...
CREATE TABLE
CREATE INDEX
ALTER TABLE
CREATE POLICY
...
✅ Migration applied successfully
```

---

## Step 3: Verify Table (5 min)

### Check table exists:
```bash
supabase db execute "SELECT table_name FROM information_schema.tables WHERE table_name = 'pitch_conversations'"
```

**Expected**: `pitch_conversations` row returned

### Check RLS enabled:
```bash
supabase db execute "SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'pitch_conversations'"
```

**Expected**: `relrowsecurity = t` (true)

### Check policies:
```bash
supabase db execute "SELECT policyname FROM pg_policies WHERE tablename = 'pitch_conversations'"
```

**Expected**: 4 policies (SELECT, INSERT, UPDATE, DELETE)

---

## Table Structure

### messages Column (JSONB)
**Format**:
```json
[
  {"role": "user", "content": "I need a pitch deck"},
  {"role": "assistant", "content": "Great! What's your company name?"},
  {"role": "user", "content": "EventAI"}
]
```

### collected_data Column (JSONB)
**Format**:
```json
{
  "company_name": "EventAI",
  "industry": "Event Technology",
  "problem": "Manual event planning takes 20+ hours",
  "solution": "AI-powered automation platform",
  "target_market": "Event planners and organizers",
  "business_model": "SaaS subscription"
}
```

### status Values
- `active` - Conversation in progress
- `ready_to_generate` - Enough data collected (80%+)
- `generating` - Creating pitch deck
- `completed` - Deck created successfully
- `cancelled` - User cancelled

---

## RLS Policies Explained

### 1. SELECT Policy
```sql
CREATE POLICY "Users can view own conversations"
  ON pitch_conversations FOR SELECT
  USING (auth.uid() = profile_id);
```
**Means**: You can only see YOUR conversations

### 2. INSERT Policy
```sql
CREATE POLICY "Users can create own conversations"
  ON pitch_conversations FOR INSERT
  WITH CHECK (auth.uid() = profile_id);
```
**Means**: You can only create conversations for YOURSELF

### 3. UPDATE Policy
```sql
CREATE POLICY "Users can update own conversations"
  ON pitch_conversations FOR UPDATE
  USING (auth.uid() = profile_id);
```
**Means**: You can only update YOUR conversations

### 4. DELETE Policy
```sql
CREATE POLICY "Users can delete own conversations"
  ON pitch_conversations FOR DELETE
  USING (auth.uid() = profile_id);
```
**Means**: You can only delete YOUR conversations

---

## Testing

### Test 1: Insert conversation (as service role)
```sql
INSERT INTO pitch_conversations (profile_id, messages)
VALUES (
  auth.uid(),
  '[{"role": "user", "content": "test"}]'::JSONB
)
RETURNING id;
```

**Expected**: UUID returned

### Test 2: Query as user
```sql
SELECT id, profile_id, status, created_at
FROM pitch_conversations
WHERE profile_id = auth.uid();
```

**Expected**: Shows only YOUR conversations

### Test 3: Try to query other user's data
```sql
-- This should return empty (RLS blocks it)
SELECT * FROM pitch_conversations WHERE profile_id != auth.uid();
```

**Expected**: `[]` (empty, blocked by RLS)

---

## Troubleshooting

### Error: "permission denied for table pitch_conversations"
**Cause**: RLS is blocking you
**Fix**: Make sure `auth.uid()` matches `profile_id`

### Error: "relation pitch_conversations does not exist"
**Cause**: Migration not applied
**Fix**: Run `supabase db reset` or `supabase migration up`

### Error: "violates foreign key constraint"
**Cause**: `profile_id` doesn't exist in `auth.users`
**Fix**: Use a valid user ID or sign up first

---

## Cleanup (if needed)

```sql
-- Drop table (CAREFUL - deletes all data)
DROP TABLE IF EXISTS pitch_conversations CASCADE;

-- Disable RLS (NOT RECOMMENDED)
ALTER TABLE pitch_conversations DISABLE ROW LEVEL SECURITY;
```

---

## Next Step

✅ Database ready → Go to `003-edge-function-setup.md`

---

**Note**: This table structure is minimal for MVP. You can add fields later (tags, metadata, analytics).
