// app/[locale]/impressum/page.tsx
import { setRequestLocale } from 'next-intl/server'
import { buildMetadata, COMPANY } from '@/lib/seo'
import { Section, Container } from '@/components/ui/Card'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildMetadata({
    title: 'Impressum – Glaserei Schubert Leipzig',
    description: 'Impressum der Glaserei Schubert, Portitzer Allee 10b, 04329 Leipzig.',
    path: '/impressum',
    locale,
    noindex: true,
  })
}

export default async function ImpressumPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <div className="bg-anthracite pt-32 pb-12">
        <Container>
          <Breadcrumbs
            light
            items={[{ label: locale === 'de' ? 'Startseite' : 'Home', href: `/${locale}` }, { label: 'Impressum' }]}
            className="mb-6"
          />
          <h1 className="font-display text-white">Impressum</h1>
        </Container>
      </div>

      <Section bg="white">
        <Container size="md">
          <div className="prose prose-neutral max-w-none">
            <h2 className="font-display text-2xl text-graphite mb-4">Angaben gemäß § 5 TMG</h2>

            <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-sm mb-8">
              <p className="text-neutral-700 leading-relaxed mb-0">
                <strong>Glaserei Helge Schubert</strong><br />
                Inhaber: Oliver Schubert<br />
                {COMPANY.address.street}<br />
                {COMPANY.address.zip} {COMPANY.address.city}<br />
                {COMPANY.address.countryName}
              </p>
            </div>

            <h3 className="font-semibold text-graphite text-lg mb-3">Kontakt</h3>
            <p className="text-neutral-600 mb-6">
              Telefon: {COMPANY.phoneFormatted}<br />
              Fax: 0341 2 33 31 91<br />
              E-Mail: {COMPANY.email}
            </p>

            <h3 className="font-semibold text-graphite text-lg mb-3">Umsatzsteuer-ID</h3>
            <p className="text-neutral-600 mb-6">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: Bitte direkt anfragen.
            </p>

            <h3 className="font-semibold text-graphite text-lg mb-3">Berufsbezeichnung</h3>
            <p className="text-neutral-600 mb-6">
              Glasermeister – zuständige Handwerkskammer: Handwerkskammer zu Leipzig.
            </p>

            <h3 className="font-semibold text-graphite text-lg mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
            <p className="text-neutral-600 mb-6">
              Oliver Schubert, {COMPANY.address.street}, {COMPANY.address.zip} {COMPANY.address.city}
            </p>

            <h3 className="font-semibold text-graphite text-lg mb-3">Haftung für Inhalte</h3>
            <p className="text-neutral-600 mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="text-neutral-600 mb-6">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>

            <h3 className="font-semibold text-graphite text-lg mb-3">Haftung für Links</h3>
            <p className="text-neutral-600 mb-6">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h3 className="font-semibold text-graphite text-lg mb-3">Urheberrecht</h3>
            <p className="text-neutral-600">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
