# Lovable Prompts - Organized by Priority

**All prompts are ready to copy-paste into Lovable**
**Files are numbered in implementation order**

---

## 📋 Current Prompts (Priority Order)

### TIER 1: Critical Detail Pages & Listings (Start Here)

**01-event-detail-page.md** ⭐⭐⭐
- Route: `/events/:id`
- Time: 2-3 hours
- Status: Ready to use

**02-job-detail-page.md** ⭐⭐⭐
- Route: `/jobs/:id`
- Time: 2-3 hours
- Status: Ready to use

**03-perk-detail-page.md** ⭐⭐⭐
- Route: `/perks/:id`
- Time: 2-3 hours
- Status: Ready to use

**05-jobs-listing-page.md** ⭐⭐⭐
- Route: `/jobs`
- Time: 2-3 hours
- Status: Ready to use
- Fix existing page to connect to database

### TIER 2: Dashboard & Forms

**04-jobs-dashboard.md** ⭐⭐
- Route: `/dashboard/jobs`
- Time: 3-4 hours
- Status: Ready to use

**06-post-job-form.md** ⭐⭐
- Route: `/post-job`
- Time: 3-4 hours
- Status: Ready to use
- Create form for users to submit jobs

---

## 📁 Folder Structure

```
lovable/prompts/
├── README.md                      (this file)
├── 01-event-detail-page.md       (TIER 1 - Critical)
├── 02-job-detail-page.md         (TIER 1 - Critical)  
├── 03-perk-detail-page.md        (TIER 1 - Critical)
├── 04-jobs-dashboard.md          (TIER 2 - High)
├── 05-jobs-listing-page.md       (TIER 1 - Critical)
├── 06-post-job-form.md           (TIER 2 - High)
└── archive/                       (old versions)
```

---

## 🚀 How to Use

### Step 1: Open Lovable
Navigate to your Lovable workspace

### Step 2: Choose a Prompt
**Recommended order:**
1. Start with `01-event-detail-page.md`
2. Then `02-job-detail-page.md`
3. Then `03-perk-detail-page.md`
4. Then `05-jobs-listing-page.md`
5. Then `04-jobs-dashboard.md`
6. Then `06-post-job-form.md`

### Step 3: Copy Entire File
Open the prompt file and copy all contents (Ctrl+A, Ctrl+C)

### Step 4: Paste into Lovable
Paste into Lovable's chat interface

### Step 5: Review and Test
- Check page loads without errors
- Verify data displays correctly
- Test responsive design
- Ensure TypeScript compiles

### Step 6: Move to Next Prompt
Repeat with next numbered prompt

---

## ✅ Implementation Checklist

**TIER 1 - Critical (Do First)**
- [ ] 01-event-detail-page.md
- [ ] 02-job-detail-page.md
- [ ] 03-perk-detail-page.md
- [ ] 05-jobs-listing-page.md

**TIER 2 - High Priority (Do Next)**
- [ ] 04-jobs-dashboard.md
- [ ] 06-post-job-form.md

**Total Time**: 14-19 hours for all 6 prompts

---

## 📝 What's Next?

See `../WHAT-NEEDS-DESIGN.md` for complete list of 31 pages that need design.

**Upcoming prompts** (not yet created):
- 07-events-listing-page.md
- 08-perks-listing-page.md
- 09-post-event-form.md
- 10-post-perk-form.md
- 11-settings-dashboard.md
- 12-perks-dashboard.md

---

## 📖 Prompt Features

All prompts are:
- ❌ **Code-free** - No code blocks, just descriptions
- ✅ **Visual** - Clear layout and component descriptions
- ✅ **Complete** - All sections, states, and behaviors defined
- ✅ **Responsive** - Mobile, tablet, desktop guidelines
- ✅ **Tested** - Success criteria and testing checklists included

---

## 🔗 Related Files

- **Master Plan**: `../LOVABLE-BUILD-PLAN.md`
- **Quick Reference**: `../PROMPTS-INDEX.md`
- **What Needs Design**: `../WHAT-NEEDS-DESIGN.md`
- **Database Schema**: `../../supabase/migrations/`
- **TypeScript Types**: `../../src/integrations/supabase/types.ts`

---

**Last Updated**: October 21, 2025
**Status**: 6 prompts ready, organized by priority
