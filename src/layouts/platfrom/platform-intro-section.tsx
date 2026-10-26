// src/layouts/platform/platform-intro-section.tsx
import { AnimatePresence, motion } from "framer-motion";
import Badge from "../../widgets/badge";
import { useEffect, useState } from "react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// Three connected nodes, arranged around the center hub.
// Positions are in % relative to the diagram container (top-left origin).
const nodes = [
  {
    label: "Kora Admin",
    sub: "Web",
    top: "6%",
    left: "50%",
    color: "from-blue-500 to-blue-600",
    delay: 0.3,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path fillRule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v9.75c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75H4.5a.75.75 0 0 0-.75.75Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "Kora Collaborator",
    sub: "Web",
    top: "68%",
    left: "14%",
    color: "from-purple-500 to-purple-600",
    delay: 0.45,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "Kora Field",
    sub: "Mobile",
    top: "68%",
    left: "86%",
    color: "from-yellow-500 to-yellow-600",
    delay: 0.6,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path fillRule="evenodd" d="M10.5 1.875a1.125 1.125 0 0 0-1.125 1.125v.375H7.5A2.25 2.25 0 0 0 5.25 5.625v14.25a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25V5.625a2.25 2.25 0 0 0-2.25-2.25h-1.875V3a1.125 1.125 0 0 0-1.125-1.125h-3ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" clipRule="evenodd" />
      </svg>
    ),
  },
];



const floatLoop = (delay = 0) => ({
  animate: { y: [0, -6, 0] },
  transition: {
    duration: 5.5,
    delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

const PlatformDashboardPreview = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate illustration loading
    const timer = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-[5/4] flex items-center justify-center">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[70%] w-[70%] rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* ── MAIN DASHBOARD WINDOW ── */}
      <motion.div
        className="relative w-[92%] rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        // transition={{ duration: 0.7, ease: "easeOut" }}
        {...floatLoop(0)}
      >
        {/* Window chrome (always visible) */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-gray-300" />
            <span className="size-2.5 rounded-full bg-gray-300" />
            <span className="size-2.5 rounded-full bg-gray-300" />
          </div>
          <div className="hidden sm:flex items-center gap-5 text-[11px] font-medium text-gray-500">
            <span className="text-primary">Overview</span>
            <span>Projects</span>
            <span>Beneficiaries</span>
            <span>Assistance</span>
            <span>Reports</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-gray-200" />
            <div className="size-6 rounded-full bg-primary/20" />
          </div>
        </div>

        {/* Content area with loading → real content */}
        <div className="p-4 relative min-h-[220px]">
          <AnimatePresence mode="wait">
            {!loaded ? (
              /* ── Loading skeleton ── */
              <motion.div
                key="skeleton"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                {/* KPI skeletons */}
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-xl bg-gray-50 p-3 space-y-2">
                      <div className="h-2.5 w-16 rounded bg-gray-200 animate-pulse" />
                      <div className="h-5 w-12 rounded bg-gray-200 animate-pulse" />
                      <div className="h-2 w-14 rounded bg-gray-100 animate-pulse" />
                    </div>
                  ))}
                </div>

                {/* Chart + list skeletons */}
                <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-3 rounded-xl border border-gray-100 p-3 space-y-3">
                    <div className="h-3 w-32 rounded bg-gray-200 animate-pulse" />
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 60, 45, 70, 55, 80, 65, 75, 50, 70].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gray-100 animate-pulse"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2 rounded-xl border border-gray-100 p-3 space-y-3">
                    <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-2.5 w-16 rounded bg-gray-100 animate-pulse" />
                        <div className="h-2.5 w-12 rounded bg-gray-100 animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── Real content ── */
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-4"
              >
                {/* KPI row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-[10px] text-gray-400 font-medium">Beneficiaries</p>
                    <p className="text-lg font-bold text-gray-900 mt-0.5">4,382</p>
                    <p className="text-[10px] text-green-600 font-medium mt-1">↑ 12% this month</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-[10px] text-gray-400 font-medium">Assistance Delivered</p>
                    <p className="text-lg font-bold text-gray-900 mt-0.5">$128k</p>
                    <p className="text-[10px] text-green-600 font-medium mt-1">↑ 8% vs target</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-[10px] text-gray-400 font-medium">Active Projects</p>
                    <p className="text-lg font-bold text-gray-900 mt-0.5">7</p>
                    <p className="text-[10px] text-primary font-medium mt-1">Nord Region</p>
                  </div>
                </div>

                {/* Chart + Validation */}
                <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-3 rounded-xl border border-gray-100 p-3">
                    <p className="text-xs font-semibold text-gray-900 mb-2">Project Coverage · Q3</p>
                    <div className="flex items-end gap-1.5 h-20">
                      {[35, 55, 45, 70, 60, 85, 75, 90, 65, 80].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t bg-linear-to-t from-primary/40 to-primary"
                          style={{ height: `${h}%` }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2 rounded-xl border border-gray-100 p-3 space-y-2">
                    <p className="text-xs font-semibold text-gray-900">Validation Queue</p>
                    {[
                      { name: "Amina T.", status: "Pending", color: "bg-yellow-100 text-yellow-700" },
                      { name: "Jean B.", status: "Approved", color: "bg-green-100 text-green-700" },
                      { name: "Fatou K.", status: "Review", color: "bg-blue-100 text-blue-700" },
                    ].map((row) => (
                      <div key={row.name} className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-700">{row.name}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-medium ${row.color}`}>
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating cards only appear after main dashboard is loaded */}
      <AnimatePresence>
        {loaded && (
          <>
            {/* Field Sync */}
            <motion.div
              className="absolute -top-1 right-3 sm:right-6 w-44 rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-3 z-30"
              initial={{ opacity: 0, y: 12 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: 0.15 }}
              {...floatLoop(0.35)}
            >
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-yellow-600">
                    <path fillRule="evenodd" d="M10.5 1.875a1.125 1.125 0 0 0-1.125 1.125v.375H7.5A2.25 2.25 0 0 0 5.25 5.625v14.25a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25V5.625a2.25 2.25 0 0 0-2.25-2.25h-1.875V3a1.125 1.125 0 0 0-1.125-1.125h-3ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-900">Field Sync</p>
                  <p className="text-[10px] text-gray-500">14 records pending</p>
                  <p className="text-[9px] text-primary font-medium mt-0.5">Last sync · 2 min ago</p>
                </div>
              </div>
            </motion.div>

            {/* Offline Mode */}
            <motion.div
              className="absolute bottom-5 left-2 sm:left-4 w-40 rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-3 z-30"
              initial={{ opacity: 0, y: 12 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: 0.25 }}
              {...floatLoop(0.7)}
            >
              <p className="text-[10px] font-medium text-gray-400">Offline Mode</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-semibold text-gray-900">Ready</p>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">Works without internet</p>
            </motion.div>

            {/* User badge */}
            <motion.div
              className="absolute top-6 left-1 sm:left-3 size-11 rounded-full bg-white shadow-lg ring-2 ring-white overflow-hidden z-30"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <div className="size-full bg-linear-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                KT
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const PlatformIntroSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
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
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                </svg>
              }
            >
              THE KORA PLATFORM
            </Badge>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900">
              One Platform for <span className="text-primary">Connected Field Operations</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Kora connects project management, field data collection, beneficiary validation,
              assistance tracking, analytics, and reporting through dedicated tools for every
              layer of an organization.
            </p>
          </motion.div>

          {/* Right: Admin + Collaborator + Field diagram */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <PlatformDashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlatformIntroSection;