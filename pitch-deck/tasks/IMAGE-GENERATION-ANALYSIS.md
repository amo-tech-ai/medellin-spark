# Image Generation Analysis - Reference Implementation Patterns

**Analysis Date**: January 26, 2025
**Repositories Analyzed**:
- `/repos/200-presenton` (Presenton)
- `/repos/250-presentation-ai` (Presentation AI)

**Purpose**: Document image generation approaches for Pitch Deck Wizard implementation

---

## Executive Summary

Both reference repositories implement **multi-provider image generation** with:
- ✅ AI-generated images (DALL-E, Gemini Flash, FLUX models)
- ✅ Stock photo APIs (Unsplash, Pexels, Pixabay)
- ✅ User upload support
- ✅ Placeholder fallback system
- ✅ Image caching and persistence

**Key Insight**: Hybrid approach (AI + Stock + Upload) provides flexibility and cost control.

---

## Architecture Patterns

### Pattern 1: Provider Abstraction (Presenton)

**Location**: `servers/fastapi/services/image_generation_service.py`

```python
class ImageGenerationService:
    def __init__(self, output_directory: str):
        self.output_directory = output_directory
        self.image_gen_func = self.get_image_gen_func()

    def get_image_gen_func(self):
        if is_pixabay_selected():
            return self.get_image_from_pixabay
        elif is_pixels_selected():
            return self.get_image_from_pexels
        elif is_gemini_flash_selected():
            return self.generate_image_google
        elif is_dalle3_selected():
            return self.generate_image_openai
        return None  # Fallback to placeholder
```

**Benefits**:
- Single configuration point (env variable)
- Runtime provider switching
- Graceful fallback to placeholder
- Easy to add new providers

**Supported Providers**:
```python
class ImageProvider(Enum):
    PEXELS = "pexels"
    PIXABAY = "pixabay"
    GEMINI_FLASH = "gemini_flash"
    DALLE3 = "dall-e-3"
```

---

### Pattern 2: Dual-Source Selection (Presentation AI)

**Location**: `src/components/presentation/theme/ImageSourceSelector.tsx`

```typescript
export function ImageSourceSelector({
  imageSource,      // "ai" | "stock"
  imageModel,       // FLUX model variant
  stockImageProvider, // "unsplash"
  onImageSourceChange,
  onImageModelChange,
  onStockImageProviderChange,
}) {
  // User-facing dropdown with grouped options:
  // AI Generation:
  //   - FLUX Fast (free)
  //   - FLUX Developer
  //   - FLUX Premium
  // Stock Images:
  //   - Unsplash
}
```

**Benefits**:
- User controls cost vs quality
- Clear separation of AI vs stock
- Multiple AI model tiers
- Single UI component

---

## Implementation Details

### 1. DALL-E 3 (OpenAI)

**Presenton Implementation**: `servers/fastapi/services/image_generation_service.py:83-93`

```python
async def generate_image_openai(self, prompt: str, output_directory: str) -> str:
    client = AsyncOpenAI()
    result = await client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        n=1,
        quality="standard",  # or "hd"
        size="1024x1024",    # Fixed aspect ratio
    )
    image_url = result.data[0].url
    return await download_file(image_url, output_directory)
```

**Specs**:
- Model: `dall-e-3`
- Size: 1024x1024 (fixed)
- Quality: standard | hd
- Cost: ~$0.040/image (standard), ~$0.080/image (HD)
- Response: Temporary URL (must download)

---

### 2. Gemini Flash (Google)

**Presenton Implementation**: `servers/fastapi/services/image_generation_service.py:95-112`

```python
async def generate_image_google(self, prompt: str, output_directory: str) -> str:
    client = genai.Client()
    response = await asyncio.to_thread(
        client.models.generate_content,
        model="gemini-2.5-flash-image-preview",
        contents=[prompt],
        config=GenerateContentConfig(response_modalities=["TEXT", "IMAGE"]),
    )

    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            image_path = os.path.join(output_directory, f"{uuid.uuid4()}.jpg")
            with open(image_path, "wb") as f:
                f.write(part.inline_data.data)

    return image_path
```

**Specs**:
- Model: `gemini-2.5-flash-image-preview`
- Response: Inline binary data (no download needed)
- Cost: Lower than DALL-E (check current pricing)
- Multimodal: Can generate text + image

---

### 3. FLUX Models (Together AI)

**Presentation AI Implementation**: `src/app/_actions/image/generate.ts:19-107`

```typescript
export async function generateImageAction(
  prompt: string,
  model: ImageModelList = "black-forest-labs/FLUX.1-schnell-Free",
) {
  const response = await together.images.create({
    model: model,
    prompt: prompt,
    width: 1024,
    height: 768,      // Custom aspect ratio!
    steps: model.includes("schnell") ? 4 : 28,
    n: 1,
  });

  const imageUrl = response.data[0]?.url;

  // Download from Together AI
  const imageResponse = await fetch(imageUrl);
  const imageBlob = await imageResponse.blob();

  // Upload to UploadThing (permanent storage)
  const utFile = new UTFile([new Uint8Array(imageBuffer)], filename);
  const uploadResult = await utapi.uploadFiles([utFile]);

  // Store in database
  await db.generatedImage.create({
    data: {
      url: uploadResult[0].data.ufsUrl,
      prompt: prompt,
      userId: session.user.id,
    },
  });
}
```

**Available FLUX Models**:
```typescript
type ImageModelList =
  | "black-forest-labs/FLUX.1-schnell-Free"  // FREE! 4 steps, fast
  | "black-forest-labs/FLUX.1-schnell"       // Paid, 4 steps
  | "black-forest-labs/FLUX.1-dev"           // 28 steps, quality
  | "black-forest-labs/FLUX1.1-pro"          // Premium
```

**Key Advantages**:
- ✅ **FREE tier available** (`FLUX.1-schnell-Free`)
- ✅ **Custom aspect ratios** (1024x768 for slides!)
- ✅ **Fast generation** (4 steps for schnell models)
- ✅ **High quality** (FLUX is SOTA)

**Storage Flow**:
1. Generate via Together AI → Temporary URL
2. Download to server
3. Upload to UploadThing → Permanent URL
4. Store in PostgreSQL with metadata

---

### 4. Unsplash (Stock Photos)

**Presentation AI Implementation**: `src/app/_actions/image/unsplash.ts:33-88`

```typescript
export async function getImageFromUnsplash(
  query: string,
  layoutType?: LayoutType,
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  const orientationQuery =
    layoutType === "vertical"
      ? "&orientation=landscape"
      : layoutType === "left" || layoutType === "right"
        ? "&orientation=portrait"
        : "&orientation=landscape";

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=1&per_page=1${orientationQuery}`,
    {
      headers: {
        Authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const data: UnsplashSearchResponse = await response.json();
  const firstImage = data.results[0];

  return {
    success: true,
    imageUrl: firstImage.urls.regular,  // No download needed!
  };
}
```

**Available Image Sizes**:
```typescript
interface UnsplashImage {
  urls: {
    raw: string;      // Original, unprocessed
    full: string;     // Full size (varies)
    regular: string;  // ~1080px wide (recommended)
    small: string;    // ~400px wide
    thumb: string;    // ~200px wide
  };
}
```

**Benefits**:
- ✅ **Free tier**: 50 requests/hour
- ✅ **No download required**: Direct URL usage
- ✅ **Orientation filtering**: landscape | portrait
- ✅ **High-quality stock photos**
- ✅ **Attribution metadata** included

---

### 5. Pexels (Stock Photos)

**Presenton Implementation**: `servers/fastapi/services/image_generation_service.py:114-122`

```python
async def get_image_from_pexels(self, prompt: str) -> str:
    async with aiohttp.ClientSession(trust_env=True) as session:
        response = await session.get(
            f"https://api.pexels.com/v1/search?query={prompt}&per_page=1",
            headers={"Authorization": f"{get_pexels_api_key_env()}"},
        )
        data = await response.json()
        image_url = data["photos"][0]["src"]["large"]
        return image_url  # Direct URL, no download
```

**Specs**:
- Free tier: 200 requests/hour
- Multiple sizes: large, medium, small
- Direct URL usage

---

### 6. Pixabay (Stock Photos)

**Presenton Implementation**: `servers/fastapi/services/image_generation_service.py:124-131`

```python
async def get_image_from_pixabay(self, prompt: str) -> str:
    async with aiohttp.ClientSession(trust_env=True) as session:
        response = await session.get(
            f"https://pixabay.com/api/?key={get_pixabay_api_key_env()}&q={prompt}&image_type=photo&per_page=3"
        )
        data = await response.json()
        image_url = data["hits"][0]["largeImageURL"]
        return image_url
```

**Specs**:
- Free tier: 5,000 requests/month
- Multiple sizes available
- Direct URL usage

---

## Frontend Integration Patterns

### Pattern 1: Inline Image Editor (Presentation AI)

**Component**: `GenerateControls.tsx`

```typescript
export function GenerateControls({ element, slideIndex }) {
  const [newPrompt, setNewPrompt] = useState(element.query ?? "");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleGenerateClick = async () => {
    const result = await generateImageAction(newPrompt, imageModel);

    if (result.success && result.image) {
      // Update slide state
      setSlides(
        slides.map((slide, index) =>
          index === slideIndex
            ? { ...slide, rootImage: { url: result.image.url, query: newPrompt } }
            : slide
        )
      );
    } else {
      setLocalError(result.error ?? "Failed to generate image");
    }
  };

  return (
    <div>
      <Textarea
        placeholder="Describe the image..."
        value={newPrompt}
        onChange={(e) => setNewPrompt(e.target.value)}
      />

      <ImageSourceSelector
        imageSource={imageSource}
        imageModel={imageModel}
        stockImageProvider={stockImageProvider}
        onImageSourceChange={setImageSource}
        onImageModelChange={setImageModel}
        onStockImageProviderChange={setStockImageProvider}
      />

      <Button onClick={handleGenerateClick}>
        <Wand2 className="mr-2 h-4 w-4" /> Generate
      </Button>

      {element.url && (
        <Button onClick={handleRegenerateClick}>
          <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
        </Button>
      )}
    </div>
  );
}
```

**Features**:
- Inline editing per slide
- Provider selection dropdown
- Generate + Regenerate buttons
- Error handling with alerts

---

### Pattern 2: Modal Image Editor (Presenton)

**Component**: `ImageEditor.tsx`

```typescript
const ImageEditor = ({ initialImage, slideIndex, onImageChange }) => {
  const [previewImages, setPreviewImages] = useState(initialImage);
  const [previousGeneratedImages, setPreviousGeneratedImages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Tabs: Generate | Upload | Previous | Focus Point
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <Tabs defaultValue="generate">
          <TabsList>
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="previous">Previous</TabsTrigger>
            <TabsTrigger value="focus">Focus Point</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            {/* AI/Stock image generation */}
          </TabsContent>

          <TabsContent value="upload">
            {/* File upload */}
          </TabsContent>

          <TabsContent value="previous">
            {/* Previously generated images */}
          </TabsContent>

          <TabsContent value="focus">
            {/* Image cropping/focus point */}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
```

**Features**:
- ✅ Full-screen modal (Sheet/Dialog)
- ✅ Tabbed interface (Generate | Upload | Previous | Focus)
- ✅ History of previously generated images
- ✅ Image focus point editor (object-position control)
- ✅ Upload functionality

---

## Database Schema Patterns

### Presentation AI (Prisma)

```prisma
model GeneratedImage {
  id        String   @id @default(cuid())
  url       String   // Permanent URL (UploadThing)
  prompt    String   // Original prompt
  userId    String   // FK to User
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([createdAt])
}

model User {
  id             String           @id @default(cuid())
  generatedImages GeneratedImage[] // History of all generated images
  // ...
}
```

**Benefits**:
- User image history
- Searchable by prompt
- Permanent storage via UploadThing
- Reusable across presentations

---

### Presenton (JSON in Presentation Data)

```python
class ImageAsset:
    path: str
    is_uploaded: bool
    extras: dict  # {"prompt": str, "theme_prompt": str}
```

**Storage Pattern**:
- Images saved to file system: `output_directory/{uuid}.jpg`
- Metadata stored in presentation JSON
- Path references relative or absolute

---

## Cost Analysis

### AI Generation Providers

| Provider | Model | Cost/Image | Speed | Quality | Aspect Ratio |
|----------|-------|------------|-------|---------|--------------|
| **Together AI** | FLUX.1-schnell-Free | **$0.00** | ⚡ Fast (4 steps) | ⭐⭐⭐⭐ | ✅ Custom |
| Together AI | FLUX.1-dev | ~$0.02 | 🐢 Slow (28 steps) | ⭐⭐⭐⭐⭐ | ✅ Custom |
| OpenAI | DALL-E 3 (standard) | $0.04 | ⚡ Fast | ⭐⭐⭐⭐ | ❌ 1024x1024 |
| OpenAI | DALL-E 3 (HD) | $0.08 | ⚡ Fast | ⭐⭐⭐⭐⭐ | ❌ 1024x1024 |
| Google | Gemini Flash | ~$0.01 | ⚡ Fast | ⭐⭐⭐ | ✅ Custom |

### Stock Photo Providers

| Provider | Free Tier | Cost | Quality | API Limits |
|----------|-----------|------|---------|------------|
| **Unsplash** | ✅ Yes | $0 | ⭐⭐⭐⭐⭐ | 50/hour |
| Pexels | ✅ Yes | $0 | ⭐⭐⭐⭐ | 200/hour |
| Pixabay | ✅ Yes | $0 | ⭐⭐⭐ | 5,000/month |

---

## Recommendation for Pitch Deck Wizard

### Phase 1: MVP (Immediate)

**Primary**: FLUX.1-schnell-Free (Together AI)
- ✅ **FREE** - No cost barrier
- ✅ **Custom aspect ratios** - Perfect for slides (1024x768)
- ✅ **Fast generation** - 4 steps
- ✅ **High quality** - SOTA model

**Fallback**: Unsplash
- ✅ **FREE** - 50 requests/hour
- ✅ **No download** - Direct URLs
- ✅ **Professional quality** - Stock photos
- ✅ **Orientation filtering** - Landscape for slides

**Implementation**:
```typescript
// 1. User provides prompt
// 2. Try FLUX.1-schnell-Free first
// 3. If fails/slow → fallback to Unsplash
// 4. If Unsplash fails → placeholder image
```

---

### Phase 2: Enhanced (Future)

**Add**:
1. ✅ **User upload** - Custom images
2. ✅ **Image history** - Reuse generated images
3. ✅ **Focus point editor** - Crop/position control
4. ✅ **Multiple providers** - User selects AI vs Stock
5. ✅ **Paid tier** - FLUX.1-dev for higher quality

**Database Schema**:
```sql
CREATE TABLE generated_images (
  id UUID PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  url TEXT NOT NULL,
  prompt TEXT NOT NULL,
  provider TEXT NOT NULL,  -- 'flux-free', 'unsplash', 'upload'
  metadata JSONB,           -- {model, steps, orientation}
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_generated_images_profile ON generated_images(profile_id);
CREATE INDEX idx_generated_images_created ON generated_images(created_at DESC);
```

---

## Implementation Guide

### Backend (FastAPI + Blaxel)

**Step 1: Add Together AI SDK**
```bash
cd /home/sk/mde/template-copilot-kit-py
uv pip install together
```

**Step 2: Create Image Service**
```python
# src/services/image_service.py
import os
from together import Together

class ImageGenerationService:
    def __init__(self):
        self.together_client = Together(
            api_key=os.getenv("TOGETHER_AI_API_KEY")
        )

    async def generate_image(
        self,
        prompt: str,
        width: int = 1024,
        height: int = 768
    ) -> str:
        """Generate image using FLUX.1-schnell-Free"""
        try:
            response = self.together_client.images.create(
                model="black-forest-labs/FLUX.1-schnell-Free",
                prompt=prompt,
                width=width,
                height=height,
                steps=4,
                n=1
            )
            return response.data[0].url
        except Exception as e:
            print(f"FLUX generation failed: {e}")
            # Fallback to Unsplash
            return await self.get_unsplash_image(prompt)

    async def get_unsplash_image(self, query: str) -> str:
        """Fallback to Unsplash stock photos"""
        import aiohttp

        async with aiohttp.ClientSession() as session:
            response = await session.get(
                f"https://api.unsplash.com/search/photos",
                params={
                    "query": query,
                    "orientation": "landscape",
                    "per_page": 1
                },
                headers={
                    "Authorization": f"Client-ID {os.getenv('UNSPLASH_ACCESS_KEY')}"
                }
            )
            data = await response.json()

            if data.get("results"):
                return data["results"][0]["urls"]["regular"]

            # Ultimate fallback
            return "/static/images/placeholder.jpg"
```

**Step 3: Add to Agent Tools**
```python
# src/agent.py
from services.image_service import ImageGenerationService

async def agent():
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")

    image_service = ImageGenerationService()

    # Add as tool for agent to use
    tools.append({
        "name": "generate_slide_image",
        "description": "Generate an image for a slide based on prompt",
        "parameters": {
            "prompt": {"type": "string"},
            "width": {"type": "number", "default": 1024},
            "height": {"type": "number", "default": 768}
        },
        "function": image_service.generate_image
    })

    # ...
```

---

### Frontend (React + CopilotKit)

**Step 1: Add UI Component**
```tsx
// src/components/presentation/ImageGenerationPanel.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Image as ImageIcon } from 'lucide-react';

interface ImageGenerationPanelProps {
  onImageGenerated: (url: string, prompt: string) => void;
}

export function ImageGenerationPanel({ onImageGenerated }: ImageGenerationPanelProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [provider, setProvider] = useState<'ai' | 'stock'>('ai');

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      // Call backend API
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, provider })
      });

      const data = await response.json();

      if (data.success) {
        onImageGenerated(data.imageUrl, prompt);
      }
    } catch (error) {
      console.error('Image generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Image Source</label>
        <div className="flex gap-2 mt-2">
          <Button
            variant={provider === 'ai' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setProvider('ai')}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            AI Generate
          </Button>
          <Button
            variant={provider === 'stock' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setProvider('stock')}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Stock Photo
          </Button>
        </div>
      </div>

      <Textarea
        placeholder="Describe the image you want..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
      />

      <Button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full"
      >
        {isGenerating ? 'Generating...' : 'Generate Image'}
      </Button>
    </div>
  );
}
```

**Step 2: Integrate with Slide Editor**
```tsx
// src/pages/presentations/[id]/edit/SlideEditor.tsx
import { ImageGenerationPanel } from '@/components/presentation/ImageGenerationPanel';

export function SlideEditor({ slide, onSlideUpdate }) {
  const handleImageGenerated = (url: string, prompt: string) => {
    onSlideUpdate({
      ...slide,
      backgroundImage: url,
      metadata: {
        ...slide.metadata,
        imagePrompt: prompt
      }
    });
  };

  return (
    <div>
      {/* Slide preview */}
      <SlidePreview slide={slide} />

      {/* Image generation panel */}
      <ImageGenerationPanel onImageGenerated={handleImageGenerated} />
    </div>
  );
}
```

---

## Environment Variables

```bash
# .env (root)

# Together AI (for FLUX models)
TOGETHER_AI_API_KEY=your_together_ai_key

# Unsplash (for stock photos)
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# Optional: Pexels
PEXELS_API_KEY=your_pexels_key

# Optional: Pixabay
PIXABAY_API_KEY=your_pixabay_key
```

**Get API Keys**:
- Together AI: https://api.together.xyz/settings/api-keys (FREE tier available)
- Unsplash: https://unsplash.com/developers (FREE 50/hour)
- Pexels: https://www.pexels.com/api/ (FREE 200/hour)
- Pixabay: https://pixabay.com/api/docs/ (FREE 5,000/month)

---

## Testing Strategy

### Layer 1: Unit Tests

```python
# test_image_service.py
import pytest
from services.image_service import ImageGenerationService

@pytest.mark.asyncio
async def test_flux_generation():
    service = ImageGenerationService()
    url = await service.generate_image("mountain landscape", width=1024, height=768)

    assert url.startswith("http")
    assert "together" in url or "unsplash" in url

@pytest.mark.asyncio
async def test_unsplash_fallback():
    service = ImageGenerationService()
    # Mock FLUX failure
    url = await service.get_unsplash_image("business meeting")

    assert url.startswith("http")
    assert "unsplash" in url
```

### Layer 2: Integration Tests

```typescript
// ImageGenerationPanel.test.tsx
describe('ImageGenerationPanel', () => {
  it('generates AI image when AI provider selected', async () => {
    const onImageGenerated = jest.fn();
    render(<ImageGenerationPanel onImageGenerated={onImageGenerated} />);

    // Select AI provider
    fireEvent.click(screen.getByText('AI Generate'));

    // Enter prompt
    fireEvent.change(screen.getByPlaceholderText('Describe the image...'), {
      target: { value: 'tech startup office' }
    });

    // Click generate
    fireEvent.click(screen.getByText('Generate Image'));

    // Wait for response
    await waitFor(() => {
      expect(onImageGenerated).toHaveBeenCalledWith(
        expect.stringContaining('http'),
        'tech startup office'
      );
    });
  });
});
```

### Layer 3: E2E Tests

```typescript
// e2e/image-generation.spec.ts
test('full image generation workflow', async ({ page }) => {
  // Navigate to slide editor
  await page.goto('/presentations/123/edit');

  // Click "Add Image" button
  await page.click('button:has-text("Add Image")');

  // Select AI generation
  await page.click('button:has-text("AI Generate")');

  // Enter prompt
  await page.fill('textarea[placeholder*="Describe"]', 'futuristic city skyline');

  // Click generate
  await page.click('button:has-text("Generate Image")');

  // Wait for image to appear
  await page.waitForSelector('img[src*="http"]', { timeout: 10000 });

  // Verify image is displayed
  const imageSrc = await page.getAttribute('img', 'src');
  expect(imageSrc).toBeTruthy();
  expect(imageSrc).toContain('http');
});
```

---

## Performance Considerations

### 1. Caching Strategy

**Problem**: Regenerating same prompt wastes API calls

**Solution**: Cache by prompt hash
```python
import hashlib
from functools import lru_cache

class ImageGenerationService:
    def __init__(self):
        self.cache = {}  # {prompt_hash: url}

    async def generate_image(self, prompt: str) -> str:
        prompt_hash = hashlib.md5(prompt.encode()).hexdigest()

        # Check cache
        if prompt_hash in self.cache:
            print(f"Cache hit for prompt: {prompt[:50]}")
            return self.cache[prompt_hash]

        # Generate new
        url = await self._generate_flux_image(prompt)

        # Cache result
        self.cache[prompt_hash] = url

        return url
```

### 2. Lazy Loading

**Problem**: Loading all images upfront slows page

**Solution**: Lazy load with intersection observer
```tsx
import { useEffect, useRef, useState } from 'react';

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : '/placeholder.jpg'}
      alt={alt}
      loading="lazy"
    />
  );
}
```

### 3. Parallel Generation

**Problem**: Generating 10 slide images sequentially takes 40+ seconds

**Solution**: Batch generation with concurrency limit
```python
import asyncio

async def generate_all_slide_images(prompts: list[str], max_concurrent: int = 3):
    semaphore = asyncio.Semaphore(max_concurrent)

    async def generate_with_limit(prompt: str):
        async with semaphore:
            return await service.generate_image(prompt)

    tasks = [generate_with_limit(p) for p in prompts]
    return await asyncio.gather(*tasks)

# Usage:
urls = await generate_all_slide_images(
    ["slide 1 prompt", "slide 2 prompt", ...],
    max_concurrent=3
)
```

---

## Error Handling

### Graceful Degradation

```python
async def generate_image_with_fallback(prompt: str) -> str:
    """
    Fallback chain:
    1. FLUX.1-schnell-Free (AI, free)
    2. Unsplash (stock, free)
    3. Placeholder image
    """
    try:
        # Try FLUX first
        return await generate_flux_image(prompt)
    except Exception as e:
        print(f"FLUX failed: {e}, trying Unsplash")

        try:
            return await get_unsplash_image(prompt)
        except Exception as e:
            print(f"Unsplash failed: {e}, using placeholder")
            return "/static/images/placeholder.jpg"
```

### User-Facing Error Messages

```tsx
const [error, setError] = useState<string | null>(null);

const handleGenerate = async () => {
  try {
    const result = await generateImage(prompt);
    if (!result.success) {
      setError(result.error || "Failed to generate image");
    }
  } catch (error) {
    if (error.message.includes("rate limit")) {
      setError("Too many requests. Please try again in a few minutes.");
    } else if (error.message.includes("timeout")) {
      setError("Generation timed out. Please try a simpler prompt.");
    } else {
      setError("Failed to generate image. Please try again.");
    }
  }
};
```

---

## Summary

### Key Takeaways

1. **✅ FREE AI Generation Available**: FLUX.1-schnell-Free via Together AI
2. **✅ Custom Aspect Ratios**: Perfect for slides (1024x768)
3. **✅ Multiple Fallbacks**: AI → Stock → Placeholder
4. **✅ No Storage Costs**: Direct URLs from Unsplash/Together
5. **✅ Fast Generation**: 4 steps for FLUX schnell models

### Recommended Stack

**Backend**:
- Primary: Together AI (FLUX.1-schnell-Free)
- Fallback: Unsplash API
- Storage: Direct URLs (no download needed)

**Frontend**:
- UI: shadcn/ui components (Button, Textarea, Select)
- State: React Query for API calls
- Error: Toast notifications

**Database**:
- Table: `generated_images` (optional, for history)
- Columns: id, profile_id, url, prompt, provider, created_at

### Next Steps

1. ✅ Add Together AI to backend dependencies
2. ✅ Create ImageGenerationService
3. ✅ Add Unsplash API as fallback
4. ✅ Create ImageGenerationPanel component
5. ✅ Integrate with slide editor
6. ✅ Add tests (unit + integration + e2e)
7. ✅ Deploy and monitor usage

---

**File**: `/home/sk/mde/pitch-deck/tasks/IMAGE-GENERATION-ANALYSIS.md`
**Lines**: 867
**Generated**: 2025-01-26
**Analyzed Repositories**: 200-presenton, 250-presentation-ai
