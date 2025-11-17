'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Card } from '@/components/ui'
import Link from 'next/link'

interface Subscription {
  plan: string
  status: string
  currentPeriodEnd: string
}

interface Usage {
  lyricGenerator: number
  audioFX: number
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [usage, setUsage] = useState<Usage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }

    if (status === 'authenticated') {
      fetchDashboardData()
    }
  }, [status, router])

  const fetchDashboardData = async () => {
    try {
      // Fetch subscription
      const subResponse = await fetch('/api/subscription/status')
      if (subResponse.ok) {
        const subData = await subResponse.json()
        setSubscription(subData.subscription)
      }

      // Fetch usage
      const usageResponse = await fetch('/api/usage/limits')
      if (usageResponse.ok) {
        const usageData = await usageResponse.json()
        setUsage(usageData)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <p className="text-white/60">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
          <span className="bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>

        <p className="text-white/80 mb-12">
          Welcome back, {session?.user?.name || session?.user?.email}!
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Subscription Status */}
          <Card className="p-8">
            <h2 className="font-display text-2xl font-bold mb-4">
              Subscription
            </h2>
            {subscription ? (
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm">Current Plan</p>
                  <p className="text-xl font-semibold capitalize">
                    {subscription.plan}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Status</p>
                  <p className="text-xl font-semibold capitalize">
                    {subscription.status}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Renewal Date</p>
                  <p className="text-xl font-semibold">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </div>
                <div className="pt-4">
                  <Link href="/pricing">
                    <Button variant="outline" fullWidth>
                      Manage Subscription
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-white/60">
                  You don't have an active subscription yet.
                </p>
                <Link href="/pricing">
                  <Button variant="primary" fullWidth glow>
                    Choose a Plan
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Usage Stats */}
          <Card className="p-8">
            <h2 className="font-display text-2xl font-bold mb-4">
              Monthly Usage
            </h2>
            {usage ? (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-white/80">Lyric Generations</p>
                    <p className="font-semibold">{usage.lyricGenerator}</p>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan to-magenta h-2 rounded-full"
                      style={{ width: `${Math.min(usage.lyricGenerator, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-white/80">Audio FX Generations</p>
                    <p className="font-semibold">{usage.audioFX}</p>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-gold to-magenta h-2 rounded-full"
                      style={{ width: `${Math.min(usage.audioFX, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-white/60">No usage data available.</p>
            )}
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/#tools">
            <Card className="p-6 hover:border-cyan transition-colors cursor-pointer">
              <h3 className="font-display text-xl font-bold mb-2">AI Tools</h3>
              <p className="text-white/60 text-sm">
                Access Lyric Generator and Audio FX tools
              </p>
            </Card>
          </Link>
          <Link href="/pricing">
            <Card className="p-6 hover:border-magenta transition-colors cursor-pointer">
              <h3 className="font-display text-xl font-bold mb-2">Pricing</h3>
              <p className="text-white/60 text-sm">
                Upgrade or change your plan
              </p>
            </Card>
          </Link>
          <Card className="p-6 opacity-60">
            <h3 className="font-display text-xl font-bold mb-2">Support</h3>
            <p className="text-white/60 text-sm">
              Get help with your account
              <br />
              <span className="text-xs">(Coming soon)</span>
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
