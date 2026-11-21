import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, GitBranch, ZoomIn } from 'lucide-react';
import type { ProjectItem } from '../../data/projects';
import { useLanguage } from '../../context/useLanguage';
import { RevealOnScroll } from '../RevealOnScroll';
import { TiltCard } from '../TiltCard';
import { Magnetic } from '../MagneticButton';
import { TechPill } from '../TechPill';
import { ProjectMockup } from '../ProjectMockup';
import { ImageLightbox, type LightboxImage } from '../ImageLightbox';

interface ProjectShowcaseProps {
  projects: ProjectItem[];
  onSelectProject: (id: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  onSelectProject,
}) => {
  const { language, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const cryptoScreenshots: LightboxImage[] = [
    {
      src: '/projects/crypto-main-menu.png',
      alt: language === 'id' ? 'Halaman Utama Enkripsi Citra Digital Berbasis Chaos (.exe)' : 'Main Menu Chaos Image Encryption (.exe)',
      title: language === 'id' ? '01 · Halaman Utama (Main Menu & Pemilihan Algoritma Chaos)' : '01 · Main Menu (Chaos Algorithm Selection & Setup)',
      subtitle: language === 'id' ? 'Antarmuka GUI Tkinter untuk pemilihan algoritma chaos, inisialisasi kunci rahasia & pengujian NIST' : 'Tkinter GUI for chaotic algorithm selection, seed initialization & NIST SP 800-22 testing',
      badge: '01 / 03 · Main Menu',
    },
    {
      src: '/projects/crypto-encrypt.jpg',
      alt: language === 'id' ? 'Modul Enkripsi Citra Digital (.exe)' : 'Image Encryption Module (.exe)',
      title: language === 'id' ? '02 · Modul Enkripsi Citra Medis (Gauss-MS Map · Latensi 18 ms)' : '02 · Medical Image Encryption Module (Gauss-MS Map · 18 ms)',
      subtitle: language === 'id' ? 'Pengacakan piksel citra medis resolusi tinggi secara bitwise XOR dengan latensi 18 ms dan entropi 7.998' : 'High-speed bitwise XOR medical image scrambling with 18 ms latency and 7.998 Shannon entropy',
      badge: '02 / 03 · Enkripsi',
    },
    {
      src: '/projects/crypto-decrypt.jpg',
      alt: language === 'id' ? 'Modul Dekripsi Citra Digital (.exe)' : 'Image Decryption Module (.exe)',
      title: language === 'id' ? '03 · Modul Dekripsi & Restorasi Citra Lossless (100% Sempurna)' : '03 · Decryption & 100% Lossless Restoration Module',
      subtitle: language === 'id' ? 'Pemulihan citra medis 100% utuh tanpa cacat piksel dengan parameter kunci chaos yang sama' : 'Exact 100% pixel restoration preserving full diagnostic clarity using identical chaos parameters',
      badge: '03 / 03 · Dekripsi',
    },
  ];

  return (
    <motion.div
      key="works"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] as const }}
      className="space-y-8 sm:space-y-10"
    >
      {projects.map((project, idx) => (
        <RevealOnScroll key={project.id} delay={idx * 50} distance={24}>
          <article className="group group/card relative rounded-3xl border border-[#e8e8e8] bg-[#fbfbfb] hover:bg-white p-6 sm:p-8 md:p-10 lg:p-11 xl:p-12 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Subtle top corner gradient accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#fd4aa6]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
              {/* Left Column (Metadata, Title, Clean Summary, Tech Stack, Actions) */}
              <div className="w-full lg:col-span-6 space-y-4 text-left flex flex-col justify-between">
                <div className="space-y-3.5">
                  {/* Header tags: Category & Year */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eaeaea] pb-2.5">
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
                    onClick={() => onSelectProject(project.id)}
                    className="text-left group/title cursor-pointer block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#fd4aa6] rounded-md"
                  >
                    <h3 className="font-hegarty text-2xl sm:text-3xl lg:text-[2.15rem] text-[#101010] leading-[1.08] m-0 group-hover/title:text-[#fd4aa6] transition-colors">
                      {project.title}
                    </h3>
                  </button>

                  {/* Summary: What was done, output, and impact (Simple, direct, uncluttered) */}
                  <p className="font-space font-normal text-sm sm:text-base text-[#4b5563] leading-[1.65] max-w-[640px] m-0">
                    {project.summary}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5" role="group" aria-label={t.works.techStackAria}>
                    {project.techStack.map((tech) => (
                      <TechPill key={tech} name={tech} size="sm" />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Magnetic strength={0.2}>
                    <button
                      type="button"
                      onClick={() => onSelectProject(project.id)}
                      className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-[#101010] hover:bg-[#fd4aa6] text-white px-4 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-sm hover:shadow-md hover:shadow-[#fd4aa6]/25 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
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
                        className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-white hover:bg-black hover:text-white border border-[#d4d4d8] text-[#27272a] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
                        title={t.works.liveDemo}
                      >
                        <span>{t.works.liveDemo}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </Magnetic>
                  )}

                  {project.githubUrl && (
                    <Magnetic strength={0.2}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-white hover:bg-black hover:text-white border border-[#d4d4d8] text-[#27272a] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
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

              {/* Right Column: Visual Mockup Viewport */}
              <div className="w-full lg:col-span-6 flex items-center justify-center">
                <TiltCard maxTilt={3} scale={1.01} className="w-full">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectProject(project.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProject(project.id);
                      }
                    }}
                    aria-label={`${t.works.viewCaseStudy}: ${project.title}`}
                    className="group/window w-full block text-left cursor-pointer rounded-2xl bg-white border border-[#e5e7eb] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] hover:border-[#d4d4d8] overflow-hidden transition-all duration-300 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#fd4aa6]"
                  >
                    {/* Clean Minimalist Window Titlebar */}
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#fbfbfb] border-b border-[#f0f0f0] select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
                      </div>

                      {project.demoUrl ? (
                        <span className="text-[10px] font-mono text-[#9ca3af] truncate max-w-[200px] sm:max-w-[260px]">
                          {project.demoUrl.replace(/^https?:\/\//, '')}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#a1a1aa]">
                          {project.id === 'chaotic-image-encryption' ? 'chaotic_crypto_system.exe' : project.id}
                        </span>
                      )}

                      <div className="flex items-center gap-1 text-[10px] font-space text-[#9ca3af] group-hover/window:text-black transition-colors">
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Viewport Content */}
                    <div className="w-full">
                      <ProjectMockup projectId={project.id} />
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* Crypto Project Hover Overlay (Reveals 3 workflow screens stacked vertically on card hover) */}
            {project.id === 'chaotic-image-encryption' && (
              <div
                className="absolute inset-0 z-30 bg-white/98 backdrop-blur-md p-5 sm:p-7 md:p-8 rounded-3xl border border-neutral-200/90 shadow-2xl opacity-0 pointer-events-none group-hover/card:opacity-100 group-hover/card:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto transition-all duration-300 overflow-y-auto flex flex-col justify-start"
              >
                {/* Sticky Header Bar */}
                <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md pb-3.5 pt-0.5 border-b border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fd4aa6] animate-pulse" />
                    <div>
                      <h4 className="font-hegarty text-base sm:text-lg text-[#101010] m-0">
                        {language === 'id'
                          ? 'Alur Aplikasi Desktop Windows (.exe)'
                          : 'Windows Desktop Application Flow (.exe)'}
                      </h4>
                      <p className="text-[11px] font-mono text-neutral-500 m-0">
                        {language === 'id'
                          ? '01 Halaman Utama → 02 Modul Enkripsi → 03 Modul Dekripsi'
                          : '01 Main Menu → 02 Encryption Module → 03 Decryption Module'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project.id)}
                      className="inline-flex items-center gap-1.5 font-hegarty text-xs bg-[#101010] hover:bg-[#fd4aa6] text-white px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
                    >
                      <span>{t.works.viewCaseStudy}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-hegarty text-xs bg-white hover:bg-black hover:text-white border border-[#d4d4d8] text-[#27272a] px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
                      >
                        <GitBranch className="w-3 h-3" />
                        <span>github</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 3 Images Stacked Vertically Downwards */}
                <div className="space-y-4 pt-4 max-w-4xl mx-auto w-full">
                  {/* Screen 1: Halaman Utama */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setLightboxIndex(0);
                      setLightboxOpen(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxIndex(0);
                        setLightboxOpen(true);
                      }
                    }}
                    className="group/img block rounded-xl border border-neutral-200 overflow-hidden bg-neutral-900 shadow-xs hover:border-[#fd4aa6]/60 transition-all cursor-zoom-in text-left"
                    title={language === 'id' ? 'Klik untuk melihat screenshot layar penuh' : 'Click to view full screenshot'}
                  >
                    <div className="px-3.5 py-2 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-700">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-semibold text-neutral-900">
                          {language === 'id'
                            ? '01 · Halaman Utama (Main Menu & Pemilihan Algoritma Chaos)'
                            : '01 · Main Menu (Chaos Algorithm Selection & Setup)'}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">chaotic_crypto_system.exe</span>
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden bg-black/90">
                      <img
                        src="/projects/crypto-main-menu.png"
                        alt={language === 'id' ? 'Halaman Utama Enkripsi Citra Digital Berbasis Chaos (.exe)' : 'Main Menu Chaos Image Encryption (.exe)'}
                        className="w-full h-full object-cover group-hover/img:scale-[1.01] transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Zoom hint badge on hover */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-mono border border-white/20 shadow-lg">
                          <ZoomIn className="w-3.5 h-3.5 text-[#fd4aa6]" />
                          <span>{language === 'id' ? 'Klik untuk memperbesar screenshot' : 'Click to enlarge screenshot'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Screen 2: Modul Enkripsi */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setLightboxIndex(1);
                      setLightboxOpen(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxIndex(1);
                        setLightboxOpen(true);
                      }
                    }}
                    className="group/img block rounded-xl border border-neutral-200 overflow-hidden bg-neutral-900 shadow-xs hover:border-[#fd4aa6]/60 transition-all cursor-zoom-in text-left"
                    title={language === 'id' ? 'Klik untuk melihat screenshot layar penuh' : 'Click to view full screenshot'}
                  >
                    <div className="px-3.5 py-2 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-700">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#fd4aa6]" />
                        <span className="font-semibold text-neutral-900">
                          {language === 'id'
                            ? '02 · Modul Enkripsi Citra Medis (Gauss-MS Map · Latensi 18 ms)'
                            : '02 · Medical Image Encryption Module (Gauss-MS Map · 18 ms)'}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {language === 'id' ? 'Enkripsi Citra Digital' : 'Image Encryption'}
                      </span>
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden bg-black/90">
                      <img
                        src="/projects/crypto-encrypt.jpg"
                        alt={language === 'id' ? 'Modul Enkripsi Citra Digital (.exe)' : 'Image Encryption Module (.exe)'}
                        className="w-full h-full object-cover group-hover/img:scale-[1.01] transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Zoom hint badge on hover */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-mono border border-white/20 shadow-lg">
                          <ZoomIn className="w-3.5 h-3.5 text-[#fd4aa6]" />
                          <span>{language === 'id' ? 'Klik untuk memperbesar screenshot' : 'Click to enlarge screenshot'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Screen 3: Modul Dekripsi */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setLightboxIndex(2);
                      setLightboxOpen(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxIndex(2);
                        setLightboxOpen(true);
                      }
                    }}
                    className="group/img block rounded-xl border border-neutral-200 overflow-hidden bg-neutral-900 shadow-xs hover:border-[#fd4aa6]/60 transition-all cursor-zoom-in text-left"
                    title={language === 'id' ? 'Klik untuk melihat screenshot layar penuh' : 'Click to view full screenshot'}
                  >
                    <div className="px-3.5 py-2 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-700">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-semibold text-neutral-900">
                          {language === 'id'
                            ? '03 · Modul Dekripsi & Restorasi Citra Lossless (100% Sempurna)'
                            : '03 · Decryption & 100% Lossless Restoration Module'}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {language === 'id' ? 'Dekripsi Citra Digital' : 'Image Decryption'}
                      </span>
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden bg-black/90">
                      <img
                        src="/projects/crypto-decrypt.jpg"
                        alt={language === 'id' ? 'Modul Dekripsi Citra Digital (.exe)' : 'Image Decryption Module (.exe)'}
                        className="w-full h-full object-cover group-hover/img:scale-[1.01] transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Zoom hint badge on hover */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-mono border border-white/20 shadow-lg">
                          <ZoomIn className="w-3.5 h-3.5 text-[#fd4aa6]" />
                          <span>{language === 'id' ? 'Klik untuk memperbesar screenshot' : 'Click to enlarge screenshot'}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>
        </RevealOnScroll>
      ))}

      {/* Fullscreen Screenshot Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        images={cryptoScreenshots}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        onViewCaseStudy={() => onSelectProject('chaotic-image-encryption')}
        caseStudyLabel={t.works.viewCaseStudy}
        hintLabel={
          language === 'id'
            ? 'Gunakan tombol panah ← → untuk navigasi · Esc untuk menutup'
            : 'Use arrow keys ← → to navigate · Esc to close'
        }
      />
    </motion.div>
  );
};
