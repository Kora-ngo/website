// src/layouts/home/home-problem-section.tsx
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import Badge from "../../widgets/badge";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

// `topic` is a short label that lets people scan the three challenges at a glance.
const quotes = [
  {
    topic: "No connectivity",
    text: `"When there's no signal, we go back to paper. Later, we have to re-enter everything... and sometimes we're not even sure which records are complete."`,
  },
  {
    topic: "Duplicate records",
    text: `"We've had the same family registered twice because we couldn't verify properly. It causes tension, and we can't afford those mistakes."`,
  },
  {
    topic: "Donor reporting",
    text: `"Donors ask for evidence. We try our best... but pulling everything together from notes, spreadsheets, and different systems is stressful."`,
  },
];

const AUTOPLAY_MS = 8000;
const GAP = 12; // space between the active card and its neighbours
const PEEK = 90; // how much of each neighbour shows above and below the active card
const FALLBACK_HEIGHT = 150; // only used for the very first render, before cards are measured

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

const IconButton = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="flex size-9 touch-manipulation items-center justify-center rounded-full bg-white text-gray-600 shadow-sm ring-1 ring-black/10 transition duration-200 hover:text-primary hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      {children}
    </svg>
  </button>
);

/* -------------------------------------------------------------------------- */
/*  Carousel                                                                  */
/* -------------------------------------------------------------------------- */

const QuoteCarousel = () => {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.3 });
  const count = quotes.length;

  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);

  // Autoplay only runs while the carousel is on screen and nobody is using it.
  const running = inView && !userPaused && !hovering && !keyboardFocus && !reduceMotion;
  const runningRef = useRef(running);
  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  // 0 -> 1 over AUTOPLAY_MS. Pausing simply stops it, so it resumes where it left off.
  const progress = useMotionValue(0);
  const fill = useTransform(progress, (v) => `${v * 100}%`);

  const tick = useCallback(
    (_: number, delta: number) => {
      if (!runningRef.current) return;
      const next = progress.get() + Math.min(delta, 100) / AUTOPLAY_MS;
      if (next >= 1) {
        progress.set(0);
        setActive((a) => (a + 1) % count);
      } else {
        progress.set(next);
      }
    },
    [count, progress]
  );
  useAnimationFrame(tick);

  const go = useCallback(
    (i: number) => {
      setActive(((i % count) + count) % count);
      progress.set(0);
    },
    [count, progress]
  );

  /* ----------------------- Layout: sized to the real text ----------------------- */

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>(() => quotes.map(() => FALLBACK_HEIGHT));
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const next = cardRefs.current.map((el) => el?.offsetHeight || FALLBACK_HEIGHT);
      setHeights((prev) => (prev.every((h, i) => h === next[i]) ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    cardRefs.current.forEach((el) => el && observer.observe(el));
    // Turn animations on one frame later, so the first measurement snaps into place.
    const raf = requestAnimationFrame(() => setReady(true));

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const maxHeight = Math.max(...heights);
  const containerHeight = maxHeight + 2 * (GAP + PEEK);

  const placement = (i: number) => {
    // Shortest circular distance from the active card, so the loop wraps cleanly.
    let r = i - active;
    if (r > count / 2) r -= count;
    if (r < -count / 2) r += count;
    if (r === 0) return { r, y: 0 };

    const distance =
      heights[active] / 2 + GAP + heights[i] / 2 + (Math.abs(r) - 1) * (maxHeight + GAP);
    return { r, y: Math.sign(r) * distance };
  };

  /* --------------------------------- Handlers --------------------------------- */

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  const current = quotes[active];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Common field challenges"
      className="w-full max-w-lg lg:max-w-xl"
      // Only a real mouse pauses on hover. On touch, a tap would leave it "hovered" forever.
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
      // Only keyboard focus pauses it. A mouse click on a button should not freeze it.
      onFocus={(e) => e.target.matches(":focus-visible") && setKeyboardFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardFocus(false);
      }}
      onKeyDown={onKeyDown}
    >
      {/* Screen readers get one quote at a time, announced when it changes while paused */}
      <p className="sr-only" aria-live={running ? "off" : "polite"} aria-atomic="true">
        {`Challenge ${active + 1} of ${count}: ${current.topic}. ${current.text}`}
      </p>

      {/* The visual stack */}
      <div className="relative w-full overflow-hidden" style={{ height: containerHeight }} aria-hidden="true">
        {/* Fade masks: top and bottom edges dissolve into the section bg */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-linear-to-b from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-gray-50 to-transparent" />

        {quotes.map((quote, i) => {
          const { r, y } = placement(i);
          const isActive = r === 0;
          const isAdjacent = Math.abs(r) === 1;

          return (
            <motion.div
              key={quote.topic}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={cn(
                "absolute inset-x-0 top-1/2 border-l-4 border-l-primary bg-white p-5 pt-8 shadow-xl ring-1 ring-black/5",
                !isActive && isAdjacent && "cursor-pointer"
              )}
              animate={{
                y: `calc(-50% + ${y}px)`,
                opacity: isActive ? 1 : isAdjacent ? 0.45 : 0,
                scale: isActive ? 1 : 0.94,
              }}
              whileHover={!isActive && isAdjacent ? { opacity: 0.75 } : undefined}
              transition={{
                duration: ready && !reduceMotion ? 0.6 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={isActive ? undefined : () => go(i)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute left-4 top-3 size-8 text-primary/15"
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>

              <span className="absolute right-4 top-3 text-[10px] font-semibold uppercase tracking-wider text-primary/70">
                {quote.topic}
              </span>

              {/* No line-clamp: the full quote is always readable */}
              <p className="relative text-sm leading-relaxed text-gray-700 lg:text-[16px]">
                {quote.text}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-between gap-4">
        {/* Dots. The active one fills up to show when the next quote arrives. */}
        <div className="flex items-center">
          {quotes.map((quote, i) => {
            const isActive = i === active;
            return (
              <button
                key={quote.topic}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show challenge ${i + 1}: ${quote.topic}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex h-9 touch-manipulation items-center px-1 focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "relative block h-1.5 overflow-hidden rounded-full transition-all duration-300",
                    "group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2",
                    isActive ? "w-10 bg-primary/20" : "w-2 bg-gray-300 group-hover:bg-gray-400"
                  )}
                >
                  {isActive && (
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                      style={{ width: reduceMotion ? "100%" : fill }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {!reduceMotion && (
            <IconButton
              label={userPaused ? "Resume automatic rotation" : "Pause automatic rotation"}
              onClick={() => setUserPaused((p) => !p)}
            >
              {userPaused ? <path d="M8 5.5v13l11-6.5-11-6.5Z" /> : <path d="M8 5v14M16 5v14" />}
            </IconButton>
          )}
          <IconButton label="Previous challenge" onClick={() => go(active - 1)}>
            <path d="m18 15-6-6-6 6" />
          </IconButton>
          <IconButton label="Next challenge" onClick={() => go(active + 1)}>
            <path d="m6 9 6 6 6-6" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const HomeProblemSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column – Text / Problem description */}
          <div className="space-y-8">
            <div className="space-y-2">
              <Badge
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                      clipRule="evenodd"
                    />
                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                  </svg>
                }
              >
                Real Problem. Real Impact
              </Badge>
              <h2 className="text-2xl sm:text-2xl lg:text-4xl font-bold leading-tight tracking-tight">
                When Field Data Is  <span className="text-primary">Fragmented</span>, <br /> Accountability Suffers
              </h2>
            </div>

            <p className="text-gray-600 text-lg sm:text-lg leading-relaxed max-w-3xl">
              Field teams often work across disconnected systems, unreliable connectivity, and manual processes. The result is incomplete records,
              duplicated beneficiaries, delayed reporting, and limited visibility into whether assistance reached the households it was intended for.
            </p>

            {/* Next step in the story: from the problem to the answer */}
            {/* <Link
              to="/platform"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              See how Kora solves this
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link> */}
          </div>

          {/* Right column – vertical rotating quote carousel */}
          <motion.div
            className="w-full flex justify-center lg:justify-end"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <QuoteCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeProblemSection;