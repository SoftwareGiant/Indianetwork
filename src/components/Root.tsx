import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer'

const SITE_NAME = 'India Network Foundation'

const pageTitles: Record<string, string> = {
  '/about': 'About Us',
  '/programs': 'Our Programs',
  '/programs/education': 'Education',
  '/programs/healthcare': 'Health Care',
  '/programs/community': 'Community Development',
  '/programs/disaster-relief': 'Disaster Relief',
  '/programs/cultural-preservation': 'Cultural Preservation',
  '/programs/travel-grants': 'Travel Grants',
  '/programs/senior-support': 'Senior Citizen Support',
  '/programs/youth-development': 'Youth Development',
  '/projects/inf-projects': 'INF Projects',
  '/projects/member-projects': 'Member Initiated Projects',
  '/projects/past-projects': 'Past Projects',
  '/projects/past': 'Past Projects',
  '/projects/travel-insurance': 'Health Insurance for Visitors',
  '/projects/insurance/explorer-basic': 'Explorer Basic Plan',
  '/projects/insurance/india-traveler': 'India Traveler Plan',
  '/projects/insurance/elite-protection': 'Elite Protection Plan',
  '/projects/insurance/certificate': 'Insurance Certificate',
  '/projects/nyu-scholarship': 'Student Scholarship at NYU',
  '/projects/academic-travel-grants': 'Travel Grants to Academics in India',
  '/projects/past/orissa-cyclone-relief': 'Orissa Cyclone Relief 1999',
  '/projects/past/gujarat-earthquake-relief': 'Gujarat Earthquake Relief 2001',
  '/projects/past/gujarat-cyclone-relief': 'Gujarat Cyclone Relief 1998',
  '/projects/past/kargil-operation-care': 'Operation Care — Kargil 1999',
  '/projects/past/andhra-pradesh-projects': 'Andhra Pradesh Community Projects',
  '/projects/past/maps-project': 'Map Set Donation Project',
  '/directory': 'Directory',
  '/directory/financial-institutions': 'Indian Financial Institutions',
  '/directory/embassies': 'List of Indian Embassies',
  '/directory/faculty': 'Indian Faculty in the United States',
  '/directory/nitpu-sites': 'NITPU Centre Sites',
  '/members': 'Member Benefits',
  '/impact': 'Our Impact',
  '/volunteer': 'Become a Volunteer',
  '/news': 'News & Events',
  '/donate': 'Donate',
  '/contact': 'Contact Us',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-use': 'Terms of Use',
}

export default function Root() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // Honour #anchors (e.g. /projects/nyu-scholarship#apply); otherwise start at the top
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100)
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const page = pageTitles[path]
    document.title = page ? `${page} | ${SITE_NAME}` : `${SITE_NAME} — Serving the Indian Community Since 1988`
  }, [pathname])

  return (
    <div style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
