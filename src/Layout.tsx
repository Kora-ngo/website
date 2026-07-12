// src/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import './App.css'   // ← restored

function Layout() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ReactGA.send({ hitType: 'pageview', page: location.pathname })
    }
  }, [location])

  return <Outlet />
}

export default Layout