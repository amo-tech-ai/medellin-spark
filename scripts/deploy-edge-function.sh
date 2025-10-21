#!/bin/bash
set -e  # Exit on any error

# =====================================================
# Pitch Deck AI - Edge Function Deployment Script
# =====================================================
# This script deploys the OpenAI-powered pitch deck
# generation edge function to Supabase.
# =====================================================

echo "=================================================="
echo "Pitch Deck AI - Edge Function Deployment"
echo "=================================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_REF="dhesktsqhcxhqfjypulk"

# =====================================================
# STEP 1: Check Prerequisites
# =====================================================
echo -e "${BLUE}[1/5] Checking prerequisites...${NC}"

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}ERROR: Supabase CLI not installed${NC}"
    echo "Install with: curl -fsSL https://cli.supabase.com/install/linux | sh"
    exit 1
fi

# Check if project is linked
if ! supabase projects list | grep -q "$PROJECT_REF"; then
    echo -e "${RED}ERROR: Project not linked${NC}"
    echo "Run: supabase link --project-ref $PROJECT_REF"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites met${NC}"
echo ""

# =====================================================
# STEP 2: Get OpenAI API Key
# =====================================================
echo -e "${BLUE}[2/5] OpenAI API Key Required${NC}"
echo ""
echo "The edge function uses OpenAI GPT-4 to generate pitch decks."
echo "You need an OpenAI API key from: https://platform.openai.com/api-keys"
echo ""
read -sp "Enter your OpenAI API key: " OPENAI_API_KEY
echo ""
echo ""

if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${RED}ERROR: OpenAI API key is required${NC}"
    exit 1
fi

# =====================================================
# STEP 3: Set Secret
# =====================================================
echo -e "${BLUE}[3/5] Setting OpenAI API key as secret...${NC}"
echo ""

if echo "$OPENAI_API_KEY" | supabase secrets set --project-ref "$PROJECT_REF" OPENAI_API_KEY 2>&1; then
    echo -e "${GREEN}✓ Secret set successfully${NC}"
    echo ""
else
    echo -e "${RED}ERROR: Failed to set secret${NC}"
    exit 1
fi

# =====================================================
# STEP 4: Deploy Function
# =====================================================
echo -e "${BLUE}[4/5] Deploying edge function...${NC}"
echo ""
echo "Deploying: generate-pitch-deck"
echo ""

if supabase functions deploy generate-pitch-deck --project-ref "$PROJECT_REF" 2>&1; then
    echo ""
    echo -e "${GREEN}✓ Function deployed successfully!${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}ERROR: Function deployment failed${NC}"
    exit 1
fi

# =====================================================
# STEP 5: Get Function URL
# =====================================================
echo -e "${BLUE}[5/5] Getting function URL...${NC}"
echo ""

FUNCTION_URL="https://${PROJECT_REF}.supabase.co/functions/v1/generate-pitch-deck"
echo "Function URL: $FUNCTION_URL"
echo ""

# Get anon key from environment
if [ -f .env ]; then
    ANON_KEY=$(grep VITE_SUPABASE_PUBLISHABLE_KEY .env | cut -d '=' -f2 | tr -d '"' | tr -d "'" | xargs)
fi

if [ -z "$ANON_KEY" ]; then
    echo -e "${YELLOW}⚠ Anon key not found in .env${NC}"
    echo "Get it from: https://supabase.com/dashboard/project/$PROJECT_REF/settings/api"
    echo ""
else
    echo "=================================================="
    echo "Test Command:"
    echo "=================================================="
    echo ""
    cat << EOF
curl -i --location --request POST \\
  '$FUNCTION_URL' \\
  --header 'Authorization: Bearer $ANON_KEY' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "prompt": "Generate a pitch deck for a FinTech startup that helps people save money automatically",
    "profile_id": "test-uuid-replace-with-real-user-id"
  }'
EOF
    echo ""
    echo ""
fi

echo "=================================================="
echo -e "${GREEN}Edge Function Deployment Complete!${NC}"
echo "=================================================="
echo ""
echo "Next Steps:"
echo "1. Test the function using the curl command above"
echo "2. Regenerate types: supabase gen types typescript --remote > src/integrations/supabase/types.ts"
echo "3. Connect frontend wizard to call this function"
echo "4. Test end-to-end pitch deck creation"
echo ""
echo "View logs with:"
echo "  supabase functions logs generate-pitch-deck --project-ref $PROJECT_REF"
echo ""
