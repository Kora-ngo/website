import Badge from "../../widgets/badge";
import { motion } from "framer-motion";
import { Input } from "../../widgets/input";     // ← your Input widget
import { Textarea } from "../../widgets/textarea"; // ← your Textarea widget

const HomeDemoRequestSection = () => {
  return (
    <section className="py-40 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="primary"
            glass
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                </svg>
            }
          >
            Request a Demo
          </Badge>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            See Kora in Action
          </h2>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
           Book a free 20-minute live demo with our team to explore how Kora can solve your field data challenges offline tracking, verification, reporting, and more.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left – Description / Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:pr-8"
          >
            <h3 className="text-3xl font-semibold text-gray-900">
              What you'll discover in the demo
            </h3>

            <ul className="space-y-5 text-lg text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl font-bold mt-1">•</span>
                <span>Full offline workflow register beneficiaries and record deliveries with no internet</span>
              </li>
                <li className="flex items-start gap-4">
                    <span className="text-primary text-2xl font-bold mt-1">•</span>
                    <span>Sync triggered when you're ready and connectivity is available. Data uploads instantly to the central dashboard</span>
                </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl font-bold mt-1">•</span>
                <span>Exportable, auditable reports for donors and auditors</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl font-bold mt-1">•</span>
                <span>Answers to your specific challenges and use-case questions</span>
              </li>
            </ul>

            <p className="text-gray-600 italic pt-4">
                Prefer to watch first? We'll also send you a short recorded walkthrough after your submission.
            </p>
          </motion.div>

          {/* Right – Form using your Input & Textarea widgets */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm"
          >
            <h3 className="text-2xl font-semibold mb-8 text-gray-900">
              Request Your Demo
            </h3>

            <form className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  required
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                  Organisation Name
                </label>
                <Input
                  id="organization"
                  required
                  placeholder="Your NGO / Agency"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="david@example.org"
                />
              </div>

              
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  id="number"
                  type="number"
                  required
                  placeholder=""
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country of Operation
                </label>
                <Input
                  id="country"
                  required
                  placeholder="Cameroon, Nigeria, Chad..."
                />
              </div>

              <div>
                <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 mb-2">
                  What is your biggest challenge with managing field data right now?
                </label>
                <Textarea
                  id="challenge"
                  required
                  rows={4}
                  placeholder="e.g. No offline support, lost paper records, duplicate beneficiaries..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-medium py-4 px-8 rounded-xl hover:bg-primary/90 active:bg-primary/80 transition-all shadow-lg hover:shadow-xl mt-4"
              >
                Request Demo
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                We'll get back to you within 24–48 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeDemoRequestSection;