#!/bin/bash
# =============================================
# Security Verification Script
# =============================================

source /home/sk/medellin-spark/.env

echo "=========================================="
echo "🔒 SECURITY VERIFICATION CHECKLIST"
echo "=========================================="
echo ""

# Check 1: Migration history aligned
echo "✅ CHECK 1: Migration History Alignment"
echo "---------------------------------------"
supabase migration list --linked | tail -12
echo ""

# Check 2: RLS blocks unauthenticated access
echo "✅ CHECK 2: RLS Blocks Unauth Access (should return empty [] or 401)"
echo "---------------------------------------"
curl -s "$VITE_SUPABASE_URL/rest/v1/presentations?select=id&limit=1" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY" \
  -w "\nHTTP Status: %{http_code}\n"
echo ""

# Check 3: Templates can be viewed (public read allowed)
echo "✅ CHECK 3: Templates Publicly Viewable (should return 200)"
echo "---------------------------------------"
curl -s "$VITE_SUPABASE_URL/rest/v1/presentation_templates?select=id,name&limit=1" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY" \
  -w "\nHTTP Status: %{http_code}\n"
echo ""

# Check 4: Edge Function works
echo "✅ CHECK 4: Edge Function Chat Proxy (should return 200)"
echo "---------------------------------------"
curl -s "$VITE_SUPABASE_URL/functions/v1/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY" \
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hi"}],"max_tokens":20}' \
  -w "\nHTTP Status: %{http_code}\n" | head -5
echo ""

# Check 5: Verify RLS is enabled on all tables
echo "✅ CHECK 5: RLS Status on All Tables"
echo "---------------------------------------"
echo "Query: SELECT tablename, relrowsecurity FROM pg_tables JOIN pg_class ..."
echo "(Need to run via psql or Supabase dashboard)"
echo ""

echo "=========================================="
echo "📊 RESULTS SUMMARY"
echo "=========================================="
echo "✅ CHECK 1: Migration history should show all 9 migrations on both sides"
echo "✅ CHECK 2: Presentations should return [] (empty) or 401/403"
echo "✅ CHECK 3: Templates should return 200 with data"
echo "✅ CHECK 4: Chat should return 200 with AI response"
echo "✅ CHECK 5: All tables should show relrowsecurity = true"
echo ""
echo "🔐 If all checks pass: System is 100% PRODUCTION READY"
echo "=========================================="
