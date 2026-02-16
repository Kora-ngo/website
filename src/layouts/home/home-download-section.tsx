import Badge from "../../widgets/badge";

const HomeDownloadSection = () => {
  return (
    <section className="pb-30 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Optional small badge above the main box */}
        <div className="flex justify-center mb-12">

        </div>

        {/* Main dark rectangular box */}
        <div className="rounded-3xl bg-gray-950  shadow-2xl border border-gray-800/50 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
            {/* Left – Text content */}
            <div className="space-y-8 text-center px-8 py-16 md:px-16 md:py-20 lg:px-24 lg:py-24 lg:text-left z-10 relative">
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Download <span className="text-[#747bff]">Kora Field</span> <br />
                Mobile App
              </h2>

              <p className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Take Kora with you into the field. Full offline registration, distribution recording, and data synchronization when you're back online.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6">
                {/* Download APK button */}
                <a
                  href="https://www.dropbox.com/scl/fi/cunc8p2pz7meb2hpwz8iu/app-release.apk?rlkey=9vuboz3dd9s08n2glegd86nw0&st=rbzgrzu5&dl=0"  // ← Replace with your actual APK download link (e.g. "/downloads/kora-field-latest.apk" or external secure URL)
                  download="Kora-Field.apk"
                  className="inline-flex items-center gap-3 rounded-xl bg-[#747bff] px-7 py-4.5 text-white hover:bg-[#6366f1] transition-all duration-300 shadow-lg shadow-[#747bff]/30 hover:shadow-[#747bff]/50 hover:scale-[1.02] active:scale-95"
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
                <p className="text-sm text-gray-400 self-center lg:self-start">
                  Android only • v1.0.0 • Secure & virus-free
                </p>
              </div>
            </div>

            {/* Right – Mobile image with glowing background */}
            <div className="relative pr-10 pt-6 flex justify-start lg:justify-end z-10">
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Glowing background behind the image */}
                <div
                  className="absolute inset-0 rounded-b-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 80%, #747bff 0%, rgba(116,123,255,0.25) 40%, transparent 70%)`,
                    filter: "blur(60px)",
                    opacity: 0.7,
                  }}
                />

                {/* The mobile SVG – no padding, touches bottom */}
                <img
                  src="https://res.cloudinary.com/doqholno8/image/upload/v1771033699/mobile_r4kc08.png"
                  alt="Kora Field mobile app"
                  className="w-100 h-auto object-contain drop-shadow-2xl lg:mt-20 ml-5 relative z-10"
                  style={{ marginBottom: "-1px" }} // ensures it touches the bottom edge perfectly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDownloadSection;