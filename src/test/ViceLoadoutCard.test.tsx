import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ViceLoadoutCard } from '../components/portfolio/ViceLoadoutCard';
import { LanguageProvider } from '../context/LanguageContext';
import { TECH_POND_ITEMS } from '../data/techPond';

function parseTranslate3d(transform: string): { x: number; y: number } {
  const match = transform.match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px,\s*0(?:px)?\)/);
  if (!match) {
    throw new Error(`Expected translate3d transform, received "${transform}"`);
  }
  return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
}

describe('ViceLoadoutCard', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it('keeps orbital slot spacing synchronized when equipping icons and returning them after orbit motion', () => {
    let fakeNow = 1000;
    const callbacks = new Map<number, FrameRequestCallback>();
    let nextId = 1;

    vi.spyOn(performance, 'now').mockImplementation(() => fakeNow);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      const id = nextId++;
      callbacks.set(id, cb);
      return id;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      callbacks.delete(id);
    });

    const stepFrames = (frames: number, stepMs = 50) => {
      for (let i = 0; i < frames; i++) {
        fakeNow += stepMs;
        const batch = Array.from(callbacks.values());
        callbacks.clear();
        batch.forEach((cb) => cb(fakeNow));
      }
    };

    render(
      <LanguageProvider>
        <ViceLoadoutCard />
      </LanguageProvider>
    );

    const getOrbPos = (name: string) => {
      const btn = screen.getByRole('button', { name: `Pasang ${name}` });
      return parseTranslate3d((btn.parentElement as HTMLElement).style.transform);
    };

    const initialReactPos = getOrbPos('React');

    // Equip React & Python, then simulate ~7 seconds of orbit rotation (> 1 orbital slot)
    fireEvent.click(screen.getByRole('button', { name: 'Pasang React' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pasang Python' }));
    stepFrames(140, 50);

    // Return both items to orbit and confirm they land cleanly synced with zero pileup
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Lepaskan React' }));
      fireEvent.click(screen.getByRole('button', { name: 'Lepaskan Python' }));
    });

    const returnedReactPos = getOrbPos('React');
    const movedDist = Math.hypot(
      returnedReactPos.x - initialReactPos.x,
      returnedReactPos.y - initialReactPos.y
    );
    expect(movedDist).toBeGreaterThan(80);

    // Every pair of orbs in the same lane must retain safe non-overlapping spacing (> 85px)
    const innerLaneItems = TECH_POND_ITEMS.filter((_, idx) => idx % 2 === 0);
    const outerLaneItems = TECH_POND_ITEMS.filter((_, idx) => idx % 2 === 1);

    [innerLaneItems, outerLaneItems].forEach((laneItems) => {
      const coords = laneItems.map((item) => getOrbPos(item.name));
      for (let i = 0; i < coords.length; i++) {
        for (let j = i + 1; j < coords.length; j++) {
          const dist = Math.hypot(coords[i].x - coords[j].x, coords[i].y - coords[j].y);
          expect(dist).toBeGreaterThan(85);
        }
      }
    });
  });
});
