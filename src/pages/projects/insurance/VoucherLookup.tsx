import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { PageHero } from '../../../components/PageHero'
import { Field, Alert, inputClass, inputStyle } from '../../../components/insurance/Field'
import { findVoucher, money, formatDate, tripDays, type VoucherDetails, type ApiError } from '../../../lib/insurance'

// Customers find their travel insurance voucher ("Find Voucher" button in the navigation)
// with the voucher code plus the email used at checkout.

const font = { fontFamily: 'Manrope, sans-serif' }

// Is the coverage in force today? Shown as a badge with the relevant date.
function coverageStatus(v: VoucherDetails) {
  const today = new Date().toISOString().slice(0, 10)
  const short = (iso: string) => formatDate(iso).replace(/, \d{4}$/, '')
  if (today < v.trip.fromDate) return { label: `Starts ${short(v.trip.fromDate)}`, bg: 'rgba(244,124,32,0.12)', color: '#c25e0f' }
  if (today > v.trip.toDate) return { label: `Ended ${short(v.trip.toDate)}`, bg: 'rgba(107,114,128,0.12)', color: '#4b5563' }
  return { label: `Active until ${short(v.trip.toDate)}`, bg: 'rgba(46,139,87,0.12)', color: '#2E8B57' }
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-3 border-b border-gray-100 last:border-0 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-600 sm:text-right" style={{ color: '#0D2B45' }}>{children}</span>
    </div>
  )
}

function Result({ v, onReset }: { v: VoucherDetails; onReset: () => void }) {
  const status = coverageStatus(v)
  const days = tripDays({ fromDate: v.trip.fromDate, toDate: v.trip.toDate, departureId: '', destinationId: '', travelers: [] })
  return (
    <div className="rounded-2xl bg-white p-6 md:p-10 shadow-sm" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-700 uppercase tracking-wider mb-1" style={{ color: '#F47C20' }}>Voucher</p>
          <h2 className="text-3xl font-800 tracking-wide" style={{ color: '#0D2B45', ...font }}>{v.voucherCode}</h2>
        </div>
        <span className="text-sm font-700 rounded-full px-3 py-1 whitespace-nowrap" style={{ background: status.bg, color: status.color }} title="Coverage status">{status.label}</span>
      </div>

      <div className="mb-6">
        {v.planName && <Row label="Plan">{v.planName}{v.coverageName ? ` — ${v.coverageName}` : ''}</Row>}
        {(v.trip.homeCountry || v.trip.destination) && <Row label="Trip">{v.trip.homeCountry ?? '—'} → {v.trip.destination ?? '—'}</Row>}
        <Row label="Coverage dates">{formatDate(v.trip.fromDate)} – {formatDate(v.trip.toDate)} ({days} days)</Row>
        <Row label={v.travelers.length === 1 ? 'Traveler' : `Travelers (${v.travelers.length})`}>
          {v.travelers.map((t, i) => <span key={i} className="block">{t.firstName} {t.lastName}</span>)}
        </Row>
        <Row label="Contact">
          <span className="block">{v.contact.name}</span>
          <span className="block font-500 text-gray-500">{v.contact.email} · {v.contact.phone}</span>
        </Row>
        <Row label="Amount paid">{money(v.amountCharged)}</Row>
        <Row label="Purchased">{formatDate(v.purchasedAt.slice(0, 10))}</Row>
        {v.transactionId && <Row label="Transaction ID">{v.transactionId}</Row>}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {v.voucherUrl ? (
          <a href={v.voucherUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center rounded-full px-8 py-3.5 font-700 text-white" style={{ background: '#F47C20', ...font }}>View Voucher</a>
        ) : (
          <p className="flex-1 text-sm text-gray-500 self-center">The voucher document is not available online for this purchase. Please contact us and we will send it to you.</p>
        )}
        <button onClick={onReset} className="rounded-full px-8 py-3.5 font-700" style={{ border: '2px solid #0D2B45', color: '#0D2B45', ...font }}>Find Another</button>
      </div>
      <p className="text-xs text-gray-400 mt-6">
        Need to make a claim or get help during your trip? Use the BMI assistance contacts printed on your voucher. For questions about this purchase, <Link to="/contact" className="underline hover:text-gray-600">contact us</Link>.
      </p>
    </div>
  )
}

export default function VoucherLookupPage() {
  const [params, setParams] = useSearchParams()
  // A link can pre-fill the code: /voucher?code=BMIT…
  const [code, setCode] = useState(params.get('code') ?? '')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [voucher, setVoucher] = useState<VoucherDetails | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!code.trim()) errs.code = 'Enter the voucher code from your confirmation.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Enter the email address used for the purchase.'
    setErrors(errs)
    setError('')
    if (Object.keys(errs).length || busy) return
    setBusy(true)
    try {
      setVoucher(await findVoucher(code.trim(), email.trim()))
    } catch (err) {
      const apiErr = err as ApiError
      setError(apiErr.message)
      if (apiErr.fields) setErrors(apiErr.fields)
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setVoucher(null)
    setCode('')
    setEmail('')
    setParams({}, { replace: true })
  }

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&h=700&fit=crop&auto=format"
        title="Find Your Voucher"
        intro="Look up your BMI Travel Assistance voucher with the voucher code and the email address you used at checkout."
        crumbs={[{ label: 'Travel Insurance', to: '/projects/travel-insurance' }, { label: 'Find Your Voucher' }]}
      />
      <section className="py-16" style={{ background: '#FFF9F3' }}>
        <div className="max-w-2xl mx-auto px-6">
          {voucher ? (
            <Result v={voucher} onReset={reset} />
          ) : (
            <form onSubmit={submit} noValidate className="rounded-2xl bg-white p-6 md:p-10 shadow-sm space-y-5" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
              <Field label="Voucher Code" required error={errors.code} hint="Shown on your purchase confirmation, e.g. BMITX2KO2R">
                <input className={`${inputClass} uppercase tracking-wide`} style={inputStyle(errors.code)} value={code} autoComplete="off" autoFocus={!code}
                  onChange={e => { setCode(e.target.value); setErrors(x => ({ ...x, code: '' })) }} />
              </Field>
              <Field label="Email Address" required error={errors.email} hint="The contact or traveler email entered at checkout">
                <input type="email" className={inputClass} style={inputStyle(errors.email)} value={email} autoComplete="email" autoFocus={!!code}
                  onChange={e => { setEmail(e.target.value); setErrors(x => ({ ...x, email: '' })) }} />
              </Field>
              {error && <Alert>{error}</Alert>}
              <button type="submit" disabled={busy} className="w-full py-4 rounded-full text-white font-700 disabled:opacity-60" style={{ background: '#F47C20', ...font }}>
                {busy ? 'Searching…' : 'Find My Voucher'}
              </button>
              <p className="text-xs text-gray-400 text-center">For your privacy, voucher details are only shown when the code and email match.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
