import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { PageHero } from '../../../components/PageHero'
import { Field, Alert, Spinner, inputClass, inputStyle } from '../../../components/insurance/Field'
import {
  getCatalogs, getPricing, purchase, loadQuote, clearQuote, findCoverage, money, formatDate, tripDays,
  type Catalogs, type Pricing, type Selection, type Voucher, type ApiError,
} from '../../../lib/insurance'

const font = { fontFamily: 'Manrope, sans-serif' }

interface TravelerDetails { firstName: string; lastName: string; email: string; phone: string; passport: string }
const emptyTraveler = (): TravelerDetails => ({ firstName: '', lastName: '', email: '', phone: '', passport: '' })

function Card({ title, step, children }: { title: string; step: number; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ background: 'white', border: '1px solid rgba(13,43,69,0.08)', boxShadow: '0 2px 12px rgba(13,43,69,0.04)' }}>
      <h2 className="text-lg font-800 mb-5 flex items-center gap-3" style={{ color: '#0D2B45', ...font }}>
        <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm text-white shrink-0" style={{ background: '#F47C20' }}>{step}</span>
        {title}
      </h2>
      {children}
    </div>
  )
}

function Success({ voucher }: { voucher: Voucher }) {
  return (
    <section className="py-20" style={{ background: '#FFF9F3' }}>
      <div className="max-w-2xl mx-auto px-6">
        <div className="rounded-2xl p-8 md:p-12 text-center bg-white shadow-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl" style={{ background: 'rgba(46,139,87,0.12)', color: '#2E8B57' }}>✓</div>
          <h2 className="text-3xl font-800 mb-3" style={{ color: '#0D2B45', ...font }}>You're covered!</h2>
          <p className="text-gray-600 mb-8">
            Your travel assistance voucher has been issued.
            {voucher.voucherUrl ? ' Use View Voucher to download it, and keep a copy with you on your trip.' : ' Please note your voucher code and keep it with you on your trip.'}
          </p>
          <div className="rounded-xl p-5 mb-8 text-left space-y-2 text-sm" style={{ background: '#FFF9F3' }}>
            <p><span className="text-gray-500">Voucher code:</span> <strong style={{ color: '#0D2B45' }}>{voucher.voucherCode}</strong></p>
            <p><span className="text-gray-500">Amount charged:</span> <strong style={{ color: '#0D2B45' }}>{money(voucher.amountCharged)}</strong></p>
            {voucher.transactionId && <p><span className="text-gray-500">Transaction ID:</span> {voucher.transactionId}</p>}
            {voucher.authorizationCode && <p><span className="text-gray-500">Authorization code:</span> {voucher.authorizationCode}</p>}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {voucher.voucherUrl && (
              <a href={voucher.voucherUrl} target="_blank" rel="noopener noreferrer" className="rounded-full px-8 py-3.5 font-700 text-white" style={{ background: '#F47C20', ...font }}>View Voucher</a>
            )}
            <Link to="/" className="rounded-full px-8 py-3.5 font-700" style={{ border: '2px solid #0D2B45', color: '#0D2B45', ...font }}>Back to Home</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function CheckoutPage() {
  const [params] = useSearchParams()
  const planId = Number(params.get('planId'))
  const coverageId = Number(params.get('coverageId'))
  const saved = useMemo(() => loadQuote(), [])
  const match = findCoverage(saved, planId, coverageId)

  const [catalogs, setCatalogs] = useState<Catalogs | null>(null)
  const [pricing, setPricing] = useState<Pricing | null>(null)
  const [pricingError, setPricingError] = useState('')
  const [pricingLoading, setPricingLoading] = useState(false)
  const [riders, setRiders] = useState<{ travelerId: number; benefitId: number }[]>([])
  const [promoInput, setPromoInput] = useState('')
  const [promoApplied, setPromoApplied] = useState('')
  const [promoMessage, setPromoMessage] = useState('')

  const [travelers, setTravelers] = useState<TravelerDetails[]>(() => (saved?.trip.travelers ?? []).map(emptyTraveler))
  const [contact, setContact] = useState({ name: '', email: '', phone: '', comment: '' })
  const [payment, setPayment] = useState({ cardType: '', cardNumber: '', cardName: '', expMonth: '', expYear: '', cvv: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [voucher, setVoucher] = useState<Voucher | null>(null)

  const selection: Selection | null = saved && match ? { reference: saved.quote.reference, planId, coverageId, riders, promoCode: promoApplied } : null

  const refreshPricing = useCallback(async (sel: Selection) => {
    if (!saved) return
    setPricingLoading(true)
    setPricingError('')
    try {
      const p = await getPricing(saved.trip, sel)
      setPricing(p)
      return p
    } catch (e) {
      setPricingError((e as ApiError).message)
    } finally {
      setPricingLoading(false)
    }
  }, [saved])

  useEffect(() => {
    getCatalogs().then(setCatalogs).catch(() => setCatalogs({ countries: [], destinations: [], genders: [], cards: [] }))
    if (saved && match) refreshPricing({ reference: saved.quote.reference, planId, coverageId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggleRider(travelerId: number, benefitId: number) {
    const exists = riders.some(r => r.travelerId === travelerId && r.benefitId === benefitId)
    const next = exists ? riders.filter(r => !(r.travelerId === travelerId && r.benefitId === benefitId)) : [...riders, { travelerId, benefitId }]
    setRiders(next)
    refreshPricing({ reference: saved!.quote.reference, planId, coverageId, riders: next, promoCode: promoApplied })
  }

  async function applyPromo() {
    const code = promoInput.trim()
    setPromoMessage('')
    const p = await refreshPricing({ reference: saved!.quote.reference, planId, coverageId, riders, promoCode: code })
    if (!p) return
    if (code && p.discount > 0) { setPromoApplied(code); setPromoMessage(`Code applied — you save ${money(p.discount)}.`) }
    else if (code) { setPromoApplied(''); setPromoMessage('This promo code is not valid for this plan.') }
  }

  // Editing a field clears its error message
  const clearErrors = (keys: string[]) => setErrors(e => {
    if (!keys.some(k => k in e)) return e
    const next = { ...e }
    keys.forEach(k => delete next[k])
    return next
  })
  const setT = (i: number, patch: Partial<TravelerDetails>) => {
    setTravelers(ts => ts.map((t, j) => (j === i ? { ...t, ...patch } : t)))
    clearErrors(Object.keys(patch).map(k => `travelers.${i}.${k}`))
  }
  const editContact = (patch: Partial<typeof contact>) => {
    setContact(c => ({ ...c, ...patch }))
    clearErrors(Object.keys(patch).map(k => `contact.${k}`))
  }
  const editPayment = (patch: Partial<typeof payment>) => {
    setPayment(p => ({ ...p, ...patch }))
    clearErrors(Object.keys(patch).map(k => (k === 'expMonth' || k === 'expYear' ? 'payment.expiry' : `payment.${k}`)))
  }

  function validate() {
    const e: Record<string, string> = {}
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    travelers.forEach((t, i) => {
      if (!t.firstName.trim()) e[`travelers.${i}.firstName`] = 'Enter the first name.'
      if (!t.lastName.trim()) e[`travelers.${i}.lastName`] = 'Enter the last name.'
      if (!email.test(t.email.trim())) e[`travelers.${i}.email`] = 'Enter a valid email address.'
      if (!t.phone.trim()) e[`travelers.${i}.phone`] = 'Enter a phone number.'
      if (!t.passport.trim()) e[`travelers.${i}.passport`] = 'Enter the passport or ID number.'
    })
    if (!contact.name.trim()) e['contact.name'] = 'Enter the contact name.'
    if (!email.test(contact.email.trim())) e['contact.email'] = 'Enter a valid email address.'
    if (!contact.phone.trim()) e['contact.phone'] = 'Enter a phone number.'
    if (!payment.cardType) e['payment.cardType'] = 'Select the card type.'
    if (payment.cardNumber.replace(/\D/g, '').length < 13) e['payment.cardNumber'] = 'Enter a valid card number.'
    if (!payment.cardName.trim()) e['payment.cardName'] = 'Enter the name on the card.'
    if (!payment.expMonth || !payment.expYear) e['payment.expiry'] = 'Select the expiry month and year.'
    if (!/^\d{3,4}$/.test(payment.cvv)) e['payment.cvv'] = 'Enter the 3 or 4 digit security code.'
    return e
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    setSubmitError('')
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) { setSubmitError('Please check the highlighted fields.'); return }
    if (!saved || !selection || !pricing) return
    setSubmitting(true)
    try {
      const v = await purchase(saved.trip, selection, {
        amount: pricing.total,
        contact,
        payment,
        travelers: travelers.map((t, i) => ({ ...t, genderId: saved.trip.travelers[i].genderId, dateOfBirth: saved.trip.travelers[i].dateOfBirth })),
      })
      setVoucher(v)
      clearQuote()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      const apiErr = err as ApiError
      setSubmitError(apiErr.message)
      if (apiErr.fields) setErrors(apiErr.fields)
    } finally {
      setSubmitting(false)
    }
  }

  const hero = (
    <PageHero
      image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&h=700&fit=crop&auto=format"
      title={voucher ? 'Purchase Complete' : 'Checkout'}
      intro={match ? `${match.plan.name} — ${match.coverage.name} · BMI Travel Assistance` : 'BMI Travel Assistance'}
      crumbs={[{ label: 'Travel Insurance', to: '/projects/travel-insurance' }, { label: 'Checkout' }]}
    />
  )

  if (voucher) return <div>{hero}<Success voucher={voucher} /></div>

  if (!saved || !match) {
    return (
      <div>
        {hero}
        <section className="py-20" style={{ background: '#FFF9F3' }}>
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-800 mb-3" style={{ color: '#0D2B45', ...font }}>Your quote has expired</h2>
            <p className="text-gray-600 mb-8">Quotes are kept for 2 hours. Please get a new quote to continue.</p>
            <Link to="/projects/travel-insurance#quote" className="inline-block rounded-full px-8 py-3.5 font-700 text-white" style={{ background: '#F47C20', ...font }}>Get a Quote</Link>
          </div>
        </section>
      </div>
    )
  }

  const optional = pricing?.travelers.flatMap(t => t.items.filter(i => !i.required).map(i => ({ ...i, travelerId: t.travelerId, description: t.description }))) ?? []
  const years = Array.from({ length: 12 }, (_, i) => new Date().getFullYear() + i)

  return (
    <div>
      {hero}
      <section className="py-16" style={{ background: '#FFF9F3' }}>
        <form onSubmit={handleSubmit} noValidate className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {optional.length > 0 && (
              <Card title="Optional Add-ons" step={1}>
                <div className="space-y-3">
                  {optional.map(o => {
                    const checked = riders.some(r => r.travelerId === o.travelerId && r.benefitId === o.benefitId)
                    return (
                      <label key={`${o.travelerId}-${o.benefitId}`} className="flex items-center justify-between gap-4 rounded-xl p-4 cursor-pointer" style={{ background: '#FFF9F3' }}>
                        <span className="flex items-center gap-3">
                          <input type="checkbox" checked={checked} onChange={() => toggleRider(o.travelerId, o.benefitId)} className="w-4 h-4 accent-orange-500" />
                          <span className="text-sm"><strong style={{ color: '#0D2B45' }}>{o.name}</strong><br /><span className="text-gray-500">{o.description}</span></span>
                        </span>
                        <span className="text-sm font-700" style={{ color: '#0D2B45' }}>+{money(o.premium)}</span>
                      </label>
                    )
                  })}
                </div>
              </Card>
            )}

            <Card title="Traveler Details" step={optional.length ? 2 : 1}>
              <div className="space-y-6">
                {travelers.map((t, i) => {
                  const q = saved.trip.travelers[i]
                  const gender = catalogs?.genders.find(g => String(g.id) === q.genderId)?.name
                  const err = (f: string) => errors[`travelers.${i}.${f}`]
                  return (
                    <div key={i} className={i ? 'pt-6 border-t border-gray-100' : ''}>
                      <p className="text-sm font-700 mb-3" style={{ color: '#0D2B45' }}>
                        Traveler {i + 1} <span className="font-500 text-gray-400">· born {formatDate(q.dateOfBirth)}{gender ? ` · ${gender}` : ''}</span>
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="First Name" required error={err('firstName')}><input className={inputClass} style={inputStyle(err('firstName'))} value={t.firstName} onChange={e => setT(i, { firstName: e.target.value })} autoComplete="given-name" /></Field>
                        <Field label="Last Name" required error={err('lastName')}><input className={inputClass} style={inputStyle(err('lastName'))} value={t.lastName} onChange={e => setT(i, { lastName: e.target.value })} autoComplete="family-name" /></Field>
                        <Field label="Email" required error={err('email')}><input type="email" className={inputClass} style={inputStyle(err('email'))} value={t.email} onChange={e => setT(i, { email: e.target.value })} /></Field>
                        <Field label="Phone" required error={err('phone')}><input type="tel" className={inputClass} style={inputStyle(err('phone'))} value={t.phone} onChange={e => setT(i, { phone: e.target.value })} /></Field>
                        <div className="sm:col-span-2">
                          <Field label="Passport / ID Number" required error={err('passport')}><input className={inputClass} style={inputStyle(err('passport'))} value={t.passport} onChange={e => setT(i, { passport: e.target.value })} /></Field>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card title="Contact for the Voucher" step={optional.length ? 3 : 2}>
              <button type="button" className="text-xs font-700 mb-4 hover:underline" style={{ color: '#F47C20' }}
                onClick={() => editContact({ name: `${travelers[0].firstName} ${travelers[0].lastName}`.trim(), email: travelers[0].email, phone: travelers[0].phone })}>
                Same as Traveler 1
              </button>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" required error={errors['contact.name']}><input className={inputClass} style={inputStyle(errors['contact.name'])} value={contact.name} onChange={e => editContact({ name: e.target.value })} autoComplete="name" /></Field>
                <Field label="Email" required error={errors['contact.email']}><input type="email" className={inputClass} style={inputStyle(errors['contact.email'])} value={contact.email} onChange={e => editContact({ email: e.target.value })} autoComplete="email" /></Field>
                <Field label="Phone" required error={errors['contact.phone']}><input type="tel" className={inputClass} style={inputStyle(errors['contact.phone'])} value={contact.phone} onChange={e => editContact({ phone: e.target.value })} autoComplete="tel" /></Field>
                <Field label="Comments"><input className={inputClass} style={inputStyle()} value={contact.comment} onChange={e => editContact({ comment: e.target.value })} /></Field>
              </div>
            </Card>

            <Card title="Payment" step={optional.length ? 4 : 3}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Card Type" required error={errors['payment.cardType']}>
                  <select className={inputClass} style={inputStyle(errors['payment.cardType'])} value={payment.cardType} onChange={e => editPayment({ cardType: e.target.value })}>
                    <option value="">Select card</option>
                    {catalogs?.cards.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </Field>
                <Field label="Card Number" required error={errors['payment.cardNumber']}>
                  <input inputMode="numeric" autoComplete="cc-number" className={inputClass} style={inputStyle(errors['payment.cardNumber'])} value={payment.cardNumber}
                    onChange={e => editPayment({ cardNumber: e.target.value.replace(/[^\d ]/g, '').slice(0, 23) })} placeholder="1234 5678 9012 3456" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Name on Card" required error={errors['payment.cardName']}>
                    <input autoComplete="cc-name" className={inputClass} style={inputStyle(errors['payment.cardName'])} value={payment.cardName} onChange={e => editPayment({ cardName: e.target.value })} />
                  </Field>
                </div>
                <Field label="Expiry" required error={errors['payment.expiry']}>
                  <div className="grid grid-cols-2 gap-2">
                    <select autoComplete="cc-exp-month" className={inputClass} style={inputStyle(errors['payment.expiry'])} value={payment.expMonth} onChange={e => editPayment({ expMonth: e.target.value })}>
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => <option key={m} value={m}>{String(m).padStart(2, '0')}</option>)}
                    </select>
                    <select autoComplete="cc-exp-year" className={inputClass} style={inputStyle(errors['payment.expiry'])} value={payment.expYear} onChange={e => editPayment({ expYear: e.target.value })}>
                      <option value="">Year</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </Field>
                <Field label="Security Code (CVV)" required error={errors['payment.cvv']}>
                  <input inputMode="numeric" autoComplete="cc-csc" maxLength={4} className={inputClass} style={inputStyle(errors['payment.cvv'])} value={payment.cvv} onChange={e => editPayment({ cvv: e.target.value.replace(/\D/g, '') })} />
                </Field>
              </div>
              <p className="text-xs text-gray-400 mt-4">🔒 Card details are sent securely to BMI for payment and are never stored by India Network Foundation.</p>
            </Card>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl p-6" style={{ background: '#0D2B45' }}>
              <h3 className="text-white font-800 mb-1" style={font}>Order Summary</h3>
              <p className="text-white/60 text-sm mb-1">{match.plan.name} — {match.coverage.name}</p>
              <p className="text-white/60 text-sm mb-5">{saved.labels.home} → {saved.labels.destination} · {formatDate(saved.trip.fromDate)} – {formatDate(saved.trip.toDate)} ({tripDays(saved.trip)} days)</p>
              {pricingError && <Alert>{pricingError}</Alert>}
              {!pricing && !pricingError && <p className="text-white/60 text-sm">Calculating price…</p>}
              {pricing && (
                <div className="space-y-2 text-sm">
                  {pricing.travelers.map(t => (
                    <div key={t.travelerId} className="flex justify-between gap-3 text-white/80"><span>{t.description}</span><span>{money(t.subTotal)}</span></div>
                  ))}
                  {pricing.discount > 0 && <div className="flex justify-between text-emerald-300"><span>Discount</span><span>−{money(pricing.discount)}</span></div>}
                  <div className="flex justify-between pt-3 mt-2 border-t border-white/10 text-white font-800 text-lg" style={font}>
                    <span>Total</span><span style={{ color: '#F47C20' }}>{money(pricing.total)}</span>
                  </div>
                </div>
              )}
              <div className="mt-5 flex gap-2">
                <input className="flex-1 min-w-0 px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/40 outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  placeholder="Promo code" value={promoInput} onChange={e => setPromoInput(e.target.value)} />
                <button type="button" onClick={applyPromo} disabled={pricingLoading || !promoInput.trim()} className="px-4 rounded-xl text-sm font-700 text-white disabled:opacity-50" style={{ background: 'rgba(255,255,255,0.15)' }}>Apply</button>
              </div>
              {promoMessage && <p className="text-xs mt-2 text-white/70">{promoMessage}</p>}
            </div>
            {submitError && <Alert>{submitError}</Alert>}
            <button type="submit" disabled={submitting || !pricing || pricingLoading} className="w-full py-4 rounded-full text-white font-700 text-base disabled:opacity-60" style={{ background: '#F47C20', ...font }}>
              {submitting ? 'Processing payment…' : pricing ? `Pay ${money(pricing.total)}` : 'Pay'}
            </button>
            {pricingLoading && <Spinner label="Updating price…" />}
            <Link to={`/projects/insurance/plan?planId=${planId}&coverageId=${coverageId}`} className="block text-center text-sm hover:underline" style={{ color: '#0D2B45' }}>View plan benefits</Link>
          </aside>
        </form>
      </section>
    </div>
  )
}
