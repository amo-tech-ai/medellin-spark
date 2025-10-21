import { Calendar, Briefcase, FileText, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { LoadingState } from "@/components/dashboard/LoadingState";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { useMyEvents } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: metrics, isLoading, error } = useDashboardMetrics();
  const { data: myEvents, isLoading: eventsLoading } = useMyEvents();

  // Show loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground">
              Loading your dashboard...
            </p>
          </div>
          <LoadingState type="cards" count={4} />
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
            Failed to load dashboard metrics. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            Track your progress and stay connected
          </p>
        </div>

        {/* Progress Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Your startup journey
                </p>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Next Step: Complete AI Analysis
                </p>
                <Button size="sm">Continue Wizard</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-4
          px-4 md:px-6
        ">
          <MetricCard
            title="Events Registered"
            value={metrics?.eventsRegistered ?? 0}
            icon={Calendar}
            description="Upcoming and attended events"
          />
          <MetricCard
            title="Job Applications"
            value={metrics?.jobsApplied ?? 0}
            icon={Briefcase}
            description="Track your applications"
          />
          <MetricCard
            title="Saved Opportunities"
            value={metrics?.savedJobs ?? 0}
            icon={TrendingUp}
            description="Jobs and perks saved"
          />
          <MetricCard
            title="Pitch Decks"
            value={metrics?.presentationsCount ?? 0}
            icon={FileText}
            description="AI-generated presentations"
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle asChild className="flex items-center gap-2">
              <h2>⚡ Quick Actions</h2>
            </CardTitle>
            <CardDescription>
              Shortcuts to common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => navigate('/pitch-deck-wizard')}
              >
                📊 Generate Pitch Deck
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => navigate('/dashboard/pitch-decks')}
              >
                📂 My Pitch Decks
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => navigate('/startup-profile')}
              >
                📝 Update Profile
              </Button>
              <Button variant="outline" className="justify-start">
                🎯 Find Mentors
              </Button>
              <Button variant="outline" className="justify-start">
                💬 Join Community Chat
              </Button>
              <Button variant="outline" className="justify-start">
                📅 Book Office Hours
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle asChild>
                <h2>📅 Upcoming Events</h2>
              </CardTitle>
              <CardDescription>Events you're registered for</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard/events')}
            >
              View All →
            </Button>
          </CardHeader>
          <CardContent>
            {eventsLoading ? (
              <LoadingState type="list" count={3} />
            ) : !myEvents || myEvents.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No upcoming events"
                description="Register for events to see them here"
                action={{
                  label: "Browse Events",
                  onClick: () => navigate('/events')
                }}
                variant="compact"
              />
            ) : (
              <div className="space-y-4">
                {myEvents.slice(0, 3).map((registration) => (
                  <div
                    key={registration.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:border-primary transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{registration.events?.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(registration.events?.event_date || '').toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                        {registration.events?.image_url && ` • Online Event`}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/events/${registration.events?.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Job Matches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle asChild>
                <h2>💼 Recommended Jobs</h2>
              </CardTitle>
              <CardDescription>Based on your profile and skills</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard/jobs')}
            >
              View All →
            </Button>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={Briefcase}
              title="Job recommendations coming soon"
              description="We're working on personalized job matching for you"
              action={{
                label: "Browse Jobs",
                onClick: () => navigate('/dashboard/jobs')
              }}
              variant="compact"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
