export interface AdAccount {
  id: string
  agency_id: string
  platform: 'google_ads' | 'meta' | 'linkedin'
  account_id: string
  account_name: string
  status: 'active' | 'disconnected' | 'error'
  access_token: string
  refresh_token?: string
  account_settings: any
  last_sync: string | null
  created_at: string
  updated_at: string
}

export interface AdCampaign {
  id: string
  account_id: string
  client_id: string | null
  platform: 'google_ads' | 'meta' | 'linkedin'
  platform_campaign_id: string
  name: string
  status: 'active' | 'paused' | 'removed'
  objective: string
  budget_amount: number
  budget_type: 'daily' | 'lifetime'
  start_date: string | null
  end_date: string | null
  targeting_settings: any
  ad_creative: any
  metrics_data: any
  last_sync: string | null
  created_at: string
  updated_at: string
}

export interface AdMetrics {
  campaign_id: string
  impressions_today: number
  impressions_7_days: number
  impressions_30_days: number
  clicks_today: number
  clicks_7_days: number
  clicks_30_days: number
  spend_today: number
  spend_7_days: number
  spend_30_days: number
  conversions_today: number
  conversions_7_days: number
  conversions_30_days: number
  ctr_today: number
  ctr_7_days: number
  ctr_30_days: number
  cpc_today: number
  cpc_7_days: number
  cpc_30_days: number
  cpm_today: number
  cpm_7_days: number
  cpm_30_days: number
  last_updated: string
}

export interface CreateCampaignRequest {
  account_id: string
  client_id?: string
  name: string
  objective: string
  budget_amount: number
  budget_type: 'daily' | 'lifetime'
  start_date?: string
  end_date?: string
  targeting_settings: {
    locations?: string[]
    age_min?: number
    age_max?: number
    genders?: string[]
    interests?: string[]
    keywords?: string[]
    demographics?: any
    behaviors?: any
  }
  ad_creative: {
    headline?: string
    description?: string
    image_url?: string
    video_url?: string
    call_to_action?: string
    destination_url?: string
  }
}

export interface CampaignUpdate {
  name?: string
  status?: 'active' | 'paused' | 'removed'
  budget_amount?: number
  budget_type?: 'daily' | 'lifetime'
  start_date?: string
  end_date?: string
  targeting_settings?: any
  ad_creative?: any
}

export interface AdPlatformConfig {
  google_ads: {
    client_id: string
    client_secret: string
    developer_token: string
    login_customer_id?: string
  }
  meta: {
    app_id: string
    app_secret: string
    access_token: string
  }
  linkedin: {
    client_id: string
    client_secret: string
    redirect_uri: string
  }
}

export interface CampaignPerformanceData {
  campaign_id: string
  campaign_name: string
  platform: 'google_ads' | 'meta' | 'linkedin'
  metrics: {
    impressions: number
    clicks: number
    spend: number
    conversions: number
    ctr: number
    cpc: number
    cpm: number
    conversion_rate: number
    roas: number
  }
  date_range: {
    start_date: string
    end_date: string
  }
}

export interface AudienceInsight {
  demographic: string
  value: string
  percentage: number
  performance_index: number
}

export interface KeywordPerformance {
  keyword: string
  impressions: number
  clicks: number
  ctr: number
  cpc: number
  conversions: number
  conversion_rate: number
  quality_score?: number
}

export interface AdCreativePerformance {
  creative_id: string
  creative_name: string
  format: 'image' | 'video' | 'carousel' | 'text'
  impressions: number
  clicks: number
  ctr: number
  engagement_rate: number
  video_completion_rate?: number
}

export interface CompetitorAnalysis {
  competitor_name: string
  estimated_budget: number
  ad_frequency: number
  top_keywords: string[]
  creative_themes: string[]
  audience_overlap: number
}

export interface CampaignRecommendation {
  type: 'budget' | 'targeting' | 'creative' | 'bidding' | 'schedule'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  expected_impact: string
  effort_required: 'low' | 'medium' | 'high'
  action_items: string[]
}

export interface OptimizationOpportunity {
  campaign_id: string
  opportunity_type: 'increase_budget' | 'adjust_targeting' | 'update_creative' | 'optimize_schedule' | 'improve_keywords'
  potential_impact: {
    metric: 'impressions' | 'clicks' | 'conversions' | 'roas'
    estimated_increase: number
    confidence_level: number
  }
  implementation_complexity: 'low' | 'medium' | 'high'
  description: string
  action_required: string
}