# Jobs Marketplace - System Architecture

## Overview
The Jobs system extends the Core CRM by adding hiring-specific tables while reusing contacts, threads, and messages for communication.

---

## Data Model

```
┌─────────────────────────────────────────────────────────────┐
│                     CORE CRM (Existing)                      │
├─────────────────────────────────────────────────────────────┤
│  profiles          → user identity                           │
│  contacts          → people in system                        │
│  threads           → conversation containers                 │
│  messages          → individual messages                     │
│  tasks             → follow-up items                         │
│  notes             → contact notes                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    (reused for hiring)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    JOBS MODULE (New)                         │
├─────────────────────────────────────────────────────────────┤
│  companies         → hiring organizations                    │
│  jobs              → job postings                            │
│  job_skills        → required skills per job                 │
│  candidates        → job seekers (may link to profiles)      │
│  candidate_skills  → candidate skills + levels               │
│  applications      → job ↔ candidate link                    │
│  matches           → AI-ranked job/candidate pairs           │
└─────────────────────────────────────────────────────────────┘
```

---

## Table Relationships

```
profiles (1) ──→ (N) companies (employer owns companies)
         │
         └──→ (N) jobs (employer owns jobs)

companies (1) ──→ (N) jobs

jobs (1) ──→ (N) job_skills
     │
     └──→ (N) applications
     │
     └──→ (N) matches

candidates (1) ──→ (N) candidate_skills
           │
           └──→ (N) applications
           │
           └──→ (N) matches

profiles (0..1) ──→ (0..1) candidates (optional link if registered)
```

---

## User Roles

```
┌──────────────┬──────────────────────────────────────────┐
│ Role         │ Permissions                               │
├──────────────┼──────────────────────────────────────────┤
│ admin        │ Full access to all jobs/companies        │
│ organizer    │ Can post jobs for their companies        │
│ member       │ Can apply to jobs, view public listings  │
│ anonymous    │ Can browse published jobs                │
└──────────────┴──────────────────────────────────────────┘
```

---

## Page Routes

```
PUBLIC
/jobs                    → Job list with filters
/jobs/[id]               → Job detail + Apply button

EMPLOYER (organizer/admin)
/dashboard/jobs          → Manage jobs (create/edit/publish)
/dashboard/jobs/[id]/applicants  → View applicants for a job

SHARED (reused from CRM)
/crm/inbox               → Threads/messages with candidates
/crm/contacts            → Contact management
/crm/tasks               → Follow-up tasks
```

---

## Data Flow: Posting a Job

```
1. Employer creates job
   ├─→ POST /api/jobs
   │   └─→ Insert into jobs (status='draft')
   │
2. (Stage 2) AI normalizes description
   ├─→ Edge function: jobs-normalize
   │   └─→ Updates jobs.description_norm
   │   └─→ Inserts job_skills
   │
3. Employer reviews and publishes
   ├─→ PATCH /api/jobs/[id]
   │   └─→ Sets status='published'
   │
4. Job appears on /jobs (public)
```

---

## Data Flow: Applying to a Job

```
1. Candidate uploads CV + submits form
   ├─→ POST /api/applications
   │   └─→ Upload resume to storage.resumes
   │   └─→ Insert into candidates
   │   └─→ Insert into applications
   │
2. (Stage 2) AI extracts skills from resume
   ├─→ Edge function: resume-extract
   │   └─→ Inserts candidate_skills
   │
3. (Stage 3) AI generates screening questions
   ├─→ Edge function: screening-score
   │   └─→ Updates applications.fit_score
   │   └─→ Stores screening_answers
   │
4. Employer sees application in dashboard
   ├─→ GET /api/jobs/[id]/applications
   │   └─→ Shows fit_score, stage, resume link
```

---

## Data Flow: Matching

```
1. Employer clicks "Run Match"
   ├─→ POST /api/match/run?job_id=...
   │
2. Edge function compares job ↔ candidates
   ├─→ Fetch job_skills
   ├─→ Fetch all candidate_skills
   ├─→ Calculate overlap score
   │
3. Writes to matches table
   └─→ INSERT matches (job_id, candidate_id, match_score, reason)
   │
4. UI shows "Top Matches" panel
   └─→ GET /api/matches?job_id=...
```

---

## Data Flow: Outreach (Stage 4)

```
1. Employer opens thread with candidate
   ├─→ GET /api/threads?candidate_id=...
   │
2. AI drafts personalized message
   ├─→ Edge function: outreach-draft
   │   └─→ Returns draft text (not sent)
   │
3. Employer edits and approves
   ├─→ POST /api/messages
   │   └─→ Inserts into messages
   │   └─→ Sends via email (or WA/IG in Stage 5)
```

---

## AI Agent Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        AI AGENTS                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. JD Normalizer                                            │
│     Input:  jobs.description (raw text)                      │
│     Output: jobs.description_norm + job_skills               │
│     Trigger: On job save                                     │
│                                                               │
│  2. Resume Extractor                                         │
│     Input:  resume PDF/DOC                                   │
│     Output: candidate_skills + candidate.tags                │
│     Trigger: On resume upload                                │
│                                                               │
│  3. Screening Q&A                                            │
│     Input:  job requirements + candidate profile             │
│     Output: screening questions + fit_score                  │
│     Trigger: On application created                          │
│                                                               │
│  4. Match & Rank                                             │
│     Input:  job_skills + candidate_skills                    │
│     Output: matches with scores + reasons                    │
│     Trigger: Manual or cron                                  │
│                                                               │
│  5. Outreach Composer (HIL)                                  │
│     Input:  job + candidate profile                          │
│     Output: draft message (human approves)                   │
│     Trigger: On thread open                                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Storage Buckets

```
resumes/
  └─ {candidate_id}/
      └─ resume.pdf

logos/
  └─ {company_id}/
      └─ logo.png
```

---

## RLS Security Model

### Jobs Table
```sql
-- Public read for published jobs
CREATE POLICY "Public can view published jobs"
ON jobs FOR SELECT
USING (status = 'published');

-- Employers manage their own jobs
CREATE POLICY "Employers manage own jobs"
ON jobs FOR ALL
USING (owner_id IN (
  SELECT id FROM profiles WHERE user_id = auth.uid()
));
```

### Applications Table
```sql
-- Candidates can create applications
CREATE POLICY "Candidates can apply"
ON applications FOR INSERT
WITH CHECK (true); -- validated by form

-- Employers can view applications for their jobs
CREATE POLICY "Employers view own applications"
ON applications FOR SELECT
USING (job_id IN (
  SELECT id FROM jobs WHERE owner_id IN (
    SELECT id FROM profiles WHERE user_id = auth.uid()
  )
));
```

---

## Edge Functions

```
supabase/functions/
├─ jobs-normalize/         (Stage 2)
│  └─ index.ts             → Clean JD, extract skills
│
├─ resume-extract/         (Stage 2)
│  └─ index.ts             → Parse CV, extract skills
│
├─ screening-score/        (Stage 3)
│  └─ index.ts             → Generate Qs, score fit
│
├─ match-rank/             (Stage 3)
│  └─ index.ts             → Calculate job ↔ candidate scores
│
├─ outreach-draft/         (Stage 4)
│  └─ index.ts             → Draft personalized message
│
└─ send-whatsapp/          (Stage 5)
   └─ index.ts             → Send via WhatsApp Business API
```

---

## Tech Stack

### Frontend
- React + TypeScript
- TanStack Query (data fetching)
- React Hook Form + Zod (validation)
- Tailwind CSS (styling)
- Shadcn UI (components)

### Backend (Lovable Cloud)
- Supabase Postgres (database)
- Supabase Storage (resume files)
- Supabase Edge Functions (AI agents)
- Lovable AI Gateway (AI models)

### AI Models (via Lovable AI)
- `google/gemini-2.5-flash` (default)
- `google/gemini-2.5-pro` (complex reasoning)
- `openai/gpt-5-mini` (optional alternative)

---

## API Endpoints

### Public
```
GET  /api/jobs              → List published jobs (with filters)
GET  /api/jobs/:id          → Job detail
POST /api/applications      → Submit application
```

### Employer
```
POST   /api/jobs            → Create job
PATCH  /api/jobs/:id        → Update job (including publish)
DELETE /api/jobs/:id        → Delete job
GET    /api/jobs/:id/applicants  → List applicants
PATCH  /api/applications/:id     → Update stage
POST   /api/match/run       → Run matching algorithm
```

### AI
```
POST /api/normalize         → Normalize job description
POST /api/extract-resume    → Extract skills from CV
POST /api/screen            → Generate screening questions
POST /api/outreach-draft    → Draft outreach message
```

---

## Analytics Dashboard Metrics

```
Pipeline Funnel
├─ Jobs published
├─ Total applications
├─ Qualified applicants (fit_score ≥ 70)
├─ Interviews scheduled
├─ Offers extended
└─ Hires made

Performance
├─ Time to first application (hrs)
├─ Time to first interview (days)
├─ Time to fill (days)
└─ Qualified apply rate (%)

Quality
├─ Avg fit_score of interviews
├─ Avg match_score of interviews
└─ Offer acceptance rate (%)
```

---

## Deployment Strategy

### Stage 1 (Week 1)
- Database schema
- Public job pages
- Apply flow
- Employer dashboard

### Stage 2 (Week 2)
- JD Normalizer
- Resume Extractor

### Stage 3 (Week 3)
- Screening Q&A
- Match & Rank

### Stage 4 (Week 4)
- Outreach Composer
- Analytics Dashboard

### Stage 5 (Future)
- WhatsApp integration
- Instagram integration

---

## Success Criteria

### Stage 1
- Jobs can be posted and applied to
- No AI features yet

### Stage 2
- Skills auto-filled from JD and CV

### Stage 3
- Fit scores and match rankings work

### Stage 4
- Draft messages auto-generated
- Metrics dashboard complete

### Production Ready
- All acceptance tests pass
- Performance: < 2s page loads
- Security: All RLS policies tested
- UX: Mobile responsive
- Docs: User guide + API reference
