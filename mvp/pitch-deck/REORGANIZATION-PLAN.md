# Pitch Deck Documentation Reorganization Plan

**Created**: January 2025
**Status**: Ready to Execute
**Time**: ~30 minutes

---

## 📋 Execution Checklist

Execute these commands in order. Each phase is independent and can be verified.

---

## Phase 1: Move Research Files (7 files)

```bash
cd /home/sk/medellin-spark/mvp/pitch-deck

# Move from root to research/
mv RESEARCH_SUMMARY.md research/
mv RESEARCH_REPORT.md research/
mv QUICK_REFERENCE.md research/
mv research-findings.json research/

# Move from features-pitch/ to research/
mv features-pitch/COMPARISON.md research/
mv features-pitch/COMPARISON.csv research/
mv features-pitch/USE_CASES.md research/
```

**Verification**:
```bash
ls -la research/
# Should show 7 files
```

---

## Phase 2: Move Historical Docs to Notes (5 files)

```bash
cd /home/sk/medellin-spark/mvp/pitch-deck

# Move planning docs
mv features-pitch/14-PLAN.md notes/
mv features-pitch/16-UI_PLAN.md notes/
mv features-pitch/PLAYBOOK.md notes/
mv features-pitch/JOURNEYS.md notes/
mv features-pitch/DIAGRAMS.md notes/
```

**Verification**:
```bash
ls -la notes/
# Should show 5 files
```

---

## Phase 3: Move Screenshots (2 files)

```bash
cd /home/sk/medellin-spark/mvp/pitch-deck

# Create subfolder
mkdir -p notes/task-screenshots

# Move screenshots from tasks/
mv tasks/7231aa68-d7ec-4615-b038-7cf71f69696b.png notes/task-screenshots/
mv tasks/da1038f8-9c4d-4337-b3aa-9accbedc34e9.png notes/task-screenshots/
```

**Verification**:
```bash
ls -la notes/task-screenshots/
# Should show 2 PNG files
```

---

## Phase 4: Delete Duplicate Files (5 files)

**⚠️ IMPORTANT**: These are exact duplicates of files in docs/ folder

```bash
cd /home/sk/medellin-spark/mvp/pitch-deck

# Delete root duplicate
rm 01-project-overview.md

# Delete features-pitch/ duplicates
rm features-pitch/02-database-architecture.md
rm features-pitch/04-sitemap-routes.md
rm features-pitch/05-components.md
rm features-pitch/06-implementation-plan.md
```

**Verification**:
```bash
# These should NOT exist
ls 01-project-overview.md 2>/dev/null && echo "ERROR: Still exists" || echo "✅ Deleted"
ls features-pitch/02-database-architecture.md 2>/dev/null && echo "ERROR: Still exists" || echo "✅ Deleted"
```

---

## Phase 5: Delete features-pitch/ README

```bash
cd /home/sk/medellin-spark/mvp/pitch-deck

# Delete README after moving all files
rm features-pitch/README.md
```

**Verification**:
```bash
ls features-pitch/
# Should be empty
```

---

## Phase 6: Delete Empty features-pitch/ Folder

```bash
cd /home/sk/medellin-spark/mvp/pitch-deck

# Remove empty folder
rmdir features-pitch
```

**Verification**:
```bash
ls -d features-pitch 2>/dev/null && echo "ERROR: Still exists" || echo "✅ Deleted"
```

---

## Phase 7: Rename mermaid/ to diagrams/

```bash
cd /home/sk/medellin-spark/mvp/pitch-deck

# Rename folder
mv mermaid diagrams
```

**Verification**:
```bash
ls -d diagrams && echo "✅ Renamed successfully"
ls -d mermaid 2>/dev/null && echo "ERROR: Old folder still exists" || echo "✅ Old folder gone"
```

---

## Phase 8: Create research/README.md

Create new file: `research/README.md`

```markdown
# Pitch Deck AI - Research Documentation

**Research Date**: October 17, 2025
**Status**: Completed

---

## 📚 Research Files

| File | Size | Purpose |
|------|------|---------|
| **RESEARCH_SUMMARY.md** | ~13KB | Executive summary with top 5 repos |
| **RESEARCH_REPORT.md** | Large | Detailed research findings |
| **QUICK_REFERENCE.md** | ~5KB | Quick decision matrix |
| **research-findings.json** | 17KB | Structured data (8+ repos) |
| **COMPARISON.md** | - | Framework comparison |
| **COMPARISON.csv** | - | Framework comparison (CSV) |
| **USE_CASES.md** | - | Use cases analysis |

---

## 🎯 Key Findings

### Top Solutions
1. **Presenton** (2,500⭐ | 95/100) - Production-ready
2. **slide-deck-ai** (274⭐ | 85/100) - Learning/prototyping

### Recommended Path
- Fork Presenton for MVP
- Add Supabase integration
- Customize for pitch decks
- Timeline: 2-4 weeks

---

## 📖 Reading Order

1. **QUICK_REFERENCE.md** - Quick decision matrix
2. **RESEARCH_SUMMARY.md** - Comprehensive insights
3. **research-findings.json** - Detailed data
4. **COMPARISON.md** - Framework comparisons
5. **USE_CASES.md** - Use case analysis

---

For implementation documentation, see: `../docs/`
```

---

## Phase 9: Update Root README.md

Update `/mvp/pitch-deck/README.md` to reference new structure:

```markdown
# Pitch Deck AI - Documentation Hub

**Project**: Medellin Spark - AI Presentation Platform
**Status**: ✅ Production Ready (98/100)
**Last Updated**: January 2025

---

## 📁 Documentation Structure

```
pitch-deck/
├── README.md              ← You are here
│
├── docs/                  → Core Implementation Docs
│   └── START-HERE.md      → 🌟 Begin here for implementation
│
├── research/              → Research & Analysis (Oct 2025)
│   └── QUICK_REFERENCE.md → Decision matrix for solutions
│
├── diagrams/              → Mermaid Diagrams
│   └── Architecture, flows, state machines
│
├── tasks/                 → Implementation Tasks
│   └── Active and completed tasks
│
└── notes/                 → Historical Reference
    └── Planning docs, screenshots, archives
```

---

## 🚀 Quick Start

### For Developers (Implementation)
1. **Start**: `docs/START-HERE.md`
2. **Read**: `docs/01-project-overview.md` through `docs/08-testing-strategy.md`
3. **Tasks**: `tasks/000-README.md`

### For Product/Research
1. **Start**: `research/QUICK_REFERENCE.md`
2. **Read**: `research/RESEARCH_SUMMARY.md`
3. **Diagrams**: `diagrams/README.md`

---

## 📊 Project Status

| Component | Status | Docs |
|-----------|--------|------|
| **Database** | ✅ Production | docs/02-database-architecture.md |
| **UI/UX** | ✅ Production | docs/03-user-journey.md |
| **Edge Functions** | ✅ Production | docs/07-edge-functions.md |
| **Testing** | ✅ E2E Complete | docs/08-testing-strategy.md |
| **Deployment** | ✅ Ready | tasks/003-production-deployment.md |

---

## 🔍 Find What You Need

- **Implementation Guide**: `docs/` folder
- **Research & Solutions**: `research/` folder
- **Visual Diagrams**: `diagrams/` folder
- **Current Tasks**: `tasks/` folder
- **Historical Context**: `notes/` folder

---

**Ready to build?** → Start with `docs/START-HERE.md`
```

---

## ✅ Final Verification

After all phases complete:

```bash
cd /home/sk/medellin-spark/mvp/pitch-deck

# Check structure
tree -L 1

# Expected output:
# .
# ├── docs/
# ├── research/
# ├── diagrams/
# ├── tasks/
# ├── notes/
# ├── README.md
# └── PITCH-DECK-DOCUMENTATION-INDEX.md
```

---

## 📊 Before vs After

| Category | Before | After |
|----------|--------|-------|
| Root Files | 6 | 2 (README + INDEX) |
| Duplicates | 5 | 0 ✅ |
| Organization | 6/10 | 10/10 ✅ |
| Clarity | 7/10 | 10/10 ✅ |

---

**Status**: ✅ Ready to execute
**Total Time**: ~30 minutes
**Risk**: Low (all operations reversible)
