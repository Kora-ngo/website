// src/layouts/solutions/solutions-reporting-section.tsx
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const listContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const listItem = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

const capabilities = [
  "Create and manage humanitarian projects",
  "Coordinate teams and project responsibilities",
  "Monitor beneficiary targets and geographic coverage",
  "Track validation progress and project activities",
  "Export beneficiary data, assistance records, and reports",
];

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

const FolderIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
  </svg>
);

const CountUp = ({
  to,
  duration = 1.4,
  delay = 0,
  suffix = "",
}: {
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration, delay]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*  Card shell: outer = placement + entrance, inner = the gentle bob          */
/* -------------------------------------------------------------------------- */

interface OverlayCardProps {
  className?: string;
  innerClassName?: string;
  from: { x: number; y: number };
  delay: number;
  floatDuration?: number;
  children: ReactNode;
}

const OverlayCard = ({
  className,
  innerClassName = "p-4",
  from,
  delay,
  floatDuration,
  children,
}: OverlayCardProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, x: from.x, y: from.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <motion.div
        className={cn("rounded-2xl bg-white shadow-xl ring-1 ring-black/5", innerClassName)}
        animate={reduceMotion || !floatDuration ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Card 1: project listing                                                   */
/* -------------------------------------------------------------------------- */

const projects = [
  { name: "Food Security Response", region: "Nord Region", status: "Active", dot: "bg-green-500", pct: 83, tile: "from-purple-400 to-purple-600" },
  { name: "Cash Assistance Program", region: "Littoral Region", status: "Active", dot: "bg-green-500", pct: 61, tile: "from-blue-400 to-blue-600" },
  { name: "Shelter & WASH Support", region: "West Region", status: "Planning", dot: "bg-amber-400", pct: 12, tile: "from-teal-400 to-teal-600" },
];

const ProjectsCard = () => (
  <OverlayCard className="z-0 w-[92%]" innerClassName="p-4 pb-12" from={{ x: -30, y: 10 }} delay={0.1}>
    <div className="mb-3.5 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-gray-900">Projects</p>
        <p className="truncate text-[10px] text-gray-400">12 active · 4 regions covered</p>
      </div>
      <span className="shrink-0 rounded-lg bg-linear-to-r from-[#595bf1] to-[#f163ea] px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-sm">
        + New project
      </span>
    </div>

    <div className="space-y-3">
      {projects.map((p, i) => (
        <motion.div
          key={p.name}
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
        >
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br text-white shadow-sm",
              p.tile
            )}
          >
            <FolderIcon className="size-4" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-gray-900 sm:text-xs">{p.name}</p>
            <p className="flex items-center gap-1.5 truncate text-[10px] text-gray-400">
              <span className={cn("size-1.5 shrink-0 rounded-full", p.dot)} />
              {p.region} · {p.status}
            </p>
          </div>

          <div className="w-14 shrink-0 text-right sm:w-16">
            <p className="text-[11px] font-bold text-gray-900">{p.pct}%</p>
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-[#595bf1] to-[#f163ea]"
                initial={{ width: 0 }}
                whileInView={{ width: `${p.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.7 + i * 0.12, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </OverlayCard>
);

/* -------------------------------------------------------------------------- */
/*  Card 2: export & reports (Excel / Word / PDF)                             */
/* -------------------------------------------------------------------------- */

const files = [
  { ext: "XLSX", name: "Beneficiaries_Nord.xlsx", meta: "1,248 rows", tile: "bg-green-100 text-green-700", bar: "bg-green-500" },
  { ext: "DOCX", name: "Project_Report.docx", meta: "12 pages", tile: "bg-blue-100 text-blue-700", bar: "bg-blue-500" },
  { ext: "PDF", name: "Donor_Summary.pdf", meta: "8 pages", tile: "bg-red-100 text-red-600", bar: "bg-red-500" },
];

const ExportCard = () => (
  <OverlayCard className="z-10 mt-3 w-[58%]" from={{ x: -20, y: 30 }} delay={0.4} floatDuration={6}>
    <div className="mb-3 flex items-center justify-between gap-2">
      <p className="truncate text-[11px] font-semibold text-gray-700">Export &amp; reports</p>
      <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
        Donor-ready
      </span>
    </div>

    <div className="space-y-3">
      {files.map((f, i) => {
        // Each file "generates" (bar fills) one after another, then flips to Ready.
        const start = 0.9 + i * 0.55;
        return (
          <div key={f.name}>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg text-[8px] font-bold tracking-wide",
                  f.tile
                )}
              >
                {f.ext}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-gray-900">{f.name}</p>
                <p className="truncate text-[10px] text-gray-400">{f.meta}</p>
              </div>

              <motion.span
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 p-1 text-[9px] font-semibold text-green-700 sm:px-1.5 sm:py-0.5"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, delay: start + 0.9 }}
              >
                <CheckIcon className="size-2.5" />
                <span className="hidden sm:inline">Ready</span>
              </motion.span>
            </div>

            <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className={cn("h-full rounded-full", f.bar)}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: start, ease: "easeInOut" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </OverlayCard>
);

/* -------------------------------------------------------------------------- */
/*  Card 3: validation progress                                               */
/* -------------------------------------------------------------------------- */

const ValidationRing = () => {
  const uid = useId().replace(/:/g, "");
  const gradientId = `ring-${uid}`;

  return (
    <div className="relative size-20">
      <svg viewBox="0 0 64 64" className="size-full" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#595bf1" />
            <stop offset="1" stopColor="#f163ea" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="26" fill="none" stroke="#f3f4f6" strokeWidth="7" />
        <g transform="rotate(-90 32 32)">
          <motion.circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 0.9, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.8, ease: "easeOut" }}
          />
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-bold leading-none text-gray-900">
          <CountUp to={90} suffix="%" delay={0.8} />
        </span>
        <span className="mt-0.5 text-[8px] text-gray-400">validated</span>
      </div>
    </div>
  );
};

const ValidationCard = () => (
  <OverlayCard
    className="z-20 -ml-[4%] w-[46%]"
    innerClassName="p-3.5"
    from={{ x: 30, y: 20 }}
    delay={0.6}
    floatDuration={5.2}
  >
    <div className="flex items-center justify-between gap-2">
      <p className="truncate text-[11px] font-semibold text-gray-700">Validation</p>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-semibold text-green-700">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
        </span>
        Live
      </span>
    </div>

    <div className="mt-3 flex justify-center">
      <ValidationRing />
    </div>

    <div className="mt-3 space-y-1.5 text-[10px]">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-gray-500">
          <span className="size-1.5 rounded-full bg-primary" />
          Validated
        </span>
        <span className="font-semibold text-gray-900">1,126</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-gray-500">
          <span className="size-1.5 rounded-full bg-amber-400" />
          Pending
        </span>
        <span className="font-semibold text-gray-900">122</span>
      </div>
    </div>
  </OverlayCard>
);

/* -------------------------------------------------------------------------- */
/*  Illustration                                                              */
/* -------------------------------------------------------------------------- */

const ReportingIllustration = () => (
  // `isolate` keeps the negative-z glow inside this block instead of letting
  // it slip behind the section background.
  <div className="relative isolate mx-auto w-full max-w-xl">
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
      <div className="size-80 rounded-full bg-linear-to-br from-[#595bf1]/20 to-[#f163ea]/20 blur-3xl" />
    </div>

    {/* Back card: project listing */}
    <ProjectsCard />

    {/* Front row: overlaps the bottom of the listing and each other slightly */}
    <div className="relative z-10 -mt-8 flex items-start">
      <ExportCard />
      <ValidationCard />
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const SolutionsReportingSection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: layered cards (below the text on mobile) */}
          <div className="order-2 lg:order-1">
            <ReportingIllustration />
          </div>

          {/* Right: title + capability list */}
          <div className="order-1 space-y-8 lg:order-2">
            <motion.div
              className="space-y-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUpVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* <Badge
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" clipRule="evenodd" />
                  </svg>
                }
              >
                Solution 03
              </Badge> */}

              <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                Project monitoring &amp;{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
                  reporting
                </span>
              </h2>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={listContainer}
            >
              {capabilities.map((text) => (
                <motion.li
                  key={text}
                  variants={listItem}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-start gap-3.5 border-b border-gray-200/80 py-3.5 last:border-b-0"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#595bf1] to-[#f163ea] text-white shadow-sm">
                    <CheckIcon className="size-3.5" />
                  </span>
                  <span className="text-base leading-snug text-gray-700 sm:text-[17px]">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsReportingSection;