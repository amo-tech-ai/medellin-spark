-- Migration: 01_extensions.sql
-- Purpose: Enable required PostgreSQL extensions for Medellín Spark platform
-- Affected: Database-wide extensions and base utility functions
-- Compatibility: PostgreSQL 15+ (Supabase)
-- Author: Database Architect Agent
-- Date: 2025-10-12

-- ==============================================================================
-- SAFE SETTINGS
-- ==============================================================================
-- Set client messages to WARNING to reduce noise during migration
set client_min_messages to warning;

-- ==============================================================================
-- EXTENSIONS
-- ==============================================================================

-- Enable pgcrypto for gen_random_uuid() and cryptographic functions
-- Used for generating UUIDs for all primary keys across the schema
create extension if not exists pgcrypto;

-- Enable uuid-ossp as fallback UUID generation (optional)
-- Provides additional UUID generation algorithms if needed
create extension if not exists "uuid-ossp";

-- Ensure plpgsql procedural language is available
-- Required for all trigger functions and stored procedures
-- NOTE: plpgsql is typically installed by default in PostgreSQL/Supabase
-- but we check to ensure compatibility
do $$
begin
  if not exists (
    select 1 from pg_language where lanname = 'plpgsql'
  ) then
    create language plpgsql;
  end if;
end
$$;

-- ==============================================================================
-- BASE UTILITY FUNCTIONS
-- ==============================================================================

-- update_updated_at: Trigger function to automatically update updated_at column
-- This function is used across all tables to maintain accurate modification timestamps
-- Usage: Attach as BEFORE UPDATE trigger to any table with updated_at column
create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  -- Set updated_at to current timestamp whenever row is modified
  new.updated_at = now();
  return new;
end;
$$;

-- Add comment for documentation
comment on function update_updated_at() is
  'Trigger function to automatically update updated_at timestamp on row modification. Apply as BEFORE UPDATE trigger.';

-- Reset client messages to default
set client_min_messages to notice;
