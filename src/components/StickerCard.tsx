import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { profileData } from '../data/profile';

export const StickerCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profileData.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div className="w-full flex justify-center py-6">
      <div className="bg-white p-3 sm:p-4 rounded-3xl border border-[#E5E7EB] shadow-sm max-w-sm w-full transition-transform hover:-translate-y-1">
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}`}
          target="_blank"
          rel="noreferrer"
          className="group block bg-[#bef264] hover:bg-[#a3e635] text-[#111318] p-8 sm:p-10 rounded-2xl transition-all shadow-inner relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-display font-black text-3xl sm:text-4xl leading-[1.05] tracking-tight max-w-[200px]">
              Ready to elevate your workflow?
            </h3>
            <span className="p-2.5 rounded-full bg-white/80 group-hover:bg-white group-hover:scale-110 group-hover:rotate-12 transition-all shadow-xs">
              <ArrowUpRight className="w-5 h-5 text-[#111318]" />
            </span>
          </div>

          <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-bold font-sans">
            <span className="text-black/80">{profileData.email}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/10 hover:bg-black/20 text-black text-[11px] font-semibold transition-colors cursor-pointer"
              title="Copy email"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-700" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </a>
      </div>
    </div>
  );
};
