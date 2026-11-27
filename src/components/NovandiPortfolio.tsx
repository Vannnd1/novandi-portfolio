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
import { ViceLoadoutCard } from './portfolio/ViceLoadoutCard';
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
    <div className="min-h-screen bg-[#fff9f6] dark:bg-[#0b0614] text-[#1a1026] dark:text-[#fdf7ff] selection:bg-[#ffd1e8] selection:text-[#d61f7a] dark:selection:bg-[#ff3b9a]/35 dark:selection:text-[#ff85c2] relative transition-colors duration-200">
      {/* Subtle Static Vice City Sunset Horizon Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[460px] z-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(255,59,154,0.12),rgba(255,138,76,0.06),transparent)] dark:bg-[radial-gradient(ellipse_85%_60%_at_50%_-10%,rgba(255,59,154,0.22),rgba(139,61,255,0.14),transparent)]"
      />

      {/* 0. Top Thin Scroll Progress Bar */}
      <ScrollProgress />

      {/* 1. Sticky Header with Novandi's brand logo, Theme Toggle & Language Switcher */}
      <header className="sticky top-0 z-50 backdrop-blur-[18px] bg-[#fff9f6]/80 dark:bg-[#0b0614]/80 border-b border-[#f0d8e6] dark:border-[#2d1d47] transition-colors duration-200">
        <nav className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 h-[72px] flex items-center justify-between select-none">
          <a
            href="/"
            className="font-hegarty text-[30px] sm:text-[32px] text-[#1a1026] dark:text-[#fdf7ff] stroke-title no-underline hover:opacity-85 transition-opacity flex items-center gap-2"
            aria-label={t.nav.homeAria}
          >
            <span>novan.arm</span>
          </a>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Interactive Theme Toggle Button */}
            <ThemeToggle />

            {/* Interactive Language Switcher Toggle */}
            <div
              className="relative grid grid-cols-2 p-1 bg-[#fff1f8] dark:bg-[#160f26] rounded-full border border-[#f0d8e6] dark:border-[#2f1f4d] text-xs font-space transition-colors select-none"
              role="group"
              aria-label={t.nav.langSwitchAria}
            >
              {/* Sliding indicator pill: uses pure relative X transform, completely immune to sticky header scroll offset */}
              <motion.span
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-gradient-to-r from-[#ff3b9a] to-[#ff8a4c] rounded-full shadow-xs pointer-events-none"
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
                      ? 'text-white'
                      : 'text-[#7b648f] dark:text-[#b4a0ce] hover:text-[#1a1026] dark:hover:text-white'
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
      <main className="relative z-10 max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-20 space-y-12 sm:space-y-16">
        
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
          <div className="flex items-end gap-9 border-b border-[#f0d8e6] dark:border-[#2f1f4d] overflow-x-auto select-none transition-colors">
            {(['works', 'experience', 'education'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative font-hegarty text-2xl pb-3.5 transition-colors cursor-pointer leading-none capitalize ${
                  activeTab === tab
                    ? 'text-[#1a1026] dark:text-[#fdf7ff]'
                    : 'text-[#7b648f] dark:text-[#9c89b8] hover:text-[#ff3b9a] dark:hover:text-[#ff78bc]'
                }`}
              >
                {t.tabs[tab]}
                {activeTab === tab && (
                  <motion.span
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ff3b9a] via-[#ff8a4c] to-[#00d9ff]"
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

        {/* ── INTERACTIVE VICE STACK LOADOUT WHEEL ── */}
        <RevealOnScroll distance={24} delay={50}>
          <section aria-label={t.techLoadout.ariaLabel}>
            <ViceLoadoutCard />
          </section>
        </RevealOnScroll>

        {/* ── GIANT BRAND WORDMARK FOOTER TYPOGRAPHY ── */}
        <RevealOnScroll distance={20} delay={60} duration={750}>
          <section className="pt-2 pb-3 select-none flex justify-center overflow-hidden">
            <p className="novan-glossy-wordmark font-hegarty text-[clamp(64px,18vw,165px)] text-center leading-[0.9] tracking-[-0.04em] whitespace-nowrap m-0 flex justify-center">
              {'novan'.split('').map((char, cIdx) => (
                <motion.span
                  key={cIdx}
                  style={{ '--char-index': cIdx } as React.CSSProperties}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 22, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: cIdx * 0.06,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  whileHover={{
                    scale: 1.05,
                    color: '#ff3b9a',
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="novan-glossy-char inline-block cursor-default"
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </section>
        </RevealOnScroll>

      </main>

      {/* ── DARK FOOTER BAR ── */}
      <footer className="relative z-10 w-full bg-[#140b24] dark:bg-[#07040e] border-t border-[#ff3b9a]/25 text-[#fdf7ff] py-8 sm:h-[135px] select-none flex items-center transition-colors">
        <div className="max-w-[1180px] w-full mx-auto px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-hegarty text-sm sm:text-[0.95rem] text-[#fdf7ff] flex items-center gap-4 m-0">
            <span>@novandi ahmad ramdhan</span>
            <span aria-hidden="true" className="text-[#ff3b9a]">•</span>
            <span>{t.footer.rights}</span>
          </p>

          <nav className="flex items-center gap-6 font-hegarty text-base sm:text-[1.15rem]" aria-label={t.footer.navAria}>
            <motion.a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#c084fc] hover:underline no-underline inline-block transition-transform"
            >
              github
            </motion.a>
            <motion.a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#22d3ee] hover:underline no-underline inline-block transition-transform"
            >
              linkedin
            </motion.a>
            <motion.a
              href={profile.instagramUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#ff4da6] hover:underline no-underline inline-block transition-transform"
            >
              instagram
            </motion.a>
            <motion.a
              href={getMailtoUrl(profile.email)}
              onClick={(e) => handleSmartEmailClick(e, profile.email)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#ffb35c] hover:underline no-underline inline-block transition-transform"
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
