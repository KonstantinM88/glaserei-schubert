// components/sections/TrustBar.tsx
import { useTranslations } from 'next-intl'

const icons = {
  certified: <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>,
  clock: <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  star: <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>,
  bolt: <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  pin: <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
}

export function TrustBar() {
  const t = useTranslations('trustBar')
  const items = [
    { icon: icons.certified, label: t('certified') },
    { icon: icons.clock,     label: t('experience') },
    { icon: icons.star,      label: t('quality') },
    { icon: icons.bolt,      label: t('service') },
    { icon: icons.pin,       label: t('region') },
  ]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-graphite via-anthracite to-graphite">
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-steel/40 to-transparent" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-steel/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-steel/15 blur-3xl" />

      <div className="container-site relative">
        <div className="py-2 md:py-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-2 md:min-w-0 md:grid md:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] md:gap-3">
            {items.map((item, i) => (
              <div
                key={item.label}
                className="group relative flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3.5 md:px-5 md:py-4 backdrop-blur-[2px] transition-all duration-400 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.055]"
              >
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-steel/35 bg-gradient-to-br from-steel/35 via-steel/20 to-transparent text-steel-light shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors duration-300 group-hover:text-white">
                  {item.icon}
                </span>

                <div className="flex min-w-0 items-start gap-2">
                  <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/35 transition-colors duration-300 group-hover:text-white/55">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="whitespace-nowrap md:whitespace-normal text-xs md:text-[13px] lg:text-sm leading-tight font-medium text-white/78 transition-colors duration-300 group-hover:text-white">
                    {item.label}
                  </span>
                </div>

                <span
                  className={`pointer-events-none absolute bottom-0 left-0 h-px bg-gradient-to-r from-steel/85 via-steel/35 to-transparent transition-all duration-500 ${
                    i === 0 ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
