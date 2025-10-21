#!/bin/bash

# Simple script to insert sample pitch deck data

PRESENTATION_ID="a1b2c3d4-e5f6-7890-abcd-ef1234567890"

echo "🚀 Creating sample pitch deck..."
echo "ID: $PRESENTATION_ID"

# Create via Supabase REST API (bypasses RLS with service key)
source .env

# Step 1: Create demo profile
echo ""
echo "Step 1: Creating demo profile..."
curl -X POST "https://dhesktsqhcxhqfjypulk.supabase.co/rest/v1/profiles" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: resolution=merge-duplicates" \
  -d '{
    "id": "00000000-0000-0000-0000-000000000000",
    "email": "demo@medellinai.com",
    "full_name": "Demo User"
  }' 2>&1 | grep -v "Total\|Dload\|--:--"

echo ""
echo "Step 2: Creating presentation..."
curl -X POST "https://dhesktsqhcxhqfjypulk.supabase.co/rest/v1/presentations" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "profile_id": "00000000-0000-0000-0000-000000000000",
    "title": "MedellinAI - AI-Powered Innovation Hub",
    "status": "completed",
    "theme": "mystique",
    "is_public": true,
    "content": {
      "slides": [
        {
          "id": 1,
          "type": "title",
          "title": "MedellinAI",
          "subtitle": "Building the Future of AI in Colombia"
        },
        {
          "id": 2,
          "type": "content",
          "title": "The Problem",
          "content": "Latin America lacks dedicated AI innovation hubs"
        },
        {
          "id": 3,
          "type": "content",
          "title": "Our Solution",
          "content": "MedellinAI connects founders, investors, and AI experts"
        },
        {
          "id": 4,
          "type": "content",
          "title": "Market Opportunity",
          "content": "Latin American AI market: $5B by 2027"
        },
        {
          "id": 5,
          "type": "content",
          "title": "Business Model",
          "content": "Multiple revenue streams for sustainable growth"
        },
        {
          "id": 6,
          "type": "content",
          "title": "Traction",
          "content": "500+ users, 50+ startups in 3 months"
        },
        {
          "id": 7,
          "type": "content",
          "title": "The Ask",
          "content": "Seeking $500K seed funding"
        },
        {
          "id": 8,
          "type": "closing",
          "title": "Join Us",
          "subtitle": "Building the future of AI in Latin America"
        }
      ]
    }
  }'

echo ""
echo ""
echo "✅ Done! Test the presentation at:"
echo "📺 Viewer: http://localhost:8080/presentations/$PRESENTATION_ID/view"
echo "✏️  Editor: http://localhost:8080/presentations/$PRESENTATION_ID/edit"
echo "📋 Outline: http://localhost:8080/presentations/$PRESENTATION_ID/outline"
echo "📊 Dashboard: http://localhost:8080/dashboard/pitch-decks"
