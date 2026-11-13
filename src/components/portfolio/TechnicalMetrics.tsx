import React from 'react';
import { useLanguage } from '../../context/useLanguage';
import { RevealOnScroll } from '../RevealOnScroll';

export const TechnicalMetrics: React.FC = () => {
  const { profile, t } = useLanguage();

  return (
    <RevealOnScroll delay={30} distance={16} className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#fafafa] border border-[#eaeaea] shadow-2xs">
        <div className="space-y-0.5">
          <div className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#101010]">{profile.verifiedMetrics.gpa}</div>
          <div className="font-space text-[11px] text-[#737373] uppercase tracking-wider font-semibold">{t.credibility.gpaSub}</div>
        </div>
        <div className="space-y-0.5">
          <div className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#fd4aa6]">{t.credibility.tests}</div>
          <div className="font-space text-[11px] text-[#737373] uppercase tracking-wider font-semibold">{t.credibility.testsSub}</div>
        </div>
        <div className="space-y-0.5">
          <div className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#101010]">{t.credibility.nist}</div>
          <div className="font-space text-[11px] text-[#737373] uppercase tracking-wider font-semibold">{t.credibility.nistSub}</div>
        </div>
        <div className="space-y-0.5">
          <div className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#101010]">{t.credibility.data}</div>
          <div className="font-space text-[11px] text-[#737373] uppercase tracking-wider font-semibold">{t.credibility.dataSub}</div>
        </div>
      </div>
    </RevealOnScroll>
  );
};
