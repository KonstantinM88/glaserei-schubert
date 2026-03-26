// components/sections/ServicesGrid.tsx
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES } from '@/lib/services-data'

const SERVICE_IMAGES: Record<string, string> = {
  'fenster-tueren':       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
  'glasfassaden':         'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop',
  'ganzglasanlagen':      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80&auto=format&fit=crop',
  'reparaturverglasungen':'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop',
  'spiegel':              'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&auto=format&fit=crop',
  'terrassendaecher':     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop',
  'industrieverglasungen':'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&auto=format&fit=crop',
  'glasbearbeitung':      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop',
}

interface ServicesGridProps {
  locale: string
  title: string
  subtitle: string
  limit?: number
  variant?: 'cards' | 'grid'
}

export function ServicesGrid({ locale, title, subtitle, limit, variant = 'cards' }: ServicesGridProps) {
  const services = limit ? SERVICES.slice(0, limit) : SERVICES
  const lang = locale as 'de' | 'en'

  return (
    <section className="section-py bg-white">
      <div className="container-site">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-graphite mb-4 md:mb-5">{title}</h2>
          <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-neutral-200">
          {services.map((service) => {
            const tr = service[lang]
            return (
              <Link key={service.slug} href={`/${locale}/leistungen/${service.slug}`}
                className="group flex flex-col border-r border-b border-neutral-200 last:border-r-0 [&:nth-child(2n)]:sm:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 hover:bg-neutral-50 transition-colors duration-300 relative overflow-hidden">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={SERVICE_IMAGES[service.slug]}
                    alt={tr.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent" />
                </div>
                {/* Steel bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-steel scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left z-10" />
                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-1 gap-3">
                  <h3 className="text-sm md:text-base font-semibold text-graphite group-hover:text-steel transition-colors leading-snug">
                    {tr.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-500 leading-relaxed flex-1 line-clamp-2">
                    {tr.shortDesc}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-steel mt-auto">
                    <span>{locale === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {limit && (
          <div className="mt-8 md:mt-12 text-center">
            <Link href={`/${locale}/leistungen`}
              className="inline-flex h-11 md:h-12 items-center gap-2 px-6 md:px-8 border border-graphite text-graphite text-sm font-medium rounded-sm hover:bg-graphite hover:text-white transition-all duration-300">
              {locale === 'de' ? 'Alle Leistungen ansehen' : 'View all services'}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}