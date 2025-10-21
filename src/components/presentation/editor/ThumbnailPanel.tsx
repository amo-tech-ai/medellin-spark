import { ScrollArea } from "@/components/ui/scroll-area";

interface ThumbnailPanelProps {
  slides: Array<{ id: string; title: string; content: string }>;
  currentSlideIndex: number;
  onSlideClick: (index: number) => void;
}

export const ThumbnailPanel = ({ slides, currentSlideIndex, onSlideClick }: ThumbnailPanelProps) => {
  return (
    <div className="hidden md:block w-64 border-r border-border bg-card">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Slides</h2>
      </div>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-3 space-y-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => onSlideClick(index)}
              className={`w-full text-left rounded-lg border-2 transition-all ${
                index === currentSlideIndex
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-background"
              }`}
            >
              <div className="aspect-video bg-muted flex items-center justify-center rounded-t-md">
                <span className="text-4xl font-bold text-muted-foreground/30">
                  {index + 1}
                </span>
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-foreground truncate">
                  {slide.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
