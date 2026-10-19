import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { GithubHeatmap } from './GithubHeatmap';
import { SocialPill } from './SocialPill';
import { TechPill } from './TechPill';
import { ProjectMockup } from './ProjectMockup';
import { StickerCard } from './StickerCard';
import { CaseStudyModal } from './CaseStudyModal';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from './Icons';
import { ArrowUpRight } from 'lucide-react';

type TabType = 'experience' | 'education' | 'works';

export const EzraPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('experience');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const activeProject = projectsData.find((p) => p.id === selectedProjectId) ?? null;

  return (
    <div className="min-h-screen bg-white text-[#101010] selection:bg-[#ffd3e5] selection:text-[#fd4aa6]">
      
      {/* 1. Sticky Header with Ezra's exact brand logo */}
      <header className="sticky top-0 z-50 backdrop-blur-[18px] bg-white/80 border-b border-[#101010]/10">
        <nav className="max-w-[760px] mx-auto px-5 sm:px-6 h-[70px] flex items-center justify-center select-none">
          <a
            href="/"
            className="font-hegarty text-[32px] text-[#101010] stroke-title no-underline hover:opacity-90 transition-opacity"
            aria-label="novan.arm home"
          >
            novan.arm
          </a>
        </nav>
      </header>

      {/* 2. Main Page Shell (Max Width ~760px matching Ezra's central column) */}
      <main className="max-w-[760px] mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-20 space-y-16">
        
        {/* GitHub Calendar Heatmap Section */}
        <section aria-label="GitHub contribution calendar" className="w-full">
          <GithubHeatmap />
        </section>

        {/* Intro Hero Section matching Ezra's exact HTML layout */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <p className="font-hegarty text-4xl sm:text-[42px] text-[#101010] stroke-title m-0">
              hello, i'm
            </p>
            <h1 className="font-hegarty text-4xl sm:text-[42px] text-[#101010] stroke-title m-0">
              novandi ramdhan
            </h1>
          </div>

          <p className="font-space text-lg sm:text-[20px] text-[#101010] font-medium leading-[1.8] pt-1">
            a software engineer with a strong foundation in informatics and web development.{' '}
            <span className="text-[#929292]">
              i'm curious about what happens behind the screen—from clean backend architectures and digital security to how AI-driven systems power real-world industrial workflows.
            </span>{' '}
            i share my journey on{' '}
            <SocialPill
              href="https://linkedin.com"
              icon={<LinkedInIcon className="w-3.5 h-3.5" />}
              label="linkedin"
              variant="linkedin"
              tilt={-1.2}
            />{' '}
            and{' '}
            <SocialPill
              href={profileData.instagramUrl}
              icon={<InstagramIcon className="w-3.5 h-3.5" />}
              label="instagram"
              variant="instagram"
              tilt={2.1}
            />
            , and keep everything i build on{' '}
            <SocialPill
              href={profileData.githubUrl}
              icon={<GitHubIcon className="w-3.5 h-3.5" />}
              label="github"
              variant="github"
              tilt={0.3}
            />
            .
          </p>
        </section>

        {/* Portfolio Tabs Navigation */}
        <section className="pt-4 space-y-12">
          <div className="flex items-end gap-9 border-b border-[#d8d8d8] overflow-x-auto select-none">
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`font-hegarty text-2xl pb-3.5 border-b-[3px] transition-colors cursor-pointer leading-none ${
                activeTab === 'experience'
                  ? 'text-black border-b-[#fd4aa6]'
                  : 'text-[#767676] border-b-transparent hover:text-black'
              }`}
            >
              experience
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`font-hegarty text-2xl pb-3.5 border-b-[3px] transition-colors cursor-pointer leading-none ${
                activeTab === 'education'
                  ? 'text-black border-b-[#fd4aa6]'
                  : 'text-[#767676] border-b-transparent hover:text-black'
              }`}
            >
              education
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('works')}
              className={`font-hegarty text-2xl pb-3.5 border-b-[3px] transition-colors cursor-pointer leading-none ${
                activeTab === 'works'
                  ? 'text-black border-b-[#fd4aa6]'
                  : 'text-[#767676] border-b-transparent hover:text-black'
              }`}
            >
              works
            </button>
          </div>

          {/* Dynamic Tab Panel */}
          <div className="pt-2">
            
            {/* TAB 1: EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="flex flex-col gap-14 animate-in fade-in duration-300">
                {profileData.experience.map((exp, idx) => (
                  <article key={idx} className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-start relative">
                    <div>
                      <h3 className="font-hegarty text-3xl sm:text-[40px] text-black leading-[1.05] m-0">
                        {exp.institution}
                      </h3>
                      <p className="font-geist text-lg sm:text-[20px] text-[#767676] font-semibold mt-2.5 mb-0 leading-[1.35]">
                        {exp.role}
                      </p>
                    </div>
                    <time className="font-dm-sans italic font-bold text-3xl sm:text-[44px] text-[#3d3d3d] text-right leading-none shrink-0">
                      {exp.period}
                    </time>
                    <p className="font-space font-medium text-base text-[#777] leading-[1.6] col-span-2 mt-3 m-0">
                      {exp.description}
                    </p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="font-space text-sm text-[#777] space-y-1.5 col-span-2 mt-2 pl-4 list-disc">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            )}

            {/* TAB 2: EDUCATION */}
            {activeTab === 'education' && (
              <div className="flex flex-col gap-14 animate-in fade-in duration-300">
                {profileData.education.map((edu, idx) => (
                  <article key={idx} className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-start relative">
                    <div>
                      <h3 className="font-hegarty text-3xl sm:text-[40px] text-black leading-[1.05] m-0">
                        {edu.institution}
                      </h3>
                      <p className="font-geist text-lg sm:text-[20px] text-[#767676] font-semibold mt-2.5 mb-0 leading-[1.35]">
                        {edu.degree} {edu.score ? `· ${edu.score}` : ''}
                      </p>
                    </div>
                    <time className="font-dm-sans italic font-bold text-3xl sm:text-[44px] text-[#3d3d3d] text-right leading-none shrink-0">
                      {edu.period}
                    </time>
                    <p className="font-space font-medium text-base text-[#777] leading-[1.6] col-span-2 mt-3 m-0">
                      {edu.description}
                    </p>
                  </article>
                ))}
              </div>
            )}

            {/* TAB 3: WORKS (PROJECTS WITH EXACT EZRA PREVIEW & BADGES) */}
            {activeTab === 'works' && (
              <div className="flex flex-col gap-14 animate-in fade-in duration-300">
                {projectsData.map((project) => (
                  <article key={project.id} className="relative group">
                    {/* Title with Case Study trigger */}
                    <div className="flex items-start justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="text-left group cursor-pointer"
                      >
                        <h3 className="font-hegarty text-3xl sm:text-[40px] text-black leading-[1.05] m-0 group-hover:text-[#fd4aa6] transition-colors">
                          {project.title}
                        </h3>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="hidden sm:inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm text-[#fd4aa6] hover:text-white hover:bg-[#fd4aa6] border border-[#fd4aa6]/40 hover:border-[#fd4aa6] px-3.5 py-1.5 rounded-full transition-all cursor-pointer active:scale-95 shrink-0 select-none"
                      >
                        <span>view full case study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="font-space font-medium text-base text-[#777] leading-[1.6] mt-3 mb-0">
                      {project.summary}
                    </p>

                    {/* Tech Stack Badges and Mobile Case Study CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                      <div className="flex flex-wrap gap-2" role="group" aria-label="Tech stack">
                        {project.techStack.map((tech) => (
                          <TechPill key={tech} name={tech} />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="sm:hidden inline-flex items-center gap-1.5 font-hegarty text-xs text-[#fd4aa6] hover:text-white hover:bg-[#fd4aa6] border border-[#fd4aa6]/40 hover:border-[#fd4aa6] px-3.5 py-1.5 rounded-full transition-all cursor-pointer active:scale-95 self-start shrink-0 select-none"
                      >
                        <span>view full case study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Desktop Floating Mockup Preview on Hover (Exact Ezra Experience) */}
                    <div className="hidden md:block opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none rounded-2xl border-[3.5px] border-white shadow-[0_22px_50px_rgba(0,0,0,0.22)] overflow-hidden scale-95 group-hover:scale-100 right-0 xl:left-[calc(100%+20px)] xl:right-auto">
                      <ProjectMockup projectId={project.id} />
                    </div>

                    {/* Mobile expandable preview toggle */}
                    <div className="md:hidden mt-3 pt-1">
                      <details className="group/preview">
                        <summary className="font-hegarty text-xs text-[#767676] hover:text-[#fd4aa6] cursor-pointer inline-flex items-center gap-1.5 select-none py-1">
                          <span>quick preview</span>
                          <span className="transition-transform group-open/preview:rotate-180 text-[9px]">▼</span>
                        </summary>
                        <div className="mt-2 rounded-2xl border-[3px] border-white shadow-lg overflow-hidden w-fit">
                          <ProjectMockup projectId={project.id} />
                        </div>
                      </details>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Lime Green CTA Card (Exact Ezra CTA) */}
        <section aria-label="Call to Action" className="pt-16">
          <StickerCard />
        </section>

        {/* Giant Brand Wordmark Footer (Exact Ezra Footer Typography) */}
        <section className="pt-20 sm:pt-24 pb-4 sm:pb-6 select-none flex justify-center overflow-hidden">
          <p className="font-hegarty text-[clamp(64px,18vw,165px)] text-[#202020] text-center leading-[0.9] tracking-[-0.04em] whitespace-nowrap m-0 opacity-95">
            novan
          </p>
        </section>

      </main>

      {/* Dark Footer Bar matching Ezra's exact bottom bar */}
      <footer className="w-full bg-[#202020] text-white h-[110px] sm:h-[135px] px-6 sm:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        <p className="font-hegarty text-sm sm:text-[0.95rem] text-white flex items-center gap-4 m-0">
          <span>@novandi ramdhan</span>
          <span aria-hidden="true">•</span>
          <span>all right reserved</span>
        </p>

        <nav className="flex items-center gap-6 font-hegarty text-base sm:text-[1.15rem]" aria-label="Footer navigation">
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#cf2ee3] hover:underline no-underline"
          >
            github
          </a>
          <a
            href={profileData.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#f0258d] hover:underline no-underline"
          >
            instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#46b8ff] hover:underline no-underline"
          >
            linkedin
          </a>
        </nav>
      </footer>

      {/* Modal Case Study for Deep Engineering Verification */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setSelectedProjectId(null)}
      />
    </div>
  );
};
