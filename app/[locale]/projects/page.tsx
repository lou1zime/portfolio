import ProjectList from '@/components/ProjectList';
import { useTranslations } from 'next-intl';

export const metadata = { title: 'Work' };

export default function Projects() {
  const t = useTranslations('projects');

  return (
    <main className="section">
      <h1>{t('title')}</h1>
      <ProjectList />
    </main>
  );
}
