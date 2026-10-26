// src/layouts/platform/platform-ecosystem-section.tsx
import { motion } from "framer-motion";
import Badge from "../../widgets/badge";
import whiteLogo from "../../assets/icons/white_logo.png";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const products = [
  {
    key: "field",
    name: "Kora Field",
    tagline: "Collect in the field",
    bullets: ["Collect", "Work Offline", "Synchronize"],
    frame: "phone" as const,
    accent: "from-yellow-400 to-yellow-500",
  },
  {
    key: "collaborator",
    name: "Kora Collaborator",
    tagline: "Review & validate",
    bullets: ["Review", "Validate", "Supervise"],
    frame: "tablet" as const,
    accent: "from-purple-400 to-purple-500",
  },
  {
    key: "admin",
    name: "Kora Admin",
    tagline: "Manage & analyze",
    bullets: ["Manage", "Monitor", "Report"],
    frame: "desktop" as const,
    accent: "from-blue-400 to-blue-500",
  },
];

const DeviceMockup = ({ frame, accent }: { frame: "phone" | "tablet" | "desktop"; accent: string }) => {
  if (frame === "phone") {
    return (
      <div className="w-24 aspect-9/16 rounded-[1.4rem] border-[3px] border-gray-700 bg-gray-900 p-1.5 shadow-xl">
        <div className="h-full w-full rounded-[1rem] bg-gray-800/60 p-2 flex flex-col gap-1.5">
          <div className={`h-1.5 w-8 rounded-full bg-linear-to-r ${accent}`} />
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-2/3 rounded bg-white/10" />
          <div className="mt-auto h-6 w-full rounded bg-white/5" />
        </div>
      </div>
    );
  }

  if (frame === "tablet") {
    return (
      <div className="w-40 aspect-4/3 rounded-xl border-[3px] border-gray-700 bg-gray-900 p-1.5 shadow-xl">
        <div className="h-full w-full rounded-lg bg-gray-800/60 flex overflow-hidden">
          <div className="w-8 bg-white/5 flex flex-col gap-1 p-1">
            <div className={`h-1.5 w-full rounded-full bg-linear-to-r ${accent}`} />
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="h-1.5 w-full rounded-full bg-white/10" />
          </div>
          <div className="flex-1 p-2 flex flex-col gap-1.5">
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-3/4 rounded bg-white/10" />
            <div className="h-10 w-full rounded bg-white/5 mt-1" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-56 aspect-16/10 rounded-lg border-[3px] border-gray-700 bg-gray-900 p-1.5 shadow-xl">
      <div className="h-full w-full rounded-md bg-gray-800/60 overflow-hidden flex flex-col">
        <div className="h-4 flex items-center gap-1 px-2 bg-white/5 shrink-0">
          <span className="size-1.5 rounded-full bg-gray-600" />
          <span className="size-1.5 rounded-full bg-gray-600" />
          <span className="size-1.5 rounded-full bg-gray-600" />
        </div>
        <div className="flex-1 p-2 flex gap-2">
          <div className="w-10 flex flex-col gap-1">
            <div className={`h-1.5 w-full rounded-full bg-linear-to-r ${accent}`} />
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="h-1.5 w-full rounded-full bg-white/10" />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-1.5">
            <div className="rounded bg-white/5" />
            <div className="rounded bg-white/5" />
            <div className="col-span-2 rounded bg-white/5 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Merging connector: each device's line drops down, then bends horizontally
// toward the center column, then drops into the shared core. The middle
// column just goes straight down. Uses a shared viewBox so the three paths
// align exactly with the three grid columns above (col centers at 1/6, 1/2, 5/6).
const ConnectorSpine = () => {
  const paths = [
    "M100,0 L100,50 L300,50 L300,100", // left -> merges right into center
    "M300,0 L300,100",                  // center -> straight down
    "M500,0 L500,50 L300,50 L300,100", // right -> merges left into center
  ];

  const dotKeyframes = [
    { cx: [100, 100, 300, 300], cy: [0, 50, 50, 100] },
    { cx: [300, 300], cy: [0, 100] },
    { cx: [500, 500, 300, 300], cy: [0, 50, 50, 100] },
  ];

  return (
    <div className="relative w-full h-16 md:h-20">
      <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {paths.map((d, i) => (
        <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="white"
            strokeOpacity={0.15}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: "easeOut" }}
            onAnimationComplete={() => {}}
        />
        ))}

        {dotKeyframes.map((k, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r={3}
            fill="#747bff"
            initial={{ opacity: 0 }}
            animate={{ cx: k.cx, cy: k.cy, opacity: [0, 1, 1, 1, 0] }}
            transition={{
              duration: 1.8,
              delay: 1.2 + i * 0.4,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const PlatformEcosystemSection = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-gray-950 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Badge
            variant="primary"
            glass
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.5 5.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm-4.5 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm9 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm-4.5 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
              </svg>
            }
          >
            ONE CONNECTED PLATFORM
          </Badge>

          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white">
            One Operational System. <span className="text-primary">Different Responsibilities.</span>
          </h2>

          <p className="mt-4 text-gray-400 text-lg leading-relaxed">
            Kora gives each team the tools they need while keeping project data connected across the organization.
          </p>
        </motion.div>

        {/* Three interfaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6">
          {products.map((p, i) => (
            <motion.div
              key={p.key}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            >
              <DeviceMockup frame={p.frame} accent={p.accent} />

              <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-xs text-gray-400">{p.tagline}</p>
              </div>

              <div className="mt-3 flex flex-wrap justify-center gap-1.5 max-w-40">
                {p.bullets.map((b) => (
                  <span
                    key={b}
                    className="px-2 py-0.5 rounded-full bg-white/5 text-white/70 text-[10px] font-medium ring-1 ring-white/10"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Merging connector spine — replaces the 3 independent vertical lines */}
        <div className="hidden md:block">
          <ConnectorSpine />
        </div>

        {/* Shared core */}
        <motion.div
          className="max-w-xl mx-auto rounded-2xl p-px bg-linear-to-r from-[#595bf1] to-[#f163ea]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="rounded-2xl bg-gray-950 px-6 py-4 flex items-center justify-center gap-3">
            <img src={whiteLogo} alt="" aria-hidden="true" className="size-6" />
            <span className="text-sm font-semibold text-white">Kora Central Platform</span>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-sm text-gray-500">
          One shared operational data foundation
        </p>
      </div>
    </section>
  );
};

export default PlatformEcosystemSection;