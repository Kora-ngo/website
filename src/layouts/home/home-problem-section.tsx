import { useEffect, useState } from "react";
import Badge from "../../widgets/badge";
import { motion } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpVariantsII = {
  hidden: { opacity: 0, y: 50, x:60 },
  visible: { opacity: 1, y: 0, x:60 },
};

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

const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLarge(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLarge(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isLarge;
};

const HomeProblemSection = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column – Text / Problem description */}
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
              <h2 className="text-2xl sm:text-2xl lg:text-4xl font-bold leading-tight tracking-tight">
                When Structure Is Missing, <br /> Accountability Suffers
              </h2>
            </div>

            <p className="text-gray-600 text-lg sm:text-lg leading-relaxed max-w-3xl">
              Traditional aid distribution systems struggle with incomplete data, lack of real-time visibility, duplication
              of efforts, and inability to verify delivery at the household level especially in remote or connectivity-poor
              areas.
            </p>

            <ul className="space-y-1 hidden lg:block text-gray-700 text-lg">
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

          {/* Right column – quote-only cards, aligned left */}
          <div className="w-full flex justify-center lg:justify-end">
            <motion.div
              className="w-full max-w-lg lg:max-w-xl space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                variants={fadeUpVariants}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-white p-5 shadow-lg border-l-4 border-l-primary hover:-translate-y-1 transition-transform duration-300"
              >
                <p className="text-gray-700 text-sm lg:text-[16px] leading-relaxed">
                  "When there's no signal, we go back to paper. Later we re-enter everything… and sometimes we're not even
                  sure who actually received the aid."
                </p>
              </motion.div>

              <motion.div
                variants={isLargeScreen ? fadeUpVariantsII : fadeUpVariants}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-white p-5 shadow-lg border-l-4 border-l-primary hover:-translate-y-1 transition-transform duration-300"
              >
                <p className="text-gray-700 text-sm lg:text-[16px] leading-relaxed">
                  "We've had the same family registered twice because we couldn't verify properly. It causes tension, and
                  we can't afford those mistakes."
                </p>
              </motion.div>

              <motion.div
                variants={fadeUpVariants}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-white p-5 shadow-lg border-l-4 border-l-primary hover:-translate-y-1 transition-transform duration-300"
              >
                <p className="text-gray-700 text-sm lg:text-[16px] leading-relaxed">
                  "Donors ask for proof. We try our best... but pulling everything together from notes and spreadsheets is
                  stressful."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProblemSection;