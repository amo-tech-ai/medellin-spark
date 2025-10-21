-- ================================================================
-- Migration: Create pitch_conversations table
-- Purpose: Store Claude AI conversation state for pitch deck generation
-- Date: October 16, 2025
-- ================================================================
--
-- This table enables:
-- - Persistent conversation history across user sessions
-- - Data extraction tracking (company_name, problem, solution, etc.)
-- - Conversation state management (active, ready_to_generate, completed)
-- - Integration with existing pitch_decks table
--
-- Security: RLS enabled with user-scoped policies
-- ================================================================

-- Create pitch_conversations table
CREATE TABLE IF NOT EXISTS pitch_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Conversation data
  messages JSONB DEFAULT '[]'::JSONB NOT NULL,
  collected_data JSONB DEFAULT '{}'::JSONB NOT NULL,

  -- State management
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ready_to_generate', 'generating', 'completed', 'cancelled')),

  -- Link to generated deck
  deck_id UUID REFERENCES pitch_decks(id) ON DELETE SET NULL,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_pitch_conversations_profile_id
  ON pitch_conversations(profile_id);

CREATE INDEX IF NOT EXISTS idx_pitch_conversations_status
  ON pitch_conversations(status);

CREATE INDEX IF NOT EXISTS idx_pitch_conversations_created_at
  ON pitch_conversations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE pitch_conversations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own conversations" ON pitch_conversations;
DROP POLICY IF EXISTS "Users can create own conversations" ON pitch_conversations;
DROP POLICY IF EXISTS "Users can update own conversations" ON pitch_conversations;
DROP POLICY IF EXISTS "Users can delete own conversations" ON pitch_conversations;

-- RLS Policies: Users can only access their own conversations
CREATE POLICY "Users can view own conversations"
  ON pitch_conversations
  FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can create own conversations"
  ON pitch_conversations
  FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own conversations"
  ON pitch_conversations
  FOR UPDATE
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete own conversations"
  ON pitch_conversations
  FOR DELETE
  USING (auth.uid() = profile_id);

-- Create trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_pitch_conversations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

DROP TRIGGER IF EXISTS trigger_update_pitch_conversations_updated_at ON pitch_conversations;

CREATE TRIGGER trigger_update_pitch_conversations_updated_at
  BEFORE UPDATE ON pitch_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_pitch_conversations_updated_at();

-- Add helpful comment
COMMENT ON TABLE pitch_conversations IS 'Stores Claude AI conversation state for pitch deck generation with full message history and extracted data';
COMMENT ON COLUMN pitch_conversations.messages IS 'Full conversation history in Claude message format (role + content)';
COMMENT ON COLUMN pitch_conversations.collected_data IS 'Extracted startup data (company_name, industry, problem, solution, market, model, etc.)';
COMMENT ON COLUMN pitch_conversations.status IS 'Conversation state: active, ready_to_generate, generating, completed, cancelled';

-- Verification query (commented out)
-- SELECT
--   id,
--   profile_id,
--   jsonb_array_length(messages) as message_count,
--   collected_data,
--   status,
--   created_at
-- FROM pitch_conversations
-- ORDER BY created_at DESC
-- LIMIT 10;
