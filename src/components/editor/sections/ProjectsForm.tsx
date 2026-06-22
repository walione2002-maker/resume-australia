'use client';

import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { useResumeStore } from '@/stores/resume-store';
import { Plus, Trash2, X, FolderKanban } from 'lucide-react';

export function ProjectsForm() {
  const projects = useResumeStore((s) => s.projects);
  const addProject = useResumeStore((s) => s.addProject);
  const updateProject = useResumeStore((s) => s.updateProject);
  const removeProject = useResumeStore((s) => s.removeProject);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const handleFieldChange = (
    id: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateProject(id, { [e.target.name]: e.target.value });
  };

  const handleTechKeyDown = (
    id: string,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = (techInputs[id] ?? '').replace(',', '').trim();
      if (value) {
        const proj = projects.find((p) => p.id === id);
        if (proj) {
          updateProject(id, { techStack: [...proj.techStack, value] });
        }
        setTechInputs((prev) => ({ ...prev, [id]: '' }));
      }
    }
  };

  const handleRemoveTech = (id: string, techIdx: number) => {
    const proj = projects.find((p) => p.id === id);
    if (proj) {
      updateProject(id, {
        techStack: proj.techStack.filter((_, i) => i !== techIdx),
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirmDeleteId === id) {
      removeProject(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  return (
    <div className="space-y-4">
      {projects.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
          No projects yet. Showcase your work by adding one.
        </p>
      )}

      {projects.map((proj, idx) => (
        <div
          key={proj.id}
          className="rounded-xl border border-zinc-300  bg-zinc-100  p-4 space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 ">
              <FolderKanban className="h-4 w-4 text-blue-400" />
              Project {idx + 1}
              {proj.name && ` — ${proj.name}`}
            </span>
            <button
              type="button"
              onClick={() => handleDelete(proj.id)}
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                confirmDeleteId === proj.id
                  ? 'bg-red-600 text-zinc-900 dark:text-zinc-100 '
                  : 'text-red-400 hover:text-red-300 hover:bg-zinc-700'
              }`}
            >
              {confirmDeleteId === proj.id ? (
                'Confirm?'
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Name + Link */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Project Name
              </label>
              <input
                name="name"
                defaultValue={proj.name}
                placeholder="My Awesome App"
                onChange={(e) => handleFieldChange(proj.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Link
              </label>
              <input
                name="link"
                defaultValue={proj.link}
                placeholder="https://github.com/..."
                onChange={(e) => handleFieldChange(proj.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={proj.description}
              placeholder="Describe what the project does and your role…"
              onChange={(e) => handleFieldChange(proj.id, e)}
              className="w-full resize-y rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm leading-relaxed text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
              Tech Stack
            </label>
            {proj.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {proj.techStack.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="flex items-center gap-1 rounded-full bg-emerald-600/20 border border-emerald-500/30 px-3 py-1 text-xs font-medium text-emerald-300"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(proj.id, techIdx)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-emerald-500/30 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <input
              value={techInputs[proj.id] ?? ''}
              placeholder="Type a technology and press Enter or comma"
              onChange={(e) =>
                setTechInputs((prev) => ({
                  ...prev,
                  [proj.id]: e.target.value,
                }))
              }
              onKeyDown={(e) => handleTechKeyDown(proj.id, e)}
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
                defaultValue={proj.startDate}
                placeholder="Mar 2023"
                onChange={(e) => handleFieldChange(proj.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                End Date
              </label>
              <input
                name="endDate"
                defaultValue={proj.endDate}
                placeholder="Present"
                onChange={(e) => handleFieldChange(proj.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add project */}
      <button
        type="button"
        onClick={addProject}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300  py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400  transition-colors hover:border-blue-500 hover:text-blue-400"
      >
        <Plus className="h-4 w-4" />
        Add Project
      </button>
    </div>
  );
}


