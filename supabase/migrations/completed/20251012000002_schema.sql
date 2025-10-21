-- Migration: 02_schema.sql
-- Purpose: Core schema for Medellín Spark platform
-- Affected: All domain tables, enums, and constraints
-- Features: Events, Jobs Marketplace, Startup Perks, Pitch Deck Wizard
-- Compatibility: PostgreSQL 15+ (Supabase)
-- Author: Database Architect Agent
-- Date: 2025-10-12

set client_min_messages to warning;

-- ==============================================================================
-- ENUMS
-- ==============================================================================

-- Event lifecycle status
create type event_status as enum (
  'draft',      -- Event being created/edited
  'published',  -- Live and accepting registrations
  'cancelled',  -- Event cancelled
  'completed'   -- Event has concluded
);

-- Registration workflow status
create type registration_status as enum (
  'pending',    -- Registration initiated but not confirmed
  'confirmed',  -- Registration confirmed (payment received if required)
  'cancelled',  -- User cancelled registration
  'attended',   -- User attended the event
  'no_show'     -- User registered but did not attend
);

-- Payment processing status
create type payment_status as enum (
  'pending',    -- Payment not yet processed
  'completed',  -- Payment successful
  'failed',     -- Payment attempt failed
  'refunded'    -- Payment was refunded
);

-- Sponsorship tiers
create type sponsor_tier as enum (
  'platinum',   -- Highest tier sponsor
  'gold',       -- Mid-tier sponsor
  'silver',     -- Entry-tier sponsor
  'bronze'      -- Basic sponsor
);

-- Job posting types
create type job_type as enum (
  'full_time',  -- Full-time employment
  'part_time',  -- Part-time employment
  'contract',   -- Contract/freelance work
  'internship'  -- Internship position
);

-- Job posting status
create type job_status as enum (
  'draft',      -- Job being created/edited
  'published',  -- Live and accepting applications
  'closed',     -- No longer accepting applications
  'filled'      -- Position has been filled
);

-- Application pipeline stage
create type application_stage as enum (
  'submitted',  -- Initial application received
  'screening',  -- Under review
  'interview',  -- Interview scheduled/completed
  'offer',      -- Offer extended
  'hired',      -- Candidate accepted offer
  'rejected'    -- Application declined
);

-- Perk claim status
create type claim_status as enum (
  'pending',    -- Claim initiated
  'approved',   -- Claim approved by perk provider
  'redeemed',   -- Perk has been used
  'expired',    -- Claim window expired
  'rejected'    -- Claim denied
);

-- ==============================================================================
-- CORE TABLES
-- ==============================================================================

-- profiles: User profiles linked to Supabase Auth
-- Core user data for all platform features
create table profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  avatar_url text,
  bio text,
  company text,
  job_title text,
  linkedin_url text,
  twitter_url text,
  website_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  -- Ensure one profile per auth user
  constraint profiles_user_id_unique unique (user_id),
  constraint profiles_email_unique unique (email)
);

comment on table profiles is 'User profiles linked to Supabase Auth users';

-- organizers: Event organizers (companies/individuals)
create table organizers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  description text,
  logo_url text,
  website_url text,
  contact_email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  constraint organizers_contact_email_check check (contact_email ~* '^[^@]+@[^@]+\.[^@]+$')
);

comment on table organizers is 'Event organizers - companies or individuals hosting events';

-- venues: Physical locations for events
create table venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  city text not null default 'Medellín',
  country text not null default 'Colombia',
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  capacity integer,
  description text,
  amenities text[], -- Array of amenity strings
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  constraint venues_capacity_positive check (capacity is null or capacity > 0)
);

comment on table venues is 'Physical venues where events are held';

-- events: Core event entity
create table events (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references organizers(id) on delete cascade,
  title text not null,
  slug text not null,
  description text not null,
  event_date timestamptz not null,
  end_date timestamptz,
  status event_status not null default 'draft',
  image_url text,
  capacity integer,
  registered_count integer not null default 0,
  is_virtual boolean not null default false,
  virtual_url text,
  tags text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz, -- Soft delete
  
  constraint events_slug_unique unique (slug),
  constraint events_capacity_positive check (capacity is null or capacity > 0),
  constraint events_registered_within_capacity check (
    capacity is null or registered_count <= capacity
  ),
  constraint events_end_after_start check (end_date is null or end_date > event_date),
  constraint events_virtual_url_required check (
    not is_virtual or virtual_url is not null
  )
);

comment on table events is 'Events with soft delete support via deleted_at';

-- event_venues: Junction table for events and venues (many-to-many)
create table event_venues (
  event_id uuid not null references events(id) on delete cascade,
  venue_id uuid not null references venues(id) on delete cascade,
  created_at timestamptz not null default now(),
  
  primary key (event_id, venue_id)
);

comment on table event_venues is 'Maps events to venues (many-to-many relationship)';

-- tickets: Ticket tiers for events
create table tickets (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  name text not null,
  description text,
  price decimal(10, 2) not null default 0,
  capacity integer,
  sold_count integer not null default 0,
  early_bird boolean not null default false,
  early_bird_deadline timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  constraint tickets_price_non_negative check (price >= 0),
  constraint tickets_capacity_positive check (capacity is null or capacity > 0),
  constraint tickets_sold_within_capacity check (
    capacity is null or sold_count <= capacity
  ),
  constraint tickets_early_bird_deadline check (
    not early_bird or early_bird_deadline is not null
  )
);

comment on table tickets is 'Ticket tiers/types for events with pricing and capacity';

-- registrations: User event registrations
create table registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  ticket_id uuid references tickets(id) on delete set null,
  status registration_status not null default 'pending',
  payment_status payment_status not null default 'pending',
  payment_amount decimal(10, 2),
  payment_reference text,
  attended boolean not null default false,
  check_in_time timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  -- One registration per user per event
  constraint registrations_event_profile_unique unique (event_id, profile_id),
  constraint registrations_payment_amount_matches_ticket check (
    ticket_id is null or payment_amount is not null
  )
);

comment on table registrations is 'User registrations for events with payment tracking';

-- waitlist: Event waitlist when capacity is full
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  position integer not null,
  notified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  constraint waitlist_event_profile_unique unique (event_id, profile_id),
  constraint waitlist_position_positive check (position > 0)
);

comment on table waitlist is 'Waitlist for events at capacity';

-- sponsors: Event sponsors
create table sponsors (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  company_name text not null,
  tier sponsor_tier not null,
  logo_url text,
  website_url text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table sponsors is 'Sponsors for events with tier classification';

-- ==============================================================================
-- JOBS MARKETPLACE TABLES
-- ==============================================================================

-- companies: Hiring companies
create table companies (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  description text,
  logo_url text,
  website_url text,
  industry text,
  size_range text, -- e.g., "1-10", "11-50", "51-200"
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table companies is 'Companies posting jobs on the platform';

-- jobs: Job postings
create table jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  title text not null,
  slug text not null,
  description text not null,
  requirements text,
  responsibilities text,
  type job_type not null,
  status job_status not null default 'draft',
  location text,
  remote_allowed boolean not null default false,
  salary_min decimal(10, 2),
  salary_max decimal(10, 2),
  salary_currency text default 'USD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz, -- Soft delete
  
  constraint jobs_slug_unique unique (slug),
  constraint jobs_salary_range_valid check (
    salary_min is null or salary_max is null or salary_max >= salary_min
  )
);

comment on table jobs is 'Job postings with soft delete support';

-- job_skills: Skills required for jobs
create table job_skills (
  job_id uuid not null references jobs(id) on delete cascade,
  skill_name text not null,
  required boolean not null default true,
  created_at timestamptz not null default now(),
  
  primary key (job_id, skill_name)
);

comment on table job_skills is 'Skills required or preferred for job postings';

-- candidates: Job seekers
create table candidates (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  resume_url text,
  portfolio_url text,
  years_experience integer,
  open_to_opportunities boolean not null default true,
  preferred_locations text[],
  preferred_remote boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  constraint candidates_profile_id_unique unique (profile_id),
  constraint candidates_years_experience_non_negative check (
    years_experience is null or years_experience >= 0
  )
);

comment on table candidates is 'Job seeker profiles';

-- candidate_skills: Candidate skill set
create table candidate_skills (
  candidate_id uuid not null references candidates(id) on delete cascade,
  skill_name text not null,
  proficiency_level text, -- e.g., "beginner", "intermediate", "expert"
  created_at timestamptz not null default now(),
  
  primary key (candidate_id, skill_name)
);

comment on table candidate_skills is 'Skills possessed by candidates';

-- applications: Job applications
create table applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  candidate_id uuid not null references candidates(id) on delete cascade,
  stage application_stage not null default 'submitted',
  cover_letter text,
  fit_score decimal(5, 2), -- AI-generated match score 0-100
  notes text, -- Hiring manager notes
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  constraint applications_job_candidate_unique unique (job_id, candidate_id),
  constraint applications_fit_score_range check (
    fit_score is null or (fit_score >= 0 and fit_score <= 100)
  )
);

comment on table applications is 'Job applications with AI fit scoring';

-- matches: AI-powered job-candidate matches
create table matches (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  candidate_id uuid not null references candidates(id) on delete cascade,
  match_score decimal(5, 2) not null, -- AI score 0-100
  reasons text[], -- Array of match reasons
  created_at timestamptz not null default now(),
  
  constraint matches_job_candidate_unique unique (job_id, candidate_id),
  constraint matches_score_range check (match_score >= 0 and match_score <= 100)
);

comment on table matches is 'AI-generated job-candidate matches';

-- ==============================================================================
-- STARTUP PERKS TABLES
-- ==============================================================================

-- startup_profiles: Startup company profiles
create table startup_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  company_name text not null,
  description text,
  logo_url text,
  website_url text,
  industry text,
  stage text, -- e.g., "pre-seed", "seed", "series-a"
  team_size integer,
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  constraint startup_profiles_profile_id_unique unique (profile_id),
  constraint startup_profiles_team_size_positive check (
    team_size is null or team_size > 0
  )
);

comment on table startup_profiles is 'Startup company profiles eligible for perks';

-- perks: Available perks for startups
create table perks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  description text not null,
  provider_name text not null,
  provider_logo_url text,
  category text not null, -- e.g., "cloud", "marketing", "legal"
  value_description text, -- e.g., "$10,000 in credits"
  terms_url text,
  how_to_claim text not null,
  active boolean not null default true,
  featured boolean not null default false,
  eligibility_criteria text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  constraint perks_slug_unique unique (slug)
);

comment on table perks is 'Perks available to verified startups';

-- saved_perks: Bookmarked perks by startups
create table saved_perks (
  startup_profile_id uuid not null references startup_profiles(id) on delete cascade,
  perk_id uuid not null references perks(id) on delete cascade,
  created_at timestamptz not null default now(),
  
  primary key (startup_profile_id, perk_id)
);

comment on table saved_perks is 'Perks saved/bookmarked by startups';

-- perk_claims: Perk claim requests
create table perk_claims (
  id uuid primary key default gen_random_uuid(),
  startup_profile_id uuid not null references startup_profiles(id) on delete cascade,
  perk_id uuid not null references perks(id) on delete cascade,
  status claim_status not null default 'pending',
  claim_details jsonb, -- Flexible field for claim-specific data
  approval_notes text,
  claimed_at timestamptz not null default now(),
  approved_at timestamptz,
  redeemed_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table perk_claims is 'Claims/redemptions of perks by startups';

-- ==============================================================================
-- PITCH DECK WIZARD TABLES
-- ==============================================================================

-- wizard_sessions: Pitch deck creation sessions
create table wizard_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  startup_name text not null,
  session_data jsonb not null default '{}'::jsonb, -- Flexible wizard state
  completed boolean not null default false,
  deck_url text, -- Generated pitch deck URL
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table wizard_sessions is 'Pitch deck wizard sessions with flexible state storage';

-- Reset client messages
set client_min_messages to notice;
