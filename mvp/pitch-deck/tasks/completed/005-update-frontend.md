# Task 005: Update Frontend

**Status**: Pending
**Priority**: High
**Time**: 30 minutes
**Dependencies**: 004-deploy-edge-function

---

## Objective

Update `PitchDeckWizard.tsx` to use the new Claude AI endpoint with conversation tracking and progress indicators.

---

## File to Modify

**Path**: `src/pages/PitchDeckWizard.tsx`

---

## Changes Required

### 1. Add New State Variables (Line ~43)

**Find**:
```typescript
const [messages, setMessages] = useState<Message[]>([...]);
const [inputValue, setInputValue] = useState("");
const [isTyping, setIsTyping] = useState(false);
```

**Add after**:
```typescript
// ✅ NEW: Conversation state
const [conversationId, setConversationId] = useState<string | null>(null);
const [completeness, setCompleteness] = useState(0);
const [collectedData, setCollectedData] = useState<any>({});
const [readyToGenerate, setReadyToGenerate] = useState(false);
```

### 2. Get Authenticated User

**Add at top of component** (after imports):
```typescript
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const PitchDeckWizard = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  // ... existing state
```

### 3. Update API Call (Line ~64-95)

**Replace**:
```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/chat`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [/* ... */],
    temperature: 0.7,
    max_tokens: 500,
  }),
});
```

**With**:
```typescript
// Get current session
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  throw new Error('Please sign in to continue');
}

const response = await fetch(
  `${SUPABASE_URL}/functions/v1/pitch-deck-assistant`,  // ✅ Changed endpoint
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.access_token}`,  // ✅ Real JWT
    },
    body: JSON.stringify({
      conversation_id: conversationId,  // ✅ Track conversation
      message: userInput,
      profile_id: user?.id  // ✅ Current user
    }),
  }
);
```

### 4. Update Response Handling (Line ~94-100)

**Replace**:
```typescript
const data = await response.json();
const aiContent = data.choices[0]?.message?.content || "I'm having trouble responding.";

const aiMessage: Message = {
  id: (Date.now() + 1).toString(),
  role: "assistant",
  content: aiContent,
  timestamp: new Date(),
};
```

**With**:
```typescript
const data = await response.json();

// ✅ Update conversation state
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
```

### 5. Add Progress Indicator

**Find the sidebar section** (around line 154):

**Add**:
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
        <DataItem label="Company Name" filled={!!collectedData.company_name} />
        <DataItem label="Industry" filled={!!collectedData.industry} />
        <DataItem label="Problem" filled={!!collectedData.problem} />
        <DataItem label="Solution" filled={!!collectedData.solution} />
        <DataItem label="Target Market" filled={!!collectedData.target_market} />
        <DataItem label="Business Model" filled={!!collectedData.business_model} />
      </div>
    </div>
  </div>
</aside>
```

### 6. Add DataItem Component

**Add at bottom of file** (before export):

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

### 7. Add Generate Button

**Add above input area** (around line 239):

```typescript
{/* Generate Button - Shows when ready */}
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
```

### 8. Add Generate Handler

**Add before return statement**:

```typescript
const handleGenerateDeck = async () => {
  if (!conversationId) {
    toast.error("No conversation found");
    return;
  }

  try {
    setIsTyping(true);

    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const { data: { session } } = await supabase.auth.getSession();

    // Call existing generate-pitch-deck function
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/generate-pitch-deck`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          profile_id: user?.id,
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

    // Navigate to deck preview
    window.location.href = `/pitch-deck/${data.deck_id}/preview`;

  } catch (error) {
    console.error("Generation error:", error);
    toast.error("Failed to generate deck. Please try again.");
  } finally {
    setIsTyping(false);
  }
};

// Helper function
function formatPromptFromData(data: any): string {
  return `Create a professional pitch deck for ${data.company_name}, a ${data.industry} company.

Problem: ${data.problem}
Solution: ${data.solution}
Target Market: ${data.target_market}
Business Model: ${data.business_model}

Generate 10 compelling slides for investors.`;
}
```

### 9. Add Toast Notifications

**Install sonner** (if not installed):
```bash
pnpm add sonner
```

**Add import**:
```typescript
import { toast } from "sonner";
```

**Add to App.tsx**:
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

## Testing

### 1. Start Development Server

```bash
pnpm dev
```

Open: http://localhost:8080/pitch-deck-wizard

### 2. Test Conversation Flow

1. Type: "I need a pitch deck for my startup"
2. **Verify**: Claude responds (not OpenAI)
3. **Verify**: Progress bar appears at 0%
4. Continue conversation, provide company details
5. **Verify**: Progress bar increases
6. **Verify**: Data items fill in (green dots)
7. Continue until 80%+ completeness
8. **Verify**: "Generate Deck" button appears
9. Click "Generate Deck"
10. **Verify**: Redirects to deck preview

---

## Troubleshooting

### "Please sign in to continue"
- User not authenticated
- Add auth check in component mount

### Progress bar stays at 0%
- Check API response includes `completeness`
- Verify Edge Function is returning calculated value

### Generate button doesn't appear
- Check `completeness >= 80`
- Provide more complete information in conversation

### CORS errors
- Verify `ALLOWED_ORIGIN` is set to `http://localhost:8080`
- Check Edge Function logs

---

## Success Criteria

- [ ] Frontend updated with new state
- [ ] API endpoint changed to `/pitch-deck-assistant`
- [ ] Auth token passed correctly
- [ ] Progress indicator shows and updates
- [ ] Data collection checklist works
- [ ] Generate button appears at 80%+
- [ ] Deck generation works
- [ ] No console errors

---

## Next Task

✅ Once complete → Proceed to **006-test-end-to-end.md**
