import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TechPondCard } from '../components/portfolio/TechPondCard';
import { LanguageProvider } from '../context/LanguageContext';
import { TECH_POND_ITEMS } from '../data/techPond';

describe('TechPondCard', () => {
  it('renders all tech stack logos swimming in the pond with empty net message', () => {
    render(
      <LanguageProvider>
        <TechPondCard />
      </LanguageProvider>
    );

    expect(screen.getByText(`0 / ${TECH_POND_ITEMS.length} Tertangkap`)).toBeInTheDocument();
    expect(
      screen.getByText('Jaring masih kosong — klik logo tech stack yang berenang di kolam!')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tangkap React' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tangkap Python' })).toBeInTheDocument();
  });

  it('catches a swimming tech logo into the collector tray and shows project context', async () => {
    render(
      <LanguageProvider>
        <TechPondCard />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Tangkap React' }));

    expect(screen.getByText(`1 / ${TECH_POND_ITEMS.length} Tertangkap`)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Tangkap React' })).not.toBeInTheDocument();
    });
    expect(screen.getByText('Frontend UI')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Digunakan di MOM/MES Enterprise, RetailInsight AI, Capstone Program Asah, dan portofolio ini.'
      )
    ).toBeInTheDocument();
  });

  it('releases individual fish or all caught fish back into the pond', () => {
    render(
      <LanguageProvider>
        <TechPondCard />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Tangkap React' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tangkap Python' }));
    expect(screen.getByText(`2 / ${TECH_POND_ITEMS.length} Tertangkap`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Lepaskan React' }));
    expect(screen.getByText(`1 / ${TECH_POND_ITEMS.length} Tertangkap`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tangkap React' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Lepas Semua' }));
    expect(screen.getByText(`0 / ${TECH_POND_ITEMS.length} Tertangkap`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tangkap Python' })).toBeInTheDocument();
  });
});
