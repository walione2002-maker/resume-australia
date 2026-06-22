import React from 'react';
import { TemplateProps, getVisibleSections, dateRange } from '@/templates';

export const GridBannerLayout: React.FC<TemplateProps> = ({ resumeData, config }) => {
  const { personalInfo } = resumeData;
  const sections = getVisibleSections(resumeData);

  const leftSections = sections.filter(s => ['experience', 'projects'].includes(s.type));
  const rightSections = sections.filter(s => !['experience', 'projects', 'personal'].includes(s.type));

  return (
    <div
      className="w-full h-full bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 flex flex-col"
      style={{ fontFamily: config.fontBody }}
    >
      {/* FULL WIDTH BANNER */}
      <div 
        className="w-full p-10 text-white flex flex-col justify-center"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 
              className="text-4xl font-black uppercase tracking-tight mb-1"
              style={{ fontFamily: config.fontHeading }}
            >
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.jobTitle && (
              <h2 className="text-lg font-bold tracking-widest uppercase opacity-90" style={{ color: config.accentColor }}>
                {personalInfo.jobTitle}
              </h2>
            )}
          </div>
          <div className="text-right text-xs font-medium space-y-1 opacity-80">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
          </div>
        </div>

        {personalInfo.summary && (
          <p className="text-sm font-medium leading-relaxed opacity-95 max-w-3xl">
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* TWO COLUMN GRID BELOW BANNER */}
      <div className="flex-1 p-10 grid grid-cols-12 gap-10">
        
        {/* LEFT COLUMN */}
        <div className="col-span-7 flex flex-col gap-6">
          {leftSections.map(section => {
            if (section.type === 'experience') {
              return (
                <section key={section.id}>
                  <h3 className="text-xl font-bold uppercase tracking-widest border-b-2 pb-1 mb-4" style={{ fontFamily: config.fontHeading, color: config.primaryColor, borderColor: config.secondaryColor }}>
                    {section.label || 'Experience'}
                  </h3>
                  <div className="flex flex-col gap-5">
                    {resumeData.experience.map(exp => (
                      <div key={exp.id}>
                        <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{exp.position}</h4>
                        <p className="text-sm font-bold mb-1" style={{ color: config.secondaryColor }}>
                          {exp.company} | {dateRange(exp.startDate, exp.endDate, exp.current)}
                        </p>
                        {exp.bullets.length > 0 && (
                          <ul className="list-disc pl-4 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                            {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )
            }
            return null;
          })}
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-5 flex flex-col gap-6">
          {rightSections.map(section => {
            if (section.type === 'education') {
              return (
                <section key={section.id}>
                  <h3 className="text-xl font-bold uppercase tracking-widest border-b-2 pb-1 mb-4" style={{ fontFamily: config.fontHeading, color: config.primaryColor, borderColor: config.secondaryColor }}>
                    {section.label || 'Education'}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {resumeData.education.map(edu => (
                      <div key={edu.id}>
                        <h4 className="text-sm font-bold text-zinc-900">{edu.degree}</h4>
                        <p className="text-sm text-zinc-700">{edu.institution}</p>
                        <p className="text-xs font-bold mt-0.5" style={{ color: config.secondaryColor }}>
                          {dateRange(edu.startDate, edu.endDate)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )
            }

            if (section.type === 'skills') {
              return (
                <section key={section.id}>
                  <h3 className="text-xl font-bold uppercase tracking-widest border-b-2 pb-1 mb-4" style={{ fontFamily: config.fontHeading, color: config.primaryColor, borderColor: config.secondaryColor }}>
                    {section.label || 'Skills'}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {resumeData.skills.map(cat => (
                      <div key={cat.id}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">{cat.name}</h4>
                        <p className="text-sm font-medium text-zinc-800">{cat.skills.join(' • ')}</p>
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
    </div>
  );
};
