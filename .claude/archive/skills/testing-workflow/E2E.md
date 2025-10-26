# Layer 4: E2E Testing

**Complete user journeys - 5 minutes**

---

## Playwright Tests

### Quick Run
```bash
npx playwright test
```

### With UI (debug)
```bash
npx playwright test --ui
```

### Specific Test
```bash
npx playwright test e2e/pitch-deck-wizard.spec.ts
```

---

## Manual E2E Test

**Complete Pitch Deck Flow (3 min):**

1. Open `/pitch-deck-wizard`
2. Send: "Create pitch deck for TestCorp"
3. Answer 3-4 questions
4. Wait for progress → 80%+
5. Click "Generate Deck"
6. Verify redirect to `/presentations/{id}/outline`
7. Check all 10 slides render

✅ Complete flow works

---

## Checklist

- [ ] Playwright tests pass
- [ ] Manual flow works
- [ ] No console errors
- [ ] No network errors
- [ ] All slides render

**Simple and done!**
