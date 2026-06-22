'use client';

import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { PHRASE_LIBRARY, searchPhrases } from '@/lib/phrase-library';
import { useResumeStore } from '@/stores/resume-store';

const CATEGORIES = ['All', ...Array.from(new Set(PHRASE_LIBRARY.map(p => p.category)))];

export function PhraseSearch() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [targetExpId, setTargetExpId] = useState<string>('');
  
  const resumeData = useResumeStore();
  const experiences = resumeData.experience;

  const results = useMemo(() => {
    return searchPhrases(query, selectedCategory === 'All' ? undefined : selectedCategory);
  }, [query, selectedCategory]);

  const handleAddPhrase = (text: string) => {
    if (!targetExpId && experiences.length > 0) {
      setTargetExpId(experiences[0].id);
    }
    
    const id = targetExpId || (experiences.length > 0 ? experiences[0].id : null);
    if (!id) return;

    const exp = experiences.find(e => e.id === id);
    if (exp) {
      const emptyIndex = exp.bullets.findIndex(b => b.trim() === '');
      if (emptyIndex !== -1) {
        resumeData.updateBullet(id, emptyIndex, text);
      } else {
        resumeData.addBullet(id);
        setTimeout(() => {
          resumeData.updateBullet(id, exp.bullets.length, text);
        }, 0);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="bg-zinc-50 dark:bg-zinc-950  border border-zinc-200 dark:border-zinc-800  rounded-xl p-5 mb-6">
        {/* Search Header */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-zinc-500 dark:text-zinc-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phrases (e.g. 'leadership', 'optimized')..."
            className="w-full bg-white dark:bg-zinc-900  border border-zinc-300  rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-zinc-100  focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-zinc-900 dark:text-zinc-100 ' 
                  : 'bg-zinc-100  text-zinc-500 dark:text-zinc-400  hover:bg-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Target Selector */}
        {experiences.length > 0 && (
          <div className="mb-4 flex items-center justify-between bg-white dark:bg-zinc-900  px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 ">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 ">Add phrases to:</span>
            <select
              value={targetExpId}
              onChange={(e) => setTargetExpId(e.target.value)}
              className="bg-transparent text-sm text-zinc-900 dark:text-zinc-100  outline-none cursor-pointer max-w-[200px] truncate"
            >
              {experiences.map(exp => (
                <option key={exp.id} value={exp.id} className="bg-zinc-50 dark:bg-zinc-950 ">
                  {exp.position || 'Untitled Role'} at {exp.company || 'Company'}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Results */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent pr-2">
          {results.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 dark:text-zinc-400 text-sm">
              No phrases found matching your search.
            </div>
          ) : (
            results.map((phrase) => (
              <div key={phrase.id} className="group relative bg-white dark:bg-zinc-900  border border-zinc-200 dark:border-zinc-800  p-4 rounded-lg hover:border-blue-500/50 transition-colors">
                <p className="text-sm text-zinc-600 dark:text-zinc-400  pr-8">{phrase.text}</p>
                <div className="mt-2 flex gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">{phrase.category}</span>
                </div>
                <button
                  onClick={() => handleAddPhrase(phrase.text)}
                  className="absolute top-4 right-4 p-1.5 bg-zinc-100  text-zinc-500 dark:text-zinc-400  rounded-md opacity-0 group-hover:opacity-100 hover:bg-blue-600 hover:text-zinc-900 dark:text-zinc-100  transition-all"
                  title="Add to resume"
                >
                  <Plus size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

