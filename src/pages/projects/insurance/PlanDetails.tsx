import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { PageHero } from '../../../components/PageHero'
import { Field, Alert, Spinner, inputClass, inputStyle } from '../../../components/insurance/Field'
import { getBenefits, emailQuote, loadQuote, findCoverage, money, formatDate, tripDays, type Benefits, type ApiError } from '../../../lib/insurance'

const font = { fontFamily: 'Manrope, sans-serif' }

function EmailQuote({ planId, coverageId }: { planId: number; coverageId: number }) {
  const saved = loadQuote()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')
  if (!saved) return null

  async function send(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Enter a valid email address.')
    setState('sending')
    try {
      await emailQuote(saved!.trip, { reference: saved!.quote.reference, planId, coverageId }, email.trim())
      setState('sent')
    } catch (err) {
      setError((err as ApiError).message)
      setState('idle')
    }
  }

  return (
    <div className="rounded-2xl p-6" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.06)' }}>
      <h3 className="font-800 mb-1" style={{ color: '#0D2B45', ...font }}>Email this quote</h3>
      <p className="text-sm text-gray-500 mb-4">BMI will send the quote and plan details to your inbox.</p>
      {state === 'sent' ? (
        <Alert tone="success">Quote sent to {email}. Please check your inbox.</Alert>
      ) : (
        <form onSubmit={send} noValidate className="space-y-3">
          <Field label="Email address" error={error}>
            <input type="email" className={inputClass} style={inputStyle(error)} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </Field>
          <button type="submit" disabled={state === 'sending'} className="w-full py-3 rounded-full text-sm font-700 disabled:opacity-60" style={{ border: '2px solid #0D2B45', color: '#0D2B45', ...font }}>
            {state === 'sending' ? 'Sending…' : 'Send Quote'}
          </button>
        </form>
      )}
    </div>
  )
}

export default function PlanDetailsPage() {
  const [params] = useSearchParams()
  const planId = Number(params.get('planId'))
  const coverageId = Number(params.get('coverageId'))
  const saved = loadQuote()
  const match = findCoverage(saved, planId, coverageId)
  const [benefits, setBenefits] = useState<Benefits | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!planId || !coverageId) return setError('This plan link is incomplete. Please get a new quote.')
    getBenefits(planId, coverageId).then(setBenefits).catch(e => setError(e.message))
  }, [planId, coverageId])

  const title = match ? `${match.plan.name} — ${match.coverage.name}` : benefits ? `${benefits.planName} — ${benefits.coverageName}` : 'Plan Benefits'
  const n = saved?.trip.travelers.length ?? 0

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&h=700&fit=crop&auto=format"
        title={title}
        intro="BMI Travel Assistance — benefits and limits for this coverage."
        crumbs={[{ label: 'Travel Insurance', to: '/projects/travel-insurance' }, { label: 'Plan Benefits' }]}
      />
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            {match?.plan.longDescription && <p className="text-gray-600 leading-relaxed mb-8">{match.plan.longDescription}</p>}
            <h2 className="text-2xl font-800 mb-5" style={{ color: '#0D2B45', ...font }}>Benefits</h2>
            {error && <Alert>{error}</Alert>}
            {!benefits && !error && <Spinner label="Loading benefits…" />}
            {benefits && (
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
                <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 text-xs font-700 uppercase tracking-wider" style={{ background: '#0D2B45', color: 'rgba(255,255,255,0.6)' }}>
                  <span>Benefit</span><span>Limit</span>
                </div>
                {benefits.benefits.map((b, i) => (
                  <div key={b.id} className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 text-sm items-center" style={{ background: i % 2 ? 'white' : '#FFF9F3' }}>
                    <span style={{ color: '#0D2B45' }}>{b.name}</span>
                    <span className="font-700 text-right" style={{ color: b.value === 'N/A' ? '#9ca3af' : '#2E8B57' }}>{b.value}</span>
                  </div>
                ))}
              </div>
            )}
            {match?.plan.brochure && (
              <a href={match.plan.brochure} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-sm font-700 hover:underline" style={{ color: '#F47C20' }}>
                Download the full brochure with terms and conditions (PDF) →
              </a>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl p-6" style={{ background: '#0D2B45' }}>
              {match && saved ? (
                <>
                  <p className="text-white/60 text-sm mb-1">Total for {n === 1 ? '1 traveler' : `${n} travelers`}</p>
                  <p className="text-4xl font-800 mb-4" style={{ color: '#F47C20', ...font }}>{money(match.coverage.price)}</p>
                  <div className="space-y-1 text-sm text-white/70 mb-6">
                    <p>{saved.labels.home} → {saved.labels.destination}</p>
                    <p>{formatDate(saved.trip.fromDate)} – {formatDate(saved.trip.toDate)} ({tripDays(saved.trip)} days)</p>
                  </div>
                  <Link to={`/projects/insurance/checkout?planId=${planId}&coverageId=${coverageId}`} className="block w-full py-3.5 rounded-full text-white text-center font-700" style={{ background: '#F47C20', ...font }}>
                    Buy This Plan
                  </Link>
                  <Link to="/projects/travel-insurance#quote" className="block text-center text-sm text-white/60 hover:text-white mt-4">← Back to all plans</Link>
                </>
              ) : (
                <>
                  <p className="text-white font-700 mb-2" style={font}>See your price</p>
                  <p className="text-white/60 text-sm mb-5">Prices depend on the trip dates and the travelers' ages. Get a quote to buy this plan.</p>
                  <Link to="/projects/travel-insurance#quote" className="block w-full py-3.5 rounded-full text-white text-center font-700" style={{ background: '#F47C20', ...font }}>Get a Quote</Link>
                </>
              )}
            </div>
            {match && <EmailQuote planId={planId} coverageId={coverageId} />}
          </aside>
        </div>
      </section>
    </div>
  )
}
