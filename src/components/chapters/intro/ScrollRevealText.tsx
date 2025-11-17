'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ScrollRevealTextProps {
  text: string
  className?: string
}

export default function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const { gsap, ScrollTrigger } = useGSAP()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !textRef.current || !gsap || !ScrollTrigger) return

    const words = textRef.current.querySelectorAll('.word')

    const animation = gsap.fromTo(
      words,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
        },
      }
    )

    return () => {
      animation.kill()
    }
  }, [gsap, ScrollTrigger, prefersReducedMotion])

  const words = text.split(' ')

  return (
    <p ref={textRef} className={`text-lg ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word inline-block mr-1"
          style={prefersReducedMotion ? { opacity: 1 } : undefined}
        >
          {word}
        </span>
      ))}
    </p>
  )
}
