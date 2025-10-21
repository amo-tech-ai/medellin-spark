#!/usr/bin/env node
/**
 * Fix presentation category values via Supabase REST API
 * This bypasses network/psql connection issues
 */
const fs = require('fs');
const path = require('path');

// Load .env file manually
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
});

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

async function getCategories() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/presentations?select=category&limit=1000`,
    {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Count unique categories
  const counts = {};
  data.forEach(row => {
    const cat = row.category || 'NULL';
    counts[cat] = (counts[cat] || 0) + 1;
  });

  return counts;
}

async function fixCategories() {
  console.log('🔍 Checking current category values...\n');

  const categories = await getCategories();
  
  console.log('Current categories:');
  Object.entries(categories).forEach(([cat, count]) => {
    const isValid = ['general', 'pitch-deck', 'investor-deck', 'sales-deck'].includes(cat);
    const status = isValid ? '✅' : '❌';
    console.log(`  ${status} ${cat}: ${count} rows`);
  });

  const invalidCategories = Object.keys(categories).filter(
    cat => !['general', 'pitch-deck', 'investor-deck', 'sales-deck'].includes(cat)
  );

  if (invalidCategories.length === 0) {
    console.log('\n✅ All categories are valid! No fixes needed.');
    console.log('\n🚀 You can now run: supabase db push --linked');
    return;
  }

  console.log(`\n⚠️  Found ${invalidCategories.length} invalid category value(s): ${invalidCategories.join(', ')}`);
  console.log('🔧 Here\'s how to fix it...\n');

  console.log('📋 OPTION 1: Supabase Dashboard SQL Editor');
  console.log('─'.repeat(60));
  console.log(`
-- Fix invalid presentation categories
UPDATE presentations
SET category = CASE
  -- NULL -> general
  WHEN category IS NULL THEN 'general'
  
  -- Pitch deck variations
  WHEN category ILIKE '%pitch%' THEN 'pitch-deck'
  WHEN category ILIKE '%investor%' THEN 'investor-deck'
  WHEN category ILIKE '%sales%' THEN 'sales-deck'
  
  -- Everything else -> general
  ELSE 'general'
END
WHERE category NOT IN ('general', 'pitch-deck', 'investor-deck', 'sales-deck');

-- Verify fix
SELECT category, COUNT(*) as count
FROM presentations
GROUP BY category
ORDER BY count DESC;
  `.trim());
  console.log('─'.repeat(60));
  
  const projectRef = SUPABASE_URL.match(/https:\/\/([^.]+)/)[1];
  console.log('\n📍 Run SQL here:');
  console.log(`   https://supabase.com/dashboard/project/${projectRef}/sql/new`);
  
  console.log('\n📋 OPTION 2: Supabase CLI (simpler)');
  console.log('─'.repeat(60));
  console.log('   supabase db execute --linked << \'EOF\'');
  console.log('   UPDATE presentations SET category = \'general\'');
  console.log('   WHERE category NOT IN (\'general\', \'pitch-deck\', \'investor-deck\', \'sales-deck\');');
  console.log('   EOF');
  console.log('─'.repeat(60));
  
  console.log('\n✅ After fixing, retry: export SUPABASE_ACCESS_TOKEN=<token> && supabase db push --linked');
}

fixCategories().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
