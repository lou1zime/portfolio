'use client';

import { useState, type ReactNode } from 'react';

export type WorkKey = 'projects' | 'experience' | 'education';
const KEYS: WorkKey[] = ['projects', 'experience', 'education'];

type Props = {
  initial: WorkKey; // which section starts open (from ?list=... in the URL)
  labels: Record<WorkKey, string>; // big title of each section
  counts: Record<WorkKey, number>; // small number shown next to each title
  panels: Record<WorkKey, ReactNode>; // the three lists, rendered on the server
};

// Three big rows that are always visible: Projects, Experience, Education.
// Click a row to open its list (one open at a time) and click again to close it.
export default function WorkAccordion({
  initial,
  labels,
  counts,
  panels,
}: Props) {
  const [open, setOpen] = useState<WorkKey | null>(initial);
  const [prevInitial, setPrevInitial] = useState(initial);

  if (initial !== prevInitial) {
    setPrevInitial(initial);
    setOpen(initial);
  }

  const toggle = (key: WorkKey) => {
    const next = open === key ? null : key;
    setOpen(next);

    // keep the address in sync so a section can be linked directly
    const url = new URL(window.location.href);
    if (next === 'experience' || next === 'education')
      url.searchParams.set('list', next);
    else url.searchParams.delete('list');
    window.history.replaceState(null, '', url);
  };

  return (
    <div className="acc">
      {KEYS.map((k) => {
        const isOpen = open === k;
        return (
          <section key={k} className="accItem">
            <h2 className="accHead">
              <button
                type="button"
                className="accBtn"
                aria-expanded={isOpen}
                aria-controls={`acc-${k}`}
                onClick={() => toggle(k)}
              >
                <span className="accTitle">{labels[k]}</span>
                <sup className="accCount">{counts[k]}</sup>
                <span className="accIcon" aria-hidden="true" />
              </button>
            </h2>

            {/* inert = closed sections can't be tabbed into */}
            <div
              id={`acc-${k}`}
              className={`accPanel ${isOpen ? 'open' : ''}`}
              inert={!isOpen}
            >
              <div className="accInner">{panels[k]}</div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
