import { Link } from 'react-router'
import { PageHero, Reveal, SectionTitle, OrangeCta } from '../../components/PageHero'

const BENEFITS = [
  { icon: '🛂', title: 'No Visa Needed', desc: 'PIO card holders could visit India without a visa.' },
  { icon: '📝', title: 'Easier Registration', desc: 'No registration with the Foreigners Registration Officer for stays of up to 180 days; longer stays required registration within 30 days.' },
  { icon: '🏠', title: 'Property', desc: 'Acquire, hold, transfer and dispose of immovable property in India, except agricultural or plantation property.' },
  { icon: '🎓', title: 'Education', desc: 'Admission of children to Indian institutions — including medical and engineering colleges, IITs and IIMs — under the NRI category.' },
  { icon: '🏦', title: 'Parity with NRIs', desc: 'Economic, financial and educational facilities on a par with Non-Resident Indians, and access to LIC and government housing schemes.' },
  { icon: '🗳️', title: 'Not Included', desc: 'No voting or other political rights, and no right to buy property in Jammu & Kashmir.' },
]

const FACTS = [
  { label: 'Launched', value: '31 March 1999' },
  { label: 'Fee', value: 'US $1,000' },
  { label: 'Validity', value: '20 years' },
  { label: 'Eligible', value: 'Up to 4 generations' },
]

const ARTICLES = [
  { date: '29 March 1999', author: 'Dr. K.V. Rao', title: 'Person of Indian Origin Card Update', text: 'After meeting Mrs. Shashi Tripathi, Consul General of India in New York, Dr. Rao reported that the Central Cabinet had approved the card and that the fee was expected to be about $1,000. He urged that the fee was too high and encouraged NRIs to write to the External Affairs Ministry before a final decision was made.' },
  { date: '31 March 1999', author: 'News report', title: 'India Launches Privilege Card for Indians Abroad', text: 'Home Minister L.K. Advani launched the PIO card, calling it "a major step towards meeting their aspirations of dual citizenship". About 15 million people abroad were eligible; residents of Pakistan and Bangladesh were excluded.' },
  { date: '31 March 1999', author: 'News report', title: 'Details of the PIO Card', text: 'The scheme covered anyone who had ever held an Indian passport, or was the spouse, child, grandchild or great-grandchild of an Indian citizen — spanning four generations. Every applicant, including infants and children, had to apply separately.' },
  { date: '31 March 1999', author: 'News report', title: 'A Step Towards Dual Citizenship', text: 'Dual citizenship could not be offered without a constitutional amendment. Mr. Advani noted the goodwill among PIOs, reflected in the US $4.3 billion raised by the Resurgent India Bond scheme.' },
  { date: '26 June 1999', author: 'Editor', title: 'PIO Card — Information', text: 'Cards were to be issued through Indian Embassies, High Commissions and Consulates, and by the Foreigners Regional Registration Officers in Delhi, Mumbai, Calcutta and Chennai for those in India on long-term visas.' },
  { date: '30 September 1999', author: 'News report', title: 'Finance Minister Considers Cut in PIO Fee', text: 'Finance Minister Yashwant Sinha ruled out dual citizenship in the near future, as it would need a national consensus and a constitutional amendment, but promised to consider reducing the $1,000 fee.' },
]

export default function PioCardPage() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&h=700&fit=crop&auto=format"
        title="Person of Indian Origin (PIO) Card"
        intro="How the PIO Card was launched in 1999 — as reported to India Network members by Dr. K.V. Rao and the India Network editors."
        crumbs={[{ label: 'Projects', to: '/projects/inf-projects' }, { label: 'PIO Card' }]}
      />

      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl p-5 md:p-6 flex gap-4 items-start" style={{ background: 'rgba(244,124,32,0.08)', border: '1px solid rgba(244,124,32,0.25)' }}>
            <span className="text-2xl">ℹ️</span>
            <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <strong>Historical archive.</strong> This page preserves India Network's 1999 coverage of the PIO Card. The PIO Card scheme was later merged into the Overseas Citizenship of India (OCI) scheme in January 2015. For current rules, please check with your nearest Indian Embassy or Consulate — see our <Link to="/directory/embassies" className="underline" style={{ color: '#F47C20' }}>list of Indian missions</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {FACTS.map(f => (
                <div key={f.label} className="rounded-2xl p-5 text-center" style={{ background: '#0D2B45' }}>
                  <div className="text-xl sm:text-2xl font-800 mb-1" style={{ color: '#F47C20' }}>{f.value}</div>
                  <div className="text-xs sm:text-sm text-white/70">{f.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20" style={{ background: '#FFF9F3' }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionTitle title="What the PIO Card Offered" sub="Benefits announced at the launch in 1999" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map(b => (
                <div key={b.title} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-3xl mb-3">{b.icon}</div>
                  <h3 className="font-800 mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{b.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <SectionTitle title="Articles from the India Network Archive" sub="March – September 1999" />
            <div className="space-y-5">
              {ARTICLES.map(a => (
                <article key={a.title} className="rounded-2xl p-6" style={{ background: '#FFF9F3', borderLeft: '4px solid #F47C20' }}>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>{a.date}</span><span className="w-1 h-1 rounded-full bg-gray-300" /><span>{a.author}</span>
                  </div>
                  <h3 className="font-800 text-lg mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{a.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <OrangeCta
        title="Help for Visitors from India"
        text="Members can enroll visiting parents and relatives in India Network Health Insurance."
        links={[{ label: 'Visitor Health Insurance', to: '/projects/travel-insurance' }, { label: 'Indian Embassies', to: '/directory/embassies' }]}
      />
    </div>
  )
}
