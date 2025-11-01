# Deployment Guide - Kreativpique

This guide covers deploying the Kreativpique AI Search Optimization Platform to production.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Supabase Project**: Create a project at [supabase.com](https://supabase.com)
3. **Required API Keys**: Obtain keys for all integrated services
4. **Domain Name**: Optional custom domain for production

## Environment Variables

Before deploying, ensure all environment variables are configured in Vercel:

### Required Variables

```bash
# Application
VITE_ENVIRONMENT=production
VITE_APP_URL=https://your-domain.vercel.app

# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Platforms
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=AIza...
PERPLEXITY_API_KEY=pplx-...

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...
VITE_FROM_EMAIL=noreply@yourdomain.com

# Analytics
VITE_POSTHOG_KEY=phc_...
VITE_SENTRY_DSN=https://...

# Security
JWT_SECRET=your-secure-jwt-secret
ENCRYPTION_KEY=your-32-byte-encryption-key
```

### Optional Variables

```bash
# Advertising Platforms
GOOGLE_ADS_CLIENT_ID=your_google_ads_client_id
GOOGLE_ADS_CLIENT_SECRET=your_google_ads_client_secret
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Feature Flags
ENABLE_AI_CITATION_CHECKING=true
ENABLE_AUTOMATED_REPORTS=true
ENABLE_ADVANCED_ANALYTICS=true
```

## Deployment Steps

### 1. Prepare Supabase

1. **Database Setup**:
   ```bash
   # Run the schema SQL in Supabase SQL Editor
   cat supabase/schema.sql | pbcopy
   # Paste and execute in Supabase Dashboard > SQL Editor
   ```

2. **Edge Functions**:
   ```bash
   # Deploy Edge Functions using Supabase CLI
   npx supabase functions deploy check-citations
   npx supabase functions deploy scrape-website
   npx supabase functions deploy generate-report
   npx supabase functions deploy process-webhooks
   ```

3. **Storage Buckets**:
   ```bash
   # Create storage buckets in Supabase Dashboard
   # - reports (for generated reports)
   # - uploads (for user uploads)
   ```

### 2. Configure Authentication

1. **Enable Auth Providers** in Supabase Dashboard:
   - Email/Password
   - Google OAuth (optional)
   - GitHub OAuth (optional)

2. **Set Auth Redirect URLs**:
   - Development: `http://localhost:5173/auth/callback`
   - Production: `https://your-domain.vercel.app/auth/callback`

### 3. Deploy to Vercel

1. **Connect Repository**:
   ```bash
   # Using Vercel CLI
   npm i -g vercel
   vercel login
   vercel --prod
   ```

2. **Or via Vercel Dashboard**:
   - Import Git repository
   - Configure build settings:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Configure Environment Variables**:
   - Go to Vercel Dashboard > Project > Settings > Environment Variables
   - Add all required variables from `.env.example`

### 4. Set Up Domain & SSL

1. **Custom Domain** (optional):
   - Add domain in Vercel Dashboard > Project > Settings > Domains
   - Configure DNS records as instructed

2. **SSL Certificate**:
   - Automatic via Vercel (Let's Encrypt)

### 5. Configure External Services

#### Stripe Webhooks
1. Create webhook endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
2. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

#### PostHog Setup
1. Create project at posthog.com
2. Configure CORS origins to include your domain
3. Set up dashboards for key metrics

#### Sentry Setup
1. Create project at sentry.io
2. Configure error alerting rules
3. Set up performance monitoring

## Security Checklist

### Pre-Deployment

- [ ] All environment variables use production values
- [ ] No test/development keys in production
- [ ] JWT secret is cryptographically secure (32+ characters)
- [ ] Encryption key is exactly 32 bytes
- [ ] Database RLS policies are enabled and tested
- [ ] API rate limiting is configured
- [ ] CORS origins are restricted to your domain

### Post-Deployment

- [ ] SSL certificate is active
- [ ] Security headers are configured (via vercel.json)
- [ ] Webhooks are secured with proper signature verification
- [ ] Error monitoring is capturing issues
- [ ] Analytics are tracking user behavior
- [ ] Database backups are scheduled in Supabase
- [ ] Stripe test mode is disabled

## Monitoring & Maintenance

### Health Checks

The application includes built-in health monitoring:

- **Database**: Connection and query performance
- **AI APIs**: Response times and error rates
- **Email Service**: Delivery success rates
- **Payment Processing**: Transaction monitoring

### Performance Monitoring

Key metrics to track:

- **Page Load Times**: < 3 seconds
- **API Response Times**: < 500ms
- **Citation Check Times**: < 2 seconds
- **Error Rates**: < 1%
- **Uptime**: > 99.9%

### Regular Maintenance

- **Weekly**: Review error logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Audit user permissions and access logs
- **Annually**: Rotate encryption keys and API tokens

## Scaling Considerations

### Database Scaling

- **Connection Pooling**: Configured in Supabase
- **Read Replicas**: Available in Supabase Pro
- **Indexing**: Monitor query performance and add indexes as needed

### API Rate Limits

- **Supabase**: 500 requests/second (Pro plan)
- **OpenAI**: 3,500 requests/minute (default)
- **Stripe**: 100 requests/second
- **Resend**: 10,000 emails/month (free tier)

### Cost Optimization

- **Supabase**: Monitor database size and API usage
- **Vercel**: Optimize function execution time
- **AI APIs**: Implement request caching
- **Storage**: Regular cleanup of old reports and logs

## Troubleshooting

### Common Issues

1. **Build Failures**:
   ```bash
   # Check for TypeScript errors
   npm run type-check

   # Verify environment variables
   vercel env ls
   ```

2. **Database Connection Issues**:
   - Verify Supabase URL and keys
   - Check RLS policies
   - Review connection limits

3. **Authentication Problems**:
   - Verify redirect URLs
   - Check JWT secret configuration
   - Review user permissions

4. **Payment Processing Issues**:
   - Verify Stripe webhook signatures
   - Check test vs live mode
   - Review webhook event handling

### Debugging

Enable detailed logging:

```bash
# Set in Vercel environment variables
DEBUG=true
LOG_LEVEL=debug
```

Access logs:
- **Vercel**: Dashboard > Functions > View logs
- **Supabase**: Dashboard > Logs
- **Sentry**: Error tracking and performance monitoring

## Support

For deployment support:

1. Check this documentation
2. Review error logs in Sentry
3. Contact the development team
4. Create an issue in the repository

## Rollback Procedure

If deployment issues occur:

1. **Vercel**: Revert to previous deployment in dashboard
2. **Database**: Use Supabase point-in-time recovery
3. **Environment**: Verify all variables are correct
4. **Monitor**: Check error rates return to normal

Remember to test rollback procedures in staging before production deployment.