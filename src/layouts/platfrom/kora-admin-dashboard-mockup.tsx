// src/layouts/platform/kora-admin-dashboard-mockup.tsx
import { motion } from "framer-motion";

// Illustrative-only mockup of the Kora Admin dashboard. Not wired to real
// data or real app logic — built to *look* like the product for the
// marketing site, with room to swap in real screenshots later if desired.

const NavItem = ({ label, letter, active = false }: { label: string; letter: string; active?: boolean }) => (
  <div
    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium transition-colors ${
      active ? "bg-primary/10 text-primary" : "text-gray-500"
    }`}
  >
    <span
      className={`flex items-center justify-center size-5 rounded-md text-[10px] font-bold shrink-0 ${
        active ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
      }`}
    >
      {letter}
    </span>
    <span className="hidden sm:inline">{label}</span>
  </div>
);

const StatusPill = ({ status }: { status: "Approved" | "Pending" | "Flagged" }) => {
  const styles = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Flagged: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

const KoraAdminDashboardMockup = () => {
  return (
    <div className="w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
      {/* Browser chrome */}
      <div className="h-8 flex items-center gap-2 px-4 bg-gray-50 border-b border-gray-100 shrink-0">
        <span className="size-2 rounded-full bg-gray-300" />
        <span className="size-2 rounded-full bg-gray-300" />
        <span className="size-2 rounded-full bg-gray-300" />
        <span className="ml-3 text-[10px] text-gray-400">app.kora.onl/admin</span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-14 sm:w-40 shrink-0 border-r border-gray-100 p-2.5 sm:p-3 space-y-1 bg-gray-50/50">
          <NavItem label="Dashboard" letter="D" active />
          <NavItem label="Projects" letter="P" />
          <NavItem label="Beneficiaries" letter="B" />
          <NavItem label="Teams" letter="T" />
          <NavItem label="Analytics" letter="A" />
          <NavItem label="Reports" letter="R" />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-5 space-y-4 min-w-0">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "Active Projects", value: "24" },
              { label: "Beneficiaries", value: "4,382" },
              { label: "Assistance Delivered", value: "91%" },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                className="rounded-xl bg-gray-50 p-2.5 sm:p-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                <p className="text-[9px] sm:text-[10px] text-gray-400 leading-tight">{kpi.label}</p>
                <p className="text-sm sm:text-lg font-bold text-gray-900 mt-0.5">{kpi.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart panel */}
          <div className="rounded-xl bg-gray-50 p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-3">
              Project Performance Overview
            </p>
            <div className="flex items-end gap-1.5 sm:gap-2 h-20 sm:h-24">
              {[35, 55, 45, 70, 60, 85, 50, 75, 65, 90].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm bg-linear-to-t from-primary/50 to-primary"
                  style={{ height: `${h}%` }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.05, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>

          {/* Activity table */}
          <div className="rounded-xl bg-gray-50 p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-2.5">
              Recent Activity
            </p>
            <div className="space-y-2">
              {[
                { name: "Amina T.", region: "Nord Region", status: "Approved" as const },
                { name: "Jean B.", region: "Littoral Region", status: "Pending" as const },
                { name: "Grace M.", region: "West Region", status: "Approved" as const },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between text-[10px] sm:text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="size-5 rounded-full bg-gray-200 shrink-0" />
                    <span className="text-gray-700 truncate">{row.name}</span>
                    <span className="hidden sm:inline text-gray-400 truncate">{row.region}</span>
                  </div>
                  <StatusPill status={row.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoraAdminDashboardMockup;