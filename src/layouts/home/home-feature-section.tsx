import Badge from "../../widgets/badge";
import { motion } from "framer-motion";
import phoneImg from "../../assets/icons/mobile.png";
import dbImg from "../../assets/icons/database.png";
import teamImg from "../../assets/icons/people_skin.png";
import delImg from "../../assets/icons/inbox.png";
import syncImg from "../../assets/icons/upload.png";
import tagImg from "../../assets/icons/tags.png";




// Animation variants
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

const HomeFeatureSection = () => {
  const features = [
    {
      icon: (
        <img src={phoneImg} className="size-14"></img>
      ),
      title: "Offline-First Tracking",
      description:
        "Field teams with thier mobile device can register beneficiaries and record distributions without internet connection, then syncs data once online.",
    },
    {
      icon: (
        <img src={dbImg}  className="size-14"></img>

      ),
      title: "Centralized Beneficiary Management",
      description:
        "All household data in one place, eliminating duplicate registrations and confusion.",
    },
    {
      icon: (
        <img src={teamImg}  className="size-14"></img>
      ),
      title: "Project & Field Team Management",
      description:
        "Create projects, assign collaborators and enumerators, and track progress in real-time.",
    },
    {
      icon: (
        <img src={delImg}  className="size-14"></img>
      ),
      title: "Delivery Validation & Audit",
      description:
        "Every delivery is logged, reviewed, and approved to ensure accountability and transparency.",
    },
    {
      icon: (
        <img src={syncImg}  className="size-14"></img>
      ),
      title: "Real-Time Sync with Oversight",
      description:
        "Field updates reach collaborators and admins quickly, allowing timely monitoring and reports.",
    },
    {
      icon: (
        <img src={tagImg}  className="size-14"></img>

      ),
      title: "Flexible Aid/Assistance Setup",
      description:
        "Define different types of assistance (cash, food, medicine) and attach them to specific projects for clear distribution.",
    },
  ];

  return (
    <section className="py-40 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="primary"
            glass
            icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
            </svg>

            }
          >
            Core Features
          </Badge>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight">
            Powerful Tools Built for <br />
            <span className="text-primary">Real Humanitarian Work</span>
          </h2>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature is designed to solve real field challenges, from no connectivity to donor accountability.
          </p>
        </div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col"
            >
              <div className="text-primary mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed grow">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFeatureSection;