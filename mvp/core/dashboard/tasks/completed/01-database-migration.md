# Task 01: Database Migration

**Phase**: Foundation (Week 1, Day 1)
**Priority**: 🔴 CRITICAL
**Time**: 2-3 hours
**Dependencies**: None

---

## Objective

Create and apply database migration for dashboard requirements.

---

## Steps

### 1. Create Migration File

```bash
cd /home/sk/medellin-spark

# Create migration
cat > supabase/migrations/20250120000000_dashboard_requirements.sql << 'EOF'
-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interview', 'rejected', 'accepted')),
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_applications_profile ON job_applications(profile_id);
CREATE INDEX idx_job_applications_job ON job_applications(job_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);

-- Add location to events
ALTER TABLE events ADD COLUMN IF NOT EXISTS location TEXT;

-- Add view counts
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE presentations ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Create saved_jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, job_id)
);

CREATE INDEX idx_saved_jobs_profile ON saved_jobs(profile_id);
EOF
```

### 2. Apply Migration

```bash
npx supabase db push
```

### 3. Verify Tables

```bash
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -c "\dt" | grep -E "job_applications|saved_jobs"
```

---

## Success Criteria

- [ ] Migration file created
- [ ] Migration applies without errors
- [ ] All tables exist (`job_applications`, `saved_jobs`)
- [ ] All columns added (`location`, `view_count`)
- [ ] All indexes created

---

## Validation

```bash
# Check tables
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "\dt"

# Check columns
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "\d events"

# Test insert
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "SELECT * FROM job_applications LIMIT 1;"
```

---

## Next Task

→ **02-custom-hooks.md**
