# Product Requirements Document (PRD)
## kreativpique - AI Search Optimization Platform

**Version:** 1.0  
**Last Updated:** October 31, 2025  
**Document Owner:** Product Team  
**Status:** Active Development

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Goals and Objectives](#3-goals-and-objectives)
4. [User Personas](#4-user-personas)
5. [User Stories](#5-user-stories)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Technical Architecture](#8-technical-architecture)
9. [Data Models](#9-data-models)
10. [API Specifications](#10-api-specifications)
11. [UI/UX Requirements](#11-uiux-requirements)
12. [Security & Privacy](#12-security--privacy)
13. [Success Metrics](#13-success-metrics)
14. [Release Plan](#14-release-plan)
15. [Future Roadmap](#15-future-roadmap)

---

## 1. Executive Summary

### 1.1 Product Vision

kreativpique is a SaaS platform that enables marketing agencies to monitor, track, and optimize their clients' presence across AI search platforms (ChatGPT, Claude, Perplexity, Gemini). The platform provides automated citation tracking, performance analytics, campaign management, and client reporting capabilities.

### 1.2 Problem Statement

**Current Pain Points:**
- Marketing agencies have no visibility into how AI platforms cite their clients
- Manual monitoring of AI responses is time-consuming and inconsistent
- No centralized dashboard for tracking AI search performance
- Clients increasingly ask questions to AI instead of traditional search engines
- Agencies lack tools to prove ROI of AI optimization efforts

**Impact:**
- Lost business opportunities when clients aren't mentioned in AI responses
- Inability to capitalize on the shift to AI-assisted search
- Competitive disadvantage for forward-thinking agencies
- No data to support pricing for AI optimization services

### 1.3 Proposed Solution

A multi-tenant SaaS platform that:
- Automatically monitors AI platforms for client mentions
- Tracks citation frequency, position, and sentiment
- Provides analytics and competitive intelligence
- Integrates with advertising platforms (Google Ads, Meta, LinkedIn)
- Generates automated client reports
- Enables scalable growth for marketing agencies

### 1.4 Target Market

**Primary:** Marketing agencies serving 5-50 clients
**Secondary:** In-house marketing teams at mid-large enterprises
**Initial Focus:** Luxury sector agencies (aviation, real estate) in Dubai/UAE

**Market Size:**
- 200,000+ marketing agencies globally
- 50,000+ agencies in North America
- 5,000+ agencies in UAE/Middle East
- TAM: $2.5B+ annually

### 1.5 Success Criteria

**Year 1:**
- 100 paying agencies
- 2,000 monitored clients
- 500,000+ citations tracked/month
- $200K ARR
- <5% monthly churn

---

## 2. Product Overview

### 2.1 Core Features

1. **Client Management** - Add, organize, and manage agency clients
2. **AI Citation Monitoring** - Automated tracking across ChatGPT, Claude, Perplexity, Gemini
3. **Analytics Dashboard** - Performance metrics, trends, and insights
4. **Advertising Integration** - Google Ads, Meta Ads, LinkedIn Ads campaign tracking
5. **Email Campaigns** - Automated client reporting and updates
6. **Web Scraping** - Content extraction for optimization
7. **Multi-User Collaboration** - Team access with role-based permissions

### 2.2 Platform Capabilities

**For Agencies:**
- Monitor unlimited clients (plan-dependent)
- Centralized dashboard for all client activity
- White-label reporting
- Team collaboration tools
- Client portal access
- API access for custom integrations

**For Agency Clients:**
- Read-only dashboard access
- Monthly performance reports
- Citation alerts
- Competitive insights
- ROI tracking

### 2.3 Differentiators

1. **First-Mover Advantage** - Only platform focusing on AI search optimization
2. **Multi-Platform Coverage** - Track all major AI assistants in one place
3. **Agency-Focused** - Built for scalability and multi-client management
4. **Luxury Market Expertise** - Pre-built libraries for high-value sectors
5. **Automated Workflows** - Minimal manual intervention required

---

## 3. Goals and Objectives

### 3.1 Business Goals

**Primary Goals:**
1. Acquire 100 paying agencies in Year 1
2. Achieve $200K ARR by end of Year 1
3. Maintain <5% monthly churn rate
4. Achieve 4.5+ customer satisfaction score (out of 5)

**Secondary Goals:**
1. Build brand awareness as AI optimization leader
2. Establish partnerships with 3+ major marketing platforms
3. Create content library (50+ resources) for SEO and thought leadership
4. Launch API for developer ecosystem

### 3.2 Product Goals

**Q1 2025:**
- ✅ Launch MVP with core features
- ✅ Onboard first 10 agencies
- ✅ Achieve 10,000 citations tracked
- ✅ 99.9% uptime

**Q2 2025:**
- Implement white-label branding
- Add competitive intelligence features
- Launch client portal access
- Reach 50 agencies

**Q3 2025:**
- Full advertising platform integrations
- Advanced analytics and AI insights
- Mobile app (iOS/Android)
- Reach 75 agencies

**Q4 2025:**
- Enterprise features (SSO, custom contracts)
- API v1.0 public launch
- International expansion (EU, APAC)
- Reach 100 agencies

### 3.3 User Goals

**Agency Owners:**
- Monitor all clients from single dashboard
- Prove ROI to clients with data
- Differentiate from competitors
- Scale revenue without proportional team growth

**Account Managers:**
- Quickly identify client opportunities
- Automate monthly reporting
- Respond to alerts in real-time
- Track performance trends

**Agency Clients:**
- Understand AI search presence
- See competitive positioning
- Receive actionable insights
- Track marketing ROI

---

## 4. User Personas

### 4.1 Primary Persona: Agency Owner (Sarah)

**Demographics:**
- Age: 35-50
- Role: Founder/CEO of marketing agency
- Company Size: 5-20 employees, 10-30 clients
- Location: Dubai, UAE
- Income: $150K-500K/year

**Goals:**
- Grow agency revenue 30%+ annually
- Retain high-value clients
- Stay ahead of marketing trends
- Reduce manual work through automation

**Pain Points:**
- Clients asking about AI search presence
- No tools to monitor AI citations
- Difficult to prove ROI of content marketing
- Competitors not offering AI services (yet)

**Tech Savviness:** High (early adopter)

**Quote:** *"My clients keep asking if ChatGPT mentions them. I need a way to track this and turn it into a service offering."*

---

### 4.2 Secondary Persona: Account Manager (James)

**Demographics:**
- Age: 25-35
- Role: Senior Account Manager
- Manages: 8-12 client accounts
- Location: Dubai, UAE
- Income: $60K-90K/year

**Goals:**
- Keep clients happy and retained
- Deliver reports efficiently
- Identify upsell opportunities
- Hit monthly KPIs

**Pain Points:**
- Time-consuming manual reporting
- Clients want more data-driven insights
- Hard to track AI mentions manually
- Needs to respond quickly to client questions

**Tech Savviness:** Medium-High

**Quote:** *"I spend 10 hours a week on reports. I need automation so I can focus on strategy."*

---

### 4.3 Tertiary Persona: Enterprise Client (Michael)

**Demographics:**
- Age: 40-55
- Role: Marketing Director at luxury brand
- Company Size: 100-500 employees
- Location: Dubai, UAE
- Budget: $50K-200K/month marketing spend

**Goals:**
- Maximize brand visibility
- Stay ahead of competitors
- Justify marketing spend to C-suite
- Understand new marketing channels (AI)

**Pain Points:**
- Unsure how AI affects brand discovery
- Needs data to justify budgets
- Wants competitive intelligence
- Requires professional reporting for stakeholders

**Tech Savviness:** Medium

**Quote:** *"I need to show my CEO that our $100K/month is working. AI search data would be compelling."*

---

### 4.4 Edge Persona: Solo Consultant (Maria)

**Demographics:**
- Age: 30-40
- Role: Independent marketing consultant
- Clients: 3-5 at a time
- Location: Remote/Global
- Income: $80K-150K/year

**Goals:**
- Offer premium services
- Automate client management
- Compete with larger agencies
- Work smarter, not harder

**Pain Points:**
- Limited time and resources
- Needs to punch above weight
- Can't afford expensive tools
- Wants professional client deliverables

**Tech Savviness:** High

**Quote:** *"I need enterprise-level tools at solo consultant prices."*

---

## 5. User Stories

### 5.1 Epic 1: Client Management

**US-1.1:** As an agency owner, I want to add new clients to the platform so that I can monitor their AI search presence.

**Acceptance Criteria:**
- Form with fields: name, industry, website, target keywords
- Auto-save functionality
- Duplicate detection
- Success confirmation message

**Priority:** P0 (Must Have)

---

**US-1.2:** As an account manager, I want to organize clients by industry/status so that I can quickly find relevant accounts.

**Acceptance Criteria:**
- Filter by industry, status, date added
- Search by client name
- Sort by various fields
- Save filter preferences

**Priority:** P1 (Should Have)

---

**US-1.3:** As an agency owner, I want to assign team members to specific clients so that responsibilities are clear.

**Acceptance Criteria:**
- Assign/unassign team members
- Role-based permissions
- Notification to assigned members
- Activity log

**Priority:** P1 (Should Have)

---

### 5.2 Epic 2: AI Citation Monitoring

**US-2.1:** As an account manager, I want to create monitoring queries for my clients so that I can track AI citations.

**Acceptance Criteria:**
- Add query text
- Select platforms to monitor (ChatGPT, Claude, Perplexity, Gemini)
- Set check frequency (hourly, daily, weekly)
- Activate/deactivate queries

**Priority:** P0 (Must Have)

---

**US-2.2:** As an account manager, I want to see all citations for a client so that I can report on their AI presence.

**Acceptance Criteria:**
- List view of all citations
- Filter by platform, date, sentiment
- Sort by position, date
- Export to CSV

**Priority:** P0 (Must Have)

---

**US-2.3:** As an agency owner, I want to receive alerts when high-value citations are detected so that I can respond quickly.

**Acceptance Criteria:**
- Real-time notifications (in-app, email, WhatsApp)
- Configurable alert thresholds
- Quiet hours setting
- Alert history

**Priority:** P1 (Should Have)

---

**US-2.4:** As an account manager, I want to see citation sentiment (positive/neutral/negative) so that I can identify reputation issues.

**Acceptance Criteria:**
- Automated sentiment analysis
- Visual indicators (color-coded)
- Sentiment trends over time
- Alert on negative sentiment

**Priority:** P1 (Should Have)

---

### 5.3 Epic 3: Analytics & Reporting

**US-3.1:** As an agency owner, I want to see an overview dashboard of all clients so that I can monitor overall performance.

**Acceptance Criteria:**
- Total citations across all clients
- Top performing clients
- Recent alerts
- Trend indicators

**Priority:** P0 (Must Have)

---

**US-3.2:** As an account manager, I want to view detailed analytics for a specific client so that I can prepare monthly reports.

**Acceptance Criteria:**
- Citation trends over time
- Platform distribution
- Top performing queries
- Competitive comparison
- Exportable charts

**Priority:** P0 (Must Have)

---

**US-3.3:** As an agency client, I want to receive monthly performance reports via email so that I stay informed.

**Acceptance Criteria:**
- Automated email on 1st of month
- Professional formatting
- Key metrics highlighted
- Link to full dashboard
- PDF attachment

**Priority:** P1 (Should Have)

---

### 5.4 Epic 4: Advertising Integration

**US-4.1:** As an account manager, I want to connect Google Ads accounts so that I can correlate ad performance with AI citations.

**Acceptance Criteria:**
- OAuth authentication
- Import campaigns automatically
- Display metrics (spend, clicks, conversions)
- Sync on schedule

**Priority:** P2 (Nice to Have)

---

**US-4.2:** As an agency owner, I want to see ROI across all marketing channels (AI + Ads) so that I can optimize spend.

**Acceptance Criteria:**
- Combined dashboard view
- ROI calculations
- Cost per acquisition by channel
- Recommendations

**Priority:** P2 (Nice to Have)

---

### 5.5 Epic 5: Team Collaboration

**US-5.1:** As an agency owner, I want to invite team members to the platform so that they can manage clients.

**Acceptance Criteria:**
- Email invitation system
- Role selection (owner, admin, member)
- Pending invitations list
- Resend/cancel invitations

**Priority:** P0 (Must Have)

---

**US-5.2:** As a team member, I want to see only my assigned clients so that my dashboard is focused.

**Acceptance Criteria:**
- Filter: "My Clients" view
- Notification for new assignments
- Dashboard shows only relevant data
- Option to view all clients (admin)

**Priority:** P1 (Should Have)

---

### 5.6 Epic 6: White-Label & Client Portal

**US-6.1:** As an agency owner, I want to customize the platform branding so that clients see my agency logo.

**Acceptance Criteria:**
- Upload logo
- Set primary/accent colors
- Custom domain support
- Preview before applying

**Priority:** P2 (Nice to Have)

---

**US-6.2:** As an agency owner, I want to give clients read-only access to their data so that they can self-serve.

**Acceptance Criteria:**
- Generate client login
- Client sees only their data
- Cannot edit anything
- Can export reports

**Priority:** P2 (Nice to Have)

---

## 6. Functional Requirements

### 6.1 Authentication & Authorization

**FR-1.1: User Registration**
- Email + password signup
- Email verification required
- OAuth options (Google, GitHub)
- Password strength requirements (min 8 chars, 1 number, 1 special char)

**FR-1.2: Login**
- Email + password authentication
- "Remember me" option
- Forgot password flow
- Session timeout after 7 days inactive

**FR-1.3: Multi-Tenancy**
- Each agency is isolated tenant
- Data segregation enforced at database level
- Row-level security policies

**FR-1.4: Role-Based Access Control (RBAC)**

| Role | Permissions |
|------|-------------|
| Owner | Full access, billing, team management |
| Admin | All features except billing |
| Member | Manage assigned clients only |
| Client Viewer | Read-only access to own data |

---

### 6.2 Client Management

**FR-2.1: Create Client**
- Required fields: Name, Industry, Website
- Optional fields: Target keywords, contact info, notes
- Validation: Unique name per agency, valid URL format
- Auto-generate client ID

**FR-2.2: Edit Client**
- Update any field except ID
- Track modification history
- Last modified timestamp and user

**FR-2.3: Delete Client**
- Soft delete (mark as inactive)
- Cascade: Archive associated queries, citations
- Confirmation dialog required
- Restore within 30 days

**FR-2.4: Client List View**
- Paginated table (25 per page)
- Sort by: Name, Industry, Date Added, Citations Count
- Filter by: Industry, Status, Team Member
- Search: Name, Website
- Bulk actions: Export, Delete

---

### 6.3 Query Management

**FR-3.1: Create Monitoring Query**
- Required: Query text, Client selection, Platforms
- Optional: Check frequency, Priority
- Validation: Min 3 words, max 200 chars
- Support for multiple languages

**FR-3.2: Query Execution**
- Scheduled checks based on frequency
- Parallel execution across platforms
- Retry logic (3 attempts with exponential backoff)
- Timeout: 30 seconds per platform

**FR-3.3: Query Results Processing**
- Parse AI response for client mentions
- Extract context (100 chars before/after mention)
- Determine position (1-10 or not mentioned)
- Calculate sentiment score (-1 to +1)
- Store in citations table

---

### 6.4 Citation Tracking

**FR-4.1: Citation Data Model**
```typescript
interface Citation {
  id: string;
  clientId: string;
  queryId: string;
  platform: 'chatgpt' | 'claude' | 'perplexity' | 'gemini';
  query: string;
  position: number; // 1-10 or null
  context: string;
  fullResponse: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number; // -1 to +1
  url?: string;
  detectedAt: Date;
  createdAt: Date;
}
```

**FR-4.2: Citation Detection Logic**
- Exact match: Client name appears verbatim
- Fuzzy match: Account for typos (Levenshtein distance ≤ 2)
- Domain match: Website URL mentioned
- Keyword match: Target keywords + client context

**FR-4.3: Position Calculation**
- Count number of entities mentioned before client
- Position 1 = first mentioned entity
- Position null = not mentioned in response

**FR-4.4: Sentiment Analysis**
- Use OpenAI/Claude API for sentiment classification
- Positive: Recommendation, praise, positive attributes
- Neutral: Factual mention without judgment
- Negative: Warning, criticism, negative context
- Score: -1 (very negative) to +1 (very positive)

---

### 6.5 Analytics

**FR-5.1: Dashboard Metrics**

**Agency Overview:**
- Total citations (all clients, current month)
- Active clients count
- Active queries count
- Avg position across all citations
- Citation trend (vs previous month)

**Client-Specific:**
- Citations this month
- Avg position
- Top performing query
- Platform distribution
- Sentiment breakdown
- Week-over-week change

**FR-5.2: Charts & Visualizations**

1. **Citation Trends (Line Chart)**
   - X-axis: Date (daily/weekly/monthly)
   - Y-axis: Citation count
   - Multiple series: One per platform
   - Date range selector

2. **Platform Distribution (Pie/Donut Chart)**
   - Segments: ChatGPT, Claude, Perplexity, Gemini
   - Show percentage and count
   - Clickable to filter

3. **Top Content Performance (Bar Chart)**
   - Top 10 queries by citation count
   - Color-coded by performance
   - Click to view query details

4. **Competitive Analysis (Stacked Bar Chart)**
   - Compare client vs competitors
   - Citation share percentage
   - Position comparison

**FR-5.3: Data Export**
- Export formats: CSV, Excel, PDF
- Date range selection
- Include charts in PDF export
- Schedule automated exports

---

### 6.6 Advertising Integration

**FR-6.1: Google Ads Connection**
- OAuth 2.0 authentication
- Select accounts to track
- Auto-import campaigns
- Sync frequency: Daily
- Metrics: Impressions, Clicks, Spend, Conversions

**FR-6.2: Meta Ads Connection**
- Facebook OAuth
- Select ad accounts
- Import campaigns
- Metrics: Reach, Engagement, Spend, Results

**FR-6.3: LinkedIn Ads Connection**
- LinkedIn OAuth
- Import campaigns
- Metrics: Impressions, Clicks, Spend, Conversions

**FR-6.4: Campaign Dashboard**
- List all campaigns across platforms
- Filter by platform, client, status
- Sort by spend, performance
- Performance metrics table

---

### 6.7 Email Campaigns

**FR-7.1: Email Templates**
- Pre-built templates: Monthly Report, Weekly Update, Alert
- Customizable subject, body, footer
- Variable injection: {clientName}, {citations}, etc.
- Preview before sending

**FR-7.2: Campaign Creation**
- Select recipients (clients, team, custom list)
- Choose template
- Schedule or send immediately
- Track: Sent, Opened, Clicked

**FR-7.3: Automated Reports**
- Schedule: Monthly (1st of month), Weekly (Mondays)
- Auto-populate with latest data
- Attach PDF report
- Unsubscribe option

---

### 6.8 Web Scraping

**FR-8.1: Scrape Job Creation**
- Input: URL, scrape depth, selectors
- Schedule: One-time, recurring (cron)
- Rate limiting: Max 1 req/second
- Respect robots.txt

**FR-8.2: Scraping Execution**
- Use Puppeteer for JavaScript sites
- Use Cheerio for static sites
- Extract: Title, headings, content, links
- Store results in database

**FR-8.3: Scrape Results**
- View extracted data
- Export to JSON, CSV
- Use for content optimization
- Track changes over time

---

## 7. Non-Functional Requirements

### 7.1 Performance

**NFR-1: Response Time**
- Page load: < 2 seconds (p95)
- API calls: < 500ms (p95)
- Dashboard refresh: < 1 second
- Chart rendering: < 1 second

**NFR-2: Scalability**
- Support 10,000 concurrent users
- Process 100,000 citations per day
- Store 10M+ citations
- Handle 1,000 queries per minute

**NFR-3: Database**
- Query execution: < 100ms (p95)
- Index all foreign keys
- Optimize for read-heavy workload
- Connection pooling (min 10, max 100 connections)

---

### 7.2 Reliability

**NFR-4: Uptime**
- Target: 99.9% uptime (≈ 43 minutes downtime per month)
- Measure with external monitoring (Pingdom/UptimeRobot)
- Automated failover for critical services

**NFR-5: Error Handling**
- Graceful degradation when AI APIs fail
- Retry logic with exponential backoff
- User-friendly error messages
- Log all errors to Sentry

**NFR-6: Data Integrity**
- Database transactions for critical operations
- Regular backups (hourly incremental, daily full)
- Backup retention: 30 days
- Test restore process monthly

---

### 7.3 Security

**NFR-7: Authentication**
- Bcrypt password hashing (10 rounds)
- JWT tokens for session management
- Token expiration: 7 days
- Refresh token rotation

**NFR-8: Authorization**
- Row-level security (RLS) policies
- API endpoints protected by auth middleware
- Validate user permissions on every request

**NFR-9: Data Protection**
- Encrypt sensitive data at rest (AES-256)
- TLS 1.3 for data in transit
- API keys encrypted in database
- No logging of sensitive data

**NFR-10: Compliance**
- GDPR-compliant data handling
- Right to be forgotten (delete account)
- Data export functionality
- Privacy policy and terms of service

---

### 7.4 Usability

**NFR-11: Accessibility**
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatible
- Sufficient color contrast (4.5:1 minimum)

**NFR-12: Mobile Responsiveness**
- Mobile-first design
- Touch-optimized UI (min 44px tap targets)
- Responsive breakpoints: 320px, 768px, 1024px, 1440px
- Progressive Web App (PWA) support

**NFR-13: Browser Support**
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

### 7.5 Maintainability

**NFR-14: Code Quality**
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Unit test coverage: > 80%
- Integration test coverage: > 60%

**NFR-15: Documentation**
- API documentation (OpenAPI/Swagger)
- Component documentation (Storybook)
- README for each major module
- Deployment runbook

**NFR-16: Monitoring**
- Application performance monitoring (APM)
- Error tracking (Sentry)
- User analytics (PostHog)
- Infrastructure monitoring (Vercel/Supabase dashboards)

---

## 8. Technical Architecture

### 8.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Web App    │  │  Mobile App  │  │  Client API  │     │
│  │  (React +    │  │  (React      │  │  (REST/      │     │
│  │   Tailwind)  │  │   Native)    │  │   GraphQL)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
├────────────────────────────────��────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Vercel Edge Functions                  │    │
│  │  (Next.js API Routes / Serverless Functions)        │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Supabase Edge Functions (Deno)            │    │
│  │  • Citation Checker  • Sentiment Analyzer           │    │
│  │  • Email Sender      • Report Generator             │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        Service Layer                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ OpenAI   │  │Anthropic │  │ Google   │  │Perplexity│  │
│  │   API    │  │   API    │  │   API    │  │   API    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────���────┐  │
│  │ Google   │  │   Meta   │  │ LinkedIn │  │  Resend  │  │
│  │ Ads API  │  │ Ads API  │  │ Ads API  │  │  Email   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         Data Layer                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │          Supabase PostgreSQL Database              │    │
│  │  • Agencies  • Users  • Clients  • Queries         │    │
│  │  • Citations • Campaigns • Jobs                    │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Supabase Storage                       │    │
│  │  • User uploads  • Reports  • Exports              │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Vercel  │  │ Supabase │  │  Sentry  │  │ PostHog  │  │
│  │ Hosting  │  │ Backend  │  │  Error   │  │Analytics │  │
│  │          │  │          │  │ Tracking │  │          │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Technology Stack

**Frontend:**
- **Framework:** React 18 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn/ui (Radix UI primitives)
- **Charts:** Recharts
- **State Management:** React Context API + Hooks
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

**Backend:**
- **Platform:** Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- **Edge Functions:** Deno runtime
- **API Style:** REST + PostgreSQL RLS
- **Real-time:** Supabase Realtime (WebSockets)

**Infrastructure:**
- **Hosting:** Vercel (frontend + serverless functions)
- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth (JWT)
- **Storage:** Supabase Storage (S3-compatible)
- **CDN:** Vercel Edge Network

**External Services:**
- **AI Platforms:** OpenAI, Anthropic, Google, Perplexity APIs
- **Advertising:** Google Ads API, Meta Marketing API, LinkedIn API
- **Email:** Resend (transactional + marketing)
- **Analytics:** PostHog (product analytics)
- **Monitoring:** Sentry (error tracking)
- **Payments:** Stripe (subscriptions)

**Development Tools:**
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions + Vercel auto-deploy
- **Testing:** Vitest (unit), Playwright (E2E)
- **Linting:** ESLint + Prettier
- **Type Checking:** TypeScript strict mode

---

### 8.3 Data Flow

**Citation Monitoring Flow:**

```
1. Cron Job triggers (hourly/daily)
   ↓
2. Supabase Edge Function: check-citations
   ↓
3. Fetch active queries from database
   ↓
4. For each query:
   a. Call AI platform API (ChatGPT/Claude/etc.)
   b. Parse response for client mentions
   c. Extract context, position, sentiment
   d. Save citation to database
   ↓
5. If high-value citation (score > 70):
   a. Send WhatsApp alert
   b. Send email notification
   c. Create in-app notification
   ↓
6. Update analytics aggregations
   ↓
7. Return success/failure status
```

**User Authentication Flow:**

```
1. User enters email + password
   ↓
2. Frontend sends to Supabase Auth
   ↓
3. Supabase validates credentials
   ↓
4. Returns JWT access token + refresh token
   ↓
5. Frontend stores tokens in localStorage
   ↓
6. All API calls include Authorization header
   ↓
7. Supabase validates JWT on each request
   ↓
8. RLS policies enforce data access
```

---

## 9. Data Models

### 9.1 Entity Relationship Diagram (ERD)

```
┌─────────────────┐
│    agencies     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ email           │
│ subscription    │──┐
│ created_at      │  │
│ updated_at      │  │
└─────────────────┘  │
                      │
         ┌────────────┘
         │
         │  ┌─────────────────┐
         │  │     users       │
         │  ├─────────────────┤
         └──│ agency_id (FK)  │
            │ id (PK)         │
            │ email           │
            │ full_name       │
            │ role            │
            │ created_at      │
            └─────────────────┘
                      │
         ┌────────────┘
         │
         │  ┌─────────────────┐
         │  │    clients      │
         │  ├─────────────────┤
         └──│ agency_id (FK)  │
            │ id (PK)         │──┐
            │ name            │  │
            │ industry        │  │
            │ website         │  │
            │ target_keywords │  │
            │ created_at      │  │
            └─────────────────┘  │
                      │           │
         ┌────────────┘           │
         │                        │
         │  ┌─────────────────┐  │
         │  │ monitoring_     │  │
         │  │   queries       │  │
         │  ├─────────────────┤  │
         └──│ client_id (FK)  │  │
            │ id (PK)         │──┐│
            │ query           │  ││
            │ platforms       │  ││
            │ frequency       │  ││
            │ is_active       │  ││
            │ created_at      │  ││
            └─────────────────┘  ││
                      │           ││
         ┌────────────┴───────────┘│
         │  ┌─────────────────┐   │
         │  │   citations     │   │
         │  ├─────────────────┤   │
         ├──│ client_id (FK)  │   │
         └──│ query_id (FK)   │   │
            │ id (PK)         │   │
            │ platform        │   │
            │ query           │   │
            │ position        │   │
            │ context         │   │
            │ sentiment       │   │
            │ detected_at     │   │
            └─────────────────┘   │
                                  │
            ┌─────────────────┐  │
            │ ad_campaigns    │  │
            ├─────────────────┤  │
            │ client_id (FK)  │──┘
            │ id (PK)         │
            │ name            │
            │ platform        │
            │ budget          │
            │ spent           │
            │ impressions     │
            │ clicks          │
            │ conversions     │
            │ created_at      │
            └─────────────────┘
```

### 9.2 Table Schemas

**agencies**
```sql
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  subscription_tier TEXT DEFAULT 'free', -- free, pro, enterprise
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_agencies_email ON agencies(email);
```

**users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member', -- owner, admin, member, client_viewer
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_agency_id ON users(agency_id);
CREATE INDEX idx_users_email ON users(email);
```

**clients**
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  target_keywords TEXT[],
  contact_name TEXT,
  contact_email TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_clients_agency_id ON clients(agency_id);
CREATE INDEX idx_clients_industry ON clients(industry);
CREATE INDEX idx_clients_is_active ON clients(is_active);
```

**monitoring_queries**
```sql
CREATE TABLE monitoring_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  platforms TEXT[] DEFAULT ARRAY['chatgpt', 'claude', 'perplexity', 'gemini'],
  check_frequency TEXT DEFAULT 'daily', -- hourly, daily, weekly
  priority TEXT DEFAULT 'medium', -- high, medium, low
  is_active BOOLEAN DEFAULT true,
  last_checked TIMESTAMP WITH TIME ZONE,
  next_check TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_queries_client_id ON monitoring_queries(client_id);
CREATE INDEX idx_queries_is_active ON monitoring_queries(is_active);
CREATE INDEX idx_queries_next_check ON monitoring_queries(next_check);
```

**citations**
```sql
CREATE TABLE citations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  query_id UUID REFERENCES monitoring_queries(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- chatgpt, claude, perplexity, gemini
  query TEXT NOT NULL,
  position INTEGER, -- 1-10 or null if not mentioned
  context TEXT,
  full_response TEXT,
  sentiment TEXT, -- positive, neutral, negative
  sentiment_score DECIMAL(3,2), -- -1.00 to 1.00
  url TEXT,
  metadata JSONB, -- flexible storage for platform-specific data
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_citations_client_id ON citations(client_id);
CREATE INDEX idx_citations_query_id ON citations(query_id);
CREATE INDEX idx_citations_platform ON citations(platform);
CREATE INDEX idx_citations_detected_at ON citations(detected_at DESC);
CREATE INDEX idx_citations_sentiment ON citations(sentiment);
```

**ad_campaigns**
```sql
CREATE TABLE ad_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL, -- google, meta, linkedin
  campaign_type TEXT NOT NULL, -- search, display, social, video
  external_id TEXT, -- ID from ad platform
  budget DECIMAL(10,2),
  spent DECIMAL(10,2) DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- active, paused, completed
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  keywords TEXT[],
  last_synced TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_campaigns_client_id ON ad_campaigns(client_id);
CREATE INDEX idx_campaigns_platform ON ad_campaigns(platform);
CREATE INDEX idx_campaigns_status ON ad_campaigns(status);
```

**email_campaigns**
```sql
CREATE TABLE email_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_id TEXT,
  recipient_list JSONB, -- array of email addresses
  recipient_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  bounced_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft', -- draft, scheduled, sending, sent, failed
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_email_campaigns_agency_id ON email_campaigns(agency_id);
CREATE INDEX idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_email_campaigns_scheduled_at ON email_campaigns(scheduled_at);
```

**scrape_jobs**
```sql
CREATE TABLE scrape_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, running, completed, failed
  pages_scraped INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  error_message TEXT,
  result_data JSONB, -- scraped content
  schedule TEXT, -- cron expression for recurring jobs
  last_run TIMESTAMP WITH TIME ZONE,
  next_run TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_scrape_jobs_client_id ON scrape_jobs(client_id);
CREATE INDEX idx_scrape_jobs_status ON scrape_jobs(status);
CREATE INDEX idx_scrape_jobs_next_run ON scrape_jobs(next_run);
```

**api_keys** (encrypted)
```sql
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  service TEXT NOT NULL, -- openai, anthropic, google, perplexity, google_ads, meta, linkedin
  encrypted_key TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_api_keys_agency_id ON api_keys(agency_id);
CREATE INDEX idx_api_keys_service ON api_keys(service);
```

---

### 9.3 Row Level Security (RLS) Policies

**agencies**
```sql
-- Users can only view their own agency
CREATE POLICY "Users can view own agency"
  ON agencies FOR SELECT
  USING (id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

-- Only owners can update agency
CREATE POLICY "Owners can update agency"
  ON agencies FOR UPDATE
  USING (id IN (
    SELECT agency_id FROM users 
    WHERE id = auth.uid() AND role = 'owner'
  ));
```

**clients**
```sql
-- Users can view clients from their agency
CREATE POLICY "Users can view agency clients"
  ON clients FOR SELECT
  USING (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

-- Users can create clients for their agency
CREATE POLICY "Users can create clients"
  ON clients FOR INSERT
  WITH CHECK (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

-- Users can update clients from their agency
CREATE POLICY "Users can update agency clients"
  ON clients FOR UPDATE
  USING (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

-- Only owners/admins can delete clients
CREATE POLICY "Admins can delete clients"
  ON clients FOR DELETE
  USING (agency_id IN (
    SELECT agency_id FROM users 
    WHERE id = auth.uid() AND role IN ('owner', 'admin')
  ));
```

**citations**
```sql
-- Users can view citations for their agency's clients
CREATE POLICY "Users can view agency citations"
  ON citations FOR SELECT
  USING (client_id IN (
    SELECT c.id FROM clients c
    JOIN users u ON c.agency_id = u.agency_id
    WHERE u.id = auth.uid()
  ));

-- System can insert citations (service role)
CREATE POLICY "Service role can insert citations"
  ON citations FOR INSERT
  WITH CHECK (true);
```

---

## 10. API Specifications

### 10.1 REST API Endpoints

**Base URL:** `https://api.kreativpique.com/v1`

**Authentication:** Bearer token in Authorization header

```
Authorization: Bearer <jwt_token>
```

---

### 10.2 Clients API

**GET /clients**

Get list of clients for authenticated user's agency.

**Query Parameters:**
- `page` (integer, default: 1)
- `limit` (integer, default: 25, max: 100)
- `industry` (string, optional filter)
- `is_active` (boolean, optional filter)
- `sort` (string, default: "created_at", options: name, industry, created_at)
- `order` (string, default: "desc", options: asc, desc)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "1FLT",
      "industry": "Aviation",
      "website": "https://www.1flt.com",
      "target_keywords": ["private jet Dubai", "luxury aviation"],
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:00:00Z",
      "stats": {
        "citations_this_month": 47,
        "avg_position": 2.3
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 25,
    "total": 3,
    "total_pages": 1
  }
}
```

---

**POST /clients**

Create a new client.

**Request Body:**
```json
{
  "name": "1FLT",
  "industry": "Aviation",
  "website": "https://www.1flt.com",
  "target_keywords": ["private jet Dubai", "VIP aviation UAE"],
  "contact_name": "John Doe",
  "contact_email": "john@1flt.com",
  "notes": "Focus on luxury market"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "1FLT",
    "industry": "Aviation",
    "website": "https://www.1flt.com",
    "target_keywords": ["private jet Dubai", "VIP aviation UAE"],
    "created_at": "2025-10-31T12:00:00Z"
  }
}
```

---

**GET /clients/:id**

Get single client by ID.

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "1FLT",
    "industry": "Aviation",
    "website": "https://www.1flt.com",
    "target_keywords": ["private jet Dubai"],
    "stats": {
      "total_citations": 347,
      "citations_this_month": 47,
      "avg_position": 2.3,
      "top_platform": "chatgpt",
      "sentiment_breakdown": {
        "positive": 89,
        "neutral": 8,
        "negative": 3
      }
    },
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

---

**PUT /clients/:id**

Update client.

**Request Body:**
```json
{
  "name": "1FLT - Updated",
  "target_keywords": ["private jet Dubai", "luxury aviation UAE", "VIP charter"]
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "1FLT - Updated",
    "updated_at": "2025-10-31T14:00:00Z"
  }
}
```

---

**DELETE /clients/:id**

Soft delete client (mark as inactive).

**Response:**
```json
{
  "success": true,
  "message": "Client archived successfully"
}
```

---

### 10.3 Queries API

**GET /clients/:clientId/queries**

Get monitoring queries for a client.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "query": "Best private jet charter Dubai",
      "platforms": ["chatgpt", "claude", "perplexity", "gemini"],
      "check_frequency": "daily",
      "is_active": true,
      "last_checked": "2025-10-31T10:00:00Z",
      "stats": {
        "total_citations": 23,
        "avg_position": 2.1
      }
    }
  ]
}
```

---

**POST /queries**

Create monitoring query.

**Request Body:**
```json
{
  "client_id": "uuid",
  "query": "VIP aviation services Dubai",
  "platforms": ["chatgpt", "perplexity"],
  "check_frequency": "daily",
  "priority": "high"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "query": "VIP aviation services Dubai",
    "platforms": ["chatgpt", "perplexity"],
    "is_active": true,
    "created_at": "2025-10-31T12:00:00Z"
  }
}
```

---

### 10.4 Citations API

**GET /citations**

Get citations for authenticated user's agency.

**Query Parameters:**
- `client_id` (uuid, optional filter)
- `platform` (string, optional: chatgpt, claude, perplexity, gemini)
- `sentiment` (string, optional: positive, neutral, negative)
- `date_from` (ISO date)
- `date_to` (ISO date)
- `page` (integer)
- `limit` (integer)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "client_id": "uuid",
      "client_name": "1FLT",
      "query": "Best private jet charter Dubai",
      "platform": "chatgpt",
      "position": 2,
      "context": "1FLT offers premium private jet charter services...",
      "sentiment": "positive",
      "sentiment_score": 0.85,
      "detected_at": "2025-10-31T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 347
  }
}
```

---

**GET /citations/:id**

Get single citation details.

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "client": {
      "id": "uuid",
      "name": "1FLT"
    },
    "query": "Best private jet charter Dubai",
    "platform": "chatgpt",
    "position": 2,
    "context": "For private jet services in Dubai, 1FLT offers...",
    "full_response": "[full AI response text]",
    "sentiment": "positive",
    "sentiment_score": 0.85,
    "url": "https://chat.openai.com/share/xyz",
    "detected_at": "2025-10-31T10:30:00Z"
  }
}
```

---

### 10.5 Analytics API

**GET /analytics/overview**

Get agency-wide analytics overview.

**Query Parameters:**
- `date_from` (ISO date)
- `date_to` (ISO date)

**Response:**
```json
{
  "data": {
    "total_citations": 198,
    "total_clients": 3,
    "avg_position": 2.1,
    "platform_distribution": {
      "chatgpt": 89,
      "perplexity": 56,
      "claude": 34,
      "gemini": 19
    },
    "sentiment_breakdown": {
      "positive": 167,
      "neutral": 28,
      "negative": 3
    },
    "trend": {
      "citations_change": 23.5,
      "position_change": -0.3
    }
  }
}
```

---

**GET /analytics/clients/:clientId**

Get detailed analytics for specific client.

**Query Parameters:**
- `date_from` (ISO date)
- `date_to` (ISO date)

**Response:**
```json
{
  "data": {
    "client": {
      "id": "uuid",
      "name": "1FLT"
    },
    "metrics": {
      "total_citations": 47,
      "avg_position": 2.3,
      "top_query": "private jet Dubai",
      "citation_trend": [
        {"date": "2025-10-01", "count": 8},
        {"date": "2025-10-02", "count": 12}
      ]
    },
    "platform_performance": [
      {
        "platform": "chatgpt",
        "citations": 23,
        "avg_position": 2.1
      }
    ],
    "top_queries": [
      {
        "query": "private jet Dubai",
        "citations": 15,
        "avg_position": 1.8
      }
    ]
  }
}
```

---

### 10.6 Webhooks

**POST /webhooks/stripe**

Handle Stripe subscription events.

**Headers:**
- `stripe-signature`: Webhook signature for verification

**Events:**
- `checkout.session.completed` - New subscription created
- `customer.subscription.updated` - Subscription changed
- `customer.subscription.deleted` - Subscription canceled
- `invoice.payment_succeeded` - Payment successful
- `invoice.payment_failed` - Payment failed

---

**POST /webhooks/citations**

Receive citation detection notifications (for integrations).

**Request Body:**
```json
{
  "event": "citation_detected",
  "data": {
    "citation_id": "uuid",
    "client_id": "uuid",
    "platform": "chatgpt",
    "position": 1,
    "lead_score": 85
  }
}
```

---

## 11. UI/UX Requirements

### 11.1 Design System

**Color Palette:**
```css
/* Primary Colors */
--primary-bg: #0f1419;        /* Dark background */
--secondary-bg: #1f2937;      /* Card background */
--tertiary-bg: #2c3e50;       /* Elevated cards */

/* Accent Colors */
--emerald-500: #10b981;       /* Primary accent */
--blue-500: #3b82f6;          /* Info */
--purple-500: #8b5cf6;        /* Secondary accent */
--orange-500: #f59e0b;        /* Warning */
--red-500: #ef4444;           /* Error */

/* Text Colors */
--text-primary: #ffffff;      /* Primary text */
--text-secondary: #9ca3af;    /* Secondary text */
--text-tertiary: #6b7280;     /* Tertiary text */

/* Border Colors */
--border-default: #374151;    /* Default borders */
--border-hover: #4b5563;      /* Hover state */
```

**Typography:**
```css
/* Font Family */
--font-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;

/* Font Sizes - Applied via HTML elements, not Tailwind classes */
h1 { font-size: 2.25rem; line-height: 2.5rem; }      /* 36px */
h2 { font-size: 1.875rem; line-height: 2.25rem; }    /* 30px */
h3 { font-size: 1.5rem; line-height: 2rem; }         /* 24px */
h4 { font-size: 1.25rem; line-height: 1.75rem; }     /* 20px */
body { font-size: 1rem; line-height: 1.5rem; }       /* 16px */
small { font-size: 0.875rem; line-height: 1.25rem; } /* 14px */
```

**Spacing Scale:**
- 4px increments (0.25rem base unit)
- Common: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

**Border Radius:**
- sm: 4px
- md: 6px
- lg: 8px
- xl: 12px
- 2xl: 16px
- full: 9999px

---

### 11.2 Component Library

**Buttons:**
```tsx
// Primary Button
<Button className="bg-emerald-500 text-white hover:bg-emerald-600">
  Add Client
</Button>

// Secondary Button
<Button variant="outline" className="border-gray-700 text-white">
  Cancel
</Button>

// Sizes: sm, md (default), lg
<Button size="sm">Small</Button>
```

**Cards:**
```tsx
<div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
  <h3 className="text-white mb-4">Card Title</h3>
  <p className="text-gray-400">Card content...</p>
</div>
```

**Badges:**
```tsx
<Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
  Active
</Badge>

<Badge className="bg-red-500/20 text-red-400 border-red-500/30">
  Inactive
</Badge>
```

**Input Fields:**
```tsx
<Input 
  type="text"
  placeholder="Enter client name"
  className="bg-[#0f1419] border-gray-700 text-white"
/>
```

---

### 11.3 Responsive Design

**Breakpoints:**
```css
/* Mobile First */
sm: 640px   /* Tablet */
md: 768px   /* Small laptop */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

**Mobile Considerations:**
- Touch targets minimum 44x44px
- Bottom navigation for mobile (5 items max)
- Hamburger menu with drawer for secondary nav
- Swipe gestures for cards
- Pull-to-refresh on lists
- Large, easy-to-tap buttons

**Tablet:**
- Hybrid navigation (sidebar + bottom nav)
- 2-column layouts where appropriate
- Optimized charts for medium screens

**Desktop:**
- Full sidebar navigation
- Multi-column layouts
- Hover states
- Keyboard shortcuts
- Tooltip on hover

---

### 11.4 User Flows

**Flow 1: Add First Client**
```
1. User logs in
2. Sees empty state on dashboard
3. Clicks "Add Your First Client" CTA
4. Modal/page with form opens
5. Fills: Name, Industry, Website, Keywords
6. Clicks "Add Client"
7. Success message + redirect to client detail
8. Prompt to add first monitoring query
```

**Flow 2: Monitor Query Creation**
```
1. User on Client detail page
2. Clicks "Add Query" button
3. Modal opens
4. Enter query text
5. Select platforms (multi-select checkboxes)
6. Set frequency (dropdown)
7. Click "Start Monitoring"
8. Success message
9. Query appears in list with "Pending" status
10. First check runs within 5 minutes
11. Results appear (or "Not mentioned" message)
```

**Flow 3: Monthly Report**
```
1. Automated: 1st of each month at 9am
2. System generates report for each client
3. Email sent to:
   - Agency account manager
   - Client contact (if enabled)
4. Email contains:
   - Month summary
   - Key metrics (citations, position, trend)
   - Top performing query
   - Link to dashboard
   - PDF attachment
5. User clicks link → Dashboard
6. Can explore detailed analytics
```

---

### 11.5 Accessibility (WCAG 2.1 AA)

**Requirements:**
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader support (ARIA labels)
- ✅ Color contrast ≥ 4.5:1 for text
- ✅ Focus indicators visible
- ✅ Alt text for images
- ✅ Form labels and error messages
- ✅ Skip to main content link
- ✅ Semantic HTML

**Testing:**
- Lighthouse accessibility score ≥ 90
- axe DevTools: 0 violations
- Manual keyboard navigation test
- Screen reader test (NVDA/JAWS)

---

## 12. Security & Privacy

### 12.1 Security Measures

**Authentication:**
- Bcrypt password hashing (10 rounds minimum)
- JWT tokens with 7-day expiration
- Refresh token rotation
- Login attempt rate limiting (5 attempts per 15 min)
- Account lockout after 10 failed attempts
- Password reset via email with 1-hour token

**Authorization:**
- Row-level security (RLS) on all tables
- API endpoint authentication middleware
- Permission checks on every request
- Role-based access control (RBAC)

**Data Protection:**
- HTTPS/TLS 1.3 for all traffic
- AES-256 encryption for sensitive data at rest
- API keys encrypted in database
- No logging of passwords or API keys
- Secure cookie flags (HttpOnly, Secure, SameSite)

**API Security:**
- Rate limiting (100 req/min per user)
- CORS configuration (whitelist domains)
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS protection (Content Security Policy)
- CSRF tokens for state-changing operations

---

### 12.2 Privacy & Compliance

**GDPR Compliance:**
- ✅ Privacy policy and terms of service
- ✅ Cookie consent banner
- ✅ Data processing agreement (DPA)
- ✅ Right to access (data export)
- ✅ Right to be forgotten (account deletion)
- ✅ Data portability (JSON/CSV export)
- ✅ Consent for marketing emails

**Data Retention:**
- Active data: Retained indefinitely
- Deleted accounts: 30-day soft delete, then permanent
- Logs: 90 days
- Backups: 30 days
- Analytics: 2 years

**Third-Party Data Sharing:**
- AI platform APIs: Only query text (no user data)
- Analytics (PostHog): Anonymized usage data
- Email (Resend): Email addresses only
- Payments (Stripe): Billing info only
- No selling of user data

---

## 13. Success Metrics

### 13.1 Product Metrics

**Activation:**
- % users who add first client (Target: >80%)
- Time to first client added (Target: <5 min)
- % users who add first query (Target: >70%)
- Time to first query (Target: <10 min)

**Engagement:**
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- DAU/MAU ratio (Target: >20%)
- Sessions per user per month (Target: >10)
- Avg session duration (Target: >5 min)

**Retention:**
- Day 1 retention (Target: >70%)
- Day 7 retention (Target: >50%)
- Day 30 retention (Target: >40%)
- Month-over-month retention (Target: >85%)

**Feature Adoption:**
- % users using citations feature: >95%
- % users using analytics: >80%
- % users using email campaigns: >50%
- % users using ads integration: >30%

---

### 13.2 Business Metrics

**Revenue:**
- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- Average Revenue Per User (ARPU)
- Customer Lifetime Value (LTV)

**Growth:**
- New signups per month
- Conversion rate (free → paid)
- Upgrade rate (pro → enterprise)
- Expansion revenue (upsells)

**Customer Health:**
- Churn rate (Target: <5% monthly)
- Net Revenue Retention (NRR) (Target: >100%)
- Customer Acquisition Cost (CAC)
- LTV:CAC ratio (Target: >3:1)
- Net Promoter Score (NPS) (Target: >50)

---

### 13.3 Technical Metrics

**Performance:**
- Page load time p95 (Target: <2s)
- API response time p95 (Target: <500ms)
- Time to First Byte (TTFB) (Target: <600ms)
- Largest Contentful Paint (LCP) (Target: <2.5s)
- First Input Delay (FID) (Target: <100ms)
- Cumulative Layout Shift (CLS) (Target: <0.1)

**Reliability:**
- Uptime (Target: >99.9%)
- Error rate (Target: <0.1%)
- API success rate (Target: >99.5%)
- Background job success rate (Target: >95%)

**Monitoring:**
- Mean Time to Detection (MTTD) (Target: <5 min)
- Mean Time to Resolution (MTTR) (Target: <1 hour)
- Incident frequency (Target: <2 per month)

---

## 14. Release Plan

### 14.1 MVP (v0.1) - Weeks 1-4

**Features:**
- ✅ User authentication (email/password)
- ✅ Client management (CRUD)
- ✅ Query management (create, activate)
- ✅ Basic citation tracking (ChatGPT only)
- ✅ Simple dashboard (citation count, list)
- ✅ Mobile responsive UI

**Goal:** Validate core concept with 5 beta users

---

### 14.2 Alpha (v0.5) - Weeks 5-8

**Features:**
- ✅ Multi-platform monitoring (ChatGPT, Claude, Perplexity, Gemini)
- ✅ Analytics dashboard with charts
- ✅ Email reports (manual generation)
- ✅ Team collaboration (invite members)
- ✅ Sentiment analysis

**Goal:** Onboard 25 agencies

---

### 14.3 Beta (v0.9) - Weeks 9-12

**Features:**
- ✅ Advertising integration (Google Ads)
- ✅ Automated email campaigns
- ✅ Advanced analytics
- ✅ Export functionality
- ✅ Subscription billing (Stripe)

**Goal:** 50 paying customers, $5K MRR

---

### 14.4 v1.0 Launch - Week 13

**Features:**
- ✅ All beta features stabilized
- ✅ Documentation complete
- ✅ Help center/knowledge base
- ✅ Onboarding flow optimized
- ✅ Performance optimized (p95 <2s)
- ✅ Security audit completed

**Goal:** Public launch, 100 customers, $10K MRR

---

### 14.5 v1.1 - Months 4-6

**Features:**
- White-label branding
- Client portal access
- Competitive intelligence
- Meta & LinkedIn ads integration
- Mobile app (React Native)

**Goal:** 200 customers, $25K MRR

---

### 14.6 v2.0 - Months 7-12

**Features:**
- API v1.0 public release
- Custom integrations marketplace
- AI-powered insights and recommendations
- Multi-language support
- Enterprise SSO (SAML)
- Custom contracts and invoicing

**Goal:** 500 customers, $75K MRR

---

## 15. Future Roadmap

### 15.1 Q1 2026

**Content Optimization AI:**
- Analyze successful citations
- Suggest content improvements
- Auto-generate SEO-optimized content
- Predict citation probability

**Advanced Analytics:**
- Cohort analysis
- Funnel visualization
- Custom dashboards
- Data warehouse integration

---

### 15.2 Q2 2026

**Reputation Management:**
- Automated negative sentiment alerts
- Response suggestion AI
- Crisis management playbooks
- Social media monitoring integration

**Industry Packs:**
- Pre-built templates for verticals
- Industry-specific keyword libraries
- Benchmark data by industry
- Compliance templates (healthcare, finance)

---

### 15.3 Q3 2026

**Voice Search Optimization:**
- Monitor voice assistant citations (Alexa, Siri, Google Assistant)
- Voice query optimization
- Featured snippet tracking

**International Expansion:**
- Multi-language interface (10+ languages)
- Regional pricing
- Local payment methods
- Compliance (EU, APAC, LATAM)

---

### 15.4 Q4 2026

**AI Agent Integration:**
- Monitor autonomous AI agents
- Business agent citations (AI employees)
- B2B AI platform tracking
- Enterprise AI assistant integration

**Marketplace:**
- Third-party integrations
- Custom report templates
- Data connectors
- Consultant directory

---

## 16. Appendices

### 16.1 Glossary

| Term | Definition |
|------|------------|
| Citation | Mention of a client/brand in AI platform response |
| Position | Ranking of citation (1 = first mentioned, 10 = tenth) |
| Sentiment | Tone of citation (positive, neutral, negative) |
| Query | Search phrase monitored for citations |
| Platform | AI assistant (ChatGPT, Claude, Perplexity, Gemini) |
| Agency | Marketing agency using kreativpique |
| Client | Agency's customer being monitored |
| RLS | Row Level Security (database access control) |
| RBAC | Role-Based Access Control |

---

### 16.2 Assumptions & Constraints

**Assumptions:**
- AI platforms will continue to be accessible via API
- Marketing agencies will see value in AI search optimization
- Pricing acceptable to target market ($99-299/month)
- Citation frequency sufficient for agencies (100-1000/month per client)

**Constraints:**
- AI API costs scale with usage (variable cost)
- Rate limits on AI platforms (may limit check frequency)
- Real-time monitoring difficult (too expensive)
- Sentiment analysis not 100% accurate

**Risks:**
- AI platforms change API access or pricing
- Competitor launches similar product
- Market doesn't understand value proposition
- Compliance issues in certain regions

---

### 16.3 References

**Design:**
- Tailwind CSS: https://tailwindcss.com
- Shadcn/ui: https://ui.shadcn.com
- Radix UI: https://radix-ui.com

**Technical:**
- Supabase Docs: https://supabase.com/docs
- OpenAI API: https://platform.openai.com/docs
- Stripe API: https://stripe.com/docs/api

**Research:**
- UHNWI Marketing Trends 2025
- AI Search Adoption Statistics
- Dubai Luxury Market Report

---

**Document Status:** Living Document  
**Last Review:** October 31, 2025  
**Next Review:** November 30, 2025  
**Approvals:**  
- Product Manager: [ ]
- Engineering Lead: [ ]
- Design Lead: [ ]
- CEO: [ ]

---

**END OF DOCUMENT**
