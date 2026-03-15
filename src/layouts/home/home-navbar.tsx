import { cn } from '../../utils/cn';
import logo from "../../assets/logo.svg";
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: "Who It's For", href: '#audience' },
  { label: 'Request Demo', href: '#demo-request' },
];

const HomeNavbar = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

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
              <a href="/" className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <img src={logo} alt="Kora Logo" className="lg:size-12 size-9" />
                  <p className="lg:text-3xl text-2xl text-primary font-semibold">Kora</p>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    activeSection === link.href.slice(1)
                      ? 'text-primary font-semibold underline underline-offset-4'
                      : 'text-gray-700 hover:text-primary'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3 sm:gap-4">
              {/* Request Demo button */}
              <a
                href="#demo-request"
                className={cn(
                  'group relative inline-flex items-center justify-center overflow-hidden',
                  'px-5 py-2 text-sm font-semibold rounded-xl min-w-35',
                  'bg-linear-to-r from-[#595bf1] to-[#f163ea]',
                  'text-white shadow-md shadow-[#747bff]/20',
                  'from-[#595bf1] to-[#f163ea]',
                  'hover:shadow-lg hover:shadow-[#747bff]/40 hover:min-w-42.5',
                  'transition-all duration-400 ease-out'
                )}
              >
                <span
                  className={cn(
                    'transition-all duration-400 ease-out',
                    'group-hover:-translate-x-3'
                  )}
                >
                  Request Demo
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={cn(
                    'absolute right-4 size-5 text-white/90',
                    'opacity-0 translate-x-4',
                    'group-hover:opacity-100 group-hover:translate-x-0',
                    'transition-all duration-400 ease-out'
                  )}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </a>

              <a
                href="https://kora.onl/space"
                className={cn(
                  'px-5 py-2 text-sm font-semibold rounded-xl',
                  'bg-primary text-white',
                  'hover:bg-primary/90',
                  'transition-all duration-200'
                )}
              >
                Get Started
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
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors py-2',
                  activeSection === link.href.slice(1)
                    ? 'text-primary font-semibold'
                    : 'text-gray-700 hover:text-primary'
                )}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile CTAs */}
          <div className="mt-auto space-y-4">
            <a
              href="#demo-request"
              className={cn(
                'block text-center py-3 px-6 rounded-xl font-semibold',
                'bg-linear-to-r from-[#747bff] to-[#6366f1]',
                'text-white shadow-md hover:shadow-lg hover:shadow-[#747bff]/40',
                'transition-all duration-300'
              )}
              onClick={handleLinkClick}
            >
              Request Demo
            </a>

            <a
              href="https://kora.onl/space"
              className="block text-center py-3 px-6 rounded-xl font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
              onClick={handleLinkClick}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNavbar;