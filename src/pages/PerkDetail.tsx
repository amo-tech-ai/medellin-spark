import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Gift,
  Check,
  Copy,
  Bookmark,
  ExternalLink,
  Users,
  Star,
  Calendar,
  ChevronRight,
  Cloud,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PerkDetail = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Mock data
  const perk = {
    id: "1",
    title: "50% Off AWS Credits for Startups",
    provider: "Amazon Web Services",
    category: "Cloud Services",
    value: "Save up to $5,000",
    promoCode: "STARTUP2025",
    expiration: "December 31, 2025",
    description: "Get 50% off AWS credits to help your startup scale infrastructure. Perfect for early-stage companies building cloud-based applications.",
    whatYouGet: [
      "$5,000 in AWS credits over 12 months",
      "Access to AWS startup support program",
      "Free training and documentation",
      "Technical support resources",
      "Community forum access",
    ],
    howToClaim: [
      'Click "Copy Code" below',
      "Visit aws.amazon.com/activate",
      "Create your AWS account or sign in",
      "Enter promo code: STARTUP2025",
      "Start using your credits immediately",
    ],
    terms: [
      "Available to startups incorporated less than 2 years ago",
      "One redemption per company",
      "Credits expire 12 months from activation",
      "Subject to AWS Terms of Service",
      "Cannot be combined with other offers",
    ],
    providerInfo: {
      industry: "Cloud Computing",
      description: "Leading cloud platform providing computing, storage, and database services to millions of customers worldwide.",
    },
    stats: {
      claimed: 127,
      featured: true,
    },
  };

  const relatedPerks = [
    {
      id: "2",
      title: "Free Stripe Processing Fees",
      provider: "Stripe",
      value: "Save $2,000",
      category: "Payments",
    },
    {
      id: "3",
      title: "50% Off SendGrid Email",
      provider: "SendGrid",
      value: "$500 credit",
      category: "Email Services",
    },
    {
      id: "4",
      title: "Free Notion Team Plan",
      provider: "Notion",
      value: "6 months free",
      category: "Productivity",
    },
  ];

  const handleCopyCode = () => {
    setIsCopied(true);
    toast({
      title: "Code copied!",
      description: "Promo code has been copied to clipboard.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-smooth">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link to="/perks" className="hover:text-primary transition-smooth">
            Perks
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground">{perk.title}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-lg border bg-secondary flex items-center justify-center">
              <Cloud className="text-primary" size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{perk.title}</h1>
              <Badge>{perk.category}</Badge>
            </div>
          </div>
        </div>

        {/* Value Highlight */}
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-lg p-8 mb-8 text-center">
          <Gift className="text-primary mx-auto mb-4" size={48} />
          <p className="text-4xl font-bold mb-2">{perk.value}</p>
          <p className="text-muted-foreground">For qualified startups</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* What You Get */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">What You Get</h2>
              <p className="text-muted-foreground mb-4">{perk.description}</p>
              <ul className="space-y-2">
                {perk.whatYouGet.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="text-green-600 mt-1 flex-shrink-0" size={18} />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* How to Claim */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                How to Claim This Perk
              </h2>
              <ol className="space-y-3">
                {perk.howToClaim.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Terms & Conditions */}
            <Accordion type="single" collapsible>
              <AccordionItem value="terms">
                <AccordionTrigger className="text-xl font-semibold">
                  Terms & Conditions
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {perk.terms.map((term, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />
                        {term}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Promo Code Card */}
            <Card className="border-dashed border-2">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Promo Code</p>
                <p className="text-2xl font-mono font-bold mb-4">
                  {perk.promoCode}
                </p>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleCopyCode}
                  variant={isCopied ? "secondary" : "default"}
                >
                  {isCopied ? (
                    <>
                      <Check size={18} className="mr-2" />
                      Copied ✓
                    </>
                  ) : (
                    <>
                      <Copy size={18} className="mr-2" />
                      Copy Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Separator />

            {/* Provider Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-lg bg-secondary mb-4">
                  <Cloud className="text-primary" size={32} />
                </div>
                <h3 className="font-semibold text-center">{perk.provider}</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge className="mx-auto block w-fit">
                  {perk.providerInfo.industry}
                </Badge>
                <p className="text-sm text-muted-foreground text-center">
                  {perk.providerInfo.description}
                </p>
                <Button variant="outline" className="w-full gap-2">
                  Visit Provider
                  <ExternalLink size={16} />
                </Button>
              </CardContent>
            </Card>

            <Separator />

            {/* Perk Stats */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users size={16} />
                {perk.stats.claimed} startups claimed
              </div>
              {perk.stats.featured && (
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  Featured perk
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                Expires {perk.expiration}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                size="lg"
                className="w-full"
                disabled={isClaimed}
                onClick={() => setIsClaimed(true)}
              >
                {isClaimed ? "Claimed ✓" : "Claim Perk"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2"
                onClick={() => {
                  setIsSaved(!isSaved);
                  toast({
                    title: isSaved ? "Removed from saved" : "Saved for later",
                    description: isSaved
                      ? "Perk removed from your favorites."
                      : "Perk added to your favorites.",
                  });
                }}
              >
                <Bookmark size={18} className={isSaved ? "fill-current" : ""} />
                {isSaved ? "Saved" : "Save for Later"}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Perks Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            More Perks You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPerks.map((relatedPerk) => (
              <Card
                key={relatedPerk.id}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-lg bg-secondary mb-4">
                    <Gift className="text-primary" size={32} />
                  </div>
                  <h3 className="font-semibold text-center">
                    {relatedPerk.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {relatedPerk.provider}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3 text-center">
                  <Badge>{relatedPerk.category}</Badge>
                  <p className="font-semibold text-primary">
                    {relatedPerk.value}
                  </p>
                  <Button variant="outline" className="w-full">
                    Claim
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PerkDetail;
