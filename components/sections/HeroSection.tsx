// components/sections/HeroSection.tsx
import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
  locale: string
  badge: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaSecondary: string
  trustedBy: string
}

export function HeroSection({ locale, badge, title, subtitle, ctaLabel, ctaSecondary, trustedBy }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85&auto=format&fit=crop"
          alt="Moderne Glasfassade Leipzig"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite/90 via-anthracite/70 to-steel/25" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
        {/* Vertical accent lines */}
        <div className="hidden lg:block absolute right-[8%] top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-white/18 to-transparent" />
        <div className="hidden lg:block absolute right-[16%] top-[28%] bottom-[28%] w-px bg-gradient-to-b from-transparent via-steel/35 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-site w-full pt-28 pb-20 md:pt-28 md:pb-14 lg:pt-32 lg:pb-16">
        <div className="max-w-3xl lg:max-w-[56rem]">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase rounded-sm bg-white/12 border border-white/25 text-white/85 mb-6 md:mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {badge}
          </div>

          {/* Title */}
          <h1 className="text-white mb-5 md:mb-6 animate-fade-up text-bal" style={{ animationDelay: '0.2s' }}>
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-[1.14rem] text-white/65 leading-relaxed mb-8 md:mb-8 lg:mb-9 max-w-2xl animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 md:mb-8 lg:mb-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Link href={`/${locale}/kontakt`}
              className="btn-premium-base btn-premium-light inline-flex h-12 md:h-14 items-center justify-center px-6 md:px-8 text-sm font-semibold tracking-wide gap-2">
              {ctaLabel}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
            <Link href={`/${locale}/leistungen`}
              className="btn-premium-base btn-premium-glass inline-flex h-12 md:h-14 items-center justify-center px-6 md:px-8 text-sm font-medium tracking-wide">
              {ctaSecondary}
            </Link>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-3 md:gap-4 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex -space-x-2">
              {['11','32','44','57'].map(n => (
                <div key={n} className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-anthracite overflow-hidden">
                  <img src={`https://i.pravatar.cc/40?img=${n}`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <p className="text-[11px] text-white/45">{trustedBy}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1s' }}>
        <span className="text-[9px] text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="h-7 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}



// // components/sections/HeroSection.tsx
// import Link from 'next/link'
// import { Badge } from '@/components/ui/Card'

// interface HeroSectionProps {
//   locale: string
//   badge: string
//   title: string
//   subtitle: string
//   ctaLabel: string
//   ctaSecondary: string
//   trustedBy: string
// }

// export function HeroSection({
//   locale,
//   badge,
//   title,
//   subtitle,
//   ctaLabel,
//   ctaSecondary,
//   trustedBy,
// }: HeroSectionProps) {
//   return (
//     <section
//       className="relative min-h-screen flex items-center overflow-hidden"
//       aria-label="Hero"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 bg-anthracite">
//         {/* Architectural grid overlay */}
//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
//             `,
//             backgroundSize: '80px 80px',
//           }}
//         />
//         {/* Steel blue accent gradient */}
//         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-steel/15 via-transparent to-transparent" />
//         <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-steel/10 via-transparent to-transparent" />

//         {/* Glass panel decorative elements */}
//         <div className="absolute right-[8%] top-[20%] w-px h-[60vh] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
//         <div className="absolute right-[16%] top-[30%] w-px h-[40vh] bg-gradient-to-b from-transparent via-steel/30 to-transparent" />
//         <div className="absolute left-[5%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pt-32 pb-24">
//         <div className="max-w-3xl">
//           {/* Badge */}
//           <div className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
//             <Badge variant="light">{badge}</Badge>
//           </div>

//           {/* Title */}
//           <h1
//             className="font-display text-white mb-8 animate-fade-up"
//             style={{ animationDelay: '0.2s' }}
//           >
//             {title}
//           </h1>

//           {/* Subtitle */}
//           <p
//             className="text-lg md:text-xl text-white/70 leading-relaxed mb-12 max-w-xl animate-fade-up"
//             style={{ animationDelay: '0.3s' }}
//           >
//             {subtitle}
//           </p>

//           {/* CTAs */}
//           <div
//             className="flex flex-col sm:flex-row gap-4 animate-fade-up"
//             style={{ animationDelay: '0.4s' }}
//           >
//             <Link
//               href={`/${locale}/kontakt`}
//               className="inline-flex h-13 items-center justify-center px-8 bg-white text-graphite text-sm font-semibold tracking-wide rounded-sm hover:bg-neutral-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
//             >
//               {ctaLabel}
//               <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//             <Link
//               href={`/${locale}/leistungen`}
//               className="inline-flex h-13 items-center justify-center px-8 bg-white/10 border border-white/30 text-white text-sm font-medium tracking-wide rounded-sm hover:bg-white/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
//             >
//               {ctaSecondary}
//             </Link>
//           </div>

//           {/* Trust indicator */}
//           <div
//             className="mt-14 flex items-center gap-4 animate-fade-up"
//             style={{ animationDelay: '0.5s' }}
//           >
//             <div className="flex -space-x-2">
//               {[...Array(4)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-9 w-9 rounded-full border-2 border-anthracite bg-gradient-to-br from-neutral-500 to-neutral-700 flex items-center justify-center text-white text-xs font-medium"
//                 >
//                   {['M', 'S', 'K', 'T'][i]}
//                 </div>
//               ))}
//             </div>
//             <div>
//               <div className="flex items-center gap-1 mb-0.5">
//                 {[...Array(5)].map((_, i) => (
//                   <svg key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
//                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-xs text-white/50">{trustedBy}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom fade */}
//       <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent" />

//       {/* Scroll indicator */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1s' }}>
//         <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
//         <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
//       </div>
//     </section>
//   )
// }
