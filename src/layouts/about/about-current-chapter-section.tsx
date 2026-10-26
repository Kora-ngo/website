// src/layouts/about/about-current-chapter-section.tsx
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
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

const CLIPBOARD_CHECK = [
  "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",
  "M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z",
  "m9 14 2 2 4-4",
];
const CHAT = [
  "M21 12c0 4.418-4.03 8-9 8a9.9 9.9 0 0 1-3.5-.63L3 21l1.5-4.2C3.55 15.6 3 13.86 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z",
  "M8 12h.01",
  "M12 12h.01",
  "M16 12h.01",
];
const TARGET = [
  "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  "M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z",
  "M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
];
const ARROW_RIGHT = ["M5 12h14", "m13 6 6 6-6 6"];
const ARROW_DOWN = ["M12 5v14", "m6 13 6 6 6-6"];

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

/* -------------------------------------------------------------------------- */
/*  The loop: the three things the paragraph says the pilot is for            */
/* -------------------------------------------------------------------------- */

const SIZE = 520;
const CENTER = SIZE / 2;
const RADIUS = 190;
const SAMPLES = 72;
const CYCLE = 9; // seconds for the dot to travel the whole ring
const LOOP_DELAY = 1.4; // the loop starts once the pieces have appeared

const onRing = (deg: number) => ({
  x: CENTER + RADIUS * Math.cos((deg * Math.PI) / 180),
  y: CENTER + RADIUS * Math.sin((deg * Math.PI) / 180),
});

const rawSteps = [
  {
    title: "Evaluate",
    sub: "the platform in practical settings",
    icon: CLIPBOARD_CHECK,
    tile: "from-purple-500 to-purple-600",
    angle: -90,
  },
  {
    title: "Learn",
    sub: "from their operational needs",
    icon: CHAT,
    tile: "from-yellow-500 to-yellow-600",
    angle: 30,
  },
  {
    title: "Identify",
    sub: "where it can deliver the most value",
    icon: TARGET,
    tile: "from-[#595bf1] to-[#f163ea]",
    angle: 150,
  },
];

const steps = rawSteps.map((s, i) => ({ ...s, ...onRing(s.angle), phase: i / rawSteps.length }));

// Dot positions around the ring, clockwise, starting and ending at the top.
const ring = Array.from({ length: SAMPLES + 1 }, (_, k) => onRing(-90 + (360 * k) / SAMPLES));
const ringX = ring.map((p) => +p.x.toFixed(1));
const ringY = ring.map((p) => +p.y.toFixed(1));

// Small arrowheads halfway between the steps, pointing clockwise.
const arrows = rawSteps.map((s, i) => {
  const next = rawSteps[(i + 1) % rawSteps.length].angle + (i === rawSteps.length - 1 ? 360 : 0);
  const mid = (s.angle + next) / 2;
  return { ...onRing(mid), rotate: mid + 90 };
});

// A card lights up at the moment the travelling dot reaches it.
const glowFor = (phase: number) =>
  phase === 0
    ? { times: [0, 0.14, 1], values: [1, 0, 0] }
    : { times: [0, phase - 0.1, phase, phase + 0.14, 1], values: [0, 0, 1, 0, 0] };

/* -------------------------------------------------------------------------- */
/*  Pieces                                                                    */
/* -------------------------------------------------------------------------- */

const PilotChip = () => (
  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-md ring-1 ring-black/5">
    <span className="relative flex size-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
      <span className="relative inline-flex size-2 rounded-full bg-green-500" />
    </span>
    Pilot phase
  </span>
);

const KoraHub = ({ className, pulsing }: { className: string; pulsing: boolean }) => (
  <motion.div
    className="relative w-fit"
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ type: "spring", stiffness: 190, damping: 16 }}
  >
    {[0, 1].map((i) => (
      <motion.span
        key={i}
        className="absolute inset-0 rounded-[28%] bg-linear-to-br from-[#595bf1] to-[#f163ea]"
        initial={{ opacity: 0 }}
        animate={pulsing ? { scale: [1, 1.6], opacity: [0.3, 0] } : { opacity: 0 }}
        transition={
          pulsing
            ? { duration: 2.8, delay: i * 1.4, repeat: Infinity, ease: "easeOut" }
            : { duration: 0.3 }
        }
      />
    ))}
    <div
      className={cn(
        "relative flex items-center justify-center rounded-[28%] bg-linear-to-br from-[#595bf1] to-[#f163ea] shadow-2xl shadow-[#747bff]/40 ring-1 ring-white/30",
        className
      )}
    >
      <img src={whiteLogo} alt="" className="size-1/2 object-contain" />
    </div>
  </motion.div>
);

const LoopIllustration = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const seen = useInView(ref, { once: true, amount: 0.25 });
  const onScreen = useInView(ref);
  // Loops only run while the loop is visible, and never for reduced motion.
  const loops = seen && onScreen && !reduceMotion;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[520px]">
      {/* Desktop and tablet: the loop */}
      <div
        role="img"
        aria-label="Illustrative loop: evaluate the platform in practical settings, learn from operational needs, and identify where Kora can deliver the most value"
        className="relative isolate hidden aspect-square w-full sm:block"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="size-3/4 rounded-full bg-linear-to-br from-[#595bf1]/15 to-[#f163ea]/15 blur-3xl" />
        </div>

        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden="true">
          {/* The ring, with dashes that march clockwise */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#595bf1"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray="3 10"
            initial={{ opacity: 0, strokeDashoffset: 0 }}
            animate={
              loops
                ? { opacity: 0.45, strokeDashoffset: -39 }
                : { opacity: 0.45, strokeDashoffset: 0 }
            }
            transition={
              loops
                ? {
                    opacity: { duration: 0.8 },
                    strokeDashoffset: { duration: 6, repeat: Infinity, ease: "linear" },
                  }
                : { duration: 0.8 }
            }
          />

          {arrows.map((a, i) => (
            <motion.g
              key={i}
              transform={`translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${a.rotate.toFixed(1)})`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
            >
              <path
                d="M-5 -5 L4 0 L-5 5"
                fill="none"
                stroke="#595bf1"
                strokeOpacity={0.7}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>
          ))}

          {/* The dot that travels the loop */}
          {!reduceMotion && (
            <motion.circle
              r={4.5}
              fill="#fff"
              stroke="#595bf1"
              strokeOpacity={0.45}
              strokeWidth={9}
              initial={{ cx: ringX[0], cy: ringY[0], opacity: 0 }}
              animate={loops ? { cx: ringX, cy: ringY, opacity: 1 } : { opacity: 0 }}
              transition={
                loops
                  ? {
                      cx: { duration: CYCLE, delay: LOOP_DELAY, repeat: Infinity, ease: "linear" },
                      cy: { duration: CYCLE, delay: LOOP_DELAY, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 0.4, delay: LOOP_DELAY },
                    }
                  : { duration: 0.3 }
              }
            />
          )}
        </svg>

        {/* Center: Kora, in its pilot phase */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="flex justify-center">
            <KoraHub className="size-24" pulsing={loops} />
          </div>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PilotChip />
          </motion.div>
        </div>

        {/* The three steps */}
        {steps.map((step, i) => {
          const glow = glowFor(step.phase);

          return (
            // Outer: placement. Inner: the entrance, so the two never fight over a transform.
            <div
              key={step.title}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(step.x / SIZE) * 100}%`, top: `${(step.y / SIZE) * 100}%` }}
            >
              <motion.div
                className="relative w-44 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.3 + i * 0.2 }}
              >
                {!reduceMotion && (
                  <motion.span
                    className="pointer-events-none absolute -inset-1 rounded-[1.25rem] shadow-[0_0_28px_rgba(89,91,241,0.4)] ring-2 ring-primary/50"
                    initial={{ opacity: 0 }}
                    animate={loops ? { opacity: glow.values } : { opacity: 0 }}
                    transition={
                      loops
                        ? {
                            duration: CYCLE,
                            delay: LOOP_DELAY,
                            times: glow.times,
                            repeat: Infinity,
                            ease: "linear",
                          }
                        : { duration: 0.3 }
                    }
                  />
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-sm",
                      step.tile
                    )}
                  >
                    <Glyph paths={step.icon} className="size-5" />
                  </span>
                  <span className="text-2xl font-bold leading-none text-gray-100">{i + 1}</span>
                </div>

                <p className="mt-3 text-base font-bold leading-tight text-gray-900">{step.title}</p>
                <p className="mt-1 text-xs leading-snug text-gray-500">{step.sub}</p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Phones: the same three steps as a stack */}
      <div className="sm:hidden">
        <div className="flex flex-col items-center">
          <KoraHub className="size-20" pulsing={loops} />
          <div className="mt-3">
            <PilotChip />
          </div>
        </div>

        <ol className="mt-8 space-y-3">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5">
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-sm",
                    step.tile
                  )}
                >
                  <Glyph paths={step.icon} className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-bold leading-tight text-gray-900">{step.title}</p>
                  <p className="mt-0.5 text-sm leading-snug text-gray-500">{step.sub}</p>
                </div>
              </div>

              {i < steps.length - 1 && (
                <div aria-hidden="true" className="flex justify-center py-1.5 text-primary/60">
                  <Glyph paths={ARROW_DOWN} className="size-5" />
                </div>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const AboutCurrentChapterSection = () => {
  return (
    // isolate keeps the negative-z decoration inside this section
    <section className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 size-[420px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 -z-10 size-[460px] rounded-full bg-linear-to-br from-[#595bf1]/10 to-[#f163ea]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>
              }
            >
              Our current chapter
            </Badge>

            <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Building With{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
                the Field in Mind.
              </span>
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              Kora is currently in its pilot phase. We’re looking to engage with NGOs and
              humanitarian organizations to evaluate the platform in practical settings, learn from
              their operational needs, and identify where it can deliver the most value.
            </p>

            {/* The belief behind it, set apart */}
            <div className="relative max-w-xl py-1 pl-7">
              <span
                className="absolute inset-y-0 left-0 w-1 rounded-full bg-linear-to-b from-[#595bf1] to-[#f163ea]"
                aria-hidden="true"
              />
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute -top-2 left-5 size-9 text-primary/10"
                aria-hidden="true"
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              <p className="relative text-lg font-medium leading-relaxed text-gray-900 sm:text-xl">
                We believe useful tools are shaped not only by the people who build them, but also
                by the people who use them.
              </p>
            </div>

            {/* Next step for organizations who want to take part */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
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
                Discuss a Pilot with Us
                <Glyph
                  paths={ARROW_RIGHT}
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/pricing"
                className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                About the pilot program
              </Link>
            </div>
          </motion.div>

          {/* Illustration */}
          <LoopIllustration />
        </div>
      </div>
    </section>
  );
};

export default AboutCurrentChapterSection;