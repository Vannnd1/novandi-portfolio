import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectShowcase } from '../components/portfolio/ProjectShowcase';
import { LanguageProvider } from '../context/LanguageContext';
import { projectsDataEn } from '../data/projects';

describe('ProjectShowcase', () => {
  it('renders list of projects with accessible mockup buttons', () => {
    const handleSelect = vi.fn();

    render(
      <LanguageProvider>
        <ProjectShowcase
          projects={projectsDataEn.slice(0, 2)}
          onSelectProject={handleSelect}
        />
      </LanguageProvider>
    );

    // Verify first project title is rendered
    expect(screen.getByText(projectsDataEn[0].title)).toBeInTheDocument();

    // Verify accessible mockup button with aria-label
    const mockupBtn = screen.getByLabelText(
      new RegExp(`(lihat studi kasus lengkap|view case study): ${projectsDataEn[0].title}`, 'i')
    );
    expect(mockupBtn).toBeInTheDocument();

    // Click mockup button triggers callback
    fireEvent.click(mockupBtn);
    expect(handleSelect).toHaveBeenCalledWith(projectsDataEn[0].id);
  });
});
