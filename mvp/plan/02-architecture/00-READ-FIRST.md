# 📚 Architecture Documentation - Read First

**Last Updated**: October 18, 2025
**Status**: ✅ Clean and Organized
**Total Files**: 8 documents (75K of content)

---

## 🎯 Quick Start

### New to the Project?
**Read these 3 files in order** (2 hours total):

```
1. README.md (5 min)
   → Overview and orientation

2. 04-database-schema.md (1 hour) ⭐ MOST CRITICAL
   → Complete database design with ERD
   → Start here before coding!

3. 01-system-flowchart.md (20 min)
   → System architecture overview
```

### Need Specific Info?
- **Database questions** → `04-database-schema.md`
- **Architecture questions** → `01-system-flowchart.md`
- **User flows** → `05-user-journey.md`
- **Quick overview** → `README.md`

---

## 📋 Correct Reading Order

### Phase 1: Foundation (REQUIRED - Day 1)

#### 1️⃣ README.md (5 minutes)
**Purpose**: Quick orientation
**When**: Start here
**Size**: 1.3K

---

#### 2️⃣ 04-database-schema.md (1 hour) ⭐ MOST CRITICAL
**Purpose**: Complete database design
**When**: **READ THIS BEFORE ANY CODING!**
**Size**: 17K
**Contains**:
- Complete ERD diagram (Mermaid)
- All table relationships
- Foreign key constraints
- RLS security policies
- Data types and validations

**Why First**:
- Everything depends on database structure
- Understanding schema prevents costly refactors
- Critical for security (RLS policies)
- Most referenced document

**Key Learnings**:
- Use `profile_id` (NOT `user_id`) in foreign keys
- Never query `auth.users` directly (use `profiles` table)
- RLS must be enabled on ALL public tables
- Main tables: profiles, presentations, pitch_conversations

---

#### 3️⃣ 01-system-flowchart.md (20 minutes)
**Purpose**: High-level system architecture
**When**: After understanding database
**Size**: 11K
**Contains**:
- Frontend layer (React + Vite)
- Backend layer (Supabase)
- Data flow diagrams
- Component interactions

**Why Second**:
- Shows how database connects to frontend
- Explains overall architecture
- Identifies key components

---

#### 4️⃣ 05-user-journey.md (15 minutes)
**Purpose**: User flows and interactions
**When**: After system architecture
**Size**: 19K
**Contains**:
- Complete user journeys
- Wizard flow (core product)
- Dashboard interactions
- Edge cases and error handling

**Why Third**:
- Connects technical architecture to user experience
- Shows how features fit together
- Guides feature implementation

---

### Phase 2: Deep Dive (OPTIONAL - As Needed)

#### 5️⃣ 02-sequence-diagram.md (Optional)
**Purpose**: Component-level interactions
**When**: Building complex features
**Size**: 14K
**Use for**: Understanding how components communicate

---

#### 6️⃣ 03-state-diagram.md (Optional)
**Purpose**: Application state management
**When**: Debugging state issues
**Size**: 13K
**Use for**: Understanding state transitions

---

#### 7️⃣ 06-architecture-overview.md (Optional)
**Purpose**: Architecture summary
**When**: Quick reference
**Size**: 2.1K
**Use for**: High-level recap

---

## 📊 File Importance Matrix

| Priority | File | When to Read | Time |
|----------|------|--------------|------|
| 🔴 **CRITICAL** | 04-database-schema.md | **Before any coding** | 1 hour |
| 🔴 **HIGH** | README.md | Start of project | 5 min |
| 🔴 **HIGH** | 01-system-flowchart.md | Day 1 | 20 min |
| 🔴 **HIGH** | 05-user-journey.md | Day 1 | 15 min |
| 🟡 **MEDIUM** | 02-sequence-diagram.md | When building features | 20 min |
| 🟡 **MEDIUM** | 03-state-diagram.md | When debugging state | 20 min |
| 🟢 **LOW** | 06-architecture-overview.md | Quick reference | 5 min |

---

## ✅ Clean Structure (Post-Cleanup)

```
02-architecture/
├── 00-READ-FIRST.md              ← You are here
├── README.md                     Quick overview
├── 01-system-flowchart.md        System architecture
├── 02-sequence-diagram.md        Component interactions
├── 03-state-diagram.md           State management
├── 04-database-schema.md         ⭐ DATABASE (MOST CRITICAL)
├── 05-user-journey.md            User flows
├── 06-architecture-overview.md   Summary
└── ARCHITECTURE-REORGANIZATION.md Cleanup notes

✅ 8 files total
✅ No duplicates
✅ Clear hierarchy
✅ 75K of documentation
```

**Note**: `diagrams/` folder was deleted (100% duplicate of main files)

---

## 🎯 Success Checklist

After reading architecture docs, you should be able to answer:

### Database Understanding
- [ ] What are the main tables?
- [ ] How do `profiles` relate to `presentations`?
- [ ] What is RLS and why is it important?
- [ ] Where do I use `profile_id` vs `user_id`?

### System Architecture
- [ ] What is the frontend tech stack?
- [ ] What is the backend tech stack?
- [ ] How do API calls flow through the system?
- [ ] Where are Edge Functions deployed?

### User Journey
- [ ] How does the pitch deck wizard work?
- [ ] What are the main user flows?
- [ ] Where do users land after wizard?
- [ ] How do users edit presentations?

**If you can answer these, you're ready to start coding!** ✅

---

## 💡 Pro Tips

### Reading Strategy
- ✅ **Start with database** (most critical)
- ✅ **Read in order** (builds on previous knowledge)
- ✅ **Skip optional docs** initially (come back as needed)
- ✅ **Take notes** on key concepts

### Common Mistakes
- ❌ Skipping database schema (causes confusion later)
- ❌ Reading all docs at once (information overload)
- ❌ Not understanding RLS policies (security issues)
- ❌ Using `user_id` instead of `profile_id` (breaks queries)

### Time Management
- **Minimum viable understanding**: 1.5 hours (docs 1-4)
- **Comprehensive understanding**: 3 hours (all docs)
- **Quick refresh**: 15 minutes (04 + 01)

---

## 🔄 When to Re-read

### Database Schema (04)
- Before building any new feature
- When adding database tables
- When debugging data issues
- When writing security policies

### System Flowchart (01)
- When adding new pages
- When integrating APIs
- When architecting features

### User Journey (05)
- Before implementing user flows
- When designing UX
- When testing edge cases

---

## 📚 Related Documentation

### Project Root
- `/CLAUDE.md` - Project instructions
- `/mvp/core/IMPLEMENTATION-ORDER.md` - Build order guide
- `/mvp/MVP-INDEX.md` - Complete doc index

### Database
- `/supabase/migrations/` - Database migrations
- `04-database-schema.md` ⭐ - Schema reference

### Implementation
- `/mvp/core/03-presentations/` - Feature implementations
- `/mvp/core/05-reference/` - Design system

---

## ⚡ Quick Commands

```bash
# Read all architecture docs
cd /home/sk/medellin-spark/mvp/core/02-architecture

# Critical docs only (1.5 hours)
cat README.md
cat 04-database-schema.md    # Most important!
cat 01-system-flowchart.md
cat 05-user-journey.md

# Quick database reference
cat 04-database-schema.md | grep -A 20 "erDiagram"

# Quick architecture overview
cat 01-system-flowchart.md | grep -A 30 "flowchart"
```

---

## ✨ Summary

**8 files organized by priority and implementation order**

### Must Read (1.5 hours)
1. README.md - Overview
2. 04-database-schema.md ⭐ - Database (CRITICAL)
3. 01-system-flowchart.md - Architecture
4. 05-user-journey.md - User flows

### Optional (as needed)
5. 02-sequence-diagram.md - Component interactions
6. 03-state-diagram.md - State management
7. 06-architecture-overview.md - Summary

### Reference
8. ARCHITECTURE-REORGANIZATION.md - Cleanup notes

**Start with #2 (04-database-schema.md) - it's the most important!** ⭐

---

**Last Cleanup**: October 18, 2025
**Status**: ✅ Organized and Ready
**Duplicates**: None (diagrams/ folder removed)

---

*Welcome to the architecture docs! Start with 04-database-schema.md and work your way through.*
