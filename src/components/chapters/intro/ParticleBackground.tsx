'use client'

import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ParticleBackground() {
  const prefersReducedMotion = useReducedMotion()
  const [particles, setParticles] = useState<Array<{
    id: number
    left: string
    top: string
    delay: string
    duration: string
  }>>([])

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 10}s`,
      }))
    )
  }, [])

  if (prefersReducedMotion) return null

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-cyan/20 rounded-full animate-float"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}
