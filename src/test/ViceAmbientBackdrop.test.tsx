import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ViceAmbientBackdrop } from '../components/ViceAmbientBackdrop';

describe('ViceAmbientBackdrop', () => {
  it('renders viewport ambient orbs and handles pointer move/leave cleanly', () => {
    const { container } = render(<ViceAmbientBackdrop scope="viewport" />);
    const backdrop = container.firstChild as HTMLElement;

    expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    expect(backdrop.children.length).toBe(3);

    fireEvent.mouseMove(window, { clientX: 300, clientY: 220 });
    fireEvent.mouseLeave(document.documentElement);
  });

  it('renders container ambient orbs inside parent and tracks hover cleanly', () => {
    const { container } = render(
      <div style={{ width: 600, height: 320, position: 'relative' }}>
        <ViceAmbientBackdrop scope="container" />
      </div>
    );

    const parent = container.firstChild as HTMLElement;
    const backdrop = parent.firstChild as HTMLElement;

    expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    expect(backdrop.children.length).toBe(3);

    fireEvent.mouseMove(parent, { clientX: 250, clientY: 160 });
    fireEvent.mouseLeave(parent);
  });
});
