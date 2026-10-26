import type { ChangeEvent } from 'react'

// Shared input field used in both the Donate page and homepage donation widget.
// Renders on a dark navy (#0D2B45) background — white text, saffron focus ring.
export function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  optional,
}: {
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  required?: boolean
  optional?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-sm font-600 flex items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}
      >
        {label}
        {required && <span style={{ color: '#F47C20' }}>*</span>}
        {optional && (
          <span className="text-xs font-400" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>
            (optional)
          </span>
        )}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="px-4 py-3.5 rounded-xl text-white placeholder-white/30 text-sm font-500 outline-none transition-all duration-200"
        style={{
          fontWeight: 500,
          background: 'rgba(255,255,255,0.08)',
          border: error ? '1px solid rgba(239,68,68,0.7)' : '1px solid rgba(255,255,255,0.12)',
        }}
        onFocus={e => {
          if (!error) e.currentTarget.style.border = '1px solid rgba(244,124,32,0.6)'
        }}
        onBlur={e => {
          if (!error) e.currentTarget.style.border = '1px solid rgba(255,255,255,0.12)'
        }}
      />
      {error && (
        <span className="text-xs" style={{ color: '#f87171' }}>
          {error}
        </span>
      )}
    </div>
  )
}

export type DonorInfo = { name: string; mobile: string; email: string }
export type DonorErrors = Partial<Record<keyof DonorInfo, string>>

export function validateDonorInfo(info: DonorInfo): DonorErrors {
  const e: DonorErrors = {}
  if (!info.name.trim()) e.name = 'Full name is required'
  if (!info.mobile.trim()) e.mobile = 'Mobile number is required'
  else if (!/^\+?[\d\s\-()\\.]{7,15}$/.test(info.mobile)) e.mobile = 'Please enter a valid mobile number'
  if (!info.email.trim()) e.email = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) e.email = 'Please enter a valid email address'
  return e
}

export function DonorFields({
  info,
  errors,
  onChange,
}: {
  info: DonorInfo
  errors: DonorErrors
  onChange: (field: keyof DonorInfo, value: string) => void
}) {
  const clear = (field: keyof DonorInfo) => (v: string) => onChange(field, v)

  return (
    <div
      className="px-0 py-6"
      style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <h4
        className="text-white font-700 text-base mb-5 flex items-center gap-2"
        style={{ fontWeight: 700 }}
      >
        <span
          className="w-6 h-6 rounded-full text-xs font-700 flex items-center justify-center flex-shrink-0 text-white"
          style={{ background: '#F47C20', fontWeight: 700 }}
        >
          2
        </span>
        Donor Information
      </h4>
      <div className="flex flex-col gap-4">
        <InputField
          label="Full Name"
          placeholder="Your full name"
          value={info.name}
          onChange={clear('name')}
          error={errors.name}
          required
        />
        <InputField
          label="Mobile Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={info.mobile}
          onChange={clear('mobile')}
          error={errors.mobile}
          required
        />
        <InputField
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={info.email}
          onChange={clear('email')}
          error={errors.email}
          required
        />
      </div>
    </div>
  )
}
