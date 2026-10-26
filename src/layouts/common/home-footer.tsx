// src/layouts/home/home-footer.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const itemTransition = { duration: 0.6, ease: "easeOut" as const };

interface LinkItem {
  label: string;
  to: string;
}

const productLinks: LinkItem[] = [
  // { label: "Platform", to: "/platform" },
  { label: "Kora Field", to: "/kora-field" },
  { label: "Solutions", to: "/solutions" },
];

const companyLinks: LinkItem[] = [
  { label: "Pilot Program", to: "/pricing" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Request a Demo", to: "/request-demo" },
];

const legalLinks: LinkItem[] = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

const ENVELOPE = [
  "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
];
const PHONE = [
  "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
];
const ARROW_RIGHT = ["M5 12h14", "m13 6 6 6-6 6"];
const ARROW_UP = ["M12 19V5", "m5 12 7-7 7 7"];

const contacts = [
  { label: "hello@kora.onl", href: "mailto:hello@kora.onl", icon: ENVELOPE },
  { label: "+237 683-505-360", href: "tel:+237683505360", icon: PHONE },
];

const Glyph = ({ paths, className }: { paths: string[]; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {paths.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);

const ColumnTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
    <span className="h-px w-5 bg-linear-to-r from-[#595bf1] to-[#f163ea]" />
    {children}
  </h2>
);

// Gradient underline sweeps in and a small arrow slides out on hover.
const FooterLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    to={to}
    className="group inline-flex items-center gap-1.5 text-[15px] text-gray-400 transition-colors duration-200 hover:text-white"
  >
    <span className="relative">
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-linear-to-r from-[#595bf1] to-[#f163ea] transition-all duration-300 group-hover:w-full" />
    </span>
    <Glyph
      paths={ARROW_RIGHT}
      className="size-3.5 -translate-x-1.5 text-[#f163ea] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    />
  </Link>
);

const LinkColumn = ({
  title,
  links,
  className,
}: {
  title: string;
  links: LinkItem[];
  className?: string;
}) => (
  <motion.nav variants={itemVariants} transition={itemTransition} aria-label={title} className={className}>
    <ColumnTitle>{title}</ColumnTitle>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.to}>
          <FooterLink to={link.to}>{link.label}</FooterLink>
        </li>
      ))}
    </ul>
  </motion.nav>
);

const HomeFooter = () => {
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  return (
    // isolate keeps the negative-z decoration inside the footer
    <footer className="relative isolate overflow-hidden bg-gray-950 text-gray-300">
      {/* Gradient edge on top, with a glow that falls into the footer */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#595bf1] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-24 w-2/3 -translate-x-1/2 -translate-y-1/2 bg-[#595bf1]/30 blur-3xl" />

      {/* Faint dot grid that fades out toward the bottom */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />

      {/* Brand-colored glows */}
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 size-[420px] rounded-full bg-[#595bf1]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-40 -z-10 size-[380px] rounded-full bg-[#f163ea]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 lg:px-8 lg:pt-20">
        <motion.div
          className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-x-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Brand */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="col-span-2 space-y-6 lg:col-span-4"
          >
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img
                src="https://res.cloudinary.com/doqholno8/image/upload/v1771016666/white_logo_cbf8ki.png"
                alt=""
                className="size-11"
              />
              <span className="text-3xl font-semibold text-white">Kora</span>
            </Link>

            <p className="max-w-sm text-base leading-relaxed text-gray-400">
              Helping humanitarian teams reach communities, coordinate assistance, and turn field data into meaningful impact, even when connectivity is limited.
            </p>

            <Link
              to="/pricing"
              className="inline-flex items-center gap-2.5 rounded-full bg-white/5 py-1.5 pl-3 pr-4 text-xs ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/10"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <span className="font-semibold text-white">Pilot phase</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-400">Now inviting organizations</span>
            </Link>
          </motion.div>

          <LinkColumn title="Product" links={productLinks} className="lg:col-span-2" />
          <LinkColumn title="Company" links={companyLinks} className="lg:col-span-2" />

          {/* Contact */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="col-span-2 lg:col-span-4"
          >
            <ColumnTitle>Contact</ColumnTitle>

            <ul className="space-y-3">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="group inline-flex items-center gap-3 text-[15px] text-gray-300 transition-colors duration-200 hover:text-white"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-linear-to-br group-hover:from-[#595bf1] group-hover:to-[#f163ea] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#747bff]/30 group-hover:ring-transparent">
                      <Glyph paths={c.icon} className="size-5" />
                    </span>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-500">
              For partnerships, field trials, or technical questions reach out directly.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 py-6 text-sm text-gray-500 sm:flex-row">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} Kora. All rights reserved.</p>
            <p className="mt-1 text-gray-600">Developed for real-world humanitarian impact.</p>
          </div>

          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="transition-colors duration-200 hover:text-white">
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex size-9 items-center justify-center rounded-full bg-white/5 text-gray-400 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-linear-to-br hover:from-[#595bf1] hover:to-[#f163ea] hover:text-white hover:ring-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Glyph paths={ARROW_UP} className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Oversized wordmark that fades out at the bottom */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <motion.p
          className="bg-linear-to-b from-[#595bf1]/50 via-[#f163ea]/15 to-transparent bg-clip-text text-center text-[30vw] font-bold leading-none tracking-tighter text-transparent sm:text-[26vw] lg:text-[22rem]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Kora
        </motion.p>
      </div>
    </footer>
  );
};

export default HomeFooter;