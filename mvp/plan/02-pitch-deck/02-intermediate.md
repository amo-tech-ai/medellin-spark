# Pitch Deck - Intermediate Implementation

**Phase**: Core Features
**Time**: 1 week (5-7 days)
**Priority**: 🔴 HIGH
**Difficulty**: Intermediate
**Prerequisites**: 01-core.md must be complete

---

## Overview

Complete the AI wizard conversation flow with data collection, progress tracking, outline generation, and basic editing/viewing capabilities.

**Outcome**: Full working MVP where users can chat with AI, generate 10-slide outlines, edit content, and view presentations.

---

## Implementation Steps

### Step 1: Enhanced Conversation State (Day 1: 3-4 hours)

**Update**: `src/pages/PitchDeckWizard.tsx`

Add conversation state management with progress tracking:

```typescript
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CollectedData {
  companyName?: string;
  problem?: string;
  solution?: string;
  targetMarket?: string;
  businessModel?: string;
  traction?: string;
}

export default function PitchDeckWizard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [collectedData, setCollectedData] = useState<CollectedData>({});
  const [completeness, setCompleteness] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize or load conversation
  useEffect(() => {
    if (!user) return;

    const initConversation = async () => {
      const { data, error } = await supabase
        .from("pitch_conversations")
        .insert({
          profile_id: user.id,
          collected_data: {},
          completeness: 0,
          messages: [],
        })
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to start conversation",
          variant: "destructive",
        });
        return;
      }

      setConversationId(data.id);
    };

    initConversation();
  }, [user]);

  const sendMessage = async () => {
    if (!input.trim() || !conversationId) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await supabase.functions.invoke("chat", {
        body: {
          messages: [...messages, userMessage],
          conversationId,
          collectedData,
        },
      });

      if (response.error) throw response.error;

      const aiMessage: Message = response.data.message;
      const updatedData: CollectedData = response.data.collectedData || collectedData;
      const progress: number = response.data.completeness || completeness;

      setMessages((prev) => [...prev, aiMessage]);
      setCollectedData(updatedData);
      setCompleteness(progress);

      // If 80%+ complete, show generate button
      if (progress >= 80) {
        toast({
          title: "Ready to Generate!",
          description: "You can now generate your pitch deck",
        });
      }
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

  const generateDeck = async () => {
    if (!conversationId) return;

    setLoading(true);
    try {
      const response = await supabase.functions.invoke("generate-pitch-deck", {
        body: {
          conversationId,
          collectedData,
        },
      });

      if (response.error) throw response.error;

      const presentationId = response.data.presentationId;
      navigate(`/presentations/${presentationId}/outline`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate pitch deck",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Pitch Deck AI Wizard</h1>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Information Collected</span>
            <span className="font-semibold">{completeness}%</span>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>
      </div>

      {/* Chat Messages */}
      <Card className="p-6 mb-4 h-[500px] overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg">👋 Hi! I'm here to help you create an amazing pitch deck.</p>
            <p className="mt-2">Tell me about your startup to get started!</p>
            <p className="mt-4 text-sm">I'll ask you about:</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>✓ Your company and problem</li>
              <li>✓ Your solution and target market</li>
              <li>✓ Business model and traction</li>
            </ul>
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

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>

      {/* Generate Deck Button */}
      {completeness >= 80 && (
        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Ready to Generate</h3>
              <p className="text-sm text-muted-foreground">
                We have enough information to create your pitch deck!
              </p>
            </div>
            <Button onClick={generateDeck} disabled={loading}>
              Generate Deck →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### Step 2: Update Chat Edge Function (Day 1: 2 hours)

**Update**: `supabase/functions/chat/index.ts`

Add data extraction logic using OpenAI function calling:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const openAiKey = Deno.env.get("OPENAI_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const dataExtractionTool = {
  type: "function",
  function: {
    name: "save_startup_data",
    description: "Save collected startup information",
    parameters: {
      type: "object",
      properties: {
        companyName: { type: "string", description: "Company name" },
        problem: { type: "string", description: "Problem being solved" },
        solution: { type: "string", description: "Proposed solution" },
        targetMarket: { type: "string", description: "Target market" },
        businessModel: { type: "string", description: "Revenue model" },
        traction: { type: "string", description: "Current traction/metrics" },
      },
    },
  },
};

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversationId, collectedData } = await req.json();

    // Call OpenAI with function calling
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
            content: `You are a pitch deck consultant. Ask questions to collect: company name, problem, solution, target market, business model, and traction. Extract information as the user provides it. Be conversational and friendly. Current data collected: ${JSON.stringify(collectedData)}`,
          },
          ...messages,
        ],
        tools: [dataExtractionTool],
        tool_choice: "auto",
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message;

    // Process function calls
    let updatedData = { ...collectedData };
    if (aiMessage.tool_calls) {
      for (const toolCall of aiMessage.tool_calls) {
        if (toolCall.function.name === "save_startup_data") {
          const extractedData = JSON.parse(toolCall.function.arguments);
          updatedData = { ...updatedData, ...extractedData };
        }
      }
    }

    // Calculate completeness (6 required fields)
    const requiredFields = ["companyName", "problem", "solution", "targetMarket", "businessModel", "traction"];
    const filledFields = requiredFields.filter((field) => updatedData[field]);
    const completeness = Math.round((filledFields.length / requiredFields.length) * 100);

    // Update database
    const supabase = createClient(supabaseUrl, supabaseKey);
    await supabase
      .from("pitch_conversations")
      .update({
        messages: [...messages, aiMessage],
        collected_data: updatedData,
        completeness,
        updated_at: new Date().toISOString(),
      })
      .eq("id", conversationId);

    return new Response(
      JSON.stringify({
        message: aiMessage,
        collectedData: updatedData,
        completeness,
      }),
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

**Redeploy**:
```bash
supabase functions deploy chat
```

---

### Step 3: Outline Generation Edge Function (Day 2: 3-4 hours)

**Create**: `supabase/functions/generate-pitch-deck/index.ts`

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
    const { conversationId, collectedData } = await req.json();

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get profile_id from conversation
    const { data: conversation } = await supabase
      .from("pitch_conversations")
      .select("profile_id")
      .eq("id", conversationId)
      .single();

    if (!conversation) throw new Error("Conversation not found");

    // Generate outline using OpenAI
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
            content: "Generate a 10-slide pitch deck outline. Return ONLY a JSON array of 10 slide titles. Each title should be clear, professional, and specific to the startup.",
          },
          {
            role: "user",
            content: `Startup data: ${JSON.stringify(collectedData)}. Generate 10 slide titles.`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const outline = JSON.parse(data.choices[0].message.content).slides;

    // Create presentation
    const { data: presentation, error } = await supabase
      .from("presentations")
      .insert({
        profile_id: conversation.profile_id,
        conversation_id: conversationId,
        title: collectedData.companyName || "Untitled Pitch Deck",
        outline,
        slide_count: 10,
        content: { slides: outline.map((title: string) => ({ title, bullets: [] })) },
        status: "draft",
      })
      .select()
      .single();

    if (error) throw error;

    // Mark conversation as completed
    await supabase
      .from("pitch_conversations")
      .update({ status: "completed" })
      .eq("id", conversationId);

    return new Response(
      JSON.stringify({ presentationId: presentation.id }),
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
supabase functions deploy generate-pitch-deck
```

---

### Step 4: Outline Editor Page (Day 3-4: 6-8 hours)

**Create**: `src/pages/presentations/OutlineEditor.tsx`

```typescript
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function OutlineEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [presentation, setPresentation] = useState<any>(null);
  const [slides, setSlides] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load presentation
  useEffect(() => {
    const loadPresentation = async () => {
      const { data, error } = await supabase
        .from("presentations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load presentation",
          variant: "destructive",
        });
        return;
      }

      setPresentation(data);
      setSlides(data.outline || []);
      setLoading(false);
    };

    loadPresentation();
  }, [id]);

  // Handle drag and drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = slides.findIndex((_, i) => i.toString() === active.id);
    const newIndex = slides.findIndex((_, i) => i.toString() === over.id);

    const newSlides = [...slides];
    const [removed] = newSlides.splice(oldIndex, 1);
    newSlides.splice(newIndex, 0, removed);

    setSlides(newSlides);
    saveOutline(newSlides);
  };

  // Save outline
  const saveOutline = async (newSlides: string[]) => {
    await supabase
      .from("presentations")
      .update({
        outline: newSlides,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
  };

  // Update slide title
  const updateSlideTitle = (index: number, title: string) => {
    const newSlides = [...slides];
    newSlides[index] = title;
    setSlides(newSlides);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{presentation.title}</h1>
          <p className="text-muted-foreground">Edit your presentation outline</p>
        </div>
        <Button onClick={() => navigate(`/presentations/${id}/edit`)}>
          Continue to Editor →
        </Button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={slides.map((_, i) => i.toString())} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {slides.map((slide, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                  <Input
                    value={slide}
                    onChange={(e) => updateSlideTitle(index, e.target.value)}
                    onBlur={() => saveOutline(slides)}
                    className="flex-1"
                  />
                </div>
              </Card>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
```

**Install Dependencies**:
```bash
pnpm add @dnd-kit/core @dnd-kit/sortable
```

---

### Step 5: Basic Slide Viewer (Day 5: 4-5 hours)

**Create**: `src/pages/presentations/PresentationViewer.tsx`

```typescript
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function PresentationViewer() {
  const { id } = useParams();
  const [presentation, setPresentation] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadPresentation = async () => {
      const { data } = await supabase
        .from("presentations")
        .select("*")
        .eq("id", id)
        .single();

      setPresentation(data);
    };

    loadPresentation();
  }, [id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSlide < presentation?.slide_count - 1) {
        setCurrentSlide((prev) => prev + 1);
      }
      if (e.key === "ArrowLeft" && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide, presentation]);

  if (!presentation) return <div>Loading...</div>;

  const slides = presentation.content?.slides || [];
  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col">
      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl font-bold mb-8">{slide?.title}</h1>

          {slide?.bullets && (
            <ul className="space-y-4 text-xl">
              {slide.bullets.map((bullet: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="mr-2" />
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentSlide + 1} / {presentation.slide_count}
        </span>

        <Button
          variant="ghost"
          onClick={() => setCurrentSlide((prev) => Math.min(presentation.slide_count - 1, prev + 1))}
          disabled={currentSlide === presentation.slide_count - 1}
        >
          Next
          <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
```

---

## Success Criteria

### Functional
- [ ] Conversation tracks progress (0-100%)
- [ ] AI extracts data from conversation
- [ ] Progress bar updates as data collected
- [ ] Generate button appears at 80%+
- [ ] Outline generated with 10 slides
- [ ] Outline editor allows drag-and-drop reordering
- [ ] Slide titles can be edited inline
- [ ] Changes auto-save to database
- [ ] Viewer displays slides full-screen
- [ ] Keyboard navigation works (arrows)

### Technical
- [ ] TypeScript compiles with 0 errors
- [ ] Edge Functions deployed successfully
- [ ] Database updates persist correctly
- [ ] No console errors
- [ ] Mobile responsive

---

## Testing

```bash
# 1. Test complete flow
# - Start wizard
# - Answer AI questions
# - Watch progress increase
# - Click Generate Deck
# - Reorder slides in outline
# - View presentation

# 2. Test Edge Functions
supabase functions logs chat --tail
supabase functions logs generate-pitch-deck --tail

# 3. Check database
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "SELECT * FROM presentations ORDER BY created_at DESC LIMIT 5;"
```

---

## Next Steps

→ **03-advanced.md** - Rich text editing, templates, PDF export, analytics

---

**Estimated Total Time**: 5-7 days
**Difficulty**: Intermediate
**Status**: ✅ Ready to implement
