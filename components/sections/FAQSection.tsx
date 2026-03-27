'use client'
// components/sections/FAQSection.tsx
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface FAQItem { question: string; answer: string }

function FAQItemCard({ question, answer, defaultOpen }: FAQItem & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)

  return (
    <article className={cn('group faq-item relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 shadow-[0_14px_34px_rgba(16,24,40,0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:border-steel/40 hover:shadow-[0_22px_46px_rgba(24,40,68,0.16)]', open && 'faq-item-open border-steel/35 bg-white')}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(107,143,196,0.16),transparent_52%)]" />

      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="relative flex w-full items-start justify-between gap-4 p-5 md:p-6 text-left"
      >
        <span className={cn('font-medium text-sm md:text-base leading-relaxed transition-colors', open ? 'text-steel-dark' : 'text-graphite group-hover:text-steel')}>
          {question}
        </span>
        <span className={cn('faq-item-icon mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300', open ? 'border-steel/60 bg-steel text-white rotate-45 shadow-[0_10px_20px_rgba(45,74,122,0.32)]' : 'border-neutral-200 bg-neutral-50 text-graphite group-hover:border-steel/35 group-hover:bg-steel/10')}>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div className={cn('relative grid transition-[grid-template-rows,opacity,padding] duration-500 ease-out', open ? 'grid-rows-[1fr] opacity-100 px-5 pb-5 md:px-6 md:pb-6' : 'grid-rows-[0fr] opacity-0 px-5 md:px-6')}>
        <div className="overflow-hidden">
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed pr-8 md:pr-10">{answer}</p>
        </div>
      </div>

      <span className="faq-item-bottom-line pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-steel/80 to-transparent scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  )
}

export function FAQSection({ title, subtitle, items }: { title: string; subtitle: string; items: FAQItem[] }) {
  const [headingVisible, setHeadingVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() => items.map(() => false))

  const headingRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const visibleItemsRef = useRef<boolean[]>(visibleItems)

  useEffect(() => {
    visibleItemsRef.current = visibleItems
  }, [visibleItems])

  useEffect(() => {
    setHeadingVisible(false)
    const initial = items.map(() => false)
    setVisibleItems(initial)
    visibleItemsRef.current = initial
  }, [items.length])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setHeadingVisible(true)
      setVisibleItems(items.map(() => true))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const target = entry.target as HTMLElement
          const kind = target.dataset.faqKind

          if (kind === 'heading') {
            setHeadingVisible(true)
            observer.unobserve(target)
            return
          }

          const indexRaw = target.dataset.faqIndex
          if (!indexRaw) {
            return
          }

          const index = Number(indexRaw)
          if (Number.isNaN(index)) {
            return
          }

          if (!visibleItemsRef.current[index]) {
            setVisibleItems((prev) => {
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
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    if (headingRef.current) {
      observer.observe(headingRef.current)
    }

    itemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item)
      }
    })

    return () => observer.disconnect()
  }, [items.length])

  return (
    <section className="section-py relative overflow-hidden bg-[linear-gradient(180deg,#f7f8fb_0%,#ffffff_52%,#f4f6fb_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(44,44,46,1) 1px, transparent 1px), linear-gradient(90deg, rgba(44,44,46,1) 1px, transparent 1px)', backgroundSize: '74px 74px' }} />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-steel/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-steel/10 blur-3xl" />

      <div className="container-site max-w-5xl relative">
        <div
          ref={headingRef}
          data-faq-kind="heading"
          className={`faq-reveal text-center mb-10 md:mb-14 ${headingVisible ? 'is-visible' : ''}`}
        >
          <span className="inline-flex items-center rounded-full border border-steel/20 bg-steel/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-steel mb-3 md:mb-4">
            FAQ
          </span>
          <h2 className="text-graphite mb-4">{title}</h2>
          <p className="text-neutral-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {items.map((item, i) => (
            <div
              key={`${item.question}-${i}`}
              ref={(element) => {
                itemRefs.current[i] = element
              }}
              data-faq-kind="item"
              data-faq-index={i}
              className={`faq-reveal ${visibleItems[i] ? 'is-visible' : ''}`}
              style={{ transitionDelay: visibleItems[i] ? `${Math.min(i * 80, 320)}ms` : '0ms' }}
            >
              <FAQItemCard {...item} defaultOpen={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
