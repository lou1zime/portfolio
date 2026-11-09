import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { projects, tr, type Project } from '@/content/projects';
import '@/app/[locale]/projects/project.css';

export default function ProjectList() {
  const locale = useLocale();

  // Group by year, newest year first. Remove the .sort() if you'd rather keep
  // the order you wrote the projects in (they are still grouped when years match).
  const groups = new Map<string, Project[]>();
  for (const p of [...projects].sort(
    (a, b) => Number(b.year) - Number(a.year)
  )) {
    groups.set(p.year, [...(groups.get(p.year) ?? []), p]);
  }

  return (
    <div>
      {[...groups].map(([year, items]) => (
        <section key={year} className="yearGroup">
          <h3 className="yearLabel">{year}</h3>
          <ul className="yearProjects">
            {items.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="projectRow">
                  <span className="projectTitle">{p.title}</span>
                  <span className="projectSummary">
                    {tr(p.summary, locale)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
