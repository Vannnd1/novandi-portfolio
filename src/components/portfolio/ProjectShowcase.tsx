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
          <article className="group relative rounded-3xl border border-[#f0d8e6] dark:border-[#2f1f4d] bg-white/84 dark:bg-[#140d22]/82 hover:bg-white/95 hover:dark:bg-[#1a112d]/90 p-6 sm:p-8 md:p-10 lg:p-11 xl:p-12 transition-all duration-300 shadow-[0_4px_24px_rgba(168,85,247,0.04)] hover:shadow-[0_16px_40px_rgba(255,59,154,0.12)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] hover:border-[#ff3b9a]/40 dark:hover:border-[#ff3b9a]/45 overflow-hidden">
            {/* Subtle top corner gradient accent */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-[#ff3b9a]/15 via-[#ff8a4c]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
              {/* Left Column (Metadata, Title, Clean Summary, Tech Stack, Actions) */}
              <div className="w-full lg:col-span-6 space-y-4 text-left flex flex-col justify-between">
                <div className="space-y-3.5">
                  {/* Header tags: Category & Year */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f5e3ee] dark:border-[#2b1d45] pb-2.5 transition-colors">
                    <span className="font-space text-xs font-bold px-3 py-1 rounded-full bg-[#fff4fa] dark:bg-[#1f1336] text-[#e61e7a] dark:text-[#ff5eb0] border border-[#ff3b9a]/30 uppercase tracking-wider shadow-2xs">
                      {project.categoryLabel}
                    </span>
                    <span className="font-dm-sans italic font-bold text-base text-[#7b648f] dark:text-[#ffb35c]">
                      {project.year}
                    </span>
                  </div>

                  {/* Project Title */}
                  <button
                    type="button"
                    onClick={() => onSelectProject(project.id)}
                    className="text-left group/title cursor-pointer block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a] rounded-md"
                  >
                    <h3 className="font-hegarty text-2xl sm:text-3xl lg:text-[2.15rem] text-[#1a1026] dark:text-[#fdf7ff] leading-[1.08] m-0 group-hover/title:text-[#ff3b9a] transition-colors">
                      {project.title}
                    </h3>
                  </button>

                  {/* Summary: What was done, output, and impact (Simple, direct, uncluttered) */}
                  <p className="font-space font-normal text-sm sm:text-base text-[#523e63] dark:text-[#cbb9e3] leading-[1.65] max-w-[640px] m-0 transition-colors">
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
                      className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-[#1a1026] dark:bg-gradient-to-r dark:from-[#ff3b9a] dark:to-[#ff8a4c] hover:bg-[#ff3b9a] hover:dark:brightness-110 text-white px-4 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-sm hover:shadow-md hover:shadow-[#ff3b9a]/30 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
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
                        className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-white dark:bg-[#1e1433] hover:bg-[#ff3b9a] hover:dark:bg-[#00d9ff] text-[#3c1e52] dark:text-[#e9dbf7] hover:text-white hover:dark:text-[#0b0614] border border-[#e7cbe0] dark:border-[#39265c] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
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
                        className="inline-flex items-center gap-1.5 font-hegarty text-xs sm:text-sm bg-white dark:bg-[#1e1433] hover:bg-[#9333ea] hover:dark:bg-[#a855f7] text-[#3c1e52] dark:text-[#e9dbf7] hover:text-white border border-[#e7cbe0] dark:border-[#39265c] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
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
                    className="group/window relative w-full block text-left cursor-pointer rounded-2xl bg-white dark:bg-[#160e26] border border-[#eed6e5] dark:border-[#322152] shadow-[0_10px_30px_rgba(139,61,255,0.08)] hover:shadow-[0_20px_45px_rgba(255,59,154,0.16)] dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)] hover:border-[#ff3b9a]/40 dark:hover:border-[#ff3b9a]/45 overflow-hidden transition-all duration-300 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#ff3b9a]"
                  >
                    {/* Clean Minimalist Window Titlebar */}
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#fff9fc] dark:bg-[#120b20] border-b border-[#f4e1ed] dark:border-[#2b1d47] select-none transition-colors">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f8f]/65" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffb35c]/65" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00d9ff]/65" />
                      </div>

                      {project.demoUrl ? (
                        <span className="text-[10px] font-mono text-[#9c89b8] dark:text-[#9c89b8] truncate max-w-[200px] sm:max-w-[260px]">
                          {project.demoUrl.replace(/^https?:\/\//, '')}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#9c89b8] dark:text-[#9c89b8]">
                          {project.id === 'chaotic-image-encryption' ? 'chaotic_crypto_system.exe' : project.id}
                        </span>
                      )}

                      <div className="flex items-center gap-1 text-[10px] font-space text-[#8d74a3] dark:text-[#b4a0ce] group-hover/window:text-[#ff3b9a] transition-colors">
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
                        className="absolute inset-0 z-20 bg-[#fff9f6]/96 dark:bg-[#0b0614]/96 backdrop-blur-md p-3 sm:p-3.5 flex flex-col justify-between opacity-0 pointer-events-none group-hover/imageArea:opacity-100 group-hover/imageArea:pointer-events-auto transition-opacity duration-250 select-none overflow-hidden"
                      >
                        {/* Header: Desktop App Context */}
                        <div className="flex items-center justify-between pb-2 border-b border-[#f0d8e6] dark:border-[#2f1f4d] text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#ff3b9a] animate-pulse" />
                            <span className="font-hegarty text-xs text-[#1a1026] dark:text-[#fdf7ff]">
                              {language === 'id' ? 'Alur Aplikasi Windows (.exe)' : 'Windows App Flow (.exe)'}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#ff3b9a] font-medium">
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
                              className="group/item w-full flex items-center gap-2.5 p-1.5 rounded-xl bg-[#fff2f8] dark:bg-[#1a112d] hover:bg-white dark:hover:bg-[#24183d] border border-[#efd6e5] dark:border-[#342254] hover:border-[#ff3b9a] dark:hover:border-[#ff3b9a] transition-all duration-150 cursor-pointer text-left shadow-2xs hover:shadow-xs"
                              title={language === 'id' ? 'Klik untuk melihat screenshot layar penuh' : 'Click to view full screenshot'}
                            >
                              {/* Thumbnail preview */}
                              <div className="relative w-20 sm:w-24 aspect-[16/10] shrink-0 rounded-lg overflow-hidden bg-black border border-[#ff3b9a]/20">
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
                                  <span className="text-[9.5px] font-mono font-bold text-[#ff3b9a] uppercase tracking-wider">
                                    0{sIdx + 1}
                                  </span>
                                  <span className="font-hegarty text-xs text-[#1a1026] dark:text-[#fdf7ff] truncate">
                                    {sIdx === 0
                                      ? (language === 'id' ? 'Halaman Utama' : 'Main Menu')
                                      : sIdx === 1
                                        ? (language === 'id' ? 'Modul Enkripsi Citra' : 'Image Encryption')
                                        : (language === 'id' ? 'Modul Dekripsi Citra' : 'Image Decryption')}
                                  </span>
                                </div>
                                <p className="text-[9.5px] font-space text-[#7b648f] dark:text-[#b4a0ce] truncate m-0 leading-tight">
                                  {sIdx === 0
                                    ? (language === 'id' ? 'Menu GUI & inisialisasi chaos' : 'GUI menu & chaos setup')
                                    : sIdx === 1
                                      ? (language === 'id' ? 'Enkripsi citra medis (18 ms)' : 'Medical image encryption (18 ms)')
                                      : (language === 'id' ? 'Restorasi lossless 100%' : '100% lossless restoration')}
                                </p>
                              </div>

                              <span className="text-xs text-[#9c89b8] group-hover/item:text-[#ff3b9a] group-hover/item:translate-x-0.5 transition-all pr-1">
                                ↗
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Bottom Footer hint */}
                        <div className="flex items-center justify-between pt-1 border-t border-[#f0d8e6] dark:border-[#2f1f4d] text-[9.5px] font-mono text-[#8d74a3] dark:text-[#9c89b8]">
                          <span>Tkinter GUI · Standalone .exe</span>
                          <span className="text-[#ff3b9a]">3 / 3 Screens</span>
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
