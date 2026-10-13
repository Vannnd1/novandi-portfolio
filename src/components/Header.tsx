import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/profile';
import { GitHubIcon } from './Icons';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01. Research', href: '#research' },
    { label: '02. Systems', href: '#systems' },
    { label: '03. Intelligence', href: '#ai' },
    { label: '04. Profile', href: '#profile' },
    { label: '05. Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b ${
        scrolled
          ? 'bg-[#FAFAF9]/90 backdrop-blur-md border-[#E4E4E1] shadow-xs'
          : 'bg-[#FAFAF9]/75 backdrop-blur-xs border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          className="group inline-flex items-center gap-2.5 font-mono-tech text-sm font-semibold text-[#111318] hover:text-[#2563EB] transition-colors focus-visible:outline-2 focus-visible:outline-[#2563EB]"
          aria-label="Novandi Ahmad Ramdhan Home"
        >
          <span className="w-2 h-2 rounded-full bg-[#059669] group-hover:scale-125 transition-transform" aria-hidden="true" />
          <span>novandi.ahmad</span>
          <span className="hidden sm:inline-block text-[#858A96] font-normal text-xs">/ informatics</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono-tech text-xs text-[#575B66] hover:text-[#111318] transition-colors py-1 relative focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            >
              {link.label}
            </a>
          ))}

          <div className="h-4 w-px bg-[#E4E4E1]" aria-hidden="true" />

          {/* External GitHub link */}
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#111318] hover:text-[#2563EB] px-2.5 py-1 rounded border border-[#E4E4E1] hover:border-[#111318] transition-all focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            aria-label="GitHub Profile @Vannnd1"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-[#858A96]" aria-hidden="true" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-[#575B66] hover:text-[#111318] focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            aria-label="GitHub Profile"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111318] hover:bg-[#F4F4F2] rounded focus-visible:outline-2 focus-visible:outline-[#2563EB]"
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="font-mono-tech text-sm text-[#111318] hover:text-[#2563EB] py-1.5 border-b border-[#EDEDEB] focus-visible:outline-2 focus-visible:outline-[#2563EB]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              className="inline-flex items-center justify-between font-mono-tech text-sm text-[#2563EB] py-2 focus-visible:outline-2 focus-visible:outline-[#2563EB]"
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
