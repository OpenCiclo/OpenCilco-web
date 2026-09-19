// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Locale } from "@/lib/i18n";

export const MARKETING_LINKS = {
  app: "/app",
  learn: "/learn",
  docs: "/help",
  privacy: "/privacy",
  contact: "/contact",
  github: "https://github.com/OpenCiclo/OpenCilco-web",
  issues: "https://github.com/OpenCiclo/OpenCilco-web/issues",
} as const;

type NavItem = { label: string; href: string; external?: boolean };

type Feature = { icon: string; title: string; body: string };
type Step = { title: string; body: string };
type PhaseLegend = { key: string; label: string };

export type MarketingCopy = {
  brand: string;
  nav: NavItem[];
  openApp: string;
  langToggle: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  preview: {
    cycleDay: string;
    phase: string;
    nextPeriod: string;
    uncertainty: string;
    legend: PhaseLegend[];
    caption: string;
  };
  why: {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: Feature[];
  };
  how: {
    eyebrow: string;
    title: string;
    steps: Step[];
  };
  science: {
    eyebrow: string;
    title: string;
    body: string;
    docsLink: string;
    modelLink: string;
  };
  learn: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  resources: {
    eyebrow: string;
    title: string;
    items: { icon: string; title: string; body: string; href: string; external?: boolean }[];
  };
  finalCta: {
    title: string;
    body: string;
    button: string;
  };
  footer: {
    disclaimer: string;
    license: string;
    links: NavItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    cards: { icon: string; title: string; body: string; action: string; href: string }[];
    privacyNote: string;
    otherTitle: string;
    otherLinks: NavItem[];
  };
};

const es: MarketingCopy = {
  brand: "OpenCiclo",
  nav: [
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Privacidad", href: "#privacidad" },
    { label: "Aprender", href: "/learn" },
    { label: "Documentación", href: "/help" },
    { label: "GitHub", href: MARKETING_LINKS.github, external: true },
    { label: "Contacto", href: "/contact" },
  ],
  openApp: "Abrir la app",
  langToggle: "EN",
  hero: {
    eyebrow: "Código abierto · Privado por diseño",
    title: "Tu ciclo, en tu dispositivo.",
    subtitle:
      "OpenCiclo sigue y pronostica tu ciclo menstrual mientras cifra tu diario en tu propio navegador. Sin anuncios, sin rastreo, sin vender tus datos.",
    disclaimer: "No es un dispositivo médico ni un método anticonceptivo.",
    ctaPrimary: "Abrir la app",
    ctaSecondary: "Ver en GitHub",
  },
  preview: {
    cycleDay: "Día 14 del ciclo",
    phase: "Ovulación estimada",
    nextPeriod: "Próximo periodo en ~14 días",
    uncertainty: "±2 días · incertidumbre baja",
    legend: [
      { key: "menstrual", label: "Menstrual" },
      { key: "follicular", label: "Folicular" },
      { key: "ovulation", label: "Ovulación" },
      { key: "luteal", label: "Lútea" },
    ],
    caption: "Una estimación con su rango, nunca una fecha falsamente exacta.",
  },
  why: {
    eyebrow: "Por qué existe",
    title: "Privacidad de verdad, no como eslogan.",
    subtitle:
      "La mayoría de apps de ciclo viven de tus datos. OpenCiclo hace lo contrario: los datos de salud no salen legibles de tu dispositivo.",
    features: [
      {
        icon: "lock",
        title: "Diario cifrado",
        body: "Tus fechas y notas se cifran en tu navegador con AES-256. Ni nosotras podemos leerlas en el servidor.",
      },
      {
        icon: "eye-off",
        title: "Sin rastreo",
        body: "Nada de analíticas, píxeles de anuncios ni SDKs de terceros que puedan recibir datos de salud.",
      },
      {
        icon: "key-round",
        title: "Modo super privado",
        body: "Entra con correo y contraseña, o sin correo usando una frase de 12 palabras. Tú eliges.",
      },
      {
        icon: "github",
        title: "Código abierto",
        body: "Todo el código y el modelo de pronóstico son auditables bajo licencia Apache 2.0.",
      },
      {
        icon: "cpu",
        title: "Se calcula en tu dispositivo",
        body: "El pronóstico corre en tu navegador. Tu historial no viaja a ningún servidor para predecir.",
      },
      {
        icon: "download",
        title: "Exporta cuando quieras",
        body: "Descarga tu diario en JSON o CSV, o bórralo por completo cuando lo decidas.",
      },
    ],
  },
  how: {
    eyebrow: "Cómo funciona",
    title: "Simple de usar, honesto por dentro.",
    steps: [
      {
        title: "Marca tu periodo",
        body: "Registra tus días de sangrado y, si quieres, síntomas y notas privadas.",
      },
      {
        title: "El pronóstico se calcula aquí",
        body: "Ciclo estima tu próximo periodo y tus fases en tu dispositivo, siempre con su incertidumbre.",
      },
      {
        title: "Aprende sobre tu ciclo",
        body: "Artículos claros y con fuentes sobre biología, síntomas y cuándo consultar.",
      },
      {
        title: "Compártelo",
        body: "Es gratis y abierto. Compártelo con quien pueda necesitarlo.",
      },
    ],
  },
  science: {
    eyebrow: "El modelo",
    title: "Un pronóstico honesto.",
    body: "OpenCiclo usa un modelo estadístico de contracción (shrinkage) que mezcla tu historial con un prior de población (mcPHASES). Siempre muestra un rango de incertidumbre en lugar de una fecha falsamente exacta. Sin aprendizaje profundo ni cajas negras: el modelo es abierto y está documentado.",
    docsLink: "Leer la documentación",
    modelLink: "Ver el modelo en GitHub",
  },
  learn: {
    eyebrow: "Aprender",
    title: "Información clara, para leer y compartir.",
    subtitle:
      "Educación general sobre el ciclo, los síntomas y cuándo buscar ayuda, con sus fuentes. Pública y sin necesidad de cuenta.",
    cta: "Ver todos los artículos",
  },
  resources: {
    eyebrow: "Recursos",
    title: "Todo el proyecto, abierto.",
    items: [
      {
        icon: "file-text",
        title: "Documentación",
        body: "Cómo se aloja, cómo se cifra el diario y qué significan las etiquetas del calendario.",
        href: "/help",
      },
      {
        icon: "book-open",
        title: "Aprender",
        body: "Wiki de salud sobre el ciclo, síntomas y cuidado. Bilingüe y pública.",
        href: "/learn",
      },
      {
        icon: "github",
        title: "GitHub",
        body: "Código, modelo de pronóstico y documentación de ingeniería. Licencia Apache 2.0.",
        href: MARKETING_LINKS.github,
        external: true,
      },
      {
        icon: "message-circle",
        title: "Contacto",
        body: "Dudas, ideas o fallos: hablamos en abierto a través de GitHub.",
        href: "/contact",
      },
    ],
  },
  finalCta: {
    title: "Empieza en tu navegador.",
    body: "Tus fechas se cifran antes de salir del dispositivo. Sin cuenta obligatoria, sin coste.",
    button: "Abrir la app",
  },
  footer: {
    disclaimer:
      "OpenCiclo ofrece pronósticos de ciclo. Los pronósticos pueden fallar. No es un dispositivo médico, un diagnóstico ni un método anticonceptivo.",
    license: "OpenCiclo / Ciclo · Licencia Apache 2.0",
    links: [
      { label: "Aprender", href: "/learn" },
      { label: "Documentación", href: "/help" },
      { label: "Privacidad", href: "/privacy" },
      { label: "GitHub", href: MARKETING_LINKS.github, external: true },
      { label: "Contacto", href: "/contact" },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "¿Tienes una duda o una idea?",
    body: "Por ahora gestionamos todo a través de GitHub. Abre una incidencia y te respondemos allí. Es público, así que otras personas también pueden aportar.",
    cards: [
      {
        icon: "message-circle",
        title: "Abrir una incidencia",
        body: "Reporta un fallo o propón una mejora. Es la vía más rápida para llegar al equipo.",
        action: "Ir a GitHub Issues",
        href: MARKETING_LINKS.issues,
      },
      {
        icon: "github",
        title: "Ver el código",
        body: "Explora el proyecto, la documentación de ingeniería y el modelo de pronóstico.",
        action: "Abrir el repositorio",
        href: MARKETING_LINKS.github,
      },
    ],
    privacyNote:
      "Por tu privacidad, no incluyas fechas de tu ciclo, notas del diario ni datos personales de salud en las incidencias públicas.",
    otherTitle: "Mientras tanto",
    otherLinks: [
      { label: "Leer la documentación", href: "/help" },
      { label: "Política de privacidad", href: "/privacy" },
      { label: "Aprender sobre el ciclo", href: "/learn" },
    ],
  },
};

const en: MarketingCopy = {
  brand: "OpenCiclo",
  nav: [
    { label: "How it works", href: "#como-funciona" },
    { label: "Privacy", href: "#privacidad" },
    { label: "Learn", href: "/learn" },
    { label: "Docs", href: "/help" },
    { label: "GitHub", href: MARKETING_LINKS.github, external: true },
    { label: "Contact", href: "/contact" },
  ],
  openApp: "Open the app",
  langToggle: "ES",
  hero: {
    eyebrow: "Open source · Private by design",
    title: "Your cycle, on your device.",
    subtitle:
      "OpenCiclo tracks and forecasts your menstrual cycle while encrypting your diary right in your browser. No ads, no tracking, no selling your data.",
    disclaimer: "Not a medical device or a contraceptive method.",
    ctaPrimary: "Open the app",
    ctaSecondary: "View on GitHub",
  },
  preview: {
    cycleDay: "Cycle day 14",
    phase: "Estimated ovulation",
    nextPeriod: "Next period in ~14 days",
    uncertainty: "±2 days · low uncertainty",
    legend: [
      { key: "menstrual", label: "Menstrual" },
      { key: "follicular", label: "Follicular" },
      { key: "ovulation", label: "Ovulation" },
      { key: "luteal", label: "Luteal" },
    ],
    caption: "An estimate with its range — never a falsely exact date.",
  },
  why: {
    eyebrow: "Why it exists",
    title: "Real privacy, not a slogan.",
    subtitle:
      "Most cycle apps live off your data. OpenCiclo does the opposite: health data never leaves your device in readable form.",
    features: [
      {
        icon: "lock",
        title: "Encrypted diary",
        body: "Your dates and notes are encrypted in your browser with AES-256. Not even we can read them on the server.",
      },
      {
        icon: "eye-off",
        title: "No tracking",
        body: "No analytics, ad pixels, or third-party SDKs that could ever receive health data.",
      },
      {
        icon: "key-round",
        title: "Super private mode",
        body: "Sign in with email and password, or with no email at all using a 12-word phrase. Your choice.",
      },
      {
        icon: "github",
        title: "Open source",
        body: "All the code and the forecast model are auditable under the Apache 2.0 license.",
      },
      {
        icon: "cpu",
        title: "Runs on your device",
        body: "The forecast runs in your browser. Your history never travels to a server to be predicted.",
      },
      {
        icon: "download",
        title: "Export anytime",
        body: "Download your diary as JSON or CSV, or delete it entirely whenever you decide.",
      },
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "Simple to use, honest underneath.",
    steps: [
      {
        title: "Log your period",
        body: "Record your bleeding days and, if you like, symptoms and private notes.",
      },
      {
        title: "Forecasts run on-device",
        body: "Ciclo estimates your next period and phases on your device, always with its uncertainty.",
      },
      {
        title: "Learn about your cycle",
        body: "Clear, sourced articles about biology, symptoms, and when to seek care.",
      },
      {
        title: "Share it",
        body: "It's free and open. Share it with anyone who might need it.",
      },
    ],
  },
  science: {
    eyebrow: "The model",
    title: "An honest forecast.",
    body: "OpenCiclo uses a shrinkage statistical model that blends your own history with a population prior (mcPHASES). It always shows an uncertainty range instead of a falsely exact date. No deep learning, no black boxes: the model is open and documented.",
    docsLink: "Read the documentation",
    modelLink: "See the model on GitHub",
  },
  learn: {
    eyebrow: "Learn",
    title: "Clear information, made to read and share.",
    subtitle:
      "General education about the cycle, symptoms, and when to seek help, with its sources. Public and no account required.",
    cta: "See all articles",
  },
  resources: {
    eyebrow: "Resources",
    title: "The whole project, in the open.",
    items: [
      {
        icon: "file-text",
        title: "Documentation",
        body: "How it's hosted, how the diary is encrypted, and what the calendar labels mean.",
        href: "/help",
      },
      {
        icon: "book-open",
        title: "Learn",
        body: "A health wiki about the cycle, symptoms, and care. Bilingual and public.",
        href: "/learn",
      },
      {
        icon: "github",
        title: "GitHub",
        body: "Code, forecast model, and engineering docs. Apache 2.0 licensed.",
        href: MARKETING_LINKS.github,
        external: true,
      },
      {
        icon: "message-circle",
        title: "Contact",
        body: "Questions, ideas, or bugs: we talk in the open through GitHub.",
        href: "/contact",
      },
    ],
  },
  finalCta: {
    title: "Start in your browser.",
    body: "Your dates are encrypted before they leave your device. No mandatory account, no cost.",
    button: "Open the app",
  },
  footer: {
    disclaimer:
      "OpenCiclo provides cycle forecasts. Forecasts can be wrong. It is not a medical device, a diagnosis, or a contraceptive method.",
    license: "OpenCiclo / Ciclo · Apache License 2.0",
    links: [
      { label: "Learn", href: "/learn" },
      { label: "Documentation", href: "/help" },
      { label: "Privacy", href: "/privacy" },
      { label: "GitHub", href: MARKETING_LINKS.github, external: true },
      { label: "Contact", href: "/contact" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Have a question or an idea?",
    body: "For now we handle everything through GitHub. Open an issue and we'll reply there. It's public, so others can chip in too.",
    cards: [
      {
        icon: "message-circle",
        title: "Open an issue",
        body: "Report a bug or suggest an improvement. It's the fastest way to reach the team.",
        action: "Go to GitHub Issues",
        href: MARKETING_LINKS.issues,
      },
      {
        icon: "github",
        title: "Browse the code",
        body: "Explore the project, the engineering docs, and the forecast model.",
        action: "Open the repository",
        href: MARKETING_LINKS.github,
      },
    ],
    privacyNote:
      "For your privacy, don't include your cycle dates, diary notes, or personal health data in public issues.",
    otherTitle: "In the meantime",
    otherLinks: [
      { label: "Read the documentation", href: "/help" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Learn about the cycle", href: "/learn" },
    ],
  },
};

export function marketingCopy(locale: Locale): MarketingCopy {
  return locale === "en" ? en : es;
}
