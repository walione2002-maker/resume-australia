'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '@/stores/resume-store';
import { useTemplateStore } from '@/stores/template-store';
import { ChevronRight, ChevronLeft, X, CheckCircle2, Sparkles, Plus, Trash2, Palette } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { saveResumeToCloud } from '@/lib/db';

const STEPS = 14;

export interface ResumeWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeWizard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  const resumeState = useResumeStore();
  const templateState = useTemplateStore();
  const [isSaving, setIsSaving] = useState(false);

  // Prevent scrolling on the body while wizard is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = async () => {
    if (currentStep < STEPS - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      if (user) {
        setIsSaving(true);
        try {
          const resumeId = resumeState.resumeId || `res_${Date.now()}`;
          const title = resumeState.personalInfo.firstName ? `${resumeState.personalInfo.firstName}'s Resume` : 'Untitled Resume';
          await saveResumeToCloud(
            user.uid,
            resumeId,
            title,
            {
              personalInfo: resumeState.personalInfo,
              experience: resumeState.experience,
              education: resumeState.education,
              skills: resumeState.skills,
              languages: resumeState.languages,
              projects: resumeState.projects,
              certifications: resumeState.certifications,
              customSections: resumeState.customSections,
              sections: resumeState.sections,
            },
            {
              templateId: templateState.activeTemplateId,
              customColor: templateState.customPrimaryColor || templateState.getActiveTemplate().primaryColor,
            }
          );
          resumeState.setResumeId(resumeId);
        } catch (error) {
          console.error("Failed to auto-save to cloud:", error);
        } finally {
          setIsSaving(false);
        }
      }
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
        style={{ minHeight: '500px' }}
      >
        {/* Header / Progress bar */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep) / (STEPS - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-gray-400 font-medium mt-2 tracking-wider uppercase">
              Step {currentStep + 1} of {STEPS}
            </p>
          </div>
            <button 
              onClick={handleSkip}
              className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full transition-colors"
              title="Close Wizard"
            >
              <X size={20} className="text-gray-500" />
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden px-8 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 px-8 py-4 overflow-y-auto"
            >
              {currentStep === 0 && <WelcomeStep />}
              {currentStep === 1 && <NameStep />}
              {currentStep === 2 && <ContactStep />}
              {currentStep === 3 && <LocationTitleStep />}
              {currentStep === 4 && <LinksStep />}
              {currentStep === 5 && <SummaryStep />}
              {currentStep === 6 && <ExperienceBasicsStep />}
              {currentStep === 7 && <ExperienceDatesStep />}
              {currentStep === 8 && <ExperienceBulletsStep />}
              {currentStep === 9 && <EducationBasicsStep />}
              {currentStep === 10 && <EducationDatesStep />}
              {currentStep === 11 && <SkillsStep />}
              {currentStep === 12 && <TemplateChooserStep />}
              {currentStep === 13 && <FinishStep />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-6 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              currentStep === 0 
                ? 'opacity-0 pointer-events-none' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
            }`}
          >
            <ChevronLeft size={18} /> Back
          </button>
          
          <button
                onClick={handleNext}
                disabled={isSaving}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : (currentStep === STEPS - 1 ? 'Finish & Save' : 'Next')}
                {currentStep < STEPS - 1 && <ChevronRight size={18} />}
              </button>
        </div>
      </motion.div>
    </div>
  );
}

// --- Step Components ---

function WelcomeStep() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
      <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 rotate-3">
        <Sparkles size={40} />
      </div>
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        Let's build your standout resume.
      </h2>
      <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md">
        We'll guide you step by step to gather the essential details. Focus mode is ON so you can concentrate entirely on your input.
      </p>
    </div>
  );
}

function NameStep() {
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  return (
    <div className="flex flex-col max-w-md pb-8 mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What's your name?</h3>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
          <input
            autoFocus
            type="text"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Alex"
            value={personalInfo.firstName}
            onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Chen"
            value={personalInfo.lastName}
            onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function ContactStep() {
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  return (
    <div className="flex flex-col max-w-md pb-8 mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How can employers reach you?</h3>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <input
            autoFocus
            type="email"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="alex@example.com"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
          <input
            type="tel"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="+1 (555) 000-0000"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function LocationTitleStep() {
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  return (
    <div className="flex flex-col max-w-md pb-8 mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What's your current target?</h3>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Target Job Title</label>
          <input
            autoFocus
            type="text"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Senior Frontend Engineer"
            value={personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
          <input
            type="text"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Sydney, NSW (or Remote)"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function LinksStep() {
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  return (
    <div className="flex flex-col justify-center h-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Any links to your work?</h3>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL (Optional)</label>
          <input
            autoFocus
            type="url"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="linkedin.com/in/alexchen"
            value={personalInfo.linkedIn}
            onChange={(e) => updatePersonalInfo({ linkedIn: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Personal Website / Portfolio (Optional)</label>
          <input
            type="url"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="alexchen.dev"
            value={personalInfo.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function SummaryStep() {
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  return (
    <div className="flex flex-col max-w-xl pb-8 mx-auto mt-4">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Professional Summary</h3>
      <p className="text-sm text-gray-500 mb-6">Write 2-4 sentences highlighting your core value, top skills, and years of experience.</p>
      <div className="flex-1 min-h-[200px]">
        <textarea
          autoFocus
          className="w-full h-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          placeholder="Dynamic and results-oriented professional with over 5 years of experience..."
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
        />
      </div>
    </div>
  );
}

function ExperienceBasicsStep() {
  const { experience, addExperience, updateExperience } = useResumeStore();
  
  // Ensure we have at least one experience entry
  useEffect(() => {
    if (experience.length === 0) {
      addExperience();
    }
  }, [experience.length, addExperience]);

  if (experience.length === 0) return null;
  
  const exp = experience[0];

  return (
    <div className="flex flex-col justify-center h-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Most Recent Experience</h3>
      <p className="text-sm text-gray-500 mb-6">Where did you work last?</p>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
          <input
            autoFocus
            type="text"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Google"
            value={exp.company}
            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
          <input
            type="text"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Senior Software Engineer"
            value={exp.position}
            onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
          <input
            type="text"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Sydney, NSW"
            value={exp.location}
            onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function ExperienceDatesStep() {
  const { experience, updateExperience } = useResumeStore();
  if (experience.length === 0) return null;
  const exp = experience[0];

  return (
    <div className="flex flex-col justify-center h-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">When did you work there?</h3>
      <div className="space-y-6">
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <input
            id="current-role"
            type="checkbox"
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={exp.current}
            onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate })}
          />
          <label htmlFor="current-role" className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer">
            I currently work here
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
            <input
              type="month"
              className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${exp.current ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>End Date</label>
            <input
              type="month"
              disabled={exp.current}
              className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceBulletsStep() {
  const { experience, updateBullet, addBullet, removeBullet } = useResumeStore();
  if (experience.length === 0) return null;
  const exp = experience[0];

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto mt-4">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Key Achievements</h3>
      <p className="text-sm text-gray-500 mb-6">List 2-4 bullet points describing your impact. Start with an action verb and include numbers where possible.</p>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {exp.bullets.map((bullet, i) => (
          <div key={i} className="flex gap-2 group">
            <div className="mt-3 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            <textarea
              autoFocus={i === 0}
              className="flex-1 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[60px] resize-none"
              placeholder="e.g. Spearheaded the development of a new microservice that increased system throughput by 35%."
              value={bullet}
              onChange={(e) => updateBullet(exp.id, i, e.target.value)}
            />
            <button
              onClick={() => removeBullet(exp.id, i)}
              disabled={exp.bullets.length === 1}
              className="p-3 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:hover:text-gray-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950 self-start"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        
        <button
          onClick={() => addBullet(exp.id)}
          className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 py-3 ml-3"
        >
          <Plus size={16} /> Add another bullet
        </button>
      </div>
    </div>
  );
}

function EducationBasicsStep() {
  const { education, addEducation, updateEducation } = useResumeStore();
  
  useEffect(() => {
    if (education.length === 0) {
      addEducation();
    }
  }, [education.length, addEducation]);

  if (education.length === 0) return null;
  const edu = education[0];

  return (
    <div className="flex flex-col justify-center h-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Highest Education</h3>
      <p className="text-sm text-gray-500 mb-6">What did you study?</p>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Institution / University</label>
          <input
            autoFocus
            type="text"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. University of Sydney"
            value={edu.institution}
            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Degree</label>
            <input
              type="text"
              className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Bachelor's"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Field of Study</label>
            <input
              type="text"
              className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Computer Science"
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationDatesStep() {
  const { education, updateEducation } = useResumeStore();
  if (education.length === 0) return null;
  const edu = education[0];

  return (
    <div className="flex flex-col justify-center h-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">When did you study?</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
          <input
            type="month"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={edu.startDate}
            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">End Date (or Expected)</label>
          <input
            type="month"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={edu.endDate}
            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function SkillsStep() {
  const { skills, addSkillCategory, addSkill, removeSkill } = useResumeStore();
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    if (skills.length === 0) {
      addSkillCategory();
    }
  }, [skills.length, addSkillCategory]);

  if (skills.length === 0) return null;
  const cat = skills[0]; // Primary skills category

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addSkill(cat.id, inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto mt-4">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Core Skills</h3>
      <p className="text-sm text-gray-500 mb-6">Type a skill and press Enter. Aim for 5-10 core competencies.</p>
      
      <div>
        <input
          autoFocus
          type="text"
          className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all mb-4 text-lg shadow-sm"
          placeholder="e.g. Project Management, React, SEO..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        <div className="flex flex-wrap gap-2 mt-6">
          {cat.skills.map((skill, index) => (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700"
            >
              {skill}
              <button
                onClick={() => removeSkill(cat.id, index)}
                className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
          {cat.skills.length === 0 && (
            <p className="text-sm text-gray-400 italic w-full text-center mt-4">No skills added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const INDUSTRY_ORDER = ['Technology', 'Finance', 'Healthcare', 'Creative', 'Academic'] as const;

const CUSTOM_COLORS = [
  '#1e3a5f', '#6c3fc5', '#2d3436', '#0f172a', '#1a1a2e',
  '#2563eb', '#16a34a', '#dc2626', '#d97706', '#9333ea',
];

function TemplateChooserStep() {
  const { templates, activeTemplateId, setTemplate, setCustomColor } = useTemplateStore();
  
  // Find the industry of the currently active template to auto-open it
  const activeIndustry = templates.find(t => t.id === activeTemplateId)?.industry || 'Technology';
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(activeIndustry);

  const grouped = INDUSTRY_ORDER.reduce<Record<string, typeof templates>>((acc, industry) => {
    acc[industry] = templates.filter((t) => t.industry === industry);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Choose Your Template</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Tap an industry to browse its templates.</p>
      </div>

      <div className="space-y-1">
        {INDUSTRY_ORDER.map((industry) => {
          const isExpanded = expandedIndustry === industry;
          const activeCount = grouped[industry].filter(t => t.id === activeTemplateId).length;
          return (
            <div key={industry} className="border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedIndustry(isExpanded ? null : industry)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                  isExpanded 
                    ? 'bg-blue-50 dark:bg-blue-950/30' 
                    : 'bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${isExpanded ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                    {industry}
                  </span>
                  {activeCount > 0 && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-gray-200 dark:border-zinc-700">
                      {grouped[industry].map((t) => {
                        const isActive = t.id === activeTemplateId;
                        return (
                          <button
                            key={t.id}
                            onClick={() => setTemplate(t.id)}
                            className={`text-left rounded-lg p-3 border-2 transition-all ${
                              isActive
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                                : 'border-gray-100 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700'
                            }`}
                          >
                            <span className="block font-bold text-sm text-gray-900 dark:text-white">{t.name}</span>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{t.description}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Custom Colors */}
      <div className="pt-2">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Palette size={14} />
          Accent Color
        </h3>
        <div className="flex flex-wrap gap-2">
          {CUSTOM_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setCustomColor(color)}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-700 shadow-sm hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FinishStep() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
        <CheckCircle2 size={40} />
      </div>
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        Awesome. You're all set!
      </h2>
      <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md">
        We've generated the core structure of your resume. Now we'll drop you into the advanced editor so you can add more experience, tweak the template, and fine-tune your content.
      </p>
    </div>
  );
}
