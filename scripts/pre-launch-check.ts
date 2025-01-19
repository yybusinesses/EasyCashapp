import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { execSync } from 'child_process'
import fetch from 'node-fetch'

const requiredEnvVars = [
  'NEXT_PUBLIC_APP_URL',
  'DATABASE_URL',
  'JWT_SECRET',
  'NEXTAUTH_URL',
  'PAYPAL_CLIENT_ID',
  'STRIPE_SECRET_KEY',
  'SENTRY_DSN',
  'REDIS_URL'
]

const criticalRoutes = [
  '/',
  '/auth/login',
  '/api/health',
  '/api/payments/health'
]

async function runChecks() {
  console.log('🔍 Running comprehensive pre-launch checks...\n')
  let errors = 0

  // Environment Variables
  console.log('1. Checking environment variables...')
  const env = dotenv.config({ path: '.env.production' }).parsed || {}
  
  for (const variable of requiredEnvVars) {
    if (!env[variable]) {
      console.error(`❌ Missing required environment variable: ${variable}`)
      errors++
    }
  }

  // Security Checks
  console.log('\n2. Running security checks...')
  try {
    execSync('npm audit', { stdio: 'inherit' })
    console.log('✅ Security audit passed')
  } catch (error) {
    console.error('❌ Security vulnerabilities found')
    errors++
  }

  // Database Migrations
  console.log('\n3. Checking database migrations...')
  try {
    execSync('npx prisma migrate status', { stdio: 'inherit' })
    console.log('✅ Database migrations are up to date')
  } catch (error) {
    console.error('❌ Database migrations need attention')
    errors++
  }

  // Type Checking
  console.log('\n4. Running type checks...')
  try {
    execSync('npm run type-check', { stdio: 'inherit' })
    console.log('✅ Type checking passed')
  } catch (error) {
    console.error('❌ Type checking failed')
    errors++
  }

  // Test Coverage
  console.log('\n5. Checking test coverage...')
  try {
    execSync('npm run test:coverage', { stdio: 'inherit' })
    const coverage = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'))
    if (coverage.total.lines.pct < 70) {
      console.error('❌ Test coverage below 70%')
      errors++
    } else {
      console.log('✅ Test coverage satisfactory')
    }
  } catch (error) {
    console.error('❌ Test coverage check failed')
    errors++
  }

  // Build Check
  console.log('\n6. Testing production build...')
  try {
    execSync('npm run build', { stdio: 'inherit' })
    console.log('✅ Build successful')
  } catch (error) {
    console.error('❌ Build failed')
    errors++
  }

  // API Health Checks
  console.log('\n7. Running API health checks...')
  for (const route of criticalRoutes) {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}${route}`)
      if (!response.ok) throw new Error(`Failed to fetch ${route}`)
      console.log(`✅ ${route} is responding`)
    } catch (error) {
      console.error(`❌ ${route} is not responding`)
      errors++
    }
  }

  // Performance Checks
  console.log('\n8. Running performance checks...')
  try {
    execSync('npx lighthouse --quiet --chrome-flags="--headless" ' + env.NEXT_PUBLIC_APP_URL)
    console.log('✅ Performance checks completed')
  } catch (error) {
    console.error('❌ Performance checks failed')
    errors++
  }

  // Final Report
  console.log('\n📋 Pre-launch Check Summary:')
  if (errors === 0) {
    console.log('✅ All checks passed! Ready for deployment.')
  } else {
    console.error(`❌ Found ${errors} issues that need to be fixed before deployment.`)
    process.exit(1)
  }
}

runChecks() 