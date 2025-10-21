#!/bin/bash
# scripts/seed-auth.sh
# Purpose: Create auth users for local development via Supabase CLI
# Usage: ./scripts/seed-auth.sh
# Prerequisites: Supabase CLI installed and local instance running

set -e

echo "🔐 Creating auth users for local development..."
echo ""

# User 1: Startup Founder
echo "Creating user: sofia.martinez@medellin-spark.local"
supabase auth admin create-user \
  --email sofia.martinez@medellin-spark.local \
  --password password123 \
  --email-confirm \
  --user-metadata '{"full_name":"Sofía Martínez"}' \
  2>/dev/null || echo "⚠️  User already exists"

# User 2: Event Organizer
echo "Creating user: carlos.lopez@medellin-spark.local"
supabase auth admin create-user \
  --email carlos.lopez@medellin-spark.local \
  --password password123 \
  --email-confirm \
  --user-metadata '{"full_name":"Carlos López"}' \
  2>/dev/null || echo "⚠️  User already exists"

# User 3: Developer Candidate
echo "Creating user: ana.rodriguez@medellin-spark.local"
supabase auth admin create-user \
  --email ana.rodriguez@medellin-spark.local \
  --password password123 \
  --email-confirm \
  --user-metadata '{"full_name":"Ana Rodríguez"}' \
  2>/dev/null || echo "⚠️  User already exists"

# User 4: Multi-role (Startup + Candidate)
echo "Creating user: diego.sanchez@medellin-spark.local"
supabase auth admin create-user \
  --email diego.sanchez@medellin-spark.local \
  --password password123 \
  --email-confirm \
  --user-metadata '{"full_name":"Diego Sánchez"}' \
  2>/dev/null || echo "⚠️  User already exists"

# User 5: Regular User
echo "Creating user: maria.garcia@medellin-spark.local"
supabase auth admin create-user \
  --email maria.garcia@medellin-spark.local \
  --password password123 \
  --email-confirm \
  --user-metadata '{"full_name":"María García"}' \
  2>/dev/null || echo "⚠️  User already exists"

echo ""
echo "✅ Auth users created successfully"
echo ""
echo "🔑 Test Credentials:"
echo "   Email: sofia.martinez@medellin-spark.local"
echo "   Password: password123"
echo ""
echo "   Email: carlos.lopez@medellin-spark.local"
echo "   Password: password123"
echo ""
echo "   Email: ana.rodriguez@medellin-spark.local"
echo "   Password: password123"
echo ""
echo "   Email: diego.sanchez@medellin-spark.local"
echo "   Password: password123"
echo ""
echo "   Email: maria.garcia@medellin-spark.local"
echo "   Password: password123"
echo ""
echo "💡 Next steps:"
echo "   1. Run 'supabase db reset' to seed application data"
echo "   2. Visit http://localhost:54323 (Supabase Studio)"
echo "   3. Login with any of the test credentials above"
