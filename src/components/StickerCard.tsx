import React from 'react';
import { profileData } from '../data/profile';

export const StickerCard: React.FC = () => {
  return (
    <a
      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}`}
      target="_blank"
      rel="noreferrer"
      className="group block relative w-full min-h-[380px] sm:min-h-[460px] p-5 sm:p-6 bg-[#f7f7f7] border border-[#e8e8e8] rounded-xl shadow-[0_10px_18px_rgba(0,0,0,0.16)] transition-all duration-200 hover:shadow-xl hover:-translate-y-1 overflow-hidden select-none no-underline cursor-pointer"
    >
      {/* Lime Green Accent Inner Layer */}
      <div className="absolute inset-5 sm:inset-6 bg-[#9dff34] rounded-xl overflow-hidden transition-colors group-hover:bg-[#92f52c]" />

      {/* Content Layer: Right-aligned Text matching Ezra's site */}
      <div className="relative z-10 w-full min-h-[340px] sm:min-h-[412px] flex flex-col justify-end items-end p-6 sm:p-10 text-right">
        <h2 className="font-hegarty text-[#3d3d3d] text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight max-w-[500px] text-right">
          Ready to elevate your workflow?
        </h2>
      </div>
    </a>
  );
};
