import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  containerClassName?: string;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, containerClassName, onClear, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div
        className={cn(
          "relative flex items-center transition-smooth",
          isFocused && "ring-2 ring-primary/20",
          containerClassName
        )}
      >
        <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          ref={ref}
          value={value}
          className={cn(
            "h-12 w-full pl-12 pr-12 rounded-lg border border-input bg-background text-foreground",
            "transition-smooth focus:outline-none focus:border-primary",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }
);
SearchBar.displayName = "SearchBar";
