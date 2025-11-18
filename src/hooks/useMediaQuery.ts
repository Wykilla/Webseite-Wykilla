'use client'

import { useEffect, useState } from 'react'

/**
 * useMediaQuery Hook
 *
 * Detects if a media query matches and updates on resize.
 * Useful for responsive behavior in React components.
 *
 * @param query - CSS media query string
 * @returns Boolean indicating if the query matches
 */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)

    // Set initial value
    setMatches(mediaQuery.matches)

    // Handler for media query changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
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
  }, [query])

  return matches
}

/**
 * Tailwind Breakpoint Hooks
 *
 * Convenience hooks for common Tailwind breakpoints.
 */

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}

export function useIsLargeDesktop(): boolean {
  return useMediaQuery('(min-width: 1280px)')
}

/**
 * useBreakpoint Hook
 *
 * Returns the current breakpoint name based on Tailwind's default breakpoints.
 */

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'large'

export function useBreakpoint(): Breakpoint {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const isLargeDesktop = useIsLargeDesktop()

  if (isLargeDesktop) return 'large'
  if (isDesktop) return 'desktop'
  if (isTablet) return 'tablet'
  if (isMobile) return 'mobile'

  // Fallback
  return 'desktop'
}
