import React from 'react';
import { TemplateProps, getVisibleSections, dateRange } from '@/templates';

export const SidebarLayout: React.FC<TemplateProps> = ({ resumeData, config }) => {
  const { personalInfo } = resumeData;
  const sections = getVisibleSections(resumeData);

  const mainSections = sections.filter(s => ['experience', 'education', 'projects'].includes(s.type));
  const sideSections = sections.filter(s => !['experience', 'education', 'projects', 'personal'].includes(s.type));

  return (
    <div
      className="w-full h-full bg-white dark:bg-zinc-950 flex"
      style={{ fontFamily: config.fontBody, color: '#1f2937' }}
    >
      {/* SIDEBAR */}
      <div 
        className="w-1/3 h-full p-8 text-white flex flex-col gap-6"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="text-center mb-4">
          <h1 
            className="text-3xl font-black uppercase leading-tight mb-2"
            style={{ fontFamily: config.fontHeading }}
          >
            {personalInfo.firstName} <br /> {personalInfo.lastName}
          </h1>
          {personalInfo.jobTitle && (
            <h2 className="text-sm tracking-widest uppercase font-semibold" style={{ color: config.accentColor }}>
              {personalInfo.jobTitle}
            </h2>
          )}
        </div>

        {/* Contact Info */}
        <div className="text-xs space-y-2 opacity-90">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
          {personalInfo.linkedIn && <p>{personalInfo.linkedIn}</p>}
          {personalInfo.website && <p>{personalInfo.website}</p>}
        </div>

        {/* Side Sections (Skills, Languages, Certs) */}
        {sideSections.map(section => {
          if (section.type === 'skills') {
            return (
              <div key={section.id}>
                <h3 className="text-sm font-bold uppercase tracking-wider border-b border-white/20 pb-1 mb-3" style={{ color: config.accentColor }}>
                  {section.label || 'Skills'}
                </h3>
                <div className="flex flex-col gap-3">
                  {resumeData.skills.map(category => (
                    <div key={category.id}>
                      <p className="font-bold text-xs mb-1">{category.name}</p>
                      <div className="flex flex-wrap gap-1">
                        {category.skills.map(skill => (
                          <span key={skill} className="text-xs bg-white/10 px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          if (section.type === 'languages') {
            return (
              <div key={section.id}>
                 <h3 className="text-sm font-bold uppercase tracking-wider border-b border-white/20 pb-1 mb-3" style={{ color: config.accentColor }}>
                  {section.label || 'Languages'}
                </h3>
                <ul className="text-xs space-y-1">
                  {resumeData.languages.map(lang => (
                    <li key={lang.id} className="flex justify-between">
                      <span>{lang.language}</span>
                      <span className="opacity-70">{lang.proficiency}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
          return null;
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className="w-2/3 h-full p-8 flex flex-col gap-6">
        
        {personalInfo.summary && (
           <section>
             <h3 className="text-lg font-bold uppercase tracking-wider border-b-2 pb-1 mb-2" style={{ fontFamily: config.fontHeading, color: config.secondaryColor, borderColor: config.secondaryColor }}>
                Profile
             </h3>
             <p className="text-sm leading-relaxed text-justify text-zinc-700 dark:text-zinc-300">{personalInfo.summary}</p>
           </section>
        )}

        {mainSections.map(section => {
           if (section.type === 'experience') {
            return (
              <section key={section.id}>
                <h3 className="text-lg font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" style={{ fontFamily: config.fontHeading, color: config.secondaryColor, borderColor: config.secondaryColor }}>
                  {section.label || 'Experience'}
                </h3>
                <div className="flex flex-col gap-4">
                  {resumeData.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{exp.position}</h4>
                        <span className="text-xs font-bold" style={{ color: config.primaryColor }}>
                          {dateRange(exp.startDate, exp.endDate, exp.current)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">{exp.company} • {exp.location}</p>
                      {exp.bullets.length > 0 && (
                        <ul className="list-disc pl-5 text-sm space-y-1 text-zinc-700">
                          {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
           }

           if (section.type === 'education') {
            return (
              <section key={section.id}>
                <h3 className="text-lg font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" style={{ fontFamily: config.fontHeading, color: config.secondaryColor, borderColor: config.secondaryColor }}>
                  {section.label || 'Education'}
                </h3>
                <div className="flex flex-col gap-3">
                  {resumeData.education.map(edu => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="text-base font-bold text-zinc-900">{edu.degree} in {edu.field}</h4>
                        <span className="text-xs font-bold" style={{ color: config.primaryColor }}>
                          {dateRange(edu.startDate, edu.endDate)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-zinc-600">{edu.institution} • {edu.location}</p>
                      {edu.gpa && <p className="text-sm text-zinc-500 mt-0.5">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )
           }

           return null;
        })}
      </div>
    </div>
  );
};
