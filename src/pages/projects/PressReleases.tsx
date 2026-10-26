import { useState } from 'react'
import { PageHero, Reveal, OrangeCta } from '../../components/PageHero'

const RELEASES = [
  {
    date: 'January 30, 2007',
    place: 'Orlando, FL',
    tag: 'Travel Grants',
    title: 'India Network Foundation Announces Travel Grants to Scholars from South Asia',
    summary: 'Travel grants for 2007 for South Asian scholars presenting research at national and international conferences in the United States.',
    body: [
      'India Network Foundation is pleased to announce availability of travel grants in 2007 to South Asian scholars planning to present their world-class research at national and international conferences held in the United States. The Travel Grants program, started in 2006, has been very successful in attracting a number of scholars from South Asian countries.',
      'The Foundation is grateful to the thousands of members who indirectly contributed to the program by participating in the award-winning health insurance program for visiting parents, sponsored by the Foundation for the benefit of its members.',
      'Dr. K.V. Rao, President, India Network Foundation, has been instrumental in recognizing, organizing and fundraising through sponsorship of the Health Insurance Program for Visiting Parents, and has contributed his own funds to the program. The Foundation is the first Asian Indian community organization in the United States and Canada to have this direct program for the benefit of the scientific community from South Asia.',
      'There is no fixed deadline, and participation in scientific conferences in all disciplines is encouraged. The grant is designed to cover airline travel, registration and hotel expenses; where possible, institutional support from the home institution or conference organizers is appreciated. Graduate and undergraduate students, professors, scholars and researchers from all fields are eligible. All applications go through peer review for merit.',
    ],
  },
  {
    date: 'January 26, 2001',
    place: 'Earthquake Relief Fund',
    tag: 'Disaster Relief',
    title: 'India Network Announces $100,000 Aid Package to Gujarat Earthquake Areas',
    summary: 'A $100,000 aid package and relief fund for victims of the Republic Day earthquake in Gujarat.',
    body: [
      'At least 20,000 people were killed and more than 50,000 injured when a devastating earthquake measuring 7.9 on the Richter scale flattened Gujarat in the early hours of Republic Day. Bhuj, nearest to the epicenter, alone accounted for 3,000 deaths.',
      'India Network Foundation announced a $100,000 aid package for the earthquake areas and appealed to members to contribute generously. All funds collected were to be used for earthquake relief work, organized directly by INF with volunteer help from its Ahmedabad members — providing humanitarian help in remote areas and helping elementary schools.',
      'For members who wished to donate winter clothing, INF also shared the address of a collection point for clean blankets, sheets and sweaters requested by distributing organizations in Gujarat. Photos of a blanket distribution on February 14–16, 2001 were later shared with members.',
      'Donations to INF are tax-exempt in the United States.',
    ],
  },
  {
    date: 'September 5, 2000',
    place: 'Maumee, OH',
    tag: 'Recognition',
    title: 'Commerce Secretary Mineta Invites Professor K.V. Rao to Serve on the Census Advisory Committee',
    summary: 'Dr. K.V. Rao, President of India Network Foundation, invited to the Census Advisory Committee on the Asian Population.',
    body: [
      'U.S. Secretary of Commerce Norman Y. Mineta invited Dr. K.V. Rao, President, India Network Foundation, to serve on the Census Advisory Committee on the Asian Population. Secretary Mineta emphasized that the Committee has a vital role in providing an organized and continuing channel of communication with the Asian population.',
      'The Census Bureau will seek advice from the Committee on reducing the differential undercount for population groups, on disseminating census data to the Asian population, and on research and design plans for the 2010 census and the American Community Survey.',
      'Professor Rao said he looked forward to helping increase census participation of minority populations and reduce undercount and misclassification. As Honorary President of India Network Foundation, he had inspired thousands of Asian Americans to take part in the census through his editorials and by answering questions about the information collected by the Census Bureau.',
      'Professor Rao is the author or co-author of several research articles and books, has been President of South Asian Sociologists, and served on the Executive Council of the Canadian Population Society.',
    ],
  },
]

function Releases() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="py-20" style={{ background: '#FFF9F3' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Press Releases</h2>
          <p className="text-gray-500 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Official announcements from India Network Foundation, Inc.</p>
        </div>
        <div className="space-y-5">
          {RELEASES.map((r, i) => (
            <Reveal key={r.title}>
              <article className="rounded-2xl bg-white shadow-sm overflow-hidden" style={{ border: open === i ? '1px solid rgba(244,124,32,0.35)' : '1px solid rgba(13,43,69,0.06)' }}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="rounded-full text-xs font-700 px-3 py-1 text-white" style={{ background: '#F47C20' }}>{r.tag}</span>
                    <span className="text-xs text-gray-400">{r.date} · {r.place}</span>
                  </div>
                  <h3 className="font-800 text-lg md:text-xl leading-snug mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{r.title}</h3>
                  <p className="text-sm text-gray-600">{r.summary}</p>
                  <span className="inline-block mt-4 text-sm font-700" style={{ color: '#F47C20' }}>{open === i ? 'Hide full release ↑' : 'Read full release ↓'}</span>
                </button>
                {open === i && (
                  <div className="px-6 md:px-8 pb-8 space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif', borderTop: '1px solid rgba(13,43,69,0.06)' }}>
                    <div className="pt-6 space-y-4">
                      {r.body.map(p => <p key={p.slice(0, 40)}>{p}</p>)}
                    </div>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 rounded-2xl p-6 bg-white text-sm text-gray-600" style={{ border: '1px solid rgba(13,43,69,0.06)' }}>
          <strong style={{ color: '#0D2B45' }}>Media enquiries:</strong> India Network Foundation, 7065 Westpointe Blvd, Suite 208, Orlando, FL 32835 · 408-540-3600 · <a href="mailto:info@indianetwork.org" className="underline" style={{ color: '#F47C20' }}>info@indianetwork.org</a>
        </div>
      </div>
    </section>
  )
}

export default function PressReleasesPage() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1800&h=700&fit=crop&auto=format"
        title="Press Releases"
        intro="Announcements from India Network Foundation on travel grants, disaster relief and recognition of our work."
        crumbs={[{ label: 'Projects', to: '/projects/inf-projects' }, { label: 'Press Releases' }]}
      />
      <Releases />
      <OrangeCta
        title="Latest News & Events"
        text="Read more updates from the Foundation and ways to get involved."
        links={[{ label: 'News & Events', to: '/news' }, { label: 'Contact Us', to: '/contact' }]}
      />
    </div>
  )
}
