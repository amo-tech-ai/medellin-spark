#!/bin/bash
# Verification Script for Pitch Deck Documentation Reorganization
# Run after: execute-reorganization.sh

echo "======================================"
echo "Verifying Reorganization"
echo "======================================"
echo ""

ERRORS=0
WARNINGS=0

# Check we're in the right directory
if [[ ! -f "README.md" ]] || [[ ! -d "docs" ]]; then
    echo "❌ Error: Must run from /home/sk/medellin-spark/mvp/pitch-deck"
    exit 1
fi

# Test 1: Check research/ folder
echo "Test 1: Checking research/ folder..."
if [[ -d "research" ]]; then
    FILE_COUNT=$(ls research/*.md research/*.json 2>/dev/null | wc -l)
    if [[ $FILE_COUNT -ge 7 ]]; then
        echo "  ✅ research/ folder exists with $FILE_COUNT files"
    else
        echo "  ⚠️  research/ has only $FILE_COUNT files (expected 8)"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo "  ❌ research/ folder missing"
    ERRORS=$((ERRORS + 1))
fi

# Test 2: Check notes/ folder
echo ""
echo "Test 2: Checking notes/ folder..."
if [[ -d "notes" ]]; then
    FILE_COUNT=$(find notes -type f 2>/dev/null | wc -l)
    if [[ $FILE_COUNT -ge 5 ]]; then
        echo "  ✅ notes/ folder exists with $FILE_COUNT files"
    else
        echo "  ⚠️  notes/ has only $FILE_COUNT files (expected 5+)"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo "  ⚠️  notes/ folder missing"
    WARNINGS=$((WARNINGS + 1))
fi

# Test 3: Check diagrams/ folder (renamed from mermaid/)
echo ""
echo "Test 3: Checking diagrams/ folder..."
if [[ -d "diagrams" ]]; then
    FILE_COUNT=$(ls diagrams/*.md 2>/dev/null | wc -l)
    echo "  ✅ diagrams/ folder exists with $FILE_COUNT files"
else
    echo "  ⚠️  diagrams/ folder missing (mermaid/ not renamed)"
    WARNINGS=$((WARNINGS + 1))
fi

# Test 4: Check mermaid/ folder (should NOT exist)
echo ""
echo "Test 4: Checking mermaid/ was renamed..."
if [[ -d "mermaid" ]]; then
    echo "  ⚠️  mermaid/ folder still exists (should be renamed to diagrams/)"
    WARNINGS=$((WARNINGS + 1))
else
    echo "  ✅ mermaid/ folder renamed"
fi

# Test 5: Check duplicates removed
echo ""
echo "Test 5: Checking duplicates removed..."
DUPS_FOUND=0

if [[ -f "01-project-overview.md" ]]; then
    echo "  ❌ 01-project-overview.md still exists (duplicate)"
    DUPS_FOUND=$((DUPS_FOUND + 1))
fi

if [[ -f "features-pitch/02-database-architecture.md" ]]; then
    echo "  ❌ features-pitch/02-database-architecture.md still exists"
    DUPS_FOUND=$((DUPS_FOUND + 1))
fi

if [[ -f "features-pitch/04-sitemap-routes.md" ]]; then
    echo "  ❌ features-pitch/04-sitemap-routes.md still exists"
    DUPS_FOUND=$((DUPS_FOUND + 1))
fi

if [[ -f "features-pitch/05-components.md" ]]; then
    echo "  ❌ features-pitch/05-components.md still exists"
    DUPS_FOUND=$((DUPS_FOUND + 1))
fi

if [[ -f "features-pitch/06-implementation-plan.md" ]]; then
    echo "  ❌ features-pitch/06-implementation-plan.md still exists"
    DUPS_FOUND=$((DUPS_FOUND + 1))
fi

if [[ $DUPS_FOUND -eq 0 ]]; then
    echo "  ✅ All duplicates removed"
else
    echo "  ❌ $DUPS_FOUND duplicate files still exist"
    ERRORS=$((ERRORS + $DUPS_FOUND))
fi

# Test 6: Check features-pitch/ folder
echo ""
echo "Test 6: Checking features-pitch/ cleanup..."
if [[ -d "features-pitch" ]]; then
    FILE_COUNT=$(ls -A features-pitch 2>/dev/null | wc -l)
    if [[ $FILE_COUNT -eq 0 ]]; then
        echo "  ⚠️  features-pitch/ is empty but not deleted"
        WARNINGS=$((WARNINGS + 1))
    else
        echo "  ⚠️  features-pitch/ still has $FILE_COUNT files:"
        ls -la features-pitch/
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo "  ✅ features-pitch/ folder deleted"
fi

# Test 7: Check docs/ folder intact
echo ""
echo "Test 7: Checking docs/ folder intact..."
if [[ -d "docs" ]]; then
    FILE_COUNT=$(ls docs/*.md 2>/dev/null | wc -l)
    if [[ $FILE_COUNT -ge 9 ]]; then
        echo "  ✅ docs/ folder intact with $FILE_COUNT files"
    else
        echo "  ❌ docs/ has only $FILE_COUNT files (expected 10)"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "  ❌ docs/ folder missing!"
    ERRORS=$((ERRORS + 1))
fi

# Test 8: Check tasks/ folder intact
echo ""
echo "Test 8: Checking tasks/ folder intact..."
if [[ -d "tasks" ]]; then
    FILE_COUNT=$(ls tasks/*.md 2>/dev/null | wc -l)
    if [[ $FILE_COUNT -ge 8 ]]; then
        echo "  ✅ tasks/ folder intact with $FILE_COUNT files"
    else
        echo "  ⚠️  tasks/ has only $FILE_COUNT files"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo "  ❌ tasks/ folder missing!"
    ERRORS=$((ERRORS + 1))
fi

# Test 9: Check root folder cleanliness
echo ""
echo "Test 9: Checking root folder organization..."
ROOT_FILES=$(ls -1 *.md 2>/dev/null | grep -v "README.md" | grep -v "INDEX" | grep -v "PLAN" | grep -v "GUIDE" | grep -v "SUMMARY" | wc -l)
if [[ $ROOT_FILES -le 5 ]]; then
    echo "  ✅ Root folder clean ($ROOT_FILES doc files)"
else
    echo "  ⚠️  Root folder has $ROOT_FILES doc files (expected ≤5)"
    WARNINGS=$((WARNINGS + 1))
fi

# Summary
echo ""
echo "======================================"
echo "Verification Summary"
echo "======================================"
echo ""

if [[ $ERRORS -eq 0 ]] && [[ $WARNINGS -eq 0 ]]; then
    echo "🎉 ✅ PERFECT - All tests passed!"
    echo ""
    echo "Final structure:"
    ls -1d */ 2>/dev/null
    echo ""
    echo "File counts:"
    echo "  docs/:     $(ls docs/*.md 2>/dev/null | wc -l) files"
    echo "  research/: $(ls research/* 2>/dev/null | wc -l) files"
    echo "  diagrams/: $(ls diagrams/*.md 2>/dev/null | wc -l) files"
    echo "  tasks/:    $(ls tasks/*.md 2>/dev/null | wc -l) files"
    echo "  notes/:    $(find notes -type f 2>/dev/null | wc -l) files"
    exit 0
elif [[ $ERRORS -eq 0 ]]; then
    echo "✅ SUCCESS with $WARNINGS warnings"
    echo ""
    echo "Reorganization complete with minor issues."
    echo "Review warnings above."
    exit 0
else
    echo "❌ FAILED with $ERRORS errors and $WARNINGS warnings"
    echo ""
    echo "Please review errors above and re-run:"
    echo "  bash execute-reorganization.sh"
    exit 1
fi
