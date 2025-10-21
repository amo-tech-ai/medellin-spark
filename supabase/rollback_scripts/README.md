# Rollback Scripts - DANGER ZONE ⚠️

## ⛔ WARNING: DESTRUCTIVE OPERATIONS

This directory contains **DANGEROUS** rollback scripts that will **DELETE ALL DATA** if executed.

### Safety Rules

1. **NEVER** move these files back into `supabase/migrations/`
2. **NEVER** execute automatically via CI/CD
3. **ALWAYS** require explicit manual confirmation
4. **ALWAYS** backup database before running
5. **ONLY** use in development environments

### Files

- `_MANUAL_ONLY_down.sql` - Complete schema teardown (removes all tables, data, policies)

### How to Use (Development Only)

```bash
# STEP 1: Confirm you want to destroy everything
read -p "⚠️  This will DELETE ALL DATA. Type 'YES I UNDERSTAND' to continue: " confirm
if [ "$confirm" != "YES I UNDERSTAND" ]; then
  echo "Aborted."
  exit 1
fi

# STEP 2: Create backup first
pg_dump $DATABASE_URL > backup_before_rollback_$(date +%Y%m%d_%H%M%S).sql

# STEP 3: Execute rollback
psql $DATABASE_URL -f supabase/rollback_scripts/_MANUAL_ONLY_down.sql

# STEP 4: Verify
psql $DATABASE_URL -c "\dt"  # Should show empty or minimal tables
```

### Production Rollback

**DO NOT USE THESE SCRIPTS IN PRODUCTION**

For production rollback:
1. Use Supabase Dashboard → Database → Backups
2. Select restore point
3. Follow Supabase's restore procedure

See `SUPABASE_PRODUCTION_AUDIT.md` section on Disaster Recovery.

---

**Last Updated:** 2025-10-12
**Created By:** Database Architect Agent
