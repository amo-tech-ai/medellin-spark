# 🕵️ Claude Code Prompt — Supabase Auth Setup Guide
# Goal: Set up Supabase Auth with multiple OAuth providers using clean, production-ready best practices.

Goal:
Explain and set up Supabase Authentication for a real project — including Apple, Facebook, Google, and LinkedIn OIDC — using clear, simple, and correct best-practice steps.  
Focus on the **core setup** only (no unnecessary extras): environment, provider config, database tables, triggers, and RLS.  
Use practical, real-world examples that make sense logically.

---

## Tasks

1. **Explain Supabase Auth simply**
   - What it is, how it manages `auth.users`, and how RLS connects to user data.
   - How JWTs, access tokens, and profiles work together.

2. **Set up core auth providers (Apple, Facebook, Google, LinkedIn OIDC)**
   - Use official Supabase Dashboard or Management API commands.
   - Include callback URL format:  
     `https://<project-ref>.supabase.co/auth/v1/callback`
   - Include short real-world example (e.g., "login with Google for an event app").

3. **Database setup**
   - Create a `profiles` table linked to `auth.users(id)` with extra fields like `email`, `full_name`, and `avatar_url`.
   - Add optional `user_sessions` and `oauth_connections` tables for tracking logins and provider tokens.
   - Include short, readable SQL — no complexity.

4. **Triggers and RLS**
   - Add simple trigger to auto-create a profile after user signup.
   - Explain why direct triggers on `auth.users` may fail in Supabase Cloud and the safe Edge Function alternative.
   - Add basic RLS rules: users can view/update only their own data.

5. **Best practices summary**
   - Secure service role key usage.
   - HTTPS-only callbacks.
   - PKCE + nonce for Apple/Google.
   - Separate dev vs production credentials.
   - Keep seed/test data outside migrations.

6. **Output format**
   - Use clear Markdown sections:
     - 🚀 Overview (how it works)
     - 🧱 Core Database Setup
     - 🔐 Auth Provider Setup
     - ⚙️ Triggers & RLS
     - 🧠 Best Practices
     - ✅ Final Checklist
   - Keep it concise, analytical, and easy to understand.

---

## Style

- Write like an expert explaining to another developer.
- Be intelligent and logical — no jargon, no fluff.
- Use short SQL and JS examples that actually work.
- End with a clear **success checklist** that confirms the setup is secure, functional, and production-ready.

---

Expected Output:
A full step-by-step Supabase Auth setup guide that is:
- ✅ Simple but correct
- ✅ Secure (RLS + service role separation)
- ✅ Provider-ready (Apple, Google, Facebook, LinkedIn OIDC)
- ✅ Real-world applicable
- ✅ Ready to implement in a Supabase project
