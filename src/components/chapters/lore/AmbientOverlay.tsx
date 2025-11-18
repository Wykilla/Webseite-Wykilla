'use client'

import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function AmbientOverlay() {
  const prefersReducedMotion = useReducedMotion()
  const [particles, setParticles] = useState<Array<{
    id: number
    left: string
    top: string
    delay: string
    duration: string
    size: number
  }>>([])

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${15 + Math.random() * 15}s`,
        size: Math.random() * 3 + 1, // 1-4px
      }))
    )
  }, [])

  if (prefersReducedMotion) return null

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-magenta/10 via-transparent to-bordeaux/10 animate-pulse-glow" />

      {/* Floating light particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/30 blur-sm animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}
