'use client';

import { useCallback, useRef, type ChangeEvent } from 'react';
import { useResumeStore } from '@/stores/resume-store';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Link,
  Globe,
  Briefcase,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Debounced input helper — avoids external deps
// ---------------------------------------------------------------------------
function useDebouncedCallback<T extends (...args: never[]) => void>(
  callback: T,
  delay: number,
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay],
  ) as unknown as T;
}

// ---------------------------------------------------------------------------
// Shared styled input
// ---------------------------------------------------------------------------
interface FieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Field({
  label,
  name,
  value,
  placeholder,
  type = 'text',
  onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-xs font-medium text-gray-500"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded bg-[#f9fafd] border border-transparent px-4 py-3 text-sm text-gray-900 dark:text-gray-100 transition-colors focus:bg-white dark:bg-zinc-900 focus:border-b-2 focus:border-b-[#1a9ceb] focus:outline-none hover:bg-gray-100"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// PersonalInfoForm
// ---------------------------------------------------------------------------
export function PersonalInfoForm() {
  const personalInfo = useResumeStore((s) => s.personalInfo);
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);
  const updatePhoto = useResumeStore((s) => s.updatePhoto);

  const debouncedUpdate = useDebouncedCallback(
    (field: string, value: string) => {
      updatePersonalInfo({ [field]: value });
    },
    300,
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    debouncedUpdate(e.target.name, e.target.value);
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Row 1: Job Title & Photo */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <Field
            label="Job Title"
            name="jobTitle"
            value={personalInfo.jobTitle}
            placeholder="e.g. Senior Software Engineer"
            onChange={handleChange}
          />
        </div>
        <div className="sm:w-48 flex-shrink-0">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Photo</label>
          <div className="relative flex items-center justify-center w-full h-[52px] rounded border border-dashed border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer overflow-hidden">
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              onChange={handlePhotoUpload}
            />
            {personalInfo.photoData ? (
               <div className="flex items-center gap-2 px-3 w-full">
                 <img src={personalInfo.photoData} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                 <span className="text-xs text-gray-500 truncate flex-1">Change photo</span>
               </div>
            ) : (
               <div className="flex items-center gap-2 text-gray-500 text-sm">
                 <User size={16} />
                 <span>Upload photo</span>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field
          label="First Name"
          name="firstName"
          value={personalInfo.firstName}
          onChange={handleChange}
        />
        <Field
          label="Last Name"
          name="lastName"
          value={personalInfo.lastName}
          onChange={handleChange}
        />
      </div>

      {/* Row 3: Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field
          label="Email"
          name="email"
          type="email"
          value={personalInfo.email}
          onChange={handleChange}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          value={personalInfo.phone}
          onChange={handleChange}
        />
      </div>

      {/* Row 4: Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* We use location field for City, and let's assume we map Country to some other way or just ignore if it's not in store. Wait, I should add country to the store. For now let's add an input for Country that updates 'country' and City that updates 'location'. I'll update the store separately. */}
        <Field
          label="Country"
          name="country"
          value={(personalInfo as any).country || ''}
          onChange={handleChange}
        />
        <Field
          label="City"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
        />
      </div>

      {/* Row 5: Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field
          label="LinkedIn"
          name="linkedIn"
          value={personalInfo.linkedIn}
          onChange={handleChange}
        />
        <Field
          label="Website"
          name="website"
          value={personalInfo.website}
          onChange={handleChange}
        />
      </div>

      {/* Professional Summary */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="summary"
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500"
        >
          Professional Summary
        </label>
        <p className="text-xs text-gray-400 mb-1">
          Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest achievements, best qualities and skills.
        </p>
        <textarea
          id="summary"
          name="summary"
          rows={6}
          defaultValue={personalInfo.summary}
          onChange={handleChange}
          className="w-full resize-y rounded bg-[#f9fafd] border border-transparent px-4 py-3 text-sm text-gray-900 dark:text-gray-100 transition-colors focus:bg-white dark:bg-zinc-900 focus:border-b-2 focus:border-b-[#1a9ceb] focus:outline-none hover:bg-gray-100"
        />
      </div>
    </div>
  );
}


