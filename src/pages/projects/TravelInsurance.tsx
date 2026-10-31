import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../../hooks/useInView'
import { Field, Alert, Spinner, inputClass, inputStyle } from '../../components/insurance/Field'
import {
  getCatalogs, getQuote, saveQuote, loadQuote, clearQuote, money, formatDate, tripDays,
  type Catalogs, type Trip, type TravelerInput, type SavedQuote, type ApiError,
} from '../../lib/insurance'

function PageHero() {
  return (
    <section className="relative min-h-[420px] flex items-end">
      <img
        src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1800&h=800&fit=crop&auto=format"
        alt="Travel Insurance"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.4) 60%, transparent 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 lg:pt-40 pb-12 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/projects/inf-projects" className="hover:text-white">Projects</Link>
          <span>/</span>
          <span className="text-white">Travel Insurance</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Travel Insurance</h1>
        <p className="text-white/80 text-lg max-w-xl">India Network Health Insurance — visitor medical insurance for parents, relatives, students and temporary workers travelling to the United States and Canada.</p>
      </div>
    </section>
  )
}

function AboutProgram() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} style={{ background: '#FFF9F3' }} className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=500&fit=crop&auto=format"
              alt="About Program"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="inline-block rounded-full text-xs font-700 px-4 py-1.5 mb-4" style={{ background: '#F47C20', color: 'white', fontFamily: 'Manrope, sans-serif' }}>About the Program</span>
            <h2 className="text-3xl font-800 mb-6" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Grown Out of Need from the Community</h2>
            <div className="space-y-5 text-gray-600" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <div>
                <h3 className="font-700 mb-1" style={{ color: '#0D2B45' }}>What the Program Provides</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Visitor medical insurance for travel to the United States and Canada</li>
                  <li>Coverage for full pre-existing conditions</li>
                  <li>Plans for all age groups</li>
                  <li>Short-term plans from 5 days to 1 year, covering any sickness or accident</li>
                </ul>
              </div>
              <div>
                <h3 className="font-700 mb-1" style={{ color: '#0D2B45' }}>Who Can Apply</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Visiting parents and relatives of India Network Foundation members</li>
                  <li>Students and temporary workers</li>
                  <li>H-1B workers and green card applicants needing gap coverage</li>
                </ul>
              </div>
              <div>
                <h3 className="font-700 mb-1" style={{ color: '#0D2B45' }}>Coverage Details</h3>
                <p className="text-sm">Insurance offered by the Foundation is designed specifically to meet the needs of Indians, covering pre-existing conditions and ailments such as urinary tract infections. Get a quote below to compare live plans and benefits from BMI Travel Assistance.</p>
              </div>
              <div>
                <h3 className="font-700 mb-1" style={{ color: '#0D2B45' }}>Why India Network Health Insurance</h3>
                <p className="text-sm">India Network Health Insurance (KV Rao Insurance) is sponsored by the Foundation, and also funds our travel grants — every grant recipient receives one month of medical travel insurance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const today = () => new Date().toISOString().slice(0, 10)
const emptyTraveler = (): TravelerInput => ({ dateOfBirth: '', genderId: '' })
const emptyTrip = (): Trip => ({ departureId: '', destinationId: '', fromDate: '', toDate: '', travelers: [emptyTraveler()] })

function GetAQuoteSection() {
  const saved = loadQuote()
  const [catalogs, setCatalogs] = useState<Catalogs | null>(null)
  const [catalogError, setCatalogError] = useState('')
  const [trip, setTrip] = useState<Trip>(saved?.trip ?? emptyTrip())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SavedQuote | null>(saved)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getCatalogs().then(setCatalogs).catch(e => setCatalogError(e.message))
  }, [])

  // Editing a field clears its error message
  const clearErrors = (keys: string[]) => setErrors(e => {
    if (!keys.some(k => k in e)) return e
    const next = { ...e }
    keys.forEach(k => delete next[k])
    return next
  })
  const set = (patch: Partial<Trip>) => {
    setTrip(t => ({ ...t, ...patch }))
    clearErrors(Object.keys(patch))
  }
  const setTraveler = (i: number, patch: Partial<TravelerInput>) => {
    setTrip(t => ({ ...t, travelers: t.travelers.map((tr, j) => (j === i ? { ...tr, ...patch } : tr)) }))
    clearErrors(Object.keys(patch).map(k => `travelers.${i}.${k}`))
  }

  function validate(): Record<string, string> {
    const e: Record<string, string> = {}
    if (!trip.departureId) e.departureId = 'Select your home country.'
    if (!trip.destinationId) e.destinationId = 'Select your destination.'
    if (!trip.fromDate) e.fromDate = 'Enter a start date.'
    else if (trip.fromDate < today()) e.fromDate = 'The start date cannot be in the past.'
    if (!trip.toDate) e.toDate = 'Enter an end date.'
    else if (trip.fromDate && trip.toDate < trip.fromDate) e.toDate = 'The end date must be after the start date.'
    trip.travelers.forEach((t, i) => {
      if (!t.dateOfBirth || t.dateOfBirth >= today()) e[`travelers.${i}.dateOfBirth`] = 'Enter a valid date of birth.'
      if (!t.genderId) e[`travelers.${i}.genderId`] = 'Select a gender.'
    })
    return e
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    setFormError('')
    if (Object.keys(e).length) return
    setLoading(true)
    try {
      const quote = await getQuote(trip)
      const labels = {
        home: catalogs?.countries.find(c => String(c.id) === trip.departureId)?.name ?? '',
        destination: catalogs?.destinations.find(d => String(d.id) === trip.destinationId)?.name ?? '',
      }
      saveQuote({ trip, quote, labels })
      setResult({ trip, quote, labels, savedAt: Date.now() })
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    } catch (err) {
      const apiErr = err as ApiError
      setFormError(apiErr.message)
      if (apiErr.fields) setErrors(apiErr.fields)
    } finally {
      setLoading(false)
    }
  }

  function handleModify() {
    clearQuote()
    setResult(null)
  }

  const labelStyle = { color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }

  return (
    <section id="quote" className="py-20" style={{ background: 'white', scrollMarginTop: 72 }}>
      <div className={`${result ? 'max-w-6xl' : 'max-w-3xl'} mx-auto px-6`}>
        {!result ? (
          <div className="rounded-2xl shadow-xl p-6 md:p-12" style={{ background: 'white', border: '1px solid rgba(13,43,69,0.08)' }}>
            <h2 className="text-3xl font-800 mb-2" style={labelStyle}>Get a Quote</h2>
            <p className="text-gray-500 mb-8 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>Tell us about the trip and the travelers to see live plans and prices from BMI Travel Assistance.</p>

            {catalogError && <div className="mb-6"><Alert>{catalogError}</Alert></div>}
            {!catalogs && !catalogError ? <Spinner label="Loading countries and destinations…" /> : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Home Country" required error={errors.departureId} hint="The country the travelers are coming from">
                    <select className={inputClass} style={inputStyle(errors.departureId)} value={trip.departureId} onChange={e => set({ departureId: e.target.value })}>
                      <option value="">Select home country</option>
                      {catalogs?.countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Travelling To" required error={errors.destinationId} hint="Destination region">
                    <select className={inputClass} style={inputStyle(errors.destinationId)} value={trip.destinationId} onChange={e => set({ destinationId: e.target.value })}>
                      <option value="">Select destination</option>
                      {catalogs?.destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Start Date" required error={errors.fromDate}>
                    <input type="date" min={today()} className={inputClass} style={inputStyle(errors.fromDate)} value={trip.fromDate} onChange={e => set({ fromDate: e.target.value })} />
                  </Field>
                  <Field label="End Date" required error={errors.toDate}>
                    <input type="date" min={trip.fromDate || today()} className={inputClass} style={inputStyle(errors.toDate)} value={trip.toDate} onChange={e => set({ toDate: e.target.value })} />
                  </Field>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-800 text-base" style={labelStyle}>Travelers</h3>
                    <span className="text-xs text-gray-400">{trip.travelers.length} of 10</span>
                  </div>
                  <div className="space-y-4">
                    {trip.travelers.map((t, i) => (
                      <div key={i} className="rounded-2xl p-4 sm:p-5" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.06)' }}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-700" style={labelStyle}>Traveler {i + 1}</span>
                          {trip.travelers.length > 1 && (
                            <button type="button" onClick={() => set({ travelers: trip.travelers.filter((_, j) => j !== i) })}
                              className="text-xs font-700 hover:underline" style={{ color: '#dc2626' }}>
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Date of Birth" required error={errors[`travelers.${i}.dateOfBirth`]}>
                            <input type="date" max={today()} className={inputClass} style={inputStyle(errors[`travelers.${i}.dateOfBirth`])} value={t.dateOfBirth} onChange={e => setTraveler(i, { dateOfBirth: e.target.value })} />
                          </Field>
                          <Field label="Gender" required error={errors[`travelers.${i}.genderId`]}>
                            <select className={inputClass} style={inputStyle(errors[`travelers.${i}.genderId`])} value={t.genderId} onChange={e => setTraveler(i, { genderId: e.target.value })}>
                              <option value="">Select gender</option>
                              {catalogs?.genders.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                  {trip.travelers.length < 10 && (
                    <button type="button" onClick={() => set({ travelers: [...trip.travelers, emptyTraveler()] })}
                      className="mt-4 w-full py-3 rounded-xl text-sm font-700 transition-colors hover:bg-orange-50"
                      style={{ border: '2px dashed rgba(244,124,32,0.5)', color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>
                      + Add another traveler
                    </button>
                  )}
                </div>

                {formError && <Alert>{formError}</Alert>}
                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-full text-white font-700 text-base mt-2 transition-opacity disabled:opacity-60"
                  style={{ background: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>
                  {loading ? 'Finding plans…' : 'Get Quote'}
                </button>
              </form>
            )}
          </div>
        ) : (
          <div ref={resultsRef} style={{ scrollMarginTop: 90 }}>
            <QuoteResults saved={result} onModify={handleModify} />
          </div>
        )}
      </div>
    </section>
  )
}

function QuoteResults({ saved, onModify }: { saved: SavedQuote; onModify: () => void }) {
  const { trip, quote, labels } = saved
  const n = trip.travelers.length
  const count = quote.plans.reduce((s, p) => s + p.coverages.length, 0)
  const font = { fontFamily: 'Manrope, sans-serif' }

  return (
    <div>
      <div className="rounded-2xl p-5 mb-10 flex flex-wrap gap-4 items-center justify-between" style={{ background: '#0D2B45' }}>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80" style={font}>
          <span><span className="text-white/50">From:</span> {labels.home}</span>
          <span><span className="text-white/50">To:</span> {labels.destination}</span>
          <span><span className="text-white/50">Dates:</span> {formatDate(trip.fromDate)} – {formatDate(trip.toDate)} ({tripDays(trip)} days)</span>
          <span><span className="text-white/50">Travelers:</span> {n}</span>
        </div>
        <button onClick={onModify} className="rounded-full px-5 py-2 text-sm font-700" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', ...font }}>
          Modify Search
        </button>
      </div>

      <h2 className="text-2xl font-800 mb-1" style={{ color: '#0D2B45', ...font }}>Available Plans</h2>
      <p className="text-gray-500 text-sm mb-10" style={font}>
        {count} options found. Prices are the total for {n === 1 ? '1 traveler' : `all ${n} travelers`} and include all mandatory coverage.
      </p>

      <div className="space-y-14">
        {quote.plans.map(plan => {
          const cheapest = Math.min(...plan.coverages.map(c => c.price))
          return (
            <div key={plan.planId}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-xl font-800" style={{ color: '#0D2B45', ...font }}>{plan.name}</h3>
                  {plan.longDescription && <p className="text-sm text-gray-500 mt-1 max-w-3xl leading-relaxed">{plan.longDescription}</p>}
                </div>
                {plan.brochure && (
                  <a href={plan.brochure} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-700 hover:underline" style={{ color: '#F47C20' }}>
                    Download brochure (PDF) →
                  </a>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {plan.coverages.map(c => {
                  const best = c.price === cheapest
                  const params = `planId=${plan.planId}&coverageId=${c.coverageId}`
                  return (
                    <div key={c.coverageId} className="rounded-2xl p-5 flex flex-col relative"
                      style={{ background: 'white', border: best ? '2px solid #F47C20' : '1px solid rgba(13,43,69,0.1)', boxShadow: '0 2px 12px rgba(13,43,69,0.06)' }}>
                      {best && (
                        <span className="absolute -top-3 left-5 rounded-full text-xs font-700 px-3 py-0.5 text-white" style={{ background: '#F47C20' }}>Lowest price</span>
                      )}
                      <p className="text-xs font-700 mb-1" style={{ color: '#F47C20', ...font }}>BMI Travel Assistance</p>
                      <h4 className="text-lg font-800 mb-4" style={{ color: '#0D2B45', ...font }}>{c.name}</h4>
                      <div className="mb-5 mt-auto">
                        <span className="text-2xl font-800" style={{ color: '#0D2B45', ...font }}>{money(c.price)}</span>
                        <span className="block text-xs text-gray-400 mt-0.5">total{n > 1 ? ` · ${money(c.price / n)} per traveler` : ''}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link to={`/projects/insurance/checkout?${params}`} className="w-full py-2.5 rounded-full text-sm font-700 text-white text-center" style={{ background: '#F47C20', ...font }}>Buy This Plan</Link>
                        <Link to={`/projects/insurance/plan?${params}`} className="w-full py-2.5 rounded-full text-sm font-700 text-center" style={{ border: '2px solid #0D2B45', color: '#0D2B45', ...font }}>View Benefits</Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function TravelInsurancePage() {
  return (
    <div>
      <PageHero />
      <AboutProgram />
      <GetAQuoteSection />
    </div>
  )
}
