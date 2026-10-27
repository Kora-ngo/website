// src/layouts/about/about-mission-section.tsx
import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Badge from "../../widgets/badge";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* -------------------------------------------------------------------------- */
/*  Map data                                                                  */
/*  A simplified outline of the continent. It is turned into a grid of dots   */
/*  once, when this file loads, so there is no map file to download.          */
/* -------------------------------------------------------------------------- */

type LonLat = [number, number];

const AFRICA: LonLat[] = [
  [-5.9, 35.8], [-2.9, 35.3], [-1.0, 35.7], [1.2, 36.5], [3.0, 36.8], [5.1, 36.8], [7.2, 37.0], [8.6, 36.9],
  [10.2, 37.3], [11.1, 37.0], [10.6, 35.8], [10.1, 34.2], [11.1, 33.3], [13.2, 32.9], [15.1, 32.4], [15.9, 31.3],
  [17.5, 30.6], [19.5, 30.3], [20.1, 32.0], [21.5, 32.9], [23.0, 32.6], [24.8, 31.9], [25.2, 31.6], [27.5, 31.3],
  [29.9, 31.2], [31.8, 31.5], [32.3, 31.3], [32.55, 29.95], [33.1, 28.4], [33.8, 27.2], [34.9, 25.1], [35.5, 23.9],
  [36.9, 22.0], [37.2, 19.6], [38.4, 18.0], [39.5, 15.6], [41.0, 14.4], [42.7, 13.0], [43.3, 12.5], [43.1, 11.6],
  [44.0, 10.5], [45.0, 10.4], [47.5, 11.2], [49.2, 11.3], [51.3, 11.8], [51.4, 10.4], [50.8, 9.0], [49.8, 8.0],
  [48.5, 5.3], [46.5, 3.0], [45.3, 2.0], [43.5, 0.5], [42.5, -0.4], [41.0, -2.0], [40.1, -3.2], [39.3, -5.0],
  [39.3, -6.8], [39.6, -8.5], [40.2, -10.3], [40.5, -12.9], [40.7, -14.5], [39.5, -16.2], [37.0, -17.9],
  [35.0, -19.8], [35.3, -22.0], [35.4, -23.9], [33.0, -25.3], [32.6, -26.0], [32.9, -28.0], [31.0, -29.9],
  [29.5, -31.5], [27.9, -33.0], [25.6, -34.0], [22.5, -34.0], [20.0, -34.8], [18.5, -34.3], [18.4, -33.0],
  [17.9, -31.0], [16.5, -28.7], [15.2, -26.6], [14.5, -22.9], [13.5, -20.5], [11.8, -17.2], [12.1, -15.2],
  [13.4, -12.6], [13.2, -8.8], [12.2, -6.1], [11.8, -4.8], [9.0, -1.5], [9.4, 0.4], [9.8, 1.9], [9.7, 4.0],
  [8.3, 4.9], [6.0, 4.3], [4.5, 6.0], [3.4, 6.4], [1.0, 6.0], [-0.2, 5.5], [-2.5, 4.8], [-4.0, 5.3], [-7.5, 4.4],
  [-10.8, 6.3], [-13.2, 8.5], [-13.7, 9.5], [-15.6, 11.8], [-16.8, 13.5], [-17.5, 14.7], [-16.5, 16.0],
  [-16.2, 18.1], [-16.9, 20.8], [-16.3, 23.7], [-14.5, 26.0], [-13.2, 27.1], [-12.9, 27.9], [-10.0, 29.5],
  [-9.6, 30.4], [-9.8, 31.5], [-8.5, 33.2], [-6.8, 34.0],
];

const MADAGASCAR: LonLat[] = [
  [49.3, -12.0], [50.4, -15.2], [49.6, -17.0], [49.4, -18.2], [48.5, -20.5], [47.8, -22.8], [47.1, -24.9],
  [45.2, -25.6], [43.7, -23.4], [43.3, -21.7], [44.3, -20.3], [44.0, -18.0], [46.3, -15.7], [47.8, -14.0],
  [48.4, -13.2],
];

const LON_MIN = -20;
const LON_MAX = 53;
const LAT_MIN = -35.5;
const LAT_MAX = 40;
const SCALE = 8; // map units per degree
const W = (LON_MAX - LON_MIN) * SCALE;
const H = (LAT_MAX - LAT_MIN) * SCALE;

const SPACING = 1.2; // degrees between dots
const DOT_SIZE = 3.3;

const project = (lon: number, lat: number) => ({
  x: (lon - LON_MIN) * SCALE,
  y: (LAT_MAX - lat) * SCALE,
});

const insidePolygon = (poly: LonLat[], x: number, y: number) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

// Dots on a staggered grid, split into three groups so each group can twinkle on its own.
const buildDotPaths = () => {
  const groups = ["", "", ""];
  let n = 0;
  let row = 0;
  for (let lat = LAT_MAX - 0.6; lat > LAT_MIN; lat -= SPACING * 0.866, row++) {
    const offset = row % 2 ? SPACING / 2 : 0;
    for (let lon = LON_MIN + offset; lon < LON_MAX; lon += SPACING) {
      if (insidePolygon(AFRICA, lon, lat) || insidePolygon(MADAGASCAR, lon, lat)) {
        const { x, y } = project(lon, lat);
        groups[n % 3] += `M${x.toFixed(1)} ${y.toFixed(1)}h.01`;
        n++;
      }
    }
  }
  return groups;
};

const DOT_PATHS = buildDotPaths();

/* -------------------------------------------------------------------------- */
/*  Locations and the network between them                                    */
/*  Illustrative only: it shows the idea of connected field operations.       */
/* -------------------------------------------------------------------------- */

const CITIES = [
  { id: "dakar", lon: -17.4, lat: 14.7 },
  { id: "bamako", lon: -8.0, lat: 12.6 },
  { id: "niamey", lon: 2.1, lat: 13.5 },
  { id: "accra", lon: -0.2, lat: 5.6 },
  { id: "lagos", lon: 3.4, lat: 6.5 },
  { id: "yaounde", lon: 11.5, lat: 3.9 },
  { id: "ndjamena", lon: 15.0, lat: 12.1 },
  { id: "algiers", lon: 3.1, lat: 36.8 },
  { id: "cairo", lon: 31.2, lat: 30.0 },
  { id: "khartoum", lon: 32.5, lat: 15.6 },
  { id: "addis", lon: 38.7, lat: 9.0 },
  { id: "nairobi", lon: 36.8, lat: -1.3 },
  { id: "kinshasa", lon: 15.3, lat: -4.3 },
  { id: "lusaka", lon: 28.3, lat: -15.4 },
  { id: "johannesburg", lon: 28.0, lat: -26.2 },
  { id: "antananarivo", lon: 47.5, lat: -18.9 },
];

const HUB_ID = "yaounde"; // central position: the reveal and the pins spread out from here

const EDGE_PAIRS: [string, string][] = [
  ["dakar", "bamako"],
  ["bamako", "niamey"],
  ["bamako", "accra"],
  ["accra", "lagos"],
  ["lagos", "niamey"],
  ["lagos", "yaounde"],
  ["niamey", "ndjamena"],
  ["ndjamena", "yaounde"],
  ["ndjamena", "khartoum"],
  ["yaounde", "kinshasa"],
  ["khartoum", "cairo"],
  ["khartoum", "addis"],
  ["addis", "nairobi"],
  ["nairobi", "lusaka"],
  ["kinshasa", "lusaka"],
  ["lusaka", "johannesburg"],
  ["lusaka", "antananarivo"],
  ["algiers", "niamey"],
  ["algiers", "cairo"],
];

interface MapNode {
  id: string;
  x: number;
  y: number;
}

const nodes: MapNode[] = CITIES.map((c) => ({ id: c.id, ...project(c.lon, c.lat) }));
const nodeById = new Map(nodes.map((n) => [n.id, n]));

const getNode = (id: string) => {
  const node = nodeById.get(id);
  if (!node) throw new Error(`Unknown map node: ${id}`);
  return node;
};

const hub = getNode(HUB_ID);
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

const SAMPLES = 24;

// Curved line between two nodes, bowed toward the north like a flight arc,
// plus points along it so a dot can travel exactly on the curve.
const buildEdge = (aId: string, bId: string) => {
  const a = getNode(aId);
  const b = getNode(bId);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const k = len * 0.18;
  const c1 = { x: mx - (dy / len) * k, y: my + (dx / len) * k };
  const c2 = { x: mx + (dy / len) * k, y: my - (dx / len) * k };
  const c = c1.y <= c2.y ? c1 : c2;

  const xs: number[] = [];
  const ys: number[] = [];
  for (let s = 0; s < SAMPLES; s++) {
    const t = s / (SAMPLES - 1);
    const u = 1 - t;
    xs.push(+(u * u * a.x + 2 * u * t * c.x + t * t * b.x).toFixed(1));
    ys.push(+(u * u * a.y + 2 * u * t * c.y + t * t * b.y).toFixed(1));
  }

  return {
    id: `${aId}-${bId}`,
    d: `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${c.x.toFixed(1)} ${c.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`,
    xs,
    ys,
    fromHub: dist({ x: mx, y: my }, hub),
  };
};

// Edges grow outward from the hub, nearest first.
const edges = EDGE_PAIRS.map(([a, b]) => buildEdge(a, b)).sort((p, q) => p.fromHub - q.fromHub);

// Pins land in the same outward order.
const pinRank = new Map(
  [...nodes].sort((p, q) => dist(p, hub) - dist(q, hub)).map((n, i) => [n.id, i])
);

// A travelling dot fades in at the start of its trip and out at the end.
const pulseOpacity = Array.from({ length: SAMPLES }, (_, s) => {
  const t = s / (SAMPLES - 1);
  if (t < 0.1) return t / 0.1;
  if (t > 0.88) return (1 - t) / 0.12;
  return 1;
});

/* ------------------------------ Animation timing --------------------------- */

const REVEAL_RADIUS = 470;
const REVEAL_DURATION = 2.4;
const PIN_START = 0.9;
const PIN_STEP = 0.12;
const PIN_LAND = 0.6;
const EDGE_START = PIN_START + (nodes.length - 1) * PIN_STEP + PIN_LAND;
const EDGE_STEP = 0.08;
const EDGE_DRAW = 0.8;
const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const still = { duration: 0.3 };

const PIN_PATH = "M0 0C-2.5 -5 -8 -9.5 -8 -14.5A8 8 0 0 1 8 -14.5C8 -9.5 2.5 -5 0 0Z";

const shimmer = [
  { duration: 5.5, delay: 0, low: 0.35, high: 0.9 },
  { duration: 7, delay: 1.6, low: 0.3, high: 0.8 },
  { duration: 6.2, delay: 3.1, low: 0.4, high: 0.95 },
];

/* -------------------------------------------------------------------------- */
/*  Map                                                                       */
/* -------------------------------------------------------------------------- */

const AfricaMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const seen = useInView(ref, { once: true, amount: 0.25 });
  const onScreen = useInView(ref);

  // Everything builds once, the first time the map is on screen.
  const play = seen || reduceMotion;
  // Loops only run while the map is visible, and never for reduced motion.
  const loops = seen && onScreen && !reduceMotion;

  const uid = useId().replace(/:/g, "");
  const maskId = `mask-${uid}`;
  const fadeId = `fade-${uid}`;
  const pinId = `pin-${uid}`;
  const glowId = `glow-${uid}`;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustrative map of Africa with field locations connected into one network"
      className="relative mx-auto w-full max-w-xl lg:max-w-150"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="size-3/4 rounded-full bg-linear-to-br from-[#595bf1]/20 to-[#f163ea]/15 blur-3xl" />
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden="true">
        <defs>
          {/* Soft-edged circle that grows out of the hub and uncovers the dots */}
          <radialGradient id={fadeId}>
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.78" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" x={-40} y={-40} width={W + 80} height={H + 80}>
            <motion.circle
              cx={hub.x}
              cy={hub.y}
              fill={`url(#${fadeId})`}
              initial={reduceMotion ? false : { r: 0 }}
              animate={{ r: play ? REVEAL_RADIUS : 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: REVEAL_DURATION, ease: revealEase }}
            />
          </mask>

          <linearGradient id={pinId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7b7dff" />
            <stop offset="1" stopColor="#f163ea" />
          </linearGradient>
          <radialGradient id={glowId}>
            <stop offset="0" stopColor="#595bf1" stopOpacity="0.35" />
            <stop offset="1" stopColor="#595bf1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* The dots, uncovered from the hub outward */}
        <g mask={`url(#${maskId})`}>
          <circle cx={hub.x} cy={hub.y} r={170} fill={`url(#${glowId})`} />

          {DOT_PATHS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#8d92ff"
              strokeWidth={DOT_SIZE}
              strokeLinecap="round"
              initial={{ opacity: 0.55 }}
              animate={
                loops
                  ? { opacity: [shimmer[i].low, shimmer[i].high, shimmer[i].low] }
                  : { opacity: 0.6 }
              }
              transition={
                loops
                  ? { duration: shimmer[i].duration, delay: shimmer[i].delay, repeat: Infinity, ease: "easeInOut" }
                  : still
              }
            />
          ))}
        </g>

        {/* A ring that leaves the hub together with the reveal */}
        {!reduceMotion && (
          <motion.circle
            cx={hub.x}
            cy={hub.y}
            fill="none"
            stroke="#9a9cff"
            strokeWidth={1.5}
            initial={{ r: 0, opacity: 0 }}
            animate={play ? { r: REVEAL_RADIUS * 0.9, opacity: [0.7, 0] } : { r: 0, opacity: 0 }}
            transition={{ duration: REVEAL_DURATION, ease: revealEase }}
          />
        )}

        {/* The network: a faint line draws in, then dashes flow along it and a dot travels it */}
        {edges.map((edge, i) => {
          const drawDelay = EDGE_START + i * EDGE_STEP;
          const settledAt = drawDelay + EDGE_DRAW;
          const reversed = i % 2 === 1;
          const xs = reversed ? [...edge.xs].reverse() : edge.xs;
          const ys = reversed ? [...edge.ys].reverse() : edge.ys;

          return (
            <g key={edge.id}>
              <motion.path
                d={edge.d}
                fill="none"
                stroke="#8d92ff"
                strokeOpacity={0.3}
                strokeWidth={1.2}
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: play ? 1 : 0 }}
                transition={
                  reduceMotion ? { duration: 0 } : { duration: EDGE_DRAW, delay: drawDelay, ease: "easeInOut" }
                }
              />

              <motion.path
                d={edge.d}
                fill="none"
                stroke="#b5b8ff"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeDasharray="2 8"
                initial={{ opacity: 0, strokeDashoffset: 0 }}
                animate={
                  loops
                    ? { opacity: 0.85, strokeDashoffset: -20 }
                    : { opacity: play && reduceMotion ? 0.6 : 0, strokeDashoffset: 0 }
                }
                transition={
                  loops
                    ? {
                        opacity: { duration: 0.6, delay: settledAt },
                        strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: "linear" },
                      }
                    : still
                }
              />

              {!reduceMotion && (
                <motion.circle
                  r={2.4}
                  fill="#fff"
                  stroke="#9a9cff"
                  strokeOpacity={0.4}
                  strokeWidth={5}
                  initial={{ cx: xs[0], cy: ys[0], opacity: 0 }}
                  animate={loops ? { cx: xs, cy: ys, opacity: pulseOpacity } : { opacity: 0 }}
                  transition={
                    loops
                      ? {
                          duration: 2.6,
                          delay: settledAt + 0.3,
                          repeat: Infinity,
                          repeatDelay: 1.2 + (i % 4) * 0.5,
                          ease: "linear",
                        }
                      : still
                  }
                />
              )}
            </g>
          );
        })}

        {/* Location pins: drop in from the hub outward, each with pulsing rings */}
        {nodes.map((node) => {
          const isHub = node.id === HUB_ID;
          const delay = PIN_START + (pinRank.get(node.id) ?? 0) * PIN_STEP;

          return (
            <g
              key={node.id}
              transform={`translate(${node.x.toFixed(1)} ${node.y.toFixed(1)})${isHub ? " scale(1.3)" : ""}`}
            >
              {!reduceMotion &&
                [0, 1].map((r) => (
                  <motion.circle
                    key={r}
                    fill="none"
                    stroke={isHub ? "#f163ea" : "#9a9cff"}
                    strokeWidth={1.4}
                    initial={{ r: 2, opacity: 0 }}
                    animate={
                      loops
                        ? { r: [2, isHub ? 30 : 20], opacity: [0.8, 0] }
                        : { r: 2, opacity: 0 }
                    }
                    transition={
                      loops
                        ? { duration: 2.8, delay: delay + PIN_LAND + r * 1.4, repeat: Infinity, ease: "easeOut" }
                        : still
                    }
                  />
                ))}

              {/* The exact location the pin points at */}
              <circle r={2.6} fill="#fff" fillOpacity={0.95} />

              <motion.g
                initial={reduceMotion ? false : { y: -26, opacity: 0 }}
                animate={play ? { y: 0, opacity: 1 } : { y: -26, opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 240, damping: 13, delay }
                }
              >
                <path d={PIN_PATH} fill={`url(#${pinId})`} />
                <circle cx={0} cy={-14.5} r={3.3} fill="#fff" />
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const AboutMissionSection = () => {
  return (
    // isolate keeps the negative-z decoration inside this section
    <section className="relative isolate overflow-hidden bg-gray-950 py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 size-105 rounded-full bg-[#595bf1]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 -z-10 size-115 rounded-full bg-[#f163ea]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Map (below the text on mobile) */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <AfricaMap />
          </div>

          {/* Text */}
          <motion.div
            className="order-1 space-y-6 lg:order-2 lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge
              variant="primary"
              glass
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
                </svg>
              }
            >
              Our mission
            </Badge>

            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              Building Technology for{" "}
              <span className="bg-linear-to-r from-[#7b7dff] to-[#f163ea] bg-clip-text text-transparent">
                Africa’s Humanitarian Future.
              </span>
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-gray-400">
              We believe African humanitarian and development organizations deserve practical,
              reliable digital tools built around the realities of the communities they serve. Kora
              aims to help these organizations coordinate field operations, manage beneficiary
              information, and deliver assistance with greater confidence—even in challenging
              environments.
            </p>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionSection;