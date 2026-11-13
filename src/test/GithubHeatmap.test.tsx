import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { GithubHeatmap } from '../components/GithubHeatmap';
import { LanguageProvider } from '../context/LanguageContext';

describe('GithubHeatmap', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders error state without fabricating numbers when API fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    render(
      <LanguageProvider>
        <GithubHeatmap />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Gagal memuat visualisasi kontribusi/i)
      ).toBeInTheDocument();
    });

    // Should NOT fabricate "112 kontribusi"
    expect(screen.queryByText(/112 kontribusi/i)).toBeNull();
  });

  it('renders contribution total and interactive dots on successful API response', async () => {
    const mockApiResponse = {
      total: { lastYear: 150 },
      contributions: [
        { date: '2025-01-01', count: 3, level: 2 },
        { date: '2025-01-02', count: 0, level: 0 },
      ],
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    } as Response);

    render(
      <LanguageProvider>
        <GithubHeatmap />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/150 kontribusi/i)).toBeInTheDocument();
    });

    // Verify dot element role="button" exists with accessible label
    const dot = screen.getByLabelText(/3 kontribusi pada 1 Jan 2025/i);
    expect(dot).toBeInTheDocument();

    // Focus on dot triggers tooltip
    fireEvent.focus(dot);
    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    // Blur restores default tooltip prompt
    fireEvent.blur(dot);
    await waitFor(() => {
      expect(screen.getByText(/arahkan kursor ke kotak/i)).toBeInTheDocument();
    });
  });

  it('handles malformed API response gracefully without crashing', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ unexpectedKey: 123 }),
    } as Response);

    render(
      <LanguageProvider>
        <GithubHeatmap />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Gagal memuat visualisasi kontribusi/i)
      ).toBeInTheDocument();
    });
  });

  it('handles empty contributions array cleanly', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ total: { lastYear: 0 }, contributions: [] }),
    } as Response);

    render(
      <LanguageProvider>
        <GithubHeatmap />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Tidak ada riwayat kontribusi/i)
      ).toBeInTheDocument();
    });
  });

  it('aborts active request on component unmount', () => {
    let abortSignal: AbortSignal | undefined;
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce((_url, init) => {
      abortSignal = init?.signal as AbortSignal;
      return new Promise(() => {}); // never resolves
    });

    const { unmount } = render(
      <LanguageProvider>
        <GithubHeatmap />
      </LanguageProvider>
    );

    expect(abortSignal?.aborted).toBe(false);
    unmount();
    expect(abortSignal?.aborted).toBe(true);
  });
});
