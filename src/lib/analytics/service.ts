import posthog from 'posthog-js'

export interface AnalyticsUser {
  id: string
  email: string
  agency_id: string
  role: string
  subscription_tier?: string
}

export interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  user_id?: string
}

export interface CampaignAnalytics {
  campaign_id: string
  platform: string
  action: 'created' | 'updated' | 'paused' | 'resumed' | 'deleted'
  budget_amount?: number
  objective?: string
}

export interface CitationAnalytics {
  client_id: string
  platform: string
  found: boolean
  sentiment?: 'positive' | 'neutral' | 'negative'
  query_id?: string
}

export interface UserBehaviorAnalytics {
  action: string
  page: string
  feature?: string
  duration?: number
  metadata?: Record<string, any>
}

class AnalyticsService {
  private initialized = false

  initialize() {
    if (this.initialized) return

    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (posthogKey) {
      posthog.init(posthogKey, {
        api_host: posthogHost || 'https://us.i.posthog.com',
        person_profiles: 'always',
        capture_pageview: false, // We'll manually track pageviews
        capture_pageleave: true,
        loaded: (posthog) => {
          if (import.meta.env.NODE_ENV === 'development') {
            posthog.debug()
          }
        }
      })
      this.initialized = true
    } else {
      console.warn('PostHog key not found. Analytics will not be tracked.')
    }
  }

  identify(user: AnalyticsUser) {
    if (!this.initialized) return

    posthog.identify(user.id, {
      email: user.email,
      agency_id: user.agency_id,
      role: user.role,
      subscription_tier: user.subscription_tier,
      $set: {
        email: user.email,
        agency_id: user.agency_id,
        role: user.role,
        subscription_tier: user.subscription_tier
      }
    })
  }

  reset() {
    if (!this.initialized) return
    posthog.reset()
  }

  track(event: string, properties?: Record<string, any>) {
    if (!this.initialized) return

    posthog.capture(event, {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer
    })
  }

  page(name?: string, properties?: Record<string, any>) {
    if (!this.initialized) return

    posthog.capture('$pageview', {
      $current_url: window.location.href,
      page_name: name,
      ...properties
    })
  }

  // Citation tracking events
  trackCitationCheck(data: CitationAnalytics) {
    this.track('citation_check', {
      client_id: data.client_id,
      platform: data.platform,
      found: data.found,
      sentiment: data.sentiment,
      query_id: data.query_id
    })
  }

  trackCitationFound(data: CitationAnalytics) {
    this.track('citation_found', {
      client_id: data.client_id,
      platform: data.platform,
      sentiment: data.sentiment,
      query_id: data.query_id
    })
  }

  trackCitationMissing(data: Omit<CitationAnalytics, 'found'>) {
    this.track('citation_missing', {
      client_id: data.client_id,
      platform: data.platform,
      query_id: data.query_id
    })
  }

  // Campaign tracking events
  trackCampaignAction(data: CampaignAnalytics) {
    this.track('campaign_action', {
      campaign_id: data.campaign_id,
      platform: data.platform,
      action: data.action,
      budget_amount: data.budget_amount,
      objective: data.objective
    })
  }

  trackCampaignCreated(data: Omit<CampaignAnalytics, 'action'>) {
    this.trackCampaignAction({ ...data, action: 'created' })
  }

  trackCampaignUpdated(data: Omit<CampaignAnalytics, 'action'>) {
    this.trackCampaignAction({ ...data, action: 'updated' })
  }

  trackCampaignPaused(campaignId: string, platform: string) {
    this.trackCampaignAction({
      campaign_id: campaignId,
      platform,
      action: 'paused'
    })
  }

  trackCampaignResumed(campaignId: string, platform: string) {
    this.trackCampaignAction({
      campaign_id: campaignId,
      platform,
      action: 'resumed'
    })
  }

  trackCampaignDeleted(campaignId: string, platform: string) {
    this.trackCampaignAction({
      campaign_id: campaignId,
      platform,
      action: 'deleted'
    })
  }

  // User behavior tracking
  trackUserAction(data: UserBehaviorAnalytics) {
    this.track('user_action', {
      action: data.action,
      page: data.page,
      feature: data.feature,
      duration: data.duration,
      ...data.metadata
    })
  }

  trackFeatureUsage(feature: string, page: string, metadata?: Record<string, any>) {
    this.trackUserAction({
      action: 'feature_used',
      page,
      feature,
      metadata
    })
  }

  trackPageView(page: string, metadata?: Record<string, any>) {
    this.page(page, metadata)
  }

  trackButtonClick(buttonName: string, page: string, metadata?: Record<string, any>) {
    this.trackUserAction({
      action: 'button_click',
      page,
      feature: buttonName,
      metadata
    })
  }

  trackFormSubmission(formName: string, page: string, success: boolean, metadata?: Record<string, any>) {
    this.trackUserAction({
      action: 'form_submission',
      page,
      feature: formName,
      metadata: {
        success,
        ...metadata
      }
    })
  }

  // Subscription and billing events
  trackSubscriptionEvent(event: 'upgraded' | 'downgraded' | 'cancelled' | 'renewed', data: {
    from_plan?: string
    to_plan?: string
    amount?: number
    billing_cycle?: 'monthly' | 'annual'
  }) {
    this.track('subscription_event', {
      event,
      ...data
    })
  }

  trackPaymentEvent(event: 'succeeded' | 'failed' | 'pending', data: {
    amount: number
    currency: string
    plan: string
    billing_cycle: string
    error_code?: string
    error_message?: string
  }) {
    this.track('payment_event', {
      event,
      ...data
    })
  }

  // Error and performance tracking
  trackError(error: Error, context?: Record<string, any>) {
    this.track('error_occurred', {
      error_name: error.name,
      error_message: error.message,
      error_stack: error.stack,
      ...context
    })
  }

  trackPerformance(metric: string, value: number, context?: Record<string, any>) {
    this.track('performance_metric', {
      metric,
      value,
      ...context
    })
  }

  // AI and citation specific metrics
  trackAIQuery(platform: string, queryType: string, responseTime: number, success: boolean) {
    this.track('ai_query', {
      platform,
      query_type: queryType,
      response_time: responseTime,
      success
    })
  }

  trackEmailSent(type: 'report' | 'alert' | 'notification', recipient: string, success: boolean) {
    this.track('email_sent', {
      type,
      recipient,
      success
    })
  }

  trackScrapingJob(url: string, success: boolean, duration: number, pagesScraped?: number) {
    this.track('scraping_job', {
      url,
      success,
      duration,
      pages_scraped: pagesScraped
    })
  }

  // Feature flags and A/B testing
  isFeatureEnabled(feature: string): boolean {
    if (!this.initialized) return false
    return posthog.isFeatureEnabled(feature) || false
  }

  getFeatureFlag(feature: string): string | boolean | undefined {
    if (!this.initialized) return undefined
    return posthog.getFeatureFlag(feature)
  }

  // Funnel and conversion tracking
  trackFunnelStep(funnel: string, step: string, properties?: Record<string, any>) {
    this.track('funnel_step', {
      funnel,
      step,
      ...properties
    })
  }

  trackConversion(type: string, value?: number, properties?: Record<string, any>) {
    this.track('conversion', {
      conversion_type: type,
      value,
      ...properties
    })
  }

  // Session and engagement tracking
  trackSessionStart() {
    this.track('session_start')
  }

  trackSessionEnd(duration: number) {
    this.track('session_end', {
      session_duration: duration
    })
  }

  trackEngagement(action: string, duration: number, properties?: Record<string, any>) {
    this.track('engagement', {
      action,
      duration,
      ...properties
    })
  }

  // Set user properties
  setUserProperties(properties: Record<string, any>) {
    if (!this.initialized) return
    posthog.setPersonProperties(properties)
  }

  // Group analytics (for agencies)
  setGroup(groupType: string, groupKey: string, properties?: Record<string, any>) {
    if (!this.initialized) return
    posthog.group(groupType, groupKey, properties)
  }

  // Custom event batching for high-frequency events
  private batchedEvents: AnalyticsEvent[] = []
  private batchTimer: NodeJS.Timeout | null = null

  trackBatched(event: string, properties?: Record<string, any>) {
    this.batchedEvents.push({ event, properties })

    if (this.batchTimer) {
      clearTimeout(this.batchTimer)
    }

    this.batchTimer = setTimeout(() => {
      this.flushBatch()
    }, 5000) // Flush every 5 seconds
  }

  private flushBatch() {
    if (this.batchedEvents.length === 0) return

    this.track('batched_events', {
      events: this.batchedEvents,
      count: this.batchedEvents.length
    })

    this.batchedEvents = []
    this.batchTimer = null
  }

  // Manual flush for immediate sending
  flush() {
    this.flushBatch()
  }
}

export const analyticsService = new AnalyticsService()