import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { 
  Linkedin, 
  Github, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  Rocket, 
  Lightbulb, 
  Code2, 
  TrendingUp, 
  Users,
  Lock,
  Eye,
  Save,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';

interface Skill {
  id: string;
  category: string;
  icon: any;
  notes: string;
  experience: number;
  verified: boolean;
  endorsements: number;
  expanded: boolean;
}

interface Experience {
  id: string;
  type: string;
  organization: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
}

const skillLevels = ['None', 'Learning', 'Familiar', 'Proficient', 'Expert'];

const skillCategories = [
  { name: 'Founder', icon: Rocket, description: 'Teams led, startups launched' },
  { name: 'Entrepreneurship', icon: Lightbulb, description: 'Funding raised, exits' },
  { name: 'Technology', icon: Code2, description: 'Tech stack, certifications' },
  { name: 'Marketing', icon: TrendingUp, description: 'Campaigns, channels' },
  { name: 'Account Management', icon: Users, description: 'Clients handled, retention' }
];

const experienceTypes = ['Employee', 'Internship', 'Freelance', 'Volunteer', 'Advisor', 'Personal'];

export default function SkillsExperience() {
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [autoSaved, setAutoSaved] = useState(false);

  const [skills, setSkills] = useState<Skill[]>([
    {
      id: '1',
      category: 'Founder',
      icon: Rocket,
      notes: 'Has founded multiple tech startups, demonstrable strong leadership and vision.',
      experience: 80,
      verified: true,
      endorsements: 24,
      expanded: false
    },
    {
      id: '2',
      category: 'Entrepreneurship',
      icon: Lightbulb,
      notes: 'Seasoned entrepreneur with extensive experience in founding and managing tech startups.',
      experience: 75,
      verified: false,
      endorsements: 12,
      expanded: false
    },
    {
      id: '3',
      category: 'Technology',
      icon: Code2,
      notes: 'Experienced in the technology industry, with a focus on tech startups.',
      experience: 65,
      verified: true,
      endorsements: 18,
      expanded: false
    }
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      type: 'Employee',
      organization: 'Not Specified',
      position: 'Digital Marketing Specialist',
      description: 'Specialized in digital marketing strategies and execution.',
      startDate: '2020-01',
      endDate: 'Present'
    }
  ]);

  const handleLinkedInUrlChange = (url: string) => {
    setLinkedInUrl(url);
    setIsUrlValid(url.includes('linkedin.com/in/'));
  };

  const handleLinkedInImport = () => {
    toast.success('LinkedIn profile imported successfully! 🎉');
    setShowLinkedInModal(false);
    setProfileCompletion(85);
  };

  const handleSkillUpdate = (id: string, field: string, value: any) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
    setAutoSaved(true);
    setTimeout(() => setAutoSaved(false), 2000);
  };

  const toggleSkillExpand = (id: string) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, expanded: !skill.expanded } : skill
    ));
  };

  const addNewSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      category: 'Technology',
      icon: Code2,
      notes: '',
      experience: 0,
      verified: false,
      endorsements: 0,
      expanded: true
    };
    setSkills([...skills, newSkill]);
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
    toast.success('Skill deleted');
  };

  const addNewExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      type: 'Employee',
      organization: '',
      position: '',
      description: '',
      startDate: '',
      endDate: 'Present'
    };
    setExperiences([...experiences, newExperience]);
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
    toast.success('Experience deleted');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Header - Sticky */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-foreground">Professional Profile</h1>
              {autoSaved && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Saved</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={() => setShowLinkedInModal(true)} size="sm">
                <Linkedin className="h-4 w-4 mr-2" />
                Import LinkedIn
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Profile Completion</span>
              <span className="font-semibold text-foreground">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {profileCompletion >= 80 ? '✨ Strong Profile' : profileCompletion >= 50 ? '⚡ Moderate Profile' : '📝 Complete your profile'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1,234</div>
                    <div className="text-xs text-muted-foreground">Profile Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{profileCompletion}%</div>
                    <div className="text-xs text-muted-foreground">Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">89</div>
                    <div className="text-xs text-muted-foreground">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">45</div>
                    <div className="text-xs text-muted-foreground">Endorsements</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    Email
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    LinkedIn
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Github className="h-3 w-3" />
                    GitHub
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    Domain
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Your Skills Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Skills</CardTitle>
                    <CardDescription>Tell us about what you're good at and it connects you with other great thinkers.</CardDescription>
                  </div>
                  <Button onClick={addNewSkill} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <Card key={skill.id} className="border-border">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary rounded-lg">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground flex items-center gap-2">
                                {skill.category}
                                {skill.verified && (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {skillCategories.find(c => c.name === skill.category)?.description}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSkillExpand(skill.id)}
                          >
                            {skill.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </div>
                      </CardHeader>
                      
                      {skill.expanded && (
                        <CardContent className="space-y-4 pt-0">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Notes</label>
                            <Textarea
                              value={skill.notes}
                              onChange={(e) => handleSkillUpdate(skill.id, 'notes', e.target.value)}
                              placeholder="Describe your experience and expertise..."
                              className="min-h-[80px]"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-foreground mb-3 block">Experience Rating</label>
                            <div className="space-y-3">
                              <Slider
                                value={[skill.experience]}
                                onValueChange={(value) => handleSkillUpdate(skill.id, 'experience', value[0])}
                                max={100}
                                step={25}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                {skillLevels.map((level, idx) => (
                                  <span 
                                    key={level}
                                    className={skill.experience >= idx * 25 ? 'text-primary font-medium' : ''}
                                  >
                                    {level}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {skill.endorsements > 0 && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{skill.endorsements} endorsements</span>
                            </div>
                          )}

                          <div className="flex gap-2 pt-2">
                            <Button 
                              className="flex-1"
                              onClick={() => {
                                setAutoSaved(true);
                                setTimeout(() => setAutoSaved(false), 2000);
                                toast.success('Skill saved');
                              }}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Skill
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => deleteSkill(skill.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </CardContent>
            </Card>

            {/* Your Experiences Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Experiences</CardTitle>
                    <CardDescription>Let us know what you've accomplished</CardDescription>
                  </div>
                  <Button onClick={addNewExperience} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiences.map((exp) => (
                  <Card key={exp.id} className="border-border">
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Type of Experience</label>
                          <select 
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            value={exp.type}
                          >
                            {experienceTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Organization</label>
                          <Input value={exp.organization} placeholder="Company name" />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Position</label>
                        <Input value={exp.position} placeholder="Job title" />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                        <Textarea
                          value={exp.description}
                          placeholder="Describe your role and accomplishments..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Start Date</label>
                          <Input type="month" value={exp.startDate} />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">End Date</label>
                          <Input type="month" value={exp.endDate} />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1"
                          onClick={() => {
                            setAutoSaved(true);
                            setTimeout(() => setAutoSaved(false), 2000);
                            toast.success('Experience saved');
                          }}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Experience
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => deleteExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Strength */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Strength</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-3">
                    <span className="text-3xl font-bold text-primary">{profileCompletion}%</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {profileCompletion >= 80 ? 'Strong Profile' : profileCompletion >= 50 ? 'Moderate Profile' : 'Getting Started'}
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Basic info completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Skills added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-muted" />
                    <span className="text-muted-foreground">Add more experiences</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span className="text-muted-foreground">Add 3 technical skills to boost visibility</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span className="text-muted-foreground">Quantify your achievements with metrics</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span className="text-muted-foreground">Complete certifications section</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span className="text-muted-foreground">Upload portfolio samples</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Match Score */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skill Match Score</CardTitle>
                <CardDescription>Your compatibility with opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">AI Startups</span>
                    <span className="font-semibold text-primary">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tech Investors</span>
                    <span className="font-semibold text-primary">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Co-founder Match</span>
                    <span className="font-semibold text-primary">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  Connect GitHub
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Pitch
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* LinkedIn Import Modal */}
      <Dialog open={showLinkedInModal} onOpenChange={setShowLinkedInModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <DialogTitle className="text-2xl">Import Your Professional Profile</DialogTitle>
            </div>
            <DialogDescription>
              Connect LinkedIn to auto-populate your skills and experience.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* LinkedIn URL Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">LinkedIn Profile URL</label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={linkedInUrl}
                  onChange={(e) => handleLinkedInUrlChange(e.target.value)}
                  className="pl-10 pr-10"
                />
                {isUrlValid && (
                  <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                We'll import your public skills, roles, and achievements.
              </p>
              {isUrlValid && (
                <p className="text-xs text-green-600 font-medium">✓ Ready to import</p>
              )}
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Professional Summary (Optional)</label>
              <Textarea
                placeholder="e.g., Experienced AI founder with 5+ years building ML products..."
                className="min-h-[100px]"
                maxLength={500}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  A brief summary helps investors understand your background quickly.
                </p>
                <span className="text-xs text-muted-foreground">0/500</span>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Your data is secure</p>
                  <p className="text-xs text-muted-foreground">
                    We only access public information from your LinkedIn profile. 
                    Your data is encrypted and never shared without permission.
                  </p>
                  <a href="#" className="text-xs text-primary hover:underline">
                    View Privacy Policy →
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleLinkedInImport}
                disabled={!isUrlValid}
                className="w-full"
                size="lg"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                Import from LinkedIn
              </Button>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  Import from GitHub
                </Button>
              </div>

              <Button variant="ghost" className="w-full" onClick={() => setShowLinkedInModal(false)}>
                Skip for now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
