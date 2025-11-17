export interface PricingTier {
  id: string
  name: string
  price: number // EUR per month
  stripePriceId: string // From Stripe dashboard
  features: string[]
  limits: {
    lyricGenerations: number
    audioFXGenerations: number
  }
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    stripePriceId: process.env.STRIPE_PRICE_STARTER || 'price_starter_monthly',
    features: [
      '50 Lyric Generations/month',
      '25 Audio FX Generations/month',
      'Basic Support',
    ],
    limits: {
      lyricGenerations: 50,
      audioFXGenerations: 25,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    stripePriceId: process.env.STRIPE_PRICE_PRO || 'price_pro_monthly',
    features: [
      '300 Lyric Generations/month',
      '150 Audio FX Generations/month',
      'MIDI I/O Support',
      'Priority Support',
    ],
    limits: {
      lyricGenerations: 300,
      audioFXGenerations: 150,
    },
  },
  {
    id: 'studio',
    name: 'Studio',
    price: 149,
    stripePriceId: process.env.STRIPE_PRICE_STUDIO || 'price_studio_monthly',
    features: [
      '1500 Lyric Generations/month',
      'Unlimited Audio FX',
      'API Access',
      'Team Seats (up to 5)',
      'Dedicated Support',
    ],
    limits: {
      lyricGenerations: 1500,
      audioFXGenerations: -1, // Unlimited
    },
  },
]
