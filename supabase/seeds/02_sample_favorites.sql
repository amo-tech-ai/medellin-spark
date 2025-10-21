-- =============================================
-- SAMPLE FAVORITE_PRESENTATIONS SEED DATA
-- =============================================
-- Creates realistic favorite relationships
-- Shows users favoriting each other's public presentations
-- Safe to run multiple times (will skip on conflict)
-- =============================================

-- Profile IDs (for reference):
-- b67c1712-a7dd-49fe-bab1-dd5cead12d3e - Test Detective
-- d7a09e7c-c350-48e3-ba9c-b64aadbb0a1d - Sofía Martínez
-- 90aa02af-4e36-4dcf-90d6-bf0be94a3304 - Carlos López
-- 65d6380e-a1b0-4f01-b3dc-0ff5ba5922ec - Ana Rodríguez
-- ae31d2d4-05b8-4111-8ead-e89640091b89 - Diego Sánchez

-- Presentation IDs:
-- 11111111-1111-1111-1111-111111111111 - TechFlow AI (Sofía)
-- 22222222-2222-2222-2222-222222222222 - EcoMart (Carlos)
-- 33333333-3333-3333-3333-333333333333 - HealthTrack Pro (Ana)
-- 44444444-4444-4444-4444-444444444444 - Series A (Sofía)
-- 55555555-5555-5555-5555-555555555555 - Sales Deck (Diego)
-- 77777777-7777-7777-7777-777777777777 - Team Meeting (Test Detective)
-- 88888888-8888-8888-8888-888888888888 - Medellin Ecosystem (Ana)

-- =============================================
-- Batch Insert All Favorites
-- =============================================

INSERT INTO favorite_presentations (profile_id, presentation_id, created_at)
VALUES
-- Carlos López favorites
('90aa02af-4e36-4dcf-90d6-bf0be94a3304', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '10 days'),
('90aa02af-4e36-4dcf-90d6-bf0be94a3304', '33333333-3333-3333-3333-333333333333', NOW() - INTERVAL '8 days'),
('90aa02af-4e36-4dcf-90d6-bf0be94a3304', '88888888-8888-8888-8888-888888888888', NOW() - INTERVAL '20 days'),

-- Sofía Martínez favorites
('d7a09e7c-c350-48e3-ba9c-b64aadbb0a1d', '33333333-3333-3333-3333-333333333333', NOW() - INTERVAL '12 days'),
('d7a09e7c-c350-48e3-ba9c-b64aadbb0a1d', '55555555-5555-5555-5555-555555555555', NOW() - INTERVAL '6 days'),
('d7a09e7c-c350-48e3-ba9c-b64aadbb0a1d', '88888888-8888-8888-8888-888888888888', NOW() - INTERVAL '25 days'),

-- Ana Rodríguez favorites
('65d6380e-a1b0-4f01-b3dc-0ff5ba5922ec', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '14 days'),
('65d6380e-a1b0-4f01-b3dc-0ff5ba5922ec', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '2 days'),
('65d6380e-a1b0-4f01-b3dc-0ff5ba5922ec', '55555555-5555-5555-5555-555555555555', NOW() - INTERVAL '7 days'),

-- Diego Sánchez favorites
('ae31d2d4-05b8-4111-8ead-e89640091b89', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '11 days'),
('ae31d2d4-05b8-4111-8ead-e89640091b89', '33333333-3333-3333-3333-333333333333', NOW() - INTERVAL '15 days'),
('ae31d2d4-05b8-4111-8ead-e89640091b89', '88888888-8888-8888-8888-888888888888', NOW() - INTERVAL '18 days'),

-- Test Detective favorites (power user)
('b67c1712-a7dd-49fe-bab1-dd5cead12d3e', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '13 days'),
('b67c1712-a7dd-49fe-bab1-dd5cead12d3e', '33333333-3333-3333-3333-333333333333', NOW() - INTERVAL '9 days'),
('b67c1712-a7dd-49fe-bab1-dd5cead12d3e', '55555555-5555-5555-5555-555555555555', NOW() - INTERVAL '4 days'),
('b67c1712-a7dd-49fe-bab1-dd5cead12d3e', '88888888-8888-8888-8888-888888888888', NOW() - INTERVAL '22 days')

ON CONFLICT (profile_id, presentation_id) DO NOTHING;

-- =============================================
-- SUMMARY & STATS
-- =============================================

COMMENT ON TABLE favorite_presentations IS 'Sample favorite relationships showing users favoriting popular and relevant presentations';

-- Print summary with statistics
DO $$
DECLARE
  total_favorites INT;
  presentations_with_favorites INT;
  most_favorited_title TEXT;
  most_favorited_count INT;
  most_active_user TEXT;
  most_active_count INT;
BEGIN
  -- Total favorites
  SELECT COUNT(*) INTO total_favorites FROM favorite_presentations;

  -- Unique presentations with favorites
  SELECT COUNT(DISTINCT presentation_id) INTO presentations_with_favorites
  FROM favorite_presentations;

  -- Most favorited presentation
  SELECT p.title, COUNT(*) INTO most_favorited_title, most_favorited_count
  FROM favorite_presentations fp
  JOIN presentations p ON fp.presentation_id = p.id
  GROUP BY p.id, p.title
  ORDER BY COUNT(*) DESC
  LIMIT 1;

  -- Most active favoriter
  SELECT prof.full_name, COUNT(*) INTO most_active_user, most_active_count
  FROM favorite_presentations fp
  JOIN profiles prof ON fp.profile_id = prof.id
  GROUP BY prof.id, prof.full_name
  ORDER BY COUNT(*) DESC
  LIMIT 1;

  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'FAVORITES SEED COMPLETE';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Total favorites: %', total_favorites;
  RAISE NOTICE 'Presentations with favorites: %', presentations_with_favorites;
  RAISE NOTICE '';
  RAISE NOTICE 'Most favorited presentation:';
  RAISE NOTICE '  "%"', most_favorited_title;
  RAISE NOTICE '  % favorites', most_favorited_count;
  RAISE NOTICE '';
  RAISE NOTICE 'Most active user:';
  RAISE NOTICE '  %', most_active_user;
  RAISE NOTICE '  % favorites', most_active_count;
  RAISE NOTICE '';
  RAISE NOTICE 'Favorite relationships:';
  RAISE NOTICE '  - TechFlow AI: 4 favorites';
  RAISE NOTICE '  - HealthTrack Pro: 4 favorites';
  RAISE NOTICE '  - Medellin Ecosystem: 4 favorites';
  RAISE NOTICE '  - Sales Deck: 3 favorites';
  RAISE NOTICE '  - EcoMart: 1 favorite';
  RAISE NOTICE '========================================';
END $$;
