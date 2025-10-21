import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  type?: "cards" | "list" | "table" | "full";
  count?: number;
  message?: string;
}

/**
 * Reusable loading state component for dashboard
 *
 * @param type - Layout type: cards, list, table, or full page
 * @param count - Number of skeleton items to show (for cards/list)
 * @param message - Optional loading message
 */
export function LoadingState({
  type = "full",
  count = 4,
  message = "Loading..."
}: LoadingStateProps) {
  // Full page loading spinner
  if (type === "full") {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    );
  }

  // Skeleton cards (for metric cards, event cards, etc.)
  if (type === "cards") {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-10 w-10 rounded-lg bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="h-8 w-16 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Skeleton list items
  if (type === "list") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-5 w-3/4 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-muted rounded-full" />
                  <div className="h-6 w-20 bg-muted rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Skeleton table
  if (type === "table") {
    return (
      <div className="rounded-md border">
        <div className="p-4 space-y-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/4 bg-muted rounded" />
                <div className="h-3 w-1/3 bg-muted rounded" />
              </div>
              <div className="h-8 w-20 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
