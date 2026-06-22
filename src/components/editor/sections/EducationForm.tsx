'use client';

import { useState, type ChangeEvent } from 'react';
import { useResumeStore } from '@/stores/resume-store';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export function EducationForm() {
  const education = useResumeStore((s) => s.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleFieldChange = (
    id: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateEducation(id, { [e.target.name]: e.target.value });
  };

  const handleDelete = (id: string) => {
    if (confirmDeleteId === id) {
      removeEducation(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  return (
    <div className="space-y-4">
      {education.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
          No education entries yet. Click below to add one.
        </p>
      )}

      {education.map((edu, idx) => (
        <div
          key={edu.id}
          className="relative rounded-xl border border-zinc-300  bg-zinc-100  p-4 space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 ">
              <GraduationCap className="h-4 w-4 text-blue-400" />
              Entry {idx + 1}
              {edu.institution && ` — ${edu.institution}`}
            </span>
            <button
              type="button"
              onClick={() => handleDelete(edu.id)}
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                confirmDeleteId === edu.id
                  ? 'bg-red-600 text-zinc-900 dark:text-zinc-100 '
                  : 'text-red-400 hover:text-red-300 hover:bg-zinc-700'
              }`}
            >
              {confirmDeleteId === edu.id ? (
                'Confirm?'
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Institution */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
              Institution
            </label>
            <input
              name="institution"
              defaultValue={edu.institution}
              placeholder="University of Melbourne"
              onChange={(e) => handleFieldChange(edu.id, e)}
              className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Degree + Field */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Degree
              </label>
              <input
                name="degree"
                defaultValue={edu.degree}
                placeholder="Bachelor of Science"
                onChange={(e) => handleFieldChange(edu.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Field of Study
              </label>
              <input
                name="field"
                defaultValue={edu.field}
                placeholder="Computer Science"
                onChange={(e) => handleFieldChange(edu.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
              Location
            </label>
            <input
              name="location"
              defaultValue={edu.location}
              placeholder="Melbourne, VIC"
              onChange={(e) => handleFieldChange(edu.id, e)}
              className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Start Date
              </label>
              <input
                name="startDate"
                defaultValue={edu.startDate}
                placeholder="Feb 2018"
                onChange={(e) => handleFieldChange(edu.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                End Date
              </label>
              <input
                name="endDate"
                defaultValue={edu.endDate}
                placeholder="Dec 2021"
                onChange={(e) => handleFieldChange(edu.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* GPA + Honors */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                GPA
              </label>
              <input
                name="gpa"
                defaultValue={edu.gpa}
                placeholder="3.8 / 4.0"
                onChange={(e) => handleFieldChange(edu.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Honors / Awards
              </label>
              <input
                name="honors"
                defaultValue={edu.honors}
                placeholder="Summa Cum Laude"
                onChange={(e) => handleFieldChange(edu.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add entry */}
      <button
        type="button"
        onClick={addEducation}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300  py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400  transition-colors hover:border-blue-500 hover:text-blue-400"
      >
        <Plus className="h-4 w-4" />
        Add Education
      </button>
    </div>
  );
}


