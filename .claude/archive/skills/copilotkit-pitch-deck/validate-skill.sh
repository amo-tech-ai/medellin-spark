#!/bin/bash

echo "🔍 Validating CopilotKit Pitch Deck Skill..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check skill files
echo "📁 Checking Skill Files..."

files=(
  "SKILL.md"
  "QUICK-START.md"
  "TROUBLESHOOTING.md"
  "README.md"
  "SKILL-CREATION-SUMMARY.md"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "  ${GREEN}✓${NC} $file"
  else
    echo -e "  ${RED}✗${NC} $file (missing)"
  fi
done

echo ""

# Check SKILL.md structure
echo "📋 Checking SKILL.md Structure..."

if grep -q "^---$" SKILL.md && grep -q "^name:" SKILL.md && grep -q "^description:" SKILL.md; then
  echo -e "  ${GREEN}✓${NC} YAML frontmatter present"
else
  echo -e "  ${RED}✗${NC} YAML frontmatter missing or malformed"
fi

if grep -q "name: copilotkit-pitch-deck" SKILL.md; then
  echo -e "  ${GREEN}✓${NC} Skill name: copilotkit-pitch-deck"
else
  echo -e "  ${RED}✗${NC} Skill name incorrect"
fi

if grep -q "description:" SKILL.md; then
  desc_length=$(grep "^description:" SKILL.md | wc -c)
  if [ "$desc_length" -lt 1024 ]; then
    echo -e "  ${GREEN}✓${NC} Description length OK ($desc_length < 1024)"
  else
    echo -e "  ${YELLOW}⚠${NC} Description might be too long ($desc_length chars)"
  fi
fi

echo ""

# Check subagent
echo "🤖 Checking Subagent..."

subagent_file="/home/sk/medellin-spark/.claude/agents/copilotkit-architect.md"

if [ -f "$subagent_file" ]; then
  echo -e "  ${GREEN}✓${NC} Subagent file exists"
  
  if grep -q "name: copilotkit-architect" "$subagent_file"; then
    echo -e "  ${GREEN}✓${NC} Subagent name: copilotkit-architect"
  else
    echo -e "  ${RED}✗${NC} Subagent name incorrect"
  fi
  
  if grep -q "tools:" "$subagent_file"; then
    echo -e "  ${GREEN}✓${NC} Tools specified"
  else
    echo -e "  ${YELLOW}⚠${NC} No tools specified"
  fi
  
  if grep -q "model: sonnet" "$subagent_file"; then
    echo -e "  ${GREEN}✓${NC} Model: sonnet"
  else
    echo -e "  ${YELLOW}⚠${NC} Model not specified or different"
  fi
else
  echo -e "  ${RED}✗${NC} Subagent file missing"
fi

echo ""

# Check implementation plan reference
echo "📖 Checking Implementation Plan..."

plan_dir="/home/sk/medellin-spark/copilotkit-langraph/copilotkit-docsm/plan"

if [ -d "$plan_dir" ]; then
  echo -e "  ${GREEN}✓${NC} Plan directory exists"
  
  if [ -f "$plan_dir/00-MASTER-PLAN.md" ]; then
    echo -e "  ${GREEN}✓${NC} Master plan exists"
  else
    echo -e "  ${YELLOW}⚠${NC} Master plan missing"
  fi
  
  if [ -f "$plan_dir/01-SETUP-RUNTIME-SERVICE.md" ]; then
    echo -e "  ${GREEN}✓${NC} Task 1 exists"
  else
    echo -e "  ${YELLOW}⚠${NC} Task 1 missing"
  fi
else
  echo -e "  ${YELLOW}⚠${NC} Plan directory not found"
fi

echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Skill validation complete!${NC}"
echo ""
echo "Skill Location: .claude/skills/copilotkit-pitch-deck/"
echo "Subagent Location: .claude/agents/copilotkit-architect.md"
echo ""
echo "To use:"
echo "  - Mention 'CopilotKit' or 'runtime service' in conversation"
echo "  - Claude will proactively invoke copilotkit-architect subagent"
echo "  - Subagent will reference this skill for guidance"
echo ""
