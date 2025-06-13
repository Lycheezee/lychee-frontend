export enum EGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export const genderOptions = [
  { label: 'Male', value: EGender.MALE },
  { label: 'Female', value: EGender.FEMALE },
  { label: 'Other', value: EGender.OTHER },
  { label: 'Prefer not to say', value: EGender.PREFER_NOT_TO_SAY },
];

export enum ExerciseRate {
  Sedentary = 'sedentary',
  Light = 'light',
  Moderate = 'moderate',
  Active = 'active',
  VeryActive = 'very_active',
}

export const exerciseRateOptions = [
  { label: 'Sedentary (little to no exercise)', value: ExerciseRate.Sedentary },
  { label: 'Light (1-3 days/week)', value: ExerciseRate.Light },
  { label: 'Moderate (3-5 days/week)', value: ExerciseRate.Moderate },
  { label: 'Active (6-7 days/week)', value: ExerciseRate.Active },
  { label: 'Very Active (2x/day or intense)', value: ExerciseRate.VeryActive },
];

export enum MacroPreference {
  BALANCED = 'balanced',
  HIGH_PROTEIN = 'high_protein',
  LOW_CARB = 'low_carb',
  HIGH_CARB = 'high_carb',
  KETOGENIC = 'ketogenic',
}

export const macroPreferenceOptions = [
  { label: 'Balanced', value: MacroPreference.BALANCED },
  { label: 'High Protein', value: MacroPreference.HIGH_PROTEIN },
  { label: 'Low Carb', value: MacroPreference.LOW_CARB },
  { label: 'High Carb', value: MacroPreference.HIGH_CARB },
  { label: 'Ketogenic', value: MacroPreference.KETOGENIC },
];
