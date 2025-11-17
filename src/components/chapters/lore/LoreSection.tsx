'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { assets } from '@/config/assets'
import { loreEntries } from '@/config/lore'
import LoreCard from './LoreCard'
import Timeline from './Timeline'
import AmbientOverlay from './AmbientOverlay'

export default function LoreSection() {
  const bgRef = useRef<HTMLDivElement>(null)
  const { gsap, ScrollTrigger } = useGSAP()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !bgRef.current || !gsap || !ScrollTrigger) return

    const animation = gsap.to(bgRef.current, {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: bgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      animation.kill()
    }
  }, [gsap, ScrollTrigger, prefersReducedMotion])

  return (
    <section id="lore" className="relative min-h-screen py-20 overflow-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.lore.background})`,
          willChange: prefersReducedMotion ? undefined : 'transform',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bordeaux/60" />

      {/* Ambient animation overlay */}
      <AmbientOverlay />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-bordeaux to-magenta bg-clip-text text-transparent">
            The Story
          </span>
        </h2>

        {/* Lore entries grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {loreEntries.map((entry) => (
            <LoreCard
              key={entry.id}
              title={entry.title}
              text={entry.text}
              image={entry.image}
            />
          ))}
        </div>

        {/* Timeline */}
        <Timeline />
      </div>
    </section>
  )
}
