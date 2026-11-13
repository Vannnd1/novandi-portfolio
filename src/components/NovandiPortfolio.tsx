import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import { useLanguage } from '../context/useLanguage';
import { GithubHeatmap } from './GithubHeatmap';
import { SocialPill } from './SocialPill';
import { TechPill } from './TechPill';
import { ProjectMockup } from './ProjectMockup';
import { StickerCard } from './StickerCard';
import { CaseStudyModal } from './CaseStudyModal';
import { RevealOnScroll } from './RevealOnScroll';
import { Magnetic } from './MagneticButton';
import { Spotlight } from './Spotlight';
import { TiltCard } from './TiltCard';
import { ScrollProgress } from './ScrollProgress';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from './Icons';
import { ArrowUpRight, ArrowDown, GitBranch, CheckCircle2 } from 'lucide-react';
import { getMailtoUrl, handleSmartEmailClick } from '../utils/email';

type TabType = 'works' | 'experience' | 'education';

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const heroPhotoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.15,
    },
  },
};

export const NovandiPortfolio: React.FC = () => {
  const { language, setLanguage, t, profile, projects } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('works');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const activeProject = projects.find((p) => p.id === selectedProjectId) ?? null;

  const handleExploreWorks = () => {
    setActiveTab('works');
    const el = document.getElementById('portfolio-tabs');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = (e: React.MouseEvent) => {
    const el = document.getElementById('contact-card');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#101010] selection:bg-[#ffd3e5] selection:text-[#fd4aa6] relative">
      {/* 0. Top Thin Scroll Progress Bar */}
      <ScrollProgress />

      {/* 1. Sticky Header with Novandi's brand logo & Language Switcher */}
      <header className="sticky top-0 z-50 backdrop-blur-[18px] bg-white/80 border-b border-[#101010]/10">
        <nav className="max-w-[1040px] mx-auto px-6 sm:px-8 md:px-10 h-[72px] flex items-center justify-between select-none">
          <a
            href="/"
            className="font-hegarty text-[30px] sm:text-[32px] text-[#101010] stroke-title no-underline hover:opacity-85 transition-opacity flex items-center gap-2"
            aria-label={t.nav.homeAria}
          >
            <span>novan.arm</span>
          </a>

          {/* Interactive Language Switcher Toggle */}
          <div
            className="relative flex items-center gap-1 bg-[#f4f4f5] p-1 rounded-full border border-[#e4e4e7] text-xs font-space"
            role="group"
            aria-label={t.nav.langSwitchAria}
          >
            {(['id', 'en'] as const).map((langKey) => (
              <button
                key={langKey}
                type="button"
                onClick={() => setLanguage(langKey)}
                className={`relative px-3 py-1 rounded-full font-bold transition-colors duration-200 cursor-pointer uppercase z-10 select-none ${
                  language === langKey ? 'text-white' : 'text-[#666] hover:text-black'
                }`}
                title={langKey === 'id' ? 'Bahasa Indonesia' : 'English'}
              >
                {langKey}
                {language === langKey && (
                  <motion.span
                    layoutId="activeLangPill"
                    className="absolute inset-0 bg-[#101010] rounded-full -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* 2. Main Page Shell */}
      <main className="max-w-[1040px] mx-auto px-6 sm:px-8 md:px-10 pt-8 sm:pt-12 pb-24 space-y-16 sm:space-y-20">
        
        {/* ── HERO SECTION: Visually Striking Editorial First Screen ── */}
        <Spotlight
          className="rounded-3xl border border-[#101010]/8 bg-gradient-to-b from-[#fdfdfd] via-[#f9f9fa] to-white p-6 sm:p-10 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
          spotlightColor="rgba(253, 74, 166, 0.08)"
          size={700}
        >
          <motion.div
            variants={heroContainerVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate="visible"
            className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-14"
          >
            {/* Left Column: Discipline Pill, Editorial Headline, Bio, and Magnetic CTAs */}
            <div className="flex-1 space-y-6 text-left w-full">
              {/* Technical Status & Availability Badges */}
              <motion.div variants={heroItemVariants} className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] border border-black/10 font-space text-xs font-semibold text-[#18181b] tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-[#fd4aa6] animate-pulse" />
                  <span>{t.hero.discipline}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-space text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t.hero.statusAvailable}</span>
                </span>
              </motion.div>

              {/* Main Headline with Oversized Editorial Typography */}
              <motion.div variants={heroItemVariants} className="space-y-1">
                <p className="font-hegarty text-3xl sm:text-4xl text-[#767676] stroke-title m-0">
                  {t.hero.helloIm}
                </p>
                <h1 className="font-hegarty text-4xl sm:text-5xl md:text-6xl text-[#101010] stroke-title m-0 tracking-tight leading-[1.05]">
                  {t.hero.name.split(' ').map((word, wIdx) => (
                    <motion.span
                      key={wIdx}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.12 + wIdx * 0.08,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="inline-block mr-3 hover:text-[#fd4aa6] transition-colors cursor-default"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>

              {/* Narrative Bio Paragraph with Integrated Social Pills */}
              <motion.p variants={heroItemVariants} className="font-space text-base sm:text-lg text-[#262626] font-normal leading-[1.8] m-0">
                {t.hero.leadBefore}{' '}
                <span className="text-[#737373]">{t.hero.leadMuted}</span>{' '}
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
              </motion.p>

              {/* Primary Call-to-Actions with Magnetic Physics */}
              <motion.div variants={heroItemVariants} className="pt-2 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.3}>
                  <button
                    type="button"
                    onClick={handleExploreWorks}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#101010] hover:bg-[#202020] text-white font-hegarty text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-lg shadow-black/15 hover:shadow-[#fd4aa6]/25 hover:shadow-xl active:scale-95 group"
                  >
                    <span>{t.hero.exploreWorks}</span>
                    <ArrowDown className="w-4 h-4 text-[#fd4aa6] transition-transform duration-200 group-hover:translate-y-0.5" />
                  </button>
                </Magnetic>

                <Magnetic strength={0.25}>
                  <a
                    href="#contact-card"
                    onClick={handleContactClick}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#fafafa] border border-[#101010]/20 hover:border-[#101010] text-[#101010] font-hegarty text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>{t.hero.contactMe}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#767676]" />
                  </a>
                </Magnetic>
              </motion.div>
            </div>

            {/* Right Column: Prominent 3D Tilt Portrait Card */}
            <motion.div variants={heroPhotoVariants} className="shrink-0 relative group">
              <TiltCard maxTilt={8} scale={1.03}>
                <div className="relative">
                  {/* Subtle Gradient Glow Ring behind portrait */}
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#fd4aa6]/30 via-transparent to-[#46b8ff]/30 rounded-[28px] sm:rounded-[36px] blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Main Portrait Frame */}
                  <div className="relative w-48 h-60 sm:w-60 sm:h-76 md:w-68 md:h-84 rounded-2xl sm:rounded-3xl overflow-hidden border-[4px] border-white shadow-[0_20px_45px_rgba(0,0,0,0.15)] ring-1 ring-black/10 bg-[#f4f4f5]">
                    <img
                      src="/profile.jpg"
                      alt={profile.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Bottom Floating Identity Chip */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-sm flex items-center justify-between">
                      <div className="font-space text-[11px] font-bold text-[#101010] leading-tight">
                        <div>{profile.location}</div>
                        <div className="text-[9.5px] font-normal text-[#666]">NPM: 51422256</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </Spotlight>

        {/* ── TECHNICAL CREDIBILITY STRIP ── */}
        <RevealOnScroll delay={30} distance={16} className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#fafafa] border border-[#eaeaea] shadow-2xs">
            <div className="space-y-0.5">
              <div className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#101010]">{profile.verifiedMetrics.gpa}</div>
              <div className="font-space text-[11px] text-[#737373] uppercase tracking-wider font-semibold">IPK · S1 Informatika</div>
            </div>
            <div className="space-y-0.5">
              <div className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#fd4aa6]">252 Tests</div>
              <div className="font-space text-[11px] text-[#737373] uppercase tracking-wider font-semibold">Automated Test Suites</div>
            </div>
            <div className="space-y-0.5">
              <div className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#101010]">15/15 NIST</div>
              <div className="font-space text-[11px] text-[#737373] uppercase tracking-wider font-semibold">SP 800-22 Crypto Tests</div>
            </div>
            <div className="space-y-0.5">
              <div className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#101010]">540K+ Data</div>
              <div className="font-space text-[11px] text-[#737373] uppercase tracking-wider font-semibold">Processed Records</div>
            </div>
          </div>
        </RevealOnScroll>

        {/* ── GITHUB CONTRIBUTION HEATMAP ── */}
        <RevealOnScroll delay={40} distance={18} className="w-full">
          <section aria-label={t.heatmap.ariaLabel} className="w-full">
            <GithubHeatmap />
          </section>
        </RevealOnScroll>

        {/* ── PORTFOLIO TABS NAVIGATION ── */}
        <section id="portfolio-tabs" className="pt-4 space-y-10 scroll-mt-24">
          <div className="flex items-end gap-9 border-b border-[#d8d8d8] overflow-x-auto select-none">
            {(['works', 'experience', 'education'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative font-hegarty text-2xl pb-3.5 transition-colors cursor-pointer leading-none capitalize ${
                  activeTab === tab ? 'text-black' : 'text-[#767676] hover:text-black'
                }`}
              >
                {t.tabs[tab]}
                {activeTab === tab && (
                  <motion.span
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#fd4aa6]"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Panels */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              
              {/* ── TAB 1: WORKS (VISUALLY STRIKING PROJECT SHOWCASE) ── */}
              {activeTab === 'works' && (
                <motion.div
                  key="works"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-12"
                >
                  {projects.map((project, idx) => (
                    <RevealOnScroll key={project.id} delay={idx * 50} distance={24}>
                      <article className="group relative rounded-3xl border border-[#e8e8e8] bg-[#fbfbfb] hover:bg-white p-6 sm:p-8 md:p-10 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden">
                        {/* Subtle top corner gradient accent */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#fd4aa6]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                          {/* Left Column (Metadata, Title, Description, Metrics, Actions) */}
                          <div className="w-full lg:col-span-6 space-y-4 text-left">
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
                              onClick={() => setSelectedProjectId(project.id)}
                              className="text-left group/title cursor-pointer block focus:outline-hidden"
                            >
                              <h3 className="font-hegarty text-2xl sm:text-3xl md:text-4xl text-[#101010] leading-[1.08] m-0 group-hover/title:text-[#fd4aa6] transition-colors">
                                {project.title}
                              </h3>
                            </button>

                            {project.subtitle && (
                              <p className="font-geist text-sm sm:text-base font-semibold text-[#666] leading-snug m-0">
                                {project.subtitle}
                              </p>
                            )}

                            {/* Summary */}
                            <p className="font-space font-medium text-sm sm:text-base text-[#555] leading-relaxed m-0">
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
                                  onClick={() => setSelectedProjectId(project.id)}
                                  className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-[#101010] hover:bg-[#fd4aa6] text-white px-4 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-sm hover:shadow-md hover:shadow-[#fd4aa6]/25"
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
                                    className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-300/80 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
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
                                    className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-white hover:bg-black hover:text-white border border-[#d4d4d8] text-[#27272a] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
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

                          {/* Right Column (Visual Mockup Viewport with 3D Tilt) */}
                          <div className="w-full lg:col-span-6 flex justify-center">
                            <TiltCard maxTilt={6} scale={1.02} className="w-full max-w-[450px]">
                              <div
                                onClick={() => setSelectedProjectId(project.id)}
                                className="cursor-pointer rounded-2xl border-[3px] border-white shadow-[0_16px_36px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
                                title={t.works.viewCaseStudy}
                              >
                                <ProjectMockup projectId={project.id} />
                              </div>
                            </TiltCard>
                          </div>
                        </div>
                      </article>
                    </RevealOnScroll>
                  ))}
                </motion.div>
              )}

              {/* ── TAB 2: EXPERIENCE (EDITORIAL TIMELINE) ── */}
              {activeTab === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-10"
                >
                  <div className="border-l-2 border-[#101010]/15 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-12 relative">
                    {profile.experience.map((exp, idx) => (
                      <RevealOnScroll key={idx} delay={idx * 60} distance={18}>
                        <div className="relative group p-6 sm:p-8 rounded-2xl bg-[#fafafa]/70 hover:bg-white border border-[#eaeaea] hover:border-[#101010]/20 transition-all duration-300 hover:shadow-md">
                          {/* Animated Timeline Node */}
                          <span className="absolute -left-[31px] sm:-left-[39px] top-7 w-3.5 h-3.5 rounded-full bg-[#fd4aa6] ring-4 ring-white shadow-xs" />

                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2">
                            <h3 className="font-hegarty text-2xl sm:text-3xl md:text-4xl text-[#101010] m-0 leading-tight">
                              {exp.institution}
                            </h3>
                            <time className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#fd4aa6] shrink-0">
                              {exp.period}
                            </time>
                          </div>

                          <div className="inline-block px-3 py-1 rounded-full bg-black/5 text-[#404040] font-geist font-semibold text-sm mb-3">
                            {exp.role}
                          </div>

                          <p className="font-space font-medium text-base text-[#666] leading-[1.65] m-0">
                            {exp.description}
                          </p>

                          {exp.highlights && exp.highlights.length > 0 && (
                            <ul className="font-space text-sm text-[#555] space-y-2.5 mt-4 pt-3 border-t border-[#eaeaea]/60">
                              {exp.highlights.map((h, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2.5">
                                  <CheckCircle2 className="w-4 h-4 text-[#fd4aa6] shrink-0 mt-0.5" />
                                  <span className="leading-relaxed">{h}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </RevealOnScroll>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── TAB 3: EDUCATION (EDITORIAL TIMELINE) ── */}
              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-10"
                >
                  <div className="border-l-2 border-[#101010]/15 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-12 relative">
                    {profile.education.map((edu, idx) => (
                      <RevealOnScroll key={idx} delay={idx * 60} distance={18}>
                        <div className="relative group p-6 sm:p-8 rounded-2xl bg-[#fafafa]/70 hover:bg-white border border-[#eaeaea] hover:border-[#101010]/20 transition-all duration-300 hover:shadow-md">
                          {/* Timeline Node */}
                          <span className="absolute -left-[31px] sm:-left-[39px] top-7 w-3.5 h-3.5 rounded-full bg-[#fd4aa6] ring-4 ring-white shadow-xs" />

                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2">
                            <h3 className="font-hegarty text-2xl sm:text-3xl md:text-4xl text-[#101010] m-0 leading-tight">
                              {edu.institution}
                            </h3>
                            <time className="font-dm-sans italic font-bold text-xl sm:text-2xl text-[#fd4aa6] shrink-0">
                              {edu.period}
                            </time>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-block px-3 py-1 rounded-full bg-black/5 text-[#404040] font-geist font-semibold text-sm">
                              {edu.degree}
                            </span>
                            {edu.score && (
                              <span className="inline-block px-3 py-1 rounded-full bg-[#fd4aa6]/10 text-[#fd4aa6] border border-[#fd4aa6]/25 font-geist font-bold text-sm">
                                {edu.score}
                              </span>
                            )}
                          </div>

                          <p className="font-space font-medium text-base text-[#666] leading-[1.65] m-0">
                            {edu.description}
                          </p>
                        </div>
                      </RevealOnScroll>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </section>

        {/* ── LIME GREEN CALL TO ACTION ── */}
        <RevealOnScroll distance={24} delay={50}>
          <section aria-label="Call to Action" className="pt-12 sm:pt-16">
            <StickerCard />
          </section>
        </RevealOnScroll>

        {/* ── GIANT BRAND WORDMARK FOOTER TYPOGRAPHY ── */}
        <RevealOnScroll distance={20} delay={60} duration={750}>
          <section className="pt-16 sm:pt-20 pb-4 sm:pb-6 select-none flex justify-center overflow-hidden">
            <p className="font-hegarty text-[clamp(64px,18vw,165px)] text-[#202020] text-center leading-[0.9] tracking-[-0.04em] whitespace-nowrap m-0 opacity-95 flex justify-center">
              {'novan'.split('').map((char, cIdx) => (
                <motion.span
                  key={cIdx}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 22, scale: 0.96 }}
                  whileInView={{ opacity: 0.95, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: cIdx * 0.06,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  whileHover={{
                    scale: 1.05,
                    color: '#fd4aa6',
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="inline-block transition-colors cursor-default"
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </section>
        </RevealOnScroll>

      </main>

      {/* ── DARK FOOTER BAR ── */}
      <footer className="w-full bg-[#202020] text-white py-8 sm:h-[135px] select-none flex items-center">
        <div className="max-w-[1040px] w-full mx-auto px-6 sm:px-8 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-hegarty text-sm sm:text-[0.95rem] text-white flex items-center gap-4 m-0">
            <span>@novandi ahmad ramdhan</span>
            <span aria-hidden="true">•</span>
            <span>{t.footer.rights}</span>
          </p>

          <nav className="flex items-center gap-6 font-hegarty text-base sm:text-[1.15rem]" aria-label={t.footer.navAria}>
            <motion.a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#cf2ee3] hover:underline no-underline inline-block transition-transform"
            >
              github
            </motion.a>
            <motion.a
              href={profile.instagramUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#f0258d] hover:underline no-underline inline-block transition-transform"
            >
              instagram
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#46b8ff] hover:underline no-underline inline-block transition-transform"
            >
              linkedin
            </motion.a>
            <motion.a
              href={getMailtoUrl(profile.email)}
              onClick={(e) => handleSmartEmailClick(e, profile.email)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#bef264] hover:underline no-underline inline-block transition-transform"
            >
              email
            </motion.a>
          </nav>
        </div>
      </footer>

      {/* ── MODAL CASE STUDY FOR DEEP ENGINEERING VERIFICATION ── */}
      <AnimatePresence>
        {activeProject && (
          <CaseStudyModal
            key={activeProject.id}
            project={activeProject}
            onClose={() => setSelectedProjectId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
