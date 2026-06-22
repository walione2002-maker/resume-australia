'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '@/stores/resume-store';

interface SortableSectionProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export function SortableSection({ id, label, children }: SortableSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { toggleSectionVisibility, sections } = useResumeStore();
  const section = sections.find((s) => s.id === id);
  const isVisible = section?.visible ?? true;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-4 rounded border bg-white dark:bg-zinc-900 shadow-sm overflow-hidden transition-colors ${
        isDragging ? 'border-[#1a9ceb] opacity-90 shadow-md' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center bg-white dark:bg-zinc-900 px-4 py-4 group hover:bg-[#f9fafd] transition-colors">
        <button
          {...attributes}
          {...listeners}
          className="mr-3 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
          title="Drag to reorder"
        >
          <GripVertical size={18} />
        </button>
        
        <button
          className="text-sm font-semibold flex-1 text-left text-gray-900 dark:text-gray-100 tracking-wide"
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSectionVisibility(id)}
            className={`p-1.5 rounded transition-colors ${
              isVisible ? 'text-gray-400 hover:text-gray-600' : 'text-gray-300 hover:text-gray-400'
            }`}
            title={isVisible ? "Hide section in preview" : "Show section in preview"}
          >
            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

