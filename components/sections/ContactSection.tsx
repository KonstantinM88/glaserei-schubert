'use client'
// components/sections/ContactSection.tsx
import { useState } from 'react'
import { COMPANY } from '@/lib/seo'
import { SERVICES } from '@/lib/services-data'

interface ContactT {
  title: string; subtitle: string
  form: { name:string;email:string;phone:string;subject:string;service:string;message:string;privacy:string;submit:string;success:string;error:string;selectService:string }
  info: { address:string;phone:string;email:string;hours:string;hoursValue:string }
}

export function ContactSection({ locale, t }: { locale: string; t: ContactT }) {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [errors, setErrors] = useState<Record<string,string>>({})
  const opts = SERVICES.map(s => ({ value: s.slug, label: s[locale as 'de'|'en'].title }))

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus('loading'); setErrors({})
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...data, locale}) })
      const json = await res.json()
      if (!res.ok) { if (json.errors) setErrors(json.errors); setStatus('error') }
      else { setStatus('success'); (e.target as HTMLFormElement).reset() }
    } catch { setStatus('error') }
  }

  const infoItems = [
    { label: t.info.address, value: <>{COMPANY.address.street}<br/>{COMPANY.address.zip} {COMPANY.address.city}</>, icon: 'pin' },
    { label: t.info.phone,   value: <a href={`tel:${COMPANY.phone}`} className="hover:text-steel transition-colors">{COMPANY.phoneFormatted}</a>, icon: 'phone' },
    { label: t.info.email,   value: <a href={`mailto:${COMPANY.email}`} className="hover:text-steel transition-colors break-all">{COMPANY.email}</a>, icon: 'mail' },
    { label: t.info.hours,   value: <>{t.info.hoursValue.split('\n').map((l,i)=><span key={i} className="block">{l}</span>)}</>, icon: 'clock' },
  ]

  const iconSvg = (k: string) => {
    const paths: Record<string,string> = {
      pin:   'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      mail:  'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    }
    return <svg className="h-4 w-4 md:h-5 md:w-5 text-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={paths[k]}/></svg>
  }

  const fieldCls = 'w-full h-11 md:h-12 px-4 border border-neutral-200 rounded-sm text-sm text-graphite font-body bg-white outline-none transition-colors focus:border-steel focus:ring-1 focus:ring-steel placeholder:text-neutral-400 hover:border-neutral-300'

  return (
    <section className="section-py bg-neutral-50">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 xl:gap-20">
          {/* Form */}
          <div className="lg:col-span-3">
            <span className="accent-line"/>
            <h2 className="text-graphite mb-3">{t.title}</h2>
            <p className="text-neutral-500 mb-8 md:mb-10">{t.subtitle}</p>

            {status === 'success' ? (
              <div className="flex items-start gap-3 p-5 bg-green-50 border border-green-200 rounded-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                </div>
                <p className="text-sm text-green-800 leading-relaxed">{t.form.success}</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-4 md:gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs md:text-sm font-medium text-graphite">{t.form.name} <span className="text-steel">*</span></label>
                    <input name="name" type="text" required placeholder={t.form.name} className={fieldCls} />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs md:text-sm font-medium text-graphite">{t.form.email} <span className="text-steel">*</span></label>
                    <input name="email" type="email" required placeholder="email@beispiel.de" className={fieldCls} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs md:text-sm font-medium text-graphite">{t.form.phone}</label>
                    <input name="phone" type="tel" placeholder="0341 ..." className={fieldCls} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs md:text-sm font-medium text-graphite">{t.form.service}</label>
                    <div className="relative">
                      <select name="service" className={fieldCls + ' pr-10 appearance-none cursor-pointer'} defaultValue="">
                        <option value="">{t.form.selectService}</option>
                        {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs md:text-sm font-medium text-graphite">{t.form.subject} <span className="text-steel">*</span></label>
                  <input name="subject" type="text" required className={fieldCls} />
                  {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs md:text-sm font-medium text-graphite">{t.form.message} <span className="text-steel">*</span></label>
                  <textarea name="message" required rows={5} className={fieldCls.replace('h-11 md:h-12','') + ' py-3 resize-y min-h-[120px] md:min-h-[140px]'} />
                  {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input name="privacy" type="checkbox" required className="mt-0.5 h-4 w-4 rounded-sm border-neutral-300 accent-steel" />
                  <span className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                    {t.form.privacy.includes('Datenschutz') ? (
                      <>{t.form.privacy.split('Datenschutzerklärung')[0]}<a href={`/${locale}/datenschutz`} className="text-steel hover:underline">Datenschutzerklärung</a>{t.form.privacy.split('Datenschutzerklärung')[1]}</>
                    ) : t.form.privacy}
                  </span>
                </label>
                {status === 'error' && !Object.keys(errors).length && (
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded-sm border border-red-200">{t.form.error}</p>
                )}
                <button type="submit" disabled={status === 'loading'}
                  className="self-start w-full sm:w-auto inline-flex h-11 md:h-12 items-center justify-center gap-2 px-6 md:px-8 bg-graphite text-white text-sm font-medium rounded-sm hover:bg-anthracite transition-colors duration-300 disabled:opacity-60 disabled:pointer-events-none shadow-sm">
                  {status === 'loading' ? (
                    <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>{t.form.submit}</> 
                  ) : (
                    <>{t.form.submit}<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info panel */}
          <div className="lg:col-span-2">
            <div className="bg-graphite text-white p-6 md:p-8 rounded-sm h-full flex flex-col gap-6 md:gap-8">
              {infoItems.map(item => (
                <div key={item.label} className="flex gap-3 md:gap-4">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-sm bg-steel/20">
                    {iconSvg(item.icon)}
                  </div>
                  <div>
                    <p className="text-[10px] font-medium tracking-widest uppercase text-neutral-500 mb-1">{item.label}</p>
                    <div className="text-sm text-neutral-200 leading-relaxed">{item.value}</div>
                  </div>
                </div>
              ))}
              {/* Map placeholder */}
              <div className="mt-auto">
                <a href={`https://www.google.com/maps/search/?api=1&query=Portitzer+Allee+10b+04329+Leipzig`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-sm py-8 text-neutral-500 hover:text-white transition-colors">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                  <span className="text-xs">Google Maps öffnen</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
