// components/sections/ServicesGrid.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SERVICES } from '@/lib/services-data'

type ScrollDirection = 'up' | 'down'
type MobilePulse = { index: number; direction: ScrollDirection } | null

const MOBILE_QUERY = '(max-width: 1024px), (hover: none) and (pointer: coarse)'

const SERVICE_IMAGES: Record<string, string> = {
  'fenster-tueren':       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
  'glasfassaden':         'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop',
  'ganzglasanlagen':      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80&auto=format&fit=crop',
  'reparaturverglasungen':'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop',
  'spiegel':              'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&auto=format&fit=crop',
  'terrassendaecher':     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop',
  'industrieverglasungen':'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&auto=format&fit=crop',
  'glasbearbeitung':      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop',
}

interface ServicesGridProps {
  locale: string
  title: string
  subtitle: string
  limit?: number
  variant?: 'cards' | 'grid'
  enableMobileScrollPulse?: boolean
  enableScrollReveal?: boolean
}

export function ServicesGrid({
  locale,
  title,
  subtitle,
  limit,
  variant = 'cards',
  enableMobileScrollPulse = false,
  enableScrollReveal = false,
}: ServicesGridProps) {
  const services = limit ? SERVICES.slice(0, limit) : SERVICES
  const lang = locale as 'de' | 'en'
  const [mobilePulse, setMobilePulse] = useState<MobilePulse>(null)
  const [revealedCards, setRevealedCards] = useState<boolean[]>(() =>
    services.map(() => !enableScrollReveal),
  )
  const revealedCardsRef = useRef(revealedCards)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const hasScrolledRef = useRef(false)
  const lastScrollYRef = useRef(0)
  const scrollDirectionRef = useRef<ScrollDirection>('down')
  const pulseDoneRef = useRef<Set<number>>(new Set())
  const pulseTimeoutsRef = useRef<number[]>([])
  const gridCols =
    variant === 'grid'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'

  useEffect(() => {
    revealedCardsRef.current = revealedCards
  }, [revealedCards])

  useEffect(() => {
    setRevealedCards(services.map(() => !enableScrollReveal))
    pulseDoneRef.current.clear()
  }, [enableScrollReveal, services.length])

  useEffect(() => {
    if (!enableMobileScrollPulse) {
      return
    }

    lastScrollYRef.current = window.scrollY

    const onScroll = () => {
      const nextScrollY = window.scrollY
      const delta = nextScrollY - lastScrollYRef.current
      if (Math.abs(delta) > 2) {
        hasScrolledRef.current = true
        scrollDirectionRef.current = delta > 0 ? 'down' : 'up'
      }
      lastScrollYRef.current = nextScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enableMobileScrollPulse])

  useEffect(() => {
    if (!enableMobileScrollPulse && !enableScrollReveal) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      if (enableScrollReveal) {
        setRevealedCards(services.map(() => true))
      }
      return
    }

    const mobileMedia = window.matchMedia(MOBILE_QUERY)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const cardIndexRaw = entry.target.getAttribute('data-service-index')
          if (!cardIndexRaw) {
            return
          }

          const cardIndex = Number(cardIndexRaw)
          if (Number.isNaN(cardIndex)) {
            return
          }

          if (enableScrollReveal && !revealedCardsRef.current[cardIndex]) {
            setRevealedCards((prev) => {
              if (prev[cardIndex]) {
                return prev
              }
              const next = [...prev]
              next[cardIndex] = true
              return next
            })
          }

          if (
            enableMobileScrollPulse &&
            mobileMedia.matches &&
            hasScrolledRef.current &&
            !pulseDoneRef.current.has(cardIndex)
          ) {
            pulseDoneRef.current.add(cardIndex)
            setMobilePulse({ index: cardIndex, direction: scrollDirectionRef.current })

            const timeoutId = window.setTimeout(() => {
              setMobilePulse((current) => (current?.index === cardIndex ? null : current))
            }, 1720)
            pulseTimeoutsRef.current.push(timeoutId)
          }

          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card)
      }
    })

    return () => observer.disconnect()
  }, [enableMobileScrollPulse, enableScrollReveal, services.length])

  useEffect(() => {
    return () => {
      pulseTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [])

  return (
    <section className="section-py bg-[linear-gradient(180deg,#f7f8fb_0%,#ffffff_52%,#f8f9fc_100%)]">
      <div className="container-site">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center rounded-full border border-steel/20 bg-steel/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-steel mb-3 md:mb-4">
            {locale === 'de' ? 'Premium Leistungen' : 'Premium Services'}
          </span>
          <h2 className="text-graphite mb-4 md:mb-5">{title}</h2>
          <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        {/* Services grid */}
        <div className={`grid ${gridCols} gap-4 md:gap-5 xl:gap-6`}>
          {services.map((service, index) => {
            const tr = service[lang]
            const isVisible = revealedCards[index] ?? !enableScrollReveal
            const isPulseActive = mobilePulse?.index === index
            const pulseClass =
              enableMobileScrollPulse && isPulseActive
                ? `leistungen-mobile-pulse leistungen-mobile-pulse-${mobilePulse.direction}`
                : ''

            return (
              <div
                key={service.slug}
                ref={(element) => {
                  cardRefs.current[index] = element
                }}
                data-service-index={index}
                className={enableScrollReveal ? `leistungen-reveal ${isVisible ? 'is-visible' : ''}` : ''}
                style={enableScrollReveal ? { transitionDelay: isVisible ? `${Math.min(index * 70, 490)}ms` : '0ms' } : undefined}
              >
                <Link
                  href={`/${locale}/leistungen/${service.slug}`}
                  className={`group leistungen-service-card ${pulseClass} relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 shadow-[0_12px_30px_rgba(16,24,40,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-steel/45 hover:shadow-[0_24px_50px_rgba(36,57,90,0.2)]`}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/0 via-white/0 to-steel/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES[service.slug]}
                      alt={tr.title}
                      fill
                      className="leistungen-card-image object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-anthracite/82 via-anthracite/12 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(107,143,196,0.30),transparent_46%)] opacity-75" />
                    <div className="absolute left-4 top-4 inline-flex h-8 items-center rounded-md border border-white/25 bg-black/25 px-2.5 text-[11px] font-medium tracking-[0.12em] uppercase text-white/90 backdrop-blur-sm">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-xl leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                        {tr.title}
                      </h3>
                    </div>
                    <span className="leistungen-card-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[125%] group-hover:opacity-100" />
                  </div>
                  {/* Content */}
                  <div className="relative flex flex-1 flex-col p-5 md:p-6">
                    <p className="text-sm text-neutral-600 leading-relaxed flex-1 line-clamp-3">
                      {tr.shortDesc}
                    </p>
                    <div className="mt-5 pt-4 border-t border-neutral-200/80 flex items-center justify-between">
                      <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                        {locale === 'de' ? 'Glaserei Schubert' : 'Glaserei Schubert'}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-steel">
                        <span>{locale === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                      </span>
                    </div>
                  </div>
                  <span className="leistungen-card-bottom-line pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-steel/75 to-transparent scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </div>
            )
          })}
        </div>

        {limit && (
          <div className="mt-8 md:mt-12 text-center">
            <Link href={`/${locale}/leistungen`}
              className="btn-premium-base btn-premium-steel inline-flex h-11 md:h-12 items-center gap-2 px-6 md:px-8 text-sm font-medium">
              {locale === 'de' ? 'Alle Leistungen ansehen' : 'View all services'}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
