import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, MapPin } from 'lucide-react';
import { profileData } from '../data/profile';
import { GitHubIcon } from './Icons';
import { RevealOnScroll } from './RevealOnScroll';

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <footer id="contact" className="border-t border-[#E4E4E1] bg-white">
      {/* Contact Section */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 md:py-24 space-y-10">
        
        <RevealOnScroll delay={0}>
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#2563EB] uppercase font-semibold">
              <span className="w-2 h-0.5 bg-[#2563EB]" />
              <span>04 · Communication & Links</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#111318] tracking-tight">
              Let's engineer reliable software and verify technical ideas.
            </h2>
            <p className="font-sans-body text-sm sm:text-base text-[#575B66] leading-relaxed">
              Open for technical opportunities, engineering collaboration, and research discussions in Software Development, Applied Cryptography, and Data Analysis.
            </p>
          </div>
        </RevealOnScroll>

        {/* Action Card */}
        <RevealOnScroll delay={100}>
          <div className="bg-[#FAFAF9] border border-[#E4E4E1] hover:border-[#CBD5E1] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-colors">
            <div className="space-y-2">
              <span className="font-mono-tech text-xs text-[#858A96] uppercase tracking-wider block">
                Direct Contact Channel
              </span>
              <div className="font-mono-tech text-lg sm:text-xl font-bold text-[#111318]">
                {profileData.email}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#575B66]">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                <span>{profileData.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111318] hover:bg-[#2563EB] text-white font-mono-tech text-xs font-medium rounded transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#2563EB] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#059669]" aria-hidden="true" />
                    <span className="text-[#FAFAF9] font-semibold">COPIED TO CLIPBOARD!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${profileData.email}`}
                className="group inline-flex items-center gap-2 px-4 py-2.5 border border-[#E4E4E1] hover:border-[#111318] bg-white text-[#111318] font-mono-tech text-xs font-medium rounded transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#2563EB]"
              >
                <Mail className="w-4 h-4 text-[#575B66]" aria-hidden="true" />
                <span>Open Mailer</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#858A96] group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" aria-hidden="true" />
              </a>

              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2.5 border border-[#E4E4E1] hover:border-[#111318] bg-white text-[#111318] font-mono-tech text-xs font-medium rounded transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#2563EB]"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#858A96] group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" aria-hidden="true" />
              </a>
            </div>
          </div>
        </RevealOnScroll>

      </div>

      {/* Understated Minimal Footnote */}
      <div className="border-t border-[#E4E4E1] bg-[#FAFAF9] py-8">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono-tech text-xs text-[#858A96]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" aria-hidden="true" />
            <span>© 2026 Novandi Ahmad Ramdhan · Universitas Gunadarma S1 Informatika</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>React 19 · TypeScript · Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
