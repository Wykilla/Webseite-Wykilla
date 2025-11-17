'use client'

import { GlassmorphCard, Button } from '@/components/ui'
import { useState, useEffect } from 'react'

interface ToolCardProps {
  tool: {
    id: string
    name: string
    icon: string
    description: string
  }
  onTry: () => void
}

export default function ToolCard({ tool, onTry }: ToolCardProps) {
  const [remaining, setRemaining] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch usage limits
    fetch(`/api/usage/limits?tool=${tool.id}`)
      .then((res) => res.json())
      .then((data) => {
        setRemaining(data.remaining || 0)
      })
      .catch((err) => {
        console.error('Failed to fetch limits:', err)
        setRemaining(0)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [tool.id])

  return (
    <GlassmorphCard intensity="medium" glow className="p-8">
      <div className="text-6xl mb-4">{tool.icon}</div>
      <h3 className="font-display text-2xl font-bold mb-3">{tool.name}</h3>
      <p className="text-white/70 mb-6">{tool.description}</p>

      {!loading && remaining !== null && (
        <p className="text-sm text-gold mb-4">
          {remaining > 999
            ? 'Unlimited'
            : `${remaining} generations remaining this month`}
        </p>
      )}

      <Button variant="primary" fullWidth glow onClick={onTry}>
        Try Now
      </Button>
    </GlassmorphCard>
  )
}
