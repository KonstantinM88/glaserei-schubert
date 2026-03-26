// app/[locale]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { buildMetadata, localBusinessSchema } from '@/lib/seo'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { AboutSection } from '@/components/sections/AboutSection'
import { ProcessSection, CTASection } from '@/components/sections/ProcessSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { FAQ_DATA } from '@/lib/services-data'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.home' })
  return buildMetadata({ title: t('title'), description: t('description'), locale })
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const lang = locale as 'de' | 'en'

  const faqItems = FAQ_DATA.map(f => ({ question: f[lang].question, answer: f[lang].answer }))

  const stats = [
    { value: t('about.stat1.value'), label: t('about.stat1.label') },
    { value: t('about.stat2.value'), label: t('about.stat2.label') },
    { value: t('about.stat3.value'), label: t('about.stat3.label') },
    { value: t('about.stat4.value'), label: t('about.stat4.label') },
  ]

  const processSteps = [0,1,2,3].map(i => ({
    number: t(`process.steps.${i}.number`),
    title: t(`process.steps.${i}.title`),
    description: t(`process.steps.${i}.description`),
  }))

  const testimonials = [
    { name: 'Dr. Markus Richter', role: lang === 'de' ? 'Geschäftsführer, Leipzig' : 'Managing Director, Leipzig', text: lang === 'de' ? '„Wir haben Glaserei Schubert mit der kompletten Fassadenverglasung unseres Bürogebäudes beauftragt. Die Arbeit war präzise, termingerecht und das Ergebnis übertrifft unsere Erwartungen."' : '"We commissioned Glaserei Schubert with the complete facade glazing of our office building. The work was precise, on schedule and the result exceeds our expectations."', img: 'https://i.pravatar.cc/80?img=12' },
    { name: 'Sandra Weber', role: lang === 'de' ? 'Privatkundin, Leipzig-Gohlis' : 'Private client, Leipzig-Gohlis', text: lang === 'de' ? '„Das Terrassendach wurde exakt nach unseren Vorstellungen gefertigt. Hervorragende Beratung, faire Preise und handwerkliche Qualität auf höchstem Niveau."' : '"The terrace roof was manufactured exactly to our specifications. Excellent advice, fair prices and craftsmanship at the highest level."', img: 'https://i.pravatar.cc/80?img=47' },
    { name: 'Thomas Berger', role: lang === 'de' ? 'Inhaber, Einzelhandel Leipzig' : 'Owner, Retail Leipzig', text: lang === 'de' ? '„Nach einem Einbruch war Glaserei Schubert innerhalb von zwei Stunden vor Ort und hat alles schnell und professionell abgewickelt. Absolut empfehlenswert!"' : '"After a break-in, Glaserei Schubert was on site within two hours and handled everything quickly and professionally. Absolutely recommended!"', img: 'https://i.pravatar.cc/80?img=68' },
  ]

  return (
    <>
      <JsonLd data={localBusinessSchema()} />

      <HeroSection
        locale={locale}
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaLabel={t('hero.cta')}
        ctaSecondary={t('hero.ctaSecondary')}
        trustedBy={t('hero.trustedBy')}
      />

      <TrustBar />

      <ServicesGrid
        locale={locale}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        limit={8}
      />

      <AboutSection
        locale={locale}
        badge={t('about.badge')}
        title={t('about.title')}
        text1={t('about.text1')}
        text2={t('about.text2')}
        stats={stats}
        ctaLabel={locale === 'de' ? 'Mehr über uns' : 'More about us'}
      />

      {/* Featured Project */}
      <section className="section-py relative overflow-hidden bg-[linear-gradient(180deg,#f7f8fb_0%,#ffffff_52%,#f4f6fb_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.045]" style={{ backgroundImage: 'linear-gradient(rgba(44,44,46,1) 1px, transparent 1px), linear-gradient(90deg, rgba(44,44,46,1) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
        <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-steel/12 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-steel/10 blur-3xl" />

        <div className="container-site relative">
          <div className="mb-10 md:mb-14">
            <span className="inline-flex items-center rounded-full border border-steel/20 bg-steel/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-steel mb-3 md:mb-4">
              {locale === 'de' ? 'Signature Projekt' : 'Signature Project'}
            </span>
            <h2 className="text-graphite">{locale === 'de' ? 'Ausgewähltes Projekt' : 'Featured Project'}</h2>
          </div>

          <div className="group grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 shadow-[0_20px_52px_rgba(20,28,46,0.12)]">
            <div className="relative min-h-[300px] md:min-h-[470px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85&auto=format&fit=crop"
                alt="Bürogebäude Glasfassade Leipzig"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-[0.6deg]"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite/72 via-anthracite/16 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_20%,rgba(107,143,196,0.32),transparent_42%)]" />
              <div className="absolute left-5 top-5 inline-flex items-center rounded-md border border-white/25 bg-black/25 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase text-white/90 backdrop-blur-sm">
                {locale === 'de' ? 'Referenz 01' : 'Reference 01'}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[11px] tracking-[0.22em] uppercase text-white/70 mb-1">
                  {locale === 'de' ? 'Leipzig · Gewerbeobjekt' : 'Leipzig · Commercial'}
                </p>
                <p className="font-display text-2xl md:text-3xl leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                  {locale === 'de' ? 'Bürogebäude Leipzig-Süd' : 'Office Building Leipzig South'}
                </p>
              </div>
              <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/28 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[120%] group-hover:opacity-100" />
            </div>

            <div className="bg-white/90 p-7 md:p-10 lg:p-12 flex flex-col justify-center">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-steel mb-3 md:mb-4">
                {locale === 'de' ? 'Glasfassade · Gewerbebau' : 'Glass Facade · Commercial'}
              </p>
              <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-graphite mb-4 md:mb-5">
                {locale === 'de' ? 'Traditionelle Präzision, moderne Wirkung' : 'Traditional precision, modern impact'}
              </h3>
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-7 md:mb-8">
                {locale === 'de'
                  ? 'Komplette Glasfassade für ein modernes Bürogebäude. Realisiert mit einem Structural-Glazing-System in VSG-Dreifachverglasung – für maximalen Wärmeschutz und ein repräsentatives Erscheinungsbild.'
                  : 'Complete glass facade for a modern office building. Realised with a structural glazing system in VSG triple glazing – for maximum thermal insulation and a prestigious appearance.'}
              </p>

              <div className="grid grid-cols-3 gap-3 md:gap-4 pt-5 border-t border-neutral-200/80 mb-8">
                {[
                  { label: locale === 'de' ? 'Ort' : 'Location', value: 'Leipzig-Süd' },
                  { label: locale === 'de' ? 'Jahr' : 'Year', value: '2023' },
                  { label: locale === 'de' ? 'Fläche' : 'Area', value: '1.200 m²' },
                ].map(m => (
                  <div key={m.label} className="rounded-lg border border-neutral-200/80 bg-neutral-50/70 px-3 py-2.5">
                    <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400 mb-0.5">{m.label}</p>
                    <p className="text-sm font-semibold text-graphite">{m.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <Link href={`/${locale}/referenzen`} className="btn-premium-base btn-premium-steel inline-flex h-11 md:h-12 items-center gap-2 px-6 md:px-7 text-sm font-medium">
                  {locale === 'de' ? 'Weitere Projekte' : 'More projects'}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection
        title={t('process.title')}
        subtitle={t('process.subtitle')}
        steps={processSteps}
      />

      {/* Testimonials */}
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-graphite mb-4">{locale === 'de' ? 'Das sagen unsere Kunden' : 'What our clients say'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {testimonials.map(r => (
              <div key={r.name} className="relative bg-white border border-neutral-100 p-6 md:p-8 rounded-sm shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <div className="absolute top-4 left-6 font-display text-[4rem] text-steel/10 leading-none select-none">"</div>
                <div className="flex gap-0.5 mb-4 md:mb-5">
                  {[...Array(5)].map((_,i) => <svg key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed italic mb-5 md:mb-6">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden shrink-0 border-2 border-neutral-100">
                    <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-graphite">{r.name}</p>
                    <p className="text-xs text-neutral-400">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
        items={faqItems.slice(0, 4)}
      />

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
