'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const SIZE = 26; // bucket size in px: change this one number to make it bigger or smaller

// Paint-bucket button: turns the purple/yellow color palette on and off.
// Off = empty bucket. On = bucket tilts and fills with paint.
// The palette itself lives on <html data-palette="color">.
export default function PaletteToggle() {
  const t = useTranslations('nav');
  const [on, setOn] = useState(
    () =>
      typeof window !== 'undefined' &&
      document.documentElement.dataset.palette === 'color'
  );

  const toggle = () => {
    const next = !on;
    if (next) document.documentElement.dataset.palette = 'color';
    else delete document.documentElement.dataset.palette;
    try {
      localStorage.setItem('palette', next ? 'color' : 'plain');
    } catch {}
    setOn(next);
    window.dispatchEvent(new Event('themechange')); // lets canvas components re-read colors
  };

  return (
    <button
      type="button"
      className="navItem navPalette"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? t('colorOff') : t('colorOn')}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <defs>
          {/* the inside of the bucket: paint is only visible within this shape */}
          <clipPath id="bucketInside">
            <rect
              x="4"
              y="5"
              width="8"
              height="8"
              rx="1.5"
              transform="rotate(45 8 9)"
            />
          </clipPath>
        </defs>

        {/* the bucket tilts when color is on */}
        <g className="bucketTilt">
          <g clipPath="url(#bucketInside)">
            {/* paint level: slides up from below when color is on */}
            <rect
              className="bucketPaint"
              x="0"
              y="7"
              width="18"
              height="12"
              fill="currentColor"
              stroke="none"
            />
          </g>
          <rect
            x="4"
            y="5"
            width="8"
            height="8"
            rx="1.5"
            transform="rotate(45 8 9)"
          />
          <path d="M4.4 7h7.2" />
        </g>

        {/* the drop shows the paint colour you'd get; it turns solid once color is on */}
        <path
          className="bucketDrop"
          d="M14.5 9.6c.9 1.2 1.3 1.8 1.3 2.3a1.3 1.3 0 0 1-2.6 0c0-.5.4-1.1 1.3-2.3Z"
          stroke="none"
        />
      </svg>
    </button>
  );
}
