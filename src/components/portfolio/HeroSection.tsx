import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { Spotlight } from '../Spotlight';
import { TiltCard } from '../TiltCard';
import { Magnetic } from '../MagneticButton';
import { SocialPill } from '../SocialPill';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from '../Icons';
import { getMailtoUrl, handleSmartEmailClick } from '../../utils/email';

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
    <Spotlight
      className="rounded-3xl border border-[#f0d8e6] dark:border-[#332152] bg-gradient-to-br from-[#ffffff] via-[#fff5fa] to-[#fff3eb] dark:from-[#160d26] dark:via-[#1b1030] dark:to-[#120b20] p-6 sm:p-10 lg:p-12 xl:p-14 shadow-[0_6px_32px_rgba(168,85,247,0.06)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-colors"
      spotlightColor="rgba(255, 59, 154, 0.16)"
      size={800}
    >
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
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff3b9a]/10 dark:bg-white/[0.06] border border-[#ff3b9a]/25 dark:border-[#a855f7]/35 font-space text-xs font-semibold text-[#3c1e52] dark:text-[#f5ecff] tracking-wide transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#ff3b9a]" />
              <span>{t.hero.discipline}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/45 text-cyan-800 dark:text-cyan-300 border border-cyan-300/70 dark:border-cyan-500/35 font-space text-xs font-semibold transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d9ff]" />
              <span>{t.hero.statusAvailable}</span>
            </span>
          </motion.div>

          {/* Main Headline with Oversized Editorial Typography */}
          <motion.div variants={heroItemVariants} className="space-y-1">
            <p className="font-hegarty text-3xl sm:text-4xl text-[#7b648f] dark:text-[#b4a0ce] stroke-title m-0 transition-colors">
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

        {/* Right Column: Prominent 3D Tilt Portrait Card */}
        <motion.div variants={heroPhotoVariants} className="shrink-0 relative group">
          <TiltCard maxTilt={8} scale={1.03}>
            <div className="relative">
              {/* Subtle Vice Sunset Glow Ring behind portrait */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#ff3b9a]/45 via-[#ff8a4c]/30 to-[#00d9ff]/45 rounded-[28px] sm:rounded-[36px] blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main Portrait Frame */}
              <div className="relative w-52 h-68 sm:w-64 sm:h-80 lg:w-72 lg:h-92 xl:w-80 xl:h-100 rounded-2xl sm:rounded-3xl overflow-hidden border-[4px] border-white dark:border-[#2f1f4d] shadow-[0_20px_45px_rgba(139,61,255,0.18)] ring-1 ring-[#ff3b9a]/15 dark:ring-white/10 bg-[#fff4fa] dark:bg-[#160d26] transition-colors">
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Bottom Floating Identity Chip */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-white/95 dark:bg-[#140d22]/92 backdrop-blur-md border border-[#f0d8e6] dark:border-[#382659] shadow-sm flex items-center justify-between transition-colors">
                  <div className="font-space text-xs font-bold text-[#1a1026] dark:text-[#fdf7ff] leading-tight">
                    <div>{profile.location}</div>
                    <div className="text-[10px] font-normal text-[#7b648f] dark:text-[#b4a0ce]">Universitas Gunadarma</div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </Spotlight>
  );
};
