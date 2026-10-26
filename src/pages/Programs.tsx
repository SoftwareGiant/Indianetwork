import { useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

function PageHero() {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: 480 }}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1760454634741-14469ef82f4f?w=1800&h=800&fit=crop&auto=format" alt="Children learning" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.55) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.85) 0%, transparent 55%)' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-36 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Programs</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(244,124,32,0.2)', color: '#F47C20', fontWeight: 700 }}>Our Programs</span>
        <h1 className="text-white font-800 mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>Our Programs</h1>
        <p className="text-white/70 text-lg max-w-xl leading-relaxed">
          Eight core programs built over {new Date().getFullYear() - 1988} years — each one designed to create sustainable, measurable impact in the communities we serve.
        </p>
      </div>
    </section>
  )
}

// ── Program Cards ─────────────────────────────────────────────────────────────
const programs = [
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-7 10 7M5 9.5V20a1 1 0 001 1h4v-4a1 1 0 011-1h2a1 1 0 011 1v4h4a1 1 0 001-1V9.5" /></svg>,
    title: 'Education', tag: 'Core Program', color: '#F47C20', slug: 'education',
    image: 'https://images.unsplash.com/photo-1760454634741-14469ef82f4f?w=600&h=400&fit=crop&auto=format',
    description: 'Classroom map sets for rural schools, rebuilding schools after disasters, and school buildings for villages in Andhra Pradesh.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
    title: 'Healthcare', tag: 'Core Program', color: '#F47C20', slug: 'healthcare',
    image: 'https://images.unsplash.com/photo-1596450514537-fae68a81346b?w=600&h=400&fit=crop&auto=format',
    description: 'Visitor health insurance with pre-existing coverage, plus member support for transplants and medical care in India.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
    title: 'Community Development', tag: 'High Impact', color: '#2E8B57', slug: 'community',
    image: 'https://images.unsplash.com/photo-1708593330411-24d85eff0728?w=600&h=400&fit=crop&auto=format',
    description: "Mineral water plants, community centers, libraries and hostels that strengthen rural villages in India.",
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    title: 'Disaster Relief', tag: 'Emergency', color: '#F47C20', slug: 'disaster-relief',
    image: 'https://images.unsplash.com/photo-1665649998055-bbd272dacad7?w=600&h=400&fit=crop&auto=format',
    description: 'Direct relief after cyclones, earthquakes and floods — from Orissa and Gujarat to Hurricane Harvey and Kerala.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    title: 'Cultural Preservation', tag: 'Heritage', color: '#2E8B57', slug: 'cultural-preservation',
    image: 'https://images.unsplash.com/photo-1587538018365-2a1f8b544c08?w=600&h=400&fit=crop&auto=format',
    description: 'Grants for Indian community organizations to host artists from India and promote traditional arts among youth.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><path d="M1 10h22" /></svg>,
    title: 'Travel Grants', tag: 'Diaspora', color: '#F47C20', slug: 'travel-grants',
    image: 'https://images.unsplash.com/photo-1708593337380-6f97a307696f?w=600&h=400&fit=crop&auto=format',
    description: 'Travel grants for scientists from South Asia presenting at North American conferences, and small seed grants.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M3 21v-1a7 7 0 0114 0v1M21 21v-1a5 5 0 00-3-4.6" /></svg>,
    title: 'Senior Citizen Support', tag: 'Community', color: '#2E8B57', slug: 'senior-support',
    image: 'https://images.unsplash.com/photo-1567122087721-47b09b61e1d1?w=600&h=400&fit=crop&auto=format',
    description: 'Eldercare resources, social connection programs, and health support for senior members of the Indian diaspora community.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
    title: 'Youth Development', tag: 'Future', color: '#F47C20', slug: 'youth-development',
    image: 'https://images.unsplash.com/photo-1764967411778-01b04900447d?w=600&h=400&fit=crop&auto=format',
    description: "Leadership programs, mentorship, and career development for young Indians and Indian-Americans building tomorrow's leaders.",
  },
]

function ProgramCards() {
  const { ref, inView } = useInView(0.1)
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Program Areas</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Eight Core Programs</h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">Funded by members and generous donors who sponsor our non-profit initiatives.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p, i) => (
            <Link key={p.title} to={`/programs/${p.slug}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group rounded-2xl overflow-hidden block"
              style={{ background: 'white', boxShadow: hovered === i ? '0 20px 50px rgba(13,43,69,0.14)' : '0 2px 20px rgba(13,43,69,0.06)', transform: hovered === i ? 'translateY(-6px)' : 'translateY(0)', transition: 'all 0.35s ease', opacity: inView ? 1 : 0, transitionDelay: `${i * 0.06}s` }}>
              <div className="relative overflow-hidden" style={{ height: 170 }}>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.7) 0%, transparent 55%)' }} />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-700 text-white" style={{ background: p.color + 'e6', fontWeight: 700 }}>{p.tag}</span>
              </div>
              <div className="p-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: p.color === '#F47C20' ? 'rgba(244,124,32,0.1)' : 'rgba(46,139,87,0.1)', color: p.color }}>{p.icon}</div>
                <h3 className="font-700 text-base mb-2" style={{ color: '#0D2B45', fontWeight: 700 }}>{p.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{p.description}</p>
                <div className="flex items-center gap-1.5 text-sm font-600" style={{ color: p.color, fontWeight: 600 }}>
                  Learn More
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M4 7h7M8 4l3 3-3 3" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Featured Program ──────────────────────────────────────────────────────────
function FeaturedProgram() {
  const { ref, inView } = useInView(0.2)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontWeight: 700 }}>Flagship</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Featured Program</h2>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0D2B45', boxShadow: '0 8px 60px rgba(13,43,69,0.15)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div className="grid lg:grid-cols-2">
            <div className="relative overflow-hidden" style={{ minHeight: 420 }}>
              <img src="/images/inf/water-plant-1.jpg" alt="Mineral water treatment plant" className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(13,43,69,0.3))' }} />
              <span className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-700 text-white" style={{ background: '#F47C20', fontWeight: 700 }}>Flagship Program · Active</span>
            </div>
            <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
              <span className="text-xs font-700 uppercase tracking-widest mb-3 block" style={{ color: '#F47C20', fontWeight: 700 }}>Community Development · Andhra Pradesh</span>
              <h3 className="text-white font-800 text-2xl mb-5 leading-snug" style={{ fontWeight: 800 }}>Mineral Water Project</h3>
              <p className="text-white/60 text-base leading-relaxed mb-7">India Network Foundation sponsors the construction and maintenance of mineral water plants in rural Andhra Pradesh, teaming up with the state government to bring clean drinking water to villages with no municipal water and prevent the spread of water-borne diseases.</p>
              <div className="grid grid-cols-2 gap-4 mb-7">
                {[
                  { label: 'Objective', val: 'Clean drinking water for rural villages' },
                  { label: 'Output', val: '3,000 liters of clean water per plant daily' },
                  { label: 'Beneficiaries', val: 'Up to 1,500 people per plant' },
                  { label: 'Commitment', val: '10 plants over three years' },
                ].map(item => (
                  <div key={item.label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="text-white/40 text-xs mb-1">{item.label}</div>
                    <div className="text-white text-sm font-600" style={{ fontWeight: 600 }}>{item.val}</div>
                  </div>
                ))}
              </div>
              <Link to="/programs/community" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-600 self-start transition-all duration-200 hover:scale-105" style={{ background: '#F47C20', fontWeight: 600 }}>
                Explore Program Details
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h8M9 4l4 4-4 4" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Program Impact ────────────────────────────────────────────────────────────
function ProgramImpact() {
  const { ref, inView } = useInView(0.3)
  const years = useCountUp(new Date().getFullYear() - 1988, 1600, inView)
  const members = useCountUp(150000, 2200, inView)
  const families = useCountUp(1000, 1800, inView)
  const raised = useCountUp(100000, 2000, inView)

  const stats = [
    { value: years, suffix: '', label: 'Years of Service' },
    { value: members, suffix: '+', label: 'Members', fmt: (n: number) => `${(n / 1000).toFixed(0)}K` },
    { value: families, suffix: '', label: 'Families Fed in Orissa', fmt: (n: number) => n.toLocaleString() },
    { value: raised, suffix: '+', label: 'Raised for Gujarat Schools', fmt: (n: number) => `$${(n / 1000).toFixed(0)}K` },
  ]

  return (
    <section ref={ref} style={{ backgroundColor: '#0D2B45' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.15)', color: '#F47C20', fontWeight: 700 }}>Results</span>
          <h2 className="text-white font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Program Impact</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className="rounded-2xl p-5 sm:p-8 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ease ${i * 0.12}s` }}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-800 mb-2 leading-none" style={{ color: '#F47C20', fontWeight: 800 }}>
                {s.fmt ? s.fmt(s.value) : s.value}{s.suffix}
              </div>
              <div className="text-white font-700 text-base" style={{ fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Success Stories ───────────────────────────────────────────────────────────
const stories = [
  { name: 'Gujarat Earthquake, 2001', quote: 'India Network Foundation raised over $100,000 to rebuild schools in affected areas, and supported ailing communities when government agencies were overburdened.', program: 'Education', image: '/images/inf/gujarat-quake-3.jpg' },
  { name: 'Orissa Cyclone, 1999', quote: 'Many villagers had received only two kg of rice, and only once, after the cyclone. INF distributed 10 kg bags to 1,000 families in remote villages.', program: 'Disaster Relief', image: '/images/inf/orissa-3.jpg' },
  { name: 'Mineral Water Project', quote: 'Each plant produces 3,000 liters of clean water per day — enough for up to 1,500 people in villages without municipal water.', program: 'Community', image: '/images/inf/water-plant-2.jpg' },
]

function SuccessStories() {
  const { ref, inView } = useInView(0.15)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontWeight: 700 }}>Stories</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Stories from the Field</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <div key={s.name} className="rounded-2xl overflow-hidden" style={{ background: 'white', boxShadow: '0 2px 30px rgba(13,43,69,0.07)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.12}s` }}>
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.75) 0%, transparent 55%)' }} />
                <div className="absolute bottom-4 left-4">
                  <div className="text-white font-700 text-sm" style={{ fontWeight: 700 }}>{s.name}</div>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-700 text-white" style={{ background: '#F47C20', fontWeight: 700 }}>{s.program}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed italic">"{s.quote}"</p>
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
        <h2 className="text-white font-800 mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Support a Program</h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">Your donation, your time, or your partnership can keep these programs running and growing.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/donate" className="px-8 py-4 rounded-full text-base font-700 hover:scale-105 transition-all duration-200" style={{ background: '#0D2B45', color: 'white', fontWeight: 700 }}>Donate</Link>
          <Link to="/volunteer" className="px-8 py-4 rounded-full text-base font-700 hover:bg-white/20 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Volunteer</Link>
          <Link to="/contact" className="px-8 py-4 rounded-full text-base font-700 hover:bg-white/20 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Contact Us</Link>
        </div>
      </div>
    </section>
  )
}

export default function ProgramsPage() {
  return (
    <>
      <PageHero />
      <ProgramCards />
      <FeaturedProgram />
      <ProgramImpact />
      <SuccessStories />
      <Cta />
    </>
  )
}
