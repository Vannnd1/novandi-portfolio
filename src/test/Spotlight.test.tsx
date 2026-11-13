import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Spotlight } from '../components/Spotlight';

describe('Spotlight', () => {
  it('renders children correctly', () => {
    render(
      <Spotlight data-testid="spotlight-wrapper">
        <div>Spotlight Content</div>
      </Spotlight>
    );

    expect(screen.getByText('Spotlight Content')).toBeInTheDocument();
  });

  it('updates coordinates smoothly on mouse move without crashing', () => {
    const { container } = render(
      <Spotlight size={500}>
        <div>Interactive Spotlight</div>
      </Spotlight>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();

    // Fire pointer movement
    fireEvent.pointerMove(wrapper, {
      clientX: 150,
      clientY: 200,
    });

    // Pointer leave
    fireEvent.pointerLeave(wrapper);
  });
});
