-- Migration: 05_rls.sql
-- Purpose: Row Level Security (RLS) policies for Medellín Spark
-- Affected: All user-data tables
-- Security Model: Public read for published content, authenticated write, owner/admin manage
-- Compatibility: PostgreSQL 15+ (Supabase)
-- Author: Database Architect Agent
-- Date: 2025-10-12

set client_min_messages to warning;

-- ==============================================================================
-- ENABLE RLS ON ALL TABLES
-- ==============================================================================

alter table profiles enable row level security;
alter table organizers enable row level security;
alter table venues enable row level security;
alter table events enable row level security;
alter table event_venues enable row level security;
alter table tickets enable row level security;
alter table registrations enable row level security;
alter table waitlist enable row level security;
alter table sponsors enable row level security;
alter table companies enable row level security;
alter table jobs enable row level security;
alter table job_skills enable row level security;
alter table candidates enable row level security;
alter table candidate_skills enable row level security;
alter table applications enable row level security;
alter table matches enable row level security;
alter table startup_profiles enable row level security;
alter table perks enable row level security;
alter table saved_perks enable row level security;
alter table perk_claims enable row level security;
alter table wizard_sessions enable row level security;

-- ==============================================================================
-- PROFILES POLICIES
-- ==============================================================================

-- Users can view all basic profile information (public directory)
create policy "profiles_select_public"
  on profiles
  for select
  to authenticated, anon
  using (true);

-- Users can insert their own profile (handled by trigger, but allow manual)
create policy "profiles_insert_own"
  on profiles
  for insert
  to authenticated
  with check (user_id = auth.uid());

-- Users can update their own profile
create policy "profiles_update_own"
  on profiles
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Users cannot delete profiles (handled via cascade from auth.users)
-- No delete policy needed

-- ==============================================================================
-- ORGANIZERS POLICIES
-- ==============================================================================

-- Anyone can view organizers
create policy "organizers_select_all"
  on organizers
  for select
  to authenticated, anon
  using (true);

-- Authenticated users can create organizer profiles
create policy "organizers_insert_authenticated"
  on organizers
  for insert
  to authenticated
  with check (profile_id = current_profile_id());

-- Users can update their own organizer profiles
create policy "organizers_update_own"
  on organizers
  for update
  to authenticated
  using (profile_id = current_profile_id());

-- Users can delete their own organizer profiles
create policy "organizers_delete_own"
  on organizers
  for delete
  to authenticated
  using (profile_id = current_profile_id());

-- ==============================================================================
-- VENUES POLICIES
-- ==============================================================================

-- Anyone can view venues
create policy "venues_select_all"
  on venues
  for select
  to authenticated, anon
  using (true);

-- Authenticated users can create venues
create policy "venues_insert_authenticated"
  on venues
  for insert
  to authenticated
  with check (true);

-- Authenticated users can update venues
create policy "venues_update_authenticated"
  on venues
  for update
  to authenticated
  using (true);

-- ==============================================================================
-- EVENTS POLICIES
-- ==============================================================================

-- Anyone can view published, non-deleted events
create policy "events_select_published"
  on events
  for select
  to authenticated, anon
  using (
    status = 'published'
    and deleted_at is null
  );

-- Organizers can view their own events (any status)
create policy "events_select_own_organizer"
  on events
  for select
  to authenticated
  using (
    exists (
      select 1
      from organizers
      where organizers.id = events.organizer_id
        and organizers.profile_id = current_profile_id()
    )
  );

-- Admins can view all events
create policy "events_select_admin"
  on events
  for select
  to authenticated
  using (has_role('admin'));

-- Organizers can create events
create policy "events_insert_organizer"
  on events
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from organizers
      where organizers.id = organizer_id
        and organizers.profile_id = current_profile_id()
    )
  );

-- Organizers can update their own events
create policy "events_update_own_organizer"
  on events
  for update
  to authenticated
  using (
    exists (
      select 1
      from organizers
      where organizers.id = events.organizer_id
        and organizers.profile_id = current_profile_id()
    )
  );

-- Admins can update all events
create policy "events_update_admin"
  on events
  for update
  to authenticated
  using (has_role('admin'));

-- Organizers can soft-delete their own events (set deleted_at)
create policy "events_delete_own_organizer"
  on events
  for delete
  to authenticated
  using (
    exists (
      select 1
      from organizers
      where organizers.id = events.organizer_id
        and organizers.profile_id = current_profile_id()
    )
  );

-- ==============================================================================
-- EVENT_VENUES POLICIES
-- ==============================================================================

-- Anyone can view event-venue mappings
create policy "event_venues_select_all"
  on event_venues
  for select
  to authenticated, anon
  using (true);

-- Organizers can manage their event venues
create policy "event_venues_insert_organizer"
  on event_venues
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = event_id
        and o.profile_id = current_profile_id()
    )
  );

create policy "event_venues_delete_organizer"
  on event_venues
  for delete
  to authenticated
  using (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = event_id
        and o.profile_id = current_profile_id()
    )
  );

-- ==============================================================================
-- TICKETS POLICIES
-- ==============================================================================

-- Anyone can view tickets for published events
create policy "tickets_select_published_events"
  on tickets
  for select
  to authenticated, anon
  using (
    exists (
      select 1
      from events
      where events.id = tickets.event_id
        and events.status = 'published'
        and events.deleted_at is null
    )
  );

-- Organizers can manage tickets for their events
create policy "tickets_insert_organizer"
  on tickets
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = event_id
        and o.profile_id = current_profile_id()
    )
  );

create policy "tickets_update_organizer"
  on tickets
  for update
  to authenticated
  using (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = tickets.event_id
        and o.profile_id = current_profile_id()
    )
  );

create policy "tickets_delete_organizer"
  on tickets
  for delete
  to authenticated
  using (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = tickets.event_id
        and o.profile_id = current_profile_id()
    )
  );

-- ==============================================================================
-- REGISTRATIONS POLICIES
-- ==============================================================================

-- Users can view their own registrations
create policy "registrations_select_own"
  on registrations
  for select
  to authenticated
  using (profile_id = current_profile_id());

-- Organizers can view registrations for their events
create policy "registrations_select_organizer"
  on registrations
  for select
  to authenticated
  using (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = registrations.event_id
        and o.profile_id = current_profile_id()
    )
  );

-- Admins can view all registrations
create policy "registrations_select_admin"
  on registrations
  for select
  to authenticated
  using (has_role('admin'));

-- Authenticated users can register for events
create policy "registrations_insert_authenticated"
  on registrations
  for insert
  to authenticated
  with check (
    profile_id = current_profile_id()
    and exists (
      select 1
      from events
      where events.id = event_id
        and events.status = 'published'
        and events.deleted_at is null
    )
  );

-- Users can update their own registrations (e.g., cancel)
create policy "registrations_update_own"
  on registrations
  for update
  to authenticated
  using (profile_id = current_profile_id());

-- Organizers can update registrations for their events (e.g., check-in)
create policy "registrations_update_organizer"
  on registrations
  for update
  to authenticated
  using (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = registrations.event_id
        and o.profile_id = current_profile_id()
    )
  );

-- Users can delete their own registrations
create policy "registrations_delete_own"
  on registrations
  for delete
  to authenticated
  using (profile_id = current_profile_id());

-- ==============================================================================
-- WAITLIST POLICIES
-- ==============================================================================

-- Users can view their own waitlist entries
create policy "waitlist_select_own"
  on waitlist
  for select
  to authenticated
  using (profile_id = current_profile_id());

-- Organizers can view waitlist for their events
create policy "waitlist_select_organizer"
  on waitlist
  for select
  to authenticated
  using (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = waitlist.event_id
        and o.profile_id = current_profile_id()
    )
  );

-- Users can join waitlists
create policy "waitlist_insert_authenticated"
  on waitlist
  for insert
  to authenticated
  with check (profile_id = current_profile_id());

-- Organizers can update waitlist (e.g., notify users)
create policy "waitlist_update_organizer"
  on waitlist
  for update
  to authenticated
  using (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = waitlist.event_id
        and o.profile_id = current_profile_id()
    )
  );

-- Users can remove themselves from waitlist
create policy "waitlist_delete_own"
  on waitlist
  for delete
  to authenticated
  using (profile_id = current_profile_id());

-- ==============================================================================
-- SPONSORS POLICIES
-- ==============================================================================

-- Anyone can view sponsors for published events
create policy "sponsors_select_published_events"
  on sponsors
  for select
  to authenticated, anon
  using (
    exists (
      select 1
      from events
      where events.id = sponsors.event_id
        and events.status = 'published'
        and events.deleted_at is null
    )
  );

-- Organizers can manage sponsors for their events
create policy "sponsors_insert_organizer"
  on sponsors
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = event_id
        and o.profile_id = current_profile_id()
    )
  );

create policy "sponsors_update_organizer"
  on sponsors
  for update
  to authenticated
  using (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = sponsors.event_id
        and o.profile_id = current_profile_id()
    )
  );

create policy "sponsors_delete_organizer"
  on sponsors
  for delete
  to authenticated
  using (
    exists (
      select 1
      from events e
      join organizers o on o.id = e.organizer_id
      where e.id = sponsors.event_id
        and o.profile_id = current_profile_id()
    )
  );

-- ==============================================================================
-- COMPANIES POLICIES
-- ==============================================================================

-- Anyone can view companies
create policy "companies_select_all"
  on companies
  for select
  to authenticated, anon
  using (true);

-- Authenticated users can create company profiles
create policy "companies_insert_authenticated"
  on companies
  for insert
  to authenticated
  with check (profile_id = current_profile_id());

-- Users can update their own company profiles
create policy "companies_update_own"
  on companies
  for update
  to authenticated
  using (profile_id = current_profile_id());

-- Users can delete their own company profiles
create policy "companies_delete_own"
  on companies
  for delete
  to authenticated
  using (profile_id = current_profile_id());

-- ==============================================================================
-- JOBS POLICIES
-- ==============================================================================

-- Anyone can view published, non-deleted jobs
create policy "jobs_select_published"
  on jobs
  for select
  to authenticated, anon
  using (
    status = 'published'
    and deleted_at is null
  );

-- Company owners can view their own jobs (any status)
create policy "jobs_select_own_company"
  on jobs
  for select
  to authenticated
  using (
    exists (
      select 1
      from companies
      where companies.id = jobs.company_id
        and companies.profile_id = current_profile_id()
    )
  );

-- Admins can view all jobs
create policy "jobs_select_admin"
  on jobs
  for select
  to authenticated
  using (has_role('admin'));

-- Company owners can create jobs
create policy "jobs_insert_company"
  on jobs
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from companies
      where companies.id = company_id
        and companies.profile_id = current_profile_id()
    )
  );

-- Company owners can update their own jobs
create policy "jobs_update_own_company"
  on jobs
  for update
  to authenticated
  using (
    exists (
      select 1
      from companies
      where companies.id = jobs.company_id
        and companies.profile_id = current_profile_id()
    )
  );

-- Admins can update all jobs
create policy "jobs_update_admin"
  on jobs
  for update
  to authenticated
  using (has_role('admin'));

-- Company owners can soft-delete their own jobs
create policy "jobs_delete_own_company"
  on jobs
  for delete
  to authenticated
  using (
    exists (
      select 1
      from companies
      where companies.id = jobs.company_id
        and companies.profile_id = current_profile_id()
    )
  );

-- ==============================================================================
-- JOB_SKILLS POLICIES
-- ==============================================================================

-- Anyone can view job skills for published jobs
create policy "job_skills_select_published"
  on job_skills
  for select
  to authenticated, anon
  using (
    exists (
      select 1
      from jobs
      where jobs.id = job_skills.job_id
        and jobs.status = 'published'
        and jobs.deleted_at is null
    )
  );

-- Company owners can manage skills for their jobs
create policy "job_skills_insert_company"
  on job_skills
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from jobs j
      join companies c on c.id = j.company_id
      where j.id = job_id
        and c.profile_id = current_profile_id()
    )
  );

create policy "job_skills_delete_company"
  on job_skills
  for delete
  to authenticated
  using (
    exists (
      select 1
      from jobs j
      join companies c on c.id = j.company_id
      where j.id = job_skills.job_id
        and c.profile_id = current_profile_id()
    )
  );

-- ==============================================================================
-- CANDIDATES POLICIES
-- ==============================================================================

-- Authenticated users can view candidate profiles
create policy "candidates_select_authenticated"
  on candidates
  for select
  to authenticated
  using (true);

-- Users can create their own candidate profile
create policy "candidates_insert_own"
  on candidates
  for insert
  to authenticated
  with check (profile_id = current_profile_id());

-- Users can update their own candidate profile
create policy "candidates_update_own"
  on candidates
  for update
  to authenticated
  using (profile_id = current_profile_id());

-- Users can delete their own candidate profile
create policy "candidates_delete_own"
  on candidates
  for delete
  to authenticated
  using (profile_id = current_profile_id());

-- ==============================================================================
-- CANDIDATE_SKILLS POLICIES
-- ==============================================================================

-- Authenticated users can view candidate skills
create policy "candidate_skills_select_authenticated"
  on candidate_skills
  for select
  to authenticated
  using (true);

-- Users can manage their own skills
create policy "candidate_skills_insert_own"
  on candidate_skills
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from candidates
      where candidates.id = candidate_id
        and candidates.profile_id = current_profile_id()
    )
  );

create policy "candidate_skills_delete_own"
  on candidate_skills
  for delete
  to authenticated
  using (
    exists (
      select 1
      from candidates
      where candidates.id = candidate_skills.candidate_id
        and candidates.profile_id = current_profile_id()
    )
  );

-- ==============================================================================
-- APPLICATIONS POLICIES
-- ==============================================================================

-- Candidates can view their own applications
create policy "applications_select_own_candidate"
  on applications
  for select
  to authenticated
  using (
    exists (
      select 1
      from candidates
      where candidates.id = applications.candidate_id
        and candidates.profile_id = current_profile_id()
    )
  );

-- Company owners can view applications for their jobs
create policy "applications_select_own_company"
  on applications
  for select
  to authenticated
  using (
    exists (
      select 1
      from jobs j
      join companies c on c.id = j.company_id
      where j.id = applications.job_id
        and c.profile_id = current_profile_id()
    )
  );

-- Admins can view all applications
create policy "applications_select_admin"
  on applications
  for select
  to authenticated
  using (has_role('admin'));

-- Candidates can submit applications
create policy "applications_insert_candidate"
  on applications
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from candidates
      where candidates.id = candidate_id
        and candidates.profile_id = current_profile_id()
    )
    and exists (
      select 1
      from jobs
      where jobs.id = job_id
        and jobs.status = 'published'
        and jobs.deleted_at is null
    )
  );

-- Candidates can update their own applications (e.g., withdraw)
create policy "applications_update_own_candidate"
  on applications
  for update
  to authenticated
  using (
    exists (
      select 1
      from candidates
      where candidates.id = applications.candidate_id
        and candidates.profile_id = current_profile_id()
    )
  );

-- Company owners can update applications for their jobs (e.g., change stage)
create policy "applications_update_own_company"
  on applications
  for update
  to authenticated
  using (
    exists (
      select 1
      from jobs j
      join companies c on c.id = j.company_id
      where j.id = applications.job_id
        and c.profile_id = current_profile_id()
    )
  );

-- Candidates can delete their own applications
create policy "applications_delete_own_candidate"
  on applications
  for delete
  to authenticated
  using (
    exists (
      select 1
      from candidates
      where candidates.id = applications.candidate_id
        and candidates.profile_id = current_profile_id()
    )
  );

-- ==============================================================================
-- MATCHES POLICIES
-- ==============================================================================

-- Candidates can view their own matches
create policy "matches_select_own_candidate"
  on matches
  for select
  to authenticated
  using (
    exists (
      select 1
      from candidates
      where candidates.id = matches.candidate_id
        and candidates.profile_id = current_profile_id()
    )
  );

-- Company owners can view matches for their jobs
create policy "matches_select_own_company"
  on matches
  for select
  to authenticated
  using (
    exists (
      select 1
      from jobs j
      join companies c on c.id = j.company_id
      where j.id = matches.job_id
        and c.profile_id = current_profile_id()
    )
  );

-- System/admin can create matches (AI-generated)
create policy "matches_insert_admin"
  on matches
  for insert
  to authenticated
  with check (has_role('admin'));

-- ==============================================================================
-- STARTUP_PROFILES POLICIES
-- ==============================================================================

-- Anyone can view verified startup profiles
create policy "startup_profiles_select_verified"
  on startup_profiles
  for select
  to authenticated, anon
  using (verified = true);

-- Users can view their own startup profile
create policy "startup_profiles_select_own"
  on startup_profiles
  for select
  to authenticated
  using (profile_id = current_profile_id());

-- Authenticated users can create startup profile
create policy "startup_profiles_insert_own"
  on startup_profiles
  for insert
  to authenticated
  with check (profile_id = current_profile_id());

-- Users can update their own startup profile
create policy "startup_profiles_update_own"
  on startup_profiles
  for update
  to authenticated
  using (profile_id = current_profile_id());

-- Admins can update all startup profiles (for verification)
create policy "startup_profiles_update_admin"
  on startup_profiles
  for update
  to authenticated
  using (has_role('admin'));

-- Users can delete their own startup profile
create policy "startup_profiles_delete_own"
  on startup_profiles
  for delete
  to authenticated
  using (profile_id = current_profile_id());

-- ==============================================================================
-- PERKS POLICIES
-- ==============================================================================

-- Anyone can view active perks
create policy "perks_select_active"
  on perks
  for select
  to authenticated, anon
  using (active = true);

-- Admins can view all perks
create policy "perks_select_admin"
  on perks
  for select
  to authenticated
  using (has_role('admin'));

-- Admins can manage perks
create policy "perks_insert_admin"
  on perks
  for insert
  to authenticated
  with check (has_role('admin'));

create policy "perks_update_admin"
  on perks
  for update
  to authenticated
  using (has_role('admin'));

create policy "perks_delete_admin"
  on perks
  for delete
  to authenticated
  using (has_role('admin'));

-- ==============================================================================
-- SAVED_PERKS POLICIES
-- ==============================================================================

-- Users can view their own saved perks
create policy "saved_perks_select_own"
  on saved_perks
  for select
  to authenticated
  using (
    exists (
      select 1
      from startup_profiles
      where startup_profiles.id = saved_perks.startup_profile_id
        and startup_profiles.profile_id = current_profile_id()
    )
  );

-- Users can save perks
create policy "saved_perks_insert_own"
  on saved_perks
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from startup_profiles
      where startup_profiles.id = startup_profile_id
        and startup_profiles.profile_id = current_profile_id()
    )
  );

-- Users can unsave perks
create policy "saved_perks_delete_own"
  on saved_perks
  for delete
  to authenticated
  using (
    exists (
      select 1
      from startup_profiles
      where startup_profiles.id = saved_perks.startup_profile_id
        and startup_profiles.profile_id = current_profile_id()
    )
  );

-- ==============================================================================
-- PERK_CLAIMS POLICIES
-- ==============================================================================

-- Users can view their own perk claims
create policy "perk_claims_select_own"
  on perk_claims
  for select
  to authenticated
  using (
    exists (
      select 1
      from startup_profiles
      where startup_profiles.id = perk_claims.startup_profile_id
        and startup_profiles.profile_id = current_profile_id()
    )
  );

-- Admins can view all perk claims
create policy "perk_claims_select_admin"
  on perk_claims
  for select
  to authenticated
  using (has_role('admin'));

-- Verified startups can submit perk claims
create policy "perk_claims_insert_verified"
  on perk_claims
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from startup_profiles
      where startup_profiles.id = startup_profile_id
        and startup_profiles.profile_id = current_profile_id()
        and startup_profiles.verified = true
    )
  );

-- Users can update their own perk claims
create policy "perk_claims_update_own"
  on perk_claims
  for update
  to authenticated
  using (
    exists (
      select 1
      from startup_profiles
      where startup_profiles.id = perk_claims.startup_profile_id
        and startup_profiles.profile_id = current_profile_id()
    )
  );

-- Admins can update all perk claims (for approval)
create policy "perk_claims_update_admin"
  on perk_claims
  for update
  to authenticated
  using (has_role('admin'));

-- ==============================================================================
-- WIZARD_SESSIONS POLICIES
-- ==============================================================================

-- Users can view their own wizard sessions
create policy "wizard_sessions_select_own"
  on wizard_sessions
  for select
  to authenticated
  using (profile_id = current_profile_id());

-- Users can create wizard sessions
create policy "wizard_sessions_insert_own"
  on wizard_sessions
  for insert
  to authenticated
  with check (profile_id = current_profile_id());

-- Users can update their own wizard sessions
create policy "wizard_sessions_update_own"
  on wizard_sessions
  for update
  to authenticated
  using (profile_id = current_profile_id());

-- Users can delete their own wizard sessions
create policy "wizard_sessions_delete_own"
  on wizard_sessions
  for delete
  to authenticated
  using (profile_id = current_profile_id());

set client_min_messages to notice;
