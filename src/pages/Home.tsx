import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Users, Gift, TrendingUp } from "lucide-react";

const Home = () => {
  const stats = [
    { value: "500+", label: "Founders" },
    { value: "80+", label: "Events" },
    { value: "50+", label: "Perks" },
    { value: "$1M+", label: "In Credits" },
  ];

  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Accelerator Program",
      description: "Get mentorship, funding, and resources to scale your AI startup from idea to market.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Vibrant Community",
      description: "Connect with founders, investors, and experts in Colombia's fastest-growing tech hub.",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Exclusive Perks",
      description: "Access $500K+ in credits from AWS, Google Cloud, OpenAI, and 50+ partner tools.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth Support",
      description: "AI-powered tools to analyze your startup, match resources, and create pitch decks.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-primary">
            Welcome to Colombia's AI Hub
          </div>
          <h1 className="mb-6 font-bold text-balance">
            Build. Connect. <span className="text-primary">Grow.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Medellin's most vibrant AI startup community. Get matched with resources, mentors, and exclusive perks powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/startup-profile">
                Join the Community <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/perks">Explore Opportunities</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
              Get Started
            </div>
            <h2 className="mb-4">Choose your path</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're just starting or ready to scale, we have resources tailored to your journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-background p-6 rounded-xl shadow-card hover:shadow-glow transition-smooth">
              <h3 className="text-xl font-semibold mb-3">Submit Your Startup</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get AI-powered analysis, matched perks, mentorship, and funding.
              </p>
              <Button asChild className="w-full">
                <Link to="/startup-profile">Get Started</Link>
              </Button>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-card hover:shadow-glow transition-smooth">
              <h3 className="text-xl font-semibold mb-3">Join Community</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Network with founders, attend events, and collaborate on AI projects.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-card hover:shadow-glow transition-smooth">
              <h3 className="text-xl font-semibold mb-3">AI Events</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Workshops, hackathons, and conferences to learn and connect in AI space.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/events">View Events</Link>
              </Button>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-card hover:shadow-glow transition-smooth">
              <h3 className="text-xl font-semibold mb-3">AI Projects</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Explore open-source AI projects and contribute to cutting-edge tech.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/perks">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="mb-4">Everything you need to succeed</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From idea to IPO, we provide comprehensive support for AI founders in Medellin
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-primary-foreground">Ready to accelerate your AI journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join 500+ founders building the future of AI in Medellin
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/startup-profile">
              Start Your Journey <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
