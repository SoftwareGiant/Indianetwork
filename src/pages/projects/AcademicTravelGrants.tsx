import { Link } from 'react-router'
import { useInView } from '../../hooks/useInView'

function PageHero() {
  return (
    <section className="relative min-h-[420px] flex items-end">
      <img
        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1800&h=800&fit=crop&auto=format"
        alt="Academic Travel Grants"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.4) 60%, transparent 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 lg:pt-40 pb-12 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/projects/inf-projects" className="hover:text-white">Projects</Link>
          <span>/</span>
          <span className="text-white">Academic Travel Grants</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Travel Grants to Academics in India</h1>
        <p className="text-white/80 text-lg max-w-xl">Helping India-based researchers present their papers at national and international conferences held in the United States.</p>
      </div>
    </section>
  )
}

function AboutProgram() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/inf/conference.jpg"
              alt="Academic conference"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="inline-block rounded-full text-xs font-700 px-4 py-1.5 mb-4" style={{ background: '#F47C20', color: 'white', fontFamily: 'Manrope, sans-serif' }}>About the Program</span>
            <h2 className="text-3xl font-800 mb-6" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Bridging Indian Research with the World</h2>
            <div className="space-y-4 text-sm text-gray-600" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <p>Academic Travel Grants are designed to help India-based researchers present their papers at national and international conferences held in the United States. The program is open to all university faculty and doctoral program students in India.</p>
              <p>The grants are made possible by a generous donation from Dr. K.V. Rao and the India Network Health Insurance Program. Peer-reviewed presentations are given preference over conferences with automatic invitations. Poster presentations are not eligible at this time.</p>
              <div>
                <h3 className="font-700 mb-1" style={{ color: '#0D2B45' }}>What the Grant Covers</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Travel to the conference</li>
                  <li>Hotel and other conference-related actual expenses</li>
                  <li>Medical travel insurance for one month under India Network Health Insurance</li>
                </ul>
              </div>
              <p>No stipends or funds for preparation of research papers are provided. Preference is given to participants who have received partial support from their home institutions or conference organizers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const WHO_CAN_APPLY = [
  {
    icon: '🎓',
    title: 'Doctoral Students',
    desc: 'Students enrolled in doctoral programs at universities in India whose paper has been accepted for presentation at a meeting in North America.',
  },
  {
    icon: '🏛️',
    title: 'University Faculty',
    desc: 'Faculty at universities in India presenting peer-reviewed research at national or international conferences in the United States.',
  },
  {
    icon: '🔬',
    title: 'Early-Career Researchers',
    desc: 'Researchers and academics early in their career can request small grants of $2,500 or less as seed funding for bigger project proposals.',
  },
]

function WhoCanApply() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20" style={{ background: '#FFF9F3' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Who Can Apply</h2>
            <p className="text-gray-500 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>The program is open to scientists in all fields in South Asia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHO_CAN_APPLY.map(item => (
              <div key={item.title} className="rounded-2xl p-8 bg-white shadow-sm">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-800 text-xl mb-3" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const TIMELINE_STEPS = [
  { step: '01', label: 'Cover Letter & CV', desc: 'A cover letter with your curriculum vitae' },
  { step: '02', label: 'Abstract & Acceptance', desc: 'Abstract of the paper, conference/session information and a copy of the acceptance letter from the session chair' },
  { step: '03', label: 'Recommendations', desc: 'Two recommendation letters — these can be sent directly to the Foundation office under separate cover' },
  { step: '04', label: 'Budget & Leave Letter', desc: 'Budget and other funding sought or approved (in US dollars), plus a letter from your institution approving leave' },
]

function GrantDetails() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div>
            <h2 className="text-3xl font-800 mb-6" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Grant Details</h2>
            <div className="space-y-5 text-sm text-gray-600" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <div className="rounded-2xl p-6" style={{ background: '#FFF9F3' }}>
                <h3 className="font-700 text-base mb-2" style={{ color: '#0D2B45' }}>Small Grant Requests</h3>
                <p>Small grant awards are <span className="font-700" style={{ color: '#F47C20' }}>$2,500 or less</span>, for one-time projects or activities of limited duration. Proposals should be matched by the parent institution, in kind or in dollars.</p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: '#FFF9F3' }}>
                <h3 className="font-700 text-base mb-2" style={{ color: '#0D2B45' }}>Application Deadlines</h3>
                <p>Travel grant applications must be submitted at least twelve weeks before the conference. Small grant requests should arrive at least 90 days before the activity starts.</p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: '#FFF9F3' }}>
                <h3 className="font-700 text-base mb-2" style={{ color: '#0D2B45' }}>Foundation Recognition</h3>
                <p>When a grant is awarded, all presentations, publications and printed materials must acknowledge the Foundation's support in a prominent manner.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-800 mb-6" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>How to Apply</h2>
            <div className="space-y-5">
              {TIMELINE_STEPS.map((item, idx) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-800 text-white" style={{ background: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-700" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{item.label}</h3>
                    <p className="text-sm text-gray-600 mt-0.5" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-6 mt-8 text-sm text-gray-600" style={{ background: '#FFF9F3', fontFamily: 'Manrope, sans-serif' }}>
              <p className="mb-2">Prepare three sets of your application and mail them to our head office:</p>
              <p className="font-700" style={{ color: '#0D2B45' }}>India Network Foundation<br />7065 Westpointe Blvd, Suite 208<br />Orlando, FL 32835, USA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PAST_AWARDEES = [
  { year: '2009', name: 'Sambit Panigrahi', detail: "\"Nature as Woman and Woman as Nature: The Eco-sexual Politics of Colonization in Joseph Conrad's Fiction\" — The Green Nineteenth Century Conference, Milwaukee, WI" },
  { year: '2009', name: 'N. Ravi Kumar', detail: 'Computers and Rural Development — equipment grant to an MCA student' },
  { year: '2008', name: '15 Research Scholars', detail: "National Conference on \"Emerging Trends in Computer Science and Engineering\", Sri Padmavathi Women's University" },
  { year: '2007', name: 'Pritee Sharma, IIT Mumbai', detail: '"Agricultural Productivity in India: Role of Institutional and Environmental Factors" — East West Center Graduate Student Conference, Honolulu' },
  { year: '2007', name: 'Ashish K. Mishra, IIT Kanpur', detail: '"Redefining Vulnerabilities: A Study of Men in the Wake of HIV Epidemic in Mumbai" — Population Association of America, New York' },
  { year: '2007', name: 'T.V. Sekhar, IIPS Mumbai', detail: '"Communicating with Policy Makers About Population and Health" — East-West Center, Hawaii' },
  { year: '2007', name: 'Vijay Sarode, Mulund College of Commerce', detail: '"Maternal Care Among Reproductive Women in Slums in Greater Mumbai" — Population Association of America, New York' },
  { year: '2007', name: 'Sarmishtha Palit Sagar, NML Jamshedpur', detail: '"Non-linear Ultrasonic to Assess Localized Plastic Deformation During High Cycle Fatigue" — Colorado School of Mines' },
  { year: '2006', name: 'Dr. Sivakami Muthusamy', detail: '"Are Working Mothers in India Investing Less Time in the Next Generation?" — Population Association of America, Los Angeles' },
  { year: '2006', name: 'Dr. Ajoy Kumar Ray, NML Jamshedpur', detail: '3rd International Brazing and Soldering Conference, Texas' },
  { year: '2006', name: 'Dr. D. Selvi, Tamil Nadu Agricultural University', detail: '18th World Congress of Soil Sciences, Philadelphia' },
  { year: '2006', name: 'Dr. B. Narasimha Murthy, National Institute of Epidemiology', detail: 'XXIII International Biometric Conference' },
  { year: '2006', name: 'Dr. Rakesh Kumar Bhardwaj, Dayal Singh College', detail: '19th IUPAC International Conference on Chemical Thermodynamics, Boulder, CO' },
]

function PastAwardees() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20" style={{ background: '#FFF9F3' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Past Awardees</h2>
            <p className="text-gray-500 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>India Network Travel Grants Program, 2006 – 2009</p>
          </div>
          <div className="rounded-2xl bg-white shadow-sm p-6 md:p-8">
            {PAST_AWARDEES.map(item => (
              <div key={item.name + item.year} className="flex items-start gap-4 py-4" style={{ borderBottom: '1px solid rgba(13,43,69,0.08)' }}>
                <span className="rounded-full text-xs font-700 px-3 py-1 shrink-0" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>{item.year}</span>
                <div>
                  <div className="font-700 text-sm" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{item.name}</div>
                  <div className="text-sm text-gray-600 mt-0.5" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20" style={{ background: '#0D2B45' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          {[
            { stat: '27', label: 'Awardees 2006–2009' },
            { stat: '12 wks', label: 'Apply Before Conference' },
            { stat: '1 month', label: 'Medical Insurance Included' },
          ].map(item => (
            <div key={item.stat}>
              <div className="text-4xl md:text-5xl font-800 mb-2" style={{ color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>{item.stat}</div>
              <div className="text-white/70 font-700" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.label}</div>
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
        <h2 className="text-3xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Apply for a Travel Grant</h2>
        <p className="text-white/80 mb-8 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>Send your application at least twelve weeks before your conference. Contact our office with any questions.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}>Apply Now</Link>
          <Link to="/programs/education" className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Manrope, sans-serif' }}>Learn More</Link>
        </div>
      </div>
    </section>
  )
}

export default function AcademicTravelGrantsPage() {
  return (
    <div>
      <PageHero />
      <AboutProgram />
      <WhoCanApply />
      <GrantDetails />
      <PastAwardees />
      <Stats />
      <Cta />
    </div>
  )
}
