import Badge from "../../widgets/badge";
import { motion } from "framer-motion";
import phoneImg from "../../assets/icons/mobile.png";
import dbImg from "../../assets/icons/database.png";
import teamImg from "../../assets/icons/people_skin.png";
import delImg from "../../assets/icons/inbox.png";
import syncImg from "../../assets/icons/upload.png";
import tagImg from "../../assets/icons/tags.png";
import { Button } from "../../widgets/button";

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
      icon: <img src={phoneImg} alt="Offline mobile data collection icon" className="size-14" />,
      title: "Offline-First Tracking",
      description:
        "Register beneficiaries and record assistance without an internet connection. Sync when connectivity returns.",
    },
    {
      icon: <img src={dbImg} alt="Centralized beneficiary database icon" className="size-14" />,
      title: "Centralized Beneficiary Management",
      description:
        "Keep household and beneficiary records organized in one centralized system.",
    },
    {
      icon: <img src={teamImg} alt="Project and field team management icon" className="size-14" />,
      title: "Project & Field Team Management",
      description:
        "Create projects, define targets, assign teams, and monitor field activities from one workspace.",
    },
    {
      icon: <img src={delImg} alt="Delivery validation and audit icon" className="size-14" />,
      title: "Assistance Validation & Audit",
      description:
        "Track assistance activities with structured validation and auditable records.",
    },
    {
      icon: <img src={syncImg} alt="Real-time data sync icon" className="size-14" />,
      title: "Offline-to-Central Synchronization",
      description:
        "Synchronize field records with the central platform when connectivity becomes available.",
    },
    {
      icon: <img src={tagImg} alt="Flexible aid type configuration icon" className="size-14" />,
      title: "Flexible Assistance Configuration",
      description:
        "Define assistance types and associate them with specific projects and activities.",
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

          <h2 className="mt-6 text-2xl sm:text-5xl lg:text-5xl font-bold tracking-tight">
            Built for the Realities of <br />
            <span className="text-primary">Real Humanitarian Work</span>
          </h2>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            From offline data collection to donor reporting, Kora is built around the operational challenges faced by humanitarian and field teams.
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
        {/* <div className="flex justify-end py-6">
          <Button children="Explore the Platform →" variant="link" />
        </div> */}
      </div>
    </section>
  );
};

export default HomeFeatureSection;