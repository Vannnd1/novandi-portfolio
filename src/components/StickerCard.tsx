import React, { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { getMailtoUrl, handleSmartEmailClick } from '../utils/email';
import { Magnetic } from './MagneticButton';

export const StickerCard: React.FC = () => {
  const { t, profile } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      id="contact-card"
      className="group relative w-full min-h-[380px] sm:min-h-[460px] p-5 sm:p-6 bg-[#f7f7f7] border border-[#e8e8e8] rounded-2xl sm:rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden select-none"
    >
      {/* Clickable Card Stretched Link */}
      <a
        href={getMailtoUrl(profile.email)}
        onClick={(e) => handleSmartEmailClick(e, profile.email)}
        className="absolute inset-0 z-0 rounded-2xl sm:rounded-3xl focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
        title={t.stickerCard.titleAttr}
        aria-label={t.stickerCard.titleAttr}
      />

      {/* Lime Green Accent Inner Layer */}
      <div className="pointer-events-none absolute inset-4 sm:inset-5 bg-[#9dff34] rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-300 group-hover:bg-[#92f52c] shadow-inner">
        {/* Subtle decorative technical grid on top of lime */}
        <div className="absolute inset-0 opacity-10 bg-tech-grid" />
      </div>

      {/* Top Left Engineering Watermark */}
      <div className="absolute top-8 left-8 sm:top-10 sm:left-10 z-10 pointer-events-none flex items-center gap-2 font-space text-xs font-bold text-[#202020]/70 uppercase tracking-widest">
        <Sparkles className="w-4 h-4 text-[#202020]" />
        <span>Informatics Engineer · Available</span>
      </div>

      {/* Content Layer: Right-aligned Text */}
      <div className="relative z-10 w-full min-h-[340px] sm:min-h-[412px] flex flex-col justify-end items-end p-6 sm:p-10 text-right pointer-events-none">
        <h2 className="font-hegarty text-[#262626] text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight max-w-[680px] text-right">
          {t.stickerCard.heading}
        </h2>

        {/* Email Address & Quick Copy Pill */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 text-xs sm:text-sm font-space pointer-events-auto">
          <Magnetic strength={0.25}>
            <a
              href={getMailtoUrl(profile.email)}
              onClick={(e) => handleSmartEmailClick(e, profile.email)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 hover:bg-black/20 text-[#101010] font-semibold transition-all duration-150 no-underline cursor-pointer active:scale-95 shadow-xs"
              title={profile.email}
            >
              <Mail className="w-4 h-4 text-[#101010]" />
              <span>{profile.email}</span>
              <ArrowUpRight className="w-4 h-4 text-[#101010] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/10 hover:bg-black/25 text-[#101010] font-bold transition-all duration-150 active:scale-95 cursor-pointer relative z-20 shadow-xs"
              title={t.stickerCard.copyTitle}
              aria-label={t.stickerCard.copyTitle}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span className="text-emerald-950 font-bold">{t.stickerCard.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#101010]" />
                  <span>{t.stickerCard.copy}</span>
                </>
              )}
            </button>
          </Magnetic>
        </div>
      </div>
    </div>
  );
};
