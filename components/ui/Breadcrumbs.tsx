// components/ui/Breadcrumbs.tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  light?: boolean
  className?: string
}

export function Breadcrumbs({ items, light = false, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1.5 text-xs', className)}
    >
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg
              className={cn('h-3 w-3 shrink-0', light ? 'text-white/30' : 'text-neutral-300')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={cn(
                'transition-colors',
                light
                  ? 'text-white/50 hover:text-white'
                  : 'text-neutral-400 hover:text-graphite'
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(light ? 'text-white/80' : 'text-graphite', 'font-medium')}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
