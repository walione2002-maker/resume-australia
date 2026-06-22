"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { templateRegistry } from '@/data/template-registry';
import { DynamicTemplate } from '@/templates';
import { exampleResumes } from '@/data/example-data';
import { TemplateConfig } from '@/types';

// Categories matching our registry
const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Creative', 'Academic'];

// Use a generic dummy data payload for the templates gallery
const dummyData = Object.values(exampleResumes)[0]?.data || null;

function TemplatePreviewCard({ config }: { config: TemplateConfig }) {
  return (
    <div className="group relative flex flex-col bg-white dark:bg-zinc-950 dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Scaled Preview */}
      <div className="w-full aspect-[210/297] bg-zinc-100 dark:bg-zinc-950 relative overflow-hidden flex @container border-b border-gray-100 dark:border-slate-800">
        <div 
          className="absolute top-0 left-0 origin-top-left pointer-events-none"
          style={{ 
            width: '210mm', 
            height: '297mm',
            transform: 'scale(calc(100cqw / 793.7px))', 
          }}
        >
          <div className="w-full h-full bg-white text-black overflow-hidden">
            {dummyData && <DynamicTemplate resumeData={dummyData} config={config} />}
          </div>
        </div>
        
        {/* Hover Overlay - Always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 bg-black/5 md:bg-black/60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-none md:backdrop-blur-sm z-10">
          <Link 
            href="/resume-builder"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            onClick={() => {
              // Usually we'd use a search param or push to a global store, 
              // for now we link to builder.
            }}
          >
            Use Template
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 border-t border-gray-100 dark:border-slate-800">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {config.name}
          </h3>
          <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider rounded">
            {config.layout}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {config.description}
        </p>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [activeIndustry, setActiveIndustry] = useState<string>('Technology');

  const visibleTemplates = templateRegistry.filter(t => t.industry === activeIndustry);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight mb-4">
            50+ Premium Templates
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Choose from dozens of pixel-perfect layouts scientifically designed for your specific industry. Switch templates instantly without losing your data.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {INDUSTRIES.map(industry => (
            <button
              key={industry}
              onClick={() => setActiveIndustry(industry)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 shadow-sm ${
                activeIndustry === industry
                  ? 'bg-blue-600 text-white scale-105 shadow-blue-500/25'
                  : 'bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {visibleTemplates.map(config => (
            <TemplatePreviewCard key={config.id} config={config} />
          ))}
        </div>

      </div>
    </div>
  );
}
