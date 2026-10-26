import { Link } from 'react-router';
import { useInView } from '../../hooks/useInView';

function PageHero() {
  const { ref, inView } = useInView();
  return (
    <section
      className="relative min-h-[480px] flex items-end pb-16"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&h=800&fit=crop&auto=format')",
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
          <span className="text-white">Healthcare</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: '#F47C20', color: 'white' }}>Healthcare</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Health Care</h1>
        <p className="text-white/80 text-lg max-w-2xl">Visitor health insurance for families travelling to North America, and support for life-saving medical care in India.</p>
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
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format"
          alt="Healthcare Program"
          className="rounded-2xl w-full h-72 object-cover shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#0D2B45' }}>About the Program</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">Health care for Indian travelers grew out of a real need in the community. India Network Health Insurance (KV Rao Insurance) provides visitor medical insurance for parents, relatives, students and temporary workers travelling to the United States and Canada — including coverage for pre-existing conditions.</p>
          <p className="text-gray-600 leading-relaxed">In India, members have funded kidney transplants and the Arogya Vara Prasadini Project, the Foundation donated medical equipment to army hospitals, and our clean water plants help prevent the spread of water-borne disease.</p>
        </div>
      </div>
    </section>
  );
}

function ObjectivesSection() {
  const { ref, inView } = useInView();
  const objectives = [
    { icon: "🛡️", title: "Visitor Health Insurance", desc: "Foundation-sponsored medical insurance for visitors to the United States and Canada, available to all age groups." },
    { icon: "🩺", title: "Pre-existing Coverage", desc: "Plans designed for the needs of Indians, covering pre-existing conditions and ailments such as urinary tract infections." },
    { icon: "❤️", title: "Medical Aid in India", desc: "Member gifts towards kidney transplants in Karnataka and Gujarat, and Rs. 4 Lakhs to the Arogya Vara Prasadini Project." },
    { icon: "🏥", title: "Hospital Equipment", desc: "A slit lamp, vacuum suction apparatus, fans and air-conditioning units donated to army hospitals treating wounded soldiers." },
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
    { title: "Visiting Parents & Relatives", desc: "Family members visiting the United States and Canada from India." },
    { title: "Students & Temporary Workers", desc: "Students and workers who need short-term coverage, from 5 days to 1 year." },
    { title: "Patients in India", desc: "People who cannot afford life-saving treatment such as kidney transplants." },
    { title: "Wounded Soldiers", desc: "Jawans recovering in army base hospitals after the Kargil action." },
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
    { n: "01", title: "Become a Member", desc: "India Network Foundation members are eligible to enroll their visitors in Foundation-sponsored insurance." },
    { n: "02", title: "Choose a Plan", desc: "Visit kvrao.org to compare visitor medical insurance plans for your family." },
    { n: "03", title: "Enroll Your Visitor", desc: "Purchase coverage for the length of the visit — any sickness or accident is covered." },
    { n: "04", title: "Travel with Peace of Mind", desc: "Your visitors can enjoy their stay knowing they are protected." },
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
    { value: "All Ages", label: "Covered" },
    { value: "5 days–1 yr", label: "Plan Length" },
    { value: "Rs. 4L", label: "Arogya Vara Prasadini" },
    { value: "2", label: "Kidney Transplants Funded" },
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
        <h2 className="text-3xl font-extrabold text-white mb-4">Bring Healthcare to Those Who Need It Most</h2>
        <p className="text-white/90 mb-8 text-lg">Protect your visiting family, or donate to support medical care in India.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/donate" className="px-8 py-3.5 rounded-full font-bold bg-white transition-all hover:-translate-y-1 hover:scale-105" style={{ color: '#F47C20' }}>Donate Now</Link>
          <Link to="/volunteer" className="px-8 py-3.5 rounded-full font-bold border-2 border-white text-white transition-all hover:-translate-y-1 hover:scale-105">Volunteer</Link>
          <Link to="/programs" className="px-8 py-3.5 rounded-full font-bold border-2 border-white text-white transition-all hover:-translate-y-1 hover:scale-105">All Programs</Link>
        </div>
      </div>
    </section>
  );
}

export default function HealthcarePage() {
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
