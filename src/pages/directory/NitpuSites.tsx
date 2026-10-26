import { Link } from 'react-router';

interface Centre {
  city: string;
  urls: string[];
}

const centres: Centre[] = [
  { city: "Ahmedabad", urls: ["http://guj1.guj.nic.in"] },
  { city: "Bangalore", urls: ["http://kar.nic.in", "http://kar2.kar.nic.in"] },
  { city: "Bhopal", urls: ["http://www.mp.nic.in"] },
  { city: "Bhubaneshwar", urls: ["http://ori.nic.in"] },
  { city: "Calcutta", urls: ["http://nitpu.wb.nic.in"] },
  { city: "Chandigarh", urls: ["http://chd.nic.in"] },
  { city: "Chennai", urls: ["http://budget99.tn.nic.in"] },
  { city: "Hyderabad", urls: ["http://www.ap.nic.in"] },
  { city: "Jaipur", urls: ["http://web.raj.nic.in"] },
  { city: "Lucknow", urls: ["http://up400.nic.in"] },
  { city: "Mumbai", urls: ["http://www.bom.nic.in/budget99/welcome.html"] },
  { city: "Patna", urls: ["http://bihar.bih.nic.in"] },
  { city: "Pune", urls: ["http://www.mah.nic.in"] },
  { city: "Assam", urls: ["http://asm.nic.in/welcome.html"] },
  { city: "Tirupur", urls: ["http://tirupur.tn.nic.in"] },
];

export default function NitpuSitesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF9F3" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#0D2B45" }} className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-blue-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/directory" className="hover:text-white transition-colors">
              Directory
            </Link>
            <span>/</span>
            <span className="text-white">NITPU Centre Sites</span>
          </nav>
          <span
            className="inline-block rounded-full text-xs font-semibold px-4 py-1 mb-4"
            style={{ backgroundColor: "#2E8B57", color: "#fff" }}
          >
            Network
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            NITPU Centre Sites
          </h1>
          <p className="text-blue-200 text-base max-w-2xl">
            The Union Budget is also available on the following NITPU web servers. For effective and
            fast access, you may visit the respective state web sites.
          </p>
        </div>
      </div>

      {/* Centres */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-sm text-gray-500 mb-8">{centres.length} NITPU web servers across India</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {centres.map((centre, index) => (
            <div
              key={centre.city}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Icon + number */}
              <div className="flex items-start justify-between">
                <span className="text-3xl">🏢</span>
                <span
                  className="text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center"
                  style={{ backgroundColor: "#FFF9F3", color: "#F47C20", border: "1px solid #F47C20" }}
                >
                  {index + 1}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-bold text-base leading-tight" style={{ color: "#0D2B45" }}>
                {centre.city}
              </h3>

              {/* Links */}
              <div className="flex flex-col gap-1">
                {centre.urls.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm break-all hover:underline"
                    style={{ color: "#2E8B57" }}
                  >
                    {url.replace('http://', '')}
                  </a>
                ))}
              </div>

              <a
                href={centre.urls[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto rounded-full text-xs font-semibold px-4 py-2 self-start transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#2E8B57", color: "#fff" }}
              >
                Visit Site
              </a>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-10">
          Prepared and maintained by the National Informatics Centre for the Ministry of Finance,
          Government of India. Queries may be sent to finmin@finance.delhi.nic.in.
        </p>
      </div>
    </div>
  );
}
