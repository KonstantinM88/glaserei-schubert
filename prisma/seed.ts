// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { SERVICES, FAQ_DATA } from '../lib/services-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ── Services ──────────────────────────────────────────────────────────────
  for (const s of SERVICES) {
    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        icon: s.icon,
        order: s.order,
        featured: s.featured,
        active: true,
      },
    })

    await prisma.serviceTranslation.upsert({
      where: { serviceId_locale: { serviceId: service.id, locale: 'de' } },
      update: {
        title: s.de.title,
        shortDesc: s.de.shortDesc,
        description: s.de.description,
        benefits: s.de.benefits,
        metaTitle: s.de.metaTitle,
        metaDesc: s.de.metaDesc,
      },
      create: {
        serviceId: service.id,
        locale: 'de',
        title: s.de.title,
        shortDesc: s.de.shortDesc,
        description: s.de.description,
        benefits: s.de.benefits,
        metaTitle: s.de.metaTitle,
        metaDesc: s.de.metaDesc,
      },
    })

    await prisma.serviceTranslation.upsert({
      where: { serviceId_locale: { serviceId: service.id, locale: 'en' } },
      update: {
        title: s.en.title,
        shortDesc: s.en.shortDesc,
        description: s.en.description,
        benefits: s.en.benefits,
        metaTitle: s.en.metaTitle,
        metaDesc: s.en.metaDesc,
      },
      create: {
        serviceId: service.id,
        locale: 'en',
        title: s.en.title,
        shortDesc: s.en.shortDesc,
        description: s.en.description,
        benefits: s.en.benefits,
        metaTitle: s.en.metaTitle,
        metaDesc: s.en.metaDesc,
      },
    })

    console.log(`  ✓ Service: ${s.slug}`)
  }

  // ── FAQs ──────────────────────────────────────────────────────────────────
  for (let i = 0; i < FAQ_DATA.length; i++) {
    const f = FAQ_DATA[i]

    const faq = await prisma.fAQ.create({
      data: { order: i + 1, active: true },
    })

    await prisma.fAQTranslation.create({
      data: { faqId: faq.id, locale: 'de', question: f.de.question, answer: f.de.answer },
    })

    await prisma.fAQTranslation.create({
      data: { faqId: faq.id, locale: 'en', question: f.en.question, answer: f.en.answer },
    })

    console.log(`  ✓ FAQ ${i + 1}`)
  }

  console.log('\n✅ Seeding complete!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
