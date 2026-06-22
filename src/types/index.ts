// Resume Australia — Core Type Definitions

// ============================================================
// RESUME DATA TYPES
// ============================================================

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  website: string;
  summary: string;
  photoData: string | null;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
  description: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  honors: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  startDate: string;
  endDate: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeSection {
  id: string;
  type: SectionType;
  label: string;
  visible: boolean;
  order: number;
}

export type SectionType =
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'custom';

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillCategory[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
  customSections: CustomSection[];
  sections: ResumeSection[];
}

// ============================================================
// TEMPLATE TYPES
// ============================================================

export type IndustryCategory = 'Technology' | 'Finance' | 'Healthcare' | 'Creative' | 'Academic';

export type MasterLayoutId = 'traditional' | 'sidebar' | 'minimalist' | 'grid' | 'executive';

export type TemplateId = string;

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  industry: IndustryCategory;
  layout: MasterLayoutId;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
  previewImage?: string;
}

// ============================================================
// ATS TYPES
// ============================================================

export interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface VerbWarning {
  bulletIndex: number;
  experienceId: string;
  weakVerb: string;
  position: number;
  suggestions: string[];
}

// ============================================================
// AI TYPES
// ============================================================

export interface AIBulletRequest {
  jobTitle: string;
  context?: string;
  count?: number;
}

export interface AIBulletResponse {
  bullets: string[];
  error?: string;
}

export interface PhraseEntry {
  id: string;
  category: string;
  text: string;
  tags: string[];
}

// ============================================================
// JOB TRACKER TYPES
// ============================================================

export type JobStatus = 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected';

export interface JobEntry {
  id: string;
  company: string;
  position: string;
  location: string;
  url: string;
  salary: string;
  notes: string;
  status: JobStatus;
  dateAdded: string;
  dateApplied?: string;
  linkedResumeId?: string;
}

// ============================================================
// EXPORT TYPES
// ============================================================

export type ExportFormat = 'pdf' | 'txt' | 'web';

export interface ExportOptions {
  format: ExportFormat;
  templateId: TemplateId;
  includePhoto: boolean;
}
