// components/ui/Card.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', className, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white',
      bordered: 'bg-white border border-neutral-200',
      elevated: 'bg-white shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]',
      glass: 'bg-white/70 backdrop-blur-md border border-white/30',
    }
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8 md:p-10',
    }

    return (
      <div
        ref={ref}
        className={cn('rounded-sm', variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

// ─── Badge ───────────────────────────────────────────────────────────────────

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'steel' | 'light'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variants = {
      default: 'bg-neutral-100 text-neutral-600',
      steel: 'bg-steel/10 text-steel',
      light: 'bg-white/20 text-white border border-white/30',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-3 py-1 text-xs font-medium tracking-widest uppercase rounded-sm',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
Badge.displayName = 'Badge'

// ─── Container ───────────────────────────────────────────────────────────────

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', className, children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-6 md:px-10',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = 'Container'

// ─── Section ─────────────────────────────────────────────────────────────────

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article'
  size?: 'sm' | 'md' | 'lg'
  bg?: 'white' | 'light' | 'dark' | 'anthracite'
}

function Section({
  as: Tag = 'section',
  size = 'md',
  bg = 'white',
  className,
  children,
  ...props
}: SectionProps) {
  const sizes = {
    sm: 'py-16 md:py-20',
    md: 'py-20 md:py-28',
    lg: 'py-24 md:py-36',
  }
  const bgs = {
    white: 'bg-white',
    light: 'bg-neutral-50',
    dark: 'bg-graphite',
    anthracite: 'bg-anthracite',
  }

  return (
    <Tag className={cn(sizes[size], bgs[bg], className)} {...props}>
      {children}
    </Tag>
  )
}

// ─── SectionHeading ───────────────────────────────────────────────────────────

interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <div className={cn(isCenter ? 'text-center' : 'text-left', 'mb-14 md:mb-20', className)}>
      {badge && (
        <div className={cn('mb-4', isCenter && 'flex justify-center')}>
          <Badge variant={light ? 'light' : 'steel'}>{badge}</Badge>
        </div>
      )}
      {!isCenter && <span className="accent-line" />}
      <h2
        className={cn(
          'font-display text-balance',
          light ? 'text-white' : 'text-graphite'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed max-w-2xl',
            isCenter && 'mx-auto',
            light ? 'text-neutral-300' : 'text-neutral-500'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export { Card, Badge, Container, Section, SectionHeading }
