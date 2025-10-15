import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  open: boolean;
  onClose: () => void;
  selectedTheme: string;
  onSelectTheme: (theme: string) => void;
}

const themes = [
  { id: "waterfall", name: "Waterfall", colors: ["#E5F8F8", "#A8CAD6", "#D6DFE8"] },
  { id: "ocean", name: "Ocean", colors: ["#1e3a8a", "#3b82f6", "#93c5fd"] },
  { id: "sunset", name: "Sunset", colors: ["#dc2626", "#f97316", "#fbbf24"] },
  { id: "forest", name: "Forest", colors: ["#065f46", "#10b981", "#6ee7b7"] },
  { id: "minimal", name: "Minimal", colors: ["#f5f5f5", "#737373", "#171717"] },
  { id: "corporate", name: "Corporate", colors: ["#1e293b", "#475569", "#cbd5e1"] },
];

export const ThemeSelector = ({ open, onClose, selectedTheme, onSelectTheme }: ThemeSelectorProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choose a Theme</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`relative group rounded-lg border-2 p-4 transition-all hover:border-primary ${
                selectedTheme === theme.id ? "border-primary" : "border-border"
              }`}
            >
              <div className="flex gap-2 mb-3">
                {theme.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="h-12 flex-1 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <p className="text-sm font-medium text-foreground text-center">
                {theme.name}
              </p>
              
              {selectedTheme === theme.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>
            Apply Theme
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
