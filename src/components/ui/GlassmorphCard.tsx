import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * GlassmorphCard Component
 *
 * Card with glassmorphism effect - frosted glass aesthetic.
 * Perfect for overlaying content on complex backgrounds.
 */

export interface GlassmorphCardProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: 'low' | 'medium' | 'high'
  glow?: boolean
  border?: boolean
}

const GlassmorphCard = forwardRef<HTMLDivElement, GlassmorphCardProps>(
  (
    {
      className,
      intensity = 'medium',
      glow = false,
      border = true,
      children,
      ...props
    },
    ref
  ) => {
    const intensityStyles = {
      low: 'backdrop-blur-sm bg-white/5',
      medium: 'backdrop-blur-md bg-white/10',
      high: 'backdrop-blur-lg bg-white/15',
    }

    const borderStyles = border ? 'border border-white/20' : ''
    const glowStyles = glow ? 'shadow-lg shadow-cyan/10' : ''

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl p-8 transition-all duration-300',
          intensityStyles[intensity],
          borderStyles,
          glowStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassmorphCard.displayName = 'GlassmorphCard'

export default GlassmorphCard
