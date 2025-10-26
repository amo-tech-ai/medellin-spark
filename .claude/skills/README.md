# Medellin Spark - Custom Skills Guide

**Created**: October 18, 2025
**Last Updated**: October 19, 2025
**Total Skills**: 12 (2 general + 7 project + 3 frontend)
**Status**: ✅ Complete and Ready

---

## Quick Start

### Using a Skill

Skills are automatically discovered by Claude when relevant to your task. You can also explicitly invoke them:

```
Use the [skill-name] skill to [task description]
```

**Examples**:
- "Use the dev-checker skill to validate my code before commit"
- "Use the pitch-deck-generator skill to debug the wizard"
- "Use the testing-workflow skill to run E2E tests"

---

## Available Skills

### General Development Skills

#### 1. dev-checker
**Purpose**: Pre-commit validation and code quality checks
**When to use**: Before git commits or deployments
**Key features**:
- TypeScript type checking
- Build validation
- Pre-commit checklist

**Quick command**:
```
Use dev-checker to run pre-commit checks
```

**File**: `.claude/skills/dev-checker/SKILL.md`

---

#### 2. commit-helper
**Purpose**: Generate conventional commit messages
**When to use**: Creating git commits
**Key features**:
- Conventional commit format
- Clear commit structure
- Project conventions

**Quick command**:
```
Use commit-helper to create a commit message
```

**File**: `.claude/skills/commit-helper/SKILL.md`

---

### Project-Specific Skills

#### 3. pitch-deck-generator
**Purpose**: Guide through pitch deck generation workflow
**When to use**:
- Building/debugging wizard
- Testing AI chat interface
- Troubleshooting Edge Functions
- Understanding data flow

**Key features**:
- Complete architecture overview
- Workflow debugging steps
- Common issues & solutions
- Edge Function testing
- Database verification

**Quick commands**:
```
Use pitch-deck-generator to debug the wizard
Use pitch-deck-generator to test Edge Functions
Use pitch-deck-generator to verify the workflow
```

**File**: `.claude/skills/pitch-deck-generator/SKILL.md`

---

#### 4. supabase-migration
**Purpose**: Safe database migration creation and management
**When to use**:
- Creating new tables
- Modifying schema
- Adding RLS policies
- Database updates

**Key features**:
- Idempotent migration templates
- RLS security patterns
- Testing procedures
- Rollback strategies

**Quick commands**:
```
Use supabase-migration to create a new table
Use supabase-migration to add RLS policies
Use supabase-migration to verify migrations
```

**File**: `.claude/skills/supabase-migration/SKILL.md`

---

#### 5. testing-workflow
**Purpose**: Comprehensive testing from unit to E2E
**When to use**:
- Running tests
- Debugging test failures
- Setting up E2E tests
- Pre-deployment testing

**Key features**:
- Layer-by-layer testing (DB → Backend → Frontend → E2E)
- Playwright E2E tests
- MCP Chrome DevTools testing
- Pre-deployment checklist

**Quick commands**:
```
Use testing-workflow to run E2E tests
Use testing-workflow to verify the build
Use testing-workflow for pre-deployment checks
```

**File**: `.claude/skills/testing-workflow/SKILL.md`

---

#### 6. production-deploy
**Purpose**: Production deployment procedures
**When to use**:
- Deploying to production
- Release preparation
- Post-deployment verification
- Rollback procedures

**Key features**:
- Complete deployment checklist
- Security verification
- Performance optimization
- Rollback procedures
- Monitoring setup

**Quick commands**:
```
Use production-deploy to prepare for release
Use production-deploy to verify production readiness
Use production-deploy to rollback deployment
```

**File**: `.claude/skills/production-deploy/SKILL.md`

---

#### 7. docs-architect
**Purpose**: Generate comprehensive MVP documentation sets
**When to use**:
- Starting new project or major refactor
- Creating architecture documentation
- Building knowledge base
- Standardizing project documentation

**Key features**:
- Numbered documentation structure (001-009)
- Architecture diagrams with Mermaid
- Setup guides and checklists
- Best practices templates
- Validation criteria

**Quick commands**:
```
Use docs-architect to generate MVP documentation
Use docs-architect to create architecture documentation
Use docs-architect to update documentation with latest changes
```

**File**: `.claude/skills/docs-architect/SKILL.md`

---

### Frontend Development Skills

#### 8. frontend-dev (React Frontend Development)
**Purpose**: React component patterns and best practices
**When to use**:
- Building React components
- Implementing features
- Managing state with React Query
- Supabase integration

**Key features**:
- Component structure templates
- React Query hooks patterns
- Supabase database queries
- TypeScript interfaces
- Performance optimization
- shadcn/ui component usage

**Quick commands**:
```
Use frontend-dev to create a dashboard component
Use frontend-dev to add data fetching with React Query
Use frontend-dev to integrate Supabase authentication
```

**File**: `.claude/skills/frontend-dev/SKILL.md`

---

#### 9. ui-design (UI Design Implementation)
**Purpose**: Design system and UI implementation patterns
**When to use**:
- Creating new UI screens
- Implementing design system
- Building responsive layouts
- Improving visual consistency

**Key features**:
- Complete design system (colors, typography, spacing)
- Layout patterns (grids, flexbox, containers)
- Component design templates
- Responsive design techniques
- Loading and empty states
- Accessibility guidelines

**Quick commands**:
```
Use ui-design to create a landing page layout
Use ui-design to implement responsive dashboard
Use ui-design to design form with validation
```

**File**: `.claude/skills/ui-design/SKILL.md`

---

#### 10. frontend-builder (Component Builder)
**Purpose**: Automated component generation with full features
**When to use**:
- Generating new components quickly
- Creating consistent UI patterns
- Building forms, cards, lists, modals
- Adding tests automatically

**Key features**:
- Automated component generation
- TypeScript + Tailwind + shadcn/ui
- Accessibility built-in
- Responsive design automatic
- Test generation with Vitest
- Refactoring support

**Quick commands**:
```
Create EventCard component with title, date, imageUrl
Generate StatsWidget for dashboard with trend indicator
Add tests for UserProfile component
Refactor Navigation to use Tabs component
```

**File**: `.claude/skills/frontend-builder/SKILL.md`

---

## Skills Directory Structure

```
.claude/skills/
├── README.md                           ← This file
├── commit-helper/
│   └── SKILL.md                        General commit helper
├── dev-checker/
│   └── SKILL.md                        General pre-commit checks
├── docs-architect/
│   └── SKILL.md                        MVP documentation generator
├── pitch-deck-generator/
│   └── SKILL.md                        Pitch deck workflow guide
├── supabase-migration/
│   └── SKILL.md                        Database migration helper
├── testing-workflow/
│   └── SKILL.md                        Testing procedures
├── production-deploy/
│   └── SKILL.md                        Deployment procedures
├── frontend-dev/
│   └── SKILL.md                        React frontend patterns
├── ui-design/
│   └── SKILL.md                        UI design system
└── frontend-builder/
    └── SKILL.md                        Component generator
```

---

## Skill Categories

### By Development Phase

**Planning & Setup**:
- None specific (use general Claude capabilities)

**Development**:
- `dev-checker` - Code quality validation
- `pitch-deck-generator` - Feature development
- `supabase-migration` - Database changes

**Testing**:
- `testing-workflow` - All testing layers

**Deployment**:
- `commit-helper` - Git commits
- `production-deploy` - Release procedures

### By Technical Area

**Frontend**:
- `frontend-dev` - React component patterns
- `ui-design` - Design system & UI implementation
- `frontend-builder` - Automated component generation
- `pitch-deck-generator` - React components, UI flow
- `testing-workflow` - Component testing

**Backend**:
- `pitch-deck-generator` - Edge Functions
- `supabase-migration` - Database schema
- `testing-workflow` - API testing

**DevOps**:
- `dev-checker` - CI/CD checks
- `production-deploy` - Deployment
- `testing-workflow` - Integration tests

---

## Common Workflows

### Daily Development Workflow

```
1. Start: dev-checker (validate environment)
2. Code: pitch-deck-generator (feature work)
3. Database: supabase-migration (schema changes)
4. Test: testing-workflow (verify changes)
5. Commit: commit-helper (clean git history)
```

### Pre-Deployment Workflow

```
1. dev-checker (code quality)
2. testing-workflow (full test suite)
3. production-deploy (deployment checklist)
4. production-deploy (post-deploy verification)
```

### Debugging Workflow

```
1. pitch-deck-generator (identify issue)
2. testing-workflow (reproduce with tests)
3. dev-checker (verify fix)
4. commit-helper (document fix)
```

---

## How Skills Work

### Automatic Discovery

Claude automatically discovers and uses skills when:
- The task matches the skill's description
- The conversation context is relevant
- The skill can solve the current problem

### Explicit Invocation

You can explicitly request a skill:
```
"Use [skill-name] to [task]"
```

### Progressive Disclosure

Skills use 3-level information disclosure:

**Level 1**: Metadata (name, description)
→ Claude sees this first to decide relevance

**Level 2**: Instructions (how to use)
→ Loaded when skill is activated

**Level 3**: Resources (examples, templates)
→ Loaded when needed for specific tasks

---

## Creating New Skills

### When to Create a Skill

Create a skill when you have:
- Repeatable workflow
- Domain-specific knowledge
- Step-by-step procedures
- Project conventions

### Skill Template

```markdown
---
name: skill-name
description: Brief description (one sentence)
version: 1.0.0
---

# Skill Name

## Purpose
What this skill does and when to use it

## Quick Commands
Common commands and examples

## Common Issues & Fixes
Troubleshooting guide

## Quick Reference
Important commands/code snippets
```

### Adding a New Skill

1. Create folder: `.claude/skills/new-skill/`
2. Create file: `.claude/skills/new-skill/SKILL.md`
3. Add YAML frontmatter (name, description)
4. Write clear instructions
5. Test with Claude

---

## Skill Maintenance

### Updating Skills

When updating project architecture:
1. Review relevant skills
2. Update instructions/examples
3. Test updated workflows
4. Increment version number

### Testing Skills

```
1. Invoke skill explicitly
2. Verify Claude follows instructions
3. Check output matches expected
4. Test edge cases
```

### Version Control

- Skills are tracked in git (`.claude/skills/`)
- SKILL.md files include version numbers
- Update versions when making changes

---

## Integration with Project

### Skills + CLAUDE.md

**CLAUDE.md**: High-level project context
**Skills**: Detailed, actionable procedures

Skills complement CLAUDE.md by providing:
- Step-by-step workflows
- Troubleshooting guides
- Testing procedures
- Deployment checklists

### Skills + Documentation

Skills reference project documentation:
- Architecture: `/mvp/core/02-architecture/`
- Implementation: `/mvp/core/IMPLEMENTATION-ORDER.md`
- Testing: `/lovable-plan/docs/004-TESTING-STRATEGY-AND-IMPROVEMENTS.md`

---

## Troubleshooting Skills

### Skill Not Being Used

**Problem**: Claude isn't using the skill
**Solution**:
1. Check skill name matches task
2. Verify SKILL.md has YAML frontmatter
3. Explicitly invoke: "Use [skill-name] to..."

### Skill Instructions Unclear

**Problem**: Claude doesn't follow skill correctly
**Solution**:
1. Review SKILL.md instructions
2. Add more examples
3. Break down complex steps
4. Add troubleshooting section

### Skill Out of Date

**Problem**: Skill references old code/structure
**Solution**:
1. Review recent project changes
2. Update SKILL.md
3. Test updated workflow
4. Increment version

---

## Best Practices

### Writing Skills

✅ **DO**:
- Use clear, concise language
- Include concrete examples
- Add troubleshooting sections
- Keep instructions step-by-step
- Use code blocks for commands

❌ **DON'T**:
- Write long paragraphs
- Assume prior knowledge
- Skip error handling
- Forget to version
- Include sensitive data

### Using Skills

✅ **DO**:
- Invoke explicitly when needed
- Follow skill procedures
- Report issues/improvements
- Keep skills updated

❌ **DON'T**:
- Skip skill steps
- Modify production without testing
- Ignore skill warnings
- Create duplicate skills

---

## Performance Impact

### Token Usage

Skills use progressive disclosure to minimize token usage:
- Level 1 (metadata): ~50 tokens
- Level 2 (instructions): ~500-2000 tokens
- Level 3 (resources): ~1000-5000 tokens

### Loading Strategy

Claude loads skills:
1. Scans metadata (all skills)
2. Loads instructions (relevant skills only)
3. Loads resources (when explicitly needed)

---

## Security Considerations

### Safe Practices

✅ **Skills can**:
- Read project files
- Execute safe commands
- Create test data
- Run validation checks

❌ **Skills should NOT**:
- Contain API keys
- Include passwords
- Store sensitive data
- Execute destructive commands without confirmation

### Secure Command Examples

```bash
# ✅ Safe - Read only
pnpm tsc --noEmit

# ✅ Safe - Test environment
supabase db push --local

# ⚠️  Caution - Production impact
supabase db push --prod

# ❌ Dangerous - No safeguards
rm -rf node_modules
```

---

## Quick Reference

### Invoke Any Skill
```
Use [skill-name] to [task description]
```

### Check Available Skills
```
List available skills
```

### Get Skill Details
```
Show me details of the [skill-name] skill
```

### Update Skill
```
1. Edit .claude/skills/[skill-name]/SKILL.md
2. Increment version number
3. Test updated workflow
```

---

## Resources

### Project Documentation
- Architecture: `/mvp/core/02-architecture/`
- Implementation: `/mvp/core/IMPLEMENTATION-ORDER.md`
- Testing: `/lovable-plan/management/903-DAILY-TESTING-CHECKLIST.md`

### External Resources
- Claude Skills Docs: https://support.claude.com/en/articles/12512176-what-are-skills
- Skills Examples: https://www.claudeskills.org/docs/skills-cases
- Skills GitHub: https://github.com/anthropics/skills

---

## Summary

**12 Skills Active**:
- 2 General: dev-checker, commit-helper
- 7 Project-specific: pitch-deck-generator, supabase-migration, testing-workflow, production-deploy, chrome-dev-skill, playwright-e2e, docs-architect
- 3 Frontend: frontend-dev, ui-design, frontend-builder

**Coverage**:
- ✅ Development workflow (dev-checker, commit-helper)
- ✅ Frontend development (frontend-dev, ui-design, frontend-builder)
- ✅ Component generation (frontend-builder)
- ✅ Database management (supabase-migration)
- ✅ Testing procedures (testing-workflow, playwright-e2e)
- ✅ Deployment process (production-deploy)
- ✅ Code quality (dev-checker)
- ✅ Git workflow (commit-helper)
- ✅ Browser automation (chrome-dev-skill, playwright-e2e)
- ✅ Pitch deck workflow (pitch-deck-generator)
- ✅ Documentation generation (docs-architect)

**Status**: ✅ 100% Production ready (after cleanup Oct 19, 2025)

**Recent Updates**:
- ✅ Added frontend-builder skill for automated component generation (Oct 19)
- ✅ Added frontend-dev skill for React patterns (Oct 19)
- ✅ Added ui-design skill for design system (Oct 19)
- ✅ Added docs-architect skill for MVP documentation generation (Oct 19)
- ✅ Consolidated duplicate playwright skills (Oct 19)
- ✅ Removed empty supabase-connect folder (Oct 19)
- ✅ Added version numbers to all skills (Oct 19)
- 📊 See AUDIT-REPORT.md for detailed analysis

---

## Next Steps

### Using Skills Today
1. Try `dev-checker` before your next commit
2. Use `pitch-deck-generator` when debugging wizard
3. Invoke `testing-workflow` for E2E tests

### Extending Skills
1. Monitor which tasks are repetitive
2. Create new skills for common workflows
3. Share skills with team
4. Keep skills updated with project evolution

---

**Last Updated**: October 19, 2025
**Status**: ✅ Complete & Audited
**Total Skills**: 12 (consolidated & cleaned + 3 frontend)
**Total Documentation**: ~8000 lines

---

## 📊 Audit & Quality Reports

**Audit Report**: [AUDIT-REPORT.md](AUDIT-REPORT.md) - Full skills & agents detective audit  
**Relationship Map**: [RELATIONSHIP-MAP.md](RELATIONSHIP-MAP.md) - Agent–skill linkage visualization  
**Compliance Audit**: [SKILLS-AUDIT.md](SKILLS-AUDIT.md) - Anthropic best practices verification  
**Auto-Fix Script**: [skills-fix.sh](skills-fix.sh) - Cleanup automation

**System Readiness**: 100% ✅ (after Oct 19, 2025 cleanup)

---

*Skills make Claude more effective by providing domain-specific knowledge and repeatable procedures. Use them frequently!*
