# OAuth Schema Migration - Quick Reference Card

## 🚀 Apply Migration (3 Commands)

```bash
# 1. Navigate to project root
cd /home/sk/medellin-spark

# 2. Apply migration
npx supabase db push

# 3. Regenerate TypeScript types
npx supabase gen types typescript --local > src/integrations/supabase/types.ts
```

---

## ✅ Verify Migration (SQL Queries)

Run these in Supabase SQL Editor to verify success:

```sql
-- Check profiles table has new columns (should return 3 rows)
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('provider', 'provider_id', 'metadata');

-- Check new tables exist (should return 2 rows)
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('user_sessions', 'oauth_connections');

-- Verify RLS is enabled (all should show rowsecurity = true)
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'user_sessions', 'oauth_connections');
```

---

## 📋 What Was Added

### profiles table - 3 new columns:
- `provider` TEXT - OAuth provider name
- `provider_id` TEXT - External OAuth user ID
- `metadata` JSONB - OAuth metadata

### user_sessions table (NEW):
- Tracks login sessions per user
- Links to profiles table
- Stores IP, user agent, timestamps

### oauth_connections table (NEW):
- Stores OAuth tokens (access + refresh)
- Links to profiles table
- Tracks token expiration

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "relation profiles already exists" | ✅ Safe to ignore - migration is idempotent |
| "permission denied" | Check Supabase is running: `npx supabase status` |
| Migration won't apply | Reset database (⚠️ DELETES DATA): `npx supabase db reset` |
| Supabase not running | Start it: `npx supabase start` |

---

## 📖 Full Documentation

- **Complete details**: [`SCHEMA-CONSISTENCY-SUMMARY.md`](./SCHEMA-CONSISTENCY-SUMMARY.md)
- **Master plan**: [`00-auth-plan.md`](./00-auth-plan.md)
- **Migration file**: `supabase/migrations/20250113000000_add_oauth_fields.sql`

---

## 🎯 Next Steps After Migration

1. ✅ Verify all checks pass
2. Choose a provider to implement:
   - **Easiest**: [GitHub OAuth](./03-github.md)
   - **Most popular**: [Google OAuth](./05-google-implementation.md)
   - **Social**: [Facebook OAuth](./06-facebook-implementation.md)
   - **iOS/Privacy**: [Apple Sign-In](./07-apple-implementation.md)
   - **Professional**: [LinkedIn OIDC](./08-linkedin-implementation.md)

---

**Migration Required**: Yes - all OAuth implementations depend on this schema
**Time Required**: 5-10 minutes
**Difficulty**: Easy
**Reversible**: Yes (via database reset or rollback script)
