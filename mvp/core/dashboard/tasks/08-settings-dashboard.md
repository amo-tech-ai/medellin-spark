# Task 08: Connect Settings Dashboard

**Phase**: Core Pages (Week 2, Day 3)
**Priority**: 🟡 MEDIUM
**Time**: 2-3 hours
**Dependencies**: 02

---

## Objective

Connect existing Settings page to Supabase for profile updates.

---

## File to Update

`src/pages/DashboardSettings.tsx` (already exists)

---

## Implementation Steps

### 1. Add Profile Hook

```typescript
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';

const { data: profile, isLoading } = useProfile();
const updateProfile = useUpdateProfile();
```

### 2. Handle Form Submission

```typescript
const handleSubmit = async (data) => {
  await updateProfile.mutateAsync(data);
  toast.success('Profile updated successfully');
};
```

### 3. Add Loading State

```typescript
if (isLoading) return <LoadingState type="form" />;
```

### 4. Pre-fill Form with Profile Data

```typescript
<Input defaultValue={profile?.full_name} />
<Textarea defaultValue={profile?.bio} />
```

---

## New Features

### 1. Profile Settings
- Update name
- Update bio
- Update social links

### 2. Notification Preferences
- Email notifications
- Event reminders
- Job alerts

### 3. Privacy Settings
- Profile visibility
- Show email
- Show activity

---

## Success Criteria

- [ ] Profile loads from Supabase
- [ ] Form updates profile
- [ ] Loading states work
- [ ] Success toast shows
- [ ] Error handling works
- [ ] Form validation works
- [ ] No TypeScript errors

---

## Testing

```bash
# TypeScript check
pnpm tsc --noEmit

# Visit page
open http://localhost:8080/dashboard/settings

# Test:
# - Profile data loads
# - Update name → saves
# - Update bio → saves
# - Toast messages show
# - Validation works
```

---

## Next Task

→ **09-perks-dashboard.md**
