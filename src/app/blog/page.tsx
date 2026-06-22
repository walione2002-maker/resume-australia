import React from 'react';
import { BookOpen, FileText, Briefcase, Lightbulb, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl mb-2 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Career Resources Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Expert advice, comprehensive guides, and actionable tips to help you land your dream job and advance your career.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Module 1 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Writing A Resume</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Learn how to structure your experience, highlight your achievements, and bypass ATS filters to get noticed by recruiters.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Choosing the right format (Chronological vs. Functional)</span>
              </li>
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Writing impactful bullet points with metrics</span>
              </li>
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Tailoring your resume for specific job descriptions</span>
              </li>
            </ul>
            <a href="#resume-dos-and-donts" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Read Guide <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Module 2 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cover Letters</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Master the art of the cover letter. Tell your unique story and explain why you're the perfect fit beyond your resume.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Crafting a compelling opening hook</span>
              </li>
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Showcasing cultural fit and passion</span>
              </li>
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Ending with a strong call-to-action</span>
              </li>
            </ul>
            <a href="#" className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium hover:underline">
              Read Guide <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Module 3 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Career Advice</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Navigate your career path with confidence. From salary negotiation to networking and personal branding.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Strategies for successful salary negotiation</span>
              </li>
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Building a strong LinkedIn presence</span>
              </li>
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Navigating career transitions and pivots</span>
              </li>
            </ul>
            <a href="#" className="inline-flex items-center text-amber-600 dark:text-amber-400 font-medium hover:underline">
              Explore Advice <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>

        {/* Featured Content Area */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-16" id="resume-dos-and-donts">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Resume Do's & Don'ts</h3>
              <p className="text-gray-600 dark:text-gray-400">Quick reference guide to ensure your resume meets industry standards.</p>
            </div>

            {/* Markdown-like Table for Do's and Don'ts */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-green-50/50 dark:bg-green-900/10 p-8 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
                  <h4 className="flex items-center text-lg font-bold text-green-800 dark:text-green-400 mb-6">
                    <CheckCircle className="w-5 h-5 mr-2" /> Do This
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Keep it to one page if you have less than 10 years of experience.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Use reverse-chronological order for your work experience.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Quantify achievements (e.g., "Increased sales by 20% over 6 months").</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Save and submit your resume as a PDF to preserve formatting.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-50/50 dark:bg-red-900/10 p-8">
                  <h4 className="flex items-center text-lg font-bold text-red-800 dark:text-red-400 mb-6">
                    <XCircle className="w-5 h-5 mr-2" /> Don't Do This
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Include a photo or personal details (age, marital status).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Use complex layouts, graphics, or multiple columns that confuse ATS systems.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">List an objective statement instead of a professional summary.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Include irrelevant hobbies or temporary jobs not related to the role.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Callout Card */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8 border border-indigo-100 dark:border-indigo-800/50 flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pro Tip: The XYZ Formula</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Google recruiters recommend using the XYZ formula for bullet points: "Accomplished [X] as measured by [Y], by doing [Z]."
                </p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-mono text-sm text-gray-600 dark:text-gray-400">
                  Instead of: "Grew revenue for the business"<br/>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">Use: "Grew revenue by 15% in Q3 by implementing a new email drip campaign targeting churned users."</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
