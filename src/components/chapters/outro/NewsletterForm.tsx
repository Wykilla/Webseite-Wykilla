'use client'

import { useState } from 'react'
import { Input, Button } from '@/components/ui'
import { GlassmorphCard } from '@/components/ui'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // TODO: Connect to API (Epic 9 - Agent 4 will implement)
    // For now: Placeholder
    setTimeout(() => {
      console.log('Newsletter signup:', email)
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  return (
    <GlassmorphCard intensity="medium" className="max-w-md mx-auto mt-12">
      <h3 className="font-display text-2xl font-bold mb-4 text-center">
        Stay Updated
      </h3>
      <p className="text-white/70 mb-6 text-center">
        Get notified about new tracks, tools, and releases.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>

        {status === 'success' && (
          <p className="text-green-400 text-sm text-center">
            ✓ Thanks for subscribing!
          </p>
        )}
      </form>
    </GlassmorphCard>
  )
}
