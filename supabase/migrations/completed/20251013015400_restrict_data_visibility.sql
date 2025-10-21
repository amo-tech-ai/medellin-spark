-- migration: 20251013015400_restrict_data_visibility.sql
-- purpose: restrict overly permissive select policies on sensitive data
-- affected: candidates, candidate_skills, companies tables
-- compatibility: postgresql 15+ (supabase)
-- author: database architect agent
-- date: 2025-10-13
-- audit reference: supabase_production_audit.md (issue #7)

-- ==============================================================================
-- high priority fix: restrict candidate and company data visibility
-- ==============================================================================
-- issue: all authenticated users can view all candidate profiles and companies
-- impact: data privacy violation, competitor intelligence gathering, gdpr risk
-- severity: high

set client_min_messages to warning;

-- ==============================================================================
-- fix candidates table: restrict to own profile and matched job posters
-- ==============================================================================

-- drop overly broad policy
drop policy if exists "candidates_select_authenticated" on candidates;

-- policy 1: users can view their own candidate profile
create policy "candidates_select_own"
  on candidates
  for select
  to authenticated
  using (profile_id = current_profile_id());

comment on policy "candidates_select_own" on candidates is
  'candidates can view their own profile';

-- policy 2: company recruiters can view candidates who applied to their jobs
create policy "candidates_select_applied_to_own_jobs"
  on candidates
  for select
  to authenticated
  using (
    -- candidate visible to companies where candidate applied to their jobs
    exists (
      select 1
      from applications a
      join jobs j on j.id = a.job_id
      join companies c on c.id = j.company_id
      where a.candidate_id = candidates.id
        and c.profile_id = current_profile_id()
    )
  );

comment on policy "candidates_select_applied_to_own_jobs" on candidates is
  'recruiters can view candidates who applied to their company jobs';

-- policy 3: admins can view all candidates
create policy "candidates_select_admin"
  on candidates
  for select
  to authenticated
  using (has_role('admin'));

comment on policy "candidates_select_admin" on candidates is
  'admins can view all candidate profiles for moderation';

-- ==============================================================================
-- fix candidate_skills table: restrict to same visibility as candidates
-- ==============================================================================

-- drop overly broad policy
drop policy if exists "candidate_skills_select_authenticated" on candidate_skills;

-- policy 1: users can view their own skills
create policy "candidate_skills_select_own"
  on candidate_skills
  for select
  to authenticated
  using (
    exists (
      select 1
      from candidates
      where candidates.id = candidate_skills.candidate_id
        and candidates.profile_id = current_profile_id()
    )
  );

comment on policy "candidate_skills_select_own" on candidate_skills is
  'users can view their own candidate skills';

-- policy 2: recruiters can view skills of candidates who applied
create policy "candidate_skills_select_applied"
  on candidate_skills
  for select
  to authenticated
  using (
    exists (
      select 1
      from candidates c
      join applications a on a.candidate_id = c.id
      join jobs j on j.id = a.job_id
      join companies co on co.id = j.company_id
      where c.id = candidate_skills.candidate_id
        and co.profile_id = current_profile_id()
    )
  );

comment on policy "candidate_skills_select_applied" on candidate_skills is
  'recruiters can view skills of candidates who applied to their jobs';

-- policy 3: admins can view all skills
create policy "candidate_skills_select_admin"
  on candidate_skills
  for select
  to authenticated
  using (has_role('admin'));

comment on policy "candidate_skills_select_admin" on candidate_skills is
  'admins can view all candidate skills';

-- ==============================================================================
-- fix companies table: add published flag and restrict visibility
-- ==============================================================================

-- add published column to control company visibility
alter table companies add column if not exists published boolean not null default false;

-- create index for performance
create index if not exists idx_companies_published on companies(published) where published = true;

-- backfill: set existing companies as published (assume valid)
-- note: review and unpublish spam/test companies before production
update companies
set published = true
where published = false;

-- drop overly broad policy
drop policy if exists "companies_select_all" on companies;

-- policy 1: anyone can view published companies
create policy "companies_select_published"
  on companies
  for select
  to anon, authenticated
  using (published = true);

comment on policy "companies_select_published" on companies is
  'public can view published companies';

-- policy 2: users can view their own companies (any status)
create policy "companies_select_own"
  on companies
  for select
  to authenticated
  using (profile_id = current_profile_id());

comment on policy "companies_select_own" on companies is
  'users can view their own companies regardless of published status';

-- policy 3: admins can view all companies
create policy "companies_select_admin"
  on companies
  for select
  to authenticated
  using (has_role('admin'));

comment on policy "companies_select_admin" on companies is
  'admins can view all companies for moderation';

-- update insert policy to set published=false by default
drop policy if exists "companies_insert_authenticated" on companies;

create policy "companies_insert_authenticated"
  on companies
  for insert
  to authenticated
  with check (
    profile_id = current_profile_id() and
    (published = false or has_role('admin'))  -- only admins can publish on creation
  );

comment on policy "companies_insert_authenticated" on companies is
  'users can create companies (unpublished), admins can publish immediately';

-- add update policy for publishing
drop policy if exists "companies_update_own" on companies;

create policy "companies_update_own"
  on companies
  for update
  to authenticated
  using (
    profile_id = current_profile_id() or
    has_role('admin')
  )
  with check (
    profile_id = current_profile_id() or
    has_role('admin')
  );

comment on policy "companies_update_own" on companies is
  'users can update their own companies, admins can update any';

set client_min_messages to notice;

-- ==============================================================================
-- migration summary
-- ==============================================================================
-- ✅ restricted candidates visibility to own profile + recruiters of applied jobs
-- ✅ restricted candidate_skills to match candidates visibility
-- ✅ added published flag to companies table
-- ✅ restricted companies visibility to published only (public)
-- ✅ users can view own companies regardless of published status
-- ✅ only admins can publish companies on creation
--
-- privacy improvements:
-- - candidates no longer visible to all authenticated users
-- - recruiters only see candidates who applied to their jobs
-- - companies require published=true for public visibility
-- - prevents competitor data harvesting
--
-- gdpr compliance:
-- - candidate data now properly scoped to relevant parties
-- - users maintain control over company visibility via published flag
--
-- next steps:
-- 1. review existing companies and set published appropriately
-- 2. implement company approval workflow (optional)
-- 3. add rate limiting on candidate queries (application-level)
-- 4. consider tiered access (premium recruiter accounts)
-- ==============================================================================
