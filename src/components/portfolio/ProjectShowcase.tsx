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
          <article className="group relative rounded-3xl border border-[#e8e8e8] dark:border-[#27272a] bg-[#fbfbfb] dark:bg-[#121215] hover:bg-white hover:dark:bg-[#16161a] p-6 sm:p-8 md:p-10 lg:p-11 xl:p-12 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] dark:hover:border-[#3f3f46] overflow-hidden">
            {/* Subtle top corner gradient accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#fd4aa6]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
              {/* Left Column (Metadata, Title, Clean Summary, Tech Stack, Actions) */}
              <div className="w-full lg:col-span-6 space-y-4 text-left flex flex-col justify-between">
                <div className="space-y-3.5">
                  {/* Header tags: Category & Year */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eaeaea] dark:border-[#27272a] pb-2.5 transition-colors">
                    <span className="font-space text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-[#18181b] text-[#fd4aa6] border border-[#fd4aa6]/30 uppercase tracking-wider shadow-2xs">
                      {project.categoryLabel}
                    </span>
                    <span className="font-dm-sans italic font-bold text-base text-[#3d3d3d] dark:text-[#a1a1aa]">
                      {project.year}
                    </span>
                  </div>

                  {/* Project Title */}
                  <button
                    type="button"
                    onClick={() => onSelectProject(project.id)}
                    className="text-left group/title cursor-pointer block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#fd4aa6] rounded-md"
                  >
                    <h3 className="font-hegarty text-2xl sm:text-3xl lg:text-[2.15rem] text-[#101010] dark:text-white leading-[1.08] m-0 group-hover/title:text-[#fd4aa6] transition-colors">
                      {project.title}
                    </h3>
                  </button>

                  {/* Summary: What was done, output, and impact (Simple, direct, uncluttered) */}
                  <p className="font-space font-normal text-sm sm:text-base text-[#4b5563] dark:text-[#a1a1aa] leading-[1.65] max-w-[640px] m-0 transition-colors">
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
                      className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-[#101010] dark:bg-white hover:bg-[#fd4aa6] hover:dark:bg-[#fd4aa6] text-white dark:text-black hover:dark:text-white px-4 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-sm hover:shadow-md hover:shadow-[#fd4aa6]/25 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
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
                        className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-white dark:bg-[#18181b] hover:bg-black hover:dark:bg-white text-[#27272a] dark:text-[#e4e4e7] hover:text-white hover:dark:text-black border border-[#d4d4d8] dark:border-[#3f3f46] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
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
                        className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-white dark:bg-[#18181b] hover:bg-black hover:dark:bg-white text-[#27272a] dark:text-[#e4e4e7] hover:text-white hover:dark:text-black border border-[#d4d4d8] dark:border-[#3f3f46] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
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
              <div className="w-full lg:col-span-6 flex items-center justify-center relative group/imageArea">
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
                    className="group/window relative w-full block text-left cursor-pointer rounded-2xl bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#27272a] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:border-[#d4d4d8] dark:hover:border-[#3f3f46] overflow-hidden transition-all duration-300 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#fd4aa6]"
                  >
                    {/* Clean Minimalist Window Titlebar */}
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#fbfbfb] dark:bg-[#151518] border-b border-[#f0f0f0] dark:border-[#27272a] select-none transition-colors">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5] dark:bg-[#3f3f46]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5] dark:bg-[#3f3f46]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5] dark:bg-[#3f3f46]" />
                      </div>

                      {project.demoUrl ? (
                        <span className="text-[10px] font-mono text-[#9ca3af] dark:text-[#71717a] truncate max-w-[200px] sm:max-w-[260px]">
                          {project.demoUrl.replace(/^https?:\/\//, '')}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#a1a1aa] dark:text-[#71717a]">
                          {project.id === 'chaotic-image-encryption' ? 'chaotic_crypto_system.exe' : project.id}
                        </span>
                      )}

                      <div className="flex items-center gap-1 text-[10px] font-space text-[#9ca3af] dark:text-[#a1a1aa] group-hover/window:text-black group-hover/window:dark:text-white transition-colors">
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Viewport Content */}
                    <div className="w-full">
                      <ProjectMockup projectId={project.id} />
                    </div>

                    {/* Crypto Project Hover Overlay: TRIGGERS ONLY WHEN HOVERING THIS IMAGE WINDOW! */}
                    {project.id === 'chaotic-image-encryption' && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-0 z-20 bg-white/98 dark:bg-[#09090b]/98 backdrop-blur-md p-3 sm:p-3.5 flex flex-col justify-between opacity-0 pointer-events-none group-hover/imageArea:opacity-100 group-hover/imageArea:pointer-events-auto transition-opacity duration-250 select-none overflow-hidden"
                      >
                        {/* Header: Desktop App Context */}
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80 dark:border-neutral-800 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#fd4aa6] animate-pulse" />
                            <span className="font-hegarty text-xs text-[#101010] dark:text-white">
                              {language === 'id' ? 'Alur Aplikasi Windows (.exe)' : 'Windows App Flow (.exe)'}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#fd4aa6] font-medium">
                            {language === 'id' ? 'Klik gambar untuk zoom ↗' : 'Click image to zoom ↗'}
                          </span>
                        </div>

                        {/* 3 Images Stacked Vertically Downwards - Fits Without Scrolling */}
                        <div className="flex-1 flex flex-col justify-between gap-1.5 py-1.5">
                          {cryptoScreenshots.map((screen, sIdx) => (
                            <button
                              key={screen.src}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex(sIdx);
                                setLightboxOpen(true);
                              }}
                              className="group/item w-full flex items-center gap-2.5 p-1.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-700/90 border border-neutral-200/70 dark:border-neutral-700/60 hover:border-[#fd4aa6] dark:hover:border-[#fd4aa6] transition-all duration-150 cursor-pointer text-left shadow-2xs hover:shadow-xs"
                              title={language === 'id' ? 'Klik untuk melihat screenshot layar penuh' : 'Click to view full screenshot'}
                            >
                              {/* Thumbnail preview */}
                              <div className="relative w-20 sm:w-24 aspect-[16/10] shrink-0 rounded-lg overflow-hidden bg-black border border-black/10 dark:border-white/10">
                                <img
                                  src={screen.src}
                                  alt={screen.alt}
                                  className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-200"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                                  <ZoomIn className="w-3.5 h-3.5 text-white drop-shadow" />
                                </div>
                              </div>

                              {/* Label & Context */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9.5px] font-mono font-bold text-[#fd4aa6] uppercase tracking-wider">
                                    0{sIdx + 1}
                                  </span>
                                  <span className="font-hegarty text-xs text-[#101010] dark:text-white truncate">
                                    {sIdx === 0
                                      ? (language === 'id' ? 'Halaman Utama' : 'Main Menu')
                                      : sIdx === 1
                                        ? (language === 'id' ? 'Modul Enkripsi Citra' : 'Image Encryption')
                                        : (language === 'id' ? 'Modul Dekripsi Citra' : 'Image Decryption')}
                                  </span>
                                </div>
                                <p className="text-[9.5px] font-space text-neutral-500 dark:text-neutral-400 truncate m-0 leading-tight">
                                  {sIdx === 0
                                    ? (language === 'id' ? 'Menu GUI & inisialisasi chaos' : 'GUI menu & chaos setup')
                                    : sIdx === 1
                                      ? (language === 'id' ? 'Enkripsi citra medis (18 ms)' : 'Medical image encryption (18 ms)')
                                      : (language === 'id' ? 'Restorasi lossless 100%' : '100% lossless restoration')}
                                </p>
                              </div>

                              <span className="text-xs text-neutral-400 group-hover/item:text-[#fd4aa6] group-hover/item:translate-x-0.5 transition-all pr-1">
                                ↗
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Bottom Footer hint */}
                        <div className="flex items-center justify-between pt-1 border-t border-neutral-200/60 dark:border-neutral-800/80 text-[9.5px] font-mono text-neutral-400 dark:text-neutral-500">
                          <span>Tkinter GUI · Standalone .exe</span>
                          <span className="text-[#fd4aa6]">3 / 3 Screens</span>
                        </div>
                      </div>
                    )}
                  </div>
                </TiltCard>
              </div>
            </div>
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
