-- Create seed auth users directly via SQL
-- This bypasses the Supabase JS client issues and works with the trigger

BEGIN;

-- User 1: Sofía Martínez
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated', 'authenticated',
  'sofia.martinez@medellin-spark.local',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Sofía Martínez"}'::jsonb,
  now(), now()
);

-- User 2: Carlos López
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated', 'authenticated',
  'carlos.lopez@medellin-spark.local',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Carlos López"}'::jsonb,
  now(), now()
);

-- User 3: Ana Rodríguez
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated', 'authenticated',
  'ana.rodriguez@medellin-spark.local',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Ana Rodríguez"}'::jsonb,
  now(), now()
);

-- User 4: Diego Sánchez
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated', 'authenticated',
  'diego.sanchez@medellin-spark.local',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Diego Sánchez"}'::jsonb,
  now(), now()
);

-- User 5: María García
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated', 'authenticated',
  'maria.garcia@medellin-spark.local',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"María García"}'::jsonb,
  now(), now()
);

COMMIT;

-- Verify users and auto-created profiles
SELECT
  u.id as user_id,
  u.email,
  u.email_confirmed_at IS NOT NULL as confirmed,
  p.id as profile_id,
  p.full_name
FROM auth.users u
LEFT JOIN profiles p ON p.user_id = u.id
WHERE u.email LIKE '%@medellin-spark.local'
ORDER BY u.created_at;
