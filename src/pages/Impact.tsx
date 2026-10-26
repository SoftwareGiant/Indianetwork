import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

function PageHero() {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: 480 }}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1708593343442-7595427ddf7b?w=1800&h=800&fit=crop&auto=format" alt="Community impact" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.55) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.85) 0%, transparent 55%)' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-36 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Impact</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(244,124,32,0.2)', color: '#F47C20', fontWeight: 700 }}>Transparency</span>
        <h1 className="text-white font-800 mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>Our Impact</h1>
        <p className="text-white/70 text-lg max-w-xl leading-relaxed">
          Since 1988, the support of our members has made it possible to rebuild schools, feed families after disasters, bring clean water to villages and help Indian scholars share their research.
        </p>
      </div>
    </section>
  )
}

// ── Overview Counters ─────────────────────────────────────────────────────────
function ImpactOverview() {
  const { ref, inView } = useInView(0.3)
  const years = useCountUp(new Date().getFullYear() - 1988, 1800, inView)
  const members = useCountUp(150000, 2400, inView)
  const families = useCountUp(1000, 1600, inView)
  const raised = useCountUp(100000, 2000, inView)
  const awardees = useCountUp(27, 1400, inView)

  const stats = [
    { value: years, suffix: '', label: 'Years of Service', sub: 'since 1988' },
    { value: members, suffix: '+', label: 'Members', sub: 'and growing', fmt: (n: number) => `${(n / 1000).toFixed(0)}K` },
    { value: families, suffix: '', label: 'Families Fed', sub: 'Orissa cyclone, 1999', fmt: (n: number) => n.toLocaleString() },
    { value: raised, suffix: '+', label: 'Raised for Schools', sub: 'Gujarat earthquake, 2001', fmt: (n: number) => `$${(n / 1000).toFixed(0)}K` },
    { value: awardees, suffix: '', label: 'Travel Grant Awardees', sub: '2006 – 2009' },
  ]

  return (
    <section ref={ref} style={{ backgroundColor: '#0D2B45' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.15)', color: '#F47C20', fontWeight: 700 }}>By the Numbers</span>
          <h2 className="text-white font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Impact at a Glance</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {stats.map((s, i) => (
            <div key={s.label} className="rounded-2xl p-5 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ease ${i * 0.1}s` }}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-800 mb-2 leading-none" style={{ color: '#F47C20', fontWeight: 800 }}>
                {s.fmt ? s.fmt(s.value) : s.value}{s.suffix}
              </div>
              <div className="text-white font-700 text-sm mb-1" style={{ fontWeight: 700 }}>{s.label}</div>
              <div className="text-white/40 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Areas of Impact ───────────────────────────────────────────────────────────
const areas = [
  { icon: '📚', title: 'Education', stat: '$100K+', statLabel: 'raised to rebuild schools', color: '#F47C20', desc: 'Map sets for rural schools, new school houses after the Gujarat earthquake, and school buildings in Andhra Pradesh.' },
  { icon: '🏥', title: 'Health Care', stat: 'All ages', statLabel: 'visitor insurance coverage', color: '#2E8B57', desc: 'Visitor health insurance with pre-existing coverage, and member support for kidney transplants in India.' },
  { icon: '⛑️', title: 'Emergency Relief', stat: '1,000', statLabel: 'families fed in Orissa', color: '#F47C20', desc: 'Direct relief after cyclones, earthquakes, floods and the 2004 Tsunami, in India and the United States.' },
  { icon: '🏘️', title: 'Community Development', stat: '3,000 L', statLabel: 'clean water per plant daily', color: '#2E8B57', desc: 'Mineral water plants, community centers, libraries and hostels for rural villages.' },
  { icon: '🎖️', title: 'Operation Care', stat: '35', statLabel: 'critically wounded soldiers aided', color: '#F47C20', desc: 'Direct help to the families of soldiers who died in the Kargil action, and equipment for army hospitals.' },
  { icon: '🎭', title: 'Cultural Initiatives', stat: '1 month', statLabel: 'insurance per grantee', color: '#2E8B57', desc: 'Grants for Indian community organizations to host artists from India and promote traditional arts.' },
]

function AreasOfImpact() {
  const { ref, inView } = useInView(0.1)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Focus Areas</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Where We Create Change</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((a, i) => (
            <div key={a.title} className="rounded-2xl p-8 group hover:-translate-y-1 transition-all duration-300" style={{ background: 'white', boxShadow: '0 2px 30px rgba(13,43,69,0.07)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.09}s` }}>
              <div className="text-4xl mb-5">{a.icon}</div>
              <div className="text-2xl sm:text-3xl font-800 mb-1" style={{ color: a.color, fontWeight: 800 }}>{a.stat}</div>
              <div className="text-xs font-600 uppercase tracking-wide mb-4" style={{ color: '#9ca3af', fontWeight: 600 }}>{a.statLabel}</div>
              <h3 className="font-700 text-lg mb-2" style={{ color: '#0D2B45', fontWeight: 700 }}>{a.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Timeline ──────────────────────────────────────────────────────────────────
const milestones = [
  { year: '1988', title: 'Foundation Established', desc: 'Dr. K.V. Rao founds the India Network Foundation to serve the Indian community.' },
  { year: '1995', title: 'India Economic Forum', desc: 'The INDIA-E list begins distributing economic news to members interested in India.' },
  { year: '1998', title: 'Maps & Cyclone Relief', desc: 'Map sets donated to schools across India; Gujarat Cyclone Relief Fund launched.' },
  { year: '1999', title: 'Orissa & Kargil', desc: 'Rice for 1,000 Orissa families; Operation Care for soldiers and their families.' },
  { year: '2001', title: 'Gujarat Earthquake', desc: 'Over $100,000 raised to construct new school houses.' },
  { year: '2004', title: 'Tsunami Aid', desc: 'Aid provided after the 2004 Christmas Day Tsunami.' },
  { year: '2006', title: 'Travel Grants', desc: 'First India Network Travel Grants awarded to Indian researchers.' },
  { year: '2017', title: 'Hurricane Harvey & Kerala', desc: 'Time, money and resources for Houston recovery, and aid to Kerala flood victims.' },
]

function Timeline() {
  const { ref, inView } = useInView(0.1)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(13,43,69,0.06)', color: '#0D2B45', fontWeight: 700 }}>History</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Milestones & Achievements</h2>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: 'rgba(13,43,69,0.1)' }} />
          <div className="flex flex-col gap-8 lg:gap-5">
            {milestones.map((m, i) => (
              <div key={m.year} className={`flex flex-col lg:flex-row items-start lg:items-center gap-5 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.08}s` }}>
                <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="inline-block rounded-2xl p-6 w-full" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.06)' }}>
                    <div className="text-sm font-700 mb-1.5" style={{ color: '#F47C20', fontWeight: 700 }}>{m.year}</div>
                    <h4 className="font-700 text-base mb-1.5" style={{ color: '#0D2B45', fontWeight: 700 }}>{m.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full border-4 flex-shrink-0 z-10" style={{ background: '#F47C20', borderColor: 'white' }}>
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Annual Highlights ─────────────────────────────────────────────────────────
const annualHighlights = [
  { year: '2001', image: '/images/inf/gujarat-quake-3.jpg', headline: 'New school houses built after the Gujarat earthquake', stats: '$100,000+ raised · schools rebuilt' },
  { year: '1999', image: '/images/inf/orissa-1.jpg', headline: 'Rice distributed after the Orissa super cyclone', stats: '1,000 families · 10 kg each' },
  { year: '1998', image: '/images/inf/andhra-duvva-1.jpg', headline: 'School building constructed in Duvva, Andhra Pradesh', stats: 'Rs. 50,000 · backward class area' },
]

function AnnualHighlights() {
  const { ref, inView } = useInView(0.15)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Highlights</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Annual Highlights</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {annualHighlights.map((h, i) => (
            <div key={h.year} className="group rounded-2xl overflow-hidden" style={{ background: 'white', boxShadow: '0 2px 20px rgba(13,43,69,0.06)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.12}s` }}>
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <img src={h.image} alt={h.headline} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.7) 0%, transparent 55%)' }} />
                <span className="absolute top-4 left-4 text-2xl font-800 text-white" style={{ fontWeight: 800 }}>{h.year}</span>
              </div>
              <div className="p-6">
                <h4 className="font-700 text-base mb-2" style={{ color: '#0D2B45', fontWeight: 700 }}>{h.headline}</h4>
                <p className="text-sm" style={{ color: '#F47C20', fontWeight: 600 }}>{h.stats}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, #F47C20 0%, #e06010 100%)' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-white font-800 mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Be Part of the Impact</h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">Every number on this page began with a member who chose to act. Your turn.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/donate" className="px-8 py-4 rounded-full text-base font-700 hover:scale-105 transition-all duration-200" style={{ background: '#0D2B45', color: 'white', fontWeight: 700 }}>Donate Now</Link>
          <Link to="/volunteer" className="px-8 py-4 rounded-full text-base font-700 hover:bg-white/20 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Volunteer</Link>
          <Link to="/contact" className="px-8 py-4 rounded-full text-base font-700 hover:bg-white/20 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Partner</Link>
        </div>
      </div>
    </section>
  )
}

export default function ImpactPage() {
  return (
    <>
      <PageHero />
      <ImpactOverview />
      <AreasOfImpact />
      <Timeline />
      <AnnualHighlights />
      <Cta />
    </>
  )
}
