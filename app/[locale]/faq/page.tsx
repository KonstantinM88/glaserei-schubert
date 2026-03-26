// app/[locale]/faq/page.tsx
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata, faqSchema } from '@/lib/seo'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/ProcessSection'
import { Container } from '@/components/ui/Card'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { FAQ_DATA } from '@/lib/services-data'

interface PageProps { params: Promise<{ locale: string }> }

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.faq' })
  return buildMetadata({ title: t('title'), description: t('description'), path: '/faq', locale })
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const lang = locale as 'de' | 'en'

  const faqItems = FAQ_DATA.map((f) => ({ question: f[lang].question, answer: f[lang].answer }))

  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />

      <div className="bg-anthracite pt-32 pb-16">
        <Container>
          <Breadcrumbs
            light
            items={[
              { label: locale === 'de' ? 'Startseite' : 'Home', href: `/${locale}` },
              { label: 'FAQ' },
            ]}
            className="mb-6"
          />
          <h1 className="font-display text-white mb-4">{t('faq.title')}</h1>
          <p className="text-neutral-300 max-w-xl text-lg">{t('faq.subtitle')}</p>
        </Container>
      </div>

      <FAQSection title={t('faq.title')} subtitle={t('faq.subtitle')} items={faqItems} />

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
