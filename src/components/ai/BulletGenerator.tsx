'use client';

import { useState } from 'react';
import { useResumeStore } from '@/stores/resume-store';
import { generateBullets, setGeminiApiKey, hasGeminiApiKey } from '@/lib/ai-client';
import { Sparkles, Plus, Loader2, KeyRound } from 'lucide-react';

export function BulletGenerator() {
  const [jobTitle, setJobTitle] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [bullets, setBullets] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [targetExpId, setTargetExpId] = useState<string>('');
  
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasKey, setHasKey] = useState(hasGeminiApiKey());

  const resumeData = useResumeStore();
  const experiences = resumeData.experience;

  const handleSaveKey = () => {
    if (apiKeyInput.trim()) {
      setGeminiApiKey(apiKeyInput.trim());
      setHasKey(true);
      setApiKeyInput('');
    }
  };

  const handleGenerate = async () => {
    if (!jobTitle.trim()) return;
    setLoading(true);
    setError('');
    setBullets([]);
    
    try {
      const response = await generateBullets({ jobTitle, context, count: 10 });
      if (response.error) {
        setError(response.error);
      } else {
        setBullets(response.bullets);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBullet = (bullet: string) => {
    if (!targetExpId && experiences.length > 0) {
      // Default to first if none selected
      setTargetExpId(experiences[0].id);
    }
    
    const id = targetExpId || (experiences.length > 0 ? experiences[0].id : null);
    if (!id) return; // Cannot add if no experience exists

    const exp = experiences.find(e => e.id === id);
    if (exp) {
      // Find first empty bullet to replace, or add a new one
      const emptyIndex = exp.bullets.findIndex(b => b.trim() === '');
      if (emptyIndex !== -1) {
        resumeData.updateBullet(id, emptyIndex, bullet);
      } else {
        resumeData.addBullet(id);
        // We have to wait for state to update, or just manually update it.
        // Zustand state is updated synchronously, but the component re-renders.
        // It's safer to just push it to the end manually via a store action if we built one,
        // but updateBullet on length-1 works if we assume addBullet appended it.
        setTimeout(() => {
          resumeData.updateBullet(id, exp.bullets.length, bullet);
        }, 0);
      }
    }
  };

  if (!hasKey) {
    return (
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100  mb-2 flex items-center gap-2">
          <KeyRound className="text-blue-500" /> API Key Required
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400  mb-4">
          To use the AI Bullet Generator, please provide a Google Gemini API key. It will be stored securely in your browser's local storage.
        </p>
        <div className="flex gap-2">
          <input
            type="password"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="AIzaSy..."
            className="flex-1 bg-zinc-50 dark:bg-zinc-950  border border-zinc-300  rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100  focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleSaveKey}
            className="bg-blue-600 hover:bg-blue-700 text-zinc-900 dark:text-zinc-100  px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Save Key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-zinc-50 dark:bg-zinc-950  border border-zinc-200 dark:border-zinc-800  rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100  mb-4 flex items-center gap-2">
          <Sparkles className="text-blue-500" /> AI Bullet Generator
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-500 dark:text-zinc-400  mb-1">Target Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full bg-white dark:bg-zinc-900  border border-zinc-300  rounded-lg px-4 py-2.5 text-zinc-900 dark:text-zinc-100  focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm text-zinc-500 dark:text-zinc-400  mb-1">Context (Optional)</label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. Focus on React performance optimization and leading a team of 5."
              className="w-full bg-white dark:bg-zinc-900  border border-zinc-300  rounded-lg px-4 py-2.5 text-zinc-900 dark:text-zinc-100  h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!jobTitle.trim() || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-zinc-900 dark:text-zinc-100  font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            {loading ? 'Generating...' : 'Generate Bullets'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {bullets.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 ">Generated Results</h4>
            {experiences.length > 0 && (
              <select
                value={targetExpId}
                onChange={(e) => setTargetExpId(e.target.value)}
                className="bg-zinc-50 dark:bg-zinc-950  border border-zinc-300  rounded-md text-xs text-zinc-900 dark:text-zinc-100  px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Add to...</option>
                {experiences.map(exp => (
                  <option key={exp.id} value={exp.id}>
                    {exp.position || 'Untitled Role'} at {exp.company || 'Company'}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div className="space-y-2">
            {bullets.map((bullet, i) => (
              <div key={i} className="group flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950  border border-zinc-200 dark:border-zinc-800  p-3 rounded-lg hover:border-zinc-300  transition-colors">
                <button
                  onClick={() => handleAddBullet(bullet)}
                  className="mt-0.5 p-1 bg-zinc-100  text-zinc-500 dark:text-zinc-400  rounded hover:bg-blue-600 hover:text-zinc-900 dark:text-zinc-100  transition-colors shrink-0"
                  title="Add to resume"
                >
                  <Plus size={14} />
                </button>
                <p className="text-sm text-zinc-600 dark:text-zinc-400  leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

