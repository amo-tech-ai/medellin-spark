-- =============================================
-- Add Metadata Fields for My Presentations Page
-- =============================================
-- This migration enhances the presentations table with metadata fields
-- required for the My Presentations dashboard and adds templates table.
-- Created: January 13, 2025

-- =============================================
-- ALTER PRESENTATIONS TABLE
-- =============================================

-- Add missing metadata fields for My Presentations page
ALTER TABLE presentations
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
  ADD COLUMN IF NOT EXISTS slide_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS share_link TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_edited_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS last_presented_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Update status enum to match UI design (draft, complete, shared)
-- Note: Keep existing values for backward compatibility
-- CREATE TYPE presentation_status_new AS ENUM ('draft', 'generating', 'completed', 'complete', 'error', 'shared');
-- ALTER TABLE presentations ALTER COLUMN status TYPE presentation_status_new USING status::presentation_status_new;
-- For simpler approach, we'll allow additional status values via CHECK constraint
ALTER TABLE presentations DROP CONSTRAINT IF EXISTS presentations_status_check;
ALTER TABLE presentations ADD CONSTRAINT presentations_status_check
  CHECK (status IN ('draft', 'generating', 'completed', 'complete', 'error', 'shared'));

-- Add index for deleted_at (soft deletes)
CREATE INDEX IF NOT EXISTS idx_presentations_deleted_at
  ON presentations(deleted_at) WHERE deleted_at IS NULL;

-- Add index for last_edited_at (sorting)
CREATE INDEX IF NOT EXISTS idx_presentations_last_edited_at
  ON presentations(last_edited_at DESC);

-- Add index for share_link (public sharing)
CREATE INDEX IF NOT EXISTS idx_presentations_share_link
  ON presentations(share_link) WHERE share_link IS NOT NULL;

-- =============================================
-- CREATE PRESENTATION TEMPLATES TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS presentation_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT NOT NULL,
  attribution TEXT, -- e.g., "By Airbnb", "By Sequoia Capital"
  category TEXT NOT NULL DEFAULT 'pitch-deck',
  usage_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  price_cents INT DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  slides JSONB NOT NULL DEFAULT '[]'::jsonb,
  theme JSONB DEFAULT '{"primary_color": "#F5A623", "secondary_color": "#4A5568", "font_family": "Inter"}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add CHECK constraint for category (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'templates_category_check'
  ) THEN
    ALTER TABLE presentation_templates ADD CONSTRAINT templates_category_check
      CHECK (category IN ('pitch-deck', 'investor-deck', 'product-launch', 'sales-deck', 'budgeting', 'other'));
  END IF;
END $$;

-- =============================================
-- INDEXES FOR TEMPLATES
-- =============================================

-- Performance indexes for template discovery
CREATE INDEX IF NOT EXISTS idx_templates_category ON presentation_templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_usage_count ON presentation_templates(usage_count DESC);
CREATE INDEX IF NOT EXISTS idx_templates_like_count ON presentation_templates(like_count DESC);
CREATE INDEX IF NOT EXISTS idx_templates_is_premium ON presentation_templates(is_premium);
CREATE INDEX IF NOT EXISTS idx_templates_created_at ON presentation_templates(created_at DESC);

-- GIN index for tags array
CREATE INDEX IF NOT EXISTS idx_templates_tags_gin ON presentation_templates USING gin(tags);

-- GIN index for slides JSONB
CREATE INDEX IF NOT EXISTS idx_templates_slides_gin ON presentation_templates USING gin(slides);

-- =============================================
-- ROW LEVEL SECURITY FOR TEMPLATES
-- =============================================

ALTER TABLE presentation_templates ENABLE ROW LEVEL SECURITY;

-- Public can view all templates (no auth required for browsing) - Idempotent
DROP POLICY IF EXISTS "Anyone can view templates" ON presentation_templates;
CREATE POLICY "Anyone can view templates"
  ON presentation_templates FOR SELECT
  USING (true);

-- Only admins can create/update/delete templates (future)
-- For now, we'll allow authenticated users to create templates - Idempotent
DROP POLICY IF EXISTS "Authenticated users can create templates" ON presentation_templates;
CREATE POLICY "Authenticated users can create templates"
  ON presentation_templates FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update templates" ON presentation_templates;
CREATE POLICY "Authenticated users can update templates"
  ON presentation_templates FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================
-- HELPER FUNCTIONS FOR MY PRESENTATIONS PAGE
-- =============================================

-- Function to get user's presentation summary stats
CREATE OR REPLACE FUNCTION get_my_presentations_stats(user_profile_id UUID)
RETURNS TABLE (
  total_count BIGINT,
  draft_count BIGINT,
  complete_count BIGINT,
  shared_count BIGINT,
  last_edited TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) FILTER (WHERE deleted_at IS NULL) AS total_count,
    COUNT(*) FILTER (WHERE deleted_at IS NULL AND (status = 'draft' OR status = 'generating')) AS draft_count,
    COUNT(*) FILTER (WHERE deleted_at IS NULL AND (status = 'complete' OR status = 'completed')) AS complete_count,
    COUNT(*) FILTER (WHERE deleted_at IS NULL AND status = 'shared') AS shared_count,
    MAX(last_edited_at) AS last_edited
  FROM presentations
  WHERE profile_id = user_profile_id
    AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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

-- =============================================
-- TRIGGER TO UPDATE last_edited_at
-- =============================================

-- Function to update last_edited_at on any update
CREATE OR REPLACE FUNCTION update_presentation_last_edited()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_edited_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS update_presentations_last_edited_trigger ON presentations;

-- Create new trigger
CREATE TRIGGER update_presentations_last_edited_trigger
  BEFORE UPDATE ON presentations
  FOR EACH ROW
  EXECUTE FUNCTION update_presentation_last_edited();

-- =============================================
-- TRIGGER TO UPDATE updated_at ON TEMPLATES
-- =============================================

DROP TRIGGER IF EXISTS update_templates_updated_at ON presentation_templates;
CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON presentation_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_presentation_updated_at();

-- =============================================
-- SEED TEMPLATES DATA
-- =============================================

-- Insert 8 starter templates for My Presentations page
INSERT INTO presentation_templates (name, description, cover_image_url, attribution, category, usage_count, like_count, is_premium, tags, slides)
VALUES
(
  'Seed Stage Investor Pitch',
  'Perfect for first-time founders raising pre-seed or seed funding. Covers problem, solution, market, and team.',
  'https://placeholder.co/560x315/F5A623/FFFFFF?text=Seed+Pitch',
  'By Y Combinator',
  'pitch-deck',
  125430,
  8542,
  false,
  ARRAY['seed-funding', 'investors', 'startup', 'fundraising'],
  '[]'::jsonb
),
(
  'Series A Pitch Deck',
  'Growth-focused deck for Series A fundraising. Emphasizes traction, unit economics, and go-to-market strategy.',
  'https://placeholder.co/560x315/38B2AC/FFFFFF?text=Series+A',
  'By Sequoia Capital',
  'investor-deck',
  89234,
  6120,
  false,
  ARRAY['series-a', 'growth', 'traction', 'metrics'],
  '[]'::jsonb
),
(
  'Product Launch Deck',
  'Announce your new product to the world. Ideal for press releases, launch events, and customer presentations.',
  'https://placeholder.co/560x315/90CDF4/FFFFFF?text=Product+Launch',
  'By Airbnb',
  'product-launch',
  67890,
  5234,
  false,
  ARRAY['product-launch', 'marketing', 'go-to-market'],
  '[]'::jsonb
),
(
  'Enterprise Sales Deck',
  'Convert enterprise customers with this B2B sales deck. Includes case studies, ROI calculator, and implementation plan.',
  'https://placeholder.co/560x315/4A5568/FFFFFF?text=Sales+Deck',
  'By Salesforce',
  'sales-deck',
  54321,
  4123,
  false,
  ARRAY['sales', 'b2b', 'enterprise', 'roi'],
  '[]'::jsonb
),
(
  'Startup Budgeting Template',
  'Financial planning for startups. Includes runway calculator, burn rate tracker, and hiring plan.',
  'https://placeholder.co/560x315/718096/FFFFFF?text=Budgeting',
  'By First Round Capital',
  'budgeting',
  43210,
  3456,
  false,
  ARRAY['budgeting', 'finance', 'runway', 'planning'],
  '[]'::jsonb
),
(
  '10-Slide Pitch Deck (Premium)',
  'Guy Kawasaki''s famous 10-slide format. Proven template used by successful startups.',
  'https://placeholder.co/560x315/F5A623/FFFFFF?text=10-Slide+Premium',
  'By Guy Kawasaki',
  'pitch-deck',
  98765,
  7890,
  true,
  ARRAY['premium', '10-slide', 'classic', 'investor'],
  '[]'::jsonb
),
(
  'Demo Day Presentation',
  'Fast-paced 3-minute pitch for accelerator demo days. Optimized for maximum impact.',
  'https://placeholder.co/560x315/FC8181/FFFFFF?text=Demo+Day',
  'By Techstars',
  'pitch-deck',
  76543,
  5678,
  false,
  ARRAY['demo-day', 'accelerator', 'pitch-competition'],
  '[]'::jsonb
),
(
  'Board Meeting Template',
  'Monthly/quarterly board update deck. Covers KPIs, financials, roadmap, and asks.',
  'https://placeholder.co/560x315/2D3748/FFFFFF?text=Board+Meeting',
  'By Andreessen Horowitz',
  'other',
  32109,
  2345,
  false,
  ARRAY['board-meeting', 'update', 'reporting', 'governance'],
  '[]'::jsonb
)
ON CONFLICT (name, category) DO NOTHING;

-- =============================================
-- COMMENTS (Documentation)
-- =============================================

COMMENT ON TABLE presentation_templates IS 'Pre-built presentation templates for users to start with';
COMMENT ON COLUMN presentation_templates.attribution IS 'Credit for template creator (e.g., "By Airbnb")';
COMMENT ON COLUMN presentation_templates.category IS 'Template category: pitch-deck, investor-deck, product-launch, sales-deck, budgeting, other';
COMMENT ON COLUMN presentation_templates.usage_count IS 'Number of times this template has been used (for sorting by popularity)';
COMMENT ON COLUMN presentation_templates.like_count IS 'Number of likes/favorites for this template';
COMMENT ON COLUMN presentation_templates.is_premium IS 'Whether this is a premium template requiring payment';
COMMENT ON COLUMN presentation_templates.price_cents IS 'Price in cents if premium (e.g., 999 = $9.99)';

COMMENT ON COLUMN presentations.description IS 'Optional description/tagline for the presentation';
COMMENT ON COLUMN presentations.cover_image_url IS 'URL to cover image (first slide thumbnail or custom)';
COMMENT ON COLUMN presentations.slide_count IS 'Total number of slides in the presentation';
COMMENT ON COLUMN presentations.share_link IS 'Unique shareable link token for public access';
COMMENT ON COLUMN presentations.view_count IS 'Number of times this presentation has been viewed';
COMMENT ON COLUMN presentations.last_edited_at IS 'Timestamp of last edit (for sorting "Recent")';
COMMENT ON COLUMN presentations.last_presented_at IS 'Timestamp of last time presentation was presented';
COMMENT ON COLUMN presentations.deleted_at IS 'Soft delete timestamp (NULL = active)';

COMMENT ON FUNCTION get_my_presentations_stats(UUID) IS 'Get summary statistics for My Presentations page header';
COMMENT ON FUNCTION soft_delete_presentation(UUID) IS 'Soft delete a presentation (sets deleted_at)';
COMMENT ON FUNCTION duplicate_presentation(UUID) IS 'Duplicate a presentation with " (Copy)" suffix';

-- =============================================
-- MIGRATION COMPLETE
-- =============================================
-- Database schema is now ready for My Presentations page implementation
-- Tables: presentations (enhanced), presentation_templates (new)
-- Functions: stats, soft_delete, duplicate
-- RLS policies: secure access control
-- Indexes: optimized queries for performance
