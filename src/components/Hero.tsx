import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Copy, Check, Terminal, ShieldCheck, Database, Award } from 'lucide-react';
import { profileData } from '../data/profile';
import { RevealOnScroll } from './RevealOnScroll';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section className="pt-12 md:pt-20 pb-16 border-b border-[#E4E4E1]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Identity & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <RevealOnScroll delay={0}>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#F4F4F2] border border-[#E4E4E1] font-mono-tech text-xs text-[#575B66]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
                <span>S1 INFORMATIKA · UNIVERSITAS GUNADARMA '26</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <div>
                <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#111318] tracking-tight leading-[1.05]">
                  {profileData.name}
                </h1>
                <p className="font-mono-tech text-xs sm:text-sm text-[#2563EB] font-medium mt-2.5 tracking-wide">
                  {profileData.positioning}
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={180}>
              <p className="font-sans-body text-base sm:text-lg text-[#575B66] leading-relaxed max-w-2xl">
                {profileData.bioSummary}
              </p>
            </RevealOnScroll>

            {/* Action Buttons */}
            <RevealOnScroll delay={260}>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#research"
                  className="group inline-flex items-center gap-2 px-4 py-2.5 bg-[#111318] hover:bg-[#2563EB] text-white font-mono-tech text-xs font-medium rounded transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#2563EB]"
                >
                  <span>Explore Thesis Research</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-150" aria-hidden="true" />
                </a>

                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2.5 border border-[#E4E4E1] hover:border-[#111318] bg-white text-[#111318] font-mono-tech text-xs font-medium rounded transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#2563EB]"
                >
                  <span>GitHub @Vannnd1</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#858A96] group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-3 py-2.5 border border-[#E4E4E1] hover:bg-[#F4F4F2] text-[#575B66] hover:text-[#111318] font-mono-tech text-xs rounded transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#2563EB] cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#059669]" aria-hidden="true" />
                      <span className="text-[#059669] font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Verified Technical Profile Card (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <RevealOnScroll delay={160}>
              <div className="bg-white border border-[#E4E4E1] hover:border-[#CBD5E1] rounded-lg p-5 sm:p-6 shadow-xs space-y-4 transition-colors">
                <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F2]">
                  <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold text-[#111318] uppercase tracking-wider">
                    <Terminal className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                    <span>Verified Baseline</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse-slow" aria-hidden="true" />
                    <span>Active Codebases</span>
                  </span>
                </div>

                <div className="space-y-3 font-mono-tech text-xs">
                  <div className="p-2.5 rounded bg-[#FAFAF9] border border-[#E4E4E1]/70 hover:border-[#2563EB]/40 transition-colors">
                    <div className="flex items-center gap-1.5 text-[#575B66] text-[11px]">
                      <Award className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                      <span>Academic Standing</span>
                    </div>
                    <div className="font-semibold text-[#111318] mt-0.5">
                      IPK {profileData.verifiedMetrics.gpa}
                    </div>
                    <div className="text-[11px] text-[#858A96] mt-0.5">Universitas Gunadarma · S1 Informatika</div>
                  </div>

                  <div className="p-2.5 rounded bg-[#FAFAF9] border border-[#E4E4E1]/70 hover:border-[#2563EB]/40 transition-colors">
                    <div className="flex items-center gap-1.5 text-[#575B66] text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" aria-hidden="true" />
                      <span>Undergraduate Thesis Focus</span>
                    </div>
                    <div className="font-semibold text-[#111318] mt-0.5 text-xs leading-snug">
                      Medical Image Encryption (Gauss-MS Map)
                    </div>
                    <div className="text-[11px] text-[#059669] mt-0.5 font-medium">NIST SP 800-22 Validated · Python/JIT</div>
                  </div>

                  <div className="p-2.5 rounded bg-[#FAFAF9] border border-[#E4E4E1]/70 hover:border-[#2563EB]/40 transition-colors">
                    <div className="flex items-center gap-1.5 text-[#575B66] text-[11px]">
                      <Database className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                      <span>Full-Stack Verification</span>
                    </div>
                    <div className="font-semibold text-[#111318] mt-0.5">
                      252 Automated Tests (89.9% Coverage)
                    </div>
                    <div className="text-[11px] text-[#858A96] mt-0.5">Discrete MOM / MES Platform · React 19/Express</div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono-tech text-[#858A96] border-t border-[#F4F4F2] flex items-center justify-between">
                  <span>Location: Cibinong, Bogor</span>
                  <a href="#contact" className="text-[#2563EB] hover:underline transition-colors">
                    Contact Details →
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
};
