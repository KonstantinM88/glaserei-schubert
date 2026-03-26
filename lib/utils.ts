// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äöüß]/g, (c) =>
      ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }[c] || c)
    )
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function formatPhone(phone: string) {
  return phone.replace(/(\d{4})(\d{3})(\d+)/, '$1 $2 $3')
}
