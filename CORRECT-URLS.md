# ✅ Correct Medellin AI URLs

**Frontend Server**: Vite (Production Preview Mode)
**Port**: 4173
**Status**: ✅ RUNNING

---

## URLs to Use

### Main Application
**Base URL**: http://localhost:4173

### Pitch Deck Wizard
**Direct Link**: http://localhost:4173/pitch-deck-wizard

### Other Routes
- Home: http://localhost:4173/
- Dashboard: http://localhost:4173/dashboard
- Pitch Decks: http://localhost:4173/dashboard/pitch-decks
- Events: http://localhost:4173/events
- Jobs: http://localhost:4173/jobs

---

## Backend (Blaxel)
**Port**: 1339
**WebSocket Endpoint**: ws://localhost:1339/copilotkit
**Status**: ✅ RUNNING
**Process ID**: 817773

---

## ⚠️ Wrong URL

**DO NOT USE**: http://localhost:8080
- This is running the Twenty CRM project
- Different app entirely

**USE INSTEAD**: http://localhost:4173

---

## Quick Test

```bash
# Test frontend
curl http://localhost:4173

# Check if pitch deck wizard loads
curl http://localhost:4173/pitch-deck-wizard

# Backend health (WebSocket - will fail with curl)
curl http://localhost:1339/copilotkit
# Expected: "You cannot access a WebSocket server directly"
```

---

## To Start Fresh (if needed)

```bash
# Stop current server
# Find process: lsof -i :4173
# Kill: kill <PID>

# Start fresh
cd /home/sk/mde
npm run build
npm run preview  # Runs on port 4173
```

---

**Updated**: 2025-01-26
**Correct URL**: http://localhost:4173/pitch-deck-wizard ✅
