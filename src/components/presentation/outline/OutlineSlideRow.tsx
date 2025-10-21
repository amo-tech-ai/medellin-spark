import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface OutlineSlideRowProps {
  slide: {
    id: string;
    title: string;
    order: number;
  };
  index: number;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (slideId: string) => void;
  onUpdateTitle?: (slideId: string, newTitle: string) => void;
}

export const OutlineSlideRow = ({ slide, index, onDelete, onUpdateTitle }: OutlineSlideRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slide.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdateTitle) {
      onUpdateTitle(slide.id, e.target.value);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
          >
            <GripVertical className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 flex-1">
            <span className="text-sm font-medium text-muted-foreground w-16">
              Slide {index + 1}
            </span>
            <input
              type="text"
              value={slide.title}
              onChange={handleTitleChange}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-medium focus:ring-0"
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
