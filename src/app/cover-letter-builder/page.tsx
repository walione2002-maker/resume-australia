"use client";

import React, { useState } from 'react';
import { Sparkles, Download, FileText, CheckCircle2, Loader2, User, Briefcase, Building, Trophy } from 'lucide-react';

export default function CoverLetterBuilder() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    achievements: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = () => {
    if (!formData.name || !formData.role || !formData.company) {
      showToast('Please fill in Name, Role, and Company to generate.');
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generated = `Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.role} position at ${formData.company}. With a proven track record of delivering high-quality results and a deep passion for innovation, I am excited about the opportunity to contribute to your team.

${formData.achievements ? `Throughout my career, I have achieved significant milestones, including: \n${formData.achievements.split('\n').map(item => '- ' + item).join('\n')}\n\n` : ''}My unique blend of skills, coupled with my commitment to excellence, aligns perfectly with the goals of ${formData.company}. I thrive in collaborative environments and am always eager to tackle new challenges head-on.

Thank you for considering my application. I have attached my resume for your review and would welcome the opportunity to discuss how my background and skills would be a valuable addition to your team.

Sincerely,
${formData.name}`;
      
      setCoverLetter(generated);
      setIsGenerating(false);
      showToast('Cover letter generated successfully!');
    }, 2000);
  };

  const handleExport = (format: string) => {
    if (!coverLetter) {
      showToast('Please generate a cover letter first.');
      return;
    }
    showToast(`Successfully downloaded as ${format.toUpperCase()}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">AI Cover Letter Builder</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExport('txt')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              TXT
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-auto md:h-[calc(100vh-80px)] flex flex-col md:flex-row gap-8">
        
        {/* Left Panel: Form */}
        <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <h2 className="text-lg font-semibold mb-1">Your Details</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Provide the information needed to tailor your cover letter.</p>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            <div className="space-y-4">
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Role</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow dark:text-white"
                    placeholder="Senior Software Engineer"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow dark:text-white"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Key Achievements (Optional)</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <Trophy className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="achievements"
                    name="achievements"
                    rows={4}
                    value={formData.achievements}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow resize-none dark:text-white"
                    placeholder="Increased revenue by 20%...&#10;Led a team of 5 engineers..."
                  />
                </div>
              </div>

            </div>
          </div>
          
          <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Cover Letter
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden relative">
          
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview & Edit</h2>
             </div>
             {coverLetter && (
                <span className="text-xs font-medium px-2.5 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
             )}
          </div>

          <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 dark:bg-gray-900/20">
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 text-gray-400 dark:text-gray-500">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                <p className="animate-pulse">Crafting your professional story...</p>
              </div>
            ) : coverLetter ? (
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full h-full min-h-[300px] md:min-h-[500px] p-6 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-serif leading-relaxed text-base"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-8 text-gray-400 dark:text-gray-500 min-h-[300px] md:min-h-[500px]">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2">
                  <Sparkles className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Your Cover Letter Awaits</h3>
                <p className="max-w-sm">Fill out your details on the left and hit generate to let AI write a tailored cover letter for you.</p>
              </div>
            )}
          </div>

        </div>

      </main>

    </div>
  );
}
