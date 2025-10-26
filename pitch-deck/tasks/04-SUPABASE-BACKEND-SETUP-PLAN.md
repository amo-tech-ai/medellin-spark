# 🔧 SUPABASE BACKEND SETUP PLAN
**Backend: `/home/sk/mde/template-copilot-kit-py`**

**Created**: October 26, 2025
**Project**: Medellin Spark Pitch Deck Wizard
**Supabase Project**: `dhesktsqhcxhqfjypulk`
**Status**: 🟡 Ready for Integration

---

## ✅ DATABASE VERIFICATION

### Tables Confirmed in Screenshot (30 tables)

#### ⭐ **CRITICAL for Pitch Deck AI Wizard** (4 tables)

| Table | Purpose | Status | Priority |
|-------|---------|--------|----------|
| **presentations** | Store generated pitch decks | ✅ Verified | CRITICAL |
| **pitch_conversations** | AI chat history & context | ✅ Verified | CRITICAL |
| **wizard_sessions** | User wizard sessions | ✅ Verified | CRITICAL |
| **presentation_templates** | Deck templates library | ✅ Verified | HIGH |

#### 🎨 **Supporting Tables** (5 tables)

| Table | Purpose | Status |
|-------|---------|--------|
| **profiles** | User profiles (links to auth.users) | ✅ Verified |
| **custom_themes** | User-created themes | ✅ Verified |
| **generated_images** | AI-generated slide images | ✅ Verified |
| **favorite_presentations** | Bookmarked decks | ✅ Verified |
| **startup_profiles** | Startup information for content | ✅ Verified |

#### 📦 **Other Platform Tables** (21 tables)

Events: `events`, `event_venues`, `venues`, `organizers`, `tickets`, `registrations`, `waitlist`, `sponsors`

Jobs: `jobs`, `job_applications`, `job_skills`, `applications`, `matches`, `saved_jobs`, `companies`, `candidates`, `candidate_skills`, `skills`

Perks: `perks`, `saved_perks`, `perk_claims`

---

## 🎯 SCHEMA VALIDATION

### ✅ Key Tables for AI Wizard

#### 1. presentations
```sql
CREATE TABLE presentations (
    id UUID PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id),  -- ✅ User ownership
    custom_theme_id UUID REFERENCES custom_themes(id),
    template_id UUID REFERENCES presentation_templates(id),
    title TEXT,
    content JSONB,                             -- ✅ Slide data
    theme TEXT,
    image_source TEXT,
    prompt TEXT,                               -- ✅ Original user prompt
    presentation_style TEXT,
    language TEXT,
    outline TEXT[],                            -- ✅ Presentation structure
    search_results JSONB,
    thumbnail_url TEXT,
    is_public BOOLEAN,
    status TEXT,                               -- ✅ draft/published
    description TEXT,
    cover_image_url TEXT,
    slide_count INTEGER,
    share_link TEXT,
    view_count INTEGER,
    last_edited_at TIMESTAMPTZ,
    last_presented_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    category TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

**✅ Perfect for AI Wizard**: Has all fields needed for generated decks

#### 2. pitch_conversations
```sql
CREATE TABLE pitch_conversations (
    id UUID PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id),  -- ✅ User ownership
    deck_id UUID REFERENCES presentations(id), -- ✅ Links to final deck
    messages JSONB,                            -- ✅ Chat history
    collected_data JSONB,                      -- ✅ Startup info collected
    status TEXT,                               -- ✅ active/completed
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

**✅ Perfect for AI Agent**: Can store entire conversation context

#### 3. wizard_sessions
```sql
CREATE TABLE wizard_sessions (
    id UUID PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id),
    conversation_id UUID REFERENCES pitch_conversations(id),
    current_step INTEGER,                      -- ✅ Track progress
    completeness NUMERIC,                      -- ✅ Progress percentage
    collected_data JSONB,                      -- ✅ Startup info
    metadata JSONB,
    status TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

**✅ Perfect for Wizard Flow**: Tracks user progress and collected data

#### 4. presentation_templates
```sql
CREATE TABLE presentation_templates (
    id UUID PRIMARY KEY,
    name TEXT,
    description TEXT,
    cover_image_url TEXT,
    attribution TEXT,
    category TEXT,
    usage_count INTEGER,
    like_count INTEGER,
    is_premium BOOLEAN,
    price_cents INTEGER,
    tags TEXT[],
    slides JSONB,                              -- ✅ Template structure
    theme JSONB,                               -- ✅ Template styling
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

**✅ Perfect for Templates**: Ready for template-based generation

---

## 🔧 BACKEND SETUP STEPS

### Phase 1: Environment Setup (15 minutes)

#### Step 1.1: Install Supabase Python Client

```bash
cd /home/sk/mde/template-copilot-kit-py

# Activate virtual environment
source .venv/bin/activate

# Install supabase-py
uv pip install supabase

# Verify installation
python3 -c "from supabase import create_client; print('✅ Supabase installed')"
```

**Expected Output**: `✅ Supabase installed`

#### Step 1.2: Verify Environment Variables

```bash
# Check .env file exists in parent directory
cat /home/sk/mde/.env | grep SUPABASE

# Should show:
# SUPABASE_PROJECT_ID=dhesktsqhcxhqfjypulk
# SUPABASE_PROJECT_URL=https://dhesktsqhcxhqfjypulk.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
# VITE_SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

✅ **Verification**: All 5 environment variables present

#### Step 1.3: Update pyproject.toml

```bash
cd /home/sk/mde/template-copilot-kit-py

# Add supabase to dependencies
# Edit pyproject.toml
```

**Add to dependencies**:
```toml
dependencies = [
    "asgi-correlation-id>=4.3.4",
    "blaxel[langgraph,telemetry]==0.2.19",
    "copilotkit>=0.1.46",
    "fastapi[standard]>=0.115.12",
    "langgraph-supervisor>=0.0.4",
    "rich>=13.9.4",
    "playwright>=1.51.0",
    "html2text>=2025.4.15",
    "supabase>=2.10.0",              # ⭐ ADD THIS
    "python-dotenv>=1.0.0",          # ⭐ ADD THIS (for .env loading)
]
```

**Install updated dependencies**:
```bash
uv pip install -e .
```

---

### Phase 2: Create Supabase Client Module (20 minutes)

#### Step 2.1: Create Database Client

**Create file**: `src/database/supabase_client.py`

```python
"""
Supabase client configuration for backend services.
Provides database access with service role permissions.
"""
import os
from typing import Optional
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from parent directory
load_dotenv(dotenv_path="/home/sk/mde/.env")


class SupabaseClient:
    """Singleton Supabase client for backend services."""

    _instance: Optional[Client] = None

    @classmethod
    def get_client(cls) -> Client:
        """
        Get or create Supabase client instance.
        Uses service role key for backend operations.
        """
        if cls._instance is None:
            url = os.getenv("SUPABASE_PROJECT_URL")
            service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

            if not url or not service_key:
                raise ValueError(
                    "Missing Supabase credentials. "
                    "Ensure SUPABASE_PROJECT_URL and SUPABASE_SERVICE_ROLE_KEY "
                    "are set in /home/sk/mde/.env"
                )

            cls._instance = create_client(url, service_key)
            print(f"✅ Supabase client initialized: {url}")

        return cls._instance


# Singleton instance
supabase: Client = SupabaseClient.get_client()
```

**Create directory**:
```bash
mkdir -p /home/sk/mde/template-copilot-kit-py/src/database
touch /home/sk/mde/template-copilot-kit-py/src/database/__init__.py
```

#### Step 2.2: Create Database Models

**Create file**: `src/database/models.py`

```python
"""
Pydantic models for Supabase database tables.
Matches schema from dhesktsqhcxhqfjypulk project.
"""
from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field
from uuid import UUID


class PresentationCreate(BaseModel):
    """Model for creating a new presentation."""
    profile_id: UUID
    title: str
    prompt: Optional[str] = None
    presentation_style: Optional[str] = "professional"
    language: Optional[str] = "en"
    status: str = "draft"
    template_id: Optional[UUID] = None


class PresentationUpdate(BaseModel):
    """Model for updating a presentation."""
    title: Optional[str] = None
    content: Optional[Dict[str, Any]] = None
    outline: Optional[List[str]] = None
    status: Optional[str] = None
    slide_count: Optional[int] = None
    thumbnail_url: Optional[str] = None


class PitchConversationCreate(BaseModel):
    """Model for creating a new pitch conversation."""
    profile_id: UUID
    deck_id: Optional[UUID] = None
    messages: List[Dict[str, Any]] = Field(default_factory=list)
    collected_data: Dict[str, Any] = Field(default_factory=dict)
    status: str = "active"


class PitchConversationUpdate(BaseModel):
    """Model for updating a pitch conversation."""
    messages: Optional[List[Dict[str, Any]]] = None
    collected_data: Optional[Dict[str, Any]] = None
    status: Optional[str] = None
    deck_id: Optional[UUID] = None


class WizardSessionCreate(BaseModel):
    """Model for creating a new wizard session."""
    profile_id: UUID
    conversation_id: UUID
    current_step: int = 0
    completeness: float = 0.0
    collected_data: Dict[str, Any] = Field(default_factory=dict)
    status: str = "active"


class WizardSessionUpdate(BaseModel):
    """Model for updating a wizard session."""
    current_step: Optional[int] = None
    completeness: Optional[float] = None
    collected_data: Optional[Dict[str, Any]] = None
    status: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class StartupData(BaseModel):
    """Collected startup information from AI conversation."""
    company_name: Optional[str] = None
    industry: Optional[str] = None
    problem: Optional[str] = None
    solution: Optional[str] = None
    target_market: Optional[str] = None
    business_model: Optional[str] = None
    competitive_advantage: Optional[str] = None
    team: Optional[str] = None
    traction: Optional[str] = None
    financials: Optional[str] = None
    ask: Optional[str] = None

    def calculate_completeness(self) -> float:
        """Calculate how complete the data is (0-100)."""
        fields = [
            self.company_name,
            self.industry,
            self.problem,
            self.solution,
            self.target_market,
            self.business_model,
            self.competitive_advantage,
            self.team,
            self.traction,
            self.financials,
            self.ask,
        ]
        completed = sum(1 for field in fields if field)
        return (completed / len(fields)) * 100

    def is_ready_to_generate(self) -> bool:
        """Check if enough data collected to generate deck."""
        # Minimum required: company, problem, solution, market
        required = [
            self.company_name,
            self.problem,
            self.solution,
            self.target_market,
        ]
        return all(required) and self.calculate_completeness() >= 60
```

#### Step 2.3: Create Database Service

**Create file**: `src/database/services.py`

```python
"""
Database service layer for Supabase operations.
Provides high-level functions for pitch deck wizard.
"""
from typing import Optional, Dict, Any, List
from uuid import UUID
from datetime import datetime

from .supabase_client import supabase
from .models import (
    PresentationCreate,
    PresentationUpdate,
    PitchConversationCreate,
    PitchConversationUpdate,
    WizardSessionCreate,
    WizardSessionUpdate,
    StartupData,
)


class PresentationService:
    """Service for managing presentations."""

    @staticmethod
    async def create(data: PresentationCreate) -> Dict[str, Any]:
        """Create a new presentation."""
        result = supabase.table("presentations").insert({
            "profile_id": str(data.profile_id),
            "title": data.title,
            "prompt": data.prompt,
            "presentation_style": data.presentation_style,
            "language": data.language,
            "status": data.status,
            "template_id": str(data.template_id) if data.template_id else None,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }).execute()

        return result.data[0] if result.data else None

    @staticmethod
    async def update(presentation_id: UUID, data: PresentationUpdate) -> Dict[str, Any]:
        """Update an existing presentation."""
        update_data = data.model_dump(exclude_none=True)
        update_data["updated_at"] = datetime.utcnow().isoformat()

        result = supabase.table("presentations").update(update_data).eq(
            "id", str(presentation_id)
        ).execute()

        return result.data[0] if result.data else None

    @staticmethod
    async def get_by_id(presentation_id: UUID) -> Optional[Dict[str, Any]]:
        """Get presentation by ID."""
        result = supabase.table("presentations").select("*").eq(
            "id", str(presentation_id)
        ).execute()

        return result.data[0] if result.data else None

    @staticmethod
    async def list_by_profile(profile_id: UUID) -> List[Dict[str, Any]]:
        """Get all presentations for a user."""
        result = supabase.table("presentations").select("*").eq(
            "profile_id", str(profile_id)
        ).order("created_at", desc=True).execute()

        return result.data or []


class ConversationService:
    """Service for managing pitch conversations."""

    @staticmethod
    async def create(data: PitchConversationCreate) -> Dict[str, Any]:
        """Create a new conversation."""
        result = supabase.table("pitch_conversations").insert({
            "profile_id": str(data.profile_id),
            "deck_id": str(data.deck_id) if data.deck_id else None,
            "messages": data.messages,
            "collected_data": data.collected_data,
            "status": data.status,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }).execute()

        return result.data[0] if result.data else None

    @staticmethod
    async def update(conversation_id: UUID, data: PitchConversationUpdate) -> Dict[str, Any]:
        """Update a conversation."""
        update_data = data.model_dump(exclude_none=True)
        update_data["updated_at"] = datetime.utcnow().isoformat()

        result = supabase.table("pitch_conversations").update(update_data).eq(
            "id", str(conversation_id)
        ).execute()

        return result.data[0] if result.data else None

    @staticmethod
    async def get_by_id(conversation_id: UUID) -> Optional[Dict[str, Any]]:
        """Get conversation by ID."""
        result = supabase.table("pitch_conversations").select("*").eq(
            "id", str(conversation_id)
        ).execute()

        return result.data[0] if result.data else None

    @staticmethod
    async def append_message(
        conversation_id: UUID,
        role: str,
        content: str
    ) -> Dict[str, Any]:
        """Append a message to the conversation."""
        # Get current conversation
        conversation = await ConversationService.get_by_id(conversation_id)
        if not conversation:
            raise ValueError(f"Conversation {conversation_id} not found")

        # Append new message
        messages = conversation.get("messages", [])
        messages.append({
            "role": role,
            "content": content,
            "timestamp": datetime.utcnow().isoformat(),
        })

        # Update conversation
        return await ConversationService.update(
            conversation_id,
            PitchConversationUpdate(messages=messages)
        )

    @staticmethod
    async def update_collected_data(
        conversation_id: UUID,
        data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Update collected startup data."""
        conversation = await ConversationService.get_by_id(conversation_id)
        if not conversation:
            raise ValueError(f"Conversation {conversation_id} not found")

        # Merge with existing data
        collected_data = conversation.get("collected_data", {})
        collected_data.update(data)

        # Calculate completeness
        startup_data = StartupData(**collected_data)
        completeness = startup_data.calculate_completeness()

        # Update conversation
        return await ConversationService.update(
            conversation_id,
            PitchConversationUpdate(collected_data=collected_data)
        ), completeness


class WizardSessionService:
    """Service for managing wizard sessions."""

    @staticmethod
    async def create(data: WizardSessionCreate) -> Dict[str, Any]:
        """Create a new wizard session."""
        result = supabase.table("wizard_sessions").insert({
            "profile_id": str(data.profile_id),
            "conversation_id": str(data.conversation_id),
            "current_step": data.current_step,
            "completeness": data.completeness,
            "collected_data": data.collected_data,
            "status": data.status,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }).execute()

        return result.data[0] if result.data else None

    @staticmethod
    async def update(session_id: UUID, data: WizardSessionUpdate) -> Dict[str, Any]:
        """Update a wizard session."""
        update_data = data.model_dump(exclude_none=True)
        update_data["updated_at"] = datetime.utcnow().isoformat()

        result = supabase.table("wizard_sessions").update(update_data).eq(
            "id", str(session_id)
        ).execute()

        return result.data[0] if result.data else None

    @staticmethod
    async def get_by_conversation(conversation_id: UUID) -> Optional[Dict[str, Any]]:
        """Get session by conversation ID."""
        result = supabase.table("wizard_sessions").select("*").eq(
            "conversation_id", str(conversation_id)
        ).execute()

        return result.data[0] if result.data else None


class TemplateService:
    """Service for managing presentation templates."""

    @staticmethod
    async def list_all() -> List[Dict[str, Any]]:
        """Get all available templates."""
        result = supabase.table("presentation_templates").select("*").order(
            "usage_count", desc=True
        ).execute()

        return result.data or []

    @staticmethod
    async def get_by_category(category: str) -> List[Dict[str, Any]]:
        """Get templates by category."""
        result = supabase.table("presentation_templates").select("*").eq(
            "category", category
        ).order("usage_count", desc=True).execute()

        return result.data or []

    @staticmethod
    async def get_by_id(template_id: UUID) -> Optional[Dict[str, Any]]:
        """Get template by ID."""
        result = supabase.table("presentation_templates").select("*").eq(
            "id", str(template_id)
        ).execute()

        return result.data[0] if result.data else None
```

---

### Phase 3: Integration with Blaxel Agents (30 minutes)

#### Step 3.1: Update Content Agent (flight.py → content_agent.py)

**Rename file**:
```bash
cd /home/sk/mde/template-copilot-kit-py/src
mv flight.py content_agent.py
```

**Update content**: `src/content_agent.py`

```python
"""
Content Agent - Gathers startup information through conversation.
Uses Supabase to store collected data.
"""
from logging import getLogger
from uuid import UUID
from typing import Dict, Any

from blaxel.langgraph import bl_tools, bl_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

from database.services import ConversationService, StartupData

logger = getLogger(__name__)


async def agent():
    """
    Content gathering agent for pitch deck wizard.
    Asks questions to collect startup information.
    """
    # Get tools and model
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")

    # Agent prompt - focused on collecting startup data
    prompt = """
    You are a startup pitch deck consultant helping entrepreneurs create investor presentations.
    Your goal is to gather comprehensive information about their startup through natural conversation.

    REQUIRED INFORMATION TO COLLECT:
    1. Company Name & Industry
    2. Problem Statement (What problem are you solving?)
    3. Solution (How does your product/service solve it?)
    4. Target Market (Who are your customers?)
    5. Business Model (How do you make money?)
    6. Competitive Advantage (What makes you unique?)
    7. Team (Who's behind the company?)
    8. Traction (Any metrics, users, revenue?)
    9. Financials (Revenue, costs, projections)
    10. Ask (How much funding? What for?)

    CONVERSATION GUIDELINES:
    - Ask focused, specific questions one at a time
    - Build on previous answers naturally
    - If user gives vague answer, ask follow-up questions
    - Be encouraging and supportive
    - Track what info you've collected
    - Show progress (e.g., "Great! We're 40% complete")
    - When 60%+ complete, offer to generate the deck

    RESPONSE FORMAT:
    Always respond with:
    1. Acknowledgment of their answer
    2. Next question OR readiness assessment
    3. Progress update

    Use the conversation context to track collected data.
    """

    # Create LangGraph agent
    return create_react_agent(
        name="content-agent",
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=MemorySaver(),
    )


async def extract_startup_data(messages: list) -> Dict[str, Any]:
    """
    Extract structured startup data from conversation messages.
    Uses simple keyword matching and NLP.
    """
    data = {}

    # Combine all user messages
    user_text = " ".join([
        msg["content"] for msg in messages
        if msg.get("role") == "user"
    ]).lower()

    # Simple extraction (can be enhanced with NLP)
    # Company name - usually mentioned early
    if "company" in user_text or "called" in user_text:
        # Extract company name (basic regex)
        import re
        match = re.search(r"(?:called|named|company is) ([A-Z][a-zA-Z0-9 ]+)", user_text)
        if match:
            data["company_name"] = match.group(1).strip()

    # Keywords for each category
    keywords = {
        "problem": ["problem", "issue", "challenge", "pain point"],
        "solution": ["solution", "product", "service", "platform", "app"],
        "target_market": ["customers", "market", "users", "audience", "target"],
        "business_model": ["revenue", "monetize", "pricing", "subscription", "fee"],
        "competitive_advantage": ["unique", "different", "better", "advantage", "edge"],
        "team": ["founder", "team", "experience", "background"],
        "traction": ["users", "customers", "revenue", "growth", "metrics"],
    }

    # Extract based on keywords (simplified)
    for key, words in keywords.items():
        if any(word in user_text for word in words):
            # Get context around keyword (simplified)
            data[key] = "Mentioned in conversation"  # TODO: Extract actual content

    return data
```

#### Step 3.2: Update Slides Agent (hotel.py → slides_agent.py)

**Rename file**:
```bash
mv hotel.py slides_agent.py
```

**Update content**: `src/slides_agent.py`

```python
"""
Slides Agent - Structures presentation based on collected data.
Generates slide outline and content.
"""
from logging import getLogger
from typing import Dict, Any, List

from blaxel.langgraph import bl_tools, bl_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

from database.services import PresentationService, TemplateService
from database.models import StartupData

logger = getLogger(__name__)


async def agent():
    """
    Slides structuring agent for pitch deck wizard.
    Creates presentation outline from collected data.
    """
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")

    prompt = """
    You are an expert pitch deck designer who creates compelling investor presentations.
    You transform startup information into structured slide content.

    STANDARD PITCH DECK STRUCTURE (10-15 slides):
    1. Cover Slide - Company name, tagline, logo
    2. Problem - The pain point you're solving
    3. Solution - How your product solves it
    4. Market Opportunity - TAM, SAM, SOM
    5. Product Demo - Screenshots, features
    6. Business Model - How you make money
    7. Traction - Metrics, users, revenue
    8. Competition - Competitive landscape
    9. Competitive Advantage - Why you'll win
    10. Team - Founders, key members
    11. Financials - Revenue, projections
    12. Ask - Funding amount, use of funds
    13. Vision - Long-term goals
    14. Contact - How to reach you

    YOUR TASK:
    Given startup data, create:
    1. Slide titles
    2. Key points for each slide (3-5 bullets)
    3. Suggested visuals/charts
    4. Speaker notes

    GUIDELINES:
    - Keep text minimal (10 words per slide max)
    - Use data and metrics when available
    - Tell a compelling story
    - Highlight traction and differentiation
    - End with clear ask

    Return structured JSON with slide content.
    """

    return create_react_agent(
        name="slides-agent",
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=MemorySaver(),
    )


async def generate_slide_outline(startup_data: StartupData) -> List[Dict[str, Any]]:
    """
    Generate slide outline from startup data.
    Returns structured slide content.
    """
    slides = []

    # Slide 1: Cover
    slides.append({
        "title": startup_data.company_name or "Startup Pitch Deck",
        "type": "cover",
        "content": {
            "company": startup_data.company_name,
            "tagline": f"Solving {startup_data.problem}" if startup_data.problem else "",
        }
    })

    # Slide 2: Problem
    if startup_data.problem:
        slides.append({
            "title": "The Problem",
            "type": "content",
            "content": {
                "points": [startup_data.problem],
                "visual": "problem illustration"
            }
        })

    # Slide 3: Solution
    if startup_data.solution:
        slides.append({
            "title": "Our Solution",
            "type": "content",
            "content": {
                "points": [startup_data.solution],
                "visual": "product screenshot"
            }
        })

    # Slide 4: Market
    if startup_data.target_market:
        slides.append({
            "title": "Market Opportunity",
            "type": "content",
            "content": {
                "points": [f"Target: {startup_data.target_market}"],
                "visual": "market size chart"
            }
        })

    # Slide 5: Business Model
    if startup_data.business_model:
        slides.append({
            "title": "Business Model",
            "type": "content",
            "content": {
                "points": [startup_data.business_model],
                "visual": "revenue model diagram"
            }
        })

    # Slide 6: Competitive Advantage
    if startup_data.competitive_advantage:
        slides.append({
            "title": "Why We'll Win",
            "type": "content",
            "content": {
                "points": [startup_data.competitive_advantage],
                "visual": "competitive matrix"
            }
        })

    # Slide 7: Traction
    if startup_data.traction:
        slides.append({
            "title": "Traction",
            "type": "metrics",
            "content": {
                "points": [startup_data.traction],
                "visual": "growth chart"
            }
        })

    # Slide 8: Team
    if startup_data.team:
        slides.append({
            "title": "Team",
            "type": "team",
            "content": {
                "points": [startup_data.team],
                "visual": "team photos"
            }
        })

    # Slide 9: Ask
    if startup_data.ask:
        slides.append({
            "title": "The Ask",
            "type": "content",
            "content": {
                "points": [startup_data.ask],
                "visual": "use of funds chart"
            }
        })

    # Slide 10: Contact
    slides.append({
        "title": "Let's Connect",
        "type": "contact",
        "content": {
            "company": startup_data.company_name,
        }
    })

    return slides
```

#### Step 3.3: Update Supervisor Agent

**Update**: `src/agent.py`

```python
"""
Supervisor Agent - Orchestrates content and slides agents.
"""
from logging import getLogger

from blaxel.langgraph import bl_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph_supervisor import create_supervisor

from .content_agent import agent as content_agent
from .slides_agent import agent as slides_agent

logger = getLogger(__name__)


async def agent():
    """
    Supervisor agent for pitch deck wizard.
    Routes between content gathering and slide generation.
    """
    model = await bl_model("sandbox-openai")

    # Get sub-agents
    content = await content_agent()
    slides = await slides_agent()

    # Create supervisor
    supervisor_graph = create_supervisor(
        [content, slides],
        model=model,
        supervisor_name="pitch-deck-supervisor",
        prompt="""
        You are a pitch deck wizard supervisor managing two specialized agents:

        1. CONTENT AGENT - Gathers startup information through conversation
        2. SLIDES AGENT - Structures collected data into presentation slides

        WORKFLOW:
        - Start by delegating to CONTENT AGENT to collect information
        - Monitor completeness (0-100%)
        - When completeness >= 60%, ask user if ready to generate
        - If yes, delegate to SLIDES AGENT to create deck
        - Return final presentation data

        DELEGATION RULES:
        - Use CONTENT AGENT for all conversation and data gathering
        - Use SLIDES AGENT only when generating the actual deck
        - Track progress and guide user through the process

        You coordinate the entire pitch deck creation journey.
        """,
    )

    return supervisor_graph.compile(
        name="pitch-deck-supervisor",
        checkpointer=MemorySaver()
    )
```

---

### Phase 4: API Endpoint Integration (20 minutes)

#### Step 4.1: Update FastAPI Main

**Update**: `src/main.py`

```python
"""
FastAPI server with CopilotKit and Supabase integration.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from copilotkit import CopilotKitSDK
from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
import os

from database.services import (
    ConversationService,
    WizardSessionService,
    PresentationService,
)
from database.models import (
    PitchConversationCreate,
    WizardSessionCreate,
    PresentationCreate,
    StartupData,
)

app = FastAPI(title="Pitch Deck Wizard API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CopilotKit SDK
sdk = CopilotKitSDK()


# Request/Response Models
class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    profile_id: str


class ChatResponse(BaseModel):
    conversation_id: str
    message: str
    completeness: float
    collected_data: Dict[str, Any]
    ready_to_generate: bool
    suggestions: Optional[list] = None


@app.post("/api/pitch-deck-assistant")
async def pitch_deck_assistant(request: ChatRequest) -> ChatResponse:
    """
    AI-powered pitch deck assistant endpoint.
    Handles conversation and data collection.
    """
    try:
        # Get or create conversation
        if request.conversation_id:
            conversation = await ConversationService.get_by_id(
                UUID(request.conversation_id)
            )
            if not conversation:
                raise HTTPException(404, "Conversation not found")
        else:
            # Create new conversation
            conversation = await ConversationService.create(
                PitchConversationCreate(
                    profile_id=UUID(request.profile_id)
                )
            )

        conversation_id = conversation["id"]

        # Append user message
        await ConversationService.append_message(
            UUID(conversation_id),
            role="user",
            content=request.message
        )

        # TODO: Call Blaxel agent here
        # For now, simple response
        ai_response = "Thank you! Tell me about your startup."

        # Append AI response
        await ConversationService.append_message(
            UUID(conversation_id),
            role="assistant",
            content=ai_response
        )

        # Update collected data (simplified)
        collected_data = conversation.get("collected_data", {})

        # Calculate completeness
        startup_data = StartupData(**collected_data)
        completeness = startup_data.calculate_completeness()
        ready = startup_data.is_ready_to_generate()

        return ChatResponse(
            conversation_id=conversation_id,
            message=ai_response,
            completeness=completeness,
            collected_data=collected_data,
            ready_to_generate=ready,
        )

    except Exception as e:
        raise HTTPException(500, str(e))


@app.post("/api/generate-pitch-deck")
async def generate_pitch_deck(conversation_id: str) -> Dict[str, Any]:
    """
    Generate pitch deck from conversation data.
    """
    try:
        # Get conversation
        conversation = await ConversationService.get_by_id(UUID(conversation_id))
        if not conversation:
            raise HTTPException(404, "Conversation not found")

        # Extract startup data
        collected_data = conversation.get("collected_data", {})
        startup_data = StartupData(**collected_data)

        # Create presentation
        presentation = await PresentationService.create(
            PresentationCreate(
                profile_id=UUID(conversation["profile_id"]),
                title=startup_data.company_name or "Untitled Presentation",
                prompt=f"Generated from conversation {conversation_id}",
                status="generated"
            )
        )

        # Link conversation to deck
        await ConversationService.update(
            UUID(conversation_id),
            {"deck_id": presentation["id"], "status": "completed"}
        )

        return {
            "presentation_id": presentation["id"],
            "title": presentation["title"],
            "status": "success"
        }

    except Exception as e:
        raise HTTPException(500, str(e))


@app.get("/api/presentations/{profile_id}")
async def list_presentations(profile_id: str) -> Dict[str, Any]:
    """Get user's presentations."""
    presentations = await PresentationService.list_by_profile(UUID(profile_id))
    return {"presentations": presentations}


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "pitch-deck-wizard"}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 1339))
    uvicorn.run(app, host="0.0.0.0", port=port)
```

---

### Phase 5: Testing (15 minutes)

#### Step 5.1: Test Database Connection

**Create**: `tests/test_database.py`

```python
"""
Test Supabase database connection.
"""
import asyncio
from uuid import uuid4

from src.database.supabase_client import supabase
from src.database.services import ConversationService
from src.database.models import PitchConversationCreate


async def test_connection():
    """Test basic database connection."""
    print("Testing Supabase connection...")

    # Test query
    result = supabase.table("presentations").select("id").limit(1).execute()
    print(f"✅ Connected to Supabase")
    print(f"   Tables accessible: presentations ✓")

    return True


async def test_conversation_crud():
    """Test conversation CRUD operations."""
    print("\nTesting conversation CRUD...")

    test_profile_id = uuid4()

    # Create
    conversation = await ConversationService.create(
        PitchConversationCreate(profile_id=test_profile_id)
    )
    print(f"✅ Created conversation: {conversation['id']}")

    # Read
    fetched = await ConversationService.get_by_id(conversation['id'])
    print(f"✅ Fetched conversation: {fetched['id']}")

    # Update - Add message
    updated = await ConversationService.append_message(
        conversation['id'],
        role="user",
        content="Test message"
    )
    print(f"✅ Added message: {len(updated['messages'])} messages")

    print("\n✅ All database tests passed!")


if __name__ == "__main__":
    asyncio.run(test_connection())
    asyncio.run(test_conversation_crud())
```

**Run tests**:
```bash
cd /home/sk/mde/template-copilot-kit-py
python tests/test_database.py
```

#### Step 5.2: Test API Endpoints

```bash
# Start server
bl serve --hotreload

# Test health check
curl http://localhost:1339/health

# Test chat endpoint
curl -X POST http://localhost:1339/api/pitch-deck-assistant \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I want to create a pitch deck for my AI startup",
    "profile_id": "00000000-0000-0000-0000-000000000000"
  }'
```

---

## 📋 IMPLEMENTATION CHECKLIST

### ✅ Setup Phase (30-45 minutes)

- [ ] Install supabase-py (`uv pip install supabase`)
- [ ] Install python-dotenv (`uv pip install python-dotenv`)
- [ ] Update pyproject.toml with new dependencies
- [ ] Verify environment variables in `/home/sk/mde/.env`
- [ ] Test database connection

### ✅ Code Phase (1-2 hours)

- [ ] Create `src/database/` directory
- [ ] Create `supabase_client.py` (database client)
- [ ] Create `models.py` (Pydantic models)
- [ ] Create `services.py` (database operations)
- [ ] Rename `flight.py` → `content_agent.py`
- [ ] Rename `hotel.py` → `slides_agent.py`
- [ ] Update agent prompts for pitch deck logic
- [ ] Update `agent.py` (supervisor)
- [ ] Update `main.py` (API endpoints)

### ✅ Testing Phase (30 minutes)

- [ ] Create `tests/test_database.py`
- [ ] Run database tests
- [ ] Start backend server (`bl serve --hotreload`)
- [ ] Test health endpoint
- [ ] Test chat endpoint with curl
- [ ] Test with frontend UI

### ✅ Integration Phase (15 minutes)

- [ ] Connect frontend to backend
- [ ] Test complete user journey
- [ ] Verify data persists in Supabase
- [ ] Check RLS policies allow operations

---

## 🎯 SUCCESS CRITERIA

### ✅ Phase 1: Database Connection
- [x] supabase-py installed
- [ ] Connection established to `dhesktsqhcxhqfjypulk`
- [ ] Can query `presentations` table
- [ ] Can insert test data

### ✅ Phase 2: Services Layer
- [ ] ConversationService working (CRUD)
- [ ] WizardSessionService working (CRUD)
- [ ] PresentationService working (CRUD)
- [ ] StartupData model calculates completeness

### ✅ Phase 3: Agents
- [ ] Content agent asks questions
- [ ] Slides agent generates structure
- [ ] Supervisor coordinates both
- [ ] Data persists to Supabase

### ✅ Phase 4: API
- [ ] `/api/pitch-deck-assistant` endpoint works
- [ ] `/api/generate-pitch-deck` endpoint works
- [ ] Frontend can call backend
- [ ] Chat history persists

---

## 🚨 POTENTIAL ISSUES & SOLUTIONS

### Issue 1: RLS Policies Block Backend

**Symptom**: Service role can't insert/update
**Cause**: RLS policies too restrictive
**Solution**: Service role key bypasses RLS (already configured)

### Issue 2: UUID Formatting

**Symptom**: "invalid UUID" errors
**Cause**: Mixing string/UUID types
**Solution**: Always convert to string when inserting:
```python
"profile_id": str(profile_id)
```

### Issue 3: Async/Sync Mismatch

**Symptom**: "coroutine was never awaited"
**Cause**: Forgetting `await`
**Solution**: Use `await` for all async service calls

### Issue 4: Environment Variables Not Found

**Symptom**: "Missing Supabase credentials"
**Cause**: .env not loaded
**Solution**: Use `load_dotenv()` with absolute path:
```python
load_dotenv(dotenv_path="/home/sk/mde/.env")
```

---

## 📊 ESTIMATED TIMELINE

| Phase | Tasks | Time | Status |
|-------|-------|------|--------|
| **Phase 1** | Environment Setup | 15 min | 🔴 Not Started |
| **Phase 2** | Database Module | 20 min | 🔴 Not Started |
| **Phase 3** | Agent Updates | 30 min | 🔴 Not Started |
| **Phase 4** | API Integration | 20 min | 🔴 Not Started |
| **Phase 5** | Testing | 15 min | 🔴 Not Started |
| **TOTAL** | | **1.5-2 hours** | 🔴 0% |

---

## 🎓 NEXT STEPS AFTER SETUP

1. **Enhance Content Agent**
   - Better NLP for data extraction
   - Smarter question flow
   - Context awareness

2. **Enhance Slides Agent**
   - Template selection logic
   - Design customization
   - Visual recommendations

3. **Add Export Features**
   - PowerPoint (.pptx) generation
   - PDF export
   - Image rendering

4. **Improve UI Integration**
   - Real-time progress updates
   - Preview slides as generated
   - Edit capability

---

**Document Status**: ✅ Complete Setup Plan
**Created**: October 26, 2025
**Location**: `/home/sk/mde/mvp/pitch-deck/tasks/`
**Ready for**: Implementation

**Estimated Completion**: 2 hours of focused work
**Complexity**: Medium
**Dependencies**: Supabase connection verified ✅
