'use client';

import React from 'react';
import type { TemplateProps } from './index';
import { dateRange, sectionHasData, getVisibleSections } from './index';

export const NewYorkTemplate: React.FC<TemplateProps> = ({ resumeData, config }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections } = resumeData;
  const visibleSections = getVisibleSections(resumeData);
  const primary = config.primaryColor || '#000000';
  const secondary = config.secondaryColor || '#555555';
  const headingFont = config.fontHeading || 'serif';
  const bodyFont = config.fontBody || 'sans-serif';

  const fullName = [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(' ');
  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedIn,
    personalInfo.website,
  ].filter(Boolean);

  const pageStyle: React.CSSProperties = {
    fontFamily: bodyFont,
    color: '#222',
    fontSize: '10pt',
    lineHeight: 1.5,
    padding: '48px',
    minHeight: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };

  const nameStyle: React.CSSProperties = {
    fontFamily: headingFont,
    fontSize: '24pt',
    fontWeight: 700,
    color: primary,
    lineHeight: 1.1,
    marginBottom: '4px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '11pt',
    color: secondary,
    fontWeight: 500,
    marginTop: '4px',
  };

  const contactStyle: React.CSSProperties = {
    fontSize: '9pt',
    color: '#444',
    textAlign: 'right',
    lineHeight: 1.4,
  };

  const sectionTitle: React.CSSProperties = {
    fontFamily: headingFont,
    fontSize: '13pt',
    fontWeight: 700,
    color: '#000',
    marginTop: '20px',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderBottom: `2px solid ${primary}`,
    paddingBottom: '4px',
  };

  const entryHeader: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginBottom: '4px',
  };

  const bulletList: React.CSSProperties = {
    margin: '4px 0 0 0',
    paddingLeft: '18px',
    listStyleType: 'square',
    color: '#333',
  };

  const bulletItem: React.CSSProperties = {
    marginBottom: '3px',
    lineHeight: 1.5,
  };

  const renderSummary = () =>
    personalInfo.summary ? (
      <div key="summary">
        <div style={sectionTitle}>Professional Summary</div>
        <div style={{ margin: '4px 0 0', color: '#333', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {personalInfo.summary}
        </div>
      </div>
    ) : null;

  const renderExperience = () =>
    sectionHasData('experience', resumeData) ? (
      <div key="experience">
        <div style={sectionTitle}>Experience</div>
        {experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '16px' }}>
            <div style={entryHeader}>
              <div style={{ fontWeight: 700, color: '#000', fontSize: '11pt' }}>
                {exp.position}{exp.company ? `, ${exp.company}` : ''}
              </div>
              <div style={{ fontSize: '9.5pt', color: '#555', fontWeight: 600 }}>
                {dateRange(exp.startDate, exp.endDate, exp.current)}
              </div>
            </div>
            {exp.location && (
              <div style={{ fontSize: '9.5pt', color: secondary, marginBottom: '4px' }}>{exp.location}</div>
            )}
            {exp.bullets.filter(Boolean).length > 0 && (
              <ul style={bulletList}>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} style={bulletItem}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    ) : null;

  const renderEducation = () =>
    sectionHasData('education', resumeData) ? (
      <div key="education">
        <div style={sectionTitle}>Education</div>
        {education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '12px' }}>
            <div style={entryHeader}>
              <div style={{ fontWeight: 700, color: '#000', fontSize: '11pt' }}>
                {edu.institution}
              </div>
              <div style={{ fontSize: '9.5pt', color: '#555', fontWeight: 600 }}>
                {dateRange(edu.startDate, edu.endDate)}
              </div>
            </div>
            <div style={{ color: '#333', fontSize: '10pt', fontWeight: 500 }}>
              {[edu.degree, edu.field].filter(Boolean).join(' in ')}
              {edu.location ? `, ${edu.location}` : ''}
            </div>
            {edu.gpa && <div style={{ fontSize: '9.5pt', color: '#555', marginTop: '2px' }}>GPA: {edu.gpa}</div>}
            {edu.honors && <div style={{ fontSize: '9.5pt', color: '#555', marginTop: '2px' }}>{edu.honors}</div>}
          </div>
        ))}
      </div>
    ) : null;

  const renderSkills = () =>
    sectionHasData('skills', resumeData) ? (
      <div key="skills">
        <div style={sectionTitle}>Skills</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
          {skills.map((cat) =>
            cat.skills.length > 0 ? (
              <div key={cat.id} style={{ fontSize: '10pt' }}>
                {cat.name && <span style={{ fontWeight: 700, color: '#000' }}>{cat.name}: </span>}
                <span style={{ color: '#333' }}>{cat.skills.join(', ')}</span>
              </div>
            ) : null
          )}
        </div>
      </div>
    ) : null;

  const renderProjects = () =>
    sectionHasData('projects', resumeData) ? (
      <div key="projects">
        <div style={sectionTitle}>Projects</div>
        {projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: '14px' }}>
            <div style={entryHeader}>
              <div style={{ fontWeight: 700, color: '#000', fontSize: '11pt' }}>{proj.name}</div>
              <div style={{ fontSize: '9.5pt', color: '#555', fontWeight: 600 }}>
                {dateRange(proj.startDate, proj.endDate)}
              </div>
            </div>
            {proj.link && <div style={{ fontSize: '9pt', color: primary, marginBottom: '2px' }}>{proj.link}</div>}
            {proj.description && (
              <div style={{ color: '#333', fontSize: '10pt', lineHeight: 1.5 }}>
                {proj.description}
              </div>
            )}
            {proj.techStack.length > 0 && (
              <div style={{ fontSize: '9.5pt', color: '#555', marginTop: '4px' }}>
                <strong>Technologies:</strong> {proj.techStack.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : null;

  const renderCertifications = () =>
    sectionHasData('certifications', resumeData) ? (
      <div key="certifications">
        <div style={sectionTitle}>Certifications</div>
        {certifications.map((cert) => (
          <div key={cert.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontWeight: 700, color: '#000' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#444' }}> — {cert.issuer}</span>}
            </div>
            {cert.date && <div style={{ fontSize: '9.5pt', color: '#555' }}>{cert.date}</div>}
          </div>
        ))}
      </div>
    ) : null;

  const renderLanguages = () =>
    sectionHasData('languages', resumeData) ? (
      <div key="languages">
        <div style={sectionTitle}>Languages</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {languages.map((lang) => (
            <div key={lang.id} style={{ fontSize: '10pt' }}>
              <span style={{ fontWeight: 700, color: '#000' }}>{lang.language}</span>
              <span style={{ color: '#555', marginLeft: '6px' }}>({lang.proficiency})</span>
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderCustom = () =>
    sectionHasData('custom', resumeData)
      ? customSections.map((sec) => (
          <div key={sec.id}>
            <div style={sectionTitle}>{sec.title}</div>
            <div style={{ margin: '4px 0 0', color: '#333', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {sec.content}
            </div>
          </div>
        ))
      : null;

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    personal: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    skills: renderSkills,
    projects: renderProjects,
    certifications: renderCertifications,
    languages: renderLanguages,
    custom: renderCustom,
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <div>
          {fullName && <div style={nameStyle}>{fullName}</div>}
          {personalInfo.jobTitle && <div style={titleStyle}>{personalInfo.jobTitle}</div>}
        </div>
        <div style={contactStyle}>
          {contactParts.map((part, i) => (
            <div key={i}>{part}</div>
          ))}
        </div>
      </div>

      {visibleSections.map((section) => {
        if (!sectionHasData(section.type, resumeData)) return null;
        if (section.type === 'personal' && !personalInfo.summary) return null;
        const renderer = sectionRenderers[section.type];
        return renderer ? <React.Fragment key={section.id}>{renderer()}</React.Fragment> : null;
      })}
    </div>
  );
};
