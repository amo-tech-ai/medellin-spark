# Supabase Quick Reference Card

**Project:** Medellín Spark AI Hub
**Last Updated:** 2025-10-13

---

## 🚀 Quick Start

### Local Development (3 Steps)

```bash
# 1. Start
npx supabase start

# 2. Create Users
open http://localhost:54323
# Auth → Users → Add 5 users (see credentials below)

# 3. Seed Data
psql postgresql://postgres:postgres@localhost:54322/postgres -f supabase/seed-fixed.sql
```

### Cloud Production (3 Steps)

```bash
# 1. Verify migrations applied
node scripts/test-db-connection.js

# 2. Create users via Dashboard
open https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/users
# Click "Add User" for each test user (see credentials below)

# 3. Apply seed data
node scripts/apply-seed-data.js
```

---

## 🔑 Test Credentials

| Email | Password | Role |
|-------|----------|------|
| sofia.martinez@medellin-spark.local | password123 | Startup Founder |
| carlos.lopez@medellin-spark.local | password123 | Event Organizer |
| ana.rodriguez@medellin-spark.local | password123 | Developer |
| diego.sanchez@medellin-spark.local | password123 | Multi-role |
| maria.garcia@medellin-spark.local | password123 | Regular User |

---

## 🔗 URLs

| Service | URL |
|---------|-----|
| Studio | http://localhost:54323 |
| API | http://localhost:54321 |
| Database | postgresql://postgres:postgres@localhost:54322/postgres |
| Cloud | https://dhesktsqhcxhqfjypulk.supabase.co |

---

## 📋 Common Commands

```bash
# Status
npx supabase status

# Start/Stop
npx supabase start
npx supabase stop

# Reset (⚠️  deletes all data)
npx supabase db reset

# Apply migrations to cloud
npx supabase db push

# Generate TypeScript types
npx supabase gen types typescript --local > types/database.ts

# View logs
npx supabase logs

# Connect to database
psql postgresql://postgres:postgres@localhost:54322/postgres
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port conflict | `npx supabase stop --project-id asrzdtpyrdgyggqdfwwl` |
| No auth users | Create manually in Studio → Auth → Users |
| Profiles not created | Check auth users exist first |
| Migration errors | Check `supabase/IMPLEMENTATION_SUMMARY.md` |

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `SUPABASE_QUICK_REFERENCE.md` | This file |
| `supabase/SETUP_COMPLETE_GUIDE.md` | Full setup instructions |
| `supabase/SEED_DATA_GUIDE.md` | Best practices |
| `supabase/IMPLEMENTATION_SUMMARY.md` | What was fixed |
| `claude.md` → Workflow 5 | Seed workflow documentation |

---

## ✅ Verification Checklist

- [ ] `npx supabase status` shows "Started"
- [ ] Studio accessible at localhost:54323
- [ ] 5 auth users in Auth → Users
- [ ] 5 profiles in Table Editor → profiles
- [ ] 2 startups in startup_profiles
- [ ] 2 organizers in organizers
- [ ] 2 candidates in candidates
- [ ] Can login with test credentials

---

## 🔐 Security Notes

**⚠️  Test credentials are for LOCAL DEVELOPMENT ONLY**
- Never use .local emails in production
- Never commit real passwords
- Always use Supabase Dashboard for cloud users

---

## 🎯 Next Steps

1. Test frontend login
2. Verify RLS policies
3. Check security advisor: `mcp__supabase__get_advisors`
4. Review logs for warnings
5. Start building features!

---

**Need Help?**
See `supabase/SETUP_COMPLETE_GUIDE.md` for detailed instructions.
