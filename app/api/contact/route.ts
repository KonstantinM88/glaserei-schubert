// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const contactSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen haben').max(100),
  email: z.string().email('Bitte gültige E-Mail-Adresse eingeben'),
  phone: z.string().max(30).optional().or(z.literal('')),
  subject: z.string().min(3, 'Betreff muss mindestens 3 Zeichen haben').max(200),
  service: z.string().max(100).optional().or(z.literal('')),
  message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen haben').max(5000),
  privacy: z.string().refine((v) => v === 'on' || v === 'true', {
    message: 'Bitte stimmen Sie der Datenschutzerklärung zu',
  }),
  locale: z.enum(['de', 'en']).default('de'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString()
        if (key) fieldErrors[key] = issue.message
      })
      return NextResponse.json({ errors: fieldErrors }, { status: 422 })
    }

    const { privacy, ...data } = result.data

    // Save to DB
    const contact = await prisma.contactRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        service: data.service || null,
        message: data.message,
        locale: data.locale,
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
        userAgent: request.headers.get('user-agent') || null,
      },
    })

    // Optional: send notification email
    // await sendNotificationEmail(data)

    return NextResponse.json({ success: true, id: contact.id }, { status: 201 })
  } catch (error) {
    console.error('[Contact API Error]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
