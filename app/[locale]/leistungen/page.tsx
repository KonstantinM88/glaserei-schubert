// app/[locale]/leistungen/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { CTASection } from '@/components/sections/ProcessSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SERVICES } from '@/lib/services-data'

interface PageProps { params: Promise<{ locale: string }> }

const SERVICE_IMAGES: Record<string, string> = {
  'fenster-tueren':        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop',
  'glasfassaden':          'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80&auto=format&fit=crop',
  'ganzglasanlagen':       'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80&auto=format&fit=crop',
  'reparaturverglasungen': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&auto=format&fit=crop',
  'spiegel':               'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80&auto=format&fit=crop',
  'terrassendaecher':      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80&auto=format&fit=crop',
  'industrieverglasungen': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&q=80&auto=format&fit=crop',
  'glasbearbeitung':       'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80&auto=format&fit=crop',
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.services' })
  return buildMetadata({ title: t('title'), description: t('description'), path: '/leistungen', locale })
}

export default async function LeistungenPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const lang = locale as 'de' | 'en'

  return (
    <>
      {/* Hero */}
      <div className="relative">
        <div className="relative h-[280px] md:h-[360px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop"
            alt={t('services.title')}
            fill priority className="object-cover" sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite/85 via-anthracite/60 to-steel/20" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-12">
          <div className="container-site">
            <Breadcrumbs light items={[{ label: lang === 'de' ? 'Startseite' : 'Home', href: `/${locale}` }, { label: t('services.title') }]} className="mb-4" />
            <h1 className="text-white mb-2">{t('services.title')}</h1>
            <p className="text-neutral-300 text-base md:text-lg max-w-xl">{t('services.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-py relative overflow-hidden bg-[linear-gradient(180deg,#f7f8fb_0%,#ffffff_52%,#f4f6fb_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(44,44,46,1) 1px, transparent 1px), linear-gradient(90deg, rgba(44,44,46,1) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
        <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-steel/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-steel/10 blur-3xl" />

        <div className="container-site relative">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center rounded-full border border-steel/20 bg-steel/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-steel mb-3 md:mb-4">
              {locale === 'de' ? 'Premium Portfolio' : 'Premium Portfolio'}
            </span>
            <h2 className="text-graphite mb-4">{t('services.title')}</h2>
            <p className="text-neutral-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{t('services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:gap-7">
            {SERVICES.map((service, index) => {
              const tr = service[lang]
              return (
                <Link
                  key={service.slug}
                  href={`/${locale}/leistungen/${service.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 shadow-[0_14px_34px_rgba(16,24,40,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-steel/45 hover:shadow-[0_24px_52px_rgba(36,57,90,0.18)] animate-fade-up"
                  style={{ animationDelay: `${Math.min(index * 70, 490)}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-[210px] md:h-[228px] overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES[service.slug]}
                      alt={tr.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-[0.6deg]"
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

                    <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[125%] group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="relative flex flex-1 flex-col p-6 md:p-7">
                    <h2 className="font-display text-xl text-graphite group-hover:text-steel transition-colors mb-2 leading-tight">
                      {tr.title}
                    </h2>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">{tr.shortDesc}</p>
                    <ul className="flex flex-col gap-1.5 mb-4">
                      {tr.benefits.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-neutral-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-steel shadow-[0_0_0_4px_rgba(74,111,165,0.15)] shrink-0" />
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4 border-t border-neutral-200/80 flex items-center justify-between">
                      <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                        {locale === 'de' ? 'Mehr erfahren' : 'Learn more'}
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-steel/35 bg-steel/10 text-steel transition-all duration-300 group-hover:bg-steel group-hover:text-white group-hover:translate-x-0.5">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                      </span>
                    </div>
                  </div>
                  <span className="pointer-events-none absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-steel/80 to-transparent scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection
        locale={locale}
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        primaryLabel={t('cta.primary')}
        secondaryLabel={t('cta.secondaryLabel')}
        secondaryNumber={t('cta.secondary')}
      />
    </>
  )
}
