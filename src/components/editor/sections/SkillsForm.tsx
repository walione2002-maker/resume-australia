'use client';

import { useState, type KeyboardEvent, type ChangeEvent } from 'react';
import { useResumeStore } from '@/stores/resume-store';
import { Plus, Trash2, X, Wrench } from 'lucide-react';

export function SkillsForm() {
  const skills = useResumeStore((s) => s.skills);
  const addSkillCategory = useResumeStore((s) => s.addSkillCategory);
  const updateSkillCategory = useResumeStore((s) => s.updateSkillCategory);
  const removeSkillCategory = useResumeStore((s) => s.removeSkillCategory);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);

  // Track per-category input values
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});

  const handleCategoryNameChange = (
    id: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateSkillCategory(id, { name: e.target.value });
  };

  const handleSkillInputChange = (
    categoryId: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setSkillInputs((prev) => ({ ...prev, [categoryId]: e.target.value }));
  };

  const handleSkillKeyDown = (
    categoryId: string,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = (skillInputs[categoryId] ?? '').trim();
      if (value) {
        addSkill(categoryId, value);
        setSkillInputs((prev) => ({ ...prev, [categoryId]: '' }));
      }
    }
  };

  const handleAddSkillButton = (categoryId: string) => {
    const value = (skillInputs[categoryId] ?? '').trim();
    if (value) {
      addSkill(categoryId, value);
      setSkillInputs((prev) => ({ ...prev, [categoryId]: '' }));
    }
  };

  return (
    <div className="space-y-4">
      {skills.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
          No skill categories yet. Add one to get started.
        </p>
      )}

      {skills.map((category, idx) => (
        <div
          key={category.id}
          className="rounded-xl border border-zinc-300  bg-zinc-100  p-4 space-y-3"
        >
          {/* Category header */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 ">
              <Wrench className="h-4 w-4 text-blue-400" />
              Category {idx + 1}
            </span>
            <button
              type="button"
              onClick={() => removeSkillCategory(category.id)}
              className="rounded-md p-1 text-red-400 hover:text-red-300 hover:bg-zinc-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Category name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
              Category Name
            </label>
            <input
              defaultValue={category.name}
              placeholder="e.g. Frontend, Backend, DevOps"
              onChange={(e) => handleCategoryNameChange(category.id, e)}
              className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Skill tags */}
          {category.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIdx) => (
                <span
                  key={skillIdx}
                  className="flex items-center gap-1 rounded-full bg-blue-600/20 border border-blue-500/30 px-3 py-1 text-xs font-medium text-blue-300"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(category.id, skillIdx)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-blue-500/30 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Skill input */}
          <div className="flex gap-2">
            <input
              value={skillInputs[category.id] ?? ''}
              placeholder="Type a skill and press Enter"
              onChange={(e) => handleSkillInputChange(category.id, e)}
              onKeyDown={(e) => handleSkillKeyDown(category.id, e)}
              className="flex-1 rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleAddSkillButton(category.id)}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100  transition-colors hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      {/* Add category */}
      <button
        type="button"
        onClick={addSkillCategory}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300  py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400  transition-colors hover:border-blue-500 hover:text-blue-400"
      >
        <Plus className="h-4 w-4" />
        Add Skill Category
      </button>
    </div>
  );
}

