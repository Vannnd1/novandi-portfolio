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

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
              {/* Left Column (Metadata, Title, Description, Metrics, Actions) */}
              <div className="w-full lg:col-span-7 xl:col-span-6 space-y-4 text-left flex flex-col justify-between">
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

                  {project.subtitle && (
                    <p className="font-geist text-xs sm:text-sm font-semibold text-[#666] leading-snug m-0">
                      {project.subtitle}
                    </p>
                  )}

                  {/* 3-Part Deliverables: Scope, Output, Impact */}
                  {project.deliverables ? (
                    <div className="space-y-2 pt-1 pb-1 select-none">
                      {/* Scope */}
                      <div className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed">
                        <span className="shrink-0 px-2 py-0.5 rounded font-space font-bold text-[10px] bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wide">
                          {t.works.scopeLabel}
                        </span>
                        <span className="text-[#334155] font-space font-medium">
                          {project.deliverables.scope}
                        </span>
                      </div>

                      {/* Output */}
                      <div className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed">
                        <span className="shrink-0 px-2 py-0.5 rounded font-space font-bold text-[10px] bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
                          {t.works.outputLabel}
                        </span>
                        <span className="text-[#334155] font-space font-medium">
                          {project.deliverables.output}
                        </span>
                      </div>

                      {/* Impact */}
                      <div className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed">
                        <span className="shrink-0 px-2 py-0.5 rounded font-space font-bold text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wide">
                          {t.works.impactLabel}
                        </span>
                        <span className="text-[#0f172a] font-space font-semibold">
                          {project.deliverables.impact}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="font-space font-medium text-sm sm:text-base text-[#555] leading-relaxed max-w-[640px] m-0">
                      {project.summary}
                    </p>
                  )}

                  {/* Verified Metrics Chips (if any) */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
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

              {/* Right Column: Visual Mockup Viewport with Architectural Bay & App Chrome */}
              <div className="w-full lg:col-span-5 xl:col-span-6 flex flex-col justify-center">
                <TiltCard maxTilt={5} scale={1.01} className="w-full">
                  <div className="relative rounded-2xl border border-slate-200/90 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e8edf4] p-3 sm:p-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden group-hover:border-slate-300 transition-colors">
                    {/* Subtle technical grid background */}
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />

                    {/* Top Canvas Bar (Hardware / Viewport Header) */}
                    <div className="relative z-10 flex items-center justify-between pb-2.5 px-1 border-b border-slate-200/60 mb-2.5 text-[10px] font-mono text-slate-500 select-none">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-semibold text-slate-700 tracking-wider uppercase text-[9px]">
                          {t.works.previewBadge}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                        <span>{project.categoryLabel.split('·')[0].trim()}</span>
                        <span>//</span>
                        <span>{project.year}</span>
                      </div>
                    </div>

                    {/* Main Browser / App Chrome Frame */}
                    <button
                      type="button"
                      onClick={() => onSelectProject(project.id)}
                      aria-label={`${t.works.viewCaseStudy}: ${project.title}`}
                      className="relative z-10 w-full block text-left cursor-pointer rounded-xl bg-white border border-slate-300/80 shadow-[0_12px_28px_rgba(0,0,0,0.09)] overflow-hidden transition-all duration-300 hover:shadow-[0_18px_38px_rgba(0,0,0,0.14)] hover:border-slate-400 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#fd4aa6]"
                    >
                      {/* Browser Chrome Titlebar */}
                      <div className="flex items-center justify-between px-3 py-2 bg-slate-100/90 border-b border-slate-200 select-none">
                        {/* Traffic Lights */}
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                        </div>

                        {/* URL Pill */}
                        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-slate-200 text-[9px] font-mono text-slate-600 max-w-[200px] sm:max-w-[260px] truncate shadow-2xs">
                          <span className="text-slate-400">🔒</span>
                          <span className="truncate">
                            {project.demoUrl
                              ? project.demoUrl.replace(/^https?:\/\//, '')
                              : `${project.id}.internal`}
                          </span>
                        </div>

                        {/* Right Action Hint */}
                        <div className="flex items-center gap-1 text-[9px] font-space font-semibold text-slate-500 hover:text-black">
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3 h-3 text-[#fd4aa6]" />
                        </div>
                      </div>

                      {/* Viewport Content */}
                      <div className="p-1 sm:p-2 bg-slate-50/50">
                        <ProjectMockup projectId={project.id} />
                      </div>
                    </button>

                    {/* Bottom Architectural HUD Strip */}
                    <div className="relative z-10 pt-2.5 px-1 flex items-center justify-between text-[10px] font-space text-slate-500 select-none">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
                        <span className="text-[#fd4aa6]">↗</span>
                        <span>{t.works.clickToInspect}</span>
                      </span>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/80 border border-slate-200 text-slate-600">
                        {project.techStack.slice(0, 2).join(' + ')}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </article>
        </RevealOnScroll>
      ))}
    </motion.div>
  );
};
