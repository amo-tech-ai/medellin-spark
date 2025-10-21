#!/usr/bin/env node
/**
 * Fix presentation category values via Supabase REST API
 * This bypasses network/psql connection issues
 */
require('dotenv').config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

async function executeSql(sql) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    // If RPC function doesn't exist, use alternative method
    console.log('⚠️  exec_sql RPC not available, using direct table query...');
    return null;
  }

  return await response.json();
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
    return;
  }

  console.log(`\n⚠️  Found ${invalidCategories.length} invalid category values`);
  console.log('🔧 Fixing via Supabase Dashboard SQL Editor...\n');

  console.log('📋 COPY THIS SQL TO DASHBOARD:\n');
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
  console.log('\n📍 Run SQL here:');
  console.log(`   ${SUPABASE_URL.replace('/rest/v1', '')}/dashboard/project/${SUPABASE_URL.match(/\/\/([^.]+)/)[1]}/sql/new`);
  console.log('\n✅ After running, retry: supabase db push --linked');
}

fixCategories().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

