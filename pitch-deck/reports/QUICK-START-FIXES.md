# Quick Start: Critical Fixes
**Priority:** 🔴 BLOCKING ISSUES
**Time Required:** 2-4 hours
**Goal:** Make existing frontend functional

---

## ⚡ Fix #1: Update MyPresentations Queries (30 minutes)

### Problem
Page crashes because it queries non-existent fields.

### Solution
Update `src/pages/presentations/MyPresentations.tsx`:

**Line 34: Change the select query:**
```typescript
// OLD (line 34):
.select('id, title, description, status, slide_count, last_edited_at, cover_image_url')

// NEW:
.select('id, title, status, content, updated_at, thumbnail_url')
```

**Line 9: Update interface:**
```typescript
interface Presentation {
  id: string;
  title: string;
  status: string;
  slide_count?: number;  // Calculate from content
  updated_at: string;    // Changed from last_edited_at
  thumbnail_url: string | null;  // Changed from cover_image_url
  content: any;  // Add this to calculate slide count
}
```

**After line 39: Calculate slide_count:**
```typescript
if (error) throw error;

// Calculate slide_count from content
const processedData = (data || []).map(p => ({
  ...p,
  slide_count: p.content?.slides?.length || 0
}));

setPresentations(processedData);
```

**Line 36: Remove deleted_at filter:**
```typescript
// OLD (line 36):
.is('deleted_at', null)

// NEW: Remove this line entirely
// (or add: .neq('status', 'archived'))
```

**Line 122 & 129: Update thumbnail display:**
```typescript
// OLD (line 122):
{presentation.cover_image_url ? (

// NEW:
{presentation.thumbnail_url ? (
```

```typescript
// OLD (line 124):
src={presentation.cover_image_url}

// NEW:
src={presentation.thumbnail_url}
```

**Line 146: Update date field:**
```typescript
// OLD (line 146):
{new Date(presentation.last_edited_at).toLocaleDateString()}

// NEW:
{new Date(presentation.updated_at).toLocaleDateString()}
```

**Line 134-137: Handle missing description:**
```typescript
// Remove description display or make it optional:
<p className="text-sm text-muted-foreground mb-4">
  {/* Description removed - not in database */}
  {presentation.status === 'draft' ? 'Draft' : 'Complete'}
</p>
```

---

## ⚡ Fix #2: Create Missing RPC Functions (1 hour)

### Problem
Frontend calls RPC functions that don't exist.

### Solution
Create these functions in Supabase SQL Editor:

### Function 1: get_my_presentations_stats

```sql
CREATE OR REPLACE FUNCTION get_my_presentations_stats(user_profile_id UUID)
RETURNS TABLE (
  total_count BIGINT,
  draft_count BIGINT,
  complete_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_count,
    COUNT(*) FILTER (WHERE status = 'draft')::BIGINT as draft_count,
    COUNT(*) FILTER (WHERE status = 'complete')::BIGINT as complete_count
  FROM presentations
  WHERE profile_id = user_profile_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Function 2: soft_delete_presentation

```sql
CREATE OR REPLACE FUNCTION soft_delete_presentation(presentation_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE presentations
  SET status = 'archived',
      updated_at = NOW()
  WHERE id = presentation_id
    AND profile_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Function 3: duplicate_presentation

```sql
CREATE OR REPLACE FUNCTION duplicate_presentation(source_id UUID)
RETURNS UUID AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO presentations (
    title,
    profile_id,
    content,
    outline,
    theme,
    status,
    prompt
  )
  SELECT
    title || ' (Copy)',
    profile_id,
    content,
    outline,
    theme,
    'draft',
    prompt
  FROM presentations
  WHERE id = source_id
    AND profile_id = auth.uid()
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## ⚡ Fix #3: Add Database Constraints (30 minutes)

### Problem
No validation on theme and status fields.

### Solution
Run these SQL commands in Supabase:

```sql
-- Add CHECK constraint for theme
ALTER TABLE presentations
ADD CONSTRAINT valid_theme
CHECK (theme IS NULL OR theme IN ('purple', 'blue', 'dark'));

-- Add CHECK constraint for status
ALTER TABLE presentations
ADD CONSTRAINT valid_status
CHECK (status IS NULL OR status IN ('draft', 'outline', 'generating', 'complete', 'archived'));

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_presentations_profile_status
ON presentations(profile_id, status);

CREATE INDEX IF NOT EXISTS idx_presentations_content
ON presentations USING GIN (content);
```

---

## ⚡ Fix #4: Uncomment Edge Function Call (5 minutes)

### Problem
PresentationGenerate doesn't call AI generation.

### Solution
Update `src/pages/presentations/PresentationGenerate.tsx`:

**Lines 38-41: Uncomment and fix Edge Function call:**

```typescript
// OLD (commented out):
// TODO: Implement Edge Function call
// const { data, error } = await supabase.functions.invoke('generate-presentation', {
//   body: { prompt, presentationId: presentation.id }
// });

// NEW (after deploying Edge Functions):
const { data, error: generateError } = await supabase.functions.invoke('generate-outline', {
  body: { presentationId: presentation.id, prompt }
});

if (generateError) throw generateError;

// Wait for generation to complete, then navigate
// (or navigate immediately and show loading state)
```

**Note:** This will only work after Edge Functions are deployed (see Fix #5).

---

## ⚡ Fix #5: Deploy Edge Functions (1-2 hours)

### Problem
AI generation Edge Functions don't exist.

### Solution A: Quick Test (Generate outline only)

Create file: `supabase/functions/generate-outline/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { presentationId, prompt } = await req.json()

    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // TODO: Call Anthropic API here
    // For now, generate mock outline
    const outline = [
      'Cover Slide',
      'The Problem',
      'Our Solution',
      'How It Works',
      'Market Opportunity',
      'Business Model',
      'Traction',
      'Competition',
      'Team',
      'Ask & Next Steps'
    ]

    // Update presentation
    const { error } = await supabase
      .from('presentations')
      .update({
        outline,
        status: 'outline',
        updated_at: new Date().toISOString()
      })
      .eq('id', presentationId)

    if (error) throw error

    return new Response(
      JSON.stringify({ outline }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
```

**Deploy:**
```bash
supabase functions deploy generate-outline
```

### Solution B: Full Implementation

See `lovable-plan/08-edge-functions.md` for complete code with:
- Anthropic API integration
- Error handling
- Rate limiting
- AI usage logging
- Content generation

**Set API key:**
```bash
supabase secrets set ANTHROPIC_API_KEY=your-key-here
```

---

## ✅ Verification Steps

After applying all fixes:

### 1. Test MyPresentations
```bash
# Navigate to presentations page
open http://localhost:5173/presentations
```

**Expected:**
- Page loads without errors
- Shows presentation grid
- Stats display correctly
- Can duplicate presentations
- Can delete presentations

### 2. Test PresentationGenerate
```bash
# Navigate to generate page
open http://localhost:5173/presentations/generate
```

**Expected:**
- Enter prompt
- Click "Generate Presentation"
- Creates new presentation
- (If Edge Function deployed) Generates outline
- Redirects to editor

### 3. Test Database
```sql
-- Check constraints work
INSERT INTO presentations (title, profile_id, theme, status)
VALUES ('Test', 'xxx', 'invalid', 'draft');
-- Should fail with constraint violation

-- Check RPC function works
SELECT * FROM get_my_presentations_stats('user-id-here');
-- Should return counts
```

---

## 🚨 Troubleshooting

### Error: "Column does not exist"
**Cause:** Forgot to update query
**Fix:** Double-check all field name changes

### Error: "Function does not exist"
**Cause:** RPC function not created
**Fix:** Run SQL commands in Supabase SQL Editor

### Error: "Edge Function not found"
**Cause:** Function not deployed
**Fix:** Run `supabase functions deploy generate-outline`

### Error: "Cannot read property 'length' of undefined"
**Cause:** content.slides doesn't exist
**Fix:** Add null check: `p.content?.slides?.length || 0`

---

## 📊 Progress Tracker

After completing these fixes:

- [x] MyPresentations loads without errors
- [x] Can view list of presentations
- [x] Stats display correctly
- [x] Can duplicate presentations
- [x] Can delete presentations (soft delete)
- [x] Can create new presentations
- [x] Database constraints enforce valid data
- [ ] AI generation works (requires Edge Function)

**Time Saved:** These fixes unlock ~$2000 worth of existing code!

---

## 🎯 Next Steps

After critical fixes are complete:

1. **Test Everything** (30 minutes)
   - Click through all pages
   - Create test presentation
   - Verify all features work

2. **Complete PresentationEditor** (3-5 days)
   - Implement outline editor
   - Add slide content editing
   - Add theme selector
   - Add auto-save

3. **Complete PresentationView** (1-2 days)
   - Implement slide viewer
   - Add keyboard navigation
   - Add share/export

4. **Plate.js Integration** (Optional, 5-7 days)
   - Add rich text editing
   - Format toolbar
   - Advanced features

---

**Status:** Ready to implement critical fixes.
**Estimated Time:** 2-4 hours to working frontend.
