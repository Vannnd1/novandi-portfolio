import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { StickerCard } from '../components/StickerCard';
import { LanguageProvider } from '../context/LanguageContext';

describe('StickerCard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('renders heading and email address', () => {
    render(
      <LanguageProvider>
        <StickerCard />
      </LanguageProvider>
    );

    expect(screen.getByText('novandiramdhan5@gmail.com')).toBeInTheDocument();
  });

  it('triggers copy and shows copied state feedback', async () => {
    render(
      <LanguageProvider>
        <StickerCard />
      </LanguageProvider>
    );

    const copyBtn = screen.getByTitle('Salin alamat email');
    await act(async () => {
      copyBtn.click();
    });

    expect(screen.getByText('Tersalin!')).toBeInTheDocument();
  });
});
