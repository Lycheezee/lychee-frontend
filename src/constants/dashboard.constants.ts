/**
 * Default nutrition values used as fallbacks when no data is available
 */
export const DEFAULT_NUTRITION_VALUES = {
  calories: 2000,
  carbohydrates: 20,
  fat: 20,
  sugars: 5,
  protein: 200,
  cholesterol: 20,
  fibers: 15,
  sodium: 500,
  waterIntake: 2000,
} as const;

/**
 * Nutrition card configuration for the dashboard
 */
export const NUTRITION_CARDS_CONFIG = [
  {
    id: 'calories',
    label: 'Calories',
    key: 'calories' as const,
    fallback: DEFAULT_NUTRITION_VALUES.calories,
  },
  {
    id: 'carbs',
    label: 'Carbs',
    key: 'carbohydrates' as const,
    fallback: DEFAULT_NUTRITION_VALUES.carbohydrates,
  },
  {
    id: 'fats',
    label: 'Fats',
    key: 'fat' as const,
    fallback: DEFAULT_NUTRITION_VALUES.fat,
  },
  {
    id: 'sugars',
    label: 'Sugars',
    key: 'sugars' as const,
    fallback: DEFAULT_NUTRITION_VALUES.sugars,
  },
  {
    id: 'protein',
    label: 'Protein',
    key: 'protein' as const,
    fallback: DEFAULT_NUTRITION_VALUES.protein,
  },
  {
    id: 'cholesterol',
    label: 'Cholesterol',
    key: 'cholesterol' as const,
    fallback: DEFAULT_NUTRITION_VALUES.cholesterol,
  },
] as const;

/**
 * Dashboard page configuration
 */
export const DASHBOARD_CONFIG = {
  title: 'Home',
  welcomeMessagePrefix: 'Welcome back,',
} as const;
