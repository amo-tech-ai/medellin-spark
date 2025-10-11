import { Calendar, Briefcase, Gift, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Sarah! 👋
          </h1>
          <p className="text-muted-foreground">
            Your startup journey is 75% complete
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Events Registered"
            value={12}
            icon={Calendar}
            trend={{ value: "+3 this month", positive: true }}
          />
          <MetricCard
            title="Job Applications"
            value={5}
            icon={Briefcase}
            trend={{ value: "2 pending review" }}
          />
          <MetricCard
            title="Perks Claimed"
            value={8}
            icon={Gift}
            description="$12K total value"
          />
          <MetricCard
            title="Profile Views"
            value={47}
            icon={TrendingUp}
            trend={{ value: "+12 this week", positive: true }}
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚡ Quick Actions
            </CardTitle>
            <CardDescription>
              Shortcuts to common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" className="justify-start">
                📊 Generate Pitch Deck
              </Button>
              <Button variant="outline" className="justify-start">
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
              <Button variant="outline" className="justify-start">
                🔗 Share Your Story
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>📅 Upcoming Events</CardTitle>
              <CardDescription>Events you're registered for</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All →
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">AI Pitch Workshop</h4>
                    <p className="text-sm text-muted-foreground">
                      May 15, 2025 • 6:00 PM • Ruta N
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Matches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>💼 Recommended Jobs</CardTitle>
              <CardDescription>Based on your profile and skills</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All →
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Frontend Engineer - Remote",
                  company: "TechCorp Medellin",
                  salary: "$80K-$120K USD",
                  match: 95,
                },
                {
                  title: "Product Manager - Hybrid",
                  company: "StartupXYZ",
                  salary: "$60K-$90K USD",
                  match: 88,
                },
              ].map((job, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.company} • Full-time • {job.salary}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      {job.match}% Match
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Apply Now</Button>
                    <Button size="sm" variant="outline">
                      Save
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
