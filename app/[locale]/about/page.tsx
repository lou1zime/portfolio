import { getTranslations, setRequestLocale } from 'next-intl/server';
import './about.css';

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <main className="page aboutPage">
      <div>
        <h1>{t('title')}</h1>
        <p className="prose" style={{ marginTop: 24 }}>
          {t('body')}
        </p>
      </div>
    </main>
  );
}
