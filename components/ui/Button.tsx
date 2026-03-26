// components/ui/Button.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'steel'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none'

    const variants = {
      primary:
        'bg-graphite text-white hover:bg-anthracite focus-visible:ring-graphite shadow-sm hover:shadow-md',
      secondary:
        'bg-white text-graphite border border-neutral-200 hover:border-graphite hover:bg-neutral-50 focus-visible:ring-graphite',
      outline:
        'bg-transparent border-2 border-white text-white hover:bg-white hover:text-graphite focus-visible:ring-white',
      ghost:
        'bg-transparent text-graphite hover:bg-neutral-100 focus-visible:ring-graphite',
      steel:
        'bg-steel text-white hover:bg-steel-dark focus-visible:ring-steel shadow-sm hover:shadow-md',
    }

    const sizes = {
      sm: 'h-9 px-4 text-sm rounded-sm gap-1.5',
      md: 'h-11 px-6 text-sm rounded-sm gap-2',
      lg: 'h-13 px-8 text-base rounded-sm gap-2.5',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }
