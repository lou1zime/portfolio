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
  cover: { src: string; width: number; height: number }; // path under /public
  images: string[]; // extra images on the project page
  links: { label: string; href: string }[];
};

// Years marked "TODO" are my best guess: check them against your own timeline.
export const projects: Project[] = [
  // ---------- 2026 ----------
  {
    slug: 'yoga-studio-app',
    title: 'Banteay',
    year: '2026',
    role: { en: 'Solo', fr: 'En solo' },
    summary: {
      en: 'A booking and management app for a yoga studio in Cambodia.',
      fr: 'Une application de réservation et de gestion pour le studio de yoga au Cambodge.',
    },
    description: {
      en: 'A side project inspired by Momoyoga, built for an independent yoga business in Cambodia. It handles classes and bookings, with simple sign-in through OAuth providers. There are no online payments: the app only keeps track of the money that is expected and the money that has been collected, so nothing gets lost.',
      fr: 'Un projet personnel inspiré de Momoyoga, conçu pour une entreprise de yoga indépendante au Cambodge. Il gère les cours et les réservations, avec une connexion simple via des fournisseurs OAuth. Il n’y a pas de paiement en ligne : l’application suit seulement l’argent attendu et l’argent encaissé, pour que rien ne se perde.',
    },
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'TypeScript'],
    cover: { src: '/projects/covers/banteay.png', width: 500, height: 500 },
    images: [],
    links: [],
  },
  {
    // remove?
    slug: 'legacy-todo',
    title: 'legacy',
    year: '2026',
    role: { en: 'EPITECH project', fr: 'Projet EPITECH' },
    summary: {
      en: 'Metrics and dashboards for an Express and BullMQ app, all running in Docker.',
      fr: 'Métriques et tableaux de bord pour une application Express et BullMQ, le tout dans Docker.',
    },
    description: {
      en: 'A school project built around an event-driven todo app: an Express API, a Redis-backed BullMQ queue for notifications, a separate worker and a MySQL database. We added observability to it, with metrics exposed to Prometheus and a Grafana dashboard, everything running in Docker Compose, and wrote an architecture decision record explaining the choices.',
      fr: 'Un projet d’école autour d’une application de todo pilotée par les événements : une API Express, une file BullMQ sur Redis pour les notifications, un worker séparé et une base MySQL. J’y ai ajouté de l’observabilité, avec des métriques exposées à Prometheus et un tableau de bord Grafana, le tout dans Docker Compose, et j’ai rédigé un ADR qui explique les choix.',
    },
    stack: [
      'Node.js',
      'Express',
      'BullMQ',
      'Redis',
      'MySQL',
      'Prometheus',
      'Grafana',
      'Docker',
    ],
    cover: {
      src: '/projects/covers/observability.jpg',
      width: 500,
      height: 500,
    },
    images: [],
    links: [],
  },

  // ---------- 2025 ----------
  {
    slug: 'gnoland-dapps',
    title: '*gno.land dApps',
    year: '2025',
    role: {
      en: 'Junior developer (remote)',
      fr: 'Développeuse junior (à distance)',
    },
    summary: {
      en: 'Designed and tested decentralised application concepts on the open-source gno.land blockchain.',
      fr: 'Conception et test de concepts d’applications décentralisées sur la blockchain open source gno.land.',
    },
    description: {
      en: 'From April to July 2025 I worked fully remotely for All In Bits, the Berlin company behind gno.land and New Tendermint. I designed and tested concepts for decentralised applications (dApps) on gno.land, an open-source blockchain platform.',
      fr: 'D’avril à juillet 2025, j’ai travaillé entièrement à distance pour All In Bits, l’entreprise berlinoise derrière gno.land et New Tendermint. J’y ai conçu et testé des concepts d’applications décentralisées (dApps) sur gno.land, une plateforme blockchain open source.',
    },
    stack: ['Gno'],
    cover: { src: '/projects/covers/gnoland.jpg', width: 500, height: 500 },
    images: [],
    links: [],
  },

  // ---------- 2024 ----------
  {
    slug: 'glados',
    title: 'GLaDOS',
    year: '2024', // TODO: confirm
    role: { en: 'EPITECH team project', fr: 'Projet d’équipe EPITECH' },
    summary: {
      en: 'A programming language and the tools to run it, written in Haskell.',
      fr: 'Un langage de programmation et les outils pour l’exécuter, écrits en Haskell.',
    },
    description: {
      en: 'GLaDOS is an EPITECH project where the team designs its own programming language and writes the tooling around it, entirely in Haskell.',
      fr: 'GLaDOS est un projet EPITECH où l’équipe conçoit son propre langage de programmation et écrit les outils qui l’accompagnent, entièrement en Haskell.',
    },
    stack: ['Haskell'],
    cover: { src: '/projects/covers/glados.png', width: 500, height: 500 },
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/MartinFillon/glados' },
      {
        label: 'Gitbook',
        href: 'https://zhifters-organization.gitbook.io/maryl',
      },
    ],
  },
  {
    slug: 'zappy',
    title: 'Zappy',
    year: '2024', // TODO: confirm
    role: { en: 'EPITECH team project', fr: 'Projet d’équipe EPITECH' },
    summary: {
      en: 'A multiplayer network game with a server.',
      fr: 'Un jeu réseau multijoueur avec un serveur.',
    },
    description: {
      en: 'Zappy is an EPITECH team project: a network game built around a server written in C, played by clients connecting to it.',
      fr: 'Zappy est un projet d’équipe EPITECH : un jeu réseau construit autour d’un serveur écrit en C, auquel se connectent les clients.',
    },
    stack: ['C', 'Rust'],
    cover: { src: '/projects/covers/zappy.png', width: 500, height: 500 },
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/MartinFillon/Zappy' }],
  },
  {
    slug: 'bruteforce',
    title: 'BruteForce',
    year: '2024', // TODO: confirm
    role: { en: 'R&D developer', fr: 'Développeuse R&D' },
    summary: {
      en: 'An open-source Go project built at PoC Innovation.',
      fr: 'Un projet open source en Go réalisé à PoC Innovation.',
    },
    description: {
      en: 'Built as a member of PoC Innovation, EPITECH’s R&D lab, as part of its open-source work. Written in Go.',
      fr: 'Réalisé en tant que membre de PoC Innovation, le laboratoire R&D d’EPITECH, dans le cadre de ses projets open source. Écrit en Go.',
    },
    stack: ['Go'],
    cover: { src: '/projects/covers/bruteforce.png', width: 500, height: 500 },
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/PoCInnovation/BruteForce' },
    ],
  },

  // ---------- 2023 ----------
  {
    slug: 'rust-reverse-proxy',
    title: '*Rust reverse proxy migration',
    year: '2023',
    role: { en: 'Intern developer', fr: 'Développeuse, stagiaire' },
    summary: {
      en: 'Refactored the Bastion communication layer and migrated it to a Rust HTTP(S) reverse proxy.',
      fr: 'Refonte de la couche de communication du Bastion et migration vers un proxy HTTP(S) inverse en Rust.',
    },
    description: {
      en: 'During my internship at WALLIX in Paris, from September to December 2023, I refactored the communication layer of the Bastion and migrated it to a reverse HTTP(S) proxy written in Rust. I built the initial proof of concept on my own.',
      fr: 'Pendant mon stage chez WALLIX à Paris, de septembre à décembre 2023, j’ai refondu la couche de communication du Bastion et l’ai migrée vers un proxy HTTP(S) inverse écrit en Rust. J’ai réalisé seule la preuve de concept initiale.',
    },
    stack: ['Rust'],
    cover: { src: '/projects/covers/wallix.png', width: 775, height: 205 },
    images: [],
    links: [],
  },
  {
    slug: 'corewar',
    title: 'Corewar',
    year: '2023', // TODO: confirm
    role: { en: 'EPITECH team project', fr: 'Projet d’équipe EPITECH' },
    summary: {
      en: 'An assembler and a virtual machine for the Corewar programming game, in C.',
      fr: 'Un assembleur et une machine virtuelle pour le jeu de programmation Corewar, en C.',
    },
    description: {
      en: 'Corewar is an EPITECH team project built around the classic programming game where small programs fight for control of a virtual machine. Written in C.',
      fr: 'Corewar est un projet d’équipe EPITECH autour du jeu de programmation classique où de petits programmes se battent pour le contrôle d’une machine virtuelle. Écrit en C.',
    },
    stack: ['C'],
    cover: { src: '/projects/covers/corewar.png', width: 320, height: 350 },
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/MartinFillon/Corewar' },
    ],
  },
  {
    slug: '42zsh',
    title: '42zsh',
    year: '2023', // TODO: confirm
    role: { en: 'EPITECH team project', fr: 'Projet d’équipe EPITECH' },
    summary: {
      en: 'A Unix shell written in C.',
      fr: 'Un shell Unix écrit en C.',
    },
    description: {
      en: 'A command-line shell written in C as an EPITECH team project.',
      fr: 'Un shell en ligne de commande écrit en C, dans le cadre d’un projet d’équipe EPITECH.',
    },
    stack: ['C'],
    cover: { src: '/projects/covers/42zsh.png', width: 500, height: 500 },
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/MartinFillon/42zsh' }],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
