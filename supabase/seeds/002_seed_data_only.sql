-- Seed data that works with AUTO-CREATED profiles
-- Profiles already exist from auth.users trigger, so we UPDATE them instead

BEGIN;

-- ==============================================================================
-- 1. UPDATE PROFILES (they already exist from trigger)
-- ==============================================================================

-- Update Sofia's profile
UPDATE profiles SET
  bio = 'CEO & Co-founder at GreenTech Solutions. Passionate about sustainable technology and climate innovation. Former product lead at Rappi.',
  company = 'GreenTech Solutions',
  job_title = 'CEO & Co-founder',
  avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
  linkedin_url = 'https://linkedin.com/in/sofia-martinez-co',
  twitter_url = 'https://twitter.com/sofiagreentec',
  website_url = 'https://greentech.co'
WHERE email = 'sofia.martinez@medellin-spark.local';

-- Update Carlos's profile
UPDATE profiles SET
  bio = 'Community builder and tech ecosystem connector in Medellín. Director at Ruta N Innovation Hub.',
  company = 'Ruta N',
  job_title = 'Community Director',
  avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
  linkedin_url = 'https://linkedin.com/in/carlos-lopez-rutan'
WHERE email = 'carlos.lopez@medellin-spark.local';

-- Update Ana's profile
UPDATE profiles SET
  bio = 'Full-stack developer specializing in React, Node.js, and cloud architecture. 5+ years building scalable web applications.',
  job_title = 'Senior Full-Stack Developer',
  avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
  linkedin_url = 'https://linkedin.com/in/ana-rodriguez-dev',
  website_url = 'https://anarodriguez.dev'
WHERE email = 'ana.rodriguez@medellin-spark.local';

-- Update Diego's profile
UPDATE profiles SET
  bio = 'Building AI-powered productivity tools for remote teams. Also open to technical co-founder opportunities.',
  company = 'TaskFlow AI',
  job_title = 'Founder & CTO',
  avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego',
  linkedin_url = 'https://linkedin.com/in/diego-sanchez-ai'
WHERE email = 'diego.sanchez@medellin-spark.local';

-- Update María's profile
UPDATE profiles SET
  bio = 'Product manager interested in Medellín''s tech scene. Attending events and networking.',
  job_title = 'Product Manager',
  avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria'
WHERE email = 'maria.garcia@medellin-spark.local';

-- ==============================================================================
-- 2. CREATE STARTUP PROFILES
-- ==============================================================================

-- Startup 1: GreenTech Solutions (Verified)
INSERT INTO startup_profiles (
  id,
  profile_id,
  company_name,
  description,
  logo_url,
  website_url,
  industry,
  stage,
  team_size,
  verified
)
SELECT
  '20000000-0000-0000-0000-000000000001'::uuid,
  p.id,
  'GreenTech Solutions',
  'AI-powered platform helping businesses measure and reduce their carbon footprint. We provide real-time sustainability analytics and actionable recommendations for SMEs in Latin America.',
  'https://api.dicebear.com/7.x/identicon/svg?seed=greentech',
  'https://greentech.co',
  'Climate Tech / SaaS',
  'Seed',
  8,
  true
FROM profiles p
WHERE p.email = 'sofia.martinez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

-- Startup 2: TaskFlow AI (Not yet verified)
INSERT INTO startup_profiles (
  id,
  profile_id,
  company_name,
  description,
  logo_url,
  website_url,
  industry,
  stage,
  team_size,
  verified
)
SELECT
  '20000000-0000-0000-0000-000000000002'::uuid,
  p.id,
  'TaskFlow AI',
  'Next-generation productivity suite powered by AI. Automatically organizes tasks, schedules meetings, and provides intelligent insights for remote teams.',
  'https://api.dicebear.com/7.x/identicon/svg?seed=taskflow',
  'https://taskflow.ai',
  'AI / Productivity',
  'Pre-seed',
  3,
  false
FROM profiles p
WHERE p.email = 'diego.sanchez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 3. CREATE ORGANIZERS
-- ==============================================================================

-- Organizer 1: Ruta N (Carlos's main organization)
INSERT INTO organizers (
  id,
  profile_id,
  name,
  description,
  logo_url,
  website_url,
  contact_email
)
SELECT
  '30000000-0000-0000-0000-000000000001'::uuid,
  p.id,
  'Ruta N Medellín',
  'Medellín''s innovation and business center, driving the city''s transformation into a global innovation hub. We connect startups, corporates, investors, and talent.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Logo_Ruta_N.svg/200px-Logo_Ruta_N.svg.png',
  'https://www.rutanmedellin.org',
  'eventos@rutanmedellin.org'
FROM profiles p
WHERE p.email = 'carlos.lopez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

-- Organizer 2: Startup Weekend Medellín (Carlos's second organization)
INSERT INTO organizers (
  id,
  profile_id,
  name,
  description,
  logo_url,
  website_url,
  contact_email
)
SELECT
  '30000000-0000-0000-0000-000000000002'::uuid,
  p.id,
  'Startup Weekend Medellín',
  '54-hour entrepreneurship competition where participants pitch ideas, form teams, and launch startups over a single weekend.',
  'https://api.dicebear.com/7.x/shapes/svg?seed=swmedellin',
  'https://startupweekend.co',
  'medellin@startupweekend.co'
FROM profiles p
WHERE p.email = 'carlos.lopez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 4. CREATE CANDIDATES
-- ==============================================================================

-- Candidate 1: Ana (Senior Developer)
INSERT INTO candidates (
  id,
  profile_id,
  resume_url,
  portfolio_url,
  years_experience,
  open_to_opportunities,
  preferred_locations,
  preferred_remote
)
SELECT
  '40000000-0000-0000-0000-000000000001'::uuid,
  p.id,
  'https://docs.google.com/document/d/ana-rodriguez-resume/view',
  'https://anarodriguez.dev',
  5,
  true,
  ARRAY['Medellín', 'Bogotá', 'Remote'],
  true
FROM profiles p
WHERE p.email = 'ana.rodriguez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

-- Candidate 2: Diego (CTO looking for co-founder opportunities)
INSERT INTO candidates (
  id,
  profile_id,
  resume_url,
  years_experience,
  open_to_opportunities,
  preferred_locations,
  preferred_remote
)
SELECT
  '40000000-0000-0000-0000-000000000002'::uuid,
  p.id,
  'https://linkedin.com/in/diego-sanchez-ai',
  7,
  true,
  ARRAY['Medellín', 'Remote'],
  true
FROM profiles p
WHERE p.email = 'diego.sanchez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- Verify data
SELECT 'Profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL SELECT 'Startup Profiles', COUNT(*) FROM startup_profiles
UNION ALL SELECT 'Organizers', COUNT(*) FROM organizers
UNION ALL SELECT 'Candidates', COUNT(*) FROM candidates;
