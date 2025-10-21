import { useState } from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SLIDE_LAYOUTS, type LayoutType, type SlideLayout } from "@/types/layouts";

interface LayoutSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLayout?: LayoutType;
  onSelectLayout: (layoutId: LayoutType) => void;
}

export function LayoutSelector({
  open,
  onOpenChange,
  currentLayout,
  onSelectLayout,
}: LayoutSelectorProps) {
  const [selectedLayout, setSelectedLayout] = useState<LayoutType | undefined>(currentLayout);

  const handleLayoutClick = (layout: SlideLayout) => {
    setSelectedLayout(layout.id);
  };

  const handleApply = () => {
    if (selectedLayout) {
      onSelectLayout(selectedLayout);
      onOpenChange(false);
    }
  };

  const categoryColors = {
    basic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    content: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    visual: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    special: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Slide Layout</DialogTitle>
          <DialogDescription>
            Select a layout template for your slide
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {SLIDE_LAYOUTS.map((layout) => {
            const isSelected = selectedLayout === layout.id;
            const isCurrent = currentLayout === layout.id;

            return (
              <Card
                key={layout.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:ring-1 hover:ring-muted-foreground"
                }`}
                onClick={() => handleLayoutClick(layout)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{layout.thumbnail}</div>
                    {isSelected && (
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    {isCurrent && !isSelected && (
                      <Badge variant="outline" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1">{layout.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {layout.description}
                    </p>
                  </div>

                  <Badge
                    variant="secondary"
                    className={`text-xs ${categoryColors[layout.category]}`}
                  >
                    {layout.category}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={!selectedLayout}>
            Apply Layout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
