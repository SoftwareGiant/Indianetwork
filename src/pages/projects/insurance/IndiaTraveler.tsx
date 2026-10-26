import { Link } from 'react-router'

const COVERAGE = [
  { benefit: 'Medical Expenses', amount: '$100,000' },
  { benefit: 'Emergency Evacuation', amount: '$50,000' },
  { benefit: 'Trip Cancellation', amount: 'Up to $3,000' },
  { benefit: 'Baggage Loss', amount: '$1,000' },
  { benefit: 'Adventure Activities', amount: 'Included' },
]

const INCLUSIONS = [
  'Emergency medical treatment and hospitalization',
  'Ambulance services and air evacuation',
  'Trip cancellation due to illness, emergency, or family bereavement',
  'Adventure and outdoor sports coverage',
  'Lost, stolen, or delayed baggage up to $1,000',
  '24/7 multilingual helpline support',
  'Repatriation of remains',
  'Accidental death and dismemberment',
  'Home country extension coverage',
]

const EXCLUSIONS = [
  'Pre-existing conditions (unless declared and approved)',
  'Extreme high-risk activities (skydiving, mountaineering above 6,000m)',
  'Travel to war zones or sanctioned countries',
  'Alcohol or substance-related incidents',
  'Elective or cosmetic procedures',
  'Self-inflicted injuries',
]

export default function IndiaTravelerPage() {
  return (
    <div style={{ fontFamily: 'Manrope, sans-serif', background: '#FFF9F3', minHeight: '100vh' }}>
      {/* Page Header */}
      <div className="bg-white border-b" style={{ borderColor: 'rgba(13,43,69,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-sm mb-5" style={{ color: '#6B7280' }}>
            <Link to="/" className="hover:underline" style={{ color: '#6B7280' }}>Home</Link>
            <span>/</span>
            <Link to="/projects/inf-projects" className="hover:underline" style={{ color: '#6B7280' }}>Projects</Link>
            <span>/</span>
            <Link to="/projects/travel-insurance" className="hover:underline" style={{ color: '#6B7280' }}>Travel Insurance</Link>
            <span>/</span>
            <span style={{ color: '#0D2B45' }}>India Traveler</span>
          </div>
          <span className="inline-block rounded-full text-xs font-700 px-4 py-1.5 mb-4" style={{ background: '#F47C20', color: 'white' }}>SafeTrip India</span>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-800" style={{ color: '#0D2B45' }}>India Traveler Plan</h1>
            <span className="rounded-full text-xs font-700 px-3 py-1" style={{ background: '#F47C20', color: 'white' }}>Most Popular</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-block rounded-full text-sm font-700 px-4 py-1.5" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57' }}>$100,000 Coverage</span>
            <span className="text-2xl font-800" style={{ color: '#0D2B45' }}>$149 <span className="text-sm font-400 text-gray-400">per trip</span></span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">

        {/* Plan Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-800 mb-4" style={{ color: '#0D2B45' }}>Plan Overview</h2>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              The India Traveler Plan is our most popular plan, purpose-built for Indian diaspora members traveling to India and the surrounding region. With robust medical coverage, adventure activity inclusion, and generous trip cancellation limits, it handles the full range of travel scenarios families and frequent travelers face.
            </p>
            <div className="mb-4">
              <h3 className="font-700 mb-2" style={{ color: '#0D2B45' }}>Best For</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {['Frequent India travelers and NRI families', 'Medium-length trips up to 60 days', 'Travelers wanting adventure activity coverage', 'Travelers aged 18–75'].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span style={{ color: '#F47C20' }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl p-7 bg-white shadow-sm" style={{ border: '2px solid #F47C20' }}>
            <h3 className="font-800 text-lg mb-5" style={{ color: '#0D2B45' }}>Key Facts</h3>
            <div className="space-y-3">
              {[
                { label: 'Premium', value: '$149 per trip' },
                { label: 'Coverage', value: 'Up to $100,000' },
                { label: 'Trip Duration', value: 'Up to 60 days' },
                { label: 'Deductible', value: '$0' },
                { label: 'Minimum Age', value: '18 years' },
                { label: 'Maximum Age', value: '75 years' },
              ].map(f => (
                <div key={f.label} className="flex justify-between items-center text-sm py-2" style={{ borderBottom: '1px solid rgba(13,43,69,0.06)' }}>
                  <span className="text-gray-500">{f.label}</span>
                  <span className="font-700" style={{ color: '#0D2B45' }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coverage Table */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
          <div className="px-7 py-5" style={{ background: '#0D2B45' }}>
            <h2 className="text-xl font-800 text-white">Coverage Summary</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: 'rgba(13,43,69,0.04)' }}>
                <th className="text-left px-7 py-3.5 text-sm font-700" style={{ color: '#0D2B45' }}>Benefit</th>
                <th className="text-right px-7 py-3.5 text-sm font-700" style={{ color: '#0D2B45' }}>Maximum Limit</th>
              </tr>
            </thead>
            <tbody>
              {COVERAGE.map((row, i) => (
                <tr key={row.benefit} style={{ background: i % 2 === 0 ? 'white' : 'rgba(255,249,243,0.6)' }}>
                  <td className="px-7 py-4 text-sm text-gray-700">{row.benefit}</td>
                  <td className="px-7 py-4 text-sm font-700 text-right" style={{ color: '#2E8B57' }}>{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-7 bg-white shadow-sm" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
            <h2 className="text-xl font-800 mb-5" style={{ color: '#0D2B45' }}>What is Covered</h2>
            <ul className="space-y-3">
              {INCLUSIONS.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 text-base font-700" style={{ color: '#2E8B57' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-7 bg-white shadow-sm" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
            <h2 className="text-xl font-800 mb-5" style={{ color: '#0D2B45' }}>What is Not Covered</h2>
            <ul className="space-y-3">
              {EXCLUSIONS.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 text-base font-700" style={{ color: '#DC2626' }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-10 text-center bg-white shadow-sm" style={{ border: '2px solid rgba(244,124,32,0.2)' }}>
          <h2 className="text-2xl font-800 mb-2" style={{ color: '#0D2B45' }}>Ready to Get Protected?</h2>
          <p className="text-gray-500 text-sm mb-8">Purchase the India Traveler Plan — our most popular choice for diaspora travelers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects/insurance/certificate?plan=india-traveler"
              className="rounded-full px-10 py-3.5 font-700 text-base text-white"
              style={{ background: '#F47C20' }}
            >
              Buy This Plan
            </Link>
            <Link
              to="/projects/travel-insurance"
              className="rounded-full px-10 py-3.5 font-700 text-base"
              style={{ border: '2px solid #0D2B45', color: '#0D2B45' }}
            >
              Compare Plans
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
