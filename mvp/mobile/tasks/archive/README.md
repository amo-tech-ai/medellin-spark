# Archived Mobile Task Files

**Date Archived**: October 20, 2025
**Reason**: Replaced by reorganized versions

---

## What's Here

These are the **original task files** that were replaced by the new `01-*.md` files in the parent directory.

### Original Files (Archived)
```
0-PREREQUISITES.md        842 lines (replaced by 0-CORE-SETUP.md)
1-DASHBOARD.md            265 lines (replaced by 01-dashboard.md)
2-NAVIGATION.md           351 lines (replaced by 02-navigation.md)
3-PITCH-DECK-WIZARD.md    220 lines (replaced by 03-wizard.md)
4-FORMS-EVENTS.md         285 lines (replaced by 04-forms.md)
5-PERFORMANCE.md          188 lines (replaced by 05-performance.md)
6-TESTING.md              129 lines (replaced by 06-testing.md)
6.5-ACCESSIBILITY.md      297 lines (merged into 06-testing.md)
7-DEPLOYMENT.md           323 lines (not mobile-specific)
1-DASHBOARD-SIMPLE.md      70 lines (prototype)
```

---

## Why Were They Replaced?

### Problems with Original Files
1. **Too detailed** - 265-842 lines per file (overwhelming)
2. **Mixed priorities** - No separation of fundamentals vs advanced
3. **No success criteria** - Hard to verify tasks completed
4. **Premature optimization** - Included features not needed for MVP

### User Feedback
> "do not over complicate focus on fundamentals"
> "we need core setup"
> "keep it simple iterative development"

---

## New Files (Use These Instead)

Located in: `/home/sk/medellin-spark/mvp/docs/mobile/tasks/`

### New Structure
```
01-dashboard.md      180 lines (fundamentals + advanced separated)
02-navigation.md     180 lines (fundamentals + advanced separated)
03-wizard.md         180 lines (fundamentals + advanced separated)
04-forms.md          190 lines (fundamentals + advanced separated)
05-performance.md    190 lines (fundamentals + advanced separated)
06-testing.md        200 lines (fundamentals + advanced separated)
```

### Improvements
- ✅ 61% reduction in total lines
- ✅ Clear fundamentals at top, advanced at bottom
- ✅ Success criteria for every task
- ✅ Iterative development approach
- ✅ Focus on core functionality first

---

## Should You Use These Archived Files?

**NO** - Use the new `01-*.md` files instead.

These archived files are kept for:
- Reference (if you want to see what was removed)
- Comparison (to understand the changes)
- History (documentation of evolution)

---

## What Changed

### Example: Dashboard

**Original** (1-DASHBOARD.md - 265 lines):
- Mixed basic and advanced features
- No clear success criteria
- Long explanations
- Hard to know what's essential

**New** (01-dashboard.md - 180 lines):
- Fundamentals section: 3 core tasks (required)
- Advanced section: Optional enhancements
- Success criteria for each task
- Clear testing instructions

---

## Migration Guide

If you were using old files:

| Old File | New File | Changes |
|----------|----------|---------|
| 0-PREREQUISITES.md | 0-CORE-SETUP.md | Reduced 19 tasks → 2 tasks |
| 1-DASHBOARD.md | 01-dashboard.md | Added success criteria, separated advanced |
| 2-NAVIGATION.md | 02-navigation.md | Added success criteria, separated advanced |
| 3-PITCH-DECK-WIZARD.md | 03-wizard.md | Added success criteria, separated advanced |
| 4-FORMS-EVENTS.md | 04-forms.md | Added success criteria, separated advanced |
| 5-PERFORMANCE.md | 05-performance.md | Added success criteria, separated advanced |
| 6-TESTING.md | 06-testing.md | Added success criteria, separated advanced |
| 6.5-ACCESSIBILITY.md | 06-testing.md (advanced) | Merged into testing |
| 7-DEPLOYMENT.md | (Not mobile-specific) | Moved to deployment docs |

---

## Safe to Delete?

**Keep for now** - These files are useful for:
- Understanding what was simplified
- Reference if you need advanced details
- Historical documentation

**Can delete later** - Once you're comfortable with new files (1-2 weeks)

---

## Questions?

See the following files in parent directory:
- `REORGANIZATION-COMPLETE.md` - Full explanation of changes
- `FILES-STATUS.md` - Current file status
- `START-HERE.md` - How to get started with new files

---

**Status**: Archived, superseded by new files
**Use instead**: Files in `/home/sk/medellin-spark/mvp/docs/mobile/tasks/01-*.md`
