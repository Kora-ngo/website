// src/widgets/cta-request-demo.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import whiteLogo from "../../assets/icons/white_logo.png";
import box from "../../assets/icons/box.svg";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

/* -------------------------------------------------------------------------- */
/*  Modules coming out of the box                                             */
/*  left/right/bottom are % of the illustration area. Cards sit BEHIND the    */
/*  box, so the box front hides the lower part of each one: a low `bottom`    */
/*  looks "half inside", a high `bottom` looks like it's floating above.      */
/* -------------------------------------------------------------------------- */

interface Module {
  label: string;
  sub: string;
  paths: string[];
  tile: string;
  rotate: number;
  left?: string;
  right?: string;
  bottom: string;
  bobDuration: number;
}

const modules: Module[] = [
  {
    label: "Analytics",
    sub: "Insights",
    paths: ["M3 3v18h18", "M7 15l4-4 3 3 5-6"],
    tile: "from-rose-500 to-rose-600",
    rotate: -7,
    left: "16%",
    bottom: "60%",
    bobDuration: 5,
  },
  {
    label: "Tracking",
    sub: "Deliveries",
    paths: [
      "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
      "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
    ],
    tile: "from-teal-500 to-teal-600",
    rotate: 3,
    left: "26%",
    bottom: "48%",
    bobDuration: 5.6,
  },
  {
    label: "Sync",
    sub: "Always current",
    paths: [
      "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
    ],
    tile: "from-[#595bf1] to-[#f163ea]",
    rotate: 7,
    right: "10%",
    bottom: "45%",
    bobDuration: 6.2,
  },
  {
    label: "Offline",
    sub: "Anywhere",
    paths: ["M2 8.8a15 15 0 0 1 20 0", "M5 12.5a10 10 0 0 1 14 0", "M8.5 16a5 5 0 0 1 7 0", "M3 3l18 18"],
    tile: "from-yellow-500 to-yellow-600",
    rotate: -3,
    left: "18%",
    bottom: "36%",
    bobDuration: 5.3,
  },
  {
    label: "Reports",
    sub: "Donor-ready",
    paths: [
      "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
    ],
    tile: "from-blue-500 to-blue-600",
    rotate: 4,
    right: "12%",
    bottom: "34%",
    bobDuration: 6.6,
  },
];

const slideEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------------------------- */
/*  Animation: first just the box, then the modules pop out one after another */
/* -------------------------------------------------------------------------- */

const stageVariants = {
  hidden: {},
  visible: {},
};

const boxVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const popVariants = {
  // Starts deep inside the box and glides up. No scale change and no spring
  // overshoot, so it reads as a slide, not a pop.
  hidden: { opacity: 0, y: 150 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      // Full opacity almost immediately: the box front hides the card until it emerges.
      opacity: { duration: 0.2, delay: 0.75 + i * 0.14 },
      y: { duration: 1, ease: slideEase, delay: 0.75 + i * 0.14 },
    },
  }),
};

const ModuleCard = ({ module: m, index }: { module: Module; index: number }) => {
  const reduceMotion = useReducedMotion();

  return (
    // Outer: position + the pop-out. Middle: static tilt. Inner: the gentle bob.
    <motion.div
      className="absolute z-0"
      style={{ left: m.left, right: m.right, bottom: m.bottom }}
      variants={popVariants}
      custom={index}
    >
      <div style={{ rotate: `${m.rotate}deg` }}>
        <motion.div
          className="flex w-32 items-center gap-2 rounded-xl bg-white p-2 pr-2.5 shadow-lg ring-1 ring-black/5"
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        >
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br text-white shadow-sm",
              m.tile
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              {m.paths.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          </span>

          <div className="min-w-0">
            <p className="truncate text-[11px] font-bold leading-tight text-gray-900">{m.label}</p>
            <p className="truncate text-[9px] leading-tight text-gray-400">{m.sub}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const BoxIllustration = () => (
  <motion.div
    className={cn(
      "relative mx-auto mt-6 aspect-[5/6] w-64",
      // From md up the illustration is pinned to the card's bottom-right and
      // rises above its top edge.
      "md:absolute md:right-8 md:bottom-0 md:mx-0 md:mt-0 md:w-80 lg:right-12",
      // Cuts everything at the card's bottom edge so the box looks sunk into the
      // card. Top, left and right are left open, so the box and modules still
      // rise above the card.
      "[clip-path:inset(-100vh_-4rem_0_-4rem)]"
    )}
    variants={stageVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    {/* Glow behind the box (sits above the card background, below everything else) */}
    <div className="pointer-events-none absolute inset-x-4 bottom-0 -z-10 h-1/2 rounded-full bg-primary/30 blur-3xl" />

    {/* Modules, behind the box */}
    {modules.map((m, i) => (
      <ModuleCard key={m.label} module={m} index={i} />
    ))}

    {/* The box, in front */}
    <div className="absolute bottom-[-15%] left-1/2 z-10 w-[120%] -translate-x-1/2">
      <motion.img
        src={box}
        alt=""
        aria-hidden="true"
        className="block h-auto w-full select-none"
        variants={boxVariants}
        draggable={false}
      />
    </div>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/*  CTA                                                                       */
/* -------------------------------------------------------------------------- */

interface CtaRequestDemoProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const CtaRequestDemo = ({
  title = "Let's See What Kora Can Do for Your Team",
  subtitle = "Let's talk about your field operations, your challenges, and how Kora could fit the way your organization works.",
  className,
}: CtaRequestDemoProps) => {
  return (
    // md:pt-40 leaves room for the box and its modules to rise above the card.
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:pt-40", className)}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUpVariants}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          // No overflow-hidden here: the box must be allowed to overlay the top edge.
          "relative isolate rounded-2xl bg-gray-950 shadow-xl shadow-black/30",
          "flex flex-col px-6 pt-8 pb-0 md:justify-center md:px-10 md:py-10 md:min-h-58"
        )}
      >
        {/* Watermark logo, clipped to the card on its own layer */}

        {/* Left: text + button */}
        <div className="relative text-left md:w-[56%]">
          <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">{title}</h3>
          <p className="mt-2 max-w-xl text-sm text-white/70 sm:text-base lg:text-lg">{subtitle}</p>

          <Link
            to="/request-demo"
            className={cn(
              "group relative mt-6 inline-flex items-center gap-2 overflow-hidden",
              "rounded-md px-6 py-3 text-sm font-semibold whitespace-nowrap",
              "bg-[#595bf1] text-white shadow-lg",
              "transition-transform duration-300 ease-out",
              "hover:scale-105 hover:shadow-2xl",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            )}
          >
            <span>Let's Talk</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Right: the box */}
        <BoxIllustration />
      </motion.div>
    </div>
  );
};

export default CtaRequestDemo;