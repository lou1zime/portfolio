import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProject, projects, tr } from '@/content/projects';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Suspense } from 'react';
import '@/app/project.css';
import ProjectLink from '@/components/ProjectLink';

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  return { title: getProject(slug)?.title ?? 'Project' };
}

async function ProjectContent({ params }: Params) {
  const t = await getTranslations('projects');

  const { locale, slug } = await params;
  setRequestLocale(locale);

  const p = getProject(slug);
  if (!p) notFound();

  return (
    <main className="page">
      <h1>{p.title}</h1>
      <div className="meta">
        <span>{p.year}</span>
        <span>{tr(p.role, locale)}</span>
        <span>{p.stack.join(', ')}</span>
      </div>

      {p.cover && (
        <div className="cover">
          <Image
            src={p.cover.src}
            alt="Cover"
            width={p.cover.width}
            height={p.cover.height}
          />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 className="">{tr(p.summary, locale)}</h2>
        <p className="prose">{tr(p.description, locale)}</p>
      </div>

      {p.links.length > 0 && (
        <div className="links">
          {p.links.map((l) => (
            <ProjectLink
              key={l.href}
              href={l.href}
              label={l.label === 'GitHub' ? t('sourceCode') : l.label}
            />
          ))}
        </div>
      )}

      <div style={{ marginTop: 48 }}>
        {p.images.map((src) => (
          <div key={src} className="shot">
            <Image src={src} alt="" fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default function ProjectPage({ params }: Params) {
  return (
    <Suspense fallback={<div className="page">Loading project...</div>}>
      <ProjectContent params={params} />
    </Suspense>
  );
}
