#!/bin/bash
# Verify RPC Functions in Supabase Database
# This script checks if the RPC functions are actually deployed

set -e

echo "🔍 Verifying RPC Functions in Supabase Database"
echo "================================================"

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Check if psql is available
if ! command -v psql &> /dev/null; then
  echo "❌ psql not found. Using alternative method..."
  echo ""
  echo "Running Node.js test instead:"
  node test-supabase.js
  exit 0
fi

# Check if we have the database URL
if [ -z "$SUPABASE_DB_URL_DIRECT" ]; then
  echo "❌ SUPABASE_DB_URL_DIRECT not set"
  echo "Using Node.js test instead:"
  node test-supabase.js
  exit 0
fi

echo "1. Checking if functions exist in database..."
psql "$SUPABASE_DB_URL_DIRECT" -c "
SELECT 
  p.proname as function_name,
  pg_catalog.pg_get_function_arguments(p.oid) as arguments
FROM pg_catalog.pg_proc p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname IN ('duplicate_presentation', 'soft_delete_presentation')
ORDER BY p.proname;
" 2>&1

echo ""
echo "2. Testing function via Supabase client..."
node test-supabase.js

echo ""
echo "================================================"
echo "Verification complete!"

