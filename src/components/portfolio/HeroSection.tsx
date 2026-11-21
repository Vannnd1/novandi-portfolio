import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { Spotlight } from '../Spotlight';
import { TiltCard } from '../TiltCard';
import { Magnetic } from '../MagneticButton';
import { SocialPill } from '../SocialPill';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from '../Icons';

interface HeroSectionProps {
  onExploreWorks: () => void;
  onContactClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
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
  onContactClick,
}) => {
  const { profile, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <Spotlight
      className="rounded-3xl border border-[#101010]/8 dark:border-white/10 bg-gradient-to-b from-[#fdfdfd] via-[#f9f9fa] to-white dark:from-[#121215] dark:via-[#16161a] dark:to-[#121215] p-6 sm:p-10 lg:p-12 xl:p-14 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-colors"
      spotlightColor="rgba(253, 74, 166, 0.12)"
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
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/15 font-space text-xs font-semibold text-[#18181b] dark:text-[#f4f4f5] tracking-wide transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#fd4aa6]" />
              <span>{t.hero.discipline}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 font-space text-xs font-semibold transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{t.hero.statusAvailable}</span>
            </span>
          </motion.div>

          {/* Main Headline with Oversized Editorial Typography */}
          <motion.div variants={heroItemVariants} className="space-y-1">
            <p className="font-hegarty text-3xl sm:text-4xl text-[#767676] dark:text-[#a1a1aa] stroke-title m-0 transition-colors">
              {t.hero.helloIm}
            </p>
            <h1 className="font-hegarty text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] text-[#101010] dark:text-white stroke-title m-0 tracking-tight leading-[1.04] transition-colors">
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

          {/* Narrative Bio Paragraph with Integrated Verified Social Channels */}
          <motion.p variants={heroItemVariants} className="font-space text-base sm:text-lg text-[#262626] dark:text-[#d4d4d8] font-normal leading-[1.8] max-w-[720px] m-0 transition-colors">
            {t.hero.leadBefore}{' '}
            <span className="text-[#737373] dark:text-[#a1a1aa]">{t.hero.leadMuted}</span>{' '}
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
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#101010] dark:bg-white hover:bg-[#202020] hover:dark:bg-[#fd4aa6] text-white dark:text-black hover:dark:text-white font-hegarty text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-lg shadow-black/15 hover:shadow-[#fd4aa6]/25 hover:shadow-xl active:scale-95 group"
              >
                <span>{t.hero.exploreWorks}</span>
                <ArrowDown className="w-4 h-4 text-[#fd4aa6] dark:text-[#fd4aa6] group-hover:dark:text-white transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href="#contact-card"
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#18181b] hover:bg-[#fafafa] hover:dark:bg-[#27272a] border border-[#101010]/20 dark:border-white/15 text-[#101010] dark:text-white font-hegarty text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              >
                <span>{t.hero.contactMe}</span>
                <ArrowUpRight className="w-4 h-4 text-[#767676] dark:text-[#a1a1aa]" />
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
              <div className="relative w-52 h-68 sm:w-64 sm:h-80 lg:w-72 lg:h-92 xl:w-80 xl:h-100 rounded-2xl sm:rounded-3xl overflow-hidden border-[4px] border-white dark:border-[#27272a] shadow-[0_20px_45px_rgba(0,0,0,0.15)] ring-1 ring-black/10 dark:ring-white/10 bg-[#f4f4f5] dark:bg-[#18181b] transition-colors">
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Bottom Floating Identity Chip */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-md border border-white/60 dark:border-white/15 shadow-sm flex items-center justify-between transition-colors">
                  <div className="font-space text-xs font-bold text-[#101010] dark:text-white leading-tight">
                    <div>{profile.location}</div>
                    <div className="text-[10px] font-normal text-[#666] dark:text-[#a1a1aa]">Universitas Gunadarma</div>
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
