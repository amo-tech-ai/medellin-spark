-- Apply RPC Functions to Supabase Database
-- Copy this entire file and paste into Supabase Dashboard > SQL Editor > New Query > Run

-- Function to soft delete a presentation
CREATE OR REPLACE FUNCTION soft_delete_presentation(presentation_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  result BOOLEAN;
BEGIN
  UPDATE presentations
  SET deleted_at = NOW(),
      updated_at = NOW()
  WHERE id = presentation_id
    AND profile_id = auth.uid()
    AND deleted_at IS NULL;

  GET DIAGNOSTICS result = ROW_COUNT;
  RETURN result > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to duplicate a presentation
CREATE OR REPLACE FUNCTION duplicate_presentation(source_id UUID)
RETURNS UUID AS $$
DECLARE
  new_id UUID;
  source_presentation presentations%ROWTYPE;
BEGIN
  -- Get source presentation
  SELECT * INTO source_presentation
  FROM presentations
  WHERE id = source_id
    AND profile_id = auth.uid()
    AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Presentation not found or access denied';
  END IF;

  -- Create duplicate
  INSERT INTO presentations (
    profile_id,
    title,
    description,
    content,
    theme,
    image_source,
    presentation_style,
    language,
    outline,
    custom_theme_id,
    status,
    slide_count
  ) VALUES (
    auth.uid(),
    source_presentation.title || ' (Copy)',
    source_presentation.description,
    source_presentation.content,
    source_presentation.theme,
    source_presentation.image_source,
    source_presentation.presentation_style,
    source_presentation.language,
    source_presentation.outline,
    source_presentation.custom_theme_id,
    'draft',
    source_presentation.slide_count
  )
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verify functions were created
SELECT proname, pg_get_functiondef(oid)
FROM pg_proc
WHERE proname IN ('soft_delete_presentation', 'duplicate_presentation');
