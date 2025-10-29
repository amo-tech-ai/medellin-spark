import { Calendar } from "lucide-react";

export function EventsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-primary/10 p-6 mb-4">
        <Calendar className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">No Events Yet</h3>
      <p className="text-muted-foreground max-w-md">
        We're working on bringing exciting events to the community. Check back soon!
      </p>
    </div>
  );
}
