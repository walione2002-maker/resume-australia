'use client';

import React from 'react';
import type { TemplateProps } from './index';
import { dateRange, sectionHasData, getVisibleSections } from './index';

export const TorontoTemplate: React.FC<TemplateProps> = ({ resumeData, config }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections } = resumeData;
  const visibleSections = getVisibleSections(resumeData);
  const primary = config.primaryColor || '#2c3e50';
  const secondary = config.secondaryColor || '#34495e';
  const accent = config.accentColor || '#1abc9c';
  const headingFont = config.fontHeading || 'sans-serif';
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
    color: '#333',
    fontSize: '10pt',
    lineHeight: 1.5,
    minHeight: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    backgroundColor: '#fff',
  };

  const sidebarStyle: React.CSSProperties = {
    width: '32%',
    backgroundColor: primary,
    color: '#fff',
    padding: '40px 30px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  };

  const mainContentStyle: React.CSSProperties = {
    width: '68%',
    padding: '40px',
    boxSizing: 'border-box',
  };

  const photoStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    border: `3px solid ${accent}`,
    alignSelf: 'center',
  };

  const nameStyle: React.CSSProperties = {
    fontFamily: headingFont,
    fontSize: '26pt',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.2,
    marginBottom: '8px',
    textAlign: 'center',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '12pt',
    color: accent,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '30px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const sidebarSectionTitle: React.CSSProperties = {
    fontFamily: headingFont,
    fontSize: '12pt',
    fontWeight: 700,
    color: '#fff',
    borderBottom: `2px solid ${accent}`,
    paddingBottom: '6px',
    marginBottom: '15px',
    marginTop: '25px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const mainSectionTitle: React.CSSProperties = {
    fontFamily: headingFont,
    fontSize: '14pt',
    fontWeight: 700,
    color: primary,
    borderBottom: `2px solid #eaeaea`,
    paddingBottom: '6px',
    marginBottom: '15px',
    marginTop: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
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
    paddingLeft: '16px',
    listStyleType: 'disc',
    color: '#444',
  };

  const bulletItem: React.CSSProperties = {
    marginBottom: '3px',
    lineHeight: 1.5,
  };

  // Sidebar Sections
  const renderContact = () => (
    <div key="contact">
      <div style={sidebarSectionTitle}>Contact</div>
      {contactParts.map((part, i) => (
        <div key={i} style={{ marginBottom: '8px', fontSize: '9.5pt', color: '#ecf0f1', wordBreak: 'break-word' }}>
          {part}
        </div>
      ))}
    </div>
  );

  const renderSkills = () =>
    sectionHasData('skills', resumeData) ? (
      <div key="skills">
        <div style={sidebarSectionTitle}>Skills</div>
        {skills.map((cat) =>
          cat.skills.length > 0 ? (
            <div key={cat.id} style={{ marginBottom: '12px' }}>
              {cat.name && <div style={{ fontWeight: 700, color: accent, fontSize: '9.5pt', marginBottom: '4px' }}>{cat.name}</div>}
              <div style={{ color: '#ecf0f1', fontSize: '9.5pt', lineHeight: 1.4 }}>
                {cat.skills.join(', ')}
              </div>
            </div>
          ) : null
        )}
      </div>
    ) : null;

  const renderLanguages = () =>
    sectionHasData('languages', resumeData) ? (
      <div key="languages">
        <div style={sidebarSectionTitle}>Languages</div>
        {languages.map((lang) => (
          <div key={lang.id} style={{ marginBottom: '8px', fontSize: '9.5pt' }}>
            <div style={{ fontWeight: 700, color: '#fff' }}>{lang.language}</div>
            <div style={{ color: '#bdc3c7' }}>{lang.proficiency}</div>
          </div>
        ))}
      </div>
    ) : null;

  const renderCertifications = () =>
    sectionHasData('certifications', resumeData) ? (
      <div key="certifications">
        <div style={sidebarSectionTitle}>Certifications</div>
        {certifications.map((cert) => (
          <div key={cert.id} style={{ marginBottom: '12px', fontSize: '9.5pt' }}>
            <div style={{ fontWeight: 700, color: '#fff' }}>{cert.name}</div>
            {cert.issuer && <div style={{ color: '#bdc3c7' }}>{cert.issuer}</div>}
            {cert.date && <div style={{ color: accent, fontSize: '9pt', marginTop: '2px' }}>{cert.date}</div>}
          </div>
        ))}
      </div>
    ) : null;

  // Main Content Sections
  const renderSummary = () =>
    personalInfo.summary ? (
      <div key="summary">
        <div style={mainSectionTitle}>Profile</div>
        <div style={{ color: '#444', whiteSpace: 'pre-wrap', fontSize: '10pt', lineHeight: 1.6 }}>
          {personalInfo.summary}
        </div>
      </div>
    ) : null;

  const renderExperience = () =>
    sectionHasData('experience', resumeData) ? (
      <div key="experience">
        <div style={mainSectionTitle}>Employment History</div>
        {experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '18px' }}>
            <div style={entryHeader}>
              <div style={{ fontWeight: 700, color: primary, fontSize: '11pt' }}>
                {exp.position}
              </div>
              <div style={{ fontSize: '9.5pt', color: secondary, fontWeight: 600 }}>
                {dateRange(exp.startDate, exp.endDate, exp.current)}
              </div>
            </div>
            {(exp.company || exp.location) && (
              <div style={{ fontSize: '10pt', color: '#555', marginBottom: '6px', fontWeight: 500 }}>
                {[exp.company, exp.location].filter(Boolean).join(', ')}
              </div>
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
        <div style={mainSectionTitle}>Education</div>
        {education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '16px' }}>
            <div style={entryHeader}>
              <div style={{ fontWeight: 700, color: primary, fontSize: '11pt' }}>
                {edu.institution}
              </div>
              <div style={{ fontSize: '9.5pt', color: secondary, fontWeight: 600 }}>
                {dateRange(edu.startDate, edu.endDate)}
              </div>
            </div>
            <div style={{ color: '#555', fontSize: '10pt', fontWeight: 500, marginBottom: '4px' }}>
              {[edu.degree, edu.field].filter(Boolean).join(' in ')}
              {edu.location ? `, ${edu.location}` : ''}
            </div>
            {edu.gpa && <div style={{ fontSize: '9.5pt', color: '#777' }}>GPA: {edu.gpa}</div>}
            {edu.honors && <div style={{ fontSize: '9.5pt', color: '#777' }}>{edu.honors}</div>}
          </div>
        ))}
      </div>
    ) : null;

  const renderProjects = () =>
    sectionHasData('projects', resumeData) ? (
      <div key="projects">
        <div style={mainSectionTitle}>Projects</div>
        {projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: '16px' }}>
            <div style={entryHeader}>
              <div style={{ fontWeight: 700, color: primary, fontSize: '11pt' }}>{proj.name}</div>
              <div style={{ fontSize: '9.5pt', color: secondary, fontWeight: 600 }}>
                {dateRange(proj.startDate, proj.endDate)}
              </div>
            </div>
            {proj.link && <div style={{ fontSize: '9.5pt', color: accent, marginBottom: '4px' }}>{proj.link}</div>}
            {proj.description && (
              <div style={{ color: '#444', fontSize: '10pt', lineHeight: 1.5, marginBottom: '4px' }}>
                {proj.description}
              </div>
            )}
            {proj.techStack.length > 0 && (
              <div style={{ fontSize: '9.5pt', color: '#666', fontStyle: 'italic' }}>
                Technologies: {proj.techStack.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : null;

  const renderCustom = () =>
    sectionHasData('custom', resumeData)
      ? customSections.map((sec) => (
          <div key={sec.id}>
            <div style={mainSectionTitle}>{sec.title}</div>
            <div style={{ margin: '4px 0 0', color: '#444', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {sec.content}
            </div>
          </div>
        ))
      : null;

  const sidebarTypes = ['personal', 'skills', 'languages', 'certifications'];
  const mainTypes = ['personal', 'experience', 'education', 'projects', 'custom'];

  const sidebarRenders: Record<string, () => React.ReactNode> = {
    personal: renderContact,
    skills: renderSkills,
    languages: renderLanguages,
    certifications: renderCertifications,
  };

  const mainRenders: Record<string, () => React.ReactNode> = {
    personal: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    projects: renderProjects,
    custom: () => <>{renderCustom()}</>,
  };

  return (
    <div style={pageStyle}>
      <div style={sidebarStyle}>
        {personalInfo.photoData && (
          <img src={personalInfo.photoData} alt="Profile" style={photoStyle} />
        )}
        {fullName && <div style={nameStyle}>{fullName}</div>}
        {personalInfo.jobTitle && <div style={titleStyle}>{personalInfo.jobTitle}</div>}

        {visibleSections
          .filter(s => sidebarTypes.includes(s.type))
          .map(s => {
            if (s.type === 'personal') {
              return <React.Fragment key="side_personal">{sidebarRenders.personal()}</React.Fragment>;
            }
            const r = sidebarRenders[s.type];
            return r ? r() : null;
          })}
      </div>

      <div style={mainContentStyle}>
        {visibleSections
          .filter(s => mainTypes.includes(s.type))
          .map(s => {
            if (s.type === 'personal') {
              return <React.Fragment key="main_personal">{mainRenders.personal()}</React.Fragment>;
            }
            const r = mainRenders[s.type];
            return r ? r() : null;
          })}
      </div>
    </div>
  );
};
