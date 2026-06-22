'use client';

import { useState, type ChangeEvent } from 'react';
import { useResumeStore } from '@/stores/resume-store';
import { Plus, Trash2, Minus, Building2 } from 'lucide-react';

export function ExperienceForm() {
  const experience = useResumeStore((s) => s.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleFieldChange = (
    id: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateExperience(id, { [e.target.name]: e.target.value });
  };

  const handleCurrentToggle = (id: string, current: boolean) => {
    updateExperience(id, { current, endDate: current ? '' : '' });
  };

  const handleDelete = (id: string) => {
    if (confirmDeleteId === id) {
      removeExperience(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-gray-500">
          Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).
        </p>
      </div>

      {experience.length === 0 && (
        <p className="text-sm text-gray-500 italic">
          No experience entries yet. Click below to add one.
        </p>
      )}

      {experience.map((exp, idx) => (
        <div
          key={exp.id}
          className="relative rounded border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 p-6 space-y-6 hover:border-gray-300 transition-colors"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              <Building2 className="h-4 w-4 text-gray-400" />
              {exp.position || exp.company ? `${exp.position}${exp.position && exp.company ? ' at ' : ''}${exp.company}` : '(Not specified)'}
            </span>
            <button
              type="button"
              onClick={() => handleDelete(exp.id)}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                confirmDeleteId === exp.id
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              {confirmDeleteId === exp.id ? 'Confirm?' : <Trash2 className="h-4 w-4" />}
            </button>
          </div>

          {/* Job Title + Employer */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Job Title</label>
              <input
                name="position"
                defaultValue={exp.position}
                onChange={(e) => handleFieldChange(exp.id, e)}
                className="w-full rounded bg-[#f9fafd] border border-transparent px-4 py-3 text-sm text-gray-900 dark:text-gray-100 transition-colors focus:bg-white dark:bg-zinc-900 focus:border-b-2 focus:border-b-[#1a9ceb] focus:outline-none hover:bg-gray-100"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Employer</label>
              <input
                name="company"
                defaultValue={exp.company}
                onChange={(e) => handleFieldChange(exp.id, e)}
                className="w-full rounded bg-[#f9fafd] border border-transparent px-4 py-3 text-sm text-gray-900 dark:text-gray-100 transition-colors focus:bg-white dark:bg-zinc-900 focus:border-b-2 focus:border-b-[#1a9ceb] focus:outline-none hover:bg-gray-100"
              />
            </div>
          </div>

          {/* Dates & City */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Start Date</label>
              <input
                name="startDate"
                defaultValue={exp.startDate}
                placeholder="MM / YYYY"
                onChange={(e) => handleFieldChange(exp.id, e)}
                className="w-full rounded bg-[#f9fafd] border border-transparent px-4 py-3 text-sm text-gray-900 dark:text-gray-100 transition-colors focus:bg-white dark:bg-zinc-900 focus:border-b-2 focus:border-b-[#1a9ceb] focus:outline-none hover:bg-gray-100"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">End Date</label>
              <input
                name="endDate"
                defaultValue={exp.endDate}
                placeholder="MM / YYYY"
                disabled={exp.current}
                onChange={(e) => handleFieldChange(exp.id, e)}
                className="w-full rounded bg-[#f9fafd] border border-transparent px-4 py-3 text-sm text-gray-900 dark:text-gray-100 transition-colors disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed focus:bg-white dark:bg-zinc-900 focus:border-b-2 focus:border-b-[#1a9ceb] focus:outline-none hover:bg-gray-100"
              />
              <label className="flex items-center gap-2 cursor-pointer select-none mt-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => handleCurrentToggle(exp.id, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#1a9ceb] focus:ring-[#1a9ceb]"
                />
                <span className="text-xs text-gray-500">I currently work here</span>
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">City</label>
              <input
                name="location"
                defaultValue={exp.location}
                onChange={(e) => handleFieldChange(exp.id, e)}
                className="w-full rounded bg-[#f9fafd] border border-transparent px-4 py-3 text-sm text-gray-900 dark:text-gray-100 transition-colors focus:bg-white dark:bg-zinc-900 focus:border-b-2 focus:border-b-[#1a9ceb] focus:outline-none hover:bg-gray-100"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-500">Description</label>
            </div>
            <textarea
              name="description"
              rows={4}
              defaultValue={exp.description}
              placeholder="e.g. Created and implemented a custom CSS grid system..."
              onChange={(e) => handleFieldChange(exp.id, e)}
              className="w-full resize-y rounded bg-[#f9fafd] border border-transparent px-4 py-3 text-sm text-gray-900 dark:text-gray-100 transition-colors focus:bg-white dark:bg-zinc-900 focus:border-b-2 focus:border-b-[#1a9ceb] focus:outline-none hover:bg-gray-100"
            />
          </div>
        </div>
      ))}

      {/* Add entry */}
      <button
        type="button"
        onClick={addExperience}
        className="flex items-center gap-2 text-sm font-bold text-[#1a9ceb] hover:text-[#1588cf] transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add employment
      </button>
    </div>
  );
}


