import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Founders", path: "/founders" },
    { name: "Startups", path: "/startups" },
    { name: "Member Profiles", path: "/profile" },
    { name: "Events", path: "/events" },
    { name: "Perks & Deals", path: "/perks" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Submit Startup", path: "/startup-profile" },
    { name: "Skills & Experience", path: "/skills-experience" },
    { name: "Quick Pitch Deck", path: "/pitch-deck" },
  ];

  const dashboards = [
    { name: "My Dashboard", path: "/dashboard" },
    { name: "My Events", path: "/dashboard/events" },
    { name: "Jobs Board", path: "/dashboard/jobs" },
    { name: "Perks", path: "/dashboard/perks" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  const community = [
    { name: "Join WhatsApp", path: "#" },
    { name: "Join Slack", path: "#" },
    { name: "LinkedIn Group", path: "#" },
    { name: "Newsletter", path: "#" },
  ];

  return (
    <footer className="bg-secondary border-t border-border mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg">Medellin AI</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Building the future of AI in Medellin through community, education, and innovation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboards */}
          <div>
            <h4 className="font-semibold mb-4">Dashboards</h4>
            <ul className="space-y-2">
              {dashboards.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              {community.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Medellin AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
