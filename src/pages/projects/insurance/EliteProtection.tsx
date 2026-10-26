import { Link } from 'react-router'

const COVERAGE = [
  { benefit: 'Medical Expenses', amount: '$250,000' },
  { benefit: 'Emergency Evacuation', amount: '$100,000' },
  { benefit: 'Trip Cancellation & Interruption', amount: 'Up to $10,000' },
  { benefit: 'Baggage & Electronics', amount: '$3,000' },
  { benefit: 'Concierge Service', amount: 'Included' },
]

const INCLUSIONS = [
  'Comprehensive emergency medical treatment and hospitalization',
  'Air ambulance and emergency evacuation worldwide',
  'Trip cancellation, interruption, and delay coverage',
  'Baggage, valuables, and personal electronics protection',
  'Premium concierge travel assistance 24/7',
  'Repatriation of remains',
  'Accidental death and dismemberment',
  'Business equipment and document replacement',
  'Home country extension — unlimited extensions per year',
  'VIP medical provider network access',
]

const EXCLUSIONS = [
  'Pre-existing conditions (unless declared and approved)',
  'Extreme high-risk activities not listed in schedule',
  'Travel to war zones or sanctioned countries',
  'Alcohol or substance-related incidents',
  'Intentional self-inflicted injuries',
]

export default function EliteProtectionPage() {
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
            <span style={{ color: '#0D2B45' }}>Elite Protection</span>
          </div>
          <span className="inline-block rounded-full text-xs font-700 px-4 py-1.5 mb-4" style={{ background: '#F47C20', color: 'white' }}>GlobalCover Premium</span>
          <h1 className="text-4xl font-800 mb-3" style={{ color: '#0D2B45' }}>Elite Protection Plan</h1>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-block rounded-full text-sm font-700 px-4 py-1.5" style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57' }}>$250,000 Coverage</span>
            <span className="text-2xl font-800" style={{ color: '#0D2B45' }}>$229 <span className="text-sm font-400 text-gray-400">per trip</span></span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">

        {/* Plan Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-800 mb-4" style={{ color: '#0D2B45' }}>Plan Overview</h2>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              The Elite Protection Plan is GlobalCover Premium's flagship offering — designed for business travelers, long-haul international travelers, and those who demand comprehensive protection without compromise. With the highest coverage limits, electronics protection, and premium concierge service, it is the definitive plan for serious travelers.
            </p>
            <div className="mb-4">
              <h3 className="font-700 mb-2" style={{ color: '#0D2B45' }}>Best For</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {['Business and corporate travelers', 'Long international trips up to 180 days', 'Frequent international flyers who need electronics coverage', 'Travelers aged 18–80 seeking maximum protection'].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span style={{ color: '#F47C20' }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl p-7 bg-white shadow-sm" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
            <h3 className="font-800 text-lg mb-5" style={{ color: '#0D2B45' }}>Key Facts</h3>
            <div className="space-y-3">
              {[
                { label: 'Premium', value: '$229 per trip' },
                { label: 'Coverage', value: 'Up to $250,000' },
                { label: 'Trip Duration', value: 'Up to 180 days' },
                { label: 'Deductible', value: '$0' },
                { label: 'Minimum Age', value: '18 years' },
                { label: 'Maximum Age', value: '80 years' },
                { label: 'Electronics', value: 'Covered up to $1,500' },
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
          <h2 className="text-2xl font-800 mb-2" style={{ color: '#0D2B45' }}>Experience Elite Coverage</h2>
          <p className="text-gray-500 text-sm mb-8">The most comprehensive plan for travelers who want nothing left to chance.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects/insurance/certificate?plan=elite-protection"
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
