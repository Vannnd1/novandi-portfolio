import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/useLanguage';
import { ScrollProgress } from './ScrollProgress';
import { HeroSection } from './portfolio/HeroSection';
import { TechnicalMetrics } from './portfolio/TechnicalMetrics';
import { ProjectShowcase } from './portfolio/ProjectShowcase';
import { TimelineSection } from './portfolio/TimelineSection';
import { GithubHeatmap } from './GithubHeatmap';
import { StickerCard } from './StickerCard';
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

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
        <HeroSection
          onExploreWorks={handleExploreWorks}
          onContactClick={handleContactClick}
        />

        {/* ── TECHNICAL CREDIBILITY STRIP ── */}
        <TechnicalMetrics />

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
