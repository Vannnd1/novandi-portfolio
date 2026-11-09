import React, { useState } from 'react';
import { useLanguage } from '../context/useLanguage';
import { GithubHeatmap } from './GithubHeatmap';
import { SocialPill } from './SocialPill';
import { TechPill } from './TechPill';
import { ProjectMockup } from './ProjectMockup';
import { StickerCard } from './StickerCard';
import { CaseStudyModal } from './CaseStudyModal';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from './Icons';
import { ArrowUpRight } from 'lucide-react';
import { getMailtoUrl, handleSmartEmailClick } from '../utils/email';

type TabType = 'experience' | 'education' | 'works';

export const NovandiPortfolio: React.FC = () => {
  const { language, setLanguage, t, profile, projects } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('experience');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const activeProject = projects.find((p) => p.id === selectedProjectId) ?? null;

  return (
    <div className="min-h-screen bg-white text-[#101010] selection:bg-[#ffd3e5] selection:text-[#fd4aa6]">
      
      {/* 1. Sticky Header with Novandi's brand logo & Language Switcher */}
      <header className="sticky top-0 z-50 backdrop-blur-[18px] bg-white/80 border-b border-[#101010]/10">
        <nav className="max-w-[1020px] mx-auto px-6 sm:px-8 md:px-10 h-[72px] flex items-center justify-between select-none">
          <a
            href="/"
            className="font-hegarty text-[32px] text-[#101010] stroke-title no-underline hover:opacity-90 transition-opacity"
            aria-label={t.nav.homeAria}
          >
            novan.arm
          </a>

          {/* Interactive Language Switcher Toggle */}
          <div
            className="flex items-center gap-1 bg-[#f4f4f5] p-1 rounded-full border border-[#e4e4e7] text-xs font-space"
            role="group"
            aria-label={t.nav.langSwitchAria}
          >
            <button
              type="button"
              onClick={() => setLanguage('id')}
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                language === 'id'
                  ? 'bg-[#101010] text-white shadow-xs'
                  : 'text-[#666] hover:text-black hover:bg-black/5'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#101010] text-white shadow-xs'
                  : 'text-[#666] hover:text-black hover:bg-black/5'
              }`}
              title="English"
            >
              EN
            </button>
          </div>
        </nav>
      </header>

      {/* 2. Main Page Shell (Widened to 1020px for spacious, clean typography & layout) */}
      <main className="max-w-[1020px] mx-auto px-6 sm:px-8 md:px-10 pt-10 sm:pt-14 pb-24 space-y-16 sm:space-y-20">
        
        {/* GitHub Calendar Heatmap Section */}
        <section aria-label={t.heatmap.ariaLabel} className="w-full">
          <GithubHeatmap />
        </section>

        {/* Intro Hero Section with Profile Photo */}
        <section className="pt-2">
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-10">
            {/* Left Column: Text & Intro */}
            <div className="flex-1 space-y-4 text-left">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <p className="font-hegarty text-4xl sm:text-[42px] text-[#101010] stroke-title m-0">
                  {t.hero.helloIm}
                </p>
                <h1 className="font-hegarty text-4xl sm:text-[42px] text-[#101010] stroke-title m-0">
                  {t.hero.name}
                </h1>
              </div>

              <p className="font-space text-lg sm:text-[20px] text-[#101010] font-medium leading-[1.8] pt-1 m-0">
                {t.hero.leadBefore}{' '}
                <span className="text-[#929292]">
                  {t.hero.leadMuted}
                </span>{' '}
                {t.hero.leadShare}{' '}
                <SocialPill
                  href="https://linkedin.com"
                  icon={<LinkedInIcon className="w-3.5 h-3.5" />}
                  label="linkedin"
                  variant="linkedin"
                  tilt={-1.2}
                />{' '}
                {t.hero.and}{' '}
                <SocialPill
                  href={profile.instagramUrl}
                  icon={<InstagramIcon className="w-3.5 h-3.5" />}
                  label="instagram"
                  variant="instagram"
                  tilt={2.1}
                />
                {t.hero.leadKeep}{' '}
                <SocialPill
                  href={profile.githubUrl}
                  icon={<GitHubIcon className="w-3.5 h-3.5" />}
                  label="github"
                  variant="github"
                  tilt={0.3}
                />
                .
              </p>
            </div>

            {/* Right Column: Professional Profile Photo Card */}
            <div className="shrink-0 relative group">
              <div className="w-32 h-40 sm:w-40 sm:h-48 md:w-44 md:h-52 rounded-2xl sm:rounded-3xl overflow-hidden border-[3.5px] border-white shadow-[0_14px_32px_rgba(0,0,0,0.12)] ring-1 ring-black/10 bg-[#f4f4f5] transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_18px_38px_rgba(0,0,0,0.16)]">
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Status Indicator Badge */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:-right-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e4e4e7] shadow-sm text-xs font-space font-semibold text-[#18181b] whitespace-nowrap select-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.hero.statusAvailable}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Tabs Navigation */}
        <section className="pt-4 space-y-12">
          <div className="flex items-end gap-9 border-b border-[#d8d8d8] overflow-x-auto select-none">
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`font-hegarty text-2xl pb-3.5 border-b-[3px] transition-colors cursor-pointer leading-none capitalize ${
                activeTab === 'experience'
                  ? 'text-black border-b-[#fd4aa6]'
                  : 'text-[#767676] border-b-transparent hover:text-black'
              }`}
            >
              {t.tabs.experience}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`font-hegarty text-2xl pb-3.5 border-b-[3px] transition-colors cursor-pointer leading-none capitalize ${
                activeTab === 'education'
                  ? 'text-black border-b-[#fd4aa6]'
                  : 'text-[#767676] border-b-transparent hover:text-black'
              }`}
            >
              {t.tabs.education}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('works')}
              className={`font-hegarty text-2xl pb-3.5 border-b-[3px] transition-colors cursor-pointer leading-none capitalize ${
                activeTab === 'works'
                  ? 'text-black border-b-[#fd4aa6]'
                  : 'text-[#767676] border-b-transparent hover:text-black'
              }`}
            >
              {t.tabs.works}
            </button>
          </div>

          {/* Dynamic Tab Panel */}
          <div className="pt-2">
            
            {/* TAB 1: EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="flex flex-col gap-14 animate-in fade-in duration-300">
                {profile.experience.map((exp, idx) => (
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
                {profile.education.map((edu, idx) => (
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

            {/* TAB 3: WORKS (PROJECTS WITH INTERACTIVE PREVIEWS & BADGES) */}
            {activeTab === 'works' && (
              <div className="flex flex-col gap-14 animate-in fade-in duration-300">
                {projects.map((project) => (
                  <article key={project.id} className="relative group border-b border-[#ececec] pb-12 last:border-b-0">
                    {/* Title and Direct Action Buttons */}
                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="text-left group cursor-pointer block"
                      >
                        <h3 className="font-hegarty text-3xl sm:text-[38px] md:text-[40px] text-black leading-[1.08] m-0 group-hover:text-[#fd4aa6] transition-colors">
                          {project.title}
                        </h3>
                      </button>

                      {/* Action buttons (case study & live demo) placed cleanly below title */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setSelectedProjectId(project.id)}
                          className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm text-[#fd4aa6] hover:text-white hover:bg-[#fd4aa6] border border-[#fd4aa6]/40 hover:border-[#fd4aa6] px-3.5 py-1.5 rounded-full transition-all cursor-pointer active:scale-95 shrink-0 select-none"
                        >
                          <span>{t.works.viewCaseStudy}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm text-[#059669] hover:text-white hover:bg-[#059669] border border-[#059669]/40 hover:border-[#059669] px-3.5 py-1.5 rounded-full transition-all cursor-pointer active:scale-95 shrink-0 select-none bg-emerald-50/50"
                            title={t.works.liveDemo}
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{t.works.liveDemo}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-space font-medium text-base text-[#666] leading-[1.65] mt-3.5 mb-0">
                      {project.summary}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label={t.works.techStackAria}>
                      {project.techStack.map((tech) => (
                        <TechPill key={tech} name={tech} />
                      ))}
                    </div>

                    {/* Desktop Floating Mockup Preview on Hover */}
                    <div className="hidden md:block opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none rounded-2xl border-[3.5px] border-white shadow-[0_22px_50px_rgba(0,0,0,0.22)] overflow-hidden scale-95 group-hover:scale-100 right-0 2xl:left-[calc(100%+24px)] 2xl:right-auto">
                      <ProjectMockup projectId={project.id} />
                    </div>

                    {/* Mobile expandable preview toggle */}
                    <div className="md:hidden mt-3 pt-1">
                      <details className="group/preview">
                        <summary className="font-hegarty text-xs text-[#767676] hover:text-[#fd4aa6] cursor-pointer inline-flex items-center gap-1.5 select-none py-1">
                          <span>{t.works.quickPreview}</span>
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

        {/* Lime Green CTA Card */}
        <section aria-label="Call to Action" className="pt-16">
          <StickerCard />
        </section>

        {/* Giant Brand Wordmark Footer Typography */}
        <section className="pt-20 sm:pt-24 pb-4 sm:pb-6 select-none flex justify-center overflow-hidden">
          <p className="font-hegarty text-[clamp(64px,18vw,165px)] text-[#202020] text-center leading-[0.9] tracking-[-0.04em] whitespace-nowrap m-0 opacity-95">
            novan
          </p>
        </section>

      </main>

      {/* Dark Footer Bar */}
      <footer className="w-full bg-[#202020] text-white py-8 sm:h-[135px] select-none flex items-center">
        <div className="max-w-[1020px] w-full mx-auto px-6 sm:px-8 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-hegarty text-sm sm:text-[0.95rem] text-white flex items-center gap-4 m-0">
            <span>@novandi ahmad ramdhan</span>
            <span aria-hidden="true">•</span>
            <span>{t.footer.rights}</span>
          </p>

          <nav className="flex items-center gap-6 font-hegarty text-base sm:text-[1.15rem]" aria-label={t.footer.navAria}>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#cf2ee3] hover:underline no-underline"
            >
              github
            </a>
            <a
              href={profile.instagramUrl}
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
            <a
              href={getMailtoUrl(profile.email)}
              onClick={(e) => handleSmartEmailClick(e, profile.email)}
              className="text-[#bef264] hover:underline no-underline"
            >
              email
            </a>
          </nav>
        </div>
      </footer>

      {/* Modal Case Study for Deep Engineering Verification */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setSelectedProjectId(null)}
      />
    </div>
  );
};
