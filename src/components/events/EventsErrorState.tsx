import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventsErrorStateProps {
  onRetry: () => void;
}

export function EventsErrorState({ onRetry }: EventsErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-6 mb-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">Failed to Load Events</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        We couldn't load the events. Please check your connection and try again.
      </p>
      <Button onClick={onRetry} size="lg">
        Try Again
      </Button>
    </div>
  );
}
