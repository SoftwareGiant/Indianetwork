import { useState } from 'react';
import { Link } from 'react-router';

interface Embassy {
  flag: string;
  name: string;
  city: string;
  country: string;
  type: 'Embassy' | 'High Commission' | 'Consulate General' | 'Permanent Mission' | 'Tourist Office';
  website: string;
}

const embassies: Embassy[] = [
  { flag: "🇦🇷", name: "Embassy of India, Buenos Aires", city: "Buenos Aires", country: "Argentina", type: "Embassy", website: "https://www.indembarg.gov.in/" },
  { flag: "🇧🇪", name: "Embassy of India, Brussels", city: "Brussels", country: "Belgium", type: "Embassy", website: "https://www.indianembassybrussels.gov.in/" },
  { flag: "🇧🇳", name: "High Commission of India, Bandar Seri Begawan", city: "Bandar Seri Begawan", country: "Brunei", type: "High Commission", website: "https://www.hcindiabrunei.gov.in/" },
  { flag: "🇨🇦", name: "High Commission of India, Ottawa", city: "Ottawa", country: "Canada", type: "High Commission", website: "https://www.hciottawa.gov.in/" },
  { flag: "🇨🇦", name: "Consulate General of India, Toronto", city: "Toronto", country: "Canada", type: "Consulate General", website: "https://www.cgitoronto.gov.in/" },
  { flag: "🇨🇳", name: "Embassy of India, Beijing", city: "Beijing", country: "China", type: "Embassy", website: "https://www.eoibeijing.gov.in/" },
  { flag: "🇨🇺", name: "Embassy of India, Havana", city: "Havana", country: "Cuba", type: "Embassy", website: "https://www.indembassyhavana.gov.in/" },
  { flag: "🇨🇿", name: "Embassy of India, Prague", city: "Prague", country: "Czech Republic", type: "Embassy", website: "https://www.eoiprague.gov.in/" },
  { flag: "🇫🇷", name: "Embassy of India, Paris", city: "Paris", country: "France", type: "Embassy", website: "https://www.eoiparis.gov.in/" },
  { flag: "🇩🇪", name: "Embassy of India, Berlin", city: "Berlin", country: "Germany", type: "Embassy", website: "https://indianembassyberlin.gov.in/" },
  { flag: "🇩🇪", name: "Consulate General of India, Frankfurt", city: "Frankfurt", country: "Germany", type: "Consulate General", website: "https://www.cgifrankfurt.gov.in/" },
  { flag: "🇭🇰", name: "Consulate General of India, Hong Kong", city: "Hong Kong", country: "Hong Kong", type: "Consulate General", website: "https://www.cgihk.gov.in/" },
  { flag: "🇭🇺", name: "Embassy of India, Budapest", city: "Budapest", country: "Hungary", type: "Embassy", website: "https://www.eoibudapest.gov.in/" },
  { flag: "🇮🇷", name: "Embassy of India, Tehran", city: "Tehran", country: "Iran", type: "Embassy", website: "https://www.indianembassytehran.gov.in/" },
  { flag: "🇯🇵", name: "Embassy of India, Tokyo", city: "Tokyo", country: "Japan", type: "Embassy", website: "https://www.indembassy-tokyo.gov.in/" },
  { flag: "🇰🇪", name: "High Commission of India, Nairobi", city: "Nairobi", country: "Kenya", type: "High Commission", website: "https://www.hcinairobi.gov.in/" },
  { flag: "🇲🇽", name: "Embassy of India, Mexico City", city: "Mexico City", country: "Mexico", type: "Embassy", website: "https://www.indiainmexico.gov.in/" },
  { flag: "🇳🇵", name: "Embassy of India, Kathmandu", city: "Kathmandu", country: "Nepal", type: "Embassy", website: "https://www.indembkathmandu.gov.in/" },
  { flag: "🇳🇬", name: "Consulate General of India, Lagos", city: "Lagos", country: "Nigeria", type: "Consulate General", website: "https://www.cgilagos.gov.in/" },
  { flag: "🇵🇪", name: "Embassy of India, Lima", city: "Lima", country: "Peru", type: "Embassy", website: "https://www.eoilima.gov.in/" },
  { flag: "🇶🇦", name: "Embassy of India, Doha", city: "Doha", country: "Qatar", type: "Embassy", website: "https://www.indianembassyqatar.gov.in/" },
  { flag: "🇷🇺", name: "Embassy of India, Moscow", city: "Moscow", country: "Russia", type: "Embassy", website: "https://www.indianembassy-moscow.gov.in/" },
  { flag: "🇸🇨", name: "High Commission of India, Victoria", city: "Victoria", country: "Seychelles", type: "High Commission", website: "https://www.hcivictoria.gov.in/" },
  { flag: "🇸🇬", name: "High Commission of India, Singapore", city: "Singapore", country: "Singapore", type: "High Commission", website: "https://www.hcisingapore.gov.in/" },
  { flag: "🇪🇸", name: "Embassy of India, Madrid", city: "Madrid", country: "Spain", type: "Embassy", website: "https://www.eoimadrid.gov.in/" },
  { flag: "🇱🇰", name: "High Commission of India, Colombo", city: "Colombo", country: "Sri Lanka", type: "High Commission", website: "https://www.hcicolombo.gov.in/" },
  { flag: "🇸🇪", name: "Embassy of India, Stockholm", city: "Stockholm", country: "Sweden", type: "Embassy", website: "https://www.indembassysweden.gov.in/" },
  { flag: "🇹🇿", name: "High Commission of India, Dar es Salaam", city: "Dar es Salaam", country: "Tanzania", type: "High Commission", website: "https://www.hcindiatz.gov.in/" },
  { flag: "🇹🇷", name: "Embassy of India, Ankara", city: "Ankara", country: "Turkey", type: "Embassy", website: "https://www.eoiankara.gov.in/" },
  { flag: "🇦🇪", name: "Embassy of India, Abu Dhabi", city: "Abu Dhabi", country: "United Arab Emirates", type: "Embassy", website: "https://www.indembassyuae.gov.in/" },
  { flag: "🇦🇪", name: "Consulate General of India, Dubai", city: "Dubai", country: "United Arab Emirates", type: "Consulate General", website: "https://www.cgidubai.gov.in/" },
  { flag: "🇬🇧", name: "High Commission of India, London", city: "London", country: "United Kingdom", type: "High Commission", website: "https://www.hcilondon.gov.in/" },
  { flag: "🇮🇳", name: "Incredible India — Ministry of Tourism, Government of India", city: "Online", country: "India", type: "Tourist Office", website: "https://www.incredibleindia.gov.in/" },
  { flag: "🇺🇸", name: "Consulate General of India, Houston", city: "Houston", country: "United States", type: "Consulate General", website: "https://www.cgihouston.gov.in/" },
  { flag: "🇺🇸", name: "Consulate General of India, New York", city: "New York", country: "United States", type: "Consulate General", website: "https://www.indiainnewyork.gov.in/" },
  { flag: "🇺🇸", name: "Permanent Mission of India to the United Nations, New York", city: "New York", country: "United States", type: "Permanent Mission", website: "https://pminewyork.gov.in/" },
  { flag: "🇺🇸", name: "Consulate General of India, San Francisco", city: "San Francisco", country: "United States", type: "Consulate General", website: "https://www.cgisf.gov.in/" },
  { flag: "🇺🇸", name: "Embassy of India, Washington D.C.", city: "Washington", country: "United States", type: "Embassy", website: "https://www.indianembassyusa.gov.in/" },
  { flag: "🇻🇪", name: "Embassy of India, Caracas", city: "Caracas", country: "Venezuela", type: "Embassy", website: "https://www.eoicaracas.gov.in/" },
];

const typeBadgeColors: Record<string, string> = {
  Embassy: "bg-red-100 text-red-700",
  "High Commission": "bg-purple-100 text-purple-700",
  "Consulate General": "bg-blue-100 text-blue-700",
  "Permanent Mission": "bg-green-100 text-green-700",
  "Tourist Office": "bg-orange-100 text-orange-700",
};

export default function EmbassiesPage() {
  const [search, setSearch] = useState('');

  const filtered = embassies.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.country.toLowerCase().includes(q)
    );
  });

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
            <Link to="/directory" className="hover:text-white transition-colors">
              Directory
            </Link>
            <span>/</span>
            <span className="text-white">List of Indian Foreign Offices</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            List of Indian Foreign Offices
          </h1>
          <p className="text-blue-200 text-base max-w-xl">
            Indian embassies, high commissions, consulates and missions around the world.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by country or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {filtered.length} of {embassies.length} offices
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-16">No offices found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((embassy) => (
              <div
                key={embassy.name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                {/* Flag + type */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{embassy.flag}</span>
                  <span
                    className={`rounded-full text-xs font-semibold px-3 py-1 ${typeBadgeColors[embassy.type]}`}
                  >
                    {embassy.type}
                  </span>
                </div>

                <h3 className="font-bold text-sm leading-snug" style={{ color: "#0D2B45" }}>
                  {embassy.name}
                </h3>

                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <span>📍</span>
                  <span>{embassy.city}, {embassy.country}</span>
                </p>

                <a
                  href={embassy.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto rounded-full text-xs font-semibold px-4 py-2 transition-colors self-start"
                  style={{ backgroundColor: "#F47C20", color: "#fff" }}
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-10">Source: Government of India information web sites. Links updated in 2026 to the missions' current official websites.</p>
      </div>
    </div>
  );
}
