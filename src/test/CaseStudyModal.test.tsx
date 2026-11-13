import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { LanguageProvider } from '../context/LanguageContext';
import { projectsDataEn } from '../data/projects';

const mockProject = projectsDataEn[0];

describe('CaseStudyModal', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  it('renders nothing when project is null', () => {
    const { container } = render(
      <LanguageProvider>
        <CaseStudyModal project={null} onClose={() => {}} />
      </LanguageProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders modal dialog with accessible title when project is provided', () => {
    render(
      <LanguageProvider>
        <CaseStudyModal project={mockProject} onClose={() => {}} />
      </LanguageProvider>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <LanguageProvider>
        <CaseStudyModal project={mockProject} onClose={handleClose} />
      </LanguageProvider>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus using Tab key cycling within dialog', () => {
    render(
      <LanguageProvider>
        <CaseStudyModal project={mockProject} onClose={() => {}} />
      </LanguageProvider>
    );

    const dialog = screen.getByRole('dialog');
    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    expect(focusableElements.length).toBeGreaterThan(1);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus last element and press Tab -> should cycle to first element
    lastElement.focus();
    expect(document.activeElement).toBe(lastElement);

    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    window.dispatchEvent(event);
    expect(document.activeElement).toBe(firstElement);
  });
});
