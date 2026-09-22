// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

export const BUILT_IN_SYMPTOM_IDS = [
  "didntHaveSex",
  "protectedSex",
  "unprotectedSex",
  "oralSex",
  "analSex",
  "masturbation",
  "sensualTouch",
  "sexToys",
  "orgasm",
  "noOrgasm",
  "highLibido",
  "neutralLibido",
  "lowLibido",
  "calm",
  "happy",
  "energetic",
  "frisky",
  "moodSwings",
  "irritated",
  "sad",
  "anxious",
  "depressed",
  "feelingGuilty",
  "obsessiveThoughts",
  "lowEnergy",
  "apathetic",
  "confused",
  "verySelfCritical",
  "everythingFine",
  "cramps",
  "tenderBreasts",
  "headache",
  "acne",
  "backache",
  "fatigue",
  "cravings",
  "insomnia",
  "abdominalPain",
  "vaginalItching",
  "vaginalDryness",
  "uti",
  "hotFlashes",
  "nightSweats",
  "jointPain",
  "brainFog",
  "drySkin",
  "dryEyes",
  "intermenstrualBleeding",
  "noDischarge",
  "dischargeCreamy",
  "dischargeWatery",
  "dischargeSticky",
  "dischargeEggWhite",
  "dischargeSpotting",
  "dischargeUnusual",
  "dischargeClumpyWhite",
  "dischargeGray",
  "nausea",
  "bloating",
  "constipation",
  "diarrhea",
  "pregnancyTestNotTaken",
  "pregnancyTestPositive",
  "pregnancyTestNegative",
  "pregnancyTestFaintLine",
  "ovulationTestNotTaken",
  "ovulationTestPositive",
  "ovulationTestNegative",
  "ovulationMyMethod",
  "travel",
  "stress",
  "meditation",
  "journaling",
  "kegelExercises",
  "breathingExercises",
  "diseaseOrInjury",
  "alcohol",
  "didntExercise",
  "yoga",
  "gym",
  "aerobicsDancing",
  "swimming",
  "teamSports",
  "running",
  "cycling",
  "walking",
  "ocTakenOnTime",
  "ocYesterdaysPill",
  "sexualActivity",
] as const;

export const DEFAULT_FAVORITE_SYMPTOM_IDS = [
  "cramps",
  "headache",
  "highLibido",
  "bloating",
  "tenderBreasts",
  "fatigue",
  "moodSwings",
  "cravings",
] as const satisfies readonly BuiltInSymptomId[];

export const SYMPTOM_CATEGORIES = [
  "sexAndSexDrive",
  "mood",
  "symptoms",
  "vaginalDischarge",
  "digestionAndStool",
  "pregnancyTest",
  "ovulationTest",
  "other",
  "physicalActivity",
  "oralContraceptives",
  "otherPills",
] as const;

export const CUSTOM_SYMPTOM_CATEGORIES = ["custom", "otherPills"] as const;

export type BuiltInSymptomId = (typeof BUILT_IN_SYMPTOM_IDS)[number];
export type CustomSymptomId = `custom-${string}`;
export type SymptomId = BuiltInSymptomId | CustomSymptomId;
export type SymptomCategory = (typeof SYMPTOM_CATEGORIES)[number];
export type CustomSymptomCategory = (typeof CUSTOM_SYMPTOM_CATEGORIES)[number];

export type CustomSymptomDefinition = {
  id: CustomSymptomId;
  label: string;
  emoji: string;
  category: CustomSymptomCategory;
};

export function isBuiltInSymptomId(value: unknown): value is BuiltInSymptomId {
  return (
    typeof value === "string" &&
    (BUILT_IN_SYMPTOM_IDS as readonly string[]).includes(value)
  );
}

export function isCustomSymptomId(value: unknown): value is CustomSymptomId {
  return typeof value === "string" && /^custom-[a-zA-Z0-9-]{8,}$/.test(value);
}

export function createCustomSymptomId(): CustomSymptomId {
  return `custom-${globalThis.crypto.randomUUID()}`;
}
