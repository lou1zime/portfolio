import type { Localized } from './projects';

export type Entry = {
  org: string;
  role: Localized;
  place: Localized;
  period: Localized;
  description?: Localized;
  projects?: string[];
  current?: boolean;
};

export const experience: Entry[] = [
  {
    org: 'All In Bits (gno.land, New Tendermint)',
    role: {
      en: 'Junior developer, fully remote',
      fr: 'Développeuse junior, à distance',
    },
    place: { en: 'Berlin, Germany', fr: 'Berlin, Allemagne' },
    period: { en: 'Apr – Jul 2025', fr: 'Avr. – Juil. 2025' },
    description: {
      en: 'Designed and tested concepts for decentralised applications (dApps) on the open-source gno.land blockchain platform.',
      fr: 'Conception et test de concepts d’applications décentralisées (dApps) sur la plateforme blockchain open source gno.land.',
    },
    projects: ['gnoland-dapps'],
  },
  {
    org: 'EPITECH',
    role: { en: 'Technical assistant', fr: 'Assistante technique, stagiaire' },
    place: { en: 'Paris, France', fr: 'Paris, France' },
    period: { en: 'Feb 2024 – Apr 2025', fr: 'Fév. 2024 – Avr. 2025' },
    description: {
      en: 'Technical assistant for first- and second-year students in C/C++, Haskell and Docker.',
      fr: 'Assistante technique pour les étudiants de première et deuxième année en C/C++, Haskell et Docker.',
    },
    projects: ['workshop-rust'],
  },
  {
    org: 'PoC Innovation',
    role: { en: 'R&D developer, member', fr: 'Développeuse R&D, membre' },
    place: { en: 'Paris, France', fr: 'Paris, France' },
    period: { en: 'Mar 2023 – Apr 2025', fr: 'Mars 2023 – Avr. 2025' },
    description: {
      en: 'Development of open-source projects.',
      fr: 'Développement de projets open source.',
    },
    projects: ['bruteforce', 'garage-poc', 'virtual-no-ads'],
  },
  {
    org: 'WALLIX',
    role: { en: 'Developer, intern', fr: 'Développeuse, stagiaire' },
    place: { en: 'Paris, France', fr: 'Paris, France' },
    period: { en: 'Sep – Dec 2023', fr: 'Sept. – Déc. 2023' },
    description: {
      en: 'Refactored the Bastion communication layer and migrated it to a Rust HTTP(S) reverse proxy.',
      fr: 'Refonte de la couche de communication du Bastion et migration vers un proxy HTTP(S) inverse en Rust.',
    },
    projects: ['rust-reverse-proxy'],
  },
];

export const education: Entry[] = [
  {
    org: 'EPITECH',
    role: {
      en: 'Expert title in software engineering (RNCP Level 7)',
      fr: 'Titre d’Expert en ingénierie logicielle (RNCP Niveau 7)',
    },
    place: { en: 'Paris, France', fr: 'Paris, France' },
    period: { en: 'Oct 2022 – Aug 2027', fr: 'Oct. 2022 – Août 2027' },
    description: {
      en: 'Grande École programme (Bac +5).',
      fr: 'Programme Grande École (Bac +5).',
    },
    current: true,
  },
  {
    org: 'Chung-Ang University',
    role: {
      en: 'Exchange year, software department',
      fr: 'Année d’échange au sein du département des logiciels',
    },
    place: { en: 'Seoul, South Korea', fr: 'Séoul, République de Corée' },
    period: { en: 'Sep 2025 – Jun 2026', fr: 'Sept. 2025 – Juin 2026' },
  },
  {
    org: 'Repton',
    role: {
      en: 'International Baccalaureate Diploma',
      fr: 'International Baccalaureate Diploma',
    },
    place: { en: 'Dubai, UAE', fr: 'Dubaï, E.A.U.' },
    period: { en: 'Sep 2020 – May 2022', fr: 'Sept. 2020 – Mai 2022' },
    description: {
      en: 'Specialisation: Information Technology in a Global Society (ITGS), Visual Arts and English Language & Literature. Overall score 38/45, with 7/7 in Maths and ITGS.',
      fr: 'Spécialisation : Technologie de l’Information dans une Société Globale (TISG), Arts Visuels et Anglais Langue & Littérature. Score général 38/45, avec 7/7 en Maths et TISG.',
    },
  },
];
