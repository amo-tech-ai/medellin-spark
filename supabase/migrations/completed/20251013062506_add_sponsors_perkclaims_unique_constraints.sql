-- Migration: Add unique constraints for idempotent seeds (sponsors, perk_claims)
-- Location: supabase/migrations/20251013062506_add_sponsors_perkclaims_unique_constraints.sql

-- Add unique constraint on sponsors(event_id, company_name) to prevent duplicates
ALTER TABLE sponsors 
ADD CONSTRAINT sponsors_event_id_company_name_unique 
UNIQUE (event_id, company_name);

COMMENT ON CONSTRAINT sponsors_event_id_company_name_unique ON sponsors IS 
  'Ensures company names are unique per event sponsor list, enabling idempotent seed operations';

-- Add unique constraint on perk_claims(startup_profile_id, perk_id) to prevent duplicates
ALTER TABLE perk_claims 
ADD CONSTRAINT perk_claims_startup_profile_id_perk_id_unique 
UNIQUE (startup_profile_id, perk_id);

COMMENT ON CONSTRAINT perk_claims_startup_profile_id_perk_id_unique ON perk_claims IS 
  'Ensures each startup can only claim a specific perk once, enabling idempotent seed operations';
