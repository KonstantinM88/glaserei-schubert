// components/layout/Footer.tsx
'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { COMPANY } from '@/lib/seo'

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')
  const [visibleBlocks, setVisibleBlocks] = useState<boolean[]>(() => [false, false, false, false])
  const blockRefs = useRef<Array<HTMLDivElement | null>>([])
  const visibleBlocksRef = useRef<boolean[]>(visibleBlocks)

  const navLinks = [
    { href: `/${locale}`, label: tn('home') },
    { href: `/${locale}/leistungen`, label: tn('services') },
    { href: `/${locale}/referenzen`, label: tn('references') },
    { href: `/${locale}/ueber-uns`, label: tn('about') },
    { href: `/${locale}/faq`, label: tn('faq') },
    { href: `/${locale}/kontakt`, label: tn('contact') },
  ]

  useEffect(() => {
    visibleBlocksRef.current = visibleBlocks
  }, [visibleBlocks])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisibleBlocks([true, true, true, true])
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const indexRaw = (entry.target as HTMLElement).dataset.footerIndex
          if (!indexRaw) {
            return
          }

          const index = Number(indexRaw)
          if (Number.isNaN(index) || visibleBlocksRef.current[index]) {
            observer.unobserve(entry.target)
            return
          }

          setVisibleBlocks((prev) => {
            if (prev[index]) {
              return prev
            }
            const next = [...prev]
            next[index] = true
            return next
          })

          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    blockRefs.current.forEach((block) => {
      if (block) {
        observer.observe(block)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#101218_0%,#0f141d_54%,#0e1016_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
      <div className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-steel/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-steel/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="container-site relative py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7">
          <div
            ref={(element) => {
              blockRefs.current[0] = element
            }}
            data-footer-index={0}
            className={`footer-reveal sm:col-span-2 lg:col-span-2 ${visibleBlocks[0] ? 'is-visible' : ''}`}
            style={{ transitionDelay: visibleBlocks[0] ? '0ms' : '0ms' }}
          >
            <div className="footer-card relative h-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035] p-6 md:p-7 shadow-[0_18px_42px_rgba(2,7,16,0.42)] backdrop-blur-md">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(107,143,196,0.24),transparent_46%)]" />
              <div className="relative flex flex-col mb-5">
                <span className="font-display text-xl font-semibold text-white">Glaserei Schubert</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-steel-light mt-0.5">Leipzig</span>
              </div>
              <p className="relative text-neutral-300 text-sm leading-relaxed max-w-sm mb-7">{t('description')}</p>
              <div className="relative flex flex-col gap-3">
                {[
                  { icon: 'phone', href: `tel:${COMPANY.phone}`, text: COMPANY.phoneFormatted },
                  { icon: 'mail', href: `mailto:${COMPANY.email}`, text: COMPANY.email },
                  { icon: 'pin', text: `${COMPANY.address.street}, ${COMPANY.address.zip} ${COMPANY.address.city}` },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/6 shadow-[0_8px_18px_rgba(17,24,39,0.25)]">
                      {item.icon === 'phone' && <svg className="h-3.5 w-3.5 text-steel-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}
                      {item.icon === 'mail' && <svg className="h-3.5 w-3.5 text-steel-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
                      {item.icon === 'pin' && <svg className="h-3.5 w-3.5 text-steel-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                    </span>
                    {item.href
                      ? <a href={item.href} className="text-sm text-neutral-300 hover:text-white transition-colors">{item.text}</a>
                      : <span className="text-sm text-neutral-300">{item.text}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={(element) => {
              blockRefs.current[1] = element
            }}
            data-footer-index={1}
            className={`footer-reveal ${visibleBlocks[1] ? 'is-visible' : ''}`}
            style={{ transitionDelay: visibleBlocks[1] ? '80ms' : '0ms' }}
          >
            <div className="footer-card relative h-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] p-6 shadow-[0_18px_42px_rgba(2,7,16,0.36)] backdrop-blur-md">
              <h3 className="relative text-[10px] font-semibold tracking-[0.18em] uppercase text-neutral-400 mb-5">{t('navigation')}</h3>
              <ul className="relative flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-sm text-neutral-300 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            ref={(element) => {
              blockRefs.current[2] = element
            }}
            data-footer-index={2}
            className={`footer-reveal ${visibleBlocks[2] ? 'is-visible' : ''}`}
            style={{ transitionDelay: visibleBlocks[2] ? '160ms' : '0ms' }}
          >
            <div className="footer-card relative h-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] p-6 shadow-[0_18px_42px_rgba(2,7,16,0.36)] backdrop-blur-md">
              <h3 className="relative text-[10px] font-semibold tracking-[0.18em] uppercase text-neutral-400 mb-5">{t('legal')}</h3>
              <ul className="relative flex flex-col gap-3 mb-8">
                {[`/${locale}/impressum`, `/${locale}/datenschutz`].map((href, i) => (
                  <li key={href}>
                    <Link href={href} className="footer-link text-sm text-neutral-300 hover:text-white transition-colors">
                      {i === 0 ? 'Impressum' : 'Datenschutz'}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="relative text-[10px] font-semibold tracking-[0.18em] uppercase text-neutral-400 mb-3">
                {locale === 'de' ? 'Öffnungszeiten' : 'Hours'}
              </h3>
              <p className="relative text-sm text-neutral-300 leading-relaxed">
                Mo–Fr: 7:00–17:00
                <br />
                Sa: {locale === 'de' ? 'Nach Vereinbarung' : 'By appointment'}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={(element) => {
            blockRefs.current[3] = element
          }}
          data-footer-index={3}
          className={`footer-reveal mt-10 md:mt-12 border-t border-white/12 ${visibleBlocks[3] ? 'is-visible' : ''}`}
          style={{ transitionDelay: visibleBlocks[3] ? '240ms' : '0ms' }}
        >
          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-neutral-400">© {new Date().getFullYear()} {COMPANY.name}. {t('rights')}</p>
            <p className="text-xs text-neutral-500">{t('madeWith')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
