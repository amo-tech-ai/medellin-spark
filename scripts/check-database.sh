#!/bin/bash

# Check Database Schema
# This script checks what tables exist in the database

set -e

# Load environment variables
source .env

echo "=============================================="
echo "Checking Database Schema"
echo "=============================================="

ANON_KEY="$VITE_SUPABASE_ANON_KEY"
SERVICE_KEY="$SUPABASE_SERVICE_ROLE_KEY"
URL="https://dhesktsqhcxhqfjypulk.supabase.co"

echo ""
echo "1. Checking pitch_decks table..."
curl -s "$URL/rest/v1/pitch_decks?select=count" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  | jq '.' || echo "❌ Table does not exist or error occurred"

echo ""
echo "2. Checking pitch_deck_slides table..."
curl -s "$URL/rest/v1/pitch_deck_slides?select=count" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  | jq '.' || echo "❌ Table does not exist or error occurred"

echo ""
echo "3. Checking wizard_sessions table..."
curl -s "$URL/rest/v1/wizard_sessions?select=count" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  | jq '.' || echo "❌ Table does not exist or error occurred"

echo ""
echo "=============================================="
echo "Database Check Complete"
echo "=============================================="
