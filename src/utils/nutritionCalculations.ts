import { Nutrition } from '~/types/nutritions';
import { Meal } from '~/types/meal';

/**
 * Calculates the total nutrition from an array of meals
 * @param meals - Array of meals to calculate nutrition for
 * @returns Total nutrition values
 */
export const calculateTotalNutrition = (meals: Meal[]): Nutrition => {
  const initialNutrition: Nutrition = {
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sugars: 0,
    fibers: 0,
    sodium: 0,
    cholesterol: 0,
    waterIntake: 0,
  };

  return meals.reduce((total, meal) => {
    if (!meal.nutrition) return total;

    return {
      calories: total.calories + (meal.nutrition.calories || 0),
      carbohydrates: total.carbohydrates + (meal.nutrition.carbohydrates || 0),
      protein: total.protein + (meal.nutrition.protein || 0),
      fat: total.fat + (meal.nutrition.fat || 0),
      sugars: total.sugars + (meal.nutrition.sugars || 0),
      fibers: total.fibers + (meal.nutrition.fibers || 0),
      sodium: total.sodium + (meal.nutrition.sodium || 0),
      cholesterol: total.cholesterol + (meal.nutrition.cholesterol || 0),
      waterIntake: total.waterIntake + (meal.nutrition.waterIntake || 0),
    };
  }, initialNutrition);
};

/**
 * Rounds a nutrition value to 1 decimal place
 * @param value - The nutrition value to round
 * @returns The rounded value
 */
export const roundNutritionValue = (value: number): number => {
  return Math.round(value * 10) / 10;
};

/**
 * Rounds all nutrition values in a Nutrition object to 1 decimal place
 * @param nutrition - The nutrition object to round
 * @returns A new nutrition object with rounded values
 */
export const roundNutritionValues = (nutrition: Nutrition): Nutrition => {
  return {
    calories: roundNutritionValue(nutrition.calories),
    carbohydrates: roundNutritionValue(nutrition.carbohydrates),
    protein: roundNutritionValue(nutrition.protein),
    fat: roundNutritionValue(nutrition.fat),
    sugars: roundNutritionValue(nutrition.sugars),
    fibers: roundNutritionValue(nutrition.fibers),
    sodium: roundNutritionValue(nutrition.sodium),
    cholesterol: roundNutritionValue(nutrition.cholesterol),
    waterIntake: roundNutritionValue(nutrition.waterIntake),
  };
};

/**
 * Gets a safe nutrition value with fallback and rounding
 * @param nutrition - The nutrition object
 * @param key - The nutrition key to get
 * @param fallback - Fallback value if nutrition is null/undefined
 * @returns The rounded nutrition value or fallback
 */
export const getSafeNutritionValue = (
  nutrition: Nutrition | null,
  key: keyof Nutrition,
  fallback: number
): number => {
  if (!nutrition) return fallback;
  return roundNutritionValue(nutrition[key] || fallback);
};
