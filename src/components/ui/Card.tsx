import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Card Component
 *
 * Basic card container with consistent padding and styling.
 * Supports hover effects and custom backgrounds.
 */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  gradient?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, gradient = false, children, ...props }, ref) => {
    const baseStyles =
      'rounded-xl border border-white/10 bg-ink/80 backdrop-blur-sm p-6 transition-all duration-300'

    const hoverStyles = hover
      ? 'hover:border-cyan/50 hover:shadow-lg hover:shadow-cyan/20 cursor-pointer'
      : ''

    const gradientStyles = gradient
      ? 'bg-gradient-to-br from-ink/90 to-bordeaux/20'
      : ''

    return (
      <div
        ref={ref}
        className={cn(baseStyles, hoverStyles, gradientStyles, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
