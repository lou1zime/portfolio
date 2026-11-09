import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProjectList from '@/components/ProjectList';
import Timeline from '@/components/Timeline';
import WorkAccordion, { type WorkKey } from '@/components/WorkAccordion';
import { education, experience } from '@/content/experience';
import { projects } from '@/content/projects';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import './work.css';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ list?: string }>;
};

async function Work({ params, searchParams }: Props) {
  const { locale } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const list = resolvedSearchParams?.list;
  setRequestLocale(locale);
  const t = await getTranslations('work');

  const initial =
    list === 'experience' || list === 'education' || list === 'projects'
      ? (list as WorkKey)
      : null;

  const visibleProjects = projects.filter((p) => !p.hide);

  return (
    <main className="section">
      <h1 className="srOnly">{t('title')}</h1>
      <WorkAccordion
        initial={initial}
        labels={{
          projects: t('projects'),
          experience: t('experience'),
          education: t('education'),
        }}
        counts={{
          projects: visibleProjects.length,
          experience: experience.length,
          education: education.length,
        }}
        panels={{
          projects: <ProjectList />,
          experience: <Timeline entries={experience} />,
          education: <Timeline entries={education} />,
        }}
      />
    </main>
  );
}

export default async function WorkPage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <Work params={params} searchParams={searchParams} />
    </Suspense>
  );
}
