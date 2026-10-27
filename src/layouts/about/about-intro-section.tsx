// src/layouts/about/about-intro-section.tsx
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Badge from "../../widgets/badge";

const container = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const riseEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const riseTransition = { duration: 0.8, ease: riseEase };

const loop = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  ease: "easeInOut" as const,
});

const still = { duration: 0.4 };

/* -------------------------------------------------------------------------- */
/*  Animated background                                                       */
/* -------------------------------------------------------------------------- */

const blobs = [
  {
    className: "-left-32 -top-32 size-[520px] bg-[#595bf1]/20",
    x: [0, 60, -20, 0],
    y: [0, 40, 80, 0],
    scale: [1, 1.15, 0.95, 1],
    duration: 22,
  },
  {
    className: "-right-24 top-1/4 size-[460px] bg-[#f163ea]/15",
    x: [0, -50, 20, 0],
    y: [0, 60, -30, 0],
    scale: [1, 0.92, 1.12, 1],
    duration: 26,
  },
  {
    className: "-bottom-40 left-1/3 size-[420px] bg-primary/15",
    x: [0, 40, -40, 0],
    y: [0, -30, 20, 0],
    scale: [1, 1.1, 0.95, 1],
    duration: 30,
  },
];

const particles = [
  { x: "8%", y: "22%", s: 6, d: 7, delay: 0 },
  { x: "18%", y: "68%", s: 10, d: 9, delay: 1.2 },
  { x: "30%", y: "14%", s: 4, d: 6, delay: 0.6 },
  { x: "44%", y: "8%", s: 7, d: 8.5, delay: 1.5 },
  { x: "72%", y: "18%", s: 8, d: 8, delay: 0.3 },
  { x: "86%", y: "40%", s: 5, d: 7, delay: 1.8 },
  { x: "80%", y: "74%", s: 11, d: 10, delay: 0.9 },
  { x: "58%", y: "84%", s: 5, d: 6.5, delay: 2.1 },
];

const Background = ({ animated }: { animated: boolean }) => (
  <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
    {/* Dot grid that fades out toward the edges */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(rgba(89,91,241,0.16) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent)",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent)",
      }}
    />

    {/* Slowly drifting colour */}
    {blobs.map((b, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full blur-3xl ${b.className}`}
        animate={animated ? { x: b.x, y: b.y, scale: b.scale } : { x: 0, y: 0, scale: 1 }}
        transition={animated ? loop(b.duration) : still}
      />
    ))}

    {/* Dashed rings turning in opposite directions, each carrying a small orbiting dot */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="absolute size-140 rounded-full border-2 border-dashed border-primary/10 sm:size-190 lg:size-225"
        animate={{ rotate: animated ? 360 : 0 }}
        transition={animated ? { duration: 90, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      >
        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-primary/40" />
      </motion.div>

      <motion.div
        className="absolute size-95 rounded-full border border-dashed border-[#f163ea]/20 sm:size-130 lg:size-155"
        animate={{ rotate: animated ? -360 : 0 }}
        transition={animated ? { duration: 70, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      >
        <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-[#f163ea]/50" />
      </motion.div>
    </div>

    {/* Floating specks */}
    {particles.map((p, i) => (
      <motion.span
        key={i}
        className="absolute rounded-full bg-linear-to-br from-[#595bf1] to-[#f163ea]"
        style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
        animate={animated ? { y: [0, -14, 0], opacity: [0.25, 0.75, 0.25] } : { y: 0, opacity: 0.4 }}
        transition={animated ? loop(p.d, p.delay) : still}
      />
    ))}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const AboutIntroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  // The background only moves while it's on screen, and never for reduced motion.
  const animated = inView && !reduceMotion;

  return (
    // isolate keeps the negative-z background inside this section
    <section
      ref={ref}
      className="relative isolate flex min-h-[85svh] items-center overflow-hidden bg-white px-8 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40"
    >
      <Background animated={animated} />

      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={rise} transition={riseTransition} className="flex justify-center">
          <Badge
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            }
          >
            About Kora
          </Badge>
        </motion.div>

        <h1 className="mt-7 text-4xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          <motion.span variants={rise} transition={riseTransition} className="block">
            Technology Should Help Aid
          </motion.span>
          <motion.span
            variants={rise}
            transition={riseTransition}
            className="block bg-linear-to-r from-[#595bf1] to-[#f163ea] bg-clip-text pb-1 text-transparent"
          >
            Reach the People Who Need It.
          </motion.span>
        </h1>

        <motion.p
          variants={rise}
          transition={riseTransition}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl"
        >
          Kora is building practical digital tools to help humanitarian and development
          organizations manage beneficiary information, coordinate assistance, and make
          better-informed decisions, even in challenging field conditions.
        </motion.p>

        {/* Small gradient rule that draws itself in */}
        <motion.span
          className="mx-auto mt-10 block h-1 w-16 origin-center rounded-full bg-linear-to-r from-[#595bf1] to-[#f163ea]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: riseEase }}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
};

export default AboutIntroSection;