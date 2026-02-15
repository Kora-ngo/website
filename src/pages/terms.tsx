import { Link } from 'react-router-dom';
import logo from "../assets/logo.svg";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back button + Logo */}
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
                    <div
                        className="flex items-center space-x-2"
                    >
                        <img src={logo} alt="" className="size-12" />
                        <p className="text-3xl text-primary font-semibold">Kora</p>
                    </div>
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-12">
          Effective Date: February 14, 2026
        </p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Introduction</h2>
          <p>
            Welcome to Kora, a platform designed to help NGOs, foundations, and other organizations manage beneficiaries, projects, and aid distribution efficiently. By using our services, you agree to comply with these Terms of Service (“ToS”).
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">2. Eligibility</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be 18 years or older to create an account.</li>
            <li>Accounts are for organizations and their approved staff members only.</li>
            <li>Enumerators, collaborators, and admins must be authorized by their organization.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">3. Account Responsibility</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You are responsible for all activities conducted under your account.</li>
            <li>Notify Kora immediately if you suspect unauthorized access.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Use of Kora</h2>
          <p>
            Kora provides tools to manage beneficiaries, projects, deliveries, and reports.
            Offline tracking for beneficiaries and deliveries is supported; other features require internet connectivity.
            You agree not to misuse the platform or interfere with its operation.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Subscription & Access</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Kora may offer free trials or paid subscription plans.</li>
            <li>Access may be limited or suspended if your subscription expires or violates our policies.</li>
            <li>For MVP testing, accounts may be restricted to a test mode.</li>
          </ul>

          {/* Continue with sections 6–11 as you provided */}
          <h2 className="text-2xl font-semibold mt-10 mb-4">6. Data Ownership</h2>
          <p>Your organization retains ownership of all beneficiary and project data entered on Kora. Kora may store and process this data to provide services but will not sell your data.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">7. Audit & Monitoring</h2>
          <p>Kora may maintain logs of user activity for operational and security purposes.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">8. Liability</h2>
          <p>Kora is provided “as is” and is not liable for losses or damages caused by data entry errors, service interruptions, or misuse. Users are responsible for verifying beneficiary data and deliveries.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">9. Termination</h2>
          <p>Accounts may be terminated for policy violations, subscription lapses, or at user request. Upon termination, access to your organization’s data may be limited.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">10. Changes to Terms</h2>
          <p>Kora reserves the right to update these ToS. Users will be notified of significant changes.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">11. Governing Law</h2>
          <p>These ToS are governed by the laws of the country in which Kora is legally registered.</p>
        </div>
      </div>
    </div>
  );
}