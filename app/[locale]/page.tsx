import CursorDoodle from '@/components/Cursor';
import Loading from '@/components/Loading';
import { site, tr } from '@/content/site';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

type Params = { params: Promise<{ locale: string }> };

async function Home({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <section className="intro">
        <h1>{site.name}</h1>
        <h2> {tr(site.tagline, locale)}</h2>
      </section>
      <section className="section">
        <CursorDoodle />
      </section>
    </main>
  );
}

export default function HomePage({ params }: Params) {
  return (
    <Suspense fallback={<Loading />}>
      <Home params={params} />
    </Suspense>
  );
}
