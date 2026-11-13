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
import { GitHubIcon, InstagramIcon, LinkedInIcon } from './Icons';
import { ArrowUpRight } from 'lucide-react';
import { getMailtoUrl, handleSmartEmailClick } from '../utils/email';

type TabType = 'experience' | 'education' | 'works';

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.18,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.35,
    },
  },
};

export const NovandiPortfolio: React.FC = () => {
  const { language, setLanguage, t, profile, projects } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('experience');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

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
                  language === langKey
                    ? 'text-white'
                    : 'text-[#666] hover:text-black'
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

      {/* 2. Main Page Shell (Widened to 1020px for spacious, clean typography & layout) */}
      <main className="max-w-[1020px] mx-auto px-6 sm:px-8 md:px-10 pt-10 sm:pt-14 pb-24 space-y-16 sm:space-y-20">
        
        {/* GitHub Calendar Heatmap Section */}
        <RevealOnScroll delay={50} distance={18} className="w-full">
          <section aria-label={t.heatmap.ariaLabel} className="w-full">
            <GithubHeatmap />
          </section>
        </RevealOnScroll>

        {/* Intro Hero Section with Profile Photo */}
        <motion.section
          variants={heroContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          className="pt-2"
        >
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-10">
            {/* Left Column: Text & Intro */}
            <div className="flex-1 space-y-4 text-left">
              <motion.div variants={heroItemVariants} className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-hegarty text-4xl sm:text-[42px] text-[#101010] stroke-title m-0 inline-block">
                  {t.hero.helloIm}
                </span>
                <h1 className="font-hegarty text-4xl sm:text-[42px] text-[#101010] stroke-title m-0 inline-flex flex-wrap gap-x-2.5">
                  {t.hero.name.split(' ').map((word, wIdx) => (
                    <motion.span
                      key={wIdx}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.12 + wIdx * 0.08,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>

              <motion.p variants={heroItemVariants} className="font-space text-lg sm:text-[20px] text-[#101010] font-medium leading-[1.8] pt-1 m-0">
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
              </motion.p>
            </div>

            {/* Right Column: Professional Profile Photo Card */}
            <motion.div variants={heroPhotoVariants} className="shrink-0 relative group">
              <div className="w-32 h-40 sm:w-40 sm:h-48 md:w-44 md:h-52 rounded-2xl sm:rounded-3xl overflow-hidden border-[3.5px] border-white shadow-[0_14px_32px_rgba(0,0,0,0.12)] ring-1 ring-black/10 bg-[#f4f4f5] transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_18px_38px_rgba(0,0,0,0.16)]">
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Status Indicator Badge */}
              <motion.div
                variants={badgeVariants}
                className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:-right-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e4e4e7] shadow-sm text-xs font-space font-semibold text-[#18181b] whitespace-nowrap select-none"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.hero.statusAvailable}</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Portfolio Tabs Navigation */}
        <section className="pt-4 space-y-12">
          <div className="flex items-end gap-9 border-b border-[#d8d8d8] overflow-x-auto select-none">
            {(['experience', 'education', 'works'] as const).map((tab) => (
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

          {/* Dynamic Tab Panel */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              {/* TAB 1: EXPERIENCE */}
              {activeTab === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-14"
                >
                  {profile.experience.map((exp, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 60} distance={16}>
                      <article className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-start relative">
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
                    </RevealOnScroll>
                  ))}
                </motion.div>
              )}

              {/* TAB 2: EDUCATION */}
              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-14"
                >
                  {profile.education.map((edu, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 60} distance={16}>
                      <article className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-start relative">
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
                    </RevealOnScroll>
                  ))}
                </motion.div>
              )}

              {/* TAB 3: WORKS (PROJECTS WITH INTERACTIVE PREVIEWS & BADGES) */}
              {activeTab === 'works' && (
                <motion.div
                  key="works"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-14"
                >
                  {projects.map((project, idx) => (
                    <RevealOnScroll key={project.id} delay={idx * 50} distance={20}>
                      <article className="relative group border-b border-[#ececec] pb-12 last:border-b-0">
                        {/* Title and Direct Action Buttons */}
                        <div className="space-y-2.5">
                          <button
                            type="button"
                            onClick={() => setSelectedProjectId(project.id)}
                            className="text-left group/title cursor-pointer block focus:outline-hidden"
                          >
                            <h3 className="font-hegarty text-3xl sm:text-[38px] md:text-[40px] text-black leading-[1.08] m-0 group-hover/title:text-[#fd4aa6] group-hover/title:translate-x-1 transition-all duration-200">
                              {project.title}
                            </h3>
                          </button>

                          {/* Action buttons (case study & live demo) placed cleanly below title */}
                          <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                            <button
                              type="button"
                              onClick={() => setSelectedProjectId(project.id)}
                              className="group/btn inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm text-[#fd4aa6] hover:text-white hover:bg-[#fd4aa6] border border-[#fd4aa6]/40 hover:border-[#fd4aa6] px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shrink-0 select-none shadow-xs hover:shadow-md hover:shadow-[#fd4aa6]/20"
                            >
                              <span>{t.works.viewCaseStudy}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </button>

                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="group/demo inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm text-[#059669] hover:text-white hover:bg-[#059669] border border-[#059669]/40 hover:border-[#059669] px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shrink-0 select-none bg-emerald-50/50 shadow-xs hover:shadow-md hover:shadow-emerald-600/20"
                                title={t.works.liveDemo}
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>{t.works.liveDemo}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" />
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

                        {/* Desktop Floating Mockup Preview on Hover / Focus */}
                        <div className="hidden md:block opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 ease-out absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none rounded-2xl border-[3.5px] border-white shadow-[0_22px_50px_rgba(0,0,0,0.22)] overflow-hidden scale-95 group-hover:scale-100 group-focus-within:scale-100 group-hover:-rotate-0.5 right-0 2xl:left-[calc(100%+24px)] 2xl:right-auto">
                          <ProjectMockup projectId={project.id} />
                        </div>

                        {/* Mobile expandable preview toggle */}
                        <div className="md:hidden mt-3 pt-1">
                          <details className="group/preview">
                            <summary className="font-hegarty text-xs text-[#767676] hover:text-[#fd4aa6] cursor-pointer inline-flex items-center gap-1.5 select-none py-1 transition-colors">
                              <span>{t.works.quickPreview}</span>
                              <span className="transition-transform duration-200 group-open/preview:rotate-180 text-[9px]">▼</span>
                            </summary>
                            <div className="mt-2 rounded-2xl border-[3px] border-white shadow-lg overflow-hidden w-fit animate-slide-up-fade">
                              <ProjectMockup projectId={project.id} />
                            </div>
                          </details>
                        </div>
                      </article>
                    </RevealOnScroll>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Lime Green CTA Card */}
        <RevealOnScroll distance={24} delay={50}>
          <section aria-label="Call to Action" className="pt-16">
            <StickerCard />
          </section>
        </RevealOnScroll>

        {/* Giant Brand Wordmark Footer Typography */}
        <RevealOnScroll distance={20} delay={60} duration={750}>
          <section className="pt-20 sm:pt-24 pb-4 sm:pb-6 select-none flex justify-center overflow-hidden">
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

      {/* Dark Footer Bar */}
      <footer className="w-full bg-[#202020] text-white py-8 sm:h-[135px] select-none flex items-center">
        <div className="max-w-[1020px] w-full mx-auto px-6 sm:px-8 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
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

      {/* Modal Case Study for Deep Engineering Verification */}
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
