import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'

export function PageHero({ image, title, intro, crumbs }: { image: string; title: string; intro: string; crumbs: { label: string; to?: string }[] }) {
  return (
    <section className="relative min-h-[420px] flex items-end">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.4) 60%, transparent 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-12 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white">Home</Link>
          {crumbs.map(c => (
            <span key={c.label} className="flex items-center gap-2">
              <span>/</span>
              {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>{title}</h1>
        <p className="text-white/80 text-lg max-w-2xl">{intro}</p>
      </div>
    </section>
  )
}

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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

export function SectionTitle({ title, sub, light = false }: { title: string; sub?: string; light?: boolean }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-800" style={{ color: light ? 'white' : '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{title}</h2>
      {sub && <p className={`mt-2 ${light ? 'text-white/60' : 'text-gray-500'}`} style={{ fontFamily: 'Manrope, sans-serif' }}>{sub}</p>}
    </div>
  )
}

export function OrangeCta({ title, text, links }: { title: string; text: string; links: { label: string; to: string }[] }) {
  return (
    <section className="py-20" style={{ background: '#F47C20' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>{title}</h2>
        <p className="text-white/80 mb-8 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>{text}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {links.map((l, i) => (
            <Link key={l.to} to={l.to} className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: i === 0 ? '#0D2B45' : 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Manrope, sans-serif' }}>{l.label}</Link>
          ))}
        </div>
      </div>
    </section>
  )
}
