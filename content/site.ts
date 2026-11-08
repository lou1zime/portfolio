export type Locale = 'en' | 'fr';
export type Localized = Record<Locale, string>;

export const tr = (value: Localized, locale: string) =>
  value[locale as Locale] ?? value.en;

export const site = {
  name: 'Lou Onézime',
  tagline: { en: 'Developer', fr: 'Développeuse' },
  email: 'lou.onezime@epitech.eu',
  socials: [
    {
      label: 'email',
      handle: ':lou.onezime@epitech.eu',
      href: 'mailto:lou.onezime@epitech.eu',
    },
    {
      label: 'github',
      handle: '/lou1zime',
      href: 'https://github.com/lou1zime',
    },
    {
      label: 'linkedin',
      handle: '/lou-onezime',
      href: 'https://www.linkedin.com/in/lou-onezime/',
    },
  ],
};
