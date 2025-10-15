import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OutlineSlideRowProps {
  slide: {
    id: string;
    title: string;
    order: number;
  };
  index: number;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (slideId: string) => void;
}

export const OutlineSlideRow = ({ slide, index, onDelete }: OutlineSlideRowProps) => {
  return (
    <div className="group bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
            <GripVertical className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-3 flex-1">
            <span className="text-sm font-medium text-muted-foreground w-16">
              Slide {index + 1}
            </span>
            <input
              type="text"
              value={slide.title}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-medium"
              placeholder="Slide title..."
            />
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onDelete(slide.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
};
