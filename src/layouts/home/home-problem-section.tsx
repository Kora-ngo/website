import Badge from "../../widgets/badge";
import { motion } from "framer-motion";

// Reusable fade-up variant
const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

// Stagger container for the 3 boxes
const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const HomeProblemSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column – Text / Problem description – unchanged */}
          <div className="space-y-8">
            <div className="space-y-2">
              <Badge
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                      clipRule="evenodd"
                    />
                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                  </svg>
                }
              >
                Real Problem. Real Impact
              </Badge>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold leading-tight tracking-tight">
                When Structure Is Missing, <br /> Accountability Suffers
              </h2>
            </div>

            <p className="text-gray-600 text-lg sm:text-lg leading-relaxed max-w-3xl">
              Traditional aid distribution systems struggle with incomplete data, lack of real-time visibility, duplication
              of efforts, and inability to verify delivery at the household level especially in remote or connectivity-poor
              areas.
            </p>

            <ul className="space-y-1 text-gray-700 text-lg">
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl font-bold mt-1">•</span>
                <span>Poor offline support leads to delayed or lost records</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl font-bold mt-1">•</span>
                <span>No reliable way to confirm beneficiaries actually received aid</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl font-bold mt-1">•</span>
                <span>Fragmented tools cause errors, duplication, and mistrust</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl font-bold mt-1">•</span>
                <span>Donors and stakeholders lack transparent, verifiable impact data</span>
              </li>
            </ul>
          </div>

          {/* Right column – 3 message boxes with scroll animation */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              className="relative w-full max-w-lg lg:max-w-xl space-y-6 lg:space-y-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Message Box 1 */}
              <motion.div
                variants={fadeUpVariants}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex items-start gap-4 bg-white p-5 shadow-lg border-l-4 border-l-primary transform hover:-translate-y-1 transition-transform duration-300"
              >
                <img
                  src="https://afsc.org/sites/default/files/2024-02/enassmuzamel_profilephoto.jpg"
                  alt="Enass Muzamel"
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <h4 className="font-semibold text-gray-900">Enass M.</h4>
                    <span className="text-sm text-gray-500">Field Coordinator, NGO</span>
                  </div>
                  <p className="mt-1.5 text-gray-700 leading-relaxed">
                    "When there’s no signal, we go back to paper. Later we re-enter everything… and sometimes we’re not even
                    sure who actually received the aid."
                  </p>
                </div>
              </motion.div>

              {/* Message Box 2 */}
              <motion.div
                variants={fadeUpVariants}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex items-start gap-4 bg-white p-5 shadow-lg border-l-4 border-l-primary transform translate-x-16 hover:-translate-y-1 transition-transform duration-300"
              >
                <img
                  src="https://thumbs.dreamstime.com/b/happy-man-portrait-park-volunteer-eco-friendly-development-global-change-nature-male-person-activist-ngo-smile-418570548.jpg"
                  alt="Volunteer portrait"
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <h4 className="font-semibold text-gray-900">Ahmed K.</h4>
                    <span className="text-sm text-gray-500">Community Mobilizer</span>
                  </div>
                  <p className="mt-1.5 text-gray-700 leading-relaxed">
                    "We’ve had the same family registered twice because we couldn’t verify properly. It causes tension, and
                    we can’t afford those mistakes."
                  </p>
                </div>
              </motion.div>

              {/* Message Box 3 */}
              <motion.div
                variants={fadeUpVariants}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex items-start gap-4 bg-white p-5 shadow-lg border-l-4 border-l-primary transform -translate-x-2 hover:-translate-y-1 transition-transform duration-300"
              >
                <img
                  src="https://csf-sudan.org/wp-content/uploads/2021/09/a1-2017-1063-1400x1120.jpg"
                  alt="Community elder"
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <h4 className="font-semibold text-gray-900">Ibrahim S.</h4>
                    <span className="text-sm text-gray-500">Village Leader</span>
                  </div>
                  <p className="mt-1.5 text-gray-700 leading-relaxed">
                    “Donors ask for proof. We try our best... but pulling everything together from notes and spreadsheets is
                    stressful.”
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProblemSection;