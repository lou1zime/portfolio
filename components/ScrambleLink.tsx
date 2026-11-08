'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Link } from '@/i18n/navigation';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';

type Props = {
  href: string;
  label: string;
  className?: string;
  children?: ReactNode; // e.g. the superscript count
  duration?: number; // ms for the full scramble-and-settle
  onActivate?: () => void; // called on hover and keyboard focus
};

export default function ScrambleLink({
  href,
  label,
  className,
  children,
  duration = 500,
  onActivate,
}: Props) {
  const [text, setText] = useState(label);
  const [prevLabel, setPrevLabel] = useState(label);

  if (prevLabel !== label) {
    setPrevLabel(label);
    setText(label);
  }

  const raf = useRef(0);

  const run = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    let lastSwap = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      if (p >= 1) return setText(label);

      if (now - lastSwap > 50) {
        lastSwap = now;
        const settled = Math.floor(p * label.length);
        let s = '';
        for (let i = 0; i < label.length; i++) {
          const ch = label[i];
          if (i < settled || ch === ' ') s += ch;
          else {
            const pool = ch === ch.toUpperCase() ? UPPER : LOWER;
            s += pool[Math.floor(Math.random() * pool.length)];
          }
        }
        setText(s);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [label, duration]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const inner = (
    <>
      {/* sizer holds the real width so the layout never jumps while letters change */}
      <span className="navWord">
        <span className="navSizer">{label}</span>
        <span className="navLive" aria-hidden="true">
          {text}
        </span>
      </span>
      {children}
    </>
  );

  const shared = {
    className,
    'aria-label': label,
    onMouseEnter: () => {
      run();
      onActivate?.();
    },
    onFocus: () => {
      run();
      onActivate?.();
    },
  };

  // mailto: links aren't pages, so they skip the locale-aware Link
  return href.startsWith('mailto:') ? (
    <a href={href} {...shared}>
      {inner}
    </a>
  ) : (
    <Link href={href} {...shared}>
      {inner}
    </Link>
  );
}
