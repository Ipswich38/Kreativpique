import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('stripe-signature')
    const body = await req.text()

    if (!signature) {
      throw new Error('No Stripe signature found')
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    })

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    console.log('Received Stripe webhook:', event.type)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Get the agency ID from metadata
        const agencyId = session.metadata?.agency_id
        if (!agencyId) {
          throw new Error('No agency ID in session metadata')
        }

        // Update agency with Stripe customer ID and subscription ID
        const { error: updateError } = await supabase
          .from('agencies')
          .update({
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            subscription_tier: session.metadata?.plan || 'pro'
          })
          .eq('id', agencyId)

        if (updateError) {
          throw new Error(`Failed to update agency: ${updateError.message}`)
        }

        console.log(`✅ Updated agency ${agencyId} with subscription`)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription

        // Find agency by customer ID
        const { data: agency, error: findError } = await supabase
          .from('agencies')
          .select('*')
          .eq('stripe_customer_id', subscription.customer as string)
          .single()

        if (findError || !agency) {
          throw new Error('Agency not found for customer')
        }

        // Determine plan based on subscription
        let newTier = 'free'
        if (subscription.status === 'active') {
          // You would map price IDs to plans here
          const priceId = subscription.items.data[0]?.price.id
          if (priceId === 'price_pro_monthly') {
            newTier = 'pro'
          } else if (priceId === 'price_enterprise_monthly') {
            newTier = 'enterprise'
          }
        }

        // Update agency subscription tier
        const { error: updateError } = await supabase
          .from('agencies')
          .update({
            subscription_tier: newTier,
            stripe_subscription_id: subscription.id
          })
          .eq('id', agency.id)

        if (updateError) {
          throw new Error(`Failed to update subscription: ${updateError.message}`)
        }

        console.log(`✅ Updated agency ${agency.id} subscription to ${newTier}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        // Find agency by customer ID
        const { data: agency, error: findError } = await supabase
          .from('agencies')
          .select('*')
          .eq('stripe_customer_id', subscription.customer as string)
          .single()

        if (findError || !agency) {
          throw new Error('Agency not found for customer')
        }

        // Downgrade to free tier
        const { error: updateError } = await supabase
          .from('agencies')
          .update({
            subscription_tier: 'free',
            stripe_subscription_id: null
          })
          .eq('id', agency.id)

        if (updateError) {
          throw new Error(`Failed to downgrade agency: ${updateError.message}`)
        }

        console.log(`✅ Downgraded agency ${agency.id} to free tier`)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice

        // Log successful payment
        console.log(`✅ Payment succeeded for customer ${invoice.customer}`)

        // You could send a payment confirmation email here
        // or update payment history in your database
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice

        // Find agency by customer ID
        const { data: agency, error: findError } = await supabase
          .from('agencies')
          .select('*')
          .eq('stripe_customer_id', invoice.customer as string)
          .single()

        if (findError || !agency) {
          console.error('Agency not found for failed payment')
          break
        }

        console.log(`❌ Payment failed for agency ${agency.id}`)

        // You could:
        // 1. Send payment failure notification
        // 2. Update agency status
        // 3. Temporarily restrict access
        break
      }

      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object as Stripe.Subscription

        // Find agency by customer ID
        const { data: agency, error: findError } = await supabase
          .from('agencies')
          .select('*')
          .eq('stripe_customer_id', subscription.customer as string)
          .single()

        if (findError || !agency) {
          console.error('Agency not found for trial ending')
          break
        }

        console.log(`⏰ Trial ending soon for agency ${agency.id}`)

        // Send trial ending notification email
        // You could use the email service here
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})