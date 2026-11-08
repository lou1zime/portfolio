'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, Link } from '@/i18n/navigation';
import { education, experience } from '@/content/experience';
import { projects } from '@/content/projects';
import LocaleSwitcher from './LocaleSwitcher';
import PaletteToggle from './PaletteToggle';
import ScrambleLink from './ScrambleLink';
import ThemeToggle from './ThemeToggle';

const PREVIEW = 4;

type NavbarProps = {
  initialPalette?: boolean;
  initialTheme?: 'light' | 'dark';
};

export default function Navbar({ initialPalette, initialTheme }: NavbarProps) {
  const t = useTranslations('nav');
  const w = useTranslations('work');

  const path = usePathname(); // already without the /fr prefix
  const active = (href: string) => (path.startsWith(href) ? 'navActive' : '');

  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(path);

  if (path !== prevPath) {
    setPrevPath(path);
    if (open) setOpen(false);
  }

  const latest = [...projects]
    .sort((a, b) => Number(b.year) - Number(a.year))
    .slice(0, PREVIEW);

  return (
    <header
      className="navBar"
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <ScrambleLink href="/" label="LO" className="navItem navLogo" />

      <nav aria-label="Main" className="navLinks">
        <ScrambleLink
          href="/projects"
          label={t('work')}
          className={`navItem navWork ${active('/projects')}`}
          onActivate={() => setOpen(true)}
        >
          <sup className="navCount">{projects.length}</sup>
        </ScrambleLink>

        <ScrambleLink
          href="/about"
          label={t('about')}
          className={`navItem navAbout ${active('/about')}`}
          onActivate={() => setOpen(false)}
        />
      </nav>

      <div className="navTools">
        <LocaleSwitcher onOpen={() => setOpen(false)} />
        <PaletteToggle initial={initialPalette} />
        <ThemeToggle initial={initialTheme} />
      </div>

      <div className={`navPanel ${open ? 'open' : ''}`}>
        <div className="navCols compact">
          <div className="navCol hasPreview">
            <ScrambleLink
              href="/projects"
              label={t('allWork')}
              className="navColHead"
            >
              <sup>{projects.length}</sup>
            </ScrambleLink>

            <div className="navDrop">
              <ul>
                {latest.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="navColItem">
                      {p.title}
                      <span className="navMeta">{p.year}</span>
                    </Link>
                  </li>
                ))}
                {projects.length > PREVIEW && (
                  <li>
                    <Link href="/projects" className="navColItem navMore">
                      {t('more', { count: projects.length - PREVIEW })}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="navCol">
            <ScrambleLink
              href="/projects?list=experience"
              label={w('experience')}
              className="navColHead"
            >
              <sup>{experience.length}</sup>
            </ScrambleLink>
          </div>

          <div className="navCol">
            <ScrambleLink
              href="/projects?list=education"
              label={w('education')}
              className="navColHead"
            >
              <sup>{education.length}</sup>
            </ScrambleLink>
          </div>
        </div>
      </div>
    </header>
  );
}
