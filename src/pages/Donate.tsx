import { useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'
import { InputField, DonorFields, validateDonorInfo, type DonorInfo, type DonorErrors } from '../components/DonorFields'

// ── Page Hero ─────────────────────────────────────────────────────────────────
function PageHero() {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: 380 }}>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1764967411778-01b04900447d?w=1800&h=700&fit=crop&auto=format"
          alt="Children in a community setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.6) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.85) 0%, transparent 60%)' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-14 pt-36 lg:pt-44 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Donate</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(244,124,32,0.2)', color: '#F47C20', fontWeight: 700 }}>Make a Difference</span>
        <h1 className="text-white font-800 mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
          Every Contribution Creates Real Change
        </h1>
        <p className="text-white/70 text-lg max-w-xl leading-relaxed">
          All contributions made to the India Network Foundation are tax-exempt in the United States and eligible for matching grants from your employer.
        </p>
      </div>
    </section>
  )
}

// ── Why Donate ────────────────────────────────────────────────────────────────
function WhyDonate() {
  const { ref, inView } = useInView(0.2)
  const pillars = [
    { icon: '✅', title: 'Tax-Exempt Giving', desc: 'Contributions are tax-exempt in the US. Gifts over $250 receive an acknowledgment letter.' },
    { icon: '🏢', title: 'Matching Grants', desc: 'INF is eligible to receive matching grants from the corporate world.' },
    { icon: '⚡', title: 'Direct Impact', desc: 'We deliver aid directly to beneficiaries, with a Project Director in India.' },
    { icon: '🎯', title: 'Donor-Directed Projects', desc: 'Choose a specific project in India and receive a report on what was done.' },
  ]
  return (
    <section ref={ref} className="py-16 lg:py-20" style={{ backgroundColor: 'white', borderBottom: '1px solid rgba(13,43,69,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex items-start gap-4" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.1}s` }}>
              <div className="text-2xl flex-shrink-0 mt-1">{p.icon}</div>
              <div>
                <div className="font-700 text-sm mb-1" style={{ color: '#0D2B45', fontWeight: 700 }}>{p.title}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Donation Form ─────────────────────────────────────────────────────────────
const donationAmounts = [
  { usd: '$20', impact: 'One laminated map set (World, India & State) for a rural school' },
  { usd: '$50', impact: 'Helps INF deliver direct relief to families after a disaster' },
  { usd: '$100', impact: 'Contributes to a mineral water plant for a rural village' },
  { usd: '$250', impact: 'Helps sponsor a school or community project in India' },
  { usd: '$500', impact: 'Supports school building repairs in Andhra Pradesh' },
  { usd: '$2,500', impact: 'Helps toward building a mineral water plant (construction costs about Rs. 2 Lakhs)' },
]

function DonationForm() {
  const [selected, setSelected] = useState(1)
  const [custom, setCustom] = useState('')
  const [donor, setDonor] = useState<DonorInfo>({ name: '', mobile: '', email: '' })
  const [errors, setErrors] = useState<DonorErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof DonorInfo, value: string) => {
    setDonor(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleDonate = () => {
    const e = validateDonorInfo(donor)
    setErrors(e)
    if (Object.keys(e).length === 0) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl p-6 sm:p-10 text-center" style={{ background: '#0D2B45', boxShadow: '0 20px 60px rgba(13,43,69,0.2)' }}>
        <div className="text-5xl mb-4">🙏</div>
        <h3 className="text-white font-800 text-2xl mb-3" style={{ fontWeight: 800 }}>
          Thank You, {donor.name.split(' ')[0]}!
        </h3>
        <p className="text-white/60 text-base leading-relaxed mb-6">
          Your donation of{' '}
          {selected >= 0 ? donationAmounts[selected]?.usd : `$${custom}`}{' '}
          has been received. A confirmation will be sent to{' '}
          <span style={{ color: '#F47C20' }}>{donor.email}</span>.
        </p>
        <button
          onClick={() => { setSubmitted(false); setDonor({ name: '', mobile: '', email: '' }) }}
          className="px-6 py-3 rounded-full text-white text-sm font-600 transition-all duration-200 hover:opacity-90"
          style={{ background: '#F47C20', fontWeight: 600 }}
        >
          Make Another Donation
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#0D2B45', boxShadow: '0 20px 60px rgba(13,43,69,0.2)' }}>
      {/* Step 1: Amount */}
      <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="text-white font-700 text-base flex items-center gap-2 mb-5" style={{ fontWeight: 700 }}>
          <span className="w-6 h-6 rounded-full text-xs font-700 flex items-center justify-center text-white flex-shrink-0" style={{ background: '#F47C20', fontWeight: 700 }}>1</span>
          Choose an Amount (USD)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {donationAmounts.map((d, i) => (
            <button key={d.usd} onClick={() => { setSelected(i); setCustom('') }}
              className="py-3 rounded-xl font-700 text-base transition-all duration-200 hover:scale-105"
              style={{ fontWeight: 700, background: selected === i && !custom ? '#F47C20' : 'rgba(255,255,255,0.08)', color: selected === i && !custom ? 'white' : 'rgba(255,255,255,0.7)', border: selected === i && !custom ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
              {d.usd}
            </button>
          ))}
        </div>

        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-600 text-white/50" style={{ fontWeight: 600 }}>$</span>
          <input type="number" placeholder="Custom amount" value={custom}
            onChange={e => { setCustom(e.target.value); setSelected(-1) }}
            className="w-full pl-8 pr-4 py-3.5 rounded-xl text-white placeholder-white/30 text-sm font-500 outline-none transition-all duration-200"
            style={{ fontWeight: 500, background: 'rgba(255,255,255,0.08)', border: custom ? '1px solid #F47C20' : '1px solid rgba(255,255,255,0.1)' }} />
        </div>

        {selected >= 0 && !custom && (
          <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: 'rgba(244,124,32,0.12)', border: '1px solid rgba(244,124,32,0.2)' }}>
            <span style={{ color: '#F47C20' }}>Your impact: </span>
            <span className="text-white/70">{donationAmounts[selected].impact}</span>
          </div>
        )}
      </div>

      {/* Step 2: Donor info (shared component) */}
      <div className="px-8">
        <DonorFields info={donor} errors={errors} onChange={handleChange} />
      </div>

      {/* Step 3: Payment */}
      <div className="px-8 py-6">
        <h4 className="text-white font-700 text-base mb-5 flex items-center gap-2" style={{ fontWeight: 700 }}>
          <span className="w-6 h-6 rounded-full text-xs font-700 flex items-center justify-center flex-shrink-0 text-white" style={{ background: '#F47C20', fontWeight: 700 }}>3</span>
          Payment
        </h4>
        <button onClick={handleDonate}
          className="w-full py-4 rounded-xl font-700 text-white text-base transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          style={{ background: '#F47C20', fontWeight: 700 }}>
          Donate Securely →
        </button>
        <div className="flex items-center justify-center gap-4 mt-4">
          {['🔒 SSL Secured', '🇺🇸 Tax-Exempt in US', '🏢 Matching Gifts'].map(t => (
            <span key={t} className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Impact Table ──────────────────────────────────────────────────────────────
function ImpactTable() {
  const { ref, inView } = useInView(0.2)
  const rows = [
    { usd: '$20', impact: 'One laminated map set (World, India & State) for a rural school' },
    { usd: '$50', impact: 'Helps INF deliver direct relief to families after a disaster' },
    { usd: '$100', impact: 'Contributes to a mineral water plant for a rural village' },
    { usd: '$250', impact: 'Helps sponsor a school or community project in India' },
    { usd: '$500', impact: 'Supports school building repairs in Andhra Pradesh' },
    { usd: '$2,500', impact: 'About the cost of building one mineral water plant (Rs. 2 Lakhs)' },
  ]
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-6" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontWeight: 700 }}>Where Your Money Goes</span>
            <h2 className="font-800 mb-5" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0D2B45' }}>The Impact of Your Gift</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">When you direct your gift to a specific project in India, our Project Director oversees it and reports back. India Network Foundation retains ten percent to meet administrative, accounting and record-keeping costs required for IRS filing.</p>
            <div className="flex flex-col gap-3">
              {[
                { pct: '90%', label: 'Your Chosen Project in India', color: '#F47C20' },
                { pct: '10%', label: 'Administration, Accounting & IRS Filing', color: '#0D2B45' },
              ].map(b => (
                <div key={b.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-500" style={{ color: '#0D2B45', fontWeight: 500 }}>{b.label}</span>
                    <span className="text-sm font-700" style={{ color: b.color, fontWeight: 700 }}>{b.pct}</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ background: 'rgba(13,43,69,0.08)' }}>
                    <div className="h-2 rounded-full" style={{ width: b.pct, background: b.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.15s' }}>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
              <div className="px-5 py-3 grid grid-cols-2 gap-4 text-xs font-700 uppercase tracking-wider" style={{ background: '#0D2B45', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
                <span>Amount (USD)</span><span>Impact</span>
              </div>
              {rows.map((r, i) => (
                <div key={r.usd} className="px-5 py-4 grid grid-cols-2 gap-4 items-center transition-colors duration-200 hover:bg-white" style={{ background: i % 2 === 0 ? '#FFF9F3' : 'white', borderBottom: '1px solid rgba(13,43,69,0.05)' }}>
                  <span className="font-700 text-sm" style={{ color: '#F47C20', fontWeight: 700 }}>{r.usd}</span>
                  <span className="text-gray-500 text-xs leading-snug">{r.impact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DonatePage() {
  const { ref, inView } = useInView(0.1)

  return (
    <>
      <PageHero />
      <WhyDonate />

      {/* Main donation section */}
      <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left info */}
            <div
              className="lg:col-span-2"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-6" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Donate</span>
              <h2 className="font-800 mb-5" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0D2B45' }}>Make a Secure Donation</h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">Choose an amount and complete your donor details. You may also tell us which project you would like your gift to support.</p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { num: '1', label: 'Choose your donation amount', desc: 'Select from preset amounts or enter a custom gift.' },
                  { num: '2', label: 'Enter your details', desc: 'We need your name, mobile, and email for your receipt.' },
                  { num: '3', label: 'Complete payment', desc: 'Secure SSL-encrypted checkout. Takes under 60 seconds.' },
                ].map(s => (
                  <div key={s.num} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-700 flex-shrink-0 text-white" style={{ background: '#F47C20', fontWeight: 700 }}>{s.num}</div>
                    <div>
                      <div className="font-700 text-sm mb-0.5" style={{ color: '#0D2B45', fontWeight: 700 }}>{s.label}</div>
                      <div className="text-gray-500 text-sm">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-5" style={{ background: 'rgba(46,139,87,0.06)', border: '1px solid rgba(46,139,87,0.15)' }}>
                <div className="font-700 text-sm mb-1" style={{ color: '#2E8B57', fontWeight: 700 }}>Need help?</div>
                <div className="text-gray-500 text-sm leading-relaxed">Call us at <a href="tel:+14085403600" className="underline" style={{ color: '#0D2B45' }}>408-540-3600</a> or email <a href="mailto:info@indianetwork.org" className="underline" style={{ color: '#0D2B45' }}>info@indianetwork.org</a>. You can also mail a check payable to India Network Foundation to 7065 Westpointe Blvd, Suite 208, Orlando, FL 32835.</div>
              </div>
            </div>

            {/* Right: form */}
            <div
              className="lg:col-span-3"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.15s' }}
            >
              <DonationForm />
            </div>
          </div>
        </div>
      </section>

      <ImpactTable />

      {/* Final CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #F47C20 0%, #e06010 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-white font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800 }}>Other Ways to Give</h2>
          <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl mx-auto">Donations aren't the only way to make a difference. Volunteering, corporate partnerships, and in-kind contributions are equally valued.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:scale-105" style={{ background: '#0D2B45', color: 'white', fontWeight: 700 }}>Volunteer</Link>
            <Link to="/contact" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Partner With Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
