import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ResumeData,
  PersonalInfo,
  ExperienceEntry,
  EducationEntry,
  SkillCategory,
  ProjectEntry,
  CertificationEntry,
  LanguageEntry,
  CustomSection,
  ResumeSection,
} from '@/types';

const generateId = () => Math.random().toString(36).substring(2, 11);

const defaultPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  linkedIn: '',
  website: '',
  summary: '',
  photoData: null,
};

const defaultSections: ResumeSection[] = [
  { id: 'sec-personal', type: 'personal', label: 'Personal Info', visible: true, order: 0 },
  { id: 'sec-experience', type: 'experience', label: 'Experience', visible: true, order: 1 },
  { id: 'sec-education', type: 'education', label: 'Education', visible: true, order: 2 },
  { id: 'sec-skills', type: 'skills', label: 'Skills', visible: true, order: 3 },
  { id: 'sec-projects', type: 'projects', label: 'Projects', visible: true, order: 4 },
  { id: 'sec-certifications', type: 'certifications', label: 'Certifications', visible: true, order: 5 },
  { id: 'sec-languages', type: 'languages', label: 'Languages', visible: true, order: 6 },
];

interface ResumeStore extends ResumeData {
  // Personal Info
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updatePhoto: (data: string | null) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;
  addBullet: (experienceId: string) => void;
  updateBullet: (experienceId: string, index: number, text: string) => void;
  removeBullet: (experienceId: string, index: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;

  // Skills
  addSkillCategory: () => void;
  updateSkillCategory: (id: string, data: Partial<SkillCategory>) => void;
  removeSkillCategory: (id: string) => void;
  addSkill: (categoryId: string, skill: string) => void;
  removeSkill: (categoryId: string, skillIndex: number) => void;

  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<ProjectEntry>) => void;
  removeProject: (id: string) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<CertificationEntry>) => void;
  removeCertification: (id: string) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<LanguageEntry>) => void;
  removeLanguage: (id: string) => void;

  // Custom Sections
  addCustomSection: () => void;
  updateCustomSection: (id: string, data: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;

  // Section Ordering
  reorderSections: (sections: ResumeSection[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;

  // Utility
  getPlainText: () => string;
  resetResume: () => void;
  
  // Wizard State removed - moved to page.tsx local state

  // Cloud Sync
  resumeId: string | null;
  setResumeId: (id: string | null) => void;
  loadFromCloud: (data: Partial<ResumeData>) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      // Default state
      resumeId: null,
      personalInfo: defaultPersonalInfo,
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      customSections: [],
      sections: defaultSections,

      // Actions
      setResumeId: (id) => set({ resumeId: id }),
      loadFromCloud: (data) =>
        set((state) => ({ ...state, ...data })),

      updatePersonalInfo: (info) =>
        set((state) => ({ personalInfo: { ...state.personalInfo, ...info } })),

      updatePhoto: (data) =>
        set((state) => ({ personalInfo: { ...state.personalInfo, photoData: data } })),

      // Experience
      addExperience: () =>
        set((state) => ({
          experience: [
            ...state.experience,
            {
              id: generateId(),
              company: '',
              position: '',
              location: '',
              startDate: '',
              endDate: '',
              current: false,
              bullets: [''],
              description: '',
            },
          ],
        })),

      updateExperience: (id, data) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === id ? { ...exp, ...data } : exp
          ),
        })),

      removeExperience: (id) =>
        set((state) => ({
          experience: state.experience.filter((exp) => exp.id !== id),
        })),

      addBullet: (experienceId) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === experienceId
              ? { ...exp, bullets: [...exp.bullets, ''] }
              : exp
          ),
        })),

      updateBullet: (experienceId, index, text) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === experienceId
              ? {
                  ...exp,
                  bullets: exp.bullets.map((b, i) => (i === index ? text : b)),
                }
              : exp
          ),
        })),

      removeBullet: (experienceId, index) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === experienceId
              ? { ...exp, bullets: exp.bullets.filter((_, i) => i !== index) }
              : exp
          ),
        })),

      // Education
      addEducation: () =>
        set((state) => ({
          education: [
            ...state.education,
            {
              id: generateId(),
              institution: '',
              degree: '',
              field: '',
              location: '',
              startDate: '',
              endDate: '',
              gpa: '',
              honors: '',
            },
          ],
        })),

      updateEducation: (id, data) =>
        set((state) => ({
          education: state.education.map((edu) =>
            edu.id === id ? { ...edu, ...data } : edu
          ),
        })),

      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),

      // Skills
      addSkillCategory: () =>
        set((state) => ({
          skills: [
            ...state.skills,
            { id: generateId(), name: '', skills: [] },
          ],
        })),

      updateSkillCategory: (id, data) =>
        set((state) => ({
          skills: state.skills.map((cat) =>
            cat.id === id ? { ...cat, ...data } : cat
          ),
        })),

      removeSkillCategory: (id) =>
        set((state) => ({
          skills: state.skills.filter((cat) => cat.id !== id),
        })),

      addSkill: (categoryId, skill) =>
        set((state) => ({
          skills: state.skills.map((cat) =>
            cat.id === categoryId
              ? { ...cat, skills: [...cat.skills, skill] }
              : cat
          ),
        })),

      removeSkill: (categoryId, skillIndex) =>
        set((state) => ({
          skills: state.skills.map((cat) =>
            cat.id === categoryId
              ? { ...cat, skills: cat.skills.filter((_, i) => i !== skillIndex) }
              : cat
          ),
        })),

      // Projects
      addProject: () =>
        set((state) => ({
          projects: [
            ...state.projects,
            {
              id: generateId(),
              name: '',
              description: '',
              techStack: [],
              link: '',
              startDate: '',
              endDate: '',
            },
          ],
        })),

      updateProject: (id, data) =>
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj.id === id ? { ...proj, ...data } : proj
          ),
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((proj) => proj.id !== id),
        })),

      // Certifications
      addCertification: () =>
        set((state) => ({
          certifications: [
            ...state.certifications,
            { id: generateId(), name: '', issuer: '', date: '', link: '' },
          ],
        })),

      updateCertification: (id, data) =>
        set((state) => ({
          certifications: state.certifications.map((cert) =>
            cert.id === id ? { ...cert, ...data } : cert
          ),
        })),

      removeCertification: (id) =>
        set((state) => ({
          certifications: state.certifications.filter((cert) => cert.id !== id),
        })),

      // Languages
      addLanguage: () =>
        set((state) => ({
          languages: [
            ...state.languages,
            { id: generateId(), language: '', proficiency: 'Intermediate' as const },
          ],
        })),

      updateLanguage: (id, data) =>
        set((state) => ({
          languages: state.languages.map((lang) =>
            lang.id === id ? { ...lang, ...data } : lang
          ),
        })),

      removeLanguage: (id) =>
        set((state) => ({
          languages: state.languages.filter((lang) => lang.id !== id),
        })),

      // Custom Sections
      addCustomSection: () => {
        const id = generateId();
        set((state) => ({
          customSections: [
            ...state.customSections,
            { id, title: 'Custom Section', content: '' },
          ],
          sections: [
            ...state.sections,
            {
              id: `sec-custom-${id}`,
              type: 'custom' as const,
              label: 'Custom Section',
              visible: true,
              order: state.sections.length,
            },
          ],
        }));
      },

      updateCustomSection: (id, data) =>
        set((state) => ({
          customSections: state.customSections.map((sec) =>
            sec.id === id ? { ...sec, ...data } : sec
          ),
          sections: data.title
            ? state.sections.map((s) =>
                s.id === `sec-custom-${id}` ? { ...s, label: data.title! } : s
              )
            : state.sections,
        })),

      removeCustomSection: (id) =>
        set((state) => ({
          customSections: state.customSections.filter((sec) => sec.id !== id),
          sections: state.sections.filter((s) => s.id !== `sec-custom-${id}`),
        })),

      // Section Ordering
      reorderSections: (sections) => set({ sections }),

      toggleSectionVisibility: (sectionId) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId ? { ...s, visible: !s.visible } : s
          ),
        })),

      // Utility
      getPlainText: () => {
        const state = get();
        const lines: string[] = [];
        const { personalInfo: p } = state;

        lines.push(`${p.firstName} ${p.lastName}`);
        if (p.jobTitle) lines.push(p.jobTitle);
        const contactParts = [p.email, p.phone, p.location, p.linkedIn, p.website].filter(Boolean);
        if (contactParts.length) lines.push(contactParts.join(' | '));
        if (p.summary) { lines.push('', 'SUMMARY', p.summary); }

        if (state.experience.length) {
          lines.push('', 'EXPERIENCE');
          state.experience.forEach((exp) => {
            lines.push(`${exp.position} at ${exp.company} | ${exp.location}`);
            lines.push(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`);
            if (exp.description) lines.push(exp.description);
            exp.bullets.forEach((b) => { if (b) lines.push(`• ${b}`); });
            lines.push('');
          });
        }

        if (state.education.length) {
          lines.push('EDUCATION');
          state.education.forEach((edu) => {
            lines.push(`${edu.degree} in ${edu.field} - ${edu.institution}`);
            lines.push(`${edu.startDate} - ${edu.endDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`);
            if (edu.honors) lines.push(`Honors: ${edu.honors}`);
            lines.push('');
          });
        }

        if (state.skills.length) {
          lines.push('SKILLS');
          state.skills.forEach((cat) => {
            lines.push(`${cat.name}: ${cat.skills.join(', ')}`);
          });
          lines.push('');
        }

        if (state.projects.length) {
          lines.push('PROJECTS');
          state.projects.forEach((proj) => {
            lines.push(`${proj.name}${proj.link ? ` (${proj.link})` : ''}`);
            if (proj.description) lines.push(proj.description);
            if (proj.techStack.length) lines.push(`Tech: ${proj.techStack.join(', ')}`);
            lines.push('');
          });
        }

        if (state.certifications.length) {
          lines.push('CERTIFICATIONS');
          state.certifications.forEach((cert) => {
            lines.push(`${cert.name} - ${cert.issuer} (${cert.date})`);
          });
          lines.push('');
        }

        if (state.languages.length) {
          lines.push('LANGUAGES');
          state.languages.forEach((lang) => {
            lines.push(`${lang.language}: ${lang.proficiency}`);
          });
        }

        return lines.join('\n');
      },

      resetResume: () =>
        set({
          personalInfo: defaultPersonalInfo,
          experience: [],
          education: [],
          skills: [],
          projects: [],
          certifications: [],
          languages: [],
          customSections: [],
          sections: defaultSections,
        }),
    }),
    {
      name: 'resume-australia-data',
      version: 1,
    }
  )
);
