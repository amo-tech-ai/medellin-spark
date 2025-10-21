-- =============================================
-- SAMPLE PRESENTATIONS SEED DATA
-- =============================================
-- Creates realistic sample presentations for testing
-- Uses existing profiles and templates
-- Safe to run multiple times (will skip if data exists)
-- =============================================

-- Note: Using existing profile IDs from database
-- b67c1712-a7dd-49fe-bab1-dd5cead12d3e - Test Detective
-- d7a09e7c-c350-48e3-ba9c-b64aadbb0a1d - Sofía Martínez
-- 90aa02af-4e36-4dcf-90d6-bf0be94a3304 - Carlos López
-- 65d6380e-a1b0-4f01-b3dc-0ff5ba5922ec - Ana Rodríguez
-- ae31d2d4-05b8-4111-8ead-e89640091b89 - Diego Sánchez

-- Get template IDs (for reference)
-- ea7a1f39-cc18-4d4f-a8df-94bd68691b33 - Seed Stage Investor Pitch
-- 62f88ee5-caf8-4999-b47b-550a930ccbea - Series A Pitch Deck
-- 93facc0d-7d84-438b-97b8-e7532bc6b808 - Product Launch Deck

-- =============================================
-- PRESENTATION 1: TechFlow AI - Completed Pitch Deck
-- =============================================

INSERT INTO presentations (
  id,
  profile_id,
  title,
  description,
  content,
  theme,
  image_source,
  presentation_style,
  language,
  outline,
  thumbnail_url,
  template_id,
  status,
  slide_count,
  category,
  view_count,
  is_public,
  created_at,
  updated_at,
  last_edited_at
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'd7a09e7c-c350-48e3-ba9c-b64aadbb0a1d', -- Sofía Martínez
  'TechFlow AI - Revolutionizing Customer Support',
  'AI-powered customer support platform that reduces response time by 80%',
  '{
    "slides": [
      {
        "id": "slide-1",
        "type": "title",
        "title": "TechFlow AI",
        "subtitle": "Revolutionizing Customer Support with AI",
        "layout": "center"
      },
      {
        "id": "slide-2",
        "type": "problem",
        "title": "The Problem",
        "content": "Companies spend $1.3 trillion annually on customer service, with 60% of customers waiting over 5 minutes for support.",
        "bullets": [
          "Long wait times frustrate customers",
          "High support costs drain budgets",
          "Inconsistent service quality",
          "24/7 support is expensive"
        ]
      },
      {
        "id": "slide-3",
        "type": "solution",
        "title": "Our Solution",
        "content": "AI-powered platform that provides instant, accurate support 24/7",
        "bullets": [
          "Instant responses to common queries",
          "Natural language understanding",
          "Seamless human handoff when needed",
          "80% reduction in response time"
        ]
      },
      {
        "id": "slide-4",
        "type": "market",
        "title": "Market Opportunity",
        "content": "Global customer service market: $400B by 2025",
        "stats": {
          "tam": "$400B",
          "sam": "$50B",
          "som": "$5B"
        }
      },
      {
        "id": "slide-5",
        "type": "traction",
        "title": "Traction",
        "content": "Growing fast with strong customer retention",
        "metrics": {
          "users": "10,000+",
          "mrr": "$50K",
          "growth": "30% MoM"
        }
      }
    ]
  }'::jsonb,
  'ocean',
  'ai',
  'professional',
  'en-US',
  ARRAY['Title Slide', 'Problem', 'Solution', 'Market Opportunity', 'Traction', 'Team', 'Ask'],
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop',
  'ea7a1f39-cc18-4d4f-a8df-94bd68691b33', -- Seed Stage template
  'complete',
  7,
  'pitch-deck',
  142,
  true,
  NOW() - INTERVAL '15 days',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PRESENTATION 2: EcoMart - Draft in Progress
-- =============================================

INSERT INTO presentations (
  id,
  profile_id,
  title,
  description,
  content,
  theme,
  image_source,
  presentation_style,
  language,
  outline,
  template_id,
  status,
  slide_count,
  category,
  view_count,
  is_public,
  created_at,
  updated_at,
  last_edited_at
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '90aa02af-4e36-4dcf-90d6-bf0be94a3304', -- Carlos López
  'EcoMart - Sustainable E-Commerce Platform',
  'Connecting consumers with eco-friendly products',
  '{
    "slides": [
      {
        "id": "slide-1",
        "type": "title",
        "title": "EcoMart",
        "subtitle": "Your Marketplace for Sustainable Living"
      },
      {
        "id": "slide-2",
        "type": "problem",
        "title": "The Problem",
        "content": "Consumers want to buy sustainable products but struggle to find trusted options"
      }
    ]
  }'::jsonb,
  'forest',
  'ai',
  'modern',
  'en-US',
  ARRAY['Title', 'Problem', 'Solution', 'Business Model'],
  NULL, -- No template used
  'draft',
  2,
  'pitch-deck',
  5,
  false,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '1 hour',
  NOW() - INTERVAL '1 hour'
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PRESENTATION 3: HealthTrack Pro - Completed Product Launch
-- =============================================

INSERT INTO presentations (
  id,
  profile_id,
  title,
  description,
  content,
  theme,
  image_source,
  presentation_style,
  language,
  outline,
  thumbnail_url,
  template_id,
  status,
  slide_count,
  category,
  view_count,
  share_link,
  is_public,
  created_at,
  updated_at,
  last_edited_at,
  last_presented_at
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  '65d6380e-a1b0-4f01-b3dc-0ff5ba5922ec', -- Ana Rodríguez
  'HealthTrack Pro - Launch Announcement',
  'Revolutionary health tracking app with AI insights',
  '{
    "slides": [
      {
        "id": "slide-1",
        "type": "title",
        "title": "Introducing HealthTrack Pro",
        "subtitle": "Your Personal Health Companion"
      },
      {
        "id": "slide-2",
        "type": "features",
        "title": "Key Features",
        "bullets": [
          "AI-powered health insights",
          "Integration with 50+ devices",
          "Personalized recommendations",
          "HIPAA compliant security"
        ]
      },
      {
        "id": "slide-3",
        "type": "demo",
        "title": "See It In Action",
        "content": "Live demo of core features"
      },
      {
        "id": "slide-4",
        "type": "pricing",
        "title": "Pricing",
        "tiers": {
          "free": "Basic tracking",
          "pro": "$9.99/mo - Advanced insights",
          "family": "$19.99/mo - Up to 5 users"
        }
      },
      {
        "id": "slide-5",
        "type": "cta",
        "title": "Get Started Today",
        "content": "Download now and get 30 days free!"
      }
    ]
  }'::jsonb,
  'aurora',
  'ai',
  'vibrant',
  'en-US',
  ARRAY['Introduction', 'Features', 'Demo', 'Pricing', 'Call to Action'],
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=225&fit=crop',
  '93facc0d-7d84-438b-97b8-e7532bc6b808', -- Product Launch template
  'complete',
  5,
  'product-launch',
  287,
  'healthtrack-pro-launch-2024',
  true,
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '15 days'
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PRESENTATION 4: Series A Fundraising - Generating
-- =============================================

INSERT INTO presentations (
  id,
  profile_id,
  title,
  description,
  content,
  theme,
  image_source,
  presentation_style,
  language,
  outline,
  template_id,
  status,
  slide_count,
  category,
  view_count,
  is_public,
  created_at,
  updated_at,
  last_edited_at
) VALUES (
  '44444444-4444-4444-4444-444444444444',
  'd7a09e7c-c350-48e3-ba9c-b64aadbb0a1d', -- Sofía Martínez
  'TechFlow AI - Series A Pitch',
  'Raising $5M to scale our AI platform',
  '{}'::jsonb,
  'corporate',
  'ai',
  'professional',
  'en-US',
  ARRAY['Opening', 'Traction', 'Market', 'Team', 'Financials', 'Ask'],
  '62f88ee5-caf8-4999-b47b-550a930ccbea', -- Series A template
  'generating',
  0,
  'investor-deck',
  0,
  false,
  NOW() - INTERVAL '1 hour',
  NOW() - INTERVAL '5 minutes',
  NOW() - INTERVAL '5 minutes'
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PRESENTATION 5: Sales Deck - Completed
-- =============================================

INSERT INTO presentations (
  id,
  profile_id,
  title,
  description,
  content,
  theme,
  image_source,
  presentation_style,
  language,
  outline,
  thumbnail_url,
  status,
  slide_count,
  category,
  view_count,
  share_link,
  is_public,
  created_at,
  updated_at,
  last_edited_at,
  last_presented_at
) VALUES (
  '55555555-5555-5555-5555-555555555555',
  'ae31d2d4-05b8-4111-8ead-e89640091b89', -- Diego Sánchez
  'Enterprise SaaS Solution - Sales Deck',
  'Converting Fortune 500 companies with proven ROI',
  '{
    "slides": [
      {
        "id": "slide-1",
        "type": "title",
        "title": "Transform Your Business",
        "subtitle": "Enterprise-Grade SaaS Solution"
      },
      {
        "id": "slide-2",
        "type": "pain-points",
        "title": "Your Challenges",
        "bullets": [
          "Legacy systems slowing you down?",
          "High operational costs?",
          "Scaling challenges?",
          "Security concerns?"
        ]
      },
      {
        "id": "slide-3",
        "type": "solution",
        "title": "Our Solution",
        "content": "Cloud-native platform that reduces costs by 40% and increases productivity by 60%"
      },
      {
        "id": "slide-4",
        "type": "case-study",
        "title": "Case Study: Fortune 500 Retailer",
        "stats": {
          "saved": "$2.5M annually",
          "productivity": "60% increase",
          "deployment": "3 months"
        }
      },
      {
        "id": "slide-5",
        "type": "roi",
        "title": "ROI Calculator",
        "content": "See your potential savings and payback period"
      },
      {
        "id": "slide-6",
        "type": "pricing",
        "title": "Enterprise Pricing",
        "content": "Custom pricing based on your needs"
      },
      {
        "id": "slide-7",
        "type": "next-steps",
        "title": "Next Steps",
        "bullets": [
          "Schedule a demo",
          "Free POC for 30 days",
          "Implementation in 90 days",
          "Dedicated support team"
        ]
      }
    ]
  }'::jsonb,
  'professional',
  'stock',
  'corporate',
  'en-US',
  ARRAY['Opening', 'Challenges', 'Solution', 'Case Study', 'ROI', 'Pricing', 'Next Steps'],
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop',
  'complete',
  7,
  'sales-deck',
  95,
  'enterprise-saas-sales-2024',
  true,
  NOW() - INTERVAL '20 days',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '8 days'
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PRESENTATION 6: Deleted Presentation (Soft Delete)
-- =============================================

INSERT INTO presentations (
  id,
  profile_id,
  title,
  description,
  content,
  theme,
  status,
  slide_count,
  category,
  view_count,
  is_public,
  deleted_at,
  created_at,
  updated_at,
  last_edited_at
) VALUES (
  '66666666-6666-6666-6666-666666666666',
  '90aa02af-4e36-4dcf-90d6-bf0be94a3304', -- Carlos López
  'Old Startup Idea (Deleted)',
  'This presentation was deleted',
  '{}'::jsonb,
  'default',
  'draft',
  0,
  'general',
  2,
  false,
  NOW() - INTERVAL '5 days', -- Soft deleted 5 days ago
  NOW() - INTERVAL '60 days',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days'
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PRESENTATION 7: Simple General Presentation
-- =============================================

INSERT INTO presentations (
  id,
  profile_id,
  title,
  description,
  content,
  theme,
  image_source,
  status,
  slide_count,
  category,
  view_count,
  is_public,
  created_at,
  updated_at,
  last_edited_at
) VALUES (
  '77777777-7777-7777-7777-777777777777',
  'b67c1712-a7dd-49fe-bab1-dd5cead12d3e', -- Test Detective
  'Team Meeting - Q1 Review',
  'Quarterly review and planning session',
  '{
    "slides": [
      {
        "id": "slide-1",
        "type": "title",
        "title": "Q1 2024 Review"
      },
      {
        "id": "slide-2",
        "type": "metrics",
        "title": "Key Metrics",
        "content": "Summary of Q1 performance"
      },
      {
        "id": "slide-3",
        "type": "planning",
        "title": "Q2 Plans",
        "content": "Goals and initiatives for next quarter"
      }
    ]
  }'::jsonb,
  'minimal',
  'none',
  'complete',
  3,
  'general',
  12,
  false,
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '7 days'
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PRESENTATION 8: Shared Public Presentation
-- =============================================

INSERT INTO presentations (
  id,
  profile_id,
  title,
  description,
  content,
  theme,
  image_source,
  presentation_style,
  language,
  outline,
  thumbnail_url,
  status,
  slide_count,
  category,
  view_count,
  share_link,
  is_public,
  created_at,
  updated_at,
  last_edited_at,
  last_presented_at
) VALUES (
  '88888888-8888-8888-8888-888888888888',
  '65d6380e-a1b0-4f01-b3dc-0ff5ba5922ec', -- Ana Rodríguez
  'Medellin Startup Ecosystem 2024',
  'Overview of the thriving startup scene in Medellin',
  '{
    "slides": [
      {
        "id": "slide-1",
        "type": "title",
        "title": "Medellin Startup Ecosystem 2024"
      },
      {
        "id": "slide-2",
        "type": "stats",
        "title": "By The Numbers",
        "stats": {
          "startups": "500+ active startups",
          "funding": "$200M raised in 2023",
          "unicorns": "2 unicorns"
        }
      },
      {
        "id": "slide-3",
        "type": "sectors",
        "title": "Hot Sectors",
        "bullets": [
          "Fintech",
          "HealthTech",
          "EdTech",
          "AgriTech"
        ]
      },
      {
        "id": "slide-4",
        "type": "resources",
        "title": "Ecosystem Resources",
        "content": "Accelerators, VCs, coworking spaces, and events"
      }
    ]
  }'::jsonb,
  'sunset',
  'unsplash',
  'modern',
  'en-US',
  ARRAY['Overview', 'Statistics', 'Sectors', 'Resources', 'Future'],
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
  'shared',
  5,
  'general',
  456,
  'medellin-ecosystem-2024',
  true,
  NOW() - INTERVAL '45 days',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '35 days'
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- SUMMARY
-- =============================================

COMMENT ON TABLE presentations IS 'Sample presentations covering various use cases: pitch decks, product launches, sales, general presentations, and different statuses (draft, generating, complete, shared, deleted)';

-- Print summary
DO $$
DECLARE
  total_count INT;
  active_count INT;
  deleted_count INT;
BEGIN
  SELECT COUNT(*) INTO total_count FROM presentations;
  SELECT COUNT(*) INTO active_count FROM presentations WHERE deleted_at IS NULL;
  SELECT COUNT(*) INTO deleted_count FROM presentations WHERE deleted_at IS NOT NULL;

  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'PRESENTATIONS SEED COMPLETE';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Total presentations: %', total_count;
  RAISE NOTICE 'Active presentations: %', active_count;
  RAISE NOTICE 'Deleted presentations: %', deleted_count;
  RAISE NOTICE '';
  RAISE NOTICE 'Sample presentations created:';
  RAISE NOTICE '1. TechFlow AI (pitch-deck, complete, public)';
  RAISE NOTICE '2. EcoMart (pitch-deck, draft)';
  RAISE NOTICE '3. HealthTrack Pro (product-launch, complete, shared)';
  RAISE NOTICE '4. TechFlow Series A (investor-deck, generating)';
  RAISE NOTICE '5. Enterprise SaaS (sales-deck, complete, shared)';
  RAISE NOTICE '6. Old Startup Idea (deleted)';
  RAISE NOTICE '7. Team Meeting (general, complete)';
  RAISE NOTICE '8. Medellin Ecosystem (general, shared, public)';
  RAISE NOTICE '========================================';
END $$;
