import { Link } from 'react-router';
import { useInView } from '../../hooks/useInView';

function PageHero() {
  const { ref, inView } = useInView();
  return (
    <section
      className="relative min-h-[480px] flex items-end pt-28 lg:pt-40 pb-16"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1800&h=800&fit=crop&auto=format')",
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
          <span className="text-white">Disaster Relief</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: '#F47C20', color: 'white' }}>Relief</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Disaster Relief</h1>
        <p className="text-white/80 text-lg max-w-2xl">From the Orissa super cyclone to Hurricane Harvey, India Network Foundation has delivered direct aid when disaster strikes in India and the United States.</p>
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
          src="/images/inf/orissa-1.jpg"
          alt="Disaster Relief"
          className="rounded-2xl w-full h-72 object-cover shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#0D2B45' }}>About the Program</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">India Network Foundation provides aid for humanitarian efforts in both the United States and India. The Foundation supplied vital resources during the Orissa Cyclone, rebuilt schools after the Gujarat Earthquake and provided aid after the 2004 Tsunami. More recently, INF donated time, money and resources to recovery in Houston after Hurricane Harvey and to Kerala flood victims.</p>
          <p className="text-gray-600 leading-relaxed">We believe immediate and direct assistance is the best way to reach the people who need it — our staff and volunteers deliver relief in person rather than simply writing checks.</p>
        </div>
      </div>
    </section>
  );
}

function ObjectivesSection() {
  const { ref, inView } = useInView();
  const objectives = [
    { icon: "🌀", title: "Cyclone Relief", desc: "Rice for 1,000 families after the 1999 Orissa super cyclone, the 1998 Gujarat Cyclone Relief Fund, and help after Cyclone Hudhud." },
    { icon: "🏚️", title: "Earthquake Recovery", desc: "Over $100,000 raised to rebuild schools after the 2001 Gujarat earthquake, plus clothes and food for villagers." },
    { icon: "🌊", title: "Flood & Tsunami Aid", desc: "Aid after the 2004 Tsunami, Hurricane Harvey in Houston, and the Kerala floods." },
    { icon: "🎖️", title: "Operation Care", desc: "Direct financial help to families of soldiers who died in the 1999 Kargil action, and to wounded soldiers." },
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
    { title: "Cyclone & Flood Victims", desc: "Families in remote villages who are not reached by aid from the cities." },
    { title: "Earthquake-hit Communities", desc: "Villages whose homes and schools collapsed." },
    { title: "Soldiers & Families", desc: "Families of fallen jawans and soldiers recovering in hospital." },
    { title: "Schools in Disaster Zones", desc: "Government schools needing reconstruction after disasters." },
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
    { n: "01", title: "Appeal to Members", desc: "At the request of members, INF launches a dedicated relief fund for the disaster." },
    { n: "02", title: "Raise Funds", desc: "Tax-exempt gifts and employer matching grants are collected from the community." },
    { n: "03", title: "Direct Distribution", desc: "INF staff and volunteers deliver relief in person to the hardest-hit areas." },
    { n: "04", title: "Rebuild", desc: "Longer-term support rebuilds schools and community facilities." },
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
    { value: "1,000", label: "Families Fed in Orissa" },
    { value: "$100K+", label: "Raised for Gujarat Schools" },
    { value: "35", label: "Wounded Soldiers Aided" },
    { value: "9", label: "Major Relief Efforts" },
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
        <h2 className="text-3xl font-extrabold text-white mb-4">Be Ready When Disaster Strikes</h2>
        <p className="text-white/90 mb-8 text-lg">Your donation helps INF respond quickly with direct aid to families in need.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/donate" className="px-8 py-3.5 rounded-full font-bold bg-white transition-all hover:-translate-y-1 hover:scale-105" style={{ color: '#F47C20' }}>Donate Now</Link>
          <Link to="/volunteer" className="px-8 py-3.5 rounded-full font-bold border-2 border-white text-white transition-all hover:-translate-y-1 hover:scale-105">Join Relief Teams</Link>
          <Link to="/programs" className="px-8 py-3.5 rounded-full font-bold border-2 border-white text-white transition-all hover:-translate-y-1 hover:scale-105">All Programs</Link>
        </div>
      </div>
    </section>
  );
}

export default function DisasterReliefPage() {
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
