import { useState, useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { stripeService } from '../lib/stripe/service'
import { PRICING_PLANS, getPlanFeatures, getPlanLimits, isWithinLimits, type PricingPlan } from '../lib/stripe/config'

export interface SubscriptionData {
  plan: PricingPlan
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid'
  current_period_end: string | null
  cancel_at_period_end: boolean
  trial_end: string | null
  customer_id: string | null
  subscription_id: string | null
}

export interface UsageData {
  clients: number
  queries_per_client: number
  citations_this_month: number
  team_members: number
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuthContext()

  const fetchSubscriptionData = async () => {
    if (!user?.agency) return

    try {
      setLoading(true)
      setError(null)

      // Get subscription data from agency
      const agency = user.agency
      const subscriptionData: SubscriptionData = {
        plan: (agency.subscription_tier as PricingPlan) || 'free',
        status: 'active', // This would come from Stripe in a real implementation
        current_period_end: null,
        cancel_at_period_end: false,
        trial_end: null,
        customer_id: agency.stripe_customer_id,
        subscription_id: agency.stripe_subscription_id
      }

      setSubscription(subscriptionData)

      // Get usage data (this would come from your API)
      const usageData: UsageData = {
        clients: 2, // Mock data - would come from actual counts
        queries_per_client: 5,
        citations_this_month: 150,
        team_members: 3
      }

      setUsage(usageData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptionData()
  }, [user?.agency])

  const subscribeToPlan = async (plan: PricingPlan, trialDays?: number) => {
    if (!user?.agency) throw new Error('No agency found')

    try {
      setLoading(true)
      await stripeService.subscribeToPlan(plan, user.agency.id, trialDays)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const cancelSubscription = async () => {
    if (!subscription?.subscription_id) throw new Error('No subscription found')

    try {
      setLoading(true)
      await stripeService.cancelSubscription(subscription.subscription_id)
      await fetchSubscriptionData() // Refresh data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const resumeSubscription = async () => {
    if (!subscription?.subscription_id) throw new Error('No subscription found')

    try {
      setLoading(true)
      await stripeService.resumeSubscription(subscription.subscription_id)
      await fetchSubscriptionData() // Refresh data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resume subscription')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const openBillingPortal = async () => {
    if (!subscription?.customer_id) throw new Error('No customer found')

    try {
      const session = await stripeService.createBillingPortalSession(subscription.customer_id)
      window.location.href = session.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open billing portal')
      throw err
    }
  }

  // Helper functions
  const canAccessFeature = (feature: keyof ReturnType<typeof getPlanFeatures>) => {
    if (!subscription) return false
    const features = getPlanFeatures(subscription.plan)
    return Boolean(features[feature])
  }

  const getUsageLimits = () => {
    if (!subscription) return null
    return getPlanLimits(subscription.plan)
  }

  const checkLimits = () => {
    if (!subscription || !usage) return null
    return isWithinLimits(subscription.plan, usage)
  }

  const getUpgradeOptions = () => {
    if (!subscription) return []

    const plans = Object.keys(PRICING_PLANS) as PricingPlan[]
    const currentIndex = plans.indexOf(subscription.plan)
    return plans.slice(currentIndex + 1).map(plan => ({
      plan,
      ...PRICING_PLANS[plan]
    }))
  }

  const isOnFreePlan = () => subscription?.plan === 'free'
  const isOnTrialPlan = () => subscription?.status === 'trialing'
  const isPastDue = () => subscription?.status === 'past_due'
  const isCanceled = () => subscription?.status === 'canceled'

  const getDaysUntilTrialEnd = () => {
    if (!subscription?.trial_end) return null
    const trialEnd = new Date(subscription.trial_end)
    const now = new Date()
    const diffTime = trialEnd.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const getDaysUntilPeriodEnd = () => {
    if (!subscription?.current_period_end) return null
    const periodEnd = new Date(subscription.current_period_end)
    const now = new Date()
    const diffTime = periodEnd.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return {
    subscription,
    usage,
    loading,
    error,
    subscribeToPlan,
    cancelSubscription,
    resumeSubscription,
    openBillingPortal,
    canAccessFeature,
    getUsageLimits,
    checkLimits,
    getUpgradeOptions,
    isOnFreePlan,
    isOnTrialPlan,
    isPastDue,
    isCanceled,
    getDaysUntilTrialEnd,
    getDaysUntilPeriodEnd,
    refetch: fetchSubscriptionData
  }
}