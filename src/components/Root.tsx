import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer'

export default function Root() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

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
