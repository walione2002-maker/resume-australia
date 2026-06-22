"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckout = () => {
    // Simulate checkout process
    setTimeout(() => {
      setShowSuccess(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Premium SaaS Pricing, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
              Without the Price Tag
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to build a world-class resume. Completely free. Forever.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm font-medium ${!isYearly ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative inline-flex h-7 w-14 items-center rounded-full bg-emerald-500 transition-colors focus:outline-none"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                isYearly ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium flex items-center ${isYearly ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
            Yearly
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-semibold text-green-700 dark:text-green-300">
              100% OFF
            </span>
          </span>
        </div>

        {/* Pricing Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto relative rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
          
          <div className="p-8 sm:p-10 space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold flex items-center">
                  Lifetime Enterprise Plan
                  <Sparkles className="w-5 h-5 ml-2 text-yellow-500" />
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Unlimited access to all features.</p>
              </div>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-extrabold tracking-tight">$0</span>
              <span className="text-xl text-gray-500 line-through decoration-red-500 decoration-2">
                $29
              </span>
              <span className="text-gray-500 dark:text-gray-400 font-medium">/mo</span>
            </div>

            <ul className="space-y-4">
              {[
                "Unlimited Resume Generations",
                "Advanced AI Templates (Google Intelligence)",
                "Custom Domains & Hosting",
                "Analytics & Tracking",
                "24/7 Priority Support"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleCheckout}
              className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg bg-gray-900 hover:bg-gray-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Claim Free Lifetime Access
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              No credit card required. 100% discount applied automatically.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800"
            >
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-2">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Success!</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your Lifetime Enterprise Plan is now active. Welcome to the future of resumes!
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="mt-4 w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
