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
  cover: { src: string; width: number; height: number } | null; // path under /public
  images: string[]; // extra images on the project page
  links: { label: string; href: string }[];
  inProgress: boolean;
};

export const projects: Project[] = [
  // ---------- 2026 ----------
  {
    slug: 'portfolio',
    title: 'Portfolio',
    year: '2026',
    role: { en: 'Solo', fr: 'En solo' },
    summary: {
      en: 'A multilingual personal engineering portfolio.',
      fr: 'Un portfolio d’ingénierie personnel multilingue.',
    },
    description: {
      en: 'A high-performance, multilingual personal engineering portfolio built with Next.js 16 App Router, React 19, and Tailwind CSS v4. It features fluid GSAP animations, custom theme toggles, and seamless internationalization routing.',
      fr: 'Un portfolio d’ingénierie personnel multilingue et haute performance construit avec Next.js 16 App Router, React 19 et Tailwind CSS v4. Il intègre des animations GSAP fluides, des thèmes personnalisés et un routage internationalisé.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'GSAP'],
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/lou1zime/portfolio' }],
    inProgress: true,
  },
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
    cover: null,
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/lou1zime/banteay-class' },
    ],
    inProgress: true,
  },
  {
    slug: 'play-sync',
    title: 'Play Sync',
    year: '2025',
    role: { en: 'Personal project', fr: 'Projet personnel' },
    summary: {
      en: 'A music synchronization tool with a unified UI to transfer tracks between streaming services via OAuth2.',
      fr: 'Un outil de synchronisation musicale avec une interface unifiée pour transférer des morceaux entre services via OAuth2.',
    },
    description: {
      en: 'An application written in Go providing a unified interface for music streaming services, allowing users to mutually sync data and transfer music playlists between platforms using OAuth2.',
      fr: 'Une application écrite en Go offrant une interface unifiée pour les services de streaming musical, permettant de synchroniser des données et de transférer de la musique entre plateformes via OAuth2.',
    },
    stack: ['Go'],
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/lou1zime/play-sync' }],
    inProgress: true,
  },

  // ---------- 2025 ----------
  {
    slug: 'area',
    title: 'AREA',
    year: '2025',
    role: { en: 'EPITECH team project', fr: 'Projet d’équipe EPITECH' },
    summary: {
      en: 'An automation platform inspired by IFTTT, connecting various services and triggers.',
      fr: 'Une plateforme d’automatisation inspirée d’IFTTT, connectant divers services et déclencheurs.',
    },
    description: {
      en: 'AREA is an EPITECH project consisting of a web and mobile application that lets users create automated workflows (Action-Reaction chains) between different services like weather, mail, and social platforms.',
      fr: 'AREA est un projet EPITECH composé d’une application web et mobile permettant aux utilisateurs de créer des flux de travail automatisés (chaînes Action-Réaction) entre différents services.',
    },
    stack: ['TypeScript', 'React', 'Node.js', 'Docker'],
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/lou1zime/area' }],
    inProgress: false,
  },
  {
    slug: 'gnoland-dapps',
    title: 'gno.land dApps',
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
    cover: null,
    images: [],
    links: [
      {
        label: 'Contributions',
        href: 'https://github.com/gnolang/gno/pulls?q=is%3Apr+state%3Aclosed+author%3Alou1zime',
      },
    ],
    inProgress: false,
  },

  // ---------- 2024 ----------
  {
    slug: 'glados',
    title: 'GLaDOS',
    year: '2024',
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
    cover: null,
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/MartinFillon/glados' },
      {
        label: 'Gitbook',
        href: 'https://zhifters-organization.gitbook.io/maryl',
      },
    ],
    inProgress: false,
  },
  {
    slug: 'zappy',
    title: 'Zappy',
    year: '2024',
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
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/MartinFillon/Zappy' }],
    inProgress: false,
  },
  {
    slug: 'bruteforce',
    title: 'BruteForce Next-Gen',
    year: '2024',
    role: { en: 'R&D developer', fr: 'Développeuse R&D' },
    summary: {
      en: 'A Go-based bruteforcer using advanced wordlists for web server reconnaissance.',
      fr: 'Un outil de bruteforce en Go utilisant des wordlists avancées pour la reconnaissance de serveurs web.',
    },
    description: {
      en: 'Developed as a member of PoC Innovation, EPITECH’s R&D lab. A Go application built to perform advanced server reconnaissance and security testing using customized wordlists.',
      fr: 'Réalisé au sein de PoC Innovation, le lab R&D d’EPITECH. Une application en Go conçue pour effectuer des tests de reconnaissance et de sécurité sur des serveurs web à l’aide de wordlists avancées.',
    },
    stack: ['Go'],
    cover: null,
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/PoCInnovation/BruteForce' },
    ],
    inProgress: false,
  },
  {
    slug: 'workshop-rust',
    title: 'Workshop Rust',
    year: '2024',
    role: { en: 'ASTEK workshop', fr: "Workshop en tant qu'ASTEK" },
    summary: {
      en: 'Exercises and learning materials focused on the Rust programming language.',
      fr: "Exercices et supports d'apprentissage axés sur le langage de programmation Rust.",
    },
    description: {
      en: 'GitHub repository structured as a workshop containing step-by-step code examples and exercises designed for learning systems programming concepts in Rust (such as ownership, borrowing, lifetimes, and pattern matching).',
      fr: "Dépôt GitHub structuré sous forme d'atelier contenant des exemples de code progressifs et des exercices conçus pour assimiler les concepts de programmation système de Rust (comme l'ownership, le borrowing et les durées de vie).",
    },
    stack: ['Rust'],
    cover: null,
    images: [],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/MartinFillon/Workshop-rust',
      },
    ],
    inProgress: false,
  },
  {
    slug: 'feed-the-beast',
    title: 'Feed the Beast',
    year: '2024',
    role: { en: 'EPITECH team project', fr: 'Projet d’équipe EPITECH' },
    summary: {
      en: 'A custom recode of the strace system call tracer written in C.',
      fr: 'Un recodage personnalisé du traceur d’appels système strace en C.',
    },
    description: {
      en: 'An EPITECH team project built in a group of two, consisting of a custom recode of the system call tracer strace written in C.',
      fr: 'Un projet d’équipe EPITECH réalisé en binôme, consistant à recoder l’outil de traçage d’appels système strace en C.',
    },
    stack: ['C'],
    cover: null,
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/lou1zime/feed-the-beast' },
    ],
    inProgress: false,
  },
  {
    slug: 'pandoc',
    title: 'Pandoc Tools',
    year: '2024',
    role: { en: 'EPITECH team project', fr: 'Projet d’équipe EPITECH' },
    summary: {
      en: 'A document conversion pipeline from Markdown to XML and JSON in Haskell.',
      fr: 'Un flux de conversion de documents de Markdown vers XML et JSON en Haskell.',
    },
    description: {
      en: 'An EPITECH project designed to handle document conversion pipelines from Markdown to XML and JSON, written entirely in Haskell.',
      fr: 'Un projet EPITECH conçu pour gérer des flux de conversion de documents de Markdown vers XML et JSON, entièrement écrit en Haskell.',
    },
    stack: ['Haskell'],
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/lou1zime/pandoc' }],
    inProgress: false,
  },
  {
    slug: 'choco-bueno',
    title: 'Choco Bueno',
    year: '2024',
    role: { en: 'EPITECH project', fr: 'Projet EPITECH' },
    summary: {
      en: 'Originally called Chocolatine, an EPITECH project for learning DevOps and GitHub Actions.',
      fr: 'Initialement appelé Chocolatine, un projet EPITECH pour apprendre le DevOps et GitHub Actions.',
    },
    description: {
      en: 'An EPITECH project originally named Chocolatine, created to learn DevOps workflows, CI/CD pipelines, and GitHub Actions automation.',
      fr: 'Un projet EPITECH initialement nommé Chocolatine, créé pour apprendre les flux DevOps, les pipelines CI/CD et les automatisations GitHub Actions.',
    },
    stack: ['GitHub Actions', 'DevOps'],
    cover: null,
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/lou1zime/choco-bueno' },
    ],
    inProgress: false,
  },

  // ---------- 2023 ----------
  {
    slug: 'rust-reverse-proxy',
    title: 'Rust reverse proxy migration',
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
    cover: null,
    images: [],
    links: [],
    inProgress: false,
  },
  {
    slug: 'corewar',
    title: 'Corewar',
    year: '2023',
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
    cover: null,
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/MartinFillon/Corewar' },
    ],
    inProgress: false,
  },
  {
    slug: '42zsh',
    title: '42zsh',
    year: '2023',
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
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/MartinFillon/42zsh' }],
    inProgress: false,
  },
  {
    slug: 'shakshuka',
    title: 'Shakshuka',
    year: '2023',
    role: { en: 'Personal project', fr: 'Projet personnel' },
    summary: {
      en: 'A web server project written in Rust, inspired by Rouille.',
      fr: 'Un projet de serveur web écrit en Rust, inspiré de Rouille.',
    },
    description: {
      en: 'A web application written in Rust, inspired by the Rouille micro-web framework and featuring Arabic UI elements as a creative exploration.',
      fr: 'Une application web écrite en Rust, inspirée du framework Rouille, avec une exploration créative d’éléments d’interface en arabe.',
    },
    stack: ['Rust'],
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/lou1zime/shakshuka' }],
    inProgress: false,
  },
  {
    slug: 'garage-poc',
    title: 'Garage PoC',
    year: '2023',
    role: { en: 'R&D developer', fr: 'Développeuse R&D' },
    summary: {
      en: 'A proof of concept exploring distributed storage or garage management systems.',
      fr: 'Une preuve de concept explorant les systèmes de stockage distribué ou de gestion.',
    },
    description: {
      en: 'An experimental proof of concept focused on distributed object storage or backend system architecture.',
      fr: 'Une preuve de concept expérimentale axée sur le stockage d’objets distribués ou l’architecture de systèmes backend.',
    },
    stack: ['Rust', 'Docker'],
    cover: null,
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/lou1zime/garage_poc' },
    ],
    inProgress: false,
  },
  {
    slug: 'type-tier',
    title: 'Type Tier',
    year: '2023',
    role: { en: 'Personal project', fr: 'Projet personnel' },
    summary: {
      en: 'A MonkeyType-inspired typing website built as a first web development project.',
      fr: 'Une application web inspirée de MonkeyType conçue comme premier projet de développement web.',
    },
    description: {
      en: 'A MonkeyType-inspired typing website built as a first exploration to learn full-stack web development.',
      fr: 'Un site de dactylographie inspiré de MonkeyType développé comme première exploration pour apprendre le développement web.',
    },
    stack: ['TypeScript', 'React'],
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/lou1zime/type-tier' }],
    inProgress: false,
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
