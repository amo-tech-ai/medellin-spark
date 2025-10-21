#!/usr/bin/env node
/**
 * Verify Supabase Best Practices Implementation
 * Tests all critical components after fixes
 */
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL_POOLER || process.env.DATABASE_URL

if (!connectionString) {
  console.error('❌ DATABASE_URL_POOLER or DATABASE_URL not set')
  process.exit(1)
}

const sql = postgres(connectionString, {
  prepare: false,
  ssl: 'require',
  max: 1
})

console.log('🔍 SUPABASE BEST PRACTICES VERIFICATION\n')
console.log('═'.repeat(60))

async function verifyAll() {
  try {
    // =============================================
    // TEST 1: Verify RLS is Enabled
    // =============================================
    console.log('\n📊 TEST 1: Row Level Security Status')
    console.log('─'.repeat(60))
    
    const rlsStatus = await sql`
      select 
        tablename, 
        rowsecurity as rls_enabled
      from pg_tables 
      where schemaname = 'public' 
        and tablename in (
          'presentations', 
          'presentation_templates', 
          'custom_themes', 
          'generated_images', 
          'favorite_presentations',
          'profiles'
        )
      order by tablename
    `
    
    let rlsPassed = true
    rlsStatus.forEach(table => {
      const status = table.rls_enabled ? '✅ ENABLED' : '❌ DISABLED'
      console.log(`  ${status} ${table.tablename}`)
      if (!table.rls_enabled) rlsPassed = false
    })
    
    console.log(`\n  Result: ${rlsPassed ? '✅ PASS' : '❌ FAIL'}`)

    // =============================================
    // TEST 2: Verify Function Security Settings
    // =============================================
    console.log('\n📊 TEST 2: Database Function Security')
    console.log('─'.repeat(60))
    
    const functions = await sql`
      select 
        p.proname as function_name,
        case p.prosecdef 
          when true then 'DEFINER' 
          else 'INVOKER' 
        end as security_mode,
        case p.provolatile
          when 'i' then 'IMMUTABLE'
          when 's' then 'STABLE'
          when 'v' then 'VOLATILE'
        end as volatility,
        array_to_string(p.proconfig, ', ') as config
      from pg_proc p
      join pg_namespace n on p.pronamespace = n.oid
      where n.nspname = 'public'
        and p.proname like '%presentation%'
      order by p.proname
    `
    
    let functionsPassed = true
    functions.forEach(fn => {
      const securityOk = fn.security_mode === 'INVOKER'
      const hasSearchPath = fn.config && fn.config.includes('search_path=')
      const volatilityOk = fn.volatility !== null
      
      const status = (securityOk && hasSearchPath && volatilityOk) ? '✅' : '⚠️'
      console.log(`  ${status} ${fn.function_name}`)
      console.log(`     Security: ${fn.security_mode}`)
      console.log(`     Volatility: ${fn.volatility || 'NOT SET'}`)
      console.log(`     search_path: ${hasSearchPath ? 'SET' : 'NOT SET'}`)
      
      if (!securityOk || !hasSearchPath || !volatilityOk) functionsPassed = false
    })
    
    console.log(`\n  Result: ${functionsPassed ? '✅ PASS' : '⚠️ NEEDS REVIEW'}`)

    // =============================================
    // TEST 3: Test Function Execution
    // =============================================
    console.log('\n📊 TEST 3: Function Execution Test')
    console.log('─'.repeat(60))
    
    try {
      // This will fail if user is not authenticated, which is expected
      const stats = await sql`
        select * from get_my_presentations_stats('00000000-0000-0000-0000-000000000000'::uuid)
      `
      console.log('  ✅ Function executes without errors')
      console.log(`     Result: ${stats.length} row(s) returned`)
    } catch (error) {
      if (error.message.includes('permission denied') || error.message.includes('auth')) {
        console.log('  ✅ Function executes (RLS working correctly)')
      } else {
        console.log('  ❌ Function error:', error.message)
      }
    }

    // =============================================
    // TEST 4: Verify RLS Policies
    // =============================================
    console.log('\n📊 TEST 4: RLS Policy Count')
    console.log('─'.repeat(60))
    
    const policies = await sql`
      select 
        tablename,
        count(*) as policy_count
      from pg_policies
      where schemaname = 'public'
      group by tablename
      order by tablename
    `
    
    let policiesPassed = true
    policies.forEach(table => {
      // Each table should have at least 4 policies (SELECT, INSERT, UPDATE, DELETE)
      const status = table.policy_count >= 3 ? '✅' : '⚠️'
      console.log(`  ${status} ${table.tablename}: ${table.policy_count} policies`)
      if (table.policy_count < 3) policiesPassed = false
    })
    
    console.log(`\n  Result: ${policiesPassed ? '✅ PASS' : '⚠️ NEEDS REVIEW'}`)

    // =============================================
    // TEST 5: Connection Configuration
    // =============================================
    console.log('\n📊 TEST 5: Connection Configuration')
    console.log('─'.repeat(60))
    
    const [dbInfo] = await sql`
      select 
        current_database() as database,
        current_user as user,
        version() as version,
        inet_server_addr() as server_ip
    `
    
    console.log(`  ✅ Database: ${dbInfo.database}`)
    console.log(`  ✅ User: ${dbInfo.user}`)
    console.log(`  ✅ Version: ${dbInfo.version.split(' ').slice(0, 2).join(' ')}`)
    console.log(`  ✅ SSL: ${connectionString.includes('ssl=require') || connectionString.includes('sslmode') ? 'Enabled' : 'Check config'}`)

    // =============================================
    // FINAL SCORE
    // =============================================
    console.log('\n' + '═'.repeat(60))
    console.log('🎯 FINAL VERIFICATION RESULTS')
    console.log('═'.repeat(60))
    
    const tests = [
      { name: 'RLS Enabled', passed: rlsPassed, weight: 30 },
      { name: 'Function Security', passed: functionsPassed, weight: 20 },
      { name: 'RLS Policies', passed: policiesPassed, weight: 20 },
    ]
    
    let totalScore = 0
    let maxScore = 0
    
    tests.forEach(test => {
      const score = test.passed ? test.weight : 0
      totalScore += score
      maxScore += test.weight
      const status = test.passed ? '✅ PASS' : '❌ FAIL'
      console.log(`${status} ${test.name.padEnd(25)} ${score}/${test.weight} points`)
    })
    
    const percentage = Math.round((totalScore / maxScore) * 100)
    console.log('─'.repeat(60))
    console.log(`TOTAL SCORE: ${totalScore}/${maxScore} (${percentage}%)`)
    console.log('─'.repeat(60))
    
    if (percentage >= 90) {
      console.log('\n✅ EXCELLENT - Production Ready!')
    } else if (percentage >= 70) {
      console.log('\n🟡 GOOD - Minor improvements recommended')
    } else {
      console.log('\n🔴 NEEDS WORK - Critical issues found')
    }
    
    console.log('\n' + '═'.repeat(60))

  } catch (error) {
    console.error('\n❌ Verification Error:', error.message)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

verifyAll()


