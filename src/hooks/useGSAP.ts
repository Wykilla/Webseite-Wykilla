'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * useGSAP Hook
 *
 * Provides GSAP context and ScrollTrigger helpers with automatic cleanup.
 * Ensures animations are properly scoped and disposed when component unmounts.
 *
 * @returns GSAP context methods and ScrollTrigger helpers
 */

export interface UseGSAPReturn {
  gsap: typeof gsap
  ScrollTrigger: typeof ScrollTrigger
  contextSafe: <T extends (...args: any[]) => any>(fn: T) => T
}

export function useGSAP(): UseGSAPReturn {
  const contextRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    // Create GSAP context for this component
    contextRef.current = gsap.context(() => {})

    // Cleanup on unmount
    return () => {
      contextRef.current?.revert()
      contextRef.current = null
    }
  }, [])

  // Context-safe wrapper for animations
  const contextSafe = <T extends (...args: any[]) => any>(fn: T): T => {
    return ((...args: any[]) => {
      if (!contextRef.current) return
      return contextRef.current.add(() => fn(...args))
    }) as T
  }

  return {
    gsap,
    ScrollTrigger,
    contextSafe,
  }
}

/**
 * useScrollTrigger Hook
 *
 * Creates a ScrollTrigger animation with automatic cleanup.
 *
 * @param triggerRef - Ref to the trigger element
 * @param animation - GSAP animation or timeline
 * @param options - ScrollTrigger options
 */

export interface UseScrollTriggerOptions extends ScrollTrigger.Vars {
  // Additional custom options can be added here
}

export function useScrollTrigger(
  triggerRef: React.RefObject<HTMLElement>,
  animation: gsap.core.Animation | gsap.core.Timeline | (() => gsap.core.Animation | gsap.core.Timeline),
  options: UseScrollTriggerOptions = {}
) {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!triggerRef.current) return

    const anim = typeof animation === 'function' ? animation() : animation

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      animation: anim,
      ...options,
    })

    return () => {
      scrollTriggerRef.current?.kill()
      scrollTriggerRef.current = null
    }
  }, [triggerRef, animation, options])

  return scrollTriggerRef.current
}
