'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SERVICES } from '@/lib/services-data'

type Lang = 'de' | 'en'
type ScrollDirection = 'up' | 'down'
type MobilePulse = { index: number; direction: ScrollDirection } | null

const MOBILE_QUERY = '(max-width: 1024px), (hover: none) and (pointer: coarse)'

const SERVICE_IMAGES: Record<string, string> = {
  'fenster-tueren': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop',
  'glasfassaden': 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80&auto=format&fit=crop',
  'ganzglasanlagen': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80&auto=format&fit=crop',
  'reparaturverglasungen': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&auto=format&fit=crop',
  'spiegel': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80&auto=format&fit=crop',
  'terrassendaecher': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80&auto=format&fit=crop',
  'industrieverglasungen': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&q=80&auto=format&fit=crop',
  'glasbearbeitung': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80&auto=format&fit=crop',
}

interface LeistungenAnimatedGridProps {
  locale: string
}

export function LeistungenAnimatedGrid({ locale }: LeistungenAnimatedGridProps) {
  const lang: Lang = locale === 'en' ? 'en' : 'de'
  const [revealedCards, setRevealedCards] = useState<boolean[]>(() => SERVICES.map(() => false))
  const [mobilePulse, setMobilePulse] = useState<MobilePulse>(null)

  const revealedCardsRef = useRef(revealedCards)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const pulseDoneRef = useRef<Set<number>>(new Set())
  const hasScrolledRef = useRef(false)
  const lastScrollYRef = useRef(0)
  const scrollDirectionRef = useRef<ScrollDirection>('down')
  const pulseTimeoutsRef = useRef<number[]>([])

  useEffect(() => {
    revealedCardsRef.current = revealedCards
  }, [revealedCards])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setRevealedCards(SERVICES.map(() => true))
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

          if (!revealedCardsRef.current[cardIndex]) {
            setRevealedCards((prev) => {
              if (prev[cardIndex]) {
                return prev
              }
              const next = [...prev]
              next[cardIndex] = true
              return next
            })
          }

          if (mobileMedia.matches && hasScrolledRef.current && !pulseDoneRef.current.has(cardIndex)) {
            pulseDoneRef.current.add(cardIndex)
            const direction = scrollDirectionRef.current
            setMobilePulse({ index: cardIndex, direction })

            const timeoutId = window.setTimeout(() => {
              setMobilePulse((current) => (current?.index === cardIndex ? null : current))
            }, 1720)
            pulseTimeoutsRef.current.push(timeoutId)
          }

          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.22,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      pulseTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:gap-7">
      {SERVICES.map((service, index) => {
        const tr = service[lang]
        const isVisible = revealedCards[index]
        const isPulseActive = mobilePulse?.index === index
        const pulseClass = isPulseActive
          ? `leistungen-mobile-pulse leistungen-mobile-pulse-${mobilePulse.direction}`
          : ''

        return (
          <div
            key={service.slug}
            ref={(element) => {
              cardRefs.current[index] = element
            }}
            data-service-index={index}
            className={`leistungen-reveal ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: isVisible ? `${Math.min(index * 70, 490)}ms` : '0ms' }}
          >
            <Link
              href={`/${locale}/leistungen/${service.slug}`}
              className={`group leistungen-service-card ${pulseClass} relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 shadow-[0_14px_34px_rgba(16,24,40,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-steel/45 hover:shadow-[0_24px_52px_rgba(36,57,90,0.18)]`}
            >
              <div className="relative h-[210px] md:h-[228px] overflow-hidden">
                <Image
                  src={SERVICE_IMAGES[service.slug]}
                  alt={tr.title}
                  fill
                  className="leistungen-card-image object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-[0.6deg]"
                  sizes="(max-width:640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite/72 via-anthracite/12 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(107,143,196,0.28),transparent_44%)] opacity-80" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="inline-flex h-7 items-center rounded-md border border-white/25 bg-black/25 px-2.5 text-[10px] font-medium tracking-[0.14em] uppercase text-white/90 backdrop-blur-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {service.featured && (
                    <span className="inline-flex h-7 items-center rounded-md border border-steel-light/45 bg-steel/25 px-2.5 text-[10px] font-medium tracking-[0.12em] uppercase text-white/95 backdrop-blur-sm">
                      {locale === 'de' ? 'Top Leistung' : 'Top Service'}
                    </span>
                  )}
                </div>

                <span className="leistungen-card-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[125%] group-hover:opacity-100" />
              </div>

              <div className="relative flex flex-1 flex-col p-6 md:p-7">
                <h2 className="font-display text-xl text-graphite transition-colors mb-2 leading-tight group-hover:text-steel">
                  {tr.title}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">{tr.shortDesc}</p>
                <ul className="flex flex-col gap-1.5 mb-4">
                  {tr.benefits.slice(0, 3).map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-neutral-600">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-steel shadow-[0_0_0_4px_rgba(74,111,165,0.15)] shrink-0" />
                      <span className="leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-neutral-200/80 flex items-center justify-between">
                  <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                    {locale === 'de' ? 'Mehr erfahren' : 'Learn more'}
                  </span>
                  <span className="leistungen-card-arrow inline-flex h-8 w-8 items-center justify-center rounded-full border border-steel/35 bg-steel/10 text-steel transition-all duration-300 group-hover:bg-steel group-hover:text-white group-hover:translate-x-0.5">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
              <span className="leistungen-card-bottom-line pointer-events-none absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-steel/80 to-transparent scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
