import { Link } from 'react-router'
import { useInView } from '../../hooks/useInView'

function PageHero() {
  return (
    <section className="relative min-h-[400px] flex items-end">
      <img
        src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1800&h=700&fit=crop&auto=format"
        alt="INF Projects"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.4) 60%, transparent 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 lg:pt-40 pb-12 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-white">INF Projects</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>INF Projects</h1>
        <p className="text-white/80 text-lg max-w-xl">Projects initiated and managed by India Network Foundation</p>
      </div>
    </section>
  )
}

const PROJECTS = [
  {
    image: '/images/inf/water-plant-1.jpg',
    title: 'Mineral Water Plants',
    location: 'Rural Andhra Pradesh',
    category: 'Clean Water',
    desc: 'Building and maintaining water treatment plants with the Government of Andhra Pradesh. Each plant produces 3,000 liters of clean water a day — enough for up to 1,500 people.',
    link: '/programs/community',
  },
  {
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&auto=format',
    title: 'Health Insurance for Visitors',
    location: 'USA / Canada',
    category: 'Member Services',
    desc: 'India Network Health Insurance (KV Rao Insurance) offers visitor medical coverage, including pre-existing conditions, for parents, relatives, students and temporary workers.',
    link: '/projects/travel-insurance',
  },
  {
    image: '/images/inf/travel-grants.jpg',
    title: 'Academic Travel Grants',
    location: 'India / USA',
    category: 'Academic',
    desc: 'Travel grants helping India-based faculty and doctoral students present peer-reviewed papers at national and international conferences in the United States.',
    link: '/projects/academic-travel-grants',
  },
  {
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop&auto=format',
    title: 'Student Scholarship at NYU',
    location: 'New York, USA',
    category: 'Education',
    desc: 'Scholarship support for deserving Indian students pursuing higher education at New York University.',
    link: '/projects/nyu-scholarship',
  },
]

function ActiveProjects() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Active Projects</h2>
            <p className="text-gray-500 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>On-going initiatives funded by members and generous donors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS.map(proj => (
              <div key={proj.title} className="rounded-2xl overflow-hidden shadow-md flex flex-col" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
                <div className="h-52 overflow-hidden relative">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 rounded-full text-xs font-700 px-3 py-1" style={{ background: '#2E8B57', color: 'white', fontFamily: 'Manrope, sans-serif' }}>Active</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="rounded-full text-xs font-700 px-3 py-1" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>{proj.category}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1" style={{ fontFamily: 'Manrope, sans-serif' }}>📍 {proj.location}</span>
                  </div>
                  <h3 className="font-800 text-lg mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{proj.title}</h3>
                  <p className="text-sm text-gray-600 flex-1 mb-5" style={{ fontFamily: 'Manrope, sans-serif' }}>{proj.desc}</p>
                  <Link
                    to={proj.link}
                    className="inline-block rounded-full px-6 py-2.5 text-sm font-700 text-center"
                    style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ImpactStats() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20" style={{ background: '#0D2B45' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          {[
            { stat: '1988', label: 'Founded' },
            { stat: '150K+', label: 'Members' },
            { stat: '10', label: 'Water Plants Committed' },
            { stat: '1,500', label: 'People Served per Plant' },
          ].map(item => (
            <div key={item.stat}>
              <div className="text-3xl md:text-4xl font-800 mb-2" style={{ color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>{item.stat}</div>
              <div className="text-white/70 font-700 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="py-20" style={{ background: '#F47C20' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Have a Project Idea?</h2>
        <p className="text-white/80 mb-8 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>Members can direct their contributions to a developmental or educational project of their choice in India.</p>
        <Link
          to="/projects/member-projects"
          className="rounded-full px-8 py-3.5 font-700 text-base inline-block"
          style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}
        >
          Propose a Project
        </Link>
      </div>
    </section>
  )
}

export default function InfProjectsPage() {
  return (
    <div>
      <PageHero />
      <ActiveProjects />
      <ImpactStats />
      <Cta />
    </div>
  )
}
