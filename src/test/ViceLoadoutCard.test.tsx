import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViceLoadoutCard } from '../components/portfolio/ViceLoadoutCard';
import { LanguageProvider } from '../context/LanguageContext';
import { TECH_POND_ITEMS } from '../data/techPond';

describe('ViceLoadoutCard', () => {
  it('renders the 4-sector weapon wheel and all 14 orbiting tech icons', () => {
    render(
      <LanguageProvider>
        <ViceLoadoutCard />
      </LanguageProvider>
    );

    expect(screen.getByText(`0 / ${TECH_POND_ITEMS.length} Terpasang`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter sektor Frontend & UI' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter sektor Backend & DB' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter sektor AI, Data & ML' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter sektor Build, Test & Git' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pasang React' })).toBeInTheDocument();
  });

  it('filters role details when selecting a weapon wheel sector and resets on All hub click', () => {
    render(
      <LanguageProvider>
        <ViceLoadoutCard />
      </LanguageProvider>
    );

    const frontendSector = screen.getByRole('button', { name: 'Filter sektor Frontend & UI' });
    fireEvent.click(frontendSector);

    expect(frontendSector).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByText('Antarmuka web interaktif, manajemen state, dan sistem desain responsif.')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Tampilkan semua peran' }));
    expect(frontendSector).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Loadout Siap · Pilih Kategori atau Ikon')).toBeInTheDocument();
  });

  it('equips an orbiting tech icon into loadout and releases individual or all items', () => {
    render(
      <LanguageProvider>
        <ViceLoadoutCard />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pasang React' }));
    expect(screen.getByText(`1 / ${TECH_POND_ITEMS.length} Terpasang`)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pasang React' })).not.toBeInTheDocument();
    expect(screen.getByText('Frontend UI')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pasang Python' }));
    expect(screen.getByText(`2 / ${TECH_POND_ITEMS.length} Terpasang`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Lepaskan React' }));
    expect(screen.getByText(`1 / ${TECH_POND_ITEMS.length} Terpasang`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pasang React' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reset Loadout' }));
    expect(screen.getByText(`0 / ${TECH_POND_ITEMS.length} Terpasang`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pasang Python' })).toBeInTheDocument();
  });
});
