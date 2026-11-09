import { useLocale, useTranslations } from 'next-intl';
import { getProject, tr } from '@/content/projects';
import type { Entry } from '@/content/experience';
import ScrambleLink from './ScrambleLink';
import '@/app/[locale]/projects/work.css';

export default function Timeline({ entries }: { entries: Entry[] }) {
  const locale = useLocale();
  const t = useTranslations('work');

  return (
    <ul>
      {entries.map((e) => {
        // unknown slugs are ignored, so a typo can't break the page
        const related = (e.projects ?? []).flatMap((slug) => {
          const p = getProject(slug);
          return p ? [p] : [];
        });

        return (
          <li key={e.org + e.period.en} className="timelineRow">
            <p className="timelinePeriod">{tr(e.period, locale)}</p>
            <div>
              <h3 className="timelineTitle">
                {e.org}
                {e.current && (
                  <span
                    className="timelineStatus"
                    aria-label="Current position"
                    title="Current position"
                  />
                )}
              </h3>
              <p className="timelineRole">
                {tr(e.role, locale)} · {tr(e.place, locale)}
              </p>
              {e.description && (
                <p className="timelineText">{tr(e.description, locale)}</p>
              )}

              {related.length > 0 && (
                <p className="timelineRelated">
                  <span>{t('related')}</span>
                  {related.map((p) => (
                    <ScrambleLink
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      label={p.title}
                      className="timelineLink"
                    >
                      <span aria-hidden="true"></span>
                    </ScrambleLink>
                  ))}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
