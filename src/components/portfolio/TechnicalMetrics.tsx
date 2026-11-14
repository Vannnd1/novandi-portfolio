import React from 'react';
import { useLanguage } from '../../context/useLanguage';
import { RevealOnScroll } from '../RevealOnScroll';

export const TechnicalMetrics: React.FC = () => {
  const { profile, t } = useLanguage();

  return (
    <RevealOnScroll delay={30} distance={16} className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#fafafa] border border-[#eaeaea] shadow-2xs">
        <div className="space-y-1">
          <div className="font-dm-sans italic font-bold text-2xl sm:text-3xl text-[#101010]">{profile.verifiedMetrics.gpa}</div>
          <div className="font-space text-xs sm:text-[13px] text-[#737373] uppercase tracking-wider font-semibold">{t.credibility.gpaSub}</div>
        </div>
        <div className="space-y-1">
          <div className="font-dm-sans italic font-bold text-2xl sm:text-3xl text-[#fd4aa6]">{t.credibility.tests}</div>
          <div className="font-space text-xs sm:text-[13px] text-[#737373] uppercase tracking-wider font-semibold">{t.credibility.testsSub}</div>
        </div>
        <div className="space-y-1">
          <div className="font-dm-sans italic font-bold text-2xl sm:text-3xl text-[#101010]">{t.credibility.nist}</div>
          <div className="font-space text-xs sm:text-[13px] text-[#737373] uppercase tracking-wider font-semibold">{t.credibility.nistSub}</div>
        </div>
        <div className="space-y-1">
          <div className="font-dm-sans italic font-bold text-2xl sm:text-3xl text-[#101010]">{t.credibility.data}</div>
          <div className="font-space text-xs sm:text-[13px] text-[#737373] uppercase tracking-wider font-semibold">{t.credibility.dataSub}</div>
        </div>
      </div>
    </RevealOnScroll>
  );
};
