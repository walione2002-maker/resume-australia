"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, GitMerge, Zap, Shield, Users, ArrowRight, Share2, DollarSign } from "lucide-react";

export default function NetworkPage() {
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setRegistered(true);
      setTimeout(() => setRegistered(false), 3000);
      setEmail("");
    }
  };

  const changelog = [
    {
      version: "v1.2.0",
      date: "August 15, 2026",
      title: "The AI Intelligence Update",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      details: [
        "Integrated Google AI for advanced high-fidelity bullet point generation.",
        "Added support for intelligent ATS scoring directly in the browser.",
        "Improved rendering performance by 45% on mobile devices."
      ]
    },
    {
      version: "v1.1.0",
      date: "June 02, 2026",
      title: "Enterprise Architecture Upgrade",
      icon: Shield,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      details: [
        "Migrated to Next.js 15 for faster compilation and enhanced edge network routing.",
        "Introduced Lifetime Enterprise tier (now 100% free for all users).",
        "Added fully encrypted storage for user portfolio data via Firebase."
      ]
    },
    {
      version: "v1.0.0",
      date: "April 10, 2026",
      title: "Public Launch Release",
      icon: GitMerge,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      details: [
        "Initial release of the interactive resume builder.",
        "Implemented drag-and-drop customizable templates.",
        "Added PDF generation and local caching functionalities."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Network & <span className="text-blue-600 dark:text-blue-400">Updates</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay in the loop with platform updates, changelogs, and join our partner network to grow alongside us.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Changelog Notice Board */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-200 dark:border-gray-800">
              <Activity className="w-6 h-6 text-gray-400" />
              <h2 className="text-2xl font-bold">Platform Changelog</h2>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
              {changelog.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${item.bg} ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-lg">{item.version}</span>
                      <time className="text-sm font-medium text-gray-500">{item.date}</time>
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">{item.title}</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {item.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1 block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Affiliates & Registration */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold">Partner Network</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join our Affiliate and Sponsorship program to help us spread the word. Earn perks and recognition within the community.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-start space-x-4">
                  <Share2 className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Affiliate Links</h4>
                    <p className="text-xs text-gray-500 mt-1">Mock Code: <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-pink-600 dark:text-pink-400">REF-X920-AA</code></p>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-start space-x-4">
                  <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Sponsorships</h4>
                    <p className="text-xs text-gray-500 mt-1">Connect your brand with top talent. Contact us for API access and tracking modules.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-xl text-white space-y-6 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-white/10">
                <Users className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Register for Updates</h3>
                <p className="text-blue-100 text-sm mb-6">
                  Get notified about new templates, AI tools, and affiliate drops.
                </p>
                <form onSubmit={handleRegister} className="space-y-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                  />
                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-white text-blue-700 font-bold py-3 px-4 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    <span>{registered ? "Registered!" : "Join Network"}</span>
                    {!registered && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
