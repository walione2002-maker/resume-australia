'use client';

import { useState, type ChangeEvent } from 'react';
import { useResumeStore } from '@/stores/resume-store';
import { Plus, Trash2, Award } from 'lucide-react';

export function CertificationsForm() {
  const certifications = useResumeStore((s) => s.certifications);
  const addCertification = useResumeStore((s) => s.addCertification);
  const updateCertification = useResumeStore((s) => s.updateCertification);
  const removeCertification = useResumeStore((s) => s.removeCertification);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleFieldChange = (
    id: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateCertification(id, { [e.target.name]: e.target.value });
  };

  const handleDelete = (id: string) => {
    if (confirmDeleteId === id) {
      removeCertification(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  return (
    <div className="space-y-4">
      {certifications.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
          No certifications yet. Add your professional credentials.
        </p>
      )}

      {certifications.map((cert, idx) => (
        <div
          key={cert.id}
          className="rounded-xl border border-zinc-300  bg-zinc-100  p-4 space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 ">
              <Award className="h-4 w-4 text-blue-400" />
              Certification {idx + 1}
              {cert.name && ` — ${cert.name}`}
            </span>
            <button
              type="button"
              onClick={() => handleDelete(cert.id)}
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                confirmDeleteId === cert.id
                  ? 'bg-red-600 text-zinc-900 dark:text-zinc-100 '
                  : 'text-red-400 hover:text-red-300 hover:bg-zinc-700'
              }`}
            >
              {confirmDeleteId === cert.id ? (
                'Confirm?'
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Name + Issuer */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Certification Name
              </label>
              <input
                name="name"
                defaultValue={cert.name}
                placeholder="AWS Solutions Architect"
                onChange={(e) => handleFieldChange(cert.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Issuing Organisation
              </label>
              <input
                name="issuer"
                defaultValue={cert.issuer}
                placeholder="Amazon Web Services"
                onChange={(e) => handleFieldChange(cert.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Date + Link */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Date Issued
              </label>
              <input
                name="date"
                defaultValue={cert.date}
                placeholder="Jun 2023"
                onChange={(e) => handleFieldChange(cert.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                Credential Link
              </label>
              <input
                name="link"
                defaultValue={cert.link}
                placeholder="https://credential.net/..."
                onChange={(e) => handleFieldChange(cert.id, e)}
                className="w-full rounded-lg border border-zinc-300  bg-zinc-100  px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100  placeholder:text-zinc-500 dark:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add certification */}
      <button
        type="button"
        onClick={addCertification}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300  py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400  transition-colors hover:border-blue-500 hover:text-blue-400"
      >
        <Plus className="h-4 w-4" />
        Add Certification
      </button>
    </div>
  );
}


