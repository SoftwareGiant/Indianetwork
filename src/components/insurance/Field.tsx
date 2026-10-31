// Shared form building blocks for the travel insurance pages.

export const inputClass = 'w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-colors focus:ring-2 focus:ring-orange-300'

export function inputStyle(error?: string): React.CSSProperties {
  return { border: `1px solid ${error ? '#dc2626' : 'rgba(13,43,69,0.15)'}`, background: 'white' }
}

export function Field({ label, error, required, children, hint }: { label: string; error?: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-700 mb-1.5" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>
        {label} {required && <span style={{ color: '#F47C20' }}>*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      {error && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{error}</p>}
    </div>
  )
}

export function Alert({ children, tone = 'error' }: { children: React.ReactNode; tone?: 'error' | 'info' | 'success' }) {
  const colors = {
    error: { bg: 'rgba(220,38,38,0.06)', border: 'rgba(220,38,38,0.25)', text: '#b91c1c' },
    info: { bg: 'rgba(244,124,32,0.08)', border: 'rgba(244,124,32,0.25)', text: '#0D2B45' },
    success: { bg: 'rgba(46,139,87,0.08)', border: 'rgba(46,139,87,0.3)', text: '#1f6b43' },
  }[tone]
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className="rounded-xl px-4 py-3 text-sm" style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}>
      {children}
    </div>
  )
}

export function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-sm text-gray-500" role="status">
      <span className="w-5 h-5 rounded-full border-2 animate-spin" style={{ borderColor: 'rgba(244,124,32,0.25)', borderTopColor: '#F47C20' }} />
      {label}
    </div>
  )
}
