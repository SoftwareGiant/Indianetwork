import { Link } from 'react-router';

const directories = [
  {
    icon: '🏦',
    title: 'Indian Financial Institutions',
    desc: 'Banks, financial institutions, insurance companies and stock exchanges in India.',
    to: '/directory/financial-institutions',
  },
  {
    icon: '🏛️',
    title: 'List of Indian Embassies',
    desc: 'Indian embassies, high commissions, consulates and missions around the world.',
    to: '/directory/embassies',
  },
  {
    icon: '🎓',
    title: 'Indian Faculty',
    desc: 'Indian faculty members at universities in the United States and Canada.',
    to: '/directory/faculty',
  },
  {
    icon: '🖥️',
    title: 'NITPU Centre Sites',
    desc: 'National Informatics Centre web servers hosting the Union Budget across India.',
    to: '/directory/nitpu-sites',
  },
];

export default function DirectoryIndexPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF9F3" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#0D2B45" }} className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-blue-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Directory</span>
          </nav>
          <span
            className="inline-block rounded-full text-xs font-semibold px-4 py-1 mb-4"
            style={{ backgroundColor: "#F47C20", color: "#fff" }}
          >
            Resources
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Directory</h1>
          <p className="text-blue-200 text-base max-w-xl">
            Useful lists for the Indian community, maintained by the India Network Foundation.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {directories.map((d) => (
            <Link
              key={d.to}
              to={d.to}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl">{d.icon}</span>
              <h3 className="font-bold text-lg leading-tight" style={{ color: "#0D2B45" }}>
                {d.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
              <span className="mt-auto text-sm font-semibold" style={{ color: "#F47C20" }}>
                View list →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
