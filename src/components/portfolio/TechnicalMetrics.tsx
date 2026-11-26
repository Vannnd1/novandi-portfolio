import React from 'react';
import { useLanguage } from '../../context/useLanguage';
import { RevealOnScroll } from '../RevealOnScroll';

export const TechnicalMetrics: React.FC = () => {
  const { profile, t } = useLanguage();

  return (
    <RevealOnScroll delay={30} distance={16} className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#140d22]/82 border border-[#f0d8e6] dark:border-[#2f1f4d] shadow-2xs transition-colors">
        <div className="space-y-1">
          <div className="font-dm-sans italic font-bold text-2xl sm:text-3xl text-[#1a1026] dark:text-[#fdf7ff] transition-colors">{profile.verifiedMetrics.gpa}</div>
          <div className="font-space text-xs sm:text-[13px] text-[#7b648f] dark:text-[#b4a0ce] uppercase tracking-wider font-semibold transition-colors">{t.credibility.gpaSub}</div>
        </div>
        <div className="space-y-1">
          <div className="inline-block pr-1 font-dm-sans italic font-bold text-2xl sm:text-3xl bg-gradient-to-r from-[#e61e7a] to-[#f97316] dark:from-[#ff4da6] dark:to-[#ffb35c] bg-clip-text text-transparent">{t.credibility.tests}</div>
          <div className="font-space text-xs sm:text-[13px] text-[#7b648f] dark:text-[#b4a0ce] uppercase tracking-wider font-semibold transition-colors">{t.credibility.testsSub}</div>
        </div>
        <div className="space-y-1">
          <div className="font-dm-sans italic font-bold text-2xl sm:text-3xl text-[#1a1026] dark:text-[#fdf7ff] transition-colors">{t.credibility.nist}</div>
          <div className="font-space text-xs sm:text-[13px] text-[#7b648f] dark:text-[#b4a0ce] uppercase tracking-wider font-semibold transition-colors">{t.credibility.nistSub}</div>
        </div>
        <div className="space-y-1">
          <div className="font-dm-sans italic font-bold text-2xl sm:text-3xl text-[#1a1026] dark:text-[#fdf7ff] transition-colors">{t.credibility.data}</div>
          <div className="font-space text-xs sm:text-[13px] text-[#7b648f] dark:text-[#b4a0ce] uppercase tracking-wider font-semibold transition-colors">{t.credibility.dataSub}</div>
        </div>
      </div>
    </RevealOnScroll>
  );
};
