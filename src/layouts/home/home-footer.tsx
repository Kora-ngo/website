
const HomeFooter = () => {
  const navLinks = [
    // { name: "Home", href: "/" },
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Who It’s For", href: "#who" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact Us", href: "mailto:denzetchaptche@gmail.com" }
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
              {/* <li>
                <a
                  href="mailto:support@kora.app"
                  className="text-gray-400 hover:text-[#747bff] transition-colors"
                >
                  support@kora.app
                </a>
              </li> */}
            </ul>
          </div>

          {/* Newsletter / Quick contact */}
          {/* <div>
            <h3 className="text-white font-semibold text-lg mb-6">Join the Movement</h3>
            <p className="text-gray-400 mb-5 leading-relaxed">
              Be among the first to access Kora Field, receive early invites, and help shape the future of transparent, offline-first aid delivery.
            </p>

            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your work email"
                required
                className="bg-gray-900 border border-gray-700 rounded-lg px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#747bff] focus:ring-1 focus:ring-[#747bff]/40 transition-all"
              />
              <button
                type="submit"
                className="bg-[#747bff] text-white font-medium py-3.5 px-8 rounded-lg hover:bg-[#6366f1] active:bg-[#5a5ee6] transition-all shadow-md hover:shadow-lg hover:shadow-[#747bff]/30"
              >
                Get Early Access
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-5">
              We respect your privacy — no spam, ever. Only meaningful updates.
            </p>
          </div> */}

          <div>
  <h3 className="text-white font-semibold text-lg mb-6">Ready to Transform Aid Delivery?</h3>
  
  {/* <p className="text-gray-400 mb-6 leading-relaxed">
    Kora is built from real field experience to bring structure, transparency, and offline reliability to humanitarian operations. We're actively working with early partners to refine and scale the platform.
  </p> */}

  <div className="space-y-4 text-sm">
    <div className="flex items-start gap-3 text-gray-300">
      <svg className="size-5 text-[#747bff] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.707 8.707a1 1 0 011.414 0L9 11.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      <span>Offline-first mobile app already in active field testing</span>
    </div>
    
    <div className="flex items-start gap-3 text-gray-300">
      <svg className="size-5 text-[#747bff] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.707 8.707a1 1 0 011.414 0L9 11.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      <span>Household-level tracking with a flexible verifcation mechanism</span>
    </div>
    
    <div className="flex items-start gap-3 text-gray-300">
      <svg className="size-5 text-[#747bff] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.707 8.707a1 1 0 011.414 0L9 11.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      <span>Designed by people who’ve worked in the field</span>
    </div>
  </div>

  <p className="text-sm text-gray-500 mt-8 italic">
    “Structure where there was chaos. Proof where there was doubt.”
  </p>
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