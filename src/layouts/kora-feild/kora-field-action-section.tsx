import { motion, useReducedMotion } from "framer-motion";
import Badge from "../../widgets/badge";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const COLLECT_IMAGE =
  "https://res.cloudinary.com/doqholno8/image/upload/v1792942626/activities_grhjhe.png";
const SYNC_IMAGE =
  "https://res.cloudinary.com/doqholno8/image/upload/v1792942624/synch_knla2p.png";

const PENCIL = [
  "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125",
  "M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
];
const SYNC = [
  "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
];
const ARROW_DOWN = ["M12 5v14", "m6 13 6 6 6-6"];

interface Step {
  number: string;
  tag: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  icon: string[];
}

const steps: Step[] = [
  {
    number: "01",
    tag: "CAPTURE INFORMATION",
    title: "Collect in the Field",
    body: "Register beneficiaries and record household information directly on the device, even in areas with limited connectivity.",
    image: COLLECT_IMAGE,
    alt: "Kora Field on a phone, showing beneficiary registration and household information being recorded",
    icon: PENCIL,
  },
  {
    number: "02",
    tag: "BRING RECORDS TOGETHER",
    title: "Sync When Connected",
    body: "Synchronize locally saved records with the central platform when an internet connection becomes available.",
    image: SYNC_IMAGE,
    alt: "Kora Field on a phone, showing locally saved records being synchronized with the central platform",
    icon: SYNC,
  },
];

const Glyph = ({ paths, className }: { paths: string[]; className?: string }) => (
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

// Dashes drawn as a repeating gradient so we can march them by moving the
// background (the pattern period is 14px, so a 14px shift loops seamlessly).
const DASHES =
  "linear-gradient(to bottom, rgba(89,91,241,0.5) 0px, rgba(89,91,241,0.5) 6px, transparent 6px, transparent 14px)";

/* -------------------------------------------------------------------------- */
/*  One step                                                                  */
/* -------------------------------------------------------------------------- */

const StepRow = ({ step, index, total }: { step: Step; index: number; total: number }) => {
  const reduceMotion = useReducedMotion();
  const phoneLeft = index % 2 === 0;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className="relative grid grid-cols-1 items-center gap-8 py-10 lg:grid-cols-2 lg:gap-x-28 lg:py-16">
      {/* Center timeline (desktop). Rows touch each other, so each row draws only
          its half of the line and the pieces join into one continuous line. */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden lg:block" aria-hidden="true">
        <div
          className="absolute left-0 w-0.5 -translate-x-1/2"
          style={{ top: isFirst ? "50%" : 0, bottom: isLast ? "50%" : 0 }}
        >
          <motion.div
            className="size-full origin-top overflow-hidden rounded-full"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="size-full"
              style={{ backgroundImage: DASHES, backgroundSize: "100% 14px" }}
              animate={reduceMotion ? undefined : { backgroundPositionY: ["0px", "14px"] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.2 }}
          >
            {!reduceMotion && (
              <motion.span
                className="absolute inset-0 rounded-full bg-linear-to-br from-[#595bf1] to-[#f163ea]"
                animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <div className="relative flex size-14 items-center justify-center rounded-full bg-linear-to-br from-[#595bf1] to-[#f163ea] text-white shadow-xl shadow-[#747bff]/30 ring-8 ring-white">
              <Glyph paths={step.icon} className="size-6" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Phone screenshot */}
      <div
        className={cn(
          "relative isolate flex justify-center",
          phoneLeft ? "order-2 lg:order-1" : "order-2"
        )}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="absolute size-72 rounded-full bg-linear-to-br from-[#595bf1]/20 to-[#f163ea]/20 blur-3xl" />
          <div className="absolute hidden size-[22rem] rounded-full border-2 border-dashed border-primary/10 sm:block" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: phoneLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, delay: index * 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={step.image}
              alt={step.alt}
              loading="lazy"
              decoding="async"
              className="h-auto w-full max-w-64 drop-shadow-2xl sm:max-w-72"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        className={cn(
          "max-w-md",
          phoneLeft
            ? "order-1 lg:order-2 lg:justify-self-start"
            : "order-1 lg:justify-self-end"
        )}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <span className="bg-linear-to-r from-[#595bf1] to-[#f163ea] bg-clip-text text-5xl font-bold leading-none text-transparent">
            {step.number}
          </span>
          <span className="h-px w-8 bg-primary/30" />
          <span className="text-xs font-semibold tracking-wider text-primary">{step.tag}</span>
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-gray-600">{step.body}</p>
      </motion.div>

      {/* Mobile only: arrow pointing to the next step */}
      {!isLast && (
        <div className="order-3 flex justify-center lg:hidden" aria-hidden="true">
          <span className="flex size-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5">
            <Glyph paths={ARROW_DOWN} className="size-5" />
          </span>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const KoraFieldActionSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        {/* Centered intro */}
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
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                </svg>
              }
            >
              Kora Field in action
            </Badge>
          </div>

          <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            From Field Collection to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
              Connected Data.
            </span>
          </h2>

          <p className="mx-auto mt-5 text-lg leading-relaxed text-gray-600">
            See how field teams can capture beneficiary information on the ground and synchronize
            their records when connectivity returns.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-12 lg:mt-16">
          {steps.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KoraFieldActionSection;