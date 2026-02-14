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
                Take Kora with you into the field — full offline registration, distribution recording, photo & GPS capture, and automatic sync when you're back online.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {/* Google Play button – only one for now as per your code */}
                <a
                  href="#"
                  className="inline-flex items-center gap-3 rounded-xl bg-black px-6 py-4 text-white hover:bg-gray-900 transition-colors shadow-lg"
                >
                  <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </a>
              </div>

              <p className="text-sm text-gray-400 ">
                Available for Android (iOS coming soon) • Free download
              </p>
            </div>

            {/* Right – Mobile image with glowing background */}
            <div className="relative pr-10 pt-6 flex justify-center lg:justify-end z-10">
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
                  src="https://res.cloudinary.com/doqholno8/image/upload/v1771032363/mobile_i4wx1f.svg"
                  alt="Kora Field mobile app"
                  className="w-100 h-auto object-contain drop-shadow-2xl mt-20 ml-6 relative z-10"
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