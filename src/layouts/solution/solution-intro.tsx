// src/layouts/solutions/solutions-intro-section.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Badge from "../../widgets/badge";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const SOLUTIONS_IMAGE =
  "https://res.cloudinary.com/doqholno8/image/upload/v1792856618/sloution_section_1_r4kvwj.png";

/* ------------------------------ Floating cards ----------------------------- */

interface FloatingCard {
  key: string;
  label: string;
  tag: string;
  headline: string;
  body: string;
  badge?: string;
  tile: string; // gradient for the icon tile
  iconPath: string;
  position: string; // desktop placement around the image (lg+ only)
  from: { x: number; y: number }; // entrance offset
  delay: number;
  floatDuration: number;
}

const floatingCards: FloatingCard[] = [
  {
    key: "people",
    label: "People Reached",
    tag: "BENEFICIARY MANAGEMENT",
    headline: "Every beneficiary matters.",
    body: "Keep beneficiary information organized.",
    tile: "from-purple-500 to-purple-600",
    iconPath:
      "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
    position: "lg:top-0 lg:-left-4 xl:-left-14",
    from: { x: -40, y: 20 },
    delay: 0.3,
    floatDuration: 5.5,
  },
  {
    key: "offline",
    label: "Fieldwork Without Limits",
    tag: "OFFLINE FIELD OPERATIONS",
    badge: "Offline ready",
    headline: "Keep moving, even offline.",
    body: "Your team can continue collecting field data when connectivity is unavailable.",
    tile: "from-yellow-500 to-yellow-600",
    iconPath:
      "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
    position: "lg:top-[70%] lg:-right-4 xl:-right-24",
    from: { x: 40, y: 20 },
    delay: 0.5,
    floatDuration: 6.5,
  },
  {
    key: "assistance",
    label: "Accountable Assistance",
    tag: "DELIVERY TRACKING",
    headline: "Know where things stand.",
    body: "Track assistance records and follow project progress.",
    tile: "from-teal-500 to-teal-600",
    iconPath:
      "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
    position: "lg:bottom-4 lg:-left-2 xl:-left-10",
    from: { x: 0, y: 40 },
    delay: 0.7,
    floatDuration: 6,
  },
];

const FloatingInfoCard = ({ card }: { card: FloatingCard; index: number }) => {
  const reduceMotion = useReducedMotion();

  return (
    // Outer element: placement + entrance. Inner element: the continuous bob.
    // They are separate so the two animations never fight over the same transform.
    <motion.div
      className={cn(
        "z-10 mx-auto w-full max-w-sm",
        "lg:absolute lg:mx-0 lg:w-64",
        card.position
      )}
      initial={{ opacity: 0, x: card.from.x, y: card.from.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: card.delay, ease: "easeOut" }}
    >
      <motion.div
        className="relative rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        // transition={{
        //   duration: card.floatDuration,
        //   delay: index * 0.8,
        //   repeat: Infinity,
        //   ease: "easeInOut",
        // }}
      >
        {/* Status chip sits on the card edge so it doesn't eat into the text width */}
        {card.badge && (
          <span className="absolute -top-3 right-4 inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-semibold text-primary shadow-sm ring-1 ring-white">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            {card.badge}
          </span>
        )}

        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-sm",
              card.tile
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={card.iconPath} />
            </svg>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold leading-tight tracking-wider text-primary">
              {card.tag}
            </p>
            <h3 className="mt-0.5 text-sm font-bold leading-tight text-gray-900">{card.label}</h3>
          </div>
        </div>

        <p className="mt-3 text-[13px] font-semibold text-gray-900">{card.headline}</p>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">{card.body}</p>
      </motion.div>
    </motion.div>
  );
};

/* --------------------------------- Section -------------------------------- */

const SolutionsIntroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Soft brand-colored wash behind the whole hero */}
      <div className="pointer-events-none absolute -top-32 -right-32 size-130 rounded-full bg-linear-to-br from-[#595bf1]/10 to-[#f163ea]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 size-105 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            className="space-y-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
              }
            >
              Our solutions
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900">
              Supporting aid teams{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
                where it matters most.
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              Kora helps NGOs and humanitarian organizations manage beneficiaries,
              coordinate field activities, and track assistance delivery with greater
              clarity and accountability, even in remote communities where internet
              access is limited.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/request-demo"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white",
                  "bg-linear-to-r from-[#595bf1] to-[#f163ea]",
                  "shadow-md shadow-[#747bff]/20 transition-all duration-300",
                  "hover:shadow-lg hover:shadow-[#747bff]/40 hover:scale-[1.03]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                )}
              reloadDocument>
                Request a Demo
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4 transition-transform duration-300 group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
{/* 
              <Link
                to="/platform"
                className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-primary/40 hover:text-primary"
              >
                Explore the Platform
              </Link> */}
            </div>
          </motion.div>

          {/* Right: image + floating cards */}
          <div className="relative mx-auto w-full max-w-xl lg:mr-0 lg:ml-auto">
            <motion.img
              src={SOLUTIONS_IMAGE}
              alt="Kora supporting aid teams in the field"
              className="relative z-0 h-auto w-full object-contain rounded-2xl"
              fetchPriority="high"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />

            {/* Below lg: cards stack under the image. From lg up: `contents` lets
                each card position itself absolutely around the image. */}
            <div className="mt-8 flex flex-col gap-4 lg:mt-0 lg:contents">
              {floatingCards.map((card, i) => (
                <FloatingInfoCard key={card.key} card={card} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsIntroSection;