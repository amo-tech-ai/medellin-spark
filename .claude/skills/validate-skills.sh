#!/bin/bash

# Skills Validation Script
# Tests all skills for Anthropic best practices compliance

echo "=========================================="
echo "MEDELLIN SPARK - SKILLS VALIDATION REPORT"
echo "=========================================="
echo ""

SKILLS_DIR="/home/sk/medellin-spark/.claude/skills"
TOTAL_SKILLS=0
PASSED_SKILLS=0
FAILED_SKILLS=0
WARNINGS=0

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

validate_skill() {
    local skill_file="$1"
    local skill_name=$(basename $(dirname "$skill_file"))

    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Testing: $skill_name"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    TOTAL_SKILLS=$((TOTAL_SKILLS + 1))
    local skill_passed=true

    # Test 1: File exists and is readable
    if [ ! -r "$skill_file" ]; then
        echo -e "${RED}✗ FAIL${NC}: File not readable"
        skill_passed=false
    else
        echo -e "${GREEN}✓ PASS${NC}: File exists and readable"
    fi

    # Test 2: YAML frontmatter exists
    if ! head -1 "$skill_file" | grep -q "^---$"; then
        echo -e "${RED}✗ FAIL${NC}: Missing YAML frontmatter (should start with ---)"
        skill_passed=false
    else
        echo -e "${GREEN}✓ PASS${NC}: YAML frontmatter present"
    fi

    # Test 3: Name field exists
    if ! grep -q "^name:" "$skill_file"; then
        echo -e "${RED}✗ FAIL${NC}: Missing 'name' field in frontmatter"
        skill_passed=false
    else
        local name_value=$(grep "^name:" "$skill_file" | head -1 | cut -d':' -f2- | sed 's/^ *//')
        local name_length=${#name_value}

        if [ $name_length -gt 64 ]; then
            echo -e "${RED}✗ FAIL${NC}: Name too long ($name_length chars, max 64)"
            skill_passed=false
        else
            echo -e "${GREEN}✓ PASS${NC}: Name field present ($name_length chars)"
        fi
    fi

    # Test 4: Description field exists
    if ! grep -q "^description:" "$skill_file"; then
        echo -e "${RED}✗ FAIL${NC}: Missing 'description' field in frontmatter"
        skill_passed=false
    else
        local desc_value=$(grep "^description:" "$skill_file" | head -1 | cut -d':' -f2- | sed 's/^ *//')
        local desc_length=${#desc_value}

        if [ $desc_length -gt 1024 ]; then
            echo -e "${RED}✗ FAIL${NC}: Description too long ($desc_length chars, max 1024)"
            skill_passed=false
        elif [ $desc_length -lt 50 ]; then
            echo -e "${YELLOW}⚠ WARN${NC}: Description short ($desc_length chars, recommend 100+)"
            WARNINGS=$((WARNINGS + 1))
            echo -e "${GREEN}✓ PASS${NC}: Description field present"
        else
            echo -e "${GREEN}✓ PASS${NC}: Description field present ($desc_length chars)"
        fi

        # Test 5: Third-person voice (no "I", "you", "your")
        if echo "$desc_value" | grep -iE "\b(I can|you can|your|I will|I help)\b" > /dev/null; then
            echo -e "${YELLOW}⚠ WARN${NC}: Description uses first/second person (should be third person)"
            WARNINGS=$((WARNINGS + 1))
        else
            echo -e "${GREEN}✓ PASS${NC}: Description uses third-person voice"
        fi
    fi

    # Test 6: Closing frontmatter
    if ! head -10 "$skill_file" | tail -9 | grep -q "^---$"; then
        echo -e "${RED}✗ FAIL${NC}: Missing closing --- for YAML frontmatter"
        skill_passed=false
    else
        echo -e "${GREEN}✓ PASS${NC}: YAML frontmatter properly closed"
    fi

    # Test 7: File line count (recommended < 500 lines)
    local line_count=$(wc -l < "$skill_file")
    if [ $line_count -gt 1000 ]; then
        echo -e "${RED}✗ FAIL${NC}: File too long ($line_count lines, max recommended 500)"
        skill_passed=false
    elif [ $line_count -gt 500 ]; then
        echo -e "${YELLOW}⚠ WARN${NC}: File long ($line_count lines, recommended < 500)"
        WARNINGS=$((WARNINGS + 1))
        echo -e "${GREEN}✓ PASS${NC}: File length acceptable"
    else
        echo -e "${GREEN}✓ PASS${NC}: File length optimal ($line_count lines)"
    fi

    # Test 8: Has content after frontmatter
    local content_lines=$(tail -n +10 "$skill_file" | grep -v "^$" | wc -l)
    if [ $content_lines -lt 10 ]; then
        echo -e "${RED}✗ FAIL${NC}: Very little content ($content_lines lines)"
        skill_passed=false
    else
        echo -e "${GREEN}✓ PASS${NC}: Has substantial content ($content_lines lines)"
    fi

    # Test 9: No Windows-style paths
    if grep -q '\\' "$skill_file" && ! grep -q 'newline\\n' "$skill_file"; then
        echo -e "${YELLOW}⚠ WARN${NC}: File may contain Windows-style backslashes"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "${GREEN}✓ PASS${NC}: No Windows-style paths detected"
    fi

    # Test 10: UTF-8 encoding
    if file "$skill_file" | grep -q "UTF-8"; then
        echo -e "${GREEN}✓ PASS${NC}: UTF-8 encoding verified"
    else
        echo -e "${YELLOW}⚠ WARN${NC}: Non-UTF-8 encoding detected"
        WARNINGS=$((WARNINGS + 1))
    fi

    # Final result for this skill
    echo ""
    if [ "$skill_passed" = true ]; then
        echo -e "${GREEN}✓ $skill_name: PASSED${NC}"
        PASSED_SKILLS=$((PASSED_SKILLS + 1))
    else
        echo -e "${RED}✗ $skill_name: FAILED${NC}"
        FAILED_SKILLS=$((FAILED_SKILLS + 1))
    fi
    echo ""
}

# Find and validate all SKILL.md files
for skill in "$SKILLS_DIR"/*/SKILL.md; do
    if [ -f "$skill" ]; then
        validate_skill "$skill"
    fi
done

# Summary Report
echo "=========================================="
echo "VALIDATION SUMMARY"
echo "=========================================="
echo ""
echo "Total Skills Tested: $TOTAL_SKILLS"
echo -e "${GREEN}Passed: $PASSED_SKILLS${NC}"
echo -e "${RED}Failed: $FAILED_SKILLS${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo ""

if [ $FAILED_SKILLS -eq 0 ]; then
    echo -e "${GREEN}✓ ALL SKILLS PASSED VALIDATION${NC}"
    exit 0
else
    echo -e "${RED}✗ SOME SKILLS FAILED VALIDATION${NC}"
    exit 1
fi
