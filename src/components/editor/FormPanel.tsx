'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useResumeStore } from '@/stores/resume-store';
import { SortableSection } from './SortableSection';
import { Wand2 } from 'lucide-react';

// Import all section forms
import { PersonalInfoForm } from './sections/PersonalInfoForm';
import { ExperienceForm } from './sections/ExperienceForm';
import { EducationForm } from './sections/EducationForm';
import { SkillsForm } from './sections/SkillsForm';
import { ProjectsForm } from './sections/ProjectsForm';
import { CertificationsForm } from './sections/CertificationsForm';
import { LanguagesForm } from './sections/LanguagesForm';

interface FormPanelProps {
  onOpenWizard: () => void;
}

export function FormPanel({ onOpenWizard }: FormPanelProps) {
  const { sections, reorderSections } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      
      const newOrder = arrayMove(sections, oldIndex, newIndex).map((s, index) => ({
        ...s,
        order: index,
      }));
      
      reorderSections(newOrder);
    }
  };

  const renderSectionContent = (type: string) => {
    switch (type) {
      case 'personal': return <PersonalInfoForm />;
      case 'experience': return <ExperienceForm />;
      case 'education': return <EducationForm />;
      case 'skills': return <SkillsForm />;
      case 'projects': return <ProjectsForm />;
      case 'certifications': return <CertificationsForm />;
      case 'languages': return <LanguagesForm />;
      default: return <div className="text-zinc-500 dark:text-zinc-400 italic p-4">Custom section builder coming soon.</div>;
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-transparent p-6 sm:p-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="max-w-3xl mx-auto pb-32">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Resume Details</h2>
          <p className="text-gray-500 text-sm">
            Fill out your information below. Drag sections to reorder them on the template.
          </p>
        </div>

        <div className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl flex flex-col sm:flex-row items-center gap-6 justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center shrink-0">
              <Wand2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-lg">AI Input Wizard</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Let our intelligent AI guide you step-by-step.</p>
            </div>
          </div>
          <button
            onClick={onOpenWizard}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Open Wizard
          </button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {/* We map over the sorted sections to render them in the correct order */}
            {[...sections].sort((a, b) => a.order - b.order).map((section) => (
              <SortableSection key={section.id} id={section.id} label={section.label}>
                {renderSectionContent(section.type)}
              </SortableSection>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

