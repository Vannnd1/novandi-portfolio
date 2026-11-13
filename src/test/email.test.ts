import { describe, it, expect, vi } from 'vitest';
import { isMobileDevice, getMailtoUrl, getGmailWebUrl, handleSmartEmailClick } from '../utils/email';

describe('email utilities', () => {
  it('formats standard mailto URL correctly', () => {
    const url = getMailtoUrl('test@example.com', 'Custom Subject');
    expect(url).toBe('mailto:test@example.com?subject=Custom%20Subject');
  });

  it('formats web Gmail compose URL correctly', () => {
    const url = getGmailWebUrl('test@example.com', 'Custom Subject');
    expect(url).toBe('https://mail.google.com/mail/?view=cm&fs=1&to=test@example.com&su=Custom%20Subject');
  });

  it('detects desktop vs mobile devices correctly', () => {
    // In jsdom by default navigator.userAgent is not mobile
    expect(isMobileDevice()).toBe(false);
  });

  it('opens Gmail web compose on desktop devices', () => {
    const mockPreventDefault = vi.fn();
    const mockWindowOpen = vi.spyOn(window, 'open').mockImplementation(() => null);

    const syntheticEvent = {
      preventDefault: mockPreventDefault,
    } as unknown as React.MouseEvent<HTMLAnchorElement>;

    handleSmartEmailClick(syntheticEvent, 'test@example.com');

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://mail.google.com/mail/?view=cm'),
      '_blank',
      'noopener,noreferrer'
    );
  });
});
