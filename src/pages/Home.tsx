import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { DonorFields, validateDonorInfo, type DonorInfo, type DonorErrors } from '../components/DonorFields'

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  const stats = [
    { value: '150K+', label: 'Community Members' },
    { value: '1988', label: 'Year Founded' },
    { value: '$100K+', label: 'Raised for Gujarat Schools' },
    { value: 'USA & India', label: 'Where We Serve' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1800&h=1100&fit=crop&auto=format"
          alt="Community volunteers working together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,43,69,0.85) 0%, rgba(13,43,69,0.5) 60%, rgba(0,0,0,0.3) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.9) 0%, transparent 50%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 lg:pt-40 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-600"
              style={{ background: 'rgba(244,124,32,0.2)', border: '1px solid rgba(244,124,32,0.4)', color: '#F47C20', fontWeight: 600, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.6s ease 0.1s' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#F47C20' }} />
              Established 1988 · Serving the Indian Community
            </div>

            <h1
              className="text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.2s' }}
            >
              Empowering <span style={{ color: '#F47C20' }}>Communities.</span><br />
              Connecting Indians.<br />
              Creating Lasting <span style={{ color: '#F47C20' }}>Impact.</span>
            </h1>

            <p
              className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl"
              style={{ fontWeight: 400, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s ease 0.35s' }}
            >
              Founded by Dr. K.V. Rao in 1988, India Network Foundation supports non-profit projects, disaster relief, health care for Indian travelers and travel grants across India and the United States.
            </p>

            <div className="flex flex-wrap gap-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s ease 0.45s' }}>
              <Link to="/donate" className="px-8 py-4 rounded-full text-white font-700 text-base transition-all duration-200 hover:scale-105 hover:shadow-2xl" style={{ background: '#F47C20', fontWeight: 700 }}>
                Donate Now
              </Link>
              <Link to="/about" className="px-8 py-4 rounded-full text-white font-600 text-base transition-all duration-200 hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 600 }}>
                Learn About Us
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.8s ease 0.5s' }}>
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="text-2xl sm:text-3xl font-800 mb-1" style={{ color: '#F47C20', fontWeight: 800 }}>{s.value}</div>
                <div className="text-white/70 text-sm font-500" style={{ fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1.2s' }}>
          <span className="text-white/40 text-xs uppercase tracking-widest font-500" style={{ fontWeight: 500 }}>Scroll</span>
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }} />
        </div>
      </div>
    </section>
  )
}

// ── Impact Preview ────────────────────────────────────────────────────────────
function ImpactSection() {
  const { ref, inView } = useInView(0.3)
  const members = useCountUp(150000, 2200, inView)
  const years = useCountUp(new Date().getFullYear() - 1988, 1600, inView)
  const families = useCountUp(1000, 1800, inView)
  const raised = useCountUp(100000, 2000, inView)
  const fmt = (n: number) => n >= 10000 ? `${(n / 1000).toFixed(0)}K` : n.toLocaleString()

  const stats = [
    { value: members, prefix: '', suffix: '+', label: 'Community Members', sub: 'and growing' },
    { value: years, prefix: '', suffix: '', label: 'Years of Service', sub: 'since 1988' },
    { value: families, prefix: '', suffix: '', label: 'Families Fed', sub: 'after the Orissa cyclone' },
    { value: raised, prefix: '$', suffix: '+', label: 'Raised for Schools', sub: 'after the Gujarat earthquake' },
  ]

  return (
    <section id="impact" ref={ref} style={{ backgroundColor: '#0D2B45' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.15)', color: '#F47C20', fontWeight: 700 }}>Our Impact</span>
          <h2 className="text-white font-800 mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Decades of Real Change</h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">Every number represents a life changed, a family supported, a future opened.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((s, i) => (
            <div key={s.label} className="rounded-2xl p-5 sm:p-8 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ease ${i * 0.12}s` }}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-800 mb-2 leading-none" style={{ color: '#F47C20', fontWeight: 800 }}>{s.prefix}{fmt(s.value)}{s.suffix}</div>
              <div className="text-white font-700 text-base mb-1" style={{ fontWeight: 700 }}>{s.label}</div>
              <div className="text-white/40 text-sm">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/impact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-600 transition-all duration-200 hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600 }}>
            Explore Full Impact Report
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h8M9 4l4 4-4 4" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Programs Preview (3 cards) ────────────────────────────────────────────────
const featuredPrograms = [
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-7 10 7M5 9.5V20a1 1 0 001 1h4v-4a1 1 0 011-1h2a1 1 0 011 1v4h4a1 1 0 001-1V9.5" /></svg>,
    title: 'Education',
    description: 'Map sets for rural schools, rebuilding classrooms after disasters, and travel grants for Indian academics.',
    image: 'https://images.unsplash.com/photo-1760454634741-14469ef82f4f?w=600&h=400&fit=crop&auto=format',
    tag: 'Core Program',
    slug: 'education',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
    title: 'Health Care',
    description: 'Visitor health insurance with pre-existing coverage for families travelling to the United States and Canada.',
    image: 'https://images.unsplash.com/photo-1596450514537-fae68a81346b?w=600&h=400&fit=crop&auto=format',
    tag: 'Core Program',
    slug: 'healthcare',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
    title: 'Community Development',
    description: 'Mineral water plants, community centers and member-sponsored projects for rural villages in India.',
    image: 'https://images.unsplash.com/photo-1708593330411-24d85eff0728?w=600&h=400&fit=crop&auto=format',
    tag: 'Community',
    slug: 'community',
  },
]

function ProgramsSection() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="programs" ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Programs</span>
            <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Areas of Service</h2>
            <p className="text-gray-500 text-lg mt-2 max-w-md leading-relaxed">Non-profit initiatives funded by members and generous donors.</p>
          </div>
          <Link to="/programs" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-600 transition-all duration-200 hover:scale-105 self-start lg:self-end" style={{ background: '#0D2B45', color: 'white', fontWeight: 600 }}>
            View All Programs
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h8M9 4l4 4-4 4" /></svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredPrograms.map((p, i) => (
            <Link key={p.title} to={`/programs/${p.slug}`}
              className="group rounded-2xl overflow-hidden block"
              style={{ background: 'white', boxShadow: '0 2px 20px rgba(13,43,69,0.06)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.1}s` }}>
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.7) 0%, transparent 60%)' }} />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-700 text-white" style={{ background: 'rgba(244,124,32,0.9)', fontWeight: 700 }}>{p.tag}</span>
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20' }}>{p.icon}</div>
                <h3 className="font-700 text-xl mb-3" style={{ color: '#0D2B45', fontWeight: 700 }}>{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{p.description}</p>
                <div className="flex items-center gap-2 text-sm font-600 group-hover:gap-3 transition-all duration-200" style={{ color: '#F47C20', fontWeight: 600 }}>
                  Learn More
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M5 8h8M9 4l4 4-4 4" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Current Projects ──────────────────────────────────────────────────────────
const currentProjects = [
  {
    title: 'Health Insurance for Visitors',
    category: 'Member Services',
    description: 'India Network Health Insurance provides visitor medical coverage, including pre-existing conditions, for parents, relatives and students travelling to the US.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&auto=format',
    status: 'Active',
    slug: 'travel-insurance',
  },
  {
    title: 'Student Scholarship at NYU',
    category: 'Education',
    description: 'Supporting deserving students interested in studying at New York University through dedicated scholarship funding and mentorship opportunities.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop&auto=format',
    status: 'Active',
    slug: 'nyu-scholarship',
  },
  {
    title: 'Travel Grants to Academics in India',
    category: 'Academic',
    description: 'Helping India-based faculty and doctoral students present peer-reviewed papers at conferences in the United States.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&auto=format',
    status: 'Active',
    slug: 'academic-travel-grants',
  },
]

function CurrentProjectsSection() {
  const { ref, inView } = useInView(0.1)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontWeight: 700 }}>Projects</span>
            <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Current Projects</h2>
            <p className="text-gray-500 text-lg mt-2 max-w-md leading-relaxed">On-going initiatives supported by our members and donors.</p>
          </div>
          <Link to="/projects/inf-projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-600 transition-all duration-200 hover:scale-105 self-start lg:self-end" style={{ background: '#0D2B45', color: 'white', fontWeight: 600 }}>
            View All Projects
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h8M9 4l4 4-4 4" /></svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {currentProjects.map((p, i) => (
            <Link key={p.title} to={`/projects/${p.slug}`}
              className="group rounded-2xl overflow-hidden block hover:-translate-y-1 transition-all duration-300"
              style={{ boxShadow: '0 2px 20px rgba(13,43,69,0.06)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${i * 0.1}s`, transitionProperty: 'all', transitionDuration: '0.6s' }}>
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.6) 0%, transparent 60%)' }} />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-700 text-white" style={{ background: 'rgba(46,139,87,0.9)', fontWeight: 700 }}>{p.category}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-700 text-white flex items-center gap-1" style={{ background: 'rgba(13,43,69,0.85)', fontWeight: 700 }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {p.status}
                  </span>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-700 text-lg mb-3 leading-snug" style={{ color: '#0D2B45', fontWeight: 700 }}>{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{p.description}</p>
                <div className="flex items-center gap-2 text-sm font-600" style={{ color: '#F47C20', fontWeight: 600 }}>
                  View Project
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

// ── Volunteer CTA ─────────────────────────────────────────────────────────────
function VolunteerSection() {
  const { ref, inView } = useInView(0.2)
  const steps = [
    { num: '01', title: 'Register', desc: 'Sign up as a volunteer and tell us about your skills and availability.' },
    { num: '02', title: 'Choose Program', desc: 'Browse available programs and initiatives that match your passion.' },
    { num: '03', title: 'Volunteer', desc: 'Join our team on the ground or remotely from anywhere in the world.' },
    { num: '04', title: 'Create Impact', desc: 'Experience the real difference your contribution makes in communities.' },
  ]
  return (
    <section id="volunteer" ref={ref} style={{ backgroundColor: '#0D2B45' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[420px] lg:h-[500px]" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease' }}>
            <img src="https://images.unsplash.com/flagged/photo-1577604981316-298e453a19dd?w=800&h=1000&fit=crop&auto=format" alt="Volunteers working together" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.9), transparent)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-700" style={{ background: '#F47C20' }}>★</div>
                <div>
                  <div className="text-white font-600 text-sm" style={{ fontWeight: 600 }}>Volunteer with INF</div>
                  <div className="text-white/50 text-xs">in the United States and India</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(30px)', transition: 'all 0.8s ease 0.15s' }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-6" style={{ background: 'rgba(244,124,32,0.15)', color: '#F47C20', fontWeight: 700 }}>Volunteer</span>
            <h2 className="text-white font-800 mb-5" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800 }}>Your Skills Can Change Lives</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">Whether you're a doctor, engineer, teacher, or simply someone who cares — there is a role for you in our mission.</p>
            <div className="flex flex-col gap-6 mb-10">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-start gap-5" style={{ opacity: inView ? 1 : 0, transition: `opacity 0.6s ease ${0.3 + i * 0.1}s` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-800 flex-shrink-0 text-white" style={{ background: '#F47C20', fontWeight: 800 }}>{s.num}</div>
                  <div>
                    <div className="text-white font-700 mb-1" style={{ fontWeight: 700 }}>{s.title}</div>
                    <div className="text-white/50 text-sm leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/volunteer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-700 text-base transition-all duration-200 hover:scale-105" style={{ background: '#F47C20', fontWeight: 700 }}>
              Become a Volunteer
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9h10M11 5l4 4-4 4" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── News Preview ──────────────────────────────────────────────────────────────
const news = [
  { tag: 'News', title: 'Indian-American Congressman Champions H-1B Visa Holders in New Bill', date: 'October 11, 2018', image: 'https://images.unsplash.com/photo-1665649998055-bbd272dacad7?w=500&h=350&fit=crop&auto=format' },
  { tag: 'Event', title: 'India Network Travel Grants Program — 2009 Awardees Announced', date: '2009', image: '/images/inf/conference.jpg' },
  { tag: 'Report', title: 'Dr. K.V. Rao Invited to Serve on the U.S. Census Advisory Committee', date: 'September 5, 2000', image: 'https://images.unsplash.com/photo-1708593343442-7595427ddf7b?w=500&h=350&fit=crop&auto=format' },
]

function NewsSection() {
  const { ref, inView } = useInView(0.15)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(13,43,69,0.06)', color: '#0D2B45', fontWeight: 700 }}>News & Events</span>
            <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Latest Updates</h2>
          </div>
          <Link to="/news" className="text-sm font-600 flex items-center gap-2" style={{ color: '#F47C20', fontWeight: 600 }}>
            View All News & Events
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h8M9 4l4 4-4 4" /></svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((n, i) => (
            <Link to="/news" key={n.title} className="group rounded-2xl overflow-hidden block" style={{ background: 'white', boxShadow: '0 2px 20px rgba(13,43,69,0.06)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.1}s` }}>
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <img src={n.image} alt={n.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-700 text-white" style={{ background: n.tag === 'Event' ? '#F47C20' : n.tag === 'News' ? '#2E8B57' : '#0D2B45', fontWeight: 700 }}>{n.tag}</span>
              </div>
              <div className="p-6">
                <div className="text-xs mb-3" style={{ color: '#9ca3af' }}>{n.date}</div>
                <h4 className="font-700 text-base leading-snug mb-4" style={{ color: '#0D2B45', fontWeight: 700 }}>{n.title}</h4>
                <div className="flex items-center gap-2 text-sm font-600" style={{ color: '#F47C20', fontWeight: 600 }}>
                  Read More
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

// ── Donation CTA ──────────────────────────────────────────────────────────────
const donationAmounts = [
  { usd: '$20', impact: 'One laminated map set (World, India & State) for a rural school' },
  { usd: '$50', impact: 'Helps INF deliver direct relief to families after a disaster' },
  { usd: '$100', impact: 'Contributes to a mineral water plant for a rural village' },
  { usd: '$250', impact: 'Helps sponsor a school or community project in India' },
]

function DonationSection() {
  const [selected, setSelected] = useState(1)
  const [custom, setCustom] = useState('')
  const [donor, setDonor] = useState<DonorInfo>({ name: '', mobile: '', email: '' })
  const [errors, setErrors] = useState<DonorErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const { ref, inView } = useInView(0.2)

  const handleChange = (field: keyof DonorInfo, value: string) => {
    setDonor(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleDonate = () => {
    const e = validateDonorInfo(donor)
    setErrors(e)
    if (Object.keys(e).length === 0) setSubmitted(true)
  }

  return (
    <section id="donate" ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-6" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontWeight: 700 }}>Donate</span>
            <h2 className="font-800 mb-5" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0D2B45' }}>Every Contribution Creates Real Change</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">All contributions to India Network Foundation are tax-exempt in the United States and eligible for employer matching gifts. Gifts over $250 receive an acknowledgment letter for your records.</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {donationAmounts.map(d => (
                <div key={d.usd} className="rounded-xl p-4" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.06)' }}>
                  <div className="font-800 text-xl mb-1" style={{ color: '#F47C20', fontWeight: 800 }}>{d.usd}</div>
                  <div className="text-gray-500 text-xs leading-snug">{d.impact}</div>
                </div>
              ))}
            </div>
            <Link to="/donate" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-600 transition-all duration-200 hover:scale-105" style={{ background: '#0D2B45', fontWeight: 600 }}>
              Go to Donation Page →
            </Link>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#0D2B45', boxShadow: '0 20px 60px rgba(13,43,69,0.2)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.15s' }}
          >
            {submitted ? (
              <div className="p-6 sm:p-10 text-center">
                <div className="text-5xl mb-4">🙏</div>
                <h3 className="text-white font-800 text-xl mb-3" style={{ fontWeight: 800 }}>Thank You, {donor.name.split(' ')[0]}!</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">A confirmation will be sent to <span style={{ color: '#F47C20' }}>{donor.email}</span>.</p>
                <button onClick={() => { setSubmitted(false); setDonor({ name: '', mobile: '', email: '' }) }}
                  className="px-6 py-3 rounded-full text-white text-sm font-600 hover:opacity-90"
                  style={{ background: '#F47C20', fontWeight: 600 }}>
                  Give Again
                </button>
              </div>
            ) : (
              <>
                <div className="p-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="text-white font-700 text-base flex items-center gap-2 mb-5" style={{ fontWeight: 700 }}>
                    <span className="w-6 h-6 rounded-full text-xs font-700 flex items-center justify-center text-white" style={{ background: '#F47C20', fontWeight: 700 }}>1</span>
                    Choose an Amount
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {donationAmounts.map((d, i) => (
                      <button key={d.usd} onClick={() => { setSelected(i); setCustom('') }} className="py-3.5 rounded-xl font-700 text-lg transition-all duration-200 hover:scale-105"
                        style={{ fontWeight: 700, background: selected === i && !custom ? '#F47C20' : 'rgba(255,255,255,0.08)', color: selected === i && !custom ? 'white' : 'rgba(255,255,255,0.7)', border: selected === i && !custom ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                        {d.usd}
                      </button>
                    ))}
                  </div>
                  <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-600 text-white/50" style={{ fontWeight: 600 }}>$</span>
                    <input type="number" placeholder="Custom amount" value={custom} onChange={e => { setCustom(e.target.value); setSelected(-1) }}
                      className="w-full pl-8 pr-4 py-3.5 rounded-xl text-white placeholder-white/30 text-base font-500 outline-none"
                      style={{ fontWeight: 500, background: 'rgba(255,255,255,0.08)', border: custom ? '1px solid #F47C20' : '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                  {selected >= 0 && !custom && (
                    <div className="rounded-xl p-4 text-sm text-white/70 leading-relaxed" style={{ background: 'rgba(244,124,32,0.12)', border: '1px solid rgba(244,124,32,0.2)' }}>
                      <span style={{ color: '#F47C20' }}>Your impact: </span>{donationAmounts[selected].impact}
                    </div>
                  )}
                </div>
                <div className="px-8">
                  <DonorFields info={donor} errors={errors} onChange={handleChange} />
                </div>
                <div className="px-8 py-6">
                  <h4 className="text-white font-700 text-base mb-5 flex items-center gap-2" style={{ fontWeight: 700 }}>
                    <span className="w-6 h-6 rounded-full text-xs font-700 flex items-center justify-center text-white" style={{ background: '#F47C20', fontWeight: 700 }}>3</span>
                    Payment
                  </h4>
                  <button onClick={handleDonate}
                    className="w-full py-4 rounded-xl font-700 text-white text-base transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
                    style={{ background: '#F47C20', fontWeight: 700 }}>
                    Donate Securely →
                  </button>
                  <p className="text-white/30 text-xs text-center mt-4">Secured by SSL · Contributions are tax-exempt in the United States</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CTA Strip ─────────────────────────────────────────────────────────────────
function CtaStrip() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, #F47C20 0%, #e06010 100%)' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-white font-800 mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Ready to Make a Difference?</h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">Whether you donate, volunteer, or simply spread the word — every action creates a ripple of change.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/donate" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:scale-105 hover:shadow-2xl" style={{ background: '#0D2B45', color: 'white', fontWeight: 700 }}>Donate Now</Link>
          <Link to="/contact" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Get in Touch</Link>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactSection />
      <ProgramsSection />
      <CurrentProjectsSection />
      <VolunteerSection />
      <NewsSection />
      <DonationSection />
      <CtaStrip />
    </>
  )
}
