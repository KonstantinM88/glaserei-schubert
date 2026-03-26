// components/sections/AboutSection.tsx
import Image from 'next/image'
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
  return (
    <section className="section-py bg-neutral-50">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Visual */}
          <div className="relative order-1 lg:order-none">
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 lg:max-w-none">
              {/* Main image */}
              <div className="relative w-full h-full rounded-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85&auto=format&fit=crop"
                  alt="Glaserei Schubert – Werkstatt und Team"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 80vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite/60 via-transparent to-transparent" />
                {/* Label on image */}
                <div className="absolute bottom-6 left-6">
                  <p className="font-display text-2xl font-bold text-white leading-none">Glaserei</p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1">seit 1990</p>
                </div>
                {/* Right accent line */}
                <div className="absolute right-6 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-steel/40 to-transparent" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-5 -right-5 md:-bottom-6 md:-right-6 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.13)] p-5 md:p-6 rounded-sm min-w-[150px] md:min-w-[170px]">
                <p className="font-display text-4xl md:text-5xl font-bold text-graphite leading-none mb-1">30+</p>
                <p className="text-xs md:text-sm text-neutral-500">{locale === 'de' ? 'Jahre Erfahrung' : 'Years Experience'}</p>
                <div className="mt-3 h-0.5 w-8 bg-steel" />
              </div>

              {/* Corner accent */}
              <div className="absolute -top-3 -left-3 w-14 h-14 border-l-2 border-t-2 border-steel/40" />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center px-3 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase rounded-sm bg-steel/10 text-steel mb-5">
              {badge}
            </div>
            <span className="accent-line" />
            <h2 className="text-graphite mb-6 md:mb-8">{title}</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">{text1}</p>
            <p className="text-neutral-600 leading-relaxed mb-8 md:mb-10">{text2}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-5 mb-8 md:mb-10">
              {stats.map((s) => (
                <div key={s.label} className="p-4 md:p-5 bg-white border border-neutral-100 rounded-sm">
                  <p className="font-display text-2xl md:text-3xl font-bold text-graphite mb-0.5">{s.value}</p>
                  <p className="text-xs md:text-sm text-neutral-500">{s.label}</p>
                </div>
              ))}
            </div>

            <Link href={`/${locale}/ueber-uns`}
              className="inline-flex h-11 md:h-12 items-center gap-2 px-6 md:px-7 bg-graphite text-white text-sm font-medium rounded-sm hover:bg-anthracite transition-colors duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
              {ctaLabel}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}