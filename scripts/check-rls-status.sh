#!/bin/bash
# Check RLS Status on Presentations Table

echo "🔍 Checking RLS Status on presentations table"
echo "=============================================="

# Use curl to query the Supabase database via REST API
source .env

echo ""
echo "Checking presentations table schema..."
curl -s "${VITE_SUPABASE_URL}/rest/v1/" \
  -H "apikey: ${VITE_SUPABASE_PUBLISHABLE_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_PUBLISHABLE_KEY}" \
  | grep -i presentations || echo "Cannot retrieve schema via REST API"

echo ""
echo "=============================================="
echo "To fully verify RLS, we need database admin access."
echo "Creating Node.js script to test RLS..."
