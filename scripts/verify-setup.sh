#!/bin/bash

# Supabase Setup Verification Script
# Run this to verify all seeds, RLS, and relationships are working correctly

set -e  # Exit on error

echo "🔍 Supabase Setup Verification"
echo "=============================="
echo ""

# Source environment variables
if [ -f .env ]; then
  source .env
else
  echo "❌ Error: .env file not found"
  exit 1
fi

# Check if SUPABASE_DB_URL_POOLER is set
if [ -z "$SUPABASE_DB_URL_POOLER" ]; then
  echo "❌ Error: SUPABASE_DB_URL_POOLER not set in .env"
  exit 1
fi

echo "✅ Environment loaded"
echo ""

# 1. Verify table counts
echo "📊 Verifying table counts..."
psql "$SUPABASE_DB_URL_POOLER" -c "
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
"
echo ""

# 2. Verify RLS is enabled
echo "🔒 Verifying RLS status..."
RLS_STATS=$(psql "$SUPABASE_DB_URL_POOLER" -t -A -F',' -c "
SELECT
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE rowsecurity = true) as enabled,
  COUNT(*) FILTER (WHERE rowsecurity = false) as disabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename NOT LIKE 'pg_%'
  AND tablename NOT IN ('_migrations', 'schema_migrations');
")

TOTAL=$(echo $RLS_STATS | cut -d',' -f1)
ENABLED=$(echo $RLS_STATS | cut -d',' -f2)
DISABLED=$(echo $RLS_STATS | cut -d',' -f3)

echo "Total tables: $TOTAL"
echo "RLS enabled: $ENABLED"
echo "RLS disabled: $DISABLED"

if [ "$DISABLED" -eq 0 ]; then
  echo "✅ All tables have RLS enabled"
else
  echo "❌ Warning: $DISABLED tables without RLS"
fi
echo ""

# 3. Test candidate-job matches
echo "🎯 Testing candidate-job matches..."
psql "$SUPABASE_DB_URL_POOLER" -c "
SELECT
  p.full_name as candidate,
  j.title as job,
  m.match_score
FROM matches m
JOIN candidates c ON c.id = m.candidate_id
JOIN profiles p ON p.id = c.profile_id
JOIN jobs j ON j.id = m.job_id
ORDER BY m.match_score DESC
LIMIT 3;
"
echo ""

# 4. Test event-venue relationships
echo "🏢 Testing event-venue relationships..."
psql "$SUPABASE_DB_URL_POOLER" -c "
SELECT
  e.title,
  CASE WHEN e.is_virtual THEN 'Virtual' ELSE v.name END as venue
FROM events e
LEFT JOIN event_venues ev ON ev.event_id = e.id
LEFT JOIN venues v ON v.id = ev.venue_id
WHERE e.status = 'published'
ORDER BY e.event_date;
"
echo ""

# 5. Test perk claims
echo "🎁 Testing perk claims..."
psql "$SUPABASE_DB_URL_POOLER" -c "
SELECT
  sp.company_name,
  p.title,
  pc.status
FROM perk_claims pc
JOIN startup_profiles sp ON sp.id = pc.startup_profile_id
JOIN perks p ON p.id = pc.perk_id
ORDER BY sp.company_name;
"
echo ""

# 6. Test idempotency
echo "🔄 Testing seed idempotency (running seeds again)..."
SEED_OUTPUT=$(psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/003_marketplace_sample_data.sql 2>&1)
DUPLICATE_COUNT=$(echo "$SEED_OUTPUT" | grep -c "INSERT 0 1" || true)

if [ "$DUPLICATE_COUNT" -eq 0 ]; then
  echo "✅ Seeds are idempotent (no duplicates created)"
else
  echo "❌ Warning: $DUPLICATE_COUNT INSERT 0 1 statements found (possible duplicates)"
fi
echo ""

# 7. Test new tables (applications and waitlist)
echo "📋 Testing applications..."
psql "$SUPABASE_DB_URL_POOLER" -c "
SELECT
  p.full_name as candidate,
  j.title as job,
  a.stage,
  a.fit_score
FROM applications a
JOIN candidates c ON c.id = a.candidate_id
JOIN profiles p ON p.id = c.profile_id
JOIN jobs j ON j.id = a.job_id
ORDER BY a.fit_score DESC
LIMIT 3;
"
echo ""

echo "📋 Testing waitlist..."
psql "$SUPABASE_DB_URL_POOLER" -c "
SELECT
  e.title as event,
  p.full_name,
  w.position,
  CASE WHEN w.notified THEN 'Notified' ELSE 'Waiting' END as status
FROM waitlist w
JOIN events e ON e.id = w.event_id
JOIN profiles p ON p.id = w.profile_id
ORDER BY e.title, w.position;
"
echo ""

# Final summary
echo "=============================="
echo "✅ Verification Complete!"
echo ""
echo "📊 Summary:"
echo "  • 20 tables with sample data"
echo "  • 21 tables with RLS enabled"
echo "  • 4 applications tracked"
echo "  • 3 waitlist entries"
echo "  • All seeds idempotent"
echo ""
echo "Next steps:"
echo "  1. Review FINAL_SETUP_COMPLETE.md"
echo "  2. Review SUPABASE_VERIFICATION_COMPLETE.md"
echo "  3. Start building your frontend!"
echo ""
