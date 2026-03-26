// app/[locale]/leistungen/[slug]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { buildMetadata, serviceSchema, breadcrumbSchema, COMPANY } from '@/lib/seo'
import { SERVICES } from '@/lib/services-data'
import { CTASection } from '@/components/sections/ProcessSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

interface PageProps { params: Promise<{ locale: string; slug: string }> }

const SERVICE_IMAGES: Record<string, string> = {
  'fenster-tueren':        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop',
  'glasfassaden':          'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&auto=format&fit=crop',
  'ganzglasanlagen':       'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85&auto=format&fit=crop',
  'reparaturverglasungen': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format&fit=crop',
  'spiegel':               'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85&auto=format&fit=crop',
  'terrassendaecher':      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop',
  'industrieverglasungen': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=85&auto=format&fit=crop',
  'glasbearbeitung':       'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=85&auto=format&fit=crop',
}

export async function generateStaticParams() {
  return SERVICES.flatMap(s => ['de','en'].map(locale => ({ locale, slug: s.slug })))
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const service = SERVICES.find(s => s.slug === slug)
  if (!service) return {}
  const lang = locale as 'de' | 'en'
  const tr = service[lang]
  return buildMetadata({ title: tr.metaTitle || tr.title, description: tr.metaDesc || tr.shortDesc, path: `/leistungen/${slug}`, locale })
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params
  const service = SERVICES.find(s => s.slug === slug)
  if (!service) notFound()

  const lang = locale as 'de' | 'en'
  const tr = service[lang]
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.glaserei-schubert.de'
  const related = SERVICES.filter(s => s.slug !== slug).slice(0, 3)
  const t = await getTranslations({ locale })
  const heroImg = SERVICE_IMAGES[slug] || SERVICE_IMAGES['glasfassaden']

  return (
    <>
      <JsonLd data={serviceSchema({ name: tr.title, description: tr.shortDesc, url: `${BASE_URL}/${locale}/leistungen/${slug}` })} />
      <JsonLd data={breadcrumbSchema([
        { name: lang === 'de' ? 'Startseite' : 'Home', url: `${BASE_URL}/${locale}` },
        { name: lang === 'de' ? 'Leistungen' : 'Services', url: `${BASE_URL}/${locale}/leistungen` },
        { name: tr.title, url: `${BASE_URL}/${locale}/leistungen/${slug}` },
      ])} />

      {/* Hero */}
      <div className="relative">
        <div className="relative h-[280px] md:h-[400px] overflow-hidden">
          <Image
            src={heroImg}
            alt={tr.title}
            fill priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite/88 via-anthracite/60 to-steel/18" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-14">
          <div className="container-site">
            <Breadcrumbs light items={[
              { label: lang === 'de' ? 'Startseite' : 'Home', href: `/${locale}` },
              { label: lang === 'de' ? 'Leistungen' : 'Services', href: `/${locale}/leistungen` },
              { label: tr.title },
            ]} className="mb-4" />
            <h1 className="text-white mb-3">{tr.title}</h1>
            <p className="text-neutral-300 text-base md:text-lg max-w-xl">{tr.shortDesc}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Main */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-xl md:text-2xl text-graphite mb-5">
                {lang === 'de' ? 'Leistungsbeschreibung' : 'Service Description'}
              </h2>
              {tr.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed mb-5 text-sm md:text-base">{para}</p>
              ))}

              {/* Benefits */}
              <div className="mt-8 md:mt-10">
                <h3 className="font-display text-lg md:text-xl text-graphite mb-5">
                  {lang === 'de' ? 'Ihre Vorteile' : 'Your Benefits'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {tr.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3 p-4 bg-neutral-50 border border-neutral-100 rounded-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-steel/10 mt-0.5">
                        <svg className="h-3 w-3 text-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                      </span>
                      <span className="text-sm text-graphite leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Second image */}
              <div className="mt-10 md:mt-12 relative aspect-[16/7] overflow-hidden rounded-sm">
                <Image
                  src={heroImg.replace('w=1200', 'w=900')}
                  alt={tr.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 66vw"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* CTA card */}
              <div className="bg-graphite text-white p-6 md:p-7 rounded-sm">
                <h3 className="font-display text-lg mb-3 text-white">
                  {lang === 'de' ? 'Jetzt anfragen' : 'Request now'}
                </h3>
                <p className="text-neutral-400 text-sm mb-5 leading-relaxed">
                  {lang === 'de' ? 'Kostenlose Beratung und unverbindliches Angebot.' : 'Free consultation and non-binding quote.'}
                </p>
                <Link href={`/${locale}/kontakt?service=${slug}`}
                  className="flex h-11 items-center justify-center bg-steel text-white text-sm font-medium rounded-sm hover:bg-steel-dark transition-colors mb-3">
                  {lang === 'de' ? 'Angebot anfragen' : 'Request a quote'}
                </Link>
                <a href="tel:+493412412262"
                  className="flex h-11 items-center justify-center border border-white/20 text-white/80 text-sm rounded-sm hover:border-white/40 hover:text-white transition-colors gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  {COMPANY.phoneFormatted}
                </a>
              </div>

              {/* Related */}
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">
                  {lang === 'de' ? 'Weitere Leistungen' : 'Other Services'}
                </h3>
                <div className="flex flex-col gap-2">
                  {related.map(rs => {
                    const img = SERVICE_IMAGES[rs.slug]
                    return (
                      <Link key={rs.slug} href={`/${locale}/leistungen/${rs.slug}`}
                        className="group flex items-center gap-3 p-3 border border-neutral-200 rounded-sm hover:border-steel/40 hover:bg-steel/5 transition-all">
                        <div className="relative w-12 h-12 rounded-sm overflow-hidden shrink-0">
                          <Image src={img} alt={rs[lang].title} fill className="object-cover" sizes="48px" />
                        </div>
                        <span className="text-sm text-neutral-600 group-hover:text-steel transition-colors leading-snug flex-1">
                          {rs[lang].title}
                        </span>
                        <svg className="h-3.5 w-3.5 text-neutral-300 group-hover:text-steel shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
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
