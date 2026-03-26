'use client'
// components/layout/Header.tsx
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const other = locale === 'de' ? 'en' : 'de'
  const altPath = pathname.replace(`/${locale}`, `/${other}`)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/leistungen`, label: t('services') },
    { href: `/${locale}/referenzen`, label: t('references') },
    { href: `/${locale}/ueber-uns`, label: t('about') },
    { href: `/${locale}/faq`, label: t('faq') },
    { href: `/${locale}/kontakt`, label: t('contact') },
  ]

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === `/${locale}` : pathname.startsWith(href)

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]' : 'bg-transparent'
        )}
      >
        <div className="container-site">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex flex-col leading-none gap-0.5 shrink-0">
              <span className={cn('font-display text-base md:text-lg font-semibold tracking-tight transition-colors', scrolled ? 'text-graphite' : 'text-white')}>
                Glaserei Schubert
              </span>
              <span className={cn('text-[10px] tracking-[0.2em] uppercase transition-colors', scrolled ? 'text-steel' : 'text-white/60')}>
                Leipzig
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {links.map(l => (
                <Link key={l.href} href={l.href}
                  className={cn(
                    'text-sm tracking-wide transition-colors duration-200 relative py-1',
                    'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-steel after:transition-all after:duration-300 hover:after:w-full',
                    isActive(l.href)
                      ? scrolled ? 'text-steel after:w-full' : 'text-white after:w-full after:bg-white'
                      : scrolled ? 'text-neutral-600 hover:text-graphite' : 'text-white/80 hover:text-white'
                  )}>
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href={altPath}
                className={cn('text-[11px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-sm border transition-colors',
                  scrolled ? 'border-neutral-200 text-neutral-500 hover:border-graphite hover:text-graphite' : 'border-white/30 text-white/60 hover:border-white hover:text-white'
                )}>
                {other.toUpperCase()}
              </Link>
              <Link href={`/${locale}/kontakt`}
                className={cn('inline-flex h-10 items-center px-5 text-sm font-medium rounded-sm transition-all duration-300',
                  scrolled ? 'bg-graphite text-white hover:bg-anthracite shadow-sm' : 'bg-white/15 text-white border border-white/40 hover:bg-white hover:text-graphite'
                )}>
                {locale === 'de' ? 'Angebot anfragen' : 'Get a quote'}
              </Link>
            </div>

            {/* Mobile burger */}
            <button onClick={() => setOpen(!open)} aria-label="Menü" className="lg:hidden p-2 flex flex-col gap-[5px]">
              {[0,1,2].map(i => (
                <span key={i} className={cn('block h-0.5 w-6 transition-all duration-300',
                  scrolled || open ? 'bg-graphite' : 'bg-white',
                  i === 0 && open && 'translate-y-2 rotate-45',
                  i === 1 && open && 'opacity-0',
                  i === 2 && open && '-translate-y-2 -rotate-45'
                )} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={cn(
        'fixed inset-0 z-40 bg-anthracite flex flex-col lg:hidden transition-all duration-500',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div className="flex h-16 items-center px-5 border-b border-white/10">
          <span className="font-display text-lg font-semibold text-white">Glaserei Schubert</span>
        </div>
        <nav className="flex flex-col px-5 py-8 gap-1 flex-1 overflow-y-auto">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={cn('text-xl font-display font-medium py-3.5 border-b border-white/10 transition-colors',
                isActive(l.href) ? 'text-steel' : 'text-white/80 hover:text-white')}
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 pb-8 flex items-center justify-between">
          <Link href={altPath} onClick={() => setOpen(false)} className="text-sm text-white/50 hover:text-white uppercase tracking-widest">
            {other === 'de' ? 'Deutsch' : 'English'}
          </Link>
          <Link href={`/${locale}/kontakt`} onClick={() => setOpen(false)}
            className="inline-flex h-11 items-center px-6 bg-steel text-white text-sm font-medium rounded-sm hover:bg-steel-dark transition-colors">
            {locale === 'de' ? 'Angebot anfragen' : 'Get a quote'}
          </Link>
        </div>
      </div>
    </>
  )
}