# Pitch Deck - Core Implementation (Foundation)

**Phase**: Foundation
**Time**: 2-4 hours
**Priority**: 🔴 CRITICAL
**Difficulty**: Beginner-Intermediate

---

## Overview

Core foundation setup for AI-powered pitch deck generation. This phase establishes the database, authentication, basic routes, and AI conversation capability.

**Outcome**: Functional chat interface that can converse with users and collect startup information.

---

## Prerequisites

- Node.js 18+ installed
- Supabase project created
- OpenAI API key
- Git repository initialized

---

## Implementation Steps

### Step 1: Database Setup (30 minutes)

**Create Migration**: `supabase/migrations/20250120000000_pitch_deck_foundation.sql`

```sql
-- 1. Create pitch_conversations table
CREATE TABLE IF NOT EXISTS pitch_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  collected_data JSONB DEFAULT '{}'::jsonb,
  completeness INTEGER DEFAULT 0 CHECK (completeness >= 0 AND completeness <= 100),
  messages JSONB[] DEFAULT ARRAY[]::jsonb[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pitch_conversations_profile ON pitch_conversations(profile_id);
CREATE INDEX idx_pitch_conversations_status ON pitch_conversations(status);

-- 2. Create presentations table (basic structure)
CREATE TABLE IF NOT EXISTS presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES pitch_conversations(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content JSONB DEFAULT '{}'::jsonb,
  outline TEXT[] DEFAULT ARRAY[]::text[],
  slide_count INTEGER DEFAULT 10,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_public BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_presentations_profile ON presentations(profile_id);
CREATE INDEX idx_presentations_status ON presentations(status);
CREATE INDEX idx_presentations_public ON presentations(is_public);
```

**Apply Migration**:
```bash
npx supabase db push
```

**Verification**:
```bash
# Check tables created
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "\dt"

# Expected output should include:
# - pitch_conversations
# - presentations
```

---

### Step 2: Authentication Setup (15 minutes)

**Verify Auth Components Exist**:
- ✅ `src/contexts/AuthContext.tsx` - Authentication provider
- ✅ `src/hooks/useAuth.ts` - Auth hook
- ✅ `src/components/ProtectedRoute.tsx` - Route protection

**No changes needed** - Authentication already configured in project.

---

### Step 3: Basic Routes Setup (15 minutes)

**Update**: `src/App.tsx`

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import PitchDeckWizard from "@/pages/PitchDeckWizard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route
              path="/pitch-deck-wizard"
              element={<ProtectedRoute><PitchDeckWizard /></ProtectedRoute>}
            />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
```

---

### Step 4: Edge Function - Chat (1-2 hours)

**Create**: `supabase/functions/chat/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const openAiKey = Deno.env.get("OPENAI_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversationId } = await req.json();

    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant helping startups create pitch decks. Ask questions to understand their business, problem, solution, market, traction, and team. Be conversational and friendly."
          },
          ...messages
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message;

    // Save conversation to database
    const supabase = createClient(supabaseUrl, supabaseKey);
    if (conversationId) {
      await supabase
        .from("pitch_conversations")
        .update({
          messages: [...messages, aiMessage],
          updated_at: new Date().toISOString(),
        })
        .eq("id", conversationId);
    }

    return new Response(
      JSON.stringify({ message: aiMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
```

**Deploy**:
```bash
# Set OpenAI API key
supabase secrets set OPENAI_API_KEY=sk-...

# Deploy function
supabase functions deploy chat
```

**Test**:
```bash
curl -X POST \
  https://dhesktsqhcxhqfjypulk.supabase.co/functions/v1/chat \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hi"}]}'
```

---

### Step 5: Chat Interface (1 hour)

**Create**: `src/pages/PitchDeckWizard.tsx`

```typescript
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function PitchDeckWizard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await supabase.functions.invoke("chat", {
        body: { messages: [...messages, userMessage] },
      });

      if (response.error) throw response.error;

      const aiMessage: Message = response.data.message;
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Pitch Deck AI Wizard</h1>

      <Card className="p-6 mb-4 h-[500px] overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>👋 Hi! I'm here to help you create an amazing pitch deck.</p>
            <p className="mt-2">Tell me about your startup to get started!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </Card>

      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
```

---

## Success Criteria

### Functional Requirements
- [ ] Database tables created successfully
- [ ] Pitch conversations can be stored
- [ ] Presentations table exists
- [ ] Chat Edge Function deployed
- [ ] Chat interface renders correctly
- [ ] Can send messages to AI
- [ ] AI responds conversationally
- [ ] Messages display in chat UI

### Technical Requirements
- [ ] TypeScript compiles with 0 errors
- [ ] No console errors in browser
- [ ] Edge Function returns 200 status
- [ ] Database queries execute successfully
- [ ] Auth protection working on routes

### User Experience
- [ ] Chat interface is intuitive
- [ ] Loading states show during AI response
- [ ] Error messages display when failures occur
- [ ] Mobile responsive (chat works on phone)

---

## Testing Commands

```bash
# 1. Check TypeScript
pnpm tsc --noEmit

# 2. Check build
pnpm build

# 3. Start dev server
pnpm dev

# Navigate to: http://localhost:8080/pitch-deck-wizard

# 4. Test database
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "SELECT * FROM pitch_conversations LIMIT 5;"

# 5. Test Edge Function
supabase functions logs chat --tail
```

---

## Common Issues & Fixes

### Issue: Edge Function returns 401
**Fix**: Check `OPENAI_API_KEY` is set in Supabase secrets
```bash
supabase secrets list
```

### Issue: Chat doesn't send messages
**Fix**: Check browser console for CORS errors. Verify Edge Function has CORS headers.

### Issue: Database migration fails
**Fix**: Check if tables already exist. Drop and recreate if needed.
```bash
DROP TABLE IF EXISTS pitch_conversations CASCADE;
DROP TABLE IF EXISTS presentations CASCADE;
```

---

## Next Steps

After completing Core implementation:
→ **02-intermediate.md** - Build outline generation, conversation state tracking, and basic editor/viewer

---

**Estimated Total Time**: 2-4 hours
**Difficulty**: Beginner-Intermediate
**Status**: ✅ Ready to implement
