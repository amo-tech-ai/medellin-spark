#!/usr/bin/env node
/**
 * Enable RLS via Supabase REST API
 * This bypasses CLI connection issues
 */

require('dotenv').config();
const https = require('https');
const { URL } = require('url');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// SQL to enable RLS
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

-- Create secure policies for presentations
DROP POLICY IF EXISTS "presentations_select_own" ON presentations;
CREATE POLICY "presentations_select_own" ON presentations FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "presentations_insert_own" ON presentations;
CREATE POLICY "presentations_insert_own" ON presentations FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "presentations_update_own" ON presentations;
CREATE POLICY "presentations_update_own" ON presentations FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "presentations_delete_own" ON presentations;
CREATE POLICY "presentations_delete_own" ON presentations FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Templates: Public read
DROP POLICY IF EXISTS "templates_select_all" ON presentation_templates;
CREATE POLICY "templates_select_all" ON presentation_templates FOR SELECT
  USING (true);

-- Custom themes: Own only
DROP POLICY IF EXISTS "themes_select_own" ON custom_themes;
CREATE POLICY "themes_select_own" ON custom_themes FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "themes_insert_own" ON custom_themes;
CREATE POLICY "themes_insert_own" ON custom_themes FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Generated images: Own only
DROP POLICY IF EXISTS "images_select_own" ON generated_images;
CREATE POLICY "images_select_own" ON generated_images FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "images_insert_own" ON generated_images;
CREATE POLICY "images_insert_own" ON generated_images FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Favorites: Own only
DROP POLICY IF EXISTS "favorites_select_own" ON favorite_presentations;
CREATE POLICY "favorites_select_own" ON favorite_presentations FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "favorites_insert_own" ON favorite_presentations;
CREATE POLICY "favorites_insert_own" ON favorite_presentations FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Profiles: Secure policies
DROP POLICY IF EXISTS "profiles_select_public" ON profiles;
CREATE POLICY "profiles_select_public" ON profiles FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());
`;

console.log('\n🔒 Enabling RLS via Supabase REST API...\n');

// Execute SQL via PostgREST admin endpoint
const url = new URL(`${SUPABASE_URL}/rest/v1/rpc`);
const postData = JSON.stringify({ query: sql });

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Content-Length': Buffer.byteLength(postData),
    'Prefer': 'return=representation'
  }
};

const req = https.request(url, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('✅ RLS enabled successfully!\n');
      console.log('Response:', data || 'No output');
      console.log('\n📊 Next: Run ./scripts/verify-security.sh to verify\n');
    } else {
      console.error(`❌ Error: HTTP ${res.statusCode}`);
      console.error('Response:', data);
      console.error('\n💡 Alternative: Use Supabase Dashboard SQL Editor');
      console.error('   URL: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/sql/new');
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  console.error('\n💡 Alternative Methods:');
  console.error('   1. Use Supabase Dashboard: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/policies');
  console.error('   2. Wait for CLI connection to recover and retry: supabase db push --linked');
  process.exit(1);
});

req.write(postData);
req.end();
