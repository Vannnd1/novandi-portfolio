import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';
import { useLanguage } from '../context/useLanguage';

const ConsumerComponent = () => {
  const { language, setLanguage, t, profile } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="title">{profile.title}</span>
      <span data-testid="hello">{t.hero.helloIm}</span>
      <button onClick={() => setLanguage('en')}>Switch to EN</button>
      <button onClick={() => setLanguage('id')}>Switch to ID</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
  });

  it('defaults to Indonesian (id)', () => {
    render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('lang').textContent).toBe('id');
    expect(screen.getByTestId('hello').textContent).toBe('halo, saya');
    expect(document.documentElement.lang).toBe('id');
  });

  it('switches to English (en) and updates document language', async () => {
    render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );

    const btn = screen.getByText('Switch to EN');
    await act(async () => {
      btn.click();
    });

    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('hello').textContent).toBe("hello, i'm");
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('novan_portfolio_lang')).toBe('en');
  });
});
