# Medellin AI - Authentication Implementation Guide

## Overview

Complete authentication implementation documentation for Medellin AI platform, covering database setup, social login providers, and production deployment.

**Project**: Medellin AI (Medellin Spark)
**Supabase Project**: `dhesktsqhcxhqfjypulk`
**Last Updated**: January 2025

---

## 📚 Documentation Structure

### Master Plan
- **[00-auth-plan.md](./00-auth-plan.md)** - Master authentication plan including database schema, RLS policies, triggers, and edge functions

### Social Login Provider Implementation Plans

Each provider has a detailed step-by-step implementation guide:

| Provider | File | Priority | Difficulty | Time | Status |
|----------|------|----------|------------|------|--------|
| **GitHub** | [03-github.md](./03-github.md) | High | Easy | 2-3 hours | ✅ Ready |
| **Google** | [05-google-implementation.md](./05-google-implementation.md) | High | Easy-Medium | 2-3 hours | ✅ Ready |
| **Facebook** | [06-facebook-implementation.md](./06-facebook-implementation.md) | Medium | Easy-Medium | 2-3 hours | ✅ Ready |
| **Apple** | [07-apple-implementation.md](./07-apple-implementation.md) | High | Medium-Hard | 3-4 hours | ✅ Ready |
| **LinkedIn** | [08-linkedin-implementation.md](./08-linkedin-implementation.md) | Medium | Easy-Medium | 2-3 hours | ✅ Ready |

### Reference Documentation
- **[01-apple.md](./01-apple.md)** - Official Supabase Apple Sign-In documentation
- **[02-google.md](./02-google.md)** - Official Supabase Google OAuth documentation
- **[02-facebook.md](./02-facebook.md)** - Official Supabase Facebook OAuth documentation
- **[04-linkedin.md](./04-linkedin.md)** - Official Supabase LinkedIn OIDC documentation

---

## ⚠️ IMPORTANT: Schema Consistency

Before implementing any OAuth provider, you **MUST** apply the database migration first. The implementation plans assume database fields that don't exist in the default Supabase schema.

**📖 Read First**: [`SCHEMA-CONSISTENCY-SUMMARY.md`](./SCHEMA-CONSISTENCY-SUMMARY.md) - Complete explanation of schema updates and how to apply them.

**Quick Start**:
```bash
cd /home/sk/medellin-spark
npx supabase db push
npx supabase gen types typescript --local > src/integrations/supabase/types.ts
```

---

## 🚀 Quick Start

### Prerequisites
- [ ] Supabase project created (`dhesktsqhcxhqfjypulk`)
- [ ] Node.js and pnpm installed
- [ ] Local development environment running
- [ ] Access to Supabase Dashboard
- [ ] Developer accounts for each provider
- [ ] **Database migration applied** (see above ⚠️)

### Implementation Order

**Phase 0: Database Migration** (5-10 minutes) - **REQUIRED FIRST**
1. Review migration file: `supabase/migrations/20250113000000_add_oauth_fields.sql`
2. Apply migration: `npx supabase db push`
3. Verify migration success with verification queries
4. Regenerate TypeScript types
5. See [SCHEMA-CONSISTENCY-SUMMARY.md](./SCHEMA-CONSISTENCY-SUMMARY.md) for details

**Phase 1: Database Setup** (HANDLED BY MIGRATION)
1. ~~Follow [00-auth-plan.md](./00-auth-plan.md)~~ Migration handles this
2. ~~Create database tables (profiles, user_sessions, oauth_connections)~~ Done by migration
3. ~~Set up RLS policies~~ Done by migration
4. ~~Create database triggers~~ Done by migration
5. ~~Test database schema~~ Use verification queries in Phase 0

**Phase 2: Core Providers** (4-6 hours)
1. **GitHub** - Easiest, developer-focused ([03-github.md](./03-github.md))
2. **Google** - Most popular ([05-google-implementation.md](./05-google-implementation.md))

**Phase 3: Additional Providers** (6-8 hours)
3. **Facebook** - General audience ([06-facebook-implementation.md](./06-facebook-implementation.md))
4. **LinkedIn** - Professional networking ([08-linkedin-implementation.md](./08-linkedin-implementation.md))
5. **Apple** - iOS users, privacy-focused ([07-apple-implementation.md](./07-apple-implementation.md))

**Phase 4: Testing & Production** (2-3 hours)
1. End-to-end testing all providers
2. Security validation
3. Production deployment
4. Monitoring setup

---

## 📋 Each Implementation Plan Includes

Every provider implementation plan follows the same comprehensive structure:

### 1. **Overview**
- Provider details
- Priority level
- Estimated time
- Difficulty rating

### 2. **Prerequisites Checklist**
- Required accounts
- Tools needed
- Access requirements

### 3. **Phase 1: Provider Setup**
- Developer account creation
- OAuth app configuration
- Credential management
- Callback URL setup

### 4. **Phase 2: Supabase Configuration**
- Dashboard setup
- Local development config
- Environment variables
- Provider-specific settings

### 5. **Phase 3: Client Implementation**
- Auth page updates
- OAuth flow testing
- Callback handling
- UI integration

### 6. **Phase 4: Database Integration**
- Profile creation verification
- Data sync testing
- Provider-specific data handling
- RLS policy testing

### 7. **Phase 5: Testing & Validation**
- End-to-end test cases
- Security validation
- Error handling
- Edge case testing

### 8. **Phase 6: Production Deployment**
- Production configuration
- Deployment steps
- Production testing
- Monitoring setup

### 9. **Troubleshooting Guide**
- Common issues
- Solutions
- Debug commands

### 10. **Success Criteria Checklist**
- Comprehensive completion checklist
- Verification steps

### 11. **Monitoring & Maintenance**
- Regular checks
- Maintenance tasks
- Monitoring queries

### 12. **Resources**
- Official documentation links
- Developer portals
- Support resources

---

## 🎯 Provider Comparison

### GitHub OAuth
**Best for**: Developer-focused applications
- ✅ Easy setup (15 min)
- ✅ No app review required
- ✅ Free
- ✅ Developer-friendly
- ⚠️ Smaller user base

### Google OAuth
**Best for**: Maximum reach
- ✅ Largest user base
- ✅ One-Tap sign-in
- ✅ Free
- ✅ Fast approval
- ⚠️ Complex consent screen setup

### Facebook OAuth
**Best for**: Social applications
- ✅ Large user base
- ✅ Social features
- ⚠️ App review required
- ⚠️ Business verification needed
- ⚠️ Some users don't have email

### Apple Sign-In
**Best for**: iOS apps, privacy-conscious users
- ✅ High privacy
- ✅ Required for iOS apps
- ✅ Trusted by users
- ⚠️ $99/year developer account
- ⚠️ Complex setup
- ⚠️ Client secret expires every 6 months

### LinkedIn OIDC
**Best for**: Professional/B2B applications
- ✅ Professional audience
- ✅ OpenID Connect (modern)
- ✅ Good profile data
- ✅ Free
- ⚠️ Smaller user base
- ⚠️ Legacy OAuth being deprecated

---

## 💾 Database Schema

All providers share the same database schema:

### Tables

**profiles**
```sql
- id (UUID, PK, FK to auth.users)
- email (TEXT)
- full_name (TEXT)
- avatar_url (TEXT)
- provider (TEXT) - 'google', 'github', 'facebook', 'apple', 'linkedin_oidc'
- provider_id (TEXT)
- metadata (JSONB)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

**user_sessions**
```sql
- id (UUID, PK)
- user_id (UUID, FK to profiles)
- provider (TEXT)
- session_started_at (TIMESTAMPTZ)
- session_ended_at (TIMESTAMPTZ)
- ip_address (TEXT)
- user_agent (TEXT)
```

**oauth_connections**
```sql
- id (UUID, PK)
- user_id (UUID, FK to profiles)
- provider (TEXT)
- provider_user_id (TEXT)
- access_token (TEXT)
- refresh_token (TEXT)
- expires_at (TIMESTAMPTZ)
- created_at (TIMESTAMPTZ)
```

---

## 🔒 Security Best Practices

### For All Providers

1. **HTTPS Only in Production**
   - All callback URLs must use HTTPS
   - HTTP only for local development

2. **Secrets Management**
   - Never commit secrets to git
   - Use environment variables
   - Store securely in password manager

3. **Row Level Security (RLS)**
   - Enable on all tables
   - Users can only access their own data
   - Verify policies with tests

4. **Session Security**
   - httpOnly cookies
   - Secure flag in production
   - Proper expiration times

5. **Nonce Validation**
   - Required for Google, Apple
   - Automatically handled by Supabase
   - Prevents replay attacks

### Provider-Specific

**Apple**:
- Client secret expires every 6 months - set reminders
- Private key (.p8) can only be downloaded once
- Store key file securely offline

**Facebook**:
- App review required for production
- Handle missing email addresses
- Business verification may be needed

**LinkedIn**:
- Use `linkedin_oidc` not `linkedin` (legacy)
- Legacy provider being deprecated

---

## 🧪 Testing Checklist

For each provider, test:

### New User Sign Up
- [ ] OAuth flow completes successfully
- [ ] Profile created in database
- [ ] Email captured correctly
- [ ] Name populated
- [ ] Avatar URL stored
- [ ] Session created
- [ ] Redirected to dashboard

### Existing User Sign In
- [ ] Recognizes existing user
- [ ] No duplicate profiles created
- [ ] Profile updated (if needed)
- [ ] Session created
- [ ] last_sign_in_at updated

### Error Handling
- [ ] Cancel during OAuth - handled gracefully
- [ ] Network error - shows error message
- [ ] Invalid credentials - appropriate error
- [ ] Expired session - re-authentication prompted

### Edge Cases
- [ ] Email matching with existing account
- [ ] Missing email (Facebook, Apple relay)
- [ ] Missing name (Apple subsequent logins)
- [ ] Profile picture fails to load
- [ ] Provider API is down

---

## 📊 Monitoring Queries

Use these SQL queries to monitor auth usage:

### Overall Stats
```sql
-- Total users by provider
SELECT
  provider,
  COUNT(*) as users,
  COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () as percentage
FROM public.profiles
GROUP BY provider
ORDER BY users DESC;
```

### Recent Activity
```sql
-- Recent sign-ins across all providers
SELECT
  p.email,
  p.provider,
  s.session_started_at
FROM public.user_sessions s
JOIN public.profiles p ON p.id = s.user_id
ORDER BY s.session_started_at DESC
LIMIT 50;
```

### Growth Tracking
```sql
-- New users per day by provider
SELECT
  DATE(created_at) as date,
  provider,
  COUNT(*) as new_users
FROM public.profiles
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at), provider
ORDER BY date DESC, provider;
```

### Error Tracking
```sql
-- Failed authentication attempts (requires logging)
-- Implement in edge functions or app code
```

---

## 🚨 Common Issues Across Providers

### Issue: "Redirect URI mismatch"
**Solution**: Verify exact URL match including:
- Protocol (https://)
- Domain
- Path (/auth/v1/callback)
- No trailing slash

### Issue: "Invalid client_id" or "Invalid client_secret"
**Solution**:
- Copy credentials carefully (no extra spaces)
- Verify in provider dashboard
- Check environment variables loaded correctly

### Issue: "Profile not created"
**Solution**:
```sql
-- Verify trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Check trigger function
SELECT prosrc FROM pg_proc WHERE proname = 'handle_new_user';
```

### Issue: "Session not persisting"
**Solution**:
- Check cookie settings
- Verify domain configuration
- Check RLS policies
- Verify Supabase client initialization

### Issue: "Email already exists"
**Solution**:
- Implement account linking
- Show appropriate message to user
- Offer to link accounts

---

## 📈 Implementation Progress Tracker

Use this checklist to track overall implementation:

### Database Setup
- [ ] profiles table created
- [ ] user_sessions table created
- [ ] oauth_connections table created
- [ ] RLS policies enabled
- [ ] Triggers created
- [ ] Test data inserted
- [ ] Queries verified

### GitHub OAuth
- [ ] Developer account created
- [ ] OAuth app configured
- [ ] Supabase enabled
- [ ] Client implemented
- [ ] Database tested
- [ ] Production deployed
- [ ] Monitoring active

### Google OAuth
- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth client created
- [ ] Supabase enabled
- [ ] Client implemented
- [ ] One-Tap tested
- [ ] Database tested
- [ ] Production deployed
- [ ] Monitoring active

### Facebook OAuth
- [ ] Developer account created
- [ ] Facebook app created
- [ ] Facebook Login added
- [ ] Test users added
- [ ] Supabase enabled
- [ ] Client implemented
- [ ] Database tested
- [ ] App review submitted
- [ ] Production deployed
- [ ] Monitoring active

### Apple Sign-In
- [ ] Developer program enrolled ($99)
- [ ] App ID created
- [ ] Services ID created
- [ ] Private key generated
- [ ] Client secret generated
- [ ] Supabase enabled
- [ ] Client implemented
- [ ] Database tested
- [ ] Production deployed
- [ ] Secret rotation scheduled
- [ ] Monitoring active

### LinkedIn OIDC
- [ ] Developer account created
- [ ] LinkedIn app created
- [ ] OIDC product added
- [ ] Supabase enabled
- [ ] Client implemented
- [ ] Database tested
- [ ] Production deployed
- [ ] Monitoring active

### Production
- [ ] All providers tested in production
- [ ] Error handling verified
- [ ] Monitoring dashboards set up
- [ ] Alerts configured
- [ ] Documentation updated
- [ ] Team trained

---

## 🔗 Useful Links

### Supabase
- [Dashboard](https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk)
- [Auth Providers](https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/providers)
- [SQL Editor](https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/sql)
- [Documentation](https://supabase.com/docs/guides/auth)

### Provider Developer Portals
- [GitHub](https://github.com/settings/developers)
- [Google Cloud](https://console.cloud.google.com)
- [Facebook Developers](https://developers.facebook.com)
- [Apple Developer](https://developer.apple.com/account)
- [LinkedIn Developers](https://www.linkedin.com/developers)

### Code Repository
- [Project Root](file:///home/sk/medellin-spark)
- [Auth Page](file:///home/sk/medellin-spark/src/pages/Auth.tsx)
- [Supabase Client](file:///home/sk/medellin-spark/src/integrations/supabase/client.ts)

---

## 🆘 Support & Troubleshooting

### Documentation Issues
- Check individual provider implementation files
- Review official Supabase documentation
- Search Supabase Discord community

### Implementation Help
- Refer to troubleshooting sections in each guide
- Check Supabase logs in dashboard
- Use browser DevTools console
- Check network tab for API calls

### Provider-Specific Issues
- GitHub: Check OAuth app settings
- Google: Verify consent screen configuration
- Facebook: Ensure app review completed
- Apple: Verify client secret not expired
- LinkedIn: Confirm using OIDC not legacy OAuth

---

## 📝 Next Steps

After completing all provider implementations:

1. **Account Linking**
   - Allow users to link multiple providers
   - Handle email conflicts
   - Show connected providers in settings

2. **Profile Management**
   - Allow users to update profile info
   - Manage connected accounts
   - Delete account functionality

3. **Advanced Features**
   - Two-factor authentication
   - Magic link authentication
   - Phone number authentication
   - Passwordless authentication

4. **Analytics**
   - Track sign-up conversion rates
   - Monitor provider preferences
   - Analyze drop-off points

5. **Optimization**
   - Cache provider data
   - Optimize avatar loading
   - Reduce callback latency

---

## ✅ Final Checklist

Before going to production:

- [ ] All provider implementations complete
- [ ] Database schema deployed
- [ ] RLS policies verified
- [ ] All tests passing
- [ ] Error handling tested
- [ ] Security audit completed
- [ ] Monitoring dashboards active
- [ ] Alerts configured
- [ ] Documentation complete
- [ ] Team trained
- [ ] Backup plan prepared
- [ ] Rollback procedure documented

---

**Ready to start?** Begin with [00-auth-plan.md](./00-auth-plan.md) for database setup, then proceed to individual provider implementation guides.

**Questions?** Review the troubleshooting sections or check official documentation links.

**Good luck!** 🚀
