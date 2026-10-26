import { useState } from 'react'
import { PageHero, Reveal, SectionTitle, OrangeCta } from '../../components/PageHero'
import { templesByState, hinduOrganizations } from '../../data/temples'

const FESTIVALS = [
  { name: 'Republic Day', when: '26 January', desc: 'India was declared a Republic on 26 January 1950.' },
  { name: 'Shivaratri', desc: 'Hindu holiday in honour of Lord Shiva.' },
  { name: 'Holi', desc: 'The spring festival — a day for merrymaking, when coloured water is thrown on everyone.' },
  { name: 'Id-ul-Fitr', desc: 'A Muslim festival that marks the end of Ramzan.' },
  { name: 'Good Friday', desc: 'Commemorates the crucifixion of Jesus Christ.' },
  { name: 'Milad-un-Nabi', desc: 'Birthday of Prophet Mohammed.' },
  { name: 'Mahavir Jayanti', desc: 'Birthday of Lord Mahavira.' },
  { name: 'Buddha Purnima', desc: 'Birthday of Gautama Buddha.' },
  { name: 'Baisakhi', desc: 'A harvest festival.' },
  { name: 'Id-ul-Zuha', desc: 'A Muslim festival.' },
  { name: 'Muharram', desc: 'A Muslim holiday.' },
  { name: 'Independence Day', when: '15 August', desc: 'India became independent on 15 August 1947.' },
  { name: 'Janmashtami', desc: 'Birthday of Lord Krishna.' },
  { name: 'Vinayaka Chaturthi', desc: 'Birthday of Lord Ganesha.' },
  { name: 'Gandhi Jayanti', when: '2 October', desc: 'Birthday of Mahatma Gandhi.' },
  { name: 'Ram Navami', desc: 'Birthday of Lord Rama.' },
  { name: 'Dussehra', desc: 'Celebrates the victory of Rama over Ravana; Goddess Durga is also worshipped.' },
  { name: 'Diwali', desc: 'The festival of lights, commemorating the victory of good over evil.' },
  { name: "Guru Nanak's Birthday", desc: 'Celebrates the birthday of Guru Nanak, the great Guru of the Sikhs.' },
  { name: 'Christmas', when: '25 December', desc: 'Birthday of Jesus Christ.' },
]

function Festivals() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionTitle title="Indian Festivals & Holidays" sub="Some of the festivals and holidays celebrated across India" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FESTIVALS.map(f => (
              <div key={f.name} className="rounded-2xl p-5" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.08)' }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-800 text-base" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{f.name}</h3>
                  {f.when && <span className="shrink-0 rounded-full text-xs font-700 px-2.5 py-0.5" style={{ background: 'rgba(244,124,32,0.12)', color: '#F47C20' }}>{f.when}</span>}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Temples() {
  const [state, setState] = useState('All')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const groups = templesByState
    .filter(g => state === 'All' || g.state === state)
    .map(g => ({ ...g, temples: g.temples.filter(t => !q || [t.name, ...t.address].join(' ').toLowerCase().includes(q)) }))
    .filter(g => g.temples.length)
  const total = templesByState.reduce((n, g) => n + g.temples.length, 0)
  const shown = groups.reduce((n, g) => n + g.temples.length, 0)

  return (
    <section className="py-20" style={{ background: '#FFF9F3' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="Hindu Temples in the U.S." sub={`${total} temples across ${templesByState.length} states, compiled by the India Network Foundation`} />
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by temple name or city..."
            className="flex-1 min-w-0 px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <select
            value={state}
            onChange={e => setState(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="All">All states</option>
            {templesByState.map(g => <option key={g.state} value={g.state}>{g.state}</option>)}
          </select>
        </div>
        <p className="text-sm text-gray-500 mb-8">Showing {shown} of {total} temples</p>

        {groups.length === 0 && <p className="text-gray-500 text-center py-16">No temples found matching your search.</p>}
        <div className="space-y-10">
          {groups.map(g => (
            <div key={g.state}>
              <h3 className="text-xl font-800 mb-4 flex items-center gap-3" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>
                {g.state}
                <span className="rounded-full text-xs font-700 px-2.5 py-0.5" style={{ background: 'rgba(244,124,32,0.12)', color: '#F47C20' }}>{g.temples.length}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.temples.map(t => (
                  <div key={t.name + t.address.join()} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-2">
                    <h4 className="font-bold text-sm leading-snug" style={{ color: '#0D2B45' }}>🛕 {t.name}</h4>
                    {t.address.length > 0 && <p className="text-xs text-gray-500 leading-relaxed">{t.address.join(', ')}</p>}
                    {t.phone && <p className="text-xs text-gray-500">📞 {t.phone}</p>}
                    {t.email && <a href={`mailto:${t.email}`} className="text-xs hover:underline break-all" style={{ color: '#2E8B57' }}>✉️ {t.email}</a>}
                    {t.url && <a href={t.url.startsWith('http') ? t.url : `http://${t.url}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline break-all" style={{ color: '#F47C20' }}>{t.url.replace(/^https?:\/\//, '')}</a>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-white p-6 md:p-8 border border-gray-100">
          <h3 className="text-lg font-800 mb-4" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Hindu Organizations</h3>
          <div className="flex flex-col gap-2">
            {hinduOrganizations.map(o => (
              <a key={o.name} href={o.url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#2E8B57' }}>{o.name} →</a>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-6">Listings come from the India Network Foundation archive and may be out of date. Please contact a temple before visiting.</p>
      </div>
    </section>
  )
}

export default function CulturePage() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1800&h=700&fit=crop&auto=format"
        title="Culture"
        intro="Indian festivals and holidays, and a directory of Hindu temples across the United States."
        crumbs={[{ label: 'Projects', to: '/projects/inf-projects' }, { label: 'Culture' }]}
      />
      <Festivals />
      <Temples />
      <OrangeCta
        title="Celebrate Indian Culture"
        text="Our Community Organization Grants help Indian associations host artists from India and promote traditional arts."
        links={[{ label: 'Cultural Grants', to: '/programs/cultural-preservation' }, { label: 'Indian Stamps', to: '/projects/indian-stamps' }]}
      />
    </div>
  )
}
