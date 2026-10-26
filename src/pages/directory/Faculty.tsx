import { useState } from 'react';
import { Link } from 'react-router';

interface FacultyMember {
  name: string;
  title: string;
  university: string;
  department: string;
}

const faculty: FacultyMember[] = [
  { name: "Anandhi Bharadwaj", title: "", university: "Emory University", department: "DIA" },
  { name: "S. Mehta", title: "", university: "UT Southwestern Medical Center", department: "Radiology" },
  { name: "Sunderesh S. Heragu", title: "", university: "Rensselaer Polytechnic Institute", department: "Decision Sciences and Engineering Systems" },
  { name: "Manika Prasad", title: "", university: "Stanford University", department: "Geophysics" },
  { name: "T. Venkateswarlu", title: "", university: "University of Windsor, Canada", department: "" },
  { name: "Solomon Antony", title: "", university: "Oakland University", department: "Management Information Systems" },
  { name: "Murli Nagasundaram", title: "", university: "Boise State University", department: "CIS/PM" },
  { name: "Prof. Sreenath Sreenivasan", title: "Professor", university: "Columbia University", department: "Graduate School of Journalism" },
  { name: "Dr. Sunil Hazari", title: "Associate Professor", university: "George Mason University", department: "Graduate School" },
];

function getInitials(name: string): string {
  return name
    .replace('Dr. ', '')
    .replace('Prof. ', '')
    .replace('Ms. ', '')
    .replace('Mr. ', '')
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');
}

export default function FacultyPage() {
  const [search, setSearch] = useState('');

  const filtered = faculty.filter((f) => {
    const q = search.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.university.toLowerCase().includes(q) ||
      f.department.toLowerCase().includes(q)
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
            <span className="text-white">Indian Faculty in the United States</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Indian Faculty in the United States
          </h1>
          <p className="text-blue-200 text-base max-w-2xl">
            Indian faculty members at universities in the United States and Canada.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Showing {filtered.length} of {faculty.length} faculty members
        </p>

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-16">No faculty found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                    style={{ backgroundColor: "#F47C20" }}
                  >
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight" style={{ color: "#0D2B45" }}>
                      {member.name}
                    </h3>
                    {member.title && <p className="text-xs text-gray-500 mt-0.5">{member.title}</p>}
                  </div>
                </div>

                {/* University */}
                <p className="text-sm font-semibold" style={{ color: "#2E8B57" }}>
                  {member.university}
                </p>

                {/* Department */}
                {member.department && <p className="text-xs text-gray-500">{member.department}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
