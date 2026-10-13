import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { TechnicalBackground } from './components/TechnicalBackground';
import { ContactFooter } from './components/ContactFooter';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#111318]">
      {/* Skip to Main Content Link for A11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-50 px-3 py-1.5 bg-[#111318] text-white font-mono-tech text-xs rounded"
      >
        Skip to main content
      </a>

      {/* Persistent Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        <Hero />
        <ProjectsSection />
        <TechnicalBackground />
      </main>

      {/* Contact Section & Footer */}
      <ContactFooter />
    </div>
  );
};

export default App;
