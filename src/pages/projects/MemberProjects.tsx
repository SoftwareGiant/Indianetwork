import { useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../../hooks/useInView'

function PageHero() {
  return (
    <section className="relative min-h-[420px] flex items-end">
      <img
        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1800&h=700&fit=crop&auto=format"
        alt="Member Projects"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.4) 60%, transparent 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 lg:pt-40 pb-12 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/projects/inf-projects" className="hover:text-white">Projects</Link>
          <span>/</span>
          <span className="text-white">Member Projects</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Member Initiated Projects</h1>
        <p className="text-white/80 text-lg max-w-xl">Members can direct their tax-deductible contributions to a developmental or educational project of their choice in India.</p>
      </div>
    </section>
  )
}

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '💡',
    title: 'Choose a Project',
    desc: 'Pick one of the projects presented to INF, or tell us about a developmental or educational project in India you would like to fund.',
  },
  {
    step: '02',
    icon: '💵',
    title: 'Send Your Contribution',
    desc: 'Send a tax-deductible contribution to India Network Foundation and indicate in your letter the project you would like the funds to support.',
  },
  {
    step: '03',
    icon: '🤝',
    title: 'Local Oversight',
    desc: "INF's Project Director in India takes personal responsibility for implementing the project according to the donor's wishes.",
  },
  {
    step: '04',
    icon: '📋',
    title: 'Report Back',
    desc: 'You receive a report on what has been done. Ten percent is retained to cover administrative, accounting and IRS filing costs.',
  },
]

function HowItWorks() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20" style={{ background: '#FFF9F3' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>How It Works</h2>
            <p className="text-gray-500 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>How a member-sponsored project works</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(item => (
              <div key={item.step} className="rounded-2xl p-7 bg-white shadow-sm relative">
                <div className="absolute top-5 right-5 text-3xl font-800" style={{ color: 'rgba(244,124,32,0.13)', fontFamily: 'Manrope, sans-serif' }}>{item.step}</div>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-800 text-lg mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProjectForm {
  name: string
  detail: string
  amount: string
}

function StartAProjectForm() {
  const [form, setForm] = useState<ProjectForm>({ name: '', detail: '', amount: '' })
  const [submitted, setSubmitted] = useState(false)

  const inputClass = "w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-colors"
  const inputStyle = { border: '1px solid rgba(13,43,69,0.15)', background: 'white' }
  const labelClass = "block text-sm font-700 mb-1.5"
  const labelStyle = { color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.detail.trim()) return
    setSubmitted(true)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="rounded-2xl shadow-xl p-6 md:p-12" style={{ background: 'white', border: '1px solid rgba(13,43,69,0.08)' }}>
          {!submitted ? (
            <>
              <h2 className="text-3xl font-800 mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Start a Project</h2>
              <p className="text-gray-500 mb-8 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>Have a project in mind that you would like to fund? Tell us about it and we will help you through the process.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={labelClass} style={labelStyle}>Your Name <span style={{ color: '#F47C20' }}>*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className={inputClass}
                    style={inputStyle}
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Project Detail <span style={{ color: '#F47C20' }}>*</span></label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Describe your project idea, purpose, target beneficiaries, location, and expected impact..."
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    value={form.detail}
                    onChange={e => setForm(p => ({ ...p, detail: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Estimated Budget (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-700" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>$</span>
                    <input
                      type="number"
                      min={0}
                      placeholder="Estimated budget required"
                      className={inputClass}
                      style={{ ...inputStyle, paddingLeft: '2rem' }}
                      value={form.amount}
                      onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full text-white font-700 text-base mt-2"
                  style={{ background: '#F47C20', fontFamily: 'Manrope, sans-serif' }}
                >
                  Submit Project
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl" style={{ background: 'rgba(46,139,87,0.1)' }}>✓</div>
              <h3 className="text-2xl font-800 mb-3" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Proposal Submitted!</h3>
              <p className="text-gray-600 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Thank you, <span className="font-700" style={{ color: '#F47C20' }}>{form.name}</span>! Your project proposal has been submitted. Our team will review it and get in touch with you.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', detail: '', amount: '' }) }}
                className="rounded-full px-8 py-3 text-sm font-700"
                style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}
              >
                Submit Another Proposal
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const MEMBER_PROJECTS = [
  {
    title: 'Elementary School Building, Duvva',
    location: 'Duvva, Andhra Pradesh',
    year: '1998',
    image: '/images/inf/andhra-duvva-2.jpg',
    description: 'Construction of an elementary school building in a backward class area of Duvva, Andhra Pradesh.',
    impact: 'Rs. 50,000 donated',
  },
  {
    title: 'Residence Hall for Women, Bangalore',
    location: 'Bangalore, Karnataka',
    year: '1999',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&auto=format',
    description: 'Construction of a residence hall for women by the Badaganadu Sangha, which provides hostel facilities free of cost to needy students.',
    impact: 'Rs. 93,150 donated',
  },
  {
    title: 'Library Building, Gonegandla',
    location: 'Gonegandla, Andhra Pradesh',
    year: '1999',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&auto=format',
    description: 'Funding towards the construction of a library building for the community of Gonegandla.',
    impact: 'Rs. 99,750 donated',
  },
]

const ALL_MEMBER_PROJECTS = [
  { amount: 'Rs. 4 Lakhs', text: 'Arogya Vara Prasadini Project', date: 'March 2001' },
  { amount: 'Rs. 1 Lakh', text: 'Nitya Annadanam Project', date: 'January 2001' },
  { amount: 'Rs. 5 Lakhs', text: 'Nitya Annadanam Project of the S.V. Temple, Tirupati', date: '1999' },
  { amount: 'Rs. 67,000', text: 'Shiksha Educational Charity, Bihar', date: '1999' },
  { amount: 'Rs. 1.2 Lakhs', text: 'Kidney transplant of a young person, Karnataka', date: '1999' },
  { amount: 'Rs. 53,000', text: 'Costs of a kidney transplant, Gujarat', date: '1999' },
  { amount: 'Rs. 2,000', text: 'Shanmukananda Fine Arts & Sangeetha Sabha, Mumbai', date: '1999' },
  { amount: 'Rs. 99,750', text: 'Construction of Library Building, Gonegandla, AP', date: '1999' },
  { amount: 'Rs. 93,150', text: 'Residence Hall for Women, Badaganadu Sangha, Bangalore', date: '1999' },
  { amount: 'Renovation', text: 'Renovation of Ammavari Temple, Andhra Pradesh', date: 'Feb 1999' },
  { amount: 'Relief', text: 'Help for fire accident victims in Pondicherry — four families received assistance to rebuild their homes', date: 'April 1999' },
  { amount: 'Rs. 50,000', text: 'Elementary School Building in a backward class area, Duvva, AP', date: '1998' },
  { amount: 'Rs. 2.8 Lakhs', text: 'Nitya Annadanam Project of the S.V. Temple, Tirupati', date: '1998' },
  { amount: 'Relief', text: 'Sri Ramakrishna Mission and Vivekananda Memorial, Gujarat, for cyclone victims', date: '1998–99' },
]

function FeaturedMemberProjects() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Member Projects in Action</h2>
            <p className="text-gray-500 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Projects made possible by contributions from our members.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEMBER_PROJECTS.map(project => (
              <div key={project.title} className="rounded-2xl overflow-hidden shadow-sm bg-white" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
                <div className="h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <span
                    className="inline-block rounded-full text-xs font-700 px-3 py-1 mb-3"
                    style={{ background: '#F47C20', color: 'white', fontFamily: 'Manrope, sans-serif' }}
                  >
                    {project.year}
                  </span>
                  <h3 className="font-800 text-base mb-1" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{project.title}</h3>
                  <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>{project.location}</p>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>{project.description}</p>
                  <span
                    className="inline-block rounded-full text-xs font-700 px-3 py-1.5"
                    style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontFamily: 'Manrope, sans-serif' }}
                  >
                    {project.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl p-8 md:p-10" style={{ background: '#FFF9F3', border: '1px solid rgba(13,43,69,0.08)' }}>
            <h3 className="text-2xl font-800 mb-6" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Member Initiated Donations</h3>
            <div className="grid md:grid-cols-2 gap-x-10">
              {ALL_MEMBER_PROJECTS.map(item => (
                <div key={item.text + item.date} className="flex items-start gap-4 py-4" style={{ borderBottom: '1px solid rgba(13,43,69,0.08)' }}>
                  <span className="text-sm font-800 w-28 shrink-0" style={{ color: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>{item.amount}</span>
                  <div>
                    <div className="text-sm" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{item.text}</div>
                    <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="py-20" style={{ background: '#F47C20' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Explore More</h2>
        <p className="text-white/80 mb-8 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>See INF-initiated projects or get in touch to learn more about membership.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/projects/inf-projects" className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}>View INF Projects</Link>
          <Link to="/contact" className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Manrope, sans-serif' }}>Contact Us</Link>
        </div>
      </div>
    </section>
  )
}

export default function MemberProjectsPage() {
  return (
    <div>
      <PageHero />
      <HowItWorks />
      <FeaturedMemberProjects />
      <StartAProjectForm />
      <Cta />
    </div>
  )
}
