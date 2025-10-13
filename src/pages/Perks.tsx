import { useState } from "react";
import { Search } from "lucide-react";

const Perks = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { label: "All", value: "all" },
    { label: "Cloud & Infrastructure", value: "cloud" },
    { label: "Marketing & Sales", value: "marketing" },
    { label: "Development Tools", value: "development" },
    { label: "Design & Creative", value: "design" },
    { label: "Finance & Legal", value: "finance" },
    { label: "Analytics", value: "analytics" },
    { label: "HR & Operations", value: "hr" },
  ];

  const perks = [
    {
      id: 1,
      partner: "Google Cloud",
      description: "A full suite of cloud computing services designed to help businesses build, innovate, and scale.",
      benefit: "💰 Up to $200,000 in Credits",
      category: "cloud",
      badge: "FEATURED",
      usageCount: "500+",
      rating: "4.8",
    },
    {
      id: 2,
      partner: "HubSpot",
      description: "The ultimate platform for inbound marketing, sales, and customer service under one roof.",
      benefit: "💰 30-75% Off over 1-3 Years",
      category: "marketing",
      badge: "POPULAR",
      usageCount: "350+",
      rating: "4.7",
    },
    {
      id: 3,
      partner: "Stripe",
      description: "Payment processing and financial infrastructure for businesses of all sizes.",
      benefit: "💰 Waived fees on first $1M processed",
      category: "finance",
      badge: "",
      usageCount: "420+",
      rating: "4.9",
    },
    {
      id: 4,
      partner: "Notion",
      description: "Your all-in-one workspace for notes, tasks, wikis, and databases.",
      benefit: "💰 6 Months Free + Unlimited AI",
      category: "development",
      badge: "POPULAR",
      usageCount: "600+",
      rating: "4.8",
    },
    {
      id: 5,
      partner: "Zendesk",
      description: "Customer engagement software putting all interactions in one interface.",
      benefit: "💰 6 months free",
      category: "analytics",
      badge: "",
      usageCount: "280+",
      rating: "4.6",
    },
    {
      id: 6,
      partner: "AWS",
      description: "Cloud services for compute power, database storage, and content delivery.",
      benefit: "💰 Up to $100,000 in Credits",
      category: "cloud",
      badge: "FEATURED",
      usageCount: "450+",
      rating: "4.7",
    },
    {
      id: 7,
      partner: "OpenAI",
      description: "Advanced AI models and APIs for building intelligent applications.",
      benefit: "💰 $500 in API Credits",
      category: "development",
      badge: "NEW",
      usageCount: "320+",
      rating: "4.9",
    },
    {
      id: 8,
      partner: "Figma",
      description: "Collaborative interface design tool for teams.",
      benefit: "💰 Professional Plan Free for 1 Year",
      category: "design",
      badge: "",
      usageCount: "380+",
      rating: "4.8",
    },
    {
      id: 9,
      partner: "Canva",
      description: "Design presentations, social media graphics, and more with drag-and-drop.",
      benefit: "💰 Pro Plan for 6 Months",
      category: "design",
      badge: "",
      usageCount: "540+",
      rating: "4.7",
    },
    {
      id: 10,
      partner: "Airtable",
      description: "Combines flexibility of a spreadsheet with power of a database.",
      benefit: "💰 $1,000 in Credits",
      category: "development",
      badge: "",
      usageCount: "290+",
      rating: "4.6",
    },
    {
      id: 11,
      partner: "MongoDB",
      description: "Flexible document data model with comprehensive ecosystem integrations.",
      benefit: "💰 $5,000 in Atlas Credits",
      category: "cloud",
      badge: "",
      usageCount: "310+",
      rating: "4.7",
    },
    {
      id: 12,
      partner: "Stripe Atlas",
      description: "Incorporate your startup in Delaware with simplified paperwork.",
      benefit: "💰 $100 off incorporation",
      category: "finance",
      badge: "",
      usageCount: "220+",
      rating: "4.5",
    },
    {
      id: 13,
      partner: "Carta",
      description: "Manage equity, ownership, and cap tables for private companies.",
      benefit: "💰 Free for first year",
      category: "finance",
      badge: "",
      usageCount: "180+",
      rating: "4.6",
    },
    {
      id: 14,
      partner: "SendGrid",
      description: "Send email without maintaining email servers.",
      benefit: "💰 $500 in Credits",
      category: "marketing",
      badge: "",
      usageCount: "260+",
      rating: "4.5",
    },
    {
      id: 15,
      partner: "Mixpanel",
      description: "Product analytics to understand user behavior.",
      benefit: "💰 $50,000 in Credits",
      category: "analytics",
      badge: "",
      usageCount: "190+",
      rating: "4.7",
    },
    {
      id: 16,
      partner: "Gusto",
      description: "Modern payroll, benefits, and HR management.",
      benefit: "💰 3 Months Free",
      category: "hr",
      badge: "",
      usageCount: "210+",
      rating: "4.8",
    },
  ];

  const filteredPerks = perks.filter((perk) => {
    const matchesFilter = activeFilter === "all" || perk.category === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      perk.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perk.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section style={{ background: '#F5F8F9' }} className="py-28 px-[6%]">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-[20px] text-[0.85rem] font-semibold mb-6 uppercase tracking-wider"
               style={{ 
                 background: 'rgba(154, 186, 198, 0.15)', 
                 color: '#7A9AA8',
                 letterSpacing: '0.05em'
               }}>
            PARTNER PERKS
          </div>
          <h1 className="text-[3.5rem] font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.03em', color: '#1F1F1F' }}>
            Exclusive Perks for AI Founders
          </h1>
          <p className="text-[1.15rem] mb-10 leading-relaxed" style={{ color: '#6A737D' }}>
            Access $500k+ in credits and discounts from 50+ leading startup tools
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <button 
              className="px-12 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ 
                background: '#9ABAC6', 
                color: 'white',
                boxShadow: '0 4px 12px rgba(154, 186, 198, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#85AAB8';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(154, 186, 198, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#9ABAC6';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(154, 186, 198, 0.25)';
              }}
            >
              Browse All Perks
            </button>
            <button 
              className="px-12 py-4 rounded-lg font-semibold border transition-all duration-300"
              style={{ 
                background: 'white', 
                color: '#1F1F1F',
                borderColor: '#E1E8EB'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#9ABAC6';
                e.currentTarget.style.color = '#9ABAC6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E1E8EB';
                e.currentTarget.style.color = '#1F1F1F';
              }}
            >
              How It Works
            </button>
          </div>

          <div className="flex gap-12 justify-center text-[0.95rem] mt-12" style={{ color: '#6A737D' }}>
            <span>$500k+ Value</span>
            <span>|</span>
            <span>50+ Partners</span>
            <span>|</span>
            <span>1,000+ Startups Helped</span>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-0 z-10 bg-white border-b px-[6%] py-8" style={{ borderColor: '#E1E8EB' }}>
        <div className="flex gap-8 items-center max-w-[1400px] mx-auto flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[300px] max-w-[400px]">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#6A737D' }} />
            <input
              type="text"
              placeholder="Search perks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg text-[0.95rem]"
              style={{ 
                borderColor: '#E1E8EB',
                background: 'white'
              }}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap flex-1">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className="px-4 py-2 rounded-[20px] text-[0.9rem] font-medium whitespace-nowrap transition-all duration-300"
                style={{
                  background: activeFilter === filter.value ? '#9ABAC6' : 'white',
                  color: activeFilter === filter.value ? 'white' : '#6A737D',
                  border: `1px solid ${activeFilter === filter.value ? '#9ABAC6' : '#E1E8EB'}`
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== filter.value) {
                    e.currentTarget.style.borderColor = '#9ABAC6';
                    e.currentTarget.style.color = '#9ABAC6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter.value) {
                    e.currentTarget.style.borderColor = '#E1E8EB';
                    e.currentTarget.style.color = '#6A737D';
                  }
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Grid Section */}
      <section className="py-20 px-[6%]" style={{ background: 'white' }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPerks.map((perk) => (
              <div
                key={perk.id}
                className="bg-white border rounded-xl p-8 flex flex-col transition-all duration-300"
                style={{
                  borderColor: '#E1E8EB',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(154, 186, 198, 0.15)';
                  e.currentTarget.style.borderColor = '#9ABAC6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#E1E8EB';
                }}
              >
                {/* Badge */}
                {perk.badge && (
                  <div 
                    className="inline-block px-3 py-2 rounded-2xl text-[0.75rem] font-semibold mb-4 uppercase self-start"
                    style={{
                      background: perk.badge === 'NEW' ? '#EAF7F6' : 'rgba(154, 186, 198, 0.15)',
                      color: '#7A9AA8',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {perk.badge}
                  </div>
                )}

                {/* Logo Container */}
                <div 
                  className="w-full h-[140px] rounded-lg flex items-center justify-center mb-6 p-6"
                  style={{ background: '#F5F8F9' }}
                >
                  <span className="text-4xl font-bold" style={{ color: '#9ABAC6' }}>
                    {perk.partner.charAt(0)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold mb-3" style={{ color: '#1F1F1F' }}>
                  {perk.partner}
                </h3>

                {/* Description */}
                <p className="text-[0.95rem] mb-6 flex-grow" style={{ color: '#6A737D', lineHeight: '1.6' }}>
                  {perk.description}
                </p>

                {/* Benefit Box */}
                <div 
                  className="px-4 py-5 rounded-lg mb-6 flex items-center gap-3 border-l-[3px]"
                  style={{
                    background: 'linear-gradient(135deg, #EAF7F6 0%, #F5F8F9 100%)',
                    borderLeftColor: '#9ABAC6'
                  }}
                >
                  <span className="text-xl">{perk.benefit.split(' ')[0]}</span>
                  <span className="font-semibold text-[0.95rem]" style={{ color: '#1F1F1F' }}>
                    {perk.benefit.split(' ').slice(1).join(' ')}
                  </span>
                </div>

                {/* Meta Bar */}
                <div 
                  className="flex justify-between items-center py-4 mb-6 text-[0.85rem] border-t"
                  style={{ 
                    borderTopColor: '#E1E8EB',
                    color: '#6A737D'
                  }}
                >
                  <span>{perk.usageCount} using this</span>
                  <span>⭐ {perk.rating}</span>
                </div>

                {/* CTA Button */}
                <button 
                  className="w-full py-4 rounded-lg font-semibold text-[0.95rem] border transition-all duration-300"
                  style={{
                    background: 'transparent',
                    color: '#9ABAC6',
                    borderColor: '#E1E8EB'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#9ABAC6';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = '#9ABAC6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#9ABAC6';
                    e.currentTarget.style.borderColor = '#E1E8EB';
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {filteredPerks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg mb-6" style={{ color: '#6A737D' }}>
                No perks found matching your criteria.
              </p>
              <button 
                onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
                className="px-8 py-3 rounded-lg border font-semibold transition-all duration-300"
                style={{
                  background: 'white',
                  color: '#9ABAC6',
                  borderColor: '#E1E8EB'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#9ABAC6';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#9ABAC6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#9ABAC6';
                  e.currentTarget.style.borderColor = '#E1E8EB';
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-[6%]" style={{ background: '#F5F8F9' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto">
          <div className="text-center">
            <h3 className="text-[2.75rem] font-bold mb-2" style={{ color: '#9ABAC6', letterSpacing: '-0.02em' }}>
              $500k+
            </h3>
            <p className="text-[0.95rem] font-medium" style={{ color: '#6A737D' }}>
              Total Value in Credits
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-[2.75rem] font-bold mb-2" style={{ color: '#9ABAC6', letterSpacing: '-0.02em' }}>
              50+
            </h3>
            <p className="text-[0.95rem] font-medium" style={{ color: '#6A737D' }}>
              Partner Companies
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-[2.75rem] font-bold mb-2" style={{ color: '#9ABAC6', letterSpacing: '-0.02em' }}>
              1,000+
            </h3>
            <p className="text-[0.95rem] font-medium" style={{ color: '#6A737D' }}>
              Startups Helped
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-[2.75rem] font-bold mb-2" style={{ color: '#9ABAC6', letterSpacing: '-0.02em' }}>
              100+
            </h3>
            <p className="text-[0.95rem] font-medium" style={{ color: '#6A737D' }}>
              Tools & Services
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[5.5rem] px-[6%] text-center border-t" style={{ background: 'white', borderTopColor: '#E1E8EB' }}>
        <h2 className="text-[2.5rem] font-bold mb-4" style={{ color: '#1F1F1F', letterSpacing: '-0.02em' }}>
          Ready to unlock exclusive perks?
        </h2>
        <p className="text-[1.1rem] mb-8" style={{ color: '#6A737D' }}>
          Join the community to access all deals and start saving thousands
        </p>
        <button 
          className="px-12 py-4 rounded-lg font-semibold transition-all duration-300"
          style={{
            background: '#9ABAC6',
            color: 'white',
            boxShadow: '0 4px 12px rgba(154, 186, 198, 0.25)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#85AAB8';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(154, 186, 198, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#9ABAC6';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(154, 186, 198, 0.25)';
          }}
        >
          Join Medellin AI
        </button>
      </section>
    </div>
  );
};

export default Perks;
