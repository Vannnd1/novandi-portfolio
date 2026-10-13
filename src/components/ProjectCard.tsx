import React from 'react';
import { ArrowUpRight, GitBranch, Shield, Cpu, Sparkles, BookOpen } from 'lucide-react';
import type { ProjectItem } from '../data/projects';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenCaseStudy: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy }) => {
  const getCategoryIcon = () => {
    switch (project.category) {
      case 'flagship-systems':
        return <Cpu className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />;
      case 'data-ai':
        return <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />;
      case 'academic-coursework':
        return <BookOpen className="w-3.5 h-3.5 text-[#575B66]" aria-hidden="true" />;
      default:
        return <Shield className="w-3.5 h-3.5 text-[#575B66]" aria-hidden="true" />;
    }
  };

  return (
    <article className="group bg-white border border-[#E4E4E1] hover:border-[#2563EB] rounded-lg p-6 sm:p-7 transition-all duration-200 hover:shadow-sm space-y-4">
      {/* Header Eyebrow & Category */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F4F4F2]">
        <div className="flex items-center gap-1.5 font-mono-tech text-xs text-[#575B66]">
          {getCategoryIcon()}
          <span className="font-semibold text-[#111318]">{project.categoryLabel}</span>
        </div>
        <span className="font-mono-tech text-xs text-[#858A96]">{project.year}</span>
      </div>

      {/* Title & Subtitle */}
      <div>
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project.id)}
          className="text-left group-hover:text-[#2563EB] transition-colors cursor-pointer"
        >
          <h3 className="font-serif-display text-2xl sm:text-3xl text-[#111318] group-hover:text-[#2563EB] transition-colors inline-flex items-center gap-2">
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#2563EB]" aria-hidden="true" />
          </h3>
        </button>
        <p className="font-mono-tech text-xs text-[#575B66] mt-1">
          {project.subtitle}
        </p>
      </div>

      {/* Summary Narrative */}
      <p className="font-sans-body text-sm text-[#575B66] leading-relaxed">
        {project.summary}
      </p>

      {/* Academic Context (if present) */}
      {project.academicContext && (
        <div className="text-xs font-mono-tech text-[#858A96] bg-[#FAFAF9] px-3 py-1.5 rounded border border-[#E4E4E1]/60">
          Context: {project.academicContext}
        </div>
      )}

      {/* Verified Metrics Grid */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {project.metrics.map((m) => (
            <div key={m.label} className="p-2.5 rounded bg-[#FAFAF9] border border-[#E4E4E1]">
              <div className="font-mono-tech text-[10px] text-[#858A96] uppercase">{m.label}</div>
              <div className="font-mono-tech text-xs font-bold text-[#111318] mt-0.5 truncate">{m.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Architecture Highlights */}
      {project.caseStudy?.systemArchitecture?.steps?.length > 0 && (
        <div className="space-y-1.5 pt-2 text-xs text-[#575B66]">
          <div className="font-mono-tech text-[11px] font-semibold text-[#111318] uppercase">
            Key Architecture & Pipeline:
          </div>
          <ul className="space-y-1">
            {project.caseStudy.systemArchitecture.steps.slice(0, 3).map((s, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#2563EB] font-bold font-mono-tech">•</span>
                <span>
                  <strong className="text-[#111318] font-medium">{s.step}:</strong> {s.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer: Tech Stack & Actions */}
      <div className="pt-4 border-t border-[#F4F4F2] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono-tech text-[11px] px-2 py-0.5 rounded bg-[#F4F4F2] text-[#575B66]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project.id)}
            className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors focus-visible:outline-2 focus-visible:outline-[#2563EB] cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-medium text-[#111318] hover:text-[#2563EB] transition-colors focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            >
              <GitBranch className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          ) : (
            <span className="font-mono-tech text-[11px] text-[#858A96] italic">
              Academic Work
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
