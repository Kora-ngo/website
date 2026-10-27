// src/layouts/about/about-problem-section.tsx
import { motion, useReducedMotion } from "framer-motion";
import Badge from "../../widgets/badge";
import { cn } from "../../utils/cn";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* -------------------------------------------------------------------------- */
/*  Gallery content: edit the order, captions and object-position here        */
/* -------------------------------------------------------------------------- */

const gallery = [
  {
    src: "https://res.cloudinary.com/doqholno8/image/upload/v1792997836/about-img-2_dptsgn.jpg",
    number: "01",
    caption: "Unreliable connectivity",
    position: "object-center",
  },
  {
    src: "https://res.cloudinary.com/doqholno8/image/upload/v1792997835/about-img-3_h9ixvw.jpg",
    number: "02",
    caption: "Information collected across multiple locations",
    position: "object-center",
  },
  {
    src: "https://res.cloudinary.com/doqholno8/image/upload/v1792997835/about-img_wqy1xc.jpg",
    number: "03",
    caption: "Records that are hard to keep consistent",
    position: "object-center",
  },
];

type GalleryItem = (typeof gallery)[number];

/* -------------------------------------------------------------------------- */
/*  One photo                                                                 */
/* -------------------------------------------------------------------------- */

const GalleryImage = ({
  item,
  className,
  delay,
}: {
  item: GalleryItem;
  className?: string;
  delay: number;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-gray-200 shadow-xl ring-1 ring-black/5",
        className
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {/* Hover zoom lives on this wrapper, so it never fights the reveal on the image */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <motion.img
          src={item.src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cn("size-full object-cover", item.position)}
          initial={reduceMotion ? false : { scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Darkens the bottom so the caption is always readable */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-gray-950/80 via-gray-950/15 to-transparent" />

      {/* <figcaption className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 sm:p-5">
        <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white ring-1 ring-white/25 backdrop-blur-sm">
          {item.number}
        </span>
        <span className="text-xs font-semibold leading-snug text-white sm:text-sm">
          {item.caption}
        </span>
      </figcaption> */}
    </motion.figure>
  );
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const AboutProblemSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gray-50 py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 size-105 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 -z-10 size-115 rounded-full bg-linear-to-br from-[#595bf1]/10 to-[#f163ea]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: text */}
          <motion.div
            className="space-y-6 lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M12 2.25c-.414 0-.8.213-1.02.565L1.77 17.5a1.5 1.5 0 0 0 1.27 2.25h17.92a1.5 1.5 0 0 0 1.27-2.25L13.02 2.815A1.2 1.2 0 0 0 12 2.25Zm0 6a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V9A.75.75 0 0 1 12 8.25Zm0 8.25a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                </svg>
              }
            >
              The problem that inspired Kora
            </Badge>

            <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Built Around the{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#595bf1] to-[#f163ea]">
                Realities of Fieldwork.
              </span>
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              Humanitarian teams work in environments where connectivity can be unreliable,
              information is collected across multiple locations, and keeping records consistent
              can be difficult.
            </p>

            {/* Kora's aim, set apart from the problem above */}
            <p className="max-w-xl border-l-2 border-primary/60 pl-5 text-lg font-medium leading-relaxed text-gray-800">
              Kora aims to help teams bring beneficiary information, field activities, and
              assistance tracking into a more coordinated workflow.
            </p>
          </motion.div>

          {/* Right: gallery. Tall photo on the left, two stacked on the right, lowered a little. */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:gap-5">
            <div className="col-span-2 lg:col-span-1">
              <GalleryImage
                item={gallery[0]}
                delay={0.1}
                className="aspect-16/10 lg:aspect-3/5"
              />
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4 lg:col-span-1 lg:flex lg:flex-col lg:gap-5 lg:pt-14">
              <GalleryImage
                item={gallery[1]}
                delay={0.25}
                className="aspect-4/5 lg:aspect-5/4"
              />
              <GalleryImage
                item={gallery[2]}
                delay={0.4}
                className="aspect-4/5 lg:aspect-5/4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProblemSection;