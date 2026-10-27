import { useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../../hooks/useInView'

function PageHero() {
  return (
    <section className="relative min-h-[420px] flex items-end">
      <img
        src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1800&h=800&fit=crop&auto=format"
        alt="Travel Insurance"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.4) 60%, transparent 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-12 w-full">
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
                <p className="text-sm">Insurance offered by the Foundation is designed specifically to meet the needs of Indians, covering pre-existing conditions and ailments such as urinary tract infections. For full plan details, please contact our office.</p>
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

interface FormData {
  startDate: string
  endDate: string
  dob: string
  destination: string
  homeCountry: string
}

const PLANS = [
  {
    provider: 'TravelGuard Plus',
    plan: 'Explorer Basic',
    slug: 'explorer-basic',
    coverage: 'Up to $50,000',
    benefits: ['Emergency Medical', 'Trip Cancellation', 'Baggage Protection', '24/7 Helpline'],
    premium: '$89',
    popular: false,
  },
  {
    provider: 'SafeTrip India',
    plan: 'India Traveler',
    slug: 'india-traveler',
    coverage: 'Up to $100,000',
    benefits: ['Emergency Medical & Evacuation', 'Trip Cancellation', 'Baggage Loss', 'Adventure Activities'],
    premium: '$149',
    popular: true,
  },
  {
    provider: 'GlobalCover Premium',
    plan: 'Elite Protection',
    slug: 'elite-protection',
    coverage: 'Up to $250,000',
    benefits: ['Full Medical & Evacuation', 'Trip Cancel + Interruption', 'Baggage & Electronics', 'Concierge Service'],
    premium: '$229',
    popular: false,
  },
]

function GetAQuoteSection() {
  const [formData, setFormData] = useState<FormData>({ startDate: '', endDate: '', dob: '', destination: '', homeCountry: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  const inputClass = "w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-colors"
  const inputStyle = { border: '1px solid rgba(13,43,69,0.15)', background: 'white' }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.startDate || !formData.endDate || !formData.dob || !formData.destination || !formData.homeCountry) return
    setSubmittedData({ ...formData })
    setSubmitted(true)
  }

  function handleReset() {
    setSubmitted(false)
    setSubmittedData(null)
    setFormData({ startDate: '', endDate: '', dob: '', destination: '', homeCountry: '' })
  }

  return (
    <section className="py-20" style={{ background: 'white' }}>
      <div className="max-w-3xl mx-auto px-6">
        {!submitted ? (
          <div className="rounded-2xl shadow-xl p-6 md:p-12" style={{ background: 'white', border: '1px solid rgba(13,43,69,0.08)' }}>
            <h2 className="text-3xl font-800 mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Get a Quote</h2>
            <p className="text-gray-500 mb-8 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>Fill in the details below to see personalized travel insurance plans.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-700 mb-1.5" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Start Date <span style={{ color: '#F47C20' }}>*</span></label>
                  <input type="date" required className={inputClass} style={inputStyle} value={formData.startDate} onChange={e => setFormData(p => ({ ...p, startDate: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-700 mb-1.5" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>End Date <span style={{ color: '#F47C20' }}>*</span></label>
                  <input type="date" required className={inputClass} style={inputStyle} value={formData.endDate} onChange={e => setFormData(p => ({ ...p, endDate: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-700 mb-1.5" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Date of Birth <span style={{ color: '#F47C20' }}>*</span></label>
                <input type="date" required className={inputClass} style={inputStyle} value={formData.dob} onChange={e => setFormData(p => ({ ...p, dob: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-700 mb-1.5" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Countries Travelling To <span style={{ color: '#F47C20' }}>*</span></label>
                <select required className={inputClass} style={inputStyle} value={formData.destination} onChange={e => setFormData(p => ({ ...p, destination: e.target.value }))}>
                  <option value="">Select destination</option>
                  {['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'UAE', 'Singapore', 'Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-700 mb-1.5" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Home Country <span style={{ color: '#F47C20' }}>*</span></label>
                <select required className={inputClass} style={inputStyle} value={formData.homeCountry} onChange={e => setFormData(p => ({ ...p, homeCountry: e.target.value }))}>
                  <option value="">Select home country</option>
                  {['USA', 'UK', 'Canada', 'Australia', 'India', 'Germany', 'UAE', 'Singapore', 'Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-full text-white font-700 text-base mt-2"
                style={{ background: '#F47C20', fontFamily: 'Manrope, sans-serif' }}
              >
                Get Quote
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* Summary bar */}
            <div className="rounded-2xl p-5 mb-8 flex flex-wrap gap-6 items-center justify-between" style={{ background: '#0D2B45' }}>
              <div className="flex flex-wrap gap-6 text-sm text-white/80" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <span><span className="text-white/50">Travel Dates:</span> {submittedData!.startDate} — {submittedData!.endDate}</span>
                <span><span className="text-white/50">DOB:</span> {submittedData!.dob}</span>
                <span><span className="text-white/50">Destination:</span> {submittedData!.destination}</span>
                <span><span className="text-white/50">Home:</span> {submittedData!.homeCountry}</span>
              </div>
              <button
                onClick={handleReset}
                className="rounded-full px-5 py-2 text-sm font-700"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'white', fontFamily: 'Manrope, sans-serif' }}
              >
                Modify Search
              </button>
            </div>
            {/* Plans */}
            <h2 className="text-2xl font-800 mb-1" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Available Plans</h2>
            <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>3 plans found for your trip</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {PLANS.map(plan => (
                <div
                  key={plan.plan}
                  className="rounded-2xl p-6 relative flex flex-col"
                  style={{
                    background: 'white',
                    border: plan.popular ? '2px solid #F47C20' : '1px solid rgba(13,43,69,0.1)',
                    boxShadow: plan.popular ? '0 8px 32px rgba(244,124,32,0.12)' : '0 2px 12px rgba(13,43,69,0.06)',
                  }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full text-xs font-700 px-4 py-1" style={{ background: '#F47C20', color: 'white', fontFamily: 'Manrope, sans-serif' }}>
                      Most Popular
                    </div>
                  )}
                  <p className="text-xs font-700 mb-1" style={{ color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>{plan.provider}</p>
                  <h3 className="text-lg font-800 mb-1" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{plan.plan}</h3>
                  <p className="text-sm font-700 mb-4" style={{ color: '#2E8B57', fontFamily: 'Manrope, sans-serif' }}>{plan.coverage}</p>
                  <ul className="space-y-1 mb-6 flex-1">
                    {plan.benefits.map(b => (
                      <li key={b} className="flex items-start gap-2 text-sm text-gray-600" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        <span className="mt-0.5" style={{ color: '#2E8B57' }}>✓</span> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-5">
                    <span className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{plan.premium}</span>
                    <span className="text-sm text-gray-400 ml-1" style={{ fontFamily: 'Manrope, sans-serif' }}>per trip</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to={`/projects/insurance/certificate?plan=${plan.slug}`} className="w-full py-2.5 rounded-full text-sm font-700 text-white text-center" style={{ background: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>Buy This Plan</Link>
                    <Link to={`/projects/insurance/${plan.slug}`} className="w-full py-2.5 rounded-full text-sm font-700 text-center" style={{ border: '2px solid #0D2B45', color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
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
