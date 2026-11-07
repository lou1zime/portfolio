import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProject, projects, tr } from '@/content/projects';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Suspense } from 'react';

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

      <div className="cover">
        <Image src={p.cover} alt="Cover" width={750} height={200} />
      </div>

      <p className="prose">{tr(p.description, locale)}</p>

      {p.links.length > 0 && (
        <div className="links">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
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
