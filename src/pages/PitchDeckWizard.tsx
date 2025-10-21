import { useState, useEffect } from "react";
import { MessageSquare, Sparkles, History, Plus, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiClient, ApiError } from "@/lib/apiClient";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: React.ReactNode;
  suggestions?: string[];
}

const PitchDeckWizard = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Claude, your AI pitch deck assistant. I'll help you create a professional investor presentation through natural conversation.\n\nTell me about your startup, and I'll ask focused questions to build your deck!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Claude conversation state
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [completeness, setCompleteness] = useState(0);
  const [collectedData, setCollectedData] = useState<Record<string, unknown>>({});
  const [readyToGenerate, setReadyToGenerate] = useState(false);

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

    // Show typing indicator
    setIsTyping(true);

    try {
      // Call Claude AI Edge Function using central API client
      const data = await apiClient.post('/pitch-deck-assistant', {
        message: userInput,
        conversation_id: conversationId,
        profile_id: user?.id || '00000000-0000-0000-0000-000000000000', // Dev mode: test UUID
      }, {
        requiresAuth: false, // Dev mode: disable auth requirement
      });

      // Update conversation state
      if (data.conversation_id) {
        setConversationId(data.conversation_id);
      }
      if (data.completeness !== undefined) {
        setCompleteness(data.completeness);
      }
      if (data.collected_data) {
        setCollectedData(data.collected_data);
      }
      if (data.ready_to_generate !== undefined) {
        setReadyToGenerate(data.ready_to_generate);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "I'm having trouble responding. Please try again.",
        timestamp: new Date(),
        suggestions: data.suggestions || [],
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: unknown) {
      console.error("Claude API Error:", error);

      if (error instanceof ApiError) {
        if (error.status === 401) {
          toast.error("Authentication failed. Please sign in again.");
        } else if (error.status === 429) {
          toast.error("Too many requests. Please wait a moment and try again.");
        } else {
          toast.error(error.message || "Failed to connect to AI assistant");
        }
      } else {
        toast.error("Failed to connect to AI assistant");
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleGenerateDeck = async () => {
    if (!readyToGenerate || !collectedData) {
      toast.error("Please complete the conversation first");
      return;
    }

    try {
      toast.info("Generating your pitch deck...");

      const data = await apiClient.post('/generate-pitch-deck', {
        startup_data: collectedData,
        profile_id: user?.id || '00000000-0000-0000-0000-000000000000', // Dev mode: test UUID
      }, {
        requiresAuth: false, // Dev mode: disable auth requirement
        timeout: 60000, // 60 seconds for AI generation
      });

      if (data.presentation_id) {
        toast.success("Deck generated successfully!");
        navigate(`/presentations/${data.presentation_id}/view`);
      }
    } catch (error: unknown) {
      console.error("Generate deck error:", error);

      if (error instanceof ApiError) {
        toast.error(error.message || "Failed to generate deck");
      } else {
        toast.error("Failed to generate deck");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">Pitch Deck AI</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <History className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">History</span>
            </Button>
            <Button variant="default" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">New Chat</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Progress Sidebar - Desktop Only */}
        <aside className="hidden lg:block w-64 border-r border-border bg-muted/30 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Progress</h3>
              <div className="mb-4">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                    style={{ width: `${completeness}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {completeness}% complete
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold mb-3">Data Collected</h3>
              <div className="space-y-2 text-sm">
                <DataItem label="Company Name" value={collectedData?.company_name} />
                <DataItem label="Industry" value={collectedData?.industry} />
                <DataItem label="Problem" value={collectedData?.problem} />
                <DataItem label="Solution" value={collectedData?.solution} />
                <DataItem label="Target Market" value={collectedData?.target_market} />
                <DataItem label="Business Model" value={collectedData?.business_model} />
              </div>
            </div>

            {readyToGenerate && (
              <div className="pt-4 border-t border-border">
                <Button
                  onClick={handleGenerateDeck}
                  className="w-full"
                  size="lg"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Generate Deck
                </Button>
              </div>
            )}
          </div>
        </aside>

        {/* Message Container */}
        <main className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4 md:p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" ? (
                    <AIMessage
                      content={message.content}
                      timestamp={message.timestamp}
                      suggestions={message.suggestions}
                      onSuggestionClick={handleSuggestionClick}
                    >
                      {message.actions}
                    </AIMessage>
                  ) : (
                    <UserMessage content={message.content} timestamp={message.timestamp} />
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-2xl px-5 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Bar */}
          <div className="border-t border-border bg-background p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2 items-end">
                <Textarea
                  placeholder="Type your message... (Shift+Enter for new line)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[60px] max-h-[200px] resize-none"
                  rows={2}
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="h-[60px] px-6"
                >
                  Send →
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// AI Message Component
const AIMessage = ({
  content,
  timestamp,
  children,
  suggestions,
  onSuggestionClick,
}: {
  content: string;
  timestamp: Date;
  children?: React.ReactNode;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}) => {
  return (
    <div className="flex items-start gap-3 max-w-[80%]">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="bg-muted rounded-2xl rounded-tl-sm px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">AI Assistant</span>
            <span className="text-xs text-muted-foreground">
              {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
            {content}
          </div>
        </div>

        {/* Suggestion Buttons */}
        {suggestions && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {suggestions.map((suggestion, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="text-xs rounded-full border-primary/20 hover:bg-primary/10 hover:border-primary"
                onClick={() => onSuggestionClick?.(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}

        {children}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Copy
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            👍
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            👎
          </Button>
        </div>
      </div>
    </div>
  );
};

// User Message Component
const UserMessage = ({ content, timestamp }: { content: string; timestamp: Date }) => {
  return (
    <div className="flex flex-col items-end max-w-[80%]">
      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-5 py-4">
        <div className="prose prose-sm max-w-none text-primary-foreground whitespace-pre-wrap">
          {content}
        </div>
      </div>
      <span className="text-xs text-muted-foreground mt-1">
        {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
};

// Quick Action Card Component
const QuickActionCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <button className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary hover:shadow-glow transition-smooth group">
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </button>
  );
};

// Data Item Component for Progress Sidebar
const DataItem = ({ label, value }: { label: string; value?: string }) => {
  const isFilled = value && value.trim().length > 0;
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${isFilled ? 'bg-green-500' : 'bg-muted'}`} />
      <span className={isFilled ? 'text-foreground font-medium' : 'text-muted-foreground'}>
        {label}
      </span>
    </div>
  );
};

export default PitchDeckWizard;
