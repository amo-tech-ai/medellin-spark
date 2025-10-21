# Week 3: Pitch Deck Wizard (Chat Interface)

**Goal**: Chat interface works perfectly on mobile
**Time**: 1 week (3 days fundamentals + 2 days advanced)

---

## Fundamentals

### Task 1: Full-Width Chat Messages

**What**: Make chat messages use full mobile width (no wasted space)

**File**: `src/pages/PitchDeckWizard.tsx`

**Steps**:
1. Remove desktop-only max-width constraints
2. Add responsive padding
3. Ensure messages are readable

**Find the messages container**:
```typescript
<div className="max-w-3xl mx-auto">  {/* Desktop centered */}
```

**Replace with**:
```typescript
<div className="
  w-full                    // Mobile: full width
  md:max-w-3xl md:mx-auto   // Desktop: centered
  px-4 md:px-6
">
```

**Update individual messages**:
```typescript
<div className="
  flex gap-3
  p-4
  rounded-lg
  ${isUser ? 'bg-primary text-white ml-8' : 'bg-gray-100 mr-8'}
">
  <p className="text-base leading-relaxed">{message.content}</p>
</div>
```

**Success Criteria**:
- ✅ Messages use available width on mobile
- ✅ Text wraps correctly (no horizontal scroll)
- ✅ User messages right-aligned, AI messages left-aligned
- ✅ 16px minimum font size (prevents iOS zoom)
- ✅ Comfortable reading on 375px width (iPhone SE)

**Test**:
```bash
# Chrome DevTools → iPhone SE (375px)
# Send long message → Should wrap, not overflow
# Check font size ≥ 16px
```

---

### Task 2: Sticky Chat Input

**What**: Keep input field visible at bottom while scrolling

**File**: `src/pages/PitchDeckWizard.tsx`

**Steps**:
1. Position input fixed at bottom
2. Add space for iOS keyboard
3. Keep send button accessible

**Update chat input container**:
```typescript
<div className="
  fixed bottom-0 left-0 right-0
  bg-white border-t border-gray-200
  p-4
  pb-safe-bottom           // iOS safe area
  md:pb-4
  z-30
">
  <div className="flex gap-2 max-w-3xl mx-auto">
    <input
      type="text"
      placeholder="Type your message..."
      className="
        flex-1
        h-12                // 48px minimum
        px-4
        text-base           // 16px - prevents zoom
        border rounded-lg
      "
    />
    <button className="
      h-12 w-12              // 48px × 48px (iOS minimum)
      bg-primary text-white
      rounded-lg
      flex items-center justify-center
    ">
      <Send className="h-5 w-5" />
    </button>
  </div>
</div>
```

**Add bottom padding to messages**:
```typescript
<div className="pb-24 md:pb-20">  {/* Space for fixed input */}
  {messages.map(...)}
</div>
```

**Success Criteria**:
- ✅ Input stays fixed at bottom when scrolling
- ✅ Input doesn't overlap with iOS keyboard
- ✅ Send button is 48×48px (easy to tap)
- ✅ Input height is 48px
- ✅ No gap between input and bottom on iOS
- ✅ Input field doesn't hide behind virtual keyboard

**Test**:
```bash
# Mobile: Tap input → Keyboard appears
# Expected: Input stays visible above keyboard
# Scroll chat → Input stays at bottom
```

---

### Task 3: Progress Bar Mobile

**What**: Show conversation progress on mobile without taking space

**File**: `src/pages/PitchDeckWizard.tsx`

**Steps**:
1. Make progress bar compact on mobile
2. Show percentage clearly
3. Position for easy visibility

**Update progress component**:
```typescript
<div className="
  sticky top-0 z-20
  bg-white border-b
  px-4 py-3
  md:px-6
">
  <div className="max-w-3xl mx-auto">
    {/* Progress bar */}
    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary transition-all duration-500"
        style={{ width: `${completeness}%` }}
      />
    </div>

    {/* Percentage label */}
    <div className="
      flex justify-between items-center
      mt-2
      text-xs md:text-sm text-gray-600
    ">
      <span>Completeness</span>
      <span className="font-semibold">{completeness}%</span>
    </div>

    {/* Generate button (appears at 80%+) */}
    {completeness >= 80 && (
      <button className="
        w-full mt-3
        h-12                    // 48px touch target
        bg-primary text-white
        rounded-lg font-semibold
        active:scale-[0.98]
      ">
        Generate Deck ✨
      </button>
    )}
  </div>
</div>
```

**Success Criteria**:
- ✅ Progress bar visible at top
- ✅ Percentage updates in real-time
- ✅ Generate button appears at 80%
- ✅ Button is 48px tall (easy to tap)
- ✅ Progress doesn't block messages
- ✅ Sticky positioning works during scroll

**Test**:
```bash
# Send messages → Progress increases
# Reach 80% → Generate button appears
# Button should be easy to tap
```

---

## Fundamentals Summary

**What you built**:
- ✅ Full-width chat messages
- ✅ Sticky input at bottom
- ✅ Mobile-optimized progress bar

**Success Check**:
- [ ] Chat interface loads on mobile
- [ ] Messages are readable
- [ ] Input stays visible when typing
- [ ] Progress updates correctly
- [ ] Generate button appears at 80%

**Time**: ~3 days

---

## Advanced Features (Optional)

### Advanced 1: Typing Indicators

**What**: Show "AI is typing..." animation while waiting for response

**When to use**: If AI responses take >2 seconds

**File**: `src/pages/PitchDeckWizard.tsx`

**Code**:
```typescript
function TypingIndicator() {
  return (
    <div className="flex gap-3 p-4 bg-gray-100 rounded-lg mr-8">
      <div className="flex gap-1 items-center">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
      <span className="text-sm text-gray-600">AI is thinking...</span>
    </div>
  );
}

// In chat component
{isLoading && <TypingIndicator />}
```

**Success Criteria**:
- ✅ Appears immediately when user sends message
- ✅ Bouncing animation is smooth
- ✅ Disappears when AI response arrives
- ✅ Matches AI message styling

**Time**: +2 hours

---

### Advanced 2: Message Timestamps

**What**: Show time sent for each message (on tap)

**When to use**: For debugging or if users want to track conversation flow

**Code**:
```typescript
function ChatMessage({ message, isUser }: Props) {
  const [showTime, setShowTime] = useState(false);

  return (
    <div
      onClick={() => setShowTime(!showTime)}
      className={`
        flex gap-3 p-4 rounded-lg cursor-pointer
        ${isUser ? 'bg-primary text-white ml-8' : 'bg-gray-100 mr-8'}
      `}
    >
      <p>{message.content}</p>
      {showTime && (
        <span className="text-xs opacity-70 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
```

**Success Criteria**:
- ✅ Tap message to show/hide timestamp
- ✅ Time format is readable (e.g., "2:34 PM")
- ✅ Doesn't clutter interface by default
- ✅ Works for both user and AI messages

**Time**: +2 hours

---

### Advanced 3: Voice Input

**What**: Allow users to speak messages instead of typing

**When to use**: If mobile users prefer voice input

**Code**:
```typescript
import { Mic } from 'lucide-react';

function ChatInput() {
  const [isListening, setIsListening] = useState(false);

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Voice input not supported on this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };
    recognition.start();
  };

  return (
    <div className="flex gap-2">
      <input type="text" value={message} />
      <button
        onClick={startVoiceInput}
        className={`
          h-12 w-12 rounded-lg flex items-center justify-center
          ${isListening ? 'bg-red-500 text-white' : 'bg-gray-100'}
        `}
      >
        <Mic className="h-5 w-5" />
      </button>
      <button onClick={sendMessage}>
        <Send />
      </button>
    </div>
  );
}
```

**Success Criteria**:
- ✅ Mic button appears next to input
- ✅ Button turns red when listening
- ✅ Speech converts to text in input
- ✅ Works on Safari iOS and Chrome Android
- ✅ Shows error if not supported

**Time**: +6 hours

---

### Advanced 4: Auto-Scroll to Latest Message

**What**: Automatically scroll to bottom when new message arrives

**When to use**: Always (improves UX)

**Code**:
```typescript
import { useEffect, useRef } from 'react';

function ChatMessages({ messages }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map(msg => <ChatMessage key={msg.id} {...msg} />)}
      <div ref={messagesEndRef} />
    </div>
  );
}
```

**Success Criteria**:
- ✅ Scrolls to bottom when new message arrives
- ✅ Smooth scroll animation
- ✅ Doesn't interrupt if user is reading old messages
- ✅ Works reliably on iOS and Android

**Time**: +1 hour

---

## Advanced Summary

**What's available**:
- ⬜ Typing indicators (+2h)
- ⬜ Message timestamps (+2h)
- ⬜ Voice input (+6h)
- ⬜ Auto-scroll (+1h)

**When to add**:
- Add typing indicators if responses take >2 seconds
- Add timestamps for debugging/tracking
- Add voice input if users request it
- Add auto-scroll (recommended - improves UX)

**Total advanced time**: +11 hours (optional)

---

## Week 3 Complete

**Fundamentals**: ✅ Chat interface works on mobile
**Next**: Week 4 - Forms and Events

**Diagram**:
```
Chat Interface Layout:

┌─────────────────────────┐
│ Progress: 65% [===   ]  │ ← Sticky progress bar
├─────────────────────────┤
│                         │
│  ┌───────────────────┐  │
│  │ AI: Tell me about │  │ ← AI message (left)
│  │ your startup...   │  │
│  └───────────────────┘  │
│                         │
│      ┌──────────────┐   │
│      │ User: We're  │   │ ← User message (right)
│      │ building...  │   │
│      └──────────────┘   │
│                         │
│  ┌───────────────────┐  │
│  │ AI: Great! What  │  │
│  │ problem do you   │  │
│  │ solve?           │  │
│  └───────────────────┘  │
│                         │
├─────────────────────────┤
│  [Type message...]  [→] │ ← Sticky input
└─────────────────────────┘
         ▲
         └─ pb-safe-bottom (iOS)
```
