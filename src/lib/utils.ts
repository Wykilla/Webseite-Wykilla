import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility Functions
 *
 * Helper functions used throughout the WYKILLA website.
 */

/**
 * cn - Class Name Utility
 *
 * Combines clsx and tailwind-merge for optimal Tailwind CSS class merging.
 * Allows conditional classes and ensures Tailwind conflicts are resolved correctly.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * cn('px-2 py-1', 'px-4') // Returns: 'py-1 px-4' (px-2 overridden)
 * cn('text-cyan', isActive && 'text-magenta') // Conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
