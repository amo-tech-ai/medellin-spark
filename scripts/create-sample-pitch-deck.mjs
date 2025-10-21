#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://dhesktsqhcxhqfjypulk.supabase.co';
// Use service role key to bypass RLS for demo data creation
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY not found in environment');
  console.log('This script needs the service role key to bypass RLS');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const samplePresentation = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  title: 'MedellinAI - AI-Powered Innovation Hub',
  status: 'completed',
  theme: 'mystique',
  is_public: true,
  profile_id: '00000000-0000-0000-0000-000000000000',
  content: {
    slides: [
    {
      id: 1,
      type: 'title',
      title: 'MedellinAI',
      subtitle: 'Building the Future of AI in Colombia',
      background: 'gradient'
    },
    {
      id: 2,
      type: 'content',
      title: 'The Problem',
      content: 'Latin America lacks dedicated AI innovation hubs. Startups struggle to find resources, mentorship, and funding.',
      bullets: ['No centralized AI community', 'Limited access to AI expertise', 'Lack of startup resources']
    },
    {
      id: 3,
      type: 'content',
      title: 'Our Solution',
      content: 'MedellinAI is an AI-powered startup accelerator connecting founders, investors, and AI experts.',
      bullets: ['AI-powered pitch deck generation', 'Expert mentorship network', 'Curated job marketplace', 'Exclusive perks & deals']
    },
    {
      id: 4,
      type: 'content',
      title: 'Market Opportunity',
      content: 'The Latin American AI market is projected to reach $5B by 2027.',
      bullets: ['10,000+ AI startups in LATAM', 'Growing demand for AI talent', '$1.2B in venture funding (2024)']
    },
    {
      id: 5,
      type: 'content',
      title: 'Business Model',
      content: 'Multiple revenue streams ensure sustainable growth.',
      bullets: ['Premium memberships ($99/mo)', 'Enterprise partnerships', 'Commission on job placements (15%)', 'Sponsored perks deals']
    },
    {
      id: 6,
      type: 'content',
      title: 'Traction',
      content: 'Strong early validation and growth metrics.',
      bullets: ['500+ registered users (3 months)', '50+ active startups', '25+ partner companies', '15 successful job placements']
    },
    {
      id: 7,
      type: 'content',
      title: 'The Ask',
      content: 'Seeking $500K seed funding to scale operations.',
      bullets: ['Product development (40%)', 'Marketing & growth (30%)', 'Team expansion (20%)', 'Operations (10%)']
    },
    {
      id: 8,
      type: 'closing',
      title: 'Join Us',
      subtitle: 'Building the future of AI in Latin America',
      cta: "Let's Talk",
      contact: 'hello@medellinai.com'
    }
    ]
  }
};

console.log('Creating sample pitch deck...');
console.log('ID:', samplePresentation.id);
console.log('Title:', samplePresentation.title);

// First, create or verify the demo profile exists
console.log('\nStep 1: Creating demo profile...');
const { data: profileData, error: profileError } = await supabase
  .from('profiles')
  .upsert({
    profile_id: '00000000-0000-0000-0000-000000000000',
    email: 'demo@medellinai.com',
    full_name: 'Demo User'
  }, {
    onConflict: 'profile_id'
  })
  .select();

if (profileError) {
  console.error('Profile Error:', profileError.message);
} else {
  console.log('✅ Demo profile ready');
}

// Now create the presentation
console.log('\nStep 2: Creating presentation...');
const { data, error } = await supabase
  .from('presentations')
  .upsert(samplePresentation)
  .select();

if (error) {
  console.error('Error:', error.message);
  console.error('Details:', error.details);
  console.error('Hint:', error.hint);
  process.exit(1);
}

console.log('\n✅ Sample pitch deck created successfully!');
console.log('Data:', JSON.stringify(data, null, 2));
console.log('\nTest URLs:');
console.log('- Viewer: http://localhost:8080/presentations/a1b2c3d4-e5f6-7890-abcd-ef1234567890/view');
console.log('- Editor: http://localhost:8080/presentations/a1b2c3d4-e5f6-7890-abcd-ef1234567890/edit');
console.log('- Outline: http://localhost:8080/presentations/a1b2c3d4-e5f6-7890-abcd-ef1234567890/outline');
console.log('- Dashboard: http://localhost:8080/dashboard/pitch-decks');
