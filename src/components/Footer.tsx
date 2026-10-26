import { useState } from 'react'
import { Link } from 'react-router'
import logo from '../imports/logo_of_india_network-removebg-preview.png'

const footerLinks = {
  Programs: [
    { label: 'Education', to: '/programs/education' },
    { label: 'Healthcare', to: '/programs/healthcare' },
    { label: 'Community Development', to: '/programs/community' },
    { label: 'Travel Grants', to: '/programs/travel-grants' },
    { label: 'Cultural Preservation', to: '/programs/cultural-preservation' },
  ],
  Organization: [
    { label: 'About INF', to: '/about' },
    { label: 'Our Founder', to: '/about' },
    { label: 'Our Impact', to: '/impact' },
    { label: 'Past Projects', to: '/projects/past-projects' },
    { label: 'News & Events', to: '/news' },
  ],
  Resources: [
    { label: 'Member Benefits', to: '/members' },
    { label: 'Visitor Health Insurance', to: '/projects/travel-insurance' },
    { label: 'Apply for a Travel Grant', to: '/projects/academic-travel-grants' },
    { label: 'Make a Donation', to: '/donate' },
    { label: 'Directory', to: '/directory' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer style={{ backgroundColor: '#0D2B45' }} className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src={logo} alt="India Network Foundation" className="h-12 w-auto" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' }} />
              <div className="text-white" style={{ fontWeight: 800, fontSize: '1rem' }}>India Network Foundation</div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Helping the Indian community through non-profit projects, disaster relief, health care for Indian travelers and travel grants since 1988.
            </p>
            <div>
              <p className="text-white/70 text-sm mb-3" style={{ fontWeight: 600 }}>Stay informed</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                />
                <button
                  className="px-4 py-2.5 rounded-xl text-sm text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: '#F47C20', fontWeight: 600 }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white text-sm uppercase tracking-wider mb-5" style={{ fontWeight: 700 }}>{group}</h4>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-white/45 hover:text-white text-sm transition-colors duration-200">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div
          className="flex flex-wrap gap-8 py-8 mb-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { icon: '📍', text: '7065 Westpointe Blvd, Suite 208, Orlando, FL 32835' },
            { icon: '📞', text: '408-540-3600' },
            { icon: '✉️', text: 'info@indianetwork.org' },
          ].map(c => (
            <div key={c.text} className="flex items-center gap-2 text-white/45 text-sm">
              <span>{c.icon}</span><span>{c.text}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <span>© {new Date().getFullYear()} India Network Foundation, Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-use" className="hover:text-white/60 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
