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
              {/* Left Column (Metadata, Title, Clean Summary, Tech Stack, Actions) */}
              <div className="w-full lg:col-span-6 space-y-4 text-left flex flex-col justify-between">
                <div className="space-y-3.5">
                  {/* Header tags: Category & Year */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eaeaea] pb-2.5">
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

                  {/* Summary: What was done, output, and impact (Simple, direct, uncluttered) */}
                  <p className="font-space font-normal text-sm sm:text-base text-[#4b5563] leading-[1.65] max-w-[640px] m-0">
                    {project.summary}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5" role="group" aria-label={t.works.techStackAria}>
                    {project.techStack.map((tech) => (
                      <TechPill key={tech} name={tech} size="sm" />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
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
                        className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-white hover:bg-black hover:text-white border border-[#d4d4d8] text-[#27272a] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
                        title={t.works.liveDemo}
                      >
                        <span>{t.works.liveDemo}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
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

              {/* Right Column: Visual Mockup Viewport */}
              <div className="w-full lg:col-span-6 flex items-center justify-center">
                <TiltCard maxTilt={3} scale={1.01} className="w-full">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project.id)}
                    aria-label={`${t.works.viewCaseStudy}: ${project.title}`}
                    className="group/window w-full block text-left cursor-pointer rounded-2xl bg-white border border-[#e5e7eb] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] hover:border-[#d4d4d8] overflow-hidden transition-all duration-300 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#fd4aa6]"
                  >
                    {/* Clean Minimalist Window Titlebar */}
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#fbfbfb] border-b border-[#f0f0f0] select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
                      </div>

                      {project.demoUrl ? (
                        <span className="text-[10px] font-mono text-[#9ca3af] truncate max-w-[200px] sm:max-w-[260px]">
                          {project.demoUrl.replace(/^https?:\/\//, '')}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#a1a1aa]">
                          {project.id}
                        </span>
                      )}

                      <div className="flex items-center gap-1 text-[10px] font-space text-[#9ca3af] group-hover/window:text-black transition-colors">
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Viewport Content */}
                    <div className="w-full">
                      <ProjectMockup projectId={project.id} />
                    </div>
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
