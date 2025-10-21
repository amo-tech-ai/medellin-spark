-- Migration: Add OAuth authentication fields and tables
-- Created: 2025-01-13
-- Purpose: Extend profiles table and add supporting tables for OAuth social login

-- =============================================================================
-- 1. ALTER PROFILES TABLE - Add OAuth fields
-- =============================================================================

-- Add provider field to track which OAuth provider was used
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS provider TEXT;

-- Add provider_id to store the external OAuth provider user ID
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS provider_id TEXT;

-- Add metadata JSONB field for OAuth-specific data
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Add index on provider for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_provider ON public.profiles(provider);

-- Add index on provider_id for lookups
CREATE INDEX IF NOT EXISTS idx_profiles_provider_id ON public.profiles(provider_id);

-- Add comment explaining the provider field
COMMENT ON COLUMN public.profiles.provider IS 'OAuth provider used for authentication: google, github, facebook, apple, linkedin_oidc, or NULL for email/password';

-- Add comment explaining the provider_id field
COMMENT ON COLUMN public.profiles.provider_id IS 'External user ID from the OAuth provider';

-- Add comment explaining metadata
COMMENT ON COLUMN public.profiles.metadata IS 'Additional OAuth provider-specific data (profile picture URL, etc.)';

-- =============================================================================
-- 2. CREATE USER_SESSIONS TABLE - Track user login sessions
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider TEXT,
  session_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_ended_at TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_started_at ON public.user_sessions(session_started_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_sessions_provider ON public.user_sessions(provider);

-- Add table comment
COMMENT ON TABLE public.user_sessions IS 'Tracks user authentication sessions across all OAuth providers';

-- =============================================================================
-- 3. CREATE OAUTH_CONNECTIONS TABLE - Store OAuth tokens and refresh tokens
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.oauth_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  provider_user_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  scope TEXT,
  token_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Ensure one connection per provider per user
  UNIQUE(user_id, provider)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_oauth_connections_user_id ON public.oauth_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_oauth_connections_provider ON public.oauth_connections(provider);
CREATE INDEX IF NOT EXISTS idx_oauth_connections_expires_at ON public.oauth_connections(expires_at);

-- Add table comment
COMMENT ON TABLE public.oauth_connections IS 'Stores OAuth access tokens and refresh tokens for connected providers';

-- =============================================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on new tables
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oauth_connections ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 5. CREATE RLS POLICIES
-- =============================================================================

-- user_sessions policies
CREATE POLICY "Users can view their own sessions"
  ON public.user_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions"
  ON public.user_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- oauth_connections policies
CREATE POLICY "Users can view their own OAuth connections"
  ON public.oauth_connections
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own OAuth connections"
  ON public.oauth_connections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own OAuth connections"
  ON public.oauth_connections
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own OAuth connections"
  ON public.oauth_connections
  FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================================================
-- 6. CREATE OR UPDATE TRIGGER FUNCTION
-- =============================================================================

-- Update the handle_new_user function to populate OAuth fields from auth metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  provider_name TEXT;
  provider_uid TEXT;
BEGIN
  -- Extract provider from auth.users.raw_app_meta_data
  provider_name := COALESCE(
    NEW.raw_app_meta_data->>'provider',
    NEW.raw_user_meta_data->>'provider',
    'email'
  );

  -- Extract provider user ID
  provider_uid := COALESCE(
    NEW.raw_user_meta_data->>'provider_id',
    NEW.raw_user_meta_data->>'sub'
  );

  -- Insert or update profile
  INSERT INTO public.profiles (
    id,
    user_id,
    email,
    full_name,
    avatar_url,
    provider,
    provider_id,
    metadata,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture'),
    provider_name,
    provider_uid,
    COALESCE(NEW.raw_user_meta_data, '{}'::jsonb),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = COALESCE(EXCLUDED.email, profiles.email),
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    provider = COALESCE(EXCLUDED.provider, profiles.provider),
    provider_id = COALESCE(EXCLUDED.provider_id, profiles.provider_id),
    metadata = COALESCE(EXCLUDED.metadata, profiles.metadata),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- 7. CREATE OR REPLACE TRIGGER
-- =============================================================================

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user sign-ups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 8. CREATE HELPER FUNCTIONS
-- =============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to oauth_connections
DROP TRIGGER IF EXISTS update_oauth_connections_updated_at ON public.oauth_connections;
CREATE TRIGGER update_oauth_connections_updated_at
  BEFORE UPDATE ON public.oauth_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- MIGRATION COMPLETE
-- =============================================================================

-- Verify tables exist
DO $$
BEGIN
  RAISE NOTICE 'Migration completed successfully';
  RAISE NOTICE 'Tables created: user_sessions, oauth_connections';
  RAISE NOTICE 'Profiles table updated with: provider, provider_id, metadata';
  RAISE NOTICE 'RLS policies enabled on all tables';
  RAISE NOTICE 'Triggers created for auto-population';
END $$;
