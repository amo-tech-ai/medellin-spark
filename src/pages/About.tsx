import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Lightbulb, Heart, BookOpen } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community First",
      description: "We believe in the power of collaboration and building strong connections within our ecosystem.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation Driven",
      description: "We push boundaries and encourage experimentation to advance AI development in Latin America.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Inclusive & Welcoming",
      description: "Everyone is welcome, regardless of their background or experience level in AI and technology.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Knowledge Sharing",
      description: "We promote open learning and sharing of ideas to elevate the entire community collectively.",
    },
  ];

  const team = [
    {
      name: "María González",
      role: "Community Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      name: "Carlos Ruiz",
      role: "Technical Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      name: "Ana López",
      role: "Events Coordinator",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
    {
      name: "Diego Martínez",
      role: "Content Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
  ];

  const partners = [
    "OpenAI",
    "Google Cloud",
    "AWS",
    "Microsoft Azure",
    "Anthropic",
    "Stripe",
    "Notion",
    "Linear",
  ];

  const stats = [
    { value: "50+", label: "AI Startups" },
    { value: "30+", label: "Events/Year" },
    { value: "$500K+", label: "In Perks" },
    { value: "500+", label: "Members" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6">About Medellin AI Hub</h1>
          <p className="text-xl text-muted-foreground">
            We are building Colombia's most vibrant artificial intelligence community and startup
            accelerator, bringing together innovators, researchers, and entrepreneurs to shape the
            future of technology in Latin America.
          </p>
        </div>
      </section>

      {/* Accelerator Program */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="text-primary">🚀</div>
            </div>
            <h2 className="mb-6">Our Accelerator Program</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We provide AI startups with everything they need to succeed: mentorship from industry
              experts, access to $500K+ in exclusive perks from top partners, tailored programs for
              every stage, and a thriving community of founders and innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/wizard">View Programs</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/perks">Explore Perks</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            To democratize access to AI knowledge and opportunities in Colombia by creating a
            supportive ecosystem where professionals, students, entrepreneurs, and enthusiasts can
            learn, collaborate, and innovate together. We aim to position Medellin as a leading hub for
            AI innovation in Latin America.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate individuals dedicated to growing the AI community in Medellin
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 shadow-card">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by 25,000+ founders worldwide
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner}
                className="text-muted-foreground font-medium text-lg hover:text-foreground transition-smooth"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
