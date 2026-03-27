// components/sections/ProcessSection.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface ProcessStep { number: string; title: string; description: string }
const MOBILE_QUERY = '(max-width: 1024px), (hover: none) and (pointer: coarse)'

export function ProcessSection({ title, subtitle, steps }: { title: string; subtitle: string; steps: ProcessStep[] }) {
  const [headingVisible, setHeadingVisible] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(() => steps.map(() => false))
  const [mobilePulseSteps, setMobilePulseSteps] = useState<boolean[]>(() => steps.map(() => false))

  const headingRef = useRef<HTMLDivElement | null>(null)
  const stepRefs = useRef<Array<HTMLDivElement | null>>([])
  const visibleStepsRef = useRef<boolean[]>(visibleSteps)
  const hasScrolledRef = useRef(false)
  const lastScrollYRef = useRef(0)
  const pulseDoneRef = useRef<Set<number>>(new Set())
  const pulseTimeoutsRef = useRef<number[]>([])

  useEffect(() => {
    visibleStepsRef.current = visibleSteps
  }, [visibleSteps])

  useEffect(() => {
    setHeadingVisible(false)
    const initialSteps = steps.map(() => false)
    setVisibleSteps(initialSteps)
    visibleStepsRef.current = initialSteps
    setMobilePulseSteps(initialSteps)
    pulseDoneRef.current.clear()
  }, [steps.length])

  useEffect(() => {
    lastScrollYRef.current = window.scrollY

    const onScroll = () => {
      const nextScrollY = window.scrollY
      const delta = nextScrollY - lastScrollYRef.current
      if (Math.abs(delta) > 2) {
        hasScrolledRef.current = true
      }
      lastScrollYRef.current = nextScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setHeadingVisible(true)
      setVisibleSteps(steps.map(() => true))
      return
    }

    const mobileMedia = window.matchMedia(MOBILE_QUERY)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const target = entry.target as HTMLElement
          const targetKind = target.dataset.processKind

          if (targetKind === 'heading') {
            setHeadingVisible(true)
            observer.unobserve(target)
            return
          }

          const indexRaw = target.dataset.processIndex
          if (!indexRaw) {
            return
          }

          const index = Number(indexRaw)
          if (Number.isNaN(index)) {
            return
          }

          if (!visibleStepsRef.current[index]) {
            setVisibleSteps((prev) => {
              if (prev[index]) {
                return prev
              }
              const next = [...prev]
              next[index] = true
              return next
            })
          }

          if (mobileMedia.matches && hasScrolledRef.current && !pulseDoneRef.current.has(index)) {
            pulseDoneRef.current.add(index)

            setMobilePulseSteps((prev) => {
              if (prev[index]) {
                return prev
              }
              const next = [...prev]
              next[index] = true
              return next
            })

            const timeoutId = window.setTimeout(() => {
              setMobilePulseSteps((prev) => {
                if (!prev[index]) {
                  return prev
                }
                const next = [...prev]
                next[index] = false
                return next
              })
            }, 1720)
            pulseTimeoutsRef.current.push(timeoutId)
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

    stepRefs.current.forEach((step) => {
      if (step) {
        observer.observe(step)
      }
    })

    return () => observer.disconnect()
  }, [steps.length])

  useEffect(() => {
    return () => {
      pulseTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [])

  return (
    <section className="section-py relative overflow-hidden bg-[linear-gradient(180deg,#14161b_0%,#101318_52%,#171b23_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.045]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-steel/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-steel/10 blur-3xl" />

      <div className="container-site relative">
        <div
          ref={headingRef}
          data-process-kind="heading"
          className={`process-reveal text-center mb-12 md:mb-16 ${headingVisible ? 'is-visible' : ''}`}
        >
          <span className="inline-flex items-center rounded-full border border-steel/25 bg-steel/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-steel-light mb-4">
            {steps[0]?.number ?? '01'}-{steps[steps.length - 1]?.number ?? '04'}
          </span>
          <h2 className="text-white mb-4 md:mb-5">{title}</h2>
          <p className="text-neutral-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden xl:block h-px bg-gradient-to-r from-transparent via-steel/55 to-transparent" />
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden xl:block h-3 -translate-y-1 bg-[radial-gradient(ellipse_at_center,rgba(107,143,196,0.24),transparent_72%)]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 xl:gap-7">
            {steps.map((step, index) => {
              const isVisible = visibleSteps[index]
              const isMobilePulse = mobilePulseSteps[index]
              return (
                <div
                  key={step.number}
                  ref={(element) => {
                    stepRefs.current[index] = element
                  }}
                  data-process-kind="step"
                  data-process-index={index}
                  className={`process-reveal ${isVisible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: isVisible ? `${Math.min(index * 110, 440)}ms` : '0ms' }}
                >
                  <article className={`group process-step-card ${isVisible ? 'process-step-card-active' : ''} ${isMobilePulse ? 'process-mobile-pulse' : ''} relative flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.035] p-6 md:p-7 text-center shadow-[0_18px_42px_rgba(2,7,16,0.36)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-steel/55 hover:shadow-[0_28px_58px_rgba(18,33,60,0.48)]`}>
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_18%_12%,rgba(107,143,196,0.24),transparent_46%)] opacity-85" />
                    <div className="relative flex items-center gap-3 mb-5 md:mb-6">
                      <div className="process-step-node inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-steel/35 bg-steel/10">
                        <span className="font-display text-2xl font-semibold text-steel-light">{step.number}</span>
                      </div>
                      <span className="h-px flex-1 bg-gradient-to-r from-steel/45 via-steel/15 to-transparent" />
                    </div>

                    <h3 className="relative font-display text-xl text-white mb-3 leading-tight">{step.title}</h3>
                    <p className="relative text-sm md:text-base text-neutral-300/90 leading-relaxed">{step.description}</p>
                    <span className="process-step-bottom-line pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-steel/85 to-transparent scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

interface CTAProps {
  locale: string
  title: string
  subtitle: string
  primaryLabel: string
  secondaryLabel: string
  secondaryNumber: string
}

export function CTASection({ locale, title, subtitle, primaryLabel, secondaryLabel, secondaryNumber }: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-steel py-16 md:py-24 lg:py-28">
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative z-10 container-site text-center">
        <h2 className="text-white mb-4 md:mb-5">{title}</h2>
        <p className="text-white/75 text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">{subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href={`/${locale}/kontakt`}
            className="btn-premium-base btn-premium-light w-full sm:w-auto inline-flex h-12 md:h-14 items-center justify-center gap-2 px-6 md:px-8 text-sm font-semibold">
            {primaryLabel}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
          <div className="hidden sm:flex items-center gap-3"><div className="h-px w-5 bg-white/30"/><span className="text-white/60 text-sm">{secondaryLabel}</span><div className="h-px w-5 bg-white/30"/></div>
          <a href="tel:+493412412262"
            className="btn-premium-base btn-premium-glass w-full sm:w-auto inline-flex h-12 md:h-14 items-center justify-center gap-2.5 px-6 md:px-8 text-sm font-medium">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            {secondaryNumber}
          </a>
        </div>
      </div>
    </section>
  )
}
