'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { setPref } from '@/lib/prefs';

type Theme = 'light' | 'dark';

type Props = {
  initial?: Theme;
};

export default function ThemeToggle({ initial = 'light' }: Props) {
  const t = useTranslations('nav');
  const [theme, setTheme] = useState<Theme>(initial);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setPref('theme', next);
    setTheme(next);
    window.dispatchEvent(new Event('themechange'));
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
