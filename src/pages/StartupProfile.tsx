import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Circle, 
  Upload, 
  Eye, 
  Save, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Users,
  Target,
  Award
} from "lucide-react";

const StartupProfile = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    companyName: "",
    website: "",
    tagline: "",
    elevatorPitch: "",
    problem: "",
    solution: "",
    targetMarket: "",
    businessModel: "",
    foundedYear: "",
    mrr: "",
    userCount: "",
    teamSize: "",
    fundingStage: "",
  });

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Company Basics", icon: Circle },
    { number: 2, title: "About Your Startup", icon: Circle },
    { number: 3, title: "Traction & Metrics", icon: TrendingUp },
    { number: 4, title: "Team & Culture", icon: Users },
    { number: 5, title: "What You Need", icon: Target },
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const profileStrength = Math.min(
    100,
    Object.values(profileData).filter(val => val !== "").length * 7
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Progress Header */}
      <div className="sticky top-0 z-50 bg-background border-b border-divider">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">Create Startup Profile</h1>
              <Badge variant="secondary" className="bg-background-alt">
                {progressPercentage.toFixed(0)}% Complete
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Auto-saving...</span>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye size={16} />
                Preview
              </Button>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Content */}
          <div className="lg:col-span-2">
            {/* Step Navigation */}
            <div className="bg-background-alt rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          currentStep > step.number
                            ? "bg-primary text-white"
                            : currentStep === step.number
                            ? "bg-primary-dark text-white"
                            : "bg-surface text-muted-foreground"
                        }`}
                      >
                        {currentStep > step.number ? (
                          <CheckCircle2 size={20} />
                        ) : (
                          <span className="font-semibold">{step.number}</span>
                        )}
                      </div>
                      <p className="text-xs mt-2 text-center font-medium hidden md:block">
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-1 w-12 md:w-20 mx-2 transition-all ${
                          currentStep > step.number ? "bg-primary" : "bg-divider"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Sections */}
            <div className="bg-card border border-divider rounded-xl p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Company Basics</h2>
                    <p className="text-muted-foreground">
                      Let's start with the essential information about your company
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Your registered business name"
                        value={profileData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website URL</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://yourstartup.com"
                        value={profileData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        We'll auto-fetch your logo and company info
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="tagline">Company Tagline *</Label>
                      <Input
                        id="tagline"
                        placeholder="A memorable one-liner (e.g., 'AI-powered logistics for Latin America')"
                        value={profileData.tagline}
                        onChange={(e) => handleInputChange("tagline", e.target.value)}
                        maxLength={50}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {profileData.tagline.length}/50 characters
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Company Logo</Label>
                        <div className="mt-2 border-2 border-dashed border-divider rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                          <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
                          <p className="text-sm font-medium">Upload Logo</p>
                          <p className="text-xs text-muted-foreground mt-1">PNG or JPG, max 2MB</p>
                        </div>
                      </div>

                      <div>
                        <Label>Cover Image</Label>
                        <div className="mt-2 border-2 border-dashed border-divider rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                          <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
                          <p className="text-sm font-medium">Upload Cover</p>
                          <p className="text-xs text-muted-foreground mt-1">1200x400px recommended</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="foundedYear">Founded Year</Label>
                      <Input
                        id="foundedYear"
                        type="number"
                        placeholder="2024"
                        value={profileData.foundedYear}
                        onChange={(e) => handleInputChange("foundedYear", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">About Your Startup</h2>
                    <p className="text-muted-foreground">
                      Tell your story and what makes your startup unique
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="elevatorPitch">Elevator Pitch *</Label>
                      <Textarea
                        id="elevatorPitch"
                        placeholder="Explain your business as if you had 30 seconds in an elevator with an investor"
                        value={profileData.elevatorPitch}
                        onChange={(e) => handleInputChange("elevatorPitch", e.target.value)}
                        className="mt-2 min-h-24"
                        maxLength={600}
                      />
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-muted-foreground">
                          About 150 words maximum
                        </p>
                        <Button variant="ghost" size="sm" className="gap-2 text-primary">
                          <Sparkles size={14} />
                          Generate with AI
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="problem">Problem You Solve *</Label>
                      <Textarea
                        id="problem"
                        placeholder="What specific problem does your startup solve?"
                        value={profileData.problem}
                        onChange={(e) => handleInputChange("problem", e.target.value)}
                        className="mt-2 min-h-32"
                      />
                    </div>

                    <div>
                      <Label htmlFor="solution">Your Solution *</Label>
                      <Textarea
                        id="solution"
                        placeholder="How does your product/service solve this problem uniquely?"
                        value={profileData.solution}
                        onChange={(e) => handleInputChange("solution", e.target.value)}
                        className="mt-2 min-h-32"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="targetMarket">Target Market</Label>
                        <Input
                          id="targetMarket"
                          placeholder="e.g., B2B SaaS for enterprises"
                          value={profileData.targetMarket}
                          onChange={(e) => handleInputChange("targetMarket", e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="businessModel">Business Model</Label>
                        <Input
                          id="businessModel"
                          placeholder="e.g., Subscription, Marketplace"
                          value={profileData.businessModel}
                          onChange={(e) => handleInputChange("businessModel", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Traction & Metrics</h2>
                    <p className="text-muted-foreground">
                      Share your growth metrics and achievements
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="mrr">Monthly Recurring Revenue</Label>
                        <Input
                          id="mrr"
                          placeholder="$50,000"
                          value={profileData.mrr}
                          onChange={(e) => handleInputChange("mrr", e.target.value)}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Optional - can be kept private
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="userCount">Number of Users/Customers</Label>
                        <Input
                          id="userCount"
                          placeholder="5,000"
                          value={profileData.userCount}
                          onChange={(e) => handleInputChange("userCount", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="teamSize">Team Size</Label>
                        <Input
                          id="teamSize"
                          placeholder="15"
                          value={profileData.teamSize}
                          onChange={(e) => handleInputChange("teamSize", e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="fundingStage">Funding Stage</Label>
                        <Input
                          id="fundingStage"
                          placeholder="Series A, Pre-seed, etc."
                          value={profileData.fundingStage}
                          onChange={(e) => handleInputChange("fundingStage", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="bg-background-alt rounded-lg p-6 border border-divider">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Award size={20} className="text-primary" />
                        Key Achievements
                      </h3>
                      <Button variant="outline" className="w-full">
                        Add Achievement
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Team & Culture</h2>
                    <p className="text-muted-foreground">
                      Showcase your team and company values
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-background-alt rounded-lg p-6 border border-divider">
                      <h3 className="font-semibold mb-4">Founder Profiles</h3>
                      <Button variant="outline" className="w-full">
                        Add Founder
                      </Button>
                    </div>

                    <div className="bg-background-alt rounded-lg p-6 border border-divider">
                      <h3 className="font-semibold mb-4">Company Culture Values</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Innovation", "Transparency", "Growth", "Collaboration"].map((value) => (
                          <Badge key={value} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                            {value}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="mt-3">
                        Add Custom Value
                      </Button>
                    </div>

                    <div>
                      <Label>Work Preference</Label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {["Remote", "Hybrid", "Office"].map((pref) => (
                          <Button key={pref} variant="outline" className="justify-center">
                            {pref}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="headquarters">Headquarters Location</Label>
                      <Input
                        id="headquarters"
                        placeholder="Medellín, Colombia"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">What You Need</h2>
                    <p className="text-muted-foreground">
                      Tell the community how they can help you grow
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label>Looking For</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {["Investors", "Co-founders", "Advisors", "Customers"].map((need) => (
                          <Button key={need} variant="outline" className="justify-start">
                            <CheckCircle2 size={16} className="mr-2" />
                            {need}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specificAsks">Specific Asks</Label>
                      <Textarea
                        id="specificAsks"
                        placeholder="What specific help are you looking for? (e.g., 'Looking for B2B sales advisor with enterprise experience')"
                        className="mt-2 min-h-32"
                      />
                    </div>

                    <div className="bg-background-alt rounded-lg p-6 border border-divider">
                      <h3 className="font-semibold mb-4">Open Roles</h3>
                      <Button variant="outline" className="w-full">
                        Add Open Position
                      </Button>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                      <h3 className="font-semibold mb-2 text-primary-dark">Ready to Publish?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your profile is {profileStrength}% complete. Publish now to start connecting with the community!
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary-hover">
                        Publish Profile
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-divider">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ChevronLeft size={16} />
                  Previous
                </Button>
                
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Save size={16} />
                    Save Draft
                  </Button>
                  {currentStep < totalSteps ? (
                    <Button onClick={handleNext} className="gap-2 bg-primary hover:bg-primary-hover">
                      Continue
                      <ChevronRight size={16} />
                    </Button>
                  ) : (
                    <Button className="gap-2 bg-primary hover:bg-primary-hover">
                      Publish Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Profile Strength & Tips */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Profile Strength Card */}
              <div className="bg-card border border-divider rounded-xl p-6">
                <h3 className="font-semibold mb-4">Profile Strength</h3>
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#E1E8EB"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#9ABAC6"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${profileStrength * 3.51} 351`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">{profileStrength}%</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {profileStrength < 50
                      ? "Keep going! Add more details to strengthen your profile"
                      : profileStrength < 80
                      ? "Looking good! A few more sections to complete"
                      : "Excellent! Your profile is ready to attract investors"}
                  </p>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-background-alt border border-divider rounded-xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" />
                  Pro Tips
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Add specific metrics to stand out to investors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Upload high-quality logo and cover images
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Be clear about what help you need
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Complete your profile for 3x more visibility
                    </span>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-divider rounded-xl p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => navigate('/pitch-deck-wizard')}
                  >
                    <Sparkles size={16} />
                    Generate Pitch Deck
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Upload size={16} />
                    Import from LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Eye size={16} />
                    Preview Public Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupProfile;
