import { Calendar, MapPin, Users } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function DashboardEvents() {
  const events = [
    {
      title: "AI Pitch Workshop",
      date: "May 15, 2025",
      time: "6:00 PM",
      location: "Ruta N",
      attendees: 45,
      status: "upcoming",
      category: "Workshop",
    },
    {
      title: "Networking Mixer",
      date: "May 20, 2025",
      time: "7:00 PM",
      location: "Hub BoGo",
      attendees: 30,
      status: "upcoming",
      category: "Networking",
    },
    {
      title: "Investor Meetup",
      date: "Apr 15, 2025",
      time: "5:00 PM",
      location: "Virtual",
      attendees: 60,
      status: "past",
      category: "Pitch Night",
    },
  ];

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
            <TabsTrigger value="upcoming">Upcoming (2)</TabsTrigger>
            <TabsTrigger value="past">Past (1)</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {events
              .filter((e) => e.status === "upcoming")
              .map((event, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date} • {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.attendees} attending
                          </span>
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline">
                        Cancel Registration
                      </Button>
                      <Button size="sm" variant="outline">
                        Add to Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {events
              .filter((e) => e.status === "past")
              .map((event, i) => (
                <Card key={i} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date} • {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Attended</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
