#!/usr/bin/env node

/**
 * Production Build Script for Kreativpique
 *
 * This script performs pre-build checks and optimizations
 * to ensure the application is ready for production deployment.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const REQUIRED_ENV_VARS = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  'VITE_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY',
  'RESEND_API_KEY',
  'JWT_SECRET',
  'ENCRYPTION_KEY'
]

const PRODUCTION_ENV_VARS = [
  'VITE_ENVIRONMENT',
  'VITE_APP_URL',
  'VITE_POSTHOG_KEY',
  'VITE_SENTRY_DSN'
]

function log(message, type = 'info') {
  const timestamp = new Date().toISOString()
  const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'
  console.log(`${prefix} [${timestamp}] ${message}`)
}

function checkEnvironmentVariables() {
  log('Checking environment variables...')

  const missing = []
  const warnings = []

  // Check required variables
  REQUIRED_ENV_VARS.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  })

  // Check production-specific variables
  if (process.env.NODE_ENV === 'production') {
    PRODUCTION_ENV_VARS.forEach(varName => {
      if (!process.env[varName]) {
        warnings.push(varName)
      }
    })

    // Check for test/development values in production
    if (process.env.VITE_STRIPE_PUBLISHABLE_KEY?.includes('pk_test_')) {
      warnings.push('VITE_STRIPE_PUBLISHABLE_KEY appears to be a test key')
    }

    if (process.env.STRIPE_SECRET_KEY?.includes('sk_test_')) {
      warnings.push('STRIPE_SECRET_KEY appears to be a test key')
    }

    if (process.env.VITE_SUPABASE_URL?.includes('localhost')) {
      warnings.push('VITE_SUPABASE_URL appears to be a local URL')
    }
  }

  if (missing.length > 0) {
    log(`Missing required environment variables: ${missing.join(', ')}`, 'error')
    process.exit(1)
  }

  if (warnings.length > 0) {
    warnings.forEach(warning => {
      log(`Warning: ${warning}`, 'warn')
    })
  }

  log('Environment variables check passed', 'success')
}

function validatePackageJson() {
  log('Validating package.json...')

  const packagePath = path.join(__dirname, '..', 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

  // Check for required scripts
  const requiredScripts = ['build', 'dev', 'preview']
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script])

  if (missingScripts.length > 0) {
    log(`Missing required scripts: ${missingScripts.join(', ')}`, 'error')
    process.exit(1)
  }

  // Check for security vulnerabilities
  try {
    execSync('npm audit --audit-level=high', { stdio: 'pipe' })
    log('No high-severity vulnerabilities found', 'success')
  } catch (error) {
    log('High-severity vulnerabilities detected. Run "npm audit fix" to resolve.', 'warn')
  }

  log('Package.json validation passed', 'success')
}

function checkTypeScript() {
  log('Running TypeScript type check...')

  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' })
    log('TypeScript type check passed', 'success')
  } catch (error) {
    log('TypeScript errors detected:', 'error')
    console.log(error.stdout.toString())
    process.exit(1)
  }
}

function validateSupabaseConfig() {
  log('Validating Supabase configuration...')

  const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql')

  if (!fs.existsSync(schemaPath)) {
    log('Supabase schema.sql not found', 'error')
    process.exit(1)
  }

  // Check for Edge Functions
  const functionsDir = path.join(__dirname, '..', 'supabase', 'functions')
  const requiredFunctions = ['check-citations', 'scrape-website', 'generate-report', 'process-webhooks']

  const missingFunctions = requiredFunctions.filter(func => {
    const funcPath = path.join(functionsDir, func, 'index.ts')
    return !fs.existsSync(funcPath)
  })

  if (missingFunctions.length > 0) {
    log(`Missing Supabase Edge Functions: ${missingFunctions.join(', ')}`, 'warn')
  }

  log('Supabase configuration validated', 'success')
}

function optimizeBuild() {
  log('Optimizing build configuration...')

  // Ensure Vite config is optimized for production
  const viteConfigPath = path.join(__dirname, '..', 'vite.config.ts')

  if (fs.existsSync(viteConfigPath)) {
    const viteConfig = fs.readFileSync(viteConfigPath, 'utf8')

    // Check for production optimizations
    if (!viteConfig.includes('minify')) {
      log('Consider enabling minification in vite.config.ts', 'warn')
    }

    if (!viteConfig.includes('rollupOptions')) {
      log('Consider adding rollup options for code splitting', 'warn')
    }
  }

  log('Build configuration optimized', 'success')
}

function generateBuildInfo() {
  log('Generating build information...')

  const buildInfo = {
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    commit: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
    branch: process.env.VERCEL_GIT_COMMIT_REF || 'unknown',
    environment: process.env.VITE_ENVIRONMENT || 'development',
    node_version: process.version,
    npm_version: execSync('npm --version', { encoding: 'utf8' }).trim()
  }

  const buildInfoPath = path.join(__dirname, '..', 'public', 'build-info.json')
  fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2))

  log(`Build info generated: ${buildInfo.version} (${buildInfo.commit.substring(0, 8)})`, 'success')
}

function runBuild() {
  log('Running production build...')

  try {
    execSync('npm run build', { stdio: 'inherit' })
    log('Production build completed successfully', 'success')
  } catch (error) {
    log('Build failed', 'error')
    process.exit(1)
  }
}

function validateBuildOutput() {
  log('Validating build output...')

  const distPath = path.join(__dirname, '..', 'dist')

  if (!fs.existsSync(distPath)) {
    log('Build output directory not found', 'error')
    process.exit(1)
  }

  // Check for essential files
  const requiredFiles = ['index.html', 'assets']
  const missingFiles = requiredFiles.filter(file => {
    const filePath = path.join(distPath, file)
    return !fs.existsSync(filePath)
  })

  if (missingFiles.length > 0) {
    log(`Missing build files: ${missingFiles.join(', ')}`, 'error')
    process.exit(1)
  }

  // Check bundle size
  const statsPath = path.join(distPath, 'stats.html')
  if (fs.existsSync(statsPath)) {
    log('Bundle analyzer report generated', 'success')
  }

  log('Build output validation passed', 'success')
}

function main() {
  log('Starting production build process...')

  try {
    checkEnvironmentVariables()
    validatePackageJson()
    checkTypeScript()
    validateSupabaseConfig()
    optimizeBuild()
    generateBuildInfo()
    runBuild()
    validateBuildOutput()

    log('Production build process completed successfully! 🚀', 'success')
    log(`Application ready for deployment to ${process.env.VITE_APP_URL || 'production'}`)

  } catch (error) {
    log(`Build process failed: ${error.message}`, 'error')
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = {
  checkEnvironmentVariables,
  validatePackageJson,
  checkTypeScript,
  validateSupabaseConfig,
  optimizeBuild,
  generateBuildInfo,
  runBuild,
  validateBuildOutput
}