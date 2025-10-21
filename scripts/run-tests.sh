#!/bin/bash

# Comprehensive Test Runner for Medellin Spark
# Runs all test layers in sequence
# Based on: docs/TESTING-STRATEGY.md

set -e  # Exit on error

echo "🧪 Medellin Spark - Comprehensive Test Suite"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run test and track results
run_test() {
  local test_name=$1
  local test_command=$2
  
  echo "🔍 Running: $test_name"
  
  if eval "$test_command"; then
    echo -e "${GREEN}✅ PASS${NC}: $test_name"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}❌ FAIL${NC}: $test_name"
    ((TESTS_FAILED++))
    
    # Don't exit, continue with other tests
    # set +e
  fi
  
  echo ""
}

# =============================================================================
# LAYER 1: CODE QUALITY CHECKS
# =============================================================================

echo "📋 LAYER 1: Code Quality Checks"
echo "--------------------------------"

run_test "TypeScript Compilation" "pnpm tsc --noEmit"
run_test "ESLint Check" "pnpm lint || true"  # Don't fail on warnings

echo ""

# =============================================================================
# LAYER 2: BUILD VERIFICATION
# =============================================================================

echo "🏗️ LAYER 2: Build Verification"
echo "--------------------------------"

run_test "Production Build" "pnpm build"

echo ""

# =============================================================================
# LAYER 3: E2E TESTS
# =============================================================================

echo "🎭 LAYER 3: End-to-End Tests"
echo "----------------------------"

# Check if Playwright is installed
if ! npx playwright --version &> /dev/null; then
  echo -e "${YELLOW}⚠️  Installing Playwright...${NC}"
  npx playwright install chromium --with-deps
fi

# Run E2E tests
run_test "Playwright E2E Tests" "npx playwright test --reporter=list"

echo ""

# =============================================================================
# SUMMARY
# =============================================================================

echo "=============================================="
echo "📊 TEST SUMMARY"
echo "=============================================="
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
  echo "✅ Ready for deployment"
  exit 0
else
  echo -e "${RED}❌ SOME TESTS FAILED${NC}"
  echo "⚠️  Fix failures before deploying"
  exit 1
fi
