# Repository Cleanup Plan

**Created**: January 2025  
**Project**: Medellin Spark  
**Repository**: https://github.com/amo-tech-ai/medellin-spark.git  
**Current Approach**: Blaxel + CopilotKit for Pitch Deck AI

---

## 🎯 Cleanup Objectives

### Goals
1. Archive outdated documentation and implementation attempts
2. Remove duplicate files
3. Organize documentation by current approach
4. Reduce confusion from multiple implementation strategies
5. Keep only current, relevant documentation

### Current Active Documentation
- ✅ **mvp/blaxel/** - Current Blaxel + CopilotKit approach (5 files)
- ✅ **mvp/phase-1/** - Phase 1 analysis and progress
- ✅ **mvp/phase-2/** - Phase 2 Presenton.ai analysis
- ✅ **supabase/** - Database schema and migrations

---

## 📁 Archive Structure

### Proposed Archive Folders

```
archive/
├── docs-old/                    # Old docs/ folder contents
│   ├── lovable-attempts/        # Lovable-specific documentation
│   ├── pitch-deck-attempts/    # Old pitch deck AI attempts
│   ├── mermaid-diagrams/        # Old diagram documentation
│   ├── prompts/                 # Old prompts and implementation plans
│   └── screenshots/             # Old screenshots
├── code-old/                    # Old code directories
│   ├── copilotkit-powerpoint/   # 100-copilotkit-powerpoint
│   ├── presenton/               # 200-presenton
│   └── presentation-ai/        # 250-presentation-ai
└── notes/                       # Old notes and temp files
```

---

## 🗑️ Files to Archive

### Root Level Files

| File | Status | Action | Reason |
|------|--------|--------|--------|
| `notes/` | ❌ Old | Archive → `archive/notes-old/` | Contains old experiments |
| `docs/presentation-ai-analysis.md` | ❌ Duplicate | Archive → `archive/docs-old/` | Already in phase-2 |
| `docs/presenton-system-flow.md` | ❌ Duplicate | Archive → `archive/docs-old/` | Already in phase-2 |
| `docs/lovable/` | ❌ Old | Archive → `archive/docs-old/lovable-attempts/` | Old Lovable-specific docs |
| `docs/mermaid/` | ❌ Old | Archive → `archive/docs-old/mermaid-diagrams/` | Old diagrams (use mvp/blaxel/003-pitch-deck-diagrams.md) |
| `docs/prompts/` | ❌ Old | Archive → `archive/docs-old/prompts/` | Old prompts, now using Blaxel |
| `docs/screens/` | ❌ Old | Archive → `archive/docs-old/screenshots/` | Old screenshots |

### Keep Active

| Folder/File | Status | Reason |
|------------|--------|--------|
| `mvp/blaxel/` | ✅ Active | Current Blaxel + CopilotKit approach |
| `mvp/phase-1/` | ✅ Active | Progress tracking |
| `mvp/phase-2/` | ✅ Active | Presenton.ai analysis |
| `supabase/` | ✅ Active | Database documentation |
| `src/` | ✅ Active | Application source code |
| `vite/` | ✅ Active | Frontend application |

---

## 📋 Cleanup Checklist

### Phase 1: Create Archive Structure ✅ COMPLETED

- [x] Create `archive/` folder
- [x] Create `archive/docs-old/` folder
- [x] Create `archive/code-old/` folder (if needed)
- [x] Create `archive/notes-old/` folder

### Phase 2: Archive Old Documentation ✅ COMPLETED

- [x] Move `docs/presentation-ai-analysis.md` → `archive/docs-old/`
- [x] Move `docs/presenton-system-flow.md` → `archive/docs-old/`
- [x] Move `docs/lovable/` → `archive/docs-old/lovable-attempts/`
- [x] Move `docs/mermaid/` → `archive/docs-old/mermaid-diagrams/`
- [x] Move `docs/prompts/` → `archive/docs-old/prompts/`
- [x] Move `docs/screens/` → `archive/docs-old/screenshots/`
- [x] Move old feature docs to `archive/docs-old/features-old/`
- [x] Move `docs/dashboard/` → `archive/docs-old/dashboard-old/`
- [x] Move `docs/pages/` → `archive/docs-old/pages-old/`
- [x] Move `docs/plugins/` → `archive/docs-old/plugins-old/`
- [x] Move `docs/research/` → `archive/docs-old/research-old/`
- [x] Move `docs/mobile/` → `archive/docs-old/mobile-old/`
- [x] Move `docs/vite/` → `archive/docs-old/vite-old/`
- [x] Move `docs/UI/` → `archive/docs-old/ui-old/`
- [x] Move `docs/main/` → `archive/docs-old/main-old/`
- [x] Move `docs/new/` → `archive/docs-old/`

### Phase 3: Archive Old Code Directories ⏸️ DEFERRED

- [ ] Check if `100-copilotkit-powerpoint/` exists
- [ ] Check if `200-presenton/` exists
- [ ] Check if `250-presentation-ai/` exists
- [ ] Move to `archive/code-old/` if所有 exist

### Phase 4: Clean Up Root Level Files ⏸️ DEFERRED

- [ ] Review `notes/` folder
- [ ] Archive or remove old note files
- [ ] Keep only current working documentation

### Phase 5: Create Archive README ✅ COMPLETED

- [x] Create `archive/docs-old/README.md` explaining archive contents
- [x] Document why files were archived
- [x] Add references to current documentation
- [x] Create `docs/README.md` for main docs folder

---

## 📝 Recommended Actions

### Immediate Actions (Quick Win)

1. **Archive duplicate files**:
   ```bash
   mkdir -p archive/docs-old
   mv docs/presentation-ai-analysis.md archive/docs-old/
   mv docs/presenton-system-flow.md archive/docs-old/
   ```

2. **Archive old Lovable docs**:
   ```bash
   mkdir -p archive/docs-old/lovable-attempts
   mv docs/lovable/* archive/docs-old/lovable-attempts/
   ```

3. **Archive old prompts**:
   ```bash
   mkdir -p archive/docs-old/prompts
   mv docs/prompts/pitch-deck-ai archive/docs-old/prompts/
   ```

### Phase 2 Actions (More Thorough)

4. **Archive mermaid diagrams**:
   ```bash
   mkdir -p archive/docs-old/mermaid-diagrams
   mv docs/mermaid/* archive/docs-old/mermaid-diagrams/
   ```

5. **Archive screenshots**:
   ```bash
   mkdir -p archive/docs-old/screenshots
   mv docs/screens/* archive/docs-old/screenshots/
   ```

### Final Actions

6. **Create archive README**:
   - Document what's archived and why
   - Link to current documentation locations
   - Provide restoration instructions if needed

---

## 🎯 Current Active Documentation Structure

### ✅ Keep These Folders

```
mvp/
├── blaxel/                      # Current Blaxel implementation
│   ├── 001-blaxel-getting-started.md
│   ├── 002-pitch-deck-agent-plan.md
│   ├── 003-pitch-deck-diagrams.md
│   ├── 004-pitch-deck-wizard-prd.md
│   ├── 005-supabase-erd-and-schema.md
│   └── 006-repository-cleanup-plan.md
├── phase-1/                     # Phase 1 progress tracking
├── phase-2/                     # Phase 2 analysis
└── plan/                        # Planning documents

supabase/
├── docs/                        # Database documentation
├── migrations/                  # Database migrations
└── functions/                   # Edge functions

src/                             # Application source code
vite/                            # Frontend application
```

---

## 📊 Statistics

### Before Cleanup
- **Total MD files in docs/**: 240
- **Duplicate files**: ~10+
- **Outdated implementation docs**: ~50+
- **Old screenshots**: ~100+

### After Cleanup (Estimated)
- **Active docs**: ~20
- **Archived docs**: ~200+
- **Clean repository**: Yes ✅

---

## 🚀 Benefits

### Immediate Benefits
- ✅ Clear documentation hierarchy
- ✅ No duplicate files
- ✅ Easy to find current documentation
- ✅ Reduced confusion

### Long-term Benefits
- ✅ Easier onboarding for new developers
- ✅ Clear project evolution history
- ✅ Better organization
- ✅ Professional repository appearance

---

## 📖 Archive README Template

```markdown
# Archive Documentation

This folder contains archived documentation from previous implementation attempts.

## Archive Structure

### docs-old/
Contains old documentation from the initial Lovable-based implementation attempts.

**Why archived**: We've moved to a Blaxel + CopilotKit approach documented in `mvp/blaxel/`

### code-old/
Contains old code directories from experimental implementations.

**Why archived**: These were proof-of-concept implementations replaced by current Blaxel approach.

## Current Documentation

**Active documentation** is located in:
- `mvp/blaxel/` - Current Blaxel + CopilotKit implementation
- `mvp/phase-1/` - Phase 1 progress tracking
- `mvp/phase-2/` - Phase 2 analysis
- `supabase/docs/` - Database documentation

## Restoration

If you need to restore archived files:
1. Check git history: `git log --all --full-history -- <file>`
2. Restore from archive: `cp archive/<path> <destination>`
3. Commit changes
```

---

## ⚠️ Safety Notes

### Before Archiving
- ✅ Check git history for each file
- ✅ Ensure important information is documented elsewhere
- ✅ Test that current code doesn't reference archived files
- ✅ Commit changes incrementally

### After Archiving
- ✅ Verify current documentation is complete
- ✅ Update any references to old file locations
- ✅ Test application functionality
- ✅ Update README with new structure

---

## 🔄 Restoration Process

If you need to restore archived files:

```bash
# Find file in archive
find archive/ -name "filename.md"

# Restore to current location
cp archive/docs-old/filename.md docs/new-location/

# Or restore entire folder
cp -r archive/docs-old/lovable-attempts docs/lovable-restored/
```

---

**Status**: In Progress (Phase 1 & 2 Complete)  
**Priority**: Medium  
**Estimated Time**: 1-2 hours  
**Risk Level**: Low (files archived, not deleted)

## ✅ Completed Actions (October 25, 2025)

1. Created `archive/docs-old/` directory structure
2. Archived all old documentation from `docs/` folder
3. Removed empty directories from `docs/`
4. Created `archive/docs-old/README.md` with archive contents documentation
5. Created `docs/README.md` pointing to current documentation locations
6. Preserved `docs/SITEMAP-1.md` as the main sitemap reference

### Current State

- **docs/**: Now contains only `SITEMAP-1.md` and `README.md`
- **archive/docs-old/**: Contains all archived documentation with proper organization
- **Remaining**: Phase 3 (code directories) and Phase 4 (notes folder) deferred for future review

