// src/layouts/solutions/solutions-difference-section.tsx
import { motion } from "framer-motion";
import Badge from "../../widgets/badge";
import whiteLogo from "../../assets/icons/white_logo.png";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

const FILES = [
  "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z",
  "M14 2v4a2 2 0 0 0 2 2h4",
];
const DATABASE = [
  "M4 6c0-1.657 3.582-3 8-3s8 1.343 8 3-3.582 3-8 3-8-1.343-8-3Z",
  "M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6",
  "M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6",
];
const SIGNAL_OFF = ["M5 18v-3", "M10 18v-6", "M15 18V9", "M20 18V5", "M3 3l18 18"];
const SYNC = [
  "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
];
const CLOCK = ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z", "M12 7v5l3 2"];
const REPORT = [
  "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
];
const CROSS = ["M6 6l12 12", "M18 6 6 18"];
const CHECK = ["m5 12.5 4.5 4.5L19 7.5"];
const ARROW_RIGHT = ["M5 12h14", "m13 6 6 6-6 6"];
const ARROW_DOWN = ["M12 5v14", "m6 13 6 6 6-6"];

const Glyph = ({
  paths,
  className,
  strokeWidth = 1.8,
}: {
  paths: string[];
  className?: string;
  strokeWidth?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
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

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const rows = [
  {
    without: {
      text: "Beneficiary information spread across files and spreadsheets",
      icon: FILES,
    },
    with: {
      text: "Beneficiary records organized within a central platform",
      icon: DATABASE,
    },
  },
  {
    without: {
      text: "Connectivity challenges disrupt field data collection",
      icon: SIGNAL_OFF,
    },
    with: {
      text: "Collect field data offline and synchronize when connected",
      icon: SYNC,
    },
  },
  {
    without: {
      text: "Tracking assistance and preparing reports takes extra effort",
      icon: CLOCK,
    },
    with: {
      text: "Review assistance records and prepare project reports",
      icon: REPORT,
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Cells                                                                     */
/* -------------------------------------------------------------------------- */

interface CellProps {
  text: string;
  icon: string[];
  delay: number;
}

// Each row reads left to right: the problem arrives first, then the answer.
const WithoutCell = ({ text, icon, delay }: CellProps) => (
  <motion.div
    role="cell"
    className="flex items-start gap-4 p-5 sm:p-6 md:items-center"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-400 ring-1 ring-gray-200">
      <Glyph paths={icon} className="size-6" />
      <span className="absolute -bottom-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-white text-red-500 shadow-sm ring-1 ring-red-100">
        <Glyph paths={CROSS} strokeWidth={3} className="size-2.5" />
      </span>
    </span>

    <div className="min-w-0">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 md:hidden">
        Without Kora
      </p>
      <p className="text-base leading-snug text-gray-500">{text}</p>
    </div>
  </motion.div>
);

const WithCell = ({ text, icon, delay }: CellProps) => (
  <motion.div
    role="cell"
    className="flex items-start gap-4 bg-primary/5 p-5 sm:p-6 md:items-center md:bg-transparent"
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#595bf1] to-[#f163ea] text-white shadow-lg shadow-[#747bff]/30">
      <Glyph paths={icon} className="size-6" />
      <motion.span
        className="absolute -bottom-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-white text-green-600 shadow-sm ring-1 ring-green-100"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: delay + 0.35 }}
      >
        <Glyph paths={CHECK} strokeWidth={3} className="size-2.5" />
      </motion.span>
    </span>

    <div className="min-w-0">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary md:hidden">
        With Kora
      </p>
      <p className="text-base font-semibold leading-snug text-gray-900">{text}</p>
    </div>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const SolutionsDifferenceSection = () => {
  return (
    // isolate keeps the negative-z decoration inside this section
    <section className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-24 -z-10 size-[420px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 -z-10 size-[460px] rounded-full bg-linear-to-br from-[#595bf1]/10 to-[#f163ea]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
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
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
              }
            >
              The Kora Difference
            </Badge>
          </div>

          <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            From Fragmented Fieldwork to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
              Coordinated Action.
            </span>
          </h2>

          <p className="mx-auto mt-5 text-lg leading-relaxed text-gray-600">
            See how Kora can help humanitarian teams move from scattered records and disconnected
            workflows toward more organized beneficiary management and assistance tracking.
          </p>
        </motion.div>

        {/* Comparison table. Built from ARIA roles so the layout can change freely
            between desktop (three columns) and mobile (stacked pairs). */}
        <motion.div
          role="table"
          aria-label="Working without Kora compared with working with Kora"
          className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5 lg:mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Column headers (desktop). On mobile each cell carries its own label. */}
          <div role="rowgroup">
            <div role="row" className="hidden md:grid md:grid-cols-[1fr_4rem_1fr]">
              <div role="columnheader" className="flex items-center gap-3 bg-gray-100 px-6 py-5">
                <span className="flex size-8 items-center justify-center rounded-full bg-white text-red-500 ring-1 ring-gray-200">
                  <Glyph paths={CROSS} strokeWidth={2.6} className="size-3.5" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                  Without Kora
                </span>
              </div>

              {/* Blends the grey header into the brand header */}
              <div aria-hidden="true" className="bg-linear-to-r from-gray-100 to-[#595bf1]" />

              <div
                role="columnheader"
                className="flex items-center gap-3 bg-linear-to-r from-[#595bf1] to-[#f163ea] px-6 py-5 text-white"
              >
                <img src={whiteLogo} alt="" className="size-6 object-contain" />
                <span className="text-sm font-semibold uppercase tracking-wider">With Kora</span>
              </div>
            </div>
          </div>

          <div role="rowgroup" className="relative">
            {/* Desktop only: tinted panel behind the "With Kora" column */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-[calc(50%-2rem)] bg-linear-to-b from-primary/[0.07] to-[#f163ea]/[0.06] md:block"
            />

            {/* Desktop only: dashed line down the middle that draws itself in */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 md:block"
            >
              <motion.div
                className="h-full origin-top border-l-2 border-dashed border-primary/25"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              />
            </div>

            {rows.map((row, i) => {
              const base = i * 0.25;

              return (
                <div
                  key={row.with.text}
                  role="row"
                  className="group/row relative grid grid-cols-1 border-t border-gray-100 first:border-t-0 md:grid-cols-[1fr_4rem_1fr]"
                >
                  <WithoutCell text={row.without.text} icon={row.without.icon} delay={base} />

                  {/* Mobile: arrow pointing down from the problem to the answer */}
                  <div aria-hidden="true" className="relative z-10 -my-3.5 flex justify-center md:hidden">
                    <span className="flex size-7 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-primary/20">
                      <Glyph paths={ARROW_DOWN} strokeWidth={2.2} className="size-3.5" />
                    </span>
                  </div>

                  {/* Desktop: arrow node sitting on the middle line */}
                  <div aria-hidden="true" className="relative z-10 hidden items-center justify-center md:flex">
                    <motion.span
                      className="flex size-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-primary/20"
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ type: "spring", stiffness: 240, damping: 16, delay: base + 0.25 }}
                    >
                      <Glyph
                        paths={ARROW_RIGHT}
                        strokeWidth={2.2}
                        className="size-4 transition-transform duration-300 group-hover/row:translate-x-0.5"
                      />
                    </motion.span>
                  </div>

                  <WithCell text={row.with.text} icon={row.with.icon} delay={base + 0.2} />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsDifferenceSection;