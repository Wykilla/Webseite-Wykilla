'use client'

import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

/**
 * useLenis Hook
 *
 * Initializes and manages Lenis smooth scrolling library.
 * Provides methods to control scroll behavior programmatically.
 *
 * @param options - Lenis configuration options
 * @returns Lenis instance and control methods
 */

export interface UseLenisOptions {
  duration?: number
  easing?: (t: number) => number
  smoothWheel?: boolean
  touchMultiplier?: number
  infinite?: boolean
  autoResize?: boolean
}

export interface UseLenisReturn {
  lenis: Lenis | null
  scrollTo: (target: string | number | HTMLElement, options?: any) => void
  start: () => void
  stop: () => void
}

export function useLenis(options: UseLenisOptions = {}): UseLenisReturn {
  const lenisRef = useRef<Lenis | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      smoothWheel: options.smoothWheel ?? true,
      touchMultiplier: options.touchMultiplier ?? 2,
      infinite: options.infinite ?? false,
      autoResize: options.autoResize ?? true,
    })

    lenisRef.current = lenis
    setIsReady(true)

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
      lenisRef.current = null
      setIsReady(false)
    }
  }, [options.duration, options.smoothWheel, options.touchMultiplier, options.infinite, options.autoResize])

  // Scroll to target
  const scrollTo = (target: string | number | HTMLElement, scrollOptions?: any) => {
    if (!lenisRef.current) return
    lenisRef.current.scrollTo(target, scrollOptions)
  }

  // Start scrolling
  const start = () => {
    if (!lenisRef.current) return
    lenisRef.current.start()
  }

  // Stop scrolling
  const stop = () => {
    if (!lenisRef.current) return
    lenisRef.current.stop()
  }

  return {
    lenis: isReady ? lenisRef.current : null,
    scrollTo,
    start,
    stop,
  }
}
