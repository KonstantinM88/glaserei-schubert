'use client'

import { useEffect, useRef, useState } from 'react'

interface TestimonialItem {
  name: string
  role: string
  text: string
  img: string
}

interface TestimonialsSectionProps {
  locale: string
  title: string
  testimonials: TestimonialItem[]
}

const MOBILE_QUERY = '(max-width: 1024px), (hover: none) and (pointer: coarse)'

export function TestimonialsSection({ locale, title, testimonials }: TestimonialsSectionProps) {
  const [headingVisible, setHeadingVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => testimonials.map(() => false))
  const [tapActiveCards, setTapActiveCards] = useState<boolean[]>(() => testimonials.map(() => false))

  const headingRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const visibleCardsRef = useRef<boolean[]>(visibleCards)
  const tapRestartTimeoutsRef = useRef<number[]>([])
  const tapEndTimeoutsRef = useRef<number[]>([])

  useEffect(() => {
    visibleCardsRef.current = visibleCards
  }, [visibleCards])

  useEffect(() => {
    setHeadingVisible(false)
    const initial = testimonials.map(() => false)
    setVisibleCards(initial)
    visibleCardsRef.current = initial
    setTapActiveCards(initial)

    tapRestartTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    tapEndTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    tapRestartTimeoutsRef.current = []
    tapEndTimeoutsRef.current = []
  }, [testimonials.length])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setHeadingVisible(true)
      setVisibleCards(testimonials.map(() => true))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const target = entry.target as HTMLElement
          const kind = target.dataset.testimonialKind

          if (kind === 'heading') {
            setHeadingVisible(true)
            observer.unobserve(target)
            return
          }

          const indexRaw = target.dataset.testimonialIndex
          if (!indexRaw) {
            return
          }

          const index = Number(indexRaw)
          if (Number.isNaN(index)) {
            return
          }

          if (!visibleCardsRef.current[index]) {
            setVisibleCards((prev) => {
              if (prev[index]) {
                return prev
              }
              const next = [...prev]
              next[index] = true
              return next
            })
          }

          observer.unobserve(target)
        })
      },
      {
        threshold: 0.24,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    if (headingRef.current) {
      observer.observe(headingRef.current)
    }

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card)
      }
    })

    return () => observer.disconnect()
  }, [testimonials.length])

  useEffect(() => {
    return () => {
      tapRestartTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      tapEndTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [])

  const triggerMobileTapEffect = (index: number) => {
    if (!window.matchMedia(MOBILE_QUERY).matches) {
      return
    }

    window.clearTimeout(tapRestartTimeoutsRef.current[index])
    window.clearTimeout(tapEndTimeoutsRef.current[index])

    setTapActiveCards((prev) => {
      const next = [...prev]
      next[index] = false
      return next
    })

    tapRestartTimeoutsRef.current[index] = window.setTimeout(() => {
      setTapActiveCards((prev) => {
        const next = [...prev]
        next[index] = true
        return next
      })

      tapEndTimeoutsRef.current[index] = window.setTimeout(() => {
        setTapActiveCards((prev) => {
          if (!prev[index]) {
            return prev
          }
          const next = [...prev]
          next[index] = false
          return next
        })
      }, 900)
    }, 18)
  }

  return (
    <section className="section-py relative overflow-hidden bg-[linear-gradient(180deg,#f7f8fb_0%,#ffffff_48%,#f3f6fb_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(44,44,46,1) 1px, transparent 1px), linear-gradient(90deg, rgba(44,44,46,1) 1px, transparent 1px)', backgroundSize: '74px 74px' }} />
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-steel/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-steel/10 blur-3xl" />

      <div className="container-site relative">
        <div
          ref={headingRef}
          data-testimonial-kind="heading"
          className={`testimonials-reveal text-center mb-10 md:mb-14 ${headingVisible ? 'is-visible' : ''}`}
        >
          <span className="inline-flex items-center rounded-full border border-steel/20 bg-steel/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-steel mb-3 md:mb-4">
            {locale === 'de' ? 'Kundenstimmen' : 'Client Voices'}
          </span>
          <h2 className="text-graphite mb-4">{title}</h2>
          <p className="text-neutral-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {locale === 'de'
              ? 'Vertrauen, Präzision und saubere Umsetzung: Das sagen unsere Kunden über die Zusammenarbeit.'
              : 'Trust, precision and clean execution: what our clients say about working with us.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleCards[index]
            const isTapActive = tapActiveCards[index]
            return (
              <div
                key={testimonial.name}
                ref={(element) => {
                  cardRefs.current[index] = element
                }}
                data-testimonial-kind="card"
                data-testimonial-index={index}
                className={`testimonials-reveal ${isVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: isVisible ? `${Math.min(index * 110, 330)}ms` : '0ms' }}
              >
                <article
                  onPointerDown={(event) => {
                    if (event.pointerType === 'mouse') {
                      return
                    }
                    triggerMobileTapEffect(index)
                  }}
                  className={`group testimonial-card ${isTapActive ? 'testimonial-card-tap' : ''} relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 p-6 md:p-7 shadow-[0_14px_34px_rgba(16,24,40,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-steel/40 hover:shadow-[0_26px_52px_rgba(24,40,68,0.18)]`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(107,143,196,0.18),transparent_48%)]" />
                  <div className="relative flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, starIndex) => (
                      <svg key={starIndex} className="h-4 w-4 text-amber-400 fill-amber-400 drop-shadow-[0_1px_4px_rgba(251,191,36,0.45)]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <p className="relative text-[1.02rem] text-neutral-700 leading-relaxed italic mb-7">{testimonial.text}</p>

                  <div className="relative mt-auto pt-4 border-t border-neutral-200/80 flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full overflow-hidden shrink-0 border border-neutral-200 shadow-[0_8px_18px_rgba(17,24,39,0.12)]">
                      <img src={testimonial.img} alt={testimonial.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[1.02rem] font-semibold text-graphite leading-tight">{testimonial.name}</p>
                      <p className="text-sm text-neutral-400 leading-tight mt-1">{testimonial.role}</p>
                    </div>
                  </div>

                  <span className="testimonial-card-bottom-line pointer-events-none absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-steel/80 to-transparent scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
