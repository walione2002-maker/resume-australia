import React from 'react';
import { TemplateProps, getVisibleSections, dateRange } from '@/templates';

export const TraditionalLayout: React.FC<TemplateProps> = ({ resumeData, config }) => {
  const { personalInfo } = resumeData;
  const sections = getVisibleSections(resumeData);

  return (
    <div
      className="w-full h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
      style={{
        fontFamily: config.fontBody,
        color: '#111827',
      }}
    >
      <div className="p-10 flex flex-col gap-6">
        {/* HEADER */}
        <header className="text-center border-b-2 pb-4" style={{ borderColor: config.primaryColor }}>
          <h1
            className="text-4xl font-bold uppercase tracking-wide mb-1"
            style={{ fontFamily: config.fontHeading, color: config.primaryColor }}
          >
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.jobTitle && (
            <h2 className="text-xl font-medium tracking-widest uppercase mb-2" style={{ color: config.secondaryColor }}>
              {personalInfo.jobTitle}
            </h2>
          )}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && (
              <>
                <span className="text-zinc-300">•</span>
                <span>{personalInfo.phone}</span>
              </>
            )}
            {personalInfo.location && (
              <>
                <span className="text-zinc-300">•</span>
                <span>{personalInfo.location}</span>
              </>
            )}
            {personalInfo.linkedIn && (
              <>
                <span className="text-zinc-300">•</span>
                <span>{personalInfo.linkedIn}</span>
              </>
            )}
          </div>
        </header>

        {/* SUMMARY */}
        {personalInfo.summary && (
          <section>
            <p className="text-sm leading-relaxed text-justify">{personalInfo.summary}</p>
          </section>
        )}

        {/* DYNAMIC SECTIONS */}
        {sections.map((section) => {
          if (section.type === 'experience') {
            return (
              <section key={section.id}>
                <h3
                  className="text-lg font-bold uppercase tracking-wider border-b pb-1 mb-3"
                  style={{ fontFamily: config.fontHeading, color: config.primaryColor, borderColor: config.secondaryColor }}
                >
                  {section.label || 'Professional Experience'}
                </h3>
                <div className="flex flex-col gap-4">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-bold">
                          {exp.position} <span className="font-normal italic text-zinc-600">at {exp.company}</span>
                        </h4>
                        <span className="text-sm font-medium text-zinc-600 whitespace-nowrap">
                          {dateRange(exp.startDate, exp.endDate, exp.current)} | {exp.location}
                        </span>
                      </div>
                      {exp.description && <p className="text-sm mb-1 text-zinc-700 dark:text-zinc-300">{exp.description}</p>}
                      {exp.bullets.length > 0 && (
                        <ul className="list-disc pl-5 text-sm space-y-1 text-zinc-800 dark:text-zinc-200">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === 'education') {
            return (
              <section key={section.id}>
                <h3
                  className="text-lg font-bold uppercase tracking-wider border-b pb-1 mb-3"
                  style={{ fontFamily: config.fontHeading, color: config.primaryColor, borderColor: config.secondaryColor }}
                >
                  {section.label || 'Education'}
                </h3>
                <div className="flex flex-col gap-3">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-bold text-zinc-900">{edu.institution}</h4>
                        <p className="text-sm font-medium italic text-zinc-700">
                          {edu.degree} in {edu.field}
                        </p>
                        {edu.gpa && <p className="text-sm text-zinc-600">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-zinc-600 block">
                          {dateRange(edu.startDate, edu.endDate)}
                        </span>
                        <span className="text-sm text-zinc-500 block">{edu.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === 'skills') {
            return (
              <section key={section.id}>
                <h3
                  className="text-lg font-bold uppercase tracking-wider border-b pb-1 mb-3"
                  style={{ fontFamily: config.fontHeading, color: config.primaryColor, borderColor: config.secondaryColor }}
                >
                  {section.label || 'Skills'}
                </h3>
                <div className="flex flex-col gap-2">
                  {resumeData.skills.map((category) => (
                    <div key={category.id} className="flex gap-2">
                      <span className="font-bold text-sm w-32 shrink-0">{category.name}:</span>
                      <span className="text-sm text-zinc-800">{category.skills.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === 'projects') {
            return (
              <section key={section.id}>
                <h3
                  className="text-lg font-bold uppercase tracking-wider border-b pb-1 mb-3"
                  style={{ fontFamily: config.fontHeading, color: config.primaryColor, borderColor: config.secondaryColor }}
                >
                  {section.label || 'Projects'}
                </h3>
                <div className="flex flex-col gap-4">
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-bold">
                          {proj.name}
                          {proj.link && (
                            <span className="text-xs font-normal text-blue-600 ml-2">({proj.link})</span>
                          )}
                        </h4>
                        <span className="text-sm font-medium text-zinc-600 whitespace-nowrap">
                          {dateRange(proj.startDate, proj.endDate)}
                        </span>
                      </div>
                      {proj.description && <p className="text-sm text-zinc-800 mb-1">{proj.description}</p>}
                      {proj.techStack.length > 0 && (
                        <p className="text-xs font-medium text-zinc-500">
                          Technologies: {proj.techStack.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};
