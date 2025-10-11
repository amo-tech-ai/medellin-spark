import { cn } from "@/lib/utils";

interface FilterButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const FilterButton = ({ label, isActive = false, onClick, icon }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-smooth whitespace-nowrap",
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  );
};

interface FilterGroupProps {
  filters: Array<{ label: string; value: string; icon?: React.ReactNode }>;
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

export const FilterGroup = ({ filters, activeFilter, onFilterChange }: FilterGroupProps) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {filters.map((filter) => (
        <FilterButton
          key={filter.value}
          label={filter.label}
          icon={filter.icon}
          isActive={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        />
      ))}
    </div>
  );
};
