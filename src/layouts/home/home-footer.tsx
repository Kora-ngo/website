const HomeFooter = () => {
  const navLinks = [
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Who It’s For", href: "#who" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    // { name: "Contact", href: "mailto:denzetchaptche@gmail.com" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand / Logo column */}
          <div className="space-y-6 w-80">
            <a href="/" className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <img
                  src="https://res.cloudinary.com/doqholno8/image/upload/v1771016666/white_logo_cbf8ki.png"
                  alt="Kora Logo"
                  className="size-12"
                />
                <p className="text-3xl text-white font-semibold">Kora</p>
              </div>
            </a>

            <p className="text-gray-400 text-base max-w-xs">
              Offline-first beneficiary and aid tracking system designed for humanitarian operations in challenging environments.
            </p>

            {/* <div className="space-y-4 text-sm">
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
            </div> */}
          </div>

          {/* Navigation */}
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
            </ul>
          </div>

          {/* Founder / Contact – Professional & Direct */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <div className="space-y-4 text-sm text-gray-300">
              {/* <p>
                Built and maintained by Denzel Chaptche<br />
                <span className="text-gray-400">Founder & Lead Developer</span>
              </p> */}

              <div className="space-y-2">
                <a
                  href="https://denzel-labs.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-[#747bff] transition-colors"
                >
                  About the Founder
                </a>

                <a
                  href="mailto:denzetchaptche@gmail.com"
                  className="block text-gray-400 hover:text-[#747bff] transition-colors"
                >
                  denzetchaptche@gmail.com
                </a>

                {/* Replace with your actual number – remove if you prefer not to show it publicly */}
                <a
                  href="tel:+237xxxxxxxxx"  // ← Update this
                  className="block text-gray-400 hover:text-[#747bff] transition-colors"
                >
                  +237 683-505-360
                </a>
              </div>

              <p className="text-gray-500 text-xs pt-2">
                For partnerships, field trials, or technical questions reach out directly.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-10 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Kora. All rights reserved.</p>
          <p className="mt-1">
            Developed for real-world humanitarian impact.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;