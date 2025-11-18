'use client'

import { useSession } from 'next-auth/react'
import { Button, Card } from '@/components/ui'
import { pricingTiers } from '@/config/pricing'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      router.push('/login')
      return
    }

    setLoading(planId)

    try {
      const response = await fetch('/api/subscription/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-ink py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-center">
          <span className="bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
            Choose Your Plan
          </span>
        </h1>

        <p className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto">
          Professional AI tools for songwriters and producers. Cancel anytime.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`p-8 ${
                tier.id === 'pro'
                  ? 'border-magenta border-2 relative'
                  : ''
              }`}
            >
              {tier.id === 'pro' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-magenta text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <h2 className="font-display text-2xl font-bold mb-2">
                {tier.name}
              </h2>

              <div className="mb-6">
                <span className="text-4xl font-bold">€{tier.price}</span>
                <span className="text-white/60"> /month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-cyan mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.id === 'pro' ? 'primary' : 'outline'}
                size="lg"
                fullWidth
                glow={tier.id === 'pro'}
                onClick={() => handleSubscribe(tier.id)}
                disabled={loading === tier.id}
              >
                {loading === tier.id ? 'Loading...' : 'Get Started'}
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-center text-white/60 text-sm mt-12">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  )
}
