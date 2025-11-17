/**
 * Shared Hooks - Central Exports
 *
 * Custom React hooks for WYKILLA website.
 * These hooks handle scroll, animation, responsive design, and accessibility.
 */

// Scroll hooks
export { useLenis } from './useLenis'
export type { UseLenisOptions, UseLenisReturn } from './useLenis'

// Animation hooks
export { useGSAP, useScrollTrigger } from './useGSAP'
export type { UseGSAPReturn, UseScrollTriggerOptions } from './useGSAP'

// Responsive design hooks
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsLargeDesktop,
  useBreakpoint,
} from './useMediaQuery'
export type { Breakpoint } from './useMediaQuery'

// Accessibility hooks
export { useReducedMotion, useAnimationConfig } from './useReducedMotion'
export type { AnimationConfig } from './useReducedMotion'
