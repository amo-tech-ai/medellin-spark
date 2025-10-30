-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.experiences CASCADE;
DROP TABLE IF EXISTS public.candidate_skills CASCADE;

-- Create experiences table for work history
CREATE TABLE public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  logo_url TEXT,
  role TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  achievements TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_experiences_profile ON public.experiences(profile_id);

-- Create candidate_skills table
CREATE TABLE public.candidate_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  category TEXT,
  level INTEGER NOT NULL CHECK (level BETWEEN 0 AND 100),
  endorsements INTEGER DEFAULT 0,
  proof TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(profile_id, skill_name)
);

CREATE INDEX idx_candidate_skills_profile ON public.candidate_skills(profile_id);

-- Enable RLS
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;

-- RLS Policies for experiences (public read, owner write)
CREATE POLICY "experiences_read_all"
ON public.experiences FOR SELECT
USING (true);

CREATE POLICY "experiences_insert_own"
ON public.experiences FOR INSERT
WITH CHECK (profile_id = current_profile_id());

CREATE POLICY "experiences_update_own"
ON public.experiences FOR UPDATE
USING (profile_id = current_profile_id())
WITH CHECK (profile_id = current_profile_id());

CREATE POLICY "experiences_delete_own"
ON public.experiences FOR DELETE
USING (profile_id = current_profile_id());

-- RLS Policies for candidate_skills (public read, owner write)
CREATE POLICY "candidate_skills_read_all"
ON public.candidate_skills FOR SELECT
USING (true);

CREATE POLICY "candidate_skills_insert_own"
ON public.candidate_skills FOR INSERT
WITH CHECK (profile_id = current_profile_id());

CREATE POLICY "candidate_skills_update_own"
ON public.candidate_skills FOR UPDATE
USING (profile_id = current_profile_id())
WITH CHECK (profile_id = current_profile_id());

CREATE POLICY "candidate_skills_delete_own"
ON public.candidate_skills FOR DELETE
USING (profile_id = current_profile_id());

-- Trigger for updated_at on experiences
CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();