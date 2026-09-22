// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import {
  Activity,
  Apple,
  Baby,
  CircleDot,
  Dumbbell,
  HeartHandshake,
  Pill,
  Smile,
  Sparkles,
  Tags,
  Waves,
  type LucideIcon,
} from "lucide-react";

import type { Messages } from "@/lib/i18n";
import {
  BUILT_IN_SYMPTOM_IDS,
  SYMPTOM_CATEGORIES,
  type BuiltInSymptomId,
  type CustomSymptomDefinition,
  type SymptomCategory,
  type SymptomId,
} from "@/lib/symptoms/definitions";

export type SymptomMeta = {
  id: SymptomId;
  category: SymptomCategory | "custom";
  icon: LucideIcon;
  labelKey?: keyof Messages;
  label?: string;
  emoji?: string;
  color: string;
  exclusiveGroup?: string;
  noneGroup?: string;
  noneRole?: boolean;
  hiddenFromPicker?: boolean;
};

const CATEGORY_STYLE: Record<
  SymptomCategory | "custom",
  { icon: LucideIcon; color: string; labelKey: keyof Messages }
> = {
  sexAndSexDrive: { icon: HeartHandshake, color: "oklch(0.58 0.17 350)", labelKey: "symptomCategorySex" },
  mood: { icon: Smile, color: "oklch(0.6 0.14 145)", labelKey: "symptomCategoryMood" },
  symptoms: { icon: Activity, color: "oklch(0.62 0.18 25)", labelKey: "symptomCategorySymptoms" },
  vaginalDischarge: { icon: Waves, color: "oklch(0.62 0.12 200)", labelKey: "symptomCategoryDischarge" },
  digestionAndStool: { icon: Apple, color: "oklch(0.64 0.14 85)", labelKey: "symptomCategoryDigestion" },
  pregnancyTest: { icon: Baby, color: "oklch(0.65 0.15 15)", labelKey: "symptomCategoryPregnancyTest" },
  ovulationTest: { icon: CircleDot, color: "oklch(0.68 0.16 45)", labelKey: "symptomCategoryOvulationTest" },
  other: { icon: Sparkles, color: "oklch(0.55 0.14 280)", labelKey: "symptomCategoryOther" },
  physicalActivity: { icon: Dumbbell, color: "oklch(0.58 0.14 155)", labelKey: "symptomCategoryPhysicalActivity" },
  oralContraceptives: { icon: Pill, color: "oklch(0.55 0.13 310)", labelKey: "symptomCategoryOralContraceptives" },
  otherPills: { icon: Pill, color: "oklch(0.6 0.1 245)", labelKey: "symptomCategoryOtherPills" },
  custom: { icon: Tags, color: "oklch(0.62 0.11 290)", labelKey: "symptomCategoryCustom" },
};

function builtIn(
  id: BuiltInSymptomId,
  category: SymptomCategory,
  labelKey: keyof Messages,
  rules: Pick<SymptomMeta, "exclusiveGroup" | "noneGroup" | "noneRole" | "hiddenFromPicker"> = {},
): SymptomMeta {
  return { ...CATEGORY_STYLE[category], id, category, labelKey, ...rules };
}

export const SYMPTOM_CATALOG: SymptomMeta[] = [
  builtIn("didntHaveSex", "sexAndSexDrive", "symptomDidntHaveSex", { noneGroup: "sexualActivity", noneRole: true }),
  builtIn("sexualActivity", "sexAndSexDrive", "symptomSexualActivity", { noneGroup: "sexualActivity" }),
  builtIn("protectedSex", "sexAndSexDrive", "symptomProtectedSex", { noneGroup: "sexualActivity" }),
  builtIn("unprotectedSex", "sexAndSexDrive", "symptomUnprotectedSex", { noneGroup: "sexualActivity" }),
  builtIn("oralSex", "sexAndSexDrive", "symptomOralSex", { noneGroup: "sexualActivity" }),
  builtIn("analSex", "sexAndSexDrive", "symptomAnalSex", { noneGroup: "sexualActivity" }),
  builtIn("masturbation", "sexAndSexDrive", "symptomMasturbation", { noneGroup: "sexualActivity" }),
  builtIn("sensualTouch", "sexAndSexDrive", "symptomSensualTouch", { noneGroup: "sexualActivity" }),
  builtIn("sexToys", "sexAndSexDrive", "symptomSexToys", { noneGroup: "sexualActivity" }),
  builtIn("orgasm", "sexAndSexDrive", "symptomOrgasm", {
    exclusiveGroup: "orgasm",
    noneGroup: "sexualActivity",
  }),
  builtIn("noOrgasm", "sexAndSexDrive", "symptomNoOrgasm", {
    exclusiveGroup: "orgasm",
    noneGroup: "sexualActivity",
  }),
  builtIn("highLibido", "sexAndSexDrive", "symptomHighLibido", { exclusiveGroup: "libido" }),
  builtIn("neutralLibido", "sexAndSexDrive", "symptomNeutralLibido", { exclusiveGroup: "libido" }),
  builtIn("lowLibido", "sexAndSexDrive", "symptomLowLibido", { exclusiveGroup: "libido" }),

  builtIn("calm", "mood", "symptomCalm"),
  builtIn("happy", "mood", "symptomHappy"),
  builtIn("energetic", "mood", "symptomEnergetic"),
  builtIn("frisky", "mood", "symptomFrisky"),
  builtIn("moodSwings", "mood", "symptomMoodSwings"),
  builtIn("irritated", "mood", "symptomIrritated"),
  builtIn("sad", "mood", "symptomSad"),
  builtIn("anxious", "mood", "symptomAnxious"),
  builtIn("depressed", "mood", "symptomDepressed"),
  builtIn("feelingGuilty", "mood", "symptomFeelingGuilty"),
  builtIn("obsessiveThoughts", "mood", "symptomObsessiveThoughts"),
  builtIn("lowEnergy", "mood", "symptomLowEnergy"),
  builtIn("apathetic", "mood", "symptomApathetic"),
  builtIn("confused", "mood", "symptomConfused"),
  builtIn("verySelfCritical", "mood", "symptomVerySelfCritical"),

  builtIn("everythingFine", "symptoms", "symptomEverythingFine", { noneGroup: "generalSymptoms", noneRole: true }),
  builtIn("cramps", "symptoms", "symptomCramps", { noneGroup: "generalSymptoms" }),
  builtIn("tenderBreasts", "symptoms", "symptomTenderBreasts", { noneGroup: "generalSymptoms" }),
  builtIn("headache", "symptoms", "symptomHeadache", { noneGroup: "generalSymptoms" }),
  builtIn("acne", "symptoms", "symptomAcne", { noneGroup: "generalSymptoms" }),
  builtIn("backache", "symptoms", "symptomBackache", { noneGroup: "generalSymptoms" }),
  builtIn("fatigue", "symptoms", "symptomFatigue", { noneGroup: "generalSymptoms" }),
  builtIn("cravings", "symptoms", "symptomCravings", { noneGroup: "generalSymptoms" }),
  builtIn("insomnia", "symptoms", "symptomInsomnia", { noneGroup: "generalSymptoms" }),
  builtIn("abdominalPain", "symptoms", "symptomAbdominalPain", { noneGroup: "generalSymptoms" }),
  builtIn("vaginalItching", "symptoms", "symptomVaginalItching", { noneGroup: "generalSymptoms" }),
  builtIn("vaginalDryness", "symptoms", "symptomVaginalDryness", { noneGroup: "generalSymptoms" }),
  builtIn("uti", "symptoms", "symptomUti", { noneGroup: "generalSymptoms" }),
  builtIn("hotFlashes", "symptoms", "symptomHotFlashes", { noneGroup: "generalSymptoms" }),
  builtIn("nightSweats", "symptoms", "symptomNightSweats", { noneGroup: "generalSymptoms" }),
  builtIn("jointPain", "symptoms", "symptomJointPain", { noneGroup: "generalSymptoms" }),
  builtIn("brainFog", "symptoms", "symptomBrainFog", { noneGroup: "generalSymptoms" }),
  builtIn("drySkin", "symptoms", "symptomDrySkin", { noneGroup: "generalSymptoms" }),
  builtIn("dryEyes", "symptoms", "symptomDryEyes", { noneGroup: "generalSymptoms" }),
  builtIn("intermenstrualBleeding", "symptoms", "symptomIntermenstrualBleeding", {
    noneGroup: "generalSymptoms",
  }),

  builtIn("noDischarge", "vaginalDischarge", "symptomNoDischarge", { noneGroup: "discharge", noneRole: true }),
  builtIn("dischargeCreamy", "vaginalDischarge", "symptomDischargeCreamy", { noneGroup: "discharge" }),
  builtIn("dischargeWatery", "vaginalDischarge", "symptomDischargeWatery", { noneGroup: "discharge" }),
  builtIn("dischargeSticky", "vaginalDischarge", "symptomDischargeSticky", { noneGroup: "discharge" }),
  builtIn("dischargeEggWhite", "vaginalDischarge", "symptomDischargeEggWhite", { noneGroup: "discharge" }),
  builtIn("dischargeSpotting", "vaginalDischarge", "symptomDischargeSpotting", { noneGroup: "discharge" }),
  builtIn("dischargeUnusual", "vaginalDischarge", "symptomDischargeUnusual", { noneGroup: "discharge" }),
  builtIn("dischargeClumpyWhite", "vaginalDischarge", "symptomDischargeClumpyWhite", { noneGroup: "discharge" }),
  builtIn("dischargeGray", "vaginalDischarge", "symptomDischargeGray", { noneGroup: "discharge" }),

  builtIn("nausea", "digestionAndStool", "symptomNausea"),
  builtIn("bloating", "digestionAndStool", "symptomBloating"),
  builtIn("constipation", "digestionAndStool", "symptomConstipation"),
  builtIn("diarrhea", "digestionAndStool", "symptomDiarrhea"),

  builtIn("pregnancyTestNotTaken", "pregnancyTest", "symptomPregnancyTestNotTaken", { exclusiveGroup: "pregnancyTest" }),
  builtIn("pregnancyTestPositive", "pregnancyTest", "symptomPregnancyTestPositive", { exclusiveGroup: "pregnancyTest" }),
  builtIn("pregnancyTestNegative", "pregnancyTest", "symptomPregnancyTestNegative", { exclusiveGroup: "pregnancyTest" }),
  builtIn("pregnancyTestFaintLine", "pregnancyTest", "symptomPregnancyTestFaintLine", { exclusiveGroup: "pregnancyTest" }),

  builtIn("ovulationTestNotTaken", "ovulationTest", "symptomOvulationTestNotTaken", { exclusiveGroup: "ovulationTest" }),
  builtIn("ovulationTestPositive", "ovulationTest", "symptomOvulationTestPositive", { exclusiveGroup: "ovulationTest" }),
  builtIn("ovulationTestNegative", "ovulationTest", "symptomOvulationTestNegative", { exclusiveGroup: "ovulationTest" }),
  builtIn("ovulationMyMethod", "ovulationTest", "symptomOvulationMyMethod", { exclusiveGroup: "ovulationTest" }),

  builtIn("travel", "other", "symptomTravel"),
  builtIn("stress", "other", "symptomStress"),
  builtIn("meditation", "other", "symptomMeditation"),
  builtIn("journaling", "other", "symptomJournaling"),
  builtIn("kegelExercises", "other", "symptomKegelExercises"),
  builtIn("breathingExercises", "other", "symptomBreathingExercises"),
  builtIn("diseaseOrInjury", "other", "symptomDiseaseOrInjury"),
  builtIn("alcohol", "other", "symptomAlcohol"),

  builtIn("didntExercise", "physicalActivity", "symptomDidntExercise", { noneGroup: "exercise", noneRole: true }),
  builtIn("yoga", "physicalActivity", "symptomYoga", { noneGroup: "exercise" }),
  builtIn("gym", "physicalActivity", "symptomGym", { noneGroup: "exercise" }),
  builtIn("aerobicsDancing", "physicalActivity", "symptomAerobicsDancing", { noneGroup: "exercise" }),
  builtIn("swimming", "physicalActivity", "symptomSwimming", { noneGroup: "exercise" }),
  builtIn("teamSports", "physicalActivity", "symptomTeamSports", { noneGroup: "exercise" }),
  builtIn("running", "physicalActivity", "symptomRunning", { noneGroup: "exercise" }),
  builtIn("cycling", "physicalActivity", "symptomCycling", { noneGroup: "exercise" }),
  builtIn("walking", "physicalActivity", "symptomWalking", { noneGroup: "exercise" }),

  builtIn("ocTakenOnTime", "oralContraceptives", "symptomOcTakenOnTime", { exclusiveGroup: "oralContraceptives" }),
  builtIn("ocYesterdaysPill", "oralContraceptives", "symptomOcYesterdaysPill", { exclusiveGroup: "oralContraceptives" }),
];

if (SYMPTOM_CATALOG.length !== BUILT_IN_SYMPTOM_IDS.length) {
  throw new Error("The symptom catalog and built-in IDs are out of sync");
}

export const SYMPTOM_CATEGORY_ORDER = [
  "custom",
  ...SYMPTOM_CATEGORIES,
] as const satisfies readonly (SymptomCategory | "custom")[];

export function resolveSymptomCatalog(customSymptoms: readonly CustomSymptomDefinition[] = []): SymptomMeta[] {
  return [
    ...SYMPTOM_CATALOG,
    ...customSymptoms.map((item): SymptomMeta => {
      const category = item.category;
      return {
        id: item.id,
        category,
        icon: CATEGORY_STYLE[category].icon,
        color: colorForCustomId(item.id),
        label: item.label,
        emoji: item.emoji,
      };
    }),
  ];
}

export function visibleSymptomCatalog(
  customSymptoms: readonly CustomSymptomDefinition[] = [],
): SymptomMeta[] {
  return resolveSymptomCatalog(customSymptoms).filter((item) => !item.hiddenFromPicker);
}

export function symptomLabel(item: SymptomMeta, t: Messages): string {
  if (item.labelKey) return String(t[item.labelKey]);
  return item.label ?? item.id;
}

export function symptomCategoryLabel(
  category: SymptomCategory | "custom",
  t: Messages,
): string {
  return String(t[CATEGORY_STYLE[category].labelKey]);
}

export function symptomMeta(
  id: SymptomId,
  customSymptoms: readonly CustomSymptomDefinition[] = [],
): SymptomMeta {
  const found = resolveSymptomCatalog(customSymptoms).find((item) => item.id === id);
  if (!found) throw new Error(`Unknown symptom ${id}`);
  return found;
}

export function findSymptomMeta(
  id: SymptomId,
  customSymptoms: readonly CustomSymptomDefinition[] = [],
): SymptomMeta | undefined {
  return resolveSymptomCatalog(customSymptoms).find((item) => item.id === id);
}

export function symptomColor(
  id: SymptomId,
  customSymptoms: readonly CustomSymptomDefinition[] = [],
): string {
  return symptomMeta(id, customSymptoms).color;
}

function colorForCustomId(id: string): string {
  let hash = 0;
  for (const character of id) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  const hues = [25, 85, 145, 200, 250, 300, 350];
  return `oklch(0.62 0.13 ${hues[hash % hues.length]})`;
}

export { BUILT_IN_SYMPTOM_IDS as SYMPTOM_IDS };
