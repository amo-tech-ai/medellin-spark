Objective:
Run a complete end-to-end test of the Pitch Deck Wizard to ensure the full user journey works smoothly — from account creation to pitch deck export — with no errors or broken flows.

🔧 Test Steps (Practical Flow)

Start the App

Run the local development server (npm run dev or equivalent).

Detect the base URL automatically (e.g., http://localhost:3000).

Confirm the homepage loads successfully (HTTP 200, no console errors).

User Setup

If authentication is enabled, create a temporary test user:

Email: e2e.pitchdeck+<timestamp>@example.com

Password: Test!2345

Log in and confirm landing on the main dashboard.

Create Startup Profile

Go to “Create Startup Profile”.

Fill out minimal but valid details:

Name: E2E Test Startup

Industry: AI / Software

Add short placeholders for Problem, Solution, Market, and Traction.

Save and verify:

Confirmation message or toast appears.

Profile is visible in the list.

No 4xx/5xx or validation errors.

Run the Pitch Deck Wizard

Open the Wizard from the dashboard.

Complete all required steps using the test profile.

Click Generate Deck and wait for results.

Validate:

Sidebar shows all steps as completed.

At least 8 slides are generated (Problem, Solution, Product, Market, etc.).

No console or network errors during generation.

Export Functionality

Attempt to export the deck as PDF and/or PPTX.

Verify exported files are generated correctly and non-empty (>0 KB).

Store file paths in ./e2e-artifacts/<timestamp>/exports/.

Visual and Log Capture

Take screenshots of:

Dashboard after login

Wizard before generation

Deck after generation

Collect console logs and network request summaries using MCP Chrome DevTools.

Ensure zero uncaught errors or failed requests.

Cleanup

Delete test profile and generated deck (if possible).

Log out.

Clear temporary files or cookies.

📊 Deliverables

Short test report including:

Base URL and timestamp

Pass/Fail for each step

List of generated artifacts (screenshots, exports, logs)

Summary of any errors or warnings (should be none)

🧩 Tools & Best Practices

MCP Playwright → Automate user flow, capture screenshots, and validate UI.

MCP Chrome DevTools → Monitor console logs, network responses, and performance metrics.

Use consistent naming: e2e-test-<timestamp> for all temp data.

Avoid modifying production databases or APIs.

Run tests in an isolated environment when possible.

✅ Success Criteria

All steps execute without errors or broken UI states.

At least one valid export (PDF or PPTX) is generated.

No 4xx/5xx or console exceptions.

Report and screenshots clearly document the full flow.