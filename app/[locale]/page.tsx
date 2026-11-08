import CursorDoodle from '@/components/Cursor';
import { site, tr } from '@/content/site';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

type Params = { params: Promise<{ locale: string }> };

async function Home({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <main>
      <section className="intro">
        <h1>{site.name}</h1>
        <h2> {tr(site.tagline, locale)}</h2>
        <a className="status" href={`mailto:${site.email}`}>
          <span className="statusDot" aria-hidden="true" />
          {t('status')}
        </a>
      </section>
      <section className="section">
        <CursorDoodle />
      </section>
    </main>
  );
}

export default function HomePage({ params }: Params) {
  return (
    <Suspense fallback={<div className="page">Loading...</div>}>
      <Home params={params} />
    </Suspense>
  );
}
