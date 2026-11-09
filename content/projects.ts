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
};

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
    cover: null,
    // cover: { src: '/projects/covers/banteay.png', width: 400, height: 400 },
    // images: ['/projects/covers/banteay.png'],
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/lou1zime/banteay-class' },
    ],
  },
  {
    slug: 'play-sync',
    title: 'Play Sync',
    year: '2025',
    role: { en: 'Personal project', fr: 'Projet personnel' },
    summary: {
      en: 'A real-time synchronization tool for media or playback.',
      fr: 'Un outil de synchronisation en temps réel pour les médias ou la lecture.',
    },
    description: {
      en: 'A real-time synchronization application designed to coordinate media playback or state sharing across multiple clients.',
      fr: 'Une application de synchronisation en temps réel conçue pour coordonner la lecture multimédia ou le partage d’état entre plusieurs clients.',
    },
    stack: ['TypeScript', 'Node.js', 'WebSockets'],
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/lou1zime/play-sync' }],
  },
  // {
  //   // remove?
  //   slug: 'legacy-todo',
  //   title: 'legacy',
  //   year: '2026',
  //   role: { en: 'EPITECH project', fr: 'Projet EPITECH' },
  //   summary: {
  //     en: 'Metrics and dashboards for an Express and BullMQ app, all running in Docker.',
  //     fr: 'Métriques et tableaux de bord pour une application Express et BullMQ, le tout dans Docker.',
  //   },
  //   description: {
  //     en: 'A school project built around an event-driven todo app: an Express API, a Redis-backed BullMQ queue for notifications, a separate worker and a MySQL database. We added observability to it, with metrics exposed to Prometheus and a Grafana dashboard, everything running in Docker Compose, and wrote an architecture decision record explaining the choices.',
  //     fr: 'Un projet d’école autour d’une application de todo pilotée par les événements : une API Express, une file BullMQ sur Redis pour les notifications, un worker séparé et une base MySQL. J’y ai ajouté de l’observabilité, avec des métriques exposées à Prometheus et un tableau de bord Grafana, le tout dans Docker Compose, et j’ai rédigé un ADR qui explique les choix.',
  //   },
  //   stack: [
  //     'Node.js',
  //     'Express',
  //     'BullMQ',
  //     'Redis',
  //     'MySQL',
  //     'Prometheus',
  //     'Grafana',
  //     'Docker',
  //   ],
  //   cover: {
  //     src: '/projects/covers/observability.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   images: [],
  //   links: [],
  // },

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
  },
  {
    slug: 'bruteforce',
    title: 'BruteForce Next-Gen',
    year: '2024',
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
    cover: null,
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/PoCInnovation/BruteForce' },
    ],
  },
  {
    slug: 'workshop-rust',
    title: 'Workshop Rust',
    year: '2024',
    role: { en: 'ASTEK workshop', fr: "Workshop entant qu'ASTEK" },
    summary: {
      en: 'This workshop serves as a personal collection exercises or learning materials focused on the Rust programming language.',
      fr: "Cette atelier est une collectio d'exercices ou de supports d'apprentissage axés sur le langage de programmation Rust.",
    },
    description: {
      en: 'GitHub repository structured as "workshop" containing step-by-step code examples, small projects, or exercises designed for learning systems programming concepts in Rust (such as ownership, borrowing, lifetimes, pattern matching, and cargo configuration).',
      fr: "Dépôt GitHub structuré sous forme d'« atelier » (workshop) contient généralement des exemples de code progressifs, de petits projets ou des exercices conçus pour assimiler les concepts de programmation système de Rust (comme l'ownership, le borrowing, les durées de vie, le filtrage par motif et la configuration de Cargo).",
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
  },
  {
    slug: 'feed-the-beast',
    title: 'Feed the Beast',
    year: '2024',
    role: { en: 'Personal project', fr: 'Projet personnel' },
    summary: {
      en: 'A utility or tracker for managing game resources and progression.',
      fr: 'Un outil utilitaire pour la gestion des ressources de jeu et de la progression.',
    },
    description: {
      en: 'A personal project focused on tracking and organizing resources, automation, or gameplay mechanics.',
      fr: 'Un projet personnel axé sur le suivi et l’organisation de ressources, l’automatisation ou les mécaniques de jeu.',
    },
    stack: ['TypeScript', 'React'],
    cover: null,
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/lou1zime/feed-the-beast' },
    ],
  },
  {
    slug: 'pandoc',
    title: 'Pandoc Tools',
    year: '2024',
    role: { en: 'Personal project', fr: 'Projet personnel' },
    summary: {
      en: 'Custom filters and tooling extensions for Pandoc document conversion.',
      fr: 'Filtres personnalisés et outils d’extension pour la conversion de documents Pandoc.',
    },
    description: {
      en: 'A collection of custom scripts and filters designed to streamline document generation, formatting, and conversion workflows using Pandoc.',
      fr: 'Une collection de scripts et filtres personnalisés conçus pour rationaliser les flux de génération, de formatage et de conversion de documents avec Pandoc.',
    },
    stack: ['Python', 'Lua'],
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/lou1zime/pandoc' }],
  },
  {
    slug: 'choco-bueno',
    title: 'Choco Bueno',
    year: '2024',
    role: { en: 'Personal project', fr: 'Projet personnel' },
    summary: {
      en: 'A fun full-stack web application with an interactive interface.',
      fr: 'Une application web full-stack ludique dotée d’une interface interactive.',
    },
    description: {
      en: 'A playful full-stack project exploring modern web technologies, smooth UI interactions, and clean architecture.',
      fr: 'Un projet full-stack ludique explorant les technologies web modernes, les interactions d’interface fluides et une architecture propre.',
    },
    stack: ['TypeScript', 'React', 'TailwindCSS'],
    cover: null,
    images: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/lou1zime/choco-bueno' },
    ],
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
  },
  {
    slug: 'shakshuka',
    title: 'Shakshuka',
    year: '2023',
    role: { en: 'Personal project', fr: 'Projet personnel' },
    summary: {
      en: 'A cozy web application or tool built with modern full-stack practices.',
      fr: 'Une application web conviviale construite avec des pratiques full-stack modernes.',
    },
    description: {
      en: 'A web application created as a creative playground, combining clean frontend design with robust backend logic.',
      fr: 'Une application web créée comme un terrain de jeu créatif, combinant un design frontend épuré et une logique backend robuste.',
    },
    stack: ['Next.js', 'TypeScript', 'TailwindCSS'],
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/lou1zime/shakshuka' }],
  },
  {
    slug: 'garage-poc',
    title: 'Garage PoC',
    year: '2023',
    role: { en: 'R&D / Personal project', fr: 'Projet R&D / personnel' },
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
  },
  {
    slug: 'type-tier',
    title: 'Type Tier',
    year: '2023',
    role: { en: 'Personal project', fr: 'Projet personnel' },
    summary: {
      en: 'A TypeScript type-level utility library for advanced generic type manipulations.',
      fr: 'Une bibliothèque d’utilitaires au niveau des types TypeScript pour des manipulations génériques avancées.',
    },
    description: {
      en: 'An exploration of advanced TypeScript type system features, implementing type-level data structures, validations, and utility transformations.',
      fr: 'Une exploration des fonctionnalités avancées du système de types TypeScript, implémentant des structures de données, des validations et des transformations utilitaires au niveau des types.',
    },
    stack: ['TypeScript'],
    cover: null,
    images: [],
    links: [{ label: 'GitHub', href: 'https://github.com/lou1zime/type-tier' }],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
