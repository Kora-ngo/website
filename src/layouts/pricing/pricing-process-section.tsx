// src/layouts/pricing/pricing-process-section.tsx
import { motion, useReducedMotion } from "framer-motion";
import Badge from "../../widgets/badge";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const MESSAGES = [
  "M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z",
  "M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1",
];
const TARGET = [
  "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  "M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z",
  "M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
];
const SLIDERS = [
  "M21 4h-7",
  "M10 4H3",
  "M21 12h-9",
  "M8 12H3",
  "M21 20h-5",
  "M12 20H3",
  "M14 2v4",
  "M8 10v4",
  "M16 18v4",
];
const CHECK_CIRCLE = ["M21.801 10A10 10 0 1 1 17 3.335", "m9 11 3 3L22 4"];

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

const steps = [
  {
    title: "Let’s talk",
    body: "Discuss your team’s challenges and current workflows.",
    icon: MESSAGES,
    tile: "from-purple-500 to-purple-600",
    height: "lg:min-h-64",
  },
  {
    title: "Define the use case",
    body: "Agree on a realistic problem Kora can help evaluate.",
    icon: TARGET,
    tile: "from-yellow-500 to-yellow-600",
    height: "lg:min-h-72",
  },
  {
    title: "Set up the pilot",
    body: "Confirm access, scope, timeline, responsibilities, and any data requirements.",
    icon: SLIDERS,
    tile: "from-teal-500 to-teal-600",
    height: "lg:min-h-80",
  },
  {
    title: "Evaluate and review",
    body: "Gather feedback and assess whether Kora is a suitable fit for broader use.",
    icon: CHECK_CIRCLE,
    tile: "from-[#595bf1] to-[#f163ea]",
    height: "lg:min-h-96",
  },
];

const PricingProcessSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-28">
      <div className="pointer-events-none absolute -bottom-40 -right-32 size-115 rounded-full bg-linear-to-br from-[#595bf1]/10 to-[#f163ea]/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-32 -left-32 size-95 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        {/* Centered intro */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex justify-center">
            <Badge
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.605a12.694 12.694 0 0 1 5.68-4.973l1.086-.484-4.251-1.631a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
                </svg>
              }
            >
              The process
            </Badge>
          </div>

          <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Start Small.{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
              Learn Together.
            </span>
          </h2>
        </motion.div>

        {/* Steps: a staircase from lg up, a stack below */}
        <ol
          role="list"
          className="mx-auto mt-14 grid max-w-md grid-cols-1 gap-5 sm:max-w-none sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:items-end"
        >
          {steps.map((step, i) => {
            const last = i === steps.length - 1;

            return (
              // Outer: entrance + the staircase height. Inner: the card and its hover lift.
              <motion.li
                key={step.title}
                className={cn("relative", step.height)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              >
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-2xl p-6 shadow-lg ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-2xl",
                    last
                      ? "bg-linear-to-br from-[#595bf1] to-[#f163ea] text-white shadow-[#747bff]/30 ring-white/10"
                      : "bg-white ring-black/5"
                  )}
                >
                  {/* Big number: top right on small screens, cropped at the bottom on desktop */}
                  <span
                    className={cn(
                      "pointer-events-none absolute right-5 top-4 select-none text-5xl font-bold leading-none lg:-bottom-3 lg:right-3 lg:top-auto lg:text-8xl",
                      last
                        ? "text-white/15"
                        : "bg-linear-to-br from-[#595bf1]/15 to-[#f163ea]/15 bg-clip-text text-transparent"
                    )}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <motion.span
                    className={cn(
                      "relative flex size-11 items-center justify-center rounded-xl text-white shadow-sm",
                      last ? "bg-white/20 ring-1 ring-white/30" : cn("bg-linear-to-br", step.tile)
                    )}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.3 + i * 0.15 }}
                  >
                    <Glyph paths={step.icon} className="size-5" />
                  </motion.span>

                  <h3 className="relative mt-5 text-lg font-bold leading-snug">{step.title}</h3>
                  <p
                    className={cn(
                      "relative mt-2 text-base leading-relaxed",
                      last ? "text-white/85" : "text-gray-600"
                    )}
                  >
                    {step.body}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </ol>

        {/* Desktop: a floor under the stairs that points forward */}
        <div className="mt-8 hidden items-center lg:flex" aria-hidden="true">
          <motion.span
            className="h-0.5 flex-1 origin-left rounded-full bg-linear-to-r from-primary/10 via-primary/40 to-[#f163ea]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
          />
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-ml-2 size-5 text-[#f163ea]"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          >
            <path d="m9 6 6 6-6 6" />
          </motion.svg>
        </div>
      </div>
    </section>
  );
};

export default PricingProcessSection;