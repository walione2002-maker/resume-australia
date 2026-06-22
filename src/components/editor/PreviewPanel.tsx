'use client';

import { useResumeStore } from '@/stores/resume-store';
import { useTemplateStore } from '@/stores/template-store';
import { DynamicTemplate } from '@/templates';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PreviewPanel() {
  const resumeData = useResumeStore();
  const { getEffectiveConfig } = useTemplateStore();
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setScale(0.4);
      } else if (window.innerWidth < 640) {
        setScale(0.45);
      } else if (window.innerWidth < 1024) {
        setScale(0.6);
      } else if (window.innerWidth < 1280) {
        setScale(0.7);
      } else {
        setScale(0.8);
      }
    };
    
    // Initial scale
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config = getEffectiveConfig();

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.4));
  const handleZoomReset = () => setScale(0.8);

  return (
    <div className="relative w-full h-full bg-zinc-50 dark:bg-zinc-800/50 dark:bg-zinc-950  flex flex-col overflow-hidden">
      
      {/* Zoom Controls Overlay */}
      <div className="absolute bottom-6 right-8 z-50 flex items-center gap-2 bg-zinc-100  backdrop-blur border border-zinc-300  p-2 rounded-full shadow-2xl">
        <button onClick={handleZoomOut} className="p-2 text-zinc-500 dark:text-zinc-400  hover:text-zinc-900 dark:text-zinc-100 dark:text-zinc-100  rounded-full hover:bg-zinc-700 transition-colors">
          <ZoomOut size={18} />
        </button>
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 dark:text-zinc-400  min-w-[3ch] text-center">
          {Math.round(scale * 100)}%
        </span>
        <button onClick={handleZoomIn} className="p-2 text-zinc-500 dark:text-zinc-400  hover:text-zinc-900 dark:text-zinc-100  rounded-full hover:bg-zinc-700 transition-colors">
          <ZoomIn size={18} />
        </button>
        <div className="w-px h-4 bg-zinc-700 mx-1" />
        <button onClick={handleZoomReset} className="p-2 text-zinc-500 dark:text-zinc-400  hover:text-zinc-900 dark:text-zinc-100  rounded-full hover:bg-zinc-700 transition-colors" title="Fit to screen">
          <Maximize size={18} />
        </button>
      </div>

      {/* Workspace Area */}
      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 w-full flex justify-center py-12">
        
        {/* Transform Wrapper for Zooming */}
        <div 
          className="flex flex-col items-center pb-32"
          style={{ 
            width: `calc(210mm * ${scale})`,
            minHeight: `calc(297mm * ${scale})`
          }}
        >
          <div 
            className="transition-transform duration-200 ease-out origin-top flex flex-col gap-8"
            style={{ transform: `scale(${scale})` }}
          >
            {/* A4 Paper Container */}
            <div 
              id="resume-preview-page"
              className="bg-white dark:bg-zinc-950 dark:bg-zinc-900 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex-shrink-0 relative overflow-hidden"
              style={{ 
                width: '49.625rem', // Exact A4 width using rem instead of mm
                height: '70.1875rem', // Exact A4 height using rem instead of mm
                color: '#000' // Base reset for print
              }}
            >
              <DynamicTemplate resumeData={resumeData} config={config} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

