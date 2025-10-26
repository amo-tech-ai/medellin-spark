# Auth Flow Playbook

**Purpose**: Test complete authentication journey (signup → login → logout)

**Duration**: ~5 minutes

**When to Run**: After auth changes, before production deploy

---

## 🎯 Test Steps

### 1. Navigate to Auth Page
```typescript
// Go to auth/login page
await browser_navigate({ url: "http://localhost:8080/auth" });

// Wait for page load
await browser_wait_for({ text: "Sign In" });

// Take snapshot to see form structure
const snapshot = await browser_snapshot();
console.log(snapshot);

// Screenshot initial state
await browser_take_screenshot({ filename: "01-auth-page.png" });
```

### 2. Test Login Flow (Dev Mode)
```typescript
// Dev mode: No real auth needed, but test UI flow
// Fill email field
await browser_type({
  element: "Email input",
  ref: "input-email",
  text: "test@eventos.com"
});

// Fill password field
await browser_type({
  element: "Password input",
  ref: "input-password",
  text: "TestPassword123!"
});

// Screenshot filled form
await browser_take_screenshot({ filename: "02-form-filled.png" });

// Click login button
await browser_click({
  element: "Sign In button",
  ref: "btn-login"
});

// Wait for redirect or success message
await browser_wait_for({ text: "Dashboard", timeout: 10000 });
```

### 3. Verify Logged-In State
```typescript
// Check URL changed
const url = await browser_evaluate({
  function: "() => window.location.pathname"
});
console.log(`Current path: ${url}`);

// Verify user indicator is present
await browser_wait_for({ text: "Welcome" });

// Screenshot dashboard
await browser_take_screenshot({ filename: "03-logged-in-dashboard.png" });

// Check localStorage for session data (dev mode)
const hasSession = await browser_evaluate({
  function: `() => {
    const session = localStorage.getItem('supabase.auth.token');
    return session !== null;
  }`
});
console.log(`Session exists: ${hasSession}`);
```

### 4. Test Protected Routes
```typescript
// Navigate to a protected route
await browser_navigate({ url: "http://localhost:8080/presentations" });

// In dev mode, should allow access
// In production, would redirect to /auth if not logged in
await browser_wait_for({ text: "Presentations" });

// Screenshot protected page
await browser_take_screenshot({ filename: "04-protected-route.png" });
```

### 5. Test Logout (If Applicable)
```typescript
// Find logout button (might be in profile menu)
await browser_click({
  element: "Profile menu",
  ref: "btn-profile"
});

await browser_wait_for({ time: 1 });

await browser_click({
  element: "Logout button",
  ref: "btn-logout"
});

// Wait for redirect back to auth
await browser_wait_for({ text: "Sign In" });

// Screenshot logged-out state
await browser_take_screenshot({ filename: "05-logged-out.png" });
```

### 6. Network & Console Verification
```typescript
// Get network requests
const requests = await browser_network_requests();

// Check for auth-related API calls
const authCalls = requests.filter(r =>
  r.url.includes('/auth/') ||
  r.url.includes('/login') ||
  r.url.includes('/session')
);

console.log(`Auth API calls: ${authCalls.length}`);
authCalls.forEach(call => {
  console.log(`${call.method} ${call.url} → ${call.status}`);
});

// Check console for errors
const errors = await browser_console_messages({ onlyErrors: true });
if (errors.length > 0) {
  console.warn(`Console errors:`, errors);
}
```

---

## ✅ Success Criteria

- [x] Auth page loads correctly
- [x] Login form accepts input
- [x] Login button submits form
- [x] Redirect to dashboard after login
- [x] Protected routes accessible when logged in
- [x] Logout works (if implemented)
- [x] No console errors during flow
- [x] Auth API calls return expected status codes

---

## 📊 Expected Output

```
✅ Auth Flow Test Results
=========================
Auth Page Load: PASS (loaded in 412ms)
Form Fill: PASS (email + password entered)
Login Submit: PASS (button clicked)
Redirect: PASS (dashboard loaded)
Protected Route: PASS (accessible)
Session: PASS (token exists in localStorage)
Logout: PASS (redirected to auth)
Console: PASS (0 errors)

Auth API Calls:
- POST /api/auth/login → 200 OK
- GET /api/auth/session → 200 OK

Artifacts:
- 01-auth-page.png
- 02-form-filled.png
- 03-logged-in-dashboard.png
- 04-protected-route.png
- 05-logged-out.png
```

---

## 🔧 Dev Mode Notes

**Important**: This app uses **dev mode authentication bypass**:
- ✅ No real user creation needed
- ✅ No JWT validation required
- ✅ Profile ID defaults to `00000000-0000-0000-0000-000000000000`
- ✅ All routes accessible without auth

**Test Approach**:
1. Test UI/UX flows (forms, buttons, navigation)
2. Verify no JavaScript errors
3. Check network calls are made (even if mocked)
4. Ensure proper loading states and messages

**Production Mode** (future):
- Real user signup required
- JWT token validation enforced
- RLS policies active
- Protected routes redirect to /auth

---

## 🚀 Quick Run Command

```bash
# Using Claude Skill
claude run playwright-e2e-skill auth

# Or directly with MCP
npx @playwright/mcp --headless < playbooks/auth.md
```

---

## 🐛 Troubleshooting

### Issue: Login button doesn't work
- Check if button is disabled
- Verify form validation passes
- Look for console errors

### Issue: Redirect doesn't happen
- Check if URL changes in browser
- Verify routing is configured correctly
- Look for navigation errors in console

### Issue: Session not found
- Dev mode: localStorage might not be used
- Check if Supabase client is initialized
- Verify .env variables are loaded
