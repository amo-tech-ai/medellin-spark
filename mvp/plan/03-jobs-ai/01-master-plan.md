# Medellín AI Jobs - Master Implementation Plan

## Vision
Add a lightweight AI-powered Job Marketplace + ATS on top of the existing Core CRM, reusing contacts/threads/messages for hiring communications.

## Strategy
1. **Reuse CRM foundation** - contacts, threads, messages, tasks already work
2. **Ship value fast** - jobs + applications first, AI after
3. **Keep it simple** - no over-automation, human-in-loop
4. **Build iteratively** - 5 clear stages with acceptance tests

---

## Stage 1: Foundation (Jobs + Applications)
**Goal:** Employers can post jobs, candidates can apply. No AI yet.

### Database Additions
```sql
-- Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id) NOT NULL,
  name TEXT NOT NULL,
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Jobs
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship', 'remote');
CREATE TYPE job_status AS ENUM ('draft', 'published', 'closed');

CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  owner_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  description_norm TEXT, -- AI-cleaned (Stage 2)
  location TEXT,
  type job_type NOT NULL,
  seniority TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'COP',
  status job_status DEFAULT 'draft',
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Job Skills (for matching)
CREATE TABLE job_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  weight INTEGER DEFAULT 1 -- importance 1-5
);

-- Candidates
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id), -- optional: if registered
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_e164 TEXT,
  linkedin TEXT,
  github TEXT,
  portfolio TEXT,
  resume_url TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Candidate Skills (extracted from resume)
CREATE TABLE candidate_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  level INTEGER DEFAULT 3 -- 1-5 proficiency
);

-- Applications
CREATE TYPE application_stage AS ENUM ('new', 'screening', 'interview', 'offer', 'hired', 'rejected');

CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) NOT NULL,
  candidate_id UUID REFERENCES candidates(id) NOT NULL,
  source TEXT, -- 'website', 'referral', 'linkedin'
  cover_letter TEXT,
  stage application_stage DEFAULT 'new',
  fit_score INTEGER, -- AI screening score (Stage 3)
  screening_answers JSONB, -- Stage 3
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_id, candidate_id)
);
```

### RLS Policies
- Default deny all
- Employers can manage their own jobs/companies
- Candidates can view published jobs
- Candidates can manage their own applications
- Public read for `jobs.status = 'published'`

### UI Pages
- `/jobs` - Public job list with filters (title, location, type)
- `/jobs/[id]` - Job detail page with Apply button
- `/dashboard/jobs` - Employer dashboard (create/edit/publish jobs)
- `/dashboard/jobs/[id]/applicants` - Applicant list for a job

### Components to Create
- `AddJobDialog.tsx` - Create/edit job form
- `JobCard.tsx` - Job list item
- `JobFilters.tsx` - Search and filter controls
- `ApplyDialog.tsx` - Application form with CV upload
- `ApplicantsList.tsx` - List of applicants with stage badges

### Acceptance Tests
✅ Employer can create a job and save as draft  
✅ Employer can publish job → visible on /jobs  
✅ Candidate can browse jobs with filters  
✅ Candidate can apply with CV upload  
✅ Employer can view applications for their jobs  
✅ Employer can update application stage manually  

### What NOT to Do
❌ No AI processing yet  
❌ No auto-scoring  
❌ No matching algorithm  
❌ Keep it manual and simple  

---

## Stage 2: AI Basics (Normalize + Extract)
**Goal:** Auto-fill skills and clean job descriptions with AI.

### AI Agents to Build
1. **JD Normalizer** - Cleans job descriptions, extracts skills/seniority/salary
2. **Resume Extractor** - Parses CV and fills candidate_skills

### Edge Functions
```typescript
// supabase/functions/jobs-normalize/index.ts
// Trigger: when job is saved
// Output: updates jobs.description_norm, adds job_skills

// supabase/functions/resume-extract/index.ts  
// Trigger: when resume uploaded
// Output: updates candidate_skills, candidate.tags
```

### Acceptance Tests
✅ When job saved → description_norm auto-filled  
✅ When job saved → job_skills table populated  
✅ When CV uploaded → candidate_skills auto-extracted  
✅ Skills appear in UI without manual entry  

### What NOT to Do
❌ No auto-publish (employers still review)  
❌ No complex NLP (simple keyword extraction OK)  

---

## Stage 3: Intelligence (Screening + Matching)
**Goal:** Score applications and find top matches automatically.

### AI Agents to Build
3. **Screening Q&A** - Generates questions, scores answers → fit_score
4. **Match & Rank** - Compares jobs ↔ candidates → matches table

### Database Additions
```sql
-- Matches (AI-generated recommendations)
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id),
  candidate_id UUID REFERENCES candidates(id),
  match_score INTEGER, -- 0-100
  reason TEXT, -- AI explanation
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_id, candidate_id)
);
```

### Edge Functions
```typescript
// supabase/functions/screening-score/index.ts
// Trigger: when application created
// Output: generates screening_answers, sets fit_score

// supabase/functions/match-rank/index.ts
// Trigger: manual button or cron
// Output: populates matches table
```

### UI Components
- `ScreeningQuestions.tsx` - Show/answer knockout questions
- `TopMatchesPanel.tsx` - Display ranked candidates with reasons
- `FitScoreBadge.tsx` - Visual score indicator

### Acceptance Tests
✅ When application created → screening questions generated  
✅ Candidate answers Qs → fit_score calculated  
✅ Click "Run Match" → Top Matches panel shows candidates  
✅ Each match shows score + reason  

### What NOT to Do
❌ No auto-rejection (humans decide)  
❌ No bias-inducing factors (name/photo/gender)  

---

## Stage 4: Outreach + Analytics
**Goal:** Draft personalized messages and show hiring metrics.

### AI Agents to Build
5. **Outreach Composer (HIL)** - Drafts personalized DM/email (no auto-send)

### Edge Functions
```typescript
// supabase/functions/outreach-draft/index.ts
// Trigger: when recruiter opens thread with candidate
// Output: prefills message draft (human approves before sending)
```

### UI Pages
- `/dashboard/analytics` - Pipeline metrics, time-to-fill charts
- Enhanced `/crm/inbox` - Show draft messages with edit/send

### Analytics Metrics
- Jobs published vs filled
- Time to first outreach
- Time to fill (published → hired)
- Qualified apply rate (% fit_score ≥ 70)
- Avg match_score of interviews

### Acceptance Tests
✅ Open candidate thread → AI draft message appears  
✅ Recruiter can edit draft before sending  
✅ Analytics dashboard shows pipeline funnel  
✅ Can export applications as CSV  

### What NOT to Do
❌ No auto-send (always human approval)  
❌ No spam (rate limits + opt-out respected)  

---

## Stage 5: Multi-Channel (WhatsApp + Instagram)
**Goal:** Send outreach via WhatsApp and Instagram DMs.

### Infrastructure
- Reuse existing `threads` and `messages` tables
- Add `channel` field support: 'email', 'whatsapp', 'instagram'
- Integrate WhatsApp Business API
- Integrate Instagram Graph API

### Edge Functions
```typescript
// supabase/functions/send-whatsapp/index.ts
// supabase/functions/send-instagram-dm/index.ts
```

### Acceptance Tests
✅ Can switch channel when composing outreach  
✅ WhatsApp messages appear in unified inbox  
✅ Instagram DMs appear in unified inbox  
✅ All messages linked to candidate thread  

---

## Implementation Order

### Week 1: Stage 1 Foundation
- Day 1-2: Database schema + RLS
- Day 3-4: Public job pages + filters
- Day 5-6: Employer dashboard + apply form
- Day 7: Test end-to-end (post → apply → view)

### Week 2: Stage 2 AI Basics
- Day 1-2: JD Normalizer edge function
- Day 3-4: Resume Extractor edge function
- Day 5-6: Update UI to show auto-filled fields
- Day 7: Test with real CVs

### Week 3: Stage 3 Intelligence
- Day 1-3: Screening Q&A + fit_score
- Day 4-6: Match & Rank algorithm
- Day 7: Test matching accuracy

### Week 4: Stage 4 Outreach + Analytics
- Day 1-3: Outreach Composer
- Day 4-6: Analytics dashboard
- Day 7: Polish + production ready

### Future: Stage 5 Multi-Channel
- Schedule after Stage 4 proven stable

---

## Key Success Metrics

### User Adoption
- Jobs posted per week
- Applications per job
- Time to first application

### AI Performance
- % jobs with auto-filled skills
- Avg fit_score accuracy
- Match score → interview rate

### Business Impact
- Time to fill (target: < 14 days)
- Qualified apply rate (target: > 50%)
- Offer acceptance rate (target: > 70%)

---

## Risk Mitigation

### Technical Risks
- **RLS complexity** → Use security definer functions
- **AI hallucination** → Always show confidence scores
- **Scale** → Start with batch processing, optimize later

### Product Risks
- **Over-automation** → Keep human approval checkpoints
- **Bias** → Redact sensitive info before AI scoring
- **Spam** → Rate limits + opt-out respected

---

## Next Steps

1. ✅ Review this plan
2. ⏳ Start Stage 1 database migration
3. ⏳ Build Stage 1 UI pages
4. ⏳ Test Stage 1 acceptance criteria
5. ⏳ Move to Stage 2

---

## Related Docs
- [Core CRM Implementation](../tasks/stage2/006-MASTER-PRODUCTION-TRACKER.md)
- [Jobs Wizard Plan](./011-JOBS-WIZARD-PLAN.md)
- [Validation Schemas](../../src/lib/validations/jobs.ts)
