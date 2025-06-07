import { Nutrition } from '../types/nutritions';
import {
  addUnitsToNutrition,
  createNutritionLabel,
  formatNutritionValue,
  getNutritionItem,
  getNutritionDisplayName,
  NUTRITION_UNITS,
} from '../utils/nutritionFormatter';

/**
 * Example usage of the nutrition formatter utility functions
 */

// Example nutrition data
const sampleNutrition: Nutrition = {
  calories: 2150.5,
  protein: 87.3,
  carbohydrates: 245.8,
  fat: 72.1,
  fibers: 28.7,
  sugars: 45.2,
  sodium: 2100.5,
  cholesterol: 285.3,
  waterIntake: 2500.0,
};

const proteinItem = getNutritionItem(sampleNutrition.protein, 'protein');

const nutritionWithUnits = addUnitsToNutrition(sampleNutrition);

export const NutritionDisplay = ({ nutrition }: { nutrition: Nutrition }) => {
  const nutritionKeys: (keyof Nutrition)[] = [
    'calories',
    'protein',
    'carbohydrates',
    'fat',
    'fibers',
    'sugars',
  ];

  return {
    // This would be JSX in a real component
    nutritionItems: nutritionKeys.map((key) => ({
      id: key,
      label: createNutritionLabel(key, nutrition[key]),
      value: nutrition[key],
      unit: NUTRITION_UNITS[key],
    })),
  };
};

const uiExample = NutritionDisplay({ nutrition: sampleNutrition });
