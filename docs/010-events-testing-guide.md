# Events Feature Testing Guide

**Purpose**: Step-by-step manual testing guide for Events feature  
**Target Audience**: QA, Developers, Product Managers  
**Last Updated**: 2025-10-29

---

## 🎯 Testing Objectives

1. Verify Supabase connection and data flow
2. Validate RLS policies enforce correct access
3. Test registration flow end-to-end
4. Confirm analytics events fire correctly
5. Verify error handling and edge cases

---

## 🔧 Prerequisites

### Setup
```bash
# 1. Ensure dev server is running
npm run dev  # or pnpm dev

# 2. Open browser console (F12)
# Enable "Preserve log" to see analytics events

# 3. Have test accounts ready:
# - Anonymous (not logged in)
# - User A (logged in, no registrations)
# - User B (logged in, registered for Event 1)
```

### Test Data Required
```sql
-- Verify test events exist
SELECT id, title, status, capacity, registered_count 
FROM events 
WHERE status = 'published' 
ORDER BY event_date 
LIMIT 5;

-- Verify registrations
SELECT event_id, profile_id, status 
FROM registrations 
WHERE status IN ('confirmed', 'attended')
LIMIT 10;
```

---

## 📋 Test Suite 1: Anonymous User (No Auth)

### Test 1.1: View Events List
**Steps**:
1. Open incognito/private window
2. Navigate to `/events`
3. Observe page load

**Expected**:
- ✅ Events grid loads
- ✅ Shows published events only
- ✅ Console shows: `[Analytics] Page: Events List`
- ✅ Console shows: `[Analytics] Event: Events List Loaded { count: X }`
- ✅ No authentication errors
- ✅ No draft/deleted events visible

**Pass/Fail**: ⬜

---

### Test 1.2: View Event Detail
**Steps**:
1. Click any event card
2. Observe detail page load
3. Check registration button text

**Expected**:
- ✅ Event detail renders
- ✅ Console shows: `[Analytics] Event: Event Card Clicked`
- ✅ Console shows: `[Analytics] Page: Event Detail`
- ✅ Button says "Log In to Register"
- ✅ No private event data visible

**Pass/Fail**: ⬜

---

### Test 1.3: Attempt Registration (Not Logged In)
**Steps**:
1. Click "Log In to Register" button
2. Observe redirect

**Expected**:
- ✅ Redirected to `/auth?redirect=/events/:id`
- ✅ Redirect URL preserved in query param
- ✅ No errors in console

**Pass/Fail**: ⬜

---

## 📋 Test Suite 2: Authenticated User (Logged In)

### Test 2.1: View Events List (Logged In)
**Steps**:
1. Log in as User A
2. Navigate to `/events`
3. Observe events with registration status

**Expected**:
- ✅ Events load correctly
- ✅ Console shows analytics events
- ✅ Events user is registered for show badge or different state
- ✅ No errors fetching registration status

**Pass/Fail**: ⬜

---

### Test 2.2: Register for Event (Success Flow)
**Steps**:
1. Click event user is NOT registered for
2. Click "Register for Event" button
3. Wait for response

**Expected**:
- ✅ Console shows: `[Analytics] Event: Registration Started`
- ✅ Button shows loading state (spinner)
- ✅ Toast appears: "You're registered! 🎉"
- ✅ Console shows: `[Analytics] Event: Registration Completed`
- ✅ Button changes to "✓ You're Registered" badge
- ✅ Badge is green/success variant
- ✅ "Cancel Registration" button appears

**Pass/Fail**: ⬜

---

### Test 2.3: Duplicate Registration (Error Handling)
**Steps**:
1. Stay on same event from Test 2.2
2. Refresh page
3. Try to register again (if button appears)

**Expected**:
- ✅ Badge should show "✓ You're Registered" (no register button)
- ✅ OR if database state is out of sync:
  - Button click shows toast: "You are already registered"
  - Console shows: `[Analytics] Event: Registration Failed { reason: 'Duplicate registration' }`

**Pass/Fail**: ⬜

---

### Test 2.4: Cancel Registration
**Steps**:
1. On event user IS registered for
2. Click "Cancel Registration" button
3. Wait for response

**Expected**:
- ✅ Console shows: `[Analytics] Event: Registration Cancellation Started`
- ✅ Button shows loading state
- ✅ Toast appears: "Registration cancelled"
- ✅ Console shows: `[Analytics] Event: Registration Cancelled`
- ✅ Badge changes back to "Register for Event" button

**Pass/Fail**: ⬜

---

### Test 2.5: Event at Capacity
**Steps**:
1. Find event where `capacity = registered_count`
2. View event detail
3. Observe UI

**Expected**:
- ✅ Badge shows "Event Full"
- ✅ Badge is secondary/muted variant
- ✅ No register button visible
- ✅ User cannot attempt registration

**Pass/Fail**: ⬜

---

### Test 2.6: Past Event
**Steps**:
1. Find event where `event_date < now()`
2. View event detail
3. Observe UI

**Expected**:
- ✅ Badge shows "Event Ended"
- ✅ Badge is secondary/muted variant
- ✅ No register button visible
- ✅ If registered, cancel button is disabled

**Pass/Fail**: ⬜

---

## 📋 Test Suite 3: RLS Policy Validation

### Test 3.1: Anonymous Cannot See Draft Events
**Setup**:
```sql
-- Create draft event (as admin/organizer)
INSERT INTO events (title, status, event_date, organizer_id)
VALUES ('Draft Event', 'draft', now() + interval '1 week', '<organizer-id>');
```

**Steps**:
1. Log out (anonymous)
2. Navigate to `/events`
3. Search for "Draft Event"

**Expected**:
- ✅ Draft event NOT visible in list
- ✅ Direct navigation to `/events/<draft-id>` shows 404 or "not found"

**Pass/Fail**: ⬜

---

### Test 3.2: User Cannot View Other Users' Registrations
**Setup**:
```sql
-- Get registration from User B
SELECT * FROM registrations WHERE profile_id = '<user-b-id>' LIMIT 1;
```

**Steps**:
1. Log in as User A
2. Try to query registrations table via browser console:
   ```javascript
   const { data, error } = await supabase
     .from('registrations')
     .select('*')
     .eq('profile_id', '<user-b-id>'); // User B's ID
   console.log(data);
   ```

**Expected**:
- ✅ `data` is empty array `[]` (RLS blocks)
- ✅ OR error indicates no permission
- ✅ User A cannot see User B's registrations

**Pass/Fail**: ⬜

---

### Test 3.3: User Can Only Cancel Own Registrations
**Steps**:
1. Log in as User A
2. Get registration ID from User B (via admin/logs)
3. Try to cancel User B's registration via console:
   ```javascript
   const { data, error } = await supabase
     .from('registrations')
     .update({ status: 'cancelled' })
     .eq('id', '<user-b-registration-id>');
   console.log(error);
   ```

**Expected**:
- ✅ Update fails or affects 0 rows
- ✅ RLS blocks unauthorized update
- ✅ User B's registration remains intact

**Pass/Fail**: ⬜

---

## 📋 Test Suite 4: Analytics Verification

### Test 4.1: Page View Tracking
**Steps**:
1. Clear console
2. Navigate to `/events`
3. Click event
4. Check console output

**Expected**:
```
[Analytics] Page: Events List { timestamp, url, path }
[Analytics] Event: Event Card Clicked { eventId, eventTitle, eventDate }
[Analytics] Page: Event Detail { eventId, eventTitle }
```

**Pass/Fail**: ⬜

---

### Test 4.2: Registration Flow Tracking
**Steps**:
1. Clear console
2. Register for event (if not already)
3. Check console output

**Expected**:
```
[Analytics] Event: Registration Started { eventId, userId }
[Analytics] Event: Registration Completed { eventId, userId, timestamp }
```

**Pass/Fail**: ⬜

---

### Test 4.3: Error Tracking
**Steps**:
1. Disconnect internet (or block Supabase URL)
2. Try to register for event
3. Check console output

**Expected**:
```
[Analytics] Event: Registration Failed { eventId, userId, error, reason }
```
- ✅ Error details logged
- ✅ User sees friendly toast message

**Pass/Fail**: ⬜

---

## 📋 Test Suite 5: Mobile Responsiveness

### Test 5.1: Mobile Layout (390px)
**Steps**:
1. Open DevTools
2. Set viewport to 390x844 (iPhone 12 Pro)
3. Navigate through events flow

**Expected**:
- ✅ Cards stack in single column
- ✅ Images scale proportionally
- ✅ Text is readable (≥16px)
- ✅ Buttons are tappable (≥44px)
- ✅ No horizontal scroll
- ✅ Toast notifications visible

**Pass/Fail**: ⬜

---

### Test 5.2: Tablet Layout (768px)
**Steps**:
1. Set viewport to 768x1024 (iPad)
2. Navigate through events

**Expected**:
- ✅ Cards display in 2-column grid
- ✅ Detail page uses full width effectively
- ✅ No layout breaks

**Pass/Fail**: ⬜

---

## 📋 Test Suite 6: Error Handling

### Test 6.1: Network Timeout
**Steps**:
1. Throttle network to "Slow 3G"
2. Navigate to `/events`
3. Observe loading states

**Expected**:
- ✅ Skeleton loaders appear
- ✅ Page doesn't freeze
- ✅ Retry button available on error
- ✅ Friendly error message

**Pass/Fail**: ⬜

---

### Test 6.2: Invalid Event ID
**Steps**:
1. Navigate to `/events/00000000-0000-0000-0000-000000000000`
2. Observe response

**Expected**:
- ✅ Shows "Event not found" empty state
- ✅ No crash or error boundary
- ✅ Provides link back to events list

**Pass/Fail**: ⬜

---

## 📊 Test Summary

| Test Suite | Tests | Passed | Failed | Notes |
|------------|-------|--------|--------|-------|
| Anonymous User | 3 | - | - | - |
| Authenticated User | 6 | - | - | - |
| RLS Validation | 3 | - | - | - |
| Analytics | 3 | - | - | - |
| Mobile | 2 | - | - | - |
| Error Handling | 2 | - | - | - |
| **TOTAL** | **19** | **0** | **0** | **Not started** |

---

## 🐛 Issues Found

| # | Severity | Description | Status | Fix |
|---|----------|-------------|--------|-----|
| - | - | - | - | - |

---

## ✅ Sign-off Checklist

Before marking Events feature as **Production Ready**:

- [ ] All 19 test cases passed
- [ ] No P0/P1 bugs open
- [ ] RLS policies verified secure
- [ ] Analytics tracking validated
- [ ] Mobile experience tested on real device
- [ ] Performance metrics meet targets (LCP < 2.5s)
- [ ] Error handling graceful
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Security linter issues resolved
- [ ] Load testing completed (100 concurrent users)

**Approved by**: _____________  
**Date**: _____________

---

## 📝 Notes

Use this space for observations, additional test scenarios, or edge cases discovered during testing:

```
[Your notes here]
```
