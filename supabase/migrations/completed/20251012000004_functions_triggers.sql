-- Migration: 04_functions_triggers.sql
-- Purpose: Helper functions and automated triggers for Medellín Spark
-- Affected: Security helpers, profile management, counter updates
-- Compatibility: PostgreSQL 15+ (Supabase)
-- Author: Database Architect Agent
-- Date: 2025-10-12

set client_min_messages to warning;

-- ==============================================================================
-- SECURITY HELPER FUNCTIONS
-- ==============================================================================

-- has_role: Check if current user has a specific role
-- Used in RLS policies for admin/organizer checks
create or replace function has_role(role_name text)
returns boolean
language plpgsql
security definer
stable
as $$
begin
  -- Check if authenticated user has the specified role in auth.users metadata
  -- NOTE: Supabase stores custom claims in auth.users.raw_app_meta_data
  return coalesce(
    (
      select (raw_app_meta_data->>'role')::text = role_name
      from auth.users
      where id = auth.uid()
    ),
    false
  );
end;
$$;

comment on function has_role(text) is
  'Check if current authenticated user has specified role. Used in RLS policies.';

-- current_profile_id: Get profile ID for current auth user
-- Simplifies RLS policies that need to check profile ownership
create or replace function current_profile_id()
returns uuid
language plpgsql
security definer
stable
as $$
begin
  -- Return profile id for current authenticated user
  return (
    select id
    from profiles
    where user_id = auth.uid()
    limit 1
  );
end;
$$;

comment on function current_profile_id() is
  'Returns profile ID for current authenticated user. NULL if no profile exists.';

-- is_owner: Check if current user owns a specific record
-- Generic ownership check for RLS policies
create or replace function is_owner(
  table_name text,
  record_id uuid,
  owner_column text default 'profile_id'
)
returns boolean
language plpgsql
security definer
stable
as $$
declare
  owner_id uuid;
  current_prof_id uuid;
begin
  -- Get current user's profile id
  current_prof_id := current_profile_id();
  
  if current_prof_id is null then
    return false;
  end if;
  
  -- Dynamically query the owner column
  -- NOTE: This uses dynamic SQL - ensure table_name/owner_column are trusted
  execute format(
    'select %I from %I where id = $1',
    owner_column,
    table_name
  ) into owner_id using record_id;
  
  return owner_id = current_prof_id;
end;
$$;

comment on function is_owner(text, uuid, text) is
  'Generic ownership check for RLS policies. Verifies if current user owns a record.';

-- ==============================================================================
-- PROFILE MANAGEMENT FUNCTIONS
-- ==============================================================================

-- upsert_profile: Create or update profile from auth.users
-- Automatically called on user signup/login via trigger
create or replace function upsert_profile()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Insert or update profile when auth.users record is created/updated
  insert into profiles (
    user_id,
    email,
    full_name,
    avatar_url
  ) values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (user_id)
  do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, profiles.full_name),
    avatar_url = coalesce(excluded.avatar_url, profiles.avatar_url),
    updated_at = now();
  
  return new;
end;
$$;

comment on function upsert_profile() is
  'Trigger function to sync auth.users with profiles table on signup/update.';

-- Attach trigger to auth.users
-- NOTE: This assumes Supabase allows triggers on auth schema (may need manual setup)
create trigger on_auth_user_created
  after insert or update on auth.users
  for each row
  execute function upsert_profile();

-- ==============================================================================
-- COUNTER UPDATE TRIGGERS
-- ==============================================================================

-- update_event_registered_count: Maintain events.registered_count
-- Triggered on registrations INSERT/UPDATE/DELETE
create or replace function update_event_registered_count()
returns trigger
language plpgsql
as $$
declare
  event_id_to_update uuid;
begin
  -- Determine which event to update based on operation
  if tg_op = 'DELETE' then
    event_id_to_update := old.event_id;
  else
    event_id_to_update := new.event_id;
  end if;
  
  -- Recalculate registered_count for the event
  -- Count only confirmed or attended registrations
  update events
  set registered_count = (
    select count(*)
    from registrations
    where event_id = event_id_to_update
      and status in ('confirmed', 'attended')
  )
  where id = event_id_to_update;
  
  return coalesce(new, old);
end;
$$;

comment on function update_event_registered_count() is
  'Trigger function to update events.registered_count when registrations change.';

-- Attach trigger to registrations
create trigger trg_update_event_registered_count
  after insert or update or delete on registrations
  for each row
  execute function update_event_registered_count();

-- update_ticket_sold_count: Maintain tickets.sold_count
-- Triggered on registrations INSERT/UPDATE/DELETE
create or replace function update_ticket_sold_count()
returns trigger
language plpgsql
as $$
declare
  ticket_id_to_update uuid;
begin
  -- Determine which ticket to update
  if tg_op = 'DELETE' then
    ticket_id_to_update := old.ticket_id;
  else
    ticket_id_to_update := new.ticket_id;
  end if;
  
  -- Skip if no ticket assigned
  if ticket_id_to_update is null then
    return coalesce(new, old);
  end if;
  
  -- Recalculate sold_count for the ticket
  -- Count only paid registrations (payment_status = 'completed')
  update tickets
  set sold_count = (
    select count(*)
    from registrations
    where ticket_id = ticket_id_to_update
      and payment_status = 'completed'
  )
  where id = ticket_id_to_update;
  
  return coalesce(new, old);
end;
$$;

comment on function update_ticket_sold_count() is
  'Trigger function to update tickets.sold_count when registrations with payment change.';

-- Attach trigger to registrations
create trigger trg_update_ticket_sold_count
  after insert or update or delete on registrations
  for each row
  execute function update_ticket_sold_count();

-- ==============================================================================
-- UPDATED_AT TRIGGERS
-- ==============================================================================
-- Apply the update_updated_at() trigger to all tables with updated_at column

-- profiles
create trigger trg_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at();

-- organizers
create trigger trg_organizers_updated_at
  before update on organizers
  for each row
  execute function update_updated_at();

-- venues
create trigger trg_venues_updated_at
  before update on venues
  for each row
  execute function update_updated_at();

-- events
create trigger trg_events_updated_at
  before update on events
  for each row
  execute function update_updated_at();

-- tickets
create trigger trg_tickets_updated_at
  before update on tickets
  for each row
  execute function update_updated_at();

-- registrations
create trigger trg_registrations_updated_at
  before update on registrations
  for each row
  execute function update_updated_at();

-- waitlist
create trigger trg_waitlist_updated_at
  before update on waitlist
  for each row
  execute function update_updated_at();

-- sponsors
create trigger trg_sponsors_updated_at
  before update on sponsors
  for each row
  execute function update_updated_at();

-- companies
create trigger trg_companies_updated_at
  before update on companies
  for each row
  execute function update_updated_at();

-- jobs
create trigger trg_jobs_updated_at
  before update on jobs
  for each row
  execute function update_updated_at();

-- candidates
create trigger trg_candidates_updated_at
  before update on candidates
  for each row
  execute function update_updated_at();

-- applications
create trigger trg_applications_updated_at
  before update on applications
  for each row
  execute function update_updated_at();

-- startup_profiles
create trigger trg_startup_profiles_updated_at
  before update on startup_profiles
  for each row
  execute function update_updated_at();

-- perks
create trigger trg_perks_updated_at
  before update on perks
  for each row
  execute function update_updated_at();

-- perk_claims
create trigger trg_perk_claims_updated_at
  before update on perk_claims
  for each row
  execute function update_updated_at();

-- wizard_sessions
create trigger trg_wizard_sessions_updated_at
  before update on wizard_sessions
  for each row
  execute function update_updated_at();

-- ==============================================================================
-- GRANT PERMISSIONS
-- ==============================================================================
-- Grant execute on security definer functions to authenticated users

grant execute on function has_role(text) to authenticated;
grant execute on function current_profile_id() to authenticated;
grant execute on function is_owner(text, uuid, text) to authenticated;

set client_min_messages to notice;
