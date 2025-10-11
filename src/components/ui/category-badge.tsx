import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  label: string;
  variant?: "default" | "featured" | "upcoming" | "success" | "warning";
  className?: string;
}

export const CategoryBadge = ({ label, variant = "default", className }: CategoryBadgeProps) => {
  const variants = {
    default: "bg-muted text-muted-foreground",
    featured: "bg-primary/10 text-primary",
    upcoming: "bg-accent text-accent-foreground",
    success: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100",
    warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap",
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
};
