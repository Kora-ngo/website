import { motion } from "framer-motion";
import Badge from "../../widgets/badge";
import KoraAdminDashboardMockup from "./kora-admin-dashboard-mockup";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// Callouts positioned as % of the outer canvas. `target` approximates where
// that capability lives inside the dashboard mockup below — nudge these if
// the mockup's internal layout shifts.
const callouts = [
  {
    label: "Project Management",
    chip: { top: "6%", left: "-2%" },
    target: { top: "16%", left: "22%" },
    delay: 0.3,
  },
  {
    label: "Beneficiary Management",
    chip: { top: "6%", left: "78%" },
    target: { top: "30%", left: "45%" },
    delay: 0.4,
  },
  {
    label: "Team & Access Management",
    chip: { top: "42%", left: "-4%" },
    target: { top: "42%", left: "20%" },
    delay: 0.5,
  },
  {
    label: "Analytics & Monitoring",
    chip: { top: "42%", left: "82%" },
    target: { top: "55%", left: "60%" },
    delay: 0.6,
  },
  {
    label: "Reporting & Audit",
    chip: { top: "88%", left: "78%" },
    target: { top: "80%", left: "55%" },
    delay: 0.7,
  },
];

const capabilityChips = [
  "Projects",
  "Beneficiaries",
  "Analytics",
  "Teams",
  "Reporting",
  "Audit",
];

const PlatformAdminSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-8 sm:px-6 lg:px-8">
        {/* Text intro */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Badge
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v9.75c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75H4.5a.75.75 0 0 0-.75.75Z" clipRule="evenodd" />
              </svg>
            }
          >
            KORA ADMIN
          </Badge>

          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900">
            Manage Programs From <span className="text-primary">One Central Workspace</span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Plan projects, manage teams, monitor field activities, analyze progress, and generate reports from one place.
          </p>
        </motion.div>

        {/* Dashboard mockup + floating callouts (desktop) */}
        <div className="relative hidden lg:block px-16 py-10">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {callouts.map((c, i) => (
              <motion.line
                key={i}
                x1={c.chip.left}
                y1={c.chip.top}
                x2={c.target.left}
                y2={c.target.top}
                stroke="#747bff"
                strokeOpacity={0.4}
                strokeWidth={0.3}
                strokeDasharray="1.5 1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: c.delay, ease: "easeOut" }}
              />
            ))}
          </svg>

          {callouts.map((c) => (
            <motion.div
              key={c.label}
              className="absolute z-10 px-3 py-1.5 rounded-full bg-white shadow-md ring-1 ring-black/5 text-xs font-medium text-gray-700 whitespace-nowrap"
              style={{ top: c.chip.top, left: c.chip.left }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: c.delay + 0.15 }}
            >
              {c.label}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <KoraAdminDashboardMockup />
          </motion.div>
        </div>

        {/* Dashboard mockup only, no callouts (mobile/tablet) */}
        <motion.div
          className="lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <KoraAdminDashboardMockup />
        </motion.div>

        {/* Capability chip footer — reinforces the same 5 capabilities on every screen size */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {capabilityChips.map((chip) => (
            <span
              key={chip}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformAdminSection;