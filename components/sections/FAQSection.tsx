'use client'
// components/sections/FAQSection.tsx
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FAQItem { question: string; answer: string }

function FAQItem({ question, answer, defaultOpen }: FAQItem & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className={cn('border-b border-neutral-200 last:border-0', open && 'bg-neutral-50/60')}>
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="flex w-full items-start justify-between py-5 md:py-6 gap-4 text-left group">
        <span className={cn('font-medium text-sm md:text-base transition-colors', open ? 'text-steel' : 'text-graphite group-hover:text-steel')}>
          {question}
        </span>
        <span className={cn('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm transition-all duration-300',
          open ? 'bg-steel text-white rotate-45' : 'bg-neutral-100 text-graphite group-hover:bg-steel/10')}>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
        </span>
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', open ? 'max-h-96 pb-5 md:pb-6' : 'max-h-0')}>
        <p className="text-sm md:text-base text-neutral-600 leading-relaxed pr-8 md:pr-10">{answer}</p>
      </div>
    </div>
  )
}

export function FAQSection({ title, subtitle, items }: { title: string; subtitle: string; items: FAQItem[] }) {
  return (
    <section className="section-py bg-white">
      <div className="container-site max-w-4xl">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-graphite mb-4">{title}</h2>
          <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto">{subtitle}</p>
        </div>
        <div className="border-t border-neutral-200">
          {items.map((item, i) => (
            <FAQItem key={i} {...item} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
