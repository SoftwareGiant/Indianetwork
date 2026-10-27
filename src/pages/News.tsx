import { useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'

function PageHero() {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: 480 }}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1800&h=700&fit=crop&auto=format" alt="News and events" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.55) 70%, rgba(13,43,69,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.85) 0%, transparent 55%)' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-36 lg:pt-44 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">News & Events</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(244,124,32,0.2)', color: '#F47C20', fontWeight: 700 }}>Latest Updates</span>
        <h1 className="text-white font-800" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>News & Events</h1>
        <p className="text-white/65 text-lg mt-3 max-w-xl">Updates from the Foundation, stories from our projects, and ways to get involved.</p>
      </div>
    </section>
  )
}

// ── Featured Article ──────────────────────────────────────────────────────────
function FeaturedNews() {
  const { ref, inView } = useInView(0.2)
  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-700 uppercase tracking-widest mb-2" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Featured Story</span>
            <h2 className="font-800 text-3xl" style={{ fontWeight: 800, color: '#0D2B45' }}>Top Story</h2>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(13,43,69,0.12)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div className="relative" style={{ minHeight: 400 }}>
            <img src="https://images.unsplash.com/photo-1665649998055-bbd272dacad7?w=900&h=600&fit=crop&auto=format" alt="Immigration news" className="w-full h-full object-cover" style={{ minHeight: 400 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.3) 0%, transparent 50%)' }} />
            <span className="absolute top-6 left-6 px-3 py-1.5 rounded-full text-xs font-700 text-white uppercase tracking-wider" style={{ background: '#2E8B57', fontWeight: 700 }}>Immigration</span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14" style={{ backgroundColor: '#0D2B45' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-600 uppercase tracking-widest" style={{ color: '#F47C20', fontWeight: 600 }}>October 11, 2018</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-xs text-white/40">3 min read</span>
            </div>
            <h3 className="text-white font-800 text-2xl lg:text-3xl leading-snug mb-5" style={{ fontWeight: 800 }}>
              Indian-American Congressman Champions H-1B Visa Holders in New Bill
            </h3>
            <p className="text-white/55 text-base leading-relaxed mb-8">
              Congressman Raja Krishnamoorthi has proposed the Immigration Innovation Act of 2018, which would let H-1B workers move between jobs, remove per-country caps on employment-based green cards and fund STEM education. The bill does not address health insurance for H-1B workers — India Network Health Insurance offers affordable short-term gap coverage from 5 days to 1 year.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-base">✍️</div>
                <div>
                  <div className="text-white text-sm font-600" style={{ fontWeight: 600 }}>India Network Foundation</div>
                  <div className="text-white/40 text-xs">Immigration Forum</div>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full text-sm font-700 flex items-center gap-2 transition-all duration-200 hover:scale-105" style={{ background: '#F47C20', color: 'white', fontWeight: 700 }}>
                Read More
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h7M8 4l3 3-3 3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Latest News Grid ──────────────────────────────────────────────────────────
const articles = [
  { cat: 'News', date: 'Sep 5, 2000', read: '4 min', img: 'https://images.unsplash.com/photo-1708593343442-7595427ddf7b?w=600&h=400&fit=crop&auto=format', title: 'Dr. K.V. Rao Invited to Serve on the Census Advisory Committee', excerpt: 'U.S. Commerce Secretary Norman Y. Mineta invited INF President Dr. K.V. Rao to serve on the Census Advisory Committee on the Asian Population.' },
  { cat: 'Education', date: '2009', read: '3 min', img: '/images/inf/conference.jpg', title: 'India Network Travel Grants Program 2009 Awardees', excerpt: 'Grants awarded to Sambit Panigrahi for a paper at The Green Nineteenth Century Conference, Milwaukee, and an equipment grant to N. Ravi Kumar.' },
  { cat: 'Community', date: 'Ongoing', read: '2 min', img: '/images/inf/water-plant-2.jpg', title: 'INF Commits to Build 10 Mineral Water Plants in Andhra Pradesh', excerpt: 'Each plant produces 3,000 liters of clean water a day for up to 1,500 people. Construction costs 2 Lakhs, with maintenance of about Rs. 30,000 a year.' },
  { cat: 'Disaster Relief', date: '2001', read: '3 min', img: '/images/inf/gujarat-quake-3.jpg', title: 'Over $100,000 Raised to Rebuild Schools in Gujarat', excerpt: 'After the 7.9 magnitude Republic Day earthquake, INF raised funds to construct new school houses and collected clothes and food for villagers.' },
  { cat: 'Disaster Relief', date: 'Nov 1999', read: '5 min', img: '/images/inf/orissa-1.jpg', title: 'Rice Distributed to 1,000 Families After the Orissa Cyclone', excerpt: 'Under Project Director K. Balakrishna, INF delivered 10 kg bags of rice to remote tribal villages in Ganjam District that had received little aid.' },
  { cat: 'Culture', date: 'Ongoing', read: '2 min', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&auto=format', title: 'Book Reviews: Send Us Publications on India', excerpt: 'Recent books received include a biography of statistician C.R. Rao, "Population Policy and Reproductive Health in India" and "Indian Paper Money Since 1950".' },
]

const catColors: Record<string, string> = {
  News: '#0D2B45',
  Education: '#F47C20',
  Community: '#2E8B57',
  'Disaster Relief': '#F47C20',
  Culture: '#0D2B45',
}

function LatestNews() {
  const [activeFilter, setActiveFilter] = useState('All')
  const { ref, inView } = useInView(0.1)
  const filters = ['All', 'News', 'Education', 'Community', 'Disaster Relief', 'Culture']
  const filtered = activeFilter === 'All' ? articles : articles.filter(a => a.cat === activeFilter)

  return (
    <section ref={ref} style={{ backgroundColor: '#FFF9F3' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-700 uppercase tracking-widest mb-2" style={{ background: 'rgba(13,43,69,0.06)', color: '#0D2B45', fontWeight: 700 }}>Press Room</span>
            <h2 className="font-800 text-3xl" style={{ fontWeight: 800, color: '#0D2B45' }}>Latest News</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className="px-4 py-2 rounded-full text-xs font-600 transition-all duration-200"
                style={{ fontWeight: 600, background: activeFilter === f ? '#0D2B45' : 'white', color: activeFilter === f ? 'white' : '#0D2B45', border: '1px solid rgba(13,43,69,0.12)' }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a, i) => (
            <article key={a.title} className="bg-white rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: '0 2px 20px rgba(13,43,69,0.06)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.08}s` }}>
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-700 text-white uppercase tracking-wider" style={{ background: catColors[a.cat] || '#F47C20', fontWeight: 700 }}>{a.cat}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-400">{a.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-xs text-gray-400">{a.read} read</span>
                </div>
                <h3 className="font-700 text-base mb-3 leading-snug" style={{ color: '#0D2B45', fontWeight: 700 }}>{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{a.excerpt}</p>
                <div className="flex items-center gap-1.5 text-sm font-600" style={{ color: '#F47C20', fontWeight: 600 }}>
                  Read More
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M4 7h7M8 4l3 3-3 3" /></svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Upcoming Events ───────────────────────────────────────────────────────────
const events = [
  { icon: '✈️', title: 'Apply for an Academic Travel Grant', location: 'Mail to our Orlando office', desc: 'Applications must reach us at least twelve weeks before your conference. Three sets of your application are required.', type: 'Education', to: '/projects/academic-travel-grants' },
  { icon: '🎭', title: 'Community Organization Grants', location: 'For Indian associations in the US', desc: 'Submit your proposal at least six months before your event to host artists from India or promote traditional arts.', type: 'Culture', to: '/programs/cultural-preservation' },
  { icon: '🗺️', title: 'Sponsor a Map Set for a School', location: 'Schools anywhere in India', desc: 'Each laminated World, India and State map set costs $20. Name the school, or let INF choose one in need.', type: 'Education', to: '/projects/past/maps-project' },
  { icon: '🏫', title: 'Sponsor a Project in Andhra Pradesh', location: 'Godavari Districts, AP', desc: 'Help fund school buildings, a community center and girls high school repairs presented to INF.', type: 'Community', to: '/projects/past/andhra-pradesh-projects' },
]

function UpcomingEvents() {
  const { ref, inView } = useInView(0.2)
  const typeColors: Record<string, string> = { Education: '#0D2B45', Culture: '#2E8B57', Community: '#F47C20' }
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontWeight: 700 }}>Get Involved</span>
          <h2 className="font-800 text-3xl" style={{ fontWeight: 800, color: '#0D2B45' }}>Open Opportunities</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {events.map((e, i) => (
            <div key={e.title} className="rounded-2xl p-7 flex gap-6 group hover:-translate-y-0.5 transition-all duration-300" style={{ border: '1px solid rgba(13,43,69,0.08)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.1}s` }}>
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center" style={{ background: 'rgba(13,43,69,0.04)', border: '1px solid rgba(13,43,69,0.08)' }}>
                <span className="text-2xl">{e.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-700 text-base leading-snug" style={{ color: '#0D2B45', fontWeight: 700 }}>{e.title}</h3>
                  <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-700" style={{ background: `${typeColors[e.type] || '#F47C20'}15`, color: typeColors[e.type] || '#F47C20', fontWeight: 700 }}>{e.type}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 1C4.3 1 3 2.3 3 4c0 2.5 3 6 3 6s3-3.5 3-6c0-1.7-1.3-3-3-3z" /></svg>
                  {e.location}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{e.desc}</p>
                <Link to={e.to} className="inline-block px-5 py-2.5 rounded-full text-xs font-700 transition-all duration-200 hover:scale-105" style={{ background: '#0D2B45', color: 'white', fontWeight: 700 }}>Learn More →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Past Events Gallery ───────────────────────────────────────────────────────
const galleryPhotos = [
  { src: '/images/inf/gujarat-quake-3.jpg', caption: 'INF Primary School, Gujarat — 2001' },
  { src: '/images/inf/orissa-3.jpg', caption: 'Orissa Cyclone Relief — 1999' },
  { src: '/images/inf/water-plant-1.jpg', caption: 'Mineral Water Plant, Andhra Pradesh' },
  { src: '/images/inf/nonprofit.jpg', caption: 'School benches donated by INF' },
  { src: '/images/inf/hudhud-2.jpg', caption: 'Cyclone Hudhud relief' },
  { src: '/images/inf/andhra-duvva-2.jpg', caption: 'School project, Duvva, Andhra Pradesh' },
]

function PastGallery() {
  const { ref, inView } = useInView(0.1)
  return (
    <section ref={ref} style={{ backgroundColor: '#0D2B45' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(244,124,32,0.15)', color: '#F47C20', fontWeight: 700 }}>Gallery</span>
          <h2 className="text-white font-800 text-3xl" style={{ fontWeight: 800 }}>Moments from the Field</h2>
          <p className="text-white/50 text-base mt-3">Photos from India Network Foundation projects and relief efforts across India.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryPhotos.map((p, i) => (
            <div key={p.src} className="group relative rounded-xl overflow-hidden cursor-pointer" style={{ aspectRatio: '4/3', opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.95)', transition: `all 0.6s ease ${i * 0.08}s` }}>
              <img src={p.src} alt={p.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.85) 0%, transparent 60%)' }}>
                <span className="text-white text-xs font-500">{p.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (email.includes('@')) setSubscribed(true)
  }

  return (
    <section style={{ background: 'linear-gradient(135deg, #F47C20 0%, #e06010 100%)' }} className="py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 700 }}>Newsletter</span>
        <h2 className="text-white font-800 text-3xl mb-4" style={{ fontWeight: 800 }}>Stay in the Loop</h2>
        <p className="text-white/75 text-base mb-8 max-w-md mx-auto">Members get access to our monthly newsletter with Foundation news, projects and ways to get involved.</p>
        {subscribed ? (
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <span className="text-2xl">✅</span>
            <span className="text-white font-600 text-base" style={{ fontWeight: 600 }}>You're subscribed! Watch your inbox.</span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
              className="flex-1 px-5 py-4 rounded-xl text-gray-800 placeholder-gray-400 text-sm outline-none" />
            <button onClick={handleSubscribe}
              className="px-7 py-4 rounded-xl font-700 text-sm whitespace-nowrap transition-all duration-200 hover:scale-105"
              style={{ background: '#0D2B45', color: 'white', fontWeight: 700 }}>
              Subscribe
            </button>
          </div>
        )}
        <p className="text-white/45 text-xs mt-4">Unsubscribe anytime.</p>
      </div>
    </section>
  )
}

export default function NewsPage() {
  return (
    <>
      <PageHero />
      <FeaturedNews />
      <LatestNews />
      <UpcomingEvents />
      <PastGallery />
      <Newsletter />
    </>
  )
}
