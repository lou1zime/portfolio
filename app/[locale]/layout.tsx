import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import { routing } from '@/i18n/routing';
import { site } from '@/content/site';
import { cookies } from 'next/headers';
import SiteFooter from '@/components/SiteFooter';
import '../globals.css';
import '../navbar.css';
import '../footer.css';

export const instant = false;

const font = localFont({
  src: [
    {
      path: '../fonts/AlteHaasGroteskRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/AlteHaasGroteskBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<Props, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: site.name, description: t('tagline') };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const jar = await cookies();
  const theme = jar.get('theme')?.value;
  const palette = jar.get('palette')?.value;

  const initialTheme = theme === 'dark' || theme === 'light' ? theme : 'light';
  const initialPalette = palette === 'color';

  return (
    <html
      lang={locale}
      data-theme={theme === 'light' || theme === 'dark' ? theme : undefined}
      data-palette={palette === 'plain' ? undefined : 'color'}
      suppressHydrationWarning
    >
      <head>
        <template dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={font.className}>
        <NextIntlClientProvider>
          <Navbar initialPalette={initialPalette} initialTheme={initialTheme} />
          {children}
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
