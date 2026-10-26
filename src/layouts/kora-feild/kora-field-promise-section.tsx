// src/layouts/kora-field/kora-field-promise-section.tsx
import type { ComponentType, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import whiteLogo from "../../assets/icons/white_logo.png";
import { cn } from "../../utils/cn";
import Badge from "../../widgets/badge";

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

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

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

const SIGNAL_OFF = ["M5 18v-3", "M10 18v-6", "M15 18V9", "M20 18V5", "M3 3l18 18"];
const ARROW_RIGHT = ["M5 12h14", "m13 6 6 6-6 6"];
const CHEVRON_DOWN = ["m6 9 6 6 6-6"];
const PEOPLE = [
  "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
];

// Small white chip that floats on the edge of an illustration.
// Outer: placement + entrance. Inner: the gentle bob.
const FloatChip = ({
  className,
  delay,
  floatDuration = 5,
  children,
}: {
  className?: string;
  delay: number;
  floatDuration?: number;
  children: ReactNode;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("absolute z-10", className)}
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-lg ring-1 ring-black/5"
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Card 1: keep working offline                                              */
/* -------------------------------------------------------------------------- */

const offlineFields = [
  { label: "Head of household", w: "72%" },
  { label: "Household members", w: "28%" },
  { label: "Location", w: "56%" },
];

const OfflineIllustration = () => (
  <div className="relative w-full max-w-66">
    <div className="rounded-xl bg-white p-3.5 shadow-lg ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[11px] font-bold text-gray-900">New registration</p>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-semibold text-amber-700">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-amber-500" />
          </span>
          Offline
        </span>
      </div>

      {/* The form fills in by itself */}
      <div className="mt-3 space-y-2.5">
        {offlineFields.map((f, i) => (
          <div key={f.label}>
            <p className="mb-1 text-[9px] font-medium text-gray-400">{f.label}</p>
            <div className="flex h-6 items-center rounded-md bg-gray-50 px-2 ring-1 ring-gray-100">
              <motion.div
                className="h-1.5 rounded-full bg-gray-300"
                initial={{ width: 0 }}
                whileInView={{ width: f.w }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.35, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <motion.span
          className="flex size-4 items-center justify-center rounded-full bg-green-100 text-green-600"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 1.8 }}
        >
          <CheckIcon className="size-2.5" />
        </motion.span>
        <motion.p
          className="text-[10px] font-semibold text-green-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.9 }}
        >
          Saved on this device
        </motion.p>
      </div>
    </div>

    <FloatChip className="-right-3 -top-3" delay={0.9} floatDuration={5.5}>
      <span className="flex size-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
        <Glyph paths={SIGNAL_OFF} className="size-4" />
      </span>
      <div>
        <p className="text-[10px] font-semibold leading-tight text-gray-900">No signal</p>
        <p className="text-[9px] leading-tight text-gray-400">Keep working</p>
      </div>
    </FloatChip>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Card 2: structured field workflow                                         */
/* -------------------------------------------------------------------------- */

const steps = ["Household", "Members", "Assistance"];

const workflowFields = [
  { label: "Assistance type", value: "Food kit", select: true },
  { label: "Received by", value: "Amina T.", select: false },
];

const StructuredIllustration = () => (
  <div className="relative w-full max-w-66">
    <div className="rounded-xl bg-white p-3.5 shadow-lg ring-1 ring-black/5">
      {/* Stepper: the line fills, the steps check off one after another */}
      <div className="relative flex items-start">
        <div className="absolute left-[16.667%] right-[16.667%] top-[11px] h-0.5 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className="h-full bg-linear-to-r from-[#595bf1] to-[#f163ea]"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
          />
        </div>

        {steps.map((label, i) => {
          const done = i < 2;
          return (
            <div key={label} className="relative z-10 flex w-1/3 flex-col items-center gap-1.5">
              {done ? (
                <motion.span
                  className="flex size-6 items-center justify-center rounded-full bg-linear-to-br from-[#595bf1] to-[#f163ea] text-white shadow-sm"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.5 + i * 0.45 }}
                >
                  <CheckIcon className="size-3" />
                </motion.span>
              ) : (
                <motion.span
                  className="relative flex size-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary ring-2 ring-primary"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 1.4 }}
                >
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/30 motion-reduce:animate-none" />
                  <span className="relative">3</span>
                </motion.span>
              )}
              <span
                className={cn(
                  "text-[9px]",
                  done ? "font-medium text-gray-500" : "font-semibold text-gray-900"
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-2.5">
        {workflowFields.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.5 + i * 0.15 }}
          >
            <p className="mb-1 text-[9px] font-medium text-gray-400">{f.label}</p>
            <div className="flex h-6 items-center justify-between rounded-md bg-gray-50 px-2 ring-1 ring-gray-100">
              <span className="text-[10px] font-medium text-gray-700">{f.value}</span>
              {f.select && <Glyph paths={CHEVRON_DOWN} className="size-3 text-gray-400" />}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 flex h-7 items-center justify-center rounded-lg bg-linear-to-r from-[#595bf1] to-[#f163ea] text-[10px] font-semibold text-white shadow-sm">
        Save record
      </div>
    </div>

    <FloatChip className="-bottom-3 -left-3" delay={1.1} floatDuration={6}>
      <span className="flex size-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
        <Glyph paths={PEOPLE} className="size-4" />
      </span>
      <div>
        <p className="text-[10px] font-semibold leading-tight text-gray-900">Amina T.</p>
        <p className="text-[9px] leading-tight text-gray-400">Household · 6 members</p>
      </div>
    </FloatChip>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Card 3: reconnect and synchronize                                         */
/* -------------------------------------------------------------------------- */

const syncRecords = [
  { initials: "AT", name: "Amina T.", avatar: "from-purple-300 to-purple-500", at: 1.3 },
  { initials: "JB", name: "Jean B.", avatar: "from-blue-300 to-blue-500", at: 1.9 },
  { initials: "GM", name: "Grace M.", avatar: "from-teal-300 to-teal-500", at: 2.5 },
];

const SyncIllustration = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-full w-full items-center justify-center pb-8">
      <div className="flex items-center gap-2 max-[359px]:scale-90">
        {/* Device: records flip from Queued to Synced one by one */}
        <div className="w-36 rounded-xl bg-white p-2.5 shadow-lg ring-1 ring-black/5">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-amber-400" />
            <p className="text-[10px] font-semibold text-gray-700">Saved locally</p>
          </div>

          <div className="space-y-2">
            {syncRecords.map((r) => (
              <div key={r.name} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-[7px] font-bold text-white",
                    r.avatar
                  )}
                >
                  {r.initials}
                </span>
                <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-gray-700">
                  {r.name}
                </span>

                {/* Both chips share one grid cell and cross-fade */}
                <span className="grid shrink-0">
                  <motion.span
                    className="col-start-1 row-start-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-semibold text-amber-700"
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: r.at }}
                  >
                    Queued
                  </motion.span>
                  <motion.span
                    className="col-start-1 row-start-1 inline-flex items-center gap-0.5 rounded-full bg-green-100 px-1.5 py-0.5 text-[8px] font-semibold text-green-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: r.at }}
                  >
                    <CheckIcon className="size-2" />
                    Synced
                  </motion.span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Connector with a dot travelling toward Kora */}
        <div className="relative w-8 shrink-0 border-t-2 border-dashed border-primary/30">
          <motion.span
            className="absolute top-0 size-2 -translate-y-1/2 rounded-full bg-primary"
            initial={{ opacity: 0 }}
            animate={reduceMotion ? undefined : { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, delay: 1, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
          />
        </div>

        {/* Kora Central */}
        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.3 }}
        >
          {!reduceMotion && (
            <motion.span
              className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#595bf1] to-[#f163ea]"
              animate={{ scale: [1, 1.5], opacity: [0.35, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <div className="relative flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#595bf1] to-[#f163ea] shadow-xl shadow-[#747bff]/30 ring-1 ring-white/30">
            <img src={whiteLogo} alt="" className="size-7 object-contain" />
          </div>
          {/* Absolute so the tile's center stays level with the connector */}
          <p className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap text-gray-700">
            Kora Central
          </p>
        </motion.div>
      </div>

      {/* Appears once the last record is in */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <motion.div
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-lg ring-1 ring-black/5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 3.1, ease: "easeOut" }}
        >
          <span className="flex size-4 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckIcon className="size-2.5" />
          </span>
          <span className="text-[10px] font-semibold text-gray-900">3 records synchronized</span>
        </motion.div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

interface Promise {
  title: string;
  body: string;
  tint: string;
  Illustration: ComponentType;
}

const promises: Promise[] = [
  {
    title: "Keep working, wherever the field takes you.",
    body: "Continue collecting beneficiary information without depending on an active internet connection.",
    tint: "from-amber-50 via-orange-50 to-yellow-100",
    Illustration: OfflineIllustration,
  },
  {
    title: "Capture the information that matters.",
    body: "Record beneficiary details and assistance activities through a structured field workflow.",
    tint: "from-purple-50 via-fuchsia-50 to-pink-100",
    Illustration: StructuredIllustration,
  },
  {
    title: "Reconnect without starting over.",
    body: "Synchronize locally saved records with the central platform when connectivity returns.",
    tint: "from-indigo-50 via-blue-50 to-purple-100",
    Illustration: SyncIllustration,
  },
];

const KoraFieldPromiseSection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        {/* Centered intro */}
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex justify-center">
            <Badge
              icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

              }
            >
              Built for the field
            </Badge>
          </div>

          <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Fieldwork That{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
              Keeps Moving.
            </span>
          </h2>

          <p className="mx-auto mt-5 text-lg leading-relaxed text-gray-600">
            Kora Field helps your team collect beneficiary information, record assistance, and keep
            field operations moving, even when internet access is unreliable.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-6">
          {promises.map(({ title, body, tint, Illustration }, i) => (
            // Outer: entrance + the connector arrow. Inner: the card and its hover lift.
            <motion.div
              key={title}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
            >
              <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div
                  className={cn(
                    "relative flex h-64 items-center justify-center overflow-hidden bg-linear-to-br px-5",
                    tint
                  )}
                  aria-hidden="true"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-white/60 blur-2xl" />
                  <Illustration />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold leading-snug text-gray-900">{title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-gray-600">{body}</p>
                </div>
              </article>

              {/* Desktop only: arrow in the gap, same order as the hero steps */}
              {i < promises.length - 1 && (
                <div
                  className="pointer-events-none absolute top-32 z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 lg:-right-[1.875rem] lg:flex"
                  aria-hidden="true"
                >
                  <Glyph paths={ARROW_RIGHT} className="size-4" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KoraFieldPromiseSection;