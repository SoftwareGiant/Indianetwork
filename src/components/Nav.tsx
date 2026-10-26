import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import logo from '../imports/logo_of_india_network-removebg-preview.png'

const projectsSubmenu = [
  { label: 'INF Projects', to: '/projects/inf-projects', desc: 'Foundation-managed initiatives' },
  { label: 'Member Initiated Projects', to: '/projects/member-projects', desc: 'Community-proposed projects' },
  { label: 'Past Projects', to: '/projects/past-projects', desc: 'Completed project archive' },
  { label: 'INF Initiatives', to: '/projects/inf-initiatives', desc: 'History, relief efforts and publications' },
  { label: 'Culture', to: '/projects/culture', desc: 'Indian festivals and Hindu temples in the U.S.' },
  { label: 'Indian Stamps', to: '/projects/indian-stamps', desc: 'Gallery of Indian postage stamps' },
  { label: 'PIO Card', to: '/projects/pio-card', desc: 'Person of Indian Origin card archive' },
  { label: 'Press Releases', to: '/projects/press-releases', desc: 'Official announcements' },
]

const directorySubmenu = [
  { label: 'Indian Financial Institutions', to: '/directory/financial-institutions', desc: 'Banks, NBFCs, and insurance' },
  { label: 'List of Indian Embassies', to: '/directory/embassies', desc: 'Indian foreign offices worldwide' },
  { label: 'Indian Faculty', to: '/directory/faculty', desc: 'Indian faculty in the United States' },
  { label: 'NITPU Centre Sites', to: '/directory/nitpu-sites', desc: 'NITPU network of centres' },
]

const navLinks = [
  { label: 'Impact', to: '/impact' },
  { label: 'Volunteer', to: '/volunteer' },
  { label: 'News & Events', to: '/news' },
  { label: 'Members', to: '/members' },
  { label: 'Contact', to: '/contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false)
  const [directoryOpen, setDirectoryOpen] = useState(false)
  const [mobileDirectoryOpen, setMobileDirectoryOpen] = useState(false)
  const projectsRef = useRef<HTMLDivElement>(null)
  const directoryRef = useRef<HTMLDivElement>(null)
  const projectsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const directoryCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProjectsOpen(false)
    setMobileProjectsOpen(false)
    setDirectoryOpen(false)
    setMobileDirectoryOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (projectsRef.current && !projectsRef.current.contains(e.target as Node)) {
        setProjectsOpen(false)
      }
      if (directoryRef.current && !directoryRef.current.contains(e.target as Node)) {
        setDirectoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function openProjects() {
    if (projectsCloseTimer.current) clearTimeout(projectsCloseTimer.current)
    setProjectsOpen(true)
  }
  function closeProjectsDelayed() {
    projectsCloseTimer.current = setTimeout(() => setProjectsOpen(false), 120)
  }

  function openDirectory() {
    if (directoryCloseTimer.current) clearTimeout(directoryCloseTimer.current)
    setDirectoryOpen(true)
  }
  function closeDirectoryDelayed() {
    directoryCloseTimer.current = setTimeout(() => setDirectoryOpen(false), 120)
  }

  const solid = !isHome || scrolled
  const isProjectsActive = location.pathname.startsWith('/projects')
  const isDirectoryActive = location.pathname.startsWith('/directory')

  const dropdownStyle: React.CSSProperties = {
    background: 'rgba(13,43,69,0.98)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(20px)',
  }

  function DropdownItem({ item, onClose }: { item: { label: string; to: string; desc: string }; onClose: () => void }) {
    return (
      <Link
        to={item.to}
        onClick={onClose}
        className="flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-all duration-150"
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <span className="text-white text-sm" style={{ fontWeight: 600 }}>{item.label}</span>
        <span className="text-white/40 text-xs">{item.desc}</span>
      </Link>
    )
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: solid ? 'rgba(13,43,69,0.97)' : 'transparent',
        backdropFilter: solid ? 'blur(12px)' : 'none',
        boxShadow: solid ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between" style={{ height: 72 }}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="India Network Foundation" className="h-10 w-auto" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
          <div className="hidden sm:block xl:hidden 2xl:block text-white leading-tight" style={{ fontWeight: 800, fontSize: '0.95rem' }}>India Network Foundation</div>
        </Link>

        {/* Desktop links */}
        <div className="hidden xl:flex items-center gap-4 2xl:gap-5">
          <NavLink to="/" end className={({ isActive }) => `text-sm transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`} style={{ fontWeight: 500 }}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `text-sm transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`} style={{ fontWeight: 500 }}>About</NavLink>
          <NavLink to="/programs" className={({ isActive }) => `text-sm transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`} style={{ fontWeight: 500 }}>Programs</NavLink>

          {/* Projects dropdown */}
          <div
            ref={projectsRef}
            className="relative"
            onMouseEnter={openProjects}
            onMouseLeave={closeProjectsDelayed}
          >
            <button
              onClick={() => setProjectsOpen(v => !v)}
              className={`flex items-center gap-1 text-sm transition-colors duration-200 whitespace-nowrap ${isProjectsActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
              style={{ fontWeight: 500 }}
            >
              Projects
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${projectsOpen ? 'rotate-180' : ''}`}><path d="M4 6l4 4 4-4" /></svg>
            </button>
            {/* pt-3 bridges the gap so mouse leaving button into panel doesn't close the dropdown */}
            {projectsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                <div className="rounded-2xl overflow-hidden shadow-2xl" style={dropdownStyle}>
                  <div className="p-2">
                    {projectsSubmenu.map(item => (
                      <DropdownItem key={item.to} item={item} onClose={() => setProjectsOpen(false)} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Directory dropdown */}
          <div
            ref={directoryRef}
            className="relative"
            onMouseEnter={openDirectory}
            onMouseLeave={closeDirectoryDelayed}
          >
            <button
              onClick={() => setDirectoryOpen(v => !v)}
              className={`flex items-center gap-1 text-sm transition-colors duration-200 whitespace-nowrap ${isDirectoryActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
              style={{ fontWeight: 500 }}
            >
              Directory
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${directoryOpen ? 'rotate-180' : ''}`}><path d="M4 6l4 4 4-4" /></svg>
            </button>
            {directoryOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80">
                <div className="rounded-2xl overflow-hidden shadow-2xl" style={dropdownStyle}>
                  <div className="p-2">
                    {directorySubmenu.map(item => (
                      <DropdownItem key={item.to} item={item} onClose={() => setDirectoryOpen(false)} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {navLinks.map(({ label, to }) => (
            <NavLink key={label} to={to}
              className={({ isActive }) => `text-sm transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
              style={{ fontWeight: 500 }}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Donate CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link to="/donate" className="px-4 sm:px-5 py-2.5 rounded-full text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap" style={{ background: '#F47C20', fontWeight: 600 }}>
            Donate Now
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden text-white p-1" aria-label="Toggle menu">
            {mobileOpen
              ? <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l10 10M16 6L6 16" /></svg>
              : <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h14M4 12h14M4 17h14" /></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden px-6 pb-6 overflow-y-auto" style={{ backgroundColor: 'rgba(13,43,69,0.98)', maxHeight: 'calc(100vh - 72px)' }}>
          <NavLink to="/" end onClick={() => setMobileOpen(false)} className="block py-3 text-white/80 hover:text-white text-base border-b border-white/10 transition-colors">Home</NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)} className="block py-3 text-white/80 hover:text-white text-base border-b border-white/10 transition-colors">About</NavLink>
          <NavLink to="/programs" onClick={() => setMobileOpen(false)} className="block py-3 text-white/80 hover:text-white text-base border-b border-white/10 transition-colors">Programs</NavLink>

          {/* Mobile Projects */}
          <div className="border-b border-white/10">
            <button onClick={() => setMobileProjectsOpen(v => !v)}
              className="flex items-center justify-between w-full py-3 text-white/80 hover:text-white text-base transition-colors">
              Projects
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${mobileProjectsOpen ? 'rotate-180' : ''}`}><path d="M4 6l4 4 4-4" /></svg>
            </button>
            {mobileProjectsOpen && (
              <div className="pb-2 pl-4">
                {projectsSubmenu.map(item => (
                  <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-white/60 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Directory */}
          <div className="border-b border-white/10">
            <button onClick={() => setMobileDirectoryOpen(v => !v)}
              className="flex items-center justify-between w-full py-3 text-white/80 hover:text-white text-base transition-colors">
              Directory
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${mobileDirectoryOpen ? 'rotate-180' : ''}`}><path d="M4 6l4 4 4-4" /></svg>
            </button>
            {mobileDirectoryOpen && (
              <div className="pb-2 pl-4">
                {directorySubmenu.map(item => (
                  <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-white/60 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map(({ label, to }) => (
            <NavLink key={label} to={to} onClick={() => setMobileOpen(false)}
              className="block py-3 text-white/80 hover:text-white text-base border-b border-white/10 transition-colors">
              {label}
            </NavLink>
          ))}
          <Link to="/donate" onClick={() => setMobileOpen(false)}
            className="block mt-4 text-center py-3 rounded-full text-white text-base"
            style={{ background: '#F47C20', fontWeight: 600 }}>
            Donate Now
          </Link>
        </div>
      )}
    </nav>
  )
}
