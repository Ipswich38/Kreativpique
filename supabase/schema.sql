-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- Create agencies table
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (for agency team members)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'client_viewer')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
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

-- Create monitoring queries table
CREATE TABLE monitoring_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  platforms TEXT[] DEFAULT ARRAY['chatgpt', 'claude', 'perplexity', 'gemini'],
  check_frequency TEXT DEFAULT 'daily' CHECK (check_frequency IN ('hourly', 'daily', 'weekly')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  is_active BOOLEAN DEFAULT true,
  last_checked TIMESTAMP WITH TIME ZONE,
  next_check TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create citations table
CREATE TABLE citations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  query_id UUID REFERENCES monitoring_queries(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('chatgpt', 'claude', 'perplexity', 'gemini')),
  query TEXT NOT NULL,
  position INTEGER,
  context TEXT,
  full_response TEXT,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  sentiment_score DECIMAL(3,2),
  url TEXT,
  metadata JSONB,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ad campaigns table
CREATE TABLE ad_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('google', 'meta', 'linkedin')),
  campaign_type TEXT NOT NULL CHECK (campaign_type IN ('search', 'display', 'social', 'video')),
  external_id TEXT,
  budget DECIMAL(10,2),
  spent DECIMAL(10,2) DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  keywords TEXT[],
  last_synced TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email campaigns table
CREATE TABLE email_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_id TEXT,
  recipient_list JSONB,
  recipient_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  bounced_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scrape jobs table
CREATE TABLE scrape_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  pages_scraped INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  error_message TEXT,
  result_data JSONB,
  schedule TEXT,
  last_run TIMESTAMP WITH TIME ZONE,
  next_run TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create API keys table (encrypted)
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  service TEXT NOT NULL,
  encrypted_key TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_agencies_email ON agencies(email);
CREATE INDEX idx_users_agency_id ON users(agency_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_clients_agency_id ON clients(agency_id);
CREATE INDEX idx_clients_industry ON clients(industry);
CREATE INDEX idx_clients_is_active ON clients(is_active);
CREATE INDEX idx_queries_client_id ON monitoring_queries(client_id);
CREATE INDEX idx_queries_is_active ON monitoring_queries(is_active);
CREATE INDEX idx_queries_next_check ON monitoring_queries(next_check);
CREATE INDEX idx_citations_client_id ON citations(client_id);
CREATE INDEX idx_citations_query_id ON citations(query_id);
CREATE INDEX idx_citations_platform ON citations(platform);
CREATE INDEX idx_citations_detected_at ON citations(detected_at DESC);
CREATE INDEX idx_citations_sentiment ON citations(sentiment);
CREATE INDEX idx_campaigns_client_id ON ad_campaigns(client_id);
CREATE INDEX idx_campaigns_platform ON ad_campaigns(platform);
CREATE INDEX idx_campaigns_status ON ad_campaigns(status);
CREATE INDEX idx_email_campaigns_agency_id ON email_campaigns(agency_id);
CREATE INDEX idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_email_campaigns_scheduled_at ON email_campaigns(scheduled_at);
CREATE INDEX idx_scrape_jobs_client_id ON scrape_jobs(client_id);
CREATE INDEX idx_scrape_jobs_status ON scrape_jobs(status);
CREATE INDEX idx_scrape_jobs_next_run ON scrape_jobs(next_run);
CREATE INDEX idx_api_keys_agency_id ON api_keys(agency_id);
CREATE INDEX idx_api_keys_service ON api_keys(service);

-- Enable Row Level Security
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitoring_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrape_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agencies
CREATE POLICY "Users can view own agency"
  ON agencies FOR SELECT
  USING (id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Owners can update agency"
  ON agencies FOR UPDATE
  USING (id IN (
    SELECT agency_id FROM users
    WHERE id = auth.uid() AND role = 'owner'
  ));

-- RLS Policies for users
CREATE POLICY "Users can view agency team members"
  ON users FOR SELECT
  USING (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Users can insert themselves during signup"
  ON users FOR INSERT
  WITH CHECK (id = auth.uid());

CREATE POLICY "Owners and admins can manage team members"
  ON users FOR ALL
  USING (agency_id IN (
    SELECT agency_id FROM users
    WHERE id = auth.uid() AND role IN ('owner', 'admin')
  ));

-- RLS Policies for clients
CREATE POLICY "Users can view agency clients"
  ON clients FOR SELECT
  USING (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Users can create clients"
  ON clients FOR INSERT
  WITH CHECK (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Users can update agency clients"
  ON clients FOR UPDATE
  USING (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Admins can delete clients"
  ON clients FOR DELETE
  USING (agency_id IN (
    SELECT agency_id FROM users
    WHERE id = auth.uid() AND role IN ('owner', 'admin')
  ));

-- RLS Policies for monitoring queries
CREATE POLICY "Users can view agency queries"
  ON monitoring_queries FOR SELECT
  USING (client_id IN (
    SELECT c.id FROM clients c
    JOIN users u ON c.agency_id = u.agency_id
    WHERE u.id = auth.uid()
  ));

CREATE POLICY "Users can manage agency queries"
  ON monitoring_queries FOR ALL
  USING (client_id IN (
    SELECT c.id FROM clients c
    JOIN users u ON c.agency_id = u.agency_id
    WHERE u.id = auth.uid()
  ));

-- RLS Policies for citations
CREATE POLICY "Users can view agency citations"
  ON citations FOR SELECT
  USING (client_id IN (
    SELECT c.id FROM clients c
    JOIN users u ON c.agency_id = u.agency_id
    WHERE u.id = auth.uid()
  ));

CREATE POLICY "Service role can insert citations"
  ON citations FOR INSERT
  WITH CHECK (true);

-- Similar policies for other tables...
CREATE POLICY "Users can view agency campaigns"
  ON ad_campaigns FOR SELECT
  USING (client_id IN (
    SELECT c.id FROM clients c
    JOIN users u ON c.agency_id = u.agency_id
    WHERE u.id = auth.uid()
  ));

CREATE POLICY "Users can manage agency campaigns"
  ON ad_campaigns FOR ALL
  USING (client_id IN (
    SELECT c.id FROM clients c
    JOIN users u ON c.agency_id = u.agency_id
    WHERE u.id = auth.uid()
  ));

CREATE POLICY "Users can view agency email campaigns"
  ON email_campaigns FOR SELECT
  USING (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage agency email campaigns"
  ON email_campaigns FOR ALL
  USING (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Users can view agency scrape jobs"
  ON scrape_jobs FOR SELECT
  USING (client_id IN (
    SELECT c.id FROM clients c
    JOIN users u ON c.agency_id = u.agency_id
    WHERE u.id = auth.uid()
  ));

CREATE POLICY "Users can manage agency scrape jobs"
  ON scrape_jobs FOR ALL
  USING (client_id IN (
    SELECT c.id FROM clients c
    JOIN users u ON c.agency_id = u.agency_id
    WHERE u.id = auth.uid()
  ));

CREATE POLICY "Users can view agency API keys"
  ON api_keys FOR SELECT
  USING (agency_id IN (
    SELECT agency_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Owners can manage API keys"
  ON api_keys FOR ALL
  USING (agency_id IN (
    SELECT agency_id FROM users
    WHERE id = auth.uid() AND role IN ('owner', 'admin')
  ));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_agencies_updated_at
  BEFORE UPDATE ON agencies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_ad_campaigns_updated_at
  BEFORE UPDATE ON ad_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample data for development (optional)
-- You can remove this in production
INSERT INTO agencies (id, name, email, subscription_tier) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Luxury Marketing Agency', 'admin@luxuryagency.com', 'pro'),
  ('00000000-0000-0000-0000-000000000002', 'Dubai Premier Marketing', 'contact@dubaimarketing.ae', 'enterprise');

INSERT INTO users (id, agency_id, email, full_name, role) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'admin@luxuryagency.com', 'Sarah Johnson', 'owner'),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'contact@dubaimarketing.ae', 'Ahmed Al-Mansouri', 'owner');

INSERT INTO clients (agency_id, name, industry, website, target_keywords) VALUES
  ('00000000-0000-0000-0000-000000000001', '1FLT', 'Aviation', 'https://www.1flt.com', ARRAY['private jet Dubai', 'luxury aviation UAE', 'VIP charter services']),
  ('00000000-0000-0000-0000-000000000001', 'Dubai Marina Properties', 'Real Estate', 'https://dubaimarina.ae', ARRAY['Dubai Marina real estate', 'luxury properties Dubai', 'waterfront apartments']),
  ('00000000-0000-0000-0000-000000000002', 'Emirates Palace Hotel', 'Hospitality', 'https://emiratespalace.ae', ARRAY['luxury hotel Abu Dhabi', 'Emirates Palace', 'luxury accommodation UAE']);