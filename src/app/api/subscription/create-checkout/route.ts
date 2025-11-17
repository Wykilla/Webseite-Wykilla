import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { stripe, getStripeCustomer, createStripeCustomer } from '@/lib/stripe'
import { pricingTiers } from '@/config/pricing'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planId } = await req.json()
    const plan = pricingTiers.find((p) => p.id === planId)

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get or create Stripe customer
    let customer = await getStripeCustomer(session.user.email!)
    if (!customer) {
      customer = await createStripeCustomer(
        session.user.email!,
        session.user.name ?? undefined
      )
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customer!.id,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId: session.user.id!,
        planId: plan.id,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
