import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

// ── Page Hero ─────────────────────────────────────────────────────────────────
function PageHero() {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: 480 }}>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1708593330411-24d85eff0728?w=1800&h=800&fit=crop&auto=format"
          alt="Community members gathered together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,43,69,0.9) 0%, rgba(13,43,69,0.6) 60%, rgba(13,43,69,0.3) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.8) 0%, transparent 60%)' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-36 w-full">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">About</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(244,124,32,0.2)', color: '#F47C20', fontWeight: 700 }}>About Us</span>
        <h1 className="text-white font-800 mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
          About India Network Foundation
        </h1>
        <p className="text-white/70 text-lg max-w-xl leading-relaxed">
          Serving the Indian community since 1988 through non-profit projects, disaster relief, health care for Indian travelers and travel grants.
        </p>
      </div>
    </section>
  )
}

// ── Our Story ─────────────────────────────────────────────────────────────────
function OurStory() {
  const { ref, inView } = useInView(0.2)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease' }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-6" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Our Story</span>
            <h2 className="font-800 mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0D2B45' }}>
              From Humble Beginnings to 150,000 Members
            </h2>
            <div className="flex flex-col gap-4 text-gray-600 text-base leading-relaxed">
              <p>
                Dr. K.V. Rao founded the India Network Foundation in 1988. Throughout the years, he has strived to serve the Indian community. From humble beginnings, the India Network Foundation now boasts over 150,000 current members.
              </p>
              <p>
                Through the support of the Indian community, India Network Foundation has volunteered countless hours toward serving those less fortunate and in need — distributing maps to rural schools, building mineral water plants, rebuilding schools after the Gujarat earthquake and delivering relief after cyclones in Orissa and Andhra Pradesh.
              </p>
              <p>
                Dr. Rao remains committed to propagating the mission of the India Network Foundation through non-profit projects and support to the Indian community at large.
              </p>
            </div>
          </div>
          <div
            className="relative rounded-2xl overflow-hidden h-[320px] sm:h-[400px] lg:h-[480px]"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(30px)', transition: 'all 0.8s ease 0.15s' }}
          >
            <img
              src="/images/inf/nonprofit.jpg"
              alt="School benches donated by India Network Foundation"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.85), transparent)' }}>
              <div className="text-white font-700 text-base" style={{ fontWeight: 700 }}>Donated by India Network Foundation</div>
              <div className="text-white/60 text-sm">School benches for a government school in India</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Mission & Vision ──────────────────────────────────────────────────────────
function MissionVision() {
  const { ref, inView } = useInView(0.2)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(13,43,69,0.06)', color: '#0D2B45', fontWeight: 700 }}>Purpose</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Mission & Vision</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: (
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22V12M12 12L8 16M12 12l4 4M20 22c0-4.4-3.6-8-8-8S4 17.6 4 22M12 2a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ),
              label: 'Our Mission',
              color: '#F47C20',
              bg: 'rgba(244,124,32,0.08)',
              title: 'Helping the Indian Community',
              body: 'To serve the Indian community through on-going non-profit initiatives, disaster relief when such events arise, health care programs for Indian visitors to the United States and Canada, and travel grants for cultural events and academics.',
            },
            {
              icon: (
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              ),
              label: 'Our Vision',
              color: '#2E8B57',
              bg: 'rgba(46,139,87,0.08)',
              title: 'Direct Help That Reaches Real People',
              body: "We believe immediate and direct assistance to beneficiaries is the best way to reach the real people. With a Project Director in India, we make sure every project is carried out according to the donor's wishes.",
            },
          ].map(card => (
            <div
              key={card.label}
              className="rounded-2xl p-6 sm:p-10"
              style={{
                background: 'white',
                boxShadow: '0 4px 40px rgba(13,43,69,0.08)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s ease',
              }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: card.bg, color: card.color }}>
                {card.icon}
              </div>
              <span className="text-xs font-700 uppercase tracking-widest mb-3 block" style={{ color: card.color, fontWeight: 700 }}>{card.label}</span>
              <h3 className="font-700 text-xl mb-4 leading-snug" style={{ color: '#0D2B45', fontWeight: 700 }}>{card.title}</h3>
              <p className="text-gray-500 text-base leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Core Values ───────────────────────────────────────────────────────────────
const values = [
  { title: 'Integrity', icon: '⚖️', desc: 'Donors choose the projects they fund, and our Project Director in India reports back on exactly what has been done.' },
  { title: 'Compassion', icon: '❤️', desc: 'Our work is rooted in genuine care for people — not just programs. We listen, learn, and act with the communities we serve.' },
  { title: 'Community', icon: '🤝', desc: 'We believe in the power of collective belonging. No one should feel disconnected from their heritage or their people.' },
  { title: 'Transparency', icon: '🔍', desc: 'Contributions are tax-exempt in the US, and every gift over $250 receives an acknowledgment letter for IRS records.' },
  { title: 'Inclusion', icon: '🌍', desc: 'We support government schools and communities across India — from Gujarat and Orissa to Andhra Pradesh and Karnataka.' },
  { title: 'Sustainability', icon: '🌱', desc: 'We build programs designed to last. Short-term aid is only the beginning; lasting change is the goal.' },
]

function CoreValues() {
  const { ref, inView } = useInView(0.1)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#0D2B45' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.15)', color: '#F47C20', fontWeight: 700 }}>What We Stand For</span>
          <h2 className="text-white font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl p-7 group cursor-default transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.08}s`,
              }}
            >
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="text-white font-700 text-lg mb-3" style={{ fontWeight: 700 }}>{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Timeline ──────────────────────────────────────────────────────────────────
const milestones = [
  { year: '1988', title: 'Foundation Established', desc: 'Dr. K.V. Rao founds the India Network Foundation to serve the Indian community in the United States and India.' },
  { year: '1995', title: 'India Economic Forum', desc: 'Dr. Rao launches the INDIA-E list to share economic news with members interested in developments in India.' },
  { year: '1998', title: 'Map Sets & Gujarat Cyclone Relief', desc: 'The Map Set Donation Project brings classroom wall maps to schools across India, and INF launches the Gujarat Cyclone Relief Fund.' },
  { year: '1999', title: 'Orissa Cyclone & Operation Care', desc: 'Rice for 1,000 families after the Orissa super cyclone, and direct relief to the families of soldiers in the Kargil action.' },
  { year: '2000', title: 'Census Advisory Committee', desc: 'U.S. Commerce Secretary Norman Mineta invites Dr. K.V. Rao to serve on the Census Advisory Committee on the Asian Population.' },
  { year: '2001', title: 'Gujarat Earthquake Relief', desc: 'INF raises over $100,000 to construct new school houses in areas devastated by the Republic Day earthquake.' },
  { year: '2006', title: 'Travel Grants Program', desc: 'The first India Network Travel Grants help Indian researchers present their work at conferences in the United States.' },
  { year: '2017', title: 'Hurricane Harvey & Kerala Floods', desc: 'INF donates time, money and resources to recovery in Houston, and later provides aid to Kerala flood victims.' },
]

function AboutTimeline() {
  const { ref, inView } = useInView(0.1)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Our Journey</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>{new Date().getFullYear() - 1988} Years of Service</h2>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: 'rgba(13,43,69,0.1)' }} />
          <div className="flex flex-col gap-10 lg:gap-6">
            {milestones.map((m, i) => (
              <div key={m.year} className={`flex flex-col lg:flex-row items-start lg:items-center gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.09}s` }}>
                <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="inline-block rounded-2xl p-6 w-full" style={{ background: 'white', boxShadow: '0 2px 20px rgba(13,43,69,0.06)', border: '1px solid rgba(13,43,69,0.05)' }}>
                    <div className="text-sm font-700 mb-2" style={{ color: '#F47C20', fontWeight: 700 }}>{m.year}</div>
                    <h4 className="font-700 text-lg mb-2" style={{ color: '#0D2B45', fontWeight: 700 }}>{m.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border-4 flex-shrink-0 z-10" style={{ background: '#F47C20', borderColor: '#FFF9F3' }}>
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

// ── Leadership ────────────────────────────────────────────────────────────────
function Leadership() {
  const { ref, inView } = useInView(0.1)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontWeight: 700 }}>Our Founder</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Dr. K.V. Rao</h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">Founder and Honorary President of the India Network Foundation</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease' }}>
            {['/images/inf/founder-2.jpg', '/images/inf/founder-1.jpg'].map(src => (
              <div key={src} className="rounded-2xl overflow-hidden h-48 sm:h-72" style={{ border: '1px solid rgba(13,43,69,0.06)' }}>
                <img src={src} alt="Dr. K.V. Rao with the India Network Foundation" className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 text-gray-600 text-base leading-relaxed" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease 0.1s' }}>
            <p>
              Dr. K.V. Rao founded the India Network Foundation in 1988 and has served as its President and Honorary President. He is well known in the Asian Indian community for his efforts to help community projects in India, and for his professional contributions to applied and business demography.
            </p>
            <p>
              A former Notestein Fellow at the Office of Population Research, Princeton University, Dr. Rao has authored several research articles and books, served as President of South Asian Sociologists and on the Executive Council of the Canadian Population Society.
            </p>
            <p>
              In 2000, U.S. Secretary of Commerce Norman Y. Mineta invited Dr. Rao to serve on the Census Advisory Committee on the Asian Population, where he worked to increase census participation of minority populations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Impact Snapshot ───────────────────────────────────────────────────────────
function ImpactSnapshot() {
  const { ref, inView } = useInView(0.3)
  const years = useCountUp(new Date().getFullYear() - 1988, 1800, inView)
  const members = useCountUp(150, 1600, inView)
  const families = useCountUp(1000, 1800, inView)
  const raised = useCountUp(100, 2000, inView)

  const stats = [
    { value: years, prefix: '', suffix: '', label: 'Years of Service' },
    { value: members, prefix: '', suffix: 'K+', label: 'Members' },
    { value: families, prefix: '', suffix: '', label: 'Families Fed in Orissa' },
    { value: raised, prefix: '$', suffix: 'K+', label: 'Raised for Gujarat Schools' },
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Impact Snapshot</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>The Numbers Behind Our Work</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className="rounded-2xl p-5 sm:p-8 text-center" style={{ background: 'white', boxShadow: '0 2px 30px rgba(13,43,69,0.07)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ease ${i * 0.12}s` }}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-800 mb-2 leading-none" style={{ color: '#F47C20', fontWeight: 800 }}>{s.prefix}{s.value}{s.suffix}</div>
              <div className="text-gray-700 font-700 text-base" style={{ color: '#0D2B45', fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Partners ──────────────────────────────────────────────────────────────────
const partners = ['Govt. of Andhra Pradesh', 'Govt. of Orissa', 'Sri Ramakrishna Mission', 'Population Foundation of India', 'Asha MIT', 'India Network Health Insurance']

function Partners() {
  const { ref, inView } = useInView(0.3)
  return (
    <section ref={ref} className="py-16" style={{ backgroundColor: 'white', borderTop: '1px solid rgba(13,43,69,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-center text-xs font-600 uppercase tracking-widest mb-8" style={{ color: '#9ca3af', fontWeight: 600 }}>Organizations we have worked with</p>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {partners.map((p, i) => (
            <div key={p} className="text-xl font-800 cursor-pointer transition-all duration-300" style={{ color: '#0D2B45', opacity: inView ? 0.25 : 0, fontWeight: 800, letterSpacing: '-0.02em', transition: `all 0.5s ease ${i * 0.06}s` }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => (e.currentTarget.style.opacity = inView ? '0.25' : '0')}>
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function Cta() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, #F47C20 0%, #e06010 100%)' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-white font-800 mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Join Our Mission</h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">Become part of a story that began in 1988. Your contribution — in any form — matters.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/donate" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:scale-105 hover:shadow-2xl" style={{ background: '#0D2B45', color: 'white', fontWeight: 700 }}>Donate Now</Link>
          <Link to="/contact" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Become a Volunteer</Link>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <PageHero />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <AboutTimeline />
      <Leadership />
      <ImpactSnapshot />
      <Partners />
      <Cta />
    </>
  )
}
