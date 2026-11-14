import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import type { ProjectItem } from '../../data/projects';
import { useLanguage } from '../../context/useLanguage';
import { RevealOnScroll } from '../RevealOnScroll';
import { TiltCard } from '../TiltCard';
import { Magnetic } from '../MagneticButton';
import { TechPill } from '../TechPill';
import { ProjectMockup } from '../ProjectMockup';

interface ProjectShowcaseProps {
  projects: ProjectItem[];
  onSelectProject: (id: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  onSelectProject,
}) => {
  const { t } = useLanguage();

  return (
    <motion.div
      key="works"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] as const }}
      className="space-y-8 sm:space-y-10"
    >
      {projects.map((project, idx) => (
        <RevealOnScroll key={project.id} delay={idx * 50} distance={24}>
          <article className="group relative rounded-3xl border border-[#e8e8e8] bg-[#fbfbfb] hover:bg-white p-6 sm:p-8 md:p-10 lg:p-11 xl:p-12 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Subtle top corner gradient accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#fd4aa6]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
              {/* Left Column (Metadata, Title, Description, Metrics, Actions) */}
              <div className="w-full lg:col-span-7 xl:col-span-6 space-y-4 text-left">
                {/* Header tags: Category & Year */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eaeaea] pb-3">
                  <span className="font-space text-xs font-bold px-3 py-1 rounded-full bg-white text-[#fd4aa6] border border-[#fd4aa6]/30 uppercase tracking-wider shadow-2xs">
                    {project.categoryLabel}
                  </span>
                  <span className="font-dm-sans italic font-bold text-base text-[#3d3d3d]">
                    {project.year}
                  </span>
                </div>

                {/* Project Title */}
                <button
                  type="button"
                  onClick={() => onSelectProject(project.id)}
                  className="text-left group/title cursor-pointer block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#fd4aa6] rounded-md"
                >
                  <h3 className="font-hegarty text-2xl sm:text-3xl lg:text-[2.15rem] text-[#101010] leading-[1.08] m-0 group-hover/title:text-[#fd4aa6] transition-colors">
                    {project.title}
                  </h3>
                </button>

                {project.subtitle && (
                  <p className="font-geist text-sm sm:text-base font-semibold text-[#666] leading-snug m-0">
                    {project.subtitle}
                  </p>
                )}

                {/* Summary */}
                <p className="font-space font-medium text-sm sm:text-base text-[#555] leading-relaxed max-w-[640px] m-0">
                  {project.summary}
                </p>

                {/* Verified Metrics Chips (if any) */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.metrics.slice(0, 3).map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#e2e8f0] font-space text-[11px] font-semibold text-[#1e293b] shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[#64748b]">{m.label}:</span>
                        <span className="font-bold text-[#0f172a]">{m.value}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1" role="group" aria-label={t.works.techStackAria}>
                  {project.techStack.map((tech) => (
                    <TechPill key={tech} name={tech} size="sm" />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Magnetic strength={0.2}>
                    <button
                      type="button"
                      onClick={() => onSelectProject(project.id)}
                      className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-[#101010] hover:bg-[#fd4aa6] text-white px-4 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-sm hover:shadow-md hover:shadow-[#fd4aa6]/25 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
                    >
                      <span>{t.works.viewCaseStudy}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </Magnetic>

                  {project.demoUrl && (
                    <Magnetic strength={0.2}>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-300/80 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600"
                        title={t.works.liveDemo}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{t.works.liveDemo}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </Magnetic>
                  )}

                  {project.githubUrl && (
                    <Magnetic strength={0.2}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-white hover:bg-black hover:text-white border border-[#d4d4d8] text-[#27272a] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
                        title="GitHub Repository"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>github</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </Magnetic>
                  )}
                </div>
              </div>

              {/* Right Column: Visual Mockup Viewport with 3D Tilt & Accessible Button */}
              <div className="w-full lg:col-span-5 xl:col-span-6 flex justify-center">
                <TiltCard maxTilt={6} scale={1.02} className="w-full max-w-[500px]">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project.id)}
                    aria-label={`${t.works.viewCaseStudy}: ${project.title}`}
                    className="w-full block text-left cursor-pointer rounded-2xl border-[3px] border-white shadow-[0_16px_36px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#fd4aa6]"
                  >
                    <ProjectMockup projectId={project.id} />
                  </button>
                </TiltCard>
              </div>
            </div>
          </article>
        </RevealOnScroll>
      ))}
    </motion.div>
  );
};
