-- Migration: Add marketplace tables (jobs, events, perks, companies, etc.)
-- Location: supabase/migrations/20251013061030_add_marketplace_tables.sql

-- ==============================================================================
-- 1. CANDIDATE SKILLS TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.candidate_skills (
  candidate_id uuid NOT NULL,
  skill_name text NOT NULL,
  proficiency_level text NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT candidate_skills_pkey PRIMARY KEY (candidate_id, skill_name),
  CONSTRAINT candidate_skills_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_candidate_skills_candidate_id ON public.candidate_skills USING btree (candidate_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_candidate_skills_skill_name ON public.candidate_skills USING btree (skill_name) TABLESPACE pg_default;

-- ==============================================================================
-- 2. COMPANIES TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.companies (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL,
  name text NOT NULL,
  description text NULL,
  logo_url text NULL,
  website_url text NULL,
  industry text NULL,
  size_range text NULL,
  location text NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  published boolean NOT NULL DEFAULT false,
  CONSTRAINT companies_pkey PRIMARY KEY (id),
  CONSTRAINT companies_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles (id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_companies_profile_id ON public.companies USING btree (profile_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_companies_published ON public.companies USING btree (published) TABLESPACE pg_default WHERE (published = true);

CREATE TRIGGER trg_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ==============================================================================
-- 3. JOBS TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  title text NOT NULL,
  slug text NOT NULL,
  description text NOT NULL,
  requirements text NULL,
  responsibilities text NULL,
  type public.job_type NOT NULL,
  status public.job_status NOT NULL DEFAULT 'draft'::job_status,
  location text NULL,
  remote_allowed boolean NOT NULL DEFAULT false,
  salary_min numeric(10, 2) NULL,
  salary_max numeric(10, 2) NULL,
  salary_currency text NULL DEFAULT 'USD'::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  deleted_at timestamp with time zone NULL,
  CONSTRAINT jobs_pkey PRIMARY KEY (id),
  CONSTRAINT jobs_slug_unique UNIQUE (slug),
  CONSTRAINT jobs_company_id_fkey FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE,
  CONSTRAINT jobs_salary_range_valid CHECK ((salary_min IS NULL) OR (salary_max IS NULL) OR (salary_max >= salary_min))
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON public.jobs USING btree (company_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs USING btree (status) TABLESPACE pg_default WHERE (deleted_at IS NULL);
CREATE INDEX IF NOT EXISTS idx_jobs_type ON public.jobs USING btree (type) TABLESPACE pg_default WHERE (deleted_at IS NULL);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs USING btree (location) TABLESPACE pg_default WHERE (deleted_at IS NULL);
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON public.jobs USING btree (slug) TABLESPACE pg_default WHERE (deleted_at IS NULL);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON public.jobs USING btree (id) TABLESPACE pg_default WHERE ((deleted_at IS NULL) AND (status = 'published'::job_status));

CREATE TRIGGER trg_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ==============================================================================
-- 4. EVENTS TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  organizer_id uuid NOT NULL,
  title text NOT NULL,
  slug text NOT NULL,
  description text NOT NULL,
  event_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NULL,
  status public.event_status NOT NULL DEFAULT 'draft'::event_status,
  image_url text NULL,
  capacity integer NULL,
  registered_count integer NOT NULL DEFAULT 0,
  is_virtual boolean NOT NULL DEFAULT false,
  virtual_url text NULL,
  tags text[] NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  deleted_at timestamp with time zone NULL,
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_slug_unique UNIQUE (slug),
  CONSTRAINT events_organizer_id_fkey FOREIGN KEY (organizer_id) REFERENCES organizers (id) ON DELETE CASCADE,
  CONSTRAINT events_end_after_start CHECK ((end_date IS NULL) OR (end_date > event_date)),
  CONSTRAINT events_capacity_positive CHECK ((capacity IS NULL) OR (capacity > 0)),
  CONSTRAINT events_registered_within_capacity CHECK ((capacity IS NULL) OR (registered_count <= capacity)),
  CONSTRAINT events_virtual_url_required CHECK ((NOT is_virtual) OR (virtual_url IS NOT NULL))
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_events_organizer_id ON public.events USING btree (organizer_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_events_status_date ON public.events USING btree (status, event_date) TABLESPACE pg_default WHERE (deleted_at IS NULL);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events USING btree (slug) TABLESPACE pg_default WHERE (deleted_at IS NULL);
CREATE INDEX IF NOT EXISTS idx_events_active ON public.events USING btree (id) TABLESPACE pg_default WHERE (deleted_at IS NULL);
CREATE INDEX IF NOT EXISTS idx_events_date_range ON public.events USING btree (event_date) TABLESPACE pg_default WHERE (deleted_at IS NULL);

CREATE TRIGGER trg_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ==============================================================================
-- 5. TICKETS TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.tickets (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL,
  name text NOT NULL,
  description text NULL,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  capacity integer NULL,
  sold_count integer NOT NULL DEFAULT 0,
  early_bird boolean NOT NULL DEFAULT false,
  early_bird_deadline timestamp with time zone NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tickets_pkey PRIMARY KEY (id),
  CONSTRAINT tickets_event_id_fkey FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
  CONSTRAINT tickets_capacity_positive CHECK ((capacity IS NULL) OR (capacity > 0)),
  CONSTRAINT tickets_early_bird_deadline CHECK ((NOT early_bird) OR (early_bird_deadline IS NOT NULL)),
  CONSTRAINT tickets_price_non_negative CHECK (price >= 0::numeric),
  CONSTRAINT tickets_sold_within_capacity CHECK ((capacity IS NULL) OR (sold_count <= capacity))
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_tickets_event_id ON public.tickets USING btree (event_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_tickets_early_bird ON public.tickets USING btree (event_id, early_bird) TABLESPACE pg_default WHERE (early_bird = true);

CREATE TRIGGER trg_tickets_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ==============================================================================
-- 6. REGISTRATIONS TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.registrations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL,
  profile_id uuid NOT NULL,
  ticket_id uuid NULL,
  status public.registration_status NOT NULL DEFAULT 'pending'::registration_status,
  payment_status public.payment_status NOT NULL DEFAULT 'pending'::payment_status,
  payment_amount numeric(10, 2) NULL,
  payment_reference text NULL,
  attended boolean NOT NULL DEFAULT false,
  check_in_time timestamp with time zone NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT registrations_pkey PRIMARY KEY (id),
  CONSTRAINT registrations_event_profile_unique UNIQUE (event_id, profile_id),
  CONSTRAINT registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
  CONSTRAINT registrations_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles (id) ON DELETE CASCADE,
  CONSTRAINT registrations_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES tickets (id) ON DELETE SET NULL,
  CONSTRAINT registrations_payment_amount_matches_ticket CHECK ((ticket_id IS NULL) OR (payment_amount IS NOT NULL))
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON public.registrations USING btree (event_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_registrations_profile_id ON public.registrations USING btree (profile_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_registrations_ticket_id ON public.registrations USING btree (ticket_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations USING btree (event_id, status) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON public.registrations USING btree (event_id, payment_status) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_registrations_profile_status ON public.registrations USING btree (profile_id, status) TABLESPACE pg_default;

CREATE TRIGGER trg_registrations_updated_at BEFORE UPDATE ON registrations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_update_event_registered_count AFTER INSERT OR DELETE OR UPDATE ON registrations FOR EACH ROW EXECUTE FUNCTION update_event_registered_count();
CREATE TRIGGER trg_update_ticket_sold_count AFTER INSERT OR DELETE OR UPDATE ON registrations FOR EACH ROW EXECUTE FUNCTION update_ticket_sold_count();

-- ==============================================================================
-- 7. SPONSORS TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.sponsors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL,
  company_name text NOT NULL,
  tier public.sponsor_tier NOT NULL,
  logo_url text NULL,
  website_url text NULL,
  description text NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT sponsors_pkey PRIMARY KEY (id),
  CONSTRAINT sponsors_event_id_fkey FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_sponsors_event_id ON public.sponsors USING btree (event_id) TABLESPACE pg_default;

CREATE TRIGGER trg_sponsors_updated_at BEFORE UPDATE ON sponsors FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ==============================================================================
-- 8. PERKS TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.perks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL,
  description text NOT NULL,
  provider_name text NOT NULL,
  provider_logo_url text NULL,
  category text NOT NULL,
  value_description text NULL,
  terms_url text NULL,
  how_to_claim text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  eligibility_criteria text NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT perks_pkey PRIMARY KEY (id),
  CONSTRAINT perks_slug_unique UNIQUE (slug)
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_perks_slug ON public.perks USING btree (slug) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_perks_active ON public.perks USING btree (active) TABLESPACE pg_default WHERE (active = true);
CREATE INDEX IF NOT EXISTS idx_perks_featured ON public.perks USING btree (featured, active) TABLESPACE pg_default WHERE ((featured = true) AND (active = true));
CREATE INDEX IF NOT EXISTS idx_perks_category ON public.perks USING btree (category, active) TABLESPACE pg_default WHERE (active = true);

CREATE TRIGGER trg_perks_updated_at BEFORE UPDATE ON perks FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ==============================================================================
-- 9. PERK CLAIMS TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.perk_claims (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  startup_profile_id uuid NOT NULL,
  perk_id uuid NOT NULL,
  status public.claim_status NOT NULL DEFAULT 'pending'::claim_status,
  claim_details jsonb NULL,
  approval_notes text NULL,
  claimed_at timestamp with time zone NOT NULL DEFAULT now(),
  approved_at timestamp with time zone NULL,
  redeemed_at timestamp with time zone NULL,
  expires_at timestamp with time zone NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT perk_claims_pkey PRIMARY KEY (id),
  CONSTRAINT perk_claims_perk_id_fkey FOREIGN KEY (perk_id) REFERENCES perks (id) ON DELETE CASCADE,
  CONSTRAINT perk_claims_startup_profile_id_fkey FOREIGN KEY (startup_profile_id) REFERENCES startup_profiles (id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_perk_claims_startup_id ON public.perk_claims USING btree (startup_profile_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_perk_claims_perk_id ON public.perk_claims USING btree (perk_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_perk_claims_status ON public.perk_claims USING btree (status) TABLESPACE pg_default;

CREATE TRIGGER trg_perk_claims_updated_at BEFORE UPDATE ON perk_claims FOR EACH ROW EXECUTE FUNCTION update_updated_at();
