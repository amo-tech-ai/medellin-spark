import { Calendar, MapPin, Users, CalendarX } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LoadingState } from "@/components/dashboard/LoadingState";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMyEvents, useCancelEventRegistration } from "@/hooks/useEvents";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function DashboardEvents() {
  const { data: myEvents, isLoading, error } = useMyEvents();
  const cancelRegistration = useCancelEventRegistration();
  const { toast } = useToast();

  const handleCancelRegistration = async (eventId: string) => {
    try {
      await cancelRegistration.mutateAsync(eventId);
      toast({
        title: "Registration cancelled",
        description: "Your event registration has been cancelled successfully.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to cancel registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Split events into upcoming and past based on event_date
  const now = new Date();
  const upcomingEvents = myEvents?.filter(
    (reg) => new Date(reg.events.event_date) >= now
  ) ?? [];
  const pastEvents = myEvents?.filter(
    (reg) => new Date(reg.events.event_date) < now
  ) ?? [];

  // Show loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Events</h1>
            <p className="text-muted-foreground">Loading your events...</p>
          </div>
          <LoadingState type="list" count={3} />
        </div>
      </DashboardLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardLayout>
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load events. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Events</h1>
            <p className="text-muted-foreground">
              Manage your event registrations
            </p>
          </div>
          <Button>Browse All Events</Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <EmptyState
                icon={CalendarX}
                title="No upcoming events"
                description="You haven't registered for any upcoming events yet. Browse events to find opportunities to connect and learn."
                action={{
                  label: "Browse Events",
                  onClick: () => {},
                  icon: Calendar,
                }}
              />
            ) : (
              upcomingEvents.map((registration) => (
                <Card key={registration.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{registration.events.title}</CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(registration.events.event_date), "MMM dd, yyyy")}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancelRegistration(registration.event_id)}
                        disabled={cancelRegistration.isPending}
                      >
                        Cancel Registration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastEvents.length === 0 ? (
              <EmptyState
                icon={CalendarX}
                title="No past events"
                description="You haven't attended any events yet."
                variant="compact"
              />
            ) : (
              pastEvents.map((registration) => (
                <Card key={registration.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{registration.events.title}</CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(registration.events.event_date), "MMM dd, yyyy")}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {registration.events.is_virtual ? "Virtual" : "In-person"}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        {registration.status === "attended" ? "Attended" : "Registered"}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
