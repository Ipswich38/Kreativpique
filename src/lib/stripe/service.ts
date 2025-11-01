import { loadStripe, Stripe } from '@stripe/stripe-js'
import { STRIPE_CONFIG, PRICING_PLANS, type PricingPlan } from './config'

let stripeInstance: Stripe | null = null

export async function getStripe(): Promise<Stripe | null> {
  if (!stripeInstance) {
    stripeInstance = await loadStripe(STRIPE_CONFIG.publishableKey)
  }
  return stripeInstance
}

export interface CreateCheckoutSessionParams {
  priceId: string
  agencyId: string
  successUrl?: string
  cancelUrl?: string
  trialDays?: number
}

export class StripeService {
  async createCheckoutSession(params: CreateCheckoutSessionParams) {
    const {
      priceId,
      agencyId,
      successUrl = `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl = `${window.location.origin}/pricing`,
      trialDays
    } = params

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          agencyId,
          successUrl,
          cancelUrl,
          trialDays
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const session = await response.json()
      return session
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  }

  async redirectToCheckout(sessionId: string) {
    const stripe = await getStripe()
    if (!stripe) {
      throw new Error('Stripe failed to load')
    }

    const { error } = await stripe.redirectToCheckout({ sessionId })

    if (error) {
      console.error('Stripe redirect error:', error)
      throw error
    }
  }

  async createBillingPortalSession(customerId: string) {
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          returnUrl: `${window.location.origin}/settings/billing`
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create portal session')
      }

      const session = await response.json()
      return session
    } catch (error) {
      console.error('Error creating portal session:', error)
      throw error
    }
  }

  async getSubscriptionStatus(customerId: string) {
    try {
      const response = await fetch(`/api/stripe/subscription-status?customerId=${customerId}`)

      if (!response.ok) {
        throw new Error('Failed to get subscription status')
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting subscription status:', error)
      throw error
    }
  }

  // Subscribe to a plan
  async subscribeToPlan(plan: PricingPlan, agencyId: string, trialDays?: number) {
    const planConfig = PRICING_PLANS[plan]

    if (!planConfig.stripePriceId) {
      throw new Error('Invalid plan selected')
    }

    const session = await this.createCheckoutSession({
      priceId: planConfig.stripePriceId,
      agencyId,
      trialDays
    })

    await this.redirectToCheckout(session.id)
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId: string) {
    try {
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId })
      })

      if (!response.ok) {
        throw new Error('Failed to cancel subscription')
      }

      return await response.json()
    } catch (error) {
      console.error('Error canceling subscription:', error)
      throw error
    }
  }

  // Resume subscription
  async resumeSubscription(subscriptionId: string) {
    try {
      const response = await fetch('/api/stripe/resume-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId })
      })

      if (!response.ok) {
        throw new Error('Failed to resume subscription')
      }

      return await response.json()
    } catch (error) {
      console.error('Error resuming subscription:', error)
      throw error
    }
  }

  // Update payment method
  async updatePaymentMethod(customerId: string) {
    const session = await this.createBillingPortalSession(customerId)
    window.location.href = session.url
  }

  // Get usage and billing info
  async getUsageAndBilling(agencyId: string) {
    try {
      const response = await fetch(`/api/stripe/usage-billing?agencyId=${agencyId}`)

      if (!response.ok) {
        throw new Error('Failed to get usage and billing info')
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting usage and billing:', error)
      throw error
    }
  }
}

export const stripeService = new StripeService()

// Utility functions for plan management
export function getPlanUpgradePath(currentPlan: PricingPlan): PricingPlan[] {
  const plans = Object.keys(PRICING_PLANS) as PricingPlan[]
  const currentIndex = plans.indexOf(currentPlan)
  return plans.slice(currentIndex + 1)
}

export function getPlanDowngradePath(currentPlan: PricingPlan): PricingPlan[] {
  const plans = Object.keys(PRICING_PLANS) as PricingPlan[]
  const currentIndex = plans.indexOf(currentPlan)
  return plans.slice(0, currentIndex)
}

export function calculateUpgradeProration(
  currentPlan: PricingPlan,
  newPlan: PricingPlan,
  daysRemaining: number
): number {
  const currentPrice = PRICING_PLANS[currentPlan].price
  const newPrice = PRICING_PLANS[newPlan].price
  const dailyRate = (newPrice - currentPrice) / 30
  return Math.max(0, dailyRate * daysRemaining)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}