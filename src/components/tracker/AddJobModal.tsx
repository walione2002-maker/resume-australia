'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { useJobStore } from '@/stores/job-store';
import type { JobEntry, JobStatus } from '@/types';

interface AddJobModalProps {
  isOpen?: boolean;
  onClose: () => void;
  editingJob?: JobEntry | null;
  defaultStatus?: JobStatus;
}

const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
  { value: 'saved', label: 'Saved' },
  { value: 'applied', label: 'Applied' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'offered', label: 'Offered' },
  { value: 'rejected', label: 'Rejected' },
];

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 350 },
  },
  exit: { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.15 } },
};

interface FormData {
  company: string;
  position: string;
  location: string;
  url: string;
  salary: string;
  notes: string;
  status: JobStatus;
}

const emptyForm = (status: JobStatus): FormData => ({
  company: '',
  position: '',
  location: '',
  url: '',
  salary: '',
  notes: '',
  status,
});

export function AddJobModal({
  isOpen = true,
  onClose,
  editingJob = null,
  defaultStatus = 'saved',
}: AddJobModalProps) {
  const addJob = useJobStore((s) => s.addJob);
  const updateJob = useJobStore((s) => s.updateJob);

  const [form, setForm] = useState<FormData>(emptyForm(defaultStatus));
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Initialize form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editingJob) {
        setForm({
          company: editingJob.company,
          position: editingJob.position,
          location: editingJob.location,
          url: editingJob.url,
          salary: editingJob.salary,
          notes: editingJob.notes,
          status: editingJob.status,
        });
      } else {
        setForm(emptyForm(defaultStatus));
      }
      setErrors({});
    }
  }, [isOpen, editingJob, defaultStatus]);

  // Escape key handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.company.trim()) newErrors.company = 'Company is required';
    if (!form.position.trim()) newErrors.position = 'Position is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      if (editingJob) {
        updateJob(editingJob.id, {
          company: form.company.trim(),
          position: form.position.trim(),
          location: form.location.trim(),
          url: form.url.trim(),
          salary: form.salary.trim(),
          notes: form.notes.trim(),
          status: form.status,
        });
      } else {
        addJob({
          company: form.company.trim(),
          position: form.position.trim(),
          location: form.location.trim(),
          url: form.url.trim(),
          salary: form.salary.trim(),
          notes: form.notes.trim(),
          status: form.status,
        });
      }

      onClose();
    },
    [form, editingJob, addJob, updateJob, validate, onClose]
  );

  const handleChange = useCallback(
    (field: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      // Clear error on edit
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-lg border bg-zinc-50 dark:bg-zinc-950  px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100  placeholder-zinc-500 outline-none transition-colors focus:ring-2 focus:ring-blue-500/50 ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-500'
        : 'border-zinc-200 dark:border-zinc-800  focus:border-blue-500'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-800  bg-white dark:bg-zinc-900  p-6 shadow-2xl backdrop-blur-xl"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 ">
                {editingJob ? 'Edit Job' : 'Add Job'}
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-zinc-500 dark:text-zinc-400  transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800  hover:text-zinc-900 dark:text-zinc-100 "
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Company */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                  Company <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="e.g. Atlassian"
                  className={inputClass('company')}
                  autoFocus
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-red-400">{errors.company}</p>
                )}
              </div>

              {/* Position */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                  Position <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className={inputClass('position')}
                />
                {errors.position && (
                  <p className="mt-1 text-xs text-red-400">{errors.position}</p>
                )}
              </div>

              {/* Location + Status row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="e.g. Sydney, NSW"
                    className={inputClass('location')}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800  bg-zinc-50 dark:bg-zinc-950  px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100  outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                  Job URL
                </label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => handleChange('url', e.target.value)}
                  placeholder="https://..."
                  className={inputClass('url')}
                />
              </div>

              {/* Salary */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                  Salary
                </label>
                <input
                  type="text"
                  value={form.salary}
                  onChange={(e) => handleChange('salary', e.target.value)}
                  placeholder="e.g. $120,000 - $150,000"
                  className={inputClass('salary')}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                  Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Any notes about this role..."
                  rows={3}
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800  bg-zinc-50 dark:bg-zinc-950  px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100  placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400  transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800  hover:text-zinc-900 dark:text-zinc-100 "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100  shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
                >
                  <Save className="h-4 w-4" />
                  {editingJob ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


