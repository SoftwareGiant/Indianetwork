import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'

function PageHero() {
  return (
    <section className="relative min-h-[420px] flex items-end">
      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&h=700&fit=crop&auto=format"
        alt="Member Benefits"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.4) 60%, transparent 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 lg:pt-40 pb-12 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-white">Members</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Member Benefits</h1>
        <p className="text-white/80 text-lg max-w-xl">Members get access to our monthly newsletter, health care programs, travel services and many other benefits.</p>
      </div>
    </section>
  )
}

const BENEFITS = [
  {
    logo: '/images/inf/hertz.png',
    tag: 'Car Rental',
    title: 'Discounted Rental Car Rates',
    desc: [
      "Save up to 20% off Business Travel Rates when you use Hertz with the India Network Foundation's membership.",
      'Enjoy savings and benefits wherever you rent — at the airport or locally. With 1,000 airport locations and over 1,200 locations across the country, save anytime you travel.',
    ],
    cta: 'Enroll with Hertz',
    href: 'https://link.hertz.com/link/goldcorp/goldCorpRedirectView.jsp?goldcorpType=bapgold',
  },
  {
    logo: '/images/inf/budget.png',
    tag: 'Car Rental',
    title: 'Budget Fastbreak® Service',
    desc: [
      "Skip the lines and go straight to your car with Budget's complimentary Fastbreak® Service.",
      'Keep all your rental preferences on file, find your car waiting at a convenient parking spot, and drive the newest, lowest-mileage cars.',
    ],
    cta: 'Enroll in Fastbreak',
    href: 'https://www.budget.com/en/loyalty-profile/fastbreak/enrollment',
  },
  {
    logo: '/images/inf/inf-travel.png',
    tag: 'Air Travel',
    title: 'Unpublished, Discounted Airfares',
    desc: [
      'The Cheaper Fares Program makes airfare more affordable for Indians travelling to and from India — helping families bring stories, wisdom and culture to the younger generation of Indians in North America.',
      'Members submit a travel inquiry to India Network Travel, and a team member searches for the cheapest available ticket within 24 hours.',
    ],
    cta: 'Send a Travel Inquiry',
    href: '/contact',
  },
  {
    logo: '/images/inf/insurance-logo.png',
    tag: 'Health Insurance',
    title: 'India Network Health Insurance',
    desc: [
      'Members can enroll their visitors in health insurance sponsored by the Foundation. India Network Health Insurance (KV Rao Insurance) provides visitor medical insurance for parents, relatives, students and temporary workers travelling to the United States.',
      'Grown out of need from the community, the plans cover all age groups and full pre-existing conditions.',
    ],
    cta: 'Learn About Visitor Insurance',
    href: '/projects/travel-insurance',
  },
]

function Benefits() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Member Benefits Include</h2>
            <p className="text-gray-500 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Exclusive savings and services for India Network Foundation members</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BENEFITS.map(b => (
              <div key={b.title} className="rounded-2xl p-8 flex flex-col shadow-sm" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.08)' }}>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="h-14 flex items-center">
                    <img src={b.logo} alt={b.title} className="max-h-14 max-w-[160px] object-contain" />
                  </div>
                  <span className="rounded-full text-xs font-700 px-3 py-1" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>{b.tag}</span>
                </div>
                <h3 className="font-800 text-xl mb-3" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{b.title}</h3>
                <div className="space-y-3 text-sm text-gray-600 flex-1 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {b.desc.map(d => <p key={d}>{d}</p>)}
                </div>
                {b.href.startsWith('/') ? (
                  <Link
                    to={b.href}
                    className="self-start rounded-full px-6 py-2.5 text-sm font-700"
                    style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}
                  >
                    {b.cta} →
                  </Link>
                ) : (
                  <a
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start rounded-full px-6 py-2.5 text-sm font-700"
                    style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}
                  >
                    {b.cta} →
                  </a>
                )}
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          {[
            { stat: '150K+', label: 'Current Members' },
            { stat: '20%', label: 'Off Hertz Business Rates' },
            { stat: '24 hrs', label: 'Airfare Search Turnaround' },
            { stat: 'All Ages', label: 'Visitor Insurance Coverage' },
          ].map(item => (
            <div key={item.label}>
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
        <h2 className="text-3xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Sign Up for Membership</h2>
        <p className="text-white/80 mb-8 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>Join more than 150,000 members of the India Network Foundation community.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}>Contact Us to Join</Link>
          <Link to="/projects/travel-insurance" className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Manrope, sans-serif' }}>Visitor Health Insurance</Link>
        </div>
      </div>
    </section>
  )
}

export default function MembersPage() {
  return (
    <div>
      <PageHero />
      <Benefits />
      <Stats />
      <Cta />
    </div>
  )
}
