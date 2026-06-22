'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicTemplate } from '@/templates';
import { exampleResumes } from '@/data/example-data';
import { templateRegistry } from '@/data/template-registry';

// Convert the record to an array of examples
const examples = Object.values(exampleResumes);

export function HeroResumeRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.55);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % examples.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // A4 width in rem is 49.625. Get current root font size to determine pixel width dynamically.
        const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const a4WidthPx = 49.625 * baseFontSize;
        const newScale = entry.contentRect.width / a4WidthPx;
        setScale(newScale);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [isClient]); // Run after client mount

  if (!isClient) {
    return <div className="w-full h-full bg-white animate-pulse" />;
  }

  const currentExample = examples[currentIndex];
  // Find the exact template config from the registry
  const templateConfig = templateRegistry.find(t => t.id === currentExample.recommendedTemplate) || templateRegistry[0];

  return (
    <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(4px)', y: -10 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          {/* We wrap the DynamicTemplate in a container scaled to fit the 3/4 aspect ratio box natively */}
          <div 
            className="origin-top-left"
            style={{ 
              transform: `scale(${scale})`, // Adjust scale so A4 fits inside the box exactly
              width: '49.625rem', // Exactly 210mm at 96dpi in rem
              height: '70.1875rem', // Exactly 297mm at 96dpi in rem
              color: '#000'
            }}
          >
            <DynamicTemplate resumeData={currentExample.data} config={templateConfig} />
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Overlay gradient to fade out the bottom so it looks cleanly cut off in the box */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      
      {/* Indicator overlay to show it's auto-playing examples */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2 items-center bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-lg border border-zinc-200">
        <div className="flex gap-0.5">
          {examples.slice(0, 3).map((_, i) => (
             <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIndex % 3 ? 'bg-blue-500' : 'bg-zinc-300'}`} />
          ))}
        </div>
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{currentExample.category} Template</span>
      </div>
    </div>
  );
}
