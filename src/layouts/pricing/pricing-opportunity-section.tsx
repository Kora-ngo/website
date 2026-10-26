// src/layouts/pricing/pricing-opportunity-section.tsx
import { motion } from "framer-motion";
import Badge from "../../widgets/badge";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const WIFI_OFF = ["M2 8.8a15 15 0 0 1 20 0", "M5 12.5a10 10 0 0 1 14 0", "M8.5 16a5 5 0 0 1 7 0", "M3 3l18 18"];
const PEOPLE = [
  "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
];
const SHIELD_CHECK = [
  "M9 12.75 11.25 15 15 9.75",
  "M12 3 4.5 6v5.25c0 4.5 3.2 8.2 7.5 9.75 4.3-1.55 7.5-5.25 7.5-9.75V6L12 3Z",
];
const DOCUMENT = [
  "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
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

const areas = [
  {
    title: "Offline beneficiary data collection",
    icon: WIFI_OFF,
    tile: "from-yellow-500 to-yellow-600",
  },
  {
    title: "Beneficiary record organization and assistance tracking",
    icon: PEOPLE,
    tile: "from-purple-500 to-purple-600",
  },
  {
    title: "Review of field submissions and project monitoring",
    icon: SHIELD_CHECK,
    tile: "from-teal-500 to-teal-600",
  },
  {
    title: "Reporting and data export workflows",
    icon: DOCUMENT,
    tile: "from-blue-500 to-blue-600",
  },
];

const PricingOpportunitySection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-28">
      <div className="pointer-events-none absolute -bottom-40 -right-32 size-[460px] rounded-full bg-linear-to-br from-[#595bf1]/10 to-[#f163ea]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: text */}
          <motion.div
            className="space-y-6 lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
              }
            >
              The opportunity
            </Badge>

            <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Explore Kora{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
                With Your Team.
              </span>
            </h2>

            <p className="max-w-lg text-lg leading-relaxed text-gray-600">
              Organizations participating in a pilot can evaluate how Kora supports their
              day-to-day field operations, identify what works for their teams, and help us
              understand where improvements are needed.
            </p>
          </motion.div>

          {/* Right: areas to explore */}
          <div className="lg:col-span-7">
            <motion.div
              className="mb-5 flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Potential areas to explore
              </p>
              <span className="h-px flex-1 bg-primary/15" />
            </motion.div>

            <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-5">
              {areas.map((area, i) => (
                // Outer: entrance + the staggered offset (margin, so it never fights
                // the motion transform). Inner: the card and its hover lift.
                <motion.div
                  key={area.title}
                  className="sm:even:mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: "easeOut" }}
                >
                  <article className="group relative h-full rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <div className="flex items-start justify-between">
                      <span
                        className={cn(
                          "flex size-12 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-sm",
                          area.tile
                        )}
                      >
                        <Glyph paths={area.icon} className="size-6" />
                      </span>
                      <span className="text-4xl font-bold leading-none text-gray-100">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold leading-snug text-gray-900">
                      {area.title}
                    </h3>

                    <span className="mt-4 block h-0.5 w-8 rounded-full bg-linear-to-r from-[#595bf1] to-[#f163ea] transition-all duration-300 group-hover:w-16" />
                  </article>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingOpportunitySection;