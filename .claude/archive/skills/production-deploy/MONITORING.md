# Monitoring Setup

**Simple monitoring - just the essentials.**

---

## Supabase Logs

### Real-time Edge Function Logs
```bash
supabase functions logs chat --tail
```

### Filter Errors Only
```bash
supabase functions logs chat --tail | grep ERROR
```

### Check Last Hour
```bash
supabase functions logs chat --since 1h
```

---

## Error Tracking (Optional)

### Sentry Setup
```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

---

## Simple Alerts

### Supabase Dashboard
1. Go to Supabase Dashboard
2. Navigate to "Logs" section
3. Set up email alerts for errors

### Critical Metrics to Watch
- Edge Function errors
- Database connection errors
- Failed API calls
- Slow queries

---

**That's it!** Keep monitoring simple and actionable.
