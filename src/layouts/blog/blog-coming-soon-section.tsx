// src/layouts/blog/blog-coming-soon-section.tsx
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

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const BOOK = [
  "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
];
const BULB = [
  "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
  "M9 18h6",
  "M10 22h4",
];
const BOLT = ["M13 2 3 14h9l-1 8 10-12h-9l1-8Z"];
const WRENCH = [
  "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
];
const BELL = ["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"];
const ARROW_RIGHT = ["M5 12h14", "m13 6 6 6-6 6"];

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
/*  What to expect                                                            */
/* -------------------------------------------------------------------------- */

const topics = [
  {
    tag: "FIELD OPERATIONS",
    title: "Practical guides for aid teams",
    body: "Clear, usable ideas for registering beneficiaries, verifying records, and delivering assistance, even where connectivity is limited.",
    icon: BOOK,
    tile: "from-purple-500 to-purple-600",
    tint: "from-purple-500/25 via-purple-500/10 to-transparent",
    accent: "bg-purple-400",
  },
  {
    tag: "PILOT LEARNINGS",
    title: "What we’re learning, shared openly",
    body: "Observations from organizations evaluating Kora, and how their feedback shapes what we build next.",
    icon: BULB,
    tile: "from-yellow-500 to-yellow-600",
    tint: "from-yellow-500/20 via-yellow-500/10 to-transparent",
    accent: "bg-yellow-400",
  },
  {
    tag: "PRODUCT UPDATES",
    title: "What’s new in Kora",
    body: "New capabilities and improvements as the platform develops, and the thinking behind them.",
    icon: BOLT,
    tile: "from-[#595bf1] to-[#f163ea]",
    tint: "from-[#595bf1]/30 via-[#f163ea]/10 to-transparent",
    accent: "bg-[#f163ea]",
  },
];

// A mini article that "writes itself": each line draws in and clears in a loop.
const draftLines = [
  { w: "32%", h: "h-1.5", accent: true },
  { w: "84%", h: "h-2.5" },
  { w: "68%", h: "h-2.5" },
  { w: "92%", h: "h-1.5" },
  { w: "78%", h: "h-1.5" },
  { w: "44%", h: "h-1.5" },
];

const DraftCover = ({
  topic,
  index,
}: {
  topic: (typeof topics)[number];
  index: number;
}) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  // Loops only while visible, and never for visitors who prefer reduced motion.
  const animated = inView && !reduceMotion;

  return (
    <div
      ref={ref}
      className={cn("relative h-40 overflow-hidden bg-linear-to-br", topic.tint)}
      aria-hidden="true"
    >
      <div className="flex h-full flex-col justify-center gap-2.5 py-6 pl-6 pr-24">
        {draftLines.map((line, i) => (
          <motion.div
            key={i}
            className={cn(
              "origin-left rounded-full",
              line.h,
              line.accent ? topic.accent : i < 3 ? "bg-white/25" : "bg-white/10"
            )}
            style={{ width: line.w }}
            initial={false}
            animate={animated ? { scaleX: [0, 1, 1, 0] } : { scaleX: 1 }}
            transition={
              animated
                ? {
                    duration: 7,
                    times: [0, 0.3, 0.85, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: index * 0.6 + i * 0.4,
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      <motion.div
        className={cn(
          "absolute right-5 top-5 flex size-12 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg ring-1 ring-white/20",
          topic.tile
        )}
        animate={animated ? { y: [0, -6, 0] } : { y: 0 }}
        transition={
          animated
            ? { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }
            : { duration: 0.3 }
        }
      >
        <Glyph paths={topic.icon} className="size-6" />
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Status panel                                                              */
/* -------------------------------------------------------------------------- */

const StatusPanel = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const animated = inView && !reduceMotion;

  return (
    <motion.div
      ref={ref}
      className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm sm:p-8 lg:mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUpVariants}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="flex items-start gap-4">
        {/* <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/20">
          <Glyph paths={WRENCH} className="size-5" />
        </span> */}
        <div>
          <h2 className="text-lg font-semibold text-white">The blog is under construction</h2>
          <p className="mt-1 text-base leading-relaxed text-gray-400">
            We’re working on the first articles. In the meantime, explore the platform, or write to
            us and tell us what you’d like to read.
          </p>
        </div>
      </div>

      {/* Indeterminate on purpose: it shows work in progress without a made-up percentage */}
      <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <motion.span
          className="absolute inset-y-0 w-1/3 rounded-full bg-linear-to-r from-[#595bf1] to-[#f163ea]"
          initial={false}
          animate={animated ? { left: ["-33%", "100%"] } : { left: "0%" }}
          transition={
            animated
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        {/* <a
          href="mailto:hello@kora.onl?subject=Notify%20me%20when%20the%20Kora%20blog%20launches"
          className={cn(
            "group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white",
            "bg-linear-to-r from-[#595bf1] to-[#f163ea]",
            "shadow-md shadow-[#747bff]/20 transition-all duration-300",
            "hover:scale-[1.03] hover:shadow-lg hover:shadow-[#747bff]/40",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          )}
        >
          <Glyph paths={BELL} className="size-4" />
          Notify me at launch
        </a> */}

        <Link
          to="/solutions"
          className="group inline-flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          Explore our solutions
          <Glyph
            paths={ARROW_RIGHT}
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const BlogComingSoonSection = () => {
  return (
    // isolate keeps the negative-z decoration inside this section
    <section className="relative isolate overflow-hidden bg-gray-950 pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* Same atmosphere as the footer: dot grid, brand glows, dimmed watermark */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 30%, black, transparent)",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 30%, black, transparent)",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 size-[420px] rounded-full bg-[#595bf1]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-[55%] -z-10 size-[380px] rounded-full bg-[#f163ea]/10 blur-3xl" />
      <img
        src={whiteLogo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 -z-10 w-[560px] max-w-none select-none opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge
              variant="primary"
              glass
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
              }
            >
              The Kora blog
            </Badge>

            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-300 ring-1 ring-amber-400/25">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
              </span>
              Under construction
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
            Real Lessons From the Field.{" "}
            <span className="bg-linear-to-r from-[#7b7dff] to-[#f163ea] bg-clip-text text-transparent">
              Coming Soon.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            We’re building a space for what we learn as Kora grows: practical guides for aid teams,
            lessons from the pilot, and honest updates on how field operations can work better,
            even offline.
          </p>
        </motion.div>

        {/* What to expect */}
        <h2 className="sr-only">What to expect from the Kora blog</h2>

        <motion.div
          className="mx-auto mt-14 grid max-w-md grid-cols-1 gap-6 lg:mt-20 lg:max-w-none lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {topics.map((topic, i) => (
            // Outer: entrance. Inner: the card and its hover lift.
            <motion.div
              key={topic.tag}
              variants={itemVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <article className="h-full overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-white/20">
                <DraftCover topic={topic} index={i} />

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9a9cff]">
                      {topic.tag}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-400/20">
                      <span className="size-1.5 rounded-full bg-amber-400" />
                      In the works
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-snug text-white">{topic.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-400">{topic.body}</p>
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>

        <StatusPanel />
      </div>
    </section>
  );
};

export default BlogComingSoonSection;