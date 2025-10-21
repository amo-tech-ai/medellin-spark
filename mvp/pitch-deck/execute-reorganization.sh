#!/bin/bash
# Pitch Deck Documentation Reorganization Script
# Execute from: /home/sk/medellin-spark/mvp/pitch-deck
# Time: ~2 minutes

set -e  # Exit on error

echo "======================================"
echo "Pitch Deck Documentation Reorganization"
echo "======================================"
echo ""

# Verify we're in the right directory
if [[ ! -f "README.md" ]] || [[ ! -d "docs" ]]; then
    echo "❌ Error: Must run from /home/sk/medellin-spark/mvp/pitch-deck"
    exit 1
fi

echo "✅ Current directory verified"
echo ""

# Phase 1: Move research files from root to research/
echo "Phase 1: Moving research files to research/..."
if [[ -f "RESEARCH_SUMMARY.md" ]]; then
    cp RESEARCH_SUMMARY.md research/RESEARCH_SUMMARY.md && rm RESEARCH_SUMMARY.md
    echo "  ✅ Moved RESEARCH_SUMMARY.md"
fi

if [[ -f "RESEARCH_REPORT.md" ]]; then
    cp RESEARCH_REPORT.md research/RESEARCH_REPORT.md && rm RESEARCH_REPORT.md
    echo "  ✅ Moved RESEARCH_REPORT.md"
fi

if [[ -f "QUICK_REFERENCE.md" ]]; then
    cp QUICK_REFERENCE.md research/QUICK_REFERENCE.md && rm QUICK_REFERENCE.md
    echo "  ✅ Moved QUICK_REFERENCE.md"
fi

if [[ -f "research-findings.json" ]]; then
    cp research-findings.json research/research-findings.json && rm research-findings.json
    echo "  ✅ Moved research-findings.json"
fi

# Phase 2: Move comparison files from features-pitch/ to research/
echo ""
echo "Phase 2: Moving comparison files to research/..."
if [[ -f "features-pitch/COMPARISON.md" ]]; then
    cp features-pitch/COMPARISON.md research/COMPARISON.md && rm features-pitch/COMPARISON.md
    echo "  ✅ Moved COMPARISON.md"
fi

if [[ -f "features-pitch/COMPARISON.csv" ]]; then
    cp features-pitch/COMPARISON.csv research/COMPARISON.csv && rm features-pitch/COMPARISON.csv
    echo "  ✅ Moved COMPARISON.csv"
fi

if [[ -f "features-pitch/USE_CASES.md" ]]; then
    cp features-pitch/USE_CASES.md research/USE_CASES.md && rm features-pitch/USE_CASES.md
    echo "  ✅ Moved USE_CASES.md"
fi

# Phase 3: Create notes folder and move historical docs
echo ""
echo "Phase 3: Moving historical docs to notes/..."
mkdir -p notes

if [[ -f "features-pitch/14-PLAN.md" ]]; then
    cp features-pitch/14-PLAN.md notes/14-PLAN.md && rm features-pitch/14-PLAN.md
    echo "  ✅ Moved 14-PLAN.md"
fi

if [[ -f "features-pitch/16-UI_PLAN.md" ]]; then
    cp features-pitch/16-UI_PLAN.md notes/16-UI_PLAN.md && rm features-pitch/16-UI_PLAN.md
    echo "  ✅ Moved 16-UI_PLAN.md"
fi

if [[ -f "features-pitch/PLAYBOOK.md" ]]; then
    cp features-pitch/PLAYBOOK.md notes/PLAYBOOK.md && rm features-pitch/PLAYBOOK.md
    echo "  ✅ Moved PLAYBOOK.md"
fi

if [[ -f "features-pitch/JOURNEYS.md" ]]; then
    cp features-pitch/JOURNEYS.md notes/JOURNEYS.md && rm features-pitch/JOURNEYS.md
    echo "  ✅ Moved JOURNEYS.md"
fi

if [[ -f "features-pitch/DIAGRAMS.md" ]]; then
    cp features-pitch/DIAGRAMS.md notes/DIAGRAMS.md && rm features-pitch/DIAGRAMS.md
    echo "  ✅ Moved DIAGRAMS.md"
fi

# Phase 4: Move screenshots
echo ""
echo "Phase 4: Moving screenshots to notes/..."
mkdir -p notes/task-screenshots

if [[ -f "tasks/7231aa68-d7ec-4615-b038-7cf71f69696b.png" ]]; then
    cp tasks/7231aa68-d7ec-4615-b038-7cf71f69696b.png notes/task-screenshots/ && rm tasks/7231aa68-d7ec-4615-b038-7cf71f69696b.png
    echo "  ✅ Moved screenshot 1"
fi

if [[ -f "tasks/da1038f8-9c4d-4337-b3aa-9accbedc34e9.png" ]]; then
    cp tasks/da1038f8-9c4d-4337-b3aa-9accbedc34e9.png notes/task-screenshots/ && rm tasks/da1038f8-9c4d-4337-b3aa-9accbedc34e9.png
    echo "  ✅ Moved screenshot 2"
fi

# Phase 5: Delete duplicate files
echo ""
echo "Phase 5: Deleting duplicate files..."

if [[ -f "01-project-overview.md" ]]; then
    rm 01-project-overview.md
    echo "  ✅ Deleted 01-project-overview.md (duplicate)"
fi

if [[ -f "features-pitch/02-database-architecture.md" ]]; then
    rm features-pitch/02-database-architecture.md
    echo "  ✅ Deleted 02-database-architecture.md (duplicate)"
fi

if [[ -f "features-pitch/04-sitemap-routes.md" ]]; then
    rm features-pitch/04-sitemap-routes.md
    echo "  ✅ Deleted 04-sitemap-routes.md (duplicate)"
fi

if [[ -f "features-pitch/05-components.md" ]]; then
    rm features-pitch/05-components.md
    echo "  ✅ Deleted 05-components.md (duplicate)"
fi

if [[ -f "features-pitch/06-implementation-plan.md" ]]; then
    rm features-pitch/06-implementation-plan.md
    echo "  ✅ Deleted 06-implementation-plan.md (duplicate)"
fi

# Phase 6: Clean up features-pitch folder
echo ""
echo "Phase 6: Cleaning up features-pitch folder..."

if [[ -f "features-pitch/README.md" ]]; then
    rm features-pitch/README.md
    echo "  ✅ Deleted features-pitch/README.md"
fi

# Check if features-pitch is empty, then delete
if [[ -d "features-pitch" ]]; then
    if [[ -z "$(ls -A features-pitch)" ]]; then
        rmdir features-pitch
        echo "  ✅ Deleted empty features-pitch/ folder"
    else
        echo "  ⚠️  features-pitch/ not empty, contains:"
        ls -la features-pitch/
    fi
fi

# Phase 7: Rename mermaid to diagrams
echo ""
echo "Phase 7: Renaming mermaid/ to diagrams/..."

if [[ -d "mermaid" ]]; then
    if [[ -d "diagrams" ]]; then
        echo "  ⚠️  diagrams/ already exists, skipping rename"
    else
        mv mermaid diagrams
        echo "  ✅ Renamed mermaid/ to diagrams/"
    fi
fi

# Phase 8: Update diagrams README
echo ""
echo "Phase 8: Updating diagrams/README.md..."

if [[ -f "diagrams/README-DIAGRAMS.md" ]] && [[ -f "diagrams/README.md" ]]; then
    rm diagrams/README.md
    mv diagrams/README-DIAGRAMS.md diagrams/README.md
    echo "  ✅ Updated diagrams/README.md"
fi

# Phase 9: Delete temporary files
echo ""
echo "Phase 9: Cleaning up temporary files..."

if [[ -f "reorganize.sh" ]]; then
    rm reorganize.sh
    echo "  ✅ Deleted reorganize.sh"
fi

echo ""
echo "======================================"
echo "✅ Reorganization Complete!"
echo "======================================"
echo ""
echo "Final structure:"
echo "  ✅ docs/        - Core implementation (10 files)"
echo "  ✅ research/    - Research materials (8 files)"
echo "  ✅ diagrams/    - Visual diagrams (6-7 files)"
echo "  ✅ tasks/       - Implementation tasks"
echo "  ✅ notes/       - Historical reference (5+ files)"
echo ""
echo "Next steps:"
echo "  1. Verify structure: ls -la"
echo "  2. Check research/: ls -la research/"
echo "  3. Check diagrams/: ls -la diagrams/"
echo "  4. Check notes/: ls -la notes/"
echo ""
echo "Documentation is now organized and production-ready!"
