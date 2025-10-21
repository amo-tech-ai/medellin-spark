# 📊 Seed Data Generation Summary

## Files Created

### 1. Migration: Fix Email Constraint ✅
**Location:** `/home/sk/medellin-spark/supabase/migrations/20251013020000_fix_organizers_email_constraint.sql`

**Purpose:** Fixes corrupted email validation regex in organizers table

**What it does:**
- Drops corrupted constraint containing copy-paste error text
- Adds proper email validation: `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$`

**Apply to cloud:**
```bash
# Via Supabase MCP (if connected)
mcp__supabase__apply_migration(...)

# Or via CLI
supabase db push
```

---

### 2. Seed Data File ✅
**Location:** `/home/sk/medellin-spark/supabase/seed.sql`

**Purpose:** Realistic test data for local development

**Contents:**
- 5 Auth Users (with bcrypt-hashed passwords)
- 5 Profiles (diverse roles)
- 2 Startup Profiles (1 verified, 1 pending)
- 2 Organizers (demonstrates 1:N relationship)
- 2 Candidates (job seekers)

**Personas Created:**

1. **Sofía Martínez** - Startup Founder
   - Company: GreenTech Solutions (Climate Tech)
   - Role: CEO & Co-founder
   - Verified startup ✓

2. **Carlos López** - Event Organizer
   - Organizes: Ruta N Medellín + Startup Weekend
   - Role: Community Director
   - Demonstrates: One user can have multiple organizer profiles

3. **Ana Rodríguez** - Developer Candidate
   - Experience: 5 years full-stack
   - Open to opportunities: Yes
   - Remote-friendly

4. **Diego Sánchez** - Multi-role (Startup + Candidate)
   - Company: TaskFlow AI (Pre-seed)
   - Also looking for: Co-founder opportunities
   - Demonstrates: User can be both startup founder AND job candidate

5. **María García** - Regular User
   - No special roles
   - Demonstrates: Not everyone needs to be startup/organizer/candidate

**Test Credentials (LOCAL ONLY):**
```
Email: sofia.martinez@medellin-spark.local
Password: password123

Email: carlos.lopez@medellin-spark.local
Password: password123

Email: ana.rodriguez@medellin-spark.local
Password: password123

Email: diego.sanchez@medellin-spark.local
Password: password123

Email: maria.garcia@medellin-spark.local
Password: password123
```

---

### 3. Documentation Guide ✅
**Location:** `/home/sk/medellin-spark/supabase/SEED_DATA_GUIDE.md`

**Purpose:** Best practices for managing seed data in Supabase

**Topics Covered:**
- Migrations vs Seeds (when to use each)
- Cloud vs Local differences
- Best practices (DO/DON'T)
- Idempotent inserts (ON CONFLICT)
- Deterministic UUIDs for testing
- Password hashing
- Troubleshooting common errors
- Complete checklist

---

## 🚀 Usage

### Local Development

```bash
# 1. Reset database (drops all data, re-runs migrations, applies seeds)
supabase db reset

# 2. Start local instance
supabase start

# 3. Test with seed credentials
# Visit: http://localhost:54323 (Supabase Studio)
# Email: sofia.martinez@medellin-spark.local
# Password: password123
```

### Cloud Deployment

```bash
# 1. Apply constraint fix migration
supabase db push

# 2. Create test users via Dashboard
# Go to: Supabase Dashboard → Authentication → Add User
# Note: seed.sql is NOT applied to cloud (local only)
```

---

## 🔍 What Makes This Seed Data "Best Practice"?

### ✅ Idempotent
- Uses `ON CONFLICT (id) DO NOTHING`
- Safe to run multiple times
- No duplicate key errors

### ✅ Realistic
- Colombian names and companies
- Medellín tech ecosystem context
- Real-world scenarios (verified/unverified startups, multi-role users)

### ✅ Diverse
- Different role combinations
- Some users have no special roles
- Demonstrates 1:1 and 1:N relationships

### ✅ Secure
- Uses `.local` TLD (clearly test data)
- Bcrypt-hashed passwords
- No production secrets

### ✅ Well-Documented
- Clear comments explaining each section
- Test credentials documented
- Dependency order explained

### ✅ Supabase Best Practices
- Separate seed.sql file (not in migrations/)
- Local-only (not applied to cloud)
- Works with auth.users local access
- Follows Supabase CLI conventions

---

## 🐛 Fixed Issues

### Issue #1: Corrupted Email Constraint ✅

**Before:**
```sql
constraint organizers_contact_email_check
  check ((contact_email ~* '^[^@]+@[^@]+\.[^@]+ best practices supabase ::text))
```

**After:**
```sql
constraint organizers_contact_email_check
  check ((contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'::text))
```

**Impact:** Email validation now works correctly

---

## 📋 Seed Data Summary

| Resource | Count | Notes |
|----------|-------|-------|
| Auth Users | 5 | Local development only (bcrypt passwords) |
| Profiles | 5 | 1:1 with auth.users |
| Startup Profiles | 2 | 1 verified, 1 pending verification |
| Organizers | 2 | Both owned by Carlos (demonstrates 1:N) |
| Candidates | 2 | Ana (developer) + Diego (CTO) |

### Role Distribution

| User | Profile | Startup | Organizer | Candidate |
|------|---------|---------|-----------|-----------|
| Sofía | ✓ | ✓ (GreenTech) | - | - |
| Carlos | ✓ | - | ✓✓ (2 orgs) | - |
| Ana | ✓ | - | - | ✓ |
| Diego | ✓ | ✓ (TaskFlow) | - | ✓ |
| María | ✓ | - | - | - |

**Total:** 5 users, 2 startups, 2 organizers, 2 candidates

---

## 🎯 Next Steps

### For Local Development

1. ✅ Apply email constraint fix
   ```bash
   supabase db reset
   ```

2. ✅ Seed data applied automatically
   - seed.sql runs after migrations

3. ✅ Test authentication
   - Use any of the 5 test credentials
   - Password: `password123` for all

4. ✅ Verify data
   - Check Supabase Studio: http://localhost:54323
   - Inspect tables: profiles, startup_profiles, organizers, candidates

### For Cloud Deployment

1. ✅ Push migration
   ```bash
   supabase db push
   ```

2. ⚠️ Seeds NOT applied (cloud doesn't use seed.sql)

3. 📝 Create test users manually
   - Via Supabase Dashboard → Authentication
   - Or via Supabase Auth API

---

## 📚 Documentation

All documentation available in:
- `/home/sk/medellin-spark/supabase/SEED_DATA_GUIDE.md` - Complete guide
- `/home/sk/medellin-spark/supabase/seed.sql` - Inline comments
- `/home/sk/medellin-spark/supabase/reports/SEED_DATA_SUMMARY.md` - This file

---

**Generated:** 2025-10-13
**Status:** ✅ Ready for local development
**Cloud Status:** Migration ready, seeds require manual creation

