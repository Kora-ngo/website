import Badge from "../../widgets/badge";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const HomeWhoSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const audiences = [
    {
      title: "Humanitarian NGOs & INGOs",
      description:
        "National and international organizations managing humanitarian and development programs, from beneficiary registration and assistance delivery to monitoring and reportings.",
    },
    {
      title: "Local & Community-Based Organizations",
      description:
        "Local NGOs, community organizations, and field teams that need simple, reliable tools for managing beneficiaries and assistance in low-connectivity environments.",
    },
    {
      title: "Program & Field Teams",
      description:
        "Supervisors, enumerators, and program staff who need a shared view of field activities, beneficiary data, assistance, and project progress.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left – Accordion */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariants}
          >
            <div className="text-start mb-16">
              <Badge
                variant="primary"
                glass
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                  </svg>
                }
              >
                Who It's For
              </Badge>

              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Built for Teams Delivering <br /> <span className="text-primary">Humanitarian Assistance</span>
              </h2>

              <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto">
                From field enumerators to program managers, Kora supports the teams responsible for collecting, managing, validating, and reporting humanitarian program data.
              </p>
            </div>

            {audiences.map((item, index) => {
              const panelId = `audience-panel-${index}`;
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  variants={fadeUpVariants}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full px-6 py-5 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <span className="text-2xl font-light text-primary" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-96 pt-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-600 pb-4 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right – Image */}
          <motion.div
            className="relative lg:sticky lg:top-32"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50 aspect-4/5 lg:aspect-3/4 max-w-lg mx-auto lg:mx-0">
              <img
                src="https://res.cloudinary.com/doqholno8/image/upload/v1771070941/freepik__group-of-black-african-people-receiving-ngo-food-a__44262_owxour.png"
                alt="Humanitarian workers distributing aid in the field"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeWhoSection;