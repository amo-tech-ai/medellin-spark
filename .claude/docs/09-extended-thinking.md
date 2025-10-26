# Extended Thinking - Best Practices Guide

## What is Extended Thinking?

Extended thinking gives Claude enhanced reasoning capabilities for complex tasks by allowing it to "think" before responding. You see Claude's step-by-step thought process in `thinking` blocks, followed by the final answer in `text` blocks.

**Supported Models:**
- Claude Sonnet 4.5, 4, 3.7
- Claude Haiku 4.5
- Claude Opus 4.1, 4

---

## When to Use Extended Thinking

| Use Extended Thinking | Use Standard Mode |
|----------------------|-------------------|
| Complex math problems | Simple questions |
| Multi-step coding tasks | Basic code completion |
| Deep analysis/reasoning | Quick lookups |
| Constraint optimization | Straightforward tasks |
| Strategic planning | Simple explanations |

**Rule of Thumb:** If the task requires "thinking it through," use extended thinking. If it's straightforward, don't.

---

## Quick Setup

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=16000,
    thinking={
        "type": "enabled",
        "budget_tokens": 1024  # Start with minimum (1,024)
    },
    messages=[{
        "role": "user",
        "content": "Your complex task here"
    }]
)

# Response includes thinking blocks + text blocks
for block in response.content:
    if block.type == "thinking":
        print(f"Thinking: {block.thinking}")
    elif block.type == "text":
        print(f"Answer: {block.text}")
```

---

## 5 Essential Best Practices

### 1. **Start with General Instructions (Not Step-by-Step)**

```python
# ❌ BAD - Too prescriptive
prompt = """Think through this step by step:
1. First, identify variables
2. Then, set up equation
3. Next, solve for x
..."""

# ✅ GOOD - General guidance
prompt = """Please think about this math problem thoroughly and in great detail.
Consider multiple approaches and show your complete reasoning.
Try different methods if your first approach doesn't work."""
```

**Why:** Claude's creativity often exceeds human ability to prescribe optimal thinking. Let it figure out the best approach.

### 2. **Start Small, Scale Up**

```python
# Budget progression:
budget_tokens = 1024   # Start here (minimum)
budget_tokens = 4000   # Medium complexity
budget_tokens = 10000  # Complex tasks
budget_tokens = 16000+ # Very complex (use batch processing for 32k+)
```

**Monitor usage:**
```python
print(f"Thinking tokens used: {response.usage.output_tokens}")
```

### 3. **Don't Pass Thinking Back (Unless Using Tools)**

```python
# ❌ BAD - Don't pass thinking in user messages
messages = [
    {"role": "user", "content": "Question 1"},
    {"role": "assistant", "content": response.content},  # Includes thinking
    {"role": "user", "content": block.thinking}  # ❌ DON'T DO THIS
]

# ✅ GOOD - Only pass thinking back when using tools
messages = [
    {"role": "user", "content": "What's the weather?"},
    {"role": "assistant", "content": [thinking_block, tool_use_block]},  # ✅ Required for tools
    {"role": "user", "content": [tool_result]}
]
```

### 4. **Ask Claude to Self-Verify**

```python
prompt = """Write a factorial function.

Before you finish, verify your solution with test cases:
- n=0 (should be 1)
- n=5 (should be 120)
- n=10 (should be 3,628,800)

Fix any issues you find."""
```

**Result:** Better consistency, fewer errors.

### 5. **Use Multishot for Consistent Patterns**

```python
prompt = """I'll show you how to solve a problem, then you solve a similar one.

Problem 1: What is 15% of 80?

<thinking>
To find 15% of 80:
1. Convert 15% to decimal: 0.15
2. Multiply: 0.15 × 80 = 12
</thinking>

Answer: 12

Now solve: What is 35% of 240?"""
```

---

## Common Patterns

### Pattern 1: Complex STEM Problems

```python
response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=20000,
    thinking={"type": "enabled", "budget_tokens": 8000},
    messages=[{
        "role": "user",
        "content": """Write a Python script for a bouncing ball simulation.
        Requirements:
        - Yellow ball in a rotating square
        - Proper collision detection
        - Handle edge cases"""
    }]
)
```

### Pattern 2: Constraint Optimization

```python
prompt = """Plan a week-long vacation to Japan.

Constraints:
- Budget: $3,000 total
- Must visit Tokyo, Kyoto, Osaka
- Include 2 cultural experiences
- Vegetarian dining options
- Minimize travel time between cities

Think through all constraints systematically."""
```

### Pattern 3: Strategic Analysis

```python
prompt = """Develop a market entry strategy for Microsoft
entering personalized medicine by 2027.

Framework to consider:
- Market landscape analysis
- Competitive positioning
- Technology partnerships needed
- Regulatory challenges
- Go-to-market timeline

Think deeply about each aspect."""
```

---

## Technical Details

### Token Budgets
- **Minimum:** 1,024 tokens (always start here)
- **Medium:** 4,000-10,000 tokens
- **Large:** 16,000-32,000 tokens
- **Very Large:** 32,000+ (use batch processing)

### Pricing
| Model | Output Tokens (includes thinking) |
|-------|----------------------------------|
| Sonnet 4.5 | $15 / MTok |
| Opus 4.1 | $75 / MTok |

**Important:** You're charged for full thinking tokens, even though Claude 4 models return summarized thinking.

### Context Window
- Previous thinking blocks are automatically removed (don't count toward context)
- Current turn thinking counts toward `max_tokens` limit
- When using tools, thinking blocks must be preserved

---

## What NOT to Do

| ❌ Don't | ✅ Do Instead |
|---------|--------------|
| Pass thinking back in user messages | Only pass thinking when using tools |
| Prefill thinking blocks | Let Claude generate naturally |
| Start with huge budgets | Start at 1,024, scale up as needed |
| Use for simple tasks | Reserve for complex reasoning |
| Force step-by-step instructions | Give general guidance first |
| Use with temperature/top_k | Standard mode only |
| Expect exact token budget usage | Claude uses what it needs (up to budget) |

---

## Streaming Example

```python
with client.messages.stream(
    model="claude-sonnet-4-5",
    max_tokens=16000,
    thinking={"type": "enabled", "budget_tokens": 4000},
    messages=[{"role": "user", "content": "Complex task"}]
) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            if event.delta.type == "thinking_delta":
                print(f"Thinking: {event.delta.thinking}", end="")
            elif event.delta.type == "text_delta":
                print(f"Text: {event.delta.text}", end="")
```

---

## Tool Use with Extended Thinking

**Basic Pattern:**
```python
# 1. First request
response1 = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=16000,
    thinking={"type": "enabled", "budget_tokens": 10000},
    tools=[weather_tool],
    messages=[{"role": "user", "content": "What's the weather in Paris?"}]
)

# Extract blocks
thinking_block = next(b for b in response1.content if b.type == 'thinking')
tool_use_block = next(b for b in response1.content if b.type == 'tool_use')

# 2. Continue with tool result (MUST include thinking block)
response2 = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=16000,
    thinking={"type": "enabled", "budget_tokens": 10000},
    tools=[weather_tool],
    messages=[
        {"role": "user", "content": "What's the weather in Paris?"},
        {"role": "assistant", "content": [thinking_block, tool_use_block]},  # ✅ Both required
        {"role": "user", "content": [tool_result]}
    ]
)
```

**Interleaved Thinking (Advanced):**
```python
# Enable thinking between tool calls
response = client.beta.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=16000,
    thinking={"type": "enabled", "budget_tokens": 10000},
    tools=[calculator, database],
    betas=["interleaved-thinking-2025-05-14"],  # ✅ Required
    messages=[{"role": "user", "content": "Complex multi-tool task"}]
)
```

---

## Debugging with Thinking

**Use thinking output to debug Claude's logic:**

```python
response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=16000,
    thinking={"type": "enabled", "budget_tokens": 4000},
    messages=[{"role": "user", "content": "Task that's not working well"}]
)

# Read thinking to understand Claude's approach
thinking = next(b.thinking for b in response.content if b.type == 'thinking')
print(f"Claude's reasoning:\n{thinking}")

# Adjust prompt based on what you learned
```

---

## Quick Reference Card

```python
# Minimal setup
thinking={"type": "enabled", "budget_tokens": 1024}

# Most common setup
thinking={"type": "enabled", "budget_tokens": 4000}

# Complex tasks
thinking={"type": "enabled", "budget_tokens": 10000}

# Get usage
response.usage.output_tokens  # Includes thinking tokens

# Read thinking
for block in response.content:
    if block.type == "thinking":
        print(block.thinking)  # Summarized in Claude 4 models
```

---

## Summary

**3 Rules to Remember:**
1. **General instructions > Step-by-step** - Let Claude figure out the approach
2. **Start small (1,024), scale up** - Only increase budget if needed
3. **Don't pass thinking back** - Except when using tools

**Perfect For:**
- Math, coding, analysis
- Multi-step reasoning
- Constraint problems
- Strategic planning

**Not For:**
- Simple questions
- Quick lookups
- Basic explanations

---

**Resources:**
- [Extended Thinking API Docs](https://docs.claude.com/en/docs/build-with-claude/extended-thinking)
- [Extended Thinking Cookbook](https://github.com/anthropics/anthropic-cookbook/tree/main/extended_thinking)
