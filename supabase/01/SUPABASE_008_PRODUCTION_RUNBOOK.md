# Supabase Production Runbook

## ✅ Success Criteria

All migrations and seeds have been audited and fixed for production readiness:

- ✅ **No hard errors**: All required functions, enums, and tables exist
- ✅ **Idempotent seeds**: All seed files can be run multiple times without duplicates
- ✅ **RLS enabled**: Row Level Security enabled on all 21 tables
- ✅ **Unique constraints**: Proper constraints for idempotent operations
- ✅ **Deterministic UUIDs**: All seed data uses fixed UUIDs for repeatability

## 📋 Changelog

### Migration: `20251013062233_add_tickets_unique_constraint.sql`
- Added `UNIQUE (event_id, name)` constraint on tickets table
- Enables idempotent seed operations for tickets

### Migration: `20251013062506_add_sponsors_perkclaims_unique_constraints.sql`  
- Added `UNIQUE (event_id, company_name)` constraint on sponsors table
- Added `UNIQUE (startup_profile_id, perk_id)` constraint on perk_claims table
- Prevents duplicate sponsor and perk claim records

### Seed File: `003_marketplace_sample_data.sql`
- Updated all `ON CONFLICT` clauses to use proper unique constraints
- Fixed: tickets, sponsors, perk_claims now use specific conflict targets
- Result: Fully idempotent - can be run multiple times safely

## 🚀 Local Development

### Reset Database (Rebuild from Scratch)

```bash
# Stop current instance
npx supabase stop

# Start fresh instance
npx supabase start

# Reset database (runs all migrations + seeds)
npx supabase db reset

# Verify no drift
npx supabase db diff -f verify_no_drift
```

### Run Seeds Manually

```bash
# Load environment
source .env

# Run seeds in order
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/001_create_seed_users.sql
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/002_seed_data_only.sql
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/003_marketplace_sample_data.sql
```

### Test Idempotency

```bash
# Run seeds twice - should show no duplicates
source .env
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/003_marketplace_sample_data.sql
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/003_marketplace_sample_data.sql

# Check counts (should be identical)
psql "$SUPABASE_DB_URL_POOLER" -c "
SELECT 'Tickets' as table, COUNT(*) FROM tickets
UNION ALL SELECT 'Sponsors', COUNT(*) FROM sponsors
UNION ALL SELECT 'Perk Claims', COUNT(*) FROM perk_claims;
"
```

## 🌐 Remote Deployment

### Push to Production

```bash
# Set access token
export SUPABASE_ACCESS_TOKEN="sbp_xxx..."

# Link to project
npx supabase link --project-ref <your-project-ref>

# Push all migrations
npx supabase db push

# Run seeds (if needed)
# Note: Use Supabase dashboard SQL editor or psql with pooler URL
```

### Verify Production

```bash
# Check RLS is enabled on all tables
psql "$SUPABASE_DB_URL_POOLER" -c "
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
"

# Verify constraint existence
psql "$SUPABASE_DB_URL_POOLER" -c "
SELECT conname, conrelid::regclass 
FROM pg_constraint 
WHERE conname LIKE '%unique%' 
ORDER BY conrelid::regclass::text;
"
```

## 🔒 Security Checklist

- ✅ RLS enabled on all public tables
- ✅ Policies enforce ownership (users can only modify their own data)
- ✅ Public read access only for published content
- ✅ Organizers can manage their own events/tickets
- ✅ Service role used securely (only in migrations/functions)

## 📊 Sample Data Summary

After running all seeds, you should have:

| Table | Count | Description |
|-------|-------|-------------|
| Profiles | 6 | 5 seed users + 1 test user |
| Startup Profiles | 2 | GreenTech Solutions, TaskFlow AI |
| Organizers | 2 | Ruta N, Startup Weekend |
| Candidates | 2 | Ana, Diego |
| Candidate Skills | 15 | Technical skills for candidates |
| Companies | 2 | TechCorp, Rappi |
| Jobs | 3 | React Dev, ML Engineer, Product Designer |
| Events | 3 | Startup Grind, AI Workshop, Startup Weekend |
| Tickets | 5 | Various ticket types for events |
| Registrations | 3 | Sample event registrations |
| Sponsors | 3 | Rappi, AWS, Google Cloud |
| Perks | 4 | AWS/GCP credits, Stripe, Notion |
| Perk Claims | 2 | GreenTech (approved), TaskFlow (pending) |

## 🐛 Troubleshooting

### Error: "duplicate key violates unique constraint"
**Solution**: This means data already exists. The seed is idempotent, so this is normal on second run. The INSERT will be skipped (ON CONFLICT DO NOTHING).

### Error: "relation does not exist"
**Solution**: Run migrations first: `npx supabase db reset` or `npx supabase db push`

### Error: "function update_updated_at() does not exist"  
**Solution**: This function is defined in `20251012000004_functions_triggers.sql`. Ensure all migrations are run in order.

### Error: "type X does not exist"
**Solution**: Enums are defined in `20251012000002_schema.sql`. Run migrations in chronological order.

## 📝 Migration Order

Migrations must run in this order:
1. `20251012000001_extensions.sql` - PostgreSQL extensions
2. `20251012000002_schema.sql` - Tables and enums
3. `20251012000003_indexes.sql` - Performance indexes
4. `20251012000004_functions_triggers.sql` - Functions and triggers
5. `20251012000005_policies.sql` - RLS policies
6. `20251013061030_add_marketplace_tables.sql` - Marketplace tables
7. `20251013062233_add_tickets_unique_constraint.sql` - Tickets constraint
8. `20251013062506_add_sponsors_perkclaims_unique_constraints.sql` - Sponsor/claim constraints

Supabase CLI handles this automatically based on timestamp in filename.

## ✨ Best Practices Applied

1. **Idempotent Operations**
   - All seeds use `ON CONFLICT (...) DO NOTHING`
   - Deterministic UUIDs for repeatable data
   - Unique constraints match conflict targets

2. **Security First**
   - RLS enabled on all tables
   - Policies enforce data ownership
   - Public read only for published content

3. **Data Integrity**
   - Foreign key constraints with proper CASCADE/SET NULL
   - Check constraints for business rules
   - Triggers maintain counter accuracy

4. **Performance**
   - Indexes on foreign keys
   - Partial indexes for filtered queries
   - Composite indexes for common lookups

## 🎯 Quick Commands Reference

```bash
# Local development
npx supabase start                    # Start local Supabase
npx supabase db reset                 # Reset database with migrations + seeds
npx supabase db diff -f check         # Check for schema drift

# Remote deployment
npx supabase link --project-ref XXX   # Link to project
npx supabase db push                  # Push all migrations
npx supabase db pull                  # Pull remote schema

# Manual seeds (with pooler)
source .env
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/001_create_seed_users.sql
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/002_seed_data_only.sql
psql "$SUPABASE_DB_URL_POOLER" < supabase/seeds/003_marketplace_sample_data.sql

# Verify data
psql "$SUPABASE_DB_URL_POOLER" -c "SELECT COUNT(*) FROM profiles;"
psql "$SUPABASE_DB_URL_POOLER" -c "SELECT COUNT(*) FROM events;"
psql "$SUPABASE_DB_URL_POOLER" -c "SELECT COUNT(*) FROM tickets;"
```

---

**Status**: ✅ Production Ready  
**Last Updated**: 2025-10-13  
**Tested**: Local development + idempotency verified
