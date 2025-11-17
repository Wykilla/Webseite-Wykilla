'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const milestones = [
  { year: '2018', title: 'First Track', description: 'The journey begins' },
  { year: '2020', title: '3D Exploration', description: 'Discovering Unreal Engine' },
  { year: '2023', title: 'AI Tools Launch', description: 'Empowering creators' },
  { year: '2025', title: 'WYKILLA Universe', description: 'The complete experience' },
]

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null)
  const { gsap, ScrollTrigger } = useGSAP()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !lineRef.current || !gsap || !ScrollTrigger) return

    const animation = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      }
    )

    return () => {
      animation.kill()
    }
  }, [gsap, ScrollTrigger, prefersReducedMotion])

  return (
    <div className="relative max-w-3xl mx-auto py-12 mt-16">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-bordeaux/20 -translate-x-1/2">
        <div
          ref={lineRef}
          className="w-full h-full bg-gradient-to-b from-bordeaux to-magenta origin-top"
          style={prefersReducedMotion ? { transform: 'scaleY(1)' } : undefined}
        />
      </div>

      {/* Milestones */}
      <div className="space-y-12">
        {milestones.map((m, i) => (
          <div
            key={m.year}
            className={`flex items-center gap-8 ${
              i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Year marker */}
            <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <span className="font-display text-3xl font-bold text-bordeaux">
                {m.year}
              </span>
            </div>

            {/* Icon */}
            <div className="relative z-10">
              <div className="w-4 h-4 rounded-full bg-magenta border-4 border-ink" />
            </div>

            {/* Content */}
            <div className={`flex-1 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
              <h4 className="font-display text-xl font-bold mb-1 text-white">
                {m.title}
              </h4>
              <p className="text-white/70">{m.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
