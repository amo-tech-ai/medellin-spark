-- Fix invalid presentation category values
-- This must run BEFORE the constraint is applied

-- Update invalid categories to 'general'
UPDATE presentations
SET category = 'general'
WHERE category NOT IN ('general', 'pitch-deck', 'investor-deck', 'sales-deck')
   OR category IS NULL;

-- Verify all categories are now valid
DO $$
DECLARE
  invalid_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO invalid_count
  FROM presentations
  WHERE category NOT IN ('general', 'pitch-deck', 'investor-deck', 'sales-deck');
  
  IF invalid_count > 0 THEN
    RAISE EXCEPTION 'Still have % invalid categories after fix!', invalid_count;
  END IF;
  
  RAISE NOTICE '✅ All presentation categories are now valid';
END $$;

