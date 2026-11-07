'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** ms before a line fades out. Infinity keeps everything you draw (Esc clears it). */
  lifetime?: number;
  /** thickness of the line at its thickest, in px */
  width?: number;
  /** thickness of the dark outline around the line, in px */
  outline?: number;
  outlineColor?: string;
  /** colors to cycle through; leave empty for a rainbow */
  colors?: string[];
  /** 'hover' draws whenever the cursor moves, 'press' only while the button is held */
  mode?: 'hover' | 'press';
  /** how bulgy the line is, 0 = smooth, ~0.3 = very blobby */
  wobble?: number;
  /** how tightly the line follows the cursor: 0.05 loose ... 0.4 tight */
  spring?: number;
  /** how bouncy: lower = more overshoot and curls (0.5 - 0.9) */
  damping?: number;
  /** true = covers the whole screen, false = fills its parent (which needs position: relative) */
  fixed?: boolean;
  zIndex?: number;
  className?: string;
};

type Pt = { x: number; y: number; t: number; brk: boolean; color: string };

export default function CursorDoodle({
  lifetime = 1400,
  width = 26,
  outline = 3,
  outlineColor,
  colors,
  mode = 'hover',
  wobble = 0.12,
  spring = 0.16,
  damping = 0.7,
  fixed = true,
  zIndex = 40,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // keep the latest props in a ref so changing them doesn't restart the effect
  const cfg = useRef({
    lifetime,
    width,
    outline,
    outlineColor,
    colors,
    mode,
    wobble,
    spring,
    damping,
  });

  useEffect(() => {
    cfg.current = {
      lifetime,
      width,
      outline,
      outlineColor,
      colors,
      mode,
      wobble,
      spring,
      damping,
    };
  }, [
    lifetime,
    width,
    outline,
    outlineColor,
    colors,
    mode,
    wobble,
    spring,
    damping,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pts: Pt[] = [];
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    let needBreak = true;
    let drawing = false;
    let running = false;
    let raf = 0;

    const colorAt = () => {
      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue('--fg').trim();
      return fg || 'hsl(0, 0%, 5%)';
    };

    const resolveOutlineColor = () => {
      if (cfg.current.outlineColor) return cfg.current.outlineColor;
      const styles = getComputedStyle(document.documentElement);
      const bg = styles.getPropertyValue('--bg').trim();
      return bg || 'hsl(0, 0%, 95%)';
    };

    const mid = (a: Pt, b: Pt) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

    const draw = (now: number) => {
      const { lifetime, width, outline, wobble } = cfg.current;
      const activeOutlineColor = resolveOutlineColor();

      ctx.clearRect(0, 0, w, h);
      const n = pts.length;
      if (n < 3) return;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let pass = 0; pass < 2; pass++) {
        for (let i = 1; i < n - 1; i++) {
          const p = pts[i];
          if (p.brk || pts[i + 1].brk) continue;

          const life = (now - p.t) / lifetime;
          if (life <= 0 || life >= 1) continue;
          const remainingLife = 1 - life;

          let wd = width * Math.pow(remainingLife, 0.6) * (0.3 + 0.7 * (i / n));
          wd *= 1 + Math.sin(i * 0.7 + now * 0.012) * wobble;

          const start = pts[i - 1].brk ? p : mid(pts[i - 1], p);
          const end = mid(p, pts[i + 1]);

          ctx.globalAlpha = Math.min(1, remainingLife * 2);
          ctx.strokeStyle = pass === 0 ? activeOutlineColor : p.color;
          ctx.lineWidth = pass === 0 ? wd + outline * 2 : wd;
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.quadraticCurveTo(p.x, p.y, end.x, end.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      const { spring, damping, lifetime } = cfg.current;

      vel.x = (vel.x + (target.x - pos.x) * spring) * damping;
      vel.y = (vel.y + (target.y - pos.y) * spring) * damping;
      pos.x += vel.x;
      pos.y += vel.y;

      const last = pts[pts.length - 1];
      if (
        drawing &&
        (!last || Math.hypot(pos.x - last.x, pos.y - last.y) > 3)
      ) {
        pts.push({
          x: pos.x,
          y: pos.y,
          t: now,
          brk: needBreak,
          color: colorAt(),
        });
        needBreak = false;
      }

      while (pts.length && now - pts[0].t > lifetime) pts.shift();
      while (pts.length > 3000) pts.shift();

      draw(now);

      const settled = Math.hypot(vel.x, vel.y) < 0.05;
      if (settled && (pts.length === 0 || !isFinite(lifetime))) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      const allowed =
        inside && (cfg.current.mode === 'hover' || (e.buttons & 1) === 1);

      if (!allowed) {
        drawing = false;
        needBreak = true;
        return;
      }
      if (!drawing || needBreak) {
        pos.x = x;
        pos.y = y;
        vel.x = 0;
        vel.y = 0;
      }
      target.x = x;
      target.y = y;
      drawing = true;
      start();
    };

    const stop = () => {
      drawing = false;
      needBreak = true;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        pts.length = 0;
        ctx.clearRect(0, 0, w, h);
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    window.addEventListener('blur', stop);
    window.addEventListener('keydown', onKey);
    document.documentElement.addEventListener('mouseleave', stop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
      window.removeEventListener('blur', stop);
      window.removeEventListener('keydown', onKey);
      document.documentElement.removeEventListener('mouseleave', stop);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex,
      }}
    />
  );
}
