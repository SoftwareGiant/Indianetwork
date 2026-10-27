import { useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../../hooks/useInView'

function PageHero() {
  return (
    <section className="relative min-h-[420px] flex items-end">
      <img
        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1800&h=700&fit=crop&auto=format"
        alt="Past Projects"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.4) 60%, transparent 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 lg:pt-40 pb-12 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/projects/inf-projects" className="hover:text-white">Projects</Link>
          <span>/</span>
          <span className="text-white">Past Projects</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Past Projects</h1>
        <p className="text-white/80 text-lg max-w-xl">Relief efforts and community initiatives the India Network Foundation has completed since 1988.</p>
      </div>
    </section>
  )
}

type Category = 'All' | 'Education' | 'Community' | 'Disaster Relief'

const CATEGORIES: Category[] = ['All', 'Education', 'Community', 'Disaster Relief']

const PAST_PROJECTS = [
  {
    title: 'Tsunami Relief Project — 2004',
    category: 'Disaster Relief' as Category,
    location: 'Andhra Pradesh & Tamil Nadu',
    year: 2004,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop&auto=format',
    impact: "Children's education, orphans, livelihoods",
    desc: 'A relief fund for tsunami victims in coastal Andhra Pradesh and Tamil Nadu, focused on education, homes for orphans, and nets and equipment for fishermen.',
    slug: 'tsunami-relief-2004',
  },
  {
    title: 'Gujarat Earthquake Relief — 2001',
    category: 'Education' as Category,
    location: 'Bhuj & Kutch, Gujarat',
    year: 2001,
    image: '/images/inf/gujarat-quake-3.jpg',
    impact: '$100,000+ raised to rebuild schools',
    desc: 'After the 7.9 magnitude Republic Day earthquake, INF raised funds to construct new school houses and collected clothes and food for affected villages.',
    slug: 'gujarat-earthquake-relief',
  },
  {
    title: 'Orissa Cyclone Relief — 1999',
    category: 'Disaster Relief' as Category,
    location: 'Ganjam District, Orissa',
    year: 1999,
    image: '/images/inf/orissa-1.jpg',
    impact: '1,000 families received rice',
    desc: 'Distributed 10 kg bags of rice to families in remote tribal villages hit by the super cyclone, and worked with the state to support damaged schools.',
    slug: 'orissa-cyclone-relief',
  },
  {
    title: 'Operation Care — Kargil 1999',
    category: 'Disaster Relief' as Category,
    location: 'Karnataka, Delhi, J&K',
    year: 1999,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&auto=format',
    impact: 'Direct aid to soldier families',
    desc: 'Dr. K.V. Rao personally delivered relief to families of fallen soldiers and wounded jawans, and donated equipment to army base hospitals.',
    slug: 'kargil-operation-care',
  },
  {
    title: 'Map Set Donation Project — 1998–99',
    category: 'Education' as Category,
    location: 'Schools across India',
    year: 1999,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&auto=format',
    impact: 'Wall maps in 9 languages',
    desc: 'Donors sponsored laminated World, India and State wall map sets for $20 each, delivered to rural schools that wrote back in appreciation.',
    slug: 'maps-project',
  },
  {
    title: 'Gujarat Cyclone Relief — 1998',
    category: 'Disaster Relief' as Category,
    location: 'Gujarat',
    year: 1998,
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop&auto=format',
    impact: 'Water, food, medical & shelter',
    desc: 'Launched the Gujarat Cyclone Relief Fund and donated to Sri Ramakrishna Mission and Vivekananda Memorial to help cyclone victims.',
    slug: 'gujarat-cyclone-relief',
  },
  {
    title: 'Andhra Pradesh Cyclone Relief — 1996',
    category: 'Education' as Category,
    location: 'East & West Godavari, AP',
    year: 1996,
    image: '/images/inf/ap-hsduvva1.jpg',
    impact: 'Over 100 village schools helped',
    desc: 'After the November 1996 cyclone, Dr. K.V. Rao visited 150 schools; INF supplied steel almirahs, laminated maps, water drums and roof sheets to rural schools.',
    slug: 'andhra-pradesh-cyclone-relief-1996',
  },
  {
    title: 'Andhra Pradesh Community Projects',
    category: 'Community' as Category,
    location: 'Godavari Districts, AP',
    year: 1997,
    image: '/images/inf/andhra-duvva-1.jpg',
    impact: 'Schools & community centers',
    desc: 'School buildings, a community development center and girls high school repairs proposed for NRI sponsorship after the Andhra cyclone.',
    slug: 'andhra-pradesh-projects',
  },
]

const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  All: { bg: 'rgba(13,43,69,0.08)', text: '#0D2B45' },
  Education: { bg: 'rgba(244,124,32,0.1)', text: '#F47C20' },
  Community: { bg: 'rgba(13,43,69,0.1)', text: '#0D2B45' },
  'Disaster Relief': { bg: 'rgba(200,50,50,0.08)', text: '#c83232' },
}

function FilterBar({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="rounded-full px-5 py-2 text-sm font-700 transition-colors"
          style={{
            background: active === cat ? '#0D2B45' : 'rgba(13,43,69,0.07)',
            color: active === cat ? 'white' : '#0D2B45',
            fontFamily: 'Manrope, sans-serif',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

function ProjectCard({ proj }: { proj: typeof PAST_PROJECTS[0] }) {
  const colors = CATEGORY_COLORS[proj.category]
  return (
    <Link to={"/projects/past/" + proj.slug} className="group block rounded-2xl overflow-hidden shadow-md flex flex-col hover:-translate-y-1 transition-transform duration-300" style={{ border: '1px solid rgba(13,43,69,0.08)', background: 'white' }}>
      <div className="h-48 overflow-hidden relative">
        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 left-3 rounded-full text-xs font-700 px-3 py-1" style={{ background: 'rgba(13,43,69,0.75)', color: 'white', fontFamily: 'Manrope, sans-serif' }}>{proj.year}</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="rounded-full text-xs font-700 px-3 py-1" style={{ background: colors.bg, color: colors.text, fontFamily: 'Manrope, sans-serif' }}>{proj.category}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1" style={{ fontFamily: 'Manrope, sans-serif' }}>📍 {proj.location}</span>
        </div>
        <h3 className="font-800 text-lg mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{proj.title}</h3>
        <p className="text-sm text-gray-600 flex-1 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>{proj.desc}</p>
        <div className="rounded-xl px-4 py-2.5 mb-4 flex items-center gap-2" style={{ background: 'rgba(46,139,87,0.08)' }}>
          <span className="text-sm font-700" style={{ color: '#2E8B57', fontFamily: 'Manrope, sans-serif' }}>Impact:</span>
          <span className="text-sm font-700" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{proj.impact}</span>
        </div>
        <div
          className="w-full py-2.5 rounded-full text-sm font-700 text-center"
          style={{ border: '2px solid #0D2B45', color: '#0D2B45', fontFamily: 'Manrope, sans-serif', background: 'transparent' }}
        >
          View Details
        </div>
      </div>
    </Link>
  )
}

function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')
  const { ref, inView } = useInView()

  const filtered = activeFilter === 'All' ? PAST_PROJECTS : PAST_PROJECTS.filter(p => p.category === activeFilter)

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-800 mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Completed Projects</h2>
            <p className="text-gray-500" style={{ fontFamily: 'Manrope, sans-serif' }}>Filter by category to explore our work</p>
          </div>
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(proj => (
              <ProjectCard key={proj.title} proj={proj} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>No projects found in this category.</div>
          )}
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="py-20" style={{ background: '#F47C20' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Be Part of the Next Chapter</h2>
        <p className="text-white/80 mb-8 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>Join INF to support active projects or propose your own.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/projects/inf-projects" className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}>View Active Projects</Link>
          <Link to="/contact" className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Manrope, sans-serif' }}>Get Involved</Link>
        </div>
      </div>
    </section>
  )
}

export default function PastProjectsPage() {
  return (
    <div>
      <PageHero />
      <ProjectsGrid />
      <Cta />
    </div>
  )
}
