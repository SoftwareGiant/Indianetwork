import { Link } from 'react-router';
import { useInView } from '../../hooks/useInView';

function PageHero() {
  const { ref, inView } = useInView();
  return (
    <section
      className="relative min-h-[480px] flex items-end pt-28 lg:pt-40 pb-16"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1800&h=800&fit=crop&auto=format')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(13,43,69,0.82)' }} />
      <div
        ref={ref}
        className="relative z-10 max-w-5xl mx-auto px-6 w-full transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)' }}
      >
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/programs" className="hover:text-white transition-colors">Programs</Link>
          <span>/</span>
          <span className="text-white">Youth Development</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: '#F47C20', color: 'white' }}>Youth</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Youth Development</h1>
        <p className="text-white/80 text-lg max-w-2xl">Cultivating the next generation of Indian-American leaders through leadership camps, internships, and youth councils that empower young diaspora voices.</p>
      </div>
    </section>
  );
}

function AboutProgram() {
  const { ref, inView } = useInView();
  return (
    <section style={{ background: '#FFF9F3' }} className="py-20">
      <div
        ref={ref}
        className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop&auto=format"
          alt="Youth Development"
          className="rounded-2xl w-full h-72 object-cover shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#0D2B45' }}>About the Program</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">INF's Youth Development program invests in young Indians aged 16 to 30 who are poised to become the bridge between Indian heritage and global citizenship.</p>
          <p className="text-gray-600 leading-relaxed">Through structured leadership experiences, professional internships, and active youth councils, we help young people discover their potential and develop the skills to create meaningful change.</p>
        </div>
      </div>
    </section>
  );
}

function ObjectivesSection() {
  const { ref, inView } = useInView();
  const objectives = [
    { icon: '🏕️', title: 'Leadership Camps', desc: 'Immersive multi-day programs developing public speaking, teamwork, and civic leadership skills.' },
    { icon: '💼', title: 'Internships', desc: 'Placing youth in professional settings at partner organizations across India and the US.' },
    { icon: '🏛️', title: 'Youth Councils', desc: 'Elected youth advisory boards that influence INF programs and community priorities.' },
    { icon: '🌱', title: 'Mentorship', desc: 'One-on-one guidance from established professionals in the Indian-American community.' },
  ];
  return (
    <section className="py-20 bg-white">
      <div
        ref={ref}
        className="max-w-5xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)' }}
      >
        <h2 className="text-3xl font-extrabold text-center mb-12" style={{ color: '#0D2B45' }}>Our Objectives</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {objectives.map((obj, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: 'rgba(13,43,69,0.08)' }}>
              <div className="flex items-center justify-center h-16 text-3xl" style={{ background: '#0D2B45' }}>{obj.icon}</div>
              <div className="p-5">
                <h4 className="font-bold mb-2 text-base" style={{ color: '#0D2B45' }}>{obj.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{obj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoItSupports() {
  const { ref, inView } = useInView();
  const groups = [
    { title: 'High School Students', desc: 'Young Indians aged 16-18 exploring career paths and leadership opportunities.' },
    { title: 'College Undergrads', desc: 'University students seeking internships, mentorship, and professional development.' },
    { title: 'Young Professionals', desc: 'Early-career individuals aged 22-30 building networks and civic leadership skills.' },
    { title: 'Student Organizations', desc: 'Indian student associations on campuses looking for programming and support.' },
  ];
  return (
    <section className="py-20" style={{ background: '#0D2B45' }}>
      <div
        ref={ref}
        className="max-w-5xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)' }}
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-12">Who It Supports</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((g, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <h4 className="font-bold text-white mb-2">{g.title}</h4>
              <p className="text-white/70 text-sm leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { ref, inView } = useInView();
  const steps = [
    { n: '01', title: 'Apply to Programs', desc: 'Youth submit short applications for camps, internships, or council elections each cycle.' },
    { n: '02', title: 'Selection & Onboarding', desc: 'Selected participants are welcomed into cohorts with orientation and goal-setting sessions.' },
    { n: '03', title: 'Program Participation', desc: 'Structured learning, real-world projects, and community service form the core experience.' },
    { n: '04', title: 'Alumni Network', desc: 'Graduates join the INF Youth Alumni Network for continued opportunities and giving back.' },
  ];
  return (
    <section style={{ background: '#FFF9F3' }} className="py-20">
      <div
        ref={ref}
        className="max-w-5xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)' }}
      >
        <h2 className="text-3xl font-extrabold text-center mb-12" style={{ color: '#0D2B45' }}>How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl p-6 bg-white shadow-sm">
              <div className="text-4xl font-extrabold mb-3" style={{ color: '#F47C20' }}>{s.n}</div>
              <h4 className="font-bold mb-2" style={{ color: '#0D2B45' }}>{s.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactStats() {
  const { ref, inView } = useInView();
  const stats = [
    { value: '3,200+', label: 'Youth Participants' },
    { value: '25+', label: 'Leadership Camps' },
    { value: '400+', label: 'Internships Placed' },
    { value: '12', label: 'Youth Councils' },
  ];
  return (
    <section className="py-20 bg-white">
      <div
        ref={ref}
        className="max-w-5xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)' }}
      >
        <h2 className="text-3xl font-extrabold text-center mb-12" style={{ color: '#0D2B45' }}>Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl p-4 sm:p-6 text-center" style={{ background: '#FFF9F3' }}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 break-words" style={{ color: '#F47C20' }}>{s.value}</div>
              <div className="text-sm font-semibold" style={{ color: '#0D2B45' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #F47C20 0%, #e06510 100%)' }}>
      <div
        ref={ref}
        className="max-w-4xl mx-auto px-6 text-center transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)' }}
      >
        <h2 className="text-3xl font-extrabold text-white mb-4">Invest in Tomorrow's Leaders Today</h2>
        <p className="text-white/90 mb-8 text-lg">Empower young Indian-Americans to lead with purpose, pride, and global perspective.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/donate" className="px-8 py-3.5 rounded-full font-bold bg-white transition-all hover:-translate-y-1 hover:scale-105" style={{ color: '#F47C20' }}>Donate Now</Link>
          <Link to="/contact" className="px-8 py-3.5 rounded-full font-bold border-2 border-white text-white transition-all hover:-translate-y-1 hover:scale-105">Apply to a Program</Link>
          <Link to="/programs" className="px-8 py-3.5 rounded-full font-bold border-2 border-white text-white transition-all hover:-translate-y-1 hover:scale-105">All Programs</Link>
        </div>
      </div>
    </section>
  );
}

export default function YouthDevelopmentPage() {
  return (
    <main>
      <PageHero />
      <AboutProgram />
      <ObjectivesSection />
      <WhoItSupports />
      <HowItWorks />
      <ImpactStats />
      <Cta />
    </main>
  );
}
