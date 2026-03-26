// app/[locale]/datenschutz/page.tsx
import { setRequestLocale } from 'next-intl/server'
import { buildMetadata, COMPANY } from '@/lib/seo'
import { Section, Container } from '@/components/ui/Card'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildMetadata({
    title: 'Datenschutzerklärung – Glaserei Schubert Leipzig',
    description: 'Datenschutzerklärung der Glaserei Schubert gemäß DSGVO.',
    path: '/datenschutz',
    locale,
    noindex: true,
  })
}

export default async function DatenschutzPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <div className="bg-anthracite pt-32 pb-12">
        <Container>
          <Breadcrumbs
            light
            items={[
              { label: locale === 'de' ? 'Startseite' : 'Home', href: `/${locale}` },
              { label: 'Datenschutz' },
            ]}
            className="mb-6"
          />
          <h1 className="font-display text-white">Datenschutzerklärung</h1>
        </Container>
      </div>

      <Section bg="white">
        <Container size="md">
          <div className="space-y-10 text-neutral-600 leading-relaxed">

            <section>
              <h2 className="font-display text-2xl text-graphite mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="font-semibold text-graphite text-lg mb-2">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-graphite text-lg mb-2">Datenerfassung auf dieser Website</h3>
              <p className="mb-3">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
              <p className="mb-3">
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>
              <p>
                <strong>Wofür nutzen wir Ihre Daten?</strong><br />
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-graphite mb-4">2. Hosting</h2>
              <p>
                Wir hosten die Inhalte unserer Website bei einem externen Dienstleister (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-graphite mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="font-semibold text-graphite text-lg mb-2">Datenschutz</h3>
              <p className="mb-3">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <p>
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-graphite text-lg mb-2">Verantwortliche Stelle</h3>
              <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-sm">
                <p className="mb-0">
                  Glaserei Helge Schubert, Inhaber Oliver Schubert<br />
                  {COMPANY.address.street}<br />
                  {COMPANY.address.zip} {COMPANY.address.city}<br />
                  Telefon: {COMPANY.phoneFormatted}<br />
                  E-Mail: {COMPANY.email}
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-graphite text-lg mb-2">Speicherdauer</h3>
              <p>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-graphite mb-4">4. Datenerfassung auf dieser Website</h2>
              <h3 className="font-semibold text-graphite text-lg mb-2">Kontaktformular</h3>
              <p className="mb-3">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p>
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-graphite mb-4">5. Ihre Rechte</h2>
              <p className="mb-3">
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
              </p>
              <ul className="list-none space-y-2 pl-0">
                {[
                  'Recht auf Auskunft (Art. 15 DSGVO)',
                  'Recht auf Berichtigung (Art. 16 DSGVO)',
                  'Recht auf Löschung (Art. 17 DSGVO)',
                  'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
                  'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
                  'Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
                ].map((right) => (
                  <li key={right} className="flex items-center gap-2.5 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-steel shrink-0" />
                    {right}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Zuständige Aufsichtsbehörde: Sächsischer Datenschutzbeauftragter, Postfach 11 01 32, 01330 Dresden.
              </p>
            </section>

          </div>
        </Container>
      </Section>
    </>
  )
}
