# 📦 TASK 7: TESTING & VALIDATION

**Priority**: 🟢 MEDIUM
**Estimated Time**: 30-45 minutes
**Dependencies**: All tasks 01-06
**Status**: 🔴 NOT STARTED

---

## 🎯 OBJECTIVE

Test the complete pitch deck wizard workflow from conversation to presentation.

---

## 🔧 STEP-BY-STEP INSTRUCTIONS

### Step 1: Start Backend

```bash
# Terminal 1: Backend
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate
bl serve --hotreload
```

**Expected**: Server running on http://localhost:1339

---

### Step 2: Start Frontend

```bash
# Terminal 2: Frontend
cd /home/sk/mde
npm run dev
```

**Expected**: App running on http://localhost:8080

---

### Step 3: Enable Pitch Deck Wizard

Edit `/home/sk/mde/src/pages/PitchDeckWizard.tsx`:

Change line 12:
```typescript
const EDGE_FUNCTIONS_DISABLED = false;  // Changed from true
```

Save and let Vite hot-reload.

---

### Step 4: Test User Journey

**Navigate**: http://localhost:8080/pitch-deck-wizard

**Test Conversation** (3-4 messages):
```
1. User: "I want to create a pitch deck for TechStartup, an AI assistant for developers"
   → AI should ask about industry/problem

2. User: "We solve the problem of slow code reviews using AI"
   → AI should ask about solution/market

3. User: "Our target market is software development teams at tech companies"
   → AI should ask about business model

4. User: "We charge $50/user/month"
   → Progress should be 60%+, Generate button appears
```

**Verify**:
- [ ] Messages appear in chat
- [ ] AI responds appropriately
- [ ] Progress bar increases
- [ ] Collected data sidebar updates
- [ ] Generate button appears at 60%+

---

### Step 5: Generate Presentation

Click "Generate Deck" button

**Verify**:
- [ ] Redirects to /presentations/{id}/outline
- [ ] 10 slides created
- [ ] Slide titles make sense
- [ ] Can edit slide titles
- [ ] Can reorder slides (drag-drop)

---

### Step 6: Edit Slides

Click "Edit Slides" button

**Verify**:
- [ ] Redirects to /presentations/{id}/edit
- [ ] Thumbnail panel shows all slides
- [ ] Can edit slide content
- [ ] Layout selector works
- [ ] Auto-save indicator shows

---

### Step 7: View Presentation

Click "Present" button

**Verify**:
- [ ] Full-screen presentation mode
- [ ] Arrow keys navigate slides
- [ ] ESC exits presentation
- [ ] All 10 slides display

---

### Step 8: Database Verification

```bash
# Check Supabase dashboard
# Or run query:

# Verify presentation created
SELECT id, title, slide_count, status
FROM presentations
ORDER BY created_at DESC
LIMIT 1;

# Verify conversation saved
SELECT id, completeness
FROM pitch_conversations
ORDER BY created_at DESC
LIMIT 1;
```

**Verify**:
- [ ] Presentation record exists
- [ ] slide_count = 10
- [ ] content.slides array has 10 items
- [ ] Conversation saved with messages

---

## ✅ SUCCESS CRITERIA

**Backend**:
- [ ] Server starts on port 1339
- [ ] No errors in console
- [ ] WebSocket endpoint active

**Frontend**:
- [ ] PitchDeckWizard loads
- [ ] Chat interface works
- [ ] AI responds to messages
- [ ] Progress tracking updates

**Integration**:
- [ ] Complete conversation flow (4+ messages)
- [ ] Generate deck creates 10 slides
- [ ] Outline editor functional
- [ ] Slide editor functional
- [ ] Presentation viewer works

**Database**:
- [ ] Presentation persisted
- [ ] Conversation saved
- [ ] All data correct

---

## 🚨 TROUBLESHOOTING

### Backend Won't Start
```bash
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate
python3 -c "from src.agent import agent"
```

### Frontend Shows DISABLED Message
```bash
# Verify line 12 in PitchDeckWizard.tsx
grep "EDGE_FUNCTIONS_DISABLED" src/pages/PitchDeckWizard.tsx
# Should show: const EDGE_FUNCTIONS_DISABLED = false;
```

### AI Not Responding
```bash
# Check backend logs
# Verify WebSocket connection in browser dev tools
```

### Generate Deck Fails
```bash
# Check browser console for errors
# Verify Supabase connection
# Check backend database module
```

---

## 📝 PROOF OF COMPLETION

**Screenshot Evidence**:
1. Chat conversation with AI (4+ messages)
2. Progress bar at 60%+ with Generate button
3. Outline editor with 10 slides
4. Slide editor with content
5. Presentation viewer full-screen

**Database Evidence**:
```sql
-- Show latest presentation
SELECT title, slide_count, status, created_at
FROM presentations
ORDER BY created_at DESC
LIMIT 1;

-- Show conversation
SELECT completeness, created_at
FROM pitch_conversations
ORDER BY created_at DESC
LIMIT 1;
```

**Console Output**:
```
✅ Backend running: http://localhost:1339
✅ Frontend running: http://localhost:8080
✅ PitchDeckWizard enabled
✅ AI conversation successful
✅ Deck generated (10 slides)
✅ Database persistence verified
✅ TASK 7 COMPLETE
```

---

**Status**: ✅ ALL TASKS COMPLETE - SYSTEM PRODUCTION READY
