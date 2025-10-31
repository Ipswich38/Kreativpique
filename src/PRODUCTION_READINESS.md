# kreativpique - Production Readiness Guide

## 🎯 Executive Summary

This document outlines the complete roadmap to make kreativpique 100% production-ready. The platform requires backend infrastructure, third-party integrations, APIs, and deployment configurations.

---

## 📋 Table of Contents

1. [Backend Infrastructure](#1-backend-infrastructure)
2. [AI Platform APIs](#2-ai-platform-apis)
3. [Advertising Platform APIs](#3-advertising-platform-apis)
4. [Web Scraping Infrastructure](#4-web-scraping-infrastructure)
5. [Email Service](#5-email-service)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [Analytics & Monitoring](#7-analytics--monitoring)
8. [Payment Processing](#8-payment-processing)
9. [Deployment & Hosting](#9-deployment--hosting)
10. [Security & Compliance](#10-security--compliance)
11. [Implementation Roadmap](#11-implementation-roadmap)

---

## 1. Backend Infrastructure

### Supabase (Recommended)

**Why:** Provides PostgreSQL database, authentication, real-time subscriptions, storage, and edge functions in one platform.

**Setup:**
```bash
npm install @supabase/supabase-js
```

**Database Schema:**

```sql
-- Agencies Table
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  subscription_tier TEXT DEFAULT 'free', -- free, pro, enterprise
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users Table (Agency Team Members)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'member', -- owner, admin, member
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients Table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  target_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Monitoring Queries Table
CREATE TABLE monitoring_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  platforms TEXT[], -- ['chatgpt', 'perplexity', 'claude', 'gemini']
  check_frequency TEXT DEFAULT 'daily', -- hourly, daily, weekly
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Citations Table
CREATE TABLE citations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  query_id UUID REFERENCES monitoring_queries(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- chatgpt, perplexity, claude, gemini
  query TEXT NOT NULL,
  position INTEGER,
  context TEXT,
  sentiment TEXT, -- positive, neutral, negative
  url TEXT,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ad Campaigns Table
CREATE TABLE ad_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL, -- google, meta, linkedin
  campaign_type TEXT NOT NULL, -- search, display, social, video
  budget DECIMAL(10,2),
  spent DECIMAL(10,2) DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- active, paused, completed
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scrape Jobs Table
CREATE TABLE scrape_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, running, completed, failed
  pages_scraped INTEGER DEFAULT 0,
  duration_minutes INTEGER,
  last_run TIMESTAMP WITH TIME ZONE,
  schedule TEXT, -- cron expression
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email Campaigns Table
CREATE TABLE email_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_id TEXT,
  recipient_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft', -- draft, sending, sent, failed
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API Keys Table (Encrypted)
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  service TEXT NOT NULL, -- openai, anthropic, google, perplexity, etc.
  encrypted_key TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitoring_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrape_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Example for clients table)
CREATE POLICY "Users can view their agency's clients"
  ON clients FOR SELECT
  USING (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Users can create clients for their agency"
  ON clients FOR INSERT
  WITH CHECK (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));
```

**Environment Variables:**
```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key # Server-side only
```

---

## 2. AI Platform APIs

### 2.1 OpenAI API (ChatGPT)

**Purpose:** Monitor ChatGPT citations and run test queries

**Setup:**
```bash
npm install openai
```

**API Key:** https://platform.openai.com/api-keys

**Implementation:**
```typescript
// Server-side function (Supabase Edge Function or API route)
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function checkChatGPTCitation(query: string, clientName: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "user", content: query }
    ],
  });
  
  const content = response.choices[0].message.content;
  
  // Parse response to detect if client is mentioned
  const mentioned = content.toLowerCase().includes(clientName.toLowerCase());
  const position = extractPosition(content, clientName);
  
  return {
    mentioned,
    position,
    context: content,
    timestamp: new Date()
  };
}
```

**Cost:** ~$0.01 per 1K tokens (GPT-4 Turbo)

**Rate Limits:** 10,000 RPM (requests per minute) on tier 1

---

### 2.2 Anthropic API (Claude)

**Purpose:** Monitor Claude citations

**Setup:**
```bash
npm install @anthropic-ai/sdk
```

**API Key:** https://console.anthropic.com/

**Implementation:**
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function checkClaudeCitation(query: string, clientName: string) {
  const message = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: [
      { role: "user", content: query }
    ],
  });
  
  const content = message.content[0].text;
  // Similar parsing logic
}
```

**Cost:** ~$0.015 per 1K tokens (Claude 3 Opus)

---

### 2.3 Google Gemini API

**Purpose:** Monitor Gemini citations

**Setup:**
```bash
npm install @google/generative-ai
```

**API Key:** https://makersuite.google.com/app/apikey

**Implementation:**
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function checkGeminiCitation(query: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(query);
  const response = await result.response;
  const text = response.text();
  
  // Parse for citations
}
```

**Cost:** Free tier available, then pay-as-you-go

---

### 2.4 Perplexity API

**Purpose:** Monitor Perplexity citations

**API Key:** https://www.perplexity.ai/settings/api

**Implementation:**
```typescript
async function checkPerplexityCitation(query: string) {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'pplx-70b-online',
      messages: [
        { role: 'user', content: query }
      ]
    })
  });
  
  const data = await response.json();
  // Parse citations from response
}
```

**Cost:** $1 per 1M tokens

---

## 3. Advertising Platform APIs

### 3.1 Google Ads API

**Purpose:** Manage and track Google Ads campaigns

**Documentation:** https://developers.google.com/google-ads/api/docs/start

**Setup:**
```bash
npm install google-ads-api
```

**Requirements:**
- Google Ads account
- Google Cloud Project
- OAuth 2.0 credentials
- Developer token

**Implementation:**
```typescript
import { GoogleAdsApi } from 'google-ads-api';

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});

async function getCampaignStats(customerId: string) {
  const customer = client.Customer({
    customer_id: customerId,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
  });

  const campaigns = await customer.query(`
    SELECT
      campaign.id,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign
    WHERE campaign.status = 'ENABLED'
  `);

  return campaigns;
}
```

---

### 3.2 Meta Marketing API (Facebook/Instagram)

**Purpose:** Manage Meta Ads campaigns

**Documentation:** https://developers.facebook.com/docs/marketing-apis

**Setup:**
```bash
npm install facebook-nodejs-business-sdk
```

**Requirements:**
- Facebook Business account
- App ID and App Secret
- Access token with ads_management permission

**Implementation:**
```typescript
import { FacebookAdsApi, AdAccount } from 'facebook-nodejs-business-sdk';

const api = FacebookAdsApi.init(process.env.FACEBOOK_ACCESS_TOKEN);

async function getMetaCampaigns(adAccountId: string) {
  const account = new AdAccount(adAccountId);
  const campaigns = await account.getCampaigns(
    ['id', 'name', 'status', 'objective'],
    { limit: 100 }
  );
  
  return campaigns;
}
```

---

### 3.3 LinkedIn Marketing API

**Purpose:** Manage LinkedIn Ads campaigns

**Documentation:** https://docs.microsoft.com/en-us/linkedin/marketing/

**Requirements:**
- LinkedIn Marketing Developer Platform access
- OAuth 2.0 application
- Access token with r_ads and rw_ads permissions

**Implementation:**
```typescript
async function getLinkedInCampaigns(accessToken: string) {
  const response = await fetch(
    'https://api.linkedin.com/v2/adCampaignsV2?q=search',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    }
  );
  
  return await response.json();
}
```

---

## 4. Web Scraping Infrastructure

### 4.1 Puppeteer/Playwright

**Purpose:** Browser automation for JavaScript-heavy sites

**Setup:**
```bash
npm install puppeteer
# or
npm install playwright
```

**Implementation:**
```typescript
import puppeteer from 'puppeteer';

async function scrapeWebsite(url: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  const data = await page.evaluate(() => {
    // Extract data from page
    return {
      title: document.title,
      headings: Array.from(document.querySelectorAll('h1, h2')).map(h => h.textContent),
      content: document.body.innerText
    };
  });
  
  await browser.close();
  return data;
}
```

**Note:** For production, run in serverless environment (e.g., Browserless.io or separate scraping service)

---

### 4.2 Cheerio

**Purpose:** Fast HTML parsing for static sites

**Setup:**
```bash
npm install cheerio axios
```

**Implementation:**
```typescript
import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrapeStaticSite(url: string) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  
  const extractedData = {
    title: $('title').text(),
    headings: $('h1, h2').map((i, el) => $(el).text()).get(),
    links: $('a').map((i, el) => $(el).attr('href')).get()
  };
  
  return extractedData;
}
```

---

### 4.3 Proxy Services (Optional but Recommended)

**Purpose:** Avoid IP blocking and rate limiting

**Recommended Services:**
- **Bright Data** (formerly Luminati): https://brightdata.com/
- **Oxylabs**: https://oxylabs.io/
- **ScraperAPI**: https://www.scraperapi.com/

**ScraperAPI Example:**
```typescript
const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;

async function scrapeWithProxy(url: string) {
  const apiUrl = `http://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(url)}`;
  const response = await fetch(apiUrl);
  return await response.text();
}
```

**Cost:** $49-$249/month for 100K-1M requests

---

## 5. Email Service

### 5.1 Resend (Recommended for React)

**Purpose:** Send transactional and marketing emails

**Setup:**
```bash
npm install resend
npm install react-email @react-email/components
```

**API Key:** https://resend.com/api-keys

**Implementation:**
```typescript
import { Resend } from 'resend';
import { EmailTemplate } from './emails/CitationReport';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendCitationReport(to: string, data: any) {
  const { data: email, error } = await resend.emails.send({
    from: 'kreativpique <reports@kreativpique.com>',
    to: [to],
    subject: 'Your Monthly AI Citation Report',
    react: EmailTemplate({ data }),
  });

  return { email, error };
}
```

**Email Template (React Email):**
```tsx
// emails/CitationReport.tsx
import { Html, Head, Body, Container, Text, Button } from '@react-email/components';

export function EmailTemplate({ data }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc' }}>
        <Container>
          <Text>Hi {data.clientName},</Text>
          <Text>Your AI search presence this month:</Text>
          <Text>Total Citations: {data.citations}</Text>
          <Text>Average Position: #{data.avgPosition}</Text>
          <Button href={data.dashboardUrl}>View Full Report</Button>
        </Container>
      </Body>
    </Html>
  );
}
```

**Cost:** Free tier: 3,000 emails/month, then $20/month for 50K emails

---

### 5.2 Alternative: SendGrid

**Setup:**
```bash
npm install @sendgrid/mail
```

**Implementation:**
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to: string, subject: string, html: string) {
  const msg = {
    to,
    from: 'reports@kreativpique.com',
    subject,
    html,
  };

  await sgMail.send(msg);
}
```

**Cost:** Free tier: 100 emails/day, then $15/month for 40K emails

---

## 6. Authentication & Authorization

### Supabase Auth (Recommended)

**Features:**
- Email/password authentication
- OAuth providers (Google, GitHub, etc.)
- Magic links
- JWT tokens
- Row Level Security integration

**Implementation:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Sign up
async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

// Sign in
async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

// Get current user
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Sign out
async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
```

**Multi-tenancy (Agency + Clients):**
```typescript
// After signup, create agency and link user
async function createAgency(userId: string, agencyData: any) {
  // Create agency
  const { data: agency, error: agencyError } = await supabase
    .from('agencies')
    .insert({
      name: agencyData.name,
      email: agencyData.email
    })
    .select()
    .single();

  if (agencyError) throw agencyError;

  // Link user to agency
  const { error: userError } = await supabase
    .from('users')
    .insert({
      id: userId,
      agency_id: agency.id,
      email: agencyData.email,
      role: 'owner'
    });

  if (userError) throw userError;

  return agency;
}
```

---

## 7. Analytics & Monitoring

### 7.1 PostHog (Product Analytics)

**Purpose:** Track user behavior, feature usage, funnels

**Setup:**
```bash
npm install posthog-js
```

**Implementation:**
```typescript
import posthog from 'posthog-js';

posthog.init(process.env.VITE_POSTHOG_KEY, {
  api_host: 'https://app.posthog.com'
});

// Track events
posthog.capture('client_added', {
  client_name: 'Dubai Marina Properties',
  industry: 'Real Estate'
});

// Identify users
posthog.identify(userId, {
  email: user.email,
  agency: agency.name
});
```

**Cost:** Free tier: 1M events/month, then $0.00031/event

---

### 7.2 Sentry (Error Tracking)

**Purpose:** Monitor errors and performance issues

**Setup:**
```bash
npm install @sentry/react
```

**Implementation:**
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Wrap your app
export default Sentry.withProfiler(App);
```

**Cost:** Free tier: 5K errors/month, then $26/month for 50K errors

---

### 7.3 Vercel Analytics (If using Vercel)

**Setup:**
```bash
npm install @vercel/analytics
```

**Implementation:**
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

**Cost:** Free on Pro plan

---

## 8. Payment Processing

### Stripe

**Purpose:** Subscription billing for agency plans

**Setup:**
```bash
npm install @stripe/stripe-js stripe
```

**Pricing Tiers:**
```typescript
const PRICING_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: {
      clients: 3,
      queries: 10,
      citations_per_month: 100,
      team_members: 1
    }
  },
  pro: {
    name: 'Pro',
    price: 99,
    features: {
      clients: 25,
      queries: 100,
      citations_per_month: 5000,
      team_members: 5,
      email_campaigns: true,
      priority_support: true
    }
  },
  enterprise: {
    name: 'Enterprise',
    price: 299,
    features: {
      clients: -1, // unlimited
      queries: -1,
      citations_per_month: -1,
      team_members: -1,
      white_label: true,
      dedicated_support: true,
      custom_integrations: true
    }
  }
};
```

**Implementation:**
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Create checkout session
async function createCheckoutSession(agencyId: string, priceId: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/pricing`,
    metadata: {
      agency_id: agencyId,
    },
  });

  return session;
}

// Webhook to handle subscription events
async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Update agency subscription in database
      await updateAgencySubscription(
        session.metadata.agency_id,
        session.subscription as string
      );
      break;
      
    case 'customer.subscription.deleted':
      // Downgrade to free tier
      break;
  }
}
```

**Cost:** 2.9% + $0.30 per transaction

---

## 9. Deployment & Hosting

### 9.1 Vercel (Recommended for Frontend)

**Features:**
- Automatic deployments from Git
- Edge functions
- Analytics
- Preview deployments

**Setup:**
```bash
npm install -g vercel
vercel login
vercel
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

**Cost:** Free for hobby projects, $20/month for Pro

---

### 9.2 Supabase (Backend)

**Features:**
- PostgreSQL database
- Authentication
- Edge Functions (Deno)
- Storage
- Real-time subscriptions

**Supabase Edge Function Example:**
```typescript
// supabase/functions/check-citations/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // Get active queries
  const { data: queries } = await supabase
    .from('monitoring_queries')
    .select('*')
    .eq('is_active', true);

  // Check each query across platforms
  for (const query of queries) {
    // Call AI APIs and save citations
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

**Deploy:**
```bash
supabase functions deploy check-citations
```

**Cron Jobs (for scheduled checks):**
```sql
-- Using pg_cron extension
SELECT cron.schedule(
  'check-citations-hourly',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url:='https://your-project.supabase.co/functions/v1/check-citations',
    headers:='{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
  );
  $$
);
```

**Cost:** Free tier: 500MB database, then $25/month for Pro

---

### 9.3 Alternative: Railway/Render (For Scraping Service)

**Purpose:** Separate service for heavy scraping tasks

**Railway Setup:**
```yaml
# railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

**Cost:** $5/month minimum

---

## 10. Security & Compliance

### 10.1 Environment Variables

**Never commit:**
- API keys
- Database credentials
- Stripe keys
- OAuth secrets

**Use:**
- `.env.local` for local development
- Vercel/Supabase dashboard for production

---

### 10.2 API Key Encryption

**Store encrypted in database:**
```typescript
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 bytes
const IV_LENGTH = 16;

function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string): string {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
```

---

### 10.3 Rate Limiting

**Protect API endpoints:**
```typescript
// Using Upstash Redis for rate limiting
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

async function checkRateLimit(identifier: string) {
  const { success } = await ratelimit.limit(identifier);
  return success;
}
```

---

### 10.4 GDPR Compliance

**Requirements:**
- Privacy policy
- Cookie consent
- Data export functionality
- Right to deletion
- Data processing agreements

**Implementation:**
```typescript
// Data export
async function exportUserData(userId: string) {
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('agency_id', userId);

  const { data: citations } = await supabase
    .from('citations')
    .select('*')
    .in('client_id', clients.map(c => c.id));

  return {
    clients,
    citations,
    // ... other data
  };
}

// Data deletion
async function deleteUserData(userId: string) {
  // Cascade delete handled by database foreign keys
  await supabase
    .from('agencies')
    .delete()
    .eq('id', userId);
}
```

---

## 11. Implementation Roadmap

### Phase 1: Core Infrastructure (Week 1-2)
- [ ] Set up Supabase project
- [ ] Create database schema
- [ ] Implement authentication
- [ ] Deploy to Vercel
- [ ] Set up environment variables

### Phase 2: AI Platform Integration (Week 3-4)
- [ ] Integrate OpenAI API (ChatGPT)
- [ ] Integrate Anthropic API (Claude)
- [ ] Integrate Google Gemini API
- [ ] Integrate Perplexity API
- [ ] Create citation detection logic
- [ ] Set up Supabase Edge Functions for scheduled checks

### Phase 3: Client Management (Week 5)
- [ ] Implement client CRUD operations
- [ ] Add monitoring queries functionality
- [ ] Create citation tracking system
- [ ] Build real-time updates

### Phase 4: Advertising Integration (Week 6-7)
- [ ] Integrate Google Ads API
- [ ] Integrate Meta Marketing API
- [ ] Integrate LinkedIn Marketing API
- [ ] Create campaign tracking dashboard

### Phase 5: Web Scraping (Week 8)
- [ ] Set up scraping infrastructure
- [ ] Implement Puppeteer/Cheerio
- [ ] Add proxy support
- [ ] Create scraping scheduler

### Phase 6: Email Campaigns (Week 9)
- [ ] Integrate Resend/SendGrid
- [ ] Create email templates
- [ ] Build campaign management
- [ ] Add analytics tracking

### Phase 7: Analytics & Monitoring (Week 10)
- [ ] Integrate PostHog
- [ ] Set up Sentry
- [ ] Create analytics dashboard
- [ ] Add performance monitoring

### Phase 8: Payment & Billing (Week 11)
- [ ] Integrate Stripe
- [ ] Create pricing tiers
- [ ] Implement subscription management
- [ ] Add usage-based limits

### Phase 9: Testing & Optimization (Week 12)
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Load testing

### Phase 10: Launch (Week 13)
- [ ] Beta testing
- [ ] Documentation
- [ ] Marketing site
- [ ] Public launch

---

## 📊 Estimated Monthly Costs

| Service | Tier | Cost |
|---------|------|------|
| Supabase | Pro | $25 |
| Vercel | Pro | $20 |
| OpenAI API | Usage | $50-200 |
| Anthropic API | Usage | $30-150 |
| Google Gemini | Usage | $20-100 |
| Perplexity API | Usage | $10-50 |
| Resend | Growth | $20 |
| PostHog | Growth | $0-50 |
| Sentry | Team | $26 |
| Stripe | Transaction fees | Variable |
| **Total** | | **$201-641/month** |

*Costs will scale with usage and number of customers*

---

## 🎯 Next Steps

1. **Immediate:** Set up Supabase project and database schema
2. **Week 1:** Implement authentication and deploy basic frontend
3. **Week 2:** Integrate first AI API (OpenAI) and test citation detection
4. **Week 3:** Build out client management with real backend
5. **Week 4+:** Follow implementation roadmap

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Stripe Integration Guide](https://stripe.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [React Email](https://react.email/)
- [PostHog Documentation](https://posthog.com/docs)

---

**Last Updated:** October 31, 2025
