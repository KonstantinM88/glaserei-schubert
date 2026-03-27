// components/sections/AboutSection.tsx
import Link from 'next/link'

interface Stat { value: string; label: string }

interface AboutSectionProps {
  locale: string
  badge: string
  title: string
  text1: string
  text2: string
  stats: Stat[]
  ctaLabel: string
}

export function AboutSection({ locale, badge, title, text1, text2, stats, ctaLabel }: AboutSectionProps) {
  const featuredStat = stats[0]

  return (
    <section className="section-py relative overflow-hidden bg-[linear-gradient(180deg,#f7f8fb_0%,#ffffff_54%,#f4f6fb_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(44,44,46,1) 1px, transparent 1px), linear-gradient(90deg, rgba(44,44,46,1) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
      <div className="pointer-events-none absolute -left-20 top-28 h-72 w-72 rounded-full bg-steel/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-16 h-80 w-80 rounded-full bg-steel/10 blur-3xl" />

      <div className="container-site relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <div className="relative order-1 lg:order-none">
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 lg:max-w-none">
              {/* Main image */}
              <div className="about-workshop-frame relative w-full h-full rounded-2xl overflow-hidden border border-white/35 shadow-[0_24px_64px_rgba(20,28,46,0.28)]">
                <picture className="absolute inset-0 block h-full w-full">
                  <source media="(max-width: 640px)" srcSet="/Pictures/workshop_800.webp" />
                  <source media="(max-width: 1200px)" srcSet="/Pictures/workshop_1200.webp" />
                  <img
                    src="/Pictures/workshop_1600.webp"
                    alt="Glaserei Schubert – Werkstatt und Team"
                    className="about-workshop-image h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite/82 via-anthracite/18 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(107,143,196,0.28),transparent_42%)]" />
                <span className="about-workshop-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/32 to-transparent" />

                <div className="absolute top-5 left-5 inline-flex items-center rounded-md border border-white/20 bg-black/25 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase text-white/85 backdrop-blur-sm">
                  {locale === 'de' ? 'Werkstatt Leipzig' : 'Leipzig Workshop'}
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl md:text-[2.05rem] font-semibold text-white leading-none">Glaserei</p>
                    <p className="text-[11px] tracking-[0.22em] uppercase text-white/60 mt-2">seit 1990</p>
                  </div>
                  <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/70 backdrop-blur-sm">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </div>
                </div>

                {/* Right accent line */}
                <div className="absolute right-6 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-steel/45 to-transparent" />
              </div>

              {/* Floating stat card */}
              <div className="about-workshop-stat absolute -bottom-6 -right-5 md:-bottom-7 md:-right-7 bg-white/95 border border-neutral-200 shadow-[0_16px_44px_rgba(20,28,46,0.2)] p-5 md:p-6 rounded-xl min-w-[160px] md:min-w-[188px]">
                <p className="font-display text-4xl md:text-[3.2rem] font-bold text-graphite leading-none mb-1">
                  {featuredStat?.value ?? '30+'}
                </p>
                <p className="text-xs md:text-sm text-neutral-500">{featuredStat?.label ?? (locale === 'de' ? 'Jahre Erfahrung' : 'Years Experience')}</p>
                <div className="mt-3 h-0.5 w-9 bg-steel" />
              </div>

              {/* Corner accent */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-steel/45" />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center px-3 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase rounded-sm border border-steel/20 bg-steel/10 text-steel mb-4">
              {badge}
            </div>
            <div className="h-0.5 w-12 bg-gradient-to-r from-steel to-transparent mb-5 md:mb-6" />
            <h2 className="text-graphite mb-6 md:mb-7 text-bal">{title}</h2>
            <p className="text-neutral-600 leading-relaxed mb-4 md:mb-5">{text1}</p>
            <p className="text-neutral-600 leading-relaxed mb-8 md:mb-10">{text2}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
              {stats.map((s, i) => (
                <div key={s.label} className="group p-4 md:p-5 bg-white/85 border border-neutral-200 rounded-xl shadow-[0_8px_24px_rgba(20,28,46,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-steel/35 hover:shadow-[0_14px_34px_rgba(20,28,46,0.12)]">
                  <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-neutral-400 mb-1">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="font-display text-2xl md:text-3xl font-bold text-graphite mb-0.5 group-hover:text-steel transition-colors">{s.value}</p>
                  <p className="text-xs md:text-sm text-neutral-500">{s.label}</p>
                </div>
              ))}
            </div>

            <Link href={`/${locale}/ueber-uns`}
              className="btn-premium-base btn-premium-steel inline-flex h-11 md:h-12 items-center gap-2 px-6 md:px-7 text-sm font-medium">
              {ctaLabel}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
