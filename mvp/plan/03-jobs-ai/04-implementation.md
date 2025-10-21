# Stage 1: Foundation - Implementation Checklist

## Goal
Employers can post jobs, candidates can apply. **No AI yet - keep it simple.**

---

## ✅ Step 1: Database Schema (30 min)

### SQL Migration
Run migration to create:
- ✅ `companies` table
- ✅ `jobs` table with status enum
- ✅ `job_skills` table
- ✅ `candidates` table
- ✅ `candidate_skills` table
- ✅ `applications` table with stage enum

### RLS Policies
- ✅ Employers can manage their jobs/companies
- ✅ Public can view published jobs
- ✅ Candidates can create applications
- ✅ Employers can view applications for their jobs

**Test:** Can query tables without permission errors

---

## ✅ Step 2: Validation Schemas (15 min)

### Update `src/lib/validations/jobs.ts`
Already exists! Confirm it has:
- ✅ `jobBasicsSchema` 
- ✅ `jobRequirementsSchema`
- ✅ `jobCompensationSchema`

**Test:** Import and use in forms

---

## ✅ Step 3: Public Job Pages (1 hour)

### `/jobs` - Job List Page
Create/update `src/pages/Jobs.tsx`:
- ✅ Fetch jobs with `status = 'published'`
- ✅ Search by title
- ✅ Filter by type, location, skills
- ✅ Job cards with company, location, salary
- ✅ Link to `/jobs/[id]`

### `/jobs/[id]` - Job Detail Page
Create `src/pages/JobDetail.tsx`:
- ✅ Fetch single job with company info
- ✅ Show full description
- ✅ Show skills/requirements
- ✅ "Apply" button → opens ApplyDialog

**Test:** Browse jobs, click to view details

---

## ✅ Step 4: Apply Flow (1 hour)

### `ApplyDialog.tsx`
Create `src/components/jobs/ApplyDialog.tsx`:
- ✅ Form: name, email, phone (optional)
- ✅ Resume upload to storage bucket `resumes`
- ✅ Cover letter textarea
- ✅ Submit creates candidate + application
- ✅ Success toast + close dialog

**Test:** Apply to a job, verify data in database

---

## ✅ Step 5: Employer Dashboard (2 hours)

### `/dashboard/jobs` - Jobs List
Create `src/pages/dashboard/Jobs.tsx`:
- ✅ List jobs owned by current user
- ✅ Status badges (draft, published, closed)
- ✅ "New Job" button → opens AddJobDialog
- ✅ Edit/Publish/Close actions per job
- ✅ Link to applicants page

### `AddJobDialog.tsx`
Already exists at `src/components/jobs/AddJobDialog.tsx`!
- ✅ Update to use new `jobs` table schema
- ✅ Add company selection/creation
- ✅ Save as draft by default
- ✅ "Publish" button sets status = 'published'

### `/dashboard/jobs/[id]/applicants` - Applicants List
Create `src/pages/dashboard/JobApplicants.tsx`:
- ✅ Fetch applications for job
- ✅ Show candidate info, resume link
- ✅ Stage dropdown (new → screening → interview → offer → hired/rejected)
- ✅ Update stage on change
- ✅ Link to candidate profile or create thread

**Test:** Create job, publish it, view applications

---

## ✅ Step 6: Storage Bucket (5 min)

### Create `resumes` bucket
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false);

-- RLS: candidates can upload their own
CREATE POLICY "Candidates can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- RLS: employers can view resumes for their jobs
CREATE POLICY "Employers can view resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');
```

**Test:** Upload resume during application

---

## ✅ Step 7: Seed Data (15 min)

### Sample Companies
```sql
INSERT INTO companies (owner_id, name, website)
VALUES 
  ((SELECT id FROM profiles LIMIT 1), 'Medellín AI', 'https://medellin.ai'),
  ((SELECT id FROM profiles LIMIT 1), 'TechCorp', 'https://techcorp.co');
```

### Sample Jobs
```sql
INSERT INTO jobs (company_id, owner_id, title, description, location, type, status)
VALUES 
  ((SELECT id FROM companies LIMIT 1), (SELECT id FROM profiles LIMIT 1), 
   'AI Engineer', 'Build RAG systems with LangChain...', 'Medellín', 'full-time', 'published'),
  ((SELECT id FROM companies LIMIT 1), (SELECT id FROM profiles LIMIT 1),
   'Event Videographer', '1-day shoot for AI conference...', 'Medellín', 'contract', 'published');
```

**Test:** Jobs appear on /jobs page

---

## ✅ Step 8: Navigation (5 min)

Update `src/components/layout/Navbar.tsx`:
- ✅ Add "Jobs" link → `/jobs`
- ✅ For organizers/admins: "Dashboard" → `/dashboard/jobs`

**Test:** Navigate between pages

---

## Acceptance Tests (End-to-End)

Run through these scenarios:

### Scenario 1: Employer Posts Job
1. ✅ Login as organizer
2. ✅ Go to /dashboard/jobs
3. ✅ Click "New Job"
4. ✅ Fill form, save as draft
5. ✅ Review, click "Publish"
6. ✅ Verify job appears on /jobs

### Scenario 2: Candidate Applies
1. ✅ Browse /jobs (not logged in)
2. ✅ Click a job → see details
3. ✅ Click "Apply"
4. ✅ Fill form, upload resume
5. ✅ Submit → see success message
6. ✅ Verify application in database

### Scenario 3: Employer Reviews Applications
1. ✅ Login as employer
2. ✅ Go to /dashboard/jobs
3. ✅ Click "Applicants" on a job
4. ✅ See list of candidates
5. ✅ Change stage to "Interview"
6. ✅ Verify update in database

---

## Definition of Done

✅ All tables created with RLS  
✅ Public can browse and apply to jobs  
✅ Employers can post and manage jobs  
✅ Employers can view and triage applicants  
✅ Resume uploads work  
✅ No console errors  
✅ All acceptance tests pass  

---

## What NOT to Include (Save for Stage 2)
❌ AI job description normalizer  
❌ Resume skill extraction  
❌ Auto-screening questions  
❌ Match & rank algorithm  
❌ Outreach composer  

**Keep it simple. Humans do all the work in Stage 1.**

---

## Estimated Time
- Database: 30 min
- Public pages: 2 hours
- Employer dashboard: 2 hours
- Testing: 30 min
- **Total: ~5-6 hours**

---

## Next: Stage 2
Once Stage 1 is stable → [Stage 2: AI Basics](./002-STAGE2-AI-BASICS.md)
