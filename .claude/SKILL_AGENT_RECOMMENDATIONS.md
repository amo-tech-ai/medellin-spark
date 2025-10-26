# Recommended Skills & Agents for Medellin Spark

**Date**: October 22, 2025
**Analysis**: Based on current project structure, workflow gaps, and development patterns

---

## Current State

### Existing Skills (13)
✅ prompt-engineer, copilotkit-pitch-deck, commit-helper, dev-checker, docs-architect
✅ frontend-builder, frontend-dev, pitch-deck-generator, playwright-e2e
✅ production-deploy, supabase-migration, testing-workflow, ui-design, chrome-dev-skill

### Existing Agents (8)
✅ prompt-engineer, copilotkit-architect, database-architect, security-reviewer
✅ task-checker, task-executor, task-orchestrator, ui-developer

### Gaps Identified

1. **Database Operations**: No dedicated DB query optimization or migration review
2. **Security**: Limited security audit capabilities (only basic reviewer)
3. **Performance**: No performance profiling or optimization workflows
4. **Edge Functions**: No specialized Edge Function development/debugging
5. **API Design**: No REST/GraphQL API design patterns
6. **Monitoring**: No observability or logging patterns
7. **Component Library**: No design system maintenance
8. **Data Modeling**: No JSON schema or type generation

---

## Priority 1: High-Impact Additions

### 1. Edge Function Developer (Skill + Agent)

**Skill**: `.claude/skills/edge-function-dev/SKILL.md`

**Why needed**:
- 4 production Edge Functions (chat, pitch-deck-assistant, generate-pitch-deck, agent-example)
- Common debugging patterns (CORS, timeouts, secrets, cold starts)
- Deployment workflow (test → stage → production)

**Skill contents**:
- Deno runtime best practices
- Supabase Edge Function patterns
- Environment variable management
- CORS configuration
- Timeout handling (30s/60s limits)
- Cold start optimization
- OpenAI integration patterns
- Testing Edge Functions locally

**Agent**: `.claude/agents/edge-function-dev.md`

**Agent capabilities**:
- Create new Edge Functions from requirements
- Debug existing Edge Functions (logs, errors, performance)
- Optimize cold start times
- Add secrets and environment variables
- Deploy to staging/production
- Write Edge Function tests

**Invoke with**:
```
subagent_type: "edge-function-dev"
prompt: "Create new Edge Function for user profile updates with RLS validation"
```

---

### 2. Database Query Optimizer (Skill + Agent)

**Skill**: `.claude/skills/db-query-optimizer/SKILL.md`

**Why needed**:
- Complex queries (profiles, presentations, conversations with joins)
- RLS policies add query complexity
- Performance critical for real-time features
- Missing indexes identification

**Skill contents**:
- PostgreSQL query optimization patterns
- Index strategy (B-tree, GIN, partial indexes)
- Query plan analysis (EXPLAIN ANALYZE)
- RLS performance considerations
- N+1 query detection and fixes
- Supabase-specific optimizations
- Connection pooling best practices

**Agent**: `.claude/agents/db-query-optimizer.md`

**Agent capabilities**:
- Analyze slow queries from logs
- Suggest index improvements
- Rewrite queries for performance
- Generate migration for indexes
- Validate RLS policy performance
- Monitor query execution plans

**Invoke with**:
```
subagent_type: "db-query-optimizer"
prompt: "Optimize presentation loading query - currently taking 2s with 100 slides"
```

---

### 3. Security Auditor (Enhanced Agent)

**Enhanced Agent**: `.claude/agents/security-auditor.md`

**Why needed**:
- Current security-reviewer is basic
- Need comprehensive security checks
- API key exposure risks
- RLS policy validation
- OWASP top 10 coverage

**Capabilities** (expanded):
- Full codebase security scan
- API key exposure detection (frontend, logs, commits)
- RLS policy audit (coverage, gaps, bypasses)
- Input validation review
- SQL injection vulnerability scan
- XSS/CSRF vulnerability detection
- Dependency vulnerability check (npm audit)
- Environment variable security
- CORS configuration review
- Rate limiting implementation

**Invoke with**:
```
subagent_type: "security-auditor"
prompt: "Audit entire codebase for security vulnerabilities before production deploy"
```

---

### 4. Performance Profiler (Skill + Agent)

**Skill**: `.claude/skills/performance-profiler/SKILL.md`

**Why needed**:
- Bundle size optimization (current: 554KB, target: <400KB)
- React rendering performance
- Database query performance
- Edge Function cold starts
- Core Web Vitals optimization

**Skill contents**:
- Vite bundle analysis
- React profiler usage
- Code splitting strategies
- Lazy loading patterns
- Image optimization (WebP, lazy load)
- Font loading optimization
- Database query profiling
- Edge Function performance monitoring
- Core Web Vitals (LCP, FID, CLS)

**Agent**: `.claude/agents/performance-profiler.md`

**Agent capabilities**:
- Analyze bundle size and suggest optimizations
- Profile React components for re-renders
- Identify slow database queries
- Measure Edge Function response times
- Generate performance report
- Implement optimizations (code splitting, memoization)
- Monitor Core Web Vitals

**Invoke with**:
```
subagent_type: "performance-profiler"
prompt: "Profile pitch deck wizard page and optimize for <1s load time"
```

---

### 5. API Designer (Skill + Agent)

**Skill**: `.claude/skills/api-designer/SKILL.md`

**Why needed**:
- Consistent API design across Edge Functions
- RESTful best practices
- Error handling patterns
- Request/response schemas

**Skill contents**:
- RESTful API design principles
- HTTP status code usage
- Request validation patterns
- Response formatting (success, error)
- Pagination strategies
- Rate limiting patterns
- API versioning
- OpenAPI/Swagger documentation
- Edge Function API patterns

**Agent**: `.claude/agents/api-designer.md`

**Agent capabilities**:
- Design new API endpoints from requirements
- Review existing API for consistency
- Generate request/response schemas
- Create OpenAPI documentation
- Implement validation middleware
- Add rate limiting
- Design error handling

**Invoke with**:
```
subagent_type: "api-designer"
prompt: "Design API for slide collaboration feature with real-time updates"
```

---

## Priority 2: Workflow Enhancements

### 6. Migration Manager (Agent)

**Agent**: `.claude/agents/migration-manager.md`

**Why needed**:
- Complex migration sequences
- Idempotency validation
- Rollback scripts generation
- Production migration safety

**Capabilities**:
- Create idempotent migrations
- Generate rollback scripts automatically
- Validate migration order
- Test migrations locally before production
- Review migrations for RLS impact
- Monitor migration performance

**Invoke with**:
```
subagent_type: "migration-manager"
prompt: "Create migration to add slide_templates table with proper RLS policies"
```

---

### 7. Component Library Manager (Skill + Agent)

**Skill**: `.claude/skills/component-library/SKILL.md`

**Why needed**:
- shadcn/ui + Radix UI usage patterns
- Consistent component styling
- Design system maintenance
- Component documentation

**Skill contents**:
- shadcn/ui component usage
- Radix UI primitives
- Tailwind CSS utility patterns
- Component composition patterns
- Accessibility best practices (ARIA)
- Responsive design patterns
- Dark mode implementation
- Component documentation (Storybook alternative)

**Agent**: `.claude/agents/component-library-manager.md`

**Agent capabilities**:
- Create new components following design system
- Refactor components for consistency
- Add accessibility features
- Generate component documentation
- Implement dark mode support
- Optimize component performance

**Invoke with**:
```
subagent_type: "component-library-manager"
prompt: "Create data table component with sorting, filtering, and pagination"
```

---

### 8. Type Safety Guardian (Skill + Agent)

**Skill**: `.claude/skills/type-safety/SKILL.md`

**Why needed**:
- TypeScript strict mode enforcement
- Type generation from DB schema
- API response type safety
- Eliminate `any` types

**Skill contents**:
- TypeScript strict mode patterns
- Type narrowing techniques
- Generic type patterns
- Type guards and assertions
- Zod schema validation
- Database type generation (Supabase)
- API type generation (OpenAPI → TypeScript)
- Discriminated unions
- Utility types (Partial, Pick, Omit, etc.)

**Agent**: `.claude/agents/type-safety-guardian.md`

**Agent capabilities**:
- Audit codebase for `any` types
- Generate types from DB schema
- Create Zod schemas for validation
- Add type guards where needed
- Convert JavaScript to TypeScript
- Fix type errors systematically

**Invoke with**:
```
subagent_type: "type-safety-guardian"
prompt: "Eliminate all 'any' types in src/pages/ and add proper types"
```

---

### 9. Monitoring & Observability (Skill + Agent)

**Skill**: `.claude/skills/monitoring/SKILL.md`

**Why needed**:
- Production error tracking
- Performance monitoring
- User analytics
- Edge Function logging

**Skill contents**:
- Error tracking (Sentry integration)
- Logging best practices
- Structured logging (JSON)
- Edge Function log analysis
- Database query logging
- User analytics (PostHog, Mixpanel)
- Performance monitoring (Web Vitals)
- Alert configuration

**Agent**: `.claude/agents/monitoring-agent.md`

**Agent capabilities**:
- Set up error tracking
- Configure logging infrastructure
- Create monitoring dashboards
- Set up alerts
- Analyze production logs
- Generate incident reports

**Invoke with**:
```
subagent_type: "monitoring-agent"
prompt: "Set up error tracking and performance monitoring for production"
```

---

### 10. Test Automation Engineer (Skill + Agent)

**Skill**: `.claude/skills/test-automation/SKILL.md`

**Why needed**:
- E2E test coverage (Playwright)
- Unit test patterns (Vitest)
- Integration test patterns
- Visual regression testing

**Skill contents**:
- Playwright E2E patterns
- Vitest unit test patterns
- React Testing Library usage
- Test fixtures and mocks
- Database test setup (test DB)
- Edge Function testing
- Visual regression testing
- Test coverage analysis
- Continuous testing (CI)

**Agent**: `.claude/agents/test-automation-engineer.md`

**Agent capabilities**:
- Write E2E tests for user journeys
- Create unit tests for components
- Generate integration tests
- Set up visual regression tests
- Analyze test coverage
- Fix failing tests
- Optimize test performance

**Invoke with**:
```
subagent_type: "test-automation-engineer"
prompt: "Create E2E tests for pitch deck creation flow (wizard → generate → edit)"
```

---

## Priority 3: Nice-to-Have Additions

### 11. Documentation Generator (Agent)
- Auto-generate API docs from code
- Create architecture diagrams from code
- Generate component documentation
- Maintain README files

### 12. Deployment Manager (Agent)
- Automate production deployments
- Create deployment checklists
- Manage environment variables
- Monitor deployment health

### 13. Dependency Manager (Skill + Agent)
- npm package updates
- Security vulnerability fixes
- Breaking change migration guides
- Bundle size impact analysis

### 14. Code Reviewer (Agent - Enhanced)
- Automated PR reviews
- Style guide enforcement
- Best practice suggestions
- Security vulnerability detection

### 15. Accessibility Auditor (Skill + Agent)
- WCAG compliance checks
- Screen reader testing
- Keyboard navigation audit
- Color contrast validation

---

## Implementation Priority

### Phase 1: Critical (Next 2 weeks)
1. ✅ Edge Function Developer (most Edge Function work)
2. ✅ Database Query Optimizer (performance critical)
3. ✅ Security Auditor (enhanced - before production)

### Phase 2: High Value (Next month)
4. ✅ Performance Profiler (optimization needed)
5. ✅ API Designer (consistency needed)
6. ✅ Migration Manager (safety critical)

### Phase 3: Workflow Improvements (Next 2 months)
7. Component Library Manager
8. Type Safety Guardian
9. Monitoring & Observability
10. Test Automation Engineer

### Phase 4: Future Enhancements
11-15. Nice-to-have agents as needed

---

## Recommended Creation Order

**Week 1**:
1. Edge Function Developer (Skill + Agent)
2. Security Auditor (Enhanced Agent only)

**Week 2**:
3. Database Query Optimizer (Skill + Agent)
4. Performance Profiler (Skill + Agent)

**Week 3**:
5. API Designer (Skill + Agent)
6. Migration Manager (Agent only)

**Week 4**:
7. Type Safety Guardian (Skill + Agent)
8. Test Automation Engineer (Skill + Agent)

---

## Usage Patterns

### Daily Development
- **Edge Function Developer**: Edge Function work (daily)
- **Type Safety Guardian**: Code reviews (daily)
- **Security Auditor**: Pre-commit checks (daily)

### Weekly Tasks
- **Performance Profiler**: Weekly performance checks
- **Database Query Optimizer**: Weekly query optimization
- **Test Automation Engineer**: Weekly test additions

### Monthly Tasks
- **API Designer**: API design reviews (monthly)
- **Migration Manager**: Migration planning (monthly)
- **Component Library Manager**: Design system updates (monthly)

### Pre-Production
- **Security Auditor**: Full security audit
- **Performance Profiler**: Full performance audit
- **Test Automation Engineer**: Full test coverage check

---

## Expected Impact

### Development Speed
- **+30% faster** Edge Function development (dedicated skill/agent)
- **+25% faster** database optimization (query analyzer)
- **+20% faster** API development (consistent patterns)

### Code Quality
- **Zero `any` types** (Type Safety Guardian)
- **100% RLS coverage** (Security Auditor)
- **90%+ test coverage** (Test Automation Engineer)

### Performance
- **<400KB bundle size** (Performance Profiler - currently 554KB)
- **<100ms DB queries** (Query Optimizer)
- **<1s Edge Function response** (Edge Function Developer)

### Security
- **Zero API key exposures** (Security Auditor)
- **100% RLS policy coverage** (Security Auditor)
- **OWASP Top 10 compliance** (Security Auditor)

---

## Next Steps

1. **Review recommendations** with team
2. **Prioritize top 3-5** based on immediate needs
3. **Create skills/agents** in priority order
4. **Test with real tasks** before full rollout
5. **Document usage patterns** in CLAUDE.md
6. **Iterate based on feedback**

---

**Status**: 📋 Recommendations Ready
**Total Recommended**: 15 skills/agents (10 priority, 5 nice-to-have)
**Implementation Time**: 4 weeks for top 10
