'use client';

import { useState } from 'react';
import { useResumeStore } from '@/stores/resume-store';
import { scoreResume } from '@/lib/ats-scorer';
import { analyzeVerbs } from '@/lib/verb-analyzer';
import { Target, CheckCircle2, XCircle, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';
import { ATSResult, VerbWarning } from '@/types';

export function ATSPanel() {
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<ATSResult | null>(null);
  const [verbWarnings, setVerbWarnings] = useState<VerbWarning[]>([]);
  
  const resumeData = useResumeStore();

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    
    // 1. Score against Job Description
    const text = resumeData.getPlainText();
    const atsScore = scoreResume(text, jobDescription);
    setResult(atsScore);

    // 2. Analyze action verbs
    const warnings = analyzeVerbs(resumeData.experience);
    setVerbWarnings(warnings);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-500 stroke-green-500';
    if (score >= 40) return 'text-yellow-500 stroke-yellow-500';
    return 'text-red-500 stroke-red-500';
  };

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900  p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
      <div className="max-w-2xl mx-auto pb-32">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100  mb-2 flex items-center gap-2">
            <Target className="text-blue-500" />
            ATS Optimization
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400  text-sm">
            Paste the job description below. We'll analyze your resume against ATS algorithms and flag weak action verbs.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-zinc-50 dark:bg-zinc-950  border border-zinc-200 dark:border-zinc-800  rounded-xl p-5 mb-8 shadow-sm">
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400  mb-2">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job description here..."
            className="w-full h-40 bg-white dark:bg-zinc-900  border border-zinc-300  rounded-lg p-4 text-zinc-900 dark:text-zinc-100  text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none mb-4"
          />
          <button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-zinc-900 dark:text-zinc-100  font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze Match
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            
            {/* Score Ring */}
            <div className="bg-zinc-50 dark:bg-zinc-950  border border-zinc-200 dark:border-zinc-800  rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100  mb-6">Match Score</h3>
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" className="stroke-zinc-800" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    className={`${getScoreColor(result.score)} transition-all duration-1000 ease-out`} 
                    strokeWidth="8"
                    strokeDasharray={`${(result.score / 100) * 283} 283`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-black ${getScoreColor(result.score).split(' ')[0]}`}>
                    {Math.round(result.score)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-950  border border-zinc-200 dark:border-zinc-800  rounded-xl p-5">
                <h4 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400  mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" /> Matched Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.matchedKeywords.length === 0 && <span className="text-zinc-500 dark:text-zinc-400 text-sm italic">None found</span>}
                  {result.matchedKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 bg-green-500/10 text-green-400 text-xs rounded-md border border-green-500/20">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950  border border-zinc-200 dark:border-zinc-800  rounded-xl p-5">
                <h4 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400  mb-4 flex items-center gap-2">
                  <XCircle size={16} className="text-red-500" /> Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.length === 0 && <span className="text-zinc-500 dark:text-zinc-400 text-sm italic">None missing!</span>}
                  {result.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 bg-red-500/10 text-red-400 text-xs rounded-md border border-red-500/20">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <Lightbulb size={16} /> AI Suggestions
                </h4>
                <ul className="space-y-2">
                  {result.suggestions.map((sug, i) => (
                    <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400  flex items-start gap-2">
                      <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
                      {sug}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Verb Warnings */}
        {verbWarnings.length > 0 && (
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-yellow-500 mb-4 flex items-center gap-2">
              <AlertTriangle size={16} /> Weak Action Verbs Detected
            </h4>
            <div className="space-y-4">
              {verbWarnings.map((warning, i) => (
                <div key={i} className="bg-zinc-50 dark:bg-zinc-950  border border-zinc-200 dark:border-zinc-800  p-4 rounded-lg">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400  mb-3">
                    <span className="text-red-400 font-bold bg-red-400/10 px-1 rounded">"{warning.weakVerb}"</span> is weak. Try these instead:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {warning.suggestions.map((sug, j) => (
                      <button
                        key={j}
                        onClick={() => {
                          const exp = resumeData.experience.find(e => e.id === warning.experienceId);
                          if (exp) {
                            const oldBullet = exp.bullets[warning.bulletIndex];
                            // Simple replacement of the first word
                            const newBullet = oldBullet.replace(new RegExp(`^${warning.weakVerb}\\b`, 'i'), sug);
                            resumeData.updateBullet(warning.experienceId, warning.bulletIndex, newBullet);
                            // Re-run analysis locally to hide this warning
                            setVerbWarnings(prev => prev.filter((_, idx) => idx !== i));
                          }
                        }}
                        className="text-xs bg-zinc-100  hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400  px-3 py-1.5 rounded-md transition-colors border border-zinc-300 "
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

