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
      <section className="section-py bg-neutral-50">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
            {SERVICES.map((service) => {
              const tr = service[lang]
              return (
                <Link key={service.slug} href={`/${locale}/leistungen/${service.slug}`}
                  className="group bg-white border border-neutral-200 rounded-sm overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-[200px] md:h-[220px] overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES[service.slug]}
                      alt={tr.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite/50 via-transparent to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="p-6 md:p-7">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="font-display text-lg md:text-xl text-graphite group-hover:text-steel transition-colors">
                        {tr.title}
                      </h2>
                      <svg className="h-5 w-5 text-steel opacity-0 group-hover:opacity-100 group-hover:-translate-x-0 translate-x-1 transition-all duration-300 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">{tr.shortDesc}</p>
                    <ul className="flex flex-col gap-1.5">
                      {tr.benefits.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-neutral-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-steel shrink-0" />{b}
                        </li>
                      ))}
                    </ul>
                  </div>
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
