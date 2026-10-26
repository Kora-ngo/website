// home-faq-section.tsx
import Badge from "../../widgets/badge";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const faqs = [
  {
    question: "What is Kora and how does it help NGOs?",
    answer:
      "Kora is a digital field operations platform that helps NGOs and humanitarian organizations manage projects, beneficiaries, assistance delivery, field activities, analytics, and reporting through a connected workflow. It brings field teams, supervisors, and administrators together while keeping operations structured and traceable.",
  },
  {
    question: "Can Kora work without an internet connection?",
    answer:
      "Yes. Kora Field is designed for offline field operations. Enumerators can register beneficiaries and record assistance without an active internet connection. When connectivity becomes available, their data can be synchronized with the central Kora platform.",
  },
  {
    question: "How does Kora ensure beneficiary data and assistance records are reliable?",
    answer:
      "Kora uses a structured workflow where field-collected records can be reviewed and validated by authorized collaborators before becoming validated project data. Activities are also recorded through audit logs, providing greater traceability and accountability across project operations.",
  },
  {
    question: "What can an organization do with the data collected in Kora?",
    answer:
      "Organizations can monitor project progress, beneficiary targets, geographic coverage, assistance delivery, validation activity, and other operational indicators through analytics. They can also generate structured project reports and export beneficiary and assistance data for internal reporting, donor reporting, and accountability purposes.",
  },
];

// Floating decorative question marks: varied size/position/depth so the
// illustration reads as an intentional cluster, not a repeated pattern.
const floatingMarks = [
  { size: "text-9xl", top: "8%", left: "12%", opacity: "text-primary/15", duration: 6, delay: 0 },
  { size: "text-7xl", top: "55%", left: "62%", opacity: "text-primary/25", duration: 5, delay: 0.6 },
  { size: "text-6xl", top: "70%", left: "18%", opacity: "text-primary/20", duration: 7, delay: 1.2 },
  { size: "text-8xl", top: "30%", left: "55%", opacity: "text-primary/10", duration: 8, delay: 0.3 },
  { size: "text-5xl", top: "12%", left: "70%", opacity: "text-primary/30", duration: 4.5, delay: 0.9 },
];

const FaqIllustration = () => {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center overflow-hidden">
      {floatingMarks.map((mark, i) => (
        <motion.span
          key={i}
          className={`absolute font-black select-none ${mark.size} ${mark.opacity}`}
          style={{ top: mark.top, left: mark.left }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 6, 0, -6, 0],
          }}
          transition={{
            duration: mark.duration,
            delay: mark.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ?
        </motion.span>
      ))}

      {/* Centerpiece mark, larger and slightly more opaque than the rest */}
      <motion.span
        className="relative text-primary/40 text-[14rem] font-black select-none leading-none"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        ?
      </motion.span>
    </div>
  );
};

const HomeFaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge
            variant="primary"
            glass
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
            }
          >
            FAQ
          </Badge>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Everything NGOs and field teams ask before switching to Kora.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: animated question-mark illustration */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <FaqIllustration />
          </motion.div>

          {/* Right: FAQ accordion, unchanged */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {faqs.map((item, index) => {
              const panelId = `faq-panel-${index}`;
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  variants={fadeUpVariants}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-md font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    <span className="text-2xl font-light text-primary shrink-0" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-96 pt-1" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-600 pb-5 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* FAQPage structured data — mirrors the content above exactly */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
};

export default HomeFaqSection;