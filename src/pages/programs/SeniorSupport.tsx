import { Link } from 'react-router';
import { useInView } from '../../hooks/useInView';

function PageHero() {
  const { ref, inView } = useInView();
  return (
    <section
      className="relative min-h-[480px] flex items-end pb-16"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1516307365426-bea591f05011?w=1800&h=800&fit=crop&auto=format')",
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
          <span className="text-white">Senior Citizen Support</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: '#F47C20', color: 'white' }}>Elder Care</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Senior Citizen Support</h1>
        <p className="text-white/80 text-lg max-w-2xl">Comprehensive eldercare programs providing health monitoring, community connection, and dignity to elderly Indians at home and in the diaspora.</p>
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
          src="https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&h=600&fit=crop&auto=format"
          alt="Senior Support"
          className="rounded-2xl w-full h-72 object-cover shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#0D2B45' }}>About the Program</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">INF's Senior Citizen Support program addresses the unique challenges faced by elderly Indians — whether living alone in India or navigating old age in a foreign country far from extended family.</p>
          <p className="text-gray-600 leading-relaxed">We provide health monitoring, companionship programs, legal aid navigation, and community-building activities that ensure our elders live with dignity, connection, and care.</p>
        </div>
      </div>
    </section>
  );
}

function ObjectivesSection() {
  const { ref, inView } = useInView();
  const objectives = [
    { icon: '❤️', title: 'Eldercare Programs', desc: 'Home visits, assisted living guidance, and daily wellness check-ins for senior citizens.' },
    { icon: '🏥', title: 'Health Monitoring', desc: 'Regular health screenings, chronic disease management, and medication support.' },
    { icon: '👥', title: 'Community Connection', desc: 'Social clubs, cultural events, and companion programs to combat elder loneliness.' },
    { icon: '⚖️', title: 'Legal & Financial Aid', desc: 'Guidance on navigating healthcare systems, pension rights, and legal entitlements.' },
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
    { title: 'Seniors Living Alone', desc: 'Elderly individuals without immediate family nearby who need regular check-ins.' },
    { title: 'Diaspora Elders', desc: 'Indian seniors who moved abroad to live with children but face cultural isolation.' },
    { title: 'Caregivers', desc: 'Family members who are primary caregivers and need respite and resource support.' },
    { title: 'Rural Elderly', desc: 'Senior citizens in rural India with limited access to healthcare and social services.' },
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
    { n: '01', title: 'Enrollment', desc: 'Seniors or their families register through our local chapter or online portal.' },
    { n: '02', title: 'Needs Assessment', desc: 'A care coordinator conducts a home visit to assess health, social, and practical needs.' },
    { n: '03', title: 'Personalized Plan', desc: 'A tailored care and activity plan is developed with the senior and their family.' },
    { n: '04', title: 'Ongoing Support', desc: 'Regular check-ins, event invitations, and health monitoring continue throughout enrollment.' },
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
    { value: '5,800+', label: 'Seniors Supported' },
    { value: '120+', label: 'Social Clubs' },
    { value: '24/7', label: 'Helpline Available' },
    { value: '18', label: 'Cities Served' },
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
        <h2 className="text-3xl font-extrabold text-white mb-4">Honor Our Elders with Care and Dignity</h2>
        <p className="text-white/90 mb-8 text-lg">Every senior deserves to feel seen, supported, and celebrated in their golden years.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/donate" className="px-8 py-3.5 rounded-full font-bold bg-white transition-all hover:-translate-y-1 hover:scale-105" style={{ color: '#F47C20' }}>Donate Now</Link>
          <Link to="/volunteer" className="px-8 py-3.5 rounded-full font-bold border-2 border-white text-white transition-all hover:-translate-y-1 hover:scale-105">Volunteer</Link>
          <Link to="/programs" className="px-8 py-3.5 rounded-full font-bold border-2 border-white text-white transition-all hover:-translate-y-1 hover:scale-105">All Programs</Link>
        </div>
      </div>
    </section>
  );
}

export default function SeniorSupportPage() {
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
