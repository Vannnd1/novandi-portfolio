import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { Spotlight } from '../Spotlight';
import { TiltCard } from '../TiltCard';
import { Magnetic } from '../MagneticButton';
import { SocialPill } from '../SocialPill';
import { GitHubIcon, InstagramIcon } from '../Icons';

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

          {/* Narrative Bio Paragraph with Integrated Verified Social Channels */}
          <motion.p variants={heroItemVariants} className="font-space text-base sm:text-lg text-[#262626] font-normal leading-[1.8] m-0">
            {t.hero.leadBefore}{' '}
            <span className="text-[#737373]">{t.hero.leadMuted}</span>{' '}
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
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#101010] hover:bg-[#202020] text-white font-hegarty text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-lg shadow-black/15 hover:shadow-[#fd4aa6]/25 hover:shadow-xl active:scale-95 group"
              >
                <span>{t.hero.exploreWorks}</span>
                <ArrowDown className="w-4 h-4 text-[#fd4aa6] transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href="#contact-card"
                onClick={onContactClick}
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
                    <div className="text-[9.5px] font-normal text-[#666]">Universitas Gunadarma</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </Spotlight>
  );
};
