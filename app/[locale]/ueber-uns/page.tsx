// app/[locale]/ueber-uns/page.tsx
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { CTASection } from '@/components/sections/ProcessSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.about' })
  return buildMetadata({ title: t('title'), description: t('description'), path: '/ueber-uns', locale })
}

export default async function UeberUnsPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const lang = locale as 'de' | 'en'

  const values = lang === 'de' ? [
    { title: 'Präzision', desc: 'Jede Arbeit wird mit höchster Sorgfalt und Genauigkeit ausgeführt – von der Messung bis zur Montage.' },
    { title: 'Qualität',  desc: 'Wir verwenden ausschließlich geprüfte Materialien von führenden Glasherstellern und Systemlieferanten.' },
    { title: 'Verlässlichkeit', desc: 'Termine werden eingehalten, Zusagen erfüllt. Auf Glaserei Schubert können Sie sich verlassen.' },
    { title: 'Erfahrung', desc: 'Über drei Jahrzehnte handwerkliche Tradition und täglich neues Fachwissen durch Weiterbildung.' },
  ] : [
    { title: 'Precision',    desc: 'Every job is carried out with the utmost care and accuracy – from measurement to installation.' },
    { title: 'Quality',      desc: 'We exclusively use tested materials from leading glass manufacturers and system suppliers.' },
    { title: 'Reliability',  desc: 'Deadlines are kept, promises fulfilled. You can rely on Glaserei Schubert.' },
    { title: 'Experience',   desc: 'Over three decades of craftsmanship tradition and new expertise every day through training.' },
  ]

  const team = [
    { name: 'Oliver Schubert', role: lang === 'de' ? 'Inhaber & Glasermeister' : 'Owner & Master Glazier', img: 'https://i.pravatar.cc/200?img=70' },
    { name: 'Klaus Müller',    role: lang === 'de' ? 'Glasergeselle' : 'Glazier', img: 'https://i.pravatar.cc/200?img=52' },
    { name: 'Stefan Hoffmann', role: lang === 'de' ? 'Montage & Service' : 'Installation & Service', img: 'https://i.pravatar.cc/200?img=33' },
  ]

  return (
    <>
      {/* Hero */}
      <div className="relative">
        <div className="relative h-[280px] md:h-[360px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80&auto=format&fit=crop"
            alt="Glasermeister bei der Arbeit"
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
            <Breadcrumbs light items={[{ label: lang === 'de' ? 'Startseite' : 'Home', href: `/${locale}` }, { label: t('nav.about') }]} className="mb-4" />
            <h1 className="text-white mb-2">{t('about.title')}</h1>
            <p className="text-neutral-300 text-base md:text-lg max-w-xl">{t('about.text1').slice(0, 90)}…</p>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <span className="accent-line" />
              <h2 className="text-graphite mb-5 md:mb-6">{lang === 'de' ? 'Unsere Geschichte' : 'Our Story'}</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">{t('about.text1')}</p>
              <p className="text-neutral-600 leading-relaxed mb-4">{t('about.text2')}</p>
              <p className="text-neutral-600 leading-relaxed">
                {lang === 'de'
                  ? 'Unter der Leitung von Inhaber Oliver Schubert führt der Betrieb die handwerkliche Tradition seiner Gründer fort – mit neuen Technologien, modernen Verfahren und dem unveränderten Anspruch an höchste Qualität.'
                  : 'Under owner Oliver Schubert, the business continues its founding craft tradition – with new technologies, modern processes, and an unchanged commitment to the highest quality.'}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8 md:mt-10">
                {[
                  { v: '30+', l: lang === 'de' ? 'Jahre Erfahrung' : 'Years Experience' },
                  { v: '500+', l: lang === 'de' ? 'Zufriedene Kunden' : 'Happy Clients' },
                  { v: '1000+', l: lang === 'de' ? 'Projekte' : 'Projects' },
                  { v: '8', l: lang === 'de' ? 'Leistungsbereiche' : 'Service Areas' },
                ].map(s => (
                  <div key={s.l} className="p-4 md:p-5 bg-neutral-50 border border-neutral-100 rounded-sm">
                    <p className="font-display text-2xl md:text-3xl font-bold text-graphite mb-0.5">{s.v}</p>
                    <p className="text-xs md:text-sm text-neutral-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-sm mx-auto lg:max-w-none overflow-hidden rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85&auto=format&fit=crop"
                  alt="Glaserei Werkstatt Leipzig"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 80vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-display text-2xl font-bold text-white">Glaserei</p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-0.5">seit 1990</p>
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-5 -right-5 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.13)] p-5 rounded-sm hidden md:block">
                <p className="font-display text-4xl font-bold text-graphite leading-none mb-1">30+</p>
                <p className="text-sm text-neutral-500">{lang === 'de' ? 'Jahre Erfahrung' : 'Years Experience'}</p>
                <div className="mt-2 h-0.5 w-7 bg-steel" />
              </div>
              <div className="absolute -top-3 -left-3 w-12 h-12 border-l-2 border-t-2 border-steel/40 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py bg-neutral-50">
        <div className="container-site">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-graphite">{lang === 'de' ? 'Unsere Werte' : 'Our Values'}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map(v => (
              <div key={v.title}>
                <div className="h-0.5 w-8 bg-steel mb-4" />
                <h3 className="font-display text-lg md:text-xl text-graphite mb-3">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-graphite mb-4">{lang === 'de' ? 'Unser Team' : 'Our Team'}</h2>
            <p className="text-neutral-500 text-base md:text-lg max-w-lg mx-auto">
              {lang === 'de' ? 'Erfahrene Glasermeister mit Leidenschaft für ihr Handwerk.' : 'Experienced master glaziers with a passion for their craft.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto">
            {team.map(m => (
              <div key={m.name} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-4 border-3 border-neutral-100 shadow-md">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-display font-semibold text-graphite mb-1">{m.name}</p>
                <p className="text-xs md:text-sm text-steel">{m.role}</p>
              </div>
            ))}
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
