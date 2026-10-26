import { useState } from 'react'
import { Link } from 'react-router'
import { useInView } from '../hooks/useInView'

// ── Page Hero ─────────────────────────────────────────────────────────────────
function PageHero() {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: 400 }}>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1708593337380-6f97a307696f?w=1800&h=700&fit=crop&auto=format"
          alt="Community members connecting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,43,69,0.92) 0%, rgba(13,43,69,0.55) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,43,69,0.85) 0%, transparent 60%)' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-36 w-full">
        <div className="flex flex-wrap items-center gap-2 text-white/50 text-sm mb-5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Contact</span>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(244,124,32,0.2)', color: '#F47C20', fontWeight: 700 }}>Contact</span>
        <h1 className="text-white font-800 mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>Get in Touch</h1>
        <p className="text-white/70 text-lg max-w-xl leading-relaxed">
          Whether you're looking to donate, volunteer, partner, or simply learn more — we're always happy to chat.
        </p>
      </div>
    </section>
  )
}

// ── Contact Info Cards ────────────────────────────────────────────────────────
function ContactInfoCards() {
  const { ref, inView } = useInView(0.2)
  const cards = [
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
      label: 'Office Address',
      lines: ['India Network Foundation', '7065 Westpointe Blvd, Suite 208', 'Orlando, FL 32835, USA'],
      color: '#F47C20',
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.62 12 19.79 19.79 0 011.54 3.4 2 2 0 013.52 1.22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.72a16 16 0 006.29 6.29l.88-.88a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      label: 'Phone Number',
      lines: ['408-540-3600', 'Weekdays, 9:00 – 18:00'],
      color: '#2E8B57',
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      ),
      label: 'Email Address',
      lines: ['info@indianetwork.org'],
      color: '#F47C20',
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      label: 'Office Hours',
      lines: ['Weekdays', '9:00 – 18:00'],
      color: '#2E8B57',
    },
  ]

  return (
    <section ref={ref} className="py-16" style={{ backgroundColor: 'white', borderBottom: '1px solid rgba(13,43,69,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <div
              key={c.label}
              className="rounded-2xl p-6"
              style={{
                background: '#FFF9F3',
                border: '1px solid rgba(13,43,69,0.06)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 0.09}s`,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: c.color === '#F47C20' ? 'rgba(244,124,32,0.1)' : 'rgba(46,139,87,0.1)', color: c.color }}>
                {c.icon}
              </div>
              <div className="text-xs font-700 uppercase tracking-widest mb-3" style={{ color: c.color, fontWeight: 700 }}>{c.label}</div>
              {c.lines.map(l => (
                <div key={l} className="text-sm leading-relaxed" style={{ color: '#0D2B45', fontWeight: c.lines.indexOf(l) === 0 ? 600 : 400 }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact Form ──────────────────────────────────────────────────────────────
type FormErrors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)

  const set = (field: keyof typeof form) => (val: string) => {
    setForm(prev => ({ ...prev, [field]: val }))
    if (errors[field as keyof FormErrors]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 20) e.message = 'Please write at least 20 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSend = () => { if (validate()) setSent(true) }

  const fieldStyle = (hasError?: string) => ({
    background: 'white',
    border: hasError ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(13,43,69,0.12)',
    borderRadius: 12,
    outline: 'none',
    width: '100%',
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 500,
  })

  if (sent) {
    return (
      <div className="rounded-2xl p-6 sm:p-12 text-center" style={{ background: 'white', boxShadow: '0 4px 40px rgba(13,43,69,0.08)' }}>
        <div className="text-5xl mb-4">✉️</div>
        <h3 className="font-800 text-2xl mb-3" style={{ color: '#0D2B45', fontWeight: 800 }}>Message Sent!</h3>
        <p className="text-gray-500 text-base mb-6">Thank you, <strong>{form.name.split(' ')[0]}</strong>. We'll reply to <strong style={{ color: '#F47C20' }}>{form.email}</strong> as soon as possible.</p>
        <button onClick={() => { setSent(false); setForm({ name: '', email: '', mobile: '', subject: '', message: '' }) }}
          className="px-6 py-3 rounded-full text-white font-600 text-sm" style={{ background: '#F47C20', fontWeight: 600 }}>
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-8 lg:p-10" style={{ background: 'white', boxShadow: '0 4px 40px rgba(13,43,69,0.08)', border: '1px solid rgba(13,43,69,0.06)' }}>
      <h3 className="font-700 text-xl mb-6" style={{ color: '#0D2B45', fontWeight: 700 }}>Send Us a Message</h3>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-600 flex items-center gap-1" style={{ color: '#0D2B45', fontWeight: 600 }}>Full Name <span style={{ color: '#F47C20' }}>*</span></label>
          <input type="text" placeholder="Your full name" value={form.name} onChange={e => set('name')(e.target.value)}
            className="px-4 py-3.5 transition-all duration-200"
            style={{ ...fieldStyle(errors.name), padding: '14px 16px' }}
            onFocus={e => !errors.name && (e.currentTarget.style.borderColor = 'rgba(244,124,32,0.6)')}
            onBlur={e => !errors.name && (e.currentTarget.style.borderColor = 'rgba(13,43,69,0.12)')}
          />
          {errors.name && <span className="text-xs" style={{ color: '#ef4444' }}>{errors.name}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-600 flex items-center gap-1" style={{ color: '#0D2B45', fontWeight: 600 }}>Email Address <span style={{ color: '#F47C20' }}>*</span></label>
          <input type="email" placeholder="suresh@example.com" value={form.email} onChange={e => set('email')(e.target.value)}
            className="transition-all duration-200"
            style={{ ...fieldStyle(errors.email), padding: '14px 16px' }}
            onFocus={e => !errors.email && (e.currentTarget.style.borderColor = 'rgba(244,124,32,0.6)')}
            onBlur={e => !errors.email && (e.currentTarget.style.borderColor = 'rgba(13,43,69,0.12)')}
          />
          {errors.email && <span className="text-xs" style={{ color: '#ef4444' }}>{errors.email}</span>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-600" style={{ color: '#0D2B45', fontWeight: 600 }}>
            Mobile Number <span className="text-xs font-400" style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span>
          </label>
          <input type="tel" placeholder="+1 (555) 000-0000" value={form.mobile} onChange={e => set('mobile')(e.target.value)}
            className="transition-all duration-200"
            style={{ ...fieldStyle(), padding: '14px 16px' }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(244,124,32,0.6)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(13,43,69,0.12)')}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-600 flex items-center gap-1" style={{ color: '#0D2B45', fontWeight: 600 }}>Subject <span style={{ color: '#F47C20' }}>*</span></label>
          <select value={form.subject} onChange={e => set('subject')(e.target.value)}
            style={{ ...fieldStyle(errors.subject), padding: '14px 16px', cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230D2B45' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
            <option value="">Select a topic…</option>
            <option>General Enquiry</option>
            <option>Membership</option>
            <option>Health Insurance for Visitors</option>
            <option>Donations & Project Sponsorship</option>
            <option>Travel Grants</option>
            <option>Volunteer Opportunities</option>
            <option>Other</option>
          </select>
          {errors.subject && <span className="text-xs" style={{ color: '#ef4444' }}>{errors.subject}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mb-6">
        <label className="text-sm font-600 flex items-center gap-1" style={{ color: '#0D2B45', fontWeight: 600 }}>Message <span style={{ color: '#F47C20' }}>*</span></label>
        <textarea placeholder="Tell us how we can help you…" value={form.message} onChange={e => set('message')(e.target.value)} rows={5}
          className="resize-none transition-all duration-200"
          style={{ ...fieldStyle(errors.message), padding: '14px 16px' }}
          onFocus={e => !errors.message && (e.currentTarget.style.borderColor = 'rgba(244,124,32,0.6)')}
          onBlur={e => !errors.message && (e.currentTarget.style.borderColor = 'rgba(13,43,69,0.12)')}
        />
        <div className="flex items-center justify-between">
          {errors.message ? <span className="text-xs" style={{ color: '#ef4444' }}>{errors.message}</span> : <span />}
          <span className="text-xs" style={{ color: '#9ca3af' }}>{form.message.length} chars</span>
        </div>
      </div>

      <button onClick={handleSend}
        className="w-full py-4 rounded-xl font-700 text-white text-base transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
        style={{ background: '#F47C20', fontWeight: 700 }}>
        Send Message →
      </button>
    </div>
  )
}

// ── Map Placeholder ───────────────────────────────────────────────────────────
function MapSection() {
  return (
    <section className="py-16" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-4" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Find Us</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#0D2B45' }}>Our Office Location</h2>
        </div>
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{ height: 400, background: '#e8eeF5', border: '1px solid rgba(13,43,69,0.08)' }}
        >
          {/* Map placeholder with styled placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ background: 'linear-gradient(135deg, rgba(13,43,69,0.04) 0%, rgba(244,124,32,0.04) 100%)' }}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: '#F47C20' }}
            >
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-700 text-base mb-1" style={{ color: '#0D2B45', fontWeight: 700 }}>India Network Foundation</div>
              <div className="text-gray-500 text-sm">7065 Westpointe Blvd, Suite 208, Orlando, FL 32835</div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=7065+Westpointe+Blvd+Orlando+FL+32835"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-white text-sm font-600 transition-all duration-200 hover:scale-105"
              style={{ background: '#0D2B45', fontWeight: 600 }}
            >
              Open in Google Maps →
            </a>
          </div>
          {/* Decorative grid lines to suggest a map */}
          <svg className="absolute inset-0 w-full h-full opacity-10" style={{ pointerEvents: 'none' }}>
            {[...Array(12)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${(i + 1) * 8.33}%`} x2="100%" y2={`${(i + 1) * 8.33}%`} stroke="#0D2B45" strokeWidth="1" />
            ))}
            {[...Array(16)].map((_, i) => (
              <line key={`v${i}`} x1={`${(i + 1) * 6.25}%`} y1="0" x2={`${(i + 1) * 6.25}%`} y2="100%" stroke="#0D2B45" strokeWidth="1" />
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}

// ── Quick Contact Cards ───────────────────────────────────────────────────────
function QuickContactCards() {
  const { ref, inView } = useInView(0.2)
  const cards = [
    {
      icon: '📬',
      title: 'General Enquiries',
      desc: 'Questions about our work, programs, or the organization.',
      contact: 'info@indianetwork.org',
      color: '#F47C20',
    },
    {
      icon: '🪪',
      title: 'Membership & Insurance',
      desc: 'Member benefits, India Network Health Insurance and visitor coverage.',
      contact: 'info@indianetwork.org',
      color: '#2E8B57',
    },
    {
      icon: '🤝',
      title: 'Donations & Projects',
      desc: 'Sponsor a project in India or ask about tax-exempt giving.',
      contact: 'info@indianetwork.org',
      color: '#F47C20',
    },
    {
      icon: '✈️',
      title: 'Travel Grants',
      desc: 'Questions about academic and community organization grants.',
      contact: 'info@indianetwork.org',
      color: '#2E8B57',
    },
  ]
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(13,43,69,0.06)', color: '#0D2B45', fontWeight: 700 }}>Quick Contact</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0D2B45' }}>Reach the Right Team</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className="rounded-2xl p-6 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: '#FFF9F3',
                border: '1px solid rgba(13,43,69,0.06)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="font-700 text-base mb-2" style={{ color: '#0D2B45', fontWeight: 700 }}>{c.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{c.desc}</p>
              <a href={`mailto:${c.contact}`} className="text-sm font-600 hover:underline transition-colors" style={{ color: c.color, fontWeight: 600 }}>
                {c.contact}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'Are donations to India Network Foundation tax-exempt?', a: 'Yes. All contributions made to the India Network Foundation are tax-exempt in the United States, and a letter to this effect is issued for all contributions of more than $250, as required by the IRS.' },
  { q: 'Can I direct my donation to a specific project in India?', a: 'Yes. Send your contribution and indicate in your letter the developmental or educational project you would like to support. Our Project Director in India oversees implementation and reports back. Ten percent is retained to cover administrative, accounting and IRS filing costs.' },
  { q: 'Is my gift eligible for an employer matching grant?', a: 'Yes. India Network Foundation is eligible to receive matching grants from the corporate world. Please check with your employer.' },
  { q: 'How can I enroll my visiting parents in health insurance?', a: 'Members can enroll their visitors in India Network Health Insurance (KV Rao Insurance), which covers pre-existing conditions for all age groups. Visit www.kvrao.org for plans.' },
  { q: 'How do I apply for a travel grant?', a: 'Prepare three sets of your application — cover letter and CV, abstract, acceptance letter, two recommendations, budget and leave letter — and mail them to our Orlando office at least twelve weeks before the conference.' },
  { q: 'How do I send books for review?', a: 'Please send publications on India and Asian Indians to: ATTN: India Network Foundation, 7065 Westpointe Blvd, Suite 208, Orlando, FL 32835. Books sent for review will not be returned.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const { ref, inView } = useInView(0.1)
  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-5" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>FAQ</span>
          <h2 className="font-800" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0D2B45' }}>Common Questions</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: 'white',
                border: open === i ? '1px solid rgba(244,124,32,0.3)' : '1px solid rgba(13,43,69,0.06)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${i * 0.07}s`,
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="px-6 py-5 flex items-center justify-between gap-4">
                <span className="font-600 text-base" style={{ color: '#0D2B45', fontWeight: 600 }}>{faq.q}</span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ background: open === i ? '#F47C20' : 'rgba(13,43,69,0.06)', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  <svg width="12" height="12" fill="none" stroke={open === i ? 'white' : '#0D2B45'} strokeWidth="2.5" strokeLinecap="round">
                    <path d="M6 1v10M1 6h10" />
                  </svg>
                </div>
              </div>
              {open === i && (
                <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed" style={{ borderTop: '1px solid rgba(13,43,69,0.05)' }}>
                  <div className="pt-4">{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="mailto:info@indianetwork.org" className="text-sm font-600 hover:underline" style={{ color: '#F47C20', fontWeight: 600 }}>
            Have more questions? Email us directly →
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function Cta() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, #F47C20 0%, #e06010 100%)' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-white font-800 mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Ready to Take the Next Step?</h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">Join more than 150,000 members of the India Network Foundation community.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:scale-105" style={{ background: '#0D2B45', color: 'white', fontWeight: 700 }}>Become a Volunteer</Link>
          <Link to="/donate" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Donate Now</Link>
          <a href="mailto:info@indianetwork.org" className="px-8 py-4 rounded-full text-base font-700 transition-all duration-200 hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}>Partner With Us</a>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const { ref, inView } = useInView(0.1)
  return (
    <>
      <PageHero />
      <ContactInfoCards />

      {/* Form + Side info */}
      <section ref={ref} className="py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12">
            <div
              className="lg:col-span-2"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-widest mb-6" style={{ background: 'rgba(244,124,32,0.1)', color: '#F47C20', fontWeight: 700 }}>Write to Us</span>
              <h2 className="font-800 mb-5" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#0D2B45' }}>Let's Start a Conversation</h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                We're always happy to chat! Tell us what's on your mind — whether it's a question about membership, a project you would like to sponsor, or a travel grant application.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: '🕘', label: 'Office Hours', desc: 'Weekdays, 9:00 – 18:00.' },
                  { icon: '🌐', label: 'USA & India', desc: 'Head office in Orlando, with a Project Director in India.' },
                  { icon: '🔒', label: 'Private & Secure', desc: 'Your information is never shared.' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-700 text-sm mb-0.5" style={{ color: '#0D2B45', fontWeight: 700 }}>{item.label}</div>
                      <div className="text-gray-500 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="lg:col-span-3"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.15s' }}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <MapSection />
      <QuickContactCards />
      <FAQ />
      <Cta />
    </>
  )
}
