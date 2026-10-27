import { motion } from "framer-motion";
import Badge from "../../widgets/badge";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const pillsContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};

const pillItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const KORA_FIELD_IMAGE =
  "https://res.cloudinary.com/doqholno8/image/upload/v1792940314/kora-field-section_hhah2f.png";

const promises = [
  {
    label: "Work offline",
    tile: "from-yellow-500 to-yellow-600",
    paths: ["M2 8.8a15 15 0 0 1 20 0", "M5 12.5a10 10 0 0 1 14 0", "M8.5 16a5 5 0 0 1 7 0", "M3 3l18 18"],
  },
  {
    label: "Collect with confidence",
    tile: "from-purple-500 to-purple-600",
    paths: ["M9 12.75 11.25 15 15 9.75", "M12 3 4.5 6v5.25c0 4.5 3.2 8.2 7.5 9.75 4.3-1.55 7.5-5.25 7.5-9.75V6L12 3Z"],
  },
  {
    label: "Sync when connected",
    tile: "from-[#595bf1] to-[#f163ea]",
    paths: [
      "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
    ],
  },
];

const KoraFieldIntroSection = () => {
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
              }
            >
              Kora Field
            </Badge>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Your Fieldwork{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
                Doesn’t Have to Stop
              </span>{" "}
              When the Internet Does.
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              Collect beneficiary information, record assistance, and keep your team moving, even
              in communities where connectivity is unreliable.
            </p>

            {/* Three promises */}
            <motion.ul
              className="flex flex-wrap gap-2.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={pillsContainer}
            >
              {promises.map((p) => (
                <motion.li
                  key={p.label}
                  variants={pillItem}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium text-gray-700 shadow-sm"
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-white",
                      p.tile
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                      aria-hidden="true"
                    >
                      {p.paths.map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </span>
                  {p.label}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs */}
            {/* <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/request-demo"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white",
                  "bg-linear-to-r from-[#595bf1] to-[#f163ea]",
                  "shadow-md shadow-[#747bff]/20 transition-all duration-300",
                  "hover:scale-[1.03] hover:shadow-lg hover:shadow-[#747bff]/40",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                )}
              >
                Request a Demo
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

              <Link
                to="/platform"
                className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-primary/40 hover:text-primary"
              >
                Explore the Platform
              </Link>
            </div> */}
          </motion.div>

          {/* Right: field worker + Kora Field phone */}
          <motion.div
            className="relative isolate flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Glow behind the image */}
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
              <div className="size-80 rounded-full bg-linear-to-br from-[#595bf1]/20 to-[#f163ea]/20 blur-3xl" />
            </div>

            <img
              src={KORA_FIELD_IMAGE}
              alt="A field worker in a community using the Kora Field app on a phone"
              className="h-auto w-full max-w-xl object-contain rounded-2xl"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KoraFieldIntroSection;