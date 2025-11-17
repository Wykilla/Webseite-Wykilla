import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Input Component
 *
 * Styled text input with WYKILLA branding.
 * Supports labels, error states, and various input types.
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      fullWidth = false,
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    const baseStyles =
      'px-4 py-3 rounded-lg bg-ink border-2 text-white placeholder:text-white/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ink'

    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-white/20 focus:border-cyan focus:ring-cyan'

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-white/80 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={inputId}
          className={cn(baseStyles, stateStyles, widthStyles, className)}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
