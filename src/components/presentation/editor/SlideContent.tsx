import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SlideContentProps {
  slide: {
    id: string;
    title: string;
    content: string;
  };
  onUpdate: (updates: Partial<{ title: string; content: string }>) => void;
}

export const SlideContent = ({ slide, onUpdate }: SlideContentProps) => {
  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-4xl mx-auto space-y-6">
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

        <div className="space-y-2">
          <Label htmlFor="slide-content">Content</Label>
          <Textarea
            id="slide-content"
            value={slide.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="min-h-[400px] text-lg resize-none"
            placeholder="Enter slide content..."
          />
        </div>

        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            💡 Tip: Keep your content concise and focused. Use bullet points for better readability.
          </p>
        </div>
      </div>
    </div>
  );
};
