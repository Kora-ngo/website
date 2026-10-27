// src/layouts/solutions/solutions-offline-section.tsx
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import logo from "../../assets/logo.svg";
import { cn } from "../../utils/cn";
import { Button } from "../../widgets/button";
import { Link } from "react-router-dom";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const listContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const listItem = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

const capabilities = [
  "Register beneficiaries in areas with limited connectivity",
  "Record field activities without an internet connection",
  "Store data locally and synchronize when connected",
  "Capture household and beneficiary information",
  "Keep field teams working in challenging conditions",
];

/* -------------------------------------------------------------------------- */
/*  Sync cycle: offline -> syncing -> synced, looping                         */
/* -------------------------------------------------------------------------- */

type SyncState = "offline" | "syncing" | "synced";

const ORDER: SyncState[] = ["offline", "syncing", "synced"];
const DURATIONS: Record<SyncState, number> = {
  offline: 5200,
  syncing: 2600,
  synced: 4600,
};

// Advances through the states while `active`. Pauses when off-screen and stays
// on "offline" (the core story) when the visitor prefers reduced motion.
const useSyncCycle = (active: boolean) => {
  const [state, setState] = useState<SyncState>("offline");

  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => {
      setState((s) => ORDER[(ORDER.indexOf(s) + 1) % ORDER.length]);
    }, DURATIONS[state]);
    return () => clearTimeout(id);
  }, [active, state]);

  return state;
};

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

const WifiIcon = ({ offline, className }: { offline: boolean; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M2 8.8a15 15 0 0 1 20 0" />
    <path d="M5 12.5a10 10 0 0 1 14 0" />
    <path d="M8.5 16a5 5 0 0 1 7 0" />
    <circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none" />
    {offline && <path d="M3 3l18 18" />}
  </svg>
);

const SyncIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);

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

const OutlineIcon = ({ d, className }: { d: string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const PHONE_PATH =
  "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3";
const CLOUD_UP_PATH =
  "M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z";

/* -------------------------------------------------------------------------- */
/*  Phone                                                                     */
/* -------------------------------------------------------------------------- */

const banner = {
  offline: {
    bg: "bg-amber-50 text-amber-800",
    dot: "bg-amber-500",
    bar: "bg-amber-400",
    title: "You’re offline",
    sub: "Records are saved on this device",
  },
  syncing: {
    bg: "bg-primary/10 text-primary",
    dot: "bg-primary",
    bar: "bg-linear-to-r from-[#595bf1] to-[#f163ea]",
    title: "Synchronizing…",
    sub: "Uploading 3 records",
  },
  synced: {
    bg: "bg-green-50 text-green-800",
    dot: "bg-green-500",
    bar: "bg-green-500",
    title: "All data synchronized",
    sub: "Updated just now",
  },
} as const;

const chipStyle = {
  offline: { label: "On device", cls: "bg-gray-100 text-gray-600" },
  syncing: { label: "Syncing", cls: "bg-primary/10 text-primary" },
  synced: { label: "Synced", cls: "bg-green-100 text-green-700" },
} as const;

const SyncChip = ({ state }: { state: SyncState }) => {
  const c = chipStyle[state];
  return (
    <motion.span
      key={state}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold", c.cls)}
    >
      {c.label}
    </motion.span>
  );
};

interface RecordRowProps {
  initials: string;
  name: string;
  detail: string;
  avatar: string;
  chip: ReactNode;
}

const RecordRow = ({ initials, name, detail, avatar, chip }: RecordRowProps) => (
  <div className="flex items-center gap-2">
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white",
        avatar
      )}
    >
      {initials}
    </span>
    <div className="min-w-0 flex-1">
      <p className="truncate text-[11px] font-semibold leading-tight text-gray-900">{name}</p>
      <p className="truncate text-[9px] leading-tight text-gray-400">{detail}</p>
    </div>
    {chip}
  </div>
);

const collected = [
  { initials: "AT", name: "Amina T.", detail: "Household registration · 6 members", avatar: "from-purple-300 to-purple-500" },
  { initials: "JB", name: "Jean B.", detail: "Assistance delivery · Food kit", avatar: "from-blue-300 to-blue-500" },
  { initials: "GM", name: "Grace M.", detail: "Household registration · 4 members", avatar: "from-teal-300 to-teal-500" },
];

const waiting = [
  { initials: "PN", name: "Paul N.", detail: "Household registration", avatar: "from-yellow-300 to-yellow-500" },
  { initials: "SK", name: "Sara K.", detail: "Assistance delivery", avatar: "from-rose-300 to-rose-500" },
];

const PhoneMockup = ({ state }: { state: SyncState }) => {
  const b = banner[state];

  return (
    <div className="w-66 rounded-[2.6rem] bg-gray-950 p-2 shadow-2xl ring-1 ring-black/10">
      <div className="relative flex h-128 flex-col overflow-hidden rounded-[2.1rem] bg-white">
        {/* Status bar */}
        <div className="relative flex items-center justify-between px-5 pb-1.5 pt-3 text-[10px] font-semibold text-gray-900">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-gray-950" />
          <div className="flex items-center gap-1.5">
            <WifiIcon
              offline={state === "offline"}
              className={cn(
                "size-3.5 transition-colors duration-500",
                state === "offline" ? "text-amber-600" : "text-gray-900"
              )}
            />
            <span className="h-2 w-4 rounded-[3px] border border-gray-900/70 p-px">
              <span className="block h-full w-3/4 rounded-[1px] bg-gray-900/70" />
            </span>
          </div>
        </div>

        {/* App header */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-1.5">
            <img src={logo} alt="" className="size-5" />
            <span className="text-xs font-bold text-gray-900">Kora Field</span>
          </div>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-gray-500">
            Nord Region
          </span>
        </div>

        {/* Connection banner */}
        <div className={cn("mx-3 rounded-xl px-3 py-2 transition-colors duration-500", b.bg)}>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2 shrink-0">
              {state !== "synced" && (
                <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", b.dot)} />
              )}
              <span className={cn("relative inline-flex size-2 rounded-full", b.dot)} />
            </span>
            <motion.div
              key={state}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="min-w-0"
            >
              <p className="text-[11px] font-semibold leading-tight">{b.title}</p>
              <p className="text-[9px] leading-tight opacity-80">{b.sub}</p>
            </motion.div>
          </div>

          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-black/5">
            <motion.div
              className={cn("h-full rounded-full", b.bar)}
              animate={{ width: state === "offline" ? "0%" : state === "syncing" ? "72%" : "100%" }}
              transition={{ duration: state === "syncing" ? 2.2 : 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Collected data */}
        <div className="mt-3 px-3">
          <div className="mb-1.5 flex items-center justify-between px-0.5">
            <p className="text-[10px] font-semibold text-gray-700">Collected today</p>
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
              {collected.length}
            </span>
          </div>
          <div className="space-y-2.5 rounded-xl bg-gray-50 p-2.5">
            {collected.map((row, i) => (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
              >
                <RecordRow {...row} chip={<SyncChip state={state} />} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Waiting for review */}
        <div className="mt-3 px-3">
          <div className="mb-1.5 flex items-center gap-1.5 px-0.5">
            <span className="size-1.5 rounded-full bg-amber-400" />
            <p className="text-[10px] font-semibold text-gray-700">Waiting for review</p>
          </div>
          <div className="space-y-2.5 rounded-xl bg-gray-50 p-2.5">
            {waiting.map((row) => (
              <RecordRow
                key={row.name}
                {...row}
                chip={
                  <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-semibold text-amber-700">
                    Pending
                  </span>
                }
              />
            ))}
          </div>
        </div>

        {/* Bottom action */}
        <div className="mt-auto px-3 pb-3 pt-2">
          <div className="flex h-9 items-center justify-center rounded-xl bg-linear-to-r from-[#595bf1] to-[#f163ea] text-[11px] font-semibold text-white shadow-sm">
            + New registration
          </div>
          <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-gray-900/15" />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Floating cards                                                            */
/* -------------------------------------------------------------------------- */

interface FloatCardProps {
  className?: string; // desktop placement (sm and up)
  from: { x: number; y: number };
  delay: number;
  floatDuration: number;
  children: ReactNode;
}

const FloatCard = ({ className, from, delay, floatDuration, children }: FloatCardProps) => {
  const reduceMotion = useReducedMotion();

  return (
    // Outer: placement + entrance. Inner: the continuous bob.
    <motion.div
      className={cn("z-10 w-full sm:absolute sm:w-44", className)}
      initial={{ opacity: 0, x: from.x, y: from.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const CardText = ({ title, sub }: { title: string; sub: string }) => (
  <div className="min-w-0">
    <p className="text-xs font-semibold leading-tight text-gray-900">{title}</p>
    <p className="mt-0.5 text-[10px] leading-tight text-gray-400">{sub}</p>
  </div>
);

const syncCard = {
  offline: {
    tile: "bg-amber-100 text-amber-600",
    title: "Waiting for connection",
    sub: "3 records queued",
  },
  syncing: {
    tile: "bg-primary/10 text-primary",
    title: "Synchronizing…",
    sub: "Uploading 3 records",
  },
  synced: {
    tile: "bg-green-100 text-green-600",
    title: "Data synchronized",
    sub: "3 records uploaded",
  },
} as const;

const OfflineIllustration = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const state = useSyncCycle(inView && !reduceMotion);
  const s = syncCard[state];

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-xl sm:py-6">
      {/* Soft brand glow + dashed ring behind the phone */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="absolute size-80 rounded-full bg-linear-to-br from-[#595bf1]/20 to-[#f163ea]/20 blur-3xl" />
        <div className="absolute hidden size-120 rounded-full border-2 border-dashed border-primary/10 sm:block" />
      </div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <PhoneMockup state={state} />
      </motion.div>

      {/* Below sm: cards stack under the phone.
          From sm up: `contents` lets each card float around the phone. */}
      <div className="mt-6 flex flex-col gap-3 sm:mt-0 sm:contents">
        {/* Top right: live sync status, mirrors the phone */}
        <FloatCard className="sm:top-14 sm:right-0" from={{ x: 30, y: -10 }} delay={0.5} floatDuration={5.5}>
          <motion.div
            key={state}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl", s.tile)}
          >
            {state === "offline" && <WifiIcon offline className="size-5" />}
            {state === "syncing" && <SyncIcon className="size-5 animate-spin" />}
            {state === "synced" && <CheckIcon className="size-5" />}
          </motion.div>
          <motion.div
            key={`${state}-text`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardText title={s.title} sub={s.sub} />
          </motion.div>
        </FloatCard>

        {/* Middle left: data lives on the device */}
        <FloatCard className="sm:top-[44%] sm:left-0" from={{ x: -30, y: 10 }} delay={0.7} floatDuration={6.5}>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
            <OutlineIcon d={PHONE_PATH} className="size-5" />
          </div>
          <CardText title="Saved on device" sub="Works without signal" />
        </FloatCard>

        {/* Bottom right: Kora Central received earlier uploads */}
        <FloatCard className="sm:bottom-14 sm:right-2" from={{ x: 30, y: 20 }} delay={0.9} floatDuration={6}>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <OutlineIcon d={CLOUD_UP_PATH} className="size-5" />
          </div>
          <CardText title="Kora Central updated" sub="24 records · 2 min ago" />
        </FloatCard>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const SolutionsOfflineSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: title + capability list */}
          <div className="space-y-8">
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
                    <path fillRule="evenodd" d="M10.5 1.875a1.125 1.125 0 0 0-1.125 1.125v.375H7.5A2.25 2.25 0 0 0 5.25 5.625v14.25a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25V5.625a2.25 2.25 0 0 0-2.25-2.25h-1.875V3a1.125 1.125 0 0 0-1.125-1.125h-3ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" clipRule="evenodd" />
                  </svg>
                }
              >
                Solution 02
              </Badge> */}

              <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                Offline field data{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
                  collection
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
              <Link to="/kora-field" reloadDocument><Button children="Discover Kora Field →" variant="link" /></Link>
          </div>

          {/* Right: phone + floating sync cards */}
          <OfflineIllustration />
        </div>
      </div>
    </section>
  );
};

export default SolutionsOfflineSection;