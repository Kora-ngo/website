// src/widgets/feature-box-illustration.tsx
import { useId, useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import whiteLogo from "../../assets/icons/white_logo.png";
import { cn } from "../../utils/cn";

/* -------------------------------------------------------------------------- */
/*  Geometry                                                                  */
/*  Everything is drawn on a 440 x 560 canvas and converted to container-     */
/*  relative units (cqw), so the whole illustration scales as one piece.      */
/* -------------------------------------------------------------------------- */

const W = 440;
const H = 560;
const cqw = (px: number) => (px / W) * 100;
const pctY = (px: number) => `${(px / H) * 100}%`;

const CARD_W = 248;
const CARD_H = 56;
const START_Y = 342; // card top while fully hidden behind the box front
const END_Y = -90; //   card top once fully off the top of the stage

/* -------------------------------------------------------------------------- */
/*  Features                                                                  */
/* -------------------------------------------------------------------------- */

interface Feature {
  title: string;
  subtitle: string;
  icon: ReactNode;
  tile: string; // tailwind classes for the icon tile (bg + text color)
}

const Icon = ({ d }: { d: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    stroke="currentColor"
    className="size-[4.8cqw]"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const defaultFeatures: Feature[] = [
  {
    title: "Offline Collection",
    subtitle: "Works without signal",
    tile: "bg-yellow-50 text-yellow-600",
    icon: (
      <Icon d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    ),
  },
  {
    title: "Beneficiary Records",
    subtitle: "Households & families",
    tile: "bg-purple-50 text-purple-600",
    icon: (
      <Icon d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    ),
  },
  {
    title: "Validation Workflow",
    subtitle: "Review before approval",
    tile: "bg-teal-50 text-teal-600",
    icon: (
      <Icon d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    ),
  },
  {
    title: "Assistance Tracking",
    subtitle: "Every delivery logged",
    tile: "bg-cyan-50 text-cyan-600",
    icon: <Icon d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />,
  },
  {
    title: "Program Analytics",
    subtitle: "Targets & coverage",
    tile: "bg-rose-50 text-rose-500",
    icon: (
      <Icon d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    ),
  },
  {
    title: "Donor Reports",
    subtitle: "Ready for donors",
    tile: "bg-blue-50 text-blue-600",
    icon: (
      <Icon d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*  Feature card — position is a pure function of the shared `progress` value */
/* -------------------------------------------------------------------------- */

const FeatureCard = ({
  feature,
  index,
  count,
  progress,
}: {
  feature: Feature;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) => {
  // Cards are evenly spaced along the path, so the stage is always populated.
  const phase = useTransform(progress, (v) => (v + index / count) % 1);
  const y = useTransform(phase, (p) => cqw(START_Y + (END_Y - START_Y) * p));
  const scale = useTransform(phase, [0, 0.15, 1], [0.97, 1, 0.9]);
  const opacity = useTransform(phase, [0, 0.78, 0.97], [1, 1, 0]);
  const transform = useMotionTemplate`translate(-50%, ${y}cqw) scale(${scale})`;

  return (
    <motion.div
      className="absolute left-1/2 top-0 flex items-center rounded-[3.2cqw] bg-white shadow-lg ring-1 ring-black/5"
      style={{
        width: `${cqw(CARD_W)}cqw`,
        height: `${cqw(CARD_H)}cqw`,
        padding: `${cqw(8)}cqw`,
        gap: `${cqw(12)}cqw`,
        transform,
        opacity,
      }}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-[2.3cqw] ring-1 ring-black/5",
          feature.tile
        )}
        style={{ width: `${cqw(40)}cqw`, height: `${cqw(40)}cqw` }}
      >
        {feature.icon}
      </div>

      <div className="min-w-0">
        <p className="truncate font-semibold leading-tight text-gray-900 [font-size:max(11px,3.2cqw)]">
          {feature.title}
        </p>
        <p className="truncate leading-tight text-gray-400 [font-size:max(10px,2.55cqw)]">
          {feature.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Box — two layers: "back" sits behind the cards, "front" covers their base */
/* -------------------------------------------------------------------------- */

const BoxLayer = ({ layer, className }: { layer: "back" | "front"; className?: string }) => {
  const uid = useId().replace(/:/g, "");
  const main = `kora-main-${uid}`;
  const dark = `kora-dark-${uid}`;
  const light = `kora-light-${uid}`;
  const shade = `kora-shade-${uid}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("absolute inset-0 size-full", className)} aria-hidden="true">
      <defs>
        <linearGradient id={main} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#595bf1" />
          <stop offset="1" stopColor="#f163ea" />
        </linearGradient>
        <linearGradient id={dark} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3f41c4" />
          <stop offset="1" stopColor="#b53bae" />
        </linearGradient>
        <linearGradient id={light} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7e80f6" />
          <stop offset="1" stopColor="#f5a0f0" />
        </linearGradient>
        <linearGradient id={shade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e1b4b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1e1b4b" stopOpacity="0" />
        </linearGradient>
      </defs>

      {layer === "back" ? (
        <>
          {/* Open back flaps */}
          <polygon
            points="92,312 6,268 6,292 80,344"
            fill={`url(#${light})`}
            stroke={`url(#${light})`}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <polygon
            points="348,312 434,268 434,292 360,344"
            fill={`url(#${light})`}
            stroke={`url(#${light})`}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Inside back wall */}
          <rect x="84" y="304" width="272" height="60" fill={`url(#${dark})`} />
        </>
      ) : (
        <>
          {/* Box body */}
          <rect x="80" y="388" width="280" height="172" fill={`url(#${main})`} />
          <rect x="80" y="388" width="280" height="80" fill={`url(#${shade})`} />

          {/* Front flap, folded toward the viewer */}
          <polygon
            points="92,334 348,334 400,396 40,396"
            fill={`url(#${light})`}
            stroke={`url(#${light})`}
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <line
            x1="46"
            y1="396"
            x2="394"
            y2="396"
            stroke="#fff"
            strokeOpacity="0.5"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

interface FeatureBoxIllustrationProps {
  features?: Feature[];
  /** Seconds for a single card to travel from the box to the top. */
  cycleSeconds?: number;
  className?: string;
}

const FeatureBoxIllustration = ({
  features = defaultFeatures,
  cycleSeconds = 20,
  className,
}: FeatureBoxIllustrationProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.15 });
  const reduceMotion = useReducedMotion();

  const progress = useMotionValue(reduceMotion ? 0.3 : 0);
  const elapsed = useRef(0);

  // One clock drives every card. It pauses while off-screen and clamps long
  // frames (e.g. returning to the tab) so the motion never jumps.
  useAnimationFrame((_, delta) => {
    if (!inView || reduceMotion) return;
    elapsed.current += Math.min(delta, 100) / 1000;
    progress.set((elapsed.current / cycleSeconds) % 1);
  });

  return (
    // No background, border, shadow or clipping: the illustration sits directly
    // on the section. container-type stays because every size is in cqw units.
    <div
      ref={stageRef}
      className={cn(
        "relative mx-auto aspect-[440/560] w-full max-w-110",
        "[container-type:inline-size]",
        className
      )}
    >
      {/* Back of the box */}
      <BoxLayer layer="back" className="z-0" />

      {/* Cards rising out of the box. They dissolve into the section near the top. */}
      <div
        className="absolute inset-0 z-10"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
        }}
      >
        {features.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            index={i}
            count={features.length}
            progress={progress}
          />
        ))}
      </div>

      {/* Front of the box covers the base of every card, so they emerge from inside.
          The body fades out at the bottom so the box melts into the section. */}
      <div
        className="absolute inset-0 z-20"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        }}
      >
        <BoxLayer layer="front" />
      </div>

      {/* Kora logo on the box */}
      <div
        className="absolute left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
        style={{ top: pctY(472) }}
      >
        <motion.div
          className="absolute inset-0 rounded-[6cqw] bg-white/40 blur-xl"
          animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.15, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
          <img src={whiteLogo} alt="Kora" className="size-[11.8cqw] object-contain" />
      </div>
    </div>
  );
};

export default FeatureBoxIllustration;