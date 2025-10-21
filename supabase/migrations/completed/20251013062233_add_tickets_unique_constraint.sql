-- Migration: Add unique constraints for idempotent seeds
-- Location: supabase/migrations/20251013062233_add_tickets_unique_constraint.sql

-- Add unique constraint on tickets(event_id, name) to prevent duplicates
-- This enables idempotent seed operations with ON CONFLICT
ALTER TABLE tickets 
ADD CONSTRAINT tickets_event_id_name_unique 
UNIQUE (event_id, name);

COMMENT ON CONSTRAINT tickets_event_id_name_unique ON tickets IS 
  'Ensures ticket names are unique per event, enabling idempotent seed operations';
