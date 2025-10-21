# 🚀 Supabase Quick Start

## One-Command Setup

```bash
# Reset everything and verify
npx supabase db reset && npx supabase db diff -f verify
```

## Manual Seeding (with Pooler)

```bash
source .env
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/001_create_seed_users.sql
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/002_seed_data_only.sql
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/003_marketplace_sample_data.sql
```

## Verify Sample Data

```bash
source .env
psql "$SUPABASE_DB_URL_POOLER" -c "
SELECT 'Candidate Skills' as table_name, COUNT(*) as count FROM candidate_skills
UNION ALL SELECT 'Companies', COUNT(*) FROM companies
UNION ALL SELECT 'Venues', COUNT(*) FROM venues
UNION ALL SELECT 'Jobs', COUNT(*) FROM jobs
UNION ALL SELECT 'Job Skills', COUNT(*) FROM job_skills
UNION ALL SELECT 'Events', COUNT(*) FROM events
UNION ALL SELECT 'Event-Venue Links', COUNT(*) FROM event_venues
UNION ALL SELECT 'Tickets', COUNT(*) FROM tickets
UNION ALL SELECT 'Registrations', COUNT(*) FROM registrations
UNION ALL SELECT 'Sponsors', COUNT(*) FROM sponsors
UNION ALL SELECT 'Perks', COUNT(*) FROM perks
UNION ALL SELECT 'Perk Claims', COUNT(*) FROM perk_claims
UNION ALL SELECT 'Matches', COUNT(*) FROM matches
UNION ALL SELECT 'Saved Perks', COUNT(*) FROM saved_perks
UNION ALL SELECT 'Applications', COUNT(*) FROM applications
UNION ALL SELECT 'Waitlist', COUNT(*) FROM waitlist;
"
```

Expected output:
```
    table_name     | count
-------------------+-------
 Candidate Skills  |    15
 Companies         |     2
 Venues            |     3
 Jobs              |     3
 Job Skills        |     9
 Events            |     3
 Event-Venue Links |     2
 Tickets           |     5
 Registrations     |     3
 Sponsors          |     3
 Perks             |     4
 Perk Claims       |     2
 Matches           |     4
 Saved Perks       |     4
 Applications      |     4
 Waitlist          |     3
```

## Deploy to Production

```bash
export SUPABASE_ACCESS_TOKEN="sbp_xxx..."
npx supabase link --project-ref <your-ref>
npx supabase db push
```

## 📚 Full Documentation

- **Production Runbook**: `supabase/docs/SUPABASE_008_PRODUCTION_RUNBOOK.md`
- **Audit Summary**: `SUPABASE_AUDIT_SUMMARY.md`
- **File Organization**: `claude.md` (search for "FILE ORGANIZATION")

## ✅ Success Checklist

- [ ] `npx supabase db reset` completes with no errors
- [ ] Re-running seeds produces no duplicates
- [ ] All 21 tables have RLS enabled
- [ ] Authenticated users can read published content
- [ ] Users can only modify their own records

---

**Status**: ✅ Production Ready  
**Last Verified**: 2025-10-13
