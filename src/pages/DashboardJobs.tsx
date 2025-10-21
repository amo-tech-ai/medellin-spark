import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { JobCard } from "@/components/dashboard/jobs/JobCard";
import { Briefcase, FileText, Calendar, Bookmark } from "lucide-react";

// Mock data for Phase 1
const mockJobs = [
  {
    id: "1",
    title: "Senior AI Engineer",
    company_name: "TechFlow AI",
    description:
      "Join our team building cutting-edge AI solutions for enterprise clients. Work with the latest machine learning frameworks and contribute to products used by millions.",
    type: "Full-time",
    location: "Medellín, Colombia",
    remote_allowed: true,
    salary_min: 80000,
    salary_max: 120000,
    salary_currency: "USD",
  },
  {
    id: "2",
    title: "Machine Learning Engineer",
    company_name: "DataStart",
    description:
      "Build and deploy ML models at scale. Experience with PyTorch, TensorFlow, and cloud infrastructure required.",
    type: "Full-time",
    location: "Remote",
    remote_allowed: true,
    salary_min: 70000,
    salary_max: 100000,
    salary_currency: "USD",
  },
  {
    id: "3",
    title: "Frontend Developer",
    company_name: "UILabs",
    description:
      "Create beautiful user interfaces with React and TypeScript. Work with designers to bring wireframes to life.",
    type: "Contract",
    location: "Medellín, Colombia",
    remote_allowed: false,
    salary_min: 50000,
    salary_max: 80000,
    salary_currency: "USD",
  },
  {
    id: "4",
    title: "Product Manager",
    company_name: "GrowthCo",
    description:
      "Lead product strategy and roadmap for our SaaS platform. Work cross-functionally with engineering and design.",
    type: "Full-time",
    location: "Medellín, Colombia",
    remote_allowed: true,
    salary_min: 90000,
    salary_max: 130000,
    salary_currency: "USD",
  },
  {
    id: "5",
    title: "Backend Engineer",
    company_name: "CloudTech",
    description:
      "Design and build scalable backend systems. Experience with Node.js, PostgreSQL, and AWS required.",
    type: "Full-time",
    location: "Remote",
    remote_allowed: true,
    salary_min: 75000,
    salary_max: 110000,
    salary_currency: "USD",
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company_name: "InfraTech",
    description:
      "Manage cloud infrastructure and CI/CD pipelines. Experience with Kubernetes, Docker, and Terraform essential.",
    type: "Full-time",
    location: "Medellín, Colombia",
    remote_allowed: true,
    salary_min: 85000,
    salary_max: 125000,
    salary_currency: "USD",
  },
];

export default function DashboardJobs() {
  const [savedJobIds, setSavedJobIds] = useState<string[]>(["1", "3"]);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(["2"]);

  // Calculate metrics from state
  const totalApplications = appliedJobIds.length;
  const activeApplications = appliedJobIds.length; // All are "active" in mock
  const interviews = 3; // Mock value
  const savedJobsCount = savedJobIds.length;

  const handleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApplyJob = (jobId: string) => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds((prev) => [...prev, jobId]);
    }
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

        {/* Job Listings */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Available Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobIds.includes(job.id)}
                hasApplied={appliedJobIds.includes(job.id)}
                onSave={() => handleSaveJob(job.id)}
                onApply={() => handleApplyJob(job.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
