// Resume Australia — Template Registry
import type { ResumeData, TemplateConfig, TemplateId, ResumeSection, SectionType } from '@/types';
import { TraditionalLayout } from './layouts/TraditionalLayout';
import { SidebarLayout } from './layouts/SidebarLayout';
import { MinimalistLayout } from './layouts/MinimalistLayout';
import { GridBannerLayout } from './layouts/GridBannerLayout';
import { ExecutiveLayout } from './layouts/ExecutiveLayout';
import { templateRegistry } from '@/data/template-registry';

// Shared props interface every template receives
export interface TemplateProps {
  resumeData: ResumeData;
  config: TemplateConfig;
}

export const DynamicTemplate: React.FC<TemplateProps> = ({ resumeData, config }) => {
  // If we get an ID that is not in the registry, fallback to traditional
  const matchedConfig = templateRegistry.find(t => t.id === config.id) || config;
  const layout = matchedConfig.layout || 'traditional';

  switch (layout) {
    case 'sidebar':
      return <SidebarLayout resumeData={resumeData} config={matchedConfig} />;
    case 'minimalist':
      return <MinimalistLayout resumeData={resumeData} config={matchedConfig} />;
    case 'grid':
      return <GridBannerLayout resumeData={resumeData} config={matchedConfig} />;
    case 'executive':
      return <ExecutiveLayout resumeData={resumeData} config={matchedConfig} />;
    case 'traditional':
    default:
      return <TraditionalLayout resumeData={resumeData} config={matchedConfig} />;
  }
};

// ── Shared helpers ────────────────────────────────────────────

const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Format an ISO-ish date string (YYYY-MM or YYYY-MM-DD) into "Jan 2024" */
export function formatDate(raw: string): string {
  if (!raw) return '';
  const parts = raw.split('-');
  const year = parts[0];
  const monthIdx = parts[1] ? parseInt(parts[1], 10) - 1 : -1;
  if (monthIdx >= 0 && monthIdx < 12) {
    return `${MONTH_ABBR[monthIdx]} ${year}`;
  }
  return year ?? '';
}

/** Build a "Jan 2023 – Present" range string */
export function dateRange(start: string, end: string, current?: boolean): string {
  const s = formatDate(start);
  const e = current ? 'Present' : formatDate(end);
  if (!s && !e) return '';
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
}

/**
 * Return visible sections sorted by order.
 * Optionally filter to only types that actually have data.
 */
export function getVisibleSections(data: ResumeData): ResumeSection[] {
  return [...data.sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);
}

/** Check whether a section type has any meaningful data */
export function sectionHasData(type: SectionType, data: ResumeData): boolean {
  switch (type) {
    case 'personal':
      return !!(
        data.personalInfo.firstName ||
        data.personalInfo.lastName ||
        data.personalInfo.summary
      );
    case 'experience':
      return data.experience.length > 0;
    case 'education':
      return data.education.length > 0;
    case 'skills':
      return data.skills.length > 0 && data.skills.some((c) => c.skills.length > 0);
    case 'projects':
      return data.projects.length > 0;
    case 'certifications':
      return data.certifications.length > 0;
    case 'languages':
      return data.languages.length > 0;
    case 'custom':
      return data.customSections.length > 0;
    default:
      return false;
  }
}
