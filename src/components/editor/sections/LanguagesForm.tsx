'use client';

import { type ChangeEvent } from 'react';
import { useResumeStore } from '@/stores/resume-store';
import { Plus, Trash2, Languages as LanguagesIcon } from 'lucide-react';
import type { LanguageEntry } from '@/types';

const proficiencyOptions: LanguageEntry['proficiency'][] = [
  'Native',
  'Fluent',
  'Advanced',
  'Intermediate',
  'Basic',
];

export function LanguagesForm() {
  const languages = useResumeStore((s) => s.languages);
  const addLanguage = useResumeStore((s) => s.addLanguage);
  const updateLanguage = useResumeStore((s) => s.updateLanguage);
  const removeLanguage = useResumeStore((s) => s.removeLanguage);

  const handleFieldChange = (
    id: string,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    updateLanguage(id, { [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      {languages.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
          No languages added. Showcase your multilingual skills.
        </p>
      )}

      {languages.map((lang, idx) => (
        <div
          key={lang.id}
          className="rounded-xl border border-zinc-300  bg-zinc-100  p-4 space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 ">
              <LanguagesIcon className="h-4 w-4 text-blue-400" />
              Language {idx + 1}
              {lang.language && ` — ${lang.language}`}
            </span>
            <button
              type="button"
              onClick={() => removeLanguage(lang.id)}
              className="rounded-md p-1 text-red-400 hover:text-red-300 hover:bg-zinc-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Language + Proficiency */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Language
              </label>
              <input
                name="language"
                defaultValue={lang.language}
                placeholder="English"
                onChange={(e) => handleFieldChange(lang.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Proficiency
              </label>
              <select
                name="proficiency"
                value={lang.proficiency}
                onChange={(e) => handleFieldChange(lang.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none cursor-pointer"
              >
                {proficiencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      {/* Add language */}
      <button
        type="button"
        onClick={addLanguage}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300  py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400  transition-colors hover:border-blue-500 hover:text-blue-400"
      >
        <Plus className="h-4 w-4" />
        Add Language
      </button>
    </div>
  );
}


