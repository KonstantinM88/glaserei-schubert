// app/[locale]/referenzen/page.tsx
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { CTASection } from '@/components/sections/ProcessSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.references' })
  return buildMetadata({ title: t('title'), description: t('description'), path: '/referenzen', locale })
}

const PROJECTS = [
  { id: 1, cat: 'Glasfassade',       img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80&auto=format&fit=crop', loc: 'Leipzig-Süd', year: 2023, de: { title: 'Bürogebäude Leipzig-Süd', desc: 'Structural-Glazing-System, VSG-Dreifachverglasung, 1.200 m² Fassadenfläche.' }, en: { title: 'Office Building Leipzig South', desc: 'Structural glazing system, VSG triple glazing, 1,200 m² facade area.' } },
  { id: 2, cat: 'Ganzglasanlage',    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80&auto=format&fit=crop', loc: 'Leipzig', year: 2023, de: { title: 'Restaurant Waldschloss', desc: 'Rahmenlose Ganzglasanlage für Eingangsbereich und Terrasse mit automatischen Schiebetüren.' }, en: { title: 'Restaurant Waldschloss', desc: 'Frameless full glass system for entrance and terrace with automatic sliding doors.' } },
  { id: 3, cat: 'Terrassendach',     img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80&auto=format&fit=crop', loc: 'Leipzig-Gohlis', year: 2022, de: { title: 'Privatvilla Leipzig-Gohlis', desc: 'Maßgeschneidertes Terrassendach aus VSG-Sicherheitsglas mit Aluminium-Tragkonstruktion.' }, en: { title: 'Private Villa Leipzig-Gohlis', desc: 'Custom terrace roof in VSG safety glass with aluminium load-bearing structure.' } },
  { id: 4, cat: 'Industrieverglasung', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&auto=format&fit=crop', loc: 'Leipzig-Mockau', year: 2022, de: { title: 'Gewerbepark Mockau', desc: 'Großformatige Industrieverglasungen für Hallentore und Fassade des Gewerbeparks.' }, en: { title: 'Commercial Park Mockau', desc: 'Large-format industrial glazing for hall doors and facade of the commercial park.' } },
  { id: 5, cat: 'Fenster & Türen',   img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80&auto=format&fit=crop', loc: 'Leipzig-Zentrum', year: 2023, de: { title: 'Arztpraxis Leipzig-Zentrum', desc: 'Schallschutzfenster und rahmenlose Glastüren für eine moderne Arztpraxis im Stadtzentrum.' }, en: { title: 'Medical Practice Leipzig Centre', desc: 'Soundproof windows and frameless glass doors for a modern medical practice in the city centre.' } },
  { id: 6, cat: 'Spiegel',           img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80&auto=format&fit=crop', loc: 'Leipzig-Leutzsch', year: 2023, de: { title: 'Fitnessstudio Leipzig-Leutzsch', desc: 'Wandspiegel nach Maß in Sicherheitsglas für den gesamten Trainings- und Kursbereich.' }, en: { title: 'Gym Leipzig-Leutzsch', desc: 'Custom wall mirrors in safety glass for the entire training and course area.' } },
]

export default async function ReferenzenPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const lang = locale as 'de' | 'en'

  return (
    <>
      {/* Hero */}
      <div className="relative">
        <div className="relative h-[280px] md:h-[360px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop"
            alt="Referenzen Glaserei Schubert"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite/85 via-anthracite/60 to-steel/20" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-12">
          <div className="container-site">
            <Breadcrumbs light items={[{ label: locale === 'de' ? 'Startseite' : 'Home', href: `/${locale}` }, { label: t('nav.references') }]} className="mb-4" />
            <h1 className="text-white mb-2">{t('nav.references')}</h1>
            <p className="text-neutral-300 text-base md:text-lg max-w-xl">
              {locale === 'de' ? 'Ausgewählte Projekte in Leipzig und der Region.' : 'Selected projects in Leipzig and the region.'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-py bg-neutral-50">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {PROJECTS.map(p => {
              const tr = p[lang]
              return (
                <div key={p.id} className="group bg-white border border-neutral-200 rounded-sm overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={p.img}
                        alt={tr.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                      />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] uppercase rounded-sm bg-white/18 border border-white/28 text-white/85 backdrop-blur-sm">
                        {p.cat}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="font-display text-base md:text-lg text-graphite group-hover:text-steel transition-colors mb-2">{tr.title}</h3>
                    <p className="text-xs md:text-sm text-neutral-500 leading-relaxed mb-3 md:mb-4">{tr.desc}</p>
                    <div className="flex items-center gap-3 md:gap-4 text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        {p.loc}
                      </span>
                      <span>{p.year}</span>
                    </div>
                  </div>
                </div>
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
