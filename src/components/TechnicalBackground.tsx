import React from 'react';
import { GraduationCap, Briefcase, Code2 } from 'lucide-react';
import { profileData } from '../data/profile';

export const TechnicalBackground: React.FC = () => {
  return (
    <section id="profile" className="py-16 md:py-24 border-t border-[#E4E4E1] bg-[#FAFAF9]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[#2563EB] uppercase font-semibold">
            <span className="w-2 h-0.5 bg-[#2563EB]" />
            <span>03 · Background & Competencies</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111318]">
            Education, Experience & Technical Skills
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#575B66] max-w-2xl leading-relaxed">
            Academic credentials from Universitas Gunadarma, full-stack cloud cohort experience from Dicoding Indonesia, and verified competencies across software engineering, cryptography, and data analysis.
          </p>
        </div>

        {/* Two-Column Grid: Education & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Formal Education */}
          <div className="bg-white border border-[#E4E4E1] rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F4F4F2] font-mono-tech text-xs font-semibold text-[#111318] uppercase">
              <GraduationCap className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
              <span>Formal Education</span>
            </div>

            <div className="space-y-6">
              {profileData.education.map((edu, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-sans-body font-semibold text-base text-[#111318]">
                      {edu.degree}
                    </h3>
                    <span className="font-mono-tech text-xs text-[#858A96] shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#575B66]">
                    <span>{edu.institution}</span>
                    {edu.score && (
                      <span className="px-2 py-0.5 rounded bg-[#059669]/10 text-[#059669] font-semibold">
                        {edu.score}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#575B66] leading-relaxed pt-1">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Cohort Experience */}
          <div className="bg-white border border-[#E4E4E1] rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F4F4F2] font-mono-tech text-xs font-semibold text-[#111318] uppercase">
              <Briefcase className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
              <span>Technical Experience</span>
            </div>

            <div className="space-y-6">
              {profileData.experience.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-sans-body font-semibold text-base text-[#111318]">
                      {exp.role}
                    </h3>
                    <span className="font-mono-tech text-xs text-[#858A96] shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs font-mono-tech text-[#2563EB] font-medium">
                    {exp.institution}
                  </div>
                  <p className="text-xs text-[#575B66] leading-relaxed pt-1">
                    {exp.description}
                  </p>
                  <ul className="pt-2 space-y-1.5 text-xs text-[#575B66]">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-[#2563EB] font-bold font-mono-tech">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Categorized Skills Matrix */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold text-[#111318] uppercase">
            <Code2 className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
            <span>Verified Technical Competencies Matrix</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profileData.skillCategories.map((category) => (
              <div
                key={category.title}
                className="bg-white border border-[#E4E4E1] rounded-lg p-5 space-y-3"
              >
                <h3 className="font-mono-tech text-xs font-semibold text-[#111318] pb-2 border-b border-[#F4F4F2]">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono-tech text-xs px-2.5 py-1 rounded bg-[#FAFAF9] border border-[#E4E4E1] text-[#111318]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
