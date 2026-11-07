'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Theme = 'light' | 'dark';

// Half-filled circle button. The theme itself lives on <html data-theme="...">.
export default function ThemeToggle() {
  const t = useTranslations('nav');
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' &&
    document.documentElement.dataset.theme === 'dark'
      ? 'dark'
      : 'light'
  );

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
    window.dispatchEvent(new Event('themechange')); // lets canvas components re-read colors
  };

  return (
    <button
      type="button"
      className="navItem navTheme"
      onClick={toggle}
      aria-label={theme === 'dark' ? t('toLight') : t('toDark')}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle
          cx="8"
          cy="8"
          r="6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
    </button>
  );
}
