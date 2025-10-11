import { useState } from "react";
import { MessageSquare, Sparkles, History, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: React.ReactNode;
}

const PitchDeckWizard = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI pitch deck assistant. I'll help you create a professional investor presentation in about 10 minutes through natural conversation.\n\nBefore we start, choose an option:",
      timestamp: new Date(),
      actions: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <QuickActionCard
            icon="📝"
            title="Use Wizard Data"
            description="Pre-fill from your startup wizard"
          />
          <QuickActionCard
            icon="✨"
            title="Start Fresh"
            description="Tell me everything from scratch"
          />
          <QuickActionCard
            icon="📤"
            title="Upload Deck"
            description="Improve an existing presentation"
          />
        </div>
      ),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Great! I'd love to hear more about your startup. Let's start with the basics:\n\n• What's the name of your startup?\n• What problem are you solving?\n• Who's your target customer?\n\nYou can answer in a paragraph or bullet points - I'm flexible!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                  <span className="text-muted-foreground">Getting Started</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">
                    2
                  </div>
                  <span className="text-muted-foreground">Startup Basics</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">
                    3
                  </div>
                  <span className="text-muted-foreground">Solution</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold mb-3">Data Collected</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <span>Company Name</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <span>Problem Statement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <span>Target Customer</span>
                </div>
              </div>
            </div>
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
                    <AIMessage content={message.content} timestamp={message.timestamp}>
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
const AIMessage = ({ content, timestamp, children }: { content: string; timestamp: Date; children?: React.ReactNode }) => {
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

export default PitchDeckWizard;
