import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { SERVICES } from '@/lib/services-data'

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.glaserei-schubert.de')

const STATIC_PATHS = [
  '',
  '/leistungen',
  '/ueber-uns',
  '/kontakt',
  '/referenzen',
  '/faq',
  '/impressum',
  '/datenschutz',
] as const

function getBaseUrl() {
  return BASE_URL.replace(/\/+$/, '')
}

function languageAlternates(path: string) {
  const baseUrl = getBaseUrl()

  return {
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${baseUrl}/${locale}${path}`])
    ),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()
  const lastModified = new Date()

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path === '/leistungen' ? 0.9 : 0.8,
      alternates: languageAlternates(path),
    }))
  )

  const serviceEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    SERVICES.map((service) => ({
      url: `${baseUrl}/${locale}/leistungen/${service.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: languageAlternates(`/leistungen/${service.slug}`),
    }))
  )

  return [...staticEntries, ...serviceEntries]
}
