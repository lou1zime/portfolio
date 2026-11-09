import HiddenPage from '@/components/Hidden';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import './globals.css';

async function NotFound() {
  const t = await getTranslations('error');
  return <HiddenPage message={t('not-found')} />;
}

export default async function NotFoundPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NotFound />
    </Suspense>
  );
}
