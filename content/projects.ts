// Add a project = add one object here + drop images in /public/projects/<slug>/.
// Text that readers see is written once per language: { en: '...', fr: '...' }.
export type Locale = 'en' | 'fr';
export type Localized = Record<Locale, string>;

// pick the right language, falling back to English
export const tr = (value: Localized, locale: string) =>
  value[locale as Locale] ?? value.en;

export type Project = {
  slug: string; // used in the URL: /projects/<slug>
  title: string; // same in both languages (change to Localized if you want it translated)
  year: string;
  role: Localized;
  summary: Localized; // one line, shown in the list
  description: Localized; // longer text on the project page
  stack: string[];
  cover: string; // path under /public
  images: string[]; // extra images on the project page
  links: { label: string; href: string }[];
  mosh?: 'subtle' | 'glitch' | 'melt'; // look of the cover effect
};

export const projects: Project[] = [
  {
    slug: 'rust-reverse-proxy',
    title: 'Rust reverse proxy migration',
    year: '2025',
    role: { en: 'Engineer', fr: 'Ingénieur' },
    summary: {
      en: 'Replace this with one line on what you built and why it mattered.',
      fr: 'Remplace ceci par une ligne sur ce que tu as construit et pourquoi.',
    },
    description: {
      en: 'Replace this with the story: the problem, what you did, what changed.',
      fr: 'Remplace ceci par l’histoire : le problème, ce que tu as fait, ce qui a changé.',
    },
    stack: ['Rust'],
    cover: '/projects/rust-reverse-proxy/cover.jpg',
    images: [],
    links: [],
    mosh: 'glitch',
  },
  {
    slug: 'gnoland-dapps',
    title: 'gno.land dApps',
    year: '2024',
    role: { en: 'Remote engineer', fr: 'Ingénieur en télétravail' },
    summary: {
      en: 'Replace this with one line.',
      fr: 'Remplace ceci par une ligne.',
    },
    description: {
      en: 'Replace this with the story.',
      fr: 'Remplace ceci par l’histoire.',
    },
    stack: ['Gno', 'TypeScript'],
    cover: '/projects/gnoland-dapps/cover.jpg',
    images: [],
    links: [],
    mosh: 'melt',
  },
  {
    slug: 'yoga-studio-app',
    title: 'Yoga studio booking app',
    year: '2026',
    role: { en: 'Solo', fr: 'En solo' },
    summary: {
      en: 'Replace this with one line.',
      fr: 'Remplace ceci par une ligne.',
    },
    description: {
      en: 'Replace this with the story.',
      fr: 'Remplace ceci par l’histoire.',
    },
    stack: ['Next.js', 'Prisma', 'TypeScript'],
    cover: '/projects/yoga-studio-app/cover.jpg',
    images: [],
    links: [],
    mosh: 'subtle',
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
