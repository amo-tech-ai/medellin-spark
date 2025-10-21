-- migration: 20251013015300_fix_critical_security_issues.sql
-- purpose: address critical security vulnerabilities identified in production audit
-- affected: counter trigger functions, is_owner validation, venues policies
-- compatibility: postgresql 15+ (supabase)
-- author: database architect agent
-- date: 2025-10-13
-- audit reference: supabase_production_audit.md (issues #4, #5, #6)

-- ==============================================================================
-- critical fix #1: add security definer to counter functions
-- ==============================================================================
-- issue: counter functions lack elevated privileges, causing incorrect counts
-- when rls is enabled. triggers execute as current user, not system.
-- impact: registered_count and sold_count become inaccurate
-- severity: high

set client_min_messages to warning;

-- fix update_event_registered_count function
create or replace function update_event_registered_count()
returns trigger
language plpgsql
security definer  -- ← added: run with elevated privileges
set search_path = public  -- ← added: prevent search_path attacks
as $$
declare
  event_id_to_update uuid;
begin
  -- determine which event to update based on operation
  if tg_op = 'DELETE' then
    event_id_to_update := old.event_id;
  else
    event_id_to_update := new.event_id;
  end if;

  -- recalculate registered_count for the event
  -- now executes with system privileges, bypassing rls
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
  'trigger function to update events.registered_count when registrations change. security definer ensures accurate counts with rls enabled.';

-- fix update_ticket_sold_count function
create or replace function update_ticket_sold_count()
returns trigger
language plpgsql
security definer  -- ← added: run with elevated privileges
set search_path = public  -- ← added: prevent search_path attacks
as $$
declare
  ticket_id_to_update uuid;
begin
  -- determine which ticket to update
  if tg_op = 'DELETE' then
    ticket_id_to_update := old.ticket_id;
  else
    ticket_id_to_update := new.ticket_id;
  end if;

  -- skip if no ticket assigned
  if ticket_id_to_update is null then
    return coalesce(new, old);
  end if;

  -- recalculate sold_count for the ticket
  -- now executes with system privileges, bypassing rls
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
  'trigger function to update tickets.sold_count when registrations change. security definer ensures accurate counts with rls enabled.';

-- ==============================================================================
-- critical fix #2: add input validation to is_owner function
-- ==============================================================================
-- issue: dynamic sql without input validation creates sql injection risk
-- impact: potential privilege escalation, dos attacks, schema enumeration
-- severity: high

create or replace function is_owner(
  table_name text,
  record_id uuid,
  owner_column text default 'profile_id'
)
returns boolean
language plpgsql
security definer
stable
set search_path = public  -- ← added: prevent search_path attacks
as $$
declare
  owner_id uuid;
  current_prof_id uuid;
begin
  -- input validation: reject null inputs
  if table_name is null or record_id is null then
    return false;
  end if;

  -- security: whitelist allowed tables to prevent enumeration attacks
  if table_name not in (
    'events', 'organizers', 'venues', 'companies', 'jobs',
    'candidates', 'applications', 'startup_profiles',
    'wizard_sessions', 'perk_claims', 'registrations',
    'waitlist', 'saved_perks', 'sponsors', 'tickets'
  ) then
    raise warning 'is_owner called with invalid table: %', table_name;
    return false;
  end if;

  -- security: whitelist allowed columns to prevent column enumeration
  if owner_column not in ('profile_id', 'organizer_id', 'company_id', 'candidate_id') then
    raise warning 'is_owner called with invalid column: %', owner_column;
    return false;
  end if;

  -- get current user's profile id
  current_prof_id := current_profile_id();

  if current_prof_id is null then
    return false;
  end if;

  -- now safe to execute dynamic sql with validated inputs
  -- %i format prevents sql injection on identifiers
  execute format(
    'select %I from %I where id = $1',
    owner_column,
    table_name
  ) into owner_id using record_id;

  return owner_id = current_prof_id;

exception
  when others then
    -- defensive: log errors but don't expose details to caller
    raise warning 'is_owner error for table %.%: %', table_name, owner_column, sqlerrm;
    return false;
end;
$$;

comment on function is_owner(text, uuid, text) is
  'generic ownership check for rls policies with input validation. whitelists allowed tables and columns to prevent sql injection attacks.';

-- ==============================================================================
-- critical fix #3: restrict venues table policies
-- ==============================================================================
-- issue: any authenticated user can insert/update venues without restriction
-- impact: spam, vandalism, phishing attacks via fake venues
-- severity: critical

-- add created_by column to track venue ownership
alter table venues add column if not exists created_by uuid references profiles(id);

-- create index for performance
create index if not exists idx_venues_created_by on venues(created_by);

-- backfill existing venues: assign to first admin or leave null
-- note: in production, manually assign proper owners before enabling policies
update venues
set created_by = (
  select p.id
  from profiles p
  join auth.users u on u.id = p.user_id
  where (u.raw_app_meta_data->>'role')::text = 'admin'
  limit 1
)
where created_by is null;

-- drop overly permissive policies
drop policy if exists "venues_insert_authenticated" on venues;
drop policy if exists "venues_update_authenticated" on venues;

-- restrict insert to admin role only
-- rationale: prevents spam/fake venues, maintains data quality
create policy "venues_insert_admin"
  on venues
  for insert
  to authenticated
  with check (has_role('admin'));

comment on policy "venues_insert_admin" on venues is
  'only admins can create new venues to prevent spam and maintain data quality';

-- restrict update to venue creator or admin
-- rationale: owners can edit their venues, admins have override
create policy "venues_update_own_or_admin"
  on venues
  for update
  to authenticated
  using (
    has_role('admin') or
    created_by = current_profile_id()
  )
  with check (
    has_role('admin') or
    created_by = current_profile_id()
  );

comment on policy "venues_update_own_or_admin" on venues is
  'venue creators and admins can update venue details';

-- restrict delete to admin only
-- rationale: prevents accidental data loss, maintains referential integrity
create policy "venues_delete_admin"
  on venues
  for delete
  to authenticated
  using (has_role('admin'));

comment on policy "venues_delete_admin" on venues is
  'only admins can delete venues to prevent data loss';

set client_min_messages to notice;

-- ==============================================================================
-- migration summary
-- ==============================================================================
-- ✅ added security definer to update_event_registered_count()
-- ✅ added security definer to update_ticket_sold_count()
-- ✅ added input validation whitelists to is_owner()
-- ✅ added search_path protection to security definer functions
-- ✅ added created_by column to venues table
-- ✅ restricted venues insert to admin-only
-- ✅ restricted venues update to owner or admin
-- ✅ restricted venues delete to admin-only
--
-- security improvements:
-- - counter functions now execute with elevated privileges (accurate counts)
-- - is_owner function validates all inputs (prevents sql injection)
-- - venues table has proper ownership and access controls
--
-- next steps:
-- 1. assign created_by for existing venues in production
-- 2. test counter accuracy after registration/cancellation
-- 3. verify venues policies prevent unauthorized modifications
-- ==============================================================================
