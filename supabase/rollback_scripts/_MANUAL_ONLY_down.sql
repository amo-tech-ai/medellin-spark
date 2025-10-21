-- Migration: 07_down.sql
-- Purpose: Rollback script for complete Medellín Spark schema teardown
-- WARNING: DESTRUCTIVE - This will remove all data and schema objects
-- Use only for development rollback or complete reset
-- Compatibility: PostgreSQL 15+ (Supabase)
-- Author: Database Architect Agent
-- Date: 2025-10-12

-- ==============================================================================
-- ⚠️  DANGER: COMPLETE DATABASE TEARDOWN
-- ==============================================================================
-- This script removes ALL tables, functions, policies, and data.
-- Execute with extreme caution. All data will be lost.
-- ==============================================================================

set client_min_messages to warning;

-- ==============================================================================
-- DROP ROW LEVEL SECURITY POLICIES
-- ==============================================================================

-- wizard_sessions policies
drop policy if exists "wizard_sessions_select_own" on wizard_sessions;
drop policy if exists "wizard_sessions_insert_own" on wizard_sessions;
drop policy if exists "wizard_sessions_update_own" on wizard_sessions;
drop policy if exists "wizard_sessions_delete_own" on wizard_sessions;

-- perk_claims policies
drop policy if exists "perk_claims_select_own" on perk_claims;
drop policy if exists "perk_claims_select_admin" on perk_claims;
drop policy if exists "perk_claims_insert_verified" on perk_claims;
drop policy if exists "perk_claims_update_own" on perk_claims;
drop policy if exists "perk_claims_update_admin" on perk_claims;

-- saved_perks policies
drop policy if exists "saved_perks_select_own" on saved_perks;
drop policy if exists "saved_perks_insert_own" on saved_perks;
drop policy if exists "saved_perks_delete_own" on saved_perks;

-- perks policies
drop policy if exists "perks_select_active" on perks;
drop policy if exists "perks_select_admin" on perks;
drop policy if exists "perks_insert_admin" on perks;
drop policy if exists "perks_update_admin" on perks;
drop policy if exists "perks_delete_admin" on perks;

-- startup_profiles policies
drop policy if exists "startup_profiles_select_verified" on startup_profiles;
drop policy if exists "startup_profiles_select_own" on startup_profiles;
drop policy if exists "startup_profiles_insert_own" on startup_profiles;
drop policy if exists "startup_profiles_update_own" on startup_profiles;
drop policy if exists "startup_profiles_update_admin" on startup_profiles;
drop policy if exists "startup_profiles_delete_own" on startup_profiles;

-- matches policies
drop policy if exists "matches_select_own_candidate" on matches;
drop policy if exists "matches_select_own_company" on matches;
drop policy if exists "matches_insert_admin" on matches;

-- applications policies
drop policy if exists "applications_select_own_candidate" on applications;
drop policy if exists "applications_select_own_company" on applications;
drop policy if exists "applications_select_admin" on applications;
drop policy if exists "applications_insert_candidate" on applications;
drop policy if exists "applications_update_own_candidate" on applications;
drop policy if exists "applications_update_own_company" on applications;
drop policy if exists "applications_delete_own_candidate" on applications;

-- candidate_skills policies
drop policy if exists "candidate_skills_select_authenticated" on candidate_skills;
drop policy if exists "candidate_skills_insert_own" on candidate_skills;
drop policy if exists "candidate_skills_delete_own" on candidate_skills;

-- candidates policies
drop policy if exists "candidates_select_authenticated" on candidates;
drop policy if exists "candidates_insert_own" on candidates;
drop policy if exists "candidates_update_own" on candidates;
drop policy if exists "candidates_delete_own" on candidates;

-- job_skills policies
drop policy if exists "job_skills_select_published" on job_skills;
drop policy if exists "job_skills_insert_company" on job_skills;
drop policy if exists "job_skills_delete_company" on job_skills;

-- jobs policies
drop policy if exists "jobs_select_published" on jobs;
drop policy if exists "jobs_select_own_company" on jobs;
drop policy if exists "jobs_select_admin" on jobs;
drop policy if exists "jobs_insert_company" on jobs;
drop policy if exists "jobs_update_own_company" on jobs;
drop policy if exists "jobs_update_admin" on jobs;
drop policy if exists "jobs_delete_own_company" on jobs;

-- companies policies
drop policy if exists "companies_select_all" on companies;
drop policy if exists "companies_insert_authenticated" on companies;
drop policy if exists "companies_update_own" on companies;
drop policy if exists "companies_delete_own" on companies;

-- sponsors policies
drop policy if exists "sponsors_select_published_events" on sponsors;
drop policy if exists "sponsors_insert_organizer" on sponsors;
drop policy if exists "sponsors_update_organizer" on sponsors;
drop policy if exists "sponsors_delete_organizer" on sponsors;

-- waitlist policies
drop policy if exists "waitlist_select_own" on waitlist;
drop policy if exists "waitlist_select_organizer" on waitlist;
drop policy if exists "waitlist_insert_authenticated" on waitlist;
drop policy if exists "waitlist_update_organizer" on waitlist;
drop policy if exists "waitlist_delete_own" on waitlist;

-- registrations policies
drop policy if exists "registrations_select_own" on registrations;
drop policy if exists "registrations_select_organizer" on registrations;
drop policy if exists "registrations_select_admin" on registrations;
drop policy if exists "registrations_insert_authenticated" on registrations;
drop policy if exists "registrations_update_own" on registrations;
drop policy if exists "registrations_update_organizer" on registrations;
drop policy if exists "registrations_delete_own" on registrations;

-- tickets policies
drop policy if exists "tickets_select_published_events" on tickets;
drop policy if exists "tickets_insert_organizer" on tickets;
drop policy if exists "tickets_update_organizer" on tickets;
drop policy if exists "tickets_delete_organizer" on tickets;

-- event_venues policies
drop policy if exists "event_venues_select_all" on event_venues;
drop policy if exists "event_venues_insert_organizer" on event_venues;
drop policy if exists "event_venues_delete_organizer" on event_venues;

-- events policies
drop policy if exists "events_select_published" on events;
drop policy if exists "events_select_own_organizer" on events;
drop policy if exists "events_select_admin" on events;
drop policy if exists "events_insert_organizer" on events;
drop policy if exists "events_update_own_organizer" on events;
drop policy if exists "events_update_admin" on events;
drop policy if exists "events_delete_own_organizer" on events;

-- venues policies
drop policy if exists "venues_select_all" on venues;
drop policy if exists "venues_insert_authenticated" on venues;
drop policy if exists "venues_update_authenticated" on venues;

-- organizers policies
drop policy if exists "organizers_select_all" on organizers;
drop policy if exists "organizers_insert_authenticated" on organizers;
drop policy if exists "organizers_update_own" on organizers;
drop policy if exists "organizers_delete_own" on organizers;

-- profiles policies
drop policy if exists "profiles_select_public" on profiles;
drop policy if exists "profiles_insert_own" on profiles;
drop policy if exists "profiles_update_own" on profiles;

-- ==============================================================================
-- DROP TRIGGERS
-- ==============================================================================

-- Auth trigger
drop trigger if exists on_auth_user_created on auth.users;

-- Counter update triggers
drop trigger if exists trg_update_event_registered_count on registrations;
drop trigger if exists trg_update_ticket_sold_count on registrations;

-- Updated_at triggers
drop trigger if exists trg_wizard_sessions_updated_at on wizard_sessions;
drop trigger if exists trg_perk_claims_updated_at on perk_claims;
drop trigger if exists trg_perks_updated_at on perks;
drop trigger if exists trg_startup_profiles_updated_at on startup_profiles;
drop trigger if exists trg_applications_updated_at on applications;
drop trigger if exists trg_candidates_updated_at on candidates;
drop trigger if exists trg_jobs_updated_at on jobs;
drop trigger if exists trg_companies_updated_at on companies;
drop trigger if exists trg_sponsors_updated_at on sponsors;
drop trigger if exists trg_waitlist_updated_at on waitlist;
drop trigger if exists trg_registrations_updated_at on registrations;
drop trigger if exists trg_tickets_updated_at on tickets;
drop trigger if exists trg_events_updated_at on events;
drop trigger if exists trg_venues_updated_at on venues;
drop trigger if exists trg_organizers_updated_at on organizers;
drop trigger if exists trg_profiles_updated_at on profiles;

-- ==============================================================================
-- DROP FUNCTIONS
-- ==============================================================================

drop function if exists update_ticket_sold_count() cascade;
drop function if exists update_event_registered_count() cascade;
drop function if exists upsert_profile() cascade;
drop function if exists is_owner(text, uuid, text) cascade;
drop function if exists current_profile_id() cascade;
drop function if exists has_role(text) cascade;
drop function if exists update_updated_at() cascade;

-- ==============================================================================
-- DROP INDEXES
-- ==============================================================================

-- Wizard sessions indexes
drop index if exists idx_wizard_sessions_profile_id;
drop index if exists idx_wizard_sessions_completed;

-- Perk claims indexes
drop index if exists idx_perk_claims_startup_id;
drop index if exists idx_perk_claims_perk_id;
drop index if exists idx_perk_claims_status;

-- Saved perks indexes
drop index if exists idx_saved_perks_startup_id;
drop index if exists idx_saved_perks_perk_id;

-- Perks indexes
drop index if exists idx_perks_slug;
drop index if exists idx_perks_active;
drop index if exists idx_perks_featured;
drop index if exists idx_perks_category;

-- Startup profiles indexes
drop index if exists idx_startup_profiles_profile_id;
drop index if exists idx_startup_profiles_verified;

-- Matches indexes
drop index if exists idx_matches_job_id;
drop index if exists idx_matches_candidate_id;
drop index if exists idx_matches_job_score;
drop index if exists idx_matches_candidate_score;

-- Applications indexes
drop index if exists idx_applications_job_id;
drop index if exists idx_applications_candidate_id;
drop index if exists idx_applications_stage;
drop index if exists idx_applications_fit_score;

-- Candidate skills indexes
drop index if exists idx_candidate_skills_candidate_id;
drop index if exists idx_candidate_skills_skill_name;

-- Candidates indexes
drop index if exists idx_candidates_profile_id;
drop index if exists idx_candidates_open;

-- Job skills indexes
drop index if exists idx_job_skills_job_id;
drop index if exists idx_job_skills_skill_name;

-- Jobs indexes
drop index if exists idx_jobs_company_id;
drop index if exists idx_jobs_status;
drop index if exists idx_jobs_type;
drop index if exists idx_jobs_location;
drop index if exists idx_jobs_slug;
drop index if exists idx_jobs_active;

-- Companies indexes
drop index if exists idx_companies_profile_id;

-- Sponsors indexes
drop index if exists idx_sponsors_event_id;

-- Waitlist indexes
drop index if exists idx_waitlist_event_id;
drop index if exists idx_waitlist_profile_id;
drop index if exists idx_waitlist_position;

-- Registrations indexes
drop index if exists idx_registrations_event_id;
drop index if exists idx_registrations_profile_id;
drop index if exists idx_registrations_ticket_id;
drop index if exists idx_registrations_status;
drop index if exists idx_registrations_payment_status;
drop index if exists idx_registrations_profile_status;

-- Tickets indexes
drop index if exists idx_tickets_event_id;
drop index if exists idx_tickets_early_bird;

-- Event venues indexes
drop index if exists idx_event_venues_event_id;
drop index if exists idx_event_venues_venue_id;

-- Events indexes
drop index if exists idx_events_organizer_id;
drop index if exists idx_events_status_date;
drop index if exists idx_events_slug;
drop index if exists idx_events_active;
drop index if exists idx_events_date_range;

-- Organizers indexes
drop index if exists idx_organizers_profile_id;

-- Profiles indexes
drop index if exists idx_profiles_user_id;

-- ==============================================================================
-- DROP TABLES (in reverse dependency order)
-- ==============================================================================

drop table if exists wizard_sessions cascade;
drop table if exists perk_claims cascade;
drop table if exists saved_perks cascade;
drop table if exists perks cascade;
drop table if exists startup_profiles cascade;
drop table if exists matches cascade;
drop table if exists applications cascade;
drop table if exists candidate_skills cascade;
drop table if exists candidates cascade;
drop table if exists job_skills cascade;
drop table if exists jobs cascade;
drop table if exists companies cascade;
drop table if exists sponsors cascade;
drop table if exists waitlist cascade;
drop table if exists registrations cascade;
drop table if exists tickets cascade;
drop table if exists event_venues cascade;
drop table if exists events cascade;
drop table if exists venues cascade;
drop table if exists organizers cascade;
drop table if exists profiles cascade;

-- ==============================================================================
-- DROP ENUM TYPES
-- ==============================================================================

drop type if exists claim_status cascade;
drop type if exists application_stage cascade;
drop type if exists job_status cascade;
drop type if exists job_type cascade;
drop type if exists sponsor_tier cascade;
drop type if exists payment_status cascade;
drop type if exists registration_status cascade;
drop type if exists event_status cascade;

-- ==============================================================================
-- DROP EXTENSIONS (with caution)
-- ==============================================================================
-- NOTE: Only drop extensions if you're certain they're not used elsewhere
-- Commenting out to be safe - uncomment only for complete teardown

-- drop extension if exists "uuid-ossp" cascade;
-- drop extension if exists pgcrypto cascade;

set client_min_messages to notice;

-- ==============================================================================
-- ROLLBACK COMPLETE
-- ==============================================================================
-- All Medellín Spark schema objects have been removed.
-- Extensions are preserved (commented out) for safety.
-- ==============================================================================
