import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ViceAmbientBackdrop } from '../components/ViceAmbientBackdrop';

describe('ViceAmbientBackdrop', () => {
  it('renders a single large tri-color morphing blob and tracks hover move/leave cleanly', () => {
    const { container } = render(
      <div style={{ width: 640, height: 340, position: 'relative' }}>
        <ViceAmbientBackdrop />
      </div>
    );

    const parent = container.firstChild as HTMLElement;
    const backdrop = parent.firstChild as HTMLElement;

    expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    expect(backdrop.children.length).toBe(1);
    expect(backdrop.querySelector('.vice-tricolor-blob')).toBeInTheDocument();

    fireEvent.mouseMove(parent, { clientX: 250, clientY: 160 });
    fireEvent.mouseLeave(parent);
  });
});
