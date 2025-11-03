export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
}

export const PRICING_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    stripePriceId: null,
    features: {
      clients: 3,
      queries: 10,
      citations_per_month: 100,
      team_members: 1,
      email_reports: false,
      priority_support: false,
      white_label: false,
      api_access: false,
      advanced_analytics: false
    },
    limits: {
      clients: 3,
      queries_per_client: 3,
      citations_per_month: 100,
      team_members: 1
    }
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 99,
    interval: 'month',
    stripePriceId: 'price_pro_monthly', // Replace with actual Stripe price ID
    features: {
      clients: 25,
      queries: 100,
      citations_per_month: 5000,
      team_members: 5,
      email_reports: true,
      priority_support: true,
      white_label: false,
      api_access: true,
      advanced_analytics: true
    },
    limits: {
      clients: 25,
      queries_per_client: 10,
      citations_per_month: 5000,
      team_members: 5
    }
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'month',
    stripePriceId: 'price_enterprise_monthly', // Replace with actual Stripe price ID
    features: {
      clients: -1, // unlimited
      queries: -1, // unlimited
      citations_per_month: -1, // unlimited
      team_members: -1, // unlimited
      email_reports: true,
      priority_support: true,
      white_label: true,
      api_access: true,
      advanced_analytics: true,
      dedicated_support: true,
      custom_integrations: true,
      sla: true
    },
    limits: {
      clients: -1,
      queries_per_client: -1,
      citations_per_month: -1,
      team_members: -1
    }
  }
} as const

export type PricingPlan = keyof typeof PRICING_PLANS
export type PlanFeatures = typeof PRICING_PLANS[PricingPlan]['features']
export type PlanLimits = typeof PRICING_PLANS[PricingPlan]['limits']

export function getPlanFeatures(plan: PricingPlan): PlanFeatures {
  return PRICING_PLANS[plan]?.features || PRICING_PLANS.free.features
}

export function getPlanLimits(plan: PricingPlan): PlanLimits {
  return PRICING_PLANS[plan]?.limits || PRICING_PLANS.free.limits
}

export function canAccessFeature(
  userPlan: PricingPlan,
  feature: keyof PlanFeatures
): boolean {
  const features = getPlanFeatures(userPlan)
  return Boolean(features[feature])
}

export function isWithinLimits(
  userPlan: PricingPlan,
  usage: Partial<PlanLimits>
): Record<keyof PlanLimits, boolean> {
  const limits = getPlanLimits(userPlan)

  return {
    clients: limits.clients === -1 || (usage.clients || 0) <= limits.clients,
    queries_per_client: limits.queries_per_client === -1 || (usage.queries_per_client || 0) <= limits.queries_per_client,
    citations_per_month: limits.citations_per_month === -1 || (usage.citations_per_month || 0) <= limits.citations_per_month,
    team_members: limits.team_members === -1 || (usage.team_members || 0) <= limits.team_members
  }
}