# Pitch Deck Documentation - Manual Reorganization Guide

**Purpose**: Step-by-step file operations to organize documentation
**Time**: ~20 minutes
**Risk**: Low (can be reversed)

---

## ⚠️ Before You Start

1. **Backup** (optional but recommended):
   ```bash
   cd /home/sk/medellin-spark/mvp
   cp -r pitch-deck pitch-deck-backup-$(date +%Y%m%d)
   ```

2. **Verify current location**:
   ```bash
   cd /home/sk/medellin-spark/mvp/pitch-deck
   pwd  # Should show: /home/sk/medellin-spark/mvp/pitch-deck
   ```

---

## Phase 1: Move Research Files to research/ (4 files)

Already created:
- ✅ `research/README.md` (new file)

**Move these files**:
```bash
mv RESEARCH_SUMMARY.md research/
mv RESEARCH_REPORT.md research/
mv QUICK_REFERENCE.md research/
mv research-findings.json research/
```

**Verify**:
```bash
ls -la research/
# Should show: README.md + 4 moved files = 5 total
```

---

## Phase 2: Move Comparison Files to research/ (3 files)

```bash
mv features-pitch/COMPARISON.md research/
mv features-pitch/COMPARISON.csv research/
mv features-pitch/USE_CASES.md research/
```

**Verify**:
```bash
ls -la research/
# Should now show 8 files total
```

---

## Phase 3: Move Historical Docs to notes/ (5 files)

```bash
mkdir -p notes  # Create if doesn't exist

mv features-pitch/14-PLAN.md notes/
mv features-pitch/16-UI_PLAN.md notes/
mv features-pitch/PLAYBOOK.md notes/
mv features-pitch/JOURNEYS.md notes/
mv features-pitch/DIAGRAMS.md notes/
```

**Verify**:
```bash
ls -la notes/
# Should show 5 files
```

---

## Phase 4: Move Screenshots to notes/ (2 files)

```bash
mkdir -p notes/task-screenshots

mv tasks/7231aa68-d7ec-4615-b038-7cf71f69696b.png notes/task-screenshots/ 2>/dev/null || echo "File not found"
mv tasks/da1038f8-9c4d-4337-b3aa-9accbedc34e9.png notes/task-screenshots/ 2>/dev/null || echo "File not found"
```

**Verify**:
```bash
ls -la notes/task-screenshots/
# Should show 2 PNG files (if they exist)
```

---

## Phase 5: Delete Duplicate Files (5 files)

**⚠️ These are exact duplicates - safe to delete**

```bash
# Delete root duplicate
rm 01-project-overview.md

# Delete features-pitch duplicates
rm features-pitch/02-database-architecture.md
rm features-pitch/04-sitemap-routes.md
rm features-pitch/05-components.md
rm features-pitch/06-implementation-plan.md
```

**Verify**:
```bash
# These should NOT exist anymore
ls 01-project-overview.md 2>/dev/null && echo "❌ Still exists" || echo "✅ Deleted"
ls features-pitch/02-database-architecture.md 2>/dev/null && echo "❌ Still exists" || echo "✅ Deleted"
```

---

## Phase 6: Clean Up features-pitch/ Folder

```bash
# Delete README after moving all files
rm features-pitch/README.md

# Check if empty
ls -la features-pitch/

# If empty, delete folder
rmdir features-pitch
```

**Verify**:
```bash
ls -d features-pitch 2>/dev/null && echo "⚠️ Still exists (check contents)" || echo "✅ Deleted"
```

---

## Phase 7: Rename mermaid/ to diagrams/

```bash
mv mermaid diagrams
```

**Verify**:
```bash
ls -d diagrams && echo "✅ Renamed"
ls -d mermaid 2>/dev/null && echo "❌ Old folder still exists" || echo "✅ Old folder gone"
```

---

## Phase 8: Update diagrams/README.md

**Edit** `diagrams/README.md` and update the first line:
```markdown
# Pitch Deck AI - Visual Diagrams

(Change from "Mermaid Diagrams" to "Visual Diagrams")
```

---

## ✅ Final Verification

### Check Final Structure

```bash
cd /home/sk/medellin-spark/mvp/pitch-deck

tree -L 1
# Or use ls -la if tree not available
ls -la

# Expected folders:
# ├── docs/              ✅ (10 files)
# ├── research/          ✅ (8 files)
# ├── diagrams/          ✅ (6-7 files)
# ├── tasks/             ✅ (9 files)
# ├── notes/             ✅ (5+ files)
# └── README.md          ✅
```

### Verify File Counts

```bash
echo "docs/ files:" && ls docs/ | wc -l
# Expected: 10

echo "research/ files:" && ls research/ | wc -l
# Expected: 8

echo "diagrams/ files:" && ls diagrams/ | wc -l
# Expected: 6-7

echo "tasks/ files:" && ls tasks/*.md | wc -l
# Expected: 9

echo "notes/ files:" && ls notes/ | wc -l
# Expected: 5+
```

### Check No Duplicates

```bash
# These should NOT exist:
ls 01-project-overview.md 2>/dev/null && echo "❌ Duplicate found" || echo "✅ No duplicate"
ls features-pitch/ 2>/dev/null && echo "⚠️ Folder still exists" || echo "✅ Folder deleted"
ls mermaid/ 2>/dev/null && echo "⚠️ Old folder exists" || echo "✅ Renamed to diagrams/"
```

---

## 📊 Before vs After

| Metric | Before | After | Status |
|--------|--------|-------|--------|
| Root clutter | 6 files | 2 files | ✅ -67% |
| Duplicates | 5 files | 0 files | ✅ -100% |
| Organization | 6/10 | 10/10 | ✅ +67% |
| Folders | Mixed | Clean categories | ✅ Improved |

---

## 🔄 If Something Goes Wrong

### Restore from Backup

If you created a backup:
```bash
cd /home/sk/medellin-spark/mvp
rm -rf pitch-deck
mv pitch-deck-backup-YYYYMMDD pitch-deck
```

### Undo Individual Changes

```bash
# Move file back
mv research/RESEARCH_SUMMARY.md ./

# Rename folder back
mv diagrams mermaid

# Restore deleted file from git (if in git)
git checkout -- 01-project-overview.md
```

---

## ✅ Success Checklist

After reorganization, verify:

- [ ] All research files in `research/` folder (8 files)
- [ ] All historical docs in `notes/` folder (5+ files)
- [ ] No duplicate files exist
- [ ] `features-pitch/` folder deleted
- [ ] `mermaid/` renamed to `diagrams/`
- [ ] Root folder has only README.md and index files
- [ ] All docs in `docs/` folder intact (10 files)
- [ ] All tasks in `tasks/` folder intact

---

## 📝 Post-Reorganization

After completing reorganization:

1. **Test links**: Verify all README links still work
2. **Update any absolute paths** in documentation if needed
3. **Delete temporary files**:
   ```bash
   rm reorganize.sh  # If you created it
   ```
4. **Commit changes** (if using git):
   ```bash
   git add .
   git commit -m "docs: Reorganize pitch-deck documentation

   - Move research files to research/ folder
   - Move historical docs to notes/ folder
   - Delete 5 duplicate files
   - Rename mermaid/ to diagrams/
   - Update README with new structure

   Result: Cleaner organization, no duplicates, better navigation"
   ```

---

## 🎯 Quick Start After Reorganization

```bash
# Developers
cat docs/START-HERE.md

# Researchers
cat research/README.md

# QA
cat docs/08-testing-strategy.md
```

---

**Total Time**: 15-20 minutes
**Difficulty**: Easy (copy/paste commands)
**Risk**: Low (reversible operations)

---

**Status**: ✅ Ready to execute
**Last Updated**: January 2025
