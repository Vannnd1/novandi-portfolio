import React, { useEffect } from 'react';
import { X, ArrowLeft, GitBranch, ArrowUpRight, CheckCircle2, BookOpen } from 'lucide-react';
import type { ProjectItem } from '../data/projects';
import { RevealOnScroll } from './RevealOnScroll';

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
      className="fixed inset-0 z-50 bg-[#111318]/65 backdrop-blur-sm overflow-y-auto flex justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200 cursor-pointer"
    >
      <div className="bg-[#FAFAF9] text-[#111318] w-full max-w-4xl min-h-screen sm:min-h-fit sm:rounded-xl border border-[#E4E4E1] shadow-2xl overflow-hidden flex flex-col my-auto cursor-default animate-in zoom-in-98 duration-200">
        
        {/* Sticky Top Action Bar */}
        <div className="sticky top-0 z-20 bg-[#FAFAF9]/95 backdrop-blur-md px-6 py-4 border-b border-[#E4E4E1] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-mono-tech text-xs text-[#575B66] hover:text-[#111318] px-3 py-1.5 rounded hover:bg-[#F4F4F2] active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#2563EB] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects Overview</span>
          </button>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group hidden sm:inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#2563EB] hover:underline active:scale-95 transition-transform"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Source Code</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded text-[#575B66] hover:text-[#111318] hover:bg-[#F4F4F2] active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#2563EB] cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Case Study Content Body */}
        <div className="p-6 sm:p-8 md:p-12 space-y-12 max-w-3xl mx-auto w-full">
          
          {/* Header Banner */}
          <RevealOnScroll delay={0}>
            <div className="space-y-4 border-b border-[#E4E4E1] pb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-tech text-xs font-semibold px-2.5 py-0.5 rounded bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/25">
                  {project.categoryLabel}
                </span>
                <span className="font-mono-tech text-xs text-[#858A96]">Year: {project.year}</span>
              </div>

              <h1 id="case-study-title" className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#111318] tracking-tight leading-[1.1]">
                {project.title}
              </h1>

              <p className="font-mono-tech text-sm sm:text-base text-[#575B66] font-medium leading-relaxed">
                {project.subtitle}
              </p>

              {project.academicContext && (
                <div className="text-xs font-mono-tech text-[#575B66] bg-[#F4F4F2] p-3 rounded border border-[#E4E4E1] flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>{project.academicContext}</span>
                </div>
              )}

              {/* Quick Repository Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#111318] hover:bg-[#2563EB] text-white font-mono-tech text-xs font-medium rounded transition-colors"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>Inspect GitHub Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="font-mono-tech text-xs text-[#858A96] bg-[#F4F4F2] px-3 py-1.5 rounded">
                    Source: Academic / Internal Project
                  </span>
                )}
              </div>
            </div>
          </RevealOnScroll>

          {/* 1. Problem Statement & Motivation */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase text-[#2563EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>01. Problem Statement & Motivation</span>
              </div>
              <div className="bg-white border border-[#E4E4E1] rounded-lg p-5 sm:p-6 space-y-2">
                <h3 className="font-sans-body font-semibold text-base text-[#111318]">
                  Why this problem matters
                </h3>
                <p className="font-sans-body text-sm sm:text-base text-[#575B66] leading-relaxed">
                  {caseStudy.problemStatement}
                </p>
              </div>
            </section>
          </RevealOnScroll>

          {/* 2. Objectives & Scope */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase text-[#2563EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>02. Objectives & Engineering Scope</span>
              </div>
              <div className="bg-white border border-[#E4E4E1] rounded-lg p-5 sm:p-6 space-y-3">
                <ul className="space-y-2 text-sm text-[#575B66]">
                  {caseStudy.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </RevealOnScroll>

          {/* 3. My Role and Contributions */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase text-[#2563EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>03. Verified Role & Contribution</span>
              </div>
              <div className="bg-white border border-[#E4E4E1] rounded-lg p-5 sm:p-6 space-y-2">
                <p className="font-sans-body text-sm text-[#575B66] leading-relaxed">
                  {caseStudy.roleAndContributions}
                </p>
              </div>
            </section>
          </RevealOnScroll>

          {/* 4. Technical Stack Breakdown */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase text-[#2563EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>04. Verified Technical Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono-tech text-xs px-3 py-1.5 rounded bg-white border border-[#E4E4E1] text-[#111318]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </RevealOnScroll>

          {/* 5. System Architecture & Processing Pipeline */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase text-[#2563EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>05. System Architecture & Processing Workflow</span>
              </div>
              <div className="bg-white border border-[#E4E4E1] rounded-lg p-5 sm:p-6 space-y-4">
                <p className="text-sm text-[#575B66] leading-relaxed">
                  {caseStudy.systemArchitecture.overview}
                </p>
                <div className="space-y-3 pt-2">
                  {caseStudy.systemArchitecture.steps.map((st, i) => (
                    <div key={i} className="p-3.5 rounded bg-[#FAFAF9] border border-[#E4E4E1] space-y-1">
                      <div className="font-mono-tech text-xs font-bold text-[#111318]">
                        {st.step}
                      </div>
                      <div className="text-xs text-[#575B66] leading-relaxed">
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
            <section className="space-y-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase text-[#2563EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>06. Key Implementation Decisions</span>
              </div>
              <div className="space-y-4">
                {caseStudy.implementationDecisions.map((dec, i) => (
                  <div key={i} className="bg-white border border-[#E4E4E1] rounded-lg p-5 sm:p-6 space-y-3">
                    <h4 className="font-sans-body font-semibold text-base text-[#111318]">
                      {dec.title}
                    </h4>
                    <p className="text-sm text-[#575B66] leading-relaxed">
                      {dec.rationale}
                    </p>
                    {dec.technicalCode && (
                      <pre className="bg-[#111318] text-[#FAFAF9] p-4 rounded font-mono-tech text-xs overflow-x-auto leading-relaxed">
                        <code>{dec.technicalCode}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </RevealOnScroll>

          {/* 7. Empirical Results & Validation */}
          <RevealOnScroll delay={0}>
            <section className="space-y-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase text-[#2563EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>07. Verified Results & Empirical Validation</span>
              </div>
              <div className="bg-white border border-[#E4E4E1] rounded-lg p-5 sm:p-6 space-y-4">
                <p className="text-sm text-[#575B66] leading-relaxed">
                  {caseStudy.empiricalResults.summary}
                </p>
                
                <div className="border border-[#E4E4E1] rounded overflow-hidden">
                  <table className="w-full text-left font-mono-tech text-xs">
                    <thead className="bg-[#F4F4F2] border-b border-[#E4E4E1]">
                      <tr>
                        <th className="p-3 text-[#111318] font-semibold">Evaluation Metric</th>
                        <th className="p-3 text-[#111318] font-semibold">Verified Output</th>
                        <th className="p-3 text-[#575B66] font-medium hidden sm:table-cell">Theoretical / Benchmark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E4E1] bg-white">
                      {caseStudy.empiricalResults.metrics.map((m, i) => (
                        <tr key={i} className="hover:bg-[#FAFAF9]">
                          <td className="p-3 font-medium text-[#111318]">{m.label}</td>
                          <td className="p-3 text-[#059669] font-bold">{m.value}</td>
                          <td className="p-3 text-[#858A96] hidden sm:table-cell">{m.benchmark || '—'}</td>
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
            <section className="space-y-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase text-[#2563EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>08. Transparent Limitations & Future Work</span>
              </div>
              <div className="bg-white border border-[#E4E4E1] rounded-lg p-5 sm:p-6 space-y-2">
                <ul className="space-y-2 text-sm text-[#575B66]">
                  {caseStudy.limitationsAndFutureWork.map((lim, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#858A96] font-bold font-mono-tech">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </RevealOnScroll>

          {/* 9. Technical References */}
          {caseStudy.references && caseStudy.references.length > 0 && (
            <RevealOnScroll delay={0}>
              <section className="space-y-3">
                <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase text-[#858A96]">
                  <span>Technical Standards & References</span>
                </div>
                <ul className="space-y-1.5 text-xs font-mono-tech text-[#858A96] pl-2 border-l-2 border-[#E4E4E1]">
                  {caseStudy.references.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ul>
              </section>
            </RevealOnScroll>
          )}

          {/* Bottom Action Footer */}
          <RevealOnScroll delay={0}>
            <div className="pt-8 border-t border-[#E4E4E1] flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#111318] hover:bg-[#2563EB] text-white font-mono-tech text-xs font-medium rounded transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Projects Overview</span>
              </button>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#E4E4E1] hover:border-[#111318] text-[#111318] font-mono-tech text-xs font-medium rounded transition-colors"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>Visit GitHub Repository</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </div>
  );
};
