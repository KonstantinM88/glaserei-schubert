// components/sections/ProcessSection.tsx

interface ProcessStep { number: string; title: string; description: string }

export function ProcessSection({ title, subtitle, steps }: { title: string; subtitle: string; steps: ProcessStep[] }) {
  return (
    <section className="section-py bg-anthracite">
      <div className="container-site">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-white mb-4 md:mb-5">{title}</h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-steel/40 to-transparent" />

          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-start sm:items-center sm:text-center lg:px-6">
              <div className="flex h-16 w-16 md:h-[72px] md:w-[72px] shrink-0 items-center justify-center rounded-sm border border-steel/30 bg-steel/10 mb-5 md:mb-6">
                <span className="font-display text-xl md:text-2xl font-bold text-steel">{step.number}</span>
              </div>
              <h3 className="font-display text-base md:text-lg font-semibold text-white mb-2 md:mb-3">{step.title}</h3>
              <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

interface CTAProps {
  locale: string
  title: string
  subtitle: string
  primaryLabel: string
  secondaryLabel: string
  secondaryNumber: string
}

export function CTASection({ locale, title, subtitle, primaryLabel, secondaryLabel, secondaryNumber }: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-steel py-16 md:py-24 lg:py-28">
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative z-10 container-site text-center">
        <h2 className="text-white mb-4 md:mb-5">{title}</h2>
        <p className="text-white/75 text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">{subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href={`/${locale}/kontakt`}
            className="btn-premium-base btn-premium-light w-full sm:w-auto inline-flex h-12 md:h-14 items-center justify-center gap-2 px-6 md:px-8 text-sm font-semibold">
            {primaryLabel}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
          <div className="hidden sm:flex items-center gap-3"><div className="h-px w-5 bg-white/30"/><span className="text-white/60 text-sm">{secondaryLabel}</span><div className="h-px w-5 bg-white/30"/></div>
          <a href="tel:+493412412262"
            className="btn-premium-base btn-premium-glass w-full sm:w-auto inline-flex h-12 md:h-14 items-center justify-center gap-2.5 px-6 md:px-8 text-sm font-medium">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            {secondaryNumber}
          </a>
        </div>
      </div>
    </section>
  )
}
