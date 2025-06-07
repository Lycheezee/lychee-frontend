import { Nutrition } from '../types/nutritions';

/**
 * Nutrition units mapping based on standard nutrition facts labels
 */
export const NUTRITION_UNITS = {
  calories: 'kcal',
  protein: 'g',
  carbohydrates: 'g',
  fat: 'g',
  fibers: 'g',
  sugars: 'g',
  sodium: 'mg',
  cholesterol: 'mg',
  waterIntake: 'ml',
} as const;

/**
 * Type for nutrition values with units
 */
export type NutritionWithUnits = {
  [K in keyof Nutrition]: {
    value: number;
    unit: string;
    formatted: string;
  };
};

/**
 * Type for individual nutrition item with unit
 */
export type NutritionItem = {
  value: number;
  unit: string;
  formatted: string;
};

/**
 * Formats a nutrition value with its appropriate unit
 * @param value - The numeric nutrition value
 * @param nutritionType - The type of nutrition (e.g., 'calories', 'proteins')
 * @param decimals - Number of decimal places to show (default: 1)
 * @returns Formatted string with value and unit
 */
export const formatNutritionValue = (
  value: number,
  nutritionType: keyof Nutrition,
  decimals: number = 1
): string => {
  const unit = NUTRITION_UNITS[nutritionType];
  const formattedValue = Number(value.toFixed(decimals));
  return `${formattedValue} ${unit}`;
};

/**
 * Adds units to all nutrition values in a Nutrition object
 * @param nutrition - The nutrition object with numeric values
 * @param decimals - Number of decimal places to show (default: 1)
 * @returns Object with nutrition values including units and formatted strings
 */
export const addUnitsToNutrition = (
  nutrition: Nutrition,
  decimals: number = 1
): NutritionWithUnits => {
  const result = {} as NutritionWithUnits;

  (Object.keys(nutrition) as (keyof Nutrition)[]).forEach((key) => {
    const value = nutrition[key];
    const unit = NUTRITION_UNITS[key];
    const formatted = formatNutritionValue(value, key, decimals);

    result[key] = {
      value,
      unit,
      formatted,
    };
  });

  return result;
};

/**
 * Gets a single nutrition item with unit information
 * @param value - The numeric nutrition value
 * @param nutritionType - The type of nutrition
 * @param decimals - Number of decimal places to show (default: 1)
 * @returns Nutrition item with value, unit, and formatted string
 */
export const getNutritionItem = (
  value: number,
  nutritionType: keyof Nutrition,
  decimals: number = 1
): NutritionItem => {
  const unit = NUTRITION_UNITS[nutritionType];
  const formatted = formatNutritionValue(value, nutritionType, decimals);

  return {
    value,
    unit,
    formatted,
  };
};

/**
 * Helper function to get nutrition display names (for UI labels)
 */
export const NUTRITION_DISPLAY_NAMES = {
  calories: 'Calories',
  protein: 'Protein',
  carbohydrates: 'Carbohydrates',
  fat: 'Fat',
  fibers: 'Fiber',
  sugars: 'Sugars',
  sodium: 'Sodium',
  cholesterol: 'Cholesterol',
  waterIntake: 'Water Intake',
} as const;

/**
 * Gets the display name for a nutrition type
 * @param nutritionType - The nutrition type key
 * @returns Human-readable display name
 */
export const getNutritionDisplayName = (nutritionType: keyof Nutrition): string => {
  return NUTRITION_DISPLAY_NAMES[nutritionType];
};

/**
 * Creates a formatted nutrition label with display name and unit
 * @param nutritionType - The nutrition type key
 * @param value - The numeric value
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted label like "Protein: 25.0 g"
 */
export const createNutritionLabel = (
  nutritionType: keyof Nutrition,
  value: number,
  decimals: number = 1
): string => {
  const displayName = getNutritionDisplayName(nutritionType);
  const formatted = formatNutritionValue(value, nutritionType, decimals);
  return `${displayName}: ${formatted}`;
};
