// src/layouts/solutions/solutions-beneficiary-section.tsx
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import Badge from "../../widgets/badge";
import logo from "../../assets/logo.svg";
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
  "Register and organize beneficiary records",
  "Track assistance delivered across projects",
  "Review and validate field submissions",
  "Generate PDF and Word project documentation",
  "Export beneficiary and household data to Excel",
  "Export assistance records and charts for reporting",
  "Monitor beneficiary targets and assistance coverage",
];

/* ------------------------------ Dashboard mock ----------------------------- */

const CountUp = ({ to, duration = 1.4, suffix = "" }: { to: number; duration?: number; suffix?: string }) => {
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
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

const StatusPill = ({ status }: { status: "Approved" | "Pending" }) => (
  <span
    className={cn(
      "rounded-full px-2 py-0.5 text-[9px] font-medium sm:text-[10px]",
      status === "Approved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
    )}
  >
    {status}
  </span>
);

const NavItem = ({ label, active = false }: { label: string; active?: boolean }) => (
  <div
    className={cn(
      "flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-[11px] font-medium",
      active ? "bg-primary/10 text-primary" : "text-gray-500"
    )}
  >
    <span className={cn("size-3.5 rounded-[4px]", active ? "bg-primary" : "bg-gray-200")} />
    {label}
  </div>
);

const bars = [
  { m: "May", h: 38 },
  { m: "Jun", h: 52 },
  { m: "Jul", h: 46 },
  { m: "Aug", h: 68 },
  { m: "Sep", h: 60 },
  { m: "Oct", h: 84 },
];

const rows = [
  {
    initials: "AT",
    name: "Amina T.",
    region: "Nord Region",
    status: "Approved" as const,
    when: "Just now",
    avatar: "from-purple-300 to-purple-500",
  },
  {
    initials: "JB",
    name: "Jean B.",
    region: "Littoral Region",
    status: "Pending" as const,
    when: "2h ago",
    avatar: "from-blue-300 to-blue-500",
  },
  {
    initials: "GM",
    name: "Grace M.",
    region: "West Region",
    status: "Approved" as const,
    when: "Yesterday",
    avatar: "from-teal-300 to-teal-500",
  },
];

const LINE_PATH =
  "M0 64 C 20 63, 25 57, 40 57 S 65 49, 80 48 S 105 41, 120 40 S 145 33, 160 32 S 185 25, 200 23";

const DashboardMockup = () => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
      {/* Title bar: window dots, Kora logo centered, illustrative tag */}
      <div className="relative flex h-9 items-center justify-between border-b border-gray-100 bg-gray-50 px-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-gray-300" />
          <span className="size-2 rounded-full bg-gray-300" />
          <span className="size-2 rounded-full bg-gray-300" />
        </div>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          <img src={logo} alt="Kora" className="size-5" />
          <span className="text-xs font-semibold text-primary">Kora</span>
        </div>

        {/* <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-gray-500">
          Illustrative
        </span> */}
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-32 shrink-0 space-y-1 border-r border-gray-100 bg-gray-50/50 p-3 sm:block">
          <NavItem label="Dashboard" />
          <NavItem label="Beneficiaries" active />
          <NavItem label="Assistance" />
          <NavItem label="Reports" />
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1 space-y-3 p-3.5 sm:p-4">
          {/* Header: registration entry point */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-gray-900 sm:text-sm">Beneficiaries</p>
              <p className="truncate text-[10px] text-gray-400">Food Security Project · Nord Region</p>
            </div>
            <span className="shrink-0 rounded-lg bg-linear-to-r from-[#595bf1] to-[#f163ea] px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-sm sm:text-[11px]">
              + Register
            </span>
          </div>

          {/* KPIs: monitoring */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl bg-gray-50 p-2.5 sm:p-3">
              <p className="text-[9px] leading-tight text-gray-400 sm:text-[10px]">Registered</p>
              <p className="mt-0.5 text-sm font-bold text-gray-900 sm:text-lg">
                <CountUp to={1248} />
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-2.5 sm:p-3">
              <p className="text-[9px] leading-tight text-gray-400 sm:text-[10px]">Target achieved</p>
              <p className="mt-0.5 text-sm font-bold text-gray-900 sm:text-lg">
                <CountUp to={83} suffix="%" />
              </p>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-[#595bf1] to-[#f163ea]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "83%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-2.5 sm:p-3">
              <p className="text-[9px] leading-tight text-gray-400 sm:text-[10px]">Coverage</p>
              <p className="mt-0.5 text-sm font-bold text-gray-900 sm:text-lg">
                <CountUp to={76} suffix="%" />
              </p>
            </div>
          </div>

          {/* Recent registrations */}
          <div className="rounded-xl bg-gray-50 p-2.5 sm:p-3">
            <p className="mb-2 text-[9px] font-semibold text-gray-700 sm:text-[11px]">Recent registrations</p>
            <div className="space-y-2">
              {rows.map((row, i) => (
                <motion.div
                  key={row.name}
                  className="grid grid-cols-[1fr_auto] items-center gap-2 sm:grid-cols-[1.3fr_1fr_0.9fr_0.8fr]"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.15 }}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white sm:size-6",
                        row.avatar
                      )}
                    >
                      {row.initials}
                    </span>
                    <span className="truncate text-[10px] font-medium text-gray-700 sm:text-xs">{row.name}</span>
                  </div>
                  <span className="hidden truncate text-[10px] text-gray-400 sm:block">{row.region}</span>
                  <div className="justify-self-end sm:justify-self-start">
                    <StatusPill status={row.status} />
                  </div>
                  <span className="hidden text-right text-[10px] text-gray-400 sm:block">{row.when}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Floating charts ---------------------------- */

const CoverageLineChart = () => {
  const uid = useId().replace(/:/g, "");
  const strokeId = `stroke-${uid}`;
  const areaId = `area-${uid}`;

  return (
    <svg viewBox="0 0 200 80" className="h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#595bf1" />
          <stop offset="1" stopColor="#f163ea" />
        </linearGradient>
        <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#595bf1" stopOpacity="0.22" />
          <stop offset="1" stopColor="#595bf1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[20, 45, 70].map((y) => (
        <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3 4" />
      ))}

      <motion.path
        d={`${LINE_PATH} L200 80 L0 80 Z`}
        fill={`url(#${areaId})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.2 }}
      />
      <motion.path
        d={LINE_PATH}
        fill="none"
        stroke={`url(#${strokeId})`}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
};

interface FloatingChartCardProps {
  title: string;
  meta?: ReactNode;
  className?: string; // desktop placement (sm and up)
  from: { x: number; y: number };
  delay: number;
  floatDuration: number;
  children: ReactNode;
}

const FloatingChartCard = ({
  title,
  meta,
  className,
  from,
  delay,
  floatDuration,
  children,
}: FloatingChartCardProps) => {
  const reduceMotion = useReducedMotion();

  return (
    // Outer: placement + entrance. Inner: the continuous bob.
    <motion.div
      className={cn("z-10 w-full sm:absolute sm:w-40", className)}
      initial={{ opacity: 0, x: from.x, y: from.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <motion.div
        className="rounded-md bg-white p-2.5 shadow-xl ring-1 ring-black/5"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        // transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="truncate text-[10px] font-semibold text-gray-700">{title}</p>
          {meta}
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
};

const DashboardIllustration = () => {
  const reduceMotion = useReducedMotion();

  return (
    // sm and up: padding makes room around the dashboard for the floating cards.
    <div className="relative mx-auto w-full max-w-xl sm:px-8 sm:pt-10 sm:pb-10">
      {/* Soft brand glow behind the dashboard */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="size-80 rounded-full bg-linear-to-br from-[#595bf1]/20 to-[#f163ea]/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <DashboardMockup />
      </motion.div>

      {/* Below sm: charts sit side by side under the dashboard.
          From sm up: `contents` lets each card float around the dashboard. */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-0 sm:contents">
        {/* Top left: registrations bar chart */}
        <FloatingChartCard
          title="Registrations"
          meta={<span className="shrink-0 text-[9px] text-gray-400">6 mo</span>}
          className="sm:top-0 sm:left-0"
          from={{ x: -30, y: -10 }}
          delay={0.5}
          floatDuration={5.5}
        >
          <div className="flex h-12 items-end gap-1">
            {bars.map((b, i) => (
              <motion.div
                key={b.m}
                className={cn(
                  "flex-1 origin-bottom rounded-t-sm bg-linear-to-t",
                  i === bars.length - 1 ? "from-[#595bf1] to-[#f163ea]" : "from-primary/30 to-primary/60"
                )}
                style={{ height: `${b.h}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.07, ease: "easeOut" }}
              />
            ))}
          </div>
          <div className="mt-1 flex gap-1">
            {bars.map((b) => (
              <span key={b.m} className="flex-1 text-center text-[7px] text-gray-400">
                {b.m}
              </span>
            ))}
          </div>
        </FloatingChartCard>

        {/* Middle right: assistance coverage line chart */}
        <FloatingChartCard
          title="Assistance coverage"
          meta={<span className="shrink-0 text-[9px] font-semibold text-green-600">+12%</span>}
          className="sm:top-[52%] sm:-right-6"
          from={{ x: 30, y: 10 }}
          delay={0.7}
          floatDuration={6.5}
        >
          <CoverageLineChart />
        </FloatingChartCard>
      </div>

      {/* Floating toast, bottom left (hidden on small screens) */}
      <motion.div
        className="absolute bottom-0 left-6 z-10 hidden sm:block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
      >
        <motion.div
          className="flex items-center gap-3 rounded-lg bg-white px-3.5 py-3 shadow-xl ring-1 ring-black/5"
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900">Beneficiary registered</p>
            <p className="text-[10px] text-gray-400">Amina T. · just now</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* --------------------------------- Section -------------------------------- */

const SolutionsBeneficiarySection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: dashboard illustration (below the text on mobile) */}
          <div className="order-2 lg:order-1">
            <DashboardIllustration />
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
                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                  </svg>
                }
              >
                Solution 01
              </Badge> */}

              <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                Beneficiary &amp; assistance{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
                  management
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
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

export default SolutionsBeneficiarySection;