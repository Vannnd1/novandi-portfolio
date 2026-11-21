import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageLightbox, type LightboxImage } from '../components/ImageLightbox';

const mockImages: LightboxImage[] = [
  {
    src: '/projects/crypto-main-menu.png',
    alt: 'Halaman Utama',
    title: '01 · Halaman Utama',
    badge: '01 / 03 · Main Menu',
  },
  {
    src: '/projects/crypto-encrypt.jpg',
    alt: 'Modul Enkripsi',
    title: '02 · Modul Enkripsi',
    badge: '02 / 03 · Enkripsi',
  },
  {
    src: '/projects/crypto-decrypt.jpg',
    alt: 'Modul Dekripsi',
    title: '03 · Modul Dekripsi',
    badge: '03 / 03 · Dekripsi',
  },
];

describe('ImageLightbox', () => {
  it('does not render when isOpen is false', () => {
    const handleClose = vi.fn();
    const handleNavigate = vi.fn();

    render(
      <ImageLightbox
        images={mockImages}
        currentIndex={0}
        isOpen={false}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal dialog and current image when isOpen is true', () => {
    const handleClose = vi.fn();
    const handleNavigate = vi.fn();

    render(
      <ImageLightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('01 · Halaman Utama')).toBeInTheDocument();
    expect(screen.getByText('01 / 03 · Main Menu')).toBeInTheDocument();
  });

  it('navigates with next and previous buttons', () => {
    const handleClose = vi.fn();
    const handleNavigate = vi.fn();

    render(
      <ImageLightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    );

    const nextBtn = screen.getByLabelText('Gambar berikutnya');
    fireEvent.click(nextBtn);
    expect(handleNavigate).toHaveBeenCalledWith(1);

    const prevBtn = screen.getByLabelText('Gambar sebelumnya');
    fireEvent.click(prevBtn);
    expect(handleNavigate).toHaveBeenCalledWith(2);
  });

  it('closes when close button is clicked or Escape key is pressed', () => {
    const handleClose = vi.fn();
    const handleNavigate = vi.fn();

    render(
      <ImageLightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    );

    const closeBtn = screen.getByLabelText('Tutup preview gambar (Esc)');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('navigates when thumbnail is clicked', () => {
    const handleClose = vi.fn();
    const handleNavigate = vi.fn();

    render(
      <ImageLightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    );

    const thumb2 = screen.getByLabelText('Lihat 02 · Modul Enkripsi');
    fireEvent.click(thumb2);
    expect(handleNavigate).toHaveBeenCalledWith(1);
  });
});
