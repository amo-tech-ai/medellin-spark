#!/bin/bash

# Verify Migration Script
# Runs the 6 verification queries to confirm migration success

set -e

# Load environment variables
source .env

SERVICE_KEY="$SUPABASE_SERVICE_ROLE_KEY"
URL="https://dhesktsqhcxhqfjypulk.supabase.co"

echo "=============================================="
echo "VERIFYING MIGRATION SUCCESS"
echo "=============================================="

# Query 1: Check RLS enabled
echo ""
echo "[1/6] Checking RLS is enabled..."
curl -s "$URL/rest/v1/rpc/exec_sql" \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "SELECT tablename, rowsecurity, forcerowsecurity FROM pg_tables WHERE schemaname = '\''public'\'' AND tablename IN ('\''pitch_decks'\'', '\''pitch_deck_slides'\'');"
  }' | jq '.'

# Query 2: Check columns exist
echo ""
echo "[2/6] Checking deck_id and slide_no columns..."
curl -s "$URL/rest/v1/rpc/exec_sql" \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = '\''pitch_deck_slides'\'' AND column_name IN ('\''deck_id'\'', '\''slide_no'\'') ORDER BY column_name;"
  }' | jq '.'

# Query 3: Check composite primary key
echo ""
echo "[3/6] Checking composite primary key..."
curl -s "$URL/rest/v1/rpc/exec_sql" \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "SELECT constraint_name, constraint_type FROM information_schema.table_constraints WHERE table_name = '\''pitch_deck_slides'\'' AND constraint_type = '\''PRIMARY KEY'\'';"
  }' | jq '.'

# Query 4: Check foreign key
echo ""
echo "[4/6] Checking foreign key constraint..."
curl -s "$URL/rest/v1/rpc/exec_sql" \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "SELECT tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name FROM information_schema.table_constraints AS tc JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name WHERE tc.constraint_type = '\''FOREIGN KEY'\'' AND tc.table_name = '\''pitch_deck_slides'\'';"
  }' | jq '.'

# Query 5: Check RLS policies
echo ""
echo "[5/6] Checking RLS policies..."
curl -s "$URL/rest/v1/rpc/exec_sql" \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "SELECT policyname, cmd FROM pg_policies WHERE tablename = '\''pitch_deck_slides'\'' ORDER BY policyname;"
  }' | jq '.'

# Query 6: Test helper function
echo ""
echo "[6/6] Testing helper function..."
curl -s "$URL/rest/v1/rpc/exec_sql" \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "SELECT get_pitch_deck_with_slides('\''00000000-0000-0000-0000-000000000000'\''::uuid) IS NULL as function_works;"
  }' | jq '.'

echo ""
echo "=============================================="
echo "VERIFICATION COMPLETE"
echo "=============================================="
