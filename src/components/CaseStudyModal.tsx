import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X, ArrowLeft, GitBranch, ArrowUpRight, CheckCircle2, BookOpen } from 'lucide-react';
import type { ProjectItem } from '../data/projects';
import { useLanguage } from '../context/useLanguage';
import { RevealOnScroll } from './RevealOnScroll';
import { TechPill } from './TechPill';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll, avoid layout shift, and handle Escape / Tab focus trap
  useEffect(() => {
    if (!project) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const container = modalContainerRef.current;
        if (!container) return;

        const focusableElements = container.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !container.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement || !container.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on close button
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 40);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as const }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-[#090412]/75 backdrop-blur-md overflow-y-auto flex justify-center p-2 sm:p-5 md:p-8 cursor-pointer"
    >
      <motion.div
        ref={modalContainerRef}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
        className="bg-[#fff9f6] dark:bg-[#0e081a] text-[#1a1026] dark:text-[#fdf7ff] w-full max-w-5xl xl:max-w-6xl min-h-screen sm:min-h-fit sm:rounded-3xl border border-[#f0d8e6] dark:border-[#322152] shadow-2xl overflow-hidden flex flex-col my-auto cursor-default transition-colors"
      >
        {/* Sticky Top Action Bar */}
        <div className="sticky top-0 z-30 bg-[#fff9f6]/92 dark:bg-[#0e081a]/92 backdrop-blur-md px-5 sm:px-10 py-4 border-b border-[#f0d8e6] dark:border-[#2f1f4d] flex items-center justify-between transition-colors">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-hegarty text-sm sm:text-base text-[#7b648f] dark:text-[#b4a0ce] hover:text-[#1a1026] hover:dark:text-white px-3.5 py-1.5 rounded-full hover:bg-[#fff1f8] hover:dark:bg-[#1e1333] active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.modal.backToWorks}</span>
          </button>

          <div className="flex items-center gap-2.5">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-gradient-to-r from-[#ff3b9a] to-[#ff8a4c] hover:brightness-110 text-white px-3.5 py-1.5 rounded-full active:scale-95 transition-all shadow-xs"
              >
                <span>{t.modal.liveSite}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm text-[#ff3b9a] hover:text-[#1a1026] hover:dark:text-white px-3.5 py-1.5 rounded-full border border-[#ff3b9a]/35 hover:border-[#ff3b9a] hover:bg-[#fff0f7] hover:dark:bg-[#1e1333] active:scale-95 transition-all"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>github</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#fff1f8] dark:bg-[#1e1333] hover:bg-[#ffe3f1] hover:dark:bg-[#2a1b47] text-[#523e63] dark:text-[#cbb9e3] hover:text-[#1a1026] hover:dark:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
              aria-label={t.modal.closeAria}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Case Study Content Body */}
        <div className="p-6 sm:p-8 md:p-12 xl:p-14 space-y-12 max-w-4xl xl:max-w-5xl mx-auto w-full">
          
          {/* Header Banner */}
          <RevealOnScroll delay={0}>
            <div className="space-y-4 border-b border-[#f0d8e6] dark:border-[#2f1f4d] pb-8 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-space text-xs font-semibold px-3 py-1 rounded-full bg-[#ff3b9a]/12 text-[#ff3b9a] border border-[#ff3b9a]/30 tracking-wide uppercase">
                  {project.categoryLabel}
                </span>
                <span className="font-dm-sans italic font-bold text-base sm:text-lg text-[#7b648f] dark:text-[#ffb35c]">
                  {project.year}
                </span>
              </div>

              <h1 id="case-study-title" className="font-hegarty text-3xl sm:text-4xl md:text-5xl text-[#1a1026] dark:text-[#fdf7ff] leading-[1.05] tracking-tight transition-colors">
                {project.title}
              </h1>

              <p className="font-space font-medium text-base sm:text-lg text-[#523e63] dark:text-[#d6c7e8] leading-relaxed transition-colors">
                {project.subtitle}
              </p>

              {project.academicContext && (
                <div className="text-xs sm:text-sm font-space text-[#523e63] dark:text-[#d6c7e8] bg-white dark:bg-[#150e24] p-4 rounded-2xl border border-[#f0d8e6] dark:border-[#2f1f4d] flex items-start gap-3 transition-colors">
                  <BookOpen className="w-4 h-4 text-[#ff3b9a] shrink-0 mt-0.5" />
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#ff3b9a] to-[#ff8a4c] hover:brightness-110 text-white font-hegarty text-sm rounded-full transition-all active:scale-95 shadow-sm"
                  >
                    <span>{t.modal.visitLiveSite}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1026] dark:bg-[#1e1433] hover:bg-[#9333ea] hover:dark:bg-[#a855f7] text-white font-hegarty text-sm rounded-full transition-all active:scale-95 shadow-sm"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>{t.modal.inspectGithubRepo}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  !project.demoUrl && (
                    <span className="font-space text-xs text-[#7b648f] dark:text-[#b4a0ce] bg-[#fff1f8] dark:bg-[#1e1333] px-3.5 py-1.5 rounded-full border border-[#f0d8e6] dark:border-[#372459]">
                      {t.modal.sourceAcademic}
                    </span>
                  )
                )}
              </div>
            </div>
          </RevealOnScroll>

          {/* 1. Problem Statement & Motivation */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-[#1a1026] dark:text-[#fdf7ff]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b9a] shrink-0" />
                <span>{t.modal.sec01Title}</span>
              </div>
              <div className="bg-white dark:bg-[#150e24] hover:dark:bg-[#1a112d] transition-colors border border-[#f0d8e6] dark:border-[#2f1f4d] rounded-2xl p-6 sm:p-7 space-y-2.5 shadow-[0_2px_8px_rgba(168,85,247,0.03)]">
                <h3 className="font-geist font-semibold text-base sm:text-lg text-[#1a1026] dark:text-[#fdf7ff]">
                  {t.modal.sec01Sub}
                </h3>
                <p className="font-space font-medium text-sm sm:text-base text-[#523e63] dark:text-[#d6c7e8] leading-relaxed">
                  {caseStudy.problemStatement}
                </p>
              </div>
            </section>
          </RevealOnScroll>

          {/* 2. Objectives & Scope */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-[#1a1026] dark:text-[#fdf7ff]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b9a] shrink-0" />
                <span>{t.modal.sec02Title}</span>
              </div>
              <div className="bg-white dark:bg-[#150e24] hover:dark:bg-[#1a112d] transition-colors border border-[#f0d8e6] dark:border-[#2f1f4d] rounded-2xl p-6 sm:p-7 space-y-3 shadow-[0_2px_8px_rgba(168,85,247,0.03)]">
                <ul className="space-y-3 text-sm sm:text-base text-[#523e63] dark:text-[#d6c7e8]">
                  {caseStudy.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#ff3b9a] shrink-0 mt-0.5" />
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
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-[#1a1026] dark:text-[#fdf7ff]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b9a] shrink-0" />
                <span>{t.modal.sec03Title}</span>
              </div>
              <div className="bg-white dark:bg-[#150e24] hover:dark:bg-[#1a112d] transition-colors border border-[#f0d8e6] dark:border-[#2f1f4d] rounded-2xl p-6 sm:p-7 space-y-2.5 shadow-[0_2px_8px_rgba(168,85,247,0.03)]">
                <p className="font-space font-medium text-sm sm:text-base text-[#523e63] dark:text-[#d6c7e8] leading-relaxed">
                  {caseStudy.roleAndContributions}
                </p>
              </div>
            </section>
          </RevealOnScroll>

          {/* 4. Technical Stack Breakdown */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3.5">
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-[#1a1026] dark:text-[#fdf7ff]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b9a] shrink-0" />
                <span>{t.modal.sec04Title}</span>
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
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-[#1a1026] dark:text-[#fdf7ff]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b9a] shrink-0" />
                <span>{t.modal.sec05Title}</span>
              </div>
              <div className="bg-white dark:bg-[#150e24] hover:dark:bg-[#1a112d] transition-colors border border-[#f0d8e6] dark:border-[#2f1f4d] rounded-2xl p-6 sm:p-7 space-y-5 shadow-[0_2px_8px_rgba(168,85,247,0.03)]">
                <p className="font-space font-medium text-sm sm:text-base text-[#523e63] dark:text-[#d6c7e8] leading-relaxed">
                  {caseStudy.systemArchitecture.overview}
                </p>
                <div className="space-y-3 pt-1">
                  {caseStudy.systemArchitecture.steps.map((st, i) => (
                    <div key={i} className="p-4 sm:p-5 rounded-xl bg-[#fff9fc] dark:bg-[#1b122e] border border-[#f0d8e6] dark:border-[#342254] space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                      <div className="font-hegarty text-base sm:text-lg text-[#1a1026] dark:text-[#fdf7ff] flex items-center gap-2">
                        <span className="font-space font-bold text-xs px-2 py-0.5 rounded-full bg-[#fff1f8] dark:bg-[#2a1b47] text-[#ff3b9a] border border-[#ff3b9a]/25">
                          {i + 1}
                        </span>
                        <span>{st.step}</span>
                      </div>
                      <div className="font-space text-xs sm:text-sm text-[#7b648f] dark:text-[#b4a0ce] leading-relaxed pl-7">
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
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-[#1a1026] dark:text-[#fdf7ff]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b9a] shrink-0" />
                <span>{t.modal.sec06Title}</span>
              </div>
              <div className="space-y-4">
                {caseStudy.implementationDecisions.map((dec, i) => (
                  <div key={i} className="bg-white dark:bg-[#150e24] hover:dark:bg-[#1a112d] transition-colors border border-[#f0d8e6] dark:border-[#2f1f4d] rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-[0_2px_8px_rgba(168,85,247,0.03)]">
                    <h4 className="font-hegarty text-lg sm:text-xl text-[#1a1026] dark:text-[#fdf7ff]">
                      {dec.title}
                    </h4>
                    <p className="font-space font-medium text-sm sm:text-base text-[#523e63] dark:text-[#d6c7e8] leading-relaxed">
                      {dec.rationale}
                    </p>
                    {dec.technicalCode && (
                      <div className="rounded-xl overflow-hidden border border-[#38235c] bg-[#110920] shadow-inner mt-2">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#190f2e] border-b border-[#38235c]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f8f]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb35c]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00d9ff]" />
                          </div>
                          <span className="font-space text-xs text-[#b4a0ce] font-medium">{t.modal.codeSnippetLabel}</span>
                        </div>
                        <pre className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] text-[#fdf7ff] overflow-x-auto leading-relaxed">
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
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-[#1a1026] dark:text-[#fdf7ff]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b9a] shrink-0" />
                <span>{t.modal.sec07Title}</span>
              </div>
              <div className="bg-white dark:bg-[#150e24] hover:dark:bg-[#1a112d] transition-colors border border-[#f0d8e6] dark:border-[#2f1f4d] rounded-2xl p-6 sm:p-7 space-y-5 shadow-[0_2px_8px_rgba(168,85,247,0.03)]">
                <p className="font-space font-medium text-sm sm:text-base text-[#523e63] dark:text-[#d6c7e8] leading-relaxed">
                  {caseStudy.empiricalResults.summary}
                </p>
                
                <div className="rounded-2xl border border-[#f0d8e6] dark:border-[#322152] overflow-hidden bg-[#fff9fc] dark:bg-[#1b122e] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                  <table className="w-full text-left font-space text-xs sm:text-sm">
                    <thead className="bg-[#fff1f8] dark:bg-[#23163d] border-b border-[#f0d8e6] dark:border-[#372459]">
                      <tr>
                        <th className="p-3.5 sm:p-4 font-hegarty text-sm text-[#1a1026] dark:text-[#fdf7ff]">{t.modal.colMetric}</th>
                        <th className="p-3.5 sm:p-4 font-hegarty text-sm text-[#1a1026] dark:text-[#fdf7ff]">{t.modal.colOutput}</th>
                        <th className="p-3.5 sm:p-4 font-hegarty text-sm text-[#7b648f] dark:text-[#b4a0ce] hidden sm:table-cell">{t.modal.colBenchmark}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f5e3ee] dark:divide-[#2f1f4d]">
                      {caseStudy.empiricalResults.metrics.map((m, i) => (
                        <tr key={i} className="hover:bg-[#fff6fb] hover:dark:bg-[#24183d]/60 transition-colors">
                          <td className="p-3.5 sm:p-4 font-medium text-[#1a1026] dark:text-[#fdf7ff]">{m.label}</td>
                          <td className="p-3.5 sm:p-4">
                            <span className="font-bold text-[#ff3b9a] bg-[#ff3b9a]/12 px-2.5 py-1 rounded-full border border-[#ff3b9a]/30 inline-block">
                              {m.value}
                            </span>
                          </td>
                          <td className="p-3.5 sm:p-4 text-[#7b648f] dark:text-[#b4a0ce] hidden sm:table-cell">{m.benchmark || '—'}</td>
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
              <div className="flex items-center gap-2.5 font-hegarty text-xl sm:text-2xl text-[#1a1026] dark:text-[#fdf7ff]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b9a] shrink-0" />
                <span>{t.modal.sec08Title}</span>
              </div>
              <div className="bg-white dark:bg-[#150e24] hover:dark:bg-[#1a112d] transition-colors border border-[#f0d8e6] dark:border-[#2f1f4d] rounded-2xl p-6 sm:p-7 space-y-3 shadow-[0_2px_8px_rgba(168,85,247,0.03)]">
                <ul className="space-y-2.5 text-sm sm:text-base text-[#523e63] dark:text-[#d6c7e8]">
                  {caseStudy.limitationsAndFutureWork.map((lim, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#ff3b9a] shrink-0 mt-2" />
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
                <div className="flex items-center gap-2 font-hegarty text-base sm:text-lg text-[#7b648f] dark:text-[#b4a0ce]">
                  <span>{t.modal.secRefTitle}</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm font-space text-[#7b648f] dark:text-[#b4a0ce] pl-4 border-l-2 border-[#ff3b9a]/40">
                  {caseStudy.references.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ul>
              </section>
            </RevealOnScroll>
          )}

          {/* Bottom Action Footer */}
          <RevealOnScroll delay={0}>
            <div className="pt-8 border-t border-[#f0d8e6] dark:border-[#2f1f4d] flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1026] dark:bg-[#1e1433] hover:bg-[#ff3b9a] text-white font-hegarty text-base rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.modal.backToWorks}</span>
              </button>

              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff3b9a] to-[#ff8a4c] hover:brightness-110 text-white font-hegarty text-base rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    <span>{t.modal.visitLiveSite}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#e7cbe0] dark:border-[#372459] hover:border-[#ff3b9a] hover:bg-[#fff1f8] hover:dark:bg-[#1e1333] text-[#3c1e52] dark:text-[#e2d4f0] hover:dark:text-white font-hegarty text-base rounded-full transition-all active:scale-95 cursor-pointer"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>{t.modal.githubRepo}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </motion.div>
    </motion.div>
  );
};
