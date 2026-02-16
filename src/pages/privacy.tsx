import { Link } from 'react-router-dom';
import logo from "../assets/logo.svg";


export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back button + Logo (same as terms page) */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-6 py-5 flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <a href="/" className="flex items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <img src={logo} alt="" className="lg:size-12 size-9" />
                    <p className="lg:text-3xl text-2xl text-primary font-semibold">Kora</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-12">
          Effective Date: February 14, 2026
        </p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Introduction</h2>
          <p>
            Kora values your privacy. This policy explains how we collect, use, store, and protect your data when using our platform.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">2. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Name, email, phone, role.</li>
            <li><strong>Organization Data:</strong> Organization name, email, phone.</li>
            <li><strong>Project Data:</strong> Projects, beneficiaries, deliveries, and associated documents.</li>
            <li><strong>Device Information:</strong> IP address, device type, app version, and offline tracking data.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">3. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and improve Kora’s services.</li>
            <li>To enable offline tracking and syncing of beneficiaries and deliveries.</li>
            <li>For operational monitoring and support.</li>
            <li>To send relevant notifications regarding accounts and subscriptions.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Data Sharing</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not sell or share personal or organizational data with third parties.</li>
            <li>Data may be shared with collaborators within your organization for operational purposes.</li>
            <li>In legal situations or security incidents, we may disclose data to authorities.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Data Retention</h2>
          <p>
            Data is retained for as long as your account is active or until deletion is requested.
            Offline-synced data remains on devices until successfully synced with the server.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">6. Security</h2>
          <p>
            Kora uses encryption and secure storage for sensitive data.
            Users are responsible for device-level security and login credentials.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">7. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access, correct, or request deletion of your data.</li>
            <li>Request a summary of stored beneficiary and project information.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">8. Cookies & Analytics</h2>
          <p>
            Our web platform may use cookies or analytics tools to improve functionality and monitor usage.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">9. Changes to Privacy Policy</h2>
          <p>
            Updates will be communicated through email or notifications in the platform.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">10. Contact</h2>
          <p>
            For privacy concerns, contact <a href="mailto:privacy@kora.onl" className="text-primary hover:underline">privacy@kora.onl</a> or the support team via the platform.
          </p>
        </div>
      </div>
    </div>
  );
}