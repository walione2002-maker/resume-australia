import React from 'react';
import { TemplateProps, getVisibleSections, dateRange } from '@/templates';

export const MinimalistLayout: React.FC<TemplateProps> = ({ resumeData, config }) => {
  const { personalInfo } = resumeData;
  const sections = getVisibleSections(resumeData);

  return (
    <div
      className="w-full h-full bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
      style={{ fontFamily: config.fontBody }}
    >
      <div className="p-12 flex flex-col gap-10">
        
        {/* HEADER */}
        <header className="flex justify-between items-end pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h1 
              className="text-3xl font-light tracking-widest uppercase mb-1"
              style={{ fontFamily: config.fontHeading, color: config.primaryColor }}
            >
              {personalInfo.firstName} <span className="font-medium">{personalInfo.lastName}</span>
            </h1>
            {personalInfo.jobTitle && (
              <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-500">
                {personalInfo.jobTitle}
              </h2>
            )}
          </div>
          <div className="text-right text-[0.625rem] text-zinc-500 space-y-0.5 uppercase tracking-wide">
             {personalInfo.email && <p>{personalInfo.email}</p>}
             {personalInfo.phone && <p>{personalInfo.phone}</p>}
             {personalInfo.location && <p>{personalInfo.location}</p>}
          </div>
        </header>

        {/* SUMMARY */}
        {personalInfo.summary && (
          <section className="px-8">
            <p className="text-sm font-light leading-loose text-center text-zinc-600 dark:text-zinc-400">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* DYNAMIC SECTIONS */}
        <div className="flex flex-col gap-8">
          {sections.map(section => {
             if (section.type === 'experience') {
               return (
                 <section key={section.id} className="grid grid-cols-12 gap-6">
                   <div className="col-span-3 text-right">
                     <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-1" style={{ color: config.secondaryColor }}>
                       {section.label || 'Experience'}
                     </h3>
                   </div>
                   <div className="col-span-9 flex flex-col gap-6">
                     {resumeData.experience.map(exp => (
                       <div key={exp.id}>
                         <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">{exp.position}</h4>
                         <div className="flex justify-between text-xs text-zinc-500 mb-2 uppercase tracking-wide">
                           <span>{exp.company}</span>
                           <span>{dateRange(exp.startDate, exp.endDate, exp.current)}</span>
                         </div>
                         {exp.bullets.length > 0 && (
                           <ul className="list-disc pl-4 text-xs font-light leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-1">
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
                 <section key={section.id} className="grid grid-cols-12 gap-6">
                   <div className="col-span-3 text-right">
                     <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-1" style={{ color: config.secondaryColor }}>
                       {section.label || 'Education'}
                     </h3>
                   </div>
                   <div className="col-span-9 flex flex-col gap-4">
                     {resumeData.education.map(edu => (
                       <div key={edu.id} className="flex justify-between items-baseline">
                         <div>
                           <h4 className="text-sm font-bold text-zinc-900">{edu.degree} — {edu.field}</h4>
                           <p className="text-xs text-zinc-500 uppercase tracking-wide mt-0.5">{edu.institution}</p>
                         </div>
                         <div className="text-right">
                           <span className="text-xs text-zinc-500 uppercase tracking-wide">{dateRange(edu.startDate, edu.endDate)}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 </section>
               )
             }

             if (section.type === 'skills') {
               return (
                 <section key={section.id} className="grid grid-cols-12 gap-6">
                   <div className="col-span-3 text-right">
                     <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-1" style={{ color: config.secondaryColor }}>
                       {section.label || 'Skills'}
                     </h3>
                   </div>
                   <div className="col-span-9 flex flex-col gap-2">
                     {resumeData.skills.map(cat => (
                       <div key={cat.id} className="text-xs font-light text-zinc-700">
                         <span className="font-bold text-zinc-900 mr-2">{cat.name}:</span>
                         {cat.skills.join(', ')}
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
