// src/layouts/solutions/solutions-integrations-section.tsx
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
/*  Geometry: everything is drawn on a 1200 x 460 canvas. Nodes are placed in  */
/*  % of the same box, so the lines and the nodes always line up.              */
/* -------------------------------------------------------------------------- */

const W = 1200;
const H = 460;
const HUB = { x: 600, y: 230 };
const CURVE = 230; // how far the curve control points reach horizontally
const SAMPLES = 28; // points used to move the pulse dots along each curve

type Side = "left" | "right";

interface Tool {
  label: string;
  sub: string;
  paths: string[];
  tile: string;
  side: Side;
  x: number;
  y: number;
  delay: number;
}

const tools: Tool[] = [
  {
    label: "Excel",
    sub: "Spreadsheets",
    paths: ["M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Z", "M3 10h18", "M3 15h18", "M9 4v16"],
    tile: "from-green-500 to-green-700",
    side: "left",
    x: 210,
    y: 70,
    delay: 0.3,
  },
  {
    label: "Power BI",
    sub: "Dashboards",
    paths: ["M5 20v-8", "M12 20V4", "M19 20v-6"],
    tile: "from-yellow-400 to-amber-500",
    side: "left",
    x: 110,
    y: 230,
    delay: 0.45,
  },
  {
    label: "Databases",
    sub: "Data stores",
    paths: [
      "M4 6c0-1.657 3.582-3 8-3s8 1.343 8 3-3.582 3-8 3-8-1.343-8-3Z",
      "M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6",
      "M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6",
    ],
    tile: "from-blue-500 to-blue-700",
    side: "left",
    x: 210,
    y: 390,
    delay: 0.6,
  },
  {
    label: "Internal systems",
    sub: "Existing platforms",
    paths: [
      "M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v3A1.5 1.5 0 0 1 18.5 11h-13A1.5 1.5 0 0 1 4 9.5v-3Z",
      "M4 14.5A1.5 1.5 0 0 1 5.5 13h13a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-3Z",
      "M8 8h.01",
      "M8 16h.01",
    ],
    tile: "from-slate-500 to-slate-700",
    side: "right",
    x: 990,
    y: 70,
    delay: 0.35,
  },
  {
    label: "Donor portals",
    sub: "Donor reporting",
    paths: [
      "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
      "M3 12h18",
      "M12 3c2.5 2.4 3.8 5.4 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.4-3.8-9S9.5 5.4 12 3Z",
    ],
    tile: "from-purple-500 to-purple-700",
    side: "right",
    x: 1090,
    y: 230,
    delay: 0.5,
  },
  {
    label: "Custom APIs",
    sub: "Tailored connections",
    paths: ["M8 8l-4 4 4 4", "M16 8l4 4-4 4", "M13.5 5l-3 14"],
    tile: "from-rose-500 to-rose-600",
    side: "right",
    x: 990,
    y: 390,
    delay: 0.65,
  },
];

/* ------------------------------ Curve helpers ------------------------------ */

const pathFor = (t: Tool) => {
  const s = t.side === "left" ? 1 : -1;
  return `M${t.x} ${t.y} C${t.x + s * CURVE} ${t.y} ${HUB.x - s * CURVE} ${HUB.y} ${HUB.x} ${HUB.y}`;
};

// Points along the same curve, used to move the pulse dots.
const samplePoints = (t: Tool) => {
  const s = t.side === "left" ? 1 : -1;
  const p0 = { x: t.x, y: t.y };
  const p1 = { x: t.x + s * CURVE, y: t.y };
  const p2 = { x: HUB.x - s * CURVE, y: HUB.y };
  const p3 = HUB;

  const xs: number[] = [];
  const ys: number[] = [];
  for (let k = 0; k < SAMPLES; k++) {
    const u = k / (SAMPLES - 1);
    const m = 1 - u;
    xs.push(m * m * m * p0.x + 3 * m * m * u * p1.x + 3 * m * u * u * p2.x + u * u * u * p3.x);
    ys.push(m * m * m * p0.y + 3 * m * m * u * p1.y + 3 * m * u * u * p2.y + u * u * u * p3.y);
  }
  return { xs, ys };
};

// Fade in at the start of the trip and out at the end.
const pulseOpacity = Array.from({ length: SAMPLES }, (_, k) => {
  const u = k / (SAMPLES - 1);
  if (u < 0.1) return u / 0.1;
  if (u > 0.88) return (1 - u) / 0.12;
  return 1;
});

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

const ToolIcon = ({ paths, className }: { paths: string[]; className?: string }) => (
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

const PulseDot = ({
  xs,
  ys,
  color,
  delay,
  active,
}: {
  xs: number[];
  ys: number[];
  color: string;
  delay: number;
  active: boolean;
}) => (
  <motion.circle
    r={4.5}
    fill={color}
    initial={{ cx: xs[0], cy: ys[0], opacity: 0 }}
    animate={active ? { cx: xs, cy: ys, opacity: pulseOpacity } : { opacity: 0 }}
    transition={{ duration: 3.4, delay, repeat: Infinity, repeatDelay: 0.8, ease: "linear" }}
  />
);

const KoraHub = ({ className, label = false }: { className?: string; label?: boolean }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative w-fit"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
    >
      {/* Expanding rings: the hub "broadcasting" to the connected tools */}
      {!reduceMotion &&
        [0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-[28%] bg-linear-to-br from-[#595bf1] to-[#f163ea]"
            animate={{ scale: [1, 1.55], opacity: [0.35, 0] }}
            transition={{ duration: 2.8, delay: i * 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

      <div
        className={cn(
          "relative flex items-center justify-center rounded-[28%]",
          "bg-linear-to-br from-[#595bf1] to-[#f163ea]",
          "shadow-2xl shadow-[#747bff]/40 ring-1 ring-white/30",
          className
        )}
      >
        <img src={whiteLogo} alt="Kora" className="size-1/2 object-contain" />
      </div>

      {label && (
        <p className="absolute left-1/2 top-full mt-3 -translate-x-1/2 text-sm font-semibold text-gray-900">
          Kora
        </p>
      )}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Desktop diagram (lg and up)                                               */
/* -------------------------------------------------------------------------- */

const ToolNode = ({ tool }: { tool: Tool }) => (
  // Outer: placement (no motion transform here). Inner: the entrance.
  <div
    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
    style={{ left: `${(tool.x / W) * 100}%`, top: `${(tool.y / H) * 100}%` }}
  >
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 200, damping: 16, delay: tool.delay }}
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl xl:size-18">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-sm xl:size-12",
            tool.tile
          )}
        >
          <ToolIcon paths={tool.paths} className="size-5 xl:size-6" />
        </span>
      </div>

      {/* Label is absolute so the tile's center stays exactly on the line end */}
      <div className="absolute left-1/2 top-full mt-2.5 -translate-x-1/2 text-center whitespace-nowrap">
        <p className="text-sm font-semibold leading-tight text-gray-900">{tool.label}</p>
        <p className="mt-0.5 text-[11px] leading-tight text-gray-400">{tool.sub}</p>
      </div>
    </motion.div>
  </div>
);

const IntegrationsDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const pulsing = inView && !reduceMotion;

  return (
    // isolate keeps the negative-z glow inside this block
    <div ref={ref} className="relative isolate hidden aspect-1200/460 w-full lg:block">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-2/3 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-[#595bf1]/20 to-[#f163ea]/20 blur-3xl" />

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
        {tools.map((tool, i) => {
          const d = pathFor(tool);
          const forward = samplePoints(tool);
          const back = { xs: [...forward.xs].reverse(), ys: [...forward.ys].reverse() };

          return (
            <g key={tool.label}>
              {/* Base line draws itself in */}
              <motion.path
                d={d}
                fill="none"
                stroke="#595bf1"
                strokeOpacity={0.14}
                strokeWidth={2}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              />

              {/* Flowing dashes on top */}
              <motion.path
                d={d}
                fill="none"
                stroke="#595bf1"
                strokeOpacity={0.55}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="3 11"
                initial={{ opacity: 0, strokeDashoffset: 0 }}
                whileInView={{ opacity: 1 }}
                animate={reduceMotion ? undefined : { strokeDashoffset: -28 }}
                viewport={{ once: true }}
                transition={{
                  opacity: { duration: 0.5, delay: 1.1 + i * 0.1 },
                  strokeDashoffset: { duration: 1.8, repeat: Infinity, ease: "linear" },
                }}
              />

              {/* Data in (tool -> Kora) and data out (Kora -> tool) */}
              <PulseDot {...forward} color="#595bf1" delay={1.2 + i * 0.5} active={pulsing} />
              <PulseDot {...back} color="#f163ea" delay={2.9 + i * 0.5} active={pulsing} />
            </g>
          );
        })}
      </svg>

      {/* Hub */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <KoraHub className="size-28" label />
      </div>

      {tools.map((tool) => (
        <ToolNode key={tool.label} tool={tool} />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Stacked layout (below lg)                                                 */
/* -------------------------------------------------------------------------- */

const IntegrationsStacked = () => (
  <div className="lg:hidden">
    <div className="flex justify-center pb-6">
      <KoraHub className="size-24" label />
    </div>

    <div className="mx-auto mt-6 h-10 w-px border-l-2 border-dashed border-primary/30" />

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {tools.map((tool, i) => (
        <motion.div
          key={tool.label}
          className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
        >
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-sm",
              tool.tile
            )}
          >
            <ToolIcon paths={tool.paths} className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">{tool.label}</p>
            <p className="truncate text-[11px] text-gray-400">{tool.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const SolutionsIntegrationsSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Centered intro */}
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex justify-center">
            <Badge
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                </svg>
              }
            >
              Built around your workflow
            </Badge>
          </div>

          <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            And There’s More to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
              What We Can Build Together.
            </span>
          </h2>

          <p className="mx-auto mt-5 text-lg leading-relaxed text-gray-600">
            Every organization has its own tools, reporting requirements, and ways of working.
            Whether your team relies on Excel, Power BI, or existing internal systems, we can
            explore how Kora could fit into your workflow, connect with the tools you already use,
            and evolve around your operational needs.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/request-demo"
              className={cn(
                "group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white",
                "bg-linear-to-r from-[#595bf1] to-[#f163ea]",
                "shadow-md shadow-[#747bff]/20 transition-all duration-300",
                "hover:scale-[1.03] hover:shadow-lg hover:shadow-[#747bff]/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              )}
            reloadDocument>
              Discuss Your Needs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Full-width illustration */}
      <div className="mx-auto mt-14 w-full max-w-350 px-4 sm:px-6 lg:mt-20 lg:px-8">
        <IntegrationsDiagram />
        <IntegrationsStacked />
      </div>
    </section>
  );
};

export default SolutionsIntegrationsSection;