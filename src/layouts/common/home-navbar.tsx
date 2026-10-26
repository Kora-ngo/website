import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import logo from "../../assets/logo.svg";
import userLocked from "../../assets/icons/user_locked.png";
import { useState } from 'react';

const navLinks = [
  // { label: 'Platform', href: '/platform' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Kora Field', href: '/kora-field' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about-us' },


];

const HomeNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={cn('fixed left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/70')}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <img src={logo} alt="Kora Logo" className="lg:size-12 size-9" />
                  <p className="lg:text-3xl text-2xl text-primary font-semibold">Kora</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    location.pathname === link.href
                      ? 'text-primary font-semibold underline underline-offset-4'
                      : 'text-gray-700 hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3 sm:gap-4">
              <Link
                to="/request-demo"
                className={cn(
                  'inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold transition-all duration-200',
                  'bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90',
                  'rounded-md',
                  location.pathname === '/request-demo' && 'ring-2 ring-primary/20'
                )}
              >
                Request a Demo
              </Link>


              <a
                href="https://kora.onl/space"
                aria-label="Kora Space"
                title="Kora Space"
                className={cn(
                  'inline-flex items-center justify-center border border-primary/10 bg-white text-primary shadow-sm transition-all duration-200',
                  'size-11 hover:-translate-y-0.5 hover:shadow-md hover:text-white rounded-md',
                  // location.pathname === '/space' && 'border-primary text-white shadow-md'
                )}
              >
                 <img src={userLocked} alt="Kora Logo" className="lg:size-5 size-4" />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 0 1 6 5.25h12A2.25 2.25 0 0 1 20.25 7.5v9A2.25 2.25 0 0 1 18 18.75H6A2.25 2.25 0 0 1 3.75 16.5v-9Zm0 0L12 12.75 20.25 7.5" />
                </svg> */}
              </a>

            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-700 hover:text-primary focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu – outside <nav> so it's not clipped by it */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close button */}
          <button
            className="self-end text-gray-700 hover:text-primary mb-8 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile nav links */}
          <div className="flex flex-col gap-6 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'transition-colors py-2',
                  location.pathname === link.href
                    ? 'text-primary font-semibold'
                    : 'text-gray-700 hover:text-primary'
                )}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile CTAs */}
          <div className="mt-auto space-y-4">
            <a
              href="https://kora.onl/space"
              aria-label="Go to admin dashboard"
              className={cn(
                'inline-flex w-full items-center justify-center border border-primary/10 bg-white p-3 text-primary shadow-sm transition-colors hover:bg-primary hover:text-white',
                location.pathname === '/request-demo' && 'bg-primary text-white'
              )}
              onClick={handleLinkClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 0 1 6 5.25h12A2.25 2.25 0 0 1 20.25 7.5v9A2.25 2.25 0 0 1 18 18.75H6A2.25 2.25 0 0 1 3.75 16.5v-9Zm0 0L12 12.75 20.25 7.5" />
              </svg>
            </a>

            <Link
              to="/request-demo"
              className="block text-center bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 rounded-none"
              onClick={handleLinkClick}
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNavbar;
