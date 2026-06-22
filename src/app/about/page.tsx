"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Rocket, Layers, Sparkles } from "lucide-react";

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Category C: Our Company Deployments
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            The Future of Resumes
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are redefining how professionals showcase their careers through immersive, high-performance web experiences.
          </p>
        </motion.section>

        {/* Vision Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Platform Vision</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Our mission is to eliminate the static, boring PDF resume. By bringing modern web technologies into the hands of job seekers, we enable a dynamic, interactive, and visually stunning representation of professional history. Your career is not flat; your resume shouldn't be either.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Globe, title: "Global Reach" },
                { icon: Rocket, title: "Blazing Fast" },
                { icon: Code2, title: "Developer Ready" },
                { icon: Layers, title: "Scalable" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center text-center space-y-3">
                  <item.icon className="w-8 h-8 text-blue-500" />
                  <span className="font-medium">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* AI Engine Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8 md:p-12 shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Cpu className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-semibold backdrop-blur-md">
              Google Intelligence
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Immersive AI Assistance</h2>
            <p className="text-lg md:text-xl text-indigo-100 leading-relaxed">
              We leverage advanced Google AI intelligence to upgrade your resume beyond flat text. By integrating modern language models and smart bullet points, we deliver real-time, interactive feedback that runs smoothly directly in your browser.
            </p>
            <ul className="space-y-4 text-indigo-200 mt-8">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
                <strong>Smart ATS Scoring:</strong> High-fidelity local resume optimization.
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
                <strong>Google Intelligence:</strong> Seamlessly embedding powerful phrasing and insights.
              </li>
            </ul>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
