import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'

const PLAN_NAMES: Record<string, { display: string; provider: string; coverage: string[] }> = {
  'explorer-basic': {
    display: 'Explorer Basic by TravelGuard Plus',
    provider: 'TravelGuard Plus',
    coverage: ['Medical Expenses: Up to $50,000', 'Emergency Evacuation: Up to $25,000', 'Trip Cancellation: Up to $1,500', 'Baggage Loss: Up to $500'],
  },
  'india-traveler': {
    display: 'India Traveler by SafeTrip India',
    provider: 'SafeTrip India',
    coverage: ['Medical Expenses: Up to $100,000', 'Emergency Evacuation: Up to $50,000', 'Trip Cancellation: Up to $3,000', 'Baggage Loss: Up to $1,000'],
  },
  'elite-protection': {
    display: 'Elite Protection by GlobalCover Premium',
    provider: 'GlobalCover Premium',
    coverage: ['Medical Expenses: Up to $250,000', 'Emergency Evacuation: Up to $100,000', 'Trip Cancellation & Interruption: Up to $10,000', 'Baggage & Electronics: Up to $3,000'],
  },
}

function randomCertNo() {
  return 'TI-2025-' + Math.floor(1000000 + Math.random() * 9000000)
}

function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

type Stage = 'email' | 'otp' | 'certificate'

export default function CertificatePage() {
  const [searchParams] = useSearchParams()
  const planSlug = searchParams.get('plan') || 'explorer-basic'
  const planInfo = PLAN_NAMES[planSlug] || PLAN_NAMES['explorer-basic']

  const [stage, setStage] = useState<Stage>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [certNo] = useState(randomCertNo)
  const [downloaded, setDownloaded] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStage('otp')
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit code.')
      return
    }
    setOtpError('')
    setStage('certificate')
  }

  function handleDownload() {
    window.print()
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 3000)
  }

  function handleSendEmail() {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  const inputClass = "w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-colors"
  const inputStyle = { border: '1px solid rgba(13,43,69,0.15)', background: 'white', fontFamily: 'Manrope, sans-serif' }

  return (
    <div style={{ fontFamily: 'Manrope, sans-serif', background: '#FFF9F3', minHeight: '100vh' }}>
      <style>{`@media print { .no-print { display: none !important; } }`}</style>

      <div className="no-print bg-white border-b" style={{ borderColor: 'rgba(13,43,69,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-2 text-sm" style={{ color: '#6B7280' }}>
            <Link to="/" className="hover:underline" style={{ color: '#6B7280' }}>Home</Link>
            <span>/</span>
            <Link to="/projects/travel-insurance" className="hover:underline" style={{ color: '#6B7280' }}>Travel Insurance</Link>
            <span>/</span>
            <span style={{ color: '#0D2B45' }}>Certificate</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Stage 1: Email */}
        {stage === 'email' && (
          <div className="no-print rounded-2xl shadow-xl p-8 md:p-12 bg-white" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
            <div className="mb-6 text-center">
              <span className="inline-block rounded-full text-xs font-700 px-4 py-1.5 mb-4" style={{ background: '#F47C20', color: 'white' }}>{planInfo.display}</span>
              <h1 className="text-2xl font-800 mb-2" style={{ color: '#0D2B45' }}>Verify Your Email</h1>
              <p className="text-gray-500 text-sm">We will send your insurance certificate to your email address.</p>
            </div>
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-700 mb-1.5" style={{ color: '#0D2B45' }}>Email Address <span style={{ color: '#F47C20' }}>*</span></label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                  style={inputStyle}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-full text-white font-700 text-base"
                style={{ background: '#F47C20' }}
              >
                Send OTP
              </button>
            </form>
          </div>
        )}

        {/* Stage 2: OTP */}
        {stage === 'otp' && (
          <div className="no-print rounded-2xl shadow-xl p-8 md:p-12 bg-white" style={{ border: '1px solid rgba(13,43,69,0.08)' }}>
            <div className="mb-6 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl" style={{ background: 'rgba(244,124,32,0.1)' }}>✉</div>
              <h1 className="text-2xl font-800 mb-2" style={{ color: '#0D2B45' }}>Enter Verification Code</h1>
              <p className="text-gray-500 text-sm">A 6-digit code was sent to <span className="font-700" style={{ color: '#0D2B45' }}>{email}</span></p>
            </div>
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-700 mb-1.5" style={{ color: '#0D2B45' }}>6-Digit Code <span style={{ color: '#F47C20' }}>*</span></label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  placeholder="Enter 6-digit code"
                  className={inputClass + ' text-center text-xl tracking-widest font-700'}
                  style={inputStyle}
                  value={otp}
                  onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setOtpError('') }}
                />
                {otpError && <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{otpError}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-full text-white font-700 text-base"
                style={{ background: '#F47C20' }}
              >
                Verify OTP
              </button>
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm"
                  style={{ color: '#6B7280' }}
                  onClick={() => setOtp('')}
                >
                  Resend OTP
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Stage 3: Certificate */}
        {stage === 'certificate' && (
          <>
            {/* Certificate Document */}
            <div
              id="certificate"
              className="bg-white rounded-2xl p-10"
              style={{ border: '2px solid #0D2B45', boxShadow: '0 8px 40px rgba(13,43,69,0.12)' }}
            >
              {/* Side accent bars */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-1.5 rounded-full" style={{ background: 'linear-gradient(to bottom, #F47C20, #0D2B45)' }} />
                <div className="flex-1">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <p className="text-xs font-700 tracking-widest mb-1" style={{ color: '#F47C20' }}>INDIA NETWORK FOUNDATION</p>
                    <h2 className="text-2xl font-800" style={{ color: '#0D2B45' }}>Travel Insurance Certificate</h2>
                  </div>

                  {/* Divider */}
                  <div className="h-0.5 rounded-full mb-6" style={{ background: 'linear-gradient(to right, #F47C20, #0D2B45)' }} />

                  {/* Title */}
                  <div className="text-center mb-8">
                    <p className="text-xs tracking-widest font-700 mb-1" style={{ color: '#6B7280' }}>CERTIFICATE OF INSURANCE</p>
                    <p className="text-sm font-700" style={{ color: '#0D2B45' }}>Certificate No: {certNo}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-8">
                    {[
                      { label: 'Issued To', value: email },
                      { label: 'Plan', value: planInfo.display },
                      { label: 'Issue Date', value: formatDate(new Date()) },
                      { label: 'Valid Period', value: 'Policy details as per your quote' },
                    ].map(d => (
                      <div key={d.label} className="flex gap-4 text-sm" style={{ borderBottom: '1px solid rgba(13,43,69,0.07)', paddingBottom: '10px' }}>
                        <span className="w-32 flex-shrink-0 font-700" style={{ color: '#6B7280' }}>{d.label}</span>
                        <span className="font-700" style={{ color: '#0D2B45' }}>{d.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Coverage Summary */}
                  <div className="mb-8">
                    <p className="text-xs font-700 tracking-widest mb-3" style={{ color: '#F47C20' }}>COVERAGE SUMMARY</p>
                    <ul className="space-y-2">
                      {planInfo.coverage.map(line => (
                        <li key={line} className="flex items-start gap-2 text-sm" style={{ color: '#0D2B45' }}>
                          <span style={{ color: '#2E8B57' }}>✓</span> {line}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Divider */}
                  <div className="h-0.5 rounded-full mb-6" style={{ background: 'rgba(13,43,69,0.1)' }} />

                  {/* Footer */}
                  <div className="text-center">
                    <p className="text-xs font-700 mb-1" style={{ color: '#0D2B45' }}>
                      THIS CERTIFICATE IS ISSUED BY INDIA NETWORK FOUNDATION
                    </p>
                    <p className="text-xs mb-4" style={{ color: '#6B7280' }}>
                      IN ASSOCIATION WITH {planInfo.provider.toUpperCase()}
                    </p>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>
                      This certificate is for informational purposes. Full policy document will be mailed to the registered email address. Coverage is subject to the terms, conditions, and exclusions of the policy.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-1.5 rounded-full" style={{ background: 'linear-gradient(to bottom, #0D2B45, #F47C20)' }} />
              </div>
            </div>

            {/* Actions below certificate */}
            <div className="no-print mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownload}
                className="rounded-full px-8 py-3.5 font-700 text-base text-white"
                style={{ background: '#F47C20' }}
              >
                {downloaded ? 'Certificate Downloaded' : 'Download Certificate'}
              </button>
              <button
                onClick={handleSendEmail}
                className="rounded-full px-8 py-3.5 font-700 text-base"
                style={{ border: '2px solid #0D2B45', color: '#0D2B45' }}
              >
                {emailSent ? `Sent to ${email}` : 'Send to Email'}
              </button>
            </div>
            <div className="no-print mt-4 text-center">
              <Link
                to="/projects/travel-insurance"
                className="text-sm"
                style={{ color: '#6B7280' }}
              >
                Buy Another Plan
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
