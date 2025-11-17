import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Button Component
 *
 * Versatile button component with multiple variants and sizes.
 * Supports WYKILLA brand styling with glow effects.
 */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      glow = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-cyan to-magenta text-white hover:opacity-90 focus:ring-cyan',
      secondary:
        'bg-ink border-2 border-cyan text-cyan hover:bg-cyan hover:text-ink focus:ring-cyan',
      outline:
        'bg-transparent border-2 border-gray-400 text-gray-300 hover:border-cyan hover:text-cyan focus:ring-cyan',
      ghost:
        'bg-transparent text-cyan hover:bg-cyan/10 focus:ring-cyan',
      icon: 'bg-transparent text-cyan hover:bg-cyan/10 focus:ring-cyan p-2',
    }

    const sizeStyles = {
      sm: 'text-sm px-4 py-2 rounded-md',
      md: 'text-base px-6 py-3 rounded-lg',
      lg: 'text-lg px-8 py-4 rounded-xl',
    }

    const glowStyles = glow
      ? variant === 'primary'
        ? 'glow-cyan'
        : variant === 'secondary'
        ? 'glow-cyan'
        : ''
      : ''

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== 'icon' && sizeStyles[size],
          glowStyles,
          widthStyles,
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
