// app/[locale]/kontakt/page.tsx
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { ContactSection } from '@/components/sections/ContactSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.contact' })
  return buildMetadata({ title: t('title'), description: t('description'), path: '/kontakt', locale })
}

export default async function KontaktPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const heroAlt = locale === 'de'
    ? 'Empfangsbereich der Glaserei Schubert in Leipzig'
    : 'Reception area of Glaserei Schubert in Leipzig'

  const contactT = {
    title: t('contact.title'),
    subtitle: t('contact.subtitle'),
    form: {
      name: t('contact.form.name'),
      email: t('contact.form.email'),
      phone: t('contact.form.phone'),
      subject: t('contact.form.subject'),
      service: t('contact.form.service'),
      message: t('contact.form.message'),
      privacy: t('contact.form.privacy'),
      submit: t('contact.form.submit'),
      success: t('contact.form.success'),
      error: t('contact.form.error'),
      selectService: t('contact.form.selectService'),
    },
    info: {
      address: t('contact.info.address'),
      phone: t('contact.info.phone'),
      email: t('contact.info.email'),
      hours: t('contact.info.hours'),
      hoursValue: t('contact.info.hoursValue'),
    },
  }

  return (
    <>
      <div className="relative">
        <div className="relative h-[76svh] min-h-[560px] max-h-[760px] md:h-[100svh] md:max-h-[100svh] overflow-hidden">
          <Image
            src="/Pictures/lobby_1600.webp"
            alt={heroAlt}
            fill
            priority
            quality={100}
            className="object-cover object-[62%_center] md:object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-anthracite/58 via-anthracite/32 to-anthracite/78 md:bg-gradient-to-r md:from-anthracite/88 md:via-anthracite/62 md:to-steel/20" />
          <div
            className="absolute inset-0 opacity-[0.025] md:opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end pb-7 md:pb-12 lg:pb-16">
          <div className="container-site">
            <Breadcrumbs
              light
              items={[
                { label: locale === 'de' ? 'Startseite' : 'Home', href: `/${locale}` },
                { label: t('nav.contact') },
              ]}
              className="mb-4"
            />
            <h1 className="text-white mb-3 max-w-4xl text-balance">{t('contact.title')}</h1>
            <p className="text-neutral-200 text-base md:text-lg max-w-xl md:max-w-2xl">{t('contact.subtitle')}</p>
          </div>
        </div>
      </div>

      <ContactSection locale={locale} t={contactT} />
    </>
  )
}
