# 📋 Documentation Reorganization - Executable Tasks

**Created**: October 19, 2025
**Estimated Time**: 12-16 hours (over 2-3 weeks)
**Status**: Ready to execute
**Reference**: See DOCUMENTATION-INDEX-AND-OPTIMIZATION.md for complete analysis

---

## ✅ Quick Win Tasks (Do First - 1 hour)

### Task 1.1: Delete Duplicate Files (15 min)
**Impact**: Remove clutter immediately
**Risk**: Low (duplicates confirmed)

```bash
cd /home/sk/medellin-spark/mvp/notes

# Delete duplicate files
rm 01-master-reference-duplicate.md
rm 02-design-system-duplicate.md
rm 03-color-scheme-duplicate.md
rm 04-file-structure-duplicate.md
rm 05-decision-matrix-duplicate.md

# Delete duplicate folder
rm -rf 01-getting-started-duplicate/
```

**Validation**: `ls -la notes/ | grep duplicate` returns nothing

---

### Task 1.2: Delete Outdated Navigation Files (10 min)
**Impact**: Remove outdated index files
**Risk**: Low (replaced by new structure)

```bash
cd /home/sk/medellin-spark/mvp/notes

# Delete outdated navigation
rm INDEX.md
rm MVP-INDEX.md
rm ORGANIZATION_VISUAL.md
rm QUICK_NAVIGATION.md
rm START_HERE_FIRST.md
rm WHATS_NEXT.md
```

**Validation**: `ls notes/` should only show 001-features.md

---

### Task 1.3: Move Useful File (5 min)
**Impact**: Preserve useful content
**Risk**: None

```bash
mv /home/sk/medellin-spark/mvp/notes/001-features.md \
   /home/sk/medellin-spark/mvp/core/05-reference/features.md
```

**Validation**: File exists in core/05-reference/

---

### Task 1.4: Delete Empty notes/ Folder (1 min)
**Impact**: Clean structure
**Risk**: None

```bash
rmdir /home/sk/medellin-spark/mvp/notes
```

**Validation**: `ls mvp/` should not show notes/

---

### Task 1.5: Delete Empty Integration Folder (1 min)
**Impact**: Remove placeholder
**Risk**: None

```bash
rmdir /home/sk/medellin-spark/mvp/advanced/04-integrations
```

**Validation**: `ls mvp/advanced/` should not show 04-integrations

---

**Phase 1 Complete**: 32 minutes, -13 files, cleaner structure ✅

---

## 🗂️ Organization Tasks (Do Second - 30 min)

### Task 2.1: Create Advanced Folders (2 min)
**Impact**: Organize AI documentation
**Risk**: None

```bash
cd /home/sk/medellin-spark/mvp/advanced

mkdir -p 04-copilotkit
mkdir -p 05-vector-db
```

**Validation**: Folders exist in advanced/

---

### Task 2.2: Move CopilotKit Documentation (5 min)
**Impact**: Group AI docs
**Risk**: Low (copy first, verify, then delete)

```bash
cd /home/sk/medellin-spark/mvp

# Move CopilotKit files
mv docs/009-COPILOTKIT-STATE-MACHINE-ANALYSIS.md advanced/04-copilotkit/
mv docs/COPILOTKIT-ADVANCED-FEATURES.md advanced/04-copilotkit/
mv docs/COPILOTKIT-COMPLETE-GUIDE.md advanced/04-copilotkit/
mv docs/COPILOTKIT-DEEP-ANALYSIS-MEDELLIN-AI.md advanced/04-copilotkit/
mv docs/COPILOTKIT-QUICK-SUMMARY.md advanced/04-copilotkit/

# Create README
cat > advanced/04-copilotkit/README.md << 'EOF'
# CopilotKit Integration

AI-powered copilot features for presentation generation.

## Documentation
- COPILOTKIT-QUICK-SUMMARY.md - Quick overview
- COPILOTKIT-COMPLETE-GUIDE.md - Full integration guide
- COPILOTKIT-ADVANCED-FEATURES.md - Advanced capabilities
- COPILOTKIT-DEEP-ANALYSIS-MEDELLIN-AI.md - Deep dive
- 009-COPILOTKIT-STATE-MACHINE-ANALYSIS.md - State machine design

## Status
🔴 Research only - not implemented yet
EOF
```

**Validation**: 5 files in advanced/04-copilotkit/ + README

---

### Task 2.3: Move Vector Database Documentation (3 min)
**Impact**: Organize DB docs
**Risk**: None

```bash
cd /home/sk/medellin-spark/mvp

# Move Qdrant guide
mv docs/QDRANT-VECTOR-DATABASE-GUIDE.md advanced/05-vector-db/

# Create README
cat > advanced/05-vector-db/README.md << 'EOF'
# Vector Database (Qdrant)

Vector database integration for semantic search and RAG.

## Documentation
- QDRANT-VECTOR-DATABASE-GUIDE.md - Complete setup guide

## Status
🔴 Future feature - not implemented
EOF
```

**Validation**: 1 file + README in advanced/05-vector-db/

---

### Task 2.4: Handle Implementation Roadmap (5 min)
**Impact**: Proper placement
**Risk**: Low (merge into architecture doc later)

```bash
cd /home/sk/medellin-spark/mvp

# Move to root for now (will merge into 002-architecture.md later)
mv docs/IMPLEMENTATION-ROADMAP.md ./IMPLEMENTATION-ROADMAP.md
```

**Validation**: File in mvp/ root

---

### Task 2.5: Delete Empty docs/ Folder (1 min)
**Impact**: Clean structure
**Risk**: None

```bash
rmdir /home/sk/medellin-spark/mvp/docs
```

**Validation**: `ls mvp/` should not show docs/

---

### Task 2.6: Merge Pitch Deck Overview (5 min)
**Impact**: Consolidate feature docs
**Risk**: Low (will create 004-core-features.md later)

```bash
# Keep for now - will merge into 004-core-features.md in Phase 4
# Just note the location: mvp/pitch-deck/01-project-overview.md
```

**Validation**: File noted for later merge

---

### Task 2.7: Move Prompt Example (2 min)
**Impact**: Better organization
**Risk**: None

```bash
cd /home/sk/medellin-spark/mvp

# Create reference folder (will expand in Phase 5)
mkdir -p reference

# Move prompt
mv prompts/01-test.md reference/prompt-examples.md

# Delete empty prompts folder
rmdir prompts
```

**Validation**: File in reference/, no prompts/ folder

---

**Phase 2 Complete**: 23 minutes, AI docs organized ✅

---

## 🔀 Consolidation Tasks (Do Third - 30 min)

### Task 3.1: Audit Dashboard Documentation (10 min)
**Impact**: Identify duplicates
**Risk**: None (read-only)

```bash
# Compare dashboard docs
diff -r /home/sk/medellin-spark/mvp/core/dashboard/ \
        /home/sk/medellin-spark/mvp/intermediate/01-dashboard/

# List unique files in each
ls core/dashboard/
ls intermediate/01-dashboard/
```

**Output**: List of duplicate vs unique files

---

### Task 3.2: Create Dashboard Merge Plan (5 min)
**Impact**: Plan consolidation
**Risk**: None (planning only)

Review comparison and create merge strategy:
- Files in core/dashboard only: Keep
- Files in intermediate/01-dashboard only: Move to core/dashboard
- Files in both: Keep core/ version (newer)

**Output**: Written merge plan

---

### Task 3.3: Execute Dashboard Merge (10 min)
**Impact**: Single source of truth
**Risk**: Medium (backup first)

```bash
cd /home/sk/medellin-spark/mvp

# Backup first
cp -r intermediate/01-dashboard intermediate/01-dashboard.backup

# Move unique files from intermediate to core
# (Specific files depend on Task 3.1 results - run manually)

# Example (adjust based on your findings):
# mv intermediate/01-dashboard/16-decktopus-mvp-startup-pitch.md \
#    core/dashboard/
# mv intermediate/01-dashboard/17-decktopus-integration-guide.md \
#    core/dashboard/
```

**Validation**: All dashboard docs in core/dashboard/

---

### Task 3.4: Delete Intermediate Dashboard (3 min)
**Impact**: Remove duplicate folder
**Risk**: Low (after backup)

```bash
# Only after verifying merge is correct
rm -rf /home/sk/medellin-spark/mvp/intermediate/01-dashboard
rm -rf /home/sk/medellin-spark/mvp/intermediate/01-dashboard.backup
```

**Validation**: `ls intermediate/` should not show 01-dashboard

---

### Task 3.5: Update Dashboard README (2 min)
**Impact**: Clear documentation
**Risk**: None

Add to core/dashboard/README.md:
```markdown
# Dashboard

**Status**: ✅ Complete (merged from intermediate/01-dashboard)
**Implementation**: Week 3-4
**Dependencies**: Presentations, Auth

## Recent Updates
- October 19, 2025: Merged intermediate dashboard docs
- Consolidated Decktopus integration guides
```

**Validation**: README updated

---

**Phase 3 Complete**: 30 minutes, dashboard consolidated ✅

---

## 📝 MVP Documentation Tasks (Do Fourth - 3-4 hours)

### Task 4.1: Generate 001-overview.md (20 min)
**Command**: Use docs-architect skill
**Impact**: Executive summary created
**Risk**: None

```
Use docs-architect to create 001-overview.md with:
- Project purpose and vision
- Key stakeholders
- Success metrics
- Scope (included/excluded)
- Technology stack summary
```

**Source Content**:
- mvp/00-START-HERE.md
- mvp/README.md
- mvp/pitch-deck/01-project-overview.md
- CLAUDE.md project overview

**Validation**: File exists, <500 lines, includes executive summary

---

### Task 4.2: Generate 002-architecture.md (30 min)
**Command**: Use docs-architect skill
**Impact**: Consolidated architecture documentation
**Risk**: None

```
Use docs-architect to create 002-architecture.md with:
- System architecture overview
- Key components (Frontend, Backend, Database, AI)
- Design decisions with rationale
- Data flow diagrams
- Integration architecture
```

**Source Content**:
- core/02-architecture/*.md (all 9 files)
- IMPLEMENTATION-ROADMAP.md
- CLAUDE.md architecture section

**Validation**: File exists, includes Mermaid diagrams, design rationale

---

### Task 4.3: Generate 003-setup-guide.md (25 min)
**Command**: Use docs-architect skill
**Impact**: Complete environment setup guide
**Risk**: None

```
Use docs-architect to create 003-setup-guide.md with:
- Prerequisites
- Environment setup (Node, pnpm, Supabase)
- Database setup and migrations
- Environment variables
- Verification steps
```

**Source Content**:
- mvp/core/01-getting-started/04-server-start.md
- CLAUDE.md setup commands
- core/IMPLEMENTATION-ORDER.md Phase 0

**Validation**: Complete setup working from zero

---

### Task 4.4: Generate 004-core-features.md (30 min)
**Command**: Use docs-architect skill
**Impact**: Feature documentation
**Risk**: None

```
Use docs-architect to create 004-core-features.md with:
- Pitch Deck Wizard (AI-powered)
- Presentation Editor
- User authentication
- Template system
- Implementation examples
```

**Source Content**:
- core/03-presentations/*.md (all 6 files)
- pitch-deck/01-project-overview.md
- CLAUDE.md features section

**Validation**: All core features documented

---

### Task 4.5: Generate 005-data-models.md (25 min)
**Command**: Use docs-architect skill
**Impact**: Database documentation
**Risk**: None

```
Use docs-architect to create 005-data-models.md with:
- Complete database schema
- Table relationships (ERD)
- RLS policies
- Indexes and constraints
- Migration guide
```

**Source Content**:
- core/02-architecture/04-database-schema.md
- supabase/migrations/*.sql
- CLAUDE.md database section

**Validation**: Accurate schema documentation

---

### Task 4.6: Generate 006-integration-points.md (25 min)
**Command**: Use docs-architect skill
**Impact**: API and integration docs
**Risk**: None

```
Use docs-architect to create 006-integration-points.md with:
- Supabase API integration
- OpenAI API integration (Edge Functions)
- Authentication flow
- External APIs
- Webhook endpoints
```

**Source Content**:
- core/03-presentations/05-ai-setup.md
- CLAUDE.md API section
- supabase/functions/*/index.ts

**Validation**: All integration points documented

---

### Task 4.7: Generate 007-best-practices.md (20 min)
**Command**: Use docs-architect skill
**Impact**: Development standards
**Risk**: None

```
Use docs-architect to create 007-best-practices.md with:
- Code style (TypeScript, React)
- File structure conventions
- Naming conventions
- Security best practices
- Testing practices
```

**Source Content**:
- CLAUDE.md code style section
- core/05-reference/01-design-system.md
- core/dashboard/006-SUPABASE-REACT-BEST-PRACTICES.md

**Validation**: Clear, actionable standards

---

### Task 4.8: Generate 008-success-criteria.md (20 min)
**Command**: Use docs-architect skill
**Impact**: Success metrics
**Risk**: None

```
Use docs-architect to create 008-success-criteria.md with:
- Functional requirements checklist
- Performance benchmarks
- Security validation
- User acceptance criteria
- Production readiness checklist
```

**Source Content**:
- intermediate/04-testing/00-PRODUCTION-READINESS-TRACKER.md
- intermediate/04-testing/FINAL-TEST-SUMMARY.md
- CLAUDE.md pre-deployment checklist

**Validation**: Clear success metrics

---

### Task 4.9: Generate 009-workflow-checklist.md (20 min)
**Command**: Use docs-architect skill
**Impact**: Implementation guide
**Risk**: None

```
Use docs-architect to create 009-workflow-checklist.md with:
- Daily development workflow
- Pre-commit checklist
- Testing workflow
- Deployment workflow
- Troubleshooting guide
```

**Source Content**:
- core/IMPLEMENTATION-ORDER.md
- CLAUDE.md development commands
- intermediate/04-testing/03-QUICK-REFERENCE.md

**Validation**: Actionable workflow steps

---

**Phase 4 Complete**: 3-4 hours, all 9 MVP docs created ✅

---

## 📚 Reference Documentation Tasks (Do Fifth - 2 hours)

### Task 5.1: Create API Reference (30 min)
**Impact**: Complete API documentation
**Risk**: None

Create reference/api-reference.md with:
- Supabase API endpoints
- Edge Function APIs
- Authentication endpoints
- Request/response examples
- Error codes

**Source**: Analyze supabase/functions/

---

### Task 5.2: Create Database Schema Reference (30 min)
**Impact**: Detailed schema docs
**Risk**: None

Create reference/database-schema-full.md with:
- Complete table definitions
- All column types and constraints
- Full RLS policy SQL
- Index definitions
- Migration history

**Source**: supabase/migrations/*.sql

---

### Task 5.3: Create Deployment Guide (30 min)
**Impact**: Production deployment
**Risk**: None

Create reference/deployment-guide.md with:
- Environment configuration
- Build process
- Supabase deployment
- Edge Function deployment
- DNS and SSL setup

**Source**: CLAUDE.md deployment section

---

### Task 5.4: Create Troubleshooting Guide (30 min)
**Impact**: Problem resolution
**Risk**: None

Create reference/troubleshooting.md with:
- Common build errors
- Database connection issues
- Authentication problems
- Performance issues
- Debug strategies

**Source**: CLAUDE.md troubleshooting section

---

**Phase 5 Complete**: 2 hours, reference docs created ✅

---

## 🔄 Renaming Tasks (Do Sixth - 15 min)

### Task 6.1: Rename Core Folders (10 min)
**Impact**: Sequential numbering
**Risk**: Medium (update references)

```bash
cd /home/sk/medellin-spark/mvp/core

# Rename folders
mv 02-architecture 01-architecture
mv 03-presentations 02-presentations
mv 04-ui-design 03-ui-design
# dashboard is already in correct position as 04- (after merge)
```

**Validation**: Folders numbered 01-05 sequentially

---

### Task 6.2: Update References in IMPLEMENTATION-ORDER.md (5 min)
**Impact**: Fix broken links
**Risk**: Low

Update all folder references:
- `02-architecture/` → `01-architecture/`
- `03-presentations/` → `02-presentations/`
- `04-ui-design/` → `03-ui-design/`

**Validation**: All links work

---

**Phase 6 Complete**: 15 minutes, consistent numbering ✅

---

## 🔗 Cross-Reference Tasks (Do Seventh - 30 min)

### Task 7.1: Add Cross-References to MVP Docs (15 min)
**Impact**: Easy navigation
**Risk**: None

Add links between 001-009 docs:
- 001 → 002, 008
- 002 → 005, 006
- 003 → 004
- 004 → 006, 009
- etc.

**Validation**: All cross-references work

---

### Task 7.2: Update README Files (15 min)
**Impact**: Clear navigation
**Risk**: None

Update:
- mvp/README.md (new structure)
- mvp/00-START-HERE.md (new structure)
- mvp/core/README.md (renamed folders)
- mvp/intermediate/README.md (removed dashboard)
- mvp/advanced/README.md (new folders)

**Validation**: All READMEs accurate

---

**Phase 7 Complete**: 30 minutes, navigation improved ✅

---

## 🚀 Production Documentation (Do Eighth - 1 hour)

### Task 8.1: Create PRD.md (20 min)
**Impact**: Formal requirements
**Risk**: None

Create docs/PRD.md (project root) with:
- Product vision
- Target users
- Core features
- Non-functional requirements
- Success metrics

---

### Task 8.2: Create CHANGELOG.md (15 min)
**Impact**: Version tracking
**Risk**: None

Create docs/CHANGELOG.md with:
- Version history
- Feature additions
- Bug fixes
- Breaking changes

---

### Task 8.3: Create CONTRIBUTING.md (15 min)
**Impact**: Contributor guide
**Risk**: None (if open source)

Create docs/CONTRIBUTING.md with:
- Code style
- Pull request process
- Testing requirements
- Documentation standards

---

### Task 8.4: Create SECURITY.md (10 min)
**Impact**: Security policies
**Risk**: None

Create docs/SECURITY.md with:
- Reporting vulnerabilities
- Security best practices
- Responsible disclosure

---

**Phase 8 Complete**: 1 hour, production-ready ✅

---

## ✅ Final Validation Checklist

- [ ] Zero duplicate files (`find mvp/ -name "*duplicate*"` = 0 results)
- [ ] All 9 MVP docs exist (001-009)
- [ ] Reference docs complete (4 files)
- [ ] Dashboard in single location (core/04-dashboard)
- [ ] AI docs grouped (advanced/04-copilotkit, advanced/05-vector-db)
- [ ] Cross-references working
- [ ] All README files updated
- [ ] Production docs created (PRD, CHANGELOG)
- [ ] No empty folders
- [ ] All links valid

---

## 📊 Execution Summary

| Phase | Duration | Status |
|-------|----------|--------|
| 1. Cleanup | 30 min | ⬜ Not started |
| 2. Organization | 30 min | ⬜ Not started |
| 3. Consolidation | 30 min | ⬜ Not started |
| 4. MVP Docs | 3-4 hours | ⬜ Not started |
| 5. Reference Docs | 2 hours | ⬜ Not started |
| 6. Renaming | 15 min | ⬜ Not started |
| 7. Cross-References | 30 min | ⬜ Not started |
| 8. Production Docs | 1 hour | ⬜ Not started |
| **Total** | **12-16 hours** | **0% Complete** |

---

**Ready to execute** - Start with Phase 1 (safest changes)
