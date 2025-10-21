import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface SlideContent {
  headline?: string;
  bullets?: string[];
  notes?: string;
}

interface SlideContentProps {
  slide: {
    id: string;
    title: string;
    content: SlideContent | string;
  };
  onUpdate: (updates: Partial<{ title: string; content: SlideContent | string }>) => void;
}

export const SlideContent = ({ slide, onUpdate }: SlideContentProps) => {
  // Parse content - handle both old string format and new object format
  const content: SlideContent = typeof slide.content === 'string'
    ? { notes: slide.content }
    : (slide.content || {});

  const handleHeadlineChange = (headline: string) => {
    onUpdate({ content: { ...content, headline } });
  };

  const handleBulletChange = (index: number, value: string) => {
    const bullets = [...(content.bullets || [])];
    bullets[index] = value;
    onUpdate({ content: { ...content, bullets } });
  };

  const handleAddBullet = () => {
    const bullets = [...(content.bullets || []), ''];
    onUpdate({ content: { ...content, bullets } });
  };

  const handleRemoveBullet = (index: number) => {
    const bullets = (content.bullets || []).filter((_, i) => i !== index);
    onUpdate({ content: { ...content, bullets } });
  };

  const handleNotesChange = (notes: string) => {
    onUpdate({ content: { ...content, notes } });
  };

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Slide Title */}
        <div className="space-y-2">
          <Label htmlFor="slide-title">Slide Title</Label>
          <input
            id="slide-title"
            type="text"
            value={slide.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full text-3xl font-bold bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground focus:ring-0"
            placeholder="Enter slide title..."
          />
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <Label htmlFor="headline">Headline</Label>
          <Input
            id="headline"
            type="text"
            value={content.headline || ''}
            onChange={(e) => handleHeadlineChange(e.target.value)}
            className="text-lg font-semibold"
            placeholder="3-5 word headline..."
          />
          <p className="text-xs text-muted-foreground">
            A short, impactful headline for this slide
          </p>
        </div>

        {/* Bullet Points */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Bullet Points</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddBullet}
              className="h-8"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Bullet
            </Button>
          </div>

          {content.bullets && content.bullets.length > 0 ? (
            <div className="space-y-2">
              {content.bullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-3">•</span>
                  <Input
                    value={bullet}
                    onChange={(e) => handleBulletChange(index, e.target.value)}
                    placeholder={`Bullet point ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveBullet(index)}
                    className="h-10 w-10 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                No bullet points yet
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddBullet}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add First Bullet
              </Button>
            </div>
          )}
        </div>

        {/* Speaker Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Speaker Notes</Label>
          <Textarea
            id="notes"
            value={content.notes || ''}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="min-h-[150px] resize-none"
            placeholder="Add speaker notes for this slide..."
          />
          <p className="text-xs text-muted-foreground">
            Notes to help you present this slide effectively
          </p>
        </div>

        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            💡 Tip: Keep your content concise and focused. Use 3-5 bullet points maximum for better readability.
          </p>
        </div>
      </div>
    </div>
  );
};
