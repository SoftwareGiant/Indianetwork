import { useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

// ── Page Hero ─────────────────────────────────────────────────────────────────
function PageHero() {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: 480 }}>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1708593343442-7595427ddf7b?w=1800&h=800&fit=crop&auto=format"
          alt="Community working together on a project"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.65) 60%, rgba(13,43,69,0.3) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.85) 0%, transparent 55%)' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-36 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Projects</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(244,124,32,0.2)', color: '#F47C20', fontWeight: 700 }}>Our Work</span>
        <h1 className="text-white font-800 mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
          Projects That Create Real Change
        </h1>
        <p className="text-white/70 text-lg max-w-xl leading-relaxed">
          From rural schools to urban clinics, from disaster zones to cultural stages — each project is a story of community-driven transformation.
        </p>
      </div>
    </section>
  )
}

// ── Categories + Grid ─────────────────────────────────────────────────────────
const categories = ['All', 'Education', 'Healthcare', 'Community Development', 'Disaster Relief', 'Cultural Programs']

const projects = [
  {
    title: 'Digital Classrooms for Rural Bihar',
    category: 'Education',
    location: 'Bihar, India',
    image: 'https://images.unsplash.com/photo-1760454634741-14469ef82f4f?w=600&h=400&fit=crop&auto=format',
    description: 'Equipped 45 government schools with computers, internet access, and trained teachers, reaching 12,000 students who previously had no digital access.',
    status: 'Active',
    year: '2023',
    impact: '12,000 students',
    featured: true,
  },
  {
    title: 'Mobile Health Clinics — Rajasthan',
    category: 'Healthcare',
    location: 'Rajasthan, India',
    image: 'https://images.unsplash.com/photo-1596450514537-fae68a81346b?w=600&h=400&fit=crop&auto=format',
    description: 'Six mobile clinics bring diagnostics, treatment, and maternal health services to 200+ villages with no access to permanent medical facilities.',
    status: 'Active',
    year: '2022',
    impact: '18,000 patients',
    featured: false,
  },
  {
    title: 'Clean Water Initiative — Odisha',
    category: 'Community Development',
    location: 'Odisha, India',
    image: 'https://images.unsplash.com/photo-1768052271115-3a01d2b042b9?w=600&h=400&fit=crop&auto=format',
    description: 'Installed water purification systems and trained local technicians for long-term maintenance in 30 flood-prone villages.',
    status: 'Completed',
    year: '2021',
    impact: '15,000 beneficiaries',
    featured: false,
  },
  {
    title: 'Kerala Flood Relief & Rehabilitation',
    category: 'Disaster Relief',
    location: 'Kerala, India',
    image: 'https://images.unsplash.com/photo-1665649998055-bbd272dacad7?w=600&h=400&fit=crop&auto=format',
    description: 'Emergency relief kits, temporary shelters, and long-term rehabilitation for 3,000 families displaced by the 2018 and 2023 Kerala floods.',
    status: 'Completed',
    year: '2023',
    impact: '3,000 families',
    featured: false,
  },
  {
    title: 'Cultural Heritage Documentation Project',
    category: 'Cultural Programs',
    location: 'Multiple States, India',
    image: 'https://images.unsplash.com/photo-1587538018365-2a1f8b544c08?w=600&h=400&fit=crop&auto=format',
    description: 'Documenting and preserving endangered folk arts, traditional music, and oral histories from 12 Indian states through video archives and community workshops.',
    status: 'Active',
    year: '2024',
    impact: '200+ artforms preserved',
    featured: false,
  },
  {
    title: 'Women\'s Livelihood Program — Tamil Nadu',
    category: 'Community Development',
    location: 'Tamil Nadu, India',
    image: 'https://images.unsplash.com/photo-1708593330411-24d85eff0728?w=600&h=400&fit=crop&auto=format',
    description: 'Vocational training, microfinance access, and cooperative market linkages empowering 800 women entrepreneurs in rural Tamil Nadu.',
    status: 'Active',
    year: '2023',
    impact: '800 women entrepreneurs',
    featured: false,
  },
  {
    title: 'Scholarship Program for First-Generation Students',
    category: 'Education',
    location: 'Pan-India',
    image: 'https://images.unsplash.com/photo-1708593337380-6f97a307696f?w=600&h=400&fit=crop&auto=format',
    description: 'Annual scholarships covering tuition, books, and living expenses for 500 first-generation college students from economically disadvantaged families.',
    status: 'Active',
    year: '2019',
    impact: '3,000+ students funded',
    featured: false,
  },
  {
    title: 'Telemedicine Network — Northeast India',
    category: 'Healthcare',
    location: 'Northeast India',
    image: 'https://images.unsplash.com/photo-1567122087721-47b09b61e1d1?w=600&h=400&fit=crop&auto=format',
    description: 'Connected 50 remote health posts in Assam, Meghalaya, and Manipur with specialist doctors in Guwahati and Kolkata via real-time video consultation.',
    status: 'Active',
    year: '2022',
    impact: '25,000+ consultations',
    featured: false,
  },
]

function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState('All')
  const { ref, inView } = useInView(0.1)

  const featured = projects.find(p => p.featured)!
  const filtered = projects
    .filter(p => !p.featured)
    .filter(p => activeCategory === 'All' || p.category === activeCategory)

  const statusColor = (s: string) => s === 'Active' ? '#2E8B57' : '#0D2B45'

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-14">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2.5 rounded-full text-sm font-600 transition-all duration-200 hover:scale-105"
              style={{
                fontWeight: 600,
                background: activeCategory === cat ? '#0D2B45' : 'white',
                color: activeCategory === cat ? 'white' : '#0D2B45',
                border: '1px solid rgba(13,43,69,0.15)',
                boxShadow: activeCategory === cat ? '0 4px 20px rgba(13,43,69,0.2)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Project */}
        {(activeCategory === 'All' || activeCategory === featured.category) && (
          <div
            className="rounded-2xl overflow-hidden mb-10"
            style={{
              background: '#0D2B45',
              boxShadow: '0 8px 60px rgba(13,43,69,0.2)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s ease',
            }}
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative overflow-hidden" style={{ minHeight: 380 }}>
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" style={{ position: 'absolute', inset: 0 }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(13,43,69,0.3))' }} />
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-700 text-white" style={{ background: '#F47C20', fontWeight: 700 }}>Featured</span>
                  <span className="px-3 py-1 rounded-full text-xs font-700 text-white" style={{ background: statusColor(featured.status), fontWeight: 700 }}>{featured.status}</span>
                </div>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                  {featured.location}
                </div>
                <span className="text-xs font-700 uppercase tracking-widest mb-3 block" style={{ color: '#F47C20', fontWeight: 700 }}>{featured.category} · {featured.year}</span>
                <h3 className="text-white font-800 text-2xl mb-4 leading-snug" style={{ fontWeight: 800 }}>{featured.title}</h3>
                <p className="text-white/60 text-base leading-relaxed mb-6">{featured.description}</p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="rounded-xl px-5 py-3" style={{ background: 'rgba(244,124,32,0.15)', border: '1px solid rgba(244,124,32,0.2)' }}>
                    <div className="text-xs text-white/50 mb-0.5">Impact</div>
                    <div className="text-white font-700 text-sm" style={{ fontWeight: 700 }}>{featured.impact}</div>
                  </div>
                </div>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-600 self-start transition-all duration-200 hover:scale-105" style={{ background: '#F47C20', fontWeight: 600 }}>
                  Read Full Story
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h8M9 4l4 4-4 4" /></svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div
              key={p.title}
              className="group rounded-2xl overflow-hidden cursor-pointer bg-white"
              style={{
                boxShadow: '0 2px 20px rgba(13,43,69,0.06)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.08}s`,
              }}
            >
              <div className="relative overflow-hidden" style={{ height: 210 }}>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.7) 0%, transparent 55%)' }} />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-700 text-white" style={{ background: 'rgba(244,124,32,0.9)', fontWeight: 700 }}>{p.category}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-700 text-white" style={{ background: statusColor(p.status) + 'cc', fontWeight: 700 }}>{p.status}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs mb-3" style={{ color: '#9ca3af' }}>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2C7.24 2 5 4.24 5 7c0 3.5 5 9 5 9s5-5.5 5-9c0-2.76-2.24-5-5-5z" /><circle cx="10" cy="7" r="1.5" /></svg>
                  {p.location}
                </div>
                <h3 className="font-700 text-base leading-snug mb-3" style={{ color: '#0D2B45', fontWeight: 700 }}>{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-3 py-1 rounded-full font-600" style={{ background: 'rgba(46,139,87,0.08)', color: '#2E8B57', fontWeight: 600 }}>{p.impact}</span>
                  <div className="flex items-center gap-1.5 text-sm font-600 group-hover:gap-2.5 transition-all duration-200" style={{ color: '#F47C20', fontWeight: 600 }}>
                    Read More
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M4 7h7M8 4l3 3-3 3" /></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Impact Stats ──────────────────────────────────────────────────────────────
function ImpactStats() {
  const { ref, inView } = useInView(0.3)
  const totalProjects = useCountUp(100, 1600, inView)
  const students = useCountUp(15000, 2200, inView)
  const patients = useCountUp(43000, 2400, inView)
  const families = useCountUp(8000, 2000, inView)

  const stats = [
    { value: totalProjects, suffix: '+', label: 'Total Projects', sub: 'across all programs' },
    { value: students, suffix: '+', label: 'Students Supported', sub: 'with education programs' },
    { value: patients, suffix: '+', label: 'Medical Patients', sub: 'reached by health clinics' },
    { value: families, suffix: '+', label: 'Families Helped', sub: 'through relief programs' },
  ]

  return (
    <section ref={ref} style={{ backgroundColor: '#0D2B45' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.15)', color: '#F47C20', fontWeight: 700 }}>Results</span>
          <h2 className="text-white font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>The Impact of Our Projects</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className="rounded-2xl p-5 sm:p-8 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ease ${i * 0.12}s` }}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-800 mb-2 leading-none" style={{ color: '#F47C20', fontWeight: 800 }}>{s.value}{s.suffix}</div>
              <div className="text-white font-700 text-base mb-1" style={{ fontWeight: 700 }}>{s.label}</div>
              <div className="text-white/40 text-sm">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Success Stories ───────────────────────────────────────────────────────────
const successStories = [
  {
    name: 'Kavya Devi',
    location: 'Bihar, India',
    story: 'Kavya was the first girl in her village to use a computer. Through the Digital Classrooms project, she learned coding at age 12. Today, at 17, she\'s training as a software developer in Patna.',
    project: 'Digital Classrooms',
    image: 'https://images.unsplash.com/photo-1567122087721-47b09b61e1d1?w=400&h=400&fit=crop&auto=format',
  },
  {
    name: 'Ramesh Kumar',
    location: 'Rajasthan, India',
    story: 'Diagnosed with diabetes in a mobile clinic at age 52, Ramesh received free medication and dietary guidance that has kept him healthy for three years — without ever visiting a hospital he couldn\'t afford.',
    project: 'Mobile Health Clinics',
    image: 'https://images.unsplash.com/photo-1596450514537-fae68a81346b?w=400&h=400&fit=crop&auto=format',
  },
  {
    name: 'Selvi Murugan',
    location: 'Tamil Nadu, India',
    story: 'Selvi joined the Women\'s Livelihood Program with no income. Two years later, her handloom cooperative employs 12 women and exports textiles to buyers in the United States and Germany.',
    project: "Women's Livelihood Program",
    image: 'https://images.unsplash.com/photo-1708593330411-24d85eff0728?w=400&h=400&fit=crop&auto=format',
  },
]

function SuccessStories() {
  const { ref, inView } = useInView(0.15)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontWeight: 700 }}>Outcomes</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>Stories of Transformation</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {successStories.map((s, i) => (
            <div
              key={s.name}
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#FFF9F3',
                border: '1px solid rgba(13,43,69,0.06)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.12}s`,
              }}
            >
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.8) 0%, transparent 55%)' }} />
                <div className="absolute bottom-4 left-4">
                  <div className="text-white font-700 text-sm" style={{ fontWeight: 700 }}>{s.name}</div>
                  <div className="text-white/60 text-xs">{s.location}</div>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-700 mb-4" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>
                  {s.project}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{s.story}"</p>
              </div>
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
        <h2 className="text-white font-800 mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Support a Project That Matters</h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">Every project begins with a single donor, volunteer, or partner who believed in the mission. Be that person.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/donate" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:scale-105" style={{ background: '#0D2B45', color: 'white', fontWeight: 700 }}>Donate</Link>
          <Link to="/contact" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Volunteer</Link>
          <Link to="/contact" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Partner With Us</Link>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  return (
    <>
      <PageHero />
      <ProjectsGrid />
      <ImpactStats />
      <SuccessStories />
      <Cta />
    </>
  )
}
