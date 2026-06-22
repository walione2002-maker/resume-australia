import React from 'react';
import { TemplateProps, getVisibleSections, dateRange } from '@/templates';

export const ExecutiveLayout: React.FC<TemplateProps> = ({ resumeData, config }) => {
  const { personalInfo } = resumeData;
  const sections = getVisibleSections(resumeData);

  return (
    <div
      className="w-full h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
      style={{ fontFamily: config.fontBody }}
    >
      <div className="p-12 flex flex-col gap-6">
        
        {/* HEADER */}
        <header className="text-center pb-6 mb-2 border-b-2" style={{ borderColor: config.primaryColor }}>
          <h1 
            className="text-4xl font-bold tracking-tight mb-2"
            style={{ fontFamily: config.fontHeading, color: config.primaryColor }}
          >
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="flex justify-center items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
             {personalInfo.location && <span>{personalInfo.location}</span>}
             {personalInfo.phone && <><span className="text-zinc-400">|</span><span>{personalInfo.phone}</span></>}
             {personalInfo.email && <><span className="text-zinc-400">|</span><span>{personalInfo.email}</span></>}
             {personalInfo.linkedIn && <><span className="text-zinc-400">|</span><span>{personalInfo.linkedIn}</span></>}
          </div>
        </header>

        {/* SUMMARY */}
        {personalInfo.summary && (
          <section className="mb-4">
            <p className="text-sm font-medium leading-relaxed text-justify text-zinc-800 dark:text-zinc-200">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* DYNAMIC SECTIONS */}
        <div className="flex flex-col gap-6">
          {sections.map(section => {
            if (section.type === 'experience') {
              return (
                <section key={section.id}>
                  <h3 className="text-lg font-bold uppercase tracking-widest border-b pb-1 mb-4" style={{ fontFamily: config.fontHeading, color: config.primaryColor, borderColor: config.secondaryColor }}>
                    {section.label || 'Experience'}
                  </h3>
                  <div className="flex flex-col gap-5">
                    {resumeData.experience.map(exp => (
                      <div key={exp.id} className="grid grid-cols-12 gap-4">
                        <div className="col-span-3 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                          {dateRange(exp.startDate, exp.endDate, exp.current)}
                        </div>
                        <div className="col-span-9">
                          <h4 className="text-base font-bold text-zinc-900 mb-0.5">{exp.company}</h4>
                          <p className="text-sm font-medium italic mb-2" style={{ color: config.secondaryColor }}>{exp.position}</p>
                          {exp.bullets.length > 0 && (
                            <ul className="list-disc pl-4 text-sm text-zinc-800 space-y-1">
                              {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )
            }

            if (section.type === 'education') {
              return (
                <section key={section.id}>
                  <h3 className="text-lg font-bold uppercase tracking-widest border-b pb-1 mb-4" style={{ fontFamily: config.fontHeading, color: config.primaryColor, borderColor: config.secondaryColor }}>
                    {section.label || 'Education'}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {resumeData.education.map(edu => (
                      <div key={edu.id} className="grid grid-cols-12 gap-4">
                        <div className="col-span-3 text-sm font-bold text-zinc-600">
                          {dateRange(edu.startDate, edu.endDate)}
                        </div>
                        <div className="col-span-9">
                          <h4 className="text-base font-bold text-zinc-900 mb-0.5">{edu.institution}</h4>
                          <p className="text-sm font-medium italic mb-1" style={{ color: config.secondaryColor }}>
                            {edu.degree} in {edu.field}
                          </p>
                          {edu.gpa && <p className="text-sm text-zinc-700">GPA: {edu.gpa}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )
            }

            if (section.type === 'skills') {
              return (
                <section key={section.id}>
                  <h3 className="text-lg font-bold uppercase tracking-widest border-b pb-1 mb-4" style={{ fontFamily: config.fontHeading, color: config.primaryColor, borderColor: config.secondaryColor }}>
                    {section.label || 'Core Competencies'}
                  </h3>
                  <div className="grid grid-cols-12 gap-4">
                     <div className="col-span-3"></div>
                     <div className="col-span-9 flex flex-col gap-2 text-sm text-zinc-800">
                        {resumeData.skills.map(cat => (
                          <div key={cat.id}>
                            <span className="font-bold text-zinc-900 mr-2">{cat.name}:</span>
                            {cat.skills.join(', ')}
                          </div>
                        ))}
                     </div>
                  </div>
                </section>
              )
            }

            return null;
          })}
        </div>

      </div>
    </div>
  );
};
