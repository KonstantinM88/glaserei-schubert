# Glaserei Schubert – Next.js 15 Website

Премиальный сайт для немецкой стекольной компании в Лейпциге.

## Tech Stack

| Технология | Версия |
|---|---|
| Next.js | 15.2.8 |
| React | 19 |
| TypeScript | 5.9.3 |
| Prisma | 6.1.x |
| Tailwind CSS | 4.x |
| Zod | 3.x |
| next-intl | 3.x |
| Node.js | v22.14 |

---

## Быстрый старт

### 1. Установить зависимости
```bash
npm install
```

### 2. Настроить переменные окружения
```bash
cp .env.example .env
# Заполните DATABASE_URL и другие переменные
```

### 3. Поднять базу данных (PostgreSQL)
```bash
# Вариант 1 – Docker
docker run -d \
  --name glaserei-db \
  -e POSTGRES_DB=glaserei_schubert \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16

# В .env установите:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/glaserei_schubert?schema=public"
```

### 4. Применить схему Prisma
```bash
npm run db:push
```

### 5. Заполнить базу данными
```bash
npm run db:seed
```

### 6. Запустить в dev-режиме
```bash
npm run dev
```

Сайт доступен по адресу: http://localhost:3000/de

---

## Структура проекта

```
glaserei-schubert/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                    ← Главная страница
│   │   ├── leistungen/
│   │   │   ├── page.tsx                ← Список услуг
│   │   │   └── [slug]/page.tsx         ← Детальная страница услуги
│   │   ├── referenzen/page.tsx         ← Референции
│   │   ├── ueber-uns/page.tsx          ← О компании
│   │   ├── faq/page.tsx                ← FAQ
│   │   ├── kontakt/page.tsx            ← Контакт
│   │   ├── impressum/page.tsx          ← Impressum
│   │   └── datenschutz/page.tsx        ← Datenschutz
│   └── api/
│       └── contact/route.ts            ← API форма контакта
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx                    ← Card, Badge, Container, Section, SectionHeading
│   │   ├── FormFields.tsx              ← Input, Textarea, Select, Checkbox
│   │   └── Breadcrumbs.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── TrustBar.tsx
│       ├── ServicesGrid.tsx
│       ├── AboutSection.tsx
│       ├── ProcessSection.tsx          ← ProcessSection + CTASection
│       ├── FAQSection.tsx
│       └── ContactSection.tsx
├── lib/
│   ├── i18n.ts                         ← next-intl config
│   ├── seo.ts                          ← SEO helpers + JSON-LD schemas
│   ├── utils.ts                        ← cn(), slugify()
│   ├── prisma.ts                       ← Prisma singleton
│   └── services-data.ts               ← Статические данные услуг и FAQ
├── messages/
│   ├── de.json                         ← Немецкий перевод
│   └── en.json                         ← Английский перевод
├── prisma/
│   ├── schema.prisma                   ← Схема БД
│   └── seed.ts                         ← Сид данных
├── middleware.ts                        ← i18n routing
├── next.config.ts
├── postcss.config.mjs
├── app/globals.css                      ← Tailwind 4 + design system
└── preview.html                         ← 📱 Статический HTML-превью
```

---

## Маршруты

| Маршрут | Описание |
|---|---|
| `/de` | Главная (немецкий) |
| `/en` | Главная (английский) |
| `/de/leistungen` | Список услуг |
| `/de/leistungen/fenster-tueren` | Услуга: Fenster & Türen |
| `/de/leistungen/glasfassaden` | Услуга: Glasfassaden |
| `/de/referenzen` | Референции |
| `/de/ueber-uns` | О компании |
| `/de/faq` | FAQ |
| `/de/kontakt` | Контакт |
| `/de/impressum` | Impressum |
| `/de/datenschutz` | Datenschutz |
| `/api/contact` | POST – отправка формы |

---

## Услуги (8 slug'ов)

- `fenster-tueren`
- `glasfassaden`
- `ganzglasanlagen`
- `reparaturverglasungen`
- `spiegel`
- `terrassendaecher`
- `industrieverglasungen`
- `glasbearbeitung`

---

## SEO

- `generateMetadata()` на каждой странице
- `hreflang` теги (DE/EN)
- Canonical URLs
- Open Graph + Twitter Cards
- JSON-LD: `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`

---

## Контактная форма

- Валидация на фронтенде (HTML5 required)
- Zod-валидация на бэкенде (`/api/contact`)
- Сохранение в PostgreSQL через Prisma
- Email-уведомление (подключается через Nodemailer/Resend в `app/api/contact/route.ts`)

---

## Preview

Откройте файл `preview.html` в браузере для просмотра дизайна без запуска сервера.

---

## Production build

```bash
npm run build
npm run start
```

---

## Prisma Studio

```bash
npm run db:studio
```

Открывает GUI для работы с базой данных на http://localhost:5555
