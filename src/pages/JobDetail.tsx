import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Eye,
  Bookmark,
  Check,
  ArrowRight,
  Star,
  ChevronRight,
  Briefcase,
} from "lucide-react";

const JobDetail = () => {
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Mock data
  const job = {
    id: "1",
    title: "Senior AI Engineer",
    company: "TechCorp AI",
    location: "Medellín, Colombia",
    type: "Full-time",
    remote: true,
    salary: "$80,000 - $120,000 USD",
    postedDate: "3 days ago",
    description: "We're looking for an experienced AI Engineer to join our growing team in Medellín. You'll work on cutting-edge projects using the latest ML technologies and help shape the future of AI-powered solutions for Latin American startups.",
    requirements: [
      "5+ years of experience in AI/ML",
      "Strong proficiency in Python and TensorFlow",
      "Experience with AWS or cloud platforms",
      "Excellent communication skills",
      "Bachelor's degree in Computer Science or related field",
    ],
    responsibilities: [
      "Design and implement ML models for production",
      "Collaborate with cross-functional teams",
      "Optimize algorithms for performance",
      "Mentor junior engineers",
      "Stay current with latest AI research",
    ],
    bonusPoints: [
      "Experience with LLMs",
      "Published research papers",
      "Open source contributions",
    ],
    companyInfo: "TechCorp AI is a leading artificial intelligence company focused on solving real-world problems for Latin American businesses. Founded in 2020, we've grown to 40+ employees across Colombia and Mexico.",
    industry: "Artificial Intelligence",
    companySize: "11-50 employees",
    applicants: 23,
    views: 156,
  };

  const similarJobs = [
    {
      id: "2",
      title: "Machine Learning Engineer",
      company: "DataStart",
      location: "Remote",
      type: "Full-time",
      remote: true,
      salary: "$70K - $100K",
      skills: ["Python", "PyTorch", "Docker"],
    },
    {
      id: "3",
      title: "AI Research Scientist",
      company: "Innovation Labs",
      location: "Medellín, Colombia",
      type: "Full-time",
      remote: false,
      salary: "$90K - $130K",
      skills: ["Research", "ML", "Python"],
    },
    {
      id: "4",
      title: "Senior Data Scientist",
      company: "Analytics Pro",
      location: "Remote",
      type: "Full-time",
      remote: true,
      salary: "$75K - $110K",
      skills: ["Statistics", "Python", "SQL"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-smooth">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link to="/jobs" className="hover:text-primary transition-smooth">
            Jobs
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground">{job.title}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg border bg-secondary flex items-center justify-center">
              <Building2 className="text-primary" size={32} />
            </div>
            <div>
              <p className="text-lg font-semibold text-muted-foreground mb-2">
                {job.company}
              </p>
              <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="default" className="gap-1">
                  <Briefcase size={14} />
                  {job.type}
                </Badge>
                {job.remote && (
                  <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-600 border-green-500/20">
                    🌍 Remote
                  </Badge>
                )}
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  Posted {job.postedDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Highlight */}
        <div className="bg-secondary border rounded-lg p-6 mb-8 flex items-center gap-4">
          <DollarSign className="text-primary" size={32} />
          <div>
            <p className="text-2xl font-bold">{job.salary}</p>
            <p className="text-sm text-muted-foreground">per year</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About the Role */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About the Role</h2>
              <p className="text-muted-foreground leading-relaxed">
                {job.description}
              </p>
            </section>

            {/* What We're Looking For */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                What We're Looking For
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="text-green-600 mt-1 flex-shrink-0" size={18} />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What You'll Do */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">What You'll Do</h2>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="text-primary mt-1 flex-shrink-0" size={18} />
                    <span className="text-muted-foreground">{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Bonus Points */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Bonus Points</h2>
              <ul className="space-y-2">
                {job.bonusPoints.map((bonus, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="text-yellow-500 mt-1 flex-shrink-0" size={18} />
                    <span className="text-muted-foreground">{bonus}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-lg bg-secondary mb-4">
                  <Building2 className="text-primary" size={32} />
                </div>
                <h3 className="font-semibold text-center">{job.company}</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  {job.companyInfo}
                </p>
                <div className="flex justify-center">
                  <Badge>{job.industry}</Badge>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Users size={16} />
                  {job.companySize}
                </div>
                <Button variant="outline" className="w-full">
                  View Company
                </Button>
              </CardContent>
            </Card>

            <Separator />

            {/* Application Stats */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users size={16} />
                {job.applicants} applicants
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} />
                {job.views} views
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                size="lg"
                className="w-full"
                disabled={isApplied}
                onClick={() => setIsApplied(true)}
              >
                {isApplied ? "Applied ✓" : "Apply Now"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark
                  size={18}
                  className={isSaved ? "fill-current" : ""}
                />
                {isSaved ? "Saved" : "Save Job"}
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Jobs Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Similar Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarJobs.map((similarJob) => (
              <Card
                key={similarJob.id}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <CardHeader>
                  <h3 className="font-semibold">{similarJob.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Building2 size={14} />
                    {similarJob.company}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    {similarJob.location}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{similarJob.type}</Badge>
                    {similarJob.remote && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                        Remote
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <DollarSign size={14} />
                    {similarJob.salary}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {similarJob.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
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

export default JobDetail;
