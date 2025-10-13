import { useState } from "react";
import { MapPin, Globe, Linkedin, Github, Mail, Share2, Award, BookOpen, Video, FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatsCard } from "@/components/ui/stats-card";
import { ProfileCard } from "@/components/ui/profile-card";
import { VerificationBadge } from "@/components/profile/VerificationBadge";
import { SkillProgressCard } from "@/components/profile/SkillProgressCard";
import { ExperienceCard } from "@/components/profile/ExperienceCard";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { toast } from "sonner";

const Profile = () => {
  const [showFullBio, setShowFullBio] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);

  // Mock data - in real app, fetch from API based on route param
  const profile = {
    name: "María González",
    role: "Co-Founder & CEO",
    company: "AI Solutions Colombia",
    tagline: "Building AI-powered tools to transform Latin American businesses",
    location: "Medellín, Colombia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bio: "Passionate AI entrepreneur with 8+ years of experience in machine learning and product development. Founded AI Solutions Colombia to democratize AI technology across Latin America. Previously led ML teams at Fortune 500 companies and holds a PhD in Computer Science from MIT. Committed to building ethical AI solutions that create positive social impact.",
    verified: {
      email: true,
      linkedin: true,
      github: true,
      domain: true,
    },
    stats: {
      views: 1234,
      connections: 456,
      endorsements: 89,
      profileStrength: 92,
    },
    social: {
      website: "https://aisolutions.co",
      linkedin: "https://linkedin.com/in/mariagonzalez",
      github: "https://github.com/mariagonzalez",
      email: "maria@aisolutions.co",
    },
    companyInfo: {
      logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop",
      name: "AI Solutions Colombia",
      pitch: "We're building the next generation of AI-powered business intelligence tools specifically designed for Latin American markets.",
      industry: "Artificial Intelligence",
      stage: "Series A",
      teamSize: "15-25",
      funding: "$5M",
    },
    skills: [
      { name: "Machine Learning", category: "Technical", proficiency: 95, endorsements: 45, proof: "Led ML initiatives at 3 Fortune 500 companies" },
      { name: "Product Strategy", category: "Business", proficiency: 88, endorsements: 32, proof: "Launched 5+ AI products with 100K+ users" },
      { name: "Team Leadership", category: "Management", proficiency: 90, endorsements: 28, proof: "Built and scaled engineering teams from 5 to 50" },
      { name: "Python/TensorFlow", category: "Technical", proficiency: 92, endorsements: 38, proof: "10+ years of hands-on ML development" },
      { name: "Fundraising", category: "Business", proficiency: 75, endorsements: 15, proof: "Raised $8M across 2 ventures" },
      { name: "Public Speaking", category: "Communication", proficiency: 85, endorsements: 22, proof: "Keynote at AI Summit LATAM 2024" },
    ],
    experience: [
      {
        logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop",
        company: "AI Solutions Colombia",
        title: "Co-Founder & CEO",
        period: "2021 - Present",
        achievements: [
          "Founded company and raised $5M Series A led by Andreessen Horowitz",
          "Grew team from 3 to 25 people across 3 countries",
          "Launched AI platform serving 500+ enterprise clients"
        ],
      },
      {
        company: "Google",
        title: "Senior ML Engineer",
        period: "2018 - 2021",
        achievements: [
          "Led recommendation engine serving 100M+ users",
          "Improved model accuracy by 40% using novel transformer architecture",
          "Mentored 12 junior engineers"
        ],
      },
      {
        company: "Amazon",
        title: "ML Research Scientist",
        period: "2015 - 2018",
        achievements: [
          "Published 8 papers on deep learning in top-tier conferences",
          "Developed fraud detection system saving $50M annually",
        ],
      },
    ],
    education: [
      { degree: "PhD in Computer Science", institution: "MIT", year: "2015" },
      { degree: "BS in Mathematics", institution: "Universidad de los Andes", year: "2010" },
    ],
    certifications: [
      "AWS Machine Learning Specialty",
      "TensorFlow Developer Certificate",
      "Certified Scrum Master",
    ],
    accomplishments: [
      { type: "award", title: "Forbes 30 Under 30 LATAM", year: "2023" },
      { type: "press", title: "Featured in TechCrunch", year: "2022" },
      { type: "talk", title: "AI Summit LATAM Keynote", year: "2024" },
    ],
  };

  const handleConnect = () => {
    toast.success("Connection request sent!");
  };

  const handleRequestIntro = () => {
    toast.success("Introduction request sent!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profile link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-background-alt border-b border-divider">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-32 w-32 shrink-0">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-1">{profile.name}</h1>
                <p className="text-lg text-muted-foreground">
                  {profile.role} @ {profile.company}
                </p>
                <p className="text-muted-foreground mt-2">{profile.tagline}</p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <VerificationBadge type="email" verified={profile.verified.email} />
                <VerificationBadge type="linkedin" verified={profile.verified.linkedin} />
                <VerificationBadge type="github" verified={profile.verified.github} />
                <VerificationBadge type="domain" verified={profile.verified.domain} />
                <Badge variant="outline" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {profile.location}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={handleConnect} variant="cta">
                  Connect
                </Button>
                <Button onClick={handleRequestIntro} variant="outline" className="border-cta text-cta hover:bg-cta/10">
                  Request Intro
                </Button>
                <Button onClick={handleShare} variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-b border-divider py-8 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard value={profile.stats.views.toLocaleString()} label="Profile Views" />
            <StatsCard value={profile.stats.connections} label="Connections" />
            <StatsCard value={profile.stats.endorsements} label="Endorsements" />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Some stats are private in dashboard; this is a public view.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {showFullBio ? profile.bio : `${profile.bio.substring(0, 200)}...`}
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="p-0 h-auto"
                  >
                    {showFullBio ? (
                      <>Read less <ChevronUp className="ml-1 h-4 w-4" /></>
                    ) : (
                      <>Read more <ChevronDown className="ml-1 h-4 w-4" /></>
                    )}
                  </Button>

                  <div className="flex flex-wrap gap-3 pt-4">
                    {profile.social.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.social.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="mr-2 h-4 w-4" />
                          Website
                        </a>
                      </Button>
                    )}
                    {profile.social.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="mr-2 h-4 w-4" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {profile.social.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.social.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {profile.social.email && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${profile.social.email}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Company */}
              <Card>
                <CardHeader>
                  <CardTitle>Company</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    {profile.companyInfo.logo && (
                      <img
                        src={profile.companyInfo.logo}
                        alt={`${profile.companyInfo.name} logo`}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {profile.companyInfo.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">{profile.companyInfo.pitch}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{profile.companyInfo.industry}</Badge>
                        <Badge variant="outline">{profile.companyInfo.stage}</Badge>
                        <Badge variant="outline">{profile.companyInfo.teamSize} employees</Badge>
                        <Badge variant="outline">{profile.companyInfo.funding} raised</Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/startup-profile">
                      View Company Profile <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Skills */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-foreground">Skills</h2>
                  <Button
                    variant="link"
                    onClick={() => setShowAllSkills(!showAllSkills)}
                    className="p-0 h-auto"
                  >
                    {showAllSkills ? "Show less" : "Show all"}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(showAllSkills ? profile.skills : profile.skills.slice(0, 4)).map((skill, index) => (
                    <SkillProgressCard key={index} {...skill} />
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-foreground">Experience</h2>
                  <Button
                    variant="link"
                    onClick={() => setShowAllExperience(!showAllExperience)}
                    className="p-0 h-auto"
                  >
                    {showAllExperience ? "Show less" : "Show all"}
                  </Button>
                </div>
                <div className="space-y-4">
                  {(showAllExperience ? profile.experience : profile.experience.slice(0, 2)).map((exp, index) => (
                    <ExperienceCard key={index} {...exp} />
                  ))}
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {profile.education.map((edu, index) => (
                        <li key={index}>
                          <p className="font-medium text-foreground">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground">{edu.year}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {profile.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-success mt-1">✓</span>
                          <span className="text-sm text-foreground">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Accomplishments */}
              <Card>
                <CardHeader>
                  <CardTitle>Accomplishments & Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {profile.accomplishments.map((acc, index) => (
                      <div
                        key={index}
                        className="p-4 border border-divider rounded-lg hover:shadow-card-hover transition-smooth cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {acc.type === "award" && <Award className="h-5 w-5 text-warning" />}
                          {acc.type === "press" && <FileText className="h-5 w-5 text-primary" />}
                          {acc.type === "talk" && <Video className="h-5 w-5 text-success" />}
                          <span className="text-xs text-muted-foreground">{acc.year}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">{acc.title}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar
                profileStrength={profile.stats.profileStrength}
                aiRecommendations={[
                  "Add 3 more technical skills",
                  "Quantify achievements with metrics",
                  "Upload portfolio samples",
                  "Connect your GitHub account",
                ]}
                skillMatches={{
                  investors: 85,
                  jobs: 92,
                  coFounders: 78,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Profiles */}
      <section className="py-12 bg-background-alt border-t border-divider">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-semibold text-foreground mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProfileCard
              name="Carlos Rodríguez"
              title="CTO"
              company="TechVentures"
              location="Bogotá, Colombia"
              category="AI & ML"
              tags={["Python", "TensorFlow", "Cloud"]}
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
            />
            <ProfileCard
              name="Ana Martínez"
              title="Head of Product"
              company="DataFlow"
              location="Medellín, Colombia"
              category="Product"
              tags={["Product Strategy", "UX", "Analytics"]}
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
            />
            <ProfileCard
              name="Diego Silva"
              title="Founder"
              company="AI Consulting"
              location="Cali, Colombia"
              category="Consulting"
              tags={["Business Strategy", "AI", "B2B"]}
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
