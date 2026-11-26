import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { RevealOnScroll } from '../RevealOnScroll';
import { ViceCornerBrackets } from '../ViceFrameAccents';

interface TimelineSectionProps {
  type: 'experience' | 'education';
}

interface NormalizedTimelineEntry {
  key: string;
  code: string;
  institution: string;
  period: string;
  badgeText: string;
  score?: string;
  description: string;
  highlights?: string[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ type }) => {
  const { profile } = useLanguage();

  const entries: NormalizedTimelineEntry[] =
    type === 'experience'
      ? profile.experience.map((exp, idx) => ({
          key: `exp-${idx}`,
          code: `EXP // 0${idx + 1}`,
          institution: exp.institution,
          period: exp.period,
          badgeText: exp.role,
          description: exp.description,
          highlights: exp.highlights,
        }))
      : profile.education.map((edu, idx) => ({
          key: `edu-${idx}`,
          code: `EDU // 0${idx + 1}`,
          institution: edu.institution,
          period: edu.period,
          badgeText: edu.degree,
          score: edu.score,
          description: edu.description,
        }));

  return (
    <motion.div
      key={type}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] as const }}
      className="space-y-10"
    >
      <div className="relative pl-7 sm:pl-9 ml-2 sm:ml-4 space-y-12 transition-colors">
        {/* Vertical Vice Sunset Gradient Rail */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-[#00d9ff]/70 via-[#ff3b9a]/65 to-[#ffb35c]/25"
        />

        {entries.map((entry, idx) => (
          <RevealOnScroll key={entry.key} delay={idx * 60} distance={18}>
            <div className="relative group p-6 sm:p-8 rounded-2xl bg-white/90 dark:bg-[#140d22]/95 bg-vice-scanlines hover:bg-white hover:dark:bg-[#1a112d] border border-[#f0d8e6] dark:border-[#352259] hover:border-[#ff3b9a]/45 hover:dark:border-[#ff3b9a]/50 transition-all duration-300 hover:shadow-[0_14px_34px_rgba(255,59,154,0.12)] overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#00d9ff] via-[#ff3b9a] to-[#ffb35c] opacity-30 group-hover:opacity-100 transition-opacity duration-300"
              />
              <ViceCornerBrackets
                size="sm"
                className="opacity-35 group-hover:opacity-95 transition-opacity duration-300"
              />

              {/* Animated Timeline Node centered directly on the vertical rail */}
              <span className="absolute -left-[34px] sm:-left-[42px] top-7 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#ff3b9a] to-[#ff8a4c] ring-4 ring-[#fff9f6] dark:ring-[#0b0614] shadow-[0_0_10px_rgba(255,59,154,0.45)]" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[10px] font-bold tracking-widest text-[#0284c7] dark:text-[#00d9ff]/90 uppercase"
                  >
                    {entry.code}
                  </span>
                  <time className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#ff3b9a] shrink-0">
                    {entry.period}
                  </time>
                </div>

                <h3 className="font-hegarty text-2xl sm:text-3xl md:text-4xl text-[#1a1026] dark:text-[#fdf7ff] m-0 pb-2.5 leading-tight transition-colors">
                  {entry.institution}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#fff1f8] dark:bg-[#23153b] text-[#523e63] dark:text-[#e2d4f0] border border-[#f0d8e6] dark:border-[#372459] font-geist font-semibold text-sm transition-colors">
                    {entry.badgeText}
                  </span>
                  {entry.score && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#ff3b9a]/12 text-[#e11d74] dark:text-[#ff5eb0] border border-[#ff3b9a]/30 font-geist font-bold text-sm">
                      {entry.score}
                    </span>
                  )}
                </div>

                <p className="font-space font-medium text-base text-[#523e63] dark:text-[#b4a0ce] leading-[1.65] m-0 transition-colors">
                  {entry.description}
                </p>

                {entry.highlights && entry.highlights.length > 0 && (
                  <ul className="font-space text-sm text-[#523e63] dark:text-[#d6c7e8] space-y-2.5 mt-4 pt-3 border-t border-[#f0d8e6]/80 dark:border-[#2f1f4d] transition-colors">
                    {entry.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#ff3b9a] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </motion.div>
  );
};
