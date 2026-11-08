'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';

const pick = (ref: string) => {
  const pool = ref !== ref.toLowerCase() ? UPPER : LOWER;
  return pool[Math.floor(Math.random() * pool.length)];
};

type Props = {
  label: string; // "LinkedIn"
  handle: string; // "/lou-onezime", revealed on hover
  href: string;
  duration?: number; // ms for the scramble
  /** what scrambles on hover: 'both', only the 'label' (LinkedIn), or only the 'handle' (/lou-onezime) */
  scramble?: 'both' | 'label' | 'handle';
};

export default function SocialLink({
  label,
  handle,
  href,
  duration = 650,
  scramble = 'both',
}: Props) {
  const full = label + handle;

  const [text, setText] = useState(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none)').matches
    ) {
      return full;
    }
    return label;
  });

  const shown = useRef(
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
      ? full
      : label
  );

  const raf = useRef(0);
  const canHover = useRef(
    typeof window === 'undefined' || !window.matchMedia('(hover: none)').matches
  );

  const animateTo = useCallback(
    (target: string) => {
      cancelAnimationFrame(raf.current);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        shown.current = target;
        setText(target);
        return;
      }

      const from = shown.current;
      const start = performance.now();
      let last = 0;

      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        if (p >= 1) {
          shown.current = target;
          setText(target);
          return;
        }
        if (now - last > 45) {
          last = now;
          const scrambleLabel = scramble !== 'handle';
          const scrambleHandle = scramble !== 'label';
          const targetHandleLen = target.length - label.length; // 0 when hiding the handle
          const fromHandleLen = from.length - label.length;

          // letters settle left to right across label + handle
          const settledAll = Math.floor(p * (label.length + targetHandleLen));

          let s = '';
          // label part: always label.length long
          for (let i = 0; i < label.length; i++) {
            s += !scrambleLabel || i < settledAll ? label[i] : pick(label[i]);
          }
          // handle part: grows/shrinks while scrambling, or appears/disappears at once
          const handleLen = scrambleHandle
            ? Math.round(fromHandleLen + (targetHandleLen - fromHandleLen) * p)
            : targetHandleLen;
          const settledHandle = settledAll - label.length;
          for (let i = 0; i < handleLen; i++) {
            const settled =
              !scrambleHandle || (i < settledHandle && i < targetHandleLen);
            s += settled ? (handle[i] ?? '') : pick(handle[i] ?? 'a');
          }

          shown.current = s;
          setText(s);
        }
        raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    },
    [duration, label, handle, scramble]
  );

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const reveal = () => canHover.current && animateTo(full);
  const hide = () => canHover.current && animateTo(label);

  return (
    <a
      href={href}
      className="socialLink"
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} ${handle}`}
      onMouseEnter={reveal}
      onMouseLeave={hide}
      onFocus={reveal}
      onBlur={hide}
    >
      <span aria-hidden="true">
        {text.slice(0, label.length)}
        <span className="socialHandle">{text.slice(label.length)}</span>
      </span>
    </a>
  );
}
