import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { TiltCard } from '../TiltCard';
import { Magnetic } from '../MagneticButton';
import { SocialPill } from '../SocialPill';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from '../Icons';
import { getMailtoUrl, handleSmartEmailClick } from '../../utils/email';
import { ViceAmbientBackdrop } from '../ViceAmbientBackdrop';
import { ViceCornerBrackets, ViceHorizonSilhouette } from '../ViceFrameAccents';

interface HeroSectionProps {
  onExploreWorks: () => void;
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants = {
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

const heroPhotoVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWorks,
}) => {
  const { profile, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative rounded-3xl border border-[#f0d8e6] dark:border-[#37235c] bg-[#fff9fc] dark:bg-[#130b22] bg-vice-scanlines shadow-[0_6px_32px_rgba(168,85,247,0.06)] dark:shadow-[0_14px_48px_rgba(0,0,0,0.55)] overflow-hidden transition-colors">
      {/* Top Vice Sunset Art Deco Trim */}
      <div
        aria-hidden="true"
        className="relative z-20 h-[2.5px] w-full bg-gradient-to-r from-[#00d9ff] via-[#ff3b9a] to-[#ffb35c]"
      />

      {/* Interactive Vice Ambient Glow inside Profile Card */}
      <ViceAmbientBackdrop />

      {/* Subtle Ocean Drive Skyline & Palm Horizon along bottom background */}
      <ViceHorizonSilhouette className="absolute inset-x-0 bottom-0 h-44 sm:h-56 z-0 opacity-65 dark:opacity-95" />

      {/* Architectural Vice Telemetry Corner Brackets */}
      <ViceCornerBrackets size="md" />

      <div className="relative z-10 p-6 sm:p-10 lg:p-12 xl:p-14">
      <motion.div
        variants={heroContainerVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="visible"
        className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
      >
        {/* Left Column: Discipline Pill, Editorial Headline, Bio, and Magnetic CTAs */}
        <div className="flex-1 space-y-6 text-left w-full">
          {/* Technical Status & Availability Badges */}
          <motion.div variants={heroItemVariants} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff3b9a]/10 dark:bg-[#1b1132]/85 border border-[#ff3b9a]/25 dark:border-[#a855f7]/40 font-space text-xs font-semibold text-[#3c1e52] dark:text-[#f5ecff] tracking-wide backdrop-blur-xs transition-colors">
              <span className="font-mono text-[10px] font-bold text-[#ff3b9a]">01 //</span>
              <span>{t.hero.discipline}</span>
            </span>

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50/90 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-200 border border-cyan-300/75 dark:border-[#00d9ff]/40 font-space text-xs font-semibold backdrop-blur-xs transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#00d9ff] shadow-[0_0_8px_rgba(0,217,255,0.85)] animate-pulse-slow" />
              <span>{t.hero.statusAvailable}</span>
            </span>
          </motion.div>

          {/* Main Headline with Oversized Editorial Typography + Vice Sunset Kicker */}
          <motion.div variants={heroItemVariants} className="space-y-1.5">
            <p className="font-hegarty text-2xl sm:text-3xl vice-sunset-text m-0 inline-block tracking-wide">
              {t.hero.helloIm}
            </p>
            <h1 className="font-hegarty text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] text-[#1a1026] dark:text-[#fdf7ff] stroke-title m-0 tracking-tight leading-[1.04] transition-colors">
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
                  className="inline-block mr-3 hover:text-[#ff3b9a] transition-colors cursor-default"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Narrative Bio Paragraph with Integrated Verified Social Channels */}
          <motion.p variants={heroItemVariants} className="font-space text-base sm:text-lg text-[#2c1e3d] dark:text-[#e2d4f0] font-normal leading-[1.8] max-w-[720px] m-0 transition-colors">
            {t.hero.leadBefore}{' '}
            <span className="text-[#7b648f] dark:text-[#a894c4]">{t.hero.leadMuted}</span>{' '}
            {t.hero.leadShare}{' '}
            <SocialPill
              href={profile.instagramUrl}
              icon={<InstagramIcon className="w-3.5 h-3.5" />}
              label="instagram"
              variant="instagram"
              tilt={-1.2}
            />{' '}
            {t.hero.and}{' '}
            <SocialPill
              href={profile.linkedinUrl}
              icon={<LinkedInIcon className="w-3.5 h-3.5" />}
              label="linkedin"
              variant="linkedin"
              tilt={1.2}
            />
            {t.hero.leadKeep}{' '}
            <SocialPill
              href={profile.githubUrl}
              icon={<GitHubIcon className="w-3.5 h-3.5" />}
              label="github"
              variant="github"
              tilt={1.8}
            />
            .
          </motion.p>

          {/* Primary Call-to-Actions with Magnetic Physics */}
          <motion.div variants={heroItemVariants} className="pt-2 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={onExploreWorks}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff3b9a] to-[#ff8a4c] hover:brightness-110 text-white font-hegarty text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-lg shadow-[#ff3b9a]/25 hover:shadow-[#ff3b9a]/40 hover:shadow-xl active:scale-95 group"
              >
                <span>{t.hero.exploreWorks}</span>
                <ArrowDown className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href={getMailtoUrl(profile.email)}
                onClick={(e) => handleSmartEmailClick(e, profile.email)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#1b122e] hover:bg-[#fff4fa] hover:dark:bg-[#261940] border border-[#e7cbe0] dark:border-[#3a265c] hover:border-[#ff3b9a]/50 dark:hover:border-[#ff3b9a]/50 text-[#1a1026] dark:text-[#fdf7ff] font-hegarty text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              >
                <span>{t.hero.contactMe}</span>
                <ArrowUpRight className="w-4 h-4 text-[#7b648f] dark:text-[#b4a0ce]" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Column: Prominent 3D Tilt Portrait Card (Vice Dossier Frame) */}
        <motion.div variants={heroPhotoVariants} className="shrink-0 relative group">
          <TiltCard maxTilt={8} scale={1.03}>
            <div className="relative">
              {/* Dual-Tone Vice Sunset Halo Ring behind portrait */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#ff3b9a]/55 via-[#ff8a4c]/35 to-[#00d9ff]/55 rounded-[28px] sm:rounded-[36px] blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main Portrait Frame */}
              <div className="relative w-52 h-68 sm:w-64 sm:h-80 lg:w-72 lg:h-92 xl:w-80 xl:h-100 rounded-2xl sm:rounded-3xl overflow-hidden border-[2px] border-[#f0d8e6] dark:border-[#00d9ff]/40 shadow-[0_20px_48px_rgba(139,61,255,0.22)] ring-1 ring-[#ff3b9a]/25 dark:ring-[#ff3b9a]/35 bg-[#fff4fa] dark:bg-[#140b24] transition-colors">
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover object-top saturate-[0.9] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Edge-only Dusk Vignette: softens the photo backdrop perimeter into Vice Night without tinting the face */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_46%,rgba(26,16,38,0.34)_84%,rgba(19,11,34,0.68)_100%)] dark:bg-[radial-gradient(ellipse_at_50%_38%,transparent_45%,rgba(19,11,34,0.52)_82%,rgba(11,6,20,0.86)_100%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#130b22]/85 via-[#130b22]/25 to-transparent"
                />

                {/* Miniature HUD Frame Reticles */}
                <ViceCornerBrackets size="sm" className="opacity-90" />

                {/* Top HUD Profile Index Tag */}
                <div className="pointer-events-none absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#140b24]/78 backdrop-blur-md border border-[#00d9ff]/35 font-mono text-[9.5px] font-bold tracking-widest text-[#00d9ff] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b9a]" />
                    <span>ID // SE-26</span>
                  </span>
                </div>

                {/* Bottom Floating Vice Identity Dossier Chip */}
                <div className="absolute bottom-3 left-3 right-3 z-20 p-2.5 sm:p-3 rounded-xl bg-white/94 dark:bg-[#120a20]/90 backdrop-blur-md border border-[#f0d8e6] dark:border-[#3b2563] shadow-sm overflow-hidden transition-colors">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-[#00d9ff]/80 via-[#ff3b9a] to-[#ffb35c]/80"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-space text-xs font-bold text-[#1a1026] dark:text-[#fdf7ff] leading-tight">
                      <div>{profile.location}</div>
                      <div className="text-[10px] font-normal text-[#6d5680] dark:text-[#b4a0ce]">
                        Universitas Gunadarma
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00d9ff]/12 border border-[#00d9ff]/30 font-mono text-[9px] font-bold text-[#0284c7] dark:text-[#00d9ff] uppercase"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00d9ff]" />
                      <span>IDN</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
};
