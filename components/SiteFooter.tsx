'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { character } from '@/content/character';
import { site } from '@/content/site';
import SocialLink from './SocialLink';

export default function SiteFooter() {
  const t = useTranslations('footer');
  const path = usePathname();
  const ref = useRef<HTMLElement>(null);

  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [prevPath, setPrevPath] = useState(path);

  // Reset state when path changes during render (replaces useEffect setState)
  if (path !== prevPath) {
    setPrevPath(path);
    setPinned(false);
    setHovered(false);
  }

  const isAbout = path.startsWith('/about');
  const open = isAbout || pinned || hovered;

  // once pinned open, make sure the links are on screen
  useEffect(() => {
    if (!pinned) return;
    const id = setTimeout(
      () => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }),
      400
    );
    return () => clearTimeout(id);
  }, [pinned]);

  const { frames, frameWidth, frameHeight, displayWidth, duration, sprite } =
    character;
  const charVars = {
    '--sprite': `url(${sprite})`,
    '--frames': frames,
    '--cw': `${displayWidth}px`,
    '--ch': `${Math.round((displayWidth * frameHeight) / frameWidth)}px`,
    '--dur': `${duration}ms`,
  } as CSSProperties;

  return (
    <footer
      ref={ref}
      className={`siteFooter ${open ? 'open' : ''}`}
      // hover only on devices that have it; touch screens use the tap on the character
      onMouseEnter={() =>
        window.matchMedia('(hover: hover)').matches && setHovered(true)
      }
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        if (!window.matchMedia('(hover: none)').matches) return;

        // don't toggle when clicking an actual link or button
        if ((e.target as HTMLElement).closest('a, button')) return;

        setPinned((p) => !p);
      }}
    >
      <button
        type="button"
        className="charBtn"
        aria-expanded={open}
        aria-controls="footer-links"
        aria-label={t('toggle')}
        onClick={() => setPinned((p) => !p)}
      >
        <span
          className={`char ${open ? 'play' : ''}`}
          style={charVars}
          aria-hidden="true"
        />
      </button>

      <div id="footer-links" className="footBody" inert={!open}>
        <div className="footInner">
          <ul className="footLinks">
            {site.socials.map((l) => (
              <li key={l.label}>
                <SocialLink
                  className="footLink"
                  label={l.label}
                  handle={l.handle}
                  href={l.href}
                />
              </li>
            ))}
            <p className="footBottom">© 2026 Lou Onezime. {t('copyright')}.</p>
            <p className="footBottom">{t('stack')}</p>
            <a href="#top" className="backToTop">
              {t('backToTop')} ↑
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
}
