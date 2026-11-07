'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { projects } from '@/content/projects';
import LocaleSwitcher from './LocaleSwitcher';
import PaletteToggle from './PaletteToggle';
import ScrambleLink from './ScrambleLink';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const t = useTranslations('nav');

  const path = usePathname(); // already without the /fr prefix
  const active = (href: string) => (path.startsWith(href) ? 'navActive' : '');

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [prevPath, setPrevPath] = useState(path);

  if (prevPath !== path) {
    setPrevPath(path);
    setOpen(false);
  }

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
        <PaletteToggle />
        <ThemeToggle />
      </div>

      <div className={`navPanel ${open ? 'open' : ''}`}>
        <ul className="navList">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className={`navProject ${i === index ? 'on' : ''}`}
                onMouseEnter={() => setIndex(i)}
                onFocus={() => setIndex(i)}
              >
                <span>{p.title}</span>
                <span>{p.year}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/projects" className="navAll">
              {t('allWork')}
            </Link>
          </li>
        </ul>

        <div className="navPreview" aria-hidden="true">
          {projects.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.slug}
              src={p.cover}
              alt=""
              className={i === index ? 'on' : ''}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
