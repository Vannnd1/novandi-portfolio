import React from 'react';
import { useLanguage } from '../../context/useLanguage';
import { RevealOnScroll } from '../RevealOnScroll';
import { ViceCornerBrackets } from '../ViceFrameAccents';

export const TechnicalMetrics: React.FC = () => {
  const { profile, t } = useLanguage();

  const metrics = [
    {
      code: 'SYS.01',
      value: profile.verifiedMetrics.gpa,
      label: t.credibility.gpaSub,
      accent: 'text-[#1a1026] dark:text-[#fdf7ff]',
    },
    {
      code: 'SYS.02',
      value: t.credibility.tests,
      label: t.credibility.testsSub,
      accent:
        'inline-block pr-1 bg-gradient-to-r from-[#e61e7a] to-[#f97316] dark:from-[#ff4da6] dark:to-[#ffb35c] bg-clip-text text-transparent',
    },
    {
      code: 'SYS.03',
      value: t.credibility.nist,
      label: t.credibility.nistSub,
      accent: 'text-[#1a1026] dark:text-[#fdf7ff]',
    },
    {
      code: 'SYS.04',
      value: t.credibility.data,
      label: t.credibility.dataSub,
      accent: 'text-[#1a1026] dark:text-[#fdf7ff]',
    },
  ];

  return (
    <RevealOnScroll delay={30} distance={16} className="w-full">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/92 dark:bg-[#140d22]/95 bg-vice-scanlines border border-[#f0d8e6] dark:border-[#352259] shadow-[0_6px_26px_rgba(168,85,247,0.05)] dark:shadow-[0_10px_32px_rgba(0,0,0,0.45)] transition-colors">
        <div
          aria-hidden="true"
          className="h-[2px] w-full bg-gradient-to-r from-[#00d9ff]/70 via-[#ff3b9a] to-[#ffb35c]/75"
        />
        <ViceCornerBrackets size="sm" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#f0d8e6]/75 dark:bg-[#2f1f4d]/85">
          {metrics.map((metric) => (
            <div
              key={metric.code}
              className="bg-white/95 dark:bg-[#140d22] bg-vice-scanlines p-5 sm:p-6 lg:px-7 space-y-1.5 transition-colors"
            >
              <div className="font-mono text-[10px] font-bold tracking-widest text-[#0284c7] dark:text-[#00d9ff]/85 uppercase">
                {metric.code}
              </div>
              <div className={`font-dm-sans italic font-bold text-2xl sm:text-3xl transition-colors ${metric.accent}`}>
                {metric.value}
              </div>
              <div className="font-space text-xs sm:text-[13px] text-[#6d5680] dark:text-[#b4a0ce] uppercase tracking-wider font-semibold transition-colors">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
};
