# Prompt Engineering Skill & Agent

Expert prompt engineering resources for Claude 4 models (Sonnet 4.5, Opus 4.1).

## Files Created

### 1. Skill: `SKILL.md`
**Purpose**: Comprehensive reference guide for prompt engineering techniques

**Contents**:
- Core principles (clarity, context, explicitness)
- Chain-of-thought (CoT) prompting
- Extended thinking best practices
- Advanced techniques (tool use, parallel calls, research)
- Production-specific patterns
- Communication style control
- XML tag patterns
- Common mistakes and fixes
- Testing checklist

**Use when**: You need quick reference for prompt engineering patterns and techniques

### 2. Agent: `/home/sk/template-copilot-kit-py/.claude/agents/prompt-engineer.md`
**Purpose**: Autonomous agent for creating and optimizing prompts

**Capabilities**:
- Craft effective prompts from requirements
- Optimize existing prompts for better results
- Debug prompt issues and fix them
- Implement advanced techniques (CoT, extended thinking)
- Ensure production-readiness

**Invoke with**: `/prompt-engineer` or via Task tool with `subagent_type: prompt-engineer`

---

## Quick Start

### Using the Skill
Read the skill file for reference:
```bash
cat /home/sk/template-copilot-kit-py/.claude/skills/prompt-engineer/SKILL.md
```

### Using the Agent

**Example 1: Create a new prompt**
```
User: "Create a prompt for analyzing customer feedback and categorizing it"

Agent: [Analyzes requirements, creates structured prompt with context,
        step-by-step instructions, and clear output format]
```

**Example 2: Optimize existing prompt**
```
User: "This prompt isn't working well: 'Write a report about sales'"

Agent: [Identifies issues (vague, no context, unclear format), creates
        improved version with context, structure, and examples]
```

**Example 3: Debug prompt issue**
```
User: "Claude keeps giving me verbose responses when I want concise ones"

Agent: [Identifies verbosity issue, adds explicit formatting constraints
        and style guidance using appropriate XML tags]
```

---

## Key Features

### 1. Clarity Optimization
Transforms vague prompts into clear, actionable instructions:
- Adds context and "why" explanations
- Specifies output format explicitly
- Provides sequential steps
- Includes aligned examples

### 2. Chain-of-Thought (CoT)
Implements three levels of CoT:
- Basic: "Think step-by-step"
- Guided: Specific thinking steps
- Structured: XML tags (`<thinking>`, `<answer>`)

### 3. Extended Thinking
Optimizes for Claude 4.5's extended thinking capabilities:
- General instructions first (not overly prescriptive)
- State management for long tasks
- Multi-context window workflows
- Context awareness patterns

### 4. Tool Use Optimization
Improves tool calling efficiency:
- Parallel tool call patterns
- Default-to-action vs. conservative modes
- Investigation before answering
- Grounding to reduce hallucinations

### 5. Production Patterns
Production-ready prompt templates:
- Agentic coding patterns
- Visual/frontend code generation
- Research and information gathering
- Document creation
- Code review and analysis

---

## Pattern Library

### Pattern: Basic Structured Prompt
```text
Your task is to [specific task] for [audience].

Context:
- Purpose: [why needed]
- Audience: [who uses this]
- Success: [what good looks like]

Instructions:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Output format: [specification]
```

### Pattern: Chain-of-Thought
```text
[Task with context]

Think in <thinking> tags:
1. Analyze [aspect 1]
2. Consider [aspect 2]
3. Synthesize conclusion

Provide answer in <answer> tags.
```

### Pattern: Investigation
```text
<investigate_before_answering>
Never speculate about code you haven't opened.
Read relevant files BEFORE answering.
</investigate_before_answering>
```

### Pattern: Tool Use
```text
<default_to_action>
Implement changes rather than suggesting.
Infer user intent and proceed.
</default_to_action>

<use_parallel_tool_calls>
Make independent calls in parallel.
</use_parallel_tool_calls>
```

---

## Common Use Cases

### 1. System Prompts for AI Apps
**Task**: Create system prompts for AI-powered features
**Agent Action**: Analyzes requirements, creates structured system prompt with role definition, capabilities, constraints, and output format

### 2. Agent Instructions
**Task**: Write instructions for autonomous agents
**Agent Action**: Implements chain-of-thought, tool use patterns, state management, and self-correction guidelines

### 3. API Documentation Prompts
**Task**: Generate prompts for documentation creation
**Agent Action**: Creates prompts with investigation patterns, structured output, and example-driven instructions

### 4. Code Generation Prompts
**Task**: Optimize prompts for code generation
**Agent Action**: Adds specificity, aesthetic guidance, feature requests, and design principles

### 5. Research Prompts
**Task**: Create prompts for research and analysis
**Agent Action**: Implements extended thinking, structured approach, hypothesis tracking, and source verification

---

## Testing & Validation

### Checklist for Prompts
- [ ] Clear enough for someone with minimal context?
- [ ] Success criteria defined?
- [ ] Output format specified?
- [ ] Examples aligned with desired behavior?
- [ ] Necessary context included?
- [ ] Thinking structured (if needed)?
- [ ] Edge cases covered?
- [ ] Tone/style specified?

### Iteration Process
1. Start simple (basic instructions)
2. Test with examples
3. Analyze output
4. Refine (add structure, context, examples)
5. Retest
6. Optimize (remove unnecessary complexity)

---

## Resources

### Official Guides (Local)
- **Claude 4 Best Practices**: `.claude/guides/prompt/2-claude-4-best-practices.md`
- **Be Clear and Direct**: `.claude/guides/prompt/4-be-clear-and-direct.md`
- **Chain of Thought**: `.claude/guides/prompt/6-chain-of-thought.md`
- **Extended Thinking**: `.claude/guides/prompt/10-extended-thinking-tips.md`
- **Multishot Prompting**: `.claude/guides/prompt/5-multishot-prompting.md`
- **System Prompts**: `.claude/guides/prompt/7-system-prompts.md`

### External Links
- Anthropic Prompt Library: https://docs.anthropic.com/en/prompt-library
- GitHub Tutorial: https://github.com/anthropics/prompt-eng-interactive-tutorial
- Google Sheets Tutorial: https://docs.google.com/spreadsheets/d/19jzLgRruG9kjUQNKtCg1ZjdD6l6weA6qRXG5zLIAhC8

---

## Examples

### Example 1: Before/After Simple Prompt

**Before**:
```text
Analyze this data
```

**After** (Agent-optimized):
```text
Your task is to analyze this sales data and provide actionable insights.

Context:
- Purpose: Quarterly review for executive team
- Audience: C-suite executives (non-technical)
- Success: Clear trends + 3 concrete recommendations

Instructions:
1. Identify top 3 trends in the data
2. Calculate key metrics: growth rate, top products, regional performance
3. Provide 3 specific, actionable recommendations

Output format:
<trends>
- [Trend 1 with supporting data]
- [Trend 2 with supporting data]
- [Trend 3 with supporting data]
</trends>

<metrics>
| Metric | Value | Change from Q2 |
|--------|-------|----------------|
| ... | ... | ... |
</metrics>

<recommendations>
1. [Recommendation 1 with rationale]
2. [Recommendation 2 with rationale]
3. [Recommendation 3 with rationale]
</recommendations>
```

### Example 2: Chain-of-Thought Addition

**Before**:
```text
Should we invest in Option A or Option B?
```

**After** (Agent-optimized with CoT):
```text
You're a financial advisor analyzing two investment options for a client.

Context:
- Client needs funds in 5 years for house down payment
- Option A: 12% historical returns, volatile
- Option B: 6% guaranteed returns, stable

Analyze in <thinking> tags:
1. Calculate potential returns for each option (5-year horizon)
2. Assess risk factors given the 5-year timeline
3. Consider client's risk tolerance (critical financial goal)
4. Evaluate historical volatility impact
5. Weigh certainty vs. potential upside

Provide your recommendation in <answer> tags:
- Clear recommendation (A or B)
- Justification based on analysis
- Specific numbers from calculations
```

---

## Maintenance

### Updating the Skill
When new Claude models or prompting techniques are released:
1. Review official Anthropic documentation
2. Test new patterns with examples
3. Update SKILL.md with new techniques
4. Add examples to pattern library
5. Update this README with new capabilities

### Updating the Agent
When prompt engineering workflows change:
1. Review agent performance on recent tasks
2. Identify recurring issues or patterns
3. Update agent instructions in `.claude/agents/prompt-engineer.md`
4. Test with example scenarios
5. Document changes in this README

---

**Created**: October 22, 2025
**Last Updated**: October 22, 2025
**Version**: 1.0
**Status**: ✅ Production Ready
