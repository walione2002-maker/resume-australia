"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { exampleResumes } from '@/data/example-data';
import { templateRegistry } from '@/data/template-registry';
import { DynamicTemplate } from '@/templates';

const CATEGORIES = ['Technology', 'Finance', 'Healthcare', 'Creative', 'Academic'];

export default function ExamplesGalleryPage() {
  const [activeCategory, setActiveCategory] = useState('Technology');

  const examples = Object.entries(exampleResumes).map(([slug, data]) => ({ slug, ...data }));
  
  const filteredExamples = examples.filter(ex => ex.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight mb-4">
            Professional Resume Examples
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Browse our curated collection of industry-specific resume examples. See how top professionals structure their experience.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 shadow-sm ${
                activeCategory === category
                  ? 'bg-blue-600 text-white scale-105 shadow-blue-500/25'
                  : 'bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredExamples.map(example => {
            const config = templateRegistry.find(t => t.id === example.recommendedTemplate) || templateRegistry[0];

            return (
              <Link 
                href={`/examples/${example.slug}`}
                key={example.slug} 
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              >
                {/* Visual Preview */}
                <div className="w-full aspect-[210/297] relative overflow-hidden flex border-b border-gray-100 dark:border-slate-800 @container bg-zinc-100 dark:bg-zinc-950">
                  <div 
                    className="absolute top-0 left-0 origin-top-left pointer-events-none group-hover:scale-[1.02] transition-transform duration-500"
                    style={{ 
                      width: '210mm', 
                      height: '297mm',
                      transform: 'scale(calc(100cqw / 793.7px))', 
                    }}
                  >
                    <div className="w-full h-full bg-white text-black overflow-hidden">
                      <DynamicTemplate resumeData={example.data} config={config} />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
                      {example.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {example.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    View full example →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        
        {filteredExamples.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No examples found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
