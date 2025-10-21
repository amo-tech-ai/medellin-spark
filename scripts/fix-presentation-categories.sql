-- Fix presentation category values before applying constraint
-- This ensures all rows comply with the new CHECK constraint

-- Step 1: See what category values currently exist
-- (Run this first to understand the data)
SELECT DISTINCT category, COUNT(*) as count
FROM presentations
GROUP BY category
ORDER BY count DESC;

-- Step 2: Update invalid categories to valid ones
-- Map common variations to valid categories

-- Update NULL categories to 'general'
UPDATE presentations
SET category = 'general'
WHERE category IS NULL;

-- Update common variations (add more mappings as needed)
UPDATE presentations
SET category = CASE
  -- Pitch deck variations
  WHEN category ILIKE '%pitch%' THEN 'pitch-deck'
  WHEN category ILIKE '%investor%' THEN 'investor-deck'
  WHEN category ILIKE '%sales%' THEN 'sales-deck'
  
  -- Default to general for anything else
  ELSE 'general'
END
WHERE category NOT IN ('general', 'pitch-deck', 'investor-deck', 'sales-deck');

-- Step 3: Verify all categories are now valid
SELECT 
  category,
  COUNT(*) as count,
  CASE 
    WHEN category IN ('general', 'pitch-deck', 'investor-deck', 'sales-deck') 
    THEN '✅ VALID'
    ELSE '❌ INVALID'
  END as status
FROM presentations
GROUP BY category
ORDER BY count DESC;

-- Expected result: All rows should show "✅ VALID"

