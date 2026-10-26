import { useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../../hooks/useInView'

function scrollToApply(e: React.MouseEvent) {
  e.preventDefault()
  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
}

function PageHero() {
  return (
    <section className="relative min-h-[420px] flex items-end">
      <img
        src="https://images.unsplash.com/photo-1562774053-701939374585?w=1800&h=800&fit=crop&auto=format"
        alt="NYU Scholarship"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.4) 60%, transparent 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-12 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/projects/inf-projects" className="hover:text-white">Projects</Link>
          <span>/</span>
          <span className="text-white">NYU Scholarship</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Student Scholarship at NYU</h1>
        <p className="text-white/80 text-lg max-w-xl">Supporting deserving Indian students pursuing higher education at New York University.</p>
        <a href="#apply" onClick={scrollToApply} className="inline-block mt-6 rounded-full px-8 py-3.5 font-700 text-base text-white transition-all duration-200 hover:scale-105" style={{ background: '#F47C20', fontFamily: 'Manrope, sans-serif' }}>Apply Now</a>
      </div>
    </section>
  )
}

function AboutProgram() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&h=500&fit=crop&auto=format"
              alt="NYU Scholarship"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="inline-block rounded-full text-xs font-700 px-4 py-1.5 mb-4" style={{ background: '#F47C20', color: 'white', fontFamily: 'Manrope, sans-serif' }}>About the Program</span>
            <h2 className="text-3xl font-800 mb-6" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Empowering Indian Students at NYU</h2>
            <div className="space-y-5 text-gray-600 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <p>The INF–NYU Scholarship Program is a flagship initiative to help talented students from India access world-class education at New York University, one of the most prestigious research universities in the United States.</p>
              <div>
                <h3 className="font-700 mb-1" style={{ color: '#0D2B45' }}>INF Initiated Plan</h3>
                <p>India Network Foundation partnered with NYU to create a dedicated scholarship fund for students of Indian heritage who demonstrate academic excellence and financial need. The initiative reflects our belief in education as the greatest equalizer.</p>
              </div>
              <div>
                <h3 className="font-700 mb-1" style={{ color: '#0D2B45' }}>How to Apply</h3>
                <p>Eligible students submit their academic transcripts, financial statements, a personal statement, and two letters of recommendation through the application form on this page. Applications are reviewed on a rolling basis each semester.</p>
              </div>
              <div>
                <h3 className="font-700 mb-1" style={{ color: '#0D2B45' }}>Eligibility</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Indian citizen or person of Indian origin</li>
                  <li>Enrolled or accepted at NYU (any campus)</li>
                  <li>Minimum GPA of 3.5 or equivalent</li>
                  <li>Demonstrated financial need</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ELIGIBILITY = [
  { icon: '🎓', title: 'Academic Excellence', desc: 'Minimum GPA of 3.5 or equivalent. Strong academic record and achievement in prior institutions.' },
  { icon: '💰', title: 'Financial Need', desc: "Demonstrated financial need based on family income and the cost of NYU's programs." },
  { icon: '🇮🇳', title: 'Indian Heritage', desc: 'Indian citizen or person of Indian origin (OCI/PIO cardholders qualify).' },
  { icon: '🏫', title: 'NYU Enrollment', desc: 'Currently enrolled or accepted at New York University — any school or campus worldwide.' },
]

function EligibilityCriteria() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20" style={{ background: '#FFF9F3' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Eligibility Criteria</h2>
            <p className="text-gray-500 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Four key criteria to qualify for the scholarship</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ELIGIBILITY.map(item => (
              <div key={item.title} className="rounded-2xl p-6 bg-white shadow-sm">
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

const STEPS = [
  { num: '01', title: 'Submit Application', desc: 'Complete the online application form with all required documents uploaded.' },
  { num: '02', title: 'Document Review', desc: 'Our scholarship committee reviews all submissions for completeness and eligibility.' },
  { num: '03', title: 'Interview', desc: 'Shortlisted candidates are invited to a virtual interview with INF representatives.' },
  { num: '04', title: 'Selection', desc: 'Final recipients are selected and notified. Awards are disbursed directly to NYU.' },
]

function HowToApply() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>How to Apply</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(step => (
              <div key={step.num} className="relative">
                <div className="text-5xl font-800 mb-3" style={{ color: 'rgba(244,124,32,0.18)', fontFamily: 'Manrope, sans-serif' }}>{step.num}</div>
                <h3 className="font-800 text-lg mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>{step.title}</h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Manrope, sans-serif' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ImpactNumbers() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20" style={{ background: '#0D2B45' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          {[
            { stat: '50+', label: 'Scholarships Awarded' },
            { stat: '$2M+', label: 'Total Funding' },
            { stat: '35+', label: 'Universities Supported' },
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

function ApplicationForm() {
  const { ref, inView } = useInView()
  const [form, setForm] = useState({ name: '', dob: '', address: '', education: '', exam: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name && form.dob && form.address && form.education && form.exam) {
      setSubmitted(true)
    }
  }

  const inputClass = "w-full px-4 py-3.5 rounded-xl text-gray-800 placeholder-gray-400 text-sm outline-none border focus:border-[#F47C20] transition-colors"
  const inputStyle = { border: '1px solid rgba(13,43,69,0.15)', background: 'white' }
  const labelClass = "text-sm mb-1.5 block"
  const labelStyle = { color: '#0D2B45', fontWeight: 600 }

  return (
    <section id="apply" style={{ background: '#FFF9F3', scrollMarginTop: 72 }} className="py-20">
      <div
        ref={ref}
        className="max-w-2xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)' }}
      >
        <h2 className="text-3xl font-extrabold text-center mb-3" style={{ color: '#0D2B45' }}>Apply for the INF–NYU Scholarship</h2>
        <p className="text-center text-gray-600 mb-10">Submit your details below. Our team will review your application and contact you about the next steps.</p>
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-extrabold mb-2" style={{ color: '#0D2B45' }}>Thank You!</h3>
              <p className="text-gray-600">Your application has been received. Our team will review your details and reach out to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className={labelClass} style={labelStyle}>Name <span style={{ color: '#F47C20' }}>*</span></label>
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Date of Birth <span style={{ color: '#F47C20' }}>*</span></label>
                <input name="dob" type="date" required value={form.dob} onChange={handleChange} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Address <span style={{ color: '#F47C20' }}>*</span></label>
                <textarea name="address" required value={form.address} onChange={handleChange} placeholder="Your current address" rows={3} className={inputClass + " resize-none"} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Educational Background <span style={{ color: '#F47C20' }}>*</span></label>
                <input name="education" required value={form.education} onChange={handleChange} placeholder="e.g. B.Tech Computer Science, IIT Bombay" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Exam Taken <span style={{ color: '#F47C20' }}>*</span></label>
                <select name="exam" required value={form.exam} onChange={handleChange} className={inputClass} style={inputStyle}>
                  <option value="">Select an exam</option>
                  <option value="TOEFL">TOEFL</option>
                  <option value="GRE">GRE</option>
                  <option value="GMAT">GMAT</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-2 py-3.5 rounded-full font-bold text-white transition-all hover:-translate-y-1 hover:scale-105"
                style={{ background: '#F47C20' }}
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}


export default function NyuScholarshipPage() {
  return (
    <div>
      <PageHero />
      <AboutProgram />
      <EligibilityCriteria />
      <HowToApply />
      <ImpactNumbers />
      <ApplicationForm />
    </div>
  )
}
