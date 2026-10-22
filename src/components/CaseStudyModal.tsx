import React, { useEffect } from 'react';
import { X, ArrowLeft, GitBranch, ArrowUpRight, CheckCircle2, BookOpen } from 'lucide-react';
import type { ProjectItem } from '../data/projects';
import { RevealOnScroll } from './RevealOnScroll';
import { TechPill } from './TechPill';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-[#101010]/70 backdrop-blur-md overflow-y-auto flex justify-center p-2 sm:p-5 md:p-8 animate-in fade-in duration-200 cursor-pointer"
    >
      <div className="bg-white text-[#101010] w-full max-w-5xl min-h-screen sm:min-h-fit sm:rounded-3xl border border-[#e8e8e8] shadow-2xl overflow-hidden flex flex-col my-auto cursor-default animate-in zoom-in-95 duration-200">
        
        {/* Sticky Top Action Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-5 sm:px-10 py-4 border-b border-[#e8e8e8] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-hegarty text-sm sm:text-base text-[#767676] hover:text-black px-3.5 py-1.5 rounded-full hover:bg-[#f5f5f5] active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>back to works</span>
          </button>

          <div className="flex items-center gap-2.5">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full active:scale-95 transition-all shadow-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>live site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm text-[#fd4aa6] hover:text-black px-3.5 py-1.5 rounded-full border border-[#fd4aa6]/30 hover:border-black hover:bg-[#fff0f6] active:scale-95 transition-all"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>github</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f5f5f5] hover:bg-[#eaeaea] text-[#555] hover:text-black flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Case Study Content Body */}
        <div className="p-6 sm:p-8 md:p-12 space-y-12 max-w-4xl mx-auto w-full">
          
          {/* Header Banner */}
          <RevealOnScroll delay={0}>
            <div className="space-y-4 border-b border-[#e8e8e8] pb-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-space text-xs font-semibold px-3 py-1 rounded-full bg-[#fd4aa6]/10 text-[#fd4aa6] border border-[#fd4aa6]/25 tracking-wide uppercase">
                  {project.categoryLabel}
                </span>
                <span className="font-dm-sans italic font-bold text-base sm:text-lg text-[#3d3d3d]">
                  {project.year}
                </span>
              </div>

              <h1 id="case-study-title" className="font-hegarty text-3xl sm:text-4xl md:text-5xl text-black leading-[1.05] tracking-tight">
                {project.title}
              </h1>

              <p className="font-space font-medium text-base sm:text-lg text-[#555] leading-relaxed">
                {project.subtitle}
              </p>

              {project.academicContext && (
                <div className="text-xs sm:text-sm font-space text-[#555] bg-[#fbfbfb] p-4 rounded-2xl border border-[#e8e8e8] flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-[#fd4aa6] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{project.academicContext}</span>
                </div>
              )}

              {/* Quick Repository & Live Site Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-hegarty text-sm rounded-full transition-all active:scale-95 shadow-md shadow-emerald-600/20"
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>buka website live</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#202020] hover:bg-[#fd4aa6] text-white font-hegarty text-sm rounded-full transition-all active:scale-95 shadow-sm"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>inspect github repository</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  !project.demoUrl && (
                    <span className="font-space text-xs text-[#767676] bg-[#f5f5f5] px-3.5 py-1.5 rounded-full border border-[#e8e8e8]">
                      source: academic & internal engineering
                    </span>
                  )
                )}
              </div>
            </div>
          </RevealOnScroll>

          {/* 1. Problem Statement & Motivation */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fd4aa6] shrink-0" />
                <span>01. problem statement & motivation</span>
              </div>
              <div className="bg-[#fbfbfb] hover:bg-white transition-colors border border-[#e8e8e8] rounded-2xl p-6 sm:p-7 space-y-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <h3 className="font-geist font-semibold text-base sm:text-lg text-black">
                  Why this problem matters
                </h3>
                <p className="font-space font-medium text-sm sm:text-base text-[#555] leading-relaxed">
                  {caseStudy.problemStatement}
                </p>
              </div>
            </section>
          </RevealOnScroll>

          {/* 2. Objectives & Scope */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fd4aa6] shrink-0" />
                <span>02. objectives & engineering scope</span>
              </div>
              <div className="bg-[#fbfbfb] hover:bg-white transition-colors border border-[#e8e8e8] rounded-2xl p-6 sm:p-7 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <ul className="space-y-3 text-sm sm:text-base text-[#555]">
                  {caseStudy.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#fd4aa6] shrink-0 mt-0.5" />
                      <span className="font-space font-medium leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </RevealOnScroll>

          {/* 3. My Role and Contributions */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fd4aa6] shrink-0" />
                <span>03. verified role & contribution</span>
              </div>
              <div className="bg-[#fbfbfb] hover:bg-white transition-colors border border-[#e8e8e8] rounded-2xl p-6 sm:p-7 space-y-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <p className="font-space font-medium text-sm sm:text-base text-[#555] leading-relaxed">
                  {caseStudy.roleAndContributions}
                </p>
              </div>
            </section>
          </RevealOnScroll>

          {/* 4. Technical Stack Breakdown */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fd4aa6] shrink-0" />
                <span>04. verified technical stack</span>
              </div>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {project.techStack.map((tech) => (
                  <TechPill key={tech} name={tech} size="base" />
                ))}
              </div>
            </section>
          </RevealOnScroll>

          {/* 5. System Architecture & Processing Pipeline */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fd4aa6] shrink-0" />
                <span>05. system architecture & processing workflow</span>
              </div>
              <div className="bg-[#fbfbfb] hover:bg-white transition-colors border border-[#e8e8e8] rounded-2xl p-6 sm:p-7 space-y-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <p className="font-space font-medium text-sm sm:text-base text-[#555] leading-relaxed">
                  {caseStudy.systemArchitecture.overview}
                </p>
                <div className="space-y-3 pt-1">
                  {caseStudy.systemArchitecture.steps.map((st, i) => (
                    <div key={i} className="p-4 sm:p-5 rounded-xl bg-white border border-[#eaeaea] space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                      <div className="font-hegarty text-base sm:text-lg text-black flex items-center gap-2">
                        <span className="font-space font-bold text-xs px-2 py-0.5 rounded-full bg-[#f5f5f5] text-black border border-[#d8d8d8]">
                          {i + 1}
                        </span>
                        <span>{st.step}</span>
                      </div>
                      <div className="font-space text-xs sm:text-sm text-[#666] leading-relaxed pl-7">
                        {st.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </RevealOnScroll>

          {/* 6. Implementation Decisions & Code Highlights */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fd4aa6] shrink-0" />
                <span>06. key implementation decisions</span>
              </div>
              <div className="space-y-4">
                {caseStudy.implementationDecisions.map((dec, i) => (
                  <div key={i} className="bg-[#fbfbfb] hover:bg-white transition-colors border border-[#e8e8e8] rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <h4 className="font-hegarty text-lg sm:text-xl text-black">
                      {dec.title}
                    </h4>
                    <p className="font-space font-medium text-sm sm:text-base text-[#555] leading-relaxed">
                      {dec.rationale}
                    </p>
                    {dec.technicalCode && (
                      <div className="rounded-xl overflow-hidden border border-[#27272a] bg-[#121214] shadow-inner mt-2">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181b] border-b border-[#27272a]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          </div>
                          <span className="font-space text-xs text-[#a1a1aa] font-medium">implementation snippet</span>
                        </div>
                        <pre className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] text-[#f4f4f5] overflow-x-auto leading-relaxed">
                          <code>{dec.technicalCode}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </RevealOnScroll>

          {/* 7. Empirical Results & Validation */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fd4aa6] shrink-0" />
                <span>07. verified results & empirical validation</span>
              </div>
              <div className="bg-[#fbfbfb] hover:bg-white transition-colors border border-[#e8e8e8] rounded-2xl p-6 sm:p-7 space-y-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <p className="font-space font-medium text-sm sm:text-base text-[#555] leading-relaxed">
                  {caseStudy.empiricalResults.summary}
                </p>
                
                <div className="rounded-2xl border border-[#e8e8e8] overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                  <table className="w-full text-left font-space text-xs sm:text-sm">
                    <thead className="bg-[#f7f7f7] border-b border-[#e8e8e8]">
                      <tr>
                        <th className="p-3.5 sm:p-4 font-hegarty text-sm text-black">evaluation metric</th>
                        <th className="p-3.5 sm:p-4 font-hegarty text-sm text-black">verified output</th>
                        <th className="p-3.5 sm:p-4 font-hegarty text-sm text-[#767676] hidden sm:table-cell">theoretical / benchmark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f0]">
                      {caseStudy.empiricalResults.metrics.map((m, i) => (
                        <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                          <td className="p-3.5 sm:p-4 font-medium text-black">{m.label}</td>
                          <td className="p-3.5 sm:p-4">
                            <span className="font-bold text-[#fd4aa6] bg-[#fd4aa6]/10 px-2.5 py-1 rounded-full border border-[#fd4aa6]/25 inline-block">
                              {m.value}
                            </span>
                          </td>
                          <td className="p-3.5 sm:p-4 text-[#767676] hidden sm:table-cell">{m.benchmark || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </RevealOnScroll>

          {/* 8. Limitations and Future Improvements */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fd4aa6] shrink-0" />
                <span>08. transparent limitations & future work</span>
              </div>
              <div className="bg-[#fbfbfb] hover:bg-white transition-colors border border-[#e8e8e8] rounded-2xl p-6 sm:p-7 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <ul className="space-y-2.5 text-sm sm:text-base text-[#555]">
                  {caseStudy.limitationsAndFutureWork.map((lim, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#fd4aa6] shrink-0 mt-2" />
                      <span className="font-space font-medium leading-relaxed">{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </RevealOnScroll>

          {/* 9. Technical References */}
          {caseStudy.references && caseStudy.references.length > 0 && (
            <RevealOnScroll delay={0}>
              <section className="space-y-3 pt-2">
                <div className="flex items-center gap-2 font-hegarty text-base sm:text-lg text-[#767676]">
                  <span>technical standards & references</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm font-space text-[#767676] pl-4 border-l-2 border-[#fd4aa6]/40">
                  {caseStudy.references.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ul>
              </section>
            </RevealOnScroll>
          )}

          {/* Bottom Action Footer */}
          <RevealOnScroll delay={0}>
            <div className="pt-8 border-t border-[#e8e8e8] flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#202020] hover:bg-[#fd4aa6] text-white font-hegarty text-base rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>back to works</span>
              </button>

              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-hegarty text-base rounded-full transition-all active:scale-95 shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>kunjungi website live</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#d8d8d8] hover:border-black hover:bg-[#f7f7f7] text-[#202020] font-hegarty text-base rounded-full transition-all active:scale-95 cursor-pointer"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>visit github repository</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </div>
  );
};
