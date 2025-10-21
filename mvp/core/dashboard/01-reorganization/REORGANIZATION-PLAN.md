# Dashboard Documentation Reorganization Plan

**Date**: October 19, 2025
**Status**: Implementing implementation-first workflow structure

---

## 🎯 Goal

Reorganize documentation to mirror actual development workflow:
- **WHEN** you need files (not WHAT type they are)
- **Phase-based** structure (planning → implementation → verification)
- **Implementation-first** approach

---

## Current Structure (Document-Type Based) ❌

```
dashboard/
├── 001-DASHBOARD-PAGES-PLAN.md (planning)
├── 002-DASHBOARD-COMPREHENSIVE-PLAN.md (planning)
├── 003-DASHBOARD-IMPLEMENTATION-TASKS.md (planning)
├── 004-DASHBOARD-TESTING-STRATEGY.md (testing)
├── 005-DASHBOARD-WORKFLOW-STEPS.md (workflow)
├── 006-SUPABASE-REACT-BEST-PRACTICES.md (reference)
├── DASHBOARD_SUPABASE_AUDIT.md (audit)
├── DASHBOARD-ORGANIZATION-PLAN.md (planning)
├── README.md
└── tasks/
    ├── 01-database-migration.md
    ├── 02-custom-hooks.md
    ├── ... (14 task files)
    ├── 00-progress-tracker.md
    ├── IMPLEMENTATION-COMPLETE.md
    └── FINAL-STATUS.md
```

**Problem**: Hard to know WHEN to use each file during development.

---

## New Structure (Implementation-First) ✅

```
dashboard/
├── 00-START-HERE.md                    # Quick navigation guide
│
├── 01-PLANNING/                        # Phase 1: Before coding
│   ├── README.md                       # What's in this phase
│   ├── pages-plan.md                   # Page specifications
│   ├── comprehensive-plan.md           # Full architecture
│   ├── implementation-tasks.md         # Task breakdown
│   ├── supabase-audit.md              # Database review
│   └── organization-plan.md            # Structure planning
│
├── 02-IMPLEMENTATION/                  # Phase 2: During coding
│   ├── README.md                       # Implementation workflow
│   ├── 01-database-migration.md        # Step 1: Database
│   ├── 02-custom-hooks.md             # Step 2: Data layer
│   ├── 03-base-components.md          # Step 3: UI components
│   ├── 04-connect-main-dashboard.md   # Step 4: Main page
│   ├── 05-jobs-dashboard.md           # Step 5: Jobs page
│   ├── 06-events-dashboard.md         # Step 6: Events page
│   ├── 07-pitch-decks-dashboard.md    # Step 7: Pitch decks
│   ├── 08-settings-dashboard.md       # Step 8: Settings
│   ├── 09-perks-dashboard.md          # Step 9: Perks
│   ├── 10-advanced-components.md      # Step 10: Advanced UI
│   ├── 11-filters-and-search.md       # Step 11: Features
│   ├── 12-performance-optimization.md # Step 12: Optimization
│   └── progress-tracker.md            # Live status
│
├── 03-VERIFICATION/                    # Phase 3: After coding
│   ├── README.md                       # Testing workflow
│   ├── testing-strategy.md            # Test approach
│   ├── testing-coverage.md            # Coverage targets
│   ├── implementation-complete.md     # Completion report
│   └── final-status.md                # Production status
│
├── 04-REFERENCE/                       # Phase 4: Quick lookups
│   ├── README.md                       # Reference index
│   ├── best-practices.md              # Supabase + React patterns
│   ├── workflow-steps.md              # Quick workflow guide
│   └── documentation-cleanup.md       # Maintenance guide
│
└── COMPLETE/                           # Archive
    ├── original-structure/            # Backup of old structure
    └── reorganization-log.md          # What changed
```

---

## File Mapping

### Phase 1: Planning (Before You Code)

| Old File | New Location | Why |
|----------|--------------|-----|
| 001-DASHBOARD-PAGES-PLAN.md | 01-PLANNING/pages-plan.md | Page specs needed first |
| 002-DASHBOARD-COMPREHENSIVE-PLAN.md | 01-PLANNING/comprehensive-plan.md | Architecture overview |
| 003-DASHBOARD-IMPLEMENTATION-TASKS.md | 01-PLANNING/implementation-tasks.md | Task breakdown |
| DASHBOARD_SUPABASE_AUDIT.md | 01-PLANNING/supabase-audit.md | Database review |
| DASHBOARD-ORGANIZATION-PLAN.md | 01-PLANNING/organization-plan.md | Structure planning |

### Phase 2: Implementation (During Coding)

| Old File | New Location | Why |
|----------|--------------|-----|
| tasks/01-database-migration.md | 02-IMPLEMENTATION/01-database-migration.md | First step |
| tasks/02-custom-hooks.md | 02-IMPLEMENTATION/02-custom-hooks.md | Data layer |
| tasks/03-base-components.md | 02-IMPLEMENTATION/03-base-components.md | UI components |
| tasks/04-connect-main-dashboard.md | 02-IMPLEMENTATION/04-connect-main-dashboard.md | Main page |
| tasks/05-jobs-dashboard.md | 02-IMPLEMENTATION/05-jobs-dashboard.md | Jobs page |
| tasks/06-events-dashboard.md | 02-IMPLEMENTATION/06-events-dashboard.md | Events page |
| tasks/07-pitch-decks-dashboard.md | 02-IMPLEMENTATION/07-pitch-decks-dashboard.md | Pitch decks |
| tasks/08-settings-dashboard.md | 02-IMPLEMENTATION/08-settings-dashboard.md | Settings |
| tasks/09-perks-dashboard.md | 02-IMPLEMENTATION/09-perks-dashboard.md | Perks |
| tasks/10-advanced-components.md | 02-IMPLEMENTATION/10-advanced-components.md | Advanced UI |
| tasks/11-filters-and-search.md | 02-IMPLEMENTATION/11-filters-and-search.md | Features |
| tasks/12-performance-optimization.md | 02-IMPLEMENTATION/12-performance-optimization.md | Optimization |
| tasks/00-progress-tracker.md | 02-IMPLEMENTATION/progress-tracker.md | Live status |

### Phase 3: Verification (After Coding)

| Old File | New Location | Why |
|----------|--------------|-----|
| 004-DASHBOARD-TESTING-STRATEGY.md | 03-VERIFICATION/testing-strategy.md | Test approach |
| tasks/13-testing-coverage.md | 03-VERIFICATION/testing-coverage.md | Coverage |
| tasks/IMPLEMENTATION-COMPLETE.md | 03-VERIFICATION/implementation-complete.md | Completion |
| tasks/FINAL-STATUS.md | 03-VERIFICATION/final-status.md | Final status |

### Phase 4: Reference (Quick Lookups)

| Old File | New Location | Why |
|----------|--------------|-----|
| 006-SUPABASE-REACT-BEST-PRACTICES.md | 04-REFERENCE/best-practices.md | Patterns |
| 005-DASHBOARD-WORKFLOW-STEPS.md | 04-REFERENCE/workflow-steps.md | Quick guide |
| tasks/14-documentation-and-cleanup.md | 04-REFERENCE/documentation-cleanup.md | Maintenance |

---

## Implementation Steps

### Step 1: Create New Structure
```bash
cd /home/sk/medellin-spark/mvp/core/dashboard
mkdir -p 01-PLANNING 02-IMPLEMENTATION 03-VERIFICATION 04-REFERENCE COMPLETE/original-structure
```

### Step 2: Copy Files to New Locations
```bash
# Phase 1: Planning
cp 001-DASHBOARD-PAGES-PLAN.md 01-PLANNING/pages-plan.md
cp 002-DASHBOARD-COMPREHENSIVE-PLAN.md 01-PLANNING/comprehensive-plan.md
cp 003-DASHBOARD-IMPLEMENTATION-TASKS.md 01-PLANNING/implementation-tasks.md
cp DASHBOARD_SUPABASE_AUDIT.md 01-PLANNING/supabase-audit.md
cp DASHBOARD-ORGANIZATION-PLAN.md 01-PLANNING/organization-plan.md

# Phase 2: Implementation
cp tasks/01-database-migration.md 02-IMPLEMENTATION/01-database-migration.md
cp tasks/02-custom-hooks.md 02-IMPLEMENTATION/02-custom-hooks.md
# ... (all 12 task files)
cp tasks/00-progress-tracker.md 02-IMPLEMENTATION/progress-tracker.md

# Phase 3: Verification
cp 004-DASHBOARD-TESTING-STRATEGY.md 03-VERIFICATION/testing-strategy.md
cp tasks/13-testing-coverage.md 03-VERIFICATION/testing-coverage.md
cp tasks/IMPLEMENTATION-COMPLETE.md 03-VERIFICATION/implementation-complete.md
cp tasks/FINAL-STATUS.md 03-VERIFICATION/final-status.md

# Phase 4: Reference
cp 006-SUPABASE-REACT-BEST-PRACTICES.md 04-REFERENCE/best-practices.md
cp 005-DASHBOARD-WORKFLOW-STEPS.md 04-REFERENCE/workflow-steps.md
cp tasks/14-documentation-and-cleanup.md 04-REFERENCE/documentation-cleanup.md
```

### Step 3: Create README files for each phase

### Step 4: Create 00-START-HERE.md navigation guide

### Step 5: Archive old structure
```bash
mv tasks/ COMPLETE/original-structure/
mv 001-* 002-* 003-* 004-* 005-* 006-* COMPLETE/original-structure/
mv DASHBOARD*.md COMPLETE/original-structure/
```

---

## Benefits of New Structure

### 1. Implementation-First ✅
**Before**: "Where do I start?"
**After**: "Go to 01-PLANNING/ first, then 02-IMPLEMENTATION/"

### 2. Clear Workflow ✅
**Before**: Mixed planning and tasks
**After**: Linear progression through phases

### 3. Easy Navigation ✅
**Before**: 26 files in 2 directories
**After**: 4 phases + start guide

### 4. Better Discovery ✅
**Before**: "What docs exist?"
**After**: "What do I need for this phase?"

### 5. Maintenance ✅
**Before**: Update docs scattered across folders
**After**: Update phase-specific docs

---

## Workflow Example

### Day 1: Planning Phase
```bash
cd dashboard/
# 1. Read start guide
cat 00-START-HERE.md

# 2. Review planning docs
cd 01-PLANNING/
cat README.md
cat pages-plan.md
cat comprehensive-plan.md
```

### Day 2-5: Implementation Phase
```bash
cd 02-IMPLEMENTATION/
# 1. Follow numbered steps
cat 01-database-migration.md    # Step 1
cat 02-custom-hooks.md          # Step 2
# ... implement each step

# 2. Track progress
cat progress-tracker.md
```

### Day 6: Verification Phase
```bash
cd 03-VERIFICATION/
# 1. Run tests
cat testing-strategy.md

# 2. Verify completion
cat implementation-complete.md
cat final-status.md
```

### Reference (Anytime)
```bash
cd 04-REFERENCE/
# Quick lookup for patterns
cat best-practices.md
```

---

## Success Criteria

✅ Developer can start project without asking questions
✅ Clear phase progression (planning → implementation → verification)
✅ All files have clear WHEN to use them
✅ No duplicate information
✅ Easy to maintain and update

---

**Status**: Ready to implement
**Next Action**: Create directory structure and move files
