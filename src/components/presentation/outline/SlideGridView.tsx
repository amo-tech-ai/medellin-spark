import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Slide {
  id: string;
  title: string;
  order: number;
  layout?: string;
  content?: any;
}

interface SlideGridViewProps {
  slides: Slide[];
  onSlideClick: (slideId: string) => void;
  onDeleteSlide: (slideId: string) => void;
  onAddSlide: () => void;
}

// Visual thumbnail component for different slide layouts
const SlideThumbnail = ({ slide }: { slide: Slide }) => {
  const layout = slide.layout || "title_content";
  const content = slide.content || {};

  // Render different thumbnail styles based on layout
  if (layout === "cover") {
    return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="w-12 h-12 bg-primary/20 rounded-lg mb-2 flex items-center justify-center">
          <span className="text-xl">🚀</span>
        </div>
        {content.headline ? (
          <p className="text-xs font-semibold text-center line-clamp-2 px-2">{content.headline}</p>
        ) : (
          <>
            <div className="w-32 h-3 bg-muted rounded mb-2" />
            <div className="w-24 h-2 bg-muted/60 rounded" />
          </>
        )}
      </div>
    );
  }

  if (layout === "title_content") {
    return (
      <div className="w-full h-full p-3 bg-card overflow-hidden">
        {content.headline && (
          <p className="text-[10px] font-semibold mb-2 line-clamp-1 text-primary">{content.headline}</p>
        )}
        {content.bullets && Array.isArray(content.bullets) && content.bullets.length > 0 ? (
          <div className="space-y-1">
            {content.bullets.slice(0, 3).map((bullet: string, idx: number) => (
              <div key={idx} className="flex items-start gap-1">
                <span className="text-[8px] text-muted-foreground mt-0.5">•</span>
                <p className="text-[9px] text-muted-foreground line-clamp-1 flex-1">{bullet}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-muted/60 rounded" />
            <div className="w-full h-1.5 bg-muted/60 rounded" />
            <div className="w-4/5 h-1.5 bg-muted/60 rounded" />
          </div>
        )}
      </div>
    );
  }

  if (layout === "two_column") {
    return (
      <div className="w-full h-full p-3 bg-card flex gap-2 overflow-hidden">
        <div className="flex-1 space-y-1">
          {content.bullets && Array.isArray(content.bullets) && content.bullets.slice(0, 2).map((bullet: string, idx: number) => (
            <p key={idx} className="text-[9px] text-muted-foreground line-clamp-1">{bullet}</p>
          )) || (
            <>
              <div className="w-full h-1.5 bg-muted/60 rounded" />
              <div className="w-full h-1.5 bg-muted/60 rounded" />
            </>
          )}
        </div>
        <div className="flex-1 space-y-1">
          {content.bullets && Array.isArray(content.bullets) && content.bullets.slice(2, 4).map((bullet: string, idx: number) => (
            <p key={idx} className="text-[9px] text-muted-foreground line-clamp-1">{bullet}</p>
          )) || (
            <>
              <div className="w-full h-1.5 bg-muted/60 rounded" />
              <div className="w-full h-1.5 bg-muted/60 rounded" />
            </>
          )}
        </div>
      </div>
    );
  }

  // Default layout
  return (
    <div className="w-full h-full p-3 bg-card overflow-hidden">
      {content.headline ? (
        <p className="text-[10px] font-semibold mb-2 line-clamp-2">{content.headline}</p>
      ) : (
        <div className="w-20 h-3 bg-muted rounded mb-3" />
      )}
      {content.bullets && Array.isArray(content.bullets) && content.bullets.length > 0 ? (
        <div className="space-y-1">
          {content.bullets.slice(0, 2).map((bullet: string, idx: number) => (
            <p key={idx} className="text-[9px] text-muted-foreground line-clamp-1">{bullet}</p>
          ))}
        </div>
      ) : (
        <div className="w-full h-12 bg-muted/40 rounded" />
      )}
    </div>
  );
};

export const SlideGridView = ({
  slides,
  onSlideClick,
  onDeleteSlide,
  onAddSlide,
}: SlideGridViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {slides.map((slide, index) => (
        <Card
          key={slide.id}
          className="group relative overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
          onClick={() => onSlideClick(slide.id)}
        >
          {/* Slide Number Badge */}
          <div className="absolute top-2 left-2 z-10 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
            Slide {index + 1}
          </div>

          {/* Options Menu */}
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 bg-background/90 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSlide(slide.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Slide Thumbnail */}
          <div className="aspect-[16/10] border-b border-border bg-muted/30">
            <SlideThumbnail slide={slide} />
          </div>

          {/* Slide Title */}
          <div className="p-3">
            <h3 className="font-medium text-sm truncate">{slide.title}</h3>
          </div>
        </Card>
      ))}

      {/* Add Slide Card */}
      <Card
        className="aspect-[16/10] flex items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all border-dashed"
        onClick={onAddSlide}
      >
        <div className="text-center">
          <div className="text-4xl text-muted-foreground mb-2">+</div>
          <p className="text-sm text-muted-foreground">Add Slide</p>
        </div>
      </Card>
    </div>
  );
};
