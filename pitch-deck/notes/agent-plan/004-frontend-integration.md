# Frontend Integration - PitchDeckWizard.tsx

**Time**: 1 hour
**Difficulty**: Easy
**File**: `src/pages/PitchDeckWizard.tsx`

---

## What Changes

**Current**: Calls `/chat` (OpenAI)
**New**: Calls `/pitch-deck-assistant` (Claude)

**Added**:
- Track conversation ID
- Track completeness %
- Show "Generate Deck" button at 80%+
- Display data collection progress

---

## Step 1: Add New State (5 min)

Find the existing state declarations (~line 43) and add:

```typescript
// Existing state
const [messages, setMessages] = useState<Message[]>([...]);
const [inputValue, setInputValue] = useState("");
const [isTyping, setIsTyping] = useState(false);

// ✅ ADD THESE NEW STATES
const [conversationId, setConversationId] = useState<string | null>(null);
const [completeness, setCompleteness] = useState(0);
const [collectedData, setCollectedData] = useState<any>({});
const [readyToGenerate, setReadyToGenerate] = useState(false);
```

---

## Step 2: Update API Call (10 min)

Find `handleSend` function (~line 46) and replace the fetch call:

```typescript
const handleSend = async () => {
  if (!inputValue.trim()) return;

  // Add user message
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: inputValue,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  const userInput = inputValue;
  setInputValue("");
  setIsTyping(true);

  try {
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // ✅ CHANGED: New endpoint
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/pitch-deck-assistant`,  // Changed from /chat
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          conversation_id: conversationId,  // ✅ Added
          message: userInput,
          profile_id: "current-user-id"  // TODO: Get from auth context
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // ✅ CHANGED: Update new state
    if (data.conversation_id && !conversationId) {
      setConversationId(data.conversation_id);
    }

    setCompleteness(data.completeness || 0);
    setCollectedData(data.collected_data || {});
    setReadyToGenerate(data.ready_to_generate || false);

    // Add AI response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: data.message || "I'm having trouble responding.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);

  } catch (error) {
    console.error("Claude API Error:", error);

    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Sorry, I'm having trouble connecting. Please try again.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};
```

---

## Step 3: Add Progress Indicator (15 min)

Update the progress sidebar (~line 154) to show real data:

```typescript
{/* Progress Sidebar - Desktop Only */}
<aside className="hidden lg:block w-64 border-r border-border bg-muted/30 p-6">
  <div className="space-y-6">
    {/* Completeness Progress */}
    <div>
      <h3 className="text-sm font-semibold mb-3">Progress</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Completeness</span>
          <span className="font-medium">{completeness}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>
    </div>

    {/* Data Collected */}
    <div className="pt-4 border-t border-border">
      <h3 className="text-sm font-semibold mb-3">Data Collected</h3>
      <div className="space-y-2 text-sm text-muted-foreground">
        <DataItem
          label="Company Name"
          filled={!!collectedData.company_name}
        />
        <DataItem
          label="Industry"
          filled={!!collectedData.industry}
        />
        <DataItem
          label="Problem"
          filled={!!collectedData.problem}
        />
        <DataItem
          label="Solution"
          filled={!!collectedData.solution}
        />
        <DataItem
          label="Target Market"
          filled={!!collectedData.target_market}
        />
        <DataItem
          label="Business Model"
          filled={!!collectedData.business_model}
        />
      </div>
    </div>
  </div>
</aside>
```

Add helper component at bottom of file:

```typescript
// Data Item Component
const DataItem = ({ label, filled }: { label: string; filled: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${filled ? 'bg-green-500' : 'bg-muted'}`} />
      <span className={filled ? 'text-foreground font-medium' : ''}>{label}</span>
    </div>
  );
};
```

---

## Step 4: Add Generate Button (15 min)

Add button above the input area (~line 239):

```typescript
{/* Input Bar */}
<div className="border-t border-border bg-background p-4">
  <div className="max-w-3xl mx-auto">
    {/* ✅ ADDED: Generate Button */}
    {readyToGenerate && (
      <div className="mb-4 p-4 bg-primary/10 border border-primary rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-primary mb-1">
              Ready to Generate! 🎉
            </h4>
            <p className="text-sm text-muted-foreground">
              I have all the information needed for your pitch deck
            </p>
          </div>
          <Button
            onClick={handleGenerateDeck}
            size="lg"
            className="ml-4"
          >
            Generate Deck →
          </Button>
        </div>
      </div>
    )}

    {/* Existing input */}
    <div className="flex gap-2 items-end">
      <Textarea ... />
      <Button ... />
    </div>
  </div>
</div>
```

---

## Step 5: Add Generate Handler (10 min)

Add this function before the return statement:

```typescript
const handleGenerateDeck = async () => {
  if (!conversationId) {
    toast.error("No conversation found");
    return;
  }

  try {
    setIsTyping(true);

    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Call existing generate-pitch-deck function
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/generate-pitch-deck`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          profile_id: "current-user-id",  // TODO: Get from auth
          company_name: collectedData.company_name,
          industry: collectedData.industry,
          prompt: formatPromptFromData(collectedData)
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Generation failed");
    }

    const data = await response.json();

    // Update conversation with deck_id
    await fetch(
      `${SUPABASE_URL}/rest/v1/pitch_conversations?id=eq.${conversationId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "apikey": SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          deck_id: data.deck_id,
          status: "completed"
        }),
      }
    );

    // Navigate to deck preview
    window.location.href = `/pitch-deck/${data.deck_id}/preview`;

  } catch (error) {
    console.error("Generation error:", error);
    toast.error("Failed to generate deck. Please try again.");
  } finally {
    setIsTyping(false);
  }
};

// Helper to format collected data into prompt
function formatPromptFromData(data: any): string {
  return `Create a professional pitch deck for ${data.company_name}, a ${data.industry} company.

Problem: ${data.problem}
Solution: ${data.solution}
Target Market: ${data.target_market}
Business Model: ${data.business_model}

Generate 10 compelling slides for investors.`;
}
```

---

## Step 6: Add Toast Notifications (5 min)

Install sonner if not already:
```bash
pnpm add sonner
```

Add at top of file:
```typescript
import { toast } from "sonner";
```

Add toast container in main App.tsx:
```typescript
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      {/* ... rest of app */}
    </>
  );
}
```

---

## Testing Checklist

**Test Flow**:
1. Open `/pitch-deck-wizard`
2. Type: "I need a pitch deck"
3. Verify: Claude responds
4. Continue conversation
5. Verify: Progress bar increases
6. Verify: Data items fill in
7. At 80%: "Generate" button appears
8. Click "Generate"
9. Verify: Deck created
10. Verify: Redirects to preview

**Debug Tips**:
- Check browser console for errors
- Check Network tab for API calls
- Verify conversation_id is set
- Check completeness updates

---

## Troubleshooting

### Button doesn't appear
**Check**: Is `completeness >= 80`?
**Fix**: Add more data in conversation

### "No conversation found" error
**Check**: Is `conversationId` state set?
**Fix**: Verify API response includes `conversation_id`

### Progress bar doesn't update
**Check**: Is `setCompleteness()` called?
**Fix**: Verify API returns `completeness` field

### Generate fails
**Check**: Does `generate-pitch-deck` function exist?
**Fix**: Verify function is deployed

---

## File Changes Summary

**Modified**: `src/pages/PitchDeckWizard.tsx`

**Added**:
- 4 new state variables (conversationId, completeness, collectedData, readyToGenerate)
- Updated API endpoint (/chat → /pitch-deck-assistant)
- Progress indicator with real data
- Generate deck button + handler
- Data collection checklist

**Lines changed**: ~100 lines

---

## Next Step

✅ Frontend integrated → Go to `005-deployment-checklist.md`

---

**Note**: Remember to replace `"current-user-id"` with actual auth.uid() from Supabase Auth context.
