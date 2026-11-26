import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViceRadarCard } from '../components/portfolio/ViceRadarCard';
import { LanguageProvider } from '../context/LanguageContext';
import { TECH_POND_ITEMS } from '../data/techPond';

describe('ViceRadarCard', () => {
  it('renders all tech stack blips on the radar with standby state', () => {
    render(
      <LanguageProvider>
        <ViceRadarCard />
      </LanguageProvider>
    );

    expect(screen.getByText(`0 / ${TECH_POND_ITEMS.length} Terkunci`)).toBeInTheDocument();
    expect(screen.getByText('Sonar Aktif · Menunggu Target')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Kunci React' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Kunci Python' })).toBeInTheDocument();
  });

  it('locks a radar blip into the dossier and shows project context', () => {
    render(
      <LanguageProvider>
        <ViceRadarCard />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Kunci React' }));

    expect(screen.getByText(`1 / ${TECH_POND_ITEMS.length} Terkunci`)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Kunci React' })).not.toBeInTheDocument();
    expect(screen.getByText('Frontend UI')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Digunakan di MOM/MES Enterprise, RetailInsight AI, Capstone Program Asah, dan portofolio ini.'
      )
    ).toBeInTheDocument();
  });

  it('releases individual locked targets or resets the radar', () => {
    render(
      <LanguageProvider>
        <ViceRadarCard />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Kunci React' }));
    fireEvent.click(screen.getByRole('button', { name: 'Kunci Python' }));
    expect(screen.getByText(`2 / ${TECH_POND_ITEMS.length} Terkunci`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Lepaskan React' }));
    expect(screen.getByText(`1 / ${TECH_POND_ITEMS.length} Terkunci`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Kunci React' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reset Radar' }));
    expect(screen.getByText(`0 / ${TECH_POND_ITEMS.length} Terkunci`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Kunci Python' })).toBeInTheDocument();
  });
});
