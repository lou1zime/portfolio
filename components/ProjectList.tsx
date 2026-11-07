import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { projects, tr } from '@/content/projects';

export default function ProjectList() {
  const locale = useLocale();

  return (
    <ul>
      {projects.map((p) => (
        <li key={p.slug}>
          <Link href={`/projects/${p.slug}`} className="projectRow">
            <span className="projectTitle">{p.title}</span>
            <span className="projectSummary">{tr(p.summary, locale)}</span>
            <span className="projectYear">{p.year}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
