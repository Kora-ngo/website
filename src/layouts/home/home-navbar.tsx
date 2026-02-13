import { cn } from '../../utils/cn';
import logo from "../../assets/logo.svg";

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Who It’s For', href: '#audience' },
];

const HomeNavbar = () => {
  return (
    <nav
      className={cn(
        'fixed left-0 right-0 z-50',
        'backdrop-blur-md bg-white/70 border-gray-200/70',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-2">
              <div
                className="flex items-center space-x-2"
              >
                <img src={logo} alt="" className="size-12" />
                <p className="text-3xl text-primary font-semibold">Kora</p>
              </div>
            </a>
          </div>

          {/* Navigation links – centered */}
          <div className="hidden md:flex md:items-center md:gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button
              className={cn(
                'px-5 py-2 text-sm font-semibold rounded-xl',
                'bg-primary text-white',
                'hover:bg-primary/90',
                'transition-all duration-200'
              )}
            >
              Get Started
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-700 hover:text-primary">
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;