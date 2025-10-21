#!/bin/bash
set -e  # Exit on any error

# =====================================================
# Pitch Deck AI - Migration Deployment Script
# =====================================================
# This script applies the corrected MVP migration using
# direct Postgres connection (port 5432) to bypass
# the Supabase pooler connection issues.
# =====================================================

echo "=================================================="
echo "Pitch Deck AI - Migration Deployment"
echo "=================================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# =====================================================
# STEP 1: Configuration
# =====================================================
PROJECT_REF="dhesktsqhcxhqfjypulk"
DB_HOST="db.${PROJECT_REF}.supabase.co"
DB_PORT="5432"
DB_NAME="postgres"
DB_USER="postgres"

echo -e "${BLUE}[1/7] Checking configuration...${NC}"
echo "Project Reference: $PROJECT_REF"
echo "Database Host: $DB_HOST"
echo "Database Port: $DB_PORT"
echo ""

# =====================================================
# STEP 2: Get Database Password
# =====================================================
echo -e "${YELLOW}[2/7] Database Password Required${NC}"
echo ""
echo "Please get your database password from:"
echo "  https://supabase.com/dashboard/project/$PROJECT_REF/settings/database"
echo ""
echo "Navigate to: Project Settings → Database → Database Password"
echo ""
read -sp "Enter your database password: " DB_PASSWORD
echo ""
echo ""

if [ -z "$DB_PASSWORD" ]; then
    echo -e "${RED}ERROR: Database password is required${NC}"
    exit 1
fi

# =====================================================
# STEP 3: Set Connection URL
# =====================================================
echo -e "${BLUE}[3/7] Setting up direct connection...${NC}"
export SUPABASE_DB_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME?sslmode=require"
echo "✓ Connection URL configured (using SSL on port 5432)"
echo ""

# =====================================================
# STEP 4: Test Connectivity
# =====================================================
echo -e "${BLUE}[4/7] Testing database connectivity...${NC}"
echo ""

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}ERROR: psql is not installed${NC}"
    echo "Install with: sudo apt-get install postgresql-client"
    exit 1
fi

# Test basic connectivity
echo "Testing connection to $DB_HOST:$DB_PORT..."
if psql "$SUPABASE_DB_URL" -c "SELECT now() as current_time;" 2>&1; then
    echo -e "${GREEN}✓ Database connection successful!${NC}"
    echo ""
else
    echo -e "${RED}ERROR: Cannot connect to database${NC}"
    echo ""
    echo "Troubleshooting steps:"
    echo "1. Verify password is correct (copy from Dashboard)"
    echo "2. Check IP allowlist: Dashboard → Database → Network Restrictions"
    echo "3. Verify database is awake (run query in Dashboard SQL Editor)"
    echo "4. Check VPN/firewall allows outbound port 5432"
    echo ""
    exit 1
fi

# =====================================================
# STEP 5: Link Supabase Project
# =====================================================
echo -e "${BLUE}[5/7] Linking Supabase project...${NC}"
if supabase link --project-ref "$PROJECT_REF" 2>&1; then
    echo -e "${GREEN}✓ Project linked successfully${NC}"
    echo ""
else
    echo -e "${YELLOW}⚠ Project may already be linked (continuing...)${NC}"
    echo ""
fi

# =====================================================
# STEP 6: Apply Migration
# =====================================================
echo -e "${BLUE}[6/7] Applying migration...${NC}"
echo ""
echo "This will apply the corrected migration that fixes:"
echo "  1. Slides relationship (1:1 → 1:N)"
echo "  2. RLS security (FORCE enabled)"
echo "  3. Parent sync trigger"
echo "  4. RLS policies (deck_id references)"
echo "  5. JSON aggregation function"
echo "  6. Efficient indexes"
echo ""

read -p "Continue with migration? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Migration cancelled by user"
    exit 0
fi

echo ""
echo "Pushing schema to remote database..."
if supabase db push --include-all --db-url "$SUPABASE_DB_URL" --debug 2>&1; then
    echo ""
    echo -e "${GREEN}✓ Migration applied successfully!${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}ERROR: Migration failed${NC}"
    echo ""
    echo "Alternative: Apply migration manually via Supabase Dashboard"
    echo "See MANUAL_MIGRATION_GUIDE.md for instructions"
    exit 1
fi

# =====================================================
# STEP 7: Verification
# =====================================================
echo -e "${BLUE}[7/7] Running verification queries...${NC}"
echo ""

echo "Checking RLS is enabled..."
psql "$SUPABASE_DB_URL" -c "
SELECT tablename, rowsecurity, forcerowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('pitch_decks', 'pitch_deck_slides');
" 2>&1

echo ""
echo "Checking deck_id column exists..."
psql "$SUPABASE_DB_URL" -c "
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'pitch_deck_slides'
  AND column_name IN ('deck_id', 'slide_no')
ORDER BY column_name;
" 2>&1

echo ""
echo "Checking composite primary key..."
psql "$SUPABASE_DB_URL" -c "
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'pitch_deck_slides'
  AND constraint_type = 'PRIMARY KEY';
" 2>&1

echo ""
echo "Checking foreign key constraint..."
psql "$SUPABASE_DB_URL" -c "
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'pitch_deck_slides';
" 2>&1

echo ""
echo "Checking RLS policies..."
psql "$SUPABASE_DB_URL" -c "
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'pitch_deck_slides'
ORDER BY policyname;
" 2>&1

echo ""
echo "Testing helper function..."
psql "$SUPABASE_DB_URL" -c "
SELECT get_pitch_deck_with_slides('00000000-0000-0000-0000-000000000000'::uuid) IS NULL as function_works;
" 2>&1

echo ""
echo "=================================================="
echo -e "${GREEN}Migration Deployment Complete!${NC}"
echo "=================================================="
echo ""
echo "Next Steps:"
echo "1. Deploy edge function: ./scripts/deploy-edge-function.sh"
echo "2. Regenerate types: supabase gen types typescript --remote > src/integrations/supabase/types.ts"
echo "3. Test pitch deck creation via frontend"
echo ""
echo "Documentation:"
echo "  - DEPLOYMENT_STATUS.md - Complete deployment checklist"
echo "  - CRITICAL_FIXES_APPLIED_V2.md - Details on all fixes"
echo ""
