'use client';

import React from 'react';
import type { TemplateProps } from './index';
import { dateRange, sectionHasData, getVisibleSections } from './index';

export const StockholmTemplate: React.FC<TemplateProps> = ({ resumeData, config }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections } = resumeData;
  const visibleSections = getVisibleSections(resumeData);
  const primary = config.primaryColor || '#000000';
  const secondary = config.secondaryColor || '#555555';
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
    flexDirection: 'column',
    backgroundColor: '#fff',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '40px 40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const photoStyle: React.CSSProperties = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
  };

  const nameStyle: React.CSSProperties = {
    fontFamily: headingFont,
    fontSize: '28pt',
    fontWeight: 600,
    color: '#000',
    lineHeight: 1.2,
    letterSpacing: '1px',
    marginBottom: '5px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '12pt',
    color: secondary,
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '2px',
  };

  const contentContainer: React.CSSProperties = {
    display: 'flex',
    flex: 1,
  };

  const leftColumnStyle: React.CSSProperties = {
    width: '30%',
    padding: '20px 20px 20px 40px',
    boxSizing: 'border-box',
  };

  const rightColumnStyle: React.CSSProperties = {
    width: '70%',
    padding: '20px 40px 20px 20px',
    boxSizing: 'border-box',
  };

  const sectionTitle: React.CSSProperties = {
    fontFamily: headingFont,
    fontSize: '12pt',
    fontWeight: 600,
    color: '#000',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
  };

  const rightSectionTitle: React.CSSProperties = {
    ...sectionTitle,
    borderBottom: '1px solid #eaeaea',
    paddingBottom: '5px',
  };

  const entryHeader: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginBottom: '2px',
  };

  const bulletList: React.CSSProperties = {
    margin: '4px 0 0 0',
    paddingLeft: '16px',
    listStyleType: 'disc',
    color: '#555',
  };

  const bulletItem: React.CSSProperties = {
    marginBottom: '2px',
    lineHeight: 1.5,
  };

  // Left column sections
  const renderDetails = () => (
    <div key="details" style={{ marginBottom: '25px' }}>
      <div style={sectionTitle}>Details</div>
      {contactParts.map((part, i) => (
        <div key={i} style={{ marginBottom: '4px', fontSize: '9pt', color: '#555', wordBreak: 'break-word' }}>
          {part}
        </div>
      ))}
    </div>
  );

  const renderSkills = () =>
    sectionHasData('skills', resumeData) ? (
      <div key="skills" style={{ marginBottom: '25px' }}>
        <div style={sectionTitle}>Skills</div>
        {skills.map((cat) =>
          cat.skills.length > 0 ? (
            <div key={cat.id} style={{ marginBottom: '8px', fontSize: '9pt' }}>
              {cat.name && <div style={{ fontWeight: 600, color: '#333', marginBottom: '2px' }}>{cat.name}</div>}
              <div style={{ color: '#555' }}>{cat.skills.join(', ')}</div>
            </div>
          ) : null
        )}
      </div>
    ) : null;

  const renderLanguages = () =>
    sectionHasData('languages', resumeData) ? (
      <div key="languages" style={{ marginBottom: '25px' }}>
        <div style={sectionTitle}>Languages</div>
        {languages.map((lang) => (
          <div key={lang.id} style={{ marginBottom: '6px', fontSize: '9pt' }}>
            <div style={{ fontWeight: 600, color: '#333' }}>{lang.language}</div>
            <div style={{ color: '#777' }}>{lang.proficiency}</div>
          </div>
        ))}
      </div>
    ) : null;

  const renderCertifications = () =>
    sectionHasData('certifications', resumeData) ? (
      <div key="certifications" style={{ marginBottom: '25px' }}>
        <div style={sectionTitle}>Certifications</div>
        {certifications.map((cert) => (
          <div key={cert.id} style={{ marginBottom: '8px', fontSize: '9pt' }}>
            <div style={{ fontWeight: 600, color: '#333' }}>{cert.name}</div>
            <div style={{ color: '#777' }}>{cert.issuer}</div>
            {cert.date && <div style={{ color: '#999', fontSize: '8.5pt' }}>{cert.date}</div>}
          </div>
        ))}
      </div>
    ) : null;

  // Right column sections
  const renderSummary = () =>
    personalInfo.summary ? (
      <div key="summary" style={{ marginBottom: '20px' }}>
        <div style={rightSectionTitle}>Profile</div>
        <div style={{ color: '#555', whiteSpace: 'pre-wrap', fontSize: '9.5pt', lineHeight: 1.6, marginTop: '10px' }}>
          {personalInfo.summary}
        </div>
      </div>
    ) : null;

  const renderExperience = () =>
    sectionHasData('experience', resumeData) ? (
      <div key="experience" style={{ marginBottom: '20px' }}>
        <div style={rightSectionTitle}>Employment History</div>
        <div style={{ marginTop: '10px' }}>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '15px' }}>
              <div style={entryHeader}>
                <div style={{ fontWeight: 600, fontSize: '10.5pt', color: '#000' }}>
                  {exp.position}{exp.company ? `, ${exp.company}` : ''}{exp.location ? `, ${exp.location}` : ''}
                </div>
              </div>
              <div style={{ fontSize: '9pt', color: '#888', marginBottom: '6px' }}>
                {dateRange(exp.startDate, exp.endDate, exp.current)}
              </div>
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
      </div>
    ) : null;

  const renderEducation = () =>
    sectionHasData('education', resumeData) ? (
      <div key="education" style={{ marginBottom: '20px' }}>
        <div style={rightSectionTitle}>Education</div>
        <div style={{ marginTop: '10px' }}>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '12px' }}>
              <div style={entryHeader}>
                <div style={{ fontWeight: 600, fontSize: '10.5pt', color: '#000' }}>
                  {[edu.degree, edu.field].filter(Boolean).join(' in ')}{edu.institution ? `, ${edu.institution}` : ''}{edu.location ? `, ${edu.location}` : ''}
                </div>
              </div>
              <div style={{ fontSize: '9pt', color: '#888', marginBottom: '2px' }}>
                {dateRange(edu.startDate, edu.endDate)}
              </div>
              {edu.gpa && <div style={{ fontSize: '9pt', color: '#555' }}>GPA: {edu.gpa}</div>}
              {edu.honors && <div style={{ fontSize: '9pt', color: '#555' }}>{edu.honors}</div>}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderProjects = () =>
    sectionHasData('projects', resumeData) ? (
      <div key="projects" style={{ marginBottom: '20px' }}>
        <div style={rightSectionTitle}>Projects</div>
        <div style={{ marginTop: '10px' }}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '12px' }}>
              <div style={entryHeader}>
                <div style={{ fontWeight: 600, fontSize: '10.5pt', color: '#000' }}>{proj.name}</div>
                <div style={{ fontSize: '9pt', color: '#888' }}>
                  {dateRange(proj.startDate, proj.endDate)}
                </div>
              </div>
              {proj.link && <div style={{ fontSize: '9pt', color: primary }}>{proj.link}</div>}
              {proj.description && (
                <div style={{ fontSize: '9.5pt', color: '#555', marginTop: '4px' }}>{proj.description}</div>
              )}
              {proj.techStack.length > 0 && (
                <div style={{ fontSize: '9pt', color: '#777', marginTop: '4px', fontStyle: 'italic' }}>
                  Tech: {proj.techStack.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderCustom = () =>
    sectionHasData('custom', resumeData)
      ? customSections.map((sec) => (
          <div key={sec.id} style={{ marginBottom: '20px' }}>
            <div style={rightSectionTitle}>{sec.title}</div>
            <div style={{ marginTop: '10px', color: '#555', whiteSpace: 'pre-wrap', fontSize: '9.5pt' }}>
              {sec.content}
            </div>
          </div>
        ))
      : null;

  // We map the visible sections to right or left column based on their logical place in Stockholm.
  // In resume.io, 'details', 'skills', 'languages', 'certifications' are usually left.
  // 'summary', 'experience', 'education', 'projects', 'custom' are right.
  // Since our sections array determines overall order, we can just split them into left/right blocks
  // but keep relative ordering.

  const leftTypes = ['personal', 'skills', 'languages', 'certifications'];
  const rightTypes = ['personal', 'experience', 'education', 'projects', 'custom'];

  const leftRenders: Record<string, () => React.ReactNode> = {
    personal: renderDetails,
    skills: renderSkills,
    languages: renderLanguages,
    certifications: renderCertifications,
  };

  const rightRenders: Record<string, () => React.ReactNode> = {
    personal: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    projects: renderProjects,
    custom: () => <>{renderCustom()}</>,
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        {personalInfo.photoData && (
          <img src={personalInfo.photoData} alt="Profile" style={photoStyle} />
        )}
        {fullName && <div style={nameStyle}>{fullName}</div>}
        {personalInfo.jobTitle && <div style={titleStyle}>{personalInfo.jobTitle}</div>}
      </div>

      <div style={contentContainer}>
        <div style={leftColumnStyle}>
          {visibleSections
            .filter(s => leftTypes.includes(s.type))
            .map(s => {
              if (s.type === 'personal') {
                return <React.Fragment key="left_personal">{leftRenders.personal()}</React.Fragment>;
              }
              const r = leftRenders[s.type];
              return r ? r() : null;
            })}
        </div>
        <div style={rightColumnStyle}>
          {visibleSections
            .filter(s => rightTypes.includes(s.type))
            .map(s => {
              if (s.type === 'personal') {
                return <React.Fragment key="right_personal">{rightRenders.personal()}</React.Fragment>;
              }
              const r = rightRenders[s.type];
              return r ? r() : null;
            })}
        </div>
      </div>
    </div>
  );
};
