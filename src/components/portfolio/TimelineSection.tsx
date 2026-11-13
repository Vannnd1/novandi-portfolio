import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { RevealOnScroll } from '../RevealOnScroll';

interface TimelineSectionProps {
  type: 'experience' | 'education';
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ type }) => {
  const { profile } = useLanguage();

  if (type === 'experience') {
    return (
      <motion.div
        key="experience"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] as const }}
        className="space-y-10"
      >
        <div className="border-l-2 border-[#101010]/15 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-12 relative">
          {profile.experience.map((exp, idx) => (
            <RevealOnScroll key={idx} delay={idx * 60} distance={18}>
              <div className="relative group p-6 sm:p-8 rounded-2xl bg-[#fafafa]/70 hover:bg-white border border-[#eaeaea] hover:border-[#101010]/20 transition-all duration-300 hover:shadow-md">
                {/* Animated Timeline Node */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-7 w-3.5 h-3.5 rounded-full bg-[#fd4aa6] ring-4 ring-white shadow-xs" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2">
                  <h3 className="font-hegarty text-2xl sm:text-3xl md:text-4xl text-[#101010] m-0 leading-tight">
                    {exp.institution}
                  </h3>
                  <time className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#fd4aa6] shrink-0">
                    {exp.period}
                  </time>
                </div>

                <div className="inline-block px-3 py-1 rounded-full bg-black/5 text-[#404040] font-geist font-semibold text-sm mb-3">
                  {exp.role}
                </div>

                <p className="font-space font-medium text-base text-[#666] leading-[1.65] m-0">
                  {exp.description}
                </p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="font-space text-sm text-[#555] space-y-2.5 mt-4 pt-3 border-t border-[#eaeaea]/60">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#fd4aa6] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="education"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] as const }}
      className="space-y-10"
    >
      <div className="border-l-2 border-[#101010]/15 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-12 relative">
        {profile.education.map((edu, idx) => (
          <RevealOnScroll key={idx} delay={idx * 60} distance={18}>
            <div className="relative group p-6 sm:p-8 rounded-2xl bg-[#fafafa]/70 hover:bg-white border border-[#eaeaea] hover:border-[#101010]/20 transition-all duration-300 hover:shadow-md">
              {/* Timeline Node */}
              <span className="absolute -left-[31px] sm:-left-[39px] top-7 w-3.5 h-3.5 rounded-full bg-[#fd4aa6] ring-4 ring-white shadow-xs" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2">
                <h3 className="font-hegarty text-2xl sm:text-3xl md:text-4xl text-[#101010] m-0 leading-tight">
                  {edu.institution}
                </h3>
                <time className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#fd4aa6] shrink-0">
                  {edu.period}
                </time>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-block px-3 py-1 rounded-full bg-black/5 text-[#404040] font-geist font-semibold text-sm">
                  {edu.degree}
                </span>
                {edu.score && (
                  <span className="inline-block px-3 py-1 rounded-full bg-[#fd4aa6]/10 text-[#fd4aa6] border border-[#fd4aa6]/25 font-geist font-bold text-sm">
                    {edu.score}
                  </span>
                )}
              </div>

              <p className="font-space font-medium text-base text-[#666] leading-[1.65] m-0">
                {edu.description}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </motion.div>
  );
};
