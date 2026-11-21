import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight } from 'lucide-react';

export interface LightboxImage {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  badge?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onViewCaseStudy?: () => void;
  caseStudyLabel?: string;
  hintLabel?: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  onViewCaseStudy,
  caseStudyLabel = 'Lihat Studi Kasus Lengkap',
  hintLabel = 'Gunakan tombol panah ← → untuk navigasi · Esc untuk menutup',
}) => {
  const currentImage = images[currentIndex] || images[0];

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onNavigate((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNavigate((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label={currentImage.title}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between p-3 sm:p-5 md:p-6 select-none overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-3 text-white pb-3 border-b border-white/10 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-medium text-[#fd4aa6]">
              {currentImage.badge || `${currentIndex + 1} / ${images.length}`}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-hegarty truncate m-0 text-white">
                {currentImage.title}
              </h3>
              {currentImage.subtitle && (
                <p className="hidden sm:block text-xs font-mono text-neutral-400 truncate m-0">
                  {currentImage.subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onViewCaseStudy && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewCaseStudy();
                }}
                className="hidden md:inline-flex items-center gap-1.5 font-hegarty text-xs bg-white/10 hover:bg-[#fd4aa6] text-white px-3.5 py-1.5 rounded-full transition-colors active:scale-95 cursor-pointer border border-white/15"
              >
                <span>{caseStudyLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}

            <a
              href={currentImage.src}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors active:scale-95 border border-white/15"
              title="Buka gambar ukuran asli di tab baru"
              aria-label="Open full image in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors active:scale-95 border border-white/15 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#fd4aa6]"
              aria-label="Tutup preview gambar (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Image Display with Navigation Arrows */}
        <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4 min-h-0">
          {/* Previous Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((currentIndex - 1 + images.length) % images.length);
              }}
              className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm border border-white/15 transition-all active:scale-95 cursor-pointer shadow-lg"
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Main Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-full max-w-full flex flex-col items-center justify-center"
          >
            <motion.img
              key={currentImage.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[70vh] sm:max-h-[76vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/15 bg-neutral-950"
            />
          </div>

          {/* Next Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((currentIndex + 1) % images.length);
              }}
              className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm border border-white/15 transition-all active:scale-95 cursor-pointer shadow-lg"
              aria-label="Gambar berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Bar & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 border-t border-white/10 z-10">
          <p className="text-[11px] font-mono text-neutral-400 hidden sm:block m-0">
            {hintLabel}
          </p>

          {/* Thumbnails row */}
          <div className="flex items-center gap-2">
            {images.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => onNavigate(idx)}
                  className={`relative rounded-lg overflow-hidden transition-all cursor-pointer border ${
                    isActive
                      ? 'border-[#fd4aa6] ring-2 ring-[#fd4aa6]/40 scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}
                  title={img.title}
                  aria-label={`Lihat ${img.title}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-14 h-9 sm:w-16 sm:h-10 object-cover"
                  />
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-mono text-neutral-400 sm:hidden">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
