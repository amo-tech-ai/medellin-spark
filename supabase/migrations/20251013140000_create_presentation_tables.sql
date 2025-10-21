-- =============================================
-- Presentation AI Tables Migration
-- =============================================
-- This migration creates the database schema for the Presentation AI feature
-- integrating the standalone Next.js app into the main Medellin AI platform.

-- =============================================
-- TABLES
-- =============================================

-- Custom Themes Table
-- Stores user-created presentation themes
CREATE TABLE IF NOT EXISTS custom_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  colors JSONB NOT NULL DEFAULT '{}'::jsonb,
  fonts JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Presentations Table
-- Main table for storing presentation data (combines BaseDocument + Presentation)
CREATE TABLE IF NOT EXISTS presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  theme TEXT DEFAULT 'mystique',
  image_source TEXT DEFAULT 'ai',
  prompt TEXT,
  presentation_style TEXT,
  language TEXT DEFAULT 'en-US',
  outline TEXT[],
  search_results JSONB,
  thumbnail_url TEXT,
  custom_theme_id UUID REFERENCES custom_themes(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'completed', 'error')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated Images Table
-- Stores AI-generated images for presentations
CREATE TABLE IF NOT EXISTS generated_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  presentation_id UUID NOT NULL REFERENCES presentations(id) ON DELETE CASCADE,
  slide_index INTEGER NOT NULL,
  prompt TEXT NOT NULL,
  url TEXT NOT NULL,
  provider TEXT DEFAULT 'together' CHECK (provider IN ('together', 'openai', 'unsplash')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorite Presentations Table
-- Tracks user favorites for presentations
CREATE TABLE IF NOT EXISTS favorite_presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  presentation_id UUID NOT NULL REFERENCES presentations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, presentation_id)
);

-- =============================================
-- INDEXES
-- =============================================

-- Custom Themes Indexes
CREATE INDEX idx_custom_themes_profile_id ON custom_themes(profile_id);
CREATE INDEX idx_custom_themes_created_at ON custom_themes(created_at DESC);

-- Presentations Indexes
CREATE INDEX idx_presentations_profile_id ON presentations(profile_id);
CREATE INDEX idx_presentations_status ON presentations(status);
CREATE INDEX idx_presentations_created_at ON presentations(created_at DESC);
CREATE INDEX idx_presentations_is_public ON presentations(is_public);
CREATE INDEX idx_presentations_custom_theme_id ON presentations(custom_theme_id);

-- GIN index for JSONB content search
CREATE INDEX idx_presentations_content_gin ON presentations USING gin(content);
CREATE INDEX idx_presentations_search_results_gin ON presentations USING gin(search_results);

-- Generated Images Indexes
CREATE INDEX idx_generated_images_presentation_id ON generated_images(presentation_id);
CREATE INDEX idx_generated_images_slide_index ON generated_images(presentation_id, slide_index);

-- Favorite Presentations Indexes
CREATE INDEX idx_favorite_presentations_profile_id ON favorite_presentations(profile_id);
CREATE INDEX idx_favorite_presentations_presentation_id ON favorite_presentations(presentation_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE custom_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_presentations ENABLE ROW LEVEL SECURITY;

-- Custom Themes Policies
CREATE POLICY "Users can view own themes"
  ON custom_themes FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can create own themes"
  ON custom_themes FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own themes"
  ON custom_themes FOR UPDATE
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete own themes"
  ON custom_themes FOR DELETE
  USING (auth.uid() = profile_id);

-- Presentations Policies
CREATE POLICY "Users can view own presentations or public ones"
  ON presentations FOR SELECT
  USING (auth.uid() = profile_id OR is_public = true);

CREATE POLICY "Users can create own presentations"
  ON presentations FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own presentations"
  ON presentations FOR UPDATE
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete own presentations"
  ON presentations FOR DELETE
  USING (auth.uid() = profile_id);

-- Generated Images Policies (inherit from presentations)
CREATE POLICY "Users can view images from accessible presentations"
  ON generated_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM presentations
      WHERE presentations.id = generated_images.presentation_id
      AND (presentations.profile_id = auth.uid() OR presentations.is_public = true)
    )
  );

CREATE POLICY "Users can create images for own presentations"
  ON generated_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM presentations
      WHERE presentations.id = generated_images.presentation_id
      AND presentations.profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete images from own presentations"
  ON generated_images FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM presentations
      WHERE presentations.id = generated_images.presentation_id
      AND presentations.profile_id = auth.uid()
    )
  );

-- Favorite Presentations Policies
CREATE POLICY "Users can view own favorites"
  ON favorite_presentations FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can create own favorites"
  ON favorite_presentations FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete own favorites"
  ON favorite_presentations FOR DELETE
  USING (auth.uid() = profile_id);

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Function to get presentations with favorite status
CREATE OR REPLACE FUNCTION get_presentations_with_favorites(user_id UUID)
RETURNS TABLE (
  id UUID,
  profile_id UUID,
  title TEXT,
  content JSONB,
  theme TEXT,
  thumbnail_url TEXT,
  status TEXT,
  is_public BOOLEAN,
  is_favorited BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.profile_id,
    p.title,
    p.content,
    p.theme,
    p.thumbnail_url,
    p.status,
    p.is_public,
    (fp.id IS NOT NULL) AS is_favorited,
    p.created_at,
    p.updated_at
  FROM presentations p
  LEFT JOIN favorite_presentations fp
    ON fp.presentation_id = p.id
    AND fp.profile_id = user_id
  WHERE p.profile_id = user_id OR p.is_public = true
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get presentation statistics for a user
CREATE OR REPLACE FUNCTION get_presentation_stats(user_id UUID)
RETURNS TABLE (
  total_presentations BIGINT,
  draft_presentations BIGINT,
  completed_presentations BIGINT,
  public_presentations BIGINT,
  total_favorites BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) FILTER (WHERE profile_id = user_id) AS total_presentations,
    COUNT(*) FILTER (WHERE profile_id = user_id AND status = 'draft') AS draft_presentations,
    COUNT(*) FILTER (WHERE profile_id = user_id AND status = 'completed') AS completed_presentations,
    COUNT(*) FILTER (WHERE profile_id = user_id AND is_public = true) AS public_presentations,
    (SELECT COUNT(*) FROM favorite_presentations WHERE profile_id = user_id) AS total_favorites
  FROM presentations;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_presentation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger to automatically update updated_at on presentations
CREATE TRIGGER update_presentations_updated_at
  BEFORE UPDATE ON presentations
  FOR EACH ROW
  EXECUTE FUNCTION update_presentation_updated_at();

-- Trigger to automatically update updated_at on custom_themes
CREATE TRIGGER update_custom_themes_updated_at
  BEFORE UPDATE ON custom_themes
  FOR EACH ROW
  EXECUTE FUNCTION update_presentation_updated_at();

-- =============================================
-- COMMENTS (Documentation)
-- =============================================

COMMENT ON TABLE custom_themes IS 'User-created presentation themes with custom colors and fonts';
COMMENT ON TABLE presentations IS 'Main presentations table combining document metadata and presentation-specific fields';
COMMENT ON TABLE generated_images IS 'AI-generated images associated with presentation slides';
COMMENT ON TABLE favorite_presentations IS 'User favorites for quick access to presentations';

COMMENT ON COLUMN presentations.content IS 'JSONB field storing the complete slide data structure';
COMMENT ON COLUMN presentations.outline IS 'Array of text strings representing the presentation outline';
COMMENT ON COLUMN presentations.search_results IS 'JSONB field storing web search results used for content generation';
COMMENT ON COLUMN presentations.status IS 'Presentation generation status: draft, generating, completed, error';

-- =============================================
-- GRANTS (Optional - adjust based on your setup)
-- =============================================

-- Grant usage to authenticated users (if needed)
-- GRANT USAGE ON SCHEMA public TO authenticated;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- =============================================
-- MIGRATION COMPLETE
-- =============================================
-- This migration adds complete support for the Presentation AI feature
-- including tables, indexes, RLS policies, helper functions, and triggers.
