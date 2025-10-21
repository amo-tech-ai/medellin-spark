-- Migration: 03_indexes.sql
-- Purpose: Performance indexes for Medellín Spark platform
-- Affected: All tables requiring query optimization
-- Strategy: FK indexes + composite/partial indexes for common queries
-- Compatibility: PostgreSQL 15+ (Supabase)
-- Author: Database Architect Agent
-- Date: 2025-10-12

set client_min_messages to warning;

-- ==============================================================================
-- PROFILES TABLE INDEXES
-- ==============================================================================
-- Rationale: Fast lookups by auth user_id for session management

create index idx_profiles_user_id on profiles(user_id);

-- ==============================================================================
-- ORGANIZERS TABLE INDEXES
-- ==============================================================================
-- Rationale: FK index for profile relationship

create index idx_organizers_profile_id on organizers(profile_id);

-- ==============================================================================
-- EVENTS TABLE INDEXES
-- ==============================================================================
-- Rationale: Core event queries filter by status, date, and search by slug

-- FK index for organizer relationship
create index idx_events_organizer_id on events(organizer_id);

-- Composite index for listing published events by date
create index idx_events_status_date on events(status, event_date)
  where deleted_at is null;

-- Unique slug lookups for URLs
create index idx_events_slug on events(slug)
  where deleted_at is null;

-- Partial index for active (non-deleted) events
create index idx_events_active on events(id)
  where deleted_at is null;

-- Support filtering by event date ranges
create index idx_events_date_range on events(event_date)
  where deleted_at is null;

-- ==============================================================================
-- EVENT_VENUES TABLE INDEXES
-- ==============================================================================
-- Rationale: Junction table needs both FK indexes

create index idx_event_venues_event_id on event_venues(event_id);
create index idx_event_venues_venue_id on event_venues(venue_id);

-- ==============================================================================
-- TICKETS TABLE INDEXES
-- ==============================================================================
-- Rationale: Query tickets by event and filter early bird offers

-- FK index for event relationship
create index idx_tickets_event_id on tickets(event_id);

-- Find early bird tickets quickly
create index idx_tickets_early_bird on tickets(event_id, early_bird)
  where early_bird = true;

-- ==============================================================================
-- REGISTRATIONS TABLE INDEXES
-- ==============================================================================
-- Rationale: High-traffic queries: user's registrations, event attendee lists

-- FK indexes
create index idx_registrations_event_id on registrations(event_id);
create index idx_registrations_profile_id on registrations(profile_id);
create index idx_registrations_ticket_id on registrations(ticket_id);

-- Filter by registration status
create index idx_registrations_status on registrations(event_id, status);

-- Filter by payment status for financial reports
create index idx_registrations_payment_status on registrations(event_id, payment_status);

-- Composite index for user's upcoming events
create index idx_registrations_profile_status on registrations(profile_id, status);

-- ==============================================================================
-- WAITLIST TABLE INDEXES
-- ==============================================================================
-- Rationale: Order waitlist by position for notifications

-- FK indexes
create index idx_waitlist_event_id on waitlist(event_id);
create index idx_waitlist_profile_id on waitlist(profile_id);

-- Find next to notify in waitlist
create index idx_waitlist_position on waitlist(event_id, position)
  where notified = false;

-- ==============================================================================
-- SPONSORS TABLE INDEXES
-- ==============================================================================
-- Rationale: List sponsors per event

create index idx_sponsors_event_id on sponsors(event_id);

-- ==============================================================================
-- COMPANIES TABLE INDEXES
-- ==============================================================================
-- Rationale: FK index for profile ownership

create index idx_companies_profile_id on companies(profile_id);

-- ==============================================================================
-- JOBS TABLE INDEXES
-- ==============================================================================
-- Rationale: Job listings filter by status, type, location; slug for URLs

-- FK index
create index idx_jobs_company_id on jobs(company_id);

-- Filter published jobs
create index idx_jobs_status on jobs(status)
  where deleted_at is null;

-- Filter by job type
create index idx_jobs_type on jobs(type)
  where deleted_at is null;

-- Search by location
create index idx_jobs_location on jobs(location)
  where deleted_at is null;

-- Unique slug lookups
create index idx_jobs_slug on jobs(slug)
  where deleted_at is null;

-- Partial index for active jobs
create index idx_jobs_active on jobs(id)
  where deleted_at is null and status = 'published';

-- ==============================================================================
-- JOB_SKILLS TABLE INDEXES
-- ==============================================================================
-- Rationale: Search jobs by required skills

create index idx_job_skills_job_id on job_skills(job_id);
create index idx_job_skills_skill_name on job_skills(skill_name);

-- ==============================================================================
-- CANDIDATES TABLE INDEXES
-- ==============================================================================
-- Rationale: FK index and filter by open_to_opportunities

create index idx_candidates_profile_id on candidates(profile_id);

create index idx_candidates_open on candidates(open_to_opportunities)
  where open_to_opportunities = true;

-- ==============================================================================
-- CANDIDATE_SKILLS TABLE INDEXES
-- ==============================================================================
-- Rationale: Match candidates by skills

create index idx_candidate_skills_candidate_id on candidate_skills(candidate_id);
create index idx_candidate_skills_skill_name on candidate_skills(skill_name);

-- ==============================================================================
-- APPLICATIONS TABLE INDEXES
-- ==============================================================================
-- Rationale: View applications by job/candidate; filter by stage and score

-- FK indexes
create index idx_applications_job_id on applications(job_id);
create index idx_applications_candidate_id on applications(candidate_id);

-- Filter by application stage
create index idx_applications_stage on applications(job_id, stage);

-- Sort by AI fit score (descending for best matches first)
create index idx_applications_fit_score on applications(job_id, fit_score desc)
  where fit_score is not null;

-- ==============================================================================
-- MATCHES TABLE INDEXES
-- ==============================================================================
-- Rationale: Find top matches for jobs and candidates

-- FK indexes
create index idx_matches_job_id on matches(job_id);
create index idx_matches_candidate_id on matches(candidate_id);

-- Sort matches by score (descending)
create index idx_matches_job_score on matches(job_id, match_score desc);
create index idx_matches_candidate_score on matches(candidate_id, match_score desc);

-- ==============================================================================
-- STARTUP_PROFILES TABLE INDEXES
-- ==============================================================================
-- Rationale: FK index and filter verified startups

create index idx_startup_profiles_profile_id on startup_profiles(profile_id);

create index idx_startup_profiles_verified on startup_profiles(verified)
  where verified = true;

-- ==============================================================================
-- PERKS TABLE INDEXES
-- ==============================================================================
-- Rationale: Browse active perks; slug for URLs; featured perks first

-- Unique slug lookups
create index idx_perks_slug on perks(slug);

-- Filter active perks
create index idx_perks_active on perks(active)
  where active = true;

-- Highlight featured perks
create index idx_perks_featured on perks(featured, active)
  where featured = true and active = true;

-- Search by category
create index idx_perks_category on perks(category, active)
  where active = true;

-- ==============================================================================
-- SAVED_PERKS TABLE INDEXES
-- ==============================================================================
-- Rationale: User's saved perks list

create index idx_saved_perks_startup_id on saved_perks(startup_profile_id);
create index idx_saved_perks_perk_id on saved_perks(perk_id);

-- ==============================================================================
-- PERK_CLAIMS TABLE INDEXES
-- ==============================================================================
-- Rationale: View claims by startup/perk; filter by status

-- FK indexes
create index idx_perk_claims_startup_id on perk_claims(startup_profile_id);
create index idx_perk_claims_perk_id on perk_claims(perk_id);

-- Filter by claim status
create index idx_perk_claims_status on perk_claims(status);

-- ==============================================================================
-- WIZARD_SESSIONS TABLE INDEXES
-- ==============================================================================
-- Rationale: User's wizard sessions

create index idx_wizard_sessions_profile_id on wizard_sessions(profile_id);

-- Filter completed sessions
create index idx_wizard_sessions_completed on wizard_sessions(profile_id, completed);

set client_min_messages to notice;
