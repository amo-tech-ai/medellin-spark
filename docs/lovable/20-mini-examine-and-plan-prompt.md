# 🔍 Mini Prompt - Examine Setup and Create Plan

Hey Lovable! Before we start building the Pitch Deck AI Generator, I need you to examine what already exists and create a detailed implementation plan.

---

## 📋 YOUR TASK

Examine the current Medellin AI Hub setup and create a comprehensive plan for adding an AI-powered pitch deck generator.

---

## STEP 1: EXAMINE THE CURRENT SITE

### 1.1 Scan Existing Pages and Components

Look through the current Medellin AI Hub site and tell me:

**What pages exist?**
- List all the pages you can find (landing, dashboard, profiles, etc.)
- Which pages are public and which require authentication?
- What's the main navigation structure?

**What design patterns are being used?**
- What color scheme does the site use? (primary, secondary, accent colors)
- What button styles exist? (sizes, colors, hover states)
- What card styles are used? (shadows, borders, padding)
- What form components exist? (inputs, textareas, selects, checkboxes)
- What typography is used? (heading sizes, body text, small text)

**What components can we reuse?**
- Are there existing button components?
- Are there existing card components?
- Are there existing form input components?
- Are there existing modal or dialog components?
- Are there existing loading indicators?
- What icons or icon library is being used?

**What navigation patterns exist?**
- Is there a sidebar navigation?
- Is there a top navigation bar?
- How do users move between pages?
- What breadcrumbs or back buttons are used?

---

## STEP 2: EXAMINE THE SUPABASE DATABASE

### 2.1 Connect to Supabase

Connect to the Supabase project and inspect:

**What tables exist?**
- List all tables in the database
- What are the primary keys and foreign keys?
- What relationships exist between tables?

**Focus on the presentations table:**
- What columns does it have?
- What are the data types for each column?
- Are there any JSONB columns? If so, what structure do they use?
- What's the relationship to the profiles table?
- Are there any indexes on the table?

**What about Row Level Security (RLS)?**
- What RLS policies are in place?
- Who can read presentations?
- Who can create/update/delete presentations?

**What Edge Functions exist?**
- Are there any Supabase Edge Functions already created?
- If so, what do they do?
- Are there functions for AI generation?

---

## STEP 3: REVIEW THE REFERENCE IMPLEMENTATION

### 3.1 Study presentation-ai Structure

Look at `/home/sk/medellin-spark/presentation-ai` and tell me:

**What's the folder structure?**
- How are pages organized? (app router, pages router, or other?)
- Where are components stored?
- How are components organized by feature?
- Where are utilities and helpers stored?
- Where are types and interfaces defined?

**What presentation-related components exist?**
- What components are in the `components/presentation/` folder?
- What are the main page components called?
- What are the editor components called?
- What are the theme components called?
- What's the naming convention for components?

**What's the data flow?**
- How is state managed? (React state, Zustand, Context, other?)
- How do components communicate?
- Where does API calling happen?
- How is the database accessed? (Prisma in their case, Supabase in ours)

**What can we adapt vs skip?**
- What patterns should we follow exactly?
- What can we simplify for MVP?
- What complex features should we skip initially?

---

## STEP 4: CREATE THE IMPLEMENTATION PLAN

### 4.1 Identify What Needs to Be Built

Based on your examination, create a plan that answers:

**What pages need to be created?**
- List each new page route
- Describe the purpose of each page
- What's the navigation flow between pages?

**What existing pages need to be enhanced?**
- Which pages need modifications?
- What specific changes are needed?
- Can we keep existing functionality?

**What new components need to be created?**
- List all new components needed
- Describe the purpose of each
- What props will they need?
- Which components have dependencies on others?

**What components can be reused from existing Medellin AI?**
- List components that already exist and can be reused
- Will they need any modifications?

**What's missing that we need to build?**
- What backend functions are needed? (Supabase Edge Functions)
- What database changes are needed? (new tables, columns, RLS policies)
- What external APIs need to be integrated? (Claude AI)

### 4.2 Define the User Journey

Map out the complete flow:

**Starting Point:**
- Where does the user begin? (Dashboard, landing page, other?)
- What action triggers the flow?

**Each Step:**
- What page does the user see?
- What actions can they take?
- What happens when they submit/click?
- Where do they go next?
- What data is saved at each step?

**Ending Point:**
- Where does the journey end?
- What has been created/saved?
- Can the user go back and edit?

### 4.3 Identify Potential Challenges

**Technical challenges:**
- What's the most complex component to build?
- Are there any performance concerns?
- What about mobile responsiveness?
- Any state management complexity?

**Integration challenges:**
- How will we call the Claude AI API?
- How will we handle long-running AI generation?
- How will we show progress to users?
- What about error handling?

**Design challenges:**
- How do we match the existing Medellin AI design?
- How do we adopt Decktopus patterns?
- How do we make drag-and-drop intuitive?
- How do we handle auto-save UX?

### 4.4 Propose Build Order

**Suggest a phased approach:**
- What should we build first? Why?
- What should we build second? Why?
- What's the logical order of implementation?
- What can be built in parallel?
- What has dependencies that must be built sequentially?

**Estimate complexity:**
- Which pages are simple to build?
- Which pages are complex?
- Which features might take the most time?
- What's a realistic timeline for MVP?

---

## STEP 5: DOCUMENT YOUR FINDINGS

### 5.1 Create a Report

Organize your findings into a clear report with these sections:

**Section 1: Current State**
- What exists today
- What works well
- What can be reused

**Section 2: What Needs to Be Built**
- List of new pages
- List of new components
- List of backend needs
- List of database changes

**Section 3: Implementation Plan**
- Phased build approach
- What to build in each phase
- Dependencies between phases
- Estimated timeline

**Section 4: Design Approach**
- How to match existing design
- What Decktopus patterns to adopt
- Color scheme for presentation features
- Component styling guidelines

**Section 5: Data Architecture**
- Database schema details
- JSONB structure for outline and content
- When and where to save data
- RLS policies needed

**Section 6: Potential Risks**
- Technical challenges
- Integration concerns
- Performance considerations
- Mitigation strategies

---

## 📝 OUTPUT FORMAT

Please present your findings as a clear, organized report that I can review before we start building.

Use headings, bullet points, and clear descriptions. Be specific about:
- Component names (use presentation-ai naming conventions)
- Route paths (e.g., `/presentations/:id/outline`)
- Color values (e.g., `#8B5CF6` for purple)
- Database column names (e.g., `presentations.outline`)
- JSONB structures (show the format)

**Most importantly:** Give me your honest assessment of what's realistic for MVP and what should wait for future versions.

---

## ✅ SUCCESS CRITERIA

Your examination and plan is complete when:

1. You've identified all existing pages and components we can reuse
2. You've connected to Supabase and documented the database structure
3. You've reviewed the presentation-ai reference and understand the patterns
4. You've listed every page and component we need to build
5. You've mapped out the complete user journey from start to finish
6. You've proposed a realistic build order with phases
7. You've identified potential challenges and risks
8. You've created a clear report I can use to guide implementation

---

**Take your time and be thorough! This examination will guide our entire implementation. 🔍**
