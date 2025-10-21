#!/usr/bin/env node

// =============================================
// Enable RLS on all tables - Emergency Script
// =============================================

require('dotenv').config();
const https = require('https');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const sql = `
-- Enable RLS on all tables
ALTER TABLE IF EXISTS presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS presentation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS custom_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS favorite_presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;

-- Drop temporary policies
DROP POLICY IF EXISTS "profiles_select_all_temporary" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_anon_temporary" ON profiles;
DROP POLICY IF EXISTS "profiles_update_anon_temporary" ON profiles;

-- Verify
SELECT
  tablename,
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_class WHERE relname = tablename AND relrowsecurity = true
  ) THEN 'ENABLED' ELSE 'DISABLED' END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('presentations', 'presentation_templates', 'custom_themes', 'generated_images', 'favorite_presentations', 'profiles')
ORDER BY tablename;
`;

const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`);
const postData = JSON.stringify({ query: sql });

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('\n🔒 Enabling RLS on all tables...\n');

const req = https.request(url, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('✅ RLS enabled successfully!\n');
      try {
        const result = JSON.parse(data);
        console.log('Status:', result);
      } catch (e) {
        console.log('Response:', data);
      }
    } else {
      console.error(`❌ Error: HTTP ${res.statusCode}`);
      console.error('Response:', data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  process.exit(1);
});

req.write(postData);
req.end();
