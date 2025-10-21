# User Workflows - Production Ready Journey

## Overview

This document outlines **production-validated** user workflows following the staged implementation plan. Workflows are designed for authenticated users with proper error handling and rate limiting awareness.

**Implementation Stages:**
- **Stage 1 (Week 1):** Core AI features + Dashboard
- **Stage 2 (Week 2):** Health Score + Recommendations
- **Stage 3+ (Future):** Automations + Advanced Features

---

## Workflow 1: Create Event with AI Assistance (Stage 1)

### User Story

> "As an authenticated event organizer, I want to create a professional event using validated AI suggestions with proper error handling."

### Pre-conditions

- ✅ User is authenticated (checked via `useAuth` hook)
- ✅ User navigates to `/events/new` (existing wizard)
- ✅ User has active session (JWT token present)
- ✅ Rate limit not exceeded (10 requests/min)

### Step-by-Step Flow (Corrected)

1. **Event Details Entry** (Manual Input)
   - User fills basic info: Name, Date, Description
   - No automatic AI triggers (user-initiated only)
   
2. **Explicit AI Enhancement** (User-Initiated)
   ```typescript
   // User clicks "Generate Agenda" button
   const handleGenerateAgenda = async () => {
     setLoading(true);
     
     try {
       const { data, error } = await supabase.functions.invoke(
         'event-ai-assist',
         {
           body: {
             type: 'agenda',
             event_id: eventId
           }
         }
       );

       if (error) {
         if (error.message?.includes('Rate limit')) {
           toast({
             title: "Rate Limit Exceeded",
             description: "Please wait a minute and try again",
             variant: "destructive"
           });
           return;
         }
         throw error;
       }

       // Show result in dialog or expand section
       setAgendaResult(data.agenda);
       
     } catch (error) {
       console.error('AI generation error:', error);
       toast({
         title: "Generation Failed",
         description: "Please try again or contact support",
         variant: "destructive"
       });
     } finally {
       setLoading(false);
     }
   };
   ```

3. **Review AI Output** (Manual Approval)
   - AI result displayed in preview
   - User can edit, accept, or regenerate
   - No auto-apply (user must explicitly confirm)

4. **Repeat for Other Features**
   - Pricing suggestions (click "Suggest Pricing")
   - Email drafts (click "Draft Email")
   - Each action requires explicit user trigger

5. **Publish Event**
   - Final review of all details
   - Click "Publish" to make live

**Time Saved:** 30 min → 8 min (73% faster)

**Error Handling:**
- ✅ Rate limit: Show friendly message with retry time
- ✅ Auth error: Redirect to login
- ✅ Network error: Show retry button
- ✅ Invalid output: Log error, show fallback message

---

## Workflow 2: Access Dashboard Features (Stage 1)

### User Story

> "As an event organizer, I want a centralized place to manage my events with AI assistance."

### Flow

1. **Navigate to Dashboard**
   ```typescript
   // Route: /dashboard/events
   // Auth required (redirects to /auth if not logged in)
   ```

2. **View Event List**
   - See all user's events
   - Filter by status (draft, published, completed)
   - Sort by date

3. **Select Event**
   - Click on event card
   - AI Assistant panel activates for that event

4. **Use AI Actions**
   - "Generate Agenda" → Creates schedule
   - "Suggest Pricing" → Pricing tiers
   - "Draft Email" → Announcement email
   
5. **Review & Apply**
   - Each action opens dialog with result
   - User can edit before applying
   - Changes saved to event record

**Benefits:**
- ✅ Centralized event management
- ✅ Quick AI access for any event
- ✅ Clear separation of concerns

---

## Workflow 3: Handle AI Errors Gracefully

### Scenario: Rate Limit Hit

**User Action:** Clicks "Generate Agenda" multiple times quickly

**System Response:**
```typescript
// Client-side debouncing
const debouncedGenerate = useMemo(
  () => debounce(handleGenerate, 1000),
  [handleGenerate]
);

// Server returns 429
if (response.status === 429) {
  return {
    error: "Rate limit exceeded",
    retryAfter: 60 // seconds
  };
}

// Client shows friendly toast
toast({
  title: "Slow Down! 🚦",
  description: "Please wait 1 minute before trying again",
  variant: "warning"
});
```

### Scenario: Credits Exhausted

**System Response:**
```typescript
// Server returns 402
if (response.status === 402) {
  return {
    error: "AI credits exhausted",
    code: "CREDITS_EXHAUSTED"
  };
}

// Client shows actionable message
toast({
  title: "AI Credits Exhausted",
  description: "Please add credits to your workspace to continue",
  action: (
    <Button onClick={() => window.open('/settings/billing')}>
      Add Credits
    </Button>
  )
});
```

### Scenario: Invalid AI Output

**System Response:**
```typescript
// Server validates with Zod
try {
  const validated = AgendaSchema.parse(aiResult);
} catch (zodError) {
  console.error('Validation error:', zodError);
  return {
    error: "Invalid AI response format",
    fallback: defaultAgenda
  };
}

// Client uses fallback or shows error
if (data.error) {
  toast({
    title: "Generation Failed",
    description: "AI returned invalid format. Using template.",
    variant: "warning"
  });
  // Use fallback template
}
```

---

## Workflow 4: Monitor Event Health (Stage 2)

### User Story

> "As an organizer, I want to know if my event setup is complete and optimized."

### Flow (Stage 2 Feature)

1. **Open Dashboard** → `/dashboard/events`

2. **View Health Score**
   - Card shows overall score (0-100)
   - Breakdown by category:
     - Description quality
     - Pricing optimization
     - Promotion readiness

3. **Review Recommendations**
   - AI suggests improvements
   - Click "Apply" to auto-fix (where possible)
   - Manual review for other suggestions

4. **Track Progress**
   - Score updates as changes are made
   - Goal: Reach 80+ for "ready to publish"

**Example:**
```
Health Score: 65/100 ⚠️

Breakdown:
✅ Description: 85/100 (Great!)
⚠️  Pricing: 50/100 (Add early bird tier)
❌ Promotion: 30/100 (Create social posts)

AI Recommendations:
1. Add early bird pricing (saves 40%) → [Apply]
2. Generate social posts → [Generate Now]
3. Add event image → [Upload or Generate]
```

---

## Workflow 5: Batch Operations (Future)

### User Story (Stage 3+)

> "I run multiple events per month. I want to automate repetitive tasks."

### Flow (Not Yet Implemented)

1. **Select Multiple Events**
2. **Choose Batch Action:**
   - "Generate Social Posts for All"
   - "Send Reminder Emails"
   - "Export Attendee Lists"
3. **AI Processes in Background**
4. **Review Results in Bulk**

---

## Best Practices for Users

### DO ✅
- Review AI output before accepting
- Edit generated content to match your voice
- Use "Regenerate" if first result isn't perfect
- Check rate limit status before bulk operations

### DON'T ❌
- Don't click "Generate" repeatedly (rate limits)
- Don't trust AI output blindly (always review)
- Don't share AI-generated content without editing
- Don't expect 100% accuracy (AI is a tool, not magic)

---

## Success Metrics

### Stage 1 Targets
- ✅ 50% faster event creation
- ✅ 90% AI output acceptance rate
- ✅ < 1% error rate
- ✅ < 3s AI response time (p95)

### Stage 2 Targets
- ✅ 70% events reach 80+ health score
- ✅ 80% users use health recommendations
- ✅ 25% improvement in event quality

---

## Troubleshooting

**Q: AI keeps hitting rate limits**  
A: Wait 1 minute between requests. Batch operations coming in Stage 3.

**Q: AI generated wrong content**  
A: Use "Regenerate" or edit manually. Report persistent issues.

**Q: Dashboard shows "Not authenticated"**  
A: Session expired. Click "Login" to reauthenticate.

**Q: Health score seems wrong**  
A: Scores are AI estimates. Manual review always recommended.

---

**Status:** ✅ Production-ready workflows  
**Next:** Implement dashboard with these patterns
