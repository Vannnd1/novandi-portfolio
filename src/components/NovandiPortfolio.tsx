import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/useLanguage';
import { ScrollProgress } from './ScrollProgress';
import { ThemeToggle } from './ThemeToggle';
import { HeroSection } from './portfolio/HeroSection';
import { TechnicalMetrics } from './portfolio/TechnicalMetrics';
import { ProjectShowcase } from './portfolio/ProjectShowcase';
import { TimelineSection } from './portfolio/TimelineSection';
import { GithubHeatmap } from './GithubHeatmap';
import { TechPondCard } from './portfolio/TechPondCard';
import { CaseStudyModal } from './CaseStudyModal';
import { RevealOnScroll } from './RevealOnScroll';
import { getMailtoUrl, handleSmartEmailClick } from '../utils/email';

type TabType = 'works' | 'experience' | 'education';

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

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-[#101010] dark:text-[#f4f4f5] selection:bg-[#ffd3e5] selection:text-[#fd4aa6] dark:selection:bg-[#fd4aa6]/30 dark:selection:text-[#fd4aa6] relative transition-colors duration-200">
      {/* 0. Top Thin Scroll Progress Bar */}
      <ScrollProgress />

      {/* 1. Sticky Header with Novandi's brand logo, Theme Toggle & Language Switcher */}
      <header className="sticky top-0 z-50 backdrop-blur-[18px] bg-white/80 dark:bg-[#09090b]/80 border-b border-[#101010]/10 dark:border-white/10 transition-colors duration-200">
        <nav className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 h-[72px] flex items-center justify-between select-none">
          <a
            href="/"
            className="font-hegarty text-[30px] sm:text-[32px] text-[#101010] dark:text-white stroke-title no-underline hover:opacity-85 transition-opacity flex items-center gap-2"
            aria-label={t.nav.homeAria}
          >
            <span>novan.arm</span>
          </a>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Interactive Theme Toggle Button */}
            <ThemeToggle />

            {/* Interactive Language Switcher Toggle */}
            <div
              className="relative grid grid-cols-2 p-1 bg-[#f4f4f5] dark:bg-[#18181b] rounded-full border border-[#e4e4e7] dark:border-[#27272a] text-xs font-space transition-colors select-none"
              role="group"
              aria-label={t.nav.langSwitchAria}
            >
              {/* Sliding indicator pill: uses pure relative X transform, completely immune to sticky header scroll offset */}
              <motion.span
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#101010] dark:bg-white rounded-full shadow-xs pointer-events-none"
                initial={false}
                animate={{
                  x: language === 'id' ? 0 : '100%',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />

              {(['id', 'en'] as const).map((langKey) => (
                <button
                  key={langKey}
                  type="button"
                  onClick={() => setLanguage(langKey)}
                  className={`relative z-10 px-3 py-1 min-w-[38px] text-center rounded-full font-bold transition-colors duration-200 cursor-pointer uppercase select-none ${
                    language === langKey
                      ? 'text-white dark:text-black'
                      : 'text-[#666] dark:text-[#a1a1aa] hover:text-black dark:hover:text-white'
                  }`}
                  title={langKey === 'id' ? 'Bahasa Indonesia' : 'English'}
                >
                  {langKey}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* 2. Main Page Shell */}
      <main className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-20 space-y-12 sm:space-y-16">
        
        {/* ── HERO SECTION: Visually Striking Editorial First Screen ── */}
        <HeroSection onExploreWorks={handleExploreWorks} />

        {/* ── TECHNICAL CREDIBILITY STRIP ── */}
        <TechnicalMetrics />

        {/* ── GITHUB CONTRIBUTION HEATMAP ── */}
        <RevealOnScroll delay={40} distance={18} className="w-full">
          <section aria-label={t.heatmap.ariaLabel} className="w-full">
            <GithubHeatmap />
          </section>
        </RevealOnScroll>

        {/* ── PORTFOLIO TABS NAVIGATION ── */}
        <section id="portfolio-tabs" className="space-y-8 scroll-mt-24">
          <div className="flex items-end gap-9 border-b border-[#d8d8d8] dark:border-[#27272a] overflow-x-auto select-none transition-colors">
            {(['works', 'experience', 'education'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative font-hegarty text-2xl pb-3.5 transition-colors cursor-pointer leading-none capitalize ${
                  activeTab === tab ? 'text-black dark:text-white' : 'text-[#767676] dark:text-[#a1a1aa] hover:text-black dark:hover:text-white'
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
              {activeTab === 'works' && (
                <ProjectShowcase
                  key="works-showcase"
                  projects={projects}
                  onSelectProject={setSelectedProjectId}
                />
              )}

              {activeTab === 'experience' && (
                <TimelineSection key="experience-timeline" type="experience" />
              )}

              {activeTab === 'education' && (
                <TimelineSection key="education-timeline" type="education" />
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── INTERACTIVE TECH STACK POND ── */}
        <RevealOnScroll distance={24} delay={50}>
          <section aria-label={t.techPond.ariaLabel}>
            <TechPondCard />
          </section>
        </RevealOnScroll>

        {/* ── GIANT BRAND WORDMARK FOOTER TYPOGRAPHY ── */}
        <RevealOnScroll distance={20} delay={60} duration={750}>
          <section className="pt-2 pb-2 select-none flex justify-center overflow-hidden">
            <p className="font-hegarty text-[clamp(64px,18vw,165px)] text-[#202020] dark:text-[#27272a] text-center leading-[0.9] tracking-[-0.04em] whitespace-nowrap m-0 opacity-95 flex justify-center">
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
      <footer className="w-full bg-[#202020] dark:bg-[#0c0c0e] border-t border-transparent dark:border-[#27272a] text-white py-8 sm:h-[135px] select-none flex items-center transition-colors">
        <div className="max-w-[1180px] w-full mx-auto px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
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
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#38bdf8] hover:underline no-underline inline-block transition-transform"
            >
              linkedin
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
