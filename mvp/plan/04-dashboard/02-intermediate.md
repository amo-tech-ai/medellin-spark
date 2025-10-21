# Dashboard - Intermediate Implementation

**Phase**: Core Pages
**Time**: 10-14 hours (Week 2)
**Priority**: 🔴 HIGH
**Difficulty**: Intermediate
**Prerequisites**: 01-core.md must be complete

---

## Overview

Build all core dashboard pages: Jobs, Events, Pitch Decks, and Settings. Connect each page to Supabase with real data, filtering, search, and CRUD operations.

**Outcome**: Complete dashboard with all major pages functional.

---

## Implementation Steps

### Step 1: Jobs Dashboard (4-5 hours)

**Create**: `src/pages/DashboardJobs.tsx`

```typescript
import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useJobs } from '@/hooks/useJobs';
import { JobCard } from '@/components/dashboard/JobCard';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase } from 'lucide-react';

export default function DashboardJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const { data: jobs, isLoading } = useJobs();

  // Filter logic
  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobType === 'all' || job.type === jobType;
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          <p className="text-muted-foreground">
            Discover and apply to jobs in the Medellin ecosystem
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search jobs or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-Time</SelectItem>
              <SelectItem value="part-time">Part-Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {isLoading ? (
              <LoadingState type="list" count={5} />
            ) : filteredJobs && filteredJobs.length > 0 ? (
              <div className="grid gap-4">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Briefcase}
                title="No jobs found"
                description="Try adjusting your search filters"
              />
            )}
          </TabsContent>

          <TabsContent value="recommended" className="mt-6">
            <EmptyState
              icon={Briefcase}
              title="Recommended jobs coming soon"
              description="We're working on personalized job recommendations"
            />
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <EmptyState
              icon={Briefcase}
              title="No applications yet"
              description="Start applying to jobs to see them here"
            />
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <EmptyState
              icon={Briefcase}
              title="No saved jobs"
              description="Save jobs you're interested in to review later"
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
```

**Create**: `src/hooks/useJobs.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Job {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  remote_allowed: boolean;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  company: {
    id: string;
    name: string;
    logo_url: string | null;
  };
}

export function useJobs() {
  return useQuery<Job[]>({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          companies (
            id,
            name,
            logo_url
          )
        `)
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as Job[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
```

**Create**: `src/components/dashboard/JobCard.tsx`

```typescript
import { Briefcase, MapPin, DollarSign, Bookmark } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: { name: string; logo_url: string | null };
    location: string;
    remote_allowed: boolean;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string;
    type: string;
  };
  saved?: boolean;
}

export function JobCard({ job, saved = false }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            {job.company.logo_url && (
              <img
                src={job.company.logo_url}
                alt={job.company.name}
                className="h-12 w-12 rounded object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark className={saved ? 'fill-primary' : ''} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{job.type}</Badge>
          {job.remote_allowed && <Badge variant="outline">Remote</Badge>}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        {job.salary_min && job.salary_max && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>
              {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()} {job.salary_currency}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1">Apply Now</Button>
        <Button variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  );
}
```

---

### Step 2: Events Dashboard (3-4 hours)

**Create**: `src/pages/DashboardEvents.tsx`

```typescript
import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useEvents } from '@/hooks/useEvents';
import { EventCard } from '@/components/dashboard/EventCard';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

export default function DashboardEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  const { data: events, isLoading } = useEvents();

  // Filter events
  const upcomingEvents = events?.filter(e =>
    new Date(e.event_date) >= new Date() &&
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pastEvents = events?.filter(e =>
    new Date(e.event_date) < new Date() &&
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">
            Network and learn at Medellin ecosystem events
          </p>
        </div>

        {/* Search */}
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="registered">My Registrations</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {isLoading ? (
              <LoadingState type="grid" count={6} />
            ) : upcomingEvents && upcomingEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Calendar}
                title="No upcoming events"
                description="Check back soon for new events"
              />
            )}
          </TabsContent>

          <TabsContent value="registered" className="mt-6">
            <EmptyState
              icon={Calendar}
              title="No registered events"
              description="Register for events to see them here"
            />
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            {pastEvents && pastEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Calendar}
                title="No past events"
                description="Past events will appear here"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
```

**Update**: `src/hooks/useEvents.ts`

```typescript
export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

---

### Step 3: Pitch Decks Dashboard (3-4 hours)

**Create**: `src/pages/DashboardPitchDecks.tsx`

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { usePresentations } from '@/hooks/usePresentations';
import { PresentationCard } from '@/components/dashboard/PresentationCard';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PresentationIcon, Plus } from 'lucide-react';

export default function DashboardPitchDecks() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const { data: presentations, isLoading } = usePresentations();

  // Filter presentations
  const filteredPresentations = presentations?.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const draftPresentations = filteredPresentations?.filter(p => p.status === 'draft');
  const publishedPresentations = filteredPresentations?.filter(p => p.status === 'published');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Pitch Decks</h1>
            <p className="text-muted-foreground">
              Create and manage AI-powered presentations
            </p>
          </div>
          <Button onClick={() => navigate('/pitch-deck-wizard')}>
            <Plus className="mr-2 h-4 w-4" />
            New Pitch Deck
          </Button>
        </div>

        {/* Search */}
        <Input
          placeholder="Search presentations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {isLoading ? (
              <LoadingState type="grid" count={6} />
            ) : filteredPresentations && filteredPresentations.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPresentations.map(presentation => (
                  <PresentationCard key={presentation.id} presentation={presentation} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={PresentationIcon}
                title="No presentations yet"
                description="Create your first AI-powered pitch deck"
                action={{
                  label: "Create Pitch Deck",
                  onClick: () => navigate('/pitch-deck-wizard')
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4 mt-6">
            {draftPresentations && draftPresentations.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {draftPresentations.map(presentation => (
                  <PresentationCard key={presentation.id} presentation={presentation} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={PresentationIcon}
                title="No drafts"
                description="Draft presentations will appear here"
              />
            )}
          </TabsContent>

          <TabsContent value="published" className="space-y-4 mt-6">
            {publishedPresentations && publishedPresentations.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {publishedPresentations.map(presentation => (
                  <PresentationCard key={presentation.id} presentation={presentation} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={PresentationIcon}
                title="No published presentations"
                description="Publish your presentations to share them"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
```

**Create**: `src/hooks/usePresentations.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Presentation {
  id: string;
  title: string;
  status: string;
  slide_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export function usePresentations() {
  return useQuery<Presentation[]>({
    queryKey: ['presentations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('presentations')
        .select('id, title, status, slide_count, view_count, created_at, updated_at')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
```

**Create**: `src/components/dashboard/PresentationCard.tsx`

```typescript
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PresentationCardProps {
  presentation: {
    id: string;
    title: string;
    status: string;
    slide_count: number;
    view_count: number;
    updated_at: string;
  };
}

export function PresentationCard({ presentation }: PresentationCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{presentation.title}</CardTitle>
          <Badge variant={presentation.status === 'published' ? 'default' : 'secondary'}>
            {presentation.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{presentation.slide_count} slides</span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {presentation.view_count} views
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Updated {formatDistanceToNow(new Date(presentation.updated_at), { addSuffix: true })}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => navigate(`/presentations/${presentation.id}/edit`)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => navigate(`/presentations/${presentation.id}/view`)}
        >
          View
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

### Step 4: Settings Page (2-3 hours)

**Create**: `src/pages/Settings.tsx`

```typescript
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input id="full_name" placeholder="Alex Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="alex@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about yourself" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what updates you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about events and jobs
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Event Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders about upcoming events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Job Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for new job postings
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your data and visibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your profile visible to other members
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Pitch Decks</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your pitch decks on your profile
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
```

---

## Success Criteria

### Jobs Dashboard
- [ ] Jobs list renders from database
- [ ] Search filters jobs
- [ ] Type filter works
- [ ] Tabs switch correctly
- [ ] Job cards display company info
- [ ] Apply/save buttons exist

### Events Dashboard
- [ ] Events list renders
- [ ] Search works
- [ ] Upcoming/past filtering works
- [ ] Event cards show date/location
- [ ] Register button exists

### Pitch Decks Dashboard
- [ ] Presentations list renders
- [ ] Search/filter works
- [ ] Draft/published tabs work
- [ ] Can navigate to edit/view
- [ ] New deck button works

### Settings Page
- [ ] Profile tab works
- [ ] Notification toggles work
- [ ] Privacy settings display
- [ ] Save button exists

---

## Testing

```bash
# 1. TypeScript check
pnpm tsc --noEmit

# 2. Test all routes
# http://localhost:8080/dashboard/jobs
# http://localhost:8080/dashboard/events
# http://localhost:8080/dashboard/pitch-decks
# http://localhost:8080/settings

# 3. Test database queries
PGPASSWORD='Toronto2025#' psql -h db.dhesktsqhcxhqfjypulk.supabase.co -U postgres -d postgres -c "SELECT COUNT(*) FROM jobs;"
```

---

## Next Steps

→ **03-advanced.md** - Charts, analytics, filters, performance optimization

---

**Estimated Total Time**: 10-14 hours
**Difficulty**: Intermediate
**Status**: ✅ Ready to implement
