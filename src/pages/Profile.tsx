import { useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Globe, Linkedin, Github, Mail, Share2, Award, BookOpen, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatsCard } from "@/components/ui/stats-card";
import { VerificationBadge } from "@/components/profile/VerificationBadge";
import { SkillProgressCard } from "@/components/profile/SkillProgressCard";
import { ExperienceCard } from "@/components/profile/ExperienceCard";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/profile/useProfile";
import { useExperiences } from "@/hooks/profile/useExperiences";
import { useSkills } from "@/hooks/profile/useSkills";
import { useStartupProfile } from "@/hooks/profile/useStartupProfile";

const Profile = () => {
  const { id: profileId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [showFullBio, setShowFullBio] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);

  // Use the profile ID from params, or fall back to current user's profile
  const activeProfileId = profileId || user?.id;

  // Fetch data from Supabase
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile(activeProfileId || '');
  const { data: experiences, isLoading: experiencesLoading } = useExperiences(activeProfileId || '');
  const { data: skills, isLoading: skillsLoading } = useSkills(activeProfileId || '');
  const { data: startupProfile, isLoading: startupLoading } = useStartupProfile(activeProfileId || '');

  const isOwnProfile = user?.id === activeProfileId;

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

  // Loading state
  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="space-y-8">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (profileError || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <Alert variant="destructive">
            <AlertDescription>
              {profileError?.message || 'Profile not found'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-background-alt border-b border-divider">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-32 w-32 shrink-0">
              <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name} />
              <AvatarFallback>{profile.full_name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-1">{profile.full_name}</h1>
                {profile.job_title && profile.company && (
                  <p className="text-lg text-muted-foreground">
                    {profile.job_title} @ {profile.company}
                  </p>
                )}
                {profile.bio && (
                  <p className="text-muted-foreground mt-2">{profile.bio}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <VerificationBadge type="email" verified={!!profile.email} />
                {profile.linkedin_url && <VerificationBadge type="linkedin" verified={true} />}
                {profile.website_url && <VerificationBadge type="domain" verified={true} />}
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
            <StatsCard value={(experiences?.length || 0).toString()} label="Experiences" />
            <StatsCard value={(skills?.length || 0).toString()} label="Skills" />
            <StatsCard value={startupProfile ? "1" : "0"} label="Startups" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              {profile.bio && (
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {showFullBio || !profile.bio || profile.bio.length <= 200 
                        ? profile.bio 
                        : `${profile.bio.substring(0, 200)}...`}
                    </p>
                    {profile.bio && profile.bio.length > 200 && (
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
                    )}

                    <div className="flex flex-wrap gap-3 pt-4">
                      {profile.website_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={profile.website_url} target="_blank" rel="noopener noreferrer">
                            <Globe className="mr-2 h-4 w-4" />
                            Website
                          </a>
                        </Button>
                      )}
                      {profile.linkedin_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="mr-2 h-4 w-4" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                      {profile.twitter_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Twitter
                          </a>
                        </Button>
                      )}
                      {profile.email && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`mailto:${profile.email}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Startup Profile */}
              {startupLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : startupProfile ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Startup</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      {startupProfile.logo_url && (
                        <img
                          src={startupProfile.logo_url}
                          alt={`${startupProfile.company_name} logo`}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-2">
                          {startupProfile.company_name}
                        </h3>
                        {startupProfile.problem && (
                          <p className="text-muted-foreground mb-4">{startupProfile.problem}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {startupProfile.industry && <Badge variant="secondary">{startupProfile.industry}</Badge>}
                          {startupProfile.stage && <Badge variant="outline">{startupProfile.stage}</Badge>}
                          {startupProfile.team_size && <Badge variant="outline">{startupProfile.team_size} employees</Badge>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {/* Skills */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-foreground">Skills</h2>
                  {skills && skills.length > 4 && (
                    <Button
                      variant="link"
                      onClick={() => setShowAllSkills(!showAllSkills)}
                      className="p-0 h-auto"
                    >
                      {showAllSkills ? "Show less" : "Show all"}
                    </Button>
                  )}
                </div>
                {skillsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : skills && skills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(showAllSkills ? skills : skills.slice(0, 4)).map((skill) => (
                      <SkillProgressCard 
                        key={skill.id}
                        name={skill.skill_name}
                        category={skill.category || 'General'}
                        proficiency={skill.level}
                        endorsements={skill.endorsements || 0}
                        proof={skill.proof || ''}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No skills added yet</p>
                )}
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-foreground">Experience</h2>
                  {experiences && experiences.length > 2 && (
                    <Button
                      variant="link"
                      onClick={() => setShowAllExperience(!showAllExperience)}
                      className="p-0 h-auto"
                    >
                      {showAllExperience ? "Show less" : "Show all"}
                    </Button>
                  )}
                </div>
                {experiencesLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                ) : experiences && experiences.length > 0 ? (
                  <div className="space-y-4">
                    {(showAllExperience ? experiences : experiences.slice(0, 2)).map((exp) => (
                      <ExperienceCard 
                        key={exp.id}
                        logo={exp.logo_url}
                        company={exp.company}
                        title={exp.role}
                        period={`${new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}`}
                        achievements={exp.achievements || (exp.description ? [exp.description] : [])}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No experience added yet</p>
                )}
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar
                profileStrength={Math.min(100, (
                  (profile.bio ? 20 : 0) +
                  (profile.avatar_url ? 15 : 0) +
                  (skills && skills.length > 0 ? 25 : 0) +
                  (experiences && experiences.length > 0 ? 25 : 0) +
                  (startupProfile ? 15 : 0)
                ))}
                aiRecommendations={[
                  ...((!skills || skills.length < 3) ? ["Add more skills to showcase expertise"] : []),
                  ...((!experiences || experiences.length === 0) ? ["Add work experience"] : []),
                  ...(!profile.bio ? ["Add a professional bio"] : []),
                  ...(!startupProfile ? ["Create a startup profile"] : []),
                ]}
                skillMatches={{
                  investors: skills?.length ? Math.min(100, skills.length * 15) : 0,
                  jobs: experiences?.length ? Math.min(100, experiences.length * 20) : 0,
                  coFounders: startupProfile ? 85 : 0,
                }}
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Profile;
