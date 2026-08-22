// src/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import './App.css'   // ← restored
import HomeNavbar from './layouts/home/home-navbar'
import HomeFooter from './layouts/home/home-footer'

function Layout() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ReactGA.send({ hitType: 'pageview', page: location.pathname })
    }
  }, [location])

  return (
    <div className="min-h-screen bg-white">
      <HomeNavbar />
      <Outlet />
      <HomeFooter />
    </div>
  );
}

export default Layout