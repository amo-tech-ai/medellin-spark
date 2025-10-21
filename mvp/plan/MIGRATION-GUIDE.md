# Plan Folder Reorganization - Migration Guide

**Date**: January 20, 2025
**Purpose**: Complete instructions for migrating to new folder structure
**Status**: Ready to execute

---

## 📊 What Changed

### Old Structure (Numbered 01-12)
```
01-reference/
02-architecture/
03-ui-design/
04-dashboard/
05-pitch-deck/
06-jobs-ai/
07-perks/
08-business-plan-ai/
09-multi-agent-systems/
10-qdrant/
11-copilotkit/
12-testing/
04-server-start.md (loose file)
```

### New Structure (Implementation 00-05, Support Folders)
```
00-setup/           ← NEW
01-dashboard/       ← Renamed from 04
02-pitch-deck/      ← Renamed from 05
03-jobs-ai/         ← Renamed from 06
04-perks/           ← Renamed from 07
05-business-plan-ai/ ← Renamed from 08

reference/          ← Renamed from 01
architecture/       ← Renamed from 02
ui-design/          ← Renamed from 03
research/           ← NEW (contains 09, 10, 11)
testing/            ← Renamed from 12
```

---

## ✅ Step 1: Copy Dashboard Documents

**Source**: `04-dashboard/`
**Destination**: `01-dashboard/`

```bash
cd /home/sk/medellin-spark/mvp/plan

# Copy all three documents
cp 04-dashboard/01-core.md 01-dashboard/
cp 04-dashboard/02-intermediate.md 01-dashboard/
cp 04-dashboard/03-advanced.md 01-dashboard/

# Verify copied
ls -la 01-dashboard/
# Expected: 3 files (01-core.md, 02-intermediate.md, 03-advanced.md)
```

---

## ✅ Step 2: Copy Pitch Deck Documents

**Source**: `05-pitch-deck/`
**Destination**: `02-pitch-deck/`

```bash
# Copy the correct versions (not duplicates)
cp 05-pitch-deck/01-core.md 02-pitch-deck/
cp 05-pitch-deck/02-intermediate.md 02-pitch-deck/
cp 05-pitch-deck/03-advanced.md 02-pitch-deck/

# Verify copied
ls -la 02-pitch-deck/
# Expected: 3 files
```

**Note**: `05-pitch-deck/` has duplicate file `01-pitch-deck-core.md` - ignore it, use `01-core.md`

---

## ✅ Step 3: Move Reference Materials

**Source**: `01-reference/`
**Destination**: `reference/`

```bash
# Move all reference docs
cp -r 01-reference/* reference/

# Verify
ls -la reference/
# Expected: All design system, color scheme, file structure docs
```

---

## ✅ Step 4: Move Architecture Docs

**Source**: `02-architecture/`
**Destination**: `architecture/`

```bash
# Move all architecture docs
cp -r 02-architecture/* architecture/

# Verify
ls -la architecture/
# Expected: Flowcharts, diagrams, database schema
```

---

## ✅ Step 5: Move UI Design Materials

**Source**: `03-ui-design/`
**Destination**: `ui-design/`

```bash
# Move UI design docs and folders
cp -r 03-ui-design/* ui-design/

# Verify
ls -la ui-design/
# Expected: components/, layouts/, wireframes/ folders + docs
```

---

## ✅ Step 6: Organize Research Folder

**Sources**: `09-multi-agent-systems/`, `10-qdrant/`, `11-copilotkit/`
**Destination**: `research/`

```bash
# Move research materials
cp -r 09-multi-agent-systems research/
cp -r 10-qdrant research/
cp -r 11-copilotkit research/

# Verify
ls -la research/
# Expected: 3 subdirectories
```

---

## ✅ Step 7: Move Testing Documentation

**Source**: `12-testing/`
**Destination**: `testing/`

```bash
# Move testing docs
cp -r 12-testing/* testing/

# Verify
ls -la testing/
# Expected: Testing strategy docs
```

---

## ✅ Step 8: Create Missing Documentation

These folders need new documents created (see REORGANIZATION-PROPOSAL.md for details):

### 03-jobs-ai/
**Status**: ⚠️ Needs restructuring

**Current content**:
- `06-jobs-ai/01-master-plan.md` → Use as reference
- `06-jobs-ai/02-architecture.md` → Use as reference

**Need to create**:
- `03-jobs-ai/01-core.md` - Job listings, search, basic UI
- `03-jobs-ai/02-intermediate.md` - AI matching, recommendations
- `03-jobs-ai/03-advanced.md` - Smart alerts, analytics

**Action**: Create these from scratch using dashboard/pitch-deck as templates

---

### 04-perks/
**Status**: ⚠️ Needs restructuring

**Current content**:
- `07-perks/01-implementation.md` → Use as reference
- `07-perks/02-prd.md` → Use as reference

**Need to create**:
- `04-perks/01-core.md` - Perks catalog, categories
- `04-perks/02-intermediate.md` - Claims, verification
- `04-perks/03-advanced.md` - Partner APIs, analytics

---

### 05-business-plan-ai/
**Status**: ⚠️ Needs restructuring

**Current content**:
- `08-business-plan-ai/01-master-plan.md` → Use as reference
- `08-business-plan-ai/02-implementation.md` → Use as reference

**Need to create**:
- `05-business-plan-ai/01-core.md` - Templates, basic editor
- `05-business-plan-ai/02-intermediate.md` - AI generation
- `05-business-plan-ai/03-advanced.md` - Financial modeling, export

---

## ✅ Step 9: Update Main README

**Action**: Replace old README with new one

```bash
# Backup old README
mv README.md README-OLD.md

# Use new README
mv README-NEW.md README.md

# Verify
head -20 README.md
# Should show: "Medellin AI - Complete System Implementation Plan"
```

---

## ✅ Step 10: Clean Up Old Folders (Optional)

**⚠️ Only do this AFTER verifying all content copied successfully**

```bash
# Remove old numbered folders
rm -rf 01-reference/
rm -rf 02-architecture/
rm -rf 03-ui-design/
rm -rf 04-dashboard/
rm -rf 05-pitch-deck/
rm -rf 06-jobs-ai/
rm -rf 07-perks/
rm -rf 08-business-plan-ai/
rm -rf 09-multi-agent-systems/
rm -rf 10-qdrant/
rm -rf 11-copilotkit/
rm -rf 12-testing/

# Remove loose file
rm 04-server-start.md

# Remove duplicate proposal
rm REORGANIZATION-PROPOSAL.md
```

---

## 📋 Verification Checklist

After completing migration, verify:

### Implementation Folders Exist
- [ ] `00-setup/` exists with 3 docs (01-core, 02-intermediate, 03-advanced)
- [ ] `01-dashboard/` exists with 3 docs
- [ ] `02-pitch-deck/` exists with 3 docs
- [ ] `03-jobs-ai/` exists (ready for new docs)
- [ ] `04-perks/` exists (ready for new docs)
- [ ] `05-business-plan-ai/` exists (ready for new docs)

### Support Folders Exist
- [ ] `reference/` has design system docs
- [ ] `architecture/` has diagrams and schemas
- [ ] `ui-design/` has components, layouts, wireframes
- [ ] `research/` has multi-agent, qdrant, copilotkit
- [ ] `testing/` has testing docs

### Documentation Complete
- [ ] `README.md` is new version (not old)
- [ ] All implementation guides have 3 files each
- [ ] No loose files in root
- [ ] No duplicate content

---

## 🎯 Quick Migration Script

Run all steps at once (use with caution):

```bash
#!/bin/bash
# migration.sh - Run from /home/sk/medellin-spark/mvp/plan

# Create new folders (already done)
# Directories already created: 00-setup, 01-dashboard, 02-pitch-deck, etc.

# Copy dashboard
echo "Copying dashboard..."
cp 04-dashboard/*.md 01-dashboard/ 2>/dev/null || echo "Dashboard copy failed"

# Copy pitch-deck
echo "Copying pitch-deck..."
cp 05-pitch-deck/01-core.md 02-pitch-deck/ 2>/dev/null || echo "Pitch-deck copy failed"
cp 05-pitch-deck/02-intermediate.md 02-pitch-deck/ 2>/dev/null || echo "Pitch-deck copy failed"
cp 05-pitch-deck/03-advanced.md 02-pitch-deck/ 2>/dev/null || echo "Pitch-deck copy failed"

# Copy reference
echo "Copying reference..."
cp -r 01-reference/* reference/ 2>/dev/null || echo "Reference copy failed"

# Copy architecture
echo "Copying architecture..."
cp -r 02-architecture/* architecture/ 2>/dev/null || echo "Architecture copy failed"

# Copy UI design
echo "Copying UI design..."
cp -r 03-ui-design/* ui-design/ 2>/dev/null || echo "UI design copy failed"

# Copy research
echo "Copying research..."
cp -r 09-multi-agent-systems research/ 2>/dev/null || echo "Multi-agent copy failed"
cp -r 10-qdrant research/ 2>/dev/null || echo "Qdrant copy failed"
cp -r 11-copilotkit research/ 2>/dev/null || echo "CopilotKit copy failed"

# Copy testing
echo "Copying testing..."
cp -r 12-testing/* testing/ 2>/dev/null || echo "Testing copy failed"

# Update README
echo "Updating README..."
mv README.md README-OLD.md
mv README-NEW.md README.md

echo "✅ Migration complete! Check each folder to verify."
```

**To use**:
```bash
chmod +x migration.sh
./migration.sh
```

---

## 🚨 Troubleshooting

### Files Not Copying?
- Check file permissions: `ls -la 04-dashboard/`
- Use absolute paths: `/home/sk/medellin-spark/mvp/plan/04-dashboard/01-core.md`
- Try manual copy with Read tool in Claude Code

### Folders Don't Exist?
- Run directory creation commands from REORGANIZATION-PROPOSAL.md
- Verify current directory: `pwd` (should be `.../mvp/plan`)

### Missing Documents?
- Check source folders still exist
- Look in old numbered folders (01-12)
- Reference REORGANIZATION-PROPOSAL.md for content locations

---

## 📞 Next Steps

After migration complete:

1. **Verify structure**: Run verification checklist above
2. **Test one feature**: Try `00-setup/01-core.md` to verify guides work
3. **Create missing docs**: Write jobs-ai, perks, business-plan docs
4. **Remove old folders**: Only after verification complete
5. **Commit changes**: `git add . && git commit -m "Reorganize plan folder structure"`

---

**Created**: January 20, 2025
**Status**: ✅ Ready to execute
**Time Required**: 15-30 minutes
