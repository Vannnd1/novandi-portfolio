import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/profile';
import { GitHubIcon } from './Icons';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navLinks = [
    { id: 'research', label: '01. Research', href: '#research' },
    { id: 'systems', label: '02. Systems', href: '#systems' },
    { id: 'ai', label: '03. Intelligence', href: '#ai' },
    { id: 'profile', label: '04. Profile', href: '#profile' },
    { id: 'contact', label: '05. Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sectionIds = ['research', 'systems', 'ai', 'profile', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          return;
        }
      }
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard Escape listener for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#FAFAF9]/92 backdrop-blur-md border-[#E4E4E1] shadow-xs'
          : 'bg-[#FAFAF9]/80 backdrop-blur-xs border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          className="group inline-flex items-center gap-2.5 font-mono-tech text-sm font-semibold text-[#111318] hover:text-[#2563EB] transition-colors focus-visible:outline-2 focus-visible:outline-[#2563EB]"
          aria-label="Novandi Ahmad Ramdhan Home"
        >
          <span className="w-2 h-2 rounded-full bg-[#059669] group-hover:scale-125 transition-transform duration-200" aria-hidden="true" />
          <span>novandi.ahmad</span>
          <span className="hidden sm:inline-block text-[#858A96] font-normal text-xs">/ informatics</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono-tech text-xs transition-colors py-1 relative focus-visible:outline-2 focus-visible:outline-[#2563EB] ${
                  isActive
                    ? 'text-[#111318] font-semibold'
                    : 'text-[#575B66] hover:text-[#111318]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full animate-fade-in"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}

          <div className="h-4 w-px bg-[#E4E4E1]" aria-hidden="true" />

          {/* External GitHub link */}
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#111318] hover:text-[#2563EB] px-2.5 py-1 rounded border border-[#E4E4E1] hover:border-[#111318] active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            aria-label="GitHub Profile @Vannnd1"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-[#858A96] group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" aria-hidden="true" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-[#575B66] hover:text-[#111318] active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            aria-label="GitHub Profile"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111318] hover:bg-[#F4F4F2] active:scale-95 transition-transform rounded focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E4E4E1] bg-[#FAFAF9] px-5 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3" aria-label="Mobile primary navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`font-mono-tech text-sm py-1.5 border-b border-[#EDEDEB] focus-visible:outline-2 focus-visible:outline-[#2563EB] flex items-center justify-between ${
                    isActive
                      ? 'text-[#2563EB] font-semibold'
                      : 'text-[#111318] hover:text-[#2563EB]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />}
                </a>
              );
            })}
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              className="inline-flex items-center justify-between font-mono-tech text-sm text-[#2563EB] py-2 active:scale-[0.99] transition-transform focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            >
              <span className="flex items-center gap-2">
                <GitHubIcon className="w-4 h-4" />
                <span>GitHub @Vannnd1</span>
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
