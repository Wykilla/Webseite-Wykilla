'use client'

import { ReactNode, useEffect } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * ScrollContainer Component
 *
 * Wraps the entire application with Lenis smooth scrolling.
 * Synchronizes GSAP ScrollTrigger with Lenis for seamless animations.
 * Respects user's motion preferences for accessibility.
 */

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollContainerProps {
  children: ReactNode
}

export default function ScrollContainer({ children }: ScrollContainerProps) {
  const prefersReducedMotion = useReducedMotion()

  // Initialize Lenis with motion preferences
  const { lenis } = useLenis({
    duration: prefersReducedMotion ? 0.01 : 1.2,
    smoothWheel: !prefersReducedMotion,
  })

  useEffect(() => {
    if (!lenis) return

    // Synchronize ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable ScrollTrigger's default scroll smoothing
    // (Lenis handles it)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [lenis])

  // Update ScrollTrigger on resize
  useEffect(() => {
    if (!lenis) return

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [lenis])

  return <>{children}</>
}
