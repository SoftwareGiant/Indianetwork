import { Link } from 'react-router'
import { useInView } from '../../hooks/useInView'

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
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&h=500&fit=crop&auto=format"
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
                <p>Eligible students submit their academic transcripts, financial statements, a personal statement, and two letters of recommendation through the INF scholarship portal. Applications are reviewed on a rolling basis each semester.</p>
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

function Cta() {
  return (
    <section className="py-20" style={{ background: '#F47C20' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-800 text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Ready to Apply?</h2>
        <p className="text-white/80 mb-8 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>Take the first step toward your NYU education with INF support.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: '#0D2B45', color: 'white', fontFamily: 'Manrope, sans-serif' }}>Apply Now</Link>
          <Link to="/programs/education" className="rounded-full px-8 py-3.5 font-700 text-base" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Manrope, sans-serif' }}>Learn More</Link>
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
      <Cta />
    </div>
  )
}
