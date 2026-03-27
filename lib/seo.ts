// lib/seo.ts
import type { Metadata } from 'next'
import { locales, type Locale } from './i18n'

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.glaserei-schubert.de')
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`

export const COMPANY = {
  name: 'Glaserei Schubert',
  legalName: 'Glaserei Helge Schubert, Inhaber Oliver Schubert',
  phone: '+493412412262',
  phoneFormatted: '0341 2412262',
  email: 'info@glaserei-schubert.de',
  address: {
    street: 'Portitzer Allee 10b',
    city: 'Leipzig',
    zip: '04329',
    region: 'Saxony',
    country: 'DE',
    countryName: 'Deutschland',
  },
  geo: {
    lat: 51.3526,
    lng: 12.4435,
  },
  social: {},
  founded: '1990',
} as const

export function buildMetadata({
  title,
  description,
  path = '',
  locale = 'de',
  noindex = false,
  image,
}: {
  title: string
  description: string
  path?: string
  locale?: string
  noindex?: boolean
  image?: string
}): Metadata {
  const url = `${BASE_URL}/${locale}${path}`
  const ogImage = image || DEFAULT_OG_IMAGE

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
      ) as Record<string, string>,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: COMPANY.name,
      locale: locale === 'de' ? 'de_DE' : 'en_GB',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: BASE_URL,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    foundingDate: COMPANY.founded,
    description:
      'Glaserei Schubert in Leipzig – Ihr Fachbetrieb für Glasfassaden, Fenster, Türen, Spiegel und individuelle Glaslösungen seit 1990.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      postalCode: COMPANY.address.zip,
      addressRegion: COMPANY.address.region,
      addressCountry: COMPANY.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00',
      },
    ],
    priceRange: '€€',
    image: DEFAULT_OG_IMAGE,
    hasMap: `https://www.google.com/maps/place/Portitzer+Allee+10b,+04329+Leipzig`,
    areaServed: {
      '@type': 'City',
      name: 'Leipzig',
    },
  }
}

export function serviceSchema(service: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'LocalBusiness',
      name: COMPANY.name,
      url: BASE_URL,
    },
    areaServed: { '@type': 'City', name: 'Leipzig' },
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
