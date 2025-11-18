'use client'

import { useEffect, useState } from 'react'

/**
 * useReducedMotion Hook
 *
 * Detects user's motion preference via prefers-reduced-motion media query.
 * Essential for accessibility - allows disabling animations for users with
 * vestibular disorders or motion sensitivity.
 *
 * @returns Boolean - true if user prefers reduced motion
 */

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Handler for preference changes
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler)
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler)
      } else {
        mediaQuery.removeListener(handler)
      }
    }
  }, [])

  return prefersReducedMotion
}

/**
 * useAnimationConfig Hook
 *
 * Returns animation configuration object that respects user's motion preferences.
 * Use this to conditionally adjust animation parameters.
 *
 * @returns Animation config with adjusted durations/easings for reduced motion
 */

export interface AnimationConfig {
  duration: number
  easing: string
  shouldAnimate: boolean
}

export function useAnimationConfig(
  normalDuration: number = 1.2,
  normalEasing: string = 'power2.out'
): AnimationConfig {
  const prefersReducedMotion = useReducedMotion()

  return {
    duration: prefersReducedMotion ? 0.01 : normalDuration, // Near-instant for reduced motion
    easing: prefersReducedMotion ? 'none' : normalEasing,
    shouldAnimate: !prefersReducedMotion,
  }
}
