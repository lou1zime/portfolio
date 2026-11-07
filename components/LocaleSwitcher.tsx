'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

// What each language is called in the navbar and in the dropdown.
// Adding a language later = add it to i18n/routing.ts AND add a line here.
const LANGS: Record<string, { short: string; name: string }> = {
  en: { short: 'EN', name: 'English' },
  fr: { short: 'FR', name: 'Français' },
};
const short = (l: string) => LANGS[l]?.short ?? l.toUpperCase();

export default function LocaleSwitcher({ onOpen }: { onOpen?: () => void }) {
  const locale = useLocale();
  const t = useTranslations('nav');
  const pathname = usePathname(); // current page without the language prefix
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // click outside closes it (mostly for touch screens)
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const openMenu = () => {
    setOpen(true);
    onOpen?.();
  };

  const choose = (next: string) => {
    setOpen(false);
    if (next !== locale) router.replace(pathname, { locale: next }); // same page, other language
  };

  return (
    <div
      ref={ref}
      className="navLangWrap"
      // hover opens it on desktop; on touch screens a tap on the button toggles it instead
      onMouseEnter={() =>
        window.matchMedia('(hover: hover)').matches && openMenu()
      }
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        className="navItem navLang"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t('language')}: ${LANGS[locale]?.name ?? locale}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        {short(locale)}
        <svg
          className="navCaret"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <path
            d="M1.5 3.5 5 7l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <ul className={`navLangMenu ${open ? 'open' : ''}`}>
        {routing.locales.map((l) => (
          <li key={l}>
            <button
              type="button"
              lang={l}
              aria-current={l === locale ? 'true' : undefined}
              onClick={() => choose(l)}
            >
              {short(l)}
              {/* <span>{LANGS[l]?.name}</span> */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
