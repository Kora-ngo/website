import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Animated glowing background – round & moving */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1400px] max-h-[1400px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(116,123,255,0.35) 0%, rgba(116,123,255,0.12) 40%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'glowPulse 12s ease-in-out infinite alternate',
            opacity: 0.6,
          }}
        />
      </div>

      {/* Content – raised z-index so it sits above glow */}
      <div className="relative z-10">
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-gray-100 select-none">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 mb-6 text-gray-800">
          Page Not Found
        </h2>

        <p className="text-lg md:text-xl text-gray-600 max-w-md mb-10 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
        >
          Return to Home
        </Link>
      </div>

      {/* Optional subtle footer note */}
      <p className="absolute bottom-8 text-sm text-gray-400">
        Kora – Impact in Harmony
      </p>
    </div>
  );
}