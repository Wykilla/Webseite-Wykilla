'use client'

// Temporarily disabled: React Three Fiber ist aktuell nicht mit Next.js 15 kompatibel
// Das Problem: ReactCurrentOwner wird in Next.js 15 anders strukturiert
// Lösung: Warten auf Update von @react-three/fiber oder Downgrade auf Next.js 14
// TODO: Re-enable once React Three Fiber v9+ mit Next.js 15 kompatibel ist

import { useEffect, useState } from 'react'

export default function WorldSection() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number
    left: string
    top: string
    width: string
    height: string
    delay: string
    duration: string
  }>>([])

  useEffect(() => {
    setMounted(true)
    // Generate particles only on client to avoid hydration mismatch
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        delay: `${Math.random() * 3}s`,
        duration: `${3 + Math.random() * 2}s`,
      }))
    )
  }, [])

  return (
    <section id="world" className="relative h-screen overflow-hidden bg-ink flex items-center justify-center">
      <div className="text-center z-10">
        <h2 className="font-display text-6xl md:text-8xl font-bold mb-8">
          <span className="bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
            3D Universe
          </span>
        </h2>
        <p className="text-white/60 text-lg mb-4">
          3D Animation - Coming Soon
        </p>
        <p className="text-white/40 text-sm max-w-2xl mx-auto">
          React Three Fiber ist aktuell nicht mit Next.js 15 kompatibel.
          Die Animation wird wiederhergestellt, sobald eine kompatible Version verfügbar ist.
        </p>
        
        {/* Animated placeholder particles */}
        {mounted && particles.length > 0 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-cyan/20 blur-sm animate-pulse"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.width,
                  height: p.height,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
