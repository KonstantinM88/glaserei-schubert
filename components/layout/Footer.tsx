// components/layout/Footer.tsx
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { COMPANY } from '@/lib/seo'

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')

  const navLinks = [
    { href: `/${locale}`, label: tn('home') },
    { href: `/${locale}/leistungen`, label: tn('services') },
    { href: `/${locale}/referenzen`, label: tn('references') },
    { href: `/${locale}/ueber-uns`, label: tn('about') },
    { href: `/${locale}/faq`, label: tn('faq') },
    { href: `/${locale}/kontakt`, label: tn('contact') },
  ]

  return (
    <footer className="bg-anthracite text-white">
      <div className="container-site py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex flex-col mb-5">
              <span className="font-display text-xl font-semibold text-white">Glaserei Schubert</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-steel mt-0.5">Leipzig</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mb-7">{t('description')}</p>
            <div className="flex flex-col gap-3">
              {[
                { icon: 'phone', href: `tel:${COMPANY.phone}`, text: COMPANY.phoneFormatted },
                { icon: 'mail', href: `mailto:${COMPANY.email}`, text: COMPANY.email },
                { icon: 'pin', text: `${COMPANY.address.street}, ${COMPANY.address.zip} ${COMPANY.address.city}` },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-white/5">
                    {item.icon === 'phone' && <svg className="h-3.5 w-3.5 text-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}
                    {item.icon === 'mail' && <svg className="h-3.5 w-3.5 text-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
                    {item.icon === 'pin' && <svg className="h-3.5 w-3.5 text-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                  </span>
                  {item.href
                    ? <a href={item.href} className="text-sm text-neutral-400 hover:text-white transition-colors">{item.text}</a>
                    : <span className="text-sm text-neutral-400">{item.text}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-widest uppercase text-neutral-500 mb-5">{t('navigation')}</h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-neutral-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + hours */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-widest uppercase text-neutral-500 mb-5">{t('legal')}</h3>
            <ul className="flex flex-col gap-3 mb-8">
              {[`/${locale}/impressum`, `/${locale}/datenschutz`].map((href, i) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {i === 0 ? 'Impressum' : 'Datenschutz'}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-[10px] font-semibold tracking-widest uppercase text-neutral-500 mb-3">
              {locale === 'de' ? 'Öffnungszeiten' : 'Hours'}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">Mo–Fr: 7:00–17:00<br/>Sa: {locale === 'de' ? 'Nach Vereinbarung' : 'By appointment'}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-neutral-600">© {new Date().getFullYear()} {COMPANY.name}. {t('rights')}</p>
          <p className="text-xs text-neutral-700">{t('madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}