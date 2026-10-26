import { useState } from 'react'
import { PageHero, Reveal, OrangeCta } from '../../components/PageHero'
import { stampCategories } from '../../data/stamps'

function Gallery() {
  const [active, setActive] = useState(stampCategories[0].slug)
  const cat = stampCategories.find(c => c.slug === active) ?? stampCategories[0]
  const total = stampCategories.reduce((n, c) => n + c.stamps.length, 0)

  return (
    <section className="py-20" style={{ background: '#FFF9F3' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Visit India via Stamps</h2>
          <p className="text-gray-500 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{total} stamps in {stampCategories.length} collections, presented by the India Network Foundation</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {stampCategories.map(c => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className="rounded-full px-4 py-2 text-sm font-700 transition-colors"
              style={{ background: active === c.slug ? '#0D2B45' : 'white', color: active === c.slug ? 'white' : '#0D2B45', border: '1px solid rgba(13,43,69,0.12)', fontFamily: 'Manrope, sans-serif' }}
            >
              {c.title}
            </button>
          ))}
        </div>

        <Reveal key={cat.slug}>
          <div className="rounded-2xl bg-white p-6 md:p-10 shadow-sm" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
            <h3 className="text-2xl font-800 mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{cat.title}</h3>
            <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>{cat.intro}</p>
            <div className={`grid gap-6 ${cat.stamps.length === 1 ? 'grid-cols-1 max-w-md' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
              {cat.stamps.map(s => (
                <figure key={s.image} className="flex flex-col items-center text-center">
                  <div className="w-full flex items-center justify-center rounded-xl p-3 h-44 sm:h-52" style={{ background: '#FFF9F3' }}>
                    <img src={s.image} alt={s.caption} className="max-h-full max-w-full object-contain drop-shadow-md" loading="lazy" />
                  </div>
                  <figcaption className="mt-3 text-sm font-600" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function IndianStampsPage() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1587538018365-2a1f8b544c08?w=1800&h=700&fit=crop&auto=format"
        title="Indian Stamps"
        intro="A gallery of Indian postage stamps — classical dances, famous people, flora and fauna, cricket legends, paintings and more."
        crumbs={[{ label: 'Projects', to: '/projects/inf-projects' }, { label: 'Indian Stamps' }]}
      />
      <Gallery />
      <OrangeCta
        title="Explore More of India"
        text="Discover Indian festivals and Hindu temples in the United States on our Culture page."
        links={[{ label: 'Culture', to: '/projects/culture' }, { label: 'Directory', to: '/directory' }]}
      />
    </div>
  )
}
