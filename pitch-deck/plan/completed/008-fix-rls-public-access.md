# Task 008: Fix RLS for Public Presentations

**Priority**: 🔴 CRITICAL
**Estimated Time**: 30 minutes
**Dependencies**: None
**Status**: 🟡 Ready to Start

---

## Objective

Enable public read access to presentations marked as `is_public = true` so slide grids can load without authentication.

## Problem

- RLS policies on `presentations` table block all unauthenticated reads
- Slide grid shows "Loading presentation..." indefinitely
- Data exists in database but can't be accessed by frontend

## Solution

Create RLS policy that allows reading presentations when `is_public = true`.

---

## Steps

### 1. Create Migration File

**File**: `supabase/migrations/20251017000000_allow_public_presentations.sql`

```sql
-- Allow reading public presentations without authentication
CREATE POLICY "Allow public read access to public presentations"
ON presentations
FOR SELECT
USING (is_public = true);

-- Ensure RLS is enabled
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;

-- Add helpful comment
COMMENT ON POLICY "Allow public read access to public presentations" ON presentations IS
'Allows anyone to read presentations marked as public, regardless of authentication status';
```

### 2. Apply Migration

```bash
# Option A: Via Supabase CLI
supabase db push --linked

# Option B: Via psql
psql "postgres://postgres:Toronto2025%23@db.dhesktsqhcxhqfjypulk.supabase.co:5432/postgres" \
  -f supabase/migrations/20251017000000_allow_public_presentations.sql
```

### 3. Update Test Presentation

```sql
UPDATE presentations
SET is_public = true
WHERE id = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';
```

### 4. Test Access

```bash
# Test without auth - should return data
curl "https://dhesktsqhcxhqfjypulk.supabase.co/rest/v1/presentations?id=eq.d4a27c1c-8b2d-48a9-99c9-2298037e9e81&select=id,title,slide_count" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY"

# Expected: Returns presentation data
```

### 5. Verify in Browser

Navigate to:
```
http://localhost:8081/presentations/d4a27c1c-8b2d-48a9-99c9-2298037e9e81/outline
```

**Expected**: Slide grid loads with all 10 AI-generated slides visible

---

## Success Criteria

- [x] Migration file created and applied
- [x] Test presentation marked as public
- [x] Anon API key can read public presentations
- [x] Slide grid renders without authentication
- [x] All 10 slides visible with correct thumbnails
- [x] No console errors or RLS blocks

---

## Verification Commands

```bash
# Check RLS policy exists
psql "$DATABASE_URL" -c "\d+ presentations"

# Check presentation is public
psql "$DATABASE_URL" -c "SELECT id, title, is_public FROM presentations WHERE id = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';"

# Test API access
curl -s "$VITE_SUPABASE_URL/rest/v1/presentations?id=eq.d4a27c1c-8b2d-48a9-99c9-2298037e9e81" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY" | jq '.[] | {id, title, slide_count}'
```

---

## Rollback Plan

If issues occur:

```sql
-- Remove the policy
DROP POLICY IF EXISTS "Allow public read access to public presentations" ON presentations;

-- Mark presentation private
UPDATE presentations SET is_public = false WHERE id = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';
```

---

## Related Files

- `src/hooks/usePresentationQuery.ts` - Data fetching logic
- `src/pages/presentations/OutlineEditor.tsx` - Grid view component
- `supabase/migrations/20251015000000_enable_rls_security.sql` - Original RLS setup

---

## Notes

- This fix enables **development and testing** without auth
- For production, users should sign in to see private presentations
- Public presentations are useful for sharing demos and examples
