'use client'

import { useRef, useEffect } from 'react'
import { GlassmorphCard } from '@/components/ui'
import { useGSAP } from '@/hooks/useGSAP'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface LoreCardProps {
  title: string
  text: string
  image?: string
}

export default function LoreCard({ title, text, image }: LoreCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { gsap, ScrollTrigger } = useGSAP()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current || !gsap || !ScrollTrigger) return

    const animation = gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      }
    )

    return () => {
      animation.kill()
    }
  }, [gsap, ScrollTrigger, prefersReducedMotion])

  return (
    <div
      ref={cardRef}
      style={prefersReducedMotion ? { opacity: 1 } : undefined}
    >
      <GlassmorphCard
        intensity="medium"
        glow
        className="hover:scale-[1.02] transition-transform duration-300"
      >
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
          </div>
        )}
        <h3 className="font-display text-2xl font-bold mb-3 text-bordeaux">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed">{text}</p>
      </GlassmorphCard>
    </div>
  )
}
