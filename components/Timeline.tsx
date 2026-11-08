import { useLocale } from 'next-intl';
import { tr } from '@/content/projects';
import type { Entry } from '@/content/experience';

export default function Timeline({ entries }: { entries: Entry[] }) {
  const locale = useLocale();

  return (
    <ul>
      {entries.map((e) => (
        <li key={e.org + e.period.en} className="timelineRow">
          <p className="timelinePeriod">{tr(e.period, locale)}</p>
          <div>
            <h3 className="timelineTitle">{e.org}</h3>
            <p className="timelineRole">
              {tr(e.role, locale)} · {tr(e.place, locale)}
            </p>
            {e.description && (
              <p className="timelineText">{tr(e.description, locale)}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
