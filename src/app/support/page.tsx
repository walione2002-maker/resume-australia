"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by going to the login page and clicking on the 'Forgot Password' link. A password reset link will be sent to your registered email address.",
  },
  {
    question: "Can I export my resume in PDF format?",
    answer: "Yes, once you have finished building your resume, you can click the 'Download PDF' button on the top right corner of the editor to save it as a high-quality PDF.",
  },
  {
    question: "How does the ATS scoring system work?",
    answer: "Our ATS scoring system analyzes your resume against standard industry keywords and formatting rules to ensure it can be easily parsed by Applicant Tracking Systems used by employers.",
  },
  {
    question: "Is my personal data secure?",
    answer: "Absolutely. We use industry-standard encryption to protect your personal data. We do not share or sell your data to third parties. Please review our Privacy Policy for more details.",
  },
  {
    question: "How can I upgrade my subscription?",
    answer: "You can upgrade your subscription at any time by visiting the Pricing page or clicking on 'Upgrade' in your account settings.",
  },
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Support & Troubleshooting</h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Find answers to common questions or reach out to our team directly.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{faq.question}</span>
                  <span className="ml-4 text-zinc-400 dark:text-zinc-500">
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
          {submitStatus === "success" && (
            <div className="absolute top-0 left-0 w-full bg-emerald-500 text-white p-4 text-center font-medium animate-in slide-in-from-top-full duration-300">
              Your message has been sent successfully! We will get back to you soon.
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 mt-2">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border ${
                    errors.name ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-zinc-900 dark:text-zinc-100`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border ${
                    errors.email ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-zinc-900 dark:text-zinc-100`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border ${
                  errors.message ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none text-zinc-900 dark:text-zinc-100`}
                placeholder="How can we help you?"
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-blue-500/20"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
