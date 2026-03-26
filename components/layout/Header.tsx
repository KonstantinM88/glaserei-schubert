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
  const mobileHeaderHeightClass = 'h-16 md:h-20'
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

  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
          open
            ? 'bg-anthracite/95 backdrop-blur-md border-b border-white/10'
            : scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
              : 'bg-transparent'
        )}
      >
        <div className="container-site">
          <div className={cn('flex items-center justify-between', mobileHeaderHeightClass)}>
            {/* Logo */}
            <Link href={`/${locale}`} className="flex flex-col leading-none gap-0.5 shrink-0">
              <span className={cn('font-display text-base md:text-lg font-semibold tracking-tight transition-colors', open ? 'text-white' : scrolled ? 'text-graphite' : 'text-white')}>
                Glaserei Schubert
              </span>
              <span className={cn('text-[10px] tracking-[0.2em] uppercase transition-colors', open ? 'text-white/60' : scrolled ? 'text-steel' : 'text-white/60')}>
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
                  scrolled
                    ? 'btn-premium-base btn-premium-steel'
                    : 'btn-premium-base btn-premium-glass'
                )}>
                {locale === 'de' ? 'Angebot anfragen' : 'Get a quote'}
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menü"
              aria-expanded={open}
              className={cn(
                'lg:hidden p-2.5 rounded-full border flex flex-col gap-[5px] transition-all duration-300',
                open
                  ? 'border-white/20 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]'
                  : scrolled
                    ? 'border-neutral-300/90 bg-white/85'
                    : 'border-white/25 bg-black/10 backdrop-blur-sm'
              )}
            >
              {[0,1,2].map(i => (
                <span key={i} className={cn('block h-0.5 w-6 transition-all duration-300',
                  open ? 'bg-white' : scrolled ? 'bg-graphite' : 'bg-white',
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
        'fixed left-0 right-0 bottom-0 top-16 md:top-20 z-40 lg:hidden overflow-hidden transition-all duration-500',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div className="absolute inset-0 bg-anthracite" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(107,143,196,0.26),transparent_42%),radial-gradient(circle_at_82%_88%,rgba(74,111,165,0.18),transparent_46%)]" />
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-steel/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-steel/10 blur-3xl" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <nav className="relative flex flex-col px-5 py-8 gap-1 flex-1 overflow-y-auto">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                'group relative flex items-end justify-between py-3.5 border-b border-white/10 transition-all duration-500',
                open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0',
                isActive(l.href) ? 'text-steel' : 'text-white/85 hover:text-white'
              )}
              style={{ transitionDelay: open ? `${80 + i * 55}ms` : '0ms' }}
            >
              <span className="font-display text-[2rem] leading-none tracking-tight">
                {l.label}
              </span>
              <span
                className={cn(
                  'text-[11px] font-medium tracking-[0.16em] uppercase transition-colors',
                  isActive(l.href) ? 'text-steel-light' : 'text-white/30 group-hover:text-white/50'
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'absolute bottom-[-1px] left-0 h-px bg-gradient-to-r from-steel/80 to-transparent transition-all duration-500',
                  isActive(l.href) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-2/3 group-hover:opacity-100'
                )}
              />
            </Link>
          ))}
        </nav>
        <div className="relative px-5 pb-8 pt-4">
          <div className="rounded-xl border border-white/12 bg-white/[0.03] backdrop-blur-sm px-4 py-4 flex items-center justify-between">
            <Link
              href={altPath}
              onClick={() => setOpen(false)}
              className="text-sm text-white/65 hover:text-white uppercase tracking-widest transition-colors"
            >
              {other === 'de' ? 'Deutsch' : 'English'}
            </Link>
            <Link
              href={`/${locale}/kontakt`}
              onClick={() => setOpen(false)}
              className="btn-premium-base btn-premium-steel inline-flex h-11 items-center px-6 text-sm font-medium"
            >
              {locale === 'de' ? 'Angebot anfragen' : 'Get a quote'}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
