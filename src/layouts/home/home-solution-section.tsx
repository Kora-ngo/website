import { motion } from "framer-motion";
import Badge from "../../widgets/badge";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const HomeSolutionSection = () => {
  return (
    <section className="py- bg-linear-to-b from-white to-gray-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Circular ecosystem diagram */}

          <div className="relative order-1 lg:order-1 flex justify-center">
            <motion.div
                className="relative w-full max-w-lg aspect-square"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUpVariants}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                {/* Dotted orbit circles */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                {/* Outer dotted circle */}
                <circle
                    cx="200"
                    cy="200"
                    r="160"
                    fill="none"
                    stroke="#E0E7FF"
                    strokeWidth="2"
                    strokeDasharray="4 8"
                />
                {/* Middle dotted circle */}
                <circle
                    cx="200"
                    cy="200"
                    r="120"
                    fill="none"
                    stroke="#E0E7FF"
                    strokeWidth="2"
                    strokeDasharray="4 8"
                />
                {/* Inner dotted circle */}
                <circle
                    cx="200"
                    cy="200"
                    r="80"
                    fill="none"
                    stroke="#E0E7FF"
                    strokeWidth="2"
                    strokeDasharray="4 8"
                />

                {/* Connecting lines */}
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                    const radius = 160;
                    const x = 200 + Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                    const y = 200 + Math.sin((angle - 90) * (Math.PI / 180)) * radius;
                    
                    return (
                    <line
                        key={`line-${angle}`}
                        x1="200"
                        y1="200"
                        x2={x}
                        y2={y}
                        stroke="#E0E7FF"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />
                    );
                })}
                </svg>

                {/* Central Kora logo */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div
                    className="relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-primary rounded-full blur-xl opacity-30 scale-150" />
                    
                    <div className="relative bg-linear-to-br from-blue-500 to-primary rounded-full py-8 shadow-2xl">
                        <img src="https://res.cloudinary.com/doqholno8/image/upload/v1771016666/white_logo_cbf8ki.png" className="size-12 ml-7 mr-9" />
                    </div>
                </motion.div>
                </div>

                {/* Orbiting feature nodes */}
                {[
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z" />
                        </svg>
                    ),
                    label: "Structured Operations",
                    angle: 0,
                    delay: 0.3,
                    color: "from-blue-500 to-blue-600",
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                    ),
                    label: "Unified Beneficiary Record",
                    angle: 60,
                    delay: 0.4,
                    color: "from-purple-500 to-purple-600",
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M2.47 2.47a.75.75 0 0 1 1.06 0l8.407 8.407a1.125 1.125 0 0 1 1.186 1.186l1.462 1.461a3.001 3.001 0 0 0-.464-3.645.75.75 0 1 1 1.061-1.061 4.501 4.501 0 0 1 .486 5.79l1.072 1.072a6.001 6.001 0 0 0-.497-7.923.75.75 0 0 1 1.06-1.06 7.501 7.501 0 0 1 .505 10.05l1.064 1.065a9 9 0 0 0-.508-12.176.75.75 0 0 1 1.06-1.06c3.923 3.922 4.093 10.175.512 14.3l1.594 1.594a.75.75 0 1 1-1.06 1.06l-2.106-2.105-2.121-2.122h-.001l-4.705-4.706a.747.747 0 0 1-.127-.126L2.47 3.53a.75.75 0 0 1 0-1.061Zm1.189 4.422a.75.75 0 0 1 .326 1.01 9.004 9.004 0 0 0 1.651 10.462.75.75 0 1 1-1.06 1.06C1.27 16.12.63 11.165 2.648 7.219a.75.75 0 0 1 1.01-.326ZM5.84 9.134a.75.75 0 0 1 .472.95 6 6 0 0 0 1.444 6.159.75.75 0 0 1-1.06 1.06A7.5 7.5 0 0 1 4.89 9.606a.75.75 0 0 1 .95-.472Zm2.341 2.653a.75.75 0 0 1 .848.638c.088.62.37 1.218.849 1.696a.75.75 0 0 1-1.061 1.061 4.483 4.483 0 0 1-1.273-2.546.75.75 0 0 1 .637-.848Z" clip-rule="evenodd" />
                        </svg>
                    ),
                    label: "Offline Field Mode",
                    angle: 120,
                    delay: 0.5,
                    color: "from-indigo-500 to-indigo-600",
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z" clip-rule="evenodd" />
                            <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                        </svg>
                    ),
                    label: "Delivery Verification",
                    angle: 180,
                    delay: 0.6,
                    color: "from-cyan-500 to-cyan-600",
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
                        </svg>

                    ),
                    label: "Sync Mechanism",
                    angle: 240,
                    delay: 0.7,
                    color: "from-teal-500 to-teal-600",
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                            <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                        </svg>

                    ),
                    label: "Transperent Reporting",
                    angle: 300,
                    delay: 0.8,
                    color: "from-blue-500 to-blue-600",
                },
                ].map((item, i) => {
                // Calculate position on circle - using 40% of container for proper spacing
                const angleRad = (item.angle - 90) * (Math.PI / 180);
                const radiusPercent = 40; // 40% from center
                
                return (
                    <motion.div
                    key={i}
                    className="absolute z-10"
                    style={{
                        left: `${50 + radiusPercent * Math.cos(angleRad)}%`,
                        top: `${50 + radiusPercent * Math.sin(angleRad)}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        delay: item.delay,
                        type: "spring",
                        stiffness: 200,
                    }}
                    >
                    <div className="flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2">
                        {/* Icon circle */}
                        <div
                        className={`bg-linear-to-br ${item.color} text-white rounded-full p-4 shadow-lg`}
                        >
                        {item.icon}
                        </div>
                        {/* Label */}
                        <p className="text-xs font-medium text-gray-700 text-center max-w-20">
                        {item.label}
                        </p>
                    </div>
                    </motion.div>
                );
                })}

                {/* Decorative small dots */}
                {[45, 105, 165, 225, 285, 345].map((angle, i) => {
                const angleRad = (angle - 90) * (Math.PI / 180);
                const radiusPercent = 25;
                
                return (
                    <motion.div
                    key={`dot-${i}`}
                    className="absolute w-2 h-2 bg-primary/30 rounded-full"
                    style={{
                        left: `${50 + radiusPercent * Math.cos(angleRad)}%`,
                        top: `${50 + radiusPercent * Math.sin(angleRad)}%`,
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    />
                );
                })}
            </motion.div>
            </div>
          

          {/* Right: Text content */}
          <div className="space-y-8 order-2 lg:order-2">
            <div className="space-y-4">
                <Badge
                    icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                    </svg>
                    }
                >
                    From Chaos to Control
                </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900">
                A Structured Way to Run Aid Operations
              </h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Kora centralizes project management while enabling offline beneficiary tracking and delivery validation in the field, keeping operations structured even when connectivity is limited.
            </p>

            {/* <div className="grid grid-cols-3 gap-6 pt-4">
              <div>
                <div className="text-primary text-3xl font-bold">35+</div>
                <p className="text-gray-600 text-sm mt-1">DATA SOURCES</p>
              </div>
              <div>
                <div className="text-primary text-3xl font-bold">200M</div>
                <p className="text-gray-600 text-sm mt-1">BUSINESS PROFILES</p>
              </div>
              <div>
                <div className="text-primary text-3xl font-bold">20M</div>
                <p className="text-gray-600 text-sm mt-1">COMPANIES</p>
              </div>
            </div> */}

            <div className="pt-4">
              {/* <button className="px-6 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors duration-200">
                Learn more
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSolutionSection;