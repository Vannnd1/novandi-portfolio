import React from 'react';

/**
 * Detects if the user is visiting from a mobile phone or tablet (HP / smartphone / iPad / Android)
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

  const userAgent =
    navigator.userAgent ||
    navigator.vendor ||
    (window as unknown as { opera?: string }).opera ||
    '';

  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;

  if (mobileRegex.test(userAgent)) {
    return true;
  }

  // Fallback for modern mobile touch devices
  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: coarse)').matches &&
    window.innerWidth <= 1024
  ) {
    return true;
  }

  return false;
};

export const getEmailSubject = (): string => 'Halo Novandi - Diskusi Projek & Kolaborasi';

/**
 * Generates the standard mailto: URL with pre-filled subject
 */
export const getMailtoUrl = (email: string, subject = getEmailSubject()): string => {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
};

/**
 * Generates the web Gmail compose URL with pre-filled recipient and subject
 */
export const getGmailWebUrl = (email: string, subject = getEmailSubject()): string => {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}`;
};

/**
 * Smart Email Click Handler:
 * - On Mobile (HP): triggers native mailto: to directly launch the device's default Email App
 *   (Gmail app, Apple Mail, Outlook, Samsung Email, etc.) without creating empty blank browser tabs.
 * - On Desktop: opens the web Gmail compose screen in a new tab.
 */
export const handleSmartEmailClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  email: string,
  subject = getEmailSubject()
) => {
  if (isMobileDevice()) {
    // Mobile HP: let the mobile browser directly launch the native Email App
    window.location.href = getMailtoUrl(email, subject);
    e.preventDefault();
  } else {
    // Desktop: open Gmail web compose in a new tab
    e.preventDefault();
    window.open(getGmailWebUrl(email, subject), '_blank', 'noopener,noreferrer');
  }
};
