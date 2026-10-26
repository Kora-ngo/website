// src/layouts/pricing/pricing-working-together-section.tsx
import { motion, useReducedMotion } from "framer-motion";
import Badge from "../../widgets/badge";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const COMPASS = [
  "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  "M16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88Z",
];
const CHAT = [
  "M21 12c0 4.418-4.03 8-9 8a9.9 9.9 0 0 1-3.5-.63L3 21l1.5-4.2C3.55 15.6 3 13.86 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z",
  "M8 12h.01",
  "M12 12h.01",
  "M16 12h.01",
];
const CLIPBOARD_CHECK = [
  "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",
  "M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z",
  "m9 14 2 2 4-4",
];
const CYCLE = [
  "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
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

const steps = [
  {
    title: "Guided introduction",
    body: "Understand Kora’s current capabilities and limitations.",
    icon: COMPASS,
    tile: "from-purple-500 to-purple-600",
  },
  {
    title: "Use-case discussion",
    body: "Identify a relevant workflow within your organization’s operations.",
    icon: CHAT,
    tile: "from-yellow-500 to-yellow-600",
  },
  {
    title: "Pilot support",
    body: "Agree on the practical scope and support available during the evaluation.",
    icon: CLIPBOARD_CHECK,
    tile: "from-teal-500 to-teal-600",
  },
  {
    title: "Feedback and improvement",
    body: "Share observations that can inform Kora’s development.",
    icon: CYCLE,
    tile: "from-[#595bf1] to-[#f163ea]",
  },
];

const PricingWorkingTogetherSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute -top-32 -left-32 size-[420px] rounded-full bg-primary/5 blur-3xl" />

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
                  <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                </svg>
              }
            >
              Working together
            </Badge>
          </div>

          <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            More Than Access to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
              a Tool.
            </span>
          </h2>
        </motion.div>

        {/* Timeline: horizontal on desktop, vertical on mobile */}
        <ol className="mt-14 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-4">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;

            return (
              <motion.li
                key={step.title}
                className="relative flex gap-5 lg:flex-col lg:gap-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              >
                {/* Connector to the next step. Each step draws its own segment, so
                    the pieces join into one line without any width math. */}
                {!isLast && (
                  <>
                    {/* Desktop: runs from this node's center to the next node's center */}
                    <motion.span
                      className="pointer-events-none absolute hidden origin-left border-t-2 border-dashed border-primary/30 lg:block lg:left-1/2 lg:top-[calc(1.5rem-1px)] lg:w-[calc(100%+1.5rem)]"
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.5 + i * 0.25, ease: "easeInOut" }}
                      aria-hidden="true"
                    />
                    {/* Mobile: runs down from this node to the next one */}
                    <motion.span
                      className="pointer-events-none absolute -bottom-6 left-[calc(1.5rem-1px)] top-12 origin-top border-l-2 border-dashed border-primary/30 lg:hidden"
                      initial={reduceMotion ? false : { scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: "easeInOut" }}
                      aria-hidden="true"
                    />
                  </>
                )}

                {/* Numbered node */}
                <div className="relative z-10 shrink-0 lg:mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.2 + i * 0.15 }}
                    className="flex size-12 items-center justify-center rounded-full bg-linear-to-br from-[#595bf1] to-[#f163ea] text-base font-bold text-white shadow-lg shadow-[#747bff]/30 ring-8 ring-white"
                  >
                    {i + 1}
                  </motion.div>
                </div>

                {/* Card */}
                <article className="flex-1 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl lg:mt-6">
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-sm",
                      step.tile
                    )}
                  >
                    <Glyph paths={step.icon} className="size-5" />
                  </span>

                  <h3 className="mt-4 text-lg font-bold leading-snug text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-600">{step.body}</p>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default PricingWorkingTogetherSection;