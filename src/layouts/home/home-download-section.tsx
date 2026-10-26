// src/layouts/home/home-download-section.tsx
import Badge from "../../widgets/badge";

const HomeDownloadSection = () => {
  return (
    // overflow-hidden clips the glow and lets the phone sit on the bottom edge
    <section className="relative overflow-hidden bg-gray-950 pt-20 lg:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left – Text content */}
          <div className="space-y-8 text-center lg:pb-28 lg:text-left">
            <Badge
              variant="primary"
              glass
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              }
            >
              Get Started Today
            </Badge>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Download <span className="text-[#747bff]">Kora Field</span> <br />
              Mobile App
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-gray-300 lg:mx-0">
              Take Kora with you into the field. Full offline registration, distribution recording, and data synchronization when you're back online.
            </p>

            <div className="flex flex-col justify-center gap-6 pt-6 lg:justify-start">
              {/* Download APK button */}
              <a
                href="https://appdistribution.firebase.dev/i/bb32de04fc79f8fd"
                download="Kora-Field.apk"
                className="inline-flex items-center gap-3 w-60 rounded-xl bg-[#747bff] px-7 py-4.5 text-white shadow-lg shadow-[#747bff]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#6366f1] hover:shadow-[#747bff]/50 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zM3 15.75a.75.75 0 01.75.75v3a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25v-3a.75.75 0 011.5 0v3a3.75 3.75 0 01-3.75 3.75h-12A3.75 3.75 0 013 19.5v-3a.75.75 0 01.75-.75z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">Download</div>
                  <div className="text-lg font-semibold">Kora Field APK</div>
                </div>
              </a>

              {/* Optional small trust note */}
              <p className="self-center text-sm text-gray-400 lg:self-start">
                Android only • v1.0.0 • Secure & virus-free
              </p>
            </div>
          </div>

          {/* Right – Phone, resting on the bottom edge of the section */}
          <div className="relative flex justify-center self-end lg:justify-end lg:pr-6">
            <div className="relative">
              {/* Glow behind the phone */}
              <div
                className="pointer-events-none absolute -inset-x-16 -inset-y-10"
                style={{
                  background: `radial-gradient(circle at 50% 80%, #747bff 0%, rgba(116,123,255,0.25) 40%, transparent 70%)`,
                  filter: "blur(60px)",
                  opacity: 0.7,
                }}
              />

              <img
                src="https://res.cloudinary.com/doqholno8/image/upload/v1771033699/mobile_r4kc08.png"
                alt="Kora Field mobile app"
                className="relative z-10 block h-auto w-72 max-w-full object-contain drop-shadow-2xl sm:w-80 lg:w-100"
                style={{ marginBottom: "-1px" }} // keeps the phone flush with the bottom edge
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDownloadSection;