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
    question: "What is Kora and how does it work for NGOs?",
    answer:
      "Kora is a SaaS platform that helps NGOs and humanitarian organizations digitize field operations  from beneficiary registration to aid delivery, through a role-based workflow where every action is tracked, verified, and reportable.",
  },
  {
    question: "Can Kora be used offline in the field?",
    answer:
      "Yes. Enumerators use the Kora Field mobile app to register beneficiaries and log deliveries with no internet connection. he can later on sync to the central system once connectivity is available.",
  },
  {
    question: "How does beneficiary approval and delivery validation work?",
    answer:
      "Enumerators register beneficiaries and submit records for review. A collaborator approves or rejects each submission with written feedback. Once a beneficiary is approved, deliveries tied to them go through the same review process before being confirmed.",
  },
  {
    question: "What kind of reports can Kora generate for donors?",
    answer:
      "Organisation head can export beneficiary and delivery data as Excel reports for donor reporting, internal review, or audits, with a full activity log behind every record.",
  },
  {
    question: "Is Kora suitable for small or grassroots NGOs, or only large organizations?",
    answer:
      "Kora is built to scale both ways, from large INGOs and UN implementing partners managing multiple projects, to grassroots and community-based organizations running smaller distributions who need a simple, offline-capable tool.",
  },
  {
    question: "How is Kora different from paper-based or spreadsheet tracking?",
    answer:
      "Paper and spreadsheets create gaps in accountability and make it hard to verify who actually received aid. Kora enforces a structured, role-based review process for every beneficiary and delivery record, producing an auditable trail donors and auditors can rely on.",
  },
];

const HomeFaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
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