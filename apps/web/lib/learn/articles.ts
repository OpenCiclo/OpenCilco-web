// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Locale } from "@/lib/i18n";

export type LearnCategory = "cycle" | "symptoms" | "mucus" | "care";

export type LearnSource = {
  label: string;
  href: string;
};

export type LearnArticleCopy = {
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
  notice: string;
};

export type LearnArticle = {
  slug: string;
  category: LearnCategory;
  reviewedAt: string;
  sources: LearnSource[];
  es: LearnArticleCopy;
  en: LearnArticleCopy;
};

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "cycle-phases",
    category: "cycle",
    reviewedAt: "2026-08-18",
    sources: [
      { label: "NHS — Periods and fertility", href: "https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/" },
      { label: "Endotext — The Normal Menstrual Cycle", href: "https://www.ncbi.nlm.nih.gov/books/NBK279054/" },
    ],
    es: {
      title: "Fases del ciclo",
      summary: "El ciclo se cuenta desde el primer día de sangrado hasta el día anterior al siguiente periodo. Las fases que ves en Ciclo son una estimación, no un diagnóstico.",
      sections: [
        {
          heading: "Qué cuenta como un ciclo",
          body: "Un ciclo menstrual va del primer día de la regla al día anterior de la siguiente. Duraciones de 21 a 35 días son habituales. La media de 28 días es solo una referencia, no una norma.",
        },
        {
          heading: "Las cuatro fases estimadas",
          body: "Menstrual: días con sangrado. Folicular: el cuerpo prepara un óvulo. Ovulación: ventana estimada, a menudo 10–16 días antes del siguiente periodo. Lútea: la segunda mitad, cuando pueden aparecer síntomas premenstruales. La duración de la fase lútea suele ser más estable que la folicular.",
        },
        {
          heading: "Por qué Ciclo marca “estimada”",
          body: "Un calendario no puede confirmar ovulación. Incluso con ciclos regulares, el día exacto varía. Ciclo usa tus inicios de periodo y un modelo de pronóstico para pintar fases; no es un método anticonceptivo ni un test de fertilidad.",
        },
      ],
      notice: "Esta información es educativa. Si tus ciclos cambian de forma brusca o el dolor limita tu día a día, consulta a una profesional sanitaria.",
    },
    en: {
      title: "Cycle phases",
      summary: "A cycle is counted from the first bleeding day to the day before the next period. The phases Ciclo shows are estimates, not a diagnosis.",
      sections: [
        {
          heading: "What counts as a cycle",
          body: "A menstrual cycle runs from the first day of bleeding to the day before the next period. Lengths of 21 to 35 days are common. A 28-day average is a reference, not a rule.",
        },
        {
          heading: "The four estimated phases",
          body: "Menstrual: days with bleeding. Follicular: the body prepares an egg. Ovulation: an estimated window, often 10–16 days before the next period. Luteal: the second half, when premenstrual symptoms may appear. The luteal phase is usually more stable than the follicular phase.",
        },
        {
          heading: "Why Ciclo labels phases as estimated",
          body: "A calendar cannot confirm ovulation. Even with regular cycles, the exact day varies. Ciclo uses period starts and a forecast model to paint phases; it is not contraception and not a fertility test.",
        },
      ],
      notice: "This is educational information. If your cycles change suddenly or pain limits daily life, talk with a clinician.",
    },
  },
  {
    slug: "common-symptoms",
    category: "symptoms",
    reviewedAt: "2026-08-18",
    sources: [
      { label: "NHS — Period problems", href: "https://www.nhs.uk/conditions/periods/period-problems/" },
    ],
    es: {
      title: "Síntomas habituales",
      summary: "Cólicos, fatiga, cambios de ánimo o hinchazón son frecuentes. Registrarlos ayuda a ver patrones; no sustituye una consulta clínica.",
      sections: [
        {
          heading: "Qué puedes registrar en Ciclo",
          body: "Cólicos, dolor de cabeza, libido alta, sexo, hinchazón, pechos sensibles, fatiga, cambios de ánimo y antojos. Son etiquetas para tu diario, no un diagnóstico.",
        },
        {
          heading: "Patrones, no causas",
          body: "Ver que un síntoma se repite en varios ciclos puede ayudarte a prepararte. Una correlación en tu diario no demuestra por qué ocurre ni qué tratamiento necesitas.",
        },
        {
          heading: "Cuándo pedir ayuda",
          body: "Dolor que no cede, sangrado muy abundante, ausencia de periodos o síntomas que te impiden trabajar o dormir merecen valoración profesional.",
        },
      ],
      notice: "Ciclo no diagnostica endometriosis, SOP ni ninguna otra condición.",
    },
    en: {
      title: "Common symptoms",
      summary: "Cramps, fatigue, mood shifts, and bloating are common. Logging them helps you see patterns; it does not replace clinical care.",
      sections: [
        {
          heading: "What you can log in Ciclo",
          body: "Cramps, headache, high libido, sex, bloating, tender breasts, fatigue, mood swings, and cravings. These are diary labels, not a diagnosis.",
        },
        {
          heading: "Patterns, not causes",
          body: "Seeing a symptom repeat across cycles can help you prepare. A correlation in your diary does not prove why it happens or which treatment you need.",
        },
        {
          heading: "When to seek care",
          body: "Pain that does not ease, very heavy bleeding, missing periods, or symptoms that stop you working or sleeping deserve clinical assessment.",
        },
      ],
      notice: "Ciclo does not diagnose endometriosis, PCOS, or any other condition.",
    },
  },
  {
    slug: "cervical-mucus",
    category: "mucus",
    reviewedAt: "2026-08-18",
    sources: [
      { label: "Cleveland Clinic — Cervical mucus", href: "https://my.clevelandclinic.org/health/body/21957-cervical-mucus" },
      { label: "ASRM — Optimizing natural fertility", href: "https://doi.org/10.1016/j.fertnstert.2021.10.007" },
    ],
    es: {
      title: "Moco cervical",
      summary: "La textura del moco cambia a lo largo del ciclo. El tipo “clara de huevo” se asocia a días más fértiles, pero no confirma ovulación.",
      sections: [
        {
          heading: "Qué puedes anotar",
          body: "Seco, pegajoso, cremoso, acuoso o clara de huevo. Estas categorías son una guía de observación, no un laboratorio.",
        },
        {
          heading: "Qué no implica",
          body: "El moco claro y elástico suele aparecer cerca de la ovulación, pero el día exacto varía. Ciclo no usa el moco para confirmar fertilidad ni para anticoncepción.",
        },
      ],
      notice: "Si hay olor intenso, picor, dolor o un cambio brusco, consulta a una profesional. Puede no ser un cambio hormonal habitual.",
    },
    en: {
      title: "Cervical mucus",
      summary: "Mucus texture changes across the cycle. Egg-white mucus is associated with more fertile days, but it does not confirm ovulation.",
      sections: [
        {
          heading: "What you can log",
          body: "Dry, sticky, creamy, watery, or egg white. These categories are an observation guide, not a lab result.",
        },
        {
          heading: "What it does not prove",
          body: "Clear, stretchy mucus often appears near ovulation, but the exact day varies. Ciclo does not use mucus to confirm fertility or as contraception.",
        },
      ],
      notice: "If you notice a strong smell, itching, pain, or a sudden change, talk with a clinician. It may not be a typical hormonal shift.",
    },
  },
  {
    slug: "when-to-seek-care",
    category: "care",
    reviewedAt: "2026-08-18",
    sources: [
      { label: "NHS — Periods", href: "https://www.nhs.uk/conditions/periods/" },
    ],
    es: {
      title: "Cuándo consultar",
      summary: "Ciclo es una app de registro y pronóstico. No sustituye atención sanitaria.",
      sections: [
        {
          heading: "Señales para pedir cita",
          body: "Sangrado que empapa una compresa cada hora, dolor que no mejora, periodos que desaparecen varios meses, sangrado después de la menopausia, o síntomas que te impiden hacer tu vida.",
        },
        {
          heading: "Urgencias",
          body: "Si hay dolor agudo intenso, mareo, desmayo o sangrado muy abundante de forma súbita, busca atención urgente.",
        },
      ],
      notice: "Los tips de Ciclo son orientación general de bienestar, no consejo médico personalizado.",
    },
    en: {
      title: "When to seek care",
      summary: "Ciclo is a logging and forecast app. It does not replace clinical care.",
      sections: [
        {
          heading: "Reasons to book an appointment",
          body: "Bleeding that soaks a pad every hour, pain that does not ease, periods that stop for several months, bleeding after menopause, or symptoms that stop you living your life.",
        },
        {
          heading: "Urgent care",
          body: "If you have sudden severe pain, dizziness, fainting, or very heavy bleeding all at once, seek urgent care.",
        },
      ],
      notice: "Ciclo tips are general wellbeing guidance, not personalised medical advice.",
    },
  },
];

export function articleCopy(article: LearnArticle, locale: Locale): LearnArticleCopy {
  return article[locale];
}

export function findArticle(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find((article) => article.slug === slug);
}

export function articlesByCategory(category: LearnCategory): LearnArticle[] {
  return LEARN_ARTICLES.filter((article) => article.category === category);
}
