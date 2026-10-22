import React, { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react';
import { profileData } from '../data/profile';
import { getMailtoUrl, handleSmartEmailClick } from '../utils/email';

export const StickerCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profileData.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <a
      href={getMailtoUrl(profileData.email)}
      onClick={(e) => handleSmartEmailClick(e, profileData.email)}
      className="group block relative w-full min-h-[380px] sm:min-h-[460px] p-5 sm:p-6 bg-[#f7f7f7] border border-[#e8e8e8] rounded-xl shadow-[0_10px_18px_rgba(0,0,0,0.16)] transition-all duration-200 hover:shadow-xl hover:-translate-y-1 overflow-hidden select-none no-underline cursor-pointer"
      title="Kirim email ke Novandi (membuka aplikasi Email di HP / Gmail di Desktop)"
    >
      {/* Lime Green Accent Inner Layer */}
      <div className="absolute inset-5 sm:inset-6 bg-[#9dff34] rounded-xl overflow-hidden transition-colors group-hover:bg-[#92f52c]" />

      {/* Content Layer: Right-aligned Text */}
      <div className="relative z-10 w-full min-h-[340px] sm:min-h-[412px] flex flex-col justify-end items-end p-6 sm:p-10 text-right">
        <h2 className="font-hegarty text-[#3d3d3d] text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight max-w-[640px] text-right">
          Ready to elevate your workflow?
        </h2>

        {/* Email Address & Quick Copy Pill */}
        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 text-xs sm:text-sm font-space">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/10 hover:bg-black/15 text-[#202020] font-medium transition-colors">
            <Mail className="w-3.5 h-3.5 text-[#202020]" />
            <span>{profileData.email}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#202020] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/10 hover:bg-black/20 text-[#202020] font-semibold transition-all active:scale-95 cursor-pointer"
            title="Salin alamat email"
            aria-label="Salin alamat email"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-800" />
                <span className="text-emerald-900 font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#202020]" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      </div>
    </a>
  );
};
