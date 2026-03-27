// app/[locale]/leistungen/page.tsx
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { CTASection } from '@/components/sections/ProcessSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { LeistungenAnimatedGrid } from '@/components/sections/LeistungenAnimatedGrid'

interface PageProps { params: Promise<{ locale: string }> }

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

          <LeistungenAnimatedGrid locale={locale} />
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
