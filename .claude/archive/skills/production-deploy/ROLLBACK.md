# Rollback Procedures

**Emergency rollback - when things go wrong.**

---

## Frontend Rollback

### Netlify
```bash
# List recent deploys
netlify deploy:list

# Rollback to previous
netlify rollback <deploy-id>
```

### Vercel
Go to dashboard → Select previous deployment → "Promote to Production"

---

## Edge Function Rollback

```bash
# Checkout previous version
git checkout v1.0.0

# Redeploy old version
supabase functions deploy chat
supabase functions deploy pitch-deck-assistant
supabase functions deploy generate-pitch-deck

# Return to current
git checkout main
```

---

## Database Rollback

### Create Rollback Migration
```bash
cd supabase/migrations
touch $(date +%Y%m%d%H%M%S)_rollback_change.sql

# Add rollback SQL
# Then apply:
supabase db push
```

---

**Emergency Contact:** support@supabase.com

**Keep calm and rollback safely.**
