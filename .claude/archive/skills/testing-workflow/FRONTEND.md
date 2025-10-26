# Layer 3: Frontend Testing

**Test components - 2 minutes**

---

## Quick Tests

### 1. TypeScript Compiles
```bash
pnpm tsc --noEmit
```
✅ 0 errors

### 2. Build Succeeds
```bash
pnpm build
```
✅ < 5 seconds, no errors

### 3. Wizard Loads
```bash
pnpm dev
# Open: http://localhost:8080/pitch-deck-wizard
```
✅ Chat interface renders, no console errors

### 4. Slide Editor Works
```bash
# Open: http://localhost:8080/presentations/d4a27c1c-8b2d-48a9-99c9-2298037e9e81/outline
```
✅ All 10 slides render

---

## Checklist

- [ ] TypeScript compiles
- [ ] Build succeeds
- [ ] Wizard loads
- [ ] Slides render
- [ ] No console errors

**Simple and done!**
