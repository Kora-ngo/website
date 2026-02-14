
const HomeFooter = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Who It’s For", href: "#who" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand / Logo column */}
          <div className="space-y-6">
            <div className="flex-shrink-0">
                <a href="/" className="flex items-center gap-2">
                <div
                    className="flex items-center space-x-2"
                >
                    <img src="https://res.cloudinary.com/doqholno8/image/upload/v1771016666/white_logo_cbf8ki.png" alt="" className="size-12" />
                    <p className="text-3xl text-white font-semibold">Kora</p>
                </div>
                </a>
            </div>

            <p className="text-gray-400 text-base max-w-xs">
              The offline-first beneficiary & aid tracking operating system built for real-world humanitarian work.
            </p>

            {/* Social icons */}
            {/* <div className="flex gap-5 mt-6">
              {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-gray-400 hover:text-[#747bff] transition-colors"
                  aria-label={platform}
                >
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                </a>
              ))}
            </div> */}
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Navigation</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#747bff] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Legal & Support</h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#747bff] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:support@kora.app"
                  className="text-gray-400 hover:text-[#747bff] transition-colors"
                >
                  support@kora.app
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Quick contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe for updates, new features, and humanitarian impact stories.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#747bff] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#747bff] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#6366f1] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-10 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Kora. All rights reserved.</p>
          {/* <p className="mt-2">
            Built with care for humanitarian impact.
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;