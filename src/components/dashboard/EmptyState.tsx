import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  variant?: "default" | "compact";
}

/**
 * Reusable empty state component for dashboard
 *
 * @param icon - Icon to display
 * @param title - Title text
 * @param description - Description text
 * @param action - Optional action button
 * @param variant - Display variant (default or compact)
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = "default",
}: EmptyStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.icon && <action.icon className="h-4 w-4 mr-2" />}
          {action.label}
        </Button>
      )}
    </div>
  );

  if (variant === "compact") {
    return <div className="py-8">{content}</div>;
  }

  return (
    <Card>
      <CardContent className="py-12">{content}</CardContent>
    </Card>
  );
}
