import { useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'

function PageHero() {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: 520 }}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/flagged/photo-1577604981316-298e453a19dd?w=1800&h=900&fit=crop&auto=format" alt="Volunteers working together" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,43,69,0.9) 0%, rgba(13,43,69,0.5) 60%, rgba(13,43,69,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.85) 0%, transparent 55%)' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-36 lg:pt-44 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Volunteer</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(244,124,32,0.2)', color: '#F47C20', fontWeight: 700 }}>Join Us</span>
        <h1 className="text-white font-800 mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>Become a Volunteer</h1>
        <p className="text-white/70 text-lg max-w-xl leading-relaxed">
          Through the support of the Indian community, India Network Foundation volunteers have given countless hours to serve those less fortunate. Whether you have an hour a week or a month to give — your time changes lives.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <a href="#register" className="px-8 py-4 rounded-full text-white font-700 text-base transition-all duration-200 hover:scale-105" style={{ background: '#F47C20', fontWeight: 700 }}>Register Now</a>
          <a href="#opportunities" className="px-8 py-4 rounded-full text-white font-600 text-base hover:bg-white/20 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 600 }}>Browse Opportunities</a>
        </div>
      </div>
    </section>
  )
}

// ── Why Volunteer ─────────────────────────────────────────────────────────────
const whyCards = [
  { icon: '🌏', title: 'Global Community', desc: 'Join a community of more than 150,000 members across the United States and India who care about serving others.' },
  { icon: '📈', title: 'Real Impact', desc: 'Our volunteers have hand-delivered map sets to remote schools and distributed rice to cyclone-hit villages.' },
  { icon: '🎓', title: 'Skill Building', desc: 'Develop leadership, project management, cross-cultural communication, and specialized expertise.' },
  { icon: '🤝', title: 'Meaningful Connection', desc: 'Connect with communities, professionals, and Indian diaspora members who share your values.' },
]

function WhyVolunteer() {
  const { ref, inView } = useInView(0.2)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Why Volunteer</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>What You Gain</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map((c, i) => (
            <div key={c.title} className="rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.06)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.1}s` }}>
              <div className="text-4xl mb-5">{c.icon}</div>
              <h3 className="font-700 text-base mb-3" style={{ color: '#0D2B45', fontWeight: 700 }}>{c.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Opportunities ─────────────────────────────────────────────────────────────
const opportunities = [
  { icon: '📚', title: 'Education Support', mode: 'Remote & On-site', commitment: '4–8 hrs/week', desc: 'Help deliver map sets to schools, follow up on school building projects, and support travel grant applicants. Roles for educators, professionals, and students.', color: '#F47C20' },
  { icon: '🏥', title: 'Healthcare Camps', mode: 'On-site (India)', commitment: '1–4 weeks', desc: 'Medical professionals can help at free medical days and eye camps run by community centers we support in India.', color: '#2E8B57' },
  { icon: '🎉', title: 'Community Events', mode: 'On-site & Hybrid', commitment: '1–2 days/event', desc: 'Help organize cultural programs and community events, and support Indian associations hosting artists from India.', color: '#F47C20' },
  { icon: '⛑️', title: 'Disaster Relief', mode: 'On-site (India)', commitment: 'As needed', desc: 'Help distribute relief directly to families after cyclones, floods and earthquakes — as our volunteers did in Orissa in 1999.', color: '#2E8B57' },
  { icon: '💰', title: 'Fundraising', mode: 'Remote', commitment: 'Flexible', desc: 'Run peer fundraising campaigns, engage your network, and help us grow our donor community.', color: '#F47C20' },
  { icon: '🖥️', title: 'Administrative Support', mode: 'Remote', commitment: '2–5 hrs/week', desc: 'Communications, social media, data analysis, web development, and operational support for the team.', color: '#2E8B57' },
]

function Opportunities() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="opportunities" ref={ref} style={{ backgroundColor: '#0D2B45' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.15)', color: '#F47C20', fontWeight: 700 }}>Open Roles</span>
          <h2 className="text-white font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Volunteer Opportunities</h2>
          <p className="text-white/55 text-lg mt-4 max-w-xl mx-auto">Remote and on-site roles available across all experience levels and time commitments.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {opportunities.map((o, i) => (
            <div key={o.title} className="rounded-2xl p-7 group cursor-pointer hover:-translate-y-1 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.08}s` }}>
              <div className="text-3xl mb-4">{o.icon}</div>
              <h3 className="text-white font-700 text-lg mb-2" style={{ fontWeight: 700 }}>{o.title}</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs px-2.5 py-1 rounded-full font-600" style={{ background: 'rgba(244,124,32,0.15)', color: '#F47C20', fontWeight: 600 }}>{o.mode}</span>
                <span className="text-xs px-2.5 py-1 rounded-full font-600" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{o.commitment}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{o.desc}</p>
              <div className="flex items-center gap-1.5 text-sm font-600" style={{ color: o.color, fontWeight: 600 }}>
                Apply Now
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M4 7h7M8 4l3 3-3 3" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Process ───────────────────────────────────────────────────────────────────
function VolunteerProcess() {
  const { ref, inView } = useInView(0.2)
  const steps = [
    { num: '01', title: 'Register', desc: 'Fill out our volunteer registration form with your background, skills, and preferred commitment level.', icon: '📝' },
    { num: '02', title: 'Application Review', desc: 'Our volunteer coordinator reviews your application and matches you to the most suitable role.', icon: '🔍' },
    { num: '03', title: 'Orientation', desc: 'Attend a virtual orientation session to meet the team, learn about programs, and complete onboarding.', icon: '🎓' },
    { num: '04', title: 'Start Volunteering', desc: 'Begin your assignment. You will receive ongoing support from the INF team.', icon: '🚀' },
  ]
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(13,43,69,0.06)', color: '#0D2B45', fontWeight: 700 }}>How It Works</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>The Volunteer Process</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.12}s` }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px -translate-x-1/2 z-0" style={{ background: 'linear-gradient(to right, rgba(244,124,32,0.4), rgba(244,124,32,0.1))', width: 'calc(100% - 4rem)' }} />
              )}
              <div className="rounded-2xl p-7 bg-white relative z-10" style={{ boxShadow: '0 2px 20px rgba(13,43,69,0.06)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5" style={{ background: 'rgba(244,124,32,0.08)' }}>{s.icon}</div>
                <div className="text-xs font-700 uppercase tracking-widest mb-3" style={{ color: '#F47C20', fontWeight: 700 }}>Step {s.num}</div>
                <h3 className="font-700 text-lg mb-3" style={{ color: '#0D2B45', fontWeight: 700 }}>{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Volunteer Stories ─────────────────────────────────────────────────────────
const volStories = [
  { name: 'Maps Project Volunteers', role: 'Maharashtra, Gujarat & Karnataka', quote: 'India Network volunteers travelled to remote villages to keep our promise to deliver maps to schools anywhere in India. In some instances, sending a person with the maps was the only way.', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=200&fit=crop&auto=format' },
  { name: 'Orissa Relief Volunteers', role: 'Ganjam District, November 1999', quote: 'Volunteers and revenue staff helped INF distribute rice to 1,000 families. One volunteer, a physician and nephew of former President of India Sri V.V. Giri, joined the effort.', image: '/images/inf/orissa-4.jpg' },
  { name: 'Dr. K. Srinivasan & Mrs. Bharati Srinivasan', role: 'Operation Care, New Delhi 1999', quote: 'They helped prepare and personally deliver checks to wounded soldiers in the wards of the Army Base Hospital alongside Dr. K.V. Rao.', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&h=200&fit=crop&auto=format' },
]

function VolunteerStories() {
  const { ref, inView } = useInView(0.2)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontWeight: 700 }}>Volunteer Stories</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0D2B45' }}>From Our Volunteers</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {volStories.map((v, i) => (
            <div key={v.name} className="rounded-2xl p-8 flex flex-col" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.06)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ease ${i * 0.12}s` }}>
              <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1">{v.quote}</p>
              <div className="flex items-center gap-4">
                <img src={v.image} alt={v.name} className="w-12 h-12 rounded-full object-cover object-top" />
                <div>
                  <div className="font-700 text-sm" style={{ color: '#0D2B45', fontWeight: 700 }}>{v.name}</div>
                  <div className="text-gray-400 text-xs">{v.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Registration CTA ──────────────────────────────────────────────────────────
function RegisterCta() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', interest: '' })
  const interests = ['Education', 'Healthcare', 'Community Events', 'Disaster Relief', 'Fundraising', 'Admin Support']

  const handleSubmit = () => {
    if (form.name && form.email) setSent(true)
  }

  return (
    <section id="register" className="py-24 lg:py-32" style={{ background: 'linear-gradient(135deg, #F47C20 0%, #e06010 100%)' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-white font-800 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Ready to Begin?</h2>
          <p className="text-white/80 text-lg">Register your interest and our team will reach out to you.</p>
        </div>
        {sent ? (
          <div className="rounded-2xl p-6 sm:p-10 text-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white font-800 text-xl mb-2" style={{ fontWeight: 800 }}>You're registered!</h3>
            <p className="text-white/70 text-sm">Thank you, {form.name.split(' ')[0]}. We'll be in touch soon at <strong>{form.email}</strong>.</p>
          </div>
        ) : (
          <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-white/80 text-sm font-600 mb-1.5 block" style={{ fontWeight: 600 }}>Full Name <span style={{ color: 'rgba(255,255,255,0.9)' }}>*</span></label>
                <input type="text" placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/40 text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }} />
              </div>
              <div>
                <label className="text-white/80 text-sm font-600 mb-1.5 block" style={{ fontWeight: 600 }}>Email Address <span style={{ color: 'rgba(255,255,255,0.9)' }}>*</span></label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/40 text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }} />
              </div>
            </div>
            <div className="mb-5">
              <label className="text-white/80 text-sm font-600 mb-2 block" style={{ fontWeight: 600 }}>Area of Interest</label>
              <div className="flex flex-wrap gap-2">
                {interests.map(interest => (
                  <button key={interest} onClick={() => setForm(p => ({ ...p, interest }))}
                    className="px-4 py-2 rounded-full text-sm font-500 transition-all duration-200"
                    style={{ fontWeight: 500, background: form.interest === interest ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', color: 'white', border: form.interest === interest ? '1px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.2)' }}>
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleSubmit}
              className="w-full py-4 rounded-xl font-700 text-base transition-all duration-200 hover:scale-105"
              style={{ background: '#0D2B45', color: 'white', fontWeight: 700 }}>
              Register as Volunteer →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default function VolunteerPage() {
  return (
    <>
      <PageHero />
      <WhyVolunteer />
      <Opportunities />
      <VolunteerProcess />
      <VolunteerStories />
      <RegisterCta />
    </>
  )
}
