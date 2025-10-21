-- Dashboard Tables Migration
-- Creates tables for job applications, saved jobs, and event registrations
-- Date: 2025-10-19

-- ============================================
-- JOB APPLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'reviewing', 'interview', 'rejected', 'accepted')),
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT,

  UNIQUE(profile_id, job_id)
);

-- Index for faster queries by profile
CREATE INDEX IF NOT EXISTS idx_job_applications_profile_id
  ON job_applications(profile_id);

-- Index for faster queries by status
CREATE INDEX IF NOT EXISTS idx_job_applications_status
  ON job_applications(profile_id, status);

-- ============================================
-- SAVED JOBS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT,

  UNIQUE(profile_id, job_id)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_saved_jobs_profile_id
  ON saved_jobs(profile_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- Note: event_registrations table already exists as 'registrations'
-- This migration only creates job_applications and saved_jobs tables

-- Enable RLS on all tables
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- Job Applications Policies
CREATE POLICY "Users can view their own job applications"
  ON job_applications FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can create their own job applications"
  ON job_applications FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own job applications"
  ON job_applications FOR UPDATE
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own job applications"
  ON job_applications FOR DELETE
  USING (auth.uid() = profile_id);

-- Saved Jobs Policies
CREATE POLICY "Users can view their own saved jobs"
  ON saved_jobs FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can save jobs"
  ON saved_jobs FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete their saved jobs"
  ON saved_jobs FOR DELETE
  USING (auth.uid() = profile_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get application count by status
CREATE OR REPLACE FUNCTION get_application_count_by_status(user_id UUID)
RETURNS TABLE(status TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    job_applications.status,
    COUNT(*)::BIGINT
  FROM job_applications
  WHERE profile_id = user_id
  GROUP BY job_applications.status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get total saved jobs count
CREATE OR REPLACE FUNCTION get_saved_jobs_count(user_id UUID)
RETURNS BIGINT AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM saved_jobs
    WHERE profile_id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

-- Auto-update updated_at timestamp on job_applications
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
