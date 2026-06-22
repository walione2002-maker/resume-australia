import React from "react";
import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Sticky Navigation */}
        <nav className="md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-2">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
              Legal Documents
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="#terms-of-service"
                  className="block px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#privacy-policy"
                  className="block px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#right-of-withdrawal"
                  className="block px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Right of Withdrawal
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1 max-w-3xl prose prose-zinc dark:prose-invert">
          <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-8">
            Legal & Compliance
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
            Last updated: October 2023. Please read these terms carefully before using our platform.
          </p>

          {/* Terms of Service */}
          <section id="terms-of-service" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6">
              Terms of Service
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6">1. Acceptance of Terms</h3>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
              
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6">2. User Accounts</h3>
              <p>
                To use certain features of the service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6">3. Use of the Service</h3>
              <p>
                You agree to use the service only for purposes that are permitted by these Terms and any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions.
              </p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section id="privacy-policy" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6">
              Privacy Policy
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6">1. Information Collection</h3>
              <p>
                We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, and other information you choose to provide.
              </p>

              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6">2. Use of Information</h3>
              <p>
                We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, and provide customer support.
              </p>

              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6">3. Sharing of Information</h3>
              <p>
                We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: with third party service providers; in response to a request for information by a competent authority if we believe disclosure is in accordance with, or is otherwise required by, any applicable law, regulation, or legal process.
              </p>
            </div>
          </section>

          {/* Right of Withdrawal */}
          <section id="right-of-withdrawal" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6">
              Right of Withdrawal
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6">1. Cancellation Policy</h3>
              <p>
                You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day of the conclusion of the contract.
              </p>

              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6">2. Exercising Your Right</h3>
              <p>
                To exercise the right of withdrawal, you must inform us of your decision to withdraw from this contract by an unequivocal statement (e.g. a letter sent by post, fax or e-mail). You may use the attached model withdrawal form, but it is not obligatory.
              </p>

              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6">3. Effects of Withdrawal</h3>
              <p>
                If you withdraw from this contract, we shall reimburse to you all payments received from you, including the costs of delivery (with the exception of the supplementary costs resulting from your choice of a type of delivery other than the least expensive type of standard delivery offered by us), without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to withdraw from this contract.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
