# Database Operations Plugin - Supabase Architecture for Medellin Spark

## Overview

This guide demonstrates how to use the `database-operations` plugin and its specialized `database-architect` agent to design and implement a production-ready Supabase architecture for the Medellin Spark startup ecosystem platform.

**Project Context:** React + TypeScript + Vite platform for events, pitch decks, jobs marketplace, and startup dashboard features.

---

## Quick Start

### Install the Database Operations Plugin

```bash
/plugin install database-operations
```

**What you get:**
- `database-architect` - Schema design and architecture planning
- `database-admin` - Operations, backups, and maintenance
- `database-optimizer` - Query optimization and performance tuning
- `sql-pro` - Advanced SQL query assistance
- `/database-operations:sql-migrations` - Migration workflows
- `/database-operations:migration-observability` - Migration monitoring

---

## Feature Matrix: Core to Advanced

### Core Database Features (Start Here)

| Feature | Use Case | Command | Success Criteria |
|---------|----------|---------|-----------------|
| **Schema Design** | Design tables for events, users, startups | "Design schema for event registration system" | ERD generated, relationships defined |
| **Technology Selection** | Choose Supabase vs alternatives | "Should we use Supabase for this project?" | Clear rationale with trade-offs |
| **Authentication Schema** | User auth with RLS policies | "Design auth schema with row-level security" | Secure multi-tenant architecture |
| **Migration Planning** | Zero-downtime schema changes | "Plan migration to add user profiles" | Step-by-step migration strategy |
| **Indexing Strategy** | Optimize query performance | "Design indexes for event search" | Index recommendations with rationale |

### Advanced Database Features

| Feature | Use Case | Command | Success Criteria |
|---------|----------|---------|-----------------|
| **Real-time Subscriptions** | Live event updates | "Design real-time event registration tracking" | Subscription patterns defined |
| **Full-Text Search** | Search events, jobs, startups | "Implement FTS for event discovery" | Search indexes with performance plan |
| **Data Partitioning** | Scale to millions of events | "Design partitioning strategy for events table" | Partition plan with query routing |
| **Audit Logging** | Track all data changes | "Add audit trail for user actions" | Comprehensive logging architecture |
| **Multi-tenant Architecture** | Isolate startup data | "Design RLS policies for multi-tenancy" | Secure data isolation verified |
| **CQRS Pattern** | Separate read/write models | "Design CQRS for analytics dashboard" | Read/write separation architecture |
| **Event Sourcing** | Track all state changes | "Design event-sourced pitch deck system" | Event store schema defined |

---

## Real-World Examples for Medellin Spark

### Example 1: Event Registration System

**Scenario:** Design complete event registration with capacity management, waitlist, and payment tracking.

```bash
"Use database-architect to design an event registration system for Medellin Spark.

Requirements:
- Events table (title, description, capacity, date, location, organizer)
- Users table (email, name, profile, created_at)
- Registrations table (user_id, event_id, status, registered_at, payment_status)
- Waitlist table (user_id, event_id, position, joined_at)
- Payment transactions (registration_id, amount, stripe_payment_id, status)

Features needed:
- Prevent overbooking (capacity enforcement)
- Automatic waitlist promotion when someone cancels
- Track payment status
- Query: 'Show all events user is attending'
- Query: 'Show event capacity status in real-time'
- Row-level security (users see only their registrations)

Design indexes, constraints, and RLS policies."
```

**What you get:**
- Complete ERD with relationships
- SQL schema creation scripts
- Index strategy for common queries
- RLS policy implementation
- Migration plan for deployment
- Performance considerations

**Success Criteria:**
 All tables created with proper constraints
 Foreign keys enforce referential integrity
 Indexes optimize event search and user queries
 RLS policies prevent unauthorized access
 Capacity enforcement prevents double-booking

---

### Example 2: Jobs Marketplace Schema

**Scenario:** Design job posting platform with company profiles, applications, and matching.

```bash
"Use database-architect to design a jobs marketplace schema.

Tables needed:
- Companies (name, logo, description, industry, size, verified)
- Job_Postings (title, description, salary_range, remote, location, company_id)
- Job_Applications (job_id, user_id, resume_url, status, applied_at)
- Saved_Jobs (user_id, job_id, saved_at)
- Skills (name, category)
- Job_Skills (job_id, skill_id, required_level)
- User_Skills (user_id, skill_id, proficiency_level)

Queries to optimize:
1. Find jobs matching user skills (skill-based search)
2. Show all applications for a job (recruiter view)
3. Track user application history
4. Filter jobs by location, salary, remote status
5. Full-text search on job titles and descriptions

Advanced features:
- Skill matching algorithm (score jobs by skill overlap)
- Application status workflow (applied ’ screening ’ interview ’ offer)
- Email notifications for application updates
- Analytics: jobs posted per company, application conversion rates"
```

**What you get:**
- Normalized schema with skills taxonomy
- Many-to-many relationships (jobs ” skills)
- Full-text search indexes
- Query optimization strategy
- Application state machine design
- Analytics query patterns

---

### Example 3: Pitch Deck Wizard with Version Control

**Scenario:** Design schema for collaborative pitch deck creation with versioning and templates.

```bash
"Use database-architect to design pitch deck system with version control.

Core entities:
- Pitch_Decks (user_id, startup_id, title, created_at, updated_at, published)
- Deck_Versions (deck_id, version_number, content_json, created_at, created_by)
- Deck_Slides (deck_id, slide_order, content, slide_type, metadata)
- Deck_Templates (name, category, slides_json, preview_image)
- Deck_Collaborators (deck_id, user_id, role, invited_at)
- Deck_Comments (deck_id, slide_id, user_id, comment, resolved, created_at)

Features:
- Version history (restore previous versions)
- Real-time collaboration (multiple users editing)
- Template library (starter decks by industry)
- Comment threads per slide
- Export tracking (PDF, PPTX downloads)
- Analytics (views, time spent per slide)

Design for:
- Efficient JSON storage of slide content
- Real-time subscriptions for collaborative editing
- Version diffing (show what changed between versions)
- Soft deletes with audit trail"
```

**What you get:**
- JSONB column design for flexible content
- Versioning strategy with diffs
- Real-time subscription architecture
- Collaboration permissions model
- Template management system

---

### Example 4: Multi-Tenant Startup Dashboard

**Scenario:** Design secure multi-tenant architecture where startups see only their data.

```bash
"Use database-architect to design multi-tenant startup dashboard.

Requirements:
- Startups table (name, industry, stage, founded_date, team_size)
- Startup_Members (startup_id, user_id, role, joined_at, permissions)
- Startup_Metrics (startup_id, metric_date, revenue, users, burn_rate)
- Startup_Documents (startup_id, filename, file_url, category, uploaded_by)
- Startup_Milestones (startup_id, title, description, target_date, completed)

Multi-tenancy approach:
- Row-Level Security (RLS) policies
- Users belong to one or more startups
- Startup admins can invite members
- Members see only their startup's data
- Global admins see all data

Security requirements:
- Prevent cross-startup data leaks
- Audit log of all data access
- Encrypted storage for sensitive documents
- Role-based access control (owner, admin, member, viewer)

Performance:
- Dashboard loads in < 500ms
- Handle 10,000+ startups
- Efficient metrics aggregation"
```

**What you get:**
- Complete RLS policy set
- Role-based permission system
- Audit logging architecture
- Performance optimization plan
- Secure document storage strategy

---

## Command Reference

### Schema Design Commands

```bash
# Design new schema
"Design database schema for [feature/system]"

# Generate ERD diagram
"Create ERD for [tables/feature]"

# Review existing schema
"Analyze and improve the current [table/schema]"

# Add new table to existing schema
"Add [table_name] table with [columns] to integrate with [existing_tables]"
```

### Migration Commands

```bash
# Plan migration strategy
"Plan zero-downtime migration to add [feature]"

# Generate migration SQL
"Create migration script to [add column/rename table/add constraint]"

# Rollback planning
"Design rollback procedure for [migration]"

# Data migration
"Plan data migration from [old_structure] to [new_structure]"
```

### Optimization Commands

```bash
# Index recommendations
"Design indexes for query: [SQL_query]"

# Query optimization
"Optimize slow query: [SQL_query]"

# Performance analysis
"Analyze performance bottlenecks in [table/feature]"

# Capacity planning
"Plan database scaling for [growth_projection]"
```

### Security Commands

```bash
# RLS policies
"Design RLS policies for [table/feature]"

# Audit logging
"Add audit trail for [table/operations]"

# Data encryption
"Design encryption strategy for [sensitive_data]"

# Permission model
"Create RBAC system for [roles/permissions]"
```

---

## Supabase-Specific Features

### Real-Time Subscriptions

```bash
"Design real-time subscription architecture for:
- Live event capacity updates
- Collaborative pitch deck editing
- Job application status changes
- Dashboard metrics auto-refresh

Include:
- Which tables need real-time
- Subscription filter patterns
- Performance implications
- Fallback strategies"
```

### Row-Level Security (RLS)

```bash
"Create comprehensive RLS policies for Medellin Spark:

Tables:
- events (public read, authenticated write)
- registrations (users see only their own)
- pitch_decks (startup members only)
- jobs (public read, company write)
- applications (applicant + company)

Policies needed:
- SELECT: Who can read what
- INSERT: Who can create records
- UPDATE: Who can modify records
- DELETE: Who can delete records

Include:
- Policy SQL code
- Performance testing
- Edge case handling"
```

### Storage Integration

```bash
"Design Supabase Storage architecture for:
- User profile images
- Event photos
- Pitch deck PDFs
- Company logos
- Job applicant resumes

Requirements:
- Secure file access (RLS for storage)
- CDN optimization
- File size limits
- Allowed file types
- Automatic image optimization
- Virus scanning integration"
```

### Edge Functions Integration

```bash
"Design database triggers and Edge Functions for:
- Email notifications (new registration, job application)
- Webhook processing (Stripe payments)
- Scheduled tasks (waitlist promotion, reminder emails)
- Data validation (complex business rules)
- Analytics aggregation (daily metrics rollup)

Include:
- Trigger conditions
- Function logic
- Error handling
- Monitoring strategy"
```

---

## Success Criteria Checklist

### Schema Design Success
- [ ] ERD diagram generated and reviewed
- [ ] All relationships defined (1:1, 1:many, many:many)
- [ ] Primary keys and foreign keys specified
- [ ] Indexes designed for common queries
- [ ] Constraints defined (NOT NULL, UNIQUE, CHECK)
- [ ] Data types optimized for storage and performance
- [ ] RLS policies implemented for security
- [ ] Migration scripts tested

### Performance Success
- [ ] Queries execute in < 200ms (P95)
- [ ] Indexes cover 80%+ of query patterns
- [ ] N+1 queries eliminated
- [ ] Full-text search performs in < 500ms
- [ ] Real-time subscriptions scale to 1000+ concurrent users
- [ ] Dashboard loads in < 1 second

### Security Success
- [ ] RLS prevents unauthorized data access
- [ ] SQL injection vectors eliminated
- [ ] Sensitive data encrypted at rest
- [ ] Audit logs capture all modifications
- [ ] Role-based access control enforced
- [ ] File uploads validated and scanned

### Scalability Success
- [ ] Schema supports 100,000+ users
- [ ] Events table handles 1M+ records
- [ ] Partitioning strategy defined for growth
- [ ] Connection pooling configured
- [ ] Read replicas planned for analytics
- [ ] Backup and disaster recovery tested

---

## Workflow Examples

### Workflow 1: New Feature Development

```bash
# Step 1: Design schema
"Use database-architect to design [feature_name] schema with [requirements]"

# Step 2: Review and iterate
"Analyze the proposed schema for [performance/security] issues"

# Step 3: Generate migration
"Create migration script for [feature_name]"

# Step 4: Test migration
"Design rollback procedure and test plan for migration"

# Step 5: Deploy
"/database-operations:sql-migrations - Execute migration with monitoring"
```

### Workflow 2: Performance Optimization

```bash
# Step 1: Identify slow queries
"Use database-optimizer to analyze slow queries in [feature/table]"

# Step 2: Design indexes
"Design index strategy for queries: [query_list]"

# Step 3: Optimize schema
"Recommend denormalization or caching for [performance_bottleneck]"

# Step 4: Implement and measure
"Create migration to add indexes and verify performance improvement"
```

### Workflow 3: Security Audit

```bash
# Step 1: Review RLS policies
"Audit RLS policies for all tables and identify gaps"

# Step 2: Test access control
"Design test cases to verify data isolation between users/startups"

# Step 3: Add audit logging
"Implement audit trail for sensitive operations: [list_operations]"

# Step 4: Validate encryption
"Verify encryption for [sensitive_columns/storage_buckets]"
```

---

## Common Patterns for Medellin Spark

### Pattern 1: Event-Driven Architecture

```sql
-- Events table with status workflow
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  capacity INTEGER NOT NULL,
  registered_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to update registered_count
CREATE OR REPLACE FUNCTION update_event_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE events
  SET registered_count = (
    SELECT COUNT(*) FROM registrations
    WHERE event_id = NEW.event_id AND status = 'confirmed'
  )
  WHERE id = NEW.event_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Pattern 2: Soft Deletes with Audit Trail

```sql
-- Add deleted_at column to all tables
ALTER TABLE pitch_decks ADD COLUMN deleted_at TIMESTAMPTZ;
ALTER TABLE pitch_decks ADD COLUMN deleted_by UUID REFERENCES users(id);

-- View to exclude deleted records
CREATE VIEW active_pitch_decks AS
SELECT * FROM pitch_decks WHERE deleted_at IS NULL;

-- Audit table
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Pattern 3: Optimistic Locking for Collaboration

```sql
-- Add version column for optimistic locking
ALTER TABLE pitch_decks ADD COLUMN version INTEGER DEFAULT 1;

-- Update trigger to increment version
CREATE OR REPLACE FUNCTION increment_version()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version = OLD.version + 1;
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pitch_deck_version
BEFORE UPDATE ON pitch_decks
FOR EACH ROW EXECUTE FUNCTION increment_version();
```

---

## Next Steps

1. **Install the plugin**
   ```bash
   /plugin install database-operations
   ```

2. **Design your first schema**
   ```bash
   "Use database-architect to design event registration schema"
   ```

3. **Generate ERD diagram**
   ```bash
   "Create ERD for events, users, and registrations tables"
   ```

4. **Plan your first migration**
   ```bash
   "Plan migration to add events table with RLS policies"
   ```

5. **Set up monitoring**
   ```bash
   "/database-operations:migration-observability - Configure monitoring"
   ```

---

## Tips for Success

1. **Start with schema design** - Get the architecture right before coding
2. **Use RLS from day one** - Security is easier to build in than bolt on
3. **Design indexes early** - Don't wait for performance problems
4. **Version your migrations** - Track all schema changes in git
5. **Test rollback procedures** - Always have a way back
6. **Monitor query performance** - Catch slow queries before they impact users
7. **Document your decisions** - Explain why you chose certain patterns

---

## Related Guides

- Plugin Setup: `docs/plugins/01-plugin-setup.md`
- Plugin Adoption Plan: `docs/plugins/plugin-plan.md`
- Documentation Plugin: `docs/plugins/02-plugin-docs.md`

---

**Last Updated:** 2025-10-12
**Project:** Medellin Spark (React + TypeScript + Vite)
**Database:** Supabase (PostgreSQL)
**Plugin:** database-operations (claude-code-workflows)
