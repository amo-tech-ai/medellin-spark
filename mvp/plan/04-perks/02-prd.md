Perfect — here’s a **complete, clear, and logical PRD (Product Requirements Document)** for your **Startup Perks Onboarding Wizard** focused on analyzing a startup’s profile and generating personalized **Microsoft for Startups** perk recommendations.

It’s structured for clarity, with real-world examples, workflows, pages, and data flow.
Let’s keep it **simple, analytical, and production-ready.**

---

# 🚀 **PRD — Startup Perks Onboarding Wizard**

**Product:** AI-Powered Startup-to-Perks Matching System
**Version:** v1.0
**Owner:** Medellín AI Team
**Date:** 2025-10-14
**Goal:** Help founders understand, qualify for, and maximize **Microsoft for Startups** benefits through an intelligent 7-stage onboarding wizard.

---

## 🎯 **Objective**

Create a guided wizard that collects key startup information, analyzes it using AI + rules, and generates a **personalized perks report** (e.g., Azure credits, GitHub Enterprise, Microsoft 365, Pegasus GTM, ISV Success).

The wizard will:

* Understand the startup’s **stage, team, tech stack, and goals**
* Match them with the **right Microsoft benefits**
* Provide an **action plan** (30/60/90 days)
* Estimate **total savings value**
* Save results to the founder’s dashboard for follow-up

---

## 🧠 **Core User Problem**

Founders often:

* Don’t know **which perks apply** to their stage or tech stack
* Waste time reading program docs
* Fail to redeem benefits before they expire
* Miss **Azure OpenAI**, **ISV Success**, or **Pegasus** opportunities

This wizard solves that with **one guided flow** → instant analysis → personalized action plan.

---

## 👥 **Target Users**

| User Type             | Description                                              | Example                            |
| --------------------- | -------------------------------------------------------- | ---------------------------------- |
| Founder / Startup CEO | Early or growth-stage founder building a tech startup    | 6-person SaaS startup              |
| CTO / Tech Lead       | Handles infra + AI stack; wants Azure credits & AI tools | Tech cofounder running cloud ops   |
| Startup PM / Ops      | Manages benefits, tools, and partner relationships       | Ops manager handling subscriptions |

---

## 🧭 **User Journey Overview**

### 1. Entry Point

* User logs in → navigates to **“Startup Perks Wizard”** from dashboard
* Sees intro: *“Find the best Microsoft perks for your startup in 5 minutes.”*
* Clicks **Start Wizard**

### 2. Wizard Flow (7 stages)

| Stage                   | User Goal                                     | Output                         |
| ----------------------- | --------------------------------------------- | ------------------------------ |
| **1. Startup Basics**   | Describe startup (name, stage, team, country) | Founders Hub eligibility       |
| **2. Product Overview** | Explain what they build                       | AI classifies product category |
| **3. Tech Stack**       | Select core technologies                      | Cloud & AI service matches     |
| **4. Growth Goals**     | Pick goals (scale, AI, GTM, security)         | Align with perk categories     |
| **5. AI Analysis**      | Run Microsoft Analysis (Edge function)        | Ranked perks with scores       |
| **6. Recommendations**  | View tailored perks, 30/60/90 plan            | Actionable roadmap             |
| **7. Summary**          | Review + save to dashboard                    | Saved report + next steps      |

---

## 🧩 **Web Pages & Dashboards**

| Page                             | Purpose                    | Components                       |
| -------------------------------- | -------------------------- | -------------------------------- |
| `/wizard/perks/startup-basics`   | Collect company info       | Input form, progress bar         |
| `/wizard/perks/product-overview` | Describe product           | Textarea + AI classifier         |
| `/wizard/perks/tech-stack`       | Choose tech stack          | Multi-select chips               |
| `/wizard/perks/growth-goals`     | Select priorities          | Checkbox grid                    |
| `/wizard/perks/ai-analysis`      | Run AI scoring             | Loading state + progress         |
| `/wizard/perks/recommendations`  | View ranked perks          | Cards: perk, score, reason, CTA  |
| `/wizard/perks/summary`          | Save & share report        | Summary view + Save button       |
| `/dashboard/perks`               | See saved analyses         | Table of reports + re-run option |
| `/perks/:id`                     | Learn more about each perk | Detail view + redeem links       |

---

## 🧮 **How the Wizard Does the Analysis**

### Step-by-Step Process

1. **Collects input**
   From the 4 initial stages (Basics → Goals), the wizard captures:

   * Startup name, industry, team size, country, stage
   * Product description (auto-categorized by AI)
   * Tech stack + cloud provider
   * AI usage (agents, LLMs, RAG, none)
   * Growth goals & challenges
   * Investor affiliation (optional)

2. **Pre-scoring (Rule-based)**
   A simple heuristic model gives initial scores for each perk:

   * Example: if startup uses AI → boost Azure OpenAI score
   * if B2B + runs on Azure → boost ISV Success
   * if investor-backed → unlock $100k credits path

3. **AI Analysis (Edge Function)**
   The collected data + pre-scores are sent to the **Lovable AI Gateway** via a Supabase Edge Function:

   * Model: `google/gemini-2.5-flash`
   * Prompt includes facts + scores
   * Returns JSON with:

     * `perkId`, `score`, `reason`, `valueUsd`
     * `next30`, `next60`, `next90`
     * `checklist`, `savings_estimate_usd`

4. **Result Rendering**
   The front end displays ranked cards with:

   * Icon + name (e.g., Azure OpenAI)
   * Score (0–100)
   * Reason (why it fits)
   * Value estimate ($)
   * Action plan (30/60/90 days)
   * Buttons: *Redeem*, *Save as Report*

5. **Database Save**
   Results and inputs are stored in:

   * `startup_profiles` → basic profile
   * `partner_reports_microsoft` → AI analysis snapshot

6. **Dashboard Sync**
   The dashboard pulls the saved report, showing:

   * Total perk value ($)
   * Next actions checklist
   * Redeem links (Founders Hub, GitHub, ISV Success)

---

## 📋 **Information Needed for Analysis**

| Category                 | Field                           | Example                             | Why it Matters                     |
| ------------------------ | ------------------------------- | ----------------------------------- | ---------------------------------- |
| **Company**              | Name, Country, Stage, Team Size | “Acme AI”, Colombia, early, 6       | Determines program eligibility     |
| **Industry**             | Fintech, SaaS, HealthTech       | “SaaS”                              | Classifies for GTM & ISV match     |
| **Product**              | Description                     | “AI assistant for event management” | Helps model suggest relevant tools |
| **Tech Stack**           | Frameworks, DB, Cloud           | React, Supabase, Azure              | Determines infra + AI relevance    |
| **AI Usage**             | LLMs, Agents, RAG               | “LLM agents”                        | Enables Azure OpenAI benefits      |
| **Goals**                | Growth, GTM, Cost, Security     | “Reduce infra cost”                 | Matches to credits, GitHub, M365   |
| **Investor Affiliation** | VC/Accelerator name             | “Techstars”                         | Unlocks investor track perks       |
| **Challenges**           | Scaling, cost, marketing        | “Infra cost too high”               | Affects recommendations            |
| **Preferred Tools**      | CRMs, IDEs, AI Platforms        | “HubSpot, VS Code”                  | Suggests integration bundles       |

---

## 🧭 **Workflow Diagram (Simplified)**

```mermaid
flowchart TD
A[User Starts Wizard] --> B[Fill Startup Basics]
B --> C[Product Overview]
C --> D[Tech Stack]
D --> E[Growth Goals]
E --> F[Run AI Analysis (Edge Function)]
F --> G[View Recommendations]
G --> H[Save Report to Dashboard]
H --> I[View in Dashboard/Perks Directory]
```

---

## 📊 **Dashboard Experience**

**/dashboard/perks**

* Summary card: “You qualify for $5,000 Azure credits 🎉”
* Charts: total perk value, claimed perks, pending actions
* Table: saved reports (Microsoft, AWS, Stripe, HubSpot)
* Button: “Re-analyze my startup”

---

## 💡 **Suggested Additional Features (Next Versions)**

| Feature                | Description                                           | Benefit                             |
| ---------------------- | ----------------------------------------------------- | ----------------------------------- |
| **Compare Programs**   | Compare Microsoft, AWS, and Google perks side-by-side | Helps founders decide platform      |
| **Auto-detect stack**  | Scan GitHub repo or Supabase project                  | Reduces manual input                |
| **AI Chat Advisor**    | “Ask the advisor” chat powered by CopilotKit          | Explains perks in plain language    |
| **Multi-Partner Sync** | Sync saved perks from dashboard to CRM                | Real-time tracking of claimed perks |
| **Email Reminder Bot** | Follow-up if credits unused after 30 days             | Improves redemption rate            |

---

## ✅ **Success Metrics**

| Metric                 | Target       | Why                     |
| ---------------------- | ------------ | ----------------------- |
| Wizard Completion Rate | 70%+         | UX success              |
| Avg. Analysis Time     | <5s          | Fast feedback           |
| AI Relevance Accuracy  | >80%         | Trustworthy suggestions |
| Reports Saved          | 50% of runs  | Engagement              |
| Perk Claims            | 40% of users | Real value delivered    |

---

## ⚙️ **Technical Highlights**

* **Frontend:** React + Zustand + CopilotKit (state machine)
* **Backend:** Supabase (Postgres, Edge Functions, RLS)
* **AI Engine:** Lovable AI Gateway (Gemini 2.5 Flash)
* **Security:** RLS enforced; only user can view their reports
* **Storage:** `startup_profiles` + `partner_reports_microsoft`
* **Scalability:** Extend to other partners (Stripe, HubSpot, AWS)

---

## 🧾 **Example Output (AI JSON)**

```json
{
  "recommendations": [
    {
      "perkId": "azure_credits",
      "score": 86,
      "reason": "Ideal for MVP stage with cloud scaling needs",
      "valueUsd": 5000,
      "next30": ["Apply to Founders Hub", "Deploy to Azure"],
      "next60": ["Verify business", "Optimize infra"],
      "next90": ["Plan ISV Success enrollment"]
    },
    {
      "perkId": "azure_openai",
      "score": 82,
      "reason": "LLM agents fit Azure OpenAI perfectly",
      "valueUsd": 2000
    }
  ],
  "savings_estimate_usd": 7000
}
```

---

## 🧱 **Implementation Phases**

| Phase | Focus                 | Deliverables                                    | Time    |
| ----- | --------------------- | ----------------------------------------------- | ------- |
| 1     | Schema + Types        | `startup_profiles`, `partner_reports_microsoft` | 0.5 day |
| 2     | UI Wizard Stages      | 7 pages + hooks                                 | 2 days  |
| 3     | Edge Function         | `analyze-microsoft-perks`                       | 0.5 day |
| 4     | Dashboard Integration | Reports & Redeem                                | 1 day   |
| 5     | Testing + UX Polish   | End-to-end + AI accuracy                        | 1 day   |

---

## ✅ **Outcome**

By the end of this MVP:

* A founder completes 7 guided steps.
* The AI produces a **tailored Microsoft perks report**.
* The system estimates **$ value saved**, **shows next steps**, and **stores results** in the dashboard.

---

Would you like me to generate the **visual user flow diagram (Mermaid)** + **database ERD** next?
That would make this PRD 100% implementation-ready.
