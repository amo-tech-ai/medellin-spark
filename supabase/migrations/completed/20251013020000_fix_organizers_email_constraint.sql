-- Migration: 20251013020000_fix_organizers_email_constraint.sql
-- Purpose: Fix corrupted email validation regex in organizers table
-- Issue: Constraint contains corrupted text from copy-paste error
-- Compatibility: PostgreSQL 15+ (Supabase)
-- Author: Database Architect Agent
-- Date: 2025-10-13

SET client_min_messages TO warning;

-- ==============================================================================
-- FIX CORRUPTED EMAIL CONSTRAINT
-- ==============================================================================

-- Drop the corrupted constraint
ALTER TABLE organizers DROP CONSTRAINT IF EXISTS organizers_contact_email_check;

-- Add proper email validation constraint
-- Validates email format: user@domain.tld
ALTER TABLE organizers ADD CONSTRAINT organizers_contact_email_check
  CHECK (
    contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'::text
  );

COMMENT ON CONSTRAINT organizers_contact_email_check ON organizers IS
  'Validates contact_email format: user@domain.tld';

SET client_min_messages TO notice;

-- ==============================================================================
-- MIGRATION SUMMARY
-- ==============================================================================
-- ✅ Dropped corrupted email constraint
-- ✅ Added proper email validation regex
-- Pattern: ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$
-- Examples:
--   ✅ Valid: eventos@rutanmedellin.org
--   ✅ Valid: contact@startup.co
--   ❌ Invalid: notanemail
--   ❌ Invalid: @nodomain.com
-- ==============================================================================
