import Badge from "../../widgets/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../widgets/input";
import { Textarea } from "../../widgets/textarea";
import { useState } from "react";

const HomeDemoRequestSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value && !validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const emailValue = (form.elements.namedItem("email") as HTMLInputElement).value;

    if (!validateEmail(emailValue)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xbdzawyd", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo-request" className="py-40 bg-white">
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
            Book a free 20-minute live demo with our team to explore how Kora can solve your field data challenges.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
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
                <span>Full offline workflow. Register beneficiaries and record deliveries with no internet</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl font-bold mt-1">•</span>
                <span>Sync triggered when you're ready. Data uploads instantly to the central dashboard</span>
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

          {/* Right – Form card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {submitted ? (

                /* ── Success box ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-16 gap-5"
                >
                  <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-10 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900">You're all set!</h3>

                  <p className="text-gray-600 text-base max-w-sm leading-relaxed">
                    Your demo request has been received. Our team will reach out within{" "}
                    <strong className="text-gray-800">24–48 hours</strong> to confirm your session.
                  </p>

                  <div className="w-full border-t border-gray-200 pt-5 mt-2">
                    <p className="text-sm text-gray-400 flex items-center justify-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      A walkthrough will be sent to your email shortly.
                    </p>
                  </div>
                </motion.div>

              ) : (

                /* ── Form ── */
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className="text-2xl font-semibold mb-8 text-gray-900">Request Your Demo</h3>

                  <form className="space-y-5" onSubmit={handleSubmit}>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                          Full Name <span className="text-primary">*</span>
                        </label>
                        <Input id="fullName" name="fullName" required placeholder="John Doe" />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="organization" className="block text-sm font-semibold text-gray-700">
                          Organisation <span className="text-primary">*</span>
                        </label>
                        <Input id="organization" name="organization" required placeholder="Your NGO / Agency" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                          Email <span className="text-primary">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="david@example.org"
                          onBlur={handleEmailBlur}
                        />
                        {emailError && (
                          <p className="text-xs text-red-500 mt-1">{emailError}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                          Phone <span className="text-primary">*</span>
                        </label>
                        <Input id="phone" name="phone" type="tel" required placeholder="+237 6XX XXX XXX" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="country" className="block text-sm font-semibold text-gray-700">
                        Country of Operation <span className="text-primary">*</span>
                      </label>
                      <Input id="country" name="country" required placeholder="Cameroon, Nigeria, Chad..." />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="challenge" className="block text-sm font-semibold text-gray-700">
                        Biggest field data challenge <span className="text-primary">*</span>
                      </label>
                      <Textarea id="challenge" name="challenge" required rows={4} placeholder="e.g. No offline support, lost paper records, duplicate beneficiaries..." />
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-center">
                        {error}
                      </p>
                    )}

                    <div className="border-t border-gray-200 pt-4">
                      <button
                        type="submit"
                        disabled={loading || !!emailError}
                        className="w-full bg-primary text-white font-semibold py-4 px-8 rounded-xl hover:bg-primary/90 active:bg-primary/80 transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Request Demo
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        We'll respond within 24–48 hours. Your data is safe with us.
                      </p>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HomeDemoRequestSection;