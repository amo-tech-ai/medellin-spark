import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { JobCard } from "@/components/dashboard/jobs/JobCard";
import { Briefcase, FileText, Calendar, Bookmark } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useSavedJobs } from "@/hooks/jobs/useSavedJobs";
import { useApplications } from "@/hooks/jobs/useApplications";
import { useJobFeed } from "@/hooks/jobs/useJobFeed";
import { useToggleSaveJob } from "@/hooks/jobs/useToggleSaveJob";
import { useApplyToJob } from "@/hooks/jobs/useApplyToJob";

export default function DashboardJobs() {
  const { data: savedJobs, isLoading: savedLoading, isError: savedError } = useSavedJobs();
  const { data: applications, isLoading: appsLoading, isError: appsError } = useApplications();
  const { data: jobFeed, isLoading: feedLoading, isError: feedError } = useJobFeed();
  const toggleSave = useToggleSaveJob();
  const applyToJob = useApplyToJob();

  // Calculate metrics
  const totalApplications = applications?.length || 0;
  const activeApplications = applications?.filter(a => a.status === "submitted" || a.status === "interviewing")?.length || 0;
  const interviews = applications?.filter(a => a.status === "interviewing")?.length || 0;
  const savedJobsCount = savedJobs?.length || 0;

  const handleSaveJob = (jobId: string, isSaved: boolean) => {
    toggleSave.mutate({ jobId, isSaved });
  };

  const handleApplyJob = (jobId: string) => {
    applyToJob.mutate(jobId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Jobs Board</h1>
          <p className="text-muted-foreground">
            Browse startup opportunities and track your applications
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Applications"
            value={totalApplications}
            icon={Briefcase}
          />
          <MetricCard
            title="Active Applications"
            value={activeApplications}
            icon={FileText}
            trend={{ value: "+2", positive: true }}
          />
          <MetricCard
            title="Interviews"
            value={interviews}
            icon={Calendar}
          />
          <MetricCard
            title="Saved Jobs"
            value={savedJobsCount}
            icon={Bookmark}
          />
        </div>

        {/* Job Listings with Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved ({savedJobsCount})</TabsTrigger>
            <TabsTrigger value="applications">Applications ({totalApplications})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">Available Positions</h2>
            {feedLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-80" />
                ))}
              </div>
            )}
            {feedError && (
              <Alert variant="destructive">
                <AlertDescription>
                  Failed to load jobs. Please try again.
                </AlertDescription>
              </Alert>
            )}
            {!feedLoading && !feedError && jobFeed && jobFeed.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No jobs available at the moment.</p>
              </div>
            )}
            {!feedLoading && !feedError && jobFeed && jobFeed.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobFeed.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={job.isSaved}
                    hasApplied={job.hasApplied}
                    onSave={() => handleSaveJob(job.id, job.isSaved)}
                    onApply={() => handleApplyJob(job.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">Saved Jobs</h2>
            {savedLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-80" />
                ))}
              </div>
            )}
            {savedError && (
              <Alert variant="destructive">
                <AlertDescription>
                  Failed to load saved jobs. Please try again.
                </AlertDescription>
              </Alert>
            )}
            {!savedLoading && !savedError && savedJobs && savedJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't saved any jobs yet.</p>
                <Button onClick={() => document.querySelector('[value="all"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                  Browse Jobs
                </Button>
              </div>
            )}
            {!savedLoading && !savedError && savedJobs && savedJobs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobs.map((saved) => (
                  <JobCard
                    key={saved.id}
                    job={saved.jobs}
                    isSaved={true}
                    hasApplied={applications?.some(a => a.job_id === saved.job_id) || false}
                    onSave={() => handleSaveJob(saved.job_id, true)}
                    onApply={() => handleApplyJob(saved.job_id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">My Applications</h2>
            {appsLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-80" />
                ))}
              </div>
            )}
            {appsError && (
              <Alert variant="destructive">
                <AlertDescription>
                  Failed to load applications. Please try again.
                </AlertDescription>
              </Alert>
            )}
            {!appsLoading && !appsError && applications && applications.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't applied to any jobs yet.</p>
                <Button onClick={() => document.querySelector('[value="all"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                  Browse Jobs
                </Button>
              </div>
            )}
            {!appsLoading && !appsError && applications && applications.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((app) => (
                  <JobCard
                    key={app.id}
                    job={app.jobs}
                    isSaved={savedJobs?.some(s => s.job_id === app.job_id) || false}
                    hasApplied={true}
                    applicationStatus={app.status}
                    onSave={() => handleSaveJob(app.job_id, savedJobs?.some(s => s.job_id === app.job_id) || false)}
                    onApply={() => {}}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
