#!/bin/bash
source .env
psql "$SUPABASE_DB_URL_POOLER" <<'EOF'
\i supabase/seed-fixed.sql
EOF
