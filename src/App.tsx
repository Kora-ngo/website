// App.tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/home';
import TermsOfService from './pages/terms';      // create this file next
import PrivacyPolicy from './pages/privacy';     // create this file next
import NotFound from './pages/not-found';        // create this file next
import { useEffect } from 'react';
import ReactGA from 'react-ga4'

ReactGA.initialize("G-L5DS0KW5N9");

function TrackPageViews() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <TrackPageViews />
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<Home />} />

        {/* Legal pages */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* 404 - catch-all for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;