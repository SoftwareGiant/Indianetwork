import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'

export interface PastProject {
  title: string
  breadcrumb: string
  year: string
  category: string
  heroImage: string
  overviewImage: string
  facts: { label: string; value: string }[]
  challenge: string[]
  response: { title: string; desc: string }[]
  stats: { value: string; label: string }[]
  gallery: string[]
  quote?: { text: string; author: string; role: string }
  list?: { title: string; intro: string; items: string[] }
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl p-4 sm:p-6 text-center" style={{ background: '#0D2B45' }}>
      <div className="text-2xl sm:text-3xl font-800 mb-1" style={{ color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>{value}</div>
      <div className="text-sm text-white/70" style={{ fontFamily: 'Manrope, sans-serif' }}>{label}</div>
    </div>
  )
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
    >
      {children}
    </div>
  )
}

export default function PastProjectLayout({ project }: { project: PastProject }) {
  const p = project
  return (
    <div style={{ background: '#FFF9F3' }}>
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-end">
        <img src={p.heroImage} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.93) 0%, rgba(13,43,69,0.45) 60%, transparent 100%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-14 w-full">
          <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/projects/inf-projects" className="hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <Link to="/projects/past" className="hover:text-white transition-colors">Past Projects</Link>
            <span>/</span>
            <span className="text-white">{p.breadcrumb}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="rounded-full px-4 py-1 text-sm font-700" style={{ background: '#F47C20', color: 'white', fontFamily: 'Manrope, sans-serif' }}>{p.year}</span>
            <span className="rounded-full px-4 py-1 text-sm font-700" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontFamily: 'Manrope, sans-serif' }}>{p.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-800 text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{p.title}</h1>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={p.overviewImage} alt={p.title} className="rounded-2xl w-full object-cover shadow-lg h-64 sm:h-80 md:h-[380px]" />
            </div>
            <div>
              <h2 className="text-3xl font-800 mb-6" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Project Overview</h2>
              <div className="space-y-4">
                {p.facts.map(item => (
                  <div key={item.label} className="flex items-start gap-4 pb-4" style={{ borderBottom: '1px solid rgba(13,43,69,0.08)' }}>
                    <span className="text-sm font-700 w-28 sm:w-32 shrink-0" style={{ color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>{item.label}</span>
                    <span className="text-sm" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-16" style={{ background: '#FFF9F3' }}>
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <h2 className="text-3xl font-800 mb-6" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>The Challenge</h2>
            <div className="rounded-2xl p-8 space-y-4" style={{ background: 'white', borderLeft: '4px solid #F47C20' }}>
              {p.challenge.map((para, i) => (
                <p key={i} className="text-gray-600 text-lg leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>{para}</p>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Our Response */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <h2 className="text-3xl font-800 mb-8" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Our Response</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {p.response.map((item, i) => (
                <div key={item.title} className="rounded-2xl p-6" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.08)' }}>
                  <div className="text-4xl font-800 mb-3" style={{ color: 'rgba(244,124,32,0.2)', fontFamily: 'Manrope, sans-serif' }}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-800 text-lg mb-3" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16" style={{ background: '#FFF9F3' }}>
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <h2 className="text-3xl font-800 mb-8 text-center" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Impact at a Glance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {p.stats.map(s => <StatCard key={s.label} value={s.value} label={s.label} />)}
            </div>
          </Section>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <h2 className="text-3xl font-800 mb-8" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Project Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {p.gallery.map((src, i) => (
                <div key={src} className="rounded-2xl overflow-hidden h-36 sm:h-48 md:h-[220px]">
                  <img src={src} alt={`${p.breadcrumb} photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Extra list */}
      {p.list && (
        <section className="py-16" style={{ background: '#FFF9F3' }}>
          <div className="max-w-6xl mx-auto px-6">
            <Section>
              <h2 className="text-3xl font-800 mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{p.list.title}</h2>
              <p className="text-gray-500 mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>{p.list.intro}</p>
              <div className="rounded-2xl bg-white p-6 md:p-8 grid md:grid-cols-2 gap-x-10" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
                {p.list.items.map(item => (
                  <div key={item} className="flex items-start gap-3 py-3 text-sm" style={{ borderBottom: '1px solid rgba(13,43,69,0.06)', color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>
                    <span style={{ color: '#F47C20' }}>✉</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </section>
      )}

      {/* Quote */}
      {p.quote && (
        <section className="py-16" style={{ background: '#FFF9F3' }}>
          <div className="max-w-4xl mx-auto px-6">
            <Section>
              <div className="rounded-2xl p-6 sm:p-10 text-center" style={{ background: 'white', border: '1px solid rgba(13,43,69,0.08)' }}>
                <div className="text-5xl mb-6" style={{ color: '#F47C20' }}>"</div>
                <p className="text-xl text-gray-700 italic mb-6 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>{p.quote.text}</p>
                <div className="font-700" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{p.quote.author}</div>
                <div className="text-sm text-gray-500" style={{ fontFamily: 'Manrope, sans-serif' }}>{p.quote.role}</div>
              </div>
            </Section>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16" style={{ background: '#F47C20' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Support Projects Like This</h2>
          <p className="text-white/80 mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>Explore our on-going initiatives or contact the Foundation to sponsor a project of your own.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects/inf-projects" className="rounded-full px-8 py-3.5 font-700" style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}>View Active Projects</Link>
            <Link to="/donate" className="rounded-full px-8 py-3.5 font-700" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Manrope, sans-serif' }}>Make a Donation</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
