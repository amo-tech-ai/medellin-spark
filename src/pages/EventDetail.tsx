import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  MapPin,
  Users,
  Eye,
  Star,
  Share2,
  ChevronRight,
  Check,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EventDetail = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  // Mock data
  const event = {
    id: "1",
    title: "AI Startup Networking Night",
    category: "Networking",
    date: "February 15, 2025",
    day: "Thursday",
    time: "6:00 PM - 9:00 PM",
    venue: "WeWork Poblado",
    address: "Calle 7 #43A-99, El Poblado",
    city: "Medellín, Colombia",
    capacity: 50,
    registered: 32,
    views: 245,
    description: "Join us for an exciting evening of networking with Medellín's most innovative AI startup founders, investors, and tech enthusiasts. This event brings together the community to share ideas, find collaborators, and explore opportunities in the AI space.\n\nWhether you're a founder looking for your next co-founder, an investor seeking promising startups, or simply curious about AI, this event is for you. We'll have lightning talks from successful founders, plenty of networking time, and great food and drinks.",
    whatToExpect: [
      "Network with 50+ founders and investors",
      "Lightning talks from 3 startup founders",
      "Food and drinks provided",
      "Opportunity to pitch your startup (1-minute pitches)",
      "Meet potential co-founders and team members",
    ],
    schedule: [
      { time: "6:00 PM", activity: "Registration & Welcome Drinks" },
      { time: "6:30 PM", activity: "Opening Remarks" },
      { time: "7:00 PM", activity: "Lightning Talks" },
      { time: "8:00 PM", activity: "Networking Session" },
      { time: "9:00 PM", activity: "Closing" },
    ],
    organizer: {
      name: "Medellín Tech Community",
      bio: "Building Colombia's largest tech community with 5,000+ members across Medellín, Bogotá, and beyond.",
    },
  };

  const similarEvents = [
    {
      id: "2",
      title: "Product Management Workshop",
      date: "Feb 22, 2025",
      location: "Ruta N",
      registered: 18,
      capacity: 30,
      category: "Workshop",
    },
    {
      id: "3",
      title: "Startup Pitch Competition",
      date: "March 1, 2025",
      location: "Centro Comercial",
      registered: 45,
      capacity: 100,
      category: "Competition",
    },
    {
      id: "4",
      title: "Tech Talks: Machine Learning",
      date: "March 8, 2025",
      location: "Online",
      registered: 120,
      capacity: 200,
      category: "Talk",
    },
  ];

  const progressPercent = (event.registered / event.capacity) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-smooth">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link to="/events" className="hover:text-primary transition-smooth">
            Events
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground">{event.title}</span>
        </div>

        {/* Hero Banner */}
        <div className="relative h-[400px] rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/20 text-white border-white/30">
              {event.category}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Event Details Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date & Time */}
              <div className="flex gap-4">
                <Calendar className="text-primary flex-shrink-0" size={32} />
                <div>
                  <p className="font-semibold">{event.date}</p>
                  <p className="text-sm text-muted-foreground">{event.day}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <MapPin className="text-primary flex-shrink-0" size={32} />
                <div>
                  <p className="font-semibold">{event.venue}</p>
                  <p className="text-sm text-muted-foreground">{event.address}</p>
                  <p className="text-sm text-muted-foreground">{event.city}</p>
                </div>
              </div>

              {/* Capacity */}
              <div className="flex gap-4">
                <Users className="text-primary flex-shrink-0" size={32} />
                <div className="w-full">
                  <p className="font-semibold mb-2">
                    {event.registered} of {event.capacity} spots filled
                  </p>
                  <Progress value={progressPercent} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {event.capacity - event.registered} spots left
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About This Event */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </section>

            {/* What to Expect */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
              <ul className="space-y-2">
                {event.whatToExpect.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="text-green-600 mt-1 flex-shrink-0" size={18} />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Schedule */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Event Schedule</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="font-mono text-sm text-primary min-w-[80px]">
                      {item.time}
                    </span>
                    <span className="text-muted-foreground">{item.activity}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Organizer Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-secondary mb-4">
                  <Users className="text-primary" size={32} />
                </div>
                <h3 className="font-semibold text-center">
                  {event.organizer.name}
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  {event.organizer.bio}
                </p>
                <Button variant="outline" className="w-full">
                  View Organizer
                </Button>
              </CardContent>
            </Card>

            <Separator />

            {/* Event Stats */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users size={16} />
                {event.registered} registered
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} />
                {event.views} views
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-500" />
                Trending event
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                size="lg"
                className="w-full"
                disabled={isRegistered}
                onClick={() => setIsRegistered(true)}
              >
                {isRegistered ? "Registered ✓" : "Register Now"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2"
                onClick={() =>
                  toast({
                    title: "Added to calendar",
                    description: "Event has been added to your calendar.",
                  })
                }
              >
                <Calendar size={18} />
                Add to Calendar
              </Button>
              <Button variant="outline" size="lg" className="w-full gap-2">
                <Share2 size={18} />
                Share Event
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Events Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            More Events You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarEvents.map((similarEvent) => (
              <Card
                key={similarEvent.id}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 rounded-t-lg" />
                <CardHeader>
                  <h3 className="font-semibold">{similarEvent.title}</h3>
                  <Badge className="w-fit">{similarEvent.category}</Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    {similarEvent.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    {similarEvent.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={14} />
                    {similarEvent.registered}/{similarEvent.capacity} registered
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetail;
