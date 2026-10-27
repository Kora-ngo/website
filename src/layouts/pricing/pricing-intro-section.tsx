// src/layouts/pricing/pricing-intro-section.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Badge from "../../widgets/badge";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const PEOPLE = [
  "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
];
const PIN = [
  "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
];
const CHAT = [
  "M21 12c0 4.418-4.03 8-9 8a9.9 9.9 0 0 1-3.5-.63L3 21l1.5-4.2C3.55 15.6 3 13.86 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z",
  "M8 12h.01",
  "M12 12h.01",
  "M16 12h.01",
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

const pilotPoints = [
  {
    title: "For NGOs",
    sub: "Humanitarian and community programs",
    icon: PEOPLE,
    tile: "from-purple-500 to-purple-600",
    offset: "lg:mr-10",
    fromX: -40,
  },
  {
    title: "Real field needs",
    sub: "Grounded in operational challenges",
    icon: PIN,
    tile: "from-yellow-500 to-yellow-600",
    offset: "lg:ml-10",
    fromX: 40,
  },
  {
    title: "Collaborative",
    sub: "Feedback-driven evaluation",
    icon: CHAT,
    tile: "from-[#595bf1] to-[#f163ea]",
    offset: "lg:mr-4",
    fromX: -40,
  },
];

const PilotIllustration = () => (
  // isolate keeps the negative-z glow inside this block
  <div className="relative isolate mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
      <div className="absolute size-80 rounded-full bg-linear-to-br from-[#595bf1]/20 to-[#f163ea]/20 blur-3xl" />
      <div className="absolute hidden size-112 rounded-full border-2 border-dashed border-primary/10 sm:block" />
    </div>

    {/* Status chip */}
    <motion.div
      className="mb-5 inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-3 pr-4 text-xs font-semibold text-gray-700 shadow-md ring-1 ring-black/5"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-green-500" />
      </span>
      Pilot phase
      <span className="text-gray-300">·</span>
      <span className="font-medium text-gray-500">Now inviting organizations</span>
    </motion.div>

    <div className="space-y-4">
      {pilotPoints.map((p, i) => (
        // Outer: entrance. Inner: the card and its hover lift.
        <motion.div
          key={p.title}
          className={p.offset}
          initial={{ opacity: 0, x: p.fromX, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.35 + i * 0.2, ease: "easeOut" }}
        >
          <article className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <span
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-sm",
                p.tile
              )}
            >
              <Glyph paths={p.icon} className="size-6" />
            </span>

            <div className="min-w-0">
              <h3 className="text-base font-bold leading-tight text-gray-900">{p.title}</h3>
              <p className="mt-1 text-sm leading-snug text-gray-500">{p.sub}</p>
            </div>
          </article>
        </motion.div>
      ))}
    </div>
  </div>
);

const PricingIntroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Soft brand-colored wash behind the hero */}
      <div className="pointer-events-none absolute -top-32 -right-32 size-130 rounded-full bg-linear-to-br from-[#595bf1]/10 to-[#f163ea]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 size-105 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: text */}
          <motion.div
            className="space-y-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" />
                </svg>
              }
            >
              Kora pilot program
            </Badge>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Be Part of{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
                Shaping the Future
              </span>{" "}
              of Field Operations.
            </h1>

            <div className="max-w-xl space-y-4 text-lg leading-relaxed text-gray-600">
              <p>
                Kora is currently in its <b className="text-primary">pilot phase</b>, working toward a more practical way for NGOs
                and humanitarian organizations to manage beneficiary information, coordinate field
                activities, and track assistance delivery, even in areas with limited connectivity.
              </p>
              <p>
                We’re inviting organizations to explore Kora, evaluate how it fits their operations,
                and share feedback that will help shape its continued development.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/request-demo"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white",
                  "bg-linear-to-r from-[#595bf1] to-[#f163ea]",
                  "shadow-md shadow-[#747bff]/20 transition-all duration-300",
                  "hover:scale-[1.03] hover:shadow-lg hover:shadow-[#747bff]/40",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                )}
              reloadDocument>
                Discuss a Pilot with Us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right: the three pilot points */}
          <PilotIllustration />
        </div>
      </div>
    </section>
  );
};

export default PricingIntroSection;