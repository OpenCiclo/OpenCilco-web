// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { CYCLE_SEASONS, type CycleSeason } from "@/lib/cycle/phases";
import type { Locale } from "@/lib/i18n";

export type SeasonGuideCopy = {
  meaning: string;
  goodFor: string;
  do: string[];
  dont: string[];
};

const GUIDES: Record<CycleSeason, Record<Locale, SeasonGuideCopy>> = {
  winter: {
    es: {
      meaning:
        "Invierno interior: la fase menstrual. Si hay sangrado registrado, esta fase está observada; si no, Ciclo estima que aún estás en la ventana típica de sangrado. El cuerpo suelta el revestimiento del útero. La energía suele estar más baja.",
      goodFor:
        "Descanso, calor, planes simples y decir que no sin culpa. Es un buen momento para ir más despacio y escuchar el cuerpo.",
      do: [
        "Prioriza sueño, calor y comidas que te sienten bien.",
        "Elige movimiento suave si te alivia (caminar, estirar), no como obligación.",
        "Anota el flujo para que la fase deje de ser solo una estimación.",
      ],
      dont: [
        "No trates un entrenamiento saltado como un fallo.",
        "No ignores dolor fuerte, mareo o sangrado que te impide el día a día: pide valoración clínica.",
        "No uses esta etiqueta como diagnóstico médico.",
      ],
    },
    en: {
      meaning:
        "Inner winter: the menstrual phase. If bleeding is logged, this phase is observed; if not, Ciclo is estimating you are still in the typical bleeding window. The uterine lining is shedding. Energy is often lower.",
      goodFor:
        "Rest, warmth, simpler plans, and saying no without guilt. A good stretch to slow down and listen to your body.",
      do: [
        "Prioritize sleep, warmth, and meals that sit well.",
        "Choose gentle movement if it soothes you (walking, stretching) — not as a duty.",
        "Log flow so this phase can be observed instead of only estimated.",
      ],
      dont: [
        "Do not treat a skipped workout as a failure.",
        "Do not ignore severe pain, dizziness, or bleeding that stops daily life — seek clinical care.",
        "Do not treat this label as a medical diagnosis.",
      ],
    },
  },
  spring: {
    es: {
      meaning:
        "Primavera interior: la fase folicular, después del sangrado y antes de la ventana de ovulación estimada. El cuerpo prepara un óvulo. Muchas personas notan que la energía y el ánimo suben, pero no es una regla.",
      goodFor:
        "Empezar proyectos, planes sociales, probar movimiento nuevo y seguir la curiosidad. Suele ser una fase de apertura, no de rendimiento obligatorio.",
      do: [
        "Aprovecha la energía si aparece: planes, fuerza o cardio si te apetece.",
        "Sigue registrando síntomas; los patrones importan más que un día suelto.",
        "Recuerda que “estimada” significa calendario, no un test hormonal.",
      ],
      dont: [
        "No asumas fertilidad ni ovulación por el nombre de la estación.",
        "No fuerces un ritmo alto si aún sales del periodo cansada.",
        "No uses Ciclo como anticonceptivo ni como test de ovulación.",
      ],
    },
    en: {
      meaning:
        "Inner spring: the follicular phase, after bleeding and before the estimated ovulation window. The body is preparing an egg. Many people feel energy and mood rise — that is common, not a rule.",
      goodFor:
        "Starting projects, social plans, trying new movement, and following curiosity. It is often an opening phase, not a demand to perform.",
      do: [
        "Use rising energy if it shows up: plans, strength, or cardio if you want them.",
        "Keep logging symptoms — patterns matter more than a single day.",
        "Remember “estimated” means calendar timing, not a hormone test.",
      ],
      dont: [
        "Do not assume fertility or ovulation from the season name.",
        "Do not force a high pace if you are still depleted after bleeding.",
        "Do not use Ciclo as contraception or as an ovulation test.",
      ],
    },
  },
  summer: {
    es: {
      meaning:
        "Verano interior: la ventana de ovulación estimada, a menudo unos 10–16 días antes del siguiente periodo previsto. Es una heurística de calendario. No confirma que hayas ovulado.",
      goodFor:
        "Conexión, conversaciones, colaboración y visibilidad, si te sienta bien. Algunas personas notan más deseo o moco más elástico; otras no notan nada.",
      do: [
        "Si observas moco, anótalo: es un dato tuyo, no una confirmación de laboratorio.",
        "Mantén el diario al día; el pronóstico de la siguiente regla es lo que Ciclo predice de verdad.",
        "Cuida el sueño y la hidratación si estás más activa.",
      ],
      dont: [
        "No uses esta ventana como anticonceptivo ni para programar un embarazo como método clínico.",
        "No tomes “Ovulación · estimada” como un test positivo.",
        "No asumas que todo el mundo se siente sociable o con más libido aquí.",
      ],
    },
    en: {
      meaning:
        "Inner summer: the estimated ovulation window, often about 10–16 days before the next expected period. It is a calendar heuristic. It does not confirm that you ovulated.",
      goodFor:
        "Connection, conversation, collaboration, and being seen, if that feels good. Some people notice more desire or stretchier mucus; others notice nothing.",
      do: [
        "If you observe mucus, log it — it is your data, not a lab confirmation.",
        "Keep the diary current; next-period timing is what Ciclo actually forecasts.",
        "Protect sleep and hydration if you are more active.",
      ],
      dont: [
        "Do not use this window as contraception or as a clinical way to time pregnancy.",
        "Do not treat “Ovulation · estimated” as a positive ovulation test.",
        "Do not assume everyone feels social or higher-libido here.",
      ],
    },
  },
  fall: {
    es: {
      meaning:
        "Otoño interior: la fase lútea, después de la ventana de ovulación estimada y hasta la siguiente regla. Pueden aparecer síntomas premenstruales. La energía a menudo baja de forma gradual.",
      goodFor:
        "Cerrar tareas, planes más quietos, revisar el ciclo y pedirte menos estimulación. Un buen momento para anidar, no para copiar el ritmo de primavera o verano.",
      do: [
        "Simplifica el calendario si te sientes más sensible o cansada.",
        "Comidas con proteína y fibra pueden suavizar antojos; el descanso cuenta.",
        "Registra ánimo, hinchazón o pechos sensibles para ver si se repiten.",
      ],
      dont: [
        "No fuerces el ritmo de la primavera o el verano si el cuerpo pide menos.",
        "No descartes el dolor o el ánimo bajo como “solo PMS” si te limita la vida.",
        "No interpretes esta fase como prueba de embarazo ni como diagnóstico.",
      ],
    },
    en: {
      meaning:
        "Inner autumn: the luteal phase, after the estimated ovulation window and until the next period. Premenstrual symptoms may appear. Energy often winds down gradually.",
      goodFor:
        "Finishing tasks, quieter plans, reviewing the cycle, and asking less stimulation of yourself. A nesting stretch — not a copy of spring or summer pace.",
      do: [
        "Simplify the calendar if you feel more sensitive or tired.",
        "Meals with protein and fibre can soften cravings; rest counts.",
        "Log mood, bloating, or tender breasts to see whether they repeat.",
      ],
      dont: [
        "Do not force a spring or summer pace if your body asks for less.",
        "Do not dismiss pain or low mood as “just PMS” if it limits daily life.",
        "Do not read this phase as a pregnancy test or a diagnosis.",
      ],
    },
  },
};

export function seasonGuide(season: CycleSeason, locale: Locale): SeasonGuideCopy {
  return GUIDES[season][locale];
}

export function seasonGuideComplete(): boolean {
  return CYCLE_SEASONS.every((season) => {
    const es = GUIDES[season].es;
    const en = GUIDES[season].en;
    return (
      es.meaning.length > 0 &&
      en.meaning.length > 0 &&
      es.goodFor.length > 0 &&
      en.goodFor.length > 0 &&
      es.do.length >= 3 &&
      en.do.length >= 3 &&
      es.dont.length >= 3 &&
      en.dont.length >= 3
    );
  });
}
