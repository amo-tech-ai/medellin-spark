-- Marketplace Sample Data (Companies, Jobs, Events, Perks, etc.)
-- Location: supabase/seeds/003_marketplace_sample_data.sql
-- Run AFTER 001_create_seed_users.sql and 002_seed_data_only.sql

BEGIN;

-- ==============================================================================
-- 1. CANDIDATE SKILLS
-- ==============================================================================

-- Ana's skills (Full-Stack Developer)
INSERT INTO candidate_skills (candidate_id, skill_name, proficiency_level)
SELECT 
  c.id,
  unnest(ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Next.js']),
  unnest(ARRAY['Expert', 'Expert', 'Advanced', 'Advanced', 'Intermediate', 'Advanced', 'Advanced', 'Expert'])
FROM candidates c
JOIN profiles p ON c.profile_id = p.id
WHERE p.email = 'ana.rodriguez@medellin-spark.local'
ON CONFLICT (candidate_id, skill_name) DO NOTHING;

-- Diego's skills (CTO/Founder)
INSERT INTO candidate_skills (candidate_id, skill_name, proficiency_level)
SELECT 
  c.id,
  unnest(ARRAY['Python', 'Machine Learning', 'AI/LLMs', 'FastAPI', 'System Architecture', 'Team Leadership', 'Product Strategy']),
  unnest(ARRAY['Expert', 'Expert', 'Advanced', 'Expert', 'Expert', 'Advanced', 'Advanced'])
FROM candidates c
JOIN profiles p ON c.profile_id = p.id
WHERE p.email = 'diego.sanchez@medellin-spark.local'
ON CONFLICT (candidate_id, skill_name) DO NOTHING;

-- ==============================================================================
-- 2. COMPANIES
-- ==============================================================================

-- Company 1: TechCorp Colombia (María's company - not yet published)
INSERT INTO companies (
  id, profile_id, name, description, logo_url, website_url,
  industry, size_range, location, published
)
SELECT
  '50000000-0000-0000-0000-000000000001'::uuid,
  p.id,
  'TechCorp Colombia',
  'Leading technology services provider in Colombia. We help businesses transform digitally through innovative software solutions and consulting services.',
  'https://api.dicebear.com/7.x/identicon/svg?seed=techcorp',
  'https://techcorp.co',
  'Technology Services',
  '50-200',
  'Medellín, Colombia',
  false
FROM profiles p
WHERE p.email = 'maria.garcia@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

-- Company 2: Rappi (Sofia's former company - published)
INSERT INTO companies (
  id, profile_id, name, description, logo_url, website_url,
  industry, size_range, location, published
)
SELECT
  '50000000-0000-0000-0000-000000000002'::uuid,
  p.id,
  'Rappi',
  'Latin America''s leading super-app for on-demand delivery. We''re building the future of commerce and instant delivery across the region.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Rappi_logo.svg/200px-Rappi_logo.svg.png',
  'https://www.rappi.com',
  'Technology / E-commerce',
  '1000+',
  'Bogotá, Colombia',
  true
FROM profiles p
WHERE p.email = 'sofia.martinez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 3. VENUES
-- ==============================================================================

-- Venue 1: Ruta N (Main innovation hub)
INSERT INTO venues (
  id, name, address, city, country, latitude, longitude,
  capacity, description, amenities, image_url, created_by
)
SELECT
  '90000000-0000-0000-0000-000000000001'::uuid,
  'Ruta N Medellín',
  'Calle 67 #52-20',
  'Medellín',
  'Colombia',
  6.2476414,
  -75.5658153,
  200,
  'Medellín''s premier innovation and technology center. Modern facilities with state-of-the-art auditorium, meeting rooms, and co-working spaces.',
  ARRAY['WiFi', 'Projector', 'Sound System', 'Parking', 'Catering Available', 'Accessible'],
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Logo_Ruta_N.svg/200px-Logo_Ruta_N.svg.png',
  p.id
FROM profiles p
WHERE p.email = 'carlos.lopez@medellin-spark.local'
ON CONFLICT (id) DO NOTHING;

-- Venue 2: Atom House (Coworking & Event Space)
INSERT INTO venues (
  id, name, address, city, country, latitude, longitude,
  capacity, description, amenities, image_url
)
VALUES (
  '90000000-0000-0000-0000-000000000002'::uuid,
  'Atom House Medellín',
  'Carrera 43A #1-50',
  'Medellín',
  'Colombia',
  6.2094296,
  -75.5730646,
  80,
  'Modern coworking space and event venue in El Poblado. Perfect for startup meetups and workshops.',
  ARRAY['WiFi', 'Projector', 'Whiteboard', 'Coffee', 'Breakout Rooms'],
  'https://api.dicebear.com/7.x/identicon/svg?seed=atomhouse'
) ON CONFLICT (id) DO NOTHING;

-- Venue 3: Plaza Mayor Convention Center
INSERT INTO venues (
  id, name, address, city, country, latitude, longitude,
  capacity, description, amenities
)
VALUES (
  '90000000-0000-0000-0000-000000000003'::uuid,
  'Plaza Mayor Convention Center',
  'Calle 41 #55-80',
  'Medellín',
  'Colombia',
  6.2524493,
  -75.5688219,
  1000,
  'Medellín''s largest convention center. Ideal for major conferences, expos, and large-scale events.',
  ARRAY['WiFi', 'Multiple Halls', 'AV Equipment', 'Catering', 'Parking', 'Accessible', 'Translation Booths']
) ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 4. JOBS
-- ==============================================================================

-- Job 1: Senior React Developer at GreenTech (Sofia's startup)
INSERT INTO jobs (
  id, company_id, title, slug, description, requirements, responsibilities,
  type, status, location, remote_allowed, salary_min, salary_max, salary_currency
)
VALUES (
  '60000000-0000-0000-0000-000000000001'::uuid,
  '50000000-0000-0000-0000-000000000002'::uuid,  -- Rappi
  'Senior React Developer',
  'senior-react-developer-rappi',
  'Join our frontend team to build the next generation of Rappi''s customer experience. You''ll work on high-impact features used by millions of users across Latin America.',
  E'• 5+ years of React experience\n• Strong TypeScript skills\n• Experience with Next.js and modern tooling\n• Understanding of web performance optimization\n• Experience with mobile-responsive design',
  E'• Build and maintain customer-facing features\n• Collaborate with product and design teams\n• Optimize application performance\n• Mentor junior developers\n• Participate in code reviews and architecture decisions',
  'full_time',
  'published',
  'Medellín, Colombia',
  true,
  72000.00,
  96000.00,
  'USD'
) ON CONFLICT (id) DO NOTHING;

-- Job 2: Machine Learning Engineer at TechCorp
INSERT INTO jobs (
  id, company_id, title, slug, description, requirements, responsibilities,
  type, status, location, remote_allowed, salary_min, salary_max, salary_currency
)
VALUES (
  '60000000-0000-0000-0000-000000000002'::uuid,
  '50000000-0000-0000-0000-000000000001'::uuid,  -- TechCorp
  'Machine Learning Engineer',
  'ml-engineer-techcorp-medellin',
  'Help us build AI-powered solutions for enterprise clients. Work on cutting-edge ML projects including NLP, computer vision, and recommendation systems.',
  E'• 3+ years ML/AI experience\n• Strong Python skills (PyTorch/TensorFlow)\n• Experience with production ML systems\n• Knowledge of MLOps practices\n• Strong problem-solving skills',
  E'• Design and implement ML models\n• Deploy models to production\n• Monitor and improve model performance\n• Collaborate with data engineering team\n• Research new ML techniques',
  'full_time',
  'draft',
  'Medellín, Colombia',
  true,
  60000.00,
  85000.00,
  'USD'
) ON CONFLICT (id) DO NOTHING;

-- Job 3: Product Designer (Remote) at Rappi
INSERT INTO jobs (
  id, company_id, title, slug, description, requirements, responsibilities,
  type, status, location, remote_allowed, salary_min, salary_max, salary_currency
)
VALUES (
  '60000000-0000-0000-0000-000000000003'::uuid,
  '50000000-0000-0000-0000-000000000002'::uuid,  -- Rappi
  'Product Designer',
  'product-designer-rappi-remote',
  'Shape the future of Rappi''s product experience. We''re looking for a creative product designer who can take complex problems and create simple, elegant solutions.',
  E'• 4+ years product design experience\n• Portfolio showcasing mobile and web design\n• Proficiency in Figma\n• Experience with design systems\n• Strong collaboration skills',
  E'• Design user flows and interfaces\n• Create and maintain design system\n• Conduct user research\n• Collaborate with engineering teams\n• Present designs to stakeholders',
  'full_time',
  'published',
  'Remote',
  true,
  55000.00,
  75000.00,
  'USD'
) ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 4. EVENTS
-- ==============================================================================

-- Event 1: Startup Grind Medellín (by Ruta N)
INSERT INTO events (
  id, organizer_id, title, slug, description, event_date, end_date,
  status, image_url, capacity, is_virtual, tags
)
SELECT
  '70000000-0000-0000-0000-000000000001'::uuid,
  o.id,
  'Startup Grind Medellín: Scaling Your Tech Startup',
  'startup-grind-medellin-scaling-2024',
  'Join us for an inspiring evening with successful founders who have scaled their startups from Medellín to international markets. Learn practical strategies for fundraising, team building, and market expansion.',
  (CURRENT_DATE + INTERVAL '30 days')::timestamp with time zone,
  (CURRENT_DATE + INTERVAL '30 days' + INTERVAL '3 hours')::timestamp with time zone,
  'published',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  150,
  false,
  ARRAY['startup', 'scaling', 'founder', 'networking']
FROM organizers o
WHERE o.name = 'Ruta N Medellín'
ON CONFLICT (id) DO NOTHING;

-- Event 2: AI & Machine Learning Workshop (by Ruta N)
INSERT INTO events (
  id, organizer_id, title, slug, description, event_date, end_date,
  status, image_url, capacity, is_virtual, virtual_url, tags
)
SELECT
  '70000000-0000-0000-0000-000000000002'::uuid,
  o.id,
  'AI & Machine Learning Workshop for Startups',
  'ai-ml-workshop-startups-2024',
  'Hands-on workshop covering practical AI/ML implementation for startups. Learn how to integrate AI into your products, choose the right models, and build ML pipelines.',
  (CURRENT_DATE + INTERVAL '45 days')::timestamp with time zone,
  (CURRENT_DATE + INTERVAL '45 days' + INTERVAL '4 hours')::timestamp with time zone,
  'published',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  80,
  true,
  'https://zoom.us/j/ai-ml-workshop-2024',
  ARRAY['ai', 'machine-learning', 'workshop', 'technical']
FROM organizers o
WHERE o.name = 'Ruta N Medellín'
ON CONFLICT (id) DO NOTHING;

-- Event 3: Startup Weekend Medellín February 2024
INSERT INTO events (
  id, organizer_id, title, slug, description, event_date, end_date,
  status, image_url, capacity, is_virtual, tags
)
SELECT
  '70000000-0000-0000-0000-000000000003'::uuid,
  o.id,
  'Startup Weekend Medellín February 2024',
  'startup-weekend-medellin-feb-2024',
  'The ultimate 54-hour entrepreneurship competition! Pitch your idea Friday night, form teams, build a startup, and present Sunday evening. Mentors, resources, and prizes included.',
  (CURRENT_DATE + INTERVAL '60 days')::timestamp with time zone,
  (CURRENT_DATE + INTERVAL '62 days')::timestamp with time zone,
  'published',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
  100,
  false,
  ARRAY['startup-weekend', 'competition', 'hackathon', 'entrepreneurship']
FROM organizers o
WHERE o.name = 'Startup Weekend Medellín'
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 4A. EVENT-VENUE LINKAGES
-- ==============================================================================

-- Link Event 1 (Startup Grind) to Ruta N
INSERT INTO event_venues (event_id, venue_id)
VALUES (
  '70000000-0000-0000-0000-000000000001'::uuid,  -- Startup Grind
  '90000000-0000-0000-0000-000000000001'::uuid   -- Ruta N
) ON CONFLICT (event_id, venue_id) DO NOTHING;

-- Event 2 (AI Workshop) is virtual - no venue linkage

-- Link Event 3 (Startup Weekend) to Atom House
INSERT INTO event_venues (event_id, venue_id)
VALUES (
  '70000000-0000-0000-0000-000000000003'::uuid,  -- Startup Weekend
  '90000000-0000-0000-0000-000000000002'::uuid   -- Atom House
) ON CONFLICT (event_id, venue_id) DO NOTHING;

-- ==============================================================================
-- 5. TICKETS
-- ==============================================================================

-- Tickets for Event 1: Startup Grind
INSERT INTO tickets (event_id, name, description, price, capacity, early_bird, early_bird_deadline)
SELECT
  '70000000-0000-0000-0000-000000000001'::uuid,
  'Early Bird',
  'Early bird special - limited availability',
  25000.00,
  50,
  true,
  (CURRENT_DATE + INTERVAL '15 days')::timestamp with time zone
FROM events
WHERE id = '70000000-0000-0000-0000-000000000001'::uuid
ON CONFLICT (event_id, name) DO NOTHING;

INSERT INTO tickets (event_id, name, description, price, capacity)
SELECT
  '70000000-0000-0000-0000-000000000001'::uuid,
  'General Admission',
  'Regular admission ticket',
  35000.00,
  100
FROM events
WHERE id = '70000000-0000-0000-0000-000000000001'::uuid
ON CONFLICT (event_id, name) DO NOTHING;

-- Tickets for Event 2: AI Workshop (Free virtual event)
INSERT INTO tickets (event_id, name, description, price, capacity)
SELECT
  '70000000-0000-0000-0000-000000000002'::uuid,
  'Virtual Attendance',
  'Free virtual attendance with Q&A access',
  0.00,
  80
FROM events
WHERE id = '70000000-0000-0000-0000-000000000002'::uuid
ON CONFLICT (event_id, name) DO NOTHING;

-- Tickets for Event 3: Startup Weekend
INSERT INTO tickets (event_id, name, description, price, capacity, early_bird, early_bird_deadline)
SELECT
  '70000000-0000-0000-0000-000000000003'::uuid,
  'Participant',
  'Full weekend participation including meals and materials',
  150000.00,
  80,
  true,
  (CURRENT_DATE + INTERVAL '45 days')::timestamp with time zone
FROM events
WHERE id = '70000000-0000-0000-0000-000000000003'::uuid
ON CONFLICT (event_id, name) DO NOTHING;

INSERT INTO tickets (event_id, name, description, price, capacity)
SELECT
  '70000000-0000-0000-0000-000000000003'::uuid,
  'Spectator',
  'Sunday final presentations only',
  30000.00,
  20
FROM events
WHERE id = '70000000-0000-0000-0000-000000000003'::uuid
ON CONFLICT (event_id, name) DO NOTHING;

-- ==============================================================================
-- 6. REGISTRATIONS (Sample attendees)
-- ==============================================================================

-- Ana registers for AI Workshop
INSERT INTO registrations (event_id, profile_id, ticket_id, status, payment_status, payment_amount)
SELECT
  e.id,
  p.id,
  t.id,
  'confirmed',
  'completed',
  0.00
FROM events e
JOIN tickets t ON t.event_id = e.id
JOIN profiles p ON p.email = 'ana.rodriguez@medellin-spark.local'
WHERE e.slug = 'ai-ml-workshop-startups-2024'
  AND t.name = 'Virtual Attendance'
ON CONFLICT (event_id, profile_id) DO NOTHING;

-- Diego registers for Startup Weekend
INSERT INTO registrations (event_id, profile_id, ticket_id, status, payment_status, payment_amount, payment_reference)
SELECT
  e.id,
  p.id,
  t.id,
  'confirmed',
  'completed',
  150000.00,
  'PAY-SW-2024-001'
FROM events e
JOIN tickets t ON t.event_id = e.id
JOIN profiles p ON p.email = 'diego.sanchez@medellin-spark.local'
WHERE e.slug = 'startup-weekend-medellin-feb-2024'
  AND t.name = 'Participant'
ON CONFLICT (event_id, profile_id) DO NOTHING;

-- María registers for Startup Grind
INSERT INTO registrations (event_id, profile_id, ticket_id, status, payment_status, payment_amount, payment_reference)
SELECT
  e.id,
  p.id,
  t.id,
  'confirmed',
  'completed',
  25000.00,
  'PAY-SG-2024-001'
FROM events e
JOIN tickets t ON t.event_id = e.id
JOIN profiles p ON p.email = 'maria.garcia@medellin-spark.local'
WHERE e.slug = 'startup-grind-medellin-scaling-2024'
  AND t.name = 'Early Bird'
ON CONFLICT (event_id, profile_id) DO NOTHING;

-- ==============================================================================
-- 7. SPONSORS
-- ==============================================================================

-- Sponsors for Startup Grind event
INSERT INTO sponsors (event_id, company_name, tier, logo_url, website_url, description)
SELECT
  '70000000-0000-0000-0000-000000000001'::uuid,
  'Rappi',
  'platinum',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Rappi_logo.svg/200px-Rappi_logo.svg.png',
  'https://www.rappi.com',
  'Latin America''s leading super-app for on-demand delivery'
FROM events
WHERE id = '70000000-0000-0000-0000-000000000001'::uuid
ON CONFLICT (event_id, company_name) DO NOTHING;

INSERT INTO sponsors (event_id, company_name, tier, logo_url, website_url, description)
SELECT
  '70000000-0000-0000-0000-000000000001'::uuid,
  'AWS',
  'gold',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/200px-Amazon_Web_Services_Logo.svg.png',
  'https://aws.amazon.com',
  'Cloud computing services and infrastructure'
FROM events
WHERE id = '70000000-0000-0000-0000-000000000001'::uuid
ON CONFLICT (event_id, company_name) DO NOTHING;

-- Sponsors for Startup Weekend
INSERT INTO sponsors (event_id, company_name, tier, logo_url, website_url, description)
SELECT
  '70000000-0000-0000-0000-000000000003'::uuid,
  'Google Cloud',
  'platinum',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/200px-Google_Cloud_logo.svg.png',
  'https://cloud.google.com',
  'Cloud services and developer tools'
FROM events
WHERE id = '70000000-0000-0000-0000-000000000003'::uuid
ON CONFLICT (event_id, company_name) DO NOTHING;

-- ==============================================================================
-- 8. PERKS
-- ==============================================================================

-- Perk 1: AWS Credits
INSERT INTO perks (
  id, title, slug, description, provider_name, provider_logo_url,
  category, value_description, how_to_claim, active, featured, eligibility_criteria
)
VALUES (
  '80000000-0000-0000-0000-000000000001'::uuid,
  '$100,000 in AWS Activate Credits',
  'aws-activate-credits-100k',
  'Get up to $100,000 in AWS credits to build and scale your startup on the world''s most comprehensive cloud platform. Includes technical support, training, and exclusive startup resources.',
  'Amazon Web Services',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/200px-Amazon_Web_Services_Logo.svg.png',
  'Cloud Infrastructure',
  'Up to $100,000 in AWS credits valid for 2 years',
  'Apply through the Medellín Spark platform. Receive approval within 48 hours. Redeem via AWS Activate portal.',
  true,
  true,
  'Must be a verified startup less than 5 years old with less than $1M in annual revenue'
) ON CONFLICT (id) DO NOTHING;

-- Perk 2: Google Cloud Credits
INSERT INTO perks (
  id, title, slug, description, provider_name, provider_logo_url,
  category, value_description, how_to_claim, active, featured, eligibility_criteria
)
VALUES (
  '80000000-0000-0000-0000-000000000002'::uuid,
  '$200,000 in Google Cloud Credits',
  'google-cloud-credits-200k',
  'Accelerate your startup with Google Cloud credits, AI/ML tools, and technical support. Access to Google''s advanced infrastructure and cutting-edge services.',
  'Google Cloud',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/200px-Google_Cloud_logo.svg.png',
  'Cloud Infrastructure',
  '$200,000 in credits over 2 years plus technical training',
  'Submit application through Medellín Spark. Google will review within 5 business days.',
  true,
  true,
  'Funded startups in seed or Series A stage'
) ON CONFLICT (id) DO NOTHING;

-- Perk 3: Stripe Fee Waiver
INSERT INTO perks (
  id, title, slug, description, provider_name, provider_logo_url,
  category, value_description, how_to_claim, active, featured, eligibility_criteria
)
VALUES (
  '80000000-0000-0000-0000-000000000003'::uuid,
  'Waived Stripe Processing Fees',
  'stripe-fee-waiver',
  'Get your first $20,000 in payment processing fees waived. Perfect for early-stage startups starting to generate revenue.',
  'Stripe',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/200px-Stripe_Logo%2C_revised_2016.svg.png',
  'Payments',
  'Up to $20,000 in waived processing fees',
  'Sign up for Stripe through the Medellín Spark partnership link. Fees automatically waived.',
  true,
  false,
  'New Stripe accounts only, must be a verified startup'
) ON CONFLICT (id) DO NOTHING;

-- Perk 4: Notion for Startups
INSERT INTO perks (
  id, title, slug, description, provider_name, provider_logo_url,
  category, value_description, terms_url, how_to_claim, active, featured, eligibility_criteria
)
VALUES (
  '80000000-0000-0000-0000-000000000004'::uuid,
  'Notion for Startups - 6 Months Free',
  'notion-startup-program',
  'Get 6 months of Notion Plus plan free, then 50% off for your first year. Perfect for managing your startup''s docs, projects, and knowledge base.',
  'Notion',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/200px-Notion-logo.svg.png',
  'Productivity',
  '6 months free Plus plan + 50% off year 1',
  'https://notion.so/startup-terms',
  'Apply via Medellín Spark platform. Receive approval code within 24 hours.',
  true,
  false,
  'Startups less than 2 years old with less than $500K in funding'
) ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 9. PERK CLAIMS
-- ==============================================================================

-- GreenTech Solutions claims AWS credits
INSERT INTO perk_claims (
  startup_profile_id, perk_id, status, claim_details, approved_at
)
SELECT
  sp.id,
  '80000000-0000-0000-0000-000000000001'::uuid,
  'approved',
  '{"requested_amount": "$100,000", "use_case": "Hosting climate analytics platform and ML model infrastructure"}'::jsonb,
  now() - INTERVAL '10 days'
FROM startup_profiles sp
WHERE sp.company_name = 'GreenTech Solutions'
ON CONFLICT (startup_profile_id, perk_id) DO NOTHING;

-- TaskFlow AI claims Google Cloud credits (pending approval)
INSERT INTO perk_claims (
  startup_profile_id, perk_id, status, claim_details
)
SELECT
  sp.id,
  '80000000-0000-0000-0000-000000000002'::uuid,
  'pending',
  '{"requested_amount": "$200,000", "use_case": "AI/ML infrastructure for productivity tools and model training"}'::jsonb
FROM startup_profiles sp
WHERE sp.company_name = 'TaskFlow AI'
ON CONFLICT (startup_profile_id, perk_id) DO NOTHING;

-- ==============================================================================
-- 10. JOB SKILLS (Skills required for each job posting)
-- ==============================================================================

-- React Developer @ TechCorp needs React, TypeScript, Node.js
INSERT INTO job_skills (job_id, skill_name, required)
SELECT
  '60000000-0000-0000-0000-000000000001'::uuid,
  'React',
  true
FROM jobs
WHERE id = '60000000-0000-0000-0000-000000000001'::uuid
ON CONFLICT (job_id, skill_name) DO NOTHING;

INSERT INTO job_skills (job_id, skill_name, required)
SELECT
  '60000000-0000-0000-0000-000000000001'::uuid,
  'TypeScript',
  true
FROM jobs
WHERE id = '60000000-0000-0000-0000-000000000001'::uuid
ON CONFLICT (job_id, skill_name) DO NOTHING;

INSERT INTO job_skills (job_id, skill_name, required)
SELECT
  '60000000-0000-0000-0000-000000000001'::uuid,
  'Node.js',
  false
FROM jobs
WHERE id = '60000000-0000-0000-0000-000000000001'::uuid
ON CONFLICT (job_id, skill_name) DO NOTHING;

-- ML Engineer @ TechCorp needs Python, TensorFlow, PyTorch, AWS
INSERT INTO job_skills (job_id, skill_name, required)
SELECT
  '60000000-0000-0000-0000-000000000002'::uuid,
  'Python',
  true
FROM jobs
WHERE id = '60000000-0000-0000-0000-000000000002'::uuid
ON CONFLICT (job_id, skill_name) DO NOTHING;

INSERT INTO job_skills (job_id, skill_name, required)
SELECT
  '60000000-0000-0000-0000-000000000002'::uuid,
  'TensorFlow',
  true
FROM jobs
WHERE id = '60000000-0000-0000-0000-000000000002'::uuid
ON CONFLICT (job_id, skill_name) DO NOTHING;

INSERT INTO job_skills (job_id, skill_name, required)
SELECT
  '60000000-0000-0000-0000-000000000002'::uuid,
  'PyTorch',
  false
FROM jobs
WHERE id = '60000000-0000-0000-0000-000000000002'::uuid
ON CONFLICT (job_id, skill_name) DO NOTHING;

INSERT INTO job_skills (job_id, skill_name, required)
SELECT
  '60000000-0000-0000-0000-000000000002'::uuid,
  'AWS',
  false
FROM jobs
WHERE id = '60000000-0000-0000-0000-000000000002'::uuid
ON CONFLICT (job_id, skill_name) DO NOTHING;

-- Product Designer @ Rappi needs Figma, User Research
INSERT INTO job_skills (job_id, skill_name, required)
SELECT
  '60000000-0000-0000-0000-000000000003'::uuid,
  'Figma',
  true
FROM jobs
WHERE id = '60000000-0000-0000-0000-000000000003'::uuid
ON CONFLICT (job_id, skill_name) DO NOTHING;

INSERT INTO job_skills (job_id, skill_name, required)
SELECT
  '60000000-0000-0000-0000-000000000003'::uuid,
  'User Research',
  true
FROM jobs
WHERE id = '60000000-0000-0000-0000-000000000003'::uuid
ON CONFLICT (job_id, skill_name) DO NOTHING;

-- ==============================================================================
-- 11. MATCHES (Candidate-Job matching scores)
-- ==============================================================================

-- Ana Rodríguez (React, TypeScript, Node.js) matches React Developer job
INSERT INTO matches (job_id, candidate_id, match_score, reasons)
SELECT
  '60000000-0000-0000-0000-000000000001'::uuid,
  c.id,
  92.5,
  ARRAY['Has React experience', 'Proficient in TypeScript', 'Knows Node.js']
FROM candidates c
JOIN profiles p ON p.id = c.profile_id
WHERE p.email = 'ana.rodriguez@medellin-spark.local'
ON CONFLICT (job_id, candidate_id) DO NOTHING;

-- Ana Rodríguez also matches ML Engineer job (lower score - has Python but not ML-specific skills)
INSERT INTO matches (job_id, candidate_id, match_score, reasons)
SELECT
  '60000000-0000-0000-0000-000000000002'::uuid,
  c.id,
  45.0,
  ARRAY['Has Python basics', 'Missing TensorFlow/PyTorch experience']
FROM candidates c
JOIN profiles p ON p.id = c.profile_id
WHERE p.email = 'ana.rodriguez@medellin-spark.local'
ON CONFLICT (job_id, candidate_id) DO NOTHING;

-- Diego Sánchez (Python, TensorFlow, AWS) is perfect match for ML Engineer
INSERT INTO matches (job_id, candidate_id, match_score, reasons)
SELECT
  '60000000-0000-0000-0000-000000000002'::uuid,
  c.id,
  95.0,
  ARRAY['Expert in Python', 'TensorFlow experience', 'AWS cloud knowledge']
FROM candidates c
JOIN profiles p ON p.id = c.profile_id
WHERE p.email = 'diego.sanchez@medellin-spark.local'
ON CONFLICT (job_id, candidate_id) DO NOTHING;

-- Diego Sánchez also matches React Developer job (lower score - has Node.js but not React/TypeScript)
INSERT INTO matches (job_id, candidate_id, match_score, reasons)
SELECT
  '60000000-0000-0000-0000-000000000001'::uuid,
  c.id,
  38.0,
  ARRAY['Node.js experience', 'Missing React/TypeScript skills']
FROM candidates c
JOIN profiles p ON p.id = c.profile_id
WHERE p.email = 'diego.sanchez@medellin-spark.local'
ON CONFLICT (job_id, candidate_id) DO NOTHING;

-- ==============================================================================
-- 12. SAVED PERKS (Startups saving perks for later consideration)
-- ==============================================================================

-- GreenTech Solutions saves Stripe credits (already claimed AWS)
INSERT INTO saved_perks (startup_profile_id, perk_id)
SELECT
  sp.id,
  '80000000-0000-0000-0000-000000000003'::uuid
FROM startup_profiles sp
WHERE sp.company_name = 'GreenTech Solutions'
ON CONFLICT (startup_profile_id, perk_id) DO NOTHING;

-- GreenTech Solutions also saves Notion credits
INSERT INTO saved_perks (startup_profile_id, perk_id)
SELECT
  sp.id,
  '80000000-0000-0000-0000-000000000004'::uuid
FROM startup_profiles sp
WHERE sp.company_name = 'GreenTech Solutions'
ON CONFLICT (startup_profile_id, perk_id) DO NOTHING;

-- TaskFlow AI saves AWS credits (already claimed Google Cloud)
INSERT INTO saved_perks (startup_profile_id, perk_id)
SELECT
  sp.id,
  '80000000-0000-0000-0000-000000000001'::uuid
FROM startup_profiles sp
WHERE sp.company_name = 'TaskFlow AI'
ON CONFLICT (startup_profile_id, perk_id) DO NOTHING;

-- TaskFlow AI saves Stripe credits
INSERT INTO saved_perks (startup_profile_id, perk_id)
SELECT
  sp.id,
  '80000000-0000-0000-0000-000000000003'::uuid
FROM startup_profiles sp
WHERE sp.company_name = 'TaskFlow AI'
ON CONFLICT (startup_profile_id, perk_id) DO NOTHING;

-- ==============================================================================
-- 13. JOB APPLICATIONS (Candidates applying to jobs)
-- ==============================================================================

-- Ana Rodríguez applies to React Developer job (great fit - 92.5% match)
INSERT INTO applications (job_id, candidate_id, stage, cover_letter, fit_score)
SELECT
  '60000000-0000-0000-0000-000000000001'::uuid,
  c.id,
  'interview',
  'I am excited to apply for the Senior React Developer position. With 5+ years of experience building modern React applications using TypeScript and Next.js, I believe I would be a great fit for your team. I have successfully delivered multiple production applications using the exact tech stack you mentioned.',
  92.5
FROM candidates c
JOIN profiles p ON p.id = c.profile_id
WHERE p.email = 'ana.rodriguez@medellin-spark.local'
ON CONFLICT (job_id, candidate_id) DO NOTHING;

-- Ana Rodríguez also applies to ML Engineer (lower fit - 45% match, in screening)
INSERT INTO applications (job_id, candidate_id, stage, cover_letter, fit_score)
SELECT
  '60000000-0000-0000-0000-000000000002'::uuid,
  c.id,
  'screening',
  'While my primary expertise is in frontend development, I have been learning Python and machine learning fundamentals through online courses. I am eager to transition into ML engineering and would love to grow with your team.',
  45.0
FROM candidates c
JOIN profiles p ON p.id = c.profile_id
WHERE p.email = 'ana.rodriguez@medellin-spark.local'
ON CONFLICT (job_id, candidate_id) DO NOTHING;

-- Diego Sánchez applies to ML Engineer (perfect fit - 95% match, in offer stage)
INSERT INTO applications (job_id, candidate_id, stage, cover_letter, fit_score, notes)
SELECT
  '60000000-0000-0000-0000-000000000002'::uuid,
  c.id,
  'offer',
  'I am very interested in the Machine Learning Engineer position. I have 8+ years of experience building production ML systems using Python, TensorFlow, and PyTorch. My recent work includes building recommendation engines and NLP models deployed on AWS. I would love to contribute my expertise to your AI initiatives.',
  95.0,
  'Excellent candidate - strong technical background, great cultural fit. Made offer on 2025-10-10.'
FROM candidates c
JOIN profiles p ON p.id = c.profile_id
WHERE p.email = 'diego.sanchez@medellin-spark.local'
ON CONFLICT (job_id, candidate_id) DO NOTHING;

-- Diego Sánchez applied to Product Designer but was rejected (not a fit)
INSERT INTO applications (job_id, candidate_id, stage, cover_letter, fit_score, notes)
SELECT
  '60000000-0000-0000-0000-000000000003'::uuid,
  c.id,
  'rejected',
  'I noticed your Product Designer position and while my background is primarily in engineering, I have always been passionate about design and user experience. I would love to explore this opportunity.',
  15.0,
  'Candidate has strong technical skills but no design portfolio or relevant UX/UI experience. Not a fit for this role.'
FROM candidates c
JOIN profiles p ON p.id = c.profile_id
WHERE p.email = 'diego.sanchez@medellin-spark.local'
ON CONFLICT (job_id, candidate_id) DO NOTHING;

-- ==============================================================================
-- 14. EVENT WAITLIST (Users waiting for sold-out events)
-- ==============================================================================

-- Startup Grind is getting full - María García joins waitlist (position 1)
INSERT INTO waitlist (event_id, profile_id, position, notified)
SELECT
  '70000000-0000-0000-0000-000000000001'::uuid,
  p.id,
  1,
  false
FROM profiles p
WHERE p.email = 'maria.garcia@medellin-spark.local'
ON CONFLICT (event_id, profile_id) DO NOTHING;

-- Startup Weekend waitlist - Sofía Martínez (position 1, already notified and registered)
INSERT INTO waitlist (event_id, profile_id, position, notified)
SELECT
  '70000000-0000-0000-0000-000000000003'::uuid,
  p.id,
  1,
  true
FROM profiles p
WHERE p.email = 'sofia.martinez@medellin-spark.local'
ON CONFLICT (event_id, profile_id) DO NOTHING;

-- Startup Weekend waitlist - Carlos López (position 2, not yet notified)
INSERT INTO waitlist (event_id, profile_id, position, notified)
SELECT
  '70000000-0000-0000-0000-000000000003'::uuid,
  p.id,
  2,
  false
FROM profiles p
WHERE p.email = 'carlos.lopez@medellin-spark.local'
ON CONFLICT (event_id, profile_id) DO NOTHING;

COMMIT;

-- Verify seeded data
SELECT 'Candidate Skills' as table_name, COUNT(*) as count FROM candidate_skills
UNION ALL SELECT 'Companies', COUNT(*) FROM companies
UNION ALL SELECT 'Venues', COUNT(*) FROM venues
UNION ALL SELECT 'Jobs', COUNT(*) FROM jobs
UNION ALL SELECT 'Job Skills', COUNT(*) FROM job_skills
UNION ALL SELECT 'Events', COUNT(*) FROM events
UNION ALL SELECT 'Event-Venue Links', COUNT(*) FROM event_venues
UNION ALL SELECT 'Tickets', COUNT(*) FROM tickets
UNION ALL SELECT 'Registrations', COUNT(*) FROM registrations
UNION ALL SELECT 'Sponsors', COUNT(*) FROM sponsors
UNION ALL SELECT 'Perks', COUNT(*) FROM perks
UNION ALL SELECT 'Perk Claims', COUNT(*) FROM perk_claims
UNION ALL SELECT 'Matches', COUNT(*) FROM matches
UNION ALL SELECT 'Saved Perks', COUNT(*) FROM saved_perks
UNION ALL SELECT 'Applications', COUNT(*) FROM applications
UNION ALL SELECT 'Waitlist', COUNT(*) FROM waitlist;
