import { Link } from 'react-router'
import { PageHero, Reveal, SectionTitle, OrangeCta } from '../../components/PageHero'
import ApSchoolList, { apSchoolCount } from '../../components/ApSchoolList'

const NAV = [
  { id: 'history', label: 'Our History' },
  { id: 'ap-cyclone', label: 'AP Cyclone Relief 1996' },
  { id: 'tsunami', label: 'Tsunami Relief 2004' },
  { id: 'operation-care', label: 'Operation Care' },
  { id: 'catastrophe-fund', label: 'Catastrophe Fund' },
  { id: 'exchange', label: 'Teacher Exchange' },
  { id: 'publications', label: 'Publications' },
]

function JumpNav() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-2">
        {NAV.map(n => (
          <a key={n.id} href={`#${n.id}`} onClick={e => { e.preventDefault(); document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth' }) }}
            className="rounded-full px-4 py-2 text-xs sm:text-sm font-700" style={{ background: 'rgba(13,43,69,0.06)', color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>
            {n.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function History() {
  const facts = [
    { year: '1988', text: 'Dr. K.V. Rao starts India Network as a small group — the first electronic network of Asian Indians in the world, delivering publications to members by e-mail.' },
    { year: '1994', text: 'The Immigration Law Forum and the Personals Network are launched for members.' },
    { year: '1995', text: 'The India Economic Forum (INDIA-E) begins distributing economic news about India.' },
    { year: '1996', text: 'The India Network Foundation is established as an independent non-profit foundation in July 1996, guided by a board of trustees with Dr. K.V. Rao as President.' },
  ]
  return (
    <section id="history" className="py-20 bg-white" style={{ scrollMarginTop: 72 }}>
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        <Reveal>
          <span className="inline-block rounded-full text-xs font-700 px-4 py-1.5 mb-4" style={{ background: '#F47C20', color: 'white' }}>Our History</span>
          <h2 className="text-3xl font-800 mb-5" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>A Nonprofit Serving the Asian Indian Community</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
            <p>The India Network Foundation is a nonprofit, charitable, educational and community organization founded by Dr. K.V. Rao to serve the Asian Indian community around the world and to help developmental projects in India.</p>
            <p>INF is a tax-exempt organization under section 501(c)(3) of the U.S. Internal Revenue Code. It strives to provide stable network resources, support research on the Asian Indian community, meet the social and cultural needs of immigrants, and increase awareness of India and Indian culture abroad.</p>
            <p>INF initiated a Group Health Insurance Plan for visiting parents, students and temporary workers. In the past, it also funded qualified students from India pursuing higher education in the United States.</p>
          </div>
        </Reveal>
        <Reveal className="space-y-4">
          {facts.map(f => (
            <div key={f.year} className="flex gap-4 rounded-2xl p-5" style={{ background: '#FFF9F3' }}>
              <div className="text-xl font-800 shrink-0 w-16" style={{ color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>{f.year}</div>
              <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>{f.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function ApCyclone() {
  const schoolCount = apSchoolCount
  const items = [
    { icon: '🗄️', title: 'Steel Almirahs', desc: 'Godrej-type steel cupboards with safes, made locally, so schools have a secure place for student records.' },
    { icon: '🗺️', title: 'Laminated Maps', desc: 'World, India and Andhra Pradesh maps — replacing paper maps destroyed by floods, cyclones and rats.' },
    { icon: '💧', title: 'Drinking Water', desc: 'Stainless steel water drums with glasses to provide safe drinking water for children.' },
    { icon: '🏠', title: 'Roof Repairs', desc: 'Asbestos sheets for schools whose roofs were damaged and where government funds were not available.' },
  ]
  const photos = ['ap-hsduvva1.jpg', 'ap-hsduvva3.jpg', 'ap-school.jpg', 'ap-korimilli4.jpg', 'ap-c_house.gif', 'ap-crane.gif', 'ap-school3.jpg', 'ap-tree1.jpg']
  return (
    <section id="ap-cyclone" className="py-20" style={{ background: '#FFF9F3', scrollMarginTop: 72 }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionTitle title="Andhra Pradesh Cyclone Relief — 1996" sub="East & West Godavari Districts, Andhra Pradesh" />
          <div className="grid lg:grid-cols-2 gap-10 mb-12">
            <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <p>In response to a call from the Chief Minister of Andhra Pradesh after the November 1996 cyclone, INF launched a fund-raising campaign for the victims. As individuals had already been helped by government and non-governmental agencies, INF decided to focus on <strong>primary education and schools</strong>.</p>
              <p>In December 1996, Dr. K.V. Rao spent three and a half weeks in Andhra Pradesh at his own expense, visiting as many as 150 schools and villages in remote areas to examine the damage and decide how best to rebuild. INF also bought school sites in two villages and part-funded new buildings where the government matched the contribution.</p>
              <p>District Collector Sri D. Ramakrishna, IAS, of West Godavari extended great support, and local leaders, including the MLA from Tanuku, pledged matching grants for INF's work.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: '150', l: 'Schools & villages visited' },
                { v: '~400', l: 'Elementary schools to be equipped' },
                { v: String(schoolCount), l: 'Schools listed as receiving help' },
                { v: '2', l: 'Districts — East & West Godavari' },
              ].map(s => (
                <div key={s.l} className="rounded-2xl p-5 text-center" style={{ background: '#0D2B45' }}>
                  <div className="text-2xl sm:text-3xl font-800 mb-1" style={{ color: '#F47C20' }}>{s.v}</div>
                  <div className="text-xs sm:text-sm text-white/70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {items.map(i => (
              <div key={i.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="text-3xl mb-3">{i.icon}</div>
                <h3 className="font-800 mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{i.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {photos.map(p => (
              <div key={p} className="rounded-xl overflow-hidden h-32 sm:h-44">
                <img src={`/images/inf/${p}`} alt="Andhra Pradesh cyclone relief" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            ))}
          </div>
          <ApSchoolList />
          <p className="text-sm text-gray-500 mt-6">Read the full story on the <Link to="/projects/past/andhra-pradesh-cyclone-relief-1996" className="underline" style={{ color: '#F47C20' }}>Andhra Pradesh Cyclone Relief 1996</Link> page, and see the follow-up projects on the <Link to="/projects/past/andhra-pradesh-projects" className="underline" style={{ color: '#F47C20' }}>Andhra Pradesh Projects</Link> page.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Tsunami() {
  const focus = [
    { icon: '📚', title: 'Education of Children', desc: 'Helping children in affected areas continue their education.' },
    { icon: '🏡', title: 'Homes for Orphans', desc: 'Helping adoption agencies find homes for orphaned children.' },
    { icon: '🎣', title: 'Livelihoods', desc: 'Providing fishermen and women with nets and other equipment needed for their livelihood.' },
  ]
  return (
    <section id="tsunami" className="py-20 bg-white" style={{ scrollMarginTop: 72 }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionTitle title="Tsunami Relief Project — 2004" sub="Andhra Pradesh and Tamil Nadu" />
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <p>On 26 December 2004, a tsunami killed more than 100,000 people in nations around the Indian Ocean. In India, the Andaman Islands and the coastal areas of Tamil Nadu, Andhra Pradesh and Kerala took a heavy toll.</p>
              <p>In Andhra Pradesh, the districts of Krishna, Guntur and Nellore saw 104 deaths and losses of Rs. 32.5 crores. In Tamil Nadu, more than 6,200 people died in the coastal areas, with Nagapattinam the worst hit.</p>
              <p>Every dollar contributed, or matched by a donor's employer, was used to help tsunami victims in India — in keeping with INF's practice of providing direct help to victims and affected areas.</p>
              <p><Link to="/projects/past/tsunami-relief-2004" className="underline font-600" style={{ color: '#F47C20' }}>Read more about the Tsunami Relief Project →</Link></p>
            </div>
            <div className="space-y-4">
              {focus.map(f => (
                <div key={f.title} className="flex gap-4 rounded-2xl p-5" style={{ background: '#FFF9F3' }}>
                  <div className="text-2xl">{f.icon}</div>
                  <div>
                    <h3 className="font-800 mb-1" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{f.title}</h3>
                    <p className="text-sm text-gray-600">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function OperationCare() {
  const families = [
    { state: 'Haryana & Punjab', n: 100 },
    { state: 'Rajasthan', n: 56 },
    { state: 'Kerala, Karnataka & Goa', n: 15 },
    { state: 'Gujarat', n: 10 },
    { state: 'Andhra Pradesh', n: 9 },
    { state: 'Orissa', n: 3 },
  ]
  return (
    <section id="operation-care" className="py-20" style={{ background: '#0D2B45', scrollMarginTop: 72 }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionTitle light title="Operation Care — Kargil 1999" sub="Funds collected at the request of members and disbursed in July and August 1999" />
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="text-3xl sm:text-4xl font-800 mb-1" style={{ color: '#F47C20' }}>Rs. 10,000</div>
              <div className="text-white/70 text-sm">to each widow / next of kin of soldiers killed</div>
            </div>
            <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="text-3xl sm:text-4xl font-800 mb-1" style={{ color: '#F47C20' }}>Rs. 5,000</div>
              <div className="text-white/70 text-sm">to each wounded soldier</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {families.map(f => (
              <div key={f.state} className="rounded-xl p-4" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-2xl font-800 text-white">{f.n}</div>
                <div className="text-white/60 text-sm">families — {f.state}</div>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-sm leading-relaxed">INF also supported wounded soldiers and equipment at the Army Base Hospital and the R &amp; R Hospital in New Delhi, and the Army Base Hospital in Udhampur. As governments and the public in India were also providing substantial support, INF proposed a trust fund for the education of the children of fallen soldiers. <Link to="/projects/past/kargil-operation-care" className="underline" style={{ color: '#F47C20' }}>Read the full Operation Care story →</Link></p>
        </Reveal>
      </div>
    </section>
  )
}

function CatastropheFund() {
  const uses = ['Repatriation of the remains of people who die in accidents', 'Funeral expenses', 'Help for the family of the deceased, depending on the circumstances', 'Loans for people who must travel to India in an emergency', 'Other expenses arising from sudden developments', 'Organizing relief from local school foundations', 'Guidance and counselling for students facing emergencies']
  return (
    <section id="catastrophe-fund" className="py-20 bg-white" style={{ scrollMarginTop: 72 }}>
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        <Reveal>
          <span className="inline-block rounded-full text-xs font-700 px-4 py-1.5 mb-4" style={{ background: '#2E8B57', color: 'white' }}>Community Support</span>
          <h2 className="text-3xl font-800 mb-5" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>The Catastrophe Fund</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
            <p>India Network often receives calls for help from Indian student associations in the US and other countries dealing with local tragedies involving Indian students. Funds are often needed immediately — faster than members spread across the world can respond.</p>
            <p>The Catastrophe Fund helps meet expenses when tragedy strikes people who have neither their own resources nor proper insurance. It does not cover medical expenses, but directs people to channels where they can receive proper aid.</p>
            <p>Contributions are tax-deductible in the United States and fully accounted for. Checks may be made payable to "India Network Foundation (C-Fund)".</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl p-6 md:p-8" style={{ background: '#FFF9F3' }}>
            <h3 className="font-800 mb-4" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>The fund is used exclusively for:</h3>
            <ul className="space-y-3">
              {uses.map(u => (
                <li key={u} className="flex gap-3 text-sm text-gray-600"><span style={{ color: '#F47C20' }}>✓</span>{u}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Exchange() {
  return (
    <section id="exchange" className="py-20" style={{ background: '#FFF9F3', scrollMarginTop: 72 }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionTitle title="Teacher Exchange Program" sub="A proposal to strengthen school curriculum in India" />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: 'The Idea', d: 'Teachers of grades 7 to 12 from recognized schools, colleges or universities in India, with good English skills, spend time at Lake Highland Preparatory School in Florida — one of the finest private schools in the state.' },
              { t: 'How It Works', d: 'A member donates funds and suggests at least three teachers. The INF board, with Lake Highland Preparatory School, selects a suitable candidate. INF provides the scholarship and travel; the school sponsors the J-1 exchange visa.' },
              { t: 'The Cost', d: 'An estimated minimum of $2,500 for a two-week visit, covering travel, expenses and a modest fellowship. Members can also support a US teacher visiting a school in India.' },
            ].map(c => (
              <div key={c.t} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-800 mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{c.t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Publications() {
  const pubs = [
    { name: 'India News Network (INDIA-L)', since: 'Nov 1988', desc: 'News related to India and items of interest to Indians living abroad, published most weekdays.' },
    { name: 'India Discussion Digest (INDIA-D)', since: 'Nov 1988', desc: 'A discussion digest for members on India-related topics, published most weekdays.' },
    { name: 'India Economic Forum (INDIA-E)', since: 'Jun 1995', desc: 'Economic news for members interested in developments and investment opportunities in India.' },
    { name: 'Telugu Digest', desc: 'Andhra Pradesh regional news for Telugu-speaking members.' },
    { name: 'Immigration Law Forum (IMMNET)', since: '1994', desc: 'Answers and updates on immigration law, provided as a community service by immigration counsel Sheela Murthy.' },
    { name: 'Jobs Bazaar', desc: 'An employment bulletin with job listings for the Indian community in the US and elsewhere.' },
    { name: 'Matrimonial Digest', since: 'Sep 1994', desc: 'Started as the Personals Network; dedicated to matrimonial listings since 1999.' },
    { name: 'Faculty Network', desc: 'A list open to faculty of Indian origin working in academic institutions around the world.' },
  ]
  return (
    <section id="publications" className="py-20 bg-white" style={{ scrollMarginTop: 72 }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionTitle title="Publications & Digests" sub="Electronic publications delivered to members' mailboxes since 1988" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pubs.map(p => (
              <div key={p.name} className="rounded-2xl p-5" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.08)' }}>
                {p.since && <span className="inline-block rounded-full text-xs font-700 px-2.5 py-0.5 mb-2" style={{ background: 'rgba(244,124,32,0.12)', color: '#F47C20' }}>Since {p.since}</span>}
                <h3 className="font-800 text-sm mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{p.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function InfInitiativesPage() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1800&h=700&fit=crop&auto=format"
        title="INF Initiatives"
        intro="The history, relief efforts, community funds and publications of the India Network Foundation since 1988."
        crumbs={[{ label: 'Projects', to: '/projects/inf-projects' }, { label: 'INF Initiatives' }]}
      />
      <JumpNav />
      <History />
      <ApCyclone />
      <Tsunami />
      <OperationCare />
      <CatastropheFund />
      <Exchange />
      <Publications />
      <OrangeCta
        title="Support Our Initiatives"
        text="All contributions to India Network Foundation are tax-exempt in the United States."
        links={[{ label: 'Make a Donation', to: '/donate' }, { label: 'Past Projects', to: '/projects/past-projects' }]}
      />
    </div>
  )
}
