const FALLBACK_BASE_URL = 'https://glaserei-schubert-01.vercel.app'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : FALLBACK_BASE_URL)
).replace(/\/+$/, '')

export function getSiteUrl() {
  return SITE_URL
}
