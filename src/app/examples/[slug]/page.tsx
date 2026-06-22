"use client";

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { exampleResumes } from '@/data/example-data';
import { templateRegistry } from '@/data/template-registry';
import { DynamicTemplate } from '@/templates';
import { ArrowLeft } from 'lucide-react';

export default function ExampleCVPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const example = exampleResumes[slug];
  
  if (!example) {
    notFound();
  }

  const config = templateRegistry.find(t => t.id === example.recommendedTemplate) || templateRegistry[0];

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center pb-20 font-sans">
      
      {/* Top Navigation */}
      <div className="w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-50 shadow-sm flex items-center justify-between">
        <Link href="/examples" className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <ArrowLeft size={16} /> Back to Examples
        </Link>
        <div className="flex gap-4">
          <Link 
            href="/resume-builder"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-md transition-all"
          >
            Build a Resume Like This
          </Link>
        </div>
      </div>

      {/* Header Info */}
      <div className="max-w-4xl w-full px-6 py-12 text-center">
        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold uppercase tracking-wider rounded-full mb-4">
          {example.category}
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          {example.title} Resume Example
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          This is a full, professionally designed example of a {example.title} resume using our <strong className="text-gray-900 dark:text-white">{config.name}</strong> template.
        </p>
      </div>

      {/* The Rendered CV */}
      <div className="w-full max-w-[210mm] shadow-2xl bg-white mx-auto relative group">
        <div className="w-full" style={{ minHeight: '297mm', color: '#000' }}>
          <DynamicTemplate resumeData={example.data} config={config} />
        </div>
        
        {/* Overlay CTA that appears on hover for larger screens */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center backdrop-blur-sm">
          <Link 
            href="/resume-builder"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-lg rounded-xl shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-300"
          >
            Create Your Professional Resume
          </Link>
        </div>
      </div>

    </div>
  );
}
