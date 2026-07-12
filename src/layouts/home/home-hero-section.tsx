import Badge from "../../widgets/badge";
import { motion } from "framer-motion";

// Fade-up variants (unchanged)
const fadeUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};


const HomeHeroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen w-full space-y-0 lg:space-y-100 px-4 sm:px-6 lg:px-8 lg:pt-20 pb-32  bg-white">
      {/* Text content – unchanged */}
      <div className="z-10 text-center max-w-5xl mx-auto space-y-7 md:pb-24 lg:pb-100 mt-28 lg:mt-14">
        <Badge
          icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
          </svg>
          }
          glass
          variant="primary"
        >
          Impact in Harmony
        </Badge>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          The <span className="text-primary">Offline-First</span> Beneficiary <br />{" "}
          & Aid Tracking Operating System
        </h1>

        <p className="text-gray-500 text-sm sm:text-xl font-medium max-w-6xl mx-auto px-4 sm:px-0">
          Kora is a SaaS platform that helps NGOs and humanitarian organizations
          register beneficiaries, validate aid delivery, and report to donors,
          all with full offline support built for real-world field conditions.
        </p>
      </div>

  {/* Images Container */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%] sm:h-[55%] lg:h-[70%] pointer-events-none">
        <div className="relative w-full h-full max-w-8xl mx-auto">

          <motion.div
            className="absolute left-1/2 top-[10%] sm:top-[5%] -translate-x-1/2 w-[20%] sm:w-[65%] lg:w-[55%] aspect-5/3 rounded-full pointer-events-none z-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{
              background: `radial-gradient(circle at 60% 50%, 
                rgba(var(--primary-rgb, 99, 102, 241), 0.45) 0%, 
                rgba(var(--primary-rgb, 99, 102, 241), 0.18) 45%, 
                transparent 75%)`,
              filter: "blur(80px) brightness(1.15)",
            }}
          />

          {/* Main Dashboard — LCP element: priority load + real dimensions + descriptive alt */}
          <motion.img
            src="https://res.cloudinary.com/doqholno8/image/upload/v1770944088/Dashbaord_l0tlez.png"
            alt="Kora dashboard showing NGO beneficiary registration and aid delivery approval workflow"
            width={1200}
            height={800}
            fetchPriority="high"
            className="absolute lg:bottom-8 left-1/2 -translate-x-1/2 max-h-[85%] w-80 lg:w-auto object-contain drop-shadow-2xl rounded-xl border border-gray-200 z-10"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <div className="hidden lg:block">
            <motion.img
              src="https://res.cloudinary.com/doqholno8/image/upload/v1770944106/Frame_36_jy7zqp.png"
              alt="Kora project setup screen for assigning collaborators and enumerators"
              loading="lazy"
              className="absolute bottom-[40%] right-[3%] max-h-[35%] sm:max-h-[40%] w-auto object-contain drop-shadow-xl z-10 rounded-lg size-60"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            />

            <motion.img
              src="https://res.cloudinary.com/doqholno8/image/upload/v1770944107/Frame_34_c2qoky.png"
              alt="Kora beneficiary approval alert for field collaborator review"
              loading="lazy"
              className="absolute bottom-[-6%] right-[6%] w-auto object-contain drop-shadow-xl z-10 rounded-lg size-96"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />

            <motion.img
              src="https://res.cloudinary.com/doqholno8/image/upload/v1770944107/Frame_35_ork0lt.png"
              alt="Kora Field app offline sync status for enumerator data collection"
              loading="lazy"
              className="absolute bottom-[-6%] right-[43%] w-auto object-contain drop-shadow-xl z-10 rounded-lg size-96"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            />
          </div>

          <motion.div
            className="lg:hidden absolute bottom-36 left-0 right-0 flex flex-col items-center gap-6 pb-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
             <motion.img
              src="https://res.cloudinary.com/doqholno8/image/upload/v1770944106/Frame_36_jy7zqp.png"
              alt="Kora project setup screen (mobile view)"
              loading="lazy"
              className="absolute bottom-0 right-0 max-w-[45%] sm:max-w-[70%] w-full object-contain drop-shadow-lg z-10"
              variants={fadeUpVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <motion.img
              src="https://res.cloudinary.com/doqholno8/image/upload/v1770944107/Frame_34_c2qoky.png"
              alt="Kora beneficiary approval alert (mobile view)"
              loading="lazy"
              className="absolute top-8 right-6 max-w-[35%] sm:max-w-[70%] w-full object-contain drop-shadow-lg z-10"
              variants={fadeUpVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <motion.img
              src="https://res.cloudinary.com/doqholno8/image/upload/v1770944107/Frame_35_ork0lt.png"
              alt="Kora Field offline sync status (mobile view)"
              loading="lazy"
              className="absolute top-8 right-36 max-w-[35%] sm:max-w-[70%] w-full object-contain drop-shadow-lg z-10"
              variants={fadeUpVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
            /> 
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;